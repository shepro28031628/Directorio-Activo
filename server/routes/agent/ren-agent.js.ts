// server/routes/agent/ren-agent.js.ts
// Sirve el script del agente para que install.ps1 lo descargue en el equipo remoto.
// GET /agent/ren-agent.js

import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineEventHandler(async (event) => {
  try {
    const agentPath = resolve(process.cwd(), 'scripts/ren-agent.js')
    const content = readFileSync(agentPath, 'utf-8')
    setResponseHeader(event, 'Content-Type', 'application/javascript')
    setResponseHeader(event, 'Content-Disposition', 'attachment; filename="ren-agent.js"')
    return content
  } catch (err: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `No se pudo leer el agente: ${err.message}`
    })
  }
})
