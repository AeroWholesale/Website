import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' })
  const { id, active } = req.body || {}
  if (!id || active === undefined) return res.status(400).json({ error: 'Missing id or active' })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    await pool.query('UPDATE users SET active = $1 WHERE id = $2', [active, id])
    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
