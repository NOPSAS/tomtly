'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Calculator,
  TrendingUp,
  DollarSign,
  BarChart3,
  Users,
  Banknote,
  Home,
  Hammer,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface RevenueRow {
  kilde: string
  inntekt: number
  kostnad: number
  margin: number
  note: string
}

interface ScenarioInputs {
  kunAnalyse: number
  analysePlusMarkedsforing: number
  fradelinger: number
  bankleads: number
  husleverandorAbonnenter: number
}

type Scenario = 'konservativt' | 'realistisk' | 'optimistisk'

const SCENARIOS: Record<Scenario, ScenarioInputs> = {
  konservativt: {
    kunAnalyse: 3,
    analysePlusMarkedsforing: 5,
    fradelinger: 0,
    bankleads: 2,
    husleverandorAbonnenter: 0,
  },
  realistisk: {
    kunAnalyse: 6,
    analysePlusMarkedsforing: 9,
    fradelinger: 2,
    bankleads: 5,
    husleverandorAbonnenter: 2,
  },
  optimistisk: {
    kunAnalyse: 10,
    analysePlusMarkedsforing: 20,
    fradelinger: 5,
    bankleads: 10,
    husleverandorAbonnenter: 5,
  },
}

// ─── Revenue data ────────────────────────────────────────────────────────────

