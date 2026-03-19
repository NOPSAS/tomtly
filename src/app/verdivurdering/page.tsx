'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, MapPin, Clock, Home, TrendingUp } from 'lucide-react'

export default function VerdivurderingPage() {
  const [sendt, setSendt] = useState(false)
  const [sender, setSender] = useState(false)
  const [adresse, setAdresse] = useState('')
  const [tomtestorrelse, setTomtestorrelse] = useState('')
  const [navn, setNavn] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [hvaVilDu, setHvaVilDu] = useState('')

  async function sendBestilling() {
    if (!adresse || !navn || !epost || !telefon) return
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'verdivurdering',
          navn,
          email: epost,
          telefon,
          adresse,
          tomtestorrelse,
          hva_vil_du: hvaVilDu,
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
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-display text-2xl font-bold text-tomtly-dark mb-3">
            Takk, {navn}!
          </h1>
          <p className="text-brand-600 mb-2">
            Vi har mottatt forespørselen din for <strong>{adresse}</strong>.
          </p>
          <div className="bg-white rounded-xl border border-brand-200 p-5 my-6 text-left">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-tomtly-accent" />
              <p className="font-semibold text-tomtly-dark">Du hører fra oss innen 1 virkedag</p>
            </div>
            <p className="text-sm text-brand-600">
              Vårt arkitekt- og eiendomsteam gjennomgår tomten din og sender deg en profesjonell verdivurdering med mulighetsbeskrivelse.
            </p>
          </div>
          <Link href="/" className="text-sm text-tomtly-accent hover:underline">
            ← Tilbake til forsiden
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Hero */}
      <div className="bg-tomtly-dark py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Hva er tomten din verdt?
          </h1>
          <p className="text-lg text-brand-400 max-w-xl mx-auto">
            Få en profesjonell verdivurdering fra vårt arkitektteam – helt gratis. Du hører fra oss innen 1 virkedag.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm">
          <div className="space-y-5">
            {/* Adresse */}
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">
                Adresse <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                <input
                  type="text"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  placeholder="F.eks. Bjørnemyrveien 20, 1453 Nesodden"
                  className="w-full pl-10 pr-4 py-3 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
                />
              </div>
            </div>

            {/* Tomtestørrelse */}
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">
                Tomtestørrelse (m²) <span className="text-xs text-brand-400">(valgfritt – vi finner det)</span>
              </label>
              <input
                type="number"
                value={tomtestorrelse}
                onChange={(e) => setTomtestorrelse(e.target.value)}
                placeholder="F.eks. 800"
                className="w-full px-4 py-3 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>

            {/* Hva vil du */}
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">
                Hva er du nysgjerrig på? <span className="text-xs text-brand-400">(valgfritt)</span>
              </label>
              <select
                value={hvaVilDu}
                onChange={(e) => setHvaVilDu(e.target.value)}
                className="w-full px-4 py-3 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              >
                <option value="">Velg...</option>
                <option value="selge">Jeg vurderer å selge tomten</option>
                <option value="bygge">Jeg vil bygge selv</option>
                <option value="fradele">Jeg lurer på om jeg kan skille ut en del</option>
                <option value="nysgjerrig">Bare nysgjerrig på verdien</option>
              </select>
            </div>

            <div className="border-t border-brand-200 pt-5">
              <p className="text-sm font-medium text-brand-700 mb-3">Dine opplysninger</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-brand-500 mb-1">Navn <span className="text-red-500">*</span></label>
                  <input type="text" value={navn} onChange={(e) => setNavn(e.target.value)} className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20" />
                </div>
                <div>
                  <label className="block text-xs text-brand-500 mb-1">Telefon <span className="text-red-500">*</span></label>
                  <input type="tel" value={telefon} onChange={(e) => setTelefon(e.target.value)} className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs text-brand-500 mb-1">E-post <span className="text-red-500">*</span></label>
                <input type="email" value={epost} onChange={(e) => setEpost(e.target.value)} className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20" />
              </div>
            </div>

            <button
              onClick={sendBestilling}
              disabled={!adresse || !navn || !epost || !telefon || sender}
              className="w-full py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {sender ? 'Sender...' : 'Få gratis verdivurdering'}
              {!sender && <ArrowRight className="w-4 h-4" />}
            </button>

            <p className="text-xs text-brand-400 text-center">
              Helt gratis og uforpliktende. Du hører fra oss innen 1 virkedag.
            </p>
          </div>
        </div>

        {/* Hva du får */}
        <div className="mt-10 mb-16">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6 text-center">
            Hva du får i verdivurderingen
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 border border-brand-200 text-center">
              <TrendingUp className="w-8 h-8 text-tomtly-accent mx-auto mb-3" />
              <h3 className="font-semibold text-tomtly-dark mb-1">Estimert verdi</h3>
              <p className="text-xs text-brand-500">Hva tomten er verdt i dagens marked, basert på sammenlignbare salg.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-brand-200 text-center">
              <Home className="w-8 h-8 text-tomtly-accent mx-auto mb-3" />
              <h3 className="font-semibold text-tomtly-dark mb-1">Hva kan bygges</h3>
              <p className="text-xs text-brand-500">Kort oversikt over regulering og byggemuligheter.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-brand-200 text-center">
              <MapPin className="w-8 h-8 text-tomtly-accent mx-auto mb-3" />
              <h3 className="font-semibold text-tomtly-dark mb-1">Anbefaling</h3>
              <p className="text-xs text-brand-500">Vår anbefaling – selge, bygge selv, eller fradele?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
