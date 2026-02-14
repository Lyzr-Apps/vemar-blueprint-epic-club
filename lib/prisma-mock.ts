// Mock Prisma Client for development until proper installation
// This provides a fallback when @prisma/client is not available

type MockModel = {
  findMany: (args?: any) => Promise<any[]>
  findUnique: (args: any) => Promise<any | null>
  findFirst: (args: any) => Promise<any | null>
  create: (args: any) => Promise<any>
  update: (args: any) => Promise<any>
  delete: (args: any) => Promise<any>
  count: (args?: any) => Promise<number>
}

const createMockModel = (modelName: string): MockModel => ({
  findMany: async (args?: any) => {
    console.warn(`Mock Prisma: ${modelName}.findMany() called - returning empty array`)
    return []
  },
  findUnique: async (args: any) => {
    console.warn(`Mock Prisma: ${modelName}.findUnique() called - returning null`)
    return null
  },
  findFirst: async (args: any) => {
    console.warn(`Mock Prisma: ${modelName}.findFirst() called - returning null`)
    return null
  },
  create: async (args: any) => {
    console.warn(`Mock Prisma: ${modelName}.create() called - returning mock data`)
    return {
      id: 'mock-id-' + Date.now(),
      ...args.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  },
  update: async (args: any) => {
    console.warn(`Mock Prisma: ${modelName}.update() called - returning mock data`)
    return {
      id: args.where.id || 'mock-id',
      ...args.data,
      updatedAt: new Date(),
    }
  },
  delete: async (args: any) => {
    console.warn(`Mock Prisma: ${modelName}.delete() called - returning mock data`)
    return {
      id: args.where.id || 'mock-id',
    }
  },
  count: async (args?: any) => {
    console.warn(`Mock Prisma: ${modelName}.count() called - returning 0`)
    return 0
  },
})

export const mockPrisma = {
  client: createMockModel('client'),
  request: createMockModel('request'),
  message: createMockModel('message'),
  attachment: createMockModel('attachment'),
  agentAction: createMockModel('agentAction'),
  clientNote: createMockModel('clientNote'),
  agentConfig: createMockModel('agentConfig'),
  $connect: async () => {
    console.warn('Mock Prisma: $connect() called')
  },
  $disconnect: async () => {
    console.warn('Mock Prisma: $disconnect() called')
  },
}

console.warn('⚠️  Using Mock Prisma Client - Please install @prisma/client for full functionality')
