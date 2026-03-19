import Link from 'next/link'
import {
  Users,
  CheckCircle2,
  ArrowRight,
  Eye,
  TrendingUp,
  Clock,
  BarChart3,
  Shield,
  Zap,
} from 'lucide-react'

export default function ForMeglerePage() {
  return (
    <>
      <HeroSection />
      <Fordeler />
      <HvordanDetFungerer />
      <DashboardPreview />
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
            <Users className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For eiendomsmeglere
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Selg tomtene raskere
            <br />
            <span className="text-green-400">– helt gratis</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Legg til tomtene dine gratis. Vi lager mulighetsstudie og gjor tomten enklere a selge. Du beholder provisjonen din.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/megler/onboarding"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Legg til tomter gratis
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

function Fordeler() {
  const fordeler = [
    {
      ikon: Eye,
      tittel: 'Profesjonell presentasjon',
      beskrivelse:
        'Hver tomt far en komplett mulighetsstudie med husmodeller, 3D-visualiseringer og byggekalkyle. Kjopere ser potensial umiddelbart.',
    },
    {
      ikon: TrendingUp,
      tittel: 'Raskere salg',
      beskrivelse:
        'Tomter med mulighetsstudie selger i snitt 14 dager raskere. Kjopere tar beslutning raskere når de ser hva de kan bygge.',
    },
    {
      ikon: Shield,
      tittel: 'Du beholder hele provisjonen',
      beskrivelse:
        'Tomtly er helt gratis for meglere. Vi tar ingenting av provisjonen din. Du far et bedre salgsverktoy uten ekstra kostnad.',
    },
    {
      ikon: BarChart3,
      tittel: 'Meglerdashboard',
      beskrivelse:
        'Folg alle tomtene dine på ett sted. Se status, henvendelser og analyseresultater i sanntid.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hvorfor meglere bruker Tomtly
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Et gratis salgsverktoy som gjor tomtene dine enklere a selge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {fordeler.map((f) => (
            <div
              key={f.tittel}
              className="bg-brand-50 rounded-xl p-6 border border-brand-200"
            >
              <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center mb-4">
                <f.ikon className="w-5 h-5 text-tomtly-accent" />
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

function HvordanDetFungerer() {
  const steg = [
    {
      nummer: '01',
      tittel: 'Legg til tomtene dine',
      beskrivelse: 'Registrer tomtene du har i portefoljen. Vi henter matrikkeldata og reguleringsplan automatisk.',
    },
    {
      nummer: '02',
      tittel: 'Vi lager mulighetsstudie',
      beskrivelse: 'Vart arkitektteam analyserer tomten og lager profesjonell mulighetsstudie med husmodeller og byggekalkyle.',
    },
    {
      nummer: '03',
      tittel: 'Bruk det i salget',
      beskrivelse: 'Tomten presenteres som et ferdig byggeprosjekt. Del med kjopere, legg ved i prospekt, eller vis på visning.',
    },
  ]

  return (
    <section id="hvordan" className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik fungerer det for meglere
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steg.map((s) => (
            <div key={s.nummer}>
              <div className="text-5xl font-display font-bold text-brand-200 mb-4">
                {s.nummer}
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">{s.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{s.beskrivelse}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Meglerdashboard
          </h2>
          <p className="text-brand-600">
            Gi hele teamet tilgang til Tomtly med meglerdashboard og portefoljeoversikt. Se status på alle tomter, henvendelser og analyser på ett sted.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-brand-50 rounded-2xl border border-brand-200 p-8">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl p-4 border border-brand-200 text-center">
              <p className="text-2xl font-bold text-tomtly-dark">12</p>
              <p className="text-xs text-brand-500">Aktive tomter</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-brand-200 text-center">
              <p className="text-2xl font-bold text-tomtly-dark">8</p>
              <p className="text-xs text-brand-500">Mulighetsstudier klare</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-brand-200 text-center">
              <p className="text-2xl font-bold text-tomtly-dark">23</p>
              <p className="text-xs text-brand-500">Henvendelser denne mnd</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { adresse: 'Bjornemyrveien 20', status: 'Analyse klar', statusColor: 'text-green-600 bg-green-50' },
              { adresse: 'Gamle Alvaernvei 67', status: 'Under analyse', statusColor: 'text-yellow-600 bg-yellow-50' },
              { adresse: 'Tangenveien 14', status: 'Ny', statusColor: 'text-blue-600 bg-blue-50' },
            ].map((t) => (
              <div key={t.adresse} className="bg-white rounded-lg border border-brand-200 p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-tomtly-dark">{t.adresse}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${t.statusColor}`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
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
          Helt gratis for meglere
        </h2>
        <p className="text-brand-400 mb-8 max-w-lg mx-auto">
          Legg til tomtene dine og gi kjopere et profesjonelt salgsunderlag. Det tar under 2 minutter.
        </p>
        <Link
          href="/megler/onboarding"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
        >
          Legg til tomter gratis
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
