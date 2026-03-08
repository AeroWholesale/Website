import { useLocation } from 'wouter'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .ent-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #0f172a; -webkit-font-smoothing: antialiased; }

  /* HERO */
  .ent-hero { background: #0c1730; background-image: radial-gradient(ellipse 70% 60% at 80% 50%, rgba(194,65,12,0.12) 0%, transparent 65%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 80px 40px 72px; position: relative; overflow: hidden; }
  .ent-hero::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 80px); pointer-events: none; }
  .ent-hero-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 1; }
  .ent-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(194,65,12,0.15); border: 1px solid rgba(194,65,12,0.3); border-radius: 20px; padding: 5px 14px; font-size: 11px; font-weight: 700; color: #fb923c; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
  .ent-hero-title { font-size: 46px; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 20px; }
  .ent-hero-title span { color: #c2410c; }
  .ent-hero-sub { font-size: 16px; color: #a8c0d8; line-height: 1.7; margin-bottom: 32px; font-weight: 400; }
  .ent-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .ent-btn-primary { background: #c2410c; color: #fff; border: none; border-radius: 8px; padding: 13px 28px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .ent-btn-primary:hover { background: #a33509; }
  .ent-btn-ghost { background: rgba(255,255,255,0.07); color: #e2e8f0; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 13px 28px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .ent-btn-ghost:hover { background: rgba(255,255,255,0.12); }

  /* HERO STATS */
  .ent-hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .ent-hero-stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; }
  .ent-hero-stat-val { font-size: 32px; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px; }
  .ent-hero-stat-val span { color: #c2410c; }
  .ent-hero-stat-label { font-size: 12px; color: #7b90b2; font-weight: 500; line-height: 1.4; }

  /* TRUST BAR */
  .ent-trust { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 18px 40px; }
  .ent-trust-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 32px; flex-wrap: wrap; justify-content: center; }
  .ent-trust-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #334155; white-space: nowrap; }
  .ent-trust-dot { width: 6px; height: 6px; border-radius: 50%; background: #c2410c; flex-shrink: 0; }

  /* SECTIONS */
  .ent-section { padding: 72px 40px; }
  .ent-section-inner { max-width: 1100px; margin: 0 auto; }
  .ent-section-alt { background: #fff; }
  .ent-section-dark { background: #0c1730; }

  .ent-section-label { font-size: 11px; font-weight: 700; color: #c2410c; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px; }
  .ent-section-title { font-size: 34px; font-weight: 900; color: #132347; letter-spacing: -0.02em; margin-bottom: 14px; line-height: 1.1; }
  .ent-section-title-light { color: #fff; }
  .ent-section-sub { font-size: 16px; color: #475569; line-height: 1.7; max-width: 580px; }
  .ent-section-sub-light { color: #a8c0d8; }

  /* FEATURES GRID */
  .ent-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
  .ent-feature { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
  .ent-feature-icon { width: 44px; height: 44px; background: #f1f4f8; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 22px; }
  .ent-feature-title { font-size: 15px; font-weight: 800; color: #132347; margin-bottom: 8px; }
  .ent-feature-desc { font-size: 13px; color: #64748b; line-height: 1.6; }

  /* PROCESS */
  .ent-process { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 48px; position: relative; }
  .ent-process::before { content: ''; position: absolute; top: 28px; left: calc(12.5% + 14px); right: calc(12.5% + 14px); height: 1px; background: #e2e8f0; z-index: 0; }
  .ent-process-step { text-align: center; padding: 0 16px; position: relative; z-index: 1; }
  .ent-process-num { width: 56px; height: 56px; border-radius: 50%; background: #132347; color: #fff; font-size: 18px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
  .ent-process-title { font-size: 14px; font-weight: 700; color: #132347; margin-bottom: 6px; }
  .ent-process-desc { font-size: 12px; color: #64748b; line-height: 1.5; }

  /* GRADES */
  .ent-grades { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
  .ent-grade { border-radius: 10px; padding: 20px; border: 1px solid; }
  .ent-grade-premium { background: #eff6ff; border-color: #bfdbfe; }
  .ent-grade-excellent { background: #ecfdf5; border-color: #a7f3d0; }
  .ent-grade-good { background: #fefce8; border-color: #fde68a; }
  .ent-grade-label { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
  .ent-grade-premium .ent-grade-label { color: #1d4ed8; }
  .ent-grade-excellent .ent-grade-label { color: #047857; }
  .ent-grade-good .ent-grade-label { color: #854d0e; }
  .ent-grade-name { font-size: 16px; font-weight: 800; color: #132347; margin-bottom: 8px; }
  .ent-grade-desc { font-size: 12px; color: #64748b; line-height: 1.5; }

  /* CTA */
  .ent-cta { background: linear-gradient(135deg, #132347 0%, #0c1730 100%); border-radius: 16px; padding: 56px 48px; text-align: center; margin-top: 60px; position: relative; overflow: hidden; }
  .ent-cta::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(194,65,12,0.2) 0%, transparent 70%); pointer-events: none; }
  .ent-cta-title { font-size: 30px; font-weight: 900; color: #fff; letter-spacing: -0.02em; margin-bottom: 12px; }
  .ent-cta-sub { font-size: 15px; color: #a8c0d8; margin-bottom: 28px; line-height: 1.6; }
  .ent-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  @media (max-width: 1024px) {
    .ent-hero-inner { grid-template-columns: 1fr; gap: 40px; }
    .ent-hero-title { font-size: 36px; }
    .ent-features { grid-template-columns: repeat(2, 1fr); }
    .ent-process { grid-template-columns: repeat(2, 1fr); gap: 28px; }
    .ent-process::before { display: none; }
    .ent-grades { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 640px) {
    .ent-hero { padding: 48px 20px; }
    .ent-hero-title { font-size: 28px; }
    .ent-section { padding: 48px 20px; }
    .ent-features { grid-template-columns: 1fr; }
    .ent-process { grid-template-columns: 1fr; }
    .ent-grades { grid-template-columns: 1fr; }
    .ent-cta { padding: 36px 24px; }
    .ent-trust { padding: 14px 20px; }
    .ent-hero-stats { grid-template-columns: 1fr 1fr; }
    .ent-hero-btns { flex-direction: column; }
    .ent-btn-primary, .ent-btn-ghost { width: 100%; text-align: center; }
  }
`

export default function Enterprise() {
  const [, navigate] = useLocation()

  return (
    <>
      <style>{css}</style>
      <div className="ent-page">

        {/* HERO */}
        <div className="ent-hero">
          <div className="ent-hero-inner">
            <div>
              <div className="ent-hero-eyebrow">Enterprise Procurement</div>
              <div className="ent-hero-title">Refurbished Devices at <span>Enterprise Scale</span></div>
              <div className="ent-hero-sub">Purpose-built for IT procurement teams, corporate fleet managers, and large-volume buyers. Get certified-quality Apple and Samsung devices with the reliability your organization demands.</div>
              <div className="ent-hero-btns">
                <button className="ent-btn-primary" onClick={() => navigate('/apply')}>Apply for Enterprise Access</button>
                <button className="ent-btn-ghost" onClick={() => navigate('/contact')}>Talk to Sales</button>
              </div>
            </div>
            <div className="ent-hero-stats">
              {[
                ['10M+', 'In annual device volume'],
                ['48hr', 'Average fulfillment time'],
                ['4', 'Condition grades available'],
                ['100%', 'IMEI verified inventory'],
              ].map(([val, label]) => (
                <div key={label} className="ent-hero-stat">
                  <div className="ent-hero-stat-val">{val.replace(/\d+/, m => `<span>${m}</span>`)}<span style={{display:'none'}}/>{val}</div>
                  <div className="ent-hero-stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TRUST BAR */}
        <div className="ent-trust">
          <div className="ent-trust-inner">
            {['IMEI Verified Inventory', 'Bulk Pricing on 50+ Units', 'Dedicated Account Management', 'Net Terms Available', 'Same-Day Quotes'].map(t => (
              <div key={t} className="ent-trust-item"><div className="ent-trust-dot" />{t}</div>
            ))}
          </div>
        </div>

        {/* WHY ENTERPRISE */}
        <div className="ent-section">
          <div className="ent-section-inner">
            <div className="ent-section-label">Why AeroWholesale</div>
            <div className="ent-section-title">Built for High-Volume <br/>Corporate Procurement</div>
            <div className="ent-section-sub">We work directly with enterprise buyers to provide consistent supply, transparent grading, and flexible terms that fit your procurement cycle.</div>
            <div className="ent-features">
              {[
                { icon: '📦', title: 'Consistent Supply', desc: 'Deep inventory across iPhone, iPad, MacBook, and Samsung lines. We maintain stock so your procurement cycle never stalls.' },
                { icon: '✅', title: 'Certified Quality', desc: 'Every device passes functional QC and IMEI verification. Detailed grade breakdowns so your team knows exactly what they\'re receiving.' },
                { icon: '💰', title: 'Volume Pricing', desc: 'Tiered pricing that improves with scale. Enterprise buyers get dedicated rates, not catalog prices.' },
                { icon: '📋', title: 'Flexible Terms', desc: 'Net payment terms available for qualified enterprise accounts. We work within your procurement and accounts payable process.' },
                { icon: '⚡', title: 'Fast Turnaround', desc: 'Quotes within hours, fulfillment within 48 hours for in-stock items. Built for teams that can\'t wait.' },
                { icon: '🤝', title: 'Dedicated Support', desc: 'A dedicated account contact who knows your business, not a ticket queue. Direct line for orders, questions, and escalations.' },
              ].map(f => (
                <div key={f.title} className="ent-feature">
                  <div className="ent-feature-icon">{f.icon}</div>
                  <div className="ent-feature-title">{f.title}</div>
                  <div className="ent-feature-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="ent-section ent-section-alt">
          <div className="ent-section-inner">
            <div className="ent-section-label">Process</div>
            <div className="ent-section-title">Simple from First Contact <br/>to Delivery</div>
            <div className="ent-process">
              {[
                { n: '1', title: 'Apply', desc: 'Submit your enterprise application. We review and respond within 1 business day.' },
                { n: '2', title: 'Get Access', desc: 'Approved accounts get wholesale pricing, dedicated support, and full catalog access.' },
                { n: '3', title: 'Submit Quote', desc: 'Browse inventory and submit a quote request with your quantities and specs.' },
                { n: '4', title: 'Fulfill', desc: 'We confirm availability, finalize pricing, and ship within your timeline.' },
              ].map(s => (
                <div key={s.n} className="ent-process-step">
                  <div className="ent-process-num">{s.n}</div>
                  <div className="ent-process-title">{s.title}</div>
                  <div className="ent-process-desc">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GRADES */}
        <div className="ent-section">
          <div className="ent-section-inner">
            <div className="ent-section-label">Device Quality</div>
            <div className="ent-section-title">Transparent Grading, <br/>No Surprises</div>
            <div className="ent-section-sub">Every device is graded against our standardized criteria. Enterprise buyers typically purchase Premium or Excellent grade for fleet deployments.</div>
            <div className="ent-grades">
              {[
                { cls: 'ent-grade-premium', label: 'PREMIUM', name: 'Premium / Premium 100%', desc: 'Like-new condition with no visible wear. Battery health 80%+ or 100%. Ideal for executive fleets and client-facing deployments.' },
                { cls: 'ent-grade-excellent', label: 'EXCELLENT', name: 'Excellent', desc: 'Light cosmetic wear, fully functional. Battery health 80%+. Best value for large-scale corporate deployments.' },
                { cls: 'ent-grade-good', label: 'GOOD', name: 'Good', desc: 'Moderate cosmetic wear, fully functional. Ideal for internal tools, warehousing, or cost-sensitive deployments.' },
              ].map(g => (
                <div key={g.name} className={`ent-grade ${g.cls}`}>
                  <div className="ent-grade-label">{g.label}</div>
                  <div className="ent-grade-name">{g.name}</div>
                  <div className="ent-grade-desc">{g.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="ent-section ent-section-alt">
          <div className="ent-section-inner">
            <div className="ent-cta">
              <div className="ent-cta-title">Ready to Set Up an Enterprise Account?</div>
              <div className="ent-cta-sub">Apply today and get a response within 1 business day. Our team will reach out to discuss your volume needs, preferred grades, and payment terms.</div>
              <div className="ent-cta-btns">
                <button className="ent-btn-primary" onClick={() => navigate('/apply')}>Apply for Enterprise Access</button>
                <button className="ent-btn-ghost" onClick={() => navigate('/contact')}>Contact Sales Team</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
