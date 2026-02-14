'use client'

import { useState } from 'react'
import { FiPlay, FiPause, FiMaximize, FiVolume2, FiCheckCircle, FiCode, FiZap, FiCpu, FiUsers, FiBarChart2, FiLayers } from 'react-icons/fi'
import Link from 'next/link'

export default function DemoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)

  const demoSections = [
    {
      title: 'Platform Overview',
      duration: '0:00 - 0:45',
      description: 'Introduction to VEMAR.AI and its core capabilities',
      icon: FiLayers,
    },
    {
      title: 'AI Agent Creation',
      duration: '0:45 - 2:15',
      description: 'Watch how to create custom AI agents in minutes',
      icon: FiCpu,
    },
    {
      title: 'Workflow Automation',
      duration: '2:15 - 3:30',
      description: 'See automated workflows in action',
      icon: FiZap,
    },
    {
      title: 'Integration Demo',
      duration: '3:30 - 4:45',
      description: 'Connect with your favorite tools and APIs',
      icon: FiCode,
    },
    {
      title: 'Analytics Dashboard',
      duration: '4:45 - 5:30',
      description: 'Real-time insights and performance metrics',
      icon: FiBarChart2,
    },
    {
      title: 'Team Collaboration',
      duration: '5:30 - 6:00',
      description: 'How teams work together on VEMAR.AI',
      icon: FiUsers,
    },
  ]

  const features = [
    {
      title: 'No-Code Agent Builder',
      description: 'Create powerful AI agents without writing a single line of code',
      icon: FiCpu,
      color: 'blue',
    },
    {
      title: 'Pre-Built Templates',
      description: 'Start with 50+ ready-to-use agent templates for common use cases',
      icon: FiLayers,
      color: 'purple',
    },
    {
      title: 'Real-Time Analytics',
      description: 'Monitor agent performance with detailed metrics and insights',
      icon: FiBarChart2,
      color: 'green',
    },
    {
      title: 'API Integrations',
      description: 'Connect with 100+ tools and services seamlessly',
      icon: FiCode,
      color: 'orange',
    },
  ]

  const stats = [
    { label: 'Active Users', value: '10,000+', change: '+32%' },
    { label: 'Agents Created', value: '50,000+', change: '+127%' },
    { label: 'API Calls/Day', value: '2M+', change: '+89%' },
    { label: 'Uptime', value: '99.9%', change: 'Last 30 days' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 border-b border-blue-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <FiPlay className="w-4 h-4 text-blue-300" />
              <span className="text-sm font-semibold text-blue-200">Product Demo</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              See VEMAR.AI in Action
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Watch how VEMAR.AI transforms the way you build, deploy, and manage AI agents.
              From creation to production in minutes.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Video Player Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
            {/* Video Container */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900">
              {/* Placeholder Video Area */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-30 animate-pulse"></div>
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-full p-8 shadow-2xl transition-all transform hover:scale-110"
                    >
                      {isPlaying ? (
                        <FiPause className="w-12 h-12" />
                      ) : (
                        <FiPlay className="w-12 h-12 ml-1" />
                      )}
                    </button>
                  </div>
                  <p className="text-slate-400 mt-6 text-lg">6:00 Product Demonstration</p>
                </div>
              </div>

              {/* Video Overlay UI */}
              {isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      <FiPause className="w-6 h-6" />
                    </button>
                    <div className="flex-1 h-1 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-1/3"></div>
                    </div>
                    <span className="text-white text-sm font-mono">2:15 / 6:00</span>
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <FiVolume2 className="w-6 h-6" />
                    </button>
                    <button className="text-white hover:text-blue-400 transition-colors">
                      <FiMaximize className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Demo Sections Timeline */}
            <div className="p-6 bg-slate-900 border-t border-slate-700">
              <h3 className="text-lg font-bold text-white mb-4">Demo Sections</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {demoSections.map((section, index) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentSection(index)}
                      className={`text-left p-4 rounded-lg transition-all border ${
                        currentSection === index
                          ? 'bg-blue-500/20 border-blue-500/50'
                          : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            currentSection === index
                              ? 'bg-blue-500/30 text-blue-300'
                              : 'bg-slate-700 text-slate-400'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-white mb-1">{section.title}</h4>
                          <p className="text-xs text-slate-400 mb-2">{section.duration}</p>
                          <p className="text-sm text-slate-300">{section.description}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Trusted by Thousands of Teams
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 text-sm mb-2">{stat.label}</div>
                <div className="text-green-400 text-xs font-semibold">{stat.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What You'll See in the Demo
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            This comprehensive demo covers everything from basic agent creation to advanced
            workflow automation and team collaboration.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-8 border border-slate-700 hover:border-slate-600 transition-all"
                >
                  <div className={`inline-flex p-3 rounded-lg bg-${feature.color}-500/20 mb-4`}>
                    <Icon className={`w-8 h-8 text-${feature.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Demo Highlights */}
        <div className="mb-16">
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-8 border border-blue-500/30">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              What You'll Learn
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                'How to create your first AI agent in under 3 minutes',
                'Best practices for agent configuration and optimization',
                'Setting up automated workflows and triggers',
                'Integrating with third-party APIs and services',
                'Monitoring performance with real-time analytics',
                'Scaling your agents for production workloads',
                'Team collaboration and permission management',
                'Advanced features like custom functions and webhooks',
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FiCheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using VEMAR.AI to build powerful AI agents.
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/submit-request"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all shadow-lg transform hover:scale-105 flex items-center gap-2"
            >
              <FiZap className="w-5 h-5" />
              Start Free Trial
            </Link>
            <Link
              href="/pricing"
              className="bg-blue-800/50 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-800 transition-all border border-blue-400/30 flex items-center gap-2"
            >
              <FiBarChart2 className="w-5 h-5" />
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
