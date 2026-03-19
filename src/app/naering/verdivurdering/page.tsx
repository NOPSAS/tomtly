'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calculator, Building2, Warehouse, Briefcase, ArrowRight, CheckCircle2, Send } from 'lucide-react'

interface Scenario {
  navn: string
  byggekostPerM2: number
  leiePerM2: number
  yield: number
}

const SCENARIOER: Scenario[] = [
  { navn: 'Lagerbygg', byggekostPerM2: 12000, leiePerM2: 1000, yield: 0.07 },
  { navn: 'Kombinasjonsbygg', byggekostPerM2: 18000, leiePerM2: 1400, yield: 0.065 },
  { navn: 'Kontorbygg', byggekostPerM2: 25000, leiePerM2: 2000, yield: 0.06 },
]

const SCENARIO_IKONER = [Warehouse, Building2, Briefcase]

function formatKr(n: number): string {
  return n.toLocaleString('nb-NO', { maximumFractionDigits: 0 })
}

export default function NaeringVerdivurderingPage() {
  const [tomtestorrelse, setTomtestorrelse] = useState('')
  const [bya, setBya] = useState('50')
  const [adresse, setAdresse] = useState('')
  const [regulering, setRegulering] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [sending, setSending] = useState(false)
  const [sendt, setSendt] = useState(false)

  const areal = parseFloat(tomtestorrelse) || 0
  const byaProsent = parseFloat(bya) || 50
  const btaM2 = areal * (byaProsent / 100)
  const showResults = areal > 0 && btaM2 > 0

  async function handleLeadCapture(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!epost) return
    setSending(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'naering_verdivurdering',
          navn: epost,
          email: epost,
          telefon,
          melding: `Nærings-verdivurdering: ${adresse || 'Ikke oppgitt'} - ${tomtestorrelse} m² - ${regulering || 'Ikke oppgitt'} - BYA ${bya}%`,
          adresse,
          tomtestorrelse,
          regulering,
          bya_prosent: bya,
        }),
      })
      setSendt(true)
    } catch {
      alert('Noe gikk galt. Prøv igjen.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-tomtly-dark py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
            <Calculator className="w-4 h-4 text-tomtly-gold" />
            <span className="text-xs text-white/80 font-medium">Gratis kalkulator</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Hva er næringstomten verdt?
          </h1>
          <p className="text-brand-400 max-w-xl mx-auto">
            Fyll inn tomtens detaljer og se estimert verdi for tre ulike utviklingsscenarioer.
          </p>
        </div>
      </section>

      {/* Kalkulator */}
      <section className="bg-tomtly-warm py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-10">
            <h2 className="font-semibold text-tomtly-dark mb-6">Tomtens detaljer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Adresse</label>
                <input
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  placeholder="f.eks. Industriveien 5, Vestby"
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Tomtestørrelse (m²) *</label>
                <input
                  value={tomtestorrelse}
                  onChange={(e) => setTomtestorrelse(e.target.value)}
                  type="number"
                  placeholder="f.eks. 5000"
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Reguleringsformål</label>
                <select
                  value={regulering}
                  onChange={(e) => setRegulering(e.target.value)}
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 bg-white"
                >
                  <option value="">Velg formål</option>
                  <option value="Lager">Lager</option>
                  <option value="Kontor">Kontor</option>
                  <option value="Handel">Handel</option>
                  <option value="Kombinasjon">Kombinasjon</option>
                  <option value="Produksjon">Produksjon</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">Estimert BYA % (standard 50)</label>
                <input
                  value={bya}
                  onChange={(e) => setBya(e.target.value)}
                  type="number"
                  min="10"
                  max="100"
                  className="w-full px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30"
                />
              </div>
            </div>
            {showResults && (
              <div className="mt-4 text-sm text-brand-600">
                Beregnet BTA: <span className="font-semibold text-tomtly-dark">{formatKr(btaM2)} m²</span>
              </div>
            )}
          </div>

          {/* Resultater */}
          {showResults && (
            <div className="space-y-8">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark text-center">
                Tre scenarioer for {formatKr(areal)} m² tomt
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SCENARIOER.map((s, i) => {
                  const Ikon = SCENARIO_IKONER[i]
                  const byggekost = btaM2 * s.byggekostPerM2
                  const leieInntekt = btaM2 * s.leiePerM2
                  const markedsverdi = leieInntekt / s.yield
                  const utviklingsverdi = markedsverdi - byggekost - markedsverdi * 0.15

                  return (
                    <div key={s.navn} className="bg-white rounded-xl border border-brand-200 p-6">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center">
                          <Ikon className="w-5 h-5 text-tomtly-accent" />
                        </div>
                        <h3 className="font-semibold text-tomtly-dark">{s.navn}</h3>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-brand-500">Byggekost/m²</span>
                          <span className="font-medium text-tomtly-dark">{formatKr(s.byggekostPerM2)} kr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-500">Total byggekost</span>
                          <span className="font-medium text-tomtly-dark">{formatKr(byggekost)} kr</span>
                        </div>
                        <hr className="border-brand-100" />
                        <div className="flex justify-between">
                          <span className="text-brand-500">Leie/m²/år</span>
                          <span className="font-medium text-tomtly-dark">{formatKr(s.leiePerM2)} kr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-500">Årlig leieinntekt</span>
                          <span className="font-medium text-tomtly-dark">{formatKr(leieInntekt)} kr</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-brand-500">Yield</span>
                          <span className="font-medium text-tomtly-dark">{(s.yield * 100).toFixed(1)} %</span>
                        </div>
                        <hr className="border-brand-100" />
                        <div className="flex justify-between">
                          <span className="text-brand-500">Markedsverdi</span>
                          <span className="font-bold text-tomtly-dark">{formatKr(markedsverdi)} kr</span>
                        </div>
                        <div className={`flex justify-between p-2 rounded-lg ${utviklingsverdi > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                          <span className="text-brand-600 font-medium">Utviklingsverdi</span>
                          <span className={`font-bold ${utviklingsverdi > 0 ? 'text-green-700' : 'text-red-600'}`}>
                            {formatKr(utviklingsverdi)} kr
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Lead capture */}
              <div className="bg-white rounded-xl border border-brand-200 p-8">
                <h3 className="font-semibold text-tomtly-dark mb-2">Få resultatene på e-post</h3>
                <p className="text-sm text-brand-500 mb-5">Oppgi e-posten din, så sender vi deg en oppsummering.</p>

                {sendt ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-green-700">Takk! Vi sender deg resultatene og tar kontakt.</p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadCapture} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={epost}
                      onChange={(e) => setEpost(e.target.value)}
                      placeholder="din@epost.no"
                      required
                      className="flex-1 px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30"
                    />
                    <input
                      type="tel"
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
                      placeholder="Telefon (valgfritt)"
                      className="sm:w-48 px-4 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30"
                    />
                    <button
                      type="submit"
                      disabled={sending}
                      className="px-6 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      <Send className="w-4 h-4" />
                      {sending ? 'Sender...' : 'Send'}
                    </button>
                  </form>
                )}
              </div>

              {/* CTA-er */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/naering#tomteeier-skjema"
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors"
                >
                  Bestill full analyse for 14 900 kr
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/naering#tomteeier-skjema"
                  className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-tomtly-accent text-tomtly-accent font-semibold rounded-xl hover:bg-forest-50 transition-colors"
                >
                  Vi kan selge for deg – 3,5 %
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
