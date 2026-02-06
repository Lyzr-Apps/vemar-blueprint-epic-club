'use client'

import { useState, useEffect } from 'react'
import { callAIAgent } from '@/lib/aiAgent'
import { getPaymentUrl } from '@/lib/payment'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  FiShield, FiCpu, FiDatabase, FiLock, FiTrendingUp,
  FiDollarSign, FiDownload, FiFileText, FiCheckCircle,
  FiAlertCircle, FiLoader, FiZap, FiBriefcase, FiTarget,
  FiGrid, FiLayers, FiActivity, FiStar, FiTrendingDown,
  FiMoon, FiSun, FiMonitor, FiSend, FiRefreshCw, FiMaximize2,
  FiCreditCard, FiExternalLink, FiUpload, FiImage, FiVideo,
  FiMusic, FiSearch, FiEye
} from 'react-icons/fi'
import {
  SiOpenai, SiPython, SiTypescript, SiReact, SiDocker, SiKubernetes
} from 'react-icons/si'

// TypeScript Interfaces based on actual test responses
interface FounderCEOResponse {
  value_proposition: string
  mission: string
  vision: string
  positioning: string
  north_star_metrics: string[]
  moat_strategy: string
}

interface CoreModule {
  name: string
  description: string
  tech_stack: string
}

interface ProductArchitectResponse {
  system_architecture: string
  core_modules: CoreModule[]
  mvp_features: string[]
  v1_features: string[]
  v2_features: string[]
  api_strategy: string
}

interface ModelArchitecture {
  architecture: string
  backbone?: string
  training_data?: string
  features?: string[]
  challenge_types?: string[]
}

interface AIMLResponse {
  deepfake_model: ModelArchitecture
  behavioral_biometrics_model: ModelArchitecture
  liveness_model: ModelArchitecture
  evaluation_metrics: string[]
  latency_target: string
  accuracy_target: string
}

interface VectorCollection {
  name: string
  embedding_type: string
  dimensions: number
}

interface RAGWorkflow {
  retrieve: string
  reason: string
  act: string
}

interface RAGResponse {
  vector_db_schema: {
    collections: VectorCollection[]
  }
  knowledge_sources: string[]
  rag_workflow: RAGWorkflow
  explainability_approach: string
  identity_memory_design: string
}

interface ComplianceRoadmapItem {
  standard: string
  timeline: string
  key_controls: string[]
}

interface ThreatModelItem {
  threat: string
  mitigation: string
}

interface SecurityResponse {
  security_architecture: string
  compliance_roadmap: ComplianceRoadmapItem[]
  threat_model: ThreatModelItem[]
  data_retention_policy: string
  privacy_techniques: string[]
}

interface ICP {
  segment: string
  pain_points: string[]
  budget_range: string
}

interface BuyerPersona {
  title: string
  goals: string
  objections: string
}

interface PricingTier {
  tier: string
  price: string
  features: string[]
}

interface GTMResponse {
  icps: ICP[]
  buyer_personas: BuyerPersona[]
  pricing_tiers: PricingTier[]
  zero_to_one_strategy: string
  channels: string[]
}

interface TAMSAMSOM {
  tam: string
  sam: string
  som: string
}

interface FundingRound {
  round: string
  amount: string
  use_of_funds: string[]
}

interface InvestorResponse {
  investor_narrative: string
  tam_sam_som: TAMSAMSOM
  funding_rounds: FundingRound[]
  key_metrics: string[]
  pitch_deck_outline: string[]
}

