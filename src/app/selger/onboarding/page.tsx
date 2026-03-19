'use client'

import { useState } from 'react'
import {
  MapPin,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
} from 'lucide-react'

// ============================================================
// SELGER ONBOARDING – 3-stegs wizard
// Steg 1: Adresse + hva du ser for deg
// Steg 2: Prismodell
// Steg 3: Bekreftelse
// ============================================================

const STEG = [
  { nummer: 1, tittel: 'Om tomten', ikon: MapPin },
  { nummer: 2, tittel: 'Prismodell', ikon: CreditCard },
  { nummer: 3, tittel: 'Bekreftelse', ikon: CheckCircle2 },
]

export default function SelgerOnboarding() {
  const [steg, setSteg] = useState(1)

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="font-display text-2xl font-bold text-tomtly-dark mb-1">
            Legg ut din tomt
          </h1>
          <p className="text-sm text-brand-500">
            Oppgi adressen og fortell oss hva du ser for deg. Vi gjør resten.
          </p>

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

      <div className="max-w-3xl mx-auto px-4 py-10">
        {steg === 1 && <Steg1Tomt />}
        {steg === 2 && <Steg2Prismodell />}
        {steg === 3 && <Steg3Bekreftelse />}

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

          {steg < 3 ? (
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
              Send inn
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

function Steg1Tomt() {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8">
      <h2 className="text-lg font-semibold text-tomtly-dark mb-2">
        Fortell oss om tomten
      </h2>
      <p className="text-sm text-brand-500 mb-6">
        Vi trenger bare adressen. Vi henter reguleringsplan, matrikkeldata og kart automatisk.
      </p>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Adresse *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
            <input
              type="text"
              placeholder="F.eks. Bjørnemyrveien 20, 1453 Nesodden"
              className="w-full pl-10 pr-4 py-3 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
            />
          </div>
          <p className="text-xs text-brand-400 mt-1.5">
            Vi henter automatisk tomtegrenser, reguleringsplan og matrikkeldata fra Kartverket.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Hva ser du for deg? *
          </label>
          <textarea
            rows={4}
            placeholder="Fortell oss hva du ønsker å gjøre med tomten. F.eks:&#10;– Bygge enebolig med utleiedel&#10;– Selge tomten som den er&#10;– Dele tomten og bygge to boliger&#10;– Usikker, ønsker en vurdering"
            className="w-full px-3 py-3 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent resize-none"
          />
          <p className="text-xs text-brand-400 mt-1.5">
            Jo mer du forteller, jo bedre kan vi tilpasse analysen.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Budsjett for husbygging
          </label>
          <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent">
            <option value="">Velg budsjett</option>
            <option value="under-3">Under 3 MNOK</option>
            <option value="3-5">3-5 MNOK</option>
            <option value="5-7">5-7 MNOK</option>
            <option value="7-10">7-10 MNOK</option>
            <option value="over-10">Over 10 MNOK</option>
            <option value="usikker">Usikker</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Forventet salgsverdi (valgfritt)
          </label>
          <input
            type="number"
            placeholder="F.eks. 8 000 000"
            className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">
              Foretrukket hustype
            </label>
            <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent">
              <option value="">Velg hustype</option>
              <option value="enebolig">Enebolig</option>
              <option value="tomannsbolig">Tomannsbolig</option>
              <option value="rekkehus">Rekkehus</option>
              <option value="leilighetsbygg">Leilighetsbygg</option>
              <option value="hytte">Hytte/fritidsbolig</option>
              <option value="aapen">Åpen for forslag</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">
              Stilpreferanse
            </label>
            <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent">
              <option value="">Velg stil</option>
              <option value="moderne">Moderne/funkis</option>
              <option value="tradisjonell">Tradisjonell/klassisk</option>
              <option value="skandinavisk">Skandinavisk minimalistisk</option>
              <option value="herskapelig">Herskapelig</option>
              <option value="aapen">Åpen for forslag</option>
            </select>
          </div>
        </div>

        {/* Bilder av tomten */}
        <div className="pt-4 border-t border-brand-200">
          <h3 className="text-sm font-semibold text-brand-700 mb-1.5">Bilder av tomten</h3>
          <p className="text-xs text-brand-400 mb-3">
            Last opp bilder for et bedre resultat. Dronebilder, panorama eller vanlige bilder. Valgfritt, men anbefalt.
          </p>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-brand-300 rounded-lg cursor-pointer hover:border-tomtly-accent hover:bg-forest-50/30 transition-colors">
            <Upload className="w-6 h-6 text-brand-400 mb-2" />
            <span className="text-sm text-brand-500">Klikk eller dra bilder hit (JPG, PNG)</span>
            <input type="file" multiple accept="image/jpeg,image/png" className="hidden" />
          </label>
        </div>

        <div className="pt-4 border-t border-brand-200">
          <h3 className="text-sm font-semibold text-brand-700 mb-4">Dine opplysninger</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Navn *</label>
              <input
                type="text"
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Telefon *</label>
              <input
                type="tel"
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post *</label>
            <input
              type="email"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function Steg2Prismodell() {
  const [valgt, setValgt] = useState<'standard' | 'salgsoppdrag'>('salgsoppdrag')

  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8">
      <h2 className="text-lg font-semibold text-tomtly-dark mb-2">
        Velg prismodell
      </h2>
      <p className="text-sm text-brand-500 mb-6">
        Begge modeller gir deg komplett tomtanalyse med mulighetsstudie, husmodeller og byggekalkyle.
      </p>

      <div className="space-y-3">
        <button
          onClick={() => setValgt('standard')}
          className={`w-full text-left p-5 rounded-xl border-2 transition-all ${
            valgt === 'standard'
              ? 'border-tomtly-accent bg-forest-50'
              : 'border-brand-200 hover:border-brand-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-tomtly-dark">Selg selv</p>
              <p className="text-sm text-brand-500 mt-0.5">Komplett tomtanalyse med mulighetsstudie, husmodeller, byggekalkyle og publisering. Du selger selv.</p>
            </div>
            <p className="text-2xl font-bold text-tomtly-dark whitespace-nowrap ml-4">4 900 kr</p>
          </div>
        </button>

        <button
          onClick={() => setValgt('salgsoppdrag')}
          className={`w-full text-left p-5 rounded-xl border-2 transition-all relative ${
            valgt === 'salgsoppdrag'
              ? 'border-tomtly-accent bg-forest-50'
              : 'border-brand-200 hover:border-brand-300'
          }`}
        >
          <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
            Mest populær
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-tomtly-dark">Vi selger for deg</p>
              <p className="text-sm text-brand-500 mt-0.5">Vi setter markedspris og håndterer salgsprosessen via Propr.</p>
            </div>
            <p className="text-2xl font-bold text-tomtly-dark whitespace-nowrap ml-4">4 900 kr <span className="text-sm font-normal text-brand-400">+ 3,5%</span></p>
          </div>
          <p className="text-xs text-brand-400 mt-2">
            Salgsprovisjon: 4 900 kr + 3,5% av salgspris. Salg gjennomføres via Propr – en godkjent plattform for eiendomsoppgjør. Tomtly er ikke et eiendomsmeglerforetak.
          </p>
        </button>
      </div>
    </div>
  )
}

function Steg3Bekreftelse() {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8 text-center">
      <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-8 h-8 text-tomtly-accent" />
      </div>
      <h2 className="text-xl font-semibold text-tomtly-dark mb-2">
        Alt ser bra ut!
      </h2>
      <p className="text-brand-600 max-w-md mx-auto mb-8">
        Når du sender inn, starter vårt arkitekt- og eiendomsteam analysen av tomten.
        Du vil motta en komplett mulighetsstudie innen 3-5 virkedager.
      </p>

      <div className="bg-brand-50 rounded-xl p-6 text-left max-w-md mx-auto">
        <h3 className="text-sm font-semibold text-brand-700 mb-3">Hva skjer videre?</h3>
        <ol className="space-y-3">
          {[
            'Vi henter reguleringsplan og matrikkeldata for tomten',
            'Arkitektteamet vurderer mulighetene',
            'Vi matcher husmodeller og innhenter priser',
            'Du mottar ferdig analyse med husmodeller og kostnadsoverslag',
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
