module.exports=[31072,a=>{"use strict";var b=a.i(7997),c=a.i(47485);let d=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .hc-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #0f172a; -webkit-font-smoothing: antialiased; }

  /* HERO */
  .hc-hero { background: #0c1730; background-image: radial-gradient(ellipse 70% 60% at 80% 50%, rgba(194,65,12,0.12) 0%, transparent 65%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 80px 40px 72px; position: relative; overflow: hidden; }
  .hc-hero::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 80px); pointer-events: none; }
  .hc-hero-inner { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; position: relative; z-index: 1; }
  .hc-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(194,65,12,0.15); border: 1px solid rgba(194,65,12,0.3); border-radius: 20px; padding: 5px 14px; font-size: 11px; font-weight: 700; color: #fb923c; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 20px; }
  .hc-hero-title { font-size: 46px; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1.05; margin-bottom: 20px; }
  .hc-hero-title span { color: #c2410c; }
  .hc-hero-sub { font-size: 16px; color: #a8c0d8; line-height: 1.7; margin-bottom: 32px; font-weight: 400; }
  .hc-hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }
  .hc-btn-primary { background: #c2410c; color: #fff; border: none; border-radius: 8px; padding: 13px 28px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .hc-btn-primary:hover { background: #a33509; }
  .hc-btn-ghost { background: rgba(255,255,255,0.07); color: #e2e8f0; border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 13px 28px; font-size: 14px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .hc-btn-ghost:hover { background: rgba(255,255,255,0.12); }

  /* HERO STATS */
  .hc-hero-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
  .hc-hero-stat { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 20px; }
  .hc-hero-stat-val { font-size: 32px; font-weight: 900; color: #fff; letter-spacing: -0.03em; line-height: 1; margin-bottom: 4px; }
  .hc-hero-stat-val span { color: #c2410c; }
  .hc-hero-stat-label { font-size: 12px; color: #7b90b2; font-weight: 500; line-height: 1.4; }

  /* TRUST BAR */
  .hc-trust { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 18px 40px; }
  .hc-trust-inner { max-width: 1100px; margin: 0 auto; display: flex; align-items: center; gap: 32px; flex-wrap: wrap; justify-content: center; }
  .hc-trust-item { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #334155; white-space: nowrap; }
  .hc-trust-dot { width: 6px; height: 6px; border-radius: 50%; background: #c2410c; flex-shrink: 0; }

  /* SECTIONS */
  .hc-section { padding: 72px 40px; }
  .hc-section-inner { max-width: 1100px; margin: 0 auto; }
  .hc-section-alt { background: #fff; }

  .hc-section-label { font-size: 11px; font-weight: 700; color: #c2410c; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 12px; }
  .hc-section-title { font-size: 34px; font-weight: 900; color: #132347; letter-spacing: -0.02em; margin-bottom: 14px; line-height: 1.1; }
  .hc-section-sub { font-size: 16px; color: #475569; line-height: 1.7; max-width: 580px; }

  /* USE CASES */
  .hc-usecases { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
  .hc-usecase { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
  .hc-usecase-icon { width: 44px; height: 44px; background: #f1f4f8; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 22px; }
  .hc-usecase-title { font-size: 15px; font-weight: 800; color: #132347; margin-bottom: 8px; }
  .hc-usecase-desc { font-size: 13px; color: #64748b; line-height: 1.6; }
  .hc-usecase-devices { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 14px; }
  .hc-usecase-tag { background: #f1f4f8; color: #334155; font-size: 11px; font-weight: 600; padding: 3px 10px; border-radius: 20px; }

  /* WHAT YOU GET */
  .hc-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; margin-top: 48px; }
  .hc-split-list { display: flex; flex-direction: column; gap: 20px; }
  .hc-split-item { display: flex; gap: 16px; align-items: flex-start; }
  .hc-split-icon { width: 40px; height: 40px; background: #132347; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
  .hc-split-text-title { font-size: 14px; font-weight: 800; color: #132347; margin-bottom: 4px; }
  .hc-split-text-desc { font-size: 13px; color: #64748b; line-height: 1.6; }
  .hc-split-card { background: #132347; border-radius: 16px; padding: 32px; }
  .hc-split-card-title { font-size: 13px; font-weight: 700; color: #7b90b2; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 20px; }
  .hc-split-card-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.07); }
  .hc-split-card-item:last-child { border-bottom: none; }
  .hc-split-card-label { font-size: 13px; color: #a8c0d8; font-weight: 500; }
  .hc-split-card-val { font-size: 13px; color: #fff; font-weight: 700; }
  .hc-split-card-val.green { color: #34d399; }

  /* NOTICE */
  .hc-notice { background: #fff8f0; border: 1px solid #fed7aa; border-radius: 12px; padding: 20px 24px; margin-top: 48px; display: flex; gap: 14px; align-items: flex-start; }
  .hc-notice-icon { font-size: 20px; flex-shrink: 0; margin-top: 2px; }
  .hc-notice-title { font-size: 14px; font-weight: 800; color: #92400e; margin-bottom: 4px; }
  .hc-notice-desc { font-size: 13px; color: #78350f; line-height: 1.6; }

  /* GRADES */
  .hc-grades { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 48px; }
  .hc-grade { border-radius: 10px; padding: 20px; border: 1px solid; }
  .hc-grade-premium { background: #eff6ff; border-color: #bfdbfe; }
  .hc-grade-excellent { background: #ecfdf5; border-color: #a7f3d0; }
  .hc-grade-good { background: #fefce8; border-color: #fde68a; }
  .hc-grade-label { font-size: 12px; font-weight: 700; margin-bottom: 4px; }
  .hc-grade-premium .hc-grade-label { color: #1d4ed8; }
  .hc-grade-excellent .hc-grade-label { color: #047857; }
  .hc-grade-good .hc-grade-label { color: #854d0e; }
  .hc-grade-name { font-size: 16px; font-weight: 800; color: #132347; margin-bottom: 8px; }
  .hc-grade-desc { font-size: 12px; color: #64748b; line-height: 1.5; }
  .hc-grade-rec { font-size: 11px; font-weight: 700; margin-top: 10px; padding: 4px 10px; border-radius: 20px; display: inline-block; }
  .hc-grade-premium .hc-grade-rec { background: #dbeafe; color: #1d4ed8; }
  .hc-grade-excellent .hc-grade-rec { background: #d1fae5; color: #047857; }
  .hc-grade-good .hc-grade-rec { background: #fef9c3; color: #854d0e; }

  /* CTA */
  .hc-cta { background: linear-gradient(135deg, #132347 0%, #0c1730 100%); border-radius: 16px; padding: 56px 48px; text-align: center; margin-top: 60px; position: relative; overflow: hidden; }
  .hc-cta::before { content: ''; position: absolute; top: -40px; right: -40px; width: 200px; height: 200px; background: radial-gradient(circle, rgba(194,65,12,0.2) 0%, transparent 70%); pointer-events: none; }
  .hc-cta-title { font-size: 30px; font-weight: 900; color: #fff; letter-spacing: -0.02em; margin-bottom: 12px; }
  .hc-cta-sub { font-size: 15px; color: #a8c0d8; margin-bottom: 28px; line-height: 1.6; }
  .hc-cta-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    .hc-hero-inner { grid-template-columns: 1fr; gap: 40px; }
    .hc-hero-title { font-size: 32px; }
    .hc-hero-stats { grid-template-columns: 1fr 1fr; }
    .hc-usecases { grid-template-columns: 1fr; }
    .hc-split { grid-template-columns: 1fr; }
    .hc-grades { grid-template-columns: 1fr; }
    .hc-section { padding: 48px 20px; }
    .hc-hero { padding: 48px 20px; }
    .hc-trust { padding: 14px 20px; }
    .hc-cta { padding: 40px 24px; }
  }
`;function e(){let a=(0,c.useNavigate)();return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("style",{children:d}),(0,b.jsxs)("div",{className:"hc-page",children:[(0,b.jsx)("div",{className:"hc-hero",children:(0,b.jsxs)("div",{className:"hc-hero-inner",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"hc-hero-eyebrow",children:"🏥 Healthcare & Medical"}),(0,b.jsxs)("h1",{className:"hc-hero-title",children:["Reliable Hardware for",(0,b.jsx)("br",{}),(0,b.jsx)("span",{children:"Healthcare Teams"})]}),(0,b.jsx)("p",{className:"hc-hero-sub",children:"Hospitals, clinics, and home health agencies trust AeroWholesale for bulk refurbished iPhones and iPads — certified wiped, QC tested, and ready for your IT team to deploy."}),(0,b.jsxs)("div",{className:"hc-hero-btns",children:[(0,b.jsx)("button",{className:"hc-btn-primary",onClick:()=>a("/apply"),children:"Apply for Healthcare Access"}),(0,b.jsx)("button",{className:"hc-btn-ghost",onClick:()=>a("/contact"),children:"Contact Us"})]})]}),(0,b.jsxs)("div",{className:"hc-hero-stats",children:[(0,b.jsxs)("div",{className:"hc-hero-stat",children:[(0,b.jsxs)("div",{className:"hc-hero-stat-val",children:["100",(0,b.jsx)("span",{children:"%"})]}),(0,b.jsx)("div",{className:"hc-hero-stat-label",children:"Devices certified wiped before shipping"})]}),(0,b.jsxs)("div",{className:"hc-hero-stat",children:[(0,b.jsxs)("div",{className:"hc-hero-stat-val",children:["48",(0,b.jsx)("span",{children:"hr"})]}),(0,b.jsx)("div",{className:"hc-hero-stat-label",children:"Fulfillment from our NJ warehouse"})]}),(0,b.jsxs)("div",{className:"hc-hero-stat",children:[(0,b.jsxs)("div",{className:"hc-hero-stat-val",children:["Multi",(0,b.jsx)("span",{children:"-unit"})]}),(0,b.jsx)("div",{className:"hc-hero-stat-label",children:"Bulk orders from 10 to 500+ units"})]}),(0,b.jsxs)("div",{className:"hc-hero-stat",children:[(0,b.jsxs)("div",{className:"hc-hero-stat-val",children:["QC",(0,b.jsx)("span",{children:" tested"})]}),(0,b.jsx)("div",{className:"hc-hero-stat-label",children:"Every unit tested before it ships"})]})]})]})}),(0,b.jsx)("div",{className:"hc-trust",children:(0,b.jsx)("div",{className:"hc-trust-inner",children:["Certified data wipe on every device","All major Apple & Samsung models","Consistent bulk supply from NJ","Approved wholesale buyers only","Same-day shipping on orders before 2PM EST"].map(a=>(0,b.jsxs)("div",{className:"hc-trust-item",children:[(0,b.jsx)("div",{className:"hc-trust-dot"}),a]},a))})}),(0,b.jsx)("div",{className:"hc-section",children:(0,b.jsxs)("div",{className:"hc-section-inner",children:[(0,b.jsx)("div",{className:"hc-section-label",children:"Common Use Cases"}),(0,b.jsx)("h2",{className:"hc-section-title",children:"How Healthcare Organizations Use Our Devices"}),(0,b.jsx)("p",{className:"hc-section-sub",children:"From clinical communication to patient-facing workflows, here's where refurbished hardware delivers real value in healthcare settings."}),(0,b.jsxs)("div",{className:"hc-usecases",children:[(0,b.jsxs)("div",{className:"hc-usecase",children:[(0,b.jsx)("div",{className:"hc-usecase-icon",children:"📱"}),(0,b.jsx)("div",{className:"hc-usecase-title",children:"Clinical Staff Communication"}),(0,b.jsx)("div",{className:"hc-usecase-desc",children:"Nurses, techs, and care coordinators using iPhones for secure messaging, care team coordination, and real-time patient updates."}),(0,b.jsxs)("div",{className:"hc-usecase-devices",children:[(0,b.jsx)("span",{className:"hc-usecase-tag",children:"iPhone 13"}),(0,b.jsx)("span",{className:"hc-usecase-tag",children:"iPhone 14"}),(0,b.jsx)("span",{className:"hc-usecase-tag",children:"iPhone 15"})]})]}),(0,b.jsxs)("div",{className:"hc-usecase",children:[(0,b.jsx)("div",{className:"hc-usecase-icon",children:"📋"}),(0,b.jsx)("div",{className:"hc-usecase-title",children:"Patient Intake & EHR Access"}),(0,b.jsx)("div",{className:"hc-usecase-desc",children:"iPads at check-in kiosks, bedside carts, and telehealth stations — configured by your IT team to run your EHR or patient portal."}),(0,b.jsxs)("div",{className:"hc-usecase-devices",children:[(0,b.jsx)("span",{className:"hc-usecase-tag",children:"iPad 10th Gen"}),(0,b.jsx)("span",{className:"hc-usecase-tag",children:"iPad Pro"}),(0,b.jsx)("span",{className:"hc-usecase-tag",children:"iPad Air"})]})]}),(0,b.jsxs)("div",{className:"hc-usecase",children:[(0,b.jsx)("div",{className:"hc-usecase-icon",children:"🏠"}),(0,b.jsx)("div",{className:"hc-usecase-title",children:"Home Health & Field Care"}),(0,b.jsx)("div",{className:"hc-usecase-desc",children:"Home health aides and visiting nurses using mobile devices to document visits, access care plans, and stay connected to the care team."}),(0,b.jsxs)("div",{className:"hc-usecase-devices",children:[(0,b.jsx)("span",{className:"hc-usecase-tag",children:"iPhone SE"}),(0,b.jsx)("span",{className:"hc-usecase-tag",children:"iPhone 12"}),(0,b.jsx)("span",{className:"hc-usecase-tag",children:"iPad mini"})]})]})]})]})}),(0,b.jsx)("div",{className:"hc-section hc-section-alt",children:(0,b.jsxs)("div",{className:"hc-section-inner",children:[(0,b.jsx)("div",{className:"hc-section-label",children:"What You Get"}),(0,b.jsx)("h2",{className:"hc-section-title",children:"Hardware Ready for Your IT Team to Deploy"}),(0,b.jsx)("p",{className:"hc-section-sub",children:"We provide clean, tested, graded hardware. Your IT team handles MDM enrollment, configuration, and security policy — exactly how enterprise healthcare IT expects to work."}),(0,b.jsxs)("div",{className:"hc-split",children:[(0,b.jsxs)("div",{className:"hc-split-list",children:[(0,b.jsxs)("div",{className:"hc-split-item",children:[(0,b.jsx)("div",{className:"hc-split-icon",children:"🧹"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"hc-split-text-title",children:"Certified Data Wipe"}),(0,b.jsx)("div",{className:"hc-split-text-desc",children:"Every device is wiped and reset to factory settings before shipping. No previous user data, no activation locks, ready for MDM enrollment."})]})]}),(0,b.jsxs)("div",{className:"hc-split-item",children:[(0,b.jsx)("div",{className:"hc-split-icon",children:"🔬"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"hc-split-text-title",children:"Multi-Point QC Testing"}),(0,b.jsx)("div",{className:"hc-split-text-desc",children:"Screen, battery health, buttons, cameras, cellular, and Wi-Fi — all tested before grading. You know exactly what you're getting."})]})]}),(0,b.jsxs)("div",{className:"hc-split-item",children:[(0,b.jsx)("div",{className:"hc-split-icon",children:"📦"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"hc-split-text-title",children:"Consistent Bulk Availability"}),(0,b.jsx)("div",{className:"hc-split-text-desc",children:"Need 50 iPhones this quarter and 50 more next quarter? We maintain consistent stock of the same models and grades so your fleet stays uniform."})]})]}),(0,b.jsxs)("div",{className:"hc-split-item",children:[(0,b.jsx)("div",{className:"hc-split-icon",children:"⚡"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"hc-split-text-title",children:"Fast Fulfillment from NJ"}),(0,b.jsx)("div",{className:"hc-split-text-desc",children:"Orders placed before 2PM EST ship same day. Most healthcare IT teams receive orders within 1–2 business days."})]})]})]}),(0,b.jsxs)("div",{className:"hc-split-card",children:[(0,b.jsx)("div",{className:"hc-split-card-title",children:"Typical Healthcare Order"}),[{label:"Device type",val:"iPhone 13 / iPad 10th Gen"},{label:"Grade",val:"Excellent (CA+)"},{label:"Quantity",val:"25–150 units"},{label:"Data wipe",val:"Certified",green:!0},{label:"Activation lock",val:"Cleared",green:!0},{label:"MDM enrollment",val:"By your IT team"},{label:"Fulfillment",val:"48 hours"}].map(a=>(0,b.jsxs)("div",{className:"hc-split-card-item",children:[(0,b.jsx)("span",{className:"hc-split-card-label",children:a.label}),(0,b.jsx)("span",{className:`hc-split-card-val${a.green?" green":""}`,children:a.val})]},a.label))]})]}),(0,b.jsxs)("div",{className:"hc-notice",children:[(0,b.jsx)("div",{className:"hc-notice-icon",children:"ℹ️"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("div",{className:"hc-notice-title",children:"Hardware Only — MDM & Software Not Included"}),(0,b.jsx)("div",{className:"hc-notice-desc",children:"AeroWholesale provides certified hardware only. We do not provide MDM solutions (Jamf, Intune, etc.), Knox configuration, or any healthcare-specific software. Your IT team configures and manages devices using your existing tools and policies."})]})]})]})}),(0,b.jsx)("div",{className:"hc-section",children:(0,b.jsxs)("div",{className:"hc-section-inner",children:[(0,b.jsx)("div",{className:"hc-section-label",children:"Device Grades"}),(0,b.jsx)("h2",{className:"hc-section-title",children:"Choose the Right Grade for Your Use Case"}),(0,b.jsx)("p",{className:"hc-section-sub",children:"Our in-house grading system is consistent across every shipment. Healthcare IT teams typically order Excellent or Premium grade for patient-facing devices."}),(0,b.jsxs)("div",{className:"hc-grades",children:[(0,b.jsxs)("div",{className:"hc-grade hc-grade-premium",children:[(0,b.jsx)("div",{className:"hc-grade-label",children:"Premium"}),(0,b.jsx)("div",{className:"hc-grade-name",children:"Premium Grade"}),(0,b.jsx)("div",{className:"hc-grade-desc",children:"Like-new condition. No visible scratches or scuffs. Perfect for patient-facing or executive use where appearance matters."}),(0,b.jsx)("div",{className:"hc-grade-rec",children:"Recommended: Patient-facing"})]}),(0,b.jsxs)("div",{className:"hc-grade hc-grade-excellent",children:[(0,b.jsx)("div",{className:"hc-grade-label",children:"Excellent"}),(0,b.jsx)("div",{className:"hc-grade-name",children:"Excellent Grade"}),(0,b.jsx)("div",{className:"hc-grade-desc",children:"Near-perfect condition with minimal light wear only visible under close inspection. Ideal for clinical staff devices."}),(0,b.jsx)("div",{className:"hc-grade-rec",children:"Recommended: Clinical staff"})]}),(0,b.jsxs)("div",{className:"hc-grade hc-grade-good",children:[(0,b.jsx)("div",{className:"hc-grade-label",children:"Good"}),(0,b.jsx)("div",{className:"hc-grade-name",children:"Good Grade"}),(0,b.jsx)("div",{className:"hc-grade-desc",children:"Fully functional with light cosmetic wear. Great for back-office, admin, or home health field workers where cost matters most."}),(0,b.jsx)("div",{className:"hc-grade-rec",children:"Recommended: Field / back office"})]})]})]})}),(0,b.jsx)("div",{className:"hc-section hc-section-alt",children:(0,b.jsx)("div",{className:"hc-section-inner",children:(0,b.jsxs)("div",{className:"hc-cta",children:[(0,b.jsx)("h2",{className:"hc-cta-title",children:"Ready to Equip Your Healthcare Team?"}),(0,b.jsx)("p",{className:"hc-cta-sub",children:"Apply for a wholesale account and get access to bulk pricing on iPhones and iPads. We respond within 1 business day and can fulfill most orders within 48 hours."}),(0,b.jsxs)("div",{className:"hc-cta-btns",children:[(0,b.jsx)("button",{className:"hc-btn-primary",onClick:()=>a("/apply"),children:"Apply for Wholesale Access"}),(0,b.jsx)("button",{className:"hc-btn-ghost",onClick:()=>a("/catalog"),children:"Browse Catalog"})]})]})})})]})]})}a.s(["default",()=>e])}];

//# sourceMappingURL=src__pages_Healthcare_tsx_241a9adf._.js.map