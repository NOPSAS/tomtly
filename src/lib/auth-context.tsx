'use client'

import { createContext, useContext, useEffect, useState, useMemo } from 'react'
import { createClient } from '@/lib/supabase'
import type { User, Session } from '@supabase/supabase-js'

interface Profile {
  full_name: string
  phone: string
  company_name: string
  role: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  isAdmin: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, metadata: Record<string, any>) => Promise<{ error: any }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const supabase = useMemo(() => createClient(), [])

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('profiles')
      .select('full_name, phone, company_name, role, created_at')
      .eq('id', userId)
      .single()
    setProfile(data)
  }

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id)
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id).then(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signUp = async (email: string, password: string, metadata: Record<string, any>) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setProfile(null)
  }

  // Admin check: profile role OR known admin emails
  const isAdmin = profile?.role === 'admin' || user?.email === 'hey@nops.no'

  return (
    <AuthContext.Provider value={{ user, session, profile, isAdmin, loading, signIn, signUp, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
