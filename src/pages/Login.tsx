import { useState } from 'react'

const css =
  '.aw-login{font-family:DM Sans,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;}' +
  '.aw-login-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:40px;width:100%;max-width:420px;box-shadow:0 4px 24px rgba(0,0,0,0.06);}' +
  '.aw-login-logo{text-align:center;margin-bottom:8px;}' +
  '.aw-login-logo-text{font-size:18px;font-weight:800;color:#132347;}' +
  '.aw-login-logo-dot{display:inline-block;width:7px;height:7px;background:#ea580c;border-radius:50%;margin-right:8px;vertical-align:middle;}' +
  '.aw-login-sub{text-align:center;font-size:13px;color:#64748b;margin-bottom:32px;}' +
  '.aw-login-label{display:block;font-size:12px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;}' +
  '.aw-login-input{width:100%;box-sizing:border-box;padding:12px 14px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:15px;font-family:DM Sans,sans-serif;color:#132347;outline:none;margin-bottom:16px;}' +
  '.aw-login-input:focus{border-color:#132347;}' +
  '.aw-login-btn{width:100%;padding:13px;background:#132347;color:#fff;font-weight:800;font-size:15px;border:none;border-radius:8px;cursor:pointer;font-family:DM Sans,sans-serif;margin-top:4px;}' +
  '.aw-login-btn:hover{background:#0f1b35;}' +
  '.aw-login-btn:disabled{opacity:0.5;cursor:not-allowed;}' +
  '.aw-login-error{background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:12px 14px;font-size:13px;color:#dc2626;margin-bottom:16px;}' +
  '.aw-login-footer{text-align:center;margin-top:24px;font-size:13px;color:#94a3b8;line-height:1.8;}' +
  '.aw-login-footer a{color:#ea580c;text-decoration:none;font-weight:600;}'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/dealer-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })
      const data = await res.json()
      if (data.success) {
        localStorage.setItem('aw-token', data.token)
        localStorage.setItem('aw-user', JSON.stringify(data.user))
        window.location.href = '/portal'
      } else {
        setError(data.error || 'Login failed. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700;9..40,800&display=swap" rel="stylesheet" />
      <style>{css}</style>
      <div className="aw-login">
        <div className="aw-login-card">
          <div className="aw-login-logo">
            <span className="aw-login-logo-dot" />
            <span className="aw-login-logo-text">AeroWholesale</span>
          </div>
          <div className="aw-login-sub">Wholesale Dealer Portal</div>
          {error && <div className="aw-login-error">{error}</div>}
          <label className="aw-login-label">Email Address</label>
          <input
            className="aw-login-input"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
          />
          <label className="aw-login-label">Password</label>
          <input
            className="aw-login-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKey}
          />
          <button
            className="aw-login-btn"
            onClick={handleSubmit}
            disabled={loading || !email.trim() || !password.trim()}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
          <div className="aw-login-footer">
            Need access? <a href="/apply">Apply for a wholesale account</a><br />
            Questions? <a href="mailto:sales@aerowholesale.com">sales@aerowholesale.com</a>
          </div>
        </div>
      </div>
    </>
  )
}
