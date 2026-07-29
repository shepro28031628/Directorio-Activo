import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
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

const toggleStatus_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = parseInt(body.id || "0");
  const suspended = body.suspended === true;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID de usuario Microsoft requerido." });
  }
  try {
    const mUser = await prisma.usuarioM365.findUnique({
      where: { id }
    });
    if (!mUser) {
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
          const userLookup = await fetch(`https://graph.microsoft.com/v1.0/users/${mUser.correo}?$select=id`, {
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
              body: JSON.stringify({ accountEnabled: !suspended })
            });
            if (updateResp.ok) {
              apiSuccess = true;
              if (suspended) {
                await fetch(`https://graph.microsoft.com/v1.0/users/${mUserId}/revokeSignInSessions`, {
                  method: "POST",
                  headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                  }
                });
              }
            }
          }
        }
      }
    } catch (err) {
      console.warn("Microsoft Graph status update failed, falling back to simulated sync:", err.message);
    }
    const updatedUser = await prisma.usuarioM365.update({
      where: { id },
      data: {
        activo: !suspended,
        sincronizado_en: /* @__PURE__ */ new Date()
      }
    });
    const appMS = await prisma.aplicacion.findFirst({
      where: { nombre: "Microsoft 365" }
    });
    if (appMS) {
      const username = mUser.correo.split("@")[0];
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo: mUser.correo },
            { correo: { startsWith: username + "@" } },
            { correo: { startsWith: username + "+" } }
          ]
        }
      });
      if (col) {
        const existingAcceso = await prisma.acceso.findFirst({
          where: {
            colaborador_id: col.id,
            aplicacion_id: appMS.id
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
              aplicacion_id: appMS.id,
              estado: targetEstado
            }
          });
        }
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: suspended ? "Deshabilitar Microsoft 365" : "Vincular Microsoft 365",
        detalles: `${suspended ? "Deshabilitada" : "Reactivada/Vinculada"} la cuenta de Microsoft 365 para ${mUser.nombre} (${mUser.correo}). Realizado v\xEDa API: ${apiSuccess ? "S\xED" : "Simulada"}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Microsoft 365"
      }
    });
    return {
      success: true,
      mensaje: suspended ? "Cuenta deshabilitada correctamente." : "Cuenta reactivada y vinculada correctamente.",
      user: updatedUser,
      real: apiSuccess
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al alternar estado en Microsoft 365: ${error.message}`
    });
  }
});

export { toggleStatus_post as default };
//# sourceMappingURL=toggle-status.post.mjs.map
