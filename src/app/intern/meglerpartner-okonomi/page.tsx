'use client'

import { useState, Fragment } from 'react'
import Link from 'next/link'
import { TrendingUp, AlertTriangle, DollarSign, Users, BarChart3, Calculator } from 'lucide-react'

const SPLITS = [
  { label: '60/40', tomtly: 0.60, partner: 0.40 },
  { label: '65/35', tomtly: 0.65, partner: 0.35 },
  { label: '70/30', tomtly: 0.70, partner: 0.30 },
  { label: '75/25', tomtly: 0.75, partner: 0.25 },
]

// Tomtlys reelle kostnader per salg
// Analyse: 4 timer arbeid. Markedsføring/admin: 0,5 timer.
// Foto: ekstern partner, Tomtly tar fee for å gi dem oppdraget (inntekt, ikke kostnad)
const TOMTLY_TIMEKOST = 450 // intern timekostnad (lønn + overhead)
const TOMTLY_COSTS_PER_SALE = {
  'analyse (4t)': TOMTLY_TIMEKOST * 4,
  'markedsforing og admin (0,5t)': TOMTLY_TIMEKOST * 0.5,
  'plattform og verktoy': 200,
}

const TOMTLY_INCOME_PER_SALE_EXTRA = {
  'foto-fee (margin på fotooppdrag)': 1000,
}

const TOMTLY_FIXED_MONTHLY = {
  plattform_drift: 5000,
  verktoy_abonnement: 3000,
  generell_markedsforing: 10000,
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('nb-NO')
}

