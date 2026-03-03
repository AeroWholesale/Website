import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' })

  const { applicationId } = req.query
  if (!applicationId) return res.status(400).json({ error: 'Missing applicationId' })

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // Get all uploads for this application
    const { rows: uploads } = await pool.query(`
      SELECT u.id, u.doc_type, u.file_name, u.file_url, u.file_size, u.uploaded_at,
             ur.documents as requested_docs, ur.status as request_status
      FROM uploads u
      JOIN upload_requests ur ON ur.id = u.upload_request_id
      WHERE u.application_id = $1
      ORDER BY u.uploaded_at DESC
    `, [applicationId])

    // Get pending upload requests (docs requested but not yet uploaded)
    const { rows: requests } = await pool.query(`
      SELECT id, documents, status, created_at
      FROM upload_requests
      WHERE application_id = $1
      ORDER BY created_at DESC
      LIMIT 1
    `, [applicationId])

    res.status(200).json({
      uploads,
      latestRequest: requests[0] || null,
    })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}