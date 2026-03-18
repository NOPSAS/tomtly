'use client'

import { useState } from 'react'
import {
  Hammer,
  Droplets,
  Volume2,
  Mountain,
  Wrench,
  Shield,
  Home,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  FileText,
  Sparkles,
} from 'lucide-react'
import { formatNOK } from '@/lib/utils'

// ============================================================
// ENTREPRENØRPRISING & FERDIGHUSVELGER
// Sender kart og tegninger til entreprenører for prising.
// Kobler til ferdighusleverandører basert på prisklasse.
// ============================================================

export type Prisklasse = 'standard' | 'mellom' | 'premium'

export interface Ferdighus {
  id: string
  leverandor: string
  modell: string
  bra_m2: number
  soverom: number
  bad: number
  prisklasse: Prisklasse
  pris_fra: number
  beskrivelse: string
  bilde_url?: string
  leveringstid_uker: number
  energiklasse: string
}

export interface EntreprenorTilbud {
  id: string
  fag: string
  firma: string
  status: 'sendt' | 'mottatt' | 'venter'
  pris?: number
  kommentar?: string
  gyldig_til?: string
  noedvendig: boolean // om faget er påkrevd for denne tomten
  aarsak?: string // hvorfor faget trengs (f.eks. "tomten er i støysone")
}

interface Props {
  tilbud: EntreprenorTilbud[]
  ferdighus: Ferdighus[]
  valgt_prisklasse?: Prisklasse
  behov: {
    geoteknisk: boolean
    geoteknisk_aarsak?: string
    vanningenior: boolean
    vanningenior_aarsak?: string
    akustiker: boolean
    akustiker_aarsak?: string
  }
}

const FAG_IKON: Record<string, typeof Hammer> = {
  'Grunnarbeid': Mountain,
  'Rørlegger': Droplets,
  'Geoteknisk': Mountain,
  'Vanningeniør': Droplets,
  'Akustiker': Volume2,
  'Uavhengig kontroll': Shield,
  'Ferdighusleverandør': Home,
}

const PRISKLASSE_INFO: Record<Prisklasse, { label: string; beskrivelse: string; farge: string }> = {
  standard: {
    label: 'Standard',
    beskrivelse: 'Funksjonelt og godt. Gode materialer, standard løsninger.',
    farge: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  mellom: {
    label: 'Mellomklasse',
    beskrivelse: 'Oppgraderte materialer, bedre kjøkken og bad, parkett.',
    farge: 'bg-green-100 text-green-700 border-green-200',
  },
  premium: {
    label: 'Premium',
    beskrivelse: 'Høykvalitetsmaterialer, design-kjøkken, smarthus, premium bad.',
    farge: 'bg-purple-100 text-purple-700 border-purple-200',
  },
}

const STATUS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  sendt: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Sendt' },
  mottatt: { bg: 'bg-green-100', text: 'text-green-700', label: 'Tilbud mottatt' },
  venter: { bg: 'bg-brand-100', text: 'text-brand-600', label: 'Ikke sendt' },
}

