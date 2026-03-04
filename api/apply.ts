import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import formidable from 'formidable'
import { put } from '@vercel/blob'
import fs from 'fs'

export const config = { api: { bodyParser: false } }

function slugify(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // Ensure applications table exists with all columns
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        first_name TEXT, last_name TEXT, email TEXT, phone TEXT, job_title TEXT,
        company_name TEXT, website TEXT, ein TEXT, state TEXT, city TEXT,
        years_in_business TEXT, account_type TEXT, monthly_volume TEXT,
        product_categories TEXT, sales_channel TEXT, heard_about TEXT, notes TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    // Parse multipart form
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 })
    const [fields, files] = await new Promise<[formidable.Fields, formidable.Files]>((resolve, reject) => {
      form.parse(req as any, (err, f, fi) => err ? reject(err) : resolve([f, fi]))
    })

    const g = (k: string) => (Array.isArray(fields[k]) ? fields[k]![0] : fields[k] as string) || ''

    const firstName = g('firstName')
    const lastName = g('lastName')
    const email = g('email')
    const companyName = g('companyName')

    if (!firstName || !lastName || !email || !companyName) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Duplicate check
    const existing = await pool.query(
      'SELECT id FROM applications WHERE email = $1 OR (ein = $2 AND ein != $3)',
      [email, g('ein'), '']
    )
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'An application with this email or EIN already exists.' })
    }

    // Insert application
    const { rows } = await pool.query(`
      INSERT INTO applications (
        first_name, last_name, email, phone, job_title,
        company_name, website, ein, state, city,
        years_in_business, account_type, monthly_volume,
        product_categories, sales_channel, heard_about, notes, status
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,'pending')
      RETURNING id
    `, [
      firstName, lastName, email, g('phone'), g('jobTitle'),
      companyName, g('website'), g('ein'), g('state'), g('city'),
      g('yearsInBusiness'), g('accountType'), g('monthlyVolume'),
      g('productCategories'), g('salesChannel'), g('heardAbout'), g('notes')
    ])

    const appId = rows[0].id
    const companySlug = slugify(companyName)

    // Upload any attached docs to Blob
    const docKeys = ['resaleCert', 'businessLicense', 'taxExempt', 'other']
    for (const key of docKeys) {
      const fileArr = files[key]
      const file = Array.isArray(fileArr) ? fileArr[0] : fileArr
      if (file && file.size > 0) {
        const buffer = fs.readFileSync(file.filepath)
        const ext = file.originalFilename?.split('.').pop() || 'pdf'
        const blobPath = `docs/${companySlug}/${key}/${file.originalFilename || key + '.' + ext}`
        await put(blobPath, buffer, { access: 'private' }).catch(() => {})
      }
    }

    // Send confirmation email to applicant
    if (process.env.RESEND_API_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'AeroWholesale <sales@aerowholesale.com>',
          to: [email],
          subject: 'We received your application — AeroWholesale',
          html: `
            <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
              <div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;">
                <h2 style="color:#fff;margin:0;font-size:18px;">AeroWholesale</h2>
              </div>
              <div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
                <p style="font-size:15px;margin:0 0 16px;">Hi ${firstName},</p>
                <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">
                  Thanks for applying for a wholesale account with AeroWholesale. We've received your application for <strong>${companyName}</strong> and our team will review it within 1 business day.
                </p>
                <p style="font-size:15px;line-height:1.6;margin:0 0 24px;">
                  We may reach out to request additional documents to verify your business. Keep an eye on your inbox at <strong>${email}</strong>.
                </p>
                <p style="font-size:15px;margin:0;">Best regards,<br><strong>AeroWholesale Team</strong></p>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;">
                <p style="font-size:13px;color:#64748b;margin:0;">AeroWholesale · Eatontown, New Jersey · sales@aerowholesale.com</p>
              </div>
            </div>
          `,
        }),
      }).catch(() => {})

      // Notify Isaac
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'AeroWholesale <sales@aerowholesale.com>',
          to: ['sales@aerowholesale.com'],
          subject: `🆕 New Application: ${companyName}`,
          html: `
            <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;">
              <div style="background:#132347;padding:20px 28px;border-radius:8px 8px 0 0;">
                <h2 style="color:#fff;margin:0;font-size:16px;">New Wholesale Application</h2>
              </div>
              <div style="padding:24px 28px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;">
                <table style="width:100%;font-size:14px;border-collapse:collapse;">
                  <tr><td style="padding:6px 0;color:#64748b;width:140px;">Company</td><td style="padding:6px 0;font-weight:700;color:#0f172a;">${companyName}</td></tr>
                  <tr><td style="padding:6px 0;color:#64748b;">Contact</td><td style="padding:6px 0;color:#0f172a;">${firstName} ${lastName}</td></tr>
                  <tr><td style="padding:6px 0;color:#64748b;">Email</td><td style="padding:6px 0;color:#0f172a;">${email}</td></tr>
                  <tr><td style="padding:6px 0;color:#64748b;">Account Type</td><td style="padding:6px 0;color:#0f172a;text-transform:capitalize;">${g('accountType')}</td></tr>
                  <tr><td style="padding:6px 0;color:#64748b;">Monthly Volume</td><td style="padding:6px 0;color:#0f172a;">${g('monthlyVolume')}</td></tr>
                  <tr><td style="padding:6px 0;color:#64748b;">State</td><td style="padding:6px 0;color:#0f172a;">${g('state')}</td></tr>
                  <tr><td style="padding:6px 0;color:#64748b;">EIN</td><td style="padding:6px 0;color:#0f172a;font-family:monospace;">${g('ein')}</td></tr>
                </table>
                <div style="margin-top:20px;">
                  <a href="https://www.aerowholesale.com/admin" style="display:inline-block;background:#c2410c;color:#fff;font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none;">Review in Admin →</a>
                </div>
              </div>
            </div>
          `,
        }),
      }).catch(() => {})
    }

    res.status(200).json({ success: true, applicationId: appId })
  } catch (err) {
    console.error('Apply error:', err)
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}