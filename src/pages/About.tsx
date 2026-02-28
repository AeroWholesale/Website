import { useLocation } from 'wouter'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  :root {
    --navy: #132347; --navy-mid: #1a2f5e; --navy-dark: #0c1730; --navy-deep: #08101f;
    --orange: #c2410c; --orange-lt: #d9480f;
    --steel: #334155; --steel-lt: #475569; --steel-dim: #64748b;
    --slate-bg: #f1f4f8; --white: #ffffff; --off-white: #f8fafc;
    --border: #e2e8f0; --text-dark: #0f172a;
  }

  .aw-about-page { font-family: 'DM Sans', sans-serif; background: var(--off-white); color: var(--text-dark); -webkit-font-smoothing: antialiased; }

  /* ── HEADER ── */
  .aw-about-header { background: var(--navy-dark); background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, var(--navy-dark) 0%, var(--navy-deep) 100%); padding: 36px 40px 40px; position: relative; overflow: hidden; }
  .aw-about-header::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px); pointer-events: none; }
  .aw-about-header-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .aw-about-breadcrumb { font-size: 11px; font-weight: 600; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .aw-about-breadcrumb span { color: #7b90b2; cursor: pointer; }
  .aw-about-breadcrumb span:hover { color: #a8c0d8; }
  .aw-about-page-title { font-size: 30px; font-weight: 900; color: #ffffff; letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.1; }
  .aw-about-page-sub { font-size: 13.5px; color: #a8c0d8; font-weight: 500; max-width: 600px; line-height: 1.6; }

  /* ── MISSION ── */
  .aw-about-mission { background: var(--white); border-bottom: 1px solid var(--border); padding: 64px 40px; }
  .aw-about-mission-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
  .aw-about-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .aw-about-eyebrow::before { content: ''; width: 16px; height: 2px; background: var(--orange); border-radius: 1px; }
  .aw-about-mission-title { font-size: 28px; font-weight: 800; color: var(--navy); letter-spacing: -0.03em; margin-bottom: 18px; line-height: 1.2; }
  .aw-about-mission-text { font-size: 14.5px; color: var(--steel-dim); line-height: 1.75; margin-bottom: 14px; }
  .aw-about-highlight { background: var(--slate-bg); border-left: 3px solid var(--orange); padding: 20px 24px; border-radius: 0 8px 8px 0; margin-top: 24px; }
  .aw-about-highlight-text { font-size: 15px; font-weight: 600; color: var(--navy); line-height: 1.6; font-style: italic; }

  /* Timeline */
  .aw-about-timeline { display: flex; flex-direction: column; gap: 0; }
  .aw-about-timeline-item { display: flex; gap: 20px; padding: 24px 0; border-bottom: 1px solid var(--border); }
  .aw-about-timeline-item:last-child { border-bottom: none; }
  .aw-about-timeline-year { font-size: 13px; font-weight: 800; color: var(--orange); width: 48px; flex-shrink: 0; padding-top: 2px; }
  .aw-about-timeline-title { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 3px; }
  .aw-about-timeline-desc { font-size: 12.5px; color: var(--steel-dim); line-height: 1.5; }

  /* ── STATS BAR ── */
  .aw-about-stats { background: var(--navy-dark); background-image: radial-gradient(ellipse 50% 80% at 50% 50%, rgba(194,65,12,0.06) 0%, transparent 70%); padding: 56px 40px; }
  .aw-about-stats-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
  .aw-about-stat { text-align: center; }
  .aw-about-stat-num { font-size: 36px; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1; margin-bottom: 6px; }
  .aw-about-stat-num em { font-style: normal; color: var(--orange-lt); }
  .aw-about-stat-label { font-size: 11px; color: #7b90b2; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; }

  /* ── DIFFERENTIATORS ── */
  .aw-about-diff { padding: 72px 40px; }
  .aw-about-diff-inner { max-width: 1200px; margin: 0 auto; }
  .aw-about-diff-header { text-align: center; margin-bottom: 48px; }
  .aw-about-diff-title { font-size: 28px; font-weight: 800; color: var(--navy); letter-spacing: -0.03em; margin-bottom: 10px; }
  .aw-about-diff-sub { font-size: 14.5px; color: var(--steel-dim); max-width: 520px; margin: 0 auto; line-height: 1.65; }
  .aw-about-diff-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .aw-about-diff-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 32px 28px; transition: box-shadow 0.18s, transform 0.18s; position: relative; overflow: hidden; }
  .aw-about-diff-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--navy); transform: scaleX(0); transition: transform 0.18s; transform-origin: left; }
  .aw-about-diff-card:hover { box-shadow: 0 8px 28px rgba(19,35,71,0.08); transform: translateY(-2px); }
  .aw-about-diff-card:hover::after { transform: scaleX(1); }
  .aw-about-diff-icon { width: 44px; height: 44px; border-radius: 10px; background: var(--slate-bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
  .aw-about-diff-icon svg { width: 22px; height: 22px; color: var(--navy); }
  .aw-about-diff-card-title { font-size: 16px; font-weight: 800; color: var(--navy); margin-bottom: 8px; letter-spacing: -0.02em; }
  .aw-about-diff-card-desc { font-size: 13px; color: var(--steel-dim); line-height: 1.65; }

  /* ── CTA ── */
  .aw-about-cta { background: var(--white); border-top: 1px solid var(--border); padding: 64px 40px; text-align: center; }
  .aw-about-cta-inner { max-width: 600px; margin: 0 auto; }
  .aw-about-cta-title { font-size: 24px; font-weight: 800; color: var(--navy); letter-spacing: -0.03em; margin-bottom: 10px; }
  .aw-about-cta-sub { font-size: 14px; color: var(--steel-dim); margin-bottom: 28px; line-height: 1.6; }
  .aw-about-cta-buttons { display: flex; gap: 12px; justify-content: center; }
  .aw-about-cta-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--orange); color: var(--white); font-size: 14px; font-weight: 700; padding: 14px 26px; border-radius: 7px; cursor: pointer; transition: background 0.15s, transform 0.1s; box-shadow: 0 4px 16px rgba(194,65,12,0.35); border: none; font-family: inherit; text-decoration: none; }
  .aw-about-cta-primary:hover { background: #a33509; transform: translateY(-1px); }
  .aw-about-cta-ghost { display: inline-flex; align-items: center; gap: 8px; background: var(--navy); color: var(--white); font-size: 14px; font-weight: 600; padding: 14px 22px; border-radius: 7px; cursor: pointer; border: none; font-family: inherit; text-decoration: none; transition: background 0.15s; }
  .aw-about-cta-ghost:hover { background: var(--navy-mid); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .aw-about-mission-inner { grid-template-columns: 1fr; gap: 40px; }
    .aw-about-diff-grid { grid-template-columns: 1fr; }
    .aw-about-stats-inner { grid-template-columns: repeat(2, 1fr); gap: 32px; }
  }
  @media (max-width: 640px) {
    .aw-about-header, .aw-about-mission, .aw-about-diff, .aw-about-stats, .aw-about-cta { padding-left: 20px; padding-right: 20px; }
    .aw-about-page-title { font-size: 24px; }
    .aw-about-stats-inner { grid-template-columns: 1fr; }
    .aw-about-cta-buttons { flex-direction: column; }
  }
`

// SVG icons as components
const IconCheck = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
const IconBolt = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
const IconShield = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
const IconEye = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8l5 3-5 3V8z"/></svg>
const IconBox = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
const IconUsers = () => <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
const IconArrow = () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>

const DIFFS = [
  { icon: IconCheck, title: 'Rigorous Grading', desc: 'Every device is individually inspected across 50+ checkpoints. Our 8-tier grading system means you always know exactly what you\'re buying — no vague "Grade A/B/C" labels.' },
  { icon: IconBolt, title: 'Speed & Reliability', desc: 'Orders are processed and shipped fast. We maintain real-time inventory so what you see is what\'s available — no backorders, no phantom stock.' },
  { icon: IconShield, title: 'Trusted by Enterprises', desc: 'From high-volume B2B partnerships to enterprise deployment programs, we deliver the volume, consistency, and documentation that serious buyers require.' },
  { icon: IconEye, title: 'Full Transparency', desc: 'No surprises. Every listing shows the grade, condition specs, and stock count. Approved buyers see real pricing — no hidden fees, no bait and switch.' },
  { icon: IconBox, title: 'Deep Inventory', desc: 'iPhones, iPads, MacBooks, Samsung — across all major models, storage configs, and grades. Whether you need 10 units or 1,000, we have the stock to back it up.' },
  { icon: IconUsers, title: 'Dedicated Support', desc: 'You\'re not a ticket number. Our team works directly with wholesale buyers to handle custom orders, bulk quotes, and ongoing supply needs.' },
]

const TIMELINE = [
  { year: '1997', title: 'Industry Roots', desc: 'Began building deep expertise in the electronics industry, developing the supplier relationships and market knowledge that would become AeroWholesale\'s foundation.' },
  { year: '2015', title: 'AeroWholesale Founded', desc: 'Launched AeroWholesale to bring a quality-first approach to refurbished device wholesale — sourcing, grading, and selling direct.' },
  { year: '2017', title: 'Scaled Operations', desc: 'Invested in facility infrastructure, quality control systems, and streamlined fulfillment processes.' },
  { year: '2020', title: 'Enterprise Partnerships', desc: 'Began fulfilling corporate refresh programs, processing thousands of units monthly.' },
  { year: '2024', title: 'B2B Wholesale Platform', desc: 'Launched the direct wholesale channel — giving approved buyers real-time inventory access, transparent grading, and competitive pricing.' },
]

export default function About() {
  const [, navigate] = useLocation()

  return (
    <>
      <style>{css}</style>
      <div className="aw-about-page">

        {/* ── HEADER ── */}
        <div className="aw-about-header">
          <div className="aw-about-header-inner">
            <div className="aw-about-breadcrumb">
              <span onClick={() => navigate('/')}>Home</span> › About
            </div>
            <div className="aw-about-page-title">About AeroWholesale</div>
            <div className="aw-about-page-sub">
              Over two decades of experience in the electronics industry. Built on quality, driven by reliability, trusted by businesses nationwide.
            </div>
          </div>
        </div>

        {/* ── MISSION / STORY ── */}
        <div className="aw-about-mission">
          <div className="aw-about-mission-inner">
            <div>
              <div className="aw-about-eyebrow">Our Story</div>
              <div className="aw-about-mission-title">Built from the Ground Up on Quality and Trust</div>
              <div className="aw-about-mission-text">
                AeroWholesale was founded in 2015, backed by nearly two decades of hands-on experience in the electronics industry. The idea was straightforward: businesses deserve a better way to source refurbished electronics. No guesswork on condition. No surprises on delivery. No inconsistency between what's listed and what shows up.
              </div>
              <div className="aw-about-mission-text">
                What started as a small operation has grown into a trusted wholesale partner for enterprises, high-volume B2B partnerships, resellers, and enterprise deployment programs across the country. We've processed tens of thousands of phones, tablets, and computers — each one inspected, graded, and verified before it ever reaches a buyer.
              </div>
              <div className="aw-about-highlight">
                <div className="aw-about-highlight-text">"From one device to one thousand — we've got you covered."</div>
              </div>
            </div>
            <div>
              <div className="aw-about-timeline">
                {TIMELINE.map(t => (
                  <div key={t.year} className="aw-about-timeline-item">
                    <div className="aw-about-timeline-year">{t.year}</div>
                    <div>
                      <div className="aw-about-timeline-title">{t.title}</div>
                      <div className="aw-about-timeline-desc">{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="aw-about-stats">
          <div className="aw-about-stats-inner">
            <div className="aw-about-stat">
              <div className="aw-about-stat-num">20<em>+</em></div>
              <div className="aw-about-stat-label">Years in Industry</div>
            </div>
            <div className="aw-about-stat">
              <div className="aw-about-stat-num">50K<em>+</em></div>
              <div className="aw-about-stat-label">Devices Processed</div>
            </div>
            <div className="aw-about-stat">
              <div className="aw-about-stat-num">500<em>+</em></div>
              <div className="aw-about-stat-label">Active SKUs</div>
            </div>
            <div className="aw-about-stat">
              <div className="aw-about-stat-num">99<em>%</em></div>
              <div className="aw-about-stat-label">Order Accuracy</div>
            </div>
          </div>
        </div>

        {/* ── DIFFERENTIATORS ── */}
        <div className="aw-about-diff">
          <div className="aw-about-diff-inner">
            <div className="aw-about-diff-header">
              <div className="aw-about-eyebrow" style={{ justifyContent: 'center' }}>Why AeroWholesale</div>
              <div className="aw-about-diff-title">What Sets Us Apart</div>
              <div className="aw-about-diff-sub">We're not a marketplace or a broker. We're hands-on with every device that moves through our facility.</div>
            </div>
            <div className="aw-about-diff-grid">
              {DIFFS.map(d => (
                <div key={d.title} className="aw-about-diff-card">
                  <div className="aw-about-diff-icon"><d.icon /></div>
                  <div className="aw-about-diff-card-title">{d.title}</div>
                  <div className="aw-about-diff-card-desc">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="aw-about-cta">
          <div className="aw-about-cta-inner">
            <div className="aw-about-cta-title">Let's Work Together</div>
            <div className="aw-about-cta-sub">Whether you're sourcing for enterprise, resale, or marketplace — we're ready to be your wholesale partner.</div>
            <div className="aw-about-cta-buttons">
              <a className="aw-about-cta-primary" href="/contact">
                Get in Touch
                <IconArrow />
              </a>
              <a className="aw-about-cta-ghost" href="/apply">Apply for Access</a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}