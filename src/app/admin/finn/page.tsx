'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import {
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  MapPin,
  Clock,
  TrendingUp,
  AlertTriangle,
  Copy,
  Mail,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  Search,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FinnTomt {
  id: string
  finn_kode: string
  finn_url: string
  type: 'tomt' | 'fritidstomt'
  adresse: string | null
  kommune: string | null
  fylke: string | null
  tomtestørrelse_m2: number | null
  prisantydning: number | null
  publiseringsdato: string | null
  megler_firma: string | null
  thumbnail_url: string | null
  status: string | null
  dager_paa_finn: number | null
  notater: string | null
  status_historikk: Array<{ status: string; dato: string }> | null
  sist_oppdatert: string | null
  created_at: string
}

interface DagligOppsummering {
  id: string
  dato: string
  nye_tomter: number
  total_aktive: number
  tomter_60_pluss: number | null
  prisendringer: number | null
  fjernet: number | null
}

type Status = 'ny' | 'kontaktet' | 'interessert' | 'kunde' | 'avslått'
type TabType = 'alle' | 'prioritert' | 'oppsummering'
type DagerFilter = 'alle' | '30' | '60' | '90' | '120'

const STATUS_OPTIONS: Status[] = ['ny', 'kontaktet', 'interessert', 'kunde', 'avslått']

const STATUS_COLORS: Record<string, string> = {
  ny: 'bg-blue-100 text-blue-800',
  kontaktet: 'bg-yellow-100 text-yellow-800',
  interessert: 'bg-purple-100 text-purple-800',
  kunde: 'bg-green-100 text-green-800',
  avslått: 'bg-gray-100 text-gray-600',
}

// ─── Pitch templates ─────────────────────────────────────────────────────────

function ownerPitch(tomt: FinnTomt): string {
  const størrelse = tomt.tomtestørrelse_m2 ? `${tomt.tomtestørrelse_m2.toLocaleString('nb-NO')}` : '[størrelse]'
  const kommune = tomt.kommune || '[kommune]'
  return `Hei!

Jeg så at du har en tomt på ${størrelse} m² i ${kommune} ute for salg. Flott beliggenhet!

Vi driver Tomtly.no – en plattform som hjelper tomteeiere med å vise kjøpere hva som faktisk kan bygges på tomten. Vi lager en profesjonell mulighetsstudie med husmodeller, byggekalkyle og visualiseringer, slik at kjøpere ser et ferdig prosjekt – ikke bare en tomt.

Kort fortalt: vi gjør tomten din mer attraktiv og lettere å selge.

Det koster 4 900 kr, og du får:
✓ Mulighetsstudie fra arkitekt
✓ Visualisering med reelle husmodeller
✓ Byggekostnadskalkyle
✓ Publisering på Tomtly.no

Har du 5 minutter til en prat? Jeg forteller gjerne mer.

Vennlig hilsen
Tomtly-teamet
Tomtly.no | hey@nops.no | +47 40603908`
}

function meglerPitch(tomt: FinnTomt): string {
  const kommune = tomt.kommune || '[kommune]'
  const størrelse = tomt.tomtestørrelse_m2 ? `${tomt.tomtestørrelse_m2.toLocaleString('nb-NO')} m²` : '[størrelse] m²'
  const pris = tomt.prisantydning ? `${tomt.prisantydning.toLocaleString('nb-NO')} kr` : '[pris] kr'
  return `Hei!

Jeg ser du har en tomt i ${kommune} (${størrelse}, ${pris}) som har ligget ute en stund. Kjenner du til Tomtly.no?

Vi er en plattform som gjør tomter enklere å selge ved å lage profesjonelle mulighetsstudier – med husmodeller, byggekalkyle og visualiseringer. Kjøpere ser et ferdig byggeprosjekt, ikke bare en gresslette.

For meglere er Tomtly helt gratis. Du legger til tomten, vi lager mulighetsstudien, og du beholder provisjonen din. Tenk på det som en ekstra markedsføringskanal som gjør tomten din mer attraktiv.

Kan jeg sende deg et eksempel på en mulighetsstudie vi har laget?

Vennlig hilsen
Tomtly-teamet
Tomtly.no | hey@nops.no | +47 40603908`
}

