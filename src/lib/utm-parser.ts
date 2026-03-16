/**
 * UTM Parameter Parser
 * Extracts UTM parameters from URL and stores in session storage
 * Follows standard UTM naming: utm_source, utm_medium, utm_campaign, utm_content, utm_term
 */

export interface UTMParams {
  source: string | null
  medium: string | null
  campaign: string | null
  content: string | null
  term: string | null
  timestamp: number
}

/**
 * Get UTM parameters from URL and store in session storage
 * Should be called early in app initialization (in App.tsx or main.tsx)
 */
export function captureUTMParams(): UTMParams {
  const params = new URLSearchParams(window.location.search)

  const utm: UTMParams = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    content: params.get('utm_content'),
    term: params.get('utm_term'),
    timestamp: Date.now(),
  }

  // Store in session storage for duration of user session
  if (utm.source || utm.medium || utm.campaign) {
    sessionStorage.setItem('aw-utm-params', JSON.stringify(utm))
  }

  return utm
}

/**
 * Get stored UTM parameters from session storage
 */
export function getStoredUTMParams(): UTMParams | null {
  const stored = sessionStorage.getItem('aw-utm-params')
  if (!stored) return null
  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

/**
 * Get UTM string for API calls (key=value pairs)
 * Format: "utm_source=google&utm_medium=cpc&utm_campaign=summer-sale"
 */
export function getUTMString(): string {
  const params = getStoredUTMParams()
  if (!params) return ''

  const parts: string[] = []
  if (params.source) parts.push(`utm_source=${encodeURIComponent(params.source)}`)
  if (params.medium) parts.push(`utm_medium=${encodeURIComponent(params.medium)}`)
  if (params.campaign) parts.push(`utm_campaign=${encodeURIComponent(params.campaign)}`)
  if (params.content) parts.push(`utm_content=${encodeURIComponent(params.content)}`)
  if (params.term) parts.push(`utm_term=${encodeURIComponent(params.term)}`)

  return parts.join('&')
}

/**
 * Get UTM params as object for API request body
 */
export function getUTMObject(): Partial<UTMParams> {
  const params = getStoredUTMParams()
  if (!params) return {}
  return {
    source: params.source,
    medium: params.medium,
    campaign: params.campaign,
    content: params.content,
    term: params.term,
  }
}

/**
 * Check if visitor is from a paid channel
 */
export function isPaidTraffic(): boolean {
  const params = getStoredUTMParams()
  if (!params || !params.source) return false

  const paidSources = ['google', 'facebook', 'linkedin', 'tiktok', 'craigslist', 'bing']
  return paidSources.includes(params.source.toLowerCase())
}

/**
 * Get human-readable source name
 */
export function getSourceLabel(source: string | null): string {
  if (!source) return 'Direct'

  const labels: Record<string, string> = {
    google: 'Google',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    tiktok: 'TikTok',
    instagram: 'Instagram',
    twitter: 'Twitter',
    email: 'Email',
    organic: 'Organic Search',
  }

  return labels[source.toLowerCase()] || source
}
