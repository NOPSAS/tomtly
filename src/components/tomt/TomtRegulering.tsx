import { FileText, Shield, Ruler } from 'lucide-react'
import { getRisikoFarge } from '@/lib/utils'

interface Props {
  regulering: {
    arealformaal: string
    utnyttelsesgrad_bya: number
    maks_hoyde_m: number
    maks_etasjer: number
    byggegrense_m: number
    hensynssoner: {
      type: string
      beskrivelse: string
      konsekvens: 'lav' | 'medium' | 'hoy'
    }[]
    bestemmelser: string[]
    plannavn?: string
    vedtaksdato?: string
  }
}

export function TomtRegulering({ regulering: reg }: Props) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Reguleringsanalyse
      </h2>
      <p className="text-brand-600 mb-8">
        {reg.plannavn && (
          <span>
            {reg.plannavn}
            {reg.vedtaksdato && ` (vedtatt ${reg.vedtaksdato})`}
          </span>
        )}
      </p>

      {/* Arealformål */}
      <div className="bg-brand-50 rounded-xl p-4 border border-brand-200 mb-6">
        <p className="text-xs text-brand-500 mb-1">Arealformål</p>
        <p className="font-semibold text-tomtly-dark">{reg.arealformaal}</p>
      </div>

      {/* Nøkkeltall */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-brand-200 rounded-xl p-4 text-center">
          <Ruler className="w-5 h-5 text-brand-400 mx-auto mb-2" />
          <p className="text-xl font-bold text-tomtly-dark">{reg.utnyttelsesgrad_bya}%</p>
          <p className="text-xs text-brand-500">Maks BYA</p>
        </div>
        <div className="bg-white border border-brand-200 rounded-xl p-4 text-center">
          <p className="text-xl font-bold text-tomtly-dark">{reg.maks_hoyde_m} m</p>
          <p className="text-xs text-brand-500">Maks høyde</p>
        </div>
        <div className="bg-white border border-brand-200 rounded-xl p-4 text-center">
          <p className="text-xl font-bold text-tomtly-dark">{reg.maks_etasjer}</p>
          <p className="text-xs text-brand-500">Maks etasjer</p>
        </div>
        <div className="bg-white border border-brand-200 rounded-xl p-4 text-center">
          <p className="text-xl font-bold text-tomtly-dark">{reg.byggegrense_m} m</p>
          <p className="text-xs text-brand-500">Byggegrense</p>
        </div>
      </div>

      {/* Hensynssoner */}
      {reg.hensynssoner.length > 0 && (
        <div className="mb-8">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-700 mb-3">
            <Shield className="w-4 h-4" />
            Hensynssoner
          </h3>
          <div className="space-y-2">
            {reg.hensynssoner.map((hs) => (
              <div
                key={hs.type}
                className="flex items-center justify-between bg-white border border-brand-200 rounded-lg p-3"
              >
                <div>
                  <p className="text-sm font-medium text-tomtly-dark">{hs.type}</p>
                  <p className="text-xs text-brand-500">{hs.beskrivelse}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${getRisikoFarge(hs.konsekvens)}`}>
                  {hs.konsekvens === 'hoy' ? 'Høy' : hs.konsekvens === 'medium' ? 'Medium' : 'Lav'} konsekvens
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bestemmelser */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-semibold text-brand-700 mb-3">
          <FileText className="w-4 h-4" />
          Reguleringsbestemmelser
        </h3>
        <ul className="space-y-2">
          {reg.bestemmelser.map((b, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm text-brand-700 bg-brand-50 rounded-lg p-3"
            >
              <span className="w-5 h-5 bg-brand-200 rounded text-xs flex items-center justify-center flex-shrink-0 font-mono">
                {idx + 1}
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
