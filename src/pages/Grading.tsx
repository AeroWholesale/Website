import { useNavigate } from 'react-router-dom'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  :root {
    --navy:       #132347;
    --navy-mid:   #1a2f5e;
    --navy-dark:  #0c1730;
    --navy-deep:  #08101f;
    --orange:     #c2410c;
    --orange-lt:  #d9480f;
    --steel:      #334155;
    --steel-lt:   #475569;
    --steel-dim:  #64748b;
    --slate-bg:   #f1f4f8;
    --white:      #ffffff;
    --off-white:  #f8fafc;
    --border:     #e2e8f0;
    --border-mid: #cbd5e1;
    --text-dark:  #0f172a;
    --text-body:  #334155;
    --text-muted: #64748b;
  }

  .aw-grade-page { font-family: 'DM Sans', sans-serif; background: var(--off-white); color: var(--text-dark); -webkit-font-smoothing: antialiased; }

  /* ── HEADER ── */
  .aw-grade-header { background: var(--navy-dark); background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, var(--navy-dark) 0%, var(--navy-deep) 100%); padding: 36px 40px 40px; position: relative; overflow: hidden; }
  .aw-grade-header::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px); pointer-events: none; }
  .aw-grade-header-inner { max-width: 1200px; margin: 0 auto; position: relative; z-index: 1; }
  .aw-grade-breadcrumb { font-size: 11px; font-weight: 600; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .aw-grade-breadcrumb span { color: #7b90b2; cursor: pointer; }
  .aw-grade-breadcrumb span:hover { color: #a8c0d8; }
  .aw-grade-page-title { font-size: 30px; font-weight: 900; color: #ffffff; letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.1; }
  .aw-grade-page-sub { font-size: 13.5px; color: #a8c0d8; font-weight: 500; max-width: 600px; line-height: 1.6; }

  /* ── INTRO ── */
  .aw-grade-intro { background: var(--white); border-bottom: 1px solid var(--border); padding: 48px 40px; }
  .aw-grade-intro-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  .aw-grade-intro-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .aw-grade-intro-eyebrow::before { content: ''; width: 16px; height: 2px; background: var(--orange); border-radius: 1px; }
  .aw-grade-intro-title { font-size: 24px; font-weight: 800; color: var(--navy); letter-spacing: -0.03em; margin-bottom: 14px; line-height: 1.2; }
  .aw-grade-intro-text { font-size: 14px; color: var(--steel-dim); line-height: 1.7; margin-bottom: 12px; }
  .aw-grade-intro-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 24px; }
  .aw-grade-intro-stat { background: var(--slate-bg); border: 1px solid var(--border); border-radius: 8px; padding: 16px; text-align: center; }
  .aw-grade-intro-stat-num { font-size: 22px; font-weight: 800; color: var(--navy); letter-spacing: -0.02em; }
  .aw-grade-intro-stat-label { font-size: 10.5px; color: var(--steel-dim); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 2px; }
  .aw-grade-process-steps { display: flex; flex-direction: column; gap: 0; }
  .aw-grade-process-step { display: flex; align-items: flex-start; gap: 16px; padding: 18px 0; border-bottom: 1px solid var(--border); }
  .aw-grade-process-step:last-child { border-bottom: none; }
  .aw-grade-step-num { width: 32px; height: 32px; border-radius: 8px; background: var(--navy); color: var(--white); font-size: 13px; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .aw-grade-step-title { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 2px; }
  .aw-grade-step-desc { font-size: 12.5px; color: var(--steel-dim); line-height: 1.5; }

  /* ── GRADES SECTION ── */
  .aw-grades-section { padding: 60px 40px 80px; }
  .aw-grades-inner { max-width: 1200px; margin: 0 auto; }
  .aw-grades-section-title { font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 28px; display: flex; align-items: center; gap: 8px; }
  .aw-grades-section-title::before { content: ''; width: 16px; height: 2px; background: var(--orange); border-radius: 1px; }
  .aw-grades-section-title::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  /* ── GRADE CARDS ── */
  .aw-grade-cards { display: flex; flex-direction: column; gap: 16px; }
  .aw-grade-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; transition: box-shadow 0.18s, transform 0.18s; }
  .aw-grade-card:hover { box-shadow: 0 8px 28px rgba(19,35,71,0.08); transform: translateY(-1px); }
  .aw-grade-card-top { display: grid; grid-template-columns: 220px 1fr; min-height: 0; }
  .aw-grade-card-label { padding: 28px 24px; display: flex; flex-direction: column; justify-content: center; border-right: 1px solid var(--border); }
  .aw-grade-card-tier { display: inline-flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .aw-grade-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
  .aw-grade-card-name { font-size: 20px; font-weight: 800; color: var(--navy); letter-spacing: -0.02em; line-height: 1.1; }
  .aw-grade-card-tier-label { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; padding: 3px 8px; border-radius: 4px; }
  .aw-grade-card-body { padding: 28px 28px; display: flex; flex-direction: column; justify-content: center; }
  .aw-grade-card-desc { font-size: 13.5px; color: var(--steel); line-height: 1.65; margin-bottom: 18px; }
  .aw-grade-specs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
  .aw-grade-spec { background: var(--slate-bg); border: 1px solid var(--border); border-radius: 8px; padding: 14px 16px; }
  .aw-grade-spec-label { font-size: 9.5px; font-weight: 700; color: var(--steel-dim); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
  .aw-grade-spec-value { font-size: 13px; font-weight: 600; color: var(--navy); line-height: 1.4; }

  /* Tier colors */
  .tier-top .aw-grade-dot { background: #22c55e; }
  .tier-top .aw-grade-card-tier-label { background: #f0fdf4; color: #15803d; }
  .tier-top .aw-grade-card-label { background: #fafff8; }

  .tier-mid .aw-grade-dot { background: #3b82f6; }
  .tier-mid .aw-grade-card-tier-label { background: #eff6ff; color: #1d4ed8; }
  .tier-mid .aw-grade-card-label { background: #f8faff; }

  .tier-good .aw-grade-dot { background: #8b5cf6; }
  .tier-good .aw-grade-card-tier-label { background: #f5f3ff; color: #6d28d9; }
  .tier-good .aw-grade-card-label { background: #faf8ff; }

  .tier-fair .aw-grade-dot { background: #f59e0b; }
  .tier-fair .aw-grade-card-tier-label { background: #fffbeb; color: #b45309; }
  .tier-fair .aw-grade-card-label { background: #fffdf5; }

  /* ── CTA BANNER ── */
  .aw-grade-cta { background: var(--navy-dark); padding: 56px 40px; text-align: center; }
  .aw-grade-cta-inner { max-width: 600px; margin: 0 auto; }
  .aw-grade-cta-title { font-size: 24px; font-weight: 800; color: var(--white); letter-spacing: -0.03em; margin-bottom: 10px; }
  .aw-grade-cta-sub { font-size: 14px; color: #7b90b2; margin-bottom: 28px; line-height: 1.6; }
  .aw-grade-cta-buttons { display: flex; gap: 12px; justify-content: center; }
  .aw-grade-cta-primary { display: inline-flex; align-items: center; gap: 8px; background: var(--orange); color: var(--white); font-size: 14px; font-weight: 700; padding: 14px 26px; border-radius: 7px; cursor: pointer; transition: background 0.15s, transform 0.1s; box-shadow: 0 4px 16px rgba(194,65,12,0.35); border: none; font-family: inherit; text-decoration: none; }
  .aw-grade-cta-primary:hover { background: #a33509; transform: translateY(-1px); }
  .aw-grade-cta-secondary { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.75); font-size: 14px; font-weight: 600; padding: 14px 22px; border-radius: 7px; cursor: pointer; border: 1px solid rgba(255,255,255,0.12); transition: all 0.15s; font-family: inherit; text-decoration: none; }
  .aw-grade-cta-secondary:hover { background: rgba(255,255,255,0.12); color: var(--white); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .aw-grade-intro-inner { grid-template-columns: 1fr; gap: 36px; }
    .aw-grade-card-top { grid-template-columns: 1fr; }
    .aw-grade-card-label { border-right: none; border-bottom: 1px solid var(--border); padding: 20px 24px; }
    .aw-grade-specs { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .aw-grade-header, .aw-grade-intro, .aw-grades-section, .aw-grade-cta { padding-left: 20px; padding-right: 20px; }
    .aw-grade-page-title { font-size: 24px; }
    .aw-grade-intro-stats { grid-template-columns: 1fr; }
    .aw-grade-cta-buttons { flex-direction: column; }
  }
`

const GRADES = [
  {
    name: 'Premium+',
    tier: 'top',
    tierLabel: 'Highest Tier',
    desc: 'Virtually indistinguishable from new. These devices have been meticulously inspected and show no signs of previous use. Ideal for customers who expect a like-new unboxing experience.',
    screen: 'Flawless — no scratches, marks, or blemishes of any kind',
    body: 'Pristine — no dents, scuffs, or signs of wear',
    battery: '100% health — full original capacity',
  },
  {
    name: 'Premium',
    tier: 'top',
    tierLabel: 'Highest Tier',
    desc: 'Exceptional condition with only the most minimal signs of handling, if any. These units pass our strictest cosmetic standards and deliver a near-new experience.',
    screen: 'Flawless — no visible scratches or imperfections',
    body: 'Excellent — may have extremely faint handling marks, invisible in normal use',
    battery: '85%+ health — strong daily performance',
  },
  {
    name: 'Excellent',
    tier: 'mid',
    tierLabel: 'High Quality',
    desc: 'Looks and performs great. Light cosmetic signs of use may be present but are barely noticeable. Fully functional with strong battery life. The best balance of quality and value.',
    screen: 'Clean — may have very faint micro-scratches only visible under direct light',
    body: 'Very good — minor traces of use, no dents or deep marks',
    battery: '80%+ health — reliable all-day battery',
  },
  {
    name: 'Good',
    tier: 'good',
    tierLabel: 'Solid Value',
    desc: 'A fully functional device with visible but moderate cosmetic wear. Ideal for business deployments, personal backup devices, or buyers who prioritize function over aesthetics.',
    screen: 'Light scratches visible during normal use, no cracks',
    body: 'Moderate wear — may include small scuffs, light scratches, or minor marks',
    battery: '80%+ health — reliable daily use',
  },
  {
    name: 'Good (Low Battery)',
    tier: 'good',
    tierLabel: 'Solid Value',
    desc: 'Same cosmetic standards as Good, but with a battery below 80% health. Great option for stationary or plugged-in use, or for buyers who plan to replace the battery.',
    screen: 'Light scratches visible during normal use, no cracks',
    body: 'Moderate wear — may include small scuffs, light scratches, or minor marks',
    battery: 'Below 80% — may need replacement for heavy mobile use',
  },
  {
    name: 'Fair',
    tier: 'fair',
    tierLabel: 'Budget Friendly',
    desc: 'Noticeable cosmetic wear throughout. Fully tested and functional. Best suited for cost-conscious buyers, fleet deployments, trade-in programs, or refurbishment operations.',
    screen: 'Visible scratches and/or light surface wear',
    body: 'Heavy wear — scuffs, scratches, and possible small dents',
    battery: '80%+ health — functional battery',
  },
  {
    name: 'Fair-',
    tier: 'fair',
    tierLabel: 'Budget Friendly',
    desc: 'Significant cosmetic wear with heavier signs of use. All core functions are verified working. Priced for maximum value — ideal for resale programs, parts, or heavy-duty deployments.',
    screen: 'Heavy scratches and surface wear throughout',
    body: 'Significant wear — visible dents, deep scratches, or discoloration possible',
    battery: '80%+ health — functional battery',
  },
  {
    name: 'Fair (Low Battery)',
    tier: 'fair',
    tierLabel: 'Budget Friendly',
    desc: 'Budget-tier cosmetics with a battery below 80% health. Functional and tested. Best for buyers doing their own battery replacements or using devices in a plugged-in setting.',
    screen: 'Visible scratches and/or surface wear',
    body: 'Heavy wear — scuffs, scratches, and possible dents',
    battery: 'Below 80% — recommended for stationary use or battery replacement',
  },
]

export default function Grading() {
  const navigate = useNavigate()

  return (
    <>
      <style>{css}</style>
      <div className="aw-grade-page">

        {/* ── HEADER ── */}
        <div className="aw-grade-header">
          <div className="aw-grade-header-inner">
            <div className="aw-grade-breadcrumb">
              <span onClick={() => navigate('/')}>Home</span> › Grading Standards
            </div>
            <div className="aw-grade-page-title">Grading Standards</div>
            <div className="aw-grade-page-sub">
              Every device we sell is inspected, tested, and graded using a rigorous multi-point system.
              Our grades give you complete confidence in what you're purchasing — no surprises.
            </div>
          </div>
        </div>

        {/* ── INTRO SECTION ── */}
        <div className="aw-grade-intro">
          <div className="aw-grade-intro-inner">
            <div>
              <div className="aw-grade-intro-eyebrow">Our Process</div>
              <div className="aw-grade-intro-title">How We Grade Every Device</div>
              <div className="aw-grade-intro-text">
                Each unit goes through a standardized inspection process before it receives a grade.
                We evaluate cosmetics, functionality, and battery health independently — so you always
                know exactly what you're getting.
              </div>
              <div className="aw-grade-intro-text">
                Grades are assigned at the individual device level, not the SKU level. Two units of the
                same model may receive different grades depending on their condition.
              </div>
              <div className="aw-grade-intro-stats">
                <div className="aw-grade-intro-stat">
                  <div className="aw-grade-intro-stat-num">50+</div>
                  <div className="aw-grade-intro-stat-label">Inspection Points</div>
                </div>
                <div className="aw-grade-intro-stat">
                  <div className="aw-grade-intro-stat-num">8</div>
                  <div className="aw-grade-intro-stat-label">Grade Levels</div>
                </div>
                <div className="aw-grade-intro-stat">
                  <div className="aw-grade-intro-stat-num">100%</div>
                  <div className="aw-grade-intro-stat-label">Tested & Verified</div>
                </div>
              </div>
            </div>
            <div>
              <div className="aw-grade-process-steps">
                <div className="aw-grade-process-step">
                  <div className="aw-grade-step-num">1</div>
                  <div>
                    <div className="aw-grade-step-title">Intake & Registration</div>
                    <div className="aw-grade-step-desc">Every device is logged by serial number, model, and source upon arrival at our facility.</div>
                  </div>
                </div>
                <div className="aw-grade-process-step">
                  <div className="aw-grade-step-num">2</div>
                  <div>
                    <div className="aw-grade-step-title">Functional Testing</div>
                    <div className="aw-grade-step-desc">Full diagnostic check — display, touch, cameras, speakers, microphone, charging, Face ID / Touch ID, Wi-Fi, cellular, and sensors.</div>
                  </div>
                </div>
                <div className="aw-grade-process-step">
                  <div className="aw-grade-step-num">3</div>
                  <div>
                    <div className="aw-grade-step-title">Cosmetic Inspection</div>
                    <div className="aw-grade-step-desc">Screen and body evaluated under controlled lighting for scratches, dents, scuffs, and discoloration.</div>
                  </div>
                </div>
                <div className="aw-grade-process-step">
                  <div className="aw-grade-step-num">4</div>
                  <div>
                    <div className="aw-grade-step-title">Battery Health Check</div>
                    <div className="aw-grade-step-desc">Battery maximum capacity verified via diagnostic software. Units below 80% are flagged and graded accordingly.</div>
                  </div>
                </div>
                <div className="aw-grade-process-step">
                  <div className="aw-grade-step-num">5</div>
                  <div>
                    <div className="aw-grade-step-title">Grade Assignment & QC</div>
                    <div className="aw-grade-step-desc">Final grade assigned based on combined results. Device is cleaned, data-wiped, and prepared for inventory.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── GRADE CARDS ── */}
        <div className="aw-grades-section">
          <div className="aw-grades-inner">
            <div className="aw-grades-section-title">All Grades</div>
            <div className="aw-grade-cards">
              {GRADES.map(g => (
                <div key={g.name} className={`aw-grade-card tier-${g.tier}`}>
                  <div className="aw-grade-card-top">
                    <div className="aw-grade-card-label">
                      <div className="aw-grade-card-tier">
                        <div className="aw-grade-dot" />
                        <div className="aw-grade-card-tier-label">{g.tierLabel}</div>
                      </div>
                      <div className="aw-grade-card-name">{g.name}</div>
                    </div>
                    <div className="aw-grade-card-body">
                      <div className="aw-grade-card-desc">{g.desc}</div>
                      <div className="aw-grade-specs">
                        <div className="aw-grade-spec">
                          <div className="aw-grade-spec-label">Screen</div>
                          <div className="aw-grade-spec-value">{g.screen}</div>
                        </div>
                        <div className="aw-grade-spec">
                          <div className="aw-grade-spec-label">Body</div>
                          <div className="aw-grade-spec-value">{g.body}</div>
                        </div>
                        <div className="aw-grade-spec">
                          <div className="aw-grade-spec-label">Battery</div>
                          <div className="aw-grade-spec-value">{g.battery}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div className="aw-grade-cta">
          <div className="aw-grade-cta-inner">
            <div className="aw-grade-cta-title">Ready to Order?</div>
            <div className="aw-grade-cta-sub">
              Browse our full catalog with real-time stock across all grades, or apply for a wholesale account to unlock pricing.
            </div>
            <div className="aw-grade-cta-buttons">
              <a className="aw-grade-cta-primary" href="/catalog">
                Browse Catalog
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <a className="aw-grade-cta-secondary" href="/apply">Apply for Access</a>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}