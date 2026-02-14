'use client'

import { useState } from 'react'
import { FiVideo, FiUpload, FiFileText, FiAlertTriangle, FiCheckCircle, FiArrowLeft, FiActivity, FiEye } from 'react-icons/fi'
import Link from 'next/link'

interface FrameAnalysis {
  frameNumber: number
  timestamp: string
  anomalyScore: number
  faceConsistency: number
}

interface AnalysisResult {
  isDeepfake: boolean
  confidence: number
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  videoFeatures: {
    faceSwapDetection: number
    lipSyncConsistency: number
    artifactDetection: number
    temporalCoherence: number
  }
  frameAnalysis: FrameAnalysis[]
  details: string
  recommendation: string
}

export default function VideoAnalysisPage() {
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

    // Simulate API call to Video Deepfake Analyst
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Mock analysis result
    const mockFrames: FrameAnalysis[] = Array.from({ length: 8 }, (_, i) => ({
      frameNumber: (i + 1) * 30,
      timestamp: `00:0${i}`,
      anomalyScore: Math.random() * 100,
      faceConsistency: Math.random() * 100,
    }))

    const mockResult: AnalysisResult = {
      isDeepfake: Math.random() > 0.6,
      confidence: Math.random() * 30 + 70,
      riskLevel: Math.random() > 0.7 ? 'HIGH' : Math.random() > 0.4 ? 'MEDIUM' : 'LOW',
      videoFeatures: {
        faceSwapDetection: Math.random() * 100,
        lipSyncConsistency: Math.random() * 100,
        artifactDetection: Math.random() * 100,
        temporalCoherence: Math.random() * 100,
      },
      frameAnalysis: mockFrames,
      details: Math.random() > 0.6
        ? 'Multiple frames show facial manipulation artifacts. Detected inconsistencies in lighting, facial boundaries, and temporal coherence across frames.'
        : 'Video analysis shows consistent facial features, natural lighting transitions, and proper temporal coherence. No significant manipulation detected.',
      recommendation: Math.random() > 0.6
        ? 'REJECT: High probability of deepfake video. Recommend in-person verification or alternative authentication method.'
        : 'APPROVE: Video authentication passed. No significant deepfake indicators detected. Proceed with verification.',
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
      <div className="bg-gradient-to-r from-orange-900 via-red-800 to-orange-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link
            href="/deepfake-detection"
            className="inline-flex items-center gap-2 text-orange-200 hover:text-white mb-4 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <FiVideo className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Video Deepfake Analysis</h1>
              <p className="text-orange-200 mt-2">Advanced frame-by-frame video authentication and deepfake detection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiUpload className="w-6 h-6 text-orange-600" />
              Upload Video File
            </h2>

            <div className="space-y-6">
              {/* File Upload */}
              <div>
                <label
                  htmlFor="video-upload"
                  className="block w-full border-2 border-dashed border-orange-300 rounded-xl p-12 text-center hover:border-orange-500 transition-colors cursor-pointer bg-orange-50/50"
                >
                  <FiFileText className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {file ? file.name : 'Click to upload video file'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Supports MP4, MOV, AVI, WEBM formats (Max 100MB)
                  </p>
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </label>
              </div>

              {/* File Info */}
              {file && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <FiFileText className="w-5 h-5 text-orange-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <p className="text-sm text-gray-600">Type: {file.type || 'video'}</p>
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
                    : 'bg-gradient-to-r from-orange-600 to-red-600 text-white hover:shadow-xl transform hover:scale-105'
                }`}
              >
                {isAnalyzing ? (
                  <span className="flex items-center justify-center gap-2">
                    <FiActivity className="w-5 h-5 animate-spin" />
                    Analyzing Video Frames...
                  </span>
                ) : (
                  'Analyze for Deepfake'
                )}
              </button>

              {/* Info Box */}
              <div className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-lg p-4">
                <p className="text-sm text-gray-700 font-medium">
                  <strong className="text-orange-900">BFSI Security:</strong> Advanced frame-by-frame
                  analysis using state-of-the-art ML models. All videos are encrypted during processing
                  and deleted immediately after analysis.
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-orange-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FiActivity className="w-6 h-6 text-orange-600" />
              Analysis Results
            </h2>

            {!result && !isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <FiVideo className="w-24 h-24 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">Upload and analyze a video file to see results</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <FiActivity className="w-24 h-24 text-orange-600 animate-spin" />
                </div>
                <p className="text-orange-900 font-semibold text-lg mt-6">Processing video frames...</p>
                <p className="text-gray-600 mt-2">Analyzing facial features and temporal coherence</p>
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
                        {result.isDeepfake ? 'Deepfake Detected' : 'Authentic Video'}
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

                {/* Video Features */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">
                    Video Analysis Metrics
                  </label>
                  <div className="space-y-3">
                    {Object.entries(result.videoFeatures).map(([key, value]) => (
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

                {/* Frame Analysis */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FiEye className="w-4 h-4" />
                    Frame-by-Frame Analysis
                  </label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden">
                    <div className="max-h-48 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gradient-to-r from-orange-100 to-red-100 sticky top-0">
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-bold text-gray-900">Frame</th>
                            <th className="px-3 py-2 text-left text-xs font-bold text-gray-900">Time</th>
                            <th className="px-3 py-2 text-right text-xs font-bold text-gray-900">Anomaly</th>
                            <th className="px-3 py-2 text-right text-xs font-bold text-gray-900">Face</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {result.frameAnalysis.map((frame) => (
                            <tr key={frame.frameNumber} className="hover:bg-orange-50">
                              <td className="px-3 py-2 text-gray-900 font-medium">#{frame.frameNumber}</td>
                              <td className="px-3 py-2 text-gray-600">{frame.timestamp}</td>
                              <td className="px-3 py-2 text-right">
                                <span
                                  className={`font-semibold ${
                                    frame.anomalyScore > 70
                                      ? 'text-red-600'
                                      : frame.anomalyScore > 40
                                      ? 'text-yellow-600'
                                      : 'text-green-600'
                                  }`}
                                >
                                  {frame.anomalyScore.toFixed(0)}%
                                </span>
                              </td>
                              <td className="px-3 py-2 text-right">
                                <span
                                  className={`font-semibold ${
                                    frame.faceConsistency < 30
                                      ? 'text-red-600'
                                      : frame.faceConsistency < 60
                                      ? 'text-yellow-600'
                                      : 'text-green-600'
                                  }`}
                                >
                                  {frame.faceConsistency.toFixed(0)}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="bg-gradient-to-r from-orange-100 to-red-100 border-2 border-orange-300 rounded-lg p-4">
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
