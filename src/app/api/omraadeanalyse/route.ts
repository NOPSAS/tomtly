import { NextRequest, NextResponse } from 'next/server'

// Områdeanalyse: nærservice, grunnforhold, kulturminner, prisstatistikk
// POST { lat, lon, radius? }

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}
  const { lat, lon, radius = 2000 } = body

  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat og lon er påkrevd' }, { status: 400 })
  }

  // ── 1. Nærservice fra OpenStreetMap (Overpass API) ──
  let naerservice: { type: string; navn: string; avstand: number; kategori: string }[] = []
  try {
    const query = `[out:json][timeout:10];
(
  node["amenity"~"school|kindergarten|pharmacy|doctors|dentist|hospital|clinic|library|place_of_worship|community_centre|bus_station"](around:${radius},${lat},${lon});
  way["amenity"~"school|kindergarten"](around:${radius},${lat},${lon});
  node["shop"~"supermarket|convenience|bakery"](around:${radius},${lat},${lon});
  way["shop"~"supermarket|mall|department_store"](around:${radius},${lat},${lon});
  node["leisure"~"playground|sports_centre|fitness_centre|swimming_pool"](around:${radius},${lat},${lon});
  node["public_transport"="stop_position"](around:${radius},${lat},${lon});
  node["highway"="bus_stop"](around:${radius},${lat},${lon});
);
out center 50;`

    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: 'data=' + encodeURIComponent(query),
      signal: AbortSignal.timeout(12000),
    })
    if (res.ok) {
      const data = await res.json()
      naerservice = (data.elements || []).map((e: any) => {
        const tags = e.tags || {}
        const elat = e.lat || e.center?.lat
        const elon = e.lon || e.center?.lon
        const dist = elat && elon ? haversine(lat, lon, elat, elon) : 9999

        let kategori = 'Annet'
        const type = tags.amenity || tags.shop || tags.leisure || tags.public_transport || tags.highway || ''
        if (['school'].includes(type)) kategori = 'Skole'
        else if (['kindergarten'].includes(type)) kategori = 'Barnehage'
        else if (['supermarket', 'convenience', 'bakery', 'mall'].includes(type)) kategori = 'Dagligvare'
        else if (['pharmacy', 'doctors', 'dentist', 'hospital', 'clinic'].includes(type)) kategori = 'Helse'
        else if (['bus_stop', 'stop_position', 'bus_station'].includes(type)) kategori = 'Kollektiv'
        else if (['playground', 'sports_centre', 'fitness_centre', 'swimming_pool'].includes(type)) kategori = 'Fritid'
        else if (['library', 'community_centre'].includes(type)) kategori = 'Kultur'

        return {
          type,
          navn: tags.name || typeLabel(type),
          avstand: Math.round(dist),
          kategori,
        }
      }).filter((n: any) => n.avstand < radius).sort((a: any, b: any) => a.avstand - b.avstand)
    }
  } catch {}

  // ── 2. Grunnforhold (fra DOK-data vi allerede har – extraher nøkkelinfo) ──
  // DOK hentes separat i /api/dok-analyse, men vi kan gi nøkkelinfo her
  let grunnforhold: { faktor: string; status: string; detalj: string }[] = []
  try {
    const dokRes = await fetch('https://kartverket-ogc-api.azurewebsites.net/processes/fullstendighetsdekning/execution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: { datasets: [], geometry: { type: 'Point', coordinates: [lon, lat] } } }),
      signal: AbortSignal.timeout(15000),
    })
    if (dokRes.ok) {
      const dokData = await dokRes.json()
      const coverages = dokData.properties?.coverages || []

      const keyFactors = [
        { faktor: 'Kvikkleire', keywords: ['kvikkleire'] },
        { faktor: 'Marin leire', keywords: ['marin'] },
        { faktor: 'Radon', keywords: ['radon'] },
        { faktor: 'Grunnforurensning', keywords: ['forurens', 'grunn'] },
        { faktor: 'Flom', keywords: ['flom', 'flomsone'] },
        { faktor: 'Skred', keywords: ['skred'] },
        { faktor: 'Støy', keywords: ['støy', 'støysone'] },
        { faktor: 'Kulturminner', keywords: ['kulturmin', 'fredet'] },
        { faktor: 'Løsmasser/fjell', keywords: ['løsmasse', 'berggrunn'] },
      ]

      for (const kf of keyFactors) {
        const matches = coverages.filter((c: any) =>
          kf.keywords.some(kw => (c.layerName || '').toLowerCase().includes(kw))
        )
        const hasFunn = matches.some((m: any) => (m.coverageStatus || '').toLowerCase().includes('med funn'))
        const isKartlagt = matches.some((m: any) => {
          const s = (m.coverageStatus || '').toLowerCase()
          return s.includes('kartlagt') && !s.includes('ikke kartlagt')
        })
        grunnforhold.push({
          faktor: kf.faktor,
          status: hasFunn ? 'Funn registrert' : isKartlagt ? 'Kartlagt – OK' : 'Ikke kartlagt',
          detalj: matches.map((m: any) => `${m.layerName}: ${m.coverageStatus}`).join('; ') || 'Ingen data',
        })
      }
    }
  } catch {}

  // ── 3. Tomter til salgs i området (fra FINN-scraping i DB) ──
  // For nå returnerer vi en lenke til FINN-søk
  const finnSokeUrl = `https://www.finn.no/realestate/plots/search.html?lat=${lat}&lon=${lon}&radius=5000&sort=PUBLISHED_ASC`

  return NextResponse.json({
    success: true,
    naerservice,
    naerserviceKategorier: groupBy(naerservice, 'kategori'),
    grunnforhold,
    finnTomterUrl: finnSokeUrl,
    radius,
  })
}

function haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000
  const rad = Math.PI / 180
  const dLat = (lat2 - lat1) * rad
  const dLon = (lon2 - lon1) * rad
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function typeLabel(type: string): string {
  const labels: Record<string, string> = {
    school: 'Skole', kindergarten: 'Barnehage', supermarket: 'Dagligvare',
    convenience: 'Nærbutikk', pharmacy: 'Apotek', doctors: 'Lege',
    bus_stop: 'Bussholdeplass', stop_position: 'Holdeplass',
    playground: 'Lekeplass', library: 'Bibliotek', bakery: 'Bakeri',
  }
  return labels[type] || type
}

function groupBy(arr: any[], key: string): Record<string, any[]> {
  return arr.reduce((acc, item) => {
    const k = item[key] || 'Annet'
    if (!acc[k]) acc[k] = []
    acc[k].push(item)
    return acc
  }, {} as Record<string, any[]>)
}
