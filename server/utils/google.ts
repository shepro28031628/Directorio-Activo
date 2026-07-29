import fs from 'fs'
import path from 'path'

export interface GoogleUser {
  id: string
  primaryEmail: string
  name: { fullName: string }
  suspended: boolean
  orgUnitPath?: string
  lastLoginTime?: string
}

export async function getGoogleUsersReal(): Promise<GoogleUser[]> {
  const oauthPath = path.join(process.cwd(), 'backend/credentials/google_oauth.json')
  const tokenPath = path.join(process.cwd(), 'backend/credentials/google_token.json')

  if (!fs.existsSync(oauthPath)) {
    throw new Error('Archivo google_oauth.json no encontrado en backend/credentials/')
  }

  const oauthData = JSON.parse(fs.readFileSync(oauthPath, 'utf8'))
  const credentials = oauthData.web || oauthData.installed

  if (!fs.existsSync(tokenPath)) {
    throw new Error('Archivo google_token.json no encontrado. Autentique primero en Google.')
  }

  const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'))

  let accessToken = tokenData.access_token
  const isExpired = tokenData.expiry_date ? (Date.now() >= tokenData.expiry_date) : false

  if (isExpired && tokenData.refresh_token) {
    const refreshResp = await fetch(credentials.token_uri || 'https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        refresh_token: tokenData.refresh_token,
        grant_type: 'refresh_token'
      })
    })

    if (refreshResp.ok) {
      const refreshed = await refreshResp.json()
      accessToken = refreshed.access_token
      tokenData.access_token = accessToken
      if (refreshed.expires_in) {
        tokenData.expiry_date = Date.now() + (refreshed.expires_in * 1000)
      }
      fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2))
    } else {
      throw new Error('Error al refrescar token de Google: ' + await refreshResp.text())
    }
  }

  const domain = process.env.GOOGLE_DOMAIN || 'renconsultores.com.co'
  const url = `https://admin.googleapis.com/admin/directory/v1/users?domain=${domain}&maxResults=100`
  const usersResp = await fetch(url, {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  })

  if (!usersResp.ok) {
    throw new Error('Error al consultar usuarios en Google: ' + await usersResp.text())
  }

  const data = await usersResp.json()
  return data.users || []
}

export async function setGoogleUserStatusReal(email: string, suspended: boolean): Promise<boolean> {
  const oauthPath = path.join(process.cwd(), 'backend/credentials/google_oauth.json')
  const tokenPath = path.join(process.cwd(), 'backend/credentials/google_token.json')

  if (!fs.existsSync(oauthPath) || !fs.existsSync(tokenPath)) {
    return false
  }

  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, 'utf8'))
    const credentials = oauthData.web || oauthData.installed
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'))

    let accessToken = tokenData.access_token
    const isExpired = tokenData.expiry_date ? (Date.now() >= tokenData.expiry_date) : false

    if (isExpired && tokenData.refresh_token) {
      const refreshResp = await fetch(credentials.token_uri || 'https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
          refresh_token: tokenData.refresh_token,
          grant_type: 'refresh_token'
        })
      })
      if (refreshResp.ok) {
        const refreshed = await refreshResp.json()
        accessToken = refreshed.access_token
        tokenData.access_token = accessToken
        if (refreshed.expires_in) {
          tokenData.expiry_date = Date.now() + (refreshed.expires_in * 1000)
        }
        fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2))
      }
    }

    const patchResp = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${email}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ suspended })
    })

    return patchResp.ok
  } catch (error) {
    console.error('Error changing Google Workspace user status:', error)
    return false
  }
}

