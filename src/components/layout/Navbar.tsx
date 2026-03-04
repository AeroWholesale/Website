import { useState, useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { Menu, X, ChevronDown, Building2, Package, ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Catalog', href: '/catalog' },
  {
    label: 'Buyers',
    dropdown: [
      { label: 'Enterprise', href: '/buyers/enterprise', icon: Building2, desc: 'High-volume deployments' },
      { label: 'Wholesale', href: '/buyers/wholesale', icon: Package, desc: 'Bulk purchasing programs' },
      { label: 'Resellers', href: '/buyers/resellers', icon: ShoppingBag, desc: 'Reseller partnerships' },
    ],
  },
  { label: 'Grading Standards', href: '/grading' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [location] = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [buyersOpen, setBuyersOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [dealerUser, setDealerUser] = useState<any>(() => {
    try { const u = localStorage.getItem('aw-user'); return u ? JSON.parse(u) : null } catch { return null }
  })

  // Keep cart count in sync with localStorage
  useEffect(() => {
    const readCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('aw-quote-cart') || '[]')
        setCartCount(cart.reduce((s: number, i: any) => s + (i.qty || 1), 0))
      } catch { setCartCount(0) }
    }
    readCart()
    window.addEventListener('storage', readCart)
    // Poll every 2s to catch in-page updates (localStorage doesn't fire storage event on same tab)
    const interval = setInterval(readCart, 2000)
    return () => { window.removeEventListener('storage', readCart); clearInterval(interval) }
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem('aw-token')
    localStorage.removeItem('aw-user')
    setDealerUser(null)
    window.location.href = '/'
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setBuyersOpen(false)
  }, [location])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300',
        scrolled ? 'shadow-md' : 'shadow-sm border-b border-gray-100'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="select-none">
            <span
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              className="text-xl font-bold text-[#1B2E5E] tracking-tight"
            >
              AeroWholesale
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setBuyersOpen(true)}
                  onMouseLeave={() => setBuyersOpen(false)}
                >
                  <button
                    className={cn(
                      'flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150',
                      buyersOpen
                        ? 'text-[#1B2E5E] bg-gray-100'
                        : 'text-gray-600 hover:text-[#1B2E5E] hover:bg-gray-100'
                    )}
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {link.label}
                    <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', buyersOpen && 'rotate-180')} />
                  </button>

                  <div
                    className={cn(
                      'absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 origin-top',
                      buyersOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none'
                    )}
                  >
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        <item.icon className="w-4 h-4 text-[#1B2E5E] shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-[#1B2E5E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>{item.label}</div>
                          <div className="text-xs text-gray-400">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150',
                    location === link.href
                      ? 'text-[#1B2E5E] bg-gray-100'
                      : 'text-gray-600 hover:text-[#1B2E5E] hover:bg-gray-100'
                  )}
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            {dealerUser ? (
              <>
                {/* My Account */}
                <Link
                  href="/portal"
                  className="px-4 py-1.5 text-sm font-medium text-[#1B2E5E] hover:text-[#ea580c] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  My Account
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif", background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  Sign Out
                </button>
                {/* Quote Cart with count */}
                <Link
                  href="/quote"
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold bg-[#ea580c] text-white hover:bg-[#c2410c] transition-all duration-150"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  🛒 Quote Cart
                  {cartCount > 0 && (
                    <span style={{ background: '#fff', color: '#ea580c', borderRadius: 20, fontSize: 11, fontWeight: 800, padding: '1px 7px', lineHeight: '1.6' }}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-[#1B2E5E] transition-colors"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Login
                </Link>
                {/* Non-logged-in: Request a Quote goes to /login */}
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md text-sm font-semibold bg-[#ea580c] text-white hover:bg-[#c2410c] transition-all duration-150"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Request a Quote
                </Link>
                <Link
                  href="/apply"
                  className="px-4 py-2 rounded-md text-sm font-semibold bg-[#1B2E5E] text-white hover:bg-[#152448] transition-all duration-150"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Apply for Access
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#1B2E5E] hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300',
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 border-t border-gray-100 bg-white space-y-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.label}>
                <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{link.label}</div>
                {link.dropdown.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-[#1B2E5E] transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <item.icon className="w-4 h-4 text-[#1B2E5E]" />
                    {item.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className={cn(
                  'block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                  location === link.href
                    ? 'bg-gray-100 text-[#1B2E5E]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#1B2E5E]'
                )}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            {dealerUser ? (
              <>
                <Link href="/portal" className="block px-3 py-2.5 text-sm font-medium text-[#1B2E5E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  My Account
                </Link>
                <button onClick={handleSignOut} className="block w-full text-left px-3 py-2.5 text-sm font-medium text-red-600" style={{ fontFamily: "'DM Sans', sans-serif", background: 'none', border: 'none', cursor: 'pointer' }}>
                  Sign Out
                </button>
                <Link
                  href="/quote"
                  className="flex items-center justify-center gap-2 w-full text-center px-4 py-2.5 rounded-md text-sm font-semibold bg-[#ea580c] text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  🛒 Quote Cart
                  {cartCount > 0 && (
                    <span style={{ background: '#fff', color: '#ea580c', borderRadius: 20, fontSize: 11, fontWeight: 800, padding: '1px 7px' }}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="block px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-[#1B2E5E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  Login
                </Link>
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-2.5 rounded-md text-sm font-semibold bg-[#ea580c] text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Request a Quote
                </Link>
                <Link
                  href="/apply"
                  className="block w-full text-center px-4 py-2.5 rounded-md text-sm font-semibold bg-[#1B2E5E] text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Apply for Access
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}