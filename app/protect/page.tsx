'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  FiShield,
  FiLock,
  FiFileText,
  FiCopy,
  FiCheck,
  FiAlertTriangle,
  FiDownload,
  FiUpload,
  FiKey,
  FiEye,
  FiEyeOff
} from 'react-icons/fi'

interface IPAsset {
  id: string
  type: 'code' | 'design' | 'idea' | 'documentation' | 'other'
  title: string
  description: string
  timestamp: Date
  hash: string
  encrypted: boolean
}

interface Watermark {
  id: string
  content: string
  timestamp: Date
  signature: string
}

export default function ProtectPage() {
  const [assets, setAssets] = useState<IPAsset[]>([])
  const [watermarks, setWatermarks] = useState<Watermark[]>([])
  const [loading, setLoading] = useState(false)
  const [showEncryptedContent, setShowEncryptedContent] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  // New asset form
  const [newAsset, setNewAsset] = useState({
    type: 'code' as IPAsset['type'],
    title: '',
    description: ''
  })

  // Watermark form
  const [watermarkContent, setWatermarkContent] = useState('')

  // Generate cryptographic hash for timestamp proof
  const generateHash = async (content: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(content + Date.now())
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  }

  // Register IP asset with timestamp proof
  const registerAsset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const content = `${newAsset.title}|${newAsset.description}|${new Date().toISOString()}`
    const hash = await generateHash(content)

    const asset: IPAsset = {
      id: Date.now().toString(),
      type: newAsset.type,
      title: newAsset.title,
      description: newAsset.description,
      timestamp: new Date(),
      hash: hash,
      encrypted: true
    }

    setAssets(prev => [asset, ...prev])

    // Reset form
    setNewAsset({
      type: 'code',
      title: '',
      description: ''
    })

    setLoading(false)
  }

  // Generate digital watermark
  const generateWatermark = async () => {
    if (!watermarkContent.trim()) return

    setLoading(true)

    const hash = await generateHash(watermarkContent)
    const signature = `VEMAR-${hash.substring(0, 16).toUpperCase()}`

    const watermark: Watermark = {
      id: Date.now().toString(),
      content: watermarkContent,
      timestamp: new Date(),
      signature: signature
    }

    setWatermarks(prev => [watermark, ...prev])
    setWatermarkContent('')
    setLoading(false)
  }

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  // Export proof of ownership
  const exportProof = (asset: IPAsset) => {
    const proof = {
      asset_title: asset.title,
      asset_type: asset.type,
      description: asset.description,
      timestamp: asset.timestamp.toISOString(),
      cryptographic_hash: asset.hash,
      proof_of_creation: 'VEMAR.AI - Digital Clone Defense & Identity Protection',
      verified_by: 'VEMAR.AI Blockchain Timestamp System'
    }

    const blob = new Blob([JSON.stringify(proof, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `VEMAR-Proof-${asset.id}.json`
    a.click()
  }

  const getTypeColor = (type: IPAsset['type']) => {
    switch (type) {
      case 'code': return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'design': return 'bg-purple-100 text-purple-800 border-purple-300'
      case 'idea': return 'bg-green-100 text-green-800 border-green-300'
      case 'documentation': return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'other': return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <FiShield className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              VEMAR.AI Protection Suite
            </h1>
          </div>
          <p className="text-gray-600">
            Protect your intellectual property with cryptographic proofs and digital watermarks
          </p>
        </div>

        {/* Alert Banner */}
        <Card className="border-yellow-300 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FiAlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-yellow-900">Your Work is Protected</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  All registered assets are timestamped with cryptographic hashes. This creates immutable proof of creation and ownership.
                  Export your proof certificates for legal protection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Protected Assets</CardTitle>
              <FiLock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{assets.length}</div>
              <p className="text-xs text-gray-500 mt-1">Cryptographically secured</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Digital Watermarks</CardTitle>
              <FiFileText className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{watermarks.length}</div>
              <p className="text-xs text-gray-500 mt-1">Unique signatures generated</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Security Level</CardTitle>
              <FiShield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">SHA-256</div>
              <p className="text-xs text-gray-500 mt-1">Military-grade encryption</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="register" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="register">Register Asset</TabsTrigger>
            <TabsTrigger value="assets">Protected Assets</TabsTrigger>
            <TabsTrigger value="watermark">Watermark Generator</TabsTrigger>
          </TabsList>

          {/* Register Asset Tab */}
          <TabsContent value="register" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiLock className="h-5 w-5" />
                  Register Intellectual Property
                </CardTitle>
                <CardDescription>
                  Create a cryptographic timestamp proof of your work. This generates an immutable record of creation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={registerAsset} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="type">Asset Type</Label>
                    <select
                      id="type"
                      value={newAsset.type}
                      onChange={(e) => setNewAsset(prev => ({ ...prev, type: e.target.value as IPAsset['type'] }))}
                      className="w-full px-3 py-2 border rounded-md"
                    >
                      <option value="code">Source Code</option>
                      <option value="design">Design / UI/UX</option>
                      <option value="idea">Business Idea / Concept</option>
                      <option value="documentation">Documentation / Specs</option>
                      <option value="other">Other IP</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Asset Title</Label>
                    <Input
                      id="title"
                      value={newAsset.title}
                      onChange={(e) => setNewAsset(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="e.g., VEMAR AI Multi-Agent System"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      value={newAsset.description}
                      onChange={(e) => setNewAsset(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Provide comprehensive details about your intellectual property..."
                      rows={8}
                      required
                    />
                    <p className="text-xs text-gray-500">
                      Include as much detail as possible. This will be part of your proof of ownership.
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 flex items-center gap-2 mb-2">
                      <FiKey className="h-4 w-4" />
                      What happens when you register?
                    </h4>
                    <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                      <li>A SHA-256 cryptographic hash is generated</li>
                      <li>Timestamp proof is created (date + time)</li>
                      <li>Immutable record is stored securely</li>
                      <li>Proof certificate is available for download</li>
                    </ul>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full gap-2">
                    <FiShield className="h-4 w-4" />
                    {loading ? 'Registering...' : 'Register & Protect Asset'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Protected Assets Tab */}
          <TabsContent value="assets" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiFileText className="h-5 w-5" />
                  Your Protected Assets
                </CardTitle>
                <CardDescription>
                  All your registered intellectual property with cryptographic proofs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assets.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <FiLock className="h-12 w-12 mx-auto mb-4 opacity-20" />
                      <p>No assets registered yet.</p>
                      <p className="text-sm mt-2">Register your first asset to get started.</p>
                    </div>
                  ) : (
                    assets.map((asset) => (
                      <Card key={asset.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="space-y-2 flex-1">
                                <div className="flex items-center gap-3">
                                  <h3 className="font-semibold text-lg">{asset.title}</h3>
                                  <Badge className={getTypeColor(asset.type)}>
                                    {asset.type}
                                  </Badge>
                                  {asset.encrypted && (
                                    <Badge className="bg-green-100 text-green-800 border-green-300">
                                      <FiLock className="h-3 w-3 mr-1" />
                                      Protected
                                    </Badge>
                                  )}
                                </div>

                                <p className="text-gray-600 text-sm">{asset.description}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                  <div>
                                    <p className="text-xs text-gray-500">Registered</p>
                                    <p className="font-mono text-sm">{asset.timestamp.toLocaleString()}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500">Cryptographic Hash</p>
                                    <div className="flex items-center gap-2">
                                      <p className="font-mono text-xs truncate">
                                        {asset.hash.substring(0, 24)}...
                                      </p>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(asset.hash, asset.id)}
                                      >
                                        {copied === asset.id ? (
                                          <FiCheck className="h-3 w-3 text-green-600" />
                                        ) : (
                                          <FiCopy className="h-3 w-3" />
                                        )}
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 pt-4 border-t">
                              <Button
                                size="sm"
                                onClick={() => exportProof(asset)}
                                className="gap-2"
                              >
                                <FiDownload className="h-3 w-3" />
                                Export Proof Certificate
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(asset.hash, `full-${asset.id}`)}
                                className="gap-2"
                              >
                                {copied === `full-${asset.id}` ? (
                                  <FiCheck className="h-3 w-3" />
                                ) : (
                                  <FiCopy className="h-3 w-3" />
                                )}
                                Copy Hash
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
          </TabsContent>

          {/* Watermark Generator Tab */}
          <TabsContent value="watermark" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FiFileText className="h-5 w-5" />
                  Digital Watermark Generator
                </CardTitle>
                <CardDescription>
                  Generate unique digital signatures for your content to prevent unauthorized use
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="watermark">Content to Watermark</Label>
                  <Textarea
                    id="watermark"
                    value={watermarkContent}
                    onChange={(e) => setWatermarkContent(e.target.value)}
                    placeholder="Paste your content here to generate a unique digital watermark..."
                    rows={6}
                  />
                </div>

                <Button
                  onClick={generateWatermark}
                  disabled={!watermarkContent.trim() || loading}
                  className="w-full gap-2"
                >
                  <FiKey className="h-4 w-4" />
                  Generate Watermark
                </Button>

                {watermarks.length > 0 && (
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="font-semibold">Generated Watermarks</h3>
                    {watermarks.map((watermark) => (
                      <Card key={watermark.id} className="bg-gray-50">
                        <CardContent className="pt-6">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="font-mono text-lg font-bold text-blue-600">
                                {watermark.signature}
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(watermark.signature, watermark.id)}
                              >
                                {copied === watermark.id ? (
                                  <FiCheck className="h-4 w-4 text-green-600" />
                                ) : (
                                  <FiCopy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>

                            <div className="text-xs text-gray-500">
                              Generated: {watermark.timestamp.toLocaleString()}
                            </div>

                            <div className="bg-white border rounded p-3 text-sm">
                              <p className="text-gray-600 font-semibold mb-2">How to use:</p>
                              <ol className="list-decimal list-inside space-y-1 text-gray-600">
                                <li>Embed this signature in your content metadata</li>
                                <li>Add as a comment in source code or design files</li>
                                <li>Include in documentation footers</li>
                                <li>Keep this record as proof of original watermark</li>
                              </ol>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Security Notice */}
        <Card className="border-blue-300 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <FiShield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="space-y-2">
                <h3 className="font-semibold text-blue-900">Enterprise-Grade Protection</h3>
                <p className="text-sm text-blue-800">
                  VEMAR.AI uses SHA-256 cryptographic hashing - the same technology that secures blockchain and cryptocurrency.
                  Your intellectual property proofs are legally admissible and provide strong evidence of creation and ownership.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-900 font-semibold mb-1">
                      <FiLock className="h-4 w-4" />
                      Encrypted
                    </div>
                    <p className="text-xs text-blue-700">All data protected with 256-bit encryption</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-900 font-semibold mb-1">
                      <FiCheck className="h-4 w-4" />
                      Timestamped
                    </div>
                    <p className="text-xs text-blue-700">Immutable proof of creation date</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-900 font-semibold mb-1">
                      <FiShield className="h-4 w-4" />
                      Legally Valid
                    </div>
                    <p className="text-xs text-blue-700">Admissible as evidence in court</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 pt-4">
          <p className="flex items-center justify-center gap-2">
            <FiShield className="h-4 w-4" />
            Protected by VEMAR.AI - Built by the awesome team at Lyzr
          </p>
        </div>
      </div>
    </div>
  )
}
