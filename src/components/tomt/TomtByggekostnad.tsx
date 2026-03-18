import { formatNOK } from '@/lib/utils'

interface Props {
  byggekostnad: {
    grunnarbeid: number
    infrastruktur: number
    bygningskropp: number
    tekniske_anlegg: number
    innvendig: number
    utomhus: number
    prosjektering: number
    uforutsett_prosent: number
    total_eks_mva: number
    total_inkl_mva: number
    kostnad_per_m2: number
  }
}

export function TomtByggekostnad({ byggekostnad: bk }: Props) {
  const poster = [
    { navn: 'Grunnarbeid', belop: bk.grunnarbeid },
    { navn: 'Infrastruktur', belop: bk.infrastruktur },
    { navn: 'Bygningskropp', belop: bk.bygningskropp },
    { navn: 'Tekniske anlegg', belop: bk.tekniske_anlegg },
    { navn: 'Innvendig', belop: bk.innvendig },
    { navn: 'Utomhus', belop: bk.utomhus },
    { navn: 'Prosjektering', belop: bk.prosjektering },
  ]

  const maks = Math.max(...poster.map((p) => p.belop))

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Byggekostnad
      </h2>
      <p className="text-brand-600 mb-8">
        Estimerte kostnader basert på sammenlignbare prosjekter i området.
      </p>

      {/* Poster */}
      <div className="space-y-3 mb-8">
        {poster.map((post) => (
          <div key={post.navn}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-brand-700">{post.navn}</span>
              <span className="font-medium text-tomtly-dark">{formatNOK(post.belop)}</span>
            </div>
            <div className="w-full bg-brand-100 rounded-full h-2">
              <div
                className="h-2 rounded-full bg-earth-400"
                style={{ width: `${(post.belop / maks) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Uforutsett */}
      <div className="bg-amber-50 rounded-lg p-3 mb-6 border border-amber-100">
        <p className="text-sm text-amber-700">
          Uforutsett-post: {bk.uforutsett_prosent}% inkludert i totalen
        </p>
      </div>

      {/* Totaler */}
      <div className="bg-brand-50 rounded-xl p-6 border border-brand-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-xs text-brand-500 mb-1">Eks. mva</p>
            <p className="text-lg font-bold text-tomtly-dark">{formatNOK(bk.total_eks_mva)}</p>
          </div>
          <div>
            <p className="text-xs text-brand-500 mb-1">Inkl. mva</p>
            <p className="text-lg font-bold text-tomtly-accent">{formatNOK(bk.total_inkl_mva)}</p>
          </div>
          <div>
            <p className="text-xs text-brand-500 mb-1">Per m²</p>
            <p className="text-lg font-bold text-tomtly-dark">{formatNOK(bk.kostnad_per_m2)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
