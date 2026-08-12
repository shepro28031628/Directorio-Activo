import { c as defineEventHandler, g as getQuery, e as createError } from '../../_/nitro.mjs';
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
  const query = getQuery(event);
  const search = query.search ? String(query.search) : "";
  const status = query.status ? String(query.status) : void 0;
  try {
    const devices = await prisma.device.findMany({
      where: {
        AND: [
          status ? { status } : {},
          search ? {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { assignedUser: { contains: search, mode: "insensitive" } },
              { ipAddress: { contains: search, mode: "insensitive" } }
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
      orderBy: { name: "asc" }
    });
    return devices;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar dispositivos: ${error.message}`
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index5.get.mjs.map
