import { c as defineEventHandler, i as setHeader } from '../../_/nitro.mjs';
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

const BUILD_TIME = Date.now().toString();
const APP_VERSION = process.env.APP_VERSION || "1.1.0";
const version_get = defineEventHandler((event) => {
  setHeader(event, "Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
  setHeader(event, "Pragma", "no-cache");
  setHeader(event, "Expires", "0");
  return {
    version: APP_VERSION,
    buildTime: BUILD_TIME,
    timestamp: Date.now()
  };
});

export { version_get as default };
//# sourceMappingURL=version.get.mjs.map
