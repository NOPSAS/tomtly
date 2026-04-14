// ─── Norkart API-integrasjon ────────────────────────────────────────
// Swagger: WAAPI-Bygning + WAAPI-ROS
// Auth: X-WAAPI-TOKEN header

const BYGNING_KEY = process.env.NORKART_BYGNING_API_KEY || ''
const ROS_KEY = process.env.NORKART_ROS_API_KEY || ''

// ─── Base-URLer (fra swagger specs) ─────────────────────────────────

const BASE = {
  bygning: 'https://www.webatlas.no/WAAPI-Bygning',
  ros: 'https://ros.api.norkart.no',
} as const

export function hasNorkartKey(): boolean {
  return (!!BYGNING_KEY && BYGNING_KEY.length > 5) || (!!ROS_KEY && ROS_KEY.length > 5)
}

// ─── Generisk henter med auth-header ────────────────────────────────

async function nkFetch<T>(url: string, apiKey: string, timeoutMs = 20000): Promise<T | null> {
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), timeoutMs)
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'X-WAAPI-TOKEN': apiKey,
      },
    })
    clearTimeout(timer)
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`[Norkart] ${res.status} ${res.statusText} — ${url.split('?')[0]}`, body.slice(0, 200))
      return null
    }
    return await res.json()
  } catch (err: any) {
    if (err?.name === 'AbortError') {
      console.error(`[Norkart] Timeout — ${url.split('?')[0]}`)
    } else {
      console.error(`[Norkart] Feil:`, err?.message || err)
    }
    return null
  }
}

// ─── Matrikkel-ID helpers ───────────────────────────────────────────

/** Bygg 20-sifret matrikkelidentifikasjon: KKKKGGGGGBBBBFFFFSSS */
export function byggMatrikkelId(knr: string, gnr: number | string, bnr: number | string, fnr = 0, snr = 0): string {
  return `${String(knr).padStart(4, '0')}${String(gnr).padStart(5, '0')}${String(bnr).padStart(4, '0')}${String(fnr).padStart(4, '0')}${String(snr).padStart(3, '0')}`
}

// ═══════════════════════════════════════════════════════════════════
// 1. WAAPI-BYGNING — Bygningsdata
// ═══════════════════════════════════════════════════════════════════

// Swagger: /bygninger/bymatrikkelenhet/{MatrikkelenhetId}
export interface BygningMatrikkelData {
  Id?: number
  Bygningsnummer?: number
  Bygningstatus?: string
  BygningstatusKode?: string
  Naringsgruppe?: string
  Bygningstype?: string
  BygningstypeKode?: string
  Vannforsyning?: string
  Harheis?: boolean | null
  Antallboenheter?: number | null
  Bruksarealtilbolig?: number | null
  Bruksarealtilannet?: number | null
  Bruksarealtotalt?: number | null
  Kommunenummer?: string
  Antalletasjer?: number | null
  Antallroklop?: number | null
  Etasjer?: Array<{
    Etasjenummer?: number
    Etasjeplankode?: string
    BruksarealTilBolig?: number
    BruksarealTilAnnet?: number
    BrukserealTotalt?: number
    BruttoarealTotalt?: number
  }>
  Bruksenheter?: Array<{
    Bruksenhetsid?: number
    BruksarealTotalt?: number
    Antallrom?: number
    Antallbad?: number
    AntallWC?: number
    Bruksenhettype?: string
    Etasje?: string
  }>
  HarSefrakminne?: boolean
  HarKulturminne?: boolean
  Antallbad?: number
  AntattByggeaar?: number
  Posisjon?: { X?: number; Y?: number; SRS?: number }
}

export interface BygningFkbData {
  Medium?: string
  BygningsOmriss?: string // GeoJSON eller WKT
  Srs?: number
}

