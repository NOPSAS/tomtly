'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { MapPin, FileText, Settings, User, LogOut } from 'lucide-react'

interface Profile {
  full_name: string
  phone: string
  company_name: string
  role: string
  created_at: string
}

export default function MinSidePage() {
  const { user, signOut, loading: authLoading } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const supabase = createClient()
    supabase.from('profiles').select('*').eq('id', user.id).single().then(({ data }) => {
      setProfile(data)
      setLoading(false)
    })
  }, [user])

  if (authLoading || loading) {
    return <div className="min-h-screen bg-brand-50 flex items-center justify-center"><p className="text-brand-500">Laster...</p></div>
  }

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="font-display text-2xl font-bold text-tomtly-dark">Min side</h1>
          <p className="text-sm text-brand-500">{user?.email}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Profil */}
        <div className="bg-white rounded-xl border border-brand-200 p-6">
          <h2 className="font-semibold text-tomtly-dark mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-brand-400" /> Profil
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-brand-500">Navn</p>
              <p className="text-sm font-medium text-tomtly-dark">{profile?.full_name || '–'}</p>
            </div>
            <div>
              <p className="text-xs text-brand-500">Telefon</p>
              <p className="text-sm font-medium text-tomtly-dark">{profile?.phone || '–'}</p>
            </div>
            <div>
              <p className="text-xs text-brand-500">E-post</p>
              <p className="text-sm font-medium text-tomtly-dark">{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-brand-500">Firma</p>
              <p className="text-sm font-medium text-tomtly-dark">{profile?.company_name || 'Privat'}</p>
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
