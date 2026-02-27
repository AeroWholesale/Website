import { useState, useMemo } from 'react'
import { useLocation } from 'wouter'

// ── STYLES ────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700;9..40,800;9..40,900&display=swap');

  .aw-cat-page { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #0f172a; -webkit-font-smoothing: antialiased; }

  /* ── CATALOG HEADER ── */
  .aw-cat-header { background: #0c1730; background-image: radial-gradient(ellipse 60% 80% at 100% 50%, rgba(194,65,12,0.08) 0%, transparent 60%), linear-gradient(160deg, #0c1730 0%, #08101f 100%); padding: 36px 40px; border-bottom: 1px solid rgba(255,255,255,0.05); }
  .aw-cat-header-inner { max-width: 1400px; margin: 0 auto; }
  .aw-cat-breadcrumb { font-size: 11px; font-weight: 600; color: #4e6480; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; }
  .aw-cat-breadcrumb span { color: #7b90b2; cursor: pointer; }
  .aw-cat-breadcrumb span:hover { color: #a8c0d8; }
  .aw-cat-title { font-size: 30px; font-weight: 900; color: #ffffff; letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.1; }
  .aw-cat-subtitle { font-size: 13.5px; color: #a8c0d8; font-weight: 500; display: flex; align-items: center; gap: 8px; }
  .aw-cat-subtitle svg { width: 14px; height: 14px; color: #c2410c; flex-shrink: 0; }

  /* ── SEARCH BAR ── */
  .aw-search-bar { background: #ffffff; border-bottom: 1px solid #e2e8f0; padding: 14px 40px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .aw-search-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; gap: 12px; }
  .aw-search-wrap { flex: 1; position: relative; }
  .aw-search-wrap svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #64748b; width: 16px; height: 16px; pointer-events: none; }
  .aw-search-input { width: 100%; height: 42px; padding: 0 14px 0 42px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #0f172a; background: #f8fafc; outline: none; transition: border-color 0.15s, background 0.15s; }
  .aw-search-input::placeholder { color: #64748b; }
  .aw-search-input:focus { border-color: #1a2f5e; background: #ffffff; }
  .aw-sort-wrap { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #334155; white-space: nowrap; }
  .aw-sort-wrap select { font-size: 13px; font-family: 'DM Sans', sans-serif; color: #334155; border: 1px solid #e2e8f0; border-radius: 6px; padding: 9px 12px; background: #ffffff; cursor: pointer; outline: none; }
  .aw-results-count { font-size: 12px; color: #64748b; white-space: nowrap; font-weight: 500; }

  /* ── LAYOUT ── */
  .aw-cat-layout { max-width: 1400px; margin: 0 auto; padding: 28px 40px 60px; display: grid; grid-template-columns: 260px 1fr; gap: 28px; align-items: start; }

  /* ── SIDEBAR ── */
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
  .aw-filter-count { font-size: 11px; color: #64748b; margin-left: auto; background: #f1f4f8; padding: 1px 6px; border-radius: 3px; font-weight: 500; }
  .aw-filter-hint { font-size: 10.5px; color: #64748b; margin: 0 0 4px 24px; line-height: 1.4; }
  .aw-grade-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }

  /* Color swatches */
  .aw-color-swatches { display: flex; flex-wrap: wrap; gap: 8px; padding: 6px 0 4px; }
  .aw-color-swatch { width: 22px; height: 22px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: transform 0.1s; flex-shrink: 0; }
  .aw-color-swatch:hover { transform: scale(1.15); }
  .aw-color-swatch.selected { box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #132347; }
  .aw-color-hint { font-size: 10.5px; color: #64748b; margin-top: 4px; padding-bottom: 4px; min-height: 16px; }

  /* ── ACTIVE FILTER PILLS ── */
  .aw-active-filters { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; min-height: 28px; }
  .aw-active-filters-label { font-size: 12px; color: #64748b; margin-right: 2px; white-space: nowrap; }
  .aw-filter-pill { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; color: #132347; background: #eff6ff; border: 1px solid #bfdbfe; padding: 4px 10px; border-radius: 20px; }
  .aw-filter-pill button { background: none; border: none; color: #64748b; cursor: pointer; font-size: 14px; line-height: 1; padding: 0; margin-left: 1px; font-family: inherit; }

  /* ── PRODUCT GRID ── */
  .aw-products-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  /* ── PRODUCT CARD ── */
  .aw-product-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; cursor: pointer; transition: box-shadow 0.15s, transform 0.15s; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
  .aw-product-card:hover { box-shadow: 0 8px 28px rgba(19,35,71,0.12); transform: translateY(-2px); }
  .aw-card-img { height: 160px; background: #f1f4f8; display: flex; align-items: center; justify-content: center; border-bottom: 1px solid #e2e8f0; position: relative; }
  .aw-card-img svg { width: 64px; height: 64px; color: #334155; opacity: 0.3; }
  .aw-card-badge { position: absolute; top: 10px; left: 10px; background: #132347; color: #ffffff; font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 3px; letter-spacing: 0.06em; }
  .aw-card-badge.hot { background: #c2410c; }
  .aw-card-body { padding: 14px; }
  .aw-card-meta-row { display: flex; gap: 4px; margin-bottom: 6px; }
  .aw-card-meta-tag { font-size: 10px; font-weight: 600; color: #64748b; background: #f1f4f8; padding: 2px 7px; border-radius: 3px; text-transform: uppercase; letter-spacing: 0.04em; border: 1px solid #e2e8f0; }
  .aw-card-name { font-size: 13.5px; font-weight: 700; color: #132347; margin-bottom: 10px; letter-spacing: -0.01em; line-height: 1.35; }
  .aw-card-grades { display: flex; gap: 4px; flex-wrap: wrap; margin-bottom: 12px; }
  .aw-grade-pill { font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 3px; border: 1px solid; }
  .aw-grade-cap1  { background: #f0fdf4; color: #15803d; border-color: #bbf7d0; }
  .aw-grade-cap   { background: #eff6ff; color: #1d4ed8; border-color: #bfdbfe; }
  .aw-grade-caplus{ background: #f5f3ff; color: #6d28d9; border-color: #ddd6fe; }
  .aw-grade-ca    { background: #fefce8; color: #854d0e; border-color: #fef08a; }
  .aw-grade-sd    { background: #f8fafc; color: #475569; border-color: #e2e8f0; }
  .aw-grade-sdm   { background: #fafafa; color: #6b7280; border-color: #e5e7eb; }
  .aw-card-price-row { border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; align-items: center; justify-content: space-between; }
  .aw-price-locked { display: flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: #64748b; }
  .aw-price-locked svg { width: 13px; height: 13px; flex-shrink: 0; }
  .aw-price-from { font-size: 10px; color: #64748b; font-weight: 500; }
  .aw-price-value { font-size: 18px; font-weight: 800; color: #132347; letter-spacing: -0.02em; line-height: 1; }
  .aw-price-value em { font-size: 11px; font-style: normal; color: #64748b; font-weight: 500; }
  .aw-view-btn { font-size: 12px; font-weight: 700; color: #ffffff; background: #132347; padding: 7px 16px; border-radius: 6px; cursor: pointer; border: none; font-family: 'DM Sans', sans-serif; transition: background 0.12s; }
  .aw-view-btn:hover { background: #1a2f5e; }

  /* ── PAGINATION ── */
  .aw-pagination { display: flex; align-items: center; justify-content: center; gap: 4px; margin-top: 40px; }
  .aw-page-btn { width: 36px; height: 36px; border-radius: 7px; border: 1px solid #e2e8f0; background: #ffffff; font-size: 13px; font-weight: 600; color: #334155; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif; transition: all 0.12s; }
  .aw-page-btn:hover { border-color: #132347; color: #132347; }
  .aw-page-btn.active { background: #132347; color: #ffffff; border-color: #132347; }
  .aw-page-btn.arrow { color: #64748b; font-size: 16px; }

  /* ── LOGIN BANNER ── */
  .aw-login-banner { background: #132347; background-image: linear-gradient(135deg, #132347 0%, #08101f 100%); padding: 24px 40px; border-top: 3px solid #c2410c; }
  .aw-login-banner-inner { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
  .aw-banner-title { font-size: 15px; font-weight: 700; color: #ffffff; margin-bottom: 2px; }
  .aw-banner-sub { font-size: 13px; color: #4e6480; }
  .aw-banner-btns { display: flex; gap: 10px; flex-shrink: 0; }
  .aw-banner-btn-primary { background: #c2410c; color: #fff; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 6px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.13s; }
  .aw-banner-btn-primary:hover { background: #a33509; }
  .aw-banner-btn-ghost { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 600; padding: 10px 20px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.13s; }
  .aw-banner-btn-ghost:hover { background: rgba(255,255,255,0.12); color: #fff; }

  /* ── EMPTY STATE ── */
  .aw-empty-state { text-align: center; padding: 60px 20px; grid-column: 1 / -1; }
  .aw-empty-title { font-size: 16px; font-weight: 700; color: #132347; margin-bottom: 6px; }
  .aw-empty-sub { font-size: 13px; color: #64748b; }
`

// ── DATA ─────────────────────────────────────────────────────────────────
const CATEGORIES = ['Phones', 'Tablets', 'Laptops / Computers', 'Wearables']
const BRANDS = ['Apple', 'Samsung', 'Google']
const GRADES = [
  { key: 'cap1',   label: 'Premium 100%', hint: 'Battery ≥ 100% · Like new cosmetically',  dot: '#15803d' },
  { key: 'cap',    label: 'Premium',      hint: 'Battery ≥ 80% · Minor wear',               dot: '#1d4ed8' },
  { key: 'caplus', label: 'Excellent',    hint: 'Battery ≥ 80% · Light use marks',           dot: '#7c3aed' },
  { key: 'ca',     label: 'Good',         hint: 'Battery ≥ 80% · Visible wear',              dot: '#854d0e' },
  { key: 'sd',     label: 'B-Grade',      hint: 'Heavy wear · Fully functional',             dot: '#6b7280' },
  { key: 'sdm',    label: 'C-Grade',      hint: 'Heavy wear/marks · Fully functional',       dot: '#9ca3af' },
]
const COLORS = [
  { name: 'Black',     bg: '#1c1c1e', border: '' },
  { name: 'White',     bg: '#f5f5f0', border: '#e2e8f0' },
  { name: 'Midnight',  bg: '#2c2c3a', border: '' },
  { name: 'Starlight', bg: '#e8e1d4', border: '#ddd' },
  { name: 'Blue',      bg: '#4a90d9', border: '' },
  { name: 'Purple',    bg: '#a78bfa', border: '' },
  { name: 'Pink',      bg: '#f472b6', border: '' },
  { name: 'Red',       bg: '#ef4444', border: '' },
  { name: 'Green',     bg: '#22c55e', border: '' },
  { name: 'Yellow',    bg: '#facc15', border: '#e5e5e5' },
  { name: 'Gold',      bg: '#d4a853', border: '' },
  { name: 'Silver',    bg: '#c0c0c0', border: '#ddd' },
]

// Sample product data — will be replaced with real API data
const SAMPLE_PRODUCTS = [
  { id: 1,  category: 'Phones',              brand: 'Apple',   type: 'iPhone',  name: 'iPhone 15 Pro Max · 256GB · Unlocked · Black Titanium', grades: ['cap1','cap','ca'],      badge: 'HOT', hot: true  },
  { id: 2,  category: 'Phones',              brand: 'Apple',   type: 'iPhone',  name: 'iPhone 16 Pro · 128GB · Unlocked · Black Titanium',      grades: ['cap1','cap'],           badge: 'NEW', hot: false },
  { id: 3,  category: 'Phones',              brand: 'Apple',   type: 'iPhone',  name: 'iPhone 14 · 128GB · AT&T · Black',                       grades: ['caplus','ca','sd'],     badge: null,  hot: false },
  { id: 4,  category: 'Phones',              brand: 'Samsung', type: 'Phone',   name: 'Galaxy S24 · 256GB · Unlocked · Onyx Black',             grades: ['cap1','cap'],           badge: null,  hot: false },
  { id: 5,  category: 'Phones',              brand: 'Apple',   type: 'iPhone',  name: 'iPhone 13 · 128GB · Verizon · Midnight',                 grades: ['cap','caplus','ca'],    badge: null,  hot: false },
  { id: 6,  category: 'Phones',              brand: 'Apple',   type: 'iPhone',  name: 'iPhone 15 · 512GB · Unlocked · Black',                   grades: ['cap1','cap'],           badge: null,  hot: false },
  { id: 7,  category: 'Tablets',             brand: 'Apple',   type: 'iPad',    name: 'iPad Pro 13" M4 · 256GB · WiFi · Space Black',           grades: ['cap1','cap'],           badge: 'NEW', hot: false },
  { id: 8,  category: 'Tablets',             brand: 'Apple',   type: 'iPad',    name: 'iPad Air M2 · 128GB · WiFi · Blue',                      grades: ['cap','caplus','ca'],    badge: null,  hot: false },
  { id: 9,  category: 'Laptops / Computers', brand: 'Apple',   type: 'MacBook', name: 'MacBook Air M2 · 256GB · Midnight',                      grades: ['cap','ca'],             badge: null,  hot: false },
  { id: 10, category: 'Laptops / Computers', brand: 'Apple',   type: 'MacBook', name: 'MacBook Pro M3 · 512GB · Space Gray',                    grades: ['cap1','cap'],           badge: null,  hot: false },
  { id: 11, category: 'Wearables',           brand: 'Apple',   type: 'Watch',   name: 'Apple Watch Series 9 · 45mm · Midnight',                 grades: ['cap1','cap'],           badge: null,  hot: false },
  { id: 12, category: 'Wearables',           brand: 'Samsung', type: 'Watch',   name: 'Galaxy Watch 6 · 44mm · Graphite',                       grades: ['cap','ca'],             badge: null,  hot: false },
]

// Logged-in mock prices (replace with real API)
const MOCK_PRICES: Record<number, number> = {
  1: 312, 2: 389, 3: 187, 4: 198, 5: 142, 6: 267,
  7: 445, 8: 298, 9: 234, 10: 567, 11: 178, 12: 134,
}

// ── ICONS ────────────────────────────────────────────────────────────────
const IconSearch = () => <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
const IconLock = () => <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
const IconLockSubtle = () => <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
const IconPhone = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/></svg>
const IconTablet = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="3" y="2" width="18" height="20" rx="2"/><circle cx="12" cy="17" r="0.8" fill="currentColor"/></svg>
const IconLaptop = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M2 20h20"/></svg>
const IconWatch = () => <svg fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><rect x="6" y="6" width="12" height="12" rx="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/></svg>

const CategoryIcon = ({ cat }: { cat: string }) => {
  if (cat === 'Phones') return <IconPhone />
  if (cat === 'Tablets') return <IconTablet />
  if (cat === 'Laptops / Computers') return <IconLaptop />
  return <IconWatch />
}

// ── FILTER GROUP ─────────────────────────────────────────────────────────
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

// ── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function Catalog() {
  const [, navigate] = useLocation()

  // Auth state — false = not logged in (price locked). Toggle for demo.
  const [isLoggedIn] = useState(false)

  // Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands]         = useState<string[]>([])
  const [selectedGrades, setSelectedGrades]         = useState<string[]>([])
  const [selectedColor, setSelectedColor]           = useState<string | null>(null)
  const [searchQuery, setSearchQuery]               = useState('')
  const [sortBy, setSortBy]                         = useState('newest')
  const [currentPage, setCurrentPage]               = useState(1)

  // Open/closed filter groups
  const [openGroups, setOpenGroups] = useState({ category: true, brand: true, grade: true, storage: false, carrier: false, color: true })
  const toggleGroup = (key: keyof typeof openGroups) => setOpenGroups(g => ({ ...g, [key]: !g[key] }))

  const PER_PAGE = 9

  // Toggle helpers
  const toggle = (list: string[], setList: (v: string[]) => void, val: string) => {
    setList(list.includes(val) ? list.filter(x => x !== val) : [...list, val])
    setCurrentPage(1)
  }

  // Filtered products
  const filtered = useMemo(() => {
    let items = SAMPLE_PRODUCTS.filter(p => {
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false
      if (selectedGrades.length && !p.grades.some(g => selectedGrades.includes(g))) return false
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q) && !p.type.toLowerCase().includes(q)) return false
      }
      return true
    })
    return items
  }, [selectedCategories, selectedBrands, selectedGrades, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  // Active filter pills
  const activePills = [
    ...selectedCategories.map(v => ({ key: 'cat:' + v, label: v, remove: () => toggle(selectedCategories, setSelectedCategories, v) })),
    ...selectedBrands.map(v => ({ key: 'brand:' + v, label: v, remove: () => toggle(selectedBrands, setSelectedBrands, v) })),
    ...selectedGrades.map(v => ({ key: 'grade:' + v, label: GRADES.find(g => g.key === v)?.label || v, remove: () => toggle(selectedGrades, setSelectedGrades, v) })),
    ...(selectedColor ? [{ key: 'color:' + selectedColor, label: selectedColor, remove: () => setSelectedColor(null) }] : []),
  ]

  const clearAll = () => {
    setSelectedCategories([]); setSelectedBrands([]); setSelectedGrades([]); setSelectedColor(null); setSearchQuery(''); setCurrentPage(1)
  }

  return (
    <>
      <style>{css}</style>
      <div className="aw-cat-page">

        {/* ── CATALOG HEADER ── */}
        <div className="aw-cat-header">
          <div className="aw-cat-header-inner">
            <div className="aw-cat-breadcrumb">
              <span onClick={() => navigate('/')}>Home</span> › Catalog
            </div>
            <div className="aw-cat-title">Product Catalog</div>
            <div className="aw-cat-subtitle">
              <IconLockSubtle />
              Prices visible to approved buyers only · Login or apply for access
            </div>
          </div>
        </div>

        {/* ── SEARCH BAR ── */}
        <div className="aw-search-bar">
          <div className="aw-search-inner">
            <div className="aw-search-wrap">
              <IconSearch />
              <input
                className="aw-search-input"
                placeholder="Search by model, SKU, storage, carrier, grade… e.g. iPhone 15 Pro 256GB Unlocked"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1) }}
              />
            </div>
            <div className="aw-sort-wrap">
              <span>Sort by</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="stock">Most Stock</option>
              </select>
            </div>
            <div className="aw-results-count">{filtered.length} results</div>
          </div>
        </div>

        {/* ── LAYOUT ── */}
        <div className="aw-cat-layout">

          {/* ── SIDEBAR ── */}
          <div className="aw-sidebar">
            <div className="aw-sidebar-header">
              <div className="aw-sidebar-title">Filters</div>
              {activePills.length > 0 && <button className="aw-sidebar-clear" onClick={clearAll}>Clear all</button>}
            </div>

            {/* Category */}
            <FilterGroup title="Category" open={openGroups.category} onToggle={() => toggleGroup('category')}>
              <div className="aw-filter-options">
                {CATEGORIES.map(cat => (
                  <div key={cat} className="aw-filter-option" onClick={() => toggle(selectedCategories, setSelectedCategories, cat)}>
                    <div className={`aw-filter-checkbox${selectedCategories.includes(cat) ? ' checked' : ''}`}>
                      {selectedCategories.includes(cat) && <span style={{ color: 'white', fontSize: 9, fontWeight: 900 }}>✓</span>}
                    </div>
                    <div className="aw-filter-label">{cat}</div>
                    <div className="aw-filter-count">{SAMPLE_PRODUCTS.filter(p => p.category === cat).length}</div>
                  </div>
                ))}
              </div>
            </FilterGroup>

            {/* Brand */}
            <FilterGroup title="Brand" open={openGroups.brand} onToggle={() => toggleGroup('brand')}>
              <div className="aw-filter-options">
                {BRANDS.map(brand => (
                  <div key={brand} className="aw-filter-option" onClick={() => toggle(selectedBrands, setSelectedBrands, brand)}>
                    <div className={`aw-filter-checkbox${selectedBrands.includes(brand) ? ' checked' : ''}`}>
                      {selectedBrands.includes(brand) && <span style={{ color: 'white', fontSize: 9, fontWeight: 900 }}>✓</span>}
                    </div>
                    <div className="aw-filter-label">{brand}</div>
                    <div className="aw-filter-count">{SAMPLE_PRODUCTS.filter(p => p.brand === brand).length}</div>
                  </div>
                ))}
              </div>
            </FilterGroup>

            {/* Grade */}
            <FilterGroup title="Grade" open={openGroups.grade} onToggle={() => toggleGroup('grade')}>
              <div className="aw-filter-options">
                {GRADES.map(g => (
                  <div key={g.key}>
                    <div className="aw-filter-option" onClick={() => toggle(selectedGrades, setSelectedGrades, g.key)}>
                      <div className={`aw-filter-checkbox${selectedGrades.includes(g.key) ? ' checked' : ''}`}>
                        {selectedGrades.includes(g.key) && <span style={{ color: 'white', fontSize: 9, fontWeight: 900 }}>✓</span>}
                      </div>
                      <div className="aw-grade-dot" style={{ background: g.dot }}></div>
                      <div className="aw-filter-label">{g.label}</div>
                      <div className="aw-filter-count">{SAMPLE_PRODUCTS.filter(p => p.grades.includes(g.key)).length}</div>
                    </div>
                    <div className="aw-filter-hint">{g.hint}</div>
                  </div>
                ))}
              </div>
            </FilterGroup>

            {/* Storage */}
            <FilterGroup title="Storage" open={openGroups.storage} onToggle={() => toggleGroup('storage')}>
              <div className="aw-filter-options">
                {['64GB','128GB','256GB','512GB','1TB'].map(s => (
                  <div key={s} className="aw-filter-option">
                    <div className="aw-filter-checkbox"></div>
                    <div className="aw-filter-label">{s}</div>
                  </div>
                ))}
              </div>
            </FilterGroup>

            {/* Carrier */}
            <FilterGroup title="Carrier" open={openGroups.carrier} onToggle={() => toggleGroup('carrier')}>
              <div className="aw-filter-options">
                {['Unlocked','AT&T','Verizon','T-Mobile','Sprint'].map(c => (
                  <div key={c} className="aw-filter-option">
                    <div className="aw-filter-checkbox"></div>
                    <div className="aw-filter-label">{c}</div>
                  </div>
                ))}
              </div>
            </FilterGroup>

            {/* Color */}
            <FilterGroup title="Color" open={openGroups.color} onToggle={() => toggleGroup('color')}>
              <div className="aw-filter-options">
                <div className="aw-color-swatches">
                  {COLORS.map(c => (
                    <div
                      key={c.name}
                      title={c.name}
                      className={`aw-color-swatch${selectedColor === c.name ? ' selected' : ''}`}
                      style={{ background: c.bg, border: c.border ? `2px solid ${c.border}` : '2px solid transparent' }}
                      onClick={() => { setSelectedColor(selectedColor === c.name ? null : c.name); setCurrentPage(1) }}
                    />
                  ))}
                </div>
                <div className="aw-color-hint">{selectedColor ? `${selectedColor} selected` : 'Select a color'}</div>
              </div>
            </FilterGroup>

          </div>

          {/* ── PRODUCTS AREA ── */}
          <div>

            {/* Active filter pills */}
            {activePills.length > 0 && (
              <div className="aw-active-filters">
                <span className="aw-active-filters-label">Active filters:</span>
                {activePills.map(pill => (
                  <div key={pill.key} className="aw-filter-pill">
                    {pill.label}
                    <button onClick={pill.remove}>×</button>
                  </div>
                ))}
              </div>
            )}

            {/* Product grid */}
            <div className="aw-products-grid">
              {paginated.length === 0 ? (
                <div className="aw-empty-state">
                  <div className="aw-empty-title">No products match your filters</div>
                  <div className="aw-empty-sub">Try adjusting your search or clearing some filters</div>
                </div>
              ) : paginated.map(p => (
                <div key={p.id} className="aw-product-card" onClick={() => navigate(`/catalog/${p.id}`)}>
                  <div className="aw-card-img">
                    <CategoryIcon cat={p.category} />
                    {p.badge && <div className={`aw-card-badge${p.hot ? ' hot' : ''}`}>{p.badge}</div>}
                  </div>
                  <div className="aw-card-body">
                    <div className="aw-card-meta-row">
                      <span className="aw-card-meta-tag">{p.brand}</span>
                      <span className="aw-card-meta-tag">{p.type}</span>
                    </div>
                    <div className="aw-card-name">{p.name}</div>
                    <div className="aw-card-grades">
                      {p.grades.map(g => (
                        <span key={g} className={`aw-grade-pill aw-grade-${g}`}>
                          {GRADES.find(gr => gr.key === g)?.label}
                        </span>
                      ))}
                    </div>
                    <div className="aw-card-price-row">
                      {isLoggedIn ? (
                        <div>
                          <div className="aw-price-from">from</div>
                          <div className="aw-price-value">${MOCK_PRICES[p.id]} <em>/ unit</em></div>
                        </div>
                      ) : (
                        <div className="aw-price-locked">
                          <IconLock />
                          Login to see pricing
                        </div>
                      )}
                      <button className="aw-view-btn" onClick={e => { e.stopPropagation(); navigate(`/catalog/${p.id}`) }}>View</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="aw-pagination">
                <div className={`aw-page-btn arrow${currentPage === 1 ? ' disabled' : ''}`} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>‹</div>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map(n => (
                  <div key={n} className={`aw-page-btn${currentPage === n ? ' active' : ''}`} onClick={() => setCurrentPage(n)}>{n}</div>
                ))}
                {totalPages > 5 && <div className="aw-page-btn">…</div>}
                {totalPages > 5 && <div className="aw-page-btn" onClick={() => setCurrentPage(totalPages)}>{totalPages}</div>}
                <div className="aw-page-btn arrow" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}>›</div>
              </div>
            )}

          </div>
        </div>

        {/* ── LOGIN BANNER ── */}
        {!isLoggedIn && (
          <div className="aw-login-banner">
            <div className="aw-login-banner-inner">
              <div>
                <div className="aw-banner-title">See pricing on every SKU in the catalog</div>
                <div className="aw-banner-sub">Login to your approved account or apply for wholesale access</div>
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