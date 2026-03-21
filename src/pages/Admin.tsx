import { useState, useEffect, useCallback } from 'react'

// ─── THEME ────────────────────────────────────────────────────────────────────
const DARK: Record<string,string> = {
  bg:'#0f1520', panel:'#111827', dark:'#0a0f1a', border:'#1e2d4a',
  orange:'#ea580c', text:'#e2e8f0', sub:'#94a3b8', dim:'#475569', faint:'#334155',
}
const LIGHT: Record<string,string> = {
  bg:'#f1f5f9', panel:'#ffffff', dark:'#e2e8f0', border:'#cbd5e1',
  orange:'#ea580c', text:'#0f172a', sub:'#475569', dim:'#64748b', faint:'#94a3b8',
}

const DOC_LABELS: Record<string,string> = {
  w9:'W-9 Form', st3:'ST-3 Sales Tax Exemption', resale:'Resale Certificate',
  ein:'EIN Verification Letter', formation:'Business Formation Docs',
  id:'Gov. Photo ID', insurance:'Certificate of Insurance',
}
const DECLINE_REASONS: Record<string,string> = {
  out_of_stock:'Out of stock at this time', price_mismatch:'Unable to meet requested pricing',
  min_qty:'Below minimum order quantity', no_terms:'Cannot accommodate payment terms', other:'Other',
}
const ROLE_LABELS: Record<string,string> = {
  admin:'Admin', manager:'Manager', warehouse:'Warehouse / Ops', readonly:'Read-Only',
}
const MOCK_EMPLOYEES = [
  { id:1, first:'Isaac', last:'/ Zack', email:'isaac@aerowholesale.com', role:'admin', active:true, lastLogin:Date.now()-3600000 },
  { id:2, first:'Linda', last:'', email:'linda@aerowholesale.com', role:'manager', active:true, lastLogin:Date.now()-86400000 },
  { id:3, first:'Will', last:'', email:'will@aerowholesale.com', role:'warehouse', active:true, lastLogin:Date.now()-172800000 },
]
const PRICING_GRADE_ORDER = ['CAP1','NE','CAP','CA+','CA','CAB','SD','SD-','SDB']

