import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS sc_log (
        id SERIAL PRIMARY KEY,
        method TEXT,
        path TEXT,
        body TEXT,
        received_at TIMESTAMPTZ DEFAULT NOW()
      )
    `

    await sql`
      INSERT INTO sc_log (method, path, body)
      VALUES (${req.method}, ${req.url}, ${JSON.stringify(req.body)})
    `

    // Respond like BigCommerce for every request
    res.status(200).json({
      data: [{ id: 1, name: "AeroWholesale", domain: "aerowholesale.com" }],
      meta: { pagination: { total: 1, count: 1, per_page: 50, current_page: 1, total_pages: 1 }}
    })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}