import Link from 'next/link'
import {
  MapPin,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Home,
  FileText,
  Ruler,
  ChevronDown,
} from 'lucide-react'

export default function ForTomteeiereePage() {
  return (
    <>
      <HeroSection />
      <HvordanDetFungerer />
      <HvaFaarDu />
      <Prismodell />
      <FAQ />
      <CTASection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Home className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For tomteeiere
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Gjor tomten din til et
            <br />
            <span className="text-green-400">ferdig byggeprosjekt</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Tomter som presenteres med mulighetsstudie, husmodeller og byggekalkyle selger raskere og til hoyere pris.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/selger/onboarding"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bestill tomtanalyse
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#hvordan"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Slik fungerer det
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function HvordanDetFungerer() {
  const steg = [
    {
      nummer: '01',
      ikon: MapPin,
      tittel: 'Oppgi adressen',
      beskrivelse:
        'Legg inn adressen til tomten din. Vi henter reguleringsplan, matrikkeldata og kart automatisk.',
    },
    {
      nummer: '02',
      ikon: BarChart3,
      tittel: 'Vi analyserer',
      beskrivelse:
        'Vart arkitekt- og eiendomsteam analyserer regulering, topografi, marked og infrastruktur. Du far en komplett mulighetsstudie.',
    },
    {
      nummer: '03',
      ikon: TrendingUp,
      tittel: 'Tomten selges',
      beskrivelse:
        'Tomten presenteres som et ferdig byggeprosjekt. Kjøpere ser verdien umiddelbart. Du selger selv eller lar oss handtere det.',
    },
  ]

  return (
    <section id="hvordan" className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik fungerer det
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Fra tom tomt til ferdig byggeprosjekt på under en uke.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

function HvaFaarDu() {
  const leveranser = [
    'Profesjonell mulighetsstudie fra vårt arkitektteam',
    'Husmodeller tilpasset tomten med 3D-visualiseringer',
    'Detaljert byggekalkyle for hvert alternativ',
    'Verdivurdering basert på sammenlignbare salg',
    'Reguleringsanalyse med utnyttelsesgrad og begrensninger',
    'Tidsplan for byggeprosjektet',
    'Publisering på Tomtly med bilder og dokumenter',
    'Tomtescore – en samlet vurdering av tomtens potensial',
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hva du far
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            En komplett pakke som gjor tomten din attraktiv for kjøpere.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-brand-50 rounded-xl border border-brand-200 p-8">
            <ul className="space-y-3">
              {leveranser.map((l) => (
                <li key={l} className="flex items-start gap-3 text-brand-700">
                  <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Prismodell() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Velg det som passer deg
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Selg tomten selv */}
          <div className="bg-white border-2 border-brand-200 rounded-2xl p-7">
            <div className="text-sm font-medium text-brand-500 mb-2">Selg tomten selv</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">4 900</span>
              <span className="text-brand-500">kr</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Vi analyserer – du selger</p>
            <ul className="space-y-2 mb-6">
              {[
                'Profesjonell mulighetsstudie fra vårt arkitektteam',
                'Husmodeller tilpasset tomten med byggekalkyle',
                'Verdivurdering basert på sammenlignbare salg',
                'Reguleringsanalyse og tidsplan',
                'Publisering på Tomtly med bilder og dokumenter',
                'Du selger selv, via megler, eller på FINN',
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
              Bestill tomtanalyse
            </Link>
          </div>

          {/* Vi selger for deg */}
          <div className="bg-white border-2 border-tomtly-accent rounded-2xl p-7 relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">
              Mest populær
            </div>
            <div className="text-sm font-medium text-brand-500 mb-2">Vi selger for deg</div>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">4 900</span>
              <span className="text-brand-500">kr + 1% av salgssum</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Vi håndterer alt – du slipper å tenke på det</p>
            <ul className="space-y-2 mb-6">
              {[
                'Alt i tomtanalysen',
                'Vi setter markedspris basert på analysen',
                'Annonsering og markedsføring',
                'Booking av visninger – du viser frem tomten',
                'Kjøperdialog og forhandling',
                'Trygt oppgjør via Propr',
                'Du betaler 1% kun når tomten er solgt',
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
              Kom i gang – vi selger for deg
            </Link>
            <p className="text-xs text-brand-400 mt-3 text-center">
              Salg gjennomføres via Propr – en godkjent plattform for eiendomsoppgjør. Tomtly er ikke et eiendomsmeglerforetak.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const sporsmal = [
    {
      q: 'Hvor lang tid tar det å få tomtanalysen?',
      a: 'Vi leverer en komplett mulighetsstudie innen 3-5 virkedager etter at du har sendt inn tomten din.',
    },
    {
      q: 'Hva om tomten min ikke kan bebygges?',
      a: 'Vi analyserer reguleringsplanen for vi starter. Hvis tomten ikke kan bebygges, far du beskjed umiddelbart og betaler ingenting.',
    },
    {
      q: 'Hva er forskjellen mellom å selge selv og la dere selge?',
      a: 'Med "Selg selv" far du analysen og publisering, men håndterer salget på egen hand eller via megler. Med "Vi selger for deg" tar vi oss av alt fra markedsføring til oppgjør via Propr.',
    },
    {
      q: 'Hva er Propr?',
      a: 'Propr er en godkjent plattform for eiendomsoppgjør. Nar vi selger for deg, gjennomføres den juridiske transaksjonen trygt via Propr. Tomtly er ikke et eiendomsmeglerforetak.',
    },
    {
      q: 'Kan jeg bruke analysen til å selge på FINN eller via megler?',
      a: 'Ja, absolutt. Med "Selg selv"-pakken står du fritt til å bruke analysen som salgsunderlag hvor du vil – på FINN, via megler, eller privat.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Ofte stilte sporsmal
          </h2>
        </div>

        <div className="space-y-4">
          {sporsmal.map((s) => (
            <div key={s.q} className="bg-brand-50 rounded-xl border border-brand-200 p-6">
              <h3 className="font-semibold text-tomtly-dark mb-2">{s.q}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{s.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
          Klar til å selge smartere?
        </h2>
        <p className="text-brand-400 mb-8 max-w-lg mx-auto">
          Det tar under 5 minutter a registrere tomten din. Vi gjor resten.
        </p>
        <Link
          href="/selger/onboarding"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
        >
          Bestill tomtanalyse
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
