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
} from 'lucide-react'

// ============================================================
// FORSIDE – Tomtly
// ============================================================

export default function Forside() {
  return (
    <>
      <HeroSection />
      <LogoBar />
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
    <section className="relative bg-tomtly-dark overflow-hidden">
      {/* Background pattern */}
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-900/50 border border-forest-700/30 rounded-full mb-6">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-xs text-forest-300 font-medium">
              Ny plattform for tomtesalg
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Se potensialet
            <br />
            <span className="text-forest-400">i tomten</span>
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
              <p className="text-2xl font-bold text-white">78</p>
              <p className="text-sm text-brand-500">Gj.snitt tomtescore</p>
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

// ---- Logobar ----

function LogoBar() {
  return (
    <section className="border-b border-brand-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-center text-xs text-brand-400 uppercase tracking-widest mb-6">
          Brukt av ledende aktører
        </p>
        <div className="flex items-center justify-center gap-12 opacity-40 grayscale">
          <span className="text-lg font-semibold text-brand-600">DNB Eiendom</span>
          <span className="text-lg font-semibold text-brand-600">Krogsveen</span>
          <span className="text-lg font-semibold text-brand-600">Privatmegleren</span>
          <span className="text-lg font-semibold text-brand-600">EiendomsMegler 1</span>
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
      tittel: 'Last opp tomten',
      beskrivelse:
        'Legg inn adresse og tomtegrenser. Vi henter reguleringsdata automatisk.',
    },
    {
      nummer: '02',
      ikon: BarChart3,
      tittel: 'AI-analyse',
      beskrivelse:
        'Vårt system analyserer regulering, topografi, marked og infrastruktur.',
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
      id: '1',
      adresse: 'Bjørnemyrveien 24',
      poststed: 'Oppegård',
      areal: 1240,
      score: 82,
      pris: 4500000,
      type: 'Eneboligtomt',
      bilde: '/placeholder-tomt-1.jpg',
    },
    {
      id: '2',
      adresse: 'Solveien 8',
      poststed: 'Ski',
      areal: 890,
      score: 74,
      pris: 3200000,
      type: 'Tomannsboligtomt',
      bilde: '/placeholder-tomt-2.jpg',
    },
    {
      id: '3',
      adresse: 'Granåsveien 15',
      poststed: 'Kolbotn',
      areal: 2100,
      score: 91,
      pris: 8500000,
      type: 'Utviklingstomt',
      bilde: '/placeholder-tomt-3.jpg',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-3">
              Utvalgte tomter
            </h2>
            <p className="text-brand-600">
              Ferdig analysert med mulighetsstudie og utviklingsscenario.
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
              {/* Image placeholder */}
              <div className="aspect-[4/3] bg-brand-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
                  <span className="text-xs font-semibold text-tomtly-accent">
                    Score {t.score}
                  </span>
                </div>
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
        'Automatisk analyse',
      ],
    },
    {
      ikon: Building2,
      tittel: 'Utviklere',
      beskrivelse:
        'Finn tomter med høyt utviklingspotensial. Spar tid på due diligence.',
      fordeler: [
        'Tomtescore-filtrering',
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

// ---- Prismodell (Abonnement) ----

function Prismodell() {
  const abonnementer = [
    {
      id: 'basis',
      navn: 'Basis',
      pris: '5 000',
      periode: '/mnd',
      husmodeller: '1 husmodell',
    },
    {
      id: 'standard',
      navn: 'Standard',
      pris: '7 500',
      periode: '/mnd',
      popular: true,
      husmodeller: '3 husmodeller',
    },
    {
      id: 'pro',
      navn: 'Pro',
      pris: '10 000',
      periode: '/mnd',
      husmodeller: '5 husmodeller',
    },
  ]

  const inkludertAlt = [
    'Full tomteanalyse og tomtescore',
    'Reguleringsanalyse',
    'Mulighetsstudie og scenarioer',
    'Byggekostnad og salgsverdi',
    'Dispensasjons- og kravanalyse',
    'Godkjente tiltak i nærområdet',
    'Entreprenørprising',
    'Finansieringsberegner',
    'Tidslinje for byggesøknad',
    'Risikoanalyse',
    'Prosjektsjekkliste',
    'Fastpris tegning og søknad via Tegnebua',
    'Publisering på Tomtly',
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Velg din modell
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Tre måter å komme i gang. Alle gir deg full tomteanalyse – forskjellen er hvordan du betaler og hvor mange husmodeller du kan velge.
          </p>
        </div>

        {/* Betalingsmodeller */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {/* Fastpris */}
          <div className="border-2 border-brand-200 rounded-2xl p-7">
            <div className="text-sm font-medium text-brand-500 mb-2">Fastpris</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">20 000</span>
              <span className="text-brand-500">kr</span>
            </div>
            <p className="text-sm text-brand-500 mb-2">engangsbetaling per tomt</p>
            <div className="inline-block px-2 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded mb-5">
              3 husmodeller
            </div>
            <p className="text-sm text-brand-600 mb-6">
              Betal én gang. Full analyse og 3 husmodeller på tomten. Ingen løpende kostnad.
            </p>
            <Link
              href="/selger/onboarding"
              className="block w-full text-center px-4 py-3 border-2 border-tomtly-accent text-tomtly-accent font-medium rounded-lg hover:bg-forest-50 transition-colors"
            >
              Kom i gang
            </Link>
          </div>

          {/* Provisjon */}
          <div className="border-2 border-tomtly-accent rounded-2xl p-7 relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">
              Ingen risiko
            </div>
            <div className="text-sm font-medium text-brand-500 mb-2">Provisjon</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">2%</span>
            </div>
            <p className="text-sm text-brand-500 mb-2">av salgssummen ved salg</p>
            <div className="inline-block px-2 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded mb-5">
              5 husmodeller
            </div>
            <p className="text-sm text-brand-600 mb-6">
              Ingen kostnad før tomten er solgt. Full analyse med 5 husmodeller. Du betaler kun ved suksess.
            </p>
            <Link
              href="/selger/onboarding"
              className="block w-full text-center px-4 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Kom i gang
            </Link>
          </div>

          {/* Abonnement */}
          <div className="border-2 border-brand-200 rounded-2xl p-7">
            <div className="text-sm font-medium text-brand-500 mb-2">Abonnement</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">5 000</span>
              <span className="text-brand-500">kr/mnd</span>
            </div>
            <p className="text-sm text-brand-500 mb-2">fra-pris, ingen bindingstid</p>
            <div className="inline-block px-2 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded mb-5">
              1–5 husmodeller
            </div>
            <p className="text-sm text-brand-600 mb-6">
              Fleksibelt. Velg antall husmodeller. Avslutt når du vil. Se priser under.
            </p>
            <Link
              href="/selger/onboarding"
              className="block w-full text-center px-4 py-3 border-2 border-tomtly-accent text-tomtly-accent font-medium rounded-lg hover:bg-forest-50 transition-colors"
            >
              Kom i gang
            </Link>
          </div>
        </div>

        {/* Abonnements-tabell */}
        <div className="max-w-3xl mx-auto mb-10">
          <h3 className="text-center text-sm font-semibold text-brand-700 mb-4">
            Abonnement – velg antall husmodeller
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {abonnementer.map((abo) => (
              <div
                key={abo.id}
                className={`text-center p-5 rounded-xl border-2 ${
                  abo.popular ? 'border-tomtly-accent bg-forest-50' : 'border-brand-200'
                }`}
              >
                {abo.popular && (
                  <span className="text-[10px] font-semibold text-tomtly-accent uppercase tracking-wide">Mest populær</span>
                )}
                <p className="text-sm font-medium text-brand-500">{abo.navn}</p>
                <p className="text-2xl font-bold text-tomtly-dark mt-1">{abo.pris} <span className="text-sm font-normal text-brand-400">kr/mnd</span></p>
                <p className="text-xs font-semibold text-forest-700 mt-1">{abo.husmodeller}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Inkludert i alle */}
        <div className="max-w-3xl mx-auto bg-brand-50 rounded-xl p-6 border border-brand-200">
          <h3 className="text-sm font-semibold text-brand-700 mb-4 text-center">
            Inkludert i alle modeller – per tomt
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {inkludertAlt.map((f) => (
              <div key={f} className="flex items-center gap-2 text-sm text-brand-700">
                <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-brand-400 mt-8">
          Alle priser er eks. mva. Meglere: se egne planer under «For meglere».
        </p>
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
