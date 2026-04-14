import { NextRequest, NextResponse } from 'next/server'

// Søker i eInnsyn (offentlige postlister) etter saker knyttet til en eiendom
// POST { adresse, gnr, bnr, kommunenavn }

const EINNSYN_API = 'https://api.einnsyn.no'

interface EInnsynItem {
  id: string
  slug?: string
  offentligTittel?: string
  offentligTittelSensitiv?: string
  journaldato?: string
  publisertDato?: string
  entity?: string
  journalposttype?: string
  saksmappe?: string
  saksnummer?: string
  saksaar?: number
  sakssekvensnummer?: number
}

interface PostlisteResult {
  tittel: string
  dato: string
  type: string
  einnsynUrl: string
  saksnummer?: string
}

function buildEinnsynUrl(item: EInnsynItem): string {
  if (item.slug) {
    const prefix = item.entity === 'Saksmappe' ? 'saksmappe' : 'journalpost'
    return `https://einnsyn.no/${prefix}/${item.slug}`
  }
  return `https://einnsyn.no/sok?q=${encodeURIComponent(item.offentligTittel || '')}`
}

function journalpostTypeLabel(type?: string): string {
  const map: Record<string, string> = {
    inngaaende_dokument: 'Innkommende',
    utgaaende_dokument: 'Utgående',
    organinternt_dokument_uten_oppfoelging: 'Internt notat',
    organinternt_dokument_for_oppfoelging: 'Internt notat',
    saksframlegg: 'Saksframlegg',
  }
  return type ? (map[type] || type) : 'Dokument'
}

// Sjekker om en tittel inneholder eiendonsreferanser
function isRelevant(tittel: string, adresse: string, gnr: number, bnr: number): boolean {
  const t = tittel.toLowerCase()
  const adr = adresse.toLowerCase()

  // Sjekk adresse (gate + nummer)
  if (adr && t.includes(adr)) return true

  // Sjekk gatenavn alene (uten nummer)
  const gatenavn = adr.replace(/\s+\d+.*$/, '').trim()
  if (gatenavn.length > 4 && t.includes(gatenavn)) return true

  // Sjekk gnr/bnr-varianter
  const gnrBnrPatterns = [
    `${gnr}/${bnr}`,
    `gnr ${gnr} bnr ${bnr}`,
    `gnr. ${gnr} bnr. ${bnr}`,
    `gnr ${gnr}, bnr ${bnr}`,
    `gårdsnr ${gnr}`,
    `gbnr ${gnr}/${bnr}`,
  ]
  return gnrBnrPatterns.some(p => t.includes(p))
}

async function searchEinnsyn(query: string, limit = 50): Promise<EInnsynItem[]> {
  try {
    const url = `${EINNSYN_API}/search?searchString=${encodeURIComponent(query)}&limit=${limit}&sortBy=score`
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })
    if (!res.ok) return []
    const data = await res.json()
    return data.items || []
  } catch {
    return []
  }
}

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {}
  try { body = await request.json() } catch {}

  const adresse = (body.adresse as string) || ''
  const gnr = Number(body.gnr) || 0
  const bnr = Number(body.bnr) || 0
  const kommunenavn = (body.kommunenavn as string) || ''

  if (!adresse && (!gnr || !bnr)) {
    return NextResponse.json({ error: 'adresse eller gnr/bnr er påkrevd' }, { status: 400 })
  }

  // Kjør flere søk parallelt for best dekning
  const queries: string[] = []
  if (adresse) queries.push(`"${adresse}"`)
  if (gnr && bnr) queries.push(`"${gnr}/${bnr}" ${kommunenavn}`)
  if (adresse && kommunenavn) queries.push(`${adresse} ${kommunenavn}`)

  const allResults = await Promise.all(queries.map(q => searchEinnsyn(q)))
  const allItems = allResults.flat()

  // Dedupliser og filtrer på relevans
  const seen = new Set<string>()
  const relevante: PostlisteResult[] = []

  for (const item of allItems) {
    if (seen.has(item.id)) continue
    seen.add(item.id)

    const tittel = item.offentligTittel || item.offentligTittelSensitiv || ''
    if (!tittel) continue

    if (adresse || (gnr && bnr)) {
      if (!isRelevant(tittel, adresse, gnr, bnr)) continue
    }

    relevante.push({
      tittel,
      dato: item.journaldato && item.journaldato !== '3000-01-01'
        ? item.journaldato
        : item.publisertDato?.split('T')[0] || '',
      type: journalpostTypeLabel(item.journalposttype),
      einnsynUrl: buildEinnsynUrl(item),
      saksnummer: item.saksnummer,
    })
  }

  // Sorter etter dato (nyeste først)
  relevante.sort((a, b) => (b.dato || '').localeCompare(a.dato || ''))

  // Generer søkelenker for manuelt oppslag
  const sokeord = adresse || `${gnr}/${bnr} ${kommunenavn}`
  const einnsynSokUrl = `https://einnsyn.no/sok?q=${encodeURIComponent(sokeord)}`
  const postlisteSokUrl = `https://norske-postlister.no/postliste?q=${encodeURIComponent(sokeord)}`

  return NextResponse.json({
    success: true,
    antall: relevante.length,
    resultater: relevante.slice(0, 20),
    lenker: {
      einnsyn: einnsynSokUrl,
      norskPostliste: postlisteSokUrl,
    },
  })
}
