'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import {
  ArrowLeft,
  FileSearch,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Filter,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type SakStatus = 'under_behandling' | 'godkjent' | 'avslått' | 'trukket'
type VaarStatus = 'ny' | 'kontaktet' | 'interessert' | 'kunde' | 'avslått'

interface Delesak {
  id: string
  saksnr: string
  adresse: string
  kommune: string
  soker: string
  sak_status: SakStatus
  vaar_status: VaarStatus
  dato: string
  notater: string
  detaljer: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const KOMMUNER = [
  'Alle kommuner',
  'Oslo',
  'Asker',
  'Bærum',
  'Nordre Follo',
  'Nesodden',
  'Frogn',
  'Moss',
  'Fredrikstad',
  'Sarpsborg',
  'Halden',
  'Råde',
  'Indre Østfold',
  'Våler',
  'Vestby',
]

const SAK_STATUS_OPTIONS: SakStatus[] = ['under_behandling', 'godkjent', 'avslått', 'trukket']
const VAAR_STATUS_OPTIONS: VaarStatus[] = ['ny', 'kontaktet', 'interessert', 'kunde', 'avslått']

const SAK_STATUS_LABELS: Record<SakStatus, string> = {
  under_behandling: 'Under behandling',
  godkjent: 'Godkjent',
  avslått: 'Avslått',
  trukket: 'Trukket',
}

const SAK_STATUS_COLORS: Record<SakStatus, string> = {
  under_behandling: 'bg-yellow-100 text-yellow-800',
  godkjent: 'bg-green-100 text-green-800',
  avslått: 'bg-red-100 text-red-800',
  trukket: 'bg-gray-100 text-gray-600',
}

const VAAR_STATUS_COLORS: Record<VaarStatus, string> = {
  ny: 'bg-blue-100 text-blue-800',
  kontaktet: 'bg-yellow-100 text-yellow-800',
  interessert: 'bg-purple-100 text-purple-800',
  kunde: 'bg-green-100 text-green-800',
  avslått: 'bg-gray-100 text-gray-600',
}

// ─── Demo data ───────────────────────────────────────────────────────────────

const DEMO_DELESAKER: Delesak[] = [
  {
    id: '1',
    saksnr: '2026/1234',
    adresse: 'Osloveien 45',
    kommune: 'Asker',
    soker: 'Lars Pedersen',
    sak_status: 'godkjent',
    vaar_status: 'ny',
    dato: '2026-03-10',
    notater: '',
    detaljer: 'Fradeling av 650 m² fra eksisterende eneboligtomt. Regulert til bolig.',
  },
  {
    id: '2',
    saksnr: '2026/1198',
    adresse: 'Fjordgata 12',
    kommune: 'Bærum',
    soker: 'Mette Strand',
    sak_status: 'under_behandling',
    vaar_status: 'kontaktet',
    dato: '2026-03-05',
    notater: 'Ringt 07.03. Trenger hjelp med dokumentasjon.',
    detaljer: 'Søknad om fradeling av 480 m². Nabo har kommet med innsigelse.',
  },
  {
    id: '3',
    saksnr: '2026/1087',
    adresse: 'Storgata 89',
    kommune: 'Nesodden',
    soker: 'Tom Nilsen',
    sak_status: 'godkjent',
    vaar_status: 'interessert',
    dato: '2026-02-28',
    notater: 'Ønsker mulighetsstudie. Sender tilbud.',
    detaljer: 'Fradeling godkjent. 720 m² tomt, regulert til bolig, flatt terreng.',
  },
  {
    id: '4',
    saksnr: '2026/0956',
    adresse: 'Parkveien 3',
    kommune: 'Nordre Follo',
    soker: 'Inger Bakke',
    sak_status: 'under_behandling',
    vaar_status: 'ny',
    dato: '2026-02-20',
    notater: '',
    detaljer: 'Fradeling av 550 m² i etablert villastrøk.',
  },
]

// ─── Pitch templates ─────────────────────────────────────────────────────────

const GODKJENT_PITCH = `Hei [navn]!

Gratulerer med godkjent fradeling i [kommune]! Det er en flott mulighet du har fått.

Nå som fradelingen er i boks, er neste steg å selge tomten. Vi i Tomtly kan hjelpe deg med det.

Vi lager en profesjonell mulighetsstudie som viser kjøpere hva som kan bygges på tomten – med husmodeller, visualiseringer og byggekalkyle. Erfaringsmessig gir dette raskere salg og bedre pris.

Pakken koster 4 900 kr og inkluderer:
✓ Mulighetsstudie fra arkitekt
✓ Visualisering med reelle husmodeller
✓ Byggekostnadskalkyle
✓ Publisering på Tomtly.no

Vi har allerede hjulpet flere i [kommune]-området. Skal vi ta en prat?

Vennlig hilsen
Tomtly-teamet
tomtly.no | hey@nops.no | +47 40603908`

const PÅGÅENDE_PITCH = `Hei [navn]!

Vi ser at du har en pågående fradelingssøknad i [kommune]. Spennende prosjekt!

Vi i Tomtly har erfaring med fradelingsprosesser og kan hjelpe deg med:
✓ Dokumentasjon og kartunderlag
✓ Mulighetsstudie som støtter søknaden
✓ Vurdering av utbyggingspotensial
✓ Markedsføring og salg når fradelingen er godkjent

Vi tilbyr en gratis og uforpliktende vurdering av ditt prosjekt. Kunne du tenke deg å høre mer?

Vennlig hilsen
Tomtly-teamet
tomtly.no | hey@nops.no | +47 40603908`

// ─── Helper ──────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border border-brand-200 bg-white hover:bg-brand-50 transition-colors">
      {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Kopiert!' : 'Kopier'}
    </button>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function DelesakerPage() {
  const [delesaker, setDelesaker] = useState<Delesak[]>([])
  const [dataLoading, setDataLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filterKommune, setFilterKommune] = useState('Alle kommuner')
  const [showGodkjentPitch, setShowGodkjentPitch] = useState(false)
  const [showPågåendePitch, setShowPågåendePitch] = useState(false)
  const [scraperLoading, setScraperLoading] = useState(false)
  const [scraperResult, setScraperResult] = useState<string | null>(null)

  const supabase = createClient()

  const fetchData = useCallback(async () => {
    setDataLoading(true)
    const { data } = await supabase
      .from('delesaker')
      .select('*')
      .order('dato', { ascending: false })
    if (data) {
      setDelesaker(data)
    }
    setDataLoading(false)
  }, [])

  const runScraper = async () => {
    setScraperLoading(true)
    setScraperResult(null)
    try {
      const res = await fetch('/api/admin/scrape-delesaker', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        setScraperResult(`Søkte ${data.sokeord} termer, fant ${data.funnet} treff, lagret ${data.lagret} nye${data.duplikater_hoppet_over ? `, ${data.duplikater_hoppet_over} duplikater` : ''}`)
        fetchData()
      } else {
        setScraperResult(`Feil: ${data.error || 'Ukjent feil'}`)
      }
    } catch (err) {
      setScraperResult('Feil: Kunne ikke kontakte scraper-API')
    } finally {
      setScraperLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleVaarStatusChange = async (id: string, status: VaarStatus) => {
    await supabase.from('delesaker').update({ vaar_status: status }).eq('id', id)
    setDelesaker(prev => prev.map(d => d.id === id ? { ...d, vaar_status: status } : d))
  }

  const handleNotesChange = async (id: string, notes: string) => {
    await supabase.from('delesaker').update({ notater: notes }).eq('id', id)
    setDelesaker(prev => prev.map(d => d.id === id ? { ...d, notater: notes } : d))
  }

  const filtered = filterKommune === 'Alle kommuner'
    ? delesaker
    : delesaker.filter(d => d.kommune === filterKommune)

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-tomtly-dark text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-1 hover:bg-white/10 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="font-display text-lg font-bold">Delesaker fra kommunale postlister</h1>
              <p className="text-xs text-brand-400">Overvåk fradelingssaker i utvalgte kommuner</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Scraper buttons */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <button
            onClick={runScraper}
            disabled={scraperLoading}
            className="px-4 py-2 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {scraperLoading ? 'Søker i postlister...' : 'Søk i postlister (eInnsyn + OpenGov + PBE)'}
          </button>
          <button
            onClick={async () => {
              setScraperLoading(true)
              setScraperResult(null)
              try {
                const res = await fetch('/api/admin/scrape-elements', { method: 'POST' })
                const data = await res.json()
                if (data.success) {
                  setScraperResult(`Elements: ${data.lagret} nye fra ${data.kommuner_scraped?.join(', ')}`)
                  fetchData()
                } else {
                  setScraperResult(data.error || 'Feil')
                }
              } catch { setScraperResult('Feil ved Elements-scraping') }
              finally { setScraperLoading(false) }
            }}
            disabled={scraperLoading}
            className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Elements Publikum (37 kommuner)
          </button>
          {scraperResult && (
            <span className="text-sm text-brand-600 bg-brand-100 px-3 py-1.5 rounded-lg max-w-xl truncate">{scraperResult}</span>
          )}
        </div>

        {/* Info banner */}
        {delesaker.length === 0 && !dataLoading && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-800">
              <strong>Ingen data ennå.</strong> Klikk «Søk i postlister» for eInnsyn/OpenGov/PBE, eller «Elements Publikum» for 37 kommuner (krever lokal kjøring for alle: <code className="bg-amber-100 px-1 rounded">node scripts/scrape-elements.mjs</code>).
            </p>
          </div>
        )}
        {dataLoading && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800">Henter data...</p>
          </div>
        )}

        {/* Filter bar */}
        <div className="bg-white rounded-xl border border-brand-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-medium text-brand-500">Kommune:</span>
            <select
              value={filterKommune}
              onChange={e => setFilterKommune(e.target.value)}
              className="px-3 py-1.5 text-sm border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              {KOMMUNER.map(k => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <span className="text-xs text-brand-400 ml-auto">{filtered.length} saker</span>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-brand-200 p-4">
            <p className="text-2xl font-bold text-tomtly-dark">{filtered.length}</p>
            <p className="text-xs text-brand-500">Totalt saker</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 p-4">
            <p className="text-2xl font-bold text-green-700">{filtered.filter(d => d.sak_status === 'godkjent').length}</p>
            <p className="text-xs text-brand-500">Godkjente</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 p-4">
            <p className="text-2xl font-bold text-yellow-700">{filtered.filter(d => d.sak_status === 'under_behandling').length}</p>
            <p className="text-xs text-brand-500">Under behandling</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 p-4">
            <p className="text-2xl font-bold text-purple-700">{filtered.filter(d => d.vaar_status === 'interessert' || d.vaar_status === 'kunde').length}</p>
            <p className="text-xs text-brand-500">Interesserte / kunder</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-4 py-3 font-medium">Saksnr</th>
                  <th className="text-left px-4 py-3 font-medium">Adresse</th>
                  <th className="text-left px-4 py-3 font-medium">Kommune</th>
                  <th className="text-left px-4 py-3 font-medium">Søker</th>
                  <th className="text-left px-4 py-3 font-medium">Sak-status</th>
                  <th className="text-left px-4 py-3 font-medium">Vår status</th>
                  <th className="text-left px-4 py-3 font-medium">Dato</th>
                  <th className="text-right px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(sak => {
                  const isExpanded = expandedId === sak.id
                  return (
                    <>
                      <tr
                        key={sak.id}
                        className="border-t border-brand-100 hover:bg-brand-50 transition-colors cursor-pointer"
                        onClick={() => setExpandedId(isExpanded ? null : sak.id)}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-brand-600">{sak.saksnr}</td>
                        <td className="px-4 py-3 font-medium text-tomtly-dark">{sak.adresse}</td>
                        <td className="px-4 py-3 text-brand-600">{sak.kommune}</td>
                        <td className="px-4 py-3 text-brand-600">{sak.soker}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${SAK_STATUS_COLORS[sak.sak_status]}`}>
                            {SAK_STATUS_LABELS[sak.sak_status]}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${VAAR_STATUS_COLORS[sak.vaar_status]}`}>
                            {sak.vaar_status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-brand-500 text-xs">{new Date(sak.dato).toLocaleDateString('nb-NO')}</td>
                        <td className="px-4 py-3 text-right">
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
                        </td>
                      </tr>
                      {isExpanded && (
                        <ExpandedRow
                          key={`exp-${sak.id}`}
                          sak={sak}
                          onVaarStatusChange={handleVaarStatusChange}
                          onNotesChange={handleNotesChange}
                        />
                      )}
                    </>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 bg-brand-50 border-t border-brand-200 text-xs text-brand-500">
            Viser {filtered.length} delesaker
          </div>
        </div>

        {/* Pitch templates */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
            <button
              onClick={() => { setShowGodkjentPitch(!showGodkjentPitch); setShowPågåendePitch(false) }}
              className="w-full flex items-center justify-between p-4 hover:bg-brand-50 transition-colors"
            >
              <h3 className="font-semibold text-tomtly-dark">Pitch-mal: Godkjente fradelingssaker</h3>
              {showGodkjentPitch ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
            </button>
            {showGodkjentPitch && (
              <div className="p-4 border-t border-brand-200">
                <div className="flex justify-end mb-2">
                  <CopyButton text={GODKJENT_PITCH} />
                </div>
                <pre className="text-xs text-brand-700 whitespace-pre-wrap font-sans leading-relaxed bg-brand-50 rounded-lg p-4 border border-brand-100">
                  {GODKJENT_PITCH}
                </pre>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
            <button
              onClick={() => { setShowPågåendePitch(!showPågåendePitch); setShowGodkjentPitch(false) }}
              className="w-full flex items-center justify-between p-4 hover:bg-brand-50 transition-colors"
            >
              <h3 className="font-semibold text-tomtly-dark">Pitch-mal: Pågående søknader</h3>
              {showPågåendePitch ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
            </button>
            {showPågåendePitch && (
              <div className="p-4 border-t border-brand-200">
                <div className="flex justify-end mb-2">
                  <CopyButton text={PÅGÅENDE_PITCH} />
                </div>
                <pre className="text-xs text-brand-700 whitespace-pre-wrap font-sans leading-relaxed bg-brand-50 rounded-lg p-4 border border-brand-100">
                  {PÅGÅENDE_PITCH}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Expanded row ────────────────────────────────────────────────────────────

function ExpandedRow({
  sak,
  onVaarStatusChange,
  onNotesChange,
}: {
  sak: Delesak
  onVaarStatusChange: (id: string, status: VaarStatus) => void
  onNotesChange: (id: string, notes: string) => void
}) {
  const [notes, setNotes] = useState(sak.notater)

  return (
    <tr>
      <td colSpan={8} className="bg-brand-50 px-6 py-4 border-t border-brand-100">
        {/* Details */}
        <div className="mb-4">
          <p className="text-xs text-brand-500 mb-1">Detaljer</p>
          <p className="text-sm text-brand-700 bg-white rounded-lg p-3 border border-brand-100">{sak.detaljer}</p>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-xs text-brand-500 mb-1">Notater</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            onBlur={() => { if (notes !== sak.notater) onNotesChange(sak.id, notes) }}
            className="w-full h-20 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
            placeholder="Legg til notater..."
          />
        </div>

        {/* Status change */}
        <div>
          <label className="block text-xs text-brand-500 mb-1">Endre vår status</label>
          <div className="flex flex-wrap gap-2">
            {VAAR_STATUS_OPTIONS.map(s => (
              <button
                key={s}
                onClick={() => onVaarStatusChange(sak.id, s)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border capitalize transition-colors ${
                  sak.vaar_status === s
                    ? VAAR_STATUS_COLORS[s] + ' border-transparent ring-2 ring-offset-1 ring-brand-300'
                    : 'bg-white border-brand-200 text-brand-500 hover:bg-brand-50'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </td>
    </tr>
  )
}
