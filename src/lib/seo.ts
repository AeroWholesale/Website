/**
 * SEO utilities for meta tag management and schema generation
 */

export interface MetaTags {
  title: string
  description: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  keywords?: string
}

/**
 * Generate standard meta tag object
 */
export function createMetaTags(
  title: string,
  description: string,
  options?: {
    keywords?: string
    canonical?: string
    ogImage?: string
    ogUrl?: string
  }
): MetaTags {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://aerowholesale.com'
  const currentUrl = options?.ogUrl || (typeof window !== 'undefined' ? window.location.href : siteUrl)

  return {
    title,
    description,
    keywords: options?.keywords,
    canonical: options?.canonical || currentUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: options?.ogImage || `${siteUrl}/og-image.png`,
    ogUrl: currentUrl,
  }
}

/**
 * Product schema for catalog/landing pages with inventory
 */
export function createProductSchema(productName: string, priceRange: { min: number; max: number }, availability: string = 'InStock') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: `${productName} available at wholesale pricing`,
    brand: {
      '@type': 'Brand',
      name: 'AeroWholesale',
    },
    offers: {
      '@type': 'AggregateOffer',
      availability: `https://schema.org/${availability}`,
      priceCurrency: 'USD',
      lowPrice: priceRange.min.toString(),
      highPrice: priceRange.max.toString(),
    },
  }
}

/**
 * Organization schema - global, used on all pages
 */
export function createOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AeroWholesale',
    url: 'https://aerowholesale.com',
    logo: 'https://aerowholesale.com/logo.png',
    description: 'B2B wholesale refurbished electronics supplier specializing in bulk device sales',
    sameAs: [
      'https://www.linkedin.com/company/aerowholesale',
      'https://www.facebook.com/aerowholesale',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'Sales',
      email: 'sales@aerowholesale.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Your Address]',
      addressLocality: '[City]',
      addressRegion: '[State]',
      postalCode: '[ZIP]',
      addressCountry: 'US',
    },
  }
}

/**
 * Breadcrumb schema for navigation aid
 */
export function createBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

/**
 * FAQ Page schema - for pages with FAQ sections
 */
export function createFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Local Business schema
 */
export function createLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AeroWholesale',
    image: 'https://aerowholesale.com/logo.png',
    description: 'B2B wholesale refurbished electronics for businesses',
    url: 'https://aerowholesale.com',
    telephone: '+1-XXX-XXX-XXXX',
    email: 'sales@aerowholesale.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Your Address]',
      addressLocality: '[City]',
      addressRegion: '[State]',
      postalCode: '[ZIP]',
      addressCountry: 'US',
    },
    sameAs: [
      'https://www.linkedin.com/company/aerowholesale',
      'https://www.facebook.com/aerowholesale',
    ],
  }
}

/**
 * Aggregate rating schema - if you have reviews
 */
export function createAggregateRatingSchema(averageRating: number, ratingCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: averageRating.toString(),
    ratingCount: ratingCount.toString(),
  }
}
