/**
 * Event Tracker Wrapper
 * Provides centralized event tracking with error handling
 * Wraps GA4 analytics and future platforms (Facebook, LinkedIn, etc.)
 */

import GA4React from 'react-ga4'
import { getStoredUTMParams } from './utm-parser'

export interface EventData {
  [key: string]: string | number | boolean | undefined | null
}

/**
 * Fire a tracking event with automatic error handling
 * Enriches events with UTM parameters automatically
 */
export function trackEvent(eventName: string, eventData?: EventData): void {
  try {
    // Enrich with UTM data
    const utm = getStoredUTMParams()
    const enrichedData: EventData = {
      ...eventData,
    }

    if (utm?.source) enrichedData.utm_source = utm.source
    if (utm?.medium) enrichedData.utm_medium = utm.medium
    if (utm?.campaign) enrichedData.utm_campaign = utm.campaign
    if (utm?.content) enrichedData.utm_content = utm.content
    if (utm?.term) enrichedData.utm_term = utm.term

    // Fire to GA4
    GA4React.event(eventName, enrichedData)

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Event: ${eventName}`, enrichedData)
    }
  } catch (err) {
    console.error('[Analytics] Event tracking failed:', err)
  }
}

/**
 * Track form submission with optional value
 */
export function trackFormSubmission(
  formName: string,
  eventData?: EventData
): void {
  trackEvent(`${formName}_submitted`, {
    form_name: formName,
    ...eventData,
  })
}

/**
 * Track user action/button click
 */
export function trackUserAction(
  action: string,
  details?: EventData
): void {
  trackEvent('user_action', {
    action,
    ...details,
  })
}

/**
 * Track conversion with monetary value
 */
export function trackConversion(
  conversionType: string,
  value: number,
  currency: string = 'USD',
  details?: EventData
): void {
  trackEvent(`conversion_${conversionType}`, {
    value,
    currency,
    ...details,
  })
}

/**
 * Track view/impression
 */
export function trackView(
  contentType: string,
  contentName: string,
  details?: EventData
): void {
  trackEvent('view_content', {
    content_type: contentType,
    content_name: contentName,
    ...details,
  })
}
