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
    const aplicaciones = await prisma.aplicacion.findMany({
      include: {
        accesos: {
          include: {
            colaborador: true
          }
        }
      },
      orderBy: { nombre: "asc" }
    });
    return aplicaciones;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar accesos por aplicaci\xF3n: ${error.message}`
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
