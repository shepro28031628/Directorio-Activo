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
    const auditorias = await prisma.auditoria.findMany({
      orderBy: { fecha: "desc" }
    });
    return auditorias;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener bit\xE1cora de auditor\xEDa: ${error.message}`
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index3.get.mjs.map
