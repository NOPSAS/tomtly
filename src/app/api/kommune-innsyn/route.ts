import { NextRequest, NextResponse } from 'next/server'

// Søker i kommunale innsynsløsninger etter byggesaker for en eiendom
// POST { kommunenummer, gnr, bnr, adresse }
//
// Dekker ~80 kommuner med parameterisert søk.
// Systemer: Elements Publikum, ACOS Innsynpluss, 360online, eInnsyn, PBE, m.fl.

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

// ── Hjelpefunksjoner for URL-bygging ──────────────────────────────────────

/** Elements Publikum – SPA, søker på adressetekst */
const elements = (kommune: string, baseUrl: string): InnsynKilde => ({
  kommune, system: 'Elements Publikum', url: baseUrl,
  sokeUrl: (_gnr, _bnr, adresse) =>
    `${baseUrl}/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1`,
})

/** Elements Publikum – søker på gnr/bnr */
const elementsGnr = (kommune: string, baseUrl: string): InnsynKilde => ({
  kommune, system: 'Elements Publikum', url: baseUrl,
  sokeUrl: (gnr, bnr) => `${baseUrl}/Search?Query=${gnr}/${bnr}`,
})

/** 360online – server-side HTML, best for scraping */
const p360 = (kommune: string, slug: string): InnsynKilde => ({
  kommune, system: '360online', url: `https://${slug}.pj.360online.com`,
  sokeUrl: (gnr, bnr) =>
    `https://${slug}.pj.360online.com/Journal/Search?searchString=${gnr}/${bnr}`,
})

/** OpenGov 360 – byggesaker */
const opengov = (kommune: string, slug: string): InnsynKilde => ({
  kommune, system: 'OpenGov 360', url: `https://opengov.360online.com/Cases/${slug}`,
  sokeUrl: (gnr, bnr) =>
    `https://opengov.360online.com/Cases/${slug}?casetypeid=99001&SearchString=${gnr}/${bnr}`,
})

/** ACOS Innsynpluss – noen krever innlogging, testes først */
const acos = (kommune: string, slug: string): InnsynKilde => ({
  kommune, system: 'ACOS Innsynpluss', url: `https://innsynpluss.onacos.no/${slug}/sok/`,
  sokeUrl: (gnr, bnr) =>
    `https://innsynpluss.onacos.no/${slug}/sok/?response=arkivsak_sok_tomdefault&text=${gnr}/${bnr}`,
})

/** eInnsyn – med filter-ID for kommunen */
const einnsyn = (kommune: string, filterId: string): InnsynKilde => ({
  kommune, system: 'eInnsyn', url: `https://einnsyn.no/sok?f=${filterId}`,
  sokeUrl: (gnr, bnr) =>
    `https://einnsyn.no/sok?f=${filterId}&q=${gnr}/${bnr}`,
})

/** eInnsyn – uten filter, generelt søk */
const einnsynGeneric = (kommune: string): InnsynKilde => ({
  kommune, system: 'eInnsyn', url: 'https://einnsyn.no/sok',
  sokeUrl: (gnr, bnr, adresse) =>
    `https://einnsyn.no/sok?q=${encodeURIComponent(`"${gnr}/${bnr}" ${adresse}`)}`,
})

// ── Innsynskilder per kommunenummer (2024) ────────────────────────────────
// ~80 kommuner, sortert etter region → kommunenummer

