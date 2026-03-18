import { CheckCircle2, AlertTriangle, Lightbulb, Ruler } from 'lucide-react'
import { formatM2 } from '@/lib/utils'

interface Props {
  mulighetsstudie: {
    oppsummering: string
    maks_bra_m2: number
    anbefalt_bra_m2: number
    maks_enheter: number
    anbefalt_enheter: number
    bygningstyper: string[]
    fordeler: string[]
    utfordringer: string[]
    arkitektens_vurdering: string
  }
}

export function TomtMulighetsstudie({ mulighetsstudie: ms }: Props) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Arkitektens mulighetsstudie
      </h2>
      <p className="text-brand-600 leading-relaxed mb-8">
        {ms.oppsummering}
      </p>

      {/* Nøkkeltall */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-forest-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-tomtly-accent">{formatM2(ms.anbefalt_bra_m2)}</p>
          <p className="text-xs text-brand-600 mt-1">Anbefalt BRA</p>
        </div>
        <div className="bg-forest-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-tomtly-accent">{formatM2(ms.maks_bra_m2)}</p>
          <p className="text-xs text-brand-600 mt-1">Maks BRA</p>
        </div>
        <div className="bg-forest-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-tomtly-accent">{ms.anbefalt_enheter}</p>
          <p className="text-xs text-brand-600 mt-1">Anbefalt enheter</p>
        </div>
        <div className="bg-forest-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-tomtly-accent">{ms.maks_enheter}</p>
          <p className="text-xs text-brand-600 mt-1">Maks enheter</p>
        </div>
      </div>

      {/* Bygningstyper */}
      <div className="flex gap-2 mb-8">
        {ms.bygningstyper.map((bt) => (
          <span
            key={bt}
            className="px-3 py-1.5 bg-brand-100 text-brand-700 text-sm rounded-full"
          >
            {bt}
          </span>
        ))}
      </div>

      {/* Fordeler og utfordringer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <h3 className="flex items-center gap-2 font-semibold text-green-800 mb-4">
            <CheckCircle2 className="w-5 h-5" />
            Fordeler
          </h3>
          <ul className="space-y-2">
            {ms.fordeler.map((f) => (
              <li key={f} className="text-sm text-green-700 flex items-start gap-2">
                <span className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
          <h3 className="flex items-center gap-2 font-semibold text-amber-800 mb-4">
            <AlertTriangle className="w-5 h-5" />
            Utfordringer
          </h3>
          <ul className="space-y-2">
            {ms.utfordringer.map((u) => (
              <li key={u} className="text-sm text-amber-700 flex items-start gap-2">
                <span className="w-1 h-1 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                {u}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Arkitektens vurdering */}
      <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
        <h3 className="flex items-center gap-2 font-semibold text-tomtly-dark mb-3">
          <Lightbulb className="w-5 h-5 text-tomtly-gold" />
          Arkitektens vurdering
        </h3>
        <p className="text-sm text-brand-700 leading-relaxed italic">
          &ldquo;{ms.arkitektens_vurdering}&rdquo;
        </p>
      </div>
    </div>
  )
}
