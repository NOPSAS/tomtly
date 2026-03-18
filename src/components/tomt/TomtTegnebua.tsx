import { PenTool, CheckCircle2, ArrowRight, FileText, Clock, Shield } from 'lucide-react'

// ============================================================
// TEGNEBUA – Fastpris tegning og byggesøknad
// Samarbeidspartner som gir fastpris på å tegne og
// søke om husmodellen kunden har valgt.
// ============================================================

interface Props {
  valgte_husmodeller: number
}

export function TomtTegnebua({
  valgte_husmodeller,
}: Props) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Tegning og byggesøknad
      </h2>
      <p className="text-brand-600 mb-6">
        Vår samarbeidspartner Tegnebua gir fastpris på å tegne og søke om
        husmodellen du har valgt – tilpasset din tomt.
      </p>

      {/* Partner-kort */}
      <div className="bg-white border-2 border-tomtly-accent/20 rounded-xl overflow-hidden">
        {/* Header */}
        <div className="bg-forest-50 px-6 py-4 border-b border-forest-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-tomtly-accent rounded-lg flex items-center justify-center">
              <PenTool className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-tomtly-dark">Tegnebua</p>
              <p className="text-xs text-forest-600">Offisiell Tomtly-partner</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-tomtly-accent" />
            <span className="text-xs font-medium text-forest-700">Fastpris-garanti</span>
          </div>
        </div>

        {/* Innhold */}
        <div className="p-6">
          {/* Hva som er inkludert */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-brand-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Tegning
              </h3>
              <ul className="space-y-2">
                {[
                  'Situasjonsplan tilpasset tomten',
                  'Plantegninger (alle etasjer)',
                  'Fasadetegninger (alle sider)',
                  'Snitt-tegning',
                  'Tilpasning av valgt husmodell til regulering',
                  'Utomhusplan med terrengbearbeiding',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-brand-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-brand-700 mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Byggesøknad frem til rammetillatelse
              </h3>
              <ul className="space-y-2">
                {[
                  'Ansvarlig søker (SØK)',
                  'Komplett byggesøknad til kommunen',
                  'Nabovarsling og oppfølging av merknader',
                  'Evt. dispensasjonssøknad',
                  'Gjennomføringsplan',
                  'Oppfølging til godkjenning',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-brand-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pris */}
          <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
            <div className="text-center">
              <p className="text-xs text-brand-500 mb-1">Tegning og søknad frem til rammetillatelse</p>
              <p className="text-2xl font-bold text-tomtly-accent">50 000 kr <span className="text-sm font-normal text-brand-400">+ mva</span></p>
              <p className="text-[10px] text-brand-400 mt-1">fastpris</p>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-brand-200">
              <Clock className="w-4 h-4 text-brand-400" />
              <p className="text-sm text-brand-600">
                Estimert leveringstid: <strong>4 uker</strong> fra bestilling
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors">
              Bestill endelig tilbud
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-brand-200 text-brand-700 font-medium rounded-lg hover:bg-brand-50 transition-colors">
              Snakk med Tegnebua først
            </button>
          </div>

          <p className="text-[10px] text-brand-400 text-center mt-3">
            Prisene gjelder for {valgte_husmodeller > 1 ? `${valgte_husmodeller} valgte husmodeller` : 'valgt husmodell'}.
            Endelig pris bekreftes etter gjennomgang av tomten.
          </p>
        </div>
      </div>
    </div>
  )
}
