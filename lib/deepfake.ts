'use client'

/**
 * Deepfake Detection Client Utility
 *
 * Client-side wrapper for deepfake detection integration.
 * API keys are kept secure on the server.
 */

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

/**
 * Detect deepfakes in uploaded media files
 */
export async function detectDeepfake(
  file: File,
  demoMode?: boolean
): Promise<DeepfakeDetectionResponse> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    if (demoMode) {
      formData.append('demo_mode', 'true')
    }

    const response = await fetch('/api/deepfake', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
      message: 'Failed to connect to deepfake detection service',
    }
  }
}
