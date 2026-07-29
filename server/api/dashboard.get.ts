// server/api/dashboard.get.ts
import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    // 1. Obtener totales para KPIs
    const totalDevices = await prisma.device.count()
    const onlineDevices = await prisma.device.count({ where: { status: 'ONLINE' } })
    const offlineDevices = totalDevices - onlineDevices

    // 2. Obtener licencias expirando en los próximos 30 días
    const limitDate = new Date()
    limitDate.setDate(limitDate.getDate() + 30)
    
    const expiringLicenses = await prisma.software.count({
      where: {
        renewalDate: {
          lte: limitDate,
          gte: new Date()
        }
      }
    })

    // 3. Alertas Críticas (Eventos de severidad CRITICAL)
    const criticalAlerts = await prisma.eventLog.findMany({
      where: { severity: 'CRITICAL' },
      take: 5,
      orderBy: { timestamp: 'desc' },
      include: { device: { select: { name: true } } }
    })

    // 4. Logs de Auditoría Recientes
    const recentAudits = await prisma.auditLog.findMany({
      take: 5,
      orderBy: { timestamp: 'desc' },
      include: { device: { select: { name: true } } }
    })

    // 5. Distribución de Sistemas Operativos
    const osData = await prisma.device.groupBy({
      by: ['osName'],
      _count: {
        osName: true
      }
    })

    return {
      kpis: {
        totalDevices,
        onlineDevices,
        offlineDevices,
        expiringLicenses
      },
      criticalAlerts: criticalAlerts.map(a => ({
        id: a.id,
        device: a.device.name,
        timestamp: a.timestamp,
        description: a.description
      })),
      recentAudits: recentAudits.map(log => ({
        id: log.id,
        admin: log.adminUser,
        action: log.actionType,
        device: log.device.name,
        timestamp: log.timestamp,
        status: log.status
      })),
      osDistribution: osData.map(group => ({
        os: group.osName,
        count: group._count.osName
      }))
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener datos del Dashboard: ${error.message}`
    })
  }
})
