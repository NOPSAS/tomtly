'use client'

import { useState, useMemo } from 'react'
import { CheckCircle2, ExternalLink, BedDouble, Bath, Layers, Ruler, TrendingUp, AlertCircle, ChevronRight } from 'lucide-react'
import { formatNOK } from '@/lib/utils'

export interface HusmodellDetalj {
  id: string
  navn: string
  leverandor: string
  leverandor_url?: string
  beskrivelse: string

  bra_m2: number
  bra_m2_alt?: number
  soverom: number
  bad: string
  etasjer: number
  ekstra?: Record<string, string>

  pris_hus: number
  pris_hus_skra?: number
  total_budsjett: number
  total_budsjett_skra?: number

  kostnader: { post: string; belop: number }[]
  kostnader_skra?: { post: string; belop: number }[]

  verdi_bra_m2: number
  verdi_m2_pris: number
  verdi_total: number

  grunnmur_inkludert?: boolean
  inkludert: string[]

  bilder: {
    fasade: string[]
    plantegninger: { url: string; label: string }[]
  }
  bilder_skra?: {
    fasade: string[]
    plantegninger: { url: string; label: string }[]
  }
}

interface Props {
  modeller: HusmodellDetalj[]
  tomtType: 'flat' | 'skra'
  tomtNavn: string
}

