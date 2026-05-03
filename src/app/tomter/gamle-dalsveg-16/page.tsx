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

const IMG = '/tomter/gamle-dalsveg-16'

const BILDER = [
  { id: 'b1', url: `${IMG}/situasjonskart.png`, alt: 'Situasjonskart – Gamle Dalsveg 16', kategori: 'tomt' as const },
  { id: 'b2', url: `${IMG}/deleplan.png`, alt: 'Deleplan – fradelt parsell', kategori: 'tomt' as const },
  { id: 'b3', url: `${IMG}/va-kart.png`, alt: 'VA-kart', kategori: 'tomt' as const },
  { id: 'b4', url: `${IMG}/luftig-fasade-1.jpg`, alt: 'Nordbohus Luftig – fasade', kategori: 'annet' as const },
  { id: 'b5', url: `${IMG}/perla-fasade-1.jpg`, alt: 'Norgeshus Perla – fasade', kategori: 'annet' as const },
  { id: 'b6', url: `${IMG}/vipp-fasade-1.jpg`, alt: 'Norgeshus Vipp – fasade', kategori: 'annet' as const },
  { id: 'b7', url: `${IMG}/rognheim-fasade-1.jpg`, alt: 'Norgeshus Rognheim – fasade', kategori: 'annet' as const },
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
    verdi_bra_m2: 166, verdi_m2_pris: 50000, verdi_total: 8300000,
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
    verdi_bra_m2: 143, verdi_m2_pris: 50000, verdi_total: 7150000,
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
    verdi_bra_m2: 113, verdi_m2_pris: 50000, verdi_total: 5650000,
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
    verdi_bra_m2: 151, verdi_m2_pris: 50000, verdi_total: 7550000,
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
    verdi_bra_m2: 140, verdi_m2_pris: 50000, verdi_total: 7000000,
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
    verdi_bra_m2: 161, verdi_m2_pris: 50000, verdi_total: 8050000,
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
    verdi_bra_m2: 157, verdi_m2_pris: 50000, verdi_total: 7850000,
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
    verdi_bra_m2: 146, verdi_m2_pris: 50000, verdi_total: 7300000,
    inkludert: ['Grunnmur inkludert', 'Komplett hus innflyttingsklart', 'Kjøkken med hvitevarer', 'Baderomsinnredning', 'Parkett', 'Flislagte våtrom', 'El-leveranse'],
    bilder: {
      fasade: [`${IMG}/rognheim-fasade-1.jpg`],
      plantegninger: [
        { url: `${IMG}/rognheim-plan-1etg.jpg`, label: '1. etasje' },
        { url: `${IMG}/rognheim-plan-2etg.jpg`, label: '2. etasje' },
      ],
    },
  },
]

const TOMT = {
  adresse: 'Gamle Dalsveg 16',
  poststed: 'Maura',
  kommune: 'Nannestad',
  areal_m2: 905,
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
      'Alle 8 husmodeller har grunnmur inkludert i husmodellprisen',
      'Kommunalt VA bekreftet med kjente tilkoblingskostnader (98 824 kr)',
      'Avkjøringstillatelse fra Gamle Dalsveg foreligger',
    ],
  },

  nabolag: {
    beskrivelse: 'Etablert boligområde i Maura, Nannestad kommune. Ca. 5 min til Jessheim og E6. Kort vei til barnehage, skole og dagligvare.',
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
    { navn: 'Avkjøringstillatelse', url: '/documents/gamle-dalsveg-16/avkoringstillatelse.pdf' },
    { navn: 'DOK-analyse', url: '/documents/gamle-dalsveg-16/dok-analyse.pdf' },
  ],
}

const TIDSPLAN = [
  { tid: 'Uke 1', tittel: 'Kjøp av tomt', beskrivelse: 'Avtale signeres. Overtakelse etter nærmere avtale.' },
  { tid: 'Uke 2–3', tittel: 'Velg husmodell', beskrivelse: 'Gjennomgang av husmodeller med Tomtly. Kontakt med Nordbohus eller Norgeshus.' },
  { tid: 'Uke 3–4', tittel: 'Tegning og søknad', beskrivelse: 'Tegnebua utarbeider tegninger og sender byggesøknad til Nannestad kommune.' },
  { tid: 'Uke 4–16', tittel: 'Saksbehandling', beskrivelse: 'Kommunal behandling. Typisk 8–12 uker i Nannestad.' },
  { tid: 'Uke 16–18', tittel: 'Produksjon starter', beskrivelse: 'Husleverandør starter produksjon. Grunnarbeid forberedes.' },
  { tid: 'Uke 18–44', tittel: 'Bygging', beskrivelse: 'Huset monteres og ferdigstilles. Fra kjøp til nøkkel ca. 12 måneder.' },
]

export default function GamleDalsveg16() {
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
            <section id="husmodeller"><TomtHusmodeller modeller={HUSMODELLER as any} tomtType="flat" tomtNavn="Gamle Dalsveg 16" /></section>
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
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-36 space-y-6">
              <TomtKart lat={TOMT.senterpunkt.lat} lng={TOMT.senterpunkt.lng} adresse="Gamle Dalsveg 16, 2032 Maura" zoom={17} />
              <TomtKontakt />
              <TomtDeling adresse={TOMT.adresse} tomteId="gamle-dalsveg-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
