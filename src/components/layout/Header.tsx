'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChevronDown, Shield, User } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut, isAdmin, loading } = useAuth()

  return (
    <header className="sticky top-0 z-[2000] bg-white/95 backdrop-blur-sm border-b border-brand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo med "En del av NOPS" under */}
          <Link href="/" className="flex flex-col items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Tomtly" className="h-7" />
            <span className="text-[9px] text-brand-400 -mt-0.5 hidden sm:block">En del av NOPS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/for-tomteeiere"
              className="px-3 py-2 text-sm font-medium text-brand-700 hover:text-tomtly-accent hover:bg-forest-50 rounded-lg transition-colors"
            >
              Selg tomt
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-brand-700 hover:text-tomtly-accent hover:bg-forest-50 rounded-lg transition-colors">
                Kjøp tomt
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-[2000]">
                <div className="bg-white rounded-lg shadow-lg border border-brand-200 py-2 min-w-[160px]">
                  <Link href="/tomter" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    Tomter til salgs
                  </Link>
                  <Link href="/kart" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    Kart
                  </Link>
                </div>
              </div>
            </div>
            <Link
              href="/fradeling"
              className="px-3 py-2 text-sm font-medium text-brand-700 hover:text-tomtly-accent hover:bg-forest-50 rounded-lg transition-colors"
            >
              Tomtedeling
            </Link>
            <Link
              href="/tomteanalyse"
              className="px-3 py-2 text-sm font-medium text-brand-700 hover:text-tomtly-accent hover:bg-forest-50 rounded-lg transition-colors"
            >
              Tomteanalyse
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-brand-600 hover:text-tomtly-accent hover:bg-forest-50 rounded-lg transition-colors">
                Mer
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div className="absolute top-full right-0 pt-2 hidden group-hover:block z-[2000]">
                <div className="bg-white rounded-lg shadow-lg border border-brand-200 py-2 min-w-[180px]">
                  <Link href="/for-meglere" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    For meglere
                  </Link>
                  <Link href="/for-husleverandorer" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    For husleverandører
                  </Link>
                  <Link href="/for-entreprenorer" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    For entreprenører
                  </Link>
                  <Link href="/for-banker" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    For banker
                  </Link>
                  <Link href="/for-kommuner" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    For kommuner
                  </Link>
                  <Link href="/naering" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    For næring
                  </Link>
                  <Link href="/utvikler" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    For utviklere
                  </Link>
                  <div className="border-t border-brand-100 my-1" />
                  <Link href="/aktuelt" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    Aktuelt
                  </Link>
                  <Link href="/samarbeidspartnere" className="block px-4 py-2 text-sm text-brand-700 hover:bg-brand-50">
                    Samarbeidspartnere
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-2">
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
              <Link href="/logg-inn" className="px-3 py-2 text-sm text-brand-600 hover:text-tomtly-accent transition-colors">
                Logg inn
              </Link>
            ) : null}
            <Link
              href="/selger/onboarding"
              className="px-4 py-2 text-sm font-medium text-white bg-tomtly-accent rounded-lg hover:bg-forest-700 transition-colors"
            >
              Legg ut tomt
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
          <div className="md:hidden border-t border-brand-200 py-4 space-y-1">
            <Link href="/for-tomteeiere" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-tomtly-accent rounded-lg hover:bg-forest-50">
              Selg tomt
            </Link>
            <Link href="/tomter" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm font-medium text-tomtly-accent rounded-lg hover:bg-forest-50">
              Kjøp tomt
            </Link>
            <Link href="/kart" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-brand-700 rounded-lg hover:bg-brand-50 pl-6">
              Kart
            </Link>
            <Link href="/fradeling" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-brand-700 rounded-lg hover:bg-brand-50">
              Tomtedeling
            </Link>
            <Link href="/tomteanalyse" onClick={() => setMobileOpen(false)} className="block px-3 py-2.5 text-sm text-brand-700 rounded-lg hover:bg-brand-50">
              Tomteanalyse
            </Link>

            <div className="border-t border-brand-100 pt-2 mt-2">
              <p className="px-3 py-1 text-[10px] text-brand-400 uppercase tracking-wide font-semibold">For bransjen</p>
              <Link href="/for-meglere" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg">Meglere</Link>
              <Link href="/for-husleverandorer" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg">Husleverandører</Link>
              <Link href="/for-entreprenorer" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg">Entreprenører</Link>
              <Link href="/for-banker" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg">Banker</Link>
              <Link href="/for-kommuner" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg">Kommuner</Link>
              <Link href="/naering" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg">Næring</Link>
              <Link href="/utvikler" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg">Utviklere</Link>
              <Link href="/aktuelt" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg">Aktuelt</Link>
              <Link href="/samarbeidspartnere" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-600 hover:bg-brand-50 rounded-lg">Samarbeidspartnere</Link>
            </div>

            {!loading && user ? (
              <div className="border-t border-brand-100 pt-2 mt-2">
                {isAdmin && (
                  <Link href="/admin" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-tomtly-accent font-semibold">Admin</Link>
                )}
                <Link href="/min-side" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-700">Min side</Link>
                <button onClick={() => { signOut(); setMobileOpen(false) }} className="block px-3 py-2 text-sm text-brand-500">Logg ut</button>
              </div>
            ) : !loading ? (
              <div className="border-t border-brand-100 pt-2 mt-2">
                <Link href="/logg-inn" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-brand-700">Logg inn</Link>
              </div>
            ) : null}

            <div className="pt-3 border-t border-brand-200 space-y-2">
              <Link
                href="/selger/onboarding"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-tomtly-accent rounded-lg"
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
