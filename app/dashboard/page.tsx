'use client'

import { useState, useEffect, useCallback } from 'react'
import { FiUsers, FiFileText, FiClock, FiCheckCircle, FiAlertCircle, FiFilter } from 'react-icons/fi'

interface Client {
  id: string
  name: string
  email: string
  company?: string
  status: string
  priority: string
  requests: Array<{ id: string; status: string; priority: string }>
  _count: { requests: number }
}

interface Request {
  id: string
  title: string
  description: string
  category: string
  priority: string
  status: string
  assignedAgent?: string
  clientId: string
  estimatedHours?: number
  actualHours?: number
  dueDate?: string
  completedAt?: string
  createdAt: string
  client: {
    name: string
    email: string
    company?: string
  }
}

export default function DashboardPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'requests'>('overview')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // Fetch clients
      const clientsRes = await fetch('/api/clients')
      const clientsData = await clientsRes.json()
      if (clientsData.success) {
        setClients(clientsData.clients)
      }

      // Fetch requests with filters
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (categoryFilter !== 'all') params.append('category', categoryFilter)

      const requestsRes = await fetch(`/api/requests?${params.toString()}`)
      const requestsData = await requestsRes.json()
      if (requestsData.success) {
        setRequests(requestsData.requests)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, categoryFilter])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      IN_PROGRESS: 'bg-blue-100 text-blue-800 border-blue-200',
      WAITING_CLIENT: 'bg-orange-100 text-orange-800 border-orange-200',
      WAITING_AGENT: 'bg-purple-100 text-purple-800 border-purple-200',
      COMPLETED: 'bg-green-100 text-green-800 border-green-200',
      CANCELLED: 'bg-gray-100 text-gray-800 border-gray-200',
    }
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      LOW: 'bg-gray-100 text-gray-600 border-gray-200',
      MEDIUM: 'bg-blue-100 text-blue-600 border-blue-200',
      HIGH: 'bg-orange-100 text-orange-600 border-orange-200',
      URGENT: 'bg-red-100 text-red-600 border-red-200',
    }
    return colors[priority] || 'bg-gray-100 text-gray-600 border-gray-200'
  }

  const stats = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'ACTIVE').length,
    totalRequests: requests.length,
    pendingRequests: requests.filter(r => r.status === 'PENDING').length,
    inProgressRequests: requests.filter(r => r.status === 'IN_PROGRESS').length,
    completedRequests: requests.filter(r => r.status === 'COMPLETED').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Request Management</h1>
          <p className="text-gray-600">Manage and track all client requests across your agents</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalClients}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Requests</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalRequests}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <FiFileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.inProgressRequests}</p>
              </div>
              <div className="bg-orange-100 rounded-full p-3">
                <FiClock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.completedRequests}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <FiCheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'clients'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Clients ({clients.length})
              </button>
              <button
                onClick={() => setActiveTab('requests')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'requests'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Requests ({requests.length})
              </button>
            </nav>
          </div>

          {/* Filters */}
          {activeTab === 'requests' && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center gap-4">
                <FiFilter className="w-5 h-5 text-gray-500" />
                <div className="flex-1 flex gap-4">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="WAITING_CLIENT">Waiting Client</option>
                    <option value="WAITING_AGENT">Waiting Agent</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>

                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="SUPPORT">Support</option>
                    <option value="DEVELOPMENT">Development</option>
                    <option value="DESIGN">Design</option>
                    <option value="CONSULTING">Consulting</option>
                    <option value="CONTENT">Content</option>
                    <option value="MARKETING">Marketing</option>
                    <option value="DATA_ANALYSIS">Data Analysis</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-2 text-gray-600">Loading...</p>
              </div>
            ) : (
              <>
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Requests</h3>
                      {requests.slice(0, 5).length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No requests yet</p>
                      ) : (
                        <div className="space-y-3">
                          {requests.slice(0, 5).map((request) => (
                            <div key={request.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{request.title}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{request.client.name} - {request.client.email}</p>
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(request.status)}`}>
                                      {request.status.replace('_', ' ')}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                                      {request.priority}
                                    </span>
                                    <span className="text-xs text-gray-500">{request.category}</span>
                                  </div>
                                </div>
                                {request.assignedAgent && (
                                  <div className="text-sm text-gray-600">
                                    <span className="font-medium">{request.assignedAgent}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Clients Tab */}
                {activeTab === 'clients' && (
                  <div>
                    {clients.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No clients yet</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {clients.map((client) => (
                              <tr key={client.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{client.name}</div>
                                  <div className="text-sm text-gray-500">{client.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client.company || '-'}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(client.status)}`}>
                                    {client.status}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(client.priority)}`}>
                                    {client.priority}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{client._count.requests}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* Requests Tab */}
                {activeTab === 'requests' && (
                  <div>
                    {requests.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">No requests found</p>
                    ) : (
                      <div className="space-y-4">
                        {requests.map((request) => (
                          <div key={request.id} className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 text-lg">{request.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                              </div>
                              {request.assignedAgent && (
                                <div className="ml-4 text-right">
                                  <p className="text-xs text-gray-500">Assigned to</p>
                                  <p className="text-sm font-medium text-gray-900">{request.assignedAgent}</p>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                              <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(request.status)}`}>
                                {request.status.replace('_', ' ')}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                                {request.priority}
                              </span>
                              <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                {request.category}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <div className="flex items-center gap-4">
                                <span>Client: <strong>{request.client.name}</strong></span>
                                {request.estimatedHours && (
                                  <span>Estimated: <strong>{request.estimatedHours}h</strong></span>
                                )}
                                {request.actualHours && (
                                  <span>Actual: <strong>{request.actualHours}h</strong></span>
                                )}
                              </div>
                              <div className="text-xs text-gray-500">
                                Created: {new Date(request.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
