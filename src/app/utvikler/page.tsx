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
  Zap,
} from 'lucide-react'

export default function UtviklerPage() {
  return (
    <>
      <HeroSection />
      <Fordeler />
      <Abonnement />
      <Prising />
      <ContactForm />
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
            <span className="text-green-400">pa en helt ny mate</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Bruk Tomtly som salgsverktoy. Vi lager profesjonelle mulighetsstudier som viser kjøpere noyaktig hva de kan bygge.
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
      beskrivelse: 'Hver tomt far en komplett mulighetsstudie med husmodeller, 3D-visualiseringer og byggekalkyle. Kjøpere ser potensial umiddelbart.',
    },
    {
      ikon: TrendingUp,
      tittel: 'Raskere salg til hoyere pris',
      beskrivelse: 'Kjøpere ser konkrete byggemuligheter, ikke bare en tom tomt. Det gir raskere beslutninger og hoyere betalingsvilje.',
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

function Abonnement() {
  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-6">
          For utviklere med flere prosjekter
        </h2>
        <p className="text-brand-600 leading-relaxed mb-6">
          Send oss tomter fortlopende – vi analyserer og publiserer. Abonnement for utviklere med flere prosjekter gir dere kontinuerlig tilgang til profesjonelle mulighetsstudier for alle tomtene deres.
        </p>
        <div className="bg-white rounded-xl border border-brand-200 p-6">
          <ul className="space-y-3 text-left">
            {[
              'Fortlopende analyse og publisering av tomter',
              'Dedikert kontaktperson',
              'Prioritert behandling',
              'Volumrabatt på analyser',
              'Utviklerdashboard med portefoljeoversikt',
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-brand-700">
                <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Prising() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Prising
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-white border-2 border-brand-200 rounded-2xl p-7">
            <p className="text-sm font-medium text-brand-500 mb-1">Enkelttomter</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-tomtly-accent">Gratis</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">som megler – legg til tomter gratis</p>
            <ul className="space-y-2 mb-6">
              {[
                'Komplett mulighetsstudie per tomt',
                'Husmodeller med byggekalkyle',
                'Publisering på Tomtly',
                'Profesjonell presentasjon',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/selger/onboarding"
              className="block w-full text-center px-4 py-3 border-2 border-tomtly-accent text-tomtly-accent font-medium rounded-lg hover:bg-forest-50 transition-colors"
            >
              Legg til tomter
            </Link>
          </div>

          <div className="bg-white border-2 border-tomtly-accent rounded-2xl p-7 relative">
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
              For volum
            </div>
            <p className="text-sm font-medium text-brand-500 mb-1">Abonnement</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-tomtly-dark">Kontakt oss</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">skreddersydd for utviklere med flere prosjekter</p>
            <ul className="space-y-2 mb-6">
              {[
                'Alt i gratisversjonen',
                'Fortlopende analyse og publisering',
                'Dedikert kontaktperson',
                'Volumrabatt',
                'Utviklerdashboard',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#kontakt"
              className="block w-full text-center px-4 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Kontakt oss for abonnement
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const [sendt, setSendt] = useState(false)

  return (
    <section id="kontakt" className="bg-white py-20 lg:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-tomtly-dark mb-3">
            Kom i gang
          </h2>
          <p className="text-brand-600">
            Fyll ut skjemaet, sa tar vi kontakt for en uforpliktende prat.
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Antall tomter per ar</label>
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
