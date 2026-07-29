import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import { s as setSophosEndpointIsolation } from '../../../_/sophos.mjs';
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

const conceder_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { colaboradorId, aplicacionId } = body;
    if (!colaboradorId || !aplicacionId) {
      throw createError({ statusCode: 400, statusMessage: "Colaborador y Aplicaci\xF3n son requeridos" });
    }
    const colabId = Number(colaboradorId);
    const appId = Number(aplicacionId);
    const existingAcceso = await prisma.acceso.findFirst({
      where: {
        colaborador_id: colabId,
        aplicacion_id: appId
      },
      include: { colaborador: true, aplicacion: true }
    });
    let acceso;
    if (existingAcceso) {
      acceso = await prisma.acceso.update({
        where: { id: existingAcceso.id },
        data: {
          estado: "Activo",
          actualizado_en: /* @__PURE__ */ new Date()
        },
        include: { colaborador: true, aplicacion: true }
      });
    } else {
      acceso = await prisma.acceso.create({
        data: {
          colaborador_id: colabId,
          aplicacion_id: appId,
          estado: "Activo"
        },
        include: { colaborador: true, aplicacion: true }
      });
    }
    let sophosLogs = [];
    if (acceso.aplicacion.nombre === "Sophos Antivirus") {
      try {
        const equipos = await prisma.equipo.findMany({
          where: { colaborador_id: colabId }
        });
        if (equipos.length > 0) {
          for (const eq of equipos) {
            const res = await setSophosEndpointIsolation(eq.hostname, false);
            sophosLogs.push(`${eq.hostname}: ${res.success ? "OK" : "Error (" + res.message + ")"}`);
          }
        } else {
          sophosLogs.push("El colaborador no tiene equipos asignados en la base de datos.");
        }
      } catch (err) {
        sophosLogs.push(`Error de conexi\xF3n con Sophos API: ${err.message}`);
      }
    }
    await prisma.auditoria.create({
      data: {
        accion: "Otorgar Acceso Nuevo",
        detalles: `Se concedi\xF3 acceso a la aplicaci\xF3n "${acceso.aplicacion.nombre}" para el colaborador "${acceso.colaborador.nombre}".${sophosLogs.length > 0 ? " Sophos API: " + sophosLogs.join(" | ") : ""}`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Matriz de Accesos"
      }
    });
    return acceso;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al conceder acceso: ${error.message}`
    });
  }
});

export { conceder_post as default };
//# sourceMappingURL=conceder.post.mjs.map
