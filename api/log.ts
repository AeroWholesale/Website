import type { VercelRequest, VercelResponse } from '@vercel/node'
import { sql } from '@vercel/postgres'

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

    res.status(200).json({ success: true })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}