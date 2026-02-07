'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { FiCreditCard, FiDollarSign, FiCheckCircle, FiAlertCircle, FiLoader } from 'react-icons/fi'
import { SiPaypal, SiRazorpay } from 'react-icons/si'

export type PaymentGateway = 'paypal' | 'razorpay' | 'upi'

interface PaymentGatewayProps {
  amount: number
  requestId: string
  clientName: string
  clientEmail: string
  onSuccess?: (paymentData: any) => void
  onError?: (error: any) => void
}

export function PaymentGateway({
  amount,
  requestId,
  clientName,
  clientEmail,
  onSuccess,
  onError
}: PaymentGatewayProps) {
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway>('razorpay')
  const [processing, setProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [customAmount, setCustomAmount] = useState(amount.toString())
  const [upiId, setUpiId] = useState('')

  const handlePayment = async () => {
    setProcessing(true)
    setPaymentStatus('idle')

    try {
      const paymentAmount = parseFloat(customAmount)

      if (isNaN(paymentAmount) || paymentAmount <= 0) {
        throw new Error('Invalid payment amount')
      }

      // Call the payment API based on selected gateway
      const response = await fetch('/api/payments/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gateway: selectedGateway,
          amount: paymentAmount,
          requestId,
          clientName,
          clientEmail,
          upiId: selectedGateway === 'upi' ? upiId : undefined
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Payment initiation failed')
      }

      // Handle different gateway responses
      if (selectedGateway === 'paypal') {
        // Redirect to PayPal
        if (data.approvalUrl) {
          window.location.href = data.approvalUrl
        }
      } else if (selectedGateway === 'razorpay') {
        // Open Razorpay checkout
        const options = {
          key: data.key,
          amount: data.amount,
          currency: data.currency,
          name: 'Multi-Agent Request Manager',
          description: `Payment for Request #${requestId}`,
          order_id: data.orderId,
          prefill: {
            name: clientName,
            email: clientEmail,
          },
          theme: {
            color: '#3b82f6',
          },
          handler: function (response: any) {
            verifyPayment(response)
          },
        }

        if (typeof window !== 'undefined' && (window as any).Razorpay) {
          const rzp = new (window as any).Razorpay(options)
          rzp.open()
        }
      } else if (selectedGateway === 'upi') {
        // Generate UPI payment link
        setPaymentStatus('success')
        onSuccess?.(data)
      }

      setProcessing(false)
    } catch (error: any) {
      setPaymentStatus('error')
      setProcessing(false)
      onError?.(error)
      console.error('Payment error:', error)
    }
  }

  const verifyPayment = async (response: any) => {
    try {
      const verifyResponse = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...response,
          requestId,
        }),
      })

      const data = await verifyResponse.json()

      if (data.success) {
        setPaymentStatus('success')
        onSuccess?.(data)
      } else {
        setPaymentStatus('error')
        onError?.(new Error('Payment verification failed'))
      }
    } catch (error) {
      setPaymentStatus('error')
      onError?.(error)
    }
  }

  const getGatewayIcon = (gateway: PaymentGateway) => {
    switch (gateway) {
      case 'paypal':
        return <SiPaypal className="h-5 w-5" />
      case 'razorpay':
        return <SiRazorpay className="h-5 w-5" />
      case 'upi':
        return <FiDollarSign className="h-5 w-5" />
    }
  }

  const getGatewayName = (gateway: PaymentGateway) => {
    switch (gateway) {
      case 'paypal':
        return 'PayPal'
      case 'razorpay':
        return 'Razorpay'
      case 'upi':
        return 'UPI'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FiCreditCard className="h-5 w-5" />
          Payment Gateway
        </CardTitle>
        <CardDescription>
          Complete your payment securely using PayPal, Razorpay, or UPI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Payment Gateway Selection */}
        <div className="space-y-2">
          <Label>Select Payment Method</Label>
          <div className="grid grid-cols-3 gap-3">
            {(['paypal', 'razorpay', 'upi'] as PaymentGateway[]).map((gateway) => (
              <button
                key={gateway}
                type="button"
                onClick={() => setSelectedGateway(gateway)}
                className={`p-4 border-2 rounded-lg flex flex-col items-center gap-2 transition-all ${
                  selectedGateway === gateway
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {getGatewayIcon(gateway)}
                <span className="text-sm font-medium">{getGatewayName(gateway)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div className="space-y-2">
          <Label htmlFor="amount">Payment Amount</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="pl-8"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* UPI ID Input (only shown for UPI) */}
        {selectedGateway === 'upi' && (
          <div className="space-y-2">
            <Label htmlFor="upiId">UPI ID (Optional)</Label>
            <Input
              id="upiId"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@upi"
            />
            <p className="text-xs text-gray-500">
              Leave blank to generate a UPI payment QR code
            </p>
          </div>
        )}

        {/* Payment Summary */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Request ID:</span>
            <span className="font-medium">#{requestId}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Payment Method:</span>
            <Badge variant="outline">{getGatewayName(selectedGateway)}</Badge>
          </div>
          <div className="flex justify-between text-sm border-t pt-2 mt-2">
            <span className="text-gray-600 font-medium">Total Amount:</span>
            <span className="font-bold text-lg">${customAmount}</span>
          </div>
        </div>

        {/* Payment Status */}
        {paymentStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <FiCheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-900">Payment Successful!</p>
              <p className="text-sm text-green-700">Your payment has been processed successfully.</p>
            </div>
          </div>
        )}

        {paymentStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
            <FiAlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-900">Payment Failed</p>
              <p className="text-sm text-red-700">Please try again or use a different payment method.</p>
            </div>
          </div>
        )}

        {/* Payment Button */}
        <Button
          onClick={handlePayment}
          disabled={processing || paymentStatus === 'success'}
          className="w-full gap-2"
          size="lg"
        >
          {processing ? (
            <>
              <FiLoader className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : paymentStatus === 'success' ? (
            <>
              <FiCheckCircle className="h-4 w-4" />
              Payment Complete
            </>
          ) : (
            <>
              <FiCreditCard className="h-4 w-4" />
              Pay ${customAmount}
            </>
          )}
        </Button>

        <p className="text-xs text-center text-gray-500">
          Your payment information is securely processed. We never store your payment details.
        </p>
      </CardContent>
    </Card>
  )
}
