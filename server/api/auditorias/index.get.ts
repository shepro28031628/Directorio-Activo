import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const auditorias = await prisma.auditoria.findMany({
      orderBy: { fecha: 'desc' }
    })

    return auditorias
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener bitácora de auditoría: ${error.message}`
    })
  }
})
