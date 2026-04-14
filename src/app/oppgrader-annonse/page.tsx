'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Home,
  ImageIcon,
  Calculator,
  MapPin,
  FileText,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react'

export default function OppgraderAnnonsePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <ProblemetSection />
      <BeforeAfterSection />
      <HvaFaarDuSection />
      <PrisSection />
      <CTAFormSection />
      <FAQSection />
    </div>
  )
}

/* ─── Hero ─────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-6">
        <Link href="/" className="inline-block mb-8">
          <span className="font-display text-2xl font-bold tracking-tight text-white opacity-40">
            Tomtly
          </span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
          <Sparkles className="w-3.5 h-3.5 text-tomtly-gold" />
          <span className="text-xs text-white/80 font-medium">
            For deg med tomt på FINN
          </span>
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">
          Har du en tomt på FINN?
          <br />
          <span className="text-green-400">Vi gjør annonsen din bedre.</span>
        </h1>

        <p className="text-lg text-brand-300 max-w-2xl leading-relaxed mb-10">
          Vi oppgraderer FINN-annonsen din med husmodeller, kostnadskalkyle og
          profesjonell presentasjon. Samme annonse, mye mer attraktiv.
        </p>

        <a
          href="#skjema"
          className="inline-flex items-center gap-2 bg-tomtly-accent hover:bg-forest-600 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors"
        >
          Oppgrader annonsen min
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  )
}

/* ─── Problemet ────────────────────────────────────────────────────── */

function ProblemetSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-6">
          Derfor scroller kjøpere forbi tomteannonsen din
        </h2>
        <p className="text-brand-600 max-w-3xl leading-relaxed">
          De fleste tomteannonser på FINN viser et kartutsnitt og en pris.
          Kjøperen ser en gresslette, vet ikke hva de kan bygge, og scroller
          videre. Uten visualisering av potensialet er det umulig å fatte
          interesse for noe som bare er et stykke jord.
        </p>
      </div>
    </section>
  )
}

/* ─── Før / Etter ──────────────────────────────────────────────────── */

function BeforeAfterSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-12 text-center">
          Før og etter Tomtly-oppgradering
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Før */}
          <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
            <h3 className="font-display text-lg font-bold text-red-800 mb-4">
              Typisk FINN-annonse
            </h3>
            <div className="bg-white rounded-xl border border-red-200 overflow-hidden mb-4">
              <div className="bg-gray-200 h-40 flex items-center justify-center">
                <span className="text-gray-400 text-sm">
                  Kartutsnitt / bilde av tomt
                </span>
              </div>
              <div className="p-4">
                <p className="font-bold text-sm text-gray-800">
                  Tomt til salgs – 750 m²
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Prisantydning: 1 800 000 kr
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Regulert til bolig. Ta kontakt for visning.
                </p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-red-700">
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span> Ingen husmodeller
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span> Ingen kostnadskalkyle
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span> Ingen plassering på
                tomt
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400">✗</span> Kjøper må gjette
                potensialet
              </li>
            </ul>
          </div>

          {/* Etter */}
          <div className="bg-forest-50 rounded-2xl p-6 border-2 border-tomtly-accent">
            <h3 className="font-display text-lg font-bold text-tomtly-dark mb-4">
              Etter Tomtly-oppgradering
            </h3>
            <div className="bg-white rounded-xl border border-tomtly-accent/30 overflow-hidden mb-4">
              <div className="bg-gradient-to-br from-forest-100 to-forest-200 h-40 flex items-center justify-center flex-col gap-2">
                <span className="text-forest-600 text-sm font-medium">
                  3D-visualisering av hus på tomten
                </span>
                <span className="text-[10px] text-forest-500 bg-white/80 px-2 py-0.5 rounded">
                  Powered by Tomtly
                </span>
              </div>
              <div className="p-4">
                <p className="font-bold text-sm text-gray-800">
                  Tomt til salgs – 750 m² med mulighetsstudie
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Prisantydning: 1 800 000 kr
                </p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">
                    3 husmodeller
                  </span>
                  <span className="text-[10px] bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">
                    Byggekalkyle
                  </span>
                  <span className="text-[10px] bg-forest-100 text-forest-700 px-2 py-0.5 rounded-full">
                    Plasseringskart
                  </span>
                </div>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-forest-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                Husmodeller tilpasset tomten
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                Komplett kostnadskalkyle
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                Plasseringskart med husmodell
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                Profesjonell beskrivelse
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Hva får du ───────────────────────────────────────────────────── */

function HvaFaarDuSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-10">
          Hva du får
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              icon: Home,
              title: 'Husmodeller',
              desc: 'Opptil 5 husmodeller som passer tomten din, med plantegninger og fasader.',
            },
            {
              icon: Calculator,
              title: 'Kostnadskalkyle',
              desc: 'Estimert totalkostnad for tomt + bygging. Kjøperen ser hva prosjektet koster.',
            },
            {
              icon: MapPin,
              title: 'Plasseringskart',
              desc: 'Kart som viser husmodellen plassert på tomten med korrekte avstander.',
            },
            {
              icon: FileText,
              title: 'Profesjonell beskrivelse',
              desc: 'Ferdig annonsetekst som fremhever tomtens potensial og byggemuligheter.',
            },
            {
              icon: ImageIcon,
              title: '3D-visualiseringer',
              desc: 'Bilder du kan laste rett opp i FINN-annonsen. Viser ferdig hus på tomten.',
            },
            {
              icon: Sparkles,
              title: 'Tomtly-analyseside',
              desc: 'Offentlig side på tomtly.no du kan lenke til fra FINN for full oversikt.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-brand-50 rounded-xl p-5 border border-brand-100"
            >
              <Icon className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-tomtly-dark mb-1">
                  {title}
                </h3>
                <p className="text-sm text-brand-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Pris ─────────────────────────────────────────────────────────── */

function PrisSection() {
  return (
    <section className="py-16 md:py-24 bg-tomtly-dark text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
          Enkel og tydelig pris
        </h2>
        <p className="text-brand-300 mb-10 max-w-2xl mx-auto">
          Du betaler en engangspris for oppgraderingen. Ingen abonnement, ingen
          skjulte kostnader.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 max-w-lg mx-auto">
          <p className="text-sm text-tomtly-gold font-semibold uppercase tracking-wider mb-2">
            Oppgrader FINN-annonse
          </p>
          <div className="flex items-baseline justify-center gap-2 mb-2">
            <span className="font-mono text-5xl font-bold text-white">
              4 990
            </span>
            <span className="text-brand-400">kr</span>
          </div>
          <p className="text-sm text-brand-400 mb-6">Engangspris</p>

          <ul className="space-y-3 text-left max-w-xs mx-auto mb-8">
            {[
              'Husmodeller tilpasset tomten',
              'Kostnadskalkyle',
              'Plasseringskart',
              '3D-visualiseringer',
              'Profesjonell beskrivelse',
              'Offentlig analyseside',
            ].map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-brand-200"
              >
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                {f}
              </li>
            ))}
          </ul>

          <a
            href="#skjema"
            className="inline-flex items-center gap-2 bg-tomtly-accent hover:bg-forest-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Kom i gang
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <p className="text-sm text-brand-400 mt-8 max-w-xl mx-auto">
          Vil du ha full salgspakke med markedsføring, salgsdashboard og
          Tomtekonsulent? Da er det 4 990 kr + 2 % suksesshonorar + mva ved
          salg (min. 20 000 kr + mva).{' '}
          <Link
            href="/for-tomteeiere"
            className="text-tomtly-gold underline hover:text-white transition-colors"
          >
            Les mer om salgspakken
          </Link>
        </p>
      </div>
    </section>
  )
}

/* ─── CTA-skjema ───────────────────────────────────────────────────── */

