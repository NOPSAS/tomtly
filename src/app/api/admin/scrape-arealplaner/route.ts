import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// On-demand arealplaner.no scraper
// Henter planer + dokumenter + dispensasjoner for en kommune
// POST { kommunenummer: "4601" }

const BASE = 'https://api.arealplaner.no/api'
const TOKEN = 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5'
const headers = { 'X-WAAPI-TOKEN': TOKEN }

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

async function apiFetch(path: string) {
  const res = await fetch(`${BASE}${path}`, { headers })
  if (!res.ok) return null
  return res.json()
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  let body: any = {}
  try { body = await request.json() } catch {}
  const knr = body.kommunenummer

  if (!knr) {
    return NextResponse.json({ error: 'kommunenummer er påkrevd' }, { status: 400 })
  }

  // Find kundeId for this kommune
  const kommuner: any[] = await apiFetch('/kunder') || []
  const kommune = kommuner.find((k: any) => k.kommunenummer === knr && k.status === 0)
  if (!kommune) {
    return NextResponse.json({ error: `Kommune ${knr} ikke funnet` }, { status: 404 })
  }

  const kundeId = kommune.id

  // Fetch all plans (paginated)
  const planer: any[] = []
  let side = 1
  while (true) {
    await sleep(200)
    const batch = await apiFetch(`/kunder/${kundeId}/arealplaner?side=${side}&antall=50`)
    if (!batch || batch.length === 0) break
    planer.push(...batch)
    side++
  }

  // Save kommune
  await supabase.from('arealplaner_kommuner').upsert({
    kunde_id: kundeId,
    kommunenummer: knr,
    navn: kommune.navn,
    antall_planer: planer.length,
    sist_scraped: new Date().toISOString(),
  }, { onConflict: 'kunde_id' })

  let planerSaved = 0
  let dokSaved = 0

  // Process plans (limit to 100 for API timeout safety)
  const maxPlans = Math.min(planer.length, 100)

  for (let i = 0; i < maxPlans; i++) {
    const plan = planer[i]
    await sleep(150)

    await supabase.from('arealplaner_planer').upsert({
      intern_id: plan.id,
      kommune_kunde_id: kundeId,
      kommunenummer: knr,
      plan_id: plan.planId || null,
      plan_navn: plan.planNavn || null,
      plan_type: plan.planType?.beskrivelse || plan.planType || null,
      plan_status: plan.planStatus?.beskrivelse || plan.planStatus || null,
      i_kraft: plan.iKraft || null,
      lovreferanse: plan.lovreferanse?.beskrivelse || null,
      forslagsstiller: plan.forslagsstiller?.beskrivelse || null,
      sist_behandlet: plan.sistBehandlet || null,
      raw_json: plan,
    }, { onConflict: 'intern_id,kommune_kunde_id' })
    planerSaved++

    // Fetch documents
    const dokumenter: any[] = (await apiFetch(`/kunder/${kundeId}/arealplaner/${plan.id}/dokumenter`)) || []

    for (const dok of dokumenter) {
      let direkteUrl = null
      if (dok.dokumenttypeId === 5 || dok.dokumenttype === 'Bestemmelser') {
        await sleep(150)
        const meta = await apiFetch(`/kunder/${kundeId}/dokumenter/${dok.id}`)
        if (meta?.direkteUrl) direkteUrl = meta.direkteUrl
      }

      await supabase.from('arealplaner_dokumenter').upsert({
        dok_id: dok.id,
        plan_intern_id: plan.id,
        kommune_kunde_id: kundeId,
        dokumentnavn: dok.dokumentnavn || null,
        dokumenttype: dok.dokumenttype || null,
        dokumenttype_id: dok.dokumenttypeId || null,
        direkte_url: direkteUrl || null,
        dokument_dato: dok.dokumentdato || null,
        tilgang: dok.tilgang || null,
      }, { onConflict: 'dok_id,kommune_kunde_id' })
      dokSaved++
    }
  }

  return NextResponse.json({
    success: true,
    kommune: kommune.navn,
    kommunenummer: knr,
    planer_totalt: planer.length,
    planer_lagret: planerSaved,
    dokumenter_lagret: dokSaved,
    begrenset: planer.length > 100 ? `Viste ${maxPlans} av ${planer.length}. Kjør full scraping lokalt.` : undefined,
  })
}
