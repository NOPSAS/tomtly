import { readFileSync, writeFileSync } from 'fs'

const pagePath = 'src/app/tomter/gamle-dalsveg-16/page.tsx'
let src = readFileSync(pagePath, 'utf8')

const IMG = '/tomter/gamle-dalsveg-16'

// Base overhead: FELLES (2 357 500) + ETTER (788 824) = 3 146 324
const B = 3146324

const NYE_MODELLER = `
  // ── Älvsbyhus ─────────────────────────────────────────────
  {
    id: 'ase', grunnmur_inkludert: true, navn: 'Åse', leverandor: 'Älvsbyhus',
    leverandor_url: 'https://www.alvsbyhus.no/vare-hus/1.5-etasjes-hus/ase/',
    beskrivelse: '1,5-etasjes hus for tomter med utsikt. Integrert kjøkken og stue strekker seg over hele lengden med opptil seks vinduer og glassdør for panoramautsikt. Grunnmur inkludert i prisen.',
    bra_m2: 135, soverom: 3, bad: '1', etasjer: 1.5,
    ekstra: { 'BYA': '128 m²', 'Takvinkel': '38° eller 34°', 'Grunnmur': 'Inkludert' },
    pris_hus: 3094000, total_budsjett: ${3094000 + B},
    kostnader: [...FELLES, { post: 'Åse – nøkkelferdig fra Älvsbyhus', belop: 3094000 }, ...ETTER],
    verdi_bra_m2: 135, verdi_m2_pris: 50000, verdi_total: 6750000,
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
    pris_hus: 3094000, total_budsjett: ${3094000 + B},
    kostnader: [...FELLES, { post: 'Astrid – nøkkelferdig fra Älvsbyhus', belop: 3094000 }, ...ETTER],
    verdi_bra_m2: 135, verdi_m2_pris: 50000, verdi_total: 6750000,
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
    pris_hus: 3107000, total_budsjett: ${3107000 + B},
    kostnader: [...FELLES, { post: 'Fanny – nøkkelferdig fra Älvsbyhus', belop: 3107000 }, ...ETTER],
    verdi_bra_m2: 135, verdi_m2_pris: 50000, verdi_total: 6750000,
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
    pris_hus: 3726000, total_budsjett: ${3726000 + B},
    kostnader: [...FELLES, { post: 'Vindy på to plan – nøkkelferdig fra ABChus', belop: 3726000 }, ...ETTER],
    verdi_bra_m2: 107, verdi_m2_pris: 50000, verdi_total: 5350000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/vindy-fasade-1.jpg\`],
      plantegninger: [],
    },
  },
  {
    id: 'noomi', grunnmur_inkludert: true, navn: 'Noomi', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/noomi/',
    beskrivelse: 'Moderne og prisgunstig enebolig i høy kvalitet. Tre soverom, to stuer med integrert kjøkken, to bad og romslig loft. Energimerke A. Grunnmur og Smarthus inkludert.',
    bra_m2: 143, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '92 m²', 'Energimerke': 'A', 'Smarthus': 'Inkludert', 'Grunnmur': 'Inkludert' },
    pris_hus: 4259000, total_budsjett: ${4259000 + B},
    kostnader: [...FELLES, { post: 'Noomi – nøkkelferdig fra ABChus', belop: 4259000 }, ...ETTER],
    verdi_bra_m2: 143, verdi_m2_pris: 50000, verdi_total: 7150000,
    inkludert: ['Støpt plate/grunnmur', 'Smarthus', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/noomi-fasade-1.jpg\`],
      plantegninger: [],
    },
  },
  {
    id: 'lilly', grunnmur_inkludert: true, navn: 'Lilly', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/lilly/',
    beskrivelse: 'Moderne farmhouse med store vindusflater, god takhøyde og smarte løsninger som blander tradisjonell stil med rene, moderne linjer. Leveres med Smarthus og fleksible oppholdsrom.',
    bra_m2: 144, soverom: 4, bad: '2 + WC', etasjer: 2,
    ekstra: { 'BYA': '108 m²', 'Stil': 'Farmhouse', 'Smarthus': 'Inkludert', 'Grunnmur': 'Inkludert' },
    pris_hus: 4799000, total_budsjett: ${4799000 + B},
    kostnader: [...FELLES, { post: 'Lilly – nøkkelferdig fra ABChus', belop: 4799000 }, ...ETTER],
    verdi_bra_m2: 144, verdi_m2_pris: 50000, verdi_total: 7200000,
    inkludert: ['Støpt plate/grunnmur', 'Smarthus', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/lilly-fasade-1.jpg\`],
      plantegninger: [],
    },
  },
  {
    id: 'nelly', grunnmur_inkludert: true, navn: 'Nelly', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/nelly/',
    beskrivelse: 'Praktisk og stilren bolig med åpen kjøkken-/stueløsning, peis, separat vaskerom og store vindusflater. Fem soverom gir rikelig plass til stor familie. Grunnmur inkludert.',
    bra_m2: 171, soverom: 5, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '100 m²', 'Vaskerom': 'Ja', 'Peis': 'Ja', 'Grunnmur': 'Inkludert' },
    pris_hus: 4887000, total_budsjett: ${4887000 + B},
    kostnader: [...FELLES, { post: 'Nelly – nøkkelferdig fra ABChus', belop: 4887000 }, ...ETTER],
    verdi_bra_m2: 171, verdi_m2_pris: 50000, verdi_total: 8550000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagte bad', 'Pipe og peisovn', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/nelly-fasade-1.jpg\`],
      plantegninger: [],
    },
  },
  {
    id: 'arwen-a', grunnmur_inkludert: true, navn: 'Arwen A', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/funkishus/arwen-a-med-utleiedel/',
    beskrivelse: 'Moderne funkis på to etasjer med integrert utleiedel og separat inngang. Tre soverom, tre bad, romslig vaskerom og åpen planløsning. Smarthus som standard. Grunnmur inkludert.',
    bra_m2: 169, soverom: 3, bad: '3', etasjer: 2,
    ekstra: { 'BYA': '101 m²', 'Utleiedel': 'Separat inngang', 'Smarthus': 'Inkludert', 'Grunnmur': 'Inkludert' },
    pris_hus: 5312000, total_budsjett: ${5312000 + B},
    kostnader: [...FELLES, { post: 'Arwen A med utleiedel – nøkkelferdig fra ABChus', belop: 5312000 }, ...ETTER],
    verdi_bra_m2: 169, verdi_m2_pris: 50000, verdi_total: 8450000,
    inkludert: ['Støpt plate/grunnmur', 'Smarthus', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/arwen-a-fasade-1.jpg\`],
      plantegninger: [],
    },
  },
  {
    id: 'nevie', grunnmur_inkludert: true, navn: 'Nevie 2', leverandor: 'ABChus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/nevie-2/',
    beskrivelse: 'Moderne langstrakt bolig på to fulle etasjer med tre soverom og utleiedel med separat inngang. Godt egnet for flat tomt. Energimerke B. Grunnmur inkludert fra ABChus.',
    bra_m2: 179, soverom: 3, bad: '3', etasjer: 2,
    ekstra: { 'BYA': '117 m²', 'Utleiedel': 'Separat inngang', 'Energimerke': 'B', 'Grunnmur': 'Inkludert' },
    pris_hus: 5412000, total_budsjett: ${5412000 + B},
    kostnader: [...FELLES, { post: 'Nevie 2 – nøkkelferdig fra ABChus', belop: 5412000 }, ...ETTER],
    verdi_bra_m2: 179, verdi_m2_pris: 50000, verdi_total: 8950000,
    inkludert: ['Støpt plate/grunnmur', 'Parkett', 'Flislagte bad', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/nevie-fasade-1.jpg\`],
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
    pris_hus: 5020000, total_budsjett: ${5020000 + B},
    kostnader: [...FELLES, { post: 'Nordstrand – nøkkelferdig fra Mesterhus', belop: 5020000 }, ...ETTER],
    verdi_bra_m2: 158, verdi_m2_pris: 50000, verdi_total: 7900000,
    inkludert: ['Støpt plate/grunnmur', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/nordstrand-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/nordstrand-plan-1etg.jpg\`, label: '1. etasje' },
        { url: \`\${IMG}/nordstrand-plan-2etg.jpg\`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'skansen', grunnmur_inkludert: true, navn: 'Skansen', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/skansen-moderne-hus-for-flat-tomt',
    beskrivelse: 'Kåret til Norges favoritthus. Moderne arkitektur med pulttak og stående trekledning. Fire soverom, to bad og gjennomtenkt planløsning for flat tomt. Grunnmur inkludert.',
    bra_m2: 148, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '101 m²', 'Utmerkelse': 'Norges favoritthus', 'Taktype': 'Pulttak' },
    pris_hus: 5590000, total_budsjett: ${5590000 + B},
    kostnader: [...FELLES, { post: 'Skansen – nøkkelferdig fra Mesterhus', belop: 5590000 }, ...ETTER],
    verdi_bra_m2: 148, verdi_m2_pris: 50000, verdi_total: 7400000,
    inkludert: ['Støpt plate/grunnmur', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/skansen-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/skansen-plan-1etg.webp\`, label: '1. etasje' },
        { url: \`\${IMG}/skansen-plan-2etg.webp\`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'drobak', grunnmur_inkludert: true, navn: 'Drøbak', leverandor: 'Mesterhus',
    leverandor_url: 'https://www.mesterhus.no/hus/drobak-moderne-hus',
    beskrivelse: 'Moderne hus med særegen fasade av stående trekledning og store vinduer. Kombinerer vertikale og horisontale elementer for særpreget arkitektur. Fire soverom, to bad. Grunnmur inkludert.',
    bra_m2: 179, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '120 m²', 'Mål': '13,9 m × 10,0 m', 'Stil': 'Moderne' },
    pris_hus: 5760000, total_budsjett: ${5760000 + B},
    kostnader: [...FELLES, { post: 'Drøbak – nøkkelferdig fra Mesterhus', belop: 5760000 }, ...ETTER],
    verdi_bra_m2: 179, verdi_m2_pris: 50000, verdi_total: 8950000,
    inkludert: ['Støpt plate/grunnmur', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/drobak-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/drobak-plan-1etg.webp\`, label: '1. etasje' },
        { url: \`\${IMG}/drobak-plan-2etg.webp\`, label: '2. etasje' },
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
    pris_hus: 4402000, total_budsjett: ${4402000 + B},
    kostnader: [...FELLES, { post: 'Festlig – nøkkelferdig fra Nordbohus', belop: 4402000 }, ...ETTER],
    verdi_bra_m2: 108, verdi_m2_pris: 50000, verdi_total: 5400000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/festlig-fasade-1.webp\`],
      plantegninger: [
        { url: \`\${IMG}/festlig-plan-1etg.webp\`, label: 'Planløsning' },
      ],
    },
  },
  {
    id: 'bias', grunnmur_inkludert: true, navn: 'Bias', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/bias',
    beskrivelse: 'Perfekt balanse mellom klassisk arkitektur og moderne trekk. Åpen kjøkkenløsning, franske balkonger og naturlig lys gjennom hele boligen. Tre soverom. Grunnmur inkludert.',
    bra_m2: 145, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '107 m²', 'Balkong': 'Franske balkonger', 'Mål': '11,2 m × 9,7 m' },
    pris_hus: 5136000, total_budsjett: ${5136000 + B},
    kostnader: [...FELLES, { post: 'Bias – nøkkelferdig fra Nordbohus', belop: 5136000 }, ...ETTER],
    verdi_bra_m2: 145, verdi_m2_pris: 50000, verdi_total: 7250000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/bias-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/bias-plan-1etg.webp\`, label: '1. etasje' },
        { url: \`\${IMG}/bias-plan-2etg.webp\`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'komplett', grunnmur_inkludert: true, navn: 'Komplett', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/komplett',
    beskrivelse: 'Moderne enebolig med elegant design og smart planløsning. Store vinduer og rikelig naturlig lys. Soverom på bakkeplan og åpen stue/kjøkken i 2. etasje. Grunnmur inkludert.',
    bra_m2: 149, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '103 m²', 'Stue/kjøkken': '2. etasje', 'Lys': 'Maksimalt naturlig lys' },
    pris_hus: 5254000, total_budsjett: ${5254000 + B},
    kostnader: [...FELLES, { post: 'Komplett – nøkkelferdig fra Nordbohus', belop: 5254000 }, ...ETTER],
    verdi_bra_m2: 149, verdi_m2_pris: 50000, verdi_total: 7450000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/komplett-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/komplett-plan-1etg.webp\`, label: '1. etasje' },
        { url: \`\${IMG}/komplett-plan-2etg.webp\`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'atlas', grunnmur_inkludert: true, navn: 'Atlas', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/atlas',
    beskrivelse: 'Toplans enebolig med unik arkitektonisk utforming som vektlegger romlighet og naturlig lys. Sportsbod og overbygget carportinngang. Fire soverom. Grunnmur inkludert.',
    bra_m2: 159, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '144 m²', 'Mål': '11,8 m × 8,2 m', 'Carport': 'Overbygget' },
    pris_hus: 5722000, total_budsjett: ${5722000 + B},
    kostnader: [...FELLES, { post: 'Atlas – nøkkelferdig fra Nordbohus', belop: 5722000 }, ...ETTER],
    verdi_bra_m2: 159, verdi_m2_pris: 50000, verdi_total: 7950000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/atlas-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/atlas-plan-1etg.webp\`, label: '1. etasje' },
        { url: \`\${IMG}/atlas-plan-2etg.webp\`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'kuba', grunnmur_inkludert: true, navn: 'Kuba', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/kuba',
    beskrivelse: 'Funksjonalistisk bolig med rene linjer og praktiske løsninger. Lyse oppholdsrom og innglasset takterrasse – perfekt til sosialt samvær. Tre soverom. Grunnmur inkludert.',
    bra_m2: 161, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '119 m²', 'Takterrasse': 'Innglasset', 'Mål': '13,4 m × 9,2 m' },
    pris_hus: 6331000, total_budsjett: ${6331000 + B},
    kostnader: [...FELLES, { post: 'Kuba – nøkkelferdig fra Nordbohus', belop: 6331000 }, ...ETTER],
    verdi_bra_m2: 161, verdi_m2_pris: 50000, verdi_total: 8050000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/kuba-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/kuba-plan-1etg.webp\`, label: '1. etasje' },
        { url: \`\${IMG}/kuba-plan-2etg.webp\`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'astro', grunnmur_inkludert: true, navn: 'Astro', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/astro',
    beskrivelse: 'Praktisk enebolig som kombinerer klassisk og moderne design. Romslige soverom, rikelig lagerplass og behagelige utearealer med høy takhøyde og mye naturlig lys. Grunnmur inkludert.',
    bra_m2: 160, soverom: 3, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '116 m²', 'Takhøyde': 'Høy' },
    pris_hus: 6458000, total_budsjett: ${6458000 + B},
    kostnader: [...FELLES, { post: 'Astro – nøkkelferdig fra Nordbohus', belop: 6458000 }, ...ETTER],
    verdi_bra_m2: 160, verdi_m2_pris: 50000, verdi_total: 8000000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/astro-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/astro-plan-1etg.webp\`, label: 'Kjellerplan' },
        { url: \`\${IMG}/astro-plan-2etg.webp\`, label: '1. etasje' },
      ],
    },
  },
  {
    id: 'alltid', grunnmur_inkludert: true, navn: 'All-tid', leverandor: 'Nordbohus',
    leverandor_url: 'https://www.nordbohus.no/hus/all-tid',
    beskrivelse: 'Fleksibel familiebolig som rommer enten fire soverom med hybel/utleieenhet, eller åpent kjøkken-/stueområde med takterrasse over carporten. Fem soverom totalt. Grunnmur inkludert.',
    bra_m2: 201, soverom: 5, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '148 m²', 'Utleiedel': 'Hybel', 'Takterrasse': 'Over carport' },
    pris_hus: 7669000, total_budsjett: ${7669000 + B},
    kostnader: [...FELLES, { post: 'All-tid – nøkkelferdig fra Nordbohus', belop: 7669000 }, ...ETTER],
    verdi_bra_m2: 201, verdi_m2_pris: 50000, verdi_total: 10050000,
    inkludert: ['Grunnmur og støpt plate', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse', 'Rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/alltid-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/alltid-plan-1etg.webp\`, label: '1. etasje' },
        { url: \`\${IMG}/alltid-plan-2etg.webp\`, label: '2. etasje' },
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
    pris_hus: 5140000, total_budsjett: ${5140000 + B},
    kostnader: [...FELLES, { post: 'Oslo – nøkkelferdig fra Systemhus', belop: 5140000 }, ...ETTER],
    verdi_bra_m2: 110, verdi_m2_pris: 50000, verdi_total: 5500000,
    inkludert: ['Støpt plate og grunnmur', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [\`\${IMG}/oslo-fasade-1.webp\`],
      plantegninger: [
        { url: \`\${IMG}/oslo-plan-1etg.webp\`, label: '1. etasje' },
        { url: \`\${IMG}/oslo-plan-2etg.webp\`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'trend', grunnmur_inkludert: true, navn: 'Trend', leverandor: 'Systemhus',
    leverandor_url: 'https://www.systemhus.no/hus/enebolig-trend',
    beskrivelse: 'Moderne og funksjonell enebolig med rent Skandinavisk design og sadeltak. Stort åpent stue-/kjøkkenrom i øverste etasje. Tre soverom. Grunnmur og støpt plate inkludert.',
    bra_m2: 141, soverom: 3, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '106 m²', 'Taktype': 'Sadeltak', 'Stue/kjøkken': 'Øverste etasje' },
    pris_hus: 5380000, total_budsjett: ${5380000 + B},
    kostnader: [...FELLES, { post: 'Trend – nøkkelferdig fra Systemhus', belop: 5380000 }, ...ETTER],
    verdi_bra_m2: 141, verdi_m2_pris: 50000, verdi_total: 7050000,
    inkludert: ['Støpt plate og grunnmur', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [\`\${IMG}/trend-fasade-1.webp\`],
      plantegninger: [
        { url: \`\${IMG}/trend-plan-1etg.webp\`, label: '1. etasje' },
        { url: \`\${IMG}/trend-plan-2etg.webp\`, label: '2. etasje' },
      ],
    },
  },
  {
    id: 'selvik', grunnmur_inkludert: true, navn: 'Selvik', leverandor: 'Systemhus',
    leverandor_url: 'https://www.systemhus.no/hus/enebolig-selvik',
    beskrivelse: 'Tradisjonell enebolig som blander moderne detaljer med klassisk byggeskikk. Effektive planløsninger, godt naturlig lys og romslige innvendige arealer. Fire soverom. Grunnmur inkludert.',
    bra_m2: 165, soverom: 4, bad: '2', etasjer: 2,
    ekstra: { 'BYA': '106 m²', 'Stil': 'Tradisjonell/moderne' },
    pris_hus: 5830000, total_budsjett: ${5830000 + B},
    kostnader: [...FELLES, { post: 'Selvik – nøkkelferdig fra Systemhus', belop: 5830000 }, ...ETTER],
    verdi_bra_m2: 165, verdi_m2_pris: 50000, verdi_total: 8250000,
    inkludert: ['Støpt plate og grunnmur', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [\`\${IMG}/selvik-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/selvik-plan-1etg.webp\`, label: '1. etasje' },
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
    pris_hus: 3298000, total_budsjett: ${3298000 + B},
    kostnader: [...FELLES, { post: 'Apollis – nøkkelferdig fra Hedalm-Anebyhus', belop: 3298000 }, ...ETTER],
    verdi_bra_m2: 137, verdi_m2_pris: 50000, verdi_total: 6850000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/apollis-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/apollis-plan-1etg.jpg\`, label: 'Plantegning' },
      ],
    },
  },
  {
    id: 'frankis', grunnmur_inkludert: false, navn: 'Frankis', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/frankis/',
    beskrivelse: 'Familievennlig 2-planshus med stor vinkelstue og romslige soverom. Effektiv planløsning ideell for familier med barn. Fire soverom. OBS: Grunnmur ikke inkludert i husmodellprisen.',
    bra_m2: 146, soverom: 4, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '88 m²', 'Stue': 'Vinkelstue' },
    pris_hus: 3908000, total_budsjett: ${3908000 + B},
    kostnader: [...FELLES, { post: 'Frankis – nøkkelferdig fra Hedalm-Anebyhus', belop: 3908000 }, ...ETTER],
    verdi_bra_m2: 146, verdi_m2_pris: 50000, verdi_total: 7300000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/frankis-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/frankis-plan-1etg.jpg\`, label: 'Plantegning' },
      ],
    },
  },
  {
    id: 'ronningen', grunnmur_inkludert: false, navn: 'Rønningen', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/ronningen/',
    beskrivelse: 'Passe stort og funksjonelt trehus over to etasjer. Åpent kjøkken, romslig gang, innvendig bod og loftstue. Fire soverom. God hverdagsfunksjonalitet. Grunnmur ikke inkludert i prisen.',
    bra_m2: 150, soverom: 4, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '91 m²', 'Loftstue': 'Ja' },
    pris_hus: 4098000, total_budsjett: ${4098000 + B},
    kostnader: [...FELLES, { post: 'Rønningen – nøkkelferdig fra Hedalm-Anebyhus', belop: 4098000 }, ...ETTER],
    verdi_bra_m2: 150, verdi_m2_pris: 50000, verdi_total: 7500000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/ronningen-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/ronningen-plan-1etg.jpg\`, label: 'Plantegning' },
      ],
    },
  },
  {
    id: 'lyris', grunnmur_inkludert: false, navn: 'Lyris', leverandor: 'Hedalm-Anebyhus',
    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/lyris/',
    beskrivelse: 'Funksjonelt hus for både stor og liten familie. Åpen kjøkken-/stueløsning, vaskerom og kott på bakkeplan, loftstue i overetasjen. Fire soverom. Grunnmur ikke inkludert i prisen.',
    bra_m2: 155, soverom: 4, bad: '1', etasjer: 2,
    ekstra: { 'BYA': '88 m²', 'Loftstue': 'Ja', 'Vaskerom': 'Ja' },
    pris_hus: 4258000, total_budsjett: ${4258000 + B},
    kostnader: [...FELLES, { post: 'Lyris – nøkkelferdig fra Hedalm-Anebyhus', belop: 4258000 }, ...ETTER],
    verdi_bra_m2: 155, verdi_m2_pris: 50000, verdi_total: 7750000,
    inkludert: ['Parkett', 'Flislagte våtrom', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Lyskilder inne/ute', 'Komplett el-leveranse', 'Komplett rørleveranse'],
    bilder: {
      fasade: [\`\${IMG}/lyris-fasade-1.jpg\`],
      plantegninger: [
        { url: \`\${IMG}/lyris-plan-1etg.jpg\`, label: 'Plantegning' },
      ],
    },
  },`

// Find the end of HUSMODELLER array and insert before it
const marker = '\n]\n\nconst TOMT'
if (!src.includes(marker)) {
  console.error('Could not find insertion point!')
  process.exit(1)
}

src = src.replace(marker, NYE_MODELLER + marker)

writeFileSync(pagePath, src)
console.log('Done – added 26 new models to Gamle Dalsveg 16')
console.log('Total HUSMODELLER:', (src.match(/id: '/g) || []).length - 10, 'husmodeller')
