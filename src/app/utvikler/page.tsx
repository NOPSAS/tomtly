'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  Eye,
  TrendingUp,
  Search,
  BarChart3,
} from 'lucide-react'

export default function UtviklerPage() {
  return (
    <>
      <HeroSection />
      <Fordeler />
      <Prising />
      <VerdiArgument />
      <ContactForm />
      <MeglerReferanse />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Building2 className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For eiendomsutviklere
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Selg tomtene
            <br />
            <span className="text-green-400">på en helt ny måte</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Bruk Tomtly som salgsverktøy. Vi lager profesjonelle mulighetsstudier som viser kjøpere nøyaktig hva de kan bygge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/selger/onboarding"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Legg til tomter
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Kontakt oss for abonnement
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
      ikon: Eye,
      tittel: 'Profesjonell presentasjon',
      beskrivelse: 'Hver tomt får en komplett mulighetsstudie med husmodeller, 3D-visualiseringer og byggekalkyle. Kjøpere ser potensial umiddelbart.',
    },
    {
      ikon: TrendingUp,
      tittel: 'Raskere salg til høyere pris',
      beskrivelse: 'Kjøpere ser konkrete byggemuligheter, ikke bare en tom tomt. Det gir raskere beslutninger og høyere betalingsvilje.',
    },
    {
      ikon: BarChart3,
      tittel: 'Kjøpere ser konkrete byggemuligheter',
      beskrivelse: 'Hver tomt presenteres med husmodeller tilpasset regulering og tomtens forutsetninger. Kjøperen kan se sitt fremtidige hjem.',
    },
    {
      ikon: Search,
      tittel: 'Finn nye prosjekter via plattformen',
      beskrivelse: 'I tillegg til å selge egne tomter kan dere finne nye utviklingsprosjekter og tomter med potensial på plattformen.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Fordeler for utviklere
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Tomtly gjør tomtene deres enklere å selge.
          </p>
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
      </div>
    </section>
  )
}

function Prising() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Priser for utviklere
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-6 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Per tomt</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-2xl font-bold text-tomtly-dark">4 900</span>
              <span className="text-brand-500 text-sm">kr</span>
            </div>
            <p className="text-xs text-brand-500">Enkeltbestilling</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">5-pack</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-2xl font-bold text-tomtly-dark">3 900</span>
              <span className="text-brand-500 text-sm">kr/tomt</span>
            </div>
            <p className="text-xs text-brand-500">Spar 1 000 kr per tomt</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-tomtly-accent text-center relative">
            <div className="absolute -top-2.5 right-3 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
              Populær
            </div>
            <p className="text-sm font-medium text-brand-500 mb-2">Abo S</p>
            <p className="text-xs text-brand-400 mb-1">1-5/mnd</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-2xl font-bold text-tomtly-dark">14 900</span>
              <span className="text-brand-500 text-sm">kr/mnd</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Abo M</p>
            <p className="text-xs text-brand-400 mb-1">6-15/mnd</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-2xl font-bold text-tomtly-dark">29 900</span>
              <span className="text-brand-500 text-sm">kr/mnd</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Abo L</p>
            <p className="text-xs text-brand-400 mb-1">16+/mnd</p>
            <div className="flex items-baseline justify-center gap-1 mb-1">
              <span className="text-2xl font-bold text-tomtly-dark">Ta kontakt</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VerdiArgument() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-forest-50 rounded-2xl border-2 border-tomtly-accent p-10">
          <TrendingUp className="w-10 h-10 text-tomtly-accent mx-auto mb-6" />
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-4">
            4 900 kr = 1-2% av utviklermargin
          </h2>
          <p className="text-brand-600 leading-relaxed">
            Med en typisk utviklermargin på 300 000 – 750 000 kr per tomt er 4 900 kr en minimal investering. Ved volum betaler du bare 3 900 kr per tomt.
          </p>
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [sendt, setSendt] = useState(false)

  return (
    <section id="kontakt" className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-tomtly-dark mb-3">
            Kom i gang
          </h2>
          <p className="text-brand-600">
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Firmanavn</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Kontaktperson</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post</label>
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
                  required
                  className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Antall tomter per år</label>
              <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
                <option>1-5</option>
                <option>6-15</option>
                <option>16-50</option>
                <option>50+</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Send henvendelse
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

function MeglerReferanse() {
  return (
    <section className="bg-brand-50 py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-brand-600 mb-4">
          Jobber du med megler? Tomtly tilbyr også tomtanalyse for eiendomsmeglere.
        </p>
        <Link
          href="/for-meglere"
          className="inline-flex items-center gap-2 text-tomtly-accent font-medium hover:underline"
        >
          Se tilbudet for meglere
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
