// Mock Prisma Client - bypassing @prisma/client dependency
// Using runtime mock instead of compile-time dependency
import { mockPrisma } from './prisma-mock'

export const prisma = mockPrisma
