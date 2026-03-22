'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Ruler, Building2, TrendingUp, Home, ArrowRight, Phone, CheckCircle2, Loader2 } from 'lucide-react'

function getMockData(address: string) {
  const len = address.length
  const seed = len % 7

  const tomtestorrelse = 650 + seed * 80
  const byaProsent = 20 + (seed % 4) * 5
  const maksAreal = Math.round(tomtestorrelse * byaProsent / 100)
  const gesimshoeyde = 7.0 + (seed % 3) * 0.5
  const etasjer = seed > 4 ? 3 : 2
  const verdiLav = Math.round((1400000 + seed * 200000) / 100000) * 100000
  const verdiHoey = Math.round(verdiLav * 1.35 / 100000) * 100000

  const husmodeller = [
    { navn: 'Nordstrand 120', areal: 120, pris: '2 800 000', farge: 'bg-forest-600' },
    { navn: 'Fjordheim 95', areal: 95, pris: '2 200 000', farge: 'bg-tomtly-accent' },
    { navn: 'Solvik 145', areal: 145, pris: '3 400 000', farge: 'bg-earth-600' },
  ]

  return {
    tomtestorrelse,
    byaProsent,
    maksAreal,
    gesimshoeyde,
    etasjer,
    verdiLav: verdiLav.toLocaleString('nb-NO'),
    verdiHoey: verdiHoey.toLocaleString('nb-NO'),
    husmodeller,
  }
}

