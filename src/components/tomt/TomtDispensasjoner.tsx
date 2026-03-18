import {
  AlertTriangle,
  Route,
  Droplets,
  Zap,
  TreePine,
  Clock,
  Shield,
  FileWarning,
  CircleDollarSign,
  CheckCircle2,
} from 'lucide-react'
import { formatNOK } from '@/lib/utils'

// ============================================================
// DISPENSASJONSANALYSE
// Avdekker skjulte krav som opparbeidelse av vei, VA,
// rekkefølgekrav, og andre dispensasjonsbehov.
// ============================================================

export interface Dispensasjon {
  id: string
  kategori: 'vei' | 'va' | 'strom' | 'natur' | 'kulturminne' | 'hoyde' | 'utnyttelse' | 'byggegrense' | 'parkering' | 'annet'
  tittel: string
  beskrivelse: string
  kilde: string // reguleringsplan, kommuneplan, etc.
  konsekvens: 'blokkerende' | 'kostnad' | 'forsinkelse' | 'lav'
  estimert_kostnad?: number
  estimert_forsinkelse_uker?: number
  dispensasjon_nødvendig: boolean
  sannsynlighet_godkjenning?: number // prosent
  tiltak: string
  presedens: string // f.eks. "3 av 4 naboer har fått dispensasjon"
}

interface Props {
  dispensasjoner: Dispensasjon[]
}

const KATEGORI_IKON: Record<string, typeof Route> = {
  vei: Route,
  va: Droplets,
  strom: Zap,
  natur: TreePine,
  kulturminne: Shield,
  hoyde: FileWarning,
  utnyttelse: FileWarning,
  byggegrense: FileWarning,
  parkering: FileWarning,
  annet: FileWarning,
}

const KATEGORI_LABEL: Record<string, string> = {
  vei: 'Opparbeidelse av vei',
  va: 'Vann og avløp',
  strom: 'Strøm/nettilkobling',
  natur: 'Naturvern',
  kulturminne: 'Kulturminne',
  hoyde: 'Høydebegrensning',
  utnyttelse: 'Utnyttelsesgrad',
  byggegrense: 'Byggegrense',
  parkering: 'Parkering',
  annet: 'Annet',
}

const KONSEKVENS_STYLE: Record<string, { bg: string; text: string; label: string }> = {
  blokkerende: { bg: 'bg-red-100', text: 'text-red-700', label: 'Blokkerende' },
  kostnad: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Kostnadskrevende' },
  forsinkelse: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Forsinkende' },
  lav: { bg: 'bg-green-100', text: 'text-green-700', label: 'Lav konsekvens' },
}

export function TomtDispensasjoner({ dispensasjoner }: Props) {
  const blokkerende = dispensasjoner.filter((d) => d.konsekvens === 'blokkerende')
  const medKostnad = dispensasjoner.filter((d) => d.estimert_kostnad && d.estimert_kostnad > 0)
  const totalKostnad = medKostnad.reduce((sum, d) => sum + (d.estimert_kostnad || 0), 0)
  const totalForsinkelse = dispensasjoner.reduce((sum, d) => sum + (d.estimert_forsinkelse_uker || 0), 0)
  const krevDispensasjon = dispensasjoner.filter((d) => d.dispensasjon_nødvendig)

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Dispensasjoner og skjulte krav
      </h2>
      <p className="text-brand-600 mb-6">
        Analyse av krav i reguleringsplan og kommuneplan som kan påvirke kostnad og tidsbruk.
      </p>

      {/* Oppsummering */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`rounded-xl p-4 text-center border ${blokkerende.length > 0 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
          <p className={`text-2xl font-bold ${blokkerende.length > 0 ? 'text-red-700' : 'text-green-700'}`}>
            {blokkerende.length}
          </p>
          <p className={`text-xs mt-1 ${blokkerende.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
            Blokkerende
          </p>
        </div>
        <div className="bg-amber-50 rounded-xl p-4 text-center border border-amber-100">
          <p className="text-2xl font-bold text-amber-700">{krevDispensasjon.length}</p>
          <p className="text-xs text-amber-600 mt-1">Krever dispensasjon</p>
        </div>
        <div className="bg-brand-50 rounded-xl p-4 text-center border border-brand-200">
          <p className="text-2xl font-bold text-tomtly-dark">{totalKostnad > 0 ? formatNOK(totalKostnad) : '–'}</p>
          <p className="text-xs text-brand-500 mt-1">Estimert tilleggskostnad</p>
        </div>
        <div className="bg-brand-50 rounded-xl p-4 text-center border border-brand-200">
          <p className="text-2xl font-bold text-tomtly-dark">
            {totalForsinkelse > 0 ? `+${totalForsinkelse} uker` : 'Ingen'}
          </p>
          <p className="text-xs text-brand-500 mt-1">Estimert forsinkelse</p>
        </div>
      </div>

      {/* Dispensasjoner */}
      <div className="space-y-4">
        {dispensasjoner.map((d) => {
          const Ikon = KATEGORI_IKON[d.kategori] || FileWarning
          const konsekvens = KONSEKVENS_STYLE[d.konsekvens]

          return (
            <div
              key={d.id}
              className="bg-white border border-brand-200 rounded-xl p-5"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${konsekvens.bg}`}>
                  <Ikon className={`w-5 h-5 ${konsekvens.text}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-tomtly-dark">{d.tittel}</h3>
                    <span className={`px-2 py-0.5 text-xs rounded-full ${konsekvens.bg} ${konsekvens.text}`}>
                      {konsekvens.label}
                    </span>
                    {d.dispensasjon_nødvendig && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-700">
                        Dispensasjon nødvendig
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-brand-600 mb-3">{d.beskrivelse}</p>

                  {/* Detaljer */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                    {d.estimert_kostnad && d.estimert_kostnad > 0 && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <CircleDollarSign className="w-3.5 h-3.5 text-brand-400" />
                        <span className="text-brand-500">Kostnad:</span>
                        <span className="font-semibold text-brand-700">{formatNOK(d.estimert_kostnad)}</span>
                      </div>
                    )}
                    {d.estimert_forsinkelse_uker && d.estimert_forsinkelse_uker > 0 && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <Clock className="w-3.5 h-3.5 text-brand-400" />
                        <span className="text-brand-500">Forsinkelse:</span>
                        <span className="font-semibold text-brand-700">+{d.estimert_forsinkelse_uker} uker</span>
                      </div>
                    )}
                    {d.sannsynlighet_godkjenning !== undefined && (
                      <div className="flex items-center gap-1.5 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />
                        <span className="text-brand-500">Godkjenning:</span>
                        <span className="font-semibold text-brand-700">{d.sannsynlighet_godkjenning}% sannsynlig</span>
                      </div>
                    )}
                  </div>

                  {/* Kilde og presedens */}
                  <div className="flex flex-col sm:flex-row gap-3 text-xs">
                    <div className="bg-brand-50 rounded-lg px-3 py-2 flex-1">
                      <span className="text-brand-500">Kilde: </span>
                      <span className="text-brand-700">{d.kilde}</span>
                    </div>
                    {d.presedens && (
                      <div className="bg-forest-50 rounded-lg px-3 py-2 flex-1">
                        <span className="text-forest-600">Presedens: </span>
                        <span className="text-forest-700">{d.presedens}</span>
                      </div>
                    )}
                  </div>

                  {/* Tiltak */}
                  <div className="mt-3 bg-blue-50 rounded-lg px-3 py-2 border border-blue-100">
                    <span className="text-xs font-semibold text-blue-700">Anbefalt tiltak: </span>
                    <span className="text-xs text-blue-600">{d.tiltak}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
