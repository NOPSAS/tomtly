'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { MapPin, Users, MessageCircle, TrendingUp, ChevronRight, Eye, ArrowLeft, Shield, ChevronDown, ChevronUp, Building2, Calculator } from 'lucide-react'

interface Profile {
  id: string
  full_name: string
  phone: string
  company_name: string
  role: string
  created_at: string
}

interface Henvendelse {
  id: string
  type: string
  navn: string
  email: string
  telefon: string
  melding: string
  ekstra: Record<string, any> | null
  created_at: string
}

type MeglerStatus = 'registrert' | 'aktiv' | 'inaktiv'

const MEGLER_STATUS_COLORS: Record<MeglerStatus, string> = {
  registrert: 'bg-blue-100 text-blue-700',
  aktiv: 'bg-green-100 text-green-700',
  inaktiv: 'bg-gray-100 text-gray-600',
}

const TOMTER = [
  { id: 'bjornemyrveien-20', adresse: 'Bjørnemyrveien 20', sted: 'Bjørnemyr, Nesodden', status: 'Publisert' },
  { id: 'bjornemyrveien-22', adresse: 'Bjørnemyrveien 22', sted: 'Bjørnemyr, Nesodden', status: 'Publisert' },
  { id: 'alvaern-67', adresse: 'Gamle Alværnvei 67', sted: 'Alværn, Nesodden', status: 'Publisert' },
]

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth()
  const [tab, setTab] = useState<'tomter' | 'kunder' | 'henvendelser' | 'meglere'>('tomter')
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [henvendelser, setHenvendelser] = useState<Henvendelse[]>([])
  const [meglere, setMeglere] = useState<Henvendelse[]>([])
  const [loading, setLoading] = useState(true)
  const [viewAsUser, setViewAsUser] = useState<Profile | null>(null)
  const [expandedMegler, setExpandedMegler] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    if (!user) return

    async function fetchData() {
      const [profilesRes, henvendelserRes, meglereRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('henvendelser').select('*').order('created_at', { ascending: false }),
        supabase.from('henvendelser').select('*').eq('type', 'megler_registrering').order('created_at', { ascending: false }),
      ])
      setProfiles(profilesRes.data || [])
      setHenvendelser(henvendelserRes.data || [])
      setMeglere(meglereRes.data || [])
      setLoading(false)
    }

    fetchData()
  }, [user])

  const handleMeglerStatusChange = async (id: string, newStatus: MeglerStatus) => {
    const megler = meglere.find(m => m.id === id)
    if (!megler) return
    await supabase
      .from('henvendelser')
      .update({ ekstra: { ...(megler.ekstra || {}), megler_status: newStatus } })
      .eq('id', id)
    setMeglere(prev => prev.map(m => m.id === id ? { ...m, ekstra: { ...(m.ekstra || {}), megler_status: newStatus } } : m))
  }

  if (authLoading) {
    return <div className="min-h-screen bg-brand-50 flex items-center justify-center"><p className="text-brand-500">Laster...</p></div>
  }

  // Vis kundens dashboard når admin "ser som kunde"
  if (viewAsUser) {
    return (
      <div className="min-h-screen bg-brand-50">
        <div className="bg-amber-500 text-white px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Eye className="w-4 h-4" />
              <span>Du ser dashboardet som <strong>{viewAsUser.full_name || viewAsUser.id.slice(0, 8)}</strong> ({viewAsUser.role})</span>
            </div>
            <button onClick={() => setViewAsUser(null)} className="flex items-center gap-1 text-sm font-medium hover:underline">
              <ArrowLeft className="w-4 h-4" /> Tilbake til admin
            </button>
          </div>
        </div>
        <KundeDashboard profile={viewAsUser} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-tomtly-dark text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-tomtly-gold" />
            <h1 className="font-display text-lg font-bold">Admin – Tomtly</h1>
          </div>
          <span className="text-xs text-brand-400">{user?.email}</span>
        </div>
      </div>

      {/* Admin navigation */}
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-2 py-3">
          {[
            { href: '/admin/pitch', label: 'Pitch & Forretningsmodell' },
            { href: '/admin/salg', label: 'Salg & GTM' },
            { href: '/admin/finn', label: 'FINN Pipeline' },
            { href: '/admin/kommune', label: 'Kommune' },
            { href: '/admin/fradelinger', label: 'Fradelinger' },
            { href: '/admin/delesaker', label: 'Delesaker' },
            { href: '/admin/some', label: 'SoMe' },
            { href: '/admin/finans', label: 'Finans' },
            { href: '/admin/inntekt', label: 'Inntektsberegner' },
            { href: '/admin/data', label: 'Data' },
            { href: '/admin/matching', label: 'Matching' },
            { href: '/admin/naering', label: 'Næring' },
            { href: '/admin/megler-partner', label: 'Megler-partner' },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-lg text-xs font-medium text-brand-700 hover:bg-brand-100 transition-colors whitespace-nowrap">
              {label}
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Stat icon={MapPin} label="Tomter" value={String(TOMTER.length)} />
          <Stat icon={Users} label="Kunder" value={String(profiles.filter(p => p.role !== 'admin').length)} />
          <Stat icon={MessageCircle} label="Henvendelser" value={String(henvendelser.length)} />
          <Stat icon={Building2} label="Meglere" value={String(meglere.length)} />
          <Stat icon={TrendingUp} label="MRR" value="0 kr" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-6 bg-brand-100 rounded-lg p-1 w-fit">
          {([
            { key: 'tomter' as const, label: `Tomter (${TOMTER.length})` },
            { key: 'kunder' as const, label: `Kunder (${profiles.filter(p => p.role !== 'admin').length})` },
            { key: 'henvendelser' as const, label: `Henvendelser (${henvendelser.length})` },
            { key: 'meglere' as const, label: `Meglere (${meglere.length})` },
          ]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === key ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          {/* Tomter */}
          {tab === 'tomter' && (
            <>
              <div className="p-4 border-b border-brand-200"><h2 className="font-semibold text-tomtly-dark">Alle tomter</h2></div>
              {TOMTER.map((t) => (
                <Link key={t.id} href={`/tomter/${t.id}`} className="flex items-center justify-between p-4 border-b border-brand-100 hover:bg-brand-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center"><MapPin className="w-4 h-4 text-brand-400" /></div>
                    <div>
                      <p className="font-medium text-sm text-tomtly-dark">{t.adresse}</p>
                      <p className="text-xs text-brand-500">{t.sted}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">{t.status}</span>
                    <ChevronRight className="w-4 h-4 text-brand-400" />
                  </div>
                </Link>
              ))}
            </>
          )}

          {/* Kunder */}
          {tab === 'kunder' && (
            <>
              <div className="p-4 border-b border-brand-200"><h2 className="font-semibold text-tomtly-dark">Registrerte brukere</h2></div>
              {loading ? (
                <div className="p-8 text-center text-brand-400">Laster...</div>
              ) : profiles.filter(p => p.role !== 'admin').length === 0 ? (
                <div className="p-12 text-center">
                  <Users className="w-10 h-10 text-brand-300 mx-auto mb-3" />
                  <p className="text-brand-500">Ingen kunder ennå</p>
                </div>
              ) : (
                profiles.filter(p => p.role !== 'admin').map((p) => (
                  <div key={p.id} className="flex items-center justify-between p-4 border-b border-brand-100">
                    <div>
                      <p className="font-medium text-sm text-tomtly-dark">{p.full_name || '(uten navn)'}</p>
                      <p className="text-xs text-brand-500">{p.phone} · {p.company_name || 'Privat'} · {p.role}</p>
                      <p className="text-[10px] text-brand-400">Registrert: {new Date(p.created_at).toLocaleDateString('nb-NO')}</p>
                    </div>
                    <button
                      onClick={() => setViewAsUser(p)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-50 border border-brand-200 rounded-lg text-xs text-brand-600 hover:bg-brand-100 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Se som kunde
                    </button>
                  </div>
                ))
              )}
            </>
          )}

          {/* Henvendelser */}
          {tab === 'henvendelser' && (
            <>
              <div className="p-4 border-b border-brand-200"><h2 className="font-semibold text-tomtly-dark">Henvendelser</h2></div>
              {loading ? (
                <div className="p-8 text-center text-brand-400">Laster...</div>
              ) : henvendelser.length === 0 ? (
                <div className="p-12 text-center">
                  <MessageCircle className="w-10 h-10 text-brand-300 mx-auto mb-3" />
                  <p className="text-brand-500">Ingen henvendelser ennå</p>
                </div>
              ) : (
                henvendelser.map((h) => (
                  <div key={h.id} className="p-4 border-b border-brand-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">{h.type}</span>
                        <span className="font-medium text-sm text-tomtly-dark">{h.navn}</span>
                      </div>
                      <span className="text-[10px] text-brand-400">{new Date(h.created_at).toLocaleString('nb-NO')}</span>
                    </div>
                    <p className="text-xs text-brand-600">
                      <a href={`mailto:${h.email}`} className="text-tomtly-accent hover:underline">{h.email}</a>
                      {h.telefon && <span> · {h.telefon}</span>}
                    </p>
                    {h.melding && <p className="text-sm text-brand-700 mt-2 bg-brand-50 rounded-lg p-3">{h.melding}</p>}
                    {h.ekstra && Object.keys(h.ekstra).length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {Object.entries(h.ekstra).map(([k, v]) => (
                          <span key={k} className="text-[10px] bg-brand-100 px-2 py-1 rounded text-brand-600">{k}: {String(v)}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </>
          )}

          {/* Meglere CRM */}
          {tab === 'meglere' && (
            <>
              <div className="p-4 border-b border-brand-200">
                <h2 className="font-semibold text-tomtly-dark">Megler CRM</h2>
                <p className="text-xs text-brand-400 mt-0.5">Registrerte meglere fra henvendelser med type &quot;megler_registrering&quot;</p>
              </div>
              {loading ? (
                <div className="p-8 text-center text-brand-400">Laster...</div>
              ) : meglere.length === 0 ? (
                <div className="p-12 text-center">
                  <Building2 className="w-10 h-10 text-brand-300 mx-auto mb-3" />
                  <p className="text-brand-500">Ingen meglere registrert ennå</p>
                </div>
              ) : (
                <div className="divide-y divide-brand-100">
                  {meglere.map((m) => {
                    const isExpanded = expandedMegler === m.id
                    const meglerStatus = (m.ekstra?.megler_status as MeglerStatus) || 'registrert'
                    const foretak = m.ekstra?.foretak || m.ekstra?.firma || m.ekstra?.company || '–'

                    return (
                      <div key={m.id}>
                        <div
                          className="flex items-center justify-between p-4 hover:bg-brand-50 transition-colors cursor-pointer"
                          onClick={() => setExpandedMegler(isExpanded ? null : m.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-100 rounded-lg flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-brand-400" />
                            </div>
                            <div>
                              <p className="font-medium text-sm text-tomtly-dark">{m.navn}</p>
                              <p className="text-xs text-brand-500">{foretak}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-brand-500">{m.email}</span>
                            {m.telefon && <span className="text-xs text-brand-400">{m.telefon}</span>}
                            <select
                              value={meglerStatus}
                              onChange={(e) => { e.stopPropagation(); handleMeglerStatusChange(m.id, e.target.value as MeglerStatus) }}
                              onClick={(e) => e.stopPropagation()}
                              className={`px-3 py-1 text-xs font-medium rounded-full border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-300 ${
                                MEGLER_STATUS_COLORS[meglerStatus]
                              }`}
                            >
                              <option value="registrert">Registrert</option>
                              <option value="aktiv">Aktiv</option>
                              <option value="inaktiv">Inaktiv</option>
                            </select>
                            <span className="text-[10px] text-brand-400">{new Date(m.created_at).toLocaleDateString('nb-NO')}</span>
                            {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="px-4 pb-4 bg-brand-50 border-t border-brand-100">
                            <div className="pt-4 space-y-4">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                  <p className="text-[10px] text-brand-400 uppercase">Navn</p>
                                  <p className="text-sm text-tomtly-dark">{m.navn}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-brand-400 uppercase">Foretak</p>
                                  <p className="text-sm text-tomtly-dark">{foretak}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-brand-400 uppercase">E-post</p>
                                  <a href={`mailto:${m.email}`} className="text-sm text-tomtly-accent hover:underline">{m.email}</a>
                                </div>
                                <div>
                                  <p className="text-[10px] text-brand-400 uppercase">Telefon</p>
                                  <p className="text-sm text-tomtly-dark">{m.telefon || '–'}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-brand-400 uppercase">Registrert</p>
                                  <p className="text-sm text-tomtly-dark">{new Date(m.created_at).toLocaleDateString('nb-NO')}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-brand-400 uppercase">Status</p>
                                  <p className="text-sm text-tomtly-dark capitalize">{meglerStatus}</p>
                                </div>
                              </div>

                              {m.melding && (
                                <div>
                                  <p className="text-[10px] text-brand-400 uppercase mb-1">Melding</p>
                                  <p className="text-sm text-brand-700 bg-white rounded-lg p-3 border border-brand-200">{m.melding}</p>
                                </div>
                              )}

                              {m.ekstra && Object.keys(m.ekstra).filter(k => k !== 'megler_status' && k !== 'foretak' && k !== 'firma' && k !== 'company').length > 0 && (
                                <div>
                                  <p className="text-[10px] text-brand-400 uppercase mb-1">Ekstra detaljer</p>
                                  <div className="flex flex-wrap gap-2">
                                    {Object.entries(m.ekstra).filter(([k]) => k !== 'megler_status' && k !== 'foretak' && k !== 'firma' && k !== 'company').map(([k, v]) => (
                                      <span key={k} className="text-xs bg-white px-2 py-1 rounded border border-brand-200 text-brand-600">{k}: {String(v)}</span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Notater */}
                              <div>
                                <p className="text-[10px] text-brand-400 uppercase mb-1">Notater</p>
                                <textarea
                                  defaultValue={m.ekstra?.notater || ''}
                                  onBlur={async (e) => {
                                    const val = e.target.value
                                    await supabase
                                      .from('henvendelser')
                                      .update({ ekstra: { ...(m.ekstra || {}), notater: val } })
                                      .eq('id', m.id)
                                    setMeglere(prev => prev.map(meg => meg.id === m.id ? { ...meg, ekstra: { ...(meg.ekstra || {}), notater: val } } : meg))
                                  }}
                                  placeholder="Skriv notater om megleren her..."
                                  className="w-full h-20 px-3 py-2 text-sm border border-brand-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-300 resize-none"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-5">
      <Icon className="w-5 h-5 text-brand-400 mb-2" />
      <p className="text-2xl font-bold text-tomtly-dark">{value}</p>
      <p className="text-xs text-brand-500">{label}</p>
    </div>
  )
}

// Kundens dashboard sett fra admin
function KundeDashboard({ profile }: { profile: Profile }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl border border-brand-200 p-6 mb-6">
        <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Min side</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-brand-500">Navn</p>
            <p className="text-sm font-medium text-tomtly-dark">{profile.full_name || '–'}</p>
          </div>
          <div>
            <p className="text-xs text-brand-500">Telefon</p>
            <p className="text-sm font-medium text-tomtly-dark">{profile.phone || '–'}</p>
          </div>
          <div>
            <p className="text-xs text-brand-500">Firma</p>
            <p className="text-sm font-medium text-tomtly-dark">{profile.company_name || 'Privat'}</p>
          </div>
          <div>
            <p className="text-xs text-brand-500">Rolle</p>
            <p className="text-sm font-medium text-tomtly-dark capitalize">{profile.role}</p>
          </div>
          <div>
            <p className="text-xs text-brand-500">Registrert</p>
            <p className="text-sm font-medium text-tomtly-dark">{new Date(profile.created_at).toLocaleDateString('nb-NO')}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-brand-200 p-6 mb-6">
        <h3 className="font-semibold text-tomtly-dark mb-3">Mine tomter</h3>
        <p className="text-sm text-brand-500">Ingen tomter registrert ennå.</p>
      </div>

      <div className="bg-white rounded-xl border border-brand-200 p-6">
        <h3 className="font-semibold text-tomtly-dark mb-3">Bestillinger</h3>
        <p className="text-sm text-brand-500">Ingen bestillinger ennå.</p>
      </div>
    </div>
  )
}
