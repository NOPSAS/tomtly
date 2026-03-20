'use client'

import { useState } from 'react'
import { CheckCircle2, TrendingUp, Award } from 'lucide-react'

export default function FrederikPage() {
  const [salg, setSalg] = useState(8) // 3 selgere × snitt
  const [snittpris, setSnittpris] = useState(3)

  const fmt = (n: number) => n.toLocaleString('nb-NO')

  // === INNTEKTER ===
  // Provisjon (3% av salg)
  const provPerSalg = snittpris * 1000000 * 0.03
  const provTotal = salg * provPerSalg

  // Analyse fastpris (kunder som ikke velger 3%-modellen)
  const analyserFast = 20
  const inntektAnalyse = analyserFast * 4900
  const premiumFast = 8
  const inntektPremium = premiumFast * 7500

  // Meglerkunder
  const meglerKunder = 10
  const inntektMegler = meglerKunder * 2900

  // Næring
  const naering = 2
  const inntektNaering = naering * 24900

  // Addons (tegning, søknad)
  const addons = 5
  const inntektAddons = addons * 30000

  // Entreprenør-abo
  const entAbo = 3
  const inntektEnt = Math.round(entAbo * 14900 / 12)

  // Husleverandør-abo
  const husAbo = 2
  const inntektHus = husAbo * 15000

  // Bank lead-fee
  const bankLeads = 4
  const inntektBank = bankLeads * 4900

  // Fradeling
  const fradelinger = 1
  const inntektFradeling = fradelinger * 69000

  const totalMnd = provTotal + inntektAnalyse + inntektPremium + inntektMegler + inntektNaering + inntektAddons + inntektEnt + inntektHus + inntektBank + inntektFradeling

  // Frederiks del
  const frederikMnd = Math.round(totalMnd * 0.20)
  const frederikAar = frederikMnd * 12
  const tomtlyMnd = totalMnd - frederikMnd

  // Selskapsverdier (multiplier på årsomsetning)
  const aarsomsetning = totalMnd * 12
  const verdi3x = aarsomsetning * 3
  const verdi5x = aarsomsetning * 5
  const frederikEierVerdi3x = Math.round(verdi3x * 0.15)
  const frederikEierVerdi5x = Math.round(verdi5x * 0.15)

  const inntektsposter = [
    { kilde: `Tomtesalg – 3% provisjon (${salg} salg × ${snittpris} MNOK)`, belop: provTotal, highlight: true },
    { kilde: `Analysepakker (${analyserFast} × 4 900 kr)`, belop: inntektAnalyse },
    { kilde: `Premium-analyser (${premiumFast} × 7 500 kr)`, belop: inntektPremium },
    { kilde: `Meglerkunder (${meglerKunder} × 2 900 kr)`, belop: inntektMegler },
    { kilde: `Næringstomter (${naering} × 24 900 kr)`, belop: inntektNaering },
    { kilde: `Addons – tegning, søknad (${addons} × 30k)`, belop: inntektAddons },
    { kilde: `Fradeling (${fradelinger} × 69 000 kr)`, belop: inntektFradeling },
    { kilde: `Entreprenør-abo (${entAbo} stk)`, belop: inntektEnt },
    { kilde: `Husleverandør-abo (${husAbo} stk)`, belop: inntektHus },
    { kilde: `Bank lead-fee (${bankLeads} × 4 900 kr)`, belop: inntektBank },
  ]

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Hero */}
      <div className="bg-tomtly-dark py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Tomtly" className="h-10 mx-auto mb-8 invert" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Frederik – bli med og selg tomter med Tomtly
          </h1>
          <p className="text-lg text-brand-400 max-w-xl mx-auto">
            Vi er 3 som selger tomter under din bevilgning. Du får 20% av alt vi tjener – og 15% eierskap i selskapet.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">

        {/* Tilbudet */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 shadow-sm mb-8">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-tomtly-dark rounded-xl p-8 text-center">
              <p className="text-5xl font-bold text-white mb-2">20%</p>
              <p className="text-brand-400">av all Tomtly-inntekt</p>
            </div>
            <div className="bg-tomtly-dark rounded-xl p-8 text-center">
              <p className="text-5xl font-bold text-tomtly-gold mb-2">15%</p>
              <p className="text-brand-400">eierskap i Tomtly AS</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-brand-700">
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Vi er 3 selgere som jobber under din meglerbevilgning</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Du får 20% av ALL inntekt – provisjon, analyser, abonnementer, alt</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Jobb fra hvor som helst – kontor, hjemme, hytta</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Oppgjør gjøres av Propr – du slipper oppgjørsprosessen</li>
          </ul>
        </div>

        {/* Salg-slider */}
        <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6 text-center">Hva du tjener</h2>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Tomtesalg per måned (3 selgere totalt)</label>
              <input type="range" min={2} max={20} value={salg} onChange={(e) => setSalg(Number(e.target.value))} className="w-full accent-tomtly-accent" />
              <p className="text-center text-3xl font-bold text-tomtly-dark mt-1">{salg}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Snitt salgssum (MNOK)</label>
              <input type="range" min={1} max={10} step={0.5} value={snittpris} onChange={(e) => setSnittpris(Number(e.target.value))} className="w-full accent-tomtly-accent" />
              <p className="text-center text-3xl font-bold text-tomtly-dark mt-1">{snittpris} MNOK</p>
            </div>
          </div>

          {/* Resultat */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-forest-50 rounded-xl p-6 text-center border border-forest-200">
              <p className="text-xs text-forest-600 mb-1">Din månedslønn</p>
              <p className="text-4xl font-bold text-tomtly-accent">{fmt(frederikMnd)}</p>
              <p className="text-sm text-forest-700 mt-1">kr/mnd</p>
            </div>
            <div className="bg-tomtly-dark rounded-xl p-6 text-center">
              <p className="text-xs text-brand-400 mb-1">Din årslønn</p>
              <p className="text-4xl font-bold text-tomtly-gold">{fmt(frederikAar)}</p>
              <p className="text-sm text-brand-400 mt-1">kr/år</p>
            </div>
          </div>
        </div>

        {/* KOMPLETT INNTEKTSBEREGNING */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-2">Komplett inntektsberegning</h2>
          <p className="text-sm text-brand-500 mb-6">Alle Tomtlys inntektskilder – og din del av hver enkelt.</p>

          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-100 border-b border-brand-200">
                  <th className="text-left py-2 px-4 text-brand-600">Inntektskilde</th>
                  <th className="text-right py-2 px-4 text-brand-600">Tomtly</th>
                  <th className="text-right py-2 px-4 text-brand-600">Din del (20%)</th>
                </tr>
              </thead>
              <tbody>
                {inntektsposter.map((p) => (
                  <tr key={p.kilde} className={`border-b border-brand-100 ${p.highlight ? 'bg-forest-50' : ''}`}>
                    <td className={`py-2 px-4 ${p.highlight ? 'font-semibold' : ''}`}>{p.kilde}</td>
                    <td className="text-right py-2 px-4">{fmt(p.belop)} kr</td>
                    <td className="text-right py-2 px-4 text-tomtly-accent font-semibold">{fmt(Math.round(p.belop * 0.20))} kr</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-tomtly-dark text-white">
                  <td className="py-3 px-4 font-semibold">Totalt per måned</td>
                  <td className="text-right py-3 px-4 font-bold">{fmt(totalMnd)} kr</td>
                  <td className="text-right py-3 px-4 font-bold text-tomtly-gold text-lg">{fmt(frederikMnd)} kr</td>
                </tr>
                <tr className="bg-tomtly-dark text-white border-t border-brand-800">
                  <td className="py-2 px-4 text-brand-400">Totalt per år</td>
                  <td className="text-right py-2 px-4 text-brand-300">{fmt(totalMnd * 12)} kr</td>
                  <td className="text-right py-2 px-4 font-bold text-tomtly-gold">{fmt(frederikAar)} kr</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Visuell bar */}
          <div>
            <p className="text-xs text-brand-500 mb-2">Fordeling</p>
            <div className="flex rounded-lg overflow-hidden h-10">
              <div className="bg-tomtly-accent flex items-center justify-center text-white text-xs font-semibold" style={{ width: '20%' }}>
                Din del 20%
              </div>
              <div className="bg-tomtly-gold flex items-center justify-center text-tomtly-dark text-xs font-semibold" style={{ width: '80%' }}>
                Tomtly 80%
              </div>
            </div>
          </div>
        </div>

        {/* EIERSKAPSVERDI */}
        <div className="bg-white rounded-2xl border-2 border-tomtly-gold p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-8 h-8 text-tomtly-gold" />
            <h2 className="font-display text-xl font-bold text-tomtly-dark">Verdien av 15% eierskap</h2>
          </div>
          <p className="text-sm text-brand-600 mb-6">
            Tech/SaaS-selskaper verdsettes typisk til 3-5x årsomsetning. Her er hva dine 15% kan være verdt:
          </p>

          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-100 border-b border-brand-200">
                  <th className="text-left py-2 px-4 text-brand-600">Scenario</th>
                  <th className="text-right py-2 px-4 text-brand-600">Årsomsetning</th>
                  <th className="text-right py-2 px-4 text-brand-600">Selskapsverdi</th>
                  <th className="text-right py-2 px-4 text-brand-600">Dine 15%</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-100">
                  <td className="py-3 px-4">Nå (med {salg} salg/mnd)</td>
                  <td className="text-right py-3 px-4">{fmt(aarsomsetning)} kr</td>
                  <td className="text-right py-3 px-4">{fmt(verdi3x)} kr (3x)</td>
                  <td className="text-right py-3 px-4 font-bold text-tomtly-gold">{fmt(frederikEierVerdi3x)} kr</td>
                </tr>
                <tr className="border-b border-brand-100 bg-forest-50">
                  <td className="py-3 px-4 font-semibold">Vekst (15 salg/mnd)</td>
                  <td className="text-right py-3 px-4">{fmt((15 * snittpris * 1000000 * 0.03 + 500000) * 12)} kr</td>
                  <td className="text-right py-3 px-4">{fmt((15 * snittpris * 1000000 * 0.03 + 500000) * 12 * 4)} kr</td>
                  <td className="text-right py-3 px-4 font-bold text-tomtly-gold">{fmt(Math.round((15 * snittpris * 1000000 * 0.03 + 500000) * 12 * 4 * 0.15))} kr</td>
                </tr>
                <tr className="border-b border-brand-100">
                  <td className="py-3 px-4 font-semibold">Skalert (30 salg/mnd)</td>
                  <td className="text-right py-3 px-4">{fmt((30 * snittpris * 1000000 * 0.03 + 1000000) * 12)} kr</td>
                  <td className="text-right py-3 px-4">{fmt((30 * snittpris * 1000000 * 0.03 + 1000000) * 12 * 5)} kr</td>
                  <td className="text-right py-3 px-4 font-bold text-tomtly-gold text-lg">{fmt(Math.round((30 * snittpris * 1000000 * 0.03 + 1000000) * 12 * 5 * 0.15))} kr</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>I tillegg til lønn.</strong> Eierskapet er en langsiktig verdi som vokser med selskapet. Ved et eventuelt salg av Tomtly, eller ved utbytte, er dine 15% verdt millioner. Dette er gründeroppside – ikke bare en jobb.
            </p>
          </div>
        </div>

        {/* Salg → lønn tabell */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Hvor mange salg → hvilken lønn?</h2>
          <p className="text-sm text-brand-500 mb-4">3 selgere jobber under din bevilgning. Du får 20% av alt.</p>
          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-100 border-b border-brand-200">
                  <th className="text-left py-2 px-4 text-brand-600">Salg/mnd</th>
                  <th className="text-right py-2 px-4 text-brand-600">Tomtly total</th>
                  <th className="text-right py-2 px-4 text-brand-600">Din mnd-lønn</th>
                  <th className="text-right py-2 px-4 text-brand-600">Din årslønn</th>
                  <th className="text-right py-2 px-4 text-brand-600">Eierskap verdt</th>
                </tr>
              </thead>
              <tbody>
                {[3, 5, 8, 10, 15, 20].map((s) => {
                  const prov = s * snittpris * 1000000 * 0.03
                  const fast = 300000
                  const tot = prov + fast
                  const din = Math.round(tot * 0.20)
                  const aar = din * 12
                  const eierskap = Math.round(tot * 12 * 4 * 0.15)
                  const hl = s === salg
                  return (
                    <tr key={s} className={`border-b border-brand-100 ${hl ? 'bg-forest-50 font-semibold' : ''}`}>
                      <td className="py-3 px-4">{s} salg</td>
                      <td className="text-right py-3 px-4">{fmt(tot)} kr/mnd</td>
                      <td className="text-right py-3 px-4 text-tomtly-accent">{fmt(din)} kr</td>
                      <td className="text-right py-3 px-4 font-bold">{fmt(aar)} kr</td>
                      <td className="text-right py-3 px-4 text-tomtly-gold">{fmt(eierskap)} kr</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hva du slipper/får */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-3">Det du slipper</h3>
              <ul className="space-y-2">
                {['Ingen visninger', 'Ingen helgearbeid', 'Ingen oppgjørsprosess (Propr)', 'Ingen salgsoppgaver', 'Jobb fra hvor som helst', 'Ingen kontortid-krav'].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-600"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-3">Det du får</h3>
              <ul className="space-y-2">
                {['20% av all inntekt', '15% eierskap i Tomtly AS', '3 selgere under din bevilgning', 'Frihet til å jobbe hvor som helst', 'Bygge noe eget som gründer', 'Millionverdi i eierskap over tid'].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-600"><TrendingUp className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-tomtly-dark rounded-2xl p-10 text-center mb-16">
          <h2 className="font-display text-2xl font-bold text-white mb-4">La oss snakke om det</h2>
          <p className="text-brand-400 mb-6">Ring eller send en melding. Vi tar en kaffe og ser på tallene sammen.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+4740603908" className="px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors">Ring Jakob – 40603908</a>
            <a href="mailto:hey@nops.no?subject=Tomtly%20megler-partner" className="px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">Send e-post</a>
          </div>
        </div>
      </div>
    </div>
  )
}
