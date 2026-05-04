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

const IMG = '/tomter/myllavegen-58'

const BILDER = [
  { id: 'h1', url: `${IMG}/situasjonskart.png`, alt: 'Situasjonskart – Myllavegen 58', kategori: 'tomt' as const },
  { id: 'h2', url: `${IMG}/deleplan.png`, alt: 'Deleplan – parsell Myllavegen 58', kategori: 'tomt' as const },
  { id: 'h3', url: `${IMG}/arwen-fasade-1.jpg`, alt: 'Arwen Skrå – fasade', kategori: 'annet' as const },
  { id: 'h4', url: `${IMG}/nelly-fasade-1.jpg`, alt: 'Nelly Skrå – fasade', kategori: 'annet' as const },
  { id: 'h5', url: `${IMG}/wide-fasade-1.jpg`, alt: 'Wide Skrå – fasade', kategori: 'annet' as const },
  { id: 'h6', url: `${IMG}/skogly-fasade-1.png`, alt: 'Skogly – fasade', kategori: 'annet' as const },
  { id: 'h7', url: `${IMG}/moholt-fasade-1.jpg`, alt: 'Moholt – fasade', kategori: 'annet' as const },
  { id: 'h8', url: `${IMG}/mira-fasade-1.jpg`, alt: 'Mira – fasade', kategori: 'annet' as const },
]

const FELLES = [
  { post: 'Tomt', belop: 950000 },
  { post: 'Dokumentavgift (2,5%)', belop: 23750 },
]
const ETTER = (grunnarbeid: number) => [
  { post: 'Grunnarbeider inkl. mva (estimat)', belop: grunnarbeid },
  { post: 'Frakt fra fabrikk', belop: 90000 },
  { post: 'Kommunale gebyrer (VA + byggesak)', belop: 50000 },
  { post: 'Byggestrøm og strømtilførsel', belop: 45000 },
  { post: 'Uavhengig kontroll (våtrom + lufttetthet)', belop: 10000 },
]

