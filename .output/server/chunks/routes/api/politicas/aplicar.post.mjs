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

const aplicar_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { politicas } = body;
  if (!politicas || !Array.isArray(politicas)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Formato de pol\xEDticas inv\xE1lido."
    });
  }
  try {
    const listDescription = politicas.map((p) => `${p.nombre.split(" (")[0]}: ${p.estado ? "Activa" : "Inactiva"}`).join(", ");
    await prisma.auditoria.create({
      data: {
        accion: "Actualizar Pol\xEDticas MDM",
        detalles: `Se actualiz\xF3 el perfil de seguridad global de la flota. Configuraci\xF3n: ${listDescription}.`,
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1"
      }
    });
    return {
      success: true,
      mensaje: "Pol\xEDticas registradas en auditor\xEDa exitosamente."
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al aplicar pol\xEDticas en backend: ${error.message}`
    });
  }
});

export { aplicar_post as default };
//# sourceMappingURL=aplicar.post.mjs.map
