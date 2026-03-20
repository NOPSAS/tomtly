'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  FileText,
  Home,
  Banknote,
  CheckCircle2,
  ArrowRight,
  MapPin,
} from 'lucide-react'

export default function FradelingPage() {
  return (
    <>
      <HeroSection />
      <StegForSteg />
      <Eksempelregning />
      <Priser />
      <HvaViLeverer />
      <KontaktSkjema />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <MapPin className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">Fradeling av tomt</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Sitter du på en tomt verdt millioner
            <br />
            <span className="text-green-400">– uten å vite det?</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Mange norske eneboliger har mer tomt enn de trenger. Vi hjelper deg å
            vurdere fradelingsmuligheter og synliggjøre den nye tomten.
          </p>

          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Sjekk om din eiendom kan fradeles
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function StegForSteg() {
  const steg = [
    {
      nummer: '01',
      ikon: Search,
      tittel: 'Vi vurderer eiendommen din',
      beskrivelse: 'Gratis og uforpliktende. Vi sjekker reguleringsplan, tomtestørrelse og muligheter.',
    },
    {
      nummer: '02',
      ikon: FileText,
      tittel: 'Vi håndterer hele søknadsprosessen',
      beskrivelse: 'Søknad, oppmåling, nabovarsel – vi tar oss av alt det praktiske.',
    },
    {
      nummer: '03',
      ikon: Home,
      tittel: 'Vi lager mulighetsstudie',
      beskrivelse: 'Husmodeller, byggekalkyle og profesjonell presentasjon. Tomten synliggjøres som et ferdig prosjekt.',
    },
    {
      nummer: '04',
      ikon: Banknote,
      tittel: 'Vi selger tomten',
      beskrivelse: 'Tomten publiseres og markedsføres på Tomtly. Vår megler håndterer salget. Oppgjør via Propr.',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik fungerer fradeling med Tomtly
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Fra uutnyttet hage til penger på konto – uten risiko for deg.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steg.map((s) => (
            <div key={s.nummer} className="relative">
              <div className="text-5xl font-display font-bold text-brand-200 mb-4">
                {s.nummer}
              </div>
              <div className="w-10 h-10 bg-tomtly-accent/10 rounded-lg flex items-center justify-center mb-3">
                <s.ikon className="w-5 h-5 text-tomtly-accent" />
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

function Eksempelregning() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4 text-center">
            Eksempel: Hva kan du sitte igjen med?
          </h2>
          <p className="text-brand-600 text-center mb-10">
            En typisk eneboligtomt i Bærum
          </p>

          <div className="space-y-6">
            {/* Felles fakta */}
            <div className="bg-brand-50 rounded-2xl p-6 border border-brand-200">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-brand-200">
                  <span className="text-brand-600">Din eiendom</span>
                  <span className="font-semibold text-tomtly-dark">1 200 m² eneboligtomt i Bærum</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-200">
                  <span className="text-brand-600">Fradeles i</span>
                  <span className="font-semibold text-tomtly-dark">2 tomter på 600 m² hver</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-brand-600">Estimert verdi ny tomt</span>
                  <span className="font-bold text-tomtly-dark text-lg">2 500 000 kr</span>
                </div>
              </div>
            </div>

            {/* Side-by-side sammenligning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 border border-brand-200">
                <h3 className="font-semibold text-tomtly-dark mb-3">Modell A: Kun fradeling</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-brand-600">Fradelingsprosess</span><span className="font-semibold text-tomtly-accent">0 kr</span></div>
                  <div className="flex justify-between"><span className="text-brand-600">Tomtly (3% av 2,5 MNOK)</span><span>75 000 kr</span></div>
                  <div className="flex justify-between pt-2 border-t border-brand-200"><span className="font-semibold">Du sitter igjen med</span><span className="font-bold text-green-700">2 425 000 kr</span></div>
                  <p className="text-xs text-brand-400 pt-1">Du selger tomten selv eller via egen megler.</p>
                </div>
              </div>
              <div className="bg-forest-50 rounded-xl p-5 border border-forest-200">
                <h3 className="font-semibold text-tomtly-dark mb-3">Modell B: Fradeling + vi selger</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-forest-700">Fradelingsprosess</span><span className="font-semibold text-tomtly-accent">0 kr</span></div>
                  <div className="flex justify-between"><span className="text-forest-700">Tomtly (5% av 2,5 MNOK)</span><span>125 000 kr</span></div>
                  <div className="flex justify-between pt-2 border-t border-forest-300"><span className="font-semibold">Du sitter igjen med</span><span className="font-bold text-green-700">2 375 000 kr</span></div>
                  <p className="text-xs text-forest-600 pt-1">Vi gjør alt – fradeling, analyse, markedsføring og salg.</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-5 border border-green-200 text-center">
              <p className="text-sm text-green-800">
                <strong>I begge modeller:</strong> Du betaler ingenting upfront. Din kostnad: 0 kr. Vi tar risikoen.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Priser() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-10 text-center">
          Prismodell
        </h2>
        {/* Vurdering */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-2xl p-6 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-1">Steg 1: Vurdering</p>
            <p className="text-3xl font-bold text-tomtly-accent mb-1">Gratis</p>
            <p className="text-sm text-brand-500">Vi sjekker om din eiendom egner seg for fradeling. Uforpliktende.</p>
          </div>
        </div>

        {/* To modeller */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Modell 1: Kun fradeling */}
          <div className="bg-white rounded-2xl p-7 border border-brand-200">
            <p className="text-sm font-medium text-brand-500 mb-2">Modell A: Kun fradeling</p>
            <p className="text-4xl font-bold text-tomtly-dark mb-1">0 kr</p>
            <p className="text-sm text-tomtly-accent font-semibold mb-4">+ 3% av ny tomts verdi</p>
            <ul className="space-y-2 mb-4">
              {[
                'Tegning og søknad kostnadsfritt',
                'Koordinering av oppmåling',
                'Nabovarsel og oppfølging',
                'Du selger den nye tomten selv',
                'Du betaler 3% av ny tomts verdi ved godkjent fradeling',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <p className="text-xs text-brand-400">Betaling ved godkjent fradeling – ikke før.</p>
          </div>

          {/* Modell 2: Fradeling + salg */}
          <div className="bg-white rounded-2xl p-7 border-2 border-tomtly-accent relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">
              Mest populær
            </div>
            <p className="text-sm font-medium text-brand-500 mb-2">Modell B: Fradeling + vi selger</p>
            <p className="text-4xl font-bold text-tomtly-dark mb-1">0 kr</p>
            <p className="text-sm text-tomtly-accent font-semibold mb-4">+ 5% av salgssummen</p>
            <ul className="space-y-2 mb-4">
              {[
                'Alt i Modell A – kostnadsfritt',
                'Mulighetsstudie med husmodeller og kalkyle',
                'Publisering og markedsføring via Tomtly',
                'Salg via vår fagansvarlige megler',
                'Oppgjør via Propr',
                'Du betaler 5% av salgssummen – kun ved gjennomført salg',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
              <p className="text-xs text-amber-800">
                <strong>Viktig:</strong> Dersom du avbryter salget etter at delingssøknad er sendt inn, betaler du uansett 3% av estimert tomteverdi (tilsvarer Modell A).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HvaViLeverer() {
  const leveranser = [
    'Vurdering av fradelingsmuligheter',
    'Reguleringsanalyse og kartlegging',
    'Søknad om fradeling til kommunen',
    'Koordinering av oppmåling',
    'Nabovarsel og oppfølging',
    'Mulighetsstudie med husmodeller',
    'Byggekalkyle og verdivurdering',
    'Publisering og synliggjøring av tomten',
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8 text-center">
            Hva Tomtly leverer
          </h2>
          <ul className="space-y-3">
            {leveranser.map((l) => (
              <li key={l} className="flex items-start gap-3 text-brand-700">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function KontaktSkjema() {
  const [adresse, setAdresse] = useState('')
  const [navn, setNavn] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'fradeling',
          navn,
          email: epost,
          telefon,
          melding: `Fradeling – eiendom: ${adresse}`,
          adresse,
        }),
      })
      setSendt(true)
    } catch {
      alert('Noe gikk galt. Prøv igjen.')
    }
    setSender(false)
  }

  if (sendt) {
    return (
      <section id="kontakt" className="bg-tomtly-dark py-20 lg:py-28">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Takk for henvendelsen!
          </h2>
          <p className="text-brand-400">
            Vi tar en titt på eiendommen din og kommer tilbake innen 2 virkedager.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="kontakt" className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Sjekk om din eiendom kan fradeles
          </h2>
          <p className="text-brand-400">Gratis vurdering – helt uforpliktende.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-300 mb-1">Adresse</label>
            <input
              type="text"
              required
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Storgata 1, 1300 Sandvika"
              className="w-full px-4 py-3 bg-white/10 border border-brand-600 rounded-lg text-white placeholder-brand-500 focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-300 mb-1">Navn</label>
            <input
              type="text"
              required
              value={navn}
              onChange={(e) => setNavn(e.target.value)}
              placeholder="Ola Nordmann"
              className="w-full px-4 py-3 bg-white/10 border border-brand-600 rounded-lg text-white placeholder-brand-500 focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-300 mb-1">E-post</label>
            <input
              type="email"
              required
              value={epost}
              onChange={(e) => setEpost(e.target.value)}
              placeholder="ola@epost.no"
              className="w-full px-4 py-3 bg-white/10 border border-brand-600 rounded-lg text-white placeholder-brand-500 focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-300 mb-1">Telefon</label>
            <input
              type="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              placeholder="12345678"
              className="w-full px-4 py-3 bg-white/10 border border-brand-600 rounded-lg text-white placeholder-brand-500 focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={sender}
            className="w-full py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
          >
            {sender ? 'Sender...' : 'Send forespørsel'}
            {!sender && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </section>
  )
}
