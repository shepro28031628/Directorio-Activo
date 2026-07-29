import { prisma } from '../../utils/prisma'
import { getGoogleUsersReal } from '../../utils/google'

export default defineEventHandler(async (event) => {
  try {
    let googleUsers: any[] = []
    let isRealSync = false

    try {
      googleUsers = await getGoogleUsersReal()
      isRealSync = true
    } catch (err: any) {
      console.warn('Google Workspace API Sync skipped (using simulation fallback):', err.message)
    }

    if (isRealSync && googleUsers.length > 0) {
      for (const user of googleUsers) {
        await prisma.usuarioGoogle.upsert({
          where: { correo: user.primaryEmail.toLowerCase() },
          update: {
            nombre: user.name?.fullName || user.primaryEmail,
            google_id: user.id,
            activo: !user.suspended,
            area: user.orgUnitPath || 'General',
            sincronizado_en: new Date()
          },
          create: {
            google_id: user.id,
            nombre: user.name?.fullName || user.primaryEmail,
            correo: user.primaryEmail.toLowerCase(),
            activo: !user.suspended,
            area: user.orgUnitPath || 'General',
            sincronizado_en: new Date()
          }
        })
      }
    } else {
      // Fallback: Sincronizar basándose en colaboradores locales
      const colaboradores = await prisma.colaborador.findMany()
      for (const col of colaboradores) {
        await prisma.usuarioGoogle.upsert({
          where: { correo: col.correo },
          update: {
            nombre: col.nombre,
            activo: col.estado === 'Activo' || col.estado === 'Vacaciones',
            area: col.area,
            sincronizado_en: new Date()
          },
          create: {
            google_id: col.jira_id ? 'G-' + col.jira_id : 'G-' + col.id.toString(),
            nombre: col.nombre,
            correo: col.correo,
            activo: col.estado === 'Activo' || col.estado === 'Vacaciones',
            area: col.area,
            sincronizado_en: new Date()
          }
        })
      }
    }

    // Sincronizar matriz de accesos para Google Workspace
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: 'Google Workspace' }
    })
    if (appGoogle) {
      const allGoogleUsers = await prisma.usuarioGoogle.findMany()
      for (const u of allGoogleUsers) {
        const correoBase = u.correo.toLowerCase().trim()
        const username = correoBase.split('@')[0]
        const col = await prisma.colaborador.findFirst({
          where: {
            OR: [
              { correo: correoBase },
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
          const targetEstado = u.activo ? 'Activo' : 'Revocado'
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
    }

    const totalUsuarios = await prisma.usuarioGoogle.count()

    await prisma.auditoria.create({
      data: {
        accion: 'Sincronizar Google Workspace',
        detalles: isRealSync
          ? `Sincronización real exitosa con Google Workspace API. Se actualizaron ${totalUsuarios} cuentas de correo en caché.`
          : `Sincronización simulada completada (OAuth no cargado). Se actualizaron ${totalUsuarios} cuentas basadas en colaboradores.`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Google Workspace'
      }
    })

    return {
      success: true,
      mensaje: isRealSync
        ? 'Caché local de Google Workspace sincronizada directamente con Google Admin SDK.'
        : 'Caché local de Google Workspace sincronizada (Modo simulación basado en base de datos).',
      total: totalUsuarios,
      real: isRealSync
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al sincronizar Google Workspace: ${error.message}`
    })
  }
})
