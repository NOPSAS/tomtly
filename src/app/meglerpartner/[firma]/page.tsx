'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Download, Phone, Mail, CheckCircle2, ArrowRight, TrendingUp, Clock, Shield, Users, Target, Zap, BarChart3, XCircle } from 'lucide-react'
import { useState, FormEvent } from 'react'

const FIRMS: Record<string, {
  name: string
  pitch: string
  pdfUrl: string
  coverImage: string
  highlights: string[]
  whyFit: string
  brandBoost: string[]
}> = {
  nordvik: {
    name: 'Nordvik',
    pitch: 'Dere bygde Hjem.no og satser på teknologi. Tomtly er neste steg – en plattform som leverer ferdige tomtekunder rett til deres meglere. Med 33 kontorer og Norges mest tech-fremoverlente meglerkultur er Nordvik den perfekte partneren.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/4jg63skxx5trbtx/e018f3d2f30e825f4ebd659024ee7207/Tomtly-Nordvik-Norges-smarteste-tomtesalg.pdf',
    coverImage: 'https://cdn.gamma.app/lvw0v8zk7xu9hk5/generated-images/stUL0GGcrwoHjbpdHJ5Sp.png',
    highlights: [
      '33 kontorer med tech-fremoverlent kultur',
      'Hjem.no viser innovasjonskraft',
      'Tomtly passer som naturlig utvidelse',
      'Ferdige tomtekunder rett til meglerne',
    ],
    whyFit: 'Nordvik har allerede bevist at dere tør å satse digitalt med Hjem.no. Tomtly gir dere en helt ny vertikal – tomtesalg – uten at dere trenger å bygge noe selv. Med 33 kontorer har dere infrastrukturen til å ta i mot ferdige salgsoppdrag fra dag én.',
    brandBoost: [
      'Nordvik blir det første meglerfirmaet i Norge med en dedikert tomteplattform',
      'Co-branding: «Tomtly × Nordvik» synliggjør dere som innovasjonsleder i bransjen',
      'Tomtly-kunder i deres område vil automatisk bli koblet med Nordvik-meglere',
      'PR-verdi: «Nordvik revolusjonerer tomtesalg» – en historie mediene vil dekke',
    ],
  },
  proaktiv: {
    name: 'Proaktiv',
    pitch: 'Dere har erfaring med prosjektsalg og næringseiendom. Tomtly gir dere en ferdig pipeline av tomtesalg uten ekstra arbeid. Med 20+ kontorer i Norges største byer er infrastrukturen på plass.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/drk8we12akb2y37/3b677f9dcf30921e7a3cd654413d3aed/Tomtesalg-som-ny-inntektsstrom.pdf',
    coverImage: 'https://cdn.gamma.app/lvw0v8zk7xu9hk5/generated-images/YHwa8bj2bnq6qJvC4cnxN.png',
    highlights: [
      '20+ kontorer i Norges største byer',
      'Prosjektsalgskompetanse = naturlig overgang',
      'Ferdig pipeline uten ekstra arbeid',
      'Ny inntektsstrøm uten nye ansettelser',
    ],
    whyFit: 'Proaktiv har allerede kompetansen på prosjektsalg og næringseiendom. Tomtesalg er den naturlige utvidelsen – og med Tomtly trenger dere verken utvikle plattform eller drive prospektering. Alt dere trenger å gjøre er å gjennomføre salget.',
    brandBoost: [
      'Proaktiv posisjoneres som en fullservice-aktør som også dekker tomtesegmentet',
      'Tomtly-leads i storbyene kanaliseres direkte til Proaktivs kontorer',
      'Prosjektsalgskompetansen deres gir dere et forsprang – tomtesalg er enklere enn nybyggsalg',
      'Synlighet i et nytt segment uten markedsføringskostnader',
    ],
  },
  privatmegleren: {
    name: 'PrivatMegleren',
    pitch: 'Med Kvadrat, KLiKK og egen AI-assistent er dere Norges mest teknologidrevne meglerkjede. Tomtly passer perfekt inn i deres digitale økosystem – en ny vertikal som leverer tomtekunder til 70+ kontorer.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/qvophp02z2dgvnv/c60504bfd50629304b42b9d323ea62fc/En-ny-vertikal-for-Norges-mest-digitale-meglerkjede.pdf',
    coverImage: 'https://cdn.gamma.app/lvw0v8zk7xu9hk5/generated-images/Wloio0pon_Wlz9CmUPH1y.png',
    highlights: [
      '70+ kontorer over hele Norge',
      'Norges mest teknologidrevne meglerkjede',
      'Tomtesalg som ny vertikal',
      'Ingen utviklingskostnader',
    ],
    whyFit: 'PrivatMegleren har investert tungt i teknologi – Kvadrat, KLiKK, AI-assistent. Tomtly passer som hånd i hanske i dette økosystemet. Med 70+ kontorer kan dere dekke hele Norge, og med Tomtly får dere en ferdig vertikal uten en krone i utviklingskostnader.',
    brandBoost: [
      'PrivatMegleren forsterker sin posisjon som Norges mest digitale meglerkjede',
      'Tomtly integreres i deres teknologistack – en ny vertikal i Kvadrat-porteføljen',
      'Deres 70+ kontorer gir umiddelbar nasjonal dekning for tomtesalg',
      'Tomtly-samarbeidet er en story som forsterker «PrivatMegleren = innovasjon»-narrativet',
    ],
  },
  garanti: {
    name: 'Garanti',
    pitch: 'Med 48 kontorer og sterk tilstedeværelse i hele Norge – inkludert distriktene der de fleste tomtene ligger – er Garanti unikt posisjonert. Eierskapet fra 35 boligbyggelag gir direkte tilgang til utbyggere.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/1urdsmic3hfepyz/d0a58874b18eee37ec8b238dbf2b4310/Tomtesalg-i-hele-Norge-fra-by-til-bygd.pdf',
    coverImage: 'https://cdn.gamma.app/lvw0v8zk7xu9hk5/generated-images/2yOh982yfP4hHZYlTth5x.png',
    highlights: [
      '48 kontorer – sterkest i distriktene',
      '35 boligbyggelag som eiere',
      'Direkte tilgang til utbyggere',
      'Naturlig kobling tomtesalg + boligbygging',
    ],
    whyFit: 'Garanti er sterkest der tomtene faktisk ligger – i distriktene. Med 35 boligbyggelag som eiere har dere en unik kobling mellom tomtesalg og boligutvikling. Tomtly leverer ferdige tomte-leads til deres lokale meglere, som allerede kjenner markedet.',
    brandBoost: [
      'Garanti blir den foretrukne meglerpartneren for tomtesalg i hele Norge',
      'Boligbyggelagene deres kan bruke tomtesalg som en ny tjeneste til medlemmene',
      'Distriktskontorene får endelig en digital kanal for tomtesalg – et segment de i dag mister',
      'Samarbeidet forsterker Garantis posisjon som den nasjonale meglerkjeden «for alle»',
    ],
  },
  aktiv: {
    name: 'Aktiv',
    pitch: 'Med 90+ kontorer og strategisk satsing på innovasjon er Aktiv allerede i bevegelse. Tomtly gir dere en ferdig plattform for tomtesalg som passer inn i deres innovasjonsagenda – uten utviklingskostnader.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/5797e6hi2xrzd5y/7f4cf82af063865754fe0cc65203b4e6/Tomtly-Aktiv-Tomtesalg-i-stor-skala.pdf',
    coverImage: 'https://cdn.gamma.app/lvw0v8zk7xu9hk5/generated-images/WKlAU76kHqOabUCYupXxs.png',
    highlights: [
      'Norges største meglernettverk med 90+ kontorer',
      'Strategisk satsing på innovasjon',
      'Ferdig plattform uten utviklingskostnader',
      'Tomtesalg som uutnyttet marked',
    ],
    whyFit: 'Aktiv har Norges største meglernetteverk med 90+ kontorer. Det betyr at dere kan ta i mot tomte-leads over hele landet – fra dag én. Med Tomtly får Aktivs meglere en ny inntektsstrøm uten ekstra prospektering, markedsføring eller overhead.',
    brandBoost: [
      'Aktiv utnytter sitt størst-i-Norge-fortrinn til å dominere et nytt segment',
      '90+ kontorer gir dere en skaleringsfordel ingen andre meglerkjeder kan matche',
      'Tomtly-samarbeidet posisjonerer Aktiv som den mest komplette meglerkjeden',
      'Innovasjonsagendaen deres får en konkret ny tjeneste å vise til',
    ],
  },
  'roisland': {
    name: 'Røisland & Co',
    pitch: 'Dere er spesialister på prosjektsalg av nybygg. Tomtly leverer det som kommer FØR prosjektsalget – tomtene. Sammen dekker vi hele verdikjeden fra rå tomt til ferdig bolig.',
    pdfUrl: 'https://assets.api.gamma.app/export/pdf/sxddlzhdl7cu146/1e0701bc39c57abfcf35e981dfc15d40/Fra-ra-tomt-til-ferdig-bolig.pdf',
    coverImage: 'https://cdn.gamma.app/lvw0v8zk7xu9hk5/generated-images/sKQgDprIRl1-TZ5eFpJWe.png',
    highlights: [
      'Spesialister på prosjektsalg av nybygg',
      'Tomtly leverer det som kommer FØR prosjektsalget',
      'Komplett verdikjede: rå tomt → ferdig bolig',
      'Naturlige synergier med eksisterende virksomhet',
    ],
    whyFit: 'Røisland & Co er spesialister på prosjektsalg av nybygg. Men hva kommer FØR prosjektsalget? Tomten. Tomtly leverer den første brikken i puslespillet – analyserte, markedsførte tomter med kvalifiserte kjøpere. Sammen dekker vi hele verdikjeden.',
    brandBoost: [
      'Røisland & Co blir den eneste megleren som dekker hele verdikjeden: tomt → nybygg',
      'Tomtesalgene deres kan føre til prosjektsalg – dobbel inntekt fra samme kunde',
      'Utbyggerne dere allerede jobber med får en ny kanal for tomtekjøp',
      'Posisjonering som «Norges mest komplette partner for eiendomsutvikling»',
    ],
  },
}

