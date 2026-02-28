import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS sc_log (
        id SERIAL PRIMARY KEY,
        method TEXT,
        body TEXT,
        received_at TIMESTAMPTZ DEFAULT NOW()
      )
    `
    if (req.method === 'POST') {
      await sql`
        INSERT INTO sc_log (method, body)
        VALUES (${req.method}, ${JSON.stringify(req.body)})
      `
      res.status(200).json({ success: true })
    } else {
      const rows = await sql`SELECT * FROM sc_log ORDER BY received_at DESC LIMIT 20`
      res.status(200).json({ count: rows.length, entries: rows })
    }
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
