import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Admin API for product families
 * 
 * GET  /api/sc/catalog  → list all families with stock counts + unmapped SKUs
 * POST /api/sc/catalog  → create or update a family
 * DELETE /api/sc/catalog?id=123  → delete a family
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    if (req.method === 'GET') {
      const [familyResult, skuResult] = await Promise.all([
        pool.query(`SELECT id, model_code, name, brand, category, image_url, visible, sort_order, created_at, updated_at FROM product_families ORDER BY brand, name`),
        pool.query(`SELECT sku, model, brand, device_type, grade, quantity, available_quantity, cost, image_url FROM products WHERE is_active = true AND quantity > 0 AND grade NOT IN ('XF', 'XC', 'INTAKE', 'XIMEI') AND sku NOT LIKE 'XA-%' AND sku NOT LIKE 'XA:%'`)
      ])

      const familyMap: Record<string, any> = {}
      for (const f of familyResult.rows) {
        familyMap[f.model_code] = { ...f, stock: 0, skuCount: 0 }
      }

      const unmapped: Record<string, { modelCode: string; sampleSku: string; scName: string; brand: string; deviceType: string; totalQty: number; skuCount: number }> = {}

      for (const row of skuResult.rows) {
        const modelCode = extractModelCode(row.sku, familyMap)
        if (familyMap[modelCode]) {
          familyMap[modelCode].stock += row.quantity || 0
          familyMap[modelCode].skuCount++
        } else {
          if (!unmapped[modelCode]) {
            unmapped[modelCode] = { modelCode, sampleSku: row.sku, scName: row.model || modelCode, brand: row.brand || '', deviceType: row.device_type || '', totalQty: 0, skuCount: 0 }
          }
          unmapped[modelCode].totalQty += row.quantity || 0
          unmapped[modelCode].skuCount++
        }
      }

      const unmappedList = Object.values(unmapped).sort((a, b) => b.totalQty - a.totalQty)

      res.status(200).json({
        families: Object.values(familyMap),
        unmapped: unmappedList,
        totals: {
          families: familyResult.rows.length,
          unmappedGroups: unmappedList.length,
          unmappedSkus: unmappedList.reduce((s, u) => s + u.skuCount, 0),
          unmappedQty: unmappedList.reduce((s, u) => s + u.totalQty, 0),
        }
      })
      return
    }

    if (req.method === 'POST') {
      const { id, model_code, name, brand, category, image_url, visible } = req.body
      if (!model_code || !name || !brand) {
        res.status(400).json({ error: 'model_code, name, and brand are required' })
        return
      }

      if (id) {
        await pool.query(`UPDATE product_families SET model_code=$1, name=$2, brand=$3, category=$4, image_url=$5, visible=$6, updated_at=NOW() WHERE id=$7`,
          [model_code, name, brand, category || 'Phones', image_url || null, visible !== false, id])
      } else {
        await pool.query(`INSERT INTO product_families (model_code, name, brand, category, image_url, visible) VALUES ($1,$2,$3,$4,$5,$6) ON CONFLICT (model_code) DO UPDATE SET name=EXCLUDED.name, brand=EXCLUDED.brand, category=EXCLUDED.category, image_url=EXCLUDED.image_url, visible=EXCLUDED.visible, updated_at=NOW()`,
          [model_code, name, brand, category || 'Phones', image_url || null, visible !== false])
      }

      res.status(200).json({ success: true })
      return
    }

    if (req.method === 'DELETE') {
      const { id } = req.query
      if (!id) { res.status(400).json({ error: 'id required' }); return }
      await pool.query(`DELETE FROM product_families WHERE id = $1`, [id])
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

// Generation markers that can appear anywhere in SKU (e.g., AP-IPDP11-A2435-4G-HSO...)
const GENERATION_MARKERS = ['1G', '2G', '3G', '4G', '5G', '6G', '7G', '8G', '9G', '10G']

function extractModelCode(sku: string, familyMap: Record<string, any>): string {
  const afterColon = sku.includes(':') ? sku.split(':')[1] : sku
  const parts = afterColon.split('-')
  if (parts.length < 2) return afterColon

  // First: check for generation marker families (e.g., AP-IPDP11-4G)
  const baseCode = parts.slice(0, 2).join('-')
  for (const part of parts.slice(2)) {
    if (GENERATION_MARKERS.includes(part)) {
      const genCode = baseCode + '-' + part
      if (familyMap[genCode]) return genCode
    }
  }

  // Second: try progressively longer prefix matches
  for (let i = parts.length - 1; i >= 2; i--) {
    const candidate = parts.slice(0, i).join('-')
    if (familyMap[candidate]) return candidate
  }
  return parts.slice(0, 2).join('-')
}
