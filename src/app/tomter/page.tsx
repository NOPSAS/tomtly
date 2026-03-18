import Link from 'next/link'
import { MapPin, SlidersHorizontal, Search, ArrowUpDown } from 'lucide-react'
import { formatNOK, formatM2, getScoreFarge } from '@/lib/utils'

// ============================================================
// TOMTLISTE – Alle tomter med filtrering og sortering
// ============================================================

const DEMO_TOMTER = [
  { id: 'bjornemyrveien-20', adresse: 'Bjørnemyrveien 20', poststed: 'Bjørnemyr', kommune: 'Nesodden', areal_m2: 605, score: 84, pris: 3000000, type: 'Eneboligtomt – flat', bilde: '/tomter/bjornemyrveien-shared/render-parsell-b.jpg' },
  { id: 'bjornemyrveien-22', adresse: 'Bjørnemyrveien 22', poststed: 'Bjørnemyr', kommune: 'Nesodden', areal_m2: 613, score: 80, pris: 3000000, type: 'Eneboligtomt – skrå', bilde: '/tomter/bjornemyrveien-shared/render-parsell-c.jpg' },
  { id: 'alvaern-67', adresse: 'Gamle Alværnvei 67', poststed: 'Alværn', kommune: 'Nesodden', areal_m2: 900, score: 86, pris: 3200000, type: 'Eneboligtomt – fjordutsikt', bilde: '/tomter/alvaern-shared/alvaern-render-aerial-1-DvVXdDku.jpg' },
]

export default function TomtListeSide() {
  return (
    <div className="bg-brand-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl font-bold text-tomtly-dark mb-2">
            Alle tomter
          </h1>
          <p className="text-brand-600">
            {DEMO_TOMTER.length} tomter med ferdig analyse og mulighetsstudie
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
                className="w-full pl-10 pr-4 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
              />
            </div>

            <select className="px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700">
              <option>Alle kommuner</option>
              <option>Nordre Follo</option>
              <option>Vestby</option>
              <option>Frogn</option>
              <option>Ås</option>
            </select>

            <select className="px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700">
              <option>Alle typer</option>
              <option>Eneboligtomt</option>
              <option>Tomannsboligtomt</option>
              <option>Utviklingstomt</option>
            </select>

            <select className="px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700">
              <option>Min. score: 0</option>
              <option>Min. score: 50</option>
              <option>Min. score: 70</option>
              <option>Min. score: 80</option>
            </select>

            <button className="flex items-center gap-2 px-3 py-2.5 border border-brand-200 rounded-lg text-sm text-brand-700 hover:bg-brand-50">
              <ArrowUpDown className="w-4 h-4" />
              Score (høyest)
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEMO_TOMTER.map((t) => (
            <Link
              key={t.id}
              href={`/tomter/${t.id}`}
              className="group bg-white border border-brand-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-brand-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {'bilde' in t && t.bilde && <img src={t.bilde as string} alt={t.adresse} className="absolute inset-0 w-full h-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-3 right-3">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: getScoreFarge(t.score) }}
                  >
                    {t.score}
                  </div>
                </div>
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
      </div>
    </div>
  )
}
