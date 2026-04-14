'use client'

import { CheckCircle2, XCircle, ArrowRight, ArrowDown, Scale, FileText, Shield } from 'lucide-react'
import Link from 'next/link'

export default function ModellCPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* ─── 1. Hero ─── */}
      <section className="bg-tomtly-dark text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <Link href="/" className="inline-block mb-8">
            <span className="font-display text-2xl font-bold tracking-tight text-white opacity-40">Tomtly</span>
          </Link>

          <p className="text-tomtly-gold font-mono text-sm uppercase tracking-widest mb-6">Intern arbeidsmodell</p>

          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
            Modell C – Alternativ forretningsmodell
          </h1>

          <p className="text-lg md:text-xl text-brand-300 max-w-3xl mx-auto leading-relaxed">
            Tomtly som analyseplattform og markedsføringskanal – uten meglerbevilling
          </p>
        </div>
      </section>

      {/* ─── 2. Konseptet ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Hva er Modell C?
          </h2>

          {/* Flytdiagram */}
          <div className="max-w-2xl mx-auto space-y-0">
            {[
              { step: '1', title: 'Tomteeier registrerer tomt', desc: 'Laster opp informasjon om tomten på tomtly.no' },
              { step: '2', title: 'Tomtly analyserer', desc: 'Regulering, topografi, markedsverdi, muligheter' },
              { step: '3', title: 'Husmodeller og visualisering', desc: '3D-modeller, byggekalkyle, mulighetsstudie' },
              { step: '4', title: 'Publisering og markedsføring', desc: 'Tomten markedsføres mot kvalifiserte kjøpere' },
              { step: '5', title: 'Interesserte kjøpere melder seg', desc: 'Leads samles og kvalifiseres' },
            ].map((item, i) => (
              <div key={item.step}>
                <div className="flex items-start gap-5">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-tomtly-accent text-white flex items-center justify-center font-mono font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    {i < 4 && <div className="w-0.5 h-12 bg-brand-200" />}
                  </div>
                  <div className="pt-1.5 pb-8">
                    <h3 className="font-display text-lg font-bold text-tomtly-dark">{item.title}</h3>
                    <p className="text-brand-500 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Stoppunkt */}
            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-red-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-6 py-2 text-red-600 font-mono font-bold text-sm uppercase tracking-widest">
                  Her stopper Tomtly
                </span>
              </div>
            </div>

            {/* Forgrening */}
            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="bg-brand-50 rounded-2xl p-6 border border-brand-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-200 text-tomtly-dark flex items-center justify-center font-mono font-bold text-sm">6a</div>
                  <h3 className="font-display text-lg font-bold text-tomtly-dark">Selger selv</h3>
                </div>
                <p className="text-sm text-brand-600 leading-relaxed">
                  Selger velger å gjennomføre salget på egenhånd. Bruker Proff Oppgjør eller lignende for oppgjør. Tomtly er ikke involvert.
                </p>
              </div>
              <div className="bg-forest-50 rounded-2xl p-6 border border-tomtly-accent/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-tomtly-accent text-white flex items-center justify-center font-mono font-bold text-sm">6b</div>
                  <h3 className="font-display text-lg font-bold text-tomtly-dark">Vil ha hjelp</h3>
                </div>
                <p className="text-sm text-brand-600 leading-relaxed">
                  Tomtly sender <strong>selger</strong> til megler. Megler betaler Tomtly en fast lead-fee. Tomtly er aldri mellommann mellom kjøper og selger.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Juridisk grunnlag ─── */}
      <section className="py-20 md:py-28 bg-brand-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Hvorfor dette er lovlig
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <div className="w-12 h-12 rounded-xl bg-tomtly-accent/10 flex items-center justify-center mb-5">
                <Scale className="w-6 h-6 text-tomtly-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-3">Propr-presedensen</h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                Finanstilsynet fastslo i 2016 at Propr ikke driver eiendomsmegling. Propr har <strong>ingen meglerbevilling</strong>. De selger selvhjelpsverktøy til fast pris, og selger har alt ansvar. Tomtly følger samme prinsipp.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <div className="w-12 h-12 rounded-xl bg-tomtly-accent/10 flex items-center justify-center mb-5">
                <FileText className="w-6 h-6 text-tomtly-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-3">Tjenestetorget-modellen</h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                Tjenestetorget.no, Meglerportalen.no og MeglerSmart.no selger allerede leads til meglere uten bevilling. De kobler selger med megler – ikke kjøper med selger. Tomtly gjør det samme.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <div className="w-12 h-12 rounded-xl bg-tomtly-accent/10 flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-tomtly-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-3">NOU 2021:7</h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                Eiendomsmeglingsutvalget (flertallet) anbefalte å <strong>ikke</strong> innføre konsesjonsplikt for selvhjelpsverktøy. Regjeringen foreslår forenklinger, ikke innstramninger.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-brand-200 p-6 text-center max-w-3xl mx-auto">
            <p className="text-sm text-brand-500 italic leading-relaxed">
              &quot;Tomtly er ikke et eiendomsmeglingsforetak. Tomteeier er selv ansvarlig for salget av sin eiendom. Oppgjør håndteres av autorisert oppgjørsselskap.&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ─── 4. Produkter og priser ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Inntektsstrømmer
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-200">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Produkt</th>
                  <th className="text-right py-4 px-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Pris</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Betaler</th>
                  <th className="text-left py-4 pl-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Krev bevilling?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {[
                  { product: 'Tomteanalyse (rapport, husmodeller, 3D, reguleringssjekk, byggekalkyle, verdivurdering)', price: '9 900 kr', payer: 'Tomteeier', license: 'Nei – rådgivning' },
                  { product: 'Markedsføringspakke (publisering, annonsering, leadgenerering)', price: '9 900 kr', payer: 'Tomteeier', license: 'Nei – markedsføring' },
                  { product: 'Lead-fee (kvalifisert selger levert til megler)', price: '7 500 kr fast', payer: 'Megler', license: 'Nei – Tjenestetorget-modellen' },
                  { product: 'Husleverandør-abonnement', price: '15 000 kr/år', payer: 'Husleverandør', license: 'Nei – annonsering' },
                  { product: 'Entreprenør-abonnement', price: '14 900 kr/år', payer: 'Entreprenør', license: 'Nei – annonsering' },
                  { product: 'Bank lead-fee', price: '4 900 kr', payer: 'Bank', license: 'Nei – henvisning' },
                  { product: 'Fradeling (prosjektledelse)', price: '69 000 kr', payer: 'Tomteeier', license: 'Nei – konsulentarbeid' },
                ].map((row) => (
                  <tr key={row.product} className="hover:bg-brand-50 transition-colors">
                    <td className="py-4 pr-4 text-sm text-tomtly-dark font-medium">{row.product}</td>
                    <td className="py-4 px-4 text-right font-mono text-sm font-bold text-tomtly-dark whitespace-nowrap">{row.price}</td>
                    <td className="py-4 px-4 text-sm text-brand-600 whitespace-nowrap">{row.payer}</td>
                    <td className="py-4 pl-4 text-sm text-tomtly-accent font-medium">{row.license}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 5. Økonomi per kunde ─── */}
      <section className="py-20 md:py-28 bg-brand-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Tre kundescenarier
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Kun analyse */}
            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-6">Kun analyse</h3>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-500">Tomteanalyse</span>
                  <span className="font-mono font-bold text-tomtly-dark">9 900 kr</span>
                </div>
              </div>
              <div className="border-t border-brand-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-brand-600">Totalt til Tomtly</span>
                  <span className="font-mono font-bold text-xl text-tomtly-dark">9 900 kr</span>
                </div>
              </div>
            </div>

            {/* Analyse + markedsføring */}
            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-6">Analyse + markedsføring</h3>
              <p className="text-xs text-brand-400 mb-4">(selger selv)</p>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-500">Tomteanalyse</span>
                  <span className="font-mono font-bold text-tomtly-dark">9 900 kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-500">Markedsføringspakke</span>
                  <span className="font-mono font-bold text-tomtly-dark">9 900 kr</span>
                </div>
              </div>
              <div className="border-t border-brand-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-brand-600">Totalt til Tomtly</span>
                  <span className="font-mono font-bold text-xl text-tomtly-dark">19 800 kr</span>
                </div>
              </div>
            </div>

            {/* Full pakke */}
            <div className="bg-white rounded-2xl p-8 border-2 border-tomtly-accent ring-1 ring-tomtly-accent">
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-6">Full pakke med meglerkobling</h3>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-500">Tomteanalyse</span>
                  <span className="font-mono font-bold text-tomtly-dark">9 900 kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-500">Markedsføringspakke</span>
                  <span className="font-mono font-bold text-tomtly-dark">9 900 kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-500">Lead-fee fra megler</span>
                  <span className="font-mono font-bold text-tomtly-dark">7 500 kr</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-500">Bank lead-fee</span>
                  <span className="font-mono font-bold text-tomtly-dark">4 900 kr</span>
                </div>
              </div>
              <div className="border-t border-tomtly-accent/20 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold text-brand-600">Totalt til Tomtly</span>
                  <span className="font-mono font-bold text-xl text-tomtly-accent">32 200 kr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. Månedlig økonomi ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-4 text-center">
            Månedlig resultat ved 15 kunder
          </h2>
          <p className="text-brand-500 text-center mb-16 max-w-2xl mx-auto">
            Forutsetning: 20 % bare analyse (3 stk), 30 % analyse + markedsføring (5 stk), 50 % full pakke (7 stk)
          </p>

          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-200">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Kundesegment</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Antall</th>
                  <th className="text-right py-4 pl-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Inntekt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                <tr className="hover:bg-brand-50 transition-colors">
                  <td className="py-4 pr-4 text-sm text-tomtly-dark">Kun analyse</td>
                  <td className="py-4 px-4 text-center font-mono text-sm text-brand-600">3</td>
                  <td className="py-4 pl-4 text-right font-mono text-sm font-bold text-tomtly-dark">29 700 kr</td>
                </tr>
                <tr className="hover:bg-brand-50 transition-colors">
                  <td className="py-4 pr-4 text-sm text-tomtly-dark">Analyse + markedsføring</td>
                  <td className="py-4 px-4 text-center font-mono text-sm text-brand-600">5</td>
                  <td className="py-4 pl-4 text-right font-mono text-sm font-bold text-tomtly-dark">99 000 kr</td>
                </tr>
                <tr className="hover:bg-brand-50 transition-colors">
                  <td className="py-4 pr-4 text-sm text-tomtly-dark">Full pakke</td>
                  <td className="py-4 px-4 text-center font-mono text-sm text-brand-600">7</td>
                  <td className="py-4 pl-4 text-right font-mono text-sm font-bold text-tomtly-dark">225 400 kr</td>
                </tr>
                <tr className="hover:bg-brand-50 transition-colors">
                  <td className="py-4 pr-4 text-sm text-brand-500">Andre inntekter (bank, husleverandør, entreprenør)</td>
                  <td className="py-4 px-4 text-center font-mono text-sm text-brand-400">–</td>
                  <td className="py-4 pl-4 text-right font-mono text-sm font-bold text-tomtly-dark">50 000 kr</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-tomtly-dark">
                  <td className="py-5 pr-4 text-sm font-bold text-tomtly-dark">Totalt per måned</td>
                  <td className="py-5 px-4 text-center font-mono text-sm font-bold text-tomtly-dark">15</td>
                  <td className="py-5 pl-4 text-right font-mono text-lg font-bold text-tomtly-accent">404 100 kr</td>
                </tr>
                <tr className="border-t border-brand-100">
                  <td className="py-4 pr-4 text-sm font-bold text-brand-500">Annualisert</td>
                  <td className="py-4 px-4" />
                  <td className="py-4 pl-4 text-right font-mono text-lg font-bold text-tomtly-gold">4 849 200 kr</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 7. Sammenligning av modeller ─── */}
      <section className="py-20 md:py-28 bg-tomtly-dark text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-16 text-center">
            Modell C vs. andre alternativer
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-brand-400 uppercase tracking-wider" />
                  <th className="text-center py-4 px-4 text-sm font-semibold text-brand-400 uppercase tracking-wider">Dagens modell<br /><span className="text-xs normal-case">(2 % suksesshonorar + mva)</span></th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-brand-400 uppercase tracking-wider">Modell B<br /><span className="text-xs normal-case">(meglerpartner 60/40)</span></th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-tomtly-gold uppercase tracking-wider relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-tomtly-gold text-tomtly-dark text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Anbefalt</span>
                    Modell C<br /><span className="text-xs normal-case">(fastpris + lead-fee)</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { label: 'Månedlig inntekt (15 kunder)', a: '~425 000 kr', b: '~305 000 kr', c: '~404 000 kr' },
                  { label: 'Krever bevilling?', a: 'Ja', b: 'Nei (partner har)', c: 'Nei' },
                  { label: 'Juridisk risiko', a: 'Høy', b: 'Lav', c: 'Svært lav' },
                  { label: 'Avhengighet av partner', a: 'Ingen', b: 'Høy', c: 'Lav' },
                  { label: 'Kan starte i morgen?', a: 'Nei', b: 'Nei', c: 'Ja' },
                  { label: 'Skalerbarhet', a: 'Begrenset', b: 'Begrenset av partner', c: 'Ubegrenset' },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-white/5 transition-colors">
                    <td className="py-5 pr-4 text-sm font-medium text-white">{row.label}</td>
                    <td className="py-5 px-4 text-center text-sm text-brand-300">{row.a}</td>
                    <td className="py-5 px-4 text-center text-sm text-brand-300">{row.b}</td>
                    <td className="py-5 px-4 text-center text-sm font-bold text-tomtly-gold bg-white/5 border-x border-white/10">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 8. Hva Tomtly aldri gjør ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Tydelige grenser
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Tomtly gjør */}
            <div className="bg-forest-50 rounded-2xl p-8 border border-tomtly-accent/20">
              <h3 className="font-display text-xl font-bold text-tomtly-dark mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-tomtly-accent" />
                Tomtly gjør
              </h3>
              <ul className="space-y-4">
                {[
                  'Analyserer tomter',
                  'Lager husmodeller og 3D-visualiseringer',
                  'Markedsfører tomter',
                  'Genererer kjøperinteresse',
                  'Sender selgere til meglere',
                  'Tar fastpris for tjenester',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-brand-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tomtly gjør IKKE */}
            <div className="bg-red-50 rounded-2xl p-8 border border-red-200">
              <h3 className="font-display text-xl font-bold text-tomtly-dark mb-6 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-500" />
                Tomtly gjør IKKE
              </h3>
              <ul className="space-y-4">
                {[
                  'Kobler kjøper direkte med selger',
                  'Holder visninger',
                  'Gir råd om budaksept',
                  'Håndterer oppgjør',
                  'Tar provisjon av salget',
                  'Opptrer som mellommann',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-brand-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. Skaleringsplan ─── */}
      <section className="py-20 md:py-28 bg-brand-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Veien videre
          </h2>

          <div className="space-y-0">
            {[
              { phase: 'Fase 1', period: 'Måned 1–2', title: 'Lansér fastpristjenester', desc: 'Lansér analyse + markedsføring som fastpristjenester. Ingen bevilling nødvendig. Kan starte umiddelbart.' },
              { phase: 'Fase 2', period: 'Måned 2–4', title: 'Onboard meglere', desc: 'Onboard 5–10 meglere som betaler lead-fee. Ikke eksklusivt – alle meglere kan melde seg på.' },
              { phase: 'Fase 3', period: 'Måned 4–8', title: 'Volum bygger seg opp', desc: 'Meglere konkurrerer om leads. Lead-fee kan økes basert på etterspørsel.' },
              { phase: 'Fase 4', period: 'Måned 8–12', title: 'Skalering', desc: '50+ kunder/mnd. Vurdér premium-tjenester, regionale eksklusive avtaler, og høyere prising.' },
            ].map((item, i) => (
              <div key={item.phase} className="flex gap-6 md:gap-10">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-tomtly-accent border-4 border-brand-50 ring-2 ring-tomtly-accent" />
                  {i < 3 && <div className="w-0.5 h-full bg-brand-200 min-h-[80px]" />}
                </div>
                <div className="pb-12">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono font-bold text-tomtly-accent bg-forest-50 px-2 py-1 rounded">{item.phase}</span>
                    <span className="text-xs text-brand-500">{item.period}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-tomtly-dark mb-1">{item.title}</h3>
                  <p className="text-brand-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. Neste steg ─── */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Tre ting som må gjøres
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <div className="w-10 h-10 rounded-full bg-tomtly-accent text-white flex items-center justify-center font-mono font-bold text-lg mb-5">1</div>
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-3">Juridisk avklaring</h3>
              <p className="text-sm text-brand-600 leading-relaxed mb-4">
                1 time med advokat spesialisert på eiendomsmeglingsloven.
              </p>
              <p className="text-xs text-brand-400">Kostnad: 3–5 000 kr</p>
              <p className="text-xs text-brand-500 mt-3 italic">
                Spørsmål: &quot;Er denne modellen innenfor Finanstilsynets Propr-vurdering fra 2016?&quot;
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <div className="w-10 h-10 rounded-full bg-tomtly-accent text-white flex items-center justify-center font-mono font-bold text-lg mb-5">2</div>
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-3">Oppdatere tomtly.no</h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                Fjerne all meglerterminologi, posisjonere som analyseplattform og markedsføringskanal.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <div className="w-10 h-10 rounded-full bg-tomtly-accent text-white flex items-center justify-center font-mono font-bold text-lg mb-5">3</div>
              <h3 className="font-display text-lg font-bold text-tomtly-dark mb-3">Lansere ny prising</h3>
              <p className="text-sm text-brand-600 leading-relaxed">
                9 900 kr analyse + 9 900 kr markedsføring som to separate produkter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="bg-tomtly-dark text-center py-8 border-t border-white/10">
        <p className="text-xs text-brand-500">
          Internt dokument – NOPS AS – Ikke for distribusjon
        </p>
      </div>
    </div>
  )
}
