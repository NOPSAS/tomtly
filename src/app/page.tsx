import Link from 'next/link'
import { SkreddersyddAvtale } from '@/components/SkreddersyddAvtale'
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
} from 'lucide-react'

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
              Ny plattform for tomtesalg
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Se potensialet
            <br />
            <span className="text-green-400">i tomten</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Tomtly analyserer tomter og viser kjøpere nøyaktig hva som kan
            bygges – med arkitektens mulighetsstudie, byggekostnader og
            salgsverdi. Selg raskere. Selg dyrere.
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
              <p className="text-2xl font-bold text-white">2 400+</p>
              <p className="text-sm text-brand-500">Tomter analysert</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">4</p>
              <p className="text-sm text-brand-500">Husmodeller per tomt</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">14 dager</p>
              <p className="text-sm text-brand-500">Raskere salg</p>
            </div>
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
        'Legg inn adressen og fortell oss hva du ser for deg. Vi henter resten automatisk.',
    },
    {
      nummer: '02',
      ikon: BarChart3,
      tittel: 'Faglig analyse',
      beskrivelse:
        'Vårt arkitekt- og eiendomsteam analyserer regulering, topografi, marked og infrastruktur.',
    },
    {
      nummer: '03',
      ikon: Eye,
      tittel: 'Mulighetsstudie',
      beskrivelse:
        'Arkitekten vurderer hva som kan bygges med visualiseringer og scenarioer.',
    },
    {
      nummer: '04',
      ikon: TrendingUp,
      tittel: 'Publiser og selg',
      beskrivelse:
        'Tomten presenteres som et utviklingsprosjekt. Kjøpere ser verdien umiddelbart.',
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
      beskrivelse:
        'Vis kjøperne nøyaktig hva de kan bygge. Få høyere pris og raskere salg.',
      fordeler: [
        'Profesjonell presentasjon',
        'Arkitektens mulighetsstudie',
        'Estimert salgsverdi',
      ],
    },
    {
      ikon: Users,
      tittel: 'Eiendomsmeglere',
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
            <div
              key={s.tittel}
              className="bg-white rounded-xl p-8 border border-brand-200 hover:border-tomtly-accent/30 transition-colors"
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
            </div>
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
            Enkel og rettferdig prising
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Alle som bringer tomter inn på plattformen bruker Tomtly gratis. Tomteeiere som kommer direkte betaler 4 900 kr for analysen. Den egentlige inntekten kommer nedstrøms fra kjøper og partnere.
          </p>
        </div>

        {/* For tomteeiere */}
        <h3 className="text-center text-sm font-semibold text-brand-500 uppercase tracking-wide mb-3">
          For tomteeiere
        </h3>
        <p className="text-center text-sm text-brand-600 max-w-2xl mx-auto mb-8">
          Vi analyserer tomten din og lager en profesjonell utviklingscase med mulighetsstudie, husmodeller og byggekalkyle. 4 900 kr – og tomten din presenteres som et ferdig byggeprosjekt, ikke bare en gresslette.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {/* Standard */}
          <div className="border-2 border-brand-200 rounded-2xl p-7">
            <div className="text-sm font-medium text-brand-500 mb-2">Tomtanalyse</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">4 900</span>
              <span className="text-brand-500">kr</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">engangsbetaling – du selger selv</p>
            <ul className="space-y-2 mb-6">
              {[
                'Mulighetsstudie fra arkitektteamet',
                'Husmodeller tilpasset tomten med priser',
                'Byggekalkyle og verdivurdering',
                'Reguleringsanalyse',
                'Publisering på Tomtly',
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
              Kom i gang
            </Link>
          </div>

          {/* Med salgsoppdrag */}
          <div className="border-2 border-tomtly-accent rounded-2xl p-7 relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">
              Mest populær
            </div>
            <div className="text-sm font-medium text-brand-500 mb-2">Med salgsoppdrag via Propr</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">4 900</span>
              <span className="text-brand-500">kr + 1%</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">1% av salgssum – kun ved salg</p>
            <ul className="space-y-2 mb-6">
              {[
                'Alt i tomtanalysen',
                'Tomtly håndterer hele salgsprosessen',
                'Annonsering, visninger og kjøperdialog',
                'Trygt oppgjør via Propr',
                'Ingen risiko – du betaler kun ved suksess',
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

        {/* For meglere */}
        <h3 className="text-center text-sm font-semibold text-brand-500 uppercase tracking-wide mb-3">
          For eiendomsmeglere
        </h3>
        <p className="text-center text-sm text-brand-600 max-w-2xl mx-auto mb-8">
          Legg til tomtene dine gratis. Vi lager mulighetsstudie og gjør tomten enklere å selge. Du beholder provisjonen din.
        </p>
        <div className="max-w-2xl mx-auto mb-16">
          <div className="border-2 border-tomtly-accent rounded-2xl p-7">
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-accent">Gratis</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">for eiendomsmeglere</p>
            <ul className="space-y-2 mb-6">
              {[
                'Komplett mulighetsstudie for hver tomt',
                'Husmodeller med byggekalkyle og verdivurdering',
                'Profesjonell presentasjon som selger raskere',
                'Meglerdashboard med porteføljeoversikt',
                'Du beholder hele provisjonen din',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/megler/onboarding"
              className="block w-full text-center px-4 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Legg til tomter gratis
            </Link>
          </div>
        </div>

        {/* Tjenester for kjøper */}
        <h3 className="text-center text-sm font-semibold text-brand-500 uppercase tracking-wide mb-3">
          Tjenester for kjøper etter tomtekjøp
        </h3>
        <p className="text-center text-sm text-brand-600 max-w-2xl mx-auto mb-8">
          Når tomten er solgt, tilbyr vi kjøper alt de trenger for å bygge.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-4xl mx-auto mb-8">
          {[
            { tjeneste: 'Situasjonsplan', pris: '5 000 kr' },
            { tjeneste: 'Byggesøknad', pris: '25 000 kr' },
            { tjeneste: 'Dispensasjon', pris: '10 000 kr' },
            { tjeneste: 'Arkitekttegninger', pris: '20 000 kr' },
            { tjeneste: 'Tilbudsinnhenting', pris: 'Gratis' },
          ].map((t) => (
            <div key={t.tjeneste} className="bg-brand-50 rounded-xl p-4 text-center border border-brand-200">
              <p className="text-sm font-semibold text-tomtly-dark">{t.pris}</p>
              <p className="text-xs text-brand-500 mt-1">{t.tjeneste}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-brand-400 mt-8">
          Alle priser er eks. mva. Meglere, entreprenører og banker bruker Tomtly gratis.
        </p>

        <SkreddersyddAvtale />
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
          Klar til å selge smartere?
        </h2>
        <p className="text-brand-400 mb-8 max-w-lg mx-auto">
          Det tar under 5 minutter å registrere tomten din. Vi gjør resten.
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
