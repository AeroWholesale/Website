import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * Phase 1A: Create config tables and seed from hardcoded maps.
 * Run once: GET /api/db/migrate-catalog-config
 * 
 * Creates:
 *   product_families - maps model codes to clean names, brands, categories
 *   grade_config     - grade multipliers, labels, sort order
 *   carrier_map      - carrier code → display name
 *   color_map        - color code → display name
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // ── product_families ──────────────────────────────────────────────
    await pool.query(`
      CREATE TABLE IF NOT EXISTS product_families (
        id SERIAL PRIMARY KEY,
        model_code TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        brand TEXT NOT NULL,
        category TEXT NOT NULL DEFAULT 'Phones',
        image_url TEXT,
        visible BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    // ── grade_config ──────────────────────────────────────────────────
    await pool.query(`
      CREATE TABLE IF NOT EXISTS grade_config (
        id SERIAL PRIMARY KEY,
        grade_code TEXT UNIQUE NOT NULL,
        label TEXT NOT NULL,
        multiplier NUMERIC(4,2) NOT NULL DEFAULT 1.30,
        sort_order INTEGER DEFAULT 0,
        visible BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    // ── carrier_map ───────────────────────────────────────────────────
    await pool.query(`
      CREATE TABLE IF NOT EXISTS carrier_map (
        id SERIAL PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        display_name TEXT NOT NULL
      )
    `)

    // ── color_map ─────────────────────────────────────────────────────
    await pool.query(`
      CREATE TABLE IF NOT EXISTS color_map (
        id SERIAL PRIMARY KEY,
        code TEXT UNIQUE NOT NULL,
        display_name TEXT NOT NULL
      )
    `)

    // ══════════════════════════════════════════════════════════════════
    // SEED DATA — migrated from hardcoded maps in catalog-public.ts
    // ══════════════════════════════════════════════════════════════════

    // ── Seed product_families ─────────────────────────────────────────
    const families: [string, string, string, string][] = [
      // Apple iPhones
      ['AP-IP16PM', 'iPhone 16 Pro Max', 'Apple', 'Phones'],
      ['AP-IP16P', 'iPhone 16 Pro', 'Apple', 'Phones'],
      ['AP-IP16', 'iPhone 16', 'Apple', 'Phones'],
      ['AP-IP16E', 'iPhone 16e', 'Apple', 'Phones'],
      ['AP-IP15PM', 'iPhone 15 Pro Max', 'Apple', 'Phones'],
      ['AP-IP15P', 'iPhone 15 Pro', 'Apple', 'Phones'],
      ['AP-IP15PL', 'iPhone 15 Plus', 'Apple', 'Phones'],
      ['AP-IP15', 'iPhone 15', 'Apple', 'Phones'],
      ['AP-IP14PM', 'iPhone 14 Pro Max', 'Apple', 'Phones'],
      ['AP-IP14P', 'iPhone 14 Pro', 'Apple', 'Phones'],
      ['AP-IP14PL', 'iPhone 14 Plus', 'Apple', 'Phones'],
      ['AP-IP14', 'iPhone 14', 'Apple', 'Phones'],
      ['AP-IP13PM', 'iPhone 13 Pro Max', 'Apple', 'Phones'],
      ['AP-IP13P', 'iPhone 13 Pro', 'Apple', 'Phones'],
      ['AP-IP13', 'iPhone 13', 'Apple', 'Phones'],
      ['AP-IP13M', 'iPhone 13 Mini', 'Apple', 'Phones'],
      ['AP-IP12PM', 'iPhone 12 Pro Max', 'Apple', 'Phones'],
      ['AP-IP12P', 'iPhone 12 Pro', 'Apple', 'Phones'],
      ['AP-IP12', 'iPhone 12', 'Apple', 'Phones'],
      ['AP-IP12M', 'iPhone 12 Mini', 'Apple', 'Phones'],
      ['AP-IP11PM', 'iPhone 11 Pro Max', 'Apple', 'Phones'],
      ['AP-IP11P', 'iPhone 11 Pro', 'Apple', 'Phones'],
      ['AP-IP11', 'iPhone 11', 'Apple', 'Phones'],
      ['AP-IPXSM', 'iPhone XS Max', 'Apple', 'Phones'],
      ['AP-IPXS', 'iPhone XS', 'Apple', 'Phones'],
      ['AP-IPXR', 'iPhone XR', 'Apple', 'Phones'],
      ['AP-IPX', 'iPhone X', 'Apple', 'Phones'],
      ['AP-IPSE3', 'iPhone SE (3rd Gen)', 'Apple', 'Phones'],
      ['AP-IPSE2', 'iPhone SE (2nd Gen)', 'Apple', 'Phones'],
      ['AP-IP8', 'iPhone 8', 'Apple', 'Phones'],
      ['AP-IP8P', 'iPhone 8 Plus', 'Apple', 'Phones'],
      ['AP-IP7', 'iPhone 7', 'Apple', 'Phones'],
      ['AP-IP7P', 'iPhone 7 Plus', 'Apple', 'Phones'],
      ['AP-IP6S', 'iPhone 6S', 'Apple', 'Phones'],
      ['AP-IP6SP', 'iPhone 6S Plus', 'Apple', 'Phones'],
      // Apple iPads
      ['AP-IPDP13M4', 'iPad Pro 13" M4', 'Apple', 'Tablets'],
      ['AP-IPDP11M4', 'iPad Pro 11" M4', 'Apple', 'Tablets'],
      ['AP-IPDP12.9M2', 'iPad Pro 12.9" M2', 'Apple', 'Tablets'],
      ['AP-IPDP11M2', 'iPad Pro 11" M2', 'Apple', 'Tablets'],
      ['AP-IPDP12.9', 'iPad Pro 12.9"', 'Apple', 'Tablets'],
      ['AP-IPDP11', 'iPad Pro 11"', 'Apple', 'Tablets'],
      ['AP-IPDA13M2', 'iPad Air 13" M2', 'Apple', 'Tablets'],
      ['AP-IPDA11M2', 'iPad Air 11" M2', 'Apple', 'Tablets'],
      ['AP-IPDA10.9', 'iPad Air 10.9"', 'Apple', 'Tablets'],
      ['AP-IPD10.9', 'iPad 10.9" (10th Gen)', 'Apple', 'Tablets'],
      ['AP-IPD10.2', 'iPad 10.2" (9th Gen)', 'Apple', 'Tablets'],
      ['AP-IPDM8.3', 'iPad Mini 8.3"', 'Apple', 'Tablets'],
      ['AP-IPD9.7', 'iPad 9.7"', 'Apple', 'Tablets'],
      // Apple MacBooks
      ['AP-MBP16', 'MacBook Pro 16"', 'Apple', 'Laptops'],
      ['AP-MBP14', 'MacBook Pro 14"', 'Apple', 'Laptops'],
      ['AP-MBP13', 'MacBook Pro 13"', 'Apple', 'Laptops'],
      ['AP-MBA15', 'MacBook Air 15"', 'Apple', 'Laptops'],
      ['AP-MBA13', 'MacBook Air 13"', 'Apple', 'Laptops'],
      ['AP-MMINI', 'Mac Mini', 'Apple', 'Laptops'],
      // Apple Watch
      ['AP-ULT2', 'Apple Watch Ultra 2', 'Apple', 'Wearables'],
      ['AP-ULT', 'Apple Watch Ultra', 'Apple', 'Wearables'],
      ['AP-S9', 'Apple Watch Series 9', 'Apple', 'Wearables'],
      ['AP-S8', 'Apple Watch Series 8', 'Apple', 'Wearables'],
      ['AP-S7', 'Apple Watch Series 7', 'Apple', 'Wearables'],
      ['AP-S6', 'Apple Watch Series 6', 'Apple', 'Wearables'],
      ['AP-S5', 'Apple Watch Series 5', 'Apple', 'Wearables'],
      ['AP-S4', 'Apple Watch Series 4', 'Apple', 'Wearables'],
      ['AP-S3', 'Apple Watch Series 3', 'Apple', 'Wearables'],
      ['AP-SE2', 'Apple Watch SE (2nd Gen)', 'Apple', 'Wearables'],
      ['AP-SE', 'Apple Watch SE', 'Apple', 'Wearables'],
      // Samsung Galaxy S
      ['SA-GS25U', 'Galaxy S25 Ultra', 'Samsung', 'Phones'],
      ['SA-GS25P', 'Galaxy S25+', 'Samsung', 'Phones'],
      ['SA-GS25', 'Galaxy S25', 'Samsung', 'Phones'],
      ['SA-GS24U', 'Galaxy S24 Ultra', 'Samsung', 'Phones'],
      ['SA-GS24P', 'Galaxy S24+', 'Samsung', 'Phones'],
      ['SA-GS24', 'Galaxy S24', 'Samsung', 'Phones'],
      ['SA-GS24FE', 'Galaxy S24 FE', 'Samsung', 'Phones'],
      ['SA-GS23U', 'Galaxy S23 Ultra', 'Samsung', 'Phones'],
      ['SA-GS23P', 'Galaxy S23+', 'Samsung', 'Phones'],
      ['SA-GS23', 'Galaxy S23', 'Samsung', 'Phones'],
      ['SA-GS23FE', 'Galaxy S23 FE', 'Samsung', 'Phones'],
      ['SA-GS22U', 'Galaxy S22 Ultra', 'Samsung', 'Phones'],
      ['SA-GS22P', 'Galaxy S22+', 'Samsung', 'Phones'],
      ['SA-GS22', 'Galaxy S22', 'Samsung', 'Phones'],
      ['SA-GS21U', 'Galaxy S21 Ultra', 'Samsung', 'Phones'],
      ['SA-GS21P', 'Galaxy S21+', 'Samsung', 'Phones'],
      ['SA-GS21', 'Galaxy S21', 'Samsung', 'Phones'],
      ['SA-GS21FE', 'Galaxy S21 FE', 'Samsung', 'Phones'],
      ['SA-GS20U', 'Galaxy S20 Ultra', 'Samsung', 'Phones'],
      ['SA-GS20P', 'Galaxy S20+', 'Samsung', 'Phones'],
      ['SA-GS20', 'Galaxy S20', 'Samsung', 'Phones'],
      ['SA-GS20FE', 'Galaxy S20 FE', 'Samsung', 'Phones'],
      ['SA-GS10P', 'Galaxy S10+', 'Samsung', 'Phones'],
      ['SA-GS10', 'Galaxy S10', 'Samsung', 'Phones'],
      ['SA-GS10E', 'Galaxy S10e', 'Samsung', 'Phones'],
      ['SA-GS9', 'Galaxy S9', 'Samsung', 'Phones'],
      ['SA-GS9P', 'Galaxy S9+', 'Samsung', 'Phones'],
      // Samsung Galaxy A
      ['SA-GA71', 'Galaxy A71', 'Samsung', 'Phones'],
      ['SA-GA54', 'Galaxy A54', 'Samsung', 'Phones'],
      ['SA-GA53', 'Galaxy A53', 'Samsung', 'Phones'],
      ['SA-GA52', 'Galaxy A52', 'Samsung', 'Phones'],
      ['SA-GA51', 'Galaxy A51', 'Samsung', 'Phones'],
      ['SA-GA42', 'Galaxy A42', 'Samsung', 'Phones'],
      ['SA-GA35', 'Galaxy A35', 'Samsung', 'Phones'],
      ['SA-GA32', 'Galaxy A32', 'Samsung', 'Phones'],
      ['SA-GA25', 'Galaxy A25', 'Samsung', 'Phones'],
      ['SA-GA23', 'Galaxy A23', 'Samsung', 'Phones'],
      ['SA-GA16', 'Galaxy A16', 'Samsung', 'Phones'],
      ['SA-GA15', 'Galaxy A15', 'Samsung', 'Phones'],
      ['SA-GA14', 'Galaxy A14', 'Samsung', 'Phones'],
      ['SA-GA13', 'Galaxy A13', 'Samsung', 'Phones'],
      ['SA-GA12', 'Galaxy A12', 'Samsung', 'Phones'],
      ['SA-GA11', 'Galaxy A11', 'Samsung', 'Phones'],
      ['SA-GA06', 'Galaxy A06', 'Samsung', 'Phones'],
      ['SA-GA03', 'Galaxy A03s', 'Samsung', 'Phones'],
      // Samsung Galaxy Note
      ['SA-NOT20U', 'Galaxy Note 20 Ultra', 'Samsung', 'Phones'],
      ['SA-NOT20', 'Galaxy Note 20', 'Samsung', 'Phones'],
      ['SA-NOT10P', 'Galaxy Note 10+', 'Samsung', 'Phones'],
      ['SA-NOT10', 'Galaxy Note 10', 'Samsung', 'Phones'],
      ['SA-NOT9', 'Galaxy Note 9', 'Samsung', 'Phones'],
      ['SA-NOT8', 'Galaxy Note 8', 'Samsung', 'Phones'],
      // Samsung Galaxy Z
      ['SA-GZF6', 'Galaxy Z Fold 6', 'Samsung', 'Phones'],
      ['SA-GZF5', 'Galaxy Z Fold 5', 'Samsung', 'Phones'],
      ['SA-GZF4', 'Galaxy Z Fold 4', 'Samsung', 'Phones'],
      ['SA-GZF3', 'Galaxy Z Fold 3', 'Samsung', 'Phones'],
      ['SA-GZFL6', 'Galaxy Z Flip 6', 'Samsung', 'Phones'],
      ['SA-GZFL5', 'Galaxy Z Flip 5', 'Samsung', 'Phones'],
      ['SA-GZFL4', 'Galaxy Z Flip 4', 'Samsung', 'Phones'],
      ['SA-GZFL3', 'Galaxy Z Flip 3', 'Samsung', 'Phones'],
      // Samsung Tablets
      ['SA-GTS9U', 'Galaxy Tab S9 Ultra', 'Samsung', 'Tablets'],
      ['SA-GTS9P', 'Galaxy Tab S9+', 'Samsung', 'Tablets'],
      ['SA-GTS9', 'Galaxy Tab S9', 'Samsung', 'Tablets'],
      ['SA-GTS9FE', 'Galaxy Tab S9 FE', 'Samsung', 'Tablets'],
      ['SA-GTS8U', 'Galaxy Tab S8 Ultra', 'Samsung', 'Tablets'],
      ['SA-GTS8P', 'Galaxy Tab S8+', 'Samsung', 'Tablets'],
      ['SA-GTS8', 'Galaxy Tab S8', 'Samsung', 'Tablets'],
      ['SA-GTS7FE', 'Galaxy Tab S7 FE', 'Samsung', 'Tablets'],
      ['SA-GTS7', 'Galaxy Tab S7', 'Samsung', 'Tablets'],
      ['SA-GTS6', 'Galaxy Tab S6', 'Samsung', 'Tablets'],
      ['SA-GTA9', 'Galaxy Tab A9', 'Samsung', 'Tablets'],
      ['SA-GTA8', 'Galaxy Tab A8', 'Samsung', 'Tablets'],
      ['SA-GTA7', 'Galaxy Tab A7', 'Samsung', 'Tablets'],
      ['SA-GTA10.5', 'Galaxy Tab A 10.5"', 'Samsung', 'Tablets'],
      ['SA-GTA10.1', 'Galaxy Tab A 10.1"', 'Samsung', 'Tablets'],
      ['SA-GTA3', 'Galaxy Tab A3', 'Samsung', 'Tablets'],
      // Google Pixel
      ['GO-PX9P', 'Pixel 9 Pro', 'Google', 'Phones'],
      ['GO-PX9', 'Pixel 9', 'Google', 'Phones'],
      ['GO-PX8P', 'Pixel 8 Pro', 'Google', 'Phones'],
      ['GO-PX8', 'Pixel 8', 'Google', 'Phones'],
      ['GO-PX8A', 'Pixel 8a', 'Google', 'Phones'],
      ['GO-PX7P', 'Pixel 7 Pro', 'Google', 'Phones'],
      ['GO-PX7', 'Pixel 7', 'Google', 'Phones'],
      ['GO-PX7A', 'Pixel 7a', 'Google', 'Phones'],
      ['GO-PX6P', 'Pixel 6 Pro', 'Google', 'Phones'],
      ['GO-PX6', 'Pixel 6', 'Google', 'Phones'],
      ['GO-PX6A', 'Pixel 6a', 'Google', 'Phones'],
      // Motorola
      ['MO-MGPW', 'Moto G Power', 'Motorola', 'Phones'],
      ['MO-MGST', 'Moto G Stylus', 'Motorola', 'Phones'],
      ['MO-MGPL', 'Moto G Play', 'Motorola', 'Phones'],
      ['MO-MGPU', 'Moto G Pure', 'Motorola', 'Phones'],
      ['MO-MEDG', 'Motorola Edge', 'Motorola', 'Phones'],
      ['MO-MONE', 'Motorola One 5G Ace', 'Motorola', 'Phones'],
      // LG
      ['LG-V60', 'LG V60 ThinQ', 'LG', 'Phones'],
      ['LG-V50', 'LG V50 ThinQ', 'LG', 'Phones'],
      ['LG-V40', 'LG V40 ThinQ', 'LG', 'Phones'],
      ['LG-V30', 'LG V30', 'LG', 'Phones'],
      ['LG-STY6', 'LG Stylo 6', 'LG', 'Phones'],
      // Other brands
      ['AL-GFV', 'Alcatel Go Flip V', 'Alcatel', 'Phones'],
      ['AL-SF', 'Alcatel SmartFlip', 'Alcatel', 'Phones'],
      ['ON-NRD', 'OnePlus Nord N200', 'OnePlus', 'Phones'],
      ['TC-30Z', 'TCL 30Z', 'TCL', 'Phones'],
      ['KY-DFS', 'Kyocera DuraForce Sport', 'Kyocera', 'Phones'],
      ['ZT-BLD', 'ZTE Blade', 'ZTE', 'Phones'],
      ['KA-ETC', 'Kazuna eTalk', 'Kazuna', 'Phones'],
    ]

    let familiesInserted = 0
    for (const [modelCode, name, brand, category] of families) {
      const r = await pool.query(`
        INSERT INTO product_families (model_code, name, brand, category)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (model_code) DO UPDATE SET
          name = EXCLUDED.name,
          brand = EXCLUDED.brand,
          category = EXCLUDED.category,
          updated_at = NOW()
      `, [modelCode, name, brand, category])
      familiesInserted++
    }

    // ── Seed grade_config ─────────────────────────────────────────────
    const grades: [string, string, number, number][] = [
      ['CAP1', 'Premium 100%', 1.50, 10],
      ['NE', 'New', 1.50, 20],
      ['CAP', 'Premium', 1.45, 30],
      ['CA+', 'Excellent', 1.40, 40],
      ['CA', 'Good', 1.35, 50],
      ['CAB', 'Good (Batt<80%)', 1.25, 60],
      ['SD', 'B-Grade', 1.20, 70],
      ['SD-', 'C-Grade', 1.15, 80],
      ['SDB', 'B/C (Batt<80%)', 1.10, 90],
    ]

    let gradesInserted = 0
    for (const [code, label, multiplier, sortOrder] of grades) {
      await pool.query(`
        INSERT INTO grade_config (grade_code, label, multiplier, sort_order)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (grade_code) DO UPDATE SET
          label = EXCLUDED.label,
          multiplier = EXCLUDED.multiplier,
          sort_order = EXCLUDED.sort_order
      `, [code, label, multiplier, sortOrder])
      gradesInserted++
    }

    // ── Seed carrier_map ──────────────────────────────────────────────
    const carriers: [string, string][] = [
      ['UN', 'Unlocked'], ['TM', 'T-Mobile'], ['AT', 'AT&T'],
      ['VZ', 'Verizon'], ['SP', 'Sprint'], ['US', 'US Cellular'],
      ['ST', 'Spectrum'], ['FX', 'Xfinity'], ['BO', 'Boost Mobile'],
      ['CR', 'Cricket'],
    ]

    let carriersInserted = 0
    for (const [code, name] of carriers) {
      await pool.query(`
        INSERT INTO carrier_map (code, display_name)
        VALUES ($1, $2)
        ON CONFLICT (code) DO UPDATE SET display_name = EXCLUDED.display_name
      `, [code, name])
      carriersInserted++
    }

    // ── Seed color_map ────────────────────────────────────────────────
    const colors: [string, string][] = [
      ['BLA', 'Black'], ['BLU', 'Blue'], ['GRA', 'Gray'], ['PUR', 'Purple'],
      ['PIN', 'Pink'], ['WHI', 'White'], ['GRE', 'Green'], ['SIL', 'Silver'],
      ['GLD', 'Gold'], ['RED', 'Red'], ['YEL', 'Yellow'], ['ORG', 'Orange'],
      ['TIT', 'Titanium'], ['MID', 'Midnight'], ['STL', 'Starlight'],
      ['SPG', 'Space Gray'], ['SBL', 'Space Black'], ['NAT', 'Natural'],
      ['DES', 'Desert'], ['CRM', 'Cream'], ['LAV', 'Lavender'],
      ['PHN', 'Phantom'], ['GRP', 'Graphite'], ['COR', 'Coral'],
    ]

    let colorsInserted = 0
    for (const [code, name] of colors) {
      await pool.query(`
        INSERT INTO color_map (code, display_name)
        VALUES ($1, $2)
        ON CONFLICT (code) DO UPDATE SET display_name = EXCLUDED.display_name
      `, [code, name])
      colorsInserted++
    }

    res.status(200).json({
      success: true,
      message: 'Migration complete',
      inserted: {
        product_families: familiesInserted,
        grade_config: gradesInserted,
        carrier_map: carriersInserted,
        color_map: colorsInserted,
      }
    })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
