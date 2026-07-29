import { prisma } from '../../utils/prisma'
import { setSophosEndpointIsolation } from '../../utils/sophos'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { colaboradorId, aplicacionId } = body

    if (!colaboradorId || !aplicacionId) {
      throw createError({ statusCode: 400, statusMessage: 'Colaborador y Aplicación son requeridos' })
    }

    const colabId = Number(colaboradorId)
    const appId = Number(aplicacionId)

    // Buscar si ya existe el acceso
    const existingAcceso = await prisma.acceso.findFirst({
      where: {
        colaborador_id: colabId,
        aplicacion_id: appId
      },
      include: { colaborador: true, aplicacion: true }
    })

    let acceso

    if (existingAcceso) {
      // Si ya existe, actualizar a Activo
      acceso = await prisma.acceso.update({
        where: { id: existingAcceso.id },
        data: {
          estado: 'Activo',
          actualizado_en: new Date()
        },
        include: { colaborador: true, aplicacion: true }
      })
    } else {
      // Si no existe, crear nuevo acceso
      acceso = await prisma.acceso.create({
        data: {
          colaborador_id: colabId,
          aplicacion_id: appId,
          estado: 'Activo'
        },
        include: { colaborador: true, aplicacion: true }
      })
    }

    // Sincronización real con Sophos Central
    let sophosLogs: string[] = []
    if (acceso.aplicacion.nombre === 'Sophos Antivirus') {
      try {
        const equipos = await prisma.equipo.findMany({
          where: { colaborador_id: colabId }
        })

        if (equipos.length > 0) {
          // Si se concede, se elimina el aislamiento de red
          for (const eq of equipos) {
            const res = await setSophosEndpointIsolation(eq.hostname, false)
            sophosLogs.push(`${eq.hostname}: ${res.success ? 'OK' : 'Error (' + res.message + ')'}`)
          }
        } else {
          sophosLogs.push('El colaborador no tiene equipos asignados en la base de datos.')
        }
      } catch (err: any) {
        sophosLogs.push(`Error de conexión con Sophos API: ${err.message}`)
      }
    }

    // Registrar en auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Otorgar Acceso Nuevo',
        detalles: `Se concedió acceso a la aplicación "${acceso.aplicacion.nombre}" para el colaborador "${acceso.colaborador.nombre}".${
          sophosLogs.length > 0 ? ' Sophos API: ' + sophosLogs.join(' | ') : ''
        }`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Matriz de Accesos'
      }
    })

    return acceso
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al conceder acceso: ${error.message}`
    })
  }
})
