// server/routes/agent/ren-lock.ps1.ts
// Sirve el script de pantalla de bloqueo WPF para que install.ps1 lo descargue.
// GET /agent/ren-lock.ps1

import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const lockPath = resolve(process.cwd(), 'scripts/ren-lock.ps1')
    const content = readFileSync(lockPath, 'utf-8')
    setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
    setResponseHeader(event, 'Content-Disposition', 'attachment; filename="ren-lock.ps1"')
    return content
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `No se pudo leer ren-lock.ps1: ${err.message}`
    })
  }
})
