import { TomtHero } from '@/components/tomt/TomtHero'
import { TomtHusmodeller } from '@/components/tomt/TomtHusmodeller'
import { TomtRegulering } from '@/components/tomt/TomtRegulering'
import { TomtRisiko } from '@/components/tomt/TomtRisiko'
import { TomtKart } from '@/components/tomt/TomtKart'
import { TomtKontakt } from '@/components/tomt/TomtKontakt'
import { TomtDeling } from '@/components/tomt/TomtDeling'
import { FileText, Download, Mountain, Droplets, Zap, AlertTriangle } from 'lucide-react'
import { formatNOK } from '@/lib/utils'

// ============================================================
// NEDRE LIAVEI 11 – Holmestrand
// 982 m² fradelt boligtomt (Parsell B), skrånende terreng
// Delesøknad innsendt mars 2026
// ============================================================

const IMG = '/tomter/nedre-liavei-11'

const TOMT_KOSTNADER = [
  { post: 'Tomt (estimat)', belop: 1000000 },
  { post: 'Dokumentavgift (2,5%)', belop: 25000 },
]
const INFRA = [
  { post: 'Grunnarbeider, VA og elektro (estimat)', belop: 600000 },
  { post: 'Tilknytningsgebyr vann og avløp', belop: 46000 },
  { post: 'Saksbehandlingsgebyr ny enebolig', belop: 35000 },
]

