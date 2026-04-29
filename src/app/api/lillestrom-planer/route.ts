import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

// Henter reguleringsplaner og dokumenter for Lillestrøm kommune
// via GeoAreal Planinnsyn API
// POST { gnr, bnr, planidentifikasjoner?: string[] }

const GEOAREAL_BASE = 'https://kartutside.lillestrom.kommune.no/planinnsyn/api'
const PLANSLURPEN_BASE = 'https://www.planslurpen.no/api'
const PLANSLURPEN_KEY = '213ca4ee-0a90-4215-b7cf-0f94042c7cf2'

export async function POST(req: NextRequest) {
  try {
    const { gnr, bnr } = await req.json()
    if (!gnr || !bnr) {
      return NextResponse.json({ error: 'gnr og bnr er påkrevd' }, { status: 400 })
    }

    // 1. Hent planer fra Planslurpen for denne eiendommen (filtrert)
    const planslurpRes = await fetch(
      `${PLANSLURPEN_BASE}/planregister/3205/${gnr}/${bnr}`,
      { headers: { 'x-api-key': PLANSLURPEN_KEY }, signal: AbortSignal.timeout(10000) }
    ).catch(() => null)

    let planIder: string[] = []
    if (planslurpRes?.ok) {
      const psData = await planslurpRes.json()
      planIder = (psData.plan || [])
        .map((p: any) => p.nasjonalArealplanId?.planidentifikasjon || p.planId || '')
        .filter((id: string) => id && !id.includes('kommune') && !id.includes('Kommune'))
    }

    // 2. Hent også alle planer fra GeoAreal og filtrer på eiendom via Planslurpen-IDer
    // Hvis Planslurpen ikke fant reguleringsplaner, prøv å hente alle og matche
    if (planIder.length === 0) {
      // Planslurpen hadde kun kommuneplan — prøv å finne reguleringsplan fra arealplaner.no
      const apRes = await fetch(
        `https://api.arealplaner.no/api/kunder`,
        { headers: { 'X-WAAPI-TOKEN': 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5' }, signal: AbortSignal.timeout(10000) }
      ).catch(() => null)

      if (apRes?.ok) {
        const kunder = await apRes.json()
        const kunde = kunder.find((k: any) =>
          (k.kommunenummer === '3205' || k.kommunenummer === '3030') && (k.status === 0 || k.status === 1)
        )
        if (kunde) {
          const planerRes = await fetch(
            `https://api.arealplaner.no/api/kunder/${kunde.id}/arealplaner?knr=${kunde.kommunenummer}&gnr=${gnr}&bnr=${bnr}`,
            { headers: { 'X-WAAPI-TOKEN': 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5' }, signal: AbortSignal.timeout(10000) }
          ).catch(() => null)

          if (planerRes?.ok) {
            const apPlaner = await planerRes.json()
            const regPlaner = apPlaner.filter((p: any) => {
              const type = typeof p.planType === 'string' ? p.planType : p.planType?.beskrivelse || ''
              return !type.toLowerCase().includes('kommune')
            })
            planIder = regPlaner.map((p: any) => p.planId).filter(Boolean)
          }
        }
      }
    }

    // 3. Hent detaljer for hver plan fra GeoAreal
    const planer: any[] = []
    for (const planId of planIder.slice(0, 5)) {
      try {
        const detailRes = await fetch(`${GEOAREAL_BASE}/plandetails`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ planidentifikasjon: planId }),
          signal: AbortSignal.timeout(10000),
        })

        if (!detailRes.ok) continue
        const detail = await detailRes.json()

        // Samle alle dokumenter
        const dokumenter: any[] = []
        for (const sak of detail.saks || []) {
          for (const behandling of sak.planbehandlings || []) {
            for (const dok of behandling.plandokuments || []) {
              dokumenter.push({
                ...dok,
                saksnummer: sak.saksnummer,
                behandlingType: behandling.planbehandlingtype,
                behandlingDato: behandling.dato,
                nedlastUrl: `${GEOAREAL_BASE}/plandocument?documentId=${dok.dokumentId}`,
              })
            }
          }
        }

        // Finn bestemmelser-dokumenter (prioritert rekkefølge)
        let bestemmelser = dokumenter.filter(d =>
          (d.dokumenttype || '').toLowerCase().includes('bestemmelse') ||
          (d.beskrivelse || '').toLowerCase().includes('bestemmelse')
        )
        // Fallback: bruk vedtak eller planbeskrivelse hvis ingen bestemmelser finnes
        if (bestemmelser.length === 0) {
          bestemmelser = dokumenter.filter(d =>
            (d.dokumenttype || '').toLowerCase() === 'vedtak' ||
            (d.dokumenttype || '').toLowerCase() === 'planbeskrivelse'
          )
        }

        planer.push({
          planidentifikasjon: planId,
          saker: detail.saks?.map((s: any) => ({
            saksnummer: s.saksnummer,
            behandlinger: s.planbehandlings?.map((b: any) => ({
              type: b.planbehandlingtype,
              dato: b.dato,
              antallDokumenter: b.plandokuments?.length || 0,
            })),
          })),
          dokumenter,
          bestemmelser,
          antallDokumenter: dokumenter.length,
          planinnsyUrl: `https://kartutside.lillestrom.kommune.no/planinnsyn/?plan=${planId}`,
        })
      } catch {}
    }

    return NextResponse.json({
      kommune: 'Lillestrøm',
      kommunenummer: '3205',
      gnr, bnr,
      planer,
      antallPlaner: planer.length,
      planIder,
      kartinnsynUrl: `https://kartutside.lillestrom.kommune.no/planinnsyn/?gnr=${gnr}&bnr=${bnr}`,
    })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
