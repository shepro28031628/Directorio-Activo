import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const tokenPath = path.join(process.cwd(), 'backend/credentials/google_token.json')
  const oauthPath = path.join(process.cwd(), 'backend/credentials/google_oauth.json')

  const hasOauth = fs.existsSync(oauthPath)
  const hasToken = fs.existsSync(tokenPath)

  let email = ''
  if (hasToken) {
    try {
      const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'))
      // Podemos inferir el correo o dejarlo vacío
      email = tokenData.scope?.includes('userinfo') ? 'Autenticado' : 'Configurado'
    } catch {
      // Ignorar error de lectura
    }
  }

  return {
    configured: hasOauth,
    authenticated: hasToken,
    details: hasToken ? 'Conectado a Google Workspace' : 'Pendiente de Autenticación'
  }
})
