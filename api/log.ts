import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sc_log (
        id SERIAL PRIMARY KEY,
        method TEXT,
        path TEXT,
        body TEXT,
        received_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await pool.query(
      'INSERT INTO sc_log (method, path, body) VALUES ($1, $2, $3)',
      [req.method, req.url, JSON.stringify(req.body)]
    )

    res.status(200).json({ success: true })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}