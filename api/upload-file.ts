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
    const { rows } = await pool.query('SELECT id, application_id FROM upload_requests WHERE token = $1', [token])
    if (!rows.length) return res.status(404).json({ error: 'Invalid link' })
    const ur = rows[0]
    const chunks: Buffer[] = []
    for await (const chunk of req) { chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk) }
    const body = Buffer.concat(chunks)
    const blob = await put('docs/' + ur.application_id + '/' + docType + '/' + fileName, body, { access: 'private' })
    await pool.query('INSERT INTO uploads (upload_request_id, application_id, doc_type, file_name, file_url, file_size) VALUES ($1,$2,$3,$4,$5,$6)', [ur.id, ur.application_id, docType, fileName, blob.url, body.length])
    const { rows: allUp } = await pool.query('SELECT DISTINCT doc_type FROM uploads WHERE upload_request_id = $1', [ur.id])
    const { rows: rd } = await pool.query('SELECT documents FROM upload_requests WHERE id = $1', [ur.id])
    const needed = rd[0].documents.split(',')
    const done = needed.every((d: string) => allUp.some((u: any) => u.doc_type === d))
    if (done) {
      await pool.query('UPDATE upload_requests SET status = $1 WHERE id = $2', ['completed', ur.id])
      await pool.query('UPDATE applications SET status = $1 WHERE id = $2', ['docs_received', ur.application_id])
    }
    res.status(200).json({ success: true, url: blob.url, allComplete: done })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
