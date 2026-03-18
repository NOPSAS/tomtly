'use client'

import { useState } from 'react'
import {
  CheckCircle2,
  Circle,
  FileText,
  Search,
  Hammer,
  Home,
  Key,
  Phone,
  MapPin,
  Shield,
  Clock,
} from 'lucide-react'

// ============================================================
// PROSJEKTSJEKKLISTE
// Steg-for-steg etter tomtekjøp – hva gjør du nå?
// ============================================================

interface SjekklisteSteg {
  id: string
  fase: string
  faseIkon: typeof FileText
  steg: {
    tittel: string
    beskrivelse: string
    estimert_tid?: string
    tips?: string
  }[]
}

const SJEKKLISTE: SjekklisteSteg[] = [
  {
    id: 'forberedelse',
    fase: 'Forberedelse',
    faseIkon: Search,
    steg: [
      {
        tittel: 'Velg prisklasse og husmodell',
        beskrivelse: 'Bestem deg for hvilken prisklasse (standard/mellom/premium) og velg husmodell fra våre leverandørpartnere.',
        tips: 'Du kan endre husmodell underveis, men prisklasse bør bestemmes tidlig.',
      },
      {
        tittel: 'Avklar finansiering med banken',
        beskrivelse: 'Ta med Tomtly-analysen til banken. Den inneholder alt banken trenger: tomtepris, byggekostnad, salgsverdi og risikovurdering.',
        estimert_tid: '1-2 uker',
        tips: 'Bruk finansieringsberegneren vår for å forberede samtalen.',
      },
      {
        tittel: 'Bestill grunnundersøkelse',
        beskrivelse: 'Anbefales for å avdekke grunnforhold. Kreves av banken i de fleste tilfeller.',
        estimert_tid: '2-3 uker',
      },
    ],
  },
  {
    id: 'prosjektering',
    fase: 'Prosjektering',
    faseIkon: FileText,
    steg: [
      {
        tittel: 'Engasjer ansvarlig søker',
        beskrivelse: 'Arkitekt eller ferdighusleverandør står som ansvarlig søker. De utarbeider tegninger og søknadsdokumenter.',
        estimert_tid: '1 uke å velge',
      },
      {
        tittel: 'Tegninger og prosjektering',
        beskrivelse: 'Situasjonsplan, fasader, snitt og plantegninger. For ferdighus er mye av dette allerede klart.',
        estimert_tid: '3-4 uker',
      },
      {
        tittel: 'Innhent tilbud fra entreprenører',
        beskrivelse: 'Grunnarbeid, rørlegger, elektriker. Tomtly sender automatisk forespørsler til våre samarbeidspartnere.',
        estimert_tid: '2-3 uker',
        tips: 'Tomtly har allerede sendt forespørsler – sjekk Prising-seksjonen.',
      },
    ],
  },
  {
    id: 'soknad',
    fase: 'Byggesøknad',
    faseIkon: Shield,
    steg: [
      {
        tittel: 'Nabovarsling',
        beskrivelse: 'Ansvarlig søker sender nabovarsel til alle berørte naboer. 2 ukers merknadsfrist.',
        estimert_tid: '2 uker (fast)',
      },
      {
        tittel: 'Send byggesøknad',
        beskrivelse: 'Søknad i ett trinn (3 uker) eller rammesøknad (12 uker). Se Tidslinje-seksjonen for din tomts estimat.',
        estimert_tid: '3-12 uker',
      },
      {
        tittel: 'Evt. opparbeidelse av infrastruktur',
        beskrivelse: 'Dersom det er rekkefølgekrav (vei, VA), må dette gjennomføres før eller parallelt med bygging.',
        tips: 'Sjekk Dispensasjoner-seksjonen for skjulte krav på denne tomten.',
      },
    ],
  },
  {
    id: 'bygging',
    fase: 'Bygging',
    faseIkon: Hammer,
    steg: [
      {
        tittel: 'Kontraktsinngåelse',
        beskrivelse: 'Signer kontrakt med ferdighusleverandør og øvrige entreprenører. Bruk fastpriskontrakt.',
        tips: 'Få med en klausul om dagbøter ved forsinkelse.',
      },
      {
        tittel: 'Byggestart',
        beskrivelse: 'Grunnarbeid starter. Bestill ferdighus for produksjon. Typisk leveringstid 14-22 uker.',
        estimert_tid: '6-10 måneder totalt',
      },
      {
        tittel: 'Ferdigstillelse og sluttkontroll',
        beskrivelse: 'Uavhengig kontroll, sluttbefaring med kommunen, og ferdigattest.',
        estimert_tid: '2-4 uker',
      },
    ],
  },
  {
    id: 'ferdig',
    fase: 'Innflytting',
    faseIkon: Key,
    steg: [
      {
        tittel: 'Ferdigattest fra kommunen',
        beskrivelse: 'Kommunen utsteder ferdigattest etter sluttbefaring og dokumentasjon av uavhengig kontroll.',
      },
      {
        tittel: 'Overtakelse',
        beskrivelse: 'Overtagelsesforretning med entreprenør. Dokumenter eventuelle mangler og avtal utbedringsfrist.',
      },
      {
        tittel: 'Flytt inn!',
        beskrivelse: 'Gratulerer – du har bygget bolig! Husk å melde adresseendring og skaffe boligforsikring.',
      },
    ],
  },
]

