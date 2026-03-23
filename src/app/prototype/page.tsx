'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import {
  MapPin, Search, CheckCircle2, Loader2, AlertTriangle,
  ChevronDown, ChevronUp, Layers, FileText, Shield, Info,
  TreePine, Building2, Gauge, Database, ExternalLink
} from 'lucide-react'

// ─── Constants ──────────────────────────────────────────────────────────────

const PLANSLURPEN_API_KEY = '213ca4ee-0a90-4215-b7cf-0f94042c7cf2'
const PLANSLURPEN_BASE = 'https://www.planslurpen.no/api'
const KARTVERKET_EIENDOM = 'https://ws.geonorge.no/eiendom/v1'
const KARTVERKET_TRANSFORM = 'https://ws.geonorge.no/transformering/v1'
const KARTVERKET_DOK = 'https://kartverket-ogc-api.azurewebsites.net/processes/fullstendighetsdekning/execution'
const NIBIO_AR5 = 'https://wms.nibio.no/cgi-bin/ar5'
const AREALPLANER_BASE = 'https://api.arealplaner.no/api'
const AREALPLANER_TOKEN = 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5'

const API_TIMEOUT = 15000

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
  x: number
  y: number
}

interface PlanRegisterItem {
  planId: string
  plannavn?: string
  plantype?: string
  planstatus?: string
  [key: string]: unknown
}

interface PlanMeta {
  versjon?: number
  status?: { navn?: string }
  [key: string]: unknown
}

interface PlanTolkning {
  planId: string
  plannavn?: string
  plantype?: string
  planstatus?: string
  meta: PlanMeta | null
  output: PlanOutput | null
  error?: string
}

interface PlanOutput {
  felter?: PlanFelt[]
  [key: string]: unknown
}

interface PlanFelt {
  navn?: string
  underfelter?: PlanUnderfelt[]
  [key: string]: unknown
}

interface PlanUnderfelt {
  navn?: string
  parametre?: PlanParameter[]
  bestemmelser?: PlanBestemmelse[]
  tekst?: string
  [key: string]: unknown
}

interface PlanParameter {
  navn?: string
  verdi?: string | number
  enhet?: string
  [key: string]: unknown
}

interface PlanBestemmelse {
  nummerering?: string
  overskrift?: string
  tekst?: string
  side?: number | string
  [key: string]: unknown
}

interface DOKDataset {
  tittel?: string
  tema?: string
  status?: string
  dekning?: string
  metadata?: string
  [key: string]: unknown
}

interface AR5Result {
  arealtype?: string
  treslag?: string
  skogbonitet?: string
  grunnforhold?: string
  [key: string]: string | undefined
}

interface TeigResult {
  teiger: number
  noyaktighetsklasse?: string
  raw?: unknown
}

interface ArealplanerDok {
  id: number
  dokumentnavn: string
  dokumenttype: string
  dokumenttypeId: number
  url?: string
  direkteUrl?: string
  dokumentdato?: string
  tilgang?: string
}

interface ArealplanerPlan {
  id: number
  planId: string
  planNavn: string
  planType?: { beskrivelse?: string }
  planStatus?: { beskrivelse?: string }
  iKraft?: string
  dokumenter?: ArealplanerDok[]
}

type StepStatus = 'pending' | 'loading' | 'done' | 'error'

interface Step {
  label: string
  status: StepStatus
  detail?: string
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function debounce<T extends (...args: never[]) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>
  return ((...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }) as unknown as T
}

async function fetchWithTimeout(url: string, opts?: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), API_TIMEOUT)
  try {
    const res = await fetch(url, { ...opts, signal: controller.signal })
    return res
  } finally {
    clearTimeout(id)
  }
}

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val))
}

function scoreColor(score: number): string {
  if (score >= 8) return 'text-green-600'
  if (score >= 5) return 'text-amber-600'
  return 'text-red-600'
}

function scoreBg(score: number): string {
  if (score >= 8) return 'bg-green-50 border-green-200'
  if (score >= 5) return 'bg-amber-50 border-amber-200'
  return 'bg-red-50 border-red-200'
}

function statusColor(status: string): string {
  const s = (status || '').toLowerCase()
  if (s.includes('dekket') || s.includes('ok') || s === 'ja') return 'bg-green-50 text-green-800'
  if (s.includes('ikke') || s.includes('mangl')) return 'bg-red-50 text-red-800'
  if (s.includes('delvis')) return 'bg-amber-50 text-amber-800'
  return 'bg-brand-50 text-brand-700'
}

// ─── DOK Category helpers ───────────────────────────────────────────────────

interface DOKCategory {
  label: string
  icon: typeof Shield
  keywords: string[]
  items: DOKDataset[]
}

