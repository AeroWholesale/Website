import { useState } from 'react'

const css =
  '.aw-fp{font-family:DM Sans,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;}' +
  '.aw-fp-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:40px;width:100%;max-width:420px;box-shadow:0 4px 24px rgba(0,0,0,0.06);}' +
  '.aw-fp-logo{text-align:center;margin-bottom:8px;}' +
  '.aw-fp-logo-text{font-size:18px;font-weight:800;color:#132347;}' +
  '.aw-fp-logo-dot{display:inline-block;width:7px;height:7px;background:#ea580c;border-radius:50%;margin-right:8px;vertical-align:middle;}' +
  '.aw-fp-sub{text-align:center;font-size:13px;color:#64748b;margin-bottom:28px;line-height:1.6;}' +
  '.aw-fp-label{display:block;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;}' +
  '.aw-fp-input{width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:15px;font-family:DM Sans,sans-serif;color:#132347;outline:none;margin-bottom:16px;}' +
  '.aw-fp-input:focus{border-color:#132347;}' +
  '.aw-fp-btn{width:100%;padding:13px;background:#132347;color:#fff;font-weight:800;font-size:15px;border:none;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif;}' +
  '.aw-fp-btn:disabled{opacity:0.5;cursor:not-allowed;}' +
  '.aw-fp-sent{text-align:center;padding:8px 0;}' +
  '.aw-fp-sent-icon{font-size:48px;margin-bottom:12px;}' +
  '.aw-fp-sent-title{font-size:18px;font-weight:800;color:#132347;margin-bottom:8px;}' +
  '.aw-fp-sent-sub{font-size:14px;color:#64748b;line-height:1.6;}' +
  '.aw-fp-back{display:block;text-align:center;font-size:13px;color:#ea580c;font-weight:600;text-decoration:none;margin-top:20px;}'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async () => {
    if (!email.trim()) return
    setLoading(true)
    try {
      await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      setSent(true)
    } catch {
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,800&display=swap" rel="stylesheet" />
      <style>{css}</style>
      <div className="aw-fp">
        <div className="aw-fp-card">
          <div className="aw-fp-logo"><span className="aw-fp-logo-dot" /><span className="aw-fp-logo-text">AeroWholesale</span></div>
          {sent ? (
            <div className="aw-fp-sent">
              <div className="aw-fp-sent-icon">??</div>
              <div className="aw-fp-sent-title">Check your email</div>
              <div className="aw-fp-sent-sub">If that email is associated with an account, you will receive a reset link shortly.</div>
              <a href="/login" className="aw-fp-back">Back to Login</a>
            </div>
          ) : (
            <>
              <div className="aw-fp-sub">Enter your email and we will send you a link to reset your password.</div>
              <label className="aw-fp-label">Email Address</label>
              <input className="aw-fp-input" type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSubmit()} autoFocus />
              <button className="aw-fp-btn" onClick={handleSubmit} disabled={loading || !email.trim()}>{loading ? 'Sending...' : 'Send Reset Link'}</button>
              <a href="/login" className="aw-fp-back">Back to Login</a>
            </>
          )}
        </div>
      </div>
    </>
  )
}
