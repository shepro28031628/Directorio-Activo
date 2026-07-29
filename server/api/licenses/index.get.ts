// server/api/licenses/index.get.ts
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const softwareList = await prisma.software.findMany({
      include: {
        _count: {
          select: { installations: true }
        }
      }
    })

    // Construcción del motor de optimización basado en asientos reales utilizados
    const processedLicenses = softwareList.map(soft => {
      const activeInstalls = soft._count.installations
      const unusedSeats = Math.max(0, soft.purchasedSeats - activeInstalls)
      const potentialSavings = Number(soft.costPerSeat) * unusedSeats
      
      // Lógica de optimización: Sugerencias basadas en uso real
      let recommendation = "Licencias óptimas y bien dimensionadas."
      if (unusedSeats > 5) {
        recommendation = `Reclamar e interrumpir ${unusedSeats} licencias inactivas para reducir costes.`
      } else if (activeInstalls > soft.purchasedSeats) {
        recommendation = `Alerta de cumplimiento: Se exceden los asientos en ${activeInstalls - soft.purchasedSeats}. Se requiere compra urgente.`
      }

      return {
        id: soft.id,
        name: soft.name,
        category: soft.category,
        purchasedSeats: soft.purchasedSeats,
        activeInstallations: activeInstalls,
        costPerSeat: Number(soft.costPerSeat),
        potentialSavings,
        renewalDate: soft.renewalDate,
        recommendation
      }
    })

    return processedLicenses
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al auditar licencias: ${error.message}`
    })
  }
})
