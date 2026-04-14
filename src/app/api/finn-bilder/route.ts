import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

// Henter bilder fra en FINN.no-annonse
// POST { url: "https://www.finn.no/realestate/plots/ad.html?finnkode=123456" }

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    if (!url || !url.includes('finn.no')) {
      return NextResponse.json({ error: 'Ugyldig FINN-URL' }, { status: 400 })
    }

    // Hent annonsen
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'nb-NO,nb;q=0.9,no;q=0.8',
      },
      signal: AbortSignal.timeout(15000),
    })

    if (!res.ok) {
      return NextResponse.json({ error: `FINN returnerte HTTP ${res.status}` }, { status: 502 })
    }

    const html = await res.text()

    // Hent bilder fra HTML
    const bilder: string[] = []

    // Finn alle bildelenker (FINN bruker mcdn.nef.no for bilder)
    const imgRegex = /https?:\/\/images\.finncdn\.no\/dynamic\/[^\s"'<>]+/g
    const matches = html.match(imgRegex) || []
    for (const img of matches) {
      const clean = img.replace(/&amp;/g, '&').split('"')[0].split("'")[0]
      if (!bilder.includes(clean)) bilder.push(clean)
    }

    // Alternativ: finn bilder i data-attributter
    const dataImgRegex = /https?:\/\/images\.finncdn\.no\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi
    const dataMatches = html.match(dataImgRegex) || []
    for (const img of dataMatches) {
      const clean = img.replace(/&amp;/g, '&')
      if (!bilder.includes(clean)) bilder.push(clean)
    }

    // Hent tittel
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    const tittel = titleMatch?.[1]?.replace(/ - FINN\.no$/, '').trim() || ''

    // Hent FINN-kode fra URL
    const finnkodeMatch = url.match(/finnkode=(\d+)/)
    const finnkode = finnkodeMatch?.[1] || ''

    // Hent adresse fra annonsen
    const adresseMatch = html.match(/"location"[^}]*"address"\s*:\s*"([^"]+)"/i)
    const adresse = adresseMatch?.[1] || ''

    // Hent pris
    const prisMatch = html.match(/(\d[\d\s]+)\s*kr/i)
    const pris = prisMatch?.[1]?.replace(/\s/g, '') || ''

    return NextResponse.json({
      finnkode,
      tittel,
      adresse,
      pris,
      bilder: bilder.slice(0, 30), // Max 30 bilder
      antall: bilder.length,
    })
  } catch (err: any) {
    return NextResponse.json({ error: `Feil: ${err.message}` }, { status: 500 })
  }
}
