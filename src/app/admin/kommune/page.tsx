'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Globe,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  MapPin,
  Users,
  Handshake,
  Plus,
} from 'lucide-react'

interface KommuneKontakt {
  id: string
  type: string
  navn: string
  email: string
  telefon: string
  melding: string
  ekstra: Record<string, any> | null
  created_at: string
}

type Pipeline = 'ikke_kontaktet' | 'kontaktet' | 'pilot' | 'avtale' | 'aktiv'

const PIPELINE_STEPS: { key: Pipeline; label: string; color: string }[] = [
  { key: 'ikke_kontaktet', label: 'Ikke kontaktet', color: 'bg-gray-100 text-gray-700' },
  { key: 'kontaktet', label: 'Kontaktet', color: 'bg-blue-100 text-blue-700' },
  { key: 'pilot', label: 'Pilot', color: 'bg-yellow-100 text-yellow-700' },
  { key: 'avtale', label: 'Avtale', color: 'bg-purple-100 text-purple-700' },
  { key: 'aktiv', label: 'Aktiv', color: 'bg-green-100 text-green-700' },
]

function kommunePitch(kommune: string): string {
  return `Hei,

Vi tar kontakt fordi vi ønsker å samarbeide med ${kommune} kommune om salg av kommunale tomter.

Tomtly.no er en digital plattform som hjelper med å markedsføre og selge tomter mer effektivt. Vi lager profesjonelle mulighetsstudier med husmodeller, byggekalkyle og visualiseringer – slik at potensielle kjøpere ser et ferdig byggeprosjekt, ikke bare en tomt.

For kommuner tilbyr vi:
- Profesjonell presentasjon av kommunale tomter
- Mulighetsstudier med reelle husmodeller
- Digital markedsføring mot målgrupper
- Komplett byggekostnadskalkyle
- Kobling til entreprenører og banker

Vi ser at kommunale tomter ofte ligger lenger på markedet enn nødvendig. Med Tomtly kan dere redusere salgstiden og tiltrekke flere kjøpere.

Kan vi ta et kort møte for å vise dere et eksempel?

Med vennlig hilsen
Tomtly-teamet
tomtly.no | hey@nops.no | +47 40603908`
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-brand-200 bg-white hover:bg-brand-50 transition-colors">
      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Kopiert!' : 'Kopier'}
    </button>
  )
}

