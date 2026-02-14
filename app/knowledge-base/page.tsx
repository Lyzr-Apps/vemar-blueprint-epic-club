'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FiDatabase,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiFileText,
  FiUpload,
  FiArrowLeft,
  FiSave,
  FiSearch,
  FiFolder,
  FiFile
} from 'react-icons/fi'
import { KnowledgeBaseUpload } from '@/components/KnowledgeBaseUpload'
import { useRAGKnowledgeBase, RAGDocument } from '@/lib/ragKnowledgeBase'

interface KnowledgeBase {
  id: string
  name: string
  description: string
  documentCount: number
  createdAt: Date
  updatedAt: Date
  status: 'active' | 'training' | 'idle'
  category: string
}

export default function KnowledgeBasePage() {
  const [knowledgeBases, setKnowledgeBases] = useState<KnowledgeBase[]>([])
  const [loading, setLoading] = useState(false)
  const [activeView, setActiveView] = useState<'list' | 'create' | 'edit' | 'documents'>('list')
  const [selectedKB, setSelectedKB] = useState<KnowledgeBase | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'general'
  })

  // Initialize with mock data
  useEffect(() => {
    const mockKnowledgeBases: KnowledgeBase[] = [
      {
        id: 'rag_support_001',
        name: 'Support Knowledge Base',
        description: 'Customer support documentation, FAQs, and help articles',
        documentCount: 45,
        createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        status: 'active',
        category: 'support'
      },
      {
        id: 'rag_tech_001',
        name: 'Technical Documentation',
        description: 'API documentation, technical guides, and integration specs',
        documentCount: 67,
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        status: 'active',
        category: 'technical'
      },
      {
        id: 'rag_product_001',
        name: 'Product Information',
        description: 'Product specifications, feature docs, and release notes',
        documentCount: 32,
        createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        status: 'active',
        category: 'product'
      },
      {
        id: 'rag_marketing_001',
        name: 'Marketing Content',
        description: 'Marketing materials, campaign briefs, and brand guidelines',
        documentCount: 28,
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: 'idle',
        category: 'marketing'
      }
    ]

    setKnowledgeBases(mockKnowledgeBases)
  }, [])

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000)
  }

  const generateRagId = () => {
    return `rag_${Date.now()}_${Math.random().toString(36).substring(7)}`
  }

  const handleCreateKB = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const newKB: KnowledgeBase = {
      id: generateRagId(),
      name: formData.name,
      description: formData.description,
      documentCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'idle',
      category: formData.category
    }

    setKnowledgeBases(prev => [newKB, ...prev])
    showNotification('success', `Knowledge Base "${newKB.name}" created successfully`)
    setActiveView('list')
    resetForm()
    setLoading(false)
  }

  const handleUpdateKB = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedKB) return

    setLoading(true)

    const updatedKB: KnowledgeBase = {
      ...selectedKB,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      updatedAt: new Date()
    }

    setKnowledgeBases(prev => prev.map(kb => kb.id === selectedKB.id ? updatedKB : kb))
    showNotification('success', `Knowledge Base "${updatedKB.name}" updated successfully`)
    setActiveView('list')
    setSelectedKB(null)
    resetForm()
    setLoading(false)
  }

  const handleDeleteKB = (kbId: string) => {
    const kb = knowledgeBases.find(k => k.id === kbId)
    if (kb && confirm(`Are you sure you want to delete "${kb.name}"? This will remove all associated documents.`)) {
      setKnowledgeBases(prev => prev.filter(k => k.id !== kbId))
      showNotification('success', `Knowledge Base "${kb.name}" deleted successfully`)
    }
  }

  const handleEditKB = (kb: KnowledgeBase) => {
    setSelectedKB(kb)
    setFormData({
      name: kb.name,
      description: kb.description,
      category: kb.category
    })
    setActiveView('edit')
  }

  const handleViewDocuments = (kb: KnowledgeBase) => {
    setSelectedKB(kb)
    setActiveView('documents')
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'general'
    })
  }

  const handleCancel = () => {
    setActiveView('list')
    setSelectedKB(null)
    resetForm()
  }

  const handleUploadSuccess = (kb: KnowledgeBase) => (data: { documentCount?: number }) => {
    if (data.documentCount !== undefined) {
      setKnowledgeBases(prev => prev.map(k =>
        k.id === kb.id
          ? { ...k, documentCount: data.documentCount || k.documentCount, updatedAt: new Date(), status: 'active' as const }
          : k
      ))
      showNotification('success', 'Document uploaded and processed successfully')
    }
  }

  const handleDeleteSuccess = (kb: KnowledgeBase) => (fileName: string) => {
    setKnowledgeBases(prev => prev.map(k =>
      k.id === kb.id
        ? { ...k, documentCount: Math.max(0, k.documentCount - 1), updatedAt: new Date() }
        : k
    ))
    showNotification('success', `Document "${fileName}" deleted successfully`)
  }

  const getStatusColor = (status: KnowledgeBase['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-300'
      case 'training': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'idle': return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      support: 'bg-blue-100 text-blue-800 border-blue-300',
      technical: 'bg-purple-100 text-purple-800 border-purple-300',
      product: 'bg-green-100 text-green-800 border-green-300',
      marketing: 'bg-orange-100 text-orange-800 border-orange-300',
      general: 'bg-gray-100 text-gray-800 border-gray-300'
    }
    return colors[category] || colors.general
  }

  const stats = {
    totalKnowledgeBases: knowledgeBases.length,
    totalDocuments: knowledgeBases.reduce((sum, kb) => sum + kb.documentCount, 0),
    activeKnowledgeBases: knowledgeBases.filter(kb => kb.status === 'active').length,
    avgDocumentsPerKB: knowledgeBases.length > 0
      ? Math.round(knowledgeBases.reduce((sum, kb) => sum + kb.documentCount, 0) / knowledgeBases.length)
      : 0
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
              Knowledge Base Management
            </h1>
            <p className="text-gray-600 mt-1">
              Manage your RAG knowledge bases and document collections
            </p>
          </div>

          {activeView === 'list' && (
            <Button onClick={() => setActiveView('create')} className="gap-2">
              <FiPlus className="h-4 w-4" />
              Create Knowledge Base
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
                <CardTitle className="text-sm font-medium text-gray-600">Knowledge Bases</CardTitle>
                <FiDatabase className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalKnowledgeBases}</div>
                <p className="text-xs text-gray-500 mt-1">Total collections</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
                <FiFileText className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalDocuments}</div>
                <p className="text-xs text-gray-500 mt-1">Across all bases</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Bases</CardTitle>
                <FiFolder className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.activeKnowledgeBases}</div>
                <p className="text-xs text-gray-500 mt-1">Currently in use</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Avg Documents</CardTitle>
                <FiFile className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.avgDocumentsPerKB}</div>
                <p className="text-xs text-gray-500 mt-1">Per knowledge base</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Knowledge Base List View */}
        {activeView === 'list' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FiDatabase className="h-5 w-5" />
                Your Knowledge Bases
              </CardTitle>
              <CardDescription>
                Manage RAG knowledge bases for your AI agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {knowledgeBases.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <FiDatabase className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>No knowledge bases yet.</p>
                    <p className="text-sm mt-2">Create your first knowledge base to get started.</p>
                  </div>
                ) : (
                  knowledgeBases.map((kb) => (
                    <Card key={kb.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-3">
                                <FiDatabase className="h-5 w-5 text-blue-600" />
                                <h3 className="font-semibold text-lg">{kb.name}</h3>
                                <Badge className={getStatusColor(kb.status)}>
                                  {kb.status}
                                </Badge>
                                <Badge className={getCategoryColor(kb.category)}>
                                  {kb.category}
                                </Badge>
                              </div>

                              <p className="text-gray-600 text-sm">{kb.description}</p>

                              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                                <div>
                                  <p className="text-xs text-gray-500">Documents</p>
                                  <p className="text-lg font-semibold text-blue-600">{kb.documentCount}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Created</p>
                                  <p className="text-sm">{kb.createdAt.toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Last Updated</p>
                                  <p className="text-sm">{kb.updatedAt.toLocaleDateString()}</p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 pt-2">
                                <Badge variant="outline" className="bg-gray-50 font-mono text-xs">
                                  ID: {kb.id}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4 border-t">
                            <Button
                              size="sm"
                              onClick={() => handleViewDocuments(kb)}
                              className="gap-2"
                            >
                              <FiUpload className="h-3 w-3" />
                              Manage Documents
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditKB(kb)}
                              className="gap-2"
                            >
                              <FiEdit className="h-3 w-3" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteKB(kb.id)}
                              className="gap-2 text-red-600 hover:text-red-700"
                            >
                              <FiTrash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create/Edit Knowledge Base Form */}
        {(activeView === 'create' || activeView === 'edit') && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {activeView === 'create' ? <FiPlus className="h-5 w-5" /> : <FiEdit className="h-5 w-5" />}
                {activeView === 'create' ? 'Create Knowledge Base' : 'Edit Knowledge Base'}
              </CardTitle>
              <CardDescription>
                {activeView === 'create'
                  ? 'Set up a new RAG knowledge base for your AI agents'
                  : 'Update knowledge base information'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={activeView === 'create' ? handleCreateKB : handleUpdateKB} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Knowledge Base Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Customer Support Documentation"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe the purpose and content of this knowledge base..."
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="general">General</option>
                    <option value="support">Support</option>
                    <option value="technical">Technical</option>
                    <option value="product">Product</option>
                    <option value="marketing">Marketing</option>
                  </select>
                </div>

                {activeView === 'create' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
                      <FiDatabase className="h-4 w-4" />
                      What happens next?
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                      <li>A unique RAG ID will be generated</li>
                      <li>You can upload documents (PDF, DOCX, TXT)</li>
                      <li>Documents will be processed and indexed</li>
                      <li>Link this knowledge base to your AI agents</li>
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading} className="gap-2">
                    <FiSave className="h-4 w-4" />
                    {loading ? 'Saving...' : (activeView === 'create' ? 'Create Knowledge Base' : 'Update Knowledge Base')}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Documents View */}
        {activeView === 'documents' && selectedKB && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FiFolder className="h-5 w-5" />
                      {selectedKB.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {selectedKB.description}
                    </CardDescription>
                  </div>
                  <Button variant="outline" onClick={() => handleCancel()} className="gap-2">
                    <FiArrowLeft className="h-4 w-4" />
                    Back to List
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Documents</p>
                    <p className="text-lg font-semibold text-blue-600">{selectedKB.documentCount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <Badge className={getStatusColor(selectedKB.status)}>
                      {selectedKB.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Knowledge Base ID</p>
                    <p className="text-xs font-mono bg-white px-2 py-1 rounded border">{selectedKB.id}</p>
                  </div>
                </div>

                <KnowledgeBaseUpload
                  ragId={selectedKB.id}
                  onUploadSuccess={handleUploadSuccess(selectedKB)}
                  onDeleteSuccess={handleDeleteSuccess(selectedKB)}
                />
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p>VEMAR.AI Knowledge Base Management - Built by the awesome team at Lyzr</p>
        </div>
      </div>
    </div>
  )
}
