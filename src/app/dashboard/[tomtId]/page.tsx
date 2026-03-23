'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Demo Data ──────────────────────────────────────────────────────────────────

const TOMT_DATA = {
  id: 'bjornemyrveien-20',
  adresse: 'Bjørnemyrveien 20, 1453 Bjørnemyr',
  kommune: 'Nordre Follo',
  status: 'aktiv',
  dagerPaaMarkedet: 34,
  pakke: 'Tomtly Komplett',
  pris: 2850000,
  areal: 812,
}

const METRICS = {
  visninger: { tall: 247, endring: '+12 denne uken', trend: 'up' },
  interessenter: { tall: 8, endring: '+3 nye siste 7 dager', trend: 'up' },
  visningsforesporsler: { tall: 3, endring: '2 venter på svar', trend: 'neutral' },
  tomtescore: { tall: '8.2/10', endring: 'Over gjennomsnittet', trend: 'up' },
}

const ACTIVITIES = [
  { id: 1, type: 'interessent', icon: '🔔', tid: '2 timer siden', tekst: 'Ny interessent: Martin Olsen har registrert interesse for tomten.', harHandling: true },
  { id: 2, type: 'visning', icon: '👁️', tid: '5 timer siden', tekst: 'Tomten ble sett 18 ganger i dag – over gjennomsnittet for uka.', harHandling: false },
  { id: 3, type: 'interessent', icon: '🔔', tid: 'I går, 16:42', tekst: 'Kari Nordby ønsker visning lørdag 29. mars kl. 12:00.', harHandling: true },
  { id: 4, type: 'kampanje', icon: '📣', tid: 'I går, 09:00', tekst: 'Ny annonsekampanje startet – målgruppe: barnefamilier i Akershus.', harHandling: false },
  { id: 5, type: 'system', icon: '✅', tid: '2 dager siden', tekst: 'Tomterapport oppdatert med nye reguleringsbestemmelser.', harHandling: false },
  { id: 6, type: 'interessent', icon: '🔔', tid: '3 dager siden', tekst: 'Erik Johansen ba om mer informasjon om infrastruktur.', harHandling: true },
  { id: 7, type: 'rapport', icon: '📈', tid: '4 dager siden', tekst: 'Ukentlig rapport klar: 84 visninger, 2 nye interessenter.', harHandling: false },
  { id: 8, type: 'visning', icon: '👁️', tid: '5 dager siden', tekst: 'Visning gjennomført med familien Hansen – positiv tilbakemelding.', harHandling: false },
  { id: 9, type: 'kampanje', icon: '📣', tid: '1 uke siden', tekst: 'E-postkampanje sendt til 342 registrerte tomtekjøpere.', harHandling: false },
  { id: 10, type: 'system', icon: '✅', tid: '1 uke siden', tekst: 'Tomten ble publisert på Tomtly.no med fullstendig profil.', harHandling: false },
  { id: 11, type: 'interessent', icon: '🔔', tid: '1 uke siden', tekst: 'Boligbyggelaget OBOS sendte forespørsel om tomtens utviklingspotensial.', harHandling: true },
  { id: 12, type: 'rapport', icon: '📈', tid: '2 uker siden', tekst: 'Tomtescore beregnet: 8.2/10 – god beliggenhet og regulering.', harHandling: false },
]

type InteressentStatus = 'ny' | 'kontaktet' | 'visning_avtalt' | 'bud_mottatt'

interface Interessent {
  id: number
  navn: string
  type: string
  dato: string
  status: InteressentStatus
  telefon: string
  epost: string
  notat: string
}

