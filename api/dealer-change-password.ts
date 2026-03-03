@'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import crypto from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const token = (req.headers.authorization || '').replace('Bearer ', '').trim()
  if (!token) return res.status(401).json({ error: 'No token' })
  const { currentPassword, newPassword } = req.body || {}
  if (!currentPassword || !newPassword) return res.status(400).json({ error: 'Missing fields' })
  if (newPassword.length < 8) return res.status(400).json({ error: 'New password must be at least 8 characters' })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows } = await pool.query(
      'SELECT u.id, u.password_hash FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = $1 AND s.expires_at > NOW()',
      [token]
    )
    if (!rows.length) return res.status(401).json({ error: 'Invalid or expired session' })
    const user = rows[0]
    const currentHash = crypto.createHash('sha256').update(currentPassword).digest('hex')
    if (currentHash !== user.password_hash) return res.status(401).json({ error: 'Current password is incorrect' })
    const newHash = crypto.createHash('sha256').update(newPassword).digest('hex')
    await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [newHash, user.id])
    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
