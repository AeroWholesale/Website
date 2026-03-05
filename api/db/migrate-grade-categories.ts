import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Migration: Add category to grade_config for per-category pricing grid
 * GET /api/db/migrate-grade-categories
 * Safe to run multiple times (idempotent)
 *
 * Changes:
 *   1. ALTER grade_config ADD COLUMN category TEXT
 *   2. Update existing rows to category = 'Phones'
 *   3. Drop old UNIQUE(grade_code) constraint
 *   4. Add UNIQUE(grade_code, category)
 *   5. Seed Tablets, Laptops, Wearables rows (copying Phones multipliers)
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // Step 1 — Add category column if it doesn't exist
    await pool.query(`
      ALTER TABLE grade_config
      ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'Phones'
    `)

    // Step 2 — Set existing rows to Phones
    await pool.query(`
      UPDATE grade_config SET category = 'Phones' WHERE category IS NULL OR category = ''
    `)

    // Step 3 — Drop old unique constraint on grade_code alone (if it exists)
    // Get constraint name first
    const constraintResult = await pool.query(`
      SELECT conname FROM pg_constraint
      WHERE conrelid = 'grade_config'::regclass
        AND contype = 'u'
        AND array_length(conkey, 1) = 1
    `)
    for (const row of constraintResult.rows) {
      await pool.query(`ALTER TABLE grade_config DROP CONSTRAINT IF EXISTS "${row.conname}"`)
    }

    // Step 4 — Add composite unique constraint
    await pool.query(`
      ALTER TABLE grade_config
      ADD CONSTRAINT grade_config_grade_category_unique
      UNIQUE (grade_code, category)
    `).catch(() => {
      // Constraint already exists — safe to ignore
    })

    // Step 5 — Get current Phones multipliers to copy across categories
    const phonesResult = await pool.query(`
      SELECT grade_code, label, multiplier, sort_order, visible
      FROM grade_config
      WHERE category = 'Phones'
      ORDER BY sort_order
    `)

    const otherCategories = ['Tablets', 'Laptops', 'Wearables']
    let seeded = 0

    for (const category of otherCategories) {
      for (const row of phonesResult.rows) {
        await pool.query(`
          INSERT INTO grade_config (grade_code, label, multiplier, sort_order, visible, category)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (grade_code, category) DO NOTHING
        `, [row.grade_code, row.label, parseFloat(row.multiplier), row.sort_order, row.visible, category])
        seeded++
      }
    }

    // Verify final state
    const countResult = await pool.query(`
      SELECT category, COUNT(*) as grade_count
      FROM grade_config
      GROUP BY category
      ORDER BY category
    `)

    res.status(200).json({
      success: true,
      message: 'grade_config migration complete',
      seeded,
      categories: countResult.rows,
    })

  } catch (err: any) {
    console.error('migrate-grade-categories error:', err)
    res.status(500).json({ error: err.message || String(err) })
  } finally {
    await pool.end()
  }
}