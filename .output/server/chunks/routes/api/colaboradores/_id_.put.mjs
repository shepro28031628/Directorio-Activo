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
  const { nombre, correo, area, proyecto, jira_id, estado } = body;
  try {
    const colaborador = await prisma.colaborador.update({
      where: { id },
      data: {
        ...nombre && { nombre },
        ...correo && { correo },
        ...area && { area },
        ...proyecto && { proyecto },
        ...jira_id !== void 0 && { jira_id: jira_id || null },
        ...estado && { estado }
      }
    });
    if (["Retirado", "Suspendido"].includes(estado)) {
      const equipos = await prisma.equipo.findMany({
        where: { colaborador_id: id, eliminado_en: null }
      });
      for (const eq of equipos) {
        await prisma.equipo.update({
          where: { id: eq.id },
          data: { estado: "Bloqueado" }
        });
        const rawServer = event.node.req.socket.server;
        const io = rawServer == null ? void 0 : rawServer._io;
        if (io && eq.token_seguridad) {
          io.to(eq.token_seguridad).emit("comando_bloqueo", {
            evento: "comando_bloqueo",
            hostname: eq.hostname,
            mensaje: "Bloqueo remoto por desvinculaci\xF3n de colaborador",
            comando: "BLOQUEAR",
            timestamp: (/* @__PURE__ */ new Date()).toISOString()
          });
        }
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Colaborador",
        detalles: `Colaborador actualizado: ${colaborador.nombre} (ID: ${colaborador.id})`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Colaboradores"
      }
    });
    return colaborador;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al actualizar colaborador: ${error.message}`
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
