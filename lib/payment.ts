'use client'

/**
 * Payment Gateway Client Utility
 *
 * Client-side wrapper for payment gateway integration.
 * API keys are kept secure on the server.
 */

export interface PaymentResponse {
  success: boolean
  payment_url?: string
  message?: string
  error?: string
  timestamp?: string
}

/**
 * Get payment gateway URL from server
 */
export async function getPaymentUrl(): Promise<PaymentResponse> {
  try {
    const response = await fetch('/api/payment', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
      message: 'Failed to connect to payment gateway',
    }
  }
}

/**
 * Create payment session
 */
export async function createPaymentSession(
  amount?: number,
  description?: string,
  metadata?: Record<string, any>
): Promise<PaymentResponse> {
  try {
    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        description,
        metadata,
      }),
    })

    const data = await response.json()
    return data
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
      message: 'Failed to create payment session',
    }
  }
}
