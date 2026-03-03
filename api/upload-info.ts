import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from '@neondatabase/serverless'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  try {
    const { rows: allTokens } = await pool.query('SELECT id, token, length(token) as len, application_id FROM upload_requests')
    const { rows: match } = await pool.query('SELECT ur.*, a.company_name, a.first_name, a.last_name FROM upload_requests ur JOIN applications a ON a.id = ur.application_id WHERE ur.token = $1', [token])
    res.status(200).json({
      received_token: token,
      received_length: String(token).length,
      all_tokens_in_db: allTokens,
      match_found: match.length > 0,
      match: match[0] || null
    })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  } finally {
    await pool.end()
  }
}
