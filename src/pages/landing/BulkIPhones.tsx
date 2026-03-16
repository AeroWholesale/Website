import { Helmet } from 'react-helmet-async'
import { useLocation } from 'wouter'
import LandingHero from '@/components/landing/LandingHero'
import TrustBar from '@/components/landing/TrustBar'
import ProductShowcase from '@/components/landing/ProductShowcase'
import FAQSection from '@/components/landing/FAQSection'
import { createMetaTags, createProductSchema, createBreadcrumbSchema, createFAQSchema } from '@/lib/seo'

export default function BulkIPhones() {
  const [, setLocation] = useLocation()

  const metaTags = createMetaTags(
    'Bulk iPhones for Business & Resellers | Wholesale Pricing | AeroWholesale',
    'Buy iPhones in bulk at wholesale prices. Perfect for resellers, retailers, and businesses. Refurbished quality, competitive volume pricing, fast shipping.',
    {
      keywords: 'bulk iPhones wholesale, wholesale iPhones business, buy iPhones in bulk, reseller iPhones',
      canonical: 'https://aerowholesale.com/bulk-iphones',
    }
  )

  const breadcrumbs = [
    { name: 'Home', url: 'https://aerowholesale.com' },
    { name: 'Bulk iPhones', url: 'https://aerowholesale.com/bulk-iphones' },
  ]

  const faqs = [
    {
      question: 'Are the iPhones carrier-locked or unlocked?',
      answer: 'We stock both carrier-locked and unlocked iPhones. Unlocked devices are available at a slight premium but work with any carrier. Carrier-locked models include AT&T, Verizon, Sprint, and T-Mobile variants.',
    },
    {
      question: 'What iPhone models do you have in stock?',
      answer: 'We carry recent iPhone models including iPhone 14, 13, 12, 11, and earlier generations. All are refurbished to grade specifications with full functionality.',
    },
    {
      question: 'Can I get a bulk quote for my business?',
      answer: 'Yes, absolutely. Submit your application with your volume needs, and our sales team will provide a custom quote with bulk pricing. We work with orders of any size.',
    },
    {
      question: 'What is the condition grade system?',
      answer: 'We use 8 grade levels from CAP1 (Premium/Like-New) to SD (B-Grade). Each grade reflects cosmetic condition, battery health, and functionality. Check each product for specific grade details.',
    },
    {
      question: 'Do you offer wholesale accounts for resellers?',
      answer: 'Yes. We have dedicated wholesale pricing for resellers and retailers. Apply as a reseller to unlock bulk discounts and flexible payment terms.',
    },
    {
      question: 'What warranty and return policy do you offer?',
      answer: 'All devices include 30-day warranty covering defects and functionality issues. Returns are available within 30 days for unopened/unused items.',
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

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(createBreadcrumbSchema(breadcrumbs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(createFAQSchema(faqs))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(createProductSchema('Refurbished iPhone (Bulk)', { min: 100, max: 500 }, 'InStock'))}
        </script>
      </Helmet>

      <main>
        <LandingHero
          title="Bulk iPhones at Wholesale Prices"
          subtitle="Buy iPhones in bulk for your business or resale. Competitive wholesale pricing, verified quality, multiple carriers available. Perfect for retailers, resellers, and enterprise buyers."
          ctaText="Get Wholesale Pricing"
          ctaAction={handleApply}
        />

        <TrustBar />

        {/* Why iPhone */}
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
                Why Buy Bulk iPhones from AeroWholesale?
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}>
              {[
                {
                  icon: '💼',
                  title: 'For Resellers',
                  description: 'Wholesale pricing that gives you healthy margins. Stock multiple models and grades to maximize profit on every sale.',
                },
                {
                  icon: '🏪',
                  title: 'For Retailers',
                  description: 'Bulk discounts on your favorite models. Mix and match different grades and carriers to match your customer demand.',
                },
                {
                  icon: '🎯',
                  title: 'For Businesses',
                  description: 'Equip your team with quality devices at fraction of retail cost. Flexible terms and dedicated account support.',
                },
                {
                  icon: '📱',
                  title: 'All Models Available',
                  description: 'From iPhone 14 down to earlier generations. Multiple storage options, all carriers, all colors—build the perfect mix.',
                },
                {
                  icon: '🚀',
                  title: 'Quick Turnaround',
                  description: 'Same-day processing and shipping. Get your inventory quickly without waiting weeks for delivery.',
                },
                {
                  icon: '💬',
                  title: 'Expert Support',
                  description: 'Our team understands reseller challenges. We provide specs, photos, and help you find the right inventory mix.',
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
          category="Phones"
          title="Available iPhone Inventory"
          description="Browse our current selection of refurbished iPhones in various models and grades"
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
              Get Wholesale iPhones in 4 Steps
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
              marginBottom: '40px',
            }}>
              {[
                { step: '1', title: 'Create Account', description: 'Tell us you\'re a reseller or business' },
                { step: '2', title: 'Get Approved', description: 'We verify your info (1 business day)' },
                { step: '3', title: 'Browse & Quote', description: 'Find your inventory and build a quote' },
                { step: '4', title: 'Ship & Sell', description: 'We ship fast, you start selling' },
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
              Start Your iPhone Wholesale Business
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#cbd5e1',
              marginBottom: '30px',
              lineHeight: '1.6',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              Get bulk pricing on iPhones and start building your resale business today.
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
                Talk to Sales
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
