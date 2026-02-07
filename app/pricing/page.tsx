'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PricingChatbot } from '@/components/pricing-chatbot'
import {
  FiCheck,
  FiX,
  FiPlay,
  FiZap,
  FiTrendingUp,
  FiShield,
  FiServer,
  FiCode,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiLock,
  FiHeadphones,
  FiRefreshCw
} from 'react-icons/fi'

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly')

  const pricingTiers = [
    {
      name: 'API Access',
      description: 'Perfect for developers and small teams',
      monthlyPrice: 49,
      annualPrice: 490,
      color: 'from-blue-500 to-cyan-500',
      icon: FiCode,
      features: [
        { text: '10,000 API calls/month', included: true },
        { text: 'REST & GraphQL endpoints', included: true },
        { text: 'Real-time webhooks', included: true },
        { text: 'Rate limiting: 100 req/min', included: true },
        { text: 'API documentation access', included: true },
        { text: 'Email support', included: true },
        { text: 'Community forum access', included: true },
        { text: 'Single environment', included: true },
        { text: 'Advanced analytics', included: false },
        { text: 'Custom SLA', included: false },
        { text: 'Dedicated support', included: false },
        { text: 'White-label options', included: false },
      ],
      apiLimits: {
        requests: '10,000/month',
        rateLimit: '100 req/min',
        uptime: '99.5% SLA',
        support: 'Email (48hr response)'
      }
    },
    {
      name: 'Medium Scale',
      description: 'For growing businesses and mid-size teams',
      monthlyPrice: 199,
      annualPrice: 1990,
      color: 'from-purple-500 to-pink-500',
      icon: FiTrendingUp,
      featured: true,
      features: [
        { text: '100,000 API calls/month', included: true },
        { text: 'REST & GraphQL endpoints', included: true },
        { text: 'Real-time webhooks', included: true },
        { text: 'Rate limiting: 500 req/min', included: true },
        { text: 'API documentation access', included: true },
        { text: 'Priority email support', included: true },
        { text: 'Advanced analytics dashboard', included: true },
        { text: 'Multiple environments (Dev/Prod)', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'Team collaboration tools', included: true },
        { text: 'Custom SLA (99.9%)', included: true },
        { text: 'White-label options', included: false },
      ],
      apiLimits: {
        requests: '100,000/month',
        rateLimit: '500 req/min',
        uptime: '99.9% SLA',
        support: 'Priority (12hr response)'
      }
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with custom needs',
      monthlyPrice: null,
      annualPrice: null,
      color: 'from-orange-500 to-red-500',
      icon: FiShield,
      features: [
        { text: 'Unlimited API calls', included: true },
        { text: 'REST & GraphQL endpoints', included: true },
        { text: 'Real-time webhooks', included: true },
        { text: 'Custom rate limits', included: true },
        { text: 'Full API documentation', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'Advanced analytics & reporting', included: true },
        { text: 'Unlimited environments', included: true },
        { text: 'Custom integrations', included: true },
        { text: 'SSO & advanced security', included: true },
        { text: 'Custom SLA (99.99%)', included: true },
        { text: 'Full white-label options', included: true },
      ],
      apiLimits: {
        requests: 'Unlimited',
        rateLimit: 'Custom',
        uptime: '99.99% SLA',
        support: 'Dedicated 24/7'
      }
    }
  ]

  const getPrice = (tier: typeof pricingTiers[0]) => {
    if (tier.monthlyPrice === null) return 'Custom'
    return billingCycle === 'monthly' ? `$${tier.monthlyPrice}` : `$${tier.annualPrice}`
  }

  const getSavings = (monthlyPrice: number | null, annualPrice: number | null) => {
    if (monthlyPrice === null || annualPrice === null) return null
    const monthlyCost = monthlyPrice * 12
    const savings = monthlyCost - annualPrice
    const percentage = Math.round((savings / monthlyCost) * 100)
    return percentage
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Demo Video Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-1">
              See VEMAR AI in Action
            </Badge>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Watch How It Works
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover how VEMAR AI transforms client request management with intelligent routing and specialized agents
            </p>
            <p className="text-sm font-semibold text-blue-600 mt-2">
              Founded: May 2025
            </p>
          </div>

          {/* Video Player */}
          <Card className="overflow-hidden shadow-2xl border-2 border-blue-100">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center group cursor-pointer hover:from-slate-800 hover:to-slate-700 transition-all">
                {/* Placeholder for video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto group-hover:bg-white/20 transition-all group-hover:scale-110">
                      <FiPlay className="w-10 h-10 text-white ml-1" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-white text-lg font-semibold">Product Demo Video</p>
                      <p className="text-white/70 text-sm">Click to watch full demonstration</p>
                    </div>
                  </div>
                </div>

                {/* Grid overlay for visual effect */}
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent" />
              </div>

              {/* Investor Metrics */}
              <div className="grid grid-cols-3 divide-x divide-slate-200 bg-white">
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                    <FiZap className="w-4 h-4" />
                    <p className="font-bold text-lg">85%</p>
                  </div>
                  <p className="text-xs text-gray-500">Cost Reduction</p>
                </div>
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-purple-600 mb-1">
                    <FiCpu className="w-4 h-4" />
                    <p className="font-bold text-lg">10x</p>
                  </div>
                  <p className="text-xs text-gray-500">Faster Response</p>
                </div>
                <div className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-600 mb-1">
                    <FiTrendingUp className="w-4 h-4" />
                    <p className="font-bold text-lg">99.9%</p>
                  </div>
                  <p className="text-xs text-gray-500">Accuracy Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features Highlights */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            {[
              { icon: FiServer, title: 'Multi-Agent System', desc: 'Specialized AI agents' },
              { icon: FiRefreshCw, title: 'Real-time Routing', desc: 'Instant assignment' },
              { icon: FiDatabase, title: 'Smart Analytics', desc: 'Performance insights' },
              { icon: FiGlobe, title: 'Payment Integration', desc: 'PayPal, Razorpay, UPI' }
            ].map((feature, idx) => (
              <Card key={idx} className="text-center border-blue-100 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <feature.icon className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Flexible pricing for teams of all sizes
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative w-14 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-8' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              {billingCycle === 'annual' && (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  Save up to 17%
                </Badge>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, idx) => {
              const Icon = tier.icon
              const savings = getSavings(tier.monthlyPrice, tier.annualPrice)

              return (
                <Card
                  key={idx}
                  className={`relative overflow-hidden ${
                    tier.featured
                      ? 'border-2 border-purple-500 shadow-2xl scale-105'
                      : 'border-gray-200 hover:shadow-xl'
                  } transition-all`}
                >
                  {tier.featured && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-xs font-semibold">
                      MOST POPULAR
                    </div>
                  )}

                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tier.color} flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-base">{tier.description}</CardDescription>

                    <div className="pt-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {getPrice(tier)}
                        </span>
                        {tier.monthlyPrice !== null && (
                          <span className="text-gray-500">
                            /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                          </span>
                        )}
                      </div>
                      {billingCycle === 'annual' && savings && (
                        <p className="text-sm text-green-600 font-medium mt-1">
                          Save {savings}% with annual billing
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* API Limits */}
                    <div className="p-4 bg-slate-50 rounded-lg space-y-2">
                      <h4 className="font-semibold text-sm text-gray-700 mb-3">API Limits</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-gray-500">Requests</p>
                          <p className="font-semibold text-gray-900">{tier.apiLimits.requests}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Rate Limit</p>
                          <p className="font-semibold text-gray-900">{tier.apiLimits.rateLimit}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Uptime</p>
                          <p className="font-semibold text-gray-900">{tier.apiLimits.uptime}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Support</p>
                          <p className="font-semibold text-gray-900 text-[10px]">{tier.apiLimits.support}</p>
                        </div>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-3">
                      {tier.features.map((feature, featureIdx) => (
                        <div key={featureIdx} className="flex items-start gap-3">
                          {feature.included ? (
                            <FiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <FiX className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                            {feature.text}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      className={`w-full ${
                        tier.featured
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                      } text-white border-0`}
                    >
                      {tier.monthlyPrice === null ? 'Contact Sales' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Additional Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <Card className="border-blue-100">
              <CardHeader>
                <FiLock className="w-8 h-8 text-blue-600 mb-2" />
                <CardTitle className="text-lg">Enterprise Security</CardTitle>
                <CardDescription>
                  SOC 2 compliant with end-to-end encryption, SSO, and advanced access controls
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <FiHeadphones className="w-8 h-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">24/7 Support</CardTitle>
                <CardDescription>
                  Dedicated support team available around the clock for Enterprise customers
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-green-100">
              <CardHeader>
                <FiRefreshCw className="w-8 h-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">99.99% Uptime</CardTitle>
                <CardDescription>
                  Industry-leading uptime guarantee with automatic failover and redundancy
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* FAQ or Contact */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle>Need a Custom Plan?</CardTitle>
                <CardDescription className="text-base">
                  Contact our sales team for custom enterprise solutions tailored to your specific requirements
                </CardDescription>
                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 hover:from-blue-700 hover:to-purple-700">
                    Contact Sales Team
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <PricingChatbot />
    </div>
  )
}
