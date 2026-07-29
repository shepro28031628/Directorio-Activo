import { prisma } from '../../utils/prisma'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { hostname, mac_address, ip_registro, marca_modelo, tipo_activo, so, ram, disco, procesador, serial, colaborador_id } = body

  if (!hostname) {
    throw createError({ statusCode: 400, statusMessage: 'El hostname es requerido.' })
  }

  try {
    const token_seguridad = crypto.randomBytes(32).toString('hex')

    const equipo = await prisma.equipo.create({
      data: {
        hostname,
        mac_address,
        ip_registro,
        marca_modelo,
        tipo_activo: tipo_activo || 'Portatil',
        so,
        ram,
        disco,
        procesador,
        serial,
        colaborador_id: colaborador_id ? parseInt(colaborador_id) : null,
        token_seguridad,
        estado: 'Disponible'
      }
    })

    // Registrar auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Crear Equipo',
        detalles: `Equipo registrado: ${hostname} (Serial: ${serial || 'N/A'})`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Equipos'
      }
    })

    return equipo
  } catch (error: any) {
    if (error.code === 'P2002') {
      throw createError({
        statusCode: 400,
        statusMessage: `Ya existe un equipo con ese hostname o MAC address.`
      })
    }
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar equipo: ${error.message}`
    })
  }
})
