import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import crypto from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { email } = req.body || {}
  if (!email) return res.status(400).json({ error: 'Email required' })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS password_reset_tokens (
      id SERIAL PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      used BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '1 hour'
    )`)
    const { rows } = await pool.query(
      'SELECT id, first_name FROM users WHERE email = $1 AND active = true',
      [email.toLowerCase().trim()]
    )
    if (!rows.length) return res.status(200).json({ success: true })
    const user = rows[0]
    const token = crypto.randomBytes(32).toString('hex')
    await pool.query('INSERT INTO password_reset_tokens (token, user_id) VALUES ($1, $2)', [token, user.id])
    const resetLink = `https://aerowholesale.com/reset-password?token=${token}`
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'AeroWholesale <sales@aerowholesale.com>',
        to: [email.toLowerCase().trim()],
        subject: 'Reset Your AeroWholesale Password',
        html: '<div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:32px 24px"><div style="font-size:16px;font-weight:800;color:#132347;margin-bottom:24px">AeroWholesale</div><p style="font-size:15px;color:#334155">Hi ' + user.first_name + ',</p><p style="font-size:15px;color:#334155">We received a request to reset your password. Click the button below to set a new one.</p><a href="' + resetLink + '" style="display:inline-block;margin:24px 0;padding:14px 28px;background:#ea580c;color:#fff;font-weight:700;font-size:15px;border-radius:8px;text-decoration:none">Reset Password</a><p style="font-size:13px;color:#64748b">This link expires in 1 hour. If you did not request this, you can safely ignore this email.</p></div>'
      })
    })
    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
