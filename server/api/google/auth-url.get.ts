import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const oauthPath = path.join(process.cwd(), 'backend/credentials/google_oauth.json')
  
  if (!fs.existsSync(oauthPath)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Archivo google_oauth.json no configurado en backend/credentials/'
    })
  }

  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, 'utf8'))
    const credentials = oauthData.web || oauthData.installed

    const clientId = credentials.client_id
    const redirectUri = credentials.redirect_uris?.find((uri: string) => uri.includes('3000')) || credentials.redirect_uris?.[0] || 'http://localhost'

    const scopes = [
      'https://www.googleapis.com/auth/admin.directory.user.readonly',
      'https://www.googleapis.com/auth/admin.directory.user'
    ]

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` + new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: scopes.join(' '),
      access_type: 'offline',
      prompt: 'consent'
    }).toString()

    return { authUrl, redirectUri }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al generar URL de autenticación: ${error.message}`
    })
  }
})
