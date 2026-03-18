'use client'

import Link from 'next/link'
import { MapPin, ShoppingBag, User, Lock } from 'lucide-react'

export default function MinSidePage() {
  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="font-display text-2xl font-bold text-tomtly-dark">
            Min side
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Login prompt */}
        <div className="bg-white rounded-xl border border-brand-200 p-8 text-center mb-10">
          <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-brand-400" />
          </div>
          <h2 className="text-lg font-semibold text-tomtly-dark mb-2">
            Logg inn for å se dine tomter og bestillinger
          </h2>
          <p className="text-sm text-brand-500 mb-6 max-w-md mx-auto">
            Brukerportalen er under utvikling. Snart kan du logge inn og se alle
            dine tomter, bestillinger og profilinnstillinger.
          </p>
          <Link
            href="/logg-inn"
            className="inline-flex px-6 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Logg inn
          </Link>
        </div>

        {/* Preview sections */}
        <h3 className="text-sm font-semibold text-brand-500 uppercase tracking-wide mb-4">
          Forhåndsvisning av portalen
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-brand-200 p-6 text-center">
            <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5 text-tomtly-accent" />
            </div>
            <h4 className="font-semibold text-tomtly-dark mb-1">Mine tomter</h4>
            <p className="text-xs text-brand-500">
              Se status, analyse og visninger for dine tomter.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-brand-200 p-6 text-center">
            <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ShoppingBag className="w-5 h-5 text-tomtly-accent" />
            </div>
            <h4 className="font-semibold text-tomtly-dark mb-1">Bestillinger</h4>
            <p className="text-xs text-brand-500">
              Oversikt over analyser, abonnementer og fakturaer.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-brand-200 p-6 text-center">
            <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <User className="w-5 h-5 text-tomtly-accent" />
            </div>
            <h4 className="font-semibold text-tomtly-dark mb-1">Profil</h4>
            <p className="text-xs text-brand-500">
              Oppdater kontaktinfo, firma og innstillinger.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
