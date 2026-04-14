import { NextRequest, NextResponse } from 'next/server'

// Server-side DOK-analyse proxy
// Unngår CORS/timeout-problemer fra frontend
// POST { lat, lon }

export const maxDuration = 30

const DOK_API = 'https://kartverket-ogc-api.azurewebsites.net/processes/fullstendighetsdekning/execution'

interface DOKCoverage {
  layer: string
  layerName: string
  coverageStatus: string
  lastUpdated: string
}

interface RiskCategory {
  kategori: string
  ikon: string
  farge: 'red' | 'green' | 'gray' | 'yellow'
  status: string
  datasett: { navn: string; status: string }[]
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}

  const { lat, lon } = body
  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat og lon er påkrevd' }, { status: 400 })
  }

  try {
    const res = await fetch(DOK_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inputs: {
          datasets: [],
          geometry: { type: 'Point', coordinates: [lon, lat] }
        }
      }),
      signal: AbortSignal.timeout(25000),
    })

    if (!res.ok) {
      return NextResponse.json({ error: `DOK API HTTP ${res.status}` }, { status: 502 })
    }

    const data = await res.json()
    const coverages: DOKCoverage[] = data.properties?.coverages || []

    // Kategoriser og lag risikooversikt
    const keyRisks = [
      { kategori: 'Flom', ikon: '🌊', keywords: ['flom', 'flomsone'] },
      { kategori: 'Overvann', ikon: '💧', keywords: ['overvann', 'oversvøm'] },
      { kategori: 'Skred', ikon: '⛰️', keywords: ['skred', 'snøskred', 'jordskred', 'steinsprang', 'fjellskred'] },
      { kategori: 'Kvikkleire', ikon: '🟤', keywords: ['kvikkleire', 'marin leire'] },
      { kategori: 'Radon', ikon: '☢️', keywords: ['radon'] },
      { kategori: 'Forurensning', ikon: '⚠️', keywords: ['forurens', 'grunn'] },
      { kategori: 'Kulturminner', ikon: '🏛️', keywords: ['kulturmin', 'fredet'] },
      { kategori: 'Verneområde', ikon: '🌿', keywords: ['verne', 'naturreservat', 'naturvern'] },
      { kategori: 'Støy', ikon: '🔊', keywords: ['støy', 'støysone'] },
      { kategori: 'Kraftlinjer', ikon: '⚡', keywords: ['kraftled', 'høyspent'] },
    ]

    const risikoer: RiskCategory[] = keyRisks.map(risk => {
      const matches = coverages.filter(c =>
        risk.keywords.some(kw => c.layerName?.toLowerCase().includes(kw))
      )
      const hasFunn = matches.some(m => m.coverageStatus?.toLowerCase().includes('med funn'))
      const isKartlagt = matches.some(m => {
        const s = m.coverageStatus?.toLowerCase() || ''
        return s.includes('kartlagt') && !s.includes('ikke kartlagt')
      })
      const ikkeKartlagt = matches.length > 0 && matches.every(m =>
        m.coverageStatus?.toLowerCase().includes('ikke kartlagt')
      )

      return {
        kategori: risk.kategori,
        ikon: risk.ikon,
        farge: hasFunn ? 'red' as const : ikkeKartlagt ? 'yellow' as const : isKartlagt ? 'green' as const : 'gray' as const,
        status: hasFunn ? 'Funn registrert' : ikkeKartlagt ? 'Ikke kartlagt' : isKartlagt ? 'Ingen registrert fare' : 'Ikke relevant',
        datasett: matches.map(m => ({ navn: m.layerName, status: m.coverageStatus })),
      }
    })

    // Oppsummering
    const funnCount = risikoer.filter(r => r.farge === 'red').length
    const okCount = risikoer.filter(r => r.farge === 'green').length
    const ikkeKartlagtCount = risikoer.filter(r => r.farge === 'yellow').length

    // Statusfordeling
    const statusCounts: Record<string, number> = {}
    coverages.forEach(c => {
      statusCounts[c.coverageStatus] = (statusCounts[c.coverageStatus] || 0) + 1
    })

    return NextResponse.json({
      success: true,
      totaltDatasett: coverages.length,
      risikoer,
      oppsummering: {
        funnCount,
        okCount,
        ikkeKartlagtCount,
        totalSjekket: risikoer.length,
      },
      statusCounts,
      // Raw coverages for detail view
      coverages,
    })
  } catch (err: any) {
    return NextResponse.json({
      error: `DOK-analyse feilet: ${err.message || 'ukjent feil'}`,
    }, { status: 500 })
  }
}
