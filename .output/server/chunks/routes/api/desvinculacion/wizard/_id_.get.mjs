import { c as defineEventHandler, f as getRouterParam, e as createError } from '../../../../_/nitro.mjs';
import { p as prisma } from '../../../../_/prisma.mjs';
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
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Identificador del colaborador requerido."
    });
  }
  try {
    const colaborador = await prisma.colaborador.findUnique({
      where: { id: parseInt(id) },
      include: {
        equipos: true,
        accesos: {
          include: {
            aplicacion: true
          }
        }
      }
    });
    if (!colaborador) {
      throw createError({
        statusCode: 404,
        statusMessage: "Colaborador no encontrado."
      });
    }
    return colaborador;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener datos de desvinculaci\xF3n: ${error.message}`
    });
  }
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
