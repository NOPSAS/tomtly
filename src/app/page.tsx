import Link from 'next/link'
import {
  MapPin,
  BarChart3,
  Eye,
  Ruler,
  Shield,
  TrendingUp,
  ArrowRight,
  Building2,
  Users,
  Home,
  CheckCircle2,
  Calculator,
} from 'lucide-react'
import { TomteSokLead } from '@/components/TomteSokLead'

// ============================================================
// FORSIDE – Tomtly
// ============================================================

export default function Forside() {
  return (
    <>
      <HeroSection />
      <HvordanDetFungerer />
      <FremhevedeTomter />
      <ForHvem />
      <Prismodell />
      <FradelingBanner />
      <TomteSokLead />
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
            Se potensialet
            <br />
            <span className="text-green-400">i tomten</span>
          </h1>

          <p className="text-lg text-brand-300 leading-relaxed mb-10 max-w-xl">
            Vi analyserer tomten din, lager profesjonell mulighetsstudie med husmodeller og byggekalkyle, markedsfører mot aktive kjøpere – og selger via vår fagansvarlige megler. Alt fra 4 990 kr.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/selger/onboarding"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Legg ut din tomt
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tomter"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Se alle tomter
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14 pt-10 border-t border-brand-800">
            <div>
              <p className="text-2xl font-bold text-white">1 000+</p>
              <p className="text-sm text-brand-500">Tomter analysert</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">1–5</p>
              <p className="text-sm text-brand-500">Husmodeller per tomt</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">Synlig</p>
              <p className="text-sm text-brand-500">For riktig kjøper</p>
            </div>
          </div>

          {/* Ekstra CTA-er – visuelt tydelige */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
            <Link
              href="/verdivurdering"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-tomtly-gold text-tomtly-dark font-semibold rounded-xl hover:bg-yellow-500 transition-colors shadow-lg"
            >
              <Calculator className="w-5 h-5" />
              Sjekk hva tomten din er verdt – gratis
            </Link>
            <Link
              href="/sok-tomt"
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
            >
              <MapPin className="w-5 h-5" />
              Vet du hva eller hvor du vil bygge?
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// LogoBar fjernet – legges tilbake når vi har ekte partnere

// ---- Hvordan det fungerer ----

function HvordanDetFungerer() {
  const steg = [
    {
      nummer: '01',
      ikon: MapPin,
      tittel: 'Oppgi adressen',
      beskrivelse:
        'Legg inn adresse og fortell oss hva du ser for deg. Vi henter data automatisk.',
    },
    {
      nummer: '02',
      ikon: BarChart3,
      tittel: 'Profesjonell analyse',
      beskrivelse:
        'Vårt arkitekt- og eiendomsteam evaluerer regulering, topografi og marked.',
    },
    {
      nummer: '03',
      ikon: Eye,
      tittel: 'Mulighetsstudie',
      beskrivelse:
        'Arkitekten vurderer bygbare scenarioer med husmodeller og kalkyle.',
    },
    {
      nummer: '04',
      ikon: TrendingUp,
      tittel: 'Salg og oppgjør',
      beskrivelse:
        'Autorisert meglerpartner håndterer visninger, budgivning, kontrakt og oppgjør. Du lener deg tilbake.',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hvordan Tomtly fungerer
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Fra tom tomt til ferdig utviklingsprosjekt på under en uke.
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
      id: 'bjornemyrveien-20',
      adresse: 'Bjørnemyrveien 20',
      poststed: 'Bjørnemyr, Nesodden',
      areal: 605,
      pris: 3000000,
      type: 'Eneboligtomt – flat',
      bilde: '/tomter/bjornemyrveien-shared/render-parsell-b.jpg',
    },
    {
      id: 'bjornemyrveien-22',
      adresse: 'Bjørnemyrveien 22',
      poststed: 'Bjørnemyr, Nesodden',
      areal: 613,
      pris: 3000000,
      type: 'Eneboligtomt – skrå',
      bilde: '/tomter/bjornemyrveien-shared/render-parsell-c.jpg',
    },
    {
      id: 'alvaern-67',
      adresse: 'Gamle Alværnvei 67',
      poststed: 'Alværn, Nesodden',
      areal: 900,
      pris: 3200000,
      type: 'Eneboligtomt – fjordutsikt',
      bilde: '/tomter/alvaern-shared/alvaern-render-aerial-1-DvVXdDku.jpg',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-3">
              Tomter til salgs
            </h2>
            <p className="text-brand-600">
              Ferdig analysert med husmodeller, kostnadsoverslag og verdivurdering.
            </p>
          </div>
          <Link
            href="/tomter"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-tomtly-accent hover:underline"
          >
            Se alle tomter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tomter.map((t) => (
            <Link
              key={t.id}
              href={`/tomter/${t.id}`}
              className="group bg-white border border-brand-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-[4/3] bg-brand-100 relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.bilde} alt={t.adresse} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <span className="inline-block px-2 py-1 bg-white/90 backdrop-blur-sm rounded text-xs font-medium text-brand-800">
                    {t.type}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-tomtly-dark group-hover:text-tomtly-accent transition-colors">
                  {t.adresse}
                </h3>
                <p className="text-sm text-brand-500">{t.poststed}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-100">
                  <span className="text-sm text-brand-600">
                    {t.areal.toLocaleString('nb-NO')} m²
                  </span>
                  <span className="font-semibold text-tomtly-dark">
                    {(t.pris / 1000000).toFixed(1)} MNOK
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/tomter"
            className="inline-flex items-center gap-1 text-sm font-medium text-tomtly-accent"
          >
            Se alle tomter
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ---- For hvem ----

function ForHvem() {
  const segmenter = [
    {
      ikon: Home,
      tittel: 'Tomteeiere',
      href: '/for-tomteeiere',
      beskrivelse:
        'Vis kjøperne nøyaktig hva de kan bygge. Profesjonell analyse og synlighet.',
      fordeler: [
        'Profesjonell presentasjon',
        'Arkitektens mulighetsstudie',
        'Estimert salgsverdi',
      ],
    },
    {
      ikon: Users,
      tittel: 'Eiendomsmeglere',
      href: '/for-meglere',
      beskrivelse:
        'Gi kundene dine et unikt salgsverktøy. Skil deg ut med datadriven innsikt.',
      fordeler: [
        'Meglerdashboard',
        'Porteføljeoversikt',
        'Faglig analyse per tomt',
      ],
    },
    {
      ikon: Building2,
      tittel: 'Utviklere',
      href: '/utvikler',
      beskrivelse:
        'Finn tomter med høyt utviklingspotensial. Spar tid på due diligence.',
      fordeler: [
        'Analyse-filtrering',
        'ROI-beregning',
        'Reguleringsanalyse',
      ],
    },
  ]

  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            For alle i verdikjeden
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Tomtly gir verdi uansett om du eier, selger eller utvikler.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {segmenter.map((s) => (
            <Link
              key={s.tittel}
              href={s.href}
              className="bg-white rounded-xl p-8 border border-brand-200 hover:border-tomtly-accent/30 transition-colors block"
            >
              <div className="w-12 h-12 bg-forest-50 rounded-xl flex items-center justify-center mb-5">
                <s.ikon className="w-6 h-6 text-tomtly-accent" />
              </div>
              <h3 className="text-xl font-semibold text-tomtly-dark mb-2">
                {s.tittel}
              </h3>
              <p className="text-sm text-brand-600 leading-relaxed mb-5">
                {s.beskrivelse}
              </p>
              <ul className="space-y-2">
                {s.fordeler.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-brand-700">
                    <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Prismodell ----

function Prismodell() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Enkel og rettferdig prismodell
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Vi analyserer, markedsfører og selger tomten din. Du betaler en lav fastpris – resten tar vi ved salg.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* Kun analyse */}
          <div className="border-2 border-brand-200 rounded-2xl p-7">
            <div className="text-sm font-medium text-brand-500 mb-2">Kun analyse + publisering</div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">4 990</span>
              <span className="text-brand-500">kr</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Fastpris – du selger selv</p>
            <ul className="space-y-2 mb-6">
              {[
                'Tomtanalyse og mulighetsstudie',
                'Husmodeller tilpasset tomten',
                'Byggekalkyle og verdivurdering',
                'Publisering på Tomtly.no',
                'Du håndterer salg selv eller via autorisert meglerpartner',
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

          {/* Komplett med salg */}
          <div className="border-2 border-tomtly-accent rounded-2xl p-7 relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">
              Mest populær
            </div>
            <div className="text-sm font-medium text-brand-500 mb-2">Analyse + salg via meglerpartner</div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">4 990</span>
              <span className="text-brand-500">kr</span>
              <span className="text-brand-400 text-sm">+ 2,5% ved salg</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Alt inkludert – vi gjør resten</p>
            <ul className="space-y-2 mb-6">
              {[
                'Alt i analysepakken',
                'Markedsføring mot aktive kjøpere',
                'Salg via vår fagansvarlige megler',
                'Visninger, bud og forhandling',
                'Oppgjør via Propr',
                '2,5% kun ved gjennomført salg',
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

          {/* Sammenligning – basert på ekte DnB-meglertilbud */}
          <div className="mt-6 bg-brand-50 rounded-xl border border-brand-200 p-6">
            <h3 className="font-semibold text-tomtly-dark mb-1 text-center">Tomtly vs. tradisjonell megler</h3>
            <p className="text-xs text-brand-400 text-center mb-4">Basert på et ekte meglertilbud – tomt til 3 MNOK</p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div />
              <div className="text-center font-semibold text-tomtly-accent">Tomtly</div>
              <div className="text-center font-semibold text-red-500">Trad. megler</div>

              <div className="text-brand-600">Provisjon</div>
              <div className="text-center font-medium text-tomtly-dark">75 000 kr</div>
              <div className="text-center text-red-600">51 000 kr</div>

              <div className="text-brand-600">Markedspakke</div>
              <div className="text-center font-medium text-tomtly-dark">0 kr</div>
              <div className="text-center text-red-600">18 200 kr</div>

              <div className="text-brand-600">Oppgjør</div>
              <div className="text-center font-medium text-tomtly-dark">9 990 kr</div>
              <div className="text-center text-red-600">6 900 kr</div>

              <div className="text-brand-600">Tilrettelegging</div>
              <div className="text-center font-medium text-tomtly-dark">0 kr</div>
              <div className="text-center text-red-600">15 900 kr</div>

              <div className="text-brand-600">Visning, gebyr, kommune</div>
              <div className="text-center font-medium text-tomtly-dark">835 kr</div>
              <div className="text-center text-red-600">11 585 kr</div>

              <div className="text-brand-600 font-bold pt-2 border-t border-brand-200">Totalt</div>
              <div className="text-center font-bold text-green-700 pt-2 border-t border-brand-200 text-base">90 815 kr</div>
              <div className="text-center font-bold text-red-600 pt-2 border-t border-brand-200 text-base">103 585 kr</div>

              <div className="text-brand-600">Analyse og husmodeller</div>
              <div className="text-center text-tomtly-accent font-bold">Inkludert</div>
              <div className="text-center text-red-400">Nei</div>
            </div>
            <p className="text-xs text-green-700 text-center mt-4 font-semibold">Du sparer 12 770 kr – og får ti ganger mer med Tomtly</p>
          </div>
        </div>

        {/* Links to dedicated pages */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <Link href="/for-meglere" className="text-tomtly-accent hover:underline font-medium">Tomtly for meglere</Link>
          <span className="text-brand-300">|</span>
          <Link href="/for-husleverandorer" className="text-tomtly-accent hover:underline font-medium">For husleverandører</Link>
          <span className="text-brand-300">|</span>
          <Link href="/for-entreprenorer" className="text-tomtly-accent hover:underline font-medium">For entreprenører</Link>
          <span className="text-brand-300">|</span>
          <Link href="/utvikler" className="text-tomtly-accent hover:underline font-medium">For utviklere</Link>
          <span className="text-brand-300">|</span>
          <Link href="/for-banker" className="text-tomtly-accent hover:underline font-medium">For banker</Link>
          <span className="text-brand-300">|</span>
          <Link href="/kommune" className="text-tomtly-accent hover:underline font-medium">For kommuner</Link>
        </div>

        {/* Prisoversikt alle segmenter */}
        <div className="mt-8 bg-brand-50 rounded-xl border border-brand-200 p-4">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-brand-600">
            <Link href="/for-meglere" className="hover:text-tomtly-accent">For meglere: <span className="font-semibold text-tomtly-dark">gratis / 4 900 kr</span></Link>
            <span className="text-brand-300">|</span>
            <Link href="/utvikler" className="hover:text-tomtly-accent">Utviklere: <span className="font-semibold text-tomtly-dark">fra 4 900 kr</span></Link>
            <span className="text-brand-300">|</span>
            <Link href="/for-entreprenorer" className="hover:text-tomtly-accent">Entreprenører: <span className="font-semibold text-tomtly-dark">14 900 kr/år</span></Link>
            <span className="text-brand-300">|</span>
            <Link href="/kommune" className="hover:text-tomtly-accent">Kommuner: <span className="font-semibold text-tomtly-dark">4 900 kr/tomt + 2,5 %</span></Link>
            <span className="text-brand-300">|</span>
            <Link href="/for-banker" className="hover:text-tomtly-accent">Banker: <span className="font-semibold text-tomtly-dark">4 900 kr/innvilget lån</span></Link>
            <span className="text-brand-300">|</span>
            <Link href="/naering" className="hover:text-tomtly-accent">Næring: <span className="font-semibold text-tomtly-dark">fra 14 900 kr + 2,5 %</span></Link>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-brand-400 text-center mt-8">
          Tomtly har autorisert meglerpartner og bistår med salg. Oppgjør via Propr.
        </p>
      </div>
    </section>
  )
}

// ---- Fradeling banner ----

function FradelingBanner() {
  return (
    <section className="bg-forest-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-white rounded-2xl p-8 border border-tomtly-accent/20 shadow-sm">
          <div>
            <h3 className="font-display text-xl lg:text-2xl font-bold text-tomtly-dark mb-2">
              Har du en stor tomt? Du kan sitte på skjulte millioner.
            </h3>
            <p className="text-brand-600">
              Mange norske eneboliger har mer tomt enn de trenger. Vi hjelper deg å vurdere og synliggjøre mulighetene.
            </p>
          </div>
          <Link
            href="/fradeling"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors whitespace-nowrap flex-shrink-0"
          >
            Les mer om fradeling
            <ArrowRight className="w-4 h-4" />
          </Link>
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
          Klar til å synliggjøre tomten din?
        </h2>
        <p className="text-brand-400 mb-8 max-w-lg mx-auto">
          Det tar under 5 minutter å registrere tomten din. Vi analyserer og publiserer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/selger/onboarding"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Legg ut din tomt
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/megler/onboarding"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
          >
            For meglere
          </Link>
        </div>
      </div>
    </section>
  )
}
