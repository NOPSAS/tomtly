import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Elements Publikum scraper via Playwright
// Kjører kun lokalt (npm run dev) – Vercel har ikke Playwright
//
// For full scraping av 37 kommuner, kjør:
//   node scripts/scrape-elements.mjs

const KOMMUNER = [
  { navn: 'Oslo', server: 'prod01', path: '921133642' },
  { navn: 'Nesodden', server: 'prod02', path: '944383565_PROD-944383565' },
  { navn: 'Fredrikstad', server: 'prod01', path: '940039541' },
  { navn: 'Sarpsborg', server: 'prod01', path: '938801363' },
  { navn: 'Halden', server: 'prod01', path: '959159092' },
  { navn: 'Kongsberg', server: 'prod02', path: '942402465_PROD-942402465' },
  { navn: 'Hamar', server: 'prod02', path: '970540008_PROD-970540008' },
  { navn: 'Lillehammer', server: 'prod02', path: '945578564_PROD-945578564' },
  { navn: 'Lier', server: 'prod01', path: '857566122' },
]

const SEARCH_TERMS = ['fradeling', 'deling av grunneiendom']

interface ScrapeResult {
  saksnummer: string
  adresse: string
  kommune: string
  detaljer: string | null
}

async function scrapeWithPlaywright(): Promise<{ results: ScrapeResult[]; error?: string }> {
  let chromium: any
  try {
    const pw = await import('playwright')
    chromium = pw.chromium
  } catch {
    return {
      results: [],
      error: 'Playwright ikke tilgjengelig. Kjør lokalt: node scripts/scrape-elements.mjs',
    }
  }

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const results: ScrapeResult[] = []

  // Only scrape first few kommuner via API (timeout-safe)
  const kommunerToScrape = KOMMUNER.slice(0, 5)

  for (const kommune of kommunerToScrape) {
    for (const term of SEARCH_TERMS) {
      let page: any
      try {
        page = await browser.newPage()
        page.setDefaultTimeout(15000)

        const url = `https://${kommune.server}.elementscloud.no/publikum/${kommune.path}`
        await page.goto(url, { waitUntil: 'networkidle', timeout: 25000 })
        await page.waitForTimeout(3000)

        // Find search input
        const searchInput = await page.$('input[type="search"], input[type="text"], input[placeholder*="øk"]')
        if (!searchInput) continue

        await searchInput.click()
        await searchInput.fill(term)
        await page.keyboard.press('Enter')
        await page.waitForTimeout(4000)

        // Extract text content for fradeling-related entries
        const entries = await page.evaluate((searchTerm: string) => {
          const body = document.body.textContent || ''
          const items = []
          const pattern = new RegExp(`[^\\n]{0,100}(?:${searchTerm}|fradeling|grunneiendom)[^\\n]{0,100}`, 'gi')
          let m
          while ((m = pattern.exec(body)) !== null) {
            items.push(m[0].trim())
          }
          return [...new Set(items)].slice(0, 20)
        }, term)

        for (const entry of entries) {
          const caseMatch = entry.match(/(\d{4}\/\d{3,6})/)
          results.push({
            saksnummer: caseMatch?.[1] || `elem-${kommune.path.split('_')[0]}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
            adresse: entry.substring(0, 200),
            kommune: kommune.navn,
            detaljer: `Kilde: Elements Publikum ${kommune.navn}, søketerm: ${term}`,
          })
        }
      } catch {}
      finally {
        if (page) await page.close().catch(() => {})
      }
    }
  }

  await browser.close()
  return { results }
}

async function handler() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  const { results, error } = await scrapeWithPlaywright()

  if (error) {
    return NextResponse.json({
      success: false,
      error,
      hint: 'For full scraping av alle 37 kommuner, kjør lokalt: node scripts/scrape-elements.mjs',
      kommuner: KOMMUNER.map(k => k.navn),
    })
  }

  // Deduplicate
  const seen = new Set<string>()
  const unique = results.filter(r => {
    if (seen.has(r.saksnummer)) return false
    seen.add(r.saksnummer)
    return true
  })

  const supabase = createClient(supabaseUrl, supabaseKey)
  let saved = 0
  let skipped = 0

  for (const r of unique) {
    const { data: existing } = await supabase
      .from('delesaker')
      .select('id')
      .eq('saksnummer', r.saksnummer)
      .single()

    if (existing) { skipped++; continue }

    const { error: insertErr } = await supabase.from('delesaker').insert({
      saksnummer: r.saksnummer,
      adresse: r.adresse,
      kommune: r.kommune,
      dokumenttype: `Elements-${r.kommune}`,
      sak_status: 'ukjent',
      vaar_status: 'ny',
      dato: new Date().toISOString().split('T')[0],
      detaljer: r.detaljer,
    })

    if (!insertErr) saved++
  }

  return NextResponse.json({
    success: true,
    kommuner_scraped: KOMMUNER.slice(0, 5).map(k => k.navn),
    totalt_funnet: results.length,
    unike: unique.length,
    lagret: saved,
    duplikater: skipped,
    hint: 'For alle 37 kommuner, kjør: node scripts/scrape-elements.mjs',
  })
}

export async function GET() { return handler() }
export async function POST() { return handler() }
