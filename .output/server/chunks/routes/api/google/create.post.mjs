import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { c as createGoogleUserReal } from '../../../_/google.mjs';
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

const create_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const nombre = body.nombre ? String(body.nombre).trim() : "";
  const correo = body.correo ? String(body.correo).trim().toLowerCase() : "";
  const area = body.area ? String(body.area).trim() : "Tecnolog\xEDa";
  if (!nombre || !correo) {
    throw createError({ statusCode: 400, statusMessage: "Nombre y correo son requeridos." });
  }
  try {
    const existing = await prisma.usuarioGoogle.findUnique({
      where: { correo }
    });
    if (existing) {
      throw createError({ statusCode: 400, statusMessage: "El correo electr\xF3nico ya est\xE1 registrado." });
    }
    let googleId = "G-MOCK-" + Math.random().toString(36).substring(2, 9).toUpperCase();
    let apiSuccess = false;
    try {
      const realUser = await createGoogleUserReal(correo, nombre, "/" + area);
      if (realUser == null ? void 0 : realUser.id) {
        googleId = realUser.id;
        apiSuccess = true;
      }
    } catch (err) {
      console.warn("Real Google user creation failed, falling back to simulated model:", err.message);
    }
    const newUser = await prisma.usuarioGoogle.create({
      data: {
        google_id: googleId,
        nombre,
        correo,
        activo: true,
        area,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: "Google Workspace" }
    });
    if (appGoogle) {
      const username = correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        await prisma.acceso.create({
          data: {
            colaborador_id: col.id,
            aplicacion_id: appGoogle.id,
            estado: "Activo"
          }
        });
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Crear Usuario Google Workspace",
        detalles: `Creado el usuario ${nombre} (${correo}) en el \xE1rea ${area}. Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: "Usuario de Google Workspace creado exitosamente.",
      user: newUser,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al crear usuario en Google Workspace: ${error.message}`
    });
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
