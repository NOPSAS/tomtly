'use client'

import { useState } from 'react'
import { CheckCircle2, FileText, MapPin, Calendar, ChevronDown, ChevronUp, Building2, Home, Hammer } from 'lucide-react'

// ============================================================
// GODKJENTE TILTAK I NÆROMRÅDET
// Viser byggesaker og dispensasjoner som er godkjent
// i nærområdet – gir kjøper trygghet og presedens.
// ============================================================

export interface GodkjentTiltak {
  id: string
  adresse: string
  avstand_m: number
  type: 'nybygg' | 'tilbygg' | 'riving_nybygg' | 'bruksendring' | 'deling'
  beskrivelse: string
  status: 'godkjent' | 'avslått' | 'under_behandling'
  vedtaksdato: string
  saksbehandlingstid_uker: number
  dispensasjoner: string[]
  soknadstype: 'ett_trinn' | 'rammetillatelse'
  bra_m2?: number
  enheter?: number
}

interface Props {
  tiltak: GodkjentTiltak[]
  radius_m: number
}

const TYPE_IKON: Record<string, typeof Home> = {
  nybygg: Home,
  tilbygg: Building2,
  riving_nybygg: Hammer,
  bruksendring: FileText,
  deling: MapPin,
}

const TYPE_LABEL: Record<string, string> = {
  nybygg: 'Nybygg',
  tilbygg: 'Tilbygg',
  riving_nybygg: 'Riving + nybygg',
  bruksendring: 'Bruksendring',
  deling: 'Fradeling',
}

const STATUS_STYLE: Record<string, string> = {
  godkjent: 'bg-green-100 text-green-700',
  avslått: 'bg-red-100 text-red-700',
  under_behandling: 'bg-blue-100 text-blue-700',
}

const STATUS_LABEL: Record<string, string> = {
  godkjent: 'Godkjent',
  avslått: 'Avslått',
  under_behandling: 'Under behandling',
}

export function TomtGodkjenninger({ tiltak, radius_m }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const godkjente = tiltak.filter((t) => t.status === 'godkjent')
  const snittBehandlingstid = godkjente.length > 0
    ? Math.round(godkjente.reduce((sum, t) => sum + t.saksbehandlingstid_uker, 0) / godkjente.length)
    : 0
  const dispensasjonsTiltak = godkjente.filter((t) => t.dispensasjoner.length > 0)

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Godkjente tiltak i nærområdet
      </h2>
      <p className="text-brand-600 mb-6">
        Byggesaker innenfor {radius_m} meter fra tomten. Gir innsikt i hva kommunen har godkjent tidligere.
      </p>

      {/* Nøkkeltall */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
          <p className="text-2xl font-bold text-green-700">{godkjente.length}</p>
          <p className="text-xs text-green-600 mt-1">Godkjente tiltak</p>
        </div>
        <div className="bg-brand-50 rounded-xl p-4 text-center border border-brand-200">
          <p className="text-2xl font-bold text-tomtly-dark">{tiltak.length}</p>
          <p className="text-xs text-brand-500 mt-1">Totalt behandlet</p>
        </div>
        <div className="bg-brand-50 rounded-xl p-4 text-center border border-brand-200">
          <p className="text-2xl font-bold text-tomtly-dark">{snittBehandlingstid} uker</p>
          <p className="text-xs text-brand-500 mt-1">Snitt behandlingstid</p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
          <p className="text-2xl font-bold text-amber-700">{dispensasjonsTiltak.length}</p>
          <p className="text-xs text-amber-600 mt-1">Med dispensasjon</p>
        </div>
      </div>

      {/* Innsikts-boks */}
      {godkjente.length > 0 && (
        <div className="bg-forest-50 rounded-xl p-5 border border-forest-100 mb-8">
          <h3 className="text-sm font-semibold text-forest-800 mb-2">Hva betyr dette for din tomt?</h3>
          <p className="text-sm text-forest-700 leading-relaxed">
            Kommunen har godkjent {godkjente.length} tiltak i nærområdet, med en gjennomsnittlig
            saksbehandlingstid på {snittBehandlingstid} uker.
            {dispensasjonsTiltak.length > 0
              ? ` ${dispensasjonsTiltak.length} av disse fikk dispensasjon, noe som tyder på at kommunen er villig til å gi dispensasjoner i området.`
              : ' Ingen av sakene krevde dispensasjon, noe som tyder på at reguleringsplanen gir godt handlingsrom.'
            }
          </p>
        </div>
      )}

      {/* Saksliste */}
      <div className="space-y-3">
        {tiltak.map((t) => {
          const Ikon = TYPE_IKON[t.type] || FileText
          const isExpanded = expanded === t.id

          return (
            <div
              key={t.id}
              className="bg-white border border-brand-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpanded(isExpanded ? null : t.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-brand-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Ikon className="w-5 h-5 text-brand-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm text-tomtly-dark">{t.adresse}</p>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${STATUS_STYLE[t.status]}`}>
                        {STATUS_LABEL[t.status]}
                      </span>
                    </div>
                    <p className="text-xs text-brand-500">
                      {TYPE_LABEL[t.type]} · {t.avstand_m}m unna · {t.vedtaksdato}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {t.dispensasjoner.length > 0 && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-amber-100 text-amber-700">
                      {t.dispensasjoner.length} disp.
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-brand-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-brand-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-brand-100 pt-3">
                  <p className="text-sm text-brand-700 mb-3">{t.beskrivelse}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    <div className="text-xs">
                      <span className="text-brand-500">Søknadstype</span>
                      <p className="font-medium text-brand-700">
                        {t.soknadstype === 'ett_trinn' ? 'Ett trinn' : 'Rammetillatelse'}
                      </p>
                    </div>
                    <div className="text-xs">
                      <span className="text-brand-500">Behandlingstid</span>
                      <p className="font-medium text-brand-700">{t.saksbehandlingstid_uker} uker</p>
                    </div>
                    {t.bra_m2 && (
                      <div className="text-xs">
                        <span className="text-brand-500">BRA</span>
                        <p className="font-medium text-brand-700">{t.bra_m2} m²</p>
                      </div>
                    )}
                    {t.enheter && (
                      <div className="text-xs">
                        <span className="text-brand-500">Enheter</span>
                        <p className="font-medium text-brand-700">{t.enheter}</p>
                      </div>
                    )}
                  </div>

                  {t.dispensasjoner.length > 0 && (
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                      <p className="text-xs font-semibold text-amber-700 mb-1.5">Dispensasjoner innvilget:</p>
                      <ul className="space-y-1">
                        {t.dispensasjoner.map((d, idx) => (
                          <li key={idx} className="text-xs text-amber-600 flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
