import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { loadStripe } from '@stripe/stripe-js'
import { trackUserAction } from '@/lib/event-tracker'

interface Quote {
  id: number
  ref_number: string
  company_name: string
  dealer_name: string
  total_units: number
  total_value: number
  items: Array<{
    productName?: string
    name?: string
    grade: string
    qty: number
    price: number
  }>
}

export default function PaymentPage() {
  const [, setLocation] = useLocation()
  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const queryParams = new URLSearchParams(window.location.search)
  const quoteId = queryParams.get('id')

  useEffect(() => {
    if (!quoteId) {
      setError('No quote ID provided')
      setLoading(false)
      return
    }

    // Fetch quote details
    fetch('/api/submit-quote')
      .then(res => res.json())
      .then(data => {
        const foundQuote = data.quotes.find((q: Quote) => q.id === parseInt(quoteId))
        if (!foundQuote) {
          setError('Quote not found')
          return
        }
        if (foundQuote.status !== 'confirmed') {
          setError('This quote is not confirmed for payment')
          return
        }
        setQuote(foundQuote)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [quoteId])

  const handlePayment = async () => {
    if (!quote) return

    setProcessing(true)
    try {
      // Track payment initiation
      trackUserAction('payment_initiation', {
        quote_id: quote.id,
        quote_value: quote.total_value,
        ref_number: quote.ref_number,
      })

      const res = await fetch('/api/stripe-create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quoteId: quote.id }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to create checkout session')
      }

      const { sessionId } = await res.json()

      // Redirect to Stripe checkout
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
      if (!stripe) throw new Error('Failed to load Stripe')

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
      if (stripeError) throw stripeError
    } catch (err: any) {
      setError(err.message || 'Payment failed')
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c2410c] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading quote details...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-lg font-bold text-red-900 mb-2">Payment Error</h2>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => setLocation('/portal')}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          >
            Back to Portal
          </button>
        </div>
      </div>
    )
  }

  if (!quote) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-[#132347] mb-2">Complete Payment</h1>
        <p className="text-gray-600 mb-8">Quote Reference: <span className="font-mono font-bold">{quote.ref_number}</span></p>

        <div className="border-t border-gray-200 py-8">
          <h2 className="text-xl font-bold text-[#132347] mb-4">Order Summary</h2>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Company:</span>
              <span className="font-semibold text-[#132347]">{quote.company_name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Contact:</span>
              <span className="font-semibold text-[#132347]">{quote.dealer_name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-700">Total Units:</span>
              <span className="font-semibold text-[#132347]">{quote.total_units}</span>
            </div>
            <div className="border-t border-gray-200 pt-4 flex justify-between">
              <span className="text-lg font-bold text-[#132347]">Total Amount:</span>
              <span className="text-2xl font-bold text-[#c2410c]">${quote.total_value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-bold text-[#132347] mb-3">Line Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="text-left p-3">Product</th>
                    <th className="text-left p-3">Grade</th>
                    <th className="text-center p-3">Qty</th>
                    <th className="text-right p-3">Unit Price</th>
                    <th className="text-right p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                      <td className="p-3">{item.productName || item.name || 'Product'}</td>
                      <td className="p-3">{item.grade || '-'}</td>
                      <td className="text-center p-3 font-semibold">{item.qty}</td>
                      <td className="text-right p-3">${item.price.toFixed(2)}</td>
                      <td className="text-right p-3 font-semibold">${(item.price * item.qty).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Secure Payment:</strong> Your payment will be processed securely through Stripe. We accept all major credit cards and debit cards.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setLocation('/portal')}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded transition"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={processing}
              className="flex-1 bg-[#c2410c] hover:bg-[#a01e09] disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded transition"
            >
              {processing ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
