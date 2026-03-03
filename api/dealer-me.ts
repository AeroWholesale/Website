import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim()
  if (!token) return res.status(401).json({ error: 'No token' })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows } = await pool.query(`
      SELECT u.id, u.email, u.first_name, u.last_name, u.company_name, u.account_type, u.active
      FROM sessions s JOIN users u ON u.id = s.user_id
      WHERE s.token = $1 AND s.expires_at > NOW()
    `, [token])
    if (!rows.length) return res.status(401).json({ error: 'Invalid or expired session' })
    const u = rows[0]
    if (!u.active) return res.status(403).json({ error: 'Account inactive' })
    res.status(200).json({ id: u.id, email: u.email, firstName: u.first_name, lastName: u.last_name, companyName: u.company_name, accountType: u.account_type })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
