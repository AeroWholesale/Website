import { useState, useRef } from 'react'
import { useLocation } from 'wouter'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  :root {
    --navy: #132347; --navy-mid: #1a2f5e; --navy-dark: #0c1730; --navy-deep: #08101f;
    --orange: #c2410c; --orange-lt: #d9480f;
    --steel: #334155; --steel-dim: #64748b;
    --slate-bg: #f1f4f8; --white: #ffffff; --off-white: #f8fafc;
    --border: #e2e8f0; --text-dark: #0f172a;
    --green: #16a34a; --green-bg: #f0fdf4;
  }

  .aw-apply-page { font-family: 'DM Sans', sans-serif; background: var(--off-white); color: var(--text-dark); -webkit-font-smoothing: antialiased; }

  /* ── HEADER ── */
  .aw-apply-header { background: var(--navy-dark); background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, var(--navy-dark) 0%, var(--navy-deep) 100%); padding: 48px 40px 52px; position: relative; overflow: hidden; text-align: center; }
  .aw-apply-header::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px); pointer-events: none; }
  .aw-apply-header-inner { max-width: 600px; margin: 0 auto; position: relative; z-index: 1; }
  .aw-apply-eyebrow { font-size: 10.5px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #a8c0d8; margin-bottom: 12px; }
  .aw-apply-title { font-size: 32px; font-weight: 900; color: #fff; letter-spacing: -0.03em; margin-bottom: 12px; }
  .aw-apply-sub { font-size: 14px; color: #a8c0d8; max-width: 500px; margin: 0 auto 32px; line-height: 1.6; }
  .aw-apply-steps { display: flex; align-items: center; justify-content: center; gap: 0; }
  .aw-apply-step { display: flex; align-items: center; gap: 10px; }
  .aw-apply-step-num { width: 28px; height: 28px; border-radius: 50%; background: var(--orange); color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .aw-apply-step-label { font-size: 13px; font-weight: 600; color: #cbd5e1; }
  .aw-apply-step-arrow { color: #475569; margin: 0 16px; font-size: 16px; }

  /* ── FORM ── */
  .aw-apply-main { max-width: 760px; margin: 0 auto; padding: 48px 40px 80px; }
  .aw-apply-card { background: var(--white); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  .aw-apply-section { padding: 28px 32px; border-bottom: 1px solid var(--slate-bg); }
  .aw-apply-section:last-child { border-bottom: none; }
  .aw-apply-sec-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .aw-apply-sec-icon { width: 36px; height: 36px; border-radius: 8px; background: var(--slate-bg); border: 1px solid var(--border); color: var(--navy); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .aw-apply-sec-icon svg { width: 18px; height: 18px; }
  .aw-apply-sec-title { font-size: 15px; font-weight: 800; color: var(--navy); }
  .aw-apply-sec-sub { font-size: 12px; color: var(--steel-dim); margin-top: 1px; }

  .aw-apply-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 14px; }
  .aw-apply-row.single { grid-template-columns: 1fr; }
  .aw-apply-row.triple { grid-template-columns: 1fr 1fr 1fr; }
  .aw-apply-group { display: flex; flex-direction: column; gap: 5px; }
  .aw-apply-label { font-size: 11px; font-weight: 700; color: var(--navy); text-transform: uppercase; letter-spacing: 0.06em; }
  .aw-apply-req { color: var(--orange); margin-left: 2px; }
  .aw-apply-input { padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 13px; font-family: 'DM Sans', sans-serif; color: var(--navy); background: var(--off-white); outline: none; transition: border-color 0.15s, background 0.15s; }
  .aw-apply-input:focus { border-color: var(--navy-mid); background: #fff; }
  .aw-apply-select { padding: 10px 32px 10px 14px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 13px; font-family: 'DM Sans', sans-serif; color: var(--navy); background: var(--off-white); appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; outline: none; cursor: pointer; }
  .aw-apply-select:focus { border-color: var(--navy-mid); background: #fff; }
  .aw-apply-textarea { padding: 10px 14px; border: 1.5px solid var(--border); border-radius: 8px; font-size: 13px; font-family: 'DM Sans', sans-serif; color: var(--navy); background: var(--off-white); outline: none; resize: none; width: 100%; box-sizing: border-box; }
  .aw-apply-textarea:focus { border-color: var(--navy-mid); background: #fff; }
  .aw-apply-hint { font-size: 11px; color: var(--steel-dim); margin-top: 2px; }

  /* Type cards */
  .aw-apply-type-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
  .aw-apply-type-card { border: 2px solid var(--border); border-radius: 10px; padding: 16px; cursor: pointer; text-align: center; transition: all 0.15s; }
  .aw-apply-type-card:hover { border-color: var(--navy); }
  .aw-apply-type-card.selected { border-color: var(--navy); background: #eff3fa; }
  .aw-apply-type-icon { font-size: 24px; margin-bottom: 6px; }
  .aw-apply-type-name { font-size: 13px; font-weight: 700; color: var(--navy); margin-bottom: 3px; }
  .aw-apply-type-desc { font-size: 11px; color: var(--steel-dim); line-height: 1.4; }

  /* Pills */
  .aw-apply-pills { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
  .aw-apply-pill { padding: 8px 14px; border: 1.5px solid var(--border); border-radius: 7px; font-size: 12px; font-weight: 500; color: var(--steel); cursor: pointer; transition: all 0.15s; user-select: none; }
  .aw-apply-pill:hover { border-color: var(--navy); color: var(--navy); }
  .aw-apply-pill.selected { border-color: var(--navy); background: #eff3fa; color: var(--navy); font-weight: 700; }

  /* ── DOCUMENT UPLOAD ── */
  .aw-upload-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .aw-upload-zone { border: 2px dashed var(--border); border-radius: 10px; padding: 20px 16px; text-align: center; cursor: pointer; transition: all 0.15s; background: var(--off-white); position: relative; }
  .aw-upload-zone:hover { border-color: var(--navy); background: #f0f4fb; }
  .aw-upload-zone.has-file { border-color: var(--green); border-style: solid; background: var(--green-bg); }
  .aw-upload-zone input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
  .aw-upload-icon { font-size: 24px; margin-bottom: 8px; }
  .aw-upload-label { font-size: 12px; font-weight: 700; color: var(--navy); margin-bottom: 3px; }
  .aw-upload-sub { font-size: 11px; color: var(--steel-dim); }
  .aw-upload-filename { font-size: 11px; color: var(--green); font-weight: 600; margin-top: 4px; word-break: break-all; }
  .aw-upload-badge { display: inline-block; background: var(--slate-bg); border: 1px solid var(--border); border-radius: 4px; padding: 1px 6px; font-size: 10px; font-weight: 700; color: var(--steel-dim); margin-left: 6px; }
  .aw-upload-note { font-size: 11px; color: var(--steel-dim); margin-top: 12px; display: flex; align-items: center; gap: 6px; }

  /* Submit */
  .aw-apply-submit-section { padding: 24px 32px; background: var(--slate-bg); border-top: 1px solid var(--border); }
  .aw-apply-terms { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: var(--steel); margin-bottom: 18px; }
  .aw-apply-terms input[type="checkbox"] { margin-top: 2px; width: 16px; height: 16px; flex-shrink: 0; accent-color: var(--navy); }
  .aw-apply-terms-link { color: var(--navy); font-weight: 600; cursor: pointer; }
  .aw-apply-submit-btn { width: 100%; height: 50px; background: var(--orange); color: #fff; font-size: 15px; font-weight: 700; font-family: 'DM Sans', sans-serif; border-radius: 8px; border: none; cursor: pointer; transition: background 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 16px rgba(194,65,12,0.35); }
  .aw-apply-submit-btn:hover { background: #a33509; }
  .aw-apply-submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
  .aw-apply-login-row { text-align: center; margin-top: 14px; font-size: 13px; color: var(--steel-dim); }
  .aw-apply-login-link { color: var(--navy); font-weight: 600; cursor: pointer; text-decoration: none; }

  /* Trust */
  .aw-apply-trust { display: flex; justify-content: center; gap: 28px; margin-top: 32px; }
  .aw-apply-trust-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--steel-dim); }

  /* Error */
  .aw-apply-error { background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 12px 16px; font-size: 13px; color: #dc2626; margin-bottom: 16px; }

  /* Success overlay */
  .aw-apply-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; }
  .aw-apply-success { background: #fff; border-radius: 16px; padding: 48px 40px; text-align: center; max-width: 460px; width: 90%; }
  .aw-apply-success-icon { font-size: 56px; margin-bottom: 16px; }
  .aw-apply-success-title { font-size: 22px; font-weight: 800; color: var(--navy); margin-bottom: 8px; }
  .aw-apply-success-sub { font-size: 14px; color: var(--steel-dim); line-height: 1.6; margin-bottom: 8px; }
  .aw-apply-success-timeline { background: var(--slate-bg); border-radius: 10px; padding: 16px 20px; margin: 20px 0; text-align: left; }
  .aw-apply-tl-item { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--steel); margin-bottom: 8px; }
  .aw-apply-tl-item:last-child { margin-bottom: 0; }
  .aw-apply-tl-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--navy); flex-shrink: 0; }
  .aw-apply-success-btn { display: inline-block; background: var(--navy); color: #fff; font-size: 14px; font-weight: 700; padding: 12px 28px; border-radius: 8px; cursor: pointer; border: none; font-family: inherit; }

  @media (max-width: 640px) {
    .aw-apply-header, .aw-apply-main { padding-left: 20px; padding-right: 20px; }
    .aw-apply-title { font-size: 24px; }
    .aw-apply-row, .aw-apply-row.triple { grid-template-columns: 1fr; }
    .aw-apply-type-grid { grid-template-columns: 1fr; }
    .aw-apply-upload-grid { grid-template-columns: 1fr; }
    .aw-apply-steps { flex-wrap: wrap; gap: 8px; }
    .aw-apply-section, .aw-apply-submit-section { padding: 20px; }
  }
`

const ACCOUNT_TYPES = [
  { id: 'enterprise', icon: '🏢', name: 'Enterprise', desc: 'Large volume deployments, IT procurement, corporate fleets' },
  { id: 'wholesale', icon: '📦', name: 'Wholesale', desc: 'Bulk purchasing, redistribution, secondary market' },
  { id: 'reseller', icon: '🛍️', name: 'Reseller', desc: 'Retail resale, online marketplaces, storefronts' },
]

const VOLUMES = ['Under 50 units', '50–200 units', '200–500 units', '500–1,000 units', '1,000+ units']

const CATEGORIES = [
  { id: 'phones', icon: '📱', label: 'Phones' },
  { id: 'tablets', icon: '📱', label: 'Tablets' },
  { id: 'computers', icon: '💻', label: 'Computers' },
  { id: 'wearables', icon: '⌚', label: 'Wearables & Accessories' },
]

const STATES = ['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']

const IconUser = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const IconBriefcase = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>
const IconCheck = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
const IconBox = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z"/></svg>
const IconDoc = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>

const UPLOAD_SLOTS = [
  { id: 'resaleCert', icon: '📄', label: 'Resale Certificate', sub: 'State-issued resale or tax exempt cert', required: false },
  { id: 'businessLicense', icon: '🏛️', label: 'Business License', sub: 'City/state business operating license', required: false },
  { id: 'taxExempt', icon: '📋', label: 'Tax Exempt Form', sub: 'ST-3, ST-5, or state equivalent', required: false },
  { id: 'other', icon: '📎', label: 'Other Document', sub: 'Any other supporting documentation', required: false },
]

export default function Apply() {
  const [, navigate] = useLocation()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', jobTitle: '',
    companyName: '', website: '', ein: '', state: '', city: '', yearsInBusiness: '',
    accountType: '', monthlyVolume: '', salesChannel: '', heardAbout: '', notes: ''
  })
  const [categories, setCategories] = useState<string[]>([])
  const [files, setFiles] = useState<Record<string, File | null>>({
    resaleCert: null, businessLicense: null, taxExempt: null, other: null
  })
  const [agreed, setAgreed] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))
  const toggleCat = (id: string) => setCategories(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id])

  const handleFileChange = (slotId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file && file.size > 10 * 1024 * 1024) {
      setError('File too large. Maximum size is 10MB per document.')
      return
    }
    setError('')
    setFiles(f => ({ ...f, [slotId]: file }))
  }

  const handleSubmit = async () => {
    setError('')
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.companyName || !form.ein || !form.state || !form.accountType || !form.monthlyVolume) {
      setError('Please fill in all required fields before submitting.')
      return
    }
    setSubmitting(true)
    try {
      // Use FormData so we can send both text fields and files in one request
      const fd = new FormData()

      // Append all text fields
      Object.entries({ ...form, productCategories: categories.join(', ') }).forEach(([k, v]) => {
        fd.append(k, v as string)
      })

      // Append files (only the ones that were actually selected)
      Object.entries(files).forEach(([key, file]) => {
        if (file) fd.append(key, file, file.name)
      })

      const res = await fetch('/api/apply', {
        method: 'POST',
        // Do NOT set Content-Type header — browser sets it automatically with the correct boundary for multipart
        body: fd,
      })

      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <style>{css}</style>
      <div className="aw-apply-page">

        {/* HEADER */}
        <div className="aw-apply-header">
          <div className="aw-apply-header-inner">
            <div className="aw-apply-eyebrow">Wholesale Account Application</div>
            <div className="aw-apply-title">Apply for Access</div>
            <div className="aw-apply-sub">Fill out the form below. We review every application manually and respond within 1 business day.</div>
            <div className="aw-apply-steps">
              <div className="aw-apply-step"><div className="aw-apply-step-num">1</div><div className="aw-apply-step-label">Submit Application</div></div>
              <div className="aw-apply-step-arrow">→</div>
              <div className="aw-apply-step"><div className="aw-apply-step-num">2</div><div className="aw-apply-step-label">We Review</div></div>
              <div className="aw-apply-step-arrow">→</div>
              <div className="aw-apply-step"><div className="aw-apply-step-num">3</div><div className="aw-apply-step-label">Get Approved</div></div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="aw-apply-main">
          <div className="aw-apply-card">

            {/* Contact Info */}
            <div className="aw-apply-section">
              <div className="aw-apply-sec-header">
                <div className="aw-apply-sec-icon"><IconUser /></div>
                <div><div className="aw-apply-sec-title">Contact Information</div><div className="aw-apply-sec-sub">Your primary contact details</div></div>
              </div>
              <div className="aw-apply-row">
                <div className="aw-apply-group"><label className="aw-apply-label">First Name <span className="aw-apply-req">*</span></label><input className="aw-apply-input" placeholder="John" value={form.firstName} onChange={e => set('firstName', e.target.value)} /></div>
                <div className="aw-apply-group"><label className="aw-apply-label">Last Name <span className="aw-apply-req">*</span></label><input className="aw-apply-input" placeholder="Smith" value={form.lastName} onChange={e => set('lastName', e.target.value)} /></div>
              </div>
              <div className="aw-apply-row">
                <div className="aw-apply-group"><label className="aw-apply-label">Email Address <span className="aw-apply-req">*</span></label><input className="aw-apply-input" type="email" placeholder="john@company.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
                <div className="aw-apply-group"><label className="aw-apply-label">Phone Number <span className="aw-apply-req">*</span></label><input className="aw-apply-input" type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => set('phone', e.target.value)} /></div>
              </div>
              <div className="aw-apply-row single">
                <div className="aw-apply-group"><label className="aw-apply-label">Job Title</label><input className="aw-apply-input" placeholder="Purchasing Manager" value={form.jobTitle} onChange={e => set('jobTitle', e.target.value)} /></div>
              </div>
            </div>

            {/* Business Info */}
            <div className="aw-apply-section">
              <div className="aw-apply-sec-header">
                <div className="aw-apply-sec-icon"><IconBriefcase /></div>
                <div><div className="aw-apply-sec-title">Business Information</div><div className="aw-apply-sec-sub">Tell us about your company</div></div>
              </div>
              <div className="aw-apply-row single">
                <div className="aw-apply-group"><label className="aw-apply-label">Company Name <span className="aw-apply-req">*</span></label><input className="aw-apply-input" placeholder="Acme Electronics LLC" value={form.companyName} onChange={e => set('companyName', e.target.value)} /></div>
              </div>
              <div className="aw-apply-row">
                <div className="aw-apply-group"><label className="aw-apply-label">Website</label><input className="aw-apply-input" placeholder="www.acmeelectronics.com" value={form.website} onChange={e => set('website', e.target.value)} /></div>
                <div className="aw-apply-group"><label className="aw-apply-label">EIN / Tax ID <span className="aw-apply-req">*</span></label><input className="aw-apply-input" placeholder="12-3456789" value={form.ein} onChange={e => set('ein', e.target.value)} /><span className="aw-apply-hint">Required for wholesale tax exemption</span></div>
              </div>
              <div className="aw-apply-row triple">
                <div className="aw-apply-group">
                  <label className="aw-apply-label">State <span className="aw-apply-req">*</span></label>
                  <select className="aw-apply-select" value={form.state} onChange={e => set('state', e.target.value)}>
                    <option value="">Select state</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="aw-apply-group"><label className="aw-apply-label">City</label><input className="aw-apply-input" placeholder="New York" value={form.city} onChange={e => set('city', e.target.value)} /></div>
                <div className="aw-apply-group">
                  <label className="aw-apply-label">Years in Business</label>
                  <select className="aw-apply-select" value={form.yearsInBusiness} onChange={e => set('yearsInBusiness', e.target.value)}>
                    <option value="">Select</option>
                    <option>Less than 1 year</option><option>1–3 years</option><option>3–5 years</option><option>5–10 years</option><option>10+ years</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Account Type */}
            <div className="aw-apply-section">
              <div className="aw-apply-sec-header">
                <div className="aw-apply-sec-icon"><IconCheck /></div>
                <div><div className="aw-apply-sec-title">Account Type <span className="aw-apply-req">*</span></div><div className="aw-apply-sec-sub">What best describes your business?</div></div>
              </div>
              <div className="aw-apply-type-grid">
                {ACCOUNT_TYPES.map(t => (
                  <div key={t.id} className={`aw-apply-type-card${form.accountType === t.id ? ' selected' : ''}`} onClick={() => set('accountType', t.id)}>
                    <div className="aw-apply-type-icon">{t.icon}</div>
                    <div className="aw-apply-type-name">{t.name}</div>
                    <div className="aw-apply-type-desc">{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchasing Details */}
            <div className="aw-apply-section">
              <div className="aw-apply-sec-header">
                <div className="aw-apply-sec-icon"><IconBox /></div>
                <div><div className="aw-apply-sec-title">Purchasing Details</div><div className="aw-apply-sec-sub">Help us understand your buying needs</div></div>
              </div>
              <div className="aw-apply-group" style={{ marginBottom: 16 }}>
                <label className="aw-apply-label">Expected Monthly Volume <span className="aw-apply-req">*</span></label>
                <div className="aw-apply-pills">
                  {VOLUMES.map(v => (
                    <div key={v} className={`aw-apply-pill${form.monthlyVolume === v ? ' selected' : ''}`} onClick={() => set('monthlyVolume', v)}>{v}</div>
                  ))}
                </div>
              </div>
              <div className="aw-apply-group" style={{ marginBottom: 16 }}>
                <label className="aw-apply-label">Product Categories of Interest</label>
                <div className="aw-apply-pills">
                  {CATEGORIES.map(c => (
                    <div key={c.id} className={`aw-apply-pill${categories.includes(c.id) ? ' selected' : ''}`} onClick={() => toggleCat(c.id)}>{c.icon} {c.label}</div>
                  ))}
                </div>
              </div>
              <div className="aw-apply-row">
                <div className="aw-apply-group">
                  <label className="aw-apply-label">Where do you sell?</label>
                  <select className="aw-apply-select" value={form.salesChannel} onChange={e => set('salesChannel', e.target.value)}>
                    <option value="">Select primary channel</option>
                    <option>Online Marketplace</option><option>Physical Store</option><option>B2B / Corporate</option><option>Multiple Channels</option><option>Other</option>
                  </select>
                </div>
                <div className="aw-apply-group">
                  <label className="aw-apply-label">How did you hear about us?</label>
                  <select className="aw-apply-select" value={form.heardAbout} onChange={e => set('heardAbout', e.target.value)}>
                    <option value="">Select one</option>
                    <option>Google Search</option><option>Referral</option><option>Trade Show</option><option>Social Media</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="aw-apply-group">
                <label className="aw-apply-label">Additional Notes</label>
                <textarea className="aw-apply-textarea" rows={3} placeholder="Tell us anything else that would help us understand your business..." value={form.notes} onChange={e => set('notes', e.target.value)} />
              </div>
            </div>

            {/* ── DOCUMENT UPLOAD ── */}
            <div className="aw-apply-section">
              <div className="aw-apply-sec-header">
                <div className="aw-apply-sec-icon"><IconDoc /></div>
                <div>
                  <div className="aw-apply-sec-title">Supporting Documents <span className="aw-upload-badge">Optional</span></div>
                  <div className="aw-apply-sec-sub">Upload your resale certificate, business license, or tax exempt form to speed up approval</div>
                </div>
              </div>

              <div className="aw-upload-grid">
                {UPLOAD_SLOTS.map(slot => {
                  const file = files[slot.id]
                  return (
                    <div key={slot.id} className={`aw-upload-zone${file ? ' has-file' : ''}`}>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        onChange={e => handleFileChange(slot.id, e)}
                      />
                      <div className="aw-upload-icon">{file ? '✅' : slot.icon}</div>
                      <div className="aw-upload-label">{slot.label}</div>
                      {file ? (
                        <div className="aw-upload-filename">{file.name}</div>
                      ) : (
                        <div className="aw-upload-sub">{slot.sub}</div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="aw-upload-note">
                <span>📎</span>
                <span>Accepted formats: PDF, JPG, PNG, DOC, DOCX — max 10MB per file. Documents are stored securely and only used for account verification.</span>
              </div>
            </div>

            {/* Submit */}
            <div className="aw-apply-submit-section">
              {error && <div className="aw-apply-error">{error}</div>}
              <div className="aw-apply-terms">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                <label>I agree to AeroWholesale's <span className="aw-apply-terms-link">Terms of Service</span> and <span className="aw-apply-terms-link">Privacy Policy</span>. I confirm that all information provided is accurate.</label>
              </div>
              <button className="aw-apply-submit-btn" disabled={!agreed || submitting} onClick={handleSubmit}>
                {submitting ? 'Submitting...' : 'Submit Application →'}
              </button>
              <div className="aw-apply-login-row">Already have an account? <a className="aw-apply-login-link" href="/login">Log in here</a></div>
            </div>
          </div>

          <div className="aw-apply-trust">
            <div className="aw-apply-trust-item"><span>🔒</span> Secure & confidential</div>
            <div className="aw-apply-trust-item"><span>⚡</span> 1 business day response</div>
            <div className="aw-apply-trust-item"><span>✅</span> No commitment required</div>
          </div>
        </div>

        {/* Success Overlay */}
        {submitted && (
          <div className="aw-apply-overlay">
            <div className="aw-apply-success">
              <div className="aw-apply-success-icon">🎉</div>
              <div className="aw-apply-success-title">Application Submitted!</div>
              <div className="aw-apply-success-sub">We've received your application and will review it shortly. Here's what happens next:</div>
              <div className="aw-apply-success-timeline">
                <div className="aw-apply-tl-item"><div className="aw-apply-tl-dot" /> You'll receive a confirmation email within minutes</div>
                <div className="aw-apply-tl-item"><div className="aw-apply-tl-dot" /> Our team reviews your application within 1 business day</div>
                <div className="aw-apply-tl-item"><div className="aw-apply-tl-dot" /> Once approved, you'll receive login credentials and full catalog access</div>
              </div>
              <button className="aw-apply-success-btn" onClick={() => navigate('/')}>Got it, thanks!</button>
            </div>
          </div>
        )}

      </div>
    </>
  )
}
