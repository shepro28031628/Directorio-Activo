import { prisma } from './prisma'

interface SophosSession {
  accessToken: string
  tenantId: string
  dataRegionUrl: string
}

let cachedSession: SophosSession | null = null
let cacheExpiry = 0

/**
 * Autentica con Sophos Central y obtiene el token de acceso, tenant ID y URL regional.
 */
export async function getSophosSession(): Promise<SophosSession> {
  const clientId = process.env.SOPHOS_CLIENT_ID
  const clientSecret = process.env.SOPHOS_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error('SOPHOS_CLIENT_ID y SOPHOS_CLIENT_SECRET no están configurados en las variables de entorno.')
  }

  // Si está en caché y sigue siendo válido (5 minutos de margen)
  if (cachedSession && Date.now() < cacheExpiry - 300000) {
    return cachedSession
  }

  // 1. Solicitar token OAuth2
  const tokenParams = new URLSearchParams()
  tokenParams.append('grant_type', 'client_credentials')
  tokenParams.append('client_id', clientId)
  tokenParams.append('client_secret', clientSecret)
  tokenParams.append('scope', 'token')

  const tokenResp = await fetch('https://id.sophos.com/api/v2/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: tokenParams.toString()
  })

  if (!tokenResp.ok) {
    const errorText = await tokenResp.text()
    throw new Error(`Error de autenticación con Sophos OAuth: ${tokenResp.statusText} - ${errorText}`)
  }

  const tokenData: any = await tokenResp.json()
  const accessToken = tokenData.access_token
  const expiresIn = tokenData.expires_in || 3600

  // 2. Obtener información de tenant y región (Whoami)
  const whoamiResp = await fetch('https://api.central.sophos.com/whoami/v1', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })

  if (!whoamiResp.ok) {
    const errorText = await whoamiResp.text()
    throw new Error(`Error en Sophos Whoami: ${whoamiResp.statusText} - ${errorText}`)
  }

  const whoamiData: any = await whoamiResp.json()
  const tenantId = whoamiData.id
  const dataRegionUrl = whoamiData.apiHosts?.dataRegion

  if (!tenantId || !dataRegionUrl) {
    throw new Error('No se pudo determinar el Tenant ID o la región de datos de Sophos Central.')
  }

  cachedSession = {
    accessToken,
    tenantId,
    dataRegionUrl
  }
  cacheExpiry = Date.now() + (expiresIn * 1000)

  return cachedSession
}

/**
 * Habilita o deshabilita la aislamiento de red de un equipo en Sophos Central.
 */
export async function setSophosEndpointIsolation(hostname: string, isolate: boolean): Promise<{ success: boolean, message: string }> {
  try {
    const session = await getSophosSession()

    // 1. Buscar el dispositivo por hostname en Sophos Central
    const queryUrl = `${session.dataRegionUrl}/endpoint/v1/endpoints?hostnameContains=${encodeURIComponent(hostname)}`
    const searchResp = await fetch(queryUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'X-Tenant-ID': session.tenantId
      }
    })

    if (!searchResp.ok) {
      const errorText = await searchResp.text()
      return { success: false, message: `Error al buscar endpoint en Sophos: ${searchResp.statusText} - ${errorText}` }
    }

    const searchData: any = await searchResp.json()
    const items = searchData.items || []

    if (items.length === 0) {
      return { success: false, message: `No se encontró ningún equipo en Sophos Central con el nombre: ${hostname}` }
    }

    // Tomar el primer dispositivo que coincida
    const endpointId = items[0].id

    // 2. Aplicar/remover aislamiento de red
    const isolationUrl = `${session.dataRegionUrl}/endpoint/v1/endpoints/isolation`
    const isolationResp = await fetch(isolationUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'X-Tenant-ID': session.tenantId,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        enabled: isolate,
        comment: isolate 
          ? 'Aislamiento preventivo: Acceso revocado en RENOVA MDM' 
          : 'Aislamiento removido: Acceso concedido en RENOVA MDM',
        ids: [endpointId]
      })
    })

    if (!isolationResp.ok) {
      const errorText = await isolationResp.text()
      return { success: false, message: `Error en la acción de aislamiento: ${isolationResp.statusText} - ${errorText}` }
    }

    return { 
      success: true, 
      message: isolate 
        ? `Dispositivo ${hostname} aislado exitosamente en Sophos.` 
        : `Aislamiento del dispositivo ${hostname} removido exitosamente en Sophos.` 
    }
  } catch (error: any) {
    return { success: false, message: error.message }
  }
}
