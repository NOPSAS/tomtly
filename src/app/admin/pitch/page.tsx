'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Wrench,
  Landmark,
  DollarSign,
  CheckCircle2,
  ArrowRight,
  Quote,
  Users,
  Target,
  Zap,
} from 'lucide-react'

const TABS = [
  { id: 'leverandorer', label: 'Ferdighusleverandører', icon: Building2 },
  { id: 'entreprenorer', label: 'Entreprenører', icon: Wrench },
  { id: 'banker', label: 'Banker', icon: Landmark },
  { id: 'samarbeidspartnere', label: 'Samarbeidspartnere', icon: Users },
  { id: 'inntektsmodell', label: 'Inntektsmodell', icon: DollarSign },
] as const

type TabId = (typeof TABS)[number]['id']

export default function PitchPage() {
  const [activeTab, setActiveTab] = useState<TabId>('leverandorer')

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-tomtly-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Tilbake til admin
          </Link>
          <h1 className="font-display text-3xl font-bold">Forretningsmodell &amp; Pitch</h1>
          <p className="text-brand-400 mt-2">Pitch-materiell for moter med partnere og investorer</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-brand-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-tomtly-accent text-white'
                    : 'text-brand-500 hover:bg-brand-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeTab === 'leverandorer' && <TabLeverandorer />}
        {activeTab === 'entreprenorer' && <TabEntreprenorer />}
        {activeTab === 'banker' && <TabBanker />}
        {activeTab === 'samarbeidspartnere' && <TabSamarbeidspartnere />}
        {activeTab === 'inntektsmodell' && <TabInntektsmodell />}
      </div>
    </div>
  )
}

// ---- Tab 1: Ferdighusleverandører ----

function TabLeverandorer() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-brand-200 p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded-full mb-4">
          <Building2 className="w-3.5 h-3.5" />
          Ferdighusleverandører
        </div>
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-2">
          Vis husene deres til folk som faktisk har tomt
        </h2>
        <p className="text-brand-600 max-w-2xl">
          Tomtly kobler ferdighusleverandører direkte med kvalifiserte tomteeiere som aktivt planlegger å bygge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Problemet">
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
              Ferdighusleverandører bruker millioner på markedsføring mot folk som ikke har tomt
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
              Kundeflyten er lang: fra interesse til tomt til valg av hus kan det ta ar
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
              Vanskelig å vite hvilke hus som passer på en gitt tomt (regulering, topografi)
            </li>
          </ul>
        </Card>

        <Card title="Losningen">
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              Tomtly viser husene deres direkte på tomtesidene til kvalifiserte kjøpere
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              Vi matcher hus med tomt basert på regulering, BYA og topografi
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              Kjøperen ser komplett budsjett med huset plassert på tomten
            </li>
          </ul>
        </Card>
      </div>

      <Card title="Slik fungerer det">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { nr: '1', tittel: 'Vi mottar husmodellkatalog', desc: 'Leverandoren sender oss husmodeller med spesifikasjoner og priser.' },
            { nr: '2', tittel: 'Matching med tomter', desc: 'Vi matcher hus med tomter basert på regulering, BYA, topografi og stil.' },
            { nr: '3', tittel: 'Visning på tomtesiden', desc: 'Husene vises med fasadebilder, plantegninger og komplett budsjett.' },
            { nr: '4', tittel: 'Leads til leverandør', desc: 'Når kjøper velger et hus, får leverandøren en kvalifisert lead.' },
          ].map((s) => (
            <div key={s.nr}>
              <div className="text-3xl font-display font-bold text-brand-200 mb-2">{s.nr}</div>
              <h4 className="font-semibold text-tomtly-dark text-sm mb-1">{s.tittel}</h4>
              <p className="text-xs text-brand-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Hva de far">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Husene vist på ekte tomter med komplett analyse',
            'Kvalifiserte leads fra folk som har tomt og budsjett',
            'Datainnsikt: hvilke hus som er mest populære per omrade',
            'Eksponering mot en ny kanal uten egen markedsføring',
          ].map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Prising">
          <p className="text-2xl font-bold text-tomtly-dark mb-1">Fra 5 000 kr/mnd</p>
          <p className="text-sm text-brand-600">inkl. 10 husmodeller</p>
        </Card>

        <Card title="Markedsstorrelse">
          <p className="text-sm text-brand-700">
            <strong>30-50 ferdighusleverandører</strong> i Norge. Mal: 20 leverandører.
          </p>
        </Card>
      </div>

      <QuoteBlock
        quote="Vi bruker 2 millioner i året på markedsføring, men de fleste som kontakter oss har ikke tomt. Med Tomtly når vi folk som faktisk er klare til å bygge."
        author="Typisk ferdighusleverandør"
      />
    </div>
  )
}

