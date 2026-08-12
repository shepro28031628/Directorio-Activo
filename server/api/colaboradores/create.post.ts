import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { nombre, correo, area, proyecto, jira_id } = body

  if (!nombre || !correo || !area || !proyecto) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Campos requeridos faltantes (nombre, correo, area, proyecto).'
    })
  }

  try {
    const existing = await prisma.colaborador.findUnique({
      where: { correo }
    })
    if (existing) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Ya existe un colaborador registrado con este correo electrónico.'
      })
    }

    const colaborador = await prisma.colaborador.create({
      data: {
        nombre,
        correo,
        area,
        proyecto,
        jira_id: jira_id && String(jira_id).trim() !== '' ? String(jira_id).trim() : null,
        estado: 'Activo'
      }
    })

    // Auto-asignar Google Workspace y Slack Enterprise si existen en el catálogo
    const apps = await prisma.aplicacion.findMany()
    const baselineApps = apps.filter(
      (a) => a.nombre === 'Google Workspace' || a.nombre === 'Slack Enterprise'
    )

    for (const app of baselineApps) {
      await prisma.acceso.create({
        data: {
          colaborador_id: colaborador.id,
          aplicacion_id: app.id,
          estado: 'Activo'
        }
      })
    }

    // Registrar auditoría
    await prisma.auditoria.create({
      data: {
        accion: 'Crear Colaborador',
        detalles: `Colaborador creado: ${nombre} (${correo}) - Área: ${area}`,
        usuario_auditor: 'admin@renconsultores.com.co',
        ip_origen: '127.0.0.1',
        modulo: 'Colaboradores'
      }
    })

    return colaborador
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al registrar colaborador: ${error.message}`
    })
  }
})
