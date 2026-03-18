'use client'

import { useState } from 'react'
import { MapPin, Users, Mail, TrendingUp, AlertCircle } from 'lucide-react'

const TOMTER = [
  { adresse: 'Bjørnemyrveien 20', poststed: 'Bjørnemyr, Nesodden', status: 'Publisert', statusColor: 'bg-green-100 text-green-700', score: 84 },
  { adresse: 'Bjørnemyrveien 22', poststed: 'Bjørnemyr, Nesodden', status: 'Publisert', statusColor: 'bg-green-100 text-green-700', score: 80 },
  { adresse: 'Gamle Alværnvei 67', poststed: 'Alværn, Nesodden', status: 'Publisert', statusColor: 'bg-green-100 text-green-700', score: 86 },
]

export default function AdminPage() {
  const [tab, setTab] = useState<'tomter' | 'kunder' | 'henvendelser'>('tomter')

  const stats = [
    { label: 'Totalt tomter', value: '3', ikon: MapPin },
    { label: 'Aktive kunder', value: '0', ikon: Users },
    { label: 'Henvendelser', value: '0', ikon: Mail },
    { label: 'MRR', value: '0 kr', ikon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="font-display text-2xl font-bold text-tomtly-dark">
            Admin – Tomtly
          </h1>
          <p className="text-sm text-brand-500 mt-1">Oversikt over plattformen</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-brand-200 p-5">
              <s.ikon className="w-5 h-5 text-brand-400 mb-3" />
              <p className="text-2xl font-bold text-tomtly-dark">{s.value}</p>
              <p className="text-xs text-brand-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          <div className="flex border-b border-brand-200">
            {(['tomter', 'kunder', 'henvendelser'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  tab === t
                    ? 'text-tomtly-accent border-b-2 border-tomtly-accent'
                    : 'text-brand-500 hover:text-brand-700'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {tab === 'tomter' && (
              <div>
                <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-brand-50 text-xs text-brand-500 font-medium rounded-lg mb-2">
                  <div className="col-span-5">Adresse</div>
                  <div className="col-span-3">Poststed</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2 text-center">Score</div>
                </div>
                {TOMTER.map((t) => (
                  <div key={t.adresse} className="grid grid-cols-12 gap-4 items-center px-4 py-3 border-b border-brand-100 last:border-0">
                    <div className="col-span-5 flex items-center gap-3">
                      <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-brand-400" />
                      </div>
                      <span className="text-sm font-medium text-tomtly-dark">{t.adresse}</span>
                    </div>
                    <div className="col-span-3 text-sm text-brand-600">{t.poststed}</div>
                    <div className="col-span-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${t.statusColor}`}>{t.status}</span>
                    </div>
                    <div className="col-span-2 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-tomtly-accent text-white text-xs font-bold">
                        {t.score}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === 'kunder' && (
              <div className="text-center py-12">
                <Users className="w-10 h-10 text-brand-300 mx-auto mb-3" />
                <p className="text-brand-500 font-medium">Ingen kunder ennå</p>
                <p className="text-sm text-brand-400 mt-1">Kunder vil vises her når de registrerer seg.</p>
              </div>
            )}

            {tab === 'henvendelser' && (
              <div className="text-center py-12">
                <Mail className="w-10 h-10 text-brand-300 mx-auto mb-3" />
                <p className="text-brand-500 font-medium">Ingen henvendelser ennå</p>
                <p className="text-sm text-brand-400 mt-1">Henvendelser fra skjemaer vil vises her.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            Kobles til Supabase for live data. Denne siden er en statisk mockup.
          </p>
        </div>
      </div>
    </div>
  )
}
