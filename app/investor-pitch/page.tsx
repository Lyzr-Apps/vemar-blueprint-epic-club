'use client'

import { FiTrendingUp, FiUsers, FiGlobe, FiDollarSign, FiTarget, FiZap, FiAward, FiBarChart2, FiShield, FiClock } from 'react-icons/fi'

export default function InvestorPitchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-pink-400/20 to-purple-400/20" />
        <div className="max-w-7xl mx-auto px-6 py-20 relative">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-bold text-sm animate-pulse">
                INDIA'S AI REVOLUTION
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 bg-clip-text text-transparent">
              Revolutionizing Business Operations with AI Agents
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-yellow-100 font-bold">
              VEMAR AI: The Future of Intelligent Business Automation in India
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <FiGlobe className="w-6 h-6 text-yellow-300" />
                <span className="font-bold">1.4B+ Market</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <FiTrendingUp className="w-6 h-6 text-green-300" />
                <span className="font-bold">38% CAGR</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <FiDollarSign className="w-6 h-6 text-pink-300" />
                <span className="font-bold">$7.8B by 2025</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Problem Statement */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold mb-4">
              THE CHALLENGE
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              The Problem
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-semibold">
              Indian businesses lose ₹2,400 Cr+ annually due to inefficient client management and manual workflows
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-500 to-pink-500 text-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="mb-4">
                <FiClock className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-black mb-3">Time Wastage</h3>
              <p className="mb-4 text-red-50">
                Teams spend 40-60% of their time on repetitive tasks instead of high-value work
              </p>
              <div className="text-5xl font-black">40-60%</div>
              <p className="text-sm text-red-100 font-semibold">of productive hours lost</p>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 text-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="mb-4">
                <FiUsers className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-black mb-3">Poor Client Experience</h3>
              <p className="mb-4 text-orange-50">
                Delayed responses and inconsistent service lead to customer churn
              </p>
              <div className="text-5xl font-black">35%</div>
              <p className="text-sm text-orange-100 font-semibold">customer churn rate</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-green-500 text-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="mb-4">
                <FiBarChart2 className="w-16 h-16" />
              </div>
              <h3 className="text-2xl font-black mb-3">Scaling Challenges</h3>
              <p className="mb-4 text-yellow-50">
                Traditional systems require linear hiring costs to grow, limiting profitability
              </p>
              <div className="text-5xl font-black">3:1</div>
              <p className="text-sm text-yellow-100 font-semibold">cost-to-revenue ratio</p>
            </div>
          </div>
        </div>

        {/* User Flow Demo */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full font-bold mb-4">
              LIVE DEMO
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-semibold">
              See VEMAR AI in action - From client request to resolution in minutes
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 hidden md:block" />

            {/* Step 1 */}
            <div className="mb-12 md:grid md:grid-cols-2 md:gap-12 items-center">
              <div className="md:text-right mb-6 md:mb-0">
                <div className="inline-block md:block">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4 mb-4 md:justify-end">
                      <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-blue-900 font-black text-xl shadow-lg">
                        1
                      </div>
                      <h3 className="text-2xl font-black">Client Submits Request</h3>
                    </div>
                    <p className="text-blue-50 font-semibold text-lg">
                      Customer fills out a simple form or sends an email requesting a service (e.g., "I need help with my tax filing")
                    </p>
                    <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="font-black text-sm mb-2">Example Input:</p>
                      <p className="text-blue-100 italic">"Need tax consultation for FY 2024-25. Turnover 50L. GST registered."</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block" />
            </div>

            {/* Step 2 */}
            <div className="mb-12 md:grid md:grid-cols-2 md:gap-12 items-center">
              <div className="hidden md:block" />
              <div className="md:text-left mb-6 md:mb-0">
                <div className="inline-block md:block">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-purple-900 font-black text-xl shadow-lg">
                        2
                      </div>
                      <h3 className="text-2xl font-black">AI Analyzes & Categorizes</h3>
                    </div>
                    <p className="text-purple-50 font-semibold text-lg">
                      Our AI agent instantly reads the request, extracts key information, and categorizes it (Tax Services, Urgent Priority)
                    </p>
                    <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="font-black text-sm mb-2">AI Processing:</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-purple-100">Category: Tax Consultation</p>
                        <p className="text-purple-100">Priority: High (deadline sensitive)</p>
                        <p className="text-purple-100">Department: Tax Services</p>
                        <p className="text-purple-100">Estimated Time: 2-3 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-12 md:grid md:grid-cols-2 md:gap-12 items-center">
              <div className="md:text-right mb-6 md:mb-0">
                <div className="inline-block md:block">
                  <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4 mb-4 md:justify-end">
                      <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-pink-900 font-black text-xl shadow-lg">
                        3
                      </div>
                      <h3 className="text-2xl font-black">Smart Assignment</h3>
                    </div>
                    <p className="text-pink-50 font-semibold text-lg">
                      AI routes to the best available expert based on specialization, workload, and past performance
                    </p>
                    <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="font-black text-sm mb-2">Assignment Logic:</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-pink-100">Expert: CA Priya Sharma</p>
                        <p className="text-pink-100">Match Score: 95%</p>
                        <p className="text-pink-100">Availability: Now</p>
                        <p className="text-pink-100">Avg Rating: 4.8/5</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block" />
            </div>

            {/* Step 4 */}
            <div className="mb-12 md:grid md:grid-cols-2 md:gap-12 items-center">
              <div className="hidden md:block" />
              <div className="md:text-left mb-6 md:mb-0">
                <div className="inline-block md:block">
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-orange-900 font-black text-xl shadow-lg">
                        4
                      </div>
                      <h3 className="text-2xl font-black">Automated Notifications</h3>
                    </div>
                    <p className="text-orange-50 font-semibold text-lg">
                      Both client and expert receive instant notifications via email, SMS, and WhatsApp with all details
                    </p>
                    <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="font-black text-sm mb-2">Notifications Sent:</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-orange-100">Client: "Request received, Expert assigned"</p>
                        <p className="text-orange-100">Expert: "New urgent tax case assigned"</p>
                        <p className="text-orange-100">Manager: "High priority task in progress"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="mb-12 md:grid md:grid-cols-2 md:gap-12 items-center">
              <div className="md:text-right mb-6 md:mb-0">
                <div className="inline-block md:block">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4 mb-4 md:justify-end">
                      <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-teal-900 font-black text-xl shadow-lg">
                        5
                      </div>
                      <h3 className="text-2xl font-black">Real-Time Tracking</h3>
                    </div>
                    <p className="text-teal-50 font-semibold text-lg">
                      Client tracks progress in real-time through a beautiful dashboard showing every update
                    </p>
                    <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="font-black text-sm mb-2">Live Status:</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full" />
                          <p className="text-teal-100">Documents collected</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          <p className="text-teal-100">Analysis in progress</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          <p className="text-teal-100">Final review pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block" />
            </div>

            {/* Step 6 */}
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
              <div className="hidden md:block" />
              <div className="md:text-left">
                <div className="inline-block md:block">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center text-green-900 font-black text-xl shadow-lg">
                        6
                      </div>
                      <h3 className="text-2xl font-black">Automated Follow-Up</h3>
                    </div>
                    <p className="text-green-50 font-semibold text-lg">
                      After completion, AI sends satisfaction survey, requests feedback, and schedules next steps automatically
                    </p>
                    <div className="mt-4 bg-white/20 backdrop-blur-sm rounded-xl p-4">
                      <p className="font-black text-sm mb-2">Post-Completion:</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-green-100">Invoice generated & sent</p>
                        <p className="text-green-100">Payment link shared</p>
                        <p className="text-green-100">Feedback request sent</p>
                        <p className="text-green-100">Follow-up scheduled (30 days)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Banner */}
          <div className="mt-16 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl p-8 shadow-2xl">
            <div className="text-center">
              <h3 className="text-3xl font-black mb-6">End Result</h3>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-5xl font-black mb-2">2 hrs</div>
                  <p className="text-purple-100 font-semibold">Total Time</p>
                  <p className="text-xs text-purple-200 mt-1">(vs 3 days before)</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-5xl font-black mb-2">0</div>
                  <p className="text-purple-100 font-semibold">Manual Steps</p>
                  <p className="text-xs text-purple-200 mt-1">(fully automated)</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-5xl font-black mb-2">5/5</div>
                  <p className="text-purple-100 font-semibold">Client Rating</p>
                  <p className="text-xs text-purple-200 mt-1">(happy customer)</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-5xl font-black mb-2">80%</div>
                  <p className="text-purple-100 font-semibold">Cost Saved</p>
                  <p className="text-xs text-purple-200 mt-1">(vs manual process)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-bold mb-4">
              OUR SOLUTION
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VEMAR AI Platform
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-semibold">
              A Multi-Agent AI Platform that automates end-to-end client request management
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 shadow-2xl text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-yellow-400 rounded-2xl p-4 shadow-lg">
                  <FiZap className="w-10 h-10 text-purple-900" />
                </div>
                <h3 className="text-3xl font-black">Intelligent Automation</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                  <span className="text-lg font-semibold">AI agents handle 80% of repetitive tasks automatically</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                  <span className="text-lg font-semibold">Natural language processing for request categorization</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                  <span className="text-lg font-semibold">Smart routing to appropriate departments</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                  <span className="text-lg font-semibold">24/7 instant response to client queries</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-pink-500 via-red-500 to-orange-500 rounded-2xl p-8 shadow-2xl text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-yellow-400 rounded-2xl p-4 shadow-lg">
                  <FiTarget className="w-10 h-10 text-red-900" />
                </div>
                <h3 className="text-3xl font-black">Business Impact</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                  <span className="text-lg font-semibold">70% reduction in operational costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                  <span className="text-lg font-semibold">5x faster request processing time</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                  <span className="text-lg font-semibold">95% customer satisfaction rate</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                  <span className="text-lg font-semibold">Scale without proportional cost increase</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Market Opportunity - India Focus */}
        <div className="mb-20 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-400 rounded-3xl p-12 shadow-2xl text-white">
          <div className="text-center mb-12">
            <div className="inline-block bg-white text-purple-900 px-6 py-2 rounded-full font-bold mb-4">
              MASSIVE OPPORTUNITY
            </div>
            <h2 className="text-5xl font-black mb-4">
              The India Opportunity
            </h2>
            <p className="text-2xl text-orange-100 font-semibold">
              India is primed for AI-driven business transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
              <div className="text-orange-600 mb-4">
                <FiGlobe className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Market Size</h3>
              <div className="text-5xl font-black bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent mb-2">
                $7.8B
              </div>
              <p className="text-gray-700 font-bold mb-3">AI market by 2025</p>
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl p-4">
                <p className="font-black text-sm">38% CAGR (2020-2025)</p>
                <p className="text-xs mt-1 text-orange-100">Fastest growing AI market globally</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
              <div className="text-blue-600 mb-4">
                <FiUsers className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Target Customers</h3>
              <div className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                63M
              </div>
              <p className="text-gray-700 font-bold mb-3">MSMEs in India</p>
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4">
                <p className="font-black text-sm">30% of GDP contribution</p>
                <p className="text-xs mt-1 text-blue-100">Rapidly digitizing operations</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-transform">
              <div className="text-green-600 mb-4">
                <FiDollarSign className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Revenue Potential</h3>
              <div className="text-5xl font-black bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-2">
                ₹500Cr+
              </div>
              <p className="text-gray-700 font-bold mb-3">ARR by Year 3</p>
              <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl p-4">
                <p className="font-black text-sm">SaaS + Usage model</p>
                <p className="text-xs mt-1 text-green-100">Recurring revenue streams</p>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <h4 className="font-black text-2xl mb-6">Why India? Why Now?</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-black text-lg">Digital India Initiative</p>
                  <p className="text-sm text-orange-100">Government push for digital transformation across sectors</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-black text-lg">Tech-Savvy Workforce</p>
                  <p className="text-sm text-orange-100">1.5M+ IT professionals graduating annually</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-black text-lg">UPI & Digital Payments</p>
                  <p className="text-sm text-orange-100">World's largest real-time payment system - 12B+ transactions/month</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="bg-yellow-400 rounded-full w-3 h-3 mt-2 flex-shrink-0" />
                <div>
                  <p className="font-black text-lg">Affordable Internet</p>
                  <p className="text-sm text-orange-100">800M+ internet users with cheapest data globally</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Business Model */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-2 rounded-full font-bold mb-4">
              REVENUE MODEL
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Pricing Strategy
            </h2>
            <p className="text-2xl text-gray-700 font-semibold">
              Predictable, scalable revenue with high margins
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-2xl p-8 border-4 border-blue-300 transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-black mb-4">Starter</h3>
              <div className="text-5xl font-black mb-2">₹4,999</div>
              <p className="text-blue-100 mb-6 font-semibold">per month</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Up to 3 AI agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">1,000 requests/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Basic analytics</span>
                </li>
              </ul>
              <p className="text-sm text-blue-100 font-bold">Target: Small businesses</p>
            </div>

            <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl shadow-2xl p-8 border-4 border-yellow-400 transform scale-110 z-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black">Professional</h3>
                <div className="bg-yellow-400 text-purple-900 text-xs font-black px-3 py-1 rounded-full animate-pulse">
                  POPULAR
                </div>
              </div>
              <div className="text-5xl font-black mb-2">₹19,999</div>
              <p className="text-pink-100 mb-6 font-semibold">per month</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Up to 10 AI agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">10,000 requests/month</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Advanced analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Priority support</span>
                </li>
              </ul>
              <p className="text-sm text-pink-100 font-bold">Target: Growing companies</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-2xl p-8 border-4 border-purple-300 transform hover:scale-105 transition-transform">
              <h3 className="text-2xl font-black mb-4">Enterprise</h3>
              <div className="text-5xl font-black mb-2">Custom</div>
              <p className="text-purple-100 mb-6 font-semibold">tailored pricing</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Unlimited agents</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Unlimited requests</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Custom integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="bg-yellow-400 rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  <span className="font-semibold">Dedicated success manager</span>
                </li>
              </ul>
              <p className="text-sm text-purple-100 font-bold">Target: Large enterprises</p>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <FiDollarSign className="w-10 h-10" />
              <h3 className="text-3xl font-black">Revenue Projections (3-Year)</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <p className="text-green-100 mb-2 font-semibold">Year 1</p>
                <p className="text-5xl font-black">₹12Cr</p>
                <p className="text-sm text-green-100 mt-2 font-semibold">500 customers</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <p className="text-green-100 mb-2 font-semibold">Year 2</p>
                <p className="text-5xl font-black">₹75Cr</p>
                <p className="text-sm text-green-100 mt-2 font-semibold">3,000 customers</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
                <p className="text-green-100 mb-2 font-semibold">Year 3</p>
                <p className="text-5xl font-black">₹500Cr</p>
                <p className="text-sm text-green-100 mt-2 font-semibold">20,000+ customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Competitive Advantage */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold mb-4">
              COMPETITIVE EDGE
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Why We Win
            </h2>
            <p className="text-2xl text-gray-700 font-semibold">
              VEMAR AI's unique advantages in the Indian market
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-400 rounded-2xl p-4 shadow-lg">
                  <FiAward className="w-10 h-10 text-blue-900" />
                </div>
                <h3 className="text-2xl font-black">India-First Design</h3>
              </div>
              <p className="mb-4 text-lg font-semibold text-blue-50">
                Built specifically for Indian business workflows, compliance requirements, and cost structures
              </p>
              <ul className="space-y-2 text-blue-50">
                <li className="font-semibold">• Multi-language support (Hindi, Tamil, Telugu, Bengali, etc.)</li>
                <li className="font-semibold">• GST and Indian tax compliance built-in</li>
                <li className="font-semibold">• Integration with Indian payment systems (UPI, NEFT, RTGS)</li>
                <li className="font-semibold">• Optimized for Indian internet infrastructure</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-400 to-purple-500 text-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-400 rounded-2xl p-4 shadow-lg">
                  <FiShield className="w-10 h-10 text-purple-900" />
                </div>
                <h3 className="text-2xl font-black">Data Sovereignty</h3>
              </div>
              <p className="mb-4 text-lg font-semibold text-purple-50">
                All data stored in India, compliant with data localization requirements
              </p>
              <ul className="space-y-2 text-purple-50">
                <li className="font-semibold">• Servers located in Mumbai and Bangalore</li>
                <li className="font-semibold">• GDPR and Indian data protection compliant</li>
                <li className="font-semibold">• End-to-end encryption</li>
                <li className="font-semibold">• ISO 27001 certified infrastructure</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-400 to-green-500 text-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-400 rounded-2xl p-4 shadow-lg">
                  <FiDollarSign className="w-10 h-10 text-green-900" />
                </div>
                <h3 className="text-2xl font-black">Affordable Pricing</h3>
              </div>
              <p className="mb-4 text-lg font-semibold text-green-50">
                70% cheaper than international competitors with better ROI
              </p>
              <ul className="space-y-2 text-green-50">
                <li className="font-semibold">• Pricing in INR, no forex fluctuations</li>
                <li className="font-semibold">• Flexible payment terms for Indian businesses</li>
                <li className="font-semibold">• Free tier for startups and small businesses</li>
                <li className="font-semibold">• No hidden costs or surprise fees</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-yellow-400 rounded-2xl p-4 shadow-lg">
                  <FiZap className="w-10 h-10 text-orange-900" />
                </div>
                <h3 className="text-2xl font-black">Local Support</h3>
              </div>
              <p className="mb-4 text-lg font-semibold text-orange-50">
                24/7 support in local languages with Indian business understanding
              </p>
              <ul className="space-y-2 text-orange-50">
                <li className="font-semibold">• Support team based in India (not outsourced)</li>
                <li className="font-semibold">• Understand Indian business culture and practices</li>
                <li className="font-semibold">• Onboarding assistance in regional languages</li>
                <li className="font-semibold">• Training programs for your team</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Traction & Validation */}
        <div className="mb-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-400 text-purple-900 px-6 py-2 rounded-full font-black mb-4">
              PROVEN RESULTS
            </div>
            <h2 className="text-5xl font-black mb-4">Early Traction</h2>
            <p className="text-2xl text-purple-100 font-semibold">
              Real results from pilot customers
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-6xl font-black mb-2">50+</div>
              <p className="text-purple-100 font-semibold">Beta Customers</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-6xl font-black mb-2">92%</div>
              <p className="text-purple-100 font-semibold">Satisfaction Rate</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-6xl font-black mb-2">15K+</div>
              <p className="text-purple-100 font-semibold">Requests Processed</p>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-6xl font-black mb-2">₹2.5Cr</div>
              <p className="text-purple-100 font-semibold">Pipeline ARR</p>
            </div>
          </div>

          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <h3 className="text-2xl font-black mb-6">Customer Testimonials</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <p className="mb-4 text-lg font-semibold">
                  "VEMAR AI reduced our client onboarding time from 3 days to 2 hours. Game changer for our agency!"
                </p>
                <p className="font-black">- Rajesh Kumar, Founder, Digital Marketing Agency, Mumbai</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <p className="mb-4 text-lg font-semibold">
                  "We're handling 5x more client requests with the same team size. ROI was positive in first month."
                </p>
                <p className="font-black">- Priya Sharma, COO, IT Services Company, Bangalore</p>
              </div>
            </div>
          </div>
        </div>

        {/* Investment Ask */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-bold mb-4">
              INVESTMENT OPPORTUNITY
            </div>
            <h2 className="text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Join Our Journey
            </h2>
            <p className="text-2xl text-gray-700 font-semibold">
              Build India's leading AI agent platform with us
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 rounded-3xl p-12 border-4 border-purple-300 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-6">Seeking</h3>
                <div className="text-7xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  ₹25Cr
                </div>
                <p className="text-gray-700 mb-8 text-xl font-bold">Series A Round</p>

                <h4 className="font-black text-gray-900 mb-6 text-2xl">Use of Funds</h4>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-900 font-black">Product Development</span>
                      <span className="text-gray-900 font-black text-xl">40%</span>
                    </div>
                    <div className="bg-gray-300 rounded-full h-4 shadow-inner">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full shadow-lg" style={{width: '40%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-900 font-black">Sales & Marketing</span>
                      <span className="text-gray-900 font-black text-xl">35%</span>
                    </div>
                    <div className="bg-gray-300 rounded-full h-4 shadow-inner">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full shadow-lg" style={{width: '35%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-900 font-black">Team Expansion</span>
                      <span className="text-gray-900 font-black text-xl">20%</span>
                    </div>
                    <div className="bg-gray-300 rounded-full h-4 shadow-inner">
                      <div className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full shadow-lg" style={{width: '20%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-900 font-black">Operations</span>
                      <span className="text-gray-900 font-black text-xl">5%</span>
                    </div>
                    <div className="bg-gray-300 rounded-full h-4 shadow-inner">
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full shadow-lg" style={{width: '5%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-black text-gray-900 mb-6">12-Month Milestones</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl w-14 h-14 flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg">
                      Q1
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1 text-lg">Product Enhancement</h4>
                      <p className="text-gray-700 font-semibold">Launch multi-language support + industry-specific templates</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl w-14 h-14 flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg">
                      Q2
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1 text-lg">Market Expansion</h4>
                      <p className="text-gray-700 font-semibold">Acquire 500 paying customers across 5 major Indian cities</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl w-14 h-14 flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg">
                      Q3
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1 text-lg">Enterprise Deals</h4>
                      <p className="text-gray-700 font-semibold">Close 10 enterprise contracts (Fortune 500 India companies)</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl w-14 h-14 flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-lg">
                      Q4
                    </div>
                    <div>
                      <h4 className="font-black text-gray-900 mb-1 text-lg">Series B Ready</h4>
                      <p className="text-gray-700 font-semibold">Reach ₹25Cr ARR, 3,000+ customers, 35% MoM growth</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-2xl p-6 shadow-xl">
                  <h4 className="font-black mb-2 text-xl">Exit Strategy</h4>
                  <p className="text-purple-100 font-semibold">
                    Target acquisition by major Indian conglomerates (Tata, Reliance) or global SaaS players within 5-7 years at 10-15x revenue multiple
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-pink-400/10 to-purple-400/10" />
          <div className="relative">
            <h2 className="text-5xl font-black mb-6">Let's Build the Future Together</h2>
            <p className="text-2xl mb-10 text-blue-100 font-semibold">
              Join us in revolutionizing how Indian businesses operate
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a
                href="mailto:invest@vemarai.com"
                className="bg-yellow-400 text-purple-900 font-black px-10 py-5 rounded-2xl hover:bg-yellow-300 transition-all shadow-2xl inline-flex items-center gap-3 transform hover:scale-105 text-lg"
              >
                <FiDollarSign className="w-6 h-6" />
                Schedule Investor Meeting
              </a>
              <a
                href="/pitch-deck.pdf"
                className="bg-white text-purple-600 font-black px-10 py-5 rounded-2xl hover:bg-gray-100 transition-all shadow-2xl inline-flex items-center gap-3 transform hover:scale-105 text-lg"
              >
                <FiBarChart2 className="w-6 h-6" />
                Download Full Deck
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
