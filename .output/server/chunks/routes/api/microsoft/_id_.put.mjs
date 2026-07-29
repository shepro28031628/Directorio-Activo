import { c as defineEventHandler, f as getRouterParam, e as createError, r as readBody } from '../../../_/nitro.mjs';
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
  const id = parseInt(getRouterParam(event, "id") || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Microsoft requerido." });
  }
  const body = await readBody(event);
  const nombre = body.nombre ? String(body.nombre).trim() : "";
  const licencias = body.licencias ? String(body.licencias).trim() : "";
  if (!nombre) {
    throw createError({ statusCode: 400, statusMessage: "El nombre es requerido." });
  }
  try {
    const existing = await prisma.usuarioM365.findUnique({
      where: { id }
    });
    if (!existing) {
      throw createError({ statusCode: 404, statusMessage: "Usuario de Microsoft 365 no encontrado." });
    }
    let apiSuccess = false;
    try {
      const tenantId = process.env.MS_TENANT_ID;
      const clientId = process.env.MS_CLIENT_ID;
      const clientSecret = process.env.MS_CLIENT_SECRET;
      if (tenantId && clientId && clientSecret) {
        const tokenParams = new URLSearchParams();
        tokenParams.append("client_id", clientId);
        tokenParams.append("client_secret", clientSecret);
        tokenParams.append("scope", "https://graph.microsoft.com/.default");
        tokenParams.append("grant_type", "client_credentials");
        const tokenResp = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: tokenParams.toString()
        });
        if (tokenResp.ok) {
          const tokenData = await tokenResp.json();
          const accessToken = tokenData.access_token;
          const userLookup = await fetch(`https://graph.microsoft.com/v1.0/users/${existing.correo}?$select=id`, {
            headers: { "Authorization": `Bearer ${accessToken}` }
          });
          if (userLookup.ok) {
            const userData = await userLookup.json();
            const mUserId = userData.id;
            const updateResp = await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}`, {
              method: "PATCH",
              headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ displayName: nombre })
            });
            if (updateResp.ok) {
              apiSuccess = true;
            }
          }
        }
      }
    } catch (err) {
      console.warn("Real Microsoft Graph user update failed, falling back to simulated sync:", err.message);
    }
    const updated = await prisma.usuarioM365.update({
      where: { id },
      data: {
        nombre,
        licencias,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Usuario Microsoft 365",
        detalles: `Modificado el usuario ${existing.correo} (Nuevo nombre: ${nombre}, Licencias: ${licencias}). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Microsoft 365"
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
      statusMessage: error.statusMessage || `Error al actualizar usuario de Microsoft 365: ${error.message}`
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
