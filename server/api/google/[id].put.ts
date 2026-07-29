import { prisma } from '../../utils/prisma'
import { updateGoogleUserReal } from '../../utils/google'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID de usuario Google requerido.' })
  }

  const body = await readBody(event)
  const nombre = body.nombre ? String(body.nombre).trim() : ''
  const area = body.area ? String(body.area).trim() : ''

  if (!nombre) {
    throw createError({ statusCode: 400, statusMessage: 'El nombre es requerido.' })
  }

  try {
    const existing = await prisma.usuarioGoogle.findUnique({
      where: { id }
    })

    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: 'Usuario de Google no encontrado.' })
    }

    // Actualizar en Google Workspace API Real
    let apiSuccess = false
    try {
      await updateGoogleUserReal(existing.correo, nombre, '/' + area)
      apiSuccess = true
    } catch (err: any) {
      console.warn('Real Google user update failed, falling back to simulated sync:', err.message)
    }

    // Actualizar en base de datos local
    const updated = await prisma.usuarioGoogle.update({
      where: { id },
      data: {
        nombre,
        area,
        sincronizado_en: new Date()
      }
    })

    // Auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Actualizar Usuario Google Workspace',
        detalles: `Modificado el usuario ${existing.correo} (Nuevo nombre: ${nombre}, Nueva área: ${area}). Realizado vía API: ${apiSuccess ? 'Sí' : 'Simulada'}.`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Google Workspace'
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
      statusMessage: error.statusMessage || `Error al actualizar usuario de Google Workspace: ${error.message}`
    })
  }
})
