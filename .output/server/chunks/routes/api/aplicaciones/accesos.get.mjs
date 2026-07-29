import { c as defineEventHandler, g as getQuery, e as createError } from '../../../_/nitro.mjs';
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

const accesos_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const search = query.search ? String(query.search) : "";
    const accesos = await prisma.acceso.findMany({
      where: {
        colaborador: {
          eliminado_en: null
        },
        OR: search ? [
          { colaborador: { nombre: { contains: search, mode: "insensitive" } } },
          { colaborador: { correo: { contains: search, mode: "insensitive" } } },
          { aplicacion: { nombre: { contains: search, mode: "insensitive" } } }
        ] : void 0
      },
      include: {
        colaborador: true,
        aplicacion: true
      },
      orderBy: { actualizado_en: "desc" }
    });
    return accesos;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener accesos: ${error.message}`
    });
  }
});

export { accesos_get as default };
//# sourceMappingURL=accesos.get.mjs.map
