'use client'

import { useEffect, useState, useMemo } from 'react'
import { useAuth } from '@/lib/auth-context'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { MapPin, FileText, User, LogOut, Save, CheckCircle2 } from 'lucide-react'

export default function MinSidePage() {
  const { user, profile, isAdmin, signOut, loading: authLoading, refreshProfile } = useAuth()
  const supabase = useMemo(() => createClient(), [])

  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    company_name: '',
  })

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
        company_name: profile.company_name || '',
      })
    }
  }, [profile])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    await supabase.from('profiles').update(form).eq('id', user.id)
    await refreshProfile()
    setSaving(false)
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 3000)
  }

  if (authLoading) {
    return <div className="min-h-screen bg-brand-50 flex items-center justify-center"><p className="text-brand-500">Laster...</p></div>
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-tomtly-dark">Min side</h1>
              <p className="text-sm text-brand-500">{user?.email}</p>
            </div>
            {isAdmin && (
              <Link href="/admin" className="flex items-center gap-1 px-3 py-1.5 bg-tomtly-dark text-white text-xs font-medium rounded-lg">
                Admin
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Profil */}
        <div className="bg-white rounded-xl border border-brand-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-tomtly-dark flex items-center gap-2">
              <User className="w-5 h-5 text-brand-400" /> Profil
            </h2>
            {!editing ? (
              <button onClick={() => setEditing(true)} className="text-sm text-tomtly-accent hover:underline">
                Rediger
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setEditing(false)} className="text-sm text-brand-500 hover:underline">
                  Avbryt
                </button>
                <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 px-3 py-1.5 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 disabled:opacity-50">
                  <Save className="w-3.5 h-3.5" />
                  {saving ? 'Lagrer...' : 'Lagre'}
                </button>
              </div>
            )}
          </div>

          {saved && (
            <div className="flex items-center gap-2 mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
              <CheckCircle2 className="w-4 h-4" /> Profilen er oppdatert
            </div>
          )}

          {editing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-brand-500 mb-1">Navn</label>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                />
              </div>
              <div>
                <label className="block text-xs text-brand-500 mb-1">Telefon</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                />
              </div>
              <div>
                <label className="block text-xs text-brand-500 mb-1">E-post</label>
                <input type="email" value={user?.email || ''} disabled className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm bg-brand-50 text-brand-400" />
                <p className="text-[10px] text-brand-400 mt-1">E-post kan ikke endres</p>
              </div>
              <div>
                <label className="block text-xs text-brand-500 mb-1">Firma (valgfritt)</label>
                <input
                  type="text"
                  value={form.company_name}
                  onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                  className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-brand-500">Navn</p>
                <p className="text-sm font-medium text-tomtly-dark">{profile?.full_name || <span className="text-brand-300 italic">Ikke fylt ut</span>}</p>
              </div>
              <div>
                <p className="text-xs text-brand-500">Telefon</p>
                <p className="text-sm font-medium text-tomtly-dark">{profile?.phone || <span className="text-brand-300 italic">Ikke fylt ut</span>}</p>
              </div>
              <div>
                <p className="text-xs text-brand-500">E-post</p>
                <p className="text-sm font-medium text-tomtly-dark">{user?.email}</p>
              </div>
              <div>
                <p className="text-xs text-brand-500">Firma</p>
                <p className="text-sm font-medium text-tomtly-dark">{profile?.company_name || <span className="text-brand-300 italic">Ikke fylt ut</span>}</p>
              </div>
              <div>
                <p className="text-xs text-brand-500">Rolle</p>
                <p className="text-sm font-medium text-tomtly-dark capitalize">{profile?.role || '–'}</p>
              </div>
              <div>
                <p className="text-xs text-brand-500">Registrert</p>
                <p className="text-sm font-medium text-tomtly-dark">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString('nb-NO') : '–'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Mine tomter */}
        <div className="bg-white rounded-xl border border-brand-200 p-6">
          <h2 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-400" /> Mine tomter
          </h2>
          <p className="text-sm text-brand-500 mb-4">Ingen tomter registrert ennå.</p>
          <Link href="/selger/onboarding" className="inline-flex px-4 py-2 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 transition-colors">
            Legg ut tomt
          </Link>
        </div>

        {/* Bestillinger */}
        <div className="bg-white rounded-xl border border-brand-200 p-6">
          <h2 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-400" /> Bestillinger
          </h2>
          <p className="text-sm text-brand-500">Ingen bestillinger ennå.</p>
        </div>

        {/* Logg ut */}
        <button
          onClick={() => signOut()}
          className="flex items-center gap-2 text-sm text-brand-500 hover:text-brand-700"
        >
          <LogOut className="w-4 h-4" /> Logg ut
        </button>
      </div>
    </div>
  )
}
