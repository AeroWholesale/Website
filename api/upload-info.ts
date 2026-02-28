import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put } from '@vercel/blob'
import { Pool } from '@neondatabase/serverless'

export const config = {
  api: { bodyParser: false },
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const token = req.query.token as string
  const docType = req.query.docType as string
  const fileName = req.query.fileName as string

  if (!token || !docType || !fileName) {
    return res.status(400).json({ error: 'Missing token, docType, or fileName' })
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // Verify token
    const { rows } = await pool.query(
      'SELECT ur.id, ur.application_id FROM upload_requests ur WHERE ur.token = $1',
      [token]
    )
    if (!rows.length) return res.status(404).json({ error: 'Invalid upload link' })

    const uploadRequest = rows[0]

    // Read body as buffer
    const chunks: Buffer[] = []
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
    }
    const body = Buffer.concat(chunks)

    // Upload to Vercel Blob
    const blob = await put(
      `docs/${uploadRequest.application_id}/${docType}/${fileName}`,
      body,
      { access: 'public' }
    )

    // Save record
    await pool.query(
      `INSERT INTO uploads (upload_request_id, application_id, doc_type, file_name, file_url, file_size)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [uploadRequest.id, uploadRequest.application_id, docType, fileName, blob.url, body.length]
    )

    // Check if all docs are now uploaded
    const { rows: allUploads } = await pool.query(
      'SELECT DISTINCT doc_type FROM uploads WHERE upload_request_id = $1',
      [uploadRequest.id]
    )
    const { rows: reqDocs } = await pool.query(
      'SELECT documents FROM upload_requests WHERE id = $1',
      [uploadRequest.id]
    )
    const requiredDocs = reqDocs[0].documents.split(',')
    const uploadedTypes = allUploads.map((u: any) => u.doc_type)
    const allDone = requiredDocs.every((d: string) => uploadedTypes.includes(d))

    if (allDone) {
      await pool.query('UPDATE upload_requests SET status = $1 WHERE id = $2', ['completed', uploadRequest.id])
      await pool.query('UPDATE applications SET status = $1 WHERE id = $2', ['docs_received', uploadRequest.application_id])
    }

    res.status(200).json({ success: true, url: blob.url, allComplete: allDone })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}