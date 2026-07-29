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

const toggleAcceso_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { accesoId } = body;
    if (!accesoId) {
      throw createError({ statusCode: 400, statusMessage: "ID de acceso requerido" });
    }
    const acceso = await prisma.acceso.findUnique({
      where: { id: Number(accesoId) },
      include: { colaborador: true, aplicacion: true }
    });
    if (!acceso) {
      throw createError({ statusCode: 404, statusMessage: "Acceso no encontrado" });
    }
    const nuevoEstado = acceso.estado === "Activo" ? "Revocado" : "Activo";
    const accesoActualizado = await prisma.acceso.update({
      where: { id: acceso.id },
      data: {
        estado: nuevoEstado,
        actualizado_en: /* @__PURE__ */ new Date()
      },
      include: { colaborador: true, aplicacion: true }
    });
    let sophosLogs = [];
    if (acceso.aplicacion.nombre === "Sophos Antivirus") {
      try {
        const equipos = await prisma.equipo.findMany({
          where: { colaborador_id: acceso.colaborador_id }
        });
        if (equipos.length > 0) {
          const shouldIsolate = nuevoEstado === "Revocado";
          for (const eq of equipos) {
            const res = await setSophosEndpointIsolation(eq.hostname, shouldIsolate);
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
        accion: nuevoEstado === "Activo" ? "Otorgar Acceso" : "Revocar Acceso",
        detalles: `Cambio de acceso a "${acceso.aplicacion.nombre}" para ${acceso.colaborador.nombre} a: ${nuevoEstado}.${sophosLogs.length > 0 ? " Sophos API: " + sophosLogs.join(" | ") : ""}`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Matriz de Accesos"
      }
    });
    return accesoActualizado;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al alternar estado del acceso: ${error.message}`
    });
  }
});

export { toggleAcceso_post as default };
//# sourceMappingURL=toggle-acceso.post.mjs.map
