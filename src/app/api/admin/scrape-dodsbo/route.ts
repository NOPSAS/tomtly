import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Dødsbo og tvangssalg scraper
// Kilder: FINN.no tvangssalg + søk etter "dødsbo" i FINN-annonser

const SOURCES = [
  // Tvangssalg på FINN
  { url: 'https://www.finn.no/realestate/homes/search.html?auction_type=1', label: 'tvangssalg_bolig' },
  { url: 'https://www.finn.no/realestate/plots/search.html?q=d%C3%B8dsbo', label: 'dodsbo_tomt' },
  { url: 'https://www.finn.no/realestate/homes/search.html?q=d%C3%B8dsbo', label: 'dodsbo_bolig' },
  { url: 'https://www.finn.no/realestate/plots/search.html?q=tvangssalg', label: 'tvangssalg_tomt' },
]

async function scrapePage(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html',
        'Accept-Language': 'nb-NO,nb;q=0.9',
      },
    })
    if (!res.ok) return []
    const html = await res.text()
    const koder = new Set<string>()
    const regex = /finnkode=(\d{6,})/g
    let match
    while ((match = regex.exec(html)) !== null) koder.add(match[1])
    return [...koder]
  } catch { return [] }
}

async function getAdDetails(finnKode: string) {
  try {
    const res = await fetch(`https://www.finn.no/realestate/homes/ad.html?finnkode=${finnKode}`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'text/html', 'Accept-Language': 'nb-NO' },
    })
    if (!res.ok) {
      // Prøv som tomt
      const res2 = await fetch(`https://www.finn.no/realestate/plots/ad.html?finnkode=${finnKode}`, {
        headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'text/html', 'Accept-Language': 'nb-NO' },
      })
      if (!res2.ok) return {}
      const html = await res2.text()
      return parseHtml(html)
    }
    return parseHtml(await res.text())
  } catch { return {} }
}

function parseHtml(html: string) {
  const d: Record<string, any> = {}
  const t = html.match(/<title>([^<]+)<\/title>/)
  if (t) d.adresse = t[1].replace(/ \| FINN.*$/, '').replace(/^.*?:\s*/, '').trim()
  const p = html.match(/(\d[\d\s]{2,})\s*kr/)
  if (p) { const v = parseInt(p[1].replace(/\s/g, '')); if (v > 10000) d.prisantydning = v }
  const s = html.match(/(\d[\d\s]*)\s*m²/)
  if (s) { const v = parseInt(s[1].replace(/\s/g, '')); if (v > 0) d.tomtestorrelse_m2 = v }
  const c = html.match(/"company_name"\s*:\s*"([^"]+)"/)
  if (c) d.megler_firma = c[1]
  return d
}

async function handler() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  const supabase = createClient(supabaseUrl, supabaseKey)

  const allKoder = new Map<string, string>()

  for (const source of SOURCES) {
    await new Promise(r => setTimeout(r, 2000))
    const koder = await scrapePage(source.url)
    koder.forEach(k => { if (!allKoder.has(k)) allKoder.set(k, source.label) })
    console.log(`[Dødsbo/Tvang] ${source.label}: ${koder.length} treff`)
  }

  let newCount = 0
  let detailsFetched = 0

  for (const [kode, label] of allKoder) {
    if (detailsFetched >= 15) break

    const { data: existing } = await supabase.from('finn_tomter').select('id').eq('finn_kode', kode).single()
    if (existing) continue

    await new Promise(r => setTimeout(r, 2000))
    const details = await getAdDetails(kode)
    detailsFetched++

    const isDodsbo = label.includes('dodsbo')
    const flagg = [isDodsbo ? 'dødsbo' : 'tvangssalg']

    await supabase.from('finn_tomter').insert({
      finn_kode: kode,
      finn_url: `https://www.finn.no/realestate/${label.includes('tomt') ? 'plots' : 'homes'}/ad.html?finnkode=${kode}`,
      type: label.includes('tomt') ? 'tomt' : 'tomt',
      adresse: details.adresse || null,
      kommune: details.kommune || null,
      tomtestorrelse_m2: details.tomtestorrelse_m2 || null,
      prisantydning: details.prisantydning || null,
      megler_firma: details.megler_firma || null,
      status: 'ny',
      flagg,
      status_historikk: [{ status: 'ny', dato: new Date().toISOString(), kilde: label }],
    })
    newCount++
  }

  return NextResponse.json({
    success: true,
    kilder_sjekket: SOURCES.length,
    totalt_funnet: allKoder.size,
    nye_lagret: newCount,
    detaljer_hentet: detailsFetched,
  })
}

export async function GET() { return handler() }
export async function POST() { return handler() }