function categorizeDOK(datasets: DOKDataset[]): DOKCategory[] {
  const categories: DOKCategory[] = [
    { label: 'Naturfare', icon: AlertTriangle, keywords: ['flom', 'skred', 'kvikkleire', 'ras', 'stormflo', 'erosjon'], items: [] },
    { label: 'Grunnforhold', icon: Layers, keywords: ['radon', 'løsmasse', 'berggrunn', 'grunnforurens', 'marin grense'], items: [] },
    { label: 'Kulturminner', icon: Building2, keywords: ['kulturmin', 'kulturmiljø', 'fredet', 'verneverdig'], items: [] },
    { label: 'Natur', icon: TreePine, keywords: ['naturtype', 'arter', 'verne', 'villrein', 'frilufts', 'myr'], items: [] },
    { label: 'Landbruk', icon: Layers, keywords: ['jordbruk', 'bonitet', 'reindrift', 'beite'], items: [] },
    { label: 'Infrastruktur', icon: Building2, keywords: ['kraftledning', 'vei', 'jernbane', 'støy'], items: [] },
  ]
  const annet: DOKCategory = { label: 'Annet', icon: Info, keywords: [], items: [] }

  for (const ds of datasets) {
    const text = `${ds.tittel || ''} ${ds.tema || ''}`.toLowerCase()
    let placed = false
    for (const cat of categories) {
      if (cat.keywords.some(kw => text.includes(kw))) {
        cat.items.push(ds)
        placed = true
        break
      }
    }
    if (!placed) annet.items.push(ds)
  }

  return [...categories.filter(c => c.items.length > 0), ...(annet.items.length > 0 ? [annet] : [])]
}

function calculateScore(dokDatasets: DOKDataset[], plans: PlanRegisterItem[]): number {
  let score = 10
  const allText = dokDatasets.map(d => `${d.tittel || ''} ${d.status || ''} ${d.dekning || ''}`).join(' ').toLowerCase()

  if (['flom', 'skred', 'kvikkleire', 'ras', 'stormflo', 'erosjon'].some(k => allText.includes(k) && allText.includes('dekket')))
    score -= 1.5
  if (['forurens', 'forurenset'].some(k => allText.includes(k)))
    score -= 1.5
  if (['kulturmin', 'kulturmiljø', 'fredet'].some(k => allText.includes(k) && allText.includes('dekket')))
    score -= 1
  if (['verne', 'verneområde', 'naturreservat'].some(k => allText.includes(k) && allText.includes('dekket')))
    score -= 2
  if (['jordvern', 'jordbruk'].some(k => allText.includes(k) && allText.includes('dekket')))
    score -= 1.5
  if (plans.length === 0)
    score -= 1

  return clamp(Math.round(score * 10) / 10, 1, 10)
}

// ─── Parse GML from NIBIO ──────────────────────────────────────────────────

