'use client'

import { useState } from 'react'
import { TreePine, Home, ArrowLeftRight } from 'lucide-react'

// ============================================================
// FØR/ETTER – Vis tom tomt vs. ferdig prosjekt
// Slider som lar kjøper dra mellom dagens situasjon
// og visualisering av ferdig utbygging.
// ============================================================

interface Props {
  scenarioNavn: string
}

export function TomtForEtter({ scenarioNavn }: Props) {
  const [posisjon, setPosisjon] = useState(50) // 0-100, 50 = midten

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Før og etter
      </h2>
      <p className="text-brand-600 mb-6">
        Dra slideren for å se tomten i dag sammenlignet med {scenarioNavn}.
      </p>

      <div className="relative aspect-[16/10] rounded-xl overflow-hidden border border-brand-200 select-none">
        {/* Før (tom tomt) */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-lime-100 to-amber-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <TreePine className="w-20 h-20 text-green-400/50 mb-3" />
            <p className="text-green-600/60 font-medium text-lg">Dagens situasjon</p>
            <p className="text-green-500/40 text-sm">Ubebygget tomt</p>
          </div>
        </div>

        {/* Etter (ferdig prosjekt) – clippes av slider */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100"
          style={{ clipPath: `inset(0 0 0 ${posisjon}%)` }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Home className="w-20 h-20 text-blue-400/50 mb-3" />
            <p className="text-blue-600/60 font-medium text-lg">{scenarioNavn}</p>
            <p className="text-blue-500/40 text-sm">Ferdig prosjekt</p>
          </div>
        </div>

        {/* Slider-linje */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${posisjon}%` }}
        >
          {/* Håndtak */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing">
            <ArrowLeftRight className="w-5 h-5 text-brand-500" />
          </div>
        </div>

        {/* Slider-input (usynlig, dekker hele bildet) */}
        <input
          type="range"
          min={0}
          max={100}
          value={posisjon}
          onChange={(e) => setPosisjon(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-20"
        />

        {/* Labels */}
        <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded text-xs text-white z-10">
          Før
        </div>
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/30 backdrop-blur-sm rounded text-xs text-white z-10">
          Etter
        </div>
      </div>

      <p className="text-xs text-brand-400 mt-2 text-center">
        Visualisering er illustrativ. Endelig utforming avhenger av prosjektering og godkjenning.
      </p>
    </div>
  )
}
