import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'

interface Product {
  modelCode: string
  name: string
  brand: string
  category: string
  totalStock: number
  grades: string[]
  storages: string[]
  image: string
  lowestPrice: number
  highestPrice: number
}

interface ProductShowcaseProps {
  category: string
  title?: string
  description?: string
  limit?: number
}

export default function ProductShowcase({
  category,
  title = 'Featured Products',
  description = 'Explore our selection of premium refurbished devices',
  limit = 8,
}: ProductShowcaseProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [, setLocation] = useLocation()

  useEffect(() => {
    fetch(`/api/catalog-public?category=${encodeURIComponent(category)}&size=${limit}`)
      .then(res => res.json())
      .then(data => {
        if (data.products) {
          setProducts(data.products.slice(0, limit))
        }
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [category, limit])

  if (loading) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', background: '#f8fafc' }}>
        <p style={{ color: '#94a3b8' }}>Loading products...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '60px 20px', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#132347',
            marginBottom: '12px',
            fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
          }}>
            {title}
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#64748b',
            fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
          }}>
            {description}
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            padding: '16px',
            borderRadius: '8px',
            marginBottom: '30px',
          }}>
            <p>Unable to load products. Please try again later.</p>
          </div>
        )}

        {products.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px',
          }}>
            {products.map(product => (
              <div
                key={product.modelCode}
                style={{
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                }}
                onClick={() => setLocation(`/catalog/${product.modelCode}`)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {/* Product Image */}
                <div style={{
                  background: '#f1f5f9',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  ) : (
                    <div style={{ color: '#cbd5e1', fontSize: '14px' }}>No image</div>
                  )}
                </div>

                {/* Product Info */}
                <div style={{ padding: '16px' }}>
                  <div style={{ marginBottom: '8px' }}>
                    <p style={{
                      fontSize: '12px',
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      letterSpacing: '0.05em',
                      marginBottom: '4px',
                    }}>
                      {product.brand}
                    </p>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#132347',
                      marginBottom: '8px',
                      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
                      lineHeight: '1.4',
                    }}>
                      {product.name}
                    </h3>
                  </div>

                  {/* Stock Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '12px',
                  }}>
                    <div style={{
                      width: '8px',
                      height: '8px',
                      background: product.totalStock > 50 ? '#16a34a' : product.totalStock > 10 ? '#eab308' : '#dc2626',
                      borderRadius: '50%',
                    }} />
                    <span style={{
                      fontSize: '13px',
                      color: '#475569',
                      fontWeight: '500',
                    }}>
                      {product.totalStock} in stock
                    </span>
                  </div>

                  {/* Grades */}
                  {product.grades.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        marginBottom: '6px',
                      }}>
                        Available Grades
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {product.grades.slice(0, 3).map(grade => (
                          <span key={grade} style={{
                            background: '#f1f5f9',
                            color: '#64748b',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '11px',
                            fontWeight: '600',
                          }}>
                            {grade}
                          </span>
                        ))}
                        {product.grades.length > 3 && (
                          <span style={{
                            color: '#94a3b8',
                            fontSize: '11px',
                            fontWeight: '600',
                          }}>
                            +{product.grades.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Price Range */}
                  <div style={{
                    background: '#f8fafc',
                    padding: '12px',
                    borderRadius: '8px',
                    borderTop: '1px solid #e2e8f0',
                    paddingTop: '12px',
                  }}>
                    <p style={{
                      fontSize: '11px',
                      color: '#94a3b8',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                      marginBottom: '4px',
                    }}>
                      Price Range
                    </p>
                    <p style={{
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#c2410c',
                      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
                    }}>
                      ${product.lowestPrice.toFixed(0)} - ${product.highestPrice.toFixed(0)}
                    </p>
                    <p style={{
                      fontSize: '11px',
                      color: '#94a3b8',
                      marginTop: '4px',
                    }}>
                      *Login for exact pricing
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
          }}>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>
              No products found in this category at the moment.
            </p>
            <a
              href="/catalog"
              style={{
                color: '#c2410c',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              Browse all products →
            </a>
          </div>
        )}

        {products.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a
              href="/catalog"
              style={{
                display: 'inline-block',
                background: '#132347',
                color: 'white',
                padding: '14px 32px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#1a3a5f')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#132347')}
            >
              View Full Inventory →
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
