import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import crypto from 'crypto'

function generatePassword() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let pw = ''
  for (let i = 0; i < 12; i++) pw += chars[crypto.randomInt(chars.length)]
  return pw
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { applicationId } = req.body || {}
  if (!applicationId) return res.status(400).json({ error: 'Missing applicationId' })

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // Get the application
    const { rows } = await pool.query('SELECT * FROM applications WHERE id = $1', [applicationId])
    if (!rows.length) return res.status(404).json({ error: 'Application not found' })
    const app = rows[0]

    // Create users table if needed
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        first_name TEXT,
        last_name TEXT,
        company_name TEXT,
        account_type TEXT,
        application_id INTEGER,
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    // Check if user already exists
    const existing = await pool.query('SELECT id FROM users WHERE email = $1', [app.email])
    if (existing.rows.length) return res.status(400).json({ error: 'User already exists' })

    // Generate temp password
    const tempPassword = generatePassword()
    const hash = crypto.createHash('sha256').update(tempPassword).digest('hex')

    // Create user
    await pool.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, company_name, account_type, application_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [app.email, hash, app.first_name, app.last_name, app.company_name, app.account_type, app.id]
    )

    // Update application status
    await pool.query('UPDATE applications SET status = $1 WHERE id = $2', ['approved', app.id])

    // Send welcome email
    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AeroWholesale <sales@aerowholesale.com>',
        to: [app.email],
        subject: `Welcome to AeroWholesale — Your Account is Ready`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
            <div style="background: #132347; padding: 24px 32px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #fff; margin: 0; font-size: 18px;">AeroWholesale</h2>
            </div>
            <div style="padding: 32px; background: #fff; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="font-size: 15px; margin: 0 0 16px;">Hi ${app.first_name},</p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
                Great news — your wholesale account for <strong>${app.company_name}</strong> has been approved! You now have full access to our inventory and wholesale pricing.
              </p>
              <div style="background: #f1f4f8; border-radius: 8px; padding: 20px 24px; margin: 0 0 20px;">
                <p style="font-size: 13px; font-weight: 700; color: #132347; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">Your Login Credentials</p>
                <table style="font-size: 15px; line-height: 1.6;">
                  <tr><td style="color: #64748b; padding-right: 16px;">Email:</td><td style="font-weight: 700;">${app.email}</td></tr>
                  <tr><td style="color: #64748b; padding-right: 16px;">Temp Password:</td><td style="font-weight: 700; font-family: monospace; background: #fff; padding: 2px 8px; border-radius: 4px;">${tempPassword}</td></tr>
                </table>
              </div>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
                Log in at <a href="https://www.aerowholesale.com/login" style="color: #c2410c; font-weight: 700;">aerowholesale.com/login</a> to browse inventory and place orders.
              </p>
              <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0 0 24px;">
                For security, we recommend changing your password after your first login.
              </p>
              <p style="font-size: 15px; margin: 0;">Welcome aboard,<br><strong>AeroWholesale Team</strong></p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
              <p style="font-size: 13px; color: #64748b; margin: 0;">AeroWholesale · Eatontown, New Jersey</p>
              <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">sales@aerowholesale.com</p>
            </div>
          </div>
        `,
      }),
    })

    if (!emailRes.ok) {
      const err = await emailRes.text()
      return res.status(500).json({ error: 'Email failed: ' + err })
    }

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}