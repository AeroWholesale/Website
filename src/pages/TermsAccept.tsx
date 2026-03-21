import { useState, useEffect } from 'react'

const css =
  ".aw-tc{font-family:DM Sans,sans-serif;background:#f8fafc;min-height:100vh}" +
  ".aw-tc-header{background:#132347;padding:24px 40px;text-align:center}" +
  ".aw-tc-logo{font-size:18px;font-weight:800;color:#fff;margin-bottom:4px}" +
  ".aw-tc-header-sub{font-size:13px;color:#a8c0d8}" +
  ".aw-tc-main{max-width:740px;margin:0 auto;padding:40px 20px 80px}" +
  ".aw-tc-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;overflow:hidden;margin-bottom:20px}" +
  ".aw-tc-card-header{padding:24px 28px;border-bottom:1px solid #f1f4f8}" +
  ".aw-tc-title{font-size:20px;font-weight:800;color:#132347;margin-bottom:4px}" +
  ".aw-tc-sub{font-size:13px;color:#64748b}" +
  ".aw-tc-body{padding:0 28px 28px;max-height:400px;overflow-y:auto;border-bottom:1px solid #f1f4f8}" +
  ".aw-tc-body h2{font-size:13px;font-weight:800;color:#132347;text-transform:uppercase;letter-spacing:0.06em;margin:24px 0 8px}" +
  ".aw-tc-body p{font-size:13px;color:#334155;line-height:1.7;margin:0 0 10px}" +
  ".aw-tc-body ul{font-size:13px;color:#334155;line-height:1.7;margin:0 0 10px;padding-left:20px}" +
  ".aw-tc-body li{margin-bottom:4px}" +
  ".aw-tc-sign{padding:24px 28px}" +
  ".aw-tc-agree{display:flex;align-items:flex-start;gap:12px;margin-bottom:20px;cursor:pointer}" +
  ".aw-tc-agree input{margin-top:2px;accent-color:#ea580c;width:16px;height:16px;flex-shrink:0;cursor:pointer}" +
  ".aw-tc-agree-label{font-size:14px;color:#334155;line-height:1.5}" +
  ".aw-tc-sig-label{font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px}" +
  ".aw-tc-sig-input{width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:15px;font-family:DM Sans,sans-serif;color:#132347;outline:none;margin-bottom:16px}" +
  ".aw-tc-sig-input:focus{border-color:#ea580c}" +
  ".aw-tc-sig-hint{font-size:12px;color:#94a3b8;margin-bottom:20px;margin-top:-12px}" +
  ".aw-tc-btn{width:100%;padding:14px;background:#ea580c;color:#fff;font-weight:800;font-size:15px;border:none;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif}" +
  ".aw-tc-btn:disabled{opacity:0.5;cursor:not-allowed}" +
  ".aw-tc-meta{padding:16px 28px;background:#f8fafc;border-top:1px solid #f1f4f8}" +
  ".aw-tc-meta-row{display:flex;gap:8px;font-size:12px;color:#64748b;margin-bottom:4px}" +
  ".aw-tc-meta-label{font-weight:700;color:#475569;min-width:80px}" +
  ".aw-tc-done{text-align:center;padding:56px 28px}" +
  ".aw-tc-done-icon{font-size:56px;margin-bottom:16px}" +
  ".aw-tc-done-title{font-size:22px;font-weight:800;color:#132347;margin-bottom:8px}" +
  ".aw-tc-done-sub{font-size:14px;color:#64748b;line-height:1.6;max-width:440px;margin:0 auto}" +
  ".aw-tc-loading{text-align:center;padding:80px 20px;font-size:14px;color:#64748b}" +
  ".aw-tc-error{text-align:center;padding:60px 28px}" +
  ".aw-tc-error-title{font-size:20px;font-weight:800;color:#132347;margin-bottom:8px}" +
  ".aw-tc-error-sub{font-size:14px;color:#64748b}" +
  ".aw-tc-scroll-hint{text-align:center;font-size:12px;color:#94a3b8;padding:8px 0 0}" +
  ".aw-tc-already{background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:16px 20px;margin-bottom:20px;font-size:13px;color:#166534}"

type TcInfo = {
  first_name: string
  last_name: string
  company_name: string
  email: string
  account_type: string
  signed_at: string | null
}

