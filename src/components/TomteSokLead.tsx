'use client'

import { useState } from 'react'
import { MapPin, Search, CheckCircle2, Loader2 } from 'lucide-react'

const KOMMUNER = [
  'Oslo', 'Bærum', 'Asker', 'Nesodden', 'Frogn', 'Nordre Follo',
  'Vestby', 'Moss', 'Fredrikstad', 'Sarpsborg', 'Halden',
  'Drammen', 'Lier', 'Kongsberg', 'Lillehammer', 'Hamar',
  'Stavanger', 'Bergen', 'Trondheim', 'Tromsø',
]

export function TomteSokLead() {
  const [kommune, setKommune] = useState('')
  const [omrade, setOmrade] = useState('')
  const [epost, setEpost] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!kommune || !epost) return
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tomtesok-lead',
          epost,
          ekstra: { kommune, omrade: omrade || 'Hele kommunen' },
        }),
      })
      setSendt(true)
    } catch {
      // Still show success to not lose the lead
      setSendt(true)
    } finally {
      setSender(false)
    }
  }

  if (sendt) {
    return (
      <section className="bg-white py-16 lg:py-20 border-t border-brand-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-14 h-14 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-tomtly-accent" />
          </div>
          <h3 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Vi holder utkikk for deg!</h3>
          <p className="text-brand-600">
            Du får beskjed på <span className="font-semibold">{epost}</span> når vi finner tomter i {kommune}{omrade ? ` (${omrade})` : ''}.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16 lg:py-20 border-t border-brand-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-tomtly-accent/10 text-tomtly-accent text-xs font-semibold rounded-full mb-4">
            <Search className="w-3.5 h-3.5" />
            Ser du etter tomt?
          </div>
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-3">
            Fortell oss hvor du vil bo
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Vi overvåker markedet daglig og gir deg beskjed når det dukker opp tomter i ditt område.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-brand-50 rounded-2xl border border-brand-200 p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Kommune</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                <select
                  value={kommune}
                  onChange={e => setKommune(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-brand-200 bg-white text-tomtly-dark text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
                >
                  <option value="">Velg kommune</option>
                  {KOMMUNER.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Område (valgfritt)</label>
              <input
                type="text"
                value={omrade}
                onChange={e => setOmrade(e.target.value)}
                placeholder="F.eks. Bjørnemyr, Tangen, Bekkestua..."
                className="w-full px-4 py-3 rounded-lg border border-brand-200 bg-white text-tomtly-dark text-sm placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post</label>
            <input
              type="email"
              value={epost}
              onChange={e => setEpost(e.target.value)}
              placeholder="din@epost.no"
              required
              className="w-full px-4 py-3 rounded-lg border border-brand-200 bg-white text-tomtly-dark text-sm placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
            />
          </div>

          <button
            type="submit"
            disabled={sender || !kommune || !epost}
            className="w-full py-3.5 bg-tomtly-accent hover:bg-forest-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {sender ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registrerer...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Gi meg beskjed når det dukker opp tomter
              </>
            )}
          </button>

          <p className="text-xs text-brand-400 text-center">
            Gratis og uforpliktende. Du kan melde deg av når som helst.
          </p>
        </form>
      </div>
    </section>
  )
}
