import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getToken, scHeaders, SC_BASE } from './auth'

interface InventoryParams {
  pageSize?: number
  pageNumber?: number
  keyword?: string
  warehouse?: string[]
  physicalQtyFrom?: number
}

export async function fetchInventory(params: InventoryParams = {}) {
  const token = await getToken()
  const {
    pageSize = 50,
    pageNumber = 1,
    keyword,
    warehouse,
    physicalQtyFrom
  } = params

  const url = new URL(`${SC_BASE}/api/inventory`)
  url.searchParams.set('pageSize', String(pageSize))
  url.searchParams.set('pageNumber', String(pageNumber))
  if (keyword) url.searchParams.set('Keyword', keyword)
  if (warehouse) warehouse.forEach(w => url.searchParams.append('warehouse', w))
  if (physicalQtyFrom !== undefined) url.searchParams.set('physicalQtyFrom', String(physicalQtyFrom))

  const res = await fetch(url.toString(), {
    headers: scHeaders(token)
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`SC inventory fetch failed (${res.status}): ${text}`)
  }

  return res.json()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const {
      page = '1',
      size = '50',
      keyword,
      inStockOnly = 'false'
    } = req.query as Record<string, string>

    const data = await fetchInventory({
      pageNumber: parseInt(page),
      pageSize: Math.min(parseInt(size), 50),
      keyword: keyword || undefined,
      physicalQtyFrom: inStockOnly === 'true' ? 1 : undefined
    })

    const items = (data.Items || []).map((item: any) => ({
      sku: item.ID,
      name: item.ProductName,
      image: item.ImageUrl,
      brand: item.BrandName,
      condition: item.ProductConditionName,
      active: item.ActiveStatus,
      sellable: item.IsSellAble,
      // Inventory
      physicalQty: item.PhysicalQty || 0,
      reservedQty: item.ReservedQty || 0,
      availableQty: item.InventoryAvailableQty || 0,
      aggregateQty: item.AggregateQty || 0,
      nonSellableQty: item.AggregateNonSellableQty || 0,
      onOrder: item.OnOrder || 0,
      warehouseQty: item.WarehousePhysicalQty || 0,
      warehouseName: item.WarehouseName || '',
      // Pricing
      avgCost: item.AverageCost || 0,
      lastCost: item.LastCost || 0,
      storePrice: item.StorePrice || 0,
      wholesalePrice: item.WholeSalePrice || 0,
      // Velocity
      sold15: item.QtySold15 || 0,
      sold30: item.QtySold30 || 0,
      sold90: item.QtySold90 || 0,
      sold365: item.QtySold365 || 0,
      // Dates
      lastModified: item.LastModifiedDate,
      lastAggregate: item.LastAggregateDate
    }))

    res.status(200).json({
      items,
      total: data.TotalResults || 0,
      page: parseInt(page),
      pageSize: parseInt(size)
    })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}