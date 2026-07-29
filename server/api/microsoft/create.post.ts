import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const nombre = body.nombre ? String(body.nombre).trim() : ''
  const correo = body.correo ? String(body.correo).trim().toLowerCase() : ''
  const licencias = body.licencias ? String(body.licencias).trim() : ''

  if (!nombre || !correo) {
    throw createError({ statusCode: 400, statusMessage: 'Nombre y correo son requeridos.' })
  }

  try {
    // 1. Validar si ya existe localmente
    const existing = await prisma.usuarioM365.findUnique({
      where: { correo }
    })
    if (existing) {
      throw createError({ statusCode: 400, statusMessage: 'El correo electrónico ya está registrado.' })
    }

    // 2. Crear en Microsoft Azure AD API Real
    let azureId = 'MS-MOCK-' + Math.random().toString(36).substring(2, 9).toUpperCase()
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

          const nickname = correo.split('@')[0]

          const createResp = await fetch('https://graph.microsoft.com/v1.0/users', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              accountEnabled: true,
              displayName: nombre,
              mailNickname: nickname,
              userPrincipalName: correo,
              passwordProfile: {
                forceChangePasswordNextSignIn: true,
                password: 'ChangeMeTempPass321!'
              }
            })
          })

          if (createResp.ok) {
            const data: any = await createResp.json()
            azureId = data.id
            apiSuccess = true
          } else {
            console.warn('Real M365 user creation rejected by Graph:', await createResp.text())
          }
        }
      }
    } catch (err: any) {
      console.warn('Real Microsoft Graph user creation failed, falling back to simulated model:', err.message)
    }

    // 3. Crear en la base de datos local
    const newUser = await prisma.usuarioM365.create({
      data: {
        user_id: azureId,
        nombre,
        correo,
        activo: true,
        licencias,
        sincronizado_en: new Date()
      }
    })

    // 4. Crear acceso automático en la matriz de accesos si el colaborador existe
    const appMS = await prisma.aplicacion.findFirst({
      where: { nombre: 'Microsoft 365' }
    })
    if (appMS) {
      const username = correo.split('@')[0]
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo },
            { correo: { startsWith: username + '@' } },
            { correo: { startsWith: username + '+' } }
          ]
        }
      })
      if (col) {
        await prisma.acceso.create({
          data: {
            colaborador_id: col.id,
            aplicacion_id: appMS.id,
            estado: 'Activo'
          }
        })
      }
    }

    // Auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Crear Usuario Microsoft 365',
        detalles: `Creado el usuario de Azure AD ${nombre} (${correo}) con licencias [${licencias}]. Realizado vía API: ${apiSuccess ? 'Sí' : 'Simulada'}.`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Microsoft 365'
      }
    })

    return {
      success: true,
      mensaje: 'Usuario de Microsoft 365 creado exitosamente.',
      user: newUser,
      real: apiSuccess
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al crear usuario en Microsoft 365: ${error.message}`
    })
  }
})
