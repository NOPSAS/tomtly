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

const IMG = '/tomter/gamle-dalsveg-16'

const BILDER = [
  { id: 'b1', url: `${IMG}/situasjonskart.png`, alt: 'Situasjonskart – Gamle Dalsveg 16 A', kategori: 'tomt' as const },
  { id: 'b2', url: `${IMG}/deleplan.png`, alt: 'Deleplan – fradelt parsell', kategori: 'tomt' as const },
  { id: 'b3', url: `${IMG}/va-kart.png`, alt: 'VA-kart', kategori: 'tomt' as const },
  { id: 'b4', url: `${IMG}/luftig-fasade-1.jpg`, alt: 'Nordbohus Luftig – fasade', kategori: 'annet' as const },
  { id: 'b5', url: `${IMG}/perla-fasade-1.jpg`, alt: 'Norgeshus Perla – fasade', kategori: 'annet' as const },
  { id: 'b6', url: `${IMG}/vipp-fasade-1.jpg`, alt: 'Norgeshus Vipp – fasade', kategori: 'annet' as const },
  { id: 'b7', url: `${IMG}/rognheim-fasade-1.jpg`, alt: 'Norgeshus Rognheim – fasade', kategori: 'annet' as const },
  { id: 'b8', url: `${IMG}/all-tid-nordbohus-visualisering.png`, alt: 'All-tid Nordbohus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b9', url: `${IMG}/lilly-abchus-visualisering.png`, alt: 'Lilly ABChus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b10', url: `${IMG}/nelly-abchus-visualisering.png`, alt: 'Nelly ABChus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b11', url: `${IMG}/perla-norgeshus-visualisering.png`, alt: 'Perla Norgeshus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b12', url: `${IMG}/vipp-norgeshus-visualisering.png`, alt: 'Vipp Norgeshus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b13', url: `${IMG}/skansen-fasade-1.jpg`, alt: 'Skansen Mesterhus – fasade', kategori: 'annet' as const },
  { id: 'b14', url: `${IMG}/arwen-a-fasade-1.jpg`, alt: 'Arwen A ABChus – fasade', kategori: 'annet' as const },
]

const FELLES = [
  { post: 'Tomt', belop: 2300000 },
  { post: 'Dokumentavgift (2,5%)', belop: 57500 },
]
const ETTER = [
  { post: 'Grunnarbeider inkl. mva (estimat)', belop: 400000 },
  { post: 'Frakt fra fabrikk', belop: 60000 },
  { post: 'Kommunale gebyrer (byggesak)', belop: 175000 },
  { post: 'VA-tilknytning (vann + avløp)', belop: 98824 },
  { post: 'Byggestrøm og strømtilførsel', belop: 45000 },
  { post: 'Uavhengig kontroll (våtrom + lufttetthet)', belop: 10000 },
]

