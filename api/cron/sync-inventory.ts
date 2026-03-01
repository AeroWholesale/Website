import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

const SC_BASE = 'https://bi.api.sellercloud.com/rest'

async function getToken(): Promise<string> {
  const res = await fetch(`${SC_BASE}/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Username: process.env.SC_USERNAME,
      Password: process.env.SC_PASSWORD
    })
  })
  if (!res.ok) throw new Error(`SC auth failed (${res.status})`)
  const data = await res.json()
  return data.access_token
}

function parseSku(sku: string) {
  // AW SKU: PREFIX:MFR-PROD-MODEL#-HSO-CARRIER-STORAGE-COLOR-GRADE
  const parts = sku.split('-')
  const prefix = parts[0] || ''

  const deviceTypes: Record<string, string> = {
    'PA': 'Phone', 'TA': 'Tablet', 'PKA': 'Phone (Kitted)',
    'LA': 'Laptop', 'WA': 'Watch'
  }
  const manufacturers: Record<string, string> = {
    'APPL': 'Apple', 'AP': 'Apple', 'SAMS': 'Samsung', 'SA': 'Samsung',
    'GOOG': 'Google', 'MOTO': 'Motorola', 'LG': 'LG'
  }
  const grades: Record<string, string> = {
    'CA': 'Good', 'CA+': 'Excellent', 'CAB': 'Good (Batt<80%)',
    'CAP': 'Premium', 'CAP1': 'Premium 100%', 'SD': 'B-Grade',
    'SD-': 'C-Grade', 'SDB': 'B/C (Batt<80%)',
    'XF': 'Failed Func', 'XC': 'Failed Cosmetic', 'INTAKE': 'Intake'
  }

  const prefixPart = prefix.split(':')[0] || ''
  const mfrCode = prefix.split(':')[1]?.split('-')[0] || (parts[0]?.includes(':') ? parts[0].split(':')[1] : '')

  const grade = parts[parts.length - 1] || ''
  const gradeDesc = grades[grade] || grade

  // Try to find carrier, storage, color from parts
  const carrierCodes = ['UN', 'TM', 'AT', 'VZ', 'SP', 'US']
  const storageSizes = ['32', '64', '128', '256', '512', '1TB', '2TB']

  let carrier = ''
  let storage = ''
  let color = ''

  for (const p of parts) {
    if (carrierCodes.includes(p)) carrier = p
    if (storageSizes.includes(p)) storage = p + (p.includes('TB') ? '' : 'GB')
  }

  // Color is typically second to last (before grade)
  if (parts.length >= 3) {
    const potentialColor = parts[parts.length - 2]
    if (!carrierCodes.includes(potentialColor) && !storageSizes.includes(potentialColor)) {
      color = potentialColor
    }
  }

  const carrierMap: Record<string, string> = {
    'UN': 'Unlocked', 'TM': 'T-Mobile', 'AT': 'AT&T',
    'VZ': 'Verizon', 'SP': 'Sprint', 'US': 'US Cellular'
  }

  return {
    deviceType: deviceTypes[prefixPart] || prefixPart,
    brand: manufacturers[mfrCode] || mfrCode,
    carrier: carrierMap[carrier] || carrier,
    storage,
    color,
    grade,
    gradeDescription: gradeDesc
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Verify this is a cron request or manual trigger
  const authHeader = req.headers['authorization']
  const isCron = authHeader === `Bearer ${process.env.CRON_SECRET}`
  const isManual = req.query.secret === process.env.CRON_SECRET

  if (!isCron && !isManual && process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  const startTime = Date.now()
  let logId: number | null = null

  try {
    // Create tables if they don't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        sku TEXT UNIQUE NOT NULL,
        brand TEXT,
        device_type TEXT,
        model TEXT,
        model_number TEXT,
        carrier TEXT,
        storage TEXT,
        color TEXT,
        grade TEXT,
        grade_description TEXT,
        condition_label TEXT,
        site_price NUMERIC(10,2),
        wholesale_price NUMERIC(10,2),
        cost NUMERIC(10,2),
        quantity INTEGER DEFAULT 0,
        available_quantity INTEGER DEFAULT 0,
        reserved_quantity INTEGER DEFAULT 0,
        warehouse_name TEXT,
        image_url TEXT,
        is_active BOOLEAN DEFAULT true,
        is_sellable BOOLEAN DEFAULT true,
        sold_30 INTEGER DEFAULT 0,
        sold_90 INTEGER DEFAULT 0,
        sold_365 INTEGER DEFAULT 0,
        last_synced_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS sync_log (
        id SERIAL PRIMARY KEY,
        status TEXT,
        products_synced INTEGER,
        products_added INTEGER,
        products_updated INTEGER,
        products_deactivated INTEGER,
        errors TEXT,
        duration_ms INTEGER,
        started_at TIMESTAMPTZ DEFAULT NOW(),
        completed_at TIMESTAMPTZ
      )
    `)

    // Start sync log
    const logResult = await pool.query(
      `INSERT INTO sync_log (status) VALUES ('running') RETURNING id`
    )
    logId = logResult.rows[0].id

    // Auth with SC
    const token = await getToken()
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    // Paginate through ALL inventory with physicalQty >= 1
    let page = 1
    const pageSize = 50
    let allItems: any[] = []
    let totalResults = 0

    while (true) {
      const url = new URL(`${SC_BASE}/api/inventory`)
      url.searchParams.set('pageSize', String(pageSize))
      url.searchParams.set('pageNumber', String(page))
      url.searchParams.set('physicalQtyFrom', '1')

      const r = await fetch(url.toString(), { headers })
      if (!r.ok) throw new Error(`SC API failed page ${page}: ${r.status}`)

      const data = await r.json()
      const items = data.Items || []
      totalResults = data.TotalResults || 0

      allItems = allItems.concat(items)

      if (allItems.length >= totalResults || items.length === 0) break
      page++

      // Safety: max 100 pages (5000 products)
      if (page > 100) break
    }

    // Upsert all products
    let added = 0
    let updated = 0

    for (const item of allItems) {
      const sku = item.ID
      if (!sku) continue

      const parsed = parseSku(sku)
      const isSellable = !['XF', 'XC', 'INTAKE'].includes(parsed.grade)

      const result = await pool.query(`
        INSERT INTO products (
          sku, brand, device_type, model, carrier, storage, color,
          grade, grade_description, condition_label,
          site_price, wholesale_price, cost,
          quantity, available_quantity, reserved_quantity,
          warehouse_name, image_url, is_active, is_sellable,
          sold_30, sold_90, sold_365,
          last_synced_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10,
          $11, $12, $13,
          $14, $15, $16,
          $17, $18, $19, $20,
          $21, $22, $23,
          NOW(), NOW()
        )
        ON CONFLICT (sku) DO UPDATE SET
          brand = EXCLUDED.brand,
          device_type = EXCLUDED.device_type,
          model = EXCLUDED.model,
          carrier = EXCLUDED.carrier,
          storage = EXCLUDED.storage,
          color = EXCLUDED.color,
          grade = EXCLUDED.grade,
          grade_description = EXCLUDED.grade_description,
          condition_label = EXCLUDED.condition_label,
          site_price = EXCLUDED.site_price,
          wholesale_price = EXCLUDED.wholesale_price,
          cost = EXCLUDED.cost,
          quantity = EXCLUDED.quantity,
          available_quantity = EXCLUDED.available_quantity,
          reserved_quantity = EXCLUDED.reserved_quantity,
          warehouse_name = EXCLUDED.warehouse_name,
          image_url = EXCLUDED.image_url,
          is_active = true,
          is_sellable = EXCLUDED.is_sellable,
          sold_30 = EXCLUDED.sold_30,
          sold_90 = EXCLUDED.sold_90,
          sold_365 = EXCLUDED.sold_365,
          last_synced_at = NOW(),
          updated_at = NOW()
        RETURNING (xmax = 0) AS is_new
      `, [
        sku,
        parsed.brand,
        parsed.deviceType,
        item.ProductName || '',
        parsed.carrier,
        parsed.storage,
        parsed.color,
        parsed.grade,
        parsed.gradeDescription,
        item.ProductConditionName || '',
        item.StorePrice || 0,
        item.WholeSalePrice || 0,
        item.AverageCost || 0,
        item.PhysicalQty || 0,
        item.InventoryAvailableQty || 0,
        item.ReservedQty || 0,
        item.WarehouseName || '',
        item.ImageUrl || '',
        true,
        isSellable,
        item.QtySold30 || 0,
        item.QtySold90 || 0,
        item.QtySold365 || 0
      ])

      if (result.rows[0]?.is_new) added++
      else updated++
    }

    // Mark products as inactive if they weren't in this sync (qty went to 0)
    const syncedSkus = allItems.map(i => i.ID).filter(Boolean)
    let deactivated = 0

    if (syncedSkus.length > 0) {
      const deactivateResult = await pool.query(`
        UPDATE products
        SET is_active = false, quantity = 0, available_quantity = 0, updated_at = NOW()
        WHERE is_active = true
          AND last_synced_at < NOW() - INTERVAL '2 hours'
          AND sku != ALL($1::text[])
      `, [syncedSkus])
      deactivated = deactivateResult.rowCount || 0
    }

    const duration = Date.now() - startTime

    // Update sync log
    await pool.query(`
      UPDATE sync_log
      SET status = 'success',
          products_synced = $1,
          products_added = $2,
          products_updated = $3,
          products_deactivated = $4,
          duration_ms = $5,
          completed_at = NOW()
      WHERE id = $6
    `, [allItems.length, added, updated, deactivated, duration, logId])

    res.status(200).json({
      success: true,
      synced: allItems.length,
      added,
      updated,
      deactivated,
      pages: page,
      duration: `${duration}ms`
    })

  } catch (err) {
    const duration = Date.now() - startTime

    if (logId) {
      await pool.query(`
        UPDATE sync_log
        SET status = 'error', errors = $1, duration_ms = $2, completed_at = NOW()
        WHERE id = $3
      `, [String(err), duration, logId]).catch(() => {})
    }

    res.status(500).json({ error: String(err), duration: `${duration}ms` })
  } finally {
    await pool.end()
  }
}
