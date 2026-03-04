import { useState, useEffect } from 'react'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  /* LOGIN GATE */
  .aw-admin-login { font-family: 'DM Sans', sans-serif; background: #0f1520; min-height: 100vh; display: flex; align-items: center; justify-content: center; -webkit-font-smoothing: antialiased; }
  .aw-admin-login-card { background: #111827; border: 1px solid #1e2d4a; border-radius: 16px; padding: 40px; width: 380px; text-align: center; }
  .aw-admin-login-logo { font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 4px; display: flex; align-items: center; justify-content: center; gap: 10px; }
  .aw-admin-login-dot { width: 8px; height: 8px; background: #ea580c; border-radius: 50%; }
  .aw-admin-login-sub { font-size: 12px; color: #475569; margin-bottom: 28px; }
  .aw-admin-login-input { width: 100%; padding: 12px 14px; background: #0a0f1a; border: 1.5px solid #1e2d4a; border-radius: 8px; font-size: 14px; color: #e2e8f0; font-family: 'DM Sans', sans-serif; outline: none; margin-bottom: 14px; text-align: center; letter-spacing: 0.1em; }
  .aw-admin-login-input:focus { border-color: #334155; }
  .aw-admin-login-btn { width: 100%; padding: 12px; background: #ea580c; color: #fff; font-size: 14px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.15s; }
  .aw-admin-login-btn:hover { background: #c2410c; }
  .aw-admin-login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  .aw-admin-login-error { font-size: 12px; color: #ef4444; margin-bottom: 14px; }

  .aw-admin { font-family: 'DM Sans', sans-serif; background: #0f1520; color: #e2e8f0; display: flex; min-height: 100vh; -webkit-font-smoothing: antialiased; }

  /* SIDEBAR */
  .aw-admin-sb { width: 220px; background: #0a0f1a; border-right: 1px solid #1e2d4a; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; }
  .aw-admin-sb-logo { padding: 20px 20px 16px; font-size: 15px; font-weight: 800; color: #fff; border-bottom: 1px solid #1e2d4a; display: flex; align-items: center; gap: 10px; }
  .aw-admin-sb-dot { width: 8px; height: 8px; background: #ea580c; border-radius: 50%; }
  .aw-admin-sb-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #334155; padding: 16px 20px 6px; }
  .aw-admin-sb-item { display: flex; align-items: center; gap: 10px; padding: 9px 20px; font-size: 13px; font-weight: 500; color: #64748b; cursor: pointer; border-left: 3px solid transparent; transition: all 0.12s; }
  .aw-admin-sb-item:hover { color: #e2e8f0; background: #111827; }
  .aw-admin-sb-item.active { color: #fff; background: #111827; border-left-color: #ea580c; }
  .aw-admin-sb-badge { margin-left: auto; background: #ea580c; color: #fff; font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 10px; }
  .aw-admin-sb-badge.blue { background: #2563eb; }
  .aw-admin-sb-footer { margin-top: auto; padding: 16px 20px; border-top: 1px solid #1e2d4a; display: flex; align-items: center; gap: 10px; }
  .aw-admin-sb-avatar { width: 32px; height: 32px; border-radius: 50%; background: #1B2E5E; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 800; color: #fff; flex-shrink: 0; }
  .aw-admin-sb-name { font-size: 12px; font-weight: 700; color: #e2e8f0; }
  .aw-admin-sb-role { font-size: 10px; color: #475569; }

  /* CONTENT */
  .aw-admin-content { margin-left: 220px; flex: 1; display: flex; flex-direction: column; }

  /* TOPBAR */
  .aw-admin-topbar { height: 56px; background: #0a0f1a; border-bottom: 1px solid #1e2d4a; display: flex; align-items: center; padding: 0 28px; gap: 16px; position: sticky; top: 0; z-index: 40; }
  .aw-admin-topbar-title { font-size: 15px; font-weight: 700; color: #fff; flex: 1; }

  /* PAGE */
  .aw-admin-page { padding: 28px; }
  .aw-admin-page-title { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.02em; margin-bottom: 4px; }
  .aw-admin-page-sub { font-size: 13px; color: #475569; margin-bottom: 24px; }

  /* STAT CARDS */
  .aw-admin-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; }
  .aw-admin-stat { background: #111827; border: 1px solid #1e2d4a; border-radius: 12px; padding: 18px 20px; }
  .aw-admin-stat-label { font-size: 11px; font-weight: 600; color: #475569; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
  .aw-admin-stat-val { font-size: 26px; font-weight: 800; color: #fff; line-height: 1; }

  /* TABLE */
  .aw-admin-table-card { background: #111827; border: 1px solid #1e2d4a; border-radius: 12px; overflow: hidden; margin-bottom: 20px; }
  .aw-admin-table-header { padding: 14px 20px; border-bottom: 1px solid #1e2d4a; display: flex; align-items: center; justify-content: space-between; }
  .aw-admin-table-title { font-size: 14px; font-weight: 700; color: #fff; }
  .aw-admin-table { width: 100%; border-collapse: collapse; }
  .aw-admin-table th { font-size: 10px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.08em; padding: 10px 16px; text-align: left; border-bottom: 1px solid #1e2d4a; }
  .aw-admin-table td { font-size: 13px; color: #94a3b8; padding: 11px 16px; border-bottom: 1px solid #111827; }
  .aw-admin-table tr:last-child td { border-bottom: none; }
  .aw-admin-table tr:hover td { background: #0f1520; }
  .aw-admin-td-bold { font-weight: 700; color: #e2e8f0; }
  .aw-admin-td-sub { font-size: 11px; color: #334155; }

  /* BADGES */
  .aw-admin-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 5px; }
  .aw-admin-badge::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
  .aw-admin-badge-green { background: #052e16; color: #22c55e; }
  .aw-admin-badge-yellow { background: #1c1400; color: #eab308; }
  .aw-admin-badge-red { background: #1c0606; color: #ef4444; }
  .aw-admin-badge-blue { background: #0c1a3a; color: #60a5fa; }
  .aw-admin-badge-orange { background: #1c0e00; color: #fb923c; }
  .aw-admin-badge-gray { background: #1e2d4a; color: #64748b; }

  /* ACTION BUTTONS */
  .aw-admin-btn { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 5px; cursor: pointer; font-family: 'DM Sans', sans-serif; border: 1px solid; transition: background 0.12s; }
  .aw-admin-btn-approve { background: #052e16; color: #22c55e; border-color: #166534; }
  .aw-admin-btn-approve:hover { background: #14532d; }
  .aw-admin-btn-reject { background: #1c0606; color: #ef4444; border-color: #7f1d1d; }
  .aw-admin-btn-reject:hover { background: #450a0a; }
  .aw-admin-btn-view { background: #0c1a3a; color: #60a5fa; border-color: #1e3a8a; }
  .aw-admin-btn-view:hover { background: #1e3a8a; }
  .aw-admin-btn-docs { background: #1c0e00; color: #fb923c; border-color: #7c2d12; }
  .aw-admin-btn-docs:hover { background: #431407; }
  .aw-admin-btn-primary { background: #ea580c; color: #fff; border-color: #ea580c; font-size: 12px; font-weight: 700; padding: 6px 14px; }
  .aw-admin-btn-primary:hover { background: #c2410c; }

  /* DETAIL PANEL */
  .aw-admin-detail-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; display: flex; align-items: center; justify-content: center; }
  .aw-admin-detail { background: #111827; border: 1px solid #1e2d4a; border-radius: 16px; width: 580px; max-height: 80vh; overflow-y: auto; padding: 32px; }
  .aw-admin-detail-title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 4px; }
  .aw-admin-detail-sub { font-size: 12px; color: #475569; margin-bottom: 24px; }
  .aw-admin-detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
  .aw-admin-detail-field {}
  .aw-admin-detail-label { font-size: 10px; font-weight: 700; color: #334155; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .aw-admin-detail-value { font-size: 14px; color: #e2e8f0; font-weight: 600; }
  .aw-admin-detail-actions { display: flex; gap: 8px; padding-top: 20px; border-top: 1px solid #1e2d4a; }
  .aw-admin-detail-close { margin-left: auto; background: #1e2d4a; color: #94a3b8; border-color: #334155; }

  /* REPLY FORM */
  .aw-admin-reply-textarea { width: 100%; min-height: 100px; padding: 12px; background: #0a0f1a; border: 1px solid #1e2d4a; border-radius: 8px; font-size: 13px; color: #e2e8f0; font-family: 'DM Sans', sans-serif; outline: none; resize: vertical; margin-top: 12px; }
  .aw-admin-reply-textarea:focus { border-color: #334155; }

  /* DOC CHECKLIST */
  .aw-admin-doc-list { margin: 16px 0; }
  .aw-admin-doc-item { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #1e2d4a; font-size: 13px; color: #e2e8f0; cursor: pointer; }
  .aw-admin-doc-item:last-child { border-bottom: none; }
  .aw-admin-doc-item input { width: 16px; height: 16px; accent-color: #ea580c; }
  .aw-admin-doc-desc { font-size: 11px; color: #475569; margin-left: auto; }

  /* TOAST */
  .aw-admin-toast { position: fixed; bottom: 24px; right: 24px; background: #052e16; border: 1px solid #166534; color: #22c55e; padding: 12px 20px; border-radius: 8px; font-size: 13px; font-weight: 600; z-index: 200; animation: toastIn 0.2s; }
  .aw-admin-toast.error { background: #1c0606; border-color: #7f1d1d; color: #ef4444; }
  @keyframes toastIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

  /* MESSAGE CARD */
  .aw-admin-msg { background: #0a0f1a; border: 1px solid #1e2d4a; border-radius: 10px; padding: 18px 20px; margin-bottom: 10px; cursor: pointer; transition: border-color 0.12s; }
  .aw-admin-msg:hover { border-color: #334155; }
  .aw-admin-msg.unread { border-left: 3px solid #ea580c; }
  .aw-admin-msg-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
  .aw-admin-msg-from { font-size: 14px; font-weight: 700; color: #e2e8f0; }
  .aw-admin-msg-date { font-size: 11px; color: #334155; }
  .aw-admin-msg-subject { font-size: 13px; font-weight: 600; color: #94a3b8; margin-bottom: 4px; }
  .aw-admin-msg-preview { font-size: 12px; color: #475569; line-height: 1.5; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 100%; }
  .aw-admin-msg-meta { font-size: 11px; color: #334155; margin-top: 6px; }

  /* EMPTY STATE */
  .aw-admin-empty { text-align: center; padding: 60px 20px; color: #334155; }
  .aw-admin-empty-icon { font-size: 48px; margin-bottom: 12px; }
  .aw-admin-empty-text { font-size: 14px; font-weight: 600; }

  /* TABS */
  .aw-admin-tabs { display: flex; gap: 4px; margin-bottom: 20px; }
  .aw-admin-tab { font-size: 12px; font-weight: 600; color: #64748b; padding: 6px 14px; border-radius: 6px; cursor: pointer; transition: all 0.12s; }
  .aw-admin-tab:hover { color: #e2e8f0; background: #111827; }
  .aw-admin-tab.active { color: #fff; background: #1e2d4a; }

  /* LOADING */
  .aw-admin-loading { text-align: center; padding: 40px; color: #475569; font-size: 14px; }
`

type Application = {
  id: number; first_name: string; last_name: string; email: string; phone: string;
  job_title: string; company_name: string; website: string; ein: string; state: string;
  city: string; years_in_business: string; account_type: string; monthly_volume: string;
  product_categories: string; sales_channel: string; heard_about: string; notes: string;
  status: string; created_at: string;
}

type Message = {
  id: number; name: string; company: string; email: string; subject: string;
  message: string; read: boolean; created_at: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    pending: 'aw-admin-badge-yellow',
    approved: 'aw-admin-badge-green',
    rejected: 'aw-admin-badge-red',
    docs_requested: 'aw-admin-badge-orange',
  }
  return map[status] || 'aw-admin-badge-gray'
}

function typeBadge(type: string) {
  const map: Record<string, string> = {
    enterprise: 'aw-admin-badge-orange',
    wholesale: 'aw-admin-badge-blue',
    reseller: 'aw-admin-badge-green',
  }
  return map[type] || 'aw-admin-badge-gray'
}

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState('')
  const [pwLoading, setPwLoading] = useState(false)
  const [page, setPage] = useState<'applications' | 'messages' | 'sync'>('applications')
  const [apps, setApps] = useState<Application[]>([])
  const [msgs, setMsgs] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<Application | null>(null)
  const [msgDetail, setMsgDetail] = useState<Message | null>(null)
  const [appTab, setAppTab] = useState<'pending' | 'all'>('pending')
  const [replyText, setReplyText] = useState('')
  const [replySending, setReplySending] = useState(false)
  const [docsModal, setDocsModal] = useState<Application | null>(null)
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [docsSending, setDocsSending] = useState(false)
  const [approving, setApproving] = useState<number | null>(null)
  const [toast, setToast] = useState<{ text: string; error?: boolean } | null>(null)

  // Sync Dashboard state
  const [syncStatus, setSyncStatus] = useState<any>(null)
  const [syncLoading, setSyncLoading] = useState(false)
  const [catalogData, setCatalogData] = useState<any>(null)
  const [inventoryData, setInventoryData] = useState<any>(null)
  const [syncSearch, setSyncSearch] = useState('')
  const [syncSearching, setSyncSearching] = useState(false)
  const [syncTab, setSyncTab] = useState<'overview' | 'catalog' | 'inventory'>('overview')

  const testSCAuth = async () => {
    setSyncLoading(true)
    try {
      const res = await fetch('/api/sc/auth')
      setSyncStatus(await res.json())
    } catch (err) {
      setSyncStatus({ error: String(err) })
    } finally {
      setSyncLoading(false)
    }
  }

  const fetchSCCatalog = async (keyword?: string) => {
    setSyncSearching(true)
    try {
      const url = keyword ? `/api/sc/catalog?size=20&active=false&keyword=${encodeURIComponent(keyword)}` : '/api/sc/catalog?size=20&active=false'
      const res = await fetch(url)
      setCatalogData(await res.json())
    } catch (err) {
      setCatalogData({ error: String(err) })
    } finally {
      setSyncSearching(false)
    }
  }

  const fetchSCInventory = async (keyword?: string) => {
    setSyncSearching(true)
    try {
      const url = keyword ? `/api/sc/inventory?size=20&inStockOnly=true&keyword=${encodeURIComponent(keyword)}` : '/api/sc/inventory?size=20&inStockOnly=true'
      const res = await fetch(url)
      setInventoryData(await res.json())
    } catch (err) {
      setInventoryData({ error: String(err) })
    } finally {
      setSyncSearching(false)
    }
  }

  useEffect(() => {
    if (page === 'sync' && !syncStatus) testSCAuth()
  }, [page])

  const handleLogin = async () => {
    setPwLoading(true)
    setPwError('')
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      if (res.ok) {
        setAuthed(true)
        sessionStorage.setItem('aw-admin', '1')
      } else {
        setPwError('Invalid password')
      }
    } catch {
      setPwError('Connection error')
    } finally {
      setPwLoading(false)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('aw-admin') === '1') setAuthed(true)
  }, [])

  const fetchApps = async () => {
    try {
      const res = await fetch('/api/admin-applications')
      if (res.ok) setApps(await res.json())
    } catch {}
  }

  const fetchMsgs = async () => {
    try {
      const res = await fetch('/api/admin-messages')
      if (res.ok) setMsgs(await res.json())
    } catch {}
  }

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    Promise.all([fetchApps(), fetchMsgs()]).finally(() => setLoading(false))
  }, [authed])

  const updateAppStatus = async (id: number, status: string) => {
    try {
      await fetch('/api/admin-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
      setDetail(null)
    } catch {}
  }

  const markRead = async (msg: Message) => {
    setMsgDetail(msg)
    if (!msg.read) {
      try {
        await fetch('/api/admin-messages', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: msg.id, read: true }),
        })
        setMsgs(prev => prev.map(m => m.id === msg.id ? { ...m, read: true } : m))
      } catch {}
    }
  }

  const pendingApps = apps.filter(a => a.status === 'pending')
  const unreadMsgs = msgs.filter(m => !m.read)
  const filteredApps = appTab === 'pending' ? pendingApps : apps

  const showToast = (text: string, error = false) => {
    setToast({ text, error })
    setTimeout(() => setToast(null), 3000)
  }

  const sendReply = async () => {
    if (!msgDetail || !replyText.trim()) return
    setReplySending(true)
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: msgDetail.email,
          subject: `Re: ${msgDetail.subject}`,
          message: replyText,
          replyToMsgId: msgDetail.id,
        }),
      })
      if (res.ok) {
        showToast('Reply sent successfully')
        setMsgDetail(null)
        setReplyText('')
        setMsgs(prev => prev.map(m => m.id === msgDetail.id ? { ...m, read: true } : m))
      } else {
        showToast('Failed to send reply', true)
      }
    } catch { showToast('Failed to send reply', true) }
    finally { setReplySending(false) }
  }

  const requestDocs = async () => {
    if (!docsModal || !selectedDocs.length) return
    setDocsSending(true)
    try {
      const res = await fetch('/api/request-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          applicationId: docsModal.id,
          email: docsModal.email,
          companyName: docsModal.company_name,
          firstName: docsModal.first_name,
          documents: selectedDocs,
        }),
      })
      if (res.ok) {
        showToast('Document request sent')
        setApps(prev => prev.map(a => a.id === docsModal.id ? { ...a, status: 'docs_requested' } : a))
        setDocsModal(null)
        setSelectedDocs([])
        setDetail(null)
      } else { showToast('Failed to send request', true) }
    } catch { showToast('Failed to send request', true) }
    finally { setDocsSending(false) }
  }

  const approveApp = async (app: Application) => {
    setApproving(app.id)
    try {
      const res = await fetch('/api/approve-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: app.id }),
      })
      if (res.ok) {
        showToast(`${app.company_name} approved — welcome email sent`)
        setApps(prev => prev.map(a => a.id === app.id ? { ...a, status: 'approved' } : a))
        setDetail(null)
      } else {
        const data = await res.json()
        showToast(data.error || 'Approval failed', true)
      }
    } catch { showToast('Approval failed', true) }
    finally { setApproving(null) }
  }

  return (
    <>
      <style>{css}</style>

      {!authed ? (
        <div className="aw-admin-login">
          <div className="aw-admin-login-card">
            <div className="aw-admin-login-logo"><div className="aw-admin-login-dot" /> AeroWholesale</div>
            <div className="aw-admin-login-sub">Admin Panel · Enter password to continue</div>
            {pwError && <div className="aw-admin-login-error">{pwError}</div>}
            <input
              className="aw-admin-login-input"
              type="password"
              placeholder="Password"
              value={pw}
              onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              autoFocus
            />
            <button className="aw-admin-login-btn" onClick={handleLogin} disabled={pwLoading || !pw}>
              {pwLoading ? 'Checking...' : 'Enter'}
            </button>
          </div>
        </div>
      ) : (
      <div className="aw-admin">

        {/* SIDEBAR */}
        <div className="aw-admin-sb">
          <div className="aw-admin-sb-logo"><div className="aw-admin-sb-dot" /> AeroWholesale</div>

          <div className="aw-admin-sb-label">Overview</div>
          <div className={`aw-admin-sb-item${page === 'applications' ? ' active' : ''}`} onClick={() => setPage('applications')}>
            <span>✅</span> Applications
            {pendingApps.length > 0 && <span className="aw-admin-sb-badge">{pendingApps.length}</span>}
          </div>
          <div className={`aw-admin-sb-item${page === 'messages' ? ' active' : ''}`} onClick={() => setPage('messages')}>
            <span>💬</span> Messages
            {unreadMsgs.length > 0 && <span className="aw-admin-sb-badge">{unreadMsgs.length}</span>}
          </div>

          <div className="aw-admin-sb-label">Coming Soon</div>
          <div className="aw-admin-sb-item" style={{ opacity: 0.4, cursor: 'default' }}><span>👥</span> User Management</div>
          <div className={`aw-admin-sb-item${page === 'sync' ? ' active' : ''}`} onClick={() => setPage('sync')}><span>🔄</span> Sync Dashboard</div>
          <div className="aw-admin-sb-item" style={{ opacity: 0.4, cursor: 'default' }}><span>📦</span> Product Families</div>
          <div className="aw-admin-sb-item" style={{ opacity: 0.4, cursor: 'default' }}><span>⚙️</span> Grade Multipliers</div>
          <div className="aw-admin-sb-item" style={{ opacity: 0.4, cursor: 'default' }}><span>📋</span> Quote Requests</div>

          <div className="aw-admin-sb-footer">
            <div className="aw-admin-sb-avatar">I</div>
            <div>
              <div className="aw-admin-sb-name">Isaac</div>
              <div className="aw-admin-sb-role">Owner · Admin</div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="aw-admin-content">
          <div className="aw-admin-topbar">
            <div className="aw-admin-topbar-title">{page === 'applications' ? 'Account Applications' : page === 'messages' ? 'Contact Messages' : 'SellerCloud Sync'}</div>
          </div>

         {page !== 'sync' && <div className="aw-admin-page">
            {loading ? (
              <div className="aw-admin-loading">Loading...</div>
            ) : page === 'applications' ? (
              <>
                {/* STATS */}
                <div className="aw-admin-stats">
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Pending Review</div><div className="aw-admin-stat-val">{pendingApps.length}</div></div>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Total Applications</div><div className="aw-admin-stat-val">{apps.length}</div></div>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Approved</div><div className="aw-admin-stat-val">{apps.filter(a => a.status === 'approved').length}</div></div>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Docs Requested</div><div className="aw-admin-stat-val">{apps.filter(a => a.status === 'docs_requested').length}</div></div>
                </div>

                {/* TABS */}
                <div className="aw-admin-tabs">
                  <div className={`aw-admin-tab${appTab === 'pending' ? ' active' : ''}`} onClick={() => setAppTab('pending')}>Pending ({pendingApps.length})</div>
                  <div className={`aw-admin-tab${appTab === 'all' ? ' active' : ''}`} onClick={() => setAppTab('all')}>All Applications ({apps.length})</div>
                </div>

                {/* TABLE */}
                {filteredApps.length === 0 ? (
                  <div className="aw-admin-empty">
                    <div className="aw-admin-empty-icon">📭</div>
                    <div className="aw-admin-empty-text">{appTab === 'pending' ? 'No pending applications' : 'No applications yet'}</div>
                  </div>
                ) : (
                  <div className="aw-admin-table-card">
                    <div className="aw-admin-table-header">
                      <div className="aw-admin-table-title">{appTab === 'pending' ? 'Pending Applications' : 'All Applications'}</div>
                    </div>
                    <table className="aw-admin-table">
                      <thead>
                        <tr><th>Company</th><th>Contact</th><th>Type</th><th>Volume</th><th>Applied</th><th>Status</th><th>Actions</th></tr>
                      </thead>
                      <tbody>
                        {filteredApps.map(app => (
                          <tr key={app.id}>
                            <td>
                              <div className="aw-admin-td-bold">{app.company_name}</div>
                              <div className="aw-admin-td-sub">{app.state}</div>
                            </td>
                            <td>
                              <div style={{ fontSize: 12, color: '#94a3b8' }}>{app.first_name} {app.last_name}</div>
                              <div className="aw-admin-td-sub">{app.email}</div>
                            </td>
                            <td><span className={`aw-admin-badge ${typeBadge(app.account_type)}`}>{app.account_type}</span></td>
                            <td>{app.monthly_volume}</td>
                            <td>{timeAgo(app.created_at)}</td>
                            <td><span className={`aw-admin-badge ${statusBadge(app.status)}`}>{app.status.replace('_', ' ')}</span></td>
                            <td>
                              <div style={{ display: 'flex', gap: 5 }}>
                                <button className="aw-admin-btn aw-admin-btn-view" onClick={() => setDetail(app)}>View</button>
                                {app.status === 'pending' && (
                                  <>
                                    <button className="aw-admin-btn aw-admin-btn-approve" onClick={() => approveApp(app)}>{approving === app.id ? '...' : 'Approve'}</button>
                                    <button className="aw-admin-btn aw-admin-btn-docs" onClick={() => { setDocsModal(app); setSelectedDocs([]) }}>Req Docs</button>
                                    <button className="aw-admin-btn aw-admin-btn-reject" onClick={() => updateAppStatus(app.id, 'rejected')}>Reject</button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* MESSAGES */}
                <div className="aw-admin-stats" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Unread</div><div className="aw-admin-stat-val">{unreadMsgs.length}</div></div>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Total Messages</div><div className="aw-admin-stat-val">{msgs.length}</div></div>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Today</div><div className="aw-admin-stat-val">{msgs.filter(m => new Date(m.created_at).toDateString() === new Date().toDateString()).length}</div></div>
                </div>

                {msgs.length === 0 ? (
                  <div className="aw-admin-empty">
                    <div className="aw-admin-empty-icon">📭</div>
                    <div className="aw-admin-empty-text">No contact messages yet</div>
                  </div>
                ) : (
                  msgs.map(msg => (
                    <div key={msg.id} className={`aw-admin-msg${!msg.read ? ' unread' : ''}`} onClick={() => markRead(msg)}>
                      <div className="aw-admin-msg-top">
                        <div className="aw-admin-msg-from">{msg.name}{msg.company && ` · ${msg.company}`}</div>
                        <div className="aw-admin-msg-date">{timeAgo(msg.created_at)}</div>
                      </div>
                      <div className="aw-admin-msg-subject">{msg.subject}</div>
                      <div className="aw-admin-msg-preview">{msg.message}</div>
                      <div className="aw-admin-msg-meta">{msg.email}</div>
                    </div>
                  ))
                )}
              </>
            ) : null}
          </div>}

        {/* APPLICATION DETAIL MODAL */}
        {detail && (
          <div className="aw-admin-detail-overlay" onClick={() => setDetail(null)}>
            <div className="aw-admin-detail" onClick={e => e.stopPropagation()}>
              <div className="aw-admin-detail-title">{detail.company_name}</div>
              <div className="aw-admin-detail-sub">Applied {timeAgo(detail.created_at)} · <span className={`aw-admin-badge ${statusBadge(detail.status)}`}>{detail.status.replace('_', ' ')}</span></div>

              <div className="aw-admin-detail-grid">
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Contact</div><div className="aw-admin-detail-value">{detail.first_name} {detail.last_name}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Email</div><div className="aw-admin-detail-value">{detail.email}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Phone</div><div className="aw-admin-detail-value">{detail.phone}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Job Title</div><div className="aw-admin-detail-value">{detail.job_title || '—'}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">EIN / Tax ID</div><div className="aw-admin-detail-value">{detail.ein}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Website</div><div className="aw-admin-detail-value">{detail.website || '—'}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Location</div><div className="aw-admin-detail-value">{detail.city ? `${detail.city}, ` : ''}{detail.state}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Years in Business</div><div className="aw-admin-detail-value">{detail.years_in_business || '—'}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Account Type</div><div className="aw-admin-detail-value" style={{ textTransform: 'capitalize' }}>{detail.account_type}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Monthly Volume</div><div className="aw-admin-detail-value">{detail.monthly_volume}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Product Categories</div><div className="aw-admin-detail-value">{detail.product_categories || '—'}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Sales Channel</div><div className="aw-admin-detail-value">{detail.sales_channel || '—'}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">How They Found Us</div><div className="aw-admin-detail-value">{detail.heard_about || '—'}</div></div>
              </div>

              {detail.notes && (
                <div style={{ marginBottom: 24 }}>
                  <div className="aw-admin-detail-label">Notes</div>
                  <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginTop: 4 }}>{detail.notes}</div>
                </div>
              )}

              <div className="aw-admin-detail-actions">
                {detail.status === 'pending' && (
                  <>
                    <button className="aw-admin-btn aw-admin-btn-approve" disabled={approving === detail.id} onClick={() => approveApp(detail)}>{approving === detail.id ? '...' : '✓ Approve'}</button>
                    <button className="aw-admin-btn aw-admin-btn-docs" onClick={() => { setDocsModal(detail); setSelectedDocs([]) }}>📄 Request Documents</button>
                    <button className="aw-admin-btn aw-admin-btn-reject" onClick={() => updateAppStatus(detail.id, 'rejected')}>✗ Reject</button>
                  </>
                )}
                {detail.status === 'docs_requested' && (
                  <>
                    <button className="aw-admin-btn aw-admin-btn-approve" disabled={approving === detail.id} onClick={() => approveApp(detail)}>{approving === detail.id ? '...' : '✓ Approve'}</button>
                    <button className="aw-admin-btn aw-admin-btn-docs" onClick={() => { setDocsModal(detail); setSelectedDocs([]) }}>📄 Request Docs Again</button>
                  </>
                )}
                <button className="aw-admin-btn aw-admin-detail-close" onClick={() => setDetail(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* MESSAGE DETAIL MODAL */}
        {msgDetail && (
          <div className="aw-admin-detail-overlay" onClick={() => { setMsgDetail(null); setReplyText('') }}>
            <div className="aw-admin-detail" onClick={e => e.stopPropagation()}>
              <div className="aw-admin-detail-title">{msgDetail.subject}</div>
              <div className="aw-admin-detail-sub">From {msgDetail.name}{msgDetail.company && ` at ${msgDetail.company}`} · {timeAgo(msgDetail.created_at)}</div>

              <div className="aw-admin-detail-grid" style={{ marginBottom: 20 }}>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Email</div><div className="aw-admin-detail-value">{msgDetail.email}</div></div>
                <div className="aw-admin-detail-field"><div className="aw-admin-detail-label">Company</div><div className="aw-admin-detail-value">{msgDetail.company || '—'}</div></div>
              </div>

              <div className="aw-admin-detail-label">Message</div>
              <div style={{ fontSize: 14, color: '#e2e8f0', lineHeight: 1.7, marginTop: 8, padding: 16, background: '#0a0f1a', borderRadius: 8, border: '1px solid #1e2d4a' }}>{msgDetail.message}</div>

              <div className="aw-admin-detail-label" style={{ marginTop: 20 }}>Reply</div>
              <textarea
                className="aw-admin-reply-textarea"
                placeholder="Type your reply..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
              />

              <div className="aw-admin-detail-actions" style={{ marginTop: 16 }}>
                <button className="aw-admin-btn aw-admin-btn-primary" disabled={replySending || !replyText.trim()} onClick={sendReply}>
                  {replySending ? 'Sending...' : '📧 Send Reply'}
                </button>
                <button className="aw-admin-btn aw-admin-detail-close" onClick={() => { setMsgDetail(null); setReplyText('') }}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENT REQUEST MODAL */}
        {docsModal && (
          <div className="aw-admin-detail-overlay" onClick={() => setDocsModal(null)}>
            <div className="aw-admin-detail" onClick={e => e.stopPropagation()}>
              <div className="aw-admin-detail-title">Request Documents</div>
              <div className="aw-admin-detail-sub">Select which documents to request from {docsModal.company_name}</div>

              <div className="aw-admin-doc-list">
                {[
                  { id: 'w9', label: 'W-9 Form', desc: 'Tax identification' },
                  { id: 'st3', label: 'ST-3 Sales Tax Exemption', desc: 'NJ tax exempt' },
                  { id: 'resale', label: 'Resale Certificate', desc: 'Other states' },
                  { id: 'ein', label: 'EIN Verification Letter', desc: 'IRS letter' },
                  { id: 'formation', label: 'Business Formation Docs', desc: 'LLC/Corp docs' },
                  { id: 'id', label: 'Government-Issued Photo ID', desc: 'Drivers license etc' },
                  { id: 'insurance', label: 'Certificate of Insurance', desc: 'If applicable' },
                ].map(doc => (
                  <label key={doc.id} className="aw-admin-doc-item">
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc.id)}
                      onChange={() => setSelectedDocs(prev => prev.includes(doc.id) ? prev.filter(d => d !== doc.id) : [...prev, doc.id])}
                    />
                    {doc.label}
                    <span className="aw-admin-doc-desc">{doc.desc}</span>
                  </label>
                ))}
              </div>

              <div className="aw-admin-detail-actions">
                <button className="aw-admin-btn aw-admin-btn-primary" disabled={docsSending || !selectedDocs.length} onClick={requestDocs}>
                  {docsSending ? 'Sending...' : `📧 Send Request (${selectedDocs.length} docs)`}
                </button>
                <button className="aw-admin-btn aw-admin-detail-close" onClick={() => setDocsModal(null)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* SYNC DASHBOARD */}
        {page === 'sync' && (
          <div className="aw-admin-page">
            <div className="aw-admin-page-title">SellerCloud Integration</div>
            <div className="aw-admin-page-sub">Real-time connection to your SellerCloud inventory</div>

            {/* Connection Status */}
            <div className="aw-admin-stats">
              <div className="aw-admin-stat">
                <div className="aw-admin-stat-label">Connection</div>
                <div className="aw-admin-stat-val" style={{ fontSize: 16 }}>
                  {syncLoading ? '...' : syncStatus?.success ? <span style={{color:'#22c55e'}}>Connected</span> : <span style={{color:'#ef4444'}}>Error</span>}
                </div>
              </div>
              <div className="aw-admin-stat">
                <div className="aw-admin-stat-label">API Endpoint</div>
                <div className="aw-admin-stat-val" style={{ fontSize: 12, color: '#94a3b8' }}>bi.api.sellercloud.com</div>
              </div>
              <div className="aw-admin-stat">
                <div className="aw-admin-stat-label">Catalog Products</div>
                <div className="aw-admin-stat-val">{catalogData?.total?.toLocaleString() || '—'}</div>
              </div>
              <div className="aw-admin-stat">
                <div className="aw-admin-stat-label">In-Stock SKUs</div>
                <div className="aw-admin-stat-val">{inventoryData?.total?.toLocaleString() || '—'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
              <button className="aw-admin-btn aw-admin-btn-primary" onClick={testSCAuth} disabled={syncLoading}>
                {syncLoading ? 'Testing...' : '\u{1F504} Test Connection'}
              </button>
              <button className="aw-admin-btn aw-admin-btn-view" onClick={() => fetchSCCatalog()} disabled={syncSearching}>
                {syncSearching ? 'Loading...' : '\u{1F4E6} Load Catalog'}
              </button>
              <button className="aw-admin-btn aw-admin-btn-docs" onClick={() => fetchSCInventory()} disabled={syncSearching}>
                {syncSearching ? 'Loading...' : '\u{1F4CA} Load Inventory'}
              </button>
            </div>

            {syncStatus?.error && (
              <div style={{ background: '#1c0606', border: '1px solid #7f1d1d', borderRadius: 8, padding: 16, marginBottom: 20, fontSize: 13, color: '#ef4444' }}>
                {syncStatus.error}
              </div>
            )}

            {/* Search */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  style={{ flex: 1, padding: '10px 14px', background: '#0a0f1a', border: '1px solid #1e2d4a', borderRadius: 8, fontSize: 13, color: '#e2e8f0', fontFamily: "'DM Sans', sans-serif", outline: 'none' }}
                  placeholder="Search products (e.g. iPhone, iPad, Samsung)..."
                  value={syncSearch}
                  onChange={e => setSyncSearch(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && syncSearch.trim()) { fetchSCCatalog(syncSearch); fetchSCInventory(syncSearch) } }}
                />
                <button className="aw-admin-btn aw-admin-btn-primary" onClick={() => { fetchSCCatalog(syncSearch); fetchSCInventory(syncSearch) }} disabled={syncSearching || !syncSearch.trim()}>
                  Search
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="aw-admin-tabs">
              <div className={`aw-admin-tab${syncTab === 'overview' ? ' active' : ''}`} onClick={() => setSyncTab('overview')}>Overview</div>
              <div className={`aw-admin-tab${syncTab === 'catalog' ? ' active' : ''}`} onClick={() => setSyncTab('catalog')}>
                Catalog {catalogData?.total ? `(${catalogData.total})` : ''}
              </div>
              <div className={`aw-admin-tab${syncTab === 'inventory' ? ' active' : ''}`} onClick={() => setSyncTab('inventory')}>
                Inventory {inventoryData?.total ? `(${inventoryData.total})` : ''}
              </div>
            </div>

            {/* Overview Tab */}
            {syncTab === 'overview' && (
              <div className="aw-admin-table-card">
                <div className="aw-admin-table-header">
                  <div className="aw-admin-table-title">Integration Status</div>
                </div>
                <table className="aw-admin-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="aw-admin-td-bold">API Authentication</td>
                      <td><span className={`aw-admin-badge ${syncStatus?.success ? 'aw-admin-badge-green' : 'aw-admin-badge-red'}`}>{syncStatus?.success ? 'Active' : 'Not Connected'}</span></td>
                      <td>{syncStatus?.success ? `Token expires in ${syncStatus.expiresIn}` : syncStatus?.error || 'Click Test Connection'}</td>
                    </tr>
                    <tr>
                      <td className="aw-admin-td-bold">Catalog Sync</td>
                      <td><span className={`aw-admin-badge ${catalogData?.total > 0 ? 'aw-admin-badge-green' : 'aw-admin-badge-yellow'}`}>{catalogData?.total > 0 ? 'Data Available' : 'Not Loaded'}</span></td>
                      <td>{catalogData?.total ? `${catalogData.total.toLocaleString()} products` : 'Click Load Catalog'}</td>
                    </tr>
                    <tr>
                      <td className="aw-admin-td-bold">Inventory Sync</td>
                      <td><span className={`aw-admin-badge ${inventoryData?.total > 0 ? 'aw-admin-badge-green' : 'aw-admin-badge-yellow'}`}>{inventoryData?.total > 0 ? 'Data Available' : 'Not Loaded'}</span></td>
                      <td>{inventoryData?.total ? `${inventoryData.total.toLocaleString()} in-stock SKUs` : 'Click Load Inventory'}</td>
                    </tr>
                    <tr>
                      <td className="aw-admin-td-bold">Website Catalog</td>
                      <td><span className="aw-admin-badge aw-admin-badge-yellow">Pending</span></td>
                      <td>Not yet wired to live data</td>
                    </tr>
                    <tr>
                      <td className="aw-admin-td-bold">Auto-Sync Schedule</td>
                      <td><span className="aw-admin-badge aw-admin-badge-gray">Not Set</span></td>
                      <td>Manual sync only</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Catalog Tab */}
            {syncTab === 'catalog' && catalogData?.items && (
              <div className="aw-admin-table-card">
                <div className="aw-admin-table-header">
                  <div className="aw-admin-table-title">SellerCloud Catalog ({catalogData.total?.toLocaleString()} products)</div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="aw-admin-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Product</th>
                        <th>Qty</th>
                        <th>Avg Cost</th>
                        <th>Sold 30d</th>
                        <th>Sold 90d</th>
                        <th>Channels</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalogData.items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td><span className="aw-admin-td-bold" style={{ fontSize: 11, fontFamily: 'monospace' }}>{item.sku}</span></td>
                          <td>
                            <div className="aw-admin-td-bold">{item.name}</div>
                            {item.parsed && <div className="aw-admin-td-sub">{item.parsed.deviceType} · {item.parsed.manufacturer} · {item.parsed.gradeDescription}</div>}
                          </td>
                          <td style={{ color: item.physicalQty > 0 ? '#22c55e' : '#ef4444', fontWeight: 700 }}>{item.physicalQty}</td>
                          <td>{item.avgCost > 0 ? `${item.avgCost.toFixed(2)}` : '—'}</td>
                          <td>{item.sold30 || '—'}</td>
                          <td>{item.sold90 || '—'}</td>
                          <td style={{ fontSize: 11 }}>
                            {[item.backMarketEnabled && 'BM', item.ebayEnabled && 'eBay', item.walmartEnabled && 'WM', item.amazonEnabled && 'AMZ'].filter(Boolean).join(', ') || '—'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {syncTab === 'catalog' && !catalogData?.items && (
              <div className="aw-admin-empty">
                <div className="aw-admin-empty-icon">{'📦'}</div>
                <div className="aw-admin-empty-text">Click "Load Catalog" or search to see products</div>
              </div>
            )}

            {/* Inventory Tab */}
            {syncTab === 'inventory' && inventoryData?.items && (
              <div className="aw-admin-table-card">
                <div className="aw-admin-table-header">
                  <div className="aw-admin-table-title">SellerCloud Inventory ({inventoryData.total?.toLocaleString()} in-stock SKUs)</div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="aw-admin-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Product</th>
                        <th>Physical</th>
                        <th>Available</th>
                        <th>Reserved</th>
                        <th>Avg Cost</th>
                        <th>Warehouse</th>
                        <th>Velocity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryData.items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td><span className="aw-admin-td-bold" style={{ fontSize: 11, fontFamily: 'monospace' }}>{item.sku}</span></td>
                          <td className="aw-admin-td-bold">{item.name}</td>
                          <td style={{ color: '#22c55e', fontWeight: 700 }}>{item.physicalQty}</td>
                          <td>{item.availableQty}</td>
                          <td>{item.reservedQty || '—'}</td>
                          <td>{item.avgCost > 0 ? `${item.avgCost.toFixed(2)}` : '—'}</td>
                          <td style={{ fontSize: 11 }}>{item.warehouseName || '—'}</td>
                          <td style={{ fontSize: 11 }}>{item.sold30 > 0 ? `${item.sold30}/30d` : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {syncTab === 'inventory' && !inventoryData?.items && (
              <div className="aw-admin-empty">
                <div className="aw-admin-empty-icon">{'📊'}</div>
                <div className="aw-admin-empty-text">Click "Load Inventory" or search to see stock levels</div>
              </div>
            )}
          </div>
        )}

        {/* TOAST */}
        {toast && <div className={`aw-admin-toast${toast.error ? ' error' : ''}`}>{toast.text}</div>}

        </div>
      </div>
      )}
    </>
  )
}