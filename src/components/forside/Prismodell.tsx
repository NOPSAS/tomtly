'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

const ABONNEMENTER = [
  {
    id: 'basis',
    navn: 'Basis',
    pris: '7 500',
    husmodeller: '1 husmodell',
    detaljer: [
      '1 husmodell på tomten',
      'Full faglig analyse fra arkitektteamet',
      'Tomtescore, reguleringsanalyse, kostnadsoverslag',
      'Verdivurdering med sammenlignbare salg',
      'Publisering på Tomtly',
      '1 måneds oppsigelsestid',
      'Betaler for inneværende dager i måneden',
    ],
  },
  {
    id: 'standard',
    navn: 'Standard',
    pris: '10 000',
    popular: true,
    husmodeller: '3 husmodeller',
    detaljer: [
      'Velg inntil 3 husmodeller på tomten',
      'Full faglig analyse fra arkitektteamet',
      'Tomtescore, reguleringsanalyse, kostnadsoverslag',
      'Verdivurdering med sammenlignbare salg',
      'Dispensasjonsanalyse og tidslinje',
      'Fastpris tegning og søknad via Tegnebua',
      'Publisering på Tomtly',
      '1 måneds oppsigelsestid',
      'Betaler for inneværende dager i måneden',
    ],
  },
  {
    id: 'pro',
    navn: 'Pro',
    pris: '15 000',
    husmodeller: '5 husmodeller',
    detaljer: [
      'Velg inntil 5 husmodeller på tomten',
      'Full faglig analyse fra arkitektteamet',
      'Tomtescore, reguleringsanalyse, kostnadsoverslag',
      'Verdivurdering med sammenlignbare salg',
      'Dispensasjonsanalyse og tidslinje',
      'Entreprenørprising (grunnarbeid, rør, UK)',
      'Godkjente tiltak i nærområdet',
      'Fastpris tegning og søknad via Tegnebua',
      'Risikoanalyse og prosjektsjekkliste',
      'Publisering på Tomtly',
      '1 måneds oppsigelsestid',
      'Betaler for inneværende dager i måneden',
    ],
  },
]

export function AbonnementKort() {
  const [aktivtAbo, setAktivtAbo] = useState<string | null>(null)

  return (
    <div className="max-w-4xl mx-auto mb-10">
      <h3 className="text-center text-sm font-semibold text-brand-700 mb-4">
        Abonnement – velg antall husmodeller
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ABONNEMENTER.map((abo) => {
          const erAktiv = aktivtAbo === abo.id
          return (
            <div key={abo.id}>
              <button
                onClick={() => setAktivtAbo(erAktiv ? null : abo.id)}
                className={`w-full text-center p-5 rounded-xl border-2 transition-all ${
                  erAktiv
                    ? 'border-tomtly-accent bg-forest-50 shadow-md'
                    : abo.popular
                      ? 'border-tomtly-accent/50 bg-forest-50/50 hover:bg-forest-50'
                      : 'border-brand-200 hover:border-brand-300'
                }`}
              >
                {abo.popular && (
                  <span className="text-[10px] font-semibold text-tomtly-accent uppercase tracking-wide">Mest populær</span>
                )}
                <p className="text-sm font-medium text-brand-500">{abo.navn}</p>
                <p className="text-2xl font-bold text-tomtly-dark mt-1">{abo.pris} <span className="text-sm font-normal text-brand-400">kr/mnd</span></p>
                <p className="text-xs font-semibold text-forest-700 mt-1">{abo.husmodeller}</p>
                <p className="text-[10px] text-brand-400 mt-2">{erAktiv ? 'Klikk for å lukke' : 'Klikk for detaljer'}</p>
              </button>

              {erAktiv && (
                <div className="mt-3 bg-white rounded-xl border border-brand-200 p-5 animate-fade-up">
                  <h4 className="text-sm font-semibold text-tomtly-dark mb-3">{abo.navn} – {abo.pris} kr/mnd</h4>
                  <ul className="space-y-2">
                    {abo.detaljer.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-brand-700">
                        <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/selger/onboarding"
                    className="mt-4 block w-full text-center px-4 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
                  >
                    Kom i gang med {abo.navn}
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
