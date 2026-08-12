import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    let estado = query.estado ? String(query.estado).trim() : undefined
    if (estado === '[object Object]') estado = undefined

    let area = query.area ? String(query.area).trim() : undefined
    if (area === '[object Object]') area = undefined

    let search = query.search ? String(query.search).trim() : ''
    if (search === '[object Object]') search = ''
    
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 50
    const skip = (page - 1) * limit
    const sortBy = query.sortBy ? String(query.sortBy) : 'nombre'
    const sortDesc = query.sortDesc === 'true'

    const colaboradores = await prisma.colaborador.findMany({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado: estado as any } : {},
          area ? { area } : {},
          search ? {
            OR: [
              { nombre: { contains: search, mode: 'insensitive' } },
              { correo: { contains: search, mode: 'insensitive' } },
              { proyecto: { contains: search, mode: 'insensitive' } }
            ]
          } : {}
        ]
      },
      include: {
        equipos: true,
        accesos: {
          include: {
            aplicacion: true
          }
        }
      },
      orderBy: { [sortBy]: sortDesc ? 'desc' : 'asc' },
      skip,
      take: limit
    })

    const total = await prisma.colaborador.count({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado: estado as any } : {},
          area ? { area } : {},
          search ? {
            OR: [
              { nombre: { contains: search, mode: 'insensitive' } },
              { correo: { contains: search, mode: 'insensitive' } },
              { proyecto: { contains: search, mode: 'insensitive' } }
            ]
          } : {}
        ]
      }
    })

    // To prevent breaking frontend that expects a plain array, if they send 'paginate=true' we return the object, otherwise we return the array.
    if (query.paginate === 'true') {
      return {
        data: colaboradores,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      }
    }

    return colaboradores
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar colaboradores: ${error.message}`
    })
  }
})
