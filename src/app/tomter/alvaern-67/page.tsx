import { TomtHero } from '@/components/tomt/TomtHero'
import { TomtBildegalleri } from '@/components/tomt/TomtBildegalleri'
import { TomtHusmodeller } from '@/components/tomt/TomtHusmodeller'
import { TomtRegulering } from '@/components/tomt/TomtRegulering'
import { TomtRisiko } from '@/components/tomt/TomtRisiko'
import { TomtKart } from '@/components/tomt/TomtKart'
import { TomtKontakt } from '@/components/tomt/TomtKontakt'
import { TomtNabolag } from '@/components/tomt/TomtNabolag'
import { TomtDeling } from '@/components/tomt/TomtDeling'
import { TomtTegnebua } from '@/components/tomt/TomtTegnebua'
import { FileText, Download } from 'lucide-react'

// ============================================================
// GAMLE ALVÆRNVEI 67 – Alværn, Nesodden
// 900 m² skrånende tomt, 4 husmodeller, fjordutsikt
// Data fra tegnebua.no/prosjekter/alvaern-67
// ============================================================

const IMG = '/tomter/alvaern-shared'

const BILDER = [
  { id: 'a1', url: `${IMG}/alvaern-render-aerial-1-DvVXdDku.jpg`, alt: 'Oversikt med fjordutsikt', kategori: 'drone' as const, bildetekst: 'Oversikt over tomten med utsikt over Oslofjorden.' },
  { id: 'a2', url: `${IMG}/alvaern-render-aerial-2-BJ7UXFxh.jpg`, alt: 'Fasade fra sjøsiden', kategori: 'tomt' as const, bildetekst: 'Fasade sett fra sjøsiden med terreng og hage.' },
  { id: 'a3', url: `${IMG}/alvaern-render-aerial-3-D8cLJG9d.jpg`, alt: 'Hage og utsikt', kategori: 'utsikt' as const, bildetekst: 'Hage med utsikt over fjorden. Skrånende terreng gir naturlig privacy.' },
  { id: 'a4', url: `${IMG}/alvaern-utomhusplan-BJePXHzO.jpg`, alt: 'Utomhusplan', kategori: 'tomt' as const, bildetekst: 'Utomhusplan med plassering av bolig, adkomst og utearealer.' },
  { id: 'a5', url: `${IMG}/alvaern-wide-interior-9F3lfWuz.png`, alt: 'Wide A – stue med fjordutsikt', kategori: 'utsikt' as const, bildetekst: 'Interiør Wide A: Stor stue med panoramautsikt over Oslofjorden.' },
  { id: 'a6', url: `${IMG}/alvaern-wide-kitchen-1-C0o_WK6D.jpg`, alt: 'Wide A – kjøkken', kategori: 'nabolag' as const, bildetekst: 'Drømmekjøkkenet med Siemens hvitevarer – inkludert i Wide A.' },
  { id: 'a7', url: `${IMG}/alvaern-wide-bedroom-DQdzvUWa.jpg`, alt: 'Wide A – soverom', kategori: 'nabolag' as const, bildetekst: 'Hovedsoverom med naturlig lys.' },
  { id: 'a8', url: `${IMG}/alvaern-nelly-exterior-CPXNDfJf.jpg`, alt: 'Nelly – eksteriør', kategori: 'tomt' as const, bildetekst: 'Husmodellen Nelly fra ABChus – moderne design med mønetak.' },
  { id: 'a9', url: `${IMG}/alvaern-adele-exterior-D5dWD4fH.jpg`, alt: 'Adele – eksteriør', kategori: 'tomt' as const, bildetekst: 'Husmodellen Adele fra ABChus – herskapelig med 6 soverom.' },
  { id: 'a10', url: `${IMG}/alvaern-skogly-exterior-xL5avi0v.jpg`, alt: 'Skogly – eksteriør', kategori: 'tomt' as const, bildetekst: 'Husmodellen Skogly fra Hedalm-Anebyhus – kompakt og effektiv.' },
]

const FELLES = [
  { post: 'Tomt', belop: 3200000 },
  { post: 'Dokumentavgift (2,5%)', belop: 80000 },
]
const ETTER = (grunnarbeid: number) => [
  { post: 'Grunnarbeider (estimat)', belop: grunnarbeid },
  { post: 'Frakt fra fabrikk', belop: 90000 },
  { post: 'Kommunale gebyrer (VA + byggesøknad)', belop: 223550 },
]

