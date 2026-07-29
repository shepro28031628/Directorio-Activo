// server/api/devices/index.get.ts
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const search = query.search ? String(query.search) : ''
  const status = query.status ? String(query.status) : undefined

  try {
    // Filtro relacional y búsqueda de campos
    const devices = await prisma.device.findMany({
      where: {
        AND: [
          status ? { status } : {},
          search ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { assignedUser: { contains: search, mode: 'insensitive' } },
              { ipAddress: { contains: search, mode: 'insensitive' } }
            ]
          } : {}
        ]
      },
      include: {
        hardware: {
          select: {
            cpuModel: true,
            ramGb: true,
            diskHealth: true
          }
        }
      },
      orderBy: { name: 'asc' }
    })

    return devices
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar dispositivos: ${error.message}`
    })
  }
})
