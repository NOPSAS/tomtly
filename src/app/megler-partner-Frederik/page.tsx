'use client'

import { useState } from 'react'
import { CheckCircle2, TrendingUp, Award, Users, Home, ArrowRight } from 'lucide-react'

export default function FrederikPage() {
  const [antallSalg, setAntallSalg] = useState(5)
  const [snittSalgssum, setSnittSalgssum] = useState(3000000)
  const [antallAnalyser, setAntallAnalyser] = useState(15)
  const [antallPremium, setAntallPremium] = useState(5)

  const provisjon = 0.03
  const partnerAndel = 0.20

  // Inntekter
  const inntektProvisjon = antallSalg * snittSalgssum * provisjon
  const inntektAnalyser = antallAnalyser * 4900
  const inntektPremium = antallPremium * 7500
  const inntektAndre = 30000 // meglere, abo, bank etc

  const totalMnd = inntektProvisjon + inntektAnalyser + inntektPremium + inntektAndre

  const frederikMnd = Math.round(totalMnd * partnerAndel)
  const frederikAar = frederikMnd * 12
  const tomtlyMnd = totalMnd - frederikMnd
  const prodKostnad = (antallSalg + antallAnalyser + antallPremium) * 4000
  const tomtlyNetto = tomtlyMnd - prodKostnad

  const fmt = (n: number) => n.toLocaleString('nb-NO')

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Hero */}
      <div className="bg-tomtly-dark py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="Tomtly" className="h-10 mx-auto mb-8 invert" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Frederik – bli med og bygg Tomtly
          </h1>
          <p className="text-lg text-brand-400 max-w-xl mx-auto">
            Vi trenger en erfaren megler som partner. Med deg på laget kan Tomtly ta provisjon av salg – og da endrer alt seg.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">

        {/* Tilbudet */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 shadow-sm mb-8">
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-6">Tilbudet</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-tomtly-dark rounded-xl p-8 text-center">
              <p className="text-sm text-brand-400 mb-2">Din andel av inntektene</p>
              <p className="text-6xl font-bold text-white mb-1">20%</p>
              <p className="text-brand-400">av all Tomtly-inntekt</p>
            </div>
            <div className="bg-tomtly-dark rounded-xl p-8 text-center">
              <p className="text-sm text-brand-400 mb-2">Eierskap i Tomtly AS</p>
              <p className="text-6xl font-bold text-tomtly-gold mb-1">15%</p>
              <p className="text-brand-400">aksjer i selskapet</p>
            </div>
          </div>

          <div className="bg-forest-50 rounded-xl p-6 border border-forest-200">
            <h3 className="font-semibold text-forest-800 mb-3">Hvorfor deg?</h3>
            <p className="text-sm text-forest-700 leading-relaxed mb-4">
              Tomtly er en analyse- og markedsføringsplattform for tomter. Vi lager profesjonelle mulighetsstudier med husmodeller og byggekalkyle. Men uten en autorisert megler på laget kan vi ikke ta provisjon av salg.
            </p>
            <p className="text-sm text-forest-700 leading-relaxed font-semibold">
              Med deg som megler i Tomtly kan vi tilby kunder at vi håndterer hele prosessen – og ta 3% av salgssummen. Det er der de store pengene ligger.
            </p>
          </div>
        </div>

        {/* Prismodellen */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Slik tjener Tomtly penger</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
              <p className="text-sm font-medium text-brand-500 mb-1">Analysepakke</p>
              <p className="text-3xl font-bold text-tomtly-dark">4 900 kr</p>
              <p className="text-xs text-brand-500 mt-1">Fastpris. Mulighetsstudie, husmodeller, kalkyle.</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
              <p className="text-sm font-medium text-brand-500 mb-1">Premium analyse</p>
              <p className="text-3xl font-bold text-tomtly-dark">7 500 kr</p>
              <p className="text-xs text-brand-500 mt-1">Utvidet analyse + publisering på Tomtly.</p>
            </div>
            <div className="bg-forest-50 rounded-xl p-5 border-2 border-tomtly-accent">
              <p className="text-sm font-medium text-tomtly-accent mb-1">Vi selger for deg</p>
              <p className="text-3xl font-bold text-tomtly-dark">3%</p>
              <p className="text-xs text-brand-600 mt-1">Gratis analyse. Vi gjør alt. 3% av salgssum. Oppgjør via Propr.</p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-xl p-5 border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Nøkkelen:</strong> Med 3%-modellen koster analysen kunden ingenting. Vi tar risikoen. Men en tomt til 3 MNOK gir 90 000 kr i provisjon. Det er {fmt(90000 * 12 / antallSalg)} kr/år med bare {antallSalg} salg i måneden.
            </p>
          </div>
        </div>

        {/* Regnestykke */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-2">Hva kan du tjene?</h2>
          <p className="text-sm text-brand-500 mb-6">Juster tallene og se hva som er realistisk.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div>
              <label className="block text-xs text-brand-500 mb-1">Salg/mnd (3% modell)</label>
              <input type="number" value={antallSalg} onChange={(e) => setAntallSalg(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">Snitt salgssum</label>
              <input type="number" value={snittSalgssum} onChange={(e) => setSnittSalgssum(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">Analyser/mnd (4 900)</label>
              <input type="number" value={antallAnalyser} onChange={(e) => setAntallAnalyser(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs text-brand-500 mb-1">Premium/mnd (7 500)</label>
              <input type="number" value={antallPremium} onChange={(e) => setAntallPremium(Number(e.target.value))} className="w-full px-3 py-2 border border-brand-200 rounded-lg text-sm" />
            </div>
          </div>

          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-brand-200 bg-brand-100"><th className="text-left py-2 px-4 text-brand-600">Kilde</th><th className="text-right py-2 px-4 text-brand-600">Tomtly inntekt</th><th className="text-right py-2 px-4 text-brand-600">Din andel (20%)</th></tr></thead>
              <tbody>
                <tr className="border-b border-brand-100 bg-forest-50">
                  <td className="py-3 px-4 font-medium">Provisjon 3% ({antallSalg} salg × {fmt(snittSalgssum)} kr)</td>
                  <td className="text-right py-3 px-4 font-bold">{fmt(inntektProvisjon)} kr</td>
                  <td className="text-right py-3 px-4 font-bold text-tomtly-accent">{fmt(Math.round(inntektProvisjon * partnerAndel))} kr</td>
                </tr>
                <tr className="border-b border-brand-100">
                  <td className="py-2 px-4">Analysepakker ({antallAnalyser} × 4 900 kr)</td>
                  <td className="text-right py-2 px-4">{fmt(inntektAnalyser)} kr</td>
                  <td className="text-right py-2 px-4 text-tomtly-accent">{fmt(Math.round(inntektAnalyser * partnerAndel))} kr</td>
                </tr>
                <tr className="border-b border-brand-100">
                  <td className="py-2 px-4">Premium ({antallPremium} × 7 500 kr)</td>
                  <td className="text-right py-2 px-4">{fmt(inntektPremium)} kr</td>
                  <td className="text-right py-2 px-4 text-tomtly-accent">{fmt(Math.round(inntektPremium * partnerAndel))} kr</td>
                </tr>
                <tr className="border-b border-brand-100">
                  <td className="py-2 px-4">Øvrig (meglere, abo, bank, addons)</td>
                  <td className="text-right py-2 px-4">{fmt(inntektAndre)} kr</td>
                  <td className="text-right py-2 px-4 text-tomtly-accent">{fmt(Math.round(inntektAndre * partnerAndel))} kr</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-tomtly-dark text-white">
                  <td className="py-3 px-4 font-semibold">Totalt per måned</td>
                  <td className="text-right py-3 px-4 font-bold text-lg">{fmt(totalMnd)} kr</td>
                  <td className="text-right py-3 px-4 font-bold text-lg text-tomtly-gold">{fmt(frederikMnd)} kr</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Resultat */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-forest-50 rounded-xl p-6 text-center border border-forest-200">
              <p className="text-xs text-forest-600 mb-1">Din månedslønn</p>
              <p className="text-3xl font-bold text-tomtly-accent">{fmt(frederikMnd)} kr</p>
            </div>
            <div className="bg-tomtly-dark rounded-xl p-6 text-center">
              <p className="text-xs text-brand-400 mb-1">Din årslønn</p>
              <p className="text-3xl font-bold text-tomtly-gold">{fmt(frederikAar)} kr</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-6 text-center border border-brand-200">
              <Award className="w-8 h-8 text-tomtly-gold mx-auto mb-1" />
              <p className="text-xs text-brand-500">+ 15% eierskap</p>
              <p className="text-sm font-semibold text-tomtly-dark">i Tomtly AS</p>
            </div>
          </div>
        </div>

        {/* Hva du slipper vs får */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6">Hva er forskjellen fra vanlig megling?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-3">Det du slipper:</h3>
              <ul className="space-y-2">
                {[
                  'Ingen helge- og kveldsarbeid',
                  'Ingen visninger – kjøpere ser alt digitalt',
                  'Ingen oppgjørsprosess – Propr gjør det',
                  'Ingen salgsoppgaver å skrive',
                  'Ingen meglerforetak-ansvar',
                  'Ingen reklamasjonsrisiko',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-tomtly-accent mb-3">Det du får:</h3>
              <ul className="space-y-2">
                {[
                  '20% av ALL Tomtly-inntekt',
                  '15% eierskap i Tomtly AS',
                  'Kontortid mandag–fredag',
                  'Provisjon uten visninger',
                  'Ubegrenset oppsidepotensial',
                  'Bygge noe eget – ikke jobbe for noen andre',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-600">
                    <TrendingUp className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Hvorfor det fungerer */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Hvorfor Tomtly + megler = gamechanger</h2>
          <div className="space-y-4 text-sm text-brand-700 leading-relaxed">
            <p>
              Tomtly har allerede plattformen, analyseverktøyene, scrapers som finner tomter på FINN, og et team som lager mulighetsstudier. Vi mangler én ting: <strong>en autorisert eiendomsmegler</strong>.
            </p>
            <p>
              Med deg på laget kan vi tilby kunder at vi håndterer hele prosessen for 3% av salgssummen – inkludert gratis analyse. Oppgjøret gjøres av Propr (9 990 kr). Vi er billigere enn tradisjonelle meglere som tar 1–3,6%.
            </p>
            <p>
              <strong>Volumet er nøkkelen.</strong> En tradisjonell megler gjør 10–15 salg i året og sliter med visninger, helger og stress. Vi gjør 5+ salg i måneden uten at du trenger å stå på en eneste visning. Kjøpere ser mulighetsstudien digitalt og kontakter oss. Du håndterer kontrakten – Propr gjør oppgjøret.
            </p>
          </div>
        </div>

        {/* Prissammenligning for kunden */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Hva kunden betaler – vi er billigere</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-xl p-5 border border-red-200">
              <p className="text-sm font-medium text-red-700 mb-1">Tradisjonell megler</p>
              <p className="text-2xl font-bold text-red-700">1–3,6%</p>
              <p className="text-xs text-red-600 mt-1">Tomt til 3 MNOK = 30 000–108 000 kr</p>
              <p className="text-xs text-red-500 mt-1">+ visninger, helger, lang prosess</p>
            </div>
            <div className="bg-forest-50 rounded-xl p-5 border-2 border-tomtly-accent">
              <p className="text-sm font-medium text-tomtly-accent mb-1">Tomtly (3% modell)</p>
              <p className="text-2xl font-bold text-tomtly-dark">3%</p>
              <p className="text-xs text-forest-700 mt-1">Tomt til 3 MNOK = 90 000 kr</p>
              <p className="text-xs text-forest-600 mt-1">Gratis analyse, vi gjør alt, Propr oppgjør</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
              <p className="text-sm font-medium text-brand-500 mb-1">Tomtly (fastpris)</p>
              <p className="text-2xl font-bold text-tomtly-dark">4 900 kr</p>
              <p className="text-xs text-brand-500 mt-1">Kun analyse, kunden selger selv</p>
              <p className="text-xs text-brand-400 mt-1">Eller 7 500 kr med premium</p>
            </div>
          </div>
          <p className="text-xs text-brand-500 mt-4">
            Merk: 3% er på linje med eller litt under tradisjonelle meglere – men vi inkluderer profesjonell mulighetsstudie som ingen andre tilbyr. Kunden får mer for pengene.
          </p>
        </div>

        {/* CTA */}
        <div className="bg-tomtly-dark rounded-2xl p-10 text-center mb-16">
          <h2 className="font-display text-2xl font-bold text-white mb-4">
            Klar til å snakke om det?
          </h2>
          <p className="text-brand-400 mb-6 max-w-md mx-auto">
            Ring Jakob på 40603908 eller send en melding. Vi tar en kaffe og går gjennom tallene sammen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+4740603908" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors">
              Ring Jakob
            </a>
            <a href="mailto:hey@nops.no?subject=Tomtly%20megler-partner" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
              Send e-post
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
