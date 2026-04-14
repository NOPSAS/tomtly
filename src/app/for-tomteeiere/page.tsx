import Link from 'next/link'
import {
  ArrowRight,
  Home,
  CheckCircle2,
  FileSearch,
  Box,
  CuboidIcon,
  Calculator,
  BadgeDollarSign,
  Database,
  FileText,
  ClipboardList,
  BarChart3,
  Megaphone,
  Eye,
  Gavel,
  Handshake,
  FileCheck,
  PenLine,
  BookOpen,
  ListChecks,
  Bell,
  LayoutDashboard,
  Scale,
} from 'lucide-react'

export default function ForTomteeiereePage() {
  return (
    <>
      <HeroSection />
      <VelgPakke />
      <HvaErInkludert />
      <SlikSelgerDuSelv />
      <Priseksempler />
      <VerktoyOgMaler />
      <FAQ />
      <JuridiskDisclaimer />
      <CTASection />
    </>
  )
}

/* ─── Hero ─────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Home className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For tomteeiere
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Selg tomten din
            <br />
            <span className="text-green-400">– uten megler</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Tomtly er en analyseplattform som gir deg alt du trenger for å
            selge tomten selv: reguleringsanalyse, husmodeller,
            3D-visualisering, byggekalkyle og verdivurdering. Du bestemmer
            – vi leverer verktøyene.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/selger/onboarding"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bestill tomteanalyse
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#pakker"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Se pakker og priser
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── VelgPakke ────────────────────────────────────────────────────── */

