'use client'

import { useState, FormEvent } from 'react'
import { CheckCircle2, ArrowRight, Download, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

const FIRMS = [
  {
    name: 'Nordvik',
    slug: 'nordvik',
    pitch: 'Dere bygde Hjem.no og satser på teknologi. Tomtly er neste steg – en plattform som leverer ferdige tomtekunder rett til deres meglere. Med 33 kontorer og Norges mest tech-fremoverlente meglerkultur er Nordvik den perfekte partneren.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/4jg63skxx5trbtx/e018f3d2f30e825f4ebd659024ee7207/Tomtly-Nordvik-Norges-smarteste-tomtesalg.pdf',
  },
  {
    name: 'Proaktiv',
    slug: 'proaktiv',
    pitch: 'Dere har erfaring med prosjektsalg og næringseiendom. Tomtly gir dere en ferdig pipeline av tomtesalg uten ekstra arbeid. Med 20+ kontorer i Norges største byer er infrastrukturen på plass.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/drk8we12akb2y37/3b677f9dcf30921e7a3cd654413d3aed/Tomtesalg-som-ny-inntektsstrom.pdf',
  },
  {
    name: 'PrivatMegleren',
    slug: 'privatmegleren',
    pitch: 'Med Kvadrat, KLiKK og egen AI-assistent er dere Norges mest teknologidrevne meglerkjede. Tomtly passer perfekt inn i deres digitale økosystem – en ny vertikal som leverer tomtekunder til 70+ kontorer.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/qvophp02z2dgvnv/c60504bfd50629304b42b9d323ea62fc/En-ny-vertikal-for-Norges-mest-digitale-meglerkjede.pdf',
  },
  {
    name: 'Garanti',
    slug: 'garanti',
    pitch: 'Med 48 kontorer og sterk tilstedeværelse i hele Norge – inkludert distriktene der de fleste tomtene ligger – er Garanti unikt posisjonert. Eierskapet fra 35 boligbyggelag gir direkte tilgang til utbyggere.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/1urdsmic3hfepyz/d0a58874b18eee37ec8b238dbf2b4310/Tomtesalg-i-hele-Norge-fra-by-til-bygd.pdf',
  },
  {
    name: 'Aktiv',
    slug: 'aktiv',
    pitch: 'Med 90+ kontorer og strategisk satsing på innovasjon er Aktiv allerede i bevegelse. Tomtly gir dere en ferdig plattform for tomtesalg som passer inn i deres innovasjonsagenda – uten utviklingskostnader.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/5797e6hi2xrzd5y/7f4cf82af063865754fe0cc65203b4e6/Tomtly-Aktiv-Tomtesalg-i-stor-skala.pdf',
  },
  {
    name: 'Røisland & Co',
    slug: 'roisland',
    pitch: 'Dere er spesialister på prosjektsalg av nybygg. Tomtly leverer det som kommer FØR prosjektsalget – tomtene. Sammen dekker vi hele verdikjeden fra rå tomt til ferdig bolig.',
    gammaUrl: 'https://gamma.app/docs/a08xuc8glghvckt',
  },
]

export default function MeglerpartnerPage() {
  const [expandedFirm, setExpandedFirm] = useState<string | null>(null)
  const [formData, setFormData] = useState({ navn: '', firma: '', epost: '', telefon: '', melding: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'meglerpartner',
          navn: formData.navn,
          email: formData.epost,
          telefon: formData.telefon,
          melding: formData.melding,
          ekstra: { firma: formData.firma },
        }),
      })
      setSent(true)
    } catch {
      alert('Noe gikk galt. Prøv igjen eller ring oss direkte.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">

      {/* ─── 1. Hero ─── */}
      <section className="bg-tomtly-dark text-white">
        <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
          <Link href="/" className="inline-block mb-12">
            <span className="font-display text-3xl font-bold tracking-tight text-white">Tomtly</span>
          </Link>

          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-8">
            Bli vår meglerpartner – og selg tomter uten å løfte en finger
          </h1>

          <p className="text-lg md:text-xl text-brand-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Tomtly gjør alt arbeidet. Du har bevillingen. Sammen revolusjonerer vi tomtesalg i Norge.
          </p>

          <a
            href="#kontakt"
            className="inline-flex items-center gap-3 bg-tomtly-accent hover:bg-forest-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-colors"
          >
            Book et uforpliktende møte
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ─── 2. Hva er Tomtly? ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-6">
            Hva er Tomtly?
          </h2>
          <p className="text-lg text-brand-600 mb-12 max-w-3xl leading-relaxed">
            Tomtly er Norges første plattform som digitaliserer hele verdikjeden for tomtesalg – fra analyse til ferdig salg via autorisert megler.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              'Analyserer tomter med offentlige data og fagkompetanse',
              'Lager mulighetsstudier og verdivurderinger',
              'Markedsfører tomter mot kvalifiserte kjøpere',
              'Kobler tomteeiere med meglere automatisk',
              'Håndterer alt frem til salgsoppdraget',
              'Salg og oppgjør gjennomføres av meglerpartner',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
                <span className="text-brand-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Hvorfor er dette bra for alle parter? ─── */}
      <section className="py-24 md:py-32 bg-brand-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Hvorfor er dette bra for alle parter?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Tomteeier */}
            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <h3 className="font-display text-xl font-bold text-tomtly-dark mb-6">For tomteeier (selger)</h3>
              <ul className="space-y-3">
                {[
                  'Slipper å finne megler selv',
                  'Får profesjonell analyse og verdivurdering',
                  'Tomten markedsføres mot riktige kjøpere',
                  'Alt håndteres – de trenger bare å signere',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-brand-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kjøper */}
            <div className="bg-white rounded-2xl p-8 border border-brand-200">
              <h3 className="font-display text-xl font-bold text-tomtly-dark mb-6">For kjøper</h3>
              <ul className="space-y-3">
                {[
                  'Tilgang til tomter som ikke finnes andre steder',
                  'Ferdig analyserte tomter med all nødvendig info',
                  'Trygg handel via autorisert megler',
                  'Kobles med husleverandører og finansiering',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-brand-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Meglerfirmaet */}
            <div className="bg-white rounded-2xl p-8 border border-brand-200 ring-2 ring-tomtly-accent">
              <h3 className="font-display text-xl font-bold text-tomtly-dark mb-6">For meglerfirmaet (deg)</h3>
              <ul className="space-y-3">
                {[
                  'Ferdige salgsoppdrag levert til deg',
                  'Ingen markedsføringskostnader',
                  'Ingen prospektering – vi leverer varme leads',
                  'Provisjonsbasert – du tjener uten risiko',
                  'Skalerer uten å ansette flere meglere',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-brand-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Slik fungerer samarbeidet ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Slik fungerer samarbeidet
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-200">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Steg</th>
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Aktivitet</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-tomtly-accent uppercase tracking-wider">Tomtly</th>
                  <th className="text-center py-4 pl-4 text-sm font-semibold text-tomtly-gold uppercase tracking-wider">Meglerpartner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {[
                  { step: '1', activity: 'Tomteanalyse', tomtly: true, megler: false },
                  { step: '2', activity: 'Mulighetsstudie', tomtly: true, megler: false },
                  { step: '3', activity: 'Markedsføring', tomtly: true, megler: false },
                  { step: '4', activity: 'Salgsgjennomføring', tomtly: false, megler: true },
                  { step: '5', activity: 'Oppgjør (via Propr)', tomtly: false, megler: true },
                ].map((row) => (
                  <tr key={row.step} className="hover:bg-brand-50 transition-colors">
                    <td className="py-5 pr-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-sm font-bold text-tomtly-dark">
                        {row.step}
                      </span>
                    </td>
                    <td className="py-5 pr-4 font-medium text-tomtly-dark">{row.activity}</td>
                    <td className="py-5 px-4 text-center">
                      {row.tomtly && <span className="text-tomtly-accent text-xl">&#10003;</span>}
                    </td>
                    <td className="py-5 pl-4 text-center">
                      {row.megler && <span className="text-tomtly-gold text-xl">&#10003;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 5. Økonomien – enkelt forklart ─── */}
      <section className="py-24 md:py-32 bg-tomtly-dark text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-tomtly-gold font-mono text-sm uppercase tracking-widest mb-4">Økonomien – enkelt forklart</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-16">
            Du tjener penger. Vi gjør jobben.
          </h2>

          {/* Example box */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 mb-16">
            <h3 className="font-display text-xl font-bold mb-6 text-tomtly-gold">Eksempel – ett salg</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Tomtepris</span>
                  <span className="font-mono font-bold">2 000 000 kr</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Provisjon (2,5 %)</span>
                  <span className="font-mono font-bold">50 000 kr</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Din andel (35 %)</span>
                  <span className="font-mono font-bold text-tomtly-gold">17 500 kr</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Din tidsbruk</span>
                  <span className="font-mono font-bold">3–5 timer</span>
                </div>
                <div className="flex justify-between pb-3">
                  <span className="text-brand-300">Timelønn</span>
                  <span className="font-mono font-bold text-tomtly-gold">3 500 – 5 800 kr/t</span>
                </div>
              </div>
            </div>
          </div>

          {/* Volume table */}
          <h3 className="font-display text-xl font-bold mb-8">Volumtabell</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 pr-8 text-sm font-semibold text-brand-400 uppercase tracking-wider">Salg/mnd</th>
                  <th className="text-right py-4 px-8 text-sm font-semibold text-brand-400 uppercase tracking-wider">Per måned</th>
                  <th className="text-right py-4 pl-8 text-sm font-semibold text-brand-400 uppercase tracking-wider">Per år</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  { sales: '5', monthly: '87 500 kr', yearly: '1 050 000 kr' },
                  { sales: '10', monthly: '175 000 kr', yearly: '2 100 000 kr' },
                  { sales: '25', monthly: '437 500 kr', yearly: '5 250 000 kr' },
                  { sales: '50', monthly: '875 000 kr', yearly: '10 500 000 kr' },
                ].map((row) => (
                  <tr key={row.sales} className="hover:bg-white/5 transition-colors">
                    <td className="py-5 pr-8 font-mono font-bold">{row.sales}</td>
                    <td className="py-5 px-8 text-right font-mono">{row.monthly}</td>
                    <td className="py-5 pl-8 text-right font-mono text-tomtly-gold font-bold">{row.yearly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-brand-400 mt-10">
            Ingen oppstartskostnader. Ingen risiko. Ren inntekt på eksisterende bevilling.
          </p>
        </div>
      </section>

      {/* ─── 6. Samarbeidsmodell ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-tomtly-accent font-mono text-sm uppercase tracking-widest mb-4">Samarbeidsmodell</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-12">
            Fleksibelt partnerskap tilpasset deg
          </h2>

          <ul className="space-y-5">
            {[
              'Eksklusiv regional eller nasjonal avtale',
              '3 måneders pilot – uforpliktende',
              '65/35 split (Tomtly/meglerpartner) av total provisjon',
              'Tomtly bærer alle kostnader for analyse og markedsføring',
              'Megler fakturerer kunden direkte',
              'Evaluering og justering etter pilotperioden',
            ].map((item) => (
              <li key={item} className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
                <span className="text-lg text-brand-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 7. Fremtidig vekst ─── */}
      <section className="py-24 md:py-32 bg-brand-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-16 text-center">
            Fremtidig vekst
          </h2>

          <div className="space-y-0">
            {[
              { phase: 'Fase 1', period: 'Mnd 1–3', title: 'Pilot', desc: '5–10 salg. Test samarbeidet i praksis med lav risiko.' },
              { phase: 'Fase 2', period: 'Mnd 4–6', title: 'Ekspansjon', desc: '3–5 regioner. Skalerer basert på pilotresultater.' },
              { phase: 'Fase 3', period: 'Mnd 7–12', title: 'Nasjonal utrulling', desc: 'Full dekning. Volumbonuser og dedikert partnerkontakt.' },
              { phase: 'Fase 4', period: 'År 2+', title: 'Strategisk partnerskap', desc: 'Co-branding, felles produktutvikling og delt markedsføring.' },
            ].map((item, i) => (
              <div key={item.phase} className="flex gap-6 md:gap-10">
                {/* Timeline line */}
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

      {/* ─── 8. Firmaspecifikke pitcher ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-tomtly-dark mb-6 text-center">
            Skreddersydd for din virksomhet
          </h2>
          <p className="text-brand-500 text-center mb-16 max-w-2xl mx-auto">
            Vi har analysert Norges ledende meglerkjeder og sett hvordan Tomtly passer inn hos hver enkelt.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FIRMS.map((firm) => {
              const isExpanded = expandedFirm === firm.name
              return (
                <div
                  key={firm.name}
                  className={`bg-white rounded-2xl border transition-all ${
                    isExpanded ? 'border-tomtly-accent ring-1 ring-tomtly-accent' : 'border-brand-200 hover:border-brand-300'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFirm(isExpanded ? null : firm.name)}
                    className="w-full text-left p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      {/* Logo placeholder */}
                      <div className="w-full h-14 bg-brand-50 rounded-lg flex items-center justify-center border border-brand-100">
                        <span className="font-display font-bold text-tomtly-dark">{firm.name}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-brand-500">Les vår pitch</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-brand-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-brand-400" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t border-brand-100 pt-4">
                      <p className="text-sm text-brand-700 leading-relaxed mb-5">{firm.pitch}</p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={firm.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-tomtly-accent hover:text-forest-600 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Last ned PDF
                        </a>
                        <Link
                          href={`/meglerpartner/${firm.slug}`}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-tomtly-dark transition-colors"
                        >
                          Se fullstendig side
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── 9. Kontakt ─── */}
      <section id="kontakt" className="py-24 md:py-32 bg-tomtly-dark text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-center">
            La oss ta en kaffe – digitalt eller fysisk
          </h2>
          <p className="text-brand-400 text-center mb-16 max-w-xl mx-auto">
            Vi tilpasser samarbeidet til akkurat deres behov. Uforpliktende samtale – null risiko.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              {sent ? (
                <div className="bg-forest-900/30 border border-forest-600/30 rounded-2xl p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-tomtly-accent mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold mb-2">Takk for henvendelsen!</h3>
                  <p className="text-brand-300">Vi tar kontakt innen 24 timer.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">Navn</label>
                    <input
                      type="text"
                      required
                      value={formData.navn}
                      onChange={(e) => setFormData({ ...formData, navn: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent"
                      placeholder="Ditt navn"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">Firma</label>
                    <input
                      type="text"
                      required
                      value={formData.firma}
                      onChange={(e) => setFormData({ ...formData, firma: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent"
                      placeholder="Ditt meglerfirma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">E-post</label>
                    <input
                      type="email"
                      required
                      value={formData.epost}
                      onChange={(e) => setFormData({ ...formData, epost: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent"
                      placeholder="din@epost.no"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">Telefon</label>
                    <input
                      type="tel"
                      value={formData.telefon}
                      onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent"
                      placeholder="Ditt telefonnummer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-brand-400 mb-1.5">Melding</label>
                    <textarea
                      rows={4}
                      value={formData.melding}
                      onChange={(e) => setFormData({ ...formData, melding: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent resize-none"
                      placeholder="Fortell gjerne litt om hva dere ser etter..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-tomtly-accent hover:bg-forest-600 text-white py-4 rounded-xl font-semibold transition-colors disabled:opacity-50"
                  >
                    {sending ? 'Sender...' : 'Send henvendelse'}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <p className="text-sm text-brand-400 mb-2">Ring Jakob direkte</p>
                <a href="tel:40603908" className="flex items-center gap-3 text-2xl font-display font-bold hover:text-tomtly-gold transition-colors">
                  <Phone className="w-6 h-6 text-tomtly-gold" />
                  40 60 39 08
                </a>
              </div>
              <div>
                <p className="text-sm text-brand-400 mb-2">E-post</p>
                <a href="mailto:hey@nops.no" className="flex items-center gap-3 text-xl font-display font-bold hover:text-tomtly-gold transition-colors">
                  <Mail className="w-6 h-6 text-tomtly-gold" />
                  hey@nops.no
                </a>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-4">
                <p className="text-sm text-brand-300 leading-relaxed">
                  Tomtly er en tjeneste fra NOPS AS (org.nr 933 819 086). Vi har autorisert meglerpartner og samarbeider med Propr for oppgjør.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
