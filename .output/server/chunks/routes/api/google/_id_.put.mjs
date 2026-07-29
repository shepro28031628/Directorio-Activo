import { c as defineEventHandler, f as getRouterParam, e as createError, r as readBody } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { u as updateGoogleUserReal } from '../../../_/google.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, "id") || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Google requerido." });
  }
  const body = await readBody(event);
  const nombre = body.nombre ? String(body.nombre).trim() : "";
  const area = body.area ? String(body.area).trim() : "";
  if (!nombre) {
    throw createError({ statusCode: 400, statusMessage: "El nombre es requerido." });
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
      await updateGoogleUserReal(existing.correo, nombre, "/" + area);
      apiSuccess = true;
    } catch (err) {
      console.warn("Real Google user update failed, falling back to simulated sync:", err.message);
    }
    const updated = await prisma.usuarioGoogle.update({
      where: { id },
      data: {
        nombre,
        area,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Usuario Google Workspace",
        detalles: `Modificado el usuario ${existing.correo} (Nuevo nombre: ${nombre}, Nueva \xE1rea: ${area}). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: "Usuario actualizado exitosamente.",
      user: updated,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al actualizar usuario de Google Workspace: ${error.message}`
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
