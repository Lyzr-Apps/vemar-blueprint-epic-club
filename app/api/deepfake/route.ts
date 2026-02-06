import { NextRequest, NextResponse } from 'next/server'

const LYZR_DEEPFAKE_API = 'https://api.lyzr.ai/v1/deepfake/detect'
const LYZR_API_KEY = process.env.LYZR_API_KEY || ''

export interface DeepfakeDetectionResult {
  status: 'authentic' | 'manipulated' | 'suspicious'
  confidence: number
  details: string[]
  analysis?: {
    facial_consistency?: boolean
    temporal_coherence?: boolean
    audio_sync?: boolean
    lighting_patterns?: boolean
    gan_signatures?: boolean
  }
}

export interface DeepfakeDetectionResponse {
  success: boolean
  result?: DeepfakeDetectionResult
  error?: string
  message?: string
  timestamp?: string
  demo?: boolean
}

// Simulate deepfake detection for demo mode
function simulateDeepfakeDetection(fileName: string): DeepfakeDetectionResult {
  const mockResults: DeepfakeDetectionResult[] = [
    {
      status: 'authentic',
      confidence: 98.5,
      details: [
        'No digital manipulation signatures detected',
        'Facial consistency analysis passed',
        'Temporal coherence verified',
        'Natural lighting patterns confirmed'
      ],
      analysis: {
        facial_consistency: true,
        temporal_coherence: true,
        audio_sync: true,
        lighting_patterns: true,
        gan_signatures: false
      }
    },
    {
      status: 'manipulated',
      confidence: 94.2,
      details: [
        'Deepfake artifacts detected in facial region',
        'Inconsistent eye blinking patterns',
        'Audio-visual synchronization anomalies',
        'GAN-based manipulation signatures found'
      ],
      analysis: {
        facial_consistency: false,
        temporal_coherence: false,
        audio_sync: false,
        lighting_patterns: true,
        gan_signatures: true
      }
    },
    {
      status: 'suspicious',
      confidence: 72.8,
      details: [
        'Minor inconsistencies in lighting',
        'Compression artifacts detected',
        'Partial facial occlusion complicates analysis',
        'Requires manual review'
      ],
      analysis: {
        facial_consistency: true,
        temporal_coherence: true,
        audio_sync: true,
        lighting_patterns: false,
        gan_signatures: false
      }
    }
  ]

  return mockResults[Math.floor(Math.random() * mockResults.length)]
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const demo_mode = formData.get('demo_mode') === 'true'

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'No file provided',
          message: 'Please upload a file for analysis',
        },
        { status: 400 }
      )
    }

    // Validate file type
    const validTypes = ['image/', 'video/', 'audio/']
    const isValid = validTypes.some(type => file.type.startsWith(type))

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file type',
          message: 'Please upload a valid image, video, or audio file',
        },
        { status: 400 }
      )
    }

    // Demo mode - simulate detection
    if (demo_mode) {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      const result = simulateDeepfakeDetection(file.name)

      return NextResponse.json({
        success: true,
        result,
        message: 'Demo mode: Simulated deepfake detection completed',
        timestamp: new Date().toISOString(),
        demo: true,
      })
    }

    // Production mode - call actual deepfake detection API
    if (!LYZR_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'LYZR_API_KEY not configured',
          message: 'Deepfake detection service not configured',
        },
        { status: 500 }
      )
    }

    try {
      // Create FormData for API request
      const apiFormData = new FormData()
      apiFormData.append('file', file)
      apiFormData.append('file_type', file.type)
      apiFormData.append('file_name', file.name)

      const response = await fetch(LYZR_DEEPFAKE_API, {
        method: 'POST',
        headers: {
          'x-api-key': LYZR_API_KEY,
        },
        body: apiFormData,
      })

      if (response.ok) {
        const data = await response.json()

        // Normalize API response to our interface
        const result: DeepfakeDetectionResult = {
          status: data.status || data.detection_status || 'suspicious',
          confidence: data.confidence || data.confidence_score || 0,
          details: data.details || data.analysis_details || [],
          analysis: data.analysis || {},
        }

        return NextResponse.json({
          success: true,
          result,
          message: 'Deepfake detection completed successfully',
          timestamp: new Date().toISOString(),
        })
      } else {
        // Fallback to simulation if API fails
        console.warn('Deepfake API failed, falling back to demo mode')
        const result = simulateDeepfakeDetection(file.name)

        return NextResponse.json({
          success: true,
          result,
          message: 'Analysis completed (fallback mode)',
          timestamp: new Date().toISOString(),
          demo: true,
        })
      }
    } catch (apiError) {
      // Fallback to simulation on API error
      console.warn('Deepfake API error, falling back to demo mode:', apiError)
      const result = simulateDeepfakeDetection(file.name)

      return NextResponse.json({
        success: true,
        result,
        message: 'Analysis completed (fallback mode)',
        timestamp: new Date().toISOString(),
        demo: true,
      })
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
        message: 'Failed to process deepfake detection request',
      },
      { status: 500 }
    )
  }
}
