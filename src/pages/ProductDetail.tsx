import { useState, useEffect } from 'react'
import { useLocation, useParams } from 'wouter'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .pd-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; min-height: 100vh; -webkit-font-smoothing: antialiased; }

  .pd-header { background: #0c1730; background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 28px 40px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .pd-header-inner { max-width: 1200px; margin: 0 auto; }
  .pd-breadcrumb { font-size: 11px; font-weight: 600; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .pd-breadcrumb span { color: #7b90b2; cursor: pointer; }
  .pd-breadcrumb span:hover { color: #a8c0d8; }
  .pd-title { font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -0.03em; margin-bottom: 4px; }
  .pd-subtitle { font-size: 13px; color: #a8c0d8; font-weight: 500; }

  .pd-body { max-width: 1200px; margin: 0 auto; padding: 28px 40px 60px; }

  .pd-product-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; margin-bottom: 20px; display: flex; gap: 28px; align-items: flex-start; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .pd-product-image { width: 150px; height: 150px; background: #f1f4f8; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid #e2e8f0; }
  .pd-product-image img { max-width: 130px; max-height: 130px; object-fit: contain; }
  .pd-product-image svg { width: 60px; height: 60px; color: #94a3b8; opacity: 0.5; }
  .pd-product-info { flex: 1; }
  .pd-brand { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .pd-name { font-size: 22px; font-weight: 900; color: #132347; letter-spacing: -0.02em; margin-bottom: 12px; }
  .pd-grade-row { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 16px; }
  .pd-grade-pill { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 3px; }
  .pd-gp-green { background: #ecfdf5; color: #047857; }
  .pd-gp-blue { background: #eff6ff; color: #1d4ed8; }
  .pd-gp-purple { background: #f5f3ff; color: #6d28d9; }
  .pd-gp-yellow { background: #fefce8; color: #854d0e; }
  .pd-gp-orange { background: #fff7ed; color: #9a3412; }
  .pd-gp-gray { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }
  .pd-meta-row { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; border-top: 1px solid #e2e8f0; padding-top: 14px; }
  .pd-meta-stat { font-size: 13px; color: #64748b; font-weight: 500; }
  .pd-meta-stat strong { color: #132347; font-weight: 700; }
  .pd-divider { width: 1px; height: 22px; background: #e2e8f0; }
  .pd-price-block { display: flex; align-items: baseline; gap: 4px; }
  .pd-price-from { font-size: 11px; color: #64748b; font-weight: 500; }
  .pd-price-main { font-size: 22px; font-weight: 800; color: #132347; letter-spacing: -0.02em; }
  .pd-price-range { font-size: 13px; color: #94a3b8; font-weight: 400; }
  .pd-login-prompt { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #64748b; cursor: pointer; }

  .pd-filter-bar { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 20px; margin-bottom: 16px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .pd-filter-label { font-size: 11px; font-weight: 800; color: #132347; text-transform: uppercase; letter-spacing: 0.08em; }
  .pd-filter-select { border: 1px solid #e2e8f0; border-radius: 6px; padding: 7px 10px; font-size: 13px; font-weight: 500; color: #334155; background: #f8fafc; font-family: 'DM Sans', sans-serif; cursor: pointer; outline: none; }
  .pd-filter-select:focus { border-color: #132347; }
  .pd-results-count { margin-left: auto; font-size: 12px; color: #94a3b8; font-weight: 500; }

  .pd-variants-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px; }
  .pd-variant-card { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 16px; display: flex; flex-direction: column; gap: 10px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: box-shadow 0.15s, border-color 0.15s; }
  .pd-variant-card:hover { box-shadow: 0 4px 16px rgba(19,35,71,0.1); border-color: #bfdbfe; }
  .pd-variant-top { display: flex; align-items: flex-start; justify-content: space-between; }
  .pd-variant-stock { font-size: 11px; font-weight: 700; color: #15803d; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 8px; border-radius: 4px; }
  .pd-spec-row { display: flex; gap: 6px; flex-wrap: wrap; }
  .pd-spec-tag { font-size: 11px; font-weight: 600; color: #475569; background: #f1f4f8; padding: 2px 7px; border-radius: 3px; border: 1px solid #e2e8f0; }
  .pd-variant-bottom { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid #f1f5f9; padding-top: 10px; margin-top: 2px; }
  .pd-variant-price { font-size: 18px; font-weight: 800; color: #132347; letter-spacing: -0.02em; }
  .pd-variant-lock { font-size: 12px; color: #94a3b8; }
  .pd-add-btn { background: #132347; color: #fff; border: none; border-radius: 6px; padding: 7px 14px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .pd-add-btn:hover { background: #1a2f5e; }
  .pd-add-btn.added { background: #047857; }

  .pd-empty { text-align: center; padding: 48px 20px; color: #94a3b8; font-size: 14px; }

  .pd-cta { background: linear-gradient(135deg, #132347 0%, #08101f 100%); border-radius: 10px; padding: 24px 28px; display: flex; align-items: center; justify-content: space-between; gap: 24px; border-top: 3px solid #c2410c; }
  .pd-cta-text h3 { color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 3px; }
  .pd-cta-text p { color: #4e6480; font-size: 13px; }
  .pd-cta-btn { background: #c2410c; color: #fff; border: none; border-radius: 6px; padding: 11px 24px; font-weight: 700; font-size: 13px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .pd-cta-btn:hover { background: #a33509; }

  .pd-toast { position: fixed; bottom: 28px; right: 28px; background: #132347; color: #fff; font-size: 13px; font-weight: 600; padding: 12px 20px; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.2); display: flex; align-items: center; gap: 8px; z-index: 999; animation: pd-slidein 0.2s ease; }
  @keyframes pd-slidein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 1024px) { .pd-body { padding: 20px; } .pd-variants-grid { grid-template-columns: repeat(2, 1fr); } .pd-header { padding: 20px; } }
  @media (max-width: 640px) { .pd-variants-grid { grid-template-columns: 1fr; } .pd-product-card { flex-direction: column; } .pd-product-image { width: 100%; height: 120px; } }
`

const GRADE_LABELS: Record<string, string> = {
  'CAP1': 'Premium 100%', 'CAP': 'Premium', 'NE': 'New',
  'CA+': 'Excellent', 'CA': 'Good', 'CAB': 'Good (Batt<80%)',
  'SD': 'B-Grade', 'SD-': 'C-Grade', 'SDB': 'B/C (Batt<80%)',
}

const GRADE_COLORS: Record<string, string> = {
  'CAP1': 'green', 'NE': 'green', 'CAP': 'blue',
  'CA+': 'purple', 'CA': 'yellow',
  'CAB': 'orange', 'SD': 'gray', 'SD-': 'gray', 'SDB': 'gray',
}

const GRADE_ORDER = ['CAP1', 'NE', 'CAP', 'CA+', 'CA', 'CAB', 'SD', 'SD-', 'SDB']
const WEARABLE_CATEGORIES = ['Wearables', 'Headphones', 'Accessories']

const IconPhone = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/></svg>
const IconTablet = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="3" y="2" width="18" height="20" rx="2"/><circle cx="12" cy="18" r="0.8" fill="currentColor"/></svg>
const IconLaptop = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M1 18h22" strokeLinecap="round"/></svg>
const IconWatch = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6V3h6v3M9 18v3h6v-3"/></svg>
const IconDevice = ({ category }: { category?: string }) => {
  if (category === 'Tablets') return <IconTablet />
  if (category === 'Laptops') return <IconLaptop />
  if (category === 'Wearables') return <IconWatch />
  return <IconPhone />
}

export default function ProductDetail() {
  const [, navigate] = useLocation()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState('')
  const [addedSkus, setAddedSkus] = useState<Set<string>>(new Set())

  const [filterGrade, setFilterGrade] = useState('all')
  const [filterStorage, setFilterStorage] = useState('all')
  const [filterCarrier, setFilterCarrier] = useState('all')
  const [filterColor, setFilterColor] = useState('all')

  const params = useParams<{ modelCode: string }>()
  const modelCode = decodeURIComponent(params.modelCode || '')
  const dealerToken = localStorage.getItem('aw-token')
  const dealerUser = (() => { try { return JSON.parse(localStorage.getItem('aw-user') || '') } catch { return null } })()

  useEffect(() => {
    if (!modelCode) return
    const headers: Record<string, string> = {}
    if (dealerToken) headers['Authorization'] = `Bearer ${dealerToken}`
    fetch(`/api/catalog-product?modelCode=${encodeURIComponent(modelCode)}`, { headers })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        setProduct(data || null)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [modelCode])

  // Load existing cart to mark already-added items
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('aw-quote-cart') || '[]')
      setAddedSkus(new Set(cart.map((i: any) => i.sku)))
    } catch {}
  }, [])

  const isWearable = product && WEARABLE_CATEGORIES.includes(product.category)
  const carrierLabel = isWearable ? 'Connectivity' : 'Carrier'

  const sortedGrades = (grades: string[]) =>
    [...grades].sort((a, b) => GRADE_ORDER.indexOf(a) - GRADE_ORDER.indexOf(b))

  const filteredSkus = product?.skus?.filter((s: any) => {
    if (filterGrade !== 'all' && s.grade !== filterGrade) return false
    if (filterStorage !== 'all' && s.storage !== filterStorage) return false
    if (filterCarrier !== 'all' && s.carrier !== filterCarrier) return false
    if (filterColor !== 'all' && s.color !== filterColor) return false
    return true
  }) || []

  const grades = sortedGrades([...new Set(product?.skus?.map((s: any) => s.grade).filter(Boolean) || [])] as string[])
  const storages = [...new Set(product?.skus?.map((s: any) => s.storage).filter(Boolean) || [])] as string[]
  const carriers = [...new Set(product?.skus?.map((s: any) => s.carrier).filter(Boolean) || [])] as string[]
  const colors = [...new Set(product?.skus?.map((s: any) => s.color).filter(Boolean) || [])] as string[]

  const addToQuote = (sku: any) => {
    try {
      const cart = JSON.parse(localStorage.getItem('aw-quote-cart') || '[]')
      const existing = cart.findIndex((i: any) => i.sku === sku.sku)
      if (existing >= 0) {
        cart[existing].qty += 1
      } else {
        cart.push({
          sku: sku.sku,
          productName: product.name,
          grade: sku.grade,
          gradeLabel: GRADE_LABELS[sku.grade] || sku.grade,
          storage: sku.storage,
          carrier: sku.carrier,
          color: sku.color,
          price: sku.price,
          qty: 1,
          modelCode: product.modelCode,
          image: product.image,
        })
      }
      localStorage.setItem('aw-quote-cart', JSON.stringify(cart))
      setAddedSkus(prev => new Set([...prev, sku.sku]))
      setToast(`Added to quote`)
      setTimeout(() => setToast(''), 2500)
    } catch {}
  }

  if (loading) return (
    <div className="pd-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ width: 32, height: 32, border: '3px solid #e2e8f0', borderTopColor: '#132347', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (!product) return (
    <div className="pd-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: 12 }}>
      <style>{css}</style>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#132347' }}>Product not found</div>
      <button onClick={() => navigate('/catalog')} style={{ fontSize: 13, color: '#c2410c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>← Back to Catalog</button>
    </div>
  )

  return (
    <div className="pd-page">
      <style>{css}</style>

      {/* DARK HEADER */}
      <div className="pd-header">
        <div className="pd-header-inner">
          <div className="pd-breadcrumb">
            <span onClick={() => navigate('/')}>Home</span>
            <span style={{ color: '#2d4a6e' }}>›</span>
            <span onClick={() => navigate('/catalog')}>Catalog</span>
            <span style={{ color: '#2d4a6e' }}>›</span>
            <span style={{ color: '#a8c0d8', cursor: 'default' }}>{product.name}</span>
          </div>
          <div className="pd-title">{product.name}</div>
          <div className="pd-subtitle">{product.totalStock.toLocaleString()} units in stock · {product.skus.length} variants · Updated from live inventory</div>
        </div>
      </div>

      <div className="pd-body">

        {/* PRODUCT INFO */}
        <div className="pd-product-card">
          <div className="pd-product-image">
            {product.image
              ? <img src={product.image} alt={product.name} />
              : <IconDevice category={product.category} />}
          </div>
          <div className="pd-product-info">
            <div className="pd-brand">{product.brand} · {product.category}</div>
            <div className="pd-name">{product.name}</div>
            <div className="pd-grade-row">
              {sortedGrades(grades).map(g => (
                <span key={g} className={`pd-grade-pill pd-gp-${GRADE_COLORS[g] || 'gray'}`}>
                  {GRADE_LABELS[g] || g}
                </span>
              ))}
            </div>
            <div className="pd-meta-row">
              <div className="pd-meta-stat"><strong>{product.totalStock.toLocaleString()}</strong> units</div>
              <div className="pd-divider" />
              <div className="pd-meta-stat"><strong>{product.skus.length}</strong> variants</div>
              {storages.length > 0 && <><div className="pd-divider" /><div className="pd-meta-stat">{storages.join(' · ')}</div></>}
              {carriers.length > 0 && <><div className="pd-divider" /><div className="pd-meta-stat">{carriers.join(' · ')}</div></>}
              {colors.length > 0 && <><div className="pd-divider" /><div className="pd-meta-stat">{colors.join(' · ')}</div></>}
              <div className="pd-divider" />
              {product.lowestPrice && dealerUser ? (
                <div className="pd-price-block">
                  <span className="pd-price-from">From&nbsp;</span>
                  <span className="pd-price-main">${product.lowestPrice.toFixed(2)}</span>
                  {product.highestPrice && product.highestPrice !== product.lowestPrice &&
                    <span className="pd-price-range">&nbsp;– ${product.highestPrice.toFixed(2)}</span>}
                </div>
              ) : !dealerUser ? (
                <div className="pd-login-prompt" onClick={() => navigate('/login')}>
                  🔒 <span>Login for pricing</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="pd-filter-bar">
          <span className="pd-filter-label">Filter</span>
          {grades.length > 1 && (
            <select className="pd-filter-select" value={filterGrade} onChange={e => setFilterGrade(e.target.value)}>
              <option value="all">All Grades</option>
              {grades.map(g => <option key={g} value={g}>{GRADE_LABELS[g] || g}</option>)}
            </select>
          )}
          {storages.length > 1 && (
            <select className="pd-filter-select" value={filterStorage} onChange={e => setFilterStorage(e.target.value)}>
              <option value="all">All Sizes</option>
              {storages.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          )}
          {carriers.length > 1 && (
            <select className="pd-filter-select" value={filterCarrier} onChange={e => setFilterCarrier(e.target.value)}>
              <option value="all">All {carrierLabel}</option>
              {carriers.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          {colors.length > 1 && (
            <select className="pd-filter-select" value={filterColor} onChange={e => setFilterColor(e.target.value)}>
              <option value="all">All Colors</option>
              {colors.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}
          <span className="pd-results-count">{filteredSkus.length} variant{filteredSkus.length !== 1 ? 's' : ''}</span>
        </div>

        {/* VARIANT CARDS */}
        {filteredSkus.length === 0 ? (
          <div className="pd-empty">No variants match your filters</div>
        ) : (
          <div className="pd-variants-grid">
            {filteredSkus.map((sku: any) => (
              <div key={sku.sku} className="pd-variant-card">
                <div className="pd-variant-top">
                  <span className={`pd-grade-pill pd-gp-${GRADE_COLORS[sku.grade] || 'gray'}`}>
                    {GRADE_LABELS[sku.grade] || sku.grade || '—'}
                  </span>
                  <span className="pd-variant-stock">{(sku.available ?? sku.quantity ?? 0).toLocaleString()} in stock</span>
                </div>
                <div className="pd-spec-row">
                  {sku.storage && <span className="pd-spec-tag">{sku.storage}</span>}
                  {sku.carrier && <span className="pd-spec-tag">{sku.carrier}</span>}
                  {sku.color && <span className="pd-spec-tag">{sku.color}</span>}
                </div>
                <div className="pd-variant-bottom">
                  {sku.price && dealerUser ? (
                    <span className="pd-variant-price">${sku.price.toFixed(2)}</span>
                  ) : (
                    <span className="pd-variant-lock">🔒 Login for price</span>
                  )}
                  {dealerUser ? (
                    <button
                      className={`pd-add-btn${addedSkus.has(sku.sku) ? ' added' : ''}`}
                      onClick={() => addToQuote(sku)}
                    >
                      {addedSkus.has(sku.sku) ? '✓ Added' : '+ Add to Quote'}
                    </button>
                  ) : (
                    <button className="pd-add-btn" onClick={() => navigate('/login')}>Login to Order</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="pd-cta">
          <div className="pd-cta-text">
            <h3>Interested in {product.name}?</h3>
            <p>Request a quote or contact us for bulk pricing.</p>
          </div>
          <button className="pd-cta-btn" onClick={() => navigate('/contact')}>Request a Quote</button>
        </div>
      </div>

      {toast && (
        <div className="pd-toast">
          <span>✓</span> {toast}
        </div>
      )}
    </div>
  )
}