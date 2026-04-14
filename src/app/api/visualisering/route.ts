import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

// Genererer AI-visualisering av hus på tomt
// POST { bildeUrl, husmodell, landskapBeskrivelse, vinkel, stil }
// Bruker OpenAI gpt-image-1 for bildegenerering

const OPENAI_KEY = process.env.OPENAI_API_KEY || ''

export async function POST(req: NextRequest) {
  try {
    if (!OPENAI_KEY) {
      return NextResponse.json({ error: 'OpenAI API-nøkkel mangler (OPENAI_API_KEY)' }, { status: 500 })
    }

    const body = await req.json()
    const {
      bildeUrl,         // URL til tomtebilde (fra FINN eller opplastet)
      husmodell,        // Valgt husmodell med detaljer
      landskapBeskrivelse, // Fritekst: beskrivelse av uteområder
      vinkel,           // Kameravinkel: 'front', 'skrå', 'fugleperspektiv', 'bakfra'
      stil,             // Stil: 'fotorealistisk', 'arkitektonisk', 'skisse'
      ekstraInstruksjoner, // Evt ekstra instrukser
    } = body

    if (!husmodell?.navn) {
      return NextResponse.json({ error: 'Husmodell er påkrevd' }, { status: 400 })
    }

    // Bygg detaljert prompt for arkitektonisk visualisering
    const prompt = byggVisualiseringsPrompt({
      husmodell,
      landskapBeskrivelse,
      vinkel: vinkel || 'skrå',
      stil: stil || 'fotorealistisk',
      ekstraInstruksjoner,
      harBilde: !!bildeUrl,
    })

    // Kall OpenAI Image API
    const openaiBody: any = {
      model: 'gpt-image-1',
      prompt,
      n: 1,
      size: '1536x1024', // Landskapsformat
      quality: 'high',
    }

    // Hvis vi har et eksisterende bilde, bruk edit-modus
    if (bildeUrl) {
      // Hent bildet og konverter til base64
      const imgRes = await fetch(bildeUrl, { signal: AbortSignal.timeout(10000) })
      if (imgRes.ok) {
        const imgBuffer = await imgRes.arrayBuffer()
        const base64 = Buffer.from(imgBuffer).toString('base64')
        openaiBody.image = `data:image/jpeg;base64,${base64}`
      }
    }

    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(openaiBody),
      signal: AbortSignal.timeout(55000),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error('[visualisering] OpenAI feil:', err)
      return NextResponse.json({ error: `OpenAI feil: ${res.status}` }, { status: 502 })
    }

    const data = await res.json()
    const bildeData = data.data?.[0]

    return NextResponse.json({
      bilde: bildeData?.url || bildeData?.b64_json ? `data:image/png;base64,${bildeData.b64_json}` : null,
      bildeUrl: bildeData?.url,
      prompt,
      modell: 'gpt-image-1',
    })
  } catch (err: any) {
    console.error('[visualisering] Feil:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function byggVisualiseringsPrompt(opts: {
  husmodell: any
  landskapBeskrivelse?: string
  vinkel: string
  stil: string
  ekstraInstruksjoner?: string
  harBilde: boolean
}): string {
  const { husmodell, landskapBeskrivelse, vinkel, stil, ekstraInstruksjoner, harBilde } = opts

  const vinkelMap: Record<string, string> = {
    'front': 'straight-on front view at eye level',
    'skrå': 'three-quarter angle view from slightly elevated position',
    'fugleperspektiv': 'aerial bird\'s eye view from above',
    'bakfra': 'rear view showing the back of the house and garden',
    'side': 'side view showing the profile of the house',
  }

  const stilMap: Record<string, string> = {
    'fotorealistisk': 'photorealistic, professional architectural photography, golden hour lighting, sharp focus, 85mm lens',
    'arkitektonisk': 'professional architectural rendering, clean and modern, slight depth of field, studio lighting',
    'skisse': 'architectural watercolor sketch, artistic, hand-drawn quality with soft colors',
  }

  const lines = [
    `Create a ${stilMap[stil] || stilMap['fotorealistisk']} visualization of a ${husmodell.navn} house by ${husmodell.leverandor || 'Norwegian manufacturer'}.`,
    '',
    'HOUSE SPECIFICATIONS:',
    `- Model: ${husmodell.navn}`,
    husmodell.leverandor ? `- Manufacturer: ${husmodell.leverandor}` : '',
    husmodell.bra_m2 ? `- Living area: ${husmodell.bra_m2} m²` : '',
    husmodell.etasjer ? `- Floors: ${husmodell.etasjer}` : '',
    husmodell.soverom ? `- Bedrooms: ${husmodell.soverom}` : '',
    husmodell.beskrivelse ? `- Style: ${husmodell.beskrivelse}` : '',
    husmodell.ekstra?.Takvinkel ? `- Roof pitch: ${husmodell.ekstra.Takvinkel}` : '',
    husmodell.ekstra?.BYA ? `- Building footprint: ${husmodell.ekstra.BYA}` : '',
    '',
    `CAMERA: ${vinkelMap[vinkel] || vinkelMap['skrå']}`,
    '',
    'ENVIRONMENT AND LANDSCAPING:',
    landskapBeskrivelse || 'Norwegian residential area with natural vegetation, birch trees, grass lawn, gravel driveway. Scandinavian suburban setting.',
    '',
    'CRITICAL RULES:',
    '- The house must look realistic and architecturally correct for a Norwegian residential building',
    '- Do NOT modify or remove neighboring houses, roads, fences or other existing infrastructure',
    '- Keep the natural surroundings (trees, terrain, neighboring properties) intact',
    '- The house should be properly grounded on the terrain with correct proportions',
    '- Include realistic shadows, reflections and lighting consistent with the scene',
    '- Norwegian building style: typically wood cladding (white, gray, or dark), pitched or flat roof',
    '- Show the house as newly built with finished exterior and basic landscaping',
  ]

  if (harBilde) {
    lines.push(
      '',
      'REFERENCE IMAGE:',
      'The provided image shows the actual plot/property. Place the house naturally on this specific plot.',
      'Preserve all existing surroundings, neighbors, and infrastructure exactly as they appear.',
      'Only add the house and the described landscaping to the plot area.',
    )
  }

  if (ekstraInstruksjoner) {
    lines.push('', 'ADDITIONAL INSTRUCTIONS:', ekstraInstruksjoner)
  }

  return lines.filter(l => l !== undefined && l !== '').join('\n')
}
