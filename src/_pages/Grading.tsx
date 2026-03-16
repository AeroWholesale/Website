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
  .aw-grades-section { padding: 60px 40px 40px; }
  .aw-grades-inner { max-width: 1200px; margin: 0 auto; }
  .aw-grades-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
  .aw-grades-eyebrow::before { content: ''; width: 16px; height: 2px; background: var(--orange); border-radius: 1px; }
  .aw-grades-section-title { font-size: 24px; font-weight: 800; color: var(--navy); letter-spacing: -0.03em; margin-bottom: 4px; }
  .aw-grades-section-sub { font-size: 13.5px; color: var(--steel-dim); margin-bottom: 24px; }

  /* ── GRADE TABLE ── */
  .aw-grade-table-wrap { background: var(--white); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
  .aw-grade-table { width: 100%; border-collapse: collapse; }
  .aw-grade-table thead th { font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--steel-dim); text-align: left; padding: 12px 16px; background: var(--slate-bg); border-bottom: 1px solid var(--border); }
  .aw-grade-table thead th.col-center { text-align: center; }
  .aw-grade-table .group-row td { background: var(--slate-bg); font-size: 9.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--steel-dim); padding: 6px 16px; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .aw-grade-table .grade-row td { padding: 14px 16px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  .aw-grade-table .grade-row:last-child td { border-bottom: none; }
  .aw-grade-table .grade-row:hover td { background: var(--off-white); }

  /* ── GRADE PILLS ── */
  .aw-grade-pill { display: inline-block; font-size: 11.5px; font-weight: 700; padding: 4px 10px; border-radius: 20px; white-space: nowrap; }
  .tier-top  .aw-grade-pill { background: #f0fdf4; color: #15803d; }
  .tier-mid  .aw-grade-pill { background: #eff6ff; color: #1d4ed8; }
  .tier-good .aw-grade-pill { background: #f5f3ff; color: #6d28d9; }
  .tier-fair .aw-grade-pill { background: #fffbeb; color: #b45309; }

  .aw-grade-row-desc { font-size: 12.5px; color: var(--steel-dim); margin-top: 2px; }

  /* ── DOTS ── */
  .aw-dots { display: flex; gap: 4px; justify-content: center; }
  .aw-dot { width: 9px; height: 9px; border-radius: 50%; background: var(--border-mid); flex-shrink: 0; }
  .tier-top  .aw-dot.on { background: #15803d; }
  .tier-mid  .aw-dot.on { background: #1d4ed8; }
  .tier-good .aw-dot.on { background: #6d28d9; }
  .tier-fair .aw-dot.on { background: #b45309; }

  /* ── BATTERY ── */
  .aw-batt { font-size: 13px; font-weight: 700; text-align: center; }
  .aw-batt.ok  { color: #15803d; }
  .aw-batt.low { color: #9ca3af; }

  /* ── TRUST SECTION ── */
  .aw-trust-section { padding: 0 40px 72px; }
  .aw-trust-inner { max-width: 1200px; margin: 0 auto; }
  .aw-trust-card { background: var(--white); border: 1px solid var(--border); border-radius: 12px; padding: 36px 40px; }
  .aw-trust-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 6px; display: flex; align-items: center; gap: 8px; }
  .aw-trust-eyebrow::before { content: ''; width: 16px; height: 2px; background: var(--orange); border-radius: 1px; }
  .aw-trust-title { font-size: 20px; font-weight: 800; color: var(--navy); letter-spacing: -0.02em; margin-bottom: 28px; }
  .aw-trust-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
  .aw-trust-item { background: var(--slate-bg); border: 1px solid var(--border); border-radius: 10px; padding: 20px 18px; }
  .aw-trust-icon { width: 36px; height: 36px; margin-bottom: 12px; }
  .aw-trust-label { font-size: 13.5px; font-weight: 700; color: var(--navy); line-height: 1.4; }
  .aw-trust-cta { background: var(--navy-dark); border-radius: 10px; padding: 22px 28px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
  .aw-trust-cta-text h3 { font-size: 15px; font-weight: 800; color: var(--white); margin: 0 0 4px; letter-spacing: -0.01em; }
  .aw-trust-cta-text p  { font-size: 13px; color: #7b90b2; margin: 0; }
  .aw-trust-cta-btns { display: flex; gap: 10px; flex-shrink: 0; }
  .aw-trust-btn-primary { display: inline-flex; align-items: center; gap: 6px; background: var(--orange); color: var(--white); font-size: 13.5px; font-weight: 700; padding: 11px 20px; border-radius: 7px; border: none; cursor: pointer; font-family: inherit; text-decoration: none; transition: background 0.15s, transform 0.1s; }
  .aw-trust-btn-primary:hover { background: #a33509; transform: translateY(-1px); }
  .aw-trust-btn-secondary { display: inline-flex; align-items: center; gap: 6px; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.75); font-size: 13.5px; font-weight: 600; padding: 11px 18px; border-radius: 7px; border: 1px solid rgba(255,255,255,0.12); cursor: pointer; font-family: inherit; text-decoration: none; transition: all 0.15s; }
  .aw-trust-btn-secondary:hover { background: rgba(255,255,255,0.12); color: var(--white); }

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
    .aw-trust-grid { grid-template-columns: 1fr 1fr; }
    .aw-trust-cta { flex-direction: column; align-items: flex-start; }
  }
  @media (max-width: 640px) {
    .aw-grade-header, .aw-grade-intro, .aw-grades-section, .aw-trust-section, .aw-grade-cta { padding-left: 20px; padding-right: 20px; }
    .aw-grade-page-title { font-size: 24px; }
    .aw-grade-intro-stats { grid-template-columns: 1fr; }
    .aw-grade-cta-buttons { flex-direction: column; }
    .aw-trust-cta-btns { flex-direction: column; width: 100%; }
  }
`

type Grade = {
  name: string
  tier: 'top' | 'mid' | 'good' | 'fair'
  tierLabel: string
  desc: string
  screenScore: number
  bodyScore: number
  batteryLabel: string
  batteryLow: boolean
}

const GRADES: Grade[] = [
  { name: 'Premium+',        tier: 'top',  tierLabel: 'Highest Tier',    desc: 'Like new — no signs of previous use',               screenScore: 5, bodyScore: 5, batteryLabel: '100%', batteryLow: false },
  { name: 'Premium',         tier: 'top',  tierLabel: 'Highest Tier',    desc: 'Near new, minimal handling marks',                  screenScore: 5, bodyScore: 5, batteryLabel: '90%+', batteryLow: false },
  { name: 'Excellent',       tier: 'mid',  tierLabel: 'High Quality',    desc: 'Light use — micro-scratches only under direct light', screenScore: 4, bodyScore: 4, batteryLabel: '80%+', batteryLow: false },
  { name: 'Good',            tier: 'good', tierLabel: 'Solid Value',     desc: 'Visible wear, fully functional, no cracks',         screenScore: 4, bodyScore: 3, batteryLabel: '80%+', batteryLow: false },
  { name: 'Good (Low Batt)', tier: 'good', tierLabel: 'Solid Value',     desc: 'Same cosmetics as Good, lower battery',             screenScore: 4, bodyScore: 3, batteryLabel: '<80%', batteryLow: true  },
  { name: 'Fair',            tier: 'fair', tierLabel: 'Budget Friendly', desc: 'Heavy cosmetic wear, fully tested',                 screenScore: 3, bodyScore: 2, batteryLabel: '80%+', batteryLow: false },
  { name: 'Fair–',           tier: 'fair', tierLabel: 'Budget Friendly', desc: 'Significant wear, possible dents',                  screenScore: 2, bodyScore: 2, batteryLabel: '75%+', batteryLow: false },
  { name: 'Fair (Low Batt)', tier: 'fair', tierLabel: 'Budget Friendly', desc: 'Budget cosmetics + battery below 80%',              screenScore: 3, bodyScore: 2, batteryLabel: '<80%', batteryLow: true  },
]

const TIER_LABELS = ['Highest Tier', 'High Quality', 'Solid Value', 'Budget Friendly'] as const

function Dots({ score, tier }: { score: number; tier: string }) {
  return (
    <div className={`aw-dots tier-${tier}`}>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className={`aw-dot${i <= score ? ' on' : ''}`} />
      ))}
    </div>
  )
}

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

        {/* ── GRADE TABLE ── */}
        <div className="aw-grades-section">
          <div className="aw-grades-inner">
            <div className="aw-grades-eyebrow">All Grades</div>
            <div className="aw-grades-section-title">Grade Comparison</div>
            <div className="aw-grades-section-sub">Every grade is fully functional and tested — grades reflect cosmetic condition and battery health only.</div>
            <div className="aw-grade-table-wrap">
              <table className="aw-grade-table">
                <thead>
                  <tr>
                    <th style={{ width: '180px' }}>Grade</th>
                    <th>Description</th>
                    <th className="col-center" style={{ width: '110px' }}>Screen</th>
                    <th className="col-center" style={{ width: '110px' }}>Body</th>
                    <th className="col-center" style={{ width: '80px' }}>Battery</th>
                  </tr>
                </thead>
                <tbody>
                  {TIER_LABELS.map(tierLabel => (
                    <>
                      <tr key={tierLabel} className="group-row">
                        <td colSpan={5}>{tierLabel}</td>
                      </tr>
                      {GRADES.filter(g => g.tierLabel === tierLabel).map(g => (
                        <tr key={g.name} className={`grade-row tier-${g.tier}`}>
                          <td><span className="aw-grade-pill">{g.name}</span></td>
                          <td><div className="aw-grade-row-desc">{g.desc}</div></td>
                          <td><Dots score={g.screenScore} tier={g.tier} /></td>
                          <td><Dots score={g.bodyScore} tier={g.tier} /></td>
                          <td><div className={`aw-batt ${g.batteryLow ? 'low' : 'ok'}`}>{g.batteryLabel}</div></td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ── TRUST SECTION ── */}
        <div className="aw-trust-section">
          <div className="aw-trust-inner">
            <div className="aw-trust-card">
              <div className="aw-trust-eyebrow">Every Device</div>
              <div className="aw-trust-title">What's always included</div>
              <div className="aw-trust-grid">
                <div className="aw-trust-item">
                  <svg className="aw-trust-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="9" fill="#132347" fillOpacity="0.08"/>
                    <path d="M11 18.5l5 5 9-9" stroke="#132347" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="aw-trust-label">Full functionality testing</div>
                </div>
                <div className="aw-trust-item">
                  <svg className="aw-trust-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="9" fill="#132347" fillOpacity="0.08"/>
                    <rect x="11" y="14" width="13" height="9" rx="2" stroke="#132347" strokeWidth="1.75"/>
                    <path d="M24 17h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2" stroke="#132347" strokeWidth="1.5"/>
                    <path d="M14 14v-2a4 4 0 0 1 8 0v2" stroke="#132347" strokeWidth="1.75" strokeLinecap="round"/>
                  </svg>
                  <div className="aw-trust-label">Battery health verification</div>
                </div>
                <div className="aw-trust-item">
                  <svg className="aw-trust-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="9" fill="#132347" fillOpacity="0.08"/>
                    <rect x="11" y="9" width="14" height="18" rx="2.5" stroke="#132347" strokeWidth="1.75"/>
                    <path d="M14 15h8M14 19h5" stroke="#132347" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M21 23l2.5 2.5" stroke="#c2410c" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <div className="aw-trust-label">Data wipe &amp; factory reset</div>
                </div>
                <div className="aw-trust-item">
                  <svg className="aw-trust-icon" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="36" height="36" rx="9" fill="#132347" fillOpacity="0.08"/>
                    <circle cx="18" cy="18" r="7" stroke="#132347" strokeWidth="1.75"/>
                    <path d="M18 11V9M18 27v-2M11 18H9M27 18h-2" stroke="#132347" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="18" cy="18" r="2.5" fill="#132347"/>
                  </svg>
                  <div className="aw-trust-label">Clean ESN / IMEI check</div>
                </div>
              </div>
              <div className="aw-trust-cta">
                <div className="aw-trust-cta-text">
                  <h3>Ready to browse inventory?</h3>
                  <p>Real-time stock across all grades — apply for a wholesale account to unlock pricing.</p>
                </div>
                <div className="aw-trust-cta-btns">
                  <a className="aw-trust-btn-primary" href="/catalog">
                    Browse Catalog
                    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </a>
                  <a className="aw-trust-btn-secondary" href="/apply">Apply for Access</a>
                </div>
              </div>
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
