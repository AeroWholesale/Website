import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Bulk SKU Management API
 * 
 * GET  /api/sc/bulk  → export all products as JSON (frontend converts to Excel)
 * POST /api/sc/bulk  → import changes from frontend (hide/show, grade, family assignment)
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    if (req.method === 'GET') {
      // Ensure columns exist
      await pool.query(`
        ALTER TABLE products ADD COLUMN IF NOT EXISTS hidden_from_site BOOLEAN DEFAULT false;
        ALTER TABLE products ADD COLUMN IF NOT EXISTS review_status TEXT DEFAULT 'pending';
      `)

      const filter = (req.query.filter as string) || 'all'

      let whereClause = 'WHERE is_active = true'
      if (filter === 'in-stock') whereClause += ' AND quantity > 0'
      if (filter === 'no-grade') whereClause += ` AND (grade IS NULL OR grade = '')`
      if (filter === 'hidden') whereClause += ' AND hidden_from_site = true'
      if (filter === 'zero-stock-90') whereClause += ` AND quantity = 0 AND last_synced_at < NOW() - INTERVAL '90 days'`

      const result = await pool.query(`
        SELECT sku, model, brand, device_type, grade, grade_description,
               carrier, storage, color, cost, quantity, available_quantity,
               hidden_from_site, review_status, image_url,
               last_synced_at, updated_at
        FROM products
        ${whereClause}
        ORDER BY brand, model, sku
      `)

      res.status(200).json({
        products: result.rows,
        count: result.rows.length,
        exportedAt: new Date().toISOString(),
        filters: { applied: filter }
      })
      return
    }

    if (req.method === 'POST') {
      const { changes } = req.body

      if (!changes || !Array.isArray(changes)) {
        res.status(400).json({ error: 'changes[] array required' })
        return
      }

      // Ensure columns exist
      await pool.query(`
        ALTER TABLE products ADD COLUMN IF NOT EXISTS hidden_from_site BOOLEAN DEFAULT false;
        ALTER TABLE products ADD COLUMN IF NOT EXISTS review_status TEXT DEFAULT 'pending';
      `)

      let applied = 0
      let errors: string[] = []

      for (const change of changes) {
        try {
          const { sku, field, value } = change
          if (!sku || !field) continue

          if (field === 'hidden_from_site') {
            await pool.query(`UPDATE products SET hidden_from_site = $1, updated_at = NOW() WHERE sku = $2`, [value === true || value === 'true', sku])
            applied++
          } else if (field === 'grade') {
            const VALID = ['NE', 'CAP1', 'CAP', 'CA+', 'CA', 'CAB', 'SD', 'SD-', 'SDB', 'XF', 'XC', 'XIMEI', 'INTAKE']
            if (VALID.includes(value)) {
              await pool.query(`UPDATE products SET grade = $1, updated_at = NOW() WHERE sku = $2`, [value, sku])
              applied++
            } else {
              errors.push(`Invalid grade "${value}" for ${sku}`)
            }
          } else if (field === 'visible') {
            // This is a shorthand: visible=false means hidden_from_site=true
            await pool.query(`UPDATE products SET hidden_from_site = $1, updated_at = NOW() WHERE sku = $2`, [value === false || value === 'false', sku])
            applied++
          }
        } catch (err) {
          errors.push(`Error updating ${change.sku}: ${String(err)}`)
        }
      }

      res.status(200).json({ success: true, applied, errors: errors.length > 0 ? errors : undefined })
      return
    }

    res.status(405).json({ error: 'Method not allowed' })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}