const INNSYN_KILDER: Record<string, InnsynKilde[]> = {

  // ══════════════════════════════════════════════════════════════
  // OSLO
  // ══════════════════════════════════════════════════════════════
  '0301': [{
    kommune: 'Oslo', system: 'PBE Saksinnsyn',
    url: 'https://innsyn.pbe.oslo.kommune.no/saksinnsyn',
    sokeUrl: (gnr, bnr) => `https://innsyn.pbe.oslo.kommune.no/saksinnsyn/main.asp?mode=all&text=${gnr}/${bnr}`,
  }],

  // ══════════════════════════════════════════════════════════════
  // AKERSHUS
  // ══════════════════════════════════════════════════════════════
  '3201': [einnsynGeneric('Bærum')],  // ACOS krever innlogging
  '3203': [{
    kommune: 'Asker', system: 'Innsynsportal',
    url: 'https://asker-bygg.innsynsportal.no',
    sokeUrl: (gnr, bnr, adresse) => `https://asker-bygg.innsynsportal.no/postjournal-v2/d3aab42c-a204-438d-8e99-5189ae2ff468?query=${gnr}/${bnr}&params=${encodeURIComponent(JSON.stringify({search: adresse}))}`,
  }],
  '3205': [opengov('Lillestrøm', 'LILLESTROM')],
  '3207': [p360('Nordre Follo', 'nordre-follo')],
  '3209': [elements('Ullensaker', 'https://prod01.elementscloud.no/Publikum/952540556')],
  '3212': [
    { kommune: 'Nesodden', system: 'Elements Publikum (2024–)', url: 'https://prod02.elementscloud.no/publikum/944383565_PROD-944383565',
      sokeUrl: (_gnr: number, _bnr: number, adresse: string) => `https://prod02.elementscloud.no/publikum/944383565_PROD-944383565/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1&DateFrom=2024-05-01&DateTo=2027-12-31` },
    { kommune: 'Nesodden', system: 'Elements Publikum (2018–2024)', url: 'https://prod02.elementscloud.no/publikum/944383565_HIST-944383565-1725',
      sokeUrl: (_gnr: number, _bnr: number, adresse: string) => `https://prod02.elementscloud.no/publikum/944383565_HIST-944383565-1725/Search?Query=${encodeURIComponent(adresse)}&OrderBy=DATE&SortOrder=1&DateFrom=2018-01-01&DateTo=2025-03-31` },
  ],
  '3214': [p360('Frogn', 'frogn')],
  '3216': [p360('Vestby', 'vestby')],
  '3218': [elements('Ås', 'https://prod01.elementscloud.no/Publikum/964949581')],
  '3220': [elements('Enebakk', 'https://prod01.elementscloud.no/Publikum/964949581')],
  '3222': [elements('Lørenskog', 'https://prod01.elementscloud.no/Publikum/952540556')],
  '3223': [elements('Rælingen', 'https://prod01.elementscloud.no/Publikum/952540556')],
  '3230': [elements('Gjerdrum', 'https://prod01.elementscloud.no/Publikum/964949581')],
  '3232': [elements('Nittedal', 'https://prod01.elementscloud.no/Publikum/964949581')],
  '3237': [elements('Eidsvoll', 'https://prod01.elementscloud.no/Publikum/964949581')],

  // ══════════════════════════════════════════════════════════════
  // ØSTFOLD
  // ══════════════════════════════════════════════════════════════
  '3101': [elements('Halden', 'https://prod01.elementscloud.no/Publikum/959159092')],
  '3103': [einnsyn('Moss', '6f4be08f-dd6d-4fdf-a6fc-1ed9dafe34ab')],
  '3105': [elements('Sarpsborg', 'https://prod01.elementscloud.no/Publikum/938801363')],
  '3107': [elements('Fredrikstad', 'https://prod01.elementscloud.no/Publikum/940039541')],
  '3116': [elements('Rakkestad', 'https://prod02.elementscloud.no/publikum/945372281_PROD-945372281')],
  '3122': [einnsyn('Hvaler', 'd0d76d8a-7315-4a46-b67b-dd6de7552382')],

  // ══════════════════════════════════════════════════════════════
  // BUSKERUD
  // ══════════════════════════════════════════════════════════════
  '3301': [{
    kommune: 'Drammen', system: 'innsyn2020',
    url: 'https://innsyn2020.drammen.kommune.no/byggsak',
    sokeUrl: (gnr, bnr) => `https://innsyn2020.drammen.kommune.no/byggsak?s=${gnr}/${bnr}`,
  }],
  '3303': [elements('Kongsberg', 'https://prod02.elementscloud.no/publikum/942402465_PROD-942402465')],
  '3305': [elements('Ringerike', 'https://prod02.elementscloud.no/publikum/942402465_PROD-942402465')],
  '3312': [elements('Lier', 'https://prod01.elementscloud.no/publikum/857566122_PROD-857566122')],
  '3314': [elements('Øvre Eiker', 'https://prod01.elementscloud.no/publikum/954597482_PROD-954597482')],
  '3316': [acos('Modum', 'modum')],
  '3321': [elementsGnr('Ål', 'https://prod01.elementscloud.no/publikum/864952992')],

  // ══════════════════════════════════════════════════════════════
  // VESTFOLD
  // ══════════════════════════════════════════════════════════════
  '3901': [einnsynGeneric('Horten')],  // ACOS krever innlogging
  '3903': [{
    kommune: 'Holmestrand', system: 'ByggesaksDialog (ISYMap)',
    url: 'https://map.isy.no/?project=holmestrand&application=vestfoldkart&layers=Byggesaker,Godkjente%20byggetiltak&baselayers=gr%C3%A5tonekart',
    sokeUrl: () => `https://map.isy.no/?project=holmestrand&application=vestfoldkart&layers=Byggesaker,Godkjente%20byggetiltak&baselayers=gr%C3%A5tonekart`,
  }],
  '3905': [einnsyn('Tønsberg', 'c11c547b-58f2-40c5-926c-7d0aa5697e98')],
  '3907': [einnsyn('Sandefjord', 'ea97c01d-3d69-410a-bee2-fbdd9fd99aa0')],
  '3909': [acos('Larvik', 'larvik')],
  '3911': [acos('Færder', 'faerder')],

  // ══════════════════════════════════════════════════════════════
  // TELEMARK
  // ══════════════════════════════════════════════════════════════
  '4001': [einnsyn('Porsgrunn', '5dfb8c10-24f2-4f5f-beec-75f58b91c24e')],
  '4003': [einnsyn('Skien', '84a91c1a-27f6-4a75-b04f-cfeea97fe8d7')],
  '4005': [elementsGnr('Notodden', 'https://innsyn.notodden.kommune.no')],
  '4012': [elementsGnr('Bamble', 'https://innsyn.bamble.kommune.no')],
  '4014': [p360('Kragerø', 'kragero')],
  '4016': [p360('Siljan', 'siljan')],
  '4018': [{
    kommune: 'Drangedal', system: '360online', url: 'https://drangedalkommune.pj.360online.com',
    sokeUrl: (gnr, bnr) => `https://drangedalkommune.pj.360online.com/Journal/Search?searchString=${gnr}/${bnr}`,
  }],
  '4024': [elements('Nome', 'https://prod02.elementscloud.no/publikum/938583986_PROD-938583986')],
  '4026': [elements('Tinn', 'https://prod02.elementscloud.no/publikum/864963552_PROD-864963552')],
  '4028': [elements('Vinje', 'https://prod02.elementscloud.no/publikum/964964610_PROD-964964610')],
  '4032': [elements('Kviteseid', 'https://prod02.elementscloud.no/publikum/964963827_PROD-964963827')],
  '4034': [elements('Seljord', 'https://prod02.elementscloud.no/publikum/964963738_PROD-964963738')],
  '4036': [elements('Hjartdal', 'https://prod02.elementscloud.no/publikum/964963649_PROD-964963649')],

  // ══════════════════════════════════════════════════════════════
  // AGDER
  // ══════════════════════════════════════════════════════════════
  '4201': [einnsyn('Risør', '62ab7301-f364-4ed8-b3dc-d9e9a240b389')],
  '4202': [einnsyn('Grimstad', '8d67afae-b29c-48e5-8484-8fd25b0864cb')],
  '4203': [einnsyn('Arendal', '485c466e-4327-4b8e-b376-128823e01d23')],
  '4204': [opengov('Kristiansand', 'KRSANDEBYGG')],
  '4205': [p360('Lindesnes', 'lindesnes')],
  '4206': [p360('Farsund', 'farsund')],
  '4207': [p360('Flekkefjord', 'flekkefjord')],
  '4213': [einnsyn('Tvedestrand', '1d4df5a6-f77f-41ff-a42c-966a4971e010')],
  '4215': [acos('Lillesand', 'lillesand')],
  '4219': [elements('Evje og Hornnes', 'https://prod01.elementscloud.no/publikum/964966109_PROD-964966109')],
  '4223': [einnsyn('Vennesla', 'b153a21b-284b-4724-a613-754fce2896aa')],
  '4225': [acos('Lyngdal', 'lyngdal')],

  // ══════════════════════════════════════════════════════════════
  // ROGALAND
  // ══════════════════════════════════════════════════════════════
  '1103': [einnsyn('Stavanger', '380d076e-a561-417c-ba17-4fc731f3384d')],
  '1106': [elementsGnr('Haugesund', 'https://innsyn.haugesund.kommune.no')],
  '1108': [elements('Sandnes', 'https://prod01.elementscloud.no/Publikum/964965226')],
  '1120': [p360('Klepp', 'klepp')],
  '1122': [p360('Gjesdal', 'gjesdal')],
  '1127': [p360('Randaberg', 'randaberg')],
  '1149': [acos('Karmøy', 'karmoy')],

  // ══════════════════════════════════════════════════════════════
  // VESTLAND
  // ══════════════════════════════════════════════════════════════
  '4601': [einnsyn('Bergen', 'a9cd8dff-4b67-42d8-8ab7-a47e1bd09b5f')],
  '4611': [elements('Bømlo', 'https://prod01.elementscloud.no/publikum/834210622')],
  '4613': [elements('Stord', 'https://prod01.elementscloud.no/publikum/939866914')],
  '4617': [elements('Kvinnherad', 'https://prod01.elementscloud.no/publikum/964967636')],
  '4624': [einnsynGeneric('Bjørnafjorden')],  // ACOS krever innlogging
  '4627': [acos('Askøy', 'askoy')],
  '4631': [elements('Alver', 'https://prod02.elementscloud.no/publikum/920290922_prod-920290922')],
  '4640': [elements('Sogndal', 'https://prod01.elementscloud.no/publikum/922121893')],

  // ══════════════════════════════════════════════════════════════
  // MØRE OG ROMSDAL
  // ══════════════════════════════════════════════════════════════
  '1505': [p360('Kristiansund', 'kristiansund')],
  '1506': [p360('Molde', 'molde')],
  '1508': [elementsGnr('Ålesund', 'https://innsyn.alesund.kommune.no')],
  '1515': [elements('Herøy', 'https://prod01.elementscloud.no/publikum/872417982')],
  '1563': [p360('Sunndal', 'sunndal')],

  // ══════════════════════════════════════════════════════════════
  // INNLANDET
  // ══════════════════════════════════════════════════════════════
  '3401': [opengov('Kongsvinger', 'KONGSVINGER')],
  '3403': [elements('Hamar', 'https://prod02.elementscloud.no/publikum/970540008_PROD-970540008')],
  '3405': [elements('Lillehammer', 'https://prod02.elementscloud.no/publikum/945578564_PROD-945578564')],
  '3407': [elementsGnr('Gjøvik', 'https://innsyn.gjovik.kommune.no')],
  '3411': [einnsynGeneric('Ringsaker')],  // gammelt wfinnsyn-system er dødt
  '3413': [elements('Stange', 'https://prod02.elementscloud.no/publikum/970169717_PROD-970169717')],
  '3415': [opengov('Sør-Odal', 'sor-odal')],
  '3420': [einnsynGeneric('Elverum')],  // ACOS krever innlogging
  '3443': [elements('Vestre Toten', 'https://prod01.elementscloud.no/Publikum/971028300')],

  // ══════════════════════════════════════════════════════════════
  // TRØNDELAG
  // ══════════════════════════════════════════════════════════════
  '5001': [{
    kommune: 'Trondheim', system: 'Innsynsportal',
    url: 'https://trondheim.innsynsportal.no',
    sokeUrl: (gnr, bnr, adresse) => `https://trondheim.innsynsportal.no/postjournal-v2/fc010204-2c07-4f3c-a8ef-879ec218111c?query=${gnr}/${bnr}&params=${encodeURIComponent(JSON.stringify({search: adresse}))}`,
  }],
  '5007': [elements('Namsos', 'https://prod01.elementscloud.no/publikum/942875967')],
  '5028': [elements('Melhus', 'https://prod01.elementscloud.no/publikum/938726027_PROD-938726027-MELHUS')],
  '5038': [elements('Verdal', 'https://prod01.elementscloud.no/publikum/938587418')],

  // ══════════════════════════════════════════════════════════════
  // NORDLAND
  // ══════════════════════════════════════════════════════════════
  '1804': [elementsGnr('Bodø', 'https://innsyn.bodo.kommune.no')],
  '1824': [elements('Vefsn', 'https://prod01.elementscloud.no/publikum/844824122_PROD-844824122')],
  '1833': [elements('Rana', 'https://prod01.elementscloud.no/publikum/872418032_PROD-872418032')],

  // ══════════════════════════════════════════════════════════════
  // TROMS
  // ══════════════════════════════════════════════════════════════
  '5402': [acos('Harstad', 'harstad')],
  '5501': [{
    kommune: 'Tromsø', system: 'Byggsak innsyn',
    url: 'https://innsyn.tromso.kommune.no/byggsak',
    sokeUrl: (gnr, bnr) => `https://innsyn.tromso.kommune.no/byggsak?s=${gnr}/${bnr}`,
  }],

  // ══════════════════════════════════════════════════════════════
  // FINNMARK
  // ══════════════════════════════════════════════════════════════
  '5601': [elements('Alta', 'https://prod02.elementscloud.no/publikum/944588132_PROD-944588132')],
}

