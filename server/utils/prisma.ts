import PrismaClientPkg from '@prisma/client'

const PrismaClient = (PrismaClientPkg as any).PrismaClient || PrismaClientPkg

let prisma: any

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // Evitamos múltiples instancias de conexión en Hot-Reloading de desarrollo
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient()
  }
  prisma = (global as any).prisma
}

export { prisma }
