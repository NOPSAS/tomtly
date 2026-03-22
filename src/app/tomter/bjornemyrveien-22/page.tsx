import { TomtHero } from '@/components/tomt/TomtHero'
import { TomtBildegalleri } from '@/components/tomt/TomtBildegalleri'
import { TomtHusmodeller } from '@/components/tomt/TomtHusmodeller'
import { TomtRegulering } from '@/components/tomt/TomtRegulering'
import { TomtRisiko } from '@/components/tomt/TomtRisiko'
import { TomtKart } from '@/components/tomt/TomtKart'
import { TomtKontakt } from '@/components/tomt/TomtKontakt'
import { TomtFinansiering } from '@/components/tomt/TomtFinansiering'
import { TomtNabolag } from '@/components/tomt/TomtNabolag'
import { TomtDeling } from '@/components/tomt/TomtDeling'
import { TomtTegnebua } from '@/components/tomt/TomtTegnebua'
import { FileText, Download } from 'lucide-react'

// ============================================================
// BJØRNEMYRVEIEN 22 (Parsell C) – SKRÅ TOMT
// All data fra tegnebua.no/prosjekter/bjornemyrveien-tomter
// ============================================================

const IMG = '/tomter/bjornemyrveien-shared'

const BILDER = [
  { id: 'c1', url: `${IMG}/skogly-fasade-1.png`, alt: 'Skogly – fasade', kategori: 'tomt' as const, bildetekst: 'Husmodellen Skogly fra Hedalm-Anebyhus. Perfekt for skrånende tomt med inngang fra to plan.' },
  { id: 'c2', url: `${IMG}/render-parsell-c.jpg`, alt: 'Illustrasjon Parsell C', kategori: 'tomt' as const, bildetekst: 'Illustrasjon av ferdig bolig på Parsell C (skrånende tomt).' },
  { id: 'c3', url: `${IMG}/luftfoto-parsell-c.jpg`, alt: 'Luftfoto Parsell C', kategori: 'drone' as const, bildetekst: 'Luftfoto som viser Parsell C med planlagt bolig.' },
  { id: 'c4', url: `${IMG}/dronebilde.jpg`, alt: 'Dronebilde av tomtene', kategori: 'drone' as const, bildetekst: 'Dronefoto av begge tomtene og nærområdet på Bjørnemyr.' },
  { id: 'c5', url: `${IMG}/oversiktsbilde.jpg`, alt: 'Oversiktsbilde Bjørnemyr', kategori: 'drone' as const, bildetekst: 'Oversikt over Bjørnemyr-området.' },
  { id: 'c6', url: `${IMG}/situasjonskart.png`, alt: 'Situasjonskart', kategori: 'tomt' as const, bildetekst: 'Situasjonskart med plassering av bolig på tomten.' },
  { id: 'c7', url: `${IMG}/tomtekart.png`, alt: 'Kart over tomtene', kategori: 'tomt' as const, bildetekst: 'Kart som viser Parsell B og C med grenser og infrastruktur.' },
]

// Importerer HUSMODELLER fra nr 20 – de er identiske, bare tomtType endres
const FELLES_KOSTNADER = [
  { post: 'Tomt', belop: 3000000 },
  { post: 'Dokumentavgift (2,5%)', belop: 75000 },
]
const ETTER_HUS = [
  { post: 'Eventuelle tilvalg på hus', belop: 200000 },
  { post: 'Grunnarbeider (tilbud, per tomt)', belop: 667532 },
  { post: 'Frakt fra fabrikk', belop: 80000 },
  { post: 'Kommunale gebyrer', belop: 160000 },
]

