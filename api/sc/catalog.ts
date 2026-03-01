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

function parseSKU(sku: string) {
  if (!sku) return null
  try {
    const colonIdx = sku.indexOf(':')
    const prefix = colonIdx > -1 ? sku.slice(0, colonIdx) : ''
    const rest = colonIdx > -1 ? sku.slice(colonIdx + 1) : sku
    const parts = rest.split('-')
    if (parts.length < 3) return null
    const isIntake = parts[parts.length - 1] === 'INTAKE'
    const grade = isIntake ? parts[parts.length - 2] : parts[parts.length - 1]
    const deviceTypes: Record<string, string> = { 'PA': 'Phone', 'TA': 'Tablet', 'PKA': 'Kitted Phone', 'LA': 'Laptop', 'WA': 'Watch' }
    const mfrs: Record<string, string> = { 'APPL': 'Apple', 'SAMS': 'Samsung', 'GOOG': 'Google', 'MOTO': 'Motorola', 'LG': 'LG' }
    const grades: Record<string, string> = { 'CA': 'Good', 'CA+': 'Excellent', 'CAB': 'Good (Batt <80%)', 'CAP': 'Premium', 'CAP1': 'Premium (100% Batt)', 'SD': 'B-Grade', 'SD-': 'C-Grade', 'SDB': 'B/C (Batt <80%)', 'XF': 'Failed Functional', 'XC': 'Failed Cosmetic' }
    const isSellable = grade !== 'XF' && grade !== 'XC' && !isIntake
    return { prefix, deviceType: deviceTypes[prefix] || prefix, manufacturer: mfrs[parts[0]] || parts[0], product: parts[1] || '', model: parts[2] || '', carrier: parts.length > 4 ? parts[4] : '', storage: parts.length > 5 ? parts[5] : '', color: parts.length > 6 ? parts[6] : '', grade, gradeDescription: grades[grade] || grade, isIntake, isSellable }
  } catch { return null }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { page = '1', size = '50', keyword, active = 'true' } = req.query as Record<string, string>
    const token = await getToken()
    const url = new URL(`${SC_BASE}/api/catalog`)
    url.searchParams.set('pageSize', String(Math.min(parseInt(size), 50)))
    url.searchParams.set('pageNumber', page)
    if (keyword) url.searchParams.set('Keyword', keyword)
    if (active === 'true') url.searchParams.set('activeStatus', '1')
    const r = await fetch(url.toString(), { headers: scHeaders(token) })
    if (!r.ok) { const t = await r.text(); throw new Error(`SC catalog failed (${r.status}): ${t}`) }
    const data = await r.json()
    const items = (data.Items || []).map((item: any) => ({
      sku: item.ID, name: item.ProductName, image: item.ImageUrl, brand: item.BrandName, condition: item.ProductConditionName, active: item.ActiveStatus, sellable: item.IsSellAble, physicalQty: item.PhysicalQty || 0, aggregateQty: item.AggregateQty || 0, availableQty: item.InventoryAvailableQty || 0, storePrice: item.StorePrice || 0, wholesalePrice: item.WholeSalePrice || 0, listPrice: item.ListPrice || 0, salePrice: item.SalePrice || 0, avgCost: item.AverageCost || 0, sold30: item.QtySold30 || 0, sold90: item.QtySold90 || 0, parsed: parseSKU(item.ID), backMarketEnabled: item.BackmarketEnabled || false, walmartEnabled: item.WalmartAPIEnabled || false, ebayEnabled: item.eBayEnabled || false, amazonEnabled: item.AmazonEnabled || false
    }))
    res.status(200).json({ items, total: data.TotalResults || 0, page: parseInt(page), pageSize: parseInt(size) })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}
