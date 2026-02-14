'use client'

import { FiShield, FiMic, FiVideo, FiClock, FiAlertTriangle, FiCheckCircle, FiActivity } from 'react-icons/fi'
import Link from 'next/link'

export default function DeepfakeDetectionPage() {
  const stats = [
    {
      label: 'Total Analyses',
      value: '1,247',
      icon: FiActivity,
      change: '+12% this month',
      color: 'amber',
    },
    {
      label: 'Voice Detections',
      value: '892',
      icon: FiMic,
      change: '71% of total',
      color: 'orange',
    },
    {
      label: 'Video Detections',
      value: '355',
      icon: FiVideo,
      change: '29% of total',
      color: 'red',
    },
    {
      label: 'Threats Blocked',
      value: '47',
      icon: FiAlertTriangle,
      change: '3.8% detection rate',
      color: 'rose',
    },
  ]

  const recentAnalyses = [
    {
      id: 1,
      type: 'voice',
      file: 'customer_call_2024_001.mp3',
      result: 'authentic',
      confidence: 98.5,
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      type: 'video',
      file: 'kyc_verification_vid_445.mp4',
      result: 'deepfake',
      confidence: 94.2,
      timestamp: '4 hours ago',
    },
    {
      id: 3,
      type: 'voice',
      file: 'loan_approval_call_789.wav',
      result: 'authentic',
      confidence: 96.8,
      timestamp: '6 hours ago',
    },
    {
      id: 4,
      type: 'video',
      file: 'account_opening_verify_332.mp4',
      result: 'authentic',
      confidence: 99.1,
      timestamp: '1 day ago',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4 mb-4">
            <FiShield className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">BFSI Deepfake Detection Platform</h1>
              <p className="text-amber-200 mt-2">AI-Powered Media Authenticity Verification for Financial Services</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* About Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12 border border-amber-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Platform</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The BFSI Deepfake Detection Platform is an AI-powered solution designed specifically for Banking, Financial Services, and Insurance sectors to combat the rising threat of deepfake fraud. Our platform leverages state-of-the-art machine learning models to analyze voice and video content for signs of manipulation or synthetic generation.
            </p>
            <p>
              With the increasing sophistication of AI-generated content, financial institutions face unprecedented risks from fraudulent identity verification, social engineering attacks, and manipulated KYC documentation. This platform provides real-time analysis and risk assessment to help organizations maintain trust and security in their digital interactions.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                <h3 className="font-bold text-gray-900 mb-2">Voice Analysis</h3>
                <p className="text-sm text-gray-700">
                  Advanced spectral analysis, voice print verification, and AI marker detection to identify synthetic or manipulated audio in phone calls and recordings.
                </p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                <h3 className="font-bold text-gray-900 mb-2">Video Analysis</h3>
                <p className="text-sm text-gray-700">
                  Frame-by-frame facial analysis, lip-sync consistency checks, and temporal coherence verification to detect face swaps and video deepfakes.
                </p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 border border-amber-200">
                <h3 className="font-bold text-gray-900 mb-2">Compliance Ready</h3>
                <p className="text-sm text-gray-700">
                  ISO 27001 certified processing, end-to-end encryption, BFSI regulatory compliance, and comprehensive audit trails for all analyses.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4"
                style={{ borderLeftColor: `rgb(var(--color-${stat.color}-500))` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                  <div className={`text-${stat.color}-100 bg-${stat.color}-50 px-3 py-1 rounded-full text-xs font-semibold`}>
                    {stat.change}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Tools</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/deepfake-detection/voice"
              className="bg-gradient-to-br from-amber-600 to-orange-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <FiMic className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Voice Analysis</h3>
                  <p className="text-amber-100">Analyze audio files for deepfake detection</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4">
                <p className="text-sm text-amber-50">
                  Upload voice recordings, phone calls, or audio messages to detect AI-generated or manipulated voices
                </p>
              </div>
            </Link>

            <Link
              href="/deepfake-detection/video"
              className="bg-gradient-to-br from-orange-600 to-red-600 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <FiVideo className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Video Analysis</h3>
                  <p className="text-orange-100">Analyze video files for deepfake detection</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mt-4">
                <p className="text-sm text-orange-50">
                  Upload video recordings, KYC verifications, or video calls to detect face swaps and synthetic videos
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Analyses */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Analyses</h2>
            <Link
              href="/deepfake-detection/history"
              className="text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-2"
            >
              View All
              <FiClock className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-amber-100 to-orange-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">File Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Result</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Confidence</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {recentAnalyses.map((analysis) => (
                    <tr key={analysis.id} className="hover:bg-amber-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {analysis.type === 'voice' ? (
                            <FiMic className="w-5 h-5 text-amber-600" />
                          ) : (
                            <FiVideo className="w-5 h-5 text-orange-600" />
                          )}
                          <span className="text-sm font-medium text-gray-700 capitalize">
                            {analysis.type}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900 font-medium">{analysis.file}</span>
                      </td>
                      <td className="px-6 py-4">
                        {analysis.result === 'authentic' ? (
                          <div className="flex items-center gap-2">
                            <FiCheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-green-700 font-semibold text-sm">Authentic</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <FiAlertTriangle className="w-5 h-5 text-red-600" />
                            <span className="text-red-700 font-semibold text-sm">Deepfake Detected</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                            <div
                              className={`h-2 rounded-full ${
                                analysis.result === 'authentic' ? 'bg-green-600' : 'bg-red-600'
                              }`}
                              style={{ width: `${analysis.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{analysis.confidence}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{analysis.timestamp}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-12 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <FiShield className="w-6 h-6 text-amber-700 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Enterprise Security & Compliance</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                All analyses are encrypted end-to-end and comply with BFSI regulations. Data is processed in secure
                environments with ISO 27001 certification. No media files are stored permanently after analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
