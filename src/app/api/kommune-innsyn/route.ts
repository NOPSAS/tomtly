import { NextRequest, NextResponse } from 'next/server'

// Søker i kommunale innsynsløsninger etter byggesaker for en eiendom
// POST { kommunenummer, gnr, bnr, adresse }

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  Accept: 'text/html,application/xhtml+xml,*/*',
  'Accept-Language': 'nb-NO,nb;q=0.9',
}

interface InnsynKilde {
  kommune: string
  system: string
  url: string
  sokeUrl: (gnr: number, bnr: number, adresse: string) => string
}

// Kjente innsynsløsninger per kommune
const INNSYN_KILDER: Record<string, InnsynKilde[]> = {
  // Oslo
  '0301': [{
    kommune: 'Oslo',
    system: 'PBE Saksinnsyn',
    url: 'https://innsyn.pbe.oslo.kommune.no/saksinnsyn',
    sokeUrl: (gnr, bnr) => `https://innsyn.pbe.oslo.kommune.no/saksinnsyn/caseList.asp?text=${gnr}/${bnr}`,
  }],
  // Bærum
  '3024': [{
    kommune: 'Bærum',
    system: 'ACOS Innsynpluss',
    url: 'https://innsynpluss.onacos.no/baerum/Byggesak/Liste',
    sokeUrl: (gnr, bnr) => `https://innsynpluss.onacos.no/baerum/Byggesak/Liste?s=${gnr}/${bnr}`,
  }],
  // Asker
  '3025': [{
    kommune: 'Asker',
    system: 'Innsynsportal',
    url: 'https://asker-bygg.innsynsportal.no',
    sokeUrl: (gnr, bnr) => `https://asker-bygg.innsynsportal.no/postjournal-v2/d3aab42c-a204-438d-8e99-5189ae2ff468?query=${gnr}/${bnr}`,
  }],
  // Nesodden
  '3212': [{
    kommune: 'Nesodden',
    system: 'Elements Publikum',
    url: 'https://prod02.elementscloud.no/publikum/944383565_PROD-944383565',
    sokeUrl: (gnr, bnr) => `https://prod02.elementscloud.no/publikum/944383565_PROD-944383565`,
  }],
  // Frogn
  '3214': [{
    kommune: 'Frogn',
    system: '360online',
    url: 'https://frogn.pj.360online.com',
    sokeUrl: (gnr, bnr) => `https://frogn.pj.360online.com/Journal/Search?searchString=${gnr}/${bnr}`,
  }],
  // Nordre Follo
  '3020': [{
    kommune: 'Nordre Follo',
    system: '360online',
    url: 'https://nordre-follo.pj.360online.com',
    sokeUrl: (gnr, bnr) => `https://nordre-follo.pj.360online.com/Journal/Search?searchString=${gnr}/${bnr}`,
  }],
  // Vestby
  '3019': [{
    kommune: 'Vestby',
    system: '360online',
    url: 'https://vestby.pj.360online.com',
    sokeUrl: (gnr, bnr) => `https://vestby.pj.360online.com/Journal/Search?searchString=${gnr}/${bnr}`,
  }],
  // Drammen
  '3005': [{
    kommune: 'Drammen',
    system: 'innsyn2020',
    url: 'https://innsyn2020.drammen.kommune.no/byggsak',
    sokeUrl: (gnr, bnr) => `https://innsyn2020.drammen.kommune.no/byggsak?s=${gnr}/${bnr}`,
  }],
  // Lillestrøm
  '3030': [{
    kommune: 'Lillestrøm',
    system: 'OpenGov 360',
    url: 'https://opengov.360online.com/Cases/LILLESTROM',
    sokeUrl: (gnr, bnr) => `https://opengov.360online.com/Cases/LILLESTROM?casetypeid=99001&SearchString=${gnr}/${bnr}`,
  }],
  // Kristiansand
  '4204': [{
    kommune: 'Kristiansand',
    system: 'OpenGov 360',
    url: 'https://opengov.360online.com/Cases/KRSANDEBYGG',
    sokeUrl: (gnr, bnr) => `https://opengov.360online.com/Cases/KRSANDEBYGG?casetypeid=99001&SearchString=${gnr}/${bnr}`,
  }],
  // Fredrikstad
  '3124': [{
    kommune: 'Fredrikstad',
    system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/940039541',
    sokeUrl: (gnr, bnr) => `https://prod01.elementscloud.no/Publikum/940039541`,
  }],
  // Sarpsborg
  '3122': [{
    kommune: 'Sarpsborg',
    system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/938801363',
    sokeUrl: (gnr, bnr) => `https://prod01.elementscloud.no/Publikum/938801363`,
  }],
  // Halden
  '3101': [{
    kommune: 'Halden',
    system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/959159092',
    sokeUrl: (gnr, bnr) => `https://prod01.elementscloud.no/Publikum/959159092`,
  }],
  // Moss
  '3120': [{
    kommune: 'Moss',
    system: 'Kommune-nettside',
    url: 'https://www.moss.kommune.no/alle-tjenester/innsyn/postliste-og-saksinnsyn/',
    sokeUrl: (gnr, bnr) => `https://www.moss.kommune.no/alle-tjenester/innsyn/postliste-og-saksinnsyn/`,
  }],
  // Nittedal
  '3221': [{
    kommune: 'Nittedal',
    system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/964949581',
    sokeUrl: (gnr, bnr) => `https://prod01.elementscloud.no/Publikum/964949581`,
  }],
  // Kongsberg
  '3006': [{
    kommune: 'Kongsberg',
    system: 'Elements Publikum',
    url: 'https://prod02.elementscloud.no/publikum/942402465_PROD-942402465',
    sokeUrl: (gnr, bnr) => `https://prod02.elementscloud.no/publikum/942402465_PROD-942402465`,
  }],
}

