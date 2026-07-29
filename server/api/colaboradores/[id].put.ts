import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  const body = await readBody(event)
  const { nombre, correo, area, proyecto, jira_id, estado } = body

  try {
    const colaborador = await prisma.colaborador.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(correo && { correo }),
        ...(area && { area }),
        ...(proyecto && { proyecto }),
        ...(jira_id !== undefined && { jira_id: jira_id || null }),
        ...(estado && { estado })
      }
    })

    // Automático: Bloquear equipos asignados cuando el colaborador se retira o suspende
    if (['Retirado', 'Suspendido'].includes(estado)) {
      // Obtener los equipos vinculados al colaborador
      const equipos = await prisma.equipo.findMany({
        where: { colaborador_id: id, eliminado_en: null }
      })
      for (const eq of equipos) {
        // Actualizar estado a Bloqueado en la BD
        await prisma.equipo.update({
          where: { id: eq.id },
          data: { estado: 'Bloqueado' }
        })
        // Emitir comando de bloqueo vía socket si el agente está conectado
        const rawServer = (event.node.req.socket as any).server
        const io = rawServer?._io
        if (io && eq.token_seguridad) {
          io.to(eq.token_seguridad).emit('comando_bloqueo', {
            evento: 'comando_bloqueo',
            hostname: eq.hostname,
            mensaje: 'Bloqueo remoto por desvinculación de colaborador',
            comando: 'BLOQUEAR',
            timestamp: new Date().toISOString()
          })
        }
      }
    }

    // Registrar auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Actualizar Colaborador',
        detalles: `Colaborador actualizado: ${colaborador.nombre} (ID: ${colaborador.id})`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Colaboradores'
      }
    })

    return colaborador
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al actualizar colaborador: ${error.message}`
    })
  }
})
