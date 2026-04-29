import { NextRequest, NextResponse } from 'next/server'

// Lillestrøm kommune planinnsyn API integration
// Henter planer, bestemmelser, dispensasjoner og dokumenter fra
// kartutside.lillestrom.kommune.no/planinnsyn/

const PLANINNSYN_BASE = 'https://kartutside.lillestrom.kommune.no/planinnsyn'

interface PlanDokument {
  dokumentId: string
  dokumenttype: string
  beskrivelse: string
  url: string
}

interface Dispensasjon {
  vedtaksdato: string
  navn: string
  saksnummer: string
  dispensasjon: string
}

interface PlanDetaljer {
  planidentifikasjon: string
  plannavn: string
  plantype: string
  planstatus: string
  ikrafttredelsesdato: string | null
  erKommuneplan: boolean
  gjeldendeBestemmelser: PlanDokument[]
  dispensasjoner: Dispensasjon[]
  alleDokumenter: PlanDokument[]
  arealformaal: { formal: string; feltbetegnelse: string; utnytting: string | null; utnyttingstall: string | null }[]
  hensynssoner: { hensyn: string; hensynSonenavn: string }[]
  innsynUrl: string
}

// ── Hjelpefunksjon: Hent matrikkelenhetid fra koordinater ──
async function getMatrikkelenhetId(lat: number, lon: number): Promise<string | null> {
  try {
    // Konverter WGS84 til UTM33 for ArcGIS
    const point = JSON.stringify({
      x: lon, y: lat,
      spatialReference: { wkid: 4326 }
    })
    const res = await fetch(`${PLANINNSYN_BASE}/api/eiendompoint?point=${encodeURIComponent(point)}`, {
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.matrikkelenhetid || data?.matrikkelenhetId || null
  } catch { return null }
}

// ── Hjelpefunksjon: Hent matrikkelenhetid fra gnr/bnr via adressesøk + eiendompoint ──
async function getMatrikkelenhetIdFromGnrBnr(gnr: number, bnr: number): Promise<string | null> {
  try {
    // Prøv først Geonorge adresse-API for å få koordinater
    const addrRes = await fetch(
      `https://ws.geonorge.no/adresser/v1/sok?kommunenummer=3205&gardsnummer=${gnr}&bruksnummer=${bnr}&treffPerSide=1`,
      { signal: AbortSignal.timeout(8000) }
    )
    if (addrRes.ok) {
      const addrData = await addrRes.json()
      if (addrData.adresser?.length > 0) {
        const punkt = addrData.adresser[0].representasjonspunkt
        return getMatrikkelenhetId(punkt.lat, punkt.lon)
      }
    }
    // Fallback: Prøv Kartverkets eiendomsgrenser API
    const teigRes = await fetch(
      `https://ws.geonorge.no/eiendom/v1/punkt?kommunenummer=3205&gardsnummer=${gnr}&bruksnummer=${bnr}`,
      { signal: AbortSignal.timeout(8000) }
    )
    if (teigRes.ok) {
      const teigData = await teigRes.json()
      if (teigData.representasjonspunkt) {
        return getMatrikkelenhetId(teigData.representasjonspunkt.lat, teigData.representasjonspunkt.lon)
      }
    }
    return null
  } catch { return null }
}

// ── Hjelpefunksjon: Hent alle planer for en eiendom ──
async function getEiendomPlaner(matrikkelenhetid: string): Promise<{ planidentifikasjon: string; plannavn: string; erKommuneplan: boolean }[]> {
  try {
    const res = await fetch(`${PLANINNSYN_BASE}/api/eiendomdetails?matrikkelenhetId=${matrikkelenhetid}`, {
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) return []
    const data = await res.json()
    const plans = data.plans || []
    return plans.map((p: any) => ({
      planidentifikasjon: p.planidentifikasjon,
      plannavn: (p.plannavn || '').replace(/\uFFFD/g, 'ø'),
      erKommuneplan: (p.plannavn || '').toLowerCase().includes('kommuneplan') ||
        (p.planidentifikasjon || '').includes('2022_2034'),
    }))
  } catch { return [] }
}

// ── Hjelpefunksjon: Hent detaljert planinfo inkl. dokumenter ──
async function getPlanDetaljer(matrikkelenhetid: string, planidentifikasjon: string): Promise<PlanDetaljer | null> {
  try {
    const res = await fetch(`${PLANINNSYN_BASE}/api/plandetails`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ matrikkelenhetid, planidentifikasjon }),
      signal: AbortSignal.timeout(15000),
    })
    if (!res.ok) return null
    const data = await res.json()

    // Samle gjeldende bestemmelser
    const gjeldendeBestemmelser: PlanDokument[] = (data.gjeldendeBestemmelses || []).map((d: any) => ({
      dokumentId: d.dokumentId,
      dokumenttype: d.dokumenttype || 'Gjeldende bestemmelser',
      beskrivelse: (d.beskrivelse || '').replace(/\uFFFD/g, 'ø'),
      url: `${PLANINNSYN_BASE}/api/plandocument?documentId=${d.dokumentId}`,
    }))

    // Samle dispensasjoner
    const dispensasjoner: Dispensasjon[] = (data.plandispensasjons || []).map((d: any) => ({
      vedtaksdato: d.vedtaksdato || '',
      navn: (d.navn || '').replace(/\uFFFD/g, 'ø'),
      saksnummer: d.saksnummer || '',
      dispensasjon: (d.dispensasjon || '').replace(/\uFFFD/g, 'ø'),
    }))

    // Samle alle dokumenter fra saksbehandlingen
    const alleDokumenter: PlanDokument[] = []
    for (const sak of (data.saks || [])) {
      for (const beh of (sak.planbehandlings || [])) {
        for (const dok of (beh.plandokuments || [])) {
          alleDokumenter.push({
            dokumentId: dok.dokumentId,
            dokumenttype: dok.dokumenttype || '',
            beskrivelse: (dok.beskrivelse || '').replace(/\uFFFD/g, 'ø'),
            url: `${PLANINNSYN_BASE}/api/plandocument?documentId=${dok.dokumentId}`,
          })
        }
      }
    }

    // Hent planinfo fra rpOmrades
    const rpInfo = (data.rpOmrades || [])[0] || {}
    const kpInfo = (data.kpOmrades || [])[0] || {}
    const info = rpInfo.planidentifikasjon ? rpInfo : kpInfo

    // Arealformål
    const arealformaal = (data.rpArealFormalOmrades || []).map((a: any) => ({
      formal: (a.formal || '').replace(/\uFFFD/g, 'ø'),
      feltbetegnelse: a.feltbetegnelse || '',
      utnytting: a.utnytting || null,
      utnyttingstall: a.utnyttingstall || null,
    }))

    // Hensynssoner
    const hensynssoner = (data.rpHensynssoneOmrades || []).map((h: any) => ({
      hensyn: (h.hensyn || '').replace(/\uFFFD/g, 'ø'),
      hensynSonenavn: h.hensynSonenavn || '',
    }))

    const erKP = (info.plantype || '').toLowerCase().includes('kommuneplan') ||
      planidentifikasjon.includes('2022_2034')

    return {
      planidentifikasjon,
      plannavn: (info.plannavn || '').replace(/\uFFFD/g, 'ø'),
      plantype: (info.plantype || '').replace(/\uFFFD/g, 'ø'),
      planstatus: (info.planstatus || '').replace(/\uFFFD/g, 'ø'),
      ikrafttredelsesdato: info.ikrafttredelsesdato || null,
      erKommuneplan: erKP,
      gjeldendeBestemmelser,
      dispensasjoner,
      alleDokumenter,
      arealformaal,
      hensynssoner,
      innsynUrl: `${PLANINNSYN_BASE}/?eiendom=${matrikkelenhetid}&plan=${planidentifikasjon}`,
    }
  } catch { return null }
}

