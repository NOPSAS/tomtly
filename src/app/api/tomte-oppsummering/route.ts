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
    reg_best_docs = [], kp_best_docs = [],
  } = body

  if (!adresse || !kommunenavn) return NextResponse.json({ error: 'adresse og kommunenavn er påkrevd' }, { status: 400 })

  const planerTekst = planer.length > 0
    ? planer.map((p: any) => `${p.plannavn} (${p.plantype || 'ukjent type'}, ${p.planstatus || 'ukjent status'})`).join('; ')
    : 'Ingen registrerte reguleringsplaner funnet'

  // Detailed DOK findings with category
  const dokFunnLinjer = dok_med_funn.length > 0
    ? dok_med_funn.map((d: any) => {
        const tittel = d.tittel || ''
        const status = d.status || d.dekning || ''
        // Detect specific sensitive categories
        const isStrandsone = /strandsone|100.meter|kystlinje|sjø/i.test(tittel)
        const isKvikkleire = /kvikkleire|quick clay/i.test(tittel)
        const isFlom = /flom/i.test(tittel)
        const isKulturmin = /kulturmin/i.test(tittel)
        const isForurens = /forurens|grunn/i.test(tittel)
        const tag = isStrandsone ? ' ⚠️ STRANDSONE/100m-SONE'
          : isKvikkleire ? ' ⚠️ KVIKKLEIRE'
          : isFlom ? ' ⚠️ FLOMFARE'
          : isKulturmin ? ' ⚠️ KULTURMINNER'
          : isForurens ? ' ⚠️ GRUNNFORURENSNING'
          : ''
        return `- ${tittel}${tag}: ${status}`
      }).join('\n')
    : 'Ingen farefunn'

  const regTekst = [
    bya_prosent ? `%-BYA: ${bya_prosent}% (maks bebygd areal av tomten)` : null,
    gesims_m ? `Gesimshøyde: ${gesims_m} m` : null,
    mone_m ? `Mønehøyde: ${mone_m} m` : null,
    maks_etasjer ? `Maks etasjer: ${maks_etasjer}` : null,
  ].filter(Boolean).join(', ') || 'Ikke funnet i planer'

  const regDocTekst = reg_best_docs.length > 0
    ? `Reguleringsbestemmelser tilgjengelig for: ${reg_best_docs.map((d: any) => d.plannavn).join(', ')}`
    : 'Ingen reguleringsbestemmelser funnet'

  const kpDocTekst = kp_best_docs.length > 0
    ? `Kommuneplanens bestemmelser tilgjengelig: ${kp_best_docs.map((d: any) => d.navn).join(', ')}`
    : 'Ingen kommuneplanbestemmelser funnet'

  const prompt = `Du er en tomteekspert som hjelper vanlige folk å forstå hva som er mulig å bygge på en tomt i Norge.

Analyser denne eiendommen og lag en klar, lettfattelig oppsummering for en person uten kunnskap om planlov.

ADRESSE: ${adresse}, ${kommunenavn} (kommunenr. ${kommunenummer || 'ukjent'})
TOMTESTØRRELSE: ${areal_m2 ? `${areal_m2} m²` : 'ukjent'}
GJELDENDE PLANER: ${planerTekst}
REGULERINGSDATA: ${regTekst}
DOKUMENTER: ${regDocTekst}. ${kpDocTekst}
DOK-DATASETT MED FUNN:
${dokFunnLinjer}
DATASETT UTEN FUNN: ${dok_uten_funn_count} stk. (greit – ingen risiko der)

VIKTIGE HENSYN:
- Strandsone: Er tomten innenfor 100 m fra sjø/kyst/elv? Dette er svært viktig – byggeforbud gjelder normalt i 100-metersbeltet langs sjø og vassdrag.
- Kvikkleire: Krever geoteknisk undersøkelse og kan gi krav om tiltak.
- Flom: Kan kreve flomvurdering og begrense tillatt byggehøyde.
- Kulturminner: Kan forsinke eller stoppe byggesak.
- Grunnforurensning: Kan kreve grunnundersøkelse og sanering.

Skriv som om du forklarer til en vanlig huseier. Unngå fagsjargong uten forklaring. Bruk enkle ord.

Returner BARE dette JSON-objektet (ingen annen tekst):
{
  "ingress": "2-3 setninger som oppsummerer hva slags tomt dette er og hva man kan bygge her. Vær konkret om muligheter og begrensninger.",
  "funn": [
    {
      "type": "positiv",
      "tittel": "Kort tittel (4-7 ord)",
      "forklaring": "1-2 setninger som forklarer hva dette betyr for den som skal bygge eller kjøpe tomten"
    }
  ]
}

Inkluder 3-7 funn. Bruk "positiv" for fordeler/muligheter, "advarsel" for ting man bør sjekke (strandsone, kvikkleire, osv.), "kritisk" for reelle hindringer som byggeforbud. Nevn alltid strandsone/100m-sone dersom det er funn på dette. Skriv norsk bokmål.`

  try {
    const client = new Anthropic({ apiKey })
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1400,
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
