'use client'

import { useState } from 'react'
import {
  MapPin,
  FileText,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Ruler,
} from 'lucide-react'

// ============================================================
// SELGER ONBOARDING – 4-stegs wizard for tomteeiere
// ============================================================

const STEG = [
  { nummer: 1, tittel: 'Tomteinfo', ikon: MapPin },
  { nummer: 2, tittel: 'Dokumenter', ikon: FileText },
  { nummer: 3, tittel: 'Prismodell', ikon: CreditCard },
  { nummer: 4, tittel: 'Bekreftelse', ikon: CheckCircle2 },
]

export default function SelgerOnboarding() {
  const [steg, setSteg] = useState(1)

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Progress header */}
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="font-display text-2xl font-bold text-tomtly-dark mb-1">
            Legg ut din tomt
          </h1>
          <p className="text-sm text-brand-500">
            Fyll ut informasjon om tomten, så gjør vi resten.
          </p>

          {/* Stepper */}
          <div className="flex items-center gap-2 mt-6">
            {STEG.map((s, idx) => (
              <div key={s.nummer} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    steg === s.nummer
                      ? 'bg-tomtly-accent text-white'
                      : steg > s.nummer
                        ? 'bg-forest-100 text-forest-700'
                        : 'bg-brand-100 text-brand-400'
                  }`}
                >
                  <s.ikon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.tittel}</span>
                </div>
                {idx < STEG.length - 1 && (
                  <div className={`flex-1 h-0.5 ${steg > s.nummer ? 'bg-forest-300' : 'bg-brand-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Innhold */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        {steg === 1 && <Steg1Tomteinfo />}
        {steg === 2 && <Steg2Dokumenter />}
        {steg === 3 && <Steg3Prismodell />}
        {steg === 4 && <Steg4Bekreftelse />}

        {/* Navigasjon */}
        <div className="flex justify-between mt-10">
          {steg > 1 ? (
            <button
              onClick={() => setSteg(steg - 1)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-600 hover:text-brand-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Tilbake
            </button>
          ) : (
            <div />
          )}

          {steg < 4 ? (
            <button
              onClick={() => setSteg(steg + 1)}
              className="flex items-center gap-2 px-6 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Neste
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button className="flex items-center gap-2 px-6 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors">
              <CheckCircle2 className="w-4 h-4" />
              Send inn tomt
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Steg1Tomteinfo() {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8">
      <h2 className="text-lg font-semibold text-tomtly-dark mb-6">
        Informasjon om tomten
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Adresse
          </label>
          <input
            type="text"
            placeholder="F.eks. Bjørnemyrveien 24, 1413 Oppegård"
            className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
          />
          <p className="text-xs text-brand-400 mt-1">
            Vi henter automatisk matrikkeldata og reguleringsplan
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">
              GNR
            </label>
            <input
              type="number"
              placeholder="42"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">
              BNR
            </label>
            <input
              type="number"
              placeholder="156"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Tomteareal (m²)
          </label>
          <div className="relative">
            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
            <input
              type="number"
              placeholder="1240"
              className="w-full pl-10 pr-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Ønsket pris (valgfritt)
          </label>
          <input
            type="number"
            placeholder="4 500 000"
            className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Beskrivelse (valgfritt)
          </label>
          <textarea
            rows={3}
            placeholder="Fortell litt om tomten, beliggenhet, evt. eksisterende bygg..."
            className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none"
          />
        </div>
      </div>
    </div>
  )
}

function Steg2Dokumenter() {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8">
      <h2 className="text-lg font-semibold text-tomtly-dark mb-2">
        Dokumenter
      </h2>
      <p className="text-sm text-brand-500 mb-6">
        Last opp relevante dokumenter. Vi henter det meste automatisk, men
        egne dokumenter kan styrke analysen.
      </p>

      <div className="space-y-4">
        {[
          { tittel: 'Situasjonskart', beskrivelse: 'Kart over tomten med grenser', krevet: false },
          { tittel: 'Reguleringsplan', beskrivelse: 'Gjeldende reguleringsplan med bestemmelser', krevet: false },
          { tittel: 'Grunnundersøkelse', beskrivelse: 'Geoteknisk rapport hvis tilgjengelig', krevet: false },
          { tittel: 'Bilder av tomten', beskrivelse: 'Dronebilder, panorama, streetview', krevet: false },
        ].map((dok) => (
          <div
            key={dok.tittel}
            className="border-2 border-dashed border-brand-200 rounded-xl p-6 text-center hover:border-tomtly-accent/30 transition-colors cursor-pointer"
          >
            <Upload className="w-6 h-6 text-brand-300 mx-auto mb-2" />
            <p className="text-sm font-medium text-tomtly-dark">{dok.tittel}</p>
            <p className="text-xs text-brand-400 mt-1">{dok.beskrivelse}</p>
            <p className="text-xs text-brand-300 mt-2">
              Klikk eller dra filer hit (PDF, JPG, PNG)
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Steg3Prismodell() {
  const [valgt, setValgt] = useState<'fastpris' | 'provisjon'>('provisjon')

  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8">
      <h2 className="text-lg font-semibold text-tomtly-dark mb-2">
        Velg prismodell
      </h2>
      <p className="text-sm text-brand-500 mb-6">
        Velg den modellen som passer deg best.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => setValgt('fastpris')}
          className={`text-left p-6 rounded-xl border-2 transition-all ${
            valgt === 'fastpris'
              ? 'border-tomtly-accent bg-forest-50'
              : 'border-brand-200 hover:border-brand-300'
          }`}
        >
          <p className="text-2xl font-bold text-tomtly-dark mb-1">20 000 kr</p>
          <p className="text-sm text-brand-500 mb-3">Engangsbetaling</p>
          <ul className="space-y-1.5 text-xs text-brand-600">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent" />
              Betaler én gang
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent" />
              Full analyse inkludert
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent" />
              Ingen provisjon ved salg
            </li>
          </ul>
        </button>

        <button
          onClick={() => setValgt('provisjon')}
          className={`text-left p-6 rounded-xl border-2 transition-all relative ${
            valgt === 'provisjon'
              ? 'border-tomtly-accent bg-forest-50'
              : 'border-brand-200 hover:border-brand-300'
          }`}
        >
          <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
            Populær
          </div>
          <p className="text-2xl font-bold text-tomtly-dark mb-1">2% provisjon</p>
          <p className="text-sm text-brand-500 mb-3">Kun ved salg</p>
          <ul className="space-y-1.5 text-xs text-brand-600">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent" />
              Gratis å komme i gang
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent" />
              Betaler kun ved suksess
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent" />
              Prioritert analyse
            </li>
          </ul>
        </button>
      </div>

      {/* Kontaktinfo */}
      <div className="mt-8 pt-6 border-t border-brand-200">
        <h3 className="text-sm font-semibold text-brand-700 mb-4">Dine opplysninger</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Navn</label>
            <input
              type="text"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Telefon</label>
            <input
              type="tel"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post</label>
          <input
            type="email"
            className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
          />
        </div>
      </div>
    </div>
  )
}

function Steg4Bekreftelse() {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8 text-center">
      <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-8 h-8 text-tomtly-accent" />
      </div>
      <h2 className="text-xl font-semibold text-tomtly-dark mb-2">
        Alt ser bra ut!
      </h2>
      <p className="text-brand-600 max-w-md mx-auto mb-8">
        Når du sender inn, starter vår AI-analyse av tomten. Du vil motta en
        komplett mulighetsstudie innen 3-5 virkedager.
      </p>

      <div className="bg-brand-50 rounded-xl p-6 text-left max-w-md mx-auto">
        <h3 className="text-sm font-semibold text-brand-700 mb-3">Hva skjer videre?</h3>
        <ol className="space-y-3">
          {[
            'Vi analyserer reguleringsplan og bestemmelser',
            'AI beregner tomtescore og utviklingsscenarioer',
            'Arkitekt vurderer mulighetene',
            'Du mottar ferdig analyse med visualiseringer',
            'Tomten publiseres på Tomtly',
          ].map((steg, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-brand-700">
              <span className="w-5 h-5 bg-tomtly-accent text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">
                {idx + 1}
              </span>
              {steg}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
