'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import {
  ArrowLeft,
  Scissors,
  MapPin,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Search,
  Layers,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type TabType = 'kartverket' | 'kandidater'

type KartverketStatus = 'ny' | 'kontaktet' | 'interessert' | 'kunde' | 'avslått'
type KandidatStatus = 'identifisert' | 'kontaktet' | 'vurdering' | 'søknad' | 'godkjent' | 'salg' | 'solgt'

interface KartverketEntry {
  id: string
  matrikkelenhet: string
  adresse: string
  kommune: string
  storrelse_m2: number | null
  eier: string
  dato: string
  status: KartverketStatus
  notater: string
}

interface FradelingsKandidat {
  id: string
  adresse: string
  total_areal: number
  bebygd_areal: number
  ledig_areal: number
  regulering: string
  estimert_verdi: number | null
  eier: string
  status: KandidatStatus
  notater: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const KARTVERKET_STATUS_OPTIONS: KartverketStatus[] = ['ny', 'kontaktet', 'interessert', 'kunde', 'avslått']
const KANDIDAT_STATUS_OPTIONS: KandidatStatus[] = ['identifisert', 'kontaktet', 'vurdering', 'søknad', 'godkjent', 'salg', 'solgt']

const STATUS_COLORS: Record<string, string> = {
  ny: 'bg-blue-100 text-blue-800',
  kontaktet: 'bg-yellow-100 text-yellow-800',
  interessert: 'bg-purple-100 text-purple-800',
  kunde: 'bg-green-100 text-green-800',
  avslått: 'bg-gray-100 text-gray-600',
  identifisert: 'bg-blue-100 text-blue-800',
  vurdering: 'bg-orange-100 text-orange-800',
  'søknad': 'bg-indigo-100 text-indigo-800',
  godkjent: 'bg-emerald-100 text-emerald-800',
  salg: 'bg-teal-100 text-teal-800',
  solgt: 'bg-green-100 text-green-800',
}

// ─── Demo data ───────────────────────────────────────────────────────────────

const DEMO_KARTVERKET: KartverketEntry[] = [
  {
    id: '1',
    matrikkelenhet: '0216-45/123',
    adresse: 'Ekebergveien 12',
    kommune: 'Nesodden',
    storrelse_m2: 450,
    eier: 'Per Olsen',
    dato: '2026-03-14',
    status: 'ny',
    notater: '',
  },
  {
    id: '2',
    matrikkelenhet: '0216-32/87',
    adresse: 'Fjordveien 8',
    kommune: 'Frogn',
    storrelse_m2: 620,
    eier: 'Anne Berg',
    dato: '2026-03-12',
    status: 'kontaktet',
    notater: 'Ringt 13.03. Interessert i verdivurdering.',
  },
]

const DEMO_KANDIDATER: FradelingsKandidat[] = [
  {
    id: '1',
    adresse: 'Solveien 45, Nesodden',
    total_areal: 2400,
    bebygd_areal: 180,
    ledig_areal: 2220,
    regulering: 'Bolig',
    estimert_verdi: 3500000,
    eier: 'Gunnar Johansen',
    status: 'identifisert',
    notater: '',
  },
  {
    id: '2',
    adresse: 'Strandveien 120, Asker',
    total_areal: 3100,
    bebygd_areal: 220,
    ledig_areal: 2880,
    regulering: 'Bolig',
    estimert_verdi: 5200000,
    eier: 'Liv Andersen',
    status: 'kontaktet',
    notater: 'Ringt 10.03. Skal tenke på det. Følge opp om 1 uke.',
  },
  {
    id: '3',
    adresse: 'Hagaveien 3, Bærum',
    total_areal: 1800,
    bebygd_areal: 150,
    ledig_areal: 1650,
    regulering: 'Bolig',
    estimert_verdi: 4800000,
    eier: 'Erik Svendsen',
    status: 'vurdering',
    notater: 'Arkitekt ser på reguleringsplan.',
  },
]

// ─── Pitch templates ─────────────────────────────────────────────────────────

const KARTVERKET_PITCH = `Hei [navn]!

Gratulerer med fradelingen! Vi ser at du nylig har fått fradelt en tomt i [kommune].

Vi driver Tomtly.no – en plattform som hjelper tomteeiere med å selge tomter raskere og til bedre pris. Vi lager en profesjonell mulighetsstudie som viser kjøpere hva som kan bygges på tomten, med husmodeller, byggekalkyle og visualiseringer.

Kort fortalt: vi gjør tomten din mer attraktiv og lettere å selge.

Pakken koster 4 900 kr og inkluderer:
✓ Mulighetsstudie fra arkitekt
✓ Visualisering med reelle husmodeller
✓ Byggekostnadskalkyle
✓ Publisering på Tomtly.no

Har du 5 minutter til en prat? Vi hjelper gjerne!

Vennlig hilsen
Tomtly-teamet
tomtly.no | hey@nops.no | +47 40603908`

const KANDIDAT_PITCH = `Hei [navn]!

Vi har sett på eiendommen din i [adresse] og ser at du har en stor tomt på [total_areal] m², der det kan være mulighet for fradeling.

Visste du at en fradelt tomt i ditt område typisk selges for [estimert_verdi]? Det betyr at du kan sitte på en skjult verdi uten å måtte selge huset ditt.

Vi i Tomtly hjelper grunneiere med hele prosessen:
✓ Vurdering av fradelingspotensial
✓ Reguleringssjekk og mulighetsstudie
✓ Søknadsprosess mot kommunen
✓ Salg av den fradelte tomten

Helt uforpliktende – vi starter med en gratis vurdering.

Kunne du tenke deg å høre mer?

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

export default function FradelingerPage() {
  const [activeTab, setActiveTab] = useState<TabType>('kartverket')
  const [kartverketEntries, setKartverketEntries] = useState<KartverketEntry[]>(DEMO_KARTVERKET)
  const [kandidater, setKandidater] = useState<FradelingsKandidat[]>(DEMO_KANDIDATER)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showPitch, setShowPitch] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    async function fetchKandidater() {
      const { data } = await supabase
        .from('fradelingskandidater')
        .select('*')
        .order('created_at', { ascending: false })
      if (data && data.length > 0) {
        setKandidater(data)
      }
    }
    fetchKandidater()
  }, [])

  const handleKartverketStatusChange = (id: string, status: KartverketStatus) => {
    setKartverketEntries(prev => prev.map(e => e.id === id ? { ...e, status } : e))
  }

  const handleKandidatStatusChange = async (id: string, status: KandidatStatus) => {
    await supabase.from('fradelingskandidater').update({ status }).eq('id', id)
    setKandidater(prev => prev.map(k => k.id === id ? { ...k, status } : k))
  }

  const fmt = (n: number) => n.toLocaleString('nb-NO')

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
              <h1 className="font-display text-lg font-bold">Fradelinger</h1>
              <p className="text-xs text-brand-400">Nye fradelinger fra Kartverket og fradelingskandidater</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-brand-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => { setActiveTab('kartverket'); setExpandedId(null) }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'kartverket' ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500 hover:text-brand-700'
            }`}
          >
            <Scissors className="w-4 h-4" />
            Nye fradelinger (Kartverket)
          </button>
          <button
            onClick={() => { setActiveTab('kandidater'); setExpandedId(null) }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'kandidater' ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500 hover:text-brand-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            Fradelingskandidater (store tomter)
          </button>
        </div>

        {/* ─── Tab 1: Kartverket ──────────────────────────────────────────── */}
        {activeTab === 'kartverket' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <strong>Datakilde:</strong> Nye fradelinger registrert i Kartverkets matrikkel. Kartverket-integrasjon settes opp separat.
                Tabellen under viser demo-data.
              </p>
            </div>

            {/* Pipeline stats */}
            <div className="grid grid-cols-5 gap-3">
              {KARTVERKET_STATUS_OPTIONS.map(s => {
                const count = kartverketEntries.filter(e => e.status === s).length
                return (
                  <div key={s} className={`rounded-lg p-3 text-center ${STATUS_COLORS[s]}`}>
                    <p className="text-lg font-bold">{count}</p>
                    <p className="text-xs capitalize">{s}</p>
                  </div>
                )
              })}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3 font-medium">Matrikkelenhet</th>
                      <th className="text-left px-4 py-3 font-medium">Adresse</th>
                      <th className="text-left px-4 py-3 font-medium">Kommune</th>
                      <th className="text-right px-4 py-3 font-medium">Størrelse</th>
                      <th className="text-left px-4 py-3 font-medium">Eier</th>
                      <th className="text-left px-4 py-3 font-medium">Dato</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-right px-4 py-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {kartverketEntries.map(entry => {
                      const isExpanded = expandedId === `k-${entry.id}`
                      return (
                        <>
                          <tr
                            key={entry.id}
                            className="border-t border-brand-100 hover:bg-brand-50 transition-colors cursor-pointer"
                            onClick={() => setExpandedId(isExpanded ? null : `k-${entry.id}`)}
                          >
                            <td className="px-4 py-3 font-mono text-xs text-brand-600">{entry.matrikkelenhet}</td>
                            <td className="px-4 py-3 font-medium text-tomtly-dark">{entry.adresse}</td>
                            <td className="px-4 py-3 text-brand-600">{entry.kommune}</td>
                            <td className="px-4 py-3 text-right text-brand-600">{entry.storrelse_m2 ? `${fmt(entry.storrelse_m2)} m²` : '–'}</td>
                            <td className="px-4 py-3 text-brand-600">{entry.eier}</td>
                            <td className="px-4 py-3 text-brand-500 text-xs">{new Date(entry.dato).toLocaleDateString('nb-NO')}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${STATUS_COLORS[entry.status]}`}>
                                {entry.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr key={`exp-${entry.id}`}>
                              <td colSpan={8} className="bg-brand-50 px-6 py-4 border-t border-brand-100">
                                <div className="mb-3">
                                  <label className="block text-xs text-brand-500 mb-1">Notater</label>
                                  <textarea
                                    defaultValue={entry.notater}
                                    onBlur={e => setKartverketEntries(prev => prev.map(en => en.id === entry.id ? { ...en, notater: e.target.value } : en))}
                                    className="w-full h-20 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                                    placeholder="Legg til notater..."
                                  />
                                </div>
                                <div className="mb-3">
                                  <label className="block text-xs text-brand-500 mb-1">Endre status</label>
                                  <div className="flex flex-wrap gap-2">
                                    {KARTVERKET_STATUS_OPTIONS.map(s => (
                                      <button
                                        key={s}
                                        onClick={() => handleKartverketStatusChange(entry.id, s)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full border capitalize transition-colors ${
                                          entry.status === s
                                            ? STATUS_COLORS[s] + ' border-transparent ring-2 ring-offset-1 ring-brand-300'
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
                          )}
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Auto-pitch template */}
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <button
                onClick={() => setShowPitch(!showPitch)}
                className="w-full flex items-center justify-between p-4 hover:bg-brand-50 transition-colors"
              >
                <h3 className="font-semibold text-tomtly-dark">Auto-pitch mal for nye fradelinger</h3>
                {showPitch ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
              </button>
              {showPitch && (
                <div className="p-4 border-t border-brand-200">
                  <div className="flex justify-end mb-2">
                    <CopyButton text={KARTVERKET_PITCH} />
                  </div>
                  <pre className="text-xs text-brand-700 whitespace-pre-wrap font-sans leading-relaxed bg-brand-50 rounded-lg p-4 border border-brand-100">
                    {KARTVERKET_PITCH}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Tab 2: Fradelingskandidater ────────────────────────────────── */}
        {activeTab === 'kandidater' && (
          <div className="space-y-4">
            {/* Pipeline stats */}
            <div className="grid grid-cols-7 gap-2">
              {KANDIDAT_STATUS_OPTIONS.map(s => {
                const count = kandidater.filter(k => k.status === s).length
                return (
                  <div key={s} className={`rounded-lg p-2 text-center ${STATUS_COLORS[s]}`}>
                    <p className="text-lg font-bold">{count}</p>
                    <p className="text-[10px] capitalize">{s}</p>
                  </div>
                )
              })}
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                      <th className="text-left px-4 py-3 font-medium">Adresse</th>
                      <th className="text-right px-4 py-3 font-medium">Total areal</th>
                      <th className="text-right px-4 py-3 font-medium">Bebygd</th>
                      <th className="text-right px-4 py-3 font-medium">Ledig</th>
                      <th className="text-left px-4 py-3 font-medium">Regulering</th>
                      <th className="text-right px-4 py-3 font-medium">Est. verdi</th>
                      <th className="text-left px-4 py-3 font-medium">Eier</th>
                      <th className="text-left px-4 py-3 font-medium">Status</th>
                      <th className="text-right px-4 py-3 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {kandidater.map(k => {
                      const isExpanded = expandedId === `c-${k.id}`
                      return (
                        <>
                          <tr
                            key={k.id}
                            className="border-t border-brand-100 hover:bg-brand-50 transition-colors cursor-pointer"
                            onClick={() => setExpandedId(isExpanded ? null : `c-${k.id}`)}
                          >
                            <td className="px-4 py-3 font-medium text-tomtly-dark">{k.adresse}</td>
                            <td className="px-4 py-3 text-right text-brand-600">{fmt(k.total_areal)} m²</td>
                            <td className="px-4 py-3 text-right text-brand-600">{fmt(k.bebygd_areal)} m²</td>
                            <td className="px-4 py-3 text-right font-medium text-green-700">{fmt(k.ledig_areal)} m²</td>
                            <td className="px-4 py-3 text-brand-600">{k.regulering}</td>
                            <td className="px-4 py-3 text-right text-brand-600">{k.estimert_verdi ? `${fmt(k.estimert_verdi)} kr` : '–'}</td>
                            <td className="px-4 py-3 text-brand-600">{k.eier}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${STATUS_COLORS[k.status]}`}>
                                {k.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right">
                              {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr key={`exp-${k.id}`}>
                              <td colSpan={9} className="bg-brand-50 px-6 py-4 border-t border-brand-100">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                  <div>
                                    <p className="text-[10px] text-brand-400 uppercase">Utnyttelsesgrad</p>
                                    <p className="text-sm font-medium text-tomtly-dark">{Math.round((k.bebygd_areal / k.total_areal) * 100)}%</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-brand-400 uppercase">Ledig potensial</p>
                                    <p className="text-sm font-medium text-green-700">{Math.round((k.ledig_areal / k.total_areal) * 100)}%</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] text-brand-400 uppercase">Pris per m² (ledig)</p>
                                    <p className="text-sm font-medium text-tomtly-dark">
                                      {k.estimert_verdi && k.ledig_areal ? `${fmt(Math.round(k.estimert_verdi / k.ledig_areal))} kr` : '–'}
                                    </p>
                                  </div>
                                </div>

                                <div className="mb-3">
                                  <label className="block text-xs text-brand-500 mb-1">Notater</label>
                                  <textarea
                                    defaultValue={k.notater}
                                    onBlur={e => setKandidater(prev => prev.map(kk => kk.id === k.id ? { ...kk, notater: e.target.value } : kk))}
                                    className="w-full h-20 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                                    placeholder="Legg til notater..."
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs text-brand-500 mb-1">Endre status</label>
                                  <div className="flex flex-wrap gap-2">
                                    {KANDIDAT_STATUS_OPTIONS.map(s => (
                                      <button
                                        key={s}
                                        onClick={() => handleKandidatStatusChange(k.id, s)}
                                        className={`px-3 py-1.5 text-xs font-medium rounded-full border capitalize transition-colors ${
                                          k.status === s
                                            ? STATUS_COLORS[s] + ' border-transparent ring-2 ring-offset-1 ring-brand-300'
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
                          )}
                        </>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pitch template for property owners */}
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <button
                onClick={() => setShowPitch(!showPitch)}
                className="w-full flex items-center justify-between p-4 hover:bg-brand-50 transition-colors"
              >
                <h3 className="font-semibold text-tomtly-dark">Pitch-mal for grunneiere med store tomter</h3>
                {showPitch ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
              </button>
              {showPitch && (
                <div className="p-4 border-t border-brand-200">
                  <div className="flex justify-end mb-2">
                    <CopyButton text={KANDIDAT_PITCH} />
                  </div>
                  <pre className="text-xs text-brand-700 whitespace-pre-wrap font-sans leading-relaxed bg-brand-50 rounded-lg p-4 border border-brand-100">
                    {KANDIDAT_PITCH}
                  </pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
