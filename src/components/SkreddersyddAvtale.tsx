'use client'

import { useState } from 'react'
import { X, CheckCircle2, Loader2 } from 'lucide-react'

export function SkreddersyddAvtale() {
  const [open, setOpen] = useState(false)
  const [sendt, setSendt] = useState(false)
  const [loading, setLoading] = useState(false)

  const [firma, setFirma] = useState('')
  const [kontaktperson, setKontaktperson] = useState('')
  const [email, setEmail] = useState('')
  const [telefon, setTelefon] = useState('')
  const [antallTomter, setAntallTomter] = useState('1-5')
  const [melding, setMelding] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'skreddersydd_avtale',
          navn: kontaktperson,
          email,
          telefon,
          melding,
          firma,
          antallTomter,
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
    <section className="bg-brand-50 rounded-xl border border-brand-200 p-8 mt-10">
      <div className="text-center max-w-lg mx-auto">
        <h3 className="text-lg font-semibold text-tomtly-dark mb-2">
          Trenger du en skreddersydd avtale?
        </h3>
        <p className="text-sm text-brand-600 mb-5">
          Har du mange tomter eller spesielle behov? Vi tilbyr volumrabatter og
          skreddersydde løsninger for større aktører.
        </p>
        <button
          onClick={() => { setOpen(true); setSendt(false) }}
          className="px-6 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
        >
          Kontakt oss for tilbud
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-brand-400 hover:text-brand-700"
            >
              <X className="w-5 h-5" />
            </button>

            {sendt ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-tomtly-accent" />
                </div>
                <h4 className="text-lg font-semibold text-tomtly-dark mb-2">Takk for henvendelsen!</h4>
                <p className="text-sm text-brand-600 mb-1">Vi tar kontakt innen 1 virkedag.</p>
                <p className="text-xs text-brand-400">hey@nops.no</p>
                <button
                  onClick={() => setOpen(false)}
                  className="mt-6 px-5 py-2 text-sm text-brand-600 hover:text-brand-800"
                >
                  Lukk
                </button>
              </div>
            ) : (
              <>
                <h4 className="text-lg font-semibold text-tomtly-dark mb-1">
                  Skreddersydd avtale
                </h4>
                <p className="text-sm text-brand-500 mb-6">
                  Fyll ut skjemaet, så tar vi kontakt.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">Firma</label>
                    <input
                      type="text"
                      required
                      value={firma}
                      onChange={(e) => setFirma(e.target.value)}
                      className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">Kontaktperson</label>
                    <input
                      type="text"
                      required
                      value={kontaktperson}
                      onChange={(e) => setKontaktperson(e.target.value)}
                      className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">E-post</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-700 mb-1">Telefon</label>
                      <input
                        type="tel"
                        required
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                        className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">Antall tomter per år</label>
                    <select
                      value={antallTomter}
                      onChange={(e) => setAntallTomter(e.target.value)}
                      className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                    >
                      <option>1-5</option>
                      <option>6-15</option>
                      <option>16-50</option>
                      <option>50+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-700 mb-1">Melding</label>
                    <textarea
                      rows={3}
                      value={melding}
                      onChange={(e) => setMelding(e.target.value)}
                      className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none"
                      placeholder="Beskriv ditt behov..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sender...
                      </>
                    ) : (
                      'Send forespørsel'
                    )}
                  </button>
                  <p className="text-xs text-brand-400 text-center">
                    Vi tar kontakt innen 1 virkedag. hey@nops.no
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
