'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, TrendingUp, CheckCircle2, Clock, Home, DollarSign, BarChart3 } from 'lucide-react'

// ============================================================
// MEGLER-PARTNER: Lønnsmodell og incentivstruktur
// For rekruttering av eiendomsmegler til Tomtly
// ============================================================

export default function MeglerPartnerPage() {
  const [antallAnalyser, setAntallAnalyser] = useState(30)
  const [synlighetAndel, setSynlighetAndel] = useState(60) // % som velger synlighet
  const [premiumAndel, setPremiumAndel] = useState(20) // % som velger premium
  const [snittNaering, setSnittNaering] = useState(3)
  const [meglerProvisjon, setMeglerProvisjon] = useState(25) // % av Tomtly-inntekt

  // Beregninger
  const analyserPure = Math.round(antallAnalyser * (1 - synlighetAndel / 100 - premiumAndel / 100))
  const analyserSynlighet = Math.round(antallAnalyser * synlighetAndel / 100)
  const analyserPremium = Math.round(antallAnalyser * premiumAndel / 100)

  const inntektAnalyse = analyserPure * 4900
  const inntektSynlighet = analyserSynlighet * 9900
  const inntektPremium = analyserPremium * 14900
  const inntektNaering = snittNaering * 24900 // snitt næring+synlighet
  const inntektMeglere = Math.round(antallAnalyser * 0.3) * 2900 // 30% kommer via meglere
  const inntektAddons = Math.round(antallAnalyser * 0.15) * 50000 // 15% kjøper addons
  const inntektEntreprenor = 3 * 14900 / 12 // 3 entreprenør-abo
  const inntektHuslev = 2 * 15000 // 2 husleverandør-abo
  const inntektBank = Math.round(antallAnalyser * 0.08) * 4900 // 8% bruker finansiering

  const totalMndInntekt = inntektAnalyse + inntektSynlighet + inntektPremium + inntektNaering + inntektMeglere + inntektAddons + inntektEntreprenor + inntektHuslev + inntektBank

  const meglerAndel = Math.round(totalMndInntekt * meglerProvisjon / 100)
  const meglerFastlonn = 45000
  const meglerTotal = meglerFastlonn + meglerAndel
  const meglerAarlig = meglerTotal * 12

  const tomtlyNetto = totalMndInntekt - meglerTotal
  const tomtlyKostnad = antallAnalyser * 4000 // ca 4 timer × 1000 kr per analyse
  const tomtlyFortjeneste = tomtlyNetto - tomtlyKostnad

  const fmt = (n: number) => n.toLocaleString('nb-NO')

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-tomtly-dark text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-brand-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="font-display text-lg font-bold">Megler-partner: Lønnsmodell</h1>
          </div>
          <span className="text-xs text-brand-400">Kun for intern bruk</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Pitch til megler */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-8 h-8 text-tomtly-accent" />
            <div>
              <h2 className="font-display text-2xl font-bold text-tomtly-dark">Hvorfor bli med i Tomtly?</h2>
              <p className="text-brand-500">Pitch til erfaren eiendomsmegler</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-4">Det du slipper:</h3>
              <ul className="space-y-3">
                {[
                  'Ingen visninger – kjøpere kontakter selger direkte',
                  'Ingen helgearbeid – analyser lages på kontoret',
                  'Ingen budrunder å administrere',
                  'Ingen salgsoppgaver å skrive',
                  'Ingen oppgjørsprosess',
                  'Ingen klagefare fra kjøper/selger',
                  'Ingen forsikringskrav som megler',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-4">Det du får:</h3>
              <ul className="space-y-3">
                {[
                  'Fast grunnlønn + resultatbasert bonus',
                  'Mållønn 1 000 000 kr/år',
                  'Kontortid – ikke kvelds- og helgearbeid',
                  'Bruk av meglererfaring uten meglerjobben',
                  'Eierandel/opsjoner på sikt (diskuteres)',
                  'Bygge noe nytt fra starten av',
                  'Fleksibilitet og frihet',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                    <TrendingUp className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-forest-50 rounded-xl p-6 mt-8 border border-forest-200">
            <h3 className="font-semibold text-tomtly-dark mb-2">Hva rollen innebærer:</h3>
            <p className="text-sm text-brand-700 leading-relaxed">
              Du bruker meglerkompetansen din til å <strong>selge Tomtly-analyser</strong> – ikke eiendommer.
              Du kontakter tomteeiere, meglere og utviklere. Du forklarer verdien av profesjonell tomteanalyse.
              Du bygger relasjoner med meglerkontorer, ferdighusleverandører og kommuner.
              Du driver inntektene – og tjener en andel av alt du genererer.
              Ingen budrunder, ingen visninger, ingen helger. Ren B2B- og B2C-salg fra kontoret.
            </p>
          </div>
        </div>

        {/* Lønnsmodell */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Lønnsmodell</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-brand-50 rounded-xl p-6 text-center border border-brand-200">
              <p className="text-xs text-brand-500 mb-1">Grunnlønn</p>
              <p className="text-3xl font-bold text-tomtly-dark">45 000</p>
              <p className="text-xs text-brand-500">kr/mnd (540 000 kr/år)</p>
            </div>
            <div className="bg-forest-50 rounded-xl p-6 text-center border border-forest-200">
              <p className="text-xs text-forest-600 mb-1">Resultatbonus</p>
              <p className="text-3xl font-bold text-tomtly-accent">{meglerProvisjon}%</p>
              <p className="text-xs text-forest-600">av Tomtlys månedlige inntekt</p>
            </div>
            <div className="bg-tomtly-dark rounded-xl p-6 text-center">
              <p className="text-xs text-brand-400 mb-1">Mållønn (OTE)</p>
              <p className="text-3xl font-bold text-white">1 000 000+</p>
              <p className="text-xs text-brand-400">kr/år ved måloppnåelse</p>
            </div>
          </div>

          <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
            <p className="text-sm text-brand-700">
              <strong>Slik fungerer det:</strong> Grunnlønn på 45 000 kr/mnd gir trygghet.
              I tillegg får du {meglerProvisjon}% av all inntekt Tomtly genererer den måneden.
              Når Tomtly tjener {fmt(Math.round((1000000 / 12 - 45000) / (meglerProvisjon / 100)))} kr/mnd,
              når du 1 MNOK i årslønn. Det tilsvarer ca. {antallAnalyser} analyser/mnd med dagens produktmiks.
            </p>
          </div>
        </div>

        {/* Scenario-kalkulator */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Scenario-kalkulator</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-xs text-brand-500 mb-1">Analyser/mnd</label>
              <input type="number" value={antallAnalyser} onChange={(e) => setAntallAnalyser(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">% Synlighet (9 900)</label>
              <input type="number" value={synlighetAndel} onChange={(e) => setSynlighetAndel(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">% Premium (14 900)</label>
              <input type="number" value={premiumAndel} onChange={(e) => setPremiumAndel(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">Provisjonsandel %</label>
              <input type="number" value={meglerProvisjon} onChange={(e) => setMeglerProvisjon(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
          </div>

          {/* Inntektsfordeling */}
          <h3 className="font-semibold text-brand-700 mb-3">Månedlig inntektsfordeling</h3>
          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-200 bg-brand-100">
                  <th className="text-left py-2 px-4 text-brand-600">Kilde</th>
                  <th className="text-right py-2 px-4 text-brand-600">Antall</th>
                  <th className="text-right py-2 px-4 text-brand-600">Inntekt</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-100"><td className="py-2 px-4">Analyse (4 900 kr)</td><td className="text-right py-2 px-4">{analyserPure}</td><td className="text-right py-2 px-4 font-semibold">{fmt(inntektAnalyse)} kr</td></tr>
                <tr className="border-b border-brand-100"><td className="py-2 px-4">Analyse + Synlighet (9 900 kr)</td><td className="text-right py-2 px-4">{analyserSynlighet}</td><td className="text-right py-2 px-4 font-semibold">{fmt(inntektSynlighet)} kr</td></tr>
                <tr className="border-b border-brand-100"><td className="py-2 px-4">Premium Synlighet (14 900 kr)</td><td className="text-right py-2 px-4">{analyserPremium}</td><td className="text-right py-2 px-4 font-semibold">{fmt(inntektPremium)} kr</td></tr>
                <tr className="border-b border-brand-100"><td className="py-2 px-4">Næringstomter (snitt 24 900 kr)</td><td className="text-right py-2 px-4">{snittNaering}</td><td className="text-right py-2 px-4 font-semibold">{fmt(inntektNaering)} kr</td></tr>
                <tr className="border-b border-brand-100"><td className="py-2 px-4">Via meglere (2 900 kr)</td><td className="text-right py-2 px-4">{Math.round(antallAnalyser * 0.3)}</td><td className="text-right py-2 px-4 font-semibold">{fmt(inntektMeglere)} kr</td></tr>
                <tr className="border-b border-brand-100"><td className="py-2 px-4">Addons (tegning, søknad ~50k)</td><td className="text-right py-2 px-4">{Math.round(antallAnalyser * 0.15)}</td><td className="text-right py-2 px-4 font-semibold">{fmt(inntektAddons)} kr</td></tr>
                <tr className="border-b border-brand-100"><td className="py-2 px-4">Entreprenør-abo (14 900/år)</td><td className="text-right py-2 px-4">3</td><td className="text-right py-2 px-4 font-semibold">{fmt(Math.round(inntektEntreprenor))} kr</td></tr>
                <tr className="border-b border-brand-100"><td className="py-2 px-4">Husleverandør-abo (snitt 15k/mnd)</td><td className="text-right py-2 px-4">2</td><td className="text-right py-2 px-4 font-semibold">{fmt(inntektHuslev)} kr</td></tr>
                <tr className="border-b border-brand-100"><td className="py-2 px-4">Bank lead-fee (4 900 kr)</td><td className="text-right py-2 px-4">{Math.round(antallAnalyser * 0.08)}</td><td className="text-right py-2 px-4 font-semibold">{fmt(inntektBank)} kr</td></tr>
              </tbody>
              <tfoot>
                <tr className="bg-tomtly-dark text-white">
                  <td className="py-3 px-4 font-semibold" colSpan={2}>Total månedsinntekt Tomtly</td>
                  <td className="text-right py-3 px-4 font-bold text-lg">{fmt(totalMndInntekt)} kr</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Fordeling Tomtly vs Megler */}
          <h3 className="font-semibold text-brand-700 mb-3">Fordeling: Tomtly vs. Megler-partner</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
              <h4 className="font-semibold text-forest-800 mb-4">Megler-partner</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-forest-700">Grunnlønn</span><span className="font-semibold">{fmt(meglerFastlonn)} kr/mnd</span></div>
                <div className="flex justify-between text-sm"><span className="text-forest-700">Resultatbonus ({meglerProvisjon}% av {fmt(totalMndInntekt)})</span><span className="font-semibold">{fmt(meglerAndel)} kr/mnd</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-forest-300"><span className="font-semibold text-forest-800">Total per måned</span><span className="font-bold text-lg text-tomtly-accent">{fmt(meglerTotal)} kr</span></div>
                <div className="flex justify-between text-sm"><span className="text-forest-700">Årslønn</span><span className="font-bold text-tomtly-dark">{fmt(meglerAarlig)} kr</span></div>
              </div>
            </div>

            <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
              <h4 className="font-semibold text-tomtly-dark mb-4">Tomtly (selskapet)</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-brand-600">Inntekt</span><span className="font-semibold">{fmt(totalMndInntekt)} kr/mnd</span></div>
                <div className="flex justify-between text-sm"><span className="text-brand-600">– Megler-partner lønn</span><span className="text-red-500">-{fmt(meglerTotal)} kr</span></div>
                <div className="flex justify-between text-sm"><span className="text-brand-600">– Produksjonskostnad (~{antallAnalyser} × 4 000 kr)</span><span className="text-red-500">-{fmt(tomtlyKostnad)} kr</span></div>
                <div className="flex justify-between text-sm pt-2 border-t border-brand-300"><span className="font-semibold text-tomtly-dark">Tomtly netto per måned</span><span className="font-bold text-lg">{fmt(tomtlyFortjeneste)} kr</span></div>
                <div className="flex justify-between text-sm"><span className="text-brand-600">Tomtly netto per år</span><span className="font-bold text-tomtly-dark">{fmt(tomtlyFortjeneste * 12)} kr</span></div>
              </div>
            </div>
          </div>

          {/* Visuell bar */}
          <div className="mb-6">
            <p className="text-xs text-brand-500 mb-2">Inntektsfordeling</p>
            <div className="flex rounded-lg overflow-hidden h-8">
              <div className="bg-tomtly-accent flex items-center justify-center text-white text-xs font-semibold" style={{ width: `${Math.max(5, (meglerTotal / totalMndInntekt) * 100)}%` }}>
                Megler {Math.round((meglerTotal / totalMndInntekt) * 100)}%
              </div>
              <div className="bg-brand-300 flex items-center justify-center text-white text-xs font-semibold" style={{ width: `${Math.max(5, (tomtlyKostnad / totalMndInntekt) * 100)}%` }}>
                Prod {Math.round((tomtlyKostnad / totalMndInntekt) * 100)}%
              </div>
              <div className="bg-tomtly-gold flex items-center justify-center text-tomtly-dark text-xs font-semibold" style={{ width: `${Math.max(5, (tomtlyFortjeneste / totalMndInntekt) * 100)}%` }}>
                Tomtly {Math.round((tomtlyFortjeneste / totalMndInntekt) * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Vei til 1 MNOK årslønn</h2>
          <div className="space-y-4">
            {[
              { mnd: 'Måned 1-2', analyser: 10, lonn: fmt(45000 + Math.round(10 * 9000 * 0.6 * meglerProvisjon / 100)), desc: 'Oppstart, lære produkt, kontakte første kunder' },
              { mnd: 'Måned 3-4', analyser: 20, lonn: fmt(45000 + Math.round(20 * 9000 * 0.7 * meglerProvisjon / 100)), desc: 'Pipeline bygges, første meglerkontakter, gjentagende kunder' },
              { mnd: 'Måned 5-6', analyser: 30, lonn: fmt(45000 + Math.round(30 * 9000 * 0.75 * meglerProvisjon / 100)), desc: 'Fullt tempo, meglere og utviklere kjøper jevnlig' },
              { mnd: 'Måned 7-12', analyser: 40, lonn: fmt(45000 + Math.round(40 * 9500 * 0.8 * meglerProvisjon / 100)), desc: 'Skalering, næringstomter, entrepren.abo, huslev.abo' },
            ].map((m) => (
              <div key={m.mnd} className="flex items-center gap-4 bg-brand-50 rounded-xl p-4 border border-brand-200">
                <div className="w-24 flex-shrink-0">
                  <p className="text-xs font-semibold text-tomtly-accent">{m.mnd}</p>
                  <p className="text-lg font-bold text-tomtly-dark">{m.analyser}/mnd</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-brand-600">{m.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-brand-500">Månedslønn</p>
                  <p className="font-bold text-tomtly-dark">{m.lonn} kr</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sammenligning med tradisjonell megling */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Tomtly vs. tradisjonell megling</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-200">
                  <th className="text-left py-3 px-4 text-brand-500"></th>
                  <th className="text-left py-3 px-4 text-brand-500">Tradisjonell megler</th>
                  <th className="text-left py-3 px-4 text-tomtly-accent font-bold">Tomtly</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Arbeidstid', 'Kvelder, helger, visninger', 'Kontortid, mandag-fredag'],
                  ['Visninger', '3-10 per tomt', 'Ingen – kjøper kontakter selger'],
                  ['Budrunder', 'Håndterer bud og forhandling', 'Ikke involvert'],
                  ['Oppgjør', 'Ansvar for oppgjørsprosess', 'Ikke involvert'],
                  ['Forsikring', 'Meglerforskring påkrevd', 'Ikke nødvendig'],
                  ['Klagerisiko', 'Reklamasjonsnemnd', 'Minimal – vi analyserer, ikke selger'],
                  ['Inntekt per "salg"', '50-100k provisjon, men kun 10-15 salg/år', '4 900-14 900 per analyse, 30+ per mnd'],
                  ['Volum', '10-15 eiendommer/år', '30-40 analyser/mnd'],
                  ['Stress', 'Høyt – deadline, kvelder, press', 'Lavt – kontorbasert salg'],
                  ['Skalerbarhet', 'Begrenset av timer i døgnet', 'Ubegrenset – analyse lages av team'],
                ].map(([kategori, trad, tomtly]) => (
                  <tr key={kategori} className="border-b border-brand-100">
                    <td className="py-3 px-4 font-medium text-brand-700">{kategori}</td>
                    <td className="py-3 px-4 text-brand-500">{trad}</td>
                    <td className="py-3 px-4 text-tomtly-dark font-medium">{tomtly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
