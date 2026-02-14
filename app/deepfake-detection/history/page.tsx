'use client'

import { useState } from 'react'
import { FiClock, FiMic, FiVideo, FiCheckCircle, FiAlertTriangle, FiFilter, FiArrowLeft, FiDownload, FiSearch } from 'react-icons/fi'
import Link from 'next/link'

interface Analysis {
  id: number
  type: 'voice' | 'video'
  fileName: string
  result: 'authentic' | 'deepfake'
  confidence: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  timestamp: string
  date: string
}

export default function HistoryPage() {
  const [filterType, setFilterType] = useState<'all' | 'voice' | 'video'>('all')
  const [filterResult, setFilterResult] = useState<'all' | 'authentic' | 'deepfake'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Mock historical data
  const allAnalyses: Analysis[] = [
    {
      id: 1,
      type: 'voice',
      fileName: 'customer_call_2024_001.mp3',
      result: 'authentic',
      confidence: 98.5,
      riskLevel: 'LOW',
      timestamp: '2 hours ago',
      date: '2024-02-14 14:30',
    },
    {
      id: 2,
      type: 'video',
      fileName: 'kyc_verification_vid_445.mp4',
      result: 'deepfake',
      confidence: 94.2,
      riskLevel: 'HIGH',
      timestamp: '4 hours ago',
      date: '2024-02-14 12:15',
    },
    {
      id: 3,
      type: 'voice',
      fileName: 'loan_approval_call_789.wav',
      result: 'authentic',
      confidence: 96.8,
      riskLevel: 'LOW',
      timestamp: '6 hours ago',
      date: '2024-02-14 10:45',
    },
    {
      id: 4,
      type: 'video',
      fileName: 'account_opening_verify_332.mp4',
      result: 'authentic',
      confidence: 99.1,
      riskLevel: 'LOW',
      timestamp: '1 day ago',
      date: '2024-02-13 16:20',
    },
    {
      id: 5,
      type: 'voice',
      fileName: 'fraud_alert_call_556.mp3',
      result: 'deepfake',
      confidence: 91.3,
      riskLevel: 'CRITICAL',
      timestamp: '1 day ago',
      date: '2024-02-13 09:30',
    },
    {
      id: 6,
      type: 'video',
      fileName: 'identity_verify_221.mov',
      result: 'authentic',
      confidence: 97.6,
      riskLevel: 'LOW',
      timestamp: '2 days ago',
      date: '2024-02-12 15:10',
    },
    {
      id: 7,
      type: 'voice',
      fileName: 'support_ticket_987.wav',
      result: 'authentic',
      confidence: 95.4,
      riskLevel: 'LOW',
      timestamp: '2 days ago',
      date: '2024-02-12 11:25',
    },
    {
      id: 8,
      type: 'video',
      fileName: 'customer_onboard_113.mp4',
      result: 'deepfake',
      confidence: 88.7,
      riskLevel: 'MEDIUM',
      timestamp: '3 days ago',
      date: '2024-02-11 13:40',
    },
  ]

  const filteredAnalyses = allAnalyses.filter((analysis) => {
    const matchesType = filterType === 'all' || analysis.type === filterType
    const matchesResult = filterResult === 'all' || analysis.result === filterResult
    const matchesSearch = analysis.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesResult && matchesSearch
  })

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW':
        return 'text-green-700 bg-green-100 border-green-300'
      case 'MEDIUM':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300'
      case 'HIGH':
        return 'text-orange-700 bg-orange-100 border-orange-300'
      case 'CRITICAL':
        return 'text-red-700 bg-red-100 border-red-300'
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300'
    }
  }

  const stats = {
    total: allAnalyses.length,
    authentic: allAnalyses.filter((a) => a.result === 'authentic').length,
    deepfake: allAnalyses.filter((a) => a.result === 'deepfake').length,
    voice: allAnalyses.filter((a) => a.type === 'voice').length,
    video: allAnalyses.filter((a) => a.type === 'video').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link
            href="/deepfake-detection"
            className="inline-flex items-center gap-2 text-amber-200 hover:text-white mb-4 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <FiClock className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Analysis History</h1>
              <p className="text-amber-200 mt-2">Complete record of all deepfake detection analyses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Total Analyses</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="text-3xl font-bold text-green-700">{stats.authentic}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Authentic</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="text-3xl font-bold text-red-700">{stats.deepfake}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Deepfakes</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
            <div className="text-3xl font-bold text-orange-700">{stats.voice}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Voice</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="text-3xl font-bold text-red-700">{stats.video}</div>
            <div className="text-sm text-gray-600 font-medium mt-1">Video</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-200">
          <div className="flex items-center gap-2 mb-4">
            <FiFilter className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by filename..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Media Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as 'all' | 'voice' | 'video')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Types</option>
                <option value="voice">Voice Only</option>
                <option value="video">Video Only</option>
              </select>
            </div>

            {/* Result Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Result</label>
              <select
                value={filterResult}
                onChange={(e) => setFilterResult(e.target.value as 'all' | 'authentic' | 'deepfake')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="all">All Results</option>
                <option value="authentic">Authentic Only</option>
                <option value="deepfake">Deepfake Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-amber-200">
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-amber-100 to-orange-100">
            <h2 className="text-lg font-bold text-gray-900">
              Analysis Records ({filteredAnalyses.length})
            </h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              <FiDownload className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">File Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Result</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Confidence</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Risk Level</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {filteredAnalyses.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <p className="text-gray-500">No analyses match your filters</p>
                    </td>
                  </tr>
                ) : (
                  filteredAnalyses.map((analysis) => (
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
                        <span className="text-sm text-gray-900 font-medium">{analysis.fileName}</span>
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
                            <span className="text-red-700 font-semibold text-sm">Deepfake</span>
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
                          <span className="text-sm font-semibold text-gray-700">
                            {analysis.confidence}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-block px-3 py-1 rounded-lg text-xs font-bold border ${getRiskColor(analysis.riskLevel)}`}>
                          {analysis.riskLevel}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{analysis.date}</div>
                        <div className="text-xs text-gray-500">{analysis.timestamp}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-xl p-4">
          <p className="text-sm text-gray-700 font-medium text-center">
            All analysis records are maintained for compliance purposes and encrypted at rest. Records older than 90 days are automatically archived.
          </p>
        </div>
      </div>
    </div>
  )
}
