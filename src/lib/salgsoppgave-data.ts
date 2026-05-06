// Salgsoppgave-data for hver tomt – brukes av PDF-generator og API-rute.
// Legg til ny tomt her når du oppretter en ny tomteside.

export interface SalgsoppgaveTomt {
  slug: string
  adresse: string
  poststed: string
  kommune: string
  areal_m2: number
  pris: number
  gnr: number
  bnr: number
  heroImage: string         // absolutt URL (produksjon) eller lokal sti
  visualiseringer: string[] // ekstra bilder – absolutt URL eller lokal sti
  anbefaling: string
  fordeler: string[]
  nokkelFakta: { label: string; verdi: string }[]
  topHusmodeller: {
    navn: string
    leverandor: string
    bra_m2: number
    total_budsjett: number
    verdi_total: number
    grunnmur_inkludert: boolean
  }[]
  regulering: {
    bya_prosent: number
    maks_hoyde_m: number
    maks_etasjer: number
    plannavn: string
  }
  nabolag: string
  dokumenter: { navn: string; url: string }[]
}

const BASE = 'https://tomtly.no'

export const SALGSOPPGAVE_DATA: Record<string, SalgsoppgaveTomt> = {
  'myllavegen-58': {
    slug: 'myllavegen-58',
    adresse: 'Myllavegen 58',
    poststed: 'Grua',
    kommune: 'Lunner',
    areal_m2: 1000,
    pris: 950000,
    gnr: 134, bnr: 85,
    heroImage: `${BASE}/tomter/myllavegen-58/hero.png`,
    visualiseringer: [
      `${BASE}/tomter/myllavegen-58/arwen-visualisering.png`,
      `${BASE}/tomter/myllavegen-58/nelly-visualisering.png`,
      `${BASE}/tomter/myllavegen-58/wide-visualisering.png`,
    ],
    anbefaling: 'Myllavegen 58 er en fradelt boligtomt med lav reguleringsrisiko og avklart infrastruktur. Kommunalt VA er på plass, veirett og avkjøringstillatelse foreligger. Skrånende terreng gir mulighet for underetasje eller sokkeletasje. Tomannsbolig er reguleringsmessig mulig (BYA 30%).',
    fordeler: [
      'Fradeling godkjent av Lunner kommune',
      'Kommunalt vann og avløp tilgjengelig',
      'Veirett og avkjøringstillatelse foreligger',
      '12 husmodeller analysert – totalbudsjett fra kr 5,0 MNOK',
      'Skrånende tomt – egnet for underetasje/sokkeletasje',
      'Tomannsbolig er reguleringsmessig mulig (BYA 30%)',
    ],
    nokkelFakta: [
      { label: 'Tomtestørrelse', verdi: '1 000 m²' },
      { label: 'Pris', verdi: 'kr 950 000' },
      { label: 'Maks BYA', verdi: '30% = 300 m²' },
      { label: 'Maks høyde', verdi: '9 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Regulering', verdi: 'Boligbebyggelse – frittliggende' },
      { label: 'Kommunalt VA', verdi: 'Ja – tilgjengelig' },
      { label: 'GNR/BNR', verdi: '134/85, Lunner' },
    ],
    topHusmodeller: [
      { navn: 'Nelly Skrå', leverandor: 'ABChus', bra_m2: 161, total_budsjett: 6104000, verdi_total: 6440000, grunnmur_inkludert: true },
      { navn: 'Arwen Skrå', leverandor: 'ABChus', bra_m2: 161, total_budsjett: 6471000, verdi_total: 6440000, grunnmur_inkludert: true },
      { navn: 'Signatur 305', leverandor: 'Mesterhus', bra_m2: 147, total_budsjett: 5990000, verdi_total: 5880000, grunnmur_inkludert: true },
      { navn: 'Moholt', leverandor: 'Systemhus', bra_m2: 134, total_budsjett: 5471000, verdi_total: 5360000, grunnmur_inkludert: true },
      { navn: 'Haugli', leverandor: 'Norgeshus', bra_m2: 148, total_budsjett: 5786000, verdi_total: 5920000, grunnmur_inkludert: true },
    ],
    regulering: {
      bya_prosent: 30,
      maks_hoyde_m: 9,
      maks_etasjer: 2,
      plannavn: 'Kommuneplanens arealdel – Lunner',
    },
    nabolag: 'Etablert boligområde i Grua, Lunner kommune. Buss 5 min gange (400 m). Grua skole 8 min gange. Dagligvare 7 min gange. Skog og turområder 2 min gange. Ca. 40 min til Oslo.',
    dokumenter: [
      { navn: 'Situasjonsplan', url: `${BASE}/documents/myllavegen-58/situasjonsplan.pdf` },
      { navn: 'Fradelingsvedtak', url: `${BASE}/documents/myllavegen-58/fradelingsvedtak.pdf` },
      { navn: 'Avkjøringstillatelse', url: `${BASE}/documents/myllavegen-58/avkjoringstillatelse.pdf` },
      { navn: 'Kommuneplanbestemmelser', url: `${BASE}/documents/myllavegen-58/kommuneplanbestemmelser.pdf` },
      { navn: 'DOK-analyse', url: `${BASE}/documents/myllavegen-58/dok-analyse.pdf` },
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
    heroImage: `${BASE}/tomter/gamle-dalsveg-16/perla-norgeshus-visualisering.png`,
    visualiseringer: [
      `${BASE}/tomter/gamle-dalsveg-16/alltid-visualisering.png`,
      `${BASE}/tomter/gamle-dalsveg-16/lilly-visualisering.png`,
      `${BASE}/tomter/gamle-dalsveg-16/nelly-visualisering.png`,
    ],
    anbefaling: 'Gamle Dalsveg 16 A i Maura er en fradelt boligtomt med avklart infrastruktur og lav gjennomføringsrisiko. Med 34 husmodeller fra 7 leverandører er dette et sjeldent bredt utvalg. Nærheten til Jessheim (12 min) og Oslo via E6 gjør eiendommen attraktiv for barnefamilier og pendlere.',
    fordeler: [
      'Fradeling vedtatt av Nannestad kommune',
      'Kommunalt VA – tilkoblingskostnad kjent (kr 98 824)',
      'Geoteknisk rapport utarbeidet – stabil grunn bekreftet',
      '34 husmodeller fra 7 leverandører analysert',
      'Grunnmur inkludert hos 5 av 7 leverandører',
      '12 min til Jessheim, 30 min til Oslo via E6',
    ],
    nokkelFakta: [
      { label: 'Tomtestørrelse', verdi: '564 m²' },
      { label: 'Pris', verdi: 'kr 2 300 000' },
      { label: 'Maks BYA', verdi: '30%' },
      { label: 'Maks høyde', verdi: '9 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Regulering', verdi: 'Boligbebyggelse – frittliggende' },
      { label: 'Kommunalt VA', verdi: 'Ja – kr 98 824' },
      { label: 'GNR/BNR', verdi: '148/166, Nannestad' },
    ],
    topHusmodeller: [
      { navn: 'Åse', leverandor: 'Älvsbyhus', bra_m2: 135, total_budsjett: 6240324, verdi_total: 7155000, grunnmur_inkludert: true },
      { navn: 'Lilly', leverandor: 'ABChus', bra_m2: 135, total_budsjett: 6469324, verdi_total: 7155000, grunnmur_inkludert: true },
      { navn: 'Perla', leverandor: 'Norgeshus', bra_m2: 136, total_budsjett: 6521324, verdi_total: 7208000, grunnmur_inkludert: true },
      { navn: 'All-tid', leverandor: 'Nordbohus', bra_m2: 201, total_budsjett: 8934324, verdi_total: 10653000, grunnmur_inkludert: true },
      { navn: 'Vipp', leverandor: 'Norgeshus', bra_m2: 148, total_budsjett: 6954324, verdi_total: 7844000, grunnmur_inkludert: true },
    ],
    regulering: {
      bya_prosent: 30,
      maks_hoyde_m: 9,
      maks_etasjer: 2,
      plannavn: 'Kommuneplanens arealdel – Nannestad 2024–2040',
    },
    nabolag: 'Etablert boligområde i Maura, Nannestad. Buss mot Jessheim/Oslo 5 min gange. Maura skole 9 min gange. Dagligvare 8 min gange. Skog og turområder 3 min gange. Ca. 30 min til Oslo.',
    dokumenter: [
      { navn: 'Situasjonsplan', url: `${BASE}/documents/gamle-dalsveg-16/situasjonsplan.pdf` },
      { navn: 'Vedtak om fradeling', url: `${BASE}/documents/gamle-dalsveg-16/vedtak-fradeling.pdf` },
      { navn: 'Geoteknisk rapport', url: `${BASE}/documents/gamle-dalsveg-16/geoteknisk-rapport.pdf` },
      { navn: 'VA-kart', url: `${BASE}/documents/gamle-dalsveg-16/va-kart.pdf` },
      { navn: 'DOK-analyse', url: `${BASE}/documents/gamle-dalsveg-16/dok-analyse.pdf` },
    ],
  },
}
