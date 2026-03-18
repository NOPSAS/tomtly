'use client'

import { useState } from 'react'
import {
  Home,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Check,
  SlidersHorizontal,
  ArrowRight,
  Lock,
  Star,
  Ruler,
  BedDouble,
  Bath,
  Clock,
  Zap,
} from 'lucide-react'
import { formatNOK } from '@/lib/utils'

// ============================================================
// HUSVELGER – Kunden velger selv hvilke hus de vil se på tomten
// Inntil 5 alternativer avhengig av abonnement.
// ============================================================

export type Prisklasse = 'standard' | 'mellom' | 'premium'
export type Abonnement = 'starter' | 'standard' | 'pro'

export interface HusmodellKatalog {
  id: string
  leverandor: string
  leverandor_logo?: string
  modell: string
  bra_m2: number
  soverom: number
  bad: number
  etasjer: number
  prisklasse: Prisklasse
  pris_fra: number
  beskrivelse: string
  bilde_url?: string
  leveringstid_uker: number
  energiklasse: string
  egenskaper: string[]
  passer_tomt: boolean // om huset passer regulering/tomt
  grunn_ikke_passer?: string
}

interface Props {
  husmodeller: HusmodellKatalog[]
  abonnement: Abonnement
  maks_valg: number // 1, 3 eller 5 basert på abo
}

const PRISKLASSE_LABEL: Record<Prisklasse, { label: string; color: string }> = {
  standard: { label: 'Standard', color: 'bg-blue-100 text-blue-700' },
  mellom: { label: 'Mellom', color: 'bg-green-100 text-green-700' },
  premium: { label: 'Premium', color: 'bg-purple-100 text-purple-700' },
}

const ABO_GRENSER: Record<Abonnement, number> = {
  starter: 1,
  standard: 3,
  pro: 5,
}

