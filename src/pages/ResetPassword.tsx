@'
import { useState, useEffect } from 'react'

const css =
  '.aw-reset{font-family:DM Sans,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;}' +
  '.aw-reset-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:40px;width:100%;max-width:420px;box-shadow:0 4px 24px rgba(0,0,0,0.06);}' +
  '.aw-reset-logo{text-align:center;margin-bottom:8px;}' +
  '.aw-reset-logo-text{font-size:18px;font-weight:800;color:#132347;}' +
  '.aw-reset-logo-dot{display:inline-block;width:7px;height:7px;background:#ea580c;border-radius:50%;margin-right:8px;vertical-align:middle;}' +
  '.aw-reset-sub{text-align:center;font-size:13px;color:#64748b;margin-bottom:28px;}' +
  '.aw-reset-label{display:block;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;}' +
  '.aw-reset-input{width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:15px;font-family:DM Sans,sans-serif;color:#132347;outline:none;margin-bottom:16px;}' +
  '.aw-reset-input:focus{border-color:#132347;}' +
  '.aw-reset-btn{width:100%;padding:13px;background:#132347;color:#fff;font-weight:800;font-size:15px;border:none;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif;}' +
  '.aw-reset-btn:disabled{opacity:0.5;cursor:not-allowed;}' +
  '.aw-reset-error{background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 14px;font-size:13px;color:#dc2626;margin-bottom:16px;}' +
  '.aw-reset-success{text-align:center;padding:16px 0;}' +
  '.aw-reset-success-icon{font-size:48px;margin-bottom:12px;}' +
  '.aw-reset-success-title{font-size:18px;font-weight:800;color:#132347;margin-bottom:8px;}' +
  '.aw-reset-success-sub{font-size:14px;color:#64748b;margin-bottom:20px;}' +
  '.aw-reset-link{display:block;text-align:center;font-size:13px;color:#ea580c;font-weight:600;text-decoration:none;margin-top:16px;}'

export default function ResetPassword() {
  const token = new URLSearchParams(window.location.search).get('token') || ''
  const [valid, setValid] = useState<boolean | null>(null)
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!token) { setValid(false); return }
    fetch('/api/reset-password?token=' + token)
      .then(r => r.json())
      .then(d => setValid(d.valid === true))
      .catch(() => setValid(false))
  }, [token])

  const handleSubmit = async () => {
    setError('')
    if (!newPw || !confirmPw) { setError('Both fields are required'); return }
    if (newPw !== confirmPw) { setError('Passwords do not match'); return }
    if (newPw.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: newPw }),
      })
      const data = await res.json()
      if (data.success) { setDone(true) }
      else { setError(data.error || 'Something went wrong. Please try again.') }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,800&display=swap" rel="stylesheet" />
      <style>{css}</style>
      <div className="aw-reset">
        <div className="aw-reset-card">
          <div className="aw-reset-logo"><span className="aw-reset-logo-dot" /><span className="aw-reset-logo-text">AeroWholesale</span></div>
          {valid === null ? (
            <div className="aw-reset-sub">Verifying your link...</div>
          ) : valid === false ? (
            <>
              <div className="aw-reset-sub">This reset link is invalid or has expired.</div>
              <a href="/login" className="aw-reset-link">Back to Login</a>
            </>
          ) : done ? (
            <div className="aw-reset-success">
              <div className="aw-reset-success-icon">✅</div>
              <div className="aw-reset-success-title">Password Updated</div>
              <div className="aw-reset-success-sub">Your password has been reset successfully.</div>
              <a href="/login" className="aw-reset-link">Sign In</a>
            </div>
          ) : (
            <>
              <div className="aw-reset-sub">Enter your new password below.</div>
              {error && <div className="aw-reset-error">{error}</div>}
              <label className="aw-reset-label">New Password</label>
              <input className="aw-reset-input" type="password" placeholder="Min 8 characters" value={newPw} onChange={e => setNewPw(e.target.value)} />
              <label className="aw-reset-label">Confirm New Password</label>
              <input className="aw-reset-input" type="password" placeholder="Repeat new password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
              <button className="aw-reset-btn" onClick={handleSubmit} disabled={loading}>{loading ? 'Updating...' : 'Reset Password'}</button>
              <a href="/login" className="aw-reset-link">Back to Login</a>
            </>
          )}
        </div>
      </div>
    </>
  )
}
'@ | Set-Content src/pages/ResetPassword.tsx