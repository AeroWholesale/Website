import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    if (req.method === 'GET') {
      const { rows } = await pool.query(
        'SELECT * FROM contact_messages ORDER BY created_at DESC'
      )
      return res.status(200).json(rows)
    }

    if (req.method === 'PATCH') {
      const { id, read } = req.body || {}
      if (!id) return res.status(400).json({ error: 'Missing id' })
      await pool.query('UPDATE contact_messages SET read = $1 WHERE id = $2', [read ?? true, id])
      return res.status(200).json({ success: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}