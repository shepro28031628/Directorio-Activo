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

const _id__delete = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt(((_a = event.context.params) == null ? void 0 : _a.id) || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID inv\xE1lido" });
  }
  try {
    const equipo = await prisma.equipo.update({
      where: { id },
      data: {
        eliminado_en: /* @__PURE__ */ new Date()
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Eliminar Equipo",
        detalles: `Equipo eliminado l\xF3gicamente: ${equipo.hostname} (ID: ${equipo.id})`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Equipos"
      }
    });
    return { success: true, message: "Equipo eliminado l\xF3gicamente" };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al eliminar equipo: ${error.message}`
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
