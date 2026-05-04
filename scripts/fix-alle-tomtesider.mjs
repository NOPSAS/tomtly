import { readFileSync, writeFileSync } from 'fs'

// ─── Myllavegen 58 ────────────────────────────────────────────────────────────
let myl = readFileSync('src/app/tomter/myllavegen-58/page.tsx', 'utf8')

// 1. Selma med kjeller: grunnmur_inkludert: false (kjeller er Tegnebua-konsept, ikke std. Älvsbyhus)
myl = myl.replace(
  "id: 'selma-kjeller', grunnmur_inkludert: true",
  "id: 'selma-kjeller', grunnmur_inkludert: false"
)

// 2. Legg til grunnmur 250 000 i kostnader for Skogly og Selma (grunnmur_inkludert: false)
// Skogly
myl = myl.replace(
  "{ post: 'Skogly – ferdig hus fra Hedalm-Anebyhus', belop: 3580000 }, ...ETTER(650000)",
  "{ post: 'Skogly – ferdig hus fra Hedalm-Anebyhus', belop: 3580000 }, { post: 'Grunnmur/fundamentering (estimat)', belop: 250000 }, ...ETTER(650000)"
)
myl = myl.replace(
  "id: 'skogly', grunnmur_inkludert: false, navn: 'Skogly',",
  "id: 'skogly', grunnmur_inkludert: false, navn: 'Skogly',"
)
// Update Skogly total_budsjett: 4749000 + 250000 = 4999000
myl = myl.replace(
  "id: 'skogly', grunnmur_inkludert: false, navn: 'Skogly', leverandor: 'Hedalm-Anebyhus',\n    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/skogly/',\n    beskrivelse: 'Kompakt og effektiv bolig med inngang fra begge plan – perfekt for skrånende tomt. Innglassert balkong, åpen stue/kjøkken og 3 soverom.',\n    bra_m2: 137, soverom: 3, bad: '2', etasjer: 2,\n    ekstra: { 'BYA': '80,5 m²', 'Utnyttelse': '8,1%', 'Innglassert balkong': 'Ja' },\n    pris_hus: 3580000, total_budsjett: 4749000,",
  "id: 'skogly', grunnmur_inkludert: false, navn: 'Skogly', leverandor: 'Hedalm-Anebyhus',\n    leverandor_url: 'https://www.hedalm-anebyhus.no/hus/skogly/',\n    beskrivelse: 'Kompakt og effektiv bolig med inngang fra begge plan – perfekt for skrånende tomt. Innglassert balkong, åpen stue/kjøkken og 3 soverom.',\n    bra_m2: 137, soverom: 3, bad: '2', etasjer: 2,\n    ekstra: { 'BYA': '80,5 m²', 'Utnyttelse': '8,1%', 'Innglassert balkong': 'Ja' },\n    pris_hus: 3580000, total_budsjett: 4999000,"
)

