import { NextRequest, NextResponse } from 'next/server'

// ============================================================
// ANALYSE API – Starter analyseworkflow for en tomt
// ============================================================
// Workflow:
// 1. Hent matrikkeldata fra Kartverket
// 2. Hent reguleringsplan fra kommunens planregister
// 3. Analyser topografi (terrengmodell)
// 4. Beregn infrastruktur-score
// 5. Hent markedsdata (sammenlignbare salg)
// 6. Kjør AI mulighetsstudie
// 7. Generer utviklingsscenarioer
// 8. Beregn tomtescore
// 9. Lag visualiseringer (asynkront)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tomt_id } = body

    if (!tomt_id) {
      return NextResponse.json(
        { error: 'tomt_id er påkrevd' },
        { status: 400 }
      )
    }

    // I produksjon: start en bakgrunnsjobb (Supabase Edge Function / queue)
    const analysePipeline = [
      { steg: 'matrikkeldata', status: 'pending' },
      { steg: 'reguleringsplan', status: 'pending' },
      { steg: 'topografi', status: 'pending' },
      { steg: 'infrastruktur', status: 'pending' },
      { steg: 'markedsdata', status: 'pending' },
      { steg: 'mulighetsstudie', status: 'pending' },
      { steg: 'scenarioer', status: 'pending' },
      { steg: 'tomtescore', status: 'pending' },
      { steg: 'visualiseringer', status: 'pending' },
    ]

    // Her ville vi:
    // 1. Opprette en analyse-oppgave i Supabase
    // 2. Trigge en Edge Function som kjører pipelinen
    // 3. Returnere oppgave-ID for polling

    return NextResponse.json({
      data: {
        analyse_id: `analyse_${Date.now()}`,
        tomt_id,
        status: 'running',
        steg: analysePipeline,
        estimert_tid_min: 15,
      },
    })
  } catch {
    return NextResponse.json(
      { error: 'Intern serverfeil' },
      { status: 500 }
    )
  }
}
