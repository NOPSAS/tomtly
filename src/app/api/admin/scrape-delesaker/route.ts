import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Delesaker-scraper
// Bruker eInnsyn API (api.einnsyn.no) for å finne fradelingssaker
// fra kommunale postjournaler. Gratis, åpent, JSON-basert.

const SEARCH_TERMS = [
  'fradeling',
  'fradeling av grunneiendom',
  'opprettelse av ny grunneiendom',
  'delingssøknad',
  'delingssoknad',
  'deling av grunneiendom',
  'arealoverføring',
]

const EINNSYN_API = 'https://api.einnsyn.no'

interface EinnsynResult {
  id?: string
  offentligTittel?: string
  publisertDato?: string
  journaldato?: string
  dokumentetsDato?: string
  journalposttype?: string
  journalenhet?: string
  saksmappe?: {
    saksnummer?: string
    offentligTittel?: string
  }
  korrespondansepart?: Array<{
    korrespondansepartNavn?: string
    korrespondanseparttype?: string
  }>
  administrativEnhetObjekt?: {
    navn?: string
  }
}

async function searchEinnsyn(term: string, limit: number = 50): Promise<EinnsynResult[]> {
  try {
    // Search for Saksmappe (case folders) related to fradeling
    const url = `${EINNSYN_API}/search?searchTerm=${encodeURIComponent(term)}&limit=${limit}`
    const res = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'User-Agent': 'Tomtly/1.0 (tomtly.no)',
      },
    })
    if (!res.ok) {
      console.log(`[eInnsyn] ${term}: HTTP ${res.status}`)
      return []
    }
    const data = await res.json()

    // eInnsyn returns { _embedded: { ... } } or array
    if (Array.isArray(data)) return data
    if (data._embedded) {
      // Collect from all embedded types
      const results: EinnsynResult[] = []
      for (const key of Object.keys(data._embedded)) {
        if (Array.isArray(data._embedded[key])) {
          results.push(...data._embedded[key])
        }
      }
      return results
    }
    if (data.results) return data.results
    if (data.data) return data.data
    return []
  } catch (err) {
    console.log(`[eInnsyn] Error for "${term}":`, err)
    return []
  }
}

function extractKommune(result: EinnsynResult): string | null {
  // Try to extract kommune from various fields
  if (result.administrativEnhetObjekt?.navn) {
    return result.administrativEnhetObjekt.navn
  }
  if (result.journalenhet) {
    // journalenhet is often a URL like /enhet/xxx - we'd need to resolve it
    return null
  }
  return null
}

function extractSoker(result: EinnsynResult): string | null {
  if (!result.korrespondansepart) return null
  const avsender = result.korrespondansepart.find(
    k => k.korrespondanseparttype === 'avsender'
  )
  if (avsender?.korrespondansepartNavn && !avsender.korrespondansepartNavn.includes('*****')) {
    return avsender.korrespondansepartNavn
  }
  return null
}

function extractSaksnummer(result: EinnsynResult): string {
  if (result.saksmappe?.saksnummer) return result.saksmappe.saksnummer
  if (result.id) return result.id
  return `einnsyn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function extractDato(result: EinnsynResult): string {
  return result.journaldato
    || result.dokumentetsDato
    || result.publisertDato
    || new Date().toISOString().split('T')[0]
}

async function handler() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  let totalFound = 0
  let totalSaved = 0
  let totalSkipped = 0
  const perTerm: { term: string; funnet: number; lagret: number }[] = []

  for (const term of SEARCH_TERMS) {
    await new Promise(r => setTimeout(r, 1000))
    const results = await searchEinnsyn(term, 50)
    totalFound += results.length
    let lagretForTerm = 0

    for (const result of results) {
      const tittel = result.offentligTittel || result.saksmappe?.offentligTittel
      if (!tittel) continue

      const saksnummer = extractSaksnummer(result)

      // Check if already exists
      const { data: existing } = await supabase
        .from('delesaker')
        .select('id')
        .eq('saksnummer', saksnummer)
        .single()

      if (existing) {
        totalSkipped++
        continue
      }

      const kommune = extractKommune(result)
      const soker = extractSoker(result)
      const dato = extractDato(result)

      const { error } = await supabase.from('delesaker').insert({
        saksnummer,
        adresse: tittel,
        kommune,
        soker_navn: soker,
        dokumenttype: term,
        sak_status: 'ukjent',
        vaar_status: 'ny',
        dato,
        detaljer: result.saksmappe?.offentligTittel
          ? `Saksmappe: ${result.saksmappe.offentligTittel}`
          : null,
      })

      if (!error) {
        totalSaved++
        lagretForTerm++
      }
    }

    perTerm.push({ term, funnet: results.length, lagret: lagretForTerm })
  }

  return NextResponse.json({
    success: true,
    sokeord: SEARCH_TERMS.length,
    funnet: totalFound,
    lagret: totalSaved,
    duplikater_hoppet_over: totalSkipped,
    per_sokeord: perTerm,
  })
}

export async function GET() {
  return handler()
}

export async function POST() {
  return handler()
}
