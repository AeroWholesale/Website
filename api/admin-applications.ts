import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    if (req.method === 'GET') {
      const { rows } = await pool.query(
        'SELECT * FROM applications ORDER BY created_at DESC'
      )
      return res.status(200).json(rows)
    }

    if (req.method === 'PATCH') {
      const { id, status } = req.body || {}
      if (!id || !status) return res.status(400).json({ error: 'Missing id or status' })
      await pool.query('UPDATE applications SET status = $1 WHERE id = $2', [status, id])
      return res.status(200).json({ success: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}