import { c as defineEventHandler, e as createError } from '../../../_/nitro.mjs';
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

const authUrl_get = defineEventHandler(async (event) => {
  var _a, _b;
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  if (!fs.existsSync(oauthPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Archivo google_oauth.json no configurado en backend/credentials/"
    });
  }
  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
    const credentials = oauthData.web || oauthData.installed;
    const clientId = credentials.client_id;
    const redirectUri = ((_a = credentials.redirect_uris) == null ? void 0 : _a.find((uri) => uri.includes("3000"))) || ((_b = credentials.redirect_uris) == null ? void 0 : _b[0]) || "http://localhost";
    const scopes = [
      "https://www.googleapis.com/auth/admin.directory.user.readonly",
      "https://www.googleapis.com/auth/admin.directory.user"
    ];
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: scopes.join(" "),
      access_type: "offline",
      prompt: "consent"
    }).toString();
    return { authUrl, redirectUri };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al generar URL de autenticaci\xF3n: ${error.message}`
    });
  }
});

export { authUrl_get as default };
//# sourceMappingURL=auth-url.get.mjs.map