// ---- Tab 2: Entreprenører ----

function TabEntreprenorer() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-brand-200 p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded-full mb-4">
          <Wrench className="w-3.5 h-3.5" />
          Samarbeidsentreprenører
        </div>
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-2">
          Kvalifiserte byggeprosjekter levert til doren
        </h2>
        <p className="text-brand-600 max-w-2xl">
          Tomtly leverer ferdig spesifiserte oppdrag til entreprenører - grunnarbeider, ror, elektro og mer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Problemet">
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
              Entreprenører bruker mye tid på å gi tilbud som aldri blir noe av
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
              Vanskelig å finne kvalifiserte prosjekter med realistisk budsjett
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
              Mye usikkerhet rundt kundenes forventninger og okonomi
            </li>
          </ul>
        </Card>

        <Card title="Losningen">
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              Tomtly leverer ferdig spesifiserte oppdrag med budsjett og tidsplan
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              Kunden har allerede kjopt tomt og valgt hus
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              Realistiske budsjetter basert på markedsdata
            </li>
          </ul>
        </Card>
      </div>

      <Card title="Slik fungerer det">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { nr: '1', tittel: 'Registrer som partner', desc: 'Oppgi kompetanse, kapasitet og omrade.' },
            { nr: '2', tittel: 'Vi matcher oppdrag', desc: 'Nar en kjoper er klar, matcher vi med riktig entreprenor.' },
            { nr: '3', tittel: 'Gi tilbud', desc: 'Du gir tilbud på et ferdig spesifisert prosjekt.' },
            { nr: '4', tittel: 'Gjennomfor', desc: 'Ved signert avtale fakturerer Tomtly 3-8% paslag.' },
          ].map((s) => (
            <div key={s.nr}>
              <div className="text-3xl font-display font-bold text-brand-200 mb-2">{s.nr}</div>
              <h4 className="font-semibold text-tomtly-dark text-sm mb-1">{s.tittel}</h4>
              <p className="text-xs text-brand-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Hva de far">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Kvalifiserte prosjekter med ferdig budsjett og tidsplan',
            'Kunder som allerede har tomt, hus og finansiering',
            'Redusert tid brukt på tilbudsarbeid',
            'Forutsigbar pipeline av nye prosjekter',
          ].map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </div>
      </Card>

      <Card title="Prismodell">
        <div className="flex items-center gap-4">
          <div className="bg-forest-50 rounded-xl px-6 py-4 border border-forest-200">
            <p className="text-sm font-medium text-brand-500">Deltakelse</p>
            <p className="text-2xl font-bold text-tomtly-dark">Gratis</p>
          </div>
          <ArrowRight className="w-5 h-5 text-brand-400" />
          <div className="bg-forest-50 rounded-xl px-6 py-4 border border-forest-200">
            <p className="text-sm font-medium text-brand-500">Ved signert avtale</p>
            <p className="text-2xl font-bold text-tomtly-dark">3-8% paslag</p>
          </div>
        </div>
      </Card>

      <QuoteBlock
        quote="Halvparten av tilbudene vi gir blir aldri noe av. Med Tomtly vet vi at kunden er kvalifisert og at prosjektet er realistisk for vi legger ned arbeid."
        author="Typisk entreprenor"
      />
    </div>
  )
}

