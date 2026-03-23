import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Brain,
  Home,
  Box,
  LayoutDashboard,
  Shield,
  Database,
  Sparkles,
  Scale,
  MapPin,
} from 'lucide-react'
import { TomteSokLead } from '@/components/TomteSokLead'

// ============================================================
// FORSIDE – Tomtly (2025)
// ============================================================

export default function Forside() {
  return (
    <>
      <HeroSection />
      <HvordanDetFungerer />
      <FremhevedeTomter />
      <VelgPakke />
      <Kostnadssammenligning />
      <HvaViGjorBedre />
      <TomteSokLead />
      <StatistikkOgTrust />
      <FAQSection />
      <JuridiskDisclaimer />
      <CTASection />
    </>
  )
}

// ---- Hero ----

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Bakgrunnsbilde – dronefoto fra Bjørnemyr */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/tomter/bjornemyrveien-shared/oversiktsbilde.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay for lesbarhet */}
      <div className="absolute inset-0 bg-gradient-to-r from-tomtly-dark/95 via-tomtly-dark/85 to-tomtly-dark/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-white/80 font-medium">
              Tomteanalyse, markedsføring og salg
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Selg tomten selv
            <br />
            <span className="text-green-400">– med profesjonell analyse</span>
          </h1>

          <p className="text-lg text-brand-300 leading-relaxed mb-10 max-w-xl">
            Vi analyserer reguleringsplan, byggemuligheter og markedsverdi.
            Du får en komplett tomtepakke med husmodeller, 3D-visualisering
            og verdivurdering – klar til salg.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/selger/onboarding"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors text-lg"
            >
              Analyser din tomt
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/tomter"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Se tomter til salgs
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-10 border-t border-brand-800">
            <div>
              <p className="text-2xl font-bold text-white">1 000+</p>
              <p className="text-sm text-brand-500">Tomter analysert</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">70+</p>
              <p className="text-sm text-brand-500">Datakilder</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Fra 9 900 kr</p>
              <p className="text-sm text-brand-500">Komplett analyse</p>
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
      ikon: MapPin,
      tittel: 'Registrer',
      beskrivelse:
        'Oppgi adressen din og fortell oss litt om tomten. Vi henter offentlige data automatisk.',
    },
    {
      nummer: '02',
      ikon: Brain,
      tittel: 'Vi analyserer',
      beskrivelse:
        'Våre fageksperter – arkitekter og eiendomsrådgivere – analyserer reguleringsplan, topografi og byggemuligheter.',
    },
    {
      nummer: '03',
      ikon: Sparkles,
      tittel: 'Vi markedsfører',
      beskrivelse:
        'Profesjonell annonsepakke med husmodeller, 3D-visualisering og verdivurdering.',
    },
    {
      nummer: '04',
      ikon: CheckCircle2,
      tittel: 'Du selger – vi støtter deg',
      beskrivelse:
        'Interesserte kontakter deg direkte. Du håndterer visning og bud med våre maler. Vår Eiendomsekspert hjelper deg hele veien. Oppgjør via Propr.',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hvordan det fungerer
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Fire enkle steg fra registrering til salg.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steg.map((s) => (
            <div key={s.nummer} className="relative">
              <div className="text-5xl font-display font-bold text-brand-200 mb-4">
                {s.nummer}
              </div>
              <div className="w-10 h-10 bg-tomtly-accent/10 rounded-lg flex items-center justify-center mb-3">
                <s.ikon className="w-5 h-5 text-tomtly-accent" />
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

// ---- Fremhevede tomter ----

function FremhevedeTomter() {
  const tomter = [
    {
      href: '/tomter/bjornemyrveien-20',
      bilde: '/tomter/bjornemyrveien-shared/oversiktsbilde.jpg',
      adresse: 'Bjørnemyrveien 20',
      sted: 'Nesodden',
      areal: '724 m²',
      pris: '3 000 000 kr',
      husmodeller: 4,
      type: 'Flat tomt',
    },
    {
      href: '/tomter/bjornemyrveien-22',
      bilde: '/tomter/bjornemyrveien-shared/render-parsell-c.jpg',
      adresse: 'Bjørnemyrveien 22',
      sted: 'Nesodden',
      areal: '613 m²',
      pris: '3 000 000 kr',
      husmodeller: 4,
      type: 'Skråtomt',
    },
    {
      href: '/tomter/alvaern-67',
      bilde: '/tomter/bjornemyrveien-shared/dronebilde.jpg',
      adresse: 'Gamle Alværnvei 67',
      sted: 'Nesodden',
      areal: '900 m²',
      pris: '3 500 000 kr',
      husmodeller: 3,
      type: 'Skråtomt med fjordutsikt (+81 moh)',
    },
  ]

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-3">
            Tomter med analyse
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Se eksempler på hvordan Tomtly presenterer tomter med husmodeller, byggekalkyle og verdivurdering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tomter.map((tomt) => (
            <Link
              key={tomt.href}
              href={tomt.href}
              className="group bg-white border border-brand-200 rounded-2xl overflow-hidden hover:border-tomtly-accent/40 hover:shadow-lg transition-all"
            >
              <div className="aspect-[16/10] relative overflow-hidden bg-brand-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tomt.bilde}
                  alt={tomt.adresse}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-tomtly-accent text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    {tomt.husmodeller} husmodeller
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-tomtly-dark mb-1">{tomt.adresse}</h3>
                <p className="text-sm text-brand-500 mb-3">{tomt.sted} · {tomt.type}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-brand-500">
                    <span>{tomt.areal}</span>
                    <span className="font-semibold text-tomtly-dark">{tomt.pris}</span>
                  </div>
                  <span className="text-xs text-tomtly-accent font-medium group-hover:underline flex items-center gap-1">
                    Se analyse <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Velg pakke ----

function VelgPakke() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Velg pakke
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Enkel og transparent prising. Ingen skjulte kostnader.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
          {/* Tomteanalyse */}
          <div className="border-2 border-brand-200 rounded-2xl p-7">
            <div className="text-sm font-medium text-brand-500 mb-2">Tomteanalyse</div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">9 900</span>
              <span className="text-brand-500">kr</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Engangspris – du selger selv</p>
            <ul className="space-y-2 mb-6">
              {[
                'Reguleringsanalyse fra fageksperter',
                'Byggemuligheter og begrensninger',
                'Husmodeller tilpasset tomten',
                '3D-visualisering',
                'Verdivurdering og markedsdata',
                'Publisering på Tomtly.no',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/selger/onboarding"
              className="block w-full text-center px-4 py-3 border-2 border-tomtly-accent text-tomtly-accent font-medium rounded-lg hover:bg-forest-50 transition-colors"
            >
              Bestill analyse
            </Link>
          </div>

          {/* Analyse + Markedsføring */}
          <div className="border-2 border-tomtly-accent rounded-2xl p-7 relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">
              Mest populær
            </div>
            <div className="text-sm font-medium text-brand-500 mb-2">Analyse + Markedsføring</div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">4 990</span>
              <span className="text-brand-500">kr</span>
              <span className="text-brand-400 text-sm">+ 2 % ved salg</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Lav oppstart. Markedsføringsgebyr kun ved salg.</p>
            <ul className="space-y-2 mb-6">
              {[
                'Alt i Tomteanalyse-pakken',
                'Profesjonell tomtepresentasjon',
                'Aktiv annonsering mot kvalifiserte kjøpere',
                'Egen salgsdashboard med sanntidsoversikt',
                'Budmal og visningsguide',
                'Synlighet i inntil 12 måneder',
                '2 % kun ved gjennomført salg',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/selger/onboarding"
              className="block w-full text-center px-4 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Kom i gang
            </Link>
          </div>
        </div>

        {/* Propr oppgjør */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-brand-50 rounded-xl border border-brand-200 p-5 text-center">
            <p className="text-sm text-brand-600">
              <span className="font-semibold text-tomtly-dark">Propr oppgjør</span> fra 9 990 kr
              – trygt og autorisert eiendomsoppgjør, uavhengig av hvilken pakke du velger.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Kostnadssammenligning ----

function Kostnadssammenligning() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hva koster det egentlig?
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Sammenlign kostnadene ved tradisjonell megler med Tomtly.
          </p>
        </div>

        {/* Detaljert regneeksempel for 3 MNOK */}
        <div className="max-w-5xl mx-auto">
          <h3 className="font-display text-xl font-bold text-tomtly-dark text-center mb-6">Regneeksempel – tomt til 3 000 000 kr</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Megler */}
            <div className="bg-white rounded-2xl border-2 border-red-200 p-6">
              <h4 className="font-semibold text-red-700 mb-4">Tradisjonell megler</h4>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-brand-600">Meglerprovisjoner (2,5–3,6%)</span><span className="font-mono">75–108 000</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Oppstarts-/tilretteleggingsgebyr</span><span className="font-mono">10–15 000</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Foto/styling</span><span className="font-mono">5–15 000</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Markedsføringspakke</span><span className="font-mono">10–20 000</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Visninger</span><span className="font-mono">3–5 000</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Oppgjør (inkludert)</span><span className="font-mono">0</span></div>
                <div className="flex justify-between text-brand-400"><span>Tomteanalyse</span><span className="italic">Ikke inkludert</span></div>
                <div className="flex justify-between text-brand-400"><span>Husmodeller/3D</span><span className="italic">Ikke inkludert</span></div>
              </div>
              <div className="border-t border-red-200 pt-3 flex justify-between font-bold text-red-700">
                <span>Totalt</span><span className="font-mono">103 000–163 000 kr</span>
              </div>
            </div>

            {/* Tomtly Analyse */}
            <div className="bg-white rounded-2xl border-2 border-brand-200 p-6">
              <h4 className="font-semibold text-tomtly-dark mb-4">Tomtly Tomteanalyse</h4>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-brand-600">Tomteanalyse</span><span className="font-mono">9 900</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Oppgjør via Propr</span><span className="font-mono">9 990</span></div>
                <div className="flex justify-between text-brand-400"><span>Markedsføring</span><span className="italic">Du gjør det selv</span></div>
                <div className="flex justify-between text-green-700"><span>Husmodeller/3D/verdivurdering</span><span className="font-semibold">Inkludert</span></div>
                <div className="flex justify-between text-green-700"><span>Reguleringsanalyse</span><span className="font-semibold">Inkludert</span></div>
                <div className="flex justify-between text-green-700"><span>DOK-analyse</span><span className="font-semibold">Inkludert</span></div>
              </div>
              <div className="border-t border-brand-200 pt-3 flex justify-between font-bold text-tomtly-dark">
                <span>Totalt</span><span className="font-mono">19 890 kr</span>
              </div>
            </div>

            {/* Tomtly Analyse + Markedsføring */}
            <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-6 relative">
              <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-tomtly-accent text-white text-[10px] font-semibold rounded-full">Mest populær</div>
              <h4 className="font-semibold text-tomtly-accent mb-4">Tomtly Analyse + Markedsføring</h4>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between"><span className="text-brand-600">Analyse (oppstart)</span><span className="font-mono">4 990</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Markedsføringsgebyr (2%)</span><span className="font-mono">60 000</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Oppgjør via Propr</span><span className="font-mono">9 990</span></div>
                <div className="flex justify-between text-green-700"><span>Alt i analyse + markedsføring</span><span className="font-semibold">Inkludert</span></div>
                <div className="flex justify-between text-green-700"><span>Salgsdashboard</span><span className="font-semibold">Inkludert</span></div>
                <div className="flex justify-between text-green-700"><span>Eiendomsekspert-støtte</span><span className="font-semibold">Inkludert</span></div>
              </div>
              <div className="border-t border-tomtly-accent/30 pt-3 flex justify-between font-bold text-tomtly-dark">
                <span>Totalt</span><span className="font-mono">74 980 kr</span>
              </div>
              <p className="text-[10px] text-brand-400 mt-2">Tilsvarende pris som megler – men du får mye mer</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-green-200 p-4 text-center">
              <p className="text-xs text-brand-500 mb-1">Spar med Tomteanalyse (3 MNOK)</p>
              <p className="text-2xl font-bold text-green-700">83 000–143 000 kr</p>
              <p className="text-xs text-brand-400 mt-1">vs. tradisjonell megler</p>
            </div>
            <div className="bg-white rounded-xl border border-green-200 p-4 text-center">
              <p className="text-xs text-brand-500 mb-1">Analyse + Markedsføring gir deg i tillegg</p>
              <p className="text-2xl font-bold text-tomtly-accent">Mye mer for pengene</p>
              <p className="text-xs text-brand-400 mt-1">vs. tradisjonell megler</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Hva vi gjør bedre ----

function HvaViGjorBedre() {
  const fordeler = [
    {
      ikon: Brain,
      tittel: 'Reguleringsanalyse fra fageksperter',
      beskrivelse:
        'Arkitekter og eiendomsrådgivere tolker reguleringsplaner, bestemmelser og kommunale vedtak. Du får en forståelig oppsummering av hva som kan bygges.',
    },
    {
      ikon: Home,
      tittel: 'Husmodeller tilpasset tomten',
      beskrivelse:
        'Vi matcher tomten med egnede husmodeller fra norske leverandører, basert på regulering, tomtestørrelse og topografi.',
    },
    {
      ikon: Box,
      tittel: '3D-visualisering',
      beskrivelse:
        'Se hvordan huset vil se ut på tomten din. Kjøpere får et mye bedre beslutningsgrunnlag enn ved tradisjonelt tomtesalg.',
    },
    {
      ikon: LayoutDashboard,
      tittel: 'Salgsdashboard',
      beskrivelse:
        'Følg med på visninger, interessenter og henvendelser i sanntid. Full oversikt over salgsprosessen din.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hva vi gjør bedre
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Tradisjonelle meglere selger tomter med et kart og en prisantydning.
            Vi gir kjøperne alt de trenger for å ta en beslutning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {fordeler.map((f) => (
            <div
              key={f.tittel}
              className="bg-brand-50 rounded-xl p-8 border border-brand-200 hover:border-tomtly-accent/30 transition-colors"
            >
              <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center mb-5">
                <f.ikon className="w-6 h-6 text-tomtly-accent" />
              </div>
              <h3 className="text-lg font-semibold text-tomtly-dark mb-2">
                {f.tittel}
              </h3>
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

// ---- Statistikk og trust ----

function StatistikkOgTrust() {
  const stats = [
    {
      ikon: Database,
      verdi: '1 000+',
      label: 'Tomter analysert',
    },
    {
      ikon: Sparkles,
      verdi: '70+',
      label: 'Datasett per tomt',
    },
    {
      ikon: Brain,
      verdi: 'Fageksperter',
      label: 'Arkitekter og rådgivere',
    },
    {
      ikon: Shield,
      verdi: 'Autorisert',
      label: 'Oppgjør via Propr',
    },
  ]

  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Tall du kan stole på
          </h2>
          <p className="text-brand-400 max-w-lg mx-auto">
            Vi kombinerer offentlige data, teknologi og fagkompetanse.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <s.ikon className="w-7 h-7 text-green-400" />
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-white mb-1">{s.verdi}</p>
              <p className="text-sm text-brand-400">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- FAQ (client component for expand/collapse) ----

function FAQSection() {
  const faq = [
    {
      q: 'Hva er en tomteanalyse?',
      a: 'En tomteanalyse er en profesjonell gjennomgang av tomtens reguleringsplan, byggemuligheter, topografi, solforhold og markedsverdi. Du får en komplett rapport med husmodeller, 3D-visualisering og verdivurdering.',
    },
    {
      q: 'Trenger jeg megler for å selge tomten?',
      a: 'Nei. Du kan selge tomt privat i Norge. Tomtly gir deg profesjonelle verktøy for analyse og markedsføring, og Propr håndterer det juridiske oppgjøret trygt via Norsk eiendomsoppgjør AS.',
    },
    {
      q: 'Hva betyr «2 % ved salg»?',
      a: 'Velger du Analyse + Markedsføring betaler du 4 990 kr ved bestilling, og 2 % av salgssummen kun dersom tomten faktisk blir solgt. Selges ikke tomten, betaler du ingen provisjon.',
    },
    {
      q: 'Hvem håndterer oppgjøret?',
      a: 'Oppgjøret håndteres av Propr, som er en autorisert oppgjørstjeneste. Oppgjør koster fra 9 990 kr og inkluderer tinglysing, skjøte og sikker pengeoverføring.',
    },
    {
      q: 'Hvor lang tid tar en analyse?',
      a: 'En standard tomteanalyse leveres innen 5 virkedager. For enklere tomter kan det gå raskere. Du får beskjed når analysen er klar.',
    },
    {
      q: 'Kan jeg bruke analysen til å selge via egen megler?',
      a: 'Ja. Tomteanalyse-pakken gir deg en komplett rapport du fritt kan bruke – enten du selger selv, via Tomtly eller via din egen megler.',
    },
    {
      q: 'Hva slags data bruker dere?',
      a: 'Vi henter data fra over 70 offentlige og private kilder, inkludert matrikkel, reguleringsplaner, grunnforhold og markedsdata. Våre fageksperter tolker og sammenstiller alt til en komplett analyse.',
    },
    {
      q: 'Er Tomtly et meglerforetak?',
      a: 'Nei. Tomtly er en analyseplattform og markedsføringskanal for tomtesalg. Vi er ikke et eiendomsmeglingsforetak. Markedsføringsgebyret er betaling for markedsføringstjenester, ikke meglerprovisjoner. Oppgjør håndteres av Propr via Norsk eiendomsoppgjør AS.',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Ofte stilte spørsmål
          </h2>
        </div>

        <div className="space-y-3">
          {faq.map((item, i) => (
            <FAQItem key={i} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group bg-white rounded-xl border border-brand-200 overflow-hidden">
      <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-left font-semibold text-tomtly-dark hover:bg-brand-50 transition-colors list-none [&::-webkit-details-marker]:hidden">
        {question}
        <ChevronDown className="w-5 h-5 text-brand-400 flex-shrink-0 ml-4 transition-transform group-open:rotate-180" />
      </summary>
      <div className="px-6 pb-4 text-sm text-brand-600 leading-relaxed">
        {answer}
      </div>
    </details>
  )
}

// ---- Juridisk disclaimer ----

function JuridiskDisclaimer() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-50 rounded-xl border border-brand-200 p-6">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-brand-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-2">Juridisk informasjon</h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                Tomtly er ikke et eiendomsmeglingsforetak og driver ikke eiendomsmegling.
                Tomtly tilbyr analyse- og markedsføringstjenester for tomteeiere som ønsker å selge selv.
                Markedsføringsgebyret er betaling for Tomtlys markedsføringstjeneste og er ikke meglerprovisjoner.
                Tomteeier er selv ansvarlig for salget av sin eiendom.
                Kontrakt og oppgjør håndteres av{' '}
                <a href="https://propr.no" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-800">Propr.no</a>{' '}
                via autorisert oppgjørsselskap (Norsk eiendomsoppgjør AS).
                NOPS AS · Org.nr 933 819 086 · hey@nops.no
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- CTA ----

function CTASection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
          Klar for å selge tomten din?
        </h2>
        <p className="text-brand-400 mb-10 max-w-lg mx-auto">
          Oppgi adressen og få en profesjonell analyse av tomtens potensial.
          Det tar under 5 minutter å komme i gang.
        </p>

        {/* Adressefelt CTA */}
        <div className="max-w-md mx-auto mb-6">
          <Link
            href="/selger/onboarding"
            className="flex items-center gap-3 w-full px-5 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-left hover:bg-white/15 transition-colors group"
          >
            <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <span className="text-brand-400 group-hover:text-brand-300 transition-colors">
              Skriv inn adressen til tomten din...
            </span>
            <ArrowRight className="w-5 h-5 text-brand-400 flex-shrink-0 ml-auto group-hover:text-white transition-colors" />
          </Link>
        </div>

        <p className="text-xs text-brand-500">
          Ingen forpliktelser. Du betaler først når du bestiller analyse.
        </p>
      </div>
    </section>
  )
}
