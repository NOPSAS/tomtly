'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp, CheckCircle2, Zap, Target, BarChart3, Globe, Shield, Users } from 'lucide-react'

export default function InvestorPage() {
  const [analyserMnd, setAnalyserMnd] = useState(30)

  // Inntektsmodell basert på faktiske priser (CLAUDE.md)
  const analyseFastpris = 9900    // Tomteanalyse engangspris
  const markedspakke = 4990       // Analyse + Markedsføring startpris
  const tilrettelegging = 0.02    // 2% tilretteleggingsgebyr ved salg
  const snittSalgssum = 2000000   // Snitt tomtepris
  const fradelingProsent = 0.05   // 5% av ny tomts verdi
  const bankLeadFee = 4900        // Per innvilget byggelån
  const huslevAbo = 15000         // Snitt per mnd
  const meglerAnalyse = 2900      // Per analyse fra megler

  // Fordeling av analyser
  const fastprisAndel = 0.30      // 30% velger kun analyse
  const markedAndel = 0.50        // 50% velger analyse + markedsføring
  const meglerAndel = 0.20        // 20% kommer via megler

  const antFastpris = Math.round(analyserMnd * fastprisAndel)
  const antMarked = Math.round(analyserMnd * markedAndel)
  const antMegler = Math.round(analyserMnd * meglerAndel)
  const antSolgt = Math.round(antMarked * 0.6) // 60% av markedspakker fører til salg
  const antFradeling = Math.round(analyserMnd * 0.05) // 5% er fradelinger
  const antBankLead = Math.round(analyserMnd * 0.08) // 8% gir byggelån-leads

  const inntektFastpris = antFastpris * analyseFastpris
  const inntektMarked = antMarked * markedspakke
  const inntektProv = antSolgt * snittSalgssum * tilrettelegging
  const inntektMegler = antMegler * meglerAnalyse
  const inntektFradeling = antFradeling * snittSalgssum * fradelingProsent
  const inntektBank = antBankLead * bankLeadFee
  const inntektHuslev = 2 * huslevAbo // 2 leverandører
  const inntektEntreprenor = 0 // Ikke aktivert ennå

  const totalMnd = inntektFastpris + inntektMarked + inntektProv + inntektMegler + inntektFradeling + inntektBank + inntektHuslev + inntektEntreprenor
  const totalAar = totalMnd * 12

  const fmt = (n: number) => n.toLocaleString('nb-NO')

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-tomtly-dark text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="text-brand-400 hover:text-white"><ArrowLeft className="w-5 h-5" /></Link>
            <h1 className="font-display text-lg font-bold">Investor – TOMTLY</h1>
          </div>
          <span className="text-xs text-brand-400">Konfidensielt</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-tomtly-dark mb-4">TOMTLY</h1>
          <p className="text-xl text-brand-600 max-w-2xl mx-auto">Norges smarteste plattform for tomteanalyse og tomtesalg. KI-drevet. Skalerbar. Unik markedsposisjon.</p>
        </div>

        {/* Hva er Tomtly */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-tomtly-accent" />
            Hva er Tomtly?
          </h2>
          <p className="text-brand-600 mb-6">
            Tomtly analyserer hva du kan bygge på en tomt — automatisk. Vi henter data fra 10+ offentlige registre (DiBK, Kartverket, kommuner), tolker reguleringsplaner med KI, og gir tomteeiere en komplett analyse med byggepotensial, husmodeller, 3D-visualisering og verdivurdering.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
              <Globe className="w-6 h-6 text-tomtly-accent mb-2" />
              <h3 className="font-semibold text-tomtly-dark mb-1">Hele Norge</h3>
              <p className="text-sm text-brand-600">Fungerer for alle 356 kommuner. Ingen manuelt arbeid per kommune.</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
              <Shield className="w-6 h-6 text-tomtly-accent mb-2" />
              <h3 className="font-semibold text-tomtly-dark mb-1">Ikke megler</h3>
              <p className="text-sm text-brand-600">Analyseplattform. Tomteeier selger selv. Oppgjør via Proff Oppgjør AS. Ingen meglerforetak-krav.</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
              <Users className="w-6 h-6 text-tomtly-accent mb-2" />
              <h3 className="font-semibold text-tomtly-dark mb-1">B2B + B2C</h3>
              <p className="text-sm text-brand-600">Selger til tomteeiere direkte + via meglere, kommuner og husleverandører.</p>
            </div>
          </div>
        </div>

        {/* Forretningsmodell */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-tomtly-accent" />
            Forretningsmodell – 7 inntektsstrømmer per tomt
          </h2>
          <div className="space-y-3 mb-8">
            {[
              { nr: '1', navn: 'Tomteanalyse', pris: '9 900 kr', desc: 'Engangspris. Analyse, husmodeller, 3D, verdivurdering, tomterapport.', type: 'Fastpris' },
              { nr: '2', navn: 'Analyse + Markedsføring', pris: '4 990 kr + 2%', desc: 'Alt i analyse + annonsering, salgsdashboard, Tomtekonsulent, salgsverktøy. 2% tilretteleggingsgebyr ved salg.', type: 'Hybrid' },
              { nr: '3', navn: 'Oppgjør via Proff Oppgjør AS', pris: 'fra 9 000 kr + mva', desc: 'Betales separat til vår samarbeidspartner Proff Oppgjør AS. Ikke Tomtly-inntekt.', type: 'Partner' },
              { nr: '4', navn: 'Fradeling', pris: '5% av ny tomts verdi', desc: '0 kr fra Tomtly ved avslag. Kunde betaler kun kommunale gebyrer.', type: 'Provisjon' },
              { nr: '5', navn: 'Husleverandør-abo', pris: '10 000–20 000 kr/mnd', desc: 'Husmodelleksponering på alle tomter. ABChus, Hedalm-Anebyhus m.fl.', type: 'Abonnement' },
              { nr: '6', navn: 'Bank lead-fee', pris: '4 900 kr', desc: 'Per innvilget byggelån formidlet til bankpartner.', type: 'Lead-fee' },
              { nr: '7', navn: 'Megler-analyse', pris: '2 900 kr', desc: 'Eiendomsmeglere bestiller analyser for sine kunder. Lavere pris, høyere volum.', type: 'B2B' },
            ].map((s) => (
              <div key={s.nr} className="flex items-start gap-4 bg-brand-50 rounded-xl p-4 border border-brand-200">
                <div className="w-8 h-8 rounded-full bg-tomtly-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{s.nr}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-tomtly-dark">{s.navn}</h3>
                    <span className="text-[10px] bg-brand-200 text-brand-600 px-1.5 py-0.5 rounded">{s.type}</span>
                  </div>
                  <p className="text-sm text-brand-600">{s.desc}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-tomtly-dark">{s.pris}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-forest-50 border border-forest-200 rounded-xl p-5">
            <p className="text-sm text-forest-700">
              <strong>Forsikringsklausul:</strong> Ved oppsigelse av markedsføringspakken gjelder tilretteleggingsgebyret (2%) fortsatt dersom eiendommen selges innen 3 måneder etter oppsigelsesdato.
            </p>
          </div>
        </div>

        {/* Inntektskalkulator */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-tomtly-accent" />
            Inntektskalkulator
          </h2>

          <div className="mb-6">
            <label className="block text-sm text-brand-500 mb-1">Analyser per måned</label>
            <input type="range" min={5} max={100} value={analyserMnd} onChange={(e) => setAnalyserMnd(Number(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-brand-400 mt-1">
              <span>5</span>
              <span className="font-bold text-tomtly-dark text-lg">{analyserMnd}</span>
              <span>100</span>
            </div>
          </div>

          <div className="bg-brand-50 rounded-xl border border-brand-200 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-200 bg-brand-100">
                  <th className="text-left py-2 px-4 text-brand-600">Inntektskilde</th>
                  <th className="text-right py-2 px-4 text-brand-600">Antall</th>
                  <th className="text-right py-2 px-4 text-brand-600">Pris</th>
                  <th className="text-right py-2 px-4 text-brand-600">Inntekt/mnd</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { kilde: 'Tomteanalyse (fastpris)', antall: antFastpris, pris: '9 900 kr', inntekt: inntektFastpris },
                  { kilde: 'Analyse + Markedsføring (startgebyr)', antall: antMarked, pris: '4 990 kr', inntekt: inntektMarked },
                  { kilde: 'Tilretteleggingsgebyr 2% ved salg', antall: antSolgt, pris: `${fmt(Math.round(snittSalgssum * tilrettelegging))} kr`, inntekt: inntektProv },
                  { kilde: 'Megler-analyse (B2B)', antall: antMegler, pris: '2 900 kr', inntekt: inntektMegler },
                  { kilde: 'Fradeling (5% av ny tomt)', antall: antFradeling, pris: `${fmt(Math.round(snittSalgssum * fradelingProsent))} kr`, inntekt: inntektFradeling },
                  { kilde: 'Bank lead-fee', antall: antBankLead, pris: '4 900 kr', inntekt: inntektBank },
                  { kilde: 'Husleverandør-abo (2 stk)', antall: 2, pris: '15 000 kr/mnd', inntekt: inntektHuslev },
                ].map((r) => (
                  <tr key={r.kilde} className="border-b border-brand-100">
                    <td className="py-2 px-4">{r.kilde}</td>
                    <td className="text-right py-2 px-4">{r.antall}</td>
                    <td className="text-right py-2 px-4 text-brand-500">{r.pris}</td>
                    <td className="text-right py-2 px-4 font-semibold">{fmt(r.inntekt)} kr</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-tomtly-dark text-white">
                  <td className="py-3 px-4 font-semibold" colSpan={3}>Totalt per måned (MRR)</td>
                  <td className="text-right py-3 px-4 font-bold text-lg">{fmt(totalMnd)} kr</td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-forest-50 rounded-xl p-6 border border-forest-200 text-center">
              <p className="text-xs text-forest-600 mb-1">MRR</p>
              <p className="text-3xl font-bold text-tomtly-accent">{fmt(totalMnd)} kr</p>
            </div>
            <div className="bg-tomtly-dark rounded-xl p-6 text-center">
              <p className="text-xs text-brand-400 mb-1">ARR</p>
              <p className="text-3xl font-bold text-tomtly-gold">{fmt(totalAar)} kr</p>
            </div>
            <div className="bg-brand-50 rounded-xl p-6 border border-brand-200 text-center">
              <p className="text-xs text-brand-500 mb-1">Inntekt per analyse (snitt)</p>
              <p className="text-3xl font-bold text-tomtly-dark">{fmt(Math.round(totalMnd / analyserMnd))} kr</p>
            </div>
          </div>
        </div>

        {/* Skaleringsplan */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-tomtly-accent" />
            Skaleringsplan
          </h2>
          <div className="space-y-4">
            {[
              { fase: 'Nå', mnd: 'Q2 2026', analyser: 5, fokus: 'Nesodden-tomter, produkt-validering, megler-piloter', mrr: 5 },
              { fase: 'Fase 1', mnd: 'Q3 2026', analyser: 15, fokus: 'Oslo/Akershus, megler-kanal, FINN-leads, 2 husleverandører', mrr: 15 },
              { fase: 'Fase 2', mnd: 'Q4 2026', analyser: 30, fokus: 'Hele Østlandet, kommune-partnerskap, bank-avtaler', mrr: 30 },
              { fase: 'Fase 3', mnd: 'Q1-Q2 2027', analyser: 60, fokus: 'Nasjonalt, API-integrasjoner, white-label for meglerkjeder', mrr: 60 },
              { fase: 'Mål', mnd: 'Q4 2027', analyser: 100, fokus: 'Markedsleder tomteanalyse, abonnementsmodell for meglere', mrr: 100 },
            ].map((f) => {
              const estMrr = Math.round(f.analyser * (totalMnd / analyserMnd))
              return (
                <div key={f.fase} className="flex items-center gap-4 bg-brand-50 rounded-xl p-4 border border-brand-200">
                  <div className="w-20 flex-shrink-0">
                    <p className="text-xs font-semibold text-tomtly-accent">{f.fase}</p>
                    <p className="text-xs text-brand-500">{f.mnd}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-tomtly-dark">{f.analyser} analyser/mnd</p>
                    <p className="text-xs text-brand-600">{f.fokus}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-brand-500">Est. MRR</p>
                    <p className="font-bold text-tomtly-accent">{fmt(estMrr)} kr</p>
                    <p className="text-xs text-brand-400">ARR: {fmt(estMrr * 12)} kr</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Konkurransefortrinn */}
        <div className="bg-white rounded-2xl border border-brand-200 p-8 mb-8">
          <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-6">Konkurransefortrinn</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { tittel: 'KI-drevet analyse', desc: 'Automatisk tolkning av reguleringsplaner, DOK-data og kommuneplaner. Ingen manuelt arbeid per tomt.' },
              { tittel: 'Alle 356 kommuner', desc: 'Planslurpen (DiBK) + arealplaner.no + Kartverket gir landsdekkende data fra dag 1.' },
              { tittel: 'Ikke meglerfirma', desc: 'Tomteeier selger selv. Proff Oppgjør AS håndterer oppgjør. Tomtly er ren analyseplattform — ingen Finanstilsyns-krav.' },
              { tittel: 'Marginalkonkurranse = 0', desc: 'Ingen andre i Norge tilbyr automatisert tomteanalyse med KI-tolkning av reguleringsbestemmelser.' },
              { tittel: 'Nettverkseffekt', desc: 'Flere meglere → flere analyser → bedre data → bedre analyser → flere meglere.' },
              { tittel: 'Lav CAC', desc: 'Leads fra FINN.no-scraping, kommunale postlister, megler-partnerskap. Ingen dyr markedsføring.' },
            ].map((f) => (
              <div key={f.tittel} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-tomtly-dark">{f.tittel}</h3>
                  <p className="text-sm text-brand-600">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selskapsinfo */}
        <div className="bg-tomtly-dark rounded-2xl p-8 text-white">
          <h2 className="font-display text-2xl font-bold mb-6">Selskapsinfo</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-xs text-brand-400 mb-1">Selskap</p>
              <p className="font-bold">NOPS AS</p>
              <p className="text-xs text-brand-400">Org.nr 933 819 086</p>
            </div>
            <div>
              <p className="text-xs text-brand-400 mb-1">Produkt</p>
              <p className="font-bold">tomtly.no</p>
            </div>
            <div>
              <p className="text-xs text-brand-400 mb-1">Grunnlegger</p>
              <p className="font-bold">Jakob Bjøndal</p>
              <p className="text-xs text-brand-400">hey@nops.no</p>
            </div>
            <div>
              <p className="text-xs text-brand-400 mb-1">Status</p>
              <p className="font-bold text-tomtly-gold">Pre-revenue</p>
              <p className="text-xs text-brand-400">Produkt live</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
