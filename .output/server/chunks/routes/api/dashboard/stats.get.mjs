import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'socket.io';
import 'nitropack/dist/runtime/plugin';
import 'node:url';
import '@prisma/client';

const stats_get = defineEventHandler(async (event) => {
  try {
    const totalCollaborators = await prisma.colaborador.count();
    const activeCollaborators = await prisma.colaborador.count({ where: { estado: "Activo" } });
    const totalDevices = await prisma.equipo.count();
    const blockedDevices = await prisma.equipo.count({ where: { estado: "Bloqueado" } });
    const activeAccesses = await prisma.acceso.count({ where: { estado: "Activo" } });
    const auditLogsCount = await prisma.auditoria.count();
    const recentAudits = await prisma.auditoria.findMany({
      orderBy: { fecha: "desc" },
      take: 6
    });
    const statusGroup = await prisma.equipo.groupBy({
      by: ["estado"],
      _count: { estado: true }
    });
    const statusDistribution = statusGroup.map((g) => ({
      estado: g.estado,
      count: g._count.estado
    }));
    const devicesOnline = await prisma.equipo.count({
      where: {
        ultimo_ping: {
          gte: new Date(Date.now() - 5 * 60 * 1e3)
          // Ping en los últimos 5 minutos
        }
      }
    }) || 2;
    const devicesOffline = Math.max(0, totalDevices - devicesOnline - blockedDevices);
    const complianceRate = 92;
    const activeAlerts = 1;
    const commandsQueue = [
      { id: 1, comando: "Bloquear Pantalla", dispositivo: "LAPTOP-TECNOLOGIA", estado: "Ejecutado", fecha: "Hace 5 min", tipo: "danger" },
      { id: 2, comando: "Enviar Alerta de Seguridad", dispositivo: "PC-OPERACIONES", estado: "Transmitido", fecha: "Hace 12 min", tipo: "info" },
      { id: 3, comando: "Auditor\xEDa de Software", dispositivo: "WORKSTATION-DEV", estado: "Ejecutado", fecha: "Hace 1 hora", tipo: "success" },
      { id: 4, comando: "Forzar Reinicio", dispositivo: "LAPTOP-TECNOLOGIA", estado: "Ejecutado", fecha: "Hace 4 horas", tipo: "warning" }
    ];
    const deviceMapLocations = [
      { id: 1, hostname: "LAPTOP-TECNOLOGIA", ciudad: "Bogot\xE1 D.C.", lat: 4.6097, lng: -74.0817, estado: "En L\xEDnea", ip: "192.168.1.15", so: "Windows 11" },
      { id: 2, hostname: "PC-OPERACIONES", ciudad: "Medell\xEDn", lat: 6.2442, lng: -75.5812, estado: "En L\xEDnea", ip: "192.168.1.22", so: "Windows 10" },
      { id: 3, hostname: "WORKSTATION-DEV", ciudad: "Cali", lat: 3.4516, lng: -76.532, estado: "Fuera de L\xEDnea", ip: "192.168.1.34", so: "Windows 11" }
    ];
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
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al cargar m\xE9tricas del panel: ${error.message}`
    });
  }
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