export interface BygningArealData {
  Bygningsnummer?: number
  GulvAreal?: number
  VeggAreal?: number
  TakAreal?: number
  BygningsVolum?: number
  AntallGulvflater?: number
  AntallVeggflater?: number
  AntallTakflater?: number
  MaksHoyde?: number
  MinHoyde?: number
  FotAvtrykk?: number
  ByggKvalitet?: string
}

export interface NorkartBygning {
  Id?: number
  Bygningsnummer?: number
  MatrikkelData?: BygningMatrikkelData
  FkbData?: BygningFkbData
  ByggAreal?: BygningArealData
  RosData?: any
}

export interface NorkartBygningerResponse {
  GeometryFormat?: string
  SRS?: number
  Bygninger?: NorkartBygning[]
  RosData?: any
}

export async function hentBygningerForMatrikkel(
  knr: string, gnr: number | string, bnr: number | string
): Promise<NorkartBygningerResponse | null> {
  if (!BYGNING_KEY) return null
  const matrikkelId = byggMatrikkelId(knr, gnr, bnr)
  const url = `${BASE.bygning}/bygninger/bymatrikkelenhet/${matrikkelId}?includeByggAreal=true&includeEtasjer=true&includeBygningStatuser=true&includeMatrikkelData=true&includeFkbData=true&geometryTextFormat=GeoJson&sRS=4326&geometryAsText=true&limit=20`
  return nkFetch<NorkartBygningerResponse>(url, BYGNING_KEY)
}

// ═══════════════════════════════════════════════════════════════════
// 2. WAAPI-ROS — Risiko og Sårbarhet
// ═══════════════════════════════════════════════════════════════════

export interface NorkartRosData {
  // Flom & skred
  Flom?: string | null
  AktsomhetFlom?: boolean
  Steinsprang?: boolean
  Snoskred?: boolean
  SnoskredInfo?: string | null
  Kvikkleire?: string | null
  JordEllerFlomSkredfare?: boolean
  HarSkredHendelse?: boolean
  // Stormflo
  FareForStormFlo?: string | null
  FareForStormFlo2100?: string | null
  FareForStormFlo2150?: string | null
  // Brann
  AvstandBrannstasjon?: number | null
  Brannstasjon?: string | null
  Brannvesen?: string | null
  Kasernert?: string | null
  Brannsmittesone?: boolean
  OyUtenBrannstasjon?: boolean
  // Kraftledning
  Kraftledning?: string | null
  // Vern & kultur
  Verneomrade?: boolean
  VerneomradeNavn?: string | null
  VerneomradeUrl?: string | null
  VerneomradeForeslatt?: boolean
  StatligSikraFriluftsomrade?: boolean
  FredaBygg?: boolean
  FredabyggNavn?: string | null
  FredabyggUrl?: string | null
  Enkeltminne?: boolean
  EnkeltminneNavn?: string | null
  EnkeltminneUrl?: string | null
  Kulturmiljo?: boolean
  KulturmiljoNavn?: string | null
  Sikringssone?: boolean
  SikringssoneNavn?: string | null
  // Kyst & trafikk
  Kyst?: string | null
  AarsDognTrafikk?: string | null
  OyUtenFastlandsforbindelse?: string | null
  // Nedbør
  NedborAar?: number | null
  // Meta
  Bygningsnummer?: number
  Kommune?: string | null
}

export interface NorkartOvervannData {
  Bygningsnummer?: number
  Flom_Risikotall?: number | null
  Risiko_Objekter?: number | null
  Flom_Akkumulert?: number | null
  Skred_Akkumulert?: number | null
  Skred_Risikotall?: number | null
}

export interface NorkartRosMatrikkelData {
  MatrikkelEnhet?: {
    KommuneNummer?: number
    GardsNummer?: number
    BruksNummer?: number
    FormatertNummer?: string
    MatrikkelId?: string
  }
  RosData?: Array<NorkartRosData & {
    Teignummer?: string
    Postnummer?: string
    Poststed?: string
    Grunnkretsnummer?: string
    Grunnkretsnavn?: string
    Kumulesone?: string
  }>
}

/** Hent ROS-data via matrikkelident (v2) */
export async function hentRosForMatrikkel(
  knr: string, gnr: number | string, bnr: number | string
): Promise<NorkartRosMatrikkelData | null> {
  if (!ROS_KEY) return null
  const matrikkelId = byggMatrikkelId(knr, gnr, bnr)
  const url = `${BASE.ros}/v2/matrikkelident/${matrikkelId}`
  return nkFetch<NorkartRosMatrikkelData>(url, ROS_KEY)
}

/** Hent ROS-data for bygningsnummer (v3) */
export async function hentRosForBygning(bygningsnummer: number | string): Promise<NorkartRosData | null> {
  if (!ROS_KEY) return null
  const url = `${BASE.ros}/v3/bygning/${bygningsnummer}`
  return nkFetch<NorkartRosData>(url, ROS_KEY)
}

/** Hent overvannsrisiko for bygning (v3) */
export async function hentOvervannForBygning(bygningsnummer: number | string): Promise<NorkartOvervannData | null> {
  if (!ROS_KEY) return null
  const url = `${BASE.ros}/v3/bygning/${bygningsnummer}/overvann`
  return nkFetch<NorkartOvervannData>(url, ROS_KEY)
}

// ═══════════════════════════════════════════════════════════════════
// 3. Samlet analyse
// ═══════════════════════════════════════════════════════════════════

export interface NorkartSamletAnalyse {
  bygningsdata: NorkartBygningerResponse | null
  rosData: NorkartRosMatrikkelData | null
  tilgjengelig: boolean
}

/** Kjører Bygning + ROS parallelt for én eiendom */
export async function kjorNorkartAnalyse(
  knr: string, gnr: number | string, bnr: number | string
): Promise<NorkartSamletAnalyse> {
  if (!hasNorkartKey()) {
    return { bygningsdata: null, rosData: null, tilgjengelig: false }
  }

  const [bygningsdata, rosData] = await Promise.all([
    hentBygningerForMatrikkel(knr, gnr, bnr),
    hentRosForMatrikkel(knr, gnr, bnr),
  ])

  // Berik med overvannsdata per bygning (fra bygningsdata)
  if (bygningsdata?.Bygninger?.length) {
    const overvannResultater = await Promise.all(
      bygningsdata.Bygninger.slice(0, 5).map(async (b) => {
        if (!b.Bygningsnummer) return null
        return hentOvervannForBygning(b.Bygningsnummer)
      })
    )
    bygningsdata.Bygninger.forEach((b, i) => {
      if (overvannResultater[i]) {
        ;(b as any)._overvann = overvannResultater[i]
      }
    })
  }

  return { bygningsdata, rosData, tilgjengelig: true }
}

// ─── Hjelpefunksjoner ───────────────────────────────────────────────

