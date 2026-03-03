import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // Ensure notes table exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS application_notes (
        id SERIAL PRIMARY KEY,
        application_id INTEGER NOT NULL,
        author TEXT NOT NULL DEFAULT 'Isaac',
        note TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    // GET - fetch all notes for an application
    if (req.method === 'GET') {
      const { applicationId } = req.query
      if (!applicationId) return res.status(400).json({ error: 'Missing applicationId' })
      const { rows } = await pool.query(
        'SELECT * FROM application_notes WHERE application_id = $1 ORDER BY created_at DESC',
        [applicationId]
      )
      return res.status(200).json(rows)
    }

    // POST - save a new note
    if (req.method === 'POST') {
      const { applicationId, note, author } = req.body || {}
      if (!applicationId || !note?.trim()) return res.status(400).json({ error: 'Missing fields' })
      const { rows } = await pool.query(
        'INSERT INTO application_notes (application_id, author, note) VALUES ($1, $2, $3) RETURNING *',
        [applicationId, author || 'Isaac', note.trim()]
      )
      return res.status(200).json(rows[0])
    }

    // DELETE - remove a note
    if (req.method === 'DELETE') {
      const { id } = req.body || {}
      if (!id) return res.status(400).json({ error: 'Missing id' })
      await pool.query('DELETE FROM application_notes WHERE id = $1', [id])
      return res.status(200).json({ success: true })
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}