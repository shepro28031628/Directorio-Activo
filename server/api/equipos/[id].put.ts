import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params?.id || '0')
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID inválido' })
  }

  const body = await readBody(event)
  const { hostname, mac_address, ip_registro, marca_modelo, tipo_activo, so, ram, disco, procesador, serial, colaborador_id, estado } = body

  try {
    const equipo = await prisma.equipo.update({
      where: { id },
      data: {
        ...(hostname && { hostname }),
        ...(mac_address !== undefined && { mac_address }),
        ...(ip_registro !== undefined && { ip_registro }),
        ...(marca_modelo !== undefined && { marca_modelo }),
        ...(tipo_activo && { tipo_activo }),
        ...(so !== undefined && { so }),
        ...(ram !== undefined && { ram }),
        ...(disco !== undefined && { disco }),
        ...(procesador !== undefined && { procesador }),
        ...(serial !== undefined && { serial }),
        ...(colaborador_id !== undefined && { colaborador_id: colaborador_id ? parseInt(colaborador_id) : null }),
        ...(estado && { estado })
      }
    })

    // Registrar auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Actualizar Equipo',
        detalles: `Equipo actualizado: ${equipo.hostname} (ID: ${equipo.id})`,
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
      statusMessage: `Error al actualizar equipo: ${error.message}`
    })
  }
})
