import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put } from '@vercel/blob'
import { Pool } from '@neondatabase/serverless'

export const config = { api: { bodyParser: false } }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const token = req.query.token as string
  const docType = req.query.docType as string
  const fileName = req.query.fileName as string
  if (!token || !docType || !fileName) return res.status(400).json({ error: 'Missing params' })

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows } = await pool.query(`
      SELECT ur.id, ur.application_id, ur.documents,
             a.company_name, a.first_name, a.last_name, a.email
      FROM upload_requests ur
      JOIN applications a ON a.id = ur.application_id
      WHERE ur.token = $1
    `, [token])
    if (!rows.length) return res.status(404).json({ error: 'Invalid link' })
    const ur = rows[0]

    const companySlug = (ur.company_name || 'unknown')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

    const chunks: Buffer[] = []
    for await (const chunk of req) { chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk) }
    const body = Buffer.concat(chunks)

    const blobPath = `docs/${companySlug}/${docType}/${fileName}`
    const blob = await put(blobPath, body, { access: 'private' })

    await pool.query(
      'INSERT INTO uploads (upload_request_id, application_id, doc_type, file_name, file_url, file_size) VALUES ($1,$2,$3,$4,$5,$6)',
      [ur.id, ur.application_id, docType, fileName, blob.url, body.length]
    )

    const { rows: allUp } = await pool.query(
      'SELECT DISTINCT doc_type FROM uploads WHERE upload_request_id = $1',
      [ur.id]
    )
    const needed = ur.documents.split(',').map((d: string) => d.trim())
    const done = needed.every((d: string) => allUp.some((u: any) => u.doc_type === d))

    if (done) {
      await pool.query('UPDATE upload_requests SET status = $1 WHERE id = $2', ['completed', ur.id])
      await pool.query('UPDATE applications SET status = $1 WHERE id = $2', ['docs_received', ur.application_id])

      const docList = needed.map((d: string) => `<li style="margin-bottom:6px;">${d.toUpperCase()}</li>`).join('')
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'AeroWholesale <sales@aerowholesale.com>',
          to: ['sales@aerowholesale.com'],
          subject: `Docs Complete - ${ur.company_name} ready for review`,
          html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;"><div style="background:#132347;padding:24px 32px;border-radius:8px 8px 0 0;"><h2 style="color:#fff;margin:0;font-size:18px;">AeroWholesale Admin</h2><p style="color:#93c5fd;margin:6px 0 0;font-size:14px;">Document Upload Complete</p></div><div style="padding:32px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px;"><p style="font-size:16px;font-weight:700;margin:0 0 4px;">${ur.company_name}</p><p style="font-size:14px;color:#64748b;margin:0 0 20px;">${ur.first_name} ${ur.last_name} &middot; ${ur.email}</p><p style="font-size:14px;margin:0 0 12px;">All required documents have been uploaded and are ready for review:</p><ul style="font-size:14px;color:#334155;padding-left:20px;margin:0 0 24px;">${docList}</ul><a href="https://aerowholesale.com/admin" style="display:inline-block;padding:12px 24px;background:#ea580c;color:#fff;font-weight:700;font-size:14px;text-decoration:none;border-radius:8px;">Review Application &rarr;</a><hr style="border:none;border-top:1px solid #e2e8f0;margin:24px 0;"><p style="font-size:12px;color:#94a3b8;margin:0;">Files saved to: docs/${companySlug}/</p></div></div>`,
        }),
      }).catch(() => {})
    }

    res.status(200).json({ success: true, url: blob.url, allComplete: done })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}