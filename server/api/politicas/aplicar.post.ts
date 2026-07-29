import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { politicas } = body

  if (!politicas || !Array.isArray(politicas)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Formato de políticas inválido.'
    })
  }

  try {
    const listDescription = politicas
      .map((p: any) => `${p.nombre.split(' (')[0]}: ${p.estado ? 'Activa' : 'Inactiva'}`)
      .join(', ')

    // Registrar en auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Actualizar Políticas MDM',
        detalles: `Se actualizó el perfil de seguridad global de la flota. Configuración: ${listDescription}.`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1'
      }
    })

    return {
      success: true,
      mensaje: 'Políticas registradas en auditoría exitosamente.'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al aplicar políticas en backend: ${error.message}`
    })
  }
})
