import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Pricing Grid API
 * GET  /api/sc/pricing — returns full category × grade multiplier grid
 * POST /api/sc/pricing — update a single cell { category, grade_code, multiplier }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    if (req.method === 'POST') {
      const { category, grade_code, multiplier } = req.body
      if (!category || !grade_code || multiplier === undefined) {
        res.status(400).json({ error: 'category, grade_code, and multiplier required' })
        return
      }
      const mult = parseFloat(multiplier)
      if (isNaN(mult) || mult < 1 || mult > 5) {
        res.status(400).json({ error: 'multiplier must be between 1.00 and 5.00' })
        return
      }

      await pool.query(
        `UPDATE grade_config SET multiplier = $1 WHERE grade_code = $2 AND category = $3`,
        [mult, grade_code, category]
      )

      res.status(200).json({ ok: true, category, grade_code, multiplier: mult })
      return
    }

    // GET — return full grid
    const result = await pool.query(
      `SELECT id, grade_code, label, multiplier, sort_order, visible, category
       FROM grade_config
       ORDER BY category, sort_order`
    )

    // Build grid structure
    const grades: { code: string; label: string; sortOrder: number }[] = []
    const seenGrades = new Set<string>()
    const categories = new Set<string>()
    const grid: Record<string, Record<string, number>> = {}

    for (const row of result.rows) {
      if (!seenGrades.has(row.grade_code)) {
        seenGrades.add(row.grade_code)
        grades.push({ code: row.grade_code, label: row.label, sortOrder: row.sort_order })
      }
      categories.add(row.category)
      if (!grid[row.category]) grid[row.category] = {}
      grid[row.category][row.grade_code] = parseFloat(row.multiplier)
    }

    grades.sort((a, b) => a.sortOrder - b.sortOrder)

    // Get a sample product for price preview
    const sampleResult = await pool.query(`
      SELECT pf.name, pf.category, p.grade, AVG(p.cost::numeric) as avg_cost
      FROM product_families pf
      JOIN products p ON p.sku LIKE '%' || pf.model_code || '%'
      WHERE p.is_active = true AND p.quantity > 0 AND p.cost > 0
        AND p.grade IN ('CAP1','NE','CAP','CA+','CA','CAB','SD','SD-','SDB')
      GROUP BY pf.name, pf.category, p.grade
      ORDER BY SUM(p.quantity) DESC
      LIMIT 50
    `)

    // Group samples by product
    const sampleProducts: Record<string, { name: string; category: string; grades: Record<string, number> }> = {}
    for (const row of sampleResult.rows) {
      if (!sampleProducts[row.name]) {
        sampleProducts[row.name] = { name: row.name, category: row.category, grades: {} }
      }
      sampleProducts[row.name].grades[row.grade] = parseFloat(row.avg_cost)
    }

    const samples = Object.values(sampleProducts).slice(0, 10)

    const sortedCategories = [...categories].sort((a, b) => {
      const order = ['Phones', 'Tablets', 'Laptops', 'Wearables', 'Accessories', 'default']
      return order.indexOf(a) - order.indexOf(b)
    })

    res.status(200).json({
      grades,
      categories: sortedCategories,
      grid,
      samples,
    })

  } catch (err: any) {
    console.error('pricing error:', err)
    res.status(500).json({ error: err.message || 'Server error' })
  } finally {
    await pool.end()
  }
}
