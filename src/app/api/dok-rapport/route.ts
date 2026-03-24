import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

// Genererer DOK-analyse PDF-rapport
// POST { lat, lon, adresse, kommune, gnr, bnr }

const DOK_API = 'https://kartverket-ogc-api.azurewebsites.net/processes/fullstendighetsdekning/execution'

interface Coverage {
  layer: string
  layerName: string
  coverageStatus: string
  lastUpdated: string
}

interface RiskGroup {
  navn: string
  keywords: string[]
  coverages: Coverage[]
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}
  const { lat, lon, adresse, kommune, gnr, bnr } = body

  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat og lon er påkrevd' }, { status: 400 })
  }

  // 1. Hent DOK-data
  let coverages: Coverage[] = []
  try {
    const res = await fetch(DOK_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputs: { datasets: [], geometry: { type: 'Point', coordinates: [lon, lat] } } }),
      signal: AbortSignal.timeout(25000),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    coverages = data.properties?.coverages || []
  } catch (err: any) {
    return NextResponse.json({ error: `DOK-henting feilet: ${err.message}` }, { status: 502 })
  }

  // 2. Kategoriser
  const groups: RiskGroup[] = [
    { navn: 'Flom og overvann', keywords: ['flom', 'flomsone', 'overvann', 'oversvøm', 'stormflo'], coverages: [] },
    { navn: 'Skred', keywords: ['skred', 'snøskred', 'jordskred', 'steinsprang', 'fjellskred', 'ras'], coverages: [] },
    { navn: 'Kvikkleire og grunnforhold', keywords: ['kvikkleire', 'marin', 'løsmasse', 'berggrunn', 'grunnvann'], coverages: [] },
    { navn: 'Radon', keywords: ['radon'], coverages: [] },
    { navn: 'Forurensning', keywords: ['forurens', 'grunn'], coverages: [] },
    { navn: 'Kulturminner og kulturmiljø', keywords: ['kulturmin', 'kulturmiljø', 'kulturlandskap', 'fredet', 'verneverdig'], coverages: [] },
    { navn: 'Natur og artsmangfold', keywords: ['naturtype', 'arter', 'verne', 'villrein', 'frilufts', 'myr', 'våtmark', 'skog'], coverages: [] },
    { navn: 'Landbruk og jordvern', keywords: ['jordbruk', 'bonitet', 'reindrift', 'beite', 'areal'], coverages: [] },
    { navn: 'Støy og infrastruktur', keywords: ['støy', 'kraftledning', 'vei', 'jernbane', 'flyplass', 'havne', 'farled', 'ankring'], coverages: [] },
  ]
  const annet: Coverage[] = []

  for (const c of coverages) {
    const name = (c.layerName || '').toLowerCase()
    let placed = false
    for (const g of groups) {
      if (g.keywords.some(kw => name.includes(kw))) {
        g.coverages.push(c)
        placed = true
        break
      }
    }
    if (!placed) annet.push(c)
  }

  // 3. Generer PDF
  const pdf = await PDFDocument.create()
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)

  const green = rgb(0.17, 0.35, 0.24) // tomtly-accent
  const red = rgb(0.8, 0.1, 0.1)
  const gray = rgb(0.4, 0.4, 0.4)
  const black = rgb(0, 0, 0)
  const white = rgb(1, 1, 1)
  const lightGreen = rgb(0.9, 0.97, 0.92)
  const lightRed = rgb(0.98, 0.92, 0.92)
  const lightGray = rgb(0.96, 0.96, 0.96)

  const pageW = 595.28 // A4
  const pageH = 841.89
  const margin = 50
  const contentW = pageW - margin * 2

  let page = pdf.addPage([pageW, pageH])
  let y = pageH - margin

  function addPage() {
    page = pdf.addPage([pageW, pageH])
    y = pageH - margin
  }

  function checkSpace(needed: number) {
    if (y - needed < margin) addPage()
  }

  function drawText(text: string, x: number, yPos: number, options: { font?: typeof font; size?: number; color?: typeof black } = {}) {
    const f = options.font || font
    const s = options.size || 10
    const c = options.color || black
    page.drawText(text, { x, y: yPos, size: s, font: f, color: c })
  }

  function drawRect(x: number, yPos: number, w: number, h: number, color: typeof lightGray) {
    page.drawRectangle({ x, y: yPos, width: w, height: h, color })
  }

  // ─── Header ─────────────────────────────────────────────────────
  drawRect(0, pageH - 100, pageW, 100, green)
  drawText('DOK-ANALYSE', margin, pageH - 45, { font: fontBold, size: 22, color: white })
  drawText('Det offentlige kartgrunnlaget – fullstendighetsdekning', margin, pageH - 65, { size: 11, color: rgb(0.8, 0.9, 0.83) })
  drawText(`Generert: ${new Date().toLocaleDateString('nb-NO')} | Tomtly.no`, margin, pageH - 82, { size: 9, color: rgb(0.7, 0.8, 0.73) })
  y = pageH - 120

  // ─── Eiendomsinfo ──────────────────────────────────────────────
  checkSpace(80)
  drawRect(margin, y - 65, contentW, 65, lightGray)
  drawText('EIENDOMSINFORMASJON', margin + 10, y - 18, { font: fontBold, size: 11, color: green })
  const info = [
    adresse ? `Adresse: ${adresse}` : null,
    kommune ? `Kommune: ${kommune}` : null,
    gnr && bnr ? `Gnr/Bnr: ${gnr}/${bnr}` : null,
    `Koordinater: ${Number(lat).toFixed(5)}, ${Number(lon).toFixed(5)}`,
  ].filter(Boolean)
  info.forEach((line, i) => {
    drawText(line!, margin + 10, y - 35 - i * 13, { size: 9, color: gray })
  })
  y -= 80

  // ─── Oppsummering ──────────────────────────────────────────────
  checkSpace(60)
  drawText('OPPSUMMERING', margin, y, { font: fontBold, size: 12, color: black })
  y -= 18

  const funnTotal = coverages.filter(c => c.coverageStatus?.toLowerCase().includes('med funn')).length
  const okTotal = coverages.filter(c => {
    const s = c.coverageStatus?.toLowerCase() || ''
    return (s.includes('kartlagt') && !s.includes('med funn') && !s.includes('ikke kartlagt')) || s.includes('ikke relevant')
  }).length
  const ikkeKartlagt = coverages.filter(c => c.coverageStatus?.toLowerCase().includes('ikke kartlagt')).length

  drawText(`${coverages.length} datasett sjekket`, margin, y, { size: 10 })
  y -= 15
  drawText(`${funnTotal} datasett med funn (krever vurdering)`, margin, y, { size: 10, color: funnTotal > 0 ? red : gray })
  y -= 15
  drawText(`${okTotal} kartlagt uten registrert fare`, margin, y, { size: 10, color: green })
  y -= 15
  drawText(`${ikkeKartlagt} ikke kartlagt / delvis kartlagt`, margin, y, { size: 10, color: gray })
  y -= 25

  // ─── Kategorier ────────────────────────────────────────────────
  for (const group of groups) {
    if (group.coverages.length === 0) continue

    checkSpace(40 + group.coverages.length * 16)

    // Group header
    const hasFunn = group.coverages.some(c => c.coverageStatus?.toLowerCase().includes('med funn'))
    drawRect(margin, y - 20, contentW, 20, hasFunn ? lightRed : lightGreen)
    drawText(
      `${group.navn} (${group.coverages.length} datasett${hasFunn ? ' – FUNN' : ''})`,
      margin + 8, y - 14,
      { font: fontBold, size: 10, color: hasFunn ? red : green }
    )
    y -= 28

    // Table header
    drawText('Datasett', margin + 8, y, { font: fontBold, size: 8, color: gray })
    drawText('Status', margin + contentW * 0.6, y, { font: fontBold, size: 8, color: gray })
    y -= 4

    page.drawLine({ start: { x: margin, y }, end: { x: margin + contentW, y }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) })
    y -= 12

    for (const c of group.coverages) {
      checkSpace(16)
      const status = c.coverageStatus || 'Ukjent'
      const isFunn = status.toLowerCase().includes('med funn')

      // Truncate long names
      const name = c.layerName.length > 55 ? c.layerName.substring(0, 52) + '...' : c.layerName
      const statusShort = status.length > 35 ? status.substring(0, 32) + '...' : status

      drawText(name, margin + 8, y, { size: 8, color: black })
      drawText(statusShort, margin + contentW * 0.6, y, { size: 8, color: isFunn ? red : green })
      y -= 14
    }
    y -= 8
  }

  // Annet
  if (annet.length > 0) {
    checkSpace(30 + Math.min(annet.length, 20) * 14)
    drawRect(margin, y - 20, contentW, 20, lightGray)
    drawText(`Øvrige datasett (${annet.length})`, margin + 8, y - 14, { font: fontBold, size: 10, color: gray })
    y -= 28

    for (const c of annet.slice(0, 30)) {
      checkSpace(14)
      const name = c.layerName.length > 55 ? c.layerName.substring(0, 52) + '...' : c.layerName
      const status = c.coverageStatus?.length > 35 ? c.coverageStatus.substring(0, 32) + '...' : (c.coverageStatus || 'Ukjent')
      const isFunn = (c.coverageStatus || '').toLowerCase().includes('med funn')
      drawText(name, margin + 8, y, { size: 8, color: black })
      drawText(status, margin + contentW * 0.6, y, { size: 8, color: isFunn ? red : green })
      y -= 14
    }
    y -= 8
  }

  // ─── Footer ────────────────────────────────────────────────────
  checkSpace(60)
  page.drawLine({ start: { x: margin, y }, end: { x: margin + contentW, y }, thickness: 0.5, color: rgb(0.85, 0.85, 0.85) })
  y -= 15
  drawText('Datakilde: Kartverket – DOK fullstendighetsdekning (kartverket-ogc-api.azurewebsites.net)', margin, y, { size: 7, color: gray })
  y -= 11
  drawText('Denne rapporten er automatisk generert og er veiledende. For juridisk bindende informasjon, kontakt kommunen.', margin, y, { size: 7, color: gray })
  y -= 11
  drawText('Tomtly.no – en tjeneste fra NOPS AS (org.nr 933 819 086)', margin, y, { size: 7, color: gray })

  // 4. Returner PDF
  const pdfBytes = await pdf.save()

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="DOK-analyse-${gnr || ''}-${bnr || ''}.pdf"`,
    },
  })
}
