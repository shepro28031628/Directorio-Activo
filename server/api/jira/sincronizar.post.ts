import { prisma } from '../../utils/prisma'

// Función auxiliar para traer TODOS los objetos paginados desde Jira Assets
async function fetchAllObjects(workspaceId: string, qlQuery: string, auth: string) {
  let allObjects: any[] = []
  let startAt = 0
  const maxResults = 50 // Tamaño de página de 50
  let isLast = false

  console.log(`[JIRA SYNC] Solicitando AQL: "${qlQuery}"`)

  while (!isLast) {
    // Los parámetros de paginación deben ir en el URL Query String para el endpoint de POST AQL
    const url = `https://renconsultores.atlassian.net/gateway/api/jsm/assets/workspace/${workspaceId}/v1/object/aql?startAt=${startAt}&maxResults=${maxResults}`
    
    const response = await $fetch<any>(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: {
        qlQuery
      }
    })

    const values = response.values || []
    allObjects = allObjects.concat(values)

    console.log(`[JIRA SYNC] Obtenidos ${values.length} objetos (Total acumulado: ${allObjects.length} de ${response.total || '?'})`)

    // Determinar si es la última página
    if (values.length === 0 || response.isLast === true || allObjects.length >= (response.total || 0)) {
      isLast = true
    } else {
      startAt += values.length
    }
  }

  return allObjects
}

