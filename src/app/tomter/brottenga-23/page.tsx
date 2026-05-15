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
import { TomtSammendrag } from '@/components/tomt/TomtSammendrag'
import { FileText, Download } from 'lucide-react'

const IMG = '/tomter/brottenga-23'
const GD16 = '/tomter/gamle-dalsveg-16'
const MYL = '/tomter/myllavegen-58'

const BILDER = [
  { id: 'b1', url: `${IMG}/situasjonskart.png`, alt: 'Situasjonskart – Brøttenga 23', kategori: 'tomt' as const },
]

const FELLES = [
  { post: 'Tomt', belop: 1000000 },
  { post: 'Dokumentavgift (2,5%)', belop: 25000 },
]

const ETTER = (grunnarbeid: number) => [
  { post: 'Grunnarbeider inkl. mva (estimat)', belop: grunnarbeid },
  { post: 'Frakt fra fabrikk', belop: 80000 },
  { post: 'Kommunale gebyrer (byggesak)', belop: 150000 },
  { post: 'VA-tilknytning (vann + avløp)', belop: 120000 },
  { post: 'Byggestrøm og strømtilførsel', belop: 45000 },
  { post: 'Uavhengig kontroll (våtrom + lufttetthet)', belop: 10000 },
]

const HUSMODELLER = [
  {
    id: 'ase', grunnmur_inkludert: true, navn: 'Åse', leverandor: 'Älvsbyhus',
    leverandor_url: 'https://www.alvsbyhus.no/hus/ase',
    beskrivelse: 'Kompakt og gjennomtenkt enebolig i ett plan. Romslig stue, separat gang, 3 soverom og praktisk planløsning. God verdi for pengene. Grunnmur inkludert i prisen.',
    bra_m2: 135, soverom: 3, bad: '1 + WC', etasjer: 1,
    ekstra: { 'BYA': '90 m²', 'Utnyttelse': '10,6%', 'Grunnmur': 'Inkludert' },
    pris_hus: 3094000, total_budsjett: 4874000,
    kostnader: [...FELLES, { post: 'Åse – nøkkelferdig fra Älvsbyhus', belop: 3094000 }, ...ETTER(350000)],
    verdi_bra_m2: 135, verdi_m2_pris: 40000, verdi_total: 5400000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Pipe og peisovn', 'Komplett el-leveranse'],
    bilder: {
      fasade: ['https://alvsbyhus.no/AdaptiveImages/optimizely/04b32cd6-45da-4f0a-92f7-51793039df15/ah_2022_ase_38g_no.jpg'],
      plantegninger: [],
    },
  },
  {
    id: 'fanny', grunnmur_inkludert: true, navn: 'Fanny', leverandor: 'Älvsbyhus',
    leverandor_url: 'https://www.alvsbyhus.no/hus/fanny',
    beskrivelse: 'Funksjonell enebolig med moderne fasade. Romslig stue, 3 soverom og effektiv planløsning. Grunnmur inkludert.',
    bra_m2: 135, soverom: 3, bad: '1', etasjer: 1,
    ekstra: { 'BYA': '88 m²', 'Utnyttelse': '10,4%', 'Grunnmur': 'Inkludert' },
    pris_hus: 3250000, total_budsjett: 5030000,
    kostnader: [...FELLES, { post: 'Fanny – nøkkelferdig fra Älvsbyhus', belop: 3250000 }, ...ETTER(350000)],
    verdi_bra_m2: 135, verdi_m2_pris: 40000, verdi_total: 5400000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Komplett el-leveranse'],
    bilder: {
      fasade: ['https://alvsbyhus.no/AdaptiveImages/optimizety/03f982b1-2c90-4a36-bf52-d915a0605b5c/ah_2022_fanny_38g_no.jpg'],
      plantegninger: [],
    },
  },
  {
    id: 'lilly', grunnmur_inkludert: true, navn: 'Lilly', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/lilly/',
    beskrivelse: 'Moderne enebolig i to etasjer med åpen stue/kjøkkensone, 3 soverom og romslig bad. Effektiv planløsning med god utnyttelse av arealet. Grunnmur inkludert.',
    bra_m2: 144, soverom: 3, bad: '1 + WC', etasjer: 2,
    ekstra: { 'BYA': '92 m²', 'Utnyttelse': '10,9%', 'Grunnmur': 'Inkludert' },
    pris_hus: 3800000, total_budsjett: 5580000,
    kostnader: [...FELLES, { post: 'Lilly – nøkkelferdig fra ABChus', belop: 3800000 }, ...ETTER(350000)],
    verdi_bra_m2: 144, verdi_m2_pris: 45000, verdi_total: 6480000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${GD16}/lilly-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'nelly', grunnmur_inkludert: true, navn: 'Nelly', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/nelly/',
    beskrivelse: 'Klassisk enebolig med mønetak. 4 soverom fordelt på to plan, vaskerom og TV-stue i underetasje. Inngang fra begge plan. Grunnmur inkludert.',
    bra_m2: 161, soverom: 4, bad: '1 + WC', etasjer: 2,
    ekstra: { 'BYA': '100 m²', 'Utnyttelse': '11,8%', 'Vaskerom': 'Ja', 'Grunnmur': 'Inkludert' },
    pris_hus: 4100000, total_budsjett: 5880000,
    kostnader: [...FELLES, { post: 'Nelly – nøkkelferdig fra ABChus', belop: 4100000 }, ...ETTER(350000)],
    verdi_bra_m2: 161, verdi_m2_pris: 45000, verdi_total: 7245000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagte bad', 'Pipe og peisovn', 'Kjøkken med hvitevarer', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${GD16}/nelly-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'nordstrand', grunnmur_inkludert: true, navn: 'Nordstrand', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/nordstrand/',
    beskrivelse: 'Tidløs og familievennlig enebolig fra Mesterhus. Romslig stue, stort kjøkken, 4 soverom og 2 bad. God byggekvalitet med tilpasningsmuligheter.',
    bra_m2: 158, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '97 m²', 'Utnyttelse': '11,5%', 'Grunnmur': 'Inkludert' },
    pris_hus: 3800000, total_budsjett: 5580000,
    kostnader: [...FELLES, { post: 'Nordstrand – nøkkelferdig fra Mesterhus', belop: 3800000 }, ...ETTER(350000)],
    verdi_bra_m2: 158, verdi_m2_pris: 45000, verdi_total: 7110000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${GD16}/nordstrand-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'signatur-305', grunnmur_inkludert: true, navn: 'Signatur 305', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/signatur-305/',
    beskrivelse: 'Et av Mesterhus sine mest populære hus. Åpen kjøkken- og stueplan, 4 soverom og 2 bad. Fin fasade med store vindusflater. Mye for pengene.',
    bra_m2: 175, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '105 m²', 'Utnyttelse': '12,4%', 'Grunnmur': 'Inkludert' },
    pris_hus: 4200000, total_budsjett: 5980000,
    kostnader: [...FELLES, { post: 'Signatur 305 – nøkkelferdig fra Mesterhus', belop: 4200000 }, ...ETTER(350000)],
    verdi_bra_m2: 175, verdi_m2_pris: 45000, verdi_total: 7875000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${MYL}/signatur-305-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'mira', grunnmur_inkludert: true, navn: 'Mira', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/mira',
    beskrivelse: 'Stilren og moderne enebolig fra Nordbohus. Luftige rom, stor stue mot hage, 4 soverom og 2 bad. God standard og høy kvalitet.',
    bra_m2: 170, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '100 m²', 'Utnyttelse': '11,8%', 'Grunnmur': 'Inkludert' },
    pris_hus: 4500000, total_budsjett: 6280000,
    kostnader: [...FELLES, { post: 'Mira – nøkkelferdig fra Nordbohus', belop: 4500000 }, ...ETTER(350000)],
    verdi_bra_m2: 170, verdi_m2_pris: 45000, verdi_total: 7650000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${MYL}/mira-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'komplett', grunnmur_inkludert: true, navn: 'Komplett', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/komplett',
    beskrivelse: 'En gjennomtenkt og komplett løsning fra Nordbohus. Romslig stue, praktisk kjøkken, 4 soverom og 2 bad. Ferdig til innflytting.',
    bra_m2: 149, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '92 m²', 'Utnyttelse': '10,9%', 'Grunnmur': 'Inkludert' },
    pris_hus: 4200000, total_budsjett: 5980000,
    kostnader: [...FELLES, { post: 'Komplett – nøkkelferdig fra Nordbohus', belop: 4200000 }, ...ETTER(350000)],
    verdi_bra_m2: 149, verdi_m2_pris: 45000, verdi_total: 6705000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${GD16}/komplett-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'perla', grunnmur_inkludert: true, navn: 'Perla', leverandor: 'Norgeshus',
    leverandor_url: 'https://www.norgeshus.no/hus/perla/',
    beskrivelse: 'Populær modell fra Norgeshus med klassisk uttrykk og moderne planløsning. Åpen stue/kjøkken, 4 soverom og 2 bad. God verdi.',
    bra_m2: 157, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '96 m²', 'Utnyttelse': '11,3%', 'Grunnmur': 'Inkludert' },
    pris_hus: 3900000, total_budsjett: 5680000,
    kostnader: [...FELLES, { post: 'Perla – nøkkelferdig fra Norgeshus', belop: 3900000 }, ...ETTER(350000)],
    verdi_bra_m2: 157, verdi_m2_pris: 45000, verdi_total: 7065000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Lyskilder inne/ute', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${GD16}/perla-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'rognheim', grunnmur_inkludert: true, navn: 'Rognheim', leverandor: 'Norgeshus',
    leverandor_url: 'https://www.norgeshus.no/hus/rognheim/',
    beskrivelse: 'Stilren enebolig med tradisjonelt uttrykk. 4 soverom, 2 bad og romslig stue. Passer godt til et etablert boligfelt som Brårud.',
    bra_m2: 146, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '90 m²', 'Utnyttelse': '10,6%', 'Grunnmur': 'Inkludert' },
    pris_hus: 3700000, total_budsjett: 5480000,
    kostnader: [...FELLES, { post: 'Rognheim – nøkkelferdig fra Norgeshus', belop: 3700000 }, ...ETTER(350000)],
    verdi_bra_m2: 146, verdi_m2_pris: 45000, verdi_total: 6570000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${GD16}/rognheim-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'haugli', grunnmur_inkludert: true, navn: 'Haugli', leverandor: 'Norgeshus',
    leverandor_url: 'https://www.norgeshus.no/hus/haugli/',
    beskrivelse: 'Romslig og praktisk enebolig over to plan. Stor stue, 4 soverom, 2 bad og god lagerplass. Velprøvd modell fra Norgeshus.',
    bra_m2: 165, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '100 m²', 'Utnyttelse': '11,8%', 'Grunnmur': 'Inkludert' },
    pris_hus: 3850000, total_budsjett: 5630000,
    kostnader: [...FELLES, { post: 'Haugli – nøkkelferdig fra Norgeshus', belop: 3850000 }, ...ETTER(350000)],
    verdi_bra_m2: 165, verdi_m2_pris: 45000, verdi_total: 7425000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Lyskilder', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${MYL}/haugli-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'selvik', grunnmur_inkludert: true, navn: 'Selvik', leverandor: 'Systemhus',
    leverandor_url: 'https://www.systemhus.no/hus/selvik/',
    beskrivelse: 'Velprøvd enebolig fra Systemhus med gjennomtenkt planløsning. 4 soverom, 2 bad og stor stue med god takhøyde. Fleksibel tilpasning.',
    bra_m2: 165, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '102 m²', 'Utnyttelse': '12,0%', 'Grunnmur': 'Inkludert' },
    pris_hus: 4100000, total_budsjett: 5880000,
    kostnader: [...FELLES, { post: 'Selvik – nøkkelferdig fra Systemhus', belop: 4100000 }, ...ETTER(350000)],
    verdi_bra_m2: 165, verdi_m2_pris: 45000, verdi_total: 7425000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${GD16}/selvik-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'trend', grunnmur_inkludert: true, navn: 'Trend', leverandor: 'Systemhus',
    leverandor_url: 'https://www.systemhus.no/hus/trend/',
    beskrivelse: 'Moderne og kompakt enebolig fra Systemhus. God stue, 3–4 soverom og effektiv romplan. Passer godt til en 847 m² tomt.',
    bra_m2: 141, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '88 m²', 'Utnyttelse': '10,4%', 'Grunnmur': 'Inkludert' },
    pris_hus: 3600000, total_budsjett: 5380000,
    kostnader: [...FELLES, { post: 'Trend – nøkkelferdig fra Systemhus', belop: 3600000 }, ...ETTER(350000)],
    verdi_bra_m2: 141, verdi_m2_pris: 45000, verdi_total: 6345000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${GD16}/trend-fasade-1.webp`],
      plantegninger: [],
    },
  },
  {
    id: 'ronningen', grunnmur_inkludert: false, navn: 'Rønningen', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/ronningen/',
    beskrivelse: 'Funksjonelt trehus over to etasjer. Åpen kjøkken-/stueløsning, loftstue og 4 soverom. Grunnmur ikke inkludert i prisen – estimert tillegg kr 200 000–300 000.',
    bra_m2: 150, soverom: 4, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '91 m²', 'Utnyttelse': '10,7%', 'Loftstue': 'Ja' },
    pris_hus: 4098000, total_budsjett: 6128000,
    kostnader: [...FELLES, { post: 'Rønningen – nøkkelferdig fra Hedalm-Anebyhus', belop: 4098000 }, { post: 'Grunnmur/fundamentering (estimat)', belop: 250000 }, ...ETTER(350000)],
    verdi_bra_m2: 150, verdi_m2_pris: 45000, verdi_total: 6750000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${GD16}/ronningen-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'lyris', grunnmur_inkludert: false, navn: 'Lyris', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/lyris/',
    beskrivelse: 'Romslig hus over to etasjer med loftstue og vaskerom på bakkeplan. 4 soverom. Grunnmur ikke inkludert – estimert tillegg kr 200 000–300 000.',
    bra_m2: 155, soverom: 4, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '88 m²', 'Utnyttelse': '10,4%', 'Loftstue': 'Ja', 'Vaskerom': 'Ja' },
    pris_hus: 4258000, total_budsjett: 6288000,
    kostnader: [...FELLES, { post: 'Lyris – nøkkelferdig fra Hedalm-Anebyhus', belop: 4258000 }, { post: 'Grunnmur/fundamentering (estimat)', belop: 250000 }, ...ETTER(350000)],
    verdi_bra_m2: 155, verdi_m2_pris: 45000, verdi_total: 6975000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el- og rørleveranse'],
    bilder: {
      fasade: [`${GD16}/lyris-fasade-1.jpg`],
      plantegninger: [],
    },
  },
]

const TOMT = {
  adresse: 'Brøttenga 23',
  poststed: 'Brårud',
  kommune: 'Nes',
  areal_m2: 847,
  gnr: 32, bnr: 110,
  senterpunkt: { lat: 60.21104, lng: 11.33211 },

  regulering: {
    arealformaal: 'Boligbebyggelse – frittliggende småhusbebyggelse',
    utnyttelsesgrad_bya: 30,
    maks_hoyde_m: 8.5,
    maks_etasjer: 2,
    byggegrense_m: 4,
    hensynssoner: [] as { type: string; beskrivelse: string; konsekvens: 'lav' | 'medium' | 'hoy' }[],
    bestemmelser: [
      'Boligfelt med etablert infrastruktur',
      'Kommunalt vann og avløp tilgjengelig i vei',
      'Maks 30 % BYA = 254 m² tillatt bebygd areal',
      'Adkomst via Brøttenga (blindvei)',
      'Bredband tilgjengelig',
    ],
    plannavn: 'Kommuneplanens arealdel – Nes',
  },

  risikoanalyse: {
    total_risiko: 'lav' as const,
    faktorer: [
      { kategori: 'Regulering', beskrivelse: 'Etablert boligfelt – boligformål bekreftet', sannsynlighet: 1, konsekvens: 1, risikoverdi: 1, tiltak: 'Allerede regulert til bolig' },
      { kategori: 'Grunnforhold', beskrivelse: 'Geoteknisk rapport ikke utarbeidet', sannsynlighet: 2, konsekvens: 2, risikoverdi: 4, tiltak: 'Innhent geoteknisk vurdering ved kjøp' },
      { kategori: 'VA-tilknytning', beskrivelse: 'Kommunalt VA bekreftet tilgjengelig i vei', sannsynlighet: 1, konsekvens: 1, risikoverdi: 1, tiltak: 'Tilkoblingskostnad estimert kr 120 000' },
      { kategori: 'Adkomst', beskrivelse: 'Blindvei – enklere saksbehandling enn riksvei', sannsynlighet: 1, konsekvens: 1, risikoverdi: 1, tiltak: 'Adkomst via eksisterende vei' },
      { kategori: 'Naboforhold', beskrivelse: 'Etablert nabolag – nabovarsling nødvendig', sannsynlighet: 2, konsekvens: 1, risikoverdi: 2, tiltak: 'Nabovarsling håndteres i byggesøknad' },
    ],
    anbefalinger: [
      'Tomt i etablert boligfelt – enkel saksbehandling',
      'Kommunalt VA bekreftet – tilkoblingskostnad bør avklares ved kjøp',
      'Innhent geoteknisk vurdering for å avklare grunnforhold',
      '15 husmodeller fra 6 leverandører er analysert – god valgfrihet',
      'Typisk byggetid fra kjøp til innflytting: ca. 12 måneder',
    ],
  },

  nabolag: {
    beskrivelse: 'Etablert og rolig boligfelt i Brårud, Nes kommune. Gangavstand til skole, barnehage og dagligvare. Enkel tilgang til Oslo via E6 (ca. 50 min) og Gardermoen (ca. 25 min).',
    punkter: [
      { kategori: 'Kollektivtransport', navn: 'Buss (Brårudfeltet)', avstand_m: 400, gangminutter: 5 },
      { kategori: 'Skole', navn: 'Brårud skole', avstand_m: 600, gangminutter: 8 },
      { kategori: 'Barnehage', navn: 'Barnehage', avstand_m: 500, gangminutter: 7 },
      { kategori: 'Dagligvare', navn: 'Dagligvare i nærområdet', avstand_m: 900, gangminutter: 12 },
      { kategori: 'Natur', navn: 'Turterreng og skiløyper', avstand_m: 200, gangminutter: 3 },
    ],
  },

  dokumenter: [] as { navn: string; url: string }[],
}

const TIDSPLAN = [
  { tid: 'Uke 1', tittel: 'Kjøp av tomt', beskrivelse: 'Avtale signeres. Overtakelse etter nærmere avtale.' },
  { tid: 'Uke 2–3', tittel: 'Velg husmodell', beskrivelse: 'Gjennomgang av husmodeller med Tomtly. Kontakt med husleverandør.' },
  { tid: 'Uke 3–4', tittel: 'Tegning og søknad', beskrivelse: 'Tegnebua utarbeider tegninger og sender byggesøknad til Nes kommune.' },
  { tid: 'Uke 4–6', tittel: 'Nabovarsling', beskrivelse: 'Naboer varsles. 14 dagers varslingsfrist. Eventuelle merknader behandles.' },
  { tid: 'Uke 6–20', tittel: 'Saksbehandling', beskrivelse: 'Kommunal behandling. Typisk 8–12 uker i Nes. Tillatelse innvilges.' },
  { tid: 'Uke 20–30', tittel: 'Produksjon starter', beskrivelse: 'Husleverandør starter produksjon. Grunnarbeider forberedes og utføres.' },
  { tid: 'Uke 30–52', tittel: 'Bygging og innflytting', beskrivelse: 'Huset monteres og ferdigstilles. Fra kjøp til nøkkel ca. 12 måneder.' },
]

export default function Brottenga23() {
  return (
    <div className="bg-white">
      <TomtHero adresse={TOMT.adresse} poststed={TOMT.poststed} kommune={TOMT.kommune} areal_m2={TOMT.areal_m2} gnr={TOMT.gnr} bnr={TOMT.bnr} />

      <TomtSammendrag
        adresse="Brøttenga 23"
        kommune="Nes"
        pris={1000000}
        areal_m2={847}
        antall_husmodeller={15}
        laveste_budsjett={4874000}
        hoyeste_budsjett={6288000}
        anbefaling="Brøttenga 23 er en velplassert boligtomt i et etablert og rolig boligfelt i Brårud, Nes kommune. Kommunalt vann og avløp er tilgjengelig i veien, og tomten har kort gangavstand til skole, barnehage og bussholdeplass. Med 30 % BYA og 847 m² er det god plass til et romslig eneboligprosjekt."
        fordeler={[
          'Etablert boligfelt – enkel saksbehandling',
          'Kommunalt vann og avløp i vei – tilgjengelig',
          '847 m² – 30% BYA gir 254 m² tillatt bebygd',
          '15 husmodeller fra 6 leverandører – fra 4,9 MNOK',
          'Gangavstand til skole, barnehage og buss',
          '25 min til Gardermoen, 50 min til Oslo via E6',
        ]}
      />

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
            <section id="husmodeller"><TomtHusmodeller modeller={HUSMODELLER as any} tomtType="flat" tomtNavn="Brøttenga 23" /></section>
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
            <section id="risiko"><TomtRisiko risikoanalyse={TOMT.risikoanalyse} /></section>

            <TomtSammendrag
              adresse="Brøttenga 23"
              kommune="Nes"
              pris={1000000}
              areal_m2={847}
              antall_husmodeller={15}
              laveste_budsjett={4874000}
              hoyeste_budsjett={6288000}
              anbefaling="Brøttenga 23 er en velplassert boligtomt i et etablert og rolig boligfelt i Brårud, Nes kommune. Kommunalt vann og avløp er tilgjengelig i veien, og tomten har kort gangavstand til skole, barnehage og bussholdeplass. Med 30 % BYA og 847 m² er det god plass til et romslig eneboligprosjekt."
              fordeler={[
                'Etablert boligfelt – enkel saksbehandling',
                'Kommunalt vann og avløp i vei – tilgjengelig',
                '847 m² – 30% BYA gir 254 m² tillatt bebygd',
                '15 husmodeller fra 6 leverandører – fra 4,9 MNOK',
                'Gangavstand til skole, barnehage og buss',
                '25 min til Gardermoen, 50 min til Oslo via E6',
              ]}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-36 space-y-6">
              <TomtKart lat={TOMT.senterpunkt.lat} lng={TOMT.senterpunkt.lng} adresse="Brøttenga 23, 2162 Brårud" zoom={16} />
              <a
                href="/api/salgsoppgave/brottenga-23"
                download
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-tomtly-accent text-white font-medium rounded-xl hover:bg-forest-700 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                Last ned salgsoppgave (PDF)
              </a>
              <TomtKontakt />
              <TomtDeling adresse={TOMT.adresse} tomteId="brottenga-23" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
