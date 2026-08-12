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
    let search = query.search ? String(query.search).trim() : "";
    if (search === "[object Object]") search = "";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 50;
    const skip = (page - 1) * limit;
    const sortBy = query.sortBy ? String(query.sortBy) : "hostname";
    const sortDesc = query.sortDesc === "true";
    const equipos = await prisma.equipo.findMany({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado } : {},
          search ? {
            OR: [
              { hostname: { contains: search, mode: "insensitive" } },
              { mac_address: { contains: search, mode: "insensitive" } },
              { marca_modelo: { contains: search, mode: "insensitive" } },
              { colaborador: { nombre: { contains: search, mode: "insensitive" } } }
            ]
          } : {}
        ]
      },
      include: {
        colaborador: true,
        programas: true
      },
      orderBy: { [sortBy]: sortDesc ? "desc" : "asc" },
      skip,
      take: limit
    });
    const total = await prisma.equipo.count({
      where: {
        AND: [
          { eliminado_en: null },
          estado ? { estado } : {},
          search ? {
            OR: [
              { hostname: { contains: search, mode: "insensitive" } },
              { mac_address: { contains: search, mode: "insensitive" } },
              { marca_modelo: { contains: search, mode: "insensitive" } },
              { colaborador: { nombre: { contains: search, mode: "insensitive" } } }
            ]
          } : {}
        ]
      }
    });
    if (query.paginate === "true") {
      return {
        data: equipos,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    return equipos;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al listar equipos: ${error.message}`
    });
  }
});

export { index_get as default };
//# sourceMappingURL=index6.get.mjs.map
