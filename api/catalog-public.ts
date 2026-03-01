import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

// Grade multipliers for pricing: Site Price = Cost × Multiplier
const GRADE_MULTIPLIERS: Record<string, number> = {
  'CAP1': 1.50,
  'CAP': 1.45,
  'NE': 1.50,
  'CA+': 1.40,
  'CA': 1.35,
  'CAB': 1.25,
  'SD': 1.20,
  'SD-': 1.15,
  'SDB': 1.10,
}

// Unsellable grades — never show on public catalog
const UNSELLABLE_GRADES = ['XF', 'XC', 'INTAKE', 'XIMEI']

// Normalize shadow SKU grades: CAS1 → CA, SDS1 → SD, CA+S1 → CA+, etc.
function normalizeGrade(grade: string): string {
  return grade.replace(/S\d+$/, '')
}

// Parent product name mapping from SKU model codes
const MODEL_MAP: Record<string, { name: string; category: string }> = {
  // Apple iPhones
  'AP-IP16PM': { name: 'iPhone 16 Pro Max', category: 'Phones' },
  'AP-IP16P': { name: 'iPhone 16 Pro', category: 'Phones' },
  'AP-IP16': { name: 'iPhone 16', category: 'Phones' },
  'AP-IP16E': { name: 'iPhone 16e', category: 'Phones' },
  'AP-IP15PM': { name: 'iPhone 15 Pro Max', category: 'Phones' },
  'AP-IP15P': { name: 'iPhone 15 Pro', category: 'Phones' },
  'AP-IP15PL': { name: 'iPhone 15 Plus', category: 'Phones' },
  'AP-IP15': { name: 'iPhone 15', category: 'Phones' },
  'AP-IP14PM': { name: 'iPhone 14 Pro Max', category: 'Phones' },
  'AP-IP14P': { name: 'iPhone 14 Pro', category: 'Phones' },
  'AP-IP14PL': { name: 'iPhone 14 Plus', category: 'Phones' },
  'AP-IP14': { name: 'iPhone 14', category: 'Phones' },
  'AP-IP13PM': { name: 'iPhone 13 Pro Max', category: 'Phones' },
  'AP-IP13P': { name: 'iPhone 13 Pro', category: 'Phones' },
  'AP-IP13': { name: 'iPhone 13', category: 'Phones' },
  'AP-IP13M': { name: 'iPhone 13 Mini', category: 'Phones' },
  'AP-IP12PM': { name: 'iPhone 12 Pro Max', category: 'Phones' },
  'AP-IP12P': { name: 'iPhone 12 Pro', category: 'Phones' },
  'AP-IP12': { name: 'iPhone 12', category: 'Phones' },
  'AP-IP12M': { name: 'iPhone 12 Mini', category: 'Phones' },
  'AP-IP11PM': { name: 'iPhone 11 Pro Max', category: 'Phones' },
  'AP-IP11P': { name: 'iPhone 11 Pro', category: 'Phones' },
  'AP-IP11': { name: 'iPhone 11', category: 'Phones' },
  'AP-IPXSM': { name: 'iPhone XS Max', category: 'Phones' },
  'AP-IPXS': { name: 'iPhone XS', category: 'Phones' },
  'AP-IPXR': { name: 'iPhone XR', category: 'Phones' },
  'AP-IPX': { name: 'iPhone X', category: 'Phones' },
  'AP-IPSE3': { name: 'iPhone SE 3rd Gen', category: 'Phones' },
  'AP-IPSE2': { name: 'iPhone SE 2nd Gen', category: 'Phones' },
  'AP-IP8P': { name: 'iPhone 8 Plus', category: 'Phones' },
  'AP-IP8': { name: 'iPhone 8', category: 'Phones' },
  'AP-IP7P': { name: 'iPhone 7 Plus', category: 'Phones' },
  'AP-IP7': { name: 'iPhone 7', category: 'Phones' },
  'AP-IP6SP': { name: 'iPhone 6S Plus', category: 'Phones' },
  'AP-IP6S': { name: 'iPhone 6S', category: 'Phones' },
  // Apple iPads
  'AP-IPDP13M4': { name: 'iPad Pro 13" M4', category: 'Tablets' },
  'AP-IPDP11M4': { name: 'iPad Pro 11" M4', category: 'Tablets' },
  'AP-IPDP12.9': { name: 'iPad Pro 12.9"', category: 'Tablets' },
  'AP-IPDP11': { name: 'iPad Pro 11"', category: 'Tablets' },
  'AP-IPDA6': { name: 'iPad Air M2', category: 'Tablets' },
  'AP-IPDA5': { name: 'iPad Air 5th Gen', category: 'Tablets' },
  'AP-IPDA4': { name: 'iPad Air 4th Gen', category: 'Tablets' },
  'AP-IPDA3': { name: 'iPad Air 3rd Gen', category: 'Tablets' },
  'AP-IPDA': { name: 'iPad Air', category: 'Tablets' },
  'AP-IPD10.9': { name: 'iPad 10th Gen', category: 'Tablets' },
  'AP-IPD10.2': { name: 'iPad 9th Gen', category: 'Tablets' },
  'AP-IPD': { name: 'iPad', category: 'Tablets' },
  'AP-IPDM6': { name: 'iPad Mini 6', category: 'Tablets' },
  'AP-IPDM5': { name: 'iPad Mini 5', category: 'Tablets' },
  'AP-IPDM4': { name: 'iPad Mini 4', category: 'Tablets' },
  'AP-IPDM': { name: 'iPad Mini', category: 'Tablets' },
  'AP-IPAIR': { name: 'iPad Air', category: 'Tablets' },
  // Apple MacBooks
  'AP-MBA15M3': { name: 'MacBook Air 15" M3', category: 'Laptops' },
  'AP-MBA13M3': { name: 'MacBook Air 13" M3', category: 'Laptops' },
  'AP-MBA13M2': { name: 'MacBook Air 13" M2', category: 'Laptops' },
  'AP-MBA13M1': { name: 'MacBook Air 13" M1', category: 'Laptops' },
  'AP-MBP16M3P': { name: 'MacBook Pro 16" M3 Pro', category: 'Laptops' },
  'AP-MBP14M3': { name: 'MacBook Pro 14" M3', category: 'Laptops' },
  'AP-MBP14M3P': { name: 'MacBook Pro 14" M3 Pro', category: 'Laptops' },
  'AP-MBP13M2': { name: 'MacBook Pro 13" M2', category: 'Laptops' },
  'AP-MACM2': { name: 'Mac Mini M2', category: 'Laptops' },
  // Apple Watches
  'AP-AW9': { name: 'Apple Watch Series 9', category: 'Wearables' },
  'AP-AW8': { name: 'Apple Watch Series 8', category: 'Wearables' },
  'AP-AW7': { name: 'Apple Watch Series 7', category: 'Wearables' },
  'AP-AWU2': { name: 'Apple Watch Ultra 2', category: 'Wearables' },
  'AP-ULT2': { name: 'Apple Watch Ultra 2', category: 'Wearables' },
  'AP-S3': { name: 'Apple Watch Series 3', category: 'Wearables' },
  'AP-S5': { name: 'Apple Watch Series 5', category: 'Wearables' },
  // Samsung Phones
  'SA-GS25U': { name: 'Galaxy S25 Ultra', category: 'Phones' },
  'SA-GS25P': { name: 'Galaxy S25+', category: 'Phones' },
  'SA-GS25': { name: 'Galaxy S25', category: 'Phones' },
  'SA-GS24U': { name: 'Galaxy S24 Ultra', category: 'Phones' },
  'SA-GS24P': { name: 'Galaxy S24+', category: 'Phones' },
  'SA-GS24': { name: 'Galaxy S24', category: 'Phones' },
  'SA-GS24FE': { name: 'Galaxy S24 FE', category: 'Phones' },
  'SA-GS23U': { name: 'Galaxy S23 Ultra', category: 'Phones' },
  'SA-GS23P': { name: 'Galaxy S23+', category: 'Phones' },
  'SA-GS23': { name: 'Galaxy S23', category: 'Phones' },
  'SA-GS23FE': { name: 'Galaxy S23 FE', category: 'Phones' },
  'SA-GS22U': { name: 'Galaxy S22 Ultra', category: 'Phones' },
  'SA-GS22P': { name: 'Galaxy S22+', category: 'Phones' },
  'SA-GS22': { name: 'Galaxy S22', category: 'Phones' },
  'SA-GS21U': { name: 'Galaxy S21 Ultra', category: 'Phones' },
  'SA-GS21P': { name: 'Galaxy S21+', category: 'Phones' },
  'SA-GS21': { name: 'Galaxy S21', category: 'Phones' },
  'SA-GS21FE': { name: 'Galaxy S21 FE', category: 'Phones' },
  'SA-GS20U': { name: 'Galaxy S20 Ultra', category: 'Phones' },
  'SA-GS20P': { name: 'Galaxy S20+', category: 'Phones' },
  'SA-GS20': { name: 'Galaxy S20', category: 'Phones' },
  'SA-GS20FE': { name: 'Galaxy S20 FE', category: 'Phones' },
  'SA-GS10P': { name: 'Galaxy S10+', category: 'Phones' },
  'SA-GS10': { name: 'Galaxy S10', category: 'Phones' },
  'SA-GS10E': { name: 'Galaxy S10e', category: 'Phones' },
  'SA-GA16': { name: 'Galaxy A16', category: 'Phones' },
  'SA-GA15': { name: 'Galaxy A15', category: 'Phones' },
  'SA-GA14': { name: 'Galaxy A14', category: 'Phones' },
  'SA-GA13': { name: 'Galaxy A13', category: 'Phones' },
  'SA-GA12': { name: 'Galaxy A12', category: 'Phones' },
  'SA-GA52': { name: 'Galaxy A52', category: 'Phones' },
  'SA-GA53': { name: 'Galaxy A53', category: 'Phones' },
  'SA-GA54': { name: 'Galaxy A54', category: 'Phones' },
  'SA-GA71': { name: 'Galaxy A71', category: 'Phones' },
  'SA-GZF6': { name: 'Galaxy Z Fold 6', category: 'Phones' },
  'SA-GZF5': { name: 'Galaxy Z Fold 5', category: 'Phones' },
  'SA-GZF4': { name: 'Galaxy Z Fold 4', category: 'Phones' },
  'SA-GZF3': { name: 'Galaxy Z Fold 3', category: 'Phones' },
  'SA-GZFL6': { name: 'Galaxy Z Flip 6', category: 'Phones' },
  'SA-GZFL5': { name: 'Galaxy Z Flip 5', category: 'Phones' },
  'SA-GZFL4': { name: 'Galaxy Z Flip 4', category: 'Phones' },
  'SA-NOT20': { name: 'Galaxy Note 20', category: 'Phones' },
  'SA-NOT10': { name: 'Galaxy Note 10', category: 'Phones' },
  'SA-NOT8': { name: 'Galaxy Note 8', category: 'Phones' },
  'SA-GXC6P': { name: 'Galaxy XCover 6 Pro', category: 'Phones' },
  // Samsung Tablets
  'SA-GTS9FE': { name: 'Galaxy Tab S9 FE', category: 'Tablets' },
  'SA-GTS8': { name: 'Galaxy Tab S8', category: 'Tablets' },
  'SA-GTS7FE': { name: 'Galaxy Tab S7 FE', category: 'Tablets' },
  'SA-GTS6L': { name: 'Galaxy Tab S6 Lite', category: 'Tablets' },
  'SA-GTS5E': { name: 'Galaxy Tab S5e', category: 'Tablets' },
  'SA-GTA10.5': { name: 'Galaxy Tab A 10.5"', category: 'Tablets' },
  'SA-GTA10': { name: 'Galaxy Tab A 10.1"', category: 'Tablets' },
  'SA-GTA7': { name: 'Galaxy Tab A7', category: 'Tablets' },
  'SA-GTA7L': { name: 'Galaxy Tab A7 Lite', category: 'Tablets' },
  'SA-GTA3': { name: 'Galaxy Tab A3', category: 'Tablets' },
  'SA-GTE8': { name: 'Galaxy Tab E 8"', category: 'Tablets' },
  // Samsung Wearables
  'SA-GW4': { name: 'Galaxy Watch 4', category: 'Wearables' },
  // Google
  'GO-PX10': { name: 'Pixel 10', category: 'Phones' },
  'GO-PX9P': { name: 'Pixel 9 Pro', category: 'Phones' },
  'GO-PX9': { name: 'Pixel 9', category: 'Phones' },
  'GO-PX8P': { name: 'Pixel 8 Pro', category: 'Phones' },
  'GO-PX8A': { name: 'Pixel 8A', category: 'Phones' },
  'GO-PX8': { name: 'Pixel 8', category: 'Phones' },
  'GO-PX7P': { name: 'Pixel 7 Pro', category: 'Phones' },
  'GO-PX7A': { name: 'Pixel 7A', category: 'Phones' },
  'GO-PX7': { name: 'Pixel 7', category: 'Phones' },
  'GO-PX6A': { name: 'Pixel 6A', category: 'Phones' },
  'GO-PXFO': { name: 'Pixel Fold', category: 'Phones' },
  'GO-PBK': { name: 'Pixelbook', category: 'Laptops' },
  'GO-PSL12.3': { name: 'Pixel Slate 12.3"', category: 'Tablets' },
  // Motorola
  'MO-ONEACE': { name: 'Moto One Ace', category: 'Phones' },
  'MO-G5G': { name: 'Moto G 5G', category: 'Phones' },
  'MO-GPWR': { name: 'Moto G Power', category: 'Phones' },
  'MO-GSTY': { name: 'Moto G Stylus', category: 'Phones' },
  'MO-EDGE': { name: 'Moto Edge', category: 'Phones' },
  'RA-RAZ2': { name: 'Motorola Razr', category: 'Phones' },
  // LG
  'LG-V30': { name: 'LG V30', category: 'Phones' },
  'LG-V60': { name: 'LG V60', category: 'Phones' },
  'LG-VELV': { name: 'LG Velvet', category: 'Phones' },
  // Others
  'TC-GOF3': { name: 'TCL 30', category: 'Phones' },
  'KY-DUF2': { name: 'Kyocera DuraForce 2', category: 'Phones' },
  'KY-DUXE': { name: 'Kyocera DuraXE', category: 'Phones' },
  'NK-3.1': { name: 'Nokia 3.1', category: 'Phones' },
  'OP-NORD': { name: 'OnePlus Nord', category: 'Phones' },
  'ZT-BLV2': { name: 'ZTE Blade V2', category: 'Phones' },
  'KAZ-ETA': { name: 'Kazuna eTalk', category: 'Phones' },
  'AL-GFV': { name: 'Alcatel Go Flip V', category: 'Phones' },
  'AL-INS': { name: 'Alcatel Insight', category: 'Phones' },
  'AL-SF': { name: 'Alcatel SmartFlip', category: 'Phones' },
  'RE-ORJ': { name: 'Reliance Orbic Journey', category: 'Phones' },
}

