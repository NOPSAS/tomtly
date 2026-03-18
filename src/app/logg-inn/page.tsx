'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MapPin, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'

export default function LoggInnPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [role, setRole] = useState('tomteeier')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { user, loading, signIn, signUp } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/min-side')
    }
  }, [user, loading, router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error } = await signIn(email, password)
    if (error) {
      setError(error.message)
      setSubmitting(false)
    } else {
      router.push('/min-side')
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setMessage('')

    if (password !== confirmPassword) {
      setError('Passordene stemmer ikke overens')
      return
    }
    if (password.length < 6) {
      setError('Passordet må være minst 6 tegn')
      return
    }

    setSubmitting(true)
    const { error } = await signUp(email, password, {
      full_name: fullName,
      phone,
      company_name: companyName,
      role,
    })
    if (error) {
      setError(error.message)
    } else {
      setMessage('Sjekk e-posten din for å bekrefte kontoen.')
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-tomtly-accent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-tomtly-accent rounded-md flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-tomtly-dark">Tomtly</span>
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-brand-200">
            <button
              onClick={() => { setTab('login'); setError(''); setMessage('') }}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === 'login'
                  ? 'text-tomtly-accent border-b-2 border-tomtly-accent'
                  : 'text-brand-500 hover:text-brand-700'
              }`}
            >
              Logg inn
            </button>
            <button
              onClick={() => { setTab('register'); setError(''); setMessage('') }}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                tab === 'register'
                  ? 'text-tomtly-accent border-b-2 border-tomtly-accent'
                  : 'text-brand-500 hover:text-brand-700'
              }`}
            >
              Opprett konto
            </button>
          </div>

          <div className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {message && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-green-700">{message}</p>
              </div>
            )}

            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post</label>
                  <input
                    type="email"
                    placeholder="din@epost.no"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Passord</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-tomtly-accent hover:bg-tomtly-accent/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    'Logg inn'
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Navn</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Telefon</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Passord</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Bekreft passord</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Firmanavn (valgfritt)</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1.5">Rolle</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                  >
                    <option value="tomteeier">Tomteeier</option>
                    <option value="megler">Megler</option>
                    <option value="utvikler">Utvikler</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-tomtly-accent hover:bg-tomtly-accent/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    'Opprett konto'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-brand-400 mt-6">
          Sporsmal? Kontakt oss pa hey@nops.no
        </p>
      </div>
    </div>
  )
}