const HUSMODELLER = [
  {
    id: 'vindy', navn: 'Vindy', leverandor: 'ABC Hus',
    leverandor_url: 'https://abchus.no/ferdighus/moderne-hus/vindy-for-skra-tomt/',
    beskrivelse: 'Spesialdesignet for skrå tomt – perfekt tilpasset dette terrenget. Åpen stue (27,7 m²) og kjøkken (17,2 m²) i hovedetasjen, tre soverom med bad i underetasjen. Moderne uttrykk med saltak som tilfredsstiller reguleringsplanens krav.',
    bra_m2: 103, soverom: 3, bad: '1 + WC', etasjer: 2,
    ekstra: { 'Tomtetype': 'Skrå tomt', 'Stue': '27,7 m²', 'Kjøkken': '17,2 m²', 'Veranda': 'Ja' },
    pris_hus: 3769000, total_budsjett: 5475000,
    kostnader: [...TOMT_KOSTNADER, { post: 'Vindy – fra ABC Hus', belop: 3769000 }, ...INFRA],
    verdi_bra_m2: 103, verdi_m2_pris: 65000, verdi_total: 6700000,
    inkludert: ['Tilpasset skrå tomt', 'Saltak', '3 soverom', 'Åpen stue/kjøkken', 'WC i hovedetasje', 'Bad i underetasje', 'Veranda'],
    bilder: {
      fasade: [`${IMG}/vindy-bilde.png`, `${IMG}/vindy-fasade-syd.png`, `${IMG}/vindy-fasade-nord.png`, `${IMG}/vindy-fasade-ost.png`, `${IMG}/vindy-fasade-vest.png`],
      plantegninger: [
        { url: `${IMG}/vindy-plan-hovedetasje.png`, label: 'Hovedetasje – stue 27,7 m², kjøkken 17,2 m², WC, veranda' },
        { url: `${IMG}/vindy-plan-underetasje.png`, label: 'Underetasje – 3 soverom, bad/vaskerom, bod, entré' },
      ],
    },
  },
  {
    id: 'moholt', navn: 'Moholt', leverandor: 'Systemhus',
    leverandor_url: 'https://www.systemhus.no/hus/enebolig-moholt',
    beskrivelse: 'Kompakt enebolig med smart romfordeling. Romslig stue og kjøkken (35,9 m²) i første etasje, og to soverom med bad/vaskerom i underetasjen. Moderne fasade med stående kledning og store vindusflater.',
    bra_m2: 103, soverom: 2, bad: '1 + WC', etasjer: 2,
    ekstra: { 'Stue/Kjøkken': '35,9 m²', 'Sportsbod': '5,0 m²', 'Entré': '4,2 m²', 'Bad/Vask': '7,4 m²' },
    pris_hus: 4500000, total_budsjett: 6206000,
    kostnader: [...TOMT_KOSTNADER, { post: 'Moholt – fra Systemhus', belop: 4500000 }, ...INFRA],
    verdi_bra_m2: 103, verdi_m2_pris: 65000, verdi_total: 6700000,
    inkludert: ['Stående kledning', 'Store vindusflater', '2 soverom', 'Åpen stue/kjøkken', 'WC i hovedetasje', 'Bad/vaskerom i underetasje', 'Sportsbod'],
    bilder: {
      fasade: [`${IMG}/moholt-bilde.png`, `${IMG}/moholt-fasade-syd.png`, `${IMG}/moholt-fasade-nord.png`, `${IMG}/moholt-fasade-ost.png`, `${IMG}/moholt-fasade-vest.png`],
      plantegninger: [
        { url: `${IMG}/moholt-plan-1etasje.png`, label: '1. etasje – stue/kjøkken 35,9 m², entré, WC, sportsbod' },
        { url: `${IMG}/moholt-plan-underetasje.png`, label: 'Underetasje – 2 soverom, bad/vaskerom, bod, gang' },
      ],
    },
  },
  {
    id: 'lone', navn: 'Lone', leverandor: 'Konsmohus',
    leverandor_url: 'https://www.konsmohus.no/boligtype/lone/',
    beskrivelse: 'Moderne og kompakt bolig for en liten familie. Luftig stue og kjøkken med skråtak, store vinduer som gir rikelig med dagslys, stor terrasse, carport og sportsbod.',
    bra_m2: 96.7, soverom: 3, bad: '1', etasjer: 1,
    ekstra: { 'BYA': '88,7 m²', 'Carport': 'Inkludert', 'Sportsbod': 'Inkludert', 'Terrasse': 'Stor' },
    pris_hus: 0, total_budsjett: 0,
    kostnader: [...TOMT_KOSTNADER, { post: 'Lone – fra Konsmohus (pris under avklaring)', belop: 0 }, ...INFRA],
    verdi_bra_m2: 97, verdi_m2_pris: 65000, verdi_total: 6300000,
    inkludert: ['Carport', 'Sportsbod', 'Stor terrasse', '3 soverom', 'Åpen stue/kjøkken med skråtak', 'Store vinduer', 'Moderne funkis-design'],
    bilder: {
      fasade: ['https://www.konsmohus.no/wp-content/uploads/2024/09/Lone-Okonomihus-7-Eksterior.jpg'],
      plantegninger: [
        { url: 'https://www.konsmohus.no/wp-content/uploads/2024/09/Lone-Okonomihus-7-Plan-1.jpg', label: 'Plantegning – 3 soverom, stue/kjøkken, bad' },
        { url: 'https://www.konsmohus.no/wp-content/uploads/2024/09/Lone-Fasade-1.jpg', label: 'Fasade 1' },
        { url: 'https://www.konsmohus.no/wp-content/uploads/2024/09/Lone-Fasade-2.jpg', label: 'Fasade 2' },
      ],
    },
  },
]

