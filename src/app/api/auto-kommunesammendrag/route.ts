import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { getKommuneplanSammendrag } from '@/lib/kommuneplan-sammendrag'

// Auto-genererer KI-sammendrag av kommuneplanens arealdel for kommuner som ikke har et fra før.
// POST { kommunenummer, kommunenavn?, force? }
//
// Strategi:
// 1. Sjekk om statisk sammendrag finnes (kommuneplan-sammendrag.ts) — returner det
// 2. Sjekk Supabase-cache — returner cached versjon hvis den finnes (med mindre force=true)
// 3. Hent kommuneplan fra arealplaner.no (planTypeId 21,20)
// 4. Last ned bestemmelser-PDF
// 5. Send til Claude med utvidet prompt for kommuneplan-bestemmelser
// 6. Lagre i cache og returner

const AREALPLANER_TOKEN = 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5'
const AREALPLANER_BASE = 'https://api.arealplaner.no/api'

interface KundeRow {
  id: number
  kommunenummer?: string
  status?: number
}

interface PlanRow {
  id: number
  planId: string
  planNavn: string
  planType?: { beskrivelse?: string } | string
  planStatus?: { beskrivelse?: string } | string
  iKraft?: string
}

interface DokumentRow {
  id: number
  navn?: string
  dokumenttype?: string | { beskrivelse?: string }
  type?: number
  tilgang?: string
  url?: string
}

async function fetchKundeId(knr: string): Promise<number | null> {
  try {
    const res = await fetch(`${AREALPLANER_BASE}/kunder`, {
      headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return null
    const kunder: KundeRow[] = await res.json()
    const match = kunder.find(k => String(k.kommunenummer) === knr && k.status === 0)
    return match?.id ?? null
  } catch {
    return null
  }
}

async function fetchKommuneplan(kundeId: number): Promise<PlanRow | null> {
  try {
    const res = await fetch(
      `${AREALPLANER_BASE}/kunder/${kundeId}/arealplaner?planTypeId=21,20`,
      { headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN }, signal: AbortSignal.timeout(15000) }
    )
    if (!res.ok) return null
    const planer: PlanRow[] = await res.json()
    // Filter on vedtatt/endelig and sort by iKraft desc
    const vedtatt = planer.filter(p => {
      const status = typeof p.planStatus === 'object' ? p.planStatus?.beskrivelse?.toLowerCase() : String(p.planStatus || '').toLowerCase()
      return status?.includes('vedtatt') || status?.includes('endelig') || status?.includes('ikraft')
    })
    const sorted = (vedtatt.length > 0 ? vedtatt : planer).sort((a, b) => {
      const aDate = new Date(a.iKraft || 0).getTime()
      const bDate = new Date(b.iKraft || 0).getTime()
      return bDate - aDate
    })
    return sorted[0] || null
  } catch {
    return null
  }
}

async function fetchBestemmelserPdfUrl(kundeId: number, planId: number): Promise<string | null> {
  try {
    const res = await fetch(
      `${AREALPLANER_BASE}/kunder/${kundeId}/arealplaner/${planId}/dokumenter`,
      { headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN }, signal: AbortSignal.timeout(15000) }
    )
    if (!res.ok) return null
    const dokumenter: DokumentRow[] = await res.json()
    // Find bestemmelser document
    const bestemmelser = dokumenter.find(d => {
      const navn = (d.navn || '').toLowerCase()
      const dt = typeof d.dokumenttype === 'object' ? d.dokumenttype?.beskrivelse : d.dokumenttype
      return navn.includes('bestemmelse') ||
             String(dt || '').toLowerCase().includes('bestemmelse') ||
             d.type === 5
    })
    if (!bestemmelser) return null

    // Get direct URL
    const docRes = await fetch(
      `${AREALPLANER_BASE}/kunder/${kundeId}/dokumenter/${bestemmelser.id}`,
      { headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN }, signal: AbortSignal.timeout(15000) }
    )
    if (!docRes.ok) return bestemmelser.url || null
    const docData = await docRes.json()
    return docData.direkteUrl || docData.url || bestemmelser.url || null
  } catch {
    return null
  }
}

