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

// Innsynsløsninger med 2024 kommunenumre
const INNSYN_KILDER: Record<string, InnsynKilde[]> = {
  // ── Oslo ──
  '0301': [{
    kommune: 'Oslo', system: 'PBE Saksinnsyn',
    url: 'https://innsyn.pbe.oslo.kommune.no/saksinnsyn',
    sokeUrl: (gnr, bnr) => `https://innsyn.pbe.oslo.kommune.no/saksinnsyn/caseList.asp?text=${gnr}/${bnr}`,
  }],

  // ── Akershus ──
  '3201': [{
    kommune: 'Bærum', system: 'ACOS Innsynpluss',
    url: 'https://innsynpluss.onacos.no/baerum/Byggesak/Liste',
    sokeUrl: (gnr, bnr) => `https://innsynpluss.onacos.no/baerum/Byggesak/Liste?s=${gnr}/${bnr}`,
  }],
  '3203': [{
    kommune: 'Asker', system: 'Innsynsportal',
    url: 'https://asker-bygg.innsynsportal.no',
    sokeUrl: (gnr, bnr, adresse) => `https://asker-bygg.innsynsportal.no/postjournal-v2/d3aab42c-a204-438d-8e99-5189ae2ff468?query=${gnr}/${bnr}&params=${encodeURIComponent(JSON.stringify({search: adresse}))}`,
  }],
  '3207': [{
    kommune: 'Nordre Follo', system: '360online',
    url: 'https://nordre-follo.pj.360online.com',
    sokeUrl: (gnr, bnr) => `https://nordre-follo.pj.360online.com/Journal/Search?searchString=${gnr}/${bnr}`,
  }],
  '3216': [{
    kommune: 'Vestby', system: '360online',
    url: 'https://vestby.pj.360online.com',
    sokeUrl: (gnr, bnr) => `https://vestby.pj.360online.com/Journal/Search?searchString=${gnr}/${bnr}`,
  }],
  '3212': [
    {
      kommune: 'Nesodden', system: 'Elements Publikum (2024–)',
      url: 'https://prod02.elementscloud.no/publikum/944383565_PROD-944383565',
      sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod02.elementscloud.no/publikum/944383565_PROD-944383565/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1&DateFrom=2024-05-01&DateTo=2026-12-31`,
    },
    {
      kommune: 'Nesodden', system: 'Elements Publikum (2023–2025)',
      url: 'https://prod02.elementscloud.no/publikum/944383565_HIST-944383565-1725',
      sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod02.elementscloud.no/publikum/944383565_HIST-944383565-1725/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1&DateFrom=2018-01-01&DateTo=2025-03-31`,
    },
    {
      kommune: 'Nesodden', system: 'Elements Publikum (2018–2023)',
      url: 'https://prod02.elementscloud.no/publikum/944383565_HIST-944383565-0723',
      sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod02.elementscloud.no/publikum/944383565_HIST-944383565-0723/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1&DateFrom=2018-01-01&DateTo=2023-12-31`,
    },
  ],
  '3214': [{
    kommune: 'Frogn', system: '360online',
    url: 'https://frogn.pj.360online.com',
    sokeUrl: (gnr, bnr) => `https://frogn.pj.360online.com/Journal/Search?searchString=${gnr}/${bnr}`,
  }],
  '3232': [{
    kommune: 'Nittedal', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/964949581',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/964949581/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3205': [{
    kommune: 'Lillestrøm', system: 'OpenGov 360',
    url: 'https://opengov.360online.com/Cases/LILLESTROM',
    sokeUrl: (gnr, bnr) => `https://opengov.360online.com/Cases/LILLESTROM?casetypeid=99001&SearchString=${gnr}/${bnr}`,
  }],
  '3209': [{
    kommune: 'Ullensaker', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/952540556',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/952540556/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3230': [{
    kommune: 'Gjerdrum', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/964949581',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/964949581/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3222': [{
    kommune: 'Lørenskog', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/952540556',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/952540556/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3223': [{
    kommune: 'Rælingen', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/952540556',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/952540556/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3218': [{
    kommune: 'Ås', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/964949581',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/964949581/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3220': [{
    kommune: 'Enebakk', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/964949581',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/964949581/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3237': [{
    kommune: 'Eidsvoll', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/964949581',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/964949581/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],

  // ── Buskerud ──
  '3301': [{
    kommune: 'Drammen', system: 'innsyn2020',
    url: 'https://innsyn2020.drammen.kommune.no/byggsak',
    sokeUrl: (gnr, bnr) => `https://innsyn2020.drammen.kommune.no/byggsak?s=${gnr}/${bnr}`,
  }],
  '3303': [{
    kommune: 'Kongsberg', system: 'Elements Publikum',
    url: 'https://prod02.elementscloud.no/publikum/942402465_PROD-942402465',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod02.elementscloud.no/publikum/942402465_PROD-942402465/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3305': [{
    kommune: 'Ringerike', system: 'Elements Publikum',
    url: 'https://prod02.elementscloud.no/publikum/942402465_PROD-942402465',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod02.elementscloud.no/publikum/942402465_PROD-942402465/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],

  // ── Østfold ──
  '3101': [{
    kommune: 'Halden', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/959159092',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/959159092/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3103': [{
    kommune: 'Moss', system: 'Kommune-nettside',
    url: 'https://www.moss.kommune.no/alle-tjenester/innsyn/postliste-og-saksinnsyn/',
    sokeUrl: () => `https://www.moss.kommune.no/alle-tjenester/innsyn/postliste-og-saksinnsyn/`,
  }],
  '3105': [{
    kommune: 'Sarpsborg', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/938801363',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/938801363/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3107': [{
    kommune: 'Fredrikstad', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/940039541',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/940039541/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],

  // ── Vestfold ──
  '3901': [{
    kommune: 'Horten', system: 'ACOS',
    url: 'https://www.horten.kommune.no/politikk-og-administrasjon/innsyn-og-offentlighet/',
    sokeUrl: () => `https://www.horten.kommune.no/politikk-og-administrasjon/innsyn-og-offentlighet/`,
  }],
  '3905': [{
    kommune: 'Tønsberg', system: 'Kommune-nettside',
    url: 'https://www.tonsberg.kommune.no/tjenester/innsyn/sok-i-postlister-saker-og-dokumenter/',
    sokeUrl: () => `https://www.tonsberg.kommune.no/tjenester/innsyn/sok-i-postlister-saker-og-dokumenter/`,
  }],
  '3907': [{
    kommune: 'Sandefjord', system: 'Kommune-nettside',
    url: 'https://www.sandefjord.kommune.no/engasjer-deg/innsyn-og-apenhet/sok-etter-saker-og-dokumenter/',
    sokeUrl: () => `https://www.sandefjord.kommune.no/engasjer-deg/innsyn-og-apenhet/sok-etter-saker-og-dokumenter/`,
  }],
  '3909': [{
    kommune: 'Larvik', system: 'ACOS Innsynpluss',
    url: 'https://innsynpluss.onacos.no/larvik/sok/',
    sokeUrl: (gnr, bnr) => `https://innsynpluss.onacos.no/larvik/sok/?response=arkivsak_sok_tomdefault&text=${gnr}/${bnr}`,
  }],

  // ── Agder ──
  '4204': [{
    kommune: 'Kristiansand', system: 'OpenGov 360',
    url: 'https://opengov.360online.com/Cases/KRSANDEBYGG',
    sokeUrl: (gnr, bnr) => `https://opengov.360online.com/Cases/KRSANDEBYGG?casetypeid=99001&SearchString=${gnr}/${bnr}`,
  }],
  '4203': [{
    kommune: 'Arendal', system: 'eInnsyn',
    url: 'https://einnsyn.no/sok?f=485c466e-4327-4b8e-b376-128823e01d23',
    sokeUrl: (gnr, bnr) => `https://einnsyn.no/sok?f=485c466e-4327-4b8e-b376-128823e01d23&q=${gnr}/${bnr}`,
  }],

  // ── Vestland ──
  '4601': [{
    kommune: 'Bergen', system: 'Saksinnsyn',
    url: 'https://www.bergen.kommune.no/omkommunen/offentlig-innsyn/innsynplanogbyggesak/saksinnsyn',
    sokeUrl: (gnr, bnr) => `https://www.bergen.kommune.no/omkommunen/offentlig-innsyn/innsynplanogbyggesak/saksinnsyn`,
  }],

  // ── Rogaland ──
  '1103': [{
    kommune: 'Stavanger', system: 'eInnsyn',
    url: 'https://einnsyn.no/sok?f=380d076e-a561-417c-ba17-4fc731f3384d',
    sokeUrl: (gnr, bnr) => `https://einnsyn.no/sok?f=380d076e-a561-417c-ba17-4fc731f3384d&q=${gnr}/${bnr}`,
  }],
  '1108': [{
    kommune: 'Sandnes', system: 'Elements Publikum',
    url: 'https://prod01.elementscloud.no/Publikum/964965226',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod01.elementscloud.no/Publikum/964965226/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],

  // ── Trøndelag ──
  '5001': [{
    kommune: 'Trondheim', system: 'Innsynsportal',
    url: 'https://trondheim.innsynsportal.no',
    sokeUrl: (gnr, bnr, adresse) => `https://trondheim.innsynsportal.no/postjournal-v2/fc010204-2c07-4f3c-a8ef-879ec218111c?query=${gnr}/${bnr}&params=${encodeURIComponent(JSON.stringify({search: adresse}))}`,
  }],

  // ── Troms ──
  '5501': [{
    kommune: 'Tromsø', system: 'Byggsak innsyn',
    url: 'https://innsyn.tromso.kommune.no/byggsak',
    sokeUrl: (gnr, bnr) => `https://innsyn.tromso.kommune.no/byggsak?s=${gnr}/${bnr}`,
  }],

  // ── Innlandet ──
  '3403': [{
    kommune: 'Hamar', system: 'Elements Publikum',
    url: 'https://prod02.elementscloud.no/publikum/970540008_PROD-970540008',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod02.elementscloud.no/publikum/970540008_PROD-970540008/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],
  '3405': [{
    kommune: 'Lillehammer', system: 'Elements Publikum',
    url: 'https://prod02.elementscloud.no/publikum/945578564_PROD-945578564',
    sokeUrl: (gnr: number, bnr: number, adresse: string) => `https://prod02.elementscloud.no/publikum/945578564_PROD-945578564/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
  }],

  // ── Telemark ──
  '3807': [{
    kommune: 'Skien', system: 'Kommune-nettside',
    url: 'https://www.skien.kommune.no/tjenester/bygg-og-eiendom/',
    sokeUrl: () => `https://www.skien.kommune.no/tjenester/bygg-og-eiendom/`,
  }],
  '3806': [{
    kommune: 'Porsgrunn', system: 'Kommune-nettside',
    url: 'https://www.porsgrunn.kommune.no/tjenester/bygg-og-eiendom/',
    sokeUrl: () => `https://www.porsgrunn.kommune.no/tjenester/bygg-og-eiendom/`,
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

    if (html.includes('You need to enable JavaScript') || html.length < 500) {
      return result
    }

    const gnrBnrPattern = new RegExp(`${gnr}[/\\s]+${bnr}`, 'gi')
    const lines = html.split('\n')
    for (const line of lines) {
      if (gnrBnrPattern.test(line)) {
        const clean = line.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
        if (clean.length > 10 && clean.length < 300) {
          const caseMatch = clean.match(/(\d{4}\/\d{3,6})/)
          result.saker.push({ tittel: clean.substring(0, 200), saksnr: caseMatch?.[1] })
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
      kommunenummer, gnr, bnr,
      kilder: [],
      melding: 'Ingen kjente innsynsløsninger for denne kommunen. Søk direkte på kommunens nettside.',
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
    kommunenummer, gnr, bnr,
    kilder: innsynResultater,
  })
}
