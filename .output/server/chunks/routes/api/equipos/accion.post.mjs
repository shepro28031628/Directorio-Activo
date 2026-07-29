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

const accion_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const { equipoId, accion, mensaje, comando } = body;
  if (!equipoId || !accion) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campos requeridos faltantes (equipoId, accion)."
    });
  }
  try {
    const equipo = await prisma.equipo.findUnique({
      where: { id: parseInt(equipoId) },
      include: { colaborador: true }
    });
    if (!equipo) {
      throw createError({
        statusCode: 404,
        statusMessage: "Equipo no encontrado."
      });
    }
    let nuevoEstado = equipo.estado;
    let auditAccion = `Acci\xF3n Remota: ${accion}`;
    let auditDetalles = `Comando de ${accion} enviado a la estaci\xF3n ${equipo.hostname} (Asignado a: ${((_a = equipo.colaborador) == null ? void 0 : _a.nombre) || "N/A"}).`;
    let socketEventName = "comando_ping";
    let dataUpdate = {};
    if (accion === "Bloquear") {
      nuevoEstado = "Bloqueado";
      socketEventName = "comando_bloqueo";
      dataUpdate.estado = "Bloqueado";
    } else if (accion === "Desbloquear") {
      nuevoEstado = equipo.colaborador_id ? "Activo" : "Disponible";
      socketEventName = "comando_ping";
      dataUpdate.estado = nuevoEstado;
    } else if (accion === "Reiniciar") {
      socketEventName = "comando_reinicio";
      auditAccion = `Forzar Reinicio MDM`;
      auditDetalles = `Reinicio del equipo solicitado de forma remota para ${equipo.hostname} (Asignado a: ${((_b = equipo.colaborador) == null ? void 0 : _b.nombre) || "N/A"}).`;
    } else if (accion === "BorrarDatos") {
      nuevoEstado = "Disponible";
      socketEventName = "comando_wipe";
      dataUpdate.estado = "Disponible";
      dataUpdate.colaborador_id = null;
      auditAccion = `Borrado Remoto (Wipe)`;
      auditDetalles = `Se proces\xF3 la orden de borrado completo y desvinculaci\xF3n definitiva para la estaci\xF3n de trabajo ${equipo.hostname}.`;
    } else if (accion === "Mantenimiento") {
      nuevoEstado = "En_mantenimiento";
      socketEventName = "comando_mantenimiento";
      dataUpdate.estado = "En_mantenimiento";
      auditAccion = `Equipo en Mantenimiento`;
      auditDetalles = `Se marc\xF3 el equipo ${equipo.hostname} como "En Mantenimiento" remotamente por el \xE1rea de TI.`;
    } else if (accion === "MarcarActivo") {
      nuevoEstado = equipo.colaborador_id ? "Activo" : "Disponible";
      socketEventName = "comando_ping";
      dataUpdate.estado = nuevoEstado;
      auditAccion = `Reactivaci\xF3n de Equipo`;
      auditDetalles = `El equipo ${equipo.hostname} fue marcado como "${nuevoEstado}" al salir de mantenimiento.`;
    } else if (accion === "EnviarAlerta") {
      socketEventName = "comando_alerta";
      auditAccion = `Mensaje de Alerta MDM`;
      auditDetalles = `Mensaje de notificaci\xF3n enviado a la estaci\xF3n ${equipo.hostname}. Texto: "${mensaje || "Alerta TI"}".`;
    } else if (accion === "EjecutarScript") {
      socketEventName = "comando_script";
      auditAccion = `Ejecuci\xF3n de Comando Shell`;
      auditDetalles = `Shell script ejecutado de forma remota en ${equipo.hostname}. Comando: "${comando || "N/D"}".`;
    }
    if (Object.keys(dataUpdate).length > 0) {
      await prisma.equipo.update({
        where: { id: equipo.id },
        data: dataUpdate
      });
    }
    const rawServer = event.node.req.socket.server;
    const io = rawServer == null ? void 0 : rawServer._io;
    if (io) {
      io.to(equipo.token_seguridad).emit(socketEventName, {
        evento: socketEventName,
        hostname: equipo.hostname,
        mensaje: mensaje || `Acci\xF3n remota ejecutada: ${accion}`,
        comando: comando || "",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    }
    await prisma.auditoria.create({
      data: {
        accion: auditAccion,
        detalles: auditDetalles,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1"
      }
    });
    return {
      success: true,
      mensaje: `Acci\xF3n ${accion} enviada con \xE9xito.`,
      estado: nuevoEstado
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al procesar acci\xF3n remota: ${error.message}`
    });
  }
});

export { accion_post as default };
//# sourceMappingURL=accion.post.mjs.map
