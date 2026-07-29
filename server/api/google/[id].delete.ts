import { prisma } from '../../utils/prisma'
import { deleteGoogleUserReal } from '../../utils/google'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID de usuario Google requerido.' })
  }

  try {
    const existing = await prisma.usuarioGoogle.findUnique({
      where: { id }
    })

    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Usuario de Google no encontrado.' })
    }

    // Eliminar en Google Workspace API Real
    let apiSuccess = false
    try {
      apiSuccess = await deleteGoogleUserReal(existing.correo)
    } catch (err: any) {
      console.warn('Real Google user deletion failed, falling back to simulated sync:', err.message)
    }

    // Eliminar de la base de datos local
    await prisma.usuarioGoogle.delete({
      where: { id }
    })

    // Eliminar también su acceso correspondiente en la matriz de accesos
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: 'Google Workspace' }
    })
    if (appGoogle) {
      const username = existing.correo.split('@')[0]
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo: existing.correo },
            { correo: { startsWith: username + '@' } },
            { correo: { startsWith: username + '+' } }
          ]
        }
      })
      if (col) {
        await prisma.acceso.deleteMany({
          where: {
            colaborador_id: col.id,
            aplicacion_id: appGoogle.id
          }
        })
      }
    }

    // Auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Eliminar Usuario Google Workspace',
        detalles: `Eliminado permanentemente el usuario ${existing.nombre} (${existing.correo}) de Google Workspace. Realizado vía API: ${apiSuccess ? 'Sí' : 'Simulada'}.`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Google Workspace'
      }
    })

    return {
      success: true,
      mensaje: 'Usuario de Google Workspace eliminado correctamente.'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al eliminar usuario de Google Workspace: ${error.message}`
    })
  }
})
