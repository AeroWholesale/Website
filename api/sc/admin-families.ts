import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Admin Families API — full product family data with all SKUs for admin panel
 * GET /api/sc/admin-families — list all families with SKU counts
 * GET /api/sc/admin-families?family=AP-IP15 — get single family with all SKUs
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    const { family, search, brand, category, visibility, sort } = req.query

    // ── Single family detail with all SKUs ──
    if (family) {
      const familyCode = String(family)
      
      // Get family info
      const famResult = await pool.query(
        `SELECT id, model_code, name, brand, category, image_url, visible, sort_order, created_at, updated_at
         FROM product_families WHERE model_code = $1`,
        [familyCode]
      )
      
      if (famResult.rows.length === 0) {
        res.status(404).json({ error: 'Family not found' })
        return
      }

      const fam = famResult.rows[0]

      // Get ALL SKUs for this family (including hidden, intake, zero-stock)
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

      // Get grade multipliers for price calculation
      const gradeResult = await pool.query(
        `SELECT grade_code, multiplier, label FROM grade_config WHERE visible = true`
      )
      const gradeMap: Record<string, { multiplier: number; label: string }> = {}
      for (const g of gradeResult.rows) {
        gradeMap[g.grade_code] = { multiplier: parseFloat(g.multiplier), label: g.label }
      }

      const skus = skuResult.rows.map(s => {
        const cost = parseFloat(s.cost) || 0
        const gradeInfo = gradeMap[s.grade]
        const calculatedPrice = gradeInfo ? Math.round(cost * gradeInfo.multiplier * 100) / 100 : null
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

    // ── Family list (no SKU detail) ──
    const familiesResult = await pool.query(
      `SELECT id, model_code, name, brand, category, image_url, visible, sort_order
       FROM product_families ORDER BY name`
    )

    // Get SKU counts and stock per family
    const skuStatsResult = await pool.query(`
      SELECT pf.model_code,
             COUNT(p.id) as sku_count,
             COALESCE(SUM(p.quantity), 0) as total_stock,
             COALESCE(SUM(p.available_quantity), 0) as total_avail,
             COUNT(p.id) FILTER (WHERE p.hidden_from_site = true) as hidden_count,
             COUNT(p.id) FILTER (WHERE p.grade = 'INTAKE') as intake_count,
             COUNT(p.id) FILTER (WHERE p.hidden_from_site = false AND p.grade != 'INTAKE' AND p.is_active = true) as visible_count
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

    // Apply filters
    if (search) {
      const q = String(search).toLowerCase()
      families = families.filter(f => f.name.toLowerCase().includes(q) || f.modelCode.toLowerCase().includes(q))
    }
    if (brand) families = families.filter(f => f.brand === String(brand))
    if (category) families = families.filter(f => f.category === String(category))
    if (visibility === 'visible') families = families.filter(f => f.visible)
    if (visibility === 'hidden') families = families.filter(f => !f.visible)

    // Sort
    const sortBy = String(sort || 'name')
    families.sort((a, b) => {
      if (sortBy === 'stock') return b.totalStock - a.totalStock
      if (sortBy === 'brand') return a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name)
      if (sortBy === 'category') return a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
      if (sortBy === 'skus') return b.skuCount - a.skuCount
      return a.name.localeCompare(b.name)
    })

    // Totals
    const totalFamilies = families.length
    const totalSkus = families.reduce((s, f) => s + f.skuCount, 0)
    const totalStock = families.reduce((s, f) => s + f.totalStock, 0)
    const visibleFamilies = families.filter(f => f.visible).length

    // Brands and categories for filter dropdowns
    const allBrands = [...new Set(familiesResult.rows.map(f => f.brand))].sort()
    const allCategories = [...new Set(familiesResult.rows.map(f => f.category))].sort()

    res.status(200).json({
      families,
      totals: { totalFamilies, visibleFamilies, totalSkus, totalStock },
      filters: { brands: allBrands, categories: allCategories },
    })

  } catch (err: any) {
    console.error('admin-families error:', err)
    res.status(500).json({ error: err.message || 'Server error' })
  } finally {
    await pool.end()
  }
}