function VelgPakke() {
  return (
    <section id="pakker" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hva koster det?
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Én pakke, ingen skjulte kostnader. Du betaler kun suksesshonorar ved gjennomført salg.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="border-2 border-tomtly-accent rounded-2xl p-8 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-tomtly-accent text-white text-xs font-semibold rounded-full">
              Tomtly Salg
            </div>
            <div className="text-center mb-6">
              <div className="flex items-baseline justify-center gap-2 mb-1">
                <span className="text-5xl font-bold text-tomtly-dark">4 990</span>
                <span className="text-brand-500 text-lg">kr</span>
              </div>
              <p className="text-brand-500">+ 2 % suksesshonorar + mva ved gjennomført salg</p>
              <p className="text-xs text-brand-400 mt-2">Minimum suksesshonorar: 20 000 kr + mva</p>
            </div>
            <ul className="space-y-2.5 mb-8">
              {[
                'Tomteanalyse — hva er lov å bygge på tomten',
                'Forslag på husmodeller som passer tomten',
                'Kart med plassering av foreslått hus',
                'Byggekostnadskalkyle du kan ta med til banken',
                'Husleverandør-matching',
                'Markedsføring og annonsering',
                'Bistand i dialog med interessenter',
                'Rådgivning om byggeprosjektet — til selger og kjøpere',
                '2 % suksesshonorar + mva kun ved gjennomført salg (min. 20 000 kr)',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                  <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/selger/onboarding"
              className="block w-full text-center px-4 py-3.5 bg-tomtly-accent text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors text-lg"
            >
              Kom i gang
            </Link>
            <p className="text-xs text-brand-400 text-center mt-4">
              Oppgjør håndteres av vår samarbeidspartner Proff Oppgjør AS (fra 9 000 kr + mva). Suksesshonoraret er 2 % av salgssum + mva, minimum 20 000 kr + mva. Gjelder i 12 måneder + 3 måneder etter eventuell oppsigelse.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Hva er inkludert ─────────────────────────────────────────────── */

function HvaErInkludert() {
  const leveranser = [
    {
      ikon: FileSearch,
      tittel: 'Reguleringsanalyse',
      beskrivelse:
        'Gjeldende reguleringsplan gjennomgått av fagfolk – utnyttelsesgrad, byggehøyde, formål og begrensninger oppsummert for deg.',
    },
    {
      ikon: Home,
      tittel: 'Husmodeller',
      beskrivelse:
        'Ferdighusleverandørenes modeller tilpasset tomtens regulering, størrelse og orientering.',
    },
    {
      ikon: CuboidIcon,
      tittel: '3D-visualisering',
      beskrivelse:
        'Se hvordan husmodellene ser ut på tomten med terreng, nabobebyggelse og omgivelser i 3D.',
    },
    {
      ikon: Calculator,
      tittel: 'Byggekalkyle',
      beskrivelse:
        'Detaljert kostnadsestimat for hvert husmodellalternativ, inkludert grunnarbeid og tilkobling.',
    },
    {
      ikon: BadgeDollarSign,
      tittel: 'Verdivurdering',
      beskrivelse:
        'Estimert markedsverdi basert på sammenlignbare salg i området, tomtens egenskaper og regulering.',
    },
    {
      ikon: Database,
      tittel: 'DOK-analyse (70+ datasett)',
      beskrivelse:
        'Det offentlige kartgrunnlaget – flom, kvikkleire, radon, støy, kulturminner og 70 andre datasett analysert.',
    },
    {
      ikon: FileText,
      tittel: 'Tomterapport (PDF)',
      beskrivelse:
        'Alt samlet i en profesjonell PDF-rapport du kan dele med interessenter, bank eller megler.',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hva er inkludert
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Hver tomteanalyse inneholder disse leveransene.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leveranser.map((l) => (
            <div
              key={l.tittel}
              className="bg-white rounded-xl border border-brand-200 p-6"
            >
              <div className="w-10 h-10 bg-tomtly-accent/10 rounded-lg flex items-center justify-center mb-4">
                <l.ikon className="w-5 h-5 text-tomtly-accent" />
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">
                {l.tittel}
              </h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                {l.beskrivelse}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Slik selger du selv (7 steg) ─────────────────────────────────── */

function SlikSelgerDuSelv() {
  const steg = [
    {
      nummer: 1,
      ikon: ClipboardList,
      tittel: 'Bestill analyse',
      beskrivelse:
        'Oppgi adressen til tomten din. Vi henter matrikkeldata, reguleringsplan og kart automatisk.',
    },
    {
      nummer: 2,
      ikon: FileText,
      tittel: 'Les tomterapporten',
      beskrivelse:
        'Du mottar en komplett rapport med reguleringsanalyse, husmodeller, kalkyle og verdivurdering.',
    },
    {
      nummer: 3,
      ikon: Megaphone,
      tittel: 'Markedsføring starter',
      beskrivelse:
        'Tomten publiseres på Tomtly med profesjonelle visualiseringer og tiltrekker kvalifiserte kjøpere.',
    },
    {
      nummer: 4,
      ikon: BarChart3,
      tittel: 'Følg interessen i dashboard',
      beskrivelse:
        'Se hvem som ser på tomten, hvem som har vist interesse og hvem som ønsker visning.',
    },
    {
      nummer: 5,
      ikon: Eye,
      tittel: 'Gjennomfør visning',
      beskrivelse:
        'Bruk vår visningsguide og sjekkliste. Du møter interessentene og viser tomten selv.',
    },
    {
      nummer: 6,
      ikon: Gavel,
      tittel: 'Motta og vurder bud',
      beskrivelse:
        'Budskjema og akseptbrev er klart i dashboardet. Du vurderer budene og aksepterer det beste.',
    },
    {
      nummer: 7,
      ikon: Handshake,
      tittel: 'Start oppgjør via Proff Oppgjør',
      beskrivelse:
        'Proff Oppgjør AS håndterer kontrakt, tinglysing og pengeoverføring – trygt og juridisk korrekt.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik selger du selv
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Syv steg fra analyse til oppgjør. Du har kontrollen hele veien.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-brand-200 hidden sm:block" />

            <div className="space-y-8">
              {steg.map((s) => (
                <div key={s.nummer} className="flex gap-5 relative">
                  <div className="flex-shrink-0 w-10 h-10 bg-tomtly-accent rounded-full flex items-center justify-center relative z-10">
                    <s.ikon className="w-5 h-5 text-white" />
                  </div>
                  <div className="pt-1">
                    <div className="text-xs font-semibold text-tomtly-accent mb-1">
                      Steg {s.nummer}
                    </div>
                    <h3 className="font-semibold text-tomtly-dark mb-1">
                      {s.tittel}
                    </h3>
                    <p className="text-sm text-brand-600 leading-relaxed">
                      {s.beskrivelse}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Priseksempler ────────────────────────────────────────────────── */

function Priseksempler() {
  // Tomtly: 4990 + max(20000, 2%) + Proff Oppgjør 9000 + mva. Megler: ~1,7% + 45000 gebyrer
  const eksempler = [
    { pris: '0,8 MNOK', tomtly: '33 990', megler: '58 600', spart: '24 610', note: 'Min. honorar' },
    { pris: '1,5 MNOK', tomtly: '43 990', megler: '70 500', spart: '26 510', note: '' },
    { pris: '2 MNOK', tomtly: '53 990', megler: '79 000', spart: '25 010', note: '' },
    { pris: '3 MNOK', tomtly: '73 990', megler: '96 000', spart: '22 010', note: '' },
    { pris: '4 MNOK', tomtly: '93 990', megler: '113 000', spart: '19 010', note: '' },
  ]

  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Priseksempler
          </h2>
          <p className="text-brand-600 max-w-2xl mx-auto">
            Se hva du sparer med Tomtly sammenlignet med tradisjonell megler.
            Alle beløp inkluderer oppgjør via Proff Oppgjør AS (9 000 kr + mva).
          </p>
        </div>

        <div className="max-w-3xl mx-auto overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-brand-300">
                <th className="text-left py-3 px-4 font-semibold text-tomtly-dark">Salgssum</th>
                <th className="text-right py-3 px-4 font-semibold text-tomtly-accent">
                  Tomtly Salg
                  <span className="block text-xs font-normal text-brand-400">4 990 kr + 2 % + mva</span>
                </th>
                <th className="text-right py-3 px-4 font-semibold text-red-600">
                  Trad. megler
                  <span className="block text-xs font-normal text-red-400">~1,7 % + gebyrer</span>
                </th>
                <th className="text-right py-3 px-4 font-semibold text-green-700">Du sparer</th>
              </tr>
            </thead>
            <tbody>
              {eksempler.map((e) => (
                <tr key={e.pris} className="border-b border-brand-200">
                  <td className="py-3 px-4 font-medium text-tomtly-dark">
                    {e.pris}
                    {e.note && <span className="ml-2 text-[10px] font-normal text-brand-400">({e.note})</span>}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-tomtly-accent">{e.tomtly} kr</td>
                  <td className="py-3 px-4 text-right text-red-600">{e.megler} kr</td>
                  <td className="py-3 px-4 text-right font-bold text-green-700">{e.spart} kr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-brand-400 text-center mt-6 max-w-2xl mx-auto">
          Tomtly inkluderer oppstart (4 990 kr) + 2 % suksesshonorar + mva (minimum 20 000 kr + mva) + Proff Oppgjør (9 000 kr + mva). Alle Tomtly-priser er angitt med eller uten mva som spesifisert.
          Tradisjonell megler er basert på ~1,7 % provisjon + tilrettelegging, markedspakke og gebyrer.
          I tillegg får du med Tomtly: husmodeller, kostnadskalkyle, plassering på kart og bistand med interessenter — dette tilbyr ikke meglere.
        </p>
      </div>
    </section>
  )
}

/* ─── Verktøy og maler ─────────────────────────────────────────────── */

function VerktoyOgMaler() {
  const verktoy = [
    {
      ikon: PenLine,
      tittel: 'Budskjema',
      beskrivelse: 'Standardisert skjema kjøpere fyller ut for å legge inn bud.',
    },
    {
      ikon: FileCheck,
      tittel: 'Akseptbrev',
      beskrivelse: 'Ferdig mal for å akseptere bud – juridisk korrekt formulering.',
    },
    {
      ikon: BookOpen,
      tittel: 'Visningsguide',
      beskrivelse: 'Steg-for-steg guide for gjennomføring av tomtevisning.',
    },
    {
      ikon: ListChecks,
      tittel: 'Sjekkliste',
      beskrivelse: 'Komplett sjekkliste for hele salgsprosessen fra A til Å.',
    },
    {
      ikon: Bell,
      tittel: 'Interessentvarsling',
      beskrivelse: 'Automatisk varsling når noen viser interesse for tomten din.',
    },
    {
      ikon: LayoutDashboard,
      tittel: 'Salgsdashboard',
      beskrivelse: 'Oversikt over visninger, interessenter, bud og status i sanntid.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Verktøy og maler
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Alt du trenger for å gjennomføre salget profesjonelt – inkludert i
            Analyse + Markedsføring-pakken.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {verktoy.map((v) => (
            <div
              key={v.tittel}
              className="flex items-start gap-4 bg-brand-50 rounded-xl border border-brand-200 p-5"
            >
              <div className="w-9 h-9 bg-tomtly-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <v.ikon className="w-4.5 h-4.5 text-tomtly-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-tomtly-dark mb-1 text-sm">
                  {v.tittel}
                </h3>
                <p className="text-xs text-brand-600 leading-relaxed">
                  {v.beskrivelse}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ ──────────────────────────────────────────────────────────── */

function FAQ() {
  const sporsmal = [
    {
      q: 'Hvor lang tid tar det å få tomteanalysen?',
      a: 'Vi leverer en komplett tomterapport innen 3-5 virkedager etter at du har sendt inn tomten din.',
    },
    {
      q: 'Hva om tomten min ikke kan bebygges?',
      a: 'Vi analyserer reguleringsplanen før vi starter. Hvis tomten ikke kan bebygges, får du beskjed umiddelbart og betaler ingenting.',
    },
    {
      q: 'Hva koster det egentlig?',
      a: 'Tomtly Salg koster 4 990 kr i oppstart + 2 % suksesshonorar + mva av salgssum (minimum 20 000 kr + mva). Du betaler suksesshonoraret kun ved gjennomført salg. Eiendomsoppgjør håndteres av vår samarbeidspartner Proff Oppgjør AS (9 000 kr + mva).',
    },
    {
      q: 'Kan jeg bruke analysen til å selge via FINN eller megler?',
      a: 'Ja, absolutt. Analysen og rapporten er din, og du står fritt til å bruke den som underlag hvor du vil – på FINN, via megler, eller privat.',
    },
    {
      q: 'Hvem håndterer oppgjøret?',
      a: 'Oppgjøret håndteres av vår samarbeidspartner Proff Oppgjør AS, en digital oppgjørstjeneste som tar seg av kontrakt, tinglysing og pengeoverføring. Kostnad: 9 000 kr + mva (+ 545 kr for tinglysing av sikringsobligasjon).',
    },
    {
      q: 'Trenger jeg megler for å selge tomt?',
      a: 'Nei. I Norge kan du selge eiendom privat. Tomtly gir deg verktøyene og dokumentasjonen du trenger for å gjøre det profesjonelt og trygt. Oppgjør sikres via vår samarbeidspartner Proff Oppgjør AS.',
    },
    {
      q: 'Kan dere hjelpe med eiendom som ikke selger?',
      a: 'Ja. Har du en bolig eller hytte som sliter med å bli solgt, kan problemet ofte ligge i tomtens potensial. Vi analyserer hva som kan bygges — for eksempel rive og bygge nytt, eller utvide. Kjøpere som ser et ferdig prosjekt tar raskere beslutning.',
    },
  ]

  return (
    <section className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Ofte stilte spørsmål
          </h2>
        </div>

        <div className="space-y-4">
          {sporsmal.map((s) => (
            <div
              key={s.q}
              className="bg-white rounded-xl border border-brand-200 p-6"
            >
              <h3 className="font-semibold text-tomtly-dark mb-2">{s.q}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{s.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Juridisk disclaimer ──────────────────────────────────────────── */

function JuridiskDisclaimer() {
  return (
    <section className="bg-brand-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-4 items-start bg-white rounded-xl border border-brand-200 p-6">
          <div className="w-9 h-9 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Scale className="w-5 h-5 text-brand-500" />
          </div>
          <div>
            <h3 className="font-semibold text-tomtly-dark mb-2 text-sm">
              Juridisk informasjon
            </h3>
            <p className="text-xs text-brand-500 leading-relaxed">
              Tomtly er en analyseplattform og markedsplass for tomter, levert av
              NOPS AS (org.nr 933 819 086). Tomtly driver ikke eiendomsmegling.
              Verdivurderinger er estimater basert på offentlige data og
              sammenlignbare salg, og utgjør ikke en formell takst. Selger er selv
              ansvarlig for opplysningsplikten etter avhendingslova. Oppgjør ved
              salg gjennomføres av Proff Oppgjør AS, vår samarbeidspartner og en uavhengig digital oppgjørstjeneste som
              sikrer trygg overføring av eiendom og penger. Tomtly anbefaler at
              selger setter seg inn i sine rettigheter og plikter, og ved behov
              konsulterer advokat.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ──────────────────────────────────────────────────────────── */

function CTASection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
          Start din tomteanalyse i dag
        </h2>
        <p className="text-brand-400 mb-8 max-w-lg mx-auto">
          Det tar under 5 minutter å registrere tomten. Du får en komplett
          rapport med alt du trenger for å selge – uten megler.
        </p>
        <Link
          href="/selger/onboarding"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
        >
          Bestill tomteanalyse
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="text-xs text-brand-500 mt-6">
          Spørsmål? Kontakt oss på{' '}
          <a href="mailto:hey@nops.no" className="text-brand-300 underline">
            hey@nops.no
          </a>
        </p>
      </div>
    </section>
  )
}
