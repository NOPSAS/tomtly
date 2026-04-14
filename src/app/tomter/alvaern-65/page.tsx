import { TomtHero } from '@/components/tomt/TomtHero'
import { TomtRegulering } from '@/components/tomt/TomtRegulering'
import { TomtRisiko } from '@/components/tomt/TomtRisiko'
import { TomtKart } from '@/components/tomt/TomtKart'
import { TomtKontakt } from '@/components/tomt/TomtKontakt'
import { TomtNabolag } from '@/components/tomt/TomtNabolag'
import { TomtDeling } from '@/components/tomt/TomtDeling'
import { FileText, Download, CheckCircle, Quote, Home, Ruler, TreePine, ArrowRight } from 'lucide-react'
import Link from 'next/link'

// ============================================================
// GAMLE ALVÆRNVEI 65 – Alværn, Nesodden
// 1 374 m² tomt – SOLGT via tomtly
// Husmodell: Wide fra ABChus, BRA 207.9 m², pulttak
// Selger: Kjetil Halvorsen
// ============================================================

const IMG = '/tomter/alvaern-65'

const TOMT = {
  adresse: 'Gamle Alværnvei 65',
  poststed: 'Alværn',
  kommune: 'Nesodden',
  areal_m2: 1374,
  gnr: 30, bnr: 45,
  senterpunkt: { lat: 59.8153, lng: 10.6192 },

  regulering: {
    arealformaal: 'Boligbebyggelse – åpen småhusbebyggelse (B4)',
    utnyttelsesgrad_bya: 20, maks_hoyde_m: 9, maks_etasjer: 2, byggegrense_m: 4,
    hensynssoner: [],
    bestemmelser: [
      'Maks BYA 20% (454,8 m²)',
      'Maks gesimshøyde 9,0 m',
      'Faktisk gesimshøyde: 5,7–8,66 m (godt innenfor)',
      'Underetasje tillatt der terrenget tillater det',
      'Reguleringsplan: Vestfjordtomtene – søndre del (Plan nr. 111)',
      'Vedtatt 15.12.2005',
    ],
    plannavn: 'Vestfjordtomtene – søndre del', vedtaksdato: '2005-12-15',
  },

  risikoanalyse: {
    total_risiko: 'lav' as const,
    faktorer: [
      { kategori: 'Regulering', beskrivelse: 'B4 åpen småhusbebyggelse. To dispensasjoner innvilget for rekkefølgekrav.', sannsynlighet: 1 as const, konsekvens: 1 as const, risikoverdi: 1, tiltak: 'BYA 9,7% av 20% tillatt – stor margin' },
      { kategori: 'Grunnforhold', beskrivelse: 'Fjell/morene, normal skråning', sannsynlighet: 2 as const, konsekvens: 2 as const, risikoverdi: 4, tiltak: 'Grunnundersøkelse utført' },
      { kategori: 'Byggesøknad', beskrivelse: 'Rammetillatelse søkt av Tegnebua', sannsynlighet: 1 as const, konsekvens: 1 as const, risikoverdi: 1, tiltak: 'Profesjonell søknad, komplett dokumentasjon' },
      { kategori: 'Nabovarsling', beskrivelse: 'Gjennomført uten merknader', sannsynlighet: 1 as const, konsekvens: 1 as const, risikoverdi: 1, tiltak: 'Ingen naboprotester mottatt' },
    ],
    anbefalinger: [
      'Svært lav risiko – alle godkjenninger på plass',
      'BYA-utnyttelse kun 9,7% gir mulighet for fremtidig utbygging',
      'Rammetillatelse søkt – kjøper overtar med trygghet',
    ],
  },

  nabolag: {
    beskrivelse: 'Alværn på Nesodden. Fantastisk fjordutsikt (+81 moh), etablert boligområde med naturskjønne omgivelser. Kort vei til Tangen brygge og båt til Oslo.',
    punkter: [
      { kategori: 'Kollektivtransport', navn: 'Buss til Tangen/Oslo', avstand_m: 300, gangminutter: 4 },
      { kategori: 'Kollektivtransport', navn: 'Tangen brygge (båt til Oslo)', avstand_m: 2000, gangminutter: 25 },
      { kategori: 'Skole', navn: 'Alværn ungdomsskole', avstand_m: 800, gangminutter: 10 },
      { kategori: 'Dagligvare', navn: 'Dagligvare Nesoddtangen', avstand_m: 1500, gangminutter: 18 },
      { kategori: 'Park/friområde', navn: 'Skog og turområder', avstand_m: 50, gangminutter: 1 },
      { kategori: 'Badeplass', navn: 'Fjorden / badeplass', avstand_m: 1200, gangminutter: 15 },
    ],
  },

  dokumenter: [
    { navn: 'Situasjonsplan', url: '/documents/alvaernveien-65/situasjonsplan.pdf' },
    { navn: 'Reguleringsbestemmelser (Plan 111)', url: '/documents/alvaernveien-65/reguleringsbestemmelser.pdf' },
    { navn: 'Rammetillatelse-søknad', url: '/documents/alvaernveien-65/rammetillatelse-soknad.pdf' },
    { navn: 'Fasadetegninger Wide', url: '/documents/alvaernveien-65/fasadetegninger-wide.pdf' },
    { navn: 'Plantegninger Wide', url: '/documents/alvaernveien-65/plantegninger-wide.pdf' },
    { navn: 'Snittegninger', url: '/documents/alvaernveien-65/snittegninger.pdf' },
  ],
}

