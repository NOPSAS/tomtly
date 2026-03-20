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
            Se potensialet i tomten
            <br />
            <span className="text-green-400">– vi gjør resten</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Komplett tomtanalyse, profesjonell markedsføring og salg. 4 990 kr – resten tar vi ved salg.
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
        'Vårt arkitekt- og eiendomsteam analyserer regulering, topografi og marked. Du får en komplett mulighetsstudie.',
    },
    {
      nummer: '03',
      ikon: FileText,
      tittel: 'Publisering og markedsføring',
      beskrivelse:
        'Tomten presenteres som et utviklingsprosjekt på Tomtly med profesjonelle visualiseringer og byggekalkyle.',
    },
    {
      nummer: '04',
      ikon: TrendingUp,
      tittel: 'Salg via vår megler',
      beskrivelse:
        'Vår fagansvarlige megler håndterer kjøperdialog, visning og salg. Du lener deg tilbake. Oppgjør via Propr.',
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
            En komplett pakke som gjør tomten din attraktiv for kjøpere.
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
            Enkel og rettferdig pris
          </h2>
        </div>

        <div className="max-w-xl mx-auto">
          {/* Tomteeier-pakke */}
          <div className="bg-white border-2 border-tomtly-accent rounded-2xl p-8 relative">
            <div className="absolute -top-3 right-6 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">
              Alt inkludert
            </div>
            <div className="text-sm font-medium text-brand-500 mb-2">Tomteeier</div>
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold text-tomtly-dark">4 990</span>
              <span className="text-brand-500">kr</span>
              <span className="text-brand-400 text-sm">+ 2,5 % ved salg</span>
            </div>
            <p className="text-sm text-brand-500 mb-5">Komplett analyse, markedsføring og salg via megler</p>
            <ul className="space-y-2 mb-6">
              {[
                'Tomtanalyse og mulighetsstudie fra arkitektteam',
                'Husmodeller tilpasset tomten',
                'Byggekalkyle og verdivurdering',
                'Visualiseringer og profesjonell presentasjon',
                'Publisering og markedsføring på Tomtly',
                'Salg via vår fagansvarlige megler',
                'Oppgjør via Propr',
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

          {/* Eksempelberegning */}
          <div className="mt-6 bg-white rounded-xl border border-brand-200 p-6">
            <h3 className="font-semibold text-tomtly-dark mb-3 text-center">Eksempel: Tomt solgt for 2 MNOK</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1 border-b border-brand-100">
                <span className="text-brand-600">Fastpris (analyse + markedsføring)</span>
                <span className="font-medium text-tomtly-dark">4 990 kr</span>
              </div>
              <div className="flex justify-between py-1 border-b border-brand-100">
                <span className="text-brand-600">Provisjon ved salg (2,5 % av 2 MNOK)</span>
                <span className="font-medium text-tomtly-dark">50 000 kr</span>
              </div>
              <div className="flex justify-between py-2 bg-green-50 rounded-lg px-3 -mx-3">
                <span className="font-semibold text-green-800">Total kostnad</span>
                <span className="font-bold text-green-800">54 990 kr</span>
              </div>
            </div>
          </div>

          {/* Sammenligning */}
          <div className="mt-6 bg-white rounded-xl border border-brand-200 p-6">
            <h3 className="font-semibold text-tomtly-dark mb-3 text-center">Tomtly vs. tradisjonell megler</h3>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div />
              <div className="text-center font-semibold text-tomtly-accent">Tomtly</div>
              <div className="text-center font-semibold text-brand-500">Trad. megler</div>

              <div className="text-brand-600">Fastpris</div>
              <div className="text-center font-medium text-tomtly-dark">4 990 kr</div>
              <div className="text-center text-brand-500">0 kr</div>

              <div className="text-brand-600">Provisjon</div>
              <div className="text-center font-medium text-tomtly-dark">2,5 %</div>
              <div className="text-center text-brand-500">1–3,6 %</div>

              <div className="text-brand-600">Tomt 2 MNOK</div>
              <div className="text-center font-medium text-green-700">54 990 kr</div>
              <div className="text-center text-brand-500">20 000–72 000 kr</div>

              <div className="text-brand-600">Inkluderer analyse</div>
              <div className="text-center text-tomtly-accent font-bold">Ja</div>
              <div className="text-center text-brand-500">Nei</div>
            </div>
          </div>
        </div>

        <p className="text-xs text-brand-400 text-center mt-8">
          Tomtly har fagansvarlig megler og bistår med salg. Oppgjør via Propr.
        </p>
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
      q: 'Hva er inkludert i prisen?',
      a: 'For 4 990 kr får du komplett tomtanalyse, mulighetsstudie, husmodeller, byggekalkyle, visualiseringer, publisering og markedsføring. Ved salg betaler du 2,5 % provisjon. Oppgjør håndteres trygt av Propr.',
    },
    {
      q: 'Kan jeg bruke analysen til å markedsføre på FINN eller via megler?',
      a: 'Ja, absolutt. Analysen er din, og du står fritt til å bruke den som underlag hvor du vil – på FINN, via megler, eller privat.',
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
          Klar til å synliggjøre tomten din?
        </h2>
        <p className="text-brand-400 mb-8 max-w-lg mx-auto">
          Det tar under 5 minutter å registrere tomten din. Vi analyserer og publiserer.
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
