import { NextRequest, NextResponse } from 'next/server'

// Oslo PBE "Hva gjelder" – henter reguleringsdata for en eiendom i Oslo
// POST { gnr, bnr }
// Kilde: od2.pbe.oslo.kommune.no/hvagjelder/

const PBE_API = 'https://od2.pbe.oslo.kommune.no/tomcat8/HvaGjelder4.0/hvaGjelder'

interface HvaGjelderPlan {
  navn: string
  planid: number
  tittel: string
  ikraft: string
  formaal: string[]
  boligformaal?: { bolig: boolean; annet: boolean }
  byggegrenser: boolean
}

interface HvaGjelderResponse {
  treff: boolean
  planer?: HvaGjelderPlan[]
  kommunedelplaner?: { Beskrivelse: string; Plannavn: string }[]
  kulturminner?: boolean
  kulturminneStatuser?: string[]
  funnpotensial?: string
  elveflom?: boolean
  stormflo?: boolean
  kvikkleire?: boolean
  steinsprang?: boolean
  marinGrense?: boolean
  marka?: boolean
  hoyspent?: boolean
  fjernvarme?: boolean
  storulykke?: boolean
  annenFare?: boolean
  vegkategori?: Record<string, boolean>
  stoy?: Record<string, unknown>
  vann?: {
    lukkedeBekkerOgElver: boolean
    prinsipptrase: boolean
    aapentVann: { kontur: boolean; innsjo: boolean; elvbekk: boolean }
  }
  dreneringslinjer?: Record<string, boolean>
  error?: Record<string, string>
}

