import type { VercelRequest, VercelResponse } from '@vercel/node'

const SC_BASE = 'https://bi.api.sellercloud.com/rest'

let cachedToken: string | null = null
let tokenExpiry: number = 0

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry - 5 * 60 * 1000) {
    return cachedToken
  }
  const username = process.env.SC_USERNAME
  const password = process.env.SC_PASSWORD
  if (!username || !password) {
    throw new Error('SC_USERNAME and SC_PASSWORD env vars required')
  }
  const res = await fetch(`${SC_BASE}/api/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Username: username, Password: password })
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`SC auth failed (${res.status}): ${text}`)
  }
  const data = await res.json()
  cachedToken = data.access_token
  tokenExpiry = Date.now() + 55 * 60 * 1000
  return cachedToken!
}

function scHeaders(token: string) {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { page = '1', size = '50', keyword, inStockOnly = 'false' } = req.query as Record<string, string>
    const token = await getToken()
    const url = new URL(`${SC_BASE}/api/inventory`)
    url.searchParams.set('pageSize', String(Math.min(parseInt(size), 50)))
    url.searchParams.set('pageNumber', page)
    if (keyword) url.searchParams.set('Keyword', keyword)
    if (inStockOnly === 'true') url.searchParams.set('physicalQtyFrom', '1')
    const r = await fetch(url.toString(), { headers: scHeaders(token) })
    if (!r.ok) { const t = await r.text(); throw new Error(`SC inventory failed (${r.status}): ${t}`) }
    const data = await r.json()
    const items = (data.Items || []).map((item: any) => ({
      sku: item.ID, name: item.ProductName, image: item.ImageUrl, brand: item.BrandName, condition: item.ProductConditionName, active: item.ActiveStatus, sellable: item.IsSellAble, physicalQty: item.PhysicalQty || 0, reservedQty: item.ReservedQty || 0, availableQty: item.InventoryAvailableQty || 0, aggregateQty: item.AggregateQty || 0, nonSellableQty: item.AggregateNonSellableQty || 0, onOrder: item.OnOrder || 0, warehouseQty: item.WarehousePhysicalQty || 0, warehouseName: item.WarehouseName || '', avgCost: item.AverageCost || 0, lastCost: item.LastCost || 0, storePrice: item.StorePrice || 0, wholesalePrice: item.WholeSalePrice || 0, sold15: item.QtySold15 || 0, sold30: item.QtySold30 || 0, sold90: item.QtySold90 || 0, sold365: item.QtySold365 || 0, lastModified: item.LastModifiedDate, lastAggregate: item.LastAggregateDate
    }))
    res.status(200).json({ items, total: data.TotalResults || 0, page: parseInt(page), pageSize: parseInt(size) })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
