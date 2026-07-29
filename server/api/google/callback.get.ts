import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code ? String(query.code) : ''

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Código de autorización faltante en la redirección de Google.'
    })
  }

  const oauthPath = path.join(process.cwd(), 'backend/credentials/google_oauth.json')
  const tokenPath = path.join(process.cwd(), 'backend/credentials/google_token.json')

  if (!fs.existsSync(oauthPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Archivo google_oauth.json no encontrado.'
    })
  }

  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, 'utf8'))
    const credentials = oauthData.web || oauthData.installed

    const redirectUri = credentials.redirect_uris?.find((uri: string) => uri.includes('3000')) || credentials.redirect_uris?.[0] || 'http://localhost'

    const tokenResp = await fetch(credentials.token_uri || 'https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        code,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    })

    if (!tokenResp.ok) {
      throw new Error(`Google Token exchange failed: ${await tokenResp.text()}`)
    }

    const tokenData = await tokenResp.json()
    
    // Calcular fecha de expiración
    if (tokenData.expires_in) {
      tokenData.expiry_date = Date.now() + (tokenData.expires_in * 1000)
    }

    // Guardar token.json
    fs.mkdirSync(path.dirname(tokenPath), { recursive: true })
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2))

    // Redirigir de vuelta a la página administrativa de Google Workspace
    return sendRedirect(event, '/google/admin?sync_auth=success')
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al intercambiar token con Google: ${error.message}`
    })
  }
})
