'use client'

import { useState } from 'react'
import { CheckCircle2, TrendingUp, Award, MapPin } from 'lucide-react'

export default function FrederikPage() {
  const [salg, setSalg] = useState(5)
  const [snittpris, setSnittpris] = useState(3)

  const fmt = (n: number) => n.toLocaleString('nb-NO')

  // 3% provisjon per salg
  const provisjonPerSalg = snittpris * 1000000 * 0.03
  const totalProvisjon = salg * provisjonPerSalg

  // Fast inntekt Tomtly (analyser, abo, etc) – estimert
  const fastInntekt = 80000

  // Total Tomtly inntekt
  const tomtlyTotal = totalProvisjon + fastInntekt

  // Frederiks 20%
  const frederikMnd = Math.round(tomtlyTotal * 0.20)
  const frederikAar = frederikMnd * 12

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
            Vi har plattformen, analysene og kundene. Vi trenger deg som megler. Med deg på laget selger vi tomter – og begge tjener godt.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-8">

        {/* Tilbudet – enkelt */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 shadow-sm mb-8">
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-8 text-center">Tilbudet</h2>

          <div className="grid grid-cols-2 gap-6 mb-8">
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
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Du får 20% av alt Tomtly tjener – provisjon fra salg, analyser, abonnementer, alt</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Du får 15% eierskap i selskapet – din andel vokser med Tomtly</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Jobb fra hvor som helst – kontor, hjemme, hytta</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />Ingen grunnlønn i starten – vi bygger dette sammen</li>
          </ul>
        </div>

        {/* Hva vi gjør – enkelt */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Hva Tomtly gjør</h2>
          <p className="text-sm text-brand-600 mb-6">
            Tomtly finner tomter, lager profesjonelle mulighetsstudier, og presenterer dem for kjøpere. Med en megler på laget kan vi selge tomtene og ta 3% provisjon. Oppgjøret gjøres av Propr.
          </p>

          <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
            <p className="text-sm text-brand-700"><strong>Tomtly gjør:</strong> Finner tomter, lager analyse, markedsfører, kobler kjøper og selger</p>
            <p className="text-sm text-brand-700 mt-1"><strong>Du gjør:</strong> Signerer som ansvarlig megler, håndterer kontrakt</p>
            <p className="text-sm text-brand-700 mt-1"><strong>Propr gjør:</strong> Oppgjør (9 990 kr, betalt av selger)</p>
          </div>
        </div>

        {/* DET ENKLE REGNESTYKKET */}
        <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-6 text-center">Det enkle regnestykket</h2>

          {/* Input */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Antall tomtesalg per måned</label>
              <input type="range" min={1} max={15} value={salg} onChange={(e) => setSalg(Number(e.target.value))} className="w-full accent-tomtly-accent" />
              <p className="text-center text-2xl font-bold text-tomtly-dark mt-1">{salg}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1">Snitt salgssum (MNOK)</label>
              <input type="range" min={1} max={10} step={0.5} value={snittpris} onChange={(e) => setSnittpris(Number(e.target.value))} className="w-full accent-tomtly-accent" />
              <p className="text-center text-2xl font-bold text-tomtly-dark mt-1">{snittpris} MNOK</p>
            </div>
          </div>

          {/* Resultat – visuelt og enkelt */}
          <div className="bg-brand-50 rounded-xl p-6 border border-brand-200 mb-6">
            <div className="text-center mb-4">
              <p className="text-sm text-brand-500">Per salg (3% av {snittpris} MNOK)</p>
              <p className="text-3xl font-bold text-tomtly-dark">{fmt(provisjonPerSalg)} kr</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-brand-500 text-sm mb-4">
              <span>{salg} salg × {fmt(provisjonPerSalg)} kr</span>
              <span>=</span>
              <span className="font-bold text-tomtly-dark">{fmt(totalProvisjon)} kr/mnd i provisjon</span>
            </div>
            <div className="text-center text-xs text-brand-400">
              + ca. {fmt(fastInntekt)} kr/mnd fra analyser, abonnementer og addons
            </div>
          </div>

          {/* Fordeling */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-forest-50 rounded-xl p-6 text-center border border-forest-200">
              <p className="text-xs text-forest-600 mb-1">Din del (20%)</p>
              <p className="text-4xl font-bold text-tomtly-accent">{fmt(frederikMnd)}</p>
              <p className="text-xs text-forest-600 mt-1">kr/mnd</p>
              <p className="text-sm font-bold text-forest-800 mt-3">{fmt(frederikAar)} kr/år</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-6 text-center border border-brand-200">
              <p className="text-xs text-brand-500 mb-1">Tomtlys del (80%)</p>
              <p className="text-4xl font-bold text-tomtly-dark">{fmt(Math.round(tomtlyTotal * 0.80))}</p>
              <p className="text-xs text-brand-500 mt-1">kr/mnd</p>
              <p className="text-sm font-bold text-brand-700 mt-3">{fmt(Math.round(tomtlyTotal * 0.80) * 12)} kr/år</p>
            </div>
          </div>
        </div>

        {/* Tabell: salg → lønn */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4">Hvor mange salg trengs?</h2>
          <p className="text-sm text-brand-500 mb-4">Med snitt salgssum {snittpris} MNOK og 3% provisjon:</p>

          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-brand-100 border-b border-brand-200">
                  <th className="text-left py-2 px-4 text-brand-600">Salg/mnd</th>
                  <th className="text-right py-2 px-4 text-brand-600">Tomtly inntekt</th>
                  <th className="text-right py-2 px-4 text-brand-600">Din del (20%)</th>
                  <th className="text-right py-2 px-4 text-brand-600">Din årslønn</th>
                </tr>
              </thead>
              <tbody>
                {[2, 3, 5, 7, 10].map((s) => {
                  const prov = s * snittpris * 1000000 * 0.03
                  const total = prov + fastInntekt
                  const din = Math.round(total * 0.20)
                  const aar = din * 12
                  const highlight = s === salg
                  return (
                    <tr key={s} className={`border-b border-brand-100 ${highlight ? 'bg-forest-50 font-semibold' : ''}`}>
                      <td className="py-3 px-4">{s} salg</td>
                      <td className="text-right py-3 px-4">{fmt(total)} kr</td>
                      <td className="text-right py-3 px-4 text-tomtly-accent">{fmt(din)} kr</td>
                      <td className="text-right py-3 px-4 font-bold">{fmt(aar)} kr</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-brand-400 mt-3">
            + 15% eierskap i Tomtly AS på toppen av dette.
          </p>
        </div>

        {/* Hva du slipper */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-3">Det du slipper</h3>
              <ul className="space-y-2">
                {['Ingen visninger', 'Ingen helgearbeid', 'Ingen oppgjørsprosess', 'Ingen salgsoppgaver', 'Ingen kontortid-krav', 'Jobb fra hvor som helst'].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-600"><CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />{i}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-tomtly-dark mb-3">Det du får</h3>
              <ul className="space-y-2">
                {['20% av all inntekt', '15% eierskap i Tomtly AS', 'Frihet til å jobbe hvor som helst', 'Provisjon uten visninger', 'Bygge noe eget fra starten', 'Ubegrenset oppsidepotensial'].map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-brand-600"><TrendingUp className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />{i}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-tomtly-dark rounded-2xl p-10 text-center mb-16">
          <h2 className="font-display text-2xl font-bold text-white mb-4">La oss snakke om det</h2>
          <p className="text-brand-400 mb-6">Ring eller send en melding. Vi tar en kaffe.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+4740603908" className="px-8 py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 transition-colors">
              Ring Jakob – 40603908
            </a>
            <a href="mailto:hey@nops.no?subject=Tomtly%20megler-partner" className="px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors">
              Send e-post
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
