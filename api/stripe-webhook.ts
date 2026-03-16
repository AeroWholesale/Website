import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'
import Stripe from 'stripe'
import crypto from 'crypto'

const sql = neon(process.env.DATABASE_URL!)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

async function sendPaymentReceivedEmail(dealerEmail: string, dealerName: string, refNumber: string): Promise<void> {
  const html = `
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
      <div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;font-size:18px;font-weight:800;">AeroWholesale</h2>
      </div>
      <div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
        <p style="font-size:15px;margin:0 0 6px;">Hi ${dealerName.split(' ')[0]},</p>
        <p style="font-size:15px;line-height:1.6;margin:0 0 20px;">
          Your payment has been received and processed successfully. Your order is now being prepared for shipment.
        </p>
        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:14px 18px;margin-bottom:20px;">
          <div style="font-size:13px;font-weight:700;color:#166534;">✓ Payment Received</div>
          <div style="font-size:12px;color:#64748b;margin-top:8px;">Reference: <strong>${refNumber}</strong></div>
        </div>
        <p style="font-size:13px;color:#64748b;line-height:1.6;">
          We'll send you shipping details and tracking information within 1-2 business days. If you have any questions, please reply to this email.
        </p>
        <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0 20px;">
        <p style="font-size:12px;color:#94a3b8;margin:0;line-height:1.6;">
          AeroWholesale &mdash; Refurbished Electronics Wholesale<br>
          <a href="mailto:sales@aerowholesale.com" style="color:#c2410c;">sales@aerowholesale.com</a>
        </p>
      </div>
    </div>
  `

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'AeroWholesale <sales@aerowholesale.com>',
      to: [dealerEmail],
      subject: `Payment Received — ${refNumber} | AeroWholesale`,
      html,
    }),
  })
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  let event: Stripe.Event
  try {
    const signature = req.headers['stripe-signature'] as string
    if (!signature) return res.status(400).json({ error: 'Missing stripe-signature' })

    // Get raw body for signature verification
    let rawBody = ''
    if (typeof req.body === 'string') {
      rawBody = req.body
    } else if (Buffer.isBuffer(req.body)) {
      rawBody = req.body.toString('utf-8')
    } else {
      rawBody = JSON.stringify(req.body)
    }

    event = stripe.webhooks.constructEvent(rawBody, signature, WEBHOOK_SECRET)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return res.status(400).json({ error: 'Invalid signature' })
  }

  try {
    // Handle checkout.session.completed
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      // Update quote payment status
      const quotes = await sql`
        SELECT * FROM quote_requests WHERE id = ${parseInt(session.metadata?.quoteId || '0')}
      `
      if (!quotes.length) {
        console.warn(`Quote not found for session ${session.id}`)
        return res.status(200).json({ success: true })
      }

      const quote = quotes[0]

      // Update payment record
      await sql`
        UPDATE quote_payments
        SET status = 'paid', stripe_payment_intent_id = ${session.payment_intent}, updated_at = NOW()
        WHERE stripe_session_id = ${session.id}
      `

      // Update quote status to payment_received
      await sql`
        UPDATE quote_requests
        SET status = 'payment_received', updated_at = NOW()
        WHERE id = ${quote.id}
      `

      // Track payment completion (server-side via Google Analytics Measurement Protocol)
      if (process.env.VITE_GA4_ID) {
        fetch('https://www.google-analytics.com/mp/collect', {
          method: 'POST',
          body: JSON.stringify({
            api_secret: process.env.GA4_API_SECRET || '',
            measurement_id: process.env.VITE_GA4_ID,
            event: {
              name: 'purchase',
              params: {
                transaction_id: session.payment_intent || session.id,
                value: quote.total_value,
                currency: 'USD',
                items: [{
                  item_name: `Quote #${quote.ref_number}`,
                  item_category: 'wholesale',
                  quantity: quote.total_units,
                  price: quote.total_value,
                }],
              },
            },
          }),
        }).catch(err => console.error('GA4 tracking failed:', err))
      }

      // Send payment confirmation email to dealer
      await sendPaymentReceivedEmail(quote.dealer_email, quote.dealer_name, quote.ref_number)
        .catch(err => console.error('Failed to send payment email:', err))

      // Send internal notification
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AeroWholesale <sales@aerowholesale.com>',
          to: ['isaac@aerowholesale.com', 'linda@aerowholesale.com'],
          subject: `💰 Payment Received — ${quote.ref_number}`,
          html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;"><div style="background:#132347;color:#fff;padding:20px;">AeroWholesale</div><div style="padding:20px;border:1px solid #e2e8f0;border-top:none;"><p>Payment received for <strong>${quote.ref_number}</strong> from <strong>${quote.company_name}</strong>.</p><p><strong>Amount:</strong> $${quote.total_value}</p><p><strong>Contact:</strong> ${quote.dealer_name} (${quote.dealer_email})</p><p>Order is ready for fulfillment.</p></div></div>`,
        }),
      }).catch(err => console.error('Failed to send internal notification:', err))
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Webhook processing error:', err)
    return res.status(500).json({ error: String(err) })
  }
}
