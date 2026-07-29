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

async function fetchAllObjects(workspaceId, qlQuery, auth) {
  let allObjects = [];
  let startAt = 0;
  const maxResults = 50;
  let isLast = false;
  console.log(`[JIRA SYNC] Solicitando AQL: "${qlQuery}"`);
  while (!isLast) {
    const url = `https://renconsultores.atlassian.net/gateway/api/jsm/assets/workspace/${workspaceId}/v1/object/aql?startAt=${startAt}&maxResults=${maxResults}`;
    const response = await $fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: {
        qlQuery
      }
    });
    const values = response.values || [];
    allObjects = allObjects.concat(values);
    console.log(`[JIRA SYNC] Obtenidos ${values.length} objetos (Total acumulado: ${allObjects.length} de ${response.total || "?"})`);
    if (values.length === 0 || response.isLast === true || allObjects.length >= (response.total || 0)) {
      isLast = true;
    } else {
      startAt += values.length;
    }
  }
  return allObjects;
}
const sincronizar_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F;
  const jiraUrl = process.env.JIRA_URL || "https://renconsultores.atlassian.net";
  const jiraEmail = process.env.JIRA_EMAIL || "ejgonzalez@renconsultores.com.co";
  const jiraApiToken = process.env.JIRA_API_TOKEN;
  const jiraSchemaId = process.env.JIRA_SCHEMA_ID || "3";
  if (!jiraApiToken) {
    throw createError({
      statusCode: 400,
      statusMessage: "Jira API Token no configurado en las variables de entorno."
    });
  }
  try {
    const auth = Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString("base64");
    const wsResponse = await $fetch(`${jiraUrl}/rest/servicedeskapi/assets/workspace`, {
      headers: { "Authorization": `Basic ${auth}` }
    });
    const workspaceId = (_b = (_a = wsResponse.values) == null ? void 0 : _a[0]) == null ? void 0 : _b.workspaceId;
    if (!workspaceId) {
      throw new Error("No se encontr\xF3 ning\xFAn workspace ID en la cuenta de Jira.");
    }
    console.log(`[JIRA SYNC] Iniciando consultas AQL en workspace: ${workspaceId}`);
    const collaboratorsRaw = await fetchAllObjects(workspaceId, `objectType = "Colaboradores"`, auth);
    let colaboradoresCount = 0;
    for (const rawCol of collaboratorsRaw) {
      const nameAttr = (_c = rawCol.attributes) == null ? void 0 : _c.find((a) => a.objectTypeAttributeId === "492");
      const statusAttr = (_d = rawCol.attributes) == null ? void 0 : _d.find((a) => a.objectTypeAttributeId === "780");
      let emailAttr = (_e = rawCol.attributes) == null ? void 0 : _e.find((a) => a.objectTypeAttributeId === "494");
      if (!emailAttr || !((_g = (_f = emailAttr.objectAttributeValues) == null ? void 0 : _f[0]) == null ? void 0 : _g.displayValue)) {
        emailAttr = (_h = rawCol.attributes) == null ? void 0 : _h.find((a) => {
          var _a2;
          const attrName = (((_a2 = a.objectTypeAttribute) == null ? void 0 : _a2.name) || "").toLowerCase();
          return attrName.includes("correo") || attrName.includes("email") || attrName.includes("mail");
        });
      }
      const nombre = ((_j = (_i = nameAttr == null ? void 0 : nameAttr.objectAttributeValues) == null ? void 0 : _i[0]) == null ? void 0 : _j.displayValue) || rawCol.label;
      let correo = (_n = (_m = (_l = (_k = emailAttr == null ? void 0 : emailAttr.objectAttributeValues) == null ? void 0 : _k[0]) == null ? void 0 : _l.displayValue) == null ? void 0 : _m.toLowerCase()) == null ? void 0 : _n.trim();
      const rawStatus = ((_p = (_o = statusAttr == null ? void 0 : statusAttr.objectAttributeValues) == null ? void 0 : _o[0]) == null ? void 0 : _p.displayValue) || "Activo";
      const jiraKey = rawCol.objectKey;
      if (!correo) {
        correo = `sin-correo-${jiraKey.toLowerCase()}@jira.internal`;
        console.log(`[JIRA SYNC] Colaborador sin correo encontrado: ${nombre} (${jiraKey}) - usando placeholder`);
      }
      let estado = "Activo";
      if (rawStatus === "Inactivo") estado = "Inactivo";
      else if (rawStatus === "Suspendido") estado = "Suspendido";
      else if (rawStatus === "Vacaciones") estado = "Vacaciones";
      else if (rawStatus === "Retirado") estado = "Retirado";
      const gUser = await prisma.usuarioGoogle.findUnique({ where: { correo } });
      const area = (gUser == null ? void 0 : gUser.area) || "Tecnolog\xEDa";
      let existingCol = await prisma.colaborador.findUnique({
        where: { jira_id: jiraKey }
      });
      if (!existingCol) {
        const colByEmail = await prisma.colaborador.findUnique({
          where: { correo }
        });
        if (colByEmail) {
          if (!colByEmail.jira_id) {
            existingCol = colByEmail;
          } else {
            const parts = correo.split("@");
            correo = `${parts[0]}+${jiraKey.toLowerCase()}@${parts[1]}`;
          }
        }
      } else {
        const colByEmail = await prisma.colaborador.findUnique({
          where: { correo }
        });
        if (colByEmail && colByEmail.id !== existingCol.id) {
          const parts = correo.split("@");
          correo = `${parts[0]}+${jiraKey.toLowerCase()}@${parts[1]}`;
        }
      }
      if (existingCol) {
        await prisma.colaborador.update({
          where: { id: existingCol.id },
          data: {
            nombre,
            correo,
            // Por si cambió o se sufijó
            jira_id: jiraKey,
            estado
          }
        });
      } else {
        await prisma.colaborador.create({
          data: {
            nombre,
            correo,
            jira_id: jiraKey,
            area,
            proyecto: "General",
            estado
          }
        });
      }
      colaboradoresCount++;
    }
    const equipmentRaw = await fetchAllObjects(workspaceId, `objectSchemaId = ${jiraSchemaId} AND objectType != "Colaboradores"`, auth);
    let equiposCount = 0;
    const equipmentToLink = [];
    for (const rawEq of equipmentRaw) {
      const statusAttr = (_q = rawEq.attributes) == null ? void 0 : _q.find((a) => a.objectTypeAttributeId === "461" || a.objectTypeAttributeId === "448");
      const modelAttr = (_r = rawEq.attributes) == null ? void 0 : _r.find((a) => a.objectTypeAttributeId === "466" || a.objectTypeAttributeId === "450" || a.objectTypeAttributeId === "452");
      const cpuAttr = (_s = rawEq.attributes) == null ? void 0 : _s.find((a) => a.objectTypeAttributeId === "472");
      const serialAttr = (_t = rawEq.attributes) == null ? void 0 : _t.find((a) => a.objectTypeAttributeId === "474" || a.objectTypeAttributeId === "454");
      const ownerAttr = (_u = rawEq.attributes) == null ? void 0 : _u.find((a) => a.objectTypeAttributeId === "642" || a.objectTypeAttributeId === "679");
      const collaboratorKey = (_w = (_v = ownerAttr == null ? void 0 : ownerAttr.objectAttributeValues) == null ? void 0 : _v[0]) == null ? void 0 : _w.searchValue;
      const hostname = rawEq.label || `DISPOSITIVO-${rawEq.id}`;
      const jiraKey = rawEq.objectKey;
      const rawStatus = ((_y = (_x = statusAttr == null ? void 0 : statusAttr.objectAttributeValues) == null ? void 0 : _x[0]) == null ? void 0 : _y.displayValue) || "Disponible";
      const marcaModelo = ((_A = (_z = modelAttr == null ? void 0 : modelAttr.objectAttributeValues) == null ? void 0 : _z[0]) == null ? void 0 : _A.displayValue) || "Gen\xE9rico";
      const procesador = ((_C = (_B = cpuAttr == null ? void 0 : cpuAttr.objectAttributeValues) == null ? void 0 : _B[0]) == null ? void 0 : _C.displayValue) || "Intel / Apple Silicon";
      const serial = ((_E = (_D = serialAttr == null ? void 0 : serialAttr.objectAttributeValues) == null ? void 0 : _D[0]) == null ? void 0 : _E.displayValue) || "SN-" + rawEq.id;
      let estado = "Disponible";
      if (rawStatus === "Asignado") estado = "Asignado";
      else if (rawStatus === "Bloqueado") estado = "Bloqueado";
      else if (rawStatus === "Mantenimiento") estado = "Mantenimiento";
      else if (rawStatus === "Inactivo") estado = "Inactivo";
      const jiraNumPart = parseInt(jiraKey.replace(/\D/g, "")) || 0;
      const b1 = jiraNumPart >> 16 & 255;
      const b2 = jiraNumPart >> 8 & 255;
      const b3 = jiraNumPart & 255;
      const macPlaceholder = `FA:KE:${b1.toString(16).padStart(2, "0").toUpperCase()}:${b2.toString(16).padStart(2, "0").toUpperCase()}:${b3.toString(16).padStart(2, "0").toUpperCase()}:00`;
      const ip = "10.0." + (b2 % 254 + 1) + "." + (b3 % 254 + 1);
      let existingEquipo = await prisma.equipo.findFirst({ where: { jira_id: jiraKey } });
      if (!existingEquipo) {
        existingEquipo = await prisma.equipo.findFirst({ where: { hostname } });
      }
      let savedEquipo;
      if (existingEquipo) {
        savedEquipo = await prisma.equipo.update({
          where: { id: existingEquipo.id },
          data: {
            hostname,
            // actualiza hostname si cambió en Jira
            jira_id: jiraKey,
            ip_registro: ip,
            marca_modelo: marcaModelo,
            procesador,
            serial,
            estado
          }
        });
      } else {
        savedEquipo = await prisma.equipo.create({
          data: {
            hostname,
            jira_id: jiraKey,
            mac_address: macPlaceholder,
            ip_registro: ip,
            marca_modelo: marcaModelo,
            estado,
            token_seguridad: `token-${jiraKey}`,
            tipo_activo: ((_F = rawEq.objectType) == null ? void 0 : _F.name) || "Portatil",
            procesador,
            serial
          }
        });
      }
      if (collaboratorKey) {
        equipmentToLink.push({
          equipoJiraId: savedEquipo.jira_id || jiraKey,
          collaboratorKey
        });
      }
      equiposCount++;
    }
    for (const link of equipmentToLink) {
      const col = await prisma.colaborador.findUnique({
        where: { jira_id: link.collaboratorKey }
      });
      if (col) {
        const eq = await prisma.equipo.findFirst({
          where: { jira_id: link.equipoJiraId }
        });
        if (eq) {
          await prisma.equipo.update({
            where: { id: eq.id },
            data: {
              colaborador_id: col.id,
              estado: "Asignado"
            }
          });
        }
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Sincronizar Jira Assets",
        detalles: `Sincronizaci\xF3n real exitosa (paginada en URL). Sincronizados ${colaboradoresCount} colaboradores y ${equiposCount} equipos en total.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1"
      }
    });
    return {
      success: true,
      mensaje: `Sincronizaci\xF3n de Jira Assets completada. ${colaboradoresCount} colaboradores y ${equiposCount} equipos procesados en total (paginado).`,
      colaboradoresCount,
      equiposCount
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al sincronizar Jira Assets: ${error.message}`
    });
  }
});

export { sincronizar_post as default };
//# sourceMappingURL=sincronizar.post.mjs.map
