import { NextRequest, NextResponse } from 'next/server'

const LYZR_PAYMENT_URL = 'https://pay.lyzr.ai'
const LYZR_API_KEY = process.env.LYZR_API_KEY || ''

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, description, user_id, session_id, metadata } = body

    if (!LYZR_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: 'LYZR_API_KEY not configured on server',
          message: 'Payment gateway configuration error',
        },
        { status: 500 }
      )
    }

    // For now, return the payment URL directly
    // In production, you would integrate with Lyzr's payment API
    return NextResponse.json({
      success: true,
      payment_url: LYZR_PAYMENT_URL,
      message: 'Payment URL generated successfully',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Server error'
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
        message: 'Failed to process payment request',
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    payment_url: LYZR_PAYMENT_URL,
    message: 'Payment gateway is available',
    timestamp: new Date().toISOString(),
  })
}
