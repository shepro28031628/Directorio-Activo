import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID de usuario Microsoft requerido.' })
  }

  const body = await readBody(event)
  const nombre = body.nombre ? String(body.nombre).trim() : ''
  const licencias = body.licencias ? String(body.licencias).trim() : ''

  if (!nombre) {
    throw createError({ statusCode: 400, statusMessage: 'El nombre es requerido.' })
  }

  try {
    const existing = await prisma.usuarioM365.findUnique({
      where: { id }
    })

    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Usuario de Microsoft 365 no encontrado.' })
    }

    // Actualizar en Microsoft Azure AD API Real
    let apiSuccess = false
    try {
      const tenantId = process.env.MS_TENANT_ID
      const clientId = process.env.MS_CLIENT_ID
      const clientSecret = process.env.MS_CLIENT_SECRET

      if (tenantId && clientId && clientSecret) {
        // Authenticate with Microsoft Graph
        const tokenParams = new URLSearchParams()
        tokenParams.append('client_id', clientId)
        tokenParams.append('client_secret', clientSecret)
        tokenParams.append('scope', 'https://graph.microsoft.com/.default')
        tokenParams.append('grant_type', 'client_credentials')

        const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: tokenParams.toString()
        })

        if (tokenResp.ok) {
          const tokenData: any = await tokenResp.json()
          const accessToken = tokenData.access_token

          // Encontrar usuario en Azure
          const userLookup = await fetch(`https://graph.microsoft.com/v1.0/users/${existing.correo}?$select=id`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          })

          if (userLookup.ok) {
            const userData: any = await userLookup.json()
            const mUserId = userData.id

            // Actualizar displayName
            const updateResp = await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ displayName: nombre })
            })

            if (updateResp.ok) {
              apiSuccess = true
            }
          }
        }
      }
    } catch (err: any) {
      console.warn('Real Microsoft Graph user update failed, falling back to simulated sync:', err.message)
    }

    // Actualizar en base de datos local
    const updated = await prisma.usuarioM365.update({
      where: { id },
      data: {
        nombre,
        licencias,
        sincronizado_en: new Date()
      }
    })

    // Auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Actualizar Usuario Microsoft 365',
        detalles: `Modificado el usuario ${existing.correo} (Nuevo nombre: ${nombre}, Licencias: ${licencias}). Realizado vía API: ${apiSuccess ? 'Sí' : 'Simulada'}.`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Microsoft 365'
      }
    })

    return {
      success: true,
      mensaje: 'Usuario actualizado exitosamente.',
      user: updated,
      real: apiSuccess
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al actualizar usuario de Microsoft 365: ${error.message}`
    })
  }
})
