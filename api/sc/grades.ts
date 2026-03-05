import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Grade Config API — per-category multipliers
 * GET  /api/sc/grades              — all grades grouped by category
 * GET  /api/sc/grades?flat=1       — flat list (backward compat)
 * POST /api/sc/grades              — update a grade { category, grade_code, multiplier, label, visible }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    if (req.method === 'GET') {
      // Try category-aware query first
      try {
        const result = await pool.query(`
          SELECT id, grade_code, label, multiplier, sort_order, visible, category
          FROM grade_config
          ORDER BY category, sort_order
        `)

        if (req.query.flat) {
          // Flat list for backward compat
          res.status(200).json({ grades: result.rows })
          return
        }

        // Group by category
        const byCategory: Record<string, any[]> = {}
        const gradeOrder: { code: string; label: string; sortOrder: number }[] = []
        const seenGrades = new Set<string>()

        for (const row of result.rows) {
          const cat = row.category || 'Phones'
          if (!byCategory[cat]) byCategory[cat] = []
          byCategory[cat].push({
            id: row.id,
            gradeCode: row.grade_code,
            label: row.label,
            multiplier: parseFloat(row.multiplier),
            sortOrder: row.sort_order,
            visible: row.visible,
          })
          if (!seenGrades.has(row.grade_code)) {
            seenGrades.add(row.grade_code)
            gradeOrder.push({ code: row.grade_code, label: row.label, sortOrder: row.sort_order })
          }
        }

        gradeOrder.sort((a, b) => a.sortOrder - b.sortOrder)

        res.status(200).json({
          byCategory,
          gradeOrder,
          categories: Object.keys(byCategory).sort((a, b) => {
            const order = ['Phones', 'Tablets', 'Laptops', 'Wearables']
            return order.indexOf(a) - order.indexOf(b)
          }),
        })
      } catch {
        // Fallback: category column doesn't exist yet
        const result = await pool.query(`
          SELECT id, grade_code, label, multiplier, sort_order, visible
          FROM grade_config ORDER BY sort_order
        `)
        res.status(200).json({ grades: result.rows, legacy: true })
      }
      return
    }

    if (req.method === 'POST') {
      const { id, grade_code, label, multiplier, sort_order, visible, category } = req.body
      if (!grade_code || multiplier === undefined) {
        res.status(400).json({ error: 'grade_code and multiplier required' })
        return
      }

      const mult = parseFloat(multiplier)
      if (isNaN(mult) || mult < 0.1 || mult > 5) {
        res.status(400).json({ error: 'multiplier must be between 0.10 and 5.00' })
        return
      }

      if (id) {
        await pool.query(`
          UPDATE grade_config
          SET label = COALESCE($1, label),
              multiplier = $2,
              sort_order = COALESCE($3, sort_order),
              visible = COALESCE($4, visible)
          WHERE id = $5
        `, [label || null, mult, sort_order ?? null, visible ?? null, id])
      } else if (category) {
        // Upsert by grade_code + category
        await pool.query(`
          INSERT INTO grade_config (grade_code, label, multiplier, sort_order, visible, category)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (grade_code, category) DO UPDATE SET
            label = EXCLUDED.label,
            multiplier = EXCLUDED.multiplier,
            sort_order = EXCLUDED.sort_order,
            visible = EXCLUDED.visible
        `, [grade_code, label || grade_code, mult, sort_order || 0, visible !== false, category])
      } else {
        // Legacy flat upsert
        await pool.query(`
          INSERT INTO grade_config (grade_code, label, multiplier, sort_order, visible)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (grade_code) DO UPDATE SET
            label = EXCLUDED.label,
            multiplier = EXCLUDED.multiplier,
            sort_order = EXCLUDED.sort_order,
            visible = EXCLUDED.visible
        `, [grade_code, label || grade_code, mult, sort_order || 0, visible !== false])
      }

      res.status(200).json({ success: true })
      return
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err: any) {
    res.status(500).json({ error: err.message || String(err) })
  } finally {
    await pool.end()
  }
}