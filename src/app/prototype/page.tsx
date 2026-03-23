'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { MapPin, Search, CheckCircle2, Loader2, AlertTriangle, ChevronDown, ChevronUp, Layers, FileText, Ruler, Shield, Info } from 'lucide-react'

// ─── Types ──────────────────────────────────────────────────────────────────

interface Adresse {
  adressetekst: string
  kommunenavn: string
  kommunenummer: string
  representasjonspunkt: { lat: number; lon: number }
  matrikkelnummeradresse?: {
    gardsnummer?: number
    bruksnummer?: number
  }
  postnummer?: string
  poststed?: string
}

interface UTMKoordinat {
  x: number // east
  y: number // north
}

interface WMSResult {
  layer: string
  label: string
  data: any
  error?: string
}

type StepStatus = 'pending' | 'loading' | 'done' | 'error'

interface Step {
  label: string
  status: StepStatus
  error?: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function debounce<T extends (...args: any[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }) as T
}

const WMS_BASE = 'https://nap.ft.dibk.no/services/wms/reguleringsplaner/'

function wmsFeatureInfoUrl(layer: string, bbox: string) {
  return `${WMS_BASE}?service=WMS&request=GetFeatureInfo&layers=${layer}&query_layers=${layer}&crs=EPSG:25833&bbox=${bbox}&width=500&height=500&x=250&y=250&info_format=application/json`
}

