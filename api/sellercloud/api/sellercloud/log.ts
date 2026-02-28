import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const rows = await sql`
      SELECT id, method, path, body, raw, received_at
      FROM sc_webhook_log
      ORDER BY received_at DESC
      LIMIT 50
    `
    res.status(200).json({ count: rows.length, entries: rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not fetch log' })
  }
}
