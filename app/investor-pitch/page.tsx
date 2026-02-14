'use client'

import { FiTrendingUp, FiUsers, FiGlobe, FiDollarSign, FiTarget, FiZap, FiAward, FiBarChart2, FiShield, FiClock } from 'react-icons/fi'

export default function InvestorPitchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Revolutionizing Business Operations with AI Agents
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              VEMAR AI: The Future of Intelligent Business Automation in India
            </p>
            <div className="flex items-center justify-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <FiGlobe className="w-6 h-6" />
                <span>1.4B+ Market</span>
              </div>
              <span className="text-blue-300">|</span>
              <div className="flex items-center gap-2">
                <FiTrendingUp className="w-6 h-6" />
                <span>38% CAGR</span>
              </div>
              <span className="text-blue-300">|</span>
              <div className="flex items-center gap-2">
                <FiDollarSign className="w-6 h-6" />
                <span>$7.8B by 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Problem Statement */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Problem</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Indian businesses lose ₹2,400 Cr+ annually due to inefficient client management and manual workflows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-red-500">
              <div className="text-red-500 mb-4">
                <FiClock className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Time Wastage</h3>
              <p className="text-gray-600 mb-4">
                Teams spend 40-60% of their time on repetitive tasks instead of high-value work
              </p>
              <div className="text-3xl font-bold text-red-600">40-60%</div>
              <p className="text-sm text-gray-500">of productive hours lost</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-orange-500">
              <div className="text-orange-500 mb-4">
                <FiUsers className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Poor Client Experience</h3>
              <p className="text-gray-600 mb-4">
                Delayed responses and inconsistent service lead to customer churn
              </p>
              <div className="text-3xl font-bold text-orange-600">35%</div>
              <p className="text-sm text-gray-500">customer churn rate</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-yellow-500">
              <div className="text-yellow-600 mb-4">
                <FiBarChart2 className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Scaling Challenges</h3>
              <p className="text-gray-600 mb-4">
                Traditional systems require linear hiring costs to grow, limiting profitability
              </p>
              <div className="text-3xl font-bold text-yellow-600">3:1</div>
              <p className="text-sm text-gray-500">cost-to-revenue ratio</p>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Solution</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              VEMAR AI: A Multi-Agent AI Platform that automates end-to-end client request management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-600 rounded-lg p-3">
                  <FiZap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Intelligent Automation</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="bg-blue-600 rounded-full w-2 h-2 mt-2" />
                  <span>AI agents handle 80% of repetitive tasks automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-600 rounded-full w-2 h-2 mt-2" />
                  <span>Natural language processing for request categorization</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-600 rounded-full w-2 h-2 mt-2" />
                  <span>Smart routing to appropriate departments</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-blue-600 rounded-full w-2 h-2 mt-2" />
                  <span>24/7 instant response to client queries</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-200">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-600 rounded-lg p-3">
                  <FiTarget className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Business Impact</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="bg-purple-600 rounded-full w-2 h-2 mt-2" />
                  <span>70% reduction in operational costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-600 rounded-full w-2 h-2 mt-2" />
                  <span>5x faster request processing time</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-600 rounded-full w-2 h-2 mt-2" />
                  <span>95% customer satisfaction rate</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-purple-600 rounded-full w-2 h-2 mt-2" />
                  <span>Scale without proportional cost increase</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Market Opportunity - India Focus */}
        <div className="mb-20 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The India Opportunity</h2>
            <p className="text-xl text-gray-600">
              India is primed for AI-driven business transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-orange-600 mb-4">
                <FiGlobe className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Market Size</h3>
              <div className="text-3xl font-bold text-orange-600 mb-2">$7.8 Billion</div>
              <p className="text-gray-600 text-sm mb-3">AI market by 2025</p>
              <div className="bg-orange-100 rounded-lg p-3">
                <p className="text-orange-900 text-sm font-semibold">38% CAGR (2020-2025)</p>
                <p className="text-orange-700 text-xs mt-1">Fastest growing AI market globally</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-blue-600 mb-4">
                <FiUsers className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Target Customers</h3>
              <div className="text-3xl font-bold text-blue-600 mb-2">63 Million</div>
              <p className="text-gray-600 text-sm mb-3">MSMEs in India</p>
              <div className="bg-blue-100 rounded-lg p-3">
                <p className="text-blue-900 text-sm font-semibold">30% of GDP contribution</p>
                <p className="text-blue-700 text-xs mt-1">Rapidly digitizing operations</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-green-600 mb-4">
                <FiDollarSign className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Revenue Potential</h3>
              <div className="text-3xl font-bold text-green-600 mb-2">₹500 Cr+</div>
              <p className="text-gray-600 text-sm mb-3">ARR by Year 3</p>
              <div className="bg-green-100 rounded-lg p-3">
                <p className="text-green-900 text-sm font-semibold">SaaS + Usage model</p>
                <p className="text-green-700 text-xs mt-1">Recurring revenue streams</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl p-6 border-2 border-orange-300">
            <h4 className="font-bold text-gray-900 mb-4 text-lg">Why India? Why Now?</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="bg-orange-600 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Digital India Initiative</p>
                  <p className="text-sm text-gray-600">Government push for digital transformation across sectors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-600 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Tech-Savvy Workforce</p>
                  <p className="text-sm text-gray-600">1.5M+ IT professionals graduating annually</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-600 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">UPI & Digital Payments</p>
                  <p className="text-sm text-gray-600">World's largest real-time payment system - 12B+ transactions/month</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-orange-600 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Affordable Internet</p>
                  <p className="text-sm text-gray-600">800M+ internet users with cheapest data globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Model */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Revenue Model</h2>
            <p className="text-xl text-gray-600">
              Predictable, scalable revenue with high margins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Starter</h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">₹4,999</div>
              <p className="text-gray-600 mb-6">per month</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="bg-blue-600 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>Up to 3 AI agents</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="bg-blue-600 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>1,000 requests/month</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="bg-blue-600 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>Basic analytics</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">Target: Small businesses</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl shadow-xl p-6 border-t-4 border-yellow-400 transform scale-105">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Professional</h3>
                <div className="bg-yellow-400 text-purple-900 text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              </div>
              <div className="text-4xl font-bold mb-2">₹19,999</div>
              <p className="text-blue-100 mb-6">per month</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="bg-white rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>Up to 10 AI agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-white rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>10,000 requests/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-white rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-white rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>Priority support</span>
                </li>
              </ul>
              <p className="text-sm text-blue-100">Target: Growing companies</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Enterprise</h3>
              <div className="text-4xl font-bold text-purple-600 mb-2">Custom</div>
              <p className="text-gray-600 mb-6">tailored pricing</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="bg-purple-600 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>Unlimited agents</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="bg-purple-600 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>Unlimited requests</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="bg-purple-600 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <div className="bg-purple-600 rounded-full w-1.5 h-1.5 mt-2 flex-shrink-0" />
                  <span>Dedicated success manager</span>
                </li>
              </ul>
              <p className="text-sm text-gray-500">Target: Large enterprises</p>
            </div>
          </div>

          <div className="mt-8 bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <FiDollarSign className="w-8 h-8 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Revenue Projections (3-Year)</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-gray-600 mb-1">Year 1</p>
                <p className="text-3xl font-bold text-green-600">₹12 Cr</p>
                <p className="text-sm text-gray-500">500 customers</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Year 2</p>
                <p className="text-3xl font-bold text-green-600">₹75 Cr</p>
                <p className="text-sm text-gray-500">3,000 customers</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Year 3</p>
                <p className="text-3xl font-bold text-green-600">₹500 Cr</p>
                <p className="text-sm text-gray-500">20,000+ customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Competitive Edge</h2>
            <p className="text-xl text-gray-600">
              Why VEMAR AI wins in the Indian market
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <FiAward className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">India-First Design</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Built specifically for Indian business workflows, compliance requirements, and cost structures
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Multi-language support (Hindi, Tamil, Telugu, Bengali, etc.)</li>
                <li>• GST and Indian tax compliance built-in</li>
                <li>• Integration with Indian payment systems (UPI, NEFT, RTGS)</li>
                <li>• Optimized for Indian internet infrastructure</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <FiShield className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Data Sovereignty</h3>
              </div>
              <p className="text-gray-700 mb-4">
                All data stored in India, compliant with data localization requirements
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Servers located in Mumbai and Bangalore</li>
                <li>• GDPR and Indian data protection compliant</li>
                <li>• End-to-end encryption</li>
                <li>• ISO 27001 certified infrastructure</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <FiDollarSign className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Affordable Pricing</h3>
              </div>
              <p className="text-gray-700 mb-4">
                70% cheaper than international competitors with better ROI
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Pricing in INR, no forex fluctuations</li>
                <li>• Flexible payment terms for Indian businesses</li>
                <li>• Free tier for startups and small businesses</li>
                <li>• No hidden costs or surprise fees</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-orange-100 rounded-lg p-3">
                  <FiZap className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Local Support</h3>
              </div>
              <p className="text-gray-700 mb-4">
                24/7 support in local languages with Indian business understanding
              </p>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Support team based in India (not outsourced)</li>
                <li>• Understand Indian business culture and practices</li>
                <li>• Onboarding assistance in regional languages</li>
                <li>• Training programs for your team</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Traction & Validation */}
        <div className="mb-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Early Traction</h2>
            <p className="text-xl text-blue-100">
              Real results from pilot customers
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">50+</div>
              <p className="text-blue-100">Beta Customers</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">92%</div>
              <p className="text-blue-100">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">15K+</div>
              <p className="text-blue-100">Requests Processed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">₹2.5Cr</div>
              <p className="text-blue-100">Pipeline ARR</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Customer Testimonials</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm mb-3">
                  "VEMAR AI reduced our client onboarding time from 3 days to 2 hours. Game changer for our agency!"
                </p>
                <p className="font-semibold text-sm">- Rajesh Kumar, Founder, Digital Marketing Agency, Mumbai</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm mb-3">
                  "We're handling 5x more client requests with the same team size. ROI was positive in first month."
                </p>
                <p className="font-semibold text-sm">- Priya Sharma, COO, IT Services Company, Bangalore</p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Ask */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Opportunity</h2>
            <p className="text-xl text-gray-600">
              Join us in building India's leading AI agent platform
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-10 border-2 border-purple-200">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Seeking</h3>
                <div className="text-6xl font-bold text-purple-600 mb-4">₹25 Cr</div>
                <p className="text-gray-600 mb-8">Series A Round</p>

                <h4 className="font-bold text-gray-900 mb-4 text-lg">Use of Funds</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">Product Development</span>
                      <span className="text-gray-900 font-bold">40%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '40%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">Sales & Marketing</span>
                      <span className="text-gray-900 font-bold">35%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">Team Expansion</span>
                      <span className="text-gray-900 font-bold">20%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '20%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700 font-medium">Operations</span>
                      <span className="text-gray-900 font-bold">5%</span>
                    </div>
                    <div className="bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '5%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">12-Month Milestones</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold flex-shrink-0">
                      Q1
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Product Enhancement</h4>
                      <p className="text-gray-600 text-sm">Launch multi-language support + industry-specific templates</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold flex-shrink-0">
                      Q2
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Market Expansion</h4>
                      <p className="text-gray-600 text-sm">Acquire 500 paying customers across 5 major Indian cities</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-green-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold flex-shrink-0">
                      Q3
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Enterprise Deals</h4>
                      <p className="text-gray-600 text-sm">Close 10 enterprise contracts (Fortune 500 India companies)</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-orange-600 rounded-full w-12 h-12 flex items-center justify-center text-white font-bold flex-shrink-0">
                      Q4
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Series B Ready</h4>
                      <p className="text-gray-600 text-sm">Reach ₹25Cr ARR, 3,000+ customers, 35% MoM growth</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6">
                  <h4 className="font-bold mb-2">Exit Strategy</h4>
                  <p className="text-sm text-blue-100">
                    Target acquisition by major Indian conglomerates (Tata, Reliance) or global SaaS players within 5-7 years at 10-15x revenue multiple
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Let's Build the Future Together</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join us in revolutionizing how Indian businesses operate
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="mailto:invest@vemarai.com"
              className="bg-white text-purple-600 font-bold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              <FiDollarSign className="w-5 h-5" />
              Schedule Investor Meeting
            </a>
            <a
              href="/pitch-deck.pdf"
              className="bg-purple-700 text-white font-bold px-8 py-4 rounded-lg hover:bg-purple-800 transition-colors inline-flex items-center gap-2"
            >
              <FiBarChart2 className="w-5 h-5" />
              Download Full Deck
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
