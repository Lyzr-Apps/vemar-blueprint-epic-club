import { NextRequest, NextResponse } from 'next/server'
import { textModelService } from '@/lib/textModel'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, task, options } = body

    if (!text) {
      return NextResponse.json(
        { success: false, error: 'Text is required' },
        { status: 400 }
      )
    }

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task is required' },
        { status: 400 }
      )
    }

    const validTasks = ['summarize', 'translate', 'paraphrase', 'complete', 'analyze', 'extract']
    if (!validTasks.includes(task)) {
      return NextResponse.json(
        { success: false, error: `Invalid task. Must be one of: ${validTasks.join(', ')}` },
        { status: 400 }
      )
    }

    const result = await textModelService.processText({
      text,
      task,
      options,
    })

    if (!result.success) {
      return NextResponse.json(result, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Text Model API error:', error)
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

    if (action === 'models') {
      const models = await textModelService.listModels()
      return NextResponse.json({ success: true, models })
    }

    if (action === 'tasks') {
      const tasks = await textModelService.listSupportedTasks()
      return NextResponse.json({ success: true, tasks })
    }

    if (action === 'languages') {
      const languages = await textModelService.listSupportedLanguages()
      return NextResponse.json({ success: true, languages })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action parameter. Use: models, tasks, or languages' },
      { status: 400 }
    )
  } catch (error) {
    console.error('Text Model API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    )
  }
}
