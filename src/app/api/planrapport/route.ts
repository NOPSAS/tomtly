import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// Genererer planrapport PDF for en eiendom
// POST { lat, lon, adresse, kommune, kommunenummer, gnr, bnr }
// Henter data fra Planslurpen og arealplaner.no

const PLANSLURPEN_BASE = 'https://www.planslurpen.no/api'
const AREALPLANER_BASE = 'https://api.arealplaner.no/api'
const AREALPLANER_TOKEN = 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5'

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}
  const { lat, lon, adresse, kommune, kommunenummer, gnr, bnr } = body

  if (!kommunenummer || !gnr || !bnr) {
    return NextResponse.json({ error: 'kommunenummer, gnr og bnr er påkrevd' }, { status: 400 })
  }

  // 1. Fetch plans from Planslurpen
  let planer: any[] = []
  try {
    const res = await fetch(`${PLANSLURPEN_BASE}/planregister/${kommunenummer}/${gnr}/${bnr}`, { signal: AbortSignal.timeout(10000) })
    if (res.ok) {
      const data = await res.json()
      planer = data.plan || []
    }
  } catch {}

  // 2. Fetch plans from arealplaner.no
  let apPlaner: any[] = []
  let dokumenter: any[] = []
  try {
    const apHeaders = { 'X-WAAPI-TOKEN': AREALPLANER_TOKEN }
    const kunderRes = await fetch(`${AREALPLANER_BASE}/kunder`, { headers: apHeaders, signal: AbortSignal.timeout(10000) })
    if (kunderRes.ok) {
      const kunder = await kunderRes.json()
      const kunde = kunder.find((k: any) => k.kommunenummer === kommunenummer && k.status === 0)
      if (kunde) {
        const planerRes = await fetch(`${AREALPLANER_BASE}/kunder/${kunde.id}/arealplaner?knr=${kommunenummer}&gnr=${gnr}&bnr=${bnr}`, { headers: apHeaders })
        if (planerRes.ok) {
          apPlaner = await planerRes.json()
          // Fetch documents for each plan
          for (const plan of apPlaner.slice(0, 5)) {
            try {
              const dokRes = await fetch(`${AREALPLANER_BASE}/kunder/${kunde.id}/arealplaner/${plan.id}/dokumenter`, { headers: apHeaders })
              if (dokRes.ok) {
                const docs = await dokRes.json()
                dokumenter.push(...docs.map((d: any) => ({ ...d, planNavn: plan.planNavn, planId: plan.planId })))
              }
            } catch {}
          }
        }
      }
    }
  } catch {}

  // 3. Generate PDF
  const pdf = await PDFDocument.create()
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)

  const green = rgb(0.17, 0.35, 0.24)
  const black = rgb(0, 0, 0)
  const gray = rgb(0.4, 0.4, 0.4)
  const white = rgb(1, 1, 1)
  const lightGray = rgb(0.96, 0.96, 0.96)

  const pageW = 595.28
  const pageH = 841.89
  const margin = 50
  const contentW = pageW - margin * 2

  let page = pdf.addPage([pageW, pageH])
  let y = pageH - margin
  let pageNum = 1

  function addPage() {
    page = pdf.addPage([pageW, pageH])
    y = pageH - margin
    pageNum++
  }

  function checkSpace(needed: number) {
    if (y - needed < margin + 20) addPage()
  }

  function text(t: string, x: number, yp: number, opts: { font?: typeof font; size?: number; color?: typeof black } = {}) {
    page.drawText(t, { x, y: yp, size: opts.size || 10, font: opts.font || font, color: opts.color || black })
  }

  function rect(x: number, yp: number, w: number, h: number, color: typeof lightGray) {
    page.drawRectangle({ x, y: yp, width: w, height: h, color })
  }

  // ─── Header ───────────────────────────────────────────
  rect(0, pageH - 100, pageW, 100, green)
  text('PLANRAPPORT', margin, pageH - 45, { font: fontBold, size: 22, color: white })
  text('Gjeldende regulerings- og kommuneplaner for eiendommen', margin, pageH - 65, { size: 10, color: rgb(0.8, 0.9, 0.83) })
  text(`Generert: ${new Date().toLocaleDateString('nb-NO')} | tomtly.no`, margin, pageH - 82, { size: 9, color: rgb(0.7, 0.8, 0.73) })
  y = pageH - 120

  // ─── Eiendomsinfo ────────────────────────────────────
  rect(margin, y - 70, contentW, 70, lightGray)
  text('EIENDOM', margin + 10, y - 18, { font: fontBold, size: 12, color: green })
  const info = [
    adresse ? `Adresse: ${adresse}` : null,
    kommune ? `Kommune: ${kommune} (${kommunenummer})` : null,
    `Gnr/Bnr: ${gnr}/${bnr}`,
    lat && lon ? `Koordinater: ${Number(lat).toFixed(5)}, ${Number(lon).toFixed(5)}` : null,
  ].filter(Boolean)
  info.forEach((line, i) => {
    text(line!, margin + 10, y - 35 - i * 13, { size: 9, color: gray })
  })
  y -= 85

  // ─── Gjeldende planer (Planslurpen) ───────────────────
  if (planer.length > 0) {
    checkSpace(30 + planer.length * 40)
    text('GJELDENDE PLANER', margin, y, { font: fontBold, size: 12, color: black })
    text('Kilde: Planslurpen (DiBK)', margin + 140, y, { size: 8, color: gray })
    y -= 20

    for (const plan of planer) {
      checkSpace(45)
      const pid = plan.nasjonalArealplanId?.planidentifikasjon || plan.planId || ''
      const pnavn = plan.plannavn || 'Ukjent plan'
      const ptype = plan.plantype?.kodebeskrivelse || plan.plantype || ''
      const pstatus = plan.planstatus?.kodebeskrivelse || plan.planstatus || ''

      rect(margin, y - 35, contentW, 35, lightGray)
      text(pnavn, margin + 8, y - 14, { font: fontBold, size: 10 })
      text(`PlanID: ${pid}  |  Type: ${ptype}  |  Status: ${pstatus}`, margin + 8, y - 28, { size: 8, color: gray })
      y -= 45
    }
  }

  // ─── Planer fra arealplaner.no ────────────────────────
  if (apPlaner.length > 0) {
    checkSpace(30 + apPlaner.length * 50)
    y -= 10
    text('PLANER FRA AREALPLANER.NO', margin, y, { font: fontBold, size: 12, color: black })
    y -= 20

    for (const plan of apPlaner) {
      checkSpace(50)
      const ptype = typeof plan.planType === 'string' ? plan.planType : plan.planType?.beskrivelse || ''
      const pstatus = typeof plan.planStatus === 'string' ? plan.planStatus : plan.planStatus?.beskrivelse || ''

      rect(margin, y - 40, contentW, 40, lightGray)
      text(plan.planNavn || plan.planId, margin + 8, y - 14, { font: fontBold, size: 10 })
      text(`PlanID: ${plan.planId}  |  Type: ${ptype}  |  Status: ${pstatus}`, margin + 8, y - 28, { size: 8, color: gray })
      if (plan.iKraft) {
        text(`I kraft: ${new Date(plan.iKraft).toLocaleDateString('nb-NO')}`, margin + 8, y - 38, { size: 7, color: gray })
      }
      y -= 50
    }
  }

  // ─── Dokumenter ───────────────────────────────────────
  if (dokumenter.length > 0) {
    checkSpace(30 + Math.min(dokumenter.length, 20) * 14)
    y -= 10
    text('PLANDOKUMENTER', margin, y, { font: fontBold, size: 12, color: black })
    text(`${dokumenter.length} dokumenter funnet`, margin + 130, y, { size: 8, color: gray })
    y -= 18

    // Table header
    rect(margin, y - 15, contentW, 15, green)
    text('Dokumentnavn', margin + 8, y - 11, { font: fontBold, size: 8, color: white })
    text('Type', margin + contentW * 0.55, y - 11, { font: fontBold, size: 8, color: white })
    text('Plan', margin + contentW * 0.75, y - 11, { font: fontBold, size: 8, color: white })
    y -= 20

    for (const dok of dokumenter.filter((d: any) => d.tilgang === 'Alle').slice(0, 25)) {
      checkSpace(14)
      const name = (dok.dokumentnavn || '').substring(0, 50)
      const dtype = dok.dokumenttype || ''
      const planName = (dok.planNavn || '').substring(0, 20)

      text(name, margin + 8, y, { size: 7, color: black })
      text(dtype, margin + contentW * 0.55, y, { size: 7, color: gray })
      text(planName, margin + contentW * 0.75, y, { size: 7, color: gray })

      page.drawLine({ start: { x: margin, y: y - 4 }, end: { x: margin + contentW, y: y - 4 }, thickness: 0.3, color: rgb(0.9, 0.9, 0.9) })
      y -= 14
    }
  }

  // ─── Footer ───────────────────────────────────────────
  checkSpace(40)
  y -= 15
  page.drawLine({ start: { x: margin, y }, end: { x: margin + contentW, y }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) })
  y -= 12
  text('Datakilder: Planslurpen (DiBK), arealplaner.no (Norkart)', margin, y, { size: 7, color: gray })
  y -= 10
  text('Denne rapporten er automatisk generert og er veiledende. Kontakt kommunen for bindende informasjon.', margin, y, { size: 7, color: gray })
  y -= 10
  text('tomtly.no – en tjeneste fra NOPS AS (org.nr 933 819 086)', margin, y, { size: 7, color: gray })

  const pdfBytes = await pdf.save()

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Planrapport-${gnr}-${bnr}.pdf"`,
    },
  })
}