interface InnsynResult {
  kommune: string
  system: string
  url: string
  sokeUrl: string
  tilgjengelig: boolean
  saker: { tittel: string; dato?: string; saksnr?: string }[]
}

async function scrapeInnsyn(kilde: InnsynKilde, gnr: number, bnr: number, adresse: string): Promise<InnsynResult> {
  const sokeUrl = kilde.sokeUrl(gnr, bnr, adresse)
  const result: InnsynResult = {
    kommune: kilde.kommune,
    system: kilde.system,
    url: kilde.url,
    sokeUrl,
    tilgjengelig: true,
    saker: [],
  }

  try {
    const res = await fetch(sokeUrl, { headers: HEADERS, signal: AbortSignal.timeout(10000) })
    if (!res.ok) { result.tilgjengelig = false; return result }
    const html = await res.text()

    // Sjekk om det er en JavaScript SPA (Elements, ACOS etc)
    if (html.includes('You need to enable JavaScript') || html.length < 500) {
      // SPA-basert innsyn - kan ikke scrape server-side
      result.saker = []
      return result
    }

    // Prøv å finne saker i HTML
    // Generisk: se etter gnr/bnr-referanser
    const gnrBnrPattern = new RegExp(`${gnr}[/\\s]+${bnr}`, 'gi')
    const lines = html.split('\n')
    for (const line of lines) {
      if (gnrBnrPattern.test(line)) {
        const clean = line.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
        if (clean.length > 10 && clean.length < 300) {
          // Extract case number pattern
          const caseMatch = clean.match(/(\d{4}\/\d{3,6})/)
          result.saker.push({
            tittel: clean.substring(0, 200),
            saksnr: caseMatch?.[1],
          })
        }
      }
    }
  } catch {
    result.tilgjengelig = false
  }

  return result
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}

  const { kommunenummer, gnr, bnr, adresse } = body
  if (!kommunenummer || !gnr || !bnr) {
    return NextResponse.json({ error: 'kommunenummer, gnr og bnr er påkrevd' }, { status: 400 })
  }

  const kilder = INNSYN_KILDER[kommunenummer] || []

  if (kilder.length === 0) {
    return NextResponse.json({
      success: true,
      kommunenummer,
      gnr, bnr,
      kilder: [],
      melding: 'Ingen kjente innsynsløsninger for denne kommunen. Du kan søke direkte på kommunens nettside.',
    })
  }

  const resultater = await Promise.allSettled(
    kilder.map(k => scrapeInnsyn(k, gnr, bnr, adresse || ''))
  )

  const innsynResultater = resultater
    .filter(r => r.status === 'fulfilled')
    .map(r => (r as PromiseFulfilledResult<InnsynResult>).value)

  return NextResponse.json({
    success: true,
    kommunenummer,
    gnr, bnr,
    kilder: innsynResultater,
  })
}
