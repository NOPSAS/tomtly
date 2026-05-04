import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 30

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'API-nøkkel mangler' }, { status: 500 })

  let body: any = {}
  try { body = await request.json() } catch { return NextResponse.json({ error: 'Ugyldig JSON' }, { status: 400 }) }

  const {
    adresse, kommunenavn, kommunenummer,
    areal_m2, planer = [], dok_med_funn = [], dok_uten_funn_count = 0,
    bya_prosent, gesims_m, mone_m, maks_etasjer,
  } = body

  if (!adresse || !kommunenavn) return NextResponse.json({ error: 'adresse og kommunenavn er påkrevd' }, { status: 400 })

  const planerTekst = planer.length > 0
    ? planer.map((p: any) => `${p.plannavn} (${p.plantype || 'ukjent type'}, ${p.planstatus || 'ukjent status'})`).join('; ')
    : 'Ingen registrerte reguleringsplaner funnet'

  const dokFunnTekst = dok_med_funn.length > 0
    ? dok_med_funn.map((d: any) => d.tittel).join(', ')
    : 'Ingen farefunn'

  const regTekst = [
    bya_prosent ? `%-BYA: ${bya_prosent}%` : null,
    gesims_m ? `Gesimshøyde: ${gesims_m} m` : null,
    mone_m ? `Mønehøyde: ${mone_m} m` : null,
    maks_etasjer ? `Maks etasjer: ${maks_etasjer}` : null,
  ].filter(Boolean).join(', ') || 'Ikke funnet i planer'

  const prompt = `Du er en tomteekspert som hjelper vanlige folk å forstå hva som er mulig å bygge på en tomt i Norge.

Analyser denne eiendommen og lag en klar, lettfattelig oppsummering for en person uten kunnskap om planlov.

ADRESSE: ${adresse}, ${kommunenavn} (kommunenr. ${kommunenummer || 'ukjent'})
TOMTESTØRRELSE: ${areal_m2 ? `${areal_m2} m²` : 'ukjent'}
GJELDENDE PLANER: ${planerTekst}
REGULERINGSDATA: ${regTekst}
DOK-FAREFUNN: ${dokFunnTekst}
DATASETT UTEN FUNN: ${dok_uten_funn_count} stk.

Skriv som om du forklarer til en vanlig huseier eller boligkjøper. Unngå fagord som "%-BYA", "gesimshøyde", "reguleringsplan" uten å forklare dem. Bruk enkle ord.

Returner BARE dette JSON-objektet (ingen annen tekst):
{
  "ingress": "2-3 setninger som oppsummerer hva slags tomt dette er og hva man kan bygge her. Vær konkret om muligheter.",
  "funn": [
    {
      "type": "positiv",
      "tittel": "Kort tittel (4-7 ord)",
      "forklaring": "1-2 setninger som forklarer hva dette betyr for den som skal bygge eller kjøpe tomten"
    }
  ]
}

Inkluder 3-6 funn. Bruk "positiv" for fordeler/muligheter, "advarsel" for ting man bør sjekke nærmere, "kritisk" for reelle hindringer eller risikoer. Skriv norsk bokmål.`

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1200,
      messages: [{ role: 'user', content: prompt }],
    })

    const textContent = response.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json({ error: 'Ingen respons fra KI' }, { status: 500 })
    }

    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return NextResponse.json({ error: 'Ugyldig KI-respons' }, { status: 500 })

    let parsed: any
    try { parsed = JSON.parse(jsonMatch[0]) } catch {
      try { parsed = JSON.parse(jsonMatch[0].replace(/,\s*}/g, '}').replace(/,\s*]/g, ']')) } catch {
        return NextResponse.json({ error: 'Kunne ikke parse KI-respons' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, ingress: parsed.ingress, funn: parsed.funn || [] })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'KI-feil' }, { status: 500 })
  }
}
