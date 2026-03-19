'use client'

import { useState } from 'react'
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  ChevronDown,
} from 'lucide-react'

export default function KommunePage() {
  return (
    <>
      <HeroSection />
      <Problemet />
      <Losningen />
      <Prismodell />
      <Regnestykke />
      <PilotTilbud />
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
            <Building2 className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For kommuner
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Få solgt
            <br />
            <span className="text-green-400">kommunens tomter</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Kommunale tomter som ligger usolgt i årevis? Vi gjør dem til attraktive byggeprosjekter med profesjonell mulighetsstudie, husmodeller og byggekalkyle.
          </p>

          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Start pilotprosjekt – gratis
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Problemet() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8 text-center">
          Problemet: Tomter som ikke selger seg selv
        </h2>
        <div className="bg-brand-50 rounded-2xl p-8 border border-brand-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-200">
                <th className="text-left py-3 pr-4 text-brand-500 font-medium">Gnr/Bnr</th>
                <th className="text-left py-3 pr-4 text-brand-500 font-medium">Adresse</th>
                <th className="text-left py-3 pr-4 text-brand-500 font-medium">Areal</th>
                <th className="text-left py-3 text-brand-500 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-brand-100">
                <td className="py-3 pr-4 text-brand-700">45/12</td>
                <td className="py-3 pr-4 text-brand-700">Solveien 8</td>
                <td className="py-3 pr-4 text-brand-700">650 m²</td>
                <td className="py-3 text-yellow-600">Usolgt 3 år</td>
              </tr>
              <tr className="border-b border-brand-100">
                <td className="py-3 pr-4 text-brand-700">45/14</td>
                <td className="py-3 pr-4 text-brand-700">Solveien 10</td>
                <td className="py-3 pr-4 text-brand-700">720 m²</td>
                <td className="py-3 text-yellow-600">Usolgt 2 år</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-brand-700">46/3</td>
                <td className="py-3 pr-4 text-brand-700">Fjellveien 2</td>
                <td className="py-3 pr-4 text-brand-700">800 m²</td>
                <td className="py-3 text-yellow-600">Usolgt 5 år</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-brand-600 text-center mt-6">
          Kjøpere ser en tom tomt og vet ikke hva de kan bygge. De går videre.
        </p>
      </div>
    </section>
  )
}

function Losningen() {
  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-6">
          Løsningen: Profesjonelle utviklingscase
        </h2>
        <p className="text-lg text-brand-600 leading-relaxed mb-8">
          Vi gjør hver tomt til et ferdig utviklingsprosjekt med mulighetsstudie, husmodeller, byggekalkyle og visualiseringer. Kjøpere ser nøyaktig hva de kan bygge – og tør å ta beslutningen.
        </p>
        <div className="bg-white rounded-xl border border-brand-200 p-8">
          <ul className="space-y-3 text-left">
            {[
              'Mulighetsstudie med husmodeller tilpasset regulering',
              'Byggekostnadskalkyle per tomt',
              'Profesjonelle visualiseringer',
              'Publisering på Tomtly.no',
              'Markedsføring mot relevante kjøpere',
              'Bankferdig prosjektbeskrivelse',
            ].map((p) => (
              <li key={p} className="flex items-start gap-3 text-brand-700">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Prismodell() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8">
          Prismodell
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-forest-50 rounded-2xl p-8 border-2 border-tomtly-accent">
            <p className="text-sm font-medium text-forest-700 mb-2">Pilotpakke</p>
            <p className="text-4xl font-bold text-tomtly-accent mb-2">Gratis</p>
            <p className="text-sm text-brand-600">Analyse av 3–5 tomter som uforpliktende test. Se resultatene før dere bestemmer dere.</p>
          </div>
          <div className="bg-brand-50 rounded-2xl p-8 border border-brand-200">
            <p className="text-sm font-medium text-brand-500 mb-2">Per tomt</p>
            <p className="text-4xl font-bold text-tomtly-dark mb-2">4 900 kr</p>
            <p className="text-sm text-brand-600">Mulighetsstudie, husmodeller, visualisering og publisering. Betales ved bestilling.</p>
          </div>
          <div className="bg-brand-50 rounded-2xl p-8 border border-brand-200">
            <p className="text-sm font-medium text-brand-500 mb-2">Ved salg</p>
            <p className="text-4xl font-bold text-tomtly-dark mb-2">1%</p>
            <p className="text-sm text-brand-600">Av salgssummen når tomten faktisk selges. Ingen kostnad hvis den ikke selger.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Regnestykke() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8 text-center">
          Eksempel: 30 kommunale tomter
        </h2>
        <div className="bg-white rounded-2xl p-8 border border-brand-200">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-brand-200">
              <span className="text-brand-600">Pilot med 5 tomter</span>
              <span className="font-bold text-tomtly-accent">Gratis</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-200">
              <span className="text-brand-600">Analyse av resterende 25 tomter (25 × 4 900 kr)</span>
              <span className="font-semibold text-tomtly-dark">122 500 kr</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-200">
              <span className="text-brand-600">10 tomter selger første år til snitt 1,2 MNOK</span>
              <span className="font-bold text-tomtly-dark text-lg">12 MNOK</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-200">
              <span className="text-brand-600">Salgsprovisjon (1% av 12 MNOK)</span>
              <span className="text-brand-500">120 000 kr</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-brand-200">
              <span className="text-brand-600">Kommunens totale kostnad til Tomtly</span>
              <span className="text-brand-500">242 500 kr</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-4 -mx-4">
              <span className="font-semibold text-green-800">Kommunens inntekt fra tomtesalg</span>
              <span className="font-bold text-green-800 text-xl">12 MNOK</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-brand-600">Tomtly-kostnad som andel av inntekt</span>
              <span className="font-bold text-tomtly-accent text-lg">ca. 2%</span>
            </div>
          </div>
        </div>

        {/* Verdien av nye innbyggere */}
        <div className="bg-forest-50 rounded-2xl p-8 border border-forest-200 mt-8">
          <h3 className="font-semibold text-tomtly-dark mb-3">I tillegg: Verdien av nye innbyggere</h3>
          <p className="text-sm text-brand-700 leading-relaxed">
            Verdien av én ny innbyggerfamilie er estimert til 200 000–500 000 kr/år i skatte- og avgiftsinntekter.
            10 solgte tomter = 10 nye familier = <strong>2–5 MNOK/år</strong> i nye inntekter for kommunen.
            Ikke bare i år – <strong>hvert eneste år</strong>. Tomtly-kostnaden er en engangsinvestering som betaler seg tilbake mange ganger.
          </p>
        </div>
      </div>
    </section>
  )
}

function PilotTilbud() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-forest-50 rounded-2xl border-2 border-tomtly-accent p-10">
          <TrendingUp className="w-10 h-10 text-tomtly-accent mx-auto mb-6" />
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-4">
            Pilottilbud: Test med 3-5 tomter – helt gratis
          </h2>
          <p className="text-brand-600 leading-relaxed">
            Vi analyserer 3-5 av kommunens tomter kostnadsfritt, slik at dere kan se resultatet før dere bestemmer dere. Ingen binding, ingen risiko.
          </p>
        </div>
      </div>
    </section>
  )
}

