import PrismaClientPkg from '@prisma/client';

const PrismaClient = PrismaClientPkg.PrismaClient || PrismaClientPkg;
let prisma;
{
  prisma = new PrismaClient();
}

export { prisma as p };
//# sourceMappingURL=prisma.mjs.map
