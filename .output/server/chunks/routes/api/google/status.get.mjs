import { c as defineEventHandler } from '../../../_/nitro.mjs';
import fs from 'fs';
import path from 'path';
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

const status_get = defineEventHandler(async (event) => {
  var _a;
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const hasOauth = fs.existsSync(oauthPath);
  const hasToken = fs.existsSync(tokenPath);
  let email = "";
  if (hasToken) {
    try {
      const tokenData = JSON.parse(fs.readFileSync(tokenPath, "utf8"));
      email = ((_a = tokenData.scope) == null ? void 0 : _a.includes("userinfo")) ? "Autenticado" : "Configurado";
    } catch {
    }
  }
  return {
    configured: hasOauth,
    authenticated: hasToken,
    details: hasToken ? "Conectado a Google Workspace" : "Pendiente de Autenticaci\xF3n"
  };
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map
