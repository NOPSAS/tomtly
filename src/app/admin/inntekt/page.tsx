'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Calculator, TrendingUp, DollarSign, BarChart3,
  Users, Banknote, Home, Hammer, Building2,
} from 'lucide-react'

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
  megleranalyser: number
  tomteanalyseAbonnenter: number
  fradelinger: number
  addons: number
  bankleads: number
  entreprenorProsjekter: number
  husleverandorAbonnenter: number
}

type Scenario = 'konservativt' | 'realistisk' | 'optimistisk'

const SCENARIOS: Record<Scenario, ScenarioInputs> = {
  konservativt: {
    analysepakker: 3,
    analyseSynlighet: 2,
    megleranalyser: 0,
    tomteanalyseAbonnenter: 0,
    fradelinger: 0,
    addons: 1,
    bankleads: 1,
    entreprenorProsjekter: 1,
    husleverandorAbonnenter: 0,
  },
  realistisk: {
    analysepakker: 8,
    analyseSynlighet: 8,
    megleranalyser: 0,
    tomteanalyseAbonnenter: 3,
    fradelinger: 1,
    addons: 4,
    bankleads: 3,
    entreprenorProsjekter: 4,
    husleverandorAbonnenter: 1,
  },
  optimistisk: {
    analysepakker: 20,
    analyseSynlighet: 20,
    megleranalyser: 0,
    tomteanalyseAbonnenter: 15,
    fradelinger: 4,
    addons: 12,
    bankleads: 10,
    entreprenorProsjekter: 15,
    husleverandorAbonnenter: 4,
  },
}

// Oppdaterte satser per mai 2026
const PER_KUNDE_DATA: RevenueRow[] = [
  { kilde: 'Analyse + Markedsføring oppstart (4 990 kr)', inntekt: 4990, kostnad: 1000, margin: 3990, note: 'Startgebyr ved påmelding' },
  { kilde: 'Tilretteleggingsgebyr 2% ved salg (snitt 2 MNOK tomt)', inntekt: 40000, kostnad: 0, margin: 40000, note: '2% av salgssum, min 20 000 kr + mva. 3 mnd forsikringsklausul.' },
  { kilde: 'Tomteanalyse-abonnement megler (3 000 kr/mnd)', inntekt: 3000, kostnad: 200, margin: 2800, note: 'Månedlig abonnement per meglerkontor – ubegrenset analyser' },
  { kilde: 'Fradeling (5% av ny tomts verdi, snitt 1,5 MNOK)', inntekt: 75000, kostnad: 15000, margin: 60000, note: '5% av ny tomts verdi. 0 kr ved avslag. Tegnebua utfører søknad.' },
  { kilde: 'Entreprenør-fee (3% av kontrakt, snitt 500k grunnarbeid)', inntekt: 15000, kostnad: 0, margin: 15000, note: '3% av kontraktssum for grunnarbeider og utvendig VA via Tomtly' },
  { kilde: 'Bank lead-fee', inntekt: 2000, kostnad: 0, margin: 2000, note: 'Per innvilget byggelån – ned fra 4 900 kr' },
  { kilde: 'Husleverandør-abo (snitt 15 000 kr/mnd)', inntekt: 15000, kostnad: 0, margin: 15000, note: '10 000–20 000 kr/mnd per leverandør' },
  { kilde: 'Finn.no-annonse (gjennomfakturert – 0 margin)', inntekt: 6500, kostnad: 6500, margin: 0, note: 'Dekker kun Finn.no sin annonsepris. Tomtly tjener ikke på dette tilvalget.' },
  { kilde: 'Proff Oppgjør-formidling per salg', inntekt: 500, kostnad: 0, margin: 500, note: 'Tomtly mottar 500 kr formidlingsprovisjon. Proff Oppgjør tar 9 000 kr + mva direkte fra kunde.' },
]

function fmt(n: number): string {
  return n.toLocaleString('nb-NO')
}

function fmtKr(n: number): string {
  return `${n.toLocaleString('nb-NO')} kr`
}

