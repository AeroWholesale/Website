import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  const { email, password } = req.body || {}
  if (!email || !password) return res.status(400).json({ error: 'Missing email or password' })
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows } = await pool.query(
      'SELECT id, email, first_name, last_name, company_name, account_type, active, password_hash FROM users WHERE email = $1',
      [email.toLowerCase().trim()]
    )
    if (!rows.length) return res.status(401).json({ error: 'Invalid email or password' })
    const user = rows[0]
    const valid = await bcrypt.compare(password, user.password_hash)
    if (!valid) return res.status(401).json({ error: 'Invalid email or password' })
    if (!user.active) return res.status(403).json({ error: 'Account is inactive. Contact sales@aerowholesale.com.' })
    await pool.query(`CREATE TABLE IF NOT EXISTS sessions (
      id SERIAL PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      user_id INTEGER NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ DEFAULT NOW() + INTERVAL '30 days'
    )`)
    const token = crypto.randomBytes(32).toString('hex')
    await pool.query('INSERT INTO sessions (token, user_id) VALUES ($1, $2)', [token, user.id])
    res.status(200).json({
      success: true, token,
      user: { id: user.id, email: user.email, firstName: user.first_name, lastName: user.last_name, companyName: user.company_name, accountType: user.account_type }
    })
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  } finally {
    await pool.end()
  }
}