import { defineEventHandler, setHeader } from 'h3'

// Generamos un build hash o timestamp al iniciar el servidor
const BUILD_TIME = Date.now().toString()
const APP_VERSION = process.env.APP_VERSION || '1.1.0'

export default defineEventHandler((event) => {
  // Aseguramos que la respuesta nunca se guarde en caché del navegador/CDN
  setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
  setHeader(event, 'Pragma', 'no-cache')
  setHeader(event, 'Expires', '0')

  return {
    version: APP_VERSION,
    buildTime: BUILD_TIME,
    timestamp: Date.now()
  }
})
