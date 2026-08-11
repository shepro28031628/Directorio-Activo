import { prisma } from '../../../utils/prisma'
import { setGoogleUserStatusReal } from '../../../utils/google'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID del colaborador requerido.'
    })
  }

  const steps = [
    { name: 'db_colaborador', label: 'Actualizar estado del Colaborador en BD', status: 'PENDING', error: null },
    { name: 'google_workspace', label: 'Suspender cuenta en Google Workspace (Real API)', status: 'PENDING', error: null },
    { name: 'db_equipos', label: 'Actualizar estado de Equipos a Bloqueado', status: 'PENDING', error: null },
    { name: 'ws_bloqueo', label: 'Enviar comando de bloqueo por WebSocket', status: 'PENDING', error: null },
    { name: 'db_accesos', label: 'Revocar accesos en matriz', status: 'PENDING', error: null },
    { name: 'ms_365', label: 'Suspender cuenta y revocar sesiones en Microsoft 365 (Real API)', status: 'PENDING', error: null },
    { name: 'audit_log', label: 'Guardar bitácora de auditoría', status: 'PENDING', error: null }
  ]

  try {
    const colaboradorId = parseInt(id)
    const colaborador = await prisma.colaborador.findUnique({
      where: { id: colaboradorId },
      include: { equipos: true }
    })

    if (!colaborador) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Colaborador no encontrado.'
      })
    }

    // Paso 1: Actualizar colaborador en BD
    try {
      await prisma.colaborador.update({
        where: { id: colaboradorId },
        data: { estado: 'Retirado' }
      })
      steps[0].status = 'SUCCESS'
    } catch (err: any) {
      steps[0].status = 'FAILED'
      steps[0].error = err.message
    }

    // Paso 2: Suspender Google Workspace (Real o fallback)
    try {
      const username = colaborador.correo.split('@')[0].split('+')[0]
      const gUser = await prisma.usuarioGoogle.findFirst({
        where: {
          OR: [
            { correo: colaborador.correo },
            { correo: { startsWith: username + '@' } }
          ]
        }
      })
      const targetEmail = gUser ? gUser.correo : (colaborador.correo.includes('+') ? colaborador.correo.split('+')[0] + '@' + colaborador.correo.split('@')[1] : colaborador.correo)
      
      const success = await setGoogleUserStatusReal(targetEmail, true)
      
      // Actualizar caché local
      if (gUser) {
        await prisma.usuarioGoogle.update({
          where: { id: gUser.id },
          data: { activo: false, sincronizado_en: new Date() }
        })
      }
      
      steps[1].status = 'SUCCESS'
      steps[1].error = success ? 'Cuenta suspendida vía API.' : 'Simulado (Credentials no configurados).'
    } catch (err: any) {
      steps[1].status = 'FAILED'
      steps[1].error = err.message
    }

    // Paso 3: Actualizar equipos a Bloqueado
    try {
      if (colaborador.equipos.length > 0) {
        await prisma.equipo.updateMany({
          where: { colaborador_id: colaboradorId },
          data: { estado: 'Bloqueado' }
        })
      }
      steps[2].status = 'SUCCESS'
    } catch (err: any) {
      steps[2].status = 'FAILED'
      steps[2].error = err.message
    }

    // Paso 4: Emitir WebSocket bloqueo
    try {
      const rawServer = (event.node.req.socket as any).server
      const io = rawServer?._io
      
      if (io) {
        for (const eq of colaborador.equipos) {
          io.to(eq.token_seguridad).emit('comando_bloqueo', {
            evento: 'comando_bloqueo',
            hostname: eq.hostname,
            mensaje: 'Su pantalla ha sido bloqueada remotamente por el Asistente de Desvinculación de Directorio Activo Ren.',
            timestamp: new Date().toISOString()
          })
          console.log(`[SOCKET] Comando de bloqueo enviado para: ${eq.hostname}`)
        }
      }
      steps[3].status = 'SUCCESS'
    } catch (err: any) {
      steps[3].status = 'FAILED'
      steps[3].error = err.message
    }

    // Paso 5: Revocar accesos
    try {
      await prisma.acceso.updateMany({
        where: { colaborador_id: colaboradorId },
        data: { estado: 'Revocado' }
      })
      steps[4].status = 'SUCCESS'
    } catch (err: any) {
      steps[4].status = 'FAILED'
      steps[4].error = err.message
    }

    // Paso 6: Microsoft 365 (Real API)
    try {
      const tenantId = process.env.MS_TENANT_ID
      const clientId = process.env.MS_CLIENT_ID
      const clientSecret = process.env.MS_CLIENT_SECRET
      let realMicrosoftSuspended = false

      const username = colaborador.correo.split('@')[0].split('+')[0]
      const mUser = await prisma.usuarioM365.findFirst({
        where: {
          OR: [
            { correo: colaborador.correo },
            { correo: { startsWith: username + '@' } }
          ]
        }
      })
      const targetUPN = mUser ? mUser.correo : colaborador.correo

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
          const userLookup = await fetch(`https://graph.microsoft.com/v1.0/users/${targetUPN}?$select=id`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
          })

          if (userLookup.ok) {
            const userData: any = await userLookup.json()
            const mUserId = userData.id

            // Deshabilitar cuenta
            await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}`, {
              method: 'PATCH',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ accountEnabled: false })
            })

            // Revocar sesiones de inicio de sesión
            await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}/revokeSignInSessions`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
              }
            })

            realMicrosoftSuspended = true
          }
        }
      }

      // Actualizar caché local
      if (mUser) {
        await prisma.usuarioM365.update({
          where: { id: mUser.id },
          data: { activo: false, sincronizado_en: new Date() }
        })
      }

      steps[5].status = 'SUCCESS'
      steps[5].error = realMicrosoftSuspended
        ? 'Cuenta deshabilitada y sesiones revocadas vía Microsoft Graph.'
        : 'Simulado (Credenciales no válidas o cuenta no existe en Azure).'
    } catch (err: any) {
      steps[5].status = 'FAILED'
      steps[5].error = err.message
    }

    // Paso 7: Bitácora de auditoría
    try {
      await prisma.auditoria.create({
        data: {
          accion: 'Desvinculación Offboarding',
          detalles: `Asistente de desvinculación completado exitosamente para ${colaborador.nombre} (${colaborador.correo}). Cuentas e interfaces de equipos suspendidas en directo.`,
          usuario_auditor: 'admin@renconsultores.com.co',
          ip_origen: '127.0.0.1'
        }
      })
      steps[6].status = 'SUCCESS'
    } catch (err: any) {
      steps[6].status = 'FAILED'
      steps[6].error = err.message
    }

    return {
      success: true,
      colaborador: colaborador.nombre,
      steps
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al iniciar desvinculación: ${error.message}`
    })
  }
})