const INTERESSENTER: Interessent[] = [
  { id: 1, navn: 'Martin Olsen', type: 'Privatperson', dato: '2026-03-23', status: 'ny', telefon: '912 34 567', epost: 'martin.olsen@gmail.com', notat: 'Ønsker å bygge enebolig, familie med 2 barn.' },
  { id: 2, navn: 'Kari Nordby', type: 'Privatperson', dato: '2026-03-22', status: 'visning_avtalt', telefon: '934 56 789', epost: 'kari.nordby@outlook.com', notat: 'Visning avtalt lørdag 29. mars kl. 12:00.' },
  { id: 3, navn: 'Erik Johansen', type: 'Utbygger', dato: '2026-03-20', status: 'kontaktet', telefon: '901 23 456', epost: 'erik@johansen-bygg.no', notat: 'Interessert i fradeling og utvikling av to enheter.' },
  { id: 4, navn: 'OBOS Boligutvikling', type: 'Selskap', dato: '2026-03-16', status: 'kontaktet', telefon: '22 86 55 00', epost: 'tomter@obos.no', notat: 'Forespørsel om utviklingspotensial, ønsker mulighetsstudie.' },
  { id: 5, navn: 'Familien Hansen', type: 'Privatperson', dato: '2026-03-18', status: 'bud_mottatt', telefon: '976 54 321', epost: 'hansen.fam@gmail.com', notat: 'Har gitt muntlig bud på 2 700 000 kr. Avventer skriftlig.' },
]

const STATUS_LABELS: Record<InteressentStatus, string> = {
  ny: 'Ny',
  kontaktet: 'Kontaktet',
  visning_avtalt: 'Visning avtalt',
  bud_mottatt: 'Bud mottatt',
}

const STATUS_COLORS: Record<InteressentStatus, string> = {
  ny: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  kontaktet: 'bg-blue-100 text-blue-800 border-blue-300',
  visning_avtalt: 'bg-green-100 text-green-800 border-green-300',
  bud_mottatt: 'bg-purple-100 text-purple-800 border-purple-300',
}

// Last 14 days traffic data
const TRAFFIC_DATA = [
  { dag: '10. mar', visninger: 12 },
  { dag: '11. mar', visninger: 15 },
  { dag: '12. mar', visninger: 22 },
  { dag: '13. mar', visninger: 18 },
  { dag: '14. mar', visninger: 8 },
  { dag: '15. mar', visninger: 6 },
  { dag: '16. mar', visninger: 14 },
  { dag: '17. mar', visninger: 19 },
  { dag: '18. mar', visninger: 25 },
  { dag: '19. mar', visninger: 31 },
  { dag: '20. mar', visninger: 28 },
  { dag: '21. mar', visninger: 16 },
  { dag: '22. mar', visninger: 21 },
  { dag: '23. mar', visninger: 12 },
]

const DOCUMENTS = [
  { navn: 'Tomterapport', type: 'PDF', dato: '20. mars 2026', ikon: '📄' },
  { navn: 'Budskjema', type: 'PDF', dato: '16. mars 2026', ikon: '📝' },
  { navn: 'Akseptbrev', type: 'PDF', dato: '16. mars 2026', ikon: '✉️' },
  { navn: 'Visningsguide', type: 'PDF', dato: '15. mars 2026', ikon: '🗺️' },
  { navn: 'Sjekkliste for kjøper', type: 'PDF', dato: '15. mars 2026', ikon: '☑️' },
  { navn: 'Reguleringsbestemmelser', type: 'PDF', dato: '10. mars 2026', ikon: '📋' },
]

const PROGRESS_STEPS = [
  { steg: 'Tomt registrert', status: 'done' as const },
  { steg: 'Tomterapport ferdigstilt', status: 'done' as const },
  { steg: 'Publisert på Tomtly.no', status: 'done' as const },
  { steg: 'Annonsekampanje startet', status: 'done' as const },
  { steg: 'Motta visningsforespørsler', status: 'current' as const },
  { steg: 'Gjennomfør visninger', status: 'future' as const },
  { steg: 'Motta bud', status: 'future' as const },
  { steg: 'Aksepter bud', status: 'future' as const },
  { steg: 'Oppgjør via Propr', status: 'future' as const },
  { steg: 'Overlevering', status: 'future' as const },
]

const MARKETING = [
  { kanal: 'Tomtly.no', status: 'Publisert', detalj: '247 visninger totalt', ikon: '🌐', farge: 'bg-forest-50 border-forest-200' },
  { kanal: 'Annonsering', status: 'Aktiv kampanje', detalj: '12 400 rekkevidde · 186 klikk', ikon: '📣', farge: 'bg-blue-50 border-blue-200' },
  { kanal: 'E-postliste', status: 'Sendt', detalj: 'Sendt til 342 registrerte kjøpere', ikon: '📧', farge: 'bg-purple-50 border-purple-200' },
]

