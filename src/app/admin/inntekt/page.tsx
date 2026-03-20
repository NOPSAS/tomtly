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
  analysepakker: number
  analyseSynlighet: number
  premiumSynlighet: number
  megleranalyser: number
  fradelinger: number
  addons: number
  bankleads: number
  entreprenorAbonnenter: number
  husleverandorAbonnenter: number
}

type Scenario = 'konservativt' | 'realistisk' | 'optimistisk'

const SCENARIOS: Record<Scenario, ScenarioInputs> = {
  konservativt: {
    analysepakker: 5,
    analyseSynlighet: 3,
    premiumSynlighet: 1,
    megleranalyser: 3,
    fradelinger: 0,
    addons: 1,
    bankleads: 2,
    entreprenorAbonnenter: 1,
    husleverandorAbonnenter: 0,
  },
  realistisk: {
    analysepakker: 10,
    analyseSynlighet: 10,
    premiumSynlighet: 5,
    megleranalyser: 10,
    fradelinger: 2,
    addons: 5,
    bankleads: 5,
    entreprenorAbonnenter: 3,
    husleverandorAbonnenter: 2,
  },
  optimistisk: {
    analysepakker: 20,
    analyseSynlighet: 25,
    premiumSynlighet: 15,
    megleranalyser: 25,
    fradelinger: 5,
    addons: 15,
    bankleads: 15,
    entreprenorAbonnenter: 10,
    husleverandorAbonnenter: 5,
  },
}

// ─── Revenue data ────────────────────────────────────────────────────────────

const PER_KUNDE_DATA: RevenueRow[] = [
  { kilde: 'Tomteeier fastpris (4 990)', inntekt: 4990, kostnad: 4000, margin: 990, note: 'Analyse + markedsføring' },
  { kilde: 'Provisjon ved salg (2,5 % av snitt 2 MNOK)', inntekt: 50000, kostnad: 0, margin: 50000, note: '2,5 % av salgssum' },
  { kilde: 'Megler Standard (gratis)', inntekt: 0, kostnad: 0, margin: 0, note: 'Gratis publisering – kjøpere kontakter megler' },
  { kilde: 'Megler Premium (4 900)', inntekt: 4900, kostnad: 4000, margin: 900, note: 'Full analyse + synlighet' },
  { kilde: 'Fradeling (fastpris + 2,5 %)', inntekt: 69000, kostnad: 15000, margin: 54000, note: '49-89k prosess + 2,5 % ved salg' },
  { kilde: 'Addons (tegning, søknad) – via Konsepthus', inntekt: 0, kostnad: 0, margin: 0, note: 'Utføres av Konsepthus/Tegnebua, ikke Tomtly-inntekt' },
  { kilde: 'Entreprenørpåslag', inntekt: 14900, kostnad: 0, margin: 14900, note: 'Årsavgift' },
  { kilde: 'Bank lead-fee', inntekt: 4900, kostnad: 0, margin: 4900, note: '' },
  { kilde: 'Husleverandør-abo (snitt)', inntekt: 15000, kostnad: 0, margin: 15000, note: 'Basis 10k, Partner 20k/mnd' },
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
      label: 'Tomteeier fastpris (4 990)',
      antall: inputs.analysepakker,
      inntektPer: 4990,
      timerPer: timerPerTomt,
    },
    {
      label: 'Provisjon 2,5 % (snitt 50 000)',
      antall: inputs.analyseSynlighet,
      inntektPer: 50000,
      timerPer: timerPerTomt + 1,
    },
    {
      label: 'Megler Premium (4 900)',
      antall: inputs.premiumSynlighet,
      inntektPer: 4900,
      timerPer: timerPerTomt + 2,
    },
    {
      label: 'Megler Standard (gratis)',
      antall: inputs.megleranalyser,
      inntektPer: 0,
      timerPer: 0.5,
    },
    {
      label: 'Fradelinger (fastpris)',
      antall: inputs.fradelinger,
      inntektPer: 69000,
      timerPer: 15,
    },
    {
      label: 'Addons (via Konsepthus – ikke Tomtly-inntekt)',
      antall: 0,
      inntektPer: 0,
      timerPer: 10,
    },
    {
      label: 'Bank lead-fees',
      antall: inputs.bankleads,
      inntektPer: 4900,
      timerPer: 0.5,
    },
    {
      label: 'Entreprenør-abonnenter',
      antall: inputs.entreprenorAbonnenter,
      inntektPer: 14900 / 12,
      timerPer: 0,
    },
    {
      label: 'Husleverandør-abonnenter',
      antall: inputs.husleverandorAbonnenter,
      inntektPer: 15000,
      timerPer: 1,
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
          <Link href="/admin" className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-lg font-bold">Inntektsberegner – Tomtly</h1>
            <p className="text-xs text-brand-400">Kalkuler inntekter, kostnader og marginer</p>
          </div>
        </div>
      </div>

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
                    180 000 – 220 000 kr
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
            <NumberInput label="Tomteeier (4 990 kr)" value={inputs.analysepakker} onChange={v => updateInput('analysepakker', v)} icon={Calculator} />
            <NumberInput label="Provisjon-salg (2,5 %)" value={inputs.analyseSynlighet} onChange={v => updateInput('analyseSynlighet', v)} icon={TrendingUp} />
            <NumberInput label="Megler Premium (4 900)" value={inputs.premiumSynlighet} onChange={v => updateInput('premiumSynlighet', v)} icon={TrendingUp} />
            <NumberInput label="Megler Standard (gratis)" value={inputs.megleranalyser} onChange={v => updateInput('megleranalyser', v)} icon={Users} />
            <NumberInput label="Fradelinger" value={inputs.fradelinger} onChange={v => updateInput('fradelinger', v)} icon={Home} />
            <NumberInput label="Addons (tegning/søknad)" value={inputs.addons} onChange={v => updateInput('addons', v)} icon={Hammer} />
            <NumberInput label="Bank lead-fees" value={inputs.bankleads} onChange={v => updateInput('bankleads', v)} icon={Banknote} />
            <NumberInput label="Entreprenør-abonnenter" value={inputs.entreprenorAbonnenter} onChange={v => updateInput('entreprenorAbonnenter', v)} icon={DollarSign} />
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
    </div>
  )
}
