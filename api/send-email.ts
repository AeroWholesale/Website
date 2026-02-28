import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { to, subject, message, replyToMsgId } = req.body || {}
  if (!to || !subject || !message) return res.status(400).json({ error: 'Missing fields' })

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'AeroWholesale <sales@aerowholesale.com>',
        to: [to],
        subject,
        html: `
          <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
            <div style="background: #132347; padding: 24px 32px; border-radius: 8px 8px 0 0;">
              <h2 style="color: #fff; margin: 0; font-size: 18px;">AeroWholesale</h2>
            </div>
            <div style="padding: 32px; background: #fff; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px;">
              ${message.replace(/\n/g, '<br>')}
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

    // Mark original message as read if provided
    if (replyToMsgId) {
      const { Pool } = require('@neondatabase/serverless')
      const pool = new Pool({ connectionString: process.env.DATABASE_URL })
      await pool.query('UPDATE contact_messages SET read = true WHERE id = $1', [replyToMsgId])
      await pool.end()
    }

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}