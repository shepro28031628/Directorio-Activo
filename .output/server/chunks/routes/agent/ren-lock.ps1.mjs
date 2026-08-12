import { c as defineEventHandler, k as setResponseHeader, e as createError } from '../../_/nitro.mjs';
import { readFileSync } from 'fs';
import { resolve } from 'path';
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

const renLock_ps1 = defineEventHandler(async (event) => {
  try {
    const lockPath = resolve(process.cwd(), "scripts/ren-lock.ps1");
    const content = readFileSync(lockPath, "utf-8");
    setResponseHeader(event, "Content-Type", "text/plain; charset=utf-8");
    setResponseHeader(event, "Content-Disposition", 'attachment; filename="ren-lock.ps1"');
    return content;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `No se pudo leer ren-lock.ps1: ${err.message}`
    });
  }
});

export { renLock_ps1 as default };
//# sourceMappingURL=ren-lock.ps1.mjs.map