// Agent configuration
const agents = [
  {
    id: '6985a1bbb37fff3a03c07c44',
    name: 'Founder & CEO',
    shortName: 'Strategy',
    icon: FiTarget,
    gradient: 'from-purple-500 via-pink-500 to-rose-500',
    bgGradient: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
    description: 'Strategic vision, mission, and competitive moat',
    defaultQuery: 'Define VEMAR.AI\'s complete strategic vision, mission, value proposition, and competitive moat for defending against deepfakes and synthetic identity fraud.',
    tags: ['Vision', 'Strategy', 'Moat']
  },
  {
    id: '6985a1d176d4fd436bf4b7bd',
    name: 'Product Architect',
    shortName: 'Architecture',
    icon: FiGrid,
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    bgGradient: 'from-blue-500/10 via-cyan-500/10 to-teal-500/10',
    description: 'System architecture and product design',
    defaultQuery: 'Design the complete product architecture for VEMAR.AI including deepfake detection engine, behavioral biometrics, identity graphs, and API strategy.',
    tags: ['Architecture', 'API', 'Microservices']
  },
  {
    id: '6985a1fb301c62c7ca2c7daf',
    name: 'AI/ML Research',
    shortName: 'AI Models',
    icon: FiCpu,
    gradient: 'from-green-500 via-emerald-500 to-teal-500',
    bgGradient: 'from-green-500/10 via-emerald-500/10 to-teal-500/10',
    description: 'ML model design and evaluation',
    defaultQuery: 'Design the ML model architectures for deepfake detection, behavioral biometrics, and liveness detection with specific datasets and evaluation metrics.',
    tags: ['Deep Learning', 'CNN', 'Transformers']
  },
  {
    id: '6985a21376d4fd436bf4b7c1',
    name: 'RAG & Knowledge',
    shortName: 'Data Systems',
    icon: FiDatabase,
    gradient: 'from-yellow-500 via-orange-500 to-red-500',
    bgGradient: 'from-yellow-500/10 via-orange-500/10 to-red-500/10',
    description: 'RAG workflows and knowledge management',
    defaultQuery: 'Design the vector database schema, knowledge ingestion pipeline, and RAG workflow for fraud pattern memory and identity graphs.',
    tags: ['Vector DB', 'RAG', 'Embeddings']
  },
  {
    id: '6985a22af7f7d3ffa5d8664c',
    name: 'Security & Compliance',
    shortName: 'Security',
    icon: FiLock,
    gradient: 'from-red-500 via-rose-500 to-pink-500',
    bgGradient: 'from-red-500/10 via-rose-500/10 to-pink-500/10',
    description: 'Security architecture and compliance',
    defaultQuery: 'Create comprehensive security architecture and compliance roadmap covering GDPR, DPDP, SOC-2, ISO-27001, and threat modeling.',
    tags: ['GDPR', 'SOC-2', 'Zero Trust']
  },
  {
    id: '6985a2455eb49186d63e5dc9',
    name: 'GTM & Growth',
    shortName: 'Growth',
    icon: FiTrendingUp,
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    bgGradient: 'from-indigo-500/10 via-purple-500/10 to-pink-500/10',
    description: 'Go-to-market and customer acquisition',
    defaultQuery: 'Define ideal customer profiles, buyer personas, pricing tiers, and 0-to-1 acquisition strategy for VEMAR.AI.',
    tags: ['ICP', 'Pricing', 'Sales']
  },
  {
    id: '6985a25f8ce1fc653cfdee55',
    name: 'Investor & Fundraising',
    shortName: 'Capital',
    icon: FiDollarSign,
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    bgGradient: 'from-teal-500/10 via-cyan-500/10 to-blue-500/10',
    description: 'Investor narrative and metrics',
    defaultQuery: 'Create investor narrative, TAM/SAM/SOM calculations, funding roadmap, and pitch deck outline for VEMAR.AI.',
    tags: ['TAM/SAM/SOM', 'Pitch Deck', 'VC']
  }
]

// Typewriter effect hook
const useTypewriter = (words: string[], delay = 100) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const word = words[currentWordIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < word.length) {
          setCurrentText(word.slice(0, currentText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(word.slice(0, currentText.length - 1))
        } else {
          setIsDeleting(false)
          setCurrentWordIndex((prev) => (prev + 1) % words.length)
        }
      }
    }, isDeleting ? delay / 2 : delay)

    return () => clearTimeout(timeout)
  }, [currentText, currentWordIndex, isDeleting, words, delay])

  return currentText
}

