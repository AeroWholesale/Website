@'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import crypto from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { token } = req.query
    if (!token) return res.status(400).json({ error: 'Token required' })
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    try {
      const { rows } = await pool.query(
        'SELECT id FROM password_reset_tokens WHERE token = $1 AND used = false AND expires_at > NOW()',
        [token]
      )
      if (!rows.length) return res.status(400).json({ error: 'Invalid or expired reset link' })
      res.status(200).json({ valid: true })
    } catch (err) {
      res.status(500).json({ error: String(err) })
    } finally {
      await pool.end()
    }
  } else if (req.method === 'POST') {
    const { token, newPassword } = req.body || {}
    if (!token || !newPassword) return res.status(400).json({ error: 'Missing fields' })
    if (newPassword.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' })
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    try {
      const { rows } = await pool.query(
        'SELECT user_id FROM password_reset_tokens WHERE token = $1 AND used = false AND expires_at > NOW()',
        [token]
      )
      if (!rows.length) return res.status(400).json({ error: 'Invalid or expired reset link' })
      const userId = rows[0].user_id
      const hash = crypto.createHash('sha256').update(newPassword).digest('hex')
      await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, userId])
      await pool.query('UPDATE password_reset_tokens SET used = true WHERE token = $1', [token])
      res.status(200).json({ success: true })
    } catch (err) {
      res.status(500).json({ error: String(err) })
    } finally {
      await pool.end()
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
'@ | Set-Content api/reset-password.ts