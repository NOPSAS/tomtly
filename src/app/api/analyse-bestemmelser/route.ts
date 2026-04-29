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
    // 1. Last ned PDF (prøv med og uten token)
    let pdfRes = await fetch(pdfUrl, {
      headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN },
      signal: AbortSignal.timeout(20000),
    })
    if (!pdfRes.ok && pdfRes.status === 401) {
      // Retry uten token (direkteUrl trenger ikke token)
      pdfRes = await fetch(pdfUrl, { signal: AbortSignal.timeout(20000) })
    }
    if (!pdfRes.ok) {
      return NextResponse.json({ error: `Kunne ikke laste ned PDF: HTTP ${pdfRes.status}` }, { status: 502 })
    }

    const pdfBuffer = await pdfRes.arrayBuffer()
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')

    // 2. Send til Claude for tolkning
    const client = new Anthropic({ apiKey })

    const prompt = `Du er en ekspert på norske reguleringsbestemmelser og plan- og bygningsloven.

Analyser denne ${planType === 'kommune' ? 'kommuneplanbestemmelsen' : 'reguleringsbestemmelsen'} (${planNavn || 'ukjent plan'}).

VIKTIG:
- Ta ALLTID utgangspunkt i bestemmelsene for FRITTLIGGENDE BOLIGBEBYGGELSE / FRITTLIGGENDE SMÅHUSBEBYGGELSE. Det er denne kategorien som er relevant.
- Hvis planen har ulike felt (B1, B2, BF1, BK1 osv.), bruk den som gjelder FRITTLIGGENDE bolig.
- %-BYA = prosent bebygd areal av tomten (typisk 20-30% for småhus). IKKE det samme som BRA.
- Gesimshøyde = høyde til overkant yttervegg (typisk 6-9m). Mønehøyde = taktop (typisk 8-10m).
- MUA = minste uteoppholdsareal per boenhet (m² eller % av BRA).
- Oppgi tall UTEN enhet i JSON. Enhet i beskrivelse.

Returner et JSON-objekt:

{
  "planNavn": "navnet på planen",
  "sammendrag": "2-3 setninger som oppsummerer bestemmelsene for bolig",
  "utnyttelsesgrad": {
    "bya_prosent": <tall 0-100 eller null>,
    "beskrivelse": "f.eks. Maks %-BYA er 25% for frittliggende småhus"
  },
  "hoyder": {
    "gesimshøyde_m": <tall i meter eller null>,
    "mønehøyde_m": <tall i meter eller null>,
    "beskrivelse": "f.eks. Gesims maks 7m, møne maks 9m"
  },
  "etasjer": {
    "maks_etasjer": <tall eller null>,
    "beskrivelse": "f.eks. Maks 2 etasjer + kjeller"
  },
  "mua": {
    "min_m2_per_boenhet": <tall i m² eller null>,
    "prosent_av_bra": <tall 0-100 eller null>,
    "beskrivelse": "f.eks. MUA min 50 m² per boenhet"
  },
  "parkering": {
    "antall_per_boenhet": <tall eller null>,
    "beskrivelse": "f.eks. Min 2 plasser per boenhet"
  },
  "byggegrenser": {
    "mot_vei_m": <tall eller null>,
    "mot_nabo_m": <tall eller null>,
    "beskrivelse": "f.eks. 4m mot nabo, 6m mot vei"
  },
  "viktige_bestemmelser": ["bestemmelse 1", "bestemmelse 2"],
  "restriksjoner": ["restriksjon 1"]
}

Returner KUN JSON. Bruk null der verdien ikke finnes i dokumentet.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
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
