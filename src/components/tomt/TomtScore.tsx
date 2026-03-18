'use client'

import type { Tomtescore } from '@/types'
import { getScoreFarge, getScoreLabel } from '@/lib/utils'

interface Props {
  tomtescore: Tomtescore
}

const DELSCORE_LABELS: Record<string, { label: string; beskrivelse: string }> = {
  beliggenhet: { label: 'Beliggenhet', beskrivelse: 'Nærhet til sentrum, skole, kollektiv' },
  regulering: { label: 'Regulering', beskrivelse: 'Utnyttelsesgrad, fleksibilitet, hensynssoner' },
  topografi: { label: 'Topografi', beskrivelse: 'Helning, grunnforhold, naturfare' },
  infrastruktur: { label: 'Infrastruktur', beskrivelse: 'Vei, vann, avløp, strøm, fiber' },
  marked: { label: 'Marked', beskrivelse: 'Pristrend, etterspørsel, omsetningshastighet' },
  okonomi: { label: 'Økonomi', beskrivelse: 'ROI, byggekostnad, risiko' },
}

export function TomtScore({ tomtescore }: Props) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Tomtescore
      </h2>
      <p className="text-brand-600 mb-8">
        {tomtescore.forklaring}
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(tomtescore.delscorer).map(([key, value]) => {
          const info = DELSCORE_LABELS[key]
          return (
            <div
              key={key}
              className="bg-brand-50 rounded-xl p-4 border border-brand-100"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-brand-700">
                  {info.label}
                </span>
                <span
                  className="text-lg font-bold"
                  style={{ color: getScoreFarge(value) }}
                >
                  {value}
                </span>
              </div>
              <div className="w-full bg-brand-200 rounded-full h-1.5 mb-2">
                <div
                  className="h-1.5 rounded-full transition-all duration-1000"
                  style={{
                    width: `${value}%`,
                    backgroundColor: getScoreFarge(value),
                  }}
                />
              </div>
              <p className="text-xs text-brand-500">{info.beskrivelse}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
