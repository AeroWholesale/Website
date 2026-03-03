import { useState, useEffect } from 'react'

const css =
  '.aw-portal{font-family:DM Sans,sans-serif;background:#f8fafc;min-height:100vh;}' +
  '.aw-portal-header{background:#132347;padding:16px 32px;display:flex;align-items:center;justify-content:space-between;}' +
  '.aw-portal-logo{font-size:16px;font-weight:800;color:#fff;display:flex;align-items:center;gap:8px;}' +
  '.aw-portal-logo-dot{width:7px;height:7px;background:#ea580c;border-radius:50%;}' +
  '.aw-portal-header-right{display:flex;align-items:center;gap:16px;}' +
  '.aw-portal-user{font-size:13px;color:#a8c0d8;}' +
  '.aw-portal-logout{font-size:13px;background:none;border:1px solid #1e2d4a;padding:6px 14px;border-radius:6px;cursor:pointer;color:#a8c0d8;font-family:DM Sans,sans-serif;}' +
  '.aw-portal-logout:hover{border-color:#334155;color:#e2e8f0;}' +
  '.aw-portal-main{max-width:900px;margin:0 auto;padding:40px 20px;}' +
  '.aw-portal-welcome-title{font-size:24px;font-weight:800;color:#132347;margin-bottom:4px;}' +
  '.aw-portal-welcome-sub{font-size:14px;color:#64748b;margin-bottom:32px;}' +
  '.aw-portal-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-bottom:32px;}' +
  '.aw-portal-card{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;cursor:pointer;transition:border-color 0.15s,box-shadow 0.15s;}' +
  '.aw-portal-card:hover{border-color:#132347;box-shadow:0 4px 16px rgba(19,35,71,0.08);}' +
  '.aw-portal-card-icon{font-size:28px;margin-bottom:12px;}' +
  '.aw-portal-card-title{font-size:15px;font-weight:800;color:#132347;margin-bottom:4px;}' +
  '.aw-portal-card-sub{font-size:13px;color:#64748b;line-height:1.5;}' +
  '.aw-portal-account{background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;}' +
  '.aw-portal-account-title{font-size:15px;font-weight:800;color:#132347;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #f1f4f8;}' +
  '.aw-portal-account-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}' +
  '.aw-portal-field label{font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.06em;display:block;margin-bottom:3px;}' +
  '.aw-portal-field span{font-size:14px;color:#132347;font-weight:600;}' +
  '.aw-portal-badge{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;text-transform:capitalize;background:#dbeafe;color:#1e40af;}' +
  '.aw-portal-loading{text-align:center;padding:80px 20px;font-size:14px;color:#64748b;}'

type User = { id: number; email: string; firstName: string; lastName: string; companyName: string; accountType: string }

export default function Portal() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('aw-token')
    if (!token) { window.location.href = '/login'; return }
    fetch('/api/dealer-me', { headers: { Authorization: 'Bearer ' + token } })
      .then(r => r.json())
      .then(data => {
        if (data.error) { window.location.href = '/login'; return }
        setUser(data)
      })
      .catch(() => { window.location.href = '/login' })
      .finally(() => setLoading(false))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('aw-token')
    localStorage.removeItem('aw-user')
    window.location.href = '/login'
  }

  if (loading) return <><style>{css}</style><div className="aw-portal"><div className="aw-portal-loading">Loading...</div></div></>
  if (!user) return null

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,700;9..40,800&display=swap" rel="stylesheet" />
      <style>{css}</style>
      <div className="aw-portal">
        <div className="aw-portal-header">
          <div className="aw-portal-logo"><div className="aw-portal-logo-dot" />AeroWholesale</div>
          <div className="aw-portal-header-right">
            <div className="aw-portal-user">{user.companyName}</div>
            <button className="aw-portal-logout" onClick={handleLogout}>Sign Out</button>
          </div>
        </div>
        <div className="aw-portal-main">
          <div className="aw-portal-welcome-title">Welcome back, {user.firstName}</div>
          <div className="aw-portal-welcome-sub">{user.companyName} &middot; Wholesale Dealer Portal</div>
          <div className="aw-portal-cards">
            <div className="aw-portal-card" onClick={() => window.location.href = '/catalog'}>
              <div className="aw-portal-card-icon">📦</div>
              <div className="aw-portal-card-title">Browse Inventory</div>
              <div className="aw-portal-card-sub">View available devices with wholesale pricing.</div>
            </div>
            <div className="aw-portal-card" onClick={() => window.location.href = '/contact'}>
              <div className="aw-portal-card-icon">💬</div>
              <div className="aw-portal-card-title">Contact Us</div>
              <div className="aw-portal-card-sub">Questions about an order or need a custom quote?</div>
            </div>
            <div className="aw-portal-card" onClick={() => window.location.href = '/grading'}>
              <div className="aw-portal-card-icon">🔍</div>
              <div className="aw-portal-card-title">Grading Standards</div>
              <div className="aw-portal-card-sub">Review our device condition and grading criteria.</div>
            </div>
          </div>
          <div className="aw-portal-account">
            <div className="aw-portal-account-title">Account Details</div>
            <div className="aw-portal-account-grid">
              <div className="aw-portal-field"><label>Company</label><span>{user.companyName}</span></div>
              <div className="aw-portal-field"><label>Account Type</label><span><span className="aw-portal-badge">{user.accountType}</span></span></div>
              <div className="aw-portal-field"><label>Name</label><span>{user.firstName} {user.lastName}</span></div>
              <div className="aw-portal-field"><label>Email</label><span>{user.email}</span></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}