const HUSMODELLER = [
  {
    id: 'wide-a', navn: 'Wide A', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/funkishus/wide-a/',
    beskrivelse: 'Funkishus med stor stue, Drømmekjøkkenet, Siemens hvitevarer, smarthus og panoramautsikt. 3 soverom + hybel. Inkluderer støpt plate/grunnmur og 1-trinns byggesøknad.',
    bra_m2: 160.3, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '114,6 m²', 'Utnyttelse': '16,7%', 'Hybel': 'Ja', 'Smarthus': 'Inkludert', 'Grunnmur': 'Inkludert' },
    pris_hus: 5399000, total_budsjett: 9892000,
    kostnader: [...FELLES, { post: 'Wide A – nøkkelferdig fra ABChus', belop: 5399000 }, ...ETTER(900000)],
    verdi_bra_m2: 160, verdi_m2_pris: 78000, verdi_total: 12500000,
    inkludert: ['Støpt plate/grunnmur', 'Smarthus', 'Drømmekjøkkenet', 'Siemens hvitevarer', 'Parkett', 'Trapperingen trapp', 'Malte gipsvegger', 'Flislagte bad m/varmekabler', 'Kardia teknisk enhet', '1-trinns byggesøknad'],
    bilder: {
      fasade: [`${IMG}/alvaern-render-aerial-2-BJ7UXFxh.jpg`, `${IMG}/alvaern-wide-interior-9F3lfWuz.png`],
      plantegninger: [
        { url: `${IMG}/alvaern-wide-plan-2etg-BeXdkEdE.jpg`, label: 'Hovedetasje – stue, kjøkken, bad, entré, veranda' },
        { url: `${IMG}/alvaern-wide-plan-1etg-Cpaa4id_.jpg`, label: 'Underetasje – stue 2/hybel, 3 soverom, bad 2, bod' },
      ],
    },
  },
  {
    id: 'nelly', navn: 'Nelly', leverandor: 'ABChus',
    beskrivelse: 'Moderne enebolig med mønetak i stue/kjøkken, 4 soverom, vaskerom og TV-stue med utgang til hage. Tilpasset skrånende tomter.',
    bra_m2: 160.9, soverom: 4, bad: '1 + WC', etasjer: 2,
    ekstra: { 'BYA': '~90 m²', 'Utnyttelse': '14,0%', 'Vaskerom': 'Ja', 'TV-stue': 'Ja' },
    pris_hus: 4927000, total_budsjett: 9420000,
    kostnader: [...FELLES, { post: 'Nelly – nøkkelferdig fra ABChus', belop: 4927000 }, ...ETTER(900000)],
    verdi_bra_m2: 160, verdi_m2_pris: 75000, verdi_total: 12000000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Fundament inkludert'],
    bilder: {
      fasade: [`${IMG}/alvaern-nelly-exterior-CPXNDfJf.jpg`, `${IMG}/alvaern-nelly-interior-2-D8pCvq7I.png`],
      plantegninger: [
        { url: `${IMG}/alvaern-nelly-plan-hovedetasje-Ccwt7L9E.png`, label: 'Hovedetasje – stue/kjøkken (åpen), WC, entré, veranda' },
        { url: `${IMG}/alvaern-nelly-plan-underetasje-D5BQ8tk-.png`, label: 'Underetasje – 4 soverom, vaskerom, bad, TV-stue' },
      ],
    },
  },
  {
    id: 'adele', navn: 'Adele', leverandor: 'ABChus',
    beskrivelse: 'Herskapelig enebolig over to plan med opptil 6 soverom. Størst modell med 199 m². Stor stue/kjøkken, vaskerom, hovedsoverom med eget bad og balkong.',
    bra_m2: 199.1, soverom: 6, bad: '2 + WC', etasjer: 2,
    ekstra: { 'BYA': '~120 m²', 'Utnyttelse': '17,3%', 'Hovedsoverom': 'Med eget bad', 'Balkong': 'Ja' },
    pris_hus: 5588000, total_budsjett: 10081000,
    kostnader: [...FELLES, { post: 'Adele – nøkkelferdig fra ABChus', belop: 5588000 }, ...ETTER(900000)],
    verdi_bra_m2: 199, verdi_m2_pris: 65000, verdi_total: 13000000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Fundament inkludert'],
    bilder: {
      fasade: [`${IMG}/alvaern-adele-exterior-D5dWD4fH.jpg`],
      plantegninger: [
        { url: `${IMG}/alvaern-adele-plan-1etg-BTC4CmJ4.png`, label: '1. etasje – stue/kjøkken (åpen), vaskerom, WC, entré, veranda' },
        { url: `${IMG}/alvaern-adele-plan-2etg-Bm2SEySN.png`, label: '2. etasje – hovedsoverom m/bad, 3-5 soverom, bad, balkong' },
      ],
    },
  },
  {
    id: 'skogly', navn: 'Skogly', leverandor: 'Hedalm-Anebyhus',
    beskrivelse: 'Kompakt og effektiv bolig med inngang fra begge plan – perfekt for skrånende tomt. 3 soverom, innglassert balkong. Billigst modell med mest gjenværende BYA-kapasitet (64 m² mer kan bygges).',
    bra_m2: 136.9, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '80,5 m²', 'Utnyttelse': '12,9%', 'Gjenværende BYA': '64,1 m²', 'Innglassert balkong': 'Ja' },
    pris_hus: 3538000, total_budsjett: 8232000,
    kostnader: [...FELLES, { post: 'Skogly – ferdig hus fra Hedalm-Anebyhus', belop: 3538000 }, { post: 'Fundament', belop: 200000 }, ...ETTER(900000)],
    verdi_bra_m2: 137, verdi_m2_pris: 77000, verdi_total: 10500000,
    inkludert: ['Parkett', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Innglassert balkong'],
    bilder: {
      fasade: [`${IMG}/alvaern-skogly-exterior-xL5avi0v.jpg`],
      plantegninger: [
        { url: `${IMG}/skogly-plan-hovedetasje-DfjuW4p6.png`, label: 'Hovedetasje – stue/kjøkken, bad, soverom 1, balkong' },
        { url: `${IMG}/skogly-plan-underetasje-BV4nwuRM.png`, label: 'Underetasje – 2 soverom, bad, sportsbod' },
      ],
    },
  },
]

