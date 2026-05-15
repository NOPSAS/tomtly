// Salgsoppgave-data for hver tomt – brukes av PDF-generator og API-rute.
// Legg til ny tomt her når du oppretter en ny tomteside.

export interface HusmodellPDF {
  navn: string
  leverandor: string
  bra_m2: number
  bya_m2: number
  total_budsjett: number
  verdi_total: number
  grunnmur_inkludert: boolean
  soverom: number
  bad: string
  hybel: boolean
  visualisering?: string  // absolutt URL
}

export interface SalgsoppgaveTomt {
  slug: string
  adresse: string
  poststed: string
  kommune: string
  areal_m2: number
  pris: number
  gnr: number
  bnr: number
  heroImage: string
  visualiseringer: { url: string; navn: string }[]
  anbefaling: string
  detaljertBeskrivelse: string
  fordeler: string[]
  nokkelFakta: { label: string; verdi: string }[]
  husmodeller: HusmodellPDF[]
  regulering: {
    bya_prosent: number
    maks_hoyde_m: number
    maks_etasjer: number
    plannavn: string
    beskrivelse: string
  }
  nabolag: string
  dokumenter: { navn: string; url: string }[]
}

const BASE = 'https://tomtly.no'
const M58 = `${BASE}/tomter/myllavegen-58`
const GD16 = `${BASE}/tomter/gamle-dalsveg-16`
const B23 = `${BASE}/tomter/brottenga-23`