export function TomtHusmodeller({ modeller, tomtType, tomtNavn }: Props) {
  const [aktivIdx, setAktivIdx] = useState(0)
  const aktiv = modeller[aktivIdx]

  const bilder = tomtType === 'skra' && aktiv.bilder_skra ? aktiv.bilder_skra : aktiv.bilder
  const kostnader = tomtType === 'skra' && aktiv.kostnader_skra ? aktiv.kostnader_skra : aktiv.kostnader
  const totalBudsjett = tomtType === 'skra' && aktiv.total_budsjett_skra ? aktiv.total_budsjett_skra : aktiv.total_budsjett
  const braMm2 = tomtType === 'skra' && aktiv.bra_m2_alt ? aktiv.bra_m2_alt : aktiv.bra_m2
  const harGrunnmurFelt = modeller.some(m => m.grunnmur_inkludert !== undefined)

  // Grupper etter leverandør, sortert på pris innad i gruppen
  const gruppert = useMemo(() => {
    const map = new Map<string, { modell: HusmodellDetalj; idx: number }[]>()
    const withIdx = modeller.map((m, i) => ({ modell: m, idx: i }))
    const sorted = [...withIdx].sort((a, b) => {
      const ba = tomtType === 'skra' && a.modell.total_budsjett_skra ? a.modell.total_budsjett_skra : a.modell.total_budsjett
      const bb = tomtType === 'skra' && b.modell.total_budsjett_skra ? b.modell.total_budsjett_skra : b.modell.total_budsjett
      return ba - bb
    })
    for (const item of sorted) {
      const key = item.modell.leverandor
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(item)
    }
    return map
  }, [modeller, tomtType])

  const flereLeverandorer = gruppert.size > 1

  return (
    <div>
      {/* Header */}
      <div className="flex items-end justify-between mb-1">
        <h2 className="font-display text-2xl font-bold text-tomtly-dark">Velg husmodell</h2>
        <span className="text-sm text-brand-400 font-medium">{modeller.length} modeller</span>
      </div>
      <p className="text-brand-500 text-sm mb-4">Komplett kostnadsoverslag for {tomtNavn}. Priser per mai 2026.</p>

      {/* Grunnmur-forklaring */}
      {harGrunnmurFelt && modeller.some(m => !m.grunnmur_inkludert) && (
        <div className="flex flex-wrap gap-2 mb-5 text-xs">
          <span className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 font-medium">
            <CheckCircle2 className="w-3 h-3" /> Grunnmur inkl. i pris
          </span>
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 font-medium">
            <AlertCircle className="w-3 h-3" /> + 200–300 000 kr grunnmur tilkommer
          </span>
        </div>
      )}

      {/* ── Modell-velger ─────────────────────────────────── */}
      <div className="space-y-5 mb-8">
        {Array.from(gruppert.entries()).map(([leverandor, items]) => (
          <div key={leverandor}>
            {flereLeverandorer && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-bold text-brand-400 uppercase tracking-widest">{leverandor}</span>
                <div className="flex-1 h-px bg-brand-100" />
              </div>
            )}
            {/* Horisontal scroll-rad */}
            <div className="flex gap-3 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-hide">
              {items.map(({ modell: m, idx }) => {
                const mBudsjett = tomtType === 'skra' && m.total_budsjett_skra ? m.total_budsjett_skra : m.total_budsjett
                const aktiv_ = aktivIdx === idx
                return (
                  <button
                    key={m.id}
                    onClick={() => setAktivIdx(idx)}
                    className={`flex-shrink-0 snap-start w-44 text-left rounded-xl border-2 overflow-hidden transition-all ${
                      aktiv_
                        ? 'border-tomtly-accent shadow-md'
                        : 'border-brand-200 hover:border-brand-300 hover:shadow-sm'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[4/3] bg-brand-50 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.bilder.fasade[0]}
                        alt={m.navn}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    {/* Info */}
                    <div className={`p-2.5 ${aktiv_ ? 'bg-forest-50' : 'bg-white'}`}>
                      <p className="font-semibold text-tomtly-dark text-sm leading-tight truncate">{m.navn}</p>
                      <p className="text-sm font-bold text-tomtly-accent mt-0.5">
                        {(mBudsjett / 1000000).toFixed(1)} MNOK
                      </p>
                      {harGrunnmurFelt && (
                        <p className={`text-[10px] mt-1 font-medium ${m.grunnmur_inkludert ? 'text-green-600' : 'text-amber-600'}`}>
                          {m.grunnmur_inkludert ? '✓ Grunnmur inkl.' : '+ grunnmur'}
                        </p>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* ── Aktiv modell – detaljkort ─────────────────────── */}
      <div className="bg-white border border-brand-200 rounded-2xl overflow-hidden">

        {/* Desktop: 2-kolonne. Mobil: 1-kolonne */}
        <div className="lg:grid lg:grid-cols-5">

          {/* Venstre: bilde + plantegninger */}
          <div className="lg:col-span-3 lg:border-r lg:border-brand-200">
            {/* Fasadebilde */}
            <div className="aspect-[16/10] bg-brand-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bilder.fasade[0]}
                alt={`${aktiv.navn} – fasade`}
                className="w-full h-full object-contain bg-white"
              />
            </div>

            {/* Plantegninger */}
            {bilder.plantegninger.length > 0 && (
              <div className="p-5 border-t border-brand-100">
                <p className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-3">Plantegninger</p>
                <div className={`grid gap-3 ${bilder.plantegninger.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                  {bilder.plantegninger.map((pt, i) => (
                    <div key={i} className="rounded-lg border border-brand-200 overflow-hidden bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={pt.url} alt={pt.label} className="w-full object-contain bg-white p-2" loading="lazy" />
                      <p className="text-[11px] text-brand-500 font-medium px-3 py-1.5 bg-brand-50 border-t border-brand-100 truncate">{pt.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ekstra fasader */}
            {bilder.fasade.length > 1 && (
              <div className="px-5 pb-5">
                <p className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-3">Fasader</p>
                <div className="grid grid-cols-3 gap-2">
                  {bilder.fasade.slice(1).map((url, i) => (
                    <div key={i} className="rounded-lg border border-brand-200 overflow-hidden bg-white aspect-[4/3]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`${aktiv.navn} fasade ${i + 2}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Høyre: info + kostnader */}
          <div className="lg:col-span-2 p-5 md:p-6 space-y-6">

            {/* Tittel */}
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-xl font-bold text-tomtly-dark leading-tight">{aktiv.navn}</h3>
                  <p className="text-sm text-brand-400 mt-0.5">{aktiv.leverandor}</p>
                </div>
                {aktiv.leverandor_url && (
                  <a href={aktiv.leverandor_url} target="_blank" rel="noopener noreferrer"
                    className="flex-shrink-0 flex items-center gap-1 text-xs text-tomtly-accent hover:underline mt-1">
                    Se modell <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
              <p className="text-sm text-brand-600 leading-relaxed mt-3">{aktiv.beskrivelse}</p>
            </div>

            {/* Nøkkeltall */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: <Ruler className="w-3.5 h-3.5" />, val: `${braMm2} m²`, lbl: 'BRA' },
                { icon: <BedDouble className="w-3.5 h-3.5" />, val: aktiv.soverom, lbl: 'Soverom' },
                { icon: <Bath className="w-3.5 h-3.5" />, val: aktiv.bad, lbl: 'Bad' },
                { icon: <Layers className="w-3.5 h-3.5" />, val: aktiv.etasjer, lbl: 'Etasjer' },
              ].map(({ icon, val, lbl }) => (
                <div key={lbl} className="bg-brand-50 rounded-lg p-2 text-center border border-brand-100">
                  <div className="text-brand-400 flex justify-center mb-1">{icon}</div>
                  <p className="text-sm font-bold text-tomtly-dark leading-none">{val}</p>
                  <p className="text-[10px] text-brand-400 mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>

            {/* Ekstra tags */}
            {aktiv.ekstra && Object.keys(aktiv.ekstra).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(aktiv.ekstra).map(([k, v]) => (
                  <span key={k} className="text-[11px] bg-brand-50 border border-brand-100 rounded-md px-2 py-1">
                    <span className="text-brand-400">{k}: </span>
                    <span className="font-semibold text-brand-700">{v}</span>
                  </span>
                ))}
              </div>
            )}

            {/* Grunnmur-status */}
            {harGrunnmurFelt && (
              aktiv.grunnmur_inkludert ? (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 text-xs text-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span><strong>Grunnmur inkludert</strong> i husmodellprisen</span>
                </div>
              ) : (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-xs text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span><strong>Grunnmur ikke inkludert</strong> – legg til est. 200–300 000 kr</span>
                </div>
              )
            )}

            {/* Kostnadsoverslag */}
            <div>
              <p className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-2">Kostnadsoverslag</p>
              <div className="rounded-xl border border-brand-200 overflow-hidden text-sm">
                <div className="divide-y divide-brand-100">
                  {kostnader.map((k) => (
                    <div key={k.post} className="flex justify-between px-3 py-2">
                      <span className="text-brand-600 text-xs">{k.post}</span>
                      <span className="font-medium text-tomtly-dark text-xs whitespace-nowrap ml-2">{formatNOK(k.belop)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-3 py-3 bg-tomtly-accent text-white">
                  <span className="text-sm font-semibold">Totalbudsjett</span>
                  <span className="text-lg font-bold">ca. {(totalBudsjett / 1000000).toFixed(1)} MNOK</span>
                </div>
              </div>
            </div>

            {/* Verdivurdering */}
            <div className="bg-forest-50 rounded-xl p-4 border border-forest-100">
              <p className="text-xs font-semibold text-forest-700 uppercase tracking-wider mb-3">Estimert markedsverdi</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 text-center">
                  <p className="text-[11px] text-brand-400">Byggekostnad</p>
                  <p className="text-base font-bold text-tomtly-dark">{(totalBudsjett / 1000000).toFixed(1)} M</p>
                </div>
                <ChevronRight className="w-4 h-4 text-tomtly-accent flex-shrink-0" />
                <TrendingUp className="w-4 h-4 text-tomtly-accent flex-shrink-0" />
                <div className="flex-1 text-center">
                  <p className="text-[11px] text-brand-400">Markedsverdi</p>
                  <p className="text-base font-bold text-tomtly-accent">{(aktiv.verdi_total / 1000000).toFixed(1)} M</p>
                </div>
              </div>
              <div className="mt-3 text-center bg-white rounded-lg py-2 border border-forest-200">
                <p className="text-[11px] text-forest-600">Potensiell verdiskaping</p>
                <p className="text-lg font-bold text-tomtly-accent">
                  +{((aktiv.verdi_total - totalBudsjett) / 1000000).toFixed(1)} MNOK
                </p>
              </div>
            </div>

            {/* Inkludert */}
            <div>
              <p className="text-xs font-semibold text-brand-500 uppercase tracking-wider mb-2">Inkludert i prisen</p>
              <div className="space-y-1.5">
                {aktiv.inkludert.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-brand-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
