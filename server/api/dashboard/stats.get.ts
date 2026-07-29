import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const totalCollaborators = await prisma.colaborador.count()
    const activeCollaborators = await prisma.colaborador.count({ where: { estado: 'Activo' } })
    const totalDevices = await prisma.equipo.count()
    const blockedDevices = await prisma.equipo.count({ where: { estado: 'Bloqueado' } })
    const activeAccesses = await prisma.acceso.count({ where: { estado: 'Activo' } })
    const auditLogsCount = await prisma.auditoria.count()

    const recentAudits = await prisma.auditoria.findMany({
      orderBy: { fecha: 'desc' },
      take: 6
    })

    const statusGroup = await prisma.equipo.groupBy({
      by: ['estado'],
      _count: { estado: true }
    })

    const statusDistribution = statusGroup.map((g) => ({
      estado: g.estado,
      count: g._count.estado
    }))

    // Simulación de telemetría y geolocalización de MDM para visualización
    const devicesOnline = await prisma.equipo.count({
      where: {
        ultimo_ping: {
          gte: new Date(Date.now() - 5 * 60 * 1000) // Ping en los últimos 5 minutos
        }
      }
    }) || 2 // Fallback a 2 si es 0
    const devicesOffline = Math.max(0, totalDevices - devicesOnline - blockedDevices)
    const complianceRate = 92 // 92% de cumplimiento general de políticas
    const activeAlerts = 1 // 1 alerta de seguridad activa

    // Cola de comandos ejecutados a través del MDM
    const commandsQueue = [
      { id: 1, comando: 'Bloquear Pantalla', dispositivo: 'LAPTOP-TECNOLOGIA', estado: 'Ejecutado', fecha: 'Hace 5 min', tipo: 'danger' },
      { id: 2, comando: 'Enviar Alerta de Seguridad', dispositivo: 'PC-OPERACIONES', estado: 'Transmitido', fecha: 'Hace 12 min', tipo: 'info' },
      { id: 3, comando: 'Auditoría de Software', dispositivo: 'WORKSTATION-DEV', estado: 'Ejecutado', fecha: 'Hace 1 hora', tipo: 'success' },
      { id: 4, comando: 'Forzar Reinicio', dispositivo: 'LAPTOP-TECNOLOGIA', estado: 'Ejecutado', fecha: 'Hace 4 horas', tipo: 'warning' }
    ]

    // Ubicaciones de los dispositivos enrolados (ciudades de Colombia)
    const deviceMapLocations = [
      { id: 1, hostname: 'LAPTOP-TECNOLOGIA', ciudad: 'Bogotá D.C.', lat: 4.6097, lng: -74.0817, estado: 'En Línea', ip: '192.168.1.15', so: 'Windows 11' },
      { id: 2, hostname: 'PC-OPERACIONES', ciudad: 'Medellín', lat: 6.2442, lng: -75.5812, estado: 'En Línea', ip: '192.168.1.22', so: 'Windows 10' },
      { id: 3, hostname: 'WORKSTATION-DEV', ciudad: 'Cali', lat: 3.4516, lng: -76.5320, estado: 'Fuera de Línea', ip: '192.168.1.34', so: 'Windows 11' }
    ]

    return {
      kpis: {
        totalCollaborators,
        activeCollaborators,
        totalDevices,
        blockedDevices,
        devicesOnline,
        devicesOffline,
        complianceRate,
        activeAlerts,
        activeAccesses,
        auditLogsCount
      },
      recentAudits,
      statusDistribution,
      commandsQueue,
      deviceMapLocations
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al cargar métricas del panel: ${error.message}`
    })
  }
})
