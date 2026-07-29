import { c as defineEventHandler, j as setResponseHeader, e as createError } from '../../_/nitro.mjs';
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

const renAgent_js = defineEventHandler(async (event) => {
  try {
    const agentPath = resolve(process.cwd(), "scripts/ren-agent.js");
    const content = readFileSync(agentPath, "utf-8");
    setResponseHeader(event, "Content-Type", "application/javascript");
    setResponseHeader(event, "Content-Disposition", 'attachment; filename="ren-agent.js"');
    return content;
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: `No se pudo leer el agente: ${err.message}`
    });
  }
});

export { renAgent_js as default };
//# sourceMappingURL=ren-agent.js.mjs.map
