import { Link } from 'react-router-dom'
import { Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Column 1 — Brand */}
          <div className="space-y-4">
            <div>
              <span className="text-xl font-bold text-white">Aero</span>
              <span className="text-xl font-bold text-[#0d9488]">Wholesale</span>
            </div>
            <p className="text-sm text-blue-200 leading-relaxed">
              From One Device to One Thousand — We've Got You Covered
            </p>
            <div className="space-y-2">
              <a
                href="mailto:sales@aerowholesale.com"
                className="flex items-center gap-2 text-sm text-blue-200 hover:text-[#0d9488] transition-colors"
              >
                <Mail className="w-4 h-4" />
                sales@aerowholesale.com
              </a>
              <div className="flex items-center gap-2 text-sm text-blue-200">
                <Clock className="w-4 h-4" />
                Mon–Fri 9am–5pm EST
              </div>
            </div>
          </div>

          {/* Column 2 — Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Products</h4>
            <ul className="space-y-2">
              {['iPhone', 'iPad', 'MacBook', 'Samsung', 'Google Pixel'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/catalog?brand=${item.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-blue-200 hover:text-[#0d9488] transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '/about' },
                { label: 'Grading Standards', href: '/grading' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-blue-200 hover:text-[#0d9488] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Buyers */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Buyers</h4>
            <ul className="space-y-2">
              {[
                { label: 'Enterprise', href: '/buyers/enterprise' },
                { label: 'Wholesale', href: '/buyers/wholesale' },
                { label: 'Resellers', href: '/buyers/resellers' },
                { label: 'Apply for Access', href: '/apply' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-blue-200 hover:text-[#0d9488] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-blue-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-blue-300">
            © 2026 AeroWholesale. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-blue-300 hover:text-[#0d9488] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-blue-300 hover:text-[#0d9488] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
