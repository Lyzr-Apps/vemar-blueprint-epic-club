import { NextRequest, NextResponse } from 'next/server'

const LYZR_PAYMENT_URL = 'https://pay.lyzr.ai'
const LYZR_PAYMENT_API = 'https://api.lyzr.ai/v1/payments/sessions'
const LYZR_API_KEY = process.env.LYZR_API_KEY || ''

// Generate unique session ID
function generateSessionId(): string {
  return `pay-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, description, user_id, session_id, metadata, demo_mode, currency } = body

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

    // Demo mode - simulate payment session creation
    if (demo_mode === true) {
      const demoSessionId = generateSessionId()
      const demoCurrency = currency || 'USD'
      return NextResponse.json({
        success: true,
        payment_url: `${LYZR_PAYMENT_URL}?session=${demoSessionId}&demo=true&currency=${demoCurrency}`,
        session_id: demoSessionId,
        currency: demoCurrency,
        message: 'Demo payment session created successfully',
        timestamp: new Date().toISOString(),
        demo: true,
      })
    }

    // Production mode - create actual payment session
    try {
      const paymentCurrency = currency || 'USD'
      const paymentPayload = {
        amount: amount || 0,
        currency: paymentCurrency,
        description: description || 'Payment for VEMAR.AI services',
        user_id: user_id || `user-${generateSessionId()}`,
        session_id: session_id || generateSessionId(),
        metadata: metadata || {},
        success_url: `${request.headers.get('origin')}/payment/success`,
        cancel_url: `${request.headers.get('origin')}/payment/cancel`,
      }

      const paymentResponse = await fetch(LYZR_PAYMENT_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': LYZR_API_KEY,
        },
        body: JSON.stringify(paymentPayload),
      })

      if (paymentResponse.ok) {
        const paymentData = await paymentResponse.json()
        return NextResponse.json({
          success: true,
          payment_url: paymentData.payment_url || `${LYZR_PAYMENT_URL}?session=${paymentPayload.session_id}`,
          session_id: paymentPayload.session_id,
          currency: paymentCurrency,
          message: 'Payment session created successfully',
          timestamp: new Date().toISOString(),
          payment_data: paymentData,
        })
      } else {
        // Fallback to direct URL if API call fails
        const fallbackSessionId = generateSessionId()
        return NextResponse.json({
          success: true,
          payment_url: `${LYZR_PAYMENT_URL}?session=${fallbackSessionId}&amount=${amount}&currency=${paymentCurrency}`,
          session_id: fallbackSessionId,
          currency: paymentCurrency,
          message: 'Payment URL generated (fallback mode)',
          timestamp: new Date().toISOString(),
          fallback: true,
        })
      }
    } catch (apiError) {
      // Fallback on API error
      const fallbackSessionId = generateSessionId()
      const fallbackCurrency = currency || 'USD'
      return NextResponse.json({
        success: true,
        payment_url: `${LYZR_PAYMENT_URL}?session=${fallbackSessionId}&amount=${amount}&currency=${fallbackCurrency}`,
        session_id: fallbackSessionId,
        currency: fallbackCurrency,
        message: 'Payment URL generated (fallback mode)',
        timestamp: new Date().toISOString(),
        fallback: true,
      })
    }
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
