'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Info } from 'lucide-react'

export default function LoggInnPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login')

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-tomtly-accent rounded-md flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-tomtly-dark">Tomtly</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-brand-200">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === 'login'
                  ? 'text-tomtly-accent border-b-2 border-tomtly-accent'
                  : 'text-brand-500 hover:text-brand-700'
              }`}
            >
              Logg inn
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === 'register'
                  ? 'text-tomtly-accent border-b-2 border-tomtly-accent'
                  : 'text-brand-500 hover:text-brand-700'
              }`}
            >
              Opprett konto
            </button>
          </div>

          <div className="p-6">
            {/* Info banner */}
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                Innlogging kommer snart. Vi jobber med brukerportalen og gir beskjed når den er klar.
              </p>
            </div>

            {tab === 'login' ? (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post</label>
                  <input
                    type="email"
                    placeholder="din@epost.no"
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Passord</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled
                  className="w-full py-3 bg-brand-300 text-white font-medium rounded-lg cursor-not-allowed"
                >
                  Logg inn
                </button>
              </form>
            ) : (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Navn</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Telefon</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Passord</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Bekreft passord</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Firmanavn (valgfritt)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Rolle</label>
                  <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
                    <option value="tomteeier">Tomteeier</option>
                    <option value="megler">Megler</option>
                    <option value="utvikler">Utvikler</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled
                  className="w-full py-3 bg-brand-300 text-white font-medium rounded-lg cursor-not-allowed"
                >
                  Opprett konto
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-brand-400 mt-6">
          Spørsmål? Kontakt oss på hey@nops.no
        </p>
      </div>
    </div>
  )
}
