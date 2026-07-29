import { c as defineEventHandler, e as createError } from '../../_/nitro.mjs';
import { p as prisma } from '../../_/prisma.mjs';
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

const dashboard_get = defineEventHandler(async (event) => {
  try {
    const totalDevices = await prisma.device.count();
    const onlineDevices = await prisma.device.count({ where: { status: "ONLINE" } });
    const offlineDevices = totalDevices - onlineDevices;
    const limitDate = /* @__PURE__ */ new Date();
    limitDate.setDate(limitDate.getDate() + 30);
    const expiringLicenses = await prisma.software.count({
      where: {
        renewalDate: {
          lte: limitDate,
          gte: /* @__PURE__ */ new Date()
        }
      }
    });
    const criticalAlerts = await prisma.eventLog.findMany({
      where: { severity: "CRITICAL" },
      take: 5,
      orderBy: { timestamp: "desc" },
      include: { device: { select: { name: true } } }
    });
    const recentAudits = await prisma.auditLog.findMany({
      take: 5,
      orderBy: { timestamp: "desc" },
      include: { device: { select: { name: true } } }
    });
    const osData = await prisma.device.groupBy({
      by: ["osName"],
      _count: {
        osName: true
      }
    });
    return {
      kpis: {
        totalDevices,
        onlineDevices,
        offlineDevices,
        expiringLicenses
      },
      criticalAlerts: criticalAlerts.map((a) => ({
        id: a.id,
        device: a.device.name,
        timestamp: a.timestamp,
        description: a.description
      })),
      recentAudits: recentAudits.map((log) => ({
        id: log.id,
        admin: log.adminUser,
        action: log.actionType,
        device: log.device.name,
        timestamp: log.timestamp,
        status: log.status
      })),
      osDistribution: osData.map((group) => ({
        os: group.osName,
        count: group._count.osName
      }))
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener datos del Dashboard: ${error.message}`
    });
  }
});

export { dashboard_get as default };
//# sourceMappingURL=dashboard.get.mjs.map
