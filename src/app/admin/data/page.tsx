'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import {
  ArrowLeft,
  Database,
  TrendingUp,
  Home,
  Users,
  Scissors,
  BarChart3,
  MapPin,
  RefreshCw,
  Loader2,
} from 'lucide-react'

type TabType = 'marked' | 'aktivitet' | 'kjøper' | 'fradeling'

interface Stats {
  finnTomter: number
  finnNye30d: number
  delesaker: number
  fradelinger: number
  naeringstomter: number
  henvendelser: number
  kjoperprofiler: number
  kandidater: number
}

interface FinnTomt {
  id: string
  adresse: string
  kommune: string
  prisantydning: number | null
  tomtestorrelse_m2: number | null
  status: string
  created_at: string
  megler_firma: string | null
  flagg: string[] | null
}

interface Henvendelse {
  id: string
  type: string
  navn: string | null
  epost: string | null
  created_at: string
  ekstra: Record<string, any> | null
}

export default function DataDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('marked')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({
    finnTomter: 0, finnNye30d: 0, delesaker: 0, fradelinger: 0,
    naeringstomter: 0, henvendelser: 0, kjoperprofiler: 0, kandidater: 0,
  })
  const [finnTomter, setFinnTomter] = useState<FinnTomt[]>([])
  const [henvendelser, setHenvendelser] = useState<Henvendelse[]>([])
  const [kjopere, setKjopere] = useState<any[]>([])

  const supabase = createClient()

  const fetchAll = useCallback(async () => {
    setLoading(true)

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const thirtyDaysStr = thirtyDaysAgo.toISOString()

    const [
      finnRes, finnNyeRes, deleRes, fradRes, naerRes, henvRes, kjopRes, kandRes
    ] = await Promise.all([
      supabase.from('finn_tomter').select('*', { count: 'exact' }).order('created_at', { ascending: false }).limit(200),
      supabase.from('finn_tomter').select('id', { count: 'exact' }).gte('created_at', thirtyDaysStr),
      supabase.from('delesaker').select('id', { count: 'exact' }),
      supabase.from('kartverket_fradelinger').select('id', { count: 'exact' }),
      supabase.from('naeringstomter').select('id', { count: 'exact' }),
      supabase.from('henvendelser').select('*').order('created_at', { ascending: false }).limit(50),
      supabase.from('kjoper_profiler').select('*').order('created_at', { ascending: false }),
      supabase.from('fradelingskandidater').select('id', { count: 'exact' }),
    ])

    setFinnTomter(finnRes.data || [])
    setHenvendelser(henvRes.data || [])
    setKjopere(kjopRes.data || [])

    setStats({
      finnTomter: finnRes.count || finnRes.data?.length || 0,
      finnNye30d: finnNyeRes.count || finnNyeRes.data?.length || 0,
      delesaker: deleRes.count || deleRes.data?.length || 0,
      fradelinger: fradRes.count || fradRes.data?.length || 0,
      naeringstomter: naerRes.count || naerRes.data?.length || 0,
      henvendelser: henvRes.data?.length || 0,
      kjoperprofiler: kjopRes.data?.length || 0,
      kandidater: kandRes.count || kandRes.data?.length || 0,
    })
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const tabs = [
    { key: 'marked' as TabType, label: 'Dataoversikt', icon: BarChart3 },
    { key: 'aktivitet' as TabType, label: 'Henvendelser', icon: TrendingUp },
    { key: 'kjøper' as TabType, label: 'Kjøperprofiler', icon: Users },
    { key: 'fradeling' as TabType, label: 'FINN-tomter', icon: Home },
  ]

  // Compute price stats from real data
  const tomterMedPris = finnTomter.filter(t => t.prisantydning && t.prisantydning > 0)
  const tomterMedAreal = finnTomter.filter(t => t.tomtestorrelse_m2 && t.tomtestorrelse_m2 > 0)
  const snittPrisPerM2 = tomterMedPris.length > 0 && tomterMedAreal.length > 0
    ? Math.round(
        tomterMedPris.reduce((sum, t) => sum + (t.prisantydning || 0), 0) /
        tomterMedAreal.reduce((sum, t) => sum + (t.tomtestorrelse_m2 || 0), 0)
      )
    : null

  // Kommune distribution
  const kommuneCount: Record<string, number> = {}
  finnTomter.forEach(t => {
    if (t.kommune) kommuneCount[t.kommune] = (kommuneCount[t.kommune] || 0) + 1
  })
  const kommuneSorted = Object.entries(kommuneCount).sort((a, b) => b[1] - a[1]).slice(0, 10)
  const maxKommune = kommuneSorted[0]?.[1] || 1

  const fmt = (n: number) => n.toLocaleString('nb-NO')

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-tomtly-dark text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold">Tomtly Data</h1>
              <p className="text-xs text-brand-400">Live data fra Supabase</p>
            </div>
          </div>
          <button
            onClick={fetchAll}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            Oppdater
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
          <StatCard label="FINN-tomter" value={stats.finnTomter} icon={Home} />
          <StatCard label="Nye (30d)" value={stats.finnNye30d} icon={TrendingUp} />
          <StatCard label="Næring" value={stats.naeringstomter} icon={Database} />
          <StatCard label="Delesaker" value={stats.delesaker} icon={Scissors} />
          <StatCard label="GeoNorge" value={stats.fradelinger} icon={MapPin} />
          <StatCard label="Kandidater" value={stats.kandidater} icon={Scissors} />
          <StatCard label="Henvendelser" value={stats.henvendelser} icon={TrendingUp} />
          <StatCard label="Kjøpere" value={stats.kjoperprofiler} icon={Users} />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-6 bg-brand-100 rounded-lg p-1">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === key ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500 hover:text-brand-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Dataoversikt */}
        {activeTab === 'marked' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Totalt tomter i DB" value={String(stats.finnTomter)} />
              <DataCard label="Nye siste 30 dager" value={String(stats.finnNye30d)} />
              <DataCard label="Snitt pris/m²" value={snittPrisPerM2 ? `${fmt(snittPrisPerM2)} kr` : '–'} />
              <DataCard label="Med pris" value={`${tomterMedPris.length} av ${stats.finnTomter}`} />
            </div>

            {kommuneSorted.length > 0 && (
              <div className="bg-white rounded-xl border border-brand-200 p-6">
                <h3 className="font-semibold text-tomtly-dark mb-4">Tomter per kommune (topp 10)</h3>
                <div className="space-y-3">
                  {kommuneSorted.map(([kommune, count]) => (
                    <div key={kommune} className="flex items-center gap-3">
                      <span className="text-sm text-brand-700 w-32 truncate">{kommune}</span>
                      <div className="flex-1 bg-brand-100 rounded-full h-3">
                        <div
                          className="bg-tomtly-accent h-3 rounded-full transition-all"
                          style={{ width: `${Math.round((count / maxKommune) * 100)}%` }}
                        />
                      </div>
                      <span className="text-xs text-brand-500 w-12 text-right">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {finnTomter.length === 0 && !loading && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                <p className="text-amber-800">Ingen FINN-tomter i databasen ennå. Kjør FINN-scraperen fra admin-panelet.</p>
              </div>
            )}
          </div>
        )}

        {/* Henvendelser */}
        {activeTab === 'aktivitet' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Totalt henvendelser" value={String(stats.henvendelser)} />
              <DataCard label="Siste 7 dager" value={String(henvendelser.filter(h => {
                const d = new Date(h.created_at)
                return d > new Date(Date.now() - 7 * 86400000)
              }).length)} />
            </div>

            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="p-4 border-b border-brand-200">
                <h3 className="font-semibold text-tomtly-dark">Siste henvendelser</h3>
              </div>
              {henvendelser.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                        <th className="text-left px-4 py-3 font-medium">Dato</th>
                        <th className="text-left px-4 py-3 font-medium">Type</th>
                        <th className="text-left px-4 py-3 font-medium">Navn</th>
                        <th className="text-left px-4 py-3 font-medium">E-post</th>
                        <th className="text-left px-4 py-3 font-medium">Detaljer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {henvendelser.map(h => (
                        <tr key={h.id} className="border-t border-brand-100 hover:bg-brand-50">
                          <td className="px-4 py-3 text-xs text-brand-500">{new Date(h.created_at).toLocaleDateString('nb-NO')}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">{h.type}</span>
                          </td>
                          <td className="px-4 py-3 font-medium text-tomtly-dark">{h.navn || '–'}</td>
                          <td className="px-4 py-3 text-brand-600">{h.epost || '–'}</td>
                          <td className="px-4 py-3 text-xs text-brand-500 max-w-xs truncate">
                            {h.ekstra ? JSON.stringify(h.ekstra) : '–'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-brand-400">
                  {loading ? 'Henter...' : 'Ingen henvendelser ennå.'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Kjøperprofiler */}
        {activeTab === 'kjøper' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <DataCard label="Registrerte kjøpere" value={String(stats.kjoperprofiler)} />
            </div>

            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="p-4 border-b border-brand-200">
                <h3 className="font-semibold text-tomtly-dark">Kjøperprofiler</h3>
              </div>
              {kjopere.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                        <th className="text-left px-4 py-3 font-medium">Navn</th>
                        <th className="text-left px-4 py-3 font-medium">E-post</th>
                        <th className="text-left px-4 py-3 font-medium">Kommuner</th>
                        <th className="text-right px-4 py-3 font-medium">Budsjett</th>
                        <th className="text-right px-4 py-3 font-medium">Areal</th>
                        <th className="text-left px-4 py-3 font-medium">Registrert</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kjopere.map((k: any) => (
                        <tr key={k.id} className="border-t border-brand-100 hover:bg-brand-50">
                          <td className="px-4 py-3 font-medium text-tomtly-dark">{k.navn || '–'}</td>
                          <td className="px-4 py-3 text-brand-600">{k.email || '–'}</td>
                          <td className="px-4 py-3 text-brand-600">{Array.isArray(k.kommune) ? k.kommune.join(', ') : k.kommune || '–'}</td>
                          <td className="px-4 py-3 text-right text-brand-600">
                            {k.budsjett_min || k.budsjett_maks
                              ? `${k.budsjett_min ? fmt(k.budsjett_min) : '?'} – ${k.budsjett_maks ? fmt(k.budsjett_maks) : '?'}`
                              : '–'}
                          </td>
                          <td className="px-4 py-3 text-right text-brand-600">
                            {k.areal_min || k.areal_maks
                              ? `${k.areal_min || '?'} – ${k.areal_maks || '?'} m²`
                              : '–'}
                          </td>
                          <td className="px-4 py-3 text-xs text-brand-500">
                            {k.created_at ? new Date(k.created_at).toLocaleDateString('nb-NO') : '–'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-brand-400">
                  {loading ? 'Henter...' : 'Ingen kjøperprofiler registrert ennå. Profiler opprettes via /tomt-varsling.'}
                </div>
              )}
            </div>
          </div>
        )}

        {/* FINN-tomter */}
        {activeTab === 'fradeling' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <DataCard label="Totalt i DB" value={String(stats.finnTomter)} />
              <DataCard label="Nye (status)" value={String(finnTomter.filter(t => t.status === 'ny').length)} />
              <DataCard label="Tvangssalg" value={String(finnTomter.filter(t => t.flagg?.includes('tvangssalg')).length)} />
              <DataCard label="Dødsbo" value={String(finnTomter.filter(t => t.flagg?.includes('dødsbo')).length)} />
            </div>

            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="p-4 border-b border-brand-200">
                <h3 className="font-semibold text-tomtly-dark">Siste FINN-tomter</h3>
              </div>
              {finnTomter.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                        <th className="text-left px-4 py-3 font-medium">Adresse</th>
                        <th className="text-left px-4 py-3 font-medium">Kommune</th>
                        <th className="text-right px-4 py-3 font-medium">Pris</th>
                        <th className="text-right px-4 py-3 font-medium">Areal</th>
                        <th className="text-left px-4 py-3 font-medium">Megler</th>
                        <th className="text-left px-4 py-3 font-medium">Status</th>
                        <th className="text-left px-4 py-3 font-medium">Flagg</th>
                        <th className="text-left px-4 py-3 font-medium">Lagt til</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finnTomter.slice(0, 50).map(t => (
                        <tr key={t.id} className="border-t border-brand-100 hover:bg-brand-50">
                          <td className="px-4 py-3 font-medium text-tomtly-dark max-w-xs truncate">{t.adresse || '–'}</td>
                          <td className="px-4 py-3 text-brand-600">{t.kommune || '–'}</td>
                          <td className="px-4 py-3 text-right text-brand-600">{t.prisantydning ? `${fmt(t.prisantydning)} kr` : '–'}</td>
                          <td className="px-4 py-3 text-right text-brand-600">{t.tomtestorrelse_m2 ? `${fmt(t.tomtestorrelse_m2)} m²` : '–'}</td>
                          <td className="px-4 py-3 text-brand-600 text-xs">{t.megler_firma || '–'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              t.status === 'ny' ? 'bg-blue-100 text-blue-800' :
                              t.status === 'kontaktet' ? 'bg-yellow-100 text-yellow-800' :
                              t.status === 'kunde' ? 'bg-green-100 text-green-800' :
                              'bg-gray-100 text-gray-600'
                            }`}>{t.status}</span>
                          </td>
                          <td className="px-4 py-3">
                            {t.flagg?.map(f => (
                              <span key={f} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-red-100 text-red-700 mr-1">{f}</span>
                            ))}
                          </td>
                          <td className="px-4 py-3 text-xs text-brand-500">{new Date(t.created_at).toLocaleDateString('nb-NO')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-brand-400">
                  {loading ? 'Henter...' : 'Ingen FINN-tomter i databasen. Kjør FINN-scraperen for å hente data.'}
                </div>
              )}
              {finnTomter.length > 50 && (
                <div className="px-4 py-3 bg-brand-50 border-t border-brand-200 text-xs text-brand-500">
                  Viser 50 av {finnTomter.length}. Se alle i FINN-admin.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-4 text-center">
      <Icon className="w-4 h-4 text-brand-400 mx-auto mb-1" />
      <p className="text-xl font-bold text-tomtly-dark">{value}</p>
      <p className="text-[10px] text-brand-500">{label}</p>
    </div>
  )
}

function DataCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-5">
      <p className="text-2xl font-bold text-tomtly-dark">{value}</p>
      <p className="text-xs font-medium text-brand-700 mt-1">{label}</p>
    </div>
  )
}
