'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MapPin, ChevronDown, Shield, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut, isAdmin, loading } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Tomtly" className="h-8" />
            <span className="text-[10px] text-brand-400 ml-1 hidden sm:inline">En del av NOPS</span>
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
                    href="/for-tomteeiere"
                    className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                  >
                    Tomteeiere
                  </Link>
                  <Link
                    href="/for-meglere"
                    className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                  >
                    Meglere
                  </Link>
                  <Link
                    href="/for-husleverandorer"
                    className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                  >
                    Husleverandører
                  </Link>
                  <Link
                    href="/for-entreprenorer"
                    className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                  >
                    Entreprenører
                  </Link>
                  <Link
                    href="/utvikler"
                    className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                  >
                    Utviklere
                  </Link>
                  <Link
                    href="/for-banker"
                    className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50"
                  >
                    Banker
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            {!loading && user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="flex items-center gap-1 px-3 py-1.5 bg-tomtly-dark text-white text-xs font-medium rounded-lg">
                    <Shield className="w-3.5 h-3.5" /> Admin
                  </Link>
                )}
                <Link href="/min-side" className="flex items-center gap-1 px-3 py-2 text-sm text-brand-600 hover:text-tomtly-accent">
                  <User className="w-4 h-4" /> Min side
                </Link>
                <button onClick={() => signOut()} className="px-3 py-2 text-sm text-brand-500 hover:text-brand-700">
                  Logg ut
                </button>
              </>
            ) : !loading ? (
              <Link href="/logg-inn" className="px-4 py-2 text-sm text-brand-600 hover:text-tomtly-accent transition-colors">
                Logg inn
              </Link>
            ) : null}
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
            <Link href="/for-tomteeiere" className="block text-sm text-brand-700 py-2">
              For tomteeiere
            </Link>
            <Link href="/for-meglere" className="block text-sm text-brand-700 py-2">
              For meglere
            </Link>
            <Link href="/for-husleverandorer" className="block text-sm text-brand-700 py-2">
              For husleverandører
            </Link>
            <Link href="/for-entreprenorer" className="block text-sm text-brand-700 py-2">
              For entreprenører
            </Link>
            <Link href="/utvikler" className="block text-sm text-brand-700 py-2">
              For utviklere
            </Link>
            <Link href="/for-banker" className="block text-sm text-brand-700 py-2">
              For banker
            </Link>
            {!loading && user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="block text-sm text-tomtly-accent font-semibold py-2">
                    Admin
                  </Link>
                )}
                <Link href="/min-side" className="block text-sm text-brand-700 py-2">
                  Min side
                </Link>
                <button onClick={() => signOut()} className="block text-sm text-brand-500 py-2">
                  Logg ut
                </button>
              </>
            ) : !loading ? (
              <Link href="/logg-inn" className="block text-sm text-brand-700 py-2">
                Logg inn
              </Link>
            ) : null}
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
