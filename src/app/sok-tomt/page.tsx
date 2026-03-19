'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Search,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Home,
} from 'lucide-react'

export default function SokTomtPage() {
  const [hvaByggType, setHvaByggType] = useState('')
  const [husStorrelse, setHusStorrelse] = useState('')
  const [kommune, setKommune] = useState('')
  const [budsjett, setBudsjett] = useState('')
  const [mustHaves, setMustHaves] = useState<string[]>([])
  const [naarBygge, setNaarBygge] = useState('')
  const [navn, setNavn] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [varsle, setVarsle] = useState(true)
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  function toggleMustHave(item: string) {
    setMustHaves((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'kjoper_soker_tomt',
          navn,
          email: epost,
          telefon,
          melding: `Søker tomt – ${hvaByggType} i ${kommune}`,
          hvaByggType,
          husStorrelse,
          kommune,
          budsjett,
          mustHaves: mustHaves.join(', '),
          naarBygge,
          varsle,
        }),
      })
      setSendt(true)
    } catch {
      alert('Noe gikk galt. Prøv igjen.')
    }
    setSender(false)
  }

  const mustHaveOptions = [
    'Sjøutsikt',
    'Solrikt',
    'Flatt',
    'Barnevennlig',
    'Kollektivt',
  ]

  if (sendt) {
    return (
      <>
        <section className="bg-tomtly-dark py-20 lg:py-28">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Vi leter for deg!
            </h2>
            <p className="text-brand-400 mb-8">
              Du får varsel når tomter som matcher dukker opp.
            </p>
            <Link
              href="/tomter"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Se tilgjengelige tomter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-tomtly-dark py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Search className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">Kjøper søker tomt</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4">
            Vet du hva du vil bygge?
            <br />
            <span className="text-green-400">Vi finner tomten.</span>
          </h1>
          <p className="text-lg text-brand-400 max-w-xl mx-auto mb-6">
            Fortell oss hva du ser etter, så matcher vi deg med riktig tomt.
          </p>
          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-left">
            <p className="text-white font-medium mb-2">Vi finner tomt i området for deg</p>
            <p className="text-brand-400 text-sm leading-relaxed mb-3">
              Vi kontakter tomteeiere og eiendomseiere i området du vil bygge. De trenger bare si ja eller nei.
            </p>
            <p className="text-brand-400 text-sm leading-relaxed">
              Vi fradeler eiendommen kostnadsfritt og ordner salget. Vi tar 5% av salgssummen.
            </p>
          </div>
        </div>
      </section>

      {/* Skjema */}
      <section className="bg-tomtly-warm py-12 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Hva vil du bygge */}
            <div className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm">
              <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">
                Om prosjektet ditt
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Hva vil du bygge?
                  </label>
                  <select
                    required
                    value={hvaByggType}
                    onChange={(e) => setHvaByggType(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark bg-white"
                  >
                    <option value="">Velg type</option>
                    <option value="Enebolig">Enebolig</option>
                    <option value="Tomannsbolig">Tomannsbolig</option>
                    <option value="Hytte">Hytte</option>
                    <option value="Annet">Annet</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Hvor stort hus?
                  </label>
                  <select
                    required
                    value={husStorrelse}
                    onChange={(e) => setHusStorrelse(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark bg-white"
                  >
                    <option value="">Velg størrelse</option>
                    <option value="50-100 m²">50–100 m²</option>
                    <option value="100-150 m²">100–150 m²</option>
                    <option value="150-200 m²">150–200 m²</option>
                    <option value="200+ m²">200+ m²</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Hvor? (kommune/r)
                  </label>
                  <input
                    type="text"
                    required
                    value={kommune}
                    onChange={(e) => setKommune(e.target.value)}
                    placeholder="F.eks. Bærum, Asker, Nesodden"
                    className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Totalbudsjett (tomt + bygg)?
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={budsjett}
                      onChange={(e) => setBudsjett(e.target.value)}
                      placeholder="F.eks. 8000000"
                      className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 text-sm">
                      kr
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-2">
                    Must-haves
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {mustHaveOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleMustHave(opt)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                          mustHaves.includes(opt)
                            ? 'bg-tomtly-accent text-white border-tomtly-accent'
                            : 'bg-white text-brand-600 border-brand-300 hover:border-tomtly-accent'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">
                    Når vil du bygge?
                  </label>
                  <select
                    required
                    value={naarBygge}
                    onChange={(e) => setNaarBygge(e.target.value)}
                    className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark bg-white"
                  >
                    <option value="">Velg tidspunkt</option>
                    <option value="ASAP">Så snart som mulig</option>
                    <option value="1 år">Innen 1 år</option>
                    <option value="2+ år">2+ år</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Kontaktinfo */}
            <div className="bg-white rounded-2xl p-8 border border-brand-200 shadow-sm">
              <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">
                Dine kontaktopplysninger
              </h2>
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
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                    placeholder="12345678"
                    className="w-full px-4 py-3 border border-brand-300 rounded-lg focus:ring-2 focus:ring-tomtly-accent focus:border-tomtly-accent outline-none text-tomtly-dark"
                  />
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={varsle}
                    onChange={(e) => setVarsle(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-brand-300 text-tomtly-accent focus:ring-tomtly-accent"
                  />
                  <span className="text-sm text-brand-600">
                    Varsle meg når tomter som matcher dukker opp
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={sender}
              className="w-full py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 inline-flex items-center justify-center gap-2"
            >
              {sender ? 'Sender...' : 'Registrer tomtesøk'}
              {!sender && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          {/* Lenke til tomter */}
          <div className="mt-12 text-center bg-white rounded-2xl p-8 border border-brand-200">
            <Home className="w-8 h-8 text-tomtly-accent mx-auto mb-3" />
            <p className="text-brand-700 mb-4">
              Vi har allerede tomter tilgjengelige med ferdig mulighetsstudie.
            </p>
            <Link
              href="/tomter"
              className="inline-flex items-center gap-2 text-tomtly-accent font-medium hover:underline"
            >
              Se tilgjengelige tomter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
