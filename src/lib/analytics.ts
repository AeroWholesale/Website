import GA4React from 'react-ga4'

/**
 * Track key business events for conversion analysis
 */
export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  try {
    GA4React.event(eventName, eventData || {})
  } catch (err) {
    console.warn('[GA4] Event tracking failed:', err)
  }
}

// Conversion event tracking
export const trackQuoteSubmitted = (quoteValue: number, unitCount: number) => {
  trackEvent('quote_submitted', {
    quote_value: quoteValue,
    unit_count: unitCount,
  })
}

export const trackPaymentInitiated = (quoteId: number, quoteValue: number) => {
  trackEvent('payment_initiated', {
    quote_id: quoteId,
    quote_value: quoteValue,
  })
}

export const trackPaymentCompleted = (quoteId: number, quoteValue: number) => {
  trackEvent('payment_completed', {
    quote_id: quoteId,
    quote_value: quoteValue,
  })
}

// User journey tracking
export const trackCatalogViewed = () => {
  trackEvent('catalog_viewed')
}

export const trackProductViewed = (productName: string, productId?: string) => {
  trackEvent('product_viewed', {
    product_name: productName,
    product_id: productId,
  })
}

export const trackApplicationSubmitted = (companyName: string) => {
  trackEvent('dealer_application_submitted', {
    company_name: companyName,
  })
}

export const trackDealerLogin = () => {
  trackEvent('dealer_login')
}

export const trackContactFormSubmitted = () => {
  trackEvent('contact_form_submitted')
}

// Page view tracking
export const trackPageView = (pageName: string, path: string) => {
  trackEvent('page_view', {
    page_title: pageName,
    page_path: path,
  })
}

// Landing page tracking
export const trackLandingPageView = (pageName: string, category: string) => {
  trackEvent('landing_page_view', {
    page_name: pageName,
    category: category,
  })
}

export const trackLandingPageCTA = (ctaText: string, landingPage: string) => {
  trackEvent('landing_page_cta_click', {
    cta_text: ctaText,
    landing_page: landingPage,
  })
}
