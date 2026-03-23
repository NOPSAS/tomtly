'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Shield } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

const NAV_LINKS = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/finn', label: 'FINN' },
  { href: '/admin/naering', label: 'Næring' },
  { href: '/admin/matching', label: 'Matching' },
  { href: '/admin/kommune', label: 'Kommune' },
  { href: '/admin/delesaker', label: 'Delesaker/Fradelinger' },
  { href: '/admin/finans', label: 'Finans' },
  { href: '/admin/inntekt', label: 'Inntekt' },
  { href: '/admin/pitch', label: 'Pitch' },
  { href: '/admin/salg', label: 'Salg' },
  { href: '/admin/some', label: 'SoMe' },
  { href: '/admin/data', label: 'Data' },
  { href: '/admin/megler-partner', label: 'Partner' },
  { href: '/meglerpartner', label: 'Meglerpartner-pitch' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Top bar */}
      <div className="bg-tomtly-dark text-white px-4 py-2.5 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-tomtly-gold" />
            <span className="font-display text-sm font-bold">Admin</span>
          </div>
          <span className="text-xs text-brand-400">{user?.email}</span>
        </div>
      </div>

      {/* Navigation – alltid synlig */}
      <div className="bg-white border-b border-brand-200 sticky top-[104px] z-30">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-2">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-tomtly-accent text-white'
                      : 'text-brand-600 hover:bg-brand-100'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Page content */}
      {children}
    </div>
  )
}
