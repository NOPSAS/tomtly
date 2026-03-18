'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Home,
  TrendingUp,
  Eye,
  Users,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  MapPin,
  Star,
  FileText,
  Handshake,
  Zap,
} from 'lucide-react'

// ============================================================
// LEVERANDØRPORTAL – For hus- og hytteleverandører
// som ønsker å få sine modeller vist på Tomtly-tomter.
// ============================================================

export default function LeverandorSide() {
  return (
    <>
      <LeverandorHero />
      <HvordanDetFungerer />
      <Fordeler />
      <Partnernivaaer />
      <EksisterendePartnere />
      <Krav />
      <LeverandorCTA />
    </>
  )
}

// ---- Hero ----

function LeverandorHero() {
  return (
    <section className="relative bg-tomtly-dark overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-earth-950/50 border border-earth-700/30 rounded-full mb-6">
            <Handshake className="w-3.5 h-3.5 text-tomtly-gold" />
            <span className="text-xs text-earth-300 font-medium">
              Partnerprogram for leverandører
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white leading-[1.1] mb-6">
            Vis husene dine
            <br />
            <span className="text-tomtly-gold">på riktig tomt</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Tomtly kobler ferdighusleverandører med tomtekjøpere. Dine
            husmodeller vises direkte på tomtesidene – tilpasset regulering,
            prisklasse og tomtens forutsetninger.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#bli-partner"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-gold text-tomtly-dark font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Bli partner
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#hvordan"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Slik fungerer det
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-10 border-t border-brand-800">
            <div>
              <p className="text-2xl font-bold text-white">2 400+</p>
              <p className="text-sm text-brand-500">Tomter på plattformen</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">85%</p>
              <p className="text-sm text-brand-500">Velger ferdighus</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">12x</p>
              <p className="text-sm text-brand-500">Mer synlighet enn FINN</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Hvordan det fungerer ----

function HvordanDetFungerer() {
  const steg = [
    {
      nummer: '01',
      tittel: 'Send oss modellkatalogen',
      beskrivelse:
        'Last opp husmodellene deres med mål, priser per prisklasse, og leveringstider. Vi trenger BRA, plantegninger og fra-priser.',
    },
    {
      nummer: '02',
      tittel: 'Vi matcher mot tomter',
      beskrivelse:
        'Vårt system matcher husmodellene med tomter basert på regulering, tomtestørrelse, prisklasse og bygningstype.',
    },
    {
      nummer: '03',
      tittel: 'Synlig for kjøpere',
      beskrivelse:
        'Kjøpere ser deres husmodeller direkte på tomtesidene, med priser og visualiseringer tilpasset tomten.',
    },
    {
      nummer: '04',
      tittel: 'Leads og salg',
      beskrivelse:
        'Når en kjøper velger deres husmodell, mottar dere et kvalifisert lead med tomteinfo og kontaktdetaljer.',
    },
  ]

  return (
    <section id="hvordan" className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik fungerer partnerskapet
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Fra katalog til salg – vi håndterer matchingen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steg.map((s) => (
            <div key={s.nummer}>
              <div className="text-5xl font-display font-bold text-brand-200 mb-4">
                {s.nummer}
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">{s.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                {s.beskrivelse}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Fordeler ----

function Fordeler() {
  const fordeler = [
    {
      ikon: Eye,
      tittel: 'Synlighet der det teller',
      beskrivelse:
        'Husmodellene vises i kjøpsøyeblikket – når kjøperen allerede ser for seg å bygge på tomten.',
    },
    {
      ikon: MapPin,
      tittel: 'Automatisk matching',
      beskrivelse:
        'Vi matcher husmodeller med tomter basert på regulering, BYA, høydekrav og prisklasse. Bare relevante hus vises.',
    },
    {
      ikon: TrendingUp,
      tittel: 'Kvalifiserte leads',
      beskrivelse:
        'Kjøperen har allerede valgt tomt, prisklasse og sett prisen. Dette er varme leads.',
    },
    {
      ikon: BarChart3,
      tittel: 'Innsikt og statistikk',
      beskrivelse:
        'Se hvilke modeller som er mest populære, på hvilke tomter, og i hvilke prisklasser.',
    },
    {
      ikon: Zap,
      tittel: 'Konsekvente priser',
      beskrivelse:
        'Ferdighus gir forutsigbare priser. Kjøperen stoler på tallene fordi de er reelle.',
    },
    {
      ikon: Star,
      tittel: 'Merkevarebygging',
      beskrivelse:
        'Deres logo og merkevare vises på tomtesidene. Bygg tillit hos morgendagens boligkjøpere.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hvorfor Tomtly?
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Nå tomtekjøpere i det øyeblikket de bestemmer seg for å bygge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fordeler.map((f) => (
            <div
              key={f.tittel}
              className="bg-brand-50 rounded-xl p-6 border border-brand-100"
            >
              <div className="w-10 h-10 bg-tomtly-gold/10 rounded-lg flex items-center justify-center mb-4">
                <f.ikon className="w-5 h-5 text-tomtly-gold" />
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">{f.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                {f.beskrivelse}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Partnernivåer ----

function Partnernivaaer() {
  const nivaaer = [
    {
      id: 'basis',
      navn: 'Basis',
      pris: '10 000',
      periode: '/mnd',
      beskrivelse: 'For leverandører som vil teste plattformen.',
      features: [
        'Opptil 10 husmodeller',
        'Synlig på matchende tomter',
        'Månedlig lead-rapport',
        'Logo på tomtesider',
      ],
    },
    {
      id: 'partner',
      navn: 'Partner',
      pris: '20 000',
      periode: '/mnd',
      popular: true,
      beskrivelse: 'For leverandører som satser på digital salgskanal.',
      features: [
        'Ubegrenset husmodeller',
        'Prioritert visning',
        'Sanntids leads',
        'Statistikk-dashboard',
        'Visualiseringer av hus på tomt',
        'Co-branding på tomtesider',
      ],
    },
    {
      id: 'premium',
      navn: 'Premium',
      pris: 'Avtale',
      periode: '',
      beskrivelse: 'For store leverandører med nasjonale ambisjoner.',
      features: [
        'Alt i Partner',
        'Egne landingssider',
        'API-integrasjon',
        'Dedikert kontaktperson',
        'Kvartalsvise strategimøter',
        'Provisjonsmodell tilgjengelig',
      ],
    },
  ]

  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Partnernivåer
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Velg nivået som passer for dere. Alle avtaler krever godkjenning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {nivaaer.map((n) => (
            <div
              key={n.id}
              className={`bg-white rounded-2xl p-7 border-2 relative ${
                n.popular ? 'border-tomtly-gold' : 'border-brand-200'
              }`}
            >
              {n.popular && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-tomtly-gold text-tomtly-dark text-xs font-semibold rounded-full">
                  Anbefalt
                </div>
              )}
              <p className="text-sm font-medium text-brand-500 mb-1">{n.navn}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold text-tomtly-dark">{n.pris}</span>
                {n.periode && <span className="text-brand-500 text-sm">{n.periode}</span>}
              </div>
              <p className="text-xs text-brand-500 mb-5">{n.beskrivelse}</p>
              <ul className="space-y-2.5 mb-6">
                {n.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-brand-700">
                    <CheckCircle2 className="w-4 h-4 text-tomtly-gold flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#bli-partner"
                className={`block w-full text-center px-4 py-2.5 font-medium rounded-lg transition-colors ${
                  n.popular
                    ? 'bg-tomtly-gold text-tomtly-dark hover:bg-yellow-500'
                    : 'border-2 border-brand-200 text-brand-700 hover:bg-brand-50'
                }`}
              >
                Søk om partnerskap
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Eksisterende partnere ----

function EksisterendePartnere() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs text-brand-400 uppercase tracking-widest mb-8">
          Partnere på plattformen
        </p>
        <div className="flex items-center justify-center gap-12 flex-wrap opacity-50 grayscale">
          <span className="text-lg font-semibold text-brand-600">Nordbohus</span>
          <span className="text-lg font-semibold text-brand-600">Mesterhus</span>
          <span className="text-lg font-semibold text-brand-600">BoligPartner</span>
          <span className="text-lg font-semibold text-brand-600">Hellvik Hus</span>
          <span className="text-lg font-semibold text-brand-600">Norgeshus</span>
        </div>
      </div>
    </section>
  )
}

// ---- Krav ----

function Krav() {
  return (
    <section className="bg-tomtly-warm py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-6 text-center">
          Krav til leverandørpartnere
        </h2>

        <div className="bg-white rounded-xl border border-brand-200 p-6 space-y-4">
          {[
            {
              tittel: 'Konsekvente priser',
              beskrivelse:
                'Dere må kunne oppgi faste fra-priser per husmodell og prisklasse. Prisene vises til kjøpere og må være reelle.',
            },
            {
              tittel: 'Katalog med tekniske data',
              beskrivelse:
                'Hver husmodell trenger: BRA, plantegninger, antall soverom/bad, energiklasse, og leveringstid.',
            },
            {
              tittel: 'Nasjonal eller regional levering',
              beskrivelse:
                'Dere må kunne levere i minst én region. Vi matcher kun tomter i dekningsområdet deres.',
            },
            {
              tittel: 'Kvalitetsgodkjenning',
              beskrivelse:
                'Alle partnere gjennomgår en kvalitetsvurdering. Vi krever dokumentert erfaring og referanser.',
            },
            {
              tittel: 'Avtale med Tomtly/NOPS',
              beskrivelse:
                'Partnerskap krever en signert samarbeidsavtale som regulerer priser, synlighet, leads og provisjon.',
            },
          ].map((krav) => (
            <div key={krav.tittel} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-tomtly-dark">{krav.tittel}</p>
                <p className="text-sm text-brand-600">{krav.beskrivelse}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- CTA / Søknadsskjema ----

function LeverandorCTA() {
  const [sendt, setSendt] = useState(false)

  if (sendt) {
    return (
      <section id="bli-partner" className="bg-tomtly-dark py-20 lg:py-28">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-forest-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white mb-3">
            Takk for interessen!
          </h2>
          <p className="text-brand-400">
            Vi gjennomgår søknaden deres og tar kontakt innen 3 virkedager
            for å diskutere partnerskap og avtalevilkår.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="bli-partner" className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Bli leverandørpartner
          </h2>
          <p className="text-brand-400">
            Fyll ut skjemaet, så tar vi kontakt for å diskutere samarbeid og avtalevilkår.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">
                Firmanavn *
              </label>
              <input
                type="text"
                placeholder="F.eks. Nordbohus AS"
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">
                  Org.nr *
                </label>
                <input
                  type="text"
                  placeholder="123 456 789"
                  className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">
                  Antall husmodeller
                </label>
                <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
                  <option>1-10</option>
                  <option>11-30</option>
                  <option>31-50</option>
                  <option>50+</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">
                Kontaktperson *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">
                  E-post *
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">
                  Telefon
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">
                Type leverandør *
              </label>
              <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
                <option>Ferdighusleverandør</option>
                <option>Hytteleverandør</option>
                <option>Ferdighus + hytte</option>
                <option>Modulbygg</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">
                Dekningsområde
              </label>
              <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
                <option>Hele Norge</option>
                <option>Østlandet</option>
                <option>Vestlandet</option>
                <option>Midt-Norge</option>
                <option>Nord-Norge</option>
                <option>Sørlandet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">
                Melding (valgfritt)
              </label>
              <textarea
                rows={3}
                placeholder="Fortell litt om selskapet og hva dere ønsker med samarbeidet..."
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none"
              />
            </div>

            <button
              onClick={() => setSendt(true)}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Send søknad
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-xs text-brand-400 text-center">
              Vi gjennomgår alle søknader manuelt. Forventet svartid: 3 virkedager.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