// ── Scraping-logikk ───────────────────────────────────────────────────────

interface InnsynResult {
  kommune: string
  system: string
  url: string
  sokeUrl: string
  tilgjengelig: boolean
  saker: { tittel: string; dato?: string; saksnr?: string; url?: string }[]
}

/** Ekstraher saker fra 360online HTML (server-side rendered, best kilde) */
function parse360(html: string, gnr: number, bnr: number): InnsynResult['saker'] {
  const saker: InnsynResult['saker'] = []
  // 360online har <tr>-rader med sakstittel og dato
  const rowRegex = /<tr[^>]*class="[^"]*journalpostrow[^"]*"[^>]*>([\s\S]*?)<\/tr>/gi
  let match
  while ((match = rowRegex.exec(html)) !== null) {
    const row = match[1]
    // Tittel er i andre <td>
    const cells = row.match(/<td[^>]*>([\s\S]*?)<\/td>/gi) || []
    if (cells.length >= 3) {
      const tittel = cells[1]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || ''
      const dato = cells[0]?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || ''
      const caseMatch = tittel.match(/(\d{4}\/\d{3,6})/)
      if (tittel.length > 5) {
        saker.push({ tittel: tittel.substring(0, 200), dato, saksnr: caseMatch?.[1] })
      }
    }
  }

  // Fallback: generisk gnr/bnr-matching i hele HTML
  if (saker.length === 0) {
    const gnrBnrPattern = new RegExp(`${gnr}[/\\s]+${bnr}`, 'gi')
    const lines = html.split('\n')
    for (const line of lines) {
      if (gnrBnrPattern.test(line)) {
        const clean = line.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
        if (clean.length > 10 && clean.length < 300) {
          const caseMatch = clean.match(/(\d{4}\/\d{3,6})/)
          saker.push({ tittel: clean.substring(0, 200), saksnr: caseMatch?.[1] })
        }
      }
    }
  }
  return saker
}

