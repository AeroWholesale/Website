// api/submit-quote.ts
// GET  — returns all quote requests (admin)
// POST — dealer submits a new quote, triggers internal email alert
// PATCH — admin updates status, triggers dealer notification email

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'
import {
  sendInternalQuoteAlert,
  sendQuoteConfirmedEmail,
  sendQuoteProcessingEmail,
  sendQuoteDeclinedEmail,
  DECLINE_REASONS,
  type QuoteEmailData,
} from '../lib/quote-emails'

const sql = neon(process.env.DATABASE_URL!)

// ── DB bootstrap ──────────────────────────────────────────────────────────

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS quote_requests (
      id            SERIAL PRIMARY KEY,
      ref_number    TEXT NOT NULL UNIQUE,
      dealer_email  TEXT NOT NULL,
      dealer_name   TEXT NOT NULL,
      company_name  TEXT NOT NULL,
      items         JSONB NOT NULL DEFAULT '[]',
      notes         TEXT,
      total_units   INTEGER NOT NULL DEFAULT 0,
      total_value   NUMERIC(10,2) NOT NULL DEFAULT 0,
      status        TEXT NOT NULL DEFAULT 'pending',
      decline_reason TEXT,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
}

function generateRef(): string {
  return 'QR-' + Math.random().toString(36).toUpperCase().slice(2, 8)
}

// ── Handler ───────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  await ensureTable()

  // ── GET: all quotes for admin ──────────────────────────────────────────
  if (req.method === 'GET') {
    const quotes = await sql`
      SELECT * FROM quote_requests ORDER BY created_at DESC
    `
    return res.status(200).json({ quotes })
  }

  // ── POST: dealer submits a quote ───────────────────────────────────────
  if (req.method === 'POST') {
    const { items, notes, dealerEmail, dealerName, companyName } = req.body || {}

    if (!items?.length || !dealerEmail || !dealerName || !companyName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const refNumber  = generateRef()
    const totalUnits = items.reduce((sum: number, i: any) => sum + (i.qty || 0), 0)
    const totalValue = items.reduce((sum: number, i: any) => sum + ((i.price || 0) * (i.qty || 0)), 0)

    // Insert into DB
    await sql`
      INSERT INTO quote_requests
        (ref_number, dealer_email, dealer_name, company_name, items, notes, total_units, total_value)
      VALUES
        (${refNumber}, ${dealerEmail}, ${dealerName}, ${companyName},
         ${JSON.stringify(items)}, ${notes || null}, ${totalUnits}, ${totalValue})
    `

    // Send internal alert to Zack + Linda (non-blocking — don't fail the request if email fails)
    const emailData: QuoteEmailData = {
      refNumber, dealerEmail, dealerName, companyName,
      items, notes, totalUnits, totalValue,
    }
    sendInternalQuoteAlert(emailData).catch(err =>
      console.error('[quote-emails] internal alert failed:', err)
    )

    return res.status(200).json({ success: true, refNumber })
  }

  // ── PATCH: admin updates status ────────────────────────────────────────
  if (req.method === 'PATCH') {
    const { id, status, declineReason } = req.body || {}

    if (!id || !status) {
      return res.status(400).json({ error: 'Missing id or status' })
    }

    const validStatuses = ['pending', 'confirmed', 'processing', 'declined']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' })
    }

    if (status === 'declined' && declineReason && !DECLINE_REASONS[declineReason]) {
      return res.status(400).json({ error: 'Invalid decline reason' })
    }

    // Update DB
    await sql`
      UPDATE quote_requests
      SET status = ${status},
          decline_reason = ${declineReason || null},
          updated_at = NOW()
      WHERE id = ${id}
    `

    // Fetch full quote to populate email
    const rows = await sql`SELECT * FROM quote_requests WHERE id = ${id}`
    if (!rows.length) return res.status(404).json({ error: 'Quote not found' })

    const q = rows[0]
    const emailData: QuoteEmailData = {
      refNumber:   q.ref_number,
      dealerEmail: q.dealer_email,
      dealerName:  q.dealer_name,
      companyName: q.company_name,
      items:       q.items,
      notes:       q.notes,
      totalUnits:  q.total_units,
      totalValue:  Number(q.total_value),
    }

    // Send dealer notification based on new status (non-blocking)
    if (status === 'confirmed') {
      sendQuoteConfirmedEmail(emailData).catch(err =>
        console.error('[quote-emails] confirmed email failed:', err)
      )
    } else if (status === 'processing') {
      sendQuoteProcessingEmail(emailData).catch(err =>
        console.error('[quote-emails] processing email failed:', err)
      )
    } else if (status === 'declined') {
      sendQuoteDeclinedEmail(emailData, declineReason || 'other').catch(err =>
        console.error('[quote-emails] declined email failed:', err)
      )
    }
    // Note: resetting to 'pending' intentionally sends no email

    return res.status(200).json({ success: true })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}