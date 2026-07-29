import { c as defineEventHandler, e as createError, r as readBody } from '../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  var _a;
  const id = parseInt(((_a = event.context.params) == null ? void 0 : _a.id) || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID inv\xE1lido" });
  }
  const body = await readBody(event);
  const { hostname, mac_address, ip_registro, marca_modelo, tipo_activo, so, ram, disco, procesador, serial, colaborador_id, estado } = body;
  try {
    const equipo = await prisma.equipo.update({
      where: { id },
      data: {
        ...hostname && { hostname },
        ...mac_address !== void 0 && { mac_address },
        ...ip_registro !== void 0 && { ip_registro },
        ...marca_modelo !== void 0 && { marca_modelo },
        ...tipo_activo && { tipo_activo },
        ...so !== void 0 && { so },
        ...ram !== void 0 && { ram },
        ...disco !== void 0 && { disco },
        ...procesador !== void 0 && { procesador },
        ...serial !== void 0 && { serial },
        ...colaborador_id !== void 0 && { colaborador_id: colaborador_id ? parseInt(colaborador_id) : null },
        ...estado && { estado }
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Equipo",
        detalles: `Equipo actualizado: ${equipo.hostname} (ID: ${equipo.id})`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Equipos"
      }
    });
    return equipo;
  } catch (error) {
    if (error.code === "P2002") {
      throw createError({
        statusCode: 400,
        statusMessage: `Ya existe un equipo con ese hostname o MAC address.`
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Error al actualizar equipo: ${error.message}`
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
