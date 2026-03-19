'use client'

import { useState } from 'react'
import {
  Landmark,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ChevronDown,
} from 'lucide-react'

export default function ForBankerPage() {
  return (
    <>
      <HeroSection />
      <Flyten />
      <Prismodell />
      <Regnestykke />
      <FAQ />
      <CTASection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Landmark className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For banker
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Kvalifiserte byggelånskunder
            <br />
            <span className="text-green-400">med ferdig prosjektpakke</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Kjøpere som finner tomt på Tomtly kan trykke «Sjekk finansiering». Vi sender komplett prosjektpakke til banken – du kontakter kjøperen direkte.
          </p>

          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Bli bankpartner
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Flyten() {
  const steg = [
    {
      nummer: '01',
      tittel: 'Kjøper finner tomt',
      beskrivelse: 'En kjøper finner en tomt på Tomtly med komplett mulighetsstudie, husmodeller og byggekalkyle.',
    },
    {
      nummer: '02',
      tittel: 'Kjøper trykker «Sjekk finansiering»',
      beskrivelse: 'Kjøperen ønsker å vite om de får lån. De trykker «Sjekk finansiering» på tomtesiden.',
    },
    {
      nummer: '03',
      tittel: 'Tomtly sender pakke til banken',
      beskrivelse: 'Banken mottar komplett prosjektpakke: tomt, mulighetsstudie, husmodell, byggekalkyle og kjøpers kontaktinfo.',
    },
    {
      nummer: '04',
      tittel: 'Banken kontakter kjøperen',
      beskrivelse: 'Banken tar direkte kontakt med kjøperen for å behandle byggelånssøknaden.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik fungerer det
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steg.map((s) => (
            <div key={s.nummer}>
              <div className="text-5xl font-display font-bold text-brand-200 mb-4">
                {s.nummer}
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">{s.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{s.beskrivelse}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Prismodell() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-10 text-center">
          Prismodell
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Oppstart</p>
            <p className="text-4xl font-bold text-tomtly-accent mb-2">0 kr</p>
            <p className="text-sm text-brand-500">Ingen oppstartskostnad</p>
          </div>
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Månedsavgift</p>
            <p className="text-4xl font-bold text-tomtly-accent mb-2">0 kr</p>
            <p className="text-sm text-brand-500">Ingen fast kostnad</p>
          </div>
          <div className="bg-white rounded-2xl p-7 border-2 border-tomtly-accent text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Per innvilget byggelån</p>
            <p className="text-4xl font-bold text-tomtly-dark mb-2">4 900 kr</p>
            <p className="text-sm text-brand-500">Betales kun ved innvilget lån</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Regnestykke() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8 text-center">
          Eksempelregning
        </h2>
        <div className="bg-brand-50 rounded-2xl p-8 border border-brand-200">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-brand-200">
              <span className="text-brand-600">Kjøpere per måned</span>
              <span className="font-semibold text-tomtly-dark">10</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-200">
              <span className="text-brand-600">Innvilget (70%)</span>
              <span className="font-semibold text-tomtly-dark">7</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-200">
              <span className="text-brand-600">Tomtly-kostnad (7 x 4 900 kr)</span>
              <span className="font-semibold text-tomtly-dark">34 300 kr/mnd</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-200">
              <span className="text-brand-600">Bankens renteinntekter (7 lån)</span>
              <span className="font-bold text-tomtly-dark text-lg">525 000+ kr</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-4 -mx-4">
              <span className="font-semibold text-green-800">ROI for banken</span>
              <span className="font-bold text-green-800 text-xl">15x</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      sporsmal: 'Hva mottar banken når kjøper trykker «Sjekk finansiering»?',
      svar: 'En komplett prosjektpakke med tomteinformasjon, mulighetsstudie, valgt husmodell, detaljert byggekostnadskalkyle og kjøpers kontaktinformasjon.',
    },
    {
      sporsmal: 'Når betaler banken?',
      svar: 'Kun ved innvilget byggelån. Ingen oppstartskostnad, ingen månedsavgift. 4 900 kr per innvilget lån.',
    },
    {
      sporsmal: 'Kan vi prøve med et begrenset område først?',
      svar: 'Ja, dere kan starte med en region eller et filialkontor og utvide etterhvert.',
    },
    {
      sporsmal: 'Hvordan skiller dette seg fra vanlige leads?',
      svar: 'Disse kjøperne har allerede funnet tomt, sett hva de kan bygge, og fått en detaljert kostnadskalkyle. De er mye lenger i prosessen enn vanlige forespørsler.',
    },
  ]

  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-10 text-center">
          Ofte stilte spørsmål
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.sporsmal} className="bg-white rounded-xl border border-brand-200 group">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                <span className="font-semibold text-tomtly-dark">{faq.sporsmal}</span>
                <ChevronDown className="w-5 h-5 text-brand-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-5 pb-5">
                <p className="text-brand-600 leading-relaxed">{faq.svar}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const [sendt, setSendt] = useState(false)

  return (
    <section id="kontakt" className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Bli bankpartner
          </h2>
          <p className="text-brand-400">
            Ta kontakt for å diskutere partnerskap. 0 kr oppstart, 0 kr/mnd – betal kun per innvilget lån.
          </p>
        </div>

        {sendt ? (
          <div className="bg-forest-50 rounded-xl border border-forest-200 p-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-tomtly-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-tomtly-dark mb-2">Takk for henvendelsen!</h3>
            <p className="text-sm text-brand-600">Vi tar kontakt innen 1 virkedag.</p>
            <p className="text-xs text-brand-400 mt-2">hey@nops.no</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSendt(true) }}
            className="bg-white rounded-xl border border-brand-200 p-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Bank / Finansinstitusjon *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Kontaktperson *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post *</label>
                <input
                  type="email"
                  required
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
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Melding (valgfritt)</label>
              <textarea
                rows={3}
                placeholder="Fortell oss om hva slags samarbeid dere ser for dere..."
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bli bankpartner
            </button>
            <p className="text-xs text-brand-400 text-center">
              Vi tar kontakt innen 1 virkedag. hey@nops.no
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
