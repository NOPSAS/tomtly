'use client'
import TomtSide from '@/components/TomtSide'

const IMG = '/tomter/myllavegen-58'

const BILDER = [
  { id: 'h1', url: `${IMG}/hero.jpg`, alt: 'Myllavegen 58 – oversiktsbilde', kategori: 'tomt' },
  { id: 'h2', url: `${IMG}/situasjonskart.jpg`, alt: 'Situasjonskart', kategori: 'kart' },
  { id: 'h3', url: `${IMG}/arwen-situasjon.jpg`, alt: 'Arwen plassert på tomt', kategori: 'husmodell' },
  { id: 'h4', url: `${IMG}/nelly-situasjon.jpg`, alt: 'Nelly plassert på tomt', kategori: 'husmodell' },
  { id: 'h5', url: `${IMG}/wide-situasjon.jpg`, alt: 'Wide Skrå plassert på tomt', kategori: 'husmodell' },
  { id: 'h6', url: `${IMG}/signatur-305-situasjon.jpg`, alt: 'Signatur 305 plassert på tomt', kategori: 'husmodell' },
  { id: 'h7', url: `${IMG}/skogly-situasjon.jpg`, alt: 'Skogly plassert på tomt', kategori: 'husmodell' },
  { id: 'h8', url: `${IMG}/moholt-situasjon.jpg`, alt: 'Moholt plassert på tomt', kategori: 'husmodell' },
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
    id: 'arwen-skra', navn: 'Arwen Skrå', leverandor: 'ABChus',
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
      ],
    },
  },
  {
    id: 'nelly-skra', navn: 'Nelly Skrå', leverandor: 'ABChus',
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
        { url: `${IMG}/nelly-plan-hovedetasje.jpg`, label: 'Hovedetasje – stue, kjøkken, soverom 1, bad' },
        { url: `${IMG}/nelly-plan-underetasje.jpg`, label: 'Underetasje – 3 soverom, TV-stue, vaskerom' },
      ],
    },
  },
  {
    id: 'wide-skra', navn: 'Wide Skrå', leverandor: 'ABChus',
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
      ],
    },
  },
  {
    id: 'signatur-305', navn: 'Signatur 305', leverandor: 'Mesterhus',
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
      ],
    },
  },
  {
    id: 'signatur-308', navn: 'Signatur 308', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/signatur-308-moderne-funkishus-tilpasset-skra-tomt',
    beskrivelse: 'Moderne funkishus fra Mesterhus spesialdesignet for skråtomt. Flatt tak, store vindusflater og romslig planløsning over to plan.',
    bra_m2: 170, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~100 m²', 'Utnyttelse': '10,0%', 'Tilpasset': 'Skråtomt' },
    pris_hus: 5740000, total_budsjett: 6909000,
    kostnader: [...FELLES, { post: 'Signatur 308 – fra Mesterhus', belop: 5740000 }, ...ETTER(650000)],
    verdi_bra_m2: 170, verdi_m2_pris: 50000, verdi_total: 8500000,
    inkludert: ['Komplett hus ferdig montert', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/signatur-308-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/signatur-308-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/signatur-308-plan-2etg.jpg`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'selma-kjeller', navn: 'Selma med kjeller', leverandor: 'Älvsbyhus + Tegnebua',
    leverandor_url: 'https://tegnebua.no/konsepter/alvsbyhus-kjeller',
    beskrivelse: 'Älvsbyhus Selma med Tegnebuas kjellerkonsept – gir mye ekstra areal til lav kostnad. Hovedetasje fra Älvsbyhus, kjeller prosjektert av Tegnebua. Perfekt for skråtomt.',
    bra_m2: 180, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '~95 m²', 'Utnyttelse': '9,5%', 'Kjeller': 'Tegnebua-konsept', 'Husbank': 'Kvalifiserer' },
    pris_hus: 3200000, total_budsjett: 5119000,
    kostnader: [...FELLES, { post: 'Selma – hus fra Älvsbyhus', belop: 3200000 }, { post: 'Kjeller (prosjektert av Tegnebua)', belop: 500000 }, ...ETTER(700000)],
    verdi_bra_m2: 180, verdi_m2_pris: 50000, verdi_total: 9000000,
    inkludert: ['Hus levert på tomt', 'Kjeller med full takhøyde', 'Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/selma-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/selma-plan-hovedetasje.jpg`, label: 'Hovedetasje – stue, kjøkken, soverom' },
        { url: `${IMG}/selma-plan-kjeller.jpg`, label: 'Kjeller – ekstra soverom, bad, bod' },
      ],
    },
  },
  {
    id: 'skogly', navn: 'Skogly', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/skogly/',
    beskrivelse: 'Kompakt og effektiv bolig med inngang fra begge plan – perfekt for skrånende tomt. Innglassert balkong, åpen stue/kjøkken og 3 soverom.',
    bra_m2: 137, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '80,5 m²', 'Utnyttelse': '8,1%', 'Innglassert balkong': 'Ja' },
    pris_hus: 3580000, total_budsjett: 4749000,
    kostnader: [...FELLES, { post: 'Skogly – ferdig hus fra Hedalm-Anebyhus', belop: 3580000 }, ...ETTER(650000)],
    verdi_bra_m2: 137, verdi_m2_pris: 50000, verdi_total: 6850000,
    inkludert: ['Parkett', 'Flislagt entré og våtrom', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Innglassert balkong'],
    bilder: {
      fasade: [`${IMG}/skogly-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/skogly-plan-hovedetasje.jpg`, label: 'Hovedetasje – stue, kjøkken, bad, soverom 1' },
        { url: `${IMG}/skogly-plan-underetasje.jpg`, label: 'Underetasje – 3 soverom, bad, sportsbod' },
      ],
    },
  },
  {
    id: 'moholt', navn: 'Moholt', leverandor: 'Systemhus',
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
        { url: `${IMG}/moholt-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/moholt-plan-2etg.jpg`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'mira', navn: 'Mira', leverandor: 'Nordbohus',
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
        { url: `${IMG}/mira-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/mira-plan-2etg.jpg`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'sammen', navn: 'Sammen', leverandor: 'Nordbohus',
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
        { url: `${IMG}/sammen-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/sammen-plan-2etg.jpg`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'haugli', navn: 'Haugli', leverandor: 'Norgeshus',
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
      ],
    },
  },
  {
    id: 'horisont', navn: 'Horisont', leverandor: 'Norgeshus',
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
      ],
    },
  },
]

