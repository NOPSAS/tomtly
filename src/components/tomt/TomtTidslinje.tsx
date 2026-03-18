'use client'

import { useState } from 'react'
import {
  Clock,
  PenTool,
  Send,
  Users,
  FileCheck,
  Hammer,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Info,
} from 'lucide-react'

// ============================================================
// TIDSLINJE FOR BYGGESØKNAD
// Dynamisk beregnet basert på søknadstype, dispensasjoner,
// naboklager og om alle entreprenører er klare.
// ============================================================

export interface TidslinjeConfig {
  soknadstype: 'ett_trinn' | 'rammetillatelse'
  har_dispensasjoner: boolean
  antall_dispensasjoner: number
  forventet_naboklager: boolean
  alle_entreprenorer_klare: boolean
  krav_til_veiopparbeidelse: boolean
  politisk_behandling: boolean
}

interface TidslinjeFase {
  id: string
  navn: string
  beskrivelse: string
  varighet_uker: number
  ikon: typeof Clock
  farge: string
  detaljer: string[]
  risikofaktorer?: string[]
}

interface Props {
  config: TidslinjeConfig
}

function beregnTidslinje(config: TidslinjeConfig): TidslinjeFase[] {
  const faser: TidslinjeFase[] = []

  // ---- FASE 1: Planlegging og tegning ----
  faser.push({
    id: 'planlegging',
    navn: 'Planlegging og prosjektering',
    beskrivelse: 'Arkitekt tegner prosjektet, ingeniør prosjekterer, og alle søknadsdokumenter utarbeides.',
    varighet_uker: 4,
    ikon: PenTool,
    farge: 'bg-blue-500',
    detaljer: [
      'Arkitekttegninger (plan, snitt, fasade)',
      'Situasjonsplan med kotehøyder',
      'Geoteknisk vurdering',
      config.soknadstype === 'ett_trinn'
        ? 'Detaljprosjektering (konstruksjon, VVS, elektro)'
        : 'Rammesøknad med overordnet prosjektering',
      'Utomhusplan',
      ...(config.har_dispensasjoner
        ? ['Dispensasjonssøknad med begrunnelse']
        : []),
    ],
    risikofaktorer: [
      ...(config.har_dispensasjoner
        ? ['Dispensasjonssøknad krever grundigere dokumentasjon (+1-2 uker)']
        : []),
    ],
  })

  // ---- FASE 2: Nabovarsling ----
  faser.push({
    id: 'nabovarsling',
    navn: 'Nabovarsling',
    beskrivelse: 'Naboer og gjenboere varsles om tiltaket. De har 2 ukers frist til å komme med merknader.',
    varighet_uker: 2,
    ikon: Send,
    farge: 'bg-indigo-500',
    detaljer: [
      'Nabovarsel sendes til alle berørte naboer og gjenboere',
      '2 ukers merknadsfrist (minimum, kan ikke forkortes)',
      'Eventuelle merknader kommenteres i søknaden',
      ...(config.har_dispensasjoner
        ? ['Dispensasjon varsles samtidig – naboene informeres spesifikt']
        : []),
    ],
    risikofaktorer: [
      ...(config.forventet_naboklager
        ? ['Naboklager kan føre til at kommunen ber om tilleggsdokumentasjon']
        : []),
    ],
  })

  // ---- FASE 3: Saksbehandling ----
  let saksbehandling_uker: number
  let saksbehandling_detaljer: string[]
  let saksbehandling_risiko: string[] = []

  if (config.soknadstype === 'ett_trinn') {
    if (config.har_dispensasjoner || config.forventet_naboklager || config.politisk_behandling) {
      saksbehandling_uker = 12
      saksbehandling_detaljer = [
        '12 ukers frist (pga. dispensasjon/klager)',
        'Kommunen vurderer dispensasjonssøknad',
        ...(config.politisk_behandling
          ? ['Saken må til politisk behandling i planutvalget']
          : []),
        ...(config.forventet_naboklager
          ? ['Kommunen vurderer nabomerknader og evt. befarer tomten']
          : []),
        'Vedtak om tillatelse eller avslag',
      ]
      saksbehandling_risiko = [
        'Dispensasjonssaker kan ta lengre enn 12 uker',
        ...(config.politisk_behandling
          ? ['Politisk behandling kan forsinke ytterligere 2-6 uker']
          : []),
      ]
    } else {
      saksbehandling_uker = 3
      saksbehandling_detaljer = [
        '3 ukers frist for søknad uten dispensasjon',
        'Kommunen kontrollerer at tiltaket er i samsvar med plan',
        'Vedtak om tillatelse',
        'Ingen dispensasjon = raskere behandling',
      ]
    }
  } else {
    // Rammetillatelse
    saksbehandling_uker = config.har_dispensasjoner ? 12 : 12
    saksbehandling_detaljer = [
      '12 ukers frist for rammetillatelse',
      'Kommunen vurderer tiltakets ytre rammer',
      ...(config.har_dispensasjoner
        ? ['Dispensasjonsvurdering inngår i saksbehandlingen']
        : []),
      'Vedtak om rammetillatelse',
      'NB: Igangsettingstillatelse (IG) må søkes separat etterpå',
    ]
    saksbehandling_risiko = [
      'Mangelfull søknad kan gi tilleggsfrist',
      ...(config.forventet_naboklager
        ? ['Klage på vedtak gir 3 ukers klagefrist + ny behandling']
        : []),
    ]
  }

  faser.push({
    id: 'saksbehandling',
    navn: 'Saksbehandling i kommunen',
    beskrivelse: config.soknadstype === 'ett_trinn'
      ? 'Kommunen behandler søknaden i ett trinn – alle fagområder vurderes samlet.'
      : 'Kommunen behandler rammesøknaden og vurderer tiltakets ytre rammer og plassering.',
    varighet_uker: saksbehandling_uker,
    ikon: FileCheck,
    farge: saksbehandling_uker <= 3 ? 'bg-green-500' : saksbehandling_uker <= 6 ? 'bg-amber-500' : 'bg-orange-500',
    detaljer: saksbehandling_detaljer,
    risikofaktorer: saksbehandling_risiko,
  })

  // ---- FASE 3b: Klagefrist ----
  if (config.forventet_naboklager) {
    faser.push({
      id: 'klagebehandling',
      navn: 'Klagefrist og evt. klagebehandling',
      beskrivelse: 'Naboer har 3 ukers klagefrist etter vedtak. Ved klage kan saken ta ytterligere 6-12 uker.',
      varighet_uker: 3,
      ikon: Users,
      farge: 'bg-red-400',
      detaljer: [
        '3 ukers klagefrist etter vedtak',
        'Ved klage: Kommunen vurderer klagen',
        'Kommunen kan omgjøre vedtaket eller sende til Statsforvalteren',
        'Statsforvalteren bruker typisk 3-6 måneder',
      ],
      risikofaktorer: [
        'Klage til Statsforvalteren kan forsinke prosjektet 3-6 måneder',
        'Byggestart kan ikke skje før klagesak er avgjort',
      ],
    })
  }

  // ---- FASE 4: Igangsettingstillatelse (kun ramme) ----
  if (config.soknadstype === 'rammetillatelse') {
    faser.push({
      id: 'ig_soknad',
      navn: 'Igangsettingstillatelse (IG)',
      beskrivelse: 'Etter godkjent rammetillatelse må det søkes om igangsettingstillatelse med detaljprosjektering.',
      varighet_uker: 3,
      ikon: Hammer,
      farge: 'bg-purple-500',
      detaljer: [
        'Detaljprosjektering (konstruksjon, VVS, elektro)',
        'Alle ansvarlige foretak må være på plass',
        'Gjennomføringsplan (GJP) utarbeides',
        '3 ukers saksbehandling for IG',
      ],
    })
  }

  // ---- FASE 5: Opparbeidelseskrav ----
  if (config.krav_til_veiopparbeidelse) {
    faser.push({
      id: 'opparbeidelse',
      navn: 'Opparbeidelse av vei/VA',
      beskrivelse: 'Rekkefølgekrav krever at vei, vann og/eller avløp opparbeides før byggestart.',
      varighet_uker: 8,
      ikon: AlertTriangle,
      farge: 'bg-amber-500',
      detaljer: [
        'Veiplaner og VA-planer må godkjennes av kommunen',
        'Gravemelding og arbeidsvarsling',
        'Opparbeidelse gjennomføres',
        'Ferdigattest for infrastruktur',
      ],
      risikofaktorer: [
        'Opparbeidelse av vei kan koste 500 000 – 2 000 000 kr',
        'Vinterstans kan forsinke infrastrukturarbeid',
      ],
    })
  }

  return faser
}

