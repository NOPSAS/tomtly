import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// FINN.no Tomte-scraper
// Henter tomter fra side 5+ (eldste først = 60+ dager), samt tvangssalg

const FINN_PAGES = [
  // Tomter - side 5-10 (eldste først)
  ...Array.from({ length: 6 }, (_, i) => ({
    url: `https://www.finn.no/realestate/plots/search.html?page=${i + 5}&sort=PUBLISHED_ASC`,
    type: 'tomt' as const,
  })),
  // Fritidstomter - side 5-10
  ...Array.from({ length: 6 }, (_, i) => ({
    url: `https://www.finn.no/realestate/leisureplots/search.html?page=${i + 5}&sort=PUBLISHED_ASC`,
    type: 'fritidstomt' as const,
  })),
  // Tvangssalg eiendom
  {
    url: 'https://www.finn.no/realestate/homes/search.html?auction_type=1',
    type: 'tvangssalg' as const,
  },
]

async function scrapeFinnPage(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'nb-NO,nb;q=0.9',
      },
    })
    if (!res.ok) return []
    const html = await res.text()
    const koder = new Set<string>()
    const regex = /finnkode=(\d{6,})/g
    let match
    while ((match = regex.exec(html)) !== null) {
      koder.add(match[1])
    }
    return [...koder]
  } catch { return [] }
}

async function scrapeAdDetail(finnKode: string, type: string) {
  try {
    const adType = type === 'fritidstomt' ? 'leisureplots' : type === 'tvangssalg' ? 'homes' : 'plots'
    const url = `https://www.finn.no/realestate/${adType}/ad.html?finnkode=${finnKode}`
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'nb-NO,nb;q=0.9',
      },
    })
    if (!res.ok) return {}
    const html = await res.text()
    const details: Record<string, any> = {}

    const titleMatch = html.match(/<title>([^<]+)<\/title>/)
    if (titleMatch) details.adresse = titleMatch[1].replace(/ \| FINN.*$/, '').replace(/^.*?:\s*/, '').trim()

    const priceMatch = html.match(/(\d[\d\s]{2,})\s*kr/)
    if (priceMatch) {
      const p = parseInt(priceMatch[1].replace(/\s/g, ''))
      if (p > 10000) details.prisantydning = p
    }

    const sizeMatch = html.match(/(\d[\d\s]*)\s*m²/)
    if (sizeMatch) {
      const s = parseInt(sizeMatch[1].replace(/\s/g, ''))
      if (s > 0 && s < 1000000) details.tomtestorrelse_m2 = s
    }

    const companyMatch = html.match(/"company_name"\s*:\s*"([^"]+)"/)
    if (companyMatch) details.megler_firma = companyMatch[1]

    const imgMatch = html.match(/"(https:\/\/images\.finncdn\.no\/dynamic\/[^"]+)"/)
    if (imgMatch) details.thumbnail_url = imgMatch[1]

    return details
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
  if (request) {
    try { body = await request.json() } catch {}
  }
  const maxDetails = body.maxAds || 30

  const allKoder = new Map<string, string>()

  for (const page of FINN_PAGES) {
    await new Promise(r => setTimeout(r, 1500))
    const koder = await scrapeFinnPage(page.url)
    koder.forEach(k => { if (!allKoder.has(k)) allKoder.set(k, page.type) })
    console.log(`[FINN] ${page.type} page: ${koder.length} koder`)
  }

  let newCount = 0
  let updatedCount = 0
  let detailsFetched = 0

  for (const [finnKode, type] of allKoder) {
    const { data: existing } = await supabase
      .from('finn_tomter')
      .select('id')
      .eq('finn_kode', finnKode)
      .single()

    if (existing) {
      await supabase.from('finn_tomter').update({ sist_oppdatert: new Date().toISOString() }).eq('id', existing.id)
      updatedCount++
    } else if (detailsFetched < maxDetails) {
      await new Promise(r => setTimeout(r, 2000))
      const details = await scrapeAdDetail(finnKode, type)
      detailsFetched++

      const isTvangssalg = type === 'tvangssalg'
      await supabase.from('finn_tomter').insert({
        finn_kode: finnKode,
        finn_url: `https://www.finn.no/realestate/${type === 'fritidstomt' ? 'leisureplots' : isTvangssalg ? 'homes' : 'plots'}/ad.html?finnkode=${finnKode}`,
        type: isTvangssalg ? 'tomt' : type,
        adresse: details.adresse || null,
        kommune: details.kommune || null,
        tomtestorrelse_m2: details.tomtestorrelse_m2 || null,
        prisantydning: details.prisantydning || null,
        megler_firma: details.megler_firma || null,
        thumbnail_url: details.thumbnail_url || null,
        status: 'ny',
        flagg: isTvangssalg ? ['tvangssalg'] : [],
        status_historikk: [{ status: 'ny', dato: new Date().toISOString() }],
      })
      newCount++
    }
  }

  // Oppsummering
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
    sider_scraped: FINN_PAGES.length,
    inkluderer_tvangssalg: true,
  })
}

export async function GET() { return handler() }
export async function POST(request: NextRequest) { return handler(request) }
