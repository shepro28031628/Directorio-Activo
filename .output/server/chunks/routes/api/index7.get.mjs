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

const index_get = defineEventHandler(async (event) => {
  try {
    const softwareList = await prisma.software.findMany({
      include: {
        _count: {
          select: { installations: true }
        }
      }
    });
    const processedLicenses = softwareList.map((soft) => {
      const activeInstalls = soft._count.installations;
      const unusedSeats = Math.max(0, soft.purchasedSeats - activeInstalls);
      const potentialSavings = Number(soft.costPerSeat) * unusedSeats;
      let recommendation = "Licencias \xF3ptimas y bien dimensionadas.";
      if (unusedSeats > 5) {
        recommendation = `Reclamar e interrumpir ${unusedSeats} licencias inactivas para reducir costes.`;
      } else if (activeInstalls > soft.purchasedSeats) {
        recommendation = `Alerta de cumplimiento: Se exceden los asientos en ${activeInstalls - soft.purchasedSeats}. Se requiere compra urgente.`;
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
      };
    });
    return processedLicenses;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al auditar licencias: ${error.message}`
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index7.get.mjs.map
