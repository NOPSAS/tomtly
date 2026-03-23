import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// FINN.no Tomte-scraper
// Henter tomter > 1 MNOK, eldste først (PUBLISHED_ASC)
// Kategorier: boligtomter, fritidstomter

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'nb-NO,nb;q=0.9,no;q=0.8,en;q=0.5',
}

function buildPages() {
  const pages: { url: string; type: string }[] = []
  // Boligtomter side 1-15, eldste først, pris > 1M
  for (let i = 1; i <= 15; i++) {
    pages.push({
      url: `https://www.finn.no/realestate/plots/search.html?page=${i}&sort=PUBLISHED_ASC&price_from=1000000`,
      type: 'tomt',
    })
  }
  // Fritidstomter side 1-10, eldste først, pris > 1M
  for (let i = 1; i <= 10; i++) {
    pages.push({
      url: `https://www.finn.no/realestate/leisureplots/search.html?page=${i}&sort=PUBLISHED_ASC&price_from=1000000`,
      type: 'fritidstomt',
    })
  }
  return pages
}

async function extractFinnKoder(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return []
    const html = await res.text()
    const koder = new Set<string>()
    // FINN uses finnkode=NNNN in links
    const regex = /finnkode=(\d{6,})/g
    let match
    while ((match = regex.exec(html)) !== null) {
      koder.add(match[1])
    }
    return [...koder]
  } catch {
    return []
  }
}

interface AdDetails {
  adresse?: string
  prisantydning?: number
  totalpris?: number
  tomtestorrelse_m2?: number
  kommune?: string
  fylke?: string
  reguleringsinfo?: string
  megler_navn?: string
  megler_firma?: string
  megler_telefon?: string
  megler_epost?: string
  thumbnail_url?: string
}

async function scrapeAdDetails(finnKode: string, type: string): Promise<AdDetails> {
  const adType = type === 'fritidstomt' ? 'leisureplots' : 'plots'
  const url = `https://www.finn.no/realestate/${adType}/ad.html?finnkode=${finnKode}`
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return {}
    const html = await res.text()
    const d: AdDetails = {}

    // Title → address
    const titleMatch = html.match(/<title>([^<]+)<\/title>/)
    if (titleMatch) {
      d.adresse = titleMatch[1]
        .replace(/\s*\|.*$/, '')
        .replace(/^.*?:\s*/, '')
        .trim()
    }

    // Price - look for "Prisantydning" or price patterns
    const prisMatch = html.match(/Prisantydning[^<]*<[^>]*>[\s\S]*?(\d[\d\s]{2,})\s*kr/i)
      || html.match(/(\d[\d\s]{2,})\s*kr/)
    if (prisMatch) {
      const p = parseInt(prisMatch[1].replace(/\s/g, ''))
      if (p > 100000) d.prisantydning = p
    }

    // Total price
    const totalMatch = html.match(/Totalpris[^<]*<[^>]*>[\s\S]*?(\d[\d\s]{2,})\s*kr/i)
    if (totalMatch) {
      d.totalpris = parseInt(totalMatch[1].replace(/\s/g, ''))
    }

    // Plot size
    const sizeMatch = html.match(/(\d[\d\s]*)\s*m²/)
    if (sizeMatch) {
      const s = parseInt(sizeMatch[1].replace(/\s/g, ''))
      if (s > 0 && s < 10000000) d.tomtestorrelse_m2 = s
    }

    // Contact person name - multiple patterns
    const namePatterns = [
      /"name"\s*:\s*"([^"]{2,50})"/,
      /Kontaktperson[^<]*<[^>]*>\s*([^<]+)/i,
      /Ansvarlig megler[^<]*<[^>]*>\s*([^<]+)/i,
      /megler[^<]*<[^>]*>\s*([A-ZÆØÅ][a-zæøå]+ [A-ZÆØÅ][a-zæøå]+)/i,
    ]
    for (const pat of namePatterns) {
      const m = html.match(pat)
      if (m && m[1].trim().length > 3 && !m[1].includes('{') && !m[1].includes('http')) {
        d.megler_navn = m[1].trim()
        break
      }
    }

    // Company name
    const companyMatch = html.match(/"company_name"\s*:\s*"([^"]+)"/)
      || html.match(/"name"\s*:\s*"([^"]{5,80}(?:AS|Eiendom|Megling|Meglerforretning|megling)[^"]*)"/)
    if (companyMatch) d.megler_firma = companyMatch[1].trim()

    // Phone
    const phonePatterns = [
      /(?:tlf|telefon|mobil)[.:]*\s*(\+?47\s*\d[\d\s]{6,})/i,
      /(\d{2}\s\d{2}\s\d{2}\s\d{2})/,
      /(\d{3}\s\d{2}\s\d{3})/,
      /(\d{8})/,
    ]
    for (const pat of phonePatterns) {
      const m = html.match(pat)
      if (m) {
        const phone = m[1].replace(/\s+/g, ' ').trim()
        // Validate it looks like a phone number (8 digits)
        const digits = phone.replace(/\D/g, '')
        if (digits.length >= 8 && digits.length <= 12) {
          d.megler_telefon = phone
          break
        }
      }
    }

    // Email
    const emailMatch = html.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i)
    if (emailMatch && !emailMatch[1].includes('finn.no') && !emailMatch[1].includes('schibsted')) {
      d.megler_epost = emailMatch[1]
    }

    // Kommune
    const kommuneMatch = html.match(/"municipality_name"\s*:\s*"([^"]+)"/)
      || html.match(/"location"\s*:\s*"([^"]+)"/)
    if (kommuneMatch) d.kommune = kommuneMatch[1].trim()

    // Fylke
    const fylkeMatch = html.match(/"county_name"\s*:\s*"([^"]+)"/)
    if (fylkeMatch) d.fylke = fylkeMatch[1].trim()

    // Regulation
    const regMatch = html.match(/[Rr]egulering[^<]*?[>:]\s*([^<]{3,100})/)
    if (regMatch) d.reguleringsinfo = regMatch[1].trim()

    // Thumbnail
    const imgMatch = html.match(/"(https:\/\/images\.finncdn\.no\/dynamic\/[^"]+)"/)
    if (imgMatch) d.thumbnail_url = imgMatch[1]

    return d
  } catch {
    return {}
  }
}

