'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Target,
  Users,
  Rocket,
  Wrench,
  BarChart3,
  DollarSign,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react'

const SECTIONS = [
  { id: 'malgrupper', label: 'Malgrupper', icon: Target },
  { id: 'pipeline', label: 'Pipeline', icon: Users },
  { id: 'gtm', label: 'Go-to-Market', icon: Rocket },
  { id: 'verktoy', label: 'Salgsverktoy', icon: Wrench },
  { id: 'kpier', label: 'KPIer', icon: BarChart3 },
  { id: 'kompensasjon', label: 'Kompensasjon', icon: DollarSign },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

export default function SalgPage() {
  const [activeSection, setActiveSection] = useState<SectionId>('malgrupper')

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-tomtly-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-brand-400 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Tilbake til admin
          </Link>
          <h1 className="font-display text-3xl font-bold">Salg av Tomtly &ndash; Go-to-Market Strategi</h1>
          <p className="text-brand-400 mt-2">Komplett salgsplaybook for Tomtly-teamet</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b border-brand-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === s.id
                    ? 'bg-tomtly-accent text-white'
                    : 'text-brand-500 hover:bg-brand-100'
                }`}
              >
                <s.icon className="w-4 h-4" />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {activeSection === 'malgrupper' && <Malgrupper />}
        {activeSection === 'pipeline' && <Pipeline />}
        {activeSection === 'gtm' && <GoToMarket />}
        {activeSection === 'verktoy' && <Salgsverktoy />}
        {activeSection === 'kpier' && <KPIer />}
        {activeSection === 'kompensasjon' && <Kompensasjon />}
      </div>
    </div>
  )
}

// ---- 1. Malgrupper ----

function Malgrupper() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Malgrupper & Prioritering"
        description="Oversikt over alle segmenter med beslutningsaker, storrelse og verdi."
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-brand-200">
                <th className="text-left py-3 pr-4 font-semibold text-brand-700">Segment</th>
                <th className="text-left py-3 px-4 font-semibold text-brand-700">Beslutningstaker</th>
                <th className="text-left py-3 px-4 font-semibold text-brand-700">Typisk storrelse</th>
                <th className="text-left py-3 px-4 font-semibold text-brand-700">Verdi for oss</th>
                <th className="text-left py-3 px-4 font-semibold text-brand-700">Prioritet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              <tr>
                <td className="py-3 pr-4 font-medium text-tomtly-dark">Tomteeiere (privat)</td>
                <td className="py-3 px-4 text-brand-600">Eier selv</td>
                <td className="py-3 px-4 text-brand-600">1 tomt</td>
                <td className="py-3 px-4 text-brand-600">9 900 kr / 4 990 kr + 2%</td>
                <td className="py-3 px-4"><PriorityBadge level="hoy" label="Hoy (volum)" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-tomtly-dark">Eiendomsmeglere</td>
                <td className="py-3 px-4 text-brand-600">Fagansvarlig / daglig leder</td>
                <td className="py-3 px-4 text-brand-600">5-50 meglere</td>
                <td className="py-3 px-4 text-brand-600">2 900 kr/analyse</td>
                <td className="py-3 px-4"><PriorityBadge level="hoy" label="Hoy (recurring)" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-tomtly-dark">Ferdighusleverandører</td>
                <td className="py-3 px-4 text-brand-600">Markedssjef / salgssjef</td>
                <td className="py-3 px-4 text-brand-600">10-200 ansatte</td>
                <td className="py-3 px-4 text-brand-600">10 000–20 000 kr/mnd</td>
                <td className="py-3 px-4"><PriorityBadge level="middels" label="Middels (strategisk)" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-tomtly-dark">Entreprenører</td>
                <td className="py-3 px-4 text-brand-600">Daglig leder</td>
                <td className="py-3 px-4 text-brand-600">5-30 ansatte</td>
                <td className="py-3 px-4 text-brand-600">3-8% provisjon</td>
                <td className="py-3 px-4"><PriorityBadge level="middels" label="Middels" /></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-medium text-tomtly-dark">Banker</td>
                <td className="py-3 px-4 text-brand-600">Produktsjef byggelan</td>
                <td className="py-3 px-4 text-brand-600">Stor</td>
                <td className="py-3 px-4 text-brand-600">Lead-fee</td>
                <td className="py-3 px-4"><PriorityBadge level="lav" label="Lav (lang syklus)" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// ---- 2. Pipeline ----

function Pipeline() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Pipeline & Salgssyklus"
        description="Forventet tid fra forste kontakt til signering per segment."
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-brand-200">
                <th className="text-left py-3 pr-4 font-semibold text-brand-700">Segment</th>
                <th className="text-left py-3 px-4 font-semibold text-brand-700">Kontakt &rarr; Demo</th>
                <th className="text-left py-3 px-4 font-semibold text-brand-700">Demo &rarr; Tilbud</th>
                <th className="text-left py-3 px-4 font-semibold text-brand-700">Tilbud &rarr; Sign.</th>
                <th className="text-left py-3 px-4 font-semibold text-brand-700">Total syklus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {[
                ['Tomteeiere', '0 dager (selvbetjent)', '0', '0-3 dager', '0-3 dager'],
                ['Meglere', '1-2 uker', '1 uke', '1-2 uker', '3-5 uker'],
                ['Leverandorer', '1-2 uker', '2 uker', '2-4 uker', '5-8 uker'],
                ['Entreprenører', '1 uke', '1 uke', '1 uke', '2-3 uker'],
                ['Banker', '2-4 uker', '4-8 uker', '4-8 uker', '3-6 mnd'],
              ].map(([segment, ...values]) => (
                <tr key={segment}>
                  <td className="py-3 pr-4 font-medium text-tomtly-dark">{segment}</td>
                  {values.map((v, i) => (
                    <td key={i} className="py-3 px-4 text-brand-600">{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// ---- 3. Go-to-Market ----

function GoToMarket() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Go-to-Market Faser"
        description="Trinnvis plan for å bygge opp Tomtly over 12 maneder."
      />

      <div className="space-y-6">
        <PhaseCard
          phase="Fase 1"
          period="Maned 1-3"
          title="Tomteeiere + Meglere"
          color="bg-blue-50 border-blue-200"
          goals={['50 tomtanalyser solgt', '3 meglere signert']}
          channels={['FINN.no-annonsering mot tomteeiere', 'Direkte kontakt med meglere som selger tomter på FINN', 'Organisk trafikk via SEO på tomtesider']}
        />

        <PhaseCard
          phase="Fase 2"
          period="Maned 3-6"
          title="Ferdighusleverandører"
          color="bg-green-50 border-green-200"
          goals={['5 leverandorer signert']}
          channels={['Direktekontakt med salgs-/markedssjef', 'Vise resultater fra fase 1 (trafikk, konvertering)', 'Bransjetreff og messer']}
        />

        <PhaseCard
          phase="Fase 3"
          period="Maned 6-12"
          title="Entreprenører + Banker"
          color="bg-amber-50 border-amber-200"
          goals={['10 entreprenører i nettverket', '1 banksamarbeid']}
          channels={['Referanser fra leverandorer og meglere', 'Bransjetreff', 'Case studies fra gjennomforte prosjekter']}
        />
      </div>
    </div>
  )
}

// ---- 4. Salgsverktoy ----

function Salgsverktoy() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Salgsverktoy"
        description="Verktoy og materiell for salgsteamet."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <ExternalLink className="w-5 h-5 text-tomtly-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-tomtly-dark mb-1">Tomtly.no som demo</h4>
              <p className="text-sm text-brand-600">Vis ekte tomter med analyse, husmodeller og budsjett. Beste salgsverktoy.</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <BarChart3 className="w-5 h-5 text-tomtly-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-tomtly-dark mb-1">Pitch-deck</h4>
              <p className="text-sm text-brand-600 mb-2">Tilpasset pitch per segment.</p>
              <Link href="/admin/pitch" className="text-sm text-tomtly-accent hover:underline font-medium">
                Apne pitch-materiell &rarr;
              </Link>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-tomtly-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-tomtly-dark mb-1">Case studies</h4>
              <p className="text-sm text-brand-600">Bjornemyrveien 20 &amp; 22 (Nesodden) og Gamle Alvaernvei 67 (Nesodden).</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-tomtly-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-tomtly-dark mb-1">ROI-kalkulator for meglere</h4>
              <p className="text-sm text-brand-600">Vis hvor mye en megler tjener på Tomtly vs. tradisjonelt tomtesalg.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

// ---- 5. KPIer ----

function KPIer() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="KPIer for salgsansvarlig"
        description="Månedlige mål for salgsansvarlig."
      />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-brand-200">
                <th className="text-left py-3 pr-4 font-semibold text-brand-700">Metrikk</th>
                <th className="text-right py-3 px-4 font-semibold text-brand-700">Maned 1</th>
                <th className="text-right py-3 px-4 font-semibold text-brand-700">Maned 3</th>
                <th className="text-right py-3 px-4 font-semibold text-brand-700">Maned 6</th>
                <th className="text-right py-3 px-4 font-semibold text-brand-700">Maned 12</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-100">
              {[
                ['Tomtanalyser solgt', '10', '30', '80', '150'],
                ['Meglere signert', '1', '3', '8', '15'],
                ['Leverandorer signert', '0', '2', '5', '10'],
                ['MRR', '50 000 kr', '200 000 kr', '500 000 kr', '1 200 000 kr'],
                ['Pipeline-verdi', '500 000 kr', '2 000 000 kr', '5 000 000 kr', '15 000 000 kr'],
              ].map(([metrikk, ...values]) => (
                <tr key={metrikk}>
                  <td className="py-3 pr-4 font-medium text-tomtly-dark">{metrikk}</td>
                  {values.map((v, i) => (
                    <td key={i} className={`py-3 px-4 text-right ${metrikk === 'MRR' || metrikk === 'Pipeline-verdi' ? 'font-bold text-tomtly-dark' : 'text-brand-600'}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

// ---- 6. Kompensasjon ----

function Kompensasjon() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Kompensasjonsmodell (forslag)"
        description="Forslag til kompensasjonsmodell for salgsansvarlig."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h4 className="font-semibold text-tomtly-dark mb-4">Fast kompensasjon</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-brand-50 rounded-xl border border-brand-100">
              <span className="text-sm text-brand-700">Fastlonn</span>
              <span className="text-lg font-bold text-tomtly-dark">45 000 kr/mnd</span>
            </div>
          </div>
        </Card>

        <Card>
          <h4 className="font-semibold text-tomtly-dark mb-4">Variabel kompensasjon</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-brand-50 rounded-lg border border-brand-100">
              <span className="text-sm text-brand-700">Provisjon</span>
              <span className="text-sm font-bold text-tomtly-dark">10% av MRR fra egne kunder i 12 mnd</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-brand-50 rounded-lg border border-brand-100">
              <span className="text-sm text-brand-700">Bonus per leverandor</span>
              <span className="text-sm font-bold text-tomtly-dark">25 000 kr</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-brand-50 rounded-lg border border-brand-100">
              <span className="text-sm text-brand-700">Bonus per megler</span>
              <span className="text-sm font-bold text-tomtly-dark">10 000 kr</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="bg-green-50 rounded-2xl border border-green-200 p-8 text-center">
        <p className="text-sm font-medium text-green-700 mb-2">OTE (On Target Earnings)</p>
        <p className="text-4xl font-bold text-green-800">700 000 - 900 000 kr/ar</p>
        <p className="text-sm text-green-600 mt-2">Fastlonn 540 000 kr + variabel 160 000 - 360 000 kr</p>
      </div>
    </div>
  )
}

