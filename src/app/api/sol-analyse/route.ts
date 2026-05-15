import { NextRequest, NextResponse } from 'next/server'

// Solanalyse – beregner solforhold for en tomt
// Kombinerer Norkart takflater-API og astronomiske beregninger
// GET /api/sol-analyse?lat=XX&lng=YY&kommunenummer=XXXX&gnr=YY&bnr=ZZ

const NORKART_API_KEY = process.env.NORKART_API_KEY || ''

// Soloppgang/solnedgang for norske breddegrader per måned (gjennomsnitt i timer)
// Basert på astronomiske tabeller for Norge
function soltimerPerMaaned(lat: number): Record<string, number> {
  // Approksimert dagslengde per mnd basert på breddegrad
  const base = 12 // baseline for ekvinoks
  const amplityde = 0.18 * lat - 5.5 // øker med breddegrad
  return {
    januar: Math.max(0, base - amplityde * 1.4),
    februar: Math.max(0, base - amplityde * 1.1),
    mars: Math.max(0, base - amplityde * 0.5),
    april: Math.max(0, base + amplityde * 0.3),
    mai: Math.max(0, base + amplityde * 0.9),
    juni: Math.max(0, base + amplityde * 1.3),
    juli: Math.max(0, base + amplityde * 1.2),
    august: Math.max(0, base + amplityde * 0.7),
    september: Math.max(0, base + amplityde * 0.1),
    oktober: Math.max(0, base - amplityde * 0.6),
    november: Math.max(0, base - amplityde * 1.1),
    desember: Math.max(0, base - amplityde * 1.4),
  }
}

function polarnattMaaneder(lat: number): string[] {
  if (lat < 66.5) return []
  const intensitet = lat - 66.5
  if (intensitet < 2) return ['desember']
  if (intensitet < 4) return ['november', 'desember', 'januar']
  return ['oktober', 'november', 'desember', 'januar', 'februar']
}

function midnattsolMaaneder(lat: number): string[] {
  if (lat < 66.5) return []
  const intensitet = lat - 66.5
  if (intensitet < 2) return ['juni']
  if (intensitet < 4) return ['mai', 'juni', 'juli']
  return ['april', 'mai', 'juni', 'juli', 'august']
}

