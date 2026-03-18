import Link from 'next/link'
import {
  Plus,
  Eye,
  TrendingUp,
  Clock,
  BarChart3,
  MapPin,
  ChevronRight,
} from 'lucide-react'
import { formatNOK, getScoreFarge, getScoreLabel } from '@/lib/utils'

// ============================================================
// SELGER DASHBOARD
// ============================================================

const MINE_TOMTER = [
  {
    id: '1',
    adresse: 'Bjørnemyrveien 24',
    poststed: 'Oppegård',
    status: 'published' as const,
    score: 82,
    visninger: 342,
    henvendelser: 12,
    dager_publisert: 14,
  },
  {
    id: '4',
    adresse: 'Vestbyveien 112',
    poststed: 'Vestby',
    status: 'analyzing' as const,
    score: 0,
    visninger: 0,
    henvendelser: 0,
    dager_publisert: 0,
  },
]

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft: { label: 'Utkast', color: 'bg-brand-100 text-brand-600' },
  analyzing: { label: 'Under analyse', color: 'bg-blue-100 text-blue-700' },
  ready: { label: 'Klar', color: 'bg-green-100 text-green-700' },
  published: { label: 'Publisert', color: 'bg-green-100 text-green-700' },
  sold: { label: 'Solgt', color: 'bg-purple-100 text-purple-700' },
}

export default function SelgerDashboard() {
  return (
    <div className="bg-brand-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-tomtly-dark">
              Mine tomter
            </h1>
            <p className="text-sm text-brand-500">
              Oversikt over dine tomter på Tomtly
            </p>
          </div>
          <Link
            href="/selger/onboarding"
            className="flex items-center gap-2 px-4 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ny tomt
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Totale visninger', value: '342', icon: Eye, change: '+28%' },
            { label: 'Henvendelser', value: '12', icon: TrendingUp, change: '+15%' },
            { label: 'Snitt tomtescore', value: '82', icon: BarChart3, change: '' },
            { label: 'Dager på marked', value: '14', icon: Clock, change: '' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-brand-200 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5 text-brand-400" />
                {stat.change && (
                  <span className="text-xs text-green-600 font-medium">
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-tomtly-dark">{stat.value}</p>
              <p className="text-xs text-brand-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tomtliste */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          <div className="p-4 border-b border-brand-200">
            <h2 className="font-semibold text-tomtly-dark">Dine tomter</h2>
          </div>

          {MINE_TOMTER.map((tomt) => {
            const statusInfo = STATUS_LABELS[tomt.status]
            return (
              <Link
                key={tomt.id}
                href={`/tomter/${tomt.id}`}
                className="flex items-center justify-between p-4 border-b border-brand-100 hover:bg-brand-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-tomtly-dark text-sm">
                      {tomt.adresse}
                    </h3>
                    <p className="text-xs text-brand-500">{tomt.poststed}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className={`px-2 py-1 text-xs rounded-full ${statusInfo.color}`}>
                    {statusInfo.label}
                  </span>

                  {tomt.score > 0 && (
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: getScoreFarge(tomt.score) }}
                    >
                      {tomt.score}
                    </div>
                  )}

                  <div className="hidden md:flex items-center gap-4 text-xs text-brand-500">
                    <span>{tomt.visninger} visninger</span>
                    <span>{tomt.henvendelser} henvendelser</span>
                  </div>

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