export default function KommunePage() {
  const [kontakter, setKontakter] = useState<KommuneKontakt[]>([])
  const [loading, setLoading] = useState(true)
  const [scrapeUrl, setScrapeUrl] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [pipelineOverrides, setPipelineOverrides] = useState<Record<string, Pipeline>>({})
  const [showPitch, setShowPitch] = useState<string | null>(null)

  const supabase = createClient()

  const fetchData = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('henvendelser')
      .select('*')
      .eq('type', 'kommune')
      .order('created_at', { ascending: false })
    setKontakter(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const getPipeline = (kontakt: KommuneKontakt): Pipeline => {
    if (pipelineOverrides[kontakt.id]) return pipelineOverrides[kontakt.id]
    return (kontakt.ekstra?.pipeline as Pipeline) || 'ikke_kontaktet'
  }

  const handlePipelineChange = async (id: string, newPipeline: Pipeline) => {
    setPipelineOverrides(prev => ({ ...prev, [id]: newPipeline }))
    const kontakt = kontakter.find(k => k.id === id)
    if (kontakt) {
      await supabase
        .from('henvendelser')
        .update({ ekstra: { ...(kontakt.ekstra || {}), pipeline: newPipeline } })
        .eq('id', id)
    }
  }

  const handleScrape = async () => {
    if (!scrapeUrl.trim()) return
    alert(`Scraping fra ${scrapeUrl} er en placeholder. Integrasjon settes opp separat.`)
  }

  // Stats
  const uniqueKommuner = new Set(kontakter.map(k => k.ekstra?.kommune || k.navn)).size
  const piloter = kontakter.filter(k => getPipeline(k) === 'pilot').length
  const aktive = kontakter.filter(k => getPipeline(k) === 'aktiv').length

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-tomtly-dark text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-lg font-bold">Kommunale tomter</h1>
            <p className="text-xs text-brand-400">Pipeline for kommunesamarbeid og kommunale tomter</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <Building2 className="w-5 h-5 text-brand-400 mb-2" />
            <p className="text-2xl font-bold text-tomtly-dark">{uniqueKommuner}</p>
            <p className="text-xs text-brand-500">Antall kommuner</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <MapPin className="w-5 h-5 text-brand-400 mb-2" />
            <p className="text-2xl font-bold text-tomtly-dark">{kontakter.length}</p>
            <p className="text-xs text-brand-500">Antall kontakter</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <Users className="w-5 h-5 text-amber-500 mb-2" />
            <p className="text-2xl font-bold text-tomtly-dark">{piloter}</p>
            <p className="text-xs text-brand-500">Pågående piloter</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <Handshake className="w-5 h-5 text-green-500 mb-2" />
            <p className="text-2xl font-bold text-tomtly-dark">{aktive}</p>
            <p className="text-xs text-brand-500">Aktive avtaler</p>
          </div>
        </div>

        {/* URL scraper input */}
        <div className="bg-white rounded-xl border border-brand-200 p-4 mb-6">
          <h3 className="text-sm font-semibold text-tomtly-dark mb-3">Hent kommunale tomter fra URL</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <input
                type="url"
                value={scrapeUrl}
                onChange={(e) => setScrapeUrl(e.target.value)}
                placeholder="https://kommune.no/ledige-tomter ..."
                className="w-full px-4 py-2.5 text-sm border border-brand-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
            </div>
            <button
              onClick={handleScrape}
              className="flex items-center gap-2 px-5 py-2.5 bg-tomtly-dark text-white rounded-lg text-sm font-medium hover:bg-brand-800 transition-colors"
            >
              <Globe className="w-4 h-4" />
              Hent tomter
            </button>
          </div>
        </div>

        {/* Pipeline overview */}
        <div className="bg-white rounded-xl border border-brand-200 p-4 mb-6">
          <h3 className="text-sm font-semibold text-tomtly-dark mb-3">Pipeline-oversikt</h3>
          <div className="flex gap-2">
            {PIPELINE_STEPS.map((step) => {
              const count = kontakter.filter(k => getPipeline(k) === step.key).length
              return (
                <div key={step.key} className={`flex-1 rounded-lg p-3 text-center ${step.color}`}>
                  <p className="text-lg font-bold">{count}</p>
                  <p className="text-xs font-medium">{step.label}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Kontakter table */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          <div className="p-4 border-b border-brand-200 flex items-center justify-between">
            <h2 className="font-semibold text-tomtly-dark">Kommune-kontakter</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-brand-400">Laster...</div>
          ) : kontakter.length === 0 ? (
            <div className="p-12 text-center">
              <Building2 className="w-10 h-10 text-brand-300 mx-auto mb-3" />
              <p className="text-brand-500">Ingen kommune-kontakter registrert ennå</p>
              <p className="text-xs text-brand-400 mt-1">Legg til kommune-kontakter via henvendelser med type &quot;kommune&quot;</p>
            </div>
          ) : (
            <div className="divide-y divide-brand-100">
              {kontakter.map((kontakt) => {
                const isExpanded = expandedId === kontakt.id
                const pipeline = getPipeline(kontakt)
                const kommuneNavn = kontakt.ekstra?.kommune || kontakt.navn || 'Ukjent'

                return (
                  <div key={kontakt.id}>
                    <div
                      className="flex items-center justify-between p-4 hover:bg-brand-50 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(isExpanded ? null : kontakt.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-brand-400" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-tomtly-dark">{kontakt.navn}</p>
                          <p className="text-xs text-brand-500">{kontakt.email} {kontakt.telefon && `· ${kontakt.telefon}`}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select
                          value={pipeline}
                          onChange={(e) => { e.stopPropagation(); handlePipelineChange(kontakt.id, e.target.value as Pipeline) }}
                          onClick={(e) => e.stopPropagation()}
                          className={`px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-300 ${
                            PIPELINE_STEPS.find(s => s.key === pipeline)?.color || ''
                          }`}
                        >
                          {PIPELINE_STEPS.map(s => (
                            <option key={s.key} value={s.key}>{s.label}</option>
                          ))}
                        </select>
                        <span className="text-[10px] text-brand-400">{new Date(kontakt.created_at).toLocaleDateString('nb-NO')}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 bg-brand-50 border-t border-brand-100">
                        <div className="pt-4 space-y-4">
                          {/* Details */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-[10px] text-brand-400 uppercase">E-post</p>
                              <p className="text-sm text-tomtly-dark">{kontakt.email}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-brand-400 uppercase">Telefon</p>
                              <p className="text-sm text-tomtly-dark">{kontakt.telefon || '–'}</p>
                            </div>
                            {kontakt.ekstra && Object.entries(kontakt.ekstra).filter(([k]) => k !== 'pipeline').map(([k, v]) => (
                              <div key={k}>
                                <p className="text-[10px] text-brand-400 uppercase">{k}</p>
                                <p className="text-sm text-tomtly-dark">{String(v)}</p>
                              </div>
                            ))}
                          </div>

                          {kontakt.melding && (
                            <div>
                              <p className="text-[10px] text-brand-400 uppercase mb-1">Melding</p>
                              <p className="text-sm text-brand-700 bg-white rounded-lg p-3 border border-brand-200">{kontakt.melding}</p>
                            </div>
                          )}

                          {/* Auto-pitch */}
                          <div>
                            <button
                              onClick={() => setShowPitch(showPitch === kontakt.id ? null : kontakt.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-white border border-brand-200 rounded-lg text-sm font-medium text-brand-700 hover:bg-brand-100 transition-colors"
                            >
                              Auto-generert pitch for {kommuneNavn}
                              {showPitch === kontakt.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                            {showPitch === kontakt.id && (
                              <div className="mt-2 bg-white border border-brand-200 rounded-lg p-4">
                                <div className="flex justify-end mb-2">
                                  <CopyButton text={kommunePitch(kommuneNavn)} />
                                </div>
                                <pre className="text-xs text-brand-700 whitespace-pre-wrap font-sans leading-relaxed">{kommunePitch(kommuneNavn)}</pre>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
