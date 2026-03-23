import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

// Laster ned bestemmelser-PDF fra arealplaner.no og tolker den med Claude
// POST { pdfUrl: "https://api.arealplaner.no/...", planNavn: "HELLVIKVEIEN", planType: "regulering" }

const AREALPLANER_TOKEN = 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5'

export async function POST(request: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY ikke konfigurert' }, { status: 500 })
  }

  let body: any = {}
  try { body = await request.json() } catch {}

  const { pdfUrl, planNavn, planType } = body
  if (!pdfUrl) {
    return NextResponse.json({ error: 'pdfUrl er påkrevd' }, { status: 400 })
  }

  try {
    // 1. Last ned PDF
    const pdfRes = await fetch(pdfUrl, {
      headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN },
    })
    if (!pdfRes.ok) {
      return NextResponse.json({ error: `Kunne ikke laste ned PDF: HTTP ${pdfRes.status}` }, { status: 502 })
    }

    const pdfBuffer = await pdfRes.arrayBuffer()
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')

    // 2. Send til Claude for tolkning
    const client = new Anthropic({ apiKey })

    const prompt = `Du er en ekspert på norske reguleringsbestemmelser og plan- og bygningsloven.

Analyser denne ${planType === 'kommune' ? 'kommuneplanbestemmelsen' : 'reguleringsbestemmelsen'} (${planNavn || 'ukjent plan'}) og returner et JSON-objekt med følgende struktur:

{
  "planNavn": "navnet på planen",
  "planType": "reguleringsplan/kommuneplan",
  "sammendrag": "2-3 setninger som oppsummerer de viktigste bestemmelsene",
  "utnyttelsesgrad": {
    "bya_prosent": <tall eller null>,
    "bra_prosent": <tall eller null>,
    "tu_prosent": <tall eller null>,
    "beskrivelse": "kort tekst om utnyttelsesgrad"
  },
  "hoyder": {
    "gesimshøyde_m": <tall eller null>,
    "mønehøyde_m": <tall eller null>,
    "maks_kotehøyde": <tall eller null>,
    "beskrivelse": "kort tekst om høydebestemmelser"
  },
  "etasjer": {
    "maks_etasjer": <tall eller null>,
    "beskrivelse": "kort tekst"
  },
  "byggegrenser": {
    "mot_vei_m": <tall eller null>,
    "mot_nabo_m": <tall eller null>,
    "beskrivelse": "kort tekst"
  },
  "parkering": {
    "krav": "kort tekst om parkeringskrav",
    "antall_per_boenhet": <tall eller null>
  },
  "uteoppholdsareal": {
    "krav_prosent": <tall eller null>,
    "beskrivelse": "kort tekst"
  },
  "viktige_bestemmelser": [
    "viktig bestemmelse 1",
    "viktig bestemmelse 2"
  ],
  "restriksjoner": [
    "restriksjon som kan begrense utvikling"
  ]
}

Returner KUN JSON, ingen annen tekst. Bruk null for verdier som ikke finnes i bestemmelsene.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'document',
            source: {
              type: 'base64',
              media_type: 'application/pdf',
              data: pdfBase64,
            },
          },
          { type: 'text', text: prompt },
        ],
      }],
    })

    // 3. Parse Claude's response
    const textContent = response.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      return NextResponse.json({ error: 'Ingen tekstrespons fra Claude' }, { status: 500 })
    }

    // Extract JSON from response
    let parsed: any = null
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        parsed = JSON.parse(jsonMatch[0])
      } catch {
        // Try to clean up common JSON issues
        const cleaned = jsonMatch[0].replace(/,\s*}/g, '}').replace(/,\s*]/g, ']')
        try { parsed = JSON.parse(cleaned) } catch {}
      }
    }

    if (!parsed) {
      return NextResponse.json({
        error: 'Kunne ikke parse Claude-respons som JSON',
        raw: textContent.text.substring(0, 500),
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      analyse: parsed,
      planNavn,
      planType,
    })
  } catch (err: any) {
    return NextResponse.json({
      error: `Analyse feilet: ${err.message || 'ukjent feil'}`,
    }, { status: 500 })
  }
}
