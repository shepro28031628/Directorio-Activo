import { c as defineEventHandler, f as getRouterParam, e as createError } from '../../../_/nitro.mjs';
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
  const id = parseInt(getRouterParam(event, "id") || "0");
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Microsoft requerido." });
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
            const deleteResp = await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}`, {
              method: "DELETE",
              headers: {
                "Authorization": `Bearer ${accessToken}`
              }
            });
            if (deleteResp.ok) {
              apiSuccess = true;
            }
          }
        }
      }
    } catch (err) {
      console.warn("Real Microsoft Graph user deletion failed, falling back to simulated sync:", err.message);
    }
    await prisma.usuarioM365.delete({
      where: { id }
    });
    const appMS = await prisma.aplicacion.findFirst({
      where: { nombre: "Microsoft 365" }
    });
    if (appMS) {
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
            aplicacion_id: appMS.id
          }
        });
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Eliminar Usuario Microsoft 365",
        detalles: `Eliminado permanentemente el usuario ${existing.nombre} (${existing.correo}) de Microsoft 365 (Azure AD). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Microsoft 365"
      }
    });
    return {
      success: true,
      mensaje: "Usuario de Microsoft 365 eliminado correctamente."
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al eliminar usuario de Microsoft 365: ${error.message}`
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
