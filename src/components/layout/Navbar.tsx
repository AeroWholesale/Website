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
        scrolled ? 'shadow-md py-2' : 'shadow-sm py-3'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link href="/" className="flex items-center select-none">
            <span className="text-xl font-bold text-[#1e3a5f]">Aero</span>
            <span className="text-xl font-bold text-[#0d9488]">Wholesale</span>
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
                      'flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150',
                      buyersOpen
                        ? 'bg-[#ccfbf1] text-[#0d9488]'
                        : 'text-[#1e3a5f] hover:bg-[#ccfbf1] hover:text-[#0d9488]'
                    )}
                  >
                    {link.label}
                    <ChevronDown className={cn('w-3.5 h-3.5 transition-transform duration-200', buyersOpen && 'rotate-180')} />
                  </button>

                  {/* Dropdown */}
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
                        className="flex items-center gap-3 px-4 py-3 hover:bg-[#f0fdfa] transition-colors group"
                      >
                        <item.icon className="w-4 h-4 text-[#0d9488] shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-[#1e3a5f] group-hover:text-[#0d9488] transition-colors">{item.label}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
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
                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-150',
                    location === link.href
                      ? 'bg-[#ccfbf1] text-[#0d9488]'
                      : 'text-[#1e3a5f] hover:bg-[#ccfbf1] hover:text-[#0d9488]'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Right CTAs */}
          <div className="hidden lg:flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-1.5 text-sm font-medium text-[#1e3a5f] hover:text-[#0d9488] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/quote"
              className="px-4 py-2 rounded-full text-sm font-semibold bg-[#ea580c] text-white hover:bg-[#c2410c] transition-all duration-150 hover:scale-105"
            >
              Request a Quote
            </Link>
            <Link
              href="/apply"
              className="px-4 py-2 rounded-full text-sm font-semibold bg-[#0d9488] text-white hover:bg-[#0a7c72] transition-all duration-150 hover:scale-105"
            >
              Apply for Access
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#1e3a5f] hover:bg-gray-100 transition-colors"
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
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[#1e3a5f] hover:bg-[#f0fdfa] hover:text-[#0d9488] transition-colors"
                  >
                    <item.icon className="w-4 h-4 text-[#0d9488]" />
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
                    ? 'bg-[#ccfbf1] text-[#0d9488]'
                    : 'text-[#1e3a5f] hover:bg-[#f0fdfa] hover:text-[#0d9488]'
                )}
              >
                {link.label}
              </Link>
            )
          )}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <Link href="/login" className="block px-3 py-2.5 text-sm font-medium text-[#1e3a5f] hover:text-[#0d9488]">Login</Link>
            <Link href="/quote" className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold bg-[#ea580c] text-white hover:bg-[#c2410c] transition-colors">
              Request a Quote
            </Link>
            <Link href="/apply" className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-semibold bg-[#0d9488] text-white hover:bg-[#0a7c72] transition-colors">
              Apply for Access
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}