export function TomtEntreprenorPrising({ tilbud, ferdighus, valgt_prisklasse, behov }: Props) {
  const [prisklasse, setPrisklasse] = useState<Prisklasse>(valgt_prisklasse || 'mellom')
  const [expandedTilbud, setExpandedTilbud] = useState<string | null>(null)

  const filtrertHus = ferdighus.filter((h) => h.prisklasse === prisklasse)
  const totalTilbud = tilbud.filter((t) => t.status === 'mottatt').reduce((sum, t) => sum + (t.pris || 0), 0)
  const antallMottatt = tilbud.filter((t) => t.status === 'mottatt').length

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Prising og ferdighus
      </h2>
      <p className="text-brand-600 mb-8">
        Vi sender kart og tegninger til entreprenører for prising, og kobler deg med ferdighusleverandører basert på din prisklasse.
      </p>

      {/* Spesielle behov for denne tomten */}
      {(behov.geoteknisk || behov.vanningenior || behov.akustiker) && (
        <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 mb-8">
          <h3 className="text-sm font-semibold text-amber-800 mb-3">
            Spesielle fagbehov for denne tomten
          </h3>
          <div className="space-y-2">
            {behov.geoteknisk && (
              <div className="flex items-start gap-2 text-sm text-amber-700">
                <Mountain className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Geoteknisk vurdering påkrevd</span>
                  {behov.geoteknisk_aarsak && (
                    <span className="text-amber-600"> – {behov.geoteknisk_aarsak}</span>
                  )}
                </div>
              </div>
            )}
            {behov.vanningenior && (
              <div className="flex items-start gap-2 text-sm text-amber-700">
                <Droplets className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Vanningeniør påkrevd</span>
                  {behov.vanningenior_aarsak && (
                    <span className="text-amber-600"> – {behov.vanningenior_aarsak}</span>
                  )}
                </div>
              </div>
            )}
            {behov.akustiker && (
              <div className="flex items-start gap-2 text-sm text-amber-700">
                <Volume2 className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">Akustiker påkrevd</span>
                  {behov.akustiker_aarsak && (
                    <span className="text-amber-600"> – {behov.akustiker_aarsak}</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ---- Prisklasse-velger ---- */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold text-brand-700 mb-3">
          Velg prisklasse for boligen
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {(Object.entries(PRISKLASSE_INFO) as [Prisklasse, typeof PRISKLASSE_INFO.standard][]).map(
            ([key, info]) => (
              <button
                key={key}
                onClick={() => setPrisklasse(key)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  prisklasse === key
                    ? 'border-tomtly-accent bg-forest-50'
                    : 'border-brand-200 hover:border-brand-300'
                }`}
              >
                <span className={`inline-block px-2 py-0.5 text-xs rounded-full border ${info.farge} mb-2`}>
                  {info.label}
                </span>
                <p className="text-xs text-brand-600">{info.beskrivelse}</p>
              </button>
            )
          )}
        </div>
      </div>

      {/* ---- Ferdighus-forslag ---- */}
      <div className="mb-10">
        <h3 className="text-sm font-semibold text-brand-700 mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-tomtly-gold" />
          Anbefalte husmodeller – {PRISKLASSE_INFO[prisklasse].label}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtrertHus.map((hus) => (
            <div
              key={hus.id}
              className="bg-white border border-brand-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Bilde-placeholder */}
              <div className="aspect-[16/9] bg-brand-100 flex items-center justify-center">
                <Home className="w-10 h-10 text-brand-300" />
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-brand-500">{hus.leverandor}</p>
                  <span className="text-xs text-brand-400">{hus.energiklasse}</span>
                </div>
                <h4 className="font-semibold text-tomtly-dark">{hus.modell}</h4>

                <div className="flex gap-3 mt-2 text-xs text-brand-600">
                  <span>{hus.bra_m2} m²</span>
                  <span>{hus.soverom} soverom</span>
                  <span>{hus.bad} bad</span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-100">
                  <div>
                    <p className="text-lg font-bold text-tomtly-accent">{formatNOK(hus.pris_fra)}</p>
                    <p className="text-xs text-brand-400">fra-pris, nøkkelferdig</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-brand-500">
                    <Clock className="w-3.5 h-3.5" />
                    {hus.leveringstid_uker} uker
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---- Entreprenørtilbud ---- */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-brand-700">
            Entreprenørtilbud
          </h3>
          {antallMottatt > 0 && (
            <span className="text-sm text-brand-500">
              {antallMottatt} av {tilbud.length} tilbud mottatt
              {totalTilbud > 0 && ` · Total: ${formatNOK(totalTilbud)}`}
            </span>
          )}
        </div>

        <div className="space-y-2">
          {tilbud.map((t) => {
            const Ikon = FAG_IKON[t.fag] || Wrench
            const status = STATUS_STYLE[t.status]
            const isExpanded = expandedTilbud === t.id

            return (
              <div
                key={t.id}
                className="bg-white border border-brand-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedTilbud(isExpanded ? null : t.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-brand-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center">
                      <Ikon className="w-4 h-4 text-brand-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm text-tomtly-dark">{t.fag}</p>
                        {t.noedvendig && (
                          <span className="px-1.5 py-0.5 text-[10px] rounded bg-red-100 text-red-600">Påkrevd</span>
                        )}
                      </div>
                      <p className="text-xs text-brand-500">{t.firma}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {t.pris && (
                      <span className="font-semibold text-sm text-tomtly-dark">
                        {formatNOK(t.pris)}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 text-xs rounded-full ${status.bg} ${status.text}`}>
                      {status.label}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-brand-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-brand-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-brand-100 pt-3 ml-12">
                    {t.kommentar && (
                      <p className="text-sm text-brand-600 mb-2">{t.kommentar}</p>
                    )}
                    {t.aarsak && (
                      <p className="text-xs text-brand-500 mb-2">
                        <span className="font-medium">Behov:</span> {t.aarsak}
                      </p>
                    )}
                    {t.gyldig_til && (
                      <p className="text-xs text-brand-400">
                        Tilbud gyldig til {t.gyldig_til}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
