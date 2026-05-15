import { NextRequest, NextResponse } from 'next/server'

// Nabobygg-analyse: Henter informasjon om hva naboeiendommene er bebygget med
// Bruker Norkart Bygning API og Kartverket Matrikkelen
// GET /api/nabobygg?lat=XX&lng=YY&radius=200

const NORKART_API_KEY = process.env.NORKART_API_KEY || ''
const KV_EIENDOM_BASE = 'https://ws.geonorge.no/eiendom/v1'

interface Nabobygg {
  avstand_m: number
  brukstype?: string
  bruksareal?: number
  byggeaar?: number
  etasjer?: number
  representasjonspunkt?: { lat: number; lng: number }
  harGarasje?: boolean
  harTilbygg?: boolean
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const lat = parseFloat(searchParams.get('lat') || '')
  const lng = parseFloat(searchParams.get('lng') || '')
  const radius = Math.min(parseInt(searchParams.get('radius') || '200'), 500)

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'lat og lng er påkrevd' }, { status: 400 })
  }

  const bygninger: Nabobygg[] = []

  // ── 1. Kartverket Matrikkelen: Bygninger i radius ──
  try {
    const bygRes = await fetch(
      `${KV_EIENDOM_BASE}/bygning/punkt?nord=${lat}&ost=${lng}&koordsys=4258&radius=${radius}&uuidformat=false`,
      { signal: AbortSignal.timeout(10000) }
    )
    if (bygRes.ok) {
      const data = await bygRes.json()
      const bygningsliste = data?.bygningsliste || data?.bygningstilknytninger || []

      for (const byg of bygningsliste.slice(0, 30)) {
        const bygningspunkt = byg.representasjonspunkt || byg.bygningspunkt
        const avstand = bygningspunkt
          ? beregnAvstand(lat, lng, bygningspunkt.nord || bygningspunkt.lat, bygningspunkt.ost || bygningspunkt.lng)
          : 0

        const bygningstype = byg.bygningstype?.kodebeskrivelse || byg.bygningstype || ''
        const erGarasje = bygningstype.toLowerCase().includes('garasje') ||
          bygningstype.toLowerCase().includes('carport') ||
          byg.byggtype === '181' || byg.bygningstype?.kode === '181'

        bygninger.push({
          avstand_m: Math.round(avstand),
          brukstype: bygningstype,
          bruksareal: byg.bruksarealTotalt || byg.bra || byg.bebygdAreal,
          byggeaar: byg.byggeaar || byg.oppfoeringsaar,
          etasjer: byg.etasjeTillegg?.length || byg.antallEtasjer,
          representasjonspunkt: bygningspunkt ? {
            lat: bygningspunkt.nord || bygningspunkt.lat,
            lng: bygningspunkt.ost || bygningspunkt.lng,
          } : undefined,
          harGarasje: erGarasje,
        })
      }
    }
  } catch {}

  // ── 2. Norkart Bygning API (utfyllende data) ──
  if (NORKART_API_KEY && bygninger.length === 0) {
    try {
      const norkartRes = await fetch(
        `https://bygning.api.norkart.no/bygning/v2/punkt?nord=${lat}&ost=${lng}&radius=${radius}&koordinatsystem=WGS84`,
        {
          headers: { 'X-WAAPI-TOKEN': NORKART_API_KEY },
          signal: AbortSignal.timeout(8000),
        }
      )
      if (norkartRes.ok) {
        const norkartData = await norkartRes.json()
        for (const byg of (norkartData.bygninger || norkartData || []).slice(0, 20)) {
          bygninger.push({
            avstand_m: Math.round(byg.avstand || 0),
            brukstype: byg.brukstype || byg.bygningstype,
            bruksareal: byg.bruksareal || byg.bebygdAreal,
            byggeaar: byg.byggeaar,
            etasjer: byg.antallEtasjer,
          })
        }
      }
    } catch {}
  }

  // ── Statistikk og analyse ──
  const enebolig = bygninger.filter(b =>
    b.brukstype?.toLowerCase().includes('enebolig') ||
    b.brukstype?.toLowerCase().includes('frittliggende')
  )
  const garasjer = bygninger.filter(b => b.harGarasje)
  const toBygg = bygninger.filter(b =>
    b.brukstype?.toLowerCase().includes('to-') ||
    b.brukstype?.toLowerCase().includes('tomanns')
  )
  const nyere = bygninger.filter(b => b.byggeaar && b.byggeaar >= 2000)
  const eldre = bygninger.filter(b => b.byggeaar && b.byggeaar < 1980)

  const snittByggeaar = bygninger
    .filter(b => b.byggeaar && b.byggeaar > 1900)
    .reduce((sum, b, _, arr) => sum + (b.byggeaar || 0) / arr.length, 0)

  const snittBra = bygninger
    .filter(b => b.bruksareal && b.bruksareal > 50)
    .reduce((sum, b, _, arr) => sum + (b.bruksareal || 0) / arr.length, 0)

  // Innsikter basert på nabobygninger
  const innsikter: string[] = []

  if (enebolig.length > 0) {
    innsikter.push(`Dominerende bebyggelse er eneboliger (${enebolig.length} av ${bygninger.length} bygg nærliggende)`)
  }
  if (toBygg.length > 0) {
    innsikter.push(`Det finnes ${toBygg.length} tomannsboliger i området — tyder på at kommunen godtar slike tiltak`)
  }
  if (nyere.length > 0) {
    innsikter.push(`${nyere.length} bygg er oppført etter 2000 — aktivt byggeområde med moderne fortolkning av reguleringsbestemmelsene`)
  }
  if (snittByggeaar > 1900) {
    innsikter.push(`Gjennomsnittlig byggeår i området: ${Math.round(snittByggeaar)}`)
  }
  if (snittBra > 0) {
    innsikter.push(`Typisk boligstørrelse i nærområdet: ca. ${Math.round(snittBra)} m² BRA`)
  }
  if (garasjer.length > 0) {
    innsikter.push(`${garasjer.length} garasjer/carporter i nærområdet — garasjebygging er vanlig i dette området`)
  }

  return NextResponse.json({
    lat, lng, radius,
    antallBygninger: bygninger.length,
    bygninger: bygninger.sort((a, b) => a.avstand_m - b.avstand_m),
    statistikk: {
      antallEnebolig: enebolig.length,
      antallTomanns: toBygg.length,
      antallGarasjer: garasjer.length,
      antallNyere: nyere.length,
      antallEldre: eldre.length,
      snittByggeaar: snittByggeaar ? Math.round(snittByggeaar) : null,
      snittBruksareal: snittBra ? Math.round(snittBra) : null,
    },
    innsikter,
    relevansForKjoper: `Denne analysen viser hva naboer faktisk har bygget, noe som gir innsikt i hvordan kommunen tolker reguleringsbestemmelsene i praksis. Bygg som er oppført etter 2000 er særlig relevante.`,
  })
}

function beregnAvstand(lat1: number, lng1: number, lat2: number, lng2: number): number {
  if (!lat2 || !lng2) return 0
  const R = 6371000
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}
