'use client'

import { useState } from 'react'
import { callAIAgent } from '@/lib/aiAgent'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Loader2, Shield, Lightbulb, Brain, Database, Lock, TrendingUp, DollarSign, Download, FileText, Code, CheckCircle, AlertCircle } from 'lucide-react'

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

interface FundingRound {
  round: string
  amount: string
  use_of_funds: string[]
}

interface TAMSAMSOMData {
  tam: string
  sam: string
  som: string
}

interface InvestorResponse {
  investor_narrative: string
  tam_sam_som: TAMSAMSOMData
  funding_rounds: FundingRound[]
  key_metrics: string[]
  pitch_deck_outline: string[]
}

interface AgentConfig {
  id: string
  name: string
  icon: any
  color: string
  description: string
  defaultQuery: string
}

const AGENT_CONFIGS: AgentConfig[] = [
  {
    id: '6985a1bbb37fff3a03c07c44',
    name: 'Founder/CEO',
    icon: Lightbulb,
    color: 'from-purple-500 to-pink-500',
    description: 'Strategic Vision & Market Positioning',
    defaultQuery: 'Define VEMAR.AI\'s complete strategic vision, mission, value proposition, and competitive moat for defending against deepfakes and synthetic identity fraud in the enterprise market.'
  },
  {
    id: '6985a1d176d4fd436bf4b7bd',
    name: 'Product Architect',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    description: 'System Design & Architecture',
    defaultQuery: 'Design the complete product architecture for VEMAR.AI including deepfake detection engine, behavioral biometrics, identity graphs, and API strategy from MVP to V2.'
  },
  {
    id: '6985a1fb301c62c7ca2c7daf',
    name: 'AI/ML Research',
    icon: Brain,
    color: 'from-green-500 to-emerald-500',
    description: 'Model Architecture & Evaluation',
    defaultQuery: 'Design the ML model architectures for deepfake detection, behavioral biometrics, and liveness detection with specific datasets, evaluation metrics, and latency targets.'
  },
  {
    id: '6985a21376d4fd436bf4b7c1',
    name: 'RAG & Knowledge',
    icon: Database,
    color: 'from-yellow-500 to-orange-500',
    description: 'Data Systems & Knowledge Management',
    defaultQuery: 'Design the vector database schema, knowledge ingestion pipeline, and RAG workflow for fraud pattern memory and identity graphs in VEMAR.AI.'
  },
  {
    id: '6985a22af7f7d3ffa5d8664c',
    name: 'Security & Compliance',
    icon: Lock,
    color: 'from-red-500 to-rose-500',
    description: 'Trust, Safety & Compliance',
    defaultQuery: 'Create comprehensive security architecture and compliance roadmap covering GDPR, DPDP, SOC-2, ISO-27001, threat modeling, and data retention policies.'
  },
  {
    id: '6985a2455eb49186d63e5dc9',
    name: 'GTM & Growth',
    icon: TrendingUp,
    color: 'from-indigo-500 to-purple-500',
    description: 'Market Strategy & Growth',
    defaultQuery: 'Define ideal customer profiles, buyer personas, pricing tiers (API/SaaS/Enterprise/Government), and 0-to-1 acquisition strategy for VEMAR.AI.'
  },
  {
    id: '6985a25f8ce1fc653cfdee55',
    name: 'Investor/Fundraising',
    icon: DollarSign,
    color: 'from-teal-500 to-cyan-500',
    description: 'Capital Strategy & Metrics',
    defaultQuery: 'Create investor narrative, TAM/SAM/SOM calculations, funding roadmap, key metrics, and pitch deck outline for VEMAR.AI fundraising.'
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [query, setQuery] = useState(AGENT_CONFIGS[0].defaultQuery)
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleTabChange = (index: number) => {
    setActiveTab(index)
    setQuery(AGENT_CONFIGS[index].defaultQuery)
    setResponse(null)
    setError(null)
  }

  const handleConsultAgent = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    const agentId = AGENT_CONFIGS[activeTab].id
    const result = await callAIAgent(query, agentId)

    setLoading(false)

    if (result.success && result.response.status === 'success') {
      setResponse(result.response.result)
    } else {
      setError(result.error || 'Failed to get response from agent')
    }
  }

  const exportAsJSON = () => {
    if (!response) return

    const data = {
      agent: AGENT_CONFIGS[activeTab].name,
      query,
      response,
      timestamp: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vemar-${AGENT_CONFIGS[activeTab].name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const exportBlueprint = () => {
    const blueprint = {
      company: 'VEMAR.AI',
      tagline: 'AI-Native Defense Against Deepfakes & Synthetic Identity Fraud',
      generated: new Date().toISOString(),
      agents: AGENT_CONFIGS.map(agent => agent.name),
      note: 'Complete venture studio blueprint - consult each agent for detailed insights'
    }

    const blob = new Blob([JSON.stringify(blueprint, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vemar-ai-complete-blueprint-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderFounderCEOResponse = (data: FounderCEOResponse) => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">Value Proposition</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{data.value_proposition}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{data.mission}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{data.vision}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-green-400">Market Positioning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{data.positioning}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-yellow-400">North Star Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {data.north_star_metrics.map((metric, idx) => (
              <li key={idx} className="flex items-start gap-2 text-gray-300">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{metric}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400">Competitive Moat Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{data.moat_strategy}</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderProductArchitectResponse = (data: ProductArchitectResponse) => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400">System Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 whitespace-pre-wrap">{data.system_architecture}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-purple-400">Core Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {data.core_modules.map((module, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-white mb-2">{module.name}</h4>
                <p className="text-gray-400 text-sm mb-2">{module.description}</p>
                <div className="flex items-center gap-2 text-xs text-blue-400">
                  <Code className="w-4 h-4" />
                  <span>{module.tech_stack}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-green-400 text-lg">MVP Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.mvp_features.map((feature, idx) => (
                <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-yellow-400 text-lg">V1 Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.v1_features.map((feature, idx) => (
                <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-orange-400 text-lg">V2 Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.v2_features.map((feature, idx) => (
                <li key={idx} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-cyan-400">API Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">{data.api_strategy}</p>
        </CardContent>
      </Card>
    </div>
  )

  const renderAIMLResponse = (data: AIMLResponse) => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 text-lg">Deepfake Detection Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 uppercase">Architecture</p>
              <p className="text-gray-300">{data.deepfake_model.architecture}</p>
            </div>
            {data.deepfake_model.backbone && (
              <div>
                <p className="text-xs text-gray-500 uppercase">Backbone</p>
                <p className="text-gray-300">{data.deepfake_model.backbone}</p>
              </div>
            )}
            {data.deepfake_model.training_data && (
              <div>
                <p className="text-xs text-gray-500 uppercase">Training Data</p>
                <p className="text-gray-300">{data.deepfake_model.training_data}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-blue-400 text-lg">Behavioral Biometrics Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 uppercase">Architecture</p>
              <p className="text-gray-300">{data.behavioral_biometrics_model.architecture}</p>
            </div>
            {data.behavioral_biometrics_model.features && (
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Features</p>
                <ul className="space-y-1">
                  {data.behavioral_biometrics_model.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400 text-lg">Liveness Detection Model</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 uppercase">Architecture</p>
              <p className="text-gray-300">{data.liveness_model.architecture}</p>
            </div>
            {data.liveness_model.challenge_types && (
              <div>
                <p className="text-xs text-gray-500 uppercase mb-2">Challenge Types</p>
                <ul className="space-y-1">
                  {data.liveness_model.challenge_types.map((type, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-purple-500" />
                      {type}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Evaluation Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.evaluation_metrics.map((metric, idx) => (
                <li key={idx} className="text-gray-300 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  {metric}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Performance Targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-xs text-gray-500 uppercase">Latency Target</p>
              <p className="text-gray-300 text-lg font-semibold">{data.latency_target}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase">Accuracy Target</p>
              <p className="text-gray-300 text-lg font-semibold">{data.accuracy_target}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderRAGResponse = (data: RAGResponse) => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">Vector Database Schema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {data.vector_db_schema.collections.map((collection, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-white mb-2">{collection.name}</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-400">Type: <span className="text-yellow-400">{collection.embedding_type}</span></p>
                  <p className="text-gray-400">Dimensions: <span className="text-yellow-400">{collection.dimensions}</span></p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-blue-400">Knowledge Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {data.knowledge_sources.map((source, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <Database className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">{source}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">RAG Workflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-green-400 mb-2">1. Retrieve</h4>
            <p className="text-gray-300 text-sm">{data.rag_workflow.retrieve}</p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-yellow-400 mb-2">2. Reason</h4>
            <p className="text-gray-300 text-sm">{data.rag_workflow.reason}</p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
            <h4 className="font-semibold text-orange-400 mb-2">3. Act</h4>
            <p className="text-gray-300 text-sm">{data.rag_workflow.act}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Explainability Approach</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{data.explainability_approach}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-pink-400">Identity Memory Design</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{data.identity_memory_design}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderSecurityResponse = (data: SecurityResponse) => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-red-900/20 to-rose-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400">Security Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 whitespace-pre-wrap">{data.security_architecture}</p>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-green-400">Compliance Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {data.compliance_roadmap.map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{item.standard}</h4>
                  <span className="text-xs px-2 py-1 bg-green-900/50 text-green-400 rounded">{item.timeline}</span>
                </div>
                <ul className="space-y-1">
                  {item.key_controls.map((control, cidx) => (
                    <li key={cidx} className="text-gray-400 text-sm flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{control}</span>
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
          <CardTitle className="text-orange-400">Threat Model</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.threat_model.map((threat, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{threat.threat}</h4>
                    <p className="text-gray-400 text-sm">{threat.mitigation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Data Retention Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{data.data_retention_policy}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-purple-400">Privacy Techniques</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.privacy_techniques.map((technique, idx) => (
                <li key={idx} className="text-gray-300 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-500" />
                  {technique}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderGTMResponse = (data: GTMResponse) => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30">
        <CardHeader>
          <CardTitle className="text-indigo-400">Ideal Customer Profiles (ICPs)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {data.icps.map((icp, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{icp.segment}</h4>
                  <span className="text-xs px-2 py-1 bg-indigo-900/50 text-indigo-400 rounded">{icp.budget_range}</span>
                </div>
                <p className="text-xs text-gray-500 uppercase mb-2">Pain Points:</p>
                <ul className="space-y-1">
                  {icp.pain_points.map((pain, pidx) => (
                    <li key={pidx} className="text-gray-400 text-sm flex items-start gap-2">
                      <span className="text-red-500 mt-1">•</span>
                      <span>{pain}</span>
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
          <CardTitle className="text-blue-400">Buyer Personas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {data.buyer_personas.map((persona, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-white mb-3">{persona.title}</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Goals</p>
                    <p className="text-gray-300 text-sm">{persona.goals}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Objections</p>
                    <p className="text-gray-400 text-sm">{persona.objections}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">Pricing Tiers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            {data.pricing_tiers.map((tier, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <h4 className="font-semibold text-white mb-1">{tier.tier}</h4>
                <p className="text-green-400 text-lg font-bold mb-3">{tier.price}</p>
                <ul className="space-y-1">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx} className="text-gray-400 text-xs flex items-start gap-2">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">0-to-1 Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">{data.zero_to_one_strategy}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-cyan-400">Growth Channels</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.channels.map((channel, idx) => (
                <li key={idx} className="text-gray-300 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-cyan-500" />
                  {channel}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderInvestorResponse = (data: InvestorResponse) => (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-teal-900/20 to-cyan-900/20 border-teal-500/30">
        <CardHeader>
          <CardTitle className="text-teal-400">Investor Narrative</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-lg leading-relaxed">{data.investor_narrative}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">TAM / SAM / SOM</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-center">
              <p className="text-xs text-gray-500 uppercase mb-2">Total Addressable Market</p>
              <p className="text-purple-400 text-2xl font-bold">{data.tam_sam_som.tam}</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-center">
              <p className="text-xs text-gray-500 uppercase mb-2">Serviceable Addressable Market</p>
              <p className="text-blue-400 text-2xl font-bold">{data.tam_sam_som.sam}</p>
            </div>
            <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700 text-center">
              <p className="text-xs text-gray-500 uppercase mb-2">Serviceable Obtainable Market</p>
              <p className="text-green-400 text-2xl font-bold">{data.tam_sam_som.som}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-green-400">Funding Roadmap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.funding_rounds.map((round, idx) => (
              <div key={idx} className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white text-lg">{round.round}</h4>
                  <span className="text-green-400 text-xl font-bold">{round.amount}</span>
                </div>
                <p className="text-xs text-gray-500 uppercase mb-2">Use of Funds:</p>
                <ul className="space-y-1">
                  {round.use_of_funds.map((use, uidx) => (
                    <li key={uidx} className="text-gray-300 text-sm flex items-start gap-2">
                      <DollarSign className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.key_metrics.map((metric, idx) => (
                <li key={idx} className="text-gray-300 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-yellow-500" />
                  {metric}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-orange-400">Pitch Deck Outline</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2">
              {data.pitch_deck_outline.map((section, idx) => (
                <li key={idx} className="text-gray-300 flex items-center gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-orange-900/50 text-orange-400 rounded-full text-sm font-semibold">
                    {idx + 1}
                  </span>
                  {section}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const renderResponse = () => {
    if (!response) return null

    const agentName = AGENT_CONFIGS[activeTab].name

    switch (agentName) {
      case 'Founder/CEO':
        return renderFounderCEOResponse(response as FounderCEOResponse)
      case 'Product Architect':
        return renderProductArchitectResponse(response as ProductArchitectResponse)
      case 'AI/ML Research':
        return renderAIMLResponse(response as AIMLResponse)
      case 'RAG & Knowledge':
        return renderRAGResponse(response as RAGResponse)
      case 'Security & Compliance':
        return renderSecurityResponse(response as SecurityResponse)
      case 'GTM & Growth':
        return renderGTMResponse(response as GTMResponse)
      case 'Investor/Fundraising':
        return renderInvestorResponse(response as InvestorResponse)
      default:
        return <pre className="text-gray-300 text-sm">{JSON.stringify(response, null, 2)}</pre>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  VEMAR.AI
                </h1>
                <p className="text-gray-400 text-sm">Multi-Agent Venture Studio</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={exportBlueprint}
                variant="outline"
                className="border-slate-700 hover:bg-slate-800"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Blueprint
              </Button>
            </div>
          </div>

          {/* Agent Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {AGENT_CONFIGS.map((agent, idx) => {
              const Icon = agent.icon
              return (
                <button
                  key={agent.id}
                  onClick={() => handleTabChange(idx)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeTab === idx
                      ? `bg-gradient-to-r ${agent.color} text-white shadow-lg`
                      : 'bg-slate-800/50 text-gray-400 hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{agent.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Active Agent Info */}
        <Card className="bg-slate-900/50 border-slate-800 mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {(() => {
                  const Icon = AGENT_CONFIGS[activeTab].icon
                  return (
                    <div className={`p-3 bg-gradient-to-br ${AGENT_CONFIGS[activeTab].color} rounded-xl`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  )
                })()}
                <div>
                  <CardTitle className="text-white text-xl">{AGENT_CONFIGS[activeTab].name} Agent</CardTitle>
                  <CardDescription className="text-gray-400">{AGENT_CONFIGS[activeTab].description}</CardDescription>
                </div>
              </div>
              {response && (
                <Button
                  onClick={exportAsJSON}
                  variant="outline"
                  size="sm"
                  className="border-slate-700 hover:bg-slate-800"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-400 mb-2 block">
                  Query / Prompt
                </label>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter your query..."
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-500"
                />
              </div>
              <Button
                onClick={handleConsultAgent}
                disabled={loading || !query.trim()}
                className={`w-full bg-gradient-to-r ${AGENT_CONFIGS[activeTab].color} hover:opacity-90`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Consulting Agent...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Consult {AGENT_CONFIGS[activeTab].name} Agent
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <Card className="bg-red-900/20 border-red-500/30 mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">Error</h4>
                  <p className="text-gray-300 text-sm">{error}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Response Display */}
        {response && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Response received from {AGENT_CONFIGS[activeTab].name} Agent</span>
            </div>
            {renderResponse()}
          </div>
        )}

        {/* Empty State */}
        {!loading && !response && !error && (
          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="pt-12 pb-12 text-center">
              <div className={`inline-flex p-6 bg-gradient-to-br ${AGENT_CONFIGS[activeTab].color} rounded-2xl mb-4`}>
                {(() => {
                  const Icon = AGENT_CONFIGS[activeTab].icon
                  return <Icon className="w-12 h-12 text-white" />
                })()}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Ready to consult {AGENT_CONFIGS[activeTab].name} Agent
              </h3>
              <p className="text-gray-400 max-w-md mx-auto">
                Click the button above to get strategic insights for VEMAR.AI's {AGENT_CONFIGS[activeTab].description.toLowerCase()}.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 bg-slate-900/50 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span>VEMAR.AI Multi-Agent Venture Studio</span>
              <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
              <span>Powered by AI Agent Orchestration</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
