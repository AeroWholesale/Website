import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'wouter'

const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .aw-cat-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #0f172a; -webkit-font-smoothing: antialiased; min-height: 100vh; }

  .aw-cat-header { background: #0c1730; background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 36px 40px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .aw-cat-header-inner { max-width: 1400px; margin: 0 auto; }
  .aw-cat-breadcrumb { font-size: 11px; font-weight: 600; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .aw-cat-breadcrumb span { color: #7b90b2; cursor: pointer; }
  .aw-cat-breadcrumb span:hover { color: #a8c0d8; }
  .aw-cat-title { font-size: 30px; font-weight: 900; color: #ffffff; letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.1; }
  .aw-cat-subtitle { font-size: 13.5px; color: #a8c0d8; font-weight: 500; }

  .aw-search-bar { background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 14px 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .aw-search-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; gap: 12px; }
  .aw-search-wrap { flex: 1; position: relative; min-width: 0; }
  .aw-search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #64748b; width: 16px; height: 16px; pointer-events: none; }
  .aw-search-input { width: 100%; height: 42px; padding: 0 14px 0 42px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #0f172a; background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s; }
  .aw-search-input::placeholder { color: #94a3b8; }
  .aw-search-input:focus { border-color: #132347; background: #ffffff; }
  .aw-sort-wrap { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #334155; white-space: nowrap; flex-shrink: 0; }
  .aw-sort-wrap select { font-size: 13px; font-family: 'DM Sans', sans-serif; color: #334155; border: 1px solid #e2e8f0; border-radius: 6px; padding: 9px 12px; background: #ffffff; cursor: pointer; outline: none; }
  .aw-results-count { font-size: 12px; color: #64748b; white-space: nowrap; font-weight: 500; }

  /* Mobile filter toggle button */
  .aw-filter-toggle-btn { display: none; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #132347; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 9px 16px; cursor: pointer; font-family: 'DM Sans', sans-serif; white-space: nowrap; flex-shrink: 0; }
  .aw-filter-toggle-btn svg { width: 15px; height: 15px; }
  .aw-filter-badge { background: #132347; color: #fff; border-radius: 10px; font-size: 10px; font-weight: 800; padding: 1px 6px; }

  .aw-cat-layout { max-width: 1400px; margin: 0 auto; padding: 28px 40px 60px; display: grid; grid-template-columns: 240px 1fr; gap: 28px; align-items: start; }

  /* Desktop sidebar */
  .aw-sidebar { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; position: sticky; top: 88px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
  .aw-sidebar-header { padding: 14px 18px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; background: #f8fafc; }
  .aw-sidebar-title { font-size: 11px; font-weight: 800; color: #132347; text-transform: uppercase; letter-spacing: 0.12em; }
  .aw-sidebar-clear { font-size: 11px; font-weight: 700; color: #c2410c; cursor: pointer; background: none; border: none; font-family: 'DM Sans', sans-serif; }
  .aw-filter-group { border-bottom: 1px solid #e2e8f0; }
  .aw-filter-group:last-child { border-bottom: none; }
  .aw-filter-group-header { padding: 13px 18px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; user-select: none; transition: background 0.1s; }
  .aw-filter-group-header:hover { background: #f8fafc; }
  .aw-filter-group-title { font-size: 12px; font-weight: 700; color: #132347; text-transform: uppercase; letter-spacing: 0.08em; }
  .aw-filter-toggle { color: #64748b; font-size: 18px; font-weight: 300; line-height: 1; width: 18px; text-align: center; }
  .aw-filter-options { padding: 2px 18px 14px; }
  .aw-filter-option { display: flex; align-items: center; gap: 9px; padding: 5px 0; cursor: pointer; }
  .aw-filter-option:hover .aw-filter-label { color: #132347; }
  .aw-filter-checkbox { width: 15px; height: 15px; border: 1.5px solid #cbd5e1; border-radius: 3px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.1s; }
  .aw-filter-checkbox.checked { background: #132347; border-color: #132347; }
  .aw-filter-label { font-size: 13px; color: #334155; font-weight: 500; }

  /* Mobile filter drawer overlay */
  .aw-filter-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.4); z-index: 200; }
  .aw-filter-overlay.open { display: block; }
  .aw-filter-drawer { position: fixed; top: 0; left: 0; bottom: 0; width: min(320px, 90vw); background: #fff; z-index: 201; overflow-y: auto; transform: translateX(-100%); transition: transform 0.25s ease; box-shadow: 4px 0 24px rgba(0,0,0,0.15); }
  .aw-filter-drawer.open { transform: translateX(0); }
  .aw-filter-drawer-header { padding: 16px 18px; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: #fff; z-index: 1; }
  .aw-filter-drawer-title { font-size: 14px; font-weight: 800; color: #132347; }
  .aw-filter-drawer-close { background: none; border: none; font-size: 22px; color: #64748b; cursor: pointer; line-height: 1; padding: 0; font-family: inherit; }
  .aw-filter-drawer-footer { padding: 16px 18px; border-top: 1px solid #e2e8f0; position: sticky; bottom: 0; background: #fff; }
  .aw-filter-apply-btn { width: 100%; padding: 12px; background: #132347; color: #fff; font-size: 14px; font-weight: 700; border: none; border-radius: 8px; cursor: pointer; font-family: 'DM Sans', sans-serif; }

  .aw-active-filters { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; min-height: 28px; }
  .aw-filter-pill { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; color: #132347; background: #eff6ff; border: 1px solid #bfdbfe; padding: 4px 10px; border-radius: 20px; }
  .aw-filter-pill button { background: none; border: none; color: #64748b; cursor: pointer; font-size: 14px; line-height: 1; padding: 0; margin-left: 1px; font-family: inherit; }

  .aw-products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  .aw-product-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; cursor: pointer; transition: box-shadow 0.15s, transform 0.15s; box-shadow: 0 1px 3px rgba(0,0,0,0.04); display: flex; flex-direction: column; }
  .aw-product-card:hover { box-shadow: 0 8px 28px rgba(19,35,71,0.12); transform: translateY(-2px); }
  .aw-card-img { height: 160px; background: #f1f4f8; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #e2e8f0; position: relative; overflow: hidden; }
  .aw-card-img img { max-height: 140px; max-width: 140px; object-fit: contain; }
  .aw-card-img svg { width: 56px; height: 56px; color: #94a3b8; opacity: 0.5; }
  .aw-card-badge { position: absolute; top: 10px; right: 10px; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
  .aw-card-body { padding: 14px; flex: 1; display: flex; flex-direction: column; }
  .aw-card-brand { font-size: 10px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .aw-card-name { font-size: 15px; font-weight: 700; color: #132347; margin-bottom: 8px; letter-spacing: -0.01em; line-height: 1.3; }
  .aw-card-specs { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 10px; }
  .aw-card-spec { font-size: 10px; font-weight: 600; color: #475569; background: #f1f4f8; padding: 2px 7px; border-radius: 3px; border: 1px solid #e2e8f0; }
  .aw-card-grades { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px; }
  .aw-grade-pill { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 3px; }
  .aw-gp-green { background: #ecfdf5; color: #047857; }
  .aw-gp-blue { background: #eff6ff; color: #1d4ed8; }
  .aw-gp-purple { background: #f5f3ff; color: #6d28d9; }
  .aw-gp-yellow { background: #fefce8; color: #854d0e; }
  .aw-gp-orange { background: #fff7ed; color: #9a3412; }
  .aw-gp-gray { background: #f8fafc; color: #475569; }
  .aw-card-footer { border-top: 1px solid #e2e8f0; padding-top: 12px; margin-top: auto; display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .aw-stock-label { font-size: 11px; font-weight: 600; color: #64748b; }
  .aw-stock-label b { color: #132347; }
  .aw-view-btn { font-size: 12px; font-weight: 700; color: #ffffff; background: #132347; padding: 7px 16px; border-radius: 6px; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: background 0.12s; white-space: nowrap; }
  .aw-view-btn:hover { background: #1a2f5e; }

  .aw-pagination { display: flex; align-items: center; justify-content: center; gap: 4px; margin-top: 40px; flex-wrap: wrap; }
  .aw-page-btn { width: 36px; height: 36px; border-radius: 7px; border: 1px solid #e2e8f0; background: #ffffff; font-size: 13px; font-weight: 600; color: #334155; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .aw-page-btn:hover { border-color: #132347; color: #132347; }
  .aw-page-btn.active { background: #132347; color: #ffffff; border-color: #132347; }

  .aw-loading { display: flex; align-items: center; justify-content: center; padding: 80px 20px; }
  .aw-spinner { width: 32px; height: 32px; border: 3px solid #e2e8f0; border-top-color: #132347; border-radius: 50%; animation: aw-spin 0.6s linear infinite; }
  @keyframes aw-spin { to { transform: rotate(360deg); } }

  .aw-empty-state { text-align: center; padding: 60px 20px; }
  .aw-empty-title { font-size: 16px; font-weight: 700; color: #132347; margin-bottom: 6px; }
  .aw-empty-sub { font-size: 13px; color: #64748b; }

  .aw-login-banner { background: linear-gradient(135deg, #132347 0%, #08101f 100%); padding: 24px 40px; border-top: 3px solid #c2410c; }
  .aw-login-banner-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
  .aw-banner-title { font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 2px; }
  .aw-banner-sub { font-size: 13px; color: #4e6480; }
  .aw-banner-btns { display: flex; gap: 10px; flex-shrink: 0; flex-wrap: wrap; }
  .aw-banner-btn-primary { background: #c2410c; color: #fff; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 6px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; }
  .aw-banner-btn-primary:hover { background: #a33509; }
  .aw-banner-btn-ghost { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); cursor: pointer; font-family: 'DM Sans', sans-serif; }

  /* ── TABLET (≤1024px) ── */
  @media (max-width: 1024px) {
    .aw-cat-layout { grid-template-columns: 1fr; padding: 20px 20px 48px; gap: 0; }
    .aw-sidebar { display: none; }
    .aw-filter-toggle-btn { display: flex; }
    .aw-products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .aw-cat-header, .aw-search-bar, .aw-login-banner { padding-left: 20px; padding-right: 20px; }
    .aw-search-inner { gap: 8px; }
    .aw-results-count { display: none; }
  }

  /* ── MOBILE (≤640px) ── */
  @media (max-width: 640px) {
    .aw-cat-header { padding: 24px 16px; }
    .aw-cat-title { font-size: 22px; }
    .aw-cat-subtitle { font-size: 12px; }
    .aw-search-bar { padding: 10px 16px; }
    .aw-search-input { font-size: 13px; }
    .aw-sort-wrap span { display: none; }
    .aw-sort-wrap select { font-size: 12px; padding: 8px 10px; }
    .aw-cat-layout { padding: 16px 16px 48px; }
    .aw-products-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .aw-card-img { height: 130px; }
    .aw-card-img img { max-height: 110px; max-width: 110px; }
    .aw-card-body { padding: 10px; }
    .aw-card-name { font-size: 13px; }
    .aw-card-specs { display: none; }
    .aw-card-footer { flex-wrap: wrap; }
    .aw-view-btn { width: 100%; text-align: center; margin-top: 4px; }
    .aw-active-filters { margin-bottom: 12px; }
    .aw-login-banner { padding: 20px 16px; }
    .aw-banner-btns { width: 100%; }
    .aw-banner-btn-primary, .aw-banner-btn-ghost { flex: 1; text-align: center; }
  }
`

const GRADE_LABELS: Record<string, string> = {
  'CAP1': 'Premium 100%', 'CAP': 'Premium', 'NE': 'New',
  'CA+': 'Excellent', 'CA': 'Good', 'CAB': 'Good (Batt<80%)',
  'SD': 'B-Grade', 'SD-': 'C-Grade', 'SDB': 'B/C (Batt<80%)',
}

const GRADE_COLORS: Record<string, string> = {
  'CAP1': 'green', 'NE': 'green', 'CAP': 'blue',
  'CA+': 'purple', 'CA': 'yellow',
  'CAB': 'orange', 'SD': 'gray', 'SD-': 'gray', 'SDB': 'gray',
}

const GRADE_ORDER = ['CAP1', 'NE', 'CAP', 'CA+', 'CA', 'CAB', 'SD', 'SD-', 'SDB']

const IconSearch = () => <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
const IconFilter = () => <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M7 12h10M11 18h2"/></svg>
const IconPhone = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/></svg>
const IconTablet = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="3" y="2" width="18" height="20" rx="2"/><circle cx="12" cy="18" r="0.8" fill="currentColor"/></svg>
const IconLaptop = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M1 18h22" strokeLinecap="round"/></svg>
const IconWatch = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="3"/><path d="M9 6V3h6v3M9 18v3h6v-3"/></svg>
const IconDevice = ({ category }: { category?: string }) => {
  if (category === 'Tablets') return <IconTablet />
  if (category === 'Laptops') return <IconLaptop />
  if (category === 'Wearables') return <IconWatch />
  return <IconPhone />
}

interface Product {
  modelCode: string; name: string; brand: string; category: string
  totalStock: number; skuCount: number; grades: string[]; storages: string[]
  carriers: string[]; colors: string[]
  image: string; skus: any[]
  lowestPrice?: number | null; highestPrice?: number | null
}

interface ApiResponse {
  products: Product[]; total: number; page: number; pageSize: number
  totalPages: number
  filterOptions: { categories: string[]; brands: string[]; grades: string[]; storages: string[]; carriers: string[] }
}

export default function Catalog() {
  const [, navigate] = useLocation()
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [drawerOpen, setDrawerOpen] = useState(false)

  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  const [category, setCategory] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get('category') || ''
  })

  const [brands, setBrands] = useState<string[]>([])
  const [grades, setGrades] = useState<string[]>([])
  const [storages, setStorages] = useState<string[]>([])
  const [carriers, setCarriers] = useState<string[]>([])
  const [sort, setSort] = useState('name')
  const [page, setPage] = useState(1)

  const [openGroups, setOpenGroups] = useState({ category: true, brand: true, grade: true, storage: false, carrier: false })

  const dealerToken = localStorage.getItem('aw-token')
  const dealerUser = (() => { try { return JSON.parse(localStorage.getItem('aw-user') || '') } catch { return null } })()
  const toggleGroup = (key: keyof typeof openGroups) => setOpenGroups(g => ({ ...g, [key]: !g[key] }))

  // Close drawer on body scroll lock
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [drawerOpen])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (category) params.set('category', category)
      if (brands.length) params.set('brand', brands.join(','))
      if (grades.length) params.set('grade', grades.join(','))
      if (storages.length) params.set('storage', storages.join(','))
      if (carriers.length) params.set('carrier', carriers.join(','))
      params.set('sort', sort)
      params.set('page', String(page))
      params.set('size', '24')
      const headers: Record<string, string> = {}
      const tok = localStorage.getItem('aw-token')
      if (tok) headers['Authorization'] = `Bearer ${tok}`
      const res = await fetch(`/api/catalog-public?${params}`, { headers })
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      setData(await res.json())
      setError('')
    } catch (err) {
      setError(String(err))
    } finally {
      setLoading(false)
    }
  }, [search, category, brands, grades, storages, carriers, sort, page])

  useEffect(() => { fetchData() }, [fetchData])

  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1) }, 400)
    return () => clearTimeout(t)
  }, [searchInput])

  const toggle = (list: string[], setList: (v: string[]) => void, val: string) => {
    setList(list.includes(val) ? list.filter(x => x !== val) : [...list, val])
    setPage(1)
  }

  const clearAll = () => {
    setCategory(''); setBrands([]); setGrades([]); setStorages([])
    setCarriers([]); setSearchInput(''); setSearch(''); setPage(1)
  }

  const hasFilters = category || brands.length || grades.length || storages.length || carriers.length || search
  const activeFilterCount = (category ? 1 : 0) + brands.length + grades.length + storages.length + carriers.length + (search ? 1 : 0)

  const sortGrades = (g: string[]) => [...g].sort((a, b) => {
    const ai = GRADE_ORDER.indexOf(a), bi = GRADE_ORDER.indexOf(b)
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
  })

  const goToProduct = (modelCode: string) => navigate(`/catalog/${encodeURIComponent(modelCode)}`)

  // Shared filter panel content (used in both sidebar and drawer)
  const FilterPanelContent = () => (
    <>
      <FilterGroup title="Category" open={openGroups.category} onToggle={() => toggleGroup('category')}>
        <div className="aw-filter-options">
          {(data?.filterOptions.categories || []).map(c => (
            <div key={c} className="aw-filter-option" onClick={() => { setCategory(category === c ? '' : c); setPage(1) }}>
              <div className={`aw-filter-checkbox${category === c ? ' checked' : ''}`}>
                {category === c && <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✓</span>}
              </div>
              <div className="aw-filter-label">{c}</div>
            </div>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Brand" open={openGroups.brand} onToggle={() => toggleGroup('brand')}>
        <div className="aw-filter-options">
          {(data?.filterOptions.brands || []).map(b => (
            <div key={b} className="aw-filter-option" onClick={() => toggle(brands, setBrands, b)}>
              <div className={`aw-filter-checkbox${brands.includes(b) ? ' checked' : ''}`}>
                {brands.includes(b) && <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✓</span>}
              </div>
              <div className="aw-filter-label">{b}</div>
            </div>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Condition" open={openGroups.grade} onToggle={() => toggleGroup('grade')}>
        <div className="aw-filter-options">
          {sortGrades(data?.filterOptions.grades || []).map(g => (
            <div key={g} className="aw-filter-option" onClick={() => toggle(grades, setGrades, g)}>
              <div className={`aw-filter-checkbox${grades.includes(g) ? ' checked' : ''}`}>
                {grades.includes(g) && <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✓</span>}
              </div>
              <div className="aw-filter-label">{GRADE_LABELS[g] || g}</div>
            </div>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Storage" open={openGroups.storage} onToggle={() => toggleGroup('storage')}>
        <div className="aw-filter-options">
          {(data?.filterOptions.storages || []).map(s => (
            <div key={s} className="aw-filter-option" onClick={() => toggle(storages, setStorages, s)}>
              <div className={`aw-filter-checkbox${storages.includes(s) ? ' checked' : ''}`}>
                {storages.includes(s) && <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✓</span>}
              </div>
              <div className="aw-filter-label">{s}</div>
            </div>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Carrier" open={openGroups.carrier} onToggle={() => toggleGroup('carrier')}>
        <div className="aw-filter-options">
          {(data?.filterOptions.carriers || []).map(c => (
            <div key={c} className="aw-filter-option" onClick={() => toggle(carriers, setCarriers, c)}>
              <div className={`aw-filter-checkbox${carriers.includes(c) ? ' checked' : ''}`}>
                {carriers.includes(c) && <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✓</span>}
              </div>
              <div className="aw-filter-label">{c}</div>
            </div>
          ))}
        </div>
      </FilterGroup>
    </>
  )

  return (
    <>
      <style>{css}</style>
      <div className="aw-cat-page">

        <div className="aw-cat-header">
          <div className="aw-cat-header-inner">
            <div className="aw-cat-breadcrumb">
              <span onClick={() => navigate('/')}>Home</span> ›{' '}
              {category ? <><span onClick={() => setCategory('')}>Catalog</span> › {category}</> : 'Catalog'}
            </div>
            <div className="aw-cat-title">{category ? category : 'Product Catalog'}</div>
            <div className="aw-cat-subtitle">
              {data ? `${data.total} products in stock · Updated hourly from live inventory` : 'Loading inventory...'}
            </div>
          </div>
        </div>

        <div className="aw-search-bar">
          <div className="aw-search-inner">
            {/* Mobile filter button */}
            <button className="aw-filter-toggle-btn" onClick={() => setDrawerOpen(true)}>
              <IconFilter />
              Filters
              {activeFilterCount > 0 && <span className="aw-filter-badge">{activeFilterCount}</span>}
            </button>

            <div className="aw-search-wrap">
              <IconSearch />
              <input
                className="aw-search-input"
                placeholder="Search by model, SKU, brand..."
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
            </div>
            <div className="aw-sort-wrap">
              <span>Sort</span>
              <select value={sort} onChange={e => { setSort(e.target.value); setPage(1) }}>
                <option value="name">Name A-Z</option>
                <option value="stock">Most Stock</option>
              </select>
            </div>
            <div className="aw-results-count">{data?.total || 0} results</div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        <div className={`aw-filter-overlay${drawerOpen ? ' open' : ''}`} onClick={() => setDrawerOpen(false)} />
        <div className={`aw-filter-drawer${drawerOpen ? ' open' : ''}`}>
          <div className="aw-filter-drawer-header">
            <div className="aw-filter-drawer-title">
              Filters {activeFilterCount > 0 && <span className="aw-filter-badge" style={{ marginLeft: 6 }}>{activeFilterCount}</span>}
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {hasFilters && <button className="aw-sidebar-clear" onClick={clearAll}>Clear all</button>}
              <button className="aw-filter-drawer-close" onClick={() => setDrawerOpen(false)}>×</button>
            </div>
          </div>
          <FilterPanelContent />
          <div className="aw-filter-drawer-footer">
            <button className="aw-filter-apply-btn" onClick={() => setDrawerOpen(false)}>
              {data ? `Show ${data.total} results` : 'Apply Filters'}
            </button>
          </div>
        </div>

        <div className="aw-cat-layout">
          {/* Desktop sidebar */}
          <div className="aw-sidebar">
            <div className="aw-sidebar-header">
              <div className="aw-sidebar-title">Filters</div>
              {hasFilters ? <button className="aw-sidebar-clear" onClick={clearAll}>Clear all</button> : null}
            </div>
            <FilterPanelContent />
          </div>

          <div>
            {hasFilters && (
              <div className="aw-active-filters">
                {category && <div className="aw-filter-pill">{category}<button onClick={() => { setCategory(''); setPage(1) }}>×</button></div>}
                {brands.map(b => <div key={b} className="aw-filter-pill">{b}<button onClick={() => toggle(brands, setBrands, b)}>×</button></div>)}
                {grades.map(g => <div key={g} className="aw-filter-pill">{GRADE_LABELS[g] || g}<button onClick={() => toggle(grades, setGrades, g)}>×</button></div>)}
                {storages.map(s => <div key={s} className="aw-filter-pill">{s}<button onClick={() => toggle(storages, setStorages, s)}>×</button></div>)}
                {carriers.map(c => <div key={c} className="aw-filter-pill">{c}<button onClick={() => toggle(carriers, setCarriers, c)}>×</button></div>)}
                {search && <div className="aw-filter-pill">"{search}"<button onClick={() => { setSearchInput(''); setSearch(''); setPage(1) }}>×</button></div>}
              </div>
            )}

            {loading ? (
              <div className="aw-loading"><div className="aw-spinner" /></div>
            ) : error ? (
              <div className="aw-empty-state">
                <div className="aw-empty-title">Failed to load catalog</div>
                <div className="aw-empty-sub">{error}</div>
              </div>
            ) : !data?.products.length ? (
              <div className="aw-empty-state">
                <div className="aw-empty-title">No products match your filters</div>
                <div className="aw-empty-sub">Try adjusting your search or clearing some filters</div>
              </div>
            ) : (
              <>
                <div className="aw-products-grid">
                  {data.products.map(p => (
                    <div key={p.modelCode} className="aw-product-card" onClick={() => goToProduct(p.modelCode)}>
                      <div className="aw-card-img">
                        {p.image ? <img src={p.image} alt={p.name} /> : <IconDevice category={p.category} />}
                        {p.totalStock >= 10 && <div className="aw-card-badge">{p.totalStock} in stock</div>}
                      </div>
                      <div className="aw-card-body">
                        <div className="aw-card-brand">{p.brand}</div>
                        <div className="aw-card-name">{p.name}</div>
                        <div className="aw-card-specs">
                          {p.storages.slice(0, 3).map(s => <span key={s} className="aw-card-spec">{s}</span>)}
                          {p.carriers.slice(0, 2).map(c => <span key={c} className="aw-card-spec">{c}</span>)}
                          {p.colors.length > 0 && <span className="aw-card-spec">{p.colors.length} color{p.colors.length > 1 ? 's' : ''}</span>}
                        </div>
                        <div className="aw-card-grades">
                          {sortGrades(p.grades).map(g => (
                            <span key={g} className={`aw-grade-pill aw-gp-${GRADE_COLORS[g] || 'gray'}`}>
                              {GRADE_LABELS[g] || g}
                            </span>
                          ))}
                        </div>
                        <div className="aw-card-footer">
                          {p.lowestPrice ? (
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#132347' }}>
                              From <span style={{ fontSize: 16, fontWeight: 800 }}>${p.lowestPrice.toFixed(2)}</span>
                              {p.highestPrice && p.highestPrice !== p.lowestPrice && (
                                <span style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}> – ${p.highestPrice.toFixed(2)}</span>
                              )}
                            </div>
                          ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#64748b', fontSize: 11, fontWeight: 600 }}>
                              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ width: 13, height: 13 }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                              Login for pricing
                            </div>
                          )}
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div className="aw-stock-label"><b>{p.totalStock}</b> units</div>
                            <button className="aw-view-btn" style={{ marginTop: 4 }} onClick={e => { e.stopPropagation(); goToProduct(p.modelCode) }}>View</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {data.totalPages > 1 && (
                  <div className="aw-pagination">
                    <div className="aw-page-btn" onClick={() => setPage(p => Math.max(1, p - 1))}>‹</div>
                    {Array.from({ length: Math.min(data.totalPages, 7) }, (_, i) => i + 1).map(n => (
                      <div key={n} className={`aw-page-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</div>
                    ))}
                    <div className="aw-page-btn" onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}>›</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {dealerToken ? (
          <div className="aw-login-banner">
            <div className="aw-login-banner-inner">
              <div>
                <div className="aw-banner-title">Logged in as {dealerUser?.companyName || 'Dealer'}</div>
                <div className="aw-banner-sub">You are viewing wholesale prices. <a href="/portal" style={{ color: '#ea580c', textDecoration: 'none', fontWeight: 700 }}>Go to portal →</a></div>
              </div>
              <div className="aw-banner-btns">
                <button className="aw-banner-btn-ghost" onClick={() => { localStorage.removeItem('aw-token'); localStorage.removeItem('aw-user'); window.location.reload() }}>Sign Out</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="aw-login-banner">
            <div className="aw-login-banner-inner">
              <div>
                <div className="aw-banner-title">Ready to buy? Apply for wholesale access</div>
                <div className="aw-banner-sub">Get access to bulk pricing and place orders directly</div>
              </div>
              <div className="aw-banner-btns">
                <button className="aw-banner-btn-primary" onClick={() => navigate('/apply')}>Apply for Access</button>
                <button className="aw-banner-btn-ghost" onClick={() => navigate('/login')}>Login</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

function FilterGroup({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="aw-filter-group">
      <div className="aw-filter-group-header" onClick={onToggle}>
        <div className="aw-filter-group-title">{title}</div>
        <div className="aw-filter-toggle">{open ? '−' : '+'}</div>
      </div>
      {open && children}
    </div>
  )
}