async function analyzeWithClaude(pdfUrl: string, kommunenavn: string, planNavn: string): Promise<any | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null

  try {
    // Download PDF
    const pdfRes = await fetch(pdfUrl, {
      headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN },
      signal: AbortSignal.timeout(30000),
    })
    if (!pdfRes.ok) return null
    const pdfBuffer = await pdfRes.arrayBuffer()
    const pdfBase64 = Buffer.from(pdfBuffer).toString('base64')

    const client = new Anthropic({ apiKey })

    const prompt = `Du er en ekspert på norske kommuneplaner og plan- og bygningsloven.

Analyser bestemmelsene i kommuneplanens arealdel for ${kommunenavn} kommune (${planNavn}).

Lag et strukturert sammendrag som gir tomteeiere og boligkjøpere en rask oversikt over hva som kan bygges. Fokuser på:

1. Generelle byggeområdebestemmelser for FRITTLIGGENDE BOLIGBEBYGGELSE (eneboliger, småhus)
2. Minimum tomtestørrelse for nye tomter
3. Maksimal utnyttelse (%-BYA, BYA i m², BRA i m²)
4. Maksimale høyder (gesims, møne, etasjer)
5. LNFR-bestemmelser — hva tillates av bygging i LNF-områder (spredt boligbebyggelse)
6. Krav til parkering, uteopphold, byggegrenser
7. Andre viktige restriksjoner (kulturminner, strandsone, støy, flom, osv.)

Returner et JSON-objekt:

{
  "sammendrag": "2-4 setninger som oppsummerer kommuneplanens hovedføringer for bolig",
  "nokkeltall": [
    { "label": "Maks BYA bolig", "verdi": "f.eks. 25%" },
    { "label": "Min tomtestørrelse", "verdi": "f.eks. 600 m²" },
    { "label": "Maks gesimshøyde", "verdi": "f.eks. 7 m" },
    { "label": "Maks mønehøyde", "verdi": "f.eks. 9 m" },
    { "label": "Maks etasjer", "verdi": "f.eks. 2" },
    { "label": "Parkering", "verdi": "f.eks. 1,5–2 plasser/boenhet" },
    { "label": "MUA (uteopphold)", "verdi": "f.eks. min. 100 m² per boenhet" }
  ],
  "viktige_bestemmelser": [
    "5-8 viktige punkter fra bestemmelsene som påvirker bolig"
  ],
  "min_tomtestorrelse": "f.eks. 600 m² for enebolig, 400 m²/boenhet for to-/tre-/firemannsbolig — eller null hvis ikke spesifisert",
  "maks_bya_prosent": "f.eks. 25% — eller null",
  "maks_bra": "f.eks. 250 m² BRA per tomt — eller null hvis ikke spesifisert",
  "maks_bya": "f.eks. 150 m² BYA per tomt — eller null hvis ikke spesifisert",
  "lnfr": "Beskrivelse av hva som tillates av bygging i LNFR-områder. Om tomt-størrelse, BYA-grense, krav om vei/vann/avløp osv. Eller null hvis ikke beskrevet."
}

VIKTIG:
- Ta utgangspunkt i FRITTLIGGENDE BOLIGBEBYGGELSE der det er flere kategorier
- Bruk null der verdien ikke finnes
- Skriv tall MED enhet i strenger (f.eks. "25%", "600 m²")
- Vær konkret og kortfattet i sammendrag og bestemmelser
- Ikke finn på tall — bruk null hvis du er usikker

Returner KUN JSON-objektet, ingen forklaring rundt.`

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

    const textContent = response.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') return null

    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) return null

    try {
      return JSON.parse(jsonMatch[0])
    } catch {
      const cleaned = jsonMatch[0].replace(/,\s*}/g, '}').replace(/,\s*]/g, ']')
      try { return JSON.parse(cleaned) } catch { return null }
    }
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}

  const knr = String(body.kommunenummer || '').padStart(4, '0')
  const force = body.force === true
  const kommunenavnHint = body.kommunenavn as string | undefined

  if (!knr || knr.length < 3) {
    return NextResponse.json({ error: 'kommunenummer er påkrevd' }, { status: 400 })
  }

  // 1. Statisk sammendrag — alltid prioriter dette
  const statisk = getKommuneplanSammendrag(knr)
  if (statisk && !force) {
    return NextResponse.json({
      success: true,
      kilde: 'statisk',
      sammendrag: {
        kommunenummer: statisk.kommunenummer,
        kommunenavn: statisk.kommunenavn,
        planNavn: statisk.planNavn,
        planId: statisk.planId,
        iKraft: statisk.iKraft,
        sammendrag: statisk.sammendrag,
        nokkeltall: statisk.nokkeltall,
        viktigeBestemmelser: statisk.viktigeBestemmelser,
        lnfr: statisk.lnfr,
      },
    })
  }

  // 2. Sjekk Supabase-cache
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Supabase ikke konfigurert' }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  if (!force) {
    const { data: cached } = await supabase
      .from('kommuneplan_sammendrag_cache')
      .select('*')
      .eq('kommunenummer', knr)
      .single()

    if (cached) {
      return NextResponse.json({
        success: true,
        kilde: 'cache',
        sammendrag: {
          kommunenummer: cached.kommunenummer,
          kommunenavn: cached.kommunenavn,
          planNavn: cached.plan_navn,
          planId: cached.plan_id,
          iKraft: cached.i_kraft,
          sammendrag: cached.sammendrag,
          nokkeltall: cached.nokkeltall,
          viktigeBestemmelser: cached.viktige_bestemmelser,
          minTomtestorrelse: cached.min_tomtestorrelse,
          maksBya: cached.maks_bya,
          maksBra: cached.maks_bra,
          maksBya_prosent: cached.maks_bya_prosent,
          lnfr: cached.lnfr,
        },
      })
    }
  }

  // 3. Hent kommuneplan fra arealplaner.no
  const kundeId = await fetchKundeId(knr)
  if (!kundeId) {
    return NextResponse.json({
      success: false,
      error: 'Kommunen finnes ikke i arealplaner.no — kan ikke generere sammendrag',
      kommunenummer: knr,
    })
  }

  const plan = await fetchKommuneplan(kundeId)
  if (!plan) {
    return NextResponse.json({
      success: false,
      error: 'Ingen kommuneplan funnet for kommunen',
      kommunenummer: knr,
    })
  }

  const pdfUrl = await fetchBestemmelserPdfUrl(kundeId, plan.id)
  if (!pdfUrl) {
    return NextResponse.json({
      success: false,
      error: 'Ingen bestemmelser-PDF funnet for kommuneplanen',
      kommunenummer: knr,
      planNavn: plan.planNavn,
    })
  }

  // 4. Send til Claude
  const kommunenavn = kommunenavnHint || `Kommune ${knr}`
  const claude = await analyzeWithClaude(pdfUrl, kommunenavn, plan.planNavn)
  if (!claude) {
    return NextResponse.json({
      success: false,
      error: 'Claude-analyse feilet',
      kommunenummer: knr,
      pdfUrl,
    })
  }

  // 5. Lagre i cache
  const planType = typeof plan.planType === 'object' ? plan.planType?.beskrivelse : plan.planType
  const newRow = {
    kommunenummer: knr,
    kommunenavn,
    plan_navn: plan.planNavn,
    plan_id: plan.planId || String(plan.id),
    i_kraft: plan.iKraft || null,
    sammendrag: claude.sammendrag || null,
    nokkeltall: claude.nokkeltall || [],
    viktige_bestemmelser: claude.viktige_bestemmelser || [],
    min_tomtestorrelse: claude.min_tomtestorrelse || null,
    maks_bya_prosent: claude.maks_bya_prosent || null,
    maks_bra: claude.maks_bra || null,
    maks_bya: claude.maks_bya || null,
    lnfr: claude.lnfr || null,
    bestemmelser_pdf_url: pdfUrl,
    source: 'auto-claude',
    updated_at: new Date().toISOString(),
  }

  const { error: upsertError } = await supabase
    .from('kommuneplan_sammendrag_cache')
    .upsert(newRow, { onConflict: 'kommunenummer' })

  if (upsertError) {
    return NextResponse.json({
      success: false,
      error: `Lagring feilet: ${upsertError.message}`,
    })
  }

  return NextResponse.json({
    success: true,
    kilde: 'auto-generert',
    sammendrag: {
      kommunenummer: knr,
      kommunenavn,
      planNavn: plan.planNavn,
      planId: plan.planId || String(plan.id),
      iKraft: plan.iKraft,
      sammendrag: claude.sammendrag,
      nokkeltall: claude.nokkeltall,
      viktigeBestemmelser: claude.viktige_bestemmelser,
      minTomtestorrelse: claude.min_tomtestorrelse,
      maksBya: claude.maks_bya,
      maksBra: claude.maks_bra,
      maksBya_prosent: claude.maks_bya_prosent,
      lnfr: claude.lnfr,
    },
  })
}

