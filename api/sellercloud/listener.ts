import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS sc_webhook_log (
      id        SERIAL PRIMARY KEY,
      method    TEXT,
      path      TEXT,
      headers   JSONB,
      body      JSONB,
      raw       TEXT,
      received_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await ensureTable()

    const entry = {
      method: req.method,
      path: req.url,
      headers: req.headers,
      body: req.body || null,
      raw: JSON.stringify(req.body),
    }

    await sql`
      INSERT INTO sc_webhook_log (method, path, headers, body, raw)
      VALUES (
        ${entry.method},
        ${entry.path},
        ${JSON.stringify(entry.headers)},
        ${JSON.stringify(entry.body)},
        ${entry.raw}
      )
    `

    res.status(200).json({
      data: { id: 1, sku: req.body?.sku || 'received' },
      meta: { pagination: { total: 1, count: 1, per_page: 50, current_page: 1, total_pages: 1 } }
    })

  } catch (err) {
    console.error('Listener error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
}
