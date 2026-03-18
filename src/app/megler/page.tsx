import Link from 'next/link'
import {
  Plus,
  Eye,
  TrendingUp,
  Building2,
  BarChart3,
  MapPin,
  ChevronRight,
  Users,
  FileText,
} from 'lucide-react'
import { formatNOK, getScoreFarge } from '@/lib/utils'

// ============================================================
// MEGLER DASHBOARD – Porteføljeoversikt
// ============================================================

const PORTEFOLJE = [
  { id: '1', adresse: 'Bjørnemyrveien 24', poststed: 'Oppegård', eier: 'Ola Nordmann', status: 'published', score: 82, visninger: 342 },
  { id: '2', adresse: 'Solveien 8', poststed: 'Ski', eier: 'Kari Hansen', status: 'published', score: 74, visninger: 218 },
  { id: '3', adresse: 'Granåsveien 15', poststed: 'Kolbotn', eier: 'Per Olsen', status: 'analyzing', score: 0, visninger: 0 },
  { id: '5', adresse: 'Skogsveien 3', poststed: 'Drøbak', eier: 'Liv Berg', status: 'ready', score: 77, visninger: 0 },
]

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Utkast', color: 'bg-brand-100 text-brand-600' },
  analyzing: { label: 'Under analyse', color: 'bg-blue-100 text-blue-700' },
  ready: { label: 'Klar til publisering', color: 'bg-amber-100 text-amber-700' },
  published: { label: 'Publisert', color: 'bg-green-100 text-green-700' },
  sold: { label: 'Solgt', color: 'bg-purple-100 text-purple-700' },
}

export default function MeglerDashboard() {
  return (
    <div className="bg-brand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-5 h-5 text-tomtly-accent" />
              <h1 className="font-display text-2xl font-bold text-tomtly-dark">
                Meglerdashboard
              </h1>
            </div>
            <p className="text-sm text-brand-500">
              Krogsveen Oppegård – Megler Pro · 4 av 5 tomter brukt · 5 000 kr per ekstra tomt
            </p>
          </div>
          <Link
            href="/selger/onboarding"
            className="flex items-center gap-2 px-4 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Legg til tomt
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Aktive tomter', value: '4', icon: MapPin },
            { label: 'Totale visninger', value: '560', icon: Eye },
            { label: 'Henvendelser', value: '28', icon: TrendingUp },
            { label: 'Snitt score', value: '78', icon: BarChart3 },
            { label: 'Solgt i år', value: '2', icon: FileText },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-brand-200 p-5"
            >
              <stat.icon className="w-5 h-5 text-brand-400 mb-3" />
              <p className="text-2xl font-bold text-tomtly-dark">{stat.value}</p>
              <p className="text-xs text-brand-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Portefølje */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-brand-200">
            <h2 className="font-semibold text-tomtly-dark">Tomteportefølje</h2>
            <div className="flex gap-2">
              <select className="px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-lg text-xs">
                <option>Alle statuser</option>
                <option>Publisert</option>
                <option>Under analyse</option>
              </select>
            </div>
          </div>

          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-brand-50 text-xs text-brand-500 font-medium border-b border-brand-200">
            <div className="col-span-4">Tomt</div>
            <div className="col-span-2">Eier</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-center">Score</div>
            <div className="col-span-2 text-center">Visninger</div>
            <div className="col-span-1"></div>
          </div>

          {PORTEFOLJE.map((tomt) => {
            const statusInfo = STATUS_LABELS[tomt.status]
            return (
              <Link
                key={tomt.id}
                href={`/tomter/${tomt.id}`}
                className="grid grid-cols-12 gap-4 items-center p-4 border-b border-brand-100 hover:bg-brand-50 transition-colors"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-tomtly-dark">{tomt.adresse}</p>
                    <p className="text-xs text-brand-500">{tomt.poststed}</p>
                  </div>
                </div>
                <div className="col-span-2 text-sm text-brand-600">{tomt.eier}</div>
                <div className="col-span-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>
                </div>
                <div className="col-span-1 text-center">
                  {tomt.score > 0 ? (
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-xs font-bold"
                      style={{ backgroundColor: getScoreFarge(tomt.score) }}
                    >
                      {tomt.score}
                    </span>
                  ) : (
                    <span className="text-xs text-brand-400">–</span>
                  )}
                </div>
                <div className="col-span-2 text-center text-sm text-brand-600">
                  {tomt.visninger || '–'}
                </div>
                <div className="col-span-1 text-right">
                  <ChevronRight className="w-4 h-4 text-brand-400" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