export async function GET(request: NextRequest) {
  // Lookup-only — sjekker statisk + cache, kjører ikke generering
  const url = new URL(request.url)
  const knr = (url.searchParams.get('knr') || '').padStart(4, '0')
  if (!knr) return NextResponse.json({ error: 'knr er påkrevd' }, { status: 400 })

  const statisk = getKommuneplanSammendrag(knr)
  if (statisk) {
    return NextResponse.json({ success: true, kilde: 'statisk', sammendrag: statisk })
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ success: false, error: 'Ingen sammendrag tilgjengelig' })
  }
  const supabase = createClient(supabaseUrl, supabaseKey)
  const { data } = await supabase
    .from('kommuneplan_sammendrag_cache')
    .select('*')
    .eq('kommunenummer', knr)
    .single()

  if (data) {
    return NextResponse.json({
      success: true,
      kilde: 'cache',
      sammendrag: {
        kommunenummer: data.kommunenummer,
        kommunenavn: data.kommunenavn,
        planNavn: data.plan_navn,
        planId: data.plan_id,
        iKraft: data.i_kraft,
        sammendrag: data.sammendrag,
        nokkeltall: data.nokkeltall,
        viktigeBestemmelser: data.viktige_bestemmelser,
        minTomtestorrelse: data.min_tomtestorrelse,
        maksBya: data.maks_bya,
        maksBra: data.maks_bra,
        maksBya_prosent: data.maks_bya_prosent,
        lnfr: data.lnfr,
      },
    })
  }

  return NextResponse.json({ success: false, error: 'Ingen sammendrag funnet' })
}
