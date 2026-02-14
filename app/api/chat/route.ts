import { NextRequest, NextResponse } from 'next/server'
import { ragService } from '@/lib/rag'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, conversationHistory, maxResults, temperature } = body

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      )
    }

    const result = await ragService.chat({
      message,
      conversationHistory,
      maxResults,
      temperature,
    })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Chat API error:', error)
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

    if (action === 'documents') {
      const documents = await ragService.getDocuments()
      return NextResponse.json({ success: true, documents })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action parameter. Use: documents' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
