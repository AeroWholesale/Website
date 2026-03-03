import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    if (req.method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM applications ORDER BY created_at DESC')
      return res.status(200).json(rows)
    }

    if (req.method === 'PATCH') {
      const { id, status, rejectionReason } = req.body || {}
      if (!id || !status) return res.status(400).json({ error: 'Missing id or status' })

      await pool.query('UPDATE applications SET status = $1 WHERE id = $2', [status, id])

      // Send rejection email when rejecting
      if (status === 'rejected' && process.env.RESEND_API_KEY) {
        const { rows } = await pool.query('SELECT first_name, email, company_name FROM applications WHERE id = $1', [id])
        if (rows.length) {
          const { first_name, email, company_name } = rows[0]
          const reasonBlock = rejectionReason
            ? `<div style="background:#f8fafc;border-left:4px solid #e2e8f0;padding:16px 20px;margin:0 0 20px;border-radius:0 8px 8px 0;font-size:14px;color:#334155;line-height:1.6;">${rejectionReason}</div>`
            : ''
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              from: 'AeroWholesale <sales@aerowholesale.com>',
              to: [email],
              subject: 'Update on Your AeroWholesale Application',
              html: `<div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;"><div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;"><h2 style="color:#fff;margin:0;font-size:18px;">AeroWholesale</h2></div><div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;"><p style="font-size:15px;margin:0 0 16px;">Hi ${first_name},</p><p style="font-size:15px;line-height:1.6;margin:0 0 16px;">Thank you for your interest in AeroWholesale. After reviewing your application for <strong>${company_name}</strong>, we are unable to approve your account at this time.</p>${reasonBlock}<p style="font-size:15px;line-height:1.6;margin:0 0 24px;">If you have questions, please reach out at <a href="mailto:sales@aerowholesale.com" style="color:#c2410c;">sales@aerowholesale.com</a>.</p><p style="font-size:15px;margin:0;">Best regards,<br><strong>AeroWholesale Team</strong></p><hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"><p style="font-size:13px;color:#64748b;margin:0;">AeroWholesale · Eatontown, New Jersey</p></div></div>`,
            }),
          }).catch(() => {})
        }
      }

      return res.status(200).json({ success: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}