function parseAR5GML(text: string): AR5Result {
  const result: AR5Result = {}
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/xml')
    const getValue = (tag: string) => {
      const el = doc.getElementsByTagName(tag)[0] || doc.querySelector(`[*|localName="${tag}"]`)
      return el?.textContent || undefined
    }
    result.arealtype = getValue('arealtype') || getValue('AR5_AREALTYPE')
    result.treslag = getValue('treslag') || getValue('AR5_TRESLAG')
    result.skogbonitet = getValue('skogbonitet') || getValue('AR5_SKOGBON')
    result.grunnforhold = getValue('grunnforhold') || getValue('AR5_GRUNNF')
  } catch {
    // ignore parse errors
  }
  return result
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function PrototypePage() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Adresse[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [valgtAdresse, setValgtAdresse] = useState<Adresse | null>(null)
  const [analysing, setAnalysing] = useState(false)

  // Results
  const [teigResult, setTeigResult] = useState<TeigResult | null>(null)
  const [plans, setPlans] = useState<PlanRegisterItem[]>([])
  const [planTolkninger, setPlanTolkninger] = useState<PlanTolkning[]>([])
  const [dokDatasets, setDokDatasets] = useState<DOKDataset[]>([])
  const [ar5, setAr5] = useState<AR5Result | null>(null)
  const [tomteScore, setTomteScore] = useState<number | null>(null)
  const [arealplaner, setArealplaner] = useState<ArealplanerPlan[]>([])
  const [steps, setSteps] = useState<Step[]>([])

  // Expandable sections
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set())
  const [expandedDOK, setExpandedDOK] = useState<Set<string>>(new Set())

  const inputRef = useRef<HTMLInputElement>(null)

  // ─── Address search ─────────────────────────────────────────────────────

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    searchAddress(val as never)
  }

  // ─── Analysis pipeline ────────────────────────────────────────────────

  async function runAnalysis(adr: Adresse) {
    setValgtAdresse(adr)
    setQuery(adr.adressetekst)
    setShowSuggestions(false)
    setAnalysing(true)
    setTeigResult(null)
    setPlans([])
    setPlanTolkninger([])
    setDokDatasets([])
    setAr5(null)
    setTomteScore(null)
    setExpandedPlans(new Set())
    setExpandedDOK(new Set())
    setArealplaner([])

    const { lat, lon } = adr.representasjonspunkt
    const knr = adr.kommunenummer
    const gnr = adr.matrikkelnummeradresse?.gardsnummer
    const bnr = adr.matrikkelnummeradresse?.bruksnummer

    const stepsList: Step[] = [
      { label: 'Adresse valgt', status: 'done' },
      { label: 'Henter eiendomsdata', status: 'loading' },
      { label: 'Henter planregister', status: 'pending' },
      { label: 'DOK-analyse', status: 'pending' },
      { label: 'Koordinattransformasjon', status: 'pending' },
      { label: 'KI-tolkning av planer', status: 'pending' },
      { label: 'Arealressurser (NIBIO)', status: 'pending' },
      { label: 'Arealplaner.no dokumenter', status: 'pending' },
    ]
    setSteps([...stepsList])

    // ─── Group 1: Parallel, no dependencies ─────────────────────────

    const updateStep = (idx: number, update: Partial<Step>) => {
      Object.assign(stepsList[idx], update)
      setSteps([...stepsList])
    }

    updateStep(1, { status: 'loading' })
    updateStep(2, { status: 'loading' })
    updateStep(3, { status: 'loading' })
    updateStep(4, { status: 'loading' })

    const [teigRes, planRes, dokRes, utmRes] = await Promise.allSettled([
      // Teiggeometri
      (async () => {
        if (!gnr || !bnr) throw new Error('Mangler gnr/bnr')
        const url = `${KARTVERKET_EIENDOM}/geokoding?kommunenummer=${knr}&gardsnummer=${gnr}&bruksnummer=${bnr}&omrade=true&utkoordsys=25833`
        const res = await fetchWithTimeout(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })(),
      // Planregister
      (async () => {
        if (!gnr || !bnr) throw new Error('Mangler gnr/bnr')
        const url = `${PLANSLURPEN_BASE}/planregister/${knr}/${gnr}/${bnr}`
        const res = await fetchWithTimeout(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })(),
      // DOK-analyse
      (async () => {
        const url = KARTVERKET_DOK
        const body = {
          inputs: {
            datasets: [],
            geometry: { type: 'Point', coordinates: [lon, lat] }
          }
        }
        const res = await fetchWithTimeout(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })(),
      // UTM transform
      (async () => {
        const url = `${KARTVERKET_TRANSFORM}/transformer?x=${lat}&y=${lon}&fra=4258&til=25833`
        const res = await fetchWithTimeout(url)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })(),
    ])

    // Process teig
    let teigData: TeigResult | null = null
    if (teigRes.status === 'fulfilled') {
      const data = teigRes.value
      const teiger = Array.isArray(data) ? data.length : (data?.teiger?.length || 0)
      teigData = {
        teiger,
        noyaktighetsklasse: data?.noyaktighetsklasse || data?.[0]?.noyaktighetsklasse,
        raw: data,
      }
      setTeigResult(teigData)
      updateStep(1, { status: 'done', label: 'Eiendomsdata hentet' })
    } else {
      updateStep(1, { status: 'error', label: 'Eiendomsdata feilet', detail: teigRes.reason?.message })
    }

    // Process plans
    let planList: PlanRegisterItem[] = []
    if (planRes.status === 'fulfilled') {
      const data = planRes.value
      planList = Array.isArray(data) ? data : (data?.planer || data?.planregister || [])
      setPlans(planList)
      updateStep(2, { status: 'done', label: `${planList.length} planer funnet` })
    } else {
      updateStep(2, { status: 'error', label: 'Planregister feilet', detail: planRes.reason?.message })
    }

    // Process DOK
    let dokList: DOKDataset[] = []
    if (dokRes.status === 'fulfilled') {
      const data = dokRes.value
      dokList = data?.datasets || data?.results || (Array.isArray(data) ? data : [])
      setDokDatasets(dokList)
      updateStep(3, { status: 'done', label: `DOK: ${dokList.length} datasett` })
    } else {
      updateStep(3, { status: 'error', label: 'DOK-analyse feilet', detail: dokRes.reason?.message })
    }

    // Process UTM
    let utmCoords: UTMKoordinat | null = null
    if (utmRes.status === 'fulfilled') {
      const data = utmRes.value
      utmCoords = { x: data.x, y: data.y }
      updateStep(4, { status: 'done', label: 'Koordinater transformert' })
    } else {
      updateStep(4, { status: 'error', label: 'Koordinater feilet', detail: utmRes.reason?.message })
    }

    // ─── Group 2: Depends on group 1 ───────────────────────────────

    // KI-tolkning for each plan
    updateStep(5, { status: 'loading' })
    const tolkninger: PlanTolkning[] = []

    if (planList.length > 0) {
      const tolkResults = await Promise.allSettled(
        planList.map(async (plan): Promise<PlanTolkning> => {
          const planId = plan.planId
          const tolkning: PlanTolkning = {
            planId,
            plannavn: plan.plannavn,
            plantype: plan.plantype,
            planstatus: plan.planstatus,
            meta: null,
            output: null,
          }

          try {
            // Fetch metadata (no auth)
            const metaUrl = `${PLANSLURPEN_BASE}/planslurp/${knr}/${planId}`
            const metaRes = await fetchWithTimeout(metaUrl)
            if (!metaRes.ok) throw new Error(`Meta HTTP ${metaRes.status}`)
            const meta: PlanMeta = await metaRes.json()
            tolkning.meta = meta

            // If ferdig, fetch output
            if (meta.status?.navn === 'Ferdig' && meta.versjon) {
              const outputUrl = `${PLANSLURPEN_BASE}/nedlasting/output/${knr}/${planId}?versjon=${meta.versjon}`
              const outputRes = await fetchWithTimeout(outputUrl, {
                headers: { 'x-api-key': PLANSLURPEN_API_KEY }
              })
              if (outputRes.ok) {
                tolkning.output = await outputRes.json()
              }
            }
          } catch (err: unknown) {
            tolkning.error = err instanceof Error ? err.message : String(err)
          }

          return tolkning
        })
      )

      for (const r of tolkResults) {
        if (r.status === 'fulfilled') tolkninger.push(r.value)
      }
      setPlanTolkninger(tolkninger)
      const tolkedCount = tolkninger.filter(t => t.output).length
      updateStep(5, { status: 'done', label: `${tolkedCount}/${planList.length} planer tolket` })
    } else {
      updateStep(5, { status: 'done', label: 'Ingen planer å tolke' })
    }

    // NIBIO AR5 via WMS GetFeatureInfo
    updateStep(6, { status: 'loading' })
    if (utmCoords) {
      try {
        const east = utmCoords.x
        const north = utmCoords.y
        const bbox = `${east - 50},${north - 50},${east + 50},${north + 50}`
        const url = `${NIBIO_AR5}?service=WMS&version=1.3.0&request=GetFeatureInfo&layers=AR5_FLATE&query_layers=AR5_FLATE&crs=EPSG:25833&bbox=${bbox}&width=101&height=101&i=50&j=50&info_format=application/vnd.ogc.gml`
        const res = await fetchWithTimeout(url)
        if (res.ok) {
          const text = await res.text()
          const parsed = parseAR5GML(text)
          setAr5(parsed)
          updateStep(6, { status: 'done', label: 'Arealressurser hentet' })
        } else {
          throw new Error(`HTTP ${res.status}`)
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        if (msg.includes('abort') || msg.includes('CORS') || msg.includes('Failed to fetch')) {
          updateStep(6, { status: 'error', label: 'NIBIO blokkert (CORS)', detail: msg })
        } else {
          updateStep(6, { status: 'error', label: 'Arealressurser feilet', detail: msg })
        }
      }
    } else {
      updateStep(6, { status: 'error', label: 'Mangler UTM-koordinater' })
    }

    // Arealplaner.no – hent dokumenter (bestemmelser, plankart, planbeskrivelse)
    updateStep(7, { status: 'loading' })
    try {
      // Find kundeId for this kommune
      const kunderRes = await fetchWithTimeout(`${AREALPLANER_BASE}/kunder`, {
        headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN }
      })
      if (!kunderRes.ok) throw new Error(`HTTP ${kunderRes.status}`)
      const kunder = await kunderRes.json()
      const kunde = kunder.find((k: any) => k.kommunenummer === knr && k.status === 0)

      if (kunde) {
        // Hent planer for kommune (første side)
        const planerRes = await fetchWithTimeout(
          `${AREALPLANER_BASE}/kunder/${kunde.id}/arealplaner?side=1&antall=50`,
          { headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN } }
        )
        if (planerRes.ok) {
          const apPlaner: ArealplanerPlan[] = await planerRes.json()

          // For de første 20 planene, hent dokumenter parallelt
          const withDocs = await Promise.allSettled(
            apPlaner.slice(0, 20).map(async (plan) => {
              try {
                const dokRes2 = await fetch(
                  `${AREALPLANER_BASE}/kunder/${kunde.id}/arealplaner/${plan.id}/dokumenter`,
                  { headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN } }
                )
                if (!dokRes2.ok) return { ...plan, dokumenter: [] }
                const docs = await dokRes2.json()

                // For bestemmelser, hent direkteUrl
                const enriched = await Promise.all(
                  docs.map(async (d: any) => {
                    if (d.dokumenttypeId === 5 || d.dokumenttype === 'Bestemmelser') {
                      try {
                        const metaRes = await fetch(
                          `${AREALPLANER_BASE}/kunder/${kunde.id}/dokumenter/${d.id}`,
                          { headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN } }
                        )
                        if (metaRes.ok) {
                          const meta = await metaRes.json()
                          return { ...d, direkteUrl: meta.direkteUrl }
                        }
                      } catch {}
                    }
                    return d
                  })
                )

                return { ...plan, dokumenter: enriched }
              } catch {
                return { ...plan, dokumenter: [] }
              }
            })
          )

          const result = withDocs
            .filter(r => r.status === 'fulfilled')
            .map(r => (r as PromiseFulfilledResult<ArealplanerPlan>).value)
            .filter(p => p.dokumenter && p.dokumenter.length > 0)

          setArealplaner(result)
          updateStep(7, { status: 'done', label: `${result.length} planer med dokumenter` })
        } else {
          throw new Error(`Planer HTTP ${planerRes.status}`)
        }
      } else {
        updateStep(7, { status: 'error', label: 'Kommune ikke i arealplaner.no' })
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      updateStep(7, { status: 'error', label: 'Arealplaner.no feilet', detail: msg })
    }

    // Calculate score
    const score = calculateScore(dokList, planList)
    setTomteScore(score)
    setAnalysing(false)
  }

  // ─── Toggle helpers ─────────────────────────────────────────────────

  function togglePlan(planId: string) {
    setExpandedPlans(prev => {
      const next = new Set(prev)
      next.has(planId) ? next.delete(planId) : next.add(planId)
      return next
    })
  }

  function toggleDOK(label: string) {
    setExpandedDOK(prev => {
      const next = new Set(prev)
      next.has(label) ? next.delete(label) : next.add(label)
      return next
    })
  }

  // ─── DOK summary counts ────────────────────────────────────────────

  const dokStatusCounts = dokDatasets.reduce<Record<string, number>>((acc, ds) => {
    const s = ds.status || ds.dekning || 'Ukjent'
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  const dokCategories = categorizeDOK(dokDatasets)

  // ─── Render ─────────────────────────────────────────────────────────

  const gnr = valgtAdresse?.matrikkelnummeradresse?.gardsnummer
  const bnr = valgtAdresse?.matrikkelnummeradresse?.bruksnummer

  return (
    <div className="min-h-screen bg-tomtly-light">
      {/* Hero */}
      <section className="bg-tomtly-dark text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <span className="inline-block bg-tomtly-accent/20 text-tomtly-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Prototype – Tomteanalyse
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Komplett tomteanalyse
          </h1>
          <p className="text-lg text-brand-300 mb-10 max-w-2xl mx-auto">
            Skriv inn en adresse for full analyse med reguleringsplaner, DOK-data, arealressurser og KI-tolkning
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
                      <p className="text-xs text-brand-500">
                        {adr.kommunenavn}
                        {adr.postnummer ? ` – ${adr.postnummer} ${adr.poststed || ''}` : ''}
                      </p>
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
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex flex-wrap items-center gap-3">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2">
                  {step.status === 'done' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                  {step.status === 'loading' && <Loader2 className="w-4 h-4 text-tomtly-accent animate-spin" />}
                  {step.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-brand-300" />}
                  {step.status === 'error' && <AlertTriangle className="w-4 h-4 text-red-500" />}
                  <span
                    className={`text-xs font-medium ${
                      step.status === 'done' ? 'text-green-700' :
                      step.status === 'error' ? 'text-red-600' :
                      step.status === 'loading' ? 'text-tomtly-accent' :
                      'text-brand-400'
                    }`}
                    title={step.detail || undefined}
                  >
                    {step.label}
                  </span>
                  {i < steps.length - 1 && <span className="text-brand-300 mx-1">&rarr;</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {valgtAdresse && !analysing && tomteScore !== null && (
        <section className="py-8 md:py-12">
          <div className="max-w-5xl mx-auto px-4 space-y-8">

            {/* 4a: Eiendomsheader */}
            <div className="bg-white rounded-xl border border-brand-100 p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <h2 className="font-display text-xl font-bold text-tomtly-dark mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-tomtly-accent" />
                    {valgtAdresse.adressetekst}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <InfoBox label="Kommune" value={`${valgtAdresse.kommunenavn} (${valgtAdresse.kommunenummer})`} />
                    <InfoBox label="GNR/BNR" value={gnr && bnr ? `${gnr}/${bnr}` : 'Ikke tilgjengelig'} />
                    <InfoBox label="Postnr" value={valgtAdresse.postnummer ? `${valgtAdresse.postnummer} ${valgtAdresse.poststed || ''}` : '–'} />
                    <InfoBox label="Koordinater" value={`${valgtAdresse.representasjonspunkt.lat.toFixed(5)}, ${valgtAdresse.representasjonspunkt.lon.toFixed(5)}`} />
                  </div>
                </div>

                {/* Score badge */}
                <div className={`flex flex-col items-center justify-center rounded-xl border p-5 min-w-[140px] ${scoreBg(tomteScore)}`}>
                  <span className="text-[10px] uppercase tracking-wide text-brand-500 mb-1">Tomtescore</span>
                  <span className={`font-display text-4xl font-bold ${scoreColor(tomteScore)}`}>
                    {tomteScore.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-brand-400 mt-0.5">av 10</span>
                </div>
              </div>
            </div>

            {/* 4b: Plananalyse */}
            {(plans.length > 0 || planTolkninger.length > 0) && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-tomtly-dark flex items-center gap-2">
                  <FileText className="w-5 h-5 text-tomtly-accent" />
                  Plananalyse ({plans.length} {plans.length === 1 ? 'plan' : 'planer'})
                </h2>

                {planTolkninger.map((tolkning) => {
                  const isExpanded = expandedPlans.has(tolkning.planId)
                  const hasTolkning = !!tolkning.output
                  return (
                    <div key={tolkning.planId} className="bg-white rounded-xl border border-brand-100 shadow-sm overflow-hidden">
                      <button
                        onClick={() => togglePlan(tolkning.planId)}
                        className="w-full flex items-center justify-between p-5 hover:bg-brand-50 transition-colors text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-tomtly-dark text-sm truncate">
                              {tolkning.plannavn || `Plan ${tolkning.planId}`}
                            </span>
                            {tolkning.plantype && (
                              <span className="text-[10px] bg-forest-50 text-forest-700 px-2 py-0.5 rounded-full">
                                {tolkning.plantype}
                              </span>
                            )}
                            {tolkning.planstatus && (
                              <span className="text-[10px] bg-brand-100 text-brand-600 px-2 py-0.5 rounded-full">
                                {tolkning.planstatus}
                              </span>
                            )}
                            {hasTolkning && (
                              <span className="text-[10px] bg-tomtly-accent/10 text-tomtly-accent px-2 py-0.5 rounded-full font-medium">
                                KI-tolket
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-brand-400 mt-1">Plan-ID: {tolkning.planId}</p>
                        </div>
                        {isExpanded
                          ? <ChevronUp className="w-4 h-4 text-brand-400 shrink-0" />
                          : <ChevronDown className="w-4 h-4 text-brand-400 shrink-0" />
                        }
                      </button>

                      {isExpanded && (
                        <div className="border-t border-brand-100 p-5 space-y-5">
                          {hasTolkning && tolkning.output?.felter ? (
                            tolkning.output.felter.map((felt, fi) => (
                              <div key={fi} className="space-y-3">
                                {felt.navn && (
                                  <h4 className="font-semibold text-tomtly-dark text-sm border-b border-brand-100 pb-2">
                                    {felt.navn}
                                  </h4>
                                )}
                                {felt.underfelter?.map((uf, ui) => (
                                  <div key={ui} className="pl-3 border-l-2 border-tomtly-accent/20 space-y-2">
                                    {uf.navn && (
                                      <p className="text-xs font-semibold text-brand-600 uppercase tracking-wide">{uf.navn}</p>
                                    )}

                                    {/* Parameters table */}
                                    {uf.parametre && uf.parametre.length > 0 && (
                                      <div className="overflow-x-auto">
                                        <table className="w-full text-xs">
                                          <thead>
                                            <tr className="bg-brand-50">
                                              <th className="text-left px-3 py-1.5 text-brand-500 font-medium">Parameter</th>
                                              <th className="text-left px-3 py-1.5 text-brand-500 font-medium">Verdi</th>
                                              <th className="text-left px-3 py-1.5 text-brand-500 font-medium">Enhet</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {uf.parametre.map((p, pi) => (
                                              <tr key={pi} className="border-b border-brand-50">
                                                <td className="px-3 py-1.5 text-brand-700">{p.navn || '–'}</td>
                                                <td className="px-3 py-1.5 font-mono font-medium text-tomtly-dark">{p.verdi ?? '–'}</td>
                                                <td className="px-3 py-1.5 text-brand-400">{p.enhet || ''}</td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    )}

                                    {/* Bestemmelser */}
                                    {uf.bestemmelser && uf.bestemmelser.length > 0 && (
                                      <div className="space-y-2">
                                        {uf.bestemmelser.map((b, bi) => (
                                          <blockquote key={bi} className="bg-forest-50 border-l-3 border-tomtly-accent rounded-r-lg p-3 text-xs text-brand-700">
                                            <span className="font-semibold text-tomtly-dark">
                                              &sect;{b.nummerering || '?'} &ndash; {b.overskrift || 'Bestemmelse'}
                                            </span>
                                            {b.tekst && (
                                              <p className="mt-1 italic text-brand-600">
                                                &ldquo;{b.tekst}&rdquo;
                                              </p>
                                            )}
                                            {b.side && (
                                              <span className="text-[10px] text-brand-400 mt-1 block">
                                                Side {b.side}
                                              </span>
                                            )}
                                          </blockquote>
                                        ))}
                                      </div>
                                    )}

                                    {/* Freetext */}
                                    {uf.tekst && !uf.parametre?.length && !uf.bestemmelser?.length && (
                                      <p className="text-xs text-brand-600">{uf.tekst}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ))
                          ) : tolkning.error ? (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                              <p className="text-sm text-red-700">Feil ved henting: {tolkning.error}</p>
                              {tolkning.error.includes('CORS') || tolkning.error.includes('Failed to fetch') ? (
                                <a
                                  href={`${PLANSLURPEN_BASE}/planslurp/${valgtAdresse.kommunenummer}/${tolkning.planId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-red-600 underline mt-1 inline-flex items-center gap-1"
                                >
                                  <ExternalLink className="w-3 h-3" /> Åpne direkte
                                </a>
                              ) : null}
                            </div>
                          ) : (
                            <div className="bg-brand-50 border border-brand-100 rounded-lg p-4">
                              <p className="text-sm text-brand-600">
                                {tolkning.meta?.status?.navn
                                  ? `Status: ${tolkning.meta.status.navn}`
                                  : 'KI-tolkning ikke tilgjengelig for denne planen'}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Plans without tolkning */}
                {plans.filter(p => !planTolkninger.find(t => t.planId === p.planId)).map((plan, i) => (
                  <div key={`orphan-${i}`} className="bg-white rounded-xl border border-brand-100 p-5 shadow-sm">
                    <p className="text-sm font-medium text-tomtly-dark">{plan.plannavn || plan.planId}</p>
                    <p className="text-xs text-brand-400 mt-1">
                      {plan.plantype && `${plan.plantype} · `}
                      {plan.planstatus && `${plan.planstatus} · `}
                      Plan-ID: {plan.planId}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 4b2: Arealplaner.no dokumenter */}
            {arealplaner.length > 0 && (
              <div className="bg-white rounded-2xl border border-brand-100 p-6 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-1">
                  <Database className="w-5 h-5 text-tomtly-accent" />
                  <h2 className="font-display text-xl font-bold text-tomtly-dark">
                    Plandokumenter fra arealplaner.no
                  </h2>
                </div>
                <p className="text-sm text-brand-500 mb-6">
                  Bestemmelser, plankart og planbeskrivelser – {arealplaner.length} planer med dokumenter
                </p>

                <div className="space-y-4">
                  {arealplaner.map(plan => (
                    <div key={plan.id} className="border border-brand-200 rounded-xl overflow-hidden">
                      <div className="bg-brand-50 px-4 py-3">
                        <h3 className="font-semibold text-tomtly-dark text-sm">{plan.planNavn || plan.planId}</h3>
                        <div className="flex flex-wrap gap-3 mt-1 text-xs text-brand-500">
                          {plan.planType?.beskrivelse && <span>{plan.planType.beskrivelse}</span>}
                          {plan.planStatus?.beskrivelse && <span className="text-green-700">{plan.planStatus.beskrivelse}</span>}
                          {plan.iKraft && <span>I kraft: {new Date(plan.iKraft).toLocaleDateString('nb-NO')}</span>}
                          <span className="text-brand-400">PlanID: {plan.planId}</span>
                        </div>
                      </div>
                      <div className="divide-y divide-brand-100">
                        {plan.dokumenter?.filter((d: ArealplanerDok) => d.tilgang === 'Alle' || !d.tilgang).map((dok: ArealplanerDok) => {
                          const isBestemmelse = dok.dokumenttypeId === 5 || dok.dokumenttype === 'Bestemmelser'
                          const isPlankart = dok.dokumenttype === 'Plankart'
                          const isBeskrivelse = dok.dokumenttype === 'Planbeskrivelse'
                          const color = isBestemmelse ? 'text-red-600 bg-red-50' : isPlankart ? 'text-blue-600 bg-blue-50' : isBeskrivelse ? 'text-purple-600 bg-purple-50' : 'text-brand-600 bg-brand-50'

                          return (
                            <div key={dok.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-brand-50/50">
                              <div className="flex items-center gap-3 min-w-0">
                                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${color}`}>
                                  {dok.dokumenttype || 'Dokument'}
                                </span>
                                <span className="text-sm text-brand-700 truncate">{dok.dokumentnavn}</span>
                              </div>
                              <div className="flex items-center gap-2 shrink-0 ml-2">
                                {dok.dokumentdato && (
                                  <span className="text-[10px] text-brand-400">{new Date(dok.dokumentdato).toLocaleDateString('nb-NO')}</span>
                                )}
                                {(dok.direkteUrl || dok.url) && (
                                  <a
                                    href={dok.direkteUrl || dok.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-tomtly-accent hover:bg-forest-50 rounded transition-colors"
                                  >
                                    <ExternalLink className="w-3 h-3" />
                                    {isBestemmelse ? 'Last ned PDF' : 'Åpne'}
                                  </a>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4c: DOK-analyse */}
            {dokDatasets.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-tomtly-dark flex items-center gap-2">
                  <Shield className="w-5 h-5 text-tomtly-accent" />
                  DOK-analyse ({dokDatasets.length} datasett)
                </h2>

                {/* Summary box */}
                <div className="bg-white rounded-xl border border-brand-100 p-5 shadow-sm">
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(dokStatusCounts).map(([status, count]) => (
                      <div key={status} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${statusColor(status)}`}>
                        {status}: {count}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grouped sections */}
                {dokCategories.map((cat) => {
                  const isExpanded = expandedDOK.has(cat.label)
                  const IconComp = cat.icon
                  return (
                    <div key={cat.label} className="bg-white rounded-xl border border-brand-100 shadow-sm overflow-hidden">
                      <button
                        onClick={() => toggleDOK(cat.label)}
                        className="w-full flex items-center justify-between p-4 hover:bg-brand-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <IconComp className="w-4 h-4 text-tomtly-accent" />
                          <span className="font-semibold text-tomtly-dark text-sm">{cat.label}</span>
                          <span className="text-[10px] bg-brand-100 text-brand-500 px-2 py-0.5 rounded-full">
                            {cat.items.length} funn
                          </span>
                        </div>
                        {isExpanded
                          ? <ChevronUp className="w-4 h-4 text-brand-400" />
                          : <ChevronDown className="w-4 h-4 text-brand-400" />
                        }
                      </button>

                      {isExpanded && (
                        <div className="border-t border-brand-100">
                          <div className="overflow-x-auto">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="bg-brand-50">
                                  <th className="text-left px-4 py-2 text-brand-500 font-medium">Datasett</th>
                                  <th className="text-left px-4 py-2 text-brand-500 font-medium">Tema</th>
                                  <th className="text-left px-4 py-2 text-brand-500 font-medium">Status/Dekning</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cat.items.map((ds, di) => {
                                  const st = ds.status || ds.dekning || '–'
                                  return (
                                    <tr key={di} className="border-b border-brand-50 last:border-0">
                                      <td className="px-4 py-2 text-brand-700 max-w-xs">
                                        {ds.tittel || '–'}
                                        {ds.metadata && (
                                          <a
                                            href={ds.metadata}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-1 inline-flex"
                                          >
                                            <ExternalLink className="w-3 h-3 text-brand-400 hover:text-tomtly-accent" />
                                          </a>
                                        )}
                                      </td>
                                      <td className="px-4 py-2 text-brand-500">{ds.tema || '–'}</td>
                                      <td className="px-4 py-2">
                                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium ${statusColor(st)}`}>
                                          {st}
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            {/* 4d: Arealressurser (NIBIO AR5) */}
            {ar5 && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-tomtly-dark flex items-center gap-2">
                  <TreePine className="w-5 h-5 text-tomtly-accent" />
                  Arealressurser (NIBIO AR5)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Arealtype', value: ar5.arealtype },
                    { label: 'Treslag', value: ar5.treslag },
                    { label: 'Skogbonitet', value: ar5.skogbonitet },
                    { label: 'Grunnforhold', value: ar5.grunnforhold },
                  ].map((item) => (
                    <div key={item.label} className="bg-white rounded-xl border border-brand-100 p-4 shadow-sm">
                      <p className="text-[10px] text-brand-500 uppercase tracking-wide mb-1">{item.label}</p>
                      <p className="text-sm font-medium text-tomtly-dark">{item.value || 'Ikke tilgjengelig'}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4e: Eiendomsgeometri */}
            {teigResult && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-tomtly-dark flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-tomtly-accent" />
                  Eiendomsgeometri
                </h2>
                <div className="bg-white rounded-xl border border-brand-100 p-5 shadow-sm">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <InfoBox label="Antall teiger" value={String(teigResult.teiger)} />
                    <InfoBox label="Nøyaktighetsklasse" value={teigResult.noyaktighetsklasse || 'Ikke oppgitt'} />
                  </div>
                </div>
              </div>
            )}

            {/* 4f: Datakilder footer */}
            <div className="bg-forest-50 rounded-xl border border-forest-200 p-6">
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-tomtly-accent mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-semibold text-tomtly-dark mb-2">Datakilder</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-xs text-brand-600">
                    <span>Kartverket – Eiendomsregisteret</span>
                    <span>Kartverket – DOK fullstendighetsdekning</span>
                    <span>Kartverket – Koordinattransformasjon</span>
                    <span>Planslurpen – Planregister og KI-tolkning</span>
                    <span>NIBIO – AR5 Arealressurskart</span>
                    <span>Arealplaner.no – Plandokumenter</span>
                    <span>Geonorge – Adresseregisteret</span>
                  </div>
                  <p className="text-[10px] text-brand-400 mt-3">
                    Data hentet {new Date().toLocaleDateString('nb-NO')}. Tomtescore er en indikativ vurdering og erstatter ikke faglig analyse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Loading state */}
      {analysing && (
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <Loader2 className="w-10 h-10 animate-spin text-tomtly-accent mx-auto mb-4" />
            <p className="text-brand-500 font-medium">Analyserer eiendommen...</p>
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
      <footer className="bg-white border-t border-brand-100 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-brand-400">
            Intern prototype – Tomtly.no | Data fra Kartverket, Planslurpen og NIBIO | NOPS AS
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
