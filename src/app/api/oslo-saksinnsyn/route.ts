import { NextRequest, NextResponse } from 'next/server'

// Oslo PBE Saksinnsyn – henter byggesaker for en eiendom i Oslo
// POST { gnr, bnr }
// Kilde: innsyn.pbe.oslo.kommune.no/saksinnsyn/

const SAKSINNSYN_URL = 'https://innsyn.pbe.oslo.kommune.no/saksinnsyn/main.asp'

interface Byggesak {
  saksnummer: string
  tittel: string
  status: string
  dato?: string
  url: string
}

function parseSaker(html: string): Byggesak[] {
  const saker: Byggesak[] = []

  // Finn alle rader med casedet-lenker
  const rowRegex = /onclick="document\.location\s*=\s*'casedet\.asp\?mode=all&caseno=(\d+)'"[\s\S]*?<\/tr>/gi
  let match

  while ((match = rowRegex.exec(html)) !== null) {
    const caseno = match[1]
    const rowHtml = match[0]

    // Ekstraher celler
    const cells = rowHtml.match(/<td[^>]*class="searchResult"[^>]*>([\s\S]*?)<\/td>/gi) || []

    let saksnr = ''
    let tittel = ''
    let status = ''

    if (cells.length >= 1 && cells[0]) {
      saksnr = cells[0].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    }
    if (cells.length >= 2 && cells[1]) {
      tittel = cells[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    }
    if (cells.length >= 3 && cells[2]) {
      status = cells[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    }

    if (caseno && tittel) {
      // Ekstraher dato fra status (f.eks. "Siste dok. 31.10.2025")
      const datoMatch = status.match(/(\d{2}\.\d{2}\.\d{4})/)

      saker.push({
        saksnummer: saksnr || caseno,
        tittel,
        status: status.replace(/Siste dok\.?\s*/i, '').replace(/\d{2}\.\d{2}\.\d{4}/, '').trim() || (datoMatch ? '' : status),
        dato: datoMatch?.[1],
        url: `https://innsyn.pbe.oslo.kommune.no/saksinnsyn/casedet.asp?mode=all&caseno=${caseno}`,
      })
    }
  }

  return saker
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
    const url = `${SAKSINNSYN_URL}?mode=all&text=${gnr}/${bnr}`
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,*/*',
        'Accept-Language': 'nb-NO,nb;q=0.9',
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) {
      return NextResponse.json({ error: `Saksinnsyn feil: ${res.status}` }, { status: 502 })
    }

    const html = await res.text()
    const saker = parseSaker(html)

    // Antall saker fra HTML (sjekk om det er en "neste side" eller totalt antall)
    const antallMatch = html.match(/Viser\s+\d+\s*-\s*\d+\s+av\s+(\d+)/)
    const totaltAntall = antallMatch ? parseInt(antallMatch[1]) : saker.length

    const saksinnsynUrl = `https://innsyn.pbe.oslo.kommune.no/saksinnsyn/main.asp?mode=all&text=${gnr}/${bnr}`

    return NextResponse.json({
      success: true,
      antall: totaltAntall,
      saker: saker.slice(0, 25), // Maks 25 saker
      saksinnsynUrl,
    })
  } catch {
    return NextResponse.json({ error: 'Kunne ikke nå Oslo Saksinnsyn' }, { status: 502 })
  }
}
