import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Admin API for grade configuration
 * 
 * GET  /api/sc/grades  → list all grades with config
 * POST /api/sc/grades  → update a grade's multiplier/label/visibility
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    if (req.method === 'GET') {
      const result = await pool.query(`
        SELECT id, grade_code, label, multiplier, sort_order, visible, created_at
        FROM grade_config
        ORDER BY sort_order
      `)
      res.status(200).json({ grades: result.rows })
      return
    }

    if (req.method === 'POST') {
      const { id, grade_code, label, multiplier, sort_order, visible } = req.body
      if (!grade_code || !label || multiplier === undefined) {
        res.status(400).json({ error: 'grade_code, label, and multiplier required' })
        return
      }

      if (id) {
        await pool.query(`
          UPDATE grade_config
          SET grade_code=$1, label=$2, multiplier=$3, sort_order=$4, visible=$5
          WHERE id=$6
        `, [grade_code, label, multiplier, sort_order || 0, visible !== false, id])
      } else {
        await pool.query(`
          INSERT INTO grade_config (grade_code, label, multiplier, sort_order, visible)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (grade_code) DO UPDATE SET
            label=EXCLUDED.label, multiplier=EXCLUDED.multiplier,
            sort_order=EXCLUDED.sort_order, visible=EXCLUDED.visible
        `, [grade_code, label, multiplier, sort_order || 0, visible !== false])
      }

      res.status(200).json({ success: true })
      return
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