export const SALGSOPPGAVE_DATA: Record<string, SalgsoppgaveTomt> = {
  'myllavegen-58': {
    slug: 'myllavegen-58',
    adresse: 'Myllavegen 58',
    poststed: 'Grua',
    kommune: 'Lunner',
    areal_m2: 1000,
    pris: 950000,
    gnr: 134, bnr: 85,
    heroImage: `${M58}/hero.png`,
    visualiseringer: [
      { url: `${M58}/arwen-visualisering.png`, navn: 'Arwen Skrå – ABChus' },
      { url: `${M58}/nelly-visualisering.png`, navn: 'Nelly Skrå – ABChus' },
      { url: `${M58}/wide-visualisering.png`, navn: 'Wide Skrå – ABChus' },
      { url: `${M58}/selma-visualisering.png`, navn: 'Selma med kjeller – Älvsbyhus' },
      { url: `${M58}/moholt-visualisering.png`, navn: 'Moholt – Systemhus' },
      { url: `${M58}/mira-visualisering.png`, navn: 'Mira – Nordbohus' },
      { url: `${M58}/samen-visualisering.png`, navn: 'Samen – Nordbohus' },
      { url: `${M58}/haugli-visualisering.png`, navn: 'Haugli – Norgeshus' },
      { url: `${M58}/horisont-visualisering.png`, navn: 'Horisont – Norgeshus' },
      { url: `${M58}/signatur-308-visualisering.png`, navn: 'Signatur 308 – Mesterhus' },
      { url: `${M58}/skogly-visualisering.png`, navn: 'Skogly – Hedalm-Anebyhus' },
    ],
    anbefaling: 'Myllavegen 58 er en fradelt boligtomt med lav reguleringsrisiko og avklart infrastruktur – klar for byggesøknad.',
    detaljertBeskrivelse: 'Myllavegen 58 er en fradelt boligtomt på 1 000 m² i Grua, Lunner kommune. Tomten har en svak helning mot sørvest som gir spennende byggemuligheter; skråning og terreng åpner for sokkeletasje, underetasje og naturlig lysinnfall fra vest. Kommunalt vann og avløp er tilgjengelig i veien rett utenfor tomten, og tilkoblingspunkter er avklart. Avkjøringstillatelse fra kommunen foreligger, og fradeling er vedtatt etter normal saksbehandling. Reguleringsformålet er boligbebyggelse – frittliggende enebolig – med 30 % BYA, som gir 300 m² tillatt bebygd areal på denne tomten. Det er reguleringsmessig rom for å bygge tomannsbolig, noe som gir ekstra investeringspotensial. Tomtly har analysert 12 husmodeller fra seks ulike husleverandører og beregnet fullstendig totalbudsjett for hver, inkludert grunnarbeider, kommunale gebyrer, tilkoblingsavgifter og mer.',
    fordeler: [
      'Fradeling godkjent av Lunner kommune – lav reguleringsrisiko',
      'Kommunalt vann og avløp i vei – tilkoblingspunkter avklart',
      'Veirett og avkjøringstillatelse foreligger',
      '12 husmodeller fra 6 leverandører – totalbudsjett fra kr 5,0 MNOK',
      'Skrånende tomt – egnet for sokkeletasje med ekstra boareal til lav kostnad',
      'Tomannsbolig er reguleringsmessig mulig (BYA 30 %)',
      'Rolig boligstrøk – skog og turterreng rett utenfor',
      'Ca. 40 min til Oslo med bil via E16',
    ],
    nokkelFakta: [
      { label: 'Tomtestørrelse', verdi: '1 000 m²' },
      { label: 'Pris', verdi: 'kr 950 000' },
      { label: 'Dokumentavgift (2,5 %)', verdi: 'kr 23 750' },
      { label: 'Maks BYA', verdi: '30 % = 300 m²' },
      { label: 'Maks gesimshøyde', verdi: '9 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Regulering', verdi: 'Boligbebyggelse – frittliggende' },
      { label: 'Kommunalt VA', verdi: 'Ja – tilgjengelig i vei' },
      { label: 'Avkjøringstillatelse', verdi: 'Foreligger' },
      { label: 'Fradeling', verdi: 'Vedtatt av Lunner kommune' },
      { label: 'GNR / BNR', verdi: '134/85, Lunner' },
      { label: 'Postnummer', verdi: '2742 Grua' },
    ],
    husmodeller: [
      { navn: 'Nelly Skrå', leverandor: 'ABChus', bra_m2: 161, bya_m2: 90, total_budsjett: 6104000, verdi_total: 7245000, grunnmur_inkludert: true, soverom: 4, bad: '1 + WC', hybel: false },
      { navn: 'Arwen Skrå', leverandor: 'ABChus', bra_m2: 161, bya_m2: 115, total_budsjett: 6471000, verdi_total: 7245000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: true, visualisering: `${M58}/arwen-visualisering.png` },
      { navn: 'Wide Skrå', leverandor: 'ABChus', bra_m2: 193, bya_m2: 120, total_budsjett: 7290000, verdi_total: 8685000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: true, visualisering: `${M58}/wide-visualisering.png` },
      { navn: 'Signatur 305', leverandor: 'Mesterhus', bra_m2: 175, bya_m2: 105, total_budsjett: 5990000, verdi_total: 7875000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Signatur 308', leverandor: 'Mesterhus', bra_m2: 170, bya_m2: 100, total_budsjett: 6228000, verdi_total: 7650000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false, visualisering: `${M58}/signatur-308-visualisering.png` },
      { navn: 'Selma med kjeller', leverandor: 'Älvsbyhus', bra_m2: 180, bya_m2: 95, total_budsjett: 6269000, verdi_total: 7200000, grunnmur_inkludert: false, soverom: 4, bad: '2', hybel: false, visualisering: `${M58}/selma-visualisering.png` },
      { navn: 'Skogly', leverandor: 'Hedalm-Anebyhus', bra_m2: 137, bya_m2: 85, total_budsjett: 5359000, verdi_total: 6165000, grunnmur_inkludert: false, soverom: 3, bad: '1 + WC', hybel: false, visualisering: `${M58}/skogly-visualisering.png` },
      { navn: 'Moholt', leverandor: 'Systemhus', bra_m2: 155, bya_m2: 92, total_budsjett: 5471000, verdi_total: 6975000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false, visualisering: `${M58}/moholt-visualisering.png` },
      { navn: 'Mira', leverandor: 'Nordbohus', bra_m2: 170, bya_m2: 100, total_budsjett: 6175000, verdi_total: 7650000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false, visualisering: `${M58}/mira-visualisering.png` },
      { navn: 'Samen', leverandor: 'Nordbohus', bra_m2: 210, bya_m2: 130, total_budsjett: 7578000, verdi_total: 9450000, grunnmur_inkludert: true, soverom: 5, bad: '2 + WC', hybel: false, visualisering: `${M58}/samen-visualisering.png` },
      { navn: 'Haugli', leverandor: 'Norgeshus', bra_m2: 165, bya_m2: 100, total_budsjett: 5786000, verdi_total: 7425000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false, visualisering: `${M58}/haugli-visualisering.png` },
      { navn: 'Horisont', leverandor: 'Norgeshus', bra_m2: 250, bya_m2: 150, total_budsjett: 8517000, verdi_total: 11250000, grunnmur_inkludert: true, soverom: 5, bad: '2 + WC', hybel: false, visualisering: `${M58}/horisont-visualisering.png` },
    ],
    regulering: {
      bya_prosent: 30,
      maks_hoyde_m: 9,
      maks_etasjer: 2,
      plannavn: 'Kommuneplanens arealdel – Lunner',
      beskrivelse: 'Tomten er regulert til boligbebyggelse – frittliggende småhusbebyggelse etter kommuneplanens arealdel for Lunner. Maks utnyttelsesgrad er 30 % BYA (bebygd areal), som på denne tomten gir 300 m² tillatt bebygd areal. Maksimal gesimshøyde er 9 m over planert terreng, og maks 2 etasjer. Det er reguleringsmessig rom for tomannsbolig.',
    },
    nabolag: 'Myllavegen 58 ligger i et etablert boligstrøk i Grua, Lunner kommune – en liten og rolig tettsted omgitt av skog og natur. Bussholdeplass for rute mot Hønefoss og Oslo er ca. 400 m unna (5 min gange). Grua skole (1.–7. trinn) ligger ca. 650 m unna (8 min gange). Dagligvare finnes i gangavstand (7 min). Rik tilgang til skog og turterreng rett fra tomten. Med bil er det ca. 40 min til Oslo vest via E16, og ca. 20 min til Hønefoss.',
    dokumenter: [
      { navn: 'Situasjonsplan', url: `${BASE}/documents/myllavegen-58/situasjonsplan.pdf` },
      { navn: 'Fradelingsvedtak', url: `${BASE}/documents/myllavegen-58/fradelingsvedtak.pdf` },
      { navn: 'Avkjøringstillatelse', url: `${BASE}/documents/myllavegen-58/avkjoringstillatelse.pdf` },
      { navn: 'Kommuneplanbestemmelser', url: `${BASE}/documents/myllavegen-58/kommuneplanbestemmelser.pdf` },
      { navn: 'DOK-analyse (naturfare og grunnforhold)', url: `${BASE}/documents/myllavegen-58/dok-analyse.pdf` },
    ],
  },

  'gamle-dalsveg-16': {
    slug: 'gamle-dalsveg-16',
    adresse: 'Gamle Dalsveg 16 A',
    poststed: 'Maura',
    kommune: 'Nannestad',
    areal_m2: 564,
    pris: 2300000,
    gnr: 148, bnr: 166,
    heroImage: `${GD16}/perla-norgeshus-visualisering.png`,
    visualiseringer: [
      { url: `${GD16}/alltid-visualisering.png`, navn: 'All-tid – Nordbohus' },
      { url: `${GD16}/lilly-visualisering.png`, navn: 'Lilly – ABChus' },
      { url: `${GD16}/nelly-visualisering.png`, navn: 'Nelly – ABChus' },
      { url: `${GD16}/perla-visualisering.png`, navn: 'Perla – Norgeshus' },
      { url: `${GD16}/vipp-visualisering.png`, navn: 'Vipp – Norgeshus' },
      { url: `${GD16}/fanny-visualisering.png`, navn: 'Fanny – Älvsbyhus' },
      { url: `${GD16}/astrid-ase-visualisering.png`, navn: 'Åse / Astrid – Älvsbyhus' },
      { url: `${GD16}/apollis-visualisering.png`, navn: 'Apollis – Hedalm-Anebyhus' },
      { url: `${GD16}/frankis-visualisering.png`, navn: 'Frankis – Hedalm-Anebyhus' },
      { url: `${GD16}/lyris-visualisering.png`, navn: 'Lyris – Hedalm-Anebyhus' },
      { url: `${GD16}/fiks-visualisering.png`, navn: 'Fiks – Norgeshus' },
      { url: `${GD16}/stolt-visualisering.png`, navn: 'Stolt – Norgeshus' },
      { url: `${GD16}/rognheim-visualisering.png`, navn: 'Rognheim – Norgeshus' },
      { url: `${GD16}/ronningen-visualisering.jpg`, navn: 'Rønningen – Hedalm-Anebyhus' },
    ],
    anbefaling: 'Gamle Dalsveg 16 A i Maura er en sjelden mulighet: fradelt boligtomt med komplett dokumentasjon, stabil grunn bekreftet av geotekniker, og kommunalt VA tilgjengelig.',
    detaljertBeskrivelse: 'Gamle Dalsveg 16 A er en fradelt boligtomt på 564 m² beliggende i et etablert boligområde i Maura, Nannestad kommune. Tomten er fradelt fra gnr. 148, bnr. 76, og vedtak om fradeling ble fattet av Nannestad kommune. Geoteknisk rapport er utarbeidet og bekrefter stabile grunnforhold, til tross for at tomten ligger i et område som er kartlagt som kvikkleire-aktsomhetsområde. Kommunalt vann og avløp er bekreftet tilgjengelig med en kjent tilkoblingskostnad på kr 98 824 inkl. mva. Avkjøringstillatelse fra Gamle Dalsveg foreligger, med delt innkjørsel med naboeiendom. Tomten er regulert til boligbebyggelse med 30 % BYA (169,2 m² tillatt på denne tomten). Tomtly har analysert 34 husmodeller fra syv leverandører – Nordbohus, Norgeshus, ABChus, Mesterhus, Älvsbyhus, Systemhus og Hedalm-Anebyhus – og beregnet fullstendig totalbudsjett for samtlige.',
    fordeler: [
      'Fradeling vedtatt av Nannestad kommune – komplett dokumentasjon',
      'Geoteknisk rapport foreligger – stabil grunn bekreftet',
      'Kommunalt VA tilgjengelig – tilkoblingskostnad kjent (kr 98 824)',
      'Avkjøringstillatelse foreligger (delt innkjørsel)',
      '34 husmodeller fra 7 leverandører – totalbudsjett fra kr 6,2 MNOK',
      'Grunnmur inkludert i prisen hos 5 av 7 leverandører',
      '12 min til Jessheim, 30 min til Oslo via E6',
      'Etablert boligstrøk med barnehage, skole og dagligvare nærby',
    ],
    nokkelFakta: [
      { label: 'Tomtestørrelse', verdi: '564 m²' },
      { label: 'Pris', verdi: 'kr 2 300 000' },
      { label: 'Dokumentavgift (2,5 %)', verdi: 'kr 57 500' },
      { label: 'Maks BYA', verdi: '30 % = 169 m²' },
      { label: 'Maks gesimshøyde', verdi: '9 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Kommunalt VA', verdi: 'Ja – kr 98 824 inkl. mva' },
      { label: 'Geoteknisk rapport', verdi: 'Utarbeidet – stabil grunn' },
      { label: 'Avkjøringstillatelse', verdi: 'Foreligger (delt innkjørsel)' },
      { label: 'Fradeling', verdi: 'Vedtatt av Nannestad kommune' },
      { label: 'GNR / BNR', verdi: '148/166, Nannestad' },
      { label: 'Postnummer', verdi: '2032 Maura' },
    ],
    husmodeller: [
      { navn: 'Åse', leverandor: 'Älvsbyhus', bra_m2: 135, bya_m2: 90, total_budsjett: 6240324, verdi_total: 7155000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false, visualisering: `${GD16}/astrid-ase-visualisering.png` },
      { navn: 'Astrid', leverandor: 'Älvsbyhus', bra_m2: 135, bya_m2: 90, total_budsjett: 6280324, verdi_total: 7155000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false },
      { navn: 'Fanny', leverandor: 'Älvsbyhus', bra_m2: 135, bya_m2: 88, total_budsjett: 6350324, verdi_total: 7155000, grunnmur_inkludert: true, soverom: 3, bad: '1', hybel: false, visualisering: `${GD16}/fanny-visualisering.png` },
      { navn: 'Stolt', leverandor: 'Norgeshus', bra_m2: 113, bya_m2: 70, total_budsjett: 6459324, verdi_total: 6554000, grunnmur_inkludert: true, soverom: 3, bad: '1', hybel: false, visualisering: `${GD16}/stolt-visualisering.png` },
      { navn: 'Fiks', leverandor: 'Norgeshus', bra_m2: 143, bya_m2: 90, total_budsjett: 6594324, verdi_total: 8294000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false, visualisering: `${GD16}/fiks-visualisering.png` },
      { navn: 'Lilly', leverandor: 'ABChus', bra_m2: 144, bya_m2: 92, total_budsjett: 6649324, verdi_total: 8352000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false, visualisering: `${GD16}/lilly-visualisering.png` },
      { navn: 'Perla', leverandor: 'Norgeshus', bra_m2: 157, bya_m2: 96, total_budsjett: 6701324, verdi_total: 9106000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false, visualisering: `${GD16}/perla-visualisering.png` },
      { navn: 'Rognheim', leverandor: 'Norgeshus', bra_m2: 146, bya_m2: 90, total_budsjett: 6714324, verdi_total: 8468000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false, visualisering: `${GD16}/rognheim-visualisering.png` },
      { navn: 'Noomi', leverandor: 'ABChus', bra_m2: 143, bya_m2: 90, total_budsjett: 6755324, verdi_total: 8294000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false },
      { navn: 'Nordstrand', leverandor: 'Mesterhus', bra_m2: 158, bya_m2: 97, total_budsjett: 6790324, verdi_total: 9164000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Vipp', leverandor: 'Norgeshus', bra_m2: 151, bya_m2: 95, total_budsjett: 6831324, verdi_total: 8758000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false, visualisering: `${GD16}/vipp-visualisering.png` },
      { navn: 'Apollis', leverandor: 'Hedalm-Anebyhus', bra_m2: 137, bya_m2: 85, total_budsjett: 6904324, verdi_total: 7946000, grunnmur_inkludert: false, soverom: 3, bad: '1', hybel: false, visualisering: `${GD16}/apollis-visualisering.png` },
      { navn: 'Frankis', leverandor: 'Hedalm-Anebyhus', bra_m2: 146, bya_m2: 88, total_budsjett: 7054324, verdi_total: 8468000, grunnmur_inkludert: false, soverom: 4, bad: '1', hybel: false, visualisering: `${GD16}/frankis-visualisering.png` },
      { navn: 'Nelly', leverandor: 'ABChus', bra_m2: 171, bya_m2: 108, total_budsjett: 7060324, verdi_total: 9918000, grunnmur_inkludert: true, soverom: 4, bad: '1 + WC', hybel: false, visualisering: `${GD16}/nelly-visualisering.png` },
      { navn: 'Skansen', leverandor: 'Mesterhus', bra_m2: 148, bya_m2: 92, total_budsjett: 7100324, verdi_total: 8584000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Dråpen Moderne', leverandor: 'Norgeshus', bra_m2: 140, bya_m2: 88, total_budsjett: 7110324, verdi_total: 8120000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false },
      { navn: 'Rønningen', leverandor: 'Hedalm-Anebyhus', bra_m2: 150, bya_m2: 91, total_budsjett: 7244324, verdi_total: 8700000, grunnmur_inkludert: false, soverom: 4, bad: '1', hybel: false, visualisering: `${GD16}/ronningen-visualisering.jpg` },
      { navn: 'Arwen A', leverandor: 'ABChus', bra_m2: 169, bya_m2: 106, total_budsjett: 7311324, verdi_total: 9802000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Eden', leverandor: 'Norgeshus', bra_m2: 161, bya_m2: 100, total_budsjett: 7385324, verdi_total: 9338000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Lyris', leverandor: 'Hedalm-Anebyhus', bra_m2: 155, bya_m2: 88, total_budsjett: 7404324, verdi_total: 8990000, grunnmur_inkludert: false, soverom: 4, bad: '1', hybel: false, visualisering: `${GD16}/lyris-visualisering.png` },
      { navn: 'Komplett', leverandor: 'Nordbohus', bra_m2: 149, bya_m2: 92, total_budsjett: 7470324, verdi_total: 8642000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Bias', leverandor: 'Nordbohus', bra_m2: 145, bya_m2: 90, total_budsjett: 7500324, verdi_total: 8410000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Oslo', leverandor: 'Systemhus', bra_m2: 110, bya_m2: 70, total_budsjett: 7511324, verdi_total: 6380000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false },
      { navn: 'Trend', leverandor: 'Systemhus', bra_m2: 141, bya_m2: 88, total_budsjett: 7549324, verdi_total: 8178000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Vindy', leverandor: 'ABChus', bra_m2: 107, bya_m2: 68, total_budsjett: 7614324, verdi_total: 6206000, grunnmur_inkludert: true, soverom: 3, bad: '1', hybel: false },
      { navn: 'Luftig', leverandor: 'Nordbohus', bra_m2: 166, bya_m2: 102, total_budsjett: 7617324, verdi_total: 9628000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Nevie 2', leverandor: 'ABChus', bra_m2: 179, bya_m2: 112, total_budsjett: 7628324, verdi_total: 10382000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Drøbak', leverandor: 'Mesterhus', bra_m2: 179, bya_m2: 112, total_budsjett: 7676324, verdi_total: 10382000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Atlas', leverandor: 'Nordbohus', bra_m2: 159, bya_m2: 100, total_budsjett: 7705324, verdi_total: 9222000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Kuba', leverandor: 'Nordbohus', bra_m2: 161, bya_m2: 102, total_budsjett: 7730324, verdi_total: 9338000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Astro', leverandor: 'Nordbohus', bra_m2: 160, bya_m2: 100, total_budsjett: 7790324, verdi_total: 9280000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Selvik', leverandor: 'Systemhus', bra_m2: 165, bya_m2: 102, total_budsjett: 7800324, verdi_total: 9570000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Festlig', leverandor: 'Nordbohus', bra_m2: 108, bya_m2: 68, total_budsjett: 8100324, verdi_total: 6264000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false },
      { navn: 'All-tid', leverandor: 'Nordbohus', bra_m2: 201, bya_m2: 128, total_budsjett: 8934324, verdi_total: 11658000, grunnmur_inkludert: true, soverom: 5, bad: '2 + WC', hybel: false, visualisering: `${GD16}/alltid-visualisering.png` },
    ],
    regulering: {
      bya_prosent: 30,
      maks_hoyde_m: 9,
      maks_etasjer: 2,
      plannavn: 'Kommuneplanens arealdel – Nannestad 2024–2040',
      beskrivelse: 'Tomten er regulert til boligbebyggelse – frittliggende enebolig etter kommuneplanens arealdel for Nannestad 2024–2040. Maks utnyttelsesgrad er 30 % BYA, som på denne tomten på 564 m² gir ca. 169 m² tillatt bebygd areal. Maksimal gesimshøyde er 9 m og maks 2 etasjer. Planbestemmelsene stiller krav til uteoppholdsareal og parkering.',
    },
    nabolag: 'Gamle Dalsveg 16 A ligger i et rolig og etablert boligstrøk i Maura, Nannestad kommune. Maura er et voksende tettsted øst for Jessheim med enkel tilgang til E6. Bussholdeplass med ruter mot Jessheim og Oslo er ca. 400 m unna. Maura skole (1.–7. trinn) ligger 700 m unna (9 min gange). Dagligvare og servicetilbud i Maura sentrum 600 m unna (8 min gange). Skog og turterreng i nærområdet. Med bil er det ca. 12 min til Jessheim storsenter og kollektivknutepunkt, og ca. 30 min til Oslo via E6.',
    dokumenter: [
      { navn: 'Situasjonsplan', url: `${BASE}/documents/gamle-dalsveg-16/situasjonsplan.pdf` },
      { navn: 'Vedtak om fradeling', url: `${BASE}/documents/gamle-dalsveg-16/vedtak-fradeling.pdf` },
      { navn: 'Geoteknisk rapport', url: `${BASE}/documents/gamle-dalsveg-16/geoteknisk-rapport.pdf` },
      { navn: 'VA-kart', url: `${BASE}/documents/gamle-dalsveg-16/va-kart.pdf` },
      { navn: 'DOK-analyse (naturfare og grunnforhold)', url: `${BASE}/documents/gamle-dalsveg-16/dok-analyse.pdf` },
    ],
  },

  'brottenga-23': {
    slug: 'brottenga-23',
    adresse: 'Brøttenga 23',
    poststed: 'Brårud',
    kommune: 'Nes',
    areal_m2: 847,
    pris: 1000000,
    gnr: 32, bnr: 110,
    heroImage: `${B23}/situasjonskart.png`,
    visualiseringer: [],
    anbefaling: 'Brøttenga 23 er en velplassert boligtomt i et etablert boligfelt i Brårud, Nes kommune. Kommunalt VA tilgjengelig, gangavstand til skole og barnehage, og 25 min til Gardermoen.',
    detaljertBeskrivelse: 'Brøttenga 23 er en boligtomt på 847 m² beliggende i et etablert boligfelt i Brårud, Nes kommune. Tomten er del av et etablert nabolag med eksisterende infrastruktur, og kommunalt vann og avløp er tilgjengelig i veien. Adkomst via Brøttenga – en blindvei som gir et rolig og trygt bomiljø. Regulert til boligbebyggelse – frittliggende småhusbebyggelse med 30 % BYA, som på 847 m² gir 254 m² tillatt bebygd areal. Tomtly har analysert 15 husmodeller fra seks ulike leverandører og beregnet fullstendig totalbudsjett inkludert grunnarbeider, kommunale gebyrer, VA-tilknytning og mer. Totalbudsjett varierer fra kr 4,9 til 6,3 MNOK avhengig av valgt husmodell.',
    fordeler: [
      'Etablert boligfelt – enkel saksbehandling i Nes kommune',
      'Kommunalt vann og avløp tilgjengelig i vei',
      '847 m² – 30 % BYA gir 254 m² tillatt bebygd areal',
      '15 husmodeller fra 6 leverandører – totalbudsjett fra kr 4,9 MNOK',
      'Gangavstand til skole, barnehage og bussholdeplass',
      '25 min til Gardermoen, 50 min til Oslo via E6',
    ],
    nokkelFakta: [
      { label: 'Tomtestørrelse', verdi: '847 m²' },
      { label: 'Pris', verdi: 'kr 1 000 000' },
      { label: 'Dokumentavgift (2,5 %)', verdi: 'kr 25 000' },
      { label: 'Maks BYA', verdi: '30 % = 254 m²' },
      { label: 'Maks gesimshøyde', verdi: '8,5 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Kommunalt VA', verdi: 'Ja – tilgjengelig i vei' },
      { label: 'Adkomst', verdi: 'Via Brøttenga (blindvei)' },
      { label: 'GNR / BNR', verdi: '32/110, Nes' },
      { label: 'Postnummer', verdi: '2162 Brårud' },
    ],
    husmodeller: [
      { navn: 'Åse', leverandor: 'Älvsbyhus', bra_m2: 135, bya_m2: 90, total_budsjett: 4874000, verdi_total: 5400000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false },
      { navn: 'Fanny', leverandor: 'Älvsbyhus', bra_m2: 135, bya_m2: 88, total_budsjett: 5030000, verdi_total: 5400000, grunnmur_inkludert: true, soverom: 3, bad: '1', hybel: false },
      { navn: 'Lilly', leverandor: 'ABChus', bra_m2: 144, bya_m2: 92, total_budsjett: 5580000, verdi_total: 6480000, grunnmur_inkludert: true, soverom: 3, bad: '1 + WC', hybel: false },
      { navn: 'Nelly', leverandor: 'ABChus', bra_m2: 161, bya_m2: 100, total_budsjett: 5880000, verdi_total: 7245000, grunnmur_inkludert: true, soverom: 4, bad: '1 + WC', hybel: false },
      { navn: 'Nordstrand', leverandor: 'Mesterhus', bra_m2: 158, bya_m2: 97, total_budsjett: 5580000, verdi_total: 7110000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Signatur 305', leverandor: 'Mesterhus', bra_m2: 175, bya_m2: 105, total_budsjett: 5980000, verdi_total: 7875000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Mira', leverandor: 'Nordbohus', bra_m2: 170, bya_m2: 100, total_budsjett: 6280000, verdi_total: 7650000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Komplett', leverandor: 'Nordbohus', bra_m2: 149, bya_m2: 92, total_budsjett: 5980000, verdi_total: 6705000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Perla', leverandor: 'Norgeshus', bra_m2: 157, bya_m2: 96, total_budsjett: 5680000, verdi_total: 7065000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Rognheim', leverandor: 'Norgeshus', bra_m2: 146, bya_m2: 90, total_budsjett: 5480000, verdi_total: 6570000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Haugli', leverandor: 'Norgeshus', bra_m2: 165, bya_m2: 100, total_budsjett: 5630000, verdi_total: 7425000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Selvik', leverandor: 'Systemhus', bra_m2: 165, bya_m2: 102, total_budsjett: 5880000, verdi_total: 7425000, grunnmur_inkludert: true, soverom: 4, bad: '2', hybel: false },
      { navn: 'Trend', leverandor: 'Systemhus', bra_m2: 141, bya_m2: 88, total_budsjett: 5380000, verdi_total: 6345000, grunnmur_inkludert: true, soverom: 3, bad: '2', hybel: false },
      { navn: 'Rønningen', leverandor: 'Hedalm-Anebyhus', bra_m2: 150, bya_m2: 91, total_budsjett: 6128000, verdi_total: 6750000, grunnmur_inkludert: false, soverom: 4, bad: '1', hybel: false },
      { navn: 'Lyris', leverandor: 'Hedalm-Anebyhus', bra_m2: 155, bya_m2: 88, total_budsjett: 6288000, verdi_total: 6975000, grunnmur_inkludert: false, soverom: 4, bad: '1', hybel: false },
    ],
    regulering: {
      bya_prosent: 30,
      maks_hoyde_m: 8.5,
      maks_etasjer: 2,
      plannavn: 'Kommuneplanens arealdel – Nes',
      beskrivelse: 'Tomten er regulert til boligbebyggelse – frittliggende småhusbebyggelse etter kommuneplanens arealdel for Nes. Maks utnyttelsesgrad er 30 % BYA, som på 847 m² gir 254 m² tillatt bebygd areal. Maksimal gesimshøyde er 8,5 m og maks 2 etasjer. Adkomst via Brøttenga blindvei.',
    },
    nabolag: 'Brøttenga 23 ligger i et etablert boligfelt i Brårud, Nes kommune. Brårud er et lite og rolig tettsted med enkel tilgang til Gardermoen (ca. 25 min) og Oslo via E6 (ca. 50 min). Buss mot Nes og Gardermoen er ca. 400 m unna. Brårud skole og barnehage er i gangavstand. Dagligvare finnes i nærområdet. Rik tilgang til skog og turterreng rett ved tomten, med skiløyper om vinteren.',
    dokumenter: [],
  },
}
