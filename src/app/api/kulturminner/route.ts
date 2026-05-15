import { NextRequest, NextResponse } from 'next/server'

// Kulturminner og fredete bygninger fra Riksantikvaren og Kartverket
// GET /api/kulturminner?lat=XX&lng=YY&radius=500
// Returnerer kulturminner, fredete bygninger og vernede områder nær tomten

const RA_BASE = 'https://kulturminnedata.ra.no/kulturminnedata/api/v4'
const GEONORGE_BASE = 'https://wfs.geonorge.no/skwms1/wfs.kulturminner'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const lat = parseFloat(searchParams.get('lat') || '')
  const lng = parseFloat(searchParams.get('lng') || '')
  const radius = parseInt(searchParams.get('radius') || '500')

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'lat og lng er påkrevd' }, { status: 400 })
  }

  const resultater: {
    type: string
    navn: string
    beskrivelse?: string
    avstand_m?: number
    vernestatus?: string
    periode?: string
    kilde: string
    url?: string
  }[] = []

  // ── 1. Riksantikvaren: Fredete bygninger og anlegg ──
  try {
    // Søk innenfor radius (meter) fra koordinat
    // Konverter til UTM33 for RA API (krever EPSG:25833)
    // Bruk WGS84 via bbox-parameter
    const delta = radius / 111000 // ca. grader per meter
    const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`

    const raRes = await fetch(
      `${RA_BASE}/lokaliteter?bbox=${bbox}&srid=4326&localitytype=Bygning&antall=50`,
      { signal: AbortSignal.timeout(8000) }
    )

    if (raRes.ok) {
      const data = await raRes.json()
      const lokaliteter = data.Results || data.lokaliteter || []
      for (const lok of lokaliteter.slice(0, 20)) {
        const avstand = lok.avstand || beregnAvstand(lat, lng, lok.breddegrad || lok.lat, lok.lengdegrad || lok.lng)
        resultater.push({
          type: 'Fredet bygning',
          navn: lok.lokalnavn || lok.navn || 'Ukjent kulturminne',
          beskrivelse: lok.beskrivelse || lok.type,
          avstand_m: Math.round(avstand),
          vernestatus: 'Fredet (Riksantikvaren)',
          periode: lok.datering || lok.periode,
          kilde: 'Riksantikvaren',
          url: lok.id ? `https://kulturminnedata.ra.no/kulturminnedata/detail.aspx?id=${lok.id}` : undefined,
        })
      }
    }
  } catch {}

  // ── 2. Riksantikvaren: Automatisk fredete (eldre enn 1537) ──
  try {
    const delta = radius / 111000
    const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`

    const raRes2 = await fetch(
      `${RA_BASE}/lokaliteter?bbox=${bbox}&srid=4326&localitytype=Arkeologisk&antall=30`,
      { signal: AbortSignal.timeout(8000) }
    )

    if (raRes2.ok) {
      const data = await raRes2.json()
      const lokaliteter = data.Results || data.lokaliteter || []
      for (const lok of lokaliteter.slice(0, 10)) {
        resultater.push({
          type: 'Arkeologisk kulturminne',
          navn: lok.lokalnavn || lok.navn || 'Ukjent arkeologisk minne',
          beskrivelse: lok.beskrivelse || 'Automatisk fredet (eldre enn 1537)',
          avstand_m: Math.round(lok.avstand || beregnAvstand(lat, lng, lok.breddegrad, lok.lengdegrad)),
          vernestatus: 'Automatisk fredet',
          periode: lok.datering || 'Middelalder eller eldre',
          kilde: 'Riksantikvaren',
          url: lok.id ? `https://kulturminnedata.ra.no/kulturminnedata/detail.aspx?id=${lok.id}` : undefined,
        })
      }
    }
  } catch {}

  // ── 3. Kartverket WFS: Kulturmiljøer ──
  try {
    const wfsUrl = `${GEONORGE_BASE}?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=kulturminner:Kulturmiljo&CRS=EPSG:4326&BBOX=${lat - 0.005},${lng - 0.005},${lat + 0.005},${lng + 0.005}&outputFormat=application/json`
    const wfsRes = await fetch(wfsUrl, { signal: AbortSignal.timeout(8000) })
    if (wfsRes.ok) {
      const geojson = await wfsRes.json()
      for (const feat of (geojson.features || []).slice(0, 5)) {
        const props = feat.properties || {}
        resultater.push({
          type: 'Kulturmiljø',
          navn: props.kulturmiljonavn || props.navn || 'Kulturmiljø',
          beskrivelse: props.beskrivelse || props.status,
          vernestatus: props.vernestatus || 'Vernet område',
          kilde: 'Kartverket',
        })
      }
    }
  } catch {}

  // ── Vurdering ──
  let vurdering = 'Ingen kjente kulturminner funnet i nærheten av tomten.'
  let risikonivaa: 'lav' | 'middels' | 'høy' = 'lav'

  const fredete = resultater.filter(r => r.vernestatus?.includes('Fredet'))
  const arkeologiske = resultater.filter(r => r.type === 'Arkeologisk kulturminne')
  const kulturmiljoer = resultater.filter(r => r.type === 'Kulturmiljø')

  if (fredete.length > 0 || arkeologiske.length > 0) {
    risikonivaa = 'høy'
    vurdering = `Det er registrert ${fredete.length + arkeologiske.length} fredete/automatisk fredete kulturminner innenfor ${radius} meter. Dette kan påvirke hva som er lov å bygge. Det er krav om arkeologisk undersøkelse ved byggetiltak nær automatisk fredete kulturminner. Kontakt Riksantikvaren eller fylkeskommunen for avklaring.`
  } else if (kulturmiljoer.length > 0) {
    risikonivaa = 'middels'
    vurdering = `Tomten ligger i eller nær et kulturmiljø. Spesielle estetiske krav kan gjelde for nye byggetiltak. Sjekk reguleringsplanen for eventuelle bevaringsbestemmelser.`
  } else if (resultater.length === 0) {
    vurdering = 'Ingen kjente kulturminner er registrert i umiddelbar nærhet. Merk at ikke alle kulturminner er registrert digitalt.'
  }

  return NextResponse.json({
    lat, lng, radius,
    antall: resultater.length,
    risikonivaa,
    vurdering,
    kulturminner: resultater.sort((a, b) => (a.avstand_m || 0) - (b.avstand_m || 0)),
    kildelenke: `https://kulturminnedata.ra.no/kulturminnedata/map.aspx?lat=${lat}&lng=${lng}`,
    merknad: 'Data fra Riksantikvaren og Kartverket. Automatisk fredete kulturminner (eldre enn 1537) er lovbeskyttede selv om de ikke er registrert. Kontakt fylkeskommunen ved usikkerhet.',
  })
}

function beregnAvstand(lat1: number, lng1: number, lat2: number, lng2: number): number {
  if (!lat2 || !lng2) return 999
  const R = 6371000
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
