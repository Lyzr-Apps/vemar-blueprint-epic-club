/**
 * Multi-Agent Handler System
 *
 * Manages the routing and processing of client requests to specialized agents.
 * Each agent type handles specific categories of requests.
 */

export type AgentType =
  | 'Support Agent'
  | 'Technical Agent'
  | 'Creative Agent'
  | 'Consulting Agent'
  | 'Content Agent'
  | 'Marketing Agent'
  | 'Analytics Agent'
  | 'General Agent'

export type RequestCategory =
  | 'SUPPORT'
  | 'DEVELOPMENT'
  | 'DESIGN'
  | 'CONSULTING'
  | 'CONTENT'
  | 'MARKETING'
  | 'DATA_ANALYSIS'
  | 'OTHER'

export interface AgentCapabilities {
  name: AgentType
  categories: RequestCategory[]
  maxConcurrentRequests: number
  averageResponseTime: number // in hours
  skills: string[]
  description: string
}

export interface RequestQueueItem {
  requestId: string
  clientId: string
  category: RequestCategory
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  assignedAgent?: AgentType
  queuedAt: Date
  estimatedStartTime?: Date
}

/**
 * Agent Configuration Registry
 */
export const AGENT_REGISTRY: Record<AgentType, AgentCapabilities> = {
  'Support Agent': {
    name: 'Support Agent',
    categories: ['SUPPORT'],
    maxConcurrentRequests: 10,
    averageResponseTime: 2,
    skills: ['Customer Service', 'Troubleshooting', 'Technical Support', 'FAQ Management'],
    description: 'Handles general customer support inquiries and troubleshooting',
  },
  'Technical Agent': {
    name: 'Technical Agent',
    categories: ['DEVELOPMENT'],
    maxConcurrentRequests: 5,
    averageResponseTime: 8,
    skills: ['Software Development', 'API Integration', 'Bug Fixes', 'Code Review'],
    description: 'Specialized in technical development and programming tasks',
  },
  'Creative Agent': {
    name: 'Creative Agent',
    categories: ['DESIGN'],
    maxConcurrentRequests: 4,
    averageResponseTime: 6,
    skills: ['UI/UX Design', 'Graphic Design', 'Brand Identity', 'Visual Content'],
    description: 'Handles design and creative visual projects',
  },
  'Consulting Agent': {
    name: 'Consulting Agent',
    categories: ['CONSULTING'],
    maxConcurrentRequests: 3,
    averageResponseTime: 4,
    skills: ['Business Strategy', 'Process Optimization', 'Strategic Planning', 'Advisory'],
    description: 'Provides business consulting and strategic guidance',
  },
  'Content Agent': {
    name: 'Content Agent',
    categories: ['CONTENT'],
    maxConcurrentRequests: 6,
    averageResponseTime: 3,
    skills: ['Content Writing', 'Copywriting', 'Editing', 'SEO Optimization'],
    description: 'Creates and manages written content',
  },
  'Marketing Agent': {
    name: 'Marketing Agent',
    categories: ['MARKETING'],
    maxConcurrentRequests: 5,
    averageResponseTime: 4,
    skills: ['Digital Marketing', 'Social Media', 'Campaign Management', 'Analytics'],
    description: 'Manages marketing campaigns and strategies',
  },
  'Analytics Agent': {
    name: 'Analytics Agent',
    categories: ['DATA_ANALYSIS'],
    maxConcurrentRequests: 4,
    averageResponseTime: 5,
    skills: ['Data Analysis', 'Reporting', 'Metrics Tracking', 'Insights Generation'],
    description: 'Analyzes data and generates insights',
  },
  'General Agent': {
    name: 'General Agent',
    categories: ['OTHER'],
    maxConcurrentRequests: 8,
    averageResponseTime: 3,
    skills: ['General Tasks', 'Coordination', 'Administrative Support', 'Flexible Support'],
    description: 'Handles miscellaneous and general requests',
  },
}

/**
 * Agent Selector Class
 */
export class AgentSelector {
  /**
   * Assign the most suitable agent based on request category
   */
  static assignAgentByCategory(category: RequestCategory): AgentType {
    for (const [agentName, capabilities] of Object.entries(AGENT_REGISTRY)) {
      if (capabilities.categories.includes(category)) {
        return agentName as AgentType
      }
    }
    return 'General Agent'
  }

  /**
   * Get agent capabilities
   */
  static getAgentCapabilities(agentName: AgentType): AgentCapabilities | undefined {
    return AGENT_REGISTRY[agentName]
  }

  /**
   * Get all available agents
   */
  static getAllAgents(): AgentCapabilities[] {
    return Object.values(AGENT_REGISTRY)
  }

  /**
   * Find agents by skill
   */
  static findAgentsBySkill(skill: string): AgentCapabilities[] {
    return Object.values(AGENT_REGISTRY).filter(agent =>
      agent.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    )
  }
}

/**
 * Request Queue Manager
 */
export class RequestQueueManager {
  private queue: RequestQueueItem[] = []

  /**
   * Add request to queue
   */
  addToQueue(item: RequestQueueItem): void {
    this.queue.push(item)
    this.sortQueue()
  }

