'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Hammer,
  CheckCircle2,
  ArrowRight,
  FileText,
  Users,
  Shield,
  Zap,
  ChevronDown,
} from 'lucide-react'

export default function ForEntreprenorerPage() {
  return (
    <>
      <HeroSection />
      <Fordeler />
      <HvordanDetFungerer />
      <Prising />
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
            <Hammer className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For entreprenører
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Kvalifiserte byggeprosjekter
            <br />
            <span className="text-green-400">levert til døren</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Slutt å jakte oppdrag. Tomtly kobler dere med tomtekjøpere som allerede har kjøpt tomt, valgt husmodell og fått regulering avklart.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bli samarbeidsentreprenør
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#priser"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Se priser
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fordeler() {
  const fordeler = [
    {
      ikon: Shield,
      tittel: 'Forutsigbar kostnad',
      beskrivelse: 'Én fast årspris – ingen overraskelser. Du vet nøyaktig hva du betaler.',
    },
    {
      ikon: FileText,
      tittel: 'Kvalifiserte prosjekter',
      beskrivelse: 'Kjøperen har tomt, husmodell, regulering og finansiering på plass. Dette er reelle byggeprosjekter.',
    },
    {
      ikon: Users,
      tittel: 'Maks 2-3 konkurrenter',
      beskrivelse: 'Vi sender prosjektet til maks 2-3 entreprenører. Ingen masseutsendelser der dere drukner i konkurranse.',
    },
    {
      ikon: Zap,
      tittel: 'Komplett underlag',
      beskrivelse: 'Dere får tomteinfo, regulering, husmodell med tegninger, og detaljert byggekalkyle. Alt dere trenger for å gi presist tilbud.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hva dere får
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {fordeler.map((f) => (
            <div key={f.tittel} className="bg-brand-50 rounded-xl p-6 border border-brand-200">
              <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center mb-4">
                <f.ikon className="w-5 h-5 text-tomtly-accent" />
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">{f.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{f.beskrivelse}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-brand-500 mt-8">
          Tomtly er aldri kontraktspart. Avtalen inngås direkte mellom kjøper og entreprenør.
        </p>
      </div>
    </section>
  )
}

function HvordanDetFungerer() {
  const steg = [
    {
      nummer: '01',
      tittel: 'Kjøper trykker «Innhent tilbud»',
      beskrivelse: 'Når en kjøper har valgt husmodell og tomt, kan de innhente tilbud fra kvalifiserte entreprenører.',
    },
    {
      nummer: '02',
      tittel: 'Vi sender prosjektbeskrivelse',
      beskrivelse: 'Dere mottar en komplett prosjektbeskrivelse med tomteinfo, husmodell, regulering og byggekalkyle.',
    },
    {
      nummer: '03',
      tittel: 'Dere gir tilbud',
      beskrivelse: 'Maks 2-3 entreprenører får hvert prosjekt. Ingen masseutsendelser – kun kvalifiserte forespørsler.',
    },
    {
      nummer: '04',
      tittel: 'Kjøper velger',
      beskrivelse: 'Kjøperen sammenligner tilbud og velger entreprenør. Dere får oppdraget basert på kvalitet, ikke bare pris.',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
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

function Prising() {
  return (
    <section id="priser" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Årsabonnement
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Forutsigbar kostnad – ingen overraskelser. Første lead er gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Lokal</p>
            <p className="text-xs text-brand-400 mb-3">1-3 kommuner</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-3xl font-bold text-tomtly-dark">14 900</span>
              <span className="text-brand-500">kr/år</span>
            </div>
            <p className="text-sm text-brand-500">Kvalifiserte prosjekter i ditt nærområde</p>
          </div>

          <div className="bg-white rounded-2xl p-7 border-2 border-tomtly-accent text-center relative">
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
              Populær
            </div>
            <p className="text-sm font-medium text-brand-500 mb-2">Regional</p>
            <p className="text-xs text-brand-400 mb-3">Fylke</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-3xl font-bold text-tomtly-dark">29 900</span>
              <span className="text-brand-500">kr/år</span>
            </div>
            <p className="text-sm text-brand-500">Prosjekter i hele fylket</p>
          </div>

          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Nasjonal</p>
            <p className="text-xs text-brand-400 mb-3">Hele Norge</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-3xl font-bold text-tomtly-dark">49 900</span>
              <span className="text-brand-500">kr/år</span>
            </div>
            <p className="text-sm text-brand-500">Alle prosjekter nasjonalt</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-tomtly-accent font-medium">Første lead er gratis – prøv uten risiko</p>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      sporsmal: 'Hva koster det å motta forespørsler?',
      svar: 'Ingenting utover årsabonnementet. Du betaler fast pris per år og mottar kvalifiserte prosjekter innenfor ditt dekningsområde.',
    },
    {
      sporsmal: 'Hvor mange konkurrenter har vi per prosjekt?',
      svar: 'Maks 2-3. Vi sender aldri prosjekter til flere enn dette, slik at dere har en reell sjanse til å vinne oppdraget.',
    },
    {
      sporsmal: 'Tar Tomtly noe av kontraktssummen?',
      svar: 'Nei. Tomtly er aldri kontraktspart. Avtalen inngås direkte mellom kjøper og entreprenør. Vi tar kun årsabonnementet.',
    },
    {
      sporsmal: 'Kan vi prøve før vi binder oss?',
      svar: 'Ja, første lead er gratis. Dere ser kvaliteten på underlaget og prosjektene før dere bestemmer dere.',
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
            Bli samarbeidsentreprenør
          </h2>
          <p className="text-brand-400">
            Fyll ut skjemaet, så tar vi kontakt for en uforpliktende prat.
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Firmanavn *</label>
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Dekningsområde</label>
              <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
                <option>Hele Norge</option>
                <option>Østlandet</option>
                <option>Vestlandet</option>
                <option>Midt-Norge</option>
                <option>Nord-Norge</option>
                <option>Sørlandet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Melding (valgfritt)</label>
              <textarea
                rows={3}
                placeholder="Fortell litt om selskapet og hva slags prosjekter dere tar..."
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bli samarbeidsentreprenør
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
