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

const ping_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    token_seguridad,
    // Identidad / Hardware
    serial,
    uuid,
    windows_user,
    // Sistema Operativo
    so,
    os_version,
    os_build,
    // CPU
    procesador,
    cpu_nucleos,
    cpu_carga,
    // RAM / Disco
    ram,
    ram_uso,
    disco,
    disco_uso_pct,
    disco_usado_gb,
    // Programas
    programas,
    // Red local
    ip_registro,
    ip_local,
    mac_address,
    adaptadores,
    // Red pública / VPN
    ip_publica,
    isp,
    ciudad,
    pais,
    vpn
  } = body;
  if (!token_seguridad) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token de seguridad requerido."
    });
  }
  try {
    const equipo = await prisma.equipo.findUnique({
      where: { token_seguridad },
      include: { colaborador: true }
    });
    if (!equipo) {
      throw createError({
        statusCode: 404,
        statusMessage: "Equipo no registrado."
      });
    }
    await prisma.equipo.update({
      where: { id: equipo.id },
      data: {
        ultimo_ping: /* @__PURE__ */ new Date(),
        // Hardware
        so: so || equipo.so,
        procesador: procesador || equipo.procesador,
        ram: ram || equipo.ram,
        disco: disco || equipo.disco,
        serial: serial || equipo.serial,
        // Red
        ip_registro: ip_local || ip_registro || equipo.ip_registro,
        mac_address: mac_address || equipo.mac_address,
        // Telemetría real del agente
        ...cpu_carga !== void 0 && { cpu_carga: Number(cpu_carga) },
        ...ram_uso !== void 0 && { ram_uso: Number(ram_uso) },
        ...disco_uso_pct !== void 0 && { disco_uso_pct: Number(disco_uso_pct) },
        ...disco_usado_gb !== void 0 && { disco_usado_gb: Number(disco_usado_gb) }
      }
    });
    if (programas && Array.isArray(programas)) {
      await prisma.programaInstalado.deleteMany({
        where: { equipo_id: equipo.id }
      });
      await prisma.programaInstalado.createMany({
        data: programas.map((p) => ({
          equipo_id: equipo.id,
          nombre: p.nombre,
          version: p.version || ""
        }))
      });
    }
    let comando = "NINGUNO";
    if (equipo.estado === "Bloqueado" || equipo.colaborador && (equipo.colaborador.estado === "Retirado" || equipo.colaborador.estado === "Suspendido")) {
      comando = "BLOQUEAR";
    }
    return {
      hostname: equipo.hostname,
      estado: equipo.estado,
      comando
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar ping del agente: ${error.message}`
    });
  }
});

export { ping_post as default };
//# sourceMappingURL=ping.post.mjs.map
