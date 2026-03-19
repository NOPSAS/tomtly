'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import {
  ArrowLeft,
  DollarSign,
  Send,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Building2,
  Users,
  TrendingUp,
  FileText,
  Landmark,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface FinansEntry {
  id: string
  kjoper_navn: string
  kjoper_email: string
  kjoper_telefon: string
  tomt_adresse: string
  tomt_kommune: string
  husmodell: string
  totalprosjekt: number
  lanebehov: number
  egenkapital: number
  inntekt: number
  gjeld: number
  status: FinansStatus
  notater: string | null
  created_at: string
}

type FinansStatus = 'mottatt' | 'sendt_til_bank' | 'godkjent' | 'avslått'

const STATUS_OPTIONS: FinansStatus[] = ['mottatt', 'sendt_til_bank', 'godkjent', 'avslått']

const STATUS_LABELS: Record<FinansStatus, string> = {
  mottatt: 'Mottatt',
  sendt_til_bank: 'Sendt til bank',
  godkjent: 'Godkjent',
  avslått: 'Avslått',
}

const STATUS_COLORS: Record<FinansStatus, string> = {
  mottatt: 'bg-blue-100 text-blue-800',
  sendt_til_bank: 'bg-yellow-100 text-yellow-800',
  godkjent: 'bg-green-100 text-green-800',
  avslått: 'bg-red-100 text-red-800',
}

const STATUS_ICONS: Record<FinansStatus, any> = {
  mottatt: DollarSign,
  sendt_til_bank: Send,
  godkjent: CheckCircle,
  avslått: XCircle,
}

// ─── Demo data ───────────────────────────────────────────────────────────────

const DEMO_DATA: FinansEntry[] = [
  {
    id: '1',
    kjoper_navn: 'Ola Nordmann',
    kjoper_email: 'ola@example.com',
    kjoper_telefon: '99887766',
    tomt_adresse: 'Bjørnemyrveien 20',
    tomt_kommune: 'Nesodden',
    husmodell: 'Skogly',
    totalprosjekt: 5200000,
    lanebehov: 4200000,
    egenkapital: 1000000,
    inntekt: 850000,
    gjeld: 0,
    status: 'mottatt',
    notater: null,
    created_at: '2026-03-15T10:00:00Z',
  },
  {
    id: '2',
    kjoper_navn: 'Kari Hansen',
    kjoper_email: 'kari@example.com',
    kjoper_telefon: '98765432',
    tomt_adresse: 'Gamle Alværnvei 67',
    tomt_kommune: 'Nesodden',
    husmodell: 'Vindy',
    totalprosjekt: 6100000,
    lanebehov: 4800000,
    egenkapital: 1300000,
    inntekt: 1100000,
    gjeld: 200000,
    status: 'sendt_til_bank',
    notater: 'Sendt til DNB 12.03. Venter på svar.',
    created_at: '2026-03-10T14:00:00Z',
  },
]

// ─── Main page ───────────────────────────────────────────────────────────────

