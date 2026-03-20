'use client'

import { useState } from 'react'
import { CheckCircle2, TrendingUp, Award, ArrowRight } from 'lucide-react'

export default function FrederikPage() {
  const [tab, setTab] = useState<'tilbud' | 'konsept'>('konsept')
  const [totalSalg, setTotalSalg] = useState(8)
  const [snittpris, setSnittpris] = useState(3)

  const fmt = (n: number) => n.toLocaleString('nb-NO')

  // Provisjon
  const provPerSalg = snittpris * 1000000 * 0.025
  const provTotal = totalSalg * provPerSalg

  // Fast inntekt
  const fastAnalyser = 20 * 4990
  const fastMeglerPremium = 8 * 4900
  const fastNaering = 2 * 24900
  const fastFradeling = 1 * 69000
  const fastEntAbo = Math.round(3 * 14900 / 12)
  const fastHusAbo = 2 * 15000
  const fastBank = 4 * 4900
  const fastPropr = totalSalg * 2000
  const fastProjFin = 2 * 9900
  const fastFotograf = Math.round(totalSalg / 2) * 1000

  const fastTotal = fastAnalyser + fastMeglerPremium + fastNaering + fastFradeling + fastEntAbo + fastHusAbo + fastBank + fastPropr + fastProjFin + fastFotograf
  const tomtlyTotal = provTotal + fastTotal

  const frederikProv = Math.round(provTotal * 0.20)
  const frederikFast = Math.round(fastTotal * 0.10)
  const frederikTotal = frederikProv + frederikFast
  const frederikAar = frederikTotal * 12

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
            Vi er 3 som selger. Du får 20% av provisjon, 10% av fast inntekt og 10% eierskap.
          </p>
        </div>
      </div>

      {/* Tab-bar */}
      <div className="bg-white border-b border-brand-200 sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 flex gap-1">
          <button onClick={() => setTab('konsept')} className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'konsept' ? 'border-tomtly-accent text-tomtly-accent' : 'border-transparent text-brand-500'}`}>
            Konseptet
          </button>
          <button onClick={() => setTab('tilbud')} className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${tab === 'tilbud' ? 'border-tomtly-accent text-tomtly-accent' : 'border-transparent text-brand-500'}`}>
            Ditt tilbud & tall
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* ===================== FANE: KONSEPTET ===================== */}
        {tab === 'konsept' && (
          <div className="space-y-8">
            {/* Kort forklaring */}
            <div className="bg-white rounded-2xl border border-brand-200 p-8">
              <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-4">Hva er Tomtly?</h2>
              <p className="text-brand-600 leading-relaxed mb-6">
                Tomtly gjør tomter enklere å selge. Vi lager profesjonelle mulighetsstudier som viser kjøpere nøyaktig hva de kan bygge – med husmodeller, byggekalkyle og visualiseringer. Så selger vi tomten via vår megler.
              </p>
              <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
                <p className="text-sm text-forest-800 font-semibold mb-2">Kort oppsummert:</p>
                <p className="text-sm text-forest-700">Tomteeier betaler 4 990 kr. Vi lager analyse. Vi selger tomten. Vi tar 2,5% ved salg. Alle vinner.</p>
              </div>
            </div>

            {/* Visuell flyt – 4 steg */}
            <div className="bg-white rounded-2xl border border-brand-200 p-8">
              <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Slik fungerer det</h2>
              <div className="space-y-4">
                {[
                  { nr: '1', tittel: 'Tomteeier kontakter oss', desc: 'Eller vi kontakter dem (vi scraper FINN daglig for tomter som ikke selger).', ikon: '📍' },
                  { nr: '2', tittel: 'Vi lager analyse', desc: 'Mulighetsstudie med husmodeller, kalkyle og visualiseringer. Kunden betaler 4 990 kr.', ikon: '📐' },
                  { nr: '3', tittel: 'Vi selger tomten', desc: 'Publisering, markedsføring, salgsoppgaver, kundekontakt. Du og de andre selgerne håndterer dette.', ikon: '🤝' },
                  { nr: '4', tittel: 'Tomten selges', desc: 'Tomtly tar 2,5% provisjon. Oppgjør via Propr. Alle er fornøyde.', ikon: '✅' },
                ].map((s) => (
                  <div key={s.nr} className="flex items-start gap-4 bg-brand-50 rounded-xl p-5 border border-brand-200">
                    <div className="text-3xl">{s.ikon}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-7 h-7 bg-tomtly-accent text-white rounded-full text-sm flex items-center justify-center font-bold">{s.nr}</span>
                        <h3 className="font-semibold text-tomtly-dark">{s.tittel}</h3>
                      </div>
                      <p className="text-sm text-brand-600">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hvor pengene kommer fra */}
            <div className="bg-white rounded-2xl border border-brand-200 p-8">
              <h2 className="font-display text-xl font-bold text-tomtly-dark mb-2">Hvor pengene kommer fra</h2>
              <p className="text-sm text-brand-500 mb-6">Tomtly tjener penger fra åtte kilder – på én tomt:</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                  { kilde: 'Tomtanalyse', belop: '4 990 kr', farge: 'bg-tomtly-accent', tekst: 'text-white' },
                  { kilde: 'Provisjon 2,5%', belop: '75 000 kr', farge: 'bg-forest-600', tekst: 'text-white' },
                  { kilde: 'Huslev.-abo', belop: '~3 000 kr', farge: 'bg-blue-500', tekst: 'text-white' },
                  { kilde: 'Entreprenør-abo', belop: '~2 000 kr', farge: 'bg-amber-500', tekst: 'text-white' },
                  { kilde: 'Bank lead-fee', belop: '4 900 kr', farge: 'bg-purple-500', tekst: 'text-white' },
                  { kilde: 'Propr-fee', belop: '2 000 kr', farge: 'bg-brand-600', tekst: 'text-white' },
                  { kilde: 'Prosjektfin.', belop: '~5 000 kr', farge: 'bg-red-500', tekst: 'text-white' },
                  { kilde: 'Fotograf', belop: '1 000 kr', farge: 'bg-pink-500', tekst: 'text-white' },
                ].map((p) => (
                  <div key={p.kilde} className={`${p.farge} rounded-lg p-3 text-center`}>
                    <p className={`${p.tekst} text-xs opacity-80`}>{p.kilde}</p>
                    <p className={`${p.tekst} font-bold`}>{p.belop}</p>
                  </div>
                ))}
              </div>

              <div className="bg-tomtly-dark rounded-xl p-5 text-center">
                <p className="text-xs text-brand-400">Per tomt (snitt 3 MNOK)</p>
                <p className="text-3xl font-bold text-tomtly-gold">~100 000 kr</p>
                <p className="text-xs text-brand-400 mt-1">Arbeidsinnsats: 10-15 timer</p>
              </div>
            </div>

            {/* Hvorfor det slår tradisjonell megler */}
            <div className="bg-white rounded-2xl border border-brand-200 p-8">
              <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Hvorfor Tomtly slår tradisjonell megling</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 rounded-xl p-5 border border-red-200 opacity-70">
                  <h3 className="font-semibold text-red-700 mb-3">Tradisjonell megler</h3>
                  <ul className="space-y-2 text-sm text-red-600">
                    <li>• Tar 1,7-3,5% provisjon</li>
                    <li>• Pluss 18-20k i markedspakke</li>
                    <li>• Pluss 15-20k i tilrettelegging</li>
                    <li>• Pluss visningshonorar, oppgjør etc.</li>
                    <li>• <strong>Total: ~100 000 kr for en 3M-tomt</strong></li>
                    <li>• Kunden får: bilde av gress på FINN</li>
                    <li>• Megleren tjener: kun provisjon</li>
                  </ul>
                </div>
                <div className="bg-forest-50 rounded-xl p-5 border-2 border-tomtly-accent">
                  <h3 className="font-semibold text-tomtly-dark mb-3">Tomtly</h3>
                  <ul className="space-y-2 text-sm text-brand-700">
                    <li>• 4 990 kr + 2,5% provisjon</li>
                    <li>• Oppgjør via Propr (9 990 kr)</li>
                    <li>• <strong>Total: ~91 000 kr for en 3M-tomt</strong></li>
                    <li>• Kunden får: profesjonell mulighetsstudie</li>
                    <li>• Tomtly tjener: <strong>8 inntektsstrømmer</strong></li>
                    <li>• Billigere for kunden, mer inntekt for oss</li>
                    <li>• Ingen visninger, ingen helger</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Din rolle */}
            <div className="bg-white rounded-2xl border border-brand-200 p-8">
              <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Din rolle i dette</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-brand-50 rounded-xl p-5 text-center border border-brand-200">
                  <p className="text-3xl mb-2">👔</p>
                  <h3 className="font-semibold text-tomtly-dark mb-1">Fagansvarlig megler</h3>
                  <p className="text-xs text-brand-500">Din bevilgning gjør at vi kan selge lovlig. Alle 3 selgere jobber under deg.</p>
                </div>
                <div className="bg-brand-50 rounded-xl p-5 text-center border border-brand-200">
                  <p className="text-3xl mb-2">📞</p>
                  <h3 className="font-semibold text-tomtly-dark mb-1">Aktiv selger</h3>
                  <p className="text-xs text-brand-500">Salgsoppgaver, kundekontakt, oppfølging. Du bruker meglerskillsene dine – uten helger og visninger.</p>
                </div>
                <div className="bg-brand-50 rounded-xl p-5 text-center border border-brand-200">
                  <p className="text-3xl mb-2">🚀</p>
                  <h3 className="font-semibold text-tomtly-dark mb-1">Medeier</h3>
                  <p className="text-xs text-brand-500">10% eierskap. Du bygger verdi for deg selv – ikke bare lønn til noen andre.</p>
                </div>
              </div>
            </div>

            {/* CTA til tall-fanen */}
            <div className="text-center">
              <button onClick={() => setTab('tilbud')} className="inline-flex items-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors">
                Se hva du kan tjene <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* ===================== FANE: TILBUD & TALL ===================== */}
        {tab === 'tilbud' && (
          <div className="space-y-8">
            {/* Tilbudet */}
            <div className="bg-white rounded-2xl border border-brand-200 p-8">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-tomtly-dark rounded-xl p-8 text-center">
                  <p className="text-5xl font-bold text-white mb-2">20%</p>
                  <p className="text-brand-400">av provisjon, 10% av fast inntekt</p>
                </div>
                <div className="bg-tomtly-dark rounded-xl p-8 text-center">
                  <p className="text-5xl font-bold text-tomtly-gold mb-2">10%</p>
                  <p className="text-brand-400">eierskap i Tomtly AS</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-brand-700">
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Vi er totalt 3 selgere (du inkludert). Alle selger under din bevilgning.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Du jobber aktivt med salg – salgsoppgaver og kundekontakt.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Du får 20% av all provisjon – uansett hvem av oss som selger.</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Du får 10% av all øvrig inntekt (analyser, abo, partnere).</li>
                <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />10% eierskap i Tomtly AS. Jobb fra hvor som helst.</li>
              </ul>
            </div>

            {/* Kalkulator */}
            <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-8">
              <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6 text-center">Hva du tjener</h2>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">Tomtesalg/mnd (alle 3 selgere)</label>
                  <input type="range" min={1} max={20} value={totalSalg} onChange={(e) => setTotalSalg(Number(e.target.value))} className="w-full accent-tomtly-accent" />
                  <p className="text-center text-3xl font-bold text-tomtly-dark mt-1">{totalSalg}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-700 mb-1">Snitt salgssum (MNOK)</label>
                  <input type="range" min={1} max={10} step={0.5} value={snittpris} onChange={(e) => setSnittpris(Number(e.target.value))} className="w-full accent-tomtly-accent" />
                  <p className="text-center text-3xl font-bold text-tomtly-dark mt-1">{snittpris} MNOK</p>
                </div>
              </div>

              {/* Inntekt 1: Provisjon */}
              <div className="bg-forest-50 rounded-xl p-6 border border-forest-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-forest-800">Fra tomtesalg</h3>
                  <span className="px-3 py-1 bg-forest-200 text-forest-800 text-xs font-bold rounded-full">Du får 20%</span>
                </div>
                <div className="bg-white rounded-lg p-4 mb-3">
                  <div className="flex justify-between text-sm text-forest-700 mb-1">
                    <span>Tomt selges for {snittpris} MNOK → Tomtly får {fmt(provPerSalg)} kr</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-tomtly-accent">
                    <span>Din andel per salg (20%)</span><span>{fmt(Math.round(provPerSalg * 0.20))} kr</span>
                  </div>
                </div>
                <div className="flex justify-between font-bold text-forest-800">
                  <span>{totalSalg} salg/mnd →</span><span className="text-xl text-tomtly-accent">{fmt(frederikProv)} kr/mnd</span>
                </div>
              </div>

              {/* Inntekt 2: Fast */}
              <div className="bg-brand-50 rounded-xl p-6 border border-brand-200 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-brand-700">Fra øvrige inntekter</h3>
                  <span className="px-3 py-1 bg-brand-200 text-brand-700 text-xs font-bold rounded-full">Du får 10%</span>
                </div>
                <div className="bg-white rounded-lg p-4 space-y-1.5 text-sm text-brand-600">
                  <div className="flex justify-between"><span>Tomtanalyser (20 stk)</span><span>{fmt(fastAnalyser)} kr</span></div>
                  <div className="flex justify-between"><span>Megler Premium (8 stk)</span><span>{fmt(fastMeglerPremium)} kr</span></div>
                  <div className="flex justify-between"><span>Næringsanalyser</span><span>{fmt(fastNaering)} kr</span></div>
                  <div className="flex justify-between"><span>Fradeling</span><span>{fmt(fastFradeling)} kr</span></div>
                  <div className="flex justify-between"><span>Abo (entreprenør + huslev.)</span><span>{fmt(fastEntAbo + fastHusAbo)} kr</span></div>
                  <div className="flex justify-between"><span>Bank, Propr, prosjektfin., foto</span><span>{fmt(fastBank + fastPropr + fastProjFin + fastFotograf)} kr</span></div>
                  <div className="flex justify-between font-semibold text-brand-700 pt-2 border-t border-brand-200"><span>Sum</span><span>{fmt(fastTotal)} kr/mnd</span></div>
                </div>
                <div className="flex justify-between font-bold text-brand-700 mt-3 pt-3 border-t border-brand-200">
                  <span>Din andel (10%) →</span><span className="text-xl text-tomtly-accent">{fmt(frederikFast)} kr/mnd</span>
                </div>
              </div>

              {/* Total */}
              <div className="bg-tomtly-dark rounded-xl p-8">
                <div className="grid grid-cols-3 gap-4 items-end text-center">
                  <div><p className="text-xs text-brand-400">Provisjon</p><p className="text-2xl font-bold text-white">{fmt(frederikProv)}</p></div>
                  <div><p className="text-xs text-brand-400">Øvrig</p><p className="text-2xl font-bold text-white">{fmt(frederikFast)}</p></div>
                  <div className="bg-white/10 rounded-xl p-3"><p className="text-xs text-tomtly-gold">Per måned</p><p className="text-3xl font-bold text-tomtly-gold">{fmt(frederikTotal)}</p><p className="text-xs text-brand-400 mt-1">= {fmt(frederikAar)} kr/år</p></div>
                </div>
              </div>
            </div>

            {/* Tabell */}
            <div className="bg-white rounded-2xl border border-brand-200 p-8">
              <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Salg → din lønn</h2>
              <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="bg-brand-100 border-b border-brand-200">
                    <th className="text-left py-2 px-4 text-brand-600">Salg/mnd</th>
                    <th className="text-right py-2 px-4 text-brand-600">Provisjon (20%)</th>
                    <th className="text-right py-2 px-4 text-brand-600">Øvrig (10%)</th>
                    <th className="text-right py-2 px-4 text-brand-600">Mnd-lønn</th>
                    <th className="text-right py-2 px-4 text-brand-600">Årslønn</th>
                  </tr></thead>
                  <tbody>
                    {[2, 4, 6, 8, 10, 15, 20].map((s) => {
                      const dp = Math.round(s * snittpris * 1000000 * 0.025 * 0.20)
                      const df = frederikFast
                      const dt = dp + df
                      return (
                        <tr key={s} className={`border-b border-brand-100 ${s === totalSalg ? 'bg-forest-50 font-semibold' : ''}`}>
                          <td className="py-2.5 px-4">{s}</td>
                          <td className="text-right py-2.5 px-4">{fmt(dp)} kr</td>
                          <td className="text-right py-2.5 px-4 text-brand-500">{fmt(df)} kr</td>
                          <td className="text-right py-2.5 px-4 text-tomtly-accent">{fmt(dt)} kr</td>
                          <td className="text-right py-2.5 px-4 font-bold">{fmt(dt * 12)} kr</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Eierskap */}
            <div className="bg-white rounded-2xl border-2 border-tomtly-gold p-8">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8 text-tomtly-gold" />
                <h2 className="font-display text-xl font-bold text-tomtly-dark">Dine 10% eierskap</h2>
              </div>
              <p className="text-sm text-brand-500 mb-4">Selskaper verdsettes 3-5x årsomsetning. I tillegg til lønnen:</p>
              <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden">
                <table className="w-full text-sm">
                  <thead><tr className="bg-brand-100 border-b border-brand-200">
                    <th className="text-left py-2 px-4 text-brand-600">Scenario</th>
                    <th className="text-right py-2 px-4 text-brand-600">Årsomsetning</th>
                    <th className="text-right py-2 px-4 text-brand-600">Verdi (4x)</th>
                    <th className="text-right py-2 px-4 text-brand-600">Dine 10%</th>
                  </tr></thead>
                  <tbody>
                    {[
                      { label: `Nå (${totalSalg} salg/mnd)`, s: totalSalg },
                      { label: 'Vekst (15/mnd)', s: 15 },
                      { label: 'Skalert (30/mnd)', s: 30 },
                    ].map((sc) => {
                      const t = (sc.s * snittpris * 1000000 * 0.025 + fastTotal) * 12
                      return (
                        <tr key={sc.label} className="border-b border-brand-100">
                          <td className="py-2.5 px-4">{sc.label}</td>
                          <td className="text-right py-2.5 px-4">{fmt(t)} kr</td>
                          <td className="text-right py-2.5 px-4">{fmt(t * 4)} kr</td>
                          <td className="text-right py-2.5 px-4 font-bold text-tomtly-gold">{fmt(Math.round(t * 4 * 0.10))} kr</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hva du slipper/får */}
            <div className="bg-white rounded-2xl border border-brand-200 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-tomtly-dark mb-3">Det du slipper</h3>
                  <ul className="space-y-2">
                    {['Ingen visninger på kveld/helg', 'Ingen oppgjør (Propr gjør det)', 'Analyse lages av teamet', 'Jobb fra hvor som helst', 'Slipper markedsmateriell'].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brand-600"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{i}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-tomtly-dark mb-3">Det du får</h3>
                  <ul className="space-y-2">
                    {['20% provisjon + 10% fast inntekt', '10% eierskap i Tomtly AS', '1 av 3 selgere under din bevilgning', 'Salg og kundekontakt – din styrke', 'Gründeroppside som medeier'].map((i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-brand-600"><TrendingUp className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />{i}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA – alltid synlig */}
        <div className="bg-tomtly-dark rounded-2xl p-10 text-center mt-8 mb-16">
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
