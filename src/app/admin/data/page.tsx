'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3, Users, Eye, Monitor, Smartphone, Tablet,
  Globe, Loader2, RefreshCw, TrendingUp
} from 'lucide-react'

interface Analytics {
  totalt: number
  iDag: number
  siste7Dager: number
  siste30Dager: number
  sisteAar: number
  toppSider: Array<{ path: string; views: number }>
  enheter: Array<{ device: string; views: number }>
  toppReferrere: Array<{ referrer: string; views: number }>
  dagligVisninger: Array<{ dag: string; views: number; unike: number }>
  unikkeSessjoner: Array<{ total: number }>
}

export default function DataPage() {
  const [data, setData] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)

  async function hent() {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/analytics')
      if (res.ok) setData(await res.json())
    } catch {}
    setLoading(false)
  }

  useEffect(() => { hent() }, [])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="w-6 h-6 animate-spin text-tomtly-accent" />
    </div>
  )

  if (!data) return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <p className="text-brand-500">Kunne ikke laste data.</p>
    </div>
  )

  const unikeSiste30 = data.unikkeSessjoner?.[0]?.total || 0
  const maxDag = Math.max(...(data.dagligVisninger?.map(d => d.views) || [1]), 1)

  const deviceIcon = (d: string) => {
    if (d === 'mobil') return <Smartphone className="w-4 h-4" />
    if (d === 'nettbrett') return <Tablet className="w-4 h-4" />
    return <Monitor className="w-4 h-4" />
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-tomtly-dark flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-tomtly-accent" />
            Besøksdata
          </h1>
          <p className="text-sm text-brand-500">Sanntids besøksstatistikk for tomtly.no</p>
        </div>
        <button onClick={hent} className="flex items-center gap-1.5 px-3 py-2 bg-brand-100 text-brand-600 rounded-lg text-xs font-medium hover:bg-brand-200">
          <RefreshCw className="w-3.5 h-3.5" /> Oppdater
        </button>
      </div>

      {/* Nøkkeltall */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <MetricCard label="I dag" value={data.iDag} icon={<Eye className="w-5 h-5" />} />
        <MetricCard label="Siste 7 dager" value={data.siste7Dager} icon={<TrendingUp className="w-5 h-5" />} />
        <MetricCard label="Siste 30 dager" value={data.siste30Dager} icon={<BarChart3 className="w-5 h-5" />} />
        <MetricCard label="Unike besøkende (30d)" value={unikeSiste30} icon={<Users className="w-5 h-5" />} />
        <MetricCard label="Totalt alle tider" value={data.totalt} icon={<Globe className="w-5 h-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daglig graf */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-brand-200 p-5">
          <h2 className="font-semibold text-tomtly-dark mb-4 text-sm">Sidevisninger siste 30 dager</h2>
          {data.dagligVisninger?.length > 0 ? (
            <div className="flex items-end gap-[2px] h-40">
              {data.dagligVisninger.map((d) => {
                const h = (d.views / maxDag) * 100
                const dato = new Date(d.dag)
                const label = `${dato.getDate()}.${dato.getMonth() + 1}`
                return (
                  <div key={d.dag} className="flex-1 flex flex-col items-center gap-0.5 group relative">
                    <div className="absolute -top-8 bg-tomtly-dark text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                      {label}: {d.views} vis. / {d.unike} unike
                    </div>
                    <div
                      className="w-full bg-tomtly-accent/80 hover:bg-tomtly-accent rounded-t transition-colors cursor-default"
                      style={{ height: `${Math.max(h, 2)}%` }}
                    />
                    {data.dagligVisninger.length <= 14 && (
                      <span className="text-[7px] text-brand-400">{label}</span>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-brand-400 py-10 text-center">Ingen data ennå — visninger registreres fra nå.</p>
          )}
        </div>

        {/* Enheter */}
        <div className="bg-white rounded-xl border border-brand-200 p-5">
          <h2 className="font-semibold text-tomtly-dark mb-4 text-sm">Enheter (30 dager)</h2>
          {data.enheter?.length > 0 ? (
            <div className="space-y-3">
              {data.enheter.map((e) => {
                const total = data.enheter.reduce((s, x) => s + x.views, 0)
                const pct = total > 0 ? Math.round((e.views / total) * 100) : 0
                return (
                  <div key={e.device}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="flex items-center gap-2 text-sm text-brand-700">
                        {deviceIcon(e.device)} {e.device}
                      </span>
                      <span className="text-xs text-brand-500">{e.views} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-brand-100 rounded-full overflow-hidden">
                      <div className="h-full bg-tomtly-accent rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-brand-400 text-center py-4">Ingen data ennå</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Topp sider */}
        <div className="bg-white rounded-xl border border-brand-200 p-5">
          <h2 className="font-semibold text-tomtly-dark mb-4 text-sm">Mest besøkte sider (30 dager)</h2>
          {data.toppSider?.length > 0 ? (
            <div className="space-y-1">
              {data.toppSider.map((s, i) => (
                <div key={s.path} className="flex items-center justify-between py-1.5 border-b border-brand-50 last:border-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-bold text-brand-400 w-5">{i + 1}</span>
                    <span className="text-xs text-brand-700 truncate">{s.path === '/' ? 'Forsiden' : s.path}</span>
                  </div>
                  <span className="text-xs font-semibold text-tomtly-dark ml-2 flex-shrink-0">{s.views}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand-400 text-center py-4">Ingen data ennå</p>
          )}
        </div>

        {/* Trafikkkilder */}
        <div className="bg-white rounded-xl border border-brand-200 p-5">
          <h2 className="font-semibold text-tomtly-dark mb-4 text-sm">Trafikkkilder (30 dager)</h2>
          {data.toppReferrere?.length > 0 ? (
            <div className="space-y-1">
              {data.toppReferrere.map((r, i) => {
                let label = r.referrer
                if (!label || label === 'Direkte') label = 'Direkte trafikk'
                else {
                  try { label = new URL(label).hostname } catch {}
                }
                return (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-brand-50 last:border-0">
                    <span className="text-xs text-brand-700 truncate">{label}</span>
                    <span className="text-xs font-semibold text-tomtly-dark ml-2 flex-shrink-0">{r.views}</span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-sm text-brand-400 text-center py-4">Ingen data ennå</p>
          )}
        </div>
      </div>
    </div>
  )
}

function MetricCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-4">
      <div className="flex items-center gap-2 text-tomtly-accent mb-2">{icon}</div>
      <p className="font-display text-2xl font-bold text-tomtly-dark">{value.toLocaleString('nb-NO')}</p>
      <p className="text-xs text-brand-500">{label}</p>
    </div>
  )
}
