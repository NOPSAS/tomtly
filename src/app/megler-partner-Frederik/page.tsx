'use client'

import { useState } from 'react'
import { CheckCircle2, TrendingUp, Award } from 'lucide-react'

export default function FrederikPage() {
  const [totalSalg, setTotalSalg] = useState(8)
  const [snittpris, setSnittpris] = useState(3)

  const fmt = (n: number) => n.toLocaleString('nb-NO')

  // === TOMTLY INNTEKT ===

  // 1. Provisjon fra tomtesalg (3 selgere totalt)
  const provPerSalg = snittpris * 1000000 * 0.03
  const provTotal = totalSalg * provPerSalg

  // 2. Fast inntekt (analyser, abo, addons – uavhengig av salg)
  const fastAnalyser = 20 * 4900    // 20 analysepakker
  const fastPremium = 8 * 7500      // 8 premium
  const fastMegler = 10 * 2900      // 10 meglerkunder
  const fastNaering = 2 * 24900     // 2 næringsanalyser
  const fastAddons = 5 * 30000      // 5 addons (tegning, søknad)
  const fastFradeling = 1 * 69000   // 1 fradeling
  const fastEntAbo = Math.round(3 * 14900 / 12)
  const fastHusAbo = 2 * 15000
  const fastBank = 4 * 4900

  const fastTotal = fastAnalyser + fastPremium + fastMegler + fastNaering + fastAddons + fastFradeling + fastEntAbo + fastHusAbo + fastBank

  const tomtlyTotal = provTotal + fastTotal

  // === FREDERIKS DEL ===
  // 20% av provisjon + 20% av fast inntekt
  const frederikProv = Math.round(provTotal * 0.20)
  const frederikFast = Math.round(fastTotal * 0.20)
  const frederikTotal = frederikProv + frederikFast
  const frederikAar = frederikTotal * 12

  // === EIERSKAP ===
  const aarsomsetning = tomtlyTotal * 12

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-tomtly-dark py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Tomtly" className="h-10 mx-auto mb-8 invert" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Frederik – bli med og selg tomter med Tomtly
          </h1>
          <p className="text-lg text-brand-400 max-w-xl mx-auto">
            Vi er 3 som selger. Du får 20% av all provisjon og fast inntekt – pluss 15% eierskap i selskapet.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        {/* Tilbudet */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 shadow-sm mb-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-tomtly-dark rounded-xl p-8 text-center">
              <p className="text-5xl font-bold text-white mb-2">20%</p>
              <p className="text-brand-400">av provisjon + fast inntekt</p>
            </div>
            <div className="bg-tomtly-dark rounded-xl p-8 text-center">
              <p className="text-5xl font-bold text-tomtly-gold mb-2">15%</p>
              <p className="text-brand-400">eierskap i Tomtly AS</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-brand-700">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Vi er 3 selgere. Alle selger tomter under din bevilgning.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Du får 20% av ALL provisjon fra tomtesalg – uansett hvem av oss 3 som selger.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Du får 20% av all fast inntekt (analyser, abonnementer, addons).</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Du får 15% eierskap i Tomtly AS – din andel vokser med selskapet.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Jobb fra hvor som helst. Oppgjør gjøres av Propr.</li>
          </ul>
        </div>

        {/* Kalkulator */}
        <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6 text-center">Hva du tjener</h2>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Totalt tomtesalg/mnd (alle 3 selgere)</label>
              <input type="range" min={1} max={20} value={totalSalg} onChange={(e) => setTotalSalg(Number(e.target.value))} className="w-full accent-tomtly-accent" />
              <p className="text-center text-3xl font-bold text-tomtly-dark mt-1">{totalSalg}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Snitt salgssum (MNOK)</label>
              <input type="range" min={1} max={10} step={0.5} value={snittpris} onChange={(e) => setSnittpris(Number(e.target.value))} className="w-full accent-tomtly-accent" />
              <p className="text-center text-3xl font-bold text-tomtly-dark mt-1">{snittpris} MNOK</p>
            </div>
          </div>

          {/* Tydelig nedbrytning */}
          <div className="space-y-4 mb-8">
            {/* Del 1: Provisjon */}
            <div className="bg-forest-50 rounded-xl p-5 border border-forest-200">
              <h3 className="text-sm font-semibold text-forest-800 mb-3">Del 1: Provisjon fra tomtesalg</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-forest-700">
                  <span>{totalSalg} salg × {snittpris} MNOK × 3% = Tomtly provisjon</span>
                  <span className="font-semibold">{fmt(provTotal)} kr/mnd</span>
                </div>
                <div className="flex justify-between text-tomtly-accent font-bold pt-1 border-t border-forest-300">
                  <span>Din del (20% av {fmt(provTotal)} kr)</span>
                  <span>{fmt(frederikProv)} kr/mnd</span>
                </div>
              </div>
            </div>

            {/* Del 2: Fast inntekt */}
            <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
              <h3 className="text-sm font-semibold text-brand-700 mb-3">Del 2: Fast inntekt (analyser, abo, addons)</h3>
              <div className="space-y-1 text-sm text-brand-600">
                <div className="flex justify-between"><span>Analysepakker (20 × 4 900)</span><span>{fmt(fastAnalyser)} kr</span></div>
                <div className="flex justify-between"><span>Premium (8 × 7 500)</span><span>{fmt(fastPremium)} kr</span></div>
                <div className="flex justify-between"><span>Meglerkunder (10 × 2 900)</span><span>{fmt(fastMegler)} kr</span></div>
                <div className="flex justify-between"><span>Næring (2 × 24 900)</span><span>{fmt(fastNaering)} kr</span></div>
                <div className="flex justify-between"><span>Addons – tegning, søknad (5 × 30k)</span><span>{fmt(fastAddons)} kr</span></div>
                <div className="flex justify-between"><span>Fradeling, abo, bank</span><span>{fmt(fastFradeling + fastEntAbo + fastHusAbo + fastBank)} kr</span></div>
                <div className="flex justify-between font-semibold text-brand-700 pt-1 border-t border-brand-300">
                  <span>Sum fast inntekt</span><span>{fmt(fastTotal)} kr/mnd</span>
                </div>
                <div className="flex justify-between text-tomtly-accent font-bold pt-1 border-t border-brand-300">
                  <span>Din del (20% av {fmt(fastTotal)} kr)</span>
                  <span>{fmt(frederikFast)} kr/mnd</span>
                </div>
              </div>
            </div>

            {/* Sum */}
            <div className="bg-tomtly-dark rounded-xl p-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-brand-400">20% av provisjon</p>
                  <p className="text-xl font-bold text-white">{fmt(frederikProv)} kr</p>
                </div>
                <div>
                  <p className="text-xs text-brand-400">20% av fast inntekt</p>
                  <p className="text-xl font-bold text-white">{fmt(frederikFast)} kr</p>
                </div>
                <div>
                  <p className="text-xs text-tomtly-gold">Din total per måned</p>
                  <p className="text-3xl font-bold text-tomtly-gold">{fmt(frederikTotal)} kr</p>
                </div>
              </div>
              <div className="text-center mt-4 pt-4 border-t border-brand-800">
                <p className="text-brand-400 text-sm">Din årslønn: <span className="text-white font-bold text-xl">{fmt(frederikAar)} kr</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabell: salg → lønn */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Salg → din lønn</h2>
          <p className="text-sm text-brand-500 mb-4">3 selgere totalt. Snitt {snittpris} MNOK per salg. Du får 20% av provisjon + 20% av fast inntekt ({fmt(frederikFast)} kr/mnd).</p>
          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-100 border-b border-brand-200">
                  <th className="text-left py-2 px-4 text-brand-600">Salg/mnd</th>
                  <th className="text-right py-2 px-4 text-brand-600">Din prov. (20%)</th>
                  <th className="text-right py-2 px-4 text-brand-600">+ fast (20%)</th>
                  <th className="text-right py-2 px-4 text-brand-600">Din mnd-lønn</th>
                  <th className="text-right py-2 px-4 text-brand-600">Din årslønn</th>
                </tr>
              </thead>
              <tbody>
                {[2, 4, 6, 8, 10, 15, 20].map((s) => {
                  const prov = s * snittpris * 1000000 * 0.03
                  const dinProv = Math.round(prov * 0.20)
                  const dinFast = frederikFast
                  const dinTot = dinProv + dinFast
                  const hl = s === totalSalg
                  return (
                    <tr key={s} className={`border-b border-brand-100 ${hl ? 'bg-forest-50 font-semibold' : ''}`}>
                      <td className="py-3 px-4">{s} salg</td>
                      <td className="text-right py-3 px-4">{fmt(dinProv)} kr</td>
                      <td className="text-right py-3 px-4 text-brand-500">{fmt(dinFast)} kr</td>
                      <td className="text-right py-3 px-4 text-tomtly-accent">{fmt(dinTot)} kr</td>
                      <td className="text-right py-3 px-4 font-bold">{fmt(dinTot * 12)} kr</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Eierskapsverdi */}
        <div className="bg-white rounded-2xl border-2 border-tomtly-gold p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-tomtly-gold" />
            <h2 className="font-display text-xl font-bold text-tomtly-dark">Dine 15% eierskap – hva er det verdt?</h2>
          </div>
          <p className="text-sm text-brand-600 mb-6">
            Selskaper verdsettes typisk 3-5x årsomsetning. Eierskapet er i tillegg til lønnen – det er langsiktig verdi.
          </p>
          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-100 border-b border-brand-200">
                  <th className="text-left py-2 px-4 text-brand-600">Scenario</th>
                  <th className="text-right py-2 px-4 text-brand-600">Årsomsetning</th>
                  <th className="text-right py-2 px-4 text-brand-600">Selskapsverdi (4x)</th>
                  <th className="text-right py-2 px-4 text-brand-600">Dine 15%</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: `I dag (${totalSalg} salg/mnd)`, salg: totalSalg },
                  { label: 'Vekst (15 salg/mnd)', salg: 15 },
                  { label: 'Skalert (30 salg/mnd)', salg: 30 },
                ].map((sc) => {
                  const prov = sc.salg * snittpris * 1000000 * 0.03
                  const tot = (prov + fastTotal) * 12
                  const verdi = tot * 4
                  const dinAndel = Math.round(verdi * 0.15)
                  return (
                    <tr key={sc.label} className="border-b border-brand-100">
                      <td className="py-3 px-4 font-medium">{sc.label}</td>
                      <td className="text-right py-3 px-4">{fmt(tot)} kr</td>
                      <td className="text-right py-3 px-4">{fmt(verdi)} kr</td>
                      <td className="text-right py-3 px-4 font-bold text-tomtly-gold">{fmt(dinAndel)} kr</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-500">I tillegg til månedlig lønn. Ved salg av selskapet eller utbytte realiseres denne verdien.</p>
        </div>

        {/* Det du slipper/får */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-3">Det du slipper</h3>
              <ul className="space-y-2">
                {['Ingen visninger', 'Ingen helgearbeid', 'Ingen oppgjør (Propr)', 'Ingen salgsoppgaver', 'Jobb fra hvor som helst'].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-600"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-3">Det du får</h3>
              <ul className="space-y-2">
                {['20% av all provisjon og fast inntekt', '15% eierskap i Tomtly AS', '3 selgere under din bevilgning', 'Frihet og fleksibilitet', 'Gründeroppside – ikke bare en jobb'].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-600"><TrendingUp className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-tomtly-dark rounded-2xl p-10 text-center mb-16">
          <h2 className="font-display text-2xl font-bold text-white mb-4">La oss snakke om det</h2>
          <p className="text-brand-400 mb-6">Ring eller send en melding.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+4740603908" className="px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors">Ring Jakob – 40603908</a>
            <a href="mailto:hey@nops.no?subject=Tomtly%20partner" className="px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">Send e-post</a>
          </div>
        </div>
      </div>
    </div>
  )
}