export default function FirmaPage() {
  const params = useParams()
  const slug = params.firma as string
  const firm = FIRMS[slug]

  const [formData, setFormData] = useState({ navn: '', epost: '', telefon: '', melding: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  if (!firm) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-tomtly-dark mb-4">Firma ikke funnet</h1>
          <p className="text-brand-500 mb-8">Vi fant ikke denne siden.</p>
          <Link href="/meglerpartner" className="text-tomtly-accent hover:text-forest-600 font-semibold">
            ← Tilbake til meglerpartner
          </Link>
        </div>
      </div>
    )
  }

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
          ekstra: { firma: firm.name },
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

      {/* ─── Hero ─── */}
      <section className="bg-tomtly-dark text-white">
        <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <Link
            href="/meglerpartner"
            className="inline-flex items-center gap-2 text-brand-400 hover:text-white text-sm mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Alle meglerpartnere
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <Link href="/" className="font-display text-2xl font-bold tracking-tight text-white">Tomtly</Link>
            <span className="text-brand-500">×</span>
            <span className="font-display text-2xl font-bold">{firm.name}</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            Partnerforslag for {firm.name}
          </h1>

          <p className="text-lg text-brand-300 max-w-2xl leading-relaxed mb-10">
            {firm.pitch}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#okonomi"
              className="inline-flex items-center gap-2 bg-tomtly-accent hover:bg-forest-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Se hva dere kan tjene
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              Ta kontakt
            </a>
          </div>
        </div>
      </section>

      {/* ─── Hvorfor dette passer ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-4">
            Hvorfor Tomtly passer for {firm.name}
          </h2>
          <p className="text-brand-600 mb-10 max-w-3xl leading-relaxed text-lg">
            {firm.whyFit}
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {firm.highlights.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-brand-50 rounded-xl p-5 border border-brand-100">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent mt-0.5 flex-shrink-0" />
                <span className="text-brand-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hva er Tomtly ─── */}
      <section className="py-16 md:py-24 bg-brand-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-4">
            Hva er Tomtly?
          </h2>
          <p className="text-brand-600 mb-12 max-w-3xl leading-relaxed">
            Tomtly er Norges første plattform som digitaliserer hele verdikjeden for tomtesalg – fra analyse til ferdig salg via autorisert megler.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Analyserer', desc: 'Vi analyserer tomter med offentlige data, reguleringsplaner og fagkompetanse. Resultatet er en komplett mulighetsstudie med husmodeller, 3D-visualisering og byggekalkyle.' },
              { icon: Users, title: 'Markedsfører', desc: 'Vi markedsfører tomten mot kvalifiserte kjøpere gjennom Tomtly-plattformen, sosiale medier og annonsering. Resultatet er varme leads – klare til å kjøpe.' },
              { icon: Zap, title: 'Leverer', desc: 'Vi leverer ferdige salgsoppdrag til meglerpartneren. Alt forarbeid er gjort – megleren trenger bare gjennomføre salget og oppgjøret.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-brand-200">
                <div className="w-11 h-11 rounded-xl bg-tomtly-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-tomtly-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-tomtly-dark mb-2">{title}</h3>
                <p className="text-sm text-brand-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Slik fungerer samarbeidet ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-4">
            Slik fungerer samarbeidet
          </h2>
          <p className="text-brand-600 mb-12 max-w-3xl leading-relaxed">
            Tomtly gjør alt tungt arbeid. {firm.name} gjennomfører salget. Enkel arbeidsdeling – maksimal inntekt.
          </p>

          <div className="overflow-x-auto mb-12">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-brand-200">
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Steg</th>
                  <th className="text-left py-4 pr-4 text-sm font-semibold text-brand-500 uppercase tracking-wider">Aktivitet</th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-tomtly-accent uppercase tracking-wider">Tomtly</th>
                  <th className="text-center py-4 pl-4 text-sm font-semibold text-tomtly-gold uppercase tracking-wider">{firm.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100">
                {[
                  { step: '1', activity: 'Tomteanalyse og mulighetsstudie', tomtly: true, megler: false },
                  { step: '2', activity: 'Husmodeller, 3D og byggekalkyle', tomtly: true, megler: false },
                  { step: '3', activity: 'Markedsføring og leadgenerering', tomtly: true, megler: false },
                  { step: '4', activity: 'Kvalifisering av kjøpere', tomtly: true, megler: false },
                  { step: '5', activity: 'Salgsoppdrag og visning', tomtly: false, megler: true },
                  { step: '6', activity: 'Budrunde og aksept', tomtly: false, megler: true },
                  { step: '7', activity: 'Oppgjør (via Proff Oppgjør)', tomtly: false, megler: true },
                ].map((row) => (
                  <tr key={row.step} className="hover:bg-brand-50 transition-colors">
                    <td className="py-4 pr-4">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-100 text-sm font-bold text-tomtly-dark">
                        {row.step}
                      </span>
                    </td>
                    <td className="py-4 pr-4 text-sm font-medium text-tomtly-dark">{row.activity}</td>
                    <td className="py-4 px-4 text-center">
                      {row.tomtly && <span className="text-tomtly-accent text-lg">&#10003;</span>}
                    </td>
                    <td className="py-4 pl-4 text-center">
                      {row.megler && <span className="text-tomtly-gold text-lg">&#10003;</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Hva megler IKKE trenger å gjøre */}
          <div className="bg-forest-50 rounded-2xl p-8 border border-tomtly-accent/20">
            <h3 className="font-display text-lg font-bold text-tomtly-dark mb-5">
              Hva {firm.name} slipper å gjøre
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Ingen prospektering eller kaldringning',
                'Ingen markedsføringsbudsjett',
                'Ingen tomteanalyse eller reguleringssjekk',
                'Ingen annonsering eller leadgenerering',
                'Ingen fotografi eller 3D-modellering',
                'Ingen oppstartskostnader',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <XCircle className="w-4 h-4 text-tomtly-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-brand-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Økonomi ─── */}
      <section id="okonomi" className="py-16 md:py-24 bg-tomtly-dark text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-tomtly-gold font-mono text-sm uppercase tracking-widest mb-4">Økonomien</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Slik tjener {firm.name} penger med Tomtly
          </h2>
          <p className="text-brand-300 mb-16 max-w-2xl leading-relaxed">
            Ren provisjonsinntekt på salgsoppdrag som leveres ferdig til deres meglere. Ingen kostnader, ingen risiko – bare inntekt.
          </p>

          {/* Eksempel-boks */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 mb-12">
            <h3 className="font-display text-xl font-bold mb-8 text-tomtly-gold">Eksempel – ett tomtesalg</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Gjennomsnittlig tomtepris</span>
                  <span className="font-mono font-bold">2 000 000 kr</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Provisjonssats</span>
                  <span className="font-mono font-bold">2 %</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Tilretteleggingsgebyr</span>
                  <span className="font-mono font-bold">40 000 kr</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Tomtly beholder (65 %)</span>
                  <span className="font-mono text-brand-400">32 500 kr</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-white font-semibold">{firm.name}s andel (35 %)</span>
                  <span className="font-mono font-bold text-2xl text-tomtly-gold">17 500 kr</span>
                </div>
              </div>
              <div className="space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Tidsbruk for megler</span>
                  <span className="font-mono font-bold">3–5 timer</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Effektiv timelønn</span>
                  <span className="font-mono font-bold text-tomtly-gold">3 500 – 5 800 kr/t</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Markedsføringskostnad</span>
                  <span className="font-mono font-bold text-tomtly-gold">0 kr</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-3">
                  <span className="text-brand-300">Prospekteringskostnad</span>
                  <span className="font-mono font-bold text-tomtly-gold">0 kr</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-white font-semibold">Oppstartskostnad</span>
                  <span className="font-mono font-bold text-2xl text-tomtly-gold">0 kr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sammenligning */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 mb-12">
            <h3 className="font-display text-xl font-bold mb-8">Tomtly-salg vs. vanlig boligsalg</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-3 pr-4 text-sm font-semibold text-brand-400" />
                    <th className="text-center py-3 px-4 text-sm font-semibold text-brand-400">Vanlig boligsalg</th>
                    <th className="text-center py-3 pl-4 text-sm font-semibold text-tomtly-gold">Tomtly-salg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {[
                    { label: 'Prospektering', vanlig: 'Megler gjør selv', tomtly: 'Tomtly leverer' },
                    { label: 'Markedsføring', vanlig: 'Megler betaler', tomtly: 'Tomtly betaler' },
                    { label: 'Analyse og foto', vanlig: 'Megler organiserer', tomtly: 'Tomtly leverer ferdig' },
                    { label: 'Leads', vanlig: 'Må genereres', tomtly: 'Ferdig kvalifiserte' },
                    { label: 'Tidsbruk', vanlig: '15–30 timer', tomtly: '3–5 timer' },
                    { label: 'Risiko', vanlig: 'Høy (tid investert)', tomtly: 'Null (ingen kostnader)' },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="py-4 pr-4 text-sm font-medium text-white">{row.label}</td>
                      <td className="py-4 px-4 text-center text-sm text-brand-400">{row.vanlig}</td>
                      <td className="py-4 pl-4 text-center text-sm font-semibold text-tomtly-gold">{row.tomtly}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Volumtabell */}
          <h3 className="font-display text-xl font-bold mb-8">Volumtabell – {firm.name}s årlige inntekt</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-4 pr-8 text-sm font-semibold text-brand-400 uppercase tracking-wider">Salg/mnd</th>
                  <th className="text-right py-4 px-8 text-sm font-semibold text-brand-400 uppercase tracking-wider">{firm.name} per mnd</th>
                  <th className="text-right py-4 pl-8 text-sm font-semibold text-brand-400 uppercase tracking-wider">{firm.name} per år</th>
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

          <p className="text-sm text-brand-400 mt-8">
            Basert på gjennomsnittlig tomtepris 2 MNOK og 2 % suksesshonorar + mva med 65/35 split (Tomtly/{firm.name}).
          </p>
        </div>
      </section>

      {/* ─── Merkevarebygging ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-tomtly-accent" />
            <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark">
              Slik styrker Tomtly merkevaren til {firm.name}
            </h2>
          </div>
          <p className="text-brand-600 mb-12 max-w-3xl leading-relaxed">
            Et Tomtly-partnerskap handler ikke bare om inntekt. Det posisjonerer {firm.name} som en innovativ, fremoverlent aktør i et nytt segment.
          </p>

          <div className="space-y-4">
            {firm.brandBoost.map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-brand-50 rounded-xl p-6 border border-brand-100">
                <div className="w-8 h-8 rounded-full bg-tomtly-accent text-white flex items-center justify-center font-mono font-bold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-brand-700 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Samarbeidsmodell ─── */}
      <section className="py-16 md:py-24 bg-brand-50">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-12">
            Fleksibelt partnerskap – tilpasset {firm.name}
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: Shield, title: 'Ingen risiko', desc: '3 måneders pilot – helt uforpliktende. Ingen oppstartskostnader, ingen bindingstid. Fungerer det ikke? Ingen tap.' },
              { icon: BarChart3, title: 'Ren inntekt', desc: 'Tomtly bærer alle kostnader for analyse, markedsføring og leadgenerering. Megleren fakturerer kunden direkte.' },
              { icon: Clock, title: 'Minimal tidsbruk', desc: '3–5 timer per salg. Alle leads er ferdig kvalifiserte og analyserte. Megleren gjør kun salg og oppgjør.' },
              { icon: TrendingUp, title: 'Skalerbart', desc: 'Start med noen få salg, skaler opp basert på resultater. Fra regional pilot til nasjonal avtale.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-7 border border-brand-200">
                <div className="w-11 h-11 rounded-xl bg-tomtly-accent/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-tomtly-accent" />
                </div>
                <h3 className="font-display text-lg font-bold text-tomtly-dark mb-2">{title}</h3>
                <p className="text-sm text-brand-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Tidslinje */}
          <h3 className="font-display text-xl font-bold text-tomtly-dark mb-8">Vekstplan</h3>
          <div className="space-y-0">
            {[
              { phase: 'Fase 1', period: 'Mnd 1–3', title: 'Pilot', desc: '5–10 salg. Test samarbeidet i praksis med lav risiko. Evaluering etter 3 måneder.' },
              { phase: 'Fase 2', period: 'Mnd 4–6', title: 'Ekspansjon', desc: 'Skalerer til 3–5 regioner basert på pilotresultater. Dedikert partnerkontakt.' },
              { phase: 'Fase 3', period: 'Mnd 7–12', title: 'Nasjonal utrulling', desc: 'Full dekning. Volumbonuser og faste rutiner. Integrering i meglerens systemer.' },
              { phase: 'Fase 4', period: 'År 2+', title: 'Strategisk partnerskap', desc: 'Co-branding, felles produktutvikling, delt markedsføring og sterkere split.' },
            ].map((item, i) => (
              <div key={item.phase} className="flex gap-6 md:gap-10">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 rounded-full bg-tomtly-accent border-4 border-brand-50 ring-2 ring-tomtly-accent" />
                  {i < 3 && <div className="w-0.5 h-full bg-brand-200 min-h-[80px]" />}
                </div>
                <div className="pb-10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono font-bold text-tomtly-accent bg-forest-50 px-2 py-1 rounded">{item.phase}</span>
                    <span className="text-xs text-brand-500">{item.period}</span>
                  </div>
                  <h4 className="font-display text-lg font-bold text-tomtly-dark mb-1">{item.title}</h4>
                  <p className="text-brand-600 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── No-brainer oppsummering ─── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-12">
            Hvorfor dette er en «no-brainer» for {firm.name}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {[
              { value: '0 kr', label: 'Oppstartskostnad' },
              { value: '0 kr', label: 'Markedsføring' },
              { value: '0', label: 'Risiko' },
              { value: '35 %', label: 'Provisjonsandel' },
            ].map((stat) => (
              <div key={stat.label} className="bg-brand-50 rounded-2xl p-6 border border-brand-100">
                <p className="font-display text-3xl font-bold text-tomtly-accent mb-1">{stat.value}</p>
                <p className="text-xs text-brand-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-tomtly-dark text-white rounded-2xl p-8 md:p-10">
            <p className="text-lg leading-relaxed mb-6">
              {firm.name} investerer <span className="text-tomtly-gold font-bold">ingenting</span>. Tomtly leverer ferdige salgsoppdrag. {firm.name} gjennomfører salget og beholder <span className="text-tomtly-gold font-bold">35 % av provisjonen</span>. Enklere enn et vanlig boligsalg – med høyere timelønn.
            </p>
            <p className="text-brand-400 text-sm">
              Spørsmålet er ikke om {firm.name} har råd til å si ja. Spørsmålet er om dere har råd til å si nei – mens konkurrentene sier ja.
            </p>
          </div>
        </div>
      </section>

      {/* ─── PDF-nedlasting ─── */}
      <section id="presentasjon" className="py-16 md:py-24 bg-brand-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-tomtly-dark mb-10">
            Last ned full presentasjon
          </h2>

          <a
            href={firm.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden border border-brand-200 shadow-lg hover:shadow-xl transition-all hover:border-tomtly-accent"
          >
            <div className="relative aspect-[16/9] bg-brand-100 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={firm.coverImage}
                alt={`Tomtly × ${firm.name} – forside`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-white/80 text-sm mb-2">Partnerforslag</p>
                <p className="text-white font-display text-2xl font-bold">Tomtly × {firm.name}</p>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-5 shadow-xl">
                  <Download className="w-8 h-8 text-tomtly-accent" />
                </div>
              </div>
            </div>
            <div className="bg-white px-8 py-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-tomtly-dark">Last ned presentasjon (PDF)</span>
              <Download className="w-5 h-5 text-tomtly-accent" />
            </div>
          </a>
        </div>
      </section>

      {/* ─── Kontakt ─── */}
      <section id="kontakt" className="py-16 md:py-24 bg-tomtly-dark text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            La oss ta en kaffe – digitalt eller fysisk
          </h2>
          <p className="text-brand-400 mb-12 max-w-xl">
            Vi tilpasser samarbeidet til akkurat {firm.name}s behov. Uforpliktende samtale – null risiko.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
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
                      rows={3}
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
              <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                <p className="text-sm text-brand-300 leading-relaxed">
                  Tomtly er en tjeneste fra NOPS AS (org.nr 933 819 086). Vi har autorisert meglerpartner og samarbeider med Proff Oppgjør AS for oppgjør.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
