import { Helmet } from 'react-helmet-async'
import { useLocation } from 'wouter'
import LandingHero from '@/components/landing/LandingHero'
import TrustBar from '@/components/landing/TrustBar'
import ProductShowcase from '@/components/landing/ProductShowcase'
import FAQSection from '@/components/landing/FAQSection'
import { createMetaTags, createProductSchema, createBreadcrumbSchema, createFAQSchema } from '@/lib/seo'

export default function BulkIPadsForBusiness() {
  const [, setLocation] = useLocation()

  const metaTags = createMetaTags(
    'Bulk iPads for Business | Corporate Tablet Solutions | AeroWholesale',
    'Buy bulk iPads for your business. Equip teams, deploy to employees, use in projects. Wholesale pricing, quality guaranteed, fast shipping.',
    {
      keywords: 'bulk iPads for business, corporate tablets, business iPad procurement, wholesale tablets',
      canonical: 'https://aerowholesale.com/bulk-ipads-for-business',
    }
  )

  const breadcrumbs = [
    { name: 'Home', url: 'https://aerowholesale.com' },
    { name: 'Bulk iPads for Business', url: 'https://aerowholesale.com/bulk-ipads-for-business' },
  ]

  const faqs = [
    {
      question: 'How many iPads can I order at once?',
      answer: 'There\'s no minimum or maximum. Order 5 or 5,000 units - we\'ll work with you. Larger orders qualify for better pricing.',
    },
    {
      question: 'Can I get a custom deployment quote?',
      answer: 'Yes. Tell us your department size, use case, and required specs. We\'ll provide a custom quote with business terms.',
    },
    {
      question: 'Do you support corporate IT integration?',
      answer: 'Absolutely. We support MDM deployment, bulk WiFi provisioning, and integration with corporate asset management systems.',
    },
    {
      question: 'What payment options do businesses have?',
      answer: 'We offer PO-based ordering, net-30 and net-60 payment terms, and custom invoicing for approved business accounts.',
    },
    {
      question: 'Do you provide bulk deployment support?',
      answer: 'Yes. For enterprise accounts, we assist with asset tagging, inventory tracking, and deployment planning help.',
    },
    {
      question: 'Is there an account manager for large orders?',
      answer: 'Yes. Accounts ordering 100+ units get a dedicated account manager for support and escalation.',
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
          {JSON.stringify(createProductSchema('Bulk Business iPad', { min: 150, max: 800 }, 'InStock'))}
        </script>
      </Helmet>

      <main>
        <LandingHero
          title="Bulk iPads for Your Business"
          subtitle="Equip your team with iPads at wholesale prices. From small teams to enterprise deployments - we have the volume and pricing you need."
          ctaText="Get a Quote"
          ctaAction={handleApply}
        />

        <TrustBar />

        {/* Use Cases */}
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
                Perfect for Corporate iPad Deployments
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}>
              {[
                {
                  icon: '👔',
                  title: 'Employee Equiping',
                  description: 'Provide iPads to remote teams, field staff, and employees. Cost-effective bulk rollout.',
                },
                {
                  icon: '🏭',
                  title: 'Warehouse & Operations',
                  description: 'Rugged iPad use for inventory, logistics, and operations management.',
                },
                {
                  icon: '🏥',
                  title: 'Healthcare & Services',
                  description: 'Arm medical staff, technicians, and customer service teams with reliable devices.',
                },
                {
                  icon: '🎓',
                  title: 'Training & Onboarding',
                  description: 'Bulk purchase for employee training, onboarding, and certification programs.',
                },
                {
                  icon: '📊',
                  title: 'Data Collection',
                  description: 'Deploy for surveys, forms, and field data collection at scale.',
                },
                {
                  icon: '🛍',
                  title: 'Retail & Hospitality',
                  description: 'POS systems, customer check-in, and service tablets for retail locations.',
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

        {/* Products */}
        <ProductShowcase
          category="Tablets"
          title="Available iPad Models"
          description="All generations currently in stock for bulk corporate orders"
          limit={8}
        />

        {/* Process */}
        <section style={{ padding: '60px 20px', background: '#f8fafc' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#132347',
              marginBottom: '50px',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              Streamlined Corporate Ordering
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
            }}>
              {[
                { step: '1', title: 'Tell Us Your Needs', description: 'Department size, models, and timeline' },
                { step: '2', title: 'Get Custom Quote', description: 'Business pricing and terms provided' },
                { step: '3', title: 'Place Order', description: 'Simple PO and payment process' },
                { step: '4', title: 'We Handle the Rest', description: 'Bulk shipment, setup, and support' },
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
              Ready to Bulk Order iPads?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#cbd5e1',
              marginBottom: '30px',
              lineHeight: '1.6',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              Get a custom quote for your business deployment. No minimum order, all sizes welcome.
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
                Request Business Quote
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
                Talk to a Representative
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
