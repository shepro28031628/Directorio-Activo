import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { equipoId, accion, mensaje, comando } = body

  if (!equipoId || !accion) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Campos requeridos faltantes (equipoId, accion).'
    })
  }

  try {
    const equipo = await prisma.equipo.findUnique({
      where: { id: parseInt(equipoId) },
      include: { colaborador: true }
    })

    if (!equipo) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Equipo no encontrado.'
      })
    }

    let nuevoEstado = equipo.estado
    let auditAccion = `Acción Remota: ${accion}`
    let auditDetalles = `Comando de ${accion} enviado a la estación ${equipo.hostname} (Asignado a: ${equipo.colaborador?.nombre || 'N/A'}).`
    let socketEventName = 'comando_ping'
    let dataUpdate: any = {}

    if (accion === 'Bloquear') {
      nuevoEstado = 'Bloqueado'
      socketEventName = 'comando_bloqueo'
      dataUpdate.estado = 'Bloqueado'
    } else if (accion === 'Desbloquear') {
      nuevoEstado = equipo.colaborador_id ? 'Activo' : 'Disponible'
      socketEventName = 'comando_desbloqueo'
      dataUpdate.estado = nuevoEstado
    } else if (accion === 'Reiniciar') {
      socketEventName = 'comando_reinicio'
      auditAccion = `Forzar Reinicio MDM`
      auditDetalles = `Reinicio del equipo solicitado de forma remota para ${equipo.hostname} (Asignado a: ${equipo.colaborador?.nombre || 'N/A'}).`
    } else if (accion === 'BorrarDatos') {
      nuevoEstado = 'Disponible'
      socketEventName = 'comando_wipe'
      dataUpdate.estado = 'Disponible'
      dataUpdate.colaborador_id = null // Rompe vinculación del colaborador
      auditAccion = `Borrado Remoto (Wipe)`
      auditDetalles = `Se procesó la orden de borrado completo y desvinculación definitiva para la estación de trabajo ${equipo.hostname}.`
    } else if (accion === 'Mantenimiento') {
      nuevoEstado = 'En_mantenimiento'
      socketEventName = 'comando_mantenimiento'
      dataUpdate.estado = 'En_mantenimiento'
      auditAccion = `Equipo en Mantenimiento`
      auditDetalles = `Se marcó el equipo ${equipo.hostname} como "En Mantenimiento" remotamente por el área de TI.`
    } else if (accion === 'MarcarActivo') {
      nuevoEstado = equipo.colaborador_id ? 'Activo' : 'Disponible'
      socketEventName = 'comando_ping'
      dataUpdate.estado = nuevoEstado
      auditAccion = `Reactivación de Equipo`
      auditDetalles = `El equipo ${equipo.hostname} fue marcado como "${nuevoEstado}" al salir de mantenimiento.`
    } else if (accion === 'EnviarAlerta') {
      socketEventName = 'comando_alerta'
      auditAccion = `Mensaje de Alerta MDM`
      auditDetalles = `Mensaje de notificación enviado a la estación ${equipo.hostname}. Texto: "${mensaje || 'Alerta TI'}".`
    } else if (accion === 'EjecutarScript') {
      socketEventName = 'comando_script'
      auditAccion = `Ejecución de Comando Shell`
      auditDetalles = `Shell script ejecutado de forma remota en ${equipo.hostname}. Comando: "${comando || 'N/D'}".`
    }

    // Actualizar base de datos en caso de cambio de estado
    if (Object.keys(dataUpdate).length > 0) {
      await prisma.equipo.update({
        where: { id: equipo.id },
        data: dataUpdate
      })
    }

    // Emitir WebSocket al agente
    const rawServer = (event.node.req.socket as any).server
    const io = rawServer?._io
    
    if (io) {
      io.to(equipo.token_seguridad).emit(socketEventName, {
        evento: socketEventName,
        hostname: equipo.hostname,
        mensaje: mensaje || `Acción remota ejecutada: ${accion}`,
        comando: comando || '',
        timestamp: new Date().toISOString()
      })
    }

    // Registrar en auditoría
    await prisma.auditoria.create({
      data: {
        accion: auditAccion,
        detalles: auditDetalles,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1'
      }
    })

    return {
      success: true,
      mensaje: `Acción ${accion} enviada con éxito.`,
      estado: nuevoEstado
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al procesar acción remota: ${error.message}`
    })
  }
})