/** Ekstraher saker fra Oslo PBE Saksinnsyn (server-side rendered) */
function parseOsloPBE(html: string): InnsynResult['saker'] {
  const saker: InnsynResult['saker'] = []
  const rowRegex = /onclick="document\.location\s*=\s*'casedet\.asp\?mode=all&caseno=(\d+)'"[\s\S]*?<\/tr>/gi
  let match
  while ((match = rowRegex.exec(html)) !== null) {
    const caseno = match[1]
    const rowHtml = match[0]
    const cells = rowHtml.match(/<td[^>]*class="searchResult"[^>]*>([\s\S]*?)<\/td>/gi) || []
    let saksnr = ''
    let tittel = ''
    let status = ''
    if (cells.length >= 1 && cells[0]) saksnr = cells[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (cells.length >= 2 && cells[1]) tittel = cells[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (cells.length >= 3 && cells[2]) status = cells[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    const datoMatch = status.match(/(\d{2}\.\d{2}\.\d{4})/)
    if (caseno && tittel) {
      saker.push({
        tittel: tittel.substring(0, 200),
        saksnr: saksnr || caseno,
        dato: datoMatch?.[1],
        url: `https://innsyn.pbe.oslo.kommune.no/saksinnsyn/casedet.asp?mode=all&caseno=${caseno}`,
      })
    }
  }
  return saker
}

/** Generisk gnr/bnr-matching i HTML */
function parseGeneric(html: string, gnr: number, bnr: number): InnsynResult['saker'] {
  const saker: InnsynResult['saker'] = []
  const gnrBnrPattern = new RegExp(`${gnr}[/\\s]+${bnr}`, 'gi')
  const lines = html.split('\n')
  for (const line of lines) {
    if (gnrBnrPattern.test(line)) {
      const clean = line.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
      if (clean.length > 10 && clean.length < 300) {
        const caseMatch = clean.match(/(\d{4}\/\d{3,6})/)
        saker.push({ tittel: clean.substring(0, 200), saksnr: caseMatch?.[1] })
      }
    }
  }
  return saker
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

  // eInnsyn og Elements Publikum er SPA-er — vi kan ikke scrape dem,
  // men lenken fungerer for brukeren.
  if (kilde.system === 'eInnsyn' || kilde.system === 'Elements Publikum') {
    return result
  }

  try {
    const res = await fetch(sokeUrl, { headers: HEADERS, signal: AbortSignal.timeout(10000) })
    if (!res.ok) { result.tilgjengelig = false; return result }
    const html = await res.text()

    // Sjekk om ACOS krever innlogging
    if (html.includes('/login/') || html.includes('returnUrl=')) {
      result.tilgjengelig = false
      return result
    }

    if (html.includes('You need to enable JavaScript') || html.length < 500) {
      return result
    }

    // Bruk spesialisert parser per system
    if (kilde.system === 'PBE Saksinnsyn') {
      result.saker = parseOsloPBE(html)
    } else if (kilde.system === '360online') {
      result.saker = parse360(html, gnr, bnr)
    } else {
      result.saker = parseGeneric(html, gnr, bnr)
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
    // Fallback: eInnsyn generisk søk for kommuner uten spesifikk kilde
    const fallbackUrl = `https://einnsyn.no/sok?q=${encodeURIComponent(`"${gnr}/${bnr}" ${adresse || ''}`)}`
    return NextResponse.json({
      success: true,
      kommunenummer, gnr, bnr,
      kilder: [{
        kommune: 'Ukjent',
        system: 'eInnsyn (generelt søk)',
        url: 'https://einnsyn.no/sok',
        sokeUrl: fallbackUrl,
        tilgjengelig: true,
        saker: [],
      }],
      melding: 'Ingen spesifikk innsynsløsning for denne kommunen. Søk i eInnsyn.',
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
