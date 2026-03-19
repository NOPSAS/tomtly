'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import {
  Building2,
  Briefcase,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ArrowLeft,
  Shield,
} from 'lucide-react'

const PIPELINE_STATUSER = [
  'identifisert',
  'kontaktet',
  'analyse_bestilt',
  'levert',
  'publisert',
  'forhandling',
  'solgt',
]

const STATUS_COLORS: Record<string, string> = {
  identifisert: 'bg-gray-100 text-gray-700',
  kontaktet: 'bg-blue-100 text-blue-700',
  analyse_bestilt: 'bg-yellow-100 text-yellow-700',
  levert: 'bg-indigo-100 text-indigo-700',
  publisert: 'bg-green-100 text-green-700',
  forhandling: 'bg-orange-100 text-orange-700',
  solgt: 'bg-emerald-100 text-emerald-800',
  ny: 'bg-gray-100 text-gray-700',
  kontakt: 'bg-blue-100 text-blue-700',
  tilbud: 'bg-yellow-100 text-yellow-700',
  avsluttet: 'bg-red-100 text-red-700',
}

interface Naeringstomt {
  id: string
  finn_kode: string | null
  finn_url: string | null
  adresse: string | null
  kommune: string | null
  tomtestorrelse_m2: number | null
  regulering: string | null
  prisantydning: number | null
  type: string | null
  status: string
  kilde: string | null
  megler_firma: string | null
  thumbnail_url: string | null
  notater: string | null
  created_at: string
  sist_oppdatert: string | null
}

interface BedriftSoker {
  id: string
  type: string
  navn: string
  email: string
  telefon: string | null
  melding: string | null
  ekstra: Record<string, any> | null
  created_at: string
}

