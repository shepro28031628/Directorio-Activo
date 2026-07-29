import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const aplicaciones = await prisma.aplicacion.findMany({
      include: {
        accesos: {
          include: {
            colaborador: true
          }
        }
      },
      orderBy: { nombre: 'asc' }
    })

    return aplicaciones
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar accesos por aplicación: ${error.message}`
    })
  }
})
