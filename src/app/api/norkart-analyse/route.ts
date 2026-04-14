import { NextRequest, NextResponse } from 'next/server'
import { kjorNorkartAnalyse, hasNorkartKey } from '@/lib/norkart'

export const maxDuration = 30

// POST — kjør samlet Norkart-analyse (bygning + ROS) for en matrikkelenhet
export async function POST(req: NextRequest) {
  try {
    if (!hasNorkartKey()) {
      return NextResponse.json({ error: 'Norkart API-nøkkel mangler', tilgjengelig: false })
    }

    const body = await req.json()
    const { kommunenummer, gaardsnummer, bruksnummer } = body

    if (!kommunenummer || !gaardsnummer || !bruksnummer) {
      return NextResponse.json({ error: 'Mangler kommunenummer, gaardsnummer eller bruksnummer' }, { status: 400 })
    }

    const analyse = await kjorNorkartAnalyse(kommunenummer, gaardsnummer, bruksnummer)
    return NextResponse.json(analyse)
  } catch (err) {
    console.error('[norkart-analyse] Feil:', err)
    return NextResponse.json({ error: 'Intern feil i Norkart-analyse', tilgjengelig: false }, { status: 500 })
  }
}

// GET — sjekk om Norkart er tilgjengelig
export async function GET() {
  return NextResponse.json({ tilgjengelig: hasNorkartKey() })
}