// ─── Property details for summary card ──────────────────────────────────────────

const TOMT_DETALJER = {
  regulering: 'Boligformål – frittliggende småhusbebyggelse',
  utnyttelsesgrad: '25% BYA',
  maksHoyde: '8,0 meter (mønehøyde)',
  vann: 'Offentlig tilknytning',
  avlop: 'Offentlig tilknytning',
  adkomst: 'Felles privat vei fra Bjørnemyrveien',
  grunnforhold: 'Fjell / morene – gode grunnforhold',
  solforhold: 'Gode solforhold, sør-vestvendt',
  stoy: 'Gul støysone (vei) – tiltak i byggesøknad',
  prisantydning: '2 850 000 kr',
  kommunaleAvgifter: '12 400 kr/år (estimat)',
  matrikkel: '3024-41/123',
}

const QUICK_ACTIONS = [
  { label: 'Del tomteprofil', ikon: '🔗', beskrivelse: 'Kopier lenke til tomtens profil på Tomtly.no' },
  { label: 'Inviter til visning', ikon: '📅', beskrivelse: 'Send visningsinvitasjon til interessenter' },
  { label: 'Last opp dokument', ikon: '📎', beskrivelse: 'Legg til nytt dokument i dokumentarkivet' },
  { label: 'Kontakt megler', ikon: '🏠', beskrivelse: 'Send melding til din meglerkontakt hos Tomtly' },
]

const TRAFFIC_SOURCES = [
  { kilde: 'Tomtly.no – direkte', prosent: 38, visninger: 94 },
  { kilde: 'Google søk', prosent: 24, visninger: 59 },
  { kilde: 'Facebook-annonse', prosent: 18, visninger: 44 },
  { kilde: 'E-postkampanje', prosent: 12, visninger: 30 },
  { kilde: 'Annet / delt lenke', prosent: 8, visninger: 20 },
]

const TIPS = [
  {
    tittel: 'Svar raskt på forespørsler',
    tekst: 'Interessenter som får svar innen 2 timer har 3x høyere sannsynlighet for å booke visning. Du har 2 ubesvarte forespørsler.',
    prioritet: 'hoy' as const,
  },
  {
    tittel: 'Vurder å senke prisantydning',
    tekst: 'Tomter i ditt område med lignende areal selges i snitt for 2 650 000 kr. En prisjustering kan øke interessen.',
    prioritet: 'medium' as const,
  },
  {
    tittel: 'Del tomten på sosiale medier',
    tekst: 'Tomter som deles aktivt på Facebook og Instagram får i snitt 40% flere visninger den første måneden.',
    prioritet: 'lav' as const,
  },
]

// ─── Sidebar Nav Items ──────────────────────────────────────────────────────────

type NavSection = 'oversikt' | 'interessenter' | 'statistikk' | 'dokumenter' | 'innstillinger'

const NAV_ITEMS: { id: NavSection; label: string; ikon: string }[] = [
  { id: 'oversikt', label: 'Oversikt', ikon: '📊' },
  { id: 'interessenter', label: 'Interessenter', ikon: '👥' },
  { id: 'statistikk', label: 'Statistikk', ikon: '📈' },
  { id: 'dokumenter', label: 'Dokumenter', ikon: '📁' },
  { id: 'innstillinger', label: 'Innstillinger', ikon: '⚙️' },
]

// ─── Main Component ─────────────────────────────────────────────────────────────

