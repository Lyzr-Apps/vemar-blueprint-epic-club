'use client'

import { useState } from 'react'
import { FiMic, FiUpload, FiFileText, FiAlertTriangle, FiCheckCircle, FiArrowLeft, FiActivity } from 'react-icons/fi'
import Link from 'next/link'

interface AnalysisResult {
  isDeepfake: boolean
  confidence: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  audioFeatures: {
    spectralAnomaly: number
    voicePrintConsistency: number
    artificialMarkers: number
    pitchVariation: number
  }
  details: string
  recommendation: string
}

export default function VoiceAnalysisPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResult(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setIsAnalyzing(true)
    setResult(null)

    // Simulate API call to Voice Deepfake Analyst
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Mock analysis result
    const mockResult: AnalysisResult = {
      isDeepfake: Math.random() > 0.7,
      confidence: Math.random() * 30 + 70,
      riskLevel: Math.random() > 0.7 ? 'HIGH' : Math.random() > 0.4 ? 'MEDIUM' : 'LOW',
      audioFeatures: {
        spectralAnomaly: Math.random() * 100,
        voicePrintConsistency: Math.random() * 100,
        artificialMarkers: Math.random() * 100,
        pitchVariation: Math.random() * 100,
      },
      details: Math.random() > 0.7
        ? 'AI-generated voice patterns detected with high probability of synthetic audio manipulation.'
        : 'Voice patterns consistent with authentic human speech. No significant anomalies detected.',
      recommendation: Math.random() > 0.7
        ? 'REJECT: High risk of deepfake. Recommend additional verification through secondary channels.'
        : 'APPROVE: Voice authentication passed. Proceed with standard verification protocols.',
    }

    setResult(mockResult)
    setIsAnalyzing(false)
  }

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
              <FiMic className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Voice Deepfake Analysis</h1>
              <p className="text-amber-200 mt-2">AI-powered voice authentication and deepfake detection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiUpload className="w-6 h-6 text-amber-600" />
              Upload Audio File
            </h2>

            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label
                  htmlFor="audio-upload"
                  className="block w-full border-2 border-dashed border-amber-300 rounded-xl p-12 text-center hover:border-amber-500 transition-colors cursor-pointer bg-amber-50/50"
                >
                  <FiFileText className="w-16 h-16 text-amber-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {file ? file.name : 'Click to upload audio file'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Supports MP3, WAV, M4A, OGG formats (Max 50MB)
                  </p>
                  <input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>

              {/* File Info */}
              {file && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FiFileText className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-sm text-gray-600">Type: {file.type || 'audio'}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Analyze Button */}
              <button
                onClick={handleAnalyze}
                disabled={!file || isAnalyzing}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                  !file || isAnalyzing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <FiActivity className="w-5 h-5 animate-spin" />
                    Analyzing Voice Patterns...
                  </span>
                ) : (
                  'Analyze for Deepfake'
                )}
              </button>

              {/* Info Box */}
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-lg p-4">
                <p className="text-sm text-gray-700 font-medium">
                  <strong className="text-amber-900">BFSI Security:</strong> All audio files are analyzed
                  in real-time using advanced ML models. Files are encrypted during transit and never
                  stored permanently after analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-amber-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiActivity className="w-6 h-6 text-amber-600" />
              Analysis Results
            </h2>

            {!result && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <FiMic className="w-24 h-24 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Upload and analyze an audio file to see results</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <FiActivity className="w-24 h-24 text-amber-600 animate-spin" />
                </div>
                <p className="text-amber-900 font-semibold text-lg mt-6">Analyzing voice patterns...</p>
                <p className="text-gray-600 mt-2">This may take a few moments</p>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                {/* Verdict */}
                <div
                  className={`border-2 rounded-xl p-6 ${
                    result.isDeepfake
                      ? 'bg-red-50 border-red-300'
                      : 'bg-green-50 border-green-300'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    {result.isDeepfake ? (
                      <FiAlertTriangle className="w-12 h-12 text-red-600" />
                    ) : (
                      <FiCheckCircle className="w-12 h-12 text-green-600" />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {result.isDeepfake ? 'Deepfake Detected' : 'Authentic Voice'}
                      </h3>
                      <p className="text-sm text-gray-700 mt-1">
                        Confidence: <strong>{result.confidence.toFixed(1)}%</strong>
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800">{result.details}</p>
                </div>

                {/* Risk Level */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Risk Assessment</label>
                  <div className={`border-2 rounded-lg px-4 py-3 font-bold ${getRiskColor(result.riskLevel)}`}>
                    {result.riskLevel} RISK
                  </div>
                </div>

                {/* Audio Features */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Voice Analysis Metrics
                  </label>
                  <div className="space-y-3">
                    {Object.entries(result.audioFeatures).map(([key, value]) => (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-sm font-semibold text-gray-900">{value.toFixed(1)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              value > 70 ? 'bg-red-600' : value > 40 ? 'bg-yellow-600' : 'bg-green-600'
                            }`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Recommendation</h4>
                  <p className="text-sm text-gray-800">{result.recommendation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