// Selma: total_budsjett: 5119000 + 250000 = 5369000
myl = myl.replace(
  "id: 'selma-kjeller', grunnmur_inkludert: false, navn: 'Selma med kjeller', leverandor: 'Älvsbyhus + Tegnebua',\n    leverandor_url: 'https://tegnebua.no/konsepter/alvsbyhus-kjeller',\n    beskrivelse: 'Älvsbyhus Selma med Tegnebuas kjellerkonsept – gir mye ekstra areal til lav kostnad. Hovedetasje fra Älvsbyhus, kjeller prosjektert av Tegnebua. Perfekt for skråtomt.',\n    bra_m2: 180, soverom: 4, bad: '2', etasjer: 2,\n    ekstra: { 'BYA': '~95 m²', 'Utnyttelse': '9,5%', 'Kjeller': 'Tegnebua-konsept', 'Husbank': 'Kvalifiserer' },\n    pris_hus: 3200000, total_budsjett: 5119000,",
  "id: 'selma-kjeller', grunnmur_inkludert: false, navn: 'Selma med kjeller', leverandor: 'Älvsbyhus + Tegnebua',\n    leverandor_url: 'https://tegnebua.no/konsepter/alvsbyhus-kjeller',\n    beskrivelse: 'Älvsbyhus Selma med Tegnebuas kjellerkonsept – gir mye ekstra areal til lav kostnad. Hovedetasje fra Älvsbyhus, kjeller prosjektert av Tegnebua. Perfekt for skråtomt.',\n    bra_m2: 180, soverom: 4, bad: '2', etasjer: 2,\n    ekstra: { 'BYA': '~95 m²', 'Utnyttelse': '9,5%', 'Kjeller': 'Tegnebua-konsept', 'Husbank': 'Kvalifiserer' },\n    pris_hus: 3200000, total_budsjett: 5369000,"
)
myl = myl.replace(
  "{ post: 'Selma – hus fra Älvsbyhus', belop: 3200000 }, { post: 'Kjeller (prosjektert av Tegnebua)', belop: 500000 }, ...ETTER(700000)",
  "{ post: 'Selma – hus fra Älvsbyhus', belop: 3200000 }, { post: 'Kjeller (prosjektert av Tegnebua)', belop: 500000 }, { post: 'Grunnmur/fundamentering (estimat)', belop: 250000 }, ...ETTER(700000)"
)

// 3. Hero-bilde: bytt til det nye flyfotoet
myl = myl.replace(
  "{ id: 'h1', url: `${IMG}/situasjonskart.png`, alt: 'Situasjonskart – Myllavegen 58', kategori: 'tomt' as const },",
  "{ id: 'h0', url: `${IMG}/hero.png`, alt: 'Wide Skrå plassert på Myllavegen 58 – flyfoto', kategori: 'tomt' as const },\n  { id: 'h1', url: `${IMG}/situasjonskart.png`, alt: 'Situasjonskart – Myllavegen 58', kategori: 'tomt' as const },"
)

// 4. Alle fasadebilder inn i BILDER - legg til visualisering
myl = myl.replace(
  "{ id: 'h8', url: `${IMG}/mira-fasade-1.jpg`, alt: 'Mira – fasade', kategori: 'annet' as const },",
  `{ id: 'h8', url: \`\${IMG}/mira-fasade-1.jpg\`, alt: 'Mira – fasade', kategori: 'annet' as const },
  { id: 'h9', url: \`\${IMG}/wide-visualisering.png\`, alt: 'Wide Skrå visualisering på tomt', kategori: 'annet' as const },
  { id: 'h10', url: \`\${IMG}/haugli-fasade-1.jpg\`, alt: 'Haugli – fasade', kategori: 'annet' as const },
  { id: 'h11', url: \`\${IMG}/horisont-fasade-1.jpg\`, alt: 'Horisont – fasade', kategori: 'annet' as const },
  { id: 'h12', url: \`\${IMG}/signatur-305-fasade-1.jpg\`, alt: 'Signatur 305 – fasade', kategori: 'annet' as const },
  { id: 'h13', url: \`\${IMG}/nelly-fasade-1.jpg\`, alt: 'Nelly Skrå – fasade', kategori: 'annet' as const },`
)

// 5. Fix dokumentlenker - reguleringsbestemmelser → kommuneplanbestemmelser
myl = myl.replace(
  "{ navn: 'Reguleringsbestemmelser', url: '/documents/myllavegen-58/reguleringsbestemmelser.pdf' },",
  "{ navn: 'Kommuneplanbestemmelser 2023–2040', url: '/documents/myllavegen-58/kommuneplanbestemmelser.pdf' },"
)

writeFileSync('src/app/tomter/myllavegen-58/page.tsx', myl)
console.log('✓ Myllavegen 58 oppdatert')

// ─── Gamle Dalsveg 16 ────────────────────────────────────────────────────────
let gd = readFileSync('src/app/tomter/gamle-dalsveg-16/page.tsx', 'utf8')

