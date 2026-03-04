// api/apply.ts
// Handles dealer application form submissions.
// Saves to DB, then notifies Zack + Linda via email.

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const {
    firstName, lastName, email, phone, jobTitle,
    companyName, website, ein, state, city, yearsInBusiness,
    accountType, monthlyVolume, productCategories, salesChannel,
    heardAbout, notes,
  } = req.body || {}

  if (!firstName || !lastName || !email || !phone || !companyName || !ein || !state || !accountType || !monthlyVolume) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  // ── Save to DB ──────────────────────────────────────────────────────────
  await sql`
    CREATE TABLE IF NOT EXISTS applications (
      id                SERIAL PRIMARY KEY,
      first_name        TEXT NOT NULL,
      last_name         TEXT NOT NULL,
      email             TEXT NOT NULL,
      phone             TEXT NOT NULL,
      job_title         TEXT,
      company_name      TEXT NOT NULL,
      website           TEXT,
      ein               TEXT NOT NULL,
      state             TEXT NOT NULL,
      city              TEXT,
      years_in_business TEXT,
      account_type      TEXT NOT NULL,
      monthly_volume    TEXT NOT NULL,
      product_categories TEXT,
      sales_channel     TEXT,
      heard_about       TEXT,
      notes             TEXT,
      status            TEXT NOT NULL DEFAULT 'pending',
      created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    INSERT INTO applications (
      first_name, last_name, email, phone, job_title,
      company_name, website, ein, state, city, years_in_business,
      account_type, monthly_volume, product_categories, sales_channel,
      heard_about, notes
    ) VALUES (
      ${firstName}, ${lastName}, ${email}, ${phone}, ${jobTitle || ''},
      ${companyName}, ${website || ''}, ${ein}, ${state}, ${city || ''},
      ${yearsInBusiness || ''}, ${accountType}, ${monthlyVolume},
      ${productCategories || ''}, ${salesChannel || ''},
      ${heardAbout || ''}, ${notes || ''}
    )
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
      subject: `🆕 New Dealer Application — ${companyName}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
          <div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;">
            <h2 style="color:#fff;margin:0;font-size:18px;font-weight:800;">AeroWholesale — New Application</h2>
          </div>
          <div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
            <div style="background:#fef9c3;border:1px solid #fde68a;border-radius:8px;padding:12px 16px;margin-bottom:20px;">
              <strong style="color:#854d0e;">🆕 New dealer application received — needs review</strong>
            </div>
            <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
              <tr><td style="padding:8px 0;color:#64748b;width:150px;border-bottom:1px solid #f1f4f8;">Company</td><td style="padding:8px 0;font-weight:700;color:#132347;border-bottom:1px solid #f1f4f8;">${companyName}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;border-bottom:1px solid #f1f4f8;">Contact</td><td style="padding:8px 0;color:#132347;border-bottom:1px solid #f1f4f8;">${firstName} ${lastName}${jobTitle ? ` &mdash; ${jobTitle}` : ''}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;border-bottom:1px solid #f1f4f8;">Email</td><td style="padding:8px 0;border-bottom:1px solid #f1f4f8;"><a href="mailto:${email}" style="color:#c2410c;">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#64748b;border-bottom:1px solid #f1f4f8;">Phone</td><td style="padding:8px 0;color:#132347;border-bottom:1px solid #f1f4f8;">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;border-bottom:1px solid #f1f4f8;">Account Type</td><td style="padding:8px 0;color:#132347;border-bottom:1px solid #f1f4f8;">${accountType}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;border-bottom:1px solid #f1f4f8;">Monthly Volume</td><td style="padding:8px 0;color:#132347;border-bottom:1px solid #f1f4f8;">${monthlyVolume}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;border-bottom:1px solid #f1f4f8;">EIN</td><td style="padding:8px 0;color:#132347;border-bottom:1px solid #f1f4f8;">${ein}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;">State</td><td style="padding:8px 0;color:#132347;">${city ? `${city}, ` : ''}${state}</td></tr>
            </table>
            ${notes ? `
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;margin-bottom:20px;">
                <div style="font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">Notes from applicant</div>
                <div style="font-size:13px;color:#132347;line-height:1.6;">${notes}</div>
              </div>
            ` : ''}
            <a href="${adminUrl}" style="display:inline-block;background:#c2410c;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:800;">Review in Admin Panel →</a>
            <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0 20px;">
            <p style="font-size:12px;color:#94a3b8;margin:0;">AeroWholesale &mdash; Refurbished Electronics Wholesale</p>
          </div>
        </div>
      `,
    }),
  }).catch(err => console.error('[notify] application alert failed:', err))

  return res.status(200).json({ success: true })
}