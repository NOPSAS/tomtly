import { NextRequest, NextResponse } from 'next/server'

// Server-side DOK-analyse proxy
// Unngår CORS/timeout-problemer fra frontend
// POST { lat, lon }

export const maxDuration = 60

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
  risiko: 'lav' | 'middels' | 'hoy' | 'ukjent'
  datasett: { navn: string; status: string }[]
}

// Vurder risiko basert på coverageStatus
function vurderRisiko(hasFunn: boolean, ikkeKartlagt: boolean, ingenData: boolean): 'lav' | 'middels' | 'hoy' | 'ukjent' {
  if (ingenData || ikkeKartlagt) return 'ukjent'
  if (hasFunn) return 'hoy'
  return 'lav'
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
      signal: AbortSignal.timeout(55000),
    })

    if (!res.ok) {
      return NextResponse.json({ error: `DOK API HTTP ${res.status}` }, { status: 502 })
    }

    const data = await res.json()
    const coverages: DOKCoverage[] = data.properties?.coverages || []

    // Kategoriser og lag risikooversikt
    // Utvidet med Strandsone, Stormflo, Naturtype, Høyspent, Jordvern
    const keyRisks = [
      { kategori: 'Flom', ikon: '🌊', keywords: ['flom', 'flomsone', 'jord- og flomskred'] },
      { kategori: 'Stormflo', ikon: '🌊', keywords: ['stormflo', 'havnivå'] },
      { kategori: 'Skred', ikon: '⛰️', keywords: ['skred', 'snøskred', 'jordskred', 'steinsprang', 'fjellskred', 'skredhendelser', 'skredfaresoner'] },
      { kategori: 'Kvikkleire', ikon: '🟤', keywords: ['kvikkleire', 'marin leire', 'mulighet for marin'] },
      { kategori: 'Radon', ikon: '☢️', keywords: ['radon'] },
      { kategori: 'Forurensning', ikon: '⚠️', keywords: ['forurenset grunn', 'forurens'] },
      { kategori: 'Strandsone', ikon: '🏖️', keywords: ['strandsonen', 'statlige planretningslinjer for differensiert forvaltning'] },
      { kategori: 'Kulturminner', ikon: '🏛️', keywords: ['kulturmin', 'fredet', 'kulturmiljø', 'brannsmiteområder', 'verneverdig'] },
      { kategori: 'Verneområde', ikon: '🌿', keywords: ['naturvernområder', 'naturreservat', 'verneplan', 'naturtype'] },
      { kategori: 'Støy', ikon: '🔊', keywords: ['støy', 'støysone'] },
      { kategori: 'Kraftlinjer', ikon: '⚡', keywords: ['kraftled', 'høyspent', 'byggeforbudssoner kraftledninger'] },
      { kategori: 'Marin grense', ikon: '📍', keywords: ['marin grense'] },
      { kategori: 'Grunnforhold', ikon: '⛏️', keywords: ['løsmasser', 'berggrunn', 'grunnvann', 'nadag', 'grunnundersøkelser'] },
    ]

    const risikoer: RiskCategory[] = keyRisks.map(risk => {
      const matches = coverages.filter(c =>
        risk.keywords.some(kw => c.layerName?.toLowerCase().includes(kw))
      )
      const hasFunn = matches.some(m => m.coverageStatus?.toLowerCase().includes('med funn'))
      const isKartlagt = matches.some(m => {
        const s = m.coverageStatus?.toLowerCase() || ''
        return (s.includes('kartlagt') || s.includes('relevant')) && !s.includes('ikke kartlagt') && !s.includes('med funn')
      })
      const ikkeKartlagt = matches.length > 0 && matches.every(m =>
        m.coverageStatus?.toLowerCase().includes('ikke kartlagt')
      )
      const ingenData = matches.length === 0

      const risiko = vurderRisiko(hasFunn, ikkeKartlagt, ingenData)

      let farge: 'red' | 'green' | 'gray' | 'yellow'
      if (hasFunn) farge = 'red'
      else if (ikkeKartlagt) farge = 'yellow'
      else if (isKartlagt) farge = 'green'
      else farge = 'gray'

      let status: string
      if (hasFunn) status = 'Funn registrert'
      else if (ikkeKartlagt) status = 'Ikke kartlagt'
      else if (isKartlagt) status = 'Ingen registrert fare'
      else status = 'Ikke relevant for området'

      return {
        kategori: risk.kategori,
        ikon: risk.ikon,
        farge,
        status,
        risiko,
        datasett: matches.map(m => ({ navn: m.layerName, status: m.coverageStatus })),
      }
    })

    // Oppsummering
    const funnCount = risikoer.filter(r => r.farge === 'red').length
    const okCount = risikoer.filter(r => r.farge === 'green').length
    const ikkeKartlagtCount = risikoer.filter(r => r.farge === 'yellow').length

    // Helhetlig risiko-vurdering
    let samletRisiko: 'lav' | 'middels' | 'hoy'
    if (funnCount >= 4) samletRisiko = 'hoy'
    else if (funnCount >= 2) samletRisiko = 'middels'
    else samletRisiko = 'lav'

    // Statusfordeling
    const statusCounts: Record<string, number> = {}
    coverages.forEach(c => {
      statusCounts[c.coverageStatus] = (statusCounts[c.coverageStatus] || 0) + 1
    })

    // Nøkkeladvarsler – de viktigste funnene
    const noekkelAdvarsler = risikoer
      .filter(r => r.farge === 'red')
      .map(r => r.kategori)

    return NextResponse.json({
      success: true,
      totaltDatasett: coverages.length,
      risikoer,
      oppsummering: {
        funnCount,
        okCount,
        ikkeKartlagtCount,
        totalSjekket: risikoer.length,
        samletRisiko,
        noekkelAdvarsler,
      },
      statusCounts,
      // Raw coverages for detail view
      coverages,
    })
  } catch (err: any) {
    const isTimeout = err?.name === 'TimeoutError' || err?.message?.includes('timeout') || err?.message?.includes('aborted')
    return NextResponse.json({
      error: isTimeout
        ? 'DOK-analyse tok for lang tid. Prøv igjen om litt.'
        : `DOK-analyse feilet: ${err.message || 'ukjent feil'}`,
      erTimeout: isTimeout,
    }, { status: isTimeout ? 504 : 500 })
  }
}
