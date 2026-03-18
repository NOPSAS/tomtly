'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MapPin, ChevronDown } from 'lucide-react'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-tomtly-accent rounded-md flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-tomtly-dark">
              Tomtly
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/kart"
              className="text-sm text-brand-700 hover:text-tomtly-accent transition-colors"
            >
              Kart
            </Link>
            <Link
              href="/tomter"
              className="text-sm text-brand-700 hover:text-tomtly-accent transition-colors"
            >
              Tomter
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm text-brand-700 hover:text-tomtly-accent transition-colors">
                For deg
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 pt-2 hidden group-hover:block">
                <div className="bg-white rounded-lg shadow-lg border border-brand-200 py-2 min-w-[180px]">
                  <Link
                    href="/selger/onboarding"
                    className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                  >
                    Tomteeiere
                  </Link>
                  <Link
                    href="/megler/onboarding"
                    className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                  >
                    Meglere
                  </Link>
                  <Link
                    href="/leverandor"
                    className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                  >
                    Husleverandører
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/selger/onboarding"
              className="px-4 py-2 text-sm font-medium text-tomtly-accent border border-tomtly-accent rounded-lg hover:bg-forest-50 transition-colors"
            >
              Legg ut tomt
            </Link>
            <Link
              href="/megler/onboarding"
              className="px-4 py-2 text-sm font-medium text-white bg-tomtly-accent rounded-lg hover:bg-forest-700 transition-colors"
            >
              For meglere
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="md:hidden border-t border-brand-200 py-4 space-y-3">
            <Link href="/kart" className="block text-sm text-brand-700 py-2">
              Kart
            </Link>
            <Link href="/tomter" className="block text-sm text-brand-700 py-2">
              Tomter
            </Link>
            <Link href="/selger/onboarding" className="block text-sm text-brand-700 py-2">
              For tomteeiere
            </Link>
            <Link href="/megler/onboarding" className="block text-sm text-brand-700 py-2">
              For meglere
            </Link>
            <div className="pt-3 border-t border-brand-200">
              <Link
                href="/selger/onboarding"
                className="block w-full text-center px-4 py-2.5 text-sm font-medium text-white bg-tomtly-accent rounded-lg"
              >
                Legg ut tomt
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
