import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'

export default function PaymentCancelPage() {
  const [, setLocation] = useLocation()
  const [quoteId, setQuoteId] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setQuoteId(params.get('quoteId'))
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-white rounded-lg shadow-lg p-12 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#132347] mb-4">Payment Cancelled</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your payment was not processed. Your quote remains confirmed and ready for payment whenever you're ready.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-bold text-[#132347] mb-3">Your Options</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-yellow-600 font-bold mr-3">→</span>
              <span>Retry payment by returning to your quote</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 font-bold mr-3">→</span>
              <span>Contact our sales team for alternative payment methods</span>
            </li>
            <li className="flex items-start">
              <span className="text-yellow-600 font-bold mr-3">→</span>
              <span>View your quote details in your portal</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          {quoteId && (
            <button
              onClick={() => setLocation(`/quote-payment?id=${quoteId}`)}
              className="flex-1 bg-[#c2410c] hover:bg-[#a01e09] text-white font-bold py-3 px-6 rounded transition"
            >
              Try Payment Again
            </button>
          )}
          <button
            onClick={() => setLocation('/portal')}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded transition"
          >
            View Portal
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Having trouble? Contact us at <a href="mailto:sales@aerowholesale.com" className="text-[#c2410c] hover:underline">sales@aerowholesale.com</a>
        </p>
      </div>
    </div>
  )
}
