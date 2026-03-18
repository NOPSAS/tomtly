import { MapPin, Maximize, Landmark, Lock } from 'lucide-react'
import { formatM2 } from '@/lib/utils'

interface TomtHeroProps {
  adresse: string
  poststed: string
  kommune: string
  areal_m2: number
  gnr: number
  bnr: number
  skjulAdresse?: boolean
}

export function TomtHero({
  adresse,
  poststed,
  kommune,
  areal_m2,
  gnr,
  bnr,
  skjulAdresse = false,
}: TomtHeroProps) {
  const visningsAdresse = skjulAdresse ? `${poststed}, ${kommune}` : adresse

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
              <span className="text-brand-300">{visningsAdresse}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
              {visningsAdresse}
            </h1>

            {skjulAdresse && (
              <div className="flex items-center gap-2 mb-3 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg w-fit">
                <Lock className="w-3.5 h-3.5 text-brand-400" />
                <span className="text-sm text-brand-300">Registrer deg for å se adressen</span>
              </div>
            )}

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

        </div>
      </div>
    </section>
  )
}
