'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, ChevronRight } from 'lucide-react'
import { formatNOK, formatM2 } from '@/lib/utils'

// ============================================================
// KARTSIDEN – OpenStreetMap med ekte tomter
// ============================================================

const TOMTER = [
  { id: 'bjornemyrveien-20', adresse: 'Bjørnemyrveien 20', poststed: 'Bjørnemyr', kommune: 'Nesodden', areal_m2: 605, pris: 3000000, bilde: '/tomter/bjornemyrveien-shared/render-parsell-b.jpg' },
  { id: 'bjornemyrveien-22', adresse: 'Bjørnemyrveien 22', poststed: 'Bjørnemyr', kommune: 'Nesodden', areal_m2: 613, pris: 3000000, bilde: '/tomter/bjornemyrveien-shared/render-parsell-c.jpg' },
  { id: 'alvaern-67', adresse: 'Gamle Alværnvei 67', poststed: 'Alværn', kommune: 'Nesodden', areal_m2: 900, pris: 3200000, bilde: '/tomter/alvaern-shared/alvaern-render-aerial-1-DvVXdDku.jpg' },
]

export default function KartSide() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const filtered = search
    ? TOMTER.filter(
        (t) =>
          t.adresse.toLowerCase().includes(search.toLowerCase()) ||
          t.poststed.toLowerCase().includes(search.toLowerCase()) ||
          t.kommune.toLowerCase().includes(search.toLowerCase())
      )
    : TOMTER

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r border-brand-200 flex flex-col overflow-hidden">
        {/* Søk */}
        <div className="p-4 border-b border-brand-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
            <input
              type="text"
              placeholder="Søk kommune, sted..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <p className="text-xs text-brand-400 mt-2">
            {filtered.length} tomter i kartet
          </p>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto">
          {filtered.map((t) => (
            <div
              key={t.id}
              className={`border-b border-brand-100 transition-colors ${
                selectedId === t.id ? 'bg-forest-50 border-l-2 border-l-tomtly-accent' : ''
              }`}
            >
              <button
                onClick={() => setSelectedId(selectedId === t.id ? null : t.id)}
                className="w-full text-left p-4 hover:bg-brand-50 transition-colors"
              >
                <div>
                  <h3 className="font-semibold text-sm text-tomtly-dark">{t.adresse}</h3>
                  <p className="text-xs text-brand-500">{t.poststed}, {t.kommune}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-brand-500">{formatM2(t.areal_m2)}</span>
                    <span className="text-xs font-semibold text-tomtly-dark">{formatNOK(t.pris)}</span>
                  </div>
                </div>
              </button>
              {selectedId === t.id && (
                <div className="px-4 pb-4">
                  <Link
                    href={`/tomter/${t.id}`}
                    className="flex items-center justify-center gap-1 w-full px-3 py-2 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 transition-colors"
                  >
                    Se tomten
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Kart – OpenStreetMap embed sentrert på Nesodden */}
      <div className="flex-1 relative">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=10.55,59.78,10.70,59.87&layer=mapnik"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          title="Kart over Nesodden med tilgjengelige tomter"
        />
      </div>
    </div>
  )
}