export function TomtTidslinje({ config }: Props) {
  const [visDetaljer, setVisDetaljer] = useState<string | null>(null)
  const faser = beregnTidslinje(config)
  const totalUker = faser.reduce((sum, f) => sum + f.varighet_uker, 0)
  const totalMnd = Math.ceil(totalUker / 4.33)

  const ettTrinn = config.soknadstype === 'ett_trinn'

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Tidslinje for byggesøknad
      </h2>
      <p className="text-brand-600 mb-6">
        Estimert tidsbruk fra prosjektstart til byggetillatelse.
      </p>

      {/* Søknadstype info */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className={`flex-1 rounded-xl p-4 border-2 ${ettTrinn ? 'border-tomtly-accent bg-forest-50' : 'border-brand-200 bg-white'}`}>
          <p className="text-sm font-semibold text-tomtly-dark">Søknad i ett trinn</p>
          <p className="text-xs text-brand-500 mt-1">
            Alt behandles samlet. Krever at alle entreprenører er valgt.
            {!config.har_dispensasjoner && ' 3 ukers saksbehandling.'}
          </p>
          {ettTrinn && (
            <span className="inline-block mt-2 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
              Valgt for denne tomten
            </span>
          )}
        </div>
        <div className={`flex-1 rounded-xl p-4 border-2 ${!ettTrinn ? 'border-tomtly-accent bg-forest-50' : 'border-brand-200 bg-white'}`}>
          <p className="text-sm font-semibold text-tomtly-dark">Rammetillatelse</p>
          <p className="text-xs text-brand-500 mt-1">
            To-trinns prosess. Kan søke uten å ha valgt entreprenører. 12 ukers saksbehandling + IG etterpå.
          </p>
          {!ettTrinn && (
            <span className="inline-block mt-2 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
              Valgt for denne tomten
            </span>
          )}
        </div>
      </div>

      {/* Total estimat */}
      <div className="bg-tomtly-dark rounded-xl p-6 mb-8 text-center">
        <p className="text-sm text-brand-400 mb-1">Estimert total tid til byggetillatelse</p>
        <p className="text-4xl font-bold text-white">
          {totalUker} uker
          <span className="text-lg text-brand-400 ml-2">(~{totalMnd} måneder)</span>
        </p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Info className="w-3.5 h-3.5 text-brand-500" />
          <p className="text-xs text-brand-500">
            {config.har_dispensasjoner
              ? 'Inkluderer dispensasjonsbehandling som forlenger prosessen.'
              : config.forventet_naboklager
                ? 'Inkluderer mulig klagebehandling.'
                : 'Basert på søknad uten dispensasjon og uten naboklager.'}
          </p>
        </div>
      </div>

      {/* Visuell tidslinje-bar */}
      <div className="flex rounded-lg overflow-hidden mb-8 h-8">
        {faser.map((fase) => (
          <div
            key={fase.id}
            className={`${fase.farge} relative group cursor-pointer`}
            style={{ width: `${(fase.varighet_uker / totalUker) * 100}%` }}
            onClick={() => setVisDetaljer(visDetaljer === fase.id ? null : fase.id)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] text-white font-semibold truncate px-1">
                {fase.varighet_uker}u
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Faser i detalj */}
      <div className="space-y-4">
        {faser.map((fase, idx) => {
          const isExpanded = visDetaljer === fase.id
          const ukeStart = faser.slice(0, idx).reduce((sum, f) => sum + f.varighet_uker, 0)
          const ukeSlutt = ukeStart + fase.varighet_uker

          return (
            <div
              key={fase.id}
              className="bg-white border border-brand-200 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setVisDetaljer(isExpanded ? null : fase.id)}
                className="w-full flex items-center gap-4 p-4 text-left hover:bg-brand-50 transition-colors"
              >
                {/* Tidslinje-punkt */}
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${fase.farge}`}>
                    <fase.ikon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-tomtly-dark text-sm">{fase.navn}</h3>
                  </div>
                  <p className="text-xs text-brand-500 mt-0.5">{fase.beskrivelse}</p>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-tomtly-dark">{fase.varighet_uker} uker</p>
                  <p className="text-xs text-brand-400">Uke {ukeStart + 1}–{ukeSlutt}</p>
                </div>

                <ChevronRight className={`w-4 h-4 text-brand-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-brand-100 pt-3 ml-14">
                  <ul className="space-y-1.5 mb-3">
                    {fase.detaljer.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-brand-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-400 flex-shrink-0 mt-0.5" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  {fase.risikofaktorer && fase.risikofaktorer.length > 0 && (
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                      <p className="text-xs font-semibold text-amber-700 mb-1">Risikofaktorer:</p>
                      <ul className="space-y-1">
                        {fase.risikofaktorer.map((r, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-xs text-amber-600">
                            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
