'use client'

import {
  CheckCircle2, ArrowRight, Mail, Phone, ExternalLink,
  BarChart3, Code2, Layers, Brain, Clock, Star,
  Handshake, FileText, PieChart, TrendingUp, Users,
  Home, MessageSquare, Gavel, AlertCircle, Zap, Globe,
} from 'lucide-react'

function StatCard({ val, label, sub }: { val: string; label: string; sub?: string }) {
  return (
    <div className="text-center p-4">
      <p className="text-3xl md:text-4xl font-bold text-[#c4a35a] font-mono">{val}</p>
      <p className="text-sm font-semibold text-white mt-1">{label}</p>
      {sub && <p className="text-xs text-white/50 mt-0.5">{sub}</p>}
    </div>
  )
}

function SectionHeader({ icon: Icon, title, sub }: { icon: any; title: string; sub?: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 text-[#2d5a3d]" />
        <p className="text-xs font-bold text-[#2d5a3d] uppercase tracking-widest">{title}</p>
      </div>
      {sub && <p className="text-3xl md:text-4xl font-serif font-bold text-[#1a1a1a] leading-tight">{sub}</p>}
    </div>
  )
}

export default function InvestorPage() {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ─── HERO ─── */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
          <div className="flex items-center gap-3 mb-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.svg" alt="Tomtly" className="h-7" />
            <span className="text-white/30">|</span>
            <span className="text-xs font-bold uppercase tracking-widest text-white/50">Investorside · Konfidensielt</span>
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#2d5a3d]/30 border border-[#2d5a3d]/50 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-green-300 font-medium">4 betalende kunder · Live produkt · Mai 2026</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif font-bold leading-tight mb-6">
              Plattformen som selger{' '}
              <span style={{ color: '#c4a35a' }}>tomter andre ikke klarer</span>
            </h1>

            <p className="text-xl text-white/70 leading-relaxed mb-4">
              Alle 4 av Tomtlys betalende kunder hadde én ting felles: de hadde forsøkt å selge tomten på{' '}
              <strong className="text-white">Finn.no uten å lykkes</strong>. Med Tomtly fikk de en komplett pakke –
              analyse, husmodeller, visualiseringer og en salgsdialog-plattform. Tomtly tjener 2% + mva av tomtens verdi ved salg.
            </p>
            <p className="text-lg text-white/60 leading-relaxed mb-10">
              Nå søker vi <strong className="text-white">750 000 kr i innovasjonstilskudd</strong> for å skalere
              dette til B2B-markedet – meglere, banker og eiendomsutviklere.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#plattformen" className="flex items-center gap-2 px-6 py-3 bg-[#2d5a3d] hover:bg-[#3a7050] text-white font-semibold rounded-xl transition-colors">
                Se plattformen <ArrowRight className="w-4 h-4" />
              </a>
              <a href="mailto:jakob@tegnebua.no" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors">
                <Mail className="w-4 h-4" /> jakob@tegnebua.no
              </a>
              <a href="https://tomtly.no/prototype" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors">
                <ExternalLink className="w-4 h-4" /> Live demo
              </a>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              <StatCard val="4" label="Betalende kunder" sub="Alle fra mislykkede Finn-annonser" />
              <StatCard val="2% + mva" label="Suksesshonorar" sub="Av tomtens salgspris" />
              <StatCard val="356" label="Kommuner dekket" sub="Komplett reguleringsanalyse" />
              <StatCard val="< 30 sek" label="Per analyse" sub="Mot 2–5 dager manuelt" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROBLEMET ─── */}
      <section className="py-20 bg-[#f5f0e8]" id="problem">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader icon={AlertCircle} title="Problemet" sub="Tomteselgere mislykkes på Finn.no – fordi kjøpere ikke forstår hva de kjøper" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                En tomt er ikke en leilighet. Verdien avhenger helt av hva som <em>kan</em> bygges, hva det koster, og hva sluttresultatet kan selges for. Uten denne informasjonen er en Finn-annonse meningsløs for kjøperen.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Resultatet: tusenvis av tomter annonseres på Finn.no og trekker null seriøse bud. Selgerne sitter fast. Kjøperne tør ikke kjøpe noe de ikke forstår. Og informasjonen som trengs for å forstå tomten er spredt over 15+ offentlige databaser.
              </p>

              <div className="space-y-3">
                {[
                  { tittel: 'Reguleringsplan', tekst: '30–80 sider juridisk tekst. Ulik for alle 356 kommuner. Hva kan man egentlig bygge?' },
                  { tittel: 'Hva koster det å bygge?', tekst: 'Ingen vet. Ingen standard husmodell-kalkyle finnes for tomten.' },
                  { tittel: 'Hva er tomten verdt ferdig utbygd?', tekst: 'Umulig å beregne uten reguleringsdata, husmodell og markedsdata.' },
                  { tittel: 'Kommunikasjon og bud', tekst: 'Ingen profesjonell kanal for interessenter å registrere seg og by.' },
                ].map(({ tittel, tekst }) => (
                  <div key={tittel} className="flex gap-3 bg-white rounded-xl p-4">
                    <div className="w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-[#1a1a1a] text-sm">{tittel}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{tekst}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <p className="font-bold text-[#1a1a1a] text-sm">Finn.no-annonse uten Tomtly</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <p className="text-xs text-gray-500 mb-2">Typisk Finn-annonse:</p>
                  <p className="font-bold text-[#1a1a1a] text-sm">«Regulert byggeklar tomt til salgs. 800 m². Bud ønskes.»</p>
                  <p className="text-xs text-gray-400 mt-2">Ingen info om hva som kan bygges · Ingen kostnadsoverslag · Ingen visualisering · Null seriøse henvendelser</p>
                </div>
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm font-semibold">Resultat: 0 bud. Tomten trekkes tilbake.</p>
                </div>
              </div>

              <div className="bg-[#2d5a3d] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-green-300" />
                  <p className="font-bold text-sm">Tomtly-salgsside</p>
                </div>
                <div className="space-y-2 mb-4">
                  {[
                    'Komplett reguleringsanalyse med AI-tolkning',
                    '3–6 husmodeller med priser fra reelle leverandører',
                    'Kostnadsoverslag og estimert sluttverdi',
                    '3D-visualisering og fasadebilder',
                    'Dashboard for kommunikasjon og budregistrering',
                    'Interessentliste og budhåndtering for selger',
                  ].map(p => (
                    <div key={p} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-green-300 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-white/80">{p}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-white/20">
                  <p className="text-green-300 font-bold text-sm">Resultat: Kvalifiserte kjøpere. Dokumenterte bud.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SLIK FUNGERER DET ─── */}
      <section className="py-20 bg-white" id="plattformen">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader icon={Zap} title="Plattformen" sub="Fra mislykket Finn-annonse til vellykket tomtesalg" />

          {/* Steg */}
          <div className="grid md:grid-cols-5 gap-4 mb-14">
            {[
              { steg: '01', ikon: Home, tittel: 'Tomteeier melder seg på', tekst: '4 990 kr. Oppstart inkl. analyse, husmodeller, materialell og konsulenttime.' },
              { steg: '02', ikon: Layers, tittel: 'Tomtly analyserer', tekst: 'Reguleringsplan, DOK, BYA-kapasitet og 3D-terreng – på under 30 sekunder.' },
              { steg: '03', ikon: FileText, tittel: 'Husmodeller og kalkyle', tekst: '3–6 reelle husmodeller med priser, kostnadsoverslag og estimert sluttverdi.' },
              { steg: '04', ikon: Globe, tittel: 'Profesjonell salgsside', tekst: 'Publisert på tomtly.no med fasadebilder, plantegninger og full informasjon.' },
              { steg: '05', ikon: MessageSquare, tittel: 'Kjøper tar kontakt', tekst: 'Interessenter registrerer seg. Selger håndterer dialog og bud i dashboardet.' },
            ].map(({ steg, ikon: Icon, tittel, tekst }, i) => (
              <div key={steg} className="relative">
                {i < 4 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-0.5 bg-gradient-to-r from-[#2d5a3d]/40 to-transparent z-0" />
                )}
                <div className="relative z-10 bg-[#f5f0e8] rounded-2xl p-5 h-full">
                  <p className="text-xs font-bold text-[#2d5a3d]/40 font-mono mb-2">{steg}</p>
                  <Icon className="w-6 h-6 text-[#2d5a3d] mb-3" />
                  <p className="font-bold text-[#1a1a1a] text-sm mb-2">{tittel}</p>
                  <p className="text-xs text-gray-600 leading-relaxed">{tekst}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboardet */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold text-[#2d5a3d] uppercase tracking-widest mb-3">Selger-dashboardet</p>
              <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-4">Tomteeier har full kontroll</h3>
              <p className="text-gray-600 leading-relaxed mb-5">
                Etter at tomten er publisert, får tomteeieren tilgang til et personlig dashboard der de kan se
                hvem som har vist interesse, kommunisere direkte med kjøpere og følge budprosessen.
                Alt på ett sted – ingen e-poster frem og tilbake.
              </p>
              <div className="space-y-2">
                {[
                  ['Interessentliste', 'Hvem har sett og registrert interesse'],
                  ['Meldinger', 'Direkte kommunikasjon med potensielle kjøpere'],
                  ['Budregistrering', 'Strukturert budhåndtering'],
                  ['Dokumenter', 'Alle tegninger, analyser og salgsmateriell samlet'],
                  ['Status', 'Løpende oppdatering om salgsstatus'],
                ].map(([tittel, beskr]) => (
                  <div key={tittel} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2d5a3d] flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-sm font-semibold text-[#1a1a1a]">{tittel}: </span>
                      <span className="text-sm text-gray-600">{beskr}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#2d5a3d] uppercase tracking-widest mb-3">Prising</p>
              <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-4">Inntjening bare ved salg</h3>

              <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white mb-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                    <div>
                      <p className="font-bold text-white">Oppstart</p>
                      <p className="text-xs text-white/60 mt-0.5">Analyse, husmodeller, visualiseringer, salgsside, konsulenttime</p>
                    </div>
                    <p className="text-xl font-bold text-[#c4a35a] flex-shrink-0">4 990 kr</p>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-bold text-white">Suksesshonorar ved salg</p>
                      <p className="text-xs text-white/60 mt-0.5">2% + mva av tomtens salgspris. Minimum 20 000 kr + mva.</p>
                      <p className="text-xs text-green-400 mt-1">Ingen salg = ingen 2%. Tomtly tjener kun når du selger.</p>
                    </div>
                    <p className="text-xl font-bold text-[#c4a35a] flex-shrink-0">2% + mva</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Eksempel – tomt solgt for 2 000 000 kr</p>
                <div className="space-y-2">
                  {[
                    ['Oppstart (betales ved påmelding)', '4 990 kr'],
                    ['Suksesshonorar (2% av 2 000 000)', '40 000 kr + mva'],
                    ['Oppgjør via Proff Oppgjør AS', '9 000 kr + mva (direkte fra kjøper)'],
                    ['Tomtly total inntekt dette salget', '~44 990 kr'],
                  ].map(([l, v], i) => (
                    <div key={l} className={`flex justify-between text-sm ${i === 3 ? 'pt-2 border-t border-gray-200 font-bold' : ''}`}>
                      <span className={i === 3 ? 'text-[#1a1a1a]' : 'text-gray-600'}>{l}</span>
                      <span className={i === 3 ? 'text-[#2d5a3d]' : 'text-[#1a1a1a] font-medium'}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── KJØPERSIDEN ─── */}
      <section className="py-20 bg-[#f5f0e8]" id="kjoper">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader icon={Users} title="Kjøpersiden" sub="Tomtly hjelper også kjøperen – ikke bare selgeren" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-gray-700 leading-relaxed mb-5">
                Tomtly er ikke bare en selgerplattform. Vi hjelper også tomtekjøpere med å finne, forstå og beregne
                hva de har råd til. Dette er en helt ny tjeneste i det norske markedet – ingen andre kobler
                daglig tomtesøk, kostnadsoverslag og husmodell-matching i én plattform.
              </p>

              <div className="space-y-4">
                {[
                  {
                    tittel: 'Vi finner tomter for deg',
                    tekst: 'Vi søker daglig gjennom Finn.no, kommunale sakssystemer og matrikkeldata. Finner vi en tomt som passer kjøpers kriterier, gir vi beskjed umiddelbart.',
                  },
                  {
                    tittel: 'Vi regner på hva ting koster',
                    tekst: 'Kjøpere vet sjelden hva grunnarbeid, hus og kommunale gebyrer koster samlet. Tomtly leverer et komplett kostnadsoverslag basert på den aktuelle tomten.',
                  },
                  {
                    tittel: 'Du ser hva du faktisk kan bygge',
                    tekst: 'Oppgi totalbudsjettet – Tomtly viser hvilke husmodeller som passer, med priser, plantegninger og kalkyle. Kjøperen vet nøyaktig hvor langt tomteprisen kan strekkes.',
                  },
                ].map(({ tittel, tekst }) => (
                  <div key={tittel} className="bg-white rounded-xl p-5 border border-gray-100">
                    <p className="font-bold text-[#1a1a1a] mb-1">{tittel}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{tekst}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1a1a1a] rounded-2xl p-6 text-white">
                <p className="text-xs font-bold text-white/50 uppercase tracking-wide mb-4">Hvorfor dette er viktig for investorer</p>
                <p className="text-white/80 leading-relaxed mb-4">
                  Tomtly løser et to-sidig markedsproblem: selgere kan ikke selge fordi kjøpere ikke forstår hva de kjøper.
                  Og kjøpere kan ikke kjøpe fordi de ikke vet hva de har råd til.
                </p>
                <p className="text-white/80 leading-relaxed">
                  Ved å hjelpe begge sider skaper Tomtly en <strong className="text-white">nettverkseffekt</strong>:
                  flere kjøpere på plattformen → raskere salg for selgere → flere selgere melder seg på →
                  bedre tomteutvalg for kjøpere.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <p className="text-xs font-bold text-[#2d5a3d] uppercase tracking-wide mb-3">Tomtly – begge sider av transaksjonen</p>
                <div className="space-y-2">
                  {[
                    ['Selger', 'Analyse + husmodeller + salgsdashboard', '4 990 kr + 2%'],
                    ['Kjøper', 'Tomtesøk + kostnadsberegning + husmodellmatch', 'Gratis / abonnement'],
                    ['Begge', 'Kommunikasjonsplattform og budhåndtering', 'Inkludert'],
                  ].map(([part, beskr, pris]) => (
                    <div key={part} className="flex items-start justify-between gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <span className="text-xs font-bold text-[#2d5a3d]">{part}: </span>
                        <span className="text-xs text-gray-600">{beskr}</span>
                      </div>
                      <span className="text-xs font-bold text-[#1a1a1a] flex-shrink-0">{pris}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4 KUNDER ─── */}
      <section className="py-20 bg-[#1a1a1a] text-white" id="traction">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#c4a35a]" />
            <p className="text-xs font-bold text-[#c4a35a] uppercase tracking-widest">Traction</p>
          </div>
          <p className="text-3xl md:text-4xl font-serif font-bold mb-3">4 betalende kunder. Samme historien.</p>
          <p className="text-white/60 mb-10 text-lg">Alle hadde forsøkt Finn.no. Ingen hadde fått bud. De kom til Tomtly.</p>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                adresse: 'Bjørnemyrveien 20',
                sted: 'Nesodden',
                areal: '605 m²',
                modeller: 'Skogly, Lasse, Vindy, Emilie, Nordstrand, Kongsvik',
                url: 'tomtly.no/tomter/bjornemyrveien-20',
              },
              {
                adresse: 'Bjørnemyrveien 22',
                sted: 'Nesodden',
                areal: '613 m²',
                modeller: 'Skogly, Vindy, Emilie, Nordstrand, Kongsvik',
                url: 'tomtly.no/tomter/bjornemyrveien-22',
              },
              {
                adresse: 'Gamle Dalsveg 16A',
                sted: 'Maura',
                areal: '–',
                modeller: 'Eget dashboard. Cato Olsen.',
                url: 'tomtly.no/dashboard/gamle-dalsveg-16',
              },
              {
                adresse: 'Myllavegen 58',
                sted: 'Grua',
                areal: '–',
                modeller: 'Eget dashboard. Bjørn Vidar Lund.',
                url: 'tomtly.no/dashboard/myllavegen-58',
              },
            ].map(({ adresse, sted, areal, modeller, url }) => (
              <div key={adresse} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-white text-lg">{adresse}</p>
                    <p className="text-white/50 text-sm">{sted}{areal !== '–' ? ` · ${areal}` : ''}</p>
                  </div>
                  <div className="bg-green-500/20 border border-green-500/30 rounded-full px-3 py-1">
                    <p className="text-xs text-green-300 font-bold">Aktiv</p>
                  </div>
                </div>
                <p className="text-xs text-white/40 mb-2">Husmodeller:</p>
                <p className="text-sm text-white/70">{modeller}</p>
                <p className="text-xs text-[#c4a35a] mt-3">{url}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Handshake className="w-5 h-5 text-[#c4a35a] mb-3" />
              <p className="font-bold text-white mb-2">Norkart AS</p>
              <p className="text-sm text-white/60 leading-relaxed">Norges største kartselskap. Intensjonsavtale om distribusjon av NOPS Slim-BIM (2D→3D) via e-Torg.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Handshake className="w-5 h-5 text-[#c4a35a] mb-3" />
              <p className="font-bold text-white mb-2">Placepoint</p>
              <p className="text-sm text-white/60 leading-relaxed">60 MNOK ARR. 2 akvisisjoner i 2025. Ga Tomtly testtilgang feb 2026. Forhandlinger pågår om white-label og API-lisens.</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <Handshake className="w-5 h-5 text-[#c4a35a] mb-3" />
              <p className="font-bold text-white mb-2">Tegnebua AS</p>
              <p className="text-sm text-white/60 leading-relaxed">Søsterselskap med 120+ arkitektprosjekter/år. Naturlig pipeline for tomtesalg og byggesøknad.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SKALA ─── */}
      <section className="py-20 bg-white" id="skala">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader icon={BarChart3} title="Vekstpotensial" sub="Fra 4 kunder til et nasjonalt marked" />

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Det norske tomtemarkedet er stort og uadressert. Tusenvis av tomteselgere sliter med
                det samme problemet Tomtlys 4 første kunder hadde. Det er bare begynnelsen.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { label: 'B2C tomteeiere (primærmarked)', val: '5 000+ tomter på Finn.no til enhver tid', potensial: '5–15 MNOK/år' },
                  { label: 'B2B meglere (abonnement)', val: '800 meglerkontorer · 3 000 kr/mnd', potensial: '20–50 MNOK/år' },
                  { label: 'B2B banker (pre-verdivurdering)', val: '50 relevante banker · 2 000 kr/analyse', potensial: '25–100 MNOK/år' },
                  { label: 'Proptech API (Placepoint m.fl.)', val: 'Lisensavtaler med dataplattformer', potensial: '5–20 MNOK/år' },
                ].map(({ label, val, potensial }) => (
                  <div key={label} className="border border-gray-100 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[#1a1a1a] text-sm">{label}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{val}</p>
                      </div>
                      <p className="text-sm font-bold text-[#2d5a3d] flex-shrink-0">{potensial}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#f5f0e8] rounded-xl p-4">
                <p className="text-xs font-bold text-[#2d5a3d] uppercase tracking-wide mb-1">Norsk SAM</p>
                <p className="text-2xl font-bold text-[#1a1a1a]">65–185 MNOK/år</p>
                <p className="text-xs text-gray-500 mt-1">+ Nordisk TAM 300–800 MNOK/år (Sverige, Danmark, Finland)</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#2d5a3d] uppercase tracking-wide mb-4">Teknologien som gjør det mulig</p>
              <p className="text-gray-700 leading-relaxed mb-5">
                Det som gjør Tomtly unik er at vi har løst et ekstremt teknisk problem: å samle og tolke
                data fra 15+ offentlige registre for alle 356 norske kommuner på under 30 sekunder.
                Ingen andre har gjort dette.
              </p>
              <div className="space-y-2">
                {[
                  'Planslurpen (DiBK) – reguleringsplaner, 356 kommuner',
                  'arealplaner.no – planer, dokumenter, dispensasjoner',
                  'Kartverket – eiendom, DOK, kart, hoydedata, grenser',
                  'NIBIO AR5 – arealklassifisering',
                  'Oslo PBE – eget plansystem (ingen andre har dette)',
                  'Norkart API – bygningsdata og takflater',
                  'Anthropic Claude AI – reguleringstolkning',
                  '+ 8 andre datakilder',
                ].map(k => (
                  <div key={k} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2d5a3d] flex-shrink-0" />
                    {k}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINANSIERING ─── */}
      <section className="py-20 bg-[#f5f0e8]" id="finansiering">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader icon={Star} title="Finansiering" sub="Vi søker 750 000 kr for å skalere det som allerede virker" />

          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <p className="text-gray-700 leading-relaxed mb-6">
                Vi har bevist at konseptet virker: 4 kunder, live produkt, dokumentert betalingsvilje.
                Med innovasjonstilskudd fra Innovasjon Norge kan vi akselerere til B2B-markedet
                (meglere og banker) – der volumet er og inntektspotensialet er størst.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { kilde: 'Innovasjon Norge – Markedsavklaring', beløp: '750 000 kr', pst: 50, farge: 'bg-[#2d5a3d]', status: 'Søker nå' },
                  { kilde: 'Skattefunn (FoU-fradrag)', beløp: '~200 000 kr', pst: 13, farge: 'bg-[#c4a35a]', status: 'Søker nå' },
                  { kilde: 'Egne midler – NOPS AS', beløp: '400 000 kr', pst: 27, farge: 'bg-gray-300', status: 'Bekreftet' },
                  { kilde: 'Kundeinntekter', beløp: '150 000 kr', pst: 10, farge: 'bg-gray-200', status: 'Estimert' },
                ].map(({ kilde, beløp, pst, farge, status }) => (
                  <div key={kilde}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{kilde}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#1a1a1a]">{beløp}</span>
                        <span className="text-xs bg-white text-gray-500 px-2 py-0.5 rounded-full border">{status}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-white rounded-full">
                      <div className={`h-1.5 rounded-full ${farge}`} style={{ width: `${pst}%` }} />
                    </div>
                  </div>
                ))}
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-bold text-[#1a1a1a]">Total prosjektramme</span>
                  <span className="font-bold text-[#2d5a3d]">1 500 000 kr · 12 måneder</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Milepæler – hva pengene brukes til</p>
                {[
                  ['Q3 2026', 'Megler-abonnement lansert. 10 kunder totalt.'],
                  ['Q4 2026', 'Bankpilot aktiv. 25 kunder. Placepoint live.'],
                  ['Q1 2027', '50 kunder. ARR > 600 000 kr/mnd.'],
                  ['Q2 2027', '100 kunder. Break-even. Skaleringsrunde.'],
                ].map(([kv, tekst]) => (
                  <div key={kv} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                    <p className="text-xs font-mono font-bold text-[#2d5a3d] w-16 flex-shrink-0">{kv}</p>
                    <p className="text-xs text-gray-600">{tekst}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-[#2d5a3d] uppercase tracking-wide mb-4">Bruk av midler</p>
              {[
                { pst: 40, label: 'Teknologiutvikling', beløp: '600 000 kr', farge: 'bg-[#2d5a3d]', detalj: 'AI-forbedringer, megler-API, bankkoblinger, skalering' },
                { pst: 30, label: 'Markedsvalidering', beløp: '450 000 kr', farge: 'bg-[#c4a35a]', detalj: 'B2B-pilot 5 meglerkontorer + 2 banker, intervjuer' },
                { pst: 20, label: 'Teamutvidelse', beløp: '300 000 kr', farge: 'bg-blue-400', detalj: 'Jakobs økte dedikasjon + delvis teknisk ressurs' },
                { pst: 10, label: 'Juridisk og compliance', beløp: '150 000 kr', farge: 'bg-gray-300', detalj: 'GDPR, API-avtaler, IP-beskyttelse' },
              ].map(({ pst, label, beløp, farge, detalj }) => (
                <div key={label} className="flex gap-4 mb-4">
                  <div className="w-12 flex-shrink-0 text-center">
                    <p className="text-xl font-bold text-[#1a1a1a]">{pst}%</p>
                    <div className={`w-full h-1 rounded-full ${farge} mt-1`} />
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-4 border border-gray-100">
                    <div className="flex justify-between mb-1">
                      <p className="font-semibold text-[#1a1a1a] text-sm">{label}</p>
                      <p className="text-sm font-bold text-gray-600">{beløp}</p>
                    </div>
                    <p className="text-xs text-gray-400">{detalj}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─── */}
      <section className="py-20 bg-white" id="team">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeader icon={Users} title="Teamet" sub="Domenekunnskap møter teknologi" />
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                navn: 'Jakob Bjøndal',
                rolle: 'Gründer og teknisk leder',
                bio: 'Arkitekt og teknolog. Driver Tegnebua (120+ prosjekter/år). 10+ år erfaring med norsk planlovgivning og byggesaksbehandling. Har personlig lest hundrevis av reguleringsplaner. Bygget Tomtly fra grunnen av – analyse, salgsplattform og kundedashboards.',
                epost: 'jakob@tegnebua.no',
                tlf: '+47 406 03 908',
              },
              {
                navn: 'Kjetil Halvorsen',
                rolle: 'Medgründer, faglig leder',
                bio: 'Ekspert på norske byggeforskrifter, TEK17, nabovarsling og kommunal saksbehandling. Tegnebuas fagansvarlige. Sikrer at Tomtlys reguleringsanalyser er faglig korrekte og juridisk presise.',
                epost: 'kjetil@tegnebua.no',
                tlf: '',
              },
            ].map(({ navn, rolle, bio, epost, tlf }) => (
              <div key={navn} className="bg-[#f5f0e8] rounded-2xl p-8">
                <div className="w-12 h-12 rounded-full bg-[#2d5a3d]/10 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-[#2d5a3d]" />
                </div>
                <p className="text-xl font-bold text-[#1a1a1a] mb-0.5">{navn}</p>
                <p className="text-sm font-medium text-[#2d5a3d] mb-4">{rolle}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{bio}</p>
                <p className="text-xs text-gray-400">{epost}{tlf ? ` · ${tlf}` : ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── KONTAKT ─── */}
      <section className="py-20 bg-[#1a1a1a] text-white" id="kontakt">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Kontakt</p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ta kontakt</h2>
          <p className="text-xl text-white/60 leading-relaxed mb-10">
            Vi deler gjerne tilgang til live plattform, alle 4 kundecases, og fullstendig søknadspakke.
            Se også <a href="/prosjekt" className="text-[#c4a35a] hover:underline">tomtly.no/prosjekt</a> for nedlastbare dokumenter.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            <a href="mailto:jakob@tegnebua.no" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-colors">
              <Mail className="w-6 h-6 text-[#c4a35a] mx-auto mb-3" />
              <p className="font-bold text-white mb-1">E-post</p>
              <p className="text-sm text-white/60">jakob@tegnebua.no</p>
            </a>
            <a href="tel:+4740603908" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-colors">
              <Phone className="w-6 h-6 text-[#c4a35a] mx-auto mb-3" />
              <p className="font-bold text-white mb-1">Telefon</p>
              <p className="text-sm text-white/60">+47 406 03 908</p>
            </a>
            <a href="https://tomtly.no/prototype" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-6 transition-colors">
              <ExternalLink className="w-6 h-6 text-[#c4a35a] mx-auto mb-3" />
              <p className="font-bold text-white mb-1">Live demo</p>
              <p className="text-sm text-white/60">tomtly.no/prototype</p>
            </a>
          </div>
          <p className="text-xs text-white/30">
            NOPS AS (Konsepthus AS) · Org.nr 933 819 086 · hey@nops.no · tomtly.no/investor
          </p>
          <p className="text-xs text-white/20 mt-1">Konfidensielt – ikke del videre uten tillatelse</p>
        </div>
      </section>

    </div>
  )
}
