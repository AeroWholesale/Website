import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const {
    firstName, lastName, email, phone, jobTitle,
    companyName, website, ein, state, city, yearsInBusiness,
    accountType, monthlyVolume, productCategories, salesChannel,
    heardAbout, notes
  } = req.body || {}

  if (!firstName || !lastName || !email || !phone || !companyName || !ein || !state || !accountType || !monthlyVolume) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL })

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        job_title TEXT,
        company_name TEXT NOT NULL,
        website TEXT,
        ein TEXT NOT NULL,
        state TEXT NOT NULL,
        city TEXT,
        years_in_business TEXT,
        account_type TEXT NOT NULL,
        monthly_volume TEXT NOT NULL,
        product_categories TEXT,
        sales_channel TEXT,
        heard_about TEXT,
        notes TEXT,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW()
      )
    `)

    await pool.query(
      `INSERT INTO applications (
        first_name, last_name, email, phone, job_title,
        company_name, website, ein, state, city, years_in_business,
        account_type, monthly_volume, product_categories, sales_channel,
        heard_about, notes
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)`,
      [
        firstName, lastName, email, phone, jobTitle || '',
        companyName, website || '', ein, state, city || '', yearsInBusiness || '',
        accountType, monthlyVolume, (productCategories || []).join(', '), salesChannel || '',
        heardAbout || '', notes || ''
      ]
    )

    res.status(200).json({ success: true })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}