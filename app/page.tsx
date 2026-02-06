'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FiSend, FiUser, FiClock, FiCheckCircle, FiAlertCircle, FiTrendingUp, FiUsers, FiActivity } from 'react-icons/fi'

// Request types
type RequestCategory = 'SUPPORT' | 'TECHNICAL' | 'CREATIVE' | 'CONSULTING' | 'CONTENT' | 'MARKETING' | 'ANALYTICS' | 'GENERAL'
type RequestPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
type RequestStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'

interface ClientRequest {
  id: string
  clientName: string
  clientEmail: string
  category: RequestCategory
  priority: RequestPriority
  status: RequestStatus
  title: string
  description: string
  assignedAgent: string
  createdAt: Date
  updatedAt: Date
}

interface AgentStats {
  name: string
  category: RequestCategory
  activeRequests: number
  completedToday: number
  avgResponseTime: string
  status: 'active' | 'idle' | 'busy'
}

// Agent routing configuration
const AGENT_CONFIG: Record<RequestCategory, { name: string; icon: string; description: string }> = {
  SUPPORT: {
    name: 'Support Agent',
    icon: '🛟',
    description: 'Handles customer support and general inquiries'
  },
  TECHNICAL: {
    name: 'Technical Agent',
    icon: '⚙️',
    description: 'Resolves technical issues and bug reports'
  },
  CREATIVE: {
    name: 'Creative Agent',
    icon: '🎨',
    description: 'Manages design and creative requests'
  },
  CONSULTING: {
    name: 'Consulting Agent',
    icon: '💼',
    description: 'Provides business consulting and strategy'
  },
  CONTENT: {
    name: 'Content Agent',
    icon: '✍️',
    description: 'Creates and manages content requests'
  },
  MARKETING: {
    name: 'Marketing Agent',
    icon: '📈',
    description: 'Handles marketing campaigns and promotions'
  },
  ANALYTICS: {
    name: 'Analytics Agent',
    icon: '📊',
    description: 'Analyzes data and generates reports'
  },
  GENERAL: {
    name: 'General Agent',
    icon: '🤖',
    description: 'Handles miscellaneous requests'
  }
}

