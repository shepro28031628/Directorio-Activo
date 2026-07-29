import { c as defineEventHandler, f as getRouterParam, e as createError } from '../../../_/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
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
          orderBy: { timestamp: "desc" },
          take: 20
        }
      }
    });
    if (!device) {
      throw createError({
        statusCode: 404,
        statusMessage: "Dispositivo no encontrado"
      });
    }
    return device;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error de servidor: ${error.message}`
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
