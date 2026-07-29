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

const sincronizar_post = defineEventHandler(async (event) => {
  const tenantId = process.env.MS_TENANT_ID;
  const clientId = process.env.MS_CLIENT_ID;
  const clientSecret = process.env.MS_CLIENT_SECRET;
  if (!tenantId || !clientId || !clientSecret) {
    throw createError({
      statusCode: 400,
      statusMessage: "Credenciales de Microsoft Graph API faltantes en el .env."
    });
  }
  try {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("scope", "https://graph.microsoft.com/.default");
    params.append("grant_type", "client_credentials");
    const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    const tokenResp = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString()
    });
    if (!tokenResp.ok) {
      throw new Error(`Autenticaci\xF3n fallida con Microsoft: ${await tokenResp.text()}`);
    }
    const tokenData = await tokenResp.json();
    const accessToken = tokenData.access_token;
    const skusResp = await fetch("https://graph.microsoft.com/v1.0/subscribedSkus", {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    const skuMap = {};
    if (skusResp.ok) {
      const skusData = await skusResp.json();
      for (const sku of skusData.value || []) {
        skuMap[sku.skuId] = sku.skuPartNumber;
      }
    }
    const usersResp = await fetch("https://graph.microsoft.com/v1.0/users?$select=id,displayName,userPrincipalName,accountEnabled,assignedLicenses", {
      headers: { "Authorization": `Bearer ${accessToken}` }
    });
    if (!usersResp.ok) {
      throw new Error(`Fallo al consultar usuarios en Azure AD: ${await usersResp.text()}`);
    }
    const usersData = await usersResp.json();
    const m365Users = usersData.value || [];
    for (const u of m365Users) {
      const correo = u.userPrincipalName.toLowerCase();
      const nombre = u.displayName;
      const user_id = u.id;
      const activo = u.accountEnabled !== false;
      const licNames = (u.assignedLicenses || []).map((l) => skuMap[l.skuId] || l.skuId).join(", ");
      await prisma.usuarioM365.upsert({
        where: { correo },
        update: {
          nombre,
          user_id,
          activo,
          licencias: licNames,
          sincronizado_en: /* @__PURE__ */ new Date()
        },
        create: {
          user_id,
          nombre,
          correo,
          activo,
          licencias: licNames,
          sincronizado_en: /* @__PURE__ */ new Date()
        }
      });
    }
    const appMS = await prisma.aplicacion.findFirst({
      where: { nombre: "Microsoft 365" }
    });
    if (appMS) {
      const allM365Users = await prisma.usuarioM365.findMany();
      for (const u of allM365Users) {
        const correoBase = u.correo.toLowerCase().trim();
        const username = correoBase.split("@")[0];
        const col = await prisma.colaborador.findFirst({
          where: {
            OR: [
              { correo: correoBase },
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
          const targetEstado = u.activo ? "Activo" : "Revocado";
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
    }
    const totalCount = await prisma.usuarioM365.count();
    await prisma.auditoria.create({
      data: {
        accion: "Sincronizar Microsoft 365",
        detalles: `Sincronizaci\xF3n real exitosa con Microsoft Graph. Se actualizaron ${m365Users.length} cuentas de usuario de Azure AD.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Microsoft 365"
      }
    });
    return {
      success: true,
      mensaje: `Cach\xE9 local de Microsoft 365 sincronizada directamente con Azure AD. Se procesaron ${m365Users.length} cuentas.`,
      total: totalCount
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al sincronizar con Microsoft Graph: ${error.message}`
    });
  }
});

export { sincronizar_post as default };
//# sourceMappingURL=sincronizar.post.mjs.map
