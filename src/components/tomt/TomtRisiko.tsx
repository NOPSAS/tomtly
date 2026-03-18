import { AlertTriangle, Shield, Lightbulb } from 'lucide-react'
import { getRisikoFarge } from '@/lib/utils'

interface Props {
  risikoanalyse: {
    total_risiko: 'lav' | 'medium' | 'hoy'
    faktorer: {
      kategori: string
      beskrivelse: string
      sannsynlighet: number
      konsekvens: number
      risikoverdi: number
      tiltak: string
    }[]
    anbefalinger: string[]
  }
}

export function TomtRisiko({ risikoanalyse: ra }: Props) {
  const totalLabel = ra.total_risiko === 'hoy' ? 'Høy' : ra.total_risiko === 'medium' ? 'Medium' : 'Lav'

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Risikoanalyse
      </h2>

      {/* Total risiko */}
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${getRisikoFarge(ra.total_risiko)}`}>
        <Shield className="w-4 h-4" />
        <span className="text-sm font-semibold">Total risiko: {totalLabel}</span>
      </div>

      {/* Risikomatrise */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-brand-700 mb-4">Risikofaktorer</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-200">
                <th className="text-left py-2 text-brand-500 font-medium">Kategori</th>
                <th className="text-left py-2 text-brand-500 font-medium">Beskrivelse</th>
                <th className="text-center py-2 text-brand-500 font-medium">S</th>
                <th className="text-center py-2 text-brand-500 font-medium">K</th>
                <th className="text-center py-2 text-brand-500 font-medium">Risiko</th>
                <th className="text-left py-2 text-brand-500 font-medium">Tiltak</th>
              </tr>
            </thead>
            <tbody>
              {ra.faktorer.map((f, idx) => {
                const risikoNivaa: 'lav' | 'medium' | 'hoy' =
                  f.risikoverdi <= 4 ? 'lav' : f.risikoverdi <= 9 ? 'medium' : 'hoy'
                return (
                  <tr key={idx} className="border-b border-brand-100">
                    <td className="py-3 font-medium text-tomtly-dark">{f.kategori}</td>
                    <td className="py-3 text-brand-600">{f.beskrivelse}</td>
                    <td className="py-3 text-center">{f.sannsynlighet}</td>
                    <td className="py-3 text-center">{f.konsekvens}</td>
                    <td className="py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getRisikoFarge(risikoNivaa)}`}>
                        {f.risikoverdi}
                      </span>
                    </td>
                    <td className="py-3 text-brand-600">{f.tiltak}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-brand-400 mt-2">S = Sannsynlighet (1-5), K = Konsekvens (1-5), Risiko = S × K</p>
      </div>

      {/* Anbefalinger */}
      <div className="bg-forest-50 rounded-xl p-6 border border-forest-100">
        <h3 className="flex items-center gap-2 font-semibold text-forest-800 mb-4">
          <Lightbulb className="w-5 h-5" />
          Anbefalinger
        </h3>
        <ul className="space-y-2">
          {ra.anbefalinger.map((a, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-forest-700">
              <span className="w-5 h-5 bg-forest-200 rounded text-xs flex items-center justify-center flex-shrink-0 font-mono text-forest-700">
                {idx + 1}
              </span>
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