const TIDSPLAN = [
  { tid: 'Uke 1', tittel: 'Kjøp av tomt', beskrivelse: 'Avtale signeres. Overtakelse etter nærmere avtale.' },
  { tid: 'Uke 2–3', tittel: 'Velg husmodell', beskrivelse: 'Gjennomgang av husmodeller med Tomtly. Kontakt med husleverandør.' },
  { tid: 'Uke 3–4', tittel: 'Tegning og søknad', beskrivelse: 'Tegnebua utarbeider tegninger og sender byggesøknad til Lunner kommune.' },
  { tid: 'Uke 4–12', tittel: 'Saksbehandling', beskrivelse: 'Kommunal behandling. Typisk 6–8 uker i Lunner.' },
  { tid: 'Uke 12–14', tittel: 'Produksjon starter', beskrivelse: 'Husleverandør starter produksjon. Grunnarbeid forberedes.' },
  { tid: 'Uke 14–40', tittel: 'Bygging', beskrivelse: 'Huset monteres og ferdigstilles. Tidsbruk varierer med leverandør.' },
]

const DATA = {
  adresse: 'Myllavegen 58',
  sted: 'Grua, Lunner',
  kommune: 'Lunner',
  fylke: 'Innlandet',
  gnr: 86, bnr: 43,
  areal_m2: 1000,
  pris: 950000,
  koordinater: { lat: 60.3705, lng: 10.5675 },
  status: 'Til salgs' as const,
  finn_url: 'https://www.finn.no/realestate/plots/ad.html?finnkode=444623623',
  bilder: BILDER,
  husmodeller: HUSMODELLER,
  tidsplan: TIDSPLAN,

  terreng: {
    type: 'Skrånende',
    grunnforhold: 'Morene / fjell',
    kvikkleire: 'Ikke påvist',
    stabilitet: 'Tilfredsstillende',
  },

  infrastruktur: {
    vann: 'Kommunalt',
    avlop: 'Kommunalt',
    strom: 'Tilgjengelig',
    vei: 'Myllavegen (privat vei med veirett) fra fylkesvei',
    avkjorsel: 'Avkjøringstillatelse foreligger',
  },

  nokkeltall: {
    tomteareal: '~1 000 m²',
    maks_bya_prosent: '30%',
    maks_bya_m2: '300 m²',
    bya_etter_parkering_enebolig: '264 m² (etter 2 p-plasser)',
    bya_etter_parkering_tomannsbolig: '228 m² (etter 4 p-plasser)',
    tomannsbolig: 'Mulig',
  },

  regulering: {
    plan: 'Reguleringsplan Schiongsvingen',
    formal: 'Boligbebyggelse',
    status: 'Fradeling godkjent av Lunner kommune',
    utnyttelse: '30 % BYA',
    fradeling: 'Godkjent – parsell ca. 1 000 m²',
  },

  risikoanalyse: {
    total_risiko: 'lav' as const,
    faktorer: [
      { kategori: 'Regulering', beskrivelse: 'Fradelt til boligformål – godkjent', sannsynlighet: 1 as const, konsekvens: 1 as const },
      { kategori: 'Grunnforhold', beskrivelse: 'Skrånende tomt, morene/fjell', sannsynlighet: 2 as const, konsekvens: 2 as const },
      { kategori: 'VA-tilknytning', beskrivelse: 'Kommunalt VA tilgjengelig', sannsynlighet: 1 as const, konsekvens: 1 as const },
      { kategori: 'Adkomst', beskrivelse: 'Veirett og avkjøringstillatelse foreligger', sannsynlighet: 1 as const, konsekvens: 1 as const },
      { kategori: 'Radon', beskrivelse: 'Aktsomhetsområde – håndterbart via TEK17', sannsynlighet: 2 as const, konsekvens: 1 as const },
    ],
    anbefalinger: [
      'Fradeling allerede godkjent – lav reguleringsrisiko',
      'Alle 12 husmodeller er innenfor tillatt BYA på 30%',
      'Veirett og avkjøringstillatelse foreligger – adkomst er avklart',
      'Kommunalt VA tilgjengelig – ingen privat renseanlegg nødvendig',
      'Tomannsbolig er reguleringsmessig mulig – gir utviklingspotensial',
    ],
  },

  om: `Myllavegen 58 er en fradelt boligtomt på ca. 1 000 m² i etablert boligområde i Grua, Lunner kommune.

Tomten er godkjent fradelt til boligformål og ligger innenfor reguleringsplan Schiongsvingen. Med 30% BYA (300 m² maksimal bebygd areal) har tomten et betydelig utviklingspotensial – enten som romslig enebolig eller som tomannsbolig.

Terrenget er skrånende ned fra Myllavegen, noe som gir mulighet for underetasje/sokkeletasje, utsikt og gode lysforhold. Adkomst er avklart med veirett via privat vei og avkjøringstillatelse fra fylkesvei.`,

  utviklingspotensial: {
    enebolig: {
      maks_bya: '264 m² BYA etter parkering (2 plasser)',
      beskrivelse: 'Stor enebolig med garasje. Fleksibel grunnflate.',
    },
    tomannsbolig: {
      maks_bya: '228 m² BYA etter parkering (4 plasser)',
      beskrivelse: '2 x ~114 m² grunnflate. Mulighet for underetasje. Sterk økonomi.',
    },
  },

  dokumenter: [
    { navn: 'Situasjonsplan', url: '/documents/myllavegen-58/situasjonsplan.pdf' },
    { navn: 'Reguleringsbestemmelser', url: '/documents/myllavegen-58/reguleringsbestemmelser.pdf' },
    { navn: 'Fradelingsvedtak', url: '/documents/myllavegen-58/fradelingsvedtak.pdf' },
    { navn: 'Avkjøringstillatelse', url: '/documents/myllavegen-58/avkjoringstillatelse.pdf' },
    { navn: 'FINN-annonse', url: 'https://www.finn.no/realestate/plots/ad.html?finnkode=444623623' },
  ],
}

export default function MyllavGenPage() {
  return <TomtSide data={DATA} />
}