function KontaktSkjema() {
  const [sendt, setSendt] = useState(false)
  const [sender, setSender] = useState(false)
  const [formData, setFormData] = useState({
    kommune: '',
    kontaktperson: '',
    stilling: '',
    epost: '',
    telefon: '',
    antallTomter: '',
    lenkeTomteside: '',
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
          type: 'kommune',
          kommune: formData.kommune,
          navn: formData.kontaktperson,
          stilling: formData.stilling,
          email: formData.epost,
          telefon: formData.telefon,
          antallTomter: formData.antallTomter,
          lenkeTomteside: formData.lenkeTomteside,
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
            Vi tar kontakt innen 2 virkedager for å diskutere et pilotprosjekt.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="kontakt" className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Ta kontakt for pilotprosjekt
          </h2>
          <p className="text-brand-400">
            Vi tar en uforpliktende prat om kommunens tomteportefølje.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-brand-200 p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Kommune *</label>
            <input
              type="text"
              required
              value={formData.kommune}
              onChange={(e) => updateField('kommune', e.target.value)}
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Kontaktperson *</label>
            <input
              type="text"
              required
              value={formData.kontaktperson}
              onChange={(e) => updateField('kontaktperson', e.target.value)}
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Stilling</label>
            <input
              type="text"
              value={formData.stilling}
              onChange={(e) => updateField('stilling', e.target.value)}
              placeholder="F.eks. eiendomssjef, arealplanlegger"
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
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Antall ledige tomter</label>
            <select
              value={formData.antallTomter}
              onChange={(e) => updateField('antallTomter', e.target.value)}
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            >
              <option value="">Velg</option>
              <option value="1-5">1-5</option>
              <option value="6-15">6-15</option>
              <option value="16-50">16-50</option>
              <option value="50+">50+</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Lenke til tomteside (valgfritt)</label>
            <input
              type="url"
              value={formData.lenkeTomteside}
              onChange={(e) => updateField('lenkeTomteside', e.target.value)}
              placeholder="https://kommune.no/ledige-tomter"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <button
            type="submit"
            disabled={sender}
            className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50"
          >
            {sender ? 'Sender...' : 'Send henvendelse'}
          </button>
          <p className="text-xs text-brand-400 text-center">
            Vi tar kontakt innen 2 virkedager. hey@nops.no
          </p>
        </form>
      </div>
    </section>
  )
}