const TOMT = {
  adresse: 'Nedre Liavei 11',
  poststed: 'Holmestrand',
  kommune: 'Holmestrand',
  areal_m2: 982,
  gnr: 52, bnr: 17,
  senterpunkt: { lat: 59.5043, lng: 10.2469 },

  regulering: {
    arealformaal: 'Boligbebyggelse – åpen, villamessig bebyggelse',
    utnyttelsesgrad_bya: 10, maks_hoyde_m: 0, maks_etasjer: 1, byggegrense_m: 4,
    hensynssoner: [],
    bestemmelser: [
      'Maks utnyttelsesgrad U = 0,10 (tillater inntil 104 m² BRA)',
      'Beregnet U-grad ny parsell: 0,099',
      'Åpen, villamessig bebyggelse',
      '1 etasje + underetasje der terreng tillater',
      'Saltak',
      'Frittliggende garasje',
      'Min. 2 parkeringsplasser',
      'Reguleringsplan: Gullhaug Nord',
      'Vedtatt: 18.04.1980',
    ],
    plannavn: 'Gullhaug Nord', vedtaksdato: '1980-04-18',
  },

  risikoanalyse: {
    total_risiko: 'lav' as const,
    faktorer: [
      { kategori: 'Fradeling', beskrivelse: 'Delesøknad innsendt, dispensasjon søkt', sannsynlighet: 2 as const, konsekvens: 2 as const, risikoverdi: 4, tiltak: 'Kommunen har godkjent tilsvarende fradelinger i området (Nedre Liavei 64, Lerkeveien 8, Nedre Liavei 8B, Jotneveien 7)' },
      { kategori: 'Regulering', beskrivelse: 'Innenfor U-grad 0,10', sannsynlighet: 1 as const, konsekvens: 2 as const, risikoverdi: 2, tiltak: 'Alle husmodeller er innenfor reguleringsplanens rammer' },
      { kategori: 'Grunnforhold', beskrivelse: 'Skrånende tomt, berg i dagen', sannsynlighet: 1 as const, konsekvens: 2 as const, risikoverdi: 2, tiltak: 'Geoteknisk rapport foreligger – tilfredsstillende stabilitet, ingen kvikkleire' },
      { kategori: 'Infrastruktur', beskrivelse: 'VA-tilknytning og vei', sannsynlighet: 1 as const, konsekvens: 1 as const, risikoverdi: 1, tiltak: 'Kommunal VA-infrastruktur etablert i området. VA-plan utarbeidet.' },
    ],
    anbefalinger: [
      'Geoteknisk rapport bekrefter tilfredsstillende grunnforhold',
      'Kommunen har godkjent tilsvarende fradelinger i nærområdet',
      'VA-plan og utomhusplan er ferdig utarbeidet',
      'Vindy fra ABC Hus er spesialdesignet for skrå tomt',
    ],
  },

  dokumenter: [
    { navn: 'D1 – Deleplan', type: 'pdf' },
    { navn: 'D2 – Mulig bebyggelse', type: 'pdf' },
    { navn: 'D3 – Utomhusplan', type: 'pdf' },
    { navn: 'D4 – VA-plan', type: 'pdf' },
    { navn: 'F1 – Følgebrev / redegjørelse', type: 'pdf' },
    { navn: 'F2 – Arealberegninger', type: 'pdf' },
    { navn: 'F3 – Geoteknisk notat', type: 'pdf' },
    { navn: 'F4 – Notat overvann', type: 'pdf' },
    { navn: 'Q2 – DOK-analyse', type: 'pdf' },
    { navn: 'Q3 – Plankart', type: 'pdf' },
  ],
}