const TOMT = {
  adresse: 'Gamle Alværnvei 67',
  poststed: 'Alværn',
  kommune: 'Nesodden',
  areal_m2: 900,
  gnr: 30, bnr: 45,
  senterpunkt: { lat: 59.8155, lng: 10.6196 },

  regulering: {
    arealformaal: 'Boligbebyggelse – åpen småhusbebyggelse (B4)',
    utnyttelsesgrad_bya: 20, maks_hoyde_m: 9, maks_etasjer: 2, byggegrense_m: 4,
    hensynssoner: [],
    bestemmelser: [
      'Maks BYA 20% (180,1 m²)',
      'Maks gesimshøyde 7,5m (brattere enn 1:4), 9,0m (øvrig)',
      'Underetasje tillatt der terrenget tillater det',
      'Minste tomtestørrelse 900 m²',
      'Reguleringsplan: Vestfjordtomtene – søndre del (Plan nr. 111)',
      'Vedtatt 15.12.2005',
    ],
    plannavn: 'Vestfjordtomtene – søndre del', vedtaksdato: '2005-12-15',
  },

  risikoanalyse: {
    total_risiko: 'lav' as const,
    faktorer: [
      { kategori: 'Regulering', beskrivelse: 'Innenfor gjeldende plan', sannsynlighet: 1 as const, konsekvens: 2 as const, risikoverdi: 2, tiltak: 'Alle modeller innenfor BYA og høydekrav' },
      { kategori: 'Grunnforhold', beskrivelse: 'Skrånende tomt, fjell/morene', sannsynlighet: 2 as const, konsekvens: 2 as const, risikoverdi: 4, tiltak: 'Estimat grunnarbeid innhentet' },
      { kategori: 'Marked', beskrivelse: 'Prisendring', sannsynlighet: 2 as const, konsekvens: 2 as const, risikoverdi: 4, tiltak: 'Konservative estimater' },
      { kategori: 'Nabovarsling', beskrivelse: 'Allerede gjennomført for Wide A', sannsynlighet: 1 as const, konsekvens: 1 as const, risikoverdi: 1, tiltak: 'Nabovarsling gjennomført uten merknader' },
    ],
    anbefalinger: [
      'Nabovarsling allerede gjennomført for Wide A – lav risiko',
      'Alle 4 husmodeller er innenfor reguleringsplan',
      'Samkjøring med nabotomt kan spare ca. 150 000 kr',
    ],
  },

  nabolag: {
    beskrivelse: 'Alværn på Nesodden. Fantastisk fjordutsikt (+81 moh), etablert boligområde med naturskjønne omgivelser. Kort vei til Tangen brygge og båt til Oslo.',
    punkter: [
      { kategori: 'Kollektivtransport', navn: 'Buss til Tangen/Oslo', avstand_m: 300, gangminutter: 4 },
      { kategori: 'Kollektivtransport', navn: 'Tangen brygge (båt til Oslo)', avstand_m: 2000, gangminutter: 25 },
      { kategori: 'Skole', navn: 'Alværn ungdomsskole', avstand_m: 800, gangminutter: 10 },
      { kategori: 'Dagligvare', navn: 'Dagligvare Nesoddtangen', avstand_m: 1500, gangminutter: 18 },
      { kategori: 'Park/friområde', navn: 'Skog og turområder', avstand_m: 50, gangminutter: 1 },
      { kategori: 'Badeplass', navn: 'Fjorden / badeplass', avstand_m: 1200, gangminutter: 15 },
    ],
  },

  dokumenter: [
    { navn: 'Utomhusplan', url: '/documents/alvaernveien/utomhusplan.pdf' },
    { navn: 'Reguleringsbestemmelser', url: '/documents/alvaernveien/reguleringsbestemmelser.pdf' },
    { navn: 'Tilbud Wide A (nøkkelferdig)', url: '/documents/alvaernveien/tilbud-wide-a.pdf' },
    { navn: 'Prisestimat grunnarbeider', url: '/documents/alvaernveien/prisestimat-grunnarbeider.xlsx' },
  ],
}

