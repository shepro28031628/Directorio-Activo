import { prisma } from '../../utils/prisma'
import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const {
    token_seguridad,
    nombrePc,
    bateriaPorcentaje,
    ramGb,
    sistemaOperativo,
    actualizaciones,
    appsInstaladas,
    discUsoPct,
    policiesApplied,
    adGroups,
    organizationalUnit,
    metadata,
  } = body

  if (!token_seguridad) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Token de seguridad requerido.',
    })
  }

  const equipo = await prisma.equipo.findUnique({
    where: { token_seguridad },
  })

  if (!equipo) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Equipo no encontrado.',
    })
  }

  const info = await prisma.infoEquipo.create({
    data: {
      equipoId: equipo.id,
      nombrePc: nombrePc ?? '',
      bateriaPorcentaje: bateriaPorcentaje ?? null,
      ramGb: ramGb ?? 0,
      sistemaOperativo: sistemaOperativo ?? '',
      actualizaciones: actualizaciones ? JSON.stringify(actualizaciones) : null,
      appsInstaladas: appsInstaladas ? JSON.stringify(appsInstaladas) : null,
      discUsoPct: discUsoPct ?? null,
      policiesApplied: policiesApplied ? JSON.stringify(policiesApplied) : null,
      adGroups: adGroups ? JSON.stringify(adGroups) : null,
      organizationalUnit: organizationalUnit ?? null,
      metadata: metadata ? JSON.stringify(metadata) : null,
    },
  })

  return { success: true, infoId: info.id }
})