const SALGSPROSESS = [
  { tid: 'Uke 1', tittel: 'Tomteanalyse', beskrivelse: 'Tomtly gjennomførte komplett analyse: regulering, arealberegninger, husmodeller og verdivurdering.' },
  { tid: 'Uke 2', tittel: 'Husmodell valgt', beskrivelse: 'Wide fra ABChus ble valgt – pulttak, 207,9 m² BRA. Perfekt for tomten og reguleringsplanen.' },
  { tid: 'Uke 3', tittel: 'Tegnebua koblet på', beskrivelse: 'Tegnebua tegnet situasjonsplan, fasader og plantegninger. Tilpasset Wide til tomtens terreng.' },
  { tid: 'Uke 4–5', tittel: 'Nabovarsling', beskrivelse: '14 dagers nabovarsling gjennomført. Ingen merknader mottatt fra naboer.' },
  { tid: 'Uke 6', tittel: 'Rammetillatelse søkt', beskrivelse: 'Tegnebua sendte komplett søknad om rammetillatelse til Nesodden kommune.' },
  { tid: 'Uke 7–8', tittel: 'Annonsering og visning', beskrivelse: 'Tomten ble annonsert på Tomtly.no med komplett tomterapport, husmodell og tegninger. Interessenter kontaktet.' },
  { tid: 'Uke 9', tittel: 'SOLGT', beskrivelse: 'Salg gjennomført. Oppgjør håndtert av profesjonell oppgjørspartner. Kjetil solgte selv med Tomtly sine verktøy.' },
]

const AREALBEREGNINGER = {
  bya: [
    { post: 'Bolig (Wide)', verdi: '~220 m²' },
    { post: 'Tillatt BYA (20%)', verdi: '454,8 m²' },
    { post: 'Faktisk BYA', verdi: '~220 m²' },
    { post: 'Utnyttelsesgrad', verdi: '9,7%' },
    { post: 'Gjenværende BYA', verdi: '~235 m²' },
  ],
  bra: [
    { post: 'BRA bolig (Wide)', verdi: '207,9 m²' },
    { post: 'Antall etasjer', verdi: '2' },
    { post: 'Taktype', verdi: 'Pulttak' },
  ],
  hoyde: [
    { post: 'Maks gesimshøyde (regulering)', verdi: '9,0 m' },
    { post: 'Faktisk gesimshøyde (laveste)', verdi: '5,7 m' },
    { post: 'Faktisk gesimshøyde (høyeste)', verdi: '8,66 m' },
    { post: 'Margin', verdi: '0,34 m (OK)' },
  ],
}

