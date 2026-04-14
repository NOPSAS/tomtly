'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Search, MapPin, Phone, CheckCircle2, Loader2, Home, Wallet, Eye, ArrowRight } from 'lucide-react'
import { formatNOK, formatM2 } from '@/lib/utils'
import { ALLE_KOMMUNER } from '@/lib/kommuner'
import { ALLE_TOMTER as TOMTER } from '@/lib/tomter-data'

// ============================================================
// TOMTLISTE + TOMTESØK – Søk tomt
// ============================================================

const KOMMUNER_LISTE = ALLE_KOMMUNER

const KOMMUNER = [...new Set(TOMTER.map((t) => t.kommune))]
const TYPER = [...new Set(TOMTER.map((t) => t.type))]

type SortOption = 'pris_asc' | 'pris_desc' | 'areal_desc'

export default function TomtListeSide() {
  const [search, setSearch] = useState('')
  const [kommune, setKommune] = useState('')
  const [type, setType] = useState('')
  const [sort, setSort] = useState<SortOption>('pris_asc')

  const filtered = useMemo(() => {
    let result = TOMTER

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        (t) =>
          t.adresse.toLowerCase().includes(q) ||
          t.poststed.toLowerCase().includes(q) ||
          t.kommune.toLowerCase().includes(q)
      )
    }

    if (kommune) {
      result = result.filter((t) => t.kommune === kommune)
    }

    if (type) {
      result = result.filter((t) => t.type === type)
    }

    result = [...result].sort((a, b) => {
      switch (sort) {
        case 'pris_asc': return a.pris - b.pris
        case 'pris_desc': return b.pris - a.pris
        case 'areal_desc': return b.areal_m2 - a.areal_m2
        default: return 0
      }
    })

    return result
  }, [search, kommune, type, sort])

  return (
    <div className="bg-brand-50 min-h-screen">
      {/* Header med to kolonner: tomter + tomtesøk CTA */}
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl font-bold text-tomtly-dark mb-1">
                Søk tomt
              </h1>
              <p className="text-brand-600">
                Vi finner tomter som ikke ligger på Finn.no – og analyserer om de er byggbare
              </p>
            </div>
            <a href="#tomtesok" className="inline-flex items-center gap-3 px-5 py-3.5 bg-tomtly-dark text-white rounded-xl hover:bg-tomtly-dark/90 transition-colors group shrink-0">
              <div>
                <p className="text-sm font-semibold">Usikker på hva du har råd til?</p>
                <p className="text-xs text-brand-400">Vi regner på tomt + hus for ditt budsjett</p>
              </div>
              <ArrowRight className="w-4 h-4 text-brand-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
              <input
                type="text"
                placeholder="Søk på adresse, kommune..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
              />
            </div>

            <select
              value={kommune}
              onChange={(e) => setKommune(e.target.value)}
              className="px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700"
            >
              <option value="">Alle kommuner</option>
              {KOMMUNER.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700"
            >
              <option value="">Alle typer</option>
              {TYPER.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-700"
            >
              <option value="pris_asc">Pris (lavest)</option>
              <option value="pris_desc">Pris (høyest)</option>
              <option value="areal_desc">Areal (størst)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-brand-400">Ingen tomter matcher filteret ditt.</p>
            <button
              onClick={() => { setSearch(''); setKommune(''); setType('') }}
              className="mt-3 text-sm text-tomtly-accent hover:underline"
            >
              Nullstill filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <Link
                key={t.id}
                href={`/tomter/${t.id}`}
                className="group bg-white border border-brand-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className={`aspect-[4/3] bg-brand-100 relative ${(t as any).solgt ? 'opacity-80' : ''}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.bilde} alt={t.adresse} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  {(t as any).solgt && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full -rotate-6 shadow-lg">
                      SOLGT
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-brand-800">
                      {t.type}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-tomtly-dark group-hover:text-tomtly-accent transition-colors">
                    {t.adresse}
                  </h3>
                  <p className="text-sm text-brand-500">{t.poststed}, {t.kommune}</p>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-100">
                    <span className="text-sm text-brand-600">{formatM2(t.areal_m2)}</span>
                    <span className="font-semibold text-tomtly-dark">{formatNOK(t.pris)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ── Tomtesøk – hovedseksjon ── */}
      <TomteSokUtvidet />
    </div>
  )
}


// ============================================================
// UTVIDET TOMTESØK – budsjett, husstil, fradeling
// ============================================================

function TomteSokUtvidet() {
  const [navn, setNavn] = useState('')
  const [kommuneQuery, setKommuneQuery] = useState('')
  const [kommune, setKommune] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [omrade, setOmrade] = useState('')
  const [budsjettType, setBudsjettType] = useState<'tomt' | 'bolig'>('bolig')
  const [budsjett, setBudsjett] = useState('')
  const [husstil, setHusstil] = useState('')
  const [fritekst, setFritekst] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  const filteredKommuner = useMemo(() => {
    if (!kommuneQuery.trim()) return []
    const q = kommuneQuery.toLowerCase()
    return KOMMUNER_LISTE.filter(k => k.toLowerCase().includes(q)).slice(0, 8)
  }, [kommuneQuery])

  function selectKommune(k: string) {
    setKommune(k)
    setKommuneQuery(k)
    setShowDropdown(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!navn || !kommune || !epost || !telefon) return
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tomtesok-lead',
          navn,
          epost,
          telefon,
          melding: fritekst || '',
          ekstra: {
            kommune,
            omrade: omrade || 'Hele kommunen',
            budsjettType,
            budsjett: budsjett || 'Ikke oppgitt',
            husstil: husstil || 'Ikke oppgitt',
          },
        }),
      })
      setSendt(true)
    } catch {
      setSendt(true)
    } finally {
      setSender(false)
    }
  }

  if (sendt) {
    return (
      <section className="bg-tomtly-dark py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-green-400" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white mb-2">Vi leter for deg!</h3>
          <p className="text-brand-300 mb-4">
            Du får beskjed på <span className="font-semibold text-white">{epost}</span> når vi finner tomter i {kommune}{omrade ? ` (${omrade})` : ''}.
          </p>
          <p className="text-sm text-brand-400">
            Vi søker gjennom tomter til salgs, og identifiserer eiendommer som kan fradeles i ditt område. Finner vi en mulighet, kontakter vi tomteeier for deg.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="tomtesok" className="bg-tomtly-dark py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-5">
            <Search className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">Finner du ikke drømmetomten?</span>
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Vi finner tomten – og regner på hva du kan bygge
          </h2>
          <p className="text-brand-300 max-w-2xl mx-auto leading-relaxed">
            Har du null erfaring med bygging? Det er helt normalt. Fortell oss budsjettet ditt, så regner vi ut hva du kan bruke på tomt og hva du faktisk får bygd for resten – med konkrete husmodeller og priser. Du slipper å lure på om det er innenfor budsjettet.
          </p>
        </div>

        {/* USP-er */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="w-10 h-10 bg-tomtly-accent/20 rounded-lg flex items-center justify-center mb-3">
              <Eye className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-1.5 text-sm">Vi finner tomter for deg</h3>
            <p className="text-xs text-brand-400 leading-relaxed">
              Vi søker gjennom FINN, kommunale sakssystemer og matrikkeldata daglig. Finner vi en tomt som passer, gir vi deg beskjed umiddelbart.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="w-10 h-10 bg-tomtly-accent/20 rounded-lg flex items-center justify-center mb-3">
              <Wallet className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-1.5 text-sm">Vi regner på hva ting koster</h3>
            <p className="text-xs text-brand-400 leading-relaxed">
              Vet du ikke hva grunnarbeid, hus og kommunale gebyrer koster? Det ordner vi. Du får et komplett kostnadsoverslag, så du vet hva du har råd til.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="w-10 h-10 bg-tomtly-accent/20 rounded-lg flex items-center justify-center mb-3">
              <Home className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="font-semibold text-white mb-1.5 text-sm">Du ser hva du får bygd</h3>
            <p className="text-xs text-brand-400 leading-relaxed">
              Oppgi totalbudsjettet ditt, så viser vi deg hvilke husmodeller som passer – med priser, plantegninger og kalkyle. Du vet nøyaktig hvor langt du kan strekke deg på tomtepris.
            </p>
          </div>
        </div>

        {/* Skjema */}
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-6 md:p-8 space-y-5">
          <h3 className="text-lg font-semibold text-white mb-1">Fortell oss hva du ser etter</h3>
          <p className="text-sm text-brand-400 mb-4">Jo mer du forteller oss, jo bedre treff kan vi levere.</p>

          {/* Navn */}
          <div>
            <label className="block text-sm font-medium text-brand-300 mb-1.5">Navn *</label>
            <input
              type="text"
              value={navn}
              onChange={e => setNavn(e.target.value)}
              placeholder="Ditt fulle navn"
              required
              className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-sm placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Kommune */}
            <div className="relative">
              <label className="block text-sm font-medium text-brand-300 mb-1.5">Kommune *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                <input
                  type="text"
                  value={kommuneQuery}
                  onChange={e => {
                    setKommuneQuery(e.target.value)
                    setKommune('')
                    setShowDropdown(true)
                  }}
                  onFocus={() => kommuneQuery && setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                  placeholder="Søk etter kommune..."
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-sm placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                />
              </div>
              {showDropdown && filteredKommuner.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-tomtly-dark border border-white/20 rounded-lg shadow-lg overflow-hidden max-h-48 overflow-y-auto">
                  {filteredKommuner.map(k => (
                    <button
                      key={k}
                      type="button"
                      onMouseDown={() => selectKommune(k)}
                      className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                      {k}
                    </button>
                  ))}
                </div>
              )}
              {kommuneQuery && !kommune && !showDropdown && (
                <p className="text-xs text-red-400 mt-1">Velg en kommune fra listen</p>
              )}
            </div>

            {/* Område */}
            <div>
              <label className="block text-sm font-medium text-brand-300 mb-1.5">Område i kommunen</label>
              <input
                type="text"
                value={omrade}
                onChange={e => setOmrade(e.target.value)}
                placeholder="F.eks. Bjørnemyr, Tangen, Bekkestua..."
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-sm placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
              />
            </div>
          </div>

          {/* Budsjett */}
          <div>
            <label className="block text-sm font-medium text-brand-300 mb-1.5">Budsjett</label>
            <div className="flex gap-2 mb-2">
              <button
                type="button"
                onClick={() => setBudsjettType('bolig')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${budsjettType === 'bolig' ? 'bg-tomtly-accent text-white' : 'bg-white/10 text-brand-400 hover:text-white'}`}
              >
                Totalbudsjett på alt
              </button>
              <button
                type="button"
                onClick={() => setBudsjettType('tomt')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${budsjettType === 'tomt' ? 'bg-tomtly-accent text-white' : 'bg-white/10 text-brand-400 hover:text-white'}`}
              >
                Kun tomtebudsjett
              </button>
            </div>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
              <input
                type="text"
                value={budsjett}
                onChange={e => setBudsjett(e.target.value)}
                placeholder={budsjettType === 'bolig' ? 'F.eks. 8 000 000 kr' : 'F.eks. 3 000 000 kr'}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-sm placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
              />
            </div>
            {budsjettType === 'bolig' && (
              <p className="text-[11px] text-brand-500 mt-1.5">
                Vi regner ut hva du kan bruke på tomt, hva huset koster, grunnarbeid, kommunale gebyrer og alt annet – slik at du vet nøyaktig hvor langt du kan strekke deg.
              </p>
            )}
          </div>

          {/* Husstil */}
          <div>
            <label className="block text-sm font-medium text-brand-300 mb-1.5">Hva slags bolig ser du for deg?</label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {['Moderne/funkis', 'Tradisjonell', 'Kompakt/effektiv', 'Minihus', 'Vet ikke ennå'].map(stil => (
                <button
                  key={stil}
                  type="button"
                  onClick={() => setHusstil(husstil === stil ? '' : stil)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-colors border ${husstil === stil ? 'bg-tomtly-accent border-tomtly-accent text-white' : 'bg-white/5 border-white/15 text-brand-400 hover:text-white hover:border-white/30'}`}
                >
                  {stil}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* E-post */}
            <div>
              <label className="block text-sm font-medium text-brand-300 mb-1.5">E-post *</label>
              <input
                type="email"
                value={epost}
                onChange={e => setEpost(e.target.value)}
                placeholder="din@epost.no"
                required
                className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-sm placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
              />
            </div>

            {/* Telefon */}
            <div>
              <label className="block text-sm font-medium text-brand-300 mb-1.5">Telefon *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                <input
                  type="tel"
                  value={telefon}
                  onChange={e => setTelefon(e.target.value)}
                  placeholder="Ditt telefonnummer"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-sm placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                />
              </div>
            </div>
          </div>

          {/* Fritekst */}
          <div>
            <label className="block text-sm font-medium text-brand-300 mb-1.5">Fortell oss mer (valgfritt)</label>
            <textarea
              value={fritekst}
              onChange={e => setFritekst(e.target.value)}
              placeholder="F.eks. «Vi er en familie på 4 som ser etter tomt med sjøutsikt på vestsiden av Nesodden. Ønsker å bygge moderne hus på 120–150 m². Har fleksibelt budsjett.»"
              rows={3}
              className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white text-sm placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={sender || !navn || !kommune || !epost || !telefon}
            className="w-full py-4 bg-tomtly-accent hover:bg-forest-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-base"
          >
            {sender ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registrerer...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Finn tomten min
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-xs text-brand-500 text-center">
            Gratis og uforpliktende. Du kan melde deg av når som helst.
          </p>
        </form>
      </div>
    </section>
  )
}
