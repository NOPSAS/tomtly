'use client'

import { useState, useRef, useCallback, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { getKommuneplanSammendrag } from '@/lib/kommuneplan-sammendrag'
import {
  MapPin, Search, CheckCircle2, Loader2, AlertTriangle,
  ChevronDown, ChevronUp, Layers, FileText, Shield, Info,
  TreePine, Building2, Gauge, Database, ExternalLink, Share2, Link2, Check
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
  gardsnummer?: number
  bruksnummer?: number
  bruksenhetsnummer?: string[]
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
  kommunenummer?: string
  raw?: any
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
  lastOppdatert?: string
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
  arealM2?: number
  raw?: unknown
}

interface EiendomsAnalyse {
  kommune: string
  kommunenummer: string
  gnr: number
  bnr: number
  koordinater: { lat: number; lon: number }
  arealM2: number
  antallBruksenheter: number
  plansammendrag: string | null
  byaProsent: number | null
  gesimshoydeM: number | null
  monehoydeM: number | null
  maksEtasjer: number | null
}

interface BestemmelseAnalyse {
  planNavn?: string
  planType?: string
  sammendrag?: string
  utnyttelsesgrad?: { bya_prosent?: number | null; bra_prosent?: number | null; tu_prosent?: number | null; beskrivelse?: string }
  hoyder?: { gesimshøyde_m?: number | null; mønehøyde_m?: number | null; maks_kotehøyde?: number | null; beskrivelse?: string }
  etasjer?: { maks_etasjer?: number | null; beskrivelse?: string }
  byggegrenser?: { mot_vei_m?: number | null; mot_nabo_m?: number | null; beskrivelse?: string }
  parkering?: { krav?: string; antall_per_boenhet?: number | null }
  uteoppholdsareal?: { krav_prosent?: number | null; beskrivelse?: string }
  mua?: { min_m2_per_boenhet?: number | null; prosent_av_bra?: number | null; beskrivelse?: string }
  viktige_bestemmelser?: string[]
  restriksjoner?: string[]
}

interface DispensasjonAnalyse {
  totalt: number
  godkjent: number
  avslatt: number
  godkjentProsent: number
  kategorier: { kategori: string; godkjent: number; avslatt: number; sannsynlighet: string }[]
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
  planType?: { beskrivelse?: string } | string
  planStatus?: { beskrivelse?: string } | string
  iKraft?: string
  dokumenter?: ArealplanerDok[]
  dispensasjoner?: any[]
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
  if (s.includes('uten funn') || s.includes('ikke relevant') || s.includes('utenfor')) return 'bg-green-50 text-green-800'
  if (s.includes('grundig kartlagt med funn')) return 'bg-amber-50 text-amber-800'
  if (s.includes('med funn')) return 'bg-red-50 text-red-800'
  if (s.includes('ikke kartlagt') || s.includes('ikke-system')) return 'bg-orange-50 text-orange-800'
  if (s.includes('dekket') || s.includes('ok')) return 'bg-green-50 text-green-800'
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

  for (const d of dokDatasets) {
    const name = (d.tittel || '').toLowerCase()
    const status = (d.status || d.dekning || '').toLowerCase()
    const hasFunn = status.includes('med funn') || status.includes('dekket')

    if (!hasFunn) continue

    if (['flom', 'skred', 'kvikkleire', 'ras', 'stormflo', 'erosjon'].some(k => name.includes(k)))
      score -= 1.5
    else if (['forurens', 'grunn'].some(k => name.includes(k)))
      score -= 1.5
    else if (['kulturmin', 'kulturmiljø', 'fredet'].some(k => name.includes(k)))
      score -= 1
    else if (['verne', 'naturreservat'].some(k => name.includes(k)))
      score -= 2
    else if (['jordvern', 'jordbruk', 'fulldyrka'].some(k => name.includes(k)))
      score -= 1.5
  }

  if (plans.length === 0) score -= 1

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

function PrototypeContent() {
  const searchParams = useSearchParams()
  // Lead capture
  const [leadNavn, setLeadNavn] = useState('')
  const [leadEpost, setLeadEpost] = useState('')
  const [leadTelefon, setLeadTelefon] = useState('')
  const [leadCaptured, setLeadCaptured] = useState(false)

  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Adresse[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [valgtAdresse, setValgtAdresse] = useState<Adresse | null>(null)
  const [analysing, setAnalysing] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const autoStarted = useRef(false)

  // Results
  const [teigResult, setTeigResult] = useState<TeigResult | null>(null)
  const [plans, setPlans] = useState<PlanRegisterItem[]>([])
  const [planTolkninger, setPlanTolkninger] = useState<PlanTolkning[]>([])
  const [dokDatasets, setDokDatasets] = useState<DOKDataset[]>([])
  const [ar5, setAr5] = useState<AR5Result | null>(null)
  const [tomteScore, setTomteScore] = useState<number | null>(null)
  const [arealplaner, setArealplaner] = useState<ArealplanerPlan[]>([])
  const [eiendomsAnalyse, setEiendomsAnalyse] = useState<EiendomsAnalyse | null>(null)
  const [dispAnalyse, setDispAnalyse] = useState<DispensasjonAnalyse | null>(null)
  const [bestemmelseAnalyser, setBestemmelseAnalyser] = useState<BestemmelseAnalyse[]>([])
  const [analyseringBestemmelser, setAnalyseringBestemmelser] = useState(false)
  const [fkbKart, setFkbKart] = useState<string | null>(null)
  const [kartBbox, setKartBbox] = useState<number[] | null>(null)
  const [kartLoading, setKartLoading] = useState(false)
  const kartCanvasRef = useRef<HTMLCanvasElement>(null)
  const [steps, setSteps] = useState<Step[]>([])

  // Expandable sections
  const [expandedPlans, setExpandedPlans] = useState<Set<string>>(new Set())
  const [expandedDOK, setExpandedDOK] = useState<Set<string>>(new Set())

  const inputRef = useRef<HTMLInputElement>(null)

  // ─── Auto-start from URL params ──────────────────────────────────────
  useEffect(() => {
    if (autoStarted.current) return
    const knr = searchParams.get('knr')
    const gnr = searchParams.get('gnr')
    const bnr = searchParams.get('bnr')
    if (knr && gnr && bnr) {
      autoStarted.current = true
      setLeadCaptured(true) // Skip lead gate for shared links
      // Look up address by gnr/bnr
      fetch(`https://ws.geonorge.no/adresser/v1/sok?kommunenummer=${knr}&gardsnummer=${gnr}&bruksnummer=${bnr}&treffPerSide=1`)
        .then(r => r.json())
        .then(data => {
          if (data.adresser?.length > 0) {
            runAnalysis(data.adresser[0])
          }
        })
        .catch(() => {})
    }
  }, [searchParams]) // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Share link ─────────────────────────────────────────────────────
  function getShareUrl() {
    if (!valgtAdresse) return ''
    const base = typeof window !== 'undefined' ? window.location.origin : ''
    const gnr = valgtAdresse.gardsnummer
    const bnr = valgtAdresse.bruksnummer
    return `${base}/prototype?knr=${valgtAdresse.kommunenummer}&gnr=${gnr}&bnr=${bnr}`
  }

  async function copyShareLink() {
    const url = getShareUrl()
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch {}
  }

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
    setLinkCopied(false)

    // Update URL for sharing
    if (adr.gardsnummer && adr.bruksnummer) {
      const url = `/prototype?knr=${adr.kommunenummer}&gnr=${adr.gardsnummer}&bnr=${adr.bruksnummer}`
      window.history.replaceState({}, '', url)
    }

    // Save lead + analysis request
    if (leadEpost) {
      fetch('/api/henvendelse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'prototype-analyse',
          navn: leadNavn,
          epost: leadEpost,
          telefon: leadTelefon,
          ekstra: {
            adresse: adr.adressetekst,
            kommunenummer: adr.kommunenummer,
            gnr: adr.gardsnummer,
            bnr: adr.bruksnummer,
          },
        }),
      }).catch(() => {})
    }
    setTeigResult(null)
    setPlans([])
    setPlanTolkninger([])
    setDokDatasets([])
    setAr5(null)
    setTomteScore(null)
    setExpandedPlans(new Set())
    setExpandedDOK(new Set())
    setArealplaner([])
    setEiendomsAnalyse(null)
    setDispAnalyse(null)
    setBestemmelseAnalyser([])
    setAnalyseringBestemmelser(false)
    setFkbKart(null)
    setKartBbox(null)
    setKartLoading(false)

    const { lat, lon } = adr.representasjonspunkt
    const knr = adr.kommunenummer
    const gnr = adr.gardsnummer
    const bnr = adr.bruksnummer

    const stepsList: Step[] = [
      { label: 'Adresse valgt', status: 'done' },
      { label: 'Henter eiendomsdata', status: 'loading' },
      { label: 'Henter planregister', status: 'pending' },
      { label: 'DOK-analyse', status: 'pending' },
      { label: 'Koordinattransformasjon', status: 'pending' },
      { label: 'KI-tolkning av planer', status: 'pending' },
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
      // DOK-analyse (via server-side proxy for pålitelighet)
      (async () => {
        const res = await fetch('/api/dok-analyse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat, lon })
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

    // Process teig – Kartverket returns FeatureCollection
    let teigData: TeigResult | null = null
    if (teigRes.status === 'fulfilled') {
      const data = teigRes.value
      const features = data?.features || (Array.isArray(data) ? data : [])
      const teiger = features.length
      const firstProps = features[0]?.properties
      teigData = {
        teiger,
        noyaktighetsklasse: firstProps?.nøyaktighetsklasseteig || firstProps?.noyaktighetsklasse || firstProps?.noyaktighetsklasseteig,
        raw: data,
      }
      setTeigResult(teigData)
      updateStep(1, { status: 'done', label: `Eiendom: ${teiger} teig(er)` })
    } else {
      updateStep(1, { status: 'error', label: 'Eiendomsdata feilet', detail: teigRes.reason?.message })
    }

    // Process plans – Planslurpen returns { plan: [...] }
    let planList: PlanRegisterItem[] = []
    if (planRes.status === 'fulfilled') {
      const data = planRes.value
      // Planslurpen bruker "plan" som nøkkel
      const rawPlans = data?.plan || data?.planer || data?.planregister || (Array.isArray(data) ? data : [])
      // Map til felles format – Planslurpen bruker nasjonalArealplanId
      planList = rawPlans.map((p: any) => ({
        planId: p.nasjonalArealplanId?.planidentifikasjon || p.planId || p.planidentifikasjon || '',
        plannavn: p.plannavn || p.planNavn || 'Ukjent plan',
        plantype: p.plantype?.kodebeskrivelse || p.plantype?.beskrivelse || p.planType || '',
        planstatus: p.planstatus?.kodebeskrivelse || p.planstatus?.beskrivelse || p.planStatus || '',
        kommunenummer: p.nasjonalArealplanId?.kommunenummer || knr,
        raw: p,
      }))
      setPlans(planList)
      updateStep(2, { status: 'done', label: `${planList.length} planer funnet` })
    } else {
      updateStep(2, { status: 'error', label: 'Planregister feilet', detail: planRes.reason?.message })
    }

    // Process DOK – server returns pre-categorized data
    let dokList: DOKDataset[] = []
    if (dokRes.status === 'fulfilled') {
      const data = dokRes.value
      // Server-side proxy returns coverages + risikoer
      const coverages = data?.coverages || data?.properties?.coverages || []
      dokList = coverages.map((c: any) => ({
        tittel: c.layerName || c.tittel || 'Ukjent datasett',
        tema: c.theme || c.tema || '',
        status: c.coverageStatus || c.status || '',
        dekning: c.coverageStatus || c.dekning || '',
        metadata: c.metadataUrl || c.metadata || '',
        lastOppdatert: c.lastUpdated || '',
      }))
      setDokDatasets(dokList)
      const totalt = data?.totaltDatasett || dokList.length
      const funn = data?.oppsummering?.funnCount || 0
      updateStep(3, { status: 'done', label: `DOK: ${totalt} datasett, ${funn} funn` })
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

    // ─── 2D Tomtekart ──────────────────────────────────────────────
    // Kartet tegnes direkte i TomteKartSection via WMTS tiles
    // Vi trenger bare å konvertere UTM teig-koordinater til lat/lon
    if (teigRes.status === 'fulfilled') {
      const features = teigRes.value?.features || []
      const utmCoords2 = features[0]?.geometry?.coordinates?.[0] || []
      if (utmCoords2.length > 0 && utmCoords) {
        setKartLoading(true)
        // Convert UTM polygon to lat/lon using Kartverket API
        // Send corners only (max 50 pts per call)
        const sample = utmCoords2.length > 45 ? utmCoords2.filter((_: any, i: number) => i % Math.ceil(utmCoords2.length / 45) === 0) : utmCoords2
        Promise.all(
          sample.map(async (c: number[]) => {
            try {
              const r = await fetch(`https://ws.geonorge.no/transformering/v1/transformer?x=${c[1]}&y=${c[0]}&fra=25833&til=4258`)
              if (r.ok) { const d = await r.json(); return [d.y, d.x] as [number, number] } // [lon, lat]
            } catch {}
            return null
          })
        ).then(results => {
          const valid = results.filter((r): r is [number, number] => r !== null)
          if (valid.length > 0) setFkbKart(JSON.stringify(valid)) // Store as JSON string for now
          setKartLoading(false)
        })
      }
    }

    // Arealplaner.no – hent dokumenter + dispensasjoner for denne eiendommen
    updateStep(6, { status: 'loading' })
    try {
      const apHeaders = { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN }

      // Find kundeId for this kommune
      const kunderRes = await fetchWithTimeout(`${AREALPLANER_BASE}/kunder`, { headers: apHeaders })
      if (!kunderRes.ok) throw new Error(`HTTP ${kunderRes.status}`)
      const kunder = await kunderRes.json()
      const kunde = kunder.find((k: any) => k.kommunenummer === knr && k.status === 0)

      if (kunde && gnr && bnr) {
        // Hent planer som gjelder denne eiendommen (gnr/bnr-filter)
        const planerRes = await fetchWithTimeout(
          `${AREALPLANER_BASE}/kunder/${kunde.id}/arealplaner?knr=${knr}&gnr=${gnr}&bnr=${bnr}`,
          { headers: apHeaders }
        )
        if (!planerRes.ok) throw new Error(`Planer HTTP ${planerRes.status}`)
        const apPlaner: any[] = await planerRes.json()

        // For hver plan: hent dokumenter + dispensasjoner parallelt
        const withDetails = await Promise.allSettled(
          apPlaner.map(async (plan: any) => {
            const [dokRes2, dispRes] = await Promise.allSettled([
              fetch(`${AREALPLANER_BASE}/kunder/${kunde.id}/arealplaner/${plan.id}/dokumenter`, { headers: apHeaders }).then(r => r.ok ? r.json() : []),
              fetch(`${AREALPLANER_BASE}/kunder/${kunde.id}/arealplaner/${plan.id}/dispensasjoner`, { headers: apHeaders }).then(r => r.ok ? r.json() : []),
            ])

            const docs = dokRes2.status === 'fulfilled' ? dokRes2.value : []
            const disps = dispRes.status === 'fulfilled' ? dispRes.value : []

            // Hent direkteUrl for ALLE plandokumenter
            const enrichedDocs = await Promise.all(
              docs.map(async (d: any) => {
                try {
                  const metaRes = await fetch(`${AREALPLANER_BASE}/kunder/${kunde.id}/dokumenter/${d.id}`, { headers: apHeaders })
                  if (metaRes.ok) {
                    const meta = await metaRes.json()
                    return { ...d, direkteUrl: meta.direkteUrl }
                  }
                } catch {}
                return d
              })
            )

            // Hent direkteUrl for dispensasjonsdokumenter (vedtak)
            const enrichedDisps = await Promise.all(
              disps.map(async (disp: any) => {
                if (!disp.dokumenter?.length) return disp
                const enrichedDispDocs = await Promise.all(
                  disp.dokumenter.map(async (d: any) => {
                    try {
                      const metaRes = await fetch(`${AREALPLANER_BASE}/kunder/${kunde.id}/dokumenter/${d.id}`, { headers: apHeaders })
                      if (metaRes.ok) {
                        const meta = await metaRes.json()
                        return { ...d, direkteUrl: meta.direkteUrl }
                      }
                    } catch {}
                    return d
                  })
                )
                return { ...disp, dokumenter: enrichedDispDocs }
              })
            )

            return { ...plan, dokumenter: enrichedDocs, dispensasjoner: enrichedDisps }
          })
        )

        const result = withDetails
          .filter(r => r.status === 'fulfilled')
          .map(r => (r as PromiseFulfilledResult<ArealplanerPlan & { dispensasjoner?: any[] }>).value)

        setArealplaner(result)
        const totalDocs = result.reduce((s, p) => s + (p.dokumenter?.length || 0), 0)
        const totalDisps = result.reduce((s, p) => s + ((p as any).dispensasjoner?.length || 0), 0)
        updateStep(6, { status: 'done', label: `${result.length} planer, ${totalDocs} dok, ${totalDisps} disp.` })

        // Bygg dispensasjonsanalyse fra ferske data
        const allDispsFromResult: any[] = []
        for (const ap of result) {
          if (ap.dispensasjoner?.length) allDispsFromResult.push(...ap.dispensasjoner)
        }
        if (allDispsFromResult.length > 0) {
          const godkjent = allDispsFromResult.filter(d => d.vedtak === 'Godkjent' || d.vedtak === 'Innvilget' || d.vedtak === 'Godkjent midlertidig').length
          const avslatt = allDispsFromResult.filter(d => d.vedtak === 'Avslått').length
          const totalt = allDispsFromResult.length
          const katMap2: Record<string, { godkjent: number; avslatt: number }> = {}
          for (const d of allDispsFromResult) {
            const besk = (d.beskrivelse || '').toLowerCase()
            let kat = 'Annet'
            if (besk.includes('tilbygg') || besk.includes('utbygging') || besk.includes('påbygg')) kat = 'Tilbygg/påbygg'
            else if (besk.includes('bruksendring')) kat = 'Bruksendring'
            else if (besk.includes('fasadeendring') || besk.includes('fasade')) kat = 'Fasadeendring'
            else if (besk.includes('fradeling') || besk.includes('deling')) kat = 'Fradeling'
            else if (besk.includes('høyde') || besk.includes('gesims') || besk.includes('møne')) kat = 'Høyde/etasjer'
            else if (besk.includes('bya') || besk.includes('utnyttelse') || besk.includes('bebygd')) kat = 'Utnyttelsesgrad'
            else if (besk.includes('garasje') || besk.includes('carport') || besk.includes('bod')) kat = 'Garasje/bod'
            else if (besk.includes('planformål') || besk.includes('arealformål')) kat = 'Planformål'
            if (!katMap2[kat]) katMap2[kat] = { godkjent: 0, avslatt: 0 }
            if (d.vedtak === 'Godkjent' || d.vedtak === 'Innvilget' || d.vedtak === 'Godkjent midlertidig') katMap2[kat].godkjent++
            else if (d.vedtak === 'Avslått') katMap2[kat].avslatt++
          }
          const kategorier = Object.entries(katMap2).map(([kategori, stats]) => {
            const total = stats.godkjent + stats.avslatt
            const pct = total > 0 ? Math.round((stats.godkjent / total) * 100) : 0
            return { kategori, godkjent: stats.godkjent, avslatt: stats.avslatt, sannsynlighet: pct >= 75 ? 'Høy' as const : pct >= 40 ? 'Middels' as const : 'Lav' as const }
          }).sort((a, b) => (b.godkjent + b.avslatt) - (a.godkjent + a.avslatt))
          setDispAnalyse({ totalt, godkjent, avslatt, godkjentProsent: totalt > 0 ? Math.round((godkjent / totalt) * 100) : 0, kategorier })
        }

        // KI-analyser kun reguleringsbestemmelser (kommuneplan har statisk oppsummering)
        const bestemmelseDocs: { url: string; planNavn: string; planType: string }[] = []
        for (const ap of result) {
          const pType = typeof ap.planType === 'string' ? ap.planType : ap.planType?.beskrivelse || ''
          const isKommune = pType.toLowerCase().includes('kommune')
          // Skip kommuneplaner - de har forhåndsgenerert oppsummering
          if (isKommune && getKommuneplanSammendrag(knr)) continue

          const docs = ap.dokumenter || []
          const bestemmelser = docs.filter((d: ArealplanerDok) =>
            d.dokumenttypeId === 5 || d.dokumenttype === 'Bestemmelser' || d.dokumentnavn?.toLowerCase().includes('bestemmelse')
          )
          for (const dok of bestemmelser) {
            if (dok.direkteUrl) {
              bestemmelseDocs.push({
                url: dok.direkteUrl,
                planNavn: ap.planNavn || ap.planId,
                planType: 'regulering',
              })
            }
          }
        }

        if (bestemmelseDocs.length > 0) {
          setAnalyseringBestemmelser(true)
          // Analyse each bestemmelse (max 2 for speed)
          Promise.allSettled(
            bestemmelseDocs.slice(0, 2).map(async (doc) => {
              const res = await fetch('/api/analyse-bestemmelser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pdfUrl: doc.url, planNavn: doc.planNavn, planType: doc.planType }),
              })
              if (!res.ok) return null
              const data = await res.json()
              return data.success ? data.analyse : null
            })
          ).then(results => {
            const analyser = results
              .filter(r => r.status === 'fulfilled' && r.value)
              .map(r => (r as PromiseFulfilledResult<BestemmelseAnalyse>).value)
            setBestemmelseAnalyser(analyser)

            // Update eiendomsanalyse with extracted values
            if (analyser.length > 0) {
              setEiendomsAnalyse(prev => {
                if (!prev) return prev
                let bya = prev.byaProsent
                let gesims = prev.gesimshoydeM
                let mone = prev.monehoydeM
                let etasjer = prev.maksEtasjer
                for (const a of analyser) {
                  if (!bya && a.utnyttelsesgrad?.bya_prosent) bya = a.utnyttelsesgrad.bya_prosent
                  if (!gesims && a.hoyder?.gesimshøyde_m) gesims = a.hoyder.gesimshøyde_m
                  if (!mone && a.hoyder?.mønehøyde_m) mone = a.hoyder.mønehøyde_m
                  if (!etasjer && a.etasjer?.maks_etasjer) etasjer = a.etasjer.maks_etasjer
                }
                return { ...prev, byaProsent: bya, gesimshoydeM: gesims, monehoydeM: mone, maksEtasjer: etasjer }
              })
            }
            setAnalyseringBestemmelser(false)
          })
        }
      } else {
        updateStep(6, { status: 'error', label: kunde ? 'Mangler gnr/bnr' : 'Kommune ikke i arealplaner.no' })
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      updateStep(6, { status: 'error', label: 'Arealplaner.no feilet', detail: msg })
    }

    // ─── Bygg eiendomsanalyse ─────────────────────────────────────────
    if (gnr && bnr) {
      // Beregn areal fra teigpolygon (Shoelace-formel, UTM-koordinater)
      let arealM2 = 0
      if (teigRes.status === 'fulfilled') {
        const features = teigRes.value?.features || []
        const teigCoords = features[0]?.geometry?.coordinates?.[0]
        if (teigCoords && teigCoords.length > 2) {
          let sum = 0
          for (let i = 0; i < teigCoords.length - 1; i++) {
            sum += teigCoords[i][0] * teigCoords[i + 1][1] - teigCoords[i + 1][0] * teigCoords[i][1]
          }
          arealM2 = Math.round(Math.abs(sum / 2))
        }
      }

      // Antall bruksenheter fra adresse-API
      const antallBruksenheter = adr.bruksenhetsnummer?.length || 1

      // Ekstraher reguleringsdata fra KI-tolkning (ny Planslurpen-struktur)
      let byaProsent: number | null = null
      let gesimshoydeM: number | null = null
      let monehoydeM: number | null = null
      let maksEtasjer: number | null = null

      for (const t of tolkninger) {
        // Ny struktur: output.bestemmelser[] med høyder[], utnyttingsgrad[] etc.
        const rawBest = t.output?.bestemmelser || t.output?.felter || []
        const bestemmelser = Array.isArray(rawBest) ? rawBest : []
        for (const b of bestemmelser) {
          // Høyder
          for (const h of (b.høyder || [])) {
            const type = (h.typeHøyde || h.navn || '').toLowerCase()
            const verdi = parseFloat(String(h.regulertHøyde || h.verdi))
            if (isNaN(verdi)) continue
            if (type.includes('gesims')) gesimshoydeM = verdi
            else if (type.includes('møne')) monehoydeM = verdi
            else if (!gesimshoydeM) gesimshoydeM = verdi
          }
          // Utnyttingsgrad / BYA
          for (const u of (b.utnyttingsgrad || [])) {
            const val = parseFloat(String(u.utnyttingsgrad || u.verdi))
            if (!isNaN(val) && val > 0 && val <= 100) byaProsent = val
          }
          // Etasjer
          if (b.antallBoenheter?.length) {
            for (const ae of b.antallBoenheter) {
              const val = parseInt(String(ae.antall || ae.verdi))
              if (!isNaN(val) && val > 0 && val < 20) maksEtasjer = val
            }
          }
          // Også søk i underfelter/parametre (gammel struktur)
          for (const uf of (b.underfelter || [])) {
            for (const p of (uf.parametre || [])) {
              const navn = (p.navn || '').toLowerCase()
              const val = parseFloat(String(p.verdi))
              if (isNaN(val)) continue
              if (navn.includes('bya') || navn.includes('utnyttelse')) { if (val > 0 && val <= 100) byaProsent = val }
              else if (navn.includes('gesims')) gesimshoydeM = val
              else if (navn.includes('møne')) monehoydeM = val
              else if (navn.includes('etasj') && val > 0 && val < 20) maksEtasjer = val
            }
          }
        }
      }

      // Plansammendrag
      let plansammendrag: string | null = null
      if (planList.length > 0) {
        const regPlan = planList.find(p => !p.plantype?.toLowerCase().includes('kommune'))
        const komPlan = planList.find(p => p.plantype?.toLowerCase().includes('kommune'))
        const parts: string[] = []
        if (regPlan) parts.push(`Reguleringsplan: ${regPlan.plannavn} (${regPlan.plantype})`)
        if (komPlan) parts.push(`Kommuneplan: ${komPlan.plannavn}`)
        if (parts.length > 0) plansammendrag = parts.join('. ')
      }

      setEiendomsAnalyse({
        kommune: adr.kommunenavn,
        kommunenummer: knr,
        gnr, bnr,
        koordinater: { lat, lon },
        arealM2,
        antallBruksenheter: antallBruksenheter as number,
        plansammendrag,
        byaProsent, gesimshoydeM, monehoydeM, maksEtasjer,
      })

    }

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

  const gnr = valgtAdresse?.gardsnummer
  const bnr = valgtAdresse?.bruksnummer

  return (
    <div className="min-h-screen bg-tomtly-light">
      {/* Hero */}
      <section className="bg-tomtly-dark text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
          <span className="inline-block bg-tomtly-accent/20 text-tomtly-accent text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Gratis tomteanalyse
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Hva kan du bygge på tomten?
          </h1>
          <p className="text-lg text-brand-300 mb-10 max-w-2xl mx-auto">
            Få en komplett analyse med reguleringsplan, byggemuligheter, husmodeller og verdivurdering – på sekunder.
          </p>

          {/* Lead capture gate */}
          {!leadCaptured ? (
            <form onSubmit={(e) => { e.preventDefault(); if (leadEpost && leadTelefon) setLeadCaptured(true) }} className="max-w-md mx-auto space-y-3">
              <input
                type="text"
                value={leadNavn}
                onChange={e => setLeadNavn(e.target.value)}
                placeholder="Ditt navn"
                className="w-full px-4 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-500 text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  value={leadEpost}
                  onChange={e => setLeadEpost(e.target.value)}
                  placeholder="E-post *"
                  required
                  className="w-full px-4 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-500 text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50"
                />
                <input
                  type="tel"
                  value={leadTelefon}
                  onChange={e => setLeadTelefon(e.target.value)}
                  placeholder="Telefon *"
                  required
                  className="w-full px-4 py-3.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-brand-500 text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50"
                />
              </div>
              <button
                type="submit"
                disabled={!leadEpost || !leadTelefon}
                className="w-full py-3.5 bg-tomtly-accent hover:bg-forest-700 disabled:opacity-50 text-white font-semibold rounded-lg transition-colors"
              >
                Start gratis analyse
              </button>
              <p className="text-[10px] text-brand-500">Vi kontakter deg med en fullstendig analyserapport. Ingen forpliktelser.</p>
            </form>
          ) : (
          /* Address search (shown after lead capture) */
          <div className="max-w-xl mx-auto relative">
            <p className="text-xs text-green-400 mb-3">✓ Registrert som {leadNavn || leadEpost}. Skriv inn adressen til tomten:</p>
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
          )}
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
      {valgtAdresse && !analysing && (
        <section className="py-8 md:py-12">
          <div className="max-w-5xl mx-auto px-4 space-y-8">

            {/* 4a: Eiendomsheader */}
            <div className="bg-white rounded-xl border border-brand-100 p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <h2 className="font-display text-xl font-bold text-tomtly-dark flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-tomtly-accent" />
                  {valgtAdresse.adressetekst}, {valgtAdresse.postnummer} {valgtAdresse.poststed}
                </h2>
                <button
                  onClick={copyShareLink}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                    linkCopied
                      ? 'bg-green-100 text-green-800'
                      : 'bg-brand-100 text-brand-600 hover:bg-brand-200'
                  }`}
                >
                  {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                  {linkCopied ? 'Kopiert!' : 'Del analyse'}
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <InfoBox label="Kommune" value={`${valgtAdresse.kommunenavn} (${valgtAdresse.kommunenummer})`} />
                <InfoBox label="Eiendom" value={gnr && bnr ? `gnr. ${gnr} / bnr. ${bnr}` : 'Ikke tilgjengelig'} />
                {teigResult && <InfoBox label="Teiger" value={`${teigResult.teiger} (${teigResult.noyaktighetsklasse || 'ukjent'})`} />}
                <InfoBox label="Koordinater" value={`${valgtAdresse.representasjonspunkt.lat.toFixed(5)}, ${valgtAdresse.representasjonspunkt.lon.toFixed(5)}`} />
              </div>
            </div>

            {/* Tomtekart */}
            {valgtAdresse && (
              <TomteKartSection
                lat={valgtAdresse.representasjonspunkt.lat}
                lon={valgtAdresse.representasjonspunkt.lon}
                adresse={valgtAdresse.adressetekst}
                teigCoordsLatLon={fkbKart ? JSON.parse(fkbKart) : undefined}
              />
            )}

            {/* Eiendomsanalyse */}
            {eiendomsAnalyse && (
              <div className="bg-white rounded-2xl border border-brand-100 p-6 md:p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold text-tomtly-dark mb-5 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-tomtly-accent" />
                  Eiendomsanalyse
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                    <p className="text-[10px] text-brand-500 uppercase tracking-wide">Kommune</p>
                    <p className="text-sm font-bold text-tomtly-dark mt-1">{eiendomsAnalyse.kommune}</p>
                    <p className="text-xs text-brand-400">{eiendomsAnalyse.kommunenummer}</p>
                  </div>
                  <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                    <p className="text-[10px] text-brand-500 uppercase tracking-wide">Eiendom</p>
                    <p className="text-sm font-bold text-tomtly-dark mt-1">gnr. {eiendomsAnalyse.gnr} / bnr. {eiendomsAnalyse.bnr}</p>
                  </div>
                  <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                    <p className="text-[10px] text-brand-500 uppercase tracking-wide">Tomtestørrelse</p>
                    <p className="text-sm font-bold text-tomtly-dark mt-1">{eiendomsAnalyse.arealM2.toLocaleString('nb-NO')} m²</p>
                  </div>
                  <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                    <p className="text-[10px] text-brand-500 uppercase tracking-wide">Bruksenheter</p>
                    <p className="text-sm font-bold text-tomtly-dark mt-1">{eiendomsAnalyse.antallBruksenheter}</p>
                  </div>
                  <div className="bg-brand-50 rounded-xl p-4 border border-brand-100">
                    <p className="text-[10px] text-brand-500 uppercase tracking-wide">Koordinater</p>
                    <p className="text-xs font-mono text-tomtly-dark mt-1">{eiendomsAnalyse.koordinater.lat.toFixed(5)}, {eiendomsAnalyse.koordinater.lon.toFixed(5)}</p>
                  </div>
                  {eiendomsAnalyse.byaProsent && (
                    <div className="bg-forest-50 rounded-xl p-4 border border-forest-200">
                      <p className="text-[10px] text-forest-600 uppercase tracking-wide">%-BYA</p>
                      <p className="text-sm font-bold text-tomtly-accent mt-1">{eiendomsAnalyse.byaProsent}%</p>
                      <p className="text-xs text-forest-600">= {Math.round(eiendomsAnalyse.arealM2 * eiendomsAnalyse.byaProsent / 100)} m²</p>
                    </div>
                  )}
                  {eiendomsAnalyse.gesimshoydeM && (
                    <div className="bg-forest-50 rounded-xl p-4 border border-forest-200">
                      <p className="text-[10px] text-forest-600 uppercase tracking-wide">Gesimshøyde</p>
                      <p className="text-sm font-bold text-tomtly-accent mt-1">{eiendomsAnalyse.gesimshoydeM} m</p>
                    </div>
                  )}
                  {eiendomsAnalyse.monehoydeM && (
                    <div className="bg-forest-50 rounded-xl p-4 border border-forest-200">
                      <p className="text-[10px] text-forest-600 uppercase tracking-wide">Mønehøyde</p>
                      <p className="text-sm font-bold text-tomtly-accent mt-1">{eiendomsAnalyse.monehoydeM} m</p>
                    </div>
                  )}
                  {eiendomsAnalyse.maksEtasjer && (
                    <div className="bg-forest-50 rounded-xl p-4 border border-forest-200">
                      <p className="text-[10px] text-forest-600 uppercase tracking-wide">Maks etasjer</p>
                      <p className="text-sm font-bold text-tomtly-accent mt-1">{eiendomsAnalyse.maksEtasjer}</p>
                    </div>
                  )}
                </div>
                {eiendomsAnalyse.plansammendrag && (
                  <div className="mt-4 bg-forest-50 border border-forest-200 rounded-xl p-4">
                    <p className="text-[10px] text-forest-600 uppercase tracking-wide mb-1">Gjeldende planer</p>
                    <p className="text-sm text-brand-700">{eiendomsAnalyse.plansammendrag}</p>
                  </div>
                )}
              </div>
            )}

            {/* Kommuneplanbestemmelser (forhåndsgenerert) */}
            {valgtAdresse && (() => {
              const kp = getKommuneplanSammendrag(valgtAdresse.kommunenummer)
              if (!kp) return null
              return (
                <div className="bg-white rounded-2xl border border-brand-100 p-6 md:p-8 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-5 h-5 text-tomtly-accent" />
                    <h2 className="font-display text-lg font-bold text-tomtly-dark">Kommuneplanens arealdel</h2>
                  </div>
                  <p className="text-xs text-brand-400 mb-4">{kp.planNavn} · I kraft: {new Date(kp.iKraft).toLocaleDateString('nb-NO')}</p>

                  <div className="bg-forest-50 border border-forest-200 rounded-xl p-4 mb-5">
                    <p className="text-sm text-brand-700 leading-relaxed">{kp.sammendrag}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                    {kp.nokkeltall.map(n => (
                      <div key={n.label} className="bg-brand-50 rounded-lg p-3 border border-brand-100">
                        <p className="text-[10px] text-brand-500 uppercase">{n.label}</p>
                        <p className="text-sm font-bold text-tomtly-dark mt-0.5">{n.verdi}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">Viktige bestemmelser</h3>
                  <ul className="space-y-1.5">
                    {kp.viktigeBestemmelser.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-brand-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })()}

            {/* Bestemmelse-analyse (KI-tolket) */}
            {(bestemmelseAnalyser.length > 0 || analyseringBestemmelser) && (
              <div className="bg-white rounded-2xl border border-brand-100 p-6 md:p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold text-tomtly-dark mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-tomtly-accent" />
                  Reguleringsbestemmelser (KI-tolket)
                </h2>
                {analyseringBestemmelser && bestemmelseAnalyser.length === 0 && (
                  <div className="flex items-center gap-3 py-8 justify-center">
                    <Loader2 className="w-5 h-5 animate-spin text-tomtly-accent" />
                    <span className="text-sm text-brand-500">Analyserer bestemmelser-PDF med KI...</span>
                  </div>
                )}
                {bestemmelseAnalyser.map((analyse, ai) => (
                  <div key={ai} className="mb-6 last:mb-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-semibold text-tomtly-dark">{analyse.planNavn || 'Plan'}</span>
                      <span className="text-[10px] bg-tomtly-accent/10 text-tomtly-accent px-2 py-0.5 rounded-full">KI-tolket</span>
                    </div>

                    {/* Sammendrag */}
                    {analyse.sammendrag && (
                      <div className="bg-forest-50 border border-forest-200 rounded-xl p-4 mb-4">
                        <p className="text-sm text-brand-700 leading-relaxed">{analyse.sammendrag}</p>
                      </div>
                    )}

                    {/* Nøkkeltall grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      {analyse.utnyttelsesgrad?.bya_prosent && eiendomsAnalyse && (
                        <div className="bg-forest-50 rounded-xl p-3 border border-forest-200">
                          <p className="text-[10px] text-forest-600 uppercase">%-BYA</p>
                          <p className="text-lg font-bold text-tomtly-accent">{analyse.utnyttelsesgrad.bya_prosent}%</p>
                          <p className="text-[10px] text-forest-600">= {Math.round(eiendomsAnalyse.arealM2 * analyse.utnyttelsesgrad.bya_prosent / 100)} m²</p>
                        </div>
                      )}
                      {analyse.hoyder?.gesimshøyde_m && (
                        <div className="bg-forest-50 rounded-xl p-3 border border-forest-200">
                          <p className="text-[10px] text-forest-600 uppercase">Gesimshøyde</p>
                          <p className="text-lg font-bold text-tomtly-accent">{analyse.hoyder.gesimshøyde_m} m</p>
                        </div>
                      )}
                      {analyse.hoyder?.mønehøyde_m && (
                        <div className="bg-forest-50 rounded-xl p-3 border border-forest-200">
                          <p className="text-[10px] text-forest-600 uppercase">Mønehøyde</p>
                          <p className="text-lg font-bold text-tomtly-accent">{analyse.hoyder.mønehøyde_m} m</p>
                        </div>
                      )}
                      {analyse.etasjer?.maks_etasjer && (
                        <div className="bg-forest-50 rounded-xl p-3 border border-forest-200">
                          <p className="text-[10px] text-forest-600 uppercase">Maks etasjer</p>
                          <p className="text-lg font-bold text-tomtly-accent">{analyse.etasjer.maks_etasjer}</p>
                        </div>
                      )}
                      {analyse.byggegrenser?.mot_vei_m && (
                        <div className="bg-brand-50 rounded-xl p-3 border border-brand-200">
                          <p className="text-[10px] text-brand-500 uppercase">Byggegrense vei</p>
                          <p className="text-lg font-bold text-tomtly-dark">{analyse.byggegrenser.mot_vei_m} m</p>
                        </div>
                      )}
                      {analyse.byggegrenser?.mot_nabo_m && (
                        <div className="bg-brand-50 rounded-xl p-3 border border-brand-200">
                          <p className="text-[10px] text-brand-500 uppercase">Byggegrense nabo</p>
                          <p className="text-lg font-bold text-tomtly-dark">{analyse.byggegrenser.mot_nabo_m} m</p>
                        </div>
                      )}
                      {analyse.parkering?.antall_per_boenhet && (
                        <div className="bg-brand-50 rounded-xl p-3 border border-brand-200">
                          <p className="text-[10px] text-brand-500 uppercase">Parkering</p>
                          <p className="text-lg font-bold text-tomtly-dark">{analyse.parkering.antall_per_boenhet} /boenhet</p>
                        </div>
                      )}
                      {analyse.mua?.min_m2_per_boenhet && (
                        <div className="bg-brand-50 rounded-xl p-3 border border-brand-200">
                          <p className="text-[10px] text-brand-500 uppercase">MUA</p>
                          <p className="text-lg font-bold text-tomtly-dark">{analyse.mua.min_m2_per_boenhet} m²</p>
                          <p className="text-[10px] text-brand-400">per boenhet</p>
                        </div>
                      )}
                      {!analyse.mua?.min_m2_per_boenhet && analyse.uteoppholdsareal?.krav_prosent && (
                        <div className="bg-brand-50 rounded-xl p-3 border border-brand-200">
                          <p className="text-[10px] text-brand-500 uppercase">Uteopphold</p>
                          <p className="text-lg font-bold text-tomtly-dark">{analyse.uteoppholdsareal.krav_prosent}%</p>
                        </div>
                      )}
                    </div>

                    {/* Viktige bestemmelser */}
                    {analyse.viktige_bestemmelser && analyse.viktige_bestemmelser.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">Viktige bestemmelser</h4>
                        <ul className="space-y-1">
                          {analyse.viktige_bestemmelser.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-2 text-xs text-brand-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent mt-0.5 shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Restriksjoner */}
                    {analyse.restriksjoner && analyse.restriksjoner.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Restriksjoner</h4>
                        <ul className="space-y-1">
                          {analyse.restriksjoner.map((r, ri) => (
                            <li key={ri} className="flex items-start gap-2 text-xs text-red-700">
                              <AlertTriangle className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Dispensasjonsanalyse */}
            {dispAnalyse && (
              <div className="bg-white rounded-2xl border border-brand-100 p-6 md:p-8 shadow-sm">
                <h2 className="font-display text-lg font-bold text-tomtly-dark mb-2 flex items-center gap-2">
                  <Gauge className="w-5 h-5 text-tomtly-accent" />
                  Dispensasjonsanalyse
                </h2>
                <p className="text-xs text-brand-500 mb-5">
                  Basert på {dispAnalyse.totalt} historiske dispensasjoner fra gjeldende planer
                </p>

                {/* Summary stats */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-green-50 rounded-xl p-4 border border-green-200 text-center">
                    <p className="text-2xl font-bold text-green-700">{dispAnalyse.godkjent}</p>
                    <p className="text-xs text-green-600">Godkjent</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 border border-red-200 text-center">
                    <p className="text-2xl font-bold text-red-700">{dispAnalyse.avslatt}</p>
                    <p className="text-xs text-red-600">Avslått</p>
                  </div>
                  <div className="bg-brand-50 rounded-xl p-4 border border-brand-200 text-center">
                    <p className="text-2xl font-bold text-tomtly-dark">{dispAnalyse.godkjentProsent}%</p>
                    <p className="text-xs text-brand-500">Godkjenningsrate</p>
                  </div>
                </div>

                {/* Category breakdown */}
                {dispAnalyse.kategorier.length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-3">Sannsynlighet per type</h3>
                    <div className="space-y-2">
                      {dispAnalyse.kategorier.map(kat => {
                        const total = kat.godkjent + kat.avslatt
                        const pct = total > 0 ? Math.round((kat.godkjent / total) * 100) : 0
                        const barColor = kat.sannsynlighet === 'Høy' ? 'bg-green-500' : kat.sannsynlighet === 'Middels' ? 'bg-amber-500' : 'bg-red-500'
                        const badgeColor = kat.sannsynlighet === 'Høy' ? 'bg-green-100 text-green-800' : kat.sannsynlighet === 'Middels' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'

                        return (
                          <div key={kat.kategori} className="bg-brand-50 rounded-lg p-3 border border-brand-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-tomtly-dark">{kat.kategori}</span>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-brand-500">{kat.godkjent}G / {kat.avslatt}A</span>
                                <span className={`px-2 py-0.5 text-[10px] font-semibold rounded ${badgeColor}`}>
                                  {kat.sannsynlighet}
                                </span>
                              </div>
                            </div>
                            <div className="w-full bg-brand-200 rounded-full h-1.5">
                              <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                    <p className="text-[10px] text-brand-400 mt-3">
                      Sannsynlighet er basert på historiske vedtak i samme plan. Høy = 75%+ godkjent, Middels = 40-74%, Lav = under 40%.
                      Dette er en indikasjon, ikke en garanti.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* 4b: Plananalyse */}
            {(plans.length > 0 || planTolkninger.length > 0) && (
              <div className="space-y-4">
                <h2 className="font-display text-lg font-bold text-tomtly-dark flex items-center gap-2">
                  <FileText className="w-5 h-5 text-tomtly-accent" />
                  Plananalyse ({plans.length} {plans.length === 1 ? 'plan' : 'planer'})
                </h2>

                {planTolkninger.filter(t => {
                  // Skip kommuneplaner som allerede har statisk oppsummering
                  const isKommune = t.plantype?.toLowerCase().includes('kommune')
                  const hasStaticSummary = valgtAdresse && getKommuneplanSammendrag(valgtAdresse.kommunenummer)
                  return !(isKommune && hasStaticSummary)
                }).map((tolkning) => {
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
                                  ? `KI-tolkning status: ${tolkning.meta.status.navn}`
                                  : 'KI-tolkning ikke tilgjengelig for denne planen. Se dokumenter nedenfor.'}
                              </p>
                            </div>
                          )}

                          {/* Dokumenter fra arealplaner.no for denne planen */}
                          {(() => {
                            const matchingAP = arealplaner.find((ap: any) => ap.planId === tolkning.planId)
                            if (!matchingAP || !matchingAP.dokumenter?.length) return null
                            return (
                              <div className="bg-white border border-brand-200 rounded-lg overflow-hidden">
                                <div className="px-4 py-2 bg-brand-50 border-b border-brand-200">
                                  <h5 className="text-xs font-semibold text-brand-600">Plandokumenter (arealplaner.no)</h5>
                                </div>
                                <div className="divide-y divide-brand-100">
                                  {matchingAP.dokumenter.filter((d: any) => d.tilgang === 'Alle' || !d.tilgang).map((dok: any) => {
                                    const isBest = dok.dokumenttypeId === 5 || dok.dokumenttype === 'Bestemmelser'
                                    const isKart = dok.dokumenttype === 'Arealplankart' || dok.dokumenttype === 'Plankart'
                                    const isBesk = dok.dokumenttype === 'Planbeskrivelse'
                                    const color = isBest ? 'text-red-600 bg-red-50' : isKart ? 'text-blue-600 bg-blue-50' : isBesk ? 'text-purple-600 bg-purple-50' : 'text-brand-600 bg-brand-50'
                                    return (
                                      <div key={dok.id} className="flex items-center justify-between px-4 py-2 hover:bg-brand-50/50">
                                        <div className="flex items-center gap-2 min-w-0">
                                          <span className={`px-2 py-0.5 text-[10px] font-semibold rounded shrink-0 ${color}`}>{dok.dokumenttype || 'Dokument'}</span>
                                          <span className="text-xs text-brand-700 truncate">{dok.dokumentnavn}</span>
                                        </div>
                                        {(dok.direkteUrl || dok.url) && (
                                          <a href={dok.direkteUrl || dok.url} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-tomtly-accent hover:bg-forest-50 rounded transition-colors shrink-0 ml-2">
                                            <ExternalLink className="w-3 h-3" />
                                            {isBest ? 'Last ned PDF' : 'Åpne'}
                                          </a>
                                        )}
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            )
                          })()}

                          {/* Dispensasjoner fra arealplaner.no for denne planen */}
                          <DispensasjonerCollapsible planId={tolkning.planId} arealplaner={arealplaner} />
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

                <div className="space-y-6">
                  {arealplaner.map((plan: any) => {
                    const planType = typeof plan.planType === 'string' ? plan.planType : plan.planType?.beskrivelse || ''
                    const planStatus = typeof plan.planStatus === 'string' ? plan.planStatus : plan.planStatus?.beskrivelse || ''
                    const dispensasjoner = plan.dispensasjoner || []

                    return (
                      <div key={plan.id} className="border border-brand-200 rounded-xl overflow-hidden">
                        <div className="bg-brand-50 px-4 py-3">
                          <h3 className="font-semibold text-tomtly-dark">{plan.planNavn || plan.planId}</h3>
                          <div className="flex flex-wrap gap-3 mt-1 text-xs text-brand-500">
                            {planType && <span className="bg-white px-2 py-0.5 rounded border border-brand-200">{planType}</span>}
                            {planStatus && <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded">{planStatus}</span>}
                            {plan.iKraft && <span>I kraft: {new Date(plan.iKraft).toLocaleDateString('nb-NO')}</span>}
                            <span className="text-brand-400">PlanID: {plan.planId}</span>
                          </div>
                        </div>

                        {/* Dokumenter */}
                        <div className="divide-y divide-brand-100">
                          {plan.dokumenter?.filter((d: ArealplanerDok) => d.tilgang === 'Alle' || !d.tilgang).map((dok: ArealplanerDok) => {
                            const isBestemmelse = dok.dokumenttypeId === 5 || dok.dokumenttype === 'Bestemmelser' || dok.dokumentnavn?.toLowerCase().includes('bestemmelse')
                            const isPlankart = dok.dokumenttype === 'Arealplankart' || dok.dokumenttype === 'Plankart'
                            const isBeskrivelse = dok.dokumenttype === 'Planbeskrivelse'
                            const isROS = dok.dokumentnavn?.toLowerCase().includes('ros')
                            const color = isBestemmelse ? 'text-red-600 bg-red-50' : isPlankart ? 'text-blue-600 bg-blue-50' : isBeskrivelse ? 'text-purple-600 bg-purple-50' : isROS ? 'text-amber-600 bg-amber-50' : 'text-brand-600 bg-brand-50'

                            return (
                              <div key={dok.id} className="flex items-center justify-between px-4 py-2.5 hover:bg-brand-50/50">
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className={`px-2 py-0.5 text-[10px] font-semibold rounded shrink-0 ${color}`}>
                                    {dok.dokumenttype || 'Dokument'}
                                  </span>
                                  <span className="text-sm text-brand-700 truncate">{dok.dokumentnavn}</span>
                                </div>
                                <div className="flex items-center gap-2 shrink-0 ml-2">
                                  {(dok.direkteUrl || dok.url) && (
                                    <a
                                      href={dok.direkteUrl || dok.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-tomtly-accent hover:bg-forest-50 rounded transition-colors border border-tomtly-accent/20"
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

                        {/* Dispensasjoner (collapsible) */}
                        {dispensasjoner.length > 0 && (
                          <div className="border-t border-brand-200">
                            <DispensasjonerCollapsible planId={plan.planId} arealplaner={[{ ...plan, planId: plan.planId, id: plan.id, planNavn: plan.planNavn, dokumenter: plan.dokumenter, dispensasjoner } as ArealplanerPlan]} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* 4c: DOK-analyse */}
            {dokDatasets.length > 0 && (() => {
              // Key risk factors
              const keyRisks = [
                { label: 'Flom', keywords: ['flom', 'flomsone'], icon: '🌊' },
                { label: 'Overvann', keywords: ['overvann', 'oversvøm'], icon: '💧' },
                { label: 'Skred', keywords: ['skred', 'snøskred', 'jordskred', 'steinsprang'], icon: '⛰️' },
                { label: 'Kvikkleire', keywords: ['kvikkleire', 'marin leire'], icon: '🟤' },
                { label: 'Radon', keywords: ['radon', 'aktsomhet'], icon: '☢️' },
                { label: 'Forurensning', keywords: ['forurens', 'grunn'], icon: '⚠️' },
                { label: 'Kulturminner', keywords: ['kulturmin', 'fredet'], icon: '🏛️' },
                { label: 'Verneområde', keywords: ['verne', 'naturreservat', 'naturvern'], icon: '🌿' },
              ]

              const riskResults = keyRisks.map(risk => {
                const matches = dokDatasets.filter(ds => {
                  const name = (ds.tittel || '').toLowerCase()
                  return risk.keywords.some(kw => name.includes(kw))
                })
                const hasFunn = matches.some(m => {
                  const s = (m.status || '').toLowerCase()
                  return s.includes('med funn')
                })
                const isKartlagt = matches.some(m => {
                  const s = (m.status || '').toLowerCase()
                  return s.includes('kartlagt') && !s.includes('ikke kartlagt')
                })
                return { ...risk, matches, hasFunn, isKartlagt, count: matches.length }
              })

              const funnCount = riskResults.filter(r => r.hasFunn).length
              const okCount = riskResults.filter(r => r.isKartlagt && !r.hasFunn).length

              return (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-bold text-tomtly-dark flex items-center gap-2">
                    <Shield className="w-5 h-5 text-tomtly-accent" />
                    DOK-analyse ({dokDatasets.length} datasett)
                  </h2>
                  {valgtAdresse && (
                    <button
                      onClick={async () => {
                        const res = await fetch('/api/dok-rapport', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            lat: valgtAdresse.representasjonspunkt.lat,
                            lon: valgtAdresse.representasjonspunkt.lon,
                            adresse: valgtAdresse.adressetekst,
                            kommune: valgtAdresse.kommunenavn,
                            gnr: valgtAdresse.gardsnummer,
                            bnr: valgtAdresse.bruksnummer,
                          }),
                        })
                        if (res.ok) {
                          const blob = await res.blob()
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = `DOK-analyse-${valgtAdresse.gardsnummer}-${valgtAdresse.bruksnummer}.pdf`
                          a.click()
                          URL.revokeObjectURL(url)
                        }
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-tomtly-accent bg-forest-50 border border-tomtly-accent/20 rounded-lg hover:bg-forest-100 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Last ned PDF
                    </button>
                  )}
                </div>

                {/* Key risks visual summary */}
                <div className="bg-white rounded-2xl border border-brand-100 p-6 shadow-sm">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-brand-600">{funnCount} funn å vurdere</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-brand-600">{okCount} kartlagt uten fare</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {riskResults.map(risk => {
                      // Build description of findings
                      const funnDatasets = risk.matches.filter(m => (m.status || '').toLowerCase().includes('med funn'))
                      const funnDesc = funnDatasets.map(m => {
                        const name = (m.tittel || '').replace(/^Dekning\s*/i, '')
                        const status = m.status || ''
                        return `${name}: ${status}`
                      })
                      return (
                        <div key={risk.label} className={`rounded-xl p-4 border ${
                          risk.hasFunn
                            ? 'bg-red-50 border-red-200'
                            : risk.isKartlagt
                            ? 'bg-green-50 border-green-200'
                            : 'bg-brand-50 border-brand-200'
                        }`}>
                          <div className="text-2xl mb-1">{risk.icon}</div>
                          <p className="text-sm font-semibold text-tomtly-dark">{risk.label}</p>
                          {risk.hasFunn ? (
                            <div className="mt-1">
                              {funnDesc.slice(0, 2).map((desc, i) => (
                                <p key={i} className="text-[10px] text-red-700 leading-tight">{desc}</p>
                              ))}
                              {funnDesc.length > 2 && <p className="text-[10px] text-red-500">+{funnDesc.length - 2} flere</p>}
                            </div>
                          ) : (
                            <p className={`text-xs font-medium mt-1 ${risk.isKartlagt ? 'text-green-700' : 'text-brand-500'}`}>
                              {risk.isKartlagt ? 'Ingen fare' : 'Ikke kartlagt'}
                            </p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Status summary */}
                <div className="bg-white rounded-xl border border-brand-100 p-4 shadow-sm">
                  <div className="flex flex-wrap gap-2">
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
              )
            })()}

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

            {/* Mangler info? */}
            <ManglerInfoBoks adresse={valgtAdresse?.adressetekst || ''} epost={leadEpost} />

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
            Tomteanalyse – Tomtly.no | Data fra Kartverket, Planslurpen og arealplaner.no | NOPS AS
          </p>
        </div>
      </footer>
    </div>
  )
}

// ─── Info box component ─────────────────────────────────────────────────────

// ─── Tomtekart with polygon overlay ─────────────────────────────────────────

function TomteKartSection({ lat, lon, adresse, teigCoordsLatLon }: {
  lat: number
  lon: number
  adresse: string
  teigCoordsLatLon?: [number, number][]
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    if (!canvasRef.current || drawn) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!

    const zoom = 18 // High zoom for detail
    const tileSize = 256
    const gridSize = 3
    canvas.width = tileSize * gridSize
    canvas.height = tileSize * gridSize

    const n = Math.pow(2, zoom)
    const centerTileX = Math.floor((lon + 180) / 360 * n)
    const latRad = lat * Math.PI / 180
    const centerTileY = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)

    let loaded = 0
    const total = gridSize * gridSize

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const tx = centerTileX + dx
        const ty = centerTileY + dy
        const img = new Image()
        img.crossOrigin = 'anonymous'
        const gx = dx + 1, gy = dy + 1
        img.onload = () => { ctx.drawImage(img, gx * tileSize, gy * tileSize, tileSize, tileSize); loaded++; if (loaded === total) drawOverlay() }
        img.onerror = () => { loaded++; if (loaded === total) drawOverlay() }
        img.src = `https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/${zoom}/${ty}/${tx}.png`
      }
    }

    function ll2px(ptLat: number, ptLon: number): [number, number] {
      const x = (ptLon + 180) / 360 * n
      const r = ptLat * Math.PI / 180
      const y = (1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2 * n
      return [(x - (centerTileX - 1)) * tileSize, (y - (centerTileY - 1)) * tileSize]
    }

    function drawOverlay() {
      // Teig polygon
      if (teigCoordsLatLon && teigCoordsLatLon.length > 2) {
        ctx.beginPath()
        teigCoordsLatLon.forEach((c, i) => {
          const [px, py] = ll2px(c[1], c[0])
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py)
        })
        ctx.closePath()
        ctx.fillStyle = 'rgba(255, 40, 20, 0.12)'
        ctx.fill()
        ctx.strokeStyle = '#E11D48'
        ctx.lineWidth = 3
        ctx.stroke()
      }

      // Center marker
      const [cx, cy] = ll2px(lat, lon)
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, Math.PI * 2)
      ctx.fillStyle = '#E11D48'; ctx.fill()
      ctx.strokeStyle = '#FFF'; ctx.lineWidth = 2.5; ctx.stroke()

      // Address label
      ctx.font = 'bold 13px Inter, system-ui, sans-serif'
      const text = adresse
      const tw = ctx.measureText(text).width
      const lx = cx - tw / 2, ly = cy - 16
      ctx.fillStyle = 'rgba(255,255,255,0.92)'
      ctx.beginPath(); ctx.roundRect(lx - 6, ly - 13, tw + 12, 18, 4); ctx.fill()
      ctx.fillStyle = '#1a1a1a'
      ctx.textAlign = 'center'
      ctx.fillText(text, cx, ly)

      setDrawn(true)
    }
  }, [lat, lon, adresse, teigCoordsLatLon, drawn])

  return (
    <div className="bg-white rounded-2xl border border-brand-100 p-5 shadow-sm">
      <h2 className="font-display text-base font-bold text-tomtly-dark mb-3 flex items-center gap-2">
        <Layers className="w-4 h-4 text-tomtly-accent" />
        Tomtekart
      </h2>
      <div className="relative max-w-lg">
        <canvas ref={canvasRef} className="w-full rounded-lg border border-brand-200" />
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-brand-400">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-600" /> Adresse</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm border border-rose-600 bg-rose-600/10" /> Eiendomsgrense</span>
        <span className="ml-auto">Kartverket topografisk kart</span>
      </div>
    </div>
  )
}

function ManglerInfoBoks({ adresse, epost }: { adresse: string; epost: string }) {
  const [sendt, setSendt] = useState(false)
  if (sendt) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
        <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
        <p className="text-sm text-green-800 font-medium">Takk! Vi ser på dette og tar kontakt.</p>
      </div>
    )
  }
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-amber-800 text-sm mb-1">Fikk du ikke informasjonen du trengte?</h3>
          <p className="text-xs text-amber-700 mb-3">Noen eiendommer mangler data i offentlige registre. Trykk under, så ordner vi en manuell gjennomgang.</p>
          <button
            onClick={async () => {
              await fetch('/api/henvendelse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'mangler-info',
                  epost: epost || '',
                  ekstra: { adresse, melding: 'Bruker rapporterte manglende info i tomteanalysen' },
                }),
              }).catch(() => {})
              setSendt(true)
            }}
            className="px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
          >
            Be om manuell gjennomgang
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-brand-500 uppercase tracking-wide mb-0.5">{label}</p>
      <p className="text-sm font-medium text-tomtly-dark break-words">{value}</p>
    </div>
  )
}

// ─── Collapsible dispensasjoner ─────────────────────────────────────────────

function DispensasjonerCollapsible({ planId, arealplaner }: { planId: string; arealplaner: ArealplanerPlan[] }) {
  const [showAll, setShowAll] = useState(false)
  const matchingAP = arealplaner.find((ap) => ap.planId === planId)
  const allDisps = matchingAP?.dispensasjoner || []
  if (allDisps.length === 0) return null

  // Sort by date descending (newest first)
  const sorted = [...allDisps].sort((a: any, b: any) =>
    new Date(b.vedtaksdato || 0).getTime() - new Date(a.vedtaksdato || 0).getTime()
  )
  const visible = showAll ? sorted : sorted.slice(0, 5)
  const hidden = sorted.length - 5

  return (
    <div className="bg-amber-50/50 border border-amber-200 rounded-lg overflow-hidden">
      <div className="px-4 py-2 bg-amber-50 border-b border-amber-200 flex items-center justify-between">
        <h5 className="text-xs font-semibold text-amber-800">
          {allDisps.length} dispensasjon{allDisps.length !== 1 ? 'er' : ''}
        </h5>
        {allDisps.length > 5 && (
          <span className="text-[10px] text-amber-600">
            {showAll ? 'Viser alle' : `Viser 5 nyeste av ${allDisps.length}`}
          </span>
        )}
      </div>
      <div className="divide-y divide-amber-100">
        {visible.map((disp: any) => {
          const vedtakColor = disp.vedtak === 'Avslått' ? 'bg-red-100 text-red-800'
            : disp.vedtak === 'Innvilget' || disp.vedtak === 'Godkjent' ? 'bg-green-100 text-green-800'
            : 'bg-brand-100 text-brand-700'
          return (
            <div key={disp.id} className="px-4 py-2.5">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs text-brand-700 leading-relaxed flex-1">{disp.beskrivelse}</p>
                {disp.vedtak && <span className={`px-2 py-0.5 text-[10px] font-semibold rounded shrink-0 ${vedtakColor}`}>{disp.vedtak}</span>}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-[10px] text-brand-400">
                {disp.vedtaksdato && <span>{new Date(disp.vedtaksdato).toLocaleDateString('nb-NO')}</span>}
                {disp.sak && <span>Sak {disp.sak.sakAar}/{disp.sak.sakSeknr}</span>}
                {disp.dokumenter?.filter((d: any) => d.tilgang === 'Alle').map((dok: any) => (
                  <a key={dok.id} href={dok.direkteUrl || dok.url} target="_blank" rel="noopener noreferrer"
                    className="text-amber-700 underline flex items-center gap-1">
                    <ExternalLink className="w-2.5 h-2.5" />Vedtak
                  </a>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {hidden > 0 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full px-4 py-2 text-xs font-medium text-amber-700 bg-amber-50 border-t border-amber-200 hover:bg-amber-100 transition-colors"
        >
          {showAll ? 'Vis færre' : `Se ${hidden} eldre dispensasjoner`}
        </button>
      )}
    </div>
  )
}

// ─── Page wrapper with Suspense ─────────────────────────────────────────────

export default function PrototypePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-tomtly-light flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-300" /></div>}>
      <PrototypeContent />
    </Suspense>
  )
}