function CTAFormSection() {
  const [form, setForm] = useState({
    navn: '',
    epost: '',
    telefon: '',
    finnUrl: '',
  })
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
          type: 'oppgrader-finn-annonse',
          navn: form.navn,
          email: form.epost,
          telefon: form.telefon,
          ekstra: { finnUrl: form.finnUrl },
        }),
      })
      setSent(true)
    } catch {
      alert('Noe gikk galt. Prøv igjen eller send e-post til hey@nops.no.')
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <section id="skjema" className="py-16 md:py-24 bg-forest-50">
        <div className="max-w-lg mx-auto px-6 text-center">
          <CheckCircle2 className="w-12 h-12 text-tomtly-accent mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-3">
            Takk for henvendelsen!
          </h2>
          <p className="text-brand-600">
            Vi tar kontakt innen 24 timer for å gå gjennom FINN-annonsen din og
            starte oppgraderingen.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="skjema" className="py-16 md:py-24 bg-brand-50">
      <div className="max-w-lg mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-3 text-center">
          Oppgrader annonsen din nå
        </h2>
        <p className="text-brand-600 text-center mb-10">
          Legg inn FINN-lenken din, så tar vi det derfra.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-tomtly-dark mb-1">
              Navn
            </label>
            <input
              type="text"
              required
              value={form.navn}
              onChange={(e) => setForm({ ...form, navn: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-brand-200 focus:border-tomtly-accent focus:ring-1 focus:ring-tomtly-accent outline-none transition-colors"
              placeholder="Ola Nordmann"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-tomtly-dark mb-1">
              E-post
            </label>
            <input
              type="email"
              required
              value={form.epost}
              onChange={(e) => setForm({ ...form, epost: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-brand-200 focus:border-tomtly-accent focus:ring-1 focus:ring-tomtly-accent outline-none transition-colors"
              placeholder="ola@eksempel.no"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-tomtly-dark mb-1">
              Telefon
            </label>
            <input
              type="tel"
              required
              value={form.telefon}
              onChange={(e) => setForm({ ...form, telefon: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-brand-200 focus:border-tomtly-accent focus:ring-1 focus:ring-tomtly-accent outline-none transition-colors"
              placeholder="912 34 567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-tomtly-dark mb-1">
              FINN-lenke
            </label>
            <input
              type="url"
              required
              value={form.finnUrl}
              onChange={(e) => setForm({ ...form, finnUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-brand-200 focus:border-tomtly-accent focus:ring-1 focus:ring-tomtly-accent outline-none transition-colors"
              placeholder="https://www.finn.no/realestate/plots/ad.html?finnkode=..."
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-tomtly-accent hover:bg-forest-600 disabled:opacity-50 text-white font-semibold py-3.5 rounded-lg transition-colors"
          >
            {sending ? 'Sender...' : 'Send inn – vi tar kontakt'}
          </button>

          <p className="text-xs text-brand-400 text-center">
            Vi kontakter deg innen 24 timer. Ingen forpliktelser.
          </p>
        </form>
      </div>
    </section>
  )
}

/* ─── FAQ ──────────────────────────────────────────────────────────── */

function FAQItem({
  q,
  a,
}: {
  q: string
  a: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-brand-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-semibold text-tomtly-dark pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-brand-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brand-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <p className="text-brand-600 text-sm leading-relaxed pb-5">{a}</p>
      )}
    </div>
  )
}

function FAQSection() {
  const faqs = [
    {
      q: 'Må jeg endre FINN-annonsen min?',
      a: 'Nei, du beholder eksisterende annonse. Vi gir deg ferdig materiale (bilder, tekst, lenke) som du legger til selv, eller vi kan hjelpe deg med det.',
    },
    {
      q: 'Hva får jeg levert?',
      a: 'Husmodeller tilpasset tomten, kostnadskalkyle, plasseringskart, 3D-visualiseringer, profesjonell beskrivelse og en offentlig analyseside på tomtly.no.',
    },
    {
      q: 'Hvor lang tid tar det?',
      a: 'Vanligvis 3–5 virkedager fra vi mottar bestillingen. Du får beskjed når materialet er klart.',
    },
    {
      q: 'Hva er forskjellen på dette og full salgspakke?',
      a: 'Oppgraderingspakken gir deg materiale til FINN-annonsen for en engangspris på 4 990 kr. Full salgspakke inkluderer i tillegg markedsføring, salgsdashboard og personlig Tomtekonsulent for 4 990 kr + 2 % suksesshonorar + mva ved salg (min. 20 000 kr + mva).',
    },
    {
      q: 'Kan jeg oppgradere til full salgspakke senere?',
      a: 'Ja. Beløpet du har betalt for oppgraderingen trekkes fra etableringskostnaden i salgspakken.',
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-10 text-center">
          Ofte stilte spørsmål
        </h2>
        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
