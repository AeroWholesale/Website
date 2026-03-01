import type { VercelRequest, VercelResponse } from '@vercel/node'

const SC_BASE = 'https://bi.api.sellercloud.com/rest'

// In-memory token cache (persists across warm invocations)
let cachedToken: string | null = null
let tokenExpiry: number = 0

export async function getToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer)
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
  // Token valid for 60 min, cache accordingly
  tokenExpiry = Date.now() + 55 * 60 * 1000

  return cachedToken!
}

export function scHeaders(token: string) {
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
}

export { SC_BASE }

// Direct endpoint to test auth
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const token = await getToken()
    res.status(200).json({
      success: true,
      message: 'SC auth working',
      tokenPreview: token.slice(0, 20) + '...',
      expiresIn: Math.round((tokenExpiry - Date.now()) / 1000) + 's'
    })
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
}