const HUSMODELLER = [
  {
    id: 'arwen-skra', grunnmur_inkludert: true, navn: 'Arwen Skrå', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/funkishus/arwen-for-skra-tomt/',
    beskrivelse: 'Funkishus spesialdesignet for skråtomt. Moderne uttrykk med store vindusflater, åpen stue/kjøkken i hovedetasje og 3 soverom + hybeldel i underetasje. Smarthus og Drømmekjøkken inkludert.',
    bra_m2: 161, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~115 m²', 'Utnyttelse': '11,5%', 'Hybel': 'Ja', 'Smarthus': 'Inkludert', 'Grunnmur': 'Inkludert' },
    pris_hus: 5302000, total_budsjett: 6471000,
    kostnader: [...FELLES, { post: 'Arwen Skrå – nøkkelferdig fra ABChus', belop: 5302000 }, ...ETTER(650000)],
    verdi_bra_m2: 161, verdi_m2_pris: 50000, verdi_total: 8050000,
    inkludert: ['Støpt plate/grunnmur', 'Smarthus', 'Drømmekjøkkenet', 'Siemens hvitevarer', 'Parkett', 'Flislagte bad m/varmekabler', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/arwen-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/arwen-plan-hovedetasje.jpg`, label: 'Hovedetasje – stue, kjøkken, WC, veranda' },
        { url: `${IMG}/arwen-plan-underetasje.jpg`, label: 'Underetasje – 3 soverom, hybel, bad, bod' },
        { url: `${IMG}/arwen-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
  {
    id: 'nelly-skra', grunnmur_inkludert: true, navn: 'Nelly Skrå', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/nelly-tilpasset-skratomt/',
    beskrivelse: 'Moderne enebolig med mønetak tilpasset skrånende tomt. 4 soverom, vaskerom og TV-stue med utgang til hage. Inngang fra begge plan.',
    bra_m2: 161, soverom: 4, bad: '1 + WC', etasjer: 2,
    ekstra: { 'BYA': '~90 m²', 'Utnyttelse': '9,0%', 'Vaskerom': 'Ja', 'TV-stue': 'Ja' },
    pris_hus: 4935000, total_budsjett: 6104000,
    kostnader: [...FELLES, { post: 'Nelly Skrå – nøkkelferdig fra ABChus', belop: 4935000 }, ...ETTER(650000)],
    verdi_bra_m2: 161, verdi_m2_pris: 50000, verdi_total: 8050000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning'],
    bilder: {
      fasade: [`${IMG}/nelly-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/nelly-plan-underetasje.jpg`, label: 'Underetasje – 3 soverom, TV-stue, vaskerom' },
        { url: `${IMG}/nelly-plan-hovedetasje.jpg`, label: 'Hovedetasje – stue, kjøkken, soverom 1, bad' },
        { url: `${IMG}/nelly-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
  {
    id: 'wide-skra', grunnmur_inkludert: true, navn: 'Wide Skrå', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/funkishus/wide-skra/',
    beskrivelse: 'Stor og romslig funkisbolig for skråtomt. Wide-serien er ABChus\' mest populære funkishus, her tilpasset skrånende terreng med inngang fra øvre plan.',
    bra_m2: 193, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~120 m²', 'Utnyttelse': '12,0%', 'Hybel': 'Ja', 'Smarthus': 'Inkludert', 'Grunnmur': 'Inkludert' },
    pris_hus: 6504000, total_budsjett: 7673000,
    kostnader: [...FELLES, { post: 'Wide Skrå – nøkkelferdig fra ABChus', belop: 6504000 }, ...ETTER(650000)],
    verdi_bra_m2: 193, verdi_m2_pris: 50000, verdi_total: 9650000,
    inkludert: ['Støpt plate/grunnmur', 'Smarthus', 'Drømmekjøkkenet', 'Siemens hvitevarer', 'Parkett', 'Trapperingen trapp', 'Malte gipsvegger', 'Flislagte bad m/varmekabler'],
    bilder: {
      fasade: [`${IMG}/wide-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/wide-plan-hovedetasje.jpg`, label: 'Hovedetasje – stue, kjøkken, bad, entré' },
        { url: `${IMG}/wide-plan-underetasje.jpg`, label: 'Underetasje – soverom, hybel, bad 2, bod' },
        { url: `${IMG}/wide-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
  {
    id: 'signatur-305', grunnmur_inkludert: true, navn: 'Signatur 305', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/signatur-305-bestselger',
    beskrivelse: 'Mesterhus\' bestselger – en romslig familievilla med moderne uttrykk. Stor stue/kjøkken, 4 soverom, 2 bad og praktisk vaskerom. Leveres med lokal Mesterhus-forhandler.',
    bra_m2: 175, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~105 m²', 'Utnyttelse': '10,5%', 'Vaskerom': 'Ja' },
    pris_hus: 6870000, total_budsjett: 8039000,
    kostnader: [...FELLES, { post: 'Signatur 305 – fra Mesterhus', belop: 6870000 }, ...ETTER(650000)],
    verdi_bra_m2: 175, verdi_m2_pris: 50000, verdi_total: 8750000,
    inkludert: ['Komplett hus ferdig montert', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/signatur-305-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/signatur-305-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/signatur-305-plan-2etg.jpg`, label: '2. etasje' },
        { url: `${IMG}/signatur-305-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
  {
    id: 'signatur-308', grunnmur_inkludert: true, navn: 'Signatur 308', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/signatur-308-moderne-funkishus-tilpasset-skra-tomt',
    beskrivelse: 'Moderne funkishus fra Mesterhus spesialdesignet for skråtomt. Flatt tak, store vindusflater og romslig planløsning over to plan.',
    bra_m2: 170, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~100 m²', 'Utnyttelse': '10,0%', 'Tilpasset': 'Skråtomt' },
    pris_hus: 5740000, total_budsjett: 6909000,
    kostnader: [...FELLES, { post: 'Signatur 308 – fra Mesterhus', belop: 5740000 }, ...ETTER(650000)],
    verdi_bra_m2: 170, verdi_m2_pris: 50000, verdi_total: 8500000,
    inkludert: ['Komplett hus ferdig montert', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/signatur-308-fasade-1.webp`],
      plantegninger: [
        { url: `${IMG}/signatur-308-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/signatur-308-plan-2etg.webp`, label: '2. etasje' },
        { url: `${IMG}/signatur-308-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
  {
    id: 'selma-kjeller', grunnmur_inkludert: true, navn: 'Selma med kjeller', leverandor: 'Älvsbyhus + Tegnebua',
    leverandor_url: 'https://tegnebua.no/konsepter/alvsbyhus-kjeller',
    beskrivelse: 'Älvsbyhus Selma med Tegnebuas kjellerkonsept – gir mye ekstra areal til lav kostnad. Hovedetasje fra Älvsbyhus, kjeller prosjektert av Tegnebua. Perfekt for skråtomt.',
    bra_m2: 180, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~95 m²', 'Utnyttelse': '9,5%', 'Kjeller': 'Tegnebua-konsept', 'Husbank': 'Kvalifiserer' },
    pris_hus: 3200000, total_budsjett: 5119000,
    kostnader: [...FELLES, { post: 'Selma – hus fra Älvsbyhus', belop: 3200000 }, { post: 'Kjeller (prosjektert av Tegnebua)', belop: 500000 }, ...ETTER(700000)],
    verdi_bra_m2: 180, verdi_m2_pris: 50000, verdi_total: 9000000,
    inkludert: ['Hus levert på tomt', 'Kjeller med full takhøyde', 'Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/selma-fasade-1.png`],
      plantegninger: [
        { url: `${IMG}/selma-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },],
    },
  },
  {
    id: 'skogly', grunnmur_inkludert: false, navn: 'Skogly', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/skogly/',
    beskrivelse: 'Kompakt og effektiv bolig med inngang fra begge plan – perfekt for skrånende tomt. Innglassert balkong, åpen stue/kjøkken og 3 soverom.',
    bra_m2: 137, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '80,5 m²', 'Utnyttelse': '8,1%', 'Innglassert balkong': 'Ja' },
    pris_hus: 3580000, total_budsjett: 4749000,
    kostnader: [...FELLES, { post: 'Skogly – ferdig hus fra Hedalm-Anebyhus', belop: 3580000 }, ...ETTER(650000)],
    verdi_bra_m2: 137, verdi_m2_pris: 50000, verdi_total: 6850000,
    inkludert: ['Parkett', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Innglassert balkong'],
    bilder: {
      fasade: [`${IMG}/skogly-fasade-1.png`],
      plantegninger: [
        { url: `${IMG}/skogly-plan-hovedetasje.png`, label: 'Hovedetasje – stue, kjøkken, bad, soverom 1' },
        { url: `${IMG}/skogly-plan-underetasje.png`, label: 'Underetasje – 3 soverom, bad, sportsbod' },
        { url: `${IMG}/skogly-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
  {
    id: 'moholt', grunnmur_inkludert: true, navn: 'Moholt', leverandor: 'Systemhus',
    leverandor_url: 'https://www.systemhus.no/hus/enebolig-moholt',
    beskrivelse: 'Moderne enebolig fra Systemhus med smart planløsning. Passer godt til skråtomt med mulighet for sokkeletasje.',
    bra_m2: 155, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~90 m²', 'Utnyttelse': '9,0%' },
    pris_hus: 4510000, total_budsjett: 5679000,
    kostnader: [...FELLES, { post: 'Moholt – fra Systemhus', belop: 4510000 }, ...ETTER(650000)],
    verdi_bra_m2: 155, verdi_m2_pris: 50000, verdi_total: 7750000,
    inkludert: ['Komplett hus', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/moholt-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/moholt-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/moholt-plan-2etg.webp`, label: '2. etasje' },
        { url: `${IMG}/moholt-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
  {
    id: 'mira', grunnmur_inkludert: true, navn: 'Mira', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/mira',
    beskrivelse: 'Romslig og moderne familiebolig fra Nordbohus. Gjennomtenkt planløsning med god plass til hele familien.',
    bra_m2: 170, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~100 m²', 'Utnyttelse': '10,0%' },
    pris_hus: 6817000, total_budsjett: 7986000,
    kostnader: [...FELLES, { post: 'Mira – fra Nordbohus', belop: 6817000 }, ...ETTER(650000)],
    verdi_bra_m2: 170, verdi_m2_pris: 50000, verdi_total: 8500000,
    inkludert: ['Komplett hus ferdig montert', 'Kjøkken', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom'],
    bilder: {
      fasade: [`${IMG}/mira-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/mira-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/mira-plan-2etg.webp`, label: '2. etasje' },
        { url: `${IMG}/mira-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
  {
    id: 'sammen', grunnmur_inkludert: true, navn: 'Sammen', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/sammen',
    beskrivelse: 'Nordbohus\' premium-modell – stor og eksklusiv enebolig med romslig planløsning. Passer for den som ønsker mye plass og høy standard.',
    bra_m2: 210, soverom: 5, bad: '2 + WC', etasjer: 2,
    ekstra: { 'BYA': '~130 m²', 'Utnyttelse': '13,0%' },
    pris_hus: 8490000, total_budsjett: 9659000,
    kostnader: [...FELLES, { post: 'Sammen – fra Nordbohus', belop: 8490000 }, ...ETTER(650000)],
    verdi_bra_m2: 210, verdi_m2_pris: 50000, verdi_total: 10500000,
    inkludert: ['Komplett hus ferdig montert', 'Kjøkken', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom'],
    bilder: {
      fasade: [`${IMG}/sammen-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/sammen-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/sammen-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'haugli', grunnmur_inkludert: true, navn: 'Haugli', leverandor: 'Norgeshus',
    leverandor_url: 'https://norgeshus.no/bygge-hus/haugli',
    beskrivelse: 'Klassisk og romslig enebolig fra Norgeshus. God planløsning med fokus på hverdagsfunksjonalitet.',
    bra_m2: 165, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~100 m²', 'Utnyttelse': '10,0%' },
    pris_hus: 5728000, total_budsjett: 6897000,
    kostnader: [...FELLES, { post: 'Haugli – fra Norgeshus', belop: 5728000 }, ...ETTER(650000)],
    verdi_bra_m2: 165, verdi_m2_pris: 50000, verdi_total: 8250000,
    inkludert: ['Komplett hus', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/haugli-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/haugli-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/haugli-plan-2etg.jpg`, label: '2. etasje' },
        { url: `${IMG}/haugli-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
  {
    id: 'horisont', grunnmur_inkludert: true, navn: 'Horisont', leverandor: 'Norgeshus',
    leverandor_url: 'https://www.norgeshus.no/bygge-hus/horisont',
    beskrivelse: 'Norgeshus\' flaggskip – stor og eksklusiv villa med moderne arkitektur. Svært romslig planløsning over to plan med premium materialvalg.',
    bra_m2: 250, soverom: 5, bad: '3', etasjer: 2,
    ekstra: { 'BYA': '~140 m²', 'Utnyttelse': '14,0%' },
    pris_hus: 9248000, total_budsjett: 10417000,
    kostnader: [...FELLES, { post: 'Horisont – fra Norgeshus', belop: 9248000 }, ...ETTER(650000)],
    verdi_bra_m2: 250, verdi_m2_pris: 50000, verdi_total: 12500000,
    inkludert: ['Komplett hus', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/horisont-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/horisont-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/horisont-plan-2etg.jpg`, label: '2. etasje' },
        { url: `${IMG}/horisont-plan-3etg.jpg`, label: '3. etasje / kjeller' },
        { url: `${IMG}/horisont-situasjonskart.png`, label: 'Tomtekart – plassering på tomt' },
      ],
    },
  },
]

const TOMT = {
  adresse: 'Myllavegen 58',
  poststed: 'Grua',
  kommune: 'Lunner',
  areal_m2: 1000,
  gnr: 86, bnr: 43,
  senterpunkt: { lat: 60.25414, lng: 10.64675 },

  regulering: {
    arealformaal: 'Boligbebyggelse – frittliggende småhusbebyggelse',
    utnyttelsesgrad_bya: 30,
    maks_hoyde_m: 9,
    maks_etasjer: 2,
    byggegrense_m: 4,
    hensynssoner: [] as { type: string; beskrivelse: string; konsekvens: 'lav' | 'medium' | 'hoy' }[],
    bestemmelser: [
      'Maks BYA 30% (300 m²)',
      'Tomannsbolig er reguleringsmessig mulig',
      'Fradeling godkjent av Lunner kommune',
      'Veirett og avkjøringstillatelse foreligger',
      'Kommunalt vann og avløp tilgjengelig',
    ],
    plannavn: 'Reguleringsplan Schiongsvingen',
  },

  risikoanalyse: {
    total_risiko: 'lav' as const,
    faktorer: [
      { kategori: 'Regulering', beskrivelse: 'Fradelt til boligformål – godkjent', sannsynlighet: 1, konsekvens: 1, risikoverdi: 1, tiltak: 'Fradeling allerede godkjent' },
      { kategori: 'Grunnforhold', beskrivelse: 'Skrånende tomt, morene/fjell', sannsynlighet: 2, konsekvens: 2, risikoverdi: 4, tiltak: 'Grunnarbeider estimert i budsjett' },
      { kategori: 'VA-tilknytning', beskrivelse: 'Kommunalt VA tilgjengelig', sannsynlighet: 1, konsekvens: 1, risikoverdi: 1, tiltak: 'Kommunalt VA bekreftet' },
      { kategori: 'Adkomst', beskrivelse: 'Veirett og avkjøringstillatelse foreligger', sannsynlighet: 1, konsekvens: 1, risikoverdi: 1, tiltak: 'Tillatelse foreligger' },
      { kategori: 'Radon', beskrivelse: 'Aktsomhetsområde – håndterbart via TEK17', sannsynlighet: 2, konsekvens: 1, risikoverdi: 2, tiltak: 'Radonsikring iht. TEK17' },
    ],
    anbefalinger: [
      'Fradeling allerede godkjent – lav reguleringsrisiko',
      'Alle 12 husmodeller er innenfor tillatt BYA på 30%',
      'Veirett og avkjøringstillatelse foreligger – adkomst er avklart',
      'Kommunalt VA tilgjengelig – ingen privat renseanlegg nødvendig',
      'Tomannsbolig er reguleringsmessig mulig – gir utviklingspotensial',
    ],
  },

  nabolag: {
    beskrivelse: 'Etablert boligområde i Grua, Lunner kommune. Skrånende tomt med gode lysforhold. Ca. 45 min til Oslo med bil via E16.',
    punkter: [
      { kategori: 'Kollektivtransport', navn: 'Bussholdeplass', avstand_m: 400, gangminutter: 5 },
      { kategori: 'Skole', navn: 'Grua skole', avstand_m: 650, gangminutter: 8 },
      { kategori: 'Dagligvare', navn: 'Dagligvare Grua', avstand_m: 550, gangminutter: 7 },
      { kategori: 'Park/friområde', navn: 'Skog og turområder', avstand_m: 150, gangminutter: 2 },
    ],
  },

  dokumenter: [
    { navn: 'Situasjonsplan', url: '/documents/myllavegen-58/situasjonsplan.pdf' },
    { navn: 'Reguleringsbestemmelser', url: '/documents/myllavegen-58/reguleringsbestemmelser.pdf' },
    { navn: 'Fradelingsvedtak', url: '/documents/myllavegen-58/fradelingsvedtak.pdf' },
    { navn: 'Avkjøringstillatelse', url: '/documents/myllavegen-58/avkjoringstillatelse.pdf' },
    { navn: 'FINN-annonse', url: 'https://www.finn.no/realestate/plots/ad.html?finnkode=444623623' },
  ],
}

const TIDSPLAN = [
  { tid: 'Uke 1', tittel: 'Kjøp av tomt', beskrivelse: 'Avtale signeres. Overtakelse etter nærmere avtale.' },
  { tid: 'Uke 2–3', tittel: 'Velg husmodell', beskrivelse: 'Gjennomgang av husmodeller med Tomtly. Kontakt med husleverandør.' },
  { tid: 'Uke 3–4', tittel: 'Tegning og søknad', beskrivelse: 'Tegnebua utarbeider tegninger og sender byggesøknad til Lunner kommune.' },
  { tid: 'Uke 4–12', tittel: 'Saksbehandling', beskrivelse: 'Kommunal behandling. Typisk 6–8 uker i Lunner.' },
  { tid: 'Uke 12–14', tittel: 'Produksjon starter', beskrivelse: 'Husleverandør starter produksjon. Grunnarbeid forberedes.' },
  { tid: 'Uke 14–40', tittel: 'Bygging', beskrivelse: 'Huset monteres og ferdigstilles. Tidsbruk varierer med leverandør.' },
]

export default function Myllavegen58() {
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
            <section id="husmodeller"><TomtHusmodeller modeller={HUSMODELLER as any} tomtType="skra" tomtNavn="Myllavegen 58 (skråtomt)" /></section>
            <section id="bilder"><TomtBildegalleri bilder={BILDER} adresse={TOMT.adresse} /></section>
            <section id="tegnebua"><TomtTegnebua valgte_husmodeller={1} /></section>

            <section id="tidsplan">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Tidsplan</h2>
              <p className="text-brand-600 mb-6">Fra tomtekjøp til innflytting.</p>
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
              <TomtKart lat={TOMT.senterpunkt.lat} lng={TOMT.senterpunkt.lng} adresse="Myllavegen 58, 2742 Grua" zoom={17} />
              <TomtKontakt />
              <TomtDeling adresse={TOMT.adresse} tomteId="myllavegen-58" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
