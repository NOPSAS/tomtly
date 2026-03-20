'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, TrendingUp, CheckCircle2, Home, Award } from 'lucide-react'

export default function MeglerPartnerPage() {
  const [antallAnalyser, setAntallAnalyser] = useState(30)
  const [synlighetAndel, setSynlighetAndel] = useState(60)
  const [premiumAndel, setPremiumAndel] = useState(20)
  const [snittNaering, setSnittNaering] = useState(3)
  const [partnerAndel, setPartnerAndel] = useState(20)

  const analyserPure = Math.round(antallAnalyser * (1 - synlighetAndel / 100 - premiumAndel / 100))
  const analyserSynlighet = Math.round(antallAnalyser * synlighetAndel / 100)
  const analyserPremium = Math.round(antallAnalyser * premiumAndel / 100)

  const inntektAnalyse = analyserPure * 4990
  const inntektSynlighet = analyserSynlighet * 50000  // 2,5 % provisjon snitt
  const inntektPremium = analyserPremium * 4900  // Megler Premium
  const inntektNaering = snittNaering * 24900
  const inntektMeglere = 0  // Megler Standard er gratis
  const inntektAddons = 0 // Via Konsepthus, ikke Tomtly
  const inntektEntreprenor = Math.round(3 * 14900 / 12)
  const inntektHuslev = 2 * 15000
  const inntektBank = Math.round(antallAnalyser * 0.08) * 4900

  const totalMndInntekt = inntektAnalyse + inntektSynlighet + inntektPremium + inntektNaering + inntektMeglere + inntektAddons + inntektEntreprenor + inntektHuslev + inntektBank

  const partnerMnd = Math.round(totalMndInntekt * partnerAndel / 100)
  const partnerAar = partnerMnd * 12

  const tomtlyKostnad = antallAnalyser * 4000
  const tomtlyNetto = totalMndInntekt - partnerMnd - tomtlyKostnad

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

        {/* Tilbudet */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-8 h-8 text-tomtly-accent" />
            <div>
              <h2 className="font-display text-2xl font-bold text-tomtly-dark">Bli med på reisen – som megler og salgssjef i Tomtly</h2>
              <p className="text-brand-500">Tilbud til erfaren eiendomsmegler</p>
            </div>
          </div>

          <div className="bg-tomtly-dark rounded-xl p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm text-brand-400 mb-2">Din andel av Tomtlys inntekt</p>
                <p className="text-5xl font-bold text-white mb-1">{partnerAndel}%</p>
                <p className="text-brand-400">av all inntekt Tomtly genererer</p>
              </div>
              <div>
                <p className="text-sm text-brand-400 mb-2">Eierskap i Tomtly AS</p>
                <p className="text-5xl font-bold text-tomtly-gold mb-1">10%</p>
                <p className="text-brand-400">aksjer i selskapet</p>
              </div>
            </div>
          </div>

          <div className="bg-forest-50 rounded-xl p-6 border border-forest-200 mb-8">
            <h3 className="font-semibold text-forest-800 mb-3">Modellen i korte trekk:</h3>
            <ul className="space-y-2 text-sm text-forest-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />Ingen fast grunnlønn i startfasen – ren inntektsandel</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />Du får 20% av all inntekt Tomtly genererer – fra dag 1</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />Du får 10% eierskap i Tomtly AS – du bygger din egen verdi</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />Oppgjør på eiendommer gjøres via Propr – vi slipper meglerforetak-krav</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />Vi er billigere enn tradisjonelle meglere fordi oppgjør er outsourcet til Propr</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-forest-600 flex-shrink-0 mt-0.5" />Din rolle: selge analyser, bygge kunderelasjoner, skaffe partnere</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-4">Det du slipper:</h3>
              <ul className="space-y-2">
                {[
                  'Ingen visninger – kjøpere kontakter selger direkte',
                  'Ingen helgearbeid – kontortid, mandag-fredag',
                  'Ingen budrunder å administrere',
                  'Ingen oppgjørsprosess (Propr gjør det)',
                  'Ingen meglerforetak-ansvar',
                  'Ingen forsikringskrav som megler',
                  'Ingen klagerisiko – vi analyserer, ikke selger',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-4">Det du får:</h3>
              <ul className="space-y-2">
                {[
                  '20% av all inntekt Tomtly genererer',
                  '10% eierskap i Tomtly AS',
                  'Bygge noe eget fra starten',
                  'Bruke meglererfaring uten meglerjobben',
                  'Ubegrenset oppsidepotensial',
                  'Fleksibilitet og frihet',
                  'Eierandel som vokser i verdi med selskapet',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                    <TrendingUp className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Scenario-kalkulator */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Hva kan du tjene?</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-xs text-brand-500 mb-1">Analyser/mnd</label>
              <input type="number" value={antallAnalyser} onChange={(e) => setAntallAnalyser(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">% som selger (2,5 % prov.)</label>
              <input type="number" value={synlighetAndel} onChange={(e) => setSynlighetAndel(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">% Megler Premium (4 900)</label>
              <input type="number" value={premiumAndel} onChange={(e) => setPremiumAndel(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">Din andel (%)</label>
              <input type="number" value={partnerAndel} onChange={(e) => setPartnerAndel(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
          </div>

          {/* Inntektstabell */}
          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-200 bg-brand-100">
                  <th className="text-left py-2 px-4 text-brand-600">Kilde</th>
                  <th className="text-right py-2 px-4 text-brand-600">Antall</th>
                  <th className="text-right py-2 px-4 text-brand-600">Tomtly inntekt</th>
                  <th className="text-right py-2 px-4 text-brand-600">Din andel ({partnerAndel}%)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { kilde: 'Tomteeier fastpris (4 990 kr)', antall: analyserPure, inntekt: inntektAnalyse },
                  { kilde: 'Provisjon 2,5 % (snitt 50 000 kr)', antall: analyserSynlighet, inntekt: inntektSynlighet },
                  { kilde: 'Megler Premium (4 900 kr)', antall: analyserPremium, inntekt: inntektPremium },
                  { kilde: 'Næringstomter (snitt 24 900 kr)', antall: snittNaering, inntekt: inntektNaering },
                  { kilde: 'Megler Standard (gratis)', antall: Math.round(antallAnalyser * 0.3), inntekt: inntektMeglere },
                  { kilde: 'Tegning/søknad (via Konsepthus – 0 kr)', antall: Math.round(antallAnalyser * 0.10), inntekt: inntektAddons },
                  { kilde: 'Entreprenør-abo', antall: 3, inntekt: inntektEntreprenor },
                  { kilde: 'Husleverandør-abo', antall: 2, inntekt: inntektHuslev },
                  { kilde: 'Bank lead-fee', antall: Math.round(antallAnalyser * 0.08), inntekt: inntektBank },
                ].map((r) => (
                  <tr key={r.kilde} className="border-b border-brand-100">
                    <td className="py-2 px-4">{r.kilde}</td>
                    <td className="text-right py-2 px-4">{r.antall}</td>
                    <td className="text-right py-2 px-4">{fmt(r.inntekt)} kr</td>
                    <td className="text-right py-2 px-4 font-semibold text-tomtly-accent">{fmt(Math.round(r.inntekt * partnerAndel / 100))} kr</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-tomtly-dark text-white">
                  <td className="py-3 px-4 font-semibold" colSpan={2}>Totalt per måned</td>
                  <td className="text-right py-3 px-4 font-bold">{fmt(totalMndInntekt)} kr</td>
                  <td className="text-right py-3 px-4 font-bold text-tomtly-gold text-lg">{fmt(partnerMnd)} kr</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Resultat-kort */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-forest-50 rounded-xl p-6 border border-forest-200 text-center">
              <p className="text-xs text-forest-600 mb-1">Din månedslønn</p>
              <p className="text-3xl font-bold text-tomtly-accent">{fmt(partnerMnd)} kr</p>
            </div>
            <div className="bg-tomtly-dark rounded-xl p-6 text-center">
              <p className="text-xs text-brand-400 mb-1">Din årslønn</p>
              <p className="text-3xl font-bold text-tomtly-gold">{fmt(partnerAar)} kr</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-6 border border-brand-200 text-center">
              <p className="text-xs text-brand-500 mb-1">+ 10% eierskap i Tomtly AS</p>
              <p className="text-3xl font-bold text-tomtly-dark">
                <Award className="w-8 h-8 text-tomtly-gold mx-auto" />
              </p>
              <p className="text-xs text-brand-500 mt-1">Vokser i verdi med selskapet</p>
            </div>
          </div>

          {/* Fordeling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
              <h4 className="font-semibold text-forest-800 mb-3">Din del</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-forest-700">{partnerAndel}% av {fmt(totalMndInntekt)} kr</span><span className="font-bold">{fmt(partnerMnd)} kr/mnd</span></div>
                <div className="flex justify-between"><span className="text-forest-700">Årslønn</span><span className="font-bold">{fmt(partnerAar)} kr</span></div>
                <div className="flex justify-between pt-2 border-t border-forest-300"><span className="text-forest-700">+ 10% eierskap i Tomtly AS</span><span className="font-bold text-tomtly-gold">Uvurderlig</span></div>
              </div>
            </div>
            <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
              <h4 className="font-semibold text-tomtly-dark mb-3">Tomtlys del</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-brand-600">Inntekt</span><span className="font-semibold">{fmt(totalMndInntekt)} kr/mnd</span></div>
                <div className="flex justify-between"><span className="text-brand-600">– Din andel ({partnerAndel}%)</span><span className="text-red-500">-{fmt(partnerMnd)} kr</span></div>
                <div className="flex justify-between"><span className="text-brand-600">– Produksjonskost ({antallAnalyser} × 4k)</span><span className="text-red-500">-{fmt(tomtlyKostnad)} kr</span></div>
                <div className="flex justify-between pt-2 border-t border-brand-300"><span className="font-semibold">Tomtly netto</span><span className="font-bold">{fmt(tomtlyNetto)} kr/mnd</span></div>
                <div className="flex justify-between"><span className="text-brand-600">Annualisert</span><span className="font-bold">{fmt(tomtlyNetto * 12)} kr/år</span></div>
              </div>
            </div>
          </div>

          {/* Bar */}
          <div className="mb-4">
            <p className="text-xs text-brand-500 mb-2">Inntektsfordeling</p>
            <div className="flex rounded-lg overflow-hidden h-10">
              <div className="bg-tomtly-accent flex items-center justify-center text-white text-xs font-semibold px-2" style={{ width: `${Math.max(8, (partnerMnd / totalMndInntekt) * 100)}%` }}>
                Partner {Math.round((partnerMnd / totalMndInntekt) * 100)}%
              </div>
              <div className="bg-brand-300 flex items-center justify-center text-white text-xs font-semibold px-2" style={{ width: `${Math.max(8, (tomtlyKostnad / totalMndInntekt) * 100)}%` }}>
                Prod. {Math.round((tomtlyKostnad / totalMndInntekt) * 100)}%
              </div>
              <div className="bg-tomtly-gold flex items-center justify-center text-tomtly-dark text-xs font-semibold px-2" style={{ width: `${Math.max(8, Math.max(0, tomtlyNetto) / totalMndInntekt * 100)}%` }}>
                Tomtly {Math.round(Math.max(0, tomtlyNetto) / totalMndInntekt * 100)}%
              </div>
            </div>
          </div>
        </div>

        {/* Oppskalering */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Vei til 1 MNOK+</h2>
          <div className="space-y-4">
            {[
              { mnd: 'Måned 1-2', analyser: 10, desc: 'Oppstart, lære produkt, kontakte første kunder via FINN-leads og nettverk' },
              { mnd: 'Måned 3-4', analyser: 20, desc: 'Pipeline bygges, meglerkontakter, gjentagende kunder' },
              { mnd: 'Måned 5-6', analyser: 30, desc: 'Fullt tempo, næring, entreprenør-abo, husleverandør-abo kommer inn' },
              { mnd: 'Måned 7-12', analyser: 40, desc: 'Skalering, kommuner, partneravtaler, stabil inntektsstrøm' },
            ].map((m) => {
              const estInntekt = m.analyser * 9000 * 0.7
              const dinAndel = Math.round(estInntekt * partnerAndel / 100)
              return (
                <div key={m.mnd} className="flex items-center gap-4 bg-brand-50 rounded-xl p-4 border border-brand-200">
                  <div className="w-28 flex-shrink-0">
                    <p className="text-xs font-semibold text-tomtly-accent">{m.mnd}</p>
                    <p className="text-lg font-bold text-tomtly-dark">{m.analyser}/mnd</p>
                  </div>
                  <div className="flex-1"><p className="text-sm text-brand-600">{m.desc}</p></div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-brand-500">Din andel/mnd</p>
                    <p className="font-bold text-tomtly-accent">{fmt(dinAndel)} kr</p>
                    <p className="text-xs text-brand-400">{fmt(dinAndel * 12)} kr/år</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Propr-forklaringen */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Hvorfor Propr + Tomtly fungerer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
              <h3 className="font-semibold text-brand-700 mb-2">Tradisjonell megler</h3>
              <ul className="space-y-1 text-sm text-brand-600">
                <li>• Provisjon: 1-3,6% av salgssum</li>
                <li>• Typisk tomt 3 MNOK → 36 000–108 000 kr</li>
                <li>• Inkluderer: visning, bud, oppgjør, alt</li>
                <li>• Megler gjør ALT selv</li>
              </ul>
            </div>
            <div className="bg-forest-50 rounded-xl p-5 border border-forest-200">
              <h3 className="font-semibold text-forest-700 mb-2">Tomtly + Propr</h3>
              <ul className="space-y-1 text-sm text-forest-700">
                <li>• Tomtly: 4 990 kr fastpris + 2,5 % provisjon</li>
                <li>• Propr: Oppgjør = 9 990 kr</li>
                <li>• Tomt 2 MNOK: 4 990 + 50 000 + 9 990 = 64 980 kr</li>
                <li>• <strong>Konkurransedyktig pris, bedre presentasjon</strong></li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-brand-600 mt-4">
            Selger sparer 10 000–80 000 kr sammenlignet med tradisjonell megler. Tomtly leverer bedre analyse og presentasjon enn noen megler. Propr håndterer det juridiske oppgjøret trygt. Alle vinner.
          </p>
        </div>

        {/* Sammenligning */}
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
                  ['Visninger', '3-10 per eiendom', 'Ingen – kjøper kontakter selger'],
                  ['Budrunder', 'Håndterer bud og forhandling', 'Vår megler håndterer salget'],
                  ['Oppgjør', 'Ansvar for oppgjørsprosess', 'Outsourcet til Propr (9 990 kr)'],
                  ['Forsikring', 'Meglerforskring påkrevd', 'Ikke nødvendig'],
                  ['Klagerisiko', 'Reklamasjonsnemnd', 'Minimal – profesjonell prosess'],
                  ['Inntektsmodell', '1-3,6% provisjon, 10-15 salg/år', '4 990 kr + 2,5 % provisjon, 30+ per mnd'],
                  ['Din lønn', '500-800k (ansatt), usikkert (selvstendig)', '20% av inntekt + 10% eierskap'],
                  ['Stress', 'Høyt – deadline, kvelder, press', 'Lavt – kontorbasert, B2B-salg'],
                  ['Oppside', 'Lineært – flere timer = mer penger', 'Eksponentielt – eierskap vokser'],
                ].map(([kat, trad, tomtly]) => (
                  <tr key={kat} className="border-b border-brand-100">
                    <td className="py-3 px-4 font-medium text-brand-700">{kat}</td>
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
