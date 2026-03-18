'use client'

import { useState } from 'react'
import { TrendingUp, Home, Building2, ArrowRight } from 'lucide-react'
import { formatNOK, formatM2, formatProsent } from '@/lib/utils'

interface Scenario {
  id: string
  navn: string
  beskrivelse: string
  type: 'konservativ' | 'moderat' | 'ambisios'
  enheter: {
    type: string
    antall: number
    bra_m2: number
    soverom: number
    estimert_pris: number
  }[]
  total_bra_m2: number
  utnyttelsesgrad: number
  estimert_byggekostnad: number
  estimert_salgsverdi: number
  estimert_fortjeneste: number
  roi_prosent: number
}

interface Props {
  scenarioer: Scenario[]
}

const TYPE_LABEL = {
  konservativ: { label: 'Konservativ', color: 'bg-blue-100 text-blue-700' },
  moderat: { label: 'Moderat', color: 'bg-green-100 text-green-700' },
  ambisios: { label: 'Ambisiøs', color: 'bg-purple-100 text-purple-700' },
}

export function TomtScenario({ scenarioer }: Props) {
  const [activeIdx, setActiveIdx] = useState(1) // Start med moderat
  const active = scenarioer[activeIdx]

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Utviklingsscenarioer
      </h2>
      <p className="text-brand-600 mb-8">
        Tre scenarioer med ulik risikovilje og avkastning.
      </p>

      {/* Scenario tabs */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {scenarioer.map((s, idx) => {
          const typeInfo = TYPE_LABEL[s.type]
          return (
            <button
              key={s.id}
              onClick={() => setActiveIdx(idx)}
              className={`text-left p-4 rounded-xl border-2 transition-all ${
                activeIdx === idx
                  ? 'border-tomtly-accent bg-forest-50'
                  : 'border-brand-200 hover:border-brand-300'
              }`}
            >
              <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${typeInfo.color} mb-2`}>
                {typeInfo.label}
              </span>
              <p className="font-semibold text-tomtly-dark text-sm">{s.navn}</p>
              <p className="text-lg font-bold text-tomtly-accent mt-1">
                {formatProsent(s.roi_prosent)} ROI
              </p>
            </button>
          )
        })}
      </div>

      {/* Aktivt scenario detaljer */}
      <div className="bg-white border border-brand-200 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-brand-100">
          <h3 className="font-semibold text-lg text-tomtly-dark mb-2">
            {active.navn}
          </h3>
          <p className="text-sm text-brand-600">{active.beskrivelse}</p>
        </div>

        {/* Nøkkeltall */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-100 border-b border-brand-100">
          <div className="p-4 text-center">
            <p className="text-xs text-brand-500">Total BRA</p>
            <p className="text-lg font-bold text-tomtly-dark">{formatM2(active.total_bra_m2)}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-brand-500">Utnyttelse</p>
            <p className="text-lg font-bold text-tomtly-dark">{formatProsent(active.utnyttelsesgrad)}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-brand-500">Byggekostnad</p>
            <p className="text-lg font-bold text-tomtly-dark">{formatNOK(active.estimert_byggekostnad)}</p>
          </div>
          <div className="p-4 text-center">
            <p className="text-xs text-brand-500">Salgsverdi</p>
            <p className="text-lg font-bold text-tomtly-accent">{formatNOK(active.estimert_salgsverdi)}</p>
          </div>
        </div>

        {/* Enheter */}
        <div className="p-6">
          <h4 className="text-sm font-semibold text-brand-700 mb-3">Enheter</h4>
          <div className="space-y-3">
            {active.enheter.map((e, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-brand-50 rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5 text-brand-400" />
                  <div>
                    <p className="text-sm font-medium text-tomtly-dark">
                      {e.antall}x {e.type} – {e.bra_m2} m²
                    </p>
                    <p className="text-xs text-brand-500">{e.soverom} soverom</p>
                  </div>
                </div>
                <span className="font-semibold text-sm text-tomtly-dark">
                  {formatNOK(e.estimert_pris)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Fortjeneste */}
        <div className="bg-forest-50 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-forest-700">Estimert fortjeneste</p>
            <p className="text-2xl font-bold text-tomtly-accent">
              {formatNOK(active.estimert_fortjeneste)}
            </p>
          </div>
          <div className="flex items-center gap-2 text-tomtly-accent">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg font-bold">{formatProsent(active.roi_prosent)} ROI</span>
          </div>
        </div>
      </div>
    </div>
  )
}
