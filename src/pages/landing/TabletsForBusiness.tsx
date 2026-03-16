import { Helmet } from 'react-helmet-async'
import { useLocation } from 'wouter'
import LandingHero from '@/components/landing/LandingHero'
import TrustBar from '@/components/landing/TrustBar'
import ProductShowcase from '@/components/landing/ProductShowcase'
import FAQSection from '@/components/landing/FAQSection'
import { createMetaTags, createProductSchema, createBreadcrumbSchema, createFAQSchema } from '@/lib/seo'

export default function TabletsForBusiness() {
  const [, setLocation] = useLocation()

  const metaTags = createMetaTags(
    'Wholesale Tablets for Businesses | Bulk B2B Pricing | AeroWholesale',
    'Buy refurbished tablets in bulk for your business. Tablets for employees, resale, or projects. Wholesale pricing, quality guaranteed, fast delivery.',
    {
      keywords: 'bulk tablets for business, wholesale tablets, corporate tablets, refurbished tablets business',
      canonical: 'https://aerowholesale.com/tablets-for-business',
    }
  )

  const breadcrumbs = [
    { name: 'Home', url: 'https://aerowholesale.com' },
    { name: 'Tablets for Business', url: 'https://aerowholesale.com/tablets-for-business' },
  ]

  const faqs = [
    {
      question: 'Which tablet models do you offer?',
      answer: 'We stock iPad (all generations), Samsung Galaxy Tabs, Microsoft Surface Go, and other popular business tablets. Check our inventory for current availability.',
    },
    {
      question: 'Can tablets be used for enterprise deployments?',
      answer: 'Yes. We provide bulk quantities suitable for enterprise deployments, with support for custom configurations and enterprise agreements.',
    },
    {
      question: 'What happens if a tablet fails after purchase?',
      answer: 'All devices come with 30-day warranty. Any defects or functionality issues are covered. We also have extended warranty options available.',
    },
    {
      question: 'Do you offer IT asset management support?',
      answer: 'Yes. For enterprise buyers, we can assist with asset tagging, inventory tracking, and lifecycle management of your tablet fleet.',
    },
    {
      question: 'What are the payment terms for large orders?',
      answer: 'We offer flexible terms for approved accounts. Net-30, Net-60, and custom payment schedules available for bulk orders.',
    },
    {
      question: 'Can you provide custom specs per tablet?',
      answer: 'Yes. We work with procurement teams to specify exact models, storage, connectivity, and protection requirements for your deployment.',
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
          {JSON.stringify(createProductSchema('Bulk Business Tablets', { min: 120, max: 900 }, 'InStock'))}
        </script>
      </Helmet>

      <main>
        <LandingHero
          title="Wholesale Tablets for Business"
          subtitle="Equip your team with quality refurbished tablets. Bulk pricing perfect for IT departments, training programs, and resale. Multiple brands, affordable pricing."
          ctaText="Request Quote"
          ctaAction={handleApply}
        />

        <TrustBar />

        {/* Benefits */}
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
                Business-Grade Tablets, Wholesale Prices
              </h2>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
            }}>
              {[
                {
                  icon: '🏢',
                  title: 'Enterprise Ready',
                  description: 'Bulk quantities for IT departments and employee programs. Suitable for deployments of any size.',
                },
                {
                  icon: '📚',
                  title: 'Education & Training',
                  description: 'Perfect for schools, universities, and training programs. Volume discounts for educational institutions.',
                },
                {
                  icon: '💾',
                  title: 'Multiple Specifications',
                  description: 'Choose storage, RAM, and connectivity options. Build the perfect mix for your needs.',
                },
                {
                  icon: '🔒',
                  title: 'Security Ready',
                  description: 'HIPAA, PCI, FERPA compliant models available. MDM support for enterprise management.',
                },
                {
                  icon: '💸',
                  title: '30-70% Savings',
                  description: 'Refurbished tablets at fraction of retail cost while maintaining quality guarantees.',
                },
                {
                  icon: '📋',
                  title: 'Easy Procurement',
                  description: 'Work with corporate procurement teams. Invoicing, POs, and payment terms available.',
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
          title="Available Business Tablets"
          description="Browse our selection of refurbished tablets suitable for business deployment"
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
              Simple Procurement Process
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px',
            }}>
              {[
                { step: '1', title: 'Submit Details', description: 'Tell us your tablet needs and quantities' },
                { step: '2', title: 'Get Custom Quote', description: 'We provide pricing for your exact specs' },
                { step: '3', title: 'Approve & Order', description: 'Simple PO and payment process' },
                { step: '4', title: 'Bulk Delivery', description: 'Fast inventory delivery to your location' },
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
              Ready to Equip Your Team?
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#cbd5e1',
              marginBottom: '30px',
              lineHeight: '1.6',
              fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
            }}>
              Get a custom quote for bulk tablets and start saving on your IT budget.
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
                Request Bulk Quote
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
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
