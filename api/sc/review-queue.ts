import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Review Queue API — manages SKUs that need attention
 * 
 * GET  /api/sc/review-queue  → list products needing review (empty grade, unknown prefix, etc.)
 * POST /api/sc/review-queue  → update a product (hide, assign grade, etc.)
 */

const VALID_GRADES = ['NE', 'CAP1', 'CAP', 'CA+', 'CA', 'CAB', 'SD', 'SD-', 'SDB', 'XF', 'XC', 'XIMEI', 'INTAKE']
const EXCLUDED_PREFIXES = ['AA', 'XA', 'IA', 'CA', 'CKA', 'IKA', 'HKO']
const INCLUDED_PREFIXES = ['PA', 'PKA', 'PKO', 'TA', 'TKA', 'TKO', 'LKA', 'LKO', 'AKA', 'AKO']

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    if (req.method === 'GET') {
      // Ensure hidden_from_site column exists
      await pool.query(`
        ALTER TABLE products ADD COLUMN IF NOT EXISTS hidden_from_site BOOLEAN DEFAULT false;
        ALTER TABLE products ADD COLUMN IF NOT EXISTS review_status TEXT DEFAULT 'pending';
        ALTER TABLE products ADD COLUMN IF NOT EXISTS review_note TEXT;
      `)

      const filter = (req.query.filter as string) || 'all'

      let whereClause = 'WHERE is_active = true'
      if (filter === 'no-grade') {
        whereClause += ` AND (grade IS NULL OR grade = '')`
      } else if (filter === 'hidden') {
        whereClause += ' AND hidden_from_site = true'
      } else if (filter === 'excluded-prefix') {
        const prefixChecks = EXCLUDED_PREFIXES.map((_, i) => `sku LIKE $${i + 1}`).join(' OR ')
        // Handle this separately below
      } else {
        // 'all' — show anything that needs review: empty grade OR hidden OR excluded prefix
        whereClause += ` AND (grade IS NULL OR grade = '' OR hidden_from_site = true)`
      }

      const result = await pool.query(`
        SELECT sku, model, brand, device_type, grade, grade_description,
               carrier, storage, color, cost, quantity, available_quantity,
               image_url, hidden_from_site, review_status, review_note,
               last_synced_at
        FROM products
        ${whereClause}
        ORDER BY quantity DESC, sku ASC
        LIMIT 500
      `)

      // Compute stats
      const statsResult = await pool.query(`
        SELECT
          COUNT(*) FILTER (WHERE (grade IS NULL OR grade = '') AND is_active = true) as no_grade_count,
          COUNT(*) FILTER (WHERE hidden_from_site = true AND is_active = true) as hidden_count,
          COUNT(*) FILTER (WHERE is_active = true AND quantity > 0 AND (grade IS NULL OR grade = '')) as no_grade_with_stock
        FROM products
      `)

      const stats = statsResult.rows[0] || {}

      res.status(200).json({
        items: result.rows,
        stats: {
          noGrade: parseInt(stats.no_grade_count) || 0,
          hidden: parseInt(stats.hidden_count) || 0,
          noGradeWithStock: parseInt(stats.no_grade_with_stock) || 0,
        },
        validGrades: VALID_GRADES.filter(g => !['XF', 'XC', 'XIMEI', 'INTAKE'].includes(g)),
        excludedPrefixes: EXCLUDED_PREFIXES,
        includedPrefixes: INCLUDED_PREFIXES,
      })
      return
    }

    if (req.method === 'POST') {
      const { action, skus } = req.body

      if (!action || !skus || !Array.isArray(skus) || skus.length === 0) {
        res.status(400).json({ error: 'action and skus[] required' })
        return
      }

      // Ensure columns exist
      await pool.query(`
        ALTER TABLE products ADD COLUMN IF NOT EXISTS hidden_from_site BOOLEAN DEFAULT false;
        ALTER TABLE products ADD COLUMN IF NOT EXISTS review_status TEXT DEFAULT 'pending';
        ALTER TABLE products ADD COLUMN IF NOT EXISTS review_note TEXT;
      `)

      const placeholders = skus.map((_: string, i: number) => `$${i + 1}`).join(', ')

      if (action === 'hide') {
        await pool.query(`UPDATE products SET hidden_from_site = true, review_status = 'hidden', updated_at = NOW() WHERE sku IN (${placeholders})`, skus)
      } else if (action === 'show') {
        await pool.query(`UPDATE products SET hidden_from_site = false, review_status = 'approved', updated_at = NOW() WHERE sku IN (${placeholders})`, skus)
      } else if (action === 'set-grade') {
        const { grade } = req.body
        if (!grade || !VALID_GRADES.includes(grade)) {
          res.status(400).json({ error: 'valid grade required' })
          return
        }
        const gradeDescs: Record<string, string> = {
          'NE': 'New', 'CA': 'Good', 'CA+': 'Excellent', 'CAB': 'Good (Batt<80%)',
          'CAP': 'Premium', 'CAP1': 'Premium 100%', 'SD': 'B-Grade',
          'SD-': 'C-Grade', 'SDB': 'B/C (Batt<80%)',
        }
        const desc = gradeDescs[grade] || grade
        await pool.query(
          `UPDATE products SET grade = $${skus.length + 1}, grade_description = $${skus.length + 2}, review_status = 'graded', updated_at = NOW() WHERE sku IN (${placeholders})`,
          [...skus, grade, desc]
        )
      } else {
        res.status(400).json({ error: `Unknown action: ${action}` })
        return
      }

      res.status(200).json({ success: true, affected: skus.length })
      return
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}