'use client'

import { useState } from 'react'
import { Eye, RotateCcw, Maximize2 } from 'lucide-react'

const VIEWS = [
  { id: 'situasjon', label: 'Situasjonsplan', beskrivelse: 'Oversikt over tomten med planlagt bebyggelse' },
  { id: 'fasade', label: 'Fasade', beskrivelse: 'Fasadetegning sett fra gate' },
  { id: 'fugleperspektiv', label: 'Fugleperspektiv', beskrivelse: '3D-visualisering ovenfra' },
  { id: 'snitt', label: 'Snitt', beskrivelse: 'Tverrsnitt av terreng og bygg' },
]

export function TomtVisualisering() {
  const [activeView, setActiveView] = useState('situasjon')
  const active = VIEWS.find((v) => v.id === activeView)!

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-tomtly-dark">
            Visualisering
          </h2>
          <p className="text-sm text-brand-500 mt-1">{active.beskrivelse}</p>
        </div>
      </div>

      {/* View tabs */}
      <div className="flex gap-2 mb-4">
        {VIEWS.map((view) => (
          <button
            key={view.id}
            onClick={() => setActiveView(view.id)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
              activeView === view.id
                ? 'bg-tomtly-accent text-white'
                : 'bg-brand-100 text-brand-600 hover:bg-brand-200'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Visualisering placeholder */}
      <div className="relative aspect-[16/10] bg-brand-100 rounded-xl border border-brand-200 overflow-hidden group">
        {/* I produksjon: faktisk tegning/rendering */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Eye className="w-12 h-12 text-brand-300 mx-auto mb-3" />
            <p className="text-brand-400 font-medium">{active.label}</p>
            <p className="text-sm text-brand-300 mt-1">
              Arkitekttegning vises her
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white">
            <RotateCcw className="w-4 h-4 text-brand-600" />
          </button>
          <button className="p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm hover:bg-white">
            <Maximize2 className="w-4 h-4 text-brand-600" />
          </button>
        </div>
      </div>
    </div>
  )
}