export async function createGoogleUserReal(email: string, fullName: string, orgUnitPath?: string): Promise<any> {
  const oauthPath = path.join(process.cwd(), 'backend/credentials/google_oauth.json')
  const tokenPath = path.join(process.cwd(), 'backend/credentials/google_token.json')

  if (!fs.existsSync(oauthPath) || !fs.existsSync(tokenPath)) {
    throw new Error('OAuth o Token de Google no configurado.')
  }

  const oauthData = JSON.parse(fs.readFileSync(oauthPath, 'utf8'))
  const credentials = oauthData.web || oauthData.installed
  const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'))

  let accessToken = tokenData.access_token
  const isExpired = tokenData.expiry_date ? (Date.now() >= tokenData.expiry_date) : false

  if (isExpired && tokenData.refresh_token) {
    const refreshResp = await fetch(credentials.token_uri || 'https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        refresh_token: tokenData.refresh_token,
        grant_type: 'refresh_token'
      })
    })
    if (refreshResp.ok) {
      const refreshed = await refreshResp.json()
      accessToken = refreshed.access_token
      tokenData.access_token = accessToken
      if (refreshed.expires_in) {
        tokenData.expiry_date = Date.now() + (refreshed.expires_in * 1000)
      }
      fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2))
    }
  }

  const names = fullName.trim().split(' ')
  const givenName = names[0] || 'Usuario'
  const familyName = names.slice(1).join(' ') || 'Google'

  const resp = await fetch('https://admin.googleapis.com/admin/directory/v1/users', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      primaryEmail: email,
      name: { givenName, familyName },
      password: 'ChangeMeTempPass123!',
      changePasswordAtNextLogin: true,
      orgUnitPath: orgUnitPath || '/'
    })
  })

  if (!resp.ok) {
    throw new Error(`Fallo al crear usuario en Google: ${await resp.text()}`)
  }

  return await resp.json()
}

export async function updateGoogleUserReal(email: string, fullName: string, orgUnitPath?: string): Promise<any> {
  const oauthPath = path.join(process.cwd(), 'backend/credentials/google_oauth.json')
  const tokenPath = path.join(process.cwd(), 'backend/credentials/google_token.json')

  if (!fs.existsSync(oauthPath) || !fs.existsSync(tokenPath)) {
    throw new Error('OAuth o Token de Google no configurado.')
  }

  const oauthData = JSON.parse(fs.readFileSync(oauthPath, 'utf8'))
  const credentials = oauthData.web || oauthData.installed
  const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'))

  let accessToken = tokenData.access_token
  const isExpired = tokenData.expiry_date ? (Date.now() >= tokenData.expiry_date) : false

  if (isExpired && tokenData.refresh_token) {
    const refreshResp = await fetch(credentials.token_uri || 'https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: credentials.client_id,
        client_secret: credentials.client_secret,
        refresh_token: tokenData.refresh_token,
        grant_type: 'refresh_token'
      })
    })
    if (refreshResp.ok) {
      const refreshed = await refreshResp.json()
      accessToken = refreshed.access_token
      tokenData.access_token = accessToken
      if (refreshed.expires_in) {
        tokenData.expiry_date = Date.now() + (refreshed.expires_in * 1000)
      }
      fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2))
    }
  }

  const names = fullName.trim().split(' ')
  const givenName = names[0] || 'Usuario'
  const familyName = names.slice(1).join(' ') || 'Google'

  const resp = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${email}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: { givenName, familyName },
      orgUnitPath: orgUnitPath || '/'
    })
  })

  if (!resp.ok) {
    throw new Error(`Fallo al actualizar usuario en Google: ${await resp.text()}`)
  }

  return await resp.json()
}

export async function deleteGoogleUserReal(email: string): Promise<boolean> {
  const oauthPath = path.join(process.cwd(), 'backend/credentials/google_oauth.json')
  const tokenPath = path.join(process.cwd(), 'backend/credentials/google_token.json')

  if (!fs.existsSync(oauthPath) || !fs.existsSync(tokenPath)) {
    return false
  }

  try {
    const oauthData = JSON.parse(fs.readFileSync(oauthPath, 'utf8'))
    const credentials = oauthData.web || oauthData.installed
    const tokenData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'))

    let accessToken = tokenData.access_token
    const isExpired = tokenData.expiry_date ? (Date.now() >= tokenData.expiry_date) : false

    if (isExpired && tokenData.refresh_token) {
      const refreshResp = await fetch(credentials.token_uri || 'https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: credentials.client_id,
          client_secret: credentials.client_secret,
          refresh_token: tokenData.refresh_token,
          grant_type: 'refresh_token'
        })
      })
      if (refreshResp.ok) {
        const refreshed = await refreshResp.json()
        accessToken = refreshed.access_token
        tokenData.access_token = accessToken
        if (refreshed.expires_in) {
          tokenData.expiry_date = Date.now() + (refreshed.expires_in * 1000)
        }
        fs.writeFileSync(tokenPath, JSON.stringify(tokenData, null, 2))
      }
    }

    const resp = await fetch(`https://admin.googleapis.com/admin/directory/v1/users/${email}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    return resp.ok
  } catch (error) {
    console.error('Error deleting Google Workspace user:', error)
    return false
  }
}

