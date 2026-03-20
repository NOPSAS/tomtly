'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Warehouse,
  Landmark,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Send,
} from 'lucide-react'

export default function NaeringPage() {
  return (
    <>
      <Hero />
      <HvemErDetteFor />
      <HvaViLeverer />
      <Priser />
      <Regnestykke />
      <ForBedrifter />
      <CTATomteeiere />
    </>
  )
}

// ---- Hero ----

function Hero() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-tomtly-gold" />
            <span className="text-xs text-white/80 font-medium">Næringstomter</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Næringstomt?
            <br />
            <span className="text-green-400">Vi finner kjøperen.</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Vi gjør næringstomter om til investeringscaser. Kjøpere ser avkastning – ikke et tomt jorde.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#tomteeier-skjema"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Meld inn din næringstomt
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/naering/verdivurdering"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              Sjekk verdien gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Hvem er dette for ----

function HvemErDetteFor() {
  const cards = [
    {
      ikon: Warehouse,
      tittel: 'Du eier en næringstomt som ikke selger',
      beskrivelse:
        'Regulert til næring, ingen har bitt på. Vi viser kjøpere hva tomten er verdt som investeringsprosjekt.',
    },
    {
      ikon: Landmark,
      tittel: 'Du har jord som er omregulert til næring',
      beskrivelse:
        'Åkeren din er verdt millioner. Men hvem kjøper den? Vi finner dem.',
    },
    {
      ikon: Building2,
      tittel: 'Kommunen har næringsareal som ligger brakk',
      beskrivelse:
        'Regulert, opparbeidet, klart – men ingen bygger. Vi presenterer det som investeringsmuligheter.',
    },
    {
      ikon: Briefcase,
      tittel: 'Du er bedrift og trenger lokaler',
      beskrivelse:
        'Har du vurdert å bygge nytt? Vi har næringstomter der du kan bygge nøyaktig det du trenger.',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hvem er dette for?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c) => (
            <div
              key={c.tittel}
              className="bg-white rounded-xl p-8 border border-brand-200 hover:border-tomtly-accent/30 transition-colors"
            >
              <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center mb-5">
                <c.ikon className="w-6 h-6 text-tomtly-accent" />
              </div>
              <h3 className="text-lg font-semibold text-tomtly-dark mb-2">{c.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{c.beskrivelse}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Hva vi leverer ----

function HvaViLeverer() {
  const punkter = [
    'Reguleringsanalyse (formål, BYA, høyder, parkering)',
    'Utnyttelsesberegning – maks BTA',
    '2–3 konseptforslag (lager, kombinasjonsbygg, kontor, handel)',
    'Estimert byggekostnad per scenario',
    'Yield-beregning med leieinntekt og markedsverdi',
    'Utviklingsverdi (baklengsregning)',
    '3D-volumstudie',
    'Bankferdig investeringscase',
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8 text-center">
            Hva vi leverer
          </h2>
          <ul className="space-y-4">
            {punkter.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                <span className="text-brand-700">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ---- Priser ----

function Priser() {
  const pakker = [
    {
      navn: 'Analyse',
      beskrivelse: 'Komplett næringsanalyse',
      pris: '14 900',
      enhet: 'kr',
    },
    {
      navn: 'Analyse + Synlighet',
      beskrivelse: 'Analyse + publisering',
      pris: '24 900',
      enhet: 'kr',
      anbefalt: true,
    },
    {
      navn: 'Premium Synlighet',
      beskrivelse: 'Maksimal eksponering',
      pris: '39 900',
      enhet: 'kr',
    },
  ]

  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-12 text-center">
          Priser
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {pakker.map((p) => (
            <div
              key={p.navn}
              className={`bg-white rounded-xl p-6 border-2 ${
                p.anbefalt ? 'border-tomtly-accent relative' : 'border-brand-200'
              }`}
            >
              {p.anbefalt && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full whitespace-nowrap">
                  Mest populær
                </div>
              )}
              <h3 className="font-semibold text-tomtly-dark mb-1">{p.navn}</h3>
              <p className="text-xs text-brand-500 mb-4">{p.beskrivelse}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-tomtly-dark">{p.pris}</span>
                <span className="text-sm text-brand-500">{p.enhet}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 max-w-4xl mx-auto bg-forest-50 rounded-xl border border-forest-200 p-5 text-center">
          <p className="text-sm text-forest-800">
            <strong>Ved salg via Tomtly (med megler):</strong> 2,5 % av salgssum i tillegg til analysepakken.
          </p>
        </div>
      </div>
    </section>
  )
}

// ---- Regnestykke (Vestby-eksempel) ----

function Regnestykke() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4 text-center">
          Regnestykket: Vestby lagertomt
        </h2>
        <p className="text-brand-600 text-center mb-12 max-w-2xl mx-auto">
          Et reelt eksempel på hvordan vi gjør en næringstomt om til en investeringscase.
        </p>

        <div className="bg-brand-50 rounded-2xl border border-brand-200 p-8 space-y-6">
          {/* Tomt-info */}
          <div>
            <h3 className="font-semibold text-tomtly-dark mb-3">Tomten</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-brand-500">Beliggenhet</p>
                <p className="font-medium text-tomtly-dark">Vestby, Akershus</p>
              </div>
              <div>
                <p className="text-brand-500">Tomtestørrelse</p>
                <p className="font-medium text-tomtly-dark">5 000 m²</p>
              </div>
              <div>
                <p className="text-brand-500">Regulering</p>
                <p className="font-medium text-tomtly-dark">Lager/industri</p>
              </div>
              <div>
                <p className="text-brand-500">Tillatt BYA</p>
                <p className="font-medium text-tomtly-dark">50 % = 2 500 m²</p>
              </div>
            </div>
          </div>

          <hr className="border-brand-200" />

          {/* Byggekostnad */}
          <div>
            <h3 className="font-semibold text-tomtly-dark mb-3">Byggekostnad</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border border-brand-200">
                <p className="text-brand-500">BTA lagerbygg</p>
                <p className="font-medium text-tomtly-dark">2 500 m²</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-brand-200">
                <p className="text-brand-500">Byggekostnad</p>
                <p className="font-medium text-tomtly-dark">12 000 kr/m²</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-brand-200">
                <p className="text-brand-500">Total byggekostnad</p>
                <p className="font-bold text-tomtly-dark">30 000 000 kr</p>
              </div>
            </div>
          </div>

          <hr className="border-brand-200" />

          {/* Leieinntekt */}
          <div>
            <h3 className="font-semibold text-tomtly-dark mb-3">Leieinntekt</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border border-brand-200">
                <p className="text-brand-500">Leie per m²/år</p>
                <p className="font-medium text-tomtly-dark">1 000 kr</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-brand-200">
                <p className="text-brand-500">Årlig leieinntekt</p>
                <p className="font-medium text-tomtly-dark">2 500 000 kr</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-brand-200">
                <p className="text-brand-500">Yield</p>
                <p className="font-medium text-tomtly-dark">7,0 %</p>
              </div>
            </div>
          </div>

          <hr className="border-brand-200" />

          {/* Verdiberegning */}
          <div>
            <h3 className="font-semibold text-tomtly-dark mb-3">Verdiberegning</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-lg p-4 border border-brand-200">
                <p className="text-brand-500">Markedsverdi (leie / yield)</p>
                <p className="font-bold text-tomtly-dark">35 714 000 kr</p>
                <p className="text-xs text-brand-400 mt-1">2 500 000 / 0,07</p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-brand-200">
                <p className="text-brand-500">Utviklingsverdi (markedsverdi - byggekost - 15 % margin)</p>
                <p className="font-bold text-green-700 text-lg">357 000 kr</p>
                <p className="text-xs text-brand-400 mt-1">35 714 000 − 30 000 000 − 5 357 100</p>
              </div>
            </div>
          </div>

          <div className="bg-tomtly-accent/5 border border-tomtly-accent/20 rounded-lg p-4 text-sm text-brand-700">
            <strong>Konklusjon:</strong> Selv med konservative tall gir denne tomten positiv utviklingsverdi.
            Med optimalisert konsept (kombinasjonsbygg, høyere leie) kan verdien øke betydelig.
            Vi lager den fulle investeringscasen for deg.
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- For bedrifter (skjema) ----

function ForBedrifter() {
  const [sending, setSending] = useState(false)
  const [sendt, setSendt] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'bedrift_soker_lokaler',
          navn: data.get('kontaktperson'),
          email: data.get('epost'),
          telefon: data.get('telefon'),
          melding: `Bedrift: ${data.get('bedriftsnavn')} - Søker ${data.get('type_lokaler')} ${data.get('storrelse')} i ${data.get('omrade')}`,
          bedriftsnavn: data.get('bedriftsnavn'),
          type_lokaler: data.get('type_lokaler'),
          storrelse: data.get('storrelse'),
          omrade: data.get('omrade'),
          budsjett: data.get('budsjett'),
          tidslinje: data.get('tidslinje'),
        }),
      })
      setSendt(true)
      form.reset()
    } catch {
      alert('Noe gikk galt. Prøv igjen.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4 text-center">
          For bedrifter som søker lokaler
        </h2>
        <p className="text-brand-600 text-center mb-12">
          Fortell oss hva du trenger, så matcher vi deg med riktig næringstomt.
        </p>

        {sendt ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-green-800 mb-2">Takk for henvendelsen!</h3>
            <p className="text-sm text-green-700">Vi tar kontakt innen kort tid.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-brand-200 p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Bedriftsnavn *</label>
                <input name="bedriftsnavn" required className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Kontaktperson *</label>
                <input name="kontaktperson" required className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">E-post *</label>
                <input name="epost" type="email" required className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Telefon</label>
                <input name="telefon" type="tel" className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Type lokaler *</label>
                <select name="type_lokaler" required className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 bg-white">
                  <option value="">Velg type</option>
                  <option value="Kontor">Kontor</option>
                  <option value="Lager">Lager</option>
                  <option value="Produksjon">Produksjon</option>
                  <option value="Handel">Handel</option>
                  <option value="Kombinasjon">Kombinasjon</option>
                  <option value="Annet">Annet</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Ønsket størrelse</label>
                <input name="storrelse" placeholder="f.eks. 500 m²" className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Ønsket område</label>
                <input name="omrade" placeholder="f.eks. Oslo-regionen" className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Budsjett</label>
                <input name="budsjett" placeholder="f.eks. 10–20 MNOK" className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Tidslinje</label>
              <select name="tidslinje" className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 bg-white">
                <option value="">Velg tidslinje</option>
                <option value="ASAP">ASAP</option>
                <option value="6 mnd">Innen 6 måneder</option>
                <option value="1 år">Innen 1 år</option>
                <option value="Bare undersøker">Bare undersøker</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {sending ? 'Sender...' : 'Send henvendelse'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// ---- CTA for tomteeiere ----

function CTATomteeiere() {
  const [sending, setSending] = useState(false)
  const [sendt, setSendt] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'naeringstomt',
          navn: data.get('navn'),
          email: data.get('epost'),
          telefon: data.get('telefon'),
          melding: `Næringstomt: ${data.get('adresse')} - ${data.get('tomtestorrelse')} m² - ${data.get('reguleringsformaal')}`,
          adresse: data.get('adresse'),
          tomtestorrelse: data.get('tomtestorrelse'),
          reguleringsformaal: data.get('reguleringsformaal'),
          forsokt_solgt: data.get('forsokt_solgt'),
          prisforventning: data.get('prisforventning'),
        }),
      })
      setSendt(true)
      form.reset()
    } catch {
      alert('Noe gikk galt. Prøv igjen.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="tomteeier-skjema" className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4 text-center">
          Eier du en næringstomt?
        </h2>
        <p className="text-brand-400 text-center mb-12">
          Fyll inn skjemaet, så kontakter vi deg med en vurdering.
        </p>

        {sendt ? (
          <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Takk! Vi har mottatt henvendelsen.</h3>
            <p className="text-sm text-brand-400">Vi kontakter deg innen 1–2 virkedager.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">Adresse *</label>
                <input name="adresse" required className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">Tomtestørrelse (m²) *</label>
                <input name="tomtestorrelse" type="number" required className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">Reguleringsformål</label>
                <input name="reguleringsformaal" placeholder="f.eks. Lager, Kontor, Industri" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">Har tomten vært forsøkt solgt?</label>
                <select name="forsokt_solgt" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50">
                  <option value="" className="text-tomtly-dark">Velg</option>
                  <option value="Ja" className="text-tomtly-dark">Ja</option>
                  <option value="Nei" className="text-tomtly-dark">Nei</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">Prisforventning</label>
                <input name="prisforventning" placeholder="f.eks. 5 MNOK" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">Navn *</label>
                <input name="navn" required className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">E-post *</label>
                <input name="epost" type="email" required className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50" />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">Telefon</label>
                <input name="telefon" type="tel" className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50" />
              </div>
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {sending ? 'Sender...' : 'Send inn – vi vurderer gratis'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
