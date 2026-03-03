import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import crypto from 'crypto'

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let pw = ''
  for (let i = 0; i < 12; i++) pw += chars[Math.floor(Math.random() * chars.length)]
  return pw
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { token, signatureName } = req.body || {}
  if (!token || !signatureName) return res.status(400).json({ error: 'Missing token or signature' })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows: trows } = await pool.query(
      'SELECT * FROM tc_tokens WHERE token = $1 AND signed_at IS NULL', [token]
    )
    if (!trows.length) return res.status(404).json({ error: 'Invalid or already used token' })
    const tc = trows[0]
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0] || ''
    await pool.query(
      'UPDATE tc_tokens SET signed_at = NOW(), signature_name = $1, ip_address = $2 WHERE id = $3',
      [signatureName, ip, tc.id]
    )
    const { rows: arows } = await pool.query('SELECT * FROM applications WHERE id = $1', [tc.application_id])
    if (!arows.length) return res.status(404).json({ error: 'Application not found' })
    const app = arows[0]
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT, last_name TEXT, company_name TEXT, account_type TEXT, application_id INTEGER,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [app.email])
    if (existing.rows.length) return res.status(400).json({ error: 'Account already exists' })
    const tempPassword = generatePassword()
    const hash = crypto.createHash('sha256').update(tempPassword).digest('hex')
    await pool.query(
      'INSERT INTO users (email, password_hash, first_name, last_name, company_name, account_type, application_id) VALUES ($1,$2,$3,$4,$5,$6,$7)',
      [app.email, hash, app.first_name, app.last_name, app.company_name, app.account_type, app.id]
    )
    await pool.query("UPDATE applications SET status = 'approved' WHERE id = $1", [app.id])
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'AeroWholesale <sales@aerowholesale.com>',
        to: [app.email],
        subject: 'Welcome to AeroWholesale - Your Account is Active',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;"><h2 style="color:#fff;margin:0;">AeroWholesale</h2></div><div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;"><p>Hi ${app.first_name},</p><p>Your agreement has been signed and your wholesale account for <strong>${app.company_name}</strong> is now active.</p><div style="background:#f1f4f8;border-radius:8px;padding:20px 24px;margin:16px 0;"><p style="font-size:13px;font-weight:700;color:#132347;text-transform:uppercase;margin:0 0 12px;">Your Login Credentials</p><table style="font-size:15px;"><tr><td style="color:#64748b;padding-right:16px;">Email:</td><td style="font-weight:700;">${app.email}</td></tr><tr><td style="color:#64748b;padding-right:16px;">Temp Password:</td><td style="font-weight:700;font-family:monospace;background:#fff;padding:2px 8px;border-radius:4px;">${tempPassword}</td></tr></table></div><p>Log in at <a href="https://aerowholesale.com/login" style="color:#c2410c;font-weight:700;">aerowholesale.com/login</a> to browse inventory and place orders.</p><p style="font-size:13px;color:#64748b;">We recommend changing your password after your first login.</p><hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"><p style="font-size:12px;color:#94a3b8;">AeroWholesale &middot; Eatontown, NJ &middot; sales@aerowholesale.com</p></div></div>`,
      }),
    })
    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}