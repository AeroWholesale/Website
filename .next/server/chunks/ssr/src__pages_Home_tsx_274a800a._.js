module.exports=[90094,a=>{"use strict";var b=a.i(7997),c=a.i(717),d=a.i(47485);let e=`
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

  .aw-home { font-family: 'DM Sans', sans-serif; background: var(--off-white); color: var(--text-dark); -webkit-font-smoothing: antialiased; }

  /* ── TRUST BAR ── */
  .aw-trust-bar { background: var(--white); border-bottom: 1px solid var(--border); padding: 0 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
  .aw-trust-bar::-webkit-scrollbar { display: none; }
  .aw-trust-inner { max-width: 1200px; margin: 0 auto; display: flex; align-items: stretch; justify-content: center; min-width: max-content; }
  .aw-trust-item { display: flex; align-items: center; gap: 10px; font-size: 12.5px; font-weight: 600; color: var(--steel); padding: 14px 24px; border-right: 1px solid var(--border); letter-spacing: -0.01em; white-space: nowrap; }
  .aw-trust-item:last-child { border-right: none; }
  .aw-trust-item svg { color: var(--steel-lt); flex-shrink: 0; }

  /* ── HERO ── */
  .aw-hero { background: var(--navy-dark); background-image: radial-gradient(ellipse 60% 50% at 90% 50%, rgba(194,65,12,0.1) 0%, transparent 60%), radial-gradient(ellipse 40% 60% at 10% 80%, rgba(19,35,71,0.8) 0%, transparent 70%), linear-gradient(160deg, var(--navy-dark) 0%, var(--navy-deep) 100%); padding: 72px 40px 64px; position: relative; overflow: hidden; }
  .aw-hero::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px); pointer-events: none; }
  .aw-hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: center; position: relative; z-index: 1; }
  .aw-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.25); color: #dce8f5; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; padding: 5px 12px; border-radius: 4px; margin-bottom: 24px; }
  .aw-hero-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; flex-shrink: 0; }
  .aw-hero-title { font-size: 50px; font-weight: 900; color: var(--white); letter-spacing: -0.04em; line-height: 1.06; margin-bottom: 22px; }
  .aw-hero-title em { font-style: normal; color: var(--orange-lt); }
  .aw-hero-sub { font-size: 16px; color: #7b90b2; line-height: 1.7; max-width: 480px; margin-bottom: 36px; font-weight: 400; }
  .aw-hero-ctas { display: flex; gap: 12px; align-items: center; margin-bottom: 48px; flex-wrap: wrap; }
  .aw-cta-primary { display: inline-flex; align-items: center; gap: 9px; background: var(--orange); color: var(--white); font-size: 14px; font-weight: 700; padding: 14px 26px; border-radius: 7px; cursor: pointer; letter-spacing: -0.01em; transition: background 0.15s, transform 0.1s; box-shadow: 0 4px 16px rgba(194,65,12,0.35); border: none; font-family: inherit; }
  .aw-cta-primary:hover { background: #a33509; transform: translateY(-1px); }
  .aw-cta-secondary { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.75); font-size: 14px; font-weight: 600; padding: 14px 22px; border-radius: 7px; cursor: pointer; border: 1px solid rgba(255,255,255,0.12); transition: all 0.15s; font-family: inherit; }
  .aw-cta-secondary:hover { background: rgba(255,255,255,0.12); color: var(--white); }
  .aw-hero-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 32px; }
  .aw-hero-stat { padding: 0 20px 0 0; }
  .aw-hero-stat + .aw-hero-stat { border-left: 1px solid rgba(255,255,255,0.08); padding-left: 20px; }
  .aw-stat-num { font-size: 30px; font-weight: 800; color: var(--white); line-height: 1; margin-bottom: 5px; letter-spacing: -0.03em; }
  .aw-stat-num em { font-style: normal; color: var(--orange-lt); }
  .aw-stat-label { font-size: 11px; color: #7b90b2; font-weight: 500; text-transform: uppercase; letter-spacing: 0.07em; }

  /* ── PROOF BLOCK ── */
  .aw-hero-proof { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 12px; padding: 28px; backdrop-filter: blur(4px); }
  .aw-proof-title { font-size: 11px; font-weight: 700; color: #9ab0c8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
  .aw-proof-title::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.06); }
  .aw-proof-item { display: flex; align-items: flex-start; gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.06); }
  .aw-proof-item:last-child { border-bottom: none; padding-bottom: 0; }
  .aw-proof-icon { width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .aw-proof-icon svg { width: 16px; height: 16px; }
  .aw-proof-label { font-size: 13px; font-weight: 700; color: #f0f6ff; margin-bottom: 2px; }
  .aw-proof-desc { font-size: 12px; color: #a8c0d8; line-height: 1.5; }

  /* ── SHARED SECTION ── */
  .aw-section { padding: 72px 40px; }
  .aw-section-inner { max-width: 1200px; margin: 0 auto; }
  .aw-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--orange); margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
  .aw-eyebrow::before { content: ''; width: 16px; height: 2px; background: var(--orange); border-radius: 1px; }
  .aw-section-title { font-size: 30px; font-weight: 800; color: var(--navy); letter-spacing: -0.03em; margin-bottom: 10px; line-height: 1.15; }
  .aw-section-sub { font-size: 14.5px; color: var(--steel-dim); max-width: 500px; line-height: 1.65; margin-bottom: 40px; }

  /* ── CATEGORIES ── */
  .aw-categories { background: var(--white); }
  .aw-cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .aw-cat-card { background: var(--off-white); border: 1px solid var(--border); border-radius: 10px; padding: 28px 22px 22px; cursor: pointer; transition: all 0.18s; position: relative; overflow: hidden; }
  .aw-cat-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: var(--navy); transform: scaleX(0); transition: transform 0.18s; transform-origin: left; }
  .aw-cat-card:hover { border-color: var(--navy-mid); box-shadow: 0 6px 20px rgba(19,35,71,0.1); transform: translateY(-2px); }
  .aw-cat-card:hover::after { transform: scaleX(1); }
  .aw-cat-icon { width: 48px; height: 48px; border-radius: 10px; background: var(--slate-bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
  .aw-cat-icon svg { width: 24px; height: 24px; color: var(--navy); }
  .aw-cat-name { font-size: 15px; font-weight: 800; color: var(--navy); margin-bottom: 4px; letter-spacing: -0.02em; }
  .aw-cat-meta { font-size: 12px; color: var(--text-muted); font-weight: 500; margin-bottom: 14px; line-height: 1.4; }
  .aw-cat-link { font-size: 12px; color: var(--orange); font-weight: 700; display: flex; align-items: center; gap: 5px; }
  .aw-cat-link svg { width: 12px; height: 12px; transition: transform 0.15s; }
  .aw-cat-card:hover .aw-cat-link svg { transform: translateX(3px); }

  /* ── FEATURED PRODUCTS ── */
  .aw-featured { background: var(--slate-bg); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .aw-featured-header { display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 28px; gap: 12px; }
  .aw-view-all { font-size: 13px; font-weight: 700; color: var(--navy); cursor: pointer; display: flex; align-items: center; gap: 5px; white-space: nowrap; flex-shrink: 0; }
  .aw-view-all:hover { color: var(--orange); }
  .aw-products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
  .aw-product-card { background: var(--white); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; cursor: pointer; transition: box-shadow 0.15s, transform 0.15s; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
  .aw-product-card:hover { box-shadow: 0 8px 28px rgba(19,35,71,0.12); transform: translateY(-2px); }
  .aw-card-img { height: 150px; background: var(--slate-bg); display: flex; align-items: center; justify-content: center; border-bottom: 1px solid var(--border); position: relative; overflow: hidden; }
  .aw-card-img img { max-height: 120px; max-width: 120px; object-fit: contain; }
  .aw-card-img svg { width: 56px; height: 56px; color: var(--steel); opacity: 0.5; }
  .aw-card-body { padding: 14px; }
  .aw-card-meta { display: flex; gap: 4px; margin-bottom: 6px; flex-wrap: wrap; }
  .aw-card-meta-tag { font-size: 10px; font-weight: 600; color: var(--steel-dim); background: var(--slate-bg); padding: 2px 7px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid var(--border); }
  .aw-card-name { font-size: 13.5px; font-weight: 700; color: var(--navy); margin-bottom: 8px; letter-spacing: -0.01em; line-height: 1.3; }
  .aw-card-grades { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px; }
  .aw-grade-pill { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 3px; border: 1px solid; }
  .aw-grade-cap1 { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
  .aw-grade-cap  { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
  .aw-grade-cap-plus { background: #f5f3ff; color: #6d28d9; border-color: #ddd6fe; }
  .aw-grade-ca   { background: #fefce8; color: #854d0e; border-color: #fef08a; }
  .aw-grade-sd   { background: #fff7ed; color: #9a3412; border-color: #fed7aa; }
  .aw-card-footer { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 10px; gap: 8px; }
  .aw-stock-dot { display: flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 600; color: #15803d; }
  .aw-stock-dot::before { content: ''; width: 6px; height: 6px; background: #22c55e; border-radius: 50%; flex-shrink: 0; }
  .aw-view-btn { font-size: 12px; font-weight: 700; color: var(--white); background: var(--navy); padding: 5px 12px; border-radius: 5px; cursor: pointer; letter-spacing: -0.01em; transition: background 0.13s; border: none; font-family: inherit; white-space: nowrap; }
  .aw-view-btn:hover { background: var(--navy-mid); }

  /* ── SKELETON LOADER ── */
  .aw-skeleton { animation: aw-pulse 1.5s ease-in-out infinite; }
  @keyframes aw-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
  .aw-skeleton-img { height: 150px; background: #e2e8f0; border-bottom: 1px solid var(--border); }
  .aw-skeleton-body { padding: 14px; }
  .aw-skeleton-line { height: 10px; background: #e2e8f0; border-radius: 4px; margin-bottom: 8px; }

  /* ── BUYER TYPES ── */
  .aw-buyer-types { background: var(--white); }
  .aw-buyer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .aw-buyer-card { border: 1px solid var(--border); border-radius: 10px; padding: 28px; cursor: pointer; transition: all 0.18s; background: var(--white); }
  .aw-buyer-card:hover { border-color: var(--navy-mid); box-shadow: 0 6px 24px rgba(19,35,71,0.09); transform: translateY(-2px); }
  .aw-buyer-card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; }
  .aw-buyer-card-icon { width: 44px; height: 44px; border-radius: 9px; background: var(--slate-bg); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; }
  .aw-buyer-card-icon svg { width: 22px; height: 22px; color: var(--navy); }
  .aw-buyer-arrow { color: var(--border-mid); transition: color 0.15s; }
  .aw-buyer-card:hover .aw-buyer-arrow { color: var(--orange); }
  .aw-buyer-arrow svg { width: 18px; height: 18px; }
  .aw-buyer-name { font-size: 17px; font-weight: 800; color: var(--navy); margin-bottom: 6px; letter-spacing: -0.02em; }
  .aw-buyer-desc { font-size: 13px; color: var(--steel-dim); line-height: 1.65; margin-bottom: 18px; }
  .aw-buyer-features { list-style: none; padding: 0; margin: 0; }
  .aw-buyer-features li { font-size: 12.5px; color: var(--steel); padding: 5px 0; display: flex; align-items: center; gap: 9px; border-bottom: 1px solid var(--border); }
  .aw-buyer-features li:last-child { border-bottom: none; }
  .aw-buyer-features li svg { width: 13px; height: 13px; color: #22c55e; flex-shrink: 0; }

  /* ── WHY ── */
  .aw-why { background: var(--navy-dark); background-image: linear-gradient(160deg, var(--navy-dark) 0%, var(--navy-deep) 100%); border-top: 1px solid rgba(255,255,255,0.04); }
  .aw-why .aw-eyebrow { color: #fb923c; }
  .aw-why .aw-eyebrow::before { background: #fb923c; }
  .aw-why .aw-section-title { color: var(--white); }
  .aw-why .aw-section-sub { color: #9ab0c8; }
  .aw-why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.07); border-radius: 12px; overflow: hidden; }
  .aw-why-card { background: rgba(255,255,255,0.03); padding: 28px 26px; transition: background 0.15s; }
  .aw-why-card:hover { background: rgba(255,255,255,0.06); }
  .aw-why-card-icon { width: 40px; height: 40px; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
  .aw-why-card-icon svg { width: 18px; height: 18px; color: #93c5fd; }
  .aw-why-title { font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 7px; letter-spacing: -0.01em; }
  .aw-why-desc { font-size: 12.5px; color: #a8c0d8; line-height: 1.65; }

  /* ── HOW IT WORKS ── */
  .aw-how { background: var(--slate-bg); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
  .aw-steps-row { display: grid; grid-template-columns: repeat(4, 1fr); position: relative; gap: 0; }
  .aw-steps-connector { position: absolute; top: 22px; left: calc(12.5% + 22px); right: calc(12.5% + 22px); height: 1px; background: var(--border-mid); z-index: 0; }
  .aw-step-card { text-align: center; padding: 0 20px; position: relative; z-index: 1; }
  .aw-step-num { width: 44px; height: 44px; border-radius: 50%; background: var(--navy); color: var(--white); font-size: 16px; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; border: 3px solid var(--slate-bg); box-shadow: 0 0 0 2px var(--navy), 0 4px 12px rgba(19,35,71,0.2); }
  .aw-step-num.accent { background: var(--orange); box-shadow: 0 0 0 2px var(--orange), 0 4px 12px rgba(194,65,12,0.25); }
  .aw-step-title { font-size: 13.5px; font-weight: 700; color: var(--navy); margin-bottom: 6px; letter-spacing: -0.01em; }
  .aw-step-desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; }

  /* ── CTA ── */
  .aw-cta-section { background: var(--navy); background-image: linear-gradient(135deg, var(--navy) 0%, var(--navy-deep) 100%); padding: 88px 40px; text-align: center; border-top: 3px solid var(--orange); }
  .aw-cta-inner { max-width: 600px; margin: 0 auto; }
  .aw-cta-label { display: inline-flex; align-items: center; gap: 7px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #9ab0c8; margin-bottom: 18px; }
  .aw-cta-title { font-size: 40px; font-weight: 900; color: var(--white); letter-spacing: -0.04em; line-height: 1.1; margin-bottom: 16px; }
  .aw-cta-title em { font-style: normal; color: var(--orange-lt); }
  .aw-cta-sub { font-size: 15px; color: #9ab0c8; line-height: 1.65; margin-bottom: 36px; }
  .aw-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .aw-cta-btn-primary { background: var(--orange); color: var(--white); font-size: 14px; font-weight: 700; padding: 14px 30px; border-radius: 7px; cursor: pointer; letter-spacing: -0.01em; box-shadow: 0 4px 16px rgba(194,65,12,0.4); transition: all 0.15s; border: none; font-family: inherit; }
  .aw-cta-btn-primary:hover { background: #a33509; transform: translateY(-1px); }
  .aw-cta-btn-ghost { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.7); font-size: 14px; font-weight: 600; padding: 14px 28px; border-radius: 7px; cursor: pointer; border: 1px solid rgba(255,255,255,0.12); transition: all 0.15s; font-family: inherit; }
  .aw-cta-btn-ghost:hover { background: rgba(255,255,255,0.12); color: var(--white); }

  /* ── TABLET (≤1024px) ── */
  @media (max-width: 1024px) {
    .aw-hero { padding: 56px 24px 48px; }
    .aw-hero-inner { grid-template-columns: 1fr; gap: 0; }
    .aw-hero-title { font-size: 40px; }
    .aw-hero-proof { display: none; }
    .aw-section { padding: 56px 24px; }
    .aw-cat-grid { grid-template-columns: repeat(2, 1fr); }
    .aw-products-grid { grid-template-columns: repeat(2, 1fr); }
    .aw-buyer-grid { grid-template-columns: 1fr; gap: 12px; }
    .aw-why-grid { grid-template-columns: repeat(2, 1fr); }
    .aw-steps-row { grid-template-columns: repeat(2, 1fr); gap: 32px; }
    .aw-steps-connector { display: none; }
    .aw-step-card { text-align: left; display: flex; align-items: flex-start; gap: 16px; padding: 0; }
    .aw-step-num { margin: 0; flex-shrink: 0; }
    .aw-cta-section { padding: 56px 24px; }
    .aw-trust-bar { padding: 0 16px; }
  }

  /* ── MOBILE (≤640px) ── */
  @media (max-width: 640px) {
    .aw-hero { padding: 40px 16px 36px; }
    .aw-hero-title { font-size: 28px; }
    .aw-hero-sub { font-size: 14px; margin-bottom: 24px; }
    .aw-hero-ctas { flex-direction: column; align-items: stretch; gap: 10px; margin-bottom: 32px; }
    .aw-cta-primary, .aw-cta-secondary { justify-content: center; width: 100%; }
    .aw-hero-stats { padding-top: 24px; }
    .aw-stat-num { font-size: 22px; }
    .aw-stat-label { font-size: 9px; letter-spacing: 0.04em; }
    .aw-section { padding: 40px 16px; }
    .aw-section-title { font-size: 22px; }
    .aw-section-sub { font-size: 13.5px; margin-bottom: 28px; }
    .aw-cat-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .aw-cat-card { padding: 16px 14px; }
    .aw-cat-icon { width: 40px; height: 40px; margin-bottom: 10px; }
    .aw-cat-name { font-size: 13px; }
    .aw-cat-meta { display: none; }
    .aw-products-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .aw-card-img { height: 120px; }
    .aw-card-img img { max-height: 96px; max-width: 96px; }
    .aw-card-body { padding: 10px; }
    .aw-card-name { font-size: 12px; }
    .aw-card-footer { flex-wrap: wrap; }
    .aw-view-btn { width: 100%; text-align: center; padding: 7px; margin-top: 2px; }
    .aw-featured-header { flex-direction: column; align-items: flex-start; gap: 4px; margin-bottom: 20px; }
    .aw-why-grid { grid-template-columns: 1fr; }
    .aw-steps-row { grid-template-columns: 1fr; gap: 20px; }
    .aw-buyer-card { padding: 20px; }
    .aw-buyer-name { font-size: 15px; }
    .aw-cta-section { padding: 48px 16px; }
    .aw-cta-title { font-size: 26px; }
    .aw-cta-sub { font-size: 13.5px; }
    .aw-cta-btns { flex-direction: column; align-items: stretch; }
    .aw-cta-btn-primary, .aw-cta-btn-ghost { width: 100%; }
  }
`,f={CAP1:"Premium 100%",CAP:"Premium",NE:"New","CA+":"Excellent",CA:"Good",CAB:"Good (Batt<80%)",SD:"B-Grade","SD-":"C-Grade",SDB:"B/C (Batt<80%)"},g={CAP1:"cap1",NE:"cap1",CAP:"cap","CA+":"cap-plus",CA:"ca",CAB:"ca",SD:"sd","SD-":"sd",SDB:"sd"},h=()=>(0,b.jsxs)("svg",{width:"15",height:"15",fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",children:[(0,b.jsx)("path",{d:"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"}),(0,b.jsx)("path",{d:"M15 11a3 3 0 11-6 0 3 3 0 016 0z"})]}),i=()=>(0,b.jsx)("svg",{width:"15",height:"15",fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"})}),j=()=>(0,b.jsx)("svg",{width:"15",height:"15",fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"})}),k=()=>(0,b.jsx)("svg",{width:"15",height:"15",fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"})}),l=()=>(0,b.jsx)("svg",{width:"15",height:"15",fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"})}),m=({size:a=14})=>(0,b.jsx)("svg",{width:a,height:a,fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M5 12h14M12 5l7 7-7 7"})}),n=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.6",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"5",y:"2",width:"14",height:"20",rx:"2",ry:"2"}),(0,b.jsx)("line",{x1:"12",y1:"18",x2:"12.01",y2:"18",strokeWidth:"2.5",strokeLinecap:"round"})]}),o=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.6",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"3",y:"2",width:"18",height:"20",rx:"2",ry:"2"}),(0,b.jsx)("line",{x1:"12",y1:"18",x2:"12.01",y2:"18",strokeWidth:"2.5",strokeLinecap:"round"})]}),p=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.6",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),(0,b.jsx)("path",{d:"M2 20h20"})]}),q=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.6",viewBox:"0 0 24 24",children:[(0,b.jsx)("circle",{cx:"12",cy:"12",r:"4"}),(0,b.jsx)("rect",{x:"6",y:"6",width:"12",height:"12",rx:"3",ry:"3"}),(0,b.jsx)("line",{x1:"12",y1:"2",x2:"12",y2:"6"}),(0,b.jsx)("line",{x1:"12",y1:"18",x2:"12",y2:"22"})]}),r=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.8",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"})}),s=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.8",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"})}),t=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.8",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"})}),u=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.8",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"})}),v=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.8",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M13 10V3L4 14h7v7l9-11h-7z"})}),w=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.8",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"})}),x=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.8",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"})}),y=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.8",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"})}),z=()=>(0,b.jsx)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"2.5",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M5 13l4 4L19 7"})}),A=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.2",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"5",y:"2",width:"14",height:"20",rx:"2"}),(0,b.jsx)("circle",{cx:"12",cy:"17",r:"0.8",fill:"currentColor"})]}),B=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.2",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"3",y:"2",width:"18",height:"20",rx:"2"}),(0,b.jsx)("circle",{cx:"12",cy:"17",r:"0.8",fill:"currentColor"})]}),C=()=>(0,b.jsxs)("svg",{fill:"none",stroke:"currentColor",strokeWidth:"1.2",viewBox:"0 0 24 24",children:[(0,b.jsx)("rect",{x:"2",y:"4",width:"20",height:"14",rx:"2"}),(0,b.jsx)("path",{d:"M2 20h20"})]}),D=({category:a})=>"Tablets"===a?(0,b.jsx)(B,{}):"Laptops"===a?(0,b.jsx)(C,{}):(0,b.jsx)(A,{});function E(){let a=(0,d.useNavigate)(),[B,C]=(0,c.useState)([]),[E,F]=(0,c.useState)(!0);return(0,c.useEffect)(()=>{fetch("/api/catalog-public?sort=stock&size=4").then(a=>a.ok?a.json():null).then(a=>{a?.products&&C(a.products),F(!1)}).catch(()=>F(!1))},[]),(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:e}),(0,b.jsxs)("div",{className:"aw-home",children:[(0,b.jsx)("div",{className:"aw-trust-bar",children:(0,b.jsxs)("div",{className:"aw-trust-inner",children:[(0,b.jsxs)("div",{className:"aw-trust-item",children:[(0,b.jsx)(h,{}),"NJ Warehouse · In-House Operations"]}),(0,b.jsxs)("div",{className:"aw-trust-item",children:[(0,b.jsx)(i,{}),"Approved Buyers Only"]}),(0,b.jsxs)("div",{className:"aw-trust-item",children:[(0,b.jsx)(j,{}),"Real-Time Inventory"]}),(0,b.jsxs)("div",{className:"aw-trust-item",children:[(0,b.jsx)(k,{}),"Same-Day Shipping Available"]}),(0,b.jsxs)("div",{className:"aw-trust-item",children:[(0,b.jsx)(l,{}),"1-Business-Day Response"]})]})}),(0,b.jsx)("div",{className:"aw-hero",children:(0,b.jsxs)("div",{className:"aw-hero-inner",children:[(0,b.jsxs)("div",{children:[(0,b.jsxs)("div",{className:"aw-hero-eyebrow",children:[(0,b.jsx)("span",{className:"aw-hero-eyebrow-dot"}),"B2B Wholesale Only · Eatontown, NJ"]}),(0,b.jsxs)("div",{className:"aw-hero-title",children:["Refurbished Electronics",(0,b.jsx)("br",{}),"for ",(0,b.jsx)("em",{children:"Serious"})," Wholesale",(0,b.jsx)("br",{}),"Buyers"]}),(0,b.jsx)("div",{className:"aw-hero-sub",children:"iPhones, iPads, MacBooks, and Samsung — graded in-house, 100% QC tested, and shipped from our New Jersey warehouse. Approved buyers only."}),(0,b.jsxs)("div",{className:"aw-hero-ctas",children:[(0,b.jsxs)("button",{className:"aw-cta-primary",onClick:()=>a("/apply"),children:[(0,b.jsx)("svg",{width:"16",height:"16",fill:"none",stroke:"currentColor",strokeWidth:"2",viewBox:"0 0 24 24",children:(0,b.jsx)("path",{d:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"})}),"Apply for Access"]}),(0,b.jsxs)("button",{className:"aw-cta-secondary",onClick:()=>a("/catalog"),children:["Browse Catalog ",(0,b.jsx)(m,{})]})]}),(0,b.jsxs)("div",{className:"aw-hero-stats",children:[(0,b.jsxs)("div",{className:"aw-hero-stat",children:[(0,b.jsxs)("div",{className:"aw-stat-num",children:["1,500",(0,b.jsx)("em",{children:"+"})]}),(0,b.jsx)("div",{className:"aw-stat-label",children:"Active SKUs"})]}),(0,b.jsxs)("div",{className:"aw-hero-stat",children:[(0,b.jsxs)("div",{className:"aw-stat-num",children:["20",(0,b.jsx)("em",{children:"+"})]}),(0,b.jsx)("div",{className:"aw-stat-label",children:"Years Operating"})]}),(0,b.jsxs)("div",{className:"aw-hero-stat",children:[(0,b.jsx)("div",{className:"aw-stat-num",children:"90"}),(0,b.jsx)("div",{className:"aw-stat-label",children:"Day Warranty"})]})]})]}),(0,b.jsxs)("div",{className:"aw-hero-proof",children:[(0,b.jsx)("div",{className:"aw-proof-title",children:"Why buyers choose us"}),[{icon:(0,b.jsx)(r,{}),label:"In-House Grading — Not Outsourced",desc:"Our own team grades every device in our NJ warehouse. Same standard, every shipment, guaranteed."},{icon:(0,b.jsx)(s,{}),label:"100% QC Tested Before It Ships",desc:"Screen, battery health, buttons, cameras, connectivity — all verified. No surprises on delivery."},{icon:(0,b.jsx)(t,{}),label:"Live Inventory — Always Accurate",desc:"What you see is what's actually in our warehouse. We don't list phantom stock."},{icon:(0,b.jsx)(v,{}),label:"Same-Day Shipping Before 2PM EST",desc:"Orders placed before 2pm ship same day from our NJ facility. We know your business depends on it."}].map(a=>(0,b.jsxs)("div",{className:"aw-proof-item",children:[(0,b.jsx)("div",{className:"aw-proof-icon",children:a.icon}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"aw-proof-label",children:a.label}),(0,b.jsx)("div",{className:"aw-proof-desc",children:a.desc})]})]},a.label))]})]})}),(0,b.jsx)("div",{className:"aw-section aw-categories",children:(0,b.jsxs)("div",{className:"aw-section-inner",children:[(0,b.jsx)("div",{className:"aw-eyebrow",children:"What We Carry"}),(0,b.jsxs)("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:"32px",gap:"12px",flexWrap:"wrap"},children:[(0,b.jsx)("div",{className:"aw-section-title",style:{marginBottom:0},children:"Shop by Device Type"}),(0,b.jsxs)("div",{className:"aw-view-all",onClick:()=>a("/catalog"),children:["View full catalog ",(0,b.jsx)(m,{})]})]}),(0,b.jsx)("div",{className:"aw-cat-grid",children:[{icon:(0,b.jsx)(n,{}),name:"Phones",meta:"iPhone · Samsung Galaxy S & A",meta2:"All carriers · All storage tiers",category:"Phones"},{icon:(0,b.jsx)(o,{}),name:"Tablets",meta:"iPad · Samsung Galaxy Tab",meta2:"WiFi & Cellular configs",category:"Tablets"},{icon:(0,b.jsx)(p,{}),name:"Laptops",meta:"MacBook Air & Pro · M1–M3",meta2:"Multiple storage configs",category:"Laptops"},{icon:(0,b.jsx)(q,{}),name:"Wearables",meta:"Apple Watch · Samsung Galaxy Watch",meta2:"Google Pixel Watch",category:"Wearables"}].map(c=>(0,b.jsxs)("div",{className:"aw-cat-card",onClick:()=>a(`/catalog?category=${encodeURIComponent(c.category)}`),children:[(0,b.jsx)("div",{className:"aw-cat-icon",children:c.icon}),(0,b.jsx)("div",{className:"aw-cat-name",children:c.name}),(0,b.jsxs)("div",{className:"aw-cat-meta",children:[c.meta,(0,b.jsx)("br",{}),c.meta2]}),(0,b.jsxs)("div",{className:"aw-cat-link",children:["Browse ",c.name.split(" ")[0]," ",(0,b.jsx)(m,{size:12})]})]},c.name))})]})}),(0,b.jsx)("div",{className:"aw-section aw-featured",children:(0,b.jsxs)("div",{className:"aw-section-inner",children:[(0,b.jsxs)("div",{className:"aw-featured-header",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"aw-eyebrow",children:"In Stock Now"}),(0,b.jsx)("div",{className:"aw-section-title",style:{marginBottom:0},children:"Featured Products"})]}),(0,b.jsxs)("div",{className:"aw-view-all",onClick:()=>a("/catalog"),children:["View full catalog ",(0,b.jsx)(m,{})]})]}),(0,b.jsx)("div",{className:"aw-products-grid",children:E?Array.from({length:4}).map((a,c)=>(0,b.jsxs)("div",{className:"aw-product-card aw-skeleton",children:[(0,b.jsx)("div",{className:"aw-skeleton-img"}),(0,b.jsxs)("div",{className:"aw-skeleton-body",children:[(0,b.jsx)("div",{className:"aw-skeleton-line",style:{width:"50%"}}),(0,b.jsx)("div",{className:"aw-skeleton-line",style:{width:"80%",height:14}}),(0,b.jsx)("div",{className:"aw-skeleton-line",style:{width:"40%"}})]})]},c)):0===B.length?Array.from({length:4}).map((a,c)=>(0,b.jsxs)("div",{className:"aw-product-card",children:[(0,b.jsx)("div",{className:"aw-card-img",children:(0,b.jsx)(A,{})}),(0,b.jsx)("div",{className:"aw-card-body",children:(0,b.jsx)("div",{className:"aw-card-name",style:{color:"#94a3b8"},children:"No products available"})})]},c)):B.map(c=>(0,b.jsxs)("div",{className:"aw-product-card",onClick:()=>a(`/catalog/${encodeURIComponent(c.modelCode)}`),children:[(0,b.jsx)("div",{className:"aw-card-img",children:c.image?(0,b.jsx)("img",{src:c.image,alt:c.name}):(0,b.jsx)(D,{category:c.category})}),(0,b.jsxs)("div",{className:"aw-card-body",children:[(0,b.jsxs)("div",{className:"aw-card-meta",children:[(0,b.jsx)("span",{className:"aw-card-meta-tag",children:c.brand}),(0,b.jsx)("span",{className:"aw-card-meta-tag",children:c.category})]}),(0,b.jsx)("div",{className:"aw-card-name",children:c.name}),(0,b.jsx)("div",{className:"aw-card-grades",children:c.grades.slice(0,3).map(a=>(0,b.jsx)("span",{className:`aw-grade-pill aw-grade-${g[a]||"ca"}`,children:f[a]||a},a))}),(0,b.jsxs)("div",{className:"aw-card-footer",children:[(0,b.jsxs)("span",{className:"aw-stock-dot",children:[c.totalStock.toLocaleString()," in stock"]}),(0,b.jsx)("button",{className:"aw-view-btn",onClick:b=>{b.stopPropagation(),a(`/catalog/${encodeURIComponent(c.modelCode)}`)},children:"View"})]})]})]},c.modelCode))})]})}),(0,b.jsx)("div",{className:"aw-section aw-buyer-types",children:(0,b.jsxs)("div",{className:"aw-section-inner",children:[(0,b.jsx)("div",{className:"aw-eyebrow",children:"Who We Work With"}),(0,b.jsx)("div",{className:"aw-section-title",children:"Built for Serious Buyers"}),(0,b.jsx)("div",{className:"aw-section-sub",children:"Wholesale accounts are approved — not open to the public. We work with businesses that know what they need."}),(0,b.jsx)("div",{className:"aw-buyer-grid",children:[{icon:(0,b.jsx)(x,{}),name:"Enterprise",path:"/buyers/enterprise",desc:"Corporate IT departments, school districts, and government agencies deploying devices at scale.",features:["Volume pricing tiers","Dedicated account manager","Custom configuration available","Secure payments"]},{icon:(0,b.jsx)(j,{}),name:"Wholesale",path:"/buyers/wholesale",desc:"Secondary market dealers and redistribution businesses buying bulk across multiple grades.",features:["Mixed-grade lot configurations","High-volume discounts","Weekly restock notifications","Flexible order quantities"]},{icon:(0,b.jsx)(y,{}),name:"Resellers",path:"/buyers/resellers",desc:"eBay powersellers, Back Market merchants, Amazon sellers, and storefront retailers.",features:["Grades map to marketplace standards","Battery % documented per unit","Consistent weekly supply","Low return rates from accurate grading"]}].map(c=>(0,b.jsxs)("div",{className:"aw-buyer-card",onClick:()=>a(c.path),children:[(0,b.jsxs)("div",{className:"aw-buyer-card-top",children:[(0,b.jsx)("div",{className:"aw-buyer-card-icon",children:c.icon}),(0,b.jsx)("div",{className:"aw-buyer-arrow",children:(0,b.jsx)(m,{size:18})})]}),(0,b.jsx)("div",{className:"aw-buyer-name",children:c.name}),(0,b.jsx)("div",{className:"aw-buyer-desc",children:c.desc}),(0,b.jsx)("ul",{className:"aw-buyer-features",children:c.features.map(a=>(0,b.jsxs)("li",{children:[(0,b.jsx)(z,{}),a]},a))})]},c.name))})]})}),(0,b.jsx)("div",{className:"aw-section aw-why",children:(0,b.jsxs)("div",{className:"aw-section-inner",children:[(0,b.jsx)("div",{className:"aw-eyebrow",children:"Why AeroWholesale"}),(0,b.jsx)("div",{className:"aw-section-title",children:"The Infrastructure Behind the Inventory"}),(0,b.jsx)("div",{className:"aw-section-sub",children:"20 years in this business taught us one thing: buyers remember the supplier who never surprised them."}),(0,b.jsx)("div",{className:"aw-why-grid",children:[{icon:(0,b.jsx)(r,{}),title:"In-House Grading — Not Outsourced",desc:"Our own team grades every device. No third parties, no inconsistency. Same standard every shipment."},{icon:(0,b.jsx)(s,{}),title:"100% Multi-Point QC Testing",desc:"Screen, battery health, buttons, cameras, connectivity — all checked before grading. Every unit."},{icon:(0,b.jsx)(t,{}),title:"Real-Time Stock — Always Accurate",desc:"What's listed is what's in the building. No ghost inventory, no overselling, no wasted orders."},{icon:(0,b.jsx)(u,{}),title:"Approved Wholesale Buyers Only",desc:"No public pricing. No retail customers. You're buying alongside verified wholesale operators."},{icon:(0,b.jsx)(v,{}),title:"Same-Day Fulfillment",desc:"Orders before 2PM EST ship same day from our NJ warehouse. Your business can't wait and neither do we."},{icon:(0,b.jsx)(w,{}),title:"Direct Line to Our Team",desc:"Real people, same-day responses. No ticketing queues, no runaround. buyers@aerowholesale.com."}].map(a=>(0,b.jsxs)("div",{className:"aw-why-card",children:[(0,b.jsx)("div",{className:"aw-why-card-icon",children:a.icon}),(0,b.jsx)("div",{className:"aw-why-title",children:a.title}),(0,b.jsx)("div",{className:"aw-why-desc",children:a.desc})]},a.title))})]})}),(0,b.jsx)("div",{className:"aw-section aw-how",children:(0,b.jsxs)("div",{className:"aw-section-inner",children:[(0,b.jsx)("div",{className:"aw-eyebrow",children:"Getting Started"}),(0,b.jsx)("div",{className:"aw-section-title",children:"How to Get Access"}),(0,b.jsx)("div",{className:"aw-section-sub",style:{marginBottom:"48px"},children:"From application to first order in as little as 24 hours."}),(0,b.jsxs)("div",{className:"aw-steps-row",children:[(0,b.jsx)("div",{className:"aw-steps-connector"}),[{n:"1",title:"Apply for Access",desc:"Fill out the wholesale application with your business details and how you operate.",accent:!1},{n:"2",title:"We Review",desc:"Our team reviews your application within 1 business day.",accent:!1},{n:"3",title:"Get Approved",desc:"Receive your login credentials with access to live pricing, stock levels, and the quote cart.",accent:!0},{n:"4",title:"Start Ordering",desc:"Browse the full catalog, build a quote cart, and submit. We'll handle the rest.",accent:!0}].map(a=>(0,b.jsxs)("div",{className:"aw-step-card",children:[(0,b.jsx)("div",{className:`aw-step-num${a.accent?" accent":""}`,children:a.n}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"aw-step-title",children:a.title}),(0,b.jsx)("div",{className:"aw-step-desc",children:a.desc})]})]},a.n))]})]})}),(0,b.jsx)("div",{className:"aw-cta-section",children:(0,b.jsxs)("div",{className:"aw-cta-inner",children:[(0,b.jsx)("div",{className:"aw-cta-label",children:"Ready to work with a serious supplier?"}),(0,b.jsxs)("div",{className:"aw-cta-title",children:["Apply for a",(0,b.jsx)("br",{}),(0,b.jsx)("em",{children:"Wholesale Account"})]}),(0,b.jsx)("div",{className:"aw-cta-sub",children:"Approved buyers get access to live pricing, real-time stock, and a dedicated quote cart — all backed by 20+ years of in-house operations."}),(0,b.jsxs)("div",{className:"aw-cta-btns",children:[(0,b.jsx)("button",{className:"aw-cta-btn-primary",onClick:()=>a("/apply"),children:"Apply for Access"}),(0,b.jsx)("button",{className:"aw-cta-btn-ghost",onClick:()=>a("/catalog"),children:"Browse the Catalog"})]})]})})]})]})}a.s(["default",()=>E])}];

//# sourceMappingURL=src__pages_Home_tsx_274a800a._.js.map