// Extract brand from model code prefix
function getBrand(modelCode: string): string {
  const prefix = modelCode.split('-')[0]
  const map: Record<string, string> = {
    'AP': 'Apple', 'SA': 'Samsung', 'GO': 'Google',
    'MO': 'Motorola', 'LG': 'LG', 'TC': 'TCL',
    'KY': 'Kyocera', 'NK': 'Nokia', 'OP': 'OnePlus',
    'ZT': 'ZTE', 'KAZ': 'Kazuna', 'AL': 'Alcatel',
    'RE': 'Reliance', 'RA': 'Motorola',
  }
  return map[prefix] || prefix
}

// Extract model code from full SKU
function getModelCode(sku: string): string {
  // SKU format: PREFIX:MFR-MODEL-...-GRADE
  // We need MFR-MODEL part
  const afterColon = sku.includes(':') ? sku.split(':')[1] : sku
  const parts = afterColon.split('-')
  if (parts.length < 2) return afterColon

  // Try progressively longer model codes until we find a match
  // e.g. AP-IP15PM, AP-IPDP13M4, SA-GS24FE
  for (let i = parts.length - 1; i >= 2; i--) {
    const candidate = parts.slice(0, i).join('-')
    if (MODEL_MAP[candidate]) return candidate
  }
  // Default: first two parts
  return parts.slice(0, 2).join('-')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    const {
      category,
      brand,
      grade,
      storage,
      carrier,
      search,
      sort = 'name',
      page = '1',
      size = '24'
    } = req.query as Record<string, string>

    // Get all active, sellable products with stock
    const result = await pool.query(`
      SELECT sku, model, brand, device_type, grade, grade_description,
             carrier, storage, color, cost, quantity, available_quantity,
             site_price, wholesale_price, image_url, warehouse_name,
             sold_30, sold_90
      FROM products
      WHERE is_active = true
        AND quantity > 0
        AND grade NOT IN ('XF', 'XC', 'INTAKE', 'XIMEI')
    `)

    // Group by parent product
    const families: Record<string, {
      modelCode: string
      name: string
      brand: string
      category: string
      skus: any[]
      totalStock: number
      grades: Set<string>
      storages: Set<string>
      carriers: Set<string>
      colors: Set<string>
      lowestPrice: number
      highestPrice: number
      image: string
    }> = {}

    // Carrier code normalization
    const CARRIER_MAP: Record<string, string> = {
      'UN': 'Unlocked', 'TM': 'T-Mobile', 'AT': 'AT&T',
      'VZ': 'Verizon', 'SP': 'Sprint', 'US': 'US Cellular',
      'ST': 'Spectrum', 'FX': 'Xfinity', 'BO': 'Boost Mobile',
      'CR': 'Cricket', 'Unlocked': 'Unlocked', 'T-Mobile': 'T-Mobile',
      'AT&T': 'AT&T', 'Verizon': 'Verizon', 'Sprint': 'Sprint',
      'US Cellular': 'US Cellular', 'Spectrum': 'Spectrum',
      'Xfinity': 'Xfinity', 'Boost Mobile': 'Boost Mobile',
      'Cricket': 'Cricket',
    }

    // Color code normalization
    const COLOR_MAP: Record<string, string> = {
      'BLA': 'Black', 'BLU': 'Blue', 'GRA': 'Gray', 'PUR': 'Purple',
      'PIN': 'Pink', 'WHI': 'White', 'GRE': 'Green', 'SIL': 'Silver',
      'GLD': 'Gold', 'RED': 'Red', 'YEL': 'Yellow', 'ORG': 'Orange',
      'TIT': 'Titanium', 'MID': 'Midnight', 'STL': 'Starlight',
      'SPG': 'Space Gray', 'SBL': 'Space Black', 'NAT': 'Natural',
      'DES': 'Desert', 'CRM': 'Cream', 'LAV': 'Lavender',
      'PHN': 'Phantom', 'GRP': 'Graphite', 'COR': 'Coral',
    }

    for (const row of result.rows) {
      const modelCode = getModelCode(row.sku)
      const mapping = MODEL_MAP[modelCode]
      if (!mapping) continue // Only show products we've mapped with clean names

      const productBrand = getBrand(modelCode)

      const rawGrade = row.grade || ''
      const grade = normalizeGrade(rawGrade)
      
      // Skip unsellable even after normalization
      if (UNSELLABLE_GRADES.includes(grade)) continue
      
      const multiplier = GRADE_MULTIPLIERS[grade] || 1.30
      const price = Math.round((row.cost || 0) * multiplier * 100) / 100

      if (!families[modelCode]) {
        families[modelCode] = {
          modelCode,
          name: mapping.name,
          brand: productBrand,
          category: mapping.category,
          skus: [],
          totalStock: 0,
          grades: new Set(),
          storages: new Set(),
          carriers: new Set(),
          colors: new Set(),
          lowestPrice: Infinity,
          highestPrice: 0,
          image: row.image_url || '',
        }
      }

      const family = families[modelCode]
      const normalizedCarrier = CARRIER_MAP[row.carrier] || row.carrier || ''
      const normalizedColor = COLOR_MAP[row.color] || row.color || ''

      family.skus.push({
        sku: row.sku,
        grade,
        gradeDescription: GRADE_MULTIPLIERS[grade] ? '' : row.grade_description,
        storage: row.storage,
        carrier: normalizedCarrier,
        color: normalizedColor,
        quantity: row.quantity,
        available: row.available_quantity,
        price,
        cost: row.cost,
      })
      family.totalStock += row.quantity || 0
      if (grade) family.grades.add(grade)
      if (row.storage) family.storages.add(row.storage)
      if (normalizedCarrier) family.carriers.add(normalizedCarrier)
      if (normalizedColor) family.colors.add(normalizedColor)
      if (price > 0 && price < family.lowestPrice) family.lowestPrice = price
      if (price > family.highestPrice) family.highestPrice = price
      if (!family.image && row.image_url) family.image = row.image_url
    }

    // Convert to array and apply filters
    let products = Object.values(families).map(f => ({
      modelCode: f.modelCode,
      name: f.name,
      brand: f.brand,
      category: f.category,
      totalStock: f.totalStock,
      skuCount: f.skus.length,
      grades: Array.from(f.grades).sort(),
      storages: Array.from(f.storages).sort(),
      carriers: Array.from(f.carriers).sort(),
      colors: Array.from(f.colors).sort(),
      priceFrom: f.lowestPrice === Infinity ? 0 : f.lowestPrice,
      priceTo: f.highestPrice,
      image: f.image,
      skus: f.skus,
    }))

    // Apply filters
    if (category) {
      products = products.filter(p => p.category === category)
    }
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
        p.skus.some(s => s.sku.toLowerCase().includes(q))
      )
    }

    // Sort
    if (sort === 'stock') {
      products.sort((a, b) => b.totalStock - a.totalStock)
    } else if (sort === 'price-asc') {
      products.sort((a, b) => a.priceFrom - b.priceFrom)
    } else if (sort === 'price-desc') {
      products.sort((a, b) => b.priceTo - a.priceTo)
    } else {
      // Default: alphabetical by name
      products.sort((a, b) => a.name.localeCompare(b.name))
    }

    // Build filter options (from ALL active products, not just filtered)
    const allProducts = Object.values(families)
    const filterOptions = {
      categories: [...new Set(allProducts.map(p => p.category))].sort(),
      brands: [...new Set(allProducts.map(p => p.brand))].sort(),
      grades: [...new Set(allProducts.flatMap(p => Array.from(p.grades)))].sort(),
      storages: [...new Set(allProducts.flatMap(p => Array.from(p.storages)))].sort(),
      carriers: [...new Set(allProducts.flatMap(p => Array.from(p.carriers)))].sort(),
    }

    // Paginate
    const pageNum = parseInt(page) || 1
    const pageSize = Math.min(parseInt(size) || 24, 100)
    const total = products.length
    const paginated = products.slice((pageNum - 1) * pageSize, pageNum * pageSize)

    // Strip cost AND prices from public response - prices only visible to logged-in buyers
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
      skus: p.skus.map(s => ({
        sku: s.sku,
        grade: s.grade,
        gradeDescription: s.gradeDescription,
        storage: s.storage,
        carrier: s.carrier,
        color: s.color,
        quantity: s.quantity,
        available: s.available,
      }))
    }))

    res.status(200).json({
      products: sanitized,
      total,
      page: pageNum,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      filterOptions,
      gradeLabels: {
        'CAP1': 'Premium 100%',
        'CAP': 'Premium',
        'NE': 'New',
        'CA+': 'Excellent',
        'CA': 'Good',
        'CAB': 'Good (Batt<80%)',
        'SD': 'B-Grade',
        'SD-': 'C-Grade',
        'SDB': 'B/C (Batt<80%)',
      }
    })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
