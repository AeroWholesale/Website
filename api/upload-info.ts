import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })
  const { token } = req.query
  if (!token) return res.status(400).json({ error: 'Missing token' })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows } = await pool.query('SELECT ur.*, a.company_name, a.first_name, a.last_name FROM upload_requests ur JOIN applications a ON a.id = ur.application_id WHERE ur.token = $1', [token])
    if (!rows.length) return res.status(404).json({ error: 'Not found' })
    const row = rows[0]
    const { rows: uploaded } = await pool.query('SELECT doc_type, file_name FROM uploads WHERE upload_request_id = $1', [row.id])
    res.status(200).json({ companyName: row.company_name, firstName: row.first_name, documents: row.documents.split(','), status: row.status, uploaded: uploaded.map((u) => ({ docType: u.doc_type, fileName: u.file_name })) })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