// ─── Helper components ───────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: string | number; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${accent ? 'bg-amber-50 border-amber-200' : 'bg-white border-brand-200'}`}>
      <Icon className={`w-5 h-5 mb-2 ${accent ? 'text-amber-500' : 'text-brand-400'}`} />
      <p className="text-2xl font-bold text-tomtly-dark">{value}</p>
      <p className="text-xs text-brand-500">{label}</p>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-brand-200 bg-white hover:bg-brand-50 transition-colors"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Kopiert!' : 'Kopier'}
    </button>
  )
}

// ─── Detail panel ────────────────────────────────────────────────────────────

function DetailPanel({
  tomt,
  onClose,
  onStatusChange,
  onNotesChange,
}: {
  tomt: FinnTomt
  onClose: () => void
  onStatusChange: (id: string, status: Status) => void
  onNotesChange: (id: string, notes: string) => void
}) {
  const [showOwnerPitch, setShowOwnerPitch] = useState(false)
  const [showMeglerPitch, setShowMeglerPitch] = useState(false)
  const [notes, setNotes] = useState(tomt.notater || '')

  const handleNotesBlur = () => {
    if (notes !== (tomt.notater || '')) {
      onNotesChange(tomt.id, notes)
    }
  }

  const emailSubject = encodeURIComponent(`Tomtly – mulighetsstudie for tomt i ${tomt.kommune || 'din kommune'}`)
  const emailBody = encodeURIComponent(tomt.megler_firma ? meglerPitch(tomt) : ownerPitch(tomt))

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
      <div className="w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-tomtly-dark text-white px-6 py-4 flex items-center justify-between z-10">
          <h2 className="font-display font-bold text-lg truncate">{tomt.adresse || `FINN ${tomt.finn_kode}`}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="FINN-kode" value={tomt.finn_kode} />
            <InfoItem label="Type" value={tomt.type === 'tomt' ? 'Tomt' : 'Fritidstomt'} />
            <InfoItem label="Kommune" value={tomt.kommune || '–'} />
            <InfoItem label="Fylke" value={tomt.fylke || '–'} />
            <InfoItem label="Størrelse" value={tomt.tomtestørrelse_m2 ? `${tomt.tomtestørrelse_m2.toLocaleString('nb-NO')} m²` : '–'} />
            <InfoItem label="Prisantydning" value={tomt.prisantydning ? `${tomt.prisantydning.toLocaleString('nb-NO')} kr` : '–'} />
            <InfoItem label="Dager på FINN" value={tomt.dager_paa_finn != null ? String(tomt.dager_paa_finn) : '–'} />
            <InfoItem label="Megler" value={tomt.megler_firma || '–'} />
            <InfoItem label="Publisert" value={tomt.publiseringsdato || '–'} />
            <InfoItem label="Sist oppdatert" value={tomt.sist_oppdatert ? new Date(tomt.sist_oppdatert).toLocaleDateString('nb-NO') : '–'} />
          </div>

          {/* Thumbnail */}
          {tomt.thumbnail_url && (
            <div>
              <p className="text-xs text-brand-500 mb-1">Bilde</p>
              <img src={tomt.thumbnail_url} alt="Tomt" className="rounded-lg border border-brand-200 w-full max-h-48 object-cover" />
            </div>
          )}

          {/* Status selector */}
          <div>
            <p className="text-xs text-brand-500 mb-1">Status</p>
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => onStatusChange(tomt.id, s)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors capitalize ${
                    (tomt.status || 'ny') === s
                      ? STATUS_COLORS[s] + ' border-transparent ring-2 ring-offset-1 ring-brand-300'
                      : 'bg-white border-brand-200 text-brand-500 hover:bg-brand-50'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Status history */}
          {tomt.status_historikk && tomt.status_historikk.length > 0 && (
            <div>
              <p className="text-xs text-brand-500 mb-2">Statushistorikk</p>
              <div className="space-y-1">
                {tomt.status_historikk.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className="w-2 h-2 rounded-full bg-brand-300" />
                    <span className="capitalize font-medium text-brand-700">{h.status}</span>
                    <span className="text-brand-400">{new Date(h.dato).toLocaleDateString('nb-NO')}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <p className="text-xs text-brand-500 mb-1">Notater</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleNotesBlur}
              placeholder="Skriv notater her..."
              className="w-full h-24 px-3 py-2 text-sm border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
            />
          </div>

          {/* Pitch buttons */}
          <div className="space-y-3">
            <button
              onClick={() => { setShowOwnerPitch(!showOwnerPitch); setShowMeglerPitch(false) }}
              className="w-full flex items-center justify-between px-4 py-3 bg-brand-50 border border-brand-200 rounded-lg text-sm font-medium text-brand-700 hover:bg-brand-100 transition-colors"
            >
              Pitch til tomteeier
              {showOwnerPitch ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showOwnerPitch && (
              <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                <div className="flex justify-end mb-2">
                  <CopyButton text={ownerPitch(tomt)} />
                </div>
                <pre className="text-xs text-brand-700 whitespace-pre-wrap font-sans leading-relaxed">{ownerPitch(tomt)}</pre>
              </div>
            )}

            <button
              onClick={() => { setShowMeglerPitch(!showMeglerPitch); setShowOwnerPitch(false) }}
              className="w-full flex items-center justify-between px-4 py-3 bg-brand-50 border border-brand-200 rounded-lg text-sm font-medium text-brand-700 hover:bg-brand-100 transition-colors"
            >
              Pitch til megler
              {showMeglerPitch ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showMeglerPitch && (
              <div className="bg-brand-50 border border-brand-200 rounded-lg p-4">
                <div className="flex justify-end mb-2">
                  <CopyButton text={meglerPitch(tomt)} />
                </div>
                <pre className="text-xs text-brand-700 whitespace-pre-wrap font-sans leading-relaxed">{meglerPitch(tomt)}</pre>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={tomt.finn_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#06bffc] text-white rounded-lg text-sm font-medium hover:bg-[#05a8de] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Åpne på FINN
            </a>
            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              className="flex items-center gap-2 px-4 py-2 bg-brand-700 text-white rounded-lg text-sm font-medium hover:bg-brand-800 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Send e-post
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-brand-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-tomtly-dark">{value}</p>
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function FinnPipelinePage() {
  const [tomter, setTomter] = useState<FinnTomt[]>([])
  const [oppsummeringer, setOppsummeringer] = useState<DagligOppsummering[]>([])
  const [loading, setLoading] = useState(true)
  const [scraping, setScraping] = useState(false)
  const [scrapeResult, setScrapeResult] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<TabType>('alle')
  const [selectedTomt, setSelectedTomt] = useState<FinnTomt | null>(null)

  // Filters
  const [filterType, setFilterType] = useState<'alle' | 'tomt' | 'fritidstomt'>('alle')
  const [filterDager, setFilterDager] = useState<DagerFilter>('alle')
  const [filterKommune, setFilterKommune] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('alle')
  const [filterMegler, setFilterMegler] = useState<'alle' | 'ja' | 'nei'>('alle')

  const supabase = createClient()

  const fetchData = useCallback(async () => {
    setLoading(true)
    const [tomterRes, oppsumRes] = await Promise.all([
      supabase.from('finn_tomter').select('*').order('created_at', { ascending: false }),
      supabase.from('finn_daglig_oppsummering').select('*').order('dato', { ascending: false }).limit(30),
    ])
    setTomter(tomterRes.data || [])
    setOppsummeringer(oppsumRes.data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleScrape = async () => {
    setScraping(true)
    setScrapeResult(null)
    try {
      const res = await fetch('/api/admin/scrape-finn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxAds: 30 }),
      })
      const data = await res.json()
      if (data.success) {
        setScrapeResult(`Ferdig! ${data.nye} nye, ${data.oppdatert} oppdatert, ${data.totalt_funnet} totalt funnet`)
        fetchData()
      } else {
        setScrapeResult(`Feil: ${data.error}`)
      }
    } catch {
      setScrapeResult('Nettverksfeil under scraping')
    }
    setScraping(false)
  }

  const handleStatusChange = async (id: string, newStatus: Status) => {
    const tomt = tomter.find(t => t.id === id)
    if (!tomt) return

    const historikk = [...(tomt.status_historikk || []), { status: newStatus, dato: new Date().toISOString() }]

    await supabase
      .from('finn_tomter')
      .update({ status: newStatus, status_historikk: historikk })
      .eq('id', id)

    setTomter(prev => prev.map(t => t.id === id ? { ...t, status: newStatus, status_historikk: historikk } : t))
    if (selectedTomt?.id === id) {
      setSelectedTomt(prev => prev ? { ...prev, status: newStatus, status_historikk: historikk } : null)
    }
  }

  const handleNotesChange = async (id: string, notes: string) => {
    await supabase.from('finn_tomter').update({ notater: notes }).eq('id', id)
    setTomter(prev => prev.map(t => t.id === id ? { ...t, notater: notes } : t))
    if (selectedTomt?.id === id) {
      setSelectedTomt(prev => prev ? { ...prev, notater: notes } : null)
    }
  }

  // ─── Computed data ───────────────────────────────────────────────────────

  const now = new Date()
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

  const totalAktive = tomter.length
  const nyeSiste24t = tomter.filter(t => new Date(t.created_at) > yesterday).length
  const over60dager = tomter.filter(t => (t.dager_paa_finn || 0) >= 60).length
  const prisendringer = 0 // TODO: track price changes

  // Apply filters
  const applyFilters = (list: FinnTomt[]) => {
    let filtered = list
    if (filterType !== 'alle') filtered = filtered.filter(t => t.type === filterType)
    if (filterDager !== 'alle') filtered = filtered.filter(t => (t.dager_paa_finn || 0) >= parseInt(filterDager))
    if (filterKommune.trim()) filtered = filtered.filter(t => t.kommune?.toLowerCase().includes(filterKommune.toLowerCase()))
    if (filterStatus !== 'alle') filtered = filtered.filter(t => (t.status || 'ny') === filterStatus)
    if (filterMegler === 'ja') filtered = filtered.filter(t => t.megler_firma)
    if (filterMegler === 'nei') filtered = filtered.filter(t => !t.megler_firma)
    return filtered
  }

  const filteredTomter = applyFilters(tomter)
  const prioritertTomter = applyFilters(
    tomter.filter(t => (t.dager_paa_finn || 0) >= 60)
  ).sort((a, b) => (b.dager_paa_finn || 0) - (a.dager_paa_finn || 0))

  // ─── Render ──────────────────────────────────────────────────────────────

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
              <h1 className="font-display text-lg font-bold">FINN Tomte-pipeline</h1>
              <p className="text-xs text-brand-400">Scraper og salgsverktøy for FINN.no tomter</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {scrapeResult && (
              <span className="text-xs bg-white/10 px-3 py-1.5 rounded-lg">{scrapeResult}</span>
            )}
            <button
              onClick={handleScrape}
              disabled={scraping}
              className="flex items-center gap-2 px-4 py-2 bg-[#06bffc] text-white rounded-lg text-sm font-medium hover:bg-[#05a8de] disabled:opacity-50 transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${scraping ? 'animate-spin' : ''}`} />
              {scraping ? 'Scraper...' : 'Kjør scraper nå'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={MapPin} label="Totalt aktive" value={totalAktive} />
          <StatCard icon={TrendingUp} label="Nye siste 24t" value={nyeSiste24t} />
          <StatCard icon={AlertTriangle} label="60+ dager" value={over60dager} accent={over60dager > 0} />
          <StatCard icon={Clock} label="Prisendringer" value={prisendringer} />
        </div>

        {/* Filter bar */}
        <div className="bg-white rounded-xl border border-brand-200 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Search className="w-4 h-4 text-brand-400" />
              <span className="text-xs font-medium text-brand-500">Filtrer:</span>
            </div>

            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value as any)}
              className="px-3 py-1.5 text-xs border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="alle">Alle typer</option>
              <option value="tomt">Tomt</option>
              <option value="fritidstomt">Fritidstomt</option>
            </select>

            <select
              value={filterDager}
              onChange={e => setFilterDager(e.target.value as DagerFilter)}
              className="px-3 py-1.5 text-xs border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="alle">Dager: alle</option>
              <option value="30">30+ dager</option>
              <option value="60">60+ dager</option>
              <option value="90">90+ dager</option>
              <option value="120">120+ dager</option>
            </select>

            <input
              type="text"
              value={filterKommune}
              onChange={e => setFilterKommune(e.target.value)}
              placeholder="Kommune..."
              className="px-3 py-1.5 text-xs border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 w-32"
            />

            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 text-xs border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="alle">Status: alle</option>
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s} className="capitalize">{s}</option>
              ))}
            </select>

            <select
              value={filterMegler}
              onChange={e => setFilterMegler(e.target.value as any)}
              className="px-3 py-1.5 text-xs border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="alle">Megler: alle</option>
              <option value="ja">Har megler</option>
              <option value="nei">Uten megler</option>
            </select>

            {(filterType !== 'alle' || filterDager !== 'alle' || filterKommune || filterStatus !== 'alle' || filterMegler !== 'alle') && (
              <button
                onClick={() => { setFilterType('alle'); setFilterDager('alle'); setFilterKommune(''); setFilterStatus('alle'); setFilterMegler('alle') }}
                className="px-3 py-1.5 text-xs text-red-600 hover:text-red-800 font-medium"
              >
                Nullstill
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-brand-100 rounded-lg p-1 w-fit">
          {([
            { key: 'alle', label: `Alle tomter (${filteredTomter.length})` },
            { key: 'prioritert', label: `60+ dager (${prioritertTomter.length})` },
            { key: 'oppsummering', label: 'Daglig oppsummering' },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === key ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500 hover:text-brand-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-xl border border-brand-200 p-16 text-center">
            <RefreshCw className="w-8 h-8 text-brand-300 animate-spin mx-auto mb-3" />
            <p className="text-brand-500">Laster data...</p>
          </div>
        ) : (
          <>
            {/* Alle tomter tab */}
            {activeTab === 'alle' && (
              <TomterTable
                tomter={filteredTomter}
                onSelect={setSelectedTomt}
                onStatusChange={handleStatusChange}
              />
            )}

            {/* Prioritert tab (60+ dager) */}
            {activeTab === 'prioritert' && (
              <div>
                {prioritertTomter.length === 0 ? (
                  <div className="bg-white rounded-xl border border-brand-200 p-12 text-center">
                    <AlertTriangle className="w-8 h-8 text-brand-300 mx-auto mb-3" />
                    <p className="text-brand-500">Ingen tomter med 60+ dager på FINN</p>
                  </div>
                ) : (
                  <div className="border-2 border-amber-300 rounded-xl overflow-hidden">
                    <TomterTable
                      tomter={prioritertTomter}
                      onSelect={setSelectedTomt}
                      onStatusChange={handleStatusChange}
                      highlight
                    />
                  </div>
                )}
              </div>
            )}

            {/* Daglig oppsummering tab */}
            {activeTab === 'oppsummering' && (
              <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
                <div className="p-4 border-b border-brand-200">
                  <h2 className="font-semibold text-tomtly-dark">Daglig oppsummering</h2>
                </div>
                {oppsummeringer.length === 0 ? (
                  <div className="p-12 text-center">
                    <Clock className="w-8 h-8 text-brand-300 mx-auto mb-3" />
                    <p className="text-brand-500">Ingen oppsummeringer ennå. Kjør scraperen for å generere data.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                          <th className="text-left px-4 py-3 font-medium">Dato</th>
                          <th className="text-right px-4 py-3 font-medium">Nye tomter</th>
                          <th className="text-right px-4 py-3 font-medium">60+ dager</th>
                          <th className="text-right px-4 py-3 font-medium">Prisendringer</th>
                          <th className="text-right px-4 py-3 font-medium">Fjernet</th>
                          <th className="text-right px-4 py-3 font-medium">Totalt aktive</th>
                        </tr>
                      </thead>
                      <tbody>
                        {oppsummeringer.map((o) => (
                          <tr key={o.id} className="border-t border-brand-100 hover:bg-brand-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-tomtly-dark">
                              {new Date(o.dato).toLocaleDateString('nb-NO', { weekday: 'short', day: 'numeric', month: 'short' })}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {o.nye_tomter > 0 ? (
                                <span className="text-green-700 font-medium">+{o.nye_tomter}</span>
                              ) : (
                                <span className="text-brand-400">0</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {o.tomter_60_pluss != null ? (
                                <span className={o.tomter_60_pluss > 0 ? 'text-amber-600 font-medium' : 'text-brand-400'}>
                                  {o.tomter_60_pluss}
                                </span>
                              ) : (
                                <span className="text-brand-300">–</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right text-brand-400">{o.prisendringer ?? '–'}</td>
                            <td className="px-4 py-3 text-right text-brand-400">{o.fjernet ?? '–'}</td>
                            <td className="px-4 py-3 text-right font-medium text-tomtly-dark">{o.total_aktive}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail panel */}
      {selectedTomt && (
        <DetailPanel
          tomt={selectedTomt}
          onClose={() => setSelectedTomt(null)}
          onStatusChange={handleStatusChange}
          onNotesChange={handleNotesChange}
        />
      )}
    </div>
  )
}

// ─── Tomter table ────────────────────────────────────────────────────────────

function TomterTable({
  tomter,
  onSelect,
  onStatusChange,
  highlight,
}: {
  tomter: FinnTomt[]
  onSelect: (tomt: FinnTomt) => void
  onStatusChange: (id: string, status: Status) => void
  highlight?: boolean
}) {
  if (tomter.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-brand-200 p-12 text-center">
        <MapPin className="w-8 h-8 text-brand-300 mx-auto mb-3" />
        <p className="text-brand-500">Ingen tomter funnet med gjeldende filtre</p>
      </div>
    )
  }

  return (
    <div className={`bg-white ${highlight ? '' : 'rounded-xl border border-brand-200'} overflow-hidden`}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
              <th className="text-left px-4 py-3 font-medium w-12"></th>
              <th className="text-left px-4 py-3 font-medium">Adresse</th>
              <th className="text-left px-4 py-3 font-medium">Kommune</th>
              <th className="text-right px-4 py-3 font-medium">Størrelse</th>
              <th className="text-right px-4 py-3 font-medium">Pris</th>
              <th className="text-right px-4 py-3 font-medium">Dager</th>
              <th className="text-left px-4 py-3 font-medium">Megler</th>
              <th className="text-left px-4 py-3 font-medium">Status</th>
              <th className="text-right px-4 py-3 font-medium">Handlinger</th>
            </tr>
          </thead>
          <tbody>
            {tomter.map((tomt) => {
              const dager = tomt.dager_paa_finn || 0
              const dagerClass = dager >= 120 ? 'text-red-600 font-bold' : dager >= 90 ? 'text-red-500 font-semibold' : dager >= 60 ? 'text-amber-600 font-medium' : 'text-brand-600'

              return (
                <tr
                  key={tomt.id}
                  className={`border-t border-brand-100 hover:bg-brand-50 transition-colors cursor-pointer ${
                    highlight && dager >= 90 ? 'bg-amber-50/50' : ''
                  }`}
                  onClick={() => onSelect(tomt)}
                >
                  {/* Thumbnail */}
                  <td className="px-4 py-3">
                    {tomt.thumbnail_url ? (
                      <img src={tomt.thumbnail_url} alt="" className="w-10 h-10 rounded object-cover" />
                    ) : (
                      <div className="w-10 h-10 rounded bg-brand-100 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-brand-300" />
                      </div>
                    )}
                  </td>

                  {/* Adresse */}
                  <td className="px-4 py-3">
                    <p className="font-medium text-tomtly-dark truncate max-w-[200px]">
                      {tomt.adresse || `FINN ${tomt.finn_kode}`}
                    </p>
                    <p className="text-[10px] text-brand-400">{tomt.type === 'tomt' ? 'Tomt' : 'Fritidstomt'}</p>
                  </td>

                  {/* Kommune */}
                  <td className="px-4 py-3 text-brand-600">{tomt.kommune || '–'}</td>

                  {/* Størrelse */}
                  <td className="px-4 py-3 text-right text-brand-600">
                    {tomt.tomtestørrelse_m2 ? `${tomt.tomtestørrelse_m2.toLocaleString('nb-NO')} m²` : '–'}
                  </td>

                  {/* Pris */}
                  <td className="px-4 py-3 text-right text-brand-600">
                    {tomt.prisantydning ? `${(tomt.prisantydning / 1000).toFixed(0)}k` : '–'}
                  </td>

                  {/* Dager på FINN */}
                  <td className={`px-4 py-3 text-right ${dagerClass}`}>
                    {dager > 0 ? dager : '–'}
                  </td>

                  {/* Megler */}
                  <td className="px-4 py-3 text-brand-600 truncate max-w-[120px]">
                    {tomt.megler_firma || '–'}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <select
                      value={tomt.status || 'ny'}
                      onChange={e => onStatusChange(tomt.id, e.target.value as Status)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-300 ${
                        STATUS_COLORS[tomt.status || 'ny'] || STATUS_COLORS.ny
                      }`}
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s} className="capitalize">{s}</option>
                      ))}
                    </select>
                  </td>

                  {/* Handlinger */}
                  <td className="px-4 py-3 text-right" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={tomt.finn_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 hover:bg-brand-100 rounded-lg transition-colors"
                        title="Åpne på FINN"
                      >
                        <ExternalLink className="w-4 h-4 text-brand-400" />
                      </a>
                      <button
                        onClick={() => onSelect(tomt)}
                        className="px-2.5 py-1 text-xs font-medium text-brand-600 bg-brand-50 border border-brand-200 rounded-lg hover:bg-brand-100 transition-colors"
                      >
                        Detaljer
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-brand-50 border-t border-brand-200 text-xs text-brand-500">
        Viser {tomter.length} tomter
      </div>
    </div>
  )
}
