import {
  Download, ExternalLink, CheckCircle2, Mail, Phone,
  FileText, TrendingUp, Users, Zap, Globe,
  Handshake, BarChart3, Shield, AlertCircle, Home,
  MessageSquare, Layers, Star,
} from 'lucide-react'

const DOCS = [
  { fil: 'soknad-in-markedsavklaring', tittel: 'Søknad – IN Markedsavklaring', type: 'Innovasjon Norge', farge: 'bg-[#2d5a3d] text-white', hoved: true },
  { fil: 'soknad-skattefunn', tittel: 'Søknad – Skattefunn', type: 'Skattefunn', farge: 'bg-blue-700 text-white', hoved: true },
  { fil: 'one-pager', tittel: 'One-pager', type: 'Pitch', farge: 'bg-[#c4a35a] text-white', hoved: true },
  { fil: 'executive-summary', tittel: 'Executive Summary (EN)', type: 'Pitch', farge: 'bg-gray-700 text-white', hoved: false },
  { fil: 'prosjektbeskrivelse', tittel: 'Fullstendig prosjektbeskrivelse', type: 'Dokument', farge: 'bg-gray-100 text-gray-800', hoved: false },
  { fil: 'markedsanalyse', tittel: 'Markedsanalyse', type: 'Dokument', farge: 'bg-gray-100 text-gray-800', hoved: false },
  { fil: 'budsjett', tittel: 'Budsjett og finansieringsplan', type: 'Dokument', farge: 'bg-gray-100 text-gray-800', hoved: false },
  { fil: 'milepæler', tittel: 'Milepæler og fremdriftsplan', type: 'Dokument', farge: 'bg-gray-100 text-gray-800', hoved: false },
  { fil: 'risikoanalyse', tittel: 'Risikoanalyse', type: 'Dokument', farge: 'bg-gray-100 text-gray-800', hoved: false },
]

