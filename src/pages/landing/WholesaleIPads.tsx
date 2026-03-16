import { Helmet } from 'react-helmet-async'
import { useLocation } from 'wouter'
import LandingHero from '@/components/landing/LandingHero'
import TrustBar from '@/components/landing/TrustBar'
import ProductShowcase from '@/components/landing/ProductShowcase'
import FAQSection from '@/components/landing/FAQSection'
import { createMetaTags, createProductSchema, createBreadcrumbSchema, createFAQSchema } from '@/lib/seo'

export default function WholesaleIPads() {
  const [, setLocation] = useLocation()

  const metaTags = createMetaTags(
    'Wholesale iPads for Business | Bulk Pricing | AeroWholesale',
    'Buy refurbished iPads in bulk at wholesale prices. For enterprises, retailers, and resellers. Fast shipping, verified quality, competitive pricing.',
    {
      keywords: 'wholesale iPads, bulk iPad pricing, business tablets, refurbished iPad business, buy iPads in bulk',
      canonical: 'https://aerowholesale.com/wholesale-ipads',
    }
  )

  const breadcrumbs = [
    { name: 'Home', url: 'https://aerowholesale.com' },
    { name: 'Wholesale iPads', url: 'https://aerowholesale.com/wholesale-ipads' },
  ]

  const faqs = [
    {
      question: 'What grades of iPads are available?',
      answer: 'We offer iPads in multiple condition grades from CAP1 (Premium, Like-New) to SD (B-Grade). Each grade comes with detailed photos and specs. Pricing varies by grade and storage capacity.',
    },
    {
      question: 'What are your minimum order quantities?',
      answer: 'We work with buyers at any volume. Whether you\'re ordering 10 units or 1,000+, we have competitive wholesale pricing. Larger orders qualify for additional volume discounts.',
    },
    {
      question: 'Do you offer volume discounts?',
      answer: 'Yes. Volume pricing tiers are available for orders of 50, 100, 250, 500, and 1,000+ units. Contact our sales team for specific quotes on your order size.',
    },
    {
      question: 'What warranty do you provide?',
      answer: 'All devices come with a 30-day warranty covering defects and functionality. Quality assurance is verified before shipment.',
    },
    {
      question: 'How quickly can you ship?',
      answer: 'Most orders ship same-day or next-day. Larger bulk orders may take 2-3 business days to prepare and ship.',
    },
    {
      question: 'Do you work with enterprise buyers?',
      answer: 'Absolutely. We have dedicated support for enterprise accounts, including custom volume programs, extended warranties, and invoicing options.',
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
        <meta name="twitter:title" content={metaTags.ogTitle} />
        <meta name="twitter:description" content={metaTags.ogDescription} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(createBreadcrumbSchema(breadcrumbs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(createFAQSchema(faqs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(createProductSchema('Refurbished iPad (Bulk)', { min: 150, max: 800 }, 'InStock'))}
        </script>
      </Helmet>

      <main>
        <LandingHero
          title="Wholesale iPads for Business"
          subtitle="Buy refurbished iPads in bulk at competitive wholesale prices. Perfect for enterprises, retailers, and resellers looking for volume discounts and reliable inventory."
          ctaText="Get Started"
          ctaAction={handleApply}
        />

        <TrustBar />

        {/* Why iPad Rest for Businesses */}
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
                Why Buy Wholesale iPads from AeroWholesale?
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}>
              {[
                {
                  icon: '💰',
                  title: 'Unbeatable Pricing',
                  description: 'Volume discounts on bulk orders. Buy more, save more. Pricing transparently based on quantity and condition grade.',
                },
                {
                  icon: '✓',
                  title: 'Verified Quality',
                  description: 'Every iPad is thoroughly tested and inspected. Full device diagnostics, screen check, battery health, and functionality verification.',
                },
                {
                  icon: '⚡',
                  title: 'Fast Shipping',
                  description: 'Same-day or next-day shipping on most orders. Multiple carriers available, tracking provided for all shipments.',
                },
                {
                  icon: '🔄',
                  title: 'Flexible Terms',
                  description: 'Work with your business model. Custom invoicing, net-30 payment terms available for approved accounts.',
                },
                {
                  icon: '📞',
                  title: 'Dedicated Support',
                  description: 'Direct access to our sales team. Account managers for enterprise accounts, responsive to bulk inquiries.',
                },
                {
                  icon: '🌐',
                  title: 'Multiple Models',
                  description: 'All iPad generations in stock. Select from iPad Air, iPad Pro, iPad Mini, and standard iPad models.',
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

        {/* Featured Products */}
        <ProductShowcase
          category="Tablets"
          title="Available iPad Inventory"
          description="Browse our current selection of refurbished iPads available for bulk purchase"
          limit={8}
        />

        {/* How It Works Section */}
        <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#132347',
              marginBottom: '50px',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              How the Buying Process Works
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginBottom: '40px',
            }}>
              {[
                { step: '1', title: 'Submit Application', description: 'Sign up and tell us about your business and volume needs' },
                { step: '2', title: 'Get Approved', description: 'We verify your information (usually within 1 business day)' },
                { step: '3', title: 'Build Your Quote', description: 'Browse inventory and create a custom quote for your exact needs' },
                { step: '4', title: 'Checkout & Ship', description: 'Secure payment and fast shipping to your location' },
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

        {/* FAQ Section */}
        <FAQSection faqs={faqs} />

        {/* Final CTA */}
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
              Ready to Buy Wholesale iPads?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#cbd5e1',
              marginBottom: '30px',
              lineHeight: '1.6',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              Get started in minutes. Apply for wholesale access and start browsing our full inventory of refurbished iPads.
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
                Apply for Wholesale Access
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
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
