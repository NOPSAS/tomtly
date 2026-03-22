'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  MapPin,
  Ruler,
  Home,
  CheckCircle2,
  ArrowRight,
  Search,
  Mail,
  Users,
  Clock,
  BarChart3,
} from 'lucide-react'

const REGIONER = [
  'Oslo og omegn',
  'Follo',
  'Romerike',
  'Drammen og omegn',
  'Vestfold',
  'Østfold',
  'Bergen',
  'Stavanger',
  'Trondheim',
  'Annet',
]

const TOMTETYPER = ['Boligtomt', 'Fritidstomt', 'Næringstomt']

const BYGGEPLANER = [
  { value: 'enebolig', label: 'Enebolig' },
  { value: 'tomannsbolig', label: 'Tomannsbolig' },
  { value: 'rekkehus', label: 'Rekkehus' },
  { value: 'hytte', label: 'Hytte / fritidsbolig' },
  { value: 'vet-ikke', label: 'Vet ikke ennå' },
]

function formatNumber(n: number) {
  return n.toLocaleString('nb-NO')
}

function formatKr(n: number) {
  if (n >= 1_000_000) {
    const mill = n / 1_000_000
    return mill % 1 === 0 ? `${mill} mill kr` : `${mill.toFixed(1)} mill kr`
  }
  return formatNumber(n) + ' kr'
}

