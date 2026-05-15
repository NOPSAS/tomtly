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

VIKTIGE REGLER FOR TOLKNING:
- Ta ALLTID utgangspunkt i bestemmelsene for FRITTLIGGENDE BOLIGBEBYGGELSE / FRITTLIGGENDE SMÅHUSBEBYGGELSE. Det er denne kategorien som er relevant for tomtekjøpere.
- Hvis planen har ulike felt (B1, B2, BF1, BK1 osv.), bruk den som gjelder FRITTLIGGENDE bolig.
- %-BYA = prosent bebygd areal av tomten (typisk 20-30% for småhus). IKKE det samme som BRA (bruksareal).
- TU = total utnyttelsesgrad (alternativt mål til BYA, brukt i eldre planer og noen kommuneplaner).
- Gesimshøyde = høyde til overkant yttervegg (typisk 6-9 m). Mønehøyde = til takets høyeste punkt (typisk 8-11 m).
- MUA = minste uteoppholdsareal per boenhet (m² eller % av BRA). Ikke det samme som tomteareal.
- Oppgi numeriske tall UTEN enhet i JSON-feltene. Enheter kun i beskrivelsesfelter.
- For eldre planer (vedtatt før 2010): BYA kan mangle – se etter TU eller utnyttelsesgrad i prosent.
- Hvis planen ikke eksplisitt nevner frittliggende boliger, bruk generelle boligbestemmelser.

HÅNDTERING AV MANGLENDE DATA:
- Hvis BYA ikke er oppgitt, sjekk etter: utnyttingsgrad, T-BYA, maks bebygd areal, TU.
- Hvis gesimshøyde mangler, sjekk etter: byggehøyde, kotehøyde, maks høyde.
- Hvis ingenting finnes: sett feltet til null og forklar i beskrivelsen.

Returner et JSON-objekt:

{
  "planNavn": "det offisielle navnet på planen slik det fremgår av dokumentet",
  "planAlder": "ny (etter 2015) | middels (2005-2015) | eldre (før 2005)",
  "sammendrag": "2-4 setninger som oppsummerer de viktigste bestemmelsene for frittliggende boligbebyggelse. Inkluder utnyttelsesgrad, høydebegrensninger og eventuelle særlige vilkår.",
  "utnyttelsesgrad": {
    "bya_prosent": <tall 0-100 eller null>,
    "tu_prosent": <tall 0-100 eller null>,
    "beskrivelse": "Beskriv nøyaktig hva som er tillatt, f.eks. 'Maks %-BYA er 25% for frittliggende småhus (BF1). Garasje inngår i BYA.'"
  },
  "hoyder": {
    "gesimshøyde_m": <tall i meter eller null>,
    "mønehøyde_m": <tall i meter eller null>,
    "beskrivelse": "f.eks. 'Gesims maks 7 m, møne maks 9 m. Takoppbygg inntil 4 m² BYA er tillatt.'"
  },
  "etasjer": {
    "maks_etasjer": <tall eller null>,
    "beskrivelse": "f.eks. 'Maks 2 etasjer + kjeller. Loftsrom kan innredes innenfor takvinkel.'"
  },
  "mua": {
    "min_m2_per_boenhet": <tall i m² eller null>,
    "prosent_av_bra": <tall 0-100 eller null>,
    "beskrivelse": "f.eks. 'MUA min 50 m² per boenhet. Balkong/terrasse ≥ 5 m² kan medregnes inntil 15 m².'"
  },
  "parkering": {
    "antall_per_boenhet": <tall eller null>,
    "beskrivelse": "f.eks. 'Min 2 biloppstillingsplasser per enebolig. 1 sykkelparkeringsplass per boenhet.'"
  },
  "byggegrenser": {
    "mot_vei_m": <tall eller null>,
    "mot_nabo_m": <tall eller null>,
    "beskrivelse": "f.eks. '4 m mot nabogrense, 6 m mot vei (jf. vegloven). Garasje kan plasseres 1 m fra grense.'"
  },
  "tomtedeling": "Krav til tomtedeling og opprettelse av ny grunneiendom i henhold til planen: minimum tomtestørrelse for fradeling, krav til atkomst/vei, tilknytning til vann og avløp, avstand til nabogrense, krav til detaljregulering. Oppgi gjerne paragrafreferanser. Skriv null hvis ingenting er oppgitt.",
  "unntak_plankrav": "Tiltak eller fradeling som er unntatt krav om reguleringsplan etter denne planen. Hvilke vilkår gjelder, og hvilke paragrafer hjemler unntakene. Skriv null hvis ingenting er oppgitt.",
  "viktige_bestemmelser": ["Liste med 6-10 konkrete bestemmelser som har praktisk betydning for bygging, tomtedeling og utnyttelse. Unngå generelle formuleringer – vær spesifikk med tall og krav."],
  "restriksjoner": ["Reelle hindringer eller særlige krav som begrenser utbygging, f.eks. naturfare, kulturminner, støy, hensynssoner, grunnforhold, strandsone"]
}

Returner KUN gyldig JSON. Ikke inkluder forklaring eller kommentarer utenfor JSON-objektet. Bruk null der verdien ikke finnes i dokumentet.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
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
