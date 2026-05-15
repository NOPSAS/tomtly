import { NextRequest, NextResponse } from 'next/server'

// Eiendommens og nærområdets transaksjonshistorikk
// Henter fra Kartverket Eiendomstransaksjoner og SSB Eiendomspriser
// GET /api/eiendom-historikk?kommunenummer=XXXX&gnr=YY&bnr=ZZ

const KV_EIENDOM_BASE = 'https://ws.geonorge.no/eiendom/v1'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const kommunenummer = searchParams.get('kommunenummer')?.padStart(4, '0')
  const gnr = searchParams.get('gnr')
  const bnr = searchParams.get('bnr')
  const lat = parseFloat(searchParams.get('lat') || '')
  const lng = parseFloat(searchParams.get('lng') || '')

  if (!kommunenummer) {
    return NextResponse.json({ error: 'kommunenummer er påkrevd' }, { status: 400 })
  }

  const resultater: {
    type: 'salg' | 'skjote' | 'pant' | 'fradeling'
    dato?: string
    belop?: number
    beskrivelse?: string
    adresse?: string
    areal?: number
    kilde: string
  }[] = []

  // ── 1. Hent matrikkelinformasjon for eiendommen ──
  let eiendomsdata: any = null
  if (gnr && bnr) {
    try {
      const matRes = await fetch(
        `${KV_EIENDOM_BASE}/eiendom/matrikkel?kommunenummer=${kommunenummer}&gaardsnummer=${gnr}&bruksnummer=${bnr}&uuidformat=false`,
        { signal: AbortSignal.timeout(8000) }
      )
      if (matRes.ok) {
        const data = await matRes.json()
        eiendomsdata = data?.eiendomsliste?.[0] || data
      }
    } catch {}
  }

  // ── 2. SSB Eiendomspriser per kvartal for kommunen ──
  // Henter gjennomsnittlig kvadratmeterpris for kommunen (tomt/eneboliger)
  let ssbData: {
    kommunenummer: string
    gjsnittPrisEnebolig?: number
    gjsnittPrisTomt?: number
    kvartal?: string
  } | null = null

  try {
    // SSB tabell 07241: Gjennomsnittlig kvadratmeterpris, eneboliger
    const ssbRes = await fetch(
      `https://data.ssb.no/api/v0/no/table/07241`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: [{
            code: 'Region',
            selection: { filter: 'item', values: [kommunenummer] },
          }, {
            code: 'ContentsCode',
            selection: { filter: 'item', values: ['Kvadratmeterpriser'] },
          }, {
            code: 'Tid',
            selection: { filter: 'top', values: ['4'] },
          }],
          response: { format: 'json-stat2' },
        }),
        signal: AbortSignal.timeout(8000),
      }
    )
    if (ssbRes.ok) {
      const ssbJson = await ssbRes.json()
      const verdier = Object.values(ssbJson.value || {}).filter((v: any) => v !== null)
      if (verdier.length > 0) {
        ssbData = {
          kommunenummer,
          gjsnittPrisEnebolig: Number(verdier[verdier.length - 1]),
          kvartal: Object.values(ssbJson.dimension?.Tid?.category?.label || {}).pop() as string,
        }
      }
    }
  } catch {}

  // ── 3. Hent nylige salg i nærområdet via Kartverket ──
  let nabolagsSalg: { adresse?: string; dato?: string; belop?: number; areal?: number }[] = []
  if (lat && lng) {
    try {
      // Søk etter eiendommer i 1km radius som er omsatt
      const delta = 0.009 // ca. 1km
      const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`
      const naboRes = await fetch(
        `${KV_EIENDOM_BASE}/punkt?nord=${lat}&ost=${lng}&koordsys=4258&radius=1000&uuidformat=false`,
        { signal: AbortSignal.timeout(6000) }
      )
      if (naboRes.ok) {
        const data = await naboRes.json()
        // Hent maks 5 nabolagseiendommer for kontekst
        const eiendommer = (data?.eiendomsliste || []).slice(0, 5)
        nabolagsSalg = eiendommer.map((e: any) => ({
          adresse: e.adresse?.[0]?.representasjonspunkt ? `Gnr. ${e.matrikkelnummer?.gaardsnummer}/${e.matrikkelnummer?.bruksnummer}` : undefined,
          areal: e.areal,
        }))
      }
    } catch {}
  }

  // ── Bygg prisstatistikk ──
  const prisStatistikk = ssbData ? {
    kommunenummer,
    gjsnittPrisPerM2Enebolig: ssbData.gjsnittPrisEnebolig,
    kvartal: ssbData.kvartal,
    kilde: 'SSB tabell 07241',
    merknad: 'Gjennomsnittlig omsetningspris per m² BRA for eneboliger i kommunen.',
  } : null

  // ── Tomteprisvurdering ──
  let tomteprisBenchmark: string | null = null
  if (ssbData?.gjsnittPrisEnebolig && eiendomsdata?.areal) {
    const estimertTomt = Math.round(eiendomsdata.areal * 0.15 * ssbData.gjsnittPrisEnebolig / 1000) * 1000
    tomteprisBenchmark = `Basert på gjennomsnittlig boligpris i kommunen (${ssbData.gjsnittPrisEnebolig?.toLocaleString('no')} kr/m²) og tomtens areal, er en indikativ tomteverdi ca. ${estimertTomt.toLocaleString('no')} – ${(estimertTomt * 1.5).toLocaleString('no')} kr. Dette er et statistisk estimat, ikke en verdivurdering.`
  }

  return NextResponse.json({
    kommunenummer,
    gnr, bnr,
    eiendomsdata: eiendomsdata ? {
      areal: eiendomsdata.areal,
      arealKilde: eiendomsdata.arealKilde,
      bruksnavn: eiendomsdata.bruksnavn,
      festenummer: eiendomsdata.festenummer,
    } : null,
    prisStatistikk,
    tomteprisBenchmark,
    nabolagsinfo: nabolagsSalg.length > 0 ? {
      antallNaboeiendommerFunnet: nabolagsSalg.length,
      radius: '1 km',
    } : null,
    kilderlenker: {
      kartverketEiendom: `https://seeiendom.kartverket.no/eiendom/${kommunenummer}/${gnr}/${bnr}`,
      ssbBoligpriser: 'https://www.ssb.no/bygg-bolig-og-eiendom/eiendomspriser',
    },
    merknad: 'Prisstatistikk er kommunal gjennomsnitt fra SSB og ikke en individuell verdivurdering av denne tomten.',
  })
}
