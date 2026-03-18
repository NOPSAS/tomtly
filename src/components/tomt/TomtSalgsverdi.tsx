import { formatNOK } from '@/lib/utils'
import { TrendingUp, MapPin } from 'lucide-react'

interface Props {
  salgsverdi: {
    sammenlignbare_salg: {
      adresse: string
      salgsdato: string
      pris: number
      bra_m2: number
      pris_per_m2: number
      avstand_km: number
    }[]
    estimert_per_m2: number
    estimert_total: number
    konfidensintervall: { lav: number; hoy: number }
    markedsvurdering: string
  }
}

export function TomtSalgsverdi({ salgsverdi: sv }: Props) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Estimert salgsverdi
      </h2>
      <p className="text-brand-600 mb-8">{sv.markedsvurdering}</p>

      {/* Hovedestimat */}
      <div className="bg-forest-50 rounded-xl p-8 border border-forest-200 mb-8 text-center">
        <p className="text-sm text-forest-700 mb-2">Estimert total salgsverdi</p>
        <p className="text-4xl font-bold text-tomtly-accent mb-2">
          {formatNOK(sv.estimert_total)}
        </p>
        <p className="text-sm text-forest-600">
          Konfidensintervall: {formatNOK(sv.konfidensintervall.lav)} – {formatNOK(sv.konfidensintervall.hoy)}
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-forest-700">
          <TrendingUp className="w-4 h-4" />
          {formatNOK(sv.estimert_per_m2)} per m²
        </div>
      </div>

      {/* Sammenlignbare salg */}
      <h3 className="text-sm font-semibold text-brand-700 mb-4">
        Sammenlignbare salg i området
      </h3>
      <div className="space-y-3">
        {sv.sammenlignbare_salg.map((salg) => (
          <div
            key={salg.adresse}
            className="flex items-center justify-between bg-brand-50 rounded-lg p-4 border border-brand-100"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-tomtly-dark">{salg.adresse}</p>
                <p className="text-xs text-brand-500">
                  {salg.bra_m2} m² · {salg.avstand_km} km unna · {salg.salgsdato}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-tomtly-dark">{formatNOK(salg.pris)}</p>
              <p className="text-xs text-brand-500">{formatNOK(salg.pris_per_m2)}/m²</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