const TIDSPLAN = [
  { tid: 'Mars 2026', tittel: 'Kjøp av tomt', beskrivelse: 'Avtale signeres. Overtakelse estimert 1. mai 2026.' },
  { tid: 'Uke 1 etter kjøp', tittel: 'Tegninger og nabovarsling klar', beskrivelse: 'Tegningsgrunnlag ferdigstilles. Nabovarsling allerede gjennomført for Wide A.' },
  { tid: 'Uke 1–3', tittel: 'Nabovarslingsperiode', beskrivelse: '14 dagers nabovarsling. Søknadsdokumenter forberedes.' },
  { tid: 'Ca. 1. april 2026', tittel: 'Byggesøknad sendes', beskrivelse: 'Komplett søknad sendes kommunen.' },
  { tid: 'Mai 2026', tittel: 'Byggetillatelse innvilget', beskrivelse: 'Estimert 3 ukers saksbehandling.' },
  { tid: 'Juni 2026', tittel: 'Byggestart', beskrivelse: 'Grunnarbeider starter. Hus leveres og monteres.' },
  { tid: 'Nov/des 2026', tittel: 'Ferdigstillelse og innflytting', beskrivelse: 'Fra kjøp til nøkkel på under ett år.' },
]

export default function Alvaern67() {
  return (
    <div className="bg-white">
      <TomtHero adresse={TOMT.adresse} poststed={TOMT.poststed} kommune={TOMT.kommune} areal_m2={TOMT.areal_m2} gnr={TOMT.gnr} bnr={TOMT.bnr} />

      <nav className="sticky top-16 z-40 bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-3 text-sm">
            {[
              { href: '#bilder', label: 'Bilder' },
              { href: '#husmodeller', label: 'Husmodeller' },
              { href: '#tegnebua', label: 'Tegning og søknad' },
              { href: '#tidsplan', label: 'Tidsplan' },
              { href: '#regulering', label: 'Regulering' },
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
            <section id="bilder"><TomtBildegalleri bilder={BILDER} adresse={TOMT.adresse} /></section>
            <section id="husmodeller"><TomtHusmodeller modeller={HUSMODELLER as any} tomtType="skra" tomtNavn="Gamle Alværnvei 67 (skrånende tomt)" /></section>
            <section id="tegnebua"><TomtTegnebua valgte_husmodeller={1} /></section>

            <section id="tidsplan">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Tidsplan</h2>
              <p className="text-brand-600 mb-6">Fra tomtekjøp til innflytting. Nabovarsling allerede gjennomført for Wide A.</p>
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
            <section id="nabolag"><TomtNabolag punkter={TOMT.nabolag.punkter} nabolag_beskrivelse={TOMT.nabolag.beskrivelse} /></section>

            <section id="dokumenter">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Dokumenter</h2>
              <p className="text-brand-600 mb-6">Dokumentasjon for tomten.</p>
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
              <TomtDeling adresse={TOMT.adresse} tomteId="alvaern-67" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
