import {
  Train,
  GraduationCap,
  ShoppingBag,
  TreePine,
  Waves,
  Stethoscope,
  Utensils,
  Dumbbell,
  MapPin,
} from 'lucide-react'

// ============================================================
// NABOLAGSINFO – Nærhet til fasiliteter
// Avstand, gangminutter og karakter for nabolaget.
// ============================================================

export interface NabolagPunkt {
  kategori: string
  navn: string
  avstand_m: number
  gangminutter: number
}

interface Props {
  punkter: NabolagPunkt[]
  nabolag_beskrivelse: string
}

const KATEGORI_IKON: Record<string, typeof MapPin> = {
  'Kollektivtransport': Train,
  'Skole': GraduationCap,
  'Barnehage': GraduationCap,
  'Dagligvare': ShoppingBag,
  'Kjøpesenter': ShoppingBag,
  'Park/friområde': TreePine,
  'Badeplass': Waves,
  'Legesenter': Stethoscope,
  'Restaurant': Utensils,
  'Treningssenter': Dumbbell,
}

export function TomtNabolag({ punkter, nabolag_beskrivelse }: Props) {
  // Grupper etter gangavstand
  const innen5min = punkter.filter((p) => p.gangminutter <= 5)
  const innen10min = punkter.filter((p) => p.gangminutter > 5 && p.gangminutter <= 10)
  const over10min = punkter.filter((p) => p.gangminutter > 10)

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Nabolaget
      </h2>
      <p className="text-brand-600 mb-8">
        {nabolag_beskrivelse}
      </p>

      <div className="space-y-6">
        {innen5min.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-forest-700 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              Innen 5 minutters gange
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {innen5min.map((p) => (
                <NabolagKort key={`${p.kategori}-${p.navn}`} punkt={p} />
              ))}
            </div>
          </div>
        )}

        {innen10min.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              5–10 minutters gange
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {innen10min.map((p) => (
                <NabolagKort key={`${p.kategori}-${p.navn}`} punkt={p} />
              ))}
            </div>
          </div>
        )}

        {over10min.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-brand-500 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-400" />
              Over 10 minutters gange
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {over10min.map((p) => (
                <NabolagKort key={`${p.kategori}-${p.navn}`} punkt={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NabolagKort({ punkt }: { punkt: NabolagPunkt }) {
  const Ikon = KATEGORI_IKON[punkt.kategori] || MapPin

  return (
    <div className="flex items-center gap-3 bg-brand-50 rounded-lg p-3 border border-brand-100">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0 border border-brand-200">
        <Ikon className="w-4 h-4 text-brand-500" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-tomtly-dark truncate">{punkt.navn}</p>
        <p className="text-xs text-brand-500">{punkt.kategori}</p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-semibold text-tomtly-dark">{punkt.gangminutter} min</p>
        <p className="text-[10px] text-brand-400">{punkt.avstand_m} m</p>
      </div>
    </div>
  )
}
