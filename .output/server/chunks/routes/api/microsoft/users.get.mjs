import { c as defineEventHandler, g as getQuery, e as createError } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
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

const users_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const search = query.search ? String(query.search).trim() : "";
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 20;
    const skip = (page - 1) * limit;
    const whereClause = search ? {
      OR: [
        { nombre: { contains: search, mode: "insensitive" } },
        { correo: { contains: search, mode: "insensitive" } }
      ]
    } : {};
    const usuarios = await prisma.usuarioM365.findMany({
      where: whereClause,
      orderBy: { nombre: "asc" },
      skip: query.paginate === "true" ? skip : void 0,
      take: query.paginate === "true" ? limit : void 0
    });
    if (query.paginate === "true") {
      const total = await prisma.usuarioM365.count({ where: whereClause });
      return {
        data: usuarios,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit)
        }
      };
    }
    return usuarios;
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: `Error al obtener usuarios de Microsoft 365: ${error.message}`
    });
  }
});

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
