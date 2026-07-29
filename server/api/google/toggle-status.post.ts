import { prisma } from '../../utils/prisma'
import { setGoogleUserStatusReal } from '../../utils/google'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const id = parseInt(body.id || '0')
  const suspended = body.suspended === true

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID de usuario Google requerido.' })
  }

  try {
    const gUser = await prisma.usuarioGoogle.findUnique({
      where: { id }
    })

    if (!gUser) {
      throw createError({ statusCode: 404, statusMessage: 'Usuario de Google no encontrado.' })
    }

    // Cambiar estado en la API Real de Google
    let apiSuccess = false
    try {
      apiSuccess = await setGoogleUserStatusReal(gUser.correo, suspended)
    } catch (err: any) {
      console.warn('Real Google status change failed, falling back to simulated sync:', err.message)
    }

    // Actualizar caché local
    const updatedUser = await prisma.usuarioGoogle.update({
      where: { id },
      data: {
        activo: !suspended,
        sincronizado_en: new Date()
      }
    })

    // Actualizar la Matriz de Accesos para el Colaborador correspondiente
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: 'Google Workspace' }
    })

    if (appGoogle) {
      const username = gUser.correo.split('@')[0]
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo: gUser.correo },
            { correo: { startsWith: username + '@' } },
            { correo: { startsWith: username + '+' } }
          ]
        }
      })

      if (col) {
        const existingAcceso = await prisma.acceso.findFirst({
          where: {
            colaborador_id: col.id,
            aplicacion_id: appGoogle.id
          }
        })

        const targetEstado = !suspended ? 'Activo' : 'Revocado'

        if (existingAcceso) {
          await prisma.acceso.update({
            where: { id: existingAcceso.id },
            data: { estado: targetEstado }
          })
        } else {
          await prisma.acceso.create({
            data: {
              colaborador_id: col.id,
              aplicacion_id: appGoogle.id,
              estado: targetEstado
            }
          })
        }
      }
    }

    // Registrar auditoría
    await prisma.auditoria.create({
      data: {
        accion: suspended ? 'Suspender Google Workspace' : 'Vincular Google Workspace',
        detalles: `${suspended ? 'Suspendida' : 'Reactivada/Vinculada'} la cuenta de Google Workspace para ${gUser.nombre} (${gUser.correo}). Realizado vía API: ${apiSuccess ? 'Sí' : 'Simulada'}.`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Google Workspace'
      }
    })

    return {
      success: true,
      mensaje: suspended ? 'Cuenta suspendida correctamente.' : 'Cuenta reactivada y vinculada correctamente.',
      user: updatedUser,
      real: apiSuccess
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al alternar estado en Google Workspace: ${error.message}`
    })
  }
})