const HUSMODELLER = [
  {
    id: 'luftig', navn: 'Luftig', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/luftig',
    grunnmur_inkludert: true,
    beskrivelse: 'Koselig hjem som kombinerer klassisk form med moderne detaljer. Effektiv planløsning med romslig atmosfære, bred trapp, fleksible rom og U-formet kjøkken. 36 m² terrasse med doble glassdører.',
    bra_m2: 166, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '110 m²', 'Terrasse': '36 m²', 'Carport': 'Tilvalg' },
    pris_hus: 5246000, total_budsjett: 8392324,
    kostnader: [...FELLES, { post: 'Luftig – nøkkelferdig fra Nordbohus', belop: 5246000 }, ...ETTER],
    verdi_bra_m2: 166, verdi_m2_pris: 53000, verdi_total: 8798000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/luftig-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/luftig-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/luftig-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'fiks', navn: 'Fiks', leverandor: 'Norgeshus',
    leverandor_url: 'https://norgeshus.no/bygge-hus/fiks',
    grunnmur_inkludert: true,
    beskrivelse: 'Kostnadseffektivt hjem med utleiedel i kjeller – gir økonomisk trygghet og fleksibilitet. Ideelt for etablerende par og førstegangskjøpere som ønsker leie­inntekt fra dag én.',
    bra_m2: 143, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '95 m²', 'Utleiedel': 'Kjeller', 'Husbank': 'Kvalifiserer' },
    pris_hus: 4808000, total_budsjett: 7954324,
    kostnader: [...FELLES, { post: 'Fiks – nøkkelferdig fra Norgeshus', belop: 4808000 }, ...ETTER],
    verdi_bra_m2: 143, verdi_m2_pris: 53000, verdi_total: 7579000,
    inkludert: ['Grunnmur inkludert', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/fiks-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/fiks-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/fiks-plan-2etg.jpg`, label: '2. etasje / kjeller' },
      ],
    },
  },
  {
    id: 'stolt', navn: 'Stolt', leverandor: 'Norgeshus',
    leverandor_url: 'https://norgeshus.no/bygge-hus/stolt',
    grunnmur_inkludert: true,
    beskrivelse: 'Enkel og tidsmessig arkitektur med smarte løsninger. Arealeffektivt hjem designet for å maksimere plassen – perfekt for familier med små barn. Lavest inngangspris av alle modellene.',
    bra_m2: 113, soverom: 3, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '78 m²', 'Lengde': '10,6 m', 'Bredde': '10,2 m' },
    pris_hus: 3600000, total_budsjett: 6746324,
    kostnader: [...FELLES, { post: 'Stolt – nøkkelferdig fra Norgeshus', belop: 3600000 }, ...ETTER],
    verdi_bra_m2: 113, verdi_m2_pris: 53000, verdi_total: 5989000,
    inkludert: ['Grunnmur inkludert', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/stolt-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/stolt-plan-1etg.jpg`, label: 'Plan – begge etasjer' },
      ],
    },
  },
  {
    id: 'vipp', navn: 'Vipp', leverandor: 'Norgeshus',
    leverandor_url: 'https://norgeshus.no/bygge-hus/vipp',
    grunnmur_inkludert: true,
    beskrivelse: 'Moderne design med praktisk fleksibilitet. Åpen kjøkken/stue med rikelig naturlig lys, en-suite soverom, vaskerom med separat inngang og fleksible rom for hjemmekontor eller hobbyrom.',
    bra_m2: 151, soverom: 4, bad: '1 + en-suite', etasjer: 2,
    ekstra: { 'BYA': '141 m²', 'Vaskerom': 'Separat inngang', 'En-suite': 'Ja' },
    pris_hus: 5275000, total_budsjett: 8421324,
    kostnader: [...FELLES, { post: 'Vipp – nøkkelferdig fra Norgeshus', belop: 5275000 }, ...ETTER],
    verdi_bra_m2: 151, verdi_m2_pris: 53000, verdi_total: 8003000,
    inkludert: ['Grunnmur inkludert', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/vipp-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/vipp-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/vipp-plan-2etg.jpg`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'draapen-moderne', navn: 'Dråpen Moderne', leverandor: 'Norgeshus',
    leverandor_url: 'https://norgeshus.no/bygge-hus/draapen-moderne',
    grunnmur_inkludert: true,
    beskrivelse: 'Funkis-inspirert variant med flatt tak, store glassfasader og rene linjer. Fellesarealene ligger i 1. etasje, soverom i 2. etasje. Identisk planløsning som Dråpen – uterommene skiller variantene.',
    bra_m2: 140, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '97 m²', 'Taktype': 'Flatt tak', 'Stil': 'Funkis' },
    pris_hus: 4637000, total_budsjett: 7783324,
    kostnader: [...FELLES, { post: 'Dråpen Moderne – nøkkelferdig fra Norgeshus', belop: 4637000 }, ...ETTER],
    verdi_bra_m2: 140, verdi_m2_pris: 53000, verdi_total: 7420000,
    inkludert: ['Grunnmur inkludert', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/draapen-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/draapen-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/draapen-plan-2etg.jpg`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'eden', navn: 'Eden', leverandor: 'Norgeshus',
    leverandor_url: 'https://norgeshus.no/bygge-hus/eden',
    grunnmur_inkludert: true,
    beskrivelse: 'Kompakt landlig bolig med integrert hønsegård bak garasjen og takdyrking som mulighet. Høy takhøyde i stue og kjøkken, store vinduer og TV-stue som også fungerer som drivhus.',
    bra_m2: 161, soverom: 3, bad: '2', etasjer: 3,
    ekstra: { 'BYA': '130 m²', 'Etasjer': '3', 'Unikt': 'Hønsegård + drivhus' },
    pris_hus: 6257000, total_budsjett: 9403324,
    kostnader: [...FELLES, { post: 'Eden – nøkkelferdig fra Norgeshus', belop: 6257000 }, ...ETTER],
    verdi_bra_m2: 161, verdi_m2_pris: 53000, verdi_total: 8533000,
    inkludert: ['Grunnmur inkludert', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/eden-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/eden-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/eden-plan-2etg.jpg`, label: '2. etasje' },
        { url: `${IMG}/eden-plan-3etg.jpg`, label: '3. etasje' },
      ],
    },
  },
  {
    id: 'perla', navn: 'Perla', leverandor: 'Norgeshus',
    leverandor_url: 'https://norgeshus.no/bygge-hus/perla',
    grunnmur_inkludert: true,
    beskrivelse: 'Hvitmalte vegger med sørlandsk sjarm. Åpen planløsning med rikelig naturlig lys, 4 soverom, 2 bad og aromatisk loftsrom med særegent hytte-preg og fire knekkroft for oppbevaring.',
    bra_m2: 157, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '105 m²', 'Loft': 'Ja', 'Stil': 'Sørlandsk' },
    pris_hus: 4770000, total_budsjett: 7916324,
    kostnader: [...FELLES, { post: 'Perla – nøkkelferdig fra Norgeshus', belop: 4770000 }, ...ETTER],
    verdi_bra_m2: 157, verdi_m2_pris: 53000, verdi_total: 8321000,
    inkludert: ['Grunnmur inkludert', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/perla-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/perla-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/perla-plan-2etg.jpg`, label: '2. etasje / loft' },
      ],
    },
  },
  {
    id: 'rognheim', navn: 'Rognheim', leverandor: 'Norgeshus',
    leverandor_url: 'https://norgeshus.no/bygge-hus/rognheim',
    grunnmur_inkludert: true,
    beskrivelse: 'Klassisk bolig med romantisk uttrykk – balkonger, doble dører og koselig loftsrom for barna. Planløsningen gir separate soner for gjester og familie, med to bad (ett i hver etasje).',
    bra_m2: 146, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '98 m²', 'Balkong': 'Ja', 'Loft': 'Ja' },
    pris_hus: 4526000, total_budsjett: 7672324,
    kostnader: [...FELLES, { post: 'Rognheim – nøkkelferdig fra Norgeshus', belop: 4526000 }, ...ETTER],
    verdi_bra_m2: 146, verdi_m2_pris: 53000, verdi_total: 7738000,
    inkludert: ['Grunnmur inkludert', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/rognheim-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/rognheim-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/rognheim-plan-2etg.jpg`, label: '2. etasje' },
      ],
    },
  },
  // ── Älvsbyhus ─────────────────────────────────────────────
  {
    id: 'ase', grunnmur_inkludert: true, navn: 'Åse', leverandor: 'Älvsbyhus',
    leverandor_url: 'https://www.alvsbyhus.no/vare-hus/1.5-etasjes-hus/ase/',
    beskrivelse: '1,5-etasjes hus for tomter med utsikt. Integrert kjøkken og stue strekker seg over hele lengden med opptil seks vinduer og glassdør for panoramautsikt. Grunnmur inkludert i prisen.',
    bra_m2: 135, soverom: 3, bad: '1', etasjer: 1.5,
    ekstra: { 'BYA': '128 m²', 'Takvinkel': '38° eller 34°', 'Grunnmur': 'Inkludert' },
    pris_hus: 3094000, total_budsjett: 6240324,
    kostnader: [...FELLES, { post: 'Åse – nøkkelferdig fra Älvsbyhus', belop: 3094000 }, ...ETTER],
    verdi_bra_m2: 135, verdi_m2_pris: 53000, verdi_total: 7155000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: ['https://alvsbyhus.no/AdaptiveImages/optimizely/04b32cd6-45da-4f0a-92f7-51793039df15/ah_2022_ase_38g_no.jpg'],
      plantegninger: [],
    },
  },
  {
    id: 'astrid', grunnmur_inkludert: true, navn: 'Astrid', leverandor: 'Älvsbyhus',
    leverandor_url: 'https://www.alvsbyhus.no/vare-hus/1.5-etasjes-hus/astrid/',
    beskrivelse: 'En av Älvsbyhus sine mest solgte modeller gjennom tidene. Luftig stue-/kjøkkenløsning på nesten 50 m² og god plass til den voksende familien. Grunnmur inkludert.',
    bra_m2: 135, soverom: 4, bad: '1', etasjer: 1.5,
    ekstra: { 'BYA': '128 m²', 'Stue/kjøkken': '~50 m²', 'Grunnmur': 'Inkludert' },
    pris_hus: 3094000, total_budsjett: 6240324,
    kostnader: [...FELLES, { post: 'Astrid – nøkkelferdig fra Älvsbyhus', belop: 3094000 }, ...ETTER],
    verdi_bra_m2: 135, verdi_m2_pris: 53000, verdi_total: 7155000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: ['https://www.alvsbyhus.no/AdaptiveImages/optimizely/46c7a558-1719-42f4-9988-6355dfbc8e37/ah_2022_astrid_38g_no.jpg'],
      plantegninger: [],
    },
  },
  {
    id: 'fanny', grunnmur_inkludert: true, navn: 'Fanny', leverandor: 'Älvsbyhus',
    leverandor_url: 'https://www.alvsbyhus.no/vare-hus/1.5-etasjes-hus/fanny/',
    beskrivelse: 'Gavlstilt hus designet for smale tomter med fleksibel overetasje. God utnyttelse av arealet i 1,5-etasjes design. Grunnmur inkludert i prisen fra Älvsbyhus.',
    bra_m2: 135, soverom: 3, bad: '1', etasjer: 1.5,
    ekstra: { 'BYA': '128 m²', 'Tomtetype': 'Smal tomt', 'Grunnmur': 'Inkludert' },
    pris_hus: 3107000, total_budsjett: 6253324,
    kostnader: [...FELLES, { post: 'Fanny – nøkkelferdig fra Älvsbyhus', belop: 3107000 }, ...ETTER],
    verdi_bra_m2: 135, verdi_m2_pris: 53000, verdi_total: 7155000,
    inkludert: ['Grunnmur inkludert', 'Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Pipe og peisovn', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: ['https://alvsbyhus.no/AdaptiveImages/optimizely/03f982b1-2c90-4a36-bf52-d915a0605b5c/ah_2022_fanny_38g_no.jpg'],
      plantegninger: [],
    },
  },
  // ── ABChus ────────────────────────────────────────────────
  {
    id: 'vindy', grunnmur_inkludert: true, navn: 'Vindy på to plan', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/vindy-pa-to-plan/',
    beskrivelse: 'Kompakt og effektivt toplans hus med tre soverom og to bad – ideelt for mindre tomter. 1. etasje har soverom og bad, 2. etasje stue og kjøkken med utgang til veranda. Grunnmur inkludert.',
    bra_m2: 107, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '79 m²', 'Veranda': 'Ja', 'Grunnmur': 'Inkludert' },
    pris_hus: 3726000, total_budsjett: 6872324,
    kostnader: [...FELLES, { post: 'Vindy på to plan – nøkkelferdig fra ABChus', belop: 3726000 }, ...ETTER],
    verdi_bra_m2: 107, verdi_m2_pris: 53000, verdi_total: 5671000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/vindy-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'noomi', grunnmur_inkludert: true, navn: 'Noomi', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/noomi/',
    beskrivelse: 'Moderne og prisgunstig enebolig i høy kvalitet. Tre soverom, to stuer med integrert kjøkken, to bad og romslig loft. Energimerke A. Grunnmur og Smarthus inkludert.',
    bra_m2: 143, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '92 m²', 'Energimerke': 'A', 'Smarthus': 'Inkludert', 'Grunnmur': 'Inkludert' },
    pris_hus: 4259000, total_budsjett: 7405324,
    kostnader: [...FELLES, { post: 'Noomi – nøkkelferdig fra ABChus', belop: 4259000 }, ...ETTER],
    verdi_bra_m2: 143, verdi_m2_pris: 53000, verdi_total: 7579000,
    inkludert: ['Støpt plate/grunnmur', 'Smarthus', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/noomi-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'lilly', grunnmur_inkludert: true, navn: 'Lilly', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/lilly/',
    beskrivelse: 'Moderne farmhouse med store vindusflater, god takhøyde og smarte løsninger som blander tradisjonell stil med rene, moderne linjer. Leveres med Smarthus og fleksible oppholdsrom.',
    bra_m2: 144, soverom: 4, bad: '2 + WC', etasjer: 2,
    ekstra: { 'BYA': '108 m²', 'Stil': 'Farmhouse', 'Smarthus': 'Inkludert', 'Grunnmur': 'Inkludert' },
    pris_hus: 4799000, total_budsjett: 7945324,
    kostnader: [...FELLES, { post: 'Lilly – nøkkelferdig fra ABChus', belop: 4799000 }, ...ETTER],
    verdi_bra_m2: 144, verdi_m2_pris: 53000, verdi_total: 7632000,
    inkludert: ['Støpt plate/grunnmur', 'Smarthus', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/lilly-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'nelly', grunnmur_inkludert: true, navn: 'Nelly', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/nelly/',
    beskrivelse: 'Praktisk og stilren bolig med åpen kjøkken-/stueløsning, peis, separat vaskerom og store vindusflater. Fem soverom gir rikelig plass til stor familie. Grunnmur inkludert.',
    bra_m2: 171, soverom: 5, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '100 m²', 'Vaskerom': 'Ja', 'Peis': 'Ja', 'Grunnmur': 'Inkludert' },
    pris_hus: 4887000, total_budsjett: 8033324,
    kostnader: [...FELLES, { post: 'Nelly – nøkkelferdig fra ABChus', belop: 4887000 }, ...ETTER],
    verdi_bra_m2: 171, verdi_m2_pris: 53000, verdi_total: 9063000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagte bad', 'Pipe og peisovn', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/nelly-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'arwen-a', grunnmur_inkludert: true, navn: 'Arwen A', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/funkishus/arwen-a-med-utleiedel/',
    beskrivelse: 'Moderne funkis på to etasjer med integrert utleiedel og separat inngang. Tre soverom, tre bad, romslig vaskerom og åpen planløsning. Smarthus som standard. Grunnmur inkludert.',
    bra_m2: 169, soverom: 3, bad: '3', etasjer: 2,
    ekstra: { 'BYA': '101 m²', 'Utleiedel': 'Separat inngang', 'Smarthus': 'Inkludert', 'Grunnmur': 'Inkludert' },
    pris_hus: 5312000, total_budsjett: 8458324,
    kostnader: [...FELLES, { post: 'Arwen A med utleiedel – nøkkelferdig fra ABChus', belop: 5312000 }, ...ETTER],
    verdi_bra_m2: 169, verdi_m2_pris: 53000, verdi_total: 8957000,
    inkludert: ['Støpt plate/grunnmur', 'Smarthus', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/arwen-a-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  {
    id: 'nevie', grunnmur_inkludert: true, navn: 'Nevie 2', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/nevie-2/',
    beskrivelse: 'Moderne langstrakt bolig på to fulle etasjer med tre soverom og utleiedel med separat inngang. Godt egnet for flat tomt. Energimerke B. Grunnmur inkludert fra ABChus.',
    bra_m2: 179, soverom: 3, bad: '3', etasjer: 2,
    ekstra: { 'BYA': '117 m²', 'Utleiedel': 'Separat inngang', 'Energimerke': 'B', 'Grunnmur': 'Inkludert' },
    pris_hus: 5412000, total_budsjett: 8558324,
    kostnader: [...FELLES, { post: 'Nevie 2 – nøkkelferdig fra ABChus', belop: 5412000 }, ...ETTER],
    verdi_bra_m2: 179, verdi_m2_pris: 53000, verdi_total: 9487000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/nevie-fasade-1.jpg`],
      plantegninger: [],
    },
  },
  // ── Mesterhus ─────────────────────────────────────────────
  {
    id: 'nordstrand-flat', grunnmur_inkludert: true, navn: 'Nordstrand', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/nordstrand-for-flat-tomt',
    beskrivelse: 'Stilfull bolig med ekstraordinær takhøyde opp til fire meter. Åpen og luftig atmosfære med flere uteplasser. Spesielt tilpasset flat tomt. Grunnmur og plate inkludert.',
    bra_m2: 158, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '96 m²', 'Takhøyde': 'Opp til 4 m', 'Tomtetype': 'Flat tomt' },
    pris_hus: 5020000, total_budsjett: 8166324,
    kostnader: [...FELLES, { post: 'Nordstrand – nøkkelferdig fra Mesterhus', belop: 5020000 }, ...ETTER],
    verdi_bra_m2: 158, verdi_m2_pris: 53000, verdi_total: 8374000,
    inkludert: ['Støpt plate/grunnmur', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/nordstrand-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/nordstrand-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/nordstrand-plan-2etg.jpg`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'skansen', grunnmur_inkludert: true, navn: 'Skansen', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/skansen-moderne-hus-for-flat-tomt',
    beskrivelse: 'Kåret til Norges favoritthus. Moderne arkitektur med pulttak og stående trekledning. Fire soverom, to bad og gjennomtenkt planløsning for flat tomt. Grunnmur inkludert.',
    bra_m2: 148, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '101 m²', 'Utmerkelse': 'Norges favoritthus', 'Taktype': 'Pulttak' },
    pris_hus: 5590000, total_budsjett: 8736324,
    kostnader: [...FELLES, { post: 'Skansen – nøkkelferdig fra Mesterhus', belop: 5590000 }, ...ETTER],
    verdi_bra_m2: 148, verdi_m2_pris: 53000, verdi_total: 7844000,
    inkludert: ['Støpt plate/grunnmur', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/skansen-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/skansen-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/skansen-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'drobak', grunnmur_inkludert: true, navn: 'Drøbak', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/drobak-moderne-hus',
    beskrivelse: 'Moderne hus med særegen fasade av stående trekledning og store vinduer. Kombinerer vertikale og horisontale elementer for særpreget arkitektur. Fire soverom, to bad. Grunnmur inkludert.',
    bra_m2: 179, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '120 m²', 'Mål': '13,9 m × 10,0 m', 'Stil': 'Moderne' },
    pris_hus: 5760000, total_budsjett: 8906324,
    kostnader: [...FELLES, { post: 'Drøbak – nøkkelferdig fra Mesterhus', belop: 5760000 }, ...ETTER],
    verdi_bra_m2: 179, verdi_m2_pris: 53000, verdi_total: 9487000,
    inkludert: ['Støpt plate/grunnmur', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/drobak-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/drobak-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/drobak-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  // ── Nordbohus (nye) ───────────────────────────────────────
  {
    id: 'festlig', grunnmur_inkludert: true, navn: 'Festlig', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/festlig',
    beskrivelse: 'Unikt énplans hus delt i tre volumer med tak som stiger mot øst og vest. Dynamisk og moderne estetikk – perfekt for par, enslige og små familier. Kompakt og stilfull.',
    bra_m2: 108, soverom: 2, bad: '2', etasjer: 1,
    ekstra: { 'BYA': '122 m²', 'Etasjer': '1 plan', 'Konsept': 'Tre volumer' },
    pris_hus: 4402000, total_budsjett: 7548324,
    kostnader: [...FELLES, { post: 'Festlig – nøkkelferdig fra Nordbohus', belop: 4402000 }, ...ETTER],
    verdi_bra_m2: 108, verdi_m2_pris: 53000, verdi_total: 5724000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/festlig-fasade-1.webp`],
      plantegninger: [
        { url: `${IMG}/festlig-plan-1etg.webp`, label: 'Planløsning' },
      ],
    },
  },
  {
    id: 'bias', grunnmur_inkludert: true, navn: 'Bias', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/bias',
    beskrivelse: 'Perfekt balanse mellom klassisk arkitektur og moderne trekk. Åpen kjøkkenløsning, franske balkonger og naturlig lys gjennom hele boligen. Tre soverom. Grunnmur inkludert.',
    bra_m2: 145, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '107 m²', 'Balkong': 'Franske balkonger', 'Mål': '11,2 m × 9,7 m' },
    pris_hus: 5136000, total_budsjett: 8282324,
    kostnader: [...FELLES, { post: 'Bias – nøkkelferdig fra Nordbohus', belop: 5136000 }, ...ETTER],
    verdi_bra_m2: 145, verdi_m2_pris: 53000, verdi_total: 7685000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/bias-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/bias-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/bias-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'komplett', grunnmur_inkludert: true, navn: 'Komplett', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/komplett',
    beskrivelse: 'Moderne enebolig med elegant design og smart planløsning. Store vinduer og rikelig naturlig lys. Soverom på bakkeplan og åpen stue/kjøkken i 2. etasje. Grunnmur inkludert.',
    bra_m2: 149, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '103 m²', 'Stue/kjøkken': '2. etasje', 'Lys': 'Maksimalt naturlig lys' },
    pris_hus: 5254000, total_budsjett: 8400324,
    kostnader: [...FELLES, { post: 'Komplett – nøkkelferdig fra Nordbohus', belop: 5254000 }, ...ETTER],
    verdi_bra_m2: 149, verdi_m2_pris: 53000, verdi_total: 7897000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/komplett-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/komplett-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/komplett-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'atlas', grunnmur_inkludert: true, navn: 'Atlas', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/atlas',
    beskrivelse: 'Toplans enebolig med unik arkitektonisk utforming som vektlegger romlighet og naturlig lys. Sportsbod og overbygget carportinngang. Fire soverom. Grunnmur inkludert.',
    bra_m2: 159, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '144 m²', 'Mål': '11,8 m × 8,2 m', 'Carport': 'Overbygget' },
    pris_hus: 5722000, total_budsjett: 8868324,
    kostnader: [...FELLES, { post: 'Atlas – nøkkelferdig fra Nordbohus', belop: 5722000 }, ...ETTER],
    verdi_bra_m2: 159, verdi_m2_pris: 53000, verdi_total: 8427000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/atlas-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/atlas-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/atlas-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'kuba', grunnmur_inkludert: true, navn: 'Kuba', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/kuba',
    beskrivelse: 'Funksjonalistisk bolig med rene linjer og praktiske løsninger. Lyse oppholdsrom og innglasset takterrasse – perfekt til sosialt samvær. Tre soverom. Grunnmur inkludert.',
    bra_m2: 161, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '119 m²', 'Takterrasse': 'Innglasset', 'Mål': '13,4 m × 9,2 m' },
    pris_hus: 6331000, total_budsjett: 9477324,
    kostnader: [...FELLES, { post: 'Kuba – nøkkelferdig fra Nordbohus', belop: 6331000 }, ...ETTER],
    verdi_bra_m2: 161, verdi_m2_pris: 53000, verdi_total: 8533000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/kuba-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/kuba-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/kuba-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'astro', grunnmur_inkludert: true, navn: 'Astro', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/astro',
    beskrivelse: 'Praktisk enebolig som kombinerer klassisk og moderne design. Romslige soverom, rikelig lagerplass og behagelige utearealer med høy takhøyde og mye naturlig lys. Grunnmur inkludert.',
    bra_m2: 160, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '116 m²', 'Takhøyde': 'Høy' },
    pris_hus: 6458000, total_budsjett: 9604324,
    kostnader: [...FELLES, { post: 'Astro – nøkkelferdig fra Nordbohus', belop: 6458000 }, ...ETTER],
    verdi_bra_m2: 160, verdi_m2_pris: 53000, verdi_total: 8480000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/astro-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/astro-plan-1etg.webp`, label: 'Kjellerplan' },
        { url: `${IMG}/astro-plan-2etg.webp`, label: '1. etasje' },
      ],
    },
  },
  {
    id: 'alltid', grunnmur_inkludert: true, navn: 'All-tid', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/all-tid',
    beskrivelse: 'Fleksibel familiebolig som rommer enten fire soverom med hybel/utleieenhet, eller åpent kjøkken-/stueområde med takterrasse over carporten. Fem soverom totalt. Grunnmur inkludert.',
    bra_m2: 201, soverom: 5, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '148 m²', 'Utleiedel': 'Hybel', 'Takterrasse': 'Over carport' },
    pris_hus: 7669000, total_budsjett: 10815324,
    kostnader: [...FELLES, { post: 'All-tid – nøkkelferdig fra Nordbohus', belop: 7669000 }, ...ETTER],
    verdi_bra_m2: 201, verdi_m2_pris: 53000, verdi_total: 10653000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [`${IMG}/alltid-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/alltid-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/alltid-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  // ── Systemhus ─────────────────────────────────────────────
  {
    id: 'oslo', grunnmur_inkludert: true, navn: 'Oslo', leverandor: 'Systemhus',
    leverandor_url: 'https://www.systemhus.no/hus/oslo',
    beskrivelse: 'Kompakt og plasseffektiv moderne bolig med smarte romløsninger. Godt egnet for små tomter i by- og tettstedsområder. Skandinavisk design. Grunnmur og støpt plate inkludert.',
    bra_m2: 110, soverom: 3, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '70 m²', 'Stil': 'Skandinavisk', 'Tomtetype': 'Liten tomt' },
    pris_hus: 5140000, total_budsjett: 8286324,
    kostnader: [...FELLES, { post: 'Oslo – nøkkelferdig fra Systemhus', belop: 5140000 }, ...ETTER],
    verdi_bra_m2: 110, verdi_m2_pris: 53000, verdi_total: 5830000,
    inkludert: ['Støpt plate og grunnmur', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/oslo-fasade-1.webp`],
      plantegninger: [
        { url: `${IMG}/oslo-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/oslo-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'trend', grunnmur_inkludert: true, navn: 'Trend', leverandor: 'Systemhus',
    leverandor_url: 'https://www.systemhus.no/hus/enebolig-trend',
    beskrivelse: 'Moderne og funksjonell enebolig med rent Skandinavisk design og sadeltak. Stort åpent stue-/kjøkkenrom i øverste etasje. Tre soverom. Grunnmur og støpt plate inkludert.',
    bra_m2: 141, soverom: 3, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '106 m²', 'Taktype': 'Sadeltak', 'Stue/kjøkken': 'Øverste etasje' },
    pris_hus: 5380000, total_budsjett: 8526324,
    kostnader: [...FELLES, { post: 'Trend – nøkkelferdig fra Systemhus', belop: 5380000 }, ...ETTER],
    verdi_bra_m2: 141, verdi_m2_pris: 53000, verdi_total: 7473000,
    inkludert: ['Støpt plate og grunnmur', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/trend-fasade-1.webp`],
      plantegninger: [
        { url: `${IMG}/trend-plan-1etg.webp`, label: '1. etasje' },
        { url: `${IMG}/trend-plan-2etg.webp`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'selvik', grunnmur_inkludert: true, navn: 'Selvik', leverandor: 'Systemhus',
    leverandor_url: 'https://www.systemhus.no/hus/enebolig-selvik',
    beskrivelse: 'Tradisjonell enebolig som blander moderne detaljer med klassisk byggeskikk. Effektive planløsninger, godt naturlig lys og romslige innvendige arealer. Fire soverom. Grunnmur inkludert.',
    bra_m2: 165, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '106 m²', 'Stil': 'Tradisjonell/moderne' },
    pris_hus: 5830000, total_budsjett: 8976324,
    kostnader: [...FELLES, { post: 'Selvik – nøkkelferdig fra Systemhus', belop: 5830000 }, ...ETTER],
    verdi_bra_m2: 165, verdi_m2_pris: 53000, verdi_total: 8745000,
    inkludert: ['Støpt plate og grunnmur', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/selvik-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/selvik-plan-1etg.webp`, label: '1. etasje' },
      ],
    },
  },
  // ── Hedalm-Anebyhus (grunnmur IKKE inkludert) ─────────────
  {
    id: 'apollis', grunnmur_inkludert: false, navn: 'Apollis', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/boliger/apollis/',
    beskrivelse: 'Moderne 2-planshus med carport og stor balkong. Tre soverom på bakkeplan, åpen stue/kjøkken med stor balkong i 2. etasje. OBS: Grunnmur/fundamentering ikke inkludert i husmodellprisen.',
    bra_m2: 137, soverom: 3, bad: '1 + WC', etasjer: 2,
    ekstra: { 'BYA': '95 m²', 'Balkong': 'Stor 2. etasje', 'Carport': 'Inkludert' },
    pris_hus: 3298000, total_budsjett: 6444324,
    kostnader: [...FELLES, { post: 'Apollis – nøkkelferdig fra Hedalm-Anebyhus', belop: 3298000 }, { post: 'Grunnmur/fundamentering (estimat)', belop: 250000 }, ...ETTER],
    verdi_bra_m2: 137, verdi_m2_pris: 53000, verdi_total: 7261000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/apollis-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/apollis-plan-1etg.jpg`, label: 'Plantegning' },
      ],
    },
  },
  {
    id: 'frankis', grunnmur_inkludert: false, navn: 'Frankis', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/frankis/',
    beskrivelse: 'Familievennlig 2-planshus med stor vinkelstue og romslige soverom. Effektiv planløsning ideell for familier med barn. Fire soverom. OBS: Grunnmur ikke inkludert i husmodellprisen.',
    bra_m2: 146, soverom: 4, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '88 m²', 'Stue': 'Vinkelstue' },
    pris_hus: 3908000, total_budsjett: 7054324,
    kostnader: [...FELLES, { post: 'Frankis – nøkkelferdig fra Hedalm-Anebyhus', belop: 3908000 }, { post: 'Grunnmur/fundamentering (estimat)', belop: 250000 }, ...ETTER],
    verdi_bra_m2: 146, verdi_m2_pris: 53000, verdi_total: 7738000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/frankis-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/frankis-plan-1etg.jpg`, label: 'Plantegning' },
      ],
    },
  },
  {
    id: 'ronningen', grunnmur_inkludert: false, navn: 'Rønningen', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/ronningen/',
    beskrivelse: 'Passe stort og funksjonelt trehus over to etasjer. Åpent kjøkken, romslig gang, innvendig bod og loftstue. Fire soverom. God hverdagsfunksjonalitet. Grunnmur ikke inkludert i prisen.',
    bra_m2: 150, soverom: 4, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '91 m²', 'Loftstue': 'Ja' },
    pris_hus: 4098000, total_budsjett: 7244324,
    kostnader: [...FELLES, { post: 'Rønningen – nøkkelferdig fra Hedalm-Anebyhus', belop: 4098000 }, { post: 'Grunnmur/fundamentering (estimat)', belop: 250000 }, ...ETTER],
    verdi_bra_m2: 150, verdi_m2_pris: 53000, verdi_total: 7950000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/ronningen-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/ronningen-plan-1etg.jpg`, label: 'Plantegning' },
      ],
    },
  },
  {
    id: 'lyris', grunnmur_inkludert: false, navn: 'Lyris', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/lyris/',
    beskrivelse: 'Funksjonelt hus for både stor og liten familie. Åpen kjøkken-/stueløsning, vaskerom og kott på bakkeplan, loftstue i overetasjen. Fire soverom. Grunnmur ikke inkludert i prisen.',
    bra_m2: 155, soverom: 4, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '88 m²', 'Loftstue': 'Ja', 'Vaskerom': 'Ja' },
    pris_hus: 4258000, total_budsjett: 7404324,
    kostnader: [...FELLES, { post: 'Lyris – nøkkelferdig fra Hedalm-Anebyhus', belop: 4258000 }, { post: 'Grunnmur/fundamentering (estimat)', belop: 250000 }, ...ETTER],
    verdi_bra_m2: 155, verdi_m2_pris: 53000, verdi_total: 8215000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [`${IMG}/lyris-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/lyris-plan-1etg.jpg`, label: 'Plantegning' },
      ],
    },
  },
]

const TOMT = {
  adresse: 'Gamle Dalsveg 16 A',
  poststed: 'Maura',
  kommune: 'Nannestad',
  areal_m2: 564,
  gnr: 148, bnr: 166,
  senterpunkt: { lat: 60.24963, lng: 11.02455 },

  regulering: {
    arealformaal: 'Boligbebyggelse – frittliggende småhusbebyggelse',
    utnyttelsesgrad_bya: 30,
    maks_hoyde_m: 9,
    maks_etasjer: 2,
    byggegrense_m: 4,
    hensynssoner: [] as { type: string; beskrivelse: string; konsekvens: 'lav' | 'medium' | 'hoy' }[],
    bestemmelser: [
      'Fradeling vedtatt av Nannestad kommune',
      'Kommuneplanens arealdel 2024–2040',
      'VA-tilknytning bekreftet (vann + avløp)',
      'Avkjøringstillatelse foreligger',
      'Geoteknisk rapport utarbeidet',
      'Delt innkjørsel med naboeiendom',
    ],
    plannavn: 'Kommuneplanens arealdel – Nannestad 2024–2040',
  },

  risikoanalyse: {
    total_risiko: 'lav' as const,
    faktorer: [
      { kategori: 'Regulering', beskrivelse: 'Fradeling vedtatt – boligformål bekreftet', sannsynlighet: 1, konsekvens: 1, risikoverdi: 1, tiltak: 'Vedtak foreligger' },
      { kategori: 'Kvikkleire', beskrivelse: 'Aktsomhetsområde kartlagt – geoteknisk rapport utarbeidet', sannsynlighet: 2, konsekvens: 3, risikoverdi: 6, tiltak: 'Geoteknisk rapport OK – stabil grunn bekreftet' },
      { kategori: 'Flom', beskrivelse: 'Temakart flom vurdert', sannsynlighet: 1, konsekvens: 2, risikoverdi: 2, tiltak: 'Tomten utenfor flomsone' },
      { kategori: 'VA-tilknytning', beskrivelse: 'Kommunalt VA bekreftet', sannsynlighet: 1, konsekvens: 1, risikoverdi: 1, tiltak: 'Tilkoblingspunkter avklart' },
      { kategori: 'Adkomst', beskrivelse: 'Avkjøringstillatelse fra Gamle Dalsveg', sannsynlighet: 1, konsekvens: 1, risikoverdi: 1, tiltak: 'Tillatelse foreligger' },
    ],
    anbefalinger: [
      'Fradeling er vedtatt – lav reguleringsrisiko',
      'Geoteknisk rapport bekrefter stabil grunn til tross for kvikkleire-aktsomhetsområde',
      'De fleste husleverandørene (5 av 7) inkluderer grunnmur i husmodellprisen',
      'Kommunalt VA bekreftet med kjente tilkoblingskostnader (98 824 kr)',
      'Avkjøringstillatelse fra Gamle Dalsveg 16 A foreligger – delt innkjørsel med naboeiendom',
    ],
  },

  nabolag: {
    beskrivelse: 'Etablert boligområde i Maura, Nannestad kommune. Ca. 12 min til Jessheim og E6. Kort vei til barnehage, skole og dagligvare.',
    punkter: [
      { kategori: 'Kollektivtransport', navn: 'Buss mot Jessheim/Oslo', avstand_m: 400, gangminutter: 5 },
      { kategori: 'Skole', navn: 'Maura skole', avstand_m: 700, gangminutter: 9 },
      { kategori: 'Dagligvare', navn: 'Dagligvare Maura', avstand_m: 600, gangminutter: 8 },
      { kategori: 'Park/friområde', navn: 'Skog og turområder', avstand_m: 200, gangminutter: 3 },
    ],
  },

  dokumenter: [
    { navn: 'Situasjonsplan', url: '/documents/gamle-dalsveg-16/situasjonsplan.pdf' },
    { navn: 'Vedtak om fradeling', url: '/documents/gamle-dalsveg-16/vedtak-fradeling.pdf' },
    { navn: 'Geoteknisk rapport', url: '/documents/gamle-dalsveg-16/geoteknisk-rapport.pdf' },
    { navn: 'VA-kart', url: '/documents/gamle-dalsveg-16/va-kart.pdf' },
    { navn: 'DOK-analyse (naturfare/grunnforhold)', url: '/documents/gamle-dalsveg-16/dok-analyse.pdf' },
  ],
}

const TIDSPLAN = [
  { tid: 'Uke 1', tittel: 'Kjøp av tomt', beskrivelse: 'Avtale signeres. Overtakelse etter nærmere avtale.' },
  { tid: 'Uke 2–3', tittel: 'Velg husmodell', beskrivelse: 'Gjennomgang av husmodeller med Tomtly. Kontakt med Nordbohus eller Norgeshus.' },
  { tid: 'Uke 3–4', tittel: 'Tegning og søknad', beskrivelse: 'Tegnebua utarbeider tegninger og sender byggesøknad til Nannestad kommune.' },
  { tid: 'Uke 4–6', tittel: 'Nabovarsling', beskrivelse: 'Naboer varsles. 14 dagers varslingsfrist. Eventuelle merknader behandles.' },
  { tid: 'Uke 6–20', tittel: 'Saksbehandling', beskrivelse: 'Kommunal behandling. Typisk 8–12 uker i Nannestad. Tillatelse innvilges.' },
  { tid: 'Uke 20–30', tittel: 'Produksjon starter', beskrivelse: 'Husleverandør starter produksjon. Grunnarbeider forberedes og utføres.' },
  { tid: 'Uke 30–52', tittel: 'Bygging og innflytting', beskrivelse: 'Huset monteres og ferdigstilles. Fra kjøp til nøkkel ca. 12 måneder.' },
]

export default function GamleDalsveg16() {
  return (
    <div className="bg-white">
      <TomtHero adresse={TOMT.adresse} poststed={TOMT.poststed} kommune={TOMT.kommune} areal_m2={TOMT.areal_m2} gnr={TOMT.gnr} bnr={TOMT.bnr} bakgrunnsbilde="/tomter/gamle-dalsveg-16/perla-norgeshus-visualisering.png" />

      <TomtSammendrag
        adresse="Gamle Dalsveg 16 A"
        kommune="Nannestad"
        pris={2300000}
        areal_m2={564}
        antall_husmodeller={34}
        laveste_budsjett={6240324}
        hoyeste_budsjett={10815324}
        anbefaling="Gamle Dalsveg 16 A i Maura er en fradelt boligtomt med avklart infrastruktur og lav gjennomføringsrisiko. Med 34 husmodeller fra 7 leverandører – og alle med grunnmur inkludert hos de fleste – er dette et sjeldent bredt utvalg for en enkelt tomt. Nærheten til Jessheim (5 min) og Oslo via E6 gjør eiendommen attraktiv for barnefamilier og pendlere."
        fordeler={[
          'Fradeling vedtatt av Nannestad kommune',
          'Kommunalt VA tilgjengelig – tilkoblingskostnad kjent (98 824 kr)',
          'Geoteknisk rapport utarbeidet – stabil grunn bekreftet',
          '34 husmodeller fra 7 leverandører – grunnmur inkl. hos de fleste',
          '12 min til Jessheim, 30 min til Oslo via E6',
          'Pris: 2,3 MNOK – laveste inngangstomt i Romerike-regionen',
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
            <section id="husmodeller"><TomtHusmodeller modeller={HUSMODELLER as any} tomtType="flat" tomtNavn="Gamle Dalsveg 16 A" /></section>
            <section id="bilder"><TomtBildegalleri bilder={BILDER} adresse={TOMT.adresse} /></section>
            <section id="tegnebua"><TomtTegnebua valgte_husmodeller={1} /></section>

            <section id="tidsplan">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Tidsplan</h2>
              <p className="text-brand-600 mb-6">Fra tomtekjøp til innflytting – estimert ca. 12 måneder.</p>
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

            <TomtSammendrag
              adresse="Gamle Dalsveg 16 A"
              kommune="Nannestad"
              pris={2300000}
              areal_m2={564}
              antall_husmodeller={34}
              laveste_budsjett={6240324}
              hoyeste_budsjett={10815324}
              anbefaling="Gamle Dalsveg 16 A i Maura er en fradelt boligtomt med avklart infrastruktur og lav gjennomføringsrisiko. Med 34 husmodeller fra 7 leverandører – og alle med grunnmur inkludert hos de fleste – er dette et sjeldent bredt utvalg for en enkelt tomt. Nærheten til Jessheim (5 min) og Oslo via E6 gjør eiendommen attraktiv for barnefamilier og pendlere."
              fordeler={[
                'Fradeling vedtatt av Nannestad kommune',
                'Kommunalt VA tilgjengelig – tilkoblingskostnad kjent (98 824 kr)',
                'Geoteknisk rapport utarbeidet – stabil grunn bekreftet',
                '34 husmodeller fra 7 leverandører – grunnmur inkl. hos de fleste',
                '12 min til Jessheim, 30 min til Oslo via E6',
                'Pris: 2,3 MNOK – laveste inngangstomt i Romerike-regionen',
              ]}
            />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-36 space-y-6">
              <TomtKart lat={TOMT.senterpunkt.lat} lng={TOMT.senterpunkt.lng} adresse="Gamle Dalsveg 16 A, 2032 Maura" zoom={17} />
              <TomtKontakt />
              <TomtDeling adresse={TOMT.adresse} tomteId="gamle-dalsveg-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
