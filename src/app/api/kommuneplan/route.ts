import { NextRequest, NextResponse } from 'next/server'
import { getKartInnsyn, getKommuneNavn } from '@/lib/kommune-kartinnsyn'

// Henter kommuneplanens arealdel og gjeldende reguleringsplaner for en eiendom
// POST { kommunenummer, gnr, bnr }
// Returnerer: kommuneplan, reguleringsplaner, innsynslenker, bestemmelser-dokumenter

const AREALPLANER_BASE = 'https://api.arealplaner.no/api'
const AREALPLANER_TOKEN = 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5'
const PLANSLURPEN_BASE = 'https://www.planslurpen.no/api'

interface PlanResult {
  kilde: 'planslurpen' | 'arealplaner'
  planId: string
  planNavn: string
  planType: string
  planStatus: string
  iKraft?: string
  dokumenter?: { navn: string; type: string; url?: string }[]
  erKommuneplan?: boolean
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}
  const { kommunenummer, gnr, bnr } = body

  if (!kommunenummer || !gnr || !bnr) {
    return NextResponse.json({ error: 'kommunenummer, gnr og bnr er påkrevd' }, { status: 400 })
  }

  const knr = String(kommunenummer).padStart(4, '0')
  const kommunenavn = getKommuneNavn(knr) || 'Ukjent kommune'
  const kartInnsyn = getKartInnsyn(knr, kommunenavn)

  const planer: PlanResult[] = []
  let kommuneplan: PlanResult | null = null
  let arealplanerKundeId: number | null = null

  // ── 1. Hent planer fra Planslurpen (DiBK) ──
  try {
    const res = await fetch(`${PLANSLURPEN_BASE}/planregister/${knr}/${gnr}/${bnr}`, {
      signal: AbortSignal.timeout(10000),
    })
    if (res.ok) {
      const data = await res.json()
      const planListe = data.plan || []
      for (const p of planListe) {
        const planType = p.plantype?.kodebeskrivelse || p.plantype || ''
        const erKP = planType.toLowerCase().includes('kommuneplan') ||
          planType.toLowerCase().includes('arealdel') ||
          (p.plannavn || '').toLowerCase().includes('kommuneplan')

        const result: PlanResult = {
          kilde: 'planslurpen',
          planId: p.nasjonalArealplanId?.planidentifikasjon || p.planId || '',
          planNavn: p.plannavn || 'Ukjent plan',
          planType,
          planStatus: p.planstatus?.kodebeskrivelse || p.planstatus || '',
          erKommuneplan: erKP,
        }
        planer.push(result)
        if (erKP && !kommuneplan) kommuneplan = result
      }
    }
  } catch {}

  // ── 2. Hent planer fra arealplaner.no ──
  try {
    const apHeaders = { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN }

    // Finn kunde-ID for denne kommunen
    const kunderRes = await fetch(`${AREALPLANER_BASE}/kunder`, {
      headers: apHeaders,
      signal: AbortSignal.timeout(10000),
    })
    if (kunderRes.ok) {
      const kunder = await kunderRes.json()
      const kunde = kunder.find((k: any) => k.kommunenummer === knr && k.status === 0)

      if (kunde) {
        arealplanerKundeId = kunde.id

        // Hent planer for eiendommen
        const planerRes = await fetch(
          `${AREALPLANER_BASE}/kunder/${kunde.id}/arealplaner?knr=${knr}&gnr=${gnr}&bnr=${bnr}`,
          { headers: apHeaders, signal: AbortSignal.timeout(10000) }
        )

        if (planerRes.ok) {
          const apPlaner = await planerRes.json()

          for (const ap of apPlaner) {
            const planType = typeof ap.planType === 'string'
              ? ap.planType
              : ap.planType?.beskrivelse || ''
            const planStatus = typeof ap.planStatus === 'string'
              ? ap.planStatus
              : ap.planStatus?.beskrivelse || ''
            const erKP = planType.toLowerCase().includes('kommuneplan') ||
              (ap.planNavn || '').toLowerCase().includes('kommuneplan') ||
              (ap.planNavn || '').toLowerCase().includes('arealdel')

            // Hent dokumenter for planen
            const dokumenter: { navn: string; type: string; url?: string }[] = []
            try {
              const dokRes = await fetch(
                `${AREALPLANER_BASE}/kunder/${kunde.id}/arealplaner/${ap.id}/dokumenter`,
                { headers: apHeaders, signal: AbortSignal.timeout(8000) }
              )
              if (dokRes.ok) {
                const docs = await dokRes.json()
                for (const d of docs.filter((doc: any) => doc.tilgang === 'Alle').slice(0, 20)) {
                  dokumenter.push({
                    navn: d.dokumentnavn || 'Ukjent dokument',
                    type: d.dokumenttype || '',
                    url: d.url || undefined,
                  })
                }
              }
            } catch {}

            const result: PlanResult = {
              kilde: 'arealplaner',
              planId: ap.planId || '',
              planNavn: ap.planNavn || 'Ukjent plan',
              planType,
              planStatus,
              iKraft: ap.iKraft || undefined,
              dokumenter,
              erKommuneplan: erKP,
            }
            planer.push(result)
            if (erKP && !kommuneplan) kommuneplan = result
          }
        }
      }
    }
  } catch {}

  // ── 3. Hent kommuneplanens arealdel separat hvis ikke funnet ──
  if (!kommuneplan && arealplanerKundeId) {
    try {
      const apHeaders = { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN }
      const kpRes = await fetch(
        `${AREALPLANER_BASE}/kunder/${arealplanerKundeId}/arealplaner?planTypeId=21,20`,
        { headers: apHeaders, signal: AbortSignal.timeout(10000) }
      )
      if (kpRes.ok) {
        const kpPlaner = await kpRes.json()
        // Finn den nyeste vedtatte kommuneplanen
        const vedtatt = kpPlaner
          .filter((p: any) => {
            const status = typeof p.planStatus === 'string' ? p.planStatus : p.planStatus?.beskrivelse || ''
            return status.toLowerCase().includes('vedtatt') || status.toLowerCase().includes('endelig')
          })
          .sort((a: any, b: any) => (b.iKraft || '').localeCompare(a.iKraft || ''))

        if (vedtatt.length > 0) {
          const kp = vedtatt[0]
          kommuneplan = {
            kilde: 'arealplaner',
            planId: kp.planId || '',
            planNavn: kp.planNavn || 'Kommuneplanens arealdel',
            planType: typeof kp.planType === 'string' ? kp.planType : kp.planType?.beskrivelse || 'Kommuneplan',
            planStatus: typeof kp.planStatus === 'string' ? kp.planStatus : kp.planStatus?.beskrivelse || '',
            iKraft: kp.iKraft || undefined,
            erKommuneplan: true,
          }
        }
      }
    } catch {}
  }

  // ── 4. Kategoriser planene ──
  const reguleringsplaner = planer.filter(p => !p.erKommuneplan)
  const kommuneplaner = planer.filter(p => p.erKommuneplan)

  // ── 5. Finn bestemmelser-dokumenter (for AI-analyse) ──
  const bestemmelserDokumenter = planer
    .flatMap(p => (p.dokumenter || []).filter(d =>
      d.type.toLowerCase().includes('bestemmelse') ||
      d.navn.toLowerCase().includes('bestemmelse')
    ))

  return NextResponse.json({
    kommunenummer: knr,
    kommunenavn,
    kartInnsyn: kartInnsyn.map(k => ({
      navn: k.navn,
      url: k.url,
      sokeUrl: k.sokeUrl(Number(gnr), Number(bnr)),
      type: k.type,
      harDokAnalyse: k.harDokAnalyse,
      harPlanrapport: k.harPlanrapport,
    })),
    kommuneplan: kommuneplan ? {
      planId: kommuneplan.planId,
      planNavn: kommuneplan.planNavn,
      planType: kommuneplan.planType,
      planStatus: kommuneplan.planStatus,
      iKraft: kommuneplan.iKraft,
      dokumenter: kommuneplan.dokumenter || [],
    } : null,
    reguleringsplaner: reguleringsplaner.map(p => ({
      kilde: p.kilde,
      planId: p.planId,
      planNavn: p.planNavn,
      planType: p.planType,
      planStatus: p.planStatus,
      iKraft: p.iKraft,
      dokumenter: p.dokumenter || [],
    })),
    bestemmelserDokumenter,
    antallPlaner: planer.length,
    antallReguleringsplaner: reguleringsplaner.length,
    antallKommuneplaner: kommuneplaner.length,
  })
}