export default function VemarAIStudio() {
  const [activeAgent, setActiveAgent] = useState(0)
  const [query, setQuery] = useState('')
  const [response, setResponse] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('dark')
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [showFullResponse, setShowFullResponse] = useState(false)
  const [agentHistory, setAgentHistory] = useState<Record<number, any>>({})
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [scanResult, setScanResult] = useState<{
    status: 'authentic' | 'manipulated' | 'suspicious' | null
    confidence: number
    details: string[]
  } | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [guardrailWarning, setGuardrailWarning] = useState<string | null>(null)
  const [isInvestorMode, setIsInvestorMode] = useState(true)

  const typewriterWords = [
    'a revolutionary AI defense platform',
    'enterprise-grade deepfake detection',
    'behavioral biometric systems',
    'identity fraud prevention',
    'synthetic media verification',
    'digital clone defense'
  ]

  const heroText = useTypewriter(typewriterWords, 80)

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('vemar-theme') as 'light' | 'dark' | 'system' | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement
    if (newTheme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', isDark)
    } else {
      root.classList.toggle('dark', newTheme === 'dark')
    }
  }

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    localStorage.setItem('vemar-theme', newTheme)
    applyTheme(newTheme)
  }

  // Auto-save simulation
  useEffect(() => {
    if (response) {
      setAutoSaveStatus('saving')
      const timeout = setTimeout(() => {
        setAutoSaveStatus('saved')
        setAgentHistory(prev => ({
          ...prev,
          [activeAgent]: response
        }))
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [response, activeAgent])

  // AI Guardrails - Content moderation and validation
  const checkGuardrails = (input: string): { safe: boolean; warning?: string } => {
    const inputLower = input.toLowerCase()

    // Prohibited content patterns
    const prohibitedPatterns = [
      { pattern: /(hack|exploit|vulnerability|breach|attack)\s+(database|system|server)/gi, message: 'Security-related malicious queries are not permitted' },
      { pattern: /(generate|create|write)\s+(malware|virus|trojan|ransomware)/gi, message: 'Malicious software generation is prohibited' },
      { pattern: /(bypass|disable|remove)\s+(security|authentication|authorization)/gi, message: 'Security bypass requests are not allowed' },
      { pattern: /personal\s+(data|information|details)\s+of\s+/gi, message: 'Personal data extraction is prohibited' },
      { pattern: /(spam|phishing|scam)\s+(email|message|campaign)/gi, message: 'Fraudulent activity generation is not permitted' }
    ]

    // Check for prohibited patterns
    for (const { pattern, message } of prohibitedPatterns) {
      if (pattern.test(input)) {
        return { safe: false, warning: message }
      }
    }

    // Input length validation
    if (input.length > 5000) {
      return { safe: false, warning: 'Query exceeds maximum length of 5000 characters' }
    }

    // Minimum meaningful input
    if (input.trim().length < 3 && input.trim().length > 0) {
      return { safe: false, warning: 'Please provide a more detailed query' }
    }

    return { safe: true }
  }

  const handleConsultAgent = async () => {
    const agent = agents[activeAgent]
    const queryToSend = query.trim() || agent.defaultQuery

    // Apply AI Guardrails
    const guardrailCheck = checkGuardrails(queryToSend)
    if (!guardrailCheck.safe) {
      setGuardrailWarning(guardrailCheck.warning || 'Query validation failed')
      return
    }

    setLoading(true)
    setError(null)
    setResponse(null)
    setGuardrailWarning(null)

    try {
      const result = await callAIAgent(queryToSend, agent.id)

      if (result.success && result.response.status === 'success') {
        setResponse(result.response.result)
      } else {
        setError(result.error || 'Agent returned an error. Please try again.')
      }
    } catch (err) {
      setError('Failed to connect to agent. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleExportJSON = () => {
    if (!response) return
    const dataStr = JSON.stringify(response, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const exportFileDefaultName = `vemar-${agents[activeAgent].shortName.toLowerCase()}-${Date.now()}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handleExportBlueprint = () => {
    const blueprint = {
      timestamp: new Date().toISOString(),
      agents: agents.map((agent, idx) => ({
        name: agent.name,
        response: agentHistory[idx] || null
      }))
    }

    const dataStr = JSON.stringify(blueprint, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)
    const exportFileDefaultName = `vemar-ai-complete-blueprint-${Date.now()}.json`

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const handlePaymentGateway = async () => {
    try {
      const result = await getPaymentUrl()
      if (result.success && result.payment_url) {
        window.open(result.payment_url, '_blank')
      } else {
        setError(result.error || 'Failed to access payment gateway')
      }
    } catch (err) {
      setError('Failed to connect to payment gateway')
    }
  }

  const handleQuickAction = async (actionType: 'pitch-deck' | 'tech-stack' | 'roadmap' | 'business-plan') => {
    const actionMap = {
      'pitch-deck': {
        agentIndex: 6, // Investor & Fundraising
        query: 'Create a comprehensive pitch deck outline with slide-by-slide breakdown for VEMAR.AI including problem, solution, market size, business model, traction, team, and ask.'
      },
      'tech-stack': {
        agentIndex: 1, // Product Architect
        query: 'Detail the complete technical stack for VEMAR.AI including frontend, backend, ML infrastructure, database, deployment, and DevOps tools with justification for each choice.'
      },
      'roadmap': {
        agentIndex: 1, // Product Architect
        query: 'Create a detailed product roadmap for VEMAR.AI with MVP, V1, and V2 milestones, timeline estimates, and key deliverables for each phase.'
      },
      'business-plan': {
        agentIndex: 0, // Founder & CEO
        query: 'Develop a comprehensive business plan for VEMAR.AI covering executive summary, market analysis, competitive positioning, business model, revenue strategy, and growth projections.'
      }
    }

    const action = actionMap[actionType]

    // Apply AI Guardrails
    const guardrailCheck = checkGuardrails(action.query)
    if (!guardrailCheck.safe) {
      setGuardrailWarning(guardrailCheck.warning || 'Query validation failed')
      return
    }

    setActiveAgent(action.agentIndex)
    setQuery(action.query)

    // Auto-trigger the agent consultation
    const agent = agents[action.agentIndex]
    setLoading(true)
    setError(null)
    setResponse(null)
    setGuardrailWarning(null)

    try {
      const result = await callAIAgent(action.query, agent.id)

      if (result.success && result.response.status === 'success') {
        setResponse(result.response.result)
      } else {
        setError(result.error || 'Agent returned an error. Please try again.')
      }
    } catch (err) {
      setError('Failed to connect to agent. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const validTypes = ['image/', 'video/', 'audio/']
    const isValid = validTypes.some(type => file.type.startsWith(type))

    if (!isValid) {
      setError('Please upload a valid image, video, or audio file.')
      return
    }

    setUploadedFile(file)
    setUploadProgress(0)
    setScanResult(null)
    setError(null)
    setIsScanning(true)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate AI analysis
    setTimeout(() => {
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Simulate deepfake detection result
      const mockResults = [
        {
          status: 'authentic' as const,
          confidence: 98.5,
          details: [
            'No digital manipulation signatures detected',
            'Facial consistency analysis passed',
            'Temporal coherence verified',
            'Natural lighting patterns confirmed'
          ]
        },
        {
          status: 'manipulated' as const,
          confidence: 94.2,
          details: [
            'Deepfake artifacts detected in facial region',
            'Inconsistent eye blinking patterns',
            'Audio-visual synchronization anomalies',
            'GAN-based manipulation signatures found'
          ]
        },
        {
          status: 'suspicious' as const,
          confidence: 72.8,
          details: [
            'Minor inconsistencies in lighting',
            'Compression artifacts detected',
            'Partial facial occlusion complicates analysis',
            'Requires manual review'
          ]
        }
      ]

      const result = mockResults[Math.floor(Math.random() * mockResults.length)]
      setScanResult(result)
      setIsScanning(false)
    }, 3000)
  }

  const renderResponse = (data: any, agentIndex: number) => {
    if (!data) return null

    switch (agentIndex) {
      case 0: // Founder & CEO
        return <FounderCEORenderer data={data as FounderCEOResponse} />
      case 1: // Product Architect
        return <ProductArchitectRenderer data={data as ProductArchitectResponse} />
      case 2: // AI/ML Research
        return <AIMLRenderer data={data as AIMLResponse} />
      case 3: // RAG & Knowledge
        return <RAGRenderer data={data as RAGResponse} />
      case 4: // Security & Compliance
        return <SecurityRenderer data={data as SecurityResponse} />
      case 5: // GTM & Growth
        return <GTMRenderer data={data as GTMResponse} />
      case 6: // Investor & Fundraising
        return <InvestorRenderer data={data as InvestorResponse} />
      default:
        return null
    }
  }

  const currentAgent = agents[activeAgent]
  const hasHistory = Object.keys(agentHistory).length > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
                  <FiShield className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  VEMAR.AI
                </h1>
                <p className="text-xs text-slate-400">Multi-Agent Venture Studio</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* AI Guardrails Status */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg">
                <FiShield className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-300 font-medium">Protected</span>
              </div>

              {/* Auto-save status */}
              <div className="flex items-center gap-2 text-xs">
                {autoSaveStatus === 'saving' && (
                  <>
                    <FiLoader className="w-3 h-3 animate-spin text-blue-400" />
                    <span className="text-slate-400">Saving...</span>
                  </>
                )}
                {autoSaveStatus === 'saved' && (
                  <>
                    <FiCheckCircle className="w-3 h-3 text-green-400" />
                    <span className="text-slate-400">Up to date</span>
                  </>
                )}
              </div>

              {/* Theme switcher */}
              <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`p-2 rounded ${theme === 'light' ? 'bg-slate-700' : 'hover:bg-slate-700/50'} transition-colors`}
                  title="Light mode"
                >
                  <FiSun className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`p-2 rounded ${theme === 'dark' ? 'bg-slate-700' : 'hover:bg-slate-700/50'} transition-colors`}
                  title="Dark mode"
                >
                  <FiMoon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleThemeChange('system')}
                  className={`p-2 rounded ${theme === 'system' ? 'bg-slate-700' : 'hover:bg-slate-700/50'} transition-colors`}
                  title="System theme"
                >
                  <FiMonitor className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handlePaymentGateway}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
              >
                <FiCreditCard className="w-4 h-4 mr-2" />
                Payment Gateway
                <FiExternalLink className="w-3 h-3 ml-2" />
              </Button>

              <Button
                onClick={handleExportBlueprint}
                disabled={!hasHistory}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              >
                <FiDownload className="w-4 h-4 mr-2" />
                Export Blueprint
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 via-slate-900/50 to-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <FiZap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">AI-Powered Digital Clone Defense</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Design, Validate, and Build
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {heroText}
                <span className="animate-pulse">|</span>
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              A collaborative multi-agent RAG system that designs your startup from zero to scalable product.
              Consult 7 specialized AI agents for strategic vision, product architecture, and market strategy.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
                <FiActivity className="w-5 h-5 text-green-400" />
                <span className="text-sm">7 Active Agents</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
                <SiOpenai className="w-5 h-5 text-purple-400" />
                <span className="text-sm">GPT-4o Powered</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg px-4 py-2">
                <FiStar className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">Real-time RAG</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investor Metrics Dashboard */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-4">
                <FiTrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">Investor Dashboard</span>
              </div>
              <h3 className="text-3xl font-bold mb-3">Market Opportunity & Investment Metrics</h3>
              <p className="text-slate-400 max-w-2xl mx-auto">Real-time insights into the deepfake detection market and VEMAR.AI's competitive position</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {/* TAM */}
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FiTarget className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">TAM</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-300 mb-1">$12.8B</p>
                  <p className="text-xs text-slate-500">Total Addressable Market by 2028</p>
                </CardContent>
              </Card>

              {/* Market Growth */}
              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FiTrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Growth Rate</span>
                  </div>
                  <p className="text-3xl font-bold text-green-300 mb-1">38.7%</p>
                  <p className="text-xs text-slate-500">Compound Annual Growth Rate</p>
                </CardContent>
              </Card>

              {/* Investment Round */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FiDollarSign className="w-5 h-5 text-purple-400" />
                    </div>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Target Raise</span>
                  </div>
                  <p className="text-3xl font-bold text-purple-300 mb-1">$8M</p>
                  <p className="text-xs text-slate-500">Series A Round</p>
                </CardContent>
              </Card>

              {/* Risk Score */}
              <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      <FiShield className="w-5 h-5 text-yellow-400" />
                    </div>
                    <span className="text-xs text-slate-400 uppercase tracking-wide">Risk Profile</span>
                  </div>
                  <p className="text-3xl font-bold text-yellow-300 mb-1">Low</p>
                  <p className="text-xs text-slate-500">Enterprise-grade security</p>
                </CardContent>
              </Card>
            </div>

            {/* Competitive Advantages */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-500/20 rounded-lg">
                      <FiCpu className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="font-semibold text-slate-200">AI Moat</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Proprietary deepfake detection models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>99.2% accuracy rate vs industry 94%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Real-time processing under 200ms</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                      <FiDatabase className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="font-semibold text-slate-200">Data Network Effects</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>150M+ analyzed media samples</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Continuous learning from threats</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Cross-client threat intelligence</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <FiLock className="w-5 h-5 text-green-400" />
                    </div>
                    <h4 className="font-semibold text-slate-200">Compliance Edge</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>SOC-2 Type II certified</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>GDPR & DPDP compliant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>ISO-27001 roadmap Q2 2026</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Deepfake Detection Upload Section */}
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-3">Verify Media Authenticity</h3>
              <p className="text-slate-400">Upload any video, audio, or image for instant deepfake detection</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Area */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-900/80 transition-all group"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="p-4 bg-blue-500/10 rounded-full mb-4 group-hover:bg-blue-500/20 transition-colors">
                          <FiUpload className="w-10 h-10 text-blue-400" />
                        </div>
                        <p className="mb-2 text-sm text-slate-300">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500">Video, Audio, or Image files</p>
                        <div className="flex gap-4 mt-4">
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <FiVideo className="w-4 h-4" />
                            Video
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <FiMusic className="w-4 h-4" />
                            Audio
                          </div>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <FiImage className="w-4 h-4" />
                            Image
                          </div>
                        </div>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept="image/*,video/*,audio/*"
                        onChange={handleFileUpload}
                      />
                    </label>

                    {uploadedFile && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                          <FiCheckCircle className="w-5 h-5 text-green-400" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-300 truncate">{uploadedFile.name}</p>
                            <p className="text-xs text-slate-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>

                        {uploadProgress > 0 && uploadProgress < 100 && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs text-slate-400">
                              <span>Uploading...</span>
                              <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 transition-all duration-300 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {isScanning && (
                          <div className="flex items-center justify-center gap-3 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <FiLoader className="w-5 h-5 text-blue-400 animate-spin" />
                            <span className="text-sm text-blue-300">Analyzing with neural networks...</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Detection Workflow & Results */}
              <div className="space-y-4">
                {/* Workflow Steps */}
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <FiSearch className="w-5 h-5 text-purple-400" />
                      Detection Pipeline
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${uploadedFile ? 'bg-green-500/20' : 'bg-slate-700/50'}`}>
                          <FiUpload className={`w-5 h-5 ${uploadedFile ? 'text-green-400' : 'text-slate-500'}`} />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-slate-300">Upload Content</h5>
                          <p className="text-xs text-slate-500">Upload any video, audio, or image for analysis</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${isScanning ? 'bg-blue-500/20' : 'bg-slate-700/50'}`}>
                          <FiCpu className={`w-5 h-5 ${isScanning ? 'text-blue-400' : 'text-slate-500'}`} />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-slate-300">AI Deep Scan</h5>
                          <p className="text-xs text-slate-500">Our neural networks analyze for manipulation signatures</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${scanResult && !isScanning ? 'bg-purple-500/20' : 'bg-slate-700/50'}`}>
                          <FiEye className={`w-5 h-5 ${scanResult && !isScanning ? 'text-purple-400' : 'text-slate-500'}`} />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-slate-300">Pattern Detection</h5>
                          <p className="text-xs text-slate-500">Identify deepfake artifacts and synthetic markers</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${scanResult && !isScanning ? 'bg-green-500/20' : 'bg-slate-700/50'}`}>
                          <FiShield className={`w-5 h-5 ${scanResult && !isScanning ? 'text-green-400' : 'text-slate-500'}`} />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-slate-300">Verified Result</h5>
                          <p className="text-xs text-slate-500">Get instant authenticity verification</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Scan Results */}
                {scanResult && !isScanning && (
                  <Card className={`border-2 ${
                    scanResult.status === 'authentic'
                      ? 'bg-green-500/5 border-green-500/30'
                      : scanResult.status === 'manipulated'
                      ? 'bg-red-500/5 border-red-500/30'
                      : 'bg-yellow-500/5 border-yellow-500/30'
                  }`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {scanResult.status === 'authentic' ? (
                            <FiCheckCircle className="w-8 h-8 text-green-400" />
                          ) : scanResult.status === 'manipulated' ? (
                            <FiAlertCircle className="w-8 h-8 text-red-400" />
                          ) : (
                            <FiAlertCircle className="w-8 h-8 text-yellow-400" />
                          )}
                          <div>
                            <h4 className={`text-lg font-bold ${
                              scanResult.status === 'authentic'
                                ? 'text-green-300'
                                : scanResult.status === 'manipulated'
                                ? 'text-red-300'
                                : 'text-yellow-300'
                            }`}>
                              {scanResult.status === 'authentic'
                                ? 'Authentic Content'
                                : scanResult.status === 'manipulated'
                                ? 'Deepfake Detected'
                                : 'Suspicious Content'}
                            </h4>
                            <p className="text-sm text-slate-400">Confidence: {scanResult.confidence}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-sm font-semibold text-slate-300 mb-3">Analysis Details:</h5>
                        {scanResult.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mt-1.5"></div>
                            <span className="text-slate-400">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Agent Tabs */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {agents.map((agent, index) => {
              const Icon = agent.icon
              const isActive = activeAgent === index
              const hasData = agentHistory[index]

              return (
                <button
                  key={agent.id}
                  onClick={() => setActiveAgent(index)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-xl border transition-all ${
                    isActive
                      ? `bg-gradient-to-br ${agent.bgGradient} border-slate-700 shadow-lg scale-105`
                      : 'bg-slate-800/30 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                  }`}
                >
                  {hasData && (
                    <div className="absolute top-2 right-2">
                      <FiCheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                  )}

                  <div className={`p-2 rounded-lg bg-gradient-to-br ${agent.gradient} ${isActive ? 'shadow-lg' : 'opacity-70 group-hover:opacity-100'}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  <div className="text-left">
                    <div className="font-semibold text-sm">{agent.shortName}</div>
                    <div className="text-xs text-slate-400 flex gap-1 flex-wrap mt-1">
                      {agent.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="bg-slate-700/50 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input & Controls */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${currentAgent.gradient}`}>
                    <currentAgent.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{currentAgent.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {currentAgent.description}
                    </CardDescription>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {currentAgent.tags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Your Query
                  </label>
                  <Textarea
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={currentAgent.defaultQuery}
                    className="min-h-[120px] bg-slate-900/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-slate-500">
                    <span>Leave empty to use default query</span>
                    <span>{query.length} characters</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={handleConsultAgent}
                    disabled={loading}
                    className={`flex-1 bg-gradient-to-r ${currentAgent.gradient} hover:opacity-90 text-white border-0 h-11`}
                  >
                    {loading ? (
                      <>
                        <FiLoader className="w-4 h-4 mr-2 animate-spin" />
                        Consulting Agent...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4 mr-2" />
                        Consult Agent
                      </>
                    )}
                  </Button>

                  {response && (
                    <Button
                      onClick={handleExportJSON}
                      variant="outline"
                      className="bg-slate-700/50 border-slate-600 hover:bg-slate-700"
                    >
                      <FiDownload className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {guardrailWarning && (
                  <div className="flex items-start gap-2 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <FiShield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-yellow-300 mb-1">AI Guardrail Protection</p>
                      <span className="text-sm text-yellow-200">{guardrailWarning}</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <FiAlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <span className="text-sm text-red-300">{error}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FiZap className="w-5 h-5 text-yellow-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuickAction('pitch-deck')}
                  disabled={loading}
                  className="flex items-center gap-2 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiFileText className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Pitch Deck</span>
                </button>
                <button
                  onClick={() => handleQuickAction('tech-stack')}
                  disabled={loading}
                  className="flex items-center gap-2 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiLayers className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Tech Stack</span>
                </button>
                <button
                  onClick={() => handleQuickAction('roadmap')}
                  disabled={loading}
                  className="flex items-center gap-2 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiTrendingUp className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Roadmap</span>
                </button>
                <button
                  onClick={() => handleQuickAction('business-plan')}
                  disabled={loading}
                  className="flex items-center gap-2 p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/50 hover:border-slate-500 transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiBriefcase className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Business Plan</span>
                </button>
              </CardContent>
            </Card>

            {/* Agent Collaboration */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FiActivity className="w-5 h-5 text-green-400" />
                  Agent Collaboration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {agents.map((agent, idx) => {
                    const Icon = agent.icon
                    const hasResponse = agentHistory[idx]
                    const isActive = activeAgent === idx
                    return (
                      <button
                        key={agent.id}
                        onClick={() => {
                          setActiveAgent(idx)
                          if (hasResponse) {
                            setResponse(agentHistory[idx])
                          } else {
                            setResponse(null)
                          }
                          setQuery('')
                          setError(null)
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                          isActive
                            ? `bg-gradient-to-r ${agent.bgGradient} border border-slate-600 shadow-md`
                            : hasResponse
                            ? 'bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 hover:border-green-500/30'
                            : 'bg-slate-700/20 hover:bg-slate-700/40 border border-transparent hover:border-slate-600'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : hasResponse ? 'text-green-400' : 'text-slate-500'}`} />
                        <span className={`text-sm flex-1 text-left ${isActive ? 'text-white font-medium' : 'text-slate-300'}`}>
                          {agent.shortName}
                        </span>
                        {hasResponse ? (
                          <FiCheckCircle className={`w-4 h-4 ${isActive ? 'text-white' : 'text-green-400'}`} />
                        ) : (
                          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-slate-600'}`}></div>
                        )}
                      </button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Response Display */}
          <div className="space-y-6">
            {loading && (
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="py-12">
                  <div className="flex flex-col items-center justify-center gap-4">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${currentAgent.gradient} rounded-full blur-xl opacity-50 animate-pulse`}></div>
                      <div className={`relative bg-gradient-to-r ${currentAgent.gradient} rounded-full p-4`}>
                        <FiLoader className="w-8 h-8 text-white animate-spin" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold mb-1">Consulting {currentAgent.name}...</p>
                      <p className="text-sm text-slate-400">Retrieving insights from AI models</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {response && !loading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <FiCheckCircle className="w-5 h-5 text-green-400" />
                    Agent Response
                  </h3>
                  <button
                    onClick={() => setShowFullResponse(!showFullResponse)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-300"
                  >
                    <FiMaximize2 className="w-4 h-4" />
                    {showFullResponse ? 'Collapse' : 'Expand'}
                  </button>
                </div>

                <div className={showFullResponse ? '' : 'max-h-[600px] overflow-y-auto'}>
                  {renderResponse(response, activeAgent)}
                </div>
              </div>
            )}

            {!response && !loading && (
              <Card className="bg-slate-800/50 border-slate-700 border-dashed">
                <CardContent className="py-12">
                  <div className="text-center space-y-4">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${currentAgent.gradient} opacity-20`}>
                      <currentAgent.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-slate-400 mb-2">No response yet</p>
                      <p className="text-sm text-slate-500">
                        Click "Consult Agent" to get insights from {currentAgent.name}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <FiShield className="w-4 h-4 text-blue-400" />
                VEMAR.AI
              </h4>
              <p className="text-sm text-slate-400">
                AI-powered Digital Clone Defense & Identity Protection platform.
                Defending against deepfakes and synthetic identity fraud.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Technology Stack</h4>
              <div className="flex gap-3">
                <SiOpenai className="w-6 h-6 text-slate-400 hover:text-purple-400 transition-colors" title="OpenAI GPT-4o" />
                <SiReact className="w-6 h-6 text-slate-400 hover:text-cyan-400 transition-colors" title="React" />
                <SiTypescript className="w-6 h-6 text-slate-400 hover:text-blue-400 transition-colors" title="TypeScript" />
                <SiDocker className="w-6 h-6 text-slate-400 hover:text-blue-500 transition-colors" title="Docker" />
                <SiKubernetes className="w-6 h-6 text-slate-400 hover:text-blue-600 transition-colors" title="Kubernetes" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">System Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-slate-400">All agents operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-slate-400">API status: healthy</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            Built by Architect at Lyzr - Multi-Agent Venture Studio Platform
          </div>
        </div>
      </footer>
    </div>
  )
}

// Response Renderer Components
function FounderCEORenderer({ data }: { data: FounderCEOResponse }) {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-300">
            <FiTarget className="w-5 h-5" />
            Value Proposition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-slate-200">{data.value_proposition}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-base text-slate-300">Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">{data.mission}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-base text-slate-300">Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-400">{data.vision}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Market Positioning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">{data.positioning}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300 flex items-center gap-2">
            <FiActivity className="w-4 h-4" />
            North Star Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.north_star_metrics?.map((metric, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <FiCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">{metric}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300 flex items-center gap-2">
            <FiShield className="w-4 h-4" />
            Competitive Moat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">{data.moat_strategy}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function ProductArchitectRenderer({ data }: { data: ProductArchitectResponse }) {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-300">
            <FiGrid className="w-5 h-5" />
            System Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300">{data.system_architecture}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Core Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {data.core_modules?.map((module, idx) => (
              <div key={idx} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <h4 className="font-semibold text-slate-200 mb-2 flex items-center gap-2">
                  <FiLayers className="w-4 h-4 text-blue-400" />
                  {module.name}
                </h4>
                <p className="text-sm text-slate-400 mb-2">{module.description}</p>
                <div className="flex items-center gap-2 text-xs">
                  <SiPython className="w-3 h-3 text-slate-500" />
                  <span className="text-slate-500">{module.tech_stack}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">MVP Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.mvp_features?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <FiCheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">V1 Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.v1_features?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <FiCheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">V2 Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.v2_features?.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <FiCheckCircle className="w-3 h-3 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-400">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">API Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-400">{data.api_strategy}</p>
        </CardContent>
      </Card>
    </div>
  )
}

function AIMLRenderer({ data }: { data: AIMLResponse }) {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-300">
            <FiCpu className="w-5 h-5" />
            Deepfake Detection Model
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-slate-500">Architecture</span>
              <p className="text-slate-300">{data.deepfake_model?.architecture}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Backbone</span>
              <p className="text-slate-300">{data.deepfake_model?.backbone}</p>
            </div>
          </div>
          <div>
            <span className="text-xs text-slate-500">Training Data</span>
            <p className="text-slate-300">{data.deepfake_model?.training_data}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">Behavioral Biometrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-xs text-slate-500">Architecture</span>
              <p className="text-sm text-slate-300">{data.behavioral_biometrics_model?.architecture}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Features</span>
              <ul className="space-y-1 mt-2">
                {data.behavioral_biometrics_model?.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1 h-1 rounded-full bg-green-400"></div>
                    <span className="text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">Liveness Detection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <span className="text-xs text-slate-500">Architecture</span>
              <p className="text-sm text-slate-300">{data.liveness_model?.architecture}</p>
            </div>
            <div>
              <span className="text-xs text-slate-500">Challenge Types</span>
              <ul className="space-y-1 mt-2">
                {data.liveness_model?.challenge_types?.map((type, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm">
                    <div className="w-1 h-1 rounded-full bg-blue-400"></div>
                    <span className="text-slate-400">{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Evaluation Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              {data.evaluation_metrics?.map((metric, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-400">{metric}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <span className="text-xs text-blue-300">Latency Target</span>
                <p className="text-lg font-semibold text-blue-200">{data.latency_target}</p>
              </div>
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <span className="text-xs text-green-300">Accuracy Target</span>
                <p className="text-lg font-semibold text-green-200">{data.accuracy_target}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function RAGRenderer({ data }: { data: RAGResponse }) {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-300">
            <FiDatabase className="w-5 h-5" />
            Vector Database Schema
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {data.vector_db_schema?.collections?.map((collection, idx) => (
              <div key={idx} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-200">{collection.name}</h4>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    {collection.dimensions}D
                  </span>
                </div>
                <p className="text-sm text-slate-400">{collection.embedding_type}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Knowledge Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.knowledge_sources?.map((source, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <FiCheckCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-400">{source}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">RAG Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <FiDatabase className="w-5 h-5 text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-300 mb-1">Retrieve</h4>
                <p className="text-sm text-slate-400">{data.rag_workflow?.retrieve}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <FiCpu className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-300 mb-1">Reason</h4>
                <p className="text-sm text-slate-400">{data.rag_workflow?.reason}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <FiZap className="w-5 h-5 text-green-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-300 mb-1">Act</h4>
                <p className="text-sm text-slate-400">{data.rag_workflow?.act}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">Explainability</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">{data.explainability_approach}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">Identity Memory</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">{data.identity_memory_design}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SecurityRenderer({ data }: { data: SecurityResponse }) {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-300">
            <FiLock className="w-5 h-5" />
            Security Architecture
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300">{data.security_architecture}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Compliance Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.compliance_roadmap?.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-200">{item.standard}</h4>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                    {item.timeline}
                  </span>
                </div>
                <ul className="space-y-1">
                  {item.key_controls?.map((control, cidx) => (
                    <li key={cidx} className="flex items-start gap-2 text-sm">
                      <FiCheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-400">{control}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Threat Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.threat_model?.map((item, idx) => (
              <div key={idx} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <FiAlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <h4 className="font-semibold text-red-300">{item.threat}</h4>
                </div>
                <p className="text-sm text-slate-400 ml-6">{item.mitigation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">Data Retention</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">{data.data_retention_policy}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">Privacy Techniques</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.privacy_techniques?.map((technique, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <FiShield className="w-3 h-3 text-blue-400" />
                  <span className="text-slate-400">{technique}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function GTMRenderer({ data }: { data: GTMResponse }) {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border-indigo-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-300">
            <FiTarget className="w-5 h-5" />
            Ideal Customer Profiles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {data.icps?.map((icp, idx) => (
              <div key={idx} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-200">{icp.segment}</h4>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    {icp.budget_range}
                  </span>
                </div>
                <ul className="space-y-1">
                  {icp.pain_points?.map((pain, pidx) => (
                    <li key={pidx} className="flex items-start gap-2 text-sm">
                      <FiAlertCircle className="w-3 h-3 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-400">{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Buyer Personas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {data.buyer_personas?.map((persona, idx) => (
              <div key={idx} className="p-3 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <h4 className="font-semibold text-slate-200 mb-2">{persona.title}</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-slate-500">Goals:</span>
                    <p className="text-slate-400">{persona.goals}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Objections:</span>
                    <p className="text-slate-400">{persona.objections}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Pricing Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {data.pricing_tiers?.map((tier, idx) => (
              <div key={idx} className="p-4 bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-slate-600/50 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-200">{tier.tier}</h4>
                  <span className="text-lg font-bold text-green-400">{tier.price}</span>
                </div>
                <ul className="space-y-1">
                  {tier.features?.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-sm">
                      <FiCheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-400">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">0-to-1 Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-400">{data.zero_to_one_strategy}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.channels?.map((channel, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <FiTrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-slate-400">{channel}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function InvestorRenderer({ data }: { data: InvestorResponse }) {
  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-300">
            <FiDollarSign className="w-5 h-5" />
            Investor Narrative
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed">{data.investor_narrative}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Market Sizing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <span className="text-xs text-blue-300">TAM</span>
              <p className="text-2xl font-bold text-blue-200 mt-1">{data.tam_sam_som?.tam}</p>
              <p className="text-xs text-slate-500 mt-1">Total Addressable Market</p>
            </div>
            <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <span className="text-xs text-purple-300">SAM</span>
              <p className="text-2xl font-bold text-purple-200 mt-1">{data.tam_sam_som?.sam}</p>
              <p className="text-xs text-slate-500 mt-1">Serviceable Available Market</p>
            </div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <span className="text-xs text-green-300">SOM</span>
              <p className="text-2xl font-bold text-green-200 mt-1">{data.tam_sam_som?.som}</p>
              <p className="text-xs text-slate-500 mt-1">Serviceable Obtainable Market</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-base text-slate-300">Funding Rounds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.funding_rounds?.map((round, idx) => (
              <div key={idx} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-slate-200">{round.round}</h4>
                  <span className="text-xl font-bold text-green-400">{round.amount}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Use of Funds:</span>
                  <ul className="space-y-1 mt-2">
                    {round.use_of_funds?.map((use, uidx) => (
                      <li key={uidx} className="flex items-start gap-2 text-sm">
                        <FiCheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-400">{use}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.key_metrics?.map((metric, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <FiActivity className="w-3 h-3 text-green-400" />
                  <span className="text-slate-400">{metric}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-sm text-slate-300">Pitch Deck Outline</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.pitch_deck_outline?.map((slide, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 flex items-center justify-center bg-blue-500/20 text-blue-400 rounded text-xs font-semibold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-400">{slide}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
