import { c as defineEventHandler, f as getRouterParam, e as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { d as deleteGoogleUserReal } from '../../../_/google.mjs';
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
import 'fs';
import 'path';

const _id__delete = defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Google requerido." });
  }
  try {
    const existing = await prisma.usuarioGoogle.findUnique({
      where: { id }
    });
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: "Usuario de Google no encontrado." });
    }
    let apiSuccess = false;
    try {
      apiSuccess = await deleteGoogleUserReal(existing.correo);
    } catch (err) {
      console.warn("Real Google user deletion failed, falling back to simulated sync:", err.message);
    }
    await prisma.usuarioGoogle.delete({
      where: { id }
    });
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: "Google Workspace" }
    });
    if (appGoogle) {
      const username = existing.correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo: existing.correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        await prisma.acceso.deleteMany({
          where: {
            colaborador_id: col.id,
            aplicacion_id: appGoogle.id
          }
        });
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Eliminar Usuario Google Workspace",
        detalles: `Eliminado permanentemente el usuario ${existing.nombre} (${existing.correo}) de Google Workspace. Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: "Usuario de Google Workspace eliminado correctamente."
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al eliminar usuario de Google Workspace: ${error.message}`
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
