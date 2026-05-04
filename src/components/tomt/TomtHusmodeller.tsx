'use client'

import { useState, useMemo } from 'react'
import { CheckCircle2, ExternalLink, BedDouble, Bath, Layers, Ruler, TrendingUp, AlertCircle } from 'lucide-react'
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
  const aktiv = modeller[aktivModell]

  const bilder = tomtType === 'skra' && aktiv.bilder_skra ? aktiv.bilder_skra : aktiv.bilder
  const kostnader = tomtType === 'skra' && aktiv.kostnader_skra ? aktiv.kostnader_skra : aktiv.kostnader
  const totalBudsjett = tomtType === 'skra' && aktiv.total_budsjett_skra ? aktiv.total_budsjett_skra : aktiv.total_budsjett
  const braMm2 = tomtType === 'skra' && aktiv.bra_m2_alt ? aktiv.bra_m2_alt : aktiv.bra_m2

  const harGrunnmurFelt = modeller.some(m => m.grunnmur_inkludert !== undefined)
  const flereLeverandorer = useMemo(() => new Set(modeller.map(m => m.leverandor)).size > 1, [modeller])

  // Grupper etter leverandør, sortert på pris
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

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Velg husmodell</h2>
      <p className="text-brand-600 mb-4">
        {modeller.length} husmodeller med komplett kostnadsoverslag for {tomtNavn}. Priser per mai 2026.
      </p>

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

      {/* Modell-velger */}
      <div className="space-y-5 mb-8">
        {Array.from(gruppert.entries()).map(([leverandor, items]) => (
          <div key={leverandor}>
            {flereLeverandorer && (
              <div className="flex items-center gap-3 mb-2">
                <p className="text-[11px] font-bold text-brand-400 uppercase tracking-widest whitespace-nowrap">{leverandor}</p>
                <div className="flex-1 h-px bg-brand-100" />
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {items.map(({ modell: m, idx }) => {
                const mBudsjett = tomtType === 'skra' && m.total_budsjett_skra ? m.total_budsjett_skra : m.total_budsjett
                return (
                  <button
                    key={m.id}
                    onClick={() => setAktivModell(idx)}
                    className={`text-left p-3 rounded-xl border-2 transition-all ${
                      aktivModell === idx
                        ? 'border-tomtly-accent bg-forest-50 shadow-sm'
                        : 'border-brand-200 hover:border-brand-300'
                    }`}
                  >
                    <p className="font-semibold text-tomtly-dark text-sm truncate">{m.navn}</p>
                    <p className="text-sm font-bold text-tomtly-accent mt-1">
                      {(mBudsjett / 1000000).toFixed(1)} MNOK
                    </p>
                    {harGrunnmurFelt && (
                      <p className={`text-[10px] mt-1 font-medium ${m.grunnmur_inkludert ? 'text-green-600' : 'text-amber-600'}`}>
                        {m.grunnmur_inkludert ? '✓ Grunnmur inkl.' : '+ grunnmur'}
                      </p>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Aktiv modell */}
      <div className="bg-white border border-brand-200 rounded-2xl overflow-hidden">

        {/* Fasadebilde */}
        <div className="aspect-[16/9] relative bg-brand-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bilder.fasade[0]} alt={`${aktiv.navn} – fasade`} className="w-full h-full object-contain bg-white" />
        </div>

        <div className="p-6 md:p-8">
          {/* Tittel */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-display text-xl font-bold text-tomtly-dark">
                Husmodell: {aktiv.navn}
              </h3>
              <p className="text-sm text-brand-500">{aktiv.leverandor}</p>
            </div>
            {aktiv.leverandor_url && (
              <a href={aktiv.leverandor_url} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-tomtly-accent hover:underline">
                Se hos {aktiv.leverandor} <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <p className="text-sm text-brand-600 leading-relaxed mb-6">{aktiv.beskrivelse}</p>

          {/* Nøkkeltall */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-brand-50 rounded-xl p-3 text-center border border-brand-100">
              <Ruler className="w-4 h-4 text-brand-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-tomtly-dark">{braMm2} m²</p>
              <p className="text-[10px] text-brand-500">Innvendig BRA</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-3 text-center border border-brand-100">
              <BedDouble className="w-4 h-4 text-brand-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-tomtly-dark">{aktiv.soverom}</p>
              <p className="text-[10px] text-brand-500">Soverom</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-3 text-center border border-brand-100">
              <Bath className="w-4 h-4 text-brand-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-tomtly-dark">{aktiv.bad}</p>
              <p className="text-[10px] text-brand-500">Bad</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-3 text-center border border-brand-100">
              <Layers className="w-4 h-4 text-brand-400 mx-auto mb-1" />
              <p className="text-lg font-bold text-tomtly-dark">{aktiv.etasjer}</p>
              <p className="text-[10px] text-brand-500">Etasjer</p>
            </div>
          </div>

          {/* Ekstra nøkkeltall */}
          {aktiv.ekstra && Object.keys(aktiv.ekstra).length > 0 && (
            <div className="flex flex-wrap gap-3 mb-8">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {bilder.plantegninger.map((pt, idx) => (
                  <div key={idx} className="bg-white border border-brand-200 rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pt.url} alt={pt.label} className="w-full object-contain bg-white p-2" />
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
                {bilder.fasade.slice(1).map((url, idx) => (
                  <div key={idx} className="bg-white border border-brand-200 rounded-xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`${aktiv.navn} fasade ${idx + 2}`} className="w-full object-contain bg-white p-1" />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Inkludert */}
          <h4 className="text-sm font-semibold text-brand-700 mb-3">Inkludert i {aktiv.navn}</h4>
          <div className="grid grid-cols-2 gap-2 mb-8">
            {aktiv.inkludert.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-brand-700">
                <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* Kostnadsoverslag */}
          <h4 className="text-sm font-semibold text-brand-700 mb-3">
            Kostnadsoverslag – {aktiv.navn}
            {tomtType === 'skra' && aktiv.kostnader_skra ? ' (skrå tomt)' : tomtType === 'flat' ? ' (flat tomt)' : ''}
          </h4>
          <p className="text-xs text-brand-500 mb-3">Realistisk estimat basert på innhentede tilbud og kjente kostnader per mai 2026.</p>

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

          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden mb-6">
            <div className="divide-y divide-brand-200">
              {kostnader.map((k) => (
                <div key={k.post} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-brand-700">{k.post}</span>
                  <span className="text-sm font-semibold text-tomtly-dark">{formatNOK(k.belop)}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-4 py-4 bg-tomtly-accent text-white">
              <span className="font-semibold">Totalbudsjett</span>
              <span className="text-xl font-bold">ca. {(totalBudsjett / 1000000).toFixed(1)} MNOK</span>
            </div>
          </div>

          {/* Verdivurdering */}
          <h4 className="text-sm font-semibold text-brand-700 mb-3">Hva er boligen verdt etterpå?</h4>
          <div className="bg-forest-50 rounded-xl p-6 border border-forest-100">
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div>
                <p className="text-xs text-forest-600">Boligareal</p>
                <p className="text-lg font-bold text-forest-800">{aktiv.verdi_bra_m2} m²</p>
              </div>
              <div>
                <p className="text-xs text-forest-600">m²-pris nybygg</p>
                <p className="text-lg font-bold text-forest-800">{formatNOK(aktiv.verdi_m2_pris)}</p>
              </div>
              <div>
                <p className="text-xs text-forest-600">Estimert verdi</p>
                <p className="text-lg font-bold text-tomtly-accent">{formatNOK(aktiv.verdi_total)}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-forest-200">
              <div className="text-center flex-1">
                <p className="text-xs text-brand-500">Byggekostnad</p>
                <p className="text-lg font-bold text-tomtly-dark">{(totalBudsjett / 1000000).toFixed(1)}M</p>
              </div>
              <TrendingUp className="w-5 h-5 text-tomtly-accent mx-4" />
              <div className="text-center flex-1">
                <p className="text-xs text-brand-500">Markedsverdi</p>
                <p className="text-lg font-bold text-tomtly-accent">{(aktiv.verdi_total / 1000000).toFixed(1)}M</p>
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
  )
}
