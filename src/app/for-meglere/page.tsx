'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
} from 'lucide-react'

export default function ForMeglerePage() {
  return (
    <>
      <HeroSection />
      <Regnestykke />
      <HvaMeglerFaar />
      <Priser />
      <Pitch />
      <FAQ />
      <RegistreringsSkjema />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Users className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For eiendomsmeglere
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Gjør tomtene dine
            <br />
            <span className="text-green-400">enklere å selge</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Bestill profesjonell tomtanalyse og synlighet for dine tomteoppdrag. Du håndterer kjøperkontakt og salg – vi leverer analysepakken.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#registrering"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Registrer deg som megler
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

function Regnestykke() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8">
          Regnestykket
        </h2>
        <div className="bg-brand-50 rounded-2xl p-8 border border-brand-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-brand-500 mb-1">Du investerer</p>
              <p className="text-3xl font-bold text-tomtly-dark">2 900 kr</p>
            </div>
            <div>
              <p className="text-sm text-brand-500 mb-1">Din provisjon</p>
              <p className="text-3xl font-bold text-tomtly-accent">50 000+ kr</p>
            </div>
            <div>
              <p className="text-sm text-brand-500 mb-1">ROI</p>
              <p className="text-3xl font-bold text-green-600">17x</p>
            </div>
          </div>
          <p className="text-sm text-brand-500 mt-6">
            Du kan viderefakturere kostnaden til selger som del av megleroppdraget.
          </p>
        </div>
      </div>
    </section>
  )
}

function HvaMeglerFaar() {
  const fordeler = [
    'Komplett mulighetsstudie med husmodeller',
    'Byggekostnadskalkyle',
    'Publisering på Tomtly.no',
    'Bankferdig prosjektbeskrivelse',
    'Profesjonelt materiale for salgsoppgave og visning',
    'Raskere salg – kjøpere ser konkret hva de kan bygge',
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8 text-center">
          Hva du får som megler
        </h2>
        <div className="bg-white rounded-xl border border-brand-200 p-8">
          <ul className="space-y-3">
            {fordeler.map((f) => (
              <li key={f} className="flex items-start gap-3 text-brand-700">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Priser() {
  return (
    <section id="priser" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-10 text-center">
          Priser for meglere
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Per tomt</p>
            <p className="text-3xl font-bold text-tomtly-dark mb-1">2 900 kr</p>
            <p className="text-sm text-brand-500">Enkeltbestilling</p>
          </div>
          <div className="bg-white rounded-2xl p-7 border-2 border-tomtly-accent text-center relative">
            <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
              Populær
            </div>
            <p className="text-sm font-medium text-brand-500 mb-2">3-pack</p>
            <p className="text-3xl font-bold text-tomtly-dark mb-1">2 400 kr</p>
            <p className="text-sm text-brand-500">per tomt</p>
          </div>
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Kontorkonto 10/år</p>
            <p className="text-3xl font-bold text-tomtly-dark mb-1">24 000 kr</p>
            <p className="text-sm text-brand-500">per år</p>
          </div>
          <div className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
            <p className="text-sm font-medium text-brand-500 mb-2">Enterprise</p>
            <p className="text-3xl font-bold text-tomtly-dark mb-1">Ta kontakt</p>
            <p className="text-sm text-brand-500">Skreddersydd løsning</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pitch() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-6 text-center">
          Pitch du kan bruke overfor selger
        </h2>
        <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-8">
          <p className="text-brand-700 leading-relaxed italic">
            &laquo;Vi tilbyr en profesjonell tomtanalyse som viser kjøpere nøyaktig hva som kan bygges på tomten – med husmodeller, byggekalkyle og visualiseringer. Det gjør tomten enklere å selge, og du får et bedre resultat. Analysen koster 2 900 kr og inngår i salgspakken.&raquo;
          </p>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      sporsmal: 'Kan jeg viderefakturere til selger?',
      svar: 'Ja, de fleste meglere legger tomtanalysen inn som del av salgspakken. Selger betaler, og du differensierer deg fra andre meglere.',
    },
    {
      sporsmal: 'Påvirker dette provisjonen min?',
      svar: 'Nei. Tomtly tar ingen del av meglerprovisjon. Du beholder hele provisjonen din som vanlig.',
    },
    {
      sporsmal: 'Kan jeg teste med én tomt først?',
      svar: 'Absolutt. Bestill én tomtanalyse til 2 900 kr og se resultatet før du bestemmer deg for flere.',
    },
    {
      sporsmal: 'Hva får kjøperne å se?',
      svar: 'En komplett mulighetsstudie med husmodeller tilpasset tomten, byggekostnadskalkyle, reguleringsanalyse og profesjonelle visualiseringer.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-10 text-center">
          Ofte stilte spørsmål
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.sporsmal} className="bg-brand-50 rounded-xl border border-brand-200 group">
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

function RegistreringsSkjema() {
  const [sendt, setSendt] = useState(false)
  const [sender, setSender] = useState(false)
  const [formData, setFormData] = useState({
    navn: '',
    epost: '',
    telefon: '',
    meglerforetak: '',
    antallTomter: '',
    hvordanFant: '',
  })

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'megler_registrering',
          navn: formData.navn,
          email: formData.epost,
          telefon: formData.telefon,
          meglerforetak: formData.meglerforetak,
          antallTomter: formData.antallTomter,
          hvordanFant: formData.hvordanFant,
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
      <section id="registrering" className="bg-tomtly-dark py-20 lg:py-28">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Takk for registreringen!
          </h2>
          <p className="text-brand-400">
            Vi tar kontakt innen 1 virkedag for å komme i gang.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="registrering" className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Registrer deg som megler
          </h2>
          <p className="text-brand-400">
            Fyll ut skjemaet, så tar vi kontakt for å komme i gang.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-brand-200 p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Navn *</label>
            <input
              type="text"
              required
              value={formData.navn}
              onChange={(e) => updateField('navn', e.target.value)}
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post *</label>
              <input
                type="email"
                required
                value={formData.epost}
                onChange={(e) => updateField('epost', e.target.value)}
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Telefon *</label>
              <input
                type="tel"
                required
                value={formData.telefon}
                onChange={(e) => updateField('telefon', e.target.value)}
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Meglerforetak *</label>
            <input
              type="text"
              required
              value={formData.meglerforetak}
              onChange={(e) => updateField('meglerforetak', e.target.value)}
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Antall tomter i porteføljen</label>
            <select
              value={formData.antallTomter}
              onChange={(e) => updateField('antallTomter', e.target.value)}
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            >
              <option value="">Velg</option>
              <option value="1-3">1-3</option>
              <option value="4-10">4-10</option>
              <option value="11-30">11-30</option>
              <option value="30+">30+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Hvordan fant du oss?</label>
            <select
              value={formData.hvordanFant}
              onChange={(e) => updateField('hvordanFant', e.target.value)}
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            >
              <option value="">Velg</option>
              <option value="google">Google</option>
              <option value="kollega">Kollega</option>
              <option value="sosiale-medier">Sosiale medier</option>
              <option value="annet">Annet</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={sender}
            className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50"
          >
            {sender ? 'Sender...' : 'Registrer meg'}
          </button>
          <p className="text-xs text-brand-400 text-center">
            Vi tar kontakt innen 1 virkedag. hey@nops.no
          </p>
        </form>
      </div>
    </section>
  )
}
