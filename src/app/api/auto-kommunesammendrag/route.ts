import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'
import { getKommuneplanSammendrag } from '@/lib/kommuneplan-sammendrag'

export const maxDuration = 60

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
  id: string | number
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

async function fetchKundeId(knr: string): Promise<string | null> {
  try {
    const res = await fetch(`${AREALPLANER_BASE}/kunder`, {
      headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN },
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return null
    const kunder: KundeRow[] = await res.json()
    const match = kunder.find(k => String(k.kommunenummer) === knr && (k.status === 0 || k.status === 1))
    return match ? String(match.id) : null
  } catch {
    return null
  }
}

async function fetchKommuneplan(kundeId: string | number): Promise<PlanRow | null> {
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

async function fetchBestemmelserPdfUrl(kundeId: string | number, planId: number): Promise<string | null> {
  try {
    const res = await fetch(
      `${AREALPLANER_BASE}/kunder/${kundeId}/arealplaner/${planId}/dokumenter`,
      { headers: { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN }, signal: AbortSignal.timeout(15000) }
    )
    if (!res.ok) return null
    const dokumenter: DokumentRow[] = await res.json()
    // Find bestemmelser document
    // Prioriter hoveddokumentet "Bestemmelser" over tillegg
    const allBest = dokumenter.filter((d: any) => {
      const navn = (d.dokumentnavn || d.navn || '').toLowerCase()
      const dt = typeof d.dokumenttype === 'object' ? d.dokumenttype?.beskrivelse : String(d.dokumenttype || '')
      return navn.includes('bestemmelse') || dt.toLowerCase().includes('bestemmelse') || d.dokumenttypeId === 5 || d.type === 5
    })
    // Sorter: "Bestemmelser" som dokumenttype først, deretter uten "tillegg" i navnet
    const sorted = allBest.sort((a: any, b: any) => {
      const aDt = String((typeof a.dokumenttype === 'object' ? a.dokumenttype?.beskrivelse : a.dokumenttype) || '').toLowerCase()
      const bDt = String((typeof b.dokumenttype === 'object' ? b.dokumenttype?.beskrivelse : b.dokumenttype) || '').toLowerCase()
      const aNavn = (a.dokumentnavn || a.navn || '').toLowerCase()
      const bNavn = (b.dokumentnavn || b.navn || '').toLowerCase()
      // Dokumenttype === 'bestemmelser' prioriteres
      if (aDt === 'bestemmelser' && bDt !== 'bestemmelser') return -1
      if (bDt === 'bestemmelser' && aDt !== 'bestemmelser') return 1
      // Unngå tillegg/retningslinjer/parkeringsnorm
      const aIsTillegg = aNavn.includes('tillegg') || aNavn.includes('retningslinje') || aNavn.includes('parkering')
      const bIsTillegg = bNavn.includes('tillegg') || bNavn.includes('retningslinje') || bNavn.includes('parkering')
      if (!aIsTillegg && bIsTillegg) return -1
      if (aIsTillegg && !bIsTillegg) return 1
      return 0
    })
    const bestemmelser = sorted[0] || null
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

Lag et strukturert sammendrag som gir tomteeiere og boligkjøpere en rask oversikt. Fokuser på:

1. Byggeområdebestemmelser for FRITTLIGGENDE BOLIGBEBYGGELSE (eneboliger, småhus)
2. Minimum tomtestørrelse for bygging og for tomtedeling/fradeling
3. Maksimal utnyttelse (%-BYA, BYA i m², BRA i m²)
4. Maksimale høyder (gesims, møne, etasjer)
5. Krav til MUA (minste uteoppholdsareal) – m² per boenhet og/eller % av BRA
6. Krav til parkering – antall plasser per boenhet for ulike boligtyper
7. Tomtedeling og opprettelse av ny tomt – hvilke krav stilles? Min. tomtestørrelse for fradeling, krav til adkomst, VA, avstand til nabogrense, regulert veggrunn m.m.
8. Unntak fra plankrav – hvilke tiltak er unntatt krav om reguleringsplan etter kommuneplanens bestemmelser (typisk §§ i kommuneplanens arealdel om unntak, dispensasjoner, tiltak i LNF osv.)
9. LNFR-bestemmelser — hva tillates av bygging i LNF-/LNFR-områder
10. Andre viktige restriksjoner (strandsone, kulturminner, støy, flom, osv.)

Returner et JSON-objekt:

{
  "sammendrag": "2-4 setninger som oppsummerer kommuneplanens hovedføringer for bolig og tomtedeling",
  "nokkeltall": [
    { "label": "Maks %-BYA bolig", "verdi": "f.eks. 25%" },
    { "label": "Min tomtestørrelse (bygg)", "verdi": "f.eks. 600 m²" },
    { "label": "Min tomtestørrelse (fradeling)", "verdi": "f.eks. 700 m²" },
    { "label": "Maks gesimshøyde", "verdi": "f.eks. 7 m" },
    { "label": "Maks mønehøyde", "verdi": "f.eks. 9 m" },
    { "label": "Maks etasjer", "verdi": "f.eks. 2" },
    { "label": "MUA per boenhet", "verdi": "f.eks. min 50 m²" },
    { "label": "Parkering", "verdi": "f.eks. 2 plasser/boenhet" }
  ],
  "viktige_bestemmelser": [
    "6-10 konkrete punkter fra bestemmelsene som påvirker bolig og tomtedeling"
  ],
  "min_tomtestorrelse": "f.eks. 600 m² for enebolig, 400 m²/boenhet for tomannsbolig — eller null",
  "maks_bya_prosent": "f.eks. 25% — eller null",
  "maks_bra": "f.eks. 250 m² BRA — eller null",
  "maks_bya": "f.eks. 150 m² BYA — eller null",
  "lnfr": "Hva tillates i LNFR/LNF-områder: tomtestørrelse, BYA, krav til vei/VA m.m. Eller null.",
  "tomtedeling": "Konkrete krav til tomtedeling og opprettelse av ny tomt: min. tomtestørrelse for fradeling, krav til adkomst/vei, VA-tilknytning, avstand til nabogrense, krav til plangrunnlag (reguleringsplan eller unntak). Legg vekt på hva som er ULIKT for fradeling vs. vanlig bygging. Eller null hvis ikke beskrevet.",
  "mua": "Minste uteoppholdsareal (MUA): m² per boenhet, eventuelt prosent av BRA, og hva som teller med (f.eks. balkonger, terrasse). Skillet mellom MUA for enebolig og leilighet. Eller null.",
  "parkering": "Parkeringskrav: antall plasser per boenhet for enebolig, tomannsbolig og ev. leiligheter. Krav til sykkelp-arkering. Unntak og fleksibilitet. Eller null.",
  "unntak_plankrav": "Hva kommuneplanen sier om tiltak som er unntatt krav om reguleringsplan: f.eks. hvilke bygge- eller delingssøknader kan behandles direkte etter kommuneplanens arealdel uten reguleringsplan, og hvilke vilkår gjelder. Henvis til aktuelle paragrafer. Eller null."
}

VIKTIG:
- Ta utgangspunkt i FRITTLIGGENDE BOLIGBEBYGGELSE
- Bruk null der verdien ikke finnes i dokumentet — ikke finn på tall
- Skriv tall MED enhet i strenger (f.eks. "25%", "600 m²")
- For tomtedeling og unntak: vær konkret og sitér gjerne paragrafer

Returner KUN JSON-objektet, ingen forklaring rundt.`

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
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

  // 2. Sjekk Supabase-cache (valgfritt — feiler ikke hvis Supabase mangler)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null

  if (!force && supabase) {
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
  const kommunenavn = kommunenavnHint || `Kommune ${knr}`
  const kundeId = await fetchKundeId(knr)
  let plan: PlanRow | null = null
  let pdfUrl: string | null = null
  let claude: any = null

  if (kundeId) {
    console.log('[auto-kp] kundeId:', kundeId)
    plan = await fetchKommuneplan(kundeId)
    console.log('[auto-kp] plan:', plan?.planNavn, plan?.id)
    if (plan) {
      pdfUrl = await fetchBestemmelserPdfUrl(kundeId, plan.id)
      console.log('[auto-kp] pdfUrl:', pdfUrl?.substring(0, 80))
    }
  } else {
    console.log('[auto-kp] Ingen kundeId for', knr)
  }

  // 4a. Send PDF til Claude (beste kvalitet)
  if (pdfUrl && plan) {
    console.log('[auto-kp] Sender til Claude...')
    claude = await analyzeWithClaude(pdfUrl, kommunenavn, plan.planNavn)
    console.log('[auto-kp] Claude resultat:', !!claude)
  }

  // 4b. Fallback: Generer med Claude basert på kommunenavn (uten PDF)
  if (!claude) {
    console.log('[auto-kommunesammendrag] Fallback triggered for', knr, kommunenavn)
    const apiKey = process.env.ANTHROPIC_API_KEY
    console.log('[auto-kommunesammendrag] API key exists:', !!apiKey)
    if (apiKey) {
      try {
        const client = new Anthropic({ apiKey })
        const response = await client.messages.create({
          model: 'claude-sonnet-4-6',
          max_tokens: 2000,
          messages: [{
            role: 'user',
            content: `Du er ekspert på norske kommuneplaner og plan- og bygningsloven. Lag et sammendrag av kommuneplanens arealdel for ${kommunenavn} kommune (kommunenummer ${knr}).

Basert på din kunnskap om norsk planlovgivning og denne kommunens geografi og karakter, gi et realistisk sammendrag. Vær tydelig på tomtedeling, MUA, parkering og unntak fra plankrav.

Returner JSON:
{
  "sammendrag": "2-4 setninger om kommuneplanens hovedføringer for bolig og tomtedeling",
  "nokkeltall": [
    { "label": "Maks %-BYA bolig", "verdi": "typisk verdi" },
    { "label": "Min tomtestørrelse (bygg)", "verdi": "typisk verdi" },
    { "label": "Maks gesimshøyde", "verdi": "typisk verdi" },
    { "label": "Maks mønehøyde", "verdi": "typisk verdi" },
    { "label": "Maks etasjer", "verdi": "typisk verdi" },
    { "label": "MUA per boenhet", "verdi": "typisk verdi" },
    { "label": "Parkering", "verdi": "typisk verdi" }
  ],
  "viktige_bestemmelser": ["6-8 typiske bestemmelser inkl. tomtedeling og unntak"],
  "min_tomtestorrelse": "typisk verdi eller null",
  "lnfr": "Beskrivelse av LNFR-bestemmelser eller null",
  "tomtedeling": "Typiske krav til tomtedeling/fradeling i denne kommunetypen: min. tomtestørrelse, krav til adkomst, VA-tilknytning. Eller null.",
  "mua": "Typisk MUA-krav: m² per boenhet eller % av BRA. Eller null.",
  "parkering": "Typisk parkeringskrav per boenhet. Eller null.",
  "unntak_plankrav": "Typiske unntak fra krav om reguleringsplan i kommuneplaner av denne typen. Eller null."
}

VIKTIG: Vær realistisk. Returner KUN JSON.`,
          }],
        })
        const text = response.content.find(c => c.type === 'text')
        if (text && text.type === 'text') {
          const jsonMatch = text.text.match(/\{[\s\S]*\}/)
          if (jsonMatch) {
            try { claude = JSON.parse(jsonMatch[0]) } catch {
              try { claude = JSON.parse(jsonMatch[0].replace(/,\s*}/g, '}').replace(/,\s*]/g, ']')) } catch {}
            }
            if (claude) claude._kilde = 'claude-generelt'
          }
        }
      } catch (fallbackErr: any) {
        console.error('[auto-kommunesammendrag] Fallback feilet:', fallbackErr?.message || fallbackErr)
      }
    }
  }

  console.log('[auto-kommunesammendrag]', knr, kommunenavn, '| kundeId:', kundeId, '| plan:', plan?.planNavn, '| pdf:', !!pdfUrl, '| claude:', !!claude)

  if (!claude) {
    return NextResponse.json({
      success: false,
      error: 'Kunne ikke generere sammendrag',
      kommunenummer: knr,
    })
  }

  // 5. Lagre i cache (feiler ikke hvis cache-skriving feiler)
  const kilde = claude._kilde === 'claude-generelt' ? 'auto-claude-generelt' : 'auto-claude'
  if (supabase) {
    try {
      await supabase
        .from('kommuneplan_sammendrag_cache')
        .upsert({
          kommunenummer: knr,
          kommunenavn,
          plan_navn: plan?.planNavn || `Kommuneplanens arealdel — ${kommunenavn}`,
          plan_id: plan?.planId || (plan ? String((plan as any).id) : knr),
          i_kraft: plan?.iKraft || null,
          sammendrag: claude.sammendrag || null,
          nokkeltall: claude.nokkeltall || [],
          viktige_bestemmelser: claude.viktige_bestemmelser || [],
          min_tomtestorrelse: claude.min_tomtestorrelse || null,
          maks_bya_prosent: claude.maks_bya_prosent || null,
          maks_bra: claude.maks_bra || null,
          maks_bya: claude.maks_bya || null,
          lnfr: claude.lnfr || null,
          tomtedeling: claude.tomtedeling || null,
          mua: claude.mua || null,
          parkering: claude.parkering || null,
          unntak_plankrav: claude.unntak_plankrav || null,
          bestemmelser_pdf_url: pdfUrl,
          source: kilde,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'kommunenummer' })
    } catch {}
  }

  return NextResponse.json({
    success: true,
    kilde,
    sammendrag: {
      kommunenummer: knr,
      kommunenavn,
      planNavn: plan?.planNavn || `Kommuneplanens arealdel — ${kommunenavn}`,
      planId: plan?.planId || (plan ? String(plan.id) : knr),
      iKraft: plan?.iKraft,
      sammendrag: claude.sammendrag,
      nokkeltall: claude.nokkeltall,
      viktigeBestemmelser: claude.viktige_bestemmelser,
      minTomtestorrelse: claude.min_tomtestorrelse,
      maksBya: claude.maks_bya,
      maksBra: claude.maks_bra,
      maksBya_prosent: claude.maks_bya_prosent,
      lnfr: claude.lnfr,
      tomtedeling: claude.tomtedeling || null,
      mua: claude.mua || null,
      parkering: claude.parkering || null,
      unntakPlankrav: claude.unntak_plankrav || null,
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
