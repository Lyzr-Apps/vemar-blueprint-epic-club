'use client'

import { useState, useEffect } from 'react'
import {
  FiKey,
  FiShield,
  FiClock,
  FiCheck,
  FiX,
  FiCopy,
  FiPlus,
  FiTrash2,
  FiAlertCircle,
  FiLock,
  FiUnlock,
  FiActivity
} from 'react-icons/fi'

interface ApiKey {
  id: string
  key: string
  name: string
  permissions: string[]
  rateLimit: number
  createdAt: string
  lastUsedAt?: string
  expiresAt?: string
  isActive: boolean
}

export default function ApiSecurityPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newKeyData, setNewKeyData] = useState({
    name: '',
    permissions: [] as string[],
    rateLimit: 100,
    expiresInDays: 0,
  })
  const [createdKey, setCreatedKey] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const permissionOptions = [
    'read:requests',
    'write:requests',
    'read:clients',
    'write:clients',
    'read:analytics',
    'admin:api-keys',
    'send:notifications',
  ]

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/api-keys')
      const data = await response.json()

      if (data.success) {
        setApiKeys(data.apiKeys)
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to fetch API keys')
    } finally {
      setLoading(false)
    }
  }

  const createApiKey = async () => {
    if (!newKeyData.name || newKeyData.permissions.length === 0) {
      setError('Name and at least one permission are required')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/admin/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newKeyData),
      })

      const data = await response.json()

      if (data.success) {
        setCreatedKey(data.apiKey)
        setShowCreateModal(false)
        setNewKeyData({
          name: '',
          permissions: [],
          rateLimit: 100,
          expiresInDays: 0,
        })
        fetchApiKeys()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to create API key')
    } finally {
      setLoading(false)
    }
  }

  const revokeApiKey = async (key: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/admin/api-keys?key=${encodeURIComponent(key)}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        fetchApiKeys()
      } else {
        setError(data.error)
      }
    } catch (err) {
      setError('Failed to revoke API key')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(text)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const togglePermission = (permission: string) => {
    setNewKeyData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p) => p !== permission)
        : [...prev.permissions, permission],
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3 mb-2">
              <FiShield className="w-8 h-8 text-blue-600" />
              API Security Center
            </h1>
            <p className="text-gray-600">
              Manage API keys, permissions, and access control for your protected APIs
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiPlus className="w-5 h-5" />
            Create API Key
          </button>
        </div>

        {/* Security Features Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiKey className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{apiKeys.length}</p>
                <p className="text-sm text-gray-600">Active Keys</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiActivity className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">100/min</p>
                <p className="text-sm text-gray-600">Rate Limit</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiLock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">SHA-256</p>
                <p className="text-sm text-gray-600">Encryption</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <FiShield className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">HMAC</p>
                <p className="text-sm text-gray-600">Signature Auth</p>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-800">
              <FiAlertCircle className="w-5 h-5" />
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Created Key Display */}
        {createdKey && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-2 text-green-800 mb-4">
              <FiCheck className="w-5 h-5" />
              <p className="font-semibold">API Key Created Successfully!</p>
            </div>
            <p className="text-sm text-green-700 mb-3">
              Make sure to copy your API key now. You won't be able to see it again!
            </p>
            <div className="flex items-center gap-2 bg-white border border-green-300 rounded-lg p-3">
              <code className="flex-1 font-mono text-sm text-gray-900">{createdKey}</code>
              <button
                onClick={() => copyToClipboard(createdKey)}
                className="p-2 hover:bg-green-100 rounded transition-colors"
              >
                {copiedKey === createdKey ? (
                  <FiCheck className="w-5 h-5 text-green-600" />
                ) : (
                  <FiCopy className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
            <button
              onClick={() => setCreatedKey(null)}
              className="mt-3 text-sm text-green-700 hover:text-green-900"
            >
              I've copied the key
            </button>
          </div>
        )}

        {/* API Keys Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <FiKey className="w-5 h-5 text-gray-600" />
              API Keys
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading API keys...</p>
            </div>
          ) : apiKeys.length === 0 ? (
            <div className="p-12 text-center">
              <FiKey className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No API keys created yet</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Create your first API key
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Key
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rate Limit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {apiKeys.map((apiKey) => (
                    <tr key={apiKey.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FiKey className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{apiKey.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <code className="text-sm font-mono text-gray-600">{apiKey.key}</code>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {apiKey.permissions.slice(0, 2).map((perm) => (
                            <span
                              key={perm}
                              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                            >
                              {perm}
                            </span>
                          ))}
                          {apiKey.permissions.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{apiKey.permissions.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiActivity className="w-4 h-4" />
                          {apiKey.rateLimit}/min
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {apiKey.isActive ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <FiUnlock className="w-4 h-4" />
                            <span className="text-sm font-medium">Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <FiLock className="w-4 h-4" />
                            <span className="text-sm font-medium">Revoked</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiClock className="w-4 h-4" />
                          {new Date(apiKey.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => revokeApiKey(apiKey.key)}
                          disabled={!apiKey.isActive}
                          className="text-red-600 hover:text-red-700 disabled:text-gray-400 disabled:cursor-not-allowed"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <FiPlus className="w-6 h-6 text-blue-600" />
                  Create New API Key
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key Name
                  </label>
                  <input
                    type="text"
                    value={newKeyData.name}
                    onChange={(e) =>
                      setNewKeyData({ ...newKeyData, name: e.target.value })
                    }
                    placeholder="e.g., Production API Key"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Permissions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Permissions
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {permissionOptions.map((perm) => (
                      <label
                        key={perm}
                        className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={newKeyData.permissions.includes(perm)}
                          onChange={() => togglePermission(perm)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm text-gray-700">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rate Limit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rate Limit (requests per minute)
                  </label>
                  <input
                    type="number"
                    value={newKeyData.rateLimit}
                    onChange={(e) =>
                      setNewKeyData({ ...newKeyData, rateLimit: parseInt(e.target.value) })
                    }
                    min="1"
                    max="10000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Expiration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expires In (days, 0 = never)
                  </label>
                  <input
                    type="number"
                    value={newKeyData.expiresInDays}
                    onChange={(e) =>
                      setNewKeyData({ ...newKeyData, expiresInDays: parseInt(e.target.value) })
                    }
                    min="0"
                    max="365"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={createApiKey}
                  disabled={loading || !newKeyData.name || newKeyData.permissions.length === 0}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create API Key
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Documentation */}
        <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FiShield className="w-5 h-5 text-blue-600" />
            API Security Features
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Authentication</h4>
              <p className="text-sm text-gray-600 mb-2">
                Include your API key in the Authorization header:
              </p>
              <code className="block bg-gray-50 p-3 rounded text-sm text-gray-800 font-mono">
                Authorization: Bearer vemar_...
              </code>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Rate Limiting</h4>
              <p className="text-sm text-gray-600 mb-2">
                All API keys have configurable rate limits to prevent abuse and ensure fair usage.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Permissions</h4>
              <p className="text-sm text-gray-600 mb-2">
                Each API key can have specific permissions for fine-grained access control.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Encryption</h4>
              <p className="text-sm text-gray-600 mb-2">
                API keys are hashed with SHA-256 and can include HMAC signature validation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