function wmsMapUrl(bbox: string) {
  return `${WMS_BASE}?service=WMS&request=GetMap&layers=reguleringsplaner_vn1_arealformaal,reguleringsplaner_vn1_hensynssoner,reguleringsplaner_vn1_planomraade&styles=&crs=EPSG:25833&bbox=${bbox}&width=800&height=800&format=image/png`
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function PrototypePage() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Adresse[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [valgtAdresse, setValgtAdresse] = useState<Adresse | null>(null)
  const [utm, setUtm] = useState<UTMKoordinat | null>(null)
  const [wmsResults, setWmsResults] = useState<WMSResult[]>([])
  const [mapUrl, setMapUrl] = useState<string | null>(null)
  const [mapError, setMapError] = useState(false)
  const [showRawData, setShowRawData] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])
  const [analysing, setAnalysing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // ─── Address search ─────────────────────────────────────────────────────

  const searchAddress = useCallback(
    debounce(async (sok: string) => {
      if (sok.trim().length < 3) {
        setSuggestions([])
        return
      }
      try {
        const res = await fetch(
          `https://ws.geonorge.no/adresser/v1/sok?sok=${encodeURIComponent(sok)}&treffPerSide=5`
        )
        const data = await res.json()
        setSuggestions(data.adresser || [])
        setShowSuggestions(true)
      } catch {
        setSuggestions([])
      }
    }, 300),
    []
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setQuery(val)
    searchAddress(val)
  }

  // ─── Analysis pipeline ──────────────────────────────────────────────────

  async function runAnalysis(adr: Adresse) {
    setValgtAdresse(adr)
    setQuery(adr.adressetekst)
    setShowSuggestions(false)
    setAnalysing(true)
    setWmsResults([])
    setMapUrl(null)
    setMapError(false)
    setShowRawData(false)

    const newSteps: Step[] = [
      { label: 'Adresse funnet', status: 'done' },
      { label: 'Konverterer koordinater...', status: 'loading' },
      { label: 'Henter reguleringsdata...', status: 'pending' },
      { label: 'Henter kartbilde...', status: 'pending' },
      { label: 'Analyse ferdig', status: 'pending' },
    ]
    setSteps([...newSteps])

    // Step 2: Convert coordinates
    let east = 0, north = 0
    try {
      const { lat, lon } = adr.representasjonspunkt
      const res = await fetch(
        `https://ws.geonorge.no/transformering/v1/transformer?x=${lat}&y=${lon}&fra=4258&til=25833`
      )
      const data = await res.json()
      east = data.x
      north = data.y
      setUtm({ x: east, y: north })
      newSteps[1] = { label: 'Koordinater konvertert', status: 'done' }
    } catch (err) {
      newSteps[1] = { label: 'Feil ved koordinatkonvertering', status: 'error', error: String(err) }
      setSteps([...newSteps])
      setAnalysing(false)
      return
    }
    newSteps[2] = { label: 'Henter reguleringsdata...', status: 'loading' }
    setSteps([...newSteps])

    // Step 3: WMS queries
    const bbox = `${east - 250},${north - 250},${east + 250},${north + 250}`
    const layers = [
      { layer: 'reguleringsplaner_vn1_arealformaal', label: 'Arealformål' },
      { layer: 'reguleringsplaner_vn1_hensynssoner', label: 'Hensynssoner' },
      { layer: 'reguleringsplaner_vn1_planomraade', label: 'Planområde' },
      { layer: 'reguleringsplaner_vn1_regulert_hoyde', label: 'Regulert høyde' },
    ]

    const results = await Promise.all(
      layers.map(async ({ layer, label }): Promise<WMSResult> => {
        const url = wmsFeatureInfoUrl(layer, bbox)
        try {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const ct = res.headers.get('content-type') || ''
          if (ct.includes('json')) {
            const data = await res.json()
            return { layer, label, data }
          }
          // Might be XML or text
          const text = await res.text()
          return { layer, label, data: text }
        } catch (err: any) {
          // CORS or network error
          return { layer, label, data: null, error: err.message || 'Feil ved henting' }
        }
      })
    )
    setWmsResults(results)

    const allErrors = results.every(r => r.error)
    if (allErrors) {
      newSteps[2] = { label: 'WMS-kall feilet (CORS?)', status: 'error' }
    } else {
      newSteps[2] = { label: 'Reguleringsdata hentet', status: 'done' }
    }
    newSteps[3] = { label: 'Henter kartbilde...', status: 'loading' }
    setSteps([...newSteps])

    // Step 4: Map image
    const mapImageUrl = wmsMapUrl(bbox)
    try {
      const res = await fetch(mapImageUrl)
      if (res.ok) {
        const blob = await res.blob()
        setMapUrl(URL.createObjectURL(blob))
      } else {
        setMapError(true)
      }
    } catch {
      setMapError(true)
    }

    newSteps[3] = mapError
      ? { label: 'Kartbilde utilgjengelig (CORS)', status: 'error' }
      : { label: 'Kartbilde hentet', status: 'done' }
    newSteps[4] = { label: 'Analyse ferdig', status: 'done' }
    setSteps([...newSteps])
    setAnalysing(false)
  }

  // ─── WMS data extraction helpers ──────────────────────────────────────

  function getFeatures(result: WMSResult | undefined): any[] {
    if (!result || result.error || !result.data) return []
    if (result.data.features) return result.data.features
    if (Array.isArray(result.data)) return result.data
    return []
  }

  const arealformaal = wmsResults.find(r => r.layer.includes('arealformaal'))
  const hensynssoner = wmsResults.find(r => r.layer.includes('hensynssoner'))
  const planomraade = wmsResults.find(r => r.layer.includes('planomraade'))
  const regulertHoyde = wmsResults.find(r => r.layer.includes('regulert_hoyde'))

  const arealFeatures = getFeatures(arealformaal)
  const hensynFeatures = getFeatures(hensynssoner)
  const planFeatures = getFeatures(planomraade)
  const hoydeFeatures = getFeatures(regulertHoyde)

  const corsBlocked = wmsResults.length > 0 && wmsResults.every(r => r.error)

  // ─── Render ───────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-tomtly-light">
      {/* Hero */}
      <section className="bg-tomtly-dark text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <span className="inline-block bg-tomtly-accent/20 text-tomtly-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Intern prototype
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Reguleringssjekk
          </h1>
          <p className="text-lg text-brand-300 mb-10 max-w-2xl mx-auto">
            Skriv inn en adresse og hent reguleringsdata automatisk fra offentlige API-er
          </p>

          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                placeholder="Skriv inn adresse..."
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-tomtly-dark placeholder:text-brand-400 text-base focus:outline-none focus:ring-2 focus:ring-tomtly-gold"
              />
            </div>

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-brand-200 rounded-lg shadow-xl overflow-hidden">
                {suggestions.map((adr, i) => (
                  <button
                    key={i}
                    onClick={() => runAnalysis(adr)}
                    className="w-full text-left px-4 py-3 hover:bg-brand-50 transition-colors flex items-start gap-3 border-b border-brand-100 last:border-0"
                  >
                    <MapPin className="w-4 h-4 text-tomtly-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-tomtly-dark">{adr.adressetekst}</p>
                      <p className="text-xs text-brand-500">{adr.kommunenavn} {adr.postnummer ? `– ${adr.postnummer} ${adr.poststed || ''}` : ''}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Steps progress */}
      {steps.length > 0 && (
        <section className="bg-white border-b border-brand-100">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center gap-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  {step.status === 'done' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                  {step.status === 'loading' && <Loader2 className="w-4 h-4 text-tomtly-accent animate-spin" />}
                  {step.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-brand-300" />}
                  {step.status === 'error' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  <span className={`text-xs font-medium ${
                    step.status === 'done' ? 'text-green-700' :
                    step.status === 'error' ? 'text-red-600' :
                    step.status === 'loading' ? 'text-tomtly-accent' :
                    'text-brand-400'
                  }`}>{step.label}</span>
                  {i < steps.length - 1 && <span className="text-brand-300 mx-1">→</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {valgtAdresse && !analysing && (
        <section className="py-8 md:py-12">
          <div className="max-w-5xl mx-auto px-4 space-y-8">

            {/* 3a: Address info */}
            <div className="bg-white rounded-xl border border-brand-100 p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-tomtly-dark mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-tomtly-accent" />
                Adresseinformasjon
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <InfoBox label="Adresse" value={valgtAdresse.adressetekst} />
                <InfoBox label="Kommune" value={`${valgtAdresse.kommunenavn} (${valgtAdresse.kommunenummer})`} />
                <InfoBox label="GNR/BNR" value={
                  valgtAdresse.matrikkelnummeradresse
                    ? `${valgtAdresse.matrikkelnummeradresse.gardsnummer || '?'}/${valgtAdresse.matrikkelnummeradresse.bruksnummer || '?'}`
                    : '–'
                } />
                <InfoBox label="Koordinater (WGS84)" value={`${valgtAdresse.representasjonspunkt.lat.toFixed(5)}, ${valgtAdresse.representasjonspunkt.lon.toFixed(5)}`} />
                {utm && (
                  <>
                    <InfoBox label="UTM33 East" value={utm.x.toFixed(1)} />
                    <InfoBox label="UTM33 North" value={utm.y.toFixed(1)} />
                  </>
                )}
              </div>
            </div>

            {/* 3b: Map image */}
            <div className="bg-white rounded-xl border border-brand-100 p-6 shadow-sm">
              <h2 className="font-display text-lg font-bold text-tomtly-dark mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-tomtly-accent" />
                Reguleringsplankart
              </h2>
              {mapUrl ? (
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mapUrl} alt="Reguleringsplankart" className="w-full rounded-lg border border-brand-200" />
                  <p className="text-xs text-brand-400 mt-2">Kartdata fra Geonorge / Direktoratet for byggkvalitet</p>
                </div>
              ) : mapError || corsBlocked ? (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800 mb-2">
                    WMS-kall krever en proxy-server for produksjonsbruk (CORS-blokkering).
                  </p>
                  {utm && (
                    <a
                      href={wmsMapUrl(`${utm.x - 250},${utm.y - 250},${utm.x + 250},${utm.y + 250}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-amber-700 underline break-all"
                    >
                      Åpne kartbilde direkte i nettleseren
                    </a>
                  )}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-brand-300" />
                </div>
              )}
            </div>

            {/* CORS warning */}
            {corsBlocked && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800 mb-1">WMS-data blokkert av CORS</h3>
                    <p className="text-sm text-amber-700 mb-3">
                      DiBK sin WMS-tjeneste tillater ikke direkte kall fra nettleseren. For produksjonsbruk trengs en proxy-server.
                    </p>
                    <p className="text-xs text-amber-600 mb-2">Du kan åpne lenkene direkte for å se dataene:</p>
                    {utm && (
                      <div className="space-y-1">
                        {['arealformaal', 'hensynssoner', 'planomraade', 'regulert_hoyde'].map(layer => (
                          <a
                            key={layer}
                            href={wmsFeatureInfoUrl(`reguleringsplaner_vn1_${layer}`, `${utm.x - 250},${utm.y - 250},${utm.x + 250},${utm.y + 250}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-amber-700 underline"
                          >
                            {layer.replace(/_/g, ' ')}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 3c: Regulation data cards */}
            {!corsBlocked && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Arealformål */}
                <div className="bg-white rounded-xl border border-brand-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-tomtly-accent" />
                    Arealformål
                  </h3>
                  {arealformaal?.error ? (
                    <p className="text-sm text-red-600">{arealformaal.error}</p>
                  ) : arealFeatures.length > 0 ? (
                    <div className="space-y-3">
                      {arealFeatures.map((f: any, i: number) => (
                        <div key={i} className="bg-brand-50 rounded-lg p-3 border border-brand-100">
                          {f.properties && Object.entries(f.properties).map(([k, v]: [string, any]) => (
                            <div key={k} className="flex justify-between text-xs py-0.5">
                              <span className="text-brand-500">{k}</span>
                              <span className="font-medium text-brand-700 text-right max-w-[60%] truncate">{String(v ?? '–')}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-brand-400">Ingen arealformål funnet</p>
                  )}
                </div>

                {/* Planinfo */}
                <div className="bg-white rounded-xl border border-brand-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-tomtly-accent" />
                    Planinfo
                  </h3>
                  {planomraade?.error ? (
                    <p className="text-sm text-red-600">{planomraade.error}</p>
                  ) : planFeatures.length > 0 ? (
                    <div className="space-y-3">
                      {planFeatures.map((f: any, i: number) => {
                        const p = f.properties || {}
                        return (
                          <div key={i} className="bg-brand-50 rounded-lg p-3 border border-brand-100">
                            {p.plannavn && <div className="text-sm font-semibold text-tomtly-dark mb-1">{p.plannavn}</div>}
                            {Object.entries(p).map(([k, v]: [string, any]) => (
                              <div key={k} className="flex justify-between text-xs py-0.5">
                                <span className="text-brand-500">{k}</span>
                                <span className="font-medium text-brand-700 text-right max-w-[60%] truncate">{String(v ?? '–')}</span>
                              </div>
                            ))}
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-brand-400">Ingen planinfo funnet</p>
                  )}
                </div>

                {/* Hensynssoner */}
                <div className="bg-white rounded-xl border border-brand-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-tomtly-accent" />
                    Hensynssoner
                  </h3>
                  {hensynssoner?.error ? (
                    <p className="text-sm text-red-600">{hensynssoner.error}</p>
                  ) : hensynFeatures.length > 0 ? (
                    <div className="space-y-2">
                      {hensynFeatures.map((f: any, i: number) => (
                        <div key={i} className="bg-amber-50 rounded-lg p-3 border border-amber-100 text-xs">
                          {f.properties && Object.entries(f.properties).map(([k, v]: [string, any]) => (
                            <div key={k} className="flex justify-between py-0.5">
                              <span className="text-amber-600">{k}</span>
                              <span className="font-medium text-amber-800">{String(v ?? '–')}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-brand-400">Ingen hensynssoner registrert</p>
                  )}
                </div>

                {/* Regulert høyde */}
                <div className="bg-white rounded-xl border border-brand-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-tomtly-accent" />
                    Regulert høyde
                  </h3>
                  {regulertHoyde?.error ? (
                    <p className="text-sm text-red-600">{regulertHoyde.error}</p>
                  ) : hoydeFeatures.length > 0 ? (
                    <div className="space-y-2">
                      {hoydeFeatures.map((f: any, i: number) => (
                        <div key={i} className="bg-brand-50 rounded-lg p-3 border border-brand-100 text-xs">
                          {f.properties && Object.entries(f.properties).map(([k, v]: [string, any]) => (
                            <div key={k} className="flex justify-between py-0.5">
                              <span className="text-brand-500">{k}</span>
                              <span className="font-medium text-brand-700">{String(v ?? '–')}</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-brand-400">Ingen regulert høyde registrert</p>
                  )}
                </div>
              </div>
            )}

            {/* 3d: Raw data */}
            <div className="bg-white rounded-xl border border-brand-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setShowRawData(!showRawData)}
                className="w-full flex items-center justify-between p-4 hover:bg-brand-50 transition-colors"
              >
                <span className="font-semibold text-tomtly-dark text-sm">Vis rådata (JSON)</span>
                {showRawData ? <ChevronUp className="w-4 h-4 text-brand-400" /> : <ChevronDown className="w-4 h-4 text-brand-400" />}
              </button>
              {showRawData && (
                <div className="border-t border-brand-100 p-4 space-y-4">
                  {wmsResults.map((r, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold text-brand-600 mb-1">{r.label} ({r.layer})</p>
                      {r.error ? (
                        <p className="text-xs text-red-600 bg-red-50 rounded p-2">{r.error}</p>
                      ) : (
                        <pre className="text-[10px] text-brand-600 bg-brand-50 rounded-lg p-3 overflow-x-auto max-h-60 border border-brand-100 font-mono">
                          {typeof r.data === 'string' ? r.data : JSON.stringify(r.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Section 5: Next steps */}
            <div className="bg-forest-50 rounded-xl border border-forest-200 p-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-tomtly-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-tomtly-dark mb-2">Neste steg</h3>
                  <p className="text-sm text-brand-600 mb-3">
                    Dette er en prototype som henter åpne data fra Geonorge. Fullverdig analyse inkluderer også:
                  </p>
                  <ul className="text-sm text-brand-600 space-y-1.5">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent shrink-0" />
                      KI-tolkning av planbestemmelser (Planslurpen)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent shrink-0" />
                      Husmodeller tilpasset tomten
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent shrink-0" />
                      3D-visualisering
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent shrink-0" />
                      Byggekalkyle
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent shrink-0" />
                      Verdivurdering
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {!valgtAdresse && !analysing && (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Search className="w-12 h-12 text-brand-200 mx-auto mb-4" />
            <p className="text-brand-400">Skriv inn en adresse for å starte analysen</p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-brand-100 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-brand-400">
            Intern prototype – Tomtly.no | Data fra Geonorge og Direktoratet for byggkvalitet | NOPS AS
          </p>
        </div>
      </footer>
    </div>
  )
}

// ─── Info box component ─────────────────────────────────────────────────────

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-brand-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-medium text-tomtly-dark break-words">{value}</p>
    </div>
  )
}
