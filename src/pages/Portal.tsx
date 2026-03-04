import { useState, useEffect } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .awp { font-family: 'DM Sans', sans-serif; background: #f8fafc; min-height: 100vh; -webkit-font-smoothing: antialiased; }

  .awp-pheader { background: linear-gradient(135deg, #132347 0%, #08101f 100%); padding: 32px 40px 0; }
  .awp-pheader-inner { max-width: 960px; margin: 0 auto; }
  .awp-eyebrow { font-size: 11px; font-weight: 700; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; }
  .awp-welcome { font-size: 26px; font-weight: 900; color: #fff; letter-spacing: -0.03em; margin-bottom: 4px; }
  .awp-sub { font-size: 13px; color: #a8c0d8; margin-bottom: 24px; }

  .awp-tabs { display: flex; gap: 4px; }
  .awp-tab { padding: 10px 18px; font-size: 13px; font-weight: 600; cursor: pointer; border-radius: 8px 8px 0 0; transition: all 0.12s; }
  .awp-tab.active { background: #f8fafc; color: #132347; }
  .awp-tab:not(.active) { color: #a8c0d8; }
  .awp-tab:not(.active):hover { color: #e2e8f0; background: rgba(255,255,255,0.05); }

  .awp-body { max-width: 960px; margin: 0 auto; padding: 32px 40px 60px; }

  .awp-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
  .awp-stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .awp-stat-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
  .awp-stat-val { font-size: 28px; font-weight: 800; color: #132347; }

  .awp-cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .awp-card { background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 20px; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.04); transition: border-color 0.15s, box-shadow 0.15s; }
  .awp-card:hover { border-color: #132347; box-shadow: 0 4px 16px rgba(19,35,71,0.08); }
  .awp-card.highlight { background: #132347; border-color: #1a2f5e; box-shadow: 0 4px 16px rgba(19,35,71,0.15); }
  .awp-card-icon { font-size: 26px; margin-bottom: 10px; }
  .awp-card-title { font-size: 14px; font-weight: 800; color: #132347; margin-bottom: 4px; }
  .awp-card.highlight .awp-card-title { color: #fff; }
  .awp-card-sub { font-size: 12px; color: #64748b; line-height: 1.5; }
  .awp-card.highlight .awp-card-sub { color: #a8c0d8; }
  .awp-card-cta { margin-top: 12px; display: inline-block; background: #ea580c; color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; }

  .awp-section { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.04); margin-bottom: 20px; }
  .awp-section-header { padding: 16px 20px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; }
  .awp-section-title { font-size: 14px; font-weight: 800; color: #132347; }
  .awp-section-sub { font-size: 12px; color: #94a3b8; margin-top: 2px; }
  .awp-section-link { font-size: 12px; font-weight: 600; color: #ea580c; cursor: pointer; }

  .awp-table { width: 100%; border-collapse: collapse; }
  .awp-table th { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; padding: 10px 16px; text-align: left; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
  .awp-table td { padding: 13px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #64748b; }
  .awp-table tr:last-child td { border-bottom: none; }
  .awp-table tr:hover td { background: #fafbfc; }
  .awp-td-ref { font-family: monospace; font-size: 12px; color: #475569; font-weight: 600; }
  .awp-td-bold { font-weight: 700; color: #132347; }
  .awp-td-value { font-weight: 700; color: #ea580c; }

  .awp-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 5px; }
  .awp-badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  .awp-badge-confirmed { background: #ecfdf5; color: #047857; }
  .awp-badge-processing { background: #eff6ff; color: #1d4ed8; }
  .awp-badge-pending { background: #fefce8; color: #854d0e; }
  .awp-badge-declined { background: #fef2f2; color: #b91c1c; }

  .awp-empty { text-align: center; padding: 60px 20px; color: #94a3b8; }
  .awp-empty-icon { font-size: 40px; margin-bottom: 12px; }
  .awp-empty-text { font-size: 14px; font-weight: 600; margin-bottom: 6px; color: #64748b; }
  .awp-empty-sub { font-size: 13px; }

  .awp-account-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; padding: 20px; }
  .awp-field-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px; }
  .awp-field-val { font-size: 14px; color: #132347; font-weight: 600; }
  .awp-acct-badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: capitalize; background: #dbeafe; color: #1e40af; }

  .awp-pw-section { padding: 20px; }
  .awp-pw-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; align-items: end; }
  .awp-pw-label { font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.06em; display: block; margin-bottom: 6px; }
  .awp-pw-input { width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #132347; outline: none; }
  .awp-pw-input:focus { border-color: #132347; }
  .awp-pw-btn { margin-top: 14px; padding: 10px 20px; background: #132347; color: #fff; font-weight: 700; font-size: 13px; border: none; border-radius: 8px; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .awp-pw-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .awp-pw-error { font-size: 13px; color: #dc2626; margin-top: 8px; }
  .awp-pw-success { font-size: 13px; color: #16a34a; margin-top: 8px; font-weight: 600; }

  .awp-loading { text-align: center; padding: 80px 20px; font-size: 14px; color: #64748b; }
`

type User = {
  id: number; email: string; firstName: string; lastName: string;
  companyName: string; accountType: string;
}

type Quote = {
  id: number; ref_number: string; dealer_email: string; company_name: string;
  items: any[]; total_units: number; total_value: string;
  status: string; created_at: string;
}

function statusClass(status: string) {
  const map: Record<string, string> = {
    confirmed: 'awp-badge-confirmed',
    processing: 'awp-badge-processing',
    pending: 'awp-badge-pending',
    declined: 'awp-badge-declined',
  }
  return map[status] || 'awp-badge-pending'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function Portal() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<'overview' | 'quotes' | 'account'>('overview')
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [quotesLoading, setQuotesLoading] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [pwError, setPwError] = useState('')
  const [pwSuccess, setPwSuccess] = useState('')

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

  // Load cart count
  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem('aw-quote-cart') || '[]')
      setCartCount(cart.reduce((s: number, i: any) => s + (i.qty || 1), 0))
    } catch { setCartCount(0) }
  }, [])

  // Load quotes when tab is quotes or overview
  useEffect(() => {
    if (!user) return
    const token = localStorage.getItem('aw-token')
    if (!token) return
    setQuotesLoading(true)
    fetch('/api/submit-quote', { headers: { Authorization: 'Bearer ' + token } })
      .then(r => r.json())
      .then(data => setQuotes(data.quotes || []))
      .catch(() => {})
      .finally(() => setQuotesLoading(false))
  }, [user])

  const handleLogout = () => {
    localStorage.removeItem('aw-token')
    localStorage.removeItem('aw-user')
    window.location.href = '/login'
  }

  const handleChangePassword = async () => {
    setPwError('')
    setPwSuccess('')
    if (!currentPw || !newPw || !confirmPw) { setPwError('All fields are required'); return }
    if (newPw !== confirmPw) { setPwError('New passwords do not match'); return }
    if (newPw.length < 8) { setPwError('New password must be at least 8 characters'); return }
    if (newPw === currentPw) { setPwError('New password must be different from current'); return }
    setPwLoading(true)
    try {
      const token = localStorage.getItem('aw-token') || ''
      const res = await fetch('/api/dealer-change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      })
      const data = await res.json()
      if (data.success) {
        setPwSuccess('Password updated successfully.')
        setCurrentPw(''); setNewPw(''); setConfirmPw('')
      } else {
        setPwError(data.error || 'Failed to update password.')
      }
    } catch { setPwError('Connection error. Please try again.') }
    finally { setPwLoading(false) }
  }

  if (loading) return <><style>{css}</style><div className="awp"><div className="awp-loading">Loading...</div></div></>
  if (!user) return null

  const totalUnits = quotes.reduce((s, q) => s + q.total_units, 0)

  return (
    <>
      <style>{css}</style>
      <div className="awp">

        {/* PORTAL HEADER */}
        <div className="awp-pheader">
          <div className="awp-pheader-inner">
            <div className="awp-eyebrow">Dealer Portal</div>
            <div className="awp-welcome">Welcome back, {user.firstName}</div>
            <div className="awp-sub">{user.companyName} · {user.accountType} account</div>
            <div className="awp-tabs">
              {(['overview', 'quotes', 'account'] as const).map(t => (
                <div key={t} className={`awp-tab${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
                  {t === 'overview' ? 'Overview' : t === 'quotes' ? 'Quote History' : 'Account'}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="awp-body">

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <>
              <div className="awp-stats">
                <div className="awp-stat">
                  <div className="awp-stat-label">Total Quotes</div>
                  <div className="awp-stat-val">{quotes.length}</div>
                </div>
                <div className="awp-stat">
                  <div className="awp-stat-label">Units Ordered</div>
                  <div className="awp-stat-val">{totalUnits.toLocaleString()}</div>
                </div>
                <div className="awp-stat">
                  <div className="awp-stat-label">Cart Items</div>
                  <div className="awp-stat-val">{cartCount}</div>
                </div>
              </div>

              <div className="awp-cards">
                {[
                  { icon: '📦', title: 'Browse Inventory', sub: 'View available devices with wholesale pricing.', href: '/catalog', highlight: false },
                  { icon: '🛒', title: 'Quote Cart', sub: cartCount > 0 ? `${cartCount} item${cartCount !== 1 ? 's' : ''} waiting — review and submit.` : 'Add items from the catalog to get started.', href: '/quote', highlight: true },
                  { icon: '💬', title: 'Contact Us', sub: 'Questions about an order or need a custom quote?', href: '/contact', highlight: false },
                  { icon: '🔍', title: 'Grading Standards', sub: 'Review our device condition and grading criteria.', href: '/grading', highlight: false },
                ].map(c => (
                  <div key={c.title} className={`awp-card${c.highlight ? ' highlight' : ''}`} onClick={() => window.location.href = c.href}>
                    <div className="awp-card-icon">{c.icon}</div>
                    <div className="awp-card-title">{c.title}</div>
                    <div className="awp-card-sub">{c.sub}</div>
                    {c.highlight && <div className="awp-card-cta">View Cart →</div>}
                  </div>
                ))}
              </div>

              {/* Recent quotes */}
              <div className="awp-section">
                <div className="awp-section-header">
                  <div>
                    <div className="awp-section-title">Recent Quotes</div>
                  </div>
                  <div className="awp-section-link" onClick={() => setTab('quotes')}>View all →</div>
                </div>
                {quotesLoading ? (
                  <div style={{ padding: 24, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Loading...</div>
                ) : quotes.length === 0 ? (
                  <div className="awp-empty">
                    <div className="awp-empty-icon">📋</div>
                    <div className="awp-empty-text">No quotes yet</div>
                    <div className="awp-empty-sub">Browse the catalog and add items to get started.</div>
                  </div>
                ) : (
                  <table className="awp-table">
                    <thead>
                      <tr><th>Ref #</th><th>Date</th><th>Units</th><th>Value</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {quotes.slice(0, 3).map(q => (
                        <tr key={q.id}>
                          <td className="awp-td-ref">{q.ref_number}</td>
                          <td>{formatDate(q.created_at)}</td>
                          <td className="awp-td-bold">{q.total_units}</td>
                          <td className="awp-td-value">${Number(q.total_value).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          <td><span className={`awp-badge ${statusClass(q.status)}`}>{q.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* ── QUOTE HISTORY ── */}
          {tab === 'quotes' && (
            <div className="awp-section">
              <div className="awp-section-header">
                <div>
                  <div className="awp-section-title">All Quote Requests</div>
                  <div className="awp-section-sub">Your full quote history with AeroWholesale</div>
                </div>
              </div>
              {quotesLoading ? (
                <div style={{ padding: 24, textAlign: 'center', color: '#94a3b8', fontSize: 13 }}>Loading...</div>
              ) : quotes.length === 0 ? (
                <div className="awp-empty">
                  <div className="awp-empty-icon">📋</div>
                  <div className="awp-empty-text">No quotes yet</div>
                  <div className="awp-empty-sub">Browse the catalog and add items to get started.</div>
                </div>
              ) : (
                <table className="awp-table">
                  <thead>
                    <tr><th>Ref #</th><th>Date</th><th>SKUs</th><th>Units</th><th>Value</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {quotes.map(q => (
                      <tr key={q.id}>
                        <td className="awp-td-ref">{q.ref_number}</td>
                        <td>{formatDate(q.created_at)}</td>
                        <td>{Array.isArray(q.items) ? q.items.length : '—'} SKUs</td>
                        <td className="awp-td-bold">{q.total_units} units</td>
                        <td className="awp-td-value">${Number(q.total_value).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td><span className={`awp-badge ${statusClass(q.status)}`}>{q.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* ── ACCOUNT ── */}
          {tab === 'account' && (
            <>
              <div className="awp-section">
                <div className="awp-section-header">
                  <div className="awp-section-title">Account Details</div>
                </div>
                <div className="awp-account-grid">
                  <div><div className="awp-field-label">Company</div><div className="awp-field-val">{user.companyName}</div></div>
                  <div><div className="awp-field-label">Account Type</div><div className="awp-field-val"><span className="awp-acct-badge">{user.accountType}</span></div></div>
                  <div><div className="awp-field-label">Name</div><div className="awp-field-val">{user.firstName} {user.lastName}</div></div>
                  <div><div className="awp-field-label">Email</div><div className="awp-field-val">{user.email}</div></div>
                </div>
              </div>
              <div className="awp-section">
                <div className="awp-section-header">
                  <div className="awp-section-title">Change Password</div>
                </div>
                <div className="awp-pw-section">
                  <div className="awp-pw-grid">
                    <div>
                      <label className="awp-pw-label">Current Password</label>
                      <input className="awp-pw-input" type="password" placeholder="Current password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} />
                    </div>
                    <div>
                      <label className="awp-pw-label">New Password</label>
                      <input className="awp-pw-input" type="password" placeholder="Min 8 characters" value={newPw} onChange={e => setNewPw(e.target.value)} />
                    </div>
                    <div>
                      <label className="awp-pw-label">Confirm New Password</label>
                      <input className="awp-pw-input" type="password" placeholder="Repeat new password" value={confirmPw} onChange={e => setConfirmPw(e.target.value)} />
                    </div>
                  </div>
                  <button className="awp-pw-btn" onClick={handleChangePassword} disabled={pwLoading}>
                    {pwLoading ? 'Updating...' : 'Update Password'}
                  </button>
                  {pwError && <div className="awp-pw-error">{pwError}</div>}
                  {pwSuccess && <div className="awp-pw-success">{pwSuccess}</div>}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  )
}