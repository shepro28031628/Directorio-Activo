// server/api/devices/[id].get.ts
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  try {
    const device = await prisma.device.findUnique({
      where: { id },
      include: {
        hardware: true,
        softwareAudits: {
          include: {
            software: true
          }
        },
        eventLogs: {
          orderBy: { timestamp: 'desc' },
          take: 20
        }
      }
    })

    if (!device) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Dispositivo no encontrado'
      })
    }

    return device
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error de servidor: ${error.message}`
    })
  }
})