function BarVisual({ value, max, color }: { value: number; max: number; color: string }) {
  const width = max > 0 ? Math.min(Math.max((value / max) * 100, 0), 100) : 0
  return (
    <div className="w-full bg-brand-100 rounded-full h-4 overflow-hidden">
      <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${width}%` }} />
    </div>
  )
}

function NumberInput({ label, value, onChange, icon: Icon }: { label: string; value: number; onChange: (v: number) => void; icon: any }) {
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

  const timerPerTomt = 2

  const rows = [
    { label: 'Analyse + Markedsføring (4 990 kr)', antall: inputs.analysepakker, inntektPer: 4990, timerPer: timerPerTomt },
    { label: 'Tilretteleggingsgebyr 2% ved salg (snitt 40 000 kr)', antall: Math.round(inputs.analyseSynlighet * 0.6), inntektPer: 40000, timerPer: 0 },
    { label: 'Tomteanalyse-abonnement meglere (3 000 kr/mnd)', antall: inputs.tomteanalyseAbonnenter, inntektPer: 3000, timerPer: 0.2 },
    { label: 'Fradelinger (5% av 1,5 MNOK = 75 000 kr)', antall: inputs.fradelinger, inntektPer: 75000, timerPer: 15 },
    { label: 'Entreprenør-fee (3% av snitt 500k = 15 000 kr)', antall: inputs.entreprenorProsjekter, inntektPer: 15000, timerPer: 0.5 },
    { label: 'Bank lead-fees (2 000 kr)', antall: inputs.bankleads, inntektPer: 2000, timerPer: 0.5 },
    { label: 'Husleverandør-abo (15 000 kr/mnd)', antall: inputs.husleverandorAbonnenter, inntektPer: 15000, timerPer: 1 },
    { label: 'Proff Oppgjør-formidling (500 kr/salg)', antall: Math.round(inputs.analyseSynlighet * 0.6), inntektPer: 500, timerPer: 0 },
  ]

  const totalInntekt = rows.reduce((sum, r) => sum + r.antall * r.inntektPer, 0)
  const totalTimer = rows.reduce((sum, r) => sum + r.antall * r.timerPer, 0)
  const totalKostnad = totalTimer * timekostnad
  const nettoMargin = totalInntekt - totalKostnad
  const annualisert = nettoMargin * 12
  const maxInntekt = Math.max(...rows.map(r => r.antall * r.inntektPer), 1)

  const barColors = ['bg-blue-500', 'bg-yellow-500', 'bg-emerald-500', 'bg-pink-500', 'bg-orange-500', 'bg-cyan-500', 'bg-purple-500', 'bg-gray-400']

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-tomtly-dark text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="p-1 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="font-display text-lg font-bold">Inntektsberegner – Tomtly</h1>
            <p className="text-xs text-brand-400">Oppdatert mai 2026 · Bank lead 2 000 kr · Proff Oppgjør 500 kr · Entrepr. 3% · Tomteanalyse-abo lagt til</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">

        {/* Per-kunde beregning */}
        <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
          <div className="p-5 border-b border-brand-200">
            <h2 className="font-display font-bold text-lg text-tomtly-dark">Per-transaksjon verdioversikt</h2>
            <div className="flex items-center gap-4 mt-2">
              <span className="text-xs text-brand-500">Oppdaterte satser · mai 2026</span>
              <span className="text-xs text-brand-400">|</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-500">Timekostnad:</span>
                <input type="number" value={timekostnad} onChange={e => setTimekostnad(Math.max(0, parseInt(e.target.value) || 0))} className="w-20 text-xs text-right border border-brand-200 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-300" />
                <span className="text-xs text-brand-500">kr</span>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-50 text-brand-500 text-xs uppercase tracking-wide">
                  <th className="text-left px-5 py-3 font-medium">Inntektskilde</th>
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
                    <td className="px-5 py-3 text-right text-red-600">{row.kostnad > 0 ? `~${fmtKr(row.kostnad)}` : '–'}</td>
                    <td className={`px-5 py-3 text-right font-bold ${row.margin >= 0 ? 'text-green-700' : 'text-red-600'}`}>{fmtKr(row.margin)}</td>
                    <td className="px-5 py-3 text-xs text-brand-400">{row.note}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-brand-300 bg-brand-50">
                  <td className="px-5 py-4 font-bold text-tomtly-dark" colSpan={3}>Total verdi per fullverdig kunde (analyse + salg + bank + entrepr.)</td>
                  <td className="px-5 py-4 text-right font-bold text-green-700 text-lg" colSpan={2}>~72 000 – 160 000 kr</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Scenario tabs */}
        <div className="flex gap-1 bg-brand-100 rounded-lg p-1 w-fit">
          {(['konservativt', 'realistisk', 'optimistisk'] as Scenario[]).map(key => (
            <button
              key={key}
              onClick={() => handleScenarioChange(key)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-colors capitalize ${scenario === key ? 'bg-white text-tomtly-dark shadow-sm' : 'text-brand-500 hover:text-brand-700'}`}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {/* Månedlig kalkulator */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-display font-bold text-tomtly-dark">Månedlige volumer</h3>
            <NumberInput label="Tomteeier (analyse + salg, 4 990 kr)" value={inputs.analysepakker} onChange={v => updateInput('analysepakker', v)} icon={Calculator} />
            <NumberInput label="Salg gjennomført (2% tilrettelegging)" value={inputs.analyseSynlighet} onChange={v => updateInput('analyseSynlighet', v)} icon={TrendingUp} />
            <NumberInput label="Tomteanalyse-abonnenter (meglere, 3 000 kr/mnd)" value={inputs.tomteanalyseAbonnenter} onChange={v => updateInput('tomteanalyseAbonnenter', v)} icon={Users} />
            <NumberInput label="Fradelinger (5% av ny tomts verdi)" value={inputs.fradelinger} onChange={v => updateInput('fradelinger', v)} icon={Home} />
            <NumberInput label="Entreprenørprosjekter (3% av kontrakt)" value={inputs.entreprenorProsjekter} onChange={v => updateInput('entreprenorProsjekter', v)} icon={Building2} />
            <NumberInput label="Addons (tegning/søknad)" value={inputs.addons} onChange={v => updateInput('addons', v)} icon={Hammer} />
            <NumberInput label="Bank lead-fees (2 000 kr)" value={inputs.bankleads} onChange={v => updateInput('bankleads', v)} icon={Banknote} />
            <NumberInput label="Husleverandør-abonnenter" value={inputs.husleverandorAbonnenter} onChange={v => updateInput('husleverandorAbonnenter', v)} icon={DollarSign} />
          </div>

          <div className="space-y-4">
            <h3 className="font-display font-bold text-tomtly-dark">Månedlig resultat</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-xs text-green-600 font-medium">Månedsinntekt</p>
                <p className="text-xl font-bold text-green-800">{fmtKr(Math.round(totalInntekt))}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-xs text-red-600 font-medium">Månedsutgift (timer)</p>
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

            <div className="bg-white border border-brand-200 rounded-xl p-4">
              <p className="text-xs text-brand-500 mb-1">Timer per måned</p>
              <p className="text-lg font-bold text-tomtly-dark">{fmt(Math.round(totalTimer))} timer</p>
              <p className="text-xs text-brand-400">({Math.round(totalTimer / 160 * 100)}% av en fulltidsansatt)</p>
            </div>

            <div className="bg-white border border-brand-200 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-semibold text-brand-500 uppercase">Inntekt per kilde</h4>
              {rows.map((r, i) => {
                const lineInntekt = r.antall * r.inntektPer
                if (lineInntekt === 0) return null
                return (
                  <div key={i}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-brand-600 truncate pr-2">{r.label} ({r.antall}×)</span>
                      <span className="font-medium text-tomtly-dark flex-shrink-0">{fmtKr(Math.round(lineInntekt))}</span>
                    </div>
                    <BarVisual value={lineInntekt} max={maxInntekt} color={barColors[i % barColors.length]} />
                  </div>
                )
              })}
            </div>

            <div className="bg-white border border-brand-200 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-semibold text-brand-500 uppercase">Margin per kilde</h4>
              {rows.map((r, i) => {
                const lineInntekt = r.antall * r.inntektPer
                const lineKostnad = r.antall * r.timerPer * timekostnad
                const lineMargin = lineInntekt - lineKostnad
                if (r.antall === 0) return null
                return (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-brand-600 truncate pr-2">{r.label}</span>
                    <span className={`font-bold flex-shrink-0 ${lineMargin >= 0 ? 'text-green-700' : 'text-red-600'}`}>{fmtKr(Math.round(lineMargin))}</span>
                  </div>
                )
              })}
              <div className="border-t border-brand-200 pt-2 flex items-center justify-between text-sm">
                <span className="font-bold text-tomtly-dark">Totalt netto</span>
                <span className={`font-bold text-lg ${nettoMargin >= 0 ? 'text-green-700' : 'text-red-600'}`}>{fmtKr(Math.round(nettoMargin))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