// ---- Tab 3: Banker ----

function TabBanker() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-brand-200 p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded-full mb-4">
          <Landmark className="w-3.5 h-3.5" />
          Banker
        </div>
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-2">
          Kvalifiserte byggelånskunder med ferdig prosjektkalkyle
        </h2>
        <p className="text-brand-600 max-w-2xl">
          Tomtly leverer forhands-kvalifiserte byggelånskunder med komplett prosjektbudsjett og dokumentasjon.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Problemet">
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
              Banker mangler innsikt i hva kunden faktisk skal bygge
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
              Byggeland-soknader er tidkrevende å vurdere uten komplett underlag
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
              Mange byggelån-kunder faller fra fordi prosjektet aldri blir realisert
            </li>
          </ul>
        </Card>

        <Card title="Losningen">
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              Kunden kommer med ferdig tomtanalyse, valgt hus og komplett budsjett
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              Fastpriser fra leverandører gir lav usikkerhet
            </li>
            <li className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              Høyre konverteringsrate på byggelån
            </li>
          </ul>
        </Card>
      </div>

      <Card title="Slik fungerer det">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { nr: '1', tittel: 'Kunden bruker Tomtly', desc: 'Finner tomt, velger hus, ser komplett budsjett.' },
            { nr: '2', tittel: 'Finansieringsberegner', desc: 'Tomtly viser beregnet manedskostnad og kapitalbehov.' },
            { nr: '3', tittel: 'Lead til bank', desc: 'Kunden klikker "Sok byggelån" og sendes til partnerbank.' },
            { nr: '4', tittel: 'Rask behandling', desc: 'Banken mottar komplett underlag og kan gi raskt svar.' },
          ].map((s) => (
            <div key={s.nr}>
              <div className="text-3xl font-display font-bold text-brand-200 mb-2">{s.nr}</div>
              <h4 className="font-semibold text-tomtly-dark text-sm mb-1">{s.tittel}</h4>
              <p className="text-xs text-brand-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Samarbeidsmodell">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Lead-fee per kvalifisert byggelån-soknad',
            'Banken får komplett prosjektbudsjett med dokumentasjon',
            'Kunden er pre-kvalifisert med realistisk budsjett',
            'Mulighet for co-branding på finansieringssiden',
          ].map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </div>
      </Card>

      <QuoteBlock
        quote="Vi bruker mye tid på byggelån-søknader med mangelfullt underlag. Hadde kunden kommet med en ferdig Tomtly-analyse, ville behandlingstiden vært halvert."
        author="Typisk bankrådgiver"
      />

      <Card title="Fordeler for banken">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            'Raskere saksbehandling med komplett underlag',
            'Høyre konvertering på byggelån',
            'Lavere risiko med fastpriser fra leverandører',
            'Ny kanal for å nå byggekunder',
          ].map((f) => (
            <div key={f} className="flex items-start gap-2 text-sm text-brand-700">
              <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
              {f}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ---- Tab 4: Samarbeidspartnere ----

function TabSamarbeidspartnere() {
  const partnere = [
    {
      ikon: '🏠',
      navn: 'Ferdighusleverandører',
      eksempler: 'Hedalm-Anebyhus, ABChus, Mesterhus',
      viTilbyr: 'Husmodellene deres vises direkte på tomtesider til kvalifiserte kjøpere som har tomt og budsjett. Matching basert på regulering, BYA og topografi.',
      deBetaler: 'Månedlig abonnement for husmodelleksponering (fra 5 000 kr/mnd)',
      forKunden: 'Ser hvilke hus som passer på tomten, med komplett budsjett. Slipper å lete selv.',
    },
    {
      ikon: '🔧',
      navn: 'Entreprenører',
      eksempler: 'Lokale og regionale entreprenører',
      viTilbyr: 'Kvalifiserte byggeprosjekter med ferdig budsjett og tidsplan. Kunden har allerede kjøpt tomt og valgt hus.',
      deBetaler: '14 900 kr/år i årsavgift for kvalifiserte leads',
      forKunden: 'Får tilbud fra kvalitetssikrede entreprenører med forutsigbare priser.',
    },
    {
      ikon: '🏦',
      navn: 'Banker',
      eksempler: 'Samarbeidsbanker for byggelån',
      viTilbyr: 'Forhåndskvalifiserte byggelånskunder med komplett prosjektbudsjett og dokumentasjon. Raskere saksbehandling.',
      deBetaler: '4 900 kr lead-fee per innvilget byggelån',
      forKunden: 'Får raskere lånesvar fordi banken mottar komplett underlag fra Tomtly-analysen.',
    },
    {
      ikon: '💰',
      navn: 'Finansieringspartnere',
      eksempler: 'Kameo, Oblinor',
      viTilbyr: 'Leads fra utviklere og kjøpere som trenger prosjektlån, brolån eller alternativ finansiering. Komplett låneunderlag fra vår analyse.',
      deBetaler: '4 900–14 900 kr lead-fee per innvilget lån',
      forKunden: 'Får tilgang til rask og fleksibel finansiering med sikkerhet i eiendom, når banken ikke passer.',
    },
    {
      ikon: '🤝',
      navn: 'Propr',
      eksempler: 'Oppgjørspartner',
      viTilbyr: 'Vi sender alle kunder som kjøper tomt via Tomtly til Propr for oppgjør. Forutsigbar pipeline.',
      deBetaler: 'Formidlingsgebyr per oppgjør (ca. 2 500 kr)',
      forKunden: 'Trygt og profesjonelt eiendomsoppgjør til fast pris (9 990 kr).',
    },
    {
      ikon: '📸',
      navn: 'Fotografer',
      eksempler: 'Dronefotografer og eiendomsfotografer',
      viTilbyr: 'Vi fasiliterer drone- og fotojobber for tomtesider. Forutsigbar bestillingsflyt.',
      deBetaler: 'Vi tar margin per oppdrag (ca. 1 000 kr på 5 500 kr-oppdrag)',
      forKunden: 'Profesjonelle bilder av tomten uten å måtte finne fotograf selv.',
    },
    {
      ikon: '✏️',
      navn: 'Tegnebua / Konsepthus',
      eksempler: 'Arkitektavdeling',
      viTilbyr: 'Kjøpere som trenger byggesøknad, situasjonsplan og arkitekttegninger sendes til Tegnebua/Konsepthus.',
      deBetaler: 'Arkitektinntekt per oppdrag (fastpris tegning og søknad)',
      forKunden: 'Får ferdig byggesøknad og tegninger til fastpris, koordinert med resten av prosessen.',
    },
  ]

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-brand-200 p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded-full mb-4">
          <Users className="w-3.5 h-3.5" />
          Samarbeidspartnere
        </div>
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-2">
          Alle partnere vi pitcher til
        </h2>
        <p className="text-brand-600 max-w-2xl">
          Tomtly eier hele verdikjeden fra tomt til ferdig hus. Her er alle samarbeidspartnerne og hva de betaler oss.
        </p>
      </div>

      {partnere.map((p) => (
        <div key={p.navn} className="bg-white rounded-2xl border border-brand-200 p-6 lg:p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{p.ikon}</span>
            <div>
              <h3 className="font-display text-lg font-bold text-tomtly-dark">{p.navn}</h3>
              <p className="text-xs text-brand-500">{p.eksempler}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <p className="text-xs font-semibold text-blue-700 mb-1 uppercase">Hva vi tilbyr dem</p>
              <p className="text-sm text-blue-800">{p.viTilbyr}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <p className="text-xs font-semibold text-green-700 mb-1 uppercase">Hva de betaler oss</p>
              <p className="text-sm text-green-800">{p.deBetaler}</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
              <p className="text-xs font-semibold text-amber-700 mb-1 uppercase">Hva det betyr for kunden</p>
              <p className="text-sm text-amber-800">{p.forKunden}</p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-forest-50 rounded-2xl border border-forest-200 p-8 text-center">
        <h3 className="font-display text-xl font-bold text-tomtly-dark mb-3">Oppsummert</h3>
        <p className="text-brand-700 max-w-2xl mx-auto">
          Alle partnere betaler oss fordi vi leverer kvalifiserte kunder med komplett underlag. Kunden betaler lite eller ingenting ekstra – verdien ligger i at vi koordinerer hele prosessen.
        </p>
      </div>
    </div>
  )
}

// ---- Tab 5: Inntektsmodell ----

function TabInntektsmodell() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-brand-200 p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-forest-50 text-forest-700 text-xs font-semibold rounded-full mb-4">
          <DollarSign className="w-3.5 h-3.5" />
          Inntektsmodell
        </div>
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-2">
          Verdikjede per tomt
        </h2>
        <p className="text-brand-600 max-w-2xl">
          Tomtly tjener penger på hele verdikjeden - fra analyse til ferdig bygd bolig.
        </p>
      </div>

      {/* Flow diagram */}
      <Card title="Inntektsflyt per tomt">
        <div className="overflow-x-auto">
          <div className="flex items-center gap-3 min-w-[900px] py-4">
            <FlowStep label="Tomteeier" sublabel="4 990 kr + 2,5 %" color="bg-blue-50 border-blue-200 text-blue-800" />
            <ArrowRight className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <FlowStep label="Tomtanalyse" sublabel="Mulighetsstudie" color="bg-brand-50 border-brand-200 text-brand-700" />
            <ArrowRight className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <FlowStep label="Publisering" sublabel="Pa Tomtly.no" color="bg-brand-50 border-brand-200 text-brand-700" />
            <ArrowRight className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <FlowStep label="Salg via megler" sublabel="2,5 % prov." color="bg-green-50 border-green-200 text-green-800" />
            <ArrowRight className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <FlowStep label="Kjoper overtar" sublabel="Velger hus" color="bg-brand-50 border-brand-200 text-brand-700" />
            <ArrowRight className="w-5 h-5 text-brand-400 flex-shrink-0" />
            <FlowStep label="Addons" sublabel="Se under" color="bg-amber-50 border-amber-200 text-amber-800" />
          </div>
        </div>
      </Card>

      {/* Addon pricing */}
      <Card title="Addon-inntekter per tomt">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { tjeneste: 'Situasjonsplan', pris: '5 000 kr' },
            { tjeneste: 'Byggesoknad', pris: '25 000 kr' },
            { tjeneste: 'Dispensasjon', pris: '10 000 kr' },
            { tjeneste: 'Arkitekttegninger', pris: '20 000 kr' },
            { tjeneste: 'Finansiering (lead-fee)', pris: 'Varierer' },
            { tjeneste: 'Entreprenorpaslag', pris: '3-8%' },
          ].map((a) => (
            <div key={a.tjeneste} className="flex items-center justify-between bg-brand-50 rounded-lg p-3 border border-brand-100">
              <span className="text-sm text-brand-700">{a.tjeneste}</span>
              <span className="text-sm font-bold text-tomtly-dark">{a.pris}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Per-tomt economics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-green-50 rounded-2xl border border-green-200 p-6 text-center">
          <p className="text-sm font-medium text-green-700 mb-1">Total verdi per tomt</p>
          <p className="text-3xl font-bold text-green-800">180 000 - 300 000 kr</p>
        </div>
        <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6 text-center">
          <p className="text-sm font-medium text-blue-700 mb-1">Kostnad per tomt</p>
          <p className="text-3xl font-bold text-blue-800">~4 000 kr</p>
          <p className="text-xs text-blue-600 mt-1">(ca. 4 timer)</p>
        </div>
        <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 text-center">
          <p className="text-sm font-medium text-amber-700 mb-1">Margin per tomt</p>
          <p className="text-3xl font-bold text-amber-800">97-98%</p>
        </div>
      </div>

      {/* Key metrics */}
      <Card title="Nokkelmetrikker">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-200">
                <th className="text-left py-3 pr-4 font-semibold text-brand-700">Metrikk</th>
                <th className="text-right py-3 px-4 font-semibold text-brand-700">Verdi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {[
                ['Tomteeier fastpris', '4 990 kr'],
                ['Provisjon ved salg', '2,5 %'],
                ['Megler Premium', '4 900 kr'],
                ['Addon-inntekt snitt per tomt', '40 000 - 60 000 kr'],
                ['Kostnad per analyse', '~4 000 kr'],
                ['LTV per tomt (konservativt)', '~75 000 kr'],
                ['LTV per tomt (optimistisk)', '~300 000 kr'],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="py-2.5 pr-4 text-brand-600">{k}</td>
                  <td className="py-2.5 px-4 text-right font-medium text-tomtly-dark">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Revenue projections */}
      <Card title="Inntektsprognoser">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-200">
                <th className="text-left py-3 pr-4 font-semibold text-brand-700">Metrikk</th>
                <th className="text-right py-3 px-4 font-semibold text-brand-700">Mnd 6 (kons.)</th>
                <th className="text-right py-3 px-4 font-semibold text-brand-700">Mnd 12 (kons.)</th>
                <th className="text-right py-3 px-4 font-semibold text-brand-700">Mnd 6 (opt.)</th>
                <th className="text-right py-3 px-4 font-semibold text-brand-700">Mnd 12 (opt.)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {[
                ['Tomtanalyser/mnd', '15', '30', '30', '80'],
                ['Meglere (abonnement)', '5', '15', '10', '25'],
                ['Leverandorer', '3', '8', '5', '15'],
                ['MRR analyser', '73 500 kr', '147 000 kr', '147 000 kr', '392 000 kr'],
                ['MRR meglere', '37 500 kr', '112 500 kr', '75 000 kr', '187 500 kr'],
                ['MRR leverandører', '15 000 kr', '40 000 kr', '25 000 kr', '75 000 kr'],
                ['Total MRR', '126 000 kr', '299 500 kr', '247 000 kr', '654 500 kr'],
                ['ARR', '1,5 MNOK', '3,6 MNOK', '3,0 MNOK', '7,9 MNOK'],
              ].map(([label, ...values]) => (
                <tr key={label}>
                  <td className="py-2.5 pr-4 text-brand-600">{label}</td>
                  {values.map((v, i) => (
                    <td key={i} className="py-2.5 px-4 text-right font-medium text-tomtly-dark">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// ---- Shared components ----

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-200 p-6 lg:p-8">
      <h3 className="font-display text-lg font-bold text-tomtly-dark mb-4">{title}</h3>
      {children}
    </div>
  )
}

function QuoteBlock({ quote, author }: { quote: string; author: string }) {
  return (
    <div className="bg-forest-50 rounded-2xl border border-forest-200 p-8">
      <Quote className="w-8 h-8 text-forest-300 mb-3" />
      <blockquote className="text-lg text-forest-800 italic leading-relaxed mb-3">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <p className="text-sm font-medium text-forest-600">- {author}</p>
    </div>
  )
}

function FlowStep({ label, sublabel, color }: { label: string; sublabel: string; color: string }) {
  return (
    <div className={`rounded-xl border px-4 py-3 text-center flex-shrink-0 ${color}`}>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-xs mt-0.5 opacity-80">{sublabel}</p>
    </div>
  )
}
