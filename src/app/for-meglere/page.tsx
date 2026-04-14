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
      <Pakker />
      <ROI />
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
            Bruk Tomtly som
            <br />
            <span className="text-green-400">tilleggskanal for tomtene dine</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Publiser tomter gratis eller bestill full analyse med profesjonelle visualiseringer og husmodeller. Du beholder hele provisjonen din.
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
              href="#pakker"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Se pakker
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pakker() {
  return (
    <section id="pakker" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-10 text-center">
          Pakker for meglere
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Enkeltanalyse */}
          <div className="bg-white rounded-2xl p-8 border-2 border-tomtly-accent relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">
              Per tomt
            </div>
            <div className="text-sm font-medium text-brand-500 mb-2">Tomtly-analyse</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">7 500</span>
              <span className="text-brand-500">kr per tomt + mva</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Komplett analyse du kan bruke i salgsoppgaven</p>
            <ul className="space-y-2 mb-6">
              {[
                'Komplett mulighetsstudie med husmodeller',
                'Byggekostnadskalkyle og visualiseringer',
                'Plassering av hus på kart',
                'Bankferdig prosjektbeskrivelse',
                'Profesjonelt materiale for salgsoppgave',
                'Viderefakturerbar til selger',
                'Tomtly tar ingenting av provisjonen din',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#registrering"
              className="block w-full text-center px-4 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bestill analyse
            </a>
          </div>

          {/* White-label abo */}
          <div className="bg-white rounded-2xl p-8 border-2 border-tomtly-gold relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-tomtly-gold text-tomtly-dark text-xs font-semibold rounded-full">
              For meglerkontor
            </div>
            <div className="text-sm font-medium text-brand-500 mb-2">Tomtly White Label</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">25 000</span>
              <span className="text-brand-500">kr/mnd + mva</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Ubegrenset analyser, 12 mnd binding</p>
            <ul className="space-y-2 mb-6">
              {[
                'Ubegrenset Tomtly-analyser per måned',
                'Alle meglere på kontoret kan bestille',
                'Eget dashboard for kontoret',
                '"Powered by Tomtly" — din merkevare i front',
                'Prioritert support og leveringstid',
                'Inkl. alt i enkeltanalyse-pakken',
                'Du differensierer deg fra andre meglerhus',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-gold flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="mailto:hey@nops.no?subject=Tomtly White Label for meglerkontor"
              className="block w-full text-center px-4 py-3 bg-tomtly-dark text-white font-medium rounded-lg hover:bg-brand-800 transition-colors"
            >
              Ta kontakt
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function ROI() {
  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8">
          Regnestykket
        </h2>
        <div className="bg-white rounded-2xl p-8 border border-brand-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-sm text-brand-500 mb-1">Du investerer</p>
              <p className="text-3xl font-bold text-tomtly-dark">7 500 kr</p>
            </div>
            <div>
              <p className="text-sm text-brand-500 mb-1">Din provisjon</p>
              <p className="text-3xl font-bold text-tomtly-accent">50 000+ kr</p>
            </div>
            <div>
              <p className="text-sm text-brand-500 mb-1">ROI</p>
              <p className="text-3xl font-bold text-green-600">7x</p>
            </div>
          </div>
          <p className="text-sm text-brand-500 mt-6">
            Du kan viderefakturere kostnaden til selger som del av megleroppdraget. Tomtly tar ingen provisjon.
          </p>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const faqs = [
    {
      sporsmal: 'Kan jeg viderefakturere Premium-pakken til selger?',
      svar: 'Ja. De fleste meglere legger tomtanalysen inn som del av salgspakken. Selger betaler 7 500 kr + mva, du differensierer deg fra andre meglere – og kjøpere ser konkret hva de kan bygge.',
    },
    {
      sporsmal: 'Tar Tomtly noe av provisjonen min?',
      svar: 'Nei. Tomtly tar ingen del av meglerprovisjon. Du beholder hele provisjonen din, både med Standard og Premium.',
    },
    {
      sporsmal: 'Hva er forskjellen på Standard og Premium?',
      svar: 'Standard er gratis publisering – du legger ut tomten og kjøpere finner den. Premium gir i tillegg full mulighetsstudie med husmodeller, visualiseringer, byggekalkyle, fremhevet plassering og SoMe-promotering.',
    },
    {
      sporsmal: 'Kan jeg teste med én tomt først?',
      svar: 'Absolutt. Bestill én analyse for 7 500 kr + mva og se resultatet. Eller ta kontakt om White Label-abonnement for hele kontoret (25 000 kr/mnd + mva, 12 mnd binding, ubegrenset analyser).',
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
