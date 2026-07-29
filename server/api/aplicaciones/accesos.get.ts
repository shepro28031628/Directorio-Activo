import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const search = query.search ? String(query.search) : ''

    const accesos = await prisma.acceso.findMany({
      where: {
        colaborador: {
          eliminado_en: null
        },
        OR: search ? [
          { colaborador: { nombre: { contains: search, mode: 'insensitive' } } },
          { colaborador: { correo: { contains: search, mode: 'insensitive' } } },
          { aplicacion: { nombre: { contains: search, mode: 'insensitive' } } }
        ] : undefined
      },
      include: {
        colaborador: true,
        aplicacion: true
      },
      orderBy: { actualizado_en: 'desc' }
    })

    return accesos
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener accesos: ${error.message}`
    })
  }
})
