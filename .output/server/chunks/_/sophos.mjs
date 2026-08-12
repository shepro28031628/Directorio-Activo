let cachedSession = null;
let cacheExpiry = 0;
async function getSophosSession() {
  var _a;
  const clientId = process.env.SOPHOS_CLIENT_ID;
  const clientSecret = process.env.SOPHOS_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("SOPHOS_CLIENT_ID y SOPHOS_CLIENT_SECRET no est\xE1n configurados en las variables de entorno.");
  }
  if (cachedSession && Date.now() < cacheExpiry - 3e5) {
    return cachedSession;
  }
  const tokenParams = new URLSearchParams();
  tokenParams.append("grant_type", "client_credentials");
  tokenParams.append("client_id", clientId);
  tokenParams.append("client_secret", clientSecret);
  tokenParams.append("scope", "token");
  const tokenResp = await fetch("https://id.sophos.com/api/v2/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: tokenParams.toString()
  });
  if (!tokenResp.ok) {
    const errorText = await tokenResp.text();
    throw new Error(`Error de autenticaci\xF3n con Sophos OAuth: ${tokenResp.statusText} - ${errorText}`);
  }
  const tokenData = await tokenResp.json();
  const accessToken = tokenData.access_token;
  const expiresIn = tokenData.expires_in || 3600;
  const whoamiResp = await fetch("https://api.central.sophos.com/whoami/v1", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  if (!whoamiResp.ok) {
    const errorText = await whoamiResp.text();
    throw new Error(`Error en Sophos Whoami: ${whoamiResp.statusText} - ${errorText}`);
  }
  const whoamiData = await whoamiResp.json();
  const tenantId = whoamiData.id;
  const dataRegionUrl = (_a = whoamiData.apiHosts) == null ? void 0 : _a.dataRegion;
  if (!tenantId || !dataRegionUrl) {
    throw new Error("No se pudo determinar el Tenant ID o la regi\xF3n de datos de Sophos Central.");
  }
  cachedSession = {
    accessToken,
    tenantId,
    dataRegionUrl
  };
  cacheExpiry = Date.now() + expiresIn * 1e3;
  return cachedSession;
}
async function setSophosEndpointIsolation(hostname, isolate) {
  try {
    const session = await getSophosSession();
    const queryUrl = `${session.dataRegionUrl}/endpoint/v1/endpoints?hostnameContains=${encodeURIComponent(hostname)}`;
    const searchResp = await fetch(queryUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "X-Tenant-ID": session.tenantId
      }
    });
    if (!searchResp.ok) {
      const errorText = await searchResp.text();
      return { success: false, message: `Error al buscar endpoint en Sophos: ${searchResp.statusText} - ${errorText}` };
    }
    const searchData = await searchResp.json();
    const items = searchData.items || [];
    if (items.length === 0) {
      return { success: false, message: `No se encontr\xF3 ning\xFAn equipo en Sophos Central con el nombre: ${hostname}` };
    }
    const endpointId = items[0].id;
    const isolationUrl = `${session.dataRegionUrl}/endpoint/v1/endpoints/isolation`;
    const isolationResp = await fetch(isolationUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
        "X-Tenant-ID": session.tenantId,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        enabled: isolate,
        comment: isolate ? "Aislamiento preventivo: Acceso revocado en Directorio Activo Ren" : "Aislamiento removido: Acceso concedido en Directorio Activo Ren",
        ids: [endpointId]
      })
    });
    if (!isolationResp.ok) {
      const errorText = await isolationResp.text();
      return { success: false, message: `Error en la acci\xF3n de aislamiento: ${isolationResp.statusText} - ${errorText}` };
    }
    return {
      success: true,
      message: isolate ? `Dispositivo ${hostname} aislado exitosamente en Sophos.` : `Aislamiento del dispositivo ${hostname} removido exitosamente en Sophos.`
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

export { setSophosEndpointIsolation as s };
//# sourceMappingURL=sophos.mjs.map