export default function InternOkonomiPage() {
  const [avgPris, setAvgPris] = useState(2000000)
  const [provisjonPct, setProvisjonPct] = useState(2.5)
  const [splitIndex, setSplitIndex] = useState(1) // 65/35 default
  const [salg, setSalg] = useState(15)
  const [antallMeglere, setAntallMeglere] = useState(1)

  // Fastpris fra tomteeier
  const fastpris = 4990

  const split = SPLITS[splitIndex]
  const provisjonPerSalg = avgPris * (provisjonPct / 100)
  const tomtlyAndel = provisjonPerSalg * split.tomtly
  const partnerAndel = provisjonPerSalg * split.partner

  // Tomtlys kostnader per salg
  const totalKostnadPerSalg = Object.values(TOMTLY_COSTS_PER_SALE).reduce((a, b) => a + b, 0)
  const totalExtraIncomePerSalg = Object.values(TOMTLY_INCOME_PER_SALE_EXTRA).reduce((a, b) => a + b, 0)
  const totalFixedMonthly = Object.values(TOMTLY_FIXED_MONTHLY).reduce((a, b) => a + b, 0)

  // Timer per salg (for visning)
  const timerAnalyse = 4
  const timerAdmin = 0.5
  const totalTimerPerSalg = timerAnalyse + timerAdmin

  // Tomtlys netto per salg
  const tomtlyNettoPerSalg = tomtlyAndel + fastpris + totalExtraIncomePerSalg - totalKostnadPerSalg

  // Månedlige tall
  const tomtlyBrutoMnd = (tomtlyAndel + fastpris + totalExtraIncomePerSalg) * salg
  const tomtlyKostMnd = (totalKostnadPerSalg * salg) + totalFixedMonthly
  const tomtlyNettoMnd = tomtlyBrutoMnd - tomtlyKostMnd
  const partnerBrutoMnd = partnerAndel * salg
  const totalProvisjonMnd = provisjonPerSalg * salg

  // Årlige tall
  const tomtlyNettoAar = tomtlyNettoMnd * 12
  const partnerBrutoAar = partnerBrutoMnd * 12
  const tomtlyBrutoAar = tomtlyBrutoMnd * 12

  // Margin
  const tomtlyMargin = tomtlyBrutoMnd > 0 ? (tomtlyNettoMnd / tomtlyBrutoMnd) * 100 : 0

  // Break-even
  const nettoPerSalgForBE = tomtlyAndel + fastpris + totalExtraIncomePerSalg - totalKostnadPerSalg
  const breakEvenSalg = nettoPerSalgForBE > 0 ? totalFixedMonthly / nettoPerSalgForBE : Infinity

  // Tomtlys effektive timelønn
  const tomtlyTimelonnEffektiv = tomtlyNettoPerSalg / totalTimerPerSalg
  const totalTimerMnd = totalTimerPerSalg * salg

  // Per megler
  const salgPerMegler = salg / antallMeglere
  const partnerPerMeglerMnd = partnerBrutoMnd / antallMeglere
  const timerPerSalgMegler = 4 // snitt for megler (visning, bud, oppgjør)
  const timelonnMegler = partnerAndel / timerPerSalgMegler

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-tomtly-dark text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="text-brand-400 text-sm hover:text-white transition-colors">← tomtly.no</Link>
              <h1 className="font-display text-2xl md:text-3xl font-bold mt-2">Meglerpartner – økonomisk modell</h1>
              <p className="text-brand-400 text-sm mt-1">Intern side – ikke synlig for partnere</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-red-500/20 border border-red-500/30 rounded-lg px-4 py-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-red-300 text-xs font-semibold uppercase tracking-wider">Konfidensielt</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* ─── Kontrollpanel ─── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 mb-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-5 h-5 text-tomtly-accent" />
            <h2 className="font-display text-lg font-bold text-tomtly-dark">Juster parametere</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Gjennomsnittspris */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Snitt tomtepris
              </label>
              <input
                type="range"
                min={500000}
                max={5000000}
                step={100000}
                value={avgPris}
                onChange={(e) => setAvgPris(Number(e.target.value))}
                className="w-full accent-tomtly-accent"
              />
              <p className="font-mono text-lg font-bold text-tomtly-dark mt-1">{fmt(avgPris)} kr</p>
            </div>

            {/* Provisjon */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Provisjonssats
              </label>
              <input
                type="range"
                min={1.5}
                max={4.0}
                step={0.1}
                value={provisjonPct}
                onChange={(e) => setProvisjonPct(Number(e.target.value))}
                className="w-full accent-tomtly-accent"
              />
              <p className="font-mono text-lg font-bold text-tomtly-dark mt-1">{provisjonPct.toFixed(1)} %</p>
            </div>

            {/* Split */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Split (Tomtly/Partner)
              </label>
              <div className="flex gap-1">
                {SPLITS.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => setSplitIndex(i)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg transition-colors ${
                      splitIndex === i
                        ? 'bg-tomtly-accent text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">Tomtly: {(split.tomtly * 100).toFixed(0)} % / Partner: {(split.partner * 100).toFixed(0)} %</p>
            </div>

            {/* Salg per måned */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Salg per måned
              </label>
              <input
                type="range"
                min={1}
                max={100}
                step={1}
                value={salg}
                onChange={(e) => setSalg(Number(e.target.value))}
                className="w-full accent-tomtly-accent"
              />
              <p className="font-mono text-lg font-bold text-tomtly-dark mt-1">{salg} salg</p>
            </div>

            {/* Antall meglere */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Antall meglere hos partner
              </label>
              <input
                type="range"
                min={1}
                max={50}
                step={1}
                value={antallMeglere}
                onChange={(e) => setAntallMeglere(Number(e.target.value))}
                className="w-full accent-tomtly-accent"
              />
              <p className="font-mono text-lg font-bold text-tomtly-dark mt-1">{antallMeglere} megler{antallMeglere > 1 ? 'e' : ''}</p>
            </div>
          </div>
        </div>

        {/* ─── Headline KPIs ─── */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tomtly netto / mnd</p>
            <p className={`font-mono text-2xl font-bold ${tomtlyNettoMnd >= 0 ? 'text-tomtly-accent' : 'text-red-500'}`}>{fmt(tomtlyNettoMnd)} kr</p>
            <p className="text-xs text-gray-400 mt-1">Margin: {tomtlyMargin.toFixed(1)} %</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tomtly netto / år</p>
            <p className={`font-mono text-2xl font-bold ${tomtlyNettoAar >= 0 ? 'text-tomtly-accent' : 'text-red-500'}`}>{fmt(tomtlyNettoAar)} kr</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Tomtly timelønn</p>
            <p className={`font-mono text-2xl font-bold ${tomtlyTimelonnEffektiv >= 0 ? 'text-tomtly-accent' : 'text-red-500'}`}>{fmt(tomtlyTimelonnEffektiv)} kr/t</p>
            <p className="text-xs text-gray-400 mt-1">{totalTimerPerSalg}t per salg, {fmt(totalTimerMnd)}t/mnd</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Partner brutto / mnd</p>
            <p className="font-mono text-2xl font-bold text-tomtly-gold">{fmt(partnerBrutoMnd)} kr</p>
            <p className="text-xs text-gray-400 mt-1">Per megler: {fmt(partnerPerMeglerMnd)} kr</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Partner brutto / år</p>
            <p className="font-mono text-2xl font-bold text-tomtly-gold">{fmt(partnerBrutoAar)} kr</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Break-even</p>
            <p className="font-mono text-2xl font-bold text-tomtly-dark">{breakEvenSalg === Infinity ? '∞' : breakEvenSalg.toFixed(1)} salg</p>
            <p className="text-xs text-gray-400 mt-1">per måned</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">

          {/* ─── Per-salg breakdown ─── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-5 h-5 text-tomtly-accent" />
              <h2 className="font-display text-lg font-bold text-tomtly-dark">Per salg – breakdown</h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Tomtepris</span>
                <span className="font-mono text-sm font-bold">{fmt(avgPris)} kr</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Provisjon ({provisjonPct} %)</span>
                <span className="font-mono text-sm font-bold">{fmt(provisjonPerSalg)} kr</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Fastpris fra tomteeier</span>
                <span className="font-mono text-sm font-bold">{fmt(fastpris)} kr</span>
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Fordeling provisjon</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">→ Tomtly ({(split.tomtly * 100).toFixed(0)} %)</span>
                <span className="font-mono text-sm font-bold text-tomtly-accent">{fmt(tomtlyAndel)} kr</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">→ Partner ({(split.partner * 100).toFixed(0)} %)</span>
                <span className="font-mono text-sm font-bold text-tomtly-gold">{fmt(partnerAndel)} kr</span>
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">Ekstra inntekter per salg</p>
              </div>
              {Object.entries(TOMTLY_INCOME_PER_SALE_EXTRA).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1">
                  <span className="text-sm text-gray-500">{key.replace(/_/g, ' ')}</span>
                  <span className="font-mono text-sm text-green-600">+{fmt(val)} kr</span>
                </div>
              ))}

              <div className="pt-2">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Tomtlys kostnader per salg</p>
              </div>
              {Object.entries(TOMTLY_COSTS_PER_SALE).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1">
                  <span className="text-sm text-gray-500">{key.replace(/_/g, ' ')}</span>
                  <span className="font-mono text-sm text-red-500">-{fmt(val)} kr</span>
                </div>
              ))}
              <div className="flex justify-between py-2 border-t border-gray-200 mt-2">
                <span className="text-sm text-gray-600">Sum kostnader per salg</span>
                <span className="font-mono text-sm font-bold text-red-500">-{fmt(totalKostnadPerSalg)} kr</span>
              </div>

              <div className="flex justify-between py-3 border-t-2 border-tomtly-dark mt-2">
                <span className="text-sm font-bold text-tomtly-dark">Tomtly netto per salg</span>
                <span className={`font-mono text-lg font-bold ${tomtlyNettoPerSalg >= 0 ? 'text-tomtly-accent' : 'text-red-500'}`}>
                  {fmt(tomtlyNettoPerSalg)} kr
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Tidsbruk: {totalTimerPerSalg}t → effektiv timelønn</span>
                <span className={`font-mono text-sm font-bold ${tomtlyTimelonnEffektiv >= 0 ? 'text-tomtly-accent' : 'text-red-500'}`}>
                  {fmt(tomtlyTimelonnEffektiv)} kr/t
                </span>
              </div>
            </div>
          </div>

          {/* ─── Månedlig P&L ─── */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-tomtly-accent" />
              <h2 className="font-display text-lg font-bold text-tomtly-dark">Månedlig P&L – Tomtly</h2>
            </div>

            <div className="space-y-3">
              <div className="pt-1">
                <p className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">Inntekter</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Provisjonsandel ({salg} salg × {fmt(tomtlyAndel)} kr)</span>
                <span className="font-mono text-sm font-bold text-green-600">{fmt(tomtlyAndel * salg)} kr</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Fastpris tomteeier ({salg} × {fmt(fastpris)} kr)</span>
                <span className="font-mono text-sm font-bold text-green-600">{fmt(fastpris * salg)} kr</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Foto-fee ({salg} × {fmt(totalExtraIncomePerSalg)} kr)</span>
                <span className="font-mono text-sm font-bold text-green-600">{fmt(totalExtraIncomePerSalg * salg)} kr</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-gray-700">Sum inntekter</span>
                <span className="font-mono text-sm font-bold text-green-600">{fmt(tomtlyBrutoMnd)} kr</span>
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">Kostnader</p>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Variable kostnader ({salg} × {fmt(totalKostnadPerSalg)} kr)</span>
                <span className="font-mono text-sm text-red-500">-{fmt(totalKostnadPerSalg * salg)} kr</span>
              </div>
              {Object.entries(TOMTLY_FIXED_MONTHLY).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1">
                  <span className="text-sm text-gray-500">{key.replace(/_/g, ' ')}</span>
                  <span className="font-mono text-sm text-red-500">-{fmt(val)} kr</span>
                </div>
              ))}
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-sm font-semibold text-gray-700">Sum kostnader</span>
                <span className="font-mono text-sm font-bold text-red-500">-{fmt(tomtlyKostMnd)} kr</span>
              </div>

              <div className="flex justify-between py-3 border-t-2 border-tomtly-dark mt-2">
                <span className="text-sm font-bold text-tomtly-dark">Netto resultat</span>
                <span className={`font-mono text-xl font-bold ${tomtlyNettoMnd >= 0 ? 'text-tomtly-accent' : 'text-red-500'}`}>
                  {fmt(tomtlyNettoMnd)} kr
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Netto margin</span>
                <span className={`font-mono text-sm font-bold ${tomtlyMargin >= 0 ? 'text-tomtly-accent' : 'text-red-500'}`}>
                  {tomtlyMargin.toFixed(1)} %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Partner-perspektiv ─── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-5 h-5 text-tomtly-gold" />
            <h2 className="font-display text-lg font-bold text-tomtly-dark">Partner-perspektiv – dette ser meglerfirmaet</h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Per salg</p>
              <p className="font-mono text-2xl font-bold text-tomtly-dark">{fmt(partnerAndel)} kr</p>
              <p className="text-xs text-gray-400 mt-1">Ren provisjon, ingen kostnader</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Timelønn (snitt {timerPerSalgMegler}t)</p>
              <p className="font-mono text-2xl font-bold text-tomtly-dark">{fmt(timelonnMegler)} kr/t</p>
              <p className="text-xs text-gray-400 mt-1">Bedre enn vanlig boligsalg</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Per megler / mnd</p>
              <p className="font-mono text-2xl font-bold text-tomtly-dark">{fmt(partnerPerMeglerMnd)} kr</p>
              <p className="text-xs text-gray-400 mt-1">{salgPerMegler.toFixed(1)} salg per megler</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
              <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Per megler / år</p>
              <p className="font-mono text-2xl font-bold text-tomtly-gold">{fmt(partnerPerMeglerMnd * 12)} kr</p>
              <p className="text-xs text-gray-400 mt-1">Ekstra inntekt utover vanlige oppdrag</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Pitch-poeng du kan bruke i samtalen</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• «Hver megler hos dere kan tjene {fmt(partnerPerMeglerMnd * 12)} kr ekstra i året – uten å endre noe annet.»</li>
              <li>• «Timelønnen på Tomtly-salg er {fmt(timelonnMegler)} kr/t – høyere enn et vanlig boligsalg.»</li>
              <li>• «Med {salg} salg i måneden snakker vi om {fmt(partnerBrutoAar)} kr i året til deres firma – og dere investerer null.»</li>
              <li>• «Break-even for Tomtly er {breakEvenSalg.toFixed(1)} salg/mnd. Alt over det er ren fortjeneste for begge parter.»</li>
            </ul>
          </div>
        </div>

        {/* ─── Scenariotabell ─── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-tomtly-accent" />
            <h2 className="font-display text-lg font-bold text-tomtly-dark">Scenarioanalyse</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 pr-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">Salg/mnd</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Total prov.</th>
                  <th className="text-right py-3 px-3 font-semibold text-tomtly-accent uppercase text-xs tracking-wider">Tomtly brutto</th>
                  <th className="text-right py-3 px-3 font-semibold text-red-400 uppercase text-xs tracking-wider">Tomtly kost.</th>
                  <th className="text-right py-3 px-3 font-semibold text-tomtly-accent uppercase text-xs tracking-wider">Tomtly netto</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-400 uppercase text-xs tracking-wider">Margin</th>
                  <th className="text-right py-3 pl-3 font-semibold text-tomtly-gold uppercase text-xs tracking-wider">Partner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 3, 5, 10, 15, 25, 50, 100].map((s) => {
                  const tProv = provisjonPerSalg * s
                  const tBrutto = (tomtlyAndel + fastpris + totalExtraIncomePerSalg) * s
                  const tKost = (totalKostnadPerSalg * s) + totalFixedMonthly
                  const tNetto = tBrutto - tKost
                  const tMargin = tBrutto > 0 ? (tNetto / tBrutto) * 100 : 0
                  const pBrutto = partnerAndel * s
                  const isCurrentRow = s === salg

                  return (
                    <tr key={s} className={`transition-colors ${isCurrentRow ? 'bg-tomtly-accent/5 font-bold' : 'hover:bg-gray-50'}`}>
                      <td className="py-3 pr-4 font-mono">{s}</td>
                      <td className="py-3 px-3 text-right font-mono">{fmt(tProv)}</td>
                      <td className="py-3 px-3 text-right font-mono text-tomtly-accent">{fmt(tBrutto)}</td>
                      <td className="py-3 px-3 text-right font-mono text-red-400">-{fmt(tKost)}</td>
                      <td className={`py-3 px-3 text-right font-mono font-bold ${tNetto >= 0 ? 'text-tomtly-accent' : 'text-red-500'}`}>{fmt(tNetto)}</td>
                      <td className={`py-3 px-3 text-right font-mono ${tMargin >= 0 ? 'text-gray-500' : 'text-red-500'}`}>{tMargin.toFixed(0)} %</td>
                      <td className="py-3 pl-3 text-right font-mono text-tomtly-gold font-bold">{fmt(pBrutto)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-4">
            Tall per måned. Snitt tomtepris: {fmt(avgPris)} kr. Provisjon: {provisjonPct} %. Split: {split.label}. Fastpris tomteeier: {fmt(fastpris)} kr.
          </p>
        </div>

        {/* ─── Split-sensitivitet ─── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mb-8">
          <h2 className="font-display text-lg font-bold text-tomtly-dark mb-6">Split-sensitivitet ved {salg} salg/mnd</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 pr-4 font-semibold text-gray-500 uppercase text-xs tracking-wider">Split</th>
                  <th className="text-right py-3 px-3 font-semibold text-tomtly-accent uppercase text-xs tracking-wider">Tomtly/salg</th>
                  <th className="text-right py-3 px-3 font-semibold text-tomtly-gold uppercase text-xs tracking-wider">Partner/salg</th>
                  <th className="text-right py-3 px-3 font-semibold text-tomtly-accent uppercase text-xs tracking-wider">Tomtly netto/mnd</th>
                  <th className="text-right py-3 px-3 font-semibold text-tomtly-gold uppercase text-xs tracking-wider">Partner/mnd</th>
                  <th className="text-right py-3 pl-3 font-semibold text-gray-400 uppercase text-xs tracking-wider">Tomtly margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SPLITS.map((s, i) => {
                  const tAndel = provisjonPerSalg * s.tomtly
                  const pAndel = provisjonPerSalg * s.partner
                  const tBrutto = (tAndel + fastpris + totalExtraIncomePerSalg) * salg
                  const tKost = (totalKostnadPerSalg * salg) + totalFixedMonthly
                  const tNetto = tBrutto - tKost
                  const tMargin = tBrutto > 0 ? (tNetto / tBrutto) * 100 : 0
                  const pBrutto = pAndel * salg
                  const isSelected = i === splitIndex

                  return (
                    <tr key={s.label} className={`transition-colors ${isSelected ? 'bg-tomtly-accent/5 font-bold' : 'hover:bg-gray-50'}`}>
                      <td className="py-3 pr-4 font-mono">{s.label}{isSelected ? ' ←' : ''}</td>
                      <td className="py-3 px-3 text-right font-mono text-tomtly-accent">{fmt(tAndel)}</td>
                      <td className="py-3 px-3 text-right font-mono text-tomtly-gold">{fmt(pAndel)}</td>
                      <td className={`py-3 px-3 text-right font-mono font-bold ${tNetto >= 0 ? 'text-tomtly-accent' : 'text-red-500'}`}>{fmt(tNetto)}</td>
                      <td className="py-3 px-3 text-right font-mono text-tomtly-gold font-bold">{fmt(pBrutto)}</td>
                      <td className="py-3 pl-3 text-right font-mono text-gray-500">{tMargin.toFixed(0)} %</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ─── Forhandlingsnotater ─── */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <h2 className="font-display text-lg font-bold text-tomtly-dark mb-6">Forhandlingsnotater</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-5 border border-green-200">
              <h3 className="text-sm font-bold text-green-800 mb-3">Kan gi rom på</h3>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• Split kan gå ned til 60/40 og fortsatt være lønnsomt</li>
                <li>• Ved høyt volum (&gt;25/mnd) kan vi tilby volumbonuser</li>
                <li>• Eksklusivitet i region kan gis mot minimumsvolum</li>
                <li>• Kan tilby co-branding uten ekstra kostnad</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <h3 className="text-sm font-bold text-red-800 mb-3">Ikke gi rom på</h3>
              <ul className="space-y-2 text-sm text-red-700">
                <li>• Split under 60/40 gir for lav margin for Tomtly</li>
                <li>• Fastpris fra tomteeier (4 990 kr) er ikke forhandlingsbar</li>
                <li>• Tomtly må eie kundeforholdet og analyseprosessen</li>
                <li>• Eksklusivitet uten minimumsvolum er for risikabelt</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-bold text-gray-700 mb-3">Break-even analyse</h3>
            <p className="text-sm text-gray-600">
              Med nåværende parametere trenger Tomtly <span className="font-mono font-bold text-tomtly-accent">{breakEvenSalg.toFixed(1)} salg per måned</span> for å gå i null.
              Alt over dette er ren fortjeneste. Ved {salg} salg/mnd er Tomtly {((salg / breakEvenSalg - 1) * 100).toFixed(0)} % over break-even.
            </p>
          </div>
        </div>
      </div>

        {/* ─── Total finansiell modell per salg ─── */}
        <TotalModellPerSalg
          avgPris={avgPris}
          provisjonPct={provisjonPct}
          split={split}
          fastpris={fastpris}
          totalKostnadPerSalg={totalKostnadPerSalg}
          totalTimerPerSalg={totalTimerPerSalg}
          salg={salg}
        />

        {/* ─── Komplett finansiell oversikt ─── */}
        <KomplettFinansiellOversikt
          avgPris={avgPris}
          provisjonPct={provisjonPct}
          split={split}
          salg={salg}
        />

      {/* Footer */}
      <div className="bg-tomtly-dark text-center py-6 mt-10">
        <p className="text-xs text-gray-500">Internt dokument – NOPS AS – Konfidensielt</p>
      </div>
    </div>
  )
}

// ─── Total finansiell modell per salg ──────────────────────────────────────

function TotalModellPerSalg({
  avgPris,
  provisjonPct,
  split,
  fastpris,
  totalKostnadPerSalg,
  totalTimerPerSalg,
  salg,
}: {
  avgPris: number
  provisjonPct: number
  split: { tomtly: number; partner: number; label: string }
  fastpris: number
  totalKostnadPerSalg: number
  totalTimerPerSalg: number
  salg: number
}) {
  // Alle inntektsstrømmer per salg
  const provisjon = avgPris * (provisjonPct / 100)
  const tomtlyProv = provisjon * split.tomtly
  const partnerProv = provisjon * split.partner

  const streams = [
    { label: 'Tomteeier fastpris', amount: fastpris, color: 'bg-blue-500', category: 'direkte' },
    { label: 'Provisjon (Tomtly-andel)', amount: tomtlyProv, color: 'bg-emerald-500', category: 'direkte' },
    { label: 'Foto-fee (margin)', amount: 1000, color: 'bg-purple-500', category: 'direkte' },
    { label: 'Proff Oppgjør formidling', amount: 2000, color: 'bg-gray-500', category: 'etter-salg' },
    { label: 'Bank lead-fee', amount: 4900, color: 'bg-sky-500', category: 'etter-salg' },
    { label: 'Prosjektfinansiering', amount: 5000, color: 'bg-amber-500', category: 'etter-salg' },
    { label: 'Entreprenør (andel av årsavgift)', amount: 2000, color: 'bg-orange-500', category: 'økosystem' },
    { label: 'Husleverandør (andel av abo)', amount: 3000, color: 'bg-green-600', category: 'økosystem' },
  ]

  const totalInntektPerSalg = streams.reduce((s, r) => s + r.amount, 0)
  const nettoPerSalg = totalInntektPerSalg - totalKostnadPerSalg
  const maxStream = Math.max(...streams.map(s => s.amount))

  const direkte = streams.filter(s => s.category === 'direkte')
  const etterSalg = streams.filter(s => s.category === 'etter-salg')
  const okosystem = streams.filter(s => s.category === 'økosystem')
  const sumDirekte = direkte.reduce((s, r) => s + r.amount, 0)
  const sumEtterSalg = etterSalg.reduce((s, r) => s + r.amount, 0)
  const sumOkosystem = okosystem.reduce((s, r) => s + r.amount, 0)

  // Månedlig og årlig
  const nettoMnd = nettoPerSalg * salg
  const nettoAar = nettoMnd * 12
  const totalInntektMnd = totalInntektPerSalg * salg
  const effectiveTimelonn = nettoPerSalg / totalTimerPerSalg

  // Visuell: prosentandel av total per stream
  const pctWidth = (amount: number) => Math.max((amount / totalInntektPerSalg) * 100, 2)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tomtly-accent to-emerald-600 flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-tomtly-dark">Tomtlys totale finansielle modell per salg</h2>
          <p className="text-xs text-gray-500">Alle inntektsstrømmer med meglerpartner-økonomi innregnet</p>
        </div>
      </div>

      {/* ─── Stacked bar – visuell total ─── */}
      <div className="mt-8 mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total inntekt per salg</span>
          <span className="font-mono text-lg font-bold text-tomtly-dark">{fmt(Math.round(totalInntektPerSalg))} kr</span>
        </div>
        <div className="flex rounded-xl overflow-hidden h-12 shadow-inner">
          {streams.map((s) => (
            <div
              key={s.label}
              className={`${s.color} relative group transition-all duration-300 hover:brightness-110`}
              style={{ width: `${pctWidth(s.amount)}%` }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <div className="bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap font-mono">
                  {s.label}: {fmt(Math.round(s.amount))} kr
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {streams.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
              <span className="text-[11px] text-gray-500">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Tre kategorier ─── */}
      <div className="grid md:grid-cols-3 gap-5 mb-10">
        {/* Direkte inntekter */}
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-emerald-800">Ved salg</h3>
            <span className="font-mono text-lg font-bold text-emerald-700">{fmt(Math.round(sumDirekte))} kr</span>
          </div>
          <div className="space-y-3">
            {direkte.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{s.label}</span>
                  <span className="font-mono font-bold text-gray-800">{fmt(Math.round(s.amount))}</span>
                </div>
                <div className="w-full bg-emerald-100 rounded-full h-2">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.amount / maxStream) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Etter-salg */}
        <div className="rounded-xl border-2 border-sky-200 bg-sky-50/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-sky-800">Etter salg</h3>
            <span className="font-mono text-lg font-bold text-sky-700">{fmt(Math.round(sumEtterSalg))} kr</span>
          </div>
          <div className="space-y-3">
            {etterSalg.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{s.label}</span>
                  <span className="font-mono font-bold text-gray-800">{fmt(Math.round(s.amount))}</span>
                </div>
                <div className="w-full bg-sky-100 rounded-full h-2">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.amount / maxStream) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Økosystem */}
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-amber-800">Økosystem</h3>
            <span className="font-mono text-lg font-bold text-amber-700">{fmt(Math.round(sumOkosystem))} kr</span>
          </div>
          <div className="space-y-3">
            {okosystem.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600">{s.label}</span>
                  <span className="font-mono font-bold text-gray-800">{fmt(Math.round(s.amount))}</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2">
                  <div className={`h-full rounded-full ${s.color}`} style={{ width: `${(s.amount / maxStream) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Waterfall: inntekt → kostnad → partner → netto ─── */}
      <div className="mb-10">
        <h3 className="text-sm font-bold text-gray-700 mb-5">Pengeflyten – fra tomtepris til Tomtly netto</h3>
        <div className="flex flex-col md:flex-row items-stretch gap-3">
          {[
            { label: 'Tomtepris', value: avgPris, color: 'bg-gray-100 border-gray-300', textColor: 'text-gray-700', sub: 'Kunden betaler' },
            { label: 'Total provisjon', value: provisjon, color: 'bg-blue-50 border-blue-300', textColor: 'text-blue-700', sub: `${provisjonPct} % av tomtepris` },
            { label: `Partner (${(split.partner * 100).toFixed(0)} %)`, value: -partnerProv, color: 'bg-amber-50 border-amber-300', textColor: 'text-amber-700', sub: 'Meglers andel' },
            { label: 'Tomtly provisjon', value: tomtlyProv, color: 'bg-emerald-50 border-emerald-300', textColor: 'text-emerald-700', sub: `${(split.tomtly * 100).toFixed(0)} % av provisjon` },
            { label: '+ Fastpris + foto + etter-salg', value: totalInntektPerSalg - tomtlyProv, color: 'bg-green-50 border-green-300', textColor: 'text-green-700', sub: 'Alle andre strømmer' },
            { label: '- Kostnader', value: -totalKostnadPerSalg, color: 'bg-red-50 border-red-300', textColor: 'text-red-600', sub: `${totalTimerPerSalg}t × 450 kr + verktøy` },
            { label: 'Tomtly netto', value: nettoPerSalg, color: 'bg-tomtly-accent/10 border-tomtly-accent', textColor: 'text-tomtly-accent', sub: 'Per salg' },
          ].map((step) => (
            <div key={step.label} className="flex-1 flex flex-col">
              <div className={`flex-1 rounded-xl border-2 ${step.color} p-4 flex flex-col justify-center text-center`}>
                <p className="text-[11px] text-gray-500 mb-1">{step.label}</p>
                <p className={`font-mono text-lg font-bold ${step.textColor}`}>
                  {step.value < 0 ? '-' : ''}{fmt(Math.abs(Math.round(step.value)))} kr
                </p>
                <p className="text-[10px] text-gray-400 mt-1">{step.sub}</p>
              </div>
              {step.label !== 'Tomtly netto' && (
                <div className="hidden md:flex justify-center py-1">
                  <span className="text-gray-300 text-lg">→</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Oppskalert ─── */}
      <div className="bg-gradient-to-r from-tomtly-dark to-gray-900 rounded-2xl p-8 text-white">
        <h3 className="font-display text-lg font-bold mb-6">Oppskalert med {salg} salg/mnd – total modell</h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[11px] text-gray-400 mb-1">Per salg netto</p>
            <p className="font-mono text-2xl font-bold text-tomtly-gold">{fmt(Math.round(nettoPerSalg))} kr</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[11px] text-gray-400 mb-1">Per måned netto</p>
            <p className="font-mono text-2xl font-bold text-emerald-400">{fmt(Math.round(nettoMnd))} kr</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[11px] text-gray-400 mb-1">Per år netto</p>
            <p className="font-mono text-2xl font-bold text-emerald-400">{fmt(Math.round(nettoAar))} kr</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[11px] text-gray-400 mb-1">Effektiv timelønn</p>
            <p className="font-mono text-2xl font-bold text-tomtly-gold">{fmt(Math.round(effectiveTimelonn))} kr/t</p>
          </div>
        </div>

        {/* Split-visualisering: hvem får hva av totalen */}
        <h4 className="text-sm font-semibold text-gray-400 mb-3">Fordeling per salg – hvem får hva?</h4>
        <div className="space-y-3">
          {[
            { label: 'Tomtly netto (etter alle kostnader)', value: nettoPerSalg, pct: (nettoPerSalg / (nettoPerSalg + partnerProv + totalKostnadPerSalg)) * 100, color: 'bg-emerald-500' },
            { label: 'Meglerpartner', value: partnerProv, pct: (partnerProv / (nettoPerSalg + partnerProv + totalKostnadPerSalg)) * 100, color: 'bg-amber-500' },
            { label: 'Tomtlys kostnader', value: totalKostnadPerSalg, pct: (totalKostnadPerSalg / (nettoPerSalg + partnerProv + totalKostnadPerSalg)) * 100, color: 'bg-red-400' },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-300">{row.label}</span>
                <span className="font-mono text-white">{fmt(Math.round(row.value))} kr ({row.pct.toFixed(0)} %)</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3">
                <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-gray-400 text-sm">
            Tomtly beholder <span className="text-tomtly-gold font-bold">{fmt(Math.round(nettoPerSalg))} kr netto</span> av totalt{' '}
            <span className="text-white font-bold">{fmt(Math.round(totalInntektPerSalg))} kr inntekt</span> per salg.
            Med {salg} salg/mnd = <span className="text-emerald-400 font-bold">{fmt(Math.round(nettoAar))} kr/år</span>.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Komplett finansiell oversikt ─────────────────────────────────────────

function KomplettFinansiellOversikt({
  avgPris,
  provisjonPct,
  split,
  salg,
}: {
  avgPris: number
  provisjonPct: number
  split: { tomtly: number; partner: number; label: string }
  salg: number
}) {
  const provisjon = avgPris * (provisjonPct / 100)
  const tomtlyProv = provisjon * split.tomtly

  // ─── Alle inntektsstrømmer per salg ───
  // Konverteringsrater: ikke alle salg genererer alle strømmer
  const streams = [
    {
      label: 'Tomteeier fastpris',
      perSalg: 4990,
      rate: 1.0,
      timer: 4,
      kostPerSalg: TOMTLY_TIMEKOST * 4,
      kategori: 'Kjerneprodukt' as const,
      color: 'bg-blue-500',
      note: 'Alle kunder betaler dette',
    },
    {
      label: `Provisjon (Tomtly ${(split.tomtly * 100).toFixed(0)} % av ${provisjonPct} %)`,
      perSalg: tomtlyProv,
      rate: 1.0,
      timer: 0.5,
      kostPerSalg: TOMTLY_TIMEKOST * 0.5,
      kategori: 'Kjerneprodukt' as const,
      color: 'bg-emerald-500',
      note: `Partner får ${fmt(Math.round(provisjon * split.partner))} kr (${(split.partner * 100).toFixed(0)} %)`,
    },
    {
      label: 'Foto-fee (margin på fotooppdrag)',
      perSalg: 1000,
      rate: 0.7,
      timer: 0,
      kostPerSalg: 0,
      kategori: 'Kjerneprodukt' as const,
      color: 'bg-purple-500',
      note: '70 % av salg bruker fotograf',
    },
    {
      label: 'Megler Premium (ekstern megler)',
      perSalg: 4900,
      rate: 0.15,
      timer: 2,
      kostPerSalg: TOMTLY_TIMEKOST * 2,
      kategori: 'Meglertjenester' as const,
      color: 'bg-indigo-500',
      note: '15 % av salg er via eksterne meglere som betaler for analyse',
    },
    {
      label: 'Bank lead-fee',
      perSalg: 4900,
      rate: 0.5,
      timer: 0.25,
      kostPerSalg: TOMTLY_TIMEKOST * 0.25,
      kategori: 'Etter salg' as const,
      color: 'bg-sky-500',
      note: '50 % av kjøpere trenger byggelån',
    },
    {
      label: 'Prosjektfinansiering (lead-fee)',
      perSalg: 9900,
      rate: 0.1,
      timer: 0.5,
      kostPerSalg: TOMTLY_TIMEKOST * 0.5,
      kategori: 'Etter salg' as const,
      color: 'bg-amber-500',
      note: '10 % bruker alternativ finansiering (Kameo/Oblinor)',
    },
    {
      label: 'Proff Oppgjør formidlingsgebyr',
      perSalg: 2000,
      rate: 1.0,
      timer: 0,
      kostPerSalg: 0,
      kategori: 'Etter salg' as const,
      color: 'bg-gray-500',
      note: 'Alle salg går via Proff Oppgjør AS for oppgjør',
    },
    {
      label: 'Entreprenør-abonnement (andel/salg)',
      perSalg: 14900 / 12,
      rate: 0.3,
      timer: 0,
      kostPerSalg: 0,
      kategori: 'Økosystem' as const,
      color: 'bg-orange-500',
      note: '30 % av kjøpere velger samarbeidsentreprenør',
    },
    {
      label: 'Husleverandør-abonnement (andel/salg)',
      perSalg: 15000 / salg, // fordelt per salg fra månedlig abo
      rate: 1.0,
      timer: 0,
      kostPerSalg: 0,
      kategori: 'Økosystem' as const,
      color: 'bg-green-600',
      note: `Fordelt: 15 000 kr/mnd ÷ ${salg} salg`,
    },
    {
      label: 'Fradeling (estimert andel)',
      perSalg: 69000,
      rate: 0.05,
      timer: 15,
      kostPerSalg: TOMTLY_TIMEKOST * 15,
      kategori: 'Spesialprodukt' as const,
      color: 'bg-rose-500',
      note: '5 % av tomter har fradelingspotensial',
    },
  ]

  // Beregn snittet per salg med konverteringsrater
  const snittInntektPerSalg = streams.reduce((s, r) => s + r.perSalg * r.rate, 0)
  const snittKostnadPerSalg = streams.reduce((s, r) => s + r.kostPerSalg * r.rate, 0)
  const snittTimerPerSalg = streams.reduce((s, r) => s + r.timer * r.rate, 0)
  const snittNettoPerSalg = snittInntektPerSalg - snittKostnadPerSalg
  const snittMarginPct = snittInntektPerSalg > 0 ? (snittNettoPerSalg / snittInntektPerSalg) * 100 : 0

  const mndInntekt = snittInntektPerSalg * salg
  const mndKostnad = snittKostnadPerSalg * salg + Object.values(TOMTLY_FIXED_MONTHLY).reduce((a, b) => a + b, 0)
  const mndNetto = mndInntekt - mndKostnad
  const aarNetto = mndNetto * 12
  const aarInntekt = mndInntekt * 12

  const kategorier = ['Kjerneprodukt', 'Meglertjenester', 'Etter salg', 'Økosystem', 'Spesialprodukt'] as const
  const katFarger: Record<string, string> = {
    'Kjerneprodukt': 'border-emerald-300 bg-emerald-50',
    'Meglertjenester': 'border-indigo-300 bg-indigo-50',
    'Etter salg': 'border-sky-300 bg-sky-50',
    'Økosystem': 'border-amber-300 bg-amber-50',
    'Spesialprodukt': 'border-rose-300 bg-rose-50',
  }
  const katTekst: Record<string, string> = {
    'Kjerneprodukt': 'text-emerald-800',
    'Meglertjenester': 'text-indigo-800',
    'Etter salg': 'text-sky-800',
    'Økosystem': 'text-amber-800',
    'Spesialprodukt': 'text-rose-800',
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-tomtly-dark to-gray-900 p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-6 h-6 text-tomtly-gold" />
          <h2 className="font-display text-xl font-bold">Tomtlys komplette finansielle oversikt</h2>
        </div>
        <p className="text-sm text-gray-400">
          Alle inntektsstrømmer med meglerpartner-modell ({split.label} split), konverteringsrater og reelle kostnader.
          Snittet per salg viser hva Tomtly faktisk tjener når alle strømmer vektes.
        </p>

        {/* Headline KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Snitt inntekt/salg</p>
            <p className="font-mono text-xl font-bold text-white">{fmt(Math.round(snittInntektPerSalg))} kr</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Snitt netto/salg</p>
            <p className="font-mono text-xl font-bold text-emerald-400">{fmt(Math.round(snittNettoPerSalg))} kr</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Netto/mnd ({salg} salg)</p>
            <p className="font-mono text-xl font-bold text-emerald-400">{fmt(Math.round(mndNetto))} kr</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Netto/år</p>
            <p className="font-mono text-xl font-bold text-tomtly-gold">{fmt(Math.round(aarNetto))} kr</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Margin</p>
            <p className="font-mono text-xl font-bold text-white">{snittMarginPct.toFixed(0)} %</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">

        {/* ─── Stacked revenue bar ─── */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-gray-700 mb-3">Snitt inntekt per salg – alle strømmer (vektet med konverteringsrate)</h3>
          <div className="flex rounded-xl overflow-hidden h-14 shadow-inner border border-gray-200">
            {streams.map((s) => {
              const weighted = s.perSalg * s.rate
              const pct = snittInntektPerSalg > 0 ? Math.max((weighted / snittInntektPerSalg) * 100, 1.5) : 0
              return (
                <div
                  key={s.label}
                  className={`${s.color} relative group transition-all duration-300 hover:brightness-110`}
                  style={{ width: `${pct}%` }}
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                    <div className="bg-gray-900 text-white text-[10px] px-3 py-2 rounded-lg whitespace-nowrap font-mono shadow-xl">
                      <p className="font-bold mb-0.5">{s.label}</p>
                      <p>{fmt(Math.round(weighted))} kr/salg ({(s.rate * 100).toFixed(0)} % konv.)</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
            {streams.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${s.color}`} />
                <span className="text-[11px] text-gray-500">{s.label.split('(')[0].trim()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Detaljert tabell ─── */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Detaljert breakdown per inntektsstrøm</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 pr-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Inntektsstrøm</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Per salg</th>
                  <th className="text-center py-3 px-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Konv.</th>
                  <th className="text-right py-3 px-3 font-semibold text-green-600 uppercase text-xs tracking-wider">Vektet/salg</th>
                  <th className="text-right py-3 px-3 font-semibold text-red-400 uppercase text-xs tracking-wider">Kost/salg</th>
                  <th className="text-right py-3 px-3 font-semibold text-emerald-600 uppercase text-xs tracking-wider">Netto/salg</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-500 uppercase text-xs tracking-wider">Timer</th>
                  <th className="text-right py-3 px-3 font-semibold text-tomtly-gold uppercase text-xs tracking-wider">Mnd ({salg})</th>
                  <th className="text-left py-3 pl-3 font-semibold text-gray-400 uppercase text-xs tracking-wider">Note</th>
                </tr>
              </thead>
              <tbody>
                {kategorier.map((kat) => {
                  const katStreams = streams.filter(s => s.kategori === kat)
                  if (katStreams.length === 0) return null
                  const katTotal = katStreams.reduce((s, r) => s + r.perSalg * r.rate, 0)
                  return (
                    <Fragment key={kat}>
                      <tr>
                        <td colSpan={9} className={`pt-4 pb-2 px-3 text-xs font-bold uppercase tracking-wider ${katTekst[kat]}`}>
                          <div className={`inline-block px-2 py-0.5 rounded ${katFarger[kat]} border`}>
                            {kat} – {fmt(Math.round(katTotal))} kr/salg
                          </div>
                        </td>
                      </tr>
                      {katStreams.map((s) => {
                        const weighted = s.perSalg * s.rate
                        const weightedKost = s.kostPerSalg * s.rate
                        const netto = weighted - weightedKost
                        const mnd = weighted * salg
                        return (
                          <tr key={s.label} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                            <td className="py-2.5 pr-3">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${s.color}`} />
                                <span className="text-gray-700">{s.label}</span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-right font-mono text-gray-700">{fmt(Math.round(s.perSalg))}</td>
                            <td className="py-2.5 px-3 text-center font-mono text-gray-500">{(s.rate * 100).toFixed(0)} %</td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-green-700">{fmt(Math.round(weighted))}</td>
                            <td className="py-2.5 px-3 text-right font-mono text-red-400">{weightedKost > 0 ? `-${fmt(Math.round(weightedKost))}` : '–'}</td>
                            <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-600">{fmt(Math.round(netto))}</td>
                            <td className="py-2.5 px-3 text-right font-mono text-gray-400">{(s.timer * s.rate).toFixed(1)}t</td>
                            <td className="py-2.5 px-3 text-right font-mono text-tomtly-gold">{fmt(Math.round(mnd))}</td>
                            <td className="py-2.5 pl-3 text-[11px] text-gray-400 max-w-[200px]">{s.note}</td>
                          </tr>
                        )
                      })}
                    </Fragment>
                  )
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-300 bg-gray-50">
                  <td className="py-3 pr-3 font-bold text-gray-800">Totalt (vektet snitt per salg)</td>
                  <td className="py-3 px-3" />
                  <td className="py-3 px-3" />
                  <td className="py-3 px-3 text-right font-mono font-bold text-green-700 text-base">{fmt(Math.round(snittInntektPerSalg))}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-red-500">-{fmt(Math.round(snittKostnadPerSalg))}</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-700 text-base">{fmt(Math.round(snittNettoPerSalg))}</td>
                  <td className="py-3 px-3 text-right font-mono text-gray-500">{snittTimerPerSalg.toFixed(1)}t</td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-tomtly-gold text-base">{fmt(Math.round(mndInntekt))}</td>
                  <td className="py-3 pl-3" />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* ─── Kategori-oppsummering visuelt ─── */}
        <div className="mb-10">
          <h3 className="text-sm font-bold text-gray-700 mb-4">Inntekt per kategori (vektet snitt per salg)</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {kategorier.map((kat) => {
              const katStreams = streams.filter(s => s.kategori === kat)
              const katInntekt = katStreams.reduce((s, r) => s + r.perSalg * r.rate, 0)
              const katKost = katStreams.reduce((s, r) => s + r.kostPerSalg * r.rate, 0)
              const katNetto = katInntekt - katKost
              const pct = snittInntektPerSalg > 0 ? (katInntekt / snittInntektPerSalg) * 100 : 0
              return (
                <div key={kat} className={`rounded-xl border-2 p-4 ${katFarger[kat]}`}>
                  <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${katTekst[kat]}`}>{kat}</p>
                  <p className="font-mono text-lg font-bold text-gray-800">{fmt(Math.round(katInntekt))} kr</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Netto: {fmt(Math.round(katNetto))} kr</p>
                  <div className="w-full bg-white/50 rounded-full h-1.5 mt-2">
                    <div className={`h-full rounded-full ${katStreams[0]?.color || 'bg-gray-400'}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-1">{pct.toFixed(0)} % av total</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ─── Månedlig P&L komplett ─── */}
        <div className="bg-gradient-to-r from-gray-900 via-tomtly-dark to-gray-900 rounded-2xl p-8 text-white mb-10">
          <h3 className="font-display text-lg font-bold mb-6">Komplett månedlig P&L – {salg} salg/mnd</h3>

          <div className="space-y-2 mb-6">
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-300">Brutto inntekt ({salg} × {fmt(Math.round(snittInntektPerSalg))} kr)</span>
              <span className="font-mono font-bold text-green-400">{fmt(Math.round(mndInntekt))} kr</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-300">Variable kostnader ({salg} × {fmt(Math.round(snittKostnadPerSalg))} kr)</span>
              <span className="font-mono text-red-400">-{fmt(Math.round(snittKostnadPerSalg * salg))} kr</span>
            </div>
            {Object.entries(TOMTLY_FIXED_MONTHLY).map(([key, val]) => (
              <div key={key} className="flex justify-between py-1">
                <span className="text-gray-400 text-sm">{key.replace(/_/g, ' ')}</span>
                <span className="font-mono text-sm text-red-400">-{fmt(val)} kr</span>
              </div>
            ))}
            <div className="flex justify-between py-2 border-b border-white/10">
              <span className="text-gray-300">Sum kostnader</span>
              <span className="font-mono font-bold text-red-400">-{fmt(Math.round(mndKostnad))} kr</span>
            </div>
            <div className="flex justify-between py-3 border-t-2 border-white/20 mt-2">
              <span className="font-bold text-white text-lg">Netto resultat / mnd</span>
              <span className={`font-mono text-2xl font-bold ${mndNetto >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {fmt(Math.round(mndNetto))} kr
              </span>
            </div>
          </div>

          {/* Årlig sammendrag */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-[10px] text-gray-400 uppercase mb-1">Årlig brutto</p>
              <p className="font-mono text-lg font-bold text-white">{fmt(Math.round(aarInntekt))} kr</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-[10px] text-gray-400 uppercase mb-1">Årlig netto</p>
              <p className={`font-mono text-lg font-bold ${aarNetto >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>{fmt(Math.round(aarNetto))} kr</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <p className="text-[10px] text-gray-400 uppercase mb-1">Timer/mnd</p>
              <p className="font-mono text-lg font-bold text-white">{fmt(Math.round(snittTimerPerSalg * salg))}t</p>
              <p className="text-[10px] text-gray-500">{((snittTimerPerSalg * salg) / 160 * 100).toFixed(0)} % av fulltid</p>
            </div>
          </div>
        </div>

        {/* ─── Scenariotabell – full modell ─── */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-4">Scenariotabell – full finansiell modell</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 pr-3 font-semibold text-gray-500 uppercase text-xs">Salg/mnd</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-500 uppercase text-xs">Brutto/mnd</th>
                  <th className="text-right py-3 px-3 font-semibold text-red-400 uppercase text-xs">Kost/mnd</th>
                  <th className="text-right py-3 px-3 font-semibold text-emerald-600 uppercase text-xs">Netto/mnd</th>
                  <th className="text-right py-3 px-3 font-semibold text-emerald-600 uppercase text-xs">Netto/år</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-400 uppercase text-xs">Margin</th>
                  <th className="text-right py-3 px-3 font-semibold text-gray-400 uppercase text-xs">Timer/mnd</th>
                  <th className="text-right py-3 pl-3 font-semibold text-tomtly-gold uppercase text-xs">Partner/mnd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[1, 3, 5, 10, 15, 25, 50, 100].map((s) => {
                  const brutto = snittInntektPerSalg * s
                  const kost = (snittKostnadPerSalg * s) + Object.values(TOMTLY_FIXED_MONTHLY).reduce((a, b) => a + b, 0)
                  const netto = brutto - kost
                  const margin = brutto > 0 ? (netto / brutto) * 100 : 0
                  const timer = snittTimerPerSalg * s
                  const partnerMnd = provisjon * split.partner * s
                  const isCurrent = s === salg

                  return (
                    <tr key={s} className={`transition-colors ${isCurrent ? 'bg-emerald-50 font-bold' : 'hover:bg-gray-50'}`}>
                      <td className="py-3 pr-3 font-mono">{s}{isCurrent ? ' ←' : ''}</td>
                      <td className="py-3 px-3 text-right font-mono">{fmt(Math.round(brutto))}</td>
                      <td className="py-3 px-3 text-right font-mono text-red-400">-{fmt(Math.round(kost))}</td>
                      <td className={`py-3 px-3 text-right font-mono font-bold ${netto >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{fmt(Math.round(netto))}</td>
                      <td className={`py-3 px-3 text-right font-mono font-bold ${netto >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>{fmt(Math.round(netto * 12))}</td>
                      <td className="py-3 px-3 text-right font-mono text-gray-500">{margin.toFixed(0)} %</td>
                      <td className="py-3 px-3 text-right font-mono text-gray-400">{Math.round(timer)}t</td>
                      <td className="py-3 pl-3 text-right font-mono text-tomtly-gold font-bold">{fmt(Math.round(partnerMnd))}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">
            Alle inntektsstrømmer vektet med konverteringsrater. Split: {split.label}. Snitt tomtepris: {fmt(avgPris)} kr. Provisjon: {provisjonPct} %.
          </p>
        </div>
      </div>
    </div>
  )
}
