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
import { VerdivurderingLead } from '@/components/VerdivurderingLead'

// ============================================================
// FORSIDE – Tomtly (2025)
// ============================================================

export default function Forside() {
  return (
    <>
      <HeroSection />
      <HvordanDetFungerer />
      <ArbeidsDeling />
      <FremhevedeTomter />
      <VelgPakke />
      <Kostnadssammenligning />
      <HvaViGjorBedre />
      <VerdivurderingLead />
      <FradelingReklame />
      <TomteSokLead />
      <Kundehistorier />
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
            tomtly er en helt ny måte å presentere tomter på. Vi gir både selger og kjøper
            full oversikt over tomtens muligheter og utfordringer – med husmodeller,
            3D-visualisering, reguleringsanalyse og verdivurdering.
          </p>

          <div className="max-w-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/selger/onboarding"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-tomtly-accent text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors"
              >
                Legg ut din tomt
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tomteanalyse"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-colors"
              >
                Gratis tomteanalyse
              </Link>
              <a
                href="#verdivurdering"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-brand-600 text-brand-300 text-sm font-medium rounded-lg hover:bg-brand-900 transition-colors"
              >
                Hva er tomten din verdt?
              </a>
              <Link
                href="/tomter"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-brand-600 text-brand-300 text-sm font-medium rounded-lg hover:bg-brand-900 transition-colors"
              >
                Se tomter til salgs
              </Link>
            </div>
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
        'Vi svarer på faglige spørsmål om regulering, bygging og kostnader. Du håndterer visning og bud med våre maler. Propr tar oppgjøret.',
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

// ---- Arbeidsdeling ----

function ArbeidsDeling() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-3">
            Trygg arbeidsdeling – du har full kontroll
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto text-sm">
            tomtly er ikke en mellommann. Vi er din faglige rådgiver.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Tomtly */}
          <div className="bg-forest-50 rounded-2xl border border-forest-200 p-6">
            <div className="w-10 h-10 bg-tomtly-accent rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-lg font-bold">T</span>
            </div>
            <h3 className="font-semibold text-tomtly-dark mb-3">tomtly gjør</h3>
            <ul className="space-y-2 text-sm text-brand-700">
              {[
                'Reguleringsanalyse',
                'Husmodeller og 3D-visualisering',
                'Byggekalkyle og verdivurdering',
                'DOK-analyse (70+ datasett)',
                'Markedsføring og annonsering',
                'Faglige svar om regulering og kostnader',
                'Kobler deg med banker for byggelån',
              ].map(t => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Du */}
          <div className="bg-brand-50 rounded-2xl border border-brand-200 p-6">
            <div className="w-10 h-10 bg-tomtly-dark rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-lg">👤</span>
            </div>
            <h3 className="font-semibold text-tomtly-dark mb-3">Du gjør</h3>
            <ul className="space-y-2 text-sm text-brand-700">
              {[
                'Gjennomfører visning av tomten',
                'Mottar og vurderer bud',
                'Bestemmer salgspris',
                'Aksepterer eller avslår bud',
              ].map(t => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-dark mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Propr */}
          <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-lg font-bold">P</span>
            </div>
            <h3 className="font-semibold text-tomtly-dark mb-3">Propr gjør</h3>
            <ul className="space-y-2 text-sm text-brand-700">
              {[
                'Utarbeider kjøpekontrakt (jurist)',
                'Tinglysing av eierskifte',
                'Økonomisk oppgjør',
                'Support gjennom oppgjøret',
              ].map(t => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Flow diagram */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-brand-500 flex-wrap">
          <span className="px-3 py-1.5 bg-forest-100 text-tomtly-accent rounded-lg">Tomtly → Analyse og markedsføring</span>
          <span className="text-brand-300">→</span>
          <span className="px-3 py-1.5 bg-brand-100 text-tomtly-dark rounded-lg">Du → Visning og bud</span>
          <span className="text-brand-300">→</span>
          <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg">Propr → Kontrakt og oppgjør</span>
          <span className="text-brand-300">→</span>
          <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg font-bold">✅ Solgt</span>
        </div>

        <p className="text-xs text-brand-400 text-center mt-6">
          tomtly er ikke involvert i bud, pris eller forhandling. Vi er din faglige rådgiver – ikke en mellommann.
        </p>
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
      bilde: '/tomter/alvaern-shared/alvaern-render-aerial-1-DvVXdDku.jpg',
      adresse: 'Gamle Alværnvei 67',
      sted: 'Nesodden',
      areal: '900 m²',
      pris: '3 200 000 kr',
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
            Se eksempler på hvordan tomtly presenterer tomter med husmodeller, byggekalkyle og verdivurdering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tomter.map((tomt) => (
            <div
              key={tomt.href}
              className="group bg-white border border-brand-200 rounded-2xl overflow-hidden hover:border-tomtly-accent/40 hover:shadow-lg transition-all"
            >
              <Link href={tomt.href}>
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
                <div className="p-5 pb-0">
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
              <div className="flex items-center justify-end gap-1.5 px-5 py-3 border-t border-brand-100 mt-3">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://tomtly.no' + tomt.href)}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-md bg-brand-50 hover:bg-brand-100 text-brand-500 hover:text-brand-700 transition-colors text-xs" title="Del på Facebook">f</a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://tomtly.no' + tomt.href)}`} target="_blank" rel="noopener noreferrer" className="w-7 h-7 flex items-center justify-center rounded-md bg-brand-50 hover:bg-brand-100 text-brand-500 hover:text-brand-700 transition-colors text-xs font-semibold" title="Del på LinkedIn">in</a>
                <a href={`mailto:?subject=${encodeURIComponent(tomt.adresse + ' – tomt til salgs')}&body=${encodeURIComponent('Se denne tomten på tomtly: https://tomtly.no' + tomt.href)}`} className="w-7 h-7 flex items-center justify-center rounded-md bg-brand-50 hover:bg-brand-100 text-brand-500 hover:text-brand-700 transition-colors text-xs" title="Del via e-post">✉</a>
              </div>
            </div>
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
                'Risikovurdering (grunnforhold, flom, skred m.m.)',
                'Publisering på tomtly.no',
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
              <span className="text-brand-400 text-sm">+ 2 % tilretteleggingsgebyr ved salg</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Lav oppstart. Tilretteleggingsgebyret betales kun ved gjennomført salg.</p>
            <ul className="space-y-2 mb-6">
              {[
                'Alt i Tomteanalyse-pakken',
                'Profesjonell tomtepresentasjon',
                'Aktiv annonsering mot kvalifiserte kjøpere',
                'Egen salgsdashboard med sanntidsoversikt',
                'Personlig Tomtekonsulent',
                'Budmal, visningsguide og salgsverktøy',
                'Faglig rådgivning om regulering og kostnader',
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
            Sammenlign kostnadene ved tradisjonell megler med tomtly.
          </p>
        </div>

        {/* Detaljert regneeksempel for 3 MNOK */}
        <div className="max-w-5xl mx-auto">
          <h3 className="font-display text-xl font-bold text-tomtly-dark text-center mb-6">Regneeksempel – tomt til 3 000 000 kr</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {/* Megler */}
            <div className="bg-white rounded-2xl border-2 border-red-200 p-6">
              <h4 className="font-semibold text-red-700 mb-1">Tradisjonell megler</h4>
              <p className="text-xs text-brand-400 mb-4">Typiske kostnader ved tomtesalg</p>
              <div className="space-y-0 text-sm mb-4">
                {[
                  { post: 'Provisjon (2,5–3,6%)', belop: '75 000 – 108 000' },
                  { post: 'Tilrettelegging', belop: '10 000 – 15 000' },
                  { post: 'Foto og styling', belop: '5 000 – 15 000' },
                  { post: 'Markedspakke', belop: '10 000 – 20 000' },
                  { post: 'Visninger', belop: '3 000 – 5 000' },
                  { post: 'Oppgjør', belop: 'Inkludert' },
                ].map((r, i) => (
                  <div key={r.post} className={`flex justify-between py-2 ${i > 0 ? 'border-t border-red-100' : ''}`}>
                    <span className="text-brand-600">{r.post}</span>
                    <span className="font-mono text-xs text-brand-700 tabular-nums text-right">{r.belop}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 border-t border-red-100 text-brand-400">
                  <span>Tomteanalyse / husmodeller</span>
                  <span className="text-xs italic">Ikke inkl.</span>
                </div>
              </div>
              <div className="bg-red-50 rounded-lg px-4 py-3 flex justify-between items-center font-bold text-red-700">
                <span>Totalt</span>
                <span className="font-mono text-lg">103 – 163 000 kr</span>
              </div>
            </div>

            {/* tomtly Analyse */}
            <div className="bg-white rounded-2xl border-2 border-brand-200 p-6">
              <h4 className="font-semibold text-tomtly-dark mb-1">tomtly Tomteanalyse</h4>
              <p className="text-xs text-brand-400 mb-4">Du selger selv med profesjonell rapport</p>
              <div className="space-y-0 text-sm mb-4">
                {[
                  { post: 'Tomteanalyse', belop: '9 900', inkl: false },
                  { post: 'Oppgjør via Propr', belop: '9 990', inkl: false },
                ].map((r, i) => (
                  <div key={r.post} className={`flex justify-between py-2 ${i > 0 ? 'border-t border-brand-100' : ''}`}>
                    <span className="text-brand-600">{r.post}</span>
                    <span className="font-mono text-xs text-brand-700 tabular-nums">{r.belop}</span>
                  </div>
                ))}
                <div className="flex justify-between py-2 border-t border-brand-100 text-brand-400">
                  <span>Markedsføring</span>
                  <span className="text-xs italic">Du gjør det selv</span>
                </div>
                {['Husmodeller og 3D', 'Reguleringsanalyse', 'Verdivurdering', 'DOK-analyse'].map(f => (
                  <div key={f} className="flex justify-between py-1.5 text-green-700">
                    <span>{f}</span>
                    <span className="text-xs font-semibold">✓ Inkludert</span>
                  </div>
                ))}
              </div>
              <div className="bg-forest-50 rounded-lg px-4 py-3 flex justify-between items-center font-bold text-tomtly-dark">
                <span>Totalt</span>
                <span className="font-mono text-lg">19 890 kr</span>
              </div>
            </div>

            {/* tomtly Analyse + Markedsføring */}
            <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-6 relative">
              <div className="absolute -top-3 right-4 px-2.5 py-0.5 bg-tomtly-accent text-white text-[10px] font-semibold rounded-full">Mest populær</div>
              <h4 className="font-semibold text-tomtly-accent mb-1">tomtly Analyse + Markedsføring</h4>
              <p className="text-xs text-brand-400 mb-4">Vi håndterer alt – du følger med i dashboardet</p>
              <div className="space-y-0 text-sm mb-4">
                {[
                  { post: 'Analyse (oppstart)', belop: '4 990' },
                  { post: 'Tilretteleggingsgebyr (2%)', belop: '60 000' },
                  { post: 'Oppgjør via Propr', belop: '9 990' },
                ].map((r, i) => (
                  <div key={r.post} className={`flex justify-between py-2 ${i > 0 ? 'border-t border-brand-100' : ''}`}>
                    <span className="text-brand-600">{r.post}</span>
                    <span className="font-mono text-xs text-brand-700 tabular-nums">{r.belop}</span>
                  </div>
                ))}
                {['Alt i analysepakken', 'Salgsdashboard', 'Tomtekonsulent-støtte', 'Annonsering i 12 mnd'].map(f => (
                  <div key={f} className="flex justify-between py-1.5 text-green-700">
                    <span>{f}</span>
                    <span className="text-xs font-semibold">✓ Inkludert</span>
                  </div>
                ))}
              </div>
              <div className="bg-forest-50 rounded-lg px-4 py-3 flex justify-between items-center font-bold text-tomtly-dark">
                <span>Totalt</span>
                <span className="font-mono text-lg">74 980 kr</span>
              </div>
              <p className="text-[10px] text-brand-400 mt-2">Tilsvarende pris som megler – men du får husmodeller, 3D, salgsdashboard og tomtekonsulent i tillegg</p>
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

function FradelingReklame() {
  return (
    <section className="bg-forest-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-tomtly-accent/20 p-8 md:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block bg-tomtly-accent/10 text-tomtly-accent text-xs font-semibold px-3 py-1 rounded-full mb-4">
                Fradeling av tomt
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-4">
                Har du en stor tomt? Du kan sitte på skjulte millioner.
              </h2>
              <p className="text-brand-600 leading-relaxed mb-6">
                Mange norske eiendommer har mer tomt enn de trenger. Vi vurderer om din eiendom egner seg for fradeling,
                håndterer hele prosessen og selger den nye tomten.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-tomtly-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-tomtly-dark">Gratis vurdering</p>
                    <p className="text-xs text-brand-500">Vi sjekker om eiendommen din egner seg for fradeling. Uforpliktende.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-tomtly-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-tomtly-dark">Du betaler kun ved suksess</p>
                    <p className="text-xs text-brand-500">5% av den nye tomtens verdi – kun ved godkjent fradeling og salg. Kommunale saksbehandlingsgebyrer betales av deg uansett utfall.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-tomtly-accent mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-tomtly-dark">Vi håndterer alt</p>
                    <p className="text-xs text-brand-500">Reguleringssjekk, søknad til kommunen, oppmåling, mulighetsstudie – og vi tilrettelegger for salg av tomten for deg.</p>
                  </div>
                </div>
              </div>
              <Link
                href="/fradeling"
                className="inline-flex items-center gap-2 px-6 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
              >
                Les mer om fradeling
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-4">Eksempel: Fradeling av 600 m²</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-forest-200">
                  <span className="text-brand-600">Estimert verdi ny tomt</span>
                  <span className="font-semibold text-tomtly-dark">2 000 000 kr</span>
                </div>
                <div className="flex justify-between py-2 border-b border-forest-200">
                  <span className="text-brand-600">Kommunale gebyrer (betales av deg)</span>
                  <span className="font-semibold text-tomtly-dark">30 000–60 000 kr</span>
                </div>
                <div className="flex justify-between py-2 border-b border-forest-200">
                  <span className="text-brand-600">tomtly-gebyr (5% ved salg)</span>
                  <span className="font-semibold text-tomtly-dark">100 000 kr</span>
                </div>
                <div className="flex justify-between py-2 border-b border-forest-200">
                  <span className="text-brand-600">Oppgjør via Propr</span>
                  <span className="font-semibold text-tomtly-dark">9 990 kr</span>
                </div>
                <div className="flex justify-between py-3 bg-tomtly-accent/5 rounded-lg px-3 -mx-3">
                  <span className="font-bold text-tomtly-dark">Du sitter igjen med</span>
                  <span className="font-bold text-tomtly-accent text-lg">~1 830 000 kr</span>
                </div>
              </div>
              <p className="text-[10px] text-brand-400 mt-3">
                Ved avslag betaler du kun kommunale saksbehandlingsgebyrer. tomtly tar ingen betaling ved avslag.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- Kundehistorier ----

function Kundehistorier() {
  return (
    <section className="bg-brand-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-3">
            Solgt via tomtly
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Ekte kundehistorie */}
          <div className="bg-white border border-brand-200 rounded-2xl p-8 md:col-span-2">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <p className="text-lg text-brand-700 leading-relaxed mb-4 italic">
                  &ldquo;tomtly har gjort det betraktelig mye enklere å vise tomtene og mulighetsrommet
                  for tomten, slik at en kjøper får svar på alle de faglige og kostnadsmessige
                  spørsmålene de måtte ha i prosessen.&rdquo;
                </p>
                <p className="font-semibold text-tomtly-dark">Kjetil Halvorsen</p>
                <p className="text-sm text-brand-500">Selger, Gamle Alværnvei 65 på Nesodden</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center shrink-0">
                <div>
                  <p className="text-xl font-bold text-tomtly-dark">3,2M</p>
                  <p className="text-[10px] text-brand-500">Salgspris</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-tomtly-dark">2 274</p>
                  <p className="text-[10px] text-brand-500">m² tomt</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-green-700">Solgt</p>
                  <p className="text-[10px] text-brand-500">Uten megler</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-brand-100">
              <Link href="/tomter/alvaern-65" className="text-sm text-tomtly-accent font-medium hover:underline flex items-center gap-1">
                Se hele casen <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-tomtly-dark rounded-2xl p-8 text-center md:col-span-2">
            <p className="text-white font-display text-xl font-bold mb-2">Din tomt kan være neste</p>
            <p className="text-brand-400 text-sm mb-5">Slik Kjetil solgte sin tomt – uten tradisjonell megler</p>
            <Link
              href="/selger/onboarding"
              className="inline-flex items-center gap-2 px-6 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Legg ut din tomt <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
      a: 'Nei. Du kan selge tomt privat i Norge. tomtly gir deg profesjonelle verktøy for analyse og markedsføring, og Propr håndterer det juridiske oppgjøret trygt via Norsk eiendomsoppgjør AS.',
    },
    {
      q: 'Hva betyr «2 % ved salg»?',
      a: 'Velger du Analyse + Markedsføring betaler du 4 990 kr ved bestilling, og 2 % tilretteleggingsgebyr av salgssummen kun dersom tomten faktisk blir solgt. Gebyret dekker profesjonell annonsering, salgsdashboard, personlig Tomtekonsulent, faglig oppfølging, salgsverktøy og faglig rådgivning om regulering, byggemuligheter og kostnader. Selges ikke tomten, betaler du ikke 2 %.',
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
      a: 'Ja. Tomteanalyse-pakken gir deg en komplett rapport du fritt kan bruke – enten du selger selv, via tomtly eller via din egen megler.',
    },
    {
      q: 'Hva slags data bruker dere?',
      a: 'Vi henter data fra over 70 offentlige og private kilder, inkludert matrikkel, reguleringsplaner, grunnforhold og markedsdata. Våre fageksperter tolker og sammenstiller alt til en komplett analyse.',
    },
    {
      q: 'Er tomtly et meglerforetak?',
      a: 'Nei. tomtly er en analyseplattform og markedsføringskanal for tomtesalg. Vi er ikke et eiendomsmeglingsforetak. Tilretteleggingsgebyret er betaling for tomtlys tjenester og er ikke meglerprovisjoner. Oppgjør håndteres av Propr via Norsk eiendomsoppgjør AS.',
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
                tomtly er ikke et eiendomsmeglingsforetak og driver ikke eiendomsmegling.
                tomtly tilbyr analyse- og markedsføringstjenester for tomteeiere som ønsker å selge selv.
                Tilretteleggingsgebyret er betaling for tomtlys tjenester og er ikke meglerprovisjoner.
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