export default function NedreLiavei11() {
  return (
    <div className="bg-white">
      <TomtHero adresse={TOMT.adresse} poststed={TOMT.poststed} kommune={TOMT.kommune} areal_m2={TOMT.areal_m2} gnr={TOMT.gnr} bnr={TOMT.bnr} />

      <nav className="sticky top-16 z-40 bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-3 text-sm">
            {[
              { href: '#om-tomten', label: 'Om tomten' },
              { href: '#husmodeller', label: 'Husmodeller' },
              { href: '#kostnader', label: 'Kostnader' },
              { href: '#regulering', label: 'Regulering' },
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

            {/* OM TOMTEN */}
            <section id="om-tomten">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Om tomten</h2>
              <p className="text-brand-600 mb-8">Ny fradelt boligtomt (Parsell B) i etablert boligområde på Gullhaug i Holmestrand.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Mountain className="w-5 h-5 text-tomtly-accent" />
                    <h3 className="font-semibold text-tomtly-dark">Terreng og grunnforhold</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-brand-700">
                    <li className="flex justify-between"><span>Terreng</span><span className="font-semibold text-tomtly-dark">Skrånende</span></li>
                    <li className="flex justify-between"><span>Grunnforhold</span><span className="font-semibold text-tomtly-dark">Berg i dagen / grunt berg (0–4 m)</span></li>
                    <li className="flex justify-between"><span>Kvikkleire</span><span className="font-semibold text-tomtly-dark">Ikke påvist</span></li>
                    <li className="flex justify-between"><span>Stabilitet</span><span className="font-semibold text-tomtly-dark">Tilfredsstillende</span></li>
                  </ul>
                </div>

                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Droplets className="w-5 h-5 text-tomtly-accent" />
                    <h3 className="font-semibold text-tomtly-dark">Infrastruktur</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-brand-700">
                    <li className="flex justify-between"><span>Vann</span><span className="font-semibold text-tomtly-dark">Kommunalt</span></li>
                    <li className="flex justify-between"><span>Avløp</span><span className="font-semibold text-tomtly-dark">Kommunalt</span></li>
                    <li className="flex justify-between"><span>Tilknytning VA</span><span className="font-semibold text-tomtly-dark">kr 46 000</span></li>
                    <li className="flex justify-between"><span>Strøm</span><span className="font-semibold text-tomtly-dark">Tilgjengelig</span></li>
                    <li className="flex justify-between"><span>Vei</span><span className="font-semibold text-tomtly-dark">Nedre Liavei</span></li>
                  </ul>
                </div>

                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-5 h-5 text-tomtly-accent" />
                    <h3 className="font-semibold text-tomtly-dark">Nøkkeltall parsell B</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-brand-700">
                    <li className="flex justify-between"><span>Tomteareal</span><span className="font-semibold text-tomtly-dark">982,1 m²</span></li>
                    <li className="flex justify-between"><span>Maks BRA</span><span className="font-semibold text-tomtly-dark">~103 m²</span></li>
                    <li className="flex justify-between"><span>Maks BYA</span><span className="font-semibold text-tomtly-dark">116 m² (11,8%)</span></li>
                    <li className="flex justify-between"><span>MUA</span><span className="font-semibold text-tomtly-dark">265 m² (25%)</span></li>
                    <li className="flex justify-between"><span>U-grad (beregnet)</span><span className="font-semibold text-tomtly-dark">0,099</span></li>
                  </ul>
                </div>

                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-5 h-5 text-tomtly-accent" />
                    <h3 className="font-semibold text-tomtly-dark">Status fradeling</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-brand-700">
                    <li className="flex justify-between"><span>Delesøknad</span><span className="font-semibold text-green-700">Innsendt</span></li>
                    <li className="flex justify-between"><span>Dispensasjon</span><span className="font-semibold text-green-700">Innsendt</span></li>
                    <li className="flex justify-between"><span>Geoteknisk rapport</span><span className="font-semibold text-green-700">Foreligger</span></li>
                    <li className="flex justify-between"><span>VA-plan</span><span className="font-semibold text-green-700">Utarbeidet</span></li>
                    <li className="flex justify-between"><span>Utomhusplan</span><span className="font-semibold text-green-700">Utarbeidet</span></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* HUSMODELLER */}
            <section id="husmodeller">
              <TomtHusmodeller modeller={HUSMODELLER as any} tomtType="skra" tomtNavn="Nedre Liavei 11 (skrånende tomt)" />
            </section>

            {/* KOSTNADSOVERSLAG */}
            <section id="kostnader">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Kostnadsoverslag</h2>
              <p className="text-brand-600 mb-6">Estimerte totalkostnader inkludert tomt, bolig og infrastruktur.</p>

              <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-tomtly-dark text-white">
                      <th className="text-left py-3 px-4 font-medium text-sm">Post</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Estimat</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="bg-brand-100">
                      <td colSpan={2} className="py-2 px-4 font-semibold text-tomtly-accent">Tomt</td>
                    </tr>
                    <tr className="border-b border-brand-200">
                      <td className="py-2.5 px-4 text-brand-700">Tomt (estimat)</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-tomtly-dark">kr 1 000 000</td>
                    </tr>
                    <tr className="border-b border-brand-200">
                      <td className="py-2.5 px-4 text-brand-700">Dokumentavgift (2,5%)</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-tomtly-dark">kr 25 000</td>
                    </tr>
                    <tr className="bg-brand-100">
                      <td className="py-2.5 px-4 font-semibold text-tomtly-accent">Sum tomt</td>
                      <td className="py-2.5 px-4 text-right font-bold text-tomtly-accent">kr 1 025 000</td>
                    </tr>

                    <tr className="bg-brand-100 border-t-4 border-white">
                      <td colSpan={2} className="py-2 px-4 font-semibold text-tomtly-accent">Infrastruktur</td>
                    </tr>
                    <tr className="border-b border-brand-200">
                      <td className="py-2.5 px-4 text-brand-700">Grunnarbeider, VA og elektro (estimat)</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-tomtly-dark">kr 600 000</td>
                    </tr>
                    <tr className="border-b border-brand-200">
                      <td className="py-2.5 px-4 text-brand-700">Tilknytningsgebyr vann og avløp</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-tomtly-dark">kr 46 000</td>
                    </tr>
                    <tr className="border-b border-brand-200">
                      <td className="py-2.5 px-4 text-brand-700">Saksbehandlingsgebyr ny enebolig</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-tomtly-dark">kr 35 000</td>
                    </tr>
                    <tr className="bg-brand-100">
                      <td className="py-2.5 px-4 font-semibold text-tomtly-accent">Sum infrastruktur</td>
                      <td className="py-2.5 px-4 text-right font-bold text-tomtly-accent">kr 681 000</td>
                    </tr>

                    <tr className="bg-brand-100 border-t-4 border-white">
                      <td colSpan={2} className="py-2 px-4 font-semibold text-tomtly-accent">Bolig (avhengig av valg)</td>
                    </tr>
                    <tr className="border-b border-brand-200">
                      <td className="py-2.5 px-4 text-brand-700">Alt. 1: Vindy (ABC Hus)</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-tomtly-dark">kr 3 769 000</td>
                    </tr>
                    <tr className="border-b border-brand-200">
                      <td className="py-2.5 px-4 text-brand-700">Alt. 2: Moholt (Systemhus)</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-tomtly-dark">kr 4 500 000</td>
                    </tr>
                    <tr className="border-b border-brand-200">
                      <td className="py-2.5 px-4 text-brand-700">Alt. 3: Lone (Konsmohus)</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-tomtly-dark italic">Pris under avklaring</td>
                    </tr>

                    <tr className="bg-tomtly-dark text-white border-t-4 border-white">
                      <td className="py-3 px-4 font-bold">Totalbudsjett med Vindy</td>
                      <td className="py-3 px-4 text-right font-bold text-lg">kr 5 475 000</td>
                    </tr>
                    <tr className="bg-tomtly-dark/90 text-white/80">
                      <td className="py-2.5 px-4 font-medium">Totalbudsjett med Moholt</td>
                      <td className="py-2.5 px-4 text-right font-bold">kr 6 206 000</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 bg-tomtly-warm border-l-4 border-tomtly-gold rounded-r-lg p-4 text-sm text-brand-600">
                <strong className="text-tomtly-dark">Merk:</strong> Tomtepris er et estimat og ikke endelig fastsatt. Grunnarbeider må detaljprosjekteres. Eventuelle tillegg for tilpasninger kommer i tillegg.
                Gebyrregulativ fra{' '}
                <a href="https://holmestrand.kommune.no/om-kommunen/priser-gebyrregulativ/#faqsporsmal-2206" target="_blank" rel="noopener noreferrer" className="text-tomtly-accent underline">
                  Holmestrand kommune
                </a>.
              </div>
            </section>

            {/* REGULERING */}
            <section id="regulering">
              <TomtRegulering regulering={TOMT.regulering} />
            </section>

            {/* DOKUMENTER */}
            <section id="dokumenter">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Dokumentasjon</h2>
              <p className="text-brand-600 mb-6">Følgende dokumenter er utarbeidet i forbindelse med fradelingssøknaden.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {TOMT.dokumenter.map((dok) => (
                  <div key={dok.navn} className="flex items-center gap-3 bg-brand-50 border border-brand-200 rounded-lg p-3">
                    <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <span className="text-sm text-brand-700 flex-1">{dok.navn}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-tomtly-warm border-l-4 border-tomtly-gold rounded-r-lg p-4 text-sm text-brand-600">
                Komplett dokumentasjon kan oversendes på forespørsel. Ta kontakt.
              </div>
            </section>

            {/* RISIKO */}
            <section id="risiko">
              <TomtRisiko risikoanalyse={TOMT.risikoanalyse} />
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-36 space-y-6">
              <TomtKart lat={TOMT.senterpunkt.lat} lng={TOMT.senterpunkt.lng} adresse={TOMT.adresse} zoom={17} />
              <TomtKontakt />
              <TomtDeling adresse={TOMT.adresse} tomteId="nedre-liavei-11" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