export default function SelgerDashboard() {
  const [activeNav, setActiveNav] = useState<NavSection>('oversikt')
  const [expandedInteressent, setExpandedInteressent] = useState<number | null>(null)
  const [interessentStatuser, setInteressentStatuser] = useState<Record<number, InteressentStatus>>(
    Object.fromEntries(INTERESSENTER.map((i) => [i.id, i.status]))
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const harBud = Object.values(interessentStatuser).includes('bud_mottatt')

  const maxVisninger = Math.max(...TRAFFIC_DATA.map((d) => d.visninger))
  const totalVisninger = TRAFFIC_DATA.reduce((sum, d) => sum + d.visninger, 0)
  const gjennomsnitt = Math.round(totalVisninger / TRAFFIC_DATA.length)
  const besteDag = TRAFFIC_DATA.reduce((best, d) => (d.visninger > best.visninger ? d : best))

  function updateStatus(id: number, status: InteressentStatus) {
    setInteressentStatuser((prev) => ({ ...prev, [id]: status }))
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen">
      {/* ── Mobile sidebar toggle ──────────────────────────────────────────── */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-tomtly-dark text-white p-2 rounded-lg shadow-lg"
        aria-label="Åpne meny"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-tomtly-dark text-white flex flex-col
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold tracking-tight text-white">Tomtly</span>
          </Link>
          <p className="text-xs text-white/50 mt-1">Selger Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id)
                setSidebarOpen(false)
              }}
              className={`
                w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors text-left
                ${activeNav === item.id
                  ? 'bg-white/10 text-white border-r-2 border-tomtly-gold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <span className="text-lg">{item.ikon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="p-6 border-t border-white/10">
          <p className="text-xs text-white/40 leading-relaxed">
            Trenger hjelp?
            <br />
            <a href="mailto:hey@nops.no" className="text-tomtly-gold hover:underline">
              hey@nops.no
            </a>
          </p>
        </div>
      </aside>

      {/* ── Mobile overlay ─────────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0">

        {/* ── Top Bar ────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-20 bg-white border-b border-brand-200 px-4 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-display font-bold text-tomtly-dark">
                {TOMT_DATA.adresse}
              </h1>
              <p className="text-sm text-brand-500">{TOMT_DATA.kommune} · {TOMT_DATA.areal} m²</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Aktiv
              </span>
              <span className="text-xs text-brand-500 bg-brand-100 px-3 py-1 rounded-full">
                {TOMT_DATA.dagerPaaMarkedet} dager på markedet
              </span>
              <span className="text-xs text-tomtly-accent bg-forest-50 px-3 py-1 rounded-full font-medium border border-forest-200">
                {TOMT_DATA.pakke}
              </span>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-8 py-6 max-w-6xl">

          {/* ── Key Metrics ──────────────────────────────────────────────── */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Visninger', ...METRICS.visninger },
              { label: 'Interessenter', ...METRICS.interessenter },
              { label: 'Visningsforespørsler', ...METRICS.visningsforesporsler },
              { label: 'Tomtescore', ...METRICS.tomtescore },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-xl border border-brand-200 p-5 hover:shadow-md transition-shadow"
              >
                <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">
                  {m.label}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-tomtly-dark font-mono">
                  {m.tall}
                </p>
                <p className={`text-xs mt-1 ${m.trend === 'up' ? 'text-green-600' : 'text-brand-400'}`}>
                  {m.trend === 'up' && '↑ '}{m.endring}
                </p>
              </div>
            ))}
          </section>

          {/* ── Quick Actions ────────────────────────────────────────────── */}
          <section className="mb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  className="bg-white rounded-xl border border-brand-200 p-4 hover:shadow-md hover:border-forest-300 transition-all text-left group"
                >
                  <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform inline-block">
                    {a.ikon}
                  </span>
                  <p className="text-sm font-medium text-tomtly-dark mb-0.5">{a.label}</p>
                  <p className="text-xs text-brand-400 leading-relaxed">{a.beskrivelse}</p>
                </button>
              ))}
            </div>
          </section>

          {/* ── Tips / Neste steg ─────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Anbefalinger
            </h2>
            <div className="space-y-3">
              {TIPS.map((tip, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border p-4 flex items-start gap-4 ${
                    tip.prioritet === 'hoy'
                      ? 'bg-red-50 border-red-200'
                      : tip.prioritet === 'medium'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-brand-50 border-brand-200'
                  }`}
                >
                  <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    tip.prioritet === 'hoy'
                      ? 'bg-red-500'
                      : tip.prioritet === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-brand-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-tomtly-dark mb-0.5">{tip.tittel}</p>
                    <p className="text-xs text-brand-500 leading-relaxed">{tip.tekst}</p>
                  </div>
                  <button className="flex-shrink-0 text-xs font-medium text-tomtly-accent hover:underline mt-0.5">
                    Se mer
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Activity Feed ────────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Aktivitet
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 divide-y divide-brand-100">
              {ACTIVITIES.map((a) => (
                <div key={a.id} className="px-5 py-4 flex items-start gap-4 hover:bg-brand-50 transition-colors">
                  <span className="text-xl mt-0.5 flex-shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-tomtly-dark leading-relaxed">{a.tekst}</p>
                    <p className="text-xs text-brand-400 mt-1">{a.tid}</p>
                  </div>
                  {a.harHandling && (
                    <button className="flex-shrink-0 text-xs font-medium text-tomtly-accent bg-forest-50 hover:bg-forest-100 border border-forest-200 px-3 py-1.5 rounded-lg transition-colors">
                      Svar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Interessenter Table ──────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Interessenter
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              {/* Table header */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_120px_100px_140px_50px] gap-4 px-5 py-3 bg-brand-50 border-b border-brand-200 text-xs font-medium text-brand-500 uppercase tracking-wide">
                <span>Navn</span>
                <span>Type</span>
                <span>Dato</span>
                <span>Status</span>
                <span />
              </div>

              {/* Table rows */}
              {INTERESSENTER.map((i) => {
                const currentStatus = interessentStatuser[i.id]
                const isExpanded = expandedInteressent === i.id

                return (
                  <div key={i.id} className="border-b border-brand-100 last:border-0">
                    {/* Main row */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_100px_140px_50px] gap-2 sm:gap-4 px-5 py-4 items-center hover:bg-brand-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-tomtly-dark">{i.navn}</p>
                        <p className="text-xs text-brand-400 sm:hidden">{i.type} · {i.dato}</p>
                      </div>
                      <span className="hidden sm:block text-sm text-brand-600">{i.type}</span>
                      <span className="hidden sm:block text-sm text-brand-500">{i.dato.slice(5)}</span>
                      <div>
                        <select
                          value={currentStatus}
                          onChange={(e) => updateStatus(i.id, e.target.value as InteressentStatus)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer appearance-none ${STATUS_COLORS[currentStatus]}`}
                        >
                          {(Object.keys(STATUS_LABELS) as InteressentStatus[]).map((s) => (
                            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => setExpandedInteressent(isExpanded ? null : i.id)}
                        className="text-brand-400 hover:text-tomtly-dark transition-colors text-sm"
                        aria-label="Vis detaljer"
                      >
                        {isExpanded ? '▲' : '▼'}
                      </button>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="px-5 pb-4 bg-brand-50 animate-fade-up">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-brand-400 mb-1">Telefon</p>
                            <p className="text-tomtly-dark font-mono">{i.telefon}</p>
                          </div>
                          <div>
                            <p className="text-xs text-brand-400 mb-1">E-post</p>
                            <p className="text-tomtly-dark">{i.epost}</p>
                          </div>
                          <div>
                            <p className="text-xs text-brand-400 mb-1">Notat</p>
                            <p className="text-brand-600">{i.notat}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <a
                            href={`tel:${i.telefon.replace(/\s/g, '')}`}
                            className="text-xs bg-tomtly-accent text-white px-3 py-1.5 rounded-lg hover:bg-forest-600 transition-colors"
                          >
                            Ring
                          </a>
                          <a
                            href={`mailto:${i.epost}`}
                            className="text-xs bg-white border border-brand-200 text-tomtly-dark px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                          >
                            Send e-post
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>

          {/* ── Traffic Chart (CSS-based) ────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Trafikk siste 14 dager
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              {/* Bar chart */}
              <div className="flex items-end gap-1 sm:gap-2 h-40 mb-4">
                {TRAFFIC_DATA.map((d, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-brand-400">{d.visninger}</span>
                    <div
                      className="w-full rounded-t bg-gradient-to-t from-forest-500 to-forest-300 transition-all duration-300 hover:from-tomtly-accent hover:to-forest-400"
                      style={{ height: `${(d.visninger / maxVisninger) * 100}%` }}
                    />
                    <span className="text-[9px] text-brand-400 whitespace-nowrap hidden sm:block">
                      {d.dag.slice(0, 6)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-brand-100">
                <div>
                  <p className="text-xs text-brand-400">Totalt</p>
                  <p className="text-lg font-bold font-mono text-tomtly-dark">{totalVisninger}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-400">Gjennomsnitt/dag</p>
                  <p className="text-lg font-bold font-mono text-tomtly-dark">{gjennomsnitt}</p>
                </div>
                <div>
                  <p className="text-xs text-brand-400">Beste dag</p>
                  <p className="text-lg font-bold font-mono text-tomtly-dark">{besteDag.visninger} <span className="text-xs font-normal text-brand-400">({besteDag.dag})</span></p>
                </div>
                <div>
                  <p className="text-xs text-brand-400">Trend</p>
                  <p className="text-lg font-bold text-green-600">↑ Stigende</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Traffic Sources ──────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Trafikkilder
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <div className="space-y-3">
                {TRAFFIC_SOURCES.map((s) => (
                  <div key={s.kilde}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-tomtly-dark">{s.kilde}</span>
                      <span className="text-sm font-mono text-brand-500">
                        {s.visninger} <span className="text-xs text-brand-400">({s.prosent}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-brand-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-forest-400 to-forest-600 transition-all duration-500"
                        style={{ width: `${s.prosent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-brand-100">
                <p className="text-xs text-brand-400">
                  Totalt 247 visninger fra {TRAFFIC_SOURCES.length} kilder siste 34 dager.
                  Hovedkilden er direkte trafikk til Tomtly.no.
                </p>
              </div>
            </div>
          </section>

          {/* ── Property Summary Card ────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Tomtedetaljer
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-100">
                {/* Column 1: Regulering */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
                    Regulering
                  </h3>
                  <div>
                    <p className="text-xs text-brand-400">Formål</p>
                    <p className="text-sm text-tomtly-dark">{TOMT_DETALJER.regulering}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Utnyttelsesgrad</p>
                    <p className="text-sm text-tomtly-dark font-mono">{TOMT_DETALJER.utnyttelsesgrad}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Maks byggehøyde</p>
                    <p className="text-sm text-tomtly-dark font-mono">{TOMT_DETALJER.maksHoyde}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Matrikkel</p>
                    <p className="text-sm text-tomtly-dark font-mono">{TOMT_DETALJER.matrikkel}</p>
                  </div>
                </div>

                {/* Column 2: Infrastruktur */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
                    Infrastruktur
                  </h3>
                  <div>
                    <p className="text-xs text-brand-400">Vann</p>
                    <p className="text-sm text-tomtly-dark">{TOMT_DETALJER.vann}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Avløp</p>
                    <p className="text-sm text-tomtly-dark">{TOMT_DETALJER.avlop}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Adkomst</p>
                    <p className="text-sm text-tomtly-dark">{TOMT_DETALJER.adkomst}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Grunnforhold</p>
                    <p className="text-sm text-tomtly-dark">{TOMT_DETALJER.grunnforhold}</p>
                  </div>
                </div>

                {/* Column 3: Økonomi & forhold */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
                    Økonomi & forhold
                  </h3>
                  <div>
                    <p className="text-xs text-brand-400">Prisantydning</p>
                    <p className="text-sm text-tomtly-dark font-bold font-mono">{TOMT_DETALJER.prisantydning}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Kommunale avgifter</p>
                    <p className="text-sm text-tomtly-dark font-mono">{TOMT_DETALJER.kommunaleAvgifter}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Solforhold</p>
                    <p className="text-sm text-tomtly-dark">{TOMT_DETALJER.solforhold}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Støy</p>
                    <p className="text-sm text-tomtly-dark">{TOMT_DETALJER.stoy}</p>
                  </div>
                </div>
              </div>

              {/* View public profile link */}
              <div className="border-t border-brand-100 px-5 py-3 bg-brand-50 flex items-center justify-between">
                <p className="text-xs text-brand-400">
                  Denne informasjonen vises til interessenter på tomteprofilen.
                </p>
                <Link
                  href={`/tomter/${TOMT_DATA.id}`}
                  className="text-xs font-medium text-tomtly-accent hover:underline flex items-center gap-1"
                >
                  Se offentlig profil
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 9L9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* ── Marketing Status ─────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Markedsføring
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {MARKETING.map((m) => (
                <div
                  key={m.kanal}
                  className={`rounded-xl border p-5 ${m.farge}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{m.ikon}</span>
                    <span className="text-sm font-semibold text-tomtly-dark">{m.kanal}</span>
                  </div>
                  <p className="text-xs font-medium text-green-700 mb-1">{m.status}</p>
                  <p className="text-xs text-brand-500">{m.detalj}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Documents ────────────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Dokumenter
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 divide-y divide-brand-100">
              {DOCUMENTS.map((d) => (
                <div key={d.navn} className="flex items-center justify-between px-5 py-3.5 hover:bg-brand-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{d.ikon}</span>
                    <div>
                      <p className="text-sm font-medium text-tomtly-dark">{d.navn}</p>
                      <p className="text-xs text-brand-400">{d.type} · {d.dato}</p>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-tomtly-accent bg-forest-50 hover:bg-forest-100 border border-forest-200 px-3 py-1.5 rounded-lg transition-colors">
                    Last ned
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Progress Checklist ────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Fremdrift
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <div className="space-y-0">
                {PROGRESS_STEPS.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {/* Vertical line + indicator */}
                    <div className="flex flex-col items-center">
                      {s.status === 'done' && (
                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                      {s.status === 'current' && (
                        <div className="w-7 h-7 rounded-full bg-tomtly-accent flex items-center justify-center flex-shrink-0 relative">
                          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                          <div className="absolute inset-0 rounded-full border-2 border-tomtly-accent animate-ping opacity-30" />
                        </div>
                      )}
                      {s.status === 'future' && (
                        <div className="w-7 h-7 rounded-full bg-brand-200 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-brand-400" />
                        </div>
                      )}
                      {/* Connector line */}
                      {idx < PROGRESS_STEPS.length - 1 && (
                        <div
                          className={`w-0.5 h-6 ${
                            s.status === 'done' ? 'bg-green-400' : s.status === 'current' ? 'bg-tomtly-accent/30' : 'bg-brand-200'
                          }`}
                        />
                      )}
                    </div>
                    {/* Label */}
                    <p
                      className={`text-sm pt-1 ${
                        s.status === 'done'
                          ? 'text-brand-500 line-through'
                          : s.status === 'current'
                            ? 'text-tomtly-dark font-semibold'
                            : 'text-brand-400'
                      }`}
                    >
                      {s.steg}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Oppgjør Section (visible when bud_mottatt) ───────────────── */}
          {harBud && (
            <section className="mb-8 animate-fade-up">
              <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
                Oppgjør
              </h2>
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-brand-600 mb-1">
                      Du har mottatt bud. Når bud er akseptert kan du starte oppgjør digitalt via Propr.
                    </p>
                    <p className="text-xs text-brand-400">
                      Propr håndterer trygt oppgjør, tinglysning og overføring av eiendom.
                    </p>
                  </div>
                  <a
                    href="https://propr.no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
                  >
                    Start oppgjør via Propr
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* ── Comparable Sales ────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Sammenlignbare salg i området
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="hidden sm:grid sm:grid-cols-[1fr_100px_100px_120px_100px] gap-4 px-5 py-3 bg-brand-50 border-b border-brand-200 text-xs font-medium text-brand-500 uppercase tracking-wide">
                <span>Adresse</span>
                <span>Areal</span>
                <span>Solgt for</span>
                <span>Kr/m²</span>
                <span>Dato</span>
              </div>
              {[
                { adresse: 'Bjørnemyrveien 14', areal: 780, pris: 2600000, dato: 'Jan 2026' },
                { adresse: 'Vestveien 8, Kolbotn', areal: 920, pris: 3100000, dato: 'Des 2025' },
                { adresse: 'Skogsrudveien 3', areal: 650, pris: 2200000, dato: 'Nov 2025' },
                { adresse: 'Rosenholm Alle 12', areal: 1050, pris: 3850000, dato: 'Okt 2025' },
                { adresse: 'Trollåsveien 22', areal: 740, pris: 2450000, dato: 'Sep 2025' },
              ].map((s, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_100px_100px_120px_100px] gap-1 sm:gap-4 px-5 py-3 border-b border-brand-100 last:border-0 hover:bg-brand-50 transition-colors"
                >
                  <p className="text-sm text-tomtly-dark font-medium">{s.adresse}</p>
                  <p className="text-sm text-brand-600 font-mono">{s.areal} m²</p>
                  <p className="text-sm text-tomtly-dark font-mono">{(s.pris / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-brand-500 font-mono">
                    {Math.round(s.pris / s.areal).toLocaleString('nb-NO')} kr
                  </p>
                  <p className="text-sm text-brand-400">{s.dato}</p>
                </div>
              ))}
              <div className="px-5 py-3 bg-brand-50 border-t border-brand-200">
                <p className="text-xs text-brand-400">
                  Gjennomsnittlig m²-pris i området: <span className="font-mono font-semibold text-tomtly-dark">3 310 kr/m²</span>.
                  Din tomt: <span className="font-mono font-semibold text-tomtly-dark">3 509 kr/m²</span> (prisantydning).
                </p>
              </div>
            </div>
          </section>

          {/* ── Notification Preferences ──────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Varsler og kontaktpreferanser
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <div className="space-y-4">
                {[
                  { label: 'Nye interessenter', beskrivelse: 'Få varsel når noen registrerer interesse', aktiv: true },
                  { label: 'Visningsforespørsler', beskrivelse: 'Bli varslet om nye forespørsler om visning', aktiv: true },
                  { label: 'Ukentlig rapport', beskrivelse: 'Motta sammendrag med statistikk hver mandag', aktiv: true },
                  { label: 'Markedsføringsoppdateringer', beskrivelse: 'Statusendringer for annonsekampanjer', aktiv: false },
                  { label: 'Prisendringer i området', beskrivelse: 'Varsle når sammenlignbare tomter endrer pris', aktiv: false },
                ].map((v, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-tomtly-dark">{v.label}</p>
                      <p className="text-xs text-brand-400">{v.beskrivelse}</p>
                    </div>
                    <div
                      className={`
                        w-10 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors
                        ${v.aktiv ? 'bg-tomtly-accent' : 'bg-brand-200'}
                      `}
                    >
                      <div
                        className={`
                          w-5 h-5 rounded-full bg-white shadow-sm transition-transform
                          ${v.aktiv ? 'translate-x-4' : 'translate-x-0'}
                        `}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-brand-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-tomtly-dark">E-post for varsler</p>
                    <p className="text-xs text-brand-400 font-mono">jakob@nops.no</p>
                  </div>
                  <button className="text-xs font-medium text-tomtly-accent hover:underline">
                    Endre
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Your Package ──────────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Din pakke
            </h2>
            <div className="bg-gradient-to-br from-forest-50 to-white rounded-xl border border-forest-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🌲</span>
                    <h3 className="text-lg font-display font-bold text-tomtly-dark">
                      Tomtly Komplett
                    </h3>
                  </div>
                  <p className="text-sm text-brand-600 mb-3 max-w-md">
                    Komplett analyse, markedsføring og salg via autorisert megler.
                    Inkluderer tomterapport, annonsering og interessenthåndtering.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Tomterapport',
                      'Mulighetsstudie',
                      'Profesjonelle bilder',
                      'Annonsering',
                      'Meglerstøtte',
                      'Oppgjør via Propr',
                    ].map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-forest-100 text-forest-700 px-2.5 py-1 rounded-full border border-forest-200"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-brand-400">Fastpris</p>
                  <p className="text-2xl font-bold font-mono text-tomtly-dark">4 990 kr</p>
                  <p className="text-xs text-brand-400 mt-0.5">+ 2,5 % ved salg</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Footer spacer ────────────────────────────────────────────── */}
          <div className="pb-12" />
        </div>
      </main>
    </div>
  )
}
