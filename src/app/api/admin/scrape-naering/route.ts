import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// FINN.no Næringstomt-scraper
// https://www.finn.no/realestate/businessplots/search.html

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'nb-NO,nb;q=0.9,no;q=0.8,en;q=0.5',
}

const PAGES = Array.from({ length: 8 }, (_, i) => (
  `https://www.finn.no/realestate/businessplots/search.html?page=${i + 1}&sort=PUBLISHED_ASC`
))

async function extractFinnKoder(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return []
    const html = await res.text()
    const koder = new Set<string>()
    const regex = /finnkode=(\d{6,})/g
    let match
    while ((match = regex.exec(html)) !== null) koder.add(match[1])
    return [...koder]
  } catch { return [] }
}

async function scrapeAdDetails(finnKode: string) {
  const url = `https://www.finn.no/realestate/businessplots/ad.html?finnkode=${finnKode}`
  try {
    const res = await fetch(url, { headers: HEADERS })
    if (!res.ok) return {}
    const html = await res.text()
    const d: Record<string, any> = {}

    const titleMatch = html.match(/<title>([^<]+)<\/title>/)
    if (titleMatch) d.adresse = titleMatch[1].replace(/\s*\|.*$/, '').replace(/^.*?:\s*/, '').trim()

    const prisMatch = html.match(/(\d[\d\s]{2,})\s*kr/)
    if (prisMatch) {
      const p = parseInt(prisMatch[1].replace(/\s/g, ''))
      if (p > 10000) d.prisantydning = p
    }

    const sizeMatch = html.match(/(\d[\d\s]*)\s*m²/)
    if (sizeMatch) {
      const s = parseInt(sizeMatch[1].replace(/\s/g, ''))
      if (s > 0 && s < 10000000) d.tomtestorrelse_m2 = s
    }

    const kommuneMatch = html.match(/"municipality_name"\s*:\s*"([^"]+)"/)
    if (kommuneMatch) d.kommune = kommuneMatch[1].trim()

    const regMatch = html.match(/[Rr]egulering[^<]*?[>:]\s*([^<]{3,100})/)
    if (regMatch) d.regulering = regMatch[1].trim()

    const companyMatch = html.match(/"company_name"\s*:\s*"([^"]+)"/)
    if (companyMatch) d.megler_firma = companyMatch[1]

    const imgMatch = html.match(/"(https:\/\/images\.finncdn\.no\/dynamic\/[^"]+)"/)
    if (imgMatch) d.thumbnail_url = imgMatch[1]

    return d
  } catch { return {} }
}

async function handler(request?: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  let body: any = {}
  if (request) { try { body = await request.json() } catch {} }
  const maxDetails = body.maxAds || 30

  const allKoder = new Set<string>()

  for (const pageUrl of PAGES) {
    await new Promise(r => setTimeout(r, 800))
    const koder = await extractFinnKoder(pageUrl)
    koder.forEach(k => allKoder.add(k))
  }

  let newCount = 0
  let updatedCount = 0
  let detailsFetched = 0

  for (const finnKode of allKoder) {
    const { data: existing } = await supabase
      .from('naeringstomter')
      .select('id')
      .eq('finn_kode', finnKode)
      .single()

    if (existing) {
      updatedCount++
      continue
    }

    if (detailsFetched >= maxDetails) continue

    await new Promise(r => setTimeout(r, 1200))
    const details = await scrapeAdDetails(finnKode)
    detailsFetched++

    await supabase.from('naeringstomter').insert({
      finn_kode: finnKode,
      finn_url: `https://www.finn.no/realestate/businessplots/ad.html?finnkode=${finnKode}`,
      adresse: details.adresse || null,
      kommune: details.kommune || null,
      tomtestorrelse_m2: details.tomtestorrelse_m2 || null,
      reguleringsformaal: details.regulering || null,
      prisantydning: details.prisantydning || null,
      type: 'Næringstomt',
      megler_firma: details.megler_firma || null,
      kilde: 'finn',
      status: 'identifisert',
      status_historikk: [{ status: 'identifisert', dato: new Date().toISOString() }],
    })
    newCount++
  }

  return NextResponse.json({
    success: true,
    nye: newCount,
    oppdatert: updatedCount,
    totalt_funnet: allKoder.size,
    detaljer_hentet: detailsFetched,
    sider_scraped: PAGES.length,
  })
}

export async function GET() { return handler() }
export async function POST(request: NextRequest) { return handler(request) }
