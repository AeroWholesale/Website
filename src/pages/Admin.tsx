import React, { useState, useEffect } from 'react'

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
  .aw-admin-content { margin-left: 220px; flex: 1; display: flex; flex-direction: column; height: 100vh; overflow-y: auto; }

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
  .aw-admin-stat-label { font-size: 11px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; }
  .aw-admin-stat-val { font-size: 26px; font-weight: 800; color: #fff; line-height: 1; }

  /* TABLE */
  .aw-admin-table-card { background: #111827; border: 1px solid #1e2d4a; border-radius: 12px; overflow: hidden; margin-bottom: 20px; }
  .aw-admin-table-header { padding: 14px 20px; border-bottom: 1px solid #1e2d4a; display: flex; align-items: center; justify-content: space-between; }
  .aw-admin-table-title { font-size: 14px; font-weight: 700; color: #fff; }
  .aw-admin-table { width: 100%; border-collapse: collapse; }
  .aw-admin-table th { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; padding: 10px 16px; text-align: left; border-bottom: 1px solid #1e2d4a; }
  .aw-admin-table td { font-size: 13px; color: #cbd5e1; padding: 11px 16px; border-bottom: 1px solid #111827; }
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
  const [page, setPage] = useState<'applications' | 'messages' | 'sync' | 'families' | 'grades' | 'review' | 'users'>('applications')
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

  // Product families + grades admin state
  const [familiesData, setFamiliesData] = useState<any>(null)
  const [familiesLoading, setFamiliesLoading] = useState(false)
  const [gradesData, setGradesData] = useState<any>(null)
  const [gradesLoading, setGradesLoading] = useState(false)
  const [editingFamily, setEditingFamily] = useState<any>(null)
  const [editingGrade, setEditingGrade] = useState<any>(null)
  const [familySaving, setFamilySaving] = useState(false)
  const [gradeSaving, setGradeSaving] = useState(false)
  const [familyFilter, setFamilyFilter] = useState('')
  const [familySort, setFamilySort] = useState<'name' | 'brand' | 'stock' | 'category'>('name')
  const [familyBrandFilter, setFamilyBrandFilter] = useState('')
  const [familyCatFilter, setFamilyCatFilter] = useState('')
  const [familyVisFilter, setFamilyVisFilter] = useState<'' | 'yes' | 'no'>('')
  const [familyStockFilter, setFamilyStockFilter] = useState<'' | 'instock' | 'nostock'>('')

  // Review Queue state
  const [reviewData, setReviewData] = useState<any>(null)
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewFilter, setReviewFilter] = useState('all')
  const [reviewSelected, setReviewSelected] = useState<string[]>([])

  // Collapsible sections
  const [unmappedOpen, setUnmappedOpen] = useState(true)
  const [mappedOpen, setMappedOpen] = useState(true)
  const [expandedFamily, setExpandedFamily] = useState<string | null>(null)
  const [familyDetail, setFamilyDetail] = useState<any>(null)
  const [familyDetailLoading, setFamilyDetailLoading] = useState(false)
  const [skuTab, setSkuTab] = useState<'visible' | 'hidden' | 'all'>('visible')
  const [skuSelected, setSkuSelected] = useState<string[]>([])
  const [skuSearch, setSkuSearch] = useState('')


  const loadFamilies = async () => {
    setFamiliesLoading(true)
    try {
      const res = await fetch('/api/sc/admin-families')
      const data = await res.json()
      if (data && data.families) {
        setFamiliesData(data)
      } else { console.error('Bad families response:', data); setFamiliesData(null) }
    } catch (err) { console.error(err); setFamiliesData(null) }
    setFamiliesLoading(false)
  }

  const loadFamilyDetail = async (modelCode: string) => {
    if (expandedFamily === modelCode) {
      setExpandedFamily(null); setFamilyDetail(null); setSkuTab('visible'); setSkuSelected([]); setSkuSearch(''); return
    }
    setExpandedFamily(modelCode); setFamilyDetailLoading(true); setSkuTab('visible'); setSkuSelected([]); setSkuSearch('')
    try {
      const res = await fetch('/api/sc/admin-families?family=' + encodeURIComponent(modelCode))
      const data = await res.json()
      if (data && data.family) { setFamilyDetail(data) } else { setFamilyDetail(null) }
    } catch (err) { console.error(err); setFamilyDetail(null) }
    setFamilyDetailLoading(false)
  }

  const toggleSkuHidden = async (sku: string, hide: boolean) => {
    try {
      await fetch('/api/sc/review-queue', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: hide ? 'hide' : 'show', skus: [sku] }) })
      if (expandedFamily) { setFamilyDetailLoading(true); const res = await fetch('/api/sc/admin-families?family=' + encodeURIComponent(expandedFamily)); const data = await res.json(); if (data && data.family) setFamilyDetail(data); setFamilyDetailLoading(false) }
    } catch (err) { showToast('Failed to update SKU', true) }
  }

  const bulkSkuAction = async (action: string) => {
    if (skuSelected.length === 0) return
    try {
      await fetch('/api/sc/review-queue', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action, skus: skuSelected }) })
      showToast(action + ' applied to ' + skuSelected.length + ' SKU(s)')
      setSkuSelected([])
      if (expandedFamily) { const res = await fetch('/api/sc/admin-families?family=' + encodeURIComponent(expandedFamily)); const data = await res.json(); if (data && data.family) setFamilyDetail(data) }
    } catch (err) { showToast('Bulk action failed', true) }
  }

  const loadReview = async (filter?: string) => {
    setReviewLoading(true)
    try {
      const f = filter || reviewFilter
      const res = await fetch('/api/sc/review-queue?filter=' + f)
      const rdata = await res.json()
      if (rdata && rdata.stats) { setReviewData(rdata) } else { console.error('Bad review resp:', rdata); setReviewData(null) }
      setReviewSelected([])
    } catch (err) { console.error(err) }
    setReviewLoading(false)
  }

  const reviewAction = async (action: string, skus: string[], grade?: string) => {
    try {
      const body: any = { action, skus, grade }
      const res = await fetch('/api/sc/review-queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        showToast(action + ' applied to ' + skus.length + ' SKU(s)')
        loadReview()
      } else showToast('Action failed', true)
    } catch (err) { showToast('Action failed', true) }
  }

  const exportBulk = async (filter: string) => {
    try {
      const res = await fetch('/api/sc/bulk?filter=' + filter)
      const data = await res.json()
      const headers = ['SKU','Model','Brand','Type','Grade','Carrier','Storage','Color','Cost','Qty','Hidden']
      const rows = data.products.map((p: any) =>
        [p.sku, p.model, p.brand, p.device_type, p.grade, p.carrier, p.storage, p.color, p.cost, p.quantity, p.hidden_from_site].map((v: any) => '"' + String(v || '').replace(/"/g, '""') + '"').join(',')
      )
      const csv = [headers.join(','), ...rows].join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'aw-products-' + filter + '-' + new Date().toISOString().slice(0,10) + '.csv'
      a.click()
      URL.revokeObjectURL(url)
      showToast('Exported ' + data.count + ' products')
    } catch (err) { showToast('Export failed', true) }
  }

  const loadGrades = async () => {
    setGradesLoading(true)
    try {
      const res = await fetch('/api/sc/grades')
      setGradesData(await res.json())
    } catch (err) { console.error(err) }
    setGradesLoading(false)
  }

  const saveFamily = async (data: any) => {
    setFamilySaving(true)
    try {
      const res = await fetch('/api/sc/catalog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        showToast(`${data.name} saved`)
        setEditingFamily(null)
        loadFamilies()
      } else {
        showToast('Failed to save family', true)
      }
    } catch (err) { showToast('Failed to save family', true) }
    setFamilySaving(false)
  }

  const deleteFamily = async (id: number) => {
    if (!confirm('Delete this product family?')) return
    await fetch(`/api/sc/catalog?id=${id}`, { method: 'DELETE' })
    loadFamilies()
  }

  const saveGrade = async (data: any) => {
    setGradeSaving(true)
    try {
      const res = await fetch('/api/sc/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        showToast(`Grade ${data.grade_code} updated`)
        setEditingGrade(null)
        loadGrades()
      } else {
        showToast('Failed to save grade', true)
      }
    } catch (err) { showToast('Failed to save grade', true) }
    setGradeSaving(false)
  }

  const mapUnmapped = (u: any) => {
    // Pre-fill a new family from unmapped SKU data
    const brandMap: Record<string, string> = {
      'AP': 'Apple', 'SA': 'Samsung', 'GO': 'Google', 'MO': 'Motorola',
      'LG': 'LG', 'TC': 'TCL', 'KY': 'Kyocera', 'AL': 'Alcatel',
      'ZT': 'ZTE', 'ON': 'OnePlus', 'KA': 'Kazuna', 'NV': 'Novatel',
      'NE': 'Netgear', 'HT': 'HTC', 'PA': 'Pantech', 'GE': 'Generic',
      'FR': 'Franklin', 'VZ': 'Verizon', 'RE': 'Reliance', 'AS': 'Asus',
      'OP': 'OnePlus', 'SC': 'Sagecom', 'LU': 'Lucent', 'NK': 'Nokia',
      'HTC': 'HTC', 'KAZ': 'Kazuna', 'NOV': 'Novatel',
    }
    const prefix = u.modelCode.split('-')[0]
    const brand = brandMap[prefix] || u.brand || prefix

    // Clean display name: try to make it human-readable
    let displayName = u.scName || u.modelCode
    // Remove brand prefix if it matches (e.g. "NOVATEL-MOD-U730L..." → "MOD-U730L...")
    const scParts = displayName.split('-')
    const knownBrandNames = ['APPLE', 'SAMSUNG', 'GOOGLE', 'MOTOROLA', 'LGE', 'TCL', 'KYOCERA', 'ALCATEL', 'ZTE', 'ONEPLUS', 'NOVATEL', 'NETGEAR', 'HTC', 'PANTECH', 'GENERIC', 'FRANKLIN', 'VERIZON', 'RELIANCE', 'ASUS', 'SAGECOM', 'LUCENT', 'NOKIA', 'KAZUNA', 'MOTORLA']
    if (knownBrandNames.includes(scParts[0]?.toUpperCase())) {
      scParts.shift()
    }
    // Remove model numbers, carrier codes, colors, grades from end — keep product name
    // Also remove XA- prefix, shadow suffixes
    displayName = displayName.replace(/^XA-/, '').replace(/-ShadowOf.*$/, '').replace(/S\d+$/, '')
    // If still messy, just use model code with brand
    if (displayName.length > 50 || displayName.includes('HSO')) {
      displayName = `${brand} ${u.modelCode.split('-').slice(1).join(' ')}`.trim()
    }

    // Detect category from device type
    let category = 'Phones'
    const dt = (u.deviceType || '').toLowerCase()
    if (dt.includes('tablet') || dt === 'ta' || dt === 'tka') category = 'Tablets'
    else if (dt === 'lka' || dt.includes('laptop')) category = 'Laptops'
    else if (dt === 'aka' || dt === 'ako' || dt.includes('watch') || dt.includes('wearable')) category = 'Wearables'
    else if (dt === 'ca' || dt === 'cka' || dt.includes('cable') || dt.includes('charg') || dt.includes('accessory')) category = 'Accessories'
    else if (dt === 'ia' || dt === 'ika' || dt === 'hko' || dt.includes('hotspot') || dt.includes('mifi') || dt.includes('router')) category = 'Accessories'
    else if (dt === 'aa') category = 'Accessories'

    setEditingFamily({
      model_code: u.modelCode,
      name: displayName,
      brand,
      category,
      image_url: '',
      visible: true,
    })
  }

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
      const url = keyword ? `/api/catalog-public?size=50&search=${encodeURIComponent(keyword)}` : '/api/catalog-public?size=50'
      const res = await fetch(url)
      const data = await res.json()
      setCatalogData({ items: data.products, total: data.total })
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

          <div className="aw-admin-sb-label">Products</div>
          <div className={`aw-admin-sb-item${page === 'families' ? ' active' : ''}`} onClick={() => { setPage('families'); if (!familiesData) loadFamilies() }}><span>📦</span> Product Families</div>
          <div className={`aw-admin-sb-item${page === 'grades' ? ' active' : ''}`} onClick={() => { setPage('grades'); if (!gradesData) loadGrades() }}><span>⚙️</span> Pricing & Grades</div>
          <div className={`aw-admin-sb-item${page === 'review' ? ' active' : ''}`} onClick={() => { setPage('review'); if (!reviewData) loadReview() }}><span>🔍</span> Unassigned SKUs{reviewData?.stats?.noGradeWithStock > 0 ? <span className="aw-admin-sb-badge">{reviewData.stats.noGradeWithStock}</span> : null}</div>

          <div className="aw-admin-sb-label">System</div>
          <div className={`aw-admin-sb-item${page === 'sync' ? ' active' : ''}`} onClick={() => setPage('sync')}><span>🔄</span> Sync Dashboard</div>

          <div className="aw-admin-sb-label">Admin</div>
          <div className={`aw-admin-sb-item${page === 'users' ? ' active' : ''}`} onClick={() => setPage('users')}><span>👥</span> Users</div>
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
            <div className="aw-admin-topbar-title">{page === 'applications' ? 'Account Applications' : page === 'messages' ? 'Contact Messages' : page === 'families' ? 'Product Families' : page === 'grades' ? 'Pricing & Grades' : page === 'review' ? 'Unassigned SKUs' : page === 'users' ? 'User Management' : 'SellerCloud Sync'}</div>
          </div>

         {page !== 'sync' && page !== 'families' && page !== 'grades' && page !== 'review' && page !== 'users' && <div className="aw-admin-page">
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
            ) : page === 'messages' ? (
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
                      <td><span className="aw-admin-badge aw-admin-badge-green">Live</span></td>
                      <td>Connected — grade validation active, hidden products filtered</td>
                    </tr>
                    <tr>
                      <td className="aw-admin-td-bold">Auto-Sync Schedule</td>
                      <td><span className="aw-admin-badge aw-admin-badge-green">Active</span></td>
                      <td>Runs every hour via Vercel cron</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}


            {/* Catalog Tab */}
            {syncTab === 'catalog' && catalogData?.items && (
              <div className="aw-admin-table-card">
                <div className="aw-admin-table-header">
                  <div className="aw-admin-table-title">Website Catalog ({catalogData.total?.toLocaleString()} products)</div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                  <table className="aw-admin-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Grades</th>
                        <th>SKUs</th>
                        <th>Total Qty</th>
                        <th>Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      {catalogData.items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td className="aw-admin-td-bold">{item.name}</td>
                          <td>{item.brand}</td>
                          <td>{item.category}</td>
                          <td style={{ fontSize: 11 }}>{Array.isArray(item.grades) ? item.grades.join(', ') : '—'}</td>
                          <td>{item.skuCount || 0}</td>
                          <td style={{ color: '#22c55e', fontWeight: 700 }}>{item.totalStock || 0}</td>
                          <td>{item.image && !item.image.includes('NoImage') ? <span style={{ color: '#10b981' }}>✓</span> : <span style={{ color: '#ef4444' }}>✗</span>}</td>
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
                <div className="aw-admin-empty-text">Click "Load Catalog" to see the public website catalog</div>
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

        {/* ═══ PRODUCT FAMILIES PAGE ═══ */}
        {page === 'families' && (
          <div className="aw-admin-page">
            {/* Edit Modal */}
            {editingFamily && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', color: '#1e293b', borderRadius: 12, padding: 24, width: 500, maxHeight: '85vh', overflow: 'auto' }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>{editingFamily.id ? 'Edit' : 'Add'} Product Family</div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Model Code</label>
                      <input style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', color: '#1e293b' }} value={editingFamily.model_code || editingFamily.modelCode || ''} onChange={e => setEditingFamily({...editingFamily, model_code: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Display Name</label>
                      <input style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', color: '#1e293b' }} value={editingFamily.name} onChange={e => setEditingFamily({...editingFamily, name: e.target.value})} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Brand</label>
                        <input style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', color: '#1e293b' }} value={editingFamily.brand} onChange={e => setEditingFamily({...editingFamily, brand: e.target.value})} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Category</label>
                        <select style={{ width: '100%', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 14, fontFamily: 'inherit' }} value={editingFamily.category} onChange={e => setEditingFamily({...editingFamily, category: e.target.value})}>
                          <option value="Phones">Phones</option><option value="Tablets">Tablets</option><option value="Laptops">Laptops</option><option value="Wearables">Wearables</option><option value="Accessories">Accessories</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Image URL</label>
                      <input style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', color: '#1e293b' }} value={editingFamily.image_url || editingFamily.imageUrl || ''} onChange={e => setEditingFamily({...editingFamily, image_url: e.target.value})} placeholder="https://..." />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={editingFamily.visible !== false} onChange={e => setEditingFamily({...editingFamily, visible: e.target.checked})} />
                      <label style={{ fontSize: 13, color: '#334155' }}>Visible on catalog</label>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
                    <button onClick={() => setEditingFamily(null)} style={{ padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>Cancel</button>
                    <button onClick={() => saveFamily(editingFamily)} disabled={familySaving} style={{ padding: '8px 16px', border: 'none', borderRadius: 6, background: '#132347', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>{familySaving ? 'Saving...' : 'Save'}</button>
                  </div>
                </div>
              </div>
            )}

            {familiesLoading ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading product families...</div>
            ) : (familiesData && familiesData.families) ? (
              <>
                {/* KPI Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
                  <div className="aw-admin-stat" style={{ cursor: 'default' }}><div className="aw-admin-stat-label">Total Families</div><div className="aw-admin-stat-val" style={{ color: '#fff' }}>{familiesData.totals.totalFamilies}</div><div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{familiesData.totals.visibleFamilies} visible</div></div>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Total SKUs</div><div className="aw-admin-stat-val" style={{ color: '#60a5fa' }}>{familiesData.totals.totalSkus?.toLocaleString()}</div></div>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Total Stock</div><div className="aw-admin-stat-val" style={{ color: '#10b981' }}>{familiesData.totals.totalStock?.toLocaleString()}</div></div>
                  <div className="aw-admin-stat" style={{ cursor: 'pointer' }} onClick={() => { setPage('review'); if (!reviewData) loadReview() }}><div className="aw-admin-stat-label">Needs Review</div><div className="aw-admin-stat-val" style={{ color: '#f59e0b' }}>{reviewData?.stats?.noGradeWithStock || '—'}</div></div>
                </div>

                {/* Table Card */}
                <div className="aw-admin-table-card">
                  <div className="aw-admin-table-header">
                    <div className="aw-admin-table-title">Product Families</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => exportBulk('in-stock')} className="aw-admin-btn aw-admin-btn-view" style={{ fontSize: 12 }}>⬇ Export CSV</button>
                      <button onClick={() => setEditingFamily({ model_code: '', name: '', brand: '', category: 'Phones', image_url: '', visible: true })} className="aw-admin-btn aw-admin-btn-primary" style={{ fontSize: 12 }}>+ Add Family</button>
                      <button onClick={loadFamilies} className="aw-admin-btn aw-admin-btn-view" style={{ fontSize: 12 }}>Refresh</button>
                    </div>
                  </div>
                  {/* Filters */}
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #1e2d4a', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <input placeholder="Search name/code..." value={familyFilter} onChange={e => setFamilyFilter(e.target.value)} style={{ padding: '6px 10px', border: '1px solid #2d3548', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', width: 180, background: '#0f1729', color: '#e2e8f0' }} />
                    <select value={familyBrandFilter} onChange={e => setFamilyBrandFilter(e.target.value)} style={{ padding: '6px 10px', border: '1px solid #2d3548', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', background: '#0f1729', color: '#e2e8f0' }}>
                      <option value="">All Brands</option>
                      {familiesData.filters?.brands?.map((b: string) => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <select value={familyCatFilter} onChange={e => setFamilyCatFilter(e.target.value)} style={{ padding: '6px 10px', border: '1px solid #2d3548', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', background: '#0f1729', color: '#e2e8f0' }}>
                      <option value="">All Categories</option>
                      {familiesData.filters?.categories?.map((c: string) => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select value={familyStockFilter} onChange={e => setFamilyStockFilter(e.target.value as any)} style={{ padding: '6px 10px', border: '1px solid #2d3548', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', background: '#0f1729', color: '#e2e8f0' }}>
                      <option value="">All Stock</option><option value="instock">In Stock</option><option value="nostock">No Stock</option>
                    </select>
                    <select value={familyVisFilter} onChange={e => setFamilyVisFilter(e.target.value as any)} style={{ padding: '6px 10px', border: '1px solid #2d3548', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', background: '#0f1729', color: '#e2e8f0' }}>
                      <option value="">All Visibility</option><option value="yes">Visible</option><option value="no">Hidden</option>
                    </select>
                    <select value={familySort} onChange={e => setFamilySort(e.target.value as any)} style={{ padding: '6px 10px', border: '1px solid #2d3548', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', background: '#0f1729', color: '#e2e8f0' }}>
                      <option value="name">Sort: Name</option><option value="brand">Sort: Brand</option><option value="stock">Sort: Stock ↓</option><option value="category">Sort: Category</option>
                    </select>
                  </div>

                  {/* Families Table with Accordion */}
                  <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '70vh' }}>
                    <table className="aw-admin-table">
                      <thead style={{ position: 'sticky', top: 0, zIndex: 5, background: '#111827' }}><tr>
                        <th style={{ color: '#cbd5e1' }}>Code</th><th style={{ color: '#cbd5e1' }}>Name</th><th style={{ color: '#cbd5e1' }}>Brand</th><th style={{ color: '#cbd5e1' }}>Category</th><th style={{ color: '#cbd5e1' }}>Stock</th><th style={{ color: '#cbd5e1' }}>SKUs</th><th style={{ color: '#cbd5e1' }}>Visible</th><th></th>
                      </tr></thead>
                      <tbody>
                        {familiesData.families
                          .filter((f: any) => {
                            if (familyFilter) {
                              const q = familyFilter.toLowerCase()
                              if (!f.name.toLowerCase().includes(q) && !f.modelCode.toLowerCase().includes(q)) return false
                            }
                            if (familyBrandFilter && f.brand !== familyBrandFilter) return false
                            if (familyCatFilter && f.category !== familyCatFilter) return false
                            if (familyStockFilter === 'instock' && (f.totalStock || 0) === 0) return false
                            if (familyStockFilter === 'nostock' && (f.totalStock || 0) > 0) return false
                            if (familyVisFilter === 'yes' && !f.visible) return false
                            if (familyVisFilter === 'no' && f.visible) return false
                            return true
                          })
                          .sort((a: any, b: any) => {
                            if (familySort === 'stock') return (b.totalStock || 0) - (a.totalStock || 0)
                            if (familySort === 'brand') return a.brand.localeCompare(b.brand) || a.name.localeCompare(b.name)
                            if (familySort === 'category') return a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
                            return a.name.localeCompare(b.name)
                          })
                          .map((f: any) => (
                          <React.Fragment key={f.id}>
                            <tr onClick={() => loadFamilyDetail(f.modelCode)} style={{ opacity: f.visible ? 1 : 0.5, cursor: 'pointer', background: expandedFamily === f.modelCode ? '#1a2234' : 'transparent' }} onMouseEnter={e => { if (expandedFamily !== f.modelCode) e.currentTarget.style.background = '#131b2e' }} onMouseLeave={e => { if (expandedFamily !== f.modelCode) e.currentTarget.style.background = 'transparent' }}>
                              <td style={{ fontFamily: 'monospace', fontSize: 12, fontWeight: 600, color: '#60a5fa' }}>{f.modelCode}</td>
                              <td style={{ fontWeight: 600, color: '#fff' }}>{f.name}</td>
                              <td style={{ color: '#cbd5e1' }}>{f.brand}</td>
                              <td><span style={{ fontSize: 10, padding: '2px 6px', borderRadius: 3, background: '#1e293b', color: '#cbd5e1' }}>{f.category}</span></td>
                              <td style={{ fontWeight: 700, color: (f.totalStock || 0) > 0 ? '#10b981' : '#64748b', fontFamily: 'monospace' }}>{(f.totalStock || 0).toLocaleString()}</td>
                              <td style={{ color: '#cbd5e1' }}>{f.skuCount || 0}</td>
                              <td>{f.visible ? <span style={{ color: '#10b981' }}>✓</span> : <span style={{ color: '#ef4444' }}>✗</span>}</td>
                              <td>
                                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                                  <button onClick={(e) => { e.stopPropagation(); setEditingFamily(f) }} style={{ padding: '3px 8px', fontSize: 11, border: '1px solid #2d3548', borderRadius: 4, background: 'transparent', color: '#e2e8f0', cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
                                  <button onClick={(e) => { e.stopPropagation(); deleteFamily(f.id) }} style={{ padding: '3px 8px', fontSize: 11, border: '1px solid #7f1d1d', borderRadius: 4, background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: 'inherit' }}>Del</button>
                                  <span style={{ color: '#64748b', fontSize: 14, marginLeft: 4 }}>{expandedFamily === f.modelCode ? '▾' : '▸'}</span>
                                </div>
                              </td>
                            </tr>

                            {/* ═══ ACCORDION SKU DETAIL ═══ */}
                            {expandedFamily === f.modelCode && (
                              <tr><td colSpan={8} style={{ padding: 0, background: '#0d1321', borderBottom: '2px solid #1e2d4a' }}>
                                {familyDetailLoading ? (
                                  <div style={{ padding: 24, textAlign: 'center', color: '#94a3b8' }}>Loading SKUs...</div>
                                ) : familyDetail ? (
                                  <div style={{ padding: '16px 20px' }}>
                                    {/* Stats Row */}
                                    <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
                                      {[
                                        { label: 'Total SKUs', val: familyDetail.stats.totalSkus, color: '#fff' },
                                        { label: 'Visible', val: familyDetail.stats.visibleSkus, color: '#10b981' },
                                        { label: 'Hidden', val: familyDetail.stats.hiddenSkus, color: '#f59e0b' },
                                        { label: 'Intake', val: familyDetail.stats.intakeSkus, color: '#64748b' },
                                        { label: 'Total Stock', val: familyDetail.stats.totalStock.toLocaleString(), color: '#10b981' },
                                      ].map((s, i) => (
                                        <div key={i} style={{ background: '#111827', border: '1px solid #1e2d4a', borderRadius: 8, padding: '10px 16px', textAlign: 'center' }}>
                                          <div style={{ fontSize: 18, fontWeight: 700, color: s.color }}>{s.val}</div>
                                          <div style={{ fontSize: 10, color: '#94a3b8' }}>{s.label}</div>
                                        </div>
                                      ))}
                                    </div>

                                    {/* Tabs + Bulk Actions + Search */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, flexWrap: 'wrap', gap: 8 }}>
                                      <div style={{ display: 'flex', gap: 0 }}>
                                        {(['visible', 'hidden', 'all'] as const).map((tab, ti) => (
                                          <button key={tab} onClick={() => { setSkuTab(tab); setSkuSelected([]) }} style={{ padding: '6px 16px', fontSize: 12, fontWeight: skuTab === tab ? 700 : 500, border: '1px solid #2d3548', borderRight: tab !== 'all' ? 'none' : '1px solid #2d3548', borderRadius: ti === 0 ? '6px 0 0 6px' : ti === 2 ? '0 6px 6px 0' : '0', background: skuTab === tab ? '#1e293b' : 'transparent', color: skuTab === tab ? '#fff' : '#94a3b8', cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize' as any }}>
                                            {tab} ({tab === 'visible' ? familyDetail.skus.visible.length : tab === 'hidden' ? familyDetail.skus.hidden.length : familyDetail.skus.visible.length + familyDetail.skus.hidden.length})
                                          </button>
                                        ))}
                                      </div>
                                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                        {skuSelected.length > 0 && (<>
                                          <button onClick={() => bulkSkuAction('hide')} style={{ padding: '5px 12px', fontSize: 11, fontWeight: 600, border: '1px solid #92400e', borderRadius: 5, background: 'transparent', color: '#f59e0b', cursor: 'pointer', fontFamily: 'inherit' }}>Hide Selected ({skuSelected.length})</button>
                                          <button onClick={() => bulkSkuAction('show')} style={{ padding: '5px 12px', fontSize: 11, fontWeight: 600, border: '1px solid #065f46', borderRadius: 5, background: 'transparent', color: '#10b981', cursor: 'pointer', fontFamily: 'inherit' }}>Show Selected ({skuSelected.length})</button>
                                        </>)}
                                        <input placeholder="Search SKUs..." value={skuSearch} onChange={e => setSkuSearch(e.target.value)} style={{ padding: '5px 10px', border: '1px solid #2d3548', borderRadius: 6, fontSize: 11, fontFamily: 'inherit', width: 160, background: '#0f1729', color: '#e2e8f0' }} />
                                      </div>
                                    </div>

                                    {/* SKU Table */}
                                    <div style={{ overflowX: 'auto', overflowY: 'auto', maxHeight: '60vh', border: '1px solid #1e2d4a', borderRadius: 8 }}>
                                      <table className="aw-admin-table" style={{ fontSize: 12 }}>
                                        <thead style={{ position: 'sticky', top: 0, zIndex: 3, background: '#111827' }}>
                                          <tr>
                                            <th style={{ width: 30, padding: '8px' }}><input type="checkbox" onChange={e => {
                                              const pool = (skuTab === 'visible' ? familyDetail.skus.visible : skuTab === 'hidden' ? familyDetail.skus.hidden : [...familyDetail.skus.visible, ...familyDetail.skus.hidden]).filter((s: any) => !skuSearch || s.sku.toLowerCase().includes(skuSearch.toLowerCase()))
                                              setSkuSelected(e.target.checked ? pool.map((s: any) => s.sku) : [])
                                            }} /></th>
                                            <th style={{ color: '#cbd5e1' }}>SKU</th><th style={{ color: '#cbd5e1' }}>Grade</th><th style={{ color: '#cbd5e1' }}>Storage</th><th style={{ color: '#cbd5e1' }}>Carrier</th><th style={{ color: '#cbd5e1' }}>Color</th><th style={{ color: '#cbd5e1' }}>Qty</th><th style={{ color: '#cbd5e1' }}>Avail</th><th style={{ color: '#cbd5e1' }}>Cost</th><th style={{ color: '#cbd5e1' }}>Site Price</th><th style={{ color: '#cbd5e1' }}>Actions</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {(skuTab === 'visible' ? familyDetail.skus.visible : skuTab === 'hidden' ? familyDetail.skus.hidden : [...familyDetail.skus.visible, ...familyDetail.skus.hidden])
                                            .filter((s: any) => !skuSearch || s.sku.toLowerCase().includes(skuSearch.toLowerCase()) || (s.carrier||'').toLowerCase().includes(skuSearch.toLowerCase()) || (s.color||'').toLowerCase().includes(skuSearch.toLowerCase()) || (s.grade||'').toLowerCase().includes(skuSearch.toLowerCase()))
                                            .map((s: any) => (
                                            <tr key={s.sku} style={{ opacity: s.hidden ? 0.5 : 1 }}>
                                              <td style={{ padding: '8px' }}><input type="checkbox" checked={skuSelected.includes(s.sku)} onChange={e => setSkuSelected(e.target.checked ? [...skuSelected, s.sku] : skuSelected.filter((x: string) => x !== s.sku))} /></td>
                                              <td style={{ fontFamily: 'monospace', fontSize: 10, color: '#94a3b8', maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as any }} title={s.sku}>{s.sku}</td>
                                              <td><span style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 700, color: (s.grade === 'CAP' || s.grade === 'CAP1') ? '#34d399' : s.grade === 'CA+' ? '#10b981' : s.grade === 'CA' ? '#22c55e' : s.grade === 'SD' ? '#f97316' : '#cbd5e1', background: '#1e293b', padding: '2px 6px', borderRadius: 4 }}>{s.grade || '—'}</span></td>
                                              <td style={{ fontWeight: 600, color: '#fff' }}>{s.storage || '—'}</td>
                                              <td style={{ color: '#cbd5e1' }}>{s.carrier || '—'}</td>
                                              <td style={{ color: '#cbd5e1' }}>{s.color || '—'}</td>
                                              <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#fff' }}>{s.quantity}</td>
                                              <td style={{ fontFamily: 'monospace', color: s.available > 0 ? '#10b981' : '#64748b' }}>{s.available}</td>
                                              <td style={{ fontFamily: 'monospace', color: '#fff' }}>{'$'}{s.cost.toFixed(2)}</td>
                                              <td style={{ fontFamily: 'monospace', fontWeight: 700, color: s.priceOverride ? '#60a5fa' : '#10b981' }}>{s.calculatedPrice ? ('$' + s.calculatedPrice.toFixed(2)) : '—'}{s.priceOverride ? ' ✎' : ''}</td>
                                              <td>
                                                <button onClick={() => toggleSkuHidden(s.sku, !s.hidden)} style={{ padding: '3px 8px', fontSize: 10, fontWeight: 600, border: '1px solid ' + (s.hidden ? '#065f46' : '#92400e'), borderRadius: 4, background: 'transparent', color: s.hidden ? '#10b981' : '#f59e0b', cursor: 'pointer', fontFamily: 'inherit' }}>{s.hidden ? 'Show' : 'Hide'}</button>
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>

                                    {/* INTAKE Section */}
                                    {familyDetail.skus.intake.length > 0 && (
                                      <div style={{ marginTop: 16, border: '1px solid #334155', borderRadius: 8, overflow: 'hidden' }}>
                                        <div style={{ padding: '10px 16px', background: '#1a1f2e', borderBottom: '1px solid #334155' }}>
                                          <span style={{ fontSize: 12, fontWeight: 700, color: '#cbd5e1' }}>Pre-QC (INTAKE) — {familyDetail.skus.intake.length} SKUs</span>
                                        </div>
                                        <table className="aw-admin-table" style={{ fontSize: 12 }}>
                                          <thead><tr><th style={{ color: '#cbd5e1' }}>SKU</th><th style={{ color: '#cbd5e1' }}>Qty</th><th style={{ color: '#cbd5e1' }}>Cost</th></tr></thead>
                                          <tbody>
                                            {familyDetail.skus.intake.map((s: any) => (
                                              <tr key={s.sku} style={{ opacity: 0.6 }}>
                                                <td style={{ fontFamily: 'monospace', fontSize: 10, color: '#94a3b8' }}>{s.sku}</td>
                                                <td style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>{s.quantity}</td>
                                                <td style={{ fontFamily: 'monospace', color: '#cbd5e1' }}>{'$'}{s.cost.toFixed(2)}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div style={{ padding: 24, textAlign: 'center', color: '#ef4444' }}>Failed to load SKU details</div>
                                )}
                              </td></tr>
                            )}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Loading...</div>
            )}
          </div>
        )}


        {/* ═══ REVIEW QUEUE PAGE ═══ */}
        {page === 'review' && (
          <div className="aw-admin-page">
            {reviewLoading ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading review queue...</div>
            ) : (reviewData && reviewData.stats) ? (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">No Grade (With Stock)</div><div className="aw-admin-stat-val" style={{ color: '#f59e0b' }}>{reviewData.stats.noGradeWithStock}</div></div>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">No Grade (Total)</div><div className="aw-admin-stat-val">{reviewData.stats.noGrade}</div></div>
                  <div className="aw-admin-stat"><div className="aw-admin-stat-label">Hidden from Site</div><div className="aw-admin-stat-val">{reviewData.stats.hidden}</div></div>
                </div>

                <div className="aw-admin-table-card">
                  <div className="aw-admin-table-header">
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <div className="aw-admin-table-title">SKUs Needing Review ({reviewData.items.length})</div>
                      <select value={reviewFilter} onChange={e => { setReviewFilter(e.target.value); loadReview(e.target.value) }} style={{ padding: '4px 8px', border: '1px solid #2d3548', borderRadius: 6, fontSize: 11, background: '#0f1729', color: '#e2e8f0', fontFamily: 'inherit' }}>
                        <option value="all">All Issues</option>
                        <option value="no-grade">No Grade</option>
                        <option value="hidden">Hidden</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {reviewSelected.length > 0 && (
                        <>
                          <button onClick={() => reviewAction('hide', reviewSelected)} className="aw-admin-btn aw-admin-btn-reject" style={{ fontSize: 11 }}>Hide ({reviewSelected.length})</button>
                          <button onClick={() => reviewAction('show', reviewSelected)} className="aw-admin-btn aw-admin-btn-approve" style={{ fontSize: 11 }}>Show ({reviewSelected.length})</button>
                          <select onChange={e => { if (e.target.value) { reviewAction('set-grade', reviewSelected, e.target.value); e.target.value = '' } }} style={{ padding: '4px 8px', border: '1px solid #2d3548', borderRadius: 6, fontSize: 11, background: '#0f1729', color: '#e2e8f0', fontFamily: 'inherit' }}>
                            <option value="">Assign Grade...</option>
                            {(reviewData.validGrades || []).map((g: string) => <option key={g} value={g}>{g}</option>)}
                          </select>
                        </>
                      )}
                      <button onClick={() => loadReview()} className="aw-admin-btn aw-admin-btn-view" style={{ fontSize: 11 }}>Refresh</button>
                    </div>
                  </div>
                  <div style={{ overflowX: 'auto', maxHeight: 600, overflowY: 'auto' }}>
                    <table className="aw-admin-table" style={{ fontSize: 12 }}>
                      <thead>
                        <tr>
                          <th><input type="checkbox" checked={reviewSelected.length === reviewData.items.length && reviewData.items.length > 0} onChange={e => setReviewSelected(e.target.checked ? reviewData.items.map((i: any) => i.sku) : [])} /></th>
                          <th>SKU</th>
                          <th>Model</th>
                          <th>Brand</th>
                          <th>Grade</th>
                          <th>Qty</th>
                          <th>Cost</th>
                          <th>Hidden</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviewData.items.map((item: any) => (
                          <tr key={item.sku}>
                            <td><input type="checkbox" checked={reviewSelected.includes(item.sku)} onChange={e => setReviewSelected(e.target.checked ? [...reviewSelected, item.sku] : reviewSelected.filter(s => s !== item.sku))} /></td>
                            <td style={{ fontFamily: 'monospace', fontSize: 11, fontWeight: 600, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sku}</td>
                            <td style={{ fontWeight: 600 }}>{item.model || '\u2014'}</td>
                            <td>{item.brand || '\u2014'}</td>
                            <td>{item.grade ? <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{item.grade}</span> : <span style={{ color: '#f59e0b' }}>\u2014</span>}</td>
                            <td style={{ fontWeight: 600, color: (item.quantity || 0) > 0 ? '#10b981' : '#64748b' }}>{item.quantity || 0}</td>
                            <td>{'$'}{parseFloat(item.cost || 0).toFixed(2)}</td>
                            <td>{item.hidden_from_site ? <span style={{ color: '#ef4444' }}>Hidden</span> : <span style={{ color: '#10b981' }}>Visible</span>}</td>
                            <td><span className={`aw-admin-badge aw-admin-badge-${item.review_status === 'hidden' ? 'red' : item.review_status === 'graded' ? 'green' : 'yellow'}`}>{item.review_status || 'pending'}</span></td>
                            <td style={{ display: 'flex', gap: 4 }}>
                              <button onClick={() => reviewAction('hide', [item.sku])} style={{ padding: '2px 6px', fontSize: 10, border: '1px solid #7f1d1d', borderRadius: 3, background: 'transparent', color: '#ef4444', cursor: 'pointer', fontFamily: 'inherit' }}>Hide</button>
                              <button onClick={() => reviewAction('show', [item.sku])} style={{ padding: '2px 6px', fontSize: 10, border: '1px solid #166534', borderRadius: 3, background: 'transparent', color: '#22c55e', cursor: 'pointer', fontFamily: 'inherit' }}>Show</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            ) : (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading...</div>
            )}
          </div>
        )}

        {/* ═══ USER MANAGEMENT PAGE ═══ */}
        {page === 'users' && (
          <div className="aw-admin-page">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
              <div className="aw-admin-stat"><div className="aw-admin-stat-label">Admin Users</div><div className="aw-admin-stat-val">1</div></div>
              <div className="aw-admin-stat"><div className="aw-admin-stat-label">Active Sessions</div><div className="aw-admin-stat-val">1</div></div>
              <div className="aw-admin-stat"><div className="aw-admin-stat-label">Auth Method</div><div className="aw-admin-stat-val" style={{ fontSize: 16 }}>Shared Password</div></div>
            </div>
            <div className="aw-admin-table-card">
              <div className="aw-admin-table-header">
                <div className="aw-admin-table-title">Admin Users</div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>Managed via Vercel environment variables</div>
              </div>
              <table className="aw-admin-table">
                <thead><tr><th>User</th><th>Role</th><th>Access</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td className="aw-admin-td-bold">Isaac</td><td>Owner</td><td>Full Admin</td><td><span className="aw-admin-badge aw-admin-badge-green">Active</span></td></tr>
                  <tr><td className="aw-admin-td-bold">Linde</td><td>Marketplace Manager</td><td>Products, Families, Grades</td><td><span className="aw-admin-badge aw-admin-badge-yellow">Pending Setup</span></td></tr>
                  <tr><td className="aw-admin-td-bold">Will</td><td>Warehouse / Ops</td><td>Inventory, Sync</td><td><span className="aw-admin-badge aw-admin-badge-yellow">Pending Setup</span></td></tr>
                </tbody>
              </table>
            </div>
            <div className="aw-admin-table-card">
              <div className="aw-admin-table-header"><div className="aw-admin-table-title">Upgrade Path</div></div>
              <div style={{ padding: 20, fontSize: 13, color: '#94a3b8', lineHeight: 1.8 }}>
                <p style={{ margin: '0 0 12px' }}>Currently using a shared admin password. To add individual user accounts with role-based access:</p>
                <p style={{ margin: '0 0 8px' }}><b style={{ color: '#e2e8f0' }}>Phase 1 (Now):</b> Shared password — all admins have full access</p>
                <p style={{ margin: '0 0 8px' }}><b style={{ color: '#e2e8f0' }}>Phase 2 (Next):</b> Individual logins with email/password stored in the database</p>
                <p style={{ margin: 0 }}><b style={{ color: '#e2e8f0' }}>Phase 3 (Later):</b> Role-based permissions — Linde sees Products only, Will sees Inventory only</p>
              </div>
            </div>
          </div>
        )}

        {/* ═══ GRADES PAGE ═══ */}
        {page === 'grades' && (
          <div className="aw-admin-page">
            {/* Edit Modal */}
            {editingGrade && (
              <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', color: '#1e293b', borderRadius: 12, padding: 24, width: 420 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Edit Grade: {editingGrade.grade_code}</div>
                  <div style={{ display: 'grid', gap: 12 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Display Label</label>
                      <input style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', color: '#1e293b' }} value={editingGrade.label} onChange={e => setEditingGrade({...editingGrade, label: e.target.value})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Multiplier (e.g. 1.35 = 35% margin)</label>
                      <input type="number" step="0.01" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', color: '#1e293b' }} value={editingGrade.multiplier} onChange={e => setEditingGrade({...editingGrade, multiplier: parseFloat(e.target.value) || 1})} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: '#64748b', display: 'block', marginBottom: 4 }}>Sort Order</label>
                      <input type="number" style={{ width: '100%', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: 6, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box', color: '#1e293b' }} value={editingGrade.sort_order} onChange={e => setEditingGrade({...editingGrade, sort_order: parseInt(e.target.value) || 0})} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <input type="checkbox" checked={editingGrade.visible !== false} onChange={e => setEditingGrade({...editingGrade, visible: e.target.checked})} />
                      <label style={{ fontSize: 13, color: '#334155' }}>Visible on catalog</label>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
                    <button onClick={() => setEditingGrade(null)} style={{ padding: '8px 16px', border: '1px solid #e2e8f0', borderRadius: 6, background: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13 }}>Cancel</button>
                    <button onClick={() => saveGrade(editingGrade)} disabled={gradeSaving} style={{ padding: '8px 16px', border: 'none', borderRadius: 6, background: '#132347', color: '#fff', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>{gradeSaving ? 'Saving...' : 'Save'}</button>
                  </div>
                </div>
              </div>
            )}

            {gradesLoading ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading grade config...</div>
            ) : (gradesData && gradesData.grades) ? (
              <div className="aw-admin-table-card">
                <div className="aw-admin-table-header">
                  <div className="aw-admin-table-title">Grade Configuration</div>
                  <button onClick={loadGrades} className="aw-admin-btn aw-admin-btn-view" style={{ fontSize: 12 }}>Refresh</button>
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8', padding: '0 0 16px', lineHeight: 1.5 }}>
                  Site Price = SKU Cost × Multiplier. Change multipliers here — the catalog updates immediately. No code deploys needed.
                </div>
                <table className="aw-admin-table">
                  <thead><tr><th>Grade Code</th><th>Display Label</th><th>Multiplier</th><th>Margin %</th><th>Sort Order</th><th>Visible</th><th></th></tr></thead>
                  <tbody>
                    {gradesData.grades.map((g: any) => (
                      <tr key={g.id}>
                        <td style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 14 }}>{g.grade_code}</td>
                        <td style={{ fontWeight: 600 }}>{g.label}</td>
                        <td style={{ fontWeight: 600, fontSize: 14 }}>×{parseFloat(g.multiplier).toFixed(2)}</td>
                        <td style={{ color: '#10b981', fontWeight: 700 }}>{Math.round((parseFloat(g.multiplier) - 1) * 100)}%</td>
                        <td>{g.sort_order}</td>
                        <td>{g.visible ? <span style={{ color: '#10b981' }}>✓</span> : <span style={{ color: '#ef4444' }}>✗</span>}</td>
                        <td><button onClick={() => setEditingGrade(g)} style={{ padding: '3px 8px', fontSize: 11, border: '1px solid #2d3548', borderRadius: 4, background: 'transparent', color: '#e2e8f0', cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748b' }}>Loading...</div>
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
