import { prisma } from '../../utils/prisma'
import { setSophosEndpointIsolation } from '../../utils/sophos'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { accesoId } = body

    if (!accesoId) {
      throw createError({ statusCode: 400, statusMessage: 'ID de acceso requerido' })
    }

    const acceso = await prisma.acceso.findUnique({
      where: { id: Number(accesoId) },
      include: { colaborador: true, aplicacion: true }
    })

    if (!acceso) {
      throw createError({ statusCode: 404, statusMessage: 'Acceso no encontrado' })
    }

    const nuevoEstado = acceso.estado === 'Activo' ? 'Revocado' : 'Activo'

    const accesoActualizado = await prisma.acceso.update({
      where: { id: acceso.id },
      data: {
        estado: nuevoEstado,
        actualizado_en: new Date()
      },
      include: { colaborador: true, aplicacion: true }
    })

    // Sincronización real con Sophos Central
    let sophosLogs: string[] = []
    if (acceso.aplicacion.nombre === 'Sophos Antivirus') {
      try {
        const equipos = await prisma.equipo.findMany({
          where: { colaborador_id: acceso.colaborador_id }
        })

        if (equipos.length > 0) {
          const shouldIsolate = nuevoEstado === 'Revocado'
          for (const eq of equipos) {
            const res = await setSophosEndpointIsolation(eq.hostname, shouldIsolate)
            sophosLogs.push(`${eq.hostname}: ${res.success ? 'OK' : 'Error (' + res.message + ')'}`)
          }
        } else {
          sophosLogs.push('El colaborador no tiene equipos asignados en la base de datos.')
        }
      } catch (err: any) {
        sophosLogs.push(`Error de conexión con Sophos API: ${err.message}`)
      }
    }

    // Registrar en auditoría
    await prisma.auditoria.create({
      data: {
        accion: nuevoEstado === 'Activo' ? 'Otorgar Acceso' : 'Revocar Acceso',
        detalles: `Cambio de acceso a "${acceso.aplicacion.nombre}" para ${acceso.colaborador.nombre} a: ${nuevoEstado}.${
          sophosLogs.length > 0 ? ' Sophos API: ' + sophosLogs.join(' | ') : ''
        }`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Matriz de Accesos'
      }
    })

    return accesoActualizado
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al alternar estado del acceso: ${error.message}`
    })
  }
})
