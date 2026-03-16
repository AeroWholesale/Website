import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'
import Stripe from 'stripe'

const sql = neon(process.env.DATABASE_URL!)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerowholesale.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { quoteId } = req.body || {}
  if (!quoteId) return res.status(400).json({ error: 'Missing quoteId' })

  try {
    // Fetch quote details
    const quotes = await sql`SELECT * FROM quote_requests WHERE id = ${quoteId}`
    if (!quotes.length) return res.status(404).json({ error: 'Quote not found' })

    const quote = quotes[0]
    if (quote.status !== 'confirmed') {
      return res.status(400).json({ error: 'Quote must be confirmed to proceed with payment' })
    }

    // Check if payment already started (metadata prevents duplicate sessions)
    const existingSessions = await sql`
      SELECT stripe_session_id FROM quote_payments
      WHERE quote_id = ${quoteId} AND status IN ('pending', 'paid')
    `
    if (existingSessions.length) {
      return res.status(400).json({ error: 'Payment already in progress for this quote' })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Quote #${quote.ref_number}`,
              description: `${quote.total_units} units from ${quote.company_name}`,
              metadata: {
                quoteId: quoteId.toString(),
                refNumber: quote.ref_number,
              },
            },
            unit_amount: Math.round(quote.total_value * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${SITE_URL}/quote-payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/quote-payment-cancel?quoteId=${quoteId}`,
      customer_email: quote.dealer_email,
      metadata: {
        quoteId: quoteId.toString(),
        refNumber: quote.ref_number,
      },
    })

    // Store session in database
    await sql`
      CREATE TABLE IF NOT EXISTS quote_payments (
        id SERIAL PRIMARY KEY,
        quote_id INTEGER NOT NULL,
        stripe_session_id TEXT NOT NULL UNIQUE,
        stripe_payment_intent_id TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        amount NUMERIC(10,2) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`
      INSERT INTO quote_payments (quote_id, stripe_session_id, amount, status)
      VALUES (${quoteId}, ${session.id}, ${quote.total_value}, 'pending')
    `

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      clientSecret: session.client_secret
    })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return res.status(500).json({ error: String(err) })
  }
}
