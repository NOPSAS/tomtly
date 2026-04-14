'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, MapPin, Users, TrendingUp, Building2, ChevronDown, Shield } from 'lucide-react'

export default function ForKommunerPage() {
  return (
    <>
      <Hero />
      <Utfordringen />
      <SlikFungererDet />
      <HvaKommunenFar />
      <Prismodell />
      <Regnestykke />
      <KontaktSkjema />
    </>
  )
}

function Hero() {
  return (
    <section className="bg-tomtly-dark text-white py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
          <Building2 className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs text-white/80 font-medium">For kommuner</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
          Selg kommunale tomter
          <br />
          <span className="text-green-400">raskere og bedre</span>
        </h1>
        <p className="text-lg text-brand-300 max-w-2xl mx-auto mb-10">
          Tomtly analyserer hver tomt, viser kjøpere hva de kan bygge, og markedsfører tomtene mot aktive kjøpere — slik at kommunale tomter ikke blir liggende.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#kontakt" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors">
            Start med en gratis pilot <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#pris" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-600 text-white font-semibold rounded-xl hover:bg-brand-900 transition-colors">
            Se prismodell
          </a>
        </div>
      </div>
    </section>
  )
}

function Utfordringen() {
  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Kommunale tomter fortjener bedre markedsføring
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Mange kommuner har tomter som blir liggende usolgt — ikke fordi de er dårlige, men fordi kjøpere ikke forstår hva de kan bygge der.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { tittel: 'Kjøpere er usikre', desc: 'Uten husmodeller og kostnadskalkyle tør ikke kjøpere å satse. De vet ikke hva de får.' },
            { tittel: 'Tomter blir liggende', desc: 'Kommunale tomtesalg konkurrerer med private tilbud som ofte har bedre presentasjon.' },
            { tittel: 'Tapte inntekter', desc: 'Usolgte tomter gir tapte inntekter for kommunen og manglende boligbygging i området.' },
          ].map((p) => (
            <div key={p.tittel} className="bg-white rounded-xl p-6 border border-brand-200">
              <h3 className="font-semibold text-tomtly-dark mb-2">{p.tittel}</h3>
              <p className="text-sm text-brand-600">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SlikFungererDet() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik fungerer det
          </h2>
        </div>
        <div className="space-y-4 max-w-2xl mx-auto">
          {[
            { nr: '1', tittel: 'Gratis pilot', desc: 'Vi analyserer 3–5 tomter gratis. Kommunen ser kvaliteten før avtale inngås.' },
            { nr: '2', tittel: 'Vi analyserer alle tomtene', desc: 'Reguleringsanalyse, husmodeller tilpasset hver tomt, plassering på kart og byggekostnadskalkyle.' },
            { nr: '3', tittel: 'Vi markedsfører tomtene', desc: 'Publisering på tomtly.no, annonsering mot aktive kjøpere, og profesjonelt salgsmateriell.' },
            { nr: '4', tittel: 'Kjøpere ser hva de kan bygge', desc: 'Hver tomt presenteres med husmodeller, kostnadskalkyle og kart. Kjøpere tar kontakt med kommunen.' },
          ].map((s) => (
            <div key={s.nr} className="flex items-start gap-5 bg-forest-50 border border-forest-200 rounded-xl p-5 text-forest-700">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-tomtly-accent flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-tomtly-accent">{s.nr}</span>
              </div>
              <div>
                <h3 className="font-semibold mb-0.5">{s.tittel}</h3>
                <p className="text-sm opacity-80">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HvaKommunenFar() {
  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hva kommunen får
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            'Ubegrenset tomteanalyser i avtaleperioden',
            'Husmodeller fra norske leverandører på hver tomt',
            'Plassering av hus på kart per tomt',
            'Byggekostnadskalkyle kjøpere kan ta med til banken',
            'Profesjonelt salgsmateriell for alle tomter',
            'Publisering og markedsføring på tomtly.no',
            'Bistand i dialog med interessenter',
            'Dedikert kontaktperson hos Tomtly',
          ].map((f) => (
            <div key={f} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-brand-200">
              <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-brand-700">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Prismodell() {
  return (
    <section className="bg-white py-20 lg:py-28" id="pris">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Prismodell
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="bg-forest-50 rounded-2xl p-8 border-2 border-tomtly-accent text-center">
            <p className="text-sm font-medium text-forest-700 mb-2">Pilot</p>
            <p className="text-4xl font-bold text-tomtly-accent mb-2">Gratis</p>
            <p className="text-sm text-brand-600">3–5 tomter analysert som uforpliktende test. Se kvaliteten før dere bestemmer dere.</p>
          </div>
          <div className="bg-tomtly-dark rounded-2xl p-8 text-white">
            <p className="text-sm font-medium text-brand-400 mb-2">Tomtly for Kommuner</p>
            <p className="text-4xl font-bold text-white mb-1">30 000 kr<span className="text-lg font-normal text-brand-400">/mnd</span></p>
            <p className="text-sm text-brand-400 mb-4">12 måneder binding · eks. mva</p>
            <ul className="space-y-1.5 text-sm text-brand-300">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />Ubegrenset tomteanalyser</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />Husmodeller og kostnadskalkyle</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />Markedsføring på tomtly.no</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />+ 2 % suksesshonorar + mva ved salg</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />Dedikert kontaktperson</li>
            </ul>
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
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-8 text-center">
          Eksempel: Kommune med 30 tomter
        </h2>
        <div className="bg-white rounded-2xl p-8 border border-brand-200">
          <div className="space-y-4">
            {[
              { post: 'Tomtly-abonnement (30 000 kr × 12 mnd)', belop: '360 000 kr/år' },
              { post: 'Suksesshonorar (2 % av 12 MNOK + mva)', belop: '240 000 kr' },
              { post: '10 tomter selger første år (snitt 1,2 MNOK)', belop: '12 MNOK' },
            ].map((r, i) => (
              <div key={r.post} className={`flex justify-between items-center py-2.5 ${i > 0 ? 'border-t border-brand-200' : ''}`}>
                <span className="text-brand-600 text-sm">{r.post}</span>
                <span className="font-semibold text-tomtly-dark">{r.belop}</span>
              </div>
            ))}
            <div className="flex justify-between items-center py-2.5 border-t border-brand-200">
              <span className="text-brand-600 text-sm">Kommunens totale kostnad til Tomtly</span>
              <span className="text-brand-500">600 000 kr</span>
            </div>
            <div className="flex justify-between items-center py-3 bg-green-50 rounded-lg px-4 -mx-4">
              <span className="font-semibold text-green-800">Kommunens inntekt fra tomtesalg</span>
              <span className="font-bold text-green-800 text-xl">12 MNOK</span>
            </div>
            <div className="flex justify-between items-center py-2.5">
              <span className="text-brand-600 text-sm">Kostnad som andel av inntekt</span>
              <span className="font-bold text-tomtly-accent">5 %</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function KontaktSkjema() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'kommune-kontakt',
          navn: fd.get('navn'),
          email: fd.get('email'),
          telefon: fd.get('telefon'),
          ekstra: {
            kommune: fd.get('kommune'),
            rolle: fd.get('rolle'),
            antallTomter: fd.get('antallTomter'),
            melding: fd.get('melding'),
          },
        }),
      })
      setSent(true)
    } catch {}
    setLoading(false)
  }

  if (sent) {
    return (
      <section className="bg-white py-20 lg:py-28" id="kontakt">
        <div className="max-w-lg mx-auto px-4 text-center">
          <CheckCircle2 className="w-16 h-16 text-tomtly-accent mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Takk for henvendelsen!</h2>
          <p className="text-brand-600">Vi kontakter deg innen 24 timer for å avtale en uforpliktende gjennomgang.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-20 lg:py-28" id="kontakt">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-3">
            Start med en gratis pilot
          </h2>
          <p className="text-brand-600">Vi analyserer 3–5 av kommunens tomter helt gratis. Ingen forpliktelser.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-brand-500 mb-1">Navn</label>
              <input name="navn" required className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">Kommune</label>
              <input name="kommune" required className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-brand-500 mb-1">E-post</label>
              <input name="email" type="email" required className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">Telefon</label>
              <input name="telefon" className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-brand-500 mb-1">Din rolle</label>
              <input name="rolle" placeholder="F.eks. rådgiver, leder" className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">Ca. antall tomter</label>
              <input name="antallTomter" placeholder="F.eks. 15" className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-brand-500 mb-1">Melding (valgfritt)</label>
            <textarea name="melding" rows={3} className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3.5 bg-tomtly-accent text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50">
            {loading ? 'Sender...' : 'Send forespørsel'}
          </button>
        </form>
      </div>
    </section>
  )
}
