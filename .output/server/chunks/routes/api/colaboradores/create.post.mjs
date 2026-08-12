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

const create_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { nombre, correo, area, proyecto, jira_id } = body;
  if (!nombre || !correo || !area || !proyecto) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campos requeridos faltantes (nombre, correo, area, proyecto)."
    });
  }
  try {
    const existing = await prisma.colaborador.findUnique({
      where: { correo }
    });
    if (existing) {
      throw createError({
        statusCode: 400,
        statusMessage: "Ya existe un colaborador registrado con este correo electr\xF3nico."
      });
    }
    const colaborador = await prisma.colaborador.create({
      data: {
        nombre,
        correo,
        area,
        proyecto,
        jira_id: jira_id && String(jira_id).trim() !== "" ? String(jira_id).trim() : null,
        estado: "Activo"
      }
    });
    const apps = await prisma.aplicacion.findMany();
    const baselineApps = apps.filter(
      (a) => a.nombre === "Google Workspace" || a.nombre === "Slack Enterprise"
    );
    for (const app of baselineApps) {
      await prisma.acceso.create({
        data: {
          colaborador_id: colaborador.id,
          aplicacion_id: app.id,
          estado: "Activo"
        }
      });
    }
    await prisma.auditoria.create({
      data: {
        accion: "Crear Colaborador",
        detalles: `Colaborador creado: ${nombre} (${correo}) - \xC1rea: ${area}`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Colaboradores"
      }
    });
    return colaborador;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar colaborador: ${error.message}`
    });
  }
});

export { create_post as default };
//# sourceMappingURL=create.post.mjs.map
