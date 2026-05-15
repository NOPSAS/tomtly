import { NextRequest, NextResponse } from 'next/server'

// Områdeanalyse: nærservice, grunnforhold, prisstatistikk
// POST { lat, lon, radius? }

export const maxDuration = 45

// Overpass API speil-liste – prøver i rekkefølge ved feil
// Noen speil blokkerer Vercel-IP-er. private.coffee og kumi er mest stabile.
const OVERPASS_MIRRORS = [
  'https://overpass.private.coffee/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass-api.de/api/interpreter',
  'https://overpass.openstreetmap.ru/api/interpreter',
]

async function fetchOverpass(query: string): Promise<any> {
  for (const mirror of OVERPASS_MIRRORS) {
    try {
      const res = await fetch(mirror, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'data=' + encodeURIComponent(query),
        signal: AbortSignal.timeout(12000),
      })
      if (res.ok) {
        const contentType = res.headers.get('content-type') || ''
        if (contentType.includes('json')) {
          return await res.json()
        }
      }
    } catch {
      // Prøv neste speil
    }
  }
  return null
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}
  const { lat, lon, radius = 2000 } = body

  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat og lon er påkrevd' }, { status: 400 })
  }

  // ── 1. Nærservice fra OpenStreetMap (Overpass API) ──
  let naerservice: { type: string; navn: string; avstand: number; kategori: string }[] = []
  let overpassFeilet = false

  try {
    // Utvidet med barnehager, leger, apotek, treningsstudio, natur og mer
    const query = `[out:json][timeout:10];
(
  node["amenity"~"school|kindergarten|pharmacy|doctors|dentist|hospital|clinic|library|place_of_worship|community_centre|bus_station|fire_station|police"](around:${radius},${lat},${lon});
  way["amenity"~"school|kindergarten|hospital"](around:${radius},${lat},${lon});
  node["shop"~"supermarket|convenience|bakery|butcher|greengrocer|mall"](around:${radius},${lat},${lon});
  way["shop"~"supermarket|mall|department_store"](around:${radius},${lat},${lon});
  node["leisure"~"playground|sports_centre|fitness_centre|swimming_pool|park|nature_reserve|beach_resort|marina"](around:${radius},${lat},${lon});
  way["leisure"~"park|nature_reserve|swimming_pool|sports_centre|fitness_centre"](around:${radius},${lat},${lon});
  node["public_transport"="stop_position"](around:${radius},${lat},${lon});
  node["highway"="bus_stop"](around:${radius},${lat},${lon});
  node["railway"~"station|halt|tram_stop"](around:${radius},${lat},${lon});
  node["natural"~"beach|water|wood"](around:${radius},${lat},${lon});
  way["natural"~"beach|water|wood"](around:${radius},${lat},${lon});
  node["landuse"~"forest|recreation_ground"](around:${radius},${lat},${lon});
);
out center 80;`

    const data = await fetchOverpass(query)
    if (data && data.elements) {
      naerservice = data.elements.map((e: any) => {
        const tags = e.tags || {}
        const elat = e.lat || e.center?.lat
        const elon = e.lon || e.center?.lon
        const dist = elat && elon ? haversine(lat, lon, elat, elon) : 9999

        const amenity = tags.amenity || ''
        const shop = tags.shop || ''
        const leisure = tags.leisure || ''
        const railway = tags.railway || ''
        const natural = tags.natural || ''
        const landuse = tags.landuse || ''
        const transport = tags.public_transport || tags.highway || ''

        let kategori = 'Annet'
        if (['school'].includes(amenity)) kategori = 'Skole'
        else if (['kindergarten'].includes(amenity)) kategori = 'Barnehage'
        else if (['supermarket', 'convenience', 'bakery', 'butcher', 'greengrocer', 'mall'].includes(shop)) kategori = 'Dagligvare'
        else if (['pharmacy', 'doctors', 'dentist', 'hospital', 'clinic'].includes(amenity)) kategori = 'Helse'
        else if (['bus_stop', 'stop_position', 'bus_station'].includes(amenity || transport)) kategori = 'Kollektiv'
        else if (['station', 'halt', 'tram_stop'].includes(railway)) kategori = 'Kollektiv'
        else if (['playground', 'sports_centre', 'fitness_centre', 'swimming_pool'].includes(leisure)) kategori = 'Fritid'
        else if (['park', 'nature_reserve', 'beach_resort', 'marina'].includes(leisure)) kategori = 'Natur'
        else if (['beach', 'water', 'wood'].includes(natural)) kategori = 'Natur'
        else if (['forest', 'recreation_ground'].includes(landuse)) kategori = 'Natur'
        else if (['library', 'community_centre'].includes(amenity)) kategori = 'Kultur'

        const type = amenity || shop || leisure || railway || natural || landuse || transport

        return {
          type,
          navn: tags.name || typeLabel(type),
          avstand: Math.round(dist),
          kategori,
        }
      }).filter((n: any) => n.avstand < radius && n.avstand > 0).sort((a: any, b: any) => a.avstand - b.avstand)
    } else {
      overpassFeilet = true
    }
  } catch {
    overpassFeilet = true
  }

  // ── 2. Grunnforhold (fra DOK-data) ──
  let grunnforhold: { faktor: string; status: string; detalj: string }[] = []
  try {
    const dokRes = await fetch('https://kartverket-ogc-api.azurewebsites.net/processes/fullstendighetsdekning/execution', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: { datasets: [], geometry: { type: 'Point', coordinates: [lon, lat] } } }),
      signal: AbortSignal.timeout(30000),
    })
    if (dokRes.ok) {
      const dokData = await dokRes.json()
      const coverages = dokData.properties?.coverages || []

      const keyFactors = [
        { faktor: 'Kvikkleire', keywords: ['kvikkleire'] },
        { faktor: 'Marin leire', keywords: ['marin leire', 'mulighet for marin'] },
        { faktor: 'Radon', keywords: ['radon'] },
        { faktor: 'Grunnforurensning', keywords: ['forurenset grunn', 'forurens'] },
        { faktor: 'Flom', keywords: ['flom aktsomhet', 'flomsoner', 'jord- og flomskred'] },
        { faktor: 'Skred', keywords: ['skredfaresoner', 'skredhendelser', 'snøskred', 'steinsprang', 'fjellskred'] },
        { faktor: 'Stormflo', keywords: ['stormflo', 'havnivå'] },
        { faktor: 'Strandsone', keywords: ['strandsonen', 'statlige planretningslinjer for differensiert'] },
        { faktor: 'Støy', keywords: ['støy', 'støysone'] },
        { faktor: 'Kulturminner', keywords: ['kulturmin', 'fredet'] },
        { faktor: 'Løsmasser/fjell', keywords: ['løsmasser', 'berggrunn'] },
      ]

      for (const kf of keyFactors) {
        const matches = coverages.filter((c: any) =>
          kf.keywords.some(kw => (c.layerName || '').toLowerCase().includes(kw))
        )
        const hasFunn = matches.some((m: any) => (m.coverageStatus || '').toLowerCase().includes('med funn'))
        const isKartlagt = matches.some((m: any) => {
          const s = (m.coverageStatus || '').toLowerCase()
          return s.includes('kartlagt') && !s.includes('ikke kartlagt') && !s.includes('med funn')
        })
        const ikkeKartlagt = matches.length > 0 && matches.every((m: any) =>
          (m.coverageStatus || '').toLowerCase().includes('ikke kartlagt')
        )

        grunnforhold.push({
          faktor: kf.faktor,
          status: hasFunn ? 'Funn registrert' : ikkeKartlagt ? 'Ikke kartlagt' : isKartlagt ? 'Kartlagt – OK' : 'Ingen data',
          detalj: matches.map((m: any) => `${m.layerName}: ${m.coverageStatus}`).join('; ') || 'Ingen data',
        })
      }
    }
  } catch {}

  // ── 3. Sammendrag per kategori ──
  const naerserviceKategorier = groupBy(naerservice, 'kategori')

  // ── 4. Nærhet til natur – sjekk om det er sjø/vann/skog innenfor radius ──
  const naturKategori = naerserviceKategorier['Natur'] || []
  const harSjo = naturKategori.some((n: any) => ['beach', 'water', 'marina', 'beach_resort'].includes(n.type))
  const harSkog = naturKategori.some((n: any) => ['wood', 'forest', 'nature_reserve', 'park'].includes(n.type))

  // ── 5. Finn-søk i området ──
  const finnSokeUrl = `https://www.finn.no/realestate/plots/search.html?lat=${lat}&lon=${lon}&radius=5000&sort=PUBLISHED_ASC`

  return NextResponse.json({
    success: true,
    naerservice,
    naerserviceKategorier,
    grunnforhold,
    naturInfo: {
      harSjoeNaerhet: harSjo,
      harSkogNaerhet: harSkog,
      naturPunkter: naturKategori.length,
    },
    overpassFeilet,
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
    school: 'Skole',
    kindergarten: 'Barnehage',
    supermarket: 'Dagligvarebutikk',
    convenience: 'Nærbutikk',
    bakery: 'Bakeri',
    butcher: 'Slakter',
    greengrocer: 'Grønnsaksbutikk',
    pharmacy: 'Apotek',
    doctors: 'Legekontor',
    dentist: 'Tannlege',
    hospital: 'Sykehus',
    clinic: 'Klinikk',
    bus_stop: 'Bussholdeplass',
    stop_position: 'Holdeplass',
    bus_station: 'Busstasjon',
    station: 'Togstasjon',
    halt: 'Tog holdeplass',
    tram_stop: 'Trikkeholdeplass',
    playground: 'Lekeplass',
    sports_centre: 'Idrettssenter',
    fitness_centre: 'Treningsstudio',
    swimming_pool: 'Svømmehall',
    park: 'Park',
    nature_reserve: 'Naturreservat',
    beach_resort: 'Badestrand',
    marina: 'Marina/båthavn',
    beach: 'Strand/badeplass',
    water: 'Vann/innsjø',
    wood: 'Skog',
    forest: 'Skog',
    recreation_ground: 'Friluftsområde',
    library: 'Bibliotek',
    community_centre: 'Kultursenter',
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