// Strukturer resultat for visning
function formatResult(data: HvaGjelderResponse) {
  const result: {
    reguleringsplaner: { navn: string; tittel: string; ikraft: string; formaal: string[]; harBolig: boolean; harByggegrenser: boolean }[]
    kommunedelplaner: { navn: string; beskrivelse: string }[]
    risiko: { kategori: string; status: 'fare' | 'ok' | 'ukjent'; beskrivelse: string }[]
    infrastruktur: { kategori: string; verdi: string }[]
    pbeUrl: string
  } = {
    reguleringsplaner: [],
    kommunedelplaner: [],
    risiko: [],
    infrastruktur: [],
    pbeUrl: '',
  }

  // Reguleringsplaner
  if (data.planer) {
    result.reguleringsplaner = data.planer.map(p => ({
      navn: p.navn,
      tittel: p.tittel?.trim() || '',
      ikraft: p.ikraft || '',
      formaal: p.formaal || [],
      harBolig: p.boligformaal?.bolig || false,
      harByggegrenser: p.byggegrenser || false,
    }))
  }

  // Kommunedelplaner
  if (data.kommunedelplaner) {
    result.kommunedelplaner = data.kommunedelplaner.map(k => ({
      navn: k.Plannavn || '',
      beskrivelse: k.Beskrivelse || '',
    }))
  }

  // Risikofaktorer
  const risikoMap: [string, keyof HvaGjelderResponse, string][] = [
    ['Elveflom', 'elveflom', 'Eiendommen ligger i flomsone'],
    ['Stormflo', 'stormflo', 'Fare for stormflo'],
    ['Kvikkleire', 'kvikkleire', 'Kvikkleiresone i området'],
    ['Steinsprang', 'steinsprang', 'Fare for steinsprang'],
    ['Marin grense', 'marinGrense', 'Under marin grense'],
    ['Høyspent', 'hoyspent', 'Nær høyspenttrasé'],
    ['Storulykke', 'storulykke', 'I influensområde for storulykke'],
    ['Marka', 'marka', 'Eiendommen ligger i Marka'],
    ['Kulturminner', 'kulturminner', 'Kulturminner registrert på eiendommen'],
  ]

  for (const [kategori, key, beskrivelse] of risikoMap) {
    const val = data[key]
    if (val === true) {
      result.risiko.push({ kategori, status: 'fare', beskrivelse })
    } else if (val === false) {
      result.risiko.push({ kategori, status: 'ok', beskrivelse: `Ingen registrering` })
    }
  }

  // Funnpotensial (arkeologi)
  if (data.funnpotensial && data.funnpotensial !== '') {
    result.risiko.push({
      kategori: 'Arkeologi',
      status: 'fare',
      beskrivelse: `Funnpotensial: ${data.funnpotensial}`,
    })
  }

  // Fjernvarme
  if (data.fjernvarme) {
    result.infrastruktur.push({ kategori: 'Fjernvarme', verdi: 'Tilgjengelig i området' })
  }

  // Vei
  if (data.vegkategori) {
    const veier = Object.entries(data.vegkategori)
      .filter(([, v]) => v)
      .map(([k]) => {
        const labels: Record<string, string> = { E: 'Europavei', R: 'Riksvei', K: 'Kommunal vei', P: 'Privat vei', S: 'Skogsbilvei' }
        return labels[k] || k
      })
    if (veier.length > 0) {
      result.infrastruktur.push({ kategori: 'Veikategori', verdi: veier.join(', ') })
    }
  }

  // VA
  if (data.vann) {
    const vaStatus: string[] = []
    if (data.vann.lukkedeBekkerOgElver) vaStatus.push('Lukket bekk/elv')
    if (data.vann.prinsipptrase) vaStatus.push('Prinsipptrasé VA')
    if (data.vann.aapentVann?.elvbekk) vaStatus.push('Åpent vann (bekk/elv)')
    if (data.vann.aapentVann?.innsjo) vaStatus.push('Innsjø')
    if (vaStatus.length > 0) {
      result.infrastruktur.push({ kategori: 'Vann/avløp', verdi: vaStatus.join(', ') })
    }
  }

  // Småhusplan-info dersom eiendommen er omfattet av S-4220
  const erSmahusplan = data.planer?.some(p =>
    p.navn?.includes('S-4220') || p.navn?.includes('S-5190') ||
    p.tittel?.toLowerCase().includes('småhus')
  )

  if (erSmahusplan) {
    result.reguleringsplaner = result.reguleringsplaner // beholdes som de er
    ;(result as any).smahusplan = {
      omfattet: true,
      status: 'Midlertidig forbud mot tiltak (MFT) gjelder',
      oppsummering: [
        'Eiendommen er omfattet av reguleringsplan for småhusområder i Oslos ytre by (S-4220).',
        'Bystyret vedtok ny småhusplan (S-5190) i september 2023, men den er IKKE rettskraftig — KDD vedtok 14. oktober 2025 å ikke godkjenne planen pga. NVE-innsigelse om manglende flom/skred-utredning.',
        'Det gjelder et midlertidig forbud mot tiltak (MFT) frem til 1. juni 2026, med varslet forlengelse til 31. desember 2026.',
      ],
      vedtatteRegler: {
        tittel: 'Vedtatte bestemmelser (bystyret sept. 2023 – ikke rettskraftig)',
        punkter: [
          'Maks 18 %-BYA (16 % for A- og B-områder)',
          'Gesimshøyde maks 7,0 m, mønehøyde maks 9,0 m',
          'Pulttak: høyeste gesims 7,5 m, laveste 6,5 m',
          'Flatt tak: gesimshøyde maks 7,0 m',
          'Enebolig: min. 600 m² tomt per hovedboenhet',
          'To-/tre-/firemannsbolig: min. 400 m² per boenhet',
          '1 sekundærleilighet per hovedboenhet (maks 55 m² BRA, maks 50 % av hovedboenhetens BRA)',
          'Min. 60 % grøntareal, min. 50 % fritt for terrenginngrep',
          'Store trær skal bevares (stammeomkrets >90 cm, eik >60 cm)',
          'Uteoppholdsareal: min. 100 m² per hovedboenhet, 35 m² per sekundærleilighet',
          'Min. 5 m avstand til regulert veikant',
          'Fossilfri bygge- og anleggsplass påkrevd',
        ],
      },
      mft: {
        tittel: 'Midlertidig forbud mot tiltak (MFT)',
        status: 'Gjelder frem til 1. juni 2026, varslet forlenget til 31. desember 2026',
        unntak: [
          'Innvendige ombygninger og bruksendringer',
          'Fasadeendringer som ikke påvirker utnyttelse',
          'Påbygg og tilbygg innenfor tillatt utnyttelse',
          'Mindre garasjer på terreng, boder, støttemurer',
          'Oppføring av nye boenheter dersom tomtestørrelse per boenhet oppfylles',
        ],
        alltidForbudt: [
          'Felling av store trær',
          'Parkering under terreng',
        ],
        forslagteEndringerVedForlengelse: [
          'Tomtekrav nye boenheter i flermannsbolig reduseres fra 450 til 400 m²',
          'Terrenginngrep kan utføres på opptil 50 % av tomten (opp fra 40 %)',
          'Firemannsboliger + sekundærleilighet tillates',
          'Sammenslåing av boenheter tillates (ikke kun oppdeling)',
          'Gjenoppføring av enebolig uten minstekrav til tomtestørrelse',
        ],
      },
    }
  }

  return result
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {}
  try { body = await request.json() } catch {}

  const gnr = Number(body.gnr) || 0
  const bnr = Number(body.bnr) || 0

  if (!gnr || !bnr) {
    return NextResponse.json({ error: 'gnr og bnr er påkrevd' }, { status: 400 })
  }

  try {
    const url = `${PBE_API}?gnr=${gnr}&bnr=${bnr}`
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) })

    if (!res.ok) {
      return NextResponse.json({ error: `PBE API feil: ${res.status}` }, { status: 502 })
    }

    const data: HvaGjelderResponse = await res.json()

    if (!data.treff) {
      return NextResponse.json({
        success: true,
        treff: false,
        melding: 'Ingen data funnet for denne eiendommen i Oslo PBE.',
      })
    }

    const formatted = formatResult(data)
    formatted.pbeUrl = `https://od2.pbe.oslo.kommune.no/hvagjelder/#${gnr}/${bnr}`

    return NextResponse.json({
      success: true,
      treff: true,
      ...formatted,
      raw: data, // for debugging / fremtidig bruk
    })
  } catch (err) {
    return NextResponse.json({ error: 'Kunne ikke nå Oslo PBE' }, { status: 502 })
  }
}
