import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { s as setGoogleUserStatusReal } from '../../../_/google.mjs';
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

const toggleStatus_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = parseInt(body.id || "0");
  const suspended = body.suspended === true;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Google requerido." });
  }
  try {
    const gUser = await prisma.usuarioGoogle.findUnique({
      where: { id }
    });
    if (!gUser) {
      throw createError({ statusCode: 404, statusMessage: "Usuario de Google no encontrado." });
    }
    let apiSuccess = false;
    try {
      apiSuccess = await setGoogleUserStatusReal(gUser.correo, suspended);
    } catch (err) {
      console.warn("Real Google status change failed, falling back to simulated sync:", err.message);
    }
    const updatedUser = await prisma.usuarioGoogle.update({
      where: { id },
      data: {
        activo: !suspended,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: "Google Workspace" }
    });
    if (appGoogle) {
      const username = gUser.correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo: gUser.correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        const existingAcceso = await prisma.acceso.findFirst({
          where: {
            colaborador_id: col.id,
            aplicacion_id: appGoogle.id
          }
        });
        const targetEstado = !suspended ? "Activo" : "Revocado";
        if (existingAcceso) {
          await prisma.acceso.update({
            where: { id: existingAcceso.id },
            data: { estado: targetEstado }
          });
        } else {
          await prisma.acceso.create({
            data: {
              colaborador_id: col.id,
              aplicacion_id: appGoogle.id,
              estado: targetEstado
            }
          });
        }
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: suspended ? "Suspender Google Workspace" : "Vincular Google Workspace",
        detalles: `${suspended ? "Suspendida" : "Reactivada/Vinculada"} la cuenta de Google Workspace para ${gUser.nombre} (${gUser.correo}). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: suspended ? "Cuenta suspendida correctamente." : "Cuenta reactivada y vinculada correctamente.",
      user: updatedUser,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al alternar estado en Google Workspace: ${error.message}`
    });
  }
});

export { toggleStatus_post as default };
//# sourceMappingURL=toggle-status.post.mjs.map
