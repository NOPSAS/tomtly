import type { Metadata } from 'next'
import Link from 'next/link'
import { Handshake, ArrowRight, ExternalLink, CheckCircle2, Mail, Phone, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Samarbeidspartnere | Tomtly',
  description:
    'Tomtly samarbeider med ledende aktører innen eiendomsoppgjør, husleverandører, banker og kommuner for å gi tomteeiere en komplett løsning fra analyse til ferdig salg.',
  openGraph: {
    title: 'Samarbeidspartnere | Tomtly',
    description:
      'Møt selskapene Tomtly samarbeider med — fra eiendomsoppgjør til husleverandører.',
  },
}

interface Partner {
  navn: string
  kategori: string
  beskrivelse: string
  rolle: string
  fordelerForKunde: string[]
  url?: string
  kontakt?: { navn: string; rolle?: string; epost?: string; telefon?: string }
  uthevet?: boolean
}

const PARTNERE: Partner[] = [
  {
    navn: 'Proff Oppgjør AS',
    kategori: 'Eiendomsoppgjør',
    beskrivelse:
      'Proff Oppgjør AS er Tomtlys foretrukne oppgjørspartner. De håndterer kontrakt, tinglysing og pengeoverføring trygt og profesjonelt — til en fastpris som er flere tusen kroner under hva tradisjonell megler tar.',
    rolle:
      'Når en tomt selges via Tomtly, tar Proff Oppgjør AS hele det juridiske oppgjøret — fra signert kjøpekontrakt til ferdig overlevering.',
    fordelerForKunde: [
      'Fastpris 9 000 kr + mva (uavhengig av salgssum)',
      '545 kr for tinglysing av sikringsobligasjon',
      'Digital kontraktsignering og dokumenthåndtering',
      'Trygg overføring av penger og eiendom',
      'Egen kontaktperson gjennom hele prosessen',
    ],
    url: 'https://xn--proffoppgjr-pgb.no/',
    kontakt: {
      navn: 'Marie Nordhagen',
      rolle: 'Kontaktperson Tomtly-samarbeidet',
      epost: 'marie@proffoppgjor.no',
      telefon: '+47 915 98 990',
    },
    uthevet: true,
  },
]

export default function SamarbeidspartnereSide() {
  return (
    <main className="bg-tomtly-warm min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-brand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-2 text-tomtly-accent mb-3">
            <Handshake className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Samarbeidspartnere
            </span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-tomtly-dark mb-4">
            Sterke partnere, komplett løsning
          </h1>
          <p className="text-lg text-brand-600 max-w-2xl">
            Tomtly samarbeider med ledende aktører for å gi tomteeiere alt de
            trenger — fra første analyse til ferdig oppgjør. Her er selskapene vi
            jobber tettest med.
          </p>
        </div>
      </section>

      {/* Partner-liste */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {PARTNERE.map((p) => (
            <div
              key={p.navn}
              className={`bg-white rounded-2xl border p-8 lg:p-10 ${
                p.uthevet
                  ? 'border-tomtly-accent shadow-lg ring-1 ring-tomtly-accent/20'
                  : 'border-brand-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                {/* Venstre: tekst */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block px-2.5 py-1 bg-forest-50 text-tomtly-accent text-xs font-semibold rounded-full uppercase tracking-wide">
                      {p.kategori}
                    </span>
                    {p.uthevet && (
                      <span className="inline-block px-2.5 py-1 bg-tomtly-gold/20 text-tomtly-dark text-xs font-semibold rounded-full">
                        Foretrukken partner
                      </span>
                    )}
                  </div>

                  <h2 className="font-display text-3xl font-bold text-tomtly-dark mb-3">
                    {p.navn}
                  </h2>

                  <p className="text-brand-600 leading-relaxed mb-4">{p.beskrivelse}</p>

                  <div className="bg-brand-50 rounded-xl p-4 mb-6">
                    <p className="text-sm text-brand-700">
                      <strong className="text-tomtly-dark">Rolle i samarbeidet:</strong>{' '}
                      {p.rolle}
                    </p>
                  </div>

                  <h3 className="font-semibold text-tomtly-dark mb-3 text-sm uppercase tracking-wide">
                    Hva kunden får
                  </h3>
                  <ul className="space-y-2 mb-6">
                    {p.fordelerForKunde.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-brand-700"
                      >
                        <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Høyre: kontakt-kort */}
                {p.kontakt && (
                  <div className="lg:w-72 flex-shrink-0">
                    <div className="bg-tomtly-dark rounded-xl p-6 text-white">
                      <p className="text-xs text-brand-400 uppercase tracking-wide mb-3">
                        Kontaktperson
                      </p>
                      <p className="font-display text-lg font-bold mb-1">
                        {p.kontakt.navn}
                      </p>
                      {p.kontakt.rolle && (
                        <p className="text-xs text-brand-300 mb-4">{p.kontakt.rolle}</p>
                      )}

                      <div className="space-y-2 text-sm">
                        {p.kontakt.epost && (
                          <a
                            href={`mailto:${p.kontakt.epost}`}
                            className="flex items-center gap-2 text-brand-200 hover:text-white transition-colors"
                          >
                            <Mail className="w-4 h-4 flex-shrink-0" />
                            <span className="break-all">{p.kontakt.epost}</span>
                          </a>
                        )}
                        {p.kontakt.telefon && (
                          <a
                            href={`tel:${p.kontakt.telefon.replace(/\s/g, '')}`}
                            className="flex items-center gap-2 text-brand-200 hover:text-white transition-colors"
                          >
                            <Phone className="w-4 h-4 flex-shrink-0" />
                            {p.kontakt.telefon}
                          </a>
                        )}
                        {p.url && (
                          <a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-brand-200 hover:text-white transition-colors"
                          >
                            <Globe className="w-4 h-4 flex-shrink-0" />
                            Besøk nettside
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vil du bli partner? */}
      <section className="py-16 lg:py-20 bg-brand-50 border-t border-brand-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-tomtly-dark mb-4">
            Vil du bli partner?
          </h2>
          <p className="text-brand-600 mb-8">
            Tomtly er alltid på jakt etter sterke samarbeidspartnere innen
            eiendomsoppgjør, finansiering, husleverandører, kommuner og andre
            aktører i tomtemarkedet. Ta kontakt for en uforpliktende prat.
          </p>
          <Link
            href="mailto:hey@nops.no?subject=Partnerskap med Tomtly"
            className="inline-flex items-center gap-2 px-6 py-3 bg-tomtly-accent text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors"
          >
            Ta kontakt
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