export default function TomtVarslingPage() {
  const [regioner, setRegioner] = useState<string[]>([])
  const [spesifiktSted, setSpesifiktSted] = useState('')
  const [minStorrelse, setMinStorrelse] = useState(400)
  const [maxStorrelse, setMaxStorrelse] = useState(2000)
  const [minPris, setMinPris] = useState(1_000_000)
  const [maxPris, setMaxPris] = useState(3_000_000)
  const [tomtetype, setTomtetype] = useState<string[]>([])
  const [byggeplan, setByggeplan] = useState('')
  const [navn, setNavn] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  function toggleRegion(r: string) {
    setRegioner((prev) =>
      prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r]
    )
  }

  function toggleTomtetype(t: string) {
    setTomtetype((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSender(true)
    try {
      const res = await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tomt-varsling',
          navn,
          email: epost,
          telefon,
          ekstra: {
            regioner,
            spesifikt_sted: spesifiktSted,
            min_storrelse: minStorrelse,
            max_storrelse: maxStorrelse,
            min_pris: minPris,
            max_pris: maxPris,
            tomtetype,
            byggeplan,
          },
        }),
      })
      if (!res.ok) throw new Error('Feil')
      setSendt(true)
    } catch {
      alert('Noe gikk galt. Prøv igjen.')
    }
    setSender(false)
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-tomtly-dark py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <Bell className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-white/80 font-medium">
                Tomtevarsel
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Få varsel når
              <br />
              <span className="text-green-400">drømmetomten dukker opp</span>
            </h1>

            <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
              Fortell oss hva du ser etter. Vi varsler deg når en matchende tomt
              blir tilgjengelig – helt gratis.
            </p>

            <a
              href="#registrering"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Registrer deg nå
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Stats / social proof */}
      <section className="bg-tomtly-warm py-12 border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-tomtly-accent/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-tomtly-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-tomtly-dark">340+</p>
                <p className="text-sm text-brand-600">
                  registrerte kjøperprofiler
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-tomtly-accent/10 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-tomtly-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-tomtly-dark">Daglig</p>
                <p className="text-sm text-brand-600">
                  sjekk via FINN.no, kommunale registre og direkte henvendelser
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-tomtly-accent/10 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-tomtly-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-tomtly-dark">
                  3 virkedager
                </p>
                <p className="text-sm text-brand-600">
                  gjennomsnittlig varseltid etter at tomt listes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="registrering" className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {sendt ? (
            <SuccessState />
          ) : (
            <>
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-tomtly-dark mb-4">
                  Registrer dine tomteønsker
                </h2>
                <p className="text-brand-600 max-w-lg mx-auto">
                  Fyll ut skjemaet under, så varsler vi deg når vi finner en
                  tomt som matcher. Det er helt gratis og uforpliktende.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Hvor vil du bo? */}
                <fieldset>
                  <legend className="flex items-center gap-2 text-lg font-semibold text-tomtly-dark mb-4">
                    <MapPin className="w-5 h-5 text-tomtly-accent" />
                    Hvor vil du bo?
                  </legend>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                    {REGIONER.map((r) => (
                      <label
                        key={r}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                          regioner.includes(r)
                            ? 'bg-tomtly-accent/10 border-tomtly-accent text-tomtly-accent'
                            : 'bg-white border-brand-200 text-brand-700 hover:border-brand-400'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={regioner.includes(r)}
                          onChange={() => toggleRegion(r)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                            regioner.includes(r)
                              ? 'bg-tomtly-accent border-tomtly-accent'
                              : 'border-brand-400'
                          }`}
                        >
                          {regioner.includes(r) && (
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm font-medium">{r}</span>
                      </label>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Spesifikt sted eller kommune (valgfritt)"
                    value={spesifiktSted}
                    onChange={(e) => setSpesifiktSted(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-brand-200 text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/40 focus:border-tomtly-accent"
                  />
                </fieldset>

                {/* Hva ser du etter? */}
                <fieldset>
                  <legend className="flex items-center gap-2 text-lg font-semibold text-tomtly-dark mb-4">
                    <Ruler className="w-5 h-5 text-tomtly-accent" />
                    Hva ser du etter?
                  </legend>

                  {/* Tomtestørrelse */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-brand-700 mb-2">
                      Tomtestørrelse
                    </label>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-brand-600 w-24 text-right">
                        {formatNumber(minStorrelse)} m²
                      </span>
                      <span className="text-sm text-brand-400">–</span>
                      <span className="text-sm text-brand-600 w-24">
                        {formatNumber(maxStorrelse)} m²
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-brand-500 mb-1 block">
                          Minimum
                        </label>
                        <input
                          type="range"
                          min={200}
                          max={5000}
                          step={50}
                          value={minStorrelse}
                          onChange={(e) => {
                            const v = Number(e.target.value)
                            setMinStorrelse(Math.min(v, maxStorrelse))
                          }}
                          className="w-full accent-tomtly-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-brand-500 mb-1 block">
                          Maksimum
                        </label>
                        <input
                          type="range"
                          min={200}
                          max={5000}
                          step={50}
                          value={maxStorrelse}
                          onChange={(e) => {
                            const v = Number(e.target.value)
                            setMaxStorrelse(Math.max(v, minStorrelse))
                          }}
                          className="w-full accent-tomtly-accent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Prisramme */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-brand-700 mb-2">
                      Prisramme
                    </label>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-brand-600 w-24 text-right">
                        {formatKr(minPris)}
                      </span>
                      <span className="text-sm text-brand-400">–</span>
                      <span className="text-sm text-brand-600 w-24">
                        {formatKr(maxPris)}
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-brand-500 mb-1 block">
                          Minimum
                        </label>
                        <input
                          type="range"
                          min={500_000}
                          max={5_000_000}
                          step={100_000}
                          value={minPris}
                          onChange={(e) => {
                            const v = Number(e.target.value)
                            setMinPris(Math.min(v, maxPris))
                          }}
                          className="w-full accent-tomtly-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-brand-500 mb-1 block">
                          Maksimum
                        </label>
                        <input
                          type="range"
                          min={500_000}
                          max={5_000_000}
                          step={100_000}
                          value={maxPris}
                          onChange={(e) => {
                            const v = Number(e.target.value)
                            setMaxPris(Math.max(v, minPris))
                          }}
                          className="w-full accent-tomtly-accent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tomtetype */}
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-2">
                      Tomtetype
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {TOMTETYPER.map((t) => (
                        <label
                          key={t}
                          className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                            tomtetype.includes(t)
                              ? 'bg-tomtly-accent/10 border-tomtly-accent text-tomtly-accent'
                              : 'bg-white border-brand-200 text-brand-700 hover:border-brand-400'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={tomtetype.includes(t)}
                            onChange={() => toggleTomtetype(t)}
                            className="sr-only"
                          />
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                              tomtetype.includes(t)
                                ? 'bg-tomtly-accent border-tomtly-accent'
                                : 'border-brand-400'
                            }`}
                          >
                            {tomtetype.includes(t) && (
                              <svg
                                className="w-2.5 h-2.5 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <span className="text-sm font-medium">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </fieldset>

                {/* Hva vil du bygge? */}
                <fieldset>
                  <legend className="flex items-center gap-2 text-lg font-semibold text-tomtly-dark mb-4">
                    <Home className="w-5 h-5 text-tomtly-accent" />
                    Hva vil du bygge?
                  </legend>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BYGGEPLANER.map((b) => (
                      <label
                        key={b.value}
                        className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                          byggeplan === b.value
                            ? 'bg-tomtly-accent/10 border-tomtly-accent text-tomtly-accent'
                            : 'bg-white border-brand-200 text-brand-700 hover:border-brand-400'
                        }`}
                      >
                        <input
                          type="radio"
                          name="byggeplan"
                          value={b.value}
                          checked={byggeplan === b.value}
                          onChange={() => setByggeplan(b.value)}
                          className="sr-only"
                        />
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                            byggeplan === b.value
                              ? 'border-tomtly-accent'
                              : 'border-brand-400'
                          }`}
                        >
                          {byggeplan === b.value && (
                            <div className="w-2 h-2 rounded-full bg-tomtly-accent" />
                          )}
                        </div>
                        <span className="text-sm font-medium">{b.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Kontaktinfo */}
                <fieldset>
                  <legend className="flex items-center gap-2 text-lg font-semibold text-tomtly-dark mb-4">
                    <Mail className="w-5 h-5 text-tomtly-accent" />
                    Kontaktinfo
                  </legend>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">
                        Navn <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={navn}
                        onChange={(e) => setNavn(e.target.value)}
                        placeholder="Ditt fulle navn"
                        className="w-full px-4 py-3 rounded-lg border border-brand-200 text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/40 focus:border-tomtly-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">
                        E-post <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={epost}
                        onChange={(e) => setEpost(e.target.value)}
                        placeholder="din@epost.no"
                        className="w-full px-4 py-3 rounded-lg border border-brand-200 text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/40 focus:border-tomtly-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">
                        Telefon{' '}
                        <span className="text-brand-400 font-normal">
                          (valgfritt)
                        </span>
                      </label>
                      <input
                        type="tel"
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                        placeholder="900 00 000"
                        className="w-full px-4 py-3 rounded-lg border border-brand-200 text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/40 focus:border-tomtly-accent"
                      />
                    </div>
                  </div>
                </fieldset>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sender}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-tomtly-accent text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  {sender ? (
                    'Registrerer...'
                  ) : (
                    <>
                      Registrer meg for tomtevarsel
                      <Bell className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-brand-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-tomtly-dark mb-4">
              Slik fungerer det
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                nummer: '01',
                ikon: Users,
                tittel: 'Du registrerer ønskene dine',
                beskrivelse:
                  'Fyll ut skjemaet over med dine preferanser – helt gratis og uforpliktende.',
              },
              {
                nummer: '02',
                ikon: Search,
                tittel: 'Vi scanner markedet daglig',
                beskrivelse:
                  'FINN, kommuner, fradelinger og direktesalg – vi holder øye med alt for deg.',
              },
              {
                nummer: '03',
                ikon: Bell,
                tittel: 'Du får varsel med ferdig analyse',
                beskrivelse:
                  'Når vi finner en match, sender vi deg en e-post med all relevant informasjon.',
              },
            ].map((steg) => (
              <div
                key={steg.nummer}
                className="relative bg-white rounded-xl p-6 border border-brand-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-tomtly-accent/10 rounded-lg flex items-center justify-center">
                    <steg.ikon className="w-5 h-5 text-tomtly-accent" />
                  </div>
                  <span className="text-xs font-mono text-brand-400 font-medium">
                    STEG {steg.nummer}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-tomtly-dark mb-2">
                  {steg.tittel}
                </h3>
                <p className="text-sm text-brand-600 leading-relaxed">
                  {steg.beskrivelse}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA bottom */}
      <section className="bg-tomtly-dark py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Har du allerede funnet en tomt?
          </h2>
          <p className="text-brand-400 mb-8 max-w-lg mx-auto">
            Bestill en komplett tomtanalyse og få full oversikt over hva du kan
            bygge, regulering, grunnforhold og verdivurdering.
          </p>
          <Link
            href="/for-tomteeiere"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Bestill tomtanalyse
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  )
}

function SuccessState() {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
      </div>
      <h2 className="font-display text-3xl font-bold text-tomtly-dark mb-3">
        Du er registrert for tomtevarsel!
      </h2>
      <p className="text-brand-600 mb-8 max-w-md mx-auto">
        Vi sender deg e-post når vi finner tomter som matcher dine ønsker.
      </p>
      <Link
        href="/tomter"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
      >
        Se tomter som er tilgjengelige nå
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}
