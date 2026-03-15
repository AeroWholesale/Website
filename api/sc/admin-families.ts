import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Admin Families API
 * GET  /api/sc/admin-families              — list all families with SKU counts
 * GET  /api/sc/admin-families?family=CODE  — single family with all SKUs
 * POST /api/sc/admin-families              — create new family
 *   Body: { modelCode, name, brand, category, visible }
 * PATCH /api/sc/admin-families
 *   Body: { type: 'family', id, visible?, image_url? }
 *   Body: { type: 'sku', sku, hidden }
 *   Body: { type: 'bulk-hide', modelCode }
 *   Body: { type: 'rename', id, name }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {

    // ── POST — Create new family ───────────────────────────────────────
    if (req.method === 'POST') {
      const { modelCode, name, brand, category, visible } = req.body || {}
      if (!modelCode || !name) {
        res.status(400).json({ error: 'modelCode and name required' }); return
      }
      const existing = await pool.query(
        'SELECT id FROM product_families WHERE model_code = $1',
        [modelCode]
      )
      if (existing.rows.length > 0) {
        res.status(400).json({ error: 'A family with this model code already exists' }); return
      }
      await pool.query(
        `INSERT INTO product_families (model_code, name, brand, category, visible, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
        [modelCode, name, brand || 'Apple', category || 'Phones', visible !== false]
      )
      res.status(200).json({ success: true }); return
    }

    // ── PATCH ─────────────────────────────────────────────────────────
    if (req.method === 'PATCH') {
      const { type } = req.body || {}

      if (type === 'family') {
        const { id, visible, image_url } = req.body
        if (!id) {
          res.status(400).json({ error: 'id required' }); return
        }

        const setClauses: string[] = ['updated_at = NOW()']
        const values: any[] = []

        if (visible !== undefined) {
          values.push(visible)
          setClauses.push(`visible = $${values.length}`)
        }

        if (image_url !== undefined) {
          values.push(image_url === '' ? null : image_url)
          setClauses.push(`image_url = $${values.length}`)
        }

        if (values.length === 0) {
          res.status(400).json({ error: 'No fields to update' }); return
        }

        values.push(id)
        await pool.query(
          `UPDATE product_families SET ${setClauses.join(', ')} WHERE id = $${values.length}`,
          values
        )
        res.status(200).json({ success: true }); return
      }

      if (type === 'rename') {
        const { id, name } = req.body
        if (!id || !name) {
          res.status(400).json({ error: 'id and name required' }); return
        }
        await pool.query(
          `UPDATE product_families SET name = $1, updated_at = NOW() WHERE id = $2`,
          [name.trim(), id]
        )
        res.status(200).json({ success: true }); return
      }

      if (type === 'sku') {
        const { sku, hidden } = req.body
        if (!sku || hidden === undefined) {
          res.status(400).json({ error: 'sku and hidden required' }); return
        }
        await pool.query(
          `UPDATE products SET hidden_from_site = $1, updated_at = NOW() WHERE sku = $2`,
          [hidden, sku]
        )
        res.status(200).json({ success: true }); return
      }

      if (type === 'bulk-hide') {
        const { modelCode } = req.body
        if (!modelCode) {
          res.status(400).json({ error: 'modelCode required' }); return
        }
        await pool.query(
          `UPDATE products SET hidden_from_site = true, updated_at = NOW()
           WHERE sku LIKE $1 AND grade NOT IN ('XF', 'XC', 'INTAKE')`,
          [`%${modelCode}%`]
        )
        res.status(200).json({ success: true }); return
      }

      res.status(400).json({ error: 'Invalid patch type' }); return
    }

    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' }); return
    }

    const { family, search, brand, category, visibility, sort } = req.query

    // ── Single family detail with all SKUs ────────────────────────────
    if (family) {
      const familyCode = String(family)

      const famResult = await pool.query(
        `SELECT id, model_code, name, brand, category, image_url, visible, sort_order, created_at, updated_at
         FROM product_families WHERE model_code = $1`,
        [familyCode]
      )

      if (famResult.rows.length === 0) {
        res.status(404).json({ error: 'Family not found' }); return
      }

      const fam = famResult.rows[0]

      const skuResult = await pool.query(
        `SELECT sku, model, brand, device_type, grade, grade_description,
                carrier, storage, color, cost, quantity, available_quantity,
                site_price, wholesale_price, hidden_from_site, review_status,
                is_active, warehouse_name, sold_30, sold_90, created_at, updated_at
         FROM products
         WHERE sku LIKE $1
         ORDER BY
           CASE WHEN grade = 'INTAKE' THEN 1 ELSE 0 END,
           CASE grade
             WHEN 'CAP1' THEN 1 WHEN 'NE' THEN 2 WHEN 'CAP' THEN 3
             WHEN 'CA+' THEN 4 WHEN 'CA' THEN 5 WHEN 'CAB' THEN 6
             WHEN 'SD' THEN 7 WHEN 'SD-' THEN 8 WHEN 'SDB' THEN 9
             ELSE 10 END,
           storage DESC, carrier, color`,
        [`%${familyCode}%`]
      )

      let gradeRows: any[] = []
      try {
        const r = await pool.query(
          `SELECT grade_code, multiplier, label, category FROM grade_config WHERE visible = true`
        )
        gradeRows = r.rows
      } catch {
        const r = await pool.query(
          `SELECT grade_code, multiplier, label FROM grade_config WHERE visible = true`
        )
        gradeRows = r.rows.map((row: any) => ({ ...row, category: null }))
      }

      const gradeMap: Record<string, { multiplier: number; label: string }> = {}
      const famCategory = fam.category || 'Phones'
      for (const g of gradeRows) {
        const cat = g.category || 'Phones'
        if (cat === famCategory) {
          gradeMap[g.grade_code] = { multiplier: parseFloat(g.multiplier), label: g.label }
        }
      }
      if (Object.keys(gradeMap).length === 0) {
        for (const g of gradeRows) {
          if (!gradeMap[g.grade_code]) {
            gradeMap[g.grade_code] = { multiplier: parseFloat(g.multiplier), label: g.label }
          }
        }
      }

      const skus = skuResult.rows.map(s => {
        const cost = parseFloat(s.cost) || 0
        const gradeInfo = gradeMap[s.grade]
        const calculatedPrice = gradeInfo ? Math.ceil(cost * gradeInfo.multiplier) : null
        const sitePrice = parseFloat(s.site_price) || null

        return {
          sku: s.sku,
          grade: s.grade,
          gradeLabel: gradeInfo?.label || s.grade_description || s.grade || 'Unknown',
          storage: s.storage || '',
          carrier: s.carrier || '',
          color: s.color || '',
          quantity: parseInt(s.quantity) || 0,
          available: parseInt(s.available_quantity) || 0,
          cost,
          calculatedPrice,
          sitePrice,
          priceOverride: sitePrice && calculatedPrice && Math.abs(sitePrice - calculatedPrice) > 0.01 ? sitePrice : null,
          hidden: s.hidden_from_site === true,
          isActive: s.is_active !== false,
          isIntake: s.grade === 'INTAKE',
          reviewStatus: s.review_status || 'pending',
          sold30: parseInt(s.sold_30) || 0,
          sold90: parseInt(s.sold_90) || 0,
        }
      })

      const visible = skus.filter(s => !s.hidden && !s.isIntake && s.isActive)
      const hidden = skus.filter(s => s.hidden && !s.isIntake)
      const intake = skus.filter(s => s.isIntake)
      const totalStock = skus.reduce((sum, s) => sum + s.quantity, 0)
      const totalAvail = skus.reduce((sum, s) => sum + s.available, 0)

      res.status(200).json({
        family: {
          id: fam.id,
          modelCode: fam.model_code,
          name: fam.name,
          brand: fam.brand,
          category: fam.category,
          imageUrl: fam.image_url || '',
          visible: fam.visible,
          sortOrder: fam.sort_order,
        },
        stats: {
          totalSkus: skus.length,
          visibleSkus: visible.length,
          hiddenSkus: hidden.length,
          intakeSkus: intake.length,
          totalStock,
          totalAvail,
        },
        skus: { visible, hidden, intake },
        gradeMap,
      })
      return
    }

    // ── Family list ───────────────────────────────────────────────────
    const familiesResult = await pool.query(
      `SELECT id, model_code, name, brand, category, image_url, visible, sort_order
       FROM product_families ORDER BY name`
    )

    const skuStatsResult = await pool.query(`
      SELECT pf.model_code,
             COUNT(p.id) as sku_count,
             COALESCE(SUM(p.quantity), 0) as total_stock,
             COALESCE(SUM(p.available_quantity), 0) as total_avail,
             COUNT(CASE WHEN p.hidden_from_site = true THEN 1 END) as hidden_count,
             COUNT(CASE WHEN p.grade = 'INTAKE' THEN 1 END) as intake_count,
             COUNT(CASE WHEN p.hidden_from_site = false AND p.grade != 'INTAKE' AND p.is_active = true THEN 1 END) as visible_count
      FROM product_families pf
      LEFT JOIN products p ON p.sku LIKE '%' || pf.model_code || '%'
      GROUP BY pf.model_code
    `)

    const statsMap: Record<string, any> = {}
    for (const row of skuStatsResult.rows) {
      statsMap[row.model_code] = {
        skuCount: parseInt(row.sku_count) || 0,
        totalStock: parseInt(row.total_stock) || 0,
        totalAvail: parseInt(row.total_avail) || 0,
        hiddenCount: parseInt(row.hidden_count) || 0,
        intakeCount: parseInt(row.intake_count) || 0,
        visibleCount: parseInt(row.visible_count) || 0,
      }
    }

    let families = familiesResult.rows.map(f => ({
      id: f.id,
      modelCode: f.model_code,
      name: f.name,
      brand: f.brand,
      category: f.category,
      imageUrl: f.image_url || '',
      visible: f.visible,
      ...(statsMap[f.model_code] || { skuCount: 0, totalStock: 0, totalAvail: 0, hiddenCount: 0, intakeCount: 0, visibleCount: 0 }),
    }))

    if (search) {
      const q = String(search).toLowerCase()
      families = families.filter(f => f.name.toLowerCase().includes(q) || f.modelCode.toLowerCase().includes(q))
    }
    if (brand) families = families.filter(f => f.brand === String(brand))
    if (category) families = families.filter(f => f.category === String(category))
    if (visibility === 'visible') families = families.filter(f => f.visible)
    if (visibility === 'hidden') families = families.filter(f => !f.visible)

    const sortBy = String(sort || 'name')
    families.sort((a, b) => {
      if (sortBy === 'stock') return b.totalStock - a.totalStock
      if (sortBy === 'brand') return a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name)
      if (sortBy === 'category') return a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      if (sortBy === 'skus') return b.skuCount - a.skuCount
      return a.name.localeCompare(b.name)
    })

    const totalFamilies = families.length
    const totalSkus = families.reduce((s, f) => s + f.skuCount, 0)
    const totalStock = families.reduce((s, f) => s + f.totalStock, 0)
    const visibleFamilies = families.filter(f => f.visible).length

    const allBrands = [...new Set(familiesResult.rows.map(f => f.brand))].sort()
    const allCategories = [...new Set(familiesResult.rows.map(f => f.category))].sort()

    const unmappedResult = await pool.query(`
      SELECT p.sku, p.model, p.brand, p.grade, p.quantity
      FROM products p
      WHERE p.is_active = true
        AND p.quantity > 0
        AND p.grade NOT IN ('XF', 'XC', 'INTAKE', 'XIMEI')
        AND NOT EXISTS (
          SELECT 1 FROM product_families pf
          WHERE p.sku LIKE '%' || pf.model_code || '%'
        )
      ORDER BY p.quantity DESC
      LIMIT 50
    `)

    res.status(200).json({
      families,
      totals: { totalFamilies, visibleFamilies, totalSkus, totalStock },
      filters: { brands: allBrands, categories: allCategories },
      unmapped: unmappedResult.rows.map(r => ({
        sku: r.sku,
        model: r.model || '',
        brand: r.brand || '',
        grade: r.grade || '',
        quantity: parseInt(r.quantity) || 0,
        reason: 'No family match',
      })),
    })

  } catch (err: any) {
    console.error('admin-families error:', err)
    res.status(500).json({ error: err.message || 'Server error' })
  } finally {
    await pool.end()
  }
}
