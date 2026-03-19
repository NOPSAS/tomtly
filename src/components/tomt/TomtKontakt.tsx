'use client'

import { useState } from 'react'
import { Phone, Mail, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react'

export function TomtKontakt() {
  const [navn, setNavn] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [melding, setMelding] = useState('')
  const [loading, setLoading] = useState(false)
  const [sendt, setSendt] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tomt_henvendelse',
          navn,
          email,
          telefon,
          melding,
        }),
      })

      if (res.ok) {
        setSendt(true)
      }
    } catch (err) {
      console.error('Feil ved innsending:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white border border-brand-200 rounded-xl p-6">
      <h3 className="font-semibold text-tomtly-dark mb-4">Interessert?</h3>

      <div className="space-y-3 mb-6">
        <p className="text-sm text-brand-600">
          Ta kontakt for mer informasjon om denne tomten og mulighetene.
        </p>
      </div>

      {sendt ? (
        <div className="text-center py-4">
          <CheckCircle2 className="w-10 h-10 text-tomtly-accent mx-auto mb-3" />
          <p className="font-semibold text-tomtly-dark mb-1">Takk for henvendelsen!</p>
          <p className="text-sm text-brand-500">Vi tar kontakt innen 1 virkedag.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 mb-6">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">Navn</label>
            <input
              type="text"
              required
              value={navn}
              onChange={(e) => setNavn(e.target.value)}
              className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              placeholder="Ditt navn"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">E-post</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              placeholder="din@epost.no"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">Telefon</label>
            <input
              type="tel"
              value={telefon}
              onChange={(e) => setTelefon(e.target.value)}
              className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              placeholder="Ditt telefonnummer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">Melding</label>
            <textarea
              rows={3}
              value={melding}
              onChange={(e) => setMelding(e.target.value)}
              className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none"
              placeholder="Hva lurer du på?"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Sender...
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4" />
                Send henvendelse
              </>
            )}
          </button>
        </form>
      )}

      <div className="space-y-3">
        <a href="tel:+4700000000" className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-brand-200 text-brand-700 font-medium rounded-lg hover:bg-brand-50 transition-colors">
          <Phone className="w-4 h-4" />
          Ring oss
        </a>
        <a href="mailto:hey@nops.no" className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-brand-200 text-brand-700 font-medium rounded-lg hover:bg-brand-50 transition-colors">
          <Mail className="w-4 h-4" />
          hey@nops.no
        </a>
      </div>

    </div>
  )
}
