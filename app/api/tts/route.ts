import { NextRequest, NextResponse } from 'next/server'
import { ttsService } from '@/lib/tts'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, voice, speed, model } = body

    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      )
    }

    const result = await ttsService.generateSpeech({
      text,
      voice,
      speed,
      model,
    })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('TTS API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    if (action === 'voices') {
      const voices = await ttsService.listVoices()
      return NextResponse.json({ success: true, voices })
    }

    if (action === 'estimate' && searchParams.get('text')) {
      const text = searchParams.get('text') || ''
      const speed = parseFloat(searchParams.get('speed') || '1.0')
      const duration = ttsService.estimateDuration(text, speed)
      return NextResponse.json({ success: true, duration })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action parameter' },
      { status: 400 }
    )
  } catch (error) {
    console.error('TTS API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
