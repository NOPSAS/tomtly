'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Search, X, ChevronRight } from 'lucide-react'
import { formatNOK, formatM2, getScoreFarge } from '@/lib/utils'

// ============================================================
// KARTSIDEN – Fullskjermskart over Norge med tomter
// ============================================================

const DEMO_TOMTER = [
  { id: '1', adresse: 'Bjørnemyrveien 24', poststed: 'Oppegård', areal_m2: 1240, score: 82, pris: 4500000, lat: 59.79, lng: 10.81 },
  { id: '2', adresse: 'Solveien 8', poststed: 'Ski', areal_m2: 890, score: 74, pris: 3200000, lat: 59.72, lng: 10.83 },
  { id: '3', adresse: 'Granåsveien 15', poststed: 'Kolbotn', areal_m2: 2100, score: 91, pris: 8500000, lat: 59.80, lng: 10.80 },
]

export default function KartSide() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const selected = DEMO_TOMTER.find((t) => t.id === selectedId)

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
              className="w-full pl-10 pr-4 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <p className="text-xs text-brand-400 mt-2">
            {DEMO_TOMTER.length} tomter i kartet
          </p>
        </div>

        {/* Liste */}
        <div className="flex-1 overflow-y-auto">
          {DEMO_TOMTER.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedId(t.id)}
              className={`w-full text-left p-4 border-b border-brand-100 hover:bg-brand-50 transition-colors ${
                selectedId === t.id ? 'bg-forest-50 border-l-2 border-l-tomtly-accent' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-tomtly-dark">{t.adresse}</h3>
                  <p className="text-xs text-brand-500">{t.poststed}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-brand-500">{formatM2(t.areal_m2)}</span>
                    <span className="text-xs font-semibold text-tomtly-dark">{formatNOK(t.pris)}</span>
                  </div>
                </div>
                <div
                  className="flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold"
                  style={{ backgroundColor: getScoreFarge(t.score) }}
                >
                  {t.score}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Kart */}
      <div className="flex-1 bg-brand-100 relative">
        {/* I produksjon: Mapbox GL JS */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-brand-300 mx-auto mb-4" />
            <p className="text-lg text-brand-400 font-medium">Mapbox kart</p>
            <p className="text-sm text-brand-300 mt-1">
              Interaktivt kart med tomtemarkører vises her
            </p>
          </div>
        </div>

        {/* Tomt-pins (visuell representasjon) */}
        {DEMO_TOMTER.map((t) => (
          <div
            key={t.id}
            className="absolute cursor-pointer"
            style={{
              top: `${30 + Math.random() * 40}%`,
              left: `${20 + Math.random() * 60}%`,
            }}
            onClick={() => setSelectedId(t.id)}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg ${
                selectedId === t.id ? 'scale-125' : ''
              } transition-transform`}
              style={{ backgroundColor: getScoreFarge(t.score) }}
            >
              {t.score}
            </div>
          </div>
        ))}

        {/* Popup for valgt tomt */}
        {selected && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl border border-brand-200 p-4 w-80">
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-2 right-2 p-1 hover:bg-brand-100 rounded"
            >
              <X className="w-4 h-4 text-brand-400" />
            </button>
            <h3 className="font-semibold text-tomtly-dark">{selected.adresse}</h3>
            <p className="text-sm text-brand-500">{selected.poststed}</p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-100">
              <span className="text-sm text-brand-600">{formatM2(selected.areal_m2)}</span>
              <span className="font-semibold text-tomtly-dark">{formatNOK(selected.pris)}</span>
            </div>
            <Link
              href={`/tomter/${selected.id}`}
              className="mt-3 flex items-center justify-center gap-1 w-full px-3 py-2 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Se tomten
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