export default function ClientRequestManager() {
  const [requests, setRequests] = useState<ClientRequest[]>([])
  const [agentStats, setAgentStats] = useState<AgentStats[]>([])
  const [loading, setLoading] = useState(false)

  // New request form state
  const [newRequest, setNewRequest] = useState({
    clientName: '',
    clientEmail: '',
    category: 'GENERAL' as RequestCategory,
    priority: 'MEDIUM' as RequestPriority,
    title: '',
    description: ''
  })

  // Initialize with mock data
  useEffect(() => {
    // Mock requests
    const mockRequests: ClientRequest[] = [
      {
        id: '1',
        clientName: 'Acme Corp',
        clientEmail: 'contact@acme.com',
        category: 'TECHNICAL',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        title: 'API Integration Issue',
        description: 'Need help integrating payment gateway API',
        assignedAgent: AGENT_CONFIG.TECHNICAL.name,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 60 * 1000)
      },
      {
        id: '2',
        clientName: 'StartupX',
        clientEmail: 'team@startupx.io',
        category: 'CREATIVE',
        priority: 'MEDIUM',
        status: 'PENDING',
        title: 'Logo Design Request',
        description: 'Need a modern logo for our SaaS product',
        assignedAgent: AGENT_CONFIG.CREATIVE.name,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      },
      {
        id: '3',
        clientName: 'TechFlow Inc',
        clientEmail: 'support@techflow.com',
        category: 'SUPPORT',
        priority: 'URGENT',
        status: 'IN_PROGRESS',
        title: 'Account Access Issue',
        description: 'Client cannot access their dashboard',
        assignedAgent: AGENT_CONFIG.SUPPORT.name,
        createdAt: new Date(Date.now() - 15 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 60 * 1000)
      }
    ]

    // Mock agent stats
    const mockAgentStats: AgentStats[] = Object.entries(AGENT_CONFIG).map(([category, config]) => ({
      name: config.name,
      category: category as RequestCategory,
      activeRequests: Math.floor(Math.random() * 5),
      completedToday: Math.floor(Math.random() * 10),
      avgResponseTime: `${Math.floor(Math.random() * 30 + 10)}m`,
      status: Math.random() > 0.5 ? 'active' : 'idle'
    }))

    setRequests(mockRequests)
    setAgentStats(mockAgentStats)
  }, [])

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Create new request
    const request: ClientRequest = {
      id: Date.now().toString(),
      ...newRequest,
      status: 'PENDING',
      assignedAgent: AGENT_CONFIG[newRequest.category].name,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Add to requests
    setRequests(prev => [request, ...prev])

    // Reset form
    setNewRequest({
      clientName: '',
      clientEmail: '',
      category: 'GENERAL',
      priority: 'MEDIUM',
      title: '',
      description: ''
    })

    setLoading(false)
  }

  const getPriorityColor = (priority: RequestPriority) => {
    switch (priority) {
      case 'URGENT': return 'bg-red-100 text-red-800 border-red-300'
      case 'HIGH': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'LOW': return 'bg-green-100 text-green-800 border-green-300'
    }
  }

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'COMPLETED': return 'bg-green-100 text-green-800 border-green-300'
      case 'CANCELLED': return 'bg-red-100 text-red-800 border-red-300'
    }
  }

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'idle': return 'bg-gray-100 text-gray-800'
      case 'busy': return 'bg-orange-100 text-orange-800'
    }
  }

  const stats = {
    totalRequests: requests.length,
    activeRequests: requests.filter(r => r.status === 'IN_PROGRESS').length,
    pendingRequests: requests.filter(r => r.status === 'PENDING').length,
    completedToday: requests.filter(r =>
      r.status === 'COMPLETED' &&
      new Date(r.updatedAt).toDateString() === new Date().toDateString()
    ).length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Multi-Agent Client Request Manager
          </h1>
          <p className="text-gray-600">
            Intelligent request routing powered by specialized AI agents
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Requests</CardTitle>
              <FiActivity className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests}</div>
              <p className="text-xs text-gray-500 mt-1">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active</CardTitle>
              <FiClock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.activeRequests}</div>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending</CardTitle>
              <FiAlertCircle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{stats.pendingRequests}</div>
              <p className="text-xs text-gray-500 mt-1">Awaiting assignment</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed Today</CardTitle>
              <FiCheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
              <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Client Requests</TabsTrigger>
            <TabsTrigger value="agents">Agent Dashboard</TabsTrigger>
            <TabsTrigger value="new">New Request</TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Client Requests</CardTitle>
                <CardDescription>
                  Manage and monitor all client requests across specialized agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {requests.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      No requests yet. Create your first request to get started.
                    </div>
                  ) : (
                    requests.map((request) => (
                      <Card key={request.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-lg">{request.title}</h3>
                                <Badge className={getPriorityColor(request.priority)}>
                                  {request.priority}
                                </Badge>
                                <Badge className={getStatusColor(request.status)}>
                                  {request.status.replace('_', ' ')}
                                </Badge>
                              </div>

                              <p className="text-gray-600 text-sm">{request.description}</p>

                              <div className="flex items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                  <FiUser className="h-4 w-4" />
                                  <span>{request.clientName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FiClock className="h-4 w-4" />
                                  <span>{new Date(request.createdAt).toLocaleString()}</span>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 pt-2">
                                <Badge variant="outline" className="bg-blue-50">
                                  {request.assignedAgent}
                                </Badge>
                                <Badge variant="outline" className="bg-purple-50">
                                  {request.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiUsers className="h-5 w-5" />
                  Specialized Agent Dashboard
                </CardTitle>
                <CardDescription>
                  Monitor performance and availability of your AI agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {agentStats.map((agent) => (
                    <Card key={agent.name} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold">{agent.name}</h3>
                              <p className="text-sm text-gray-500">
                                {AGENT_CONFIG[agent.category].description}
                              </p>
                            </div>
                            <Badge className={getAgentStatusColor(agent.status)}>
                              {agent.status}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                            <div>
                              <p className="text-xs text-gray-500">Active</p>
                              <p className="text-lg font-semibold">{agent.activeRequests}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Completed</p>
                              <p className="text-lg font-semibold text-green-600">{agent.completedToday}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Avg Time</p>
                              <p className="text-lg font-semibold text-blue-600">{agent.avgResponseTime}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Request Tab */}
          <TabsContent value="new" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Client Request</CardTitle>
                <CardDescription>
                  Submit a new request and let our AI agents handle it automatically
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitRequest} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">Client Name</Label>
                      <Input
                        id="clientName"
                        value={newRequest.clientName}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, clientName: e.target.value }))}
                        placeholder="Acme Corporation"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="clientEmail">Client Email</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={newRequest.clientEmail}
                        onChange={(e) => setNewRequest(prev => ({ ...prev, clientEmail: e.target.value }))}
                        placeholder="contact@acme.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Request Category</Label>
                      <Select
                        value={newRequest.category}
                        onValueChange={(value) => setNewRequest(prev => ({ ...prev, category: value as RequestCategory }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(AGENT_CONFIG).map(([key, config]) => (
                            <SelectItem key={key} value={key}>
                              {config.icon} {config.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-gray-500">
                        {AGENT_CONFIG[newRequest.category].description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority Level</Label>
                      <Select
                        value={newRequest.priority}
                        onValueChange={(value) => setNewRequest(prev => ({ ...prev, priority: value as RequestPriority }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="LOW">Low</SelectItem>
                          <SelectItem value="MEDIUM">Medium</SelectItem>
                          <SelectItem value="HIGH">High</SelectItem>
                          <SelectItem value="URGENT">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Request Title</Label>
                    <Input
                      id="title"
                      value={newRequest.title}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Brief description of the request"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Request Details</Label>
                    <Textarea
                      id="description"
                      value={newRequest.description}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Provide detailed information about your request..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="text-sm text-gray-500">
                      Will be assigned to: <span className="font-semibold text-blue-600">
                        {AGENT_CONFIG[newRequest.category].name}
                      </span>
                    </div>
                    <Button type="submit" disabled={loading} className="gap-2">
                      <FiSend className="h-4 w-4" />
                      {loading ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-8">
          <p>Built by the awesome team at Lyzr</p>
        </div>
      </div>
    </div>
  )
}
