import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  try {
    const equipo = await prisma.equipo.update({
      where: { id },
      data: {
        eliminado_en: new Date()
      }
    })

    // Registrar auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Eliminar Equipo',
        detalles: `Equipo eliminado lógicamente: ${equipo.hostname} (ID: ${equipo.id})`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Equipos'
      }
    })

    return { success: true, message: 'Equipo eliminado lógicamente' }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al eliminar equipo: ${error.message}`
    })
  }
})
