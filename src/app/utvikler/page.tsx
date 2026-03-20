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
      <section className="bg-white pb-0 pt-12 lg:pt-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <div>
                <h3 className="font-semibold text-amber-800 mb-1">Trenger du prosjektfinansiering?</h3>
                <p className="text-sm text-amber-700">
                  Ikke alle prosjekter passer for tradisjonell bankfinansiering. Vi samarbeider med finansieringspartnere som tilbyr prosjektlån med sikkerhet i eiendom – ofte raskere og mer fleksibelt enn banken. Vi sender med komplett underlag fra analysen vår, så prosessen går raskt.
                </p>
                <a href="mailto:hey@nops.no?subject=Prosjektfinansiering" className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-amber-800 hover:underline">
                  Spør om finansiering →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-6">
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Per tomt</p>
            <p className="text-3xl font-bold text-tomtly-dark mb-1">4 900 kr</p>
            <p className="text-sm text-brand-500">Enkeltbestilling</p>
          </div>
          <div className="bg-white rounded-2xl p-7 border-2 border-tomtly-accent text-center relative">
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
              Populær
            </div>
            <p className="text-sm font-medium text-brand-500 mb-2">5-pack</p>
            <p className="text-3xl font-bold text-tomtly-dark mb-1">3 900 kr</p>
            <p className="text-sm text-brand-500">per tomt</p>
          </div>
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Abo S (1-5/mnd)</p>
            <p className="text-3xl font-bold text-tomtly-dark mb-1">14 900 kr</p>
            <p className="text-sm text-brand-500">per måned</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Abo M (6-15/mnd)</p>
            <p className="text-3xl font-bold text-tomtly-dark mb-1">29 900 kr</p>
            <p className="text-sm text-brand-500">per måned</p>
          </div>
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Abo L (16+/mnd)</p>
            <p className="text-3xl font-bold text-tomtly-dark mb-1">Ta kontakt</p>
            <p className="text-sm text-brand-500">Skreddersydd</p>
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
            Typisk utviklermargin er 300 000 – 750 000 kr per tomt. En mulighetsstudie til 4 900 kr er en minimal investering som øker salgshastighet og pris. Ved volum 3 900 kr per tomt.
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
          Jobber du med megler? Meglere kan publisere gratis eller bestille Premium-analyse for 4 900 kr per tomt.
        </p>
        <Link
          href="/for-meglere"
          className="inline-flex items-center gap-2 text-tomtly-accent font-medium hover:underline"
        >
          Les mer om Tomtly for meglere
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
