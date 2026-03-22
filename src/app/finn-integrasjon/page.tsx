'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ExternalLink, Phone, Mail, BarChart3, Eye, TrendingUp, Zap } from 'lucide-react'

export default function FinnIntegrasjonPage() {
  const [formData, setFormData] = useState({ navn: '', epost: '', telefon: '', finnkode: '', melding: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'finn-integrasjon',
          navn: formData.navn,
          email: formData.epost,
          telefon: formData.telefon,
          melding: formData.melding,
          ekstra: { finnkode: formData.finnkode },
        }),
      })
      setSent(true)
    } catch {
      alert('Noe gikk galt. Prøv igjen eller ring oss direkte.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="bg-tomtly-dark text-white">
        <div className="max-w-5xl mx-auto px-6 py-20 md:py-28">
          <Link href="/" className="inline-block mb-8">
            <span className="font-display text-2xl font-bold tracking-tight text-white opacity-40">Tomtly</span>
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#0063fc] flex items-center justify-center">
              <span className="text-white font-bold text-sm">FINN</span>
            </div>
            <span className="text-brand-500">+</span>
            <span className="font-display text-xl font-bold">Tomtly</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            Gjør FINN-annonsen din til en komplett tomtepresentasjon
          </h1>

          <p className="text-lg text-brand-300 max-w-2xl leading-relaxed mb-10">
            Legg til Tomtly-analyse i FINN-annonsen din. Vis kjøpere hva de kan bygge, hva det koster, og hvorfor tomten din er verdt prisen.
          </p>

          <a
            href="#slik-fungerer-det"
            className="inline-flex items-center gap-2 bg-tomtly-accent hover:bg-forest-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Se hvordan det fungerer
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Problemet */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-6">
            Problemet med tomteannonser på FINN
          </h2>
          <p className="text-brand-600 mb-10 max-w-3xl leading-relaxed">
            De fleste tomteannonser på FINN viser et bilde av en gresslette og en pris. Kjøperen må selv finne ut hva som kan bygges, hva det koster, og om tomten passer deres behov. Resultatet? Lange liggetider og lave priser.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Vanlig FINN-annonse */}
            <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
              <h3 className="font-display text-lg font-bold text-red-800 mb-4">Vanlig FINN-annonse</h3>
              <div className="bg-white rounded-xl border border-red-200 overflow-hidden mb-4">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Bilde av tomt (gresslette)</span>
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm text-gray-800">Tomt til salgs – 850 m²</p>
                  <p className="text-xs text-gray-500 mt-1">Prisantydning: 2 000 000 kr</p>
                  <p className="text-xs text-gray-400 mt-2">Regulert til bolig. Kontakt megler for mer info.</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-red-700">
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Ingen husmodeller</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Ingen byggekalkyle</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Ingen verdivurdering</li>
                <li className="flex items-start gap-2"><span className="text-red-400">✗</span> Kjøper vet ikke hva de får</li>
              </ul>
            </div>

            {/* FINN + Tomtly */}
            <div className="bg-forest-50 rounded-2xl p-6 border-2 border-tomtly-accent">
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-4">FINN-annonse + Tomtly</h3>
              <div className="bg-white rounded-xl border border-tomtly-accent/30 overflow-hidden mb-4">
                <div className="bg-gradient-to-br from-forest-100 to-forest-200 h-40 flex items-center justify-center flex-col gap-2">
                  <span className="text-forest-600 text-sm font-medium">3D-visualisering av hus på tomten</span>
                  <span className="text-[10px] text-forest-500 bg-white/80 px-2 py-0.5 rounded">Powered by Tomtly</span>
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm text-gray-800">Tomt til salgs – 850 m² med mulighetsstudie</p>
                  <p className="text-xs text-gray-500 mt-1">Prisantydning: 2 000 000 kr</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">3 husmodeller</span>
                    <span className="text-[10px] bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">Byggekalkyle</span>
                    <span className="text-[10px] bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">Verdivurdering</span>
                  </div>
                  <a href="#" className="text-xs text-tomtly-accent font-semibold mt-2 inline-block">Se komplett analyse på Tomtly →</a>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-forest-700">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" /> 1–5 husmodeller tilpasset tomten</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" /> Komplett byggekalkyle</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" /> Profesjonell verdivurdering</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" /> Kjøper ser ferdig byggeprosjekt</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Slik fungerer det */}
      <section id="slik-fungerer-det" className="py-16 md:py-24 bg-brand-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-12 text-center">
            Slik integrerer du Tomtly med FINN
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Bestill tomtanalyse',
                desc: 'Send oss FINN-koden eller adressen. Vi lager en komplett mulighetsstudie med husmodeller, byggekalkyle og verdivurdering.',
                icon: Zap,
              },
              {
                step: '2',
                title: 'Vi lager materialet',
                desc: 'Du får 3D-bilder, plantegninger og en offentlig analyseside på tomtly.no som du kan lenke til fra FINN-annonsen.',
                icon: BarChart3,
              },
              {
                step: '3',
                title: 'Oppdater FINN-annonsen',
                desc: 'Legg til Tomtly-bildene i annonsen og lenk til den fullstendige analysen. Kjøpere ser med én gang hva de kan bygge.',
                icon: Eye,
              },
            ].map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="bg-white rounded-2xl p-7 border border-brand-200 text-center">
                <div className="w-12 h-12 rounded-full bg-tomtly-accent text-white flex items-center justify-center font-mono font-bold text-lg mx-auto mb-4">
                  {step}
                </div>
                <Icon className="w-6 h-6 text-tomtly-accent mx-auto mb-3" />
                <h3 className="font-display text-lg font-bold text-tomtly-dark mb-2">{title}</h3>
                <p className="text-sm text-brand-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hva du legger til i FINN-annonsen */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-4">
            Hva du legger til i FINN-annonsen
          </h2>
          <p className="text-brand-600 mb-10 max-w-3xl leading-relaxed">
            Tomtly gir deg ferdig materiale du kan bruke direkte i FINN-annonsen. Alt inkludert i analysepakken.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              { title: '3D-visualiseringer', desc: 'Bilder av husmodeller plassert på tomten. Last opp som bilder i FINN-annonsen.' },
              { title: 'Plantegninger', desc: 'Plantegninger for husmodellene som passer tomten. Vis kjøpere nøyaktig hva de får.' },
              { title: 'Byggekalkyle', desc: 'Estimert totalkostnad for tomt + bygg. Kjøpere ser hva det faktisk koster å realisere prosjektet.' },
              { title: 'Lenke til analyseside', desc: 'Legg inn lenke til tomtly.no/tomter/[din-tomt] i annonseteksten. Kjøpere får all info på ett sted.' },
              { title: 'Reguleringsinfo', desc: 'Hva som er tillatt å bygge: BYA, høyde, etasjer, avstand til nabogrense.' },
              { title: 'Verdivurdering', desc: 'Estimert markedsverdi basert på sammenlignbare salg i området.' },
            ].map(({ title, desc }) => (
              <div key={title} className="flex items-start gap-4 bg-brand-50 rounded-xl p-5 border border-brand-100">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-tomtly-dark mb-1">{title}</h3>
                  <p className="text-sm text-brand-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resultater */}
      <section className="py-16 md:py-24 bg-tomtly-dark text-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-12 text-center">
            Hva Tomtly-integrering gjør for FINN-annonsen din
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Eye, value: '3–5×', label: 'flere visninger', desc: 'Annonser med husmodeller og 3D får langt flere klikk enn gresslette-bilder' },
              { icon: TrendingUp, value: '10–20 %', label: 'høyere salgspris', desc: 'Kjøpere forstår verdien og er villige til å betale mer for en tomt med ferdig prosjekt' },
              { icon: BarChart3, value: '50 %', label: 'kortere liggetid', desc: 'Kvalifiserte kjøpere tar raskere beslutning når de ser hva de faktisk kan bygge' },
            ].map(({ icon: Icon, value, label, desc }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center">
                <Icon className="w-8 h-8 text-tomtly-gold mx-auto mb-4" />
                <p className="font-mono text-3xl font-bold text-tomtly-gold mb-1">{value}</p>
                <p className="font-semibold text-white mb-2">{label}</p>
                <p className="text-sm text-brand-300">{desc}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-brand-500 text-center mt-8">
            Estimerte tall basert på sammenligning mellom tomteannonser med og uten mulighetsstudie.
          </p>
        </div>
      </section>

      {/* Eksempler */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-4">
            Se ekte eksempler
          </h2>
          <p className="text-brand-600 mb-10 max-w-3xl">
            Her er tomter som allerede har Tomtly-analyse. Se forskjellen fra en vanlig FINN-annonse.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Bjørnemyrveien 20', sted: 'Nesodden', href: '/tomter/bjornemyrveien-20' },
              { name: 'Bjørnemyrveien 22', sted: 'Nesodden', href: '/tomter/bjornemyrveien-22' },
              { name: 'Gamle Alværnvei 67', sted: 'Nesodden', href: '/tomter/alvaern-67' },
            ].map((tomt) => (
              <Link
                key={tomt.href}
                href={tomt.href}
                className="group bg-brand-50 rounded-2xl border border-brand-200 overflow-hidden hover:border-tomtly-accent transition-colors"
              >
                <div className="bg-gradient-to-br from-forest-100 to-forest-200 h-36 flex items-center justify-center">
                  <span className="text-forest-600 text-sm font-medium group-hover:text-tomtly-accent transition-colors">Se analyse →</span>
                </div>
                <div className="p-5">
                  <p className="font-display font-bold text-tomtly-dark">{tomt.name}</p>
                  <p className="text-sm text-brand-500">{tomt.sted}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Prising */}
      <section className="py-16 md:py-24 bg-brand-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-4">
            Hva koster det?
          </h2>
          <p className="text-brand-600 mb-10 max-w-2xl mx-auto">
            Samme pris som en vanlig tomtanalyse. Du får alt materialet du trenger for FINN-annonsen inkludert.
          </p>

          <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-8 md:p-10 max-w-lg mx-auto">
            <p className="text-sm text-tomtly-accent font-semibold uppercase tracking-wider mb-2">Tomtanalyse + FINN-materiale</p>
            <p className="font-display text-4xl font-bold text-tomtly-dark mb-2">4 990 kr</p>
            <p className="text-brand-500 mb-6">+ 2,5 % ved gjennomført salg</p>
            <ul className="space-y-2 text-sm text-left max-w-xs mx-auto mb-8">
              {[
                'Komplett mulighetsstudie',
                '1–5 husmodeller tilpasset tomten',
                '3D-visualiseringer for FINN',
                'Byggekalkyle og verdivurdering',
                'Egen analyseside på tomtly.no',
                'Markedsføring mot aktive kjøpere',
                'Salg via autorisert meglerpartner',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                  <span className="text-brand-700">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#bestill"
              className="inline-flex items-center gap-2 bg-tomtly-accent hover:bg-forest-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
            >
              Bestill nå
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Bestill / Kontakt */}
      <section id="bestill" className="py-16 md:py-24 bg-tomtly-dark text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Bestill Tomtly-analyse for din FINN-annonse
          </h2>
          <p className="text-brand-400 mb-12 max-w-xl">
            Send oss FINN-koden eller adressen, så tar vi det derfra. Ferdig materiale innen 3–5 virkedager.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              {sent ? (
                <div className="bg-forest-900/30 border border-forest-600/30 rounded-2xl p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-tomtly-accent mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold mb-2">Takk for bestillingen!</h3>
                  <p className="text-brand-300">Vi tar kontakt innen 24 timer.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">FINN-kode eller adresse</label>
                    <input
                      type="text"
                      required
                      value={formData.finnkode}
                      onChange={(e) => setFormData({ ...formData, finnkode: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent"
                      placeholder="F.eks. 123456789 eller Eksempelveien 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">Navn</label>
                    <input
                      type="text"
                      required
                      value={formData.navn}
                      onChange={(e) => setFormData({ ...formData, navn: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent"
                      placeholder="Ditt navn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">E-post</label>
                    <input
                      type="email"
                      required
                      value={formData.epost}
                      onChange={(e) => setFormData({ ...formData, epost: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent"
                      placeholder="din@epost.no"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">Telefon</label>
                    <input
                      type="tel"
                      value={formData.telefon}
                      onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent"
                      placeholder="Ditt telefonnummer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">Melding (valgfritt)</label>
                    <textarea
                      rows={3}
                      value={formData.melding}
                      onChange={(e) => setFormData({ ...formData, melding: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent resize-none"
                      placeholder="Fortell gjerne litt om tomten..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-tomtly-accent hover:bg-forest-600 text-white py-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
                  >
                    {sending ? 'Sender...' : 'Bestill tomtanalyse for FINN'}
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div>
                <p className="text-sm text-brand-400 mb-2">Ring Jakob direkte</p>
                <a href="tel:40603908" className="flex items-center gap-3 text-2xl font-display font-bold hover:text-tomtly-gold transition-colors">
                  <Phone className="w-6 h-6 text-tomtly-gold" />
                  40 60 39 08
                </a>
              </div>
              <div>
                <p className="text-sm text-brand-400 mb-2">E-post</p>
                <a href="mailto:hey@nops.no" className="flex items-center gap-3 text-xl font-display font-bold hover:text-tomtly-gold transition-colors">
                  <Mail className="w-6 h-6 text-tomtly-gold" />
                  hey@nops.no
                </a>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-sm text-brand-300 leading-relaxed">
                  Tomtly er en tjeneste fra NOPS AS (org.nr 933 819 086). Vi har autorisert meglerpartner og samarbeider med Propr for oppgjør.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
