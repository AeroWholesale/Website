import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

/**
 * ONE-TIME MIGRATION: Replace product_families with real inventory-based model codes
 * Run once: GET /api/db/migrate-product-families
 *
 * - Clears all existing product_families rows
 * - Re-seeds with exact model codes derived from real SC inventory
 * - Does NOT touch: grade_config, carrier_map, color_map, products, users,
 *   sessions, applications, quote_requests, or any other table
 */

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // ── Wipe existing families ────────────────────────────────────────
    await pool.query(`DELETE FROM product_families`)

    // ── Seed from real inventory ──────────────────────────────────────
    // Format: [model_code, display_name, brand, category]
    // model_code must match exactly what getModelCode() extracts from SKU
    const families: [string, string, string, string][] = [

      // ── Apple iPhones ─────────────────────────────────────────────
      // Phones group by model only — no A-number needed (one SKU pattern per model)
      ['AP-IP16PM', 'iPhone 16 Pro Max', 'Apple', 'Phones'],
      ['AP-IP16P',  'iPhone 16 Pro',     'Apple', 'Phones'],
      ['AP-IP16',   'iPhone 16',         'Apple', 'Phones'],
      ['AP-IP16E',  'iPhone 16e',        'Apple', 'Phones'],
      ['AP-IP15PM', 'iPhone 15 Pro Max', 'Apple', 'Phones'],
      ['AP-IP15P',  'iPhone 15 Pro',     'Apple', 'Phones'],
      ['AP-IP15+',  'iPhone 15 Plus',    'Apple', 'Phones'],
      ['AP-IP15',   'iPhone 15',         'Apple', 'Phones'],
      ['AP-IP14PM', 'iPhone 14 Pro Max', 'Apple', 'Phones'],
      ['AP-IP14P',  'iPhone 14 Pro',     'Apple', 'Phones'],
      ['AP-IP14+',  'iPhone 14 Plus',    'Apple', 'Phones'],
      ['AP-IP14',   'iPhone 14',         'Apple', 'Phones'],
      ['AP-IP13PM', 'iPhone 13 Pro Max', 'Apple', 'Phones'],
      ['AP-IP13P',  'iPhone 13 Pro',     'Apple', 'Phones'],
      ['AP-IP13',   'iPhone 13',         'Apple', 'Phones'],
      ['AP-IP13M',  'iPhone 13 Mini',    'Apple', 'Phones'],
      ['AP-IP12PM', 'iPhone 12 Pro Max', 'Apple', 'Phones'],
      ['AP-IP12P',  'iPhone 12 Pro',     'Apple', 'Phones'],
      ['AP-IP12',   'iPhone 12',         'Apple', 'Phones'],
      ['AP-IP12M',  'iPhone 12 Mini',    'Apple', 'Phones'],
      ['AP-IP11PM', 'iPhone 11 Pro Max', 'Apple', 'Phones'],
      ['AP-IP11P',  'iPhone 11 Pro',     'Apple', 'Phones'],
      ['AP-IP11',   'iPhone 11',         'Apple', 'Phones'],
      ['AP-IPXSM',  'iPhone XS Max',     'Apple', 'Phones'],
      ['AP-IPXS',   'iPhone XS',         'Apple', 'Phones'],
      ['AP-IPXR',   'iPhone XR',         'Apple', 'Phones'],
      ['AP-IPX',    'iPhone X',          'Apple', 'Phones'],
      ['AP-IPSE3',  'iPhone SE (3rd Gen)', 'Apple', 'Phones'],
      ['AP-IPSE2',  'iPhone SE (2nd Gen)', 'Apple', 'Phones'],
      ['AP-IP8+',   'iPhone 8 Plus',     'Apple', 'Phones'],
      ['AP-IP8',    'iPhone 8',          'Apple', 'Phones'],
      ['AP-IP7+',   'iPhone 7 Plus',     'Apple', 'Phones'],
      ['AP-IP7',    'iPhone 7',          'Apple', 'Phones'],
      ['AP-IP6S+',  'iPhone 6S Plus',    'Apple', 'Phones'],
      ['AP-IP6S',   'iPhone 6S',         'Apple', 'Phones'],
      ['AP-IP6',    'iPhone 6',          'Apple', 'Phones'],
      ['AP-IP5C',   'iPhone 5C',         'Apple', 'Phones'],

      // ── Apple iPads ───────────────────────────────────────────────
      // Must use A-number to split generations (WiFi vs Cellular = separate A-numbers)
      // iPad Pro 13"
      ['AP-IPDP13-A2925', 'iPad Pro 13" M4 (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPDP13-A2926', 'iPad Pro 13" M4 (Cellular)', 'Apple', 'Tablets'],
      // iPad Pro 12.9"
      ['AP-IPDP12.9-A2436', 'iPad Pro 12.9" 6th Gen (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPDP12.9-A2764', 'iPad Pro 12.9" 6th Gen (Cellular)', 'Apple', 'Tablets'],
      ['AP-IPDP12.9-A2378', 'iPad Pro 12.9" 5th Gen (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPDP12.9-A2379', 'iPad Pro 12.9" 5th Gen (Cellular)', 'Apple', 'Tablets'],
      ['AP-IPDP12.9-A2229', 'iPad Pro 12.9" 4th Gen (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPDP12.9-A2069', 'iPad Pro 12.9" 4th Gen (Cellular)', 'Apple', 'Tablets'],
      // iPad Pro 11"
      ['AP-IPDP11-A2759', 'iPad Pro 11" 4th Gen (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPDP11-A2435', 'iPad Pro 11" 4th Gen (Cellular)', 'Apple', 'Tablets'],
      ['AP-IPDP11-A2377', 'iPad Pro 11" 3rd Gen (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPDP11-A2301', 'iPad Pro 11" 3rd Gen (Cellular)', 'Apple', 'Tablets'],
      // iPad Air
      ['AP-IPDA13-A2898', 'iPad Air 13" M2 (WiFi)',      'Apple', 'Tablets'],
      ['AP-IPDA13-A2999', 'iPad Air 13" M2 (Cellular)',  'Apple', 'Tablets'],
      ['AP-IPDA11-A2903', 'iPad Air 11" M2 (WiFi)',      'Apple', 'Tablets'],
      ['AP-IPDA11-A2902', 'iPad Air 11" M2 (Cellular)',  'Apple', 'Tablets'],
      ['AP-IPDA10.9-A2589', 'iPad Air 4th Gen (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPDA10.9-A2588', 'iPad Air 4th Gen (Cellular)', 'Apple', 'Tablets'],
      // iPad standard
      ['AP-IPD10.9-A2696', 'iPad 10th Gen (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPD10.9-A2757', 'iPad 10th Gen (Cellular)', 'Apple', 'Tablets'],
      ['AP-IPD10.2-A2602', 'iPad 9th Gen (WiFi)',      'Apple', 'Tablets'],
      ['AP-IPD10.2-A2603', 'iPad 9th Gen (Cellular)',  'Apple', 'Tablets'],
      ['AP-IPD10.2-A2428', 'iPad 8th Gen',             'Apple', 'Tablets'],
      ['AP-IPD10.2-A2270', 'iPad 8th Gen (WiFi)',      'Apple', 'Tablets'],
      ['AP-IPD9.7-A1954',  'iPad 6th Gen',             'Apple', 'Tablets'],
      ['AP-IPD9.5-A1460',  'iPad 4th Gen',             'Apple', 'Tablets'],
      ['AP-IPD11-A3354',   'iPad 11" A16',             'Apple', 'Tablets'],
      // iPad Mini
      ['AP-IPDM8.3-A2568', 'iPad Mini 6th Gen (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPDM8.3-A2567', 'iPad Mini 6th Gen (Cellular)', 'Apple', 'Tablets'],
      ['AP-IPDM8-A2133',   'iPad Mini 5th Gen (WiFi)',     'Apple', 'Tablets'],
      ['AP-IPDM8-A2126',   'iPad Mini 5th Gen (Cellular)', 'Apple', 'Tablets'],

      // ── Apple MacBooks ────────────────────────────────────────────
      // Must use A-number to split generations
      ['AP-MACM-A3238', 'Mac Mini M4',          'Apple', 'Laptops'],
      ['AP-MACM-A2686', 'Mac Mini M2',          'Apple', 'Laptops'],
      ['AP-MACM-A2348', 'Mac Mini M1',          'Apple', 'Laptops'],
      ['AP-MBA13-A2681', 'MacBook Air 13" M2',  'Apple', 'Laptops'],
      ['AP-MBA13-A2337', 'MacBook Air 13" M1',  'Apple', 'Laptops'],
      ['AP-MBA13-A2179', 'MacBook Air 13" Intel', 'Apple', 'Laptops'],
      ['AP-MBA15-A2941', 'MacBook Air 15" M2',  'Apple', 'Laptops'],
      ['AP-MBP13-A2338', 'MacBook Pro 13" M1',  'Apple', 'Laptops'],
      ['AP-MBP14-A2442', 'MacBook Pro 14" M1 Pro', 'Apple', 'Laptops'],
      ['AP-MBP16-A2485', 'MacBook Pro 16" M1 Pro', 'Apple', 'Laptops'],

      // ── Apple Watch ───────────────────────────────────────────────
      ['AP-ULT2', 'Apple Watch Ultra 2',      'Apple', 'Wearables'],
      ['AP-ULT',  'Apple Watch Ultra',         'Apple', 'Wearables'],
      ['AP-S10',  'Apple Watch Series 10',     'Apple', 'Wearables'],
      ['AP-S9',   'Apple Watch Series 9',      'Apple', 'Wearables'],
      ['AP-S8',   'Apple Watch Series 8',      'Apple', 'Wearables'],
      ['AP-S7',   'Apple Watch Series 7',      'Apple', 'Wearables'],
      ['AP-SE2',  'Apple Watch SE (2nd Gen)',   'Apple', 'Wearables'],

      // ── Apple AirPods ─────────────────────────────────────────────
      ['AP-APP2-A2931', 'AirPods Pro (2nd Gen)', 'Apple', 'Wearables'],
      ['AP-APMC-A3184', 'AirPods Max',           'Apple', 'Wearables'],

      // ── Samsung Phones ────────────────────────────────────────────
      ['SA-GS25E',  'Galaxy S25 Edge',   'Samsung', 'Phones'],
      ['SA-GS24+',  'Galaxy S24+',       'Samsung', 'Phones'],
      ['SA-GS24FE', 'Galaxy S24 FE',     'Samsung', 'Phones'],
      ['SA-GS23+',  'Galaxy S23+',       'Samsung', 'Phones'],
      ['SA-GS23',   'Galaxy S23',        'Samsung', 'Phones'],
      ['SA-GS22U',  'Galaxy S22 Ultra',  'Samsung', 'Phones'],
      ['SA-GS22+',  'Galaxy S22+',       'Samsung', 'Phones'],
      ['SA-GS22',   'Galaxy S22',        'Samsung', 'Phones'],
      ['SA-GS21U',  'Galaxy S21 Ultra',  'Samsung', 'Phones'],
      ['SA-GS21+',  'Galaxy S21+',       'Samsung', 'Phones'],
      ['SA-GS21',   'Galaxy S21',        'Samsung', 'Phones'],
      ['SA-GS21FE', 'Galaxy S21 FE',     'Samsung', 'Phones'],
      ['SA-GS20FE', 'Galaxy S20 FE',     'Samsung', 'Phones'],
      ['SA-GS9',    'Galaxy S9',         'Samsung', 'Phones'],
      ['SA-GS8',    'Galaxy S8',         'Samsung', 'Phones'],
      ['SA-GS5',    'Galaxy S5',         'Samsung', 'Phones'],
      ['SA-GA71',   'Galaxy A71',        'Samsung', 'Phones'],
      ['SA-GA53',   'Galaxy A53',        'Samsung', 'Phones'],
      ['SA-GA52',   'Galaxy A52',        'Samsung', 'Phones'],
      ['SA-GA51',   'Galaxy A51',        'Samsung', 'Phones'],
      ['SA-GA42',   'Galaxy A42',        'Samsung', 'Phones'],
      ['SA-GA35',   'Galaxy A35',        'Samsung', 'Phones'],
      ['SA-GA32',   'Galaxy A32',        'Samsung', 'Phones'],
      ['SA-GA21',   'Galaxy A21',        'Samsung', 'Phones'],
      ['SA-GA20',   'Galaxy A20',        'Samsung', 'Phones'],
      ['SA-GA15',   'Galaxy A15',        'Samsung', 'Phones'],
      ['SA-GA10',   'Galaxy A10',        'Samsung', 'Phones'],
      ['SA-GA02',   'Galaxy A02s',       'Samsung', 'Phones'],
      ['SA-NOT20',  'Galaxy Note 20',    'Samsung', 'Phones'],
      ['SA-NOT8',   'Galaxy Note 8',     'Samsung', 'Phones'],
      ['SA-NOT4',   'Galaxy Note 4',     'Samsung', 'Phones'],
      ['SA-GZF6',   'Galaxy Z Fold 6',   'Samsung', 'Phones'],
      ['SA-GZF4',   'Galaxy Z Fold 4',   'Samsung', 'Phones'],
      ['SA-GZF3',   'Galaxy Z Fold 3',   'Samsung', 'Phones'],
      ['SA-GXC6P',  'Galaxy XCover 6 Pro', 'Samsung', 'Phones'],
      ['SA-CON4',   'Galaxy Convoy 4',   'Samsung', 'Phones'],
      ['SA-GJ1',    'Galaxy J1',         'Samsung', 'Phones'],

      // ── Samsung Watches ───────────────────────────────────────────
      ['SA-GW7',   'Galaxy Watch 7',          'Samsung', 'Wearables'],
      ['SA-GW5P',  'Galaxy Watch 5 Pro',      'Samsung', 'Wearables'],
      ['SA-GW5',   'Galaxy Watch 5',          'Samsung', 'Wearables'],
      ['SA-GW4C',  'Galaxy Watch 4 Classic',  'Samsung', 'Wearables'],
      ['SA-GW4',   'Galaxy Watch 4',          'Samsung', 'Wearables'],
      ['SA-GW3',   'Galaxy Watch 3',          'Samsung', 'Wearables'],
      ['SA-GW',    'Galaxy Watch',            'Samsung', 'Wearables'],
      ['SA-GWA2',  'Galaxy Watch Active 2',   'Samsung', 'Wearables'],
      ['SA-GWA',   'Galaxy Watch Active',     'Samsung', 'Wearables'],
      ['SA-GWFE',  'Galaxy Watch FE',         'Samsung', 'Wearables'],

      // ── Samsung Tablets ───────────────────────────────────────────
      ['SA-GTS7FE', 'Galaxy Tab S7 FE',    'Samsung', 'Tablets'],
      ['SA-GTS6L',  'Galaxy Tab S6 Lite',  'Samsung', 'Tablets'],
      ['SA-GTS5E',  'Galaxy Tab S5e',      'Samsung', 'Tablets'],
      ['SA-GTA7L',  'Galaxy Tab A7 Lite',  'Samsung', 'Tablets'],
      ['SA-GTA10.5','Galaxy Tab A 10.5"',  'Samsung', 'Tablets'],
      ['SA-GTA10',  'Galaxy Tab A 10.1"',  'Samsung', 'Tablets'],
      ['SA-GTA7',   'Galaxy Tab A7',       'Samsung', 'Tablets'],
      ['SA-GTA3',   'Galaxy Tab A3',       'Samsung', 'Tablets'],
      ['SA-GTE8',   'Galaxy Tab E 8.0"',   'Samsung', 'Tablets'],
      ['SA-GTE9.6', 'Galaxy Tab E 9.6"',   'Samsung', 'Tablets'],
      ['SA-GT4',    'Galaxy Tab 4',        'Samsung', 'Tablets'],

      // ── Google Pixel ──────────────────────────────────────────────
      ['GO-PX10',  'Pixel 10',    'Google', 'Phones'],
      ['GO-PX9',   'Pixel 9',     'Google', 'Phones'],
      ['GO-PX8P',  'Pixel 8 Pro', 'Google', 'Phones'],
      ['GO-PX8A',  'Pixel 8a',    'Google', 'Phones'],
      ['GO-PX8',   'Pixel 8',     'Google', 'Phones'],
      ['GO-PX7P',  'Pixel 7 Pro', 'Google', 'Phones'],
      ['GO-PX7',   'Pixel 7',     'Google', 'Phones'],
      ['GO-PX6A',  'Pixel 6a',    'Google', 'Phones'],

      // ── Other Phones ──────────────────────────────────────────────
      ['OP-NORD',  'OnePlus Nord N200', 'OnePlus',  'Phones'],
      ['TC-GOF3',  'TCL Go Flip 3',     'TCL',      'Phones'],
      ['KAZ-ETA',  'Kazuna eTalk',      'Kazuna',   'Phones'],
      ['ZT-BLV2',  'ZTE Blade V2',      'ZTE',      'Phones'],
      ['AL-AVAV',  'Alcatel Avalon V',  'Alcatel',  'Phones'],
      ['RE-ORW',   'Orbic Wonder',      'Orbic',    'Phones'],
      ['MO-X2',    'Moto X (2nd Gen)',  'Motorola', 'Phones'],
      ['MO-G6P',   'Moto G6 Play',      'Motorola', 'Phones'],
      ['MO-E5P',   'Moto E5 Play',      'Motorola', 'Phones'],
      ['MO-ONEACE','Moto One 5G Ace',   'Motorola', 'Phones'],
      ['LG-V30',   'LG V30',            'LG',       'Phones'],
      ['LG-K20',   'LG K20 V',          'LG',       'Phones'],
      ['LG-LAN',   'LG Lancaster',      'LG',       'Phones'],
      ['LG-LANW',  'LG Lancaster W',    'LG',       'Phones'],
      ['LG-EXAL',  'LG Exalt LTE',      'LG',       'Phones'],
      ['LG-COS3',  'LG Cosmos 3',       'LG',       'Phones'],
      ['LG-LANA',  'LG Lancaster A',    'LG',       'Phones'],
      ['HT-INC2',  'HTC Incredible 2',  'HTC',      'Phones'],
      ['HT-INC',   'HTC Incredible',    'HTC',      'Phones'],
      ['HT-D612',  'HTC Desire 612',    'HTC',      'Phones'],
      ['HT-D530',  'HTC Desire 530',    'HTC',      'Phones'],
      ['HT-D526',  'HTC Desire 526',    'HTC',      'Phones'],
      ['HT-D626',  'HTC Desire 626',    'HTC',      'Phones'],
      ['PA-BRE',   'Pantech Breeze',    'Pantech',  'Phones'],
      ['KY-DUXV',  'Kyocera DuraXV',    'Kyocera',  'Phones'],
      ['KY-DUF',   'Kyocera DuraForce', 'Kyocera',  'Phones'],
      ['KY-CAD',   'Kyocera Cadence',   'Kyocera',  'Phones'],
    ]

    let count = 0
    for (const [modelCode, name, brand, category] of families) {
      await pool.query(`
        INSERT INTO product_families (model_code, name, brand, category, visible)
        VALUES ($1, $2, $3, $4, true)
        ON CONFLICT (model_code) DO UPDATE SET
          name = EXCLUDED.name,
          brand = EXCLUDED.brand,
          category = EXCLUDED.category,
          updated_at = NOW()
      `, [modelCode, name, brand, category])
      count++
    }

    res.status(200).json({
      success: true,
      message: 'product_families rebuilt from real inventory',
      familiesSeeded: count,
    })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}