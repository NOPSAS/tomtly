'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Eye,
  Home,
  MapPin,
  Send,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  Quote,
} from 'lucide-react'

export default function TomtSelgerIkkePage() {
  return (
    <>
      <HeroSection />
      <HvorforSelgerIkke />
      <HvaTomtlyGjor />
      <Suksesshistorie />
      <Pris />
      <KontaktSkjema />
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Clock className="w-3.5 h-3.5 text-tomtly-gold" />
            <span className="text-xs text-white/80 font-medium">
              For tomteeiere som har ventet lenge nok
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Tomten selger ikke?
            <br />
            <span className="text-tomtly-gold">Vi vet hvorfor.</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Når tomten har ligget ute i 6 måneder uten resultat, er det sjelden
            prisen som er problemet. Kjøperne ser en tomt &mdash; men de ser
            ikke et hjem. Vi endrer det.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Send oss FINN-lenken
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#hvorfor"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Forstå hvorfor den ikke selger
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Hvorfor selger ikke tomten?                                        */
/* ------------------------------------------------------------------ */

function HvorforSelgerIkke() {
  const grunner = [
    {
      icon: Eye,
      tittel: 'Kjøperne ser bare gress og busker',
      tekst:
        'En tom tomt vekker ingen følelser. Folk kjøper drømmen om et hjem, ikke et tomt jordstykke.',
    },
    {
      icon: AlertTriangle,
      tittel: 'Usikkerhet skremmer bort kjøpere',
      tekst:
        'Hva kan jeg bygge? Hva koster det? Hva sier reguleringsplanen? Når kjøpere ikke vet, går de videre.',
    },
    {
      icon: Home,
      tittel: 'Ingen husmodeller eller visualisering',
      tekst:
        'Uten konkrete husmodeller og kostnadsoversikt blir tomten abstrakt og vanskelig å forholde seg til.',
    },
  ]

  return (
    <section id="hvorfor" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hvorfor selger ikke tomten?
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Det handler nesten aldri om prisen. Det handler om at kjøperne
            ikke klarer å se for seg hva de faktisk kjøper.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {grunner.map((g) => (
            <div
              key={g.tittel}
              className="text-center p-6 rounded-2xl border border-brand-100 bg-brand-50"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <g.icon className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="font-display text-lg font-semibold text-tomtly-dark mb-2">
                {g.tittel}
              </h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                {g.tekst}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Hva Tomtly gjor annerledes                                         */
/* ------------------------------------------------------------------ */

function HvaTomtlyGjor() {
  const fordeler = [
    {
      icon: MapPin,
      tittel: 'Fullstendig tomteanalyse',
      tekst:
        'Vi analyserer reguleringsplan, grunnforhold, solforhold og infrastruktur. Kjøperen vet nøyaktig hva tomten tillater.',
    },
    {
      icon: Home,
      tittel: 'Husmodeller tilpasset tomten',
      tekst:
        'Vi viser konkrete hus som passer tomten, med plantegninger og fasadetegninger. Plutselig ser kjøperen et hjem.',
    },
    {
      icon: TrendingUp,
      tittel: 'Byggekalkyle og kostnadsoversikt',
      tekst:
        'Tomt + hus + grunnarbeid = totalpris. Kjøperen kan ta beslutningen fordi de vet hva det koster.',
    },
    {
      icon: Lightbulb,
      tittel: 'Profesjonell markedsføring',
      tekst:
        'Vi retter annonsen mot folk som faktisk planlegger husbygging, ikke bare de som blar gjennom FINN.',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik får tomten din en ny sjanse
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Tomtly viser kjøperne nøyaktig hva de kan bygge, hva det koster
            og hvorfor akkurat denne tomten er verdt det.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {fordeler.map((f) => (
            <div
              key={f.tittel}
              className="flex gap-4 p-6 bg-white rounded-2xl border border-brand-100"
            >
              <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <f.icon className="w-5 h-5 text-tomtly-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-tomtly-dark mb-1">
                  {f.tittel}
                </h3>
                <p className="text-sm text-brand-600 leading-relaxed">
                  {f.tekst}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Suksesshistorie                                                    */
/* ------------------------------------------------------------------ */

function Suksesshistorie() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 border border-forest-200 rounded-full mb-6">
              <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent" />
              <span className="text-xs text-forest-700 font-medium">
                Ekte resultat
              </span>
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
              Fra 7 måneder på FINN til solgt
            </h2>
          </div>

          <div className="bg-brand-50 rounded-2xl p-8 lg:p-10 border border-brand-100">
            <Quote className="w-8 h-8 text-tomtly-gold mb-4" />

            <div className="space-y-4 text-brand-700 leading-relaxed mb-8">
              <p>
                Kjetil Halvorsens tomt hadde ligget på FINN i 7 måneder uten en
                eneste seriøs henvendelse. Annonsen hadde bilder av tomten, men
                ingen informasjon om hva man faktisk kunne bygge der.
              </p>
              <p>
                Tomtly analyserte tomten, la inn husmodeller, byggekalkyle og
                reguleringsdetaljer.{' '}
                <span className="font-semibold text-tomtly-dark">
                  2 måneder etter at tomten ble lagt ut på Tomtly, ble den solgt
                </span>{' '}
                til en kjøper som startet et byggeprosjekt basert på Tomtlys
                analyse og informasjon om tomten.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">7 mnd</div>
                <div className="text-xs text-brand-500 mt-1">På FINN uten salg</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-tomtly-accent">2 mnd</div>
                <div className="text-xs text-brand-500 mt-1">Med Tomtly til salg</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-tomtly-gold">Solgt</div>
                <div className="text-xs text-brand-500 mt-1">Byggeprosjekt startet</div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-brand-500 mt-4">
            Kjetil Halvorsen, tomteeier
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Pris                                                               */
/* ------------------------------------------------------------------ */

function Pris() {
  return (
    <section className="bg-tomtly-dark py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Enkel og rettferdig pris
          </h2>
          <p className="text-brand-400 mb-8">
            Du betaler lite for å komme i gang. Vi lykkes bare når du lykkes.
          </p>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <div className="flex items-baseline justify-center gap-2 mb-2">
              <span className="text-5xl font-bold text-white">4 990</span>
              <span className="text-brand-400 text-lg">kr</span>
            </div>
            <p className="text-tomtly-gold font-medium mb-2">
              + 2 % suksesshonorar + mva ved salg
            </p>
            <p className="text-xs text-brand-400 mb-6">Minimum 20 000 kr + mva</p>

            <ul className="space-y-3 text-left max-w-sm mx-auto mb-8">
              {[
                'Fullstendig tomteanalyse',
                'Husmodeller og byggekalkyle',
                'Profesjonell annonsering',
                'Personlig tomtekonsulent',
                'Salgsdashboard og oppfølging',
                '2 % + mva kun ved gjennomført salg',
              ].map((punkt) => (
                <li
                  key={punkt}
                  className="flex items-start gap-2 text-sm text-brand-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  {punkt}
                </li>
              ))}
            </ul>

            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors w-full sm:w-auto"
            >
              Kom i gang
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs text-brand-500 mt-4">
            Oppgjør via Proff Oppgjør AS (fra 9 000 kr + mva) tilkommer ved salg. Tomtly er
            ikke et eiendomsmeglingsforetak.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Kontaktskjema                                                      */
/* ------------------------------------------------------------------ */

function KontaktSkjema() {
  const [navn, setNavn] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [finnUrl, setFinnUrl] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!navn || !epost || !telefon) return
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tomt-selger-ikke',
          navn,
          email: epost,
          telefon,
          finn_url: finnUrl,
        }),
      })
      setSendt(true)
    } catch {
      alert('Noe gikk galt. Prøv igjen eller send e-post til hey@nops.no.')
    } finally {
      setSender(false)
    }
  }

  if (sendt) {
    return (
      <section id="kontakt" className="bg-forest-50 py-20 lg:py-28">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-tomtly-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-display text-3xl font-bold text-tomtly-dark mb-4">
            Takk, {navn}!
          </h2>
          <p className="text-brand-600 leading-relaxed">
            Vi ser på tomten din og tar kontakt innen 1&ndash;2 virkedager med
            en uforpliktende vurdering.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="kontakt" className="bg-forest-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
              Send oss FINN-lenken
            </h2>
            <p className="text-brand-600">
              Vi vurderer tomten din gratis og gir deg en anbefaling innen
              1&ndash;2 virkedager. Ingen forpliktelser.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="navn"
                className="block text-sm font-medium text-brand-700 mb-1"
              >
                Navn
              </label>
              <input
                id="navn"
                type="text"
                required
                value={navn}
                onChange={(e) => setNavn(e.target.value)}
                className="w-full px-4 py-3 border border-brand-200 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                placeholder="Ditt fulle navn"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="epost"
                  className="block text-sm font-medium text-brand-700 mb-1"
                >
                  E-post
                </label>
                <input
                  id="epost"
                  type="email"
                  required
                  value={epost}
                  onChange={(e) => setEpost(e.target.value)}
                  className="w-full px-4 py-3 border border-brand-200 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                  placeholder="din@epost.no"
                />
              </div>
              <div>
                <label
                  htmlFor="telefon"
                  className="block text-sm font-medium text-brand-700 mb-1"
                >
                  Telefon
                </label>
                <input
                  id="telefon"
                  type="tel"
                  required
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  className="w-full px-4 py-3 border border-brand-200 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                  placeholder="900 00 000"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="finn-url"
                className="block text-sm font-medium text-brand-700 mb-1"
              >
                FINN-lenke til tomten
                <span className="text-brand-400 font-normal"> (valgfritt)</span>
              </label>
              <input
                id="finn-url"
                type="url"
                value={finnUrl}
                onChange={(e) => setFinnUrl(e.target.value)}
                className="w-full px-4 py-3 border border-brand-200 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                placeholder="https://www.finn.no/realestate/plots/ad.html?finnkode=..."
              />
            </div>

            <button
              type="submit"
              disabled={sender}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-60"
            >
              {sender ? (
                'Sender...'
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send inn for gratis vurdering
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-brand-500 text-center mt-4">
            Eller send e-post direkte til{' '}
            <a
              href="mailto:hey@nops.no"
              className="underline hover:text-tomtly-accent"
            >
              hey@nops.no
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
