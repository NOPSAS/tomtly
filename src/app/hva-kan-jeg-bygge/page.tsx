'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Ruler, Home, ArrowRight, Phone, CheckCircle2, Loader2, Mail, User } from 'lucide-react'

export default function HvaKanJegByggePage() {
  const [adresse, setAdresse] = useState('')
  const [navn, setNavn] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)
  const [feil, setFeil] = useState('')

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!adresse.trim() || !epost.trim()) return
    setSender(true)
    setFeil('')
    try {
      const res = await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'hva-kan-jeg-bygge',
          navn: navn.trim(),
          epost: epost.trim(),
          telefon: telefon.trim(),
          ekstra: { adresse: adresse.trim() },
        }),
      })
      if (res.ok) {
        setSendt(true)
      } else {
        setFeil('Noe gikk galt. Prøv igjen eller ring oss.')
      }
    } catch {
      setFeil('Kunne ikke sende forespørselen. Prøv igjen.')
    } finally {
      setSender(false)
    }
  }

  if (sendt) {
    return (
      <div className="min-h-screen bg-tomtly-light">
        <section className="bg-tomtly-dark text-white">
          <div className="max-w-3xl mx-auto px-4 py-20 md:py-32 text-center">
            <div className="w-16 h-16 rounded-full bg-tomtly-accent/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-tomtly-accent" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Takk for forespørselen!
            </h1>
            <p className="text-lg text-brand-300 mb-3">
              Vi sjekker hva som kan bygges på <span className="font-semibold text-white">{adresse}</span>
            </p>
            <p className="text-brand-400 mb-10 max-w-lg mx-auto">
              Du hører fra oss innen 1–3 virkedager med en vurdering av tomten din.
              Vi sjekker reguleringsplan, utnyttelsesgrad og foreslår passende husmodeller.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors"
              >
                Til forsiden
              </Link>
              <Link
                href="/for-tomteeiere"
                className="px-6 py-3 bg-tomtly-accent hover:bg-forest-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Se full tomtanalyse
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-tomtly-light">
      {/* Hero */}
      <section className="bg-tomtly-dark text-white">
        <div className="max-w-4xl mx-auto px-4 py-20 md:py-28 text-center">
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Hva kan du bygge på tomten din?
          </h1>
          <p className="text-lg md:text-xl text-brand-300 mb-4 max-w-2xl mx-auto">
            Oppgi adressen – vi sjekker reguleringsplan, utnyttelsesgrad og foreslår husmodeller
          </p>
          <p className="text-sm text-brand-400 mb-10">
            Gratis og uforpliktende. Du får svar innen 1–3 virkedager.
          </p>

          {/* Form */}
          <form onSubmit={handleSend} className="max-w-xl mx-auto space-y-4">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
              <input
                type="text"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                placeholder="Adresse, f.eks. Bjørnemyrveien 20, Nesodden"
                required
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 text-base focus:outline-none focus:ring-2 focus:ring-tomtly-gold"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
                <input
                  type="text"
                  value={navn}
                  onChange={(e) => setNavn(e.target.value)}
                  placeholder="Ditt navn"
                  className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 text-base focus:outline-none focus:ring-2 focus:ring-tomtly-gold"
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
                <input
                  type="tel"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  placeholder="Telefon (valgfritt)"
                  className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 text-base focus:outline-none focus:ring-2 focus:ring-tomtly-gold"
                />
              </div>
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
              <input
                type="email"
                value={epost}
                onChange={(e) => setEpost(e.target.value)}
                placeholder="E-postadresse"
                required
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 text-base focus:outline-none focus:ring-2 focus:ring-tomtly-gold"
              />
            </div>

            {feil && (
              <p className="text-red-400 text-sm">{feil}</p>
            )}

            <button
              type="submit"
              disabled={sender || !adresse.trim() || !epost.trim()}
              className="w-full px-8 py-4 bg-tomtly-accent hover:bg-forest-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {sender ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sender...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Sjekk tomten min
                </>
              )}
            </button>
          </form>
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
                tittel: 'Du oppgir adressen',
                beskrivelse: 'Fortell oss hvilken tomt du vil sjekke.',
              },
              {
                ikon: <Ruler className="w-7 h-7" />,
                steg: '2',
                tittel: 'Vi sjekker reguleringsplan og utnyttelsesgrad',
                beskrivelse: 'Dataene hentes fra offentlige kilder og vurderes av vårt team.',
              },
              {
                ikon: <Home className="w-7 h-7" />,
                steg: '3',
                tittel: 'Du får svar med husmodellforslag',
                beskrivelse: 'Innen 1–3 virkedager mottar du en vurdering med hva som kan bygges.',
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

      {/* What you get */}
      <section className="bg-brand-50 border-b border-brand-100">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark text-center mb-10">
            Hva du får i vurderingen
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { tittel: 'Reguleringsformål', beskrivelse: 'Hva eiendommen er regulert til (bolig, fritid, næring osv.)' },
              { tittel: 'Utnyttelsesgrad', beskrivelse: 'Maks BYA, gesimshøyde og antall etasjer' },
              { tittel: 'Estimert tomteverdi', beskrivelse: 'Basert på sammenlignbare salg i området' },
              { tittel: 'Husmodellforslag', beskrivelse: 'Hvilke hus som passer tomtens størrelse og regulering' },
            ].map((punkt) => (
              <div key={punkt.tittel} className="bg-white rounded-xl border border-brand-200 p-5 flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-tomtly-dark mb-1">{punkt.tittel}</h3>
                  <p className="text-sm text-brand-500">{punkt.beskrivelse}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-white border-b border-brand-100">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-6">
            Se ekte eksempler på tomtanalyser
          </h2>
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
