import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const search = query.search ? String(query.search).trim() : ''
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 20
    const skip = (page - 1) * limit

    const whereClause: any = search
      ? {
          OR: [
            { nombre: { contains: search, mode: 'insensitive' } },
            { correo: { contains: search, mode: 'insensitive' } }
          ]
        }
      : {}

    const usuarios = await prisma.usuarioM365.findMany({
      where: whereClause,
      orderBy: { nombre: 'asc' },
      skip: query.paginate === 'true' ? skip : undefined,
      take: query.paginate === 'true' ? limit : undefined
    })

    if (query.paginate === 'true') {
      const total = await prisma.usuarioM365.count({ where: whereClause })
      return {
        data: usuarios,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      }
    }

    return usuarios
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener usuarios de Microsoft 365: ${error.message}`
    })
  }
})
