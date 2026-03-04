// api/contact.ts
// Handles contact form submissions.
// Saves to DB, then notifies Zack + Linda via email.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, company, phone, subject, message } = req.body || {}

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // ── Save to DB ──────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id         SERIAL PRIMARY KEY,
      name       TEXT NOT NULL,
      email      TEXT NOT NULL,
      company    TEXT,
      phone      TEXT,
      subject    TEXT,
      message    TEXT NOT NULL,
      is_read    BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    INSERT INTO contact_messages (name, email, company, phone, subject, message)
    VALUES (${name}, ${email}, ${company || null}, ${phone || null}, ${subject || null}, ${message})
  `

  // ── Notify Zack + Linda (non-blocking) ─────────────────────────────────
  const adminUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aerowholesale.com'}/admin`

  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'AeroWholesale <sales@aerowholesale.com>',
      to: ['zack@aerowholesale.com', 'linda@aerowholesale.com'],
      subject: `💬 New Contact Message — ${subject || 'General Inquiry'} (${name})`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
          <div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;">
            <h2 style="color:#fff;margin:0;font-size:18px;font-weight:800;">AeroWholesale — New Message</h2>
          </div>
          <div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
            <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:12px 16px;margin-bottom:20px;">
              <strong style="color:#1e40af;">💬 New contact message — reply via admin panel</strong>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
              <tr><td style="padding:8px 0;color:#64748b;width:150px;border-bottom:1px solid #f1f4f8;">Name</td><td style="padding:8px 0;font-weight:700;color:#132347;border-bottom:1px solid #f1f4f8;">${name}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;border-bottom:1px solid #f1f4f8;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f1f4f8;"><a href="mailto:${email}" style="color:#c2410c;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b;border-bottom:1px solid #f1f4f8;">Company</td><td style="padding:8px 0;color:#132347;border-bottom:1px solid #f1f4f8;">${company || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;border-bottom:1px solid #f1f4f8;">Phone</td><td style="padding:8px 0;color:#132347;border-bottom:1px solid #f1f4f8;">${phone || '—'}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">Subject</td><td style="padding:8px 0;color:#132347;">${subject || '—'}</td></tr>
            </table>
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;margin-bottom:20px;">
              <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">Message</div>
              <div style="font-size:14px;color:#132347;line-height:1.7;">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <a href="${adminUrl}" style="display:inline-block;background:#c2410c;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:800;">Reply in Admin Panel →</a>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0 20px;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">AeroWholesale &mdash; Refurbished Electronics Wholesale</p>
          </div>
        </div>
      `,
    }),
  }).catch(err => console.error('[notify] contact alert failed:', err))

  return res.status(200).json({ success: true })
}