'use client'

import { useState } from 'react'
import {
  Banknote,
  FileText,
  Building2,
  Send,
  ArrowRight,
  CheckCircle2,
  Calculator,
} from 'lucide-react'

export default function FinansieringPage() {
  const [tomtAdresse, setTomtAdresse] = useState('')
  const [husmodell, setHusmodell] = useState('')
  const [tomtekostnad, setTomtekostnad] = useState('')
  const [byggekostnad, setByggekostnad] = useState('')
  const [egenkapital, setEgenkapital] = useState('')
  const [aarsinntekt, setAarsinntekt] = useState('')
  const [gjeld, setGjeld] = useState('')
  const [visResultat, setVisResultat] = useState(false)
  const [navn, setNavn] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  const tomtekostnadNum = parseFloat(tomtekostnad) || 0
  const byggekostnadNum = parseFloat(byggekostnad) || 0
  const egenkapitalNum = parseFloat(egenkapital) || 0
  const totalprosjekt = tomtekostnadNum + byggekostnadNum
  const laanebehov = Math.max(0, totalprosjekt - egenkapitalNum)
  const belaaningsgrad = totalprosjekt > 0 ? (laanebehov / totalprosjekt) * 100 : 0

  const formatKr = (n: number) =>
    n.toLocaleString('nb-NO', { maximumFractionDigits: 0 }) + ' kr'

  async function handleSendTilBank(e: React.FormEvent) {
    e.preventDefault()
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'finansiering',
          navn,
          email: epost,
          telefon,
          melding: `Finansiering for ${tomtAdresse} – ${husmodell}`,
          tomtAdresse,
          husmodell,
          tomtekostnad: tomtekostnadNum,
          byggekostnad: byggekostnadNum,
          egenkapital: egenkapitalNum,
          aarsinntekt: parseFloat(aarsinntekt) || 0,
          eksisterendeGjeld: parseFloat(gjeld) || 0,
          totalprosjekt,
          laanebehov,
          belaaningsgrad: Math.round(belaaningsgrad),
        }),
      })
      setSendt(true)
    } catch {
      alert('Noe gikk galt. Prøv igjen.')
    }
    setSender(false)
  }

  const steg = [
    {
      ikon: Calculator,
      tittel: 'Legg inn tallene',
      beskrivelse: 'Fyll ut prosjektkostnad, egenkapital og inntekt.',
    },
    {
      ikon: FileText,
      tittel: 'Se beregningen',
      beskrivelse: 'Vi viser totalprosjekt, lånebehov og belåningsgrad.',
    },
    {
      ikon: Send,
      tittel: 'Send til bank',
      beskrivelse: 'Vi sender komplett prosjektpakke til partnerbank.',
    },
    {
      ikon: Banknote,
      tittel: 'Få finansiering',
      beskrivelse: 'Forventet svartid: 3–5 virkedager.',
    },
  ]

  if (sendt) {
    return (
      <section className="bg-tomtly-dark py-20 lg:py-28">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-white mb-4">
            Sendt til bank!
          </h2>
          <p className="text-brand-400 mb-4">
            Vi sender komplett prosjektpakke til partnerbank.
          </p>
          <p className="text-brand-500 text-sm">
            Forventet svartid: 3–5 virkedager.
          </p>
        </div>
      </section>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-tomtly-dark py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Banknote className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">Finansiering</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
            Finansiering for tomtekjøpere
          </h1>
          <p className="text-lg text-brand-400 max-w-2xl mx-auto">
            Vi kobler deg med bank som gir rask behandling av byggelånsøknaden din – fordi du allerede har komplett prosjektkalkyle.
          </p>
        </div>
      </section>

      {/* Hvordan det fungerer */}
      <section className="bg-tomtly-warm py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-10 text-center">
            Slik fungerer det
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steg.map((s, i) => (
              <div key={s.tittel} className="text-center">
                <div className="w-12 h-12 bg-tomtly-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <s.ikon className="w-6 h-6 text-tomtly-accent" />
                </div>
                <div className="text-xs font-semibold text-brand-400 mb-1">Steg {i + 1}</div>
                <h3 className="font-semibold text-tomtly-dark mb-1">{s.tittel}</h3>
                <p className="text-sm text-brand-600">{s.beskrivelse}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kalkulator + skjema */}
      <section className="bg-white py-12 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm mb-8">
            <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">
              Prosjektinformasjon
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">
                  Tomt (adresse)
                </label>
                <input
                  type="text"
                  value={tomtAdresse}
                  onChange={(e) => setTomtAdresse(e.target.value)}
                  placeholder="F.eks. Bjørnemyrveien 20, Nesodden"
                  className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">
                  Husmodell/type
                </label>
                <input
                  type="text"
                  value={husmodell}
                  onChange={(e) => setHusmodell(e.target.value)}
                  placeholder="F.eks. Moderne enebolig 180 m²"
                  className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Tomtekostnad
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={tomtekostnad}
                      onChange={(e) => setTomtekostnad(e.target.value)}
                      placeholder="3000000"
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">kr</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Estimert byggekostnad
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={byggekostnad}
                      onChange={(e) => setByggekostnad(e.target.value)}
                      placeholder="5000000"
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">kr</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">
                  Egenkapital
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={egenkapital}
                    onChange={(e) => setEgenkapital(e.target.value)}
                    placeholder="2000000"
                    className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">kr</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Årsinntekt (husstand)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={aarsinntekt}
                      onChange={(e) => setAarsinntekt(e.target.value)}
                      placeholder="1200000"
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">kr</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Eksisterende gjeld
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={gjeld}
                      onChange={(e) => setGjeld(e.target.value)}
                      placeholder="0"
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">kr</span>
                  </div>
                </div>
              </div>
            </div>

            {!visResultat && (
              <button
                onClick={() => setVisResultat(true)}
                disabled={!tomtekostnadNum && !byggekostnadNum}
                className="w-full mt-8 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Beregn
              </button>
            )}
          </div>

          {/* Resultat */}
          {visResultat && (
            <>
              <div className="bg-brand-50 rounded-2xl p-8 border border-brand-200 mb-8">
                <h3 className="font-display text-xl font-bold text-tomtly-dark mb-6">
                  Beregning
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-brand-200">
                    <span className="text-brand-600">Totalprosjekt</span>
                    <span className="font-bold text-tomtly-dark text-lg">{formatKr(totalprosjekt)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-brand-200">
                    <span className="text-brand-600">Egenkapital</span>
                    <span className="font-semibold text-tomtly-dark">{formatKr(egenkapitalNum)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-brand-200">
                    <span className="text-brand-600">Lånebehov</span>
                    <span className="font-bold text-tomtly-dark text-lg">{formatKr(laanebehov)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-brand-600">Belåningsgrad</span>
                    <span className={`font-bold text-lg ${belaaningsgrad > 85 ? 'text-red-600' : 'text-tomtly-accent'}`}>
                      {belaaningsgrad.toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Send til bank */}
              <form onSubmit={handleSendTilBank} className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm">
                <h3 className="font-display text-xl font-bold text-tomtly-dark mb-2">
                  Send til bank
                </h3>
                <p className="text-sm text-brand-600 mb-6">
                  Vi sender komplett prosjektpakke til partnerbank. Forventet svartid: 3–5 virkedager.
                </p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">Navn</label>
                    <input
                      type="text"
                      required
                      value={navn}
                      onChange={(e) => setNavn(e.target.value)}
                      placeholder="Ola Nordmann"
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">E-post</label>
                    <input
                      type="email"
                      required
                      value={epost}
                      onChange={(e) => setEpost(e.target.value)}
                      placeholder="ola@epost.no"
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">Telefon</label>
                    <input
                      type="tel"
                      required
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
                      placeholder="12345678"
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={sender}
                  className="w-full mt-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {sender ? 'Sender...' : 'Send til bank'}
                  {!sender && <Send className="w-4 h-4" />}
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </>
  )
}