// ── Hoved-API route ──
export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}

  const { gnr, bnr, lat, lon, matrikkelenhetid: providedId } = body

  if (!gnr && !lat && !providedId) {
    return NextResponse.json({ error: 'gnr+bnr, lat+lon, eller matrikkelenhetid er påkrevd' }, { status: 400 })
  }

  // 1. Resolve matrikkelenhetid
  let matrikkelenhetid = providedId || null

  if (!matrikkelenhetid && lat && lon) {
    matrikkelenhetid = await getMatrikkelenhetId(lat, lon)
  }

  if (!matrikkelenhetid && gnr && bnr) {
    matrikkelenhetid = await getMatrikkelenhetIdFromGnrBnr(Number(gnr), Number(bnr))
  }

  if (!matrikkelenhetid) {
    return NextResponse.json({
      error: 'Kunne ikke finne matrikkelenhetid for denne eiendommen',
      hint: 'Prøv å oppgi lat/lon koordinater i stedet',
      innsynUrl: `${PLANINNSYN_BASE}/?gnr=${gnr}&bnr=${bnr}`,
    }, { status: 404 })
  }

  // 2. Hent alle planer for eiendommen
  const planer = await getEiendomPlaner(String(matrikkelenhetid))

  if (planer.length === 0) {
    return NextResponse.json({
      matrikkelenhetid,
      planer: [],
      kommuneplan: null,
      reguleringsplaner: [],
      innsynUrl: `${PLANINNSYN_BASE}/?eiendom=${matrikkelenhetid}`,
      melding: 'Ingen planer funnet for denne eiendommen',
    })
  }

  // 3. Hent detaljer for hver plan (maks 5 for å unngå timeout)
  const planDetaljer: PlanDetaljer[] = []
  for (const plan of planer.slice(0, 5)) {
    const detaljer = await getPlanDetaljer(String(matrikkelenhetid), plan.planidentifikasjon)
    if (detaljer) planDetaljer.push(detaljer)
  }

  // 4. Kategoriser
  const kommuneplan = planDetaljer.find(p => p.erKommuneplan) || null
  const reguleringsplaner = planDetaljer.filter(p => !p.erKommuneplan)

  // 5. Samle bestemmelser-dokumenter for AI-analyse
  const bestemmelserDokumenter = planDetaljer.flatMap(p => p.gjeldendeBestemmelser)
  const alleDisp = planDetaljer.flatMap(p => p.dispensasjoner)

  return NextResponse.json({
    matrikkelenhetid,
    innsynUrl: `${PLANINNSYN_BASE}/?eiendom=${matrikkelenhetid}`,
    kommuneplan: kommuneplan ? {
      planidentifikasjon: kommuneplan.planidentifikasjon,
      plannavn: kommuneplan.plannavn,
      innsynUrl: kommuneplan.innsynUrl,
    } : null,
    reguleringsplaner: reguleringsplaner.map(p => ({
      planidentifikasjon: p.planidentifikasjon,
      plannavn: p.plannavn,
      plantype: p.plantype,
      planstatus: p.planstatus,
      ikrafttredelsesdato: p.ikrafttredelsesdato,
      innsynUrl: p.innsynUrl,
      gjeldendeBestemmelser: p.gjeldendeBestemmelser,
      dispensasjoner: p.dispensasjoner,
      alleDokumenter: p.alleDokumenter,
      arealformaal: p.arealformaal,
      hensynssoner: p.hensynssoner,
    })),
    dispensasjoner: alleDisp,
    bestemmelserDokumenter,
    antallPlaner: planer.length,
  })
}
