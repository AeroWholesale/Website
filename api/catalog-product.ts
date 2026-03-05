import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

const UNSELLABLE_GRADES = ['XF', 'XC', 'INTAKE', 'XIMEI']
const GENERATION_MARKERS = ['1G', '2G', '3G', '4G', '5G', '6G', '7G', '8G', '9G', '10G']
const WEARABLE_CATEGORIES = ['Wearables', 'Headphones', 'Accessories']
const CELLULAR_CARRIERS = ['AT&T', 'Verizon', 'T-Mobile', 'Sprint', 'US Cellular', 'Boost', 'Cricket', 'Metro', 'Xfinity', 'Straight Talk']

function normalizeGrade(grade: string): string {
  return grade.replace(/S\d+$/, '')
}

function getModelCode(sku: string, familyMap: Record<string, any>): string {
  const afterColon = sku.includes(':') ? sku.split(':')[1] : sku
  const parts = afterColon.split('-')
  if (parts.length < 2) return afterColon
  const baseCode = parts.slice(0, 2).join('-')
  for (const part of parts.slice(2)) {
    if (GENERATION_MARKERS.includes(part)) {
      const genCode = baseCode + '-' + part
      if (familyMap[genCode]) return genCode
    }
  }
  for (let i = parts.length - 1; i >= 2; i--) {
    const candidate = parts.slice(0, i).join('-')
    if (familyMap[candidate]) return candidate
  }
  return parts.slice(0, 2).join('-')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    const { modelCode } = req.query as Record<string, string>
    if (!modelCode) return res.status(400).json({ error: 'modelCode required' })

    const authHeader = req.headers.authorization || ''
    const token = authHeader.replace('Bearer ', '').trim()
    let showPrices = false
    if (token) {
      const sessionCheck = await pool.query(
        'SELECT s.id FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token = $1 AND s.expires_at > NOW() AND u.active = true',
        [token]
      )
      showPrices = sessionCheck.rows.length > 0
    }

    const [familyRows, gradeRows, carrierRows, colorRows] = await Promise.all([
      pool.query(`SELECT model_code, name, brand, category, image_url, visible FROM product_families WHERE model_code = $1`, [modelCode]),
      pool.query(`SELECT grade_code, label, multiplier, sort_order, visible FROM grade_config`),
      pool.query(`SELECT code, display_name FROM carrier_map`),
      pool.query(`SELECT code, display_name FROM color_map`),
    ])

    if (!familyRows.rows.length) return res.status(404).json({ error: 'Product not found' })

    const mapping = familyRows.rows[0]
    if (!mapping.visible) return res.status(404).json({ error: 'Product not found' })

    const gradeMap: Record<string, { label: string; multiplier: number; sort_order: number }> = {}
    for (const r of gradeRows.rows) {
      gradeMap[r.grade_code] = { label: r.label, multiplier: parseFloat(r.multiplier), sort_order: r.sort_order }
    }

    const carrierMap: Record<string, string> = {}
    for (const r of carrierRows.rows) { carrierMap[r.code] = r.display_name }

    const colorMap: Record<string, string> = {}
    for (const r of colorRows.rows) { colorMap[r.code] = r.display_name }

    // Build a familyMap just for getModelCode
    const allFamilyRows = await pool.query(`SELECT model_code FROM product_families`)
    const familyMap: Record<string, boolean> = {}
    for (const r of allFamilyRows.rows) { familyMap[r.model_code] = true }

    const result = await pool.query(`
      SELECT sku, grade, carrier, storage, color, cost, quantity, available_quantity
      FROM products
      WHERE is_active = true AND quantity > 0
        AND grade NOT IN ('XF', 'XC', 'INTAKE', 'XIMEI', '')
        AND grade IS NOT NULL
        AND sku NOT LIKE 'XA-%' AND sku NOT LIKE 'XA:%'
        AND warehouse_name = 'AW Main'
    `)

    const skus: any[] = []
    let totalStock = 0
    const grades = new Set<string>()
    const storages = new Set<string>()
    const carriers = new Set<string>()
    const colors = new Set<string>()
    let lowestPrice = Infinity
    let highestPrice = 0

    for (const row of result.rows) {
      const rowModelCode = getModelCode(row.sku, familyMap)
      if (rowModelCode !== modelCode) continue

      const grade = normalizeGrade(row.grade || '')
      if (UNSELLABLE_GRADES.includes(grade)) continue

      const multiplier = gradeMap[grade]?.multiplier || 1.30
      const price = Math.ceil((row.cost || 0) * multiplier)

      const rawCarrier = carrierMap[row.carrier] || row.carrier || ''
      const isWearable = WEARABLE_CATEGORIES.includes(mapping.category)
      let normalizedCarrier = rawCarrier
      if (isWearable && rawCarrier) {
        if (rawCarrier === 'Unlocked' || rawCarrier === 'WiFi' || rawCarrier === 'WiFi Only') {
          normalizedCarrier = 'WiFi'
        } else if (CELLULAR_CARRIERS.some(c => rawCarrier.toLowerCase().includes(c.toLowerCase())) || rawCarrier === 'Cellular') {
          normalizedCarrier = 'Cellular'
        } else {
          normalizedCarrier = 'WiFi'
        }
      }

      const normalizedColor = colorMap[row.color] || row.color || ''

      skus.push({
        sku: row.sku,
        grade,
        storage: row.storage,
        carrier: normalizedCarrier,
        color: normalizedColor,
        quantity: row.quantity,
        available: row.available_quantity,
        price: showPrices ? (price > 0 ? price : null) : null,
      })

      totalStock += row.quantity || 0
      if (grade) grades.add(grade)
      if (row.storage) storages.add(row.storage)
      if (normalizedCarrier) carriers.add(normalizedCarrier)
      if (normalizedColor) colors.add(normalizedColor)
      if (price > 0 && price < lowestPrice) lowestPrice = price
      if (price > highestPrice) highestPrice = price
    }

    if (!skus.length) return res.status(404).json({ error: 'No stock found' })

    res.status(200).json({
      modelCode,
      name: mapping.name,
      brand: mapping.brand,
      category: mapping.category,
      image: mapping.image_url || '',
      totalStock,
      skus,
      grades: Array.from(grades).sort((a, b) => (gradeMap[a]?.sort_order ?? 99) - (gradeMap[b]?.sort_order ?? 99)),
      storages: Array.from(storages).sort(),
      carriers: Array.from(carriers).sort(),
      colors: Array.from(colors).sort(),
      lowestPrice: showPrices ? (lowestPrice === Infinity ? null : lowestPrice) : null,
      highestPrice: showPrices ? (highestPrice || null) : null,
    })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}