export default function HvaKanJegByggePage() {
  const [adresse, setAdresse] = useState('')
  const [soeker, setSoeker] = useState(false)
  const [resultat, setResultat] = useState<ReturnType<typeof getMockData> | null>(null)
  const [soektAdresse, setSoektAdresse] = useState('')

  function handleSoek() {
    if (!adresse.trim()) return
    setSoeker(true)
    setResultat(null)
    setSoektAdresse(adresse.trim())

    setTimeout(() => {
      setResultat(getMockData(adresse.trim()))
      setSoeker(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-tomtly-light">
      {/* Hero */}
      <section className="bg-tomtly-dark text-white">
        <div className="max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Hva kan du bygge på tomten din?
          </h1>
          <p className="text-lg md:text-xl text-brand-300 mb-10 max-w-2xl mx-auto">
            Skriv inn adressen og få svar på sekunder – helt gratis
          </p>

          <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSoek()}
                placeholder="F.eks. Bjørnemyrveien 20, Nesodden"
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 text-base focus:outline-none focus:ring-2 focus:ring-tomtly-gold"
              />
            </div>
            <button
              onClick={handleSoek}
              disabled={soeker || !adresse.trim()}
              className="px-8 py-4 bg-tomtly-accent hover:bg-forest-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {soeker ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              Sjekk tomten
            </button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-b border-brand-100">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark text-center mb-12">
            Slik fungerer det
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                ikon: <MapPin className="w-7 h-7" />,
                steg: '1',
                tittel: 'Skriv inn adressen',
                beskrivelse: 'Oppgi adressen til tomten du vil sjekke.',
              },
              {
                ikon: <Ruler className="w-7 h-7" />,
                steg: '2',
                tittel: 'Vi sjekker reguleringsplan, tomtestørrelse og utnyttelsesgrad',
                beskrivelse: 'Dataene hentes automatisk fra offentlige kilder.',
              },
              {
                ikon: <Home className="w-7 h-7" />,
                steg: '3',
                tittel: 'Du får svar – og kan bestille full analyse',
                beskrivelse: 'Se hva du kan bygge, estimert verdi og passende husmodeller.',
              },
            ].map((s) => (
              <div key={s.steg} className="text-center">
                <div className="w-14 h-14 rounded-full bg-forest-50 text-tomtly-accent flex items-center justify-center mx-auto mb-4">
                  {s.ikon}
                </div>
                <div className="text-sm font-semibold text-tomtly-gold mb-1">Steg {s.steg}</div>
                <h3 className="font-display text-lg font-bold text-tomtly-dark mb-2">{s.tittel}</h3>
                <p className="text-brand-500 text-sm">{s.beskrivelse}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loading */}
      {soeker && (
        <section className="py-20 text-center">
          <Loader2 className="w-10 h-10 animate-spin text-tomtly-accent mx-auto mb-4" />
          <p className="text-brand-600 text-lg">Sjekker tomten på <span className="font-semibold">{soektAdresse}</span>...</p>
        </section>
      )}

      {/* Results */}
      {resultat && !soeker && (
        <section className="py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            {/* Demo badge */}
            <div className="text-center">
              <span className="inline-block bg-tomtly-gold/10 text-tomtly-gold border border-tomtly-gold/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                Demo-resultat
              </span>
            </div>

            {/* Tomteinformasjon */}
            <div className="bg-white rounded-xl border border-brand-100 p-6 md:p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-tomtly-dark mb-5 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-tomtly-accent" />
                Tomteinformasjon
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-brand-500 mb-1">Adresse</div>
                  <div className="font-semibold text-tomtly-dark">{soektAdresse}</div>
                </div>
                <div>
                  <div className="text-sm text-brand-500 mb-1">Estimert tomtestørrelse</div>
                  <div className="font-semibold text-tomtly-dark">{resultat.tomtestorrelse} m²</div>
                </div>
                <div>
                  <div className="text-sm text-brand-500 mb-1">Reguleringsformål</div>
                  <div className="font-semibold text-tomtly-dark">Boligbebyggelse</div>
                </div>
              </div>
            </div>

            {/* Hva kan du bygge? */}
            <div className="bg-white rounded-xl border border-brand-100 p-6 md:p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-tomtly-dark mb-5 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-tomtly-accent" />
                Hva kan du bygge?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Maks utnyttelsesgrad (BYA)', verdi: `${resultat.byaProsent}%` },
                  { label: 'Maks bebygd areal', verdi: `${resultat.maksAreal} m²` },
                  { label: 'Tillatt gesimshøyde', verdi: `${resultat.gesimshoeyde.toFixed(1)} m` },
                  { label: 'Antall etasjer', verdi: `${resultat.etasjer}` },
                ].map((d) => (
                  <div key={d.label}>
                    <div className="text-sm text-brand-500 mb-1">{d.label}</div>
                    <div className="text-2xl font-bold text-tomtly-dark">{d.verdi}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estimert tomteverdi */}
            <div className="bg-white rounded-xl border border-brand-100 p-6 md:p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-tomtly-dark mb-5 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-tomtly-accent" />
                Estimert tomteverdi
              </h3>
              <div className="text-3xl md:text-4xl font-bold text-tomtly-accent mb-2">
                {resultat.verdiLav} – {resultat.verdiHoey} kr
              </div>
              <p className="text-sm text-brand-400">
                Basert på sammenlignbare salg i området
              </p>
            </div>

            {/* Husmodeller */}
            <div className="bg-white rounded-xl border border-brand-100 p-6 md:p-8 shadow-sm">
              <h3 className="font-display text-xl font-bold text-tomtly-dark mb-5 flex items-center gap-2">
                <Home className="w-5 h-5 text-tomtly-accent" />
                Husmodeller som passer denne tomten
              </h3>
              <div className="grid sm:grid-cols-3 gap-5">
                {resultat.husmodeller.map((hus) => (
                  <div key={hus.navn} className="rounded-lg border border-brand-100 overflow-hidden">
                    <div className={`${hus.farge} h-36 flex items-center justify-center`}>
                      <Home className="w-12 h-12 text-white/50" />
                    </div>
                    <div className="p-4">
                      <div className="font-semibold text-tomtly-dark mb-1">{hus.navn}</div>
                      <div className="text-sm text-brand-500 mb-2">{hus.areal} m²</div>
                      <div className="text-sm font-semibold text-tomtly-accent">Fra {hus.pris} kr</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-tomtly-dark rounded-xl p-8 md:p-12 text-center text-white">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Vil du ha den fulle analysen?
              </h3>
              <p className="text-brand-300 mb-8 max-w-xl mx-auto leading-relaxed">
                For 4 990 kr får du komplett mulighetsstudie med husmodeller tilpasset din tomt,
                byggekalkyle, verdivurdering og markedsvurdering.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/for-tomteeiere"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-tomtly-accent hover:bg-forest-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Bestill full tomtanalyse
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:40603908"
                  className="inline-flex items-center gap-2 text-brand-300 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Eller ring oss: 40 60 39 08
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom section */}
      <section className="bg-brand-50 border-t border-brand-100">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-6">
            Brukes av tomteeiere over hele Norge
          </h2>
          <p className="text-brand-500 mb-8">
            Se ekte eksempler på tomtanalyser vi har gjennomført:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            {[
              { navn: 'Bjørnemyrveien 20', href: '/tomter/bjornemyrveien-20' },
              { navn: 'Bjørnemyrveien 22', href: '/tomter/bjornemyrveien-22' },
              { navn: 'Gamle Alværnvei 67', href: '/tomter/alvaern-67' },
            ].map((eksempel) => (
              <Link
                key={eksempel.href}
                href={eksempel.href}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-brand-200 rounded-lg text-tomtly-dark hover:border-tomtly-accent hover:text-tomtly-accent transition-colors text-sm font-medium"
              >
                <CheckCircle2 className="w-4 h-4 text-tomtly-accent" />
                {eksempel.navn}
              </Link>
            ))}
          </div>
          <p className="text-sm text-brand-400">
            Tomtly er en tjeneste fra NOPS AS (org.nr 933 819 086)
          </p>
        </div>
      </section>
    </div>
  )
}