export default function AdminNaeringPage() {
  const { user, isAdmin, loading: authLoading } = useAuth()
  const [tab, setTab] = useState<'tomter' | 'bedrifter'>('tomter')
  const [tomter, setTomter] = useState<Naeringstomt[]>([])
  const [bedrifter, setBedrifter] = useState<BedriftSoker[]>([])
  const [loading, setLoading] = useState(true)
  const [scraping, setScraping] = useState(false)
  const [scrapeResult, setScrapeResult] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (!user) return
    fetchData()
  }, [user])

  async function fetchData() {
    setLoading(true)
    const [tomterRes, bedrifterRes] = await Promise.all([
      supabase.from('naeringstomter').select('*').order('created_at', { ascending: false }),
      supabase.from('henvendelser').select('*').eq('type', 'bedrift_soker_lokaler').order('created_at', { ascending: false }),
    ])
    setTomter(tomterRes.data || [])
    setBedrifter(bedrifterRes.data || [])
    setLoading(false)
  }

  async function runScraper() {
    setScraping(true)
    setScrapeResult(null)
    try {
      const res = await fetch('/api/admin/scrape-naering', { method: 'POST' })
      const data = await res.json()
      setScrapeResult(`Nye: ${data.nye}, Oppdatert: ${data.oppdatert}, Totalt funnet: ${data.totalt_funnet}`)
      fetchData()
    } catch {
      setScrapeResult('Feil ved kjøring av scraper')
    } finally {
      setScraping(false)
    }
  }

  async function updateTomtStatus(id: string, newStatus: string) {
    await supabase.from('naeringstomter').update({ status: newStatus }).eq('id', id)
    setTomter((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    )
  }

  async function saveTomtNotater(id: string, notater: string) {
    await supabase.from('naeringstomter').update({ notater }).eq('id', id)
    setTomter((prev) =>
      prev.map((t) => (t.id === id ? { ...t, notater } : t))
    )
  }

  async function updateBedriftStatus(id: string, newStatus: string) {
    const bedrift = bedrifter.find((b) => b.id === id)
    if (!bedrift) return
    await supabase
      .from('henvendelser')
      .update({ ekstra: { ...(bedrift.ekstra || {}), status: newStatus } })
      .eq('id', id)
    setBedrifter((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, ekstra: { ...(b.ekstra || {}), status: newStatus } } : b
      )
    )
  }

  async function saveBedriftNotater(id: string, notater: string) {
    const bedrift = bedrifter.find((b) => b.id === id)
    if (!bedrift) return
    await supabase
      .from('henvendelser')
      .update({ ekstra: { ...(bedrift.ekstra || {}), notater } })
      .eq('id', id)
    setBedrifter((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, ekstra: { ...(b.ekstra || {}), notater } } : b
      )
    )
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center">
        <p className="text-brand-500">Laster...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center">
        <p className="text-brand-500">Ingen tilgang</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-tomtly-dark text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-tomtly-gold" />
            <h1 className="font-display text-lg font-bold">Admin – Næring</h1>
          </div>
          <Link href="/admin" className="flex items-center gap-1 text-sm text-brand-400 hover:text-white">
            <ArrowLeft className="w-4 h-4" /> Tilbake
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex gap-1 bg-brand-100 rounded-lg p-1">
            <button
              onClick={() => setTab('tomter')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === 'tomter' ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500'
              }`}
            >
              <Building2 className="w-4 h-4 inline mr-1.5" />
              Næringstomter ({tomter.length})
            </button>
            <button
              onClick={() => setTab('bedrifter')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === 'bedrifter' ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500'
              }`}
            >
              <Briefcase className="w-4 h-4 inline mr-1.5" />
              Bedrifter ({bedrifter.length})
            </button>
          </div>
        </div>

        {/* Tab: Næringstomter */}
        {tab === 'tomter' && (
          <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
            <div className="p-4 border-b border-brand-200 flex items-center justify-between">
              <h2 className="font-semibold text-tomtly-dark">Næringstomter</h2>
              <div className="flex items-center gap-3">
                {scrapeResult && (
                  <span className="text-xs text-brand-500">{scrapeResult}</span>
                )}
                <button
                  onClick={runScraper}
                  disabled={scraping}
                  className="flex items-center gap-2 px-3 py-1.5 bg-tomtly-accent text-white text-xs font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${scraping ? 'animate-spin' : ''}`} />
                  {scraping ? 'Scraper...' : 'Kjør scraper'}
                </button>
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center text-brand-400">Laster...</div>
            ) : tomter.length === 0 ? (
              <div className="p-12 text-center">
                <Building2 className="w-10 h-10 text-brand-300 mx-auto mb-3" />
                <p className="text-brand-500">Ingen næringstomter ennå. Kjør scraperen.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-50 text-left text-xs text-brand-500 uppercase">
                      <th className="px-4 py-3">Adresse</th>
                      <th className="px-4 py-3">Kommune</th>
                      <th className="px-4 py-3">Størrelse</th>
                      <th className="px-4 py-3">Regulering</th>
                      <th className="px-4 py-3">Pris</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Kilde</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100">
                    {tomter.map((t) => {
                      const isExpanded = expandedId === t.id
                      return (
                        <>
                          <tr
                            key={t.id}
                            className="hover:bg-brand-50 cursor-pointer transition-colors"
                            onClick={() => setExpandedId(isExpanded ? null : t.id)}
                          >
                            <td className="px-4 py-3 font-medium text-tomtly-dark">
                              {t.finn_url ? (
                                <a
                                  href={t.finn_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="hover:text-tomtly-accent hover:underline"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  {t.adresse || t.finn_kode || '–'}
                                </a>
                              ) : (
                                t.adresse || '–'
                              )}
                            </td>
                            <td className="px-4 py-3 text-brand-600">{t.kommune || '–'}</td>
                            <td className="px-4 py-3 text-brand-600">
                              {t.tomtestorrelse_m2 ? `${t.tomtestorrelse_m2.toLocaleString('nb-NO')} m²` : '–'}
                            </td>
                            <td className="px-4 py-3 text-brand-600">{t.regulering || '–'}</td>
                            <td className="px-4 py-3 text-brand-600">
                              {t.prisantydning ? `${(t.prisantydning / 1000000).toFixed(1)} MNOK` : '–'}
                            </td>
                            <td className="px-4 py-3 text-brand-600">{t.type || '–'}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 text-xs rounded-full ${STATUS_COLORS[t.status] || 'bg-gray-100 text-gray-600'}`}>
                                {t.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-brand-400 text-xs">{t.kilde || '–'}</td>
                            <td className="px-4 py-3">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-brand-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-brand-400" />
                              )}
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr key={`${t.id}-detail`}>
                              <td colSpan={9} className="bg-brand-50 px-4 py-4">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                      <p className="text-[10px] text-brand-400 uppercase">FINN-kode</p>
                                      <p className="text-sm text-tomtly-dark">{t.finn_kode || '–'}</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-brand-400 uppercase">Megler</p>
                                      <p className="text-sm text-tomtly-dark">{t.megler_firma || '–'}</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-brand-400 uppercase">Lagt til</p>
                                      <p className="text-sm text-tomtly-dark">{new Date(t.created_at).toLocaleDateString('nb-NO')}</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-brand-400 uppercase">Sist oppdatert</p>
                                      <p className="text-sm text-tomtly-dark">{t.sist_oppdatert ? new Date(t.sist_oppdatert).toLocaleDateString('nb-NO') : '–'}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <p className="text-[10px] text-brand-400 uppercase mb-1">Status</p>
                                    <select
                                      value={t.status}
                                      onChange={(e) => updateTomtStatus(t.id, e.target.value)}
                                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-300 ${STATUS_COLORS[t.status] || ''}`}
                                    >
                                      {PIPELINE_STATUSER.map((s) => (
                                        <option key={s} value={s}>
                                          {s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ')}
                                        </option>
                                      ))}
                                    </select>
                                  </div>

                                  <div>
                                    <p className="text-[10px] text-brand-400 uppercase mb-1">Notater</p>
                                    <textarea
                                      defaultValue={t.notater || ''}
                                      onBlur={(e) => saveTomtNotater(t.id, e.target.value)}
                                      placeholder="Skriv notater her..."
                                      className="w-full h-20 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                                    />
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
            )}
          </div>
        )}

        {/* Tab: Bedrifter som søker */}
        {tab === 'bedrifter' && (
          <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
            <div className="p-4 border-b border-brand-200">
              <h2 className="font-semibold text-tomtly-dark">Bedrifter som søker lokaler</h2>
            </div>

            {loading ? (
              <div className="p-8 text-center text-brand-400">Laster...</div>
            ) : bedrifter.length === 0 ? (
              <div className="p-12 text-center">
                <Briefcase className="w-10 h-10 text-brand-300 mx-auto mb-3" />
                <p className="text-brand-500">Ingen bedriftshenvendelser ennå</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-50 text-left text-xs text-brand-500 uppercase">
                      <th className="px-4 py-3">Bedrift</th>
                      <th className="px-4 py-3">Kontaktperson</th>
                      <th className="px-4 py-3">Type</th>
                      <th className="px-4 py-3">Størrelse</th>
                      <th className="px-4 py-3">Område</th>
                      <th className="px-4 py-3">Budsjett</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-100">
                    {bedrifter.map((b) => {
                      const isExpanded = expandedId === b.id
                      const status = (b.ekstra?.status as string) || 'ny'
                      return (
                        <>
                          <tr
                            key={b.id}
                            className="hover:bg-brand-50 cursor-pointer transition-colors"
                            onClick={() => setExpandedId(isExpanded ? null : b.id)}
                          >
                            <td className="px-4 py-3 font-medium text-tomtly-dark">
                              {b.ekstra?.bedriftsnavn || '–'}
                            </td>
                            <td className="px-4 py-3 text-brand-600">{b.navn}</td>
                            <td className="px-4 py-3 text-brand-600">{b.ekstra?.type_lokaler || '–'}</td>
                            <td className="px-4 py-3 text-brand-600">{b.ekstra?.storrelse || '–'}</td>
                            <td className="px-4 py-3 text-brand-600">{b.ekstra?.omrade || '–'}</td>
                            <td className="px-4 py-3 text-brand-600">{b.ekstra?.budsjett || '–'}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 text-xs rounded-full ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-600'}`}>
                                {status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              {isExpanded ? (
                                <ChevronUp className="w-4 h-4 text-brand-400" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-brand-400" />
                              )}
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr key={`${b.id}-detail`}>
                              <td colSpan={8} className="bg-brand-50 px-4 py-4">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                      <p className="text-[10px] text-brand-400 uppercase">E-post</p>
                                      <a href={`mailto:${b.email}`} className="text-sm text-tomtly-accent hover:underline">{b.email}</a>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-brand-400 uppercase">Telefon</p>
                                      <p className="text-sm text-tomtly-dark">{b.telefon || '–'}</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-brand-400 uppercase">Tidslinje</p>
                                      <p className="text-sm text-tomtly-dark">{b.ekstra?.tidslinje || '–'}</p>
                                    </div>
                                    <div>
                                      <p className="text-[10px] text-brand-400 uppercase">Mottatt</p>
                                      <p className="text-sm text-tomtly-dark">{new Date(b.created_at).toLocaleDateString('nb-NO')}</p>
                                    </div>
                                  </div>

                                  {b.melding && (
                                    <div>
                                      <p className="text-[10px] text-brand-400 uppercase mb-1">Melding</p>
                                      <p className="text-sm text-brand-700 bg-white rounded-lg p-3 border border-brand-200">{b.melding}</p>
                                    </div>
                                  )}

                                  <div>
                                    <p className="text-[10px] text-brand-400 uppercase mb-1">Status</p>
                                    <select
                                      value={status}
                                      onChange={(e) => {
                                        e.stopPropagation()
                                        updateBedriftStatus(b.id, e.target.value)
                                      }}
                                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-300 ${STATUS_COLORS[status] || ''}`}
                                    >
                                      <option value="ny">Ny</option>
                                      <option value="kontakt">Kontaktet</option>
                                      <option value="tilbud">Tilbud sendt</option>
                                      <option value="solgt">Solgt</option>
                                      <option value="avsluttet">Avsluttet</option>
                                    </select>
                                  </div>

                                  <div>
                                    <p className="text-[10px] text-brand-400 uppercase mb-1">Notater</p>
                                    <textarea
                                      defaultValue={b.ekstra?.notater || ''}
                                      onBlur={(e) => saveBedriftNotater(b.id, e.target.value)}
                                      placeholder="Skriv notater her..."
                                      className="w-full h-20 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                                    />
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
            )}
          </div>
        )}
      </div>
    </div>
  )
}
