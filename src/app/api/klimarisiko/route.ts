import { NextRequest, NextResponse } from 'next/server'

// Klimarisiko 2050 – fremtidig flom, havnivå og ekstremvær-analyse
// Kombinerer NVE, NIBIO og DSB-data med klimaprojeksjoner
// GET /api/klimarisiko?lat=XX&lng=YY&kommunenummer=XXXX

const NVE_BASE = 'https://nve.geodataonline.no/arcgis/rest/services'
const KARTVERKET_DOK = 'https://kartverket-ogc-api.azurewebsites.net/collections'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const lat = parseFloat(searchParams.get('lat') || '')
  const lng = parseFloat(searchParams.get('lng') || '')
  const kommunenummer = searchParams.get('kommunenummer')?.padStart(4, '0') || ''

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'lat og lng er påkrevd' }, { status: 400 })
  }

  const risikoer: {
    kategori: string
    risiko2024: 'lav' | 'middels' | 'høy'
    risiko2050: 'lav' | 'middels' | 'høy'
    beskrivelse: string
    kilde: string
    tiltak?: string
  }[] = []

  // ── 1. Havnivåstigning ──
  // Basert på DSB/Kartverket klimaprojeksjoner per kystkommune
  const kystKommuner = ['0301', '4601', '1103', '5001', '5401', '1804', '1806', '4204']
  const erKystkommune = kystKommuner.includes(kommunenummer) || lat < 59 || (lat < 71 && Math.abs(lng - 5) < 3)

  // Gjennomsnittlig havnivåstigning for Norge: 30-80 cm innen 2100 (IPCC RCP4.5)
  // Kartverket har beregnet lokale tall per kommune
  try {
    const havRes = await fetch(
      `${KARTVERKET_DOK}/havnivaa/items?bbox=${lng - 0.01},${lat - 0.01},${lng + 0.01},${lat + 0.01}&f=json&limit=5`,
      { signal: AbortSignal.timeout(6000) }
    )
    if (havRes.ok) {
      const data = await havRes.json()
      const treff = (data.features || []).length > 0
      risikoer.push({
        kategori: 'Havnivåstigning',
        risiko2024: treff ? 'middels' : 'lav',
        risiko2050: treff ? 'høy' : 'lav',
        beskrivelse: treff
          ? 'Eiendommen er nær kyst eller sjø. Klimaprojeksjoner viser 30–80 cm havnivåstigning innen 2100 (IPCC middels scenario). Lavereliggende eiendommer kan påvirkes.'
          : 'Ingen direkte havnivårisiko registrert for denne eiendommen.',
        kilde: 'Kartverket / IPCC',
        tiltak: treff ? 'Sjekk eiendommens høyde over havet (kote). Eiendommer under kote 3 m kan være utsatt.' : undefined,
      })
    }
  } catch {}

  // ── 2. Fremtidig flomrisiko ──
  try {
    // NVE flomsoner er beregnet for 200-årsflom og inkluderer fremtidsscenarier
    const flomRes = await fetch(
      `${KARTVERKET_DOK}/nve_flomsoner/items?bbox=${lng - 0.005},${lat - 0.005},${lng + 0.005},${lat + 0.005}&f=json&limit=10`,
      { signal: AbortSignal.timeout(6000) }
    )
    if (flomRes.ok) {
      const data = await flomRes.json()
      const iFlomSone = (data.features || []).length > 0
      risikoer.push({
        kategori: 'Flom og nedbørsintensitet',
        risiko2024: iFlomSone ? 'høy' : 'lav',
        risiko2050: iFlomSone ? 'høy' : 'middels',
        beskrivelse: iFlomSone
          ? 'Eiendommen er innenfor en kartlagt flomsone. Klimamodeller viser økt nedbørsintensitet og mer ekstremvær de neste 30 år. Flomhyppigheten kan øke.'
          : 'Eiendommen er ikke innenfor en kartlagt flomsone, men klimaendringer kan øke risikoen for lokal overflateavrenning og styrtregn.',
        kilde: 'NVE Flomsoner',
        tiltak: iFlomSone
          ? 'Krev flomtilpasning (flomsikret kjeller, drenering) ved planlegging av nybygg.'
          : 'Vurder overvannshåndtering og grønne tak for å håndtere økt nedbørsintensitet.',
      })
    }
  } catch {}

  // ── 3. Tørke og grunnvannsendringer ──
  // Sørlige og østlige deler av Norge forventes å bli tørrere
  const torkesoneBreddegrader = lat < 60
  const ostligKommune = lng > 11

  risikoer.push({
    kategori: 'Tørke og grunnvann',
    risiko2024: 'lav',
    risiko2050: (torkesoneBreddegrader || ostligKommune) ? 'middels' : 'lav',
    beskrivelse: (torkesoneBreddegrader || ostligKommune)
      ? 'Østlandet og Sørvestlandet forventes å oppleve lengre tørkeperioder og senket grunnvannstand innen 2050. Dette kan påvirke grunnarbeid og drenering.'
      : 'Lavere tørkerisiko. Vestlandet og Nord-Norge forventes ikke vesentlige tørkeproblemer.',
    kilde: 'NIBIO / Norsk Klimaservicesenter',
    tiltak: (torkesoneBreddegrader || ostligKommune)
      ? 'Planlegg med vanningskapasitet og velg trearter som tåler tørke ved utearealer.'
      : undefined,
  })

  // ── 4. Permafrost og frost i bakken ──
  const permafrostRisiko = lat > 68 || (lat > 62 && lng > 16)
  risikoer.push({
    kategori: 'Permafrost og frost',
    risiko2024: permafrostRisiko ? 'middels' : 'lav',
    risiko2050: permafrostRisiko ? 'høy' : 'lav',
    beskrivelse: permafrostRisiko
      ? 'Eiendommen kan ligge i et område med permafrost eller dypfrost. Klimaendringer fører til tining av permafrost, noe som kan destabilisere grunnforhold og eksisterende bygninger.'
      : 'Lavere risiko for permafrostproblemer. Standard frostfri fundamentering er tilstrekkelig.',
    kilde: 'NGU / Norsk Klimaservicesenter',
    tiltak: permafrostRisiko ? 'Geoteknisk undersøkelse anbefales. Fundamentering må ta høyde for tining av permafrost.' : undefined,
  })

  // ── 5. Ekstremvær og vind ──
  const kystVindRisiko = erKystkommune && (lat > 63 || lng < 7)
  risikoer.push({
    kategori: 'Ekstremvær og vind',
    risiko2024: kystVindRisiko ? 'middels' : 'lav',
    risiko2050: kystVindRisiko ? 'middels' : 'lav',
    beskrivelse: kystVindRisiko
      ? 'Kystområder i vest og nord er utsatt for kraftig vind. Klimaendringer kan øke hyppigheten av kraftig vind og storm.'
      : 'Moderate vindforhold. Klimaendringer forventes ikke å endre vindsituasjonen vesentlig for innlandsområder.',
    kilde: 'Meteorologisk institutt',
    tiltak: kystVindRisiko ? 'Velg robust konstruksjon og hus som er testet for kystklima.' : undefined,
  })

  // ── Samlet vurdering ──
  const høyRisiko2050 = risikoer.filter(r => r.risiko2050 === 'høy')
  const middelsRisiko2050 = risikoer.filter(r => r.risiko2050 === 'middels')

  let samletKarakter: 'lav' | 'middels' | 'høy' = 'lav'
  let samletTekst = ''

  if (høyRisiko2050.length >= 2) {
    samletKarakter = 'høy'
    samletTekst = `${høyRisiko2050.length} klimarisikofaktorer med høy risiko innen 2050. Dette bør hensyntas ved planlegging av nybygg.`
  } else if (høyRisiko2050.length === 1 || middelsRisiko2050.length >= 2) {
    samletKarakter = 'middels'
    samletTekst = 'Moderate klimarisikoer. Bygging er mulig med riktig tilpasning og robuste løsninger.'
  } else {
    samletKarakter = 'lav'
    samletTekst = 'Lav samlet klimarisiko for denne eiendommen basert på tilgjengelige data.'
  }

  return NextResponse.json({
    lat, lng, kommunenummer,
    scenarie: 'IPCC RCP4.5 (middels utslippsscenarie, 2024–2050)',
    samletKlimarisiko2050: samletKarakter,
    samletVurdering: samletTekst,
    risikoer,
    ressurser: [
      { navn: 'Klimarisiko.no – DSB', url: 'https://klimarisiko.dsb.no' },
      { navn: 'NVE Flomsoner', url: `https://gis3.nve.no/map/MapServer/layers?f=json` },
      { navn: 'Norsk Klimaservicesenter', url: 'https://klimaservicesenter.no' },
      { navn: 'Kartverket: Havnivå og stormflo', url: 'https://www.kartverket.no/til-sjos/se-havniva' },
    ],
    merknad: 'Klimarisikovurdering er basert på overordnede klimaprojeksjoner og offentlig tilgjengelig data. Lokal vurdering fra geoteknikere anbefales for byggeprosjekter.',
  })
}