// Add 250 000 grunnmur to Hedalm-Anebyhus models (apollis, frankis, ronningen, lyris)
const hedalm = ['apollis', 'frankis', 'ronningen', 'lyris']
for (const id of hedalm) {
  // Add grunnmur cost line to kostnader
  gd = gd.replace(
    new RegExp(`(id: '${id}', grunnmur_inkludert: false,[\\s\\S]*?kostnader: \\[\\.\\.\\. FELLES, \\{ post: '[^']+', belop: \\d+ \\}, \\.\\.\\.ETTER\\])`),
    (m) => m // Will handle differently below
  )
}

// Simpler approach: for each hedalm model, find their kostnader line and add grunnmur
const hedalm_ids = {
  apollis:  { pris: 3298000, gammel_total: 6444324, ny_total: 6444324 + 250000 },
  frankis:  { pris: 3908000, gammel_total: 7054324, ny_total: 7054324 + 250000 },
  ronningen:{ pris: 4098000, gammel_total: 7244324, ny_total: 7244324 + 250000 },
  lyris:    { pris: 4258000, gammel_total: 7404324, ny_total: 7404324 + 250000 },
}

for (const [id, data] of Object.entries(hedalm_ids)) {
  // Fix total_budsjett
  gd = gd.replace(
    `id: '${id}', grunnmur_inkludert: false,`,
    `id: '${id}', grunnmur_inkludert: false,`
  )
  gd = gd.replace(
    new RegExp(`(id: '${id}'[^}]*total_budsjett: )${data.gammel_total}`),
    `$1${data.ny_total}`
  )
  // Add grunnmur line to kostnader
  const leverandorName = id === 'apollis' ? 'Apollis' : id === 'frankis' ? 'Frankis' : id === 'ronningen' ? 'Rønningen' : 'Lyris'
  gd = gd.replace(
    `{ post: '${leverandorName} – nøkkelferdig fra Hedalm-Anebyhus', belop: ${data.pris} }, ...ETTER`,
    `{ post: '${leverandorName} – nøkkelferdig fra Hedalm-Anebyhus', belop: ${data.pris} }, { post: 'Grunnmur/fundamentering (estimat)', belop: 250000 }, ...ETTER`
  )
}

// Add visualisering images to BILDER
gd = gd.replace(
  "{ id: 'b7', url: `${IMG}/rognheim-fasade-1.jpg`, alt: 'Norgeshus Rognheim – fasade', kategori: 'annet' as const },",
  `{ id: 'b7', url: \`\${IMG}/rognheim-fasade-1.jpg\`, alt: 'Norgeshus Rognheim – fasade', kategori: 'annet' as const },
  { id: 'b8', url: \`\${IMG}/all-tid-nordbohus-visualisering.png\`, alt: 'All-tid Nordbohus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b9', url: \`\${IMG}/lilly-abchus-visualisering.png\`, alt: 'Lilly ABChus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b10', url: \`\${IMG}/nelly-abchus-visualisering.png\`, alt: 'Nelly ABChus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b11', url: \`\${IMG}/perla-norgeshus-visualisering.png\`, alt: 'Perla Norgeshus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b12', url: \`\${IMG}/vipp-norgeshus-visualisering.png\`, alt: 'Vipp Norgeshus – visualisering på tomt', kategori: 'annet' as const },
  { id: 'b13', url: \`\${IMG}/skansen-fasade-1.jpg\`, alt: 'Skansen Mesterhus – fasade', kategori: 'annet' as const },
  { id: 'b14', url: \`\${IMG}/arwen-a-fasade-1.jpg\`, alt: 'Arwen A ABChus – fasade', kategori: 'annet' as const },`
)

writeFileSync('src/app/tomter/gamle-dalsveg-16/page.tsx', gd)
console.log('✓ Gamle Dalsveg 16 oppdatert')