export default function FinansDashboard() {
  const [entries, setEntries] = useState<FinansEntry[]>(DEMO_DATA)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showBankPitch, setShowBankPitch] = useState(false)

  const supabase = createClient()

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('finansiering')
      .select('*')
      .order('created_at', { ascending: false })
    if (data && data.length > 0) {
      setEntries(data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleStatusChange = async (id: string, newStatus: FinansStatus) => {
    await supabase.from('finansiering').update({ status: newStatus }).eq('id', id)
    setEntries(prev => prev.map(e => e.id === id ? { ...e, status: newStatus } : e))
  }

  const handleNotesChange = async (id: string, notes: string) => {
    await supabase.from('finansiering').update({ notater: notes }).eq('id', id)
    setEntries(prev => prev.map(e => e.id === id ? { ...e, notater: notes } : e))
  }

  const fmt = (n: number) => n.toLocaleString('nb-NO') + ' kr'

  // Stats
  const totalt = entries.length
  const sendtTilBank = entries.filter(e => e.status === 'sendt_til_bank').length
  const godkjent = entries.filter(e => e.status === 'godkjent').length
  const avslaatt = entries.filter(e => e.status === 'avslått').length

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
              <h1 className="font-display text-lg font-bold">Finans Dashboard</h1>
              <p className="text-xs text-brand-400">Finansieringsforespørsler og bankpartnerskap</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard icon={DollarSign} label="Totalt forespørsler" value={totalt} />
          <StatCard icon={Send} label="Sendt til bank" value={sendtTilBank} />
          <StatCard icon={CheckCircle} label="Godkjent" value={godkjent} accent />
          <StatCard icon={XCircle} label="Avslått" value={avslaatt} />
        </div>

        {/* Entries table */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden mb-6">
          <div className="p-4 border-b border-brand-200 flex items-center justify-between">
            <h2 className="font-semibold text-tomtly-dark">Finansieringsforespørsler</h2>
            <span className="text-xs text-brand-400">{entries.length} totalt</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-brand-400">Laster...</div>
          ) : entries.length === 0 ? (
            <div className="p-12 text-center">
              <DollarSign className="w-8 h-8 text-brand-300 mx-auto mb-3" />
              <p className="text-brand-500">Ingen finansieringsforespørsler ennå</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                    <th className="text-left px-4 py-3 font-medium">Kjøper</th>
                    <th className="text-left px-4 py-3 font-medium">Tomt</th>
                    <th className="text-right px-4 py-3 font-medium">Totalprosjekt</th>
                    <th className="text-right px-4 py-3 font-medium">Lånebehov</th>
                    <th className="text-right px-4 py-3 font-medium">Egenkapital</th>
                    <th className="text-left px-4 py-3 font-medium">Status</th>
                    <th className="text-left px-4 py-3 font-medium">Dato</th>
                    <th className="text-right px-4 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map(entry => {
                    const isExpanded = expandedId === entry.id
                    return (
                      <TableRow
                        key={entry.id}
                        entry={entry}
                        isExpanded={isExpanded}
                        onToggle={() => setExpandedId(isExpanded ? null : entry.id)}
                        onStatusChange={handleStatusChange}
                        onNotesChange={handleNotesChange}
                        fmt={fmt}
                      />
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bank pitch section */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          <button
            onClick={() => setShowBankPitch(!showBankPitch)}
            className="w-full flex items-center justify-between p-4 hover:bg-brand-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Landmark className="w-5 h-5 text-tomtly-accent" />
              <h2 className="font-semibold text-tomtly-dark">Bankpartnerskap – intern pitch</h2>
            </div>
            {showBankPitch ? <ChevronUp className="w-5 h-5 text-brand-400" /> : <ChevronDown className="w-5 h-5 text-brand-400" />}
          </button>

          {showBankPitch && (
            <div className="p-6 border-t border-brand-200 space-y-6">
              <div className="bg-gradient-to-r from-tomtly-dark to-brand-800 rounded-xl p-6 text-white">
                <h3 className="font-display text-xl font-bold mb-2">Tomtly Finans</h3>
                <p className="text-brand-300 text-sm">Kvalifiserte byggelånskunder levert til din filial</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-brand-50 rounded-lg p-4 border border-brand-100">
                  <TrendingUp className="w-5 h-5 text-tomtly-accent mb-2" />
                  <h4 className="font-semibold text-sm text-tomtly-dark mb-1">Nøkkeltall</h4>
                  <ul className="text-xs text-brand-600 space-y-1">
                    <li>Snitt totalprosjekt: ~5,5M</li>
                    <li>Snitt egenkapital: ~20%</li>
                    <li>Snitt lånebehov: ~4,4M</li>
                    <li>Konverteringsrate: TBD</li>
                  </ul>
                </div>

                <div className="bg-brand-50 rounded-lg p-4 border border-brand-100">
                  <FileText className="w-5 h-5 text-tomtly-accent mb-2" />
                  <h4 className="font-semibold text-sm text-tomtly-dark mb-1">Eksempel-pakke</h4>
                  <ul className="text-xs text-brand-600 space-y-1">
                    <li>Tomt: 1 500 000 kr</li>
                    <li>Husmodell: Skogly (3 200 000 kr)</li>
                    <li>Infrastruktur: 400 000 kr</li>
                    <li>Totalt: 5 100 000 kr</li>
                    <li>Egenkapital: 1 020 000 kr (20%)</li>
                  </ul>
                </div>

                <div className="bg-brand-50 rounded-lg p-4 border border-brand-100">
                  <Building2 className="w-5 h-5 text-tomtly-accent mb-2" />
                  <h4 className="font-semibold text-sm text-tomtly-dark mb-1">Fordeler for banken</h4>
                  <ul className="text-xs text-brand-600 space-y-1">
                    <li>Pre-kvalifiserte kunder</li>
                    <li>Komplett prosjektdokumentasjon</li>
                    <li>Fast eiendom som sikkerhet</li>
                    <li>Stort lånevolum per kunde</li>
                    <li>Langsiktig kunderelasjon</li>
                  </ul>
                </div>
              </div>

              <div className="bg-brand-50 rounded-lg p-4 border border-brand-100">
                <h4 className="font-semibold text-sm text-tomtly-dark mb-2">Partnerskapsmodell</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-brand-600">
                  <div>
                    <p className="font-medium text-brand-700 mb-1">Hva Tomtly leverer:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Pre-kvalifisert kunde med dokumentasjon</li>
                      <li>Mulighetsstudie med kostnadsoverslag</li>
                      <li>Fullstendig prosjektbeskrivelse</li>
                      <li>Kontaktinfo og samtykke</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-brand-700 mb-1">Hva banken tilbyr:</p>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>Forenklet søknadsprosess</li>
                      <li>Rask behandling (SLA)</li>
                      <li>Konkurransedyktige betingelser</li>
                      <li>Provisjon til Tomtly per innvilget lån</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Table row component ─────────────────────────────────────────────────────

function TableRow({
  entry,
  isExpanded,
  onToggle,
  onStatusChange,
  onNotesChange,
  fmt,
}: {
  entry: FinansEntry
  isExpanded: boolean
  onToggle: () => void
  onStatusChange: (id: string, status: FinansStatus) => void
  onNotesChange: (id: string, notes: string) => void
  fmt: (n: number) => string
}) {
  const [notes, setNotes] = useState(entry.notater || '')

  return (
    <>
      <tr
        className="border-t border-brand-100 hover:bg-brand-50 transition-colors cursor-pointer"
        onClick={onToggle}
      >
        <td className="px-4 py-3 font-medium text-tomtly-dark">{entry.kjoper_navn}</td>
        <td className="px-4 py-3 text-brand-600">{entry.tomt_adresse}</td>
        <td className="px-4 py-3 text-right text-brand-600">{fmt(entry.totalprosjekt)}</td>
        <td className="px-4 py-3 text-right text-brand-600">{fmt(entry.lanebehov)}</td>
        <td className="px-4 py-3 text-right text-brand-600">{fmt(entry.egenkapital)}</td>
        <td className="px-4 py-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[entry.status]}`}>
            {STATUS_LABELS[entry.status]}
          </span>
        </td>
        <td className="px-4 py-3 text-brand-500 text-xs">{new Date(entry.created_at).toLocaleDateString('nb-NO')}</td>
        <td className="px-4 py-3 text-right">
          {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={8} className="bg-brand-50 px-6 py-4 border-t border-brand-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <InfoItem label="E-post" value={entry.kjoper_email} />
              <InfoItem label="Telefon" value={entry.kjoper_telefon} />
              <InfoItem label="Kommune" value={entry.tomt_kommune} />
              <InfoItem label="Husmodell" value={entry.husmodell} />
              <InfoItem label="Inntekt" value={fmt(entry.inntekt)} />
              <InfoItem label="Gjeld" value={fmt(entry.gjeld)} />
              <InfoItem label="Belåningsgrad" value={`${Math.round((entry.lanebehov / entry.totalprosjekt) * 100)}%`} />
              <InfoItem label="Gjeldsgrad" value={entry.inntekt > 0 ? `${((entry.lanebehov + entry.gjeld) / entry.inntekt).toFixed(1)}x` : '–'} />
            </div>

            <div className="mb-4">
              <label className="block text-xs text-brand-500 mb-1">Notater</label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                onBlur={() => { if (notes !== (entry.notater || '')) onNotesChange(entry.id, notes) }}
                className="w-full h-20 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                placeholder="Legg til notater..."
              />
            </div>

            <div>
              <label className="block text-xs text-brand-500 mb-1">Endre status</label>
              <div className="flex flex-wrap gap-2">
                {STATUS_OPTIONS.map(s => {
                  const Icon = STATUS_ICONS[s]
                  return (
                    <button
                      key={s}
                      onClick={() => onStatusChange(entry.id, s)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                        entry.status === s
                          ? STATUS_COLORS[s] + ' border-transparent ring-2 ring-offset-1 ring-brand-300'
                          : 'bg-white border-brand-200 text-brand-500 hover:bg-brand-50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {STATUS_LABELS[s]}
                    </button>
                  )
                })}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-brand-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-medium text-tomtly-dark">{value}</p>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, accent }: { icon: any; label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-5 ${accent ? 'bg-green-50 border-green-200' : 'bg-white border-brand-200'}`}>
      <Icon className={`w-5 h-5 mb-2 ${accent ? 'text-green-600' : 'text-brand-400'}`} />
      <p className="text-2xl font-bold text-tomtly-dark">{value}</p>
      <p className="text-xs text-brand-500">{label}</p>
    </div>
  )
}
