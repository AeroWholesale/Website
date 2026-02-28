import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import crypto from 'crypto'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { applicationId, email, companyName, firstName, documents } = req.body || {}
  if (!applicationId || !email || !documents?.length) return res.status(400).json({ error: 'Missing fields' })

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  const docLabels: Record<string, string> = {
    w9: 'W-9 Form',
    st3: 'ST-3 Sales Tax Exemption Certificate',
    ein: 'EIN Verification Letter',
    formation: 'Business Formation Documents (LLC/Corp)',
    id: 'Government-Issued Photo ID',
    resale: 'Resale Certificate',
    insurance: 'Certificate of Insurance',
  }

  try {
    // Create tables if needed
    await pool.query(`
      CREATE TABLE IF NOT EXISTS upload_requests (
        id SERIAL PRIMARY KEY,
        application_id INTEGER NOT NULL,
        token TEXT UNIQUE NOT NULL,
        documents TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS uploads (
        id SERIAL PRIMARY KEY,
        upload_request_id INTEGER NOT NULL,
        application_id INTEGER NOT NULL,
        doc_type TEXT NOT NULL,
        file_name TEXT NOT NULL,
        file_url TEXT NOT NULL,
        file_size INTEGER,
        uploaded_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    // Generate unique token
    const token = crypto.randomBytes(16).toString('hex')

    // Save upload request
    await pool.query(
      'INSERT INTO upload_requests (application_id, token, documents) VALUES ($1, $2, $3)',
      [applicationId, token, documents.join(',')]
    )

    const uploadUrl = `https://www.aerowholesale.com/upload/${token}`
    const docList = documents.map((d: string) => docLabels[d] || d)
    const docHtml = docList.map((d: string) => `<li style="padding: 6px 0; color: #1a1a2e;">${d}</li>`).join('')

    // Send email
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AeroWholesale <sales@aerowholesale.com>',
        to: [email],
        subject: `Action Required: Documents Needed for Your AeroWholesale Account`,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
            <div style="background: #132347; padding: 24px 32px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #fff; margin: 0; font-size: 18px;">AeroWholesale</h2>
            </div>
            <div style="padding: 32px; background: #fff; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="font-size: 15px; margin: 0 0 16px;">Hi ${firstName || 'there'},</p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
                Thank you for applying for a wholesale account with AeroWholesale. We've reviewed your application for <strong>${companyName}</strong> and we're excited to move forward.
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
                To complete your account setup, we need the following documents:
              </p>
              <div style="background: #f1f4f8; border-radius: 8px; padding: 16px 24px; margin: 0 0 20px;">
                <ul style="margin: 0; padding: 0 0 0 16px; font-size: 15px; line-height: 1.4;">
                  ${docHtml}
                </ul>
              </div>
              <div style="text-align: center; margin: 24px 0;">
                <a href="${uploadUrl}" style="display: inline-block; background: #c2410c; color: #fff; font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 8px; text-decoration: none;">Upload Documents</a>
              </div>
              <p style="font-size: 13px; color: #64748b; line-height: 1.6; margin: 0 0 16px; text-align: center;">
                Or copy this link: <a href="${uploadUrl}" style="color: #c2410c;">${uploadUrl}</a>
              </p>
              <p style="font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                Once we receive and verify your documents, we'll activate your account and send you login credentials.
              </p>
              <p style="font-size: 15px; margin: 0;">Best regards,<br><strong>AeroWholesale Team</strong></p>
              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;">
              <p style="font-size: 13px; color: #64748b; margin: 0;">AeroWholesale · Eatontown, New Jersey</p>
              <p style="font-size: 13px; color: #64748b; margin: 4px 0 0;">sales@aerowholesale.com</p>
            </div>
          </div>
        `,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      return res.status(500).json({ error: err })
    }

    // Update application status
    await pool.query(
      'UPDATE applications SET status = $1 WHERE id = $2',
      ['docs_requested', applicationId]
    )

    res.status(200).json({ success: true, uploadUrl })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}