export default function ProsjektPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ─── HERO ─── */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="flex items-center gap-3 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.svg" alt="Tomtly" className="h-7" />
            <span className="text-white/30">|</span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">Finansieringsprosjekt · Mai 2026</span>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#2d5a3d]/30 border border-[#2d5a3d]/50 rounded-full px-4 py-1.5 mb-5">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-300 font-medium">4 betalende kunder · Live produkt</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-5">
              Plattformen som selger{' '}
              <span style={{ color: '#c4a35a' }}>tomter andre ikke klarer</span>
            </h1>

            <p className="text-lg text-white/70 leading-relaxed mb-3">
              Alle 4 av Tomtlys første kunder hadde forsøkt å selge tomten på{' '}
              <strong className="text-white">Finn.no uten å lykkes</strong>. Med Tomtly fikk de analyse,
              husmodeller, kostnadsoverslag, visualiseringer og en platform for kjøperkommunikasjon.
            </p>
            <p className="text-base text-white/50 leading-relaxed mb-8">
              Vi søker <strong className="text-white/80">750 000 kr i innovasjonstilskudd</strong> fra Innovasjon Norge
              for å skalere dette til B2B-markedet.
            </p>

            <div className="flex flex-wrap gap-3">
              <a href="#dokumenter" className="flex items-center gap-2 px-5 py-2.5 bg-[#2d5a3d] hover:bg-[#3a7050] text-white font-semibold rounded-xl transition-colors text-sm">
                <Download className="w-4 h-4" /> Last ned dokumenter
              </a>
              <a href="mailto:jakob@tegnebua.no" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-sm">
                <Mail className="w-4 h-4" /> Ta kontakt
              </a>
              <a href="https://tomtly.no/prototype" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-sm">
                <ExternalLink className="w-4 h-4" /> Live demo
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="border-t border-white/10">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {[
                { val: '4', label: 'Betalende kunder', sub: 'Alle fra Finn.no-fiasko' },
                { val: '2% + mva', label: 'Suksesshonorar', sub: 'Av tomtens salgspris' },
                { val: '356', label: 'Kommuner dekket', sub: 'Komplett reguleringsanalyse' },
                { val: '750 000 kr', label: 'Søknadsbeløp', sub: 'Innovasjon Norge' },
              ].map(s => (
                <div key={s.label} className="text-center py-5 px-4">
                  <p className="text-2xl font-bold" style={{ color: '#c4a35a' }}>{s.val}</p>
                  <p className="text-xs font-semibold text-white mt-0.5">{s.label}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEMET ─── */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-[#2d5a3d]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#2d5a3d]">Problemet</p>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-6">Tomteselgere mislykkes på Finn.no – fordi kjøpere ikke forstår hva de kjøper</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 leading-relaxed mb-5">
                En tomt er ikke en leilighet. Verdien avhenger helt av hva som <em>kan</em> bygges, hva det koster,
                og hva sluttresultatet kan selges for. Uten denne informasjonen er en Finn-annonse meningsløs for kjøperen.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                Resultatet: tusenvis av tomter annonseres og trekker null seriøse bud.
                Informasjonen som trengs finnes – men er spredt over 15+ offentlige databaser
                og krever 2–5 dagers manuelt arbeid å samle.
              </p>
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <p className="font-bold text-sm text-[#1a1a1a]">Typisk Finn.no-annonse</p>
                </div>
                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 mb-3 italic">
                  «Regulert byggeklar tomt til salgs. 800 m². Bud ønskes.»
                </p>
                <p className="text-xs text-gray-400">Ingen info om hva som kan bygges · Ingen kostnader · Ingen visualisering</p>
                <p className="text-sm font-semibold text-red-600 mt-2">→ 0 seriøse bud. Tomten trekkes tilbake.</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-[#2d5a3d] uppercase tracking-wide mb-2">Hva kjøperen faktisk trenger å vite</p>
              {[
                ['Reguleringsplan', 'Hva kan jeg bygge? Hva er BYA-grensen? Hva tillater kommunen?'],
                ['Kostnadsoverslag', 'Hva koster huset + grunnarbeid + avgifter totalt?'],
                ['Husmodeller', 'Hvilke ferdighusleverandører passer? Hva koster de?'],
                ['Estimert verdi', 'Hva er ferdig bolig verdt? Hva er potensiell fortjeneste?'],
                ['Risiko', 'Er det flom, kvikkleire, radon, strandsone?'],
              ].map(([tittel, tekst]) => (
                <div key={tittel} className="flex gap-3 bg-white rounded-xl p-4">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-[#1a1a1a] text-sm">{tittel}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SLIK FUNGERER DET ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-[#2d5a3d]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#2d5a3d]">Plattformen</p>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-8">Fra mislykket Finn-annonse til vellykket tomtesalg</h2>

          <div className="grid md:grid-cols-5 gap-3 mb-10">
            {[
              { steg: '01', ikon: Home, tittel: 'Påmelding', tekst: '4 990 kr. Analyse, husmodeller og konsulenttime inkludert.' },
              { steg: '02', ikon: Layers, tittel: 'Tomtly analyserer', tekst: 'Regulering, DOK, BYA, 3D-kart – på under 30 sekunder.' },
              { steg: '03', ikon: FileText, tittel: 'Husmodeller + kalkyle', tekst: '3–6 reelle husmodeller med priser og kostnadsoverslag.' },
              { steg: '04', ikon: Globe, tittel: 'Salgsside live', tekst: 'Profesjonell side på tomtly.no med visualiseringer.' },
              { steg: '05', ikon: MessageSquare, tittel: 'Kjøper tar kontakt', tekst: 'Selger håndterer dialog og bud i dashboardet.' },
            ].map(({ steg, ikon: Icon, tittel, tekst }) => (
              <div key={steg} className="bg-[#f5f0e8] rounded-2xl p-4">
                <p className="text-xs font-bold text-[#2d5a3d]/40 font-mono mb-2">{steg}</p>
                <Icon className="w-5 h-5 text-[#2d5a3d] mb-2" />
                <p className="font-bold text-[#1a1a1a] text-sm mb-1">{tittel}</p>
                <p className="text-xs text-gray-500 leading-relaxed">{tekst}</p>
              </div>
            ))}
          </div>

          {/* Prismodell */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white">
              <p className="text-xs font-bold text-white/50 uppercase tracking-wide mb-4">Prismodell</p>
              <div className="space-y-4">
                <div className="pb-4 border-b border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-white">Oppstart</p>
                      <p className="text-xs text-white/50 mt-0.5">Analyse, husmodeller, visualiseringer, salgsside</p>
                    </div>
                    <p className="text-xl font-bold text-[#c4a35a]">4 990 kr</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-white">Suksesshonorar</p>
                      <p className="text-xs text-white/50 mt-0.5">Av tomtens salgspris. Min. 20 000 kr + mva.</p>
                      <p className="text-xs text-green-400 mt-1">Ingen salg = ingen 2%</p>
                    </div>
                    <p className="text-xl font-bold text-[#c4a35a]">2% + mva</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Eksempel – tomt solgt for 2 000 000 kr</p>
              <div className="space-y-2">
                {[
                  ['Oppstart (ved påmelding)', '4 990 kr'],
                  ['Suksesshonorar (2% av 2 MNOK)', '40 000 kr + mva'],
                  ['Oppgjør via Proff Oppgjør AS', '9 000 kr + mva (fra kjøper)'],
                  ['Tomtly total inntekt', '~44 990 kr'],
                ].map(([l, v], i) => (
                  <div key={l} className={`flex justify-between text-sm ${i === 3 ? 'pt-2 border-t border-gray-200 font-bold' : ''}`}>
                    <span className={i === 3 ? 'text-[#1a1a1a]' : 'text-gray-600'}>{l}</span>
                    <span className={i === 3 ? 'text-[#2d5a3d] font-bold' : 'font-medium text-[#1a1a1a]'}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4 KUNDER ─── */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-[#2d5a3d]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#2d5a3d]">Traction</p>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-2">4 betalende kunder. Samme historien.</h2>
          <p className="text-gray-600 mb-6">Alle hadde forsøkt Finn.no. Ingen hadde fått bud. De kom til Tomtly.</p>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {[
              { adresse: 'Bjørnemyrveien 20', sted: 'Nesodden · 605 m²', info: '6 husmodeller. Flat tomt. Aktiv salgsside.', url: '/tomter/bjornemyrveien-20' },
              { adresse: 'Bjørnemyrveien 22', sted: 'Nesodden · 613 m²', info: '5 husmodeller inkl. Kongsvik (Blink Hus). Skrå tomt.', url: '/tomter/bjornemyrveien-22' },
              { adresse: 'Gamle Dalsveg 16A', sted: 'Maura', info: 'Privat kundedashboard. Cato Olsen.', url: '/dashboard/gamle-dalsveg-16' },
              { adresse: 'Myllavegen 58', sted: 'Grua', info: 'Privat kundedashboard. Bjørn Vidar Lund.', url: '/dashboard/myllavegen-58' },
            ].map(({ adresse, sted, info, url }) => (
              <a key={adresse} href={url} target="_blank" rel="noopener noreferrer" className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-[#2d5a3d]/30 transition-colors group">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-[#1a1a1a] group-hover:text-[#2d5a3d] transition-colors">{adresse}</p>
                    <p className="text-xs text-gray-400">{sted}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Aktiv</span>
                </div>
                <p className="text-sm text-gray-600">{info}</p>
                <p className="text-xs text-[#2d5a3d] mt-2 flex items-center gap-1">
                  <ExternalLink className="w-3 h-3" />tomtly.no{url}
                </p>
              </a>
            ))}
          </div>

          {/* Partnere */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { navn: 'Norkart AS', detalj: 'Norges største kartselskap. Intensjonsavtale om distribusjon.' },
              { navn: 'Placepoint', detalj: '60 MNOK ARR. Testtilgang gitt feb 2026. Forhandlinger pågår.' },
              { navn: 'Tegnebua AS', detalj: 'Søsterselskap. 120+ arkitektprosjekter/år som pipeline.' },
            ].map(({ navn, detalj }) => (
              <div key={navn} className="bg-white rounded-xl p-4 border border-gray-100">
                <div className="flex items-center gap-2 mb-1">
                  <Handshake className="w-4 h-4 text-[#2d5a3d]" />
                  <p className="font-semibold text-[#1a1a1a] text-sm">{navn}</p>
                </div>
                <p className="text-xs text-gray-500">{detalj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOKUMENTER ─── */}
      <section id="dokumenter" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-[#2d5a3d]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#2d5a3d]">Dokumenter</p>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-2">Last ned hele søknadspakken</h2>
          <p className="text-gray-500 mb-8 text-sm">Tilgjengelig som PDF og Word-kompatibel HTML.</p>

          {/* Hoveddokumenter */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {DOCS.filter(d => d.hoved).map(doc => (
              <div key={doc.fil} className="bg-[#f5f0e8] rounded-2xl p-5">
                <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${doc.farge}`}>{doc.type}</span>
                <h3 className="font-bold text-[#1a1a1a] mb-4 text-sm leading-tight">{doc.tittel}</h3>
                <div className="flex gap-2">
                  <a href={`/docs/funding/${doc.fil}.pdf`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-[#2d5a3d] bg-white px-3 py-1.5 rounded-lg hover:bg-[#e0eee5] transition-colors border border-[#2d5a3d]/20">
                    <Download className="w-3 h-3" /> PDF
                  </a>
                  <a href={`/docs/funding/${doc.fil}.html`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                    <Download className="w-3 h-3" /> Word
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Alle dokumenter */}
          <div className="bg-[#f5f0e8] rounded-2xl overflow-hidden">
            <div className="px-5 py-3 border-b border-[#2d5a3d]/10">
              <p className="text-xs font-bold text-[#2d5a3d] uppercase tracking-wide">Alle dokumenter</p>
            </div>
            <div className="divide-y divide-[#2d5a3d]/10">
              {DOCS.map(doc => (
                <div key={doc.fil} className="flex items-center justify-between px-5 py-3 hover:bg-[#e8f0ea] transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-[#2d5a3d] flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-[#1a1a1a]">{doc.tittel}</p>
                      <p className="text-xs text-gray-400">{doc.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <a href={`/docs/funding/${doc.fil}.pdf`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-[#2d5a3d] hover:underline flex items-center gap-1">
                      <Download className="w-3 h-3" />PDF
                    </a>
                    <span className="text-gray-300">|</span>
                    <a href={`/docs/funding/${doc.fil}.html`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                      <Download className="w-3 h-3" />Word
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── KJØPERSIDEN ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[#2d5a3d]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#2d5a3d]">Kjøpersiden</p>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-2">Tomtly hjelper også kjøperen</h2>
          <p className="text-gray-500 mb-8 text-sm">En to-sidig plattform som løser problemet fra begge kanter.</p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              {
                tittel: 'Vi finner tomter for deg',
                tekst: 'Daglig søk gjennom Finn.no, kommunale sakssystemer og matrikkeldata. Passer en tomt dine kriterier, varsler vi deg umiddelbart.',
              },
              {
                tittel: 'Vi regner på hva ting koster',
                tekst: 'Vet du ikke hva grunnarbeid, hus og kommunale gebyrer koster? Tomtly leverer komplett kostnadsoverslag for tomten du vurderer.',
              },
              {
                tittel: 'Du ser hva du kan bygge',
                tekst: 'Oppgi totalbudsjettet ditt – vi viser husmodeller som passer, med priser, plantegninger og kalkyle. Du vet nøyaktig hva tomtepengene strekker til.',
              },
            ].map(({ tittel, tekst }) => (
              <div key={tittel} className="bg-[#f5f0e8] rounded-2xl p-5">
                <p className="font-bold text-[#1a1a1a] mb-2 text-sm">{tittel}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{tekst}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white">
            <p className="text-sm font-bold text-white/60 mb-2">Nettverkseffekten</p>
            <p className="text-white/80 text-sm leading-relaxed">
              Flere kjøpere på plattformen → raskere salg for selgere → flere selgere melder seg på → bedre tomteutvalg for kjøpere.
              Dette to-sidige markedet er det som gjør Tomtly skalerbart – og det er ingen andre i Norge som tilbyr dette.
            </p>
          </div>
        </div>
      </section>

      {/* ─── MARKED OG FINANSIERING ─── */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">

            <div>
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-[#2d5a3d]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#2d5a3d]">Vekstmarkedet</p>
              </div>
              <h2 className="text-xl font-serif font-bold text-[#1a1a1a] mb-4">Fra 4 kunder til et nasjonalt marked</h2>
              <div className="space-y-2">
                {[
                  { label: 'B2C tomteeiere (5 000+ på Finn nå)', val: '5–15 MNOK/år' },
                  { label: 'B2B meglerkontorer (800 × 3 000 kr/mnd)', val: '20–50 MNOK/år' },
                  { label: 'B2B banker (pre-verdivurdering)', val: '25–100 MNOK/år' },
                  { label: 'Proptech API-lisenser', val: '5–20 MNOK/år' },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between bg-white rounded-xl px-4 py-3 text-sm">
                    <span className="text-gray-700">{label}</span>
                    <span className="font-bold text-[#2d5a3d]">{val}</span>
                  </div>
                ))}
                <div className="flex justify-between bg-[#1a1a1a] rounded-xl px-4 py-3 text-sm">
                  <span className="text-white font-bold">Norsk SAM</span>
                  <span className="font-bold text-[#c4a35a]">~65 MNOK/år</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-[#2d5a3d]" />
                <p className="text-xs font-bold uppercase tracking-widest text-[#2d5a3d]">Finansiering</p>
              </div>
              <h2 className="text-xl font-serif font-bold text-[#1a1a1a] mb-4">Hva vi søker</h2>
              <div className="space-y-2 mb-4">
                {[
                  { kilde: 'Innovasjon Norge – Markedsavklaring', beløp: '750 000 kr', status: 'Søker nå', farge: 'bg-[#2d5a3d]' },
                  { kilde: 'Skattefunn (FoU-fradrag)', beløp: '~200 000 kr', status: 'Søker nå', farge: 'bg-[#c4a35a]' },
                  { kilde: 'Egne midler – NOPS AS', beløp: '400 000 kr', status: 'Bekreftet', farge: 'bg-gray-300' },
                  { kilde: 'Kundeinntekter', beløp: '150 000 kr', status: 'Estimert', farge: 'bg-gray-200' },
                ].map(({ kilde, beløp, status, farge }, i) => (
                  <div key={kilde} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${farge}`} />
                      <span className="text-gray-700">{kilde}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="font-bold text-[#1a1a1a]">{beløp}</span>
                      <span className="text-xs text-gray-400 hidden md:block">{status}</span>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between bg-[#1a1a1a] rounded-xl px-4 py-3 text-sm">
                  <span className="text-white font-bold">Totalt · 12 måneder</span>
                  <span className="font-bold text-[#c4a35a]">1 500 000 kr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-[#2d5a3d]" />
            <p className="text-xs font-bold uppercase tracking-widest text-[#2d5a3d]">Teamet</p>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-6">Hvem er vi?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                navn: 'Jakob Bjøndal',
                rolle: 'Gründer og teknisk leder · NOPS AS / Tegnebua AS',
                bio: 'Arkitekt og teknolog. Driver Tegnebua med 120+ prosjekter per år. 10+ år erfaring med norsk planlovgivning og byggesaksbehandling. Har bygget hele Tomtly teknisk – analyse, salgsplatform og kundedashboards.',
                kontakt: 'jakob@tegnebua.no · +47 406 03 908',
              },
              {
                navn: 'Kjetil Halvorsen',
                rolle: 'Medgründer, faglig leder · Tegnebua AS',
                bio: 'Ekspert på norske byggeforskrifter, TEK17 og kommunal saksbehandling. Tegnebuas fagansvarlige. Sikrer at Tomtlys reguleringsanalyser er faglig korrekte.',
                kontakt: 'kjetil@tegnebua.no',
              },
            ].map(({ navn, rolle, bio, kontakt }) => (
              <div key={navn} className="bg-[#f5f0e8] rounded-2xl p-6">
                <p className="font-bold text-[#1a1a1a] text-lg">{navn}</p>
                <p className="text-xs text-[#2d5a3d] font-medium mb-3">{rolle}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">{bio}</p>
                <p className="text-xs text-gray-400">{kontakt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KONTAKT ─── */}
      <section className="py-16 bg-[#1a1a1a] text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">Ta kontakt</h2>
          <p className="text-white/60 mb-8 text-sm">
            Vi deler gjerne tilgang til live plattform, kundecaser og fullstendig søknadspakke.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="mailto:jakob@tegnebua.no" className="flex items-center justify-center gap-2 bg-[#2d5a3d] hover:bg-[#3a7050] text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm">
              <Mail className="w-4 h-4" /> jakob@tegnebua.no
            </a>
            <a href="tel:+4740603908" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm">
              <Phone className="w-4 h-4" /> +47 406 03 908
            </a>
            <a href="/investor" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors text-sm">
              <ExternalLink className="w-4 h-4" /> Investorside
            </a>
          </div>
          <p className="text-xs text-white/30">NOPS AS (Konsepthus AS) · Org.nr 933 819 086 · tomtly.no</p>
        </div>
      </section>

    </div>
  )
}