export default function Alvaern65() {
  return (
    <div className="bg-white">
      {/* Hero with SOLGT badge */}
      <div className="relative">
        <TomtHero
          adresse={TOMT.adresse}
          poststed={TOMT.poststed}
          kommune={TOMT.kommune}
          areal_m2={TOMT.areal_m2}
          gnr={TOMT.gnr}
          bnr={TOMT.bnr}
        />
        <div className="absolute top-8 right-8 z-30">
          <div className="bg-red-600 text-white font-display text-2xl font-black px-8 py-3 rounded-md shadow-lg border-4 border-red-700 opacity-90"
               style={{ transform: 'rotate(-5deg)' }}>
            SOLGT
          </div>
        </div>
      </div>

      {/* Sticky nav */}
      <nav className="sticky top-16 z-40 bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto py-3 text-sm">
            {[
              { href: '#kundehistorie', label: 'Kundehistorie' },
              { href: '#husmodell', label: 'Husmodell' },
              { href: '#regulering', label: 'Regulering' },
              { href: '#arealberegninger', label: 'Areal' },
              { href: '#nabolag', label: 'Nabolag' },
              { href: '#risiko', label: 'Risiko' },
              { href: '#salgsprosess', label: 'Slik solgte vi' },
              { href: '#dokumenter', label: 'Dokumenter' },
            ].map((l) => (
              <a key={l.href} href={l.href} className="whitespace-nowrap text-brand-500 hover:text-tomtly-accent transition-colors font-medium">{l.label}</a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* === Main content (left 2/3) === */}
          <div className="lg:col-span-2 space-y-16">

            {/* ---- 1. Kundehistorie / Testimonial ---- */}
            <section id="kundehistorie">
              <div className="bg-tomtly-warm border border-tomtly-gold/30 rounded-2xl p-8 md:p-10">
                <div className="flex items-start gap-4 mb-6">
                  <Quote className="w-10 h-10 text-tomtly-gold flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="font-display text-2xl font-bold text-tomtly-dark">Kundehistorie</h2>
                    <p className="text-brand-600 text-sm mt-1">Gamle Alværnvei 65 – solgt via Tomtly</p>
                  </div>
                </div>

                <blockquote className="text-lg text-brand-700 leading-relaxed mb-6 italic">
                  &ldquo;Jeg hadde en stor tomt jeg ønsket å selge, men visste ikke helt hvordan jeg skulle presentere den for kjøpere.
                  Tomtly tok seg av alt – analyse av reguleringsplanen, valg av husmodell, tegninger via Tegnebua og til
                  og med nabovarsling og rammetillatelse. Da tomten ble lagt ut hadde den komplett dokumentasjon og en
                  ferdig husmodell. Det gjorde salget mye enklere.&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-tomtly-accent/10 flex items-center justify-center">
                    <span className="text-tomtly-accent font-bold text-lg">KH</span>
                  </div>
                  <div>
                    <p className="font-semibold text-tomtly-dark">Kjetil Halvorsen</p>
                    <p className="text-sm text-brand-500">Selger, Gamle Alværnvei 65</p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Salgspris', value: '3 200 000 kr' },
                    { label: 'Tomteareal', value: '1 374 m²' },
                    { label: 'Tid til salg', value: '~9 uker' },
                    { label: 'Oppgjør', value: 'Proff Oppgjør' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white rounded-lg p-3 text-center">
                      <p className="text-xs text-brand-500 uppercase tracking-wide">{s.label}</p>
                      <p className="font-display font-bold text-tomtly-dark mt-1">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ---- 2. Husmodellen ---- */}
            <section id="husmodell">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Husmodell: Wide fra ABChus</h2>
              <p className="text-brand-600 mb-6">Funksjonelt pulttak-hus med 207,9 m² BRA – valgt og tilpasset for denne tomten.</p>

              <div className="bg-brand-50 border border-brand-200 rounded-2xl overflow-hidden">
                <div className="aspect-video bg-brand-100 relative">
                  <img
                    src={`${IMG}/render-cam-01.jpg`}
                    alt="Wide fra ABChus – fasade"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-tomtly-accent text-white text-xs font-bold px-3 py-1 rounded-full">
                    ABChus
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    {[
                      { icon: Home, label: 'BRA', value: '207,9 m²' },
                      { icon: Ruler, label: 'Etasjer', value: '2' },
                      { icon: Home, label: 'Taktype', value: 'Pulttak' },
                      { icon: TreePine, label: 'BYA-utnyttelse', value: '9,7%' },
                    ].map((item) => (
                      <div key={item.label} className="text-center">
                        <item.icon className="w-5 h-5 mx-auto text-tomtly-accent mb-1" />
                        <p className="text-xs text-brand-500">{item.label}</p>
                        <p className="font-semibold text-tomtly-dark">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  <p className="text-brand-700 mb-4">
                    Wide er et moderne funkishus fra ABChus med pulttak og romslig planløsning over to etasjer.
                    Med 207,9 m² BRA gir det god plass til en familie, med åpen stue/kjøkken-løsning,
                    flere soverom og fleksible rom som kan tilpasses behovet.
                  </p>

                  <p className="text-brand-700 mb-4">
                    Huset ble plassert med omhu av Tegnebua for å utnytte tomtens terreng og utsiktsforhold.
                    Pulttak-designet gir et moderne uttrykk og muliggjør store vindusflater mot fjorden.
                  </p>

                  <div className="bg-white rounded-lg p-4 border border-brand-200">
                    <h3 className="font-semibold text-tomtly-dark text-sm mb-3">Nøkkeltall husmodell</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {[
                        ['Leverandør', 'ABChus'],
                        ['Modell', 'Wide'],
                        ['BRA', '207,9 m²'],
                        ['Etasjer', '2'],
                        ['Taktype', 'Pulttak'],
                        ['BYA (fotavtrykk)', '~220 m²'],
                        ['Utnyttelsesgrad', '9,7% av 20% tillatt'],
                        ['Gesimshøyde', '5,7–8,66 m (maks 9,0 m)'],
                      ].map(([label, value]) => (
                        <div key={label} className="flex justify-between py-1 border-b border-brand-100">
                          <span className="text-brand-500">{label}</span>
                          <span className="font-medium text-tomtly-dark">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <a
                      href="https://abchus.no/ferdighus/funkishus/wide/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-tomtly-accent hover:underline font-medium flex items-center gap-1"
                    >
                      Se Wide hos ABChus <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Plantegninger */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-brand-50 border border-brand-200 rounded-lg overflow-hidden">
                  <img src={`${IMG}/wide-stue.jpg`} alt="Wide – stue med panoramautsikt" className="w-full" />
                  <p className="text-xs text-brand-500 p-3">1. etasje – stue, kjøkken, entré</p>
                </div>
                <div className="bg-brand-50 border border-brand-200 rounded-lg overflow-hidden">
                  <img src={`${IMG}/wide-kjokken.jpg`} alt="Wide – kjøkken" className="w-full" />
                  <p className="text-xs text-brand-500 p-3">2. etasje – soverom, bad</p>
                </div>
              </div>
            </section>

            {/* ---- 3. Reguleringsanalyse ---- */}
            <section id="regulering">
              <TomtRegulering regulering={TOMT.regulering} />

              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-6">
                <h3 className="font-semibold text-amber-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Dispensasjoner innvilget
                </h3>
                <p className="text-sm text-amber-700 mb-4">
                  For dette prosjektet ble det innvilget to dispensasjoner fra Nesodden kommune:
                  1. Midlertidig dispensasjon fra pbl. §18.1 – krav til opparbeidelse av vei (Gamle Alværnvei ikke opparbeidet til regulert standard)
                  2. Dispensasjon fra reguleringsbestemmelse §1.2.1 og §1.2.2 – rekkefølgekrav om fortau langs Orreholtet og Lindemannsvei
                  Tomtly og Tegnebua utarbeidet dispensasjonssøknaden som del av byggesøknaden.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { param: 'BYA', krav: 'Maks 20% (454,8 m²)', faktisk: '~220 m² (9,7%)', status: 'OK' },
                    { param: 'Gesimshøyde', krav: 'Maks 9,0 m', faktisk: '5,7–8,66 m', status: 'OK' },
                    { param: 'Etasjer', krav: 'Maks 2', faktisk: '2', status: 'OK' },
                  ].map((r) => (
                    <div key={r.param} className="bg-white rounded-lg p-3 border border-green-200">
                      <p className="text-xs text-green-600 font-medium uppercase">{r.param}</p>
                      <p className="text-sm text-brand-700 mt-1">Krav: {r.krav}</p>
                      <p className="text-sm text-brand-700">Faktisk: {r.faktisk}</p>
                      <p className="text-xs font-bold text-green-700 mt-1">{r.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ---- 4. Arealberegninger ---- */}
            <section id="arealberegninger">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Arealberegninger</h2>
              <p className="text-brand-600 mb-6">Detaljerte beregninger for BYA, BRA og høyder.</p>

              <div className="space-y-6">
                {/* BYA-tabell */}
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <h3 className="font-semibold text-tomtly-dark mb-3">BYA (bebygd areal)</h3>
                  <div className="space-y-2">
                    {AREALBEREGNINGER.bya.map((rad) => (
                      <div key={rad.post} className="flex justify-between py-2 border-b border-brand-200 last:border-0 text-sm">
                        <span className="text-brand-600">{rad.post}</span>
                        <span className="font-mono font-semibold text-tomtly-dark">{rad.verdi}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 bg-green-100 rounded-lg p-3">
                    <p className="text-sm text-green-800 font-medium">
                      Kun 9,7% utnyttelse av tillatt 20% — over 235 m² gjenværende BYA for garasje, bod, terrasse etc.
                    </p>
                  </div>
                </div>

                {/* BRA-tabell */}
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <h3 className="font-semibold text-tomtly-dark mb-3">BRA (bruksareal)</h3>
                  <div className="space-y-2">
                    {AREALBEREGNINGER.bra.map((rad) => (
                      <div key={rad.post} className="flex justify-between py-2 border-b border-brand-200 last:border-0 text-sm">
                        <span className="text-brand-600">{rad.post}</span>
                        <span className="font-mono font-semibold text-tomtly-dark">{rad.verdi}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Høyde-tabell */}
                <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
                  <h3 className="font-semibold text-tomtly-dark mb-3">Gesimshøyde</h3>
                  <div className="space-y-2">
                    {AREALBEREGNINGER.hoyde.map((rad) => (
                      <div key={rad.post} className="flex justify-between py-2 border-b border-brand-200 last:border-0 text-sm">
                        <span className="text-brand-600">{rad.post}</span>
                        <span className="font-mono font-semibold text-tomtly-dark">{rad.verdi}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ---- 5. Nabolag ---- */}
            <section id="nabolag">
              <TomtNabolag punkter={TOMT.nabolag.punkter} nabolag_beskrivelse={TOMT.nabolag.beskrivelse} />
            </section>

            {/* ---- 6. Risikoanalyse ---- */}
            <section id="risiko">
              <TomtRisiko risikoanalyse={TOMT.risikoanalyse} />
            </section>

            {/* ---- 7. Slik solgte vi – Timeline ---- */}
            <section id="salgsprosess">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Slik solgte vi Gamle Alværnvei 65</h2>
              <p className="text-brand-600 mb-6">
                Fra første analyse til gjennomført salg – steg for steg med tomtly.
              </p>

              <div className="space-y-4">
                {SALGSPROSESS.map((s, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        idx === SALGSPROSESS.length - 1
                          ? 'bg-red-600 text-white'
                          : 'bg-tomtly-accent text-white'
                      }`}>
                        {idx + 1}
                      </div>
                      {idx < SALGSPROSESS.length - 1 && <div className="w-0.5 flex-1 bg-brand-200 mt-1" />}
                    </div>
                    <div className="pb-6 flex-1">
                      <p className="text-xs font-semibold text-tomtly-accent uppercase tracking-wide">{s.tid}</p>
                      <h3 className="font-semibold text-tomtly-dark mt-0.5">{s.tittel}</h3>
                      <p className="text-sm text-brand-600 mt-0.5">{s.beskrivelse}</p>
                      {idx === SALGSPROSESS.length - 1 && (
                        <div className="mt-2 inline-block bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                          SOLGT for 3 200 000 kr
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ---- 8. Dokumenter ---- */}
            <section id="dokumenter">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Dokumenter</h2>
              <p className="text-brand-600 mb-6">All dokumentasjon for salget av Gamle Alværnvei 65.</p>
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

            {/* ---- 9. Tegnebua-seksjon ---- */}
            <section id="tegnebua">
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6 md:p-8">
                <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Tegning og byggesøknad</h2>
                <p className="text-brand-600 mb-6">Tegnebua tegnet og søkte rammetillatelse for dette prosjektet.</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-tomtly-dark">Situasjonsplan</p>
                      <p className="text-sm text-brand-600">Plassering av Wide på tomten med adkomst, parkering og utearealer.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-tomtly-dark">Fasadetegninger</p>
                      <p className="text-sm text-brand-600">Alle fire fasader tegnet med høyder og materialvalg.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-tomtly-dark">Snittegninger</p>
                      <p className="text-sm text-brand-600">Terrengsnitt med gesimshøyder: 5,7–8,66 m (innenfor maks 9,0 m).</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-tomtly-dark">Nabovarsling gjennomført</p>
                      <p className="text-sm text-brand-600">14 dagers nabovarsling uten merknader.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-tomtly-dark">Rammetillatelse søkt</p>
                      <p className="text-sm text-brand-600">Komplett søknad sendt til Nesodden kommune.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ---- 10. CTA ---- */}
            <section className="bg-tomtly-dark rounded-2xl p-8 md:p-10 text-center">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                Har du en tomt du vil selge?
              </h2>
              <p className="text-brand-300 mb-6 max-w-lg mx-auto">
                Tomtly hjelper deg med analyse, husmodeller, tegninger og salg.
                Du selger selv – vi gir deg verktøyene. Oppgjør via Proff Oppgjør AS.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/for-tomteeiere"
                  className="bg-tomtly-accent text-white font-semibold px-6 py-3 rounded-lg hover:bg-tomtly-accent/90 transition-colors"
                >
                  Selg din tomt med tomtly
                </Link>
                <Link
                  href="/tomter"
                  className="bg-white/10 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Se andre tomter
                </Link>
              </div>
            </section>
          </div>

          {/* === Sidebar (right 1/3) === */}
          <div className="lg:col-span-1">
            <div className="sticky top-36 space-y-6">

              {/* SOLGT-boks */}
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center">
                <div className="inline-block bg-red-600 text-white font-display text-xl font-black px-6 py-2 rounded-md mb-4"
                     style={{ transform: 'rotate(-3deg)' }}>
                  SOLGT
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-brand-500 uppercase tracking-wide">Salgspris</p>
                    <p className="font-display text-2xl font-bold text-tomtly-dark">3 200 000 kr</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-brand-500">Tomt</p>
                      <p className="font-semibold text-tomtly-dark">1 374 m²</p>
                    </div>
                    <div>
                      <p className="text-xs text-brand-500">Gnr/bnr</p>
                      <p className="font-semibold text-tomtly-dark">30/45</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-red-200">
                    <p className="text-xs text-brand-500">Solgt via</p>
                    <p className="font-semibold text-tomtly-dark">Tomtly</p>
                  </div>
                </div>
              </div>

              {/* Kart */}
              <TomtKart lat={TOMT.senterpunkt.lat} lng={TOMT.senterpunkt.lng} adresse={TOMT.adresse} zoom={17} />

              {/* Andre tomter */}
              <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
                <h3 className="font-semibold text-tomtly-dark mb-3">Andre tomter i området</h3>
                <div className="space-y-3">
                  <Link href="/tomter/alvaern-67" className="block bg-white rounded-lg p-3 border border-brand-200 hover:border-tomtly-accent transition-colors">
                    <p className="font-medium text-tomtly-dark text-sm">Gamle Alværnvei 67</p>
                    <p className="text-xs text-brand-500">900 m² · 3 200 000 kr · Til salgs</p>
                  </Link>
                  <Link href="/tomter/bjornemyrveien-20" className="block bg-white rounded-lg p-3 border border-brand-200 hover:border-tomtly-accent transition-colors">
                    <p className="font-medium text-tomtly-dark text-sm">Bjørnemyrveien 20</p>
                    <p className="text-xs text-brand-500">605 m² · 3 000 000 kr · Bjørnemyr, Nesodden</p>
                  </Link>
                  <Link href="/tomter/bjornemyrveien-22" className="block bg-white rounded-lg p-3 border border-brand-200 hover:border-tomtly-accent transition-colors">
                    <p className="font-medium text-tomtly-dark text-sm">Bjørnemyrveien 22</p>
                    <p className="text-xs text-brand-500">613 m² · 3 000 000 kr · Bjørnemyr, Nesodden</p>
                  </Link>
                </div>
              </div>

              {/* Kontakt */}
              <TomtKontakt />
              <TomtDeling adresse={TOMT.adresse} tomteId="alvaern-65" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
