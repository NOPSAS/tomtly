'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { ArrowLeft, Play, Users, MapPin, Target, ChevronRight } from 'lucide-react'

interface Match {
  kjoper: {
    id: string
    navn: string
    email: string
    kommune: string[]
    budsjett_min: number
    budsjett_maks: number
    areal_min: number
    areal_maks: number
  }
  tomt: {
    id: string
    adresse: string
    kommune: string
    areal: number
    prisantydning: number
  }
  score: number
  grunner: string[]
}

interface Stats {
  antall_kjopere: number
  antall_tomter: number
  antall_matches: number
}

const STATUS_OPTIONS = [
  { value: 'identifisert', label: 'Identifisert', color: 'bg-blue-100 text-blue-700' },
  { value: 'eier_kontaktet', label: 'Eier kontaktet', color: 'bg-amber-100 text-amber-700' },
  { value: 'eier_interessert', label: 'Eier interessert', color: 'bg-purple-100 text-purple-700' },
  { value: 'fradeling', label: 'Fradeling', color: 'bg-orange-100 text-orange-700' },
  { value: 'solgt', label: 'Solgt', color: 'bg-green-100 text-green-700' },
]

function genererPitch(match: Match): string {
  const budsjettStr = match.kjoper.budsjett_maks
    ? `${(match.kjoper.budsjett_maks / 1_000_000).toFixed(1)} MNOK`
    : 'fleksibelt budsjett'
  return `Vi har en kvalifisert kjøper med budsjett på ${budsjettStr} som søker tomt i ${match.tomt.kommune}. Tomten på ${match.tomt.adresse} (${match.tomt.areal} m\u00B2) matcher kriteriene. Ønsker eier å selge hele eller deler av tomten?`
}

export default function MatchingDashboard() {
  const { isAdmin, loading: authLoading } = useAuth()
  const [matches, setMatches] = useState<Match[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [statuser, setStatuser] = useState<Record<string, string>>({})

  const kjorMatching = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/match-kjopere', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
      } else {
        setMatches(data.matches || [])
        setStats(data.stats || null)
      }
    } catch {
      setError('Kunne ikke kjøre matching')
    }
    setLoading(false)
  }

  if (authLoading) {
    return <div className="min-h-screen bg-brand-50 flex items-center justify-center"><p className="text-brand-500">Laster...</p></div>
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-tomtly-dark text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="hover:text-brand-300 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display text-lg font-bold">Kjøper–Tomt Matching</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-brand-500">
              Matcher registrerte kjøperprofiler mot tilgjengelige tomter basert på kommune, budsjett og areal.
            </p>
          </div>
          <button
            onClick={kjorMatching}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50"
          >
            <Play className="w-4 h-4" />
            {loading ? 'Kjører...' : 'Kjør matching'}
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <Users className="w-5 h-5 text-brand-400 mb-2" />
              <p className="text-2xl font-bold text-tomtly-dark">{stats.antall_kjopere}</p>
              <p className="text-xs text-brand-500">Kjøpere</p>
            </div>
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <MapPin className="w-5 h-5 text-brand-400 mb-2" />
              <p className="text-2xl font-bold text-tomtly-dark">{stats.antall_tomter}</p>
              <p className="text-xs text-brand-500">Tomter</p>
            </div>
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <Target className="w-5 h-5 text-tomtly-accent mb-2" />
              <p className="text-2xl font-bold text-tomtly-accent">{stats.antall_matches}</p>
              <p className="text-xs text-brand-500">Matches</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Matches table */}
        {matches.length > 0 && (
          <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
            <div className="p-4 border-b border-brand-200">
              <h2 className="font-semibold text-tomtly-dark">Matches ({matches.length})</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-50 border-b border-brand-200">
                    <th className="text-left px-4 py-3 text-xs font-medium text-brand-500">Kjøper</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-brand-500">Tomt</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-brand-500">Match</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-brand-500">Pitch</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-brand-500">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-100">
                  {matches.map((m, idx) => {
                    const key = `${m.kjoper.id}-${m.tomt.id}`
                    const currentStatus = statuser[key] || 'identifisert'
                    const statusInfo = STATUS_OPTIONS.find(s => s.value === currentStatus) || STATUS_OPTIONS[0]

                    return (
                      <tr key={idx} className="hover:bg-brand-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-tomtly-dark">{m.kjoper.navn}</p>
                          <p className="text-xs text-brand-500">
                            {m.kjoper.kommune?.join(', ')} &middot;{' '}
                            {m.kjoper.budsjett_maks ? `${(m.kjoper.budsjett_maks / 1_000_000).toFixed(1)} MNOK` : '–'}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="font-medium text-tomtly-dark">{m.tomt.adresse}</p>
                          <p className="text-xs text-brand-500">
                            {m.tomt.kommune} &middot; {m.tomt.areal} m&sup2; &middot;{' '}
                            {m.tomt.prisantydning ? `${(m.tomt.prisantydning / 1_000_000).toFixed(1)} MNOK` : '–'}
                          </p>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold ${
                            m.score >= 80 ? 'bg-green-100 text-green-700' :
                            m.score >= 60 ? 'bg-amber-100 text-amber-700' :
                            'bg-brand-100 text-brand-600'
                          }`}>
                            {m.score}
                          </span>
                        </td>
                        <td className="px-4 py-3 max-w-xs">
                          <p className="text-xs text-brand-600 line-clamp-3">{genererPitch(m)}</p>
                        </td>
                        <td className="px-4 py-3">
                          <select
                            value={currentStatus}
                            onChange={(e) => setStatuser(prev => ({ ...prev, [key]: e.target.value }))}
                            className={`px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-300 ${statusInfo.color}`}
                          >
                            {STATUS_OPTIONS.map(s => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && matches.length === 0 && stats === null && (
          <div className="bg-white rounded-xl border border-brand-200 p-12 text-center">
            <Target className="w-12 h-12 text-brand-300 mx-auto mb-4" />
            <h3 className="font-semibold text-tomtly-dark mb-2">Ingen matching kjørt ennå</h3>
            <p className="text-sm text-brand-500 mb-6">
              Klikk &laquo;Kjør matching&raquo; for å finne kjøpere som passer til tilgjengelige tomter.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
