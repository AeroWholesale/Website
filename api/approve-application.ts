import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import crypto from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { applicationId } = req.body || {}
  if (!applicationId) return res.status(400).json({ error: 'Missing applicationId' })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows } = await pool.query('SELECT * FROM applications WHERE id = $1', [applicationId])
    if (!rows.length) return res.status(404).json({ error: 'Application not found' })
    const app = rows[0]
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tc_tokens (
        id SERIAL PRIMARY KEY,
        token TEXT UNIQUE NOT NULL,
        application_id INTEGER NOT NULL,
        signed_at TIMESTAMPTZ,
        signature_name TEXT,
        ip_address TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)
    await pool.query('DELETE FROM tc_tokens WHERE application_id = $1 AND signed_at IS NULL', [applicationId])
    const token = crypto.randomBytes(32).toString('hex')
    await pool.query('INSERT INTO tc_tokens (token, application_id) VALUES ($1, $2)', [token, applicationId])
    await pool.query("UPDATE applications SET status = 'pending_tc' WHERE id = $1", [applicationId])
    const tcUrl = `https://aerowholesale.com/terms-accept?token=${token}`
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'AeroWholesale <sales@aerowholesale.com>',
        to: [app.email],
        subject: 'Action Required - Sign Your AeroWholesale Wholesale Agreement',
        html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;"><h2 style="color:#fff;margin:0;">AeroWholesale</h2></div><div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;"><p>Hi ${app.first_name},</p><p>Your application for <strong>${app.company_name}</strong> has been approved. Please sign your wholesale agreement to activate your account.</p><div style="text-align:center;margin:24px 0;"><a href="${tcUrl}" style="display:inline-block;padding:14px 32px;background:#ea580c;color:#fff;font-weight:700;font-size:15px;text-decoration:none;border-radius:8px;">Review &amp; Sign Agreement &rarr;</a></div><p style="font-size:13px;color:#64748b;">Once signed, your account will be activated and you will receive login credentials.</p><hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"><p style="font-size:12px;color:#94a3b8;">AeroWholesale &middot; Eatontown, NJ</p></div></div>`,
      }),
    })
    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}