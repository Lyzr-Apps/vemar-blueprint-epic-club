'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FiUsers,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiActivity,
  FiClock,
  FiCheckCircle,
  FiDatabase,
  FiCpu,
  FiZap,
  FiSettings,
  FiArrowLeft,
  FiSave
} from 'react-icons/fi'
import { KnowledgeBaseUpload } from '@/components/KnowledgeBaseUpload'

// Agent types
type AgentStatus = 'active' | 'idle' | 'training' | 'error'
type AgentCategory = 'SUPPORT' | 'TECHNICAL' | 'CREATIVE' | 'CONSULTING' | 'CONTENT' | 'MARKETING' | 'ANALYTICS' | 'GENERAL'

interface Agent {
  id: string
  name: string
  description: string
  category: AgentCategory
  status: AgentStatus
  ragId?: string
  ragName?: string
  agentId?: string
  createdAt: Date
  updatedAt: Date
  stats: {
    activeRequests: number
    completedToday: number
    avgResponseTime: string
    totalRequests: number
  }
  configuration: {
    model: string
    temperature: number
    maxTokens: number
  }
}

interface KnowledgeBase {
  id: string
  name: string
  description: string
  documentCount: number
  createdAt: Date
}

const CATEGORY_OPTIONS: { value: AgentCategory; label: string; icon: any }[] = [
  { value: 'SUPPORT', label: 'Support Agent', icon: FiUsers },
  { value: 'TECHNICAL', label: 'Technical Agent', icon: FiCpu },
  { value: 'CREATIVE', label: 'Creative Agent', icon: FiZap },
  { value: 'CONSULTING', label: 'Consulting Agent', icon: FiSettings },
  { value: 'CONTENT', label: 'Content Agent', icon: FiEdit },
  { value: 'MARKETING', label: 'Marketing Agent', icon: FiActivity },
  { value: 'ANALYTICS', label: 'Analytics Agent', icon: FiDatabase },
  { value: 'GENERAL', label: 'General Agent', icon: FiCheckCircle }
]

export default function AgentsPage() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([])
  const [loading, setLoading] = useState(false)
  const [activeView, setActiveView] = useState<'list' | 'create' | 'edit'>('list')
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'GENERAL' as AgentCategory,
    ragId: '',
    ragName: '',
    model: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000
  })

  // Initialize with mock data
  useEffect(() => {
    const mockAgents: Agent[] = [
      {
        id: '1',
        name: 'Customer Support Agent',
        description: 'Handles customer inquiries and support tickets',
        category: 'SUPPORT',
        status: 'active',
        ragId: 'rag_support_001',
        ragName: 'Support Knowledge Base',
        agentId: '6985a1bbb37fff3a03c07c44',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        stats: {
          activeRequests: 12,
          completedToday: 45,
          avgResponseTime: '2.3m',
          totalRequests: 1250
        },
        configuration: {
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 2000
        }
      },
      {
        id: '2',
        name: 'Technical Assistant',
        description: 'Provides technical support and troubleshooting',
        category: 'TECHNICAL',
        status: 'active',
        ragId: 'rag_tech_001',
        ragName: 'Technical Documentation',
        agentId: '6985a1d176d4fd436bf4b7bd',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(),
        stats: {
          activeRequests: 8,
          completedToday: 32,
          avgResponseTime: '3.1m',
          totalRequests: 890
        },
        configuration: {
          model: 'gpt-4',
          temperature: 0.5,
          maxTokens: 3000
        }
      },
      {
        id: '3',
        name: 'Content Creator',
        description: 'Generates marketing content and creative copy',
        category: 'CONTENT',
        status: 'idle',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
        stats: {
          activeRequests: 0,
          completedToday: 18,
          avgResponseTime: '4.2m',
          totalRequests: 456
        },
        configuration: {
          model: 'gpt-4',
          temperature: 0.9,
          maxTokens: 2500
        }
      }
    ]

    const mockKnowledgeBases: KnowledgeBase[] = [
      {
        id: 'rag_support_001',
        name: 'Support Knowledge Base',
        description: 'Customer support documentation and FAQs',
        documentCount: 45,
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'rag_tech_001',
        name: 'Technical Documentation',
        description: 'Technical guides and API documentation',
        documentCount: 67,
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000)
      },
      {
        id: 'rag_product_001',
        name: 'Product Information',
        description: 'Product specs and feature documentation',
        documentCount: 32,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
      }
    ]

    setAgents(mockAgents)
    setKnowledgeBases(mockKnowledgeBases)
  }, [])

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  const handleCreateAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const newAgent: Agent = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      category: formData.category,
      status: 'idle',
      ragId: formData.ragId || undefined,
      ragName: formData.ragName || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      stats: {
        activeRequests: 0,
        completedToday: 0,
        avgResponseTime: '0m',
        totalRequests: 0
      },
      configuration: {
        model: formData.model,
        temperature: formData.temperature,
        maxTokens: formData.maxTokens
      }
    }

    setAgents(prev => [newAgent, ...prev])
    showNotification('success', `Agent "${newAgent.name}" created successfully`)
    setActiveView('list')
    resetForm()
    setLoading(false)
  }

  const handleUpdateAgent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAgent) return

    setLoading(true)

    const updatedAgent: Agent = {
      ...selectedAgent,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      ragId: formData.ragId || undefined,
      ragName: formData.ragName || undefined,
      updatedAt: new Date(),
      configuration: {
        model: formData.model,
        temperature: formData.temperature,
        maxTokens: formData.maxTokens
      }
    }

    setAgents(prev => prev.map(agent => agent.id === selectedAgent.id ? updatedAgent : agent))
    showNotification('success', `Agent "${updatedAgent.name}" updated successfully`)
    setActiveView('list')
    setSelectedAgent(null)
    resetForm()
    setLoading(false)
  }

  const handleDeleteAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId)
    if (agent && confirm(`Are you sure you want to delete "${agent.name}"?`)) {
      setAgents(prev => prev.filter(a => a.id !== agentId))
      showNotification('success', `Agent "${agent.name}" deleted successfully`)
    }
  }

  const handleEditAgent = (agent: Agent) => {
    setSelectedAgent(agent)
    setFormData({
      name: agent.name,
      description: agent.description,
      category: agent.category,
      ragId: agent.ragId || '',
      ragName: agent.ragName || '',
      model: agent.configuration.model,
      temperature: agent.configuration.temperature,
      maxTokens: agent.configuration.maxTokens
    })
    setActiveView('edit')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'GENERAL',
      ragId: '',
      ragName: '',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000
    })
  }

  const handleCancel = () => {
    setActiveView('list')
    setSelectedAgent(null)
    resetForm()
  }

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300'
      case 'idle': return 'bg-gray-100 text-gray-800 border-gray-300'
      case 'training': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'error': return 'bg-red-100 text-red-800 border-red-300'
    }
  }

  const getCategoryColor = (category: AgentCategory) => {
    const colors: Record<AgentCategory, string> = {
      SUPPORT: 'bg-blue-100 text-blue-800 border-blue-300',
      TECHNICAL: 'bg-purple-100 text-purple-800 border-purple-300',
      CREATIVE: 'bg-pink-100 text-pink-800 border-pink-300',
      CONSULTING: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      CONTENT: 'bg-orange-100 text-orange-800 border-orange-300',
      MARKETING: 'bg-green-100 text-green-800 border-green-300',
      ANALYTICS: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      GENERAL: 'bg-gray-100 text-gray-800 border-gray-300'
    }
    return colors[category]
  }

  const stats = {
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.status === 'active').length,
    totalRequests: agents.reduce((sum, a) => sum + a.stats.totalRequests, 0),
    avgResponseTime: '2.8m'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <FiArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-2">
              Agent Management
            </h1>
            <p className="text-gray-600 mt-1">
              Create and manage your AI agents with knowledge base integration
            </p>
          </div>

          {activeView === 'list' && (
            <Button onClick={() => setActiveView('create')} className="gap-2">
              <FiPlus className="h-4 w-4" />
              Create New Agent
            </Button>
          )}
        </div>

        {/* Notification */}
        {notification && (
          <Card className={`border-2 ${notification.type === 'success' ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
            <CardContent className="pt-6">
              <p className={`font-medium ${notification.type === 'success' ? 'text-green-900' : 'text-red-900'}`}>
                {notification.message}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Statistics Cards */}
        {activeView === 'list' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Agents</CardTitle>
                <FiUsers className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAgents}</div>
                <p className="text-xs text-gray-500 mt-1">Across all categories</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Agents</CardTitle>
                <FiActivity className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.activeAgents}</div>
                <p className="text-xs text-gray-500 mt-1">Currently processing</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Requests</CardTitle>
                <FiCheckCircle className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalRequests}</div>
                <p className="text-xs text-gray-500 mt-1">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
                <FiClock className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.avgResponseTime}</div>
                <p className="text-xs text-gray-500 mt-1">Across all agents</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Agent List View */}
        {activeView === 'list' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiUsers className="h-5 w-5" />
                Your AI Agents
              </CardTitle>
              <CardDescription>
                Manage and monitor all your specialized AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agents.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <FiUsers className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No agents yet.</p>
                    <p className="text-sm mt-2">Create your first agent to get started.</p>
                  </div>
                ) : (
                  agents.map((agent) => {
                    const CategoryIcon = CATEGORY_OPTIONS.find(opt => opt.value === agent.category)?.icon || FiUsers

                    return (
                      <Card key={agent.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-3">
                                  <CategoryIcon className="h-5 w-5 text-blue-600" />
                                  <h3 className="font-semibold text-lg">{agent.name}</h3>
                                  <Badge className={getStatusColor(agent.status)}>
                                    {agent.status}
                                  </Badge>
                                  <Badge className={getCategoryColor(agent.category)}>
                                    {agent.category}
                                  </Badge>
                                </div>

                                <p className="text-gray-600 text-sm">{agent.description}</p>

                                {agent.ragId && (
                                  <div className="flex items-center gap-2">
                                    <FiDatabase className="h-4 w-4 text-purple-600" />
                                    <Badge variant="outline" className="bg-purple-50">
                                      {agent.ragName || agent.ragId}
                                    </Badge>
                                  </div>
                                )}

                                <div className="grid grid-cols-4 gap-4 pt-4 border-t">
                                  <div>
                                    <p className="text-xs text-gray-500">Active Requests</p>
                                    <p className="text-lg font-semibold text-blue-600">{agent.stats.activeRequests}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Completed Today</p>
                                    <p className="text-lg font-semibold text-green-600">{agent.stats.completedToday}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Avg Response</p>
                                    <p className="text-lg font-semibold text-orange-600">{agent.stats.avgResponseTime}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Total Requests</p>
                                    <p className="text-lg font-semibold">{agent.stats.totalRequests}</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditAgent(agent)}
                                className="gap-2"
                              >
                                <FiEdit className="h-3 w-3" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteAgent(agent.id)}
                                className="gap-2 text-red-600 hover:text-red-700"
                              >
                                <FiTrash2 className="h-3 w-3" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Agent Form */}
        {(activeView === 'create' || activeView === 'edit') && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {activeView === 'create' ? <FiPlus className="h-5 w-5" /> : <FiEdit className="h-5 w-5" />}
                {activeView === 'create' ? 'Create New Agent' : 'Edit Agent'}
              </CardTitle>
              <CardDescription>
                {activeView === 'create'
                  ? 'Configure a new AI agent with custom settings and knowledge base integration'
                  : 'Update agent configuration and knowledge base settings'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={activeView === 'create' ? handleCreateAgent : handleUpdateAgent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Agent Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g., Customer Support Agent"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as AgentCategory }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe what this agent does and its purpose..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FiDatabase className="h-4 w-4" />
                    Knowledge Base Integration (Optional)
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ragId">Knowledge Base ID</Label>
                      <Select
                        value={formData.ragId}
                        onValueChange={(value) => {
                          const kb = knowledgeBases.find(k => k.id === value)
                          setFormData(prev => ({
                            ...prev,
                            ragId: value,
                            ragName: kb?.name || ''
                          }))
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select knowledge base" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          {knowledgeBases.map((kb) => (
                            <SelectItem key={kb.id} value={kb.id}>
                              {kb.name} ({kb.documentCount} docs)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ragName">Knowledge Base Name</Label>
                      <Input
                        id="ragName"
                        value={formData.ragName}
                        onChange={(e) => setFormData(prev => ({ ...prev, ragName: e.target.value }))}
                        placeholder="e.g., Support Documentation"
                        disabled={!!formData.ragId}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold flex items-center gap-2">
                    <FiSettings className="h-4 w-4" />
                    Model Configuration
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="model">Model</Label>
                      <Select
                        value={formData.model}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, model: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                          <SelectItem value="claude-3">Claude 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="temperature">Temperature: {formData.temperature}</Label>
                      <input
                        type="range"
                        id="temperature"
                        min="0"
                        max="1"
                        step="0.1"
                        value={formData.temperature}
                        onChange={(e) => setFormData(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500">Controls randomness (0 = focused, 1 = creative)</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxTokens">Max Tokens</Label>
                      <Input
                        type="number"
                        id="maxTokens"
                        value={formData.maxTokens}
                        onChange={(e) => setFormData(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                        min="100"
                        max="4000"
                        step="100"
                      />
                      <p className="text-xs text-gray-500">Maximum response length</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="gap-2">
                    <FiSave className="h-4 w-4" />
                    {loading ? 'Saving...' : (activeView === 'create' ? 'Create Agent' : 'Update Agent')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p>VEMAR.AI Agent Management - Built by the awesome team at Lyzr</p>
        </div>
      </div>
    </div>
  )
}
