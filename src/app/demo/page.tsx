import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MapPin, TrendingUp, Users, Eye, BarChart3, CheckCircle2,
  ArrowRight, MessageSquare, FileText, Bell, Calendar, Shield,
  Home, Camera, Megaphone, Clock, ExternalLink, Star
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Se hva du får — Tomtly kundedemo',
  description: 'Se hvordan Tomtly-plattformen ser ut for selgere. Tomteanalyse, interessenter, markedsføring, bud og oppgjør — alt på ett sted.',
}

export default function DemoPage() {
  return (
    <main className="bg-tomtly-warm min-h-screen">
      {/* Hero */}
      <section className="bg-tomtly-dark text-white py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-tomtly-gold text-sm font-semibold uppercase tracking-wide mb-3">Kundedemo</p>
          <h1 className="font-display text-3xl lg:text-5xl font-bold mb-4">
            Se hva du får med Tomtly
          </h1>
          <p className="text-xl text-brand-300 max-w-2xl mx-auto mb-8">
            Her er et eksempel på hvordan det ser ut når tomten din er aktiv på Tomtly.
            Alt dette er inkludert for 4 990 kr.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-xs">
            <span className="bg-white/10 px-3 py-1.5 rounded-full">Ekte eksempel fra Nesodden</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">605 m² boligtomt</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">11 interessenter</span>
            <span className="bg-white/10 px-3 py-1.5 rounded-full">312 visninger</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* ═══ 1. Nøkkeltall ═══ */}
        <section>
          <SectionHeader icon={<BarChart3 className="w-5 h-5" />} title="Ditt dashboard" subtitle="Alt du trenger på ett sted" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard label="Sidevisninger" value="312" change="+18 denne uken" trend="up" />
            <MetricCard label="Interessenter" value="11" change="+3 nye siste 7 dager" trend="up" />
            <MetricCard label="Visningsforespørsler" value="4" change="2 venter på svar" trend="neutral" />
            <MetricCard label="Dager på markedet" value="8" change="Publisert 15. mars" trend="neutral" />
          </div>
        </section>

        {/* ═══ 2. Tomtepresentasjon ═══ */}
        <section>
          <SectionHeader icon={<Home className="w-5 h-5" />} title="Profesjonell tomteside" subtitle="Slik presenteres tomten din for kjøpere" />
          <div className="bg-white rounded-2xl border border-brand-200 overflow-hidden">
            <div className="bg-gradient-to-r from-forest-50 to-white p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-tomtly-dark mb-2">Bjørnemyrveien 20, 1459 Nesodden</h3>
                  <p className="text-brand-600 mb-4">605 m² boligtomt med gode solforhold. Regulert til frittliggende småhusbebyggelse. 20 % BYA.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {[
                      { l: 'Prisantydning', v: '3 000 000 kr' },
                      { l: 'Tomteareal', v: '605 m²' },
                      { l: 'Regulering', v: 'Bolig' },
                      { l: '%-BYA', v: '20 % (121 m²)' },
                    ].map(s => (
                      <div key={s.l} className="bg-white rounded-lg p-3 border border-brand-100 text-center">
                        <p className="text-[10px] text-brand-500 uppercase">{s.l}</p>
                        <p className="text-sm font-bold text-tomtly-dark">{s.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-forest-100 text-tomtly-accent px-2.5 py-1 rounded-full font-medium">4 husmodeller</span>
                    <span className="text-xs bg-forest-100 text-tomtly-accent px-2.5 py-1 rounded-full font-medium">Byggekalkyle</span>
                    <span className="text-xs bg-forest-100 text-tomtly-accent px-2.5 py-1 rounded-full font-medium">Reguleringssjekk</span>
                    <span className="text-xs bg-forest-100 text-tomtly-accent px-2.5 py-1 rounded-full font-medium">DOK-analyse</span>
                    <span className="text-xs bg-forest-100 text-tomtly-accent px-2.5 py-1 rounded-full font-medium">Solforhold</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-brand-50 border-t border-brand-200 text-center">
              <Link href="/tomter/bjornemyrveien-20" className="text-sm font-semibold text-tomtly-accent hover:underline flex items-center justify-center gap-1">
                Se den ekte tomtesiden <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══ 3. Interessenter ═══ */}
        <section>
          <SectionHeader icon={<Users className="w-5 h-5" />} title="Interessenter som tar kontakt" subtitle="Vi holder oversikten og foreslår svar — du bestemmer" />
          <div className="space-y-3">
            {[
              { navn: 'Familien Hansen', type: 'Privatperson', status: 'Bud mottatt', statusBg: 'bg-green-100 text-green-800', notat: 'Har gitt muntlig bud på 2 700 000 kr. Avventer skriftlig.', tid: '3 dager siden' },
              { navn: 'Kari Nordby', type: 'Privatperson', status: 'Visning avtalt', statusBg: 'bg-blue-100 text-blue-800', notat: 'Visning avtalt lørdag 29. mars kl. 12:00.', tid: 'I går' },
              { navn: 'Martin Olsen', type: 'Privatperson', status: 'Ny', statusBg: 'bg-amber-100 text-amber-800', notat: 'Ønsker å bygge enebolig, familie med 2 barn.', tid: '1 time siden' },
              { navn: 'OBOS Boligutvikling', type: 'Selskap', status: 'Kontaktet', statusBg: 'bg-purple-100 text-purple-800', notat: 'Forespørsel om utviklingspotensial, ønsker mulighetsstudie.', tid: '1 uke siden' },
              { navn: 'Erik Johansen', type: 'Utbygger', status: 'Kontaktet', statusBg: 'bg-purple-100 text-purple-800', notat: 'Interessert i fradeling og utvikling av to enheter.', tid: '3 dager siden' },
            ].map((i) => (
              <div key={i.navn} className="bg-white rounded-xl border border-brand-200 p-4 flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-tomtly-dark text-sm">{i.navn}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${i.statusBg}`}>{i.status}</span>
                  </div>
                  <p className="text-xs text-brand-500 mb-1">{i.type} — {i.tid}</p>
                  <p className="text-xs text-brand-600">{i.notat}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <span className="px-3 py-1.5 text-xs font-medium bg-tomtly-accent text-white rounded-lg">Svar</span>
                  <span className="px-3 py-1.5 text-xs font-medium bg-brand-100 text-brand-600 rounded-lg">Detaljer</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-400 mt-3 text-center">Tomtly foreslår svarmaler for alle henvendelser — du trenger bare å godkjenne og sende.</p>
        </section>

        {/* ═══ 4. Markedsføring ═══ */}
        <section>
          <SectionHeader icon={<Megaphone className="w-5 h-5" />} title="Aktiv markedsføring" subtitle="Vi når kjøperne der de er" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { kanal: 'Tomtly.no', ikon: '🌐', status: 'Publisert', detalj: '312 visninger totalt', bg: 'bg-forest-50 border-forest-200' },
              { kanal: 'Annonsering', ikon: '📣', status: 'Aktiv kampanje', detalj: '14 800 rekkevidde, 218 klikk', bg: 'bg-blue-50 border-blue-200' },
              { kanal: 'E-postkampanje', ikon: '📧', status: 'Sendt', detalj: '342 registrerte kjøpere på Nesodden', bg: 'bg-purple-50 border-purple-200' },
            ].map(m => (
              <div key={m.kanal} className={`rounded-xl border p-5 ${m.bg}`}>
                <p className="text-2xl mb-2">{m.ikon}</p>
                <p className="font-semibold text-tomtly-dark text-sm">{m.kanal}</p>
                <p className="text-xs text-tomtly-accent font-medium">{m.status}</p>
                <p className="text-[10px] text-brand-500 mt-1">{m.detalj}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 5. Aktivitetslogg ═══ */}
        <section>
          <SectionHeader icon={<Bell className="w-5 h-5" />} title="Alt som skjer — i sanntid" subtitle="Du ser hver visning, henvendelse og bud" />
          <div className="bg-white rounded-2xl border border-brand-200 divide-y divide-brand-100">
            {[
              { ikon: '🔔', tekst: 'Ny interessent: Martin Olsen har registrert interesse.', tid: '1 time siden', handling: true },
              { ikon: '👁️', tekst: 'Tomten ble sett 24 ganger i dag — over gjennomsnittet.', tid: '3 timer siden', handling: false },
              { ikon: '🔔', tekst: 'Kari Nordby ønsker visning lørdag 29. mars kl. 12:00.', tid: 'I går', handling: true },
              { ikon: '📣', tekst: 'Ny annonsekampanje startet — barnefamilier på Nesodden og Follo.', tid: 'I går', handling: false },
              { ikon: '🔔', tekst: 'Familien Hansen ga muntlig bud på 2 700 000 kr.', tid: '3 dager siden', handling: true },
              { ikon: '📧', tekst: 'E-postkampanje sendt til 342 registrerte tomtekjøpere.', tid: '1 uke siden', handling: false },
              { ikon: '✅', tekst: 'Tomten publisert på tomtly.no med fullstendig profil.', tid: '8 dager siden', handling: false },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 p-4">
                <span className="text-lg">{a.ikon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-brand-700">{a.tekst}</p>
                  <p className="text-[10px] text-brand-400 mt-0.5">{a.tid}</p>
                </div>
                {a.handling && (
                  <span className="text-[10px] font-semibold text-tomtly-accent bg-forest-50 px-2 py-1 rounded flex-shrink-0">Handling</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ 6. Fremdrift ═══ */}
        <section>
          <SectionHeader icon={<CheckCircle2 className="w-5 h-5" />} title="Fremdrift — fra analyse til salg" subtitle="Du ser alltid hvor langt vi har kommet" />
          <div className="bg-white rounded-2xl border border-brand-200 p-6">
            <div className="space-y-0">
              {[
                { steg: 'Tomt registrert', status: 'done' },
                { steg: 'Tomterapport ferdigstilt', status: 'done' },
                { steg: 'Publisert på tomtly.no', status: 'done' },
                { steg: 'Annonsekampanje startet', status: 'done' },
                { steg: 'Motta visningsforespørsler', status: 'current' },
                { steg: 'Gjennomfør visninger', status: 'future' },
                { steg: 'Motta bud', status: 'future' },
                { steg: 'Aksepter bud', status: 'future' },
                { steg: 'Oppgjør via Proff Oppgjør AS', status: 'future' },
                { steg: 'Overlevering', status: 'future' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    s.status === 'done' ? 'bg-green-500 text-white' :
                    s.status === 'current' ? 'bg-tomtly-accent text-white ring-4 ring-tomtly-accent/20' :
                    'bg-brand-200 text-brand-400'
                  }`}>
                    {s.status === 'done' ? <CheckCircle2 className="w-3.5 h-3.5" /> :
                     s.status === 'current' ? <Clock className="w-3.5 h-3.5" /> :
                     <span className="w-2 h-2 rounded-full bg-brand-300" />}
                  </div>
                  <span className={`text-sm ${
                    s.status === 'done' ? 'text-green-700 font-medium' :
                    s.status === 'current' ? 'text-tomtly-dark font-semibold' :
                    'text-brand-400'
                  }`}>{s.steg}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ 7. Dokumenter ═══ */}
        <section>
          <SectionHeader icon={<FileText className="w-5 h-5" />} title="Alle dokumenter samlet" subtitle="Rapport, budskjema, reguleringsbestemmelser — alt klart" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { navn: 'Tomterapport', ikon: '📄' },
              { navn: 'Budskjema', ikon: '📝' },
              { navn: 'Akseptbrev', ikon: '✉️' },
              { navn: 'Visningsguide', ikon: '🗺️' },
              { navn: 'Sjekkliste for kjøper', ikon: '☑️' },
              { navn: 'Reguleringsbestemmelser', ikon: '📋' },
            ].map(d => (
              <div key={d.navn} className="bg-white rounded-xl border border-brand-200 p-4 flex items-center gap-3">
                <span className="text-xl">{d.ikon}</span>
                <div>
                  <p className="text-sm font-medium text-tomtly-dark">{d.navn}</p>
                  <p className="text-[10px] text-brand-400">PDF — klar til nedlasting</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="bg-tomtly-dark rounded-2xl p-8 lg:p-12 text-center">
          <Star className="w-10 h-10 text-tomtly-gold mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Alt dette for 4 990 kr
          </h2>
          <p className="text-brand-300 mb-2 max-w-xl mx-auto">
            Tomteanalyse, husmodeller, kart, kalkyle, salgsside, markedsføring, interessenthåndtering og faglig rådgivning.
          </p>
          <p className="text-brand-400 text-sm mb-8">
            + 2 % suksesshonorar kun ved gjennomført salg. Ingen salg = ingen ekstra kostnad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/selger/onboarding"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors text-lg"
            >
              Legg ut din tomt <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/tomter/alvaern-65"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-600 text-white font-semibold rounded-xl hover:bg-brand-900 transition-colors"
            >
              Se solgt tomt-eksempel
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

// ─── Helpers ─────────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 text-tomtly-accent mb-1">{icon}<h2 className="font-display text-xl font-bold text-tomtly-dark">{title}</h2></div>
      <p className="text-sm text-brand-500">{subtitle}</p>
    </div>
  )
}

function MetricCard({ label, value, change, trend }: { label: string; value: string; change: string; trend: 'up' | 'down' | 'neutral' }) {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-5">
      <p className="text-xs text-brand-500 uppercase tracking-wide">{label}</p>
      <p className="font-display text-3xl font-bold text-tomtly-dark mt-1">{value}</p>
      <p className={`text-xs mt-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-brand-400'}`}>
        {trend === 'up' ? '↑ ' : trend === 'down' ? '↓ ' : ''}{change}
      </p>
    </div>
  )
}
