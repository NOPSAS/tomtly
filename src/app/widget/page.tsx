'use client'

import { useState } from 'react'
import {
  Code2,
  Copy,
  Check,
  Heart,
  Users,
  Zap,
  Award,
  Bell,
  ArrowRight,
  Phone,
} from 'lucide-react'

export default function WidgetPage() {
  return (
    <>
      <HeroSection />
      <HvaErWidgeten />
      <LiveDemo />
      <HvordanInstallere />
      <Kodesnippet />
      <Fordeler />
      <CTASection />
      <FooterNote />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Code2 className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              Widget for meglere
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Tomtly-widget for meglere
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Legg til tomtanalyse på din nettside – gratis. Gi kundene dine mer
            verdi og få flere leads.
          </p>

          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Bli meglerpartner
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function HvaErWidgeten() {
  const punkter = [
    {
      icon: Code2,
      tekst: 'En enkel kodebit du legger inn på din nettside',
    },
    {
      icon: Users,
      tekst:
        'Kjøpere og selgere kan sjekke hva de kan bygge på tomten – direkte fra din side',
    },
    {
      icon: Bell,
      tekst: 'Du får varsel når noen bruker widgeten på dine sider',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4 text-center">
          Hva er Tomtly-widgeten?
        </h2>
        <p className="text-brand-500 text-center mb-12 max-w-2xl mx-auto">
          En ferdig komponent du legger på din megler-side, slik at besøkende
          kan sjekke tomtens potensial uten å forlate nettsiden din.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {punkter.map((p, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-tomtly-accent" />
              </div>
              <p className="text-tomtly-dark font-medium leading-relaxed">
                {p.tekst}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LiveDemo() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4 text-center">
          Slik ser widgeten ut
        </h2>
        <p className="text-brand-500 text-center mb-12 max-w-2xl mx-auto">
          Her er en forhåndsvisning av hvordan widgeten ser ut når den er
          integrert på din nettside.
        </p>

        {/* Mock website container */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl border border-brand-200 p-6 sm:p-10">
          <div className="text-xs text-brand-400 mb-4 font-mono">
            dinmeglernettside.no/bolig/eksempel
          </div>
          <div className="h-px bg-brand-200 mb-6" />

          {/* Widget preview */}
          <div className="rounded-xl border border-brand-200 shadow-lg overflow-hidden">
            <div className="bg-tomtly-dark px-6 py-4">
              <h3 className="text-white font-display text-lg font-semibold">
                Tomtly – Hva kan du bygge?
              </h3>
            </div>
            <div className="p-6 bg-white space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">
                  Skriv inn adresse
                </label>
                <input
                  type="text"
                  placeholder="F.eks. Storgata 1, 0155 Oslo"
                  className="w-full px-4 py-2.5 border border-brand-300 rounded-lg text-sm text-brand-700 placeholder:text-brand-400 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/30 focus:border-tomtly-accent"
                  readOnly
                />
              </div>
              <button className="w-full py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors text-sm">
                Sjekk tomten
              </button>
              <p className="text-center text-xs text-brand-400">
                Powered by{' '}
                <span className="font-semibold text-tomtly-accent">Tomtly</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HvordanInstallere() {
  const steg = [
    {
      nr: '1',
      tittel: 'Registrer deg som meglerpartner (gratis)',
      beskrivelse:
        'Fyll ut skjemaet nederst på denne siden. Du får tilgang med en gang.',
    },
    {
      nr: '2',
      tittel: 'Kopier koden nedenfor',
      beskrivelse:
        'Du får en unik partner-ID som kobles til din konto, slik at leads sendes til deg.',
    },
    {
      nr: '3',
      tittel: 'Lim den inn på din nettside',
      beskrivelse:
        'Legg inn koden der du vil at widgeten skal vises. Den tilpasser seg bredden automatisk.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-12 text-center">
          Slik installerer du widgeten
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steg.map((s) => (
            <div key={s.nr} className="text-center">
              <div className="w-10 h-10 rounded-full bg-tomtly-accent text-white font-bold text-lg flex items-center justify-center mx-auto mb-4">
                {s.nr}
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">
                {s.tittel}
              </h3>
              <p className="text-sm text-brand-500 leading-relaxed">
                {s.beskrivelse}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Kodesnippet() {
  const [kopiert, setKopiert] = useState(false)

  const kode = `<iframe
  src="https://tomtly.no/hva-kan-jeg-bygge?embed=true&partner=DIN_MEGLER_ID"
  width="100%"
  height="400"
  frameborder="0"
  style="border-radius: 12px; border: 1px solid #e5e7eb;">
</iframe>`

  const kopierKode = async () => {
    try {
      await navigator.clipboard.writeText(kode)
      setKopiert(true)
      setTimeout(() => setKopiert(false), 2000)
    } catch {
      // Fallback – ignored
    }
  }

  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4 text-center">
          Koden du trenger
        </h2>
        <p className="text-brand-500 text-center mb-10 max-w-xl mx-auto">
          Kopier koden og lim den inn der du vil at widgeten skal vises.
          Erstatt <code className="bg-brand-200 px-1.5 py-0.5 rounded text-sm font-mono">DIN_MEGLER_ID</code> med
          din unike partner-ID.
        </p>

        <div className="max-w-2xl mx-auto">
          <div className="bg-tomtly-dark rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="text-xs text-brand-400 font-mono">HTML</span>
              <button
                onClick={kopierKode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-md transition-colors"
              >
                {kopiert ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    Kopiert!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Kopier kode
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 sm:p-6 overflow-x-auto text-sm leading-relaxed">
              <code className="text-green-400 font-mono">{kode}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fordeler() {
  const fordeler = [
    {
      icon: Heart,
      tittel: 'Mer verdi for kundene',
      beskrivelse: 'Kjøpere ser mulighetene direkte på din nettside.',
    },
    {
      icon: Users,
      tittel: 'Flere leads',
      beskrivelse: 'Alle forespørsler fra widgeten sendes direkte til deg.',
    },
    {
      icon: Zap,
      tittel: 'Gratis',
      beskrivelse: 'Ingen kostnad, ingen bindingstid. Helt risikofritt.',
    },
    {
      icon: Award,
      tittel: 'Profesjonell',
      beskrivelse: 'Styrker din digitale profil og skiller deg ut.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-12 text-center">
          Fordeler for deg som megler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {fordeler.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-brand-200 text-center hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-full bg-forest-100 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-5 h-5 text-tomtly-accent" />
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">
                {f.tittel}
              </h3>
              <p className="text-sm text-brand-500 leading-relaxed">
                {f.beskrivelse}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const [form, setForm] = useState({
    navn: '',
    firma: '',
    epost: '',
    telefon: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'widget-megler',
          navn: form.navn,
          firma: form.firma,
          epost: form.epost,
          telefon: form.telefon,
        }),
      })

      if (res.ok) {
        setStatus('sent')
        setForm({ navn: '', firma: '', epost: '', telefon: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="kontakt" className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Bli meglerpartner – helt gratis
          </h2>
          <p className="text-brand-400 mb-10">
            Fyll ut skjemaet, så tar vi kontakt innen 24 timer.
          </p>

          {status === 'sent' ? (
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-8 text-center">
              <Check className="w-10 h-10 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">
                Takk for din henvendelse!
              </h3>
              <p className="text-brand-400">
                Vi tar kontakt med deg innen kort tid.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">
                  Navn
                </label>
                <input
                  type="text"
                  required
                  value={form.navn}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, navn: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                  placeholder="Ditt fulle navn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">
                  Firma
                </label>
                <input
                  type="text"
                  required
                  value={form.firma}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, firma: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                  placeholder="Meglerforetakets navn"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">
                  E-post
                </label>
                <input
                  type="email"
                  required
                  value={form.epost}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, epost: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                  placeholder="din@epost.no"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-300 mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={form.telefon}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, telefon: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:border-tomtly-accent"
                  placeholder="Ditt telefonnummer"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? 'Sender...' : 'Send henvendelse'}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">
                  Noe gikk galt. Prøv igjen eller ring oss.
                </p>
              )}
            </form>
          )}

          <div className="mt-8 flex items-center justify-center gap-2 text-brand-400">
            <Phone className="w-4 h-4" />
            <span className="text-sm">
              Eller ring oss:{' '}
              <a
                href="tel:+4740603908"
                className="text-white font-medium hover:text-tomtly-gold transition-colors"
              >
                40 60 39 08
              </a>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function FooterNote() {
  return (
    <section className="bg-brand-950 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-brand-500">
          Tomtly er en tjeneste fra NOPS AS (org.nr 933 819 086)
        </p>
      </div>
    </section>
  )
}
