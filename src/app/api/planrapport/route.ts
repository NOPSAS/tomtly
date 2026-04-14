import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont, RGB } from 'pdf-lib'
import { getKommuneplanSammendrag } from '@/lib/kommuneplan-sammendrag'

// Genererer planrapport PDF for en eiendom
// POST { lat, lon, adresse, kommune, kommunenummer, gnr, bnr }
// Henter data fra Planslurpen og arealplaner.no + kommuneplan-sammendrag

const PLANSLURPEN_BASE = 'https://www.planslurpen.no/api'
const AREALPLANER_BASE = 'https://api.arealplaner.no/api'
const AREALPLANER_TOKEN = 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5'

function latLonToTile(lat: number, lon: number, zoom: number): { tx: number; ty: number } {
  const n = Math.pow(2, zoom)
  const tx = Math.floor(((lon + 180) / 360) * n)
  const latRad = (lat * Math.PI) / 180
  const ty = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)
  return { tx, ty }
}

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

  // 2b. Hent kommuneplan-sammendrag
  const sammendrag = getKommuneplanSammendrag(kommunenummer)

  // 2c. Hent kartflis
  let mapImageBytes: Uint8Array | null = null
  if (lat && lon) {
    try {
      const zoom = 16
      const { tx, ty } = latLonToTile(Number(lat), Number(lon), zoom)
      const tileUrl = `https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/${zoom}/${ty}/${tx}.png`
      const tileRes = await fetch(tileUrl, { signal: AbortSignal.timeout(10000) })
      if (tileRes.ok) mapImageBytes = new Uint8Array(await tileRes.arrayBuffer())
    } catch {}
  }

  // 3. Generate PDF
  const pdf = await PDFDocument.create()
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const fontItalic = await pdf.embedFont(StandardFonts.HelveticaOblique)

  const green = rgb(0.17, 0.35, 0.24)
  const darkGreen = rgb(0.12, 0.28, 0.18)
  const black = rgb(0, 0, 0)
  const gray = rgb(0.4, 0.4, 0.4)
  const lightGrayColor = rgb(0.55, 0.55, 0.55)
  const white = rgb(1, 1, 1)
  const lightGray = rgb(0.96, 0.96, 0.96)
  const lineGray = rgb(0.85, 0.85, 0.85)
  const bgGreen = rgb(0.92, 0.97, 0.93)

  const pageW = 595.28
  const pageH = 841.89
  const margin = 50
  const contentW = pageW - margin * 2

  const pages: PDFPage[] = []
  let page = pdf.addPage([pageW, pageH])
  pages.push(page)
  let y = pageH - margin

  function addPage() {
    page = pdf.addPage([pageW, pageH])
    pages.push(page)
    y = pageH - margin
  }

  function checkSpace(needed: number) {
    if (y - needed < margin + 20) addPage()
  }

  function text(t: string, x: number, yp: number, opts: { font?: PDFFont; size?: number; color?: RGB } = {}) {
    page.drawText(t, { x, y: yp, size: opts.size || 10, font: opts.font || font, color: opts.color || black })
  }

  function rect(x: number, yp: number, w: number, h: number, color: RGB) {
    page.drawRectangle({ x, y: yp, width: w, height: h, color })
  }

  function wrapText(t: string, f: PDFFont, size: number, maxW: number): string[] {
    const words = t.split(' ')
    const lines: string[] = []
    let cur = ''
    for (const w of words) {
      const test = cur ? `${cur} ${w}` : w
      if (f.widthOfTextAtSize(test, size) > maxW && cur) { lines.push(cur); cur = w } else { cur = test }
    }
    if (cur) lines.push(cur)
    return lines
  }

  // ─── Header ───────────────────────────────────────────
  rect(0, pageH - 105, pageW, 105, green)
  rect(0, pageH - 109, pageW, 4, darkGreen)
  text('PLANRAPPORT', margin, pageH - 42, { font: fontBold, size: 24, color: white })
  text('Gjeldende regulerings- og kommuneplaner for eiendommen', margin, pageH - 62, { size: 11, color: rgb(0.8, 0.9, 0.83) })
  const dateStr = new Date().toLocaleDateString('nb-NO', { day: '2-digit', month: 'long', year: 'numeric' })
  text(`Rapport generert: ${dateStr}`, margin, pageH - 78, { size: 9, color: rgb(0.7, 0.8, 0.73) })
  text('Tomtly.no – en tjeneste fra NOPS AS', margin, pageH - 92, { size: 8, color: rgb(0.6, 0.72, 0.64) })
  y = pageH - 125

  // ─── Map + Eiendomsinfo ────────────────────────────────
  if (mapImageBytes) {
    try {
      const mapImage = await pdf.embedPng(mapImageBytes)
      const mapSize = 160
      checkSpace(mapSize + 30)
      const mapX = margin + contentW - mapSize
      const mapY = y - mapSize - 5
      rect(mapX - 2, mapY - 2, mapSize + 4, mapSize + 4, lineGray)
      page.drawImage(mapImage, { x: mapX, y: mapY, width: mapSize, height: mapSize })
      text('Kartutsnitt (Kartverket)', mapX, mapY - 12, { size: 7, color: lightGrayColor })

      rect(margin, mapY - 2, contentW - mapSize - 15, mapSize + 4, lightGray)
      text('EIENDOMSINFORMASJON', margin + 12, y - 20, { font: fontBold, size: 11, color: green })
      const info = [
        adresse ? `Adresse: ${adresse}` : null,
        kommune ? `Kommune: ${kommune} (${kommunenummer})` : null,
        `Gnr/Bnr: ${gnr}/${bnr}`,
        lat && lon ? `Koordinater: ${Number(lat).toFixed(5)}, ${Number(lon).toFixed(5)}` : null,
        `Planer funnet: ${planer.length + apPlaner.length}`,
        `Dokumenter: ${dokumenter.length}`,
      ].filter(Boolean) as string[]
      info.forEach((line, i) => { text(line, margin + 12, y - 40 - i * 14, { size: 9, color: gray }) })
      y = mapY - 20
    } catch {
      drawInfoFallback()
    }
  } else {
    drawInfoFallback()
  }

  function drawInfoFallback() {
    checkSpace(90)
    rect(margin, y - 70, contentW, 70, lightGray)
    text('EIENDOMSINFORMASJON', margin + 10, y - 18, { font: fontBold, size: 11, color: green })
    const info = [
      adresse ? `Adresse: ${adresse}` : null,
      kommune ? `Kommune: ${kommune} (${kommunenummer})` : null,
      `Gnr/Bnr: ${gnr}/${bnr}`,
      lat && lon ? `Koordinater: ${Number(lat).toFixed(5)}, ${Number(lon).toFixed(5)}` : null,
    ].filter(Boolean) as string[]
    info.forEach((line, i) => { text(line!, margin + 10, y - 38 - i * 13, { size: 9, color: gray }) })
    y -= 85
  }

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

  // ─── Kommuneplan-sammendrag ─────────────────────────────
  if (sammendrag) {
    checkSpace(80)
    y -= 5
    text('KOMMUNEPLANENS AREALDEL', margin, y, { font: fontBold, size: 13, color: black })
    y -= 5
    rect(margin, y - 1, 60, 3, green)
    y -= 18
    text(`Sammendrag for ${kommune || kommunenummer}`, margin, y, { size: 9, color: gray })
    y -= 16

    rect(margin, y - 4, contentW, 1, lineGray)
    y -= 12

    // Sammendrag
    if (sammendrag.sammendrag) {
      const lines = wrapText(sammendrag.sammendrag, font, 9, contentW - 10)
      checkSpace(lines.length * 13 + 10)
      for (const line of lines) { text(line, margin + 5, y, { size: 9, color: rgb(0.2, 0.2, 0.2) }); y -= 13 }
      y -= 8
    }

    // Plan-info
    if (sammendrag.planNavn) {
      text(`Plan: ${sammendrag.planNavn}${sammendrag.iKraft ? ` (i kraft: ${sammendrag.iKraft})` : ''}`, margin + 5, y, { size: 8, color: gray })
      y -= 14
    }

    // Nøkkeltall
    if (sammendrag.nokkeltall?.length > 0) {
      checkSpace(16 + Math.ceil(sammendrag.nokkeltall.length / 2) * 14)
      text('Nøkkeltall:', margin + 5, y, { font: fontBold, size: 9, color: green })
      y -= 14
      const colW = (contentW - 10) / 2
      sammendrag.nokkeltall.forEach((item, i) => {
        const col = i % 2
        if (col === 0 && i > 0) y -= 14
        text(`${item.label}: ${item.verdi}`, margin + 5 + col * colW, y, { size: 8, color: gray })
      })
      if (sammendrag.nokkeltall.length % 2 !== 0) y -= 14
      y -= 8
    }

    // Viktige bestemmelser
    if (sammendrag.viktigeBestemmelser?.length) {
      checkSpace(16 + sammendrag.viktigeBestemmelser.length * 12)
      text('Viktige bestemmelser:', margin + 5, y, { font: fontBold, size: 9, color: green })
      y -= 12
      for (const b of sammendrag.viktigeBestemmelser.slice(0, 8)) {
        checkSpace(12)
        let bText = `• ${b}`
        while (font.widthOfTextAtSize(bText, 8) > contentW - 15 && bText.length > 20) {
          bText = bText.substring(0, bText.length - 4) + '...'
        }
        text(bText, margin + 10, y, { size: 8, color: gray })
        y -= 12
      }
    }
    y -= 10
  }

  // ─── Footer ───────────────────────────────────────────
  checkSpace(40)
  y -= 15
  page.drawLine({ start: { x: margin, y }, end: { x: margin + contentW, y }, thickness: 0.5, color: lineGray })
  y -= 12
  text('Datakilder: Planslurpen (DiBK), arealplaner.no (Norkart)', margin, y, { size: 7, color: lightGrayColor })
  y -= 10
  text('Denne rapporten er automatisk generert og er veiledende. Kontakt kommunen for bindende informasjon.', margin, y, { size: 7, color: lightGrayColor })
  y -= 10
  text('tomtly.no – en tjeneste fra NOPS AS (org.nr 933 819 086)', margin, y, { size: 7, color: lightGrayColor })

  // ─── Page numbers on all pages ─────────────────────────
  const totalPages = pages.length
  for (let i = 0; i < totalPages; i++) {
    const p = pages[i]
    const pageNumText = `Side ${i + 1} av ${totalPages}`
    const textWidth = font.widthOfTextAtSize(pageNumText, 8)
    p.drawText(pageNumText, { x: pageW - margin - textWidth, y: 25, size: 8, font, color: lightGrayColor })
    p.drawLine({ start: { x: margin, y: 38 }, end: { x: pageW - margin, y: 38 }, thickness: 0.3, color: lineGray })
    p.drawText('Planrapport | Tomtly.no', { x: margin, y: 25, size: 7, font: fontItalic, color: rgb(0.75, 0.75, 0.75) })
  }

  const pdfBytes = await pdf.save()

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="Planrapport-${gnr}-${bnr}.pdf"`,
    },
  })
}
