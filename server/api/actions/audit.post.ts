// server/api/actions/audit.post.ts
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { deviceId, adminUser, actionType, details } = body

  if (!deviceId || !adminUser || !actionType) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Campos requeridos faltantes para auditoría.'
    })
  }

  try {
    const auditEntry = await prisma.auditLog.create({
      data: {
        deviceId,
        adminUser,
        actionType,
        details,
        status: 'SUCCESS'
      }
    })

    // Simulación del trigger para WebSocket o Agente
    return {
      success: true,
      auditEntry
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar log de auditoría: ${error.message}`
    })
  }
})
