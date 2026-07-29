import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const code = body.code ? String(body.code).trim() : ''

  if (!code) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Código de autorización requerido.'
    })
  }

  const oauthPath = path.join(process.cwd(), 'backend/credentials/google_oauth.json')
  const tokenPath = path.join(process.cwd(), 'backend/credentials/google_token.json')

  if (!fs.existsSync(oauthPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Archivo google_oauth.json no configurado en backend/credentials/'
    })
  }

  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, 'utf8'))
    const credentials = oauthData.web || oauthData.installed

    // Intentamos intercambiar usando el redirect_uri alternativo o el por defecto de installed
    let tokenData: any = null
    let errorMsg = ''

    // Para clientes "installed" (desktop), la redirect_uri suele ser http://localhost o urn:ietf:wg:oauth:2.0:oob o http://localhost:3000/api/google/callback
    const redirectUris = [
      credentials.redirect_uris?.find((uri: string) => uri.includes('3000')) || 'http://localhost:3000/api/google/callback',
      'http://localhost',
      'urn:ietf:wg:oauth:2.0:oob'
    ]

    for (const redirectUri of redirectUris) {
      try {
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

        if (tokenResp.ok) {
          tokenData = await tokenResp.json()
          break
        } else {
          errorMsg = await tokenResp.text()
        }
      } catch (err: any) {
        errorMsg = err.message
      }
    }

    if (!tokenData) {
      throw new Error(`Google Token exchange failed with redirects. Details: ${errorMsg}`)
    }

    // Calcular fecha de expiración
    if (tokenData.expires_in) {
      tokenData.expiry_date = Date.now() + (tokenData.expires_in * 1000)
    }

    // Guardar token.json
    fs.mkdirSync(path.dirname(tokenPath), { recursive: true })
    fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2))

    // Guardar auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Autenticar Google Workspace',
        detalles: 'Se vinculó y generó exitosamente el archivo de token OAuth 2.0 (google_token.json).',
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Google Workspace'
      }
    })

    return {
      success: true,
      mensaje: 'Google Workspace autenticado correctamente. Archivo google_token.json generado.'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al intercambiar token manual con Google: ${error.message}`
    })
  }
})
