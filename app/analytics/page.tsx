'use client'

import { useState, useEffect } from 'react'
import { FiTrendingUp, FiClock, FiUsers, FiCheckCircle, FiActivity, FiBarChart2 } from 'react-icons/fi'
import { AGENT_REGISTRY, AgentLoadBalancer } from '@/lib/agent-handler'

interface AnalyticsData {
  totalRequests: number
  completedRequests: number
  averageCompletionTime: number
  clientSatisfaction: number
  requestsByCategory: Record<string, number>
  requestsByStatus: Record<string, number>
  requestsByPriority: Record<string, number>
  agentPerformance: Array<{
    agent: string
    handled: number
    completed: number
    averageTime: number
  }>
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [systemLoad, setSystemLoad] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  useEffect(() => {
    fetchAnalytics()
    fetchSystemLoad()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      // Fetch all requests
      const response = await fetch('/api/requests')
      const data = await response.json()

      if (data.success) {
        const requests = data.requests

        // Calculate analytics
        const totalRequests = requests.length
        const completedRequests = requests.filter((r: any) => r.status === 'COMPLETED').length

        // Calculate average completion time
        const completedWithTime = requests.filter(
          (r: any) => r.status === 'COMPLETED' && r.completedAt && r.createdAt
        )
        const averageCompletionTime =
          completedWithTime.length > 0
            ? completedWithTime.reduce((sum: number, r: any) => {
                const created = new Date(r.createdAt)
                const completed = new Date(r.completedAt)
                const hours = (completed.getTime() - created.getTime()) / (1000 * 60 * 60)
                return sum + hours
              }, 0) / completedWithTime.length
            : 0

        // Requests by category
        const requestsByCategory: Record<string, number> = {}
        requests.forEach((r: any) => {
          requestsByCategory[r.category] = (requestsByCategory[r.category] || 0) + 1
        })

        // Requests by status
        const requestsByStatus: Record<string, number> = {}
        requests.forEach((r: any) => {
          requestsByStatus[r.status] = (requestsByStatus[r.status] || 0) + 1
        })

        // Requests by priority
        const requestsByPriority: Record<string, number> = {}
        requests.forEach((r: any) => {
          requestsByPriority[r.priority] = (requestsByPriority[r.priority] || 0) + 1
        })

        // Agent performance
        const agentStats: Record<string, any> = {}
        requests.forEach((r: any) => {
          if (r.assignedAgent) {
            if (!agentStats[r.assignedAgent]) {
              agentStats[r.assignedAgent] = {
                agent: r.assignedAgent,
                handled: 0,
                completed: 0,
                totalTime: 0,
                count: 0,
              }
            }
            agentStats[r.assignedAgent].handled++
            if (r.status === 'COMPLETED') {
              agentStats[r.assignedAgent].completed++
              if (r.completedAt && r.createdAt) {
                const hours =
                  (new Date(r.completedAt).getTime() - new Date(r.createdAt).getTime()) /
                  (1000 * 60 * 60)
                agentStats[r.assignedAgent].totalTime += hours
                agentStats[r.assignedAgent].count++
              }
            }
          }
        })

        const agentPerformance = Object.values(agentStats).map((agent: any) => ({
          agent: agent.agent,
          handled: agent.handled,
          completed: agent.completed,
          averageTime: agent.count > 0 ? agent.totalTime / agent.count : 0,
        }))

        setAnalytics({
          totalRequests,
          completedRequests,
          averageCompletionTime,
          clientSatisfaction: 0.92, // Mock value
          requestsByCategory,
          requestsByStatus,
          requestsByPriority,
          agentPerformance,
        })
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchSystemLoad = async () => {
    try {
      const load = await AgentLoadBalancer.getSystemLoad()
      setSystemLoad(load)
    } catch (error) {
      console.error('Error fetching system load:', error)
    }
  }

  if (loading || !analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  const completionRate = analytics.totalRequests > 0
    ? ((analytics.completedRequests / analytics.totalRequests) * 100).toFixed(1)
    : '0'

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Performance metrics and insights for your multi-agent system</p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Completion Rate</p>
              <FiCheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{completionRate}%</p>
            <p className="text-sm text-gray-500 mt-1">
              {analytics.completedRequests} of {analytics.totalRequests} requests
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Avg Completion Time</p>
              <FiClock className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {analytics.averageCompletionTime.toFixed(1)}h
            </p>
            <p className="text-sm text-gray-500 mt-1">Average response time</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Client Satisfaction</p>
              <FiTrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {(analytics.clientSatisfaction * 100).toFixed(0)}%
            </p>
            <p className="text-sm text-gray-500 mt-1">Overall satisfaction rate</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">System Load</p>
              <FiActivity className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {systemLoad ? systemLoad.utilizationPercentage.toFixed(0) : '0'}%
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {systemLoad ? systemLoad.currentLoad : 0}/{systemLoad ? systemLoad.totalCapacity : 0} capacity
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Requests by Category */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FiBarChart2 className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">Requests by Category</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(analytics.requestsByCategory).map(([category, count]) => {
                const percentage = ((count / analytics.totalRequests) * 100).toFixed(0)
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{category}</span>
                      <span className="text-sm text-gray-600">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Requests by Status */}
          <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <FiBarChart2 className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">Requests by Status</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(analytics.requestsByStatus).map(([status, count]) => {
                const percentage = ((count / analytics.totalRequests) * 100).toFixed(0)
                const colors: Record<string, string> = {
                  PENDING: 'bg-yellow-600',
                  IN_PROGRESS: 'bg-blue-600',
                  WAITING_CLIENT: 'bg-orange-600',
                  WAITING_AGENT: 'bg-purple-600',
                  COMPLETED: 'bg-green-600',
                  CANCELLED: 'bg-gray-600',
                }
                return (
                  <div key={status}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {status.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-600">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${colors[status] || 'bg-gray-600'} h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white rounded-lg shadow border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FiUsers className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-semibold text-gray-900">Agent Performance</h3>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requests Handled
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completed
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completion Rate
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Avg Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {analytics.agentPerformance.map((agent) => {
                    const completionRate =
                      agent.handled > 0 ? ((agent.completed / agent.handled) * 100).toFixed(0) : '0'
                    return (
                      <tr key={agent.agent} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {agent.agent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {agent.handled}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {agent.completed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-green-600 h-2 rounded-full"
                                style={{ width: `${completionRate}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{completionRate}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {agent.averageTime > 0 ? `${agent.averageTime.toFixed(1)}h` : '-'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Agent Capacity Overview */}
        {systemLoad && (
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <FiActivity className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-semibold text-gray-900">Agent Capacity Overview</h3>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {systemLoad.agentLoads.map((agent: any) => {
                  const utilization = ((agent.load / agent.capacity) * 100).toFixed(0)
                  const agentInfo = AGENT_REGISTRY[agent.agent as keyof typeof AGENT_REGISTRY]
                  return (
                    <div key={agent.agent} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">{agent.agent}</h4>
                      <div className="text-sm text-gray-600 mb-2">
                        {agent.load} / {agent.capacity} requests
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className={`h-2 rounded-full ${
                            parseInt(utilization) > 80
                              ? 'bg-red-600'
                              : parseInt(utilization) > 50
                              ? 'bg-yellow-600'
                              : 'bg-green-600'
                          }`}
                          style={{ width: `${utilization}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500">{utilization}% utilized</div>
                      {agentInfo && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <div className="text-xs text-gray-500">Avg Response: {agentInfo.averageResponseTime}h</div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
