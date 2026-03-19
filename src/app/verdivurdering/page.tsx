'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Calculator,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Share2,
  Copy,
  Facebook,
  MapPin,
} from 'lucide-react'

export default function VerdivurderingPage() {
  const [steg, setSteg] = useState(1)
  const [adresse, setAdresse] = useState('')
  const [tomtestorrelse, setTomtestorrelse] = useState('')
  const [snittprisTomt, setSnittprisTomt] = useState(5000)
  const [boligprisM2, setBoligprisM2] = useState(65000)
  const [byaUtnyttelse, setByaUtnyttelse] = useState(25)
  const [byggekostnadM2, setByggekostnadM2] = useState(35000)
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [vilViteMer, setVilViteMer] = useState(false)
  const [sender, setSender] = useState(false)
  const [kopiert, setKopiert] = useState(false)

  const tomtM2 = parseFloat(tomtestorrelse) || 0

  // Beregninger
  const raatomtverdi = tomtM2 * snittprisTomt
  const byggarealM2 = tomtM2 * (byaUtnyttelse / 100)
  const boligverdi = byggarealM2 * boligprisM2
  const byggekostnad = byggarealM2 * byggekostnadM2
  const gebyrer = boligverdi * 0.05
  const margin = boligverdi * 0.15
  const utviklingsverdi = boligverdi - byggekostnad - gebyrer - margin
  const differanse = utviklingsverdi - raatomtverdi

  const formatKr = (n: number) =>
    n.toLocaleString('nb-NO', { maximumFractionDigits: 0 }) + ' kr'

  async function sendLead() {
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'verdivurdering',
          navn: epost.split('@')[0],
          email: epost,
          telefon: telefon || undefined,
          melding: `Verdivurdering for ${adresse}`,
          adresse,
          tomtestorrelse: tomtM2,
          snittprisTomt,
          boligprisM2,
          byaUtnyttelse,
          byggekostnadM2,
          raatomtverdi,
          utviklingsverdi,
          vilViteMer,
        }),
      })
    } catch {
      // Vis resultat uansett
    }
    setSender(false)
    setSteg(5)
  }

  function kopierLenke() {
    navigator.clipboard.writeText(window.location.href)
    setKopiert(true)
    setTimeout(() => setKopiert(false), 2000)
  }

  function delPaaFacebook() {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      '_blank'
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-tomtly-dark py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Calculator className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              Gratis verdivurdering
            </span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
            Hva er tomten din verdt?
          </h1>
          <p className="text-lg text-brand-400 max-w-xl mx-auto">
            Gratis verdivurdering på 30 sekunder
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-tomtly-warm py-12 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Steg-indikator */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-8 h-1 rounded-full transition-colors ${
                  s <= steg ? 'bg-tomtly-accent' : 'bg-brand-200'
                }`}
              />
            ))}
          </div>

          {/* Steg 1: Adresse */}
          {steg === 1 && (
            <div className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
                Hvor ligger tomten?
              </h2>
              <p className="text-brand-600 mb-6">Skriv inn adressen til tomten du vil vurdere.</p>
              <div className="relative mb-6">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
                <input
                  type="text"
                  value={adresse}
                  onChange={(e) => setAdresse(e.target.value)}
                  placeholder="F.eks. Storgata 1, 1400 Ski"
                  className="w-full pl-10 pr-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                />
              </div>
              <button
                onClick={() => setSteg(2)}
                disabled={!adresse.trim()}
                className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Neste
              </button>
            </div>
          )}

          {/* Steg 2: Tomtestørrelse */}
          {steg === 2 && (
            <div className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
                Hvor stor er tomten?
              </h2>
              <p className="text-brand-600 mb-6">Oppgi tomtestørrelsen i kvadratmeter.</p>
              <div className="relative mb-6">
                <input
                  type="number"
                  value={tomtestorrelse}
                  onChange={(e) => setTomtestorrelse(e.target.value)}
                  placeholder="F.eks. 800"
                  className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">
                  m²
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSteg(1)}
                  className="px-6 py-3 border border-brand-300 text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
                >
                  Tilbake
                </button>
                <button
                  onClick={() => setSteg(3)}
                  disabled={!tomtM2 || tomtM2 <= 0}
                  className="flex-1 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Neste
                </button>
              </div>
            </div>
          )}

          {/* Steg 3: Kalkulatorfelter */}
          {steg === 3 && (
            <div className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
                Juster beregningsgrunnlaget
              </h2>
              <p className="text-brand-600 mb-6">
                Vi har satt inn standardverdier. Juster om du kjenner lokale priser.
              </p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Snittpris tomt per m² i området
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={snittprisTomt}
                      onChange={(e) => setSnittprisTomt(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">
                      kr/m²
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Estimert boligpris per m² nybygg
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={boligprisM2}
                      onChange={(e) => setBoligprisM2(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">
                      kr/m²
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Estimert BYA-utnyttelse
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={byaUtnyttelse}
                      onChange={(e) => setByaUtnyttelse(Number(e.target.value))}
                      min={5}
                      max={80}
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">
                      %
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Estimert byggekostnad per m²
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={byggekostnadM2}
                      onChange={(e) => setByggekostnadM2(Number(e.target.value))}
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">
                      kr/m²
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setSteg(2)}
                  className="px-6 py-3 border border-brand-300 text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
                >
                  Tilbake
                </button>
                <button
                  onClick={() => setSteg(4)}
                  className="flex-1 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Beregn verdi
                </button>
              </div>
            </div>
          )}

          {/* Steg 4: Lead capture */}
          {steg === 4 && (
            <div className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
                Nesten der!
              </h2>
              <p className="text-brand-600 mb-6">
                Oppgi e-postadressen din for å se resultatet.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    E-post <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={epost}
                    onChange={(e) => setEpost(e.target.value)}
                    placeholder="din@epost.no"
                    className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Telefon <span className="text-brand-400 text-xs">(valgfritt)</span>
                  </label>
                  <input
                    type="tel"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                    placeholder="12345678"
                    className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={vilViteMer}
                    onChange={(e) => setVilViteMer(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-brand-300 text-tomtly-accent focus:ring-tomtly-accent"
                  />
                  <span className="text-sm text-brand-600">
                    Ja, jeg vil vite mer om å selge tomten min
                  </span>
                </label>
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => setSteg(3)}
                  className="px-6 py-3 border border-brand-300 text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
                >
                  Tilbake
                </button>
                <button
                  onClick={sendLead}
                  disabled={!epost.includes('@') || sender}
                  className="flex-1 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  {sender ? 'Sender...' : 'Vis resultat'}
                  {!sender && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* Steg 5: Resultat */}
          {steg === 5 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm">
                <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-1">
                  Verdivurdering for
                </h2>
                <p className="text-brand-600 mb-8">{adresse} ({tomtM2} m²)</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-brand-50 rounded-xl p-6">
                    <p className="text-sm text-brand-600 mb-1">Estimert råtomtverdi</p>
                    <p className="text-3xl font-bold text-tomtly-dark">{formatKr(raatomtverdi)}</p>
                    <p className="text-xs text-brand-500 mt-1">
                      {tomtM2} m² x {snittprisTomt.toLocaleString('nb-NO')} kr/m²
                    </p>
                  </div>
                  <div className="bg-forest-50 rounded-xl p-6 border-2 border-tomtly-accent/20">
                    <p className="text-sm text-tomtly-accent mb-1">Estimert utviklingsverdi</p>
                    <p className="text-3xl font-bold text-tomtly-dark">
                      {formatKr(Math.max(0, utviklingsverdi))}
                    </p>
                    <p className="text-xs text-brand-500 mt-1">
                      Baklengsregning fra boligverdi
                    </p>
                  </div>
                </div>

                {differanse > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <p className="font-semibold text-green-800">Utviklingspotensial</p>
                    </div>
                    <p className="text-green-700">
                      Tomten din kan være verdt{' '}
                      <span className="font-bold">{formatKr(differanse)}</span> mer som
                      utviklingsprosjekt.
                    </p>
                  </div>
                )}

                {/* To spor */}
                <h3 className="font-semibold text-tomtly-dark text-lg mt-2 mb-4">Du har to muligheter:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Spor A: Bygge selv */}
                  <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                    <div className="text-2xl mb-2">🏡</div>
                    <h4 className="font-semibold text-tomtly-dark mb-2">Bygge selv</h4>
                    <p className="text-sm text-brand-600 mb-4">
                      Se hva du kan bygge på tomten din – med husmodeller fra ferdighusleverandører og komplett byggekalkyle.
                    </p>
                    <ul className="space-y-1.5 mb-4 text-xs text-brand-600">
                      <li>✓ Mulighetsstudie – 4 900 kr</li>
                      <li>✓ Situasjonsplan – 5 000 kr</li>
                      <li>✓ Byggesøknad – 25 000 kr</li>
                      <li>✓ Arkitekttegninger – 20 000 kr</li>
                      <li>✓ Tilbud fra entreprenører – gratis</li>
                      <li>✓ Byggelånsforespørsel – gratis</li>
                    </ul>
                    <Link
                      href="/selger/onboarding"
                      className="block w-full text-center py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors text-sm"
                    >
                      Se mulighetene →
                    </Link>
                  </div>

                  {/* Spor B: Selge / fradele */}
                  <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
                    <div className="text-2xl mb-2">💰</div>
                    <h4 className="font-semibold text-tomtly-dark mb-2">Selge eller skille ut</h4>
                    <p className="text-sm text-brand-600 mb-4">
                      {tomtM2 > 700
                        ? `Du kan fradele ~${Math.round(tomtM2 * 0.4)} m² og selge for est. ${formatKr(Math.round(tomtM2 * 0.4 * snittprisTomt))}. Vi tar oss av alt.`
                        : 'Vi hjelper deg med å selge tomten – med profesjonell presentasjon og salgsprosess.'}
                    </p>
                    <ul className="space-y-1.5 mb-4 text-xs text-brand-600">
                      <li>✓ Gratis vurdering</li>
                      <li>✓ Vi håndterer hele prosessen</li>
                      <li>✓ Du betaler kun ved salg (5%)</li>
                      <li>✓ Oppgjør via Propr</li>
                    </ul>
                    <Link
                      href={tomtM2 > 700 ? '/fradeling' : '/selger/onboarding'}
                      className="block w-full text-center py-2.5 border-2 border-tomtly-accent text-tomtly-accent font-medium rounded-lg hover:bg-forest-100 transition-colors text-sm"
                    >
                      {tomtM2 > 700 ? 'Gratis vurdering →' : 'Selg tomten →'}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Deleknapper */}
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={delPaaFacebook}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white text-sm rounded-lg hover:bg-[#1565C0] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Del på Facebook
                </button>
                <button
                  onClick={kopierLenke}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-brand-300 text-brand-600 text-sm rounded-lg hover:bg-brand-50 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  {kopiert ? 'Kopiert!' : 'Kopier lenke'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
