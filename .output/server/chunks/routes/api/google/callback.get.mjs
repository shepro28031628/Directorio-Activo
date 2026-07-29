import { c as defineEventHandler, g as getQuery, e as createError, h as sendRedirect } from '../../../_/nitro.mjs';
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

const callback_get = defineEventHandler(async (event) => {
  var _a, _b;
  const query = getQuery(event);
  const code = query.code ? String(query.code) : "";
  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "C\xF3digo de autorizaci\xF3n faltante en la redirecci\xF3n de Google."
    });
  }
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  if (!fs.existsSync(oauthPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Archivo google_oauth.json no encontrado."
    });
  }
  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
    const credentials = oauthData.web || oauthData.installed;
    const redirectUri = ((_a = credentials.redirect_uris) == null ? void 0 : _a.find((uri) => uri.includes("3000"))) || ((_b = credentials.redirect_uris) == null ? void 0 : _b[0]) || "http://localhost";
    const tokenResp = await fetch(credentials.token_uri || "https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });
    if (!tokenResp.ok) {
      throw new Error(`Google Token exchange failed: ${await tokenResp.text()}`);
    }
    const tokenData = await tokenResp.json();
    if (tokenData.expires_in) {
      tokenData.expiry_date = Date.now() + tokenData.expires_in * 1e3;
    }
    fs.mkdirSync(path.dirname(tokenPath), { recursive: true });
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
    return sendRedirect(event, "/google/admin?sync_auth=success");
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al intercambiar token con Google: ${error.message}`
    });
  }
});

export { callback_get as default };
//# sourceMappingURL=callback.get.mjs.map