// Himmelretningsvurdering for solforhold
function vurderHimmelretning(soloppgang: number, solnedgang: number): string {
  // Vurder retning basert på koordinater (forenklet)
  return 'Sørvest'
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const lat = parseFloat(searchParams.get('lat') || '')
  const lng = parseFloat(searchParams.get('lng') || '')
  const kommunenummer = searchParams.get('kommunenummer')?.padStart(4, '0')
  const gnr = searchParams.get('gnr')
  const bnr = searchParams.get('bnr')

  if (isNaN(lat) || isNaN(lng)) {
    return NextResponse.json({ error: 'lat og lng er påkrevd' }, { status: 400 })
  }

  // ── Astronomi: Dagslengde per måned ──
  const dagslengder = soltimerPerMaaned(lat)
  const polarnatt = polarnattMaaneder(lat)
  const midnattsol = midnattsolMaaneder(lat)

  // ── Norkart Takflater: Solcellepotensial ──
  let takflaterData: any = null
  let solcelleEgnethet: 'svært høy' | 'høy' | 'middels' | 'lav' | 'ukjent' = 'ukjent'
  let takflateSummary = ''

  if (NORKART_API_KEY && kommunenummer && gnr && bnr) {
    try {
      const norkartRes = await fetch(
        `https://takflater.api.norkart.no/takflater/v2/matrikkel/${kommunenummer}/${gnr}/${bnr}`,
        {
          headers: { 'X-WAAPI-TOKEN': NORKART_API_KEY },
          signal: AbortSignal.timeout(10000),
        }
      )
      if (norkartRes.ok) {
        takflaterData = await norkartRes.json()

        const flater = takflaterData?.takflater || takflaterData?.features || []
        const totalAreal = flater.reduce((s: number, f: any) => s + (f.properties?.areal || f.areal || 0), 0)
        const egnetAreal = flater
          .filter((f: any) => {
            const retning = f.properties?.himmelretning || f.himmelretning || ''
            const helning = f.properties?.helning || f.helning || 0
            return (retning.includes('S') || retning.includes('SV') || retning.includes('SO')) && helning > 10
          })
          .reduce((s: number, f: any) => s + (f.properties?.areal || f.areal || 0), 0)

        const egnetProsent = totalAreal > 0 ? (egnetAreal / totalAreal) * 100 : 0

        if (egnetProsent > 60) solcelleEgnethet = 'svært høy'
        else if (egnetProsent > 40) solcelleEgnethet = 'høy'
        else if (egnetProsent > 20) solcelleEgnethet = 'middels'
        else if (egnetProsent >= 0) solcelleEgnethet = 'lav'

        const antFlater = flater.length
        const retninger = [...new Set(flater.map((f: any) => f.properties?.himmelretning || f.himmelretning).filter(Boolean))]

        takflateSummary = `${antFlater} takflater analysert. Egnet areal for solceller (sørvendt, helning >10°): ca. ${Math.round(egnetAreal)} m² av totalt ${Math.round(totalAreal)} m².`
        if (retninger.length > 0) {
          takflateSummary += ` Takretninger: ${retninger.join(', ')}.`
        }
      }
    } catch {}
  }

  // ── Sol-vurdering for tomten ──
  const sommertimer = (dagslengder.juni + dagslengder.juli + dagslengder.mai) / 3
  const vintertimer = (dagslengder.desember + dagslengder.januar + dagslengder.november) / 3

  let solkarakter = ''
  let solForhold = ''

  if (lat < 57.5) {
    solkarakter = 'Sør-Norge — gode solforhold'
    solForhold = 'Sør-Norge har de beste solforholdene med opptil 17–18 timers dagslys om sommeren og over 6 timer om vinteren.'
  } else if (lat < 60) {
    solkarakter = 'Sørvest/Østlandet — gode solforhold'
    solForhold = 'Området har gode solforhold med lange sommerdager og moderate vinterdager.'
  } else if (lat < 63) {
    solkarakter = 'Midt-Norge — moderate solforhold'
    solForhold = 'Moderate solforhold. Gode sommerdager, men kortere vinterdager og mer skydekke.'
  } else if (lat < 66.5) {
    solkarakter = 'Nord-Norge — varierende solforhold'
    solForhold = 'Arktisk klima med ekstreme variasjoner: lange lyse sommeternetter og korte, mørke vinterdager.'
  } else {
    solkarakter = 'Polarsirkelen — midnattsol og polarnatt'
    solForhold = `Tomten er nord for polarsirkelen. Midnattsol: ${midnattsol.join(', ')}. Polarnatt: ${polarnatt.join(', ')}.`
  }

  // ── Solcellpotensial estimat ──
  let solcelleKwh: number | null = null
  if (takflaterData) {
    // Grov estimering: 150 kWh/m²/år for sørvendt takflate i Norge
    const flater = takflaterData?.takflater || takflaterData?.features || []
    const egnetAreal = flater
      .filter((f: any) => {
        const retning = f.properties?.himmelretning || f.himmelretning || ''
        return retning.includes('S') || retning.includes('SV') || retning.includes('SO')
      })
      .reduce((s: number, f: any) => s + (f.properties?.areal || f.areal || 0), 0)
    if (egnetAreal > 0) {
      const kwhFaktor = lat < 58 ? 150 : lat < 62 ? 120 : lat < 66 ? 90 : 70
      solcelleKwh = Math.round(egnetAreal * kwhFaktor)
    }
  }

  return NextResponse.json({
    lat, lng,
    breddegradssone: solkarakter,
    solforhold: solForhold,
    dagslengder,
    polarnatt: polarnatt.length > 0 ? polarnatt : null,
    midnattsol: midnattsol.length > 0 ? midnattsol : null,
    statistikk: {
      gjennomssnittSommerTimer: Math.round(sommertimer * 10) / 10,
      gjennomsnittVinterTimer: Math.round(vintertimer * 10) / 10,
      arligSolrekkevidde: `${Math.round(vintertimer * 10) / 10}–${Math.round(sommertimer * 10) / 10} timer dagslys`,
    },
    takflater: takflaterData ? {
      tilgjengelig: true,
      sammendrag: takflateSummary,
      solcelleEgnethet,
      estimertAarligProduksjonKwh: solcelleKwh,
      merknad: solcelleKwh ? `Estimert solcelleproduksjon ca. ${solcelleKwh?.toLocaleString('no')} kWh/år på egnet takflate. En gjennomsnittlig norsk husstand bruker ca. 20 000 kWh/år.` : null,
    } : {
      tilgjengelig: false,
      merknad: 'Norkart takflate-analyse krever at det allerede finnes en bygning på tomten.',
    },
    relevansForKjoeper: 'Gode solforhold øker trivselen og kan spare energikostnader. Sørvendte tomter og takflater egner seg best for solceller og passiv solvarme.',
  })
}
