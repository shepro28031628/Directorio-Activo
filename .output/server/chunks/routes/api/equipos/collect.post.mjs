import { p as prisma } from '../../../_/prisma.mjs';
import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import '@prisma/client';
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

const collect_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    token_seguridad,
    nombrePc,
    bateriaPorcentaje,
    ramGb,
    sistemaOperativo,
    actualizaciones,
    appsInstaladas,
    discUsoPct,
    policiesApplied,
    adGroups,
    organizationalUnit,
    metadata
  } = body;
  if (!token_seguridad) {
    throw createError({
      statusCode: 400,
      statusMessage: "Token de seguridad requerido."
    });
  }
  const equipo = await prisma.equipo.findUnique({
    where: { token_seguridad }
  });
  if (!equipo) {
    throw createError({
      statusCode: 404,
      statusMessage: "Equipo no encontrado."
    });
  }
  const info = await prisma.infoEquipo.create({
    data: {
      equipoId: equipo.id,
      nombrePc: nombrePc != null ? nombrePc : "",
      bateriaPorcentaje: bateriaPorcentaje != null ? bateriaPorcentaje : null,
      ramGb: ramGb != null ? ramGb : 0,
      sistemaOperativo: sistemaOperativo != null ? sistemaOperativo : "",
      actualizaciones: actualizaciones ? JSON.stringify(actualizaciones) : null,
      appsInstaladas: appsInstaladas ? JSON.stringify(appsInstaladas) : null,
      discUsoPct: discUsoPct != null ? discUsoPct : null,
      policiesApplied: policiesApplied ? JSON.stringify(policiesApplied) : null,
      adGroups: adGroups ? JSON.stringify(adGroups) : null,
      organizationalUnit: organizationalUnit != null ? organizationalUnit : null,
      metadata: metadata ? JSON.stringify(metadata) : null
    }
  });
  return { success: true, infoId: info.id };
});

export { collect_post as default };
//# sourceMappingURL=collect.post.mjs.map