const HUSMODELLER = [
  {
    id: 'skogly', navn: 'Skogly', leverandor: 'Hedalm-Anebyhus',
    beskrivelse: 'Moderne, kompakt bolig perfekt tilpasset skrånende tomter. Stor og åpen stue/kjøkkenløsning med balkong. To plan med inngang fra begge etasjer – ideell for Tomt C.',
    bra_m2: 126.1, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BRA totalt': '126,9 m²', 'BYA': '80,5 m²', 'Tomtetype': 'Flat / svakt skrånende' },
    pris_hus: 3538000, total_budsjett: 7920000,
    kostnader: [...FELLES_KOSTNADER, { post: 'Skogly – ferdig hus fra Hedalm-Anebyhus', belop: 3538000 }, ...ETTER_HUS],
    verdi_bra_m2: 136, verdi_m2_pris: 70000, verdi_total: 9520000,
    inkludert: ['Parkett på gulv i tørre oppholdsrom', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett innvendig el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder innvendig og utvendig', 'Innglassert balkong'],
    bilder: {
      fasade: [`${IMG}/skogly-fasade-2.png`],
      plantegninger: [
        { url: `${IMG}/skogly-plan-hoved.png`, label: 'Hovedetasje – stue, kjøkken, bad og soverom 1' },
        { url: `${IMG}/skogly-plan-under.png`, label: 'Underetasje – 3 soverom, bad og sportsbod' },
      ],
    },
  },
  {
    id: 'vindy', navn: 'Vindy', leverandor: 'ABChus',
    beskrivelse: 'Moderne, arealeffektivt hus på to plan. På skrå tomt får du parkering under verandaen – en svært god løsning. Mulighet for anneks/bod på ca. 20 m².',
    bra_m2: 107, bra_m2_alt: 105, soverom: 3, bad: '1 + WC', etasjer: 2,
    pris_hus: 3720000, pris_hus_skra: 3757000,
    total_budsjett: 7902000, total_budsjett_skra: 7939000,
    kostnader: [...FELLES_KOSTNADER, { post: 'Vindy (flat tomt) – nøkkelferdig fra ABChus', belop: 3720000 }, ...ETTER_HUS],
    kostnader_skra: [...FELLES_KOSTNADER, { post: 'Vindy (skrå tomt) – nøkkelferdig fra ABChus', belop: 3757000 }, ...ETTER_HUS],
    verdi_bra_m2: 107, verdi_m2_pris: 80000, verdi_total: 8560000,
    inkludert: ['Parkett på gulv i tørre oppholdsrom', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Fundament inkludert i prisen'],
    bilder: {
      fasade: [`${IMG}/vindy-flat.png`],
      plantegninger: [
        { url: `${IMG}/vindy-plan-1etg-flat.png`, label: '1. etasje – 3 soverom, bad, teknisk rom' },
        { url: `${IMG}/vindy-plan-2etg-flat.png`, label: '2. etasje – stue, kjøkken, WC, veranda' },
      ],
    },
    bilder_skra: {
      fasade: [`${IMG}/vindy-skra.png`],
      plantegninger: [
        { url: `${IMG}/vindy-plan-1etg-skra.png`, label: '1. etasje – 3 soverom, bad, teknisk rom' },
        { url: `${IMG}/vindy-plan-2etg-skra.png`, label: '2. etasje – stue, kjøkken, WC' },
      ],
    },
  },
  {
    id: 'emilie', navn: 'Emilie', leverandor: 'ABChus',
    beskrivelse: 'Romslig og praktisk enebolig over to plan med 4 soverom, vaskerom og sportsbod. Passer begge tomter.',
    bra_m2: 140.2, soverom: 4, bad: '1 + WC', etasjer: 2,
    ekstra: { Vaskerom: 'Ja', Sportsbod: '5,6 m²' },
    pris_hus: 4602000, total_budsjett: 8784000,
    kostnader: [...FELLES_KOSTNADER, { post: 'Emilie – nøkkelferdig fra ABChus', belop: 4602000 }, ...ETTER_HUS],
    verdi_bra_m2: 140, verdi_m2_pris: 70000, verdi_total: 9800000,
    inkludert: ['Parkett på gulv i tørre oppholdsrom', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Fundament inkludert i prisen'],
    bilder: {
      fasade: [`${IMG}/emilie-tomt-b.png`],
      plantegninger: [
        { url: `${IMG}/emilie-plan-1etg.png`, label: '1. etasje – 3 soverom, vaskerom, bad, sportsbod' },
        { url: `${IMG}/emilie-plan-2etg.png`, label: '2. etasje – stue, kjøkken, WC, soverom 4, veranda' },
      ],
    },
    bilder_skra: {
      fasade: [`${IMG}/emilie-tomt-c.png`],
      plantegninger: [
        { url: `${IMG}/emilie-plan-1etg.png`, label: '1. etasje – 3 soverom, vaskerom, bad, sportsbod' },
        { url: `${IMG}/emilie-plan-2etg.png`, label: '2. etasje – stue, kjøkken, WC, soverom 4, veranda' },
      ],
    },
  },
  {
    id: 'nordstrand', navn: 'Nordstrand', leverandor: 'Mesterhus',
    beskrivelse: 'Flott og romslig hus over to plan med 4 soverom, 2 bad, kontor/bod og stor stue/kjøkkenløsning med balkong. Moderne arkitektur. Plantegningene tilpasses noe for skrå tomt.',
    bra_m2: 132, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'Kontor/Bod': 'Ja' },
    pris_hus: 5240000, pris_hus_skra: 5420000,
    total_budsjett: 9422000, total_budsjett_skra: 9602000,
    kostnader: [...FELLES_KOSTNADER, { post: 'Nordstrand (flat tomt) – nøkkelferdig fra Mesterhus', belop: 5240000 }, ...ETTER_HUS],
    kostnader_skra: [...FELLES_KOSTNADER, { post: 'Nordstrand (skrå tomt) – nøkkelferdig fra Mesterhus', belop: 5420000 }, ...ETTER_HUS],
    verdi_bra_m2: 132, verdi_m2_pris: 75000, verdi_total: 9900000,
    inkludert: ['Parkett på gulv i tørre oppholdsrom', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Fundament inkludert i prisen'],
    bilder: {
      fasade: [`${IMG}/nordstrand-flat.png`],
      plantegninger: [
        { url: `${IMG}/nordstrand-plan-1etg.png`, label: '1. etasje – 3 soverom, kontor/bod, bad, TV-stue' },
        { url: `${IMG}/nordstrand-plan-2etg.png`, label: '2. etasje – stue/kjøkken, soverom, bad, garderobe, balkong' },
      ],
    },
    bilder_skra: {
      fasade: [`${IMG}/nordstrand-skra.png`],
      plantegninger: [
        { url: `${IMG}/nordstrand-plan-1etg.png`, label: '1. etasje – 3 soverom, kontor/bod, bad, TV-stue' },
        { url: `${IMG}/nordstrand-plan-2etg.png`, label: '2. etasje – stue/kjøkken, soverom, bad, garderobe, balkong' },
      ],
    },
  },
]

const TOMT = {
  adresse: 'Bjørnemyrveien 22',
  poststed: 'Bjørnemyr',
  kommune: 'Nesodden',
  areal_m2: 613,
  gnr: 1, bnr: 1012,
  senterpunkt: { lat: 59.8347, lng: 10.6422 },

  regulering: {
    arealformaal: 'Boligbebyggelse – frittliggende småhusbebyggelse',
    utnyttelsesgrad_bya: 20, maks_hoyde_m: 9, maks_etasjer: 2, byggegrense_m: 4,
    hensynssoner: [],
    bestemmelser: ['Maks BYA 20% (122,6 m²)', 'Maks gesimshøyde 7m, mønehøyde 9m', 'Godkjent delesøknad og matrikkelbrev', 'VA-søknad, overvannsrapport og avkjøringstillatelse utarbeidet'],
    plannavn: 'Reguleringsplan for Bjørnemyr', vedtaksdato: '2018-03-20',
  },

  risikoanalyse: {
    total_risiko: 'lav' as const,
    faktorer: [
      { kategori: 'Regulering', beskrivelse: 'Godkjent fradeling, innenfor plan', sannsynlighet: 1 as const, konsekvens: 2 as const, risikoverdi: 2, tiltak: 'Delesøknad godkjent' },
      { kategori: 'Grunnforhold', beskrivelse: 'Skrånende tomt, noe mer grunnarbeid', sannsynlighet: 2 as const, konsekvens: 2 as const, risikoverdi: 4, tiltak: 'Tilbud innhentet, Skogly designet for skråtomt' },
      { kategori: 'Marked', beskrivelse: 'Prisfall i segmentet', sannsynlighet: 2 as const, konsekvens: 2 as const, risikoverdi: 4, tiltak: 'Konservativt estimat' },
      { kategori: 'Kostnad', beskrivelse: 'Overskridelse byggebud', sannsynlighet: 1 as const, konsekvens: 2 as const, risikoverdi: 2, tiltak: 'Fastpriser fra leverandører' },
    ],
    anbefalinger: ['Lav risiko – godkjent fradeling, fastpriser og kjente kostnader', 'Skogly og Vindy har skråtomt-varianter tilpasset denne tomten'],
  },

  nabolag: {
    beskrivelse: 'Etablert boligområde på Bjørnemyr, omgitt av skog og natur. Kort vei til sjøen. Barnevennlig. Ca. 30 min til Oslo med buss/båt.',
    punkter: [
      { kategori: 'Kollektivtransport', navn: 'Buss til Tangen/Oslo', avstand_m: 380, gangminutter: 5 },
      { kategori: 'Skole', navn: 'Bjørnemyr skole', avstand_m: 580, gangminutter: 7 },
      { kategori: 'Barnehage', navn: 'Bjørnemyr barnehage', avstand_m: 330, gangminutter: 4 },
      { kategori: 'Dagligvare', navn: 'Dagligvare Bjørnemyr', avstand_m: 480, gangminutter: 6 },
      { kategori: 'Park/friområde', navn: 'Skog og turområder', avstand_m: 80, gangminutter: 1 },
    ],
  },

  dokumenter: [
    { navn: 'E-takst – Parsell C', url: '/documents/bjornemyrveien/etakst-parsell-c.pdf' },
    { navn: 'Kart – Parsell C', url: '/documents/bjornemyrveien/parsell-c-kart.pdf' },
    { navn: 'Nordstrand – Parsell C', url: '/documents/bjornemyrveien/parsell-c-nordstrand.pdf' },
    { navn: 'VA-tilkobling – Parsell C', url: '/documents/bjornemyrveien/va-tilkobling-parsell-c.pdf' },
    { navn: 'Overvannsrapport', url: '/documents/bjornemyrveien/overvannsrapport.pdf' },
    { navn: 'Salgsoppgave – Parsell C', url: '/documents/bjornemyrveien/salgsoppgave-parsell-c.pdf' },
    { navn: 'Tilbud – Tomt C', url: '/documents/bjornemyrveien/tilbud-tomt-c.pdf' },
    { navn: 'Tilbud samlet', url: '/documents/bjornemyrveien/tilbud-samlet.pdf' },
    { navn: 'Deletillatelse', url: '/documents/bjornemyrveien/deletillatelse.pdf' },
  ],
}

const TIDSPLAN = [
  { tid: 'Mars 2026', tittel: 'Kjøp av tomt', beskrivelse: 'Avtale signeres. Overtakelse estimert 1. mai 2026.' },
  { tid: 'Uke 1 etter kjøp', tittel: 'Tegninger og nabovarsling klar', beskrivelse: 'Tegningsgrunnlag ferdigstilles og nabovarsler sendes ut.' },
  { tid: 'Uke 1–3', tittel: 'Nabovarslingsperiode', beskrivelse: '14 dagers nabovarsling. Søknadsdokumenter forberedes.' },
  { tid: 'Ca. 1. april 2026', tittel: 'Byggesøknad sendes', beskrivelse: 'Komplett søknad sendes kommunen.' },
  { tid: 'Mai 2026', tittel: 'Byggetillatelse innvilget', beskrivelse: 'Estimert 3 ukers saksbehandling.' },
  { tid: 'Juni 2026', tittel: 'Byggestart', beskrivelse: 'Grunnarbeider starter. Hus leveres og monteres.' },
  { tid: 'Nov/des 2026', tittel: 'Ferdigstillelse og innflytting', beskrivelse: 'Fra kjøp til nøkkel på under ett år.' },
]

export default function Bjornemyrveien22() {
  return (
    <div className="bg-white">
      <TomtHero adresse={TOMT.adresse} poststed={TOMT.poststed} kommune={TOMT.kommune} areal_m2={TOMT.areal_m2} gnr={TOMT.gnr} bnr={TOMT.bnr} />

      <nav className="sticky top-16 z-40 bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-3 text-sm">
            {[
              { href: '#husmodeller', label: 'Husmodeller' },
              { href: '#tegnebua', label: 'Tegning og søknad' },
              { href: '#tidsplan', label: 'Tidsplan' },
              { href: '#regulering', label: 'Regulering' },
              { href: '#bilder', label: 'Bilder' },
              { href: '#nabolag', label: 'Nabolag' },
              { href: '#dokumenter', label: 'Dokumenter' },
              { href: '#risiko', label: 'Risiko' },
            ].map((l) => (
              <a key={l.href} href={l.href} className="whitespace-nowrap text-brand-500 hover:text-tomtly-accent transition-colors font-medium">{l.label}</a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <section id="husmodeller"><TomtHusmodeller modeller={HUSMODELLER as any} tomtType="skra" tomtNavn="Tomt C (skrå tomt)" /></section>
            <section id="tegnebua"><TomtTegnebua valgte_husmodeller={1} /></section>

            <section id="tidsplan">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Tidsplan</h2>
              <p className="text-brand-600 mb-6">Fra tomtekjøp til innflytting. VA-søknad, overvannsrapport og avkjøringstillatelser er allerede utarbeidet.</p>
              <div className="space-y-4">
                {TIDSPLAN.map((s, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-tomtly-accent mt-1.5" />
                      {idx < TIDSPLAN.length - 1 && <div className="w-0.5 flex-1 bg-brand-200 mt-1" />}
                    </div>
                    <div className="pb-6">
                      <p className="text-xs font-semibold text-tomtly-accent uppercase tracking-wide">{s.tid}</p>
                      <h3 className="font-semibold text-tomtly-dark mt-0.5">{s.tittel}</h3>
                      <p className="text-sm text-brand-600 mt-0.5">{s.beskrivelse}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section id="regulering"><TomtRegulering regulering={TOMT.regulering} /></section>
            <section id="bilder"><TomtBildegalleri bilder={BILDER} adresse={TOMT.adresse} /></section>
            <section id="nabolag"><TomtNabolag punkter={TOMT.nabolag.punkter} nabolag_beskrivelse={TOMT.nabolag.beskrivelse} /></section>

            <section id="dokumenter">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Dokumenter</h2>
              <p className="text-brand-600 mb-6">Komplett dokumentasjon for tomten.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TOMT.dokumenter.map((dok) => (
                  <a key={dok.navn} href={dok.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-brand-50 border border-brand-200 rounded-lg p-3 hover:bg-brand-100 transition-colors">
                    <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-brand-700 flex-1">{dok.navn}</span>
                    <Download className="w-4 h-4 text-brand-400" />
                  </a>
                ))}
              </div>
            </section>

            <section id="risiko"><TomtRisiko risikoanalyse={TOMT.risikoanalyse} /></section>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-36 space-y-6">
              <TomtKart lat={TOMT.senterpunkt.lat} lng={TOMT.senterpunkt.lng} adresse={TOMT.adresse} zoom={17} />
              <TomtKontakt />
              <TomtDeling adresse={TOMT.adresse} tomteId="bjornemyrveien-22" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
