'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Search,
  BarChart3,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  TrendingUp,
  FileText,
  MapPin,
} from 'lucide-react'

export default function UtviklerPage() {
  return (
    <>
      <HeroSection />
      <Features />
      <Pricing />
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
            Tomtly for
            <br />
            <span className="text-green-400">eiendomsutviklere</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Finn tomter med utviklingspotensial, få full analyse og spar tid på
            due diligence. Alt du trenger for å vurdere en tomt – samlet på ett sted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/utvikler/onboarding"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Kom i gang
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Kontakt oss
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const features = [
    {
      ikon: Search,
      tittel: 'Finn tomter med potensial',
      beskrivelse: 'Filtrer tomter basert på tomtescore, regulering, beliggenhet og utviklingspotensial.',
    },
    {
      ikon: BarChart3,
      tittel: 'Full analyse per tomt',
      beskrivelse: 'Tomtescore, reguleringsanalyse, mulighetsstudie, byggekostnader og salgsverdi.',
    },
    {
      ikon: Clock,
      tittel: 'Spar tid på due diligence',
      beskrivelse: 'Vi henter matrikkeldata, reguleringsplan og analyserer alt automatisk.',
    },
    {
      ikon: TrendingUp,
      tittel: 'ROI-beregning',
      beskrivelse: 'Se estimert avkastning basert på tomtekostnad, byggekostnad og salgspris.',
    },
    {
      ikon: FileText,
      tittel: 'Dispensasjons- og kravanalyse',
      beskrivelse: 'Forstå hvilke dispensasjoner som trengs og hva reguleringsplanen krever.',
    },
    {
      ikon: Shield,
      tittel: 'Risikoanalyse',
      beskrivelse: 'Identifiser risikofaktorer som grunnforhold, flom, radon og infrastruktur.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Alt du trenger for tomtevurdering
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Tomtly gir deg komplett innsikt for hver tomt – slik at du kan ta raske, informerte beslutninger.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
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

function Pricing() {
  const inkludert = [
    'Tomtescore og reguleringsanalyse',
    'Mulighetsstudie og scenarioer',
    'Byggekostnad og salgsverdi',
    'Dispensasjons- og kravanalyse',
    'Godkjente tiltak i nærområdet',
    'Entreprenørprising',
    'Finansieringsberegner',
    'Tidslinje for byggesøknad',
    'Risikoanalyse',
    'Prosjektsjekkliste',
    'Fastpris tegning og søknad via Tegnebua',
    'Utviklerdashboard',
  ]

  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Priser for utviklere
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Alle planer inkluderer full tomteanalyse og mulighetsstudie per tomt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10">
          <div className="bg-white border-2 border-brand-200 rounded-2xl p-7">
            <p className="text-sm font-medium text-brand-500 mb-1">Utvikler</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-tomtly-dark">10 000</span>
              <span className="text-brand-500 text-sm">kr/mnd</span>
            </div>
            <p className="text-xs font-semibold text-forest-700 mt-2">2 tomter inkludert</p>
            <p className="text-xs text-brand-600">3 husmodeller per tomt</p>
            <p className="text-[10px] text-brand-400 mt-1">5 000 kr per ekstra tomt</p>
            <Link
              href="/utvikler/onboarding"
              className="block w-full text-center mt-6 px-4 py-3 border-2 border-tomtly-accent text-tomtly-accent font-medium rounded-lg hover:bg-forest-50 transition-colors"
            >
              Kom i gang
            </Link>
          </div>

          <div className="bg-white border-2 border-tomtly-accent rounded-2xl p-7 relative">
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
              Anbefalt
            </div>
            <p className="text-sm font-medium text-brand-500 mb-1">Utvikler Pro</p>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-tomtly-dark">20 000</span>
              <span className="text-brand-500 text-sm">kr/mnd</span>
            </div>
            <p className="text-xs font-semibold text-forest-700 mt-2">5 tomter inkludert</p>
            <p className="text-xs text-brand-600">5 husmodeller per tomt</p>
            <p className="text-[10px] text-brand-400 mt-1">5 000 kr per ekstra tomt</p>
            <Link
              href="/utvikler/onboarding"
              className="block w-full text-center mt-6 px-4 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Kom i gang
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-brand-200 max-w-3xl mx-auto">
          <h4 className="text-sm font-semibold text-brand-700 mb-3">Inkludert i alle planer – per tomt</h4>
          <div className="grid grid-cols-2 gap-2">
            {inkludert.map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-xs text-brand-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-brand-400 mt-6">
          Alle priser eks. mva. Ingen bindingstid. Kontakt oss for skreddersydd avtale med volumrabatt.
        </p>
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Org.nr</label>
              <input
                type="text"
                placeholder="123 456 789"
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Antall prosjekter per år</label>
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
