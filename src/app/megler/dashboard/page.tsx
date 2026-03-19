'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { Building2, Plus, Clock, CheckCircle2, Loader2, UserPlus } from 'lucide-react'

interface Analyse {
  id: string
  type: string
  navn: string
  email: string
  melding: string
  ekstra: Record<string, any> | null
  created_at: string
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: any }> = {
  bestilt: { label: 'Bestilt', color: 'bg-blue-100 text-blue-700', icon: Clock },
  under_arbeid: { label: 'Under arbeid', color: 'bg-amber-100 text-amber-700', icon: Loader2 },
  levert: { label: 'Levert', color: 'bg-green-100 text-green-700', icon: CheckCircle2 },
}

export default function MeglerDashboard() {
  const { user, profile, loading: authLoading } = useAuth()
  const [analyser, setAnalyser] = useState<Analyse[]>([])
  const [loading, setLoading] = useState(true)
  const [bestiller, setBestiller] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    if (!user) return

    async function fetchAnalyser() {
      const { data } = await supabase
        .from('henvendelser')
        .select('*')
        .eq('email', user!.email)
        .in('type', ['tomtanalyse', 'betaling', 'megler_bestilling'])
        .order('created_at', { ascending: false })
      setAnalyser(data || [])
      setLoading(false)
    }

    fetchAnalyser()
  }, [user])

  const handleBestill = async () => {
    setBestiller(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: 'megler', email: user?.email }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setBestiller(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center">
        <p className="text-brand-500">Laster...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-xl border border-brand-200 p-10 max-w-md w-full text-center">
          <Building2 className="w-12 h-12 text-brand-300 mx-auto mb-4" />
          <h1 className="font-display text-xl font-bold text-tomtly-dark mb-2">Meglerportal</h1>
          <p className="text-sm text-brand-500 mb-6">Logg inn for å se ditt dashboard.</p>
          <Link
            href="/logg-inn"
            className="inline-flex items-center gap-2 px-6 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Logg inn
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-tomtly-dark">
                Megler Dashboard
              </h1>
              <p className="text-sm text-brand-500 mt-1">
                {profile?.full_name || user.email} {profile?.company_name ? `– ${profile.company_name}` : ''}
              </p>
            </div>
            <button
              onClick={handleBestill}
              disabled={bestiller}
              className="flex items-center gap-2 px-5 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50"
            >
              {bestiller ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Bestill ny analyse
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Profil */}
        <div className="bg-white rounded-xl border border-brand-200 p-6">
          <h2 className="font-semibold text-tomtly-dark mb-4">Min profil</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-brand-400">Navn</p>
              <p className="text-sm font-medium text-tomtly-dark">{profile?.full_name || '–'}</p>
            </div>
            <div>
              <p className="text-xs text-brand-400">E-post</p>
              <p className="text-sm font-medium text-tomtly-dark">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-brand-400">Telefon</p>
              <p className="text-sm font-medium text-tomtly-dark">{profile?.phone || '–'}</p>
            </div>
            <div>
              <p className="text-xs text-brand-400">Foretak</p>
              <p className="text-sm font-medium text-tomtly-dark">{profile?.company_name || '–'}</p>
            </div>
          </div>
        </div>

        {/* Mine analyser */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          <div className="p-4 border-b border-brand-200">
            <h2 className="font-semibold text-tomtly-dark">Mine tomtanalyser</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-brand-400">Laster analyser...</div>
          ) : analyser.length === 0 ? (
            <div className="p-12 text-center">
              <Building2 className="w-10 h-10 text-brand-300 mx-auto mb-3" />
              <p className="text-brand-500 mb-4">Ingen analyser bestilt ennå.</p>
              <button
                onClick={handleBestill}
                disabled={bestiller}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Bestill din første analyse
              </button>
            </div>
          ) : (
            <div className="divide-y divide-brand-100">
              {analyser.map((a) => {
                const status = a.ekstra?.analyse_status || 'bestilt'
                const statusInfo = STATUS_MAP[status] || STATUS_MAP.bestilt
                const StatusIcon = statusInfo.icon

                return (
                  <div key={a.id} className="p-4 hover:bg-brand-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm text-tomtly-dark">{a.melding || 'Tomtanalyse'}</p>
                        <p className="text-xs text-brand-500 mt-0.5">
                          Bestilt {new Date(a.created_at).toLocaleDateString('nb-NO')}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Team */}
        <div className="bg-white rounded-xl border border-brand-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-tomtly-dark">Team</h2>
            <button className="flex items-center gap-2 px-4 py-2 border border-brand-200 text-sm text-brand-700 rounded-lg hover:bg-brand-50 transition-colors">
              <UserPlus className="w-4 h-4" />
              Inviter kollega
            </button>
          </div>
          <p className="text-sm text-brand-500">
            Inviter kollegaer for å dele analyser og bestillinger på tvers av kontoret.
          </p>
          <p className="text-xs text-brand-400 mt-2">
            Denne funksjonen kommer snart. Ta kontakt på hey@nops.no for kontorkonto.
          </p>
        </div>
      </div>
    </div>
  )
}
