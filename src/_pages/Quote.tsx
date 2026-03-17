import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .qc-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; min-height: 100vh; -webkit-font-smoothing: antialiased; }

  /* HEADER */
  .qc-header { background: #0c1730; background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 28px 40px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .qc-header-inner { max-width: 1000px; margin: 0 auto; }
  .qc-breadcrumb { font-size: 11px; font-weight: 600; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .qc-breadcrumb span { color: #7b90b2; cursor: pointer; }
  .qc-breadcrumb span:hover { color: #a8c0d8; }
  .qc-breadcrumb-sep { color: #2d4a6e; }
  .qc-header-row { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
  .qc-title { font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -0.03em; }
  .qc-subtitle { font-size: 13px; color: #a8c0d8; font-weight: 500; margin-top: 3px; }
  .qc-header-actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
  .qc-btn-ghost { background: transparent; border: 1.5px solid rgba(255,255,255,0.12); color: #a8c0d8; padding: 8px 16px; border-radius: 7px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .qc-btn-ghost:hover { border-color: rgba(255,255,255,0.25); color: #fff; }
  .qc-btn-danger { background: transparent; border: 1.5px solid rgba(239,68,68,0.35); color: #ef4444; padding: 8px 16px; border-radius: 7px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .qc-btn-danger:hover { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.6); }

  /* BODY */
  .qc-body { max-width: 1000px; margin: 0 auto; padding: 28px 40px 60px; }

  /* EMPTY */
  .qc-empty { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 64px 32px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .qc-empty-icon { font-size: 44px; margin-bottom: 16px; }
  .qc-empty-title { font-size: 18px; font-weight: 800; color: #132347; margin-bottom: 6px; }
  .qc-empty-sub { font-size: 14px; color: #64748b; margin-bottom: 24px; }
  .qc-btn-primary { background: #132347; color: #fff; border: none; border-radius: 8px; padding: 11px 24px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .qc-btn-primary:hover { background: #1a2f5e; }
  .qc-btn-orange { background: #c2410c; color: #fff; border: none; border-radius: 8px; padding: 11px 24px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .qc-btn-orange:hover { background: #a33509; }
  .qc-btn-orange:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ITEMS */
  .qc-items { margin-bottom: 24px; }
  .qc-item { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 16px 20px; margin-bottom: 10px; display: flex; align-items: center; gap: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: border-color 0.12s; }
  .qc-item:hover { border-color: #bfdbfe; }
  .qc-item-image { width: 52px; height: 52px; background: #f1f4f8; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid #e2e8f0; overflow: hidden; }
  .qc-item-image img { max-width: 44px; max-height: 44px; object-fit: contain; }
  .qc-item-image-ph { font-size: 22px; }
  .qc-item-info { flex: 1; min-width: 0; }
  .qc-item-name { font-size: 14px; font-weight: 700; color: #132347; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .qc-item-specs { display: flex; gap: 5px; flex-wrap: wrap; }
  .qc-spec-tag { font-size: 11px; font-weight: 600; color: #475569; background: #f1f4f8; padding: 2px 7px; border-radius: 3px; border: 1px solid #e2e8f0; }
  .qc-grade-tag { font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 3px; }
  .qc-gt-blue { background: #eff6ff; color: #1d4ed8; }
  .qc-gt-green { background: #ecfdf5; color: #047857; }
  .qc-gt-purple { background: #f5f3ff; color: #6d28d9; }
  .qc-gt-yellow { background: #fefce8; color: #854d0e; }
  .qc-gt-orange { background: #fff7ed; color: #9a3412; }
  .qc-gt-gray { background: #f8fafc; color: #475569; border: 1px solid #e2e8f0; }

  .qc-item-price { font-size: 17px; font-weight: 800; color: #132347; flex-shrink: 0; width: 90px; text-align: right; }
  .qc-item-qty { display: flex; align-items: center; gap: 0; flex-shrink: 0; border: 1.5px solid #e2e8f0; border-radius: 7px; overflow: hidden; }
  .qc-qty-btn { width: 30px; height: 30px; background: #f8fafc; border: none; color: #132347; font-size: 16px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.1s; flex-shrink: 0; }
  .qc-qty-btn:hover { background: #e2e8f0; }
  .qc-qty-val { width: 36px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #132347; border-left: 1.5px solid #e2e8f0; border-right: 1.5px solid #e2e8f0; }
  .qc-item-subtotal { font-size: 14px; font-weight: 800; color: #132347; flex-shrink: 0; width: 82px; text-align: right; }
  .qc-item-remove { color: #94a3b8; background: none; border: none; cursor: pointer; font-size: 16px; padding: 4px; border-radius: 4px; transition: color 0.12s; flex-shrink: 0; }
  .qc-item-remove:hover { color: #ef4444; }

  /* SUMMARY + FORM */
  .qc-bottom { display: grid; grid-template-columns: 1fr 360px; gap: 20px; align-items: start; }
  .qc-form-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .qc-form-title { font-size: 15px; font-weight: 800; color: #132347; margin-bottom: 16px; }
  .qc-field { margin-bottom: 14px; }
  .qc-label { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.07em; display: block; margin-bottom: 5px; }
  .qc-input { width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 7px; font-size: 13px; font-weight: 500; color: #132347; font-family: 'DM Sans', sans-serif; outline: none; box-sizing: border-box; transition: border-color 0.12s; background: #fafbfc; }
  .qc-input:focus { border-color: #132347; background: #fff; }
  .qc-textarea { width: 100%; padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 7px; font-size: 13px; font-weight: 500; color: #132347; font-family: 'DM Sans', sans-serif; outline: none; box-sizing: border-box; resize: vertical; min-height: 80px; transition: border-color 0.12s; background: #fafbfc; }
  .qc-textarea:focus { border-color: #132347; background: #fff; }
  .qc-submit-btn { width: 100%; background: #c2410c; color: #fff; border: none; border-radius: 8px; padding: 13px; font-size: 14px; font-weight: 800; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; margin-top: 4px; letter-spacing: -0.01em; }
  .qc-submit-btn:hover { background: #a33509; }
  .qc-submit-btn:disabled { opacity: 0.55; cursor: not-allowed; }

  /* SUMMARY CARD */
  .qc-summary-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .qc-summary-title { font-size: 15px; font-weight: 800; color: #132347; margin-bottom: 16px; }
  .qc-summary-row { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: #64748b; margin-bottom: 10px; }
  .qc-summary-row-bold { display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 800; color: #132347; padding-top: 12px; border-top: 1.5px solid #e2e8f0; margin-top: 4px; }
  .qc-summary-val { font-weight: 600; color: #132347; }

  /* SUCCESS */
  .qc-success { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 64px 32px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .qc-success-icon { font-size: 52px; margin-bottom: 16px; }
  .qc-success-title { font-size: 22px; font-weight: 900; color: #132347; letter-spacing: -0.02em; margin-bottom: 8px; }
  .qc-success-sub { font-size: 14px; color: #64748b; margin-bottom: 6px; max-width: 420px; margin-left: auto; margin-right: auto; line-height: 1.6; }
  .qc-success-ref { font-size: 12px; font-weight: 700; color: #94a3b8; margin-bottom: 28px; font-family: monospace; }
  .qc-success-actions { display: flex; gap: 10px; justify-content: center; }

  @media (max-width: 768px) {
    .qc-header { padding: 20px; }
    .qc-body { padding: 16px 16px 48px; }
    .qc-bottom { grid-template-columns: 1fr; }
    .qc-header-row { flex-direction: column; align-items: flex-start; }
    .qc-item { flex-wrap: wrap; }
    .qc-item-price { display: none; }
  }
`

const GRADE_COLORS: Record<string, string> = {
  'CAP1': 'green', 'NE': 'green', 'CAP': 'blue',
  'CA+': 'purple', 'CA': 'yellow',
  'CAB': 'orange', 'SD': 'gray', 'SD-': 'gray', 'SDB': 'gray',
}

type CartItem = {
  sku: string
  productName: string
  grade: string
  gradeLabel: string
  storage: string
  carrier: string
  color: string
  price: number
  qty: number
  modelCode: string
  image?: string
}

export default function Quote() {
  const navigate = useNavigate()
  const [cart, setCart] = useState<CartItem[]>([])
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [refNumber, setRefNumber] = useState('')
  const dealerUser = (() => { try { return JSON.parse(localStorage.getItem('aw-user') || '') } catch { return null } })()
  const dealerToken = localStorage.getItem('aw-token')

  const [companyName, setCompanyName] = useState(dealerUser?.companyName || '')
  const [contactName, setContactName] = useState(dealerUser ? `${dealerUser.firstName || ''} ${dealerUser.lastName || ''}`.trim() : '')
  const [email, setEmail] = useState(dealerUser?.email || '')

  useEffect(() => {
    try {
      const raw = localStorage.getItem('aw-quote-cart')
      setCart(raw ? JSON.parse(raw) : [])
    } catch { setCart([]) }
  }, [])

  const saveCart = (updated: CartItem[]) => {
    setCart(updated)
    localStorage.setItem('aw-quote-cart', JSON.stringify(updated))
  }

  const updateQty = (sku: string, delta: number) => {
    const updated = cart.map(item => {
      if (item.sku !== sku) return item
      const newQty = Math.max(1, item.qty + delta)
      return { ...item, qty: newQty }
    })
    saveCart(updated)
  }

  const removeItem = (sku: string) => {
    saveCart(cart.filter(i => i.sku !== sku))
  }

  const clearCart = () => {
    saveCart([])
  }

  const totalUnits = cart.reduce((s, i) => s + i.qty, 0)
  const totalValue = cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0)

  const handleSubmit = async () => {
    if (!cart.length) return
    setSubmitting(true)
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' }
      if (dealerToken) headers['Authorization'] = `Bearer ${dealerToken}`

      const res = await fetch('/api/submit-quote', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          items: cart,
          notes,
          dealerEmail: email,
          dealerName: contactName,
          companyName,
        }),
      })

      const data = await res.json()
      if (res.ok && data.refNumber) {
        setRefNumber(data.refNumber)
        setSubmitted(true)
        localStorage.removeItem('aw-quote-cart')

        // 🔥 GA4 conversion event
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'quote_submitted', {
            value: totalValue,
            currency: 'USD',
            items: totalUnits,
            company: companyName,
          })
        }

      } else {
        alert(data.error || 'Failed to submit quote. Please try again.')
      }
    } catch (err) {
      alert('Submit failed: ' + String(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="qc-page">
      <style>{css}</style>

      {/* HEADER */}
      <div className="qc-header">
        <div className="qc-header-inner">
          <div className="qc-breadcrumb">
            <span onClick={() => navigate('/')}>Home</span>
            <span className="qc-breadcrumb-sep">›</span>
            <span onClick={() => navigate('/catalog')}>Catalog</span>
            <span className="qc-breadcrumb-sep">›</span>
            <span style={{ color: '#a8c0d8', cursor: 'default' }}>Quote Cart</span>
          </div>
          <div className="qc-header-row">
            <div>
              <div className="qc-title">Quote Cart</div>
              <div className="qc-subtitle">
                {submitted
                  ? 'Quote submitted successfully'
                  : cart.length === 0
                  ? 'Your cart is empty'
                  : `${cart.length} line${cart.length !== 1 ? 's' : ''} · ${totalUnits} unit${totalUnits !== 1 ? 's' : ''}`}
              </div>
            </div>
            {!submitted && cart.length > 0 && (
              <div className="qc-header-actions">
                <button className="qc-btn-ghost" onClick={() => navigate('/catalog')}>← Continue Browsing</button>
                <button className="qc-btn-danger" onClick={clearCart}>Clear Cart</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="qc-body">

        {/* SUCCESS STATE */}
        {submitted ? (
          <div className="qc-success">
            <div className="qc-success-icon">✅</div>
            <div className="qc-success-title">Quote Request Received</div>
            <div className="qc-success-sub">
              We've received your quote request and will follow up with pricing confirmation and availability within 1 business day.
            </div>
            <div className="qc-success-ref">Ref: {refNumber}</div>
            <div className="qc-success-actions">
              <button className="qc-btn-primary" onClick={() => navigate('/catalog')}>Browse More Products</button>
              <button className="qc-btn-ghost" style={{ background: '#fff', border: '1.5px solid #e2e8f0', color: '#132347', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }} onClick={() => navigate('/portal')}>View My Quotes</button>
            </div>
          </div>
        ) : cart.length === 0 ? (

          /* EMPTY STATE */
          <div className="qc-empty">
            <div className="qc-empty-icon">🛒</div>
            <div className="qc-empty-title">Your cart is empty</div>
            <div className="qc-empty-sub">Browse the catalog and click "Add to Quote" on any variant to get started.</div>
            <button className="qc-btn-primary" onClick={() => navigate('/catalog')}>Browse Catalog</button>
          </div>

        ) : (
          <>
            {/* LINE ITEMS */}
            <div className="qc-items">
              {cart.map(item => {
                const colorClass = `qc-gt-${GRADE_COLORS[item.grade] || 'gray'}`
                const lineTotal = (item.price || 0) * item.qty
                return (
                  <div key={item.sku} className="qc-item">
                    <div className="qc-item-image">
                      {item.image
                        ? <img src={item.image} alt={item.productName} />
                        : <span className="qc-item-image-ph">📱</span>}
                    </div>
                    <div className="qc-item-info">
                      <div className="qc-item-name">{item.productName}</div>
                      <div className="qc-item-specs">
                        <span className={`qc-grade-tag ${colorClass}`}>{item.gradeLabel || item.grade}</span>
                        {item.storage && <span className="qc-spec-tag">{item.storage}</span>}
                        {item.carrier && <span className="qc-spec-tag">{item.carrier}</span>}
                        {item.color && <span className="qc-spec-tag">{item.color}</span>}
                      </div>
                    </div>
                    <div className="qc-item-price">
                      {item.price ? `$${item.price.toFixed(2)}` : <span style={{ fontSize: 12, color: '#94a3b8' }}>TBD</span>}
                    </div>
                    <div className="qc-item-qty">
                      <button className="qc-qty-btn" onClick={() => updateQty(item.sku, -1)}>−</button>
                      <div className="qc-qty-val">{item.qty}</div>
                      <button className="qc-qty-btn" onClick={() => updateQty(item.sku, 1)}>+</button>
                    </div>
                    <div className="qc-item-subtotal">
                      {item.price ? `$${lineTotal.toFixed(2)}` : '—'}
                    </div>
                    <button className="qc-item-remove" onClick={() => removeItem(item.sku)} title="Remove">✕</button>
                  </div>
                )
              })}
            </div>

            {/* BOTTOM: SUMMARY + FORM */}
            <div className="qc-bottom">

              {/* REQUEST FORM */}
              <div className="qc-form-card">
                <div className="qc-form-title">Quote Details</div>
                <div className="qc-field">
                  <label className="qc-label">Company</label>
                  <input className="qc-input" value={companyName} readOnly style={{ background: '#f1f4f8', color: '#475569', cursor: 'default' }} />
                </div>
                <div className="qc-field">
                  <label className="qc-label">Contact Name</label>
                  <input className="qc-input" value={contactName} readOnly style={{ background: '#f1f4f8', color: '#475569', cursor: 'default' }} />
                </div>
                <div className="qc-field">
                  <label className="qc-label">Email</label>
                  <input className="qc-input" value={email} readOnly style={{ background: '#f1f4f8', color: '#475569', cursor: 'default' }} />
                </div>
                <div className="qc-field">
                  <label className="qc-label">Notes / Special Requirements</label>
                  <textarea
                    className="qc-textarea"
                    placeholder="e.g. Need all units within 5 days, prefer bulk discount on 50+ units, specific carrier or color requirements..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                  />
                </div>
                <button
                  className="qc-submit-btn"
                  onClick={handleSubmit}
                  disabled={submitting || cart.length === 0}
                >
                  {submitting ? 'Submitting...' : `Submit Quote Request (${totalUnits} unit${totalUnits !== 1 ? 's' : ''})`}
                </button>
              </div>

              {/* ORDER SUMMARY */}
              <div className="qc-summary-card">
                <div className="qc-summary-title">Order Summary</div>
                {cart.map(item => (
                  <div key={item.sku} className="qc-summary-row">
                    <span style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.productName} <span style={{ color: '#94a3b8', fontSize: 11 }}>×{item.qty}</span>
                    </span>
                    <span className="qc-summary-val">
                      {item.price ? `$${(item.price * item.qty).toFixed(2)}` : '—'}
                    </span>
                  </div>
                ))}
                <div className="qc-summary-row" style={{ marginTop: 12 }}>
                  <span>Total Units</span>
                  <span className="qc-summary-val">{totalUnits}</span>
                </div>
                <div className="qc-summary-row-bold">
                  <span>Estimated Total</span>
                  <span style={{ color: '#c2410c' }}>
                    {totalValue > 0 ? `$${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'TBD'}
                  </span>
                </div>
                <div style={{ marginTop: 14, padding: '10px 12px', background: '#f8fafc', borderRadius: 7, border: '1px solid #e2e8f0', fontSize: 11, color: '#64748b', lineHeight: 1.6 }}>
                  Final pricing subject to availability at time of fulfillment. Our team will confirm within 1 business day.
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  )
}