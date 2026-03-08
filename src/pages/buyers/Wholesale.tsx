import { useLocation } from 'wouter'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .ws-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #0f172a; -webkit-font-smoothing: antialiased; }

  /* HERO */
  .ws-hero { background: #0c1730; background-image: radial-gradient(ellipse 60% 80% at 100% 40%, rgba(194,65,12,0.1) 0%, transparent 60%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 80px 40px 72px; position: relative; overflow: hidden; }
  .ws-hero::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 80px); pointer-events: none; }
  .ws-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 1; }
  .ws-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(194,65,12,0.15); border: 1px solid rgba(194,65,12,0.3); border-radius: 20px; padding: 5px 14px; font-size: 11px; font-weight: 700; color: #fb923c; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
  .ws-hero-title { font-size: 50px; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 20px; max-width: 700px; }
  .ws-hero-title span { color: #c2410c; }
  .ws-hero-sub { font-size: 17px; color: #a8c0d8; line-height: 1.7; margin-bottom: 36px; max-width: 580px; }
  .ws-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 56px; }
  .ws-btn-primary { background: #c2410c; color: #fff; border: none; border-radius: 8px; padding: 13px 28px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .ws-btn-primary:hover { background: #a33509; }
  .ws-btn-ghost { background: rgba(255,255,255,0.07); color: #e2e8f0; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 13px 28px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .ws-btn-ghost:hover { background: rgba(255,255,255,0.12); }

  .ws-hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .ws-hero-stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px 20px; }
  .ws-hero-stat-val { font-size: 28px; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px; }
  .ws-hero-stat-label { font-size: 11px; color: #7b90b2; font-weight: 500; }

  /* TRUST BAR */
  .ws-trust { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 18px 40px; }
  .ws-trust-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 32px; flex-wrap: wrap; justify-content: center; }
  .ws-trust-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #334155; white-space: nowrap; }
  .ws-trust-dot { width: 6px; height: 6px; border-radius: 50%; background: #c2410c; flex-shrink: 0; }

  /* SECTIONS */
  .ws-section { padding: 72px 40px; }
  .ws-section-inner { max-width: 1100px; margin: 0 auto; }
  .ws-section-alt { background: #fff; }

  .ws-section-label { font-size: 11px; font-weight: 700; color: #c2410c; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px; }
  .ws-section-title { font-size: 34px; font-weight: 900; color: #132347; letter-spacing: -0.02em; margin-bottom: 14px; line-height: 1.1; }
  .ws-section-sub { font-size: 16px; color: #475569; line-height: 1.7; max-width: 580px; }

  /* PRODUCTS */
  .ws-products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px; }
  .ws-product { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
  .ws-product-icon { font-size: 28px; margin-bottom: 12px; }
  .ws-product-brand { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
  .ws-product-name { font-size: 16px; font-weight: 800; color: #132347; margin-bottom: 8px; }
  .ws-product-grades { display: flex; gap: 5px; flex-wrap: wrap; }
  .ws-grade-pill { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
  .ws-gp-blue { background: #eff6ff; color: #1d4ed8; }
  .ws-gp-green { background: #ecfdf5; color: #047857; }
  .ws-gp-yellow { background: #fefce8; color: #854d0e; }
  .ws-gp-orange { background: #fff7ed; color: #9a3412; }

  /* FEATURES */
  .ws-features { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 48px; }
  .ws-feature { display: flex; gap: 16px; align-items: flex-start; padding: 24px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; }
  .ws-feature-icon { width: 40px; height: 40px; background: #132347; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .ws-feature-title { font-size: 14px; font-weight: 800; color: #132347; margin-bottom: 5px; }
  .ws-feature-desc { font-size: 13px; color: #64748b; line-height: 1.6; }

  /* LOTS SECTION */
  .ws-lots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 40px; }
  .ws-lot { border-radius: 12px; padding: 24px; border: 1px solid; }
  .ws-lot-mixed { background: #f8fafc; border-color: #e2e8f0; }
  .ws-lot-grade { background: #ecfdf5; border-color: #a7f3d0; }
  .ws-lot-custom { background: #eff6ff; border-color: #bfdbfe; }
  .ws-lot-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .ws-lot-mixed .ws-lot-label { color: #64748b; }
  .ws-lot-grade .ws-lot-label { color: #047857; }
  .ws-lot-custom .ws-lot-label { color: #1d4ed8; }
  .ws-lot-title { font-size: 16px; font-weight: 800; color: #132347; margin-bottom: 8px; }
  .ws-lot-desc { font-size: 13px; color: #64748b; line-height: 1.5; }

  /* CTA */
  .ws-cta { background: linear-gradient(135deg, #132347 0%, #0c1730 100%); border-radius: 16px; padding: 56px 48px; text-align: center; margin-top: 60px; position: relative; overflow: hidden; }
  .ws-cta::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(194,65,12,0.2) 0%, transparent 70%); pointer-events: none; }
  .ws-cta-title { font-size: 30px; font-weight: 900; color: #fff; letter-spacing: -0.02em; margin-bottom: 12px; }
  .ws-cta-sub { font-size: 15px; color: #a8c0d8; margin-bottom: 28px; line-height: 1.6; }
  .ws-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  @media (max-width: 1024px) {
    .ws-hero-stats { grid-template-columns: repeat(2, 1fr); }
    .ws-products { grid-template-columns: repeat(2, 1fr); }
    .ws-lots { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .ws-hero { padding: 48px 20px; }
    .ws-hero-title { font-size: 30px; }
    .ws-section { padding: 48px 20px; }
    .ws-features { grid-template-columns: 1fr; }
    .ws-products { grid-template-columns: 1fr; }
    .ws-hero-stats { grid-template-columns: repeat(2, 1fr); }
    .ws-cta { padding: 36px 24px; }
    .ws-trust { padding: 14px 20px; }
    .ws-hero-btns { flex-direction: column; }
    .ws-btn-primary, .ws-btn-ghost { width: 100%; text-align: center; }
  }
`

export default function Wholesale() {
  const [, navigate] = useLocation()

  return (
    <>
      <style>{css}</style>
      <div className="ws-page">

        {/* HERO */}
        <div className="ws-hero">
          <div className="ws-hero-inner">
            <div className="ws-hero-eyebrow">Wholesale Buyers</div>
            <div className="ws-hero-title">Bulk Refurbished Devices at <span>Wholesale Prices</span></div>
            <div className="ws-hero-sub">Reliable supply, transparent grading, and pricing that works for high-volume buyers. Whether you're redistributing, liquidating, or building inventory — AeroWholesale delivers.</div>
            <div className="ws-hero-btns">
              <button className="ws-btn-primary" onClick={() => navigate('/apply')}>Apply for Wholesale Access</button>
              <button className="ws-btn-ghost" onClick={() => navigate('/contact')}>Contact Us</button>
            </div>
            <div className="ws-hero-stats">
              {[
                ['$10M+', 'Annual volume'],
                ['Apple & Samsung', 'Primary brands'],
                ['48hr', 'Fulfillment SLA'],
                ['4 Grades', 'Condition tiers'],
              ].map(([val, label]) => (
                <div key={label} className="ws-hero-stat">
                  <div className="ws-hero-stat-val">{val}</div>
                  <div className="ws-hero-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRUST BAR */}
        <div className="ws-trust">
          <div className="ws-trust-inner">
            {['IMEI Verified', 'Grade-Sorted Lots', 'Bulk Pricing', 'Fast Quotes', 'Repeat Buyer Programs'].map(t => (
              <div key={t} className="ws-trust-item"><div className="ws-trust-dot" />{t}</div>
            ))}
          </div>
        </div>

        {/* INVENTORY */}
        <div className="ws-section ws-section-alt">
          <div className="ws-section-inner">
            <div className="ws-section-label">Inventory</div>
            <div className="ws-section-title">Deep Stock Across <br/>Apple & Samsung</div>
            <div className="ws-section-sub">We carry consistent, high-volume inventory across the most in-demand device lines — ready to move at wholesale quantities.</div>
            <div className="ws-products">
              {[
                { icon: '📱', brand: 'Apple', name: 'iPhone', grades: ['Premium', 'Excellent', 'Good', 'B-Grade'] },
                { icon: '📱', brand: 'Apple', name: 'iPad', grades: ['Premium', 'Excellent', 'Good'] },
                { icon: '💻', brand: 'Apple', name: 'MacBook', grades: ['Premium', 'Excellent', 'Good'] },
                { icon: '📱', brand: 'Samsung', name: 'Galaxy Phones', grades: ['Excellent', 'Good', 'B-Grade'] },
                { icon: '📱', brand: 'Samsung', name: 'Galaxy Tablets', grades: ['Excellent', 'Good'] },
                { icon: '⌚', brand: 'Apple', name: 'Apple Watch', grades: ['Premium', 'Excellent'] },
              ].map(p => (
                <div key={p.name} className="ws-product">
                  <div className="ws-product-icon">{p.icon}</div>
                  <div className="ws-product-brand">{p.brand}</div>
                  <div className="ws-product-name">{p.name}</div>
                  <div className="ws-product-grades">
                    {p.grades.map(g => (
                      <span key={g} className={`ws-grade-pill ${g === 'Premium' ? 'ws-gp-blue' : g === 'Excellent' ? 'ws-gp-green' : g === 'Good' ? 'ws-gp-yellow' : 'ws-gp-orange'}`}>{g}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WHY */}
        <div className="ws-section">
          <div className="ws-section-inner">
            <div className="ws-section-label">Why AeroWholesale</div>
            <div className="ws-section-title">What Sets Us Apart <br/>for Wholesale Buyers</div>
            <div className="ws-features">
              {[
                { icon: '📦', title: 'Grade-Sorted Lots', desc: 'Inventory is sorted by grade before it ships. No mystery lots — you know exactly what condition you\'re receiving.' },
                { icon: '✅', title: 'IMEI Verified', desc: 'Every device is verified clean — no blacklisted or activation-locked units. Safe to resell on any channel.' },
                { icon: '💰', title: 'Volume-Based Pricing', desc: 'Pricing improves at volume. The more you buy, the better your cost per unit. No hidden fees.' },
                { icon: '⚡', title: 'Fast Turnaround', desc: 'Submit a quote request and get confirmation fast. We\'re built for buyers who move quickly.' },
              ].map(f => (
                <div key={f.title} className="ws-feature">
                  <div className="ws-feature-icon">{f.icon}</div>
                  <div>
                    <div className="ws-feature-title">{f.title}</div>
                    <div className="ws-feature-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOT TYPES */}
        <div className="ws-section ws-section-alt">
          <div className="ws-section-inner">
            <div className="ws-section-label">How We Sell</div>
            <div className="ws-section-title">Flexible Lot Structures <br/>for Any Buyer</div>
            <div className="ws-section-sub">We work with buyers at all scales. Whether you need a specific grade run or a mixed lot, we can accommodate your purchasing structure.</div>
            <div className="ws-lots">
              <div className="ws-lot ws-lot-grade">
                <div className="ws-lot-label">Grade Lots</div>
                <div className="ws-lot-title">Single-Grade Runs</div>
                <div className="ws-lot-desc">Buy a specific grade across a model line. Consistent quality, predictable yield, easier to price and resell.</div>
              </div>
              <div className="ws-lot ws-lot-mixed">
                <div className="ws-lot-label">Mixed Lots</div>
                <div className="ws-lot-title">Mixed Condition</div>
                <div className="ws-lot-desc">Blended lots with multiple grades at blended pricing. Best for buyers who sort and resell across condition tiers.</div>
              </div>
              <div className="ws-lot ws-lot-custom">
                <div className="ws-lot-label">Custom</div>
                <div className="ws-lot-title">Custom Orders</div>
                <div className="ws-lot-desc">Specific model, storage, carrier, or color configurations. Tell us what you need and we'll build the order.</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="ws-section">
          <div className="ws-section-inner">
            <div className="ws-cta">
              <div className="ws-cta-title">Ready to Buy at Wholesale?</div>
              <div className="ws-cta-sub">Apply for a wholesale account and get access to our full inventory with bulk pricing. We respond within 1 business day.</div>
              <div className="ws-cta-btns">
                <button className="ws-btn-primary" onClick={() => navigate('/apply')}>Apply for Wholesale Access</button>
                <button className="ws-btn-ghost" onClick={() => navigate('/catalog')}>Browse Catalog</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
