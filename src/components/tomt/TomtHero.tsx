import { MapPin, Maximize, Landmark } from 'lucide-react'
import { formatM2, getScoreFarge, getScoreLabel } from '@/lib/utils'

interface TomtHeroProps {
  adresse: string
  poststed: string
  kommune: string
  areal_m2: number
  gnr: number
  bnr: number
  score: number
}

export function TomtHero({
  adresse,
  poststed,
  kommune,
  areal_m2,
  gnr,
  bnr,
  score,
}: TomtHeroProps) {
  return (
    <section className="relative bg-tomtly-dark">
      {/* Background – i produksjon: drone-bilde eller 3D-visualisering */}
      <div className="absolute inset-0 bg-gradient-to-r from-tomtly-dark via-tomtly-dark/90 to-tomtly-dark/60" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-brand-500 mb-4">
              <span>Tomter</span>
              <span>/</span>
              <span>{kommune}</span>
              <span>/</span>
              <span className="text-brand-300">{adresse}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {adresse}
            </h1>

            <div className="flex items-center gap-4 text-brand-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                {poststed}, {kommune}
              </span>
              <span className="flex items-center gap-1.5">
                <Maximize className="w-4 h-4" />
                {formatM2(areal_m2)}
              </span>
              <span className="flex items-center gap-1.5">
                <Landmark className="w-4 h-4" />
                GNR {gnr} / BNR {bnr}
              </span>
            </div>
          </div>

          {/* Score badge */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/10">
            <div className="relative w-16 h-16">
              <svg className="score-ring w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={getScoreFarge(score)}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * score) / 100}
                  className="animate-score-fill"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{score}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Tomtescore</p>
              <p className="text-xs text-brand-400">{getScoreLabel(score)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
