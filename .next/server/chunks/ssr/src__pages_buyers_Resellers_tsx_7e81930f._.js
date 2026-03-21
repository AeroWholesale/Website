module.exports=[83319,a=>{"use strict";var b=a.i(7997),c=a.i(47485);let d=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .rs-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #0f172a; -webkit-font-smoothing: antialiased; }

  /* HERO */
  .rs-hero { background: #0c1730; background-image: radial-gradient(ellipse 60% 80% at 100% 40%, rgba(194,65,12,0.1) 0%, transparent 60%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 80px 40px 72px; position: relative; overflow: hidden; }
  .rs-hero::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 80px); pointer-events: none; }
  .rs-hero-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 1; }
  .rs-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(194,65,12,0.15); border: 1px solid rgba(194,65,12,0.3); border-radius: 20px; padding: 5px 14px; font-size: 11px; font-weight: 700; color: #fb923c; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
  .rs-hero-title { font-size: 46px; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 20px; }
  .rs-hero-title span { color: #c2410c; }
  .rs-hero-sub { font-size: 16px; color: #a8c0d8; line-height: 1.7; margin-bottom: 32px; }
  .rs-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .rs-btn-primary { background: #c2410c; color: #fff; border: none; border-radius: 8px; padding: 13px 28px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .rs-btn-primary:hover { background: #a33509; }
  .rs-btn-ghost { background: rgba(255,255,255,0.07); color: #e2e8f0; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 13px 28px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .rs-btn-ghost:hover { background: rgba(255,255,255,0.12); }

  .rs-hero-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 28px; }
  .rs-hero-card-title { font-size: 13px; font-weight: 700; color: #7b90b2; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 20px; }
  .rs-margin-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .rs-margin-row:last-child { border-bottom: none; }
  .rs-margin-grade { font-size: 13px; font-weight: 600; color: #e2e8f0; }
  .rs-margin-pill { font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px; }
  .rs-mp-green { background: rgba(16,185,129,0.2); color: #34d399; }
  .rs-mp-blue { background: rgba(59,130,246,0.2); color: #93c5fd; }
  .rs-mp-yellow { background: rgba(234,179,8,0.2); color: #fde047; }

  /* TRUST BAR */
  .rs-trust { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 18px 40px; }
  .rs-trust-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 32px; flex-wrap: wrap; justify-content: center; }
  .rs-trust-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #334155; white-space: nowrap; }
  .rs-trust-dot { width: 6px; height: 6px; border-radius: 50%; background: #c2410c; flex-shrink: 0; }

  /* SECTIONS */
  .rs-section { padding: 72px 40px; }
  .rs-section-inner { max-width: 1100px; margin: 0 auto; }
  .rs-section-alt { background: #fff; }

  .rs-section-label { font-size: 11px; font-weight: 700; color: #c2410c; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px; }
  .rs-section-title { font-size: 34px; font-weight: 900; color: #132347; letter-spacing: -0.02em; margin-bottom: 14px; line-height: 1.1; }
  .rs-section-sub { font-size: 16px; color: #475569; line-height: 1.7; max-width: 580px; }

  /* FEATURES */
  .rs-features { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
  .rs-feature { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; }
  .rs-feature-icon { font-size: 24px; margin-bottom: 14px; }
  .rs-feature-title { font-size: 14px; font-weight: 800; color: #132347; margin-bottom: 8px; }
  .rs-feature-desc { font-size: 13px; color: #64748b; line-height: 1.6; }

  /* GRADES TABLE */
  .rs-grades-table { margin-top: 40px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
  .rs-grades-header { display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 0; background: #f8fafc; border-bottom: 1px solid #e2e8f0; padding: 12px 20px; }
  .rs-grades-header span { font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; }
  .rs-grades-row { display: grid; grid-template-columns: 1fr 1fr 2fr; gap: 0; padding: 14px 20px; border-bottom: 1px solid #e2e8f0; align-items: center; }
  .rs-grades-row:last-child { border-bottom: none; }
  .rs-grade-name { font-size: 14px; font-weight: 700; color: #132347; }
  .rs-grade-badge { display: inline-block; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
  .rs-gb-blue { background: #eff6ff; color: #1d4ed8; }
  .rs-gb-green { background: #ecfdf5; color: #047857; }
  .rs-gb-yellow { background: #fefce8; color: #854d0e; }
  .rs-gb-orange { background: #fff7ed; color: #9a3412; }
  .rs-grade-note { font-size: 12px; color: #64748b; line-height: 1.5; }

  /* CHANNELS */
  .rs-channels { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 40px; }
  .rs-channel { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; display: flex; gap: 16px; align-items: flex-start; }
  .rs-channel-icon { width: 40px; height: 40px; background: #132347; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .rs-channel-title { font-size: 14px; font-weight: 800; color: #132347; margin-bottom: 5px; }
  .rs-channel-desc { font-size: 13px; color: #64748b; line-height: 1.6; }

  /* CTA */
  .rs-cta { background: linear-gradient(135deg, #132347 0%, #0c1730 100%); border-radius: 16px; padding: 56px 48px; text-align: center; margin-top: 60px; position: relative; overflow: hidden; }
  .rs-cta::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(194,65,12,0.2) 0%, transparent 70%); pointer-events: none; }
  .rs-cta-title { font-size: 30px; font-weight: 900; color: #fff; letter-spacing: -0.02em; margin-bottom: 12px; }
  .rs-cta-sub { font-size: 15px; color: #a8c0d8; margin-bottom: 28px; line-height: 1.6; }
  .rs-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  @media (max-width: 1024px) {
    .rs-hero-inner { grid-template-columns: 1fr; gap: 40px; }
    .rs-hero-title { font-size: 36px; }
    .rs-features { grid-template-columns: repeat(2, 1fr); }
    .rs-channels { grid-template-columns: 1fr; }
  }
  @media (max-width: 640px) {
    .rs-hero { padding: 48px 20px; }
    .rs-hero-title { font-size: 28px; }
    .rs-section { padding: 48px 20px; }
    .rs-features { grid-template-columns: 1fr; }
    .rs-cta { padding: 36px 24px; }
    .rs-trust { padding: 14px 20px; }
    .rs-hero-btns { flex-direction: column; }
    .rs-btn-primary, .rs-btn-ghost { width: 100%; text-align: center; }
    .rs-grades-header, .rs-grades-row { grid-template-columns: 1fr 1fr; }
    .rs-grades-header span:last-child, .rs-grade-note { display: none; }
  }
`;function e(){let a=(0,c.useNavigate)();return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:d}),(0,b.jsxs)("div",{className:"rs-page",children:[(0,b.jsx)("div",{className:"rs-hero",children:(0,b.jsxs)("div",{className:"rs-hero-inner",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"rs-hero-eyebrow",children:"Marketplace Resellers"}),(0,b.jsxs)("div",{className:"rs-hero-title",children:["Source Smarter. ",(0,b.jsx)("span",{children:"Sell More."})]}),(0,b.jsx)("div",{className:"rs-hero-sub",children:"AeroWholesale supplies marketplace resellers with IMEI-verified, grade-sorted refurbished devices — the consistent, reliable sourcing your listings depend on."}),(0,b.jsxs)("div",{className:"rs-hero-btns",children:[(0,b.jsx)("button",{className:"rs-btn-primary",onClick:()=>a("/apply"),children:"Apply for Reseller Access"}),(0,b.jsx)("button",{className:"rs-btn-ghost",onClick:()=>a("/catalog"),children:"Browse Catalog"})]})]}),(0,b.jsxs)("div",{className:"rs-hero-card",children:[(0,b.jsx)("div",{className:"rs-hero-card-title",children:"Typical Reseller Margins"}),[{grade:"Premium",margin:"15–25%",cls:"rs-mp-blue"},{grade:"Excellent",margin:"20–30%",cls:"rs-mp-green"},{grade:"Good / B-Grade",margin:"25–40%",cls:"rs-mp-yellow"}].map(a=>(0,b.jsxs)("div",{className:"rs-margin-row",children:[(0,b.jsx)("div",{className:"rs-margin-grade",children:a.grade}),(0,b.jsxs)("div",{className:`rs-margin-pill ${a.cls}`,children:[a.margin," margin"]})]},a.grade)),(0,b.jsx)("div",{style:{marginTop:16,fontSize:11,color:"#4e6480",lineHeight:1.5},children:"Margins vary by platform, model, and market conditions. Figures are illustrative estimates."})]})]})}),(0,b.jsx)("div",{className:"rs-trust",children:(0,b.jsx)("div",{className:"rs-trust-inner",children:["IMEI Clean Guarantee","Grade-Sorted Inventory","No Activation Lock","Marketplace-Ready","Fast Fulfillment"].map(a=>(0,b.jsxs)("div",{className:"rs-trust-item",children:[(0,b.jsx)("div",{className:"rs-trust-dot"}),a]},a))})}),(0,b.jsx)("div",{className:"rs-section rs-section-alt",children:(0,b.jsxs)("div",{className:"rs-section-inner",children:[(0,b.jsx)("div",{className:"rs-section-label",children:"Why AeroWholesale"}),(0,b.jsxs)("div",{className:"rs-section-title",children:["Built for Resellers ",(0,b.jsx)("br",{}),"Who Move Volume"]}),(0,b.jsx)("div",{className:"rs-section-sub",children:"Your marketplace reputation depends on what you ship. We make sure every device that leaves our warehouse is ready to list, sell, and satisfy."}),(0,b.jsx)("div",{className:"rs-features",children:[{icon:"✅",title:"IMEI Clean, Always",desc:"Every device is verified against blacklists before it ships. No surprises for your buyers, no returns from activation issues."},{icon:"📦",title:"Grade-Sorted Lots",desc:"We sort by grade so your listings are accurate. Premium is Premium. Good is Good. No mixed conditions in a single lot."},{icon:"🔋",title:"Battery Health Disclosed",desc:"Battery health is tested and graded. Devices with battery under 80% are clearly identified — so you price and list accordingly."},{icon:"⚡",title:"Fast Replenishment",desc:"When a listing sells out, you need to restock fast. We carry deep inventory and turn quotes around quickly."},{icon:"💰",title:"Competitive Pricing",desc:"Sourcing cost is the biggest lever on your margins. Our wholesale pricing is built to give resellers room to compete."},{icon:"📋",title:"Consistent Supply",desc:"We're not a one-time liquidator. We maintain ongoing inventory so you can build a repeatable sourcing relationship."}].map(a=>(0,b.jsxs)("div",{className:"rs-feature",children:[(0,b.jsx)("div",{className:"rs-feature-icon",children:a.icon}),(0,b.jsx)("div",{className:"rs-feature-title",children:a.title}),(0,b.jsx)("div",{className:"rs-feature-desc",children:a.desc})]},a.title))})]})}),(0,b.jsx)("div",{className:"rs-section",children:(0,b.jsxs)("div",{className:"rs-section-inner",children:[(0,b.jsx)("div",{className:"rs-section-label",children:"Grading Standards"}),(0,b.jsxs)("div",{className:"rs-section-title",children:["Know Exactly What ",(0,b.jsx)("br",{}),"You're Listing"]}),(0,b.jsx)("div",{className:"rs-section-sub",children:"Our grading is consistent and documented. Each grade maps to clear cosmetic and functional criteria so your listings are accurate every time."}),(0,b.jsxs)("div",{className:"rs-grades-table",children:[(0,b.jsxs)("div",{className:"rs-grades-header",children:[(0,b.jsx)("span",{children:"Grade"}),(0,b.jsx)("span",{children:"Condition"}),(0,b.jsx)("span",{children:"Best For"})]}),[{name:"Premium / Premium 100%",badge:"rs-gb-blue",badgeLabel:"Premium",note:"Like-new cosmetics, battery 80%+ or 100%. Top-tier listings, highest ASP."},{name:"Excellent",badge:"rs-gb-green",badgeLabel:"Excellent",note:"Light wear, fully functional, battery 80%+. Best volume-to-margin sweet spot."},{name:"Good",badge:"rs-gb-yellow",badgeLabel:"Good",note:"Moderate wear, fully functional. Budget listings, high-volume movers."},{name:"B-Grade",badge:"rs-gb-orange",badgeLabel:"B-Grade",note:"Heavier cosmetic wear, functional. Value listings and parts buyers."}].map(a=>(0,b.jsxs)("div",{className:"rs-grades-row",children:[(0,b.jsx)("div",{className:"rs-grade-name",children:a.name}),(0,b.jsx)("div",{children:(0,b.jsx)("span",{className:`rs-grade-badge ${a.badge}`,children:a.badgeLabel})}),(0,b.jsx)("div",{className:"rs-grade-note",children:a.note})]},a.name))]})]})}),(0,b.jsx)("div",{className:"rs-section rs-section-alt",children:(0,b.jsxs)("div",{className:"rs-section-inner",children:[(0,b.jsx)("div",{className:"rs-section-label",children:"Where You Sell"}),(0,b.jsxs)("div",{className:"rs-section-title",children:["Inventory Ready for ",(0,b.jsx)("br",{}),"Any Sales Channel"]}),(0,b.jsx)("div",{className:"rs-section-sub",children:"Our devices are prepared for resale across all major platforms and formats — cosmetically graded, functionally tested, and marketplace-ready."}),(0,b.jsx)("div",{className:"rs-channels",children:[{icon:"🛒",title:"Online Marketplaces",desc:"List with confidence on any resale platform. Grade accuracy and IMEI verification protect your seller metrics and reduce returns."},{icon:"🏪",title:"Retail & Storefront",desc:"Physical resellers get consistent stock they can grade-match to their store's quality standards."},{icon:"🔄",title:"Trade-In & Buyback Programs",desc:"Use our inventory to fulfill trade-in obligations or supplement buyback programs with graded supply."},{icon:"📦",title:"B2B & Bulk Sales",desc:"Flip lots directly to other buyers. Our grade-sorted inventory makes it easy to move in bulk without surprises."}].map(a=>(0,b.jsxs)("div",{className:"rs-channel",children:[(0,b.jsx)("div",{className:"rs-channel-icon",children:a.icon}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"rs-channel-title",children:a.title}),(0,b.jsx)("div",{className:"rs-channel-desc",children:a.desc})]})]},a.title))})]})}),(0,b.jsx)("div",{className:"rs-section",children:(0,b.jsx)("div",{className:"rs-section-inner",children:(0,b.jsxs)("div",{className:"rs-cta",children:[(0,b.jsx)("div",{className:"rs-cta-title",children:"Ready to Source from AeroWholesale?"}),(0,b.jsx)("div",{className:"rs-cta-sub",children:"Apply for a reseller account and get access to our full catalog with wholesale pricing. We review applications within 1 business day."}),(0,b.jsxs)("div",{className:"rs-cta-btns",children:[(0,b.jsx)("button",{className:"rs-btn-primary",onClick:()=>a("/apply"),children:"Apply for Reseller Access"}),(0,b.jsx)("button",{className:"rs-btn-ghost",onClick:()=>a("/catalog"),children:"Browse Catalog"})]})]})})})]})]})}a.s(["default",()=>e])}];

//# sourceMappingURL=src__pages_buyers_Resellers_tsx_7e81930f._.js.map