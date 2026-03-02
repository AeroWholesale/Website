import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

// Unsellable grades — never show on public catalog
const UNSELLABLE_GRADES = ['XF', 'XC', 'INTAKE', 'XIMEI']

// Normalize shadow SKU grades: CAS1 → CA, SDS1 → SD, CA+S1 → CA+, etc.
function normalizeGrade(grade: string): string {
  return grade.replace(/S\d+$/, '')
}

// Generation markers that can appear anywhere in SKU (e.g., AP-IPDP11-A2435-4G-HSO...)
const GENERATION_MARKERS = ['1G', '2G', '3G', '4G', '5G', '6G', '7G', '8G', '9G', '10G']

// Extract model code from full SKU by matching against known families
function getModelCode(sku: string, familyMap: Record<string, any>): string {
  const afterColon = sku.includes(':') ? sku.split(':')[1] : sku
  const parts = afterColon.split('-')
  if (parts.length < 2) return afterColon

  // First: check if any family code uses a generation marker (e.g., AP-IPDP11-4G)
  // Scan SKU parts for generation markers and try base + generation combo
  const baseCode = parts.slice(0, 2).join('-')
  for (const part of parts.slice(2)) {
    if (GENERATION_MARKERS.includes(part)) {
      const genCode = baseCode + '-' + part
      if (familyMap[genCode]) return genCode
    }
  }

  // Second: try progressively longer prefix matches (existing logic)
  for (let i = parts.length - 1; i >= 2; i--) {
    const candidate = parts.slice(0, i).join('-')
    if (familyMap[candidate]) return candidate
  }

  // Default: first two parts
  return parts.slice(0, 2).join('-')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    const {
      category, brand, grade, storage, carrier, search,
      sort = 'name', page = '1', size = '24'
    } = req.query as Record<string, string>

    // ── Load config from DB ───────────────────────────────────────────
    const [familyRows, gradeRows, carrierRows, colorRows] = await Promise.all([
      pool.query(`SELECT model_code, name, brand, category, image_url, visible FROM product_families`),
      pool.query(`SELECT grade_code, label, multiplier, sort_order, visible FROM grade_config`),
      pool.query(`SELECT code, display_name FROM carrier_map`),
      pool.query(`SELECT code, display_name FROM color_map`),
    ])

    // Build lookup maps from DB
    const familyMap: Record<string, { name: string; brand: string; category: string; image_url: string | null; visible: boolean }> = {}
    for (const r of familyRows.rows) {
      familyMap[r.model_code] = { name: r.name, brand: r.brand, category: r.category, image_url: r.image_url, visible: r.visible }
    }

    const gradeMap: Record<string, { label: string; multiplier: number; sort_order: number; visible: boolean }> = {}
    for (const r of gradeRows.rows) {
      gradeMap[r.grade_code] = { label: r.label, multiplier: parseFloat(r.multiplier), sort_order: r.sort_order, visible: r.visible }
    }

    const carrierMap: Record<string, string> = {}
    for (const r of carrierRows.rows) { carrierMap[r.code] = r.display_name }

    const colorMap: Record<string, string> = {}
    for (const r of colorRows.rows) { colorMap[r.code] = r.display_name }

    // ── Get all active products with stock ─────────────────────────────
    const result = await pool.query(`
      SELECT sku, model, brand, device_type, grade, grade_description,
             carrier, storage, color, cost, quantity, available_quantity,
             site_price, wholesale_price, image_url, warehouse_name,
             sold_30, sold_90
      FROM products
      WHERE is_active = true
        AND quantity > 0
        AND grade NOT IN ('XF', 'XC', 'INTAKE', 'XIMEI', '')
        AND grade IS NOT NULL
        AND COALESCE(hidden_from_site, false) = false
        AND sku NOT LIKE 'XA-%' AND sku NOT LIKE 'XA:%'
    `)

    // ── Group by parent product ────────────────────────────────────────
    const families: Record<string, {
      modelCode: string; name: string; brand: string; category: string
      skus: any[]; totalStock: number
      grades: Set<string>; storages: Set<string>; carriers: Set<string>; colors: Set<string>
      lowestPrice: number; highestPrice: number; image: string
    }> = {}

    for (const row of result.rows) {
      const modelCode = getModelCode(row.sku, familyMap)
      const mapping = familyMap[modelCode]
      if (!mapping) continue // Only show mapped + visible families
      if (!mapping.visible) continue

      const rawGrade = row.grade || ''
      const grade = normalizeGrade(rawGrade)
      if (UNSELLABLE_GRADES.includes(grade)) continue

      const gradeConfig = gradeMap[grade]
      const multiplier = gradeConfig?.multiplier || 1.30
      const price = Math.round((row.cost || 0) * multiplier * 100) / 100

      // Normalize carrier and color
      const normalizedCarrier = carrierMap[row.carrier] || row.carrier || ''
      const normalizedColor = colorMap[row.color] || row.color || ''

      if (!families[modelCode]) {
        families[modelCode] = {
          modelCode,
          name: mapping.name,
          brand: mapping.brand,
          category: mapping.category,
          skus: [],
          totalStock: 0,
          grades: new Set(),
          storages: new Set(),
          carriers: new Set(),
          colors: new Set(),
          lowestPrice: Infinity,
          highestPrice: 0,
          image: mapping.image_url || '',
        }
      }

      const family = families[modelCode]

      family.skus.push({
        sku: row.sku,
        grade,
        storage: row.storage,
        carrier: normalizedCarrier,
        color: normalizedColor,
        quantity: row.quantity,
        available: row.available_quantity,
      })
      family.totalStock += row.quantity || 0
      if (grade) family.grades.add(grade)
      if (row.storage) family.storages.add(row.storage)
      if (normalizedCarrier) family.carriers.add(normalizedCarrier)
      if (normalizedColor) family.colors.add(normalizedColor)
      if (price > 0 && price < family.lowestPrice) family.lowestPrice = price
      if (price > family.highestPrice) family.highestPrice = price
      // Image only comes from product_families.image_url — no random SC fallback
    }

    // ── Convert to array and apply filters ────────────────────────────
    let products = Object.values(families).map(f => ({
      modelCode: f.modelCode,
      name: f.name,
      brand: f.brand,
      category: f.category,
      totalStock: f.totalStock,
      skuCount: f.skus.length,
      grades: Array.from(f.grades).sort((a, b) => {
        const ao = gradeMap[a]?.sort_order ?? 99
        const bo = gradeMap[b]?.sort_order ?? 99
        return ao - bo
      }),
      storages: Array.from(f.storages).sort(),
      carriers: Array.from(f.carriers).sort(),
      colors: Array.from(f.colors).sort(),
      image: f.image,
      skus: f.skus,
    }))

    // Apply filters
    if (category) products = products.filter(p => p.category === category)
    if (brand) {
      const brands = brand.split(',')
      products = products.filter(p => brands.includes(p.brand))
    }
    if (grade) {
      const grades = grade.split(',')
      products = products.filter(p => p.grades.some(g => grades.includes(g)))
    }
    if (storage) {
      const storages = storage.split(',')
      products = products.filter(p => p.storages.some(s => storages.includes(s)))
    }
    if (carrier) {
      const carriers = carrier.split(',')
      products = products.filter(p => p.carriers.some(c => carriers.includes(c)))
    }
    if (search) {
      const q = search.toLowerCase()
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.modelCode.toLowerCase().includes(q) ||
        p.skus.some((s: any) => s.sku.toLowerCase().includes(q))
      )
    }

    // Sort
    if (sort === 'stock') {
      products.sort((a, b) => b.totalStock - a.totalStock)
    } else {
      products.sort((a, b) => a.name.localeCompare(b.name))
    }

    // Build filter options from ALL products (not just filtered)
    const allProducts = Object.values(families)
    const filterOptions = {
      categories: [...new Set(allProducts.map(p => p.category))].sort(),
      brands: [...new Set(allProducts.map(p => p.brand))].sort(),
      grades: [...new Set(allProducts.flatMap(p => Array.from(p.grades)))].sort((a, b) => {
        return (gradeMap[a]?.sort_order ?? 99) - (gradeMap[b]?.sort_order ?? 99)
      }),
      storages: [...new Set(allProducts.flatMap(p => Array.from(p.storages)))].sort(),
      carriers: [...new Set(allProducts.flatMap(p => Array.from(p.carriers)))].sort(),
    }

    // Paginate
    const pageNum = parseInt(page) || 1
    const pageSize = Math.min(parseInt(size) || 24, 10000)
    const total = products.length
    const paginated = products.slice((pageNum - 1) * pageSize, pageNum * pageSize)

    // Strip prices and cost from public response
    const sanitized = paginated.map(p => ({
      modelCode: p.modelCode,
      name: p.name,
      brand: p.brand,
      category: p.category,
      totalStock: p.totalStock,
      skuCount: p.skuCount,
      grades: p.grades,
      storages: p.storages,
      carriers: p.carriers,
      colors: p.colors,
      image: p.image,
      skus: p.skus.map((s: any) => ({
        sku: s.sku,
        grade: s.grade,
        storage: s.storage,
        carrier: s.carrier,
        color: s.color,
        quantity: s.quantity,
        available: s.available,
      }))
    }))

    // Build grade labels from DB
    const gradeLabels: Record<string, string> = {}
    for (const [code, cfg] of Object.entries(gradeMap)) {
      if (cfg.visible) gradeLabels[code] = cfg.label
    }

    res.status(200).json({
      products: sanitized,
      total,
      page: pageNum,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      filterOptions,
      gradeLabels,
    })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}