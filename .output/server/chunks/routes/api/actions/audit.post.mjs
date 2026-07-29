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

const audit_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { deviceId, adminUser, actionType, details } = body;
  if (!deviceId || !adminUser || !actionType) {
    throw createError({
      statusCode: 400,
      statusMessage: "Campos requeridos faltantes para auditor\xEDa."
    });
  }
  try {
    const auditEntry = await prisma.auditLog.create({
      data: {
        deviceId,
        adminUser,
        actionType,
        details,
        status: "SUCCESS"
      }
    });
    return {
      success: true,
      auditEntry
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar log de auditor\xEDa: ${error.message}`
    });
  }
});

export { audit_post as default };
//# sourceMappingURL=audit.post.mjs.map