async function handler(request?: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  let body: any = {}
  if (request) {
    try { body = await request.json() } catch {}
  }
  const maxDetails = body.maxAds || 50

  const PAGES = buildPages()
  const allKoder = new Map<string, string>()
  const errors: string[] = []

  // Phase 1: Collect finn codes from search pages
  for (const page of PAGES) {
    await new Promise(r => setTimeout(r, 800))
    const koder = await extractFinnKoder(page.url)
    koder.forEach(k => { if (!allKoder.has(k)) allKoder.set(k, page.type) })
  }

  if (allKoder.size === 0) {
    return NextResponse.json({
      success: false,
      error: 'Ingen finnkoder funnet. FINN blokkerer kanskje forespørselen.',
      sider_scraped: PAGES.length,
    })
  }

  // Phase 2: For new codes, fetch details
  let newCount = 0
  let updatedCount = 0
  let detailsFetched = 0
  let skippedExisting = 0

  for (const [finnKode, type] of allKoder) {
    const { data: existing } = await supabase
      .from('finn_tomter')
      .select('id')
      .eq('finn_kode', finnKode)
      .single()

    if (existing) {
      await supabase
        .from('finn_tomter')
        .update({ sist_oppdatert: new Date().toISOString() })
        .eq('id', existing.id)
      updatedCount++
      skippedExisting++
      continue
    }

    if (detailsFetched >= maxDetails) continue

    await new Promise(r => setTimeout(r, 1200))
    const details = await scrapeAdDetails(finnKode, type)
    detailsFetched++

    const adPath = type === 'fritidstomt' ? 'leisureplots' : 'plots'
    const { error } = await supabase.from('finn_tomter').insert({
      finn_kode: finnKode,
      finn_url: `https://www.finn.no/realestate/${adPath}/ad.html?finnkode=${finnKode}`,
      type,
      adresse: details.adresse || null,
      kommune: details.kommune || null,
      fylke: details.fylke || null,
      tomtestorrelse_m2: details.tomtestorrelse_m2 || null,
      prisantydning: details.prisantydning || null,
      megler_navn: details.megler_navn || null,
      megler_firma: details.megler_firma || null,
      megler_telefon: details.megler_telefon || null,
      megler_epost: details.megler_epost || null,
      reguleringsinfo: details.reguleringsinfo || null,
      thumbnail_url: details.thumbnail_url || null,
      status: 'ny',
      flagg: [],
      status_historikk: [{ status: 'ny', dato: new Date().toISOString() }],
    })

    if (error) {
      errors.push(`${finnKode}: ${error.message}`)
    } else {
      newCount++
    }
  }

  // Daily summary
  await supabase.from('finn_daglig_oppsummering').upsert({
    dato: new Date().toISOString().split('T')[0],
    nye_tomter: newCount,
    total_aktive: allKoder.size,
  }, { onConflict: 'dato' })

  return NextResponse.json({
    success: true,
    nye: newCount,
    oppdatert: updatedCount,
    totalt_funnet: allKoder.size,
    detaljer_hentet: detailsFetched,
    sider_scraped: PAGES.length,
    feil: errors.length > 0 ? errors.slice(0, 5) : undefined,
  })
}

export async function GET() { return handler() }
export async function POST(request: NextRequest) { return handler(request) }