// ─── TYPES ────────────────────────────────────────────────────────────────────
type Application = {
  id:number; first_name:string; last_name:string; email:string; phone:string;
  job_title:string; company_name:string; website:string; ein:string; state:string;
  city:string; years_in_business:string; account_type:string; monthly_volume:string;
  product_categories:string; sales_channel:string; heard_about:string; notes:string;
  status:string; created_at:string;
}
type Message = {
  id:number; name:string; company:string; email:string; subject:string;
  message:string; read:boolean; created_at:string;
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff/60000)
  if (mins < 60) return mins+'m ago'
  const hrs = Math.floor(mins/60)
  if (hrs < 24) return hrs+'h ago'
  return Math.floor(hrs/24)+'d ago'
}
function fmtDate(val: string|number) {
  return new Date(typeof val==='number'?val:val).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
}
function statusBadge(s: string) {
  const m: Record<string,string> = {pending:'#eab308',approved:'#22c55e',rejected:'#ef4444',docs_requested:'#fb923c',docs_received:'#a78bfa',confirmed:'#22c55e',processing:'#60a5fa',declined:'#ef4444'}
  const bg: Record<string,string> = {pending:'#1c1400',approved:'#052e16',rejected:'#1c0606',docs_requested:'#1c0e00',docs_received:'#1e0e3a',confirmed:'#052e16',processing:'#0c1a3a',declined:'#1c0606'}
  return {color:m[s]||'#64748b', bg:bg[s]||'#1e2d4a'}
}
function typeBadge(t: string) {
  const m: Record<string,{color:string,bg:string}> = {
    wholesale:{color:'#60a5fa',bg:'#0c1a3a'},enterprise:{color:'#fb923c',bg:'#1c0e00'},reseller:{color:'#22c55e',bg:'#052e16'},
  }
  return m[t]||{color:'#64748b',bg:'#1e2d4a'}
}
function gradeBadge(g: string) {
  if(['CAP1','CAP','NE'].includes(g)) return {color:'#60a5fa',bg:'#0c1a3a'}
  if(['CA+','CA'].includes(g))        return {color:'#22c55e',bg:'#052e16'}
  if(['CAB','SD','SDB'].includes(g))  return {color:'#eab308',bg:'#1c1400'}
  return {color:'#ef4444',bg:'#1c0606'}
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Admin() {

  const [authed,setAuthed]       = useState(false)
  const [pw,setPw]               = useState('')
  const [pwError,setPwError]     = useState('')
  const [pwLoading,setPwLoading] = useState(false)
  const [isDark,setIsDark]       = useState(true)
  const C = isDark ? DARK : LIGHT
  const [page,setPage] = useState<'applications'|'messages'|'sync'|'quotes'|'customers'|'employees'|'families'|'pricing'>('applications')

  // Applications / Messages
  const [apps,setApps]           = useState<Application[]>([])
  const [msgs,setMsgs]           = useState<Message[]>([])
  const [loading,setLoading]     = useState(true)
  const [detail,setDetail]       = useState<Application|null>(null)
  const [msgDetail,setMsgDetail] = useState<Message|null>(null)
  const [appTab,setAppTab]       = useState<'pending'|'all'>('pending')
  const [replyText,setReplyText] = useState('')
  const [replySending,setReplySending] = useState(false)
  const [docsModal,setDocsModal] = useState<Application|null>(null)
  const [selectedDocs,setSelectedDocs] = useState<string[]>([])
  const [docsSending,setDocsSending] = useState(false)
  const [approving,setApproving] = useState<number|null>(null)
  const [toast,setToast]         = useState<{text:string;error?:boolean}|null>(null)

  // Sync
  const [syncStatus,setSyncStatus]         = useState<any>(null)
  const [syncLoading,setSyncLoading]       = useState(false)
  const [catalogData,setCatalogData]       = useState<any>(null)
  const [inventoryData,setInventoryData]   = useState<any>(null)
  const [syncSearch,setSyncSearch]         = useState('')
  const [syncSearching,setSyncSearching]   = useState(false)
  const [syncTab,setSyncTab]               = useState<'overview'|'catalog'|'inventory'>('overview')

  // Quotes
  const [quotes,setQuotes]             = useState<any[]>([])
  const [quotesLoading,setQuotesLoading] = useState(false)
  const [qModal,setQModal]             = useState<any>(null)
  const [declineReason,setDeclineReason] = useState('')
  const [quoteUpdating,setQuoteUpdating] = useState(false)

  // Customers
  const [customers,setCustomers]       = useState<any[]>([])
  const [custLoading,setCustLoading]   = useState(false)
  const [custModal,setCustModal]       = useState<any>(null)
  const [custSearch,setCustSearch]     = useState('')
  const [custToggling,setCustToggling] = useState<number|null>(null)

  // Employees
  const [employees,setEmployees] = useState(MOCK_EMPLOYEES)
  const [empModal,setEmpModal]   = useState(false)
  const [empForm,setEmpForm]     = useState({first:'',last:'',email:'',role:'warehouse'})

  // Families
  const [familiesData,setFamiliesData]       = useState<any>(null)
  const [familiesLoading,setFamiliesLoading] = useState(false)
  const [famCat,setFamCat]                   = useState('all')
  const [famOpen,setFamOpen]                 = useState<string[]>([])
  const [famSkus,setFamSkus]                 = useState<Record<string,any>>({})
  const [famSkuLoading,setFamSkuLoading]     = useState<string|null>(null)
  const [famSearch,setFamSearch]             = useState('')
  const [photoModal,setPhotoModal]           = useState<any>(null)
  const [photoUrl,setPhotoUrl]               = useState('')
  const [createFamModal,setCreateFamModal]   = useState(false)
  const [createFamForm,setCreateFamForm]     = useState({modelCode:'',name:'',brand:'Apple',category:'Phones',visible:true})
  const [createFamSaving,setCreateFamSaving] = useState(false)

  // Pricing
  const [pricingData,setPricingData]     = useState<any>(null)
  const [pricingLoading,setPricingLoading] = useState(false)
  const [pricingGrid,setPricingGrid]     = useState<Record<string,Record<string,number>>>({})
  const [pricingDirty,setPricingDirty]   = useState(false)
  const [pricingSaving,setPricingSaving] = useState(false)

  const showToast = (text: string, error=false) => { setToast({text,error}); setTimeout(()=>setToast(null),3000) }

  const pendingApps    = apps.filter(a=>a.status==='pending')
  const unreadMsgs     = msgs.filter(m=>!m.read)
  const pendingQuotes  = quotes.filter(q=>q.status==='pending')
  const filteredApps   = appTab==='pending' ? pendingApps : apps
  const filteredCustomers = customers.filter(c=>!custSearch||(c.company_name||'').toLowerCase().includes(custSearch.toLowerCase())||(c.email||'').toLowerCase().includes(custSearch.toLowerCase()))

  // ── Auth ──
  const handleLogin = async () => {
    setPwLoading(true); setPwError('')
    try {
      const r = await fetch('/api/admin-auth',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:pw})})
      if(r.ok){setAuthed(true);sessionStorage.setItem('aw-admin','1')}
      else setPwError('Invalid password')
    } catch { setPwError('Connection error') } finally { setPwLoading(false) }
  }
  useEffect(()=>{if(sessionStorage.getItem('aw-admin')==='1')setAuthed(true)},[])

  // ── Apps / Msgs ──
  const fetchApps = async () => { try{const r=await fetch('/api/admin-applications');if(r.ok)setApps(await r.json())}catch{} }
  const fetchMsgs = async () => { try{const r=await fetch('/api/admin-messages');if(r.ok)setMsgs(await r.json())}catch{} }
  useEffect(()=>{if(!authed)return;setLoading(true);Promise.all([fetchApps(),fetchMsgs()]).finally(()=>setLoading(false))},[authed])

  const updateAppStatus = async (id:number,status:string) => {
    try{await fetch('/api/admin-applications',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})});setApps(p=>p.map(a=>a.id===id?{...a,status}:a));setDetail(null)}catch{}
  }
  const markRead = async (msg:Message) => {
    setMsgDetail(msg)
    if(!msg.read){
      try{await fetch('/api/admin-messages',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:msg.id,read:true})});setMsgs(p=>p.map(m=>m.id===msg.id?{...m,read:true}:m))}catch{}
    }
  }
  const sendReply = async () => {
    if(!msgDetail||!replyText.trim())return
    setReplySending(true)
    try{
      const r=await fetch('/api/send-email',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({to:msgDetail.email,subject:'Re: '+msgDetail.subject,message:replyText,replyToMsgId:msgDetail.id})})
      if(r.ok){showToast('Reply sent');setMsgDetail(null);setReplyText('')}else showToast('Failed to send',true)
    }catch{showToast('Failed to send',true)}finally{setReplySending(false)}
  }
  const requestDocs = async () => {
    if(!docsModal||!selectedDocs.length)return
    setDocsSending(true)
    try{
      const r=await fetch('/api/request-docs',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({applicationId:docsModal.id,email:docsModal.email,companyName:docsModal.company_name,firstName:docsModal.first_name,documents:selectedDocs})})
      if(r.ok){showToast('Document request sent');setApps(p=>p.map(a=>a.id===docsModal.id?{...a,status:'docs_requested'}:a));setDocsModal(null);setSelectedDocs([]);setDetail(null)}else showToast('Failed',true)
    }catch{showToast('Failed',true)}finally{setDocsSending(false)}
  }
  const approveApp = async (app:Application) => {
    setApproving(app.id)
    try{
      const r=await fetch('/api/approve-application',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({applicationId:app.id})})
      if(r.ok){showToast(app.company_name+' approved');setApps(p=>p.map(a=>a.id===app.id?{...a,status:'approved'}:a));setDetail(null)}
      else{const d=await r.json();showToast(d.error||'Approval failed',true)}
    }catch{showToast('Approval failed',true)}finally{setApproving(null)}
  }

  // ── Sync ──
  const testSCAuth = async () => { setSyncLoading(true);try{const r=await fetch('/api/sc/auth');setSyncStatus(await r.json())}catch(e){setSyncStatus({error:String(e)})}finally{setSyncLoading(false)} }
  const fetchSCCatalog = async (kw?:string) => { setSyncSearching(true);try{const r=await fetch(kw?'/api/sc/catalog?size=20&active=false&keyword='+encodeURIComponent(kw):'/api/sc/catalog?size=20&active=false');setCatalogData(await r.json())}catch(e){setCatalogData({error:String(e)})}finally{setSyncSearching(false)} }
  const fetchSCInventory = async (kw?:string) => { setSyncSearching(true);try{const r=await fetch(kw?'/api/sc/inventory?size=20&inStockOnly=true&keyword='+encodeURIComponent(kw):'/api/sc/inventory?size=20&inStockOnly=true');setInventoryData(await r.json())}catch(e){setInventoryData({error:String(e)})}finally{setSyncSearching(false)} }
  useEffect(()=>{if(page==='sync'&&!syncStatus)testSCAuth()},[page])

  // ── Quotes ──
  const fetchQuotes = useCallback(async () => {
    setQuotesLoading(true)
    try{const r=await fetch('/api/submit-quote');const d=await r.json();setQuotes(d.quotes||[])}
    catch{showToast('Failed to load quotes',true)}
    finally{setQuotesLoading(false)}
  },[])
  useEffect(()=>{if(authed&&page==='quotes')fetchQuotes()},[authed,page])

  const updateQuote = async (id:number,status:string,reason?:string) => {
    setQuoteUpdating(true)
    try{
      const r=await fetch('/api/submit-quote',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status,declineReason:reason||null})})
      if(r.ok){setQuotes(p=>p.map(q=>q.id===id?{...q,status,decline_reason:reason||null}:q));setQModal(null);setDeclineReason('');showToast('Quote updated — dealer notified')}
      else{const d=await r.json();showToast(d.error||'Update failed',true)}
    }catch{showToast('Update failed',true)}finally{setQuoteUpdating(false)}
  }

  const exportQuotes = () => {
    const rows=[['Ref','Company','Contact','Email','Units','Value','Status','Submitted']]
    quotes.forEach(q=>rows.push([q.ref_number,q.company_name,q.dealer_name,q.dealer_email,q.total_units,q.total_value,q.status,fmtDate(q.created_at)]))
    const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n')
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='AW_Quotes_'+new Date().toISOString().slice(0,10)+'.csv';a.click()
    showToast('Exported')
  }

  // ── Customers ──
  const fetchCustomers = useCallback(async () => {
    setCustLoading(true)
    try{const r=await fetch('/api/admin-users');if(r.ok)setCustomers(await r.json())}
    catch{showToast('Failed to load customers',true)}
    finally{setCustLoading(false)}
  },[])
  useEffect(()=>{if(authed&&page==='customers')fetchCustomers()},[authed,page])

  const toggleCustomer = async (id:number,active:boolean) => {
    setCustToggling(id)
    try{
      const r=await fetch('/api/admin-toggle-user',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,active})})
      if(r.ok){setCustomers(p=>p.map(c=>c.id===id?{...c,active}:c));if(custModal?.id===id)setCustModal((p:any)=>p?{...p,active}:p);showToast(active?'Account enabled':'Account disabled')}
      else showToast('Update failed',true)
    }catch{showToast('Update failed',true)}finally{setCustToggling(null)}
  }

  const exportCustomers = () => {
    const rows=[['Company','Contact','Email','Type','Status','Joined']]
    customers.forEach(c=>rows.push([c.company_name,c.first_name+' '+c.last_name,c.email,c.account_type,c.active?'Active':'Inactive',fmtDate(c.created_at)]))
    const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n')
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='AW_Customers_'+new Date().toISOString().slice(0,10)+'.csv';a.click()
    showToast('Exported')
  }

  // ── Families ──
  const fetchFamilies = useCallback(async () => {
    setFamiliesLoading(true)
    try{const r=await fetch('/api/sc/admin-families');if(r.ok)setFamiliesData(await r.json())}
    catch{showToast('Failed to load families',true)}
    finally{setFamiliesLoading(false)}
  },[])
  useEffect(()=>{if(authed&&page==='families')fetchFamilies()},[authed,page])

  const toggleFamOpen = async (modelCode:string) => {
    if(famOpen.includes(modelCode)){setFamOpen(p=>p.filter(x=>x!==modelCode));return}
    setFamOpen(p=>[...p,modelCode])
    if(!famSkus[modelCode]){
      setFamSkuLoading(modelCode)
      try{
        const r=await fetch('/api/sc/admin-families?family='+encodeURIComponent(modelCode))
        if(r.ok){const d=await r.json();setFamSkus(p=>({...p,[modelCode]:d}))}
      }catch{showToast('Failed to load SKUs',true)}finally{setFamSkuLoading(null)}
    }
  }

  const toggleSkuVisible = async (sku:string,hidden:boolean,modelCode:string) => {
    try{
      const r=await fetch('/api/sc/admin-families',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'sku',sku,hidden})})
      if(r.ok){
        setFamSkus(p=>{
          const d=p[modelCode];if(!d)return p
          const upd=(arr:any[])=>arr.map((s:any)=>s.sku===sku?{...s,hidden}:s)
          return {...p,[modelCode]:{...d,skus:{...d.skus,visible:upd(d.skus.visible||[]),hidden:upd(d.skus.hidden||[])}}}
        })
        showToast(hidden?'SKU hidden':'SKU visible')
      }
    }catch{showToast('Update failed',true)}
  }

  const bulkHideFamily = async (modelCode:string,name:string) => {
    try{
      const r=await fetch('/api/sc/admin-families',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'bulk-hide',modelCode})})
      if(r.ok){
        setFamSkus(p=>{
          const d=p[modelCode];if(!d)return p
          const hidden=[...(d.skus.visible||[]).map((s:any)=>({...s,hidden:true})),...(d.skus.hidden||[])]
          return {...p,[modelCode]:{...d,skus:{...d.skus,visible:[],hidden}}}
        })
        showToast('All '+name+' SKUs hidden')
      }
    }catch{showToast('Update failed',true)}
  }

  const renameFamily = async (id:number,currentName:string) => {
    const n=prompt('Rename family:',currentName)
    if(!n||n===currentName)return
    try{
      const r=await fetch('/api/sc/admin-families',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'rename',id,name:n})})
      if(r.ok){setFamiliesData((p:any)=>p?{...p,families:p.families.map((f:any)=>f.id===id?{...f,name:n}:f)}:p);showToast('Renamed')}
    }catch{showToast('Rename failed',true)}
  }

  const createFamily = async () => {
    const { modelCode, name, brand, category, visible } = createFamForm
    if (!modelCode.trim() || !name.trim()) { showToast('Model code and name required', true); return }
    setCreateFamSaving(true)
    try {
      const r = await fetch('/api/sc/admin-families', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ modelCode: modelCode.trim().toUpperCase(), name: name.trim(), brand, category, visible })
      })
      if (r.ok) {
        showToast('Family created')
        setCreateFamModal(false)
        setCreateFamForm({ modelCode: '', name: '', brand: 'Apple', category: 'Phones', visible: true })
        fetchFamilies()
      } else {
        const d = await r.json()
        showToast(d.error || 'Create failed', true)
      }
    } catch { showToast('Create failed', true) }
    finally { setCreateFamSaving(false) }
  }

  const exportFamilies = () => {
    if(!familiesData?.families)return
    const rows=[['Family','Category','Brand','SKUs','Stock','Visible']]
    familiesData.families.forEach((f:any)=>rows.push([f.name,f.category,f.brand,f.skuCount,f.totalStock,f.visible?'Yes':'No']))
    const csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n')
    const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='AW_Families_'+new Date().toISOString().slice(0,10)+'.csv';a.click()
    showToast('Exported')
  }

  // ── Pricing ──
  const fetchPricing = useCallback(async () => {
    setPricingLoading(true)
    try{const r=await fetch('/api/sc/pricing');if(r.ok){const d=await r.json();setPricingData(d);setPricingGrid(d.grid||{})}}
    catch{showToast('Failed to load pricing',true)}
    finally{setPricingLoading(false)}
  },[])
  useEffect(()=>{if(authed&&page==='pricing')fetchPricing()},[authed,page])

  const savePricing = async () => {
    if(!pricingData)return
    setPricingSaving(true)
    let errors=0
    for(const cat of(pricingData.categories||[])){
      for(const grade of(pricingData.grades||[])){
        const val=pricingGrid[cat]?.[grade.code]
        if(val===undefined)continue
        try{
          const r=await fetch('/api/sc/pricing',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({category:cat,grade_code:grade.code,multiplier:val})})
          if(!r.ok)errors++
        }catch{errors++}
      }
    }
    setPricingSaving(false);setPricingDirty(false)
    showToast(errors?'Saved with '+errors+' errors':'Multipliers saved — catalog updates immediately',errors>0)
  }

  // ── Style helpers ──
  const card  = (extra?:any) => ({background:C.panel,border:'1px solid '+C.border,borderRadius:12,overflow:'hidden' as const,marginBottom:20,...extra})
  const th    = () => ({fontSize:10,fontWeight:700,color:isDark?'#334155':'#475569',textTransform:'uppercase' as const,letterSpacing:'.08em',padding:'10px 16px',textAlign:'left' as const,borderBottom:'1px solid '+C.border})
  const td    = (bold=false) => ({fontSize:13,color:bold?C.text:C.sub,fontWeight:bold?700:400,padding:'10px 16px',borderBottom:'1px solid '+(isDark?C.panel:'#f1f5f9')})
  const stat  = () => ({background:C.panel,border:'1px solid '+C.border,borderRadius:12,padding:'18px 20px'})
  const inp   = (extra?:any) => ({padding:'8px 12px',background:C.dark,border:'1px solid '+C.border,borderRadius:6,fontSize:13,color:C.text,fontFamily:"'DM Sans',system-ui,sans-serif",outline:'none',width:'100%',...extra})
  const btn   = (variant='ghost') => {
    const v:Record<string,any> = {
      primary:{background:C.orange,color:'#fff',border:'1px solid '+C.orange},
      green:{background:'#052e16',color:'#22c55e',border:'1px solid #166534'},
      red:{background:'#1c0606',color:'#ef4444',border:'1px solid #7f1d1d'},
      orange:{background:'#1c0e00',color:'#fb923c',border:'1px solid #7c2d12'},
      blue:{background:'#0c1a3a',color:'#60a5fa',border:'1px solid #1e3a8a'},
      ghost:{background:C.faint,color:C.sub,border:'1px solid '+C.faint},
    }
    return {...(v[variant]||v.ghost),fontSize:12,fontWeight:700,padding:'5px 12px',borderRadius:6,cursor:'pointer',fontFamily:"'DM Sans',system-ui,sans-serif"}
  }
  const modal   = () => ({background:C.panel,border:'1px solid '+C.border,borderRadius:16,width:580,maxWidth:'95vw',maxHeight:'88vh',overflowY:'auto' as const,padding:32})
  const overlay = () => ({position:'fixed' as const,inset:0,background:'rgba(0,0,0,.6)',zIndex:200,display:'flex',alignItems:'center',justifyContent:'center',padding:20})
  const mlabel  = () => ({fontSize:10,fontWeight:700,color:C.sub,textTransform:'uppercase' as const,letterSpacing:'.08em',marginBottom:4})
  const mval    = () => ({fontSize:14,color:C.text,fontWeight:600,marginBottom:16})
  const Badge = ({color,bg,label}:{color:string,bg:string,label:string}) => (
    <span style={{background:bg,color,fontSize:11,fontWeight:700,padding:'3px 8px',borderRadius:5,display:'inline-flex',alignItems:'center',gap:4,whiteSpace:'nowrap' as const}}>
      <span style={{width:5,height:5,borderRadius:'50%',background:color,display:'inline-block'}}/>
      {label}
    </span>
  )
  const PAGE_TITLES:Record<string,string> = {
    applications:'Account Applications',messages:'Contact Messages',sync:'SellerCloud Sync',
    quotes:'Quote Requests',customers:'Customer Management',employees:'User Management',
    families:'Product Families',pricing:'Grade Multipliers',
  }

  // ═══════════════════════════════════════════
  // LOGIN
  // ═══════════════════════════════════════════
  if(!authed) return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:'#0f1520',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#111827',border:'1px solid #1e2d4a',borderRadius:16,padding:40,width:380,textAlign:'center'}}>
        <div style={{fontSize:16,fontWeight:800,color:'#fff',marginBottom:4,display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
          <div style={{width:8,height:8,background:'#ea580c',borderRadius:'50%'}}/>AeroWholesale
        </div>
        <div style={{fontSize:12,color:'#475569',marginBottom:28}}>Admin Panel · Enter password to continue</div>
        {pwError&&<div style={{fontSize:12,color:'#ef4444',marginBottom:14}}>{pwError}</div>}
        <input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleLogin()} autoFocus
          style={{width:'100%',padding:'12px 14px',background:'#0a0f1a',border:'1.5px solid #1e2d4a',borderRadius:8,fontSize:14,color:'#e2e8f0',fontFamily:'inherit',outline:'none',marginBottom:14,textAlign:'center',letterSpacing:'0.1em',boxSizing:'border-box' as const}}/>
        <button onClick={handleLogin} disabled={pwLoading||!pw}
          style={{width:'100%',padding:12,background:'#ea580c',color:'#fff',fontSize:14,fontWeight:700,border:'none',borderRadius:8,cursor:pwLoading||!pw?'not-allowed':'pointer',fontFamily:'inherit',opacity:pwLoading||!pw?0.6:1}}>
          {pwLoading?'Checking...':'Enter'}
        </button>
      </div>
    </div>
  )

  const sbItem = (pg:string,icon:string,label:string,badge?:number) => (
    <div onClick={()=>setPage(pg as any)} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 20px',fontSize:13,fontWeight:500,cursor:'pointer',borderLeft:page===pg?'3px solid '+C.orange:'3px solid transparent',color:page===pg?C.text:C.dim,background:page===pg?C.panel:'transparent',transition:'all .12s'}}>
      <span>{icon}</span>{label}
      {!!badge&&<span style={{marginLeft:'auto',background:C.orange,color:'#fff',fontSize:10,fontWeight:700,padding:'1px 6px',borderRadius:10}}>{badge}</span>}
    </div>
  )

  // ═══════════════════════════════════════════
  // LAYOUT
  // ═══════════════════════════════════════════
  return (
    <div style={{display:'flex',minHeight:'100vh',background:C.bg,fontFamily:"'DM Sans',system-ui,sans-serif",color:C.text,WebkitFontSmoothing:'antialiased'}}>

      {/* SIDEBAR */}
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

      {/* MAIN */}
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
          {loading&&(page==='applications'||page==='messages')&&<div style={{textAlign:'center',padding:40,color:C.dim}}>Loading...</div>}

          {/* ══ APPLICATIONS ══ */}
          {page==='applications'&&!loading&&<>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
              {([['Pending Review',pendingApps.length,'#eab308'],['Total',apps.length,''],['Approved',apps.filter(a=>a.status==='approved').length,'#22c55e'],['Docs Requested',apps.filter(a=>a.status==='docs_requested').length,'#fb923c']] as [string,number,string][]).map(([l,v,vc])=>(
                <div key={l} style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div><div style={{fontSize:26,fontWeight:800,color:vc||C.text,lineHeight:1}}>{v}</div></div>
              ))}
            </div>
            <div style={{display:'flex',gap:4,marginBottom:20}}>
              {([['pending','Pending ('+pendingApps.length+')'],['all','All ('+apps.length+')']] as [string,string][]).map(([k,l])=>(
                <div key={k} onClick={()=>setAppTab(k as any)} style={{fontSize:12,fontWeight:600,padding:'6px 14px',borderRadius:6,cursor:'pointer',color:appTab===k?C.text:C.dim,background:appTab===k?C.faint:'transparent'}}>{l}</div>
              ))}
            </div>
            {filteredApps.length===0?(
              <div style={{textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:48,marginBottom:12}}>📭</div><div style={{fontSize:14,fontWeight:600}}>No applications</div></div>
            ):(
              <div style={card()}>
                <div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{fontSize:14,fontWeight:700,color:C.text}}>{appTab==='pending'?'Pending Applications':'All Applications'}</div>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['Company','Contact','Type','Volume','Applied','Status','Actions'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                  <tbody>
                    {filteredApps.map(app=>{
                      const sb=statusBadge(app.status);const tb=typeBadge(app.account_type)
                      return(
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
                              {app.status==='pending'&&<>
                                <button style={btn('green')} onClick={()=>approveApp(app)}>{approving===app.id?'...':'Approve'}</button>
                                <button style={btn('orange')} onClick={()=>{setDocsModal(app);setSelectedDocs([])}}>Req Docs</button>
                                <button style={btn('red')} onClick={()=>updateAppStatus(app.id,'rejected')}>Reject</button>
                              </>}
                              {app.status==='docs_received'&&<button style={{...btn('primary'),background:'#6d28d9',borderColor:'#6d28d9'}} onClick={()=>{setDocsModal(app);setSelectedDocs([])}}>📄 Docs</button>}
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
          {page==='messages'&&!loading&&<>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14,marginBottom:24}}>
              {([['Unread',unreadMsgs.length,'#eab308'],['Total',msgs.length,''],['Today',msgs.filter(m=>new Date(m.created_at).toDateString()===new Date().toDateString()).length,'']] as [string,number,string][]).map(([l,v,vc])=>(
                <div key={l} style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div><div style={{fontSize:26,fontWeight:800,color:vc||C.text,lineHeight:1}}>{v}</div></div>
              ))}
            </div>
            {msgs.length===0?<div style={{textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:48,marginBottom:12}}>📭</div><div>No messages yet</div></div>
            :msgs.map(msg=>(
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
          {page==='quotes'&&<>
            {quotesLoading?<div style={{textAlign:'center',padding:40,color:C.dim}}>Loading quotes...</div>:<>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
                {([['Pending',pendingQuotes.length,'#eab308'],['Total',quotes.length,''],['Confirmed',quotes.filter(q=>q.status==='confirmed').length,'#22c55e'],['Pipeline $','$'+pendingQuotes.reduce((s,q)=>s+Number(q.total_value||0),0).toLocaleString(),'#60a5fa']] as [string,string|number,string][]).map(([l,v,vc])=>(
                  <div key={l} style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div><div style={{fontSize:26,fontWeight:800,color:vc||C.text,lineHeight:1}}>{v}</div></div>
                ))}
              </div>
              <div style={card()}>
                <div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <div style={{fontSize:14,fontWeight:700,color:C.text}}>All Quote Requests</div>
                  <button style={btn('blue')} onClick={exportQuotes}>⬇ Export CSV</button>
                </div>
                {quotes.length===0?<div style={{textAlign:'center',padding:40,color:C.dim}}>No quotes yet</div>:(
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>{['Ref','Company','Contact','Units','Est Value','Status','Submitted','Actions'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                    <tbody>
                      {quotes.map(q=>{const sb=statusBadge(q.status);return(
                        <tr key={q.id}>
                          <td style={td(true)}>{q.ref_number}</td>
                          <td style={td(true)}>{q.company_name}</td>
                          <td style={td()}><div>{q.dealer_name}</div><div style={{fontSize:11,color:C.dim}}>{q.dealer_email}</div></td>
                          <td style={td()}>{q.total_units}</td>
                          <td style={td()}>{Number(q.total_value)>0?'$'+Number(q.total_value).toLocaleString():'TBD'}</td>
                          <td style={td()}><Badge color={sb.color} bg={sb.bg} label={q.status}/></td>
                          <td style={td()}>{fmtDate(q.created_at)}</td>
                          <td style={td()}>
                            <div style={{display:'flex',gap:5}}>
                              <button style={btn('blue')} onClick={()=>setQModal(q)}>View</button>
                              {q.status==='pending'&&<>
                                <button style={btn('green')} onClick={()=>updateQuote(q.id,'confirmed')}>Confirm</button>
                                <button style={btn('red')} onClick={()=>{setQModal(q)}}>Decline</button>
                              </>}
                            </div>
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                )}
              </div>
            </>}
          </>}

          {/* ══ SYNC ══ */}
          {page==='sync'&&<>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
              <div style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>Connection</div><div style={{fontSize:16,fontWeight:800,color:syncLoading?C.sub:syncStatus?.success?'#22c55e':'#ef4444',lineHeight:1}}>{syncLoading?'...':syncStatus?.success?'Connected':'Error'}</div></div>
              <div style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>API</div><div style={{fontSize:12,fontWeight:700,color:C.sub}}>bi.api.sellercloud.com</div></div>
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
              <input style={inp({flex:1})} placeholder="Search products..." value={syncSearch} onChange={e=>setSyncSearch(e.target.value)} onKeyDown={e=>e.key==='Enter'&&syncSearch.trim()&&(fetchSCCatalog(syncSearch),fetchSCInventory(syncSearch))}/>
              <button style={btn('primary')} onClick={()=>{fetchSCCatalog(syncSearch);fetchSCInventory(syncSearch)}} disabled={syncSearching||!syncSearch.trim()}>Search</button>
            </div>
            <div style={{display:'flex',gap:4,marginBottom:20}}>
              {([['overview','Overview'],['catalog','Catalog'+(catalogData?.total?' ('+catalogData.total+')':'')],['inventory','Inventory'+(inventoryData?.total?' ('+inventoryData.total+')'  :'')]] as [string,string][]).map(([k,l])=>(
                <div key={k} onClick={()=>setSyncTab(k as any)} style={{fontSize:12,fontWeight:600,padding:'6px 14px',borderRadius:6,cursor:'pointer',color:syncTab===k?C.text:C.dim,background:syncTab===k?C.faint:'transparent'}}>{l}</div>
              ))}
            </div>
            {syncTab==='overview'&&<div style={card()}>
              <div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border}}><div style={{fontSize:14,fontWeight:700,color:C.text}}>Integration Status</div></div>
              <table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr>{['Feature','Status','Details'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                <tbody>
                  {([
                    ['API Authentication',syncStatus?.success?'Active':'Not Connected',syncStatus?.success?'Token active':syncStatus?.error||'Click Test Connection',syncStatus?.success?'#22c55e':'#ef4444',syncStatus?.success?'#052e16':'#1c0606'],
                    ['Catalog Sync',catalogData?.total>0?'Loaded':'Not Loaded',catalogData?.total?catalogData.total.toLocaleString()+' products':'Click Load Catalog',catalogData?.total>0?'#22c55e':'#eab308',catalogData?.total>0?'#052e16':'#1c1400'],
                    ['Inventory Sync',inventoryData?.total>0?'Loaded':'Not Loaded',inventoryData?.total?inventoryData.total.toLocaleString()+' in-stock SKUs':'Click Load Inventory',inventoryData?.total>0?'#22c55e':'#eab308',inventoryData?.total>0?'#052e16':'#1c1400'],
                    ['Website Catalog','Live','Powered by product_families + grade_config','#22c55e','#052e16'],
                    ['Auto-Sync','Active','Hourly cron sync running','#22c55e','#052e16'],
                  ] as [string,string,string,string,string][]).map(([f,s,d,sc,sbg])=>(
                    <tr key={f}><td style={td(true)}>{f}</td><td style={td()}><Badge color={sc} bg={sbg} label={s}/></td><td style={td()}>{d}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>}
            {syncTab==='catalog'&&catalogData?.items&&<div style={card()}><div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border}}><div style={{fontSize:14,fontWeight:700,color:C.text}}>Catalog ({catalogData.total?.toLocaleString()})</div></div><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr>{['SKU','Product','Qty','Avg Cost','Sold 30d','Sold 90d'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead><tbody>{catalogData.items.map((item:any,i:number)=><tr key={i}><td style={td()}><span style={{fontSize:11,fontFamily:'monospace',fontWeight:700,color:C.text}}>{item.sku}</span></td><td style={td(true)}>{item.name}</td><td style={{...td(),color:item.physicalQty>0?'#22c55e':'#ef4444',fontWeight:700}}>{item.physicalQty}</td><td style={td()}>{item.avgCost>0?'$'+item.avgCost.toFixed(2):'—'}</td><td style={td()}>{item.sold30||'—'}</td><td style={td()}>{item.sold90||'—'}</td></tr>)}</tbody></table></div>}
            {syncTab==='catalog'&&!catalogData?.items&&<div style={{textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:48,marginBottom:12}}>📦</div><div>Click "Load Catalog" to see products</div></div>}
            {syncTab==='inventory'&&inventoryData?.items&&<div style={card()}><div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border}}><div style={{fontSize:14,fontWeight:700,color:C.text}}>Inventory ({inventoryData.total?.toLocaleString()})</div></div><table style={{width:'100%',borderCollapse:'collapse'}}><thead><tr>{['SKU','Product','Physical','Available','Avg Cost','Warehouse'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead><tbody>{inventoryData.items.map((item:any,i:number)=><tr key={i}><td style={td()}><span style={{fontSize:11,fontFamily:'monospace',fontWeight:700,color:C.text}}>{item.sku}</span></td><td style={td(true)}>{item.name}</td><td style={{...td(),color:'#22c55e',fontWeight:700}}>{item.physicalQty}</td><td style={td()}>{item.availableQty}</td><td style={td()}>{item.avgCost>0?'$'+item.avgCost.toFixed(2):'—'}</td><td style={{...td(),fontSize:11}}>{item.warehouseName||'—'}</td></tr>)}</tbody></table></div>}
            {syncTab==='inventory'&&!inventoryData?.items&&<div style={{textAlign:'center',padding:60,color:C.dim}}><div style={{fontSize:48,marginBottom:12}}>📊</div><div>Click "Load Inventory" to see stock</div></div>}
          </>}

          {/* ══ CUSTOMERS ══ */}
          {page==='customers'&&<>
            {custLoading?<div style={{textAlign:'center',padding:40,color:C.dim}}>Loading customers...</div>:<>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
                {([['Total Accounts',customers.length,''],['Active',customers.filter(c=>c.active).length,'#22c55e'],['Inactive',customers.filter(c=>!c.active).length,'#ef4444'],['Enterprise',customers.filter(c=>c.account_type==='enterprise').length,'#60a5fa']] as [string,number,string][]).map(([l,v,vc])=>(
                  <div key={l} style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div><div style={{fontSize:26,fontWeight:800,color:vc||C.text,lineHeight:1}}>{v}</div></div>
                ))}
              </div>
              <div style={card()}>
                <div style={{padding:'14px 20px',borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',gap:12}}>
                  <div style={{fontSize:14,fontWeight:700,color:C.text,flex:1}}>Customer Accounts</div>
                  <input style={inp({width:220})} placeholder="Search company or email..." value={custSearch} onChange={e=>setCustSearch(e.target.value)}/>
                  <button style={btn('blue')} onClick={exportCustomers}>⬇ Export CSV</button>
                </div>
                {filteredCustomers.length===0?<div style={{textAlign:'center',padding:40,color:C.dim}}>No customers found</div>:(
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead><tr>{['Company','Contact','Email','Type','Joined','Status','Actions'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                    <tbody>
                      {filteredCustomers.map(c=>{const tb=typeBadge(c.account_type);return(
                        <tr key={c.id}>
                          <td style={td(true)}>{c.company_name}</td>
                          <td style={td()}>{c.first_name} {c.last_name}</td>
                          <td style={td()}>{c.email}</td>
                          <td style={td()}><Badge color={tb.color} bg={tb.bg} label={c.account_type||'—'}/></td>
                          <td style={td()}>{fmtDate(c.created_at)}</td>
                          <td style={td()}><Badge color={c.active?'#22c55e':'#ef4444'} bg={c.active?'#052e16':'#1c0606'} label={c.active?'Active':'Inactive'}/></td>
                          <td style={td()}>
                            <div style={{display:'flex',gap:5}}>
                              <button style={btn('blue')} onClick={()=>setCustModal(c)}>Manage</button>
                              <button style={c.active?btn('red'):btn('green')} disabled={custToggling===c.id} onClick={()=>toggleCustomer(c.id,!c.active)}>
                                {custToggling===c.id?'...':(c.active?'Disable':'Enable')}
                              </button>
                            </div>
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                )}
              </div>
            </>}
          </>}

          {/* ══ EMPLOYEES ══ */}
          {page==='employees'&&<>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:24}}>
              {([['Team Members',employees.length,''],['Active',employees.filter(e=>e.active).length,'#22c55e'],['Admins',employees.filter(e=>e.role==='admin').length,'#fb923c'],['Last Login','Today','#60a5fa']] as [string,string|number,string][]).map(([l,v,vc])=>(
                <div key={l} style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div><div style={{fontSize:26,fontWeight:800,color:vc||C.text,lineHeight:1}}>{v}</div></div>
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
                    const rb:Record<string,{color:string,bg:string}> = {admin:{color:'#fb923c',bg:'#1c0e00'},manager:{color:'#60a5fa',bg:'#0c1a3a'},warehouse:{color:'#eab308',bg:'#1c1400'},readonly:{color:'#64748b',bg:'#1e2d4a'}}
                    const r=rb[e.role]||rb.readonly
                    return(
                      <tr key={e.id}>
                        <td style={td(true)}>{e.first} {e.last}</td>
                        <td style={td()}>{e.email}</td>
                        <td style={td()}><Badge color={r.color} bg={r.bg} label={ROLE_LABELS[e.role]||e.role}/></td>
                        <td style={td()}>{e.lastLogin?timeAgo(new Date(e.lastLogin).toISOString()):'Never'}</td>
                        <td style={td()}><Badge color={e.active?'#22c55e':'#64748b'} bg={e.active?'#052e16':'#1e2d4a'} label={e.active?'Active':'Inactive'}/></td>
                        <td style={td()}><button style={btn('ghost')} onClick={()=>showToast('Password reset email sent')}>Reset PW</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>}

          {/* ══ FAMILIES ══ */}
          {page==='families'&&<>
            {familiesLoading?<div style={{textAlign:'center',padding:40,color:C.dim}}>Loading families...</div>:familiesData&&<>
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14,marginBottom:20}}>
                {([['Mapped Families',familiesData.totals.totalFamilies,''],['Total SKUs',familiesData.totals.totalSkus,''],['In Stock',familiesData.totals.totalStock,'#22c55e'],['Unmapped',(familiesData.unmapped||[]).length,'#eab308']] as [string,number,string][]).map(([l,v,vc])=>(
                  <div key={l} style={stat()}><div style={{fontSize:11,fontWeight:600,color:C.sub,textTransform:'uppercase',letterSpacing:'.08em',marginBottom:8}}>{l}</div><div style={{fontSize:26,fontWeight:800,color:vc||C.text,lineHeight:1}}>{v}</div></div>
                ))}
              </div>
              <div style={{display:'flex',gap:10,marginBottom:20,alignItems:'center',flexWrap:'wrap' as const}}>
                <input style={inp({maxWidth:280})} placeholder="Search families or model codes..." value={famSearch} onChange={e=>setFamSearch(e.target.value)}/>
                {famSearch&&<button style={btn('ghost')} onClick={()=>setFamSearch('')}>✕ Clear</button>}
                <div style={{display:'flex',gap:4,marginLeft:'auto',flexWrap:'wrap' as const}}>
                  {(['all',...(familiesData.filters?.categories||[])]).map((cat:string)=>(
                    <div key={cat} onClick={()=>setFamCat(cat)} style={{fontSize:12,fontWeight:600,padding:'5px 12px',borderRadius:6,cursor:'pointer',color:famCat===cat?C.text:C.dim,background:famCat===cat?C.faint:'transparent'}}>{cat==='all'?'All':cat}</div>
                  ))}
                </div>
                <button style={btn('primary')} onClick={()=>setCreateFamModal(true)}>+ Create Family</button>
                <button style={btn('blue')} onClick={exportFamilies}>⬇ Export CSV</button>
                <button style={btn('ghost')} onClick={fetchFamilies}>↻ Refresh</button>
              </div>

              {familiesData.families
                .filter((f:any)=>{
                  if(famCat!=='all'&&f.category!==famCat)return false
                  if(famSearch){const q=famSearch.toLowerCase();return f.name.toLowerCase().includes(q)||f.modelCode.toLowerCase().includes(q)}
                  return true
                })
                .map((fam:any)=>{
                  const isOpen=famOpen.includes(fam.modelCode)
                  const skuData=famSkus[fam.modelCode]
                  const allSkus=skuData?[...(skuData.skus?.visible||[]),...(skuData.skus?.hidden||[]),...(skuData.skus?.intake||[])]:[]
                  return(
                    <div key={fam.id} style={{...card(),border:'1px solid '+(fam.totalStock===0?'#7f1d1d':C.border)}}>
                      <div style={{padding:'14px 20px',borderBottom:isOpen?'1px solid '+C.border:'none',display:'flex',alignItems:'center',gap:12,cursor:'pointer'}} onClick={()=>toggleFamOpen(fam.modelCode)}>
                        {fam.imageUrl&&<img src={fam.imageUrl} style={{width:36,height:36,objectFit:'contain',borderRadius:6,background:C.dark,flexShrink:0}} alt=""/>}
                        <div style={{flex:1}}>
                          <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap' as const}}>
                            <span style={{fontSize:14,fontWeight:700,color:C.text}}>{fam.name}</span>
                            {fam.totalStock===0&&<span style={{background:'#7f1d1d',color:'#ef4444',fontSize:10,fontWeight:700,padding:'2px 6px',borderRadius:4}}>NO STOCK</span>}
                            <span style={{fontSize:11,color:C.dim,fontFamily:'monospace'}}>{fam.modelCode}</span>
                          </div>
                          <div style={{fontSize:11,color:C.dim,marginTop:2}}>{fam.category} · {fam.brand} · {fam.skuCount} SKUs · {fam.visibleCount} live · {fam.totalStock} units</div>
                        </div>
                        <div style={{display:'flex',gap:5}} onClick={e=>e.stopPropagation()}>
                          <button style={btn('ghost')} onClick={()=>renameFamily(fam.id,fam.name)}>Rename</button>
                          <button style={btn('red')} onClick={()=>bulkHideFamily(fam.modelCode,fam.name)}>Hide All</button>
                          <button style={btn('blue')} onClick={()=>{setPhotoModal({famId:fam.id,modelCode:fam.modelCode});setPhotoUrl(fam.imageUrl||'')}}>📷 Photo</button>
                        </div>
                        <span style={{color:C.dim,fontSize:16,marginLeft:8}}>{isOpen?'▲':'▼'}</span>
                      </div>
                      {isOpen&&(
                        famSkuLoading===fam.modelCode
                          ?<div style={{padding:24,textAlign:'center',color:C.dim}}>Loading SKUs...</div>
                          :allSkus.length===0
                            ?<div style={{padding:24,textAlign:'center',color:C.dim}}>No SKUs found</div>
                            :<table style={{width:'100%',borderCollapse:'collapse'}}>
                              <thead><tr>{['SKU','Grade','Storage','Carrier','Color','Qty','Cost','Price','Visible'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                              <tbody>
                                {allSkus.map((s:any)=>{const gb=gradeBadge(s.grade);return(
                                  <tr key={s.sku} style={{opacity:s.hidden?0.45:1}}>
                                    <td style={{...td(),fontFamily:'monospace',fontSize:11,color:C.text}}>{s.sku}</td>
                                    <td style={td()}><Badge color={gb.color} bg={gb.bg} label={s.gradeLabel||s.grade}/></td>
                                    <td style={td()}>{s.storage||'—'}</td>
                                    <td style={td()}>{s.carrier||'—'}</td>
                                    <td style={td()}>{s.color||'—'}</td>
                                    <td style={{...td(),color:s.quantity>0?'#22c55e':'#ef4444',fontWeight:700}}>{s.quantity}</td>
                                    <td style={td()}>{s.cost>0?'$'+s.cost.toFixed(2):'—'}</td>
                                    <td style={{...td(),color:'#22c55e',fontWeight:700}}>{s.calculatedPrice?'$'+s.calculatedPrice:'—'}</td>
                                    <td style={td()}>
                                      {s.isIntake
                                        ?<Badge color='#64748b' bg='#1e2d4a' label='Intake'/>
                                        :<div onClick={()=>toggleSkuVisible(s.sku,!s.hidden,fam.modelCode)} style={{width:36,height:20,borderRadius:10,background:s.hidden?'#334155':'#166534',position:'relative',cursor:'pointer',flexShrink:0}}>
                                          <div style={{width:14,height:14,borderRadius:'50%',background:s.hidden?'#64748b':'#22c55e',position:'absolute',top:3,left:s.hidden?3:19,transition:'left .15s'}}/>
                                        </div>
                                      }
                                    </td>
                                  </tr>
                                )})}
                              </tbody>
                            </table>
                      )}
                    </div>
                  )
                })}

              {(familiesData.unmapped||[]).length>0&&<div style={{...card(),border:'1px solid #854d0e'}}>
                <div style={{padding:'14px 20px',borderBottom:'1px solid #854d0e',display:'flex',alignItems:'center',gap:8}}>
                  <span style={{fontSize:14,fontWeight:700,color:'#fbbf24'}}>⚠ Unmapped SKUs</span>
                  <span style={{background:'#1c1400',color:'#eab308',fontSize:11,fontWeight:700,padding:'2px 8px',borderRadius:10}}>{familiesData.unmapped.length}</span>
                </div>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead><tr>{['SKU','Model','Brand','Grade','Qty','Reason'].map(h=><th key={h} style={th()}>{h}</th>)}</tr></thead>
                  <tbody>
                    {familiesData.unmapped.map((u:any,i:number)=>(
                      <tr key={i}>
                        <td style={{...td(),fontFamily:'monospace',fontSize:11,color:C.text}}>{u.sku}</td>
                        <td style={td()}>{u.model||'—'}</td>
                        <td style={td()}>{u.brand||'—'}</td>
                        <td style={td()}>{u.grade||'—'}</td>
                        <td style={{...td(),color:'#22c55e',fontWeight:700}}>{u.quantity}</td>
                        <td style={td()}><span style={{background:'#1c1400',color:'#eab308',fontSize:10,fontWeight:700,padding:'2px 8px',borderRadius:4}}>{u.reason}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>}
            </>}
          </>}

          {/* ══ PRICING ══ */}
          {page==='pricing'&&<>
            {pricingLoading?<div style={{textAlign:'center',padding:40,color:C.dim}}>Loading pricing grid...</div>:pricingData&&<>
              <div style={{marginBottom:20,padding:'14px 20px',background:C.panel,border:'1px solid '+C.border,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap' as const,gap:12}}>
                <div style={{fontSize:13,color:C.sub}}>Site price = Cost × multiplier, rounded <strong style={{color:C.text}}>up</strong> to next dollar. Edit any cell then save — catalog updates immediately.</div>
                <div style={{display:'flex',gap:8}}>
                  {pricingDirty&&<span style={{fontSize:11,color:'#eab308',alignSelf:'center'}}>● Unsaved changes</span>}
                  <button style={btn('ghost')} onClick={()=>{fetchPricing();setPricingDirty(false)}}>↺ Reset</button>
                  <button style={btn('primary')} disabled={!pricingDirty||pricingSaving} onClick={savePricing}>{pricingSaving?'Saving...':'Save Changes'}</button>
                </div>
              </div>
              {(pricingData.categories||[]).map((cat:string)=>{
                const grades=(pricingData.grades||[]).filter((g:any)=>PRICING_GRADE_ORDER.includes(g.code)).sort((a:any,b:any)=>PRICING_GRADE_ORDER.indexOf(a.code)-PRICING_GRADE_ORDER.indexOf(b.code))
                return(
                  <div key={cat} style={{...card(),marginBottom:16}}>
                    <div style={{padding:'12px 20px',borderBottom:'1px solid '+C.border,display:'flex',alignItems:'center',gap:8}}>
                      <div style={{fontSize:14,fontWeight:700,color:C.text}}>{cat}</div>
                      <div style={{fontSize:11,color:C.dim}}>— set multiplier per grade</div>
                    </div>
                    <div style={{overflowX:'auto',padding:'8px 0'}}>
                      <table style={{width:'100%',borderCollapse:'collapse'}}>
                        <thead>
                          <tr>
                            {grades.map((g:any)=>{const gb=gradeBadge(g.code);return(
                              <th key={g.code} style={{...th(),textAlign:'center',paddingBottom:12}}>
                                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                                  <Badge color={gb.color} bg={gb.bg} label={g.code}/>
                                  <span style={{fontSize:10,color:C.dim,fontWeight:400}}>{g.label}</span>
                                </div>
                              </th>
                            )})}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {grades.map((g:any)=>(
                              <td key={g.code} style={{...td(),textAlign:'center',padding:'8px 12px'}}>
                                <input type="number" step="0.01" min="0.5" max="5"
                                  value={pricingGrid[cat]?.[g.code]??''}
                                  onChange={e=>{
                                    const v=parseFloat(e.target.value)
                                    if(isNaN(v))return
                                    setPricingGrid(p=>({...p,[cat]:{...(p[cat]||{}),[g.code]:v}}))
                                    setPricingDirty(true)
                                  }}
                                  style={{width:68,textAlign:'center',padding:'7px 4px',background:C.dark,border:'1px solid '+(pricingDirty&&pricingGrid[cat]?.[g.code]!==pricingData.grid?.[cat]?.[g.code]?C.orange:C.border),borderRadius:6,fontSize:13,color:C.text,fontFamily:'inherit',outline:'none'}}/>
                                {pricingGrid[cat]?.[g.code]&&<div style={{fontSize:10,color:C.dim,marginTop:3}}>×{pricingGrid[cat][g.code]}</div>}
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </>}
          </>}

        </div>
      </div>

      {/* ══ MODALS ══ */}

      {detail&&<div style={overlay()} onClick={()=>setDetail(null)}>
        <div style={modal()} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>{detail.company_name}</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:24}}>Applied {timeAgo(detail.created_at)} · <Badge color={statusBadge(detail.status).color} bg={statusBadge(detail.status).bg} label={detail.status.replace(/_/g,' ')}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',marginBottom:24}}>
            {([['Contact',detail.first_name+' '+detail.last_name],['Email',detail.email],['Phone',detail.phone||'—'],['Job Title',detail.job_title||'—'],['EIN',detail.ein||'—'],['Website',detail.website||'—'],['Location',(detail.city?detail.city+', ':'')+detail.state],['Years in Business',detail.years_in_business||'—'],['Account Type',detail.account_type],['Monthly Volume',detail.monthly_volume||'—'],['Product Categories',detail.product_categories||'—'],['Sales Channel',detail.sales_channel||'—'],['How They Found Us',detail.heard_about||'—']] as [string,string][]).map(([l,v])=>(
              <div key={l} style={{marginBottom:16}}><div style={mlabel()}>{l}</div><div style={mval()}>{v}</div></div>
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
          <textarea value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Type your reply..." style={{...inp(),minHeight:100,resize:'vertical' as const,marginTop:8}}/>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border,marginTop:16}}>
            <button style={btn('primary')} disabled={replySending||!replyText.trim()} onClick={sendReply}>{replySending?'Sending...':'📧 Send Reply'}</button>
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>{setMsgDetail(null);setReplyText('')}}>Close</button>
          </div>
        </div>
      </div>}

      {docsModal&&<div style={overlay()} onClick={()=>setDocsModal(null)}>
        <div style={modal()} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>Request Documents</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>Select documents to request from {docsModal.company_name}</div>
          <div style={{marginBottom:20}}>
            {Object.entries(DOC_LABELS).map(([id,label])=>(
              <label key={id} style={{display:'flex',alignItems:'center',gap:10,padding:'10px 0',borderBottom:'1px solid '+C.border,fontSize:13,color:C.text,cursor:'pointer'}}>
                <input type="checkbox" checked={selectedDocs.includes(id)} onChange={()=>setSelectedDocs(p=>p.includes(id)?p.filter(d=>d!==id):[...p,id])} style={{width:16,height:16,accentColor:C.orange}}/>
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

      {qModal&&<div style={overlay()} onClick={()=>{setQModal(null);setDeclineReason('')}}>
        <div style={modal()} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>{qModal.ref_number}</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>{qModal.company_name} · {qModal.dealer_name} · {fmtDate(qModal.created_at)}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',marginBottom:20}}>
            {([['Contact',qModal.dealer_name],['Email',qModal.dealer_email],['Total Units',qModal.total_units],['Est Value',Number(qModal.total_value)>0?'$'+Number(qModal.total_value).toLocaleString():'TBD'],['Status',qModal.status],['Notes',qModal.notes||'—']] as [string,string|number][]).map(([l,v])=>(
              <div key={l}><div style={mlabel()}>{l}</div><div style={mval()}>{v}</div></div>
            ))}
          </div>
          {(qModal.items||[]).length>0&&<>
            <div style={mlabel()}>Line Items</div>
            <div style={{background:C.dark,border:'1px solid '+C.border,borderRadius:8,marginBottom:20,overflow:'hidden'}}>
              {qModal.items.map((item:any,i:number)=>(
                <div key={i} style={{padding:'10px 16px',borderBottom:i<qModal.items.length-1?'1px solid '+C.border:'none',fontSize:13,color:C.text}}>
                  <span style={{fontWeight:700}}>{item.qty}×</span> {item.name||item.sku} · {item.grade||''} · {item.storage||''} · {item.carrier||''}
                  {item.price>0&&<span style={{float:'right',color:C.sub}}>${item.price}/unit</span>}
                </div>
              ))}
            </div>
          </>}
          {qModal.status==='pending'&&<>
            <div style={mlabel()}>Decline Reason (if declining)</div>
            <select value={declineReason} onChange={e=>setDeclineReason(e.target.value)} style={{...inp(),marginBottom:20}}>
              <option value="">Select reason…</option>
              {Object.entries(DECLINE_REASONS).map(([k,v])=><option key={k} value={k}>{v as string}</option>)}
            </select>
          </>}
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            {qModal.status==='pending'&&<>
              <button style={btn('green')} disabled={quoteUpdating} onClick={()=>updateQuote(qModal.id,'confirmed')}>✓ Confirm</button>
              <button style={btn('red')} disabled={!declineReason||quoteUpdating} onClick={()=>updateQuote(qModal.id,'declined',declineReason)}>✗ Decline</button>
            </>}
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>{setQModal(null);setDeclineReason('')}}>Close</button>
          </div>
        </div>
      </div>}

      {custModal&&<div style={overlay()} onClick={()=>setCustModal(null)}>
        <div style={modal()} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>{custModal.company_name}</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>Customer since {fmtDate(custModal.created_at)}</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0 24px',marginBottom:20}}>
            {([['Contact',custModal.first_name+' '+custModal.last_name],['Email',custModal.email],['Account Type',custModal.account_type||'—'],['Status',custModal.active?'Active':'Inactive']] as [string,string][]).map(([l,v])=>(
              <div key={l}><div style={mlabel()}>{l}</div><div style={mval()}>{v}</div></div>
            ))}
          </div>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            <button style={btn('ghost')} onClick={()=>{showToast('Password reset sent');setCustModal(null)}}>Reset Password</button>
            <button style={custModal.active?btn('red'):btn('green')} disabled={custToggling===custModal.id} onClick={()=>toggleCustomer(custModal.id,!custModal.active)}>
              {custToggling===custModal.id?'...':(custModal.active?'Disable Account':'Enable Account')}
            </button>
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>setCustModal(null)}>Close</button>
          </div>
        </div>
      </div>}

      {empModal&&<div style={overlay()} onClick={()=>setEmpModal(false)}>
        <div style={{...modal(),width:480}} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:20,fontWeight:800,color:C.text,marginBottom:4}}>Invite Team Member</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>They'll receive an email with login instructions</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
            <div><div style={mlabel()}>First Name</div><input style={inp()} value={empForm.first} onChange={e=>setEmpForm(p=>({...p,first:e.target.value}))}/></div>
            <div><div style={mlabel()}>Last Name</div><input style={inp()} value={empForm.last} onChange={e=>setEmpForm(p=>({...p,last:e.target.value}))}/></div>
          </div>
          <div style={{marginBottom:16}}><div style={mlabel()}>Email</div><input style={inp()} type="email" value={empForm.email} onChange={e=>setEmpForm(p=>({...p,email:e.target.value}))}/></div>
          <div style={{marginBottom:20}}><div style={mlabel()}>Role</div>
            <select style={inp()} value={empForm.role} onChange={e=>setEmpForm(p=>({...p,role:e.target.value}))}>
              {Object.entries(ROLE_LABELS).map(([k,v])=><option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            <button style={btn('primary')} onClick={()=>{
              if(!empForm.first||!empForm.email){showToast('Name and email required',true);return}
              setEmployees(p=>[...p,{id:Date.now(),...empForm,active:true,lastLogin:0}])
              setEmpModal(false);setEmpForm({first:'',last:'',email:'',role:'warehouse'});showToast('Team member invited')
            }}>📧 Send Invite</button>
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>setEmpModal(false)}>Cancel</button>
          </div>
        </div>
      </div>}

      {photoModal&&<div style={overlay()} onClick={()=>setPhotoModal(null)}>
        <div style={{...modal(),width:440}} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>Set Hero Photo</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>Hero photo shows on catalog cards for this family. Paste a URL or use the Apple CDN format.</div>
          {photoUrl&&<img src={photoUrl} style={{width:'100%',height:160,objectFit:'contain',borderRadius:8,background:C.dark,marginBottom:16}} alt="preview"/>}
          <div style={mlabel()}>Photo URL</div>
          <input style={{...inp(),marginBottom:20}} placeholder="https://..." value={photoUrl} onChange={e=>setPhotoUrl(e.target.value)}/>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            <button style={btn('primary')} onClick={async ()=>{
              try{
                await fetch('/api/sc/admin-families',{method:'PATCH',headers:{'Content-Type':'application/json'},body:JSON.stringify({type:'family',id:photoModal.famId,image_url:photoUrl})})
                setFamiliesData((p:any)=>p?{...p,families:p.families.map((f:any)=>f.id===photoModal.famId?{...f,imageUrl:photoUrl}:f)}:p)
                setPhotoModal(null);setPhotoUrl('');showToast('Photo saved')
              }catch{showToast('Save failed',true)}
            }}>Save Photo</button>
            {photoUrl&&<button style={btn('red')} onClick={()=>setPhotoUrl('')}>Remove</button>}
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>setPhotoModal(null)}>Cancel</button>
          </div>
        </div>
      </div>}

      {createFamModal&&<div style={overlay()} onClick={()=>setCreateFamModal(false)}>
        <div style={{...modal(),width:480}} onClick={e=>e.stopPropagation()}>
          <div style={{fontSize:18,fontWeight:800,color:C.text,marginBottom:4}}>Create New Family</div>
          <div style={{fontSize:12,color:C.sub,marginBottom:20}}>The model code must match the middle segment of your SKUs exactly.</div>
          <div style={{marginBottom:14}}>
            <div style={mlabel()}>Model Code <span style={{color:'#ef4444'}}>*</span></div>
            <input style={inp()} placeholder="e.g. SA-GXC7P-G766" value={createFamForm.modelCode} onChange={e=>setCreateFamForm(p=>({...p,modelCode:e.target.value}))}/>
            <div style={{fontSize:11,color:C.dim,marginTop:4}}>From SKU: PA:SA-GXC7P-G766-HSO-UN-128-BLA-CA+</div>
          </div>
          <div style={{marginBottom:14}}>
            <div style={mlabel()}>Display Name <span style={{color:'#ef4444'}}>*</span></div>
            <input style={inp()} placeholder="e.g. Samsung Galaxy S25+" value={createFamForm.name} onChange={e=>setCreateFamForm(p=>({...p,name:e.target.value}))}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
            <div>
              <div style={mlabel()}>Brand</div>
              <select style={inp()} value={createFamForm.brand} onChange={e=>setCreateFamForm(p=>({...p,brand:e.target.value}))}>
                {['Apple','Samsung','Google','Motorola','Nokia','Other'].map(b=><option key={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <div style={mlabel()}>Category</div>
              <select style={inp()} value={createFamForm.category} onChange={e=>setCreateFamForm(p=>({...p,category:e.target.value}))}>
                {['Phones','Tablets','Laptops','Wearables','Accessories'].map(c=><option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
            <div style={mlabel()}>Visible on site</div>
            <div onClick={()=>setCreateFamForm(p=>({...p,visible:!p.visible}))} style={{width:36,height:20,borderRadius:10,background:createFamForm.visible?'#166534':'#334155',position:'relative',cursor:'pointer'}}>
              <div style={{width:14,height:14,borderRadius:'50%',background:createFamForm.visible?'#22c55e':'#64748b',position:'absolute',top:3,left:createFamForm.visible?19:3,transition:'left .15s'}}/>
            </div>
            <span style={{fontSize:12,color:C.sub}}>{createFamForm.visible?'Yes — will appear in catalog':'No — hidden until enabled'}</span>
          </div>
          <div style={{display:'flex',gap:8,paddingTop:20,borderTop:'1px solid '+C.border}}>
            <button style={btn('primary')} disabled={createFamSaving||!createFamForm.modelCode||!createFamForm.name} onClick={createFamily}>
              {createFamSaving?'Creating...':'Create Family'}
            </button>
            <button style={{...btn('ghost'),marginLeft:'auto'}} onClick={()=>setCreateFamModal(false)}>Cancel</button>
          </div>
        </div>
      </div>}

      {toast&&<div style={{position:'fixed',bottom:24,right:24,background:toast.error?'#1c0606':'#052e16',border:'1px solid '+(toast.error?'#7f1d1d':'#166534'),color:toast.error?'#ef4444':'#22c55e',padding:'12px 20px',borderRadius:8,fontSize:13,fontWeight:600,zIndex:300,boxShadow:'0 4px 20px rgba(0,0,0,.4)'}}>{toast.text}</div>}

    </div>
  )
}
