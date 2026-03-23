import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Delesaker-scraper
// Kilder:
// 1. eInnsyn API (api.einnsyn.no) - kommunale postjournaler
// 2. OpenGov 360online - byggesaker fra kommuner (Lillestrøm, Kristiansand, m.fl.)
// 3. Direkte HTML-scraping av kommune-innsynsløsninger

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'nb-NO,nb;q=0.9',
}

// ─── eInnsyn API ────────────────────────────────────────────────────────────

const EINNSYN_TERMS = [
  'fradeling',
  'fradeling av grunneiendom',
  'opprettelse av ny grunneiendom',
  'delingssøknad',
  'deling av grunneiendom',
  'arealoverføring',
]

interface DelesakeResult {
  saksnummer: string
  adresse: string
  kommune: string | null
  soker: string | null
  dato: string
  kilde: string
  detaljer: string | null
}

async function scrapeEinnsyn(): Promise<DelesakeResult[]> {
  const results: DelesakeResult[] = []

  for (const term of EINNSYN_TERMS) {
    try {
      const url = `https://api.einnsyn.no/search?searchTerm=${encodeURIComponent(term)}&limit=30`
      const res = await fetch(url, {
        headers: { Accept: 'application/json', 'User-Agent': 'Tomtly/1.0' },
      })
      if (!res.ok) continue
      const data = await res.json()

      const items: any[] = []
      if (Array.isArray(data)) items.push(...data)
      else if (data.items && Array.isArray(data.items)) items.push(...data.items)
      else if (data._embedded) {
        for (const key of Object.keys(data._embedded)) {
          if (Array.isArray(data._embedded[key])) items.push(...data._embedded[key])
        }
      }

      for (const item of items) {
        const tittel = item.offentligTittel || item.saksmappe?.offentligTittel
        if (!tittel) continue

        results.push({
          saksnummer: item.saksmappe?.saksnummer || item.id || `einnsyn-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          adresse: tittel,
          kommune: item.administrativEnhetObjekt?.navn || null,
          soker: item.korrespondansepart?.find((k: any) => k.korrespondanseparttype === 'avsender' && !k.korrespondansepartNavn?.includes('*'))?.korrespondansepartNavn || null,
          dato: item.journaldato || item.dokumentetsDato || item.publisertDato || new Date().toISOString().split('T')[0],
          kilde: 'eInnsyn',
          detaljer: `Søketerm: ${term}`,
        })
      }
    } catch {}
    await new Promise(r => setTimeout(r, 200))
  }

  return results
}

// ─── OpenGov 360online ──────────────────────────────────────────────────────

const OPENGOV_KOMMUNER = [
  { id: 'LILLESTROM', navn: 'Lillestrøm', casetypeid: '99001' },
  { id: 'KRSANDEBYGG', navn: 'Kristiansand', casetypeid: '99001' },
]

async function scrapeOpenGov(): Promise<DelesakeResult[]> {
  const results: DelesakeResult[] = []
  const searchTerms = ['fradeling', 'deling av eiendom', 'arealoverføring', 'opprettelse av grunneiendom']

  for (const kommune of OPENGOV_KOMMUNER) {
    for (const term of searchTerms) {
      try {
        const url = `https://opengov.360online.com/Cases/${kommune.id}?casetypeid=${kommune.casetypeid}&SearchString=${encodeURIComponent(term)}`
        const res = await fetch(url, { headers: HEADERS })
        if (!res.ok) continue
        const html = await res.text()

        // Parse case entries from HTML
        // OpenGov uses patterns like: case number BYGG-XX/XXXXX, address, description
        const casePattern = /(BYGG-\d{2}\/\d{4,6})\s*[\s\S]*?(?:href="[^"]*"[^>]*>([^<]+)<)/g
        let match
        while ((match = casePattern.exec(html)) !== null) {
          const caseNr = match[1]
          const title = match[2]?.trim()
          if (title && (title.toLowerCase().includes('fradeling') || title.toLowerCase().includes('deling') || title.toLowerCase().includes('arealoverføring'))) {
            results.push({
              saksnummer: caseNr,
              adresse: title,
              kommune: kommune.navn,
              soker: null,
              dato: new Date().toISOString().split('T')[0],
              kilde: `OpenGov-${kommune.navn}`,
              detaljer: null,
            })
          }
        }

        // Also try simpler pattern: look for addresses with fradeling keywords
        const linePattern = /(?:gnr|gbnr|bnr)?[^<]*?(\d+\/\d+(?:\/\d+)?)[^<]*?(?:fradeling|deling|arealoverf)/gi
        while ((match = linePattern.exec(html)) !== null) {
          const snippet = html.substring(Math.max(0, match.index - 200), match.index + match[0].length + 100)
          const caseMatch = snippet.match(/(BYGG-\d{2}\/\d{4,6})/)
          const addrMatch = snippet.match(/([A-ZÆØÅ][a-zæøå]+(?:\s+[a-zæøå]+)*\s+\d+[A-Za-z]?)/m)

          results.push({
            saksnummer: caseMatch?.[1] || `opengov-${kommune.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            adresse: addrMatch?.[1] || match[0].trim().substring(0, 100),
            kommune: kommune.navn,
            soker: null,
            dato: new Date().toISOString().split('T')[0],
            kilde: `OpenGov-${kommune.navn}`,
            detaljer: `Søketerm: ${term}`,
          })
        }
      } catch {}
      await new Promise(r => setTimeout(r, 300))
    }
  }

  return results
}

// ─── Oslo PBE Saksinnsyn ────────────────────────────────────────────────────

async function scrapeOsloPBE(): Promise<DelesakeResult[]> {
  const results: DelesakeResult[] = []
  try {
    // Oslo PBE uses a POST form - try GET with search parameter
    const url = 'https://innsyn.pbe.oslo.kommune.no/saksinnsyn/caseList.asp?text=fradeling&LID=&MID=&ESSION=&startDate=&endDate=&status='
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return results
    const html = await res.text()

    // Look for case patterns in the HTML
    const casePattern = /(\d{6}\/\d{4,6})[^<]*<[^>]*>([^<]+)/g
    let match
    while ((match = casePattern.exec(html)) !== null) {
      results.push({
        saksnummer: match[1],
        adresse: match[2].trim(),
        kommune: 'Oslo',
        soker: null,
        dato: new Date().toISOString().split('T')[0],
        kilde: 'Oslo-PBE',
        detaljer: null,
      })
    }
  } catch {}
  return results
}

// ─── 360online postjournaler ────────────────────────────────────────────────

const PJ_360_KOMMUNER = [
  { url: 'https://nordre-follo.pj.360online.com', navn: 'Nordre Follo' },
  { url: 'https://frogn.pj.360online.com', navn: 'Frogn' },
  { url: 'https://vestby.pj.360online.com', navn: 'Vestby' },
]

async function scrape360Postjournal(): Promise<DelesakeResult[]> {
  const results: DelesakeResult[] = []

  for (const kommune of PJ_360_KOMMUNER) {
    try {
      const url = `${kommune.url}/Journal/Search?searchString=fradeling&searchType=2`
      const res = await fetch(url, { headers: HEADERS })
      if (!res.ok) continue
      const html = await res.text()

      // Look for journal entries mentioning fradeling
      const entryPattern = /(\d{2}\/\d{4,6})[^<]*?([^<]*fradeling[^<]*)/gi
      let match
      while ((match = entryPattern.exec(html)) !== null) {
        results.push({
          saksnummer: match[1],
          adresse: match[2].trim().substring(0, 200),
          kommune: kommune.navn,
          soker: null,
          dato: new Date().toISOString().split('T')[0],
          kilde: `360-${kommune.navn}`,
          detaljer: null,
        })
      }
    } catch {}
    await new Promise(r => setTimeout(r, 300))
  }

  return results
}

// ─── Main handler ───────────────────────────────────────────────────────────

async function handler() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Run all scrapers in parallel
  const [einnsynResults, opengovResults, osloResults, pj360Results] = await Promise.all([
    scrapeEinnsyn(),
    scrapeOpenGov(),
    scrapeOsloPBE(),
    scrape360Postjournal(),
  ])

  const allResults = [...einnsynResults, ...opengovResults, ...osloResults, ...pj360Results]

  // Deduplicate by saksnummer
  const seen = new Set<string>()
  const unique: DelesakeResult[] = []
  for (const r of allResults) {
    if (!seen.has(r.saksnummer)) {
      seen.add(r.saksnummer)
      unique.push(r)
    }
  }

  let totalSaved = 0
  let totalSkipped = 0

  for (const r of unique) {
    const { data: existing } = await supabase
      .from('delesaker')
      .select('id')
      .eq('saksnummer', r.saksnummer)
      .single()

    if (existing) {
      totalSkipped++
      continue
    }

    const { error } = await supabase.from('delesaker').insert({
      saksnummer: r.saksnummer,
      adresse: r.adresse,
      kommune: r.kommune,
      soker_navn: r.soker,
      dokumenttype: r.kilde,
      sak_status: 'ukjent',
      vaar_status: 'ny',
      dato: r.dato,
      detaljer: r.detaljer,
    })

    if (!error) totalSaved++
  }

  return NextResponse.json({
    success: true,
    kilder: {
      einnsyn: einnsynResults.length,
      opengov: opengovResults.length,
      oslo_pbe: osloResults.length,
      pj360: pj360Results.length,
    },
    totalt_funnet: allResults.length,
    unike: unique.length,
    lagret: totalSaved,
    duplikater: totalSkipped,
  })
}

export async function GET() { return handler() }
export async function POST() { return handler() }
