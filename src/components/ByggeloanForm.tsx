'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2, Landmark } from 'lucide-react'

export function ByggeloanForm() {
  const [navn, setNavn] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [budsjett, setBudsjett] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!navn.trim() || !epost.trim() || !telefon.trim()) return
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'byggelaan-lead',
          navn: navn.trim(),
          epost: epost.trim(),
          telefon: telefon.trim(),
          ekstra: { budsjett },
        }),
      })
    } catch {}
    setSendt(true)
    setSender(false)
  }

  if (sendt) {
    return (
      <section className="bg-forest-50 border border-forest-200 rounded-2xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-tomtly-accent/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-7 h-7 text-tomtly-accent" />
        </div>
        <h3 className="font-display text-xl font-bold text-tomtly-dark mb-2">
          Takk for din henvendelse!
        </h3>
        <p className="text-brand-600 text-sm">
          Vi matcher deg med banker som tilbyr byggelån, og tar kontakt innen 1 virkedag.
        </p>
      </section>
    )
  }

  return (
    <section className="bg-forest-50 border border-forest-200 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-tomtly-accent/10 flex items-center justify-center">
          <Landmark className="w-5 h-5 text-tomtly-accent" />
        </div>
        <h3 className="font-display text-lg font-bold text-tomtly-dark">
          Få tilbud på byggelån
        </h3>
      </div>
      <p className="text-brand-600 text-sm mb-5">
        Vi samarbeider med flere banker for å gi deg det beste tilbudet på byggelån.
        Fyll ut skjemaet, så matcher vi deg med riktig bank.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="byggelaan-navn" className="block text-xs font-medium text-brand-500 mb-1">Navn *</label>
          <input
            id="byggelaan-navn"
            type="text"
            required
            value={navn}
            onChange={(e) => setNavn(e.target.value)}
            placeholder="Ditt fulle navn"
            className="w-full px-3 py-2.5 rounded-lg border border-brand-200 text-sm text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
          />
        </div>

        <div>
          <label htmlFor="byggelaan-epost" className="block text-xs font-medium text-brand-500 mb-1">E-post *</label>
          <input
            id="byggelaan-epost"
            type="email"
            required
            value={epost}
            onChange={(e) => setEpost(e.target.value)}
            placeholder="din@epost.no"
            className="w-full px-3 py-2.5 rounded-lg border border-brand-200 text-sm text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
          />
        </div>

        <div>
          <label htmlFor="byggelaan-telefon" className="block text-xs font-medium text-brand-500 mb-1">Telefon *</label>
          <input
            id="byggelaan-telefon"
            type="tel"
            required
            value={telefon}
            onChange={(e) => setTelefon(e.target.value)}
            placeholder="Ditt telefonnummer"
            className="w-full px-3 py-2.5 rounded-lg border border-brand-200 text-sm text-tomtly-dark placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
          />
        </div>

        <div>
          <label htmlFor="byggelaan-budsjett" className="block text-xs font-medium text-brand-500 mb-1">Estimert budsjett</label>
          <select
            id="byggelaan-budsjett"
            value={budsjett}
            onChange={(e) => setBudsjett(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border border-brand-200 text-sm text-tomtly-dark focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent bg-white"
          >
            <option value="">Velg budsjettramme</option>
            <option value="Under 3M">Under 3M</option>
            <option value="3-5M">3-5M</option>
            <option value="5-8M">5-8M</option>
            <option value="Over 8M">Over 8M</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={sender}
          className="w-full py-3 bg-tomtly-accent text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {sender ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sender...
            </>
          ) : (
            'Send forespørsel'
          )}
        </button>
      </form>
    </section>
  )
}
