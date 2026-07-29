import { prisma } from '../../utils/prisma'
import { createGoogleUserReal } from '../../utils/google'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const nombre = body.nombre ? String(body.nombre).trim() : ''
  const correo = body.correo ? String(body.correo).trim().toLowerCase() : ''
  const area = body.area ? String(body.area).trim() : 'Tecnología'

  if (!nombre || !correo) {
    throw createError({ statusCode: 400, statusMessage: 'Nombre y correo son requeridos.' })
  }

  try {
    // 1. Validar si ya existe localmente
    const existing = await prisma.usuarioGoogle.findUnique({
      where: { correo }
    })
    if (existing) {
      throw createError({ statusCode: 400, statusMessage: 'El correo electrónico ya está registrado.' })
    }

    // 2. Crear en Google Workspace API Real
    let googleId = 'G-MOCK-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    let apiSuccess = false
    try {
      const realUser = await createGoogleUserReal(correo, nombre, '/' + area)
      if (realUser?.id) {
        googleId = realUser.id
        apiSuccess = true
      }
    } catch (err: any) {
      console.warn('Real Google user creation failed, falling back to simulated model:', err.message)
    }

    // 3. Crear en la base de datos local
    const newUser = await prisma.usuarioGoogle.create({
      data: {
        google_id: googleId,
        nombre,
        correo,
        activo: true,
        area,
        sincronizado_en: new Date()
      }
    })

    // 4. Crear acceso automático en la matriz de accesos si el colaborador existe
    const appGoogle = await prisma.aplicacion.findFirst({
      where: { nombre: 'Google Workspace' }
    })
    if (appGoogle) {
      const username = correo.split('@')[0]
      const col = await prisma.colaborador.findFirst({
        where: {
          OR: [
            { correo },
            { correo: { startsWith: username + '@' } },
            { correo: { startsWith: username + '+' } }
          ]
        }
      })
      if (col) {
        await prisma.acceso.create({
          data: {
            colaborador_id: col.id,
            aplicacion_id: appGoogle.id,
            estado: 'Activo'
          }
        })
      }
    }

    // Auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Crear Usuario Google Workspace',
        detalles: `Creado el usuario ${nombre} (${correo}) en el área ${area}. Realizado vía API: ${apiSuccess ? 'Sí' : 'Simulada'}.`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Google Workspace'
      }
    })

    return {
      success: true,
      mensaje: 'Usuario de Google Workspace creado exitosamente.',
      user: newUser,
      real: apiSuccess
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.statusMessage || `Error al crear usuario en Google Workspace: ${error.message}`
    })
  }
})
