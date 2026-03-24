'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { formatNOK, formatM2 } from '@/lib/utils'

// ============================================================
// TOMTLISTE – Alle tomter med filtrering og sortering
// ============================================================

const TOMTER = [
  { id: 'alvaern-65', adresse: 'Gamle Alværnvei 65', poststed: 'Alværn', kommune: 'Nesodden', areal_m2: 2274, pris: 3200000, type: 'Eneboligtomt', bilde: '/tomter/alvaern-65/render-cam-02.jpg', solgt: true },
  { id: 'bjornemyrveien-20', adresse: 'Bjørnemyrveien 20', poststed: 'Bjørnemyr', kommune: 'Nesodden', areal_m2: 605, pris: 3000000, type: 'Eneboligtomt', bilde: '/tomter/bjornemyrveien-shared/render-parsell-b.jpg' },
  { id: 'bjornemyrveien-22', adresse: 'Bjørnemyrveien 22', poststed: 'Bjørnemyr', kommune: 'Nesodden', areal_m2: 613, pris: 3000000, type: 'Eneboligtomt', bilde: '/tomter/bjornemyrveien-shared/render-parsell-c.jpg' },
  { id: 'alvaern-67', adresse: 'Gamle Alværnvei 67', poststed: 'Alværn', kommune: 'Nesodden', areal_m2: 900, pris: 3200000, type: 'Eneboligtomt', bilde: '/tomter/alvaern-shared/alvaern-render-aerial-1-DvVXdDku.jpg' },
]

const KOMMUNER = [...new Set(TOMTER.map((t) => t.kommune))]
const TYPER = [...new Set(TOMTER.map((t) => t.type))]

type SortOption = 'pris_asc' | 'pris_desc' | 'areal_desc'

export default function TomtListeSide() {
  const [search, setSearch] = useState('')
  const [kommune, setKommune] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState<SortOption>('pris_asc')

  const filtered = useMemo(() => {
    let result = TOMTER

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) =>
          t.adresse.toLowerCase().includes(q) ||
          t.poststed.toLowerCase().includes(q) ||
          t.kommune.toLowerCase().includes(q)
      )
    }

    if (kommune) {
      result = result.filter((t) => t.kommune === kommune)
    }

    if (type) {
      result = result.filter((t) => t.type === type)
    }

    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'pris_asc': return a.pris - b.pris
        case 'pris_desc': return b.pris - a.pris
        case 'areal_desc': return b.areal_m2 - a.areal_m2
        default: return 0
      }
    })

    return result
  }, [search, kommune, type, sort])

  return (
    <div className="bg-brand-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl font-bold text-tomtly-dark mb-2">
            Alle tomter
          </h1>
          <p className="text-brand-600">
            {filtered.length} tomter med ferdig analyse og mulighetsstudie
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
              <input
                type="text"
                placeholder="Søk på adresse, kommune..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
              />
            </div>

            <select
              value={kommune}
              onChange={(e) => setKommune(e.target.value)}
              className="px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700"
            >
              <option value="">Alle kommuner</option>
              {KOMMUNER.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700"
            >
              <option value="">Alle typer</option>
              {TYPER.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700"
            >
              <option value="pris_asc">Pris (lavest)</option>
              <option value="pris_desc">Pris (høyest)</option>
              <option value="areal_desc">Areal (størst)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-brand-400">Ingen tomter matcher filteret ditt.</p>
            <button
              onClick={() => { setSearch(''); setKommune(''); setType('') }}
              className="mt-3 text-sm text-tomtly-accent hover:underline"
            >
              Nullstill filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <Link
                key={t.id}
                href={`/tomter/${t.id}`}
                className="group bg-white border border-brand-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className={`aspect-[4/3] bg-brand-100 relative ${(t as any).solgt ? 'opacity-80' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.bilde} alt={t.adresse} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {(t as any).solgt && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full -rotate-6 shadow-lg">
                      SOLGT
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-brand-800">
                      {t.type}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-tomtly-dark group-hover:text-tomtly-accent transition-colors">
                    {t.adresse}
                  </h3>
                  <p className="text-sm text-brand-500">{t.poststed}, {t.kommune}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-100">
                    <span className="text-sm text-brand-600">{formatM2(t.areal_m2)}</span>
                    <span className="font-semibold text-tomtly-dark">{formatNOK(t.pris)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
