import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const token = req.query.token as string
  if (!token) return res.status(400).json({ error: 'Missing token' })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows } = await pool.query(`
      SELECT t.signed_at, a.first_name, a.last_name, a.company_name, a.email, a.account_type
      FROM tc_tokens t
      JOIN applications a ON a.id = t.application_id
      WHERE t.token = $1
    `, [token])
    if (!rows.length) return res.status(404).json({ error: 'Invalid token' })
    res.status(200).json(rows[0])
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}