// ---- Shared components ----

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-brand-200 p-6 lg:p-8">
      {children}
    </div>
  )
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-2">
      <h2 className="font-display text-2xl font-bold text-tomtly-dark">{title}</h2>
      <p className="text-brand-600 mt-1">{description}</p>
    </div>
  )
}

function PriorityBadge({ level, label }: { level: 'hoy' | 'middels' | 'lav'; label: string }) {
  const colors = {
    hoy: 'bg-green-100 text-green-700',
    middels: 'bg-amber-100 text-amber-700',
    lav: 'bg-brand-100 text-brand-600',
  }
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${colors[level]}`}>
      {label}
    </span>
  )
}

function PhaseCard({
  phase,
  period,
  title,
  color,
  goals,
  channels,
}: {
  phase: string
  period: string
  title: string
  color: string
  goals: string[]
  channels: string[]
}) {
  return (
    <div className={`rounded-2xl border p-6 lg:p-8 ${color}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white rounded-full text-xs font-bold text-brand-700 border border-brand-200">{phase}</span>
        <span className="text-sm font-medium text-brand-600">{period}</span>
      </div>
      <h3 className="font-display text-xl font-bold text-tomtly-dark mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold text-brand-700 mb-2">Mal</h4>
          <ul className="space-y-2">
            {goals.map((g) => (
              <li key={g} className="flex items-start gap-2 text-sm text-brand-700">
                <Target className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                {g}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-brand-700 mb-2">Kanaler</h4>
          <ul className="space-y-2">
            {channels.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-brand-700">
                <Rocket className="w-4 h-4 text-tomtly-accent flex-shrink-0 mt-0.5" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