  /**
   * Sort queue by priority (URGENT > HIGH > MEDIUM > LOW) and queued time
   */
  private sortQueue(): void {
    const priorityWeight: Record<string, number> = {
      URGENT: 4,
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    }

    this.queue.sort((a, b) => {
      const priorityDiff = priorityWeight[b.priority] - priorityWeight[a.priority]
      if (priorityDiff !== 0) return priorityDiff
      return a.queuedAt.getTime() - b.queuedAt.getTime()
    })
  }

  /**
   * Get next request in queue
   */
  getNext(): RequestQueueItem | undefined {
    return this.queue.shift()
  }

  /**
   * Get queue size
   */
  getSize(): number {
    return this.queue.length
  }

  /**
   * Get queue items by agent
   */
  getByAgent(agentName: AgentType): RequestQueueItem[] {
    return this.queue.filter(item => item.assignedAgent === agentName)
  }

  /**
   * Get queue items by priority
   */
  getByPriority(priority: string): RequestQueueItem[] {
    return this.queue.filter(item => item.priority === priority)
  }

  /**
   * Get entire queue
   */
  getQueue(): RequestQueueItem[] {
    return [...this.queue]
  }

  /**
   * Remove request from queue
   */
  removeFromQueue(requestId: string): boolean {
    const initialLength = this.queue.length
    this.queue = this.queue.filter(item => item.requestId !== requestId)
    return this.queue.length < initialLength
  }

  /**
   * Clear entire queue
   */
  clearQueue(): void {
    this.queue = []
  }
}

/**
 * Agent Load Balancer
 */
export class AgentLoadBalancer {
  /**
   * Calculate agent load (mock implementation - would query database in production)
   */
  static async getAgentLoad(agentName: AgentType): Promise<number> {
    // In production, this would query the database for active requests
    // For now, return a mock value
    return Math.floor(Math.random() * 5)
  }

  /**
   * Check if agent is available for new requests
   */
  static async isAgentAvailable(agentName: AgentType): Promise<boolean> {
    const capabilities = AGENT_REGISTRY[agentName]
    if (!capabilities) return false

    const currentLoad = await this.getAgentLoad(agentName)
    return currentLoad < capabilities.maxConcurrentRequests
  }

  /**
   * Get agent with lowest load for a category
   */
  static async getLeastLoadedAgent(category: RequestCategory): Promise<AgentType> {
    const eligibleAgents = Object.values(AGENT_REGISTRY).filter(agent =>
      agent.categories.includes(category)
    )

    if (eligibleAgents.length === 0) {
      return 'General Agent'
    }

    // Get load for each eligible agent
    const agentLoads = await Promise.all(
      eligibleAgents.map(async agent => ({
        agent: agent.name,
        load: await this.getAgentLoad(agent.name),
        maxLoad: agent.maxConcurrentRequests,
      }))
    )

    // Sort by load percentage (current/max)
    agentLoads.sort((a, b) => {
      const aPercentage = a.load / a.maxLoad
      const bPercentage = b.load / b.maxLoad
      return aPercentage - bPercentage
    })

    return agentLoads[0].agent
  }

  /**
   * Get overall system load
   */
  static async getSystemLoad(): Promise<{
    totalCapacity: number
    currentLoad: number
    utilizationPercentage: number
    agentLoads: Array<{ agent: AgentType; load: number; capacity: number }>
  }> {
    const allAgents = Object.values(AGENT_REGISTRY)
    const totalCapacity = allAgents.reduce((sum, agent) => sum + agent.maxConcurrentRequests, 0)

    const agentLoads = await Promise.all(
      allAgents.map(async agent => ({
        agent: agent.name,
        load: await this.getAgentLoad(agent.name),
        capacity: agent.maxConcurrentRequests,
      }))
    )

    const currentLoad = agentLoads.reduce((sum, agent) => sum + agent.load, 0)
    const utilizationPercentage = (currentLoad / totalCapacity) * 100

    return {
      totalCapacity,
      currentLoad,
      utilizationPercentage,
      agentLoads,
    }
  }
}

/**
 * Request Processor
 */
export class RequestProcessor {
  private queueManager: RequestQueueManager

  constructor() {
    this.queueManager = new RequestQueueManager()
  }

  /**
   * Process a new request
   */
  async processRequest(
    requestId: string,
    clientId: string,
    category: RequestCategory,
    priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  ): Promise<{
    assignedAgent: AgentType
    estimatedStartTime: Date
    queuePosition: number
  }> {
    // Get the best agent for this request
    const assignedAgent = await AgentLoadBalancer.getLeastLoadedAgent(category)

    // Add to queue
    const queueItem: RequestQueueItem = {
      requestId,
      clientId,
      category,
      priority,
      assignedAgent,
      queuedAt: new Date(),
    }

    this.queueManager.addToQueue(queueItem)

    // Calculate estimated start time
    const agentCapabilities = AGENT_REGISTRY[assignedAgent]
    const queuePosition = this.queueManager.getByAgent(assignedAgent).length
    const estimatedStartTime = new Date()
    estimatedStartTime.setHours(
      estimatedStartTime.getHours() + (agentCapabilities.averageResponseTime * queuePosition)
    )

    return {
      assignedAgent,
      estimatedStartTime,
      queuePosition,
    }
  }

  /**
   * Get queue manager
   */
  getQueueManager(): RequestQueueManager {
    return this.queueManager
  }
}

// Export singleton instance
export const requestProcessor = new RequestProcessor()
