'use client'

import { useState, useMemo } from 'react'
import { CheckCircle2, ExternalLink, BedDouble, Bath, Layers, Ruler, TrendingUp, AlertCircle, X, ZoomIn } from 'lucide-react'
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
  const [aktivModell, setAktivModell] = useState(0)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  const aktiv = modeller[aktivModell]

  const bilder = tomtType === 'skra' && aktiv.bilder_skra ? aktiv.bilder_skra : aktiv.bilder
  const kostnader = tomtType === 'skra' && aktiv.kostnader_skra ? aktiv.kostnader_skra : aktiv.kostnader
  const totalBudsjett = tomtType === 'skra' && aktiv.total_budsjett_skra ? aktiv.total_budsjett_skra : aktiv.total_budsjett
  const braMm2 = tomtType === 'skra' && aktiv.bra_m2_alt ? aktiv.bra_m2_alt : aktiv.bra_m2

  const harGrunnmurFelt = modeller.some(m => m.grunnmur_inkludert !== undefined)
  const flereLeverandorer = useMemo(() => new Set(modeller.map(m => m.leverandor)).size > 1, [modeller])

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

  const topp3 = useMemo(() => (
    [...modeller]
      .map(m => ({ m, profitt: m.verdi_total - m.total_budsjett }))
      .sort((a, b) => b.profitt - a.profitt)
      .slice(0, 3)
  ), [modeller])

  return (
    <div>
      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-zoom-out"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            onClick={() => setLightboxImg(null)}
          >
            <X className="w-6 h-6" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxImg}
            alt="Forstørret bilde"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl cursor-default"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Velg husmodell</h2>
      <p className="text-brand-600 mb-4">
        {modeller.length} husmodeller med komplett kostnadsoverslag for {tomtNavn}. Priser per mai 2026.
      </p>

      {/* Topp 3 */}
      <div className="mb-5">
        <p className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-2">Topp 3 – best fortjenestepotensial</p>
        <div className="grid grid-cols-3 gap-2">
          {topp3.map(({ m, profitt }, i) => {
            const mBudsjett = tomtType === 'skra' && m.total_budsjett_skra ? m.total_budsjett_skra : m.total_budsjett
            const idx = modeller.indexOf(m)
            return (
              <button
                key={m.id}
                onClick={() => setAktivModell(idx)}
                className={`text-left p-3 rounded-xl border-2 transition-all ${
                  aktivModell === idx
                    ? 'border-tomtly-accent bg-forest-50 shadow-sm'
                    : 'border-green-200 bg-green-50 hover:border-green-300'
                }`}
              >
                <p className="text-base mb-0.5">{['🥇', '🥈', '🥉'][i]}</p>
                <p className="font-semibold text-tomtly-dark text-sm truncate">{m.navn}</p>
                <p className="text-[10px] text-brand-400 truncate">{m.leverandor}</p>
                <p className="text-xs font-bold text-green-700 mt-1">+{(profitt / 1000000).toFixed(1)} MNOK</p>
                <p className="text-[10px] text-brand-400">{(mBudsjett / 1000000).toFixed(1)} MNOK budsjett</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Grunnmur-forklaring */}
      {harGrunnmurFelt && modeller.some(m => !m.grunnmur_inkludert) && (
        <div className="flex flex-wrap gap-3 mb-5 text-xs">
          <span className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full px-3 py-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" /> Grunnmur inkludert i pris
          </span>
          <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" /> + 200–300 000 kr grunnmur tilkommer
          </span>
        </div>
      )}

      {/* ── To-kolonne: velger til venstre, detalj til høyre ── */}
      <div className="flex flex-col lg:flex-row gap-5 items-start">

        {/* VENSTRE: kompakt modell-liste, sticky på desktop */}
        <div className="w-full lg:w-60 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-[140px] lg:max-h-[calc(100vh-11rem)] lg:overflow-y-auto space-y-4 lg:pr-1">
            {Array.from(gruppert.entries()).map(([leverandor, items]) => (
              <div key={leverandor}>
                {flereLeverandorer && (
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <p className="text-[10px] font-bold text-brand-400 uppercase tracking-widest whitespace-nowrap">{leverandor}</p>
                    <div className="flex-1 h-px bg-brand-100" />
                    <p className="text-[10px] text-brand-300">{items.length}</p>
                  </div>
                )}
                <div className="space-y-1">
                  {items.map(({ modell: m, idx }) => {
                    const mBudsjett = tomtType === 'skra' && m.total_budsjett_skra ? m.total_budsjett_skra : m.total_budsjett
                    const isActive = aktivModell === idx
                    return (
                      <button
                        key={m.id}
                        onClick={() => setAktivModell(idx)}
                        className={`w-full text-left px-3 py-2 rounded-lg border transition-all flex items-center justify-between gap-2 ${
                          isActive
                            ? 'border-tomtly-accent bg-forest-50 shadow-sm'
                            : 'border-brand-200 hover:border-brand-300 hover:bg-brand-50'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className={`text-sm font-semibold truncate ${isActive ? 'text-tomtly-accent' : 'text-tomtly-dark'}`}>
                            {m.navn}
                          </p>
                          {harGrunnmurFelt && (
                            <p className={`text-[10px] leading-none mt-0.5 ${m.grunnmur_inkludert ? 'text-green-600' : 'text-amber-600'}`}>
                              {m.grunnmur_inkludert ? '✓ grunnmur inkl.' : '+ grunnmur'}
                            </p>
                          )}
                        </div>
                        <p className={`text-xs font-bold tabular-nums flex-shrink-0 ${isActive ? 'text-tomtly-accent' : 'text-brand-500'}`}>
                          {(mBudsjett / 1000000).toFixed(1)}M
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HØYRE: aktiv modell-detalj */}
        <div className="flex-1 min-w-0">
          <div className="bg-white border border-brand-200 rounded-2xl overflow-hidden">

            {/* Fasadebilde */}
            <div
              className="aspect-[16/9] bg-white relative group cursor-zoom-in"
              onClick={() => setLightboxImg(bilder.fasade[0])}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bilder.fasade[0]}
                alt={`${aktiv.navn} – fasade`}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                <div className="bg-black/50 rounded-full p-2">
                  <ZoomIn className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            <div className="p-5 md:p-6">

              {/* Tittel + leverandørlenke */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-display text-xl font-bold text-tomtly-dark">{aktiv.navn}</h3>
                  <p className="text-sm text-brand-500">{aktiv.leverandor}</p>
                </div>
                {aktiv.leverandor_url && (
                  <a
                    href={aktiv.leverandor_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-tomtly-accent hover:underline flex-shrink-0 ml-2"
                  >
                    Se hos {aktiv.leverandor} <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <p className="text-sm text-brand-600 leading-relaxed mb-5">{aktiv.beskrivelse}</p>

              {/* Nøkkeltall */}
              <div className="grid grid-cols-4 gap-2 mb-5">
                {[
                  { icon: <Ruler className="w-4 h-4 text-brand-400 mx-auto mb-1" />, val: `${braMm2} m²`, label: 'BRA' },
                  { icon: <BedDouble className="w-4 h-4 text-brand-400 mx-auto mb-1" />, val: aktiv.soverom, label: 'Soverom' },
                  { icon: <Bath className="w-4 h-4 text-brand-400 mx-auto mb-1" />, val: aktiv.bad, label: 'Bad' },
                  { icon: <Layers className="w-4 h-4 text-brand-400 mx-auto mb-1" />, val: aktiv.etasjer, label: 'Etasjer' },
                ].map(({ icon, val, label }) => (
                  <div key={label} className="bg-brand-50 rounded-xl p-3 text-center border border-brand-100">
                    {icon}
                    <p className="text-base font-bold text-tomtly-dark leading-tight">{val}</p>
                    <p className="text-[10px] text-brand-500 mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Ekstra badges */}
              {aktiv.ekstra && Object.keys(aktiv.ekstra).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-5">
                  {Object.entries(aktiv.ekstra).map(([key, val]) => (
                    <div key={key} className="px-3 py-1.5 bg-brand-50 border border-brand-100 rounded-lg text-xs">
                      <span className="text-brand-500">{key}: </span>
                      <span className="font-semibold text-brand-700">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Plantegninger */}
              {bilder.plantegninger.length > 0 && (
                <>
                  <h4 className="text-sm font-semibold text-brand-700 mb-3">Plantegninger – {aktiv.navn}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                    {bilder.plantegninger.map((pt, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-brand-200 rounded-xl overflow-hidden cursor-zoom-in group"
                        onClick={() => setLightboxImg(pt.url)}
                      >
                        <div className="relative">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={pt.url} alt={pt.label} className="w-full object-contain bg-white p-2" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                            <div className="bg-black/50 rounded-full p-1.5">
                              <ZoomIn className="w-4 h-4 text-white" />
                            </div>
                          </div>
                        </div>
                        <div className="px-3 py-2 bg-brand-50 border-t border-brand-200">
                          <p className="text-xs text-brand-600 font-medium">{pt.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Ekstra fasader */}
              {bilder.fasade.length > 1 && (
                <>
                  <h4 className="text-sm font-semibold text-brand-700 mb-3">Fasader – {aktiv.navn}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5">
                    {bilder.fasade.slice(1).map((url, idx) => (
                      <div
                        key={idx}
                        className="bg-white border border-brand-200 rounded-xl overflow-hidden cursor-zoom-in group relative"
                        onClick={() => setLightboxImg(url)}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`${aktiv.navn} fasade ${idx + 2}`} className="w-full object-contain bg-white p-1" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                          <div className="bg-black/50 rounded-full p-1.5">
                            <ZoomIn className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Inkludert */}
              <h4 className="text-sm font-semibold text-brand-700 mb-3">Inkludert i {aktiv.navn}</h4>
              <div className="grid grid-cols-2 gap-2 mb-5">
                {aktiv.inkludert.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-brand-700">
                    <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Kostnadsoverslag */}
              <h4 className="text-sm font-semibold text-brand-700 mb-1">
                Kostnadsoverslag – {aktiv.navn}
                {tomtType === 'skra' && aktiv.kostnader_skra ? ' (skrå tomt)' : tomtType === 'flat' ? ' (flat tomt)' : ''}
              </h4>
              <p className="text-xs text-brand-500 mb-3">Realistisk estimat per mai 2026.</p>

              {harGrunnmurFelt && !aktiv.grunnmur_inkludert && (
                <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4 text-xs text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p><strong>Grunnmur ikke inkludert</strong> – {aktiv.leverandor} leverer ikke grunnmur/fundamentering. Legg til estimert <strong>200 000–300 000 kr</strong> avhengig av grunnforhold.</p>
                </div>
              )}
              {harGrunnmurFelt && aktiv.grunnmur_inkludert && (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-4 text-xs text-green-800">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <p><strong>Grunnmur inkludert</strong> – {aktiv.leverandor} inkluderer støpt plate/grunnmur i husmodellprisen.</p>
                </div>
              )}

              <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden mb-5">
                <div className="divide-y divide-brand-200">
                  {kostnader.map((k) => (
                    <div key={k.post} className="flex items-center justify-between px-4 py-2.5">
                      <span className="text-sm text-brand-700">{k.post}</span>
                      <span className="text-sm font-semibold text-tomtly-dark tabular-nums">{formatNOK(k.belop)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between px-4 py-4 bg-tomtly-accent text-white">
                  <span className="font-semibold">Totalbudsjett</span>
                  <span className="text-xl font-bold">ca. {(totalBudsjett / 1000000).toFixed(1)} MNOK</span>
                </div>
              </div>

              {/* Verdivurdering */}
              <h4 className="text-sm font-semibold text-brand-700 mb-1">Hva er boligen verdt etterpå?</h4>
              <p className="text-[10px] text-brand-400 mb-3">Kilde: Krogsveen, mai 2026</p>
              <div className="bg-forest-50 rounded-xl p-5 border border-forest-100">
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <p className="text-xs text-forest-600">Boligareal</p>
                    <p className="text-base font-bold text-forest-800">{aktiv.verdi_bra_m2} m²</p>
                  </div>
                  <div>
                    <p className="text-xs text-forest-600">m²-pris nybygg</p>
                    <p className="text-base font-bold text-forest-800">{formatNOK(aktiv.verdi_m2_pris)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-forest-600">Estimert verdi</p>
                    <p className="text-base font-bold text-tomtly-accent">{formatNOK(aktiv.verdi_total)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-forest-200">
                  <div className="text-center flex-1">
                    <p className="text-xs text-brand-500">Byggekostnad</p>
                    <p className="text-base font-bold text-tomtly-dark">{(totalBudsjett / 1000000).toFixed(1)}M</p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-tomtly-accent mx-4" />
                  <div className="text-center flex-1">
                    <p className="text-xs text-brand-500">Markedsverdi</p>
                    <p className="text-base font-bold text-tomtly-accent">{(aktiv.verdi_total / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
                <div className="mt-4 text-center bg-white rounded-lg p-3 border border-forest-200">
                  <p className="text-xs text-forest-600">Potensiell verdiskaping</p>
                  <p className="text-xl font-bold text-tomtly-accent">
                    + ca. {((aktiv.verdi_total - totalBudsjett) / 1000000).toFixed(1)} MNOK
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
