import { c as defineEventHandler, g as getQuery, e as createError } from '../../_/nitro.mjs';
import { p as prisma } from '../../_/prisma.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'socket.io';
import 'nitropack/dist/runtime/plugin';
import 'node:url';
import '@prisma/client';

const index_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    let estado = query.estado ? String(query.estado).trim() : void 0;
    if (estado === "[object Object]") estado = void 0;
    let area = query.area ? String(query.area).trim() : void 0;
    if (area === "[object Object]") area = void 0;
    let search = query.search ? String(query.search).trim() : "";
    if (search === "[object Object]") search = "";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 50;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? String(query.sortBy) : "nombre";
    const sortDesc = query.sortDesc === "true";
    const colaboradores = await prisma.colaborador.findMany({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado } : {},
          area ? { area } : {},
          search ? {
            OR: [
              { nombre: { contains: search, mode: "insensitive" } },
              { correo: { contains: search, mode: "insensitive" } },
              { proyecto: { contains: search, mode: "insensitive" } }
            ]
          } : {}
        ]
      },
      include: {
        equipos: true,
        accesos: {
          include: {
            aplicacion: true
          }
        }
      },
      orderBy: { [sortBy]: sortDesc ? "desc" : "asc" },
      skip,
      take: limit
    });
    const total = await prisma.colaborador.count({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado } : {},
          area ? { area } : {},
          search ? {
            OR: [
              { nombre: { contains: search, mode: "insensitive" } },
              { correo: { contains: search, mode: "insensitive" } },
              { proyecto: { contains: search, mode: "insensitive" } }
            ]
          } : {}
        ]
      }
    });
    if (query.paginate === "true") {
      return {
        data: colaboradores,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    return colaboradores;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar colaboradores: ${error.message}`
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index4.get.mjs.map
