import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    // Products table - parent level (e.g. iPhone 15 Pro Max)
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
        condition_label TEXT,
        site_price NUMERIC(10,2),
        cost NUMERIC(10,2),
        quantity INTEGER DEFAULT 0,
        available_quantity INTEGER DEFAULT 0,
        image_url TEXT,
        is_active BOOLEAN DEFAULT true,
        last_synced_at TIMESTAMPTZ,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    // Sync log - tracks every inventory sync run
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sync_log (
        id SERIAL PRIMARY KEY,
        status TEXT,
        products_synced INTEGER,
        products_added INTEGER,
        products_updated INTEGER,
        errors TEXT,
        started_at TIMESTAMPTZ DEFAULT NOW(),
        completed_at TIMESTAMPTZ
      )
    `)

    // Users table - for approved buyer login
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        company_name TEXT,
        is_approved BOOLEAN DEFAULT false,
        role TEXT DEFAULT 'buyer',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    // Quote cart - for approved buyers
    await pool.query(`
      CREATE TABLE IF NOT EXISTS quotes (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        status TEXT DEFAULT 'draft',
        total NUMERIC(10,2),
        notes TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await pool.query(`
      CREATE TABLE IF NOT EXISTS quote_items (
        id SERIAL PRIMARY KEY,
        quote_id INTEGER REFERENCES quotes(id),
        product_id INTEGER REFERENCES products(id),
        sku TEXT,
        quantity INTEGER,
        unit_price NUMERIC(10,2),
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    res.status(200).json({
      success: true,
      message: 'All tables created successfully',
      tables: ['products', 'sync_log', 'users', 'quotes', 'quote_items', 'sc_log']
    })

  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}