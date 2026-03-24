'use client'

import { useState } from 'react'
import { MapPin, CheckCircle2, Loader2, Phone, Mail, ArrowRight, TrendingUp } from 'lucide-react'

export function VerdivurderingLead() {
  const [adresse, setAdresse] = useState('')
  const [navn, setNavn] = useState('')
  const [epost, setEpost] = useState('')
  const [telefon, setTelefon] = useState('')
  const [sender, setSender] = useState(false)
  const [sendt, setSendt] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!adresse.trim() || !epost.trim() || !telefon.trim()) return
    setSender(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'verdivurdering-lead',
          navn: navn.trim(),
          epost: epost.trim(),
          telefon: telefon.trim(),
          ekstra: { adresse: adresse.trim() },
        }),
      })
    } catch {}
    setSendt(true)
    setSender(false)
  }

  if (sendt) {
    return (
      <section className="bg-tomtly-dark py-16 lg:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-full bg-tomtly-accent/20 flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="font-display text-2xl font-bold text-white mb-3">
            Takk! Vi starter verdivurderingen.
          </h3>
          <p className="text-brand-300 mb-2">
            Du hører fra oss innen <span className="text-white font-semibold">1 virkedag</span> med en verdivurdering av tomten på {adresse}.
          </p>
          <p className="text-sm text-brand-500">
            Vi sender vurderingen til {epost} og ringer deg på {telefon} for å gå gjennom resultatene.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="verdivurdering" className="bg-tomtly-dark py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: value proposition */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-tomtly-accent/20 text-green-400 text-xs font-semibold rounded-full mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              Gratis verdivurdering
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Hva er tomten din verdt?
            </h2>
            <p className="text-brand-300 leading-relaxed mb-6">
              Få en profesjonell verdivurdering av tomten din – helt gratis og uforpliktende.
              Vår tomtekonsulent vurderer regulering, beliggenhet, marked og utbyggingspotensial.
            </p>
            <div className="space-y-3">
              {[
                'Verdivurdering basert på sammenlignbare salg',
                'Vurdering av regulering og byggemuligheter',
                'Svar innen 1 virkedag',
                'Helt gratis – ingen forpliktelser',
              ].map((punkt) => (
                <div key={punkt} className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span className="text-sm text-brand-300">{punkt}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Adresse til tomten</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                <input
                  type="text"
                  value={adresse}
                  onChange={e => setAdresse(e.target.value)}
                  placeholder="F.eks. Bjørnemyrveien 20, Nesodden"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-500 text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-1.5">Ditt navn</label>
              <input
                type="text"
                value={navn}
                onChange={e => setNavn(e.target.value)}
                placeholder="Fullt navn"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-500 text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">E-post</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                  <input
                    type="email"
                    value={epost}
                    onChange={e => setEpost(e.target.value)}
                    placeholder="din@epost.no"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-500 text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1.5">Telefon</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                  <input
                    type="tel"
                    value={telefon}
                    onChange={e => setTelefon(e.target.value)}
                    placeholder="Ditt nummer"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-500 text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={sender || !adresse.trim() || !epost.trim() || !telefon.trim()}
              className="w-full py-3.5 bg-tomtly-accent hover:bg-forest-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {sender ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Sender...</>
              ) : (
                <>Få gratis verdivurdering <ArrowRight className="w-4 h-4" /></>
              )}
            </button>

            <p className="text-[10px] text-brand-500 text-center">
              Vi kontakter deg innen 1 virkedag. Ingen salgsforpliktelse.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
