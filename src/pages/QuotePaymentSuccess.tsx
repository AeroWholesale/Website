import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'

export default function PaymentSuccessPage() {
  const [, setLocation] = useLocation()
  const [quoteId, setQuoteId] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setQuoteId(params.get('session_id'))
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#132347] mb-4">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your payment has been processed successfully. Your order is now being prepared for shipment.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-bold text-[#132347] mb-3">What's Next?</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span>We'll send you a confirmation email with order details</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span>Tracking information will be provided within 1-2 business days</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-3">✓</span>
              <span>You can view your order status in your portal</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setLocation('/portal')}
            className="flex-1 bg-[#c2410c] hover:bg-[#a01e09] text-white font-bold py-3 px-6 rounded transition"
          >
            View Portal
          </button>
          <button
            onClick={() => setLocation('/')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded transition"
          >
            Back to Home
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Questions? Contact us at <a href="mailto:sales@aerowholesale.com" className="text-[#c2410c] hover:underline">sales@aerowholesale.com</a>
        </p>
      </div>
    </div>
  )
}
