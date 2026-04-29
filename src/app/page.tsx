import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Brain,
  Home,
  Box,
  LayoutDashboard,
  Shield,
  Database,
  Sparkles,
  Scale,
  MapPin,
  X,
  FileText,
  Users,
  Calculator,
} from 'lucide-react'
import { TomteSokLead } from '@/components/TomteSokLead'
import { VerdivurderingLead } from '@/components/VerdivurderingLead'

// ============================================================
// FORSIDE – Tomtly (2026)
// ============================================================

export default function Forside() {
  return (
    <>
      <HeroSection />
      <HvaViGjor />
      <MeglerVsTomtly />
      <FremhevedeTomter />
      <HvaErInkludert />
      <VerdivurderingLead />
      <Tilleggstjenester />
      <TomteSokLead />
      <Kundehistorier />
      <FAQSection />
      <JuridiskDisclaimer />
      <CTASection />
    </>
  )
}

// ---- Hero ----

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/tomter/bjornemyrveien-shared/oversiktsbilde.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-tomtly-dark/95 via-tomtly-dark/85 to-tomtly-dark/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Vi gjør tomten din
            <br />
            <span className="text-green-400">mer verdifull</span>
          </h1>

          <p className="text-xl text-brand-200 leading-relaxed max-w-2xl mx-auto font-medium">
            Tomten din blir mer attraktiv, selges raskere, til en bedre pris.
          </p>
          <p className="text-base text-brand-400 leading-relaxed max-w-xl mx-auto mt-4">
            Vi viser kjøpere hva de kan bygge — med analyse, husmodeller og kostnadskalkyle. Uten tradisjonell megler.
          </p>
        </div>

        {/* To hovedveier inn */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {/* SELGER-KORT */}
          <Link
            href="/selger/onboarding"
            className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 hover:bg-white/15 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-tomtly-gold/20 rounded-xl flex items-center justify-center mb-4">
              <Home className="w-6 h-6 text-tomtly-gold" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Jeg selger tomt
            </h2>
            <p className="text-brand-300 text-sm leading-relaxed mb-6">
              Vi analyserer tomten din, viser hva som kan bygges, lager profesjonelt salgsmateriell og bistår deg hele veien til salg — uten at du trenger megler.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-tomtly-gold group-hover:gap-3 transition-all">
              Kom i gang <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* KJØPER-KORT */}
          <Link
            href="/tomter"
            className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-7 hover:bg-white/15 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-tomtly-accent/20 rounded-xl flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              Jeg leter etter tomt
            </h2>
            <p className="text-brand-300 text-sm leading-relaxed mb-6">
              Vi finner tomter som ikke ligger på FINN. Ubebygde eiendommer og tomter
              som kan fradeles — analysert og klar til bygging med husmodeller og kostnadskalkyle.
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 group-hover:gap-3 transition-all">
              Søk etter tomt <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        {/* Sekundære lenker */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link
            href="/tomteanalyse"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-brand-600 text-brand-300 text-sm font-medium rounded-lg hover:bg-brand-900 transition-colors"
          >
            Gratis tomteanalyse
          </Link>
          <a
            href="#verdivurdering"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-brand-600 text-brand-300 text-sm font-medium rounded-lg hover:bg-brand-900 transition-colors"
          >
            Hva er tomten verdt?
          </a>
          <Link
            href="/fradeling"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-brand-600 text-brand-300 text-sm font-medium rounded-lg hover:bg-brand-900 transition-colors"
          >
            Fradeling av tomt
          </Link>
        </div>
      </div>
    </section>
  )
}

// ---- Hva vi gjør (posisjonering) ----

