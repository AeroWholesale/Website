import { useState, useEffect } from 'react'

// ─── THEME ────────────────────────────────────────────────────────────────────
const DARK: Record<string,string> = {
  bg:'#0f1520', panel:'#111827', dark:'#0a0f1a', border:'#1e2d4a',
  orange:'#ea580c', text:'#e2e8f0', sub:'#94a3b8', dim:'#475569', faint:'#334155',
}
const LIGHT: Record<string,string> = {
  bg:'#f1f5f9', panel:'#ffffff', dark:'#e2e8f0', border:'#cbd5e1',
  orange:'#ea580c', text:'#0f172a', sub:'#475569', dim:'#64748b', faint:'#94a3b8',
}

// ─── MOCK DATA (used until real APIs are built for new pages) ─────────────────
const MOCK_QUOTES = [
  { id:1, ref:'QR-2026-001', company:'NexTech Mobile LLC', dealer:'Jason Rivera', demail:'jason@nextech.com', units:150, value:18750, status:'pending', created:Date.now()-7200000, notes:'Needs Net-30', items:[{qty:50,name:'iPhone 14',grade:'CA+',storage:'128GB',carrier:'Unlocked',price:275},{qty:100,name:'iPhone 13',grade:'CA',storage:'128GB',carrier:'Unlocked',price:225}] },
  { id:2, ref:'QR-2026-002', company:'Summit Wireless', dealer:'Priya Kapoor', demail:'priya@summitwl.com', units:200, value:42000, status:'pending', created:Date.now()-18000000, notes:'', items:[{qty:200,name:'iPhone 15 Pro',grade:'CAP',storage:'256GB',carrier:'Unlocked',price:210}] },
  { id:3, ref:'QR-2026-003', company:'Vertex Resale', dealer:'Marcus Chen', demail:'m.chen@vertex.io', units:75, value:0, status:'confirmed', created:Date.now()-86400000, notes:'', items:[{qty:75,name:'iPad Air 5',grade:'CA+',storage:'64GB',carrier:'WiFi',price:0}] },
]
const MOCK_CUSTOMERS = [
  { id:1, company:'NexTech Mobile LLC', first:'Jason', last:'Rivera', email:'jason@nextech.com', type:'wholesale', active:true, created:Date.now()-864000000 },
  { id:2, company:'Summit Wireless', first:'Priya', last:'Kapoor', email:'priya@summitwl.com', type:'enterprise', active:true, created:Date.now()-1728000000 },
  { id:3, company:'Vertex Resale Group', first:'Marcus', last:'Chen', email:'m.chen@vertex.io', type:'reseller', active:false, created:Date.now()-2592000000 },
]
const MOCK_EMPLOYEES = [
  { id:1, first:'Isaac', last:'/ Zack', email:'isaac@aerowholesale.com', role:'admin', active:true, lastLogin:Date.now()-3600000 },
  { id:2, first:'Linda', last:'', email:'linda@aerowholesale.com', role:'manager', active:true, lastLogin:Date.now()-86400000 },
  { id:3, first:'Will', last:'', email:'will@aerowholesale.com', role:'warehouse', active:true, lastLogin:Date.now()-172800000 },
]
const MOCK_FAMILIES = [
  { id:'f1', name:'iPhone 15 Pro Max', cat:'iPhones', hero:null, skus:[
    { sku:'PA:APL-IP15PM-A3106-HSO-UNL-256-BLK-CAP', grade:'CAP', storage:'256GB', carrier:'Unlocked', color:'Black', qty:12, cost:680, visible:true, photo:null },
    { sku:'PA:APL-IP15PM-A3106-HSO-UNL-512-BLK-CA+', grade:'CA+', storage:'512GB', carrier:'Unlocked', color:'Black', qty:8, cost:640, visible:true, photo:null },
    { sku:'PA:APL-IP15PM-A3106-HSO-TM-256-WHT-CA',  grade:'CA',  storage:'256GB', carrier:'T-Mobile', color:'White', qty:0, cost:590, visible:false, photo:null },
  ]},
  { id:'f2', name:'iPhone 14', cat:'iPhones', hero:null, skus:[
    { sku:'PA:APL-IP14-A2882-HSO-UNL-128-BLK-CAP', grade:'CAP', storage:'128GB', carrier:'Unlocked', color:'Black', qty:24, cost:420, visible:true, photo:null },
    { sku:'PA:APL-IP14-A2882-HSO-UNL-128-BLK-CA+', grade:'CA+', storage:'128GB', carrier:'Unlocked', color:'Black', qty:31, cost:390, visible:true, photo:null },
  ]},
  { id:'f3', name:'iPad Air 5th Gen', cat:'iPads', hero:null, skus:[
    { sku:'TA:APL-IPDA5-A2588-HSO-WF-64-GRY-CA+', grade:'CA+', storage:'64GB', carrier:'WiFi', color:'Gray', qty:15, cost:310, visible:true, photo:null },
  ]},
]
const MOCK_UNMAPPED = [
  { sku:'PA:APL-IP16E-IP16E-HSO-UNL-128-BLK-CAP', reason:'New model — needs mapping' },
  { sku:'PA:SAM-S25U-S25U-HSO-UNL-256-BLK-CAP',  reason:'No family match' },
]
const PRICING_CATS   = ['iPhones','iPads','MacBooks','Samsung']
const PRICING_GRADES = ['CAP1','CAP','CA+','CA','CAB','SD','SD-','SDB','XF']
const PRICING_DEFAULTS: Record<string,number[]> = {
  iPhones:[1.12,1.08,1.04,1.00,0.92,0.85,0.78,0.80,0.40],
  iPads:  [1.10,1.06,1.02,0.98,0.90,0.83,0.76,0.78,0.38],
  MacBooks:[1.15,1.10,1.05,1.00,0.88,0.80,0.72,0.75,0.35],
  Samsung:[1.08,1.04,1.00,0.96,0.88,0.82,0.75,0.77,0.38],
}
const EXCLUDED_GRADES = ['INTAKE','XF','XC']
const DOC_LABELS: Record<string,string> = { w9:'W-9 Form', st3:'ST-3 Sales Tax Exemption', resale:'Resale Certificate', ein:'EIN Verification Letter', formation:'Business Formation Docs', id:'Gov. Photo ID', insurance:'Certificate of Insurance' }
const DECLINE_REASONS: Record<string,string> = { out_of_stock:'Out of stock at this time', price_mismatch:'Unable to meet requested pricing', min_qty:'Below minimum order quantity', no_terms:'Cannot accommodate payment terms', other:'Other' }
const ROLE_LABELS: Record<string,string> = { admin:'Admin', manager:'Manager', warehouse:'Warehouse / Ops', readonly:'Read-Only' }

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Application = {
  id: number; first_name: string; last_name: string; email: string; phone: string;
  job_title: string; company_name: string; website: string; ein: string; state: string;
  city: string; years_in_business: string; account_type: string; monthly_volume: string;
  product_categories: string; sales_channel: string; heard_about: string; notes: string;
  status: string; created_at: string;
}
type Message = { id: number; name: string; company: string; email: string; subject: string; message: string; read: boolean; created_at: string; }

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return mins + 'm ago'
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return hrs + 'h ago'
  return Math.floor(hrs / 24) + 'd ago'
}
function fmtDate(ts: number) { return new Date(ts).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) }
function statusBadge(s: string) {
  const m: Record<string,string> = { pending:'#eab308', approved:'#22c55e', rejected:'#ef4444', docs_requested:'#fb923c', docs_received:'#a78bfa', confirmed:'#22c55e', processing:'#60a5fa', declined:'#ef4444' }
  const bg: Record<string,string> = { pending:'#1c1400', approved:'#052e16', rejected:'#1c0606', docs_requested:'#1c0e00', docs_received:'#1e0e3a', confirmed:'#052e16', processing:'#0c1a3a', declined:'#1c0606' }
  return { color: m[s]||'#64748b', bg: bg[s]||'#1e2d4a' }
}
function typeBadge(t: string) {
  const m: Record<string,{color:string,bg:string}> = { wholesale:{color:'#60a5fa',bg:'#0c1a3a'}, enterprise:{color:'#fb923c',bg:'#1c0e00'}, reseller:{color:'#22c55e',bg:'#052e16'} }
  return m[t] || { color:'#64748b', bg:'#1e2d4a' }
}
function gradeBadge(g: string) {
  if(['CAP1','CAP'].includes(g))      return { color:'#60a5fa', bg:'#0c1a3a' }
  if(['CA+','CA'].includes(g))        return { color:'#22c55e', bg:'#052e16' }
  if(['CAB','SD','SDB'].includes(g))  return { color:'#eab308', bg:'#1c1400' }
  return { color:'#ef4444', bg:'#1c0606' }
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Admin() {

  // ── Auth ──
  const [authed, setAuthed]     = useState(false)
  const [pw, setPw]             = useState('')
  const [pwError, setPwError]   = useState('')
  const [pwLoading, setPwLoading] = useState(false)

  // ── Theme ──
  const [isDark, setIsDark] = useState(true)
  const C = isDark ? DARK : LIGHT

  // ── Nav ──
  const [page, setPage] = useState<'applications'|'messages'|'sync'|'quotes'|'customers'|'employees'|'families'|'pricing'>('applications')

  // ── Applications (real) ──
  const [apps, setApps]         = useState<Application[]>([])
  const [msgs, setMsgs]         = useState<Message[]>([])
  const [loading, setLoading]   = useState(true)
  const [detail, setDetail]     = useState<Application|null>(null)
  const [msgDetail, setMsgDetail] = useState<Message|null>(null)
  const [appTab, setAppTab]     = useState<'pending'|'all'>('pending')
  const [replyText, setReplyText] = useState('')
  const [replySending, setReplySending] = useState(false)
  const [docsModal, setDocsModal] = useState<Application|null>(null)
  const [selectedDocs, setSelectedDocs] = useState<string[]>([])
  const [docsSending, setDocsSending] = useState(false)
  const [approving, setApproving] = useState<number|null>(null)
  const [toast, setToast]       = useState<{text:string;error?:boolean}|null>(null)

  // ── Sync (real) ──
  const [syncStatus, setSyncStatus]       = useState<any>(null)
  const [syncLoading, setSyncLoading]     = useState(false)
  const [catalogData, setCatalogData]     = useState<any>(null)
  const [inventoryData, setInventoryData] = useState<any>(null)
  const [syncSearch, setSyncSearch]       = useState('')
  const [syncSearching, setSyncSearching] = useState(false)
  const [syncTab, setSyncTab]             = useState<'overview'|'catalog'|'inventory'>('overview')

  // ── Quotes (mock until API built) ──
  const [quotes, setQuotes]         = useState(MOCK_QUOTES)
  const [qModal, setQModal]         = useState<any>(null)
  const [declineReason, setDeclineReason] = useState('')

  // ── Customers (mock until API built) ──
  const [customers, setCustomers]   = useState(MOCK_CUSTOMERS)
  const [custModal, setCustModal]   = useState<any>(null)
  const [custSearch, setCustSearch] = useState('')

  // ── Employees (mock until API built) ──
  const [employees, setEmployees]   = useState(MOCK_EMPLOYEES)
  const [empModal, setEmpModal]     = useState<any>(null)
  const [empForm, setEmpForm]       = useState({ first:'', last:'', email:'', role:'warehouse' })

  // ── Families (mock until API built) ──
  const [families, setFamilies]     = useState(MOCK_FAMILIES)
  const [famCat, setFamCat]         = useState('all')
  const [famOpen, setFamOpen]       = useState<string[]>([])
  const [famSearch, setFamSearch]   = useState('')
  const [photoModal, setPhotoModal] = useState<{famId:string;si:number|null}|null>(null)
  const [photoUrl, setPhotoUrl]     = useState('')

  // ── Pricing (mock until API built) ──
  const [multipliers, setMultipliers] = useState<Record<string,number[]>>({...PRICING_DEFAULTS})
  const [pricingDirty, setPricingDirty] = useState(false)

  const showToast = (text: string, error = false) => { setToast({text,error}); setTimeout(()=>setToast(null),3000) }

  // ── Derived ──
  const pendingApps  = apps.filter(a => a.status === 'pending')
  const unreadMsgs   = msgs.filter(m => !m.read)
  const pendingQuotes = quotes.filter(q => q.status === 'pending')
  const filteredApps = appTab === 'pending' ? pendingApps : apps
  const filteredCustomers = customers.filter(c =>
    !custSearch || c.company.toLowerCase().includes(custSearch.toLowerCase()) || c.email.toLowerCase().includes(custSearch.toLowerCase())
  )
  const filteredFamilies = families.filter(f => {
    if (famCat !== 'all' && f.cat !== famCat) return false
    if (famSearch) {
      const q = famSearch.toLowerCase()
      return f.name.toLowerCase().includes(q) || f.skus.some((s:any) => s.sku.toLowerCase().includes(q))
    }
    return true
  })

  // ── Real API functions ──
  const testSCAuth = async () => { setSyncLoading(true); try { const r = await fetch('/api/sc/auth'); setSyncStatus(await r.json()) } catch(e){ setSyncStatus({error:String(e)}) } finally { setSyncLoading(false) } }
  const fetchSCCatalog = async (kw?: string) => { setSyncSearching(true); try { const r = await fetch(kw ? '/api/sc/catalog?size=20&active=false&keyword='+encodeURIComponent(kw) : '/api/sc/catalog?size=20&active=false'); setCatalogData(await r.json()) } catch(e){ setCatalogData({error:String(e)}) } finally { setSyncSearching(false) } }
  const fetchSCInventory = async (kw?: string) => { setSyncSearching(true); try { const r = await fetch(kw ? '/api/sc/inventory?size=20&inStockOnly=true&keyword='+encodeURIComponent(kw) : '/api/sc/inventory?size=20&inStockOnly=true'); setInventoryData(await r.json()) } catch(e){ setInventoryData({error:String(e)}) } finally { setSyncSearching(false) } }

  useEffect(() => { if (page === 'sync' && !syncStatus) testSCAuth() }, [page])

  const handleLogin = async () => {
    setPwLoading(true); setPwError('')
    try {
      const r = await fetch('/api/admin-auth', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({password:pw}) })
      if (r.ok) { setAuthed(true); sessionStorage.setItem('aw-admin','1') } else { setPwError('Invalid password') }
    } catch { setPwError('Connection error') } finally { setPwLoading(false) }
  }

  useEffect(() => { if (sessionStorage.getItem('aw-admin') === '1') setAuthed(true) }, [])

  const fetchApps = async () => { try { const r = await fetch('/api/admin-applications'); if (r.ok) setApps(await r.json()) } catch {} }
  const fetchMsgs = async () => { try { const r = await fetch('/api/admin-messages'); if (r.ok) setMsgs(await r.json()) } catch {} }

  useEffect(() => { if (!authed) return; setLoading(true); Promise.all([fetchApps(), fetchMsgs()]).finally(()=>setLoading(false)) }, [authed])

  const updateAppStatus = async (id: number, status: string) => {
    try {
      await fetch('/api/admin-applications', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({id,status}) })
      setApps(prev => prev.map(a => a.id===id ? {...a,status} : a)); setDetail(null)
    } catch {}
  }

  const markRead = async (msg: Message) => {
    setMsgDetail(msg)
    if (!msg.read) {
      try {
        await fetch('/api/admin-messages', { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({id:msg.id,read:true}) })
        setMsgs(prev => prev.map(m => m.id===msg.id ? {...m,read:true} : m))
      } catch {}
    }
  }

  const sendReply = async () => {
    if (!msgDetail || !replyText.trim()) return
    setReplySending(true)
    try {
      const r = await fetch('/api/send-email', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({to:msgDetail.email, subject:'Re: '+msgDetail.subject, message:replyText, replyToMsgId:msgDetail.id}) })
      if (r.ok) { showToast('Reply sent'); setMsgDetail(null); setReplyText('') } else { showToast('Failed to send',true) }
    } catch { showToast('Failed to send',true) } finally { setReplySending(false) }
  }

  const requestDocs = async () => {
    if (!docsModal || !selectedDocs.length) return
    setDocsSending(true)
    try {
      const r = await fetch('/api/request-docs', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({applicationId:docsModal.id, email:docsModal.email, companyName:docsModal.company_name, firstName:docsModal.first_name, documents:selectedDocs}) })
      if (r.ok) { showToast('Document request sent'); setApps(prev=>prev.map(a=>a.id===docsModal.id?{...a,status:'docs_requested'}:a)); setDocsModal(null); setSelectedDocs([]); setDetail(null) }
      else { showToast('Failed',true) }
    } catch { showToast('Failed',true) } finally { setDocsSending(false) }
  }

  const approveApp = async (app: Application) => {
    setApproving(app.id)
    try {
      const r = await fetch('/api/approve-application', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({applicationId:app.id}) })
      if (r.ok) { showToast(app.company_name+' approved — welcome email sent'); setApps(prev=>prev.map(a=>a.id===app.id?{...a,status:'approved'}:a)); setDetail(null) }
      else { const d = await r.json(); showToast(d.error||'Approval failed',true) }
    } catch { showToast('Approval failed',true) } finally { setApproving(null) }
  }

  // ── Mock functions for new pages ──
  const updateQuote = (id: number, status: string) => { setQuotes(prev=>prev.map(q=>q.id===id?{...q,status}:q)); setQModal(null); setDeclineReason(''); showToast('Quote updated') }
  const toggleCustomer = (id: number) => setCustomers(prev=>prev.map(c=>c.id===id?{...c,active:!c.active}:c))
  const saveEmployee = () => { if(!empForm.first||!empForm.email){showToast('Name and email required',true);return}; setEmployees(prev=>[...prev,{id:Date.now(),...empForm,active:true,lastLogin:0}]); setEmpModal(null); setEmpForm({first:'',last:'',email:'',role:'warehouse'}); showToast('Team member invited') }
  const toggleSkuVisible = (famId: string, sku: string) => setFamilies(prev=>prev.map(f=>f.id===famId?{...f,skus:f.skus.map((s:any)=>s.sku===sku?{...s,visible:!s.visible}:s)}:f))
  const bulkHideFamily = (famId: string) => { setFamilies(prev=>prev.map(f=>f.id===famId?{...f,skus:f.skus.map((s:any)=>EXCLUDED_GRADES.includes(s.grade)?s:{...s,visible:false})}:f)); showToast('All SKUs hidden') }
  const savePhoto = () => { if(!photoModal)return; if(photoModal.si===null) setFamilies(prev=>prev.map(f=>f.id===photoModal.famId?{...f,hero:photoUrl}:f)); else setFamilies(prev=>prev.map(f=>f.id===photoModal.famId?{...f,skus:f.skus.map((s:any,i:number)=>i===photoModal.si?{...s,photo:photoUrl}:s)}:f)); setPhotoModal(null); setPhotoUrl(''); showToast('Photo saved') }
  const exportFamilies = () => { const rows = [['Family','Category','SKU','Grade','Storage','Carrier','Color','Qty','Cost','Visible']]; families.forEach(f=>f.skus.forEach((s:any)=>rows.push([f.name,f.cat,s.sku,s.grade,s.storage,s.carrier,s.color,s.qty,s.cost,s.visible?'Yes':'No']))); const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n'); const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download='AW_Families_'+new Date().toISOString().slice(0,10)+'.csv'; a.click(); showToast('Exported') }
  const exportQuotes = () => { const rows = [['Ref','Company','Units','Value','Status','Submitted']]; quotes.forEach(q=>rows.push([q.ref,q.company,q.units,q.value,q.status,fmtDate(q.created)])); const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n'); const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download='AW_Quotes_'+new Date().toISOString().slice(0,10)+'.csv'; a.click(); showToast('Exported') }
  const exportCustomers = () => { const rows = [['Company','Name','Email','Type','Status']]; customers.forEach(c=>rows.push([c.company,c.first+' '+c.last,c.email,c.type,c.active?'Active':'Inactive'])); const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n'); const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download='AW_Customers_'+new Date().toISOString().slice(0,10)+'.csv'; a.click(); showToast('Exported') }
  const skuPhoto = (fam: any, s: any) => s.photo || fam.hero || null

  // ─── STYLE HELPERS ────────────────────────────────────────────────────────────
  const card  = (extra?: any) => ({background:C.panel, border:'1px solid '+C.border, borderRadius:12, overflow:'hidden' as const, marginBottom:20, ...extra})
  const th    = () => ({fontSize:10, fontWeight:700, color:isDark?'#334155':'#475569', textTransform:'uppercase' as const, letterSpacing:'.08em', padding:'10px 16px', textAlign:'left' as const, borderBottom:'1px solid '+C.border})
  const td    = (bold=false) => ({fontSize:13, color:bold?C.text:C.sub, fontWeight:bold?700:400, padding:'10px 16px', borderBottom:'1px solid '+(isDark?C.panel:'#f1f5f9')})
  const stat  = () => ({background:C.panel, border:'1px solid '+C.border, borderRadius:12, padding:'18px 20px'})
  const input = (extra?: any) => ({padding:'8px 12px', background:C.dark, border:'1px solid '+C.border, borderRadius:6, fontSize:13, color:C.text, fontFamily:"'DM Sans',system-ui,sans-serif", outline:'none', width:'100%', ...extra})
  const btn   = (variant='ghost') => {
    const v: Record<string,any> = {
      primary: {background:C.orange,color:'#fff',border:'1px solid '+C.orange},
      green:   {background:'#052e16',color:'#22c55e',border:'1px solid #166534'},
      red:     {background:'#1c0606',color:'#ef4444',border:'1px solid #7f1d1d'},
      orange:  {background:'#1c0e00',color:'#fb923c',border:'1px solid #7c2d12'},
      blue:    {background:'#0c1a3a',color:'#60a5fa',border:'1px solid #1e3a8a'},
      ghost:   {background:C.faint,color:C.sub,border:'1px solid '+C.faint},
    }
    return {...(v[variant]||v.ghost), fontSize:12, fontWeight:700, padding:'5px 12px', borderRadius:6, cursor:'pointer', fontFamily:"'DM Sans',system-ui,sans-serif"}
  }
  const modal = () => ({background:C.panel, border:'1px solid '+C.border, borderRadius:16, width:580, maxWidth:'95vw', maxHeight:'88vh', overflowY:'auto' as const, padding:32})
  const overlay = () => ({position:'fixed' as const, inset:0, background:'rgba(0,0,0,.6)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20})
  const mlabel = () => ({fontSize:10, fontWeight:700, color:C.sub, textTransform:'uppercase' as const, letterSpacing:'.08em', marginBottom:4})
  const mval   = () => ({fontSize:14, color:C.text, fontWeight:600, marginBottom:16})
  const Badge = ({color,bg,label}: {color:string,bg:string,label:string}) => (
    <span style={{background:bg,color,fontSize:11,fontWeight:700,padding:'3px 8px',borderRadius:5,display:'inline-flex',alignItems:'center',gap:4,whiteSpace:'nowrap' as const}}>
      <span style={{width:5,height:5,borderRadius:'50%',background:color,display:'inline-block'}}/>
      {label}
    </span>
  )

  const PAGE_TITLES: Record<string,string> = { applications:'Account Applications', messages:'Contact Messages', sync:'SellerCloud Sync', quotes:'Quote Requests', customers:'Customer Management', employees:'User Management', families:'Product Families', pricing:'Grade Multipliers' }

  // ═══════════════════════════════════════════════════════════════════════
  // LOGIN GATE
  // ═══════════════════════════════════════════════════════════════════════
  if (!authed) return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:'#0f1520',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#111827',border:'1px solid #1e2d4a',borderRadius:16,padding:40,width:380,textAlign:'center'}}>
        <div style={{fontSize:16,fontWeight:800,color:'#fff',marginBottom:4,display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
          <div style={{width:8,height:8,background:'#ea580c',borderRadius:'50%'}}/>AeroWholesale
        </div>
        <div style={{fontSize:12,color:'#475569',marginBottom:28}}>Admin Panel · Enter password to continue</div>
        {pwError && <div style={{fontSize:12,color:'#ef4444',marginBottom:14}}>{pwError}</div>}
        <input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} autoFocus
          style={{width:'100%',padding:'12px 14px',background:'#0a0f1a',border:'1.5px solid #1e2d4a',borderRadius:8,fontSize:14,color:'#e2e8f0',fontFamily:'inherit',outline:'none',marginBottom:14,textAlign:'center',letterSpacing:'0.1em',boxSizing:'border-box' as const}}/>
        <button onClick={handleLogin} disabled={pwLoading||!pw} style={{width:'100%',padding:12,background:'#ea580c',color:'#fff',fontSize:14,fontWeight:700,border:'none',borderRadius:8,cursor:pwLoading||!pw?'not-allowed':'pointer',fontFamily:'inherit',opacity:pwLoading||!pw?0.6:1}}>
          {pwLoading ? 'Checking...' : 'Enter'}
        </button>
      </div>
    </div>
  )

  // ═══════════════════════════════════════════════════════════════════════
  // MAIN LAYOUT
  // ═══════════════════════════════════════════════════════════════════════
  const sbItem = (pg: string, icon: string, label: string, badge?: number) => (
    <div onClick={()=>setPage(pg as any)}
      style={{display:'flex',alignItems:'center',gap:10,padding:'9px 20px',fontSize:13,fontWeight:500,cursor:'pointer',borderLeft:page===pg?'3px solid '+C.orange:'3px solid transparent',color:page===pg?C.text:C.dim,background:page===pg?C.panel:'transparent',transition:'all .12s'}}>
      <span>{icon}</span>{label}
      {!!badge && <span style={{marginLeft:'auto',background:C.orange,color:'#fff',fontSize:10,fontWeight:700,padding:'1px 6px',borderRadius:10}}>{badge}</span>}
    </div>
  )

  return (
    <div style={{display:'flex',minHeight:'100vh',background:C.bg,fontFamily:"'DM Sans',system-ui,sans-serif",color:C.text,WebkitFontSmoothing:'antialiased'}}>

      {/* ── SIDEBAR ── */}
      <div style={{width:220,background:C.dark,borderRight:'1px solid '+C.border,position:'fixed',top:0,left:0,bottom:0,zIndex:50,display:'flex',flexDirection:'column',overflowY:'auto'}}>
        <div style={{padding:20,fontSize:15,fontWeight:800,color:C.text,borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:8,height:8,background:C.orange,borderRadius:'50%'}}/>AeroWholesale
        </div>
        <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:C.dim,padding:'16px 20px 6px'}}>Operations</div>
        {sbItem('applications','✅','Applications',pendingApps.length)}
        {sbItem('messages','💬','Messages',unreadMsgs.length)}
        {sbItem('quotes','📋','Quote Requests',pendingQuotes.length)}
        <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em',color:C.dim,padding:'16px 20px 6px'}}>System</div>
        {sbItem('sync','🔄','SellerCloud Sync')}
        {sbItem('customers','🏢','Customer Management')}
        {sbItem('employees','👥','User Management')}
        {sbItem('families','📦','Product Families')}
        {sbItem('pricing','⚙️','Grade Multipliers')}
        <div style={{marginTop:'auto',padding:'16px 20px',borderTop:'1px solid '+C.border,display:'flex',alignItems:'center',gap:10}}>
          <div style={{width:32,height:32,borderRadius:'50%',background:C.orange,display:'flex',alignItems:'center',justifyContent:'center',fontSize:13,fontWeight:800,color:'#fff',flexShrink:0}}>I</div>
          <div><div style={{fontSize:12,fontWeight:700,color:C.text}}>Isaac</div><div style={{fontSize:10,color:C.sub}}>Owner · Admin</div></div>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{marginLeft:220,flex:1,display:'flex',flexDirection:'column'}}>

        {/* TOPBAR */}
        <div style={{height:56,background:C.dark,borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',padding:'0 28px',position:'sticky',top:0,zIndex:40}}>
          <div style={{fontSize:15,fontWeight:700,color:C.text,flex:1}}>{PAGE_TITLES[page]}</div>
          <div onClick={()=>setIsDark(d=>!d)} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',marginRight:16,userSelect:'none'}}>
            <span style={{fontSize:13}}>{isDark?'🌙':'☀️'}</span>
            <div style={{width:36,height:20,borderRadius:10,background:isDark?'#1e2d4a':'#cbd5e1',position:'relative'}}>
              <div style={{width:14,height:14,borderRadius:'50%',background:isDark?'#94a3b8':C.orange,position:'absolute',top:3,left:isDark?3:19,transition:'left .2s'}}/>
            </div>
            <span style={{fontSize:11,fontWeight:600,color:C.sub,minWidth:32}}>{isDark?'Dark':'Light'}</span>
          </div>
          <button onClick={()=>{fetchApps();fetchMsgs();showToast('Refreshed')}} style={btn('ghost')}>↻ Refresh</button>
        </div>

        <div style={{padding:28}}>

          {loading && (page==='applications'||page==='messages') ? (
            <div style={{textAlign:'center',padding:40,color:C.dim}}>Loading...</div>
          ) : null}

          {/* ══ APPLICATIONS ══ */}
          {page==='applications' && !loading && <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
              {[['Pending Review',pendingApps.length,'#eab308'],['Total',apps.length,''],['Approved',apps.filter(a=>a.status==='approved').length,'#22c55e'],['Docs Requested',apps.filter(a=>a.status==='docs_requested').length,'#fb923c']].map(([l,v,vc])=>(
                <div key={String(l)} style={stat()}>
                  <div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div>
                  <div style={{fontSize:26,fontWeight:800,color:String(vc)||C.text,lineHeight:1}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{display:'flex',gap:4,marginBottom:20}}>
              {[['pending','Pending ('+pendingApps.length+')'],['all','All ('+apps.length+')']].map(([k,l])=>(
                <div key={k} onClick={()=>setAppTab(k as any)} style={{fontSize:12,fontWeight:600,padding:'6px 14px',borderRadius:6,cursor:'pointer',color:appTab===k?C.text:C.dim,background:appTab===k?C.faint:'transparent'}}>{l}</div>
              ))}
            </div>
            {filteredApps.length===0 ? (
              <div style={{textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:48,marginBottom:12}}>📭</div><div style={{fontSize:14,fontWeight:600}}>No applications</div></div>
            ) : (
              <div style={card()}>
                <div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{fontSize:14,fontWeight:700,color:C.text}}>{appTab==='pending'?'Pending Applications':'All Applications'}</div>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['Company','Contact','Type','Volume','Applied','Status','Actions'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                  <tbody>
                    {filteredApps.map(app=>{
                      const sb = statusBadge(app.status); const tb = typeBadge(app.account_type)
                      return (
                        <tr key={app.id}>
                          <td style={td()}><div style={{fontWeight:700,color:C.text}}>{app.company_name}</div><div style={{fontSize:11,color:C.dim}}>{app.state}</div></td>
                          <td style={td()}><div style={{fontSize:12}}>{app.first_name} {app.last_name}</div><div style={{fontSize:11,color:C.dim}}>{app.email}</div></td>
                          <td style={td()}><Badge color={tb.color} bg={tb.bg} label={app.account_type}/></td>
                          <td style={td()}>{app.monthly_volume}</td>
                          <td style={td()}>{timeAgo(app.created_at)}</td>
                          <td style={td()}><Badge color={sb.color} bg={sb.bg} label={app.status.replace(/_/g,' ')}/></td>
                          <td style={td()}>
                            <div style={{display:'flex',gap:5}}>
                              <button style={btn('blue')} onClick={()=>setDetail(app)}>View</button>
                              {app.status==='pending'&&<><button style={btn('green')} onClick={()=>approveApp(app)}>{approving===app.id?'...':'Approve'}</button><button style={btn('orange')} onClick={()=>{setDocsModal(app);setSelectedDocs([])}}>Req Docs</button><button style={btn('red')} onClick={()=>updateAppStatus(app.id,'rejected')}>Reject</button></>}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </>}

          {/* ══ MESSAGES ══ */}
          {page==='messages' && !loading && <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginBottom:24}}>
              {[['Unread',unreadMsgs.length,'#eab308'],['Total',msgs.length,''],['Today',msgs.filter(m=>new Date(m.created_at).toDateString()===new Date().toDateString()).length,'']].map(([l,v,vc])=>(
                <div key={String(l)} style={stat()}>
                  <div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div>
                  <div style={{fontSize:26,fontWeight:800,color:String(vc)||C.text,lineHeight:1}}>{v}</div>
                </div>
              ))}
            </div>
            {msgs.length===0 ? (
              <div style={{textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:48,marginBottom:12}}>📭</div><div>No messages yet</div></div>
            ) : msgs.map(msg=>(
              <div key={msg.id} onClick={()=>markRead(msg)} style={{background:C.panel,border:'1px solid '+(msg.read?C.border:C.orange),borderLeft:'3px solid '+(msg.read?C.border:C.orange),borderRadius:10,padding:'18px 20px',marginBottom:10,cursor:'pointer'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                  <div style={{fontSize:14,fontWeight:700,color:C.text}}>{msg.name}{msg.company&&' · '+msg.company}</div>
                  <div style={{fontSize:11,color:C.dim}}>{timeAgo(msg.created_at)}</div>
                </div>
                <div style={{fontSize:13,fontWeight:600,color:C.sub,marginBottom:4}}>{msg.subject}</div>
                <div style={{fontSize:12,color:C.dim,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{msg.message}</div>
              </div>
            ))}
          </>}

          {/* ══ QUOTES ══ */}
          {page==='quotes' && <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
              {[['Pending',pendingQuotes.length,'#eab308'],['Total',quotes.length,''],['Confirmed',quotes.filter(q=>q.status==='confirmed').length,'#22c55e'],['Pipeline $',quotes.filter(q=>q.status==='pending').reduce((s,q)=>s+q.value,0).toLocaleString(),'#60a5fa']].map(([l,v,vc])=>(
                <div key={String(l)} style={stat()}>
                  <div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div>
                  <div style={{fontSize:26,fontWeight:800,color:String(vc)||C.text,lineHeight:1}}>{typeof v==='number'?v:'$'+v}</div>
                </div>
              ))}
            </div>
            <div style={card()}>
              <div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{fontSize:14,fontWeight:700,color:C.text}}>All Quote Requests</div>
                <button style={btn('blue')} onClick={exportQuotes}>⬇ Export CSV</button>
              </div>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead><tr>{['Ref','Company','Contact','Units','Est Value','Status','Submitted','Actions'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                <tbody>
                  {quotes.map(q=>{
                    const sb=statusBadge(q.status)
                    return (
                      <tr key={q.id}>
                        <td style={td(true)}>{q.ref}</td>
                        <td style={td(true)}>{q.company}</td>
                        <td style={td()}><div>{q.dealer}</div><div style={{fontSize:11,color:C.dim}}>{q.demail}</div></td>
                        <td style={td()}>{q.units}</td>
                        <td style={td()}>{q.value>0?'$'+q.value.toLocaleString():'TBD'}</td>
                        <td style={td()}><Badge color={sb.color} bg={sb.bg} label={q.status}/></td>
                        <td style={td()}>{fmtDate(q.created)}</td>
                        <td style={td()}>
                          <div style={{display:'flex',gap:5}}>
                            <button style={btn('blue')} onClick={()=>setQModal(q)}>View</button>
                            {q.status==='pending'&&<><button style={btn('green')} onClick={()=>updateQuote(q.id,'confirmed')}>Confirm</button><button style={btn('red')} onClick={()=>setQModal(q)}>Decline</button></>}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>}

          {/* ══ SYNC ══ */}
          {page==='sync' && <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
              <div style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>Connection</div><div style={{fontSize:16,fontWeight:800,color:syncLoading?C.sub:syncStatus?.success?'#22c55e':'#ef4444',lineHeight:1}}>{syncLoading?'...':syncStatus?.success?'Connected':'Error'}</div></div>
              <div style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>API</div><div style={{fontSize:12,fontWeight:700,color:C.sub,lineHeight:1}}>bi.api.sellercloud.com</div></div>
              <div style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>Catalog Products</div><div style={{fontSize:26,fontWeight:800,color:C.text,lineHeight:1}}>{catalogData?.total?.toLocaleString()||'—'}</div></div>
              <div style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>In-Stock SKUs</div><div style={{fontSize:26,fontWeight:800,color:C.text,lineHeight:1}}>{inventoryData?.total?.toLocaleString()||'—'}</div></div>
            </div>
            <div style={{display:'flex',gap:8,marginBottom:20}}>
              <button style={btn('primary')} onClick={testSCAuth} disabled={syncLoading}>{syncLoading?'Testing...':'🔄 Test Connection'}</button>
              <button style={btn('blue')} onClick={()=>fetchSCCatalog()} disabled={syncSearching}>{syncSearching?'Loading...':'📦 Load Catalog'}</button>
              <button style={btn('orange')} onClick={()=>fetchSCInventory()} disabled={syncSearching}>{syncSearching?'Loading...':'📊 Load Inventory'}</button>
            </div>
            {syncStatus?.error&&<div style={{background:'#1c0606',border:'1px solid #7f1d1d',borderRadius:8,padding:16,marginBottom:20,fontSize:13,color:'#ef4444'}}>{syncStatus.error}</div>}
            <div style={{display:'flex',gap:8,marginBottom:20}}>
              <input style={input({flex:1})} placeholder="Search products (e.g. iPhone, iPad)..." value={syncSearch} onChange={e=>setSyncSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&syncSearch.trim()&&(fetchSCCatalog(syncSearch),fetchSCInventory(syncSearch))}/>
              <button style={btn('primary')} onClick={()=>{fetchSCCatalog(syncSearch);fetchSCInventory(syncSearch)}} disabled={syncSearching||!syncSearch.trim()}>Search</button>
            </div>
            <div style={{display:'flex',gap:4,marginBottom:20}}>
              {[['overview','Overview'],['catalog','Catalog'+(catalogData?.total?' ('+catalogData.total+')':'')],['inventory','Inventory'+(inventoryData?.total?' ('+inventoryData.total+')':'')]].map(([k,l])=>(
                <div key={k} onClick={()=>setSyncTab(k as any)} style={{fontSize:12,fontWeight:600,padding:'6px 14px',borderRadius:6,cursor:'pointer',color:syncTab===k?C.text:C.dim,background:syncTab===k?C.faint:'transparent'}}>{l}</div>
              ))}
            </div>
            {syncTab==='overview'&&<div style={card()}>
              <div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border}}><div style={{fontSize:14,fontWeight:700,color:C.text}}>Integration Status</div></div>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead><tr>{['Feature','Status','Details'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                <tbody>
                  {[
                    ['API Authentication',syncStatus?.success?'Active':'Not Connected',syncStatus?.success?'Token active':syncStatus?.error||'Click Test Connection',syncStatus?.success?'#22c55e':'#ef4444',syncStatus?.success?'#052e16':'#1c0606'],
                    ['Catalog Sync',catalogData?.total>0?'Loaded':'Not Loaded',catalogData?.total?catalogData.total.toLocaleString()+' products':'Click Load Catalog',catalogData?.total>0?'#22c55e':'#eab308',catalogData?.total>0?'#052e16':'#1c1400'],
                    ['Inventory Sync',inventoryData?.total>0?'Loaded':'Not Loaded',inventoryData?.total?inventoryData.total.toLocaleString()+' in-stock SKUs':'Click Load Inventory',inventoryData?.total>0?'#22c55e':'#eab308',inventoryData?.total>0?'#052e16':'#1c1400'],
                    ['Website Catalog','Pending','Not yet wired to live data','#eab308','#1c1400'],
                    ['Auto-Sync','Not Set','Manual sync only','#64748b','#1e2d4a'],
                  ].map(([f,s,d,sc,sbg])=>(
                    <tr key={String(f)}><td style={td(true)}>{f}</td><td style={td()}><Badge color={String(sc)} bg={String(sbg)} label={String(s)}/></td><td style={td()}>{d}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>}
            {syncTab==='catalog'&&catalogData?.items&&<div style={card()}><div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border}}><div style={{fontSize:14,fontWeight:700,color:C.text}}>Catalog ({catalogData.total?.toLocaleString()})</div></div><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr>{['SKU','Product','Qty','Avg Cost','Sold 30d','Sold 90d','Channels'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead><tbody>{catalogData.items.map((item: any,i: number)=><tr key={i}><td style={td()}><span style={{fontSize:11,fontFamily:'monospace',fontWeight:700,color:C.text}}>{item.sku}</span></td><td style={td()}><div style={{fontWeight:700,color:C.text}}>{item.name}</div>{item.parsed&&<div style={{fontSize:11,color:C.dim}}>{item.parsed.deviceType}·{item.parsed.gradeDescription}</div>}</td><td style={{...td(),color:item.physicalQty>0?'#22c55e':'#ef4444',fontWeight:700}}>{item.physicalQty}</td><td style={td()}>{item.avgCost>0?'$'+item.avgCost.toFixed(2):'—'}</td><td style={td()}>{item.sold30||'—'}</td><td style={td()}>{item.sold90||'—'}</td><td style={{...td(),fontSize:11}}>{[item.backMarketEnabled&&'BM',item.ebayEnabled&&'eBay',item.walmartEnabled&&'WM'].filter(Boolean).join(', ')||'—'}</td></tr>)}</tbody></table></div></div>}
            {syncTab==='catalog'&&!catalogData?.items&&<div style={{textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:48,marginBottom:12}}>📦</div><div>Click "Load Catalog" to see products</div></div>}
            {syncTab==='inventory'&&inventoryData?.items&&<div style={card()}><div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border}}><div style={{fontSize:14,fontWeight:700,color:C.text}}>Inventory ({inventoryData.total?.toLocaleString()})</div></div><div style={{overflowX:'auto'}}><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr>{['SKU','Product','Physical','Available','Reserved','Avg Cost','Warehouse','Velocity'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead><tbody>{inventoryData.items.map((item: any,i: number)=><tr key={i}><td style={td()}><span style={{fontSize:11,fontFamily:'monospace',fontWeight:700,color:C.text}}>{item.sku}</span></td><td style={td(true)}>{item.name}</td><td style={{...td(),color:'#22c55e',fontWeight:700}}>{item.physicalQty}</td><td style={td()}>{item.availableQty}</td><td style={td()}>{item.reservedQty||'—'}</td><td style={td()}>{item.avgCost>0?'$'+item.avgCost.toFixed(2):'—'}</td><td style={{...td(),fontSize:11}}>{item.warehouseName||'—'}</td><td style={{...td(),fontSize:11}}>{item.sold30>0?item.sold30+'/30d':'—'}</td></tr>)}</tbody></table></div></div>}
            {syncTab==='inventory'&&!inventoryData?.items&&<div style={{textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:48,marginBottom:12}}>📊</div><div>Click "Load Inventory" to see stock</div></div>}
          </>}

          {/* ══ CUSTOMERS ══ */}
          {page==='customers' && <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
              {[['Total Accounts',customers.length,''],['Active',customers.filter(c=>c.active).length,'#22c55e'],['Inactive',customers.filter(c=>!c.active).length,'#ef4444'],['Enterprise',customers.filter(c=>c.type==='enterprise').length,'#60a5fa']].map(([l,v,vc])=>(
                <div key={String(l)} style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div><div style={{fontSize:26,fontWeight:800,color:String(vc)||C.text,lineHeight:1}}>{v}</div></div>
              ))}
            </div>
            <div style={card()}>
              <div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',gap:12}}>
                <div style={{fontSize:14,fontWeight:700,color:C.text,flex:1}}>Customer Accounts</div>
                <input style={input({width:220})} placeholder="Search..." value={custSearch} onChange={e=>setCustSearch(e.target.value)}/>
                <button style={btn('blue')} onClick={exportCustomers}>⬇ Export CSV</button>
              </div>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead><tr>{['Company','Contact','Email','Type','Joined','Status','Actions'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                <tbody>
                  {filteredCustomers.map(c=>{
                    const tb=typeBadge(c.type)
                    return (
                      <tr key={c.id}>
                        <td style={td(true)}>{c.company}</td>
                        <td style={td()}>{c.first} {c.last}</td>
                        <td style={td()}>{c.email}</td>
                        <td style={td()}><Badge color={tb.color} bg={tb.bg} label={c.type}/></td>
                        <td style={td()}>{fmtDate(c.created)}</td>
                        <td style={td()}><Badge color={c.active?'#22c55e':'#ef4444'} bg={c.active?'#052e16':'#1c0606'} label={c.active?'Active':'Inactive'}/></td>
                        <td style={td()}>
                          <div style={{display:'flex',gap:5}}>
                            <button style={btn('blue')} onClick={()=>setCustModal(c)}>Manage</button>
                            <button style={c.active?btn('red'):btn('green')} onClick={()=>toggleCustomer(c.id)}>{c.active?'Disable':'Enable'}</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>}

          {/* ══ EMPLOYEES ══ */}
          {page==='employees' && <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
              {[['Team Members',employees.length,''],['Active',employees.filter(e=>e.active).length,'#22c55e'],['Admins',employees.filter(e=>e.role==='admin').length,'#fb923c'],['Last Login','Today','#60a5fa']].map(([l,v,vc])=>(
                <div key={String(l)} style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div><div style={{fontSize:26,fontWeight:800,color:String(vc)||C.text,lineHeight:1}}>{v}</div></div>
              ))}
            </div>
            <div style={card()}>
              <div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{fontSize:14,fontWeight:700,color:C.text}}>Team Members</div>
                <button style={btn('primary')} onClick={()=>setEmpModal(true)}>+ Invite Member</button>
              </div>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead><tr>{['Name','Email','Role','Last Login','Status','Actions'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                <tbody>
                  {employees.map(e=>{
                    const rb: Record<string,{color:string,bg:string}> = { admin:{color:'#fb923c',bg:'#1c0e00'}, manager:{color:'#60a5fa',bg:'#0c1a3a'}, warehouse:{color:'#eab308',bg:'#1c1400'}, readonly:{color:'#64748b',bg:'#1e2d4a'} }
                    const r = rb[e.role]||rb.readonly
                    return (
                      <tr key={e.id}>
                        <td style={td(true)}>{e.first} {e.last}</td>
                        <td style={td()}>{e.email}</td>
                        <td style={td()}><Badge color={r.color} bg={r.bg} label={ROLE_LABELS[e.role]||e.role}/></td>
                        <td style={td()}>{e.lastLogin?timeAgo(new Date(e.lastLogin).toISOString()):'Never'}</td>
                        <td style={td()}><Badge color={e.active?'#22c55e':'#64748b'} bg={e.active?'#052e16':'#1e2d4a'} label={e.active?'Active':'Inactive'}/></td>
                        <td style={td()}>
                          <div style={{display:'flex',gap:5}}>
                            <button style={btn('ghost')} onClick={()=>showToast('Password reset email sent')}>Reset PW</button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>}

          {/* ══ FAMILIES ══ */}
          {page==='families' && <>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
              {[['Mapped Families',families.length,''],['Total SKUs',families.reduce((s,f)=>s+f.skus.length,0),''],['Live SKUs',families.reduce((s,f)=>s+f.skus.filter((sk:any)=>sk.visible).length,0),'#22c55e'],['Unmapped',MOCK_UNMAPPED.length,'#eab308']].map(([l,v,vc])=>(
                <div key={String(l)} style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div><div style={{fontSize:26,fontWeight:800,color:String(vc)||C.text,lineHeight:1}}>{v}</div></div>
              ))}
            </div>
            <div style={{display:'flex',gap:10,marginBottom:20,alignItems:'center'}}>
              <input style={input({flex:1,maxWidth:320})} placeholder="Search families or SKUs..." value={famSearch} onChange={e=>setFamSearch(e.target.value)}/>
              {famSearch&&<button style={btn('ghost')} onClick={()=>setFamSearch('')}>✕ Clear</button>}
              <div style={{display:'flex',gap:4,marginLeft:'auto'}}>
                {['all','iPhones','iPads','MacBooks','Samsung','accessories'].map(cat=>(
                  <div key={cat} onClick={()=>setFamCat(cat)} style={{fontSize:12,fontWeight:600,padding:'5px 12px',borderRadius:6,cursor:'pointer',color:famCat===cat?C.text:C.dim,background:famCat===cat?C.faint:'transparent'}}>{cat==='all'?'All':cat}</div>
                ))}
              </div>
              <button style={btn('blue')} onClick={exportFamilies}>⬇ Export CSV</button>
            </div>

            {filteredFamilies.map(fam=>{
              const isOpen = famOpen.includes(fam.id)
              const totalQty = fam.skus.reduce((s:number,sk:any)=>s+sk.qty,0)
              return (
                <div key={fam.id} style={{...card(),border:'1px solid '+(totalQty===0?'#7f1d1d':C.border)}}>
                  <div style={{padding:'14px 20px',borderBottom:isOpen?'1px solid '+C.border:'none',display:'flex',alignItems:'center',gap:12,cursor:'pointer'}} onClick={()=>setFamOpen(prev=>prev.includes(fam.id)?prev.filter(x=>x!==fam.id):[...prev,fam.id])}>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{fontSize:14,fontWeight:700,color:C.text}}>{fam.name}</span>
                        {totalQty===0&&<span style={{background:'#7f1d1d',color:'#ef4444',fontSize:10,fontWeight:700,padding:'2px 6px',borderRadius:4}}>NO STOCK</span>}
                        <span style={{fontSize:11,color:C.dim}}>{fam.skus.length} SKUs · {fam.skus.filter((s:any)=>s.visible).length} live · {totalQty} units</span>
                      </div>
                      <div style={{fontSize:11,color:C.dim,marginTop:2}}>{fam.cat}{fam.hero?' · hero photo set':''}</div>
                    </div>
                    <button style={btn('ghost')} onClick={e=>{e.stopPropagation();const n=prompt('Rename family:',fam.name);if(n)setFamilies(prev=>prev.map(f=>f.id===fam.id?{...f,name:n}:f));}}>Rename</button>
                    <button style={btn('red')} onClick={e=>{e.stopPropagation();bulkHideFamily(fam.id)}}>Hide All</button>
                    <button style={btn('blue')} onClick={e=>{e.stopPropagation();setPhotoModal({famId:fam.id,si:null});setPhotoUrl(fam.hero||'')}}>📷 Hero Photo</button>
                    <span style={{color:C.dim,fontSize:16}}>{isOpen?'▲':'▼'}</span>
                  </div>
                  {isOpen&&<table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>{['SKU','Grade','Storage','Carrier','Color','Qty','Cost','Photo','Visible'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                    <tbody>
                      {fam.skus.map((s:any,si:number)=>{
                        const gb=gradeBadge(s.grade); const ph=skuPhoto(fam,s); const excl=EXCLUDED_GRADES.includes(s.grade)
                        return (
                          <tr key={s.sku}>
                            <td style={{...td(),fontFamily:'monospace',fontSize:11}}>{s.sku}</td>
                            <td style={td()}><Badge color={gb.color} bg={gb.bg} label={s.grade}/></td>
                            <td style={td()}>{s.storage}</td>
                            <td style={td()}>{s.carrier}</td>
                            <td style={td()}>{s.color}</td>
                            <td style={{...td(),color:s.qty>0?'#22c55e':'#ef4444',fontWeight:700}}>{s.qty}</td>
                            <td style={td()}>{'$'}{s.cost}</td>
                            <td style={td()}>
                              <div onClick={()=>{setPhotoModal({famId:fam.id,si});setPhotoUrl(s.photo||'')}} style={{cursor:'pointer',width:32,height:32,borderRadius:4,background:C.faint,display:'flex',alignItems:'center',justifyContent:'center',border:s.photo?'2px solid '+C.orange:'1px solid '+C.border}}>
                                {ph?<img src={ph} style={{width:30,height:30,objectFit:'cover',borderRadius:3}} alt=""/>:<span style={{fontSize:14}}>📷</span>}
                              </div>
                            </td>
                            <td style={td()}>
                              {excl ? <Badge color='#64748b' bg='#1e2d4a' label='Excluded'/> :
                                <div onClick={()=>toggleSkuVisible(fam.id,s.sku)} style={{width:36,height:20,borderRadius:10,background:s.visible?'#166534':'#334155',position:'relative',cursor:'pointer'}}>
                                  <div style={{width:14,height:14,borderRadius:'50%',background:s.visible?'#22c55e':'#64748b',position:'absolute',top:3,left:s.visible?19:3,transition:'left .15s'}}/>
                                </div>
                              }
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>}
                </div>
              )
            })}

            {MOCK_UNMAPPED.length>0&&<div style={{...card(),border:'1px solid #854d0e'}}>
              <div style={{padding:'14px 20px',borderBottom:'1px solid #854d0e',display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:14,fontWeight:700,color:'#fbbf24'}}>⚠ Unmapped SKUs</span>
                <span style={{background:'#1c1400',color:'#eab308',fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:10}}>{MOCK_UNMAPPED.length}</span>
              </div>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead><tr>{['SKU','Reason','Actions'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                <tbody>
                  {MOCK_UNMAPPED.map((u,i)=>(
                    <tr key={i}>
                      <td style={{...td(),fontFamily:'monospace',fontSize:11,color:C.text}}>{u.sku}</td>
                      <td style={td()}><span style={{background:'#1c1400',color:'#eab308',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:4}}>{u.reason}</span></td>
                      <td style={td()}>
                        <div style={{display:'flex',gap:8}}>
                          <select style={{...input({width:'auto'}),fontSize:11}} defaultValue="">
                            <option value="">Map to family…</option>
                            {families.map(f=><option key={f.id} value={f.id}>{f.name}</option>)}
                          </select>
                          <button style={btn('primary')} onClick={()=>showToast('Create new family — coming soon')}>+ New Family</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>}
          </>}

          {/* ══ PRICING ══ */}
          {page==='pricing' && <>
            <div style={{marginBottom:20,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>
                <div style={{fontSize:13,color:C.sub,marginTop:4}}>Site price = Cost × multiplier. Edit cells directly then save.</div>
              </div>
              <div style={{display:'flex',gap:8}}>
                <button style={btn('ghost')} onClick={()=>{setMultipliers({...PRICING_DEFAULTS});setPricingDirty(false);showToast('Reset to defaults')}}>Reset Defaults</button>
                <button style={btn('primary')} disabled={!pricingDirty} onClick={()=>{setPricingDirty(false);showToast('Multipliers saved ✓')}}>Save Changes</button>
              </div>
            </div>
            {PRICING_CATS.map(cat=>(
              <div key={cat} style={{...card(),marginBottom:16}}>
                <div style={{padding:'12px 20px',borderBottom:'1px solid '+C.border}}><div style={{fontSize:13,fontWeight:700,color:C.text}}>{cat}</div></div>
                <div style={{overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>{PRICING_GRADES.map(g=>{const gb=gradeBadge(g);return<th key={g} style={{...th(),textAlign:'center'}}><Badge color={gb.color} bg={gb.bg} label={g}/></th>})}</tr></thead>
                    <tbody>
                      <tr>
                        {PRICING_GRADES.map((g,gi)=>(
                          <td key={g} style={{...td(),textAlign:'center',padding:'8px'}}>
                            <input type="number" step="0.01" min="0" max="3"
                              value={multipliers[cat]?.[gi]??''}
                              onChange={e=>{const v=parseFloat(e.target.value);if(isNaN(v))return;setMultipliers(prev=>({...prev,[cat]:prev[cat].map((m,i)=>i===gi?v:m)}));setPricingDirty(true)}}
                              style={{width:64,textAlign:'center',padding:'6px 4px',background:C.dark,border:'1px solid '+C.border,borderRadius:6,fontSize:13,color:C.text,fontFamily:'inherit',outline:'none'}}/>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </>}

        </div>{/* end padding div */}
      </div>{/* end main */}

      {/* ══ MODALS ══ */}

      {/* Application Detail */}
      {detail&&<div style={overlay()} onClick={()=>setDetail(null)}>
        <div style={modal()} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>{detail.company_name}</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:24}}>Applied {timeAgo(detail.created_at)} · <Badge color={statusBadge(detail.status).color} bg={statusBadge(detail.status).bg} label={detail.status.replace(/_/g,' ')}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',marginBottom:24}}>
            {[['Contact',detail.first_name+' '+detail.last_name],['Email',detail.email],['Phone',detail.phone],['Job Title',detail.job_title||'—'],['EIN',detail.ein],['Website',detail.website||'—'],['Location',(detail.city?detail.city+', ':'')+detail.state],['Years in Business',detail.years_in_business||'—'],['Account Type',detail.account_type],['Monthly Volume',detail.monthly_volume],['Product Categories',detail.product_categories||'—'],['Sales Channel',detail.sales_channel||'—'],['How They Found Us',detail.heard_about||'—']].map(([l,v])=>(
              <div key={String(l)} style={{marginBottom:16}}><div style={mlabel()}>{l}</div><div style={mval()}>{v}</div></div>
            ))}
          </div>
          {detail.notes&&<div style={{marginBottom:24}}><div style={mlabel()}>Notes</div><div style={{fontSize:13,color:C.sub,lineHeight:1.6}}>{detail.notes}</div></div>}
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            {detail.status==='pending'&&<><button style={btn('green')} disabled={approving===detail.id} onClick={()=>approveApp(detail)}>{approving===detail.id?'...':'✓ Approve'}</button><button style={btn('orange')} onClick={()=>{setDocsModal(detail);setSelectedDocs([])}}>📄 Request Docs</button><button style={btn('red')} onClick={()=>updateAppStatus(detail.id,'rejected')}>✗ Reject</button></>}
            {detail.status==='docs_requested'&&<><button style={btn('green')} disabled={approving===detail.id} onClick={()=>approveApp(detail)}>{approving===detail.id?'...':'✓ Approve'}</button><button style={btn('orange')} onClick={()=>{setDocsModal(detail);setSelectedDocs([])}}>📄 Request Again</button></>}
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>setDetail(null)}>Close</button>
          </div>
        </div>
      </div>}

      {/* Message Detail */}
      {msgDetail&&<div style={overlay()} onClick={()=>{setMsgDetail(null);setReplyText('')}}>
        <div style={modal()} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>{msgDetail.subject}</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>From {msgDetail.name}{msgDetail.company&&' at '+msgDetail.company} · {timeAgo(msgDetail.created_at)}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',marginBottom:20}}>
            <div><div style={mlabel()}>Email</div><div style={mval()}>{msgDetail.email}</div></div>
            <div><div style={mlabel()}>Company</div><div style={mval()}>{msgDetail.company||'—'}</div></div>
          </div>
          <div style={mlabel()}>Message</div>
          <div style={{fontSize:14,color:C.text,lineHeight:1.7,padding:16,background:C.dark,borderRadius:8,border:'1px solid '+C.border,marginBottom:20}}>{msgDetail.message}</div>
          <div style={mlabel()}>Reply</div>
          <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Type your reply..." style={{...input(),minHeight:100,resize:'vertical',marginTop:8}}/>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border,marginTop:16}}>
            <button style={btn('primary')} disabled={replySending||!replyText.trim()} onClick={sendReply}>{replySending?'Sending...':'📧 Send Reply'}</button>
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>{setMsgDetail(null);setReplyText('')}}>Close</button>
          </div>
        </div>
      </div>}

      {/* Document Request */}
      {docsModal&&<div style={overlay()} onClick={()=>setDocsModal(null)}>
        <div style={modal()} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>Request Documents</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>Select documents to request from {docsModal.company_name}</div>
          <div style={{marginBottom:20}}>
            {Object.entries(DOC_LABELS).map(([id,label])=>(
              <label key={id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid '+C.border,fontSize:13,color:C.text,cursor:'pointer'}}>
                <input type="checkbox" checked={selectedDocs.includes(id)} onChange={()=>setSelectedDocs(prev=>prev.includes(id)?prev.filter(d=>d!==id):[...prev,id])} style={{width:16,height:16,accentColor:C.orange}}/>
                {label}
              </label>
            ))}
          </div>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            <button style={btn('primary')} disabled={docsSending||!selectedDocs.length} onClick={requestDocs}>{docsSending?'Sending...':'📧 Send Request ('+selectedDocs.length+' docs)'}</button>
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>setDocsModal(null)}>Cancel</button>
          </div>
        </div>
      </div>}

      {/* Quote Detail */}
      {qModal&&<div style={overlay()} onClick={()=>{setQModal(null);setDeclineReason('')}}>
        <div style={modal()} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>{qModal.ref}</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>{qModal.company} · {qModal.dealer} · {fmtDate(qModal.created)}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',marginBottom:20}}>
            {[['Contact',qModal.dealer],['Email',qModal.demail],['Total Units',qModal.units],['Est Value',qModal.value>0?'$'+qModal.value.toLocaleString():'TBD'],['Status',qModal.status],['Notes',qModal.notes||'—']].map(([l,v])=>(
              <div key={String(l)}><div style={mlabel()}>{l}</div><div style={mval()}>{v}</div></div>
            ))}
          </div>
          <div style={mlabel()}>Line Items</div>
          <div style={{background:C.dark,border:'1px solid '+C.border,borderRadius:8,marginBottom:20,overflow:'hidden'}}>
            {qModal.items.map((item: any,i: number)=>(
              <div key={i} style={{padding:'10px 16px',borderBottom:i<qModal.items.length-1?'1px solid '+C.border:'none',fontSize:13,color:C.text}}>
                <span style={{fontWeight:700}}>{item.qty}×</span> {item.name} · {item.grade} · {item.storage} · {item.carrier}
                {item.price>0&&<span style={{float:'right',color:C.sub}}>{'$'}{item.price}/unit</span>}
              </div>
            ))}
          </div>
          {qModal.status==='pending'&&<>
            <div style={mlabel()}>Decline Reason (if declining)</div>
            <select value={declineReason} onChange={e=>setDeclineReason(e.target.value)} style={{...input(),marginBottom:20}}>
              <option value="">Select reason…</option>
              {Object.entries(DECLINE_REASONS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
          </>}
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            {qModal.status==='pending'&&<><button style={btn('green')} onClick={()=>updateQuote(qModal.id,'confirmed')}>✓ Confirm</button><button style={btn('red')} disabled={!declineReason} onClick={()=>updateQuote(qModal.id,'declined')}>✗ Decline</button></>}
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>{setQModal(null);setDeclineReason('')}}>Close</button>
          </div>
        </div>
      </div>}

      {/* Customer Detail */}
      {custModal&&<div style={overlay()} onClick={()=>setCustModal(null)}>
        <div style={modal()} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>{custModal.company}</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>Customer since {fmtDate(custModal.created)}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',marginBottom:20}}>
            {[['Contact',custModal.first+' '+custModal.last],['Email',custModal.email],['Account Type',custModal.type],['Status',custModal.active?'Active':'Inactive']].map(([l,v])=>(
              <div key={String(l)}><div style={mlabel()}>{l}</div><div style={mval()}>{v}</div></div>
            ))}
          </div>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            <button style={btn('ghost')} onClick={()=>{showToast('Password reset sent');setCustModal(null)}}>Reset Password</button>
            <button style={custModal.active?btn('red'):btn('green')} onClick={()=>{toggleCustomer(custModal.id);setCustModal(null)}}>{custModal.active?'Disable Account':'Enable Account'}</button>
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>setCustModal(null)}>Close</button>
          </div>
        </div>
      </div>}

      {/* Invite Employee */}
      {empModal&&<div style={overlay()} onClick={()=>setEmpModal(null)}>
        <div style={{...modal(),width:480}} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>Invite Team Member</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>They'll receive an email with login instructions</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
            <div><div style={mlabel()}>First Name</div><input style={input()} value={empForm.first} onChange={e=>setEmpForm(p=>({...p,first:e.target.value}))}/></div>
            <div><div style={mlabel()}>Last Name</div><input style={input()} value={empForm.last} onChange={e=>setEmpForm(p=>({...p,last:e.target.value}))}/></div>
          </div>
          <div style={{marginBottom:16}}><div style={mlabel()}>Email</div><input style={input()} type="email" value={empForm.email} onChange={e=>setEmpForm(p=>({...p,email:e.target.value}))}/></div>
          <div style={{marginBottom:20}}><div style={mlabel()}>Role</div>
            <select style={input()} value={empForm.role} onChange={e=>setEmpForm(p=>({...p,role:e.target.value}))}>
              {Object.entries(ROLE_LABELS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            <button style={btn('primary')} onClick={saveEmployee}>📧 Send Invite</button>
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>setEmpModal(null)}>Cancel</button>
          </div>
        </div>
      </div>}

      {/* Photo Editor */}
      {photoModal&&<div style={overlay()} onClick={()=>setPhotoModal(null)}>
        <div style={{...modal(),width:440}} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>{photoModal.si===null?'Set Hero Photo':'Set SKU Photo'}</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>{photoModal.si===null?'This photo will apply to all SKUs without their own override':'This overrides the family hero photo for this specific SKU'}</div>
          {photoUrl&&<img src={photoUrl} style={{width:'100%',height:160,objectFit:'contain',borderRadius:8,background:C.dark,marginBottom:16}} alt="preview"/>}
          <div style={mlabel()}>Photo URL</div>
          <input style={{...input(),marginBottom:20}} placeholder="https://..." value={photoUrl} onChange={e=>setPhotoUrl(e.target.value)}/>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            <button style={btn('primary')} onClick={savePhoto}>Save Photo</button>
            {photoUrl&&<button style={btn('red')} onClick={()=>{setPhotoUrl('');savePhoto()}}>Remove</button>}
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>setPhotoModal(null)}>Cancel</button>
          </div>
        </div>
      </div>}

      {/* Toast */}
      {toast&&<div style={{position:'fixed',bottom:24,right:24,background:toast.error?'#1c0606':'#052e16',border:'1px solid '+(toast.error?'#7f1d1d':'#166534'),color:toast.error?'#ef4444':'#22c55e',padding:'12px 20px',borderRadius:8,fontSize:13,fontWeight:600,zIndex:300}}>{toast.text}</div>}

    </div>
  )
}