const PER_KUNDE_DATA: RevenueRow[] = [
  { kilde: 'Tomteanalyse (kun analyse)', inntekt: 9900, kostnad: 4000, margin: 5900, note: 'Engangsbetaling, ingen provisjon' },
  { kilde: 'Analyse + Markedsføring (forskudd)', inntekt: 4990, kostnad: 4000, margin: 990, note: 'Lav oppstart, 2% ved salg' },
  { kilde: 'Markedsføringsgebyr 2% (ved salg, snitt 2 MNOK)', inntekt: 40000, kostnad: 2000, margin: 38000, note: '2% av oppnådd salgspris' },
  { kilde: 'Fradeling (5% av ny tomts verdi)', inntekt: 75000, kostnad: 10000, margin: 65000, note: '5% av ny tomts verdi (snitt 1,5 MNOK). 0 kr ved avslag – kunde betaler kun kommunale gebyrer.' },
  { kilde: 'Husleverandør-abo (snitt)', inntekt: 15000, kostnad: 0, margin: 15000, note: 'Basis 10k, Partner 20k/mnd' },
  { kilde: 'Bank lead-fee', inntekt: 4900, kostnad: 0, margin: 4900, note: 'Per innvilget byggelån' },
  { kilde: 'Propr-fee per salg', inntekt: 2000, kostnad: 0, margin: 2000, note: 'Propr tar 9 990 kr/oppgjør, vi får 2 000 kr per kunde' },
  { kilde: 'Fotograf (drone + foto)', inntekt: 5500, kostnad: 4500, margin: 1000, note: '5 500 kr til kunde, 4 500 kr til fotograf' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number): string {
  return n.toLocaleString('nb-NO')
}

function fmtKr(n: number): string {
  return `${n.toLocaleString('nb-NO')} kr`
}

// ─── Components ──────────────────────────────────────────────────────────────

function BarVisual({ value, max, color }: { value: number; max: number; color: string }) {
  const width = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0
  return (
    <div className="w-full bg-brand-100 rounded-full h-4 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${width}%` }}
      />
    </div>
  )
}

function NumberInput({
  label,
  value,
  onChange,
  icon: Icon,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  icon: any
}) {
  return (
    <div className="flex items-center gap-3 bg-white border border-brand-200 rounded-lg p-3">
      <Icon className="w-5 h-5 text-brand-400 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-brand-500 truncate">{label}</p>
      </div>
      <input
        type="number"
        min={0}
        value={value}
        onChange={e => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        className="w-16 text-right text-sm font-bold text-tomtly-dark border border-brand-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-300"
      />
    </div>
  )
}

// ─── Main page ───────────────────────────────────────────────────────────────

export default function InntektPage() {
  const [activeTab, setActiveTab] = useState<'inntekt' | 'forretning'>('inntekt')
  const [timekostnad, setTimekostnad] = useState(1000)
  const [scenario, setScenario] = useState<Scenario>('realistisk')
  const [inputs, setInputs] = useState<ScenarioInputs>(SCENARIOS.realistisk)

  const handleScenarioChange = (s: Scenario) => {
    setScenario(s)
    setInputs(SCENARIOS[s])
  }

  const updateInput = (key: keyof ScenarioInputs, value: number) => {
    setInputs(prev => ({ ...prev, [key]: value }))
  }

  // ─── Calculate monthly revenue ───────────────────────────────────────────

  const timerPerTomt = 3.5
  const rows = [
    {
      label: 'Tomteanalyse (9 900 kr)',
      antall: inputs.kunAnalyse,
      inntektPer: 9900,
      timerPer: timerPerTomt,
    },
    {
      label: 'Analyse + Markedsføring (4 990 kr forskudd)',
      antall: inputs.analysePlusMarkedsforing,
      inntektPer: 4990,
      timerPer: timerPerTomt,
    },
    {
      label: 'Markedsføringsgebyr 2% (snitt 2 MNOK)',
      antall: inputs.analysePlusMarkedsforing,
      inntektPer: 40000,
      timerPer: 2,
    },
    {
      label: 'Fradelinger (5% av ny tomt)',
      antall: inputs.fradelinger,
      inntektPer: 75000,
      timerPer: 15,
    },
    {
      label: 'Addons (via Konsepthus – ikke Tomtly-inntekt)',
      antall: 0,
      inntektPer: 0,
      timerPer: 10,
    },
    {
      label: 'Husleverandør-abonnenter',
      antall: inputs.husleverandorAbonnenter,
      inntektPer: 15000,
      timerPer: 1,
    },
    {
      label: 'Bank lead-fee',
      antall: inputs.bankleads,
      inntektPer: 4900,
      timerPer: 0.5,
    },
    {
      label: 'Propr-fee (per salg)',
      antall: inputs.analysePlusMarkedsforing,
      inntektPer: 2000,
      timerPer: 0,
    },
    {
      label: 'Fotograf (50% av salg)',
      antall: Math.round(inputs.analysePlusMarkedsforing / 2),
      inntektPer: 1000,
      timerPer: 0.5,
    },
  ]

  const totalInntekt = rows.reduce((sum, r) => sum + r.antall * r.inntektPer, 0)
  const totalTimer = rows.reduce((sum, r) => sum + r.antall * r.timerPer, 0)
  const totalKostnad = totalTimer * timekostnad
  const nettoMargin = totalInntekt - totalKostnad
  const annualisert = nettoMargin * 12

  const maxInntekt = Math.max(...rows.map(r => r.antall * r.inntektPer))

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-tomtly-dark text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/" className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Tomtly" className="h-7 invert" />
          </Link>
          <div>
            <h1 className="font-display text-lg font-bold">Tomtly – Inntektsmodell</h1>
            <p className="text-xs text-brand-400">Inntekter, kostnader og marginer per produkt og scenario</p>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="bg-white border-b border-brand-200 sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            <button onClick={() => setActiveTab('inntekt')} className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'inntekt' ? 'border-tomtly-accent text-tomtly-accent' : 'border-transparent text-brand-500 hover:text-brand-700'}`}>
              Inntektsmodell
            </button>
            <button onClick={() => setActiveTab('forretning')} className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'forretning' ? 'border-tomtly-accent text-tomtly-accent' : 'border-transparent text-brand-500 hover:text-brand-700'}`}>
              Forretningsmodell
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'inntekt' && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* ─── Per-kunde beregning ──────────────────────────────────────── */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          <div className="p-5 border-b border-brand-200">
            <h2 className="font-display font-bold text-lg text-tomtly-dark">Per-kunde beregning</h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-brand-500">Timer per tomt: 3–4 timer</span>
              <span className="text-xs text-brand-400">|</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-500">Timekostnad:</span>
                <input
                  type="number"
                  value={timekostnad}
                  onChange={e => setTimekostnad(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-20 text-xs text-right border border-brand-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
                <span className="text-xs text-brand-500">kr</span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-medium">Kilde</th>
                  <th className="text-right px-5 py-3 font-medium">Inntekt</th>
                  <th className="text-right px-5 py-3 font-medium">Kostnad</th>
                  <th className="text-right px-5 py-3 font-medium">Margin</th>
                  <th className="text-left px-5 py-3 font-medium">Notat</th>
                </tr>
              </thead>
              <tbody>
                {PER_KUNDE_DATA.map((row, i) => (
                  <tr key={i} className="border-t border-brand-100 hover:bg-brand-50 transition-colors">
                    <td className="px-5 py-3 font-medium text-tomtly-dark">{row.kilde}</td>
                    <td className="px-5 py-3 text-right text-green-700 font-medium">{fmtKr(row.inntekt)}</td>
                    <td className="px-5 py-3 text-right text-red-600">{row.kostnad > 0 ? `~${fmtKr(row.kostnad)}` : '0 kr'}</td>
                    <td className={`px-5 py-3 text-right font-bold ${row.margin >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                      {fmtKr(row.margin)}
                    </td>
                    <td className="px-5 py-3 text-xs text-brand-400">{row.note}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-brand-300 bg-brand-50">
                  <td className="px-5 py-4 font-bold text-tomtly-dark" colSpan={3}>
                    Total verdi per fullverdig kunde (analyse + salg + addons + bank)
                  </td>
                  <td className="px-5 py-4 text-right font-bold text-green-700 text-lg" colSpan={2}>
                    130 000 – 160 000 kr
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ─── Scenario tabs ─────────────────────────────────────────── */}
        <div className="flex gap-1 bg-brand-100 rounded-lg p-1 w-fit">
          {([
            { key: 'konservativt' as Scenario, label: 'Konservativt' },
            { key: 'realistisk' as Scenario, label: 'Realistisk' },
            { key: 'optimistisk' as Scenario, label: 'Optimistisk' },
          ]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleScenarioChange(key)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors ${
                scenario === key ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500 hover:text-brand-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ─── Månedlig scenario-kalkulator ──────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-tomtly-dark">Månedlige volumer</h3>
            <NumberInput label="Tomteanalyse (9 900 kr)" value={inputs.kunAnalyse} onChange={v => updateInput('kunAnalyse', v)} icon={Calculator} />
            <NumberInput label="Analyse + Markedsføring" value={inputs.analysePlusMarkedsforing} onChange={v => updateInput('analysePlusMarkedsforing', v)} icon={TrendingUp} />
            <NumberInput label="Fradelinger" value={inputs.fradelinger} onChange={v => updateInput('fradelinger', v)} icon={Home} />
            <NumberInput label="Bank lead-fees" value={inputs.bankleads} onChange={v => updateInput('bankleads', v)} icon={Banknote} />
            <NumberInput label="Husleverandør-abonnenter" value={inputs.husleverandorAbonnenter} onChange={v => updateInput('husleverandorAbonnenter', v)} icon={DollarSign} />
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-tomtly-dark">Månedlig resultat</h3>

            {/* Summary cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-xs text-green-600 font-medium">Månedsinntekt</p>
                <p className="text-xl font-bold text-green-800">{fmtKr(Math.round(totalInntekt))}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-xs text-red-600 font-medium">Månedsutgift</p>
                <p className="text-xl font-bold text-red-800">{fmtKr(Math.round(totalKostnad))}</p>
              </div>
              <div className={`border rounded-xl p-4 ${nettoMargin >= 0 ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}`}>
                <p className={`text-xs font-medium ${nettoMargin >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>Netto margin/mnd</p>
                <p className={`text-xl font-bold ${nettoMargin >= 0 ? 'text-emerald-800' : 'text-red-800'}`}>{fmtKr(Math.round(nettoMargin))}</p>
              </div>
              <div className={`border rounded-xl p-4 ${annualisert >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'}`}>
                <p className={`text-xs font-medium ${annualisert >= 0 ? 'text-blue-600' : 'text-red-600'}`}>Annualisert</p>
                <p className={`text-xl font-bold ${annualisert >= 0 ? 'text-blue-800' : 'text-red-800'}`}>{fmtKr(Math.round(annualisert))}</p>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-white border border-brand-200 rounded-xl p-4">
              <p className="text-xs text-brand-500 mb-1">Timer per måned</p>
              <p className="text-lg font-bold text-tomtly-dark">{fmt(Math.round(totalTimer))} timer</p>
              <p className="text-xs text-brand-400">({Math.round(totalTimer / 160 * 100)}% av en fulltidsansatt)</p>
            </div>

            {/* Revenue bars */}
            <div className="bg-white border border-brand-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-semibold text-brand-500 uppercase">Inntekt per kilde</h4>
              {rows.map((r, i) => {
                const lineInntekt = r.antall * r.inntektPer
                if (lineInntekt === 0) return null
                return (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-brand-600">{r.label} ({r.antall}x)</span>
                      <span className="font-medium text-tomtly-dark">{fmtKr(Math.round(lineInntekt))}</span>
                    </div>
                    <BarVisual
                      value={lineInntekt}
                      max={maxInntekt}
                      color={
                        i === 0 ? 'bg-blue-500' :
                        i === 1 ? 'bg-green-500' :
                        i === 2 ? 'bg-yellow-500' :
                        i === 3 ? 'bg-purple-500' :
                        i === 4 ? 'bg-pink-500' :
                        i === 5 ? 'bg-cyan-500' :
                        'bg-orange-500'
                      }
                    />
                  </div>
                )
              })}
            </div>

            {/* Margin breakdown */}
            <div className="bg-white border border-brand-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-semibold text-brand-500 uppercase">Margin per kilde</h4>
              {rows.map((r, i) => {
                const lineInntekt = r.antall * r.inntektPer
                const lineKostnad = r.antall * r.timerPer * timekostnad
                const lineMargin = lineInntekt - lineKostnad
                if (r.antall === 0) return null
                return (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-brand-600">{r.label}</span>
                    <span className={`font-bold ${lineMargin >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                      {fmtKr(Math.round(lineMargin))}
                    </span>
                  </div>
                )
              })}
              <div className="border-t border-brand-200 pt-2 flex items-center justify-between text-sm">
                <span className="font-bold text-tomtly-dark">Totalt netto</span>
                <span className={`font-bold text-lg ${nettoMargin >= 0 ? 'text-green-700' : 'text-red-600'}`}>
                  {fmtKr(Math.round(nettoMargin))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {activeTab === 'forretning' && <Forretningsmodell />}
    </div>
  )
}

function Forretningsmodell() {
  const fmt = (n: number) => n.toLocaleString('nb-NO')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center">
        <h2 className="font-display text-3xl font-bold text-tomtly-dark mb-3">Én tomt. Åtte inntektsstrømmer.</h2>
        <p className="text-brand-600 max-w-2xl mx-auto">Vi eier hele verdikjeden fra tomt til ferdig hus – uten å bygge et eneste hus selv.</p>
      </div>

      {/* Visuell flyt */}
      <div className="space-y-4">
        <FlowMarker text="TOMTEEIER HAR EN TOMT" />

        <FlowStep nummer="1" tittel="Tomtanalyse + salg" ikon="📐" inntekt="4 990 kr + 65% av 2,5%" beskrivelse="Vi lager mulighetsstudie med husmodeller og byggekalkyle. Markedsfører og selger via meglerpartner (65/35-split på provisjon)." />
        <FlowStep nummer="2" tittel="Ferdighusleverandør" ikon="🏠" inntekt="Månedlig abonnement" beskrivelse="Husmodeller vises i analysen. Leverandøren som betaler mest i abo får mest eksponering. Velger kjøper deres hus = direkte salg." />
        <FlowStep nummer="3" tittel="Entreprenør" ikon="🔧" inntekt="14 900 kr/år" beskrivelse="Vi innhenter tilbud fra samarbeidsentreprenører. Gir oss kontroll på kostnader og gir entreprenøren kunder." />

        <FlowMarker text="TOMTEN SELGES" highlight />

        <FlowStep nummer="4" tittel="Bank" ikon="🏦" inntekt="4 900 kr per innvilget lån" beskrivelse="Kjøper trenger byggelån. Vi presenterer totalkostnad banken kan vurdere. Banken får kvalifisert kunde." />
        <FlowStep nummer="5" tittel="Prosjektfinansiering" ikon="💰" inntekt="4 900–14 900 kr lead-fee" beskrivelse="Vi kobler utviklere og kjøpere med alternative finansieringspartnere (Kameo/Oblinor). Lead-fee per innvilget lån." />
        <FlowStep nummer="6" tittel="Propr (oppgjør)" ikon="🤝" inntekt="2 500 kr formidlingsgebyr" beskrivelse="Oppgjør håndteres av Propr. Vi får formidlingsgebyr for å sende dem kunden." />
        <FlowStep nummer="7" tittel="Tegnebua (tegning og søknad)" ikon="✏️" inntekt="Fastpris til arkitektavdeling" beskrivelse="Kjøper trenger byggesøknad og tegninger. Tegnebua gir fastpris – inntekt til arkitektavdelingen." />
        <FlowStep nummer="8" tittel="Hussalg" ikon="🔑" inntekt="Inkludert i leverandør-abo" beskrivelse="Kjøper velger husmodell fra analysen. Ferdighusleverandøren får et salg direkte fra plattformen." />

        <FlowMarker text="KJØPER BYGGER DRØMMEHUSET" />
      </div>

      {/* Eksempel */}
      <div>
        <h3 className="font-display text-2xl font-bold text-tomtly-dark mb-2 text-center">Hva én tomt genererer</h3>
        <p className="text-brand-500 text-center mb-6">Eksempel: Tomt i Bærum, 650 m², solgt for 2 500 000 kr</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <InntektBoks label="Tomtanalyse + salg" belop={37490} farge="bg-tomtly-accent" tekstFarge="text-white" stor />
          <InntektBoks label="Tegnebua" belop={25000} farge="bg-earth-400" tekstFarge="text-white" />
          <InntektBoks label="Bank lead-fee" belop={4900} farge="bg-blue-500" tekstFarge="text-white" />
          <InntektBoks label="Propr formidling" belop={2500} farge="bg-brand-600" tekstFarge="text-white" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <InntektBoks label="Prosjektfin." belop={5000} farge="bg-yellow-600" tekstFarge="text-white" />
          <InntektBoks label="Huslev. abo" belop={3000} farge="bg-forest-500" tekstFarge="text-white" />
          <InntektBoks label="Entreprenør" belop={2000} farge="bg-amber-500" tekstFarge="text-white" />
          <InntektBoks label="Fotograf" belop={1000} farge="bg-purple-500" tekstFarge="text-white" />
        </div>

        <div className="bg-tomtly-dark rounded-2xl p-8 text-center">
          <p className="text-sm text-brand-400 mb-1">Total inntekt per tomt</p>
          <p className="text-5xl font-bold text-tomtly-gold">~75 000 kr</p>
          <p className="text-sm text-brand-400 mt-2">Arbeidsinnsats: 10–15 timer</p>
        </div>
      </div>

      {/* Hvem betaler hva */}
      <div>
        <h3 className="font-display text-2xl font-bold text-tomtly-dark mb-6 text-center">Hvem betaler hva</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { segment: 'Tomteeier', pris: '4 990 kr + 2,5%', ikon: '🏡' },
            { segment: 'Megler Standard', pris: 'Gratis', ikon: '👔' },
            { segment: 'Megler Premium', pris: '4 900 kr', ikon: '⭐' },
            { segment: 'Utvikler', pris: 'Fra 4 900 kr/tomt', ikon: '🏗️' },
            { segment: 'Husleverandør', pris: 'Mnd-abonnement', ikon: '🏠' },
            { segment: 'Entreprenør', pris: '14 900 kr/år', ikon: '🔧' },
            { segment: 'Bank', pris: '4 900 kr/innvilget lån', ikon: '🏦' },
            { segment: 'Propr', pris: 'Formidlingsgebyr', ikon: '🤝' },
            { segment: 'Kjøper (Tegnebua)', pris: 'Fastpris tegning', ikon: '✏️' },
          ].map((s) => (
            <div key={s.segment} className="bg-white rounded-xl border border-brand-200 p-4 text-center">
              <p className="text-2xl mb-2">{s.ikon}</p>
              <p className="font-semibold text-tomtly-dark text-sm">{s.segment}</p>
              <p className="text-xs text-brand-500 mt-1">{s.pris}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tomtly vs tradisjonell */}
      <div>
        <h3 className="font-display text-2xl font-bold text-tomtly-dark mb-6 text-center">Tomtly vs. tradisjonell megler</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-brand-100 rounded-2xl p-6 opacity-70">
            <h4 className="font-semibold text-brand-500 mb-4">Tradisjonell megler</h4>
            <ul className="space-y-2 text-sm text-brand-500">
              <li>• 2,5–3,5% provisjon</li>
              <li>• Tomten = bilde av gress på FINN</li>
              <li>• Ingen analyse, husmodeller eller kalkyle</li>
              <li>• Tjener KUN på provisjonen</li>
              <li>• Én inntektskilde per tomt</li>
            </ul>
          </div>
          <div className="bg-forest-50 rounded-2xl p-6 border-2 border-tomtly-accent">
            <h4 className="font-semibold text-tomtly-dark mb-4">Tomtly</h4>
            <ul className="space-y-2 text-sm text-brand-700">
              <li>• 4 990 kr + 2,5% provisjon</li>
              <li>• Mulighetsstudie, husmodeller, kalkyle, 3D</li>
              <li>• Kjøper ser ferdig byggeprosjekt</li>
              <li>• Tjener på alle ledd etter salget også</li>
              <li>• <strong>Åtte inntektsstrømmer per tomt</strong></li>
              <li>• Samme pris for selger – ti ganger mer verdi</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Flywheel */}
      <div className="bg-brand-50 rounded-2xl p-8 border border-brand-200 text-center">
        <h3 className="font-display text-xl font-bold text-tomtly-dark mb-4">Flywheel-effekten</h3>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm mb-4">
          {['Flere tomter', '→', 'Flere kjøpere', '→', 'Mer verdi for husleverandører', '→', 'Bedre analyser', '→', 'Mer attraktivt for tomteeiere', '→'].map((t, i) => (
            <span key={i} className={t === '→' ? 'text-tomtly-accent font-bold text-lg' : 'bg-white px-3 py-1.5 rounded-full border border-brand-200 font-medium text-brand-700'}>{t}</span>
          ))}
        </div>
        <p className="text-xs text-brand-500">Pluss: Hver solgte tomt genererer inntekt fra bank, entreprenør, tegning og oppgjør – uavhengig av plattformveksten.</p>
      </div>

      {/* Spesialmodeller */}
      <div>
        <h3 className="font-display text-2xl font-bold text-tomtly-dark mb-6 text-center">Spesialmodeller</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-brand-200 p-6">
            <p className="text-2xl mb-3">✂️</p>
            <h4 className="font-semibold text-tomtly-dark mb-2">Fradeling</h4>
            <p className="text-sm text-brand-600">Mange eiendommer har mer tomt enn de trenger. Vi identifiserer dem, kontakter eier, og håndterer hele prosessen. Vi tar kun caser vi tror blir godkjent.</p>
          </div>
          <div className="bg-white rounded-xl border border-brand-200 p-6">
            <p className="text-2xl mb-3">🔄</p>
            <h4 className="font-semibold text-tomtly-dark mb-2">Omvendt markedsplass</h4>
            <p className="text-sm text-brand-600">Kjøper forteller oss hva de vil ha. Vi finner tomten – også tomter som ikke er til salgs. Vi kontakter eier med ferdig kjøper.</p>
          </div>
        </div>
      </div>

      {/* Potensial */}
      <div>
        <h3 className="font-display text-2xl font-bold text-tomtly-dark mb-6 text-center">Potensial</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-brand-200 p-6 text-center">
            <p className="text-xs text-brand-500 mb-1">Konservativt (5 salg/mnd)</p>
            <p className="text-3xl font-bold text-tomtly-dark">4,5 MNOK</p>
            <p className="text-xs text-brand-400">/år</p>
          </div>
          <div className="bg-forest-50 rounded-2xl border-2 border-tomtly-accent p-6 text-center">
            <p className="text-xs text-forest-600 mb-1">Vekst (15 salg/mnd)</p>
            <p className="text-3xl font-bold text-tomtly-dark">13,5 MNOK</p>
            <p className="text-xs text-forest-600">/år</p>
          </div>
          <div className="bg-tomtly-dark rounded-2xl p-6 text-center">
            <p className="text-xs text-brand-400 mb-1">Skalert (30 salg/mnd)</p>
            <p className="text-3xl font-bold text-tomtly-gold">27 MNOK</p>
            <p className="text-xs text-brand-400">/år</p>
          </div>
        </div>
        <p className="text-xs text-brand-500 text-center mt-3">+ Plattforminntekter (abo, avgifter): 2–5 MNOK/år recurring</p>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-brand-200">
        <p className="text-brand-600 font-medium max-w-2xl mx-auto">
          Tomtly tjener penger åtte steder på én transaksjon. Tomtanalysen er inngangsbilletten – den egentlige inntjeningen ligger i økosystemet rundt.
        </p>
      </div>
    </div>
  )
}

function FlowMarker({ text, highlight }: { text: string; highlight?: boolean }) {
  return (
    <div className={`text-center py-4 px-6 rounded-xl font-bold text-lg ${highlight ? 'bg-tomtly-accent text-white' : 'bg-tomtly-dark text-white'}`}>
      {text}
    </div>
  )
}

function FlowStep({ nummer, tittel, ikon, inntekt, beskrivelse }: { nummer: string; tittel: string; ikon: string; inntekt: string; beskrivelse: string }) {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-5 flex items-start gap-4">
      <div className="text-3xl flex-shrink-0">{ikon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-6 bg-tomtly-accent text-white rounded-full text-xs flex items-center justify-center font-bold">{nummer}</span>
          <h4 className="font-semibold text-tomtly-dark">{tittel}</h4>
        </div>
        <p className="text-sm text-brand-600">{beskrivelse}</p>
      </div>
      <div className="flex-shrink-0 bg-forest-50 rounded-lg px-3 py-1.5 border border-forest-200">
        <p className="text-xs font-semibold text-forest-700">{inntekt}</p>
      </div>
    </div>
  )
}

function InntektBoks({ label, belop, farge, tekstFarge, stor }: { label: string; belop: number; farge: string; tekstFarge: string; stor?: boolean }) {
  return (
    <div className={`${farge} rounded-xl p-4 text-center ${stor ? 'md:col-span-2' : ''}`}>
      <p className={`${tekstFarge} text-xs opacity-80`}>{label}</p>
      <p className={`${tekstFarge} ${stor ? 'text-2xl' : 'text-lg'} font-bold`}>{belop.toLocaleString('nb-NO')} kr</p>
    </div>
  )
}
