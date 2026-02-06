// Try to import PrismaClient, fallback to mock if not available
let PrismaClient: any
let prismaInstance: any

try {
  const prismaModule = require('@prisma/client')
  PrismaClient = prismaModule.PrismaClient

  const globalForPrisma = global as unknown as { prisma: any }

  prismaInstance =
    globalForPrisma.prisma ||
    new PrismaClient({
      log: ['query', 'error', 'warn'],
    })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaInstance
  }
} catch (error) {
  console.warn('⚠️  @prisma/client not found, using mock Prisma client')
  console.warn('   Run: npm install @prisma/client prisma')
  const { mockPrisma } = require('./prisma-mock')
  prismaInstance = mockPrisma
}

export const prisma = prismaInstance