export function TomtHusvelger({ husmodeller, abonnement, maks_valg }: Props) {
  const [valgte, setValgte] = useState<string[]>([])
  const [filter, setFilter] = useState<{
    prisklasse: Prisklasse | 'alle'
    soverom: number | null
    sortering: 'pris_lav' | 'pris_hoy' | 'storrelse' | 'leveringstid'
  }>({
    prisklasse: 'alle',
    soverom: null,
    sortering: 'pris_lav',
  })
  const [visDetaljer, setVisDetaljer] = useState<string | null>(null)

  const gjenstaendeValg = maks_valg - valgte.length

  // Filtrering
  let filtrert = husmodeller.filter((h) => {
    if (filter.prisklasse !== 'alle' && h.prisklasse !== filter.prisklasse) return false
    if (filter.soverom && h.soverom !== filter.soverom) return false
    return true
  })

  // Sortering
  filtrert.sort((a, b) => {
    switch (filter.sortering) {
      case 'pris_lav': return a.pris_fra - b.pris_fra
      case 'pris_hoy': return b.pris_fra - a.pris_fra
      case 'storrelse': return b.bra_m2 - a.bra_m2
      case 'leveringstid': return a.leveringstid_uker - b.leveringstid_uker
      default: return 0
    }
  })

  // Passer tomten først
  filtrert.sort((a, b) => (b.passer_tomt ? 1 : 0) - (a.passer_tomt ? 1 : 0))

  const toggleValg = (id: string) => {
    if (valgte.includes(id)) {
      setValgte(valgte.filter((v) => v !== id))
    } else if (valgte.length < maks_valg) {
      setValgte([...valgte, id])
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-tomtly-dark">
            Velg husmodeller
          </h2>
          <p className="text-brand-600 mt-1">
            Velg inntil {maks_valg} husmodell{maks_valg > 1 ? 'er' : ''} du vil se på denne tomten.
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-tomtly-dark">
            {valgte.length} av {maks_valg} valgt
          </p>
          {gjenstaendeValg === 0 && valgte.length < 5 && (
            <p className="text-xs text-brand-400 mt-0.5">
              Oppgrader for flere valg
            </p>
          )}
        </div>
      </div>

      {/* Valgte hus – visuell oversikt */}
      <div className="flex gap-2 mb-6">
        {Array.from({ length: maks_valg }).map((_, idx) => {
          const valgtHus = valgte[idx]
            ? husmodeller.find((h) => h.id === valgte[idx])
            : null
          const erLaast = idx >= maks_valg

          return (
            <div
              key={idx}
              className={`flex-1 h-16 rounded-lg border-2 flex items-center justify-center transition-all ${
                valgtHus
                  ? 'border-tomtly-accent bg-forest-50'
                  : erLaast
                    ? 'border-brand-200 bg-brand-100'
                    : 'border-dashed border-brand-300 bg-white'
              }`}
            >
              {valgtHus ? (
                <div className="flex items-center gap-2 px-2">
                  <div className="text-xs">
                    <p className="font-semibold text-tomtly-dark truncate max-w-[80px]">
                      {valgtHus.modell}
                    </p>
                    <p className="text-brand-500 text-[10px]">{valgtHus.leverandor}</p>
                  </div>
                  <button
                    onClick={() => toggleValg(valgtHus.id)}
                    className="p-0.5 hover:bg-red-100 rounded"
                  >
                    <X className="w-3.5 h-3.5 text-brand-400 hover:text-red-500" />
                  </button>
                </div>
              ) : erLaast ? (
                <Lock className="w-4 h-4 text-brand-300" />
              ) : (
                <Plus className="w-4 h-4 text-brand-300" />
              )}
            </div>
          )
        })}
        {/* Låste plasser for oppgradering */}
        {maks_valg < 5 &&
          Array.from({ length: 5 - maks_valg }).map((_, idx) => (
            <div
              key={`locked-${idx}`}
              className="flex-1 h-16 rounded-lg border-2 border-dashed border-brand-200 bg-brand-50 flex items-center justify-center"
            >
              <Lock className="w-4 h-4 text-brand-200" />
            </div>
          ))}
      </div>

      {/* Filter-bar */}
      <div className="flex flex-wrap gap-2 mb-6 bg-brand-50 rounded-xl p-3 border border-brand-100">
        <select
          value={filter.prisklasse}
          onChange={(e) => setFilter({ ...filter, prisklasse: e.target.value as Prisklasse | 'alle' })}
          className="px-3 py-1.5 bg-white border border-brand-200 rounded-lg text-xs"
        >
          <option value="alle">Alle prisklasser</option>
          <option value="standard">Standard</option>
          <option value="mellom">Mellomklasse</option>
          <option value="premium">Premium</option>
        </select>

        <select
          value={filter.soverom || ''}
          onChange={(e) => setFilter({ ...filter, soverom: e.target.value ? Number(e.target.value) : null })}
          className="px-3 py-1.5 bg-white border border-brand-200 rounded-lg text-xs"
        >
          <option value="">Alle soverom</option>
          <option value="2">2 soverom</option>
          <option value="3">3 soverom</option>
          <option value="4">4 soverom</option>
          <option value="5">5+ soverom</option>
        </select>

        <select
          value={filter.sortering}
          onChange={(e) => setFilter({ ...filter, sortering: e.target.value as typeof filter.sortering })}
          className="px-3 py-1.5 bg-white border border-brand-200 rounded-lg text-xs"
        >
          <option value="pris_lav">Pris (lavest først)</option>
          <option value="pris_hoy">Pris (høyest først)</option>
          <option value="storrelse">Størrelse (størst først)</option>
          <option value="leveringstid">Leveringstid (raskest)</option>
        </select>

        <span className="text-xs text-brand-400 ml-auto self-center">
          {filtrert.length} modeller
        </span>
      </div>

      {/* Husmodell-grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtrert.map((hus) => {
          const erValgt = valgte.includes(hus.id)
          const kanVelge = erValgt || valgte.length < maks_valg
          const prisInfo = PRISKLASSE_LABEL[hus.prisklasse]

          return (
            <div
              key={hus.id}
              className={`bg-white border-2 rounded-xl overflow-hidden transition-all ${
                erValgt
                  ? 'border-tomtly-accent shadow-md'
                  : hus.passer_tomt
                    ? 'border-brand-200 hover:border-brand-300'
                    : 'border-brand-200 opacity-60'
              }`}
            >
              {/* Bilde */}
              <div className="aspect-[16/9] bg-brand-100 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Home className="w-10 h-10 text-brand-300" />
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <span className={`px-2 py-0.5 text-[10px] rounded-full ${prisInfo.color}`}>
                    {prisInfo.label}
                  </span>
                  {!hus.passer_tomt && (
                    <span className="px-2 py-0.5 text-[10px] rounded-full bg-red-100 text-red-600">
                      Passer ikke
                    </span>
                  )}
                </div>

                {/* Valgt-indikator */}
                {erValgt && (
                  <div className="absolute top-2 right-2 w-7 h-7 bg-tomtly-accent rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              <div className="p-4">
                {/* Leverandør og modell */}
                <p className="text-xs text-brand-500">{hus.leverandor}</p>
                <h3 className="font-semibold text-tomtly-dark">{hus.modell}</h3>

                {/* Nøkkeltall */}
                <div className="flex gap-3 mt-2 text-xs text-brand-600">
                  <span className="flex items-center gap-1">
                    <Ruler className="w-3 h-3" /> {hus.bra_m2} m²
                  </span>
                  <span className="flex items-center gap-1">
                    <BedDouble className="w-3 h-3" /> {hus.soverom} sov
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-3 h-3" /> {hus.bad} bad
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {hus.energiklasse}
                  </span>
                </div>

                {/* Pris og leveringstid */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-100">
                  <div>
                    <p className="text-lg font-bold text-tomtly-dark">{formatNOK(hus.pris_fra)}</p>
                    <p className="text-[10px] text-brand-400">fra-pris, nøkkelferdig</p>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-brand-500">
                    <Clock className="w-3 h-3" /> {hus.leveringstid_uker} uker
                  </span>
                </div>

                {/* Grunn til at det ikke passer */}
                {!hus.passer_tomt && hus.grunn_ikke_passer && (
                  <p className="text-xs text-red-500 mt-2 bg-red-50 px-2 py-1 rounded">
                    {hus.grunn_ikke_passer}
                  </p>
                )}

                {/* Detaljer toggle */}
                <button
                  onClick={() => setVisDetaljer(visDetaljer === hus.id ? null : hus.id)}
                  className="text-xs text-tomtly-accent mt-2 hover:underline"
                >
                  {visDetaljer === hus.id ? 'Skjul detaljer' : 'Vis detaljer'}
                </button>

                {visDetaljer === hus.id && (
                  <div className="mt-3 pt-3 border-t border-brand-100">
                    <p className="text-xs text-brand-600 mb-2">{hus.beskrivelse}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {hus.egenskaper.map((e) => (
                        <span key={e} className="px-2 py-0.5 bg-brand-100 text-brand-600 rounded text-[10px]">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Velg-knapp */}
                <button
                  onClick={() => hus.passer_tomt && kanVelge && toggleValg(hus.id)}
                  disabled={!hus.passer_tomt || (!erValgt && !kanVelge)}
                  className={`w-full mt-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    erValgt
                      ? 'bg-tomtly-accent text-white hover:bg-red-500'
                      : !hus.passer_tomt
                        ? 'bg-brand-100 text-brand-400 cursor-not-allowed'
                        : kanVelge
                          ? 'bg-forest-50 text-tomtly-accent border border-tomtly-accent hover:bg-forest-100'
                          : 'bg-brand-100 text-brand-400 cursor-not-allowed'
                  }`}
                >
                  {erValgt ? 'Fjern valg' : !kanVelge ? `Maks ${maks_valg} valgt` : 'Velg denne'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Oppgradering CTA */}
      {maks_valg < 5 && (
        <div className="mt-8 bg-gradient-to-r from-forest-50 to-earth-50 rounded-xl p-6 border border-forest-200 flex items-center justify-between">
          <div>
            <p className="font-semibold text-tomtly-dark">
              Vil du se flere husmodeller på tomten?
            </p>
            <p className="text-sm text-brand-600 mt-1">
              {abonnement === 'starter'
                ? 'Oppgrader til Standard for 3 valg, eller Pro for 5 valg.'
                : 'Oppgrader til Pro for inntil 5 husmodeller.'}
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors flex-shrink-0">
            Oppgrader
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}
