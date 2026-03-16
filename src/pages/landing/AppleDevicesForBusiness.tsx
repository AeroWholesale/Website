import { Helmet } from 'react-helmet-async'
import { useLocation } from 'wouter'
import LandingHero from '@/components/landing/LandingHero'
import TrustBar from '@/components/landing/TrustBar'
import ProductShowcase from '@/components/landing/ProductShowcase'
import FAQSection from '@/components/landing/FAQSection'
import { createMetaTags, createProductSchema, createBreadcrumbSchema, createFAQSchema } from '@/lib/seo'

export default function AppleDevicesForBusiness() {
  const [, setLocation] = useLocation()

  const metaTags = createMetaTags(
    'Apple Devices for Business Wholesale | Bulk iPhones, iPads & MacBooks | AeroWholesale',
    'Buy refurbished Apple devices in bulk. iPhones, iPads, MacBooks at wholesale prices. For enterprise, resellers, and businesses. Quality guaranteed, bulk discounts.',
    {
      keywords: 'Apple devices wholesale, bulk iPhones iPads, refurbished MacBooks business, wholesale Apple products',
      canonical: 'https://aerowholesale.com/apple-devices-for-business',
    }
  )

  const breadcrumbs = [
    { name: 'Home', url: 'https://aerowholesale.com' },
    { name: 'Apple Devices for Business', url: 'https://aerowholesale.com/apple-devices-for-business' },
  ]

  const faqs = [
    {
      question: 'What Apple products do you carry?',
      answer: 'We stock iPhones, iPads, MacBooks, Apple Watches, and AirPods - both current and earlier generations. All models available in bulk.',
    },
    {
      question: 'Can we mix different Apple products in one order?',
      answer: 'Absolutely. Build custom quotes combining iPhones, iPads, MacBooks, and accessories in any combination that fits your needs.',
    },
    {
      question: 'Do you support Apple Business programs?',
      answer: 'Yes. We work with Apple Business Account holders and provide integration with MDM solutions like Apple Business Manager.',
    },
    {
      question: 'What warranty applies to refurbished Apple devices?',
      answer: '30-day warranty on all devices covering defects, battery, and functionality. Extended AppleCare+ options available for MacBooks.',
    },
    {
      question: 'Are these devices compatible with enterprise networks?',
      answer: 'Yes. All refurbished Apple devices are fully compatible with enterprise WI-Fi, VPN, and security protocols. We support network deployment.',
    },
    {
      question: 'Can you accommodate enterprise SLAs and support?',
      answer: 'Yes. For enterprise accounts, we offer custom service levels, dedicated account management, and priority support.',
    },
  ]

  const handleApply = () => setLocation('/apply')

  return (
    <>
      <Helmet>
        <title>{metaTags.title}</title>
        <meta name="description" content={metaTags.description} />
        <meta name="keywords" content={metaTags.keywords} />
        <link rel="canonical" href={metaTags.canonical} />
        <meta property="og:title" content={metaTags.ogTitle} />
        <meta property="og:description" content={metaTags.ogDescription} />
        <meta property="og:url" content={metaTags.ogUrl} />

        <script type="application/ld+json">
          {JSON.stringify(createBreadcrumbSchema(breadcrumbs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(createFAQSchema(faqs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(createProductSchema('Refurbished Apple Devices', { min: 100, max: 1500 }, 'InStock'))}
        </script>
      </Helmet>

      <main>
        <LandingHero
          title="Apple Devices for Business – Wholesale"
          subtitle="Complete Apple ecosystem refurbished and at wholesale prices. iPhones, iPads, MacBooks for enterprise, resellers, and bulk buyers. Quality guaranteed."
          ctaText="Apply for Access"
          ctaAction={handleApply}
        />

        <TrustBar />

        {/* Why Apple */}
        <section style={{ padding: '60px 20px', background: 'white' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#132347',
                marginBottom: '12px',
                fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
              }}>
                Complete Apple Ecosystem at Wholesale Pricing
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}>
              {[
                {
                  icon: '📱',
                  title: 'iPhones for Teams',
                  description: 'Latest and previous generation iPhones in all capacities. Perfect for employee programs and distribution.',
                },
                {
                  icon: '📱',
                  title: 'iPads & Minis',
                  description: 'iPad Air, iPad Pro, iPad Mini in all sizes. Ideal for creative teams, sales, and field operations.',
                },
                {
                  icon: '💻',
                  title: 'MacBooks',
                  description: 'MacBook Air and Pro models, refurbished and ready. Full specs supported for professional work.',
                },
                {
                  icon: '⌚',
                  title: 'Apple Watches',
                  description: 'Complete Apple Watch lineup for corporate wellness programs. All series and bands available.',
                },
                {
                  icon: '🎧',
                  title: 'Accessories',
                  description: 'AirPods, chargers, cables, and protective accessories. Build complete device kits.',
                },
                {
                  icon: '🔄',
                  title: 'Ecosystem Ready',
                  description: 'All devices Handoff-compatible. Deploy complete Apple ecosystems at fraction of retail cost.',
                },
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '24px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  background: '#f8fafc',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#132347',
                    marginBottom: '8px',
                    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '15px',
                    color: '#64748b',
                    lineHeight: '1.6',
                    margin: 0,
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Showcase */}
        <ProductShowcase
          category="Phones"
          title="Featured Apple Devices"
          description="Browse our current inventory of refurbished iPhones, iPads, and more"
          limit={8}
        />

        {/* How It Works */}
        <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#132347',
              marginBottom: '50px',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              How to Buy Bulk Apple Devices
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
            }}>
              {[
                { step: '1', title: 'Apply', description: 'Tell us about your business' },
                { step: '2', title: 'Browse', description: 'Access full Apple device inventory' },
                { step: '3', title: 'Quote', description: 'Build custom device mix' },
                { step: '4', title: 'Deploy', description: 'Fast bulk shipment to you' },
              ].map((item, idx) => (
                <div key={idx} style={{
                  padding: '24px',
                  background: 'white',
                  borderRadius: '12px',
                  borderLeft: '4px solid #c2410c',
                }}>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: 'bold',
                    color: '#c2410c',
                    marginBottom: '12px',
                  }}>
                    {item.step}
                  </div>
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#132347',
                    marginBottom: '8px',
                    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
                  }}>
                    {item.title}
                  </h4>
                  <p style={{
                    fontSize: '15px',
                    color: '#64748b',
                    margin: 0,
                  }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={faqs} />

        {/* CTA */}
        <section style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #132347 0%, #1a3a5f 100%)',
          color: 'white',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              marginBottom: '20px',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              Get Wholesale Apple Devices Today
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#cbd5e1',
              marginBottom: '30px',
              lineHeight: '1.6',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              Apply for bulk access and start building your Apple device supply at wholesale prices.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={handleApply}
                style={{
                  background: '#c2410c',
                  color: 'white',
                  padding: '16px 40px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'background 0.3s ease',
                  fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#a01e09')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#c2410c')}
              >
                Apply for Bulk Pricing
              </button>
              <a
                href="/contact"
                style={{
                  background: 'transparent',
                  color: 'white',
                  padding: '16px 40px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  border: '2px solid white',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white'
                  e.currentTarget.style.color = '#132347'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'white'
                }}
              >
                Contact Enterprise Sales
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