export default function TermsAccept() {
  const token = new URLSearchParams(window.location.search).get('token') || ''
  const [info, setInfo] = useState<TcInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [sigName, setSigName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [alreadySigned, setAlreadySigned] = useState(false)

  useEffect(() => {
    if (!token) { setError('No token provided.'); setLoading(false); return }
    fetch('/api/tc-info?token=' + token)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); return }
        setInfo(data)
        if (data.signed_at) setAlreadySigned(true)
      })
      .catch(() => setError('Failed to load agreement. Please try again.'))
      .finally(() => setLoading(false))
  }, [token])

  const handleSign = async () => {
    if (!agreed || !sigName.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch('/api/sign-terms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, signatureName: sigName.trim() }),
      })
      const data = await res.json()
      if (data.success) {
        setDone(true)
      } else {
        alert('Error: ' + (data.error || 'Something went wrong. Please contact support.'))
      }
    } catch {
      alert('Submission failed. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet" />
      <style>{css}</style>
      <div className="aw-tc">
        <div className="aw-tc-header">
          <div className="aw-tc-logo">AeroWholesale</div>
          <div className="aw-tc-header-sub">Wholesale Account Agreement</div>
        </div>
        <div className="aw-tc-main">
          {loading ? (
            <div className="aw-tc-loading">Loading your agreement...</div>
          ) : error ? (
            <div className="aw-tc-card">
              <div className="aw-tc-error">
                <div className="aw-tc-error-title">Link Not Found</div>
                <div className="aw-tc-error-sub">{error}<br /><br />Please contact <a href="mailto:sales@aerowholesale.com" style={{color:'#ea580c'}}>sales@aerowholesale.com</a> if you believe this is an error.</div>
              </div>
            </div>
          ) : done ? (
            <div className="aw-tc-card">
              <div className="aw-tc-done">
                <div className="aw-tc-done-icon">🎉</div>
                <div className="aw-tc-done-title">Agreement Signed!</div>
                <div className="aw-tc-done-sub">
                  Thank you, {info?.first_name}. Your wholesale account for <strong>{info?.company_name}</strong> is now active.<br /><br />
                  Check your email at <strong>{info?.email}</strong> for your login credentials.
                </div>
              </div>
            </div>
          ) : (
            <div className="aw-tc-card">
              <div className="aw-tc-card-header">
                <div className="aw-tc-title">Wholesale Account Agreement</div>
                <div className="aw-tc-sub">Hi {info?.first_name} — please review the full agreement below and sign to activate your account for <strong>{info?.company_name}</strong>.</div>
              </div>

              {alreadySigned && (
                <div style={{padding:'16px 28px 0'}}>
                  <div className="aw-tc-already">✅ This agreement has already been signed. Your account should be active — check your email for login credentials.</div>
                </div>
              )}

              <div className="aw-tc-body">
                <h2>1. Agreement to Terms</h2>
                <p>By accepting these Terms and Conditions, you ("Dealer" or "you") agree to be bound by this agreement with AeroWholesale LLC, a New Jersey-based refurbished electronics wholesaler ("AeroWholesale"). This agreement governs your wholesale account and all purchases made through aerowholesale.com.</p>
                <h2>2. Account Eligibility</h2>
                <p>Wholesale accounts are available to verified businesses only. By accepting these terms, you represent and warrant that:</p>
                <ul><li>You are a legally registered business entity</li><li>You have provided accurate business information including a valid EIN/Tax ID</li><li>You intend to purchase products for legitimate resale or business use</li><li>You are authorized to enter into binding agreements on behalf of your business</li></ul>
                <h2>3. Pricing</h2>
                <p>All prices are listed on aerowholesale.com and are fixed at the time of purchase. Prices reflect product grade, condition, and market availability and are subject to change without notice.</p>
                <h2>4. Payment Terms</h2>
                <p>AeroWholesale accepts: Wire transfer, Credit card (Visa, Mastercard, Amex, Discover), PayPal, and Zelle. Payment is due in full at time of order. Net terms are not offered unless explicitly authorized in writing.</p>
                <h2>5. Orders & Minimum Order Quantity</h2>
                <p>There is no minimum order quantity (MOQ). All orders are subject to available inventory. AeroWholesale may cancel or partially fulfill orders if inventory is insufficient, with a full refund for any unfulfilled portion.</p>
                <h2>6. Shipping & Fulfillment</h2>
                <p>Orders are typically processed and shipped within 1–3 business days of payment confirmation. Risk of loss transfers to the Dealer upon handoff to the carrier. AeroWholesale is not responsible for carrier delays, lost packages, or transit damage.</p>
                <h2>7. Product Condition & Grading</h2>
                <p>All products are refurbished unless stated otherwise, graded per AeroWholesale standards: CAP/CAP1 (Premium), CA+ (Excellent), CA (Good), SD (B-grade), SD- (C-grade). By ordering, you acknowledge the graded nature of refurbished products.</p>
                <h2>8. Limited Warranty</h2>
                <p>AeroWholesale provides a 30-day limited warranty covering functional defects (device won't power on, non-functional touchscreen, cameras, speakers, microphone, or charging port). Does not cover physical damage, liquid damage, or cosmetic wear consistent with the listed grade incurred after receipt.</p>
                <h2>9. Returns & Defective Products</h2>
                <p>Returns accepted for defective products within 7 days of delivery. Contact sales@aerowholesale.com with order number and documentation to receive an RMA. Non-defective returns are not accepted. All non-defective sales are final.</p>
                <h2>10. Resale & Permitted Use</h2>
                <p>Products may be resold through any legal channel. You agree not to use products for any illegal purpose including fraud, trafficking in stolen goods, or any activity violating applicable law.</p>
                <h2>11. Taxes & Resale Certificates</h2>
                <p>You are responsible for providing a valid resale certificate or sales tax exemption. Without one on file, applicable sales tax will be charged. You are solely responsible for collecting and remitting tax on downstream sales.</p>
                <h2>12. Account Termination</h2>
                <p>AeroWholesale may terminate any account for non-payment, fraudulent activity, or violation of these Terms. All outstanding balances become immediately due upon termination.</p>
                <h2>13. Limitation of Liability</h2>
                <p>AeroWholesale's total liability shall not exceed the amount paid for the specific order. AeroWholesale is not liable for indirect, incidental, consequential, or punitive damages.</p>
                <h2>14. Governing Law</h2>
                <p>These Terms are governed by the laws of New Jersey. Disputes shall be resolved in state or federal courts in Monmouth County, New Jersey.</p>
                <h2>15. Modifications</h2>
                <p>AeroWholesale may update these Terms at any time. Active account holders will be notified of material changes via email.</p>
                <h2>16. Contact</h2>
                <p>AeroWholesale LLC · Eatontown, NJ · sales@aerowholesale.com · aerowholesale.com</p>
              </div>
              <div className="aw-tc-scroll-hint">↑ Scroll to read the full agreement</div>

              {!alreadySigned && (
                <div className="aw-tc-sign">
                  <label className="aw-tc-agree">
                    <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
                    <span className="aw-tc-agree-label">
                      I have read and agree to the AeroWholesale Wholesale Account Terms & Conditions on behalf of <strong>{info?.company_name}</strong>.
                    </span>
                  </label>
                  <div className="aw-tc-sig-label">Electronic Signature</div>
                  <input
                    className="aw-tc-sig-input"
                    type="text"
                    placeholder="Type your full legal name"
                    value={sigName}
                    onChange={e => setSigName(e.target.value)}
                    disabled={!agreed}
                  />
                  <div className="aw-tc-sig-hint">By typing your name above you are signing this agreement electronically.</div>
                  <button
                    className="aw-tc-btn"
                    disabled={!agreed || !sigName.trim() || submitting}
                    onClick={handleSign}
                  >
                    {submitting ? 'Signing...' : 'Accept & Sign Agreement'}
                  </button>
                </div>
              )}

              <div className="aw-tc-meta">
                <div className="aw-tc-meta-row"><span className="aw-tc-meta-label">Company</span><span>{info?.company_name}</span></div>
                <div className="aw-tc-meta-row"><span className="aw-tc-meta-label">Email</span><span>{info?.email}</span></div>
                <div className="aw-tc-meta-row"><span className="aw-tc-meta-label">Account</span><span style={{textTransform:'capitalize'}}>{info?.account_type}</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}