import { prisma } from '../../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Identificador del colaborador requerido.'
    })
  }

  try {
    const colaborador = await prisma.colaborador.findUnique({
      where: { id: parseInt(id) },
      include: {
        equipos: true,
        accesos: {
          include: {
            aplicacion: true
          }
        }
      }
    })

    if (!colaborador) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Colaborador no encontrado.'
      })
    }

    return colaborador
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener datos de desvinculación: ${error.message}`
    })
  }
})