function HvaViGjor() {
  const steg = [
    {
      nr: '01',
      ikon: MapPin,
      tittel: 'Du kontakter oss',
      beskrivelse: 'Fortell oss om tomten din. Vi gjør en gratis vurdering og gir deg et forslag.',
      farge: 'bg-blue-50 border-blue-200 text-blue-700',
    },
    {
      nr: '02',
      ikon: Brain,
      tittel: 'Vi analyserer tomten',
      beskrivelse: 'Reguleringsplan, bestemmelser, grunnforhold. Vi finner ut nøyaktig hva som kan bygges.',
      farge: 'bg-forest-50 border-forest-200 text-forest-700',
    },
    {
      nr: '03',
      ikon: Home,
      tittel: 'Vi viser hva som kan bygges',
      beskrivelse: 'Husmodeller plassert på tomten, med kart og komplett kostnadskalkyle kjøpere kan ta med til banken.',
      farge: 'bg-forest-50 border-forest-200 text-forest-700',
    },
    {
      nr: '04',
      ikon: Sparkles,
      tittel: 'Vi markedsfører tomten',
      beskrivelse: 'Skreddersydd markedsoppgave. Annonsering mot aktive kjøpere. Tomten din skiller seg ut.',
      farge: 'bg-forest-50 border-forest-200 text-forest-700',
    },
    {
      nr: '05',
      ikon: Users,
      tittel: 'Vi bistår i dialogen',
      beskrivelse: 'Vi svarer på spørsmål fra interessenter om byggepotensial og kostnader. Du slipper å være ekspert.',
      farge: 'bg-forest-50 border-forest-200 text-forest-700',
    },
    {
      nr: '06',
      ikon: CheckCircle2,
      tittel: 'Du selger — Proff Oppgjør tar oppgjøret',
      beskrivelse: 'Du mottar bud og bestemmer. Proff Oppgjør AS håndterer kontrakt og oppgjør trygt og profesjonelt.',
      farge: 'bg-green-50 border-green-200 text-green-700',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hvorfor selge med Tomtly?
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto text-lg">
            Vi gjør det tradisjonelle tomtesalget enda bedre. Vår styrke er analysen og markedsføringen — vi viser kjøpere nøyaktig hva de kan bygge, og det gjør hele forskjellen.
          </p>
        </div>

        <div className="space-y-4 max-w-2xl mx-auto">
          {steg.map((s, i) => (
            <div key={s.nr} className={`flex items-start gap-5 rounded-xl border p-5 ${s.farge}`}>
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-current flex items-center justify-center">
                  <s.ikon className="w-5 h-5" />
                </div>
                {i < steg.length - 1 && <div className="w-0.5 h-6 bg-current/20 mt-1" />}
              </div>
              <div>
                <h3 className="font-semibold mb-0.5">{s.tittel}</h3>
                <p className="text-sm opacity-80 leading-relaxed">{s.beskrivelse}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/selger/onboarding"
            className="inline-flex items-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors"
          >
            Kom i gang — det tar 2 minutter <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ---- Megler vs Tomtly ----

function MeglerVsTomtly() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Tradisjonell megler vs. Tomtly
          </h2>
          <p className="text-brand-600">Regneeksempel — tomt til 3 000 000 kr</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {/* Megler */}
          <div className="bg-white rounded-2xl border-2 border-red-200 p-7">
            <h3 className="font-display text-xl font-bold text-red-700 mb-1">Tradisjonell megler</h3>
            <p className="text-xs text-brand-400 mb-5">Generalist — selger alt fra leiligheter til tomter</p>
            <div className="space-y-0 text-sm mb-5">
              {[
                { post: 'Provisjon (2,5–3,6%)', belop: '75 000 – 108 000 kr' },
                { post: 'Tilrettelegging', belop: '10 000 – 15 000 kr' },
                { post: 'Foto og markedspakke', belop: '15 000 – 35 000 kr' },
                { post: 'Oppgjør', belop: 'Inkludert' },
              ].map((r, i) => (
                <div key={r.post} className={`flex justify-between py-2.5 ${i > 0 ? 'border-t border-red-100' : ''}`}>
                  <span className="text-brand-600">{r.post}</span>
                  <span className="font-mono text-xs text-brand-700">{r.belop}</span>
                </div>
              ))}
              <div className="py-2.5 border-t border-red-100">
                <p className="text-xs text-brand-400 italic">Husmodeller, byggekalkyle, kostnadsoversikt for kjøper? Ikke inkludert.</p>
              </div>
            </div>
            <div className="bg-red-50 rounded-lg px-4 py-3 flex justify-between items-center font-bold text-red-700">
              <span>Totalt</span>
              <span className="font-mono text-lg">100 000 – 158 000 kr</span>
            </div>
          </div>

          {/* Tomtly */}
          <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-7 relative">
            <div className="absolute -top-3 right-5 px-3 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">Anbefalt</div>
            <h3 className="font-display text-xl font-bold text-tomtly-accent mb-1">Tomtly Salg</h3>
            <p className="text-xs text-brand-400 mb-5">Tomteeksperter — vi bistår deg fra A til Å</p>
            <div className="space-y-0 text-sm mb-5">
              {[
                { post: 'Oppstart (analyse + markedsføring)', belop: '4 990 kr' },
                { post: 'Suksesshonorar ved salg (2 % + mva, min. 20 000 kr)', belop: '60 000 kr' },
                { post: 'Oppgjør via Proff Oppgjør', belop: '9 000 kr + mva' },
              ].map((r, i) => (
                <div key={r.post} className={`flex justify-between py-2.5 ${i > 0 ? 'border-t border-brand-100' : ''}`}>
                  <span className="text-brand-600">{r.post}</span>
                  <span className="font-mono text-xs text-brand-700">{r.belop}</span>
                </div>
              ))}
              {['Tomteanalyse — hva er lov å bygge', 'Husmodeller plassert på kart', 'Byggekostnadskalkyle til banken', 'Bistand i dialog med interessenter', 'Markedsføring og annonsering'].map(f => (
                <div key={f} className="flex justify-between py-1.5 text-green-700">
                  <span className="text-sm">{f}</span>
                  <span className="text-xs font-semibold">✓</span>
                </div>
              ))}
            </div>
            <div className="bg-forest-50 rounded-lg px-4 py-3 flex justify-between items-center font-bold text-tomtly-dark">
              <span>Totalt</span>
              <span className="font-mono text-lg">75 740 kr</span>
            </div>
          </div>
        </div>

        {/* Besparelse */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-50 rounded-xl border border-green-200 p-6 text-center">
            <p className="text-sm text-green-700 mb-1">Du sparer med Tomtly</p>
            <p className="text-3xl font-bold text-green-800">25 000 – 83 000 kr</p>
            <p className="text-sm text-green-600 mt-1">— og får mer for pengene: husmodeller, kostnadskalkyle og bistand som meglere ikke tilbyr</p>
          </div>
        </div>

        {/* Proff Oppgjør + disclaimer */}
        <div className="max-w-4xl mx-auto mt-6 space-y-2">
          <p className="text-xs text-brand-400 text-center">
            Eiendomsoppgjør håndteres av vår samarbeidspartner <span className="font-semibold">Proff Oppgjør AS</span>. Tomtly er ikke megler — vi bistår med analyse, markedsføring og faglig rådgivning. Du har full kontroll over salget.
          </p>
        </div>
      </div>
    </section>
  )
}

// ---- Fremhevede tomter ----

function FremhevedeTomter() {
  const tomter = [
    {
      href: '/tomter/bjornemyrveien-20',
      bilde: '/tomter/bjornemyrveien-shared/oversiktsbilde.jpg',
      adresse: 'Bjørnemyrveien 20',
      sted: 'Nesodden',
      areal: '724 m²',
      pris: '3 000 000 kr',
      husmodeller: 5,
      type: 'Flat tomt',
    },
    {
      href: '/tomter/bjornemyrveien-22',
      bilde: '/tomter/bjornemyrveien-shared/render-parsell-c.jpg',
      adresse: 'Bjørnemyrveien 22',
      sted: 'Nesodden',
      areal: '613 m²',
      pris: '3 000 000 kr',
      husmodeller: 4,
      type: 'Skråtomt',
    },
    {
      href: '/tomter/alvaern-67',
      bilde: '/tomter/alvaern-shared/alvaern-render-aerial-1-DvVXdDku.jpg',
      adresse: 'Gamle Alværnvei 67',
      sted: 'Nesodden',
      areal: '900 m²',
      pris: '3 000 000 kr',
      husmodeller: 3,
      type: 'Skråtomt med fjordutsikt',
    },
  ]

  return (
    <section className="bg-brand-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-3">
            Se hva vi leverer
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Eksempler på tomter med komplett analyse, husmodeller og kostnadskalkyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tomter.map((tomt) => (
            <Link key={tomt.href} href={tomt.href} className="group bg-white border border-brand-200 rounded-2xl overflow-hidden hover:border-tomtly-accent/40 hover:shadow-lg transition-all">
              <div className="aspect-[16/10] relative overflow-hidden bg-brand-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tomt.bilde} alt={tomt.adresse} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3">
                  <span className="bg-tomtly-accent text-white text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    {tomt.husmodeller} husmodeller
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-tomtly-dark mb-1">{tomt.adresse}</h3>
                <p className="text-sm text-brand-500 mb-3">{tomt.sted} · {tomt.type}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-brand-500">
                    <span>{tomt.areal}</span>
                    <span className="font-semibold text-tomtly-dark">{tomt.pris}</span>
                  </div>
                  <span className="text-xs text-tomtly-accent font-medium group-hover:underline flex items-center gap-1">
                    Se analyse <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Hva er inkludert ----

function HvaErInkludert() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Alt dette er inkludert for 4 990 kr
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Ved gjennomført salg betaler du i tillegg 2 % suksesshonorar + mva (minimum 20 000 kr + mva).
            Ingen salg = ingen ekstra kostnad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-10">
          {[
            { tittel: 'Tomteanalyse', desc: 'Vi går gjennom reguleringsplan og bestemmelser, og dokumenterer hva som er lov å bygge på tomten.' },
            { tittel: 'Forslag på husmodeller', desc: 'Konkrete husmodeller fra norske leverandører som passer tomtens størrelse, regulering og topografi.' },
            { tittel: 'Plassering på kart', desc: 'Husmodellene plasseres på tomten med kart, slik at kjøpere ser hvordan det vil se ut.' },
            { tittel: 'Komplett byggekostnadskalkyle', desc: 'Kostnadsoverslag kjøper kan ta med rett til banken. Inkluderer alle typiske poster i et byggeprosjekt.' },
            { tittel: 'Husleverandør-matching', desc: 'Vi kobler kjøper med riktig husleverandør basert på tomtens forutsetninger.' },
            { tittel: 'Profesjonell salgsside', desc: 'Egen side på tomtly.no med analyse, husmodeller, kart og kalkyle — klar til deling.' },
            { tittel: 'Aktiv markedsføring', desc: 'Vi annonserer tomten og når aktive kjøpere som leter etter tomt å bygge på.' },
            { tittel: 'Bistand med interessenter', desc: 'Vi besvarer spørsmål fra potensielle kjøpere om byggepotensial, kostnader og prosess på vegne av deg.' },
            { tittel: 'Faglig rådgivning', desc: 'Du har en Tomtekonsulent tilgjengelig gjennom hele prosessen — fra analyse til salg.' },
          ].map((f) => (
            <div key={f.tittel} className="flex items-start gap-3 bg-brand-50 rounded-xl p-5 border border-brand-200">
              <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-tomtly-dark text-sm mb-0.5">{f.tittel}</h3>
                <p className="text-xs text-brand-600 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Prisoppsummering */}
        <div className="max-w-xl mx-auto bg-tomtly-dark rounded-2xl p-6 sm:p-8 text-center">
          <p className="text-brand-300 text-sm mb-3">Oppsummert</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-4">
            <div>
              <p className="text-3xl font-display font-bold text-white">4 990 kr</p>
              <p className="text-xs text-brand-400">oppstart</p>
            </div>
            <span className="text-brand-500 text-xl">+</span>
            <div>
              <p className="text-3xl font-display font-bold text-tomtly-gold">2 %</p>
              <p className="text-xs text-brand-400">kun ved salg (+ mva)</p>
            </div>
          </div>
          <p className="text-xs text-brand-400 mb-5">Minimum suksesshonorar 20 000 kr + mva. Oppgjør via Proff Oppgjør AS (9 000 kr + mva) tilkommer separat.</p>
          <Link
            href="/selger/onboarding"
            className="inline-flex items-center gap-2 px-6 py-3 bg-tomtly-accent text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors"
          >
            Kom i gang <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// ---- Tilleggstjenester ----

function Tilleggstjenester() {
  return (
    <section className="bg-tomtly-warm py-16 lg:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-3">
            Tilleggstjenester
          </h2>
          <p className="text-brand-600">Trenger du mer? Vi kan bistå med dette i tillegg.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <a href="mailto:hey@nops.no?subject=Rammetillatelse&body=Hei, jeg er interessert i å søke om rammetillatelse for tomten min." className="bg-white rounded-xl p-6 border border-brand-200 text-center hover:border-tomtly-accent/40 hover:shadow-md transition-all block">
            <FileText className="w-8 h-8 text-tomtly-accent mx-auto mb-3" />
            <h3 className="font-semibold text-tomtly-dark mb-1">Rammetillatelse</h3>
            <p className="text-xs text-brand-600 mb-3">Vi søker om rammetillatelse for valgt husmodell på tomten.</p>
            <span className="text-sm font-semibold text-tomtly-accent">Ta kontakt →</span>
          </a>
          <a href="mailto:hey@nops.no?subject=Arkitekttegninger&body=Hei, jeg er interessert i arkitekttegninger for tomten min." className="bg-white rounded-xl p-6 border border-brand-200 text-center hover:border-tomtly-accent/40 hover:shadow-md transition-all block">
            <Box className="w-8 h-8 text-tomtly-accent mx-auto mb-3" />
            <h3 className="font-semibold text-tomtly-dark mb-1">Arkitekttegninger</h3>
            <p className="text-xs text-brand-600 mb-3">Fullstendige tegninger for byggesøknad, tilpasset tomten.</p>
            <span className="text-sm font-semibold text-tomtly-accent">Ta kontakt →</span>
          </a>
          <Link href="/fradeling" className="bg-white rounded-xl p-6 border border-brand-200 text-center hover:border-tomtly-accent/40 hover:shadow-md transition-all block">
            <Scale className="w-8 h-8 text-tomtly-accent mx-auto mb-3" />
            <h3 className="font-semibold text-tomtly-dark mb-1">Fradeling</h3>
            <p className="text-xs text-brand-600 mb-3">Vi håndterer hele fradelingsprosessen. 0 kr ved avslag.</p>
            <span className="text-sm font-semibold text-tomtly-accent">Les mer om fradeling →</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// ---- Kundehistorier / Referanser ----

function Kundehistorier() {
  const referanser = [
    {
      adresse: 'Gamle Alværnvei 65, Nesodden',
      status: 'Solgt',
      beskrivelse: 'Tomten hadde ligget på FINN i 7 måneder uten seriøse henvendelser. 2 måneder etter Tomtly analyserte tomten ble den solgt til en kjøper som starter byggeprosjekt — basert på vår analyse.',
      href: '/tomter/alvaern-65',
      highlight: true,
    },
    {
      adresse: 'Bjørnemyrveien 20, Nesodden',
      status: 'Til salgs',
      beskrivelse: '5 husmodeller tilpasset flat tomt. Komplett byggekalkyle og reguleringsanalyse.',
      href: '/tomter/bjornemyrveien-20',
    },
    {
      adresse: 'Gamle Alværnvei 67, Nesodden',
      status: 'Til salgs',
      beskrivelse: '4 husmodeller for skråtomt med fjordutsikt. Tilbud på grunnarbeider innhentet fra S-Anlegg.',
      href: '/tomter/alvaern-67',
    },
  ]

  return (
    <section className="bg-tomtly-dark py-16 lg:py-24" id="referanser">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-3">
            Eiendommer vi har levert
          </h2>
          <p className="text-brand-400">Se hva vi har gjort for andre tomteeiere.</p>
        </div>

        {/* Hovedreferanse — suksesshistorie */}
        <div className="mb-8">
          <Link href={referanser[0].href} className="group block bg-gradient-to-r from-green-900/40 to-white/5 backdrop-blur-sm border border-green-500/30 rounded-2xl p-8 hover:border-green-400/50 transition-all">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/20 text-green-400">Solgt</span>
              <span className="text-xs text-brand-400">Suksesshistorie</span>
            </div>
            <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{referanser[0].adresse}</h3>
            <p className="text-brand-300 leading-relaxed mb-6 max-w-2xl">{referanser[0].beskrivelse}</p>
            <div className="flex gap-8">
              <div><p className="text-2xl font-bold text-red-400">7 mnd</p><p className="text-xs text-brand-500">på FINN uten salg</p></div>
              <div><p className="text-2xl font-bold text-green-400">2 mnd</p><p className="text-xs text-brand-500">etter Tomtly-analyse</p></div>
              <div><p className="text-2xl font-bold text-white">Solgt</p><p className="text-xs text-brand-500">kjøper starter byggeprosjekt</p></div>
            </div>
          </Link>
        </div>

        {/* Andre referanser */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {referanser.slice(1).map((r) => (
            <Link key={r.href} href={r.href} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-tomtly-gold/20 text-tomtly-gold">{r.status}</span>
              </div>
              <h3 className="font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">{r.adresse}</h3>
              <p className="text-sm text-brand-400 leading-relaxed mb-4">{r.beskrivelse}</p>
              <span className="text-xs text-green-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                Se analysen <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- FAQ ----

function FAQSection() {
  const faqs = [
    {
      q: 'Hva koster det egentlig?',
      a: 'Oppstart koster 4 990 kr. Det inkluderer tomteanalyse, husmodellforslag, kart med plassering, byggekostnadskalkyle, salgsside på Tomtly, og aktiv markedsføring. Ved gjennomført salg betaler du 2 % av salgssummen + mva (minimum 20 000 kr + mva). Eiendomsoppgjør via Proff Oppgjør AS koster 9 000 kr + mva og betales separat til dem. Tegning og rammesøknad er en egen tjeneste og koster 50 000 kr + mva via Tegnebua.',
    },
    {
      q: 'Når utløses de 2 %?',
      a: 'Kun ved gjennomført salg. Hvis tomten ikke blir solgt, betaler du kun oppstarten på 4 990 kr. Suksesshonoraret gjelder i avtaleperioden (12 måneder) pluss 3 måneder etter eventuell oppsigelse — også dersom du selger via andre kanaler i denne perioden.',
    },
    {
      q: 'Hva hvis tomten ikke blir solgt?',
      a: 'Da betaler du kun oppstarten på 4 990 kr. Vi tar risikoen sammen med deg — suksesshonoraret betales kun ved faktisk gjennomført salg.',
    },
    {
      q: 'Er tegning og rammesøknad inkludert i 4 990 kr?',
      a: 'Nei. For 4 990 kr får du alt du trenger for å markedsføre og selge tomten: analyse, husmodeller, kart, kalkyle og salgsside. Hvis du ønsker arkitekttegning og rammetillatelse (som Alværn 65-prosjektet), tilbyr vi det via Tegnebua for 50 000 kr + mva. Det er valgfritt og gjør tomten enda mer attraktiv.',
    },
    {
      q: 'Hvem håndterer bud og oppgjør?',
      a: 'Du som selger mottar bud og bestemmer selv. Kontraktsignering og det juridiske oppgjøret håndteres av vår samarbeidspartner Proff Oppgjør AS (9 000 kr + mva). Tomtly er din faglige rådgiver — ikke mellomledd i salget.',
    },
    {
      q: 'Har dere eksempler på solgte tomter?',
      a: 'Ja. Se Gamle Alværnvei 65 på Nesodden (tomtly.no/tomter/alvaern-65) — en tomt som hadde ligget ute i 7 måneder. 2 måneder etter at Tomtly la ut analysen med husmodeller og tegninger, ble den solgt til en kjøper som umiddelbart startet byggeprosjekt.',
    },
    {
      q: 'Er Tomtly et meglerfirma?',
      a: 'Nei. Tomtly er en analyseplattform og rådgivningstjeneste. Du selger tomten selv med våre verktøy. Vi gjør tomten mer attraktiv ved å vise kjøpere hva de faktisk kan bygge — det gir raskere salg og bedre pris.',
    },
    {
      q: 'Kan meglere bruke Tomtly?',
      a: 'Ja. Meglere kan bestille en Tomtly-analyse for 7 500 kr + mva per tomt og bruke det som underlag i egen salgsprosess.',
    },
    {
      q: 'Hva med bolig eller hytte som ikke selger?',
      a: 'Ofte handler det om tomtens potensial. Vi analyserer hva som kan bygges — for eksempel rive eksisterende bygg og bygge nytt, eller utvide. Kjøpere som ser et ferdig prosjekt tar raskere beslutning og er villige til å betale mer for eiendommen.',
    },
  ]

  return (
    <section className="bg-brand-50 py-16 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark text-center mb-10">
          Vanlige spørsmål
        </h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="bg-white rounded-xl border border-brand-200 overflow-hidden group">
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer text-sm font-semibold text-tomtly-dark hover:bg-brand-50 transition-colors">
                {faq.q}
                <ChevronDown className="w-4 h-4 text-brand-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-6 pb-4">
                <p className="text-sm text-brand-600 leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---- Juridisk disclaimer ----

function JuridiskDisclaimer() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-50 rounded-xl border border-brand-200 p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-tomtly-dark mb-1">Juridisk avklaring</h3>
              <p className="text-xs text-brand-500 leading-relaxed">
                Tomtly er ikke et eiendomsmeglingsforetak og opptrer ikke som mellommann ved eiendomstransaksjoner.
                Vi bistår med analyse, markedsføring og faglig rådgivning. Selger har full kontroll over salgsprosessen.
                Eiendomsoppgjør håndteres av vår samarbeidspartner Proff Oppgjør AS. Suksesshonoraret er 2 % av salgssum + mva, minimum 20 000 kr. Gjelder i 12 måneder, pluss 3 måneder etter eventuell oppsigelse.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---- CTA ----

function CTASection() {
  return (
    <section className="bg-tomtly-dark py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
          Klar for å selge tomten?
        </h2>
        <p className="text-brand-300 mb-8 text-lg">
          Kom i gang med en gratis vurdering. Vi kontakter deg innen 24 timer.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/selger/onboarding"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors text-lg"
          >
            Jeg selger tomt <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/tomter"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-600 text-white font-semibold rounded-xl hover:bg-brand-900 transition-colors"
          >
            Jeg leter etter tomt
          </Link>
        </div>
      </div>
    </section>
  )
}