export function TomtSjekkliste() {
  const [ferdigSteg, setFerdigSteg] = useState<Set<string>>(new Set())

  const toggleSteg = (faseId: string, stegIdx: number) => {
    const key = `${faseId}-${stegIdx}`
    setFerdigSteg((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const totalSteg = SJEKKLISTE.reduce((sum, fase) => sum + fase.steg.length, 0)
  const ferdigAntall = ferdigSteg.size
  const prosentFerdig = Math.round((ferdigAntall / totalSteg) * 100)

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Prosjektsjekkliste
      </h2>
      <p className="text-brand-600 mb-6">
        Steg-for-steg fra tomtekjøp til innflytting.
      </p>

      {/* Fremdrift */}
      <div className="bg-brand-50 rounded-xl p-4 border border-brand-200 mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-brand-700">Fremdrift</span>
          <span className="text-sm font-bold text-tomtly-dark">
            {ferdigAntall} av {totalSteg} steg ({prosentFerdig}%)
          </span>
        </div>
        <div className="w-full bg-brand-200 rounded-full h-2">
          <div
            className="h-2 rounded-full bg-tomtly-accent transition-all duration-500"
            style={{ width: `${prosentFerdig}%` }}
          />
        </div>
      </div>

      {/* Faser */}
      <div className="space-y-8">
        {SJEKKLISTE.map((fase) => {
          const faseStegFerdig = fase.steg.filter(
            (_, idx) => ferdigSteg.has(`${fase.id}-${idx}`)
          ).length
          const faseFerdig = faseStegFerdig === fase.steg.length

          return (
            <div key={fase.id}>
              {/* Fase-header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${faseFerdig ? 'bg-green-100' : 'bg-brand-100'}`}>
                  <fase.faseIkon className={`w-5 h-5 ${faseFerdig ? 'text-green-600' : 'text-brand-500'}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-tomtly-dark">{fase.fase}</h3>
                  <p className="text-xs text-brand-500">
                    {faseStegFerdig} av {fase.steg.length} fullført
                  </p>
                </div>
              </div>

              {/* Steg */}
              <div className="ml-4 border-l-2 border-brand-200 pl-6 space-y-4">
                {fase.steg.map((steg, idx) => {
                  const erFerdig = ferdigSteg.has(`${fase.id}-${idx}`)

                  return (
                    <div
                      key={idx}
                      className={`bg-white rounded-xl border p-4 cursor-pointer transition-all ${
                        erFerdig
                          ? 'border-green-200 bg-green-50/50'
                          : 'border-brand-200 hover:border-brand-300'
                      }`}
                      onClick={() => toggleSteg(fase.id, idx)}
                    >
                      <div className="flex items-start gap-3">
                        {erFerdig ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-brand-300 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className={`font-medium text-sm ${erFerdig ? 'text-green-700 line-through' : 'text-tomtly-dark'}`}>
                            {steg.tittel}
                          </p>
                          <p className="text-xs text-brand-500 mt-1">{steg.beskrivelse}</p>

                          <div className="flex flex-wrap gap-3 mt-2">
                            {steg.estimert_tid && (
                              <span className="flex items-center gap-1 text-xs text-brand-400">
                                <Clock className="w-3 h-3" />
                                {steg.estimert_tid}
                              </span>
                            )}
                            {steg.tips && (
                              <span className="text-xs text-forest-600 bg-forest-50 px-2 py-0.5 rounded">
                                Tips: {steg.tips}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
