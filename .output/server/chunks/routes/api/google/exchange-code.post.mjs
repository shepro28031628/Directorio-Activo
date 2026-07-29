import { c as defineEventHandler, r as readBody, e as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
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
import '@prisma/client';

const exchangeCode_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const code = body.code ? String(body.code).trim() : "";
  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: "C\xF3digo de autorizaci\xF3n requerido."
    });
  }
  const oauthPath = path.join(process.cwd(), "backend/credentials/google_oauth.json");
  const tokenPath = path.join(process.cwd(), "backend/credentials/google_token.json");
  if (!fs.existsSync(oauthPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Archivo google_oauth.json no configurado en backend/credentials/"
    });
  }
  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, "utf8"));
    const credentials = oauthData.web || oauthData.installed;
    let tokenData = null;
    let errorMsg = "";
    const redirectUris = [
      ((_a = credentials.redirect_uris) == null ? void 0 : _a.find((uri) => uri.includes("3000"))) || "http://localhost:3000/api/google/callback",
      "http://localhost",
      "urn:ietf:wg:oauth:2.0:oob"
    ];
    for (const redirectUri of redirectUris) {
      try {
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
        if (tokenResp.ok) {
          tokenData = await tokenResp.json();
          break;
        } else {
          errorMsg = await tokenResp.text();
        }
      } catch (err) {
        errorMsg = err.message;
      }
    }
    if (!tokenData) {
      throw new Error(`Google Token exchange failed with redirects. Details: ${errorMsg}`);
    }
    if (tokenData.expires_in) {
      tokenData.expiry_date = Date.now() + tokenData.expires_in * 1e3;
    }
    fs.mkdirSync(path.dirname(tokenPath), { recursive: true });
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2));
    await prisma.auditoria.create({
      data: {
        accion: "Autenticar Google Workspace",
        detalles: "Se vincul\xF3 y gener\xF3 exitosamente el archivo de token OAuth 2.0 (google_token.json).",
        usuario_auditor: "admin@renconsultores.com.co",
        ip_origen: "127.0.0.1",
        modulo: "Google Workspace"
      }
    });
    return {
      success: true,
      mensaje: "Google Workspace autenticado correctamente. Archivo google_token.json generado."
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al intercambiar token manual con Google: ${error.message}`
    });
  }
});

export { exchangeCode_post as default };
//# sourceMappingURL=exchange-code.post.mjs.map