export default defineEventHandler(async (event) => {
  const jiraUrl = process.env.JIRA_URL || 'https://renconsultores.atlassian.net'
  const jiraEmail = process.env.JIRA_EMAIL || 'ejgonzalez@renconsultores.com.co'
  const jiraApiToken = process.env.JIRA_API_TOKEN
  const jiraSchemaId = process.env.JIRA_SCHEMA_ID || '3'

  if (!jiraApiToken) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Jira API Token no configurado en las variables de entorno.'
    })
  }

  try {
    const auth = Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64')
    
    // 1. Obtener workspace ID
    const wsResponse = await $fetch<any>(`${jiraUrl}/rest/servicedeskapi/assets/workspace`, {
      headers: { 'Authorization': `Basic ${auth}` }
    })
    
    const workspaceId = wsResponse.values?.[0]?.workspaceId
    if (!workspaceId) {
      throw new Error('No se encontró ningún workspace ID en la cuenta de Jira.')
    }

    console.log(`[JIRA SYNC] Iniciando consultas AQL en workspace: ${workspaceId}`)

    // 2. Obtener todos los Colaboradores con paginación
    const collaboratorsRaw = await fetchAllObjects(workspaceId, `objectType = "Colaboradores"`, auth)
    let colaboradoresCount = 0

    // 3. Procesar y guardar colaboradores
    for (const rawCol of collaboratorsRaw) {
      // Atributos: 492 = Nombre, 494 = Correo, 780 = Estado
      const nameAttr = rawCol.attributes?.find((a: any) => a.objectTypeAttributeId === '492')
      const statusAttr = rawCol.attributes?.find((a: any) => a.objectTypeAttributeId === '780')

      // Búsqueda flexible del correo: primero por ID 494, luego por nombre del atributo
      let emailAttr = rawCol.attributes?.find((a: any) => a.objectTypeAttributeId === '494')
      if (!emailAttr || !emailAttr.objectAttributeValues?.[0]?.displayValue) {
        emailAttr = rawCol.attributes?.find((a: any) => {
          const attrName = (a.objectTypeAttribute?.name || '').toLowerCase()
          return attrName.includes('correo') || attrName.includes('email') || attrName.includes('mail')
        })
      }

      const nombre = nameAttr?.objectAttributeValues?.[0]?.displayValue || rawCol.label
      let correo = emailAttr?.objectAttributeValues?.[0]?.displayValue?.toLowerCase()?.trim()
      const rawStatus = statusAttr?.objectAttributeValues?.[0]?.displayValue || 'Activo'
      const jiraKey = rawCol.objectKey

      // Si no tiene correo, generar un placeholder basado en el jiraKey para no perder el registro
      if (!correo) {
        correo = `sin-correo-${jiraKey.toLowerCase()}@jira.internal`
        console.log(`[JIRA SYNC] Colaborador sin correo encontrado: ${nombre} (${jiraKey}) - usando placeholder`)
      }

      let estado: 'Activo' | 'Inactivo' | 'Suspendido' | 'Vacaciones' | 'Retirado' = 'Activo'
      if (rawStatus === 'Inactivo') estado = 'Inactivo'
      else if (rawStatus === 'Suspendido') estado = 'Suspendido'
      else if (rawStatus === 'Vacaciones') estado = 'Vacaciones'
      else if (rawStatus === 'Retirado') estado = 'Retirado'

      const gUser = await prisma.usuarioGoogle.findUnique({ where: { correo } })
      const area = gUser?.area || 'Tecnología'

      let existingCol = await prisma.colaborador.findUnique({
        where: { jira_id: jiraKey }
      })

      if (!existingCol) {
        // Si no se encuentra por jira_id, intentamos buscar por correo
        const colByEmail = await prisma.colaborador.findUnique({
          where: { correo }
        })
        if (colByEmail) {
          if (!colByEmail.jira_id) {
            // Es el mismo colaborador (sin jira_id asignado aún), lo vinculamos
            existingCol = colByEmail
          } else {
            // El correo está tomado por otro colaborador con un jira_id diferente.
            // Generamos un correo único sufijado para evitar colisión de unique constraint.
            const parts = correo.split('@')
            correo = `${parts[0]}+${jiraKey.toLowerCase()}@${parts[1]}`
          }
        }
      } else {
        // Si ya existe por jira_id, pero su correo cambió y colisiona con otro
        const colByEmail = await prisma.colaborador.findUnique({
          where: { correo }
        })
        if (colByEmail && colByEmail.id !== existingCol.id) {
          const parts = correo.split('@')
          correo = `${parts[0]}+${jiraKey.toLowerCase()}@${parts[1]}`
        }
      }

      if (existingCol) {
        await prisma.colaborador.update({
          where: { id: existingCol.id },
          data: {
            nombre,
            correo, // Por si cambió o se sufijó
            jira_id: jiraKey,
            estado
          }
        })
      } else {
        await prisma.colaborador.create({
          data: {
            nombre,
            correo,
            jira_id: jiraKey,
            area,
            proyecto: 'General',
            estado
          }
        })
      }
      colaboradoresCount++
    }

    // 4. Obtener todos los Equipos con paginación
    const equipmentRaw = await fetchAllObjects(workspaceId, `objectSchemaId = ${jiraSchemaId} AND objectType != "Colaboradores"`, auth)
    let equiposCount = 0
    const equipmentToLink: Array<{ equipoJiraId: string, collaboratorKey: string }> = []

    // 5. Procesar y guardar equipos
    for (const rawEq of equipmentRaw) {
      const statusAttr = rawEq.attributes?.find((a: any) => a.objectTypeAttributeId === '461' || a.objectTypeAttributeId === '448')
      const modelAttr = rawEq.attributes?.find((a: any) => a.objectTypeAttributeId === '466' || a.objectTypeAttributeId === '450' || a.objectTypeAttributeId === '452')
      const cpuAttr = rawEq.attributes?.find((a: any) => a.objectTypeAttributeId === '472')
      const serialAttr = rawEq.attributes?.find((a: any) => a.objectTypeAttributeId === '474' || a.objectTypeAttributeId === '454')
      
      const ownerAttr = rawEq.attributes?.find((a: any) => a.objectTypeAttributeId === '642' || a.objectTypeAttributeId === '679')
      const collaboratorKey = ownerAttr?.objectAttributeValues?.[0]?.searchValue

      const hostname = rawEq.label || `DISPOSITIVO-${rawEq.id}`
      const jiraKey = rawEq.objectKey
      const rawStatus = statusAttr?.objectAttributeValues?.[0]?.displayValue || 'Disponible'
      const marcaModelo = modelAttr?.objectAttributeValues?.[0]?.displayValue || 'Genérico'
      const procesador = cpuAttr?.objectAttributeValues?.[0]?.displayValue || 'Intel / Apple Silicon'
      const serial = serialAttr?.objectAttributeValues?.[0]?.displayValue || 'SN-' + rawEq.id

      let estado: 'Activo' | 'Inactivo' | 'Bloqueado' | 'Mantenimiento' | 'Disponible' | 'Asignado' = 'Disponible'
      if (rawStatus === 'Asignado') estado = 'Asignado'
      else if (rawStatus === 'Bloqueado') estado = 'Bloqueado'
      else if (rawStatus === 'Mantenimiento') estado = 'Mantenimiento'
      else if (rawStatus === 'Inactivo') estado = 'Inactivo'

      // Generar MAC placeholder única y determinista basada en el jiraKey (ej: "SR-7166")
      // Así la misma clave siempre produce la misma MAC y nunca colisiona entre equipos distintos
      const jiraNumPart = parseInt(jiraKey.replace(/\D/g, '')) || 0
      const b1 = (jiraNumPart >> 16) & 0xFF
      const b2 = (jiraNumPart >> 8) & 0xFF
      const b3 = jiraNumPart & 0xFF
      const macPlaceholder = `FA:KE:${b1.toString(16).padStart(2,'0').toUpperCase()}:${b2.toString(16).padStart(2,'0').toUpperCase()}:${b3.toString(16).padStart(2,'0').toUpperCase()}:00`
      const ip = '10.0.' + (b2 % 254 + 1) + '.' + (b3 % 254 + 1)

      // Buscar primero por jira_id (clave estable de Jira), luego por hostname como fallback.
      // Esto evita colisiones cuando el hostname de un equipo cambia en Jira entre sincronizaciones.
      let existingEquipo = await prisma.equipo.findFirst({ where: { jira_id: jiraKey } })
      if (!existingEquipo) {
        existingEquipo = await prisma.equipo.findFirst({ where: { hostname } })
      }

      let savedEquipo: any
      if (existingEquipo) {
        // UPDATE: solo actualiza campos de inventario, preserva MAC y token reales del agente
        savedEquipo = await prisma.equipo.update({
          where: { id: existingEquipo.id },
          data: {
            hostname,           // actualiza hostname si cambió en Jira
            jira_id: jiraKey,
            ip_registro: ip,
            marca_modelo: marcaModelo,
            procesador,
            serial,
            estado
          }
        })
      } else {
        // CREATE: equipo nuevo, asigna valores placeholder
        savedEquipo = await prisma.equipo.create({
          data: {
            hostname,
            jira_id: jiraKey,
            mac_address: macPlaceholder,
            ip_registro: ip,
            marca_modelo: marcaModelo,
            estado,
            token_seguridad: `token-${jiraKey}`,
            tipo_activo: rawEq.objectType?.name || 'Portatil',
            procesador,
            serial
          }
        })
      }

      if (collaboratorKey) {
        equipmentToLink.push({
          equipoJiraId: savedEquipo.jira_id || jiraKey,
          collaboratorKey
        })
      }
      equiposCount++
    }

    // 6. Vincular equipos con colaboradores
    for (const link of equipmentToLink) {
      const col = await prisma.colaborador.findUnique({
        where: { jira_id: link.collaboratorKey }
      })
      
      if (col) {
        // Encontrar el equipo por jira_id para obtener su ID único (Prisma lo requiere)
        const eq = await prisma.equipo.findFirst({
          where: { jira_id: link.equipoJiraId }
        })
        
        if (eq) {
          await prisma.equipo.update({
            where: { id: eq.id },
            data: {
              colaborador_id: col.id,
              estado: 'Asignado'
            }
          })
        }
      }
    }

    await prisma.auditoria.create({
      data: {
        accion: 'Sincronizar Jira Assets',
        detalles: `Sincronización real exitosa (paginada en URL). Sincronizados ${colaboradoresCount} colaboradores y ${equiposCount} equipos en total.`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1'
      }
    })

    return {
      success: true,
      mensaje: `Sincronización de Jira Assets completada. ${colaboradoresCount} colaboradores y ${equiposCount} equipos procesados en total (paginado).`,
      colaboradoresCount,
      equiposCount
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al sincronizar Jira Assets: ${error.message}`
    })
  }
})