/** Tolker ROS-data til en forenklet risikoprofil */
export function tolkRosTilRisikoprofil(ros: NorkartRosData): Array<{
  faktor: string
  status: 'ok' | 'advarsel' | 'fare'
  detaljer: string
}> {
  const profil: Array<{ faktor: string; status: 'ok' | 'advarsel' | 'fare'; detaljer: string }> = []

  // Flom
  if (ros.Flom && ros.Flom !== 'Ikke kartlagt' && ros.Flom !== 'Nei, karttlagt') {
    profil.push({ faktor: 'Flomsone', status: 'fare', detaljer: `Gjentaksintervall: ${ros.Flom} år` })
  } else if (ros.AktsomhetFlom) {
    profil.push({ faktor: 'Aktsomhet flom', status: 'advarsel', detaljer: 'Innenfor aktsomhetsområde for flom' })
  } else {
    profil.push({ faktor: 'Flom', status: 'ok', detaljer: ros.Flom === 'Ikke kartlagt' ? 'Ikke kartlagt' : 'Ikke i flomsone' })
  }

  // Kvikkleire
  if (ros.Kvikkleire && ros.Kvikkleire !== 'Nei' && ros.Kvikkleire !== 'Ikke kartlagt') {
    const status = ros.Kvikkleire.includes('Høy') ? 'fare' : ros.Kvikkleire.includes('Middels') ? 'advarsel' : 'ok'
    profil.push({ faktor: 'Kvikkleire', status, detaljer: ros.Kvikkleire })
  } else {
    profil.push({ faktor: 'Kvikkleire', status: 'ok', detaljer: ros.Kvikkleire || 'Ikke kartlagt' })
  }

  // Skred
  if (ros.Steinsprang || ros.Snoskred || ros.JordEllerFlomSkredfare || ros.HarSkredHendelse) {
    const typer = []
    if (ros.Steinsprang) typer.push('Steinsprang')
    if (ros.Snoskred) typer.push('Snøskred')
    if (ros.JordEllerFlomSkredfare) typer.push('Jord/flomskred')
    if (ros.HarSkredHendelse) typer.push('Tidligere hendelse')
    profil.push({ faktor: 'Skredfare', status: 'fare', detaljer: typer.join(', ') })
  } else {
    profil.push({ faktor: 'Skredfare', status: 'ok', detaljer: 'Ingen registrert' })
  }

  // Stormflo
  if (ros.FareForStormFlo && ros.FareForStormFlo !== 'Nei') {
    profil.push({ faktor: 'Stormflo', status: 'fare', detaljer: `Gjentaksintervall: ${ros.FareForStormFlo} år` })
  } else if (ros.FareForStormFlo2100) {
    profil.push({ faktor: 'Stormflo 2100', status: 'advarsel', detaljer: ros.FareForStormFlo2100 })
  }

  // Kraftledning
  if (ros.Kraftledning && ros.Kraftledning !== 'Nei') {
    profil.push({ faktor: 'Kraftledning', status: 'advarsel', detaljer: `Innenfor ${ros.Kraftledning}` })
  }

  // Brann
  if (ros.AvstandBrannstasjon && ros.AvstandBrannstasjon > 15) {
    profil.push({ faktor: 'Brannstasjon', status: 'advarsel', detaljer: `${ros.AvstandBrannstasjon.toFixed(1)} km unna (${ros.Brannstasjon || ''})` })
  } else if (ros.AvstandBrannstasjon) {
    profil.push({ faktor: 'Brannstasjon', status: 'ok', detaljer: `${ros.AvstandBrannstasjon.toFixed(1)} km – ${ros.Brannstasjon || ''}` })
  }

  // Kulturminner
  if (ros.FredaBygg || ros.Enkeltminne || ros.Kulturmiljo || ros.Sikringssone) {
    const items = []
    if (ros.FredaBygg) items.push(`Fredet: ${ros.FredabyggNavn || 'Ja'}`)
    if (ros.Enkeltminne) items.push(`Enkeltminne: ${ros.EnkeltminneNavn || 'Ja'}`)
    if (ros.Kulturmiljo) items.push(`Kulturmiljø: ${ros.KulturmiljoNavn || 'Ja'}`)
    if (ros.Sikringssone) items.push(`Sikringssone: ${ros.SikringssoneNavn || 'Ja'}`)
    profil.push({ faktor: 'Kulturminner', status: 'advarsel', detaljer: items.join('; ') })
  }

  // Verneområde
  if (ros.Verneomrade) {
    profil.push({ faktor: 'Verneområde', status: 'fare', detaljer: ros.VerneomradeNavn || 'Ja' })
  }

  // Kyst
  if (ros.Kyst && ros.Kyst !== 'Nei') {
    profil.push({ faktor: 'Kystsone', status: 'advarsel', detaljer: `Innenfor ${ros.Kyst} fra kystlinje` })
  }

  // Nedbør
  if (ros.NedborAar) {
    profil.push({ faktor: 'Nedbør', status: 'ok', detaljer: `${ros.NedborAar} mm/år` })
  }

  return profil
}
