import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// FINN.no Tomte-scraper
// Scrapes tomter and fritidstomter from FINN.no

const FINN_URLS = {
  tomt: 'https://www.finn.no/realestate/plots/search.html?sort=PUBLISHED_DESC',
  fritidstomt: 'https://www.finn.no/realestate/leisureplots/search.html?sort=PUBLISHED_DESC',
}

interface FinnTomt {
  finn_kode: string
  finn_url: string
  type: 'tomt' | 'fritidstomt'
  adresse: string | null
  kommune: string | null
  fylke: string | null
  tomtestorrelse_m2: number | null
  prisantydning: number | null
  publiseringsdato: string | null
  megler_firma: string | null
  thumbnail_url: string | null
}

async function scrapeFinnPage(url: string, type: 'tomt' | 'fritidstomt'): Promise<FinnTomt[]> {
  const tomter: FinnTomt[] = []

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'nb-NO,nb;q=0.9,no;q=0.8',
      },
    })

    if (!res.ok) {
      console.error(`FINN fetch failed: ${res.status}`)
      return tomter
    }

    const html = await res.text()

    // Parse FINN listings from HTML
    // FINN uses data attributes and structured HTML
    // Extract finn-kode from URLs like /realestate/plots/ad.html?finnkode=123456
    const adRegex = /finnkode=(\d+)/g
    const finnKoder = new Set<string>()
    let match
    while ((match = adRegex.exec(html)) !== null) {
      finnKoder.add(match[1])
    }

    // For each unique finn-kode, extract what we can from the search results
    for (const kode of finnKoder) {
      const tomt: FinnTomt = {
        finn_kode: kode,
        finn_url: `https://www.finn.no/realestate/${type === 'tomt' ? 'plots' : 'leisureplots'}/ad.html?finnkode=${kode}`,
        type,
        adresse: null,
        kommune: null,
        fylke: null,
        tomtestorrelse_m2: null,
        prisantydning: null,
        publiseringsdato: null,
        megler_firma: null,
        thumbnail_url: null,
      }
      tomter.push(tomt)
    }

    console.log(`Found ${tomter.length} ${type} listings from FINN`)
  } catch (err) {
    console.error(`Error scraping FINN ${type}:`, err)
  }

  return tomter
}

async function scrapeAdDetails(finnUrl: string): Promise<Partial<FinnTomt>> {
  try {
    await new Promise(r => setTimeout(r, 2000)) // Rate limit: 2 sec between requests

    const res = await fetch(finnUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'nb-NO,nb;q=0.9',
      },
    })

    if (!res.ok) return {}

    const html = await res.text()
    const details: Partial<FinnTomt> = {}

    // Extract title/address
    const titleMatch = html.match(/<title>([^<]+)<\/title>/)
    if (titleMatch) {
      const title = titleMatch[1].replace(' - FINN.no', '').replace('Tomt til salgs: ', '').replace('Fritidstomt til salgs: ', '')
      details.adresse = title.trim()
    }

    // Extract location from breadcrumbs or structured data
    const locationMatch = html.match(/"location":\s*\{[^}]*"name":\s*"([^"]+)"/)
    if (locationMatch) details.kommune = locationMatch[1]

    // Extract price
    const priceMatch = html.match(/(\d[\d\s]+)\s*kr/)
    if (priceMatch) {
      const priceStr = priceMatch[1].replace(/\s/g, '')
      const price = parseInt(priceStr)
      if (price > 10000) details.prisantydning = price
    }

    // Extract size
    const sizeMatch = html.match(/(\d[\d\s]*)\s*m²/)
    if (sizeMatch) {
      const size = parseInt(sizeMatch[1].replace(/\s/g, ''))
      if (size > 0) details.tomtestorrelse_m2 = size
    }

    // Extract megler firma
    const meglerMatch = html.match(/class="[^"]*company[^"]*"[^>]*>([^<]+)</)
    if (meglerMatch) details.megler_firma = meglerMatch[1].trim()

    // Extract thumbnail/image
    const imgMatch = html.match(/"(https:\/\/images\.finncdn\.no\/dynamic\/[^"]+)"/)
    if (imgMatch) details.thumbnail_url = imgMatch[1]

    // Extract published date
    const dateMatch = html.match(/Publisert:?\s*(\d{1,2})\.\s*(\w+)\s*(\d{4})/)
    if (dateMatch) {
      details.publiseringsdato = `${dateMatch[3]}-01-01` // Simplified, enhance later
    }

    return details
  } catch (err) {
    console.error(`Error fetching ad details:`, err)
    return {}
  }
}

function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseKey)
}

async function runScraper(maxAds: number) {
  const supabase = getSupabase()
  if (!supabase) {
    return { error: 'Supabase not configured', status: 500 }
  }

  let allTomter: FinnTomt[] = []

  // Scrape both tomt and fritidstomt pages
  for (const [type, url] of Object.entries(FINN_URLS)) {
    const tomter = await scrapeFinnPage(url, type as 'tomt' | 'fritidstomt')
    allTomter = allTomter.concat(tomter)
  }

  let newCount = 0
  let updatedCount = 0
  let detailsFetched = 0

  for (const tomt of allTomter.slice(0, maxAds)) {
    // Check if already exists
    const { data: existing } = await supabase
      .from('finn_tomter')
      .select('id, prisantydning, status')
      .eq('finn_kode', tomt.finn_kode)
      .single()

    if (existing) {
      // Update dager_paa_finn
      await supabase
        .from('finn_tomter')
        .update({
          sist_oppdatert: new Date().toISOString(),
          dager_paa_finn: Math.floor((Date.now() - new Date(tomt.publiseringsdato || Date.now()).getTime()) / (1000 * 60 * 60 * 24))
        })
        .eq('id', existing.id)
      updatedCount++
    } else {
      // Fetch details for new listing
      if (detailsFetched < 10) { // Limit detail fetches per run
        const details = await scrapeAdDetails(tomt.finn_url)
        Object.assign(tomt, details)
        detailsFetched++
      }

      // Insert new
      await supabase
        .from('finn_tomter')
        .insert({
          ...tomt,
          status_historikk: [{ status: 'ny', dato: new Date().toISOString() }],
        })
      newCount++
    }
  }

  // Save daily summary
  await supabase.from('finn_daglig_oppsummering').upsert({
    dato: new Date().toISOString().split('T')[0],
    nye_tomter: newCount,
    total_aktive: allTomter.length,
  }, { onConflict: 'dato' })

  return {
    success: true,
    nye: newCount,
    oppdatert: updatedCount,
    totalt_funnet: allTomter.length,
    detaljer_hentet: detailsFetched,
  }
}

// GET handler for Vercel cron jobs
export async function GET() {
  try {
    const result = await runScraper(50)
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error('Scraper error (GET/cron):', error)
    return NextResponse.json({ error: 'Scraping failed' }, { status: 500 })
  }
}

// POST handler for manual triggers from admin UI
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const maxAds = body.maxAds || 20

    const result = await runScraper(maxAds)
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status })
    }
    return NextResponse.json(result)
  } catch (error) {
    console.error('Scraper error (POST):', error)
    return NextResponse.json({ error: 'Scraping failed' }, { status: 500 })
  }
}
