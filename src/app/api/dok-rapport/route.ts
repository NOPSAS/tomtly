import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont, RGB } from 'pdf-lib'

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

// Convert lat/lon (WGS84) to WMTS tile coordinates (Web Mercator)
function latLonToTile(lat: number, lon: number, zoom: number): { tx: number; ty: number } {
  const n = Math.pow(2, zoom)
  const tx = Math.floor(((lon + 180) / 360) * n)
  const latRad = (lat * Math.PI) / 180
  const ty = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)
  return { tx, ty }
}

// Naturfare risk factor definitions
interface NaturfareItem {
  navn: string
  keywords: string[]
}

const NATURFARE_ITEMS: NaturfareItem[] = [
  { navn: 'Flom', keywords: ['flom', 'flomsone', 'stormflo'] },
  { navn: 'Overvann', keywords: ['overvann', 'oversvøm'] },
  { navn: 'Snøskred', keywords: ['snøskred'] },
  { navn: 'Jordskred / kvikkleireskred', keywords: ['jordskred', 'kvikkleire', 'marin'] },
  { navn: 'Steinsprang / fjellskred', keywords: ['steinsprang', 'fjellskred'] },
  { navn: 'Radon', keywords: ['radon'] },
  { navn: 'Grunnforhold / løsmasser', keywords: ['løsmasse', 'berggrunn', 'grunnvann', 'grunnforhold'] },
  { navn: 'Forurensning i grunnen', keywords: ['forurens', 'grunn'] },
  { navn: 'Støy', keywords: ['støy'] },
  { navn: 'Kraftlinjer / høyspent', keywords: ['kraftledning', 'kraftlinje', 'høyspent'] },
]

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {}
  try { body = await request.json() } catch { /* empty body fallback */ }
  const { lat, lon, adresse, kommune, gnr, bnr } = body as {
    lat?: number; lon?: number; adresse?: string; kommune?: string; gnr?: string; bnr?: string
  }

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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: `DOK-henting feilet: ${message}` }, { status: 502 })
  }

  // 2. Fetch map tile from Kartverket
  let mapImageBytes: Uint8Array | null = null
  try {
    const zoom = 16
    const { tx, ty } = latLonToTile(lat, lon, zoom)
    const tileUrl = `https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/${zoom}/${ty}/${tx}.png`
    const tileRes = await fetch(tileUrl, { signal: AbortSignal.timeout(10000) })
    if (tileRes.ok) {
      mapImageBytes = new Uint8Array(await tileRes.arrayBuffer())
    }
  } catch {
    // Map tile fetch failed – continue without map
  }

  // 3. Kategoriser
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

  // 4. Generer PDF
  const pdf = await PDFDocument.create()
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const fontItalic = await pdf.embedFont(StandardFonts.HelveticaOblique)

  // Color palette
  const tomtlyGreen = rgb(0.17, 0.35, 0.24)
  const darkGreen = rgb(0.12, 0.28, 0.18)
  const red = rgb(0.75, 0.12, 0.12)
  const darkRed = rgb(0.6, 0.08, 0.08)
  const amber = rgb(0.8, 0.55, 0.0)
  const gray = rgb(0.4, 0.4, 0.4)
  const lightGray = rgb(0.55, 0.55, 0.55)
  const black = rgb(0, 0, 0)
  const white = rgb(1, 1, 1)
  const bgGreen = rgb(0.92, 0.97, 0.93)
  const bgRed = rgb(0.98, 0.92, 0.92)
  const bgAmber = rgb(0.99, 0.96, 0.88)
  const bgLight = rgb(0.96, 0.96, 0.96)
  const lineGray = rgb(0.85, 0.85, 0.85)

  const pageW = 595.28 // A4
  const pageH = 841.89
  const margin = 50
  const contentW = pageW - margin * 2

  const pages: PDFPage[] = []
  let page: PDFPage = pdf.addPage([pageW, pageH])
  pages.push(page)
  let y = pageH - margin

  function addPage(): void {
    page = pdf.addPage([pageW, pageH])
    pages.push(page)
    y = pageH - margin
  }

  function checkSpace(needed: number): void {
    if (y - needed < margin + 20) addPage()
  }

  function drawText(text: string, x: number, yPos: number, options: { font?: PDFFont; size?: number; color?: RGB } = {}): void {
    const f = options.font || font
    const s = options.size || 10
    const c = options.color || black
    page.drawText(text, { x, y: yPos, size: s, font: f, color: c })
  }

  function drawRect(x: number, yPos: number, w: number, h: number, color: RGB): void {
    page.drawRectangle({ x, y: yPos, width: w, height: h, color })
  }

  function drawLine(yPos: number): void {
    page.drawLine({ start: { x: margin, y: yPos }, end: { x: margin + contentW, y: yPos }, thickness: 0.5, color: lineGray })
  }

  // Wrap text to fit within maxWidth, returns lines
  function wrapText(text: string, f: PDFFont, size: number, maxWidth: number): string[] {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word
      const width = f.widthOfTextAtSize(testLine, size)
      if (width > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
      } else {
        currentLine = testLine
      }
    }
    if (currentLine) lines.push(currentLine)
    return lines
  }

  // ─── Header ─────────────────────────────────────────────────────
  drawRect(0, pageH - 105, pageW, 105, tomtlyGreen)
  // Subtle accent line at bottom of header
  drawRect(0, pageH - 109, pageW, 4, darkGreen)

  drawText('DOK-ANALYSE', margin, pageH - 42, { font: fontBold, size: 24, color: white })
  drawText('Det offentlige kartgrunnlaget – fullstendighetsdekning', margin, pageH - 62, { size: 11, color: rgb(0.8, 0.9, 0.83) })
  const dateStr = new Date().toLocaleDateString('nb-NO', { day: '2-digit', month: 'long', year: 'numeric' })
  drawText(`Rapport generert: ${dateStr}`, margin, pageH - 78, { size: 9, color: rgb(0.7, 0.8, 0.73) })
  drawText('Tomtly.no – en tjeneste fra NOPS AS', margin, pageH - 92, { size: 8, color: rgb(0.6, 0.72, 0.64) })
  y = pageH - 125

  // ─── Map Image ──────────────────────────────────────────────────
  if (mapImageBytes) {
    try {
      const mapImage = await pdf.embedPng(mapImageBytes)
      const mapSize = 180
      checkSpace(mapSize + 30)
      // Map on the right side, property info on the left
      const mapX = margin + contentW - mapSize
      const mapY = y - mapSize - 5

      // Border around map
      drawRect(mapX - 2, mapY - 2, mapSize + 4, mapSize + 4, lineGray)
      page.drawImage(mapImage, { x: mapX, y: mapY, width: mapSize, height: mapSize })
      drawText('Kartutsnitt (Kartverket Topografisk)', mapX, mapY - 12, { size: 7, color: lightGray })

      // Eiendomsinfo to the left of the map
      drawRect(margin, mapY - 2, contentW - mapSize - 15, mapSize + 4, bgLight)
      drawText('EIENDOMSINFORMASJON', margin + 12, y - 20, { font: fontBold, size: 11, color: tomtlyGreen })

      const info = [
        adresse ? `Adresse: ${adresse}` : null,
        kommune ? `Kommune: ${kommune}` : null,
        gnr && bnr ? `Gnr/Bnr: ${gnr}/${bnr}` : null,
        `Koordinater: ${Number(lat).toFixed(5)}, ${Number(lon).toFixed(5)}`,
        `Datasett sjekket: ${coverages.length}`,
      ].filter(Boolean) as string[]

      info.forEach((line, i) => {
        drawText(line, margin + 12, y - 40 - i * 16, { size: 9, color: gray })
      })

      y = mapY - 20
    } catch {
      // Map embedding failed – fall through to non-map layout
      drawMapFallback()
    }
  } else {
    drawMapFallback()
  }

  function drawMapFallback(): void {
    // Eiendomsinfo without map
    checkSpace(90)
    drawRect(margin, y - 70, contentW, 70, bgLight)
    drawText('EIENDOMSINFORMASJON', margin + 12, y - 18, { font: fontBold, size: 11, color: tomtlyGreen })
    const info = [
      adresse ? `Adresse: ${adresse}` : null,
      kommune ? `Kommune: ${kommune}` : null,
      gnr && bnr ? `Gnr/Bnr: ${gnr}/${bnr}` : null,
      `Koordinater: ${Number(lat).toFixed(5)}, ${Number(lon).toFixed(5)}`,
    ].filter(Boolean) as string[]
    info.forEach((line, i) => {
      drawText(line, margin + 12, y - 38 - i * 14, { size: 9, color: gray })
    })
    y -= 85
  }

  // ─── Oppsummering ──────────────────────────────────────────────
  checkSpace(90)
  drawText('OPPSUMMERING', margin, y, { font: fontBold, size: 13, color: black })
  y -= 5
  drawRect(margin, y - 1, 60, 3, tomtlyGreen) // accent underline
  y -= 20

  const funnTotal = coverages.filter(c => c.coverageStatus?.toLowerCase().includes('med funn')).length
  const okTotal = coverages.filter(c => {
    const s = c.coverageStatus?.toLowerCase() || ''
    return (s.includes('kartlagt') && !s.includes('med funn') && !s.includes('ikke kartlagt')) || s.includes('ikke relevant')
  }).length
  const ikkeKartlagt = coverages.filter(c => c.coverageStatus?.toLowerCase().includes('ikke kartlagt')).length

  // Summary boxes
  const boxW = (contentW - 20) / 3
  const boxH = 45

  // Funn box
  drawRect(margin, y - boxH, boxW, boxH, funnTotal > 0 ? bgRed : bgLight)
  drawRect(margin, y, boxW, 3, funnTotal > 0 ? red : lineGray)
  drawText(String(funnTotal), margin + 12, y - 28, { font: fontBold, size: 20, color: funnTotal > 0 ? red : gray })
  drawText('Med funn', margin + 12, y - 42, { size: 8, color: funnTotal > 0 ? darkRed : gray })

  // OK box
  drawRect(margin + boxW + 10, y - boxH, boxW, boxH, bgGreen)
  drawRect(margin + boxW + 10, y, boxW, 3, tomtlyGreen)
  drawText(String(okTotal), margin + boxW + 22, y - 28, { font: fontBold, size: 20, color: tomtlyGreen })
  drawText('Kartlagt OK', margin + boxW + 22, y - 42, { size: 8, color: darkGreen })

  // Ikke kartlagt box
  drawRect(margin + 2 * (boxW + 10), y - boxH, boxW, boxH, bgAmber)
  drawRect(margin + 2 * (boxW + 10), y, boxW, 3, amber)
  drawText(String(ikkeKartlagt), margin + 2 * (boxW + 10) + 12, y - 28, { font: fontBold, size: 20, color: amber })
  drawText('Ikke kartlagt', margin + 2 * (boxW + 10) + 12, y - 42, { size: 8, color: amber })

  y -= boxH + 25

  // ─── Naturfare-vurdering ────────────────────────────────────────
  checkSpace(200)
  drawText('NATURFARE-VURDERING', margin, y, { font: fontBold, size: 13, color: black })
  y -= 5
  drawRect(margin, y - 1, 60, 3, tomtlyGreen)
  y -= 18

  drawText('Oversikt over sentrale risikofaktorer iht. TEK17 og PBL § 28-1.', margin, y, { size: 8, color: lightGray, font: fontItalic })
  y -= 18

  // Table header
  drawRect(margin, y - 16, contentW, 16, tomtlyGreen)
  drawText('Risikofaktor', margin + 8, y - 12, { font: fontBold, size: 8, color: white })
  drawText('Status', margin + contentW * 0.55, y - 12, { font: fontBold, size: 8, color: white })
  drawText('Vurdering', margin + contentW * 0.78, y - 12, { font: fontBold, size: 8, color: white })
  y -= 18

  for (let i = 0; i < NATURFARE_ITEMS.length; i++) {
    checkSpace(18)
    const item = NATURFARE_ITEMS[i]

    // Find relevant coverages
    const relevant = coverages.filter(c => {
      const name = (c.layerName || '').toLowerCase()
      return item.keywords.some(kw => name.includes(kw))
    })

    const hasFunn = relevant.some(c => c.coverageStatus?.toLowerCase().includes('med funn'))
    const hasData = relevant.length > 0
    const allIkkeKartlagt = relevant.every(c => c.coverageStatus?.toLowerCase().includes('ikke kartlagt'))

    let statusText: string
    let statusColor: RGB
    let vurdering: string
    let rowBg: RGB

    if (!hasData || allIkkeKartlagt) {
      statusText = 'Ikke kartlagt'
      statusColor = amber
      vurdering = 'Mangler data'
      rowBg = i % 2 === 0 ? bgAmber : rgb(0.98, 0.95, 0.87)
    } else if (hasFunn) {
      statusText = 'Dekket – funn'
      statusColor = red
      vurdering = 'Krever vurdering'
      rowBg = i % 2 === 0 ? bgRed : rgb(0.97, 0.91, 0.91)
    } else {
      statusText = 'Dekket – OK'
      statusColor = tomtlyGreen
      vurdering = 'Ingen registrert fare'
      rowBg = i % 2 === 0 ? bgGreen : rgb(0.91, 0.96, 0.92)
    }

    drawRect(margin, y - 14, contentW, 16, rowBg)
    drawText(item.navn, margin + 8, y - 10, { size: 8, color: black })
    drawText(statusText, margin + contentW * 0.55, y - 10, { size: 8, font: fontBold, color: statusColor })
    drawText(vurdering, margin + contentW * 0.78, y - 10, { size: 8, color: lightGray })
    y -= 16
  }

  y -= 15

  // ─── Detaljert gjennomgang per kategori ──────────────────────────
  checkSpace(30)
  drawText('DETALJERT GJENNOMGANG', margin, y, { font: fontBold, size: 13, color: black })
  y -= 5
  drawRect(margin, y - 1, 60, 3, tomtlyGreen)
  y -= 20

  for (const group of groups) {
    if (group.coverages.length === 0) continue

    const neededHeight = 40 + group.coverages.length * 15
    checkSpace(Math.min(neededHeight, 120))

    const hasFunn = group.coverages.some(c => c.coverageStatus?.toLowerCase().includes('med funn'))

    // Colored left bar + header background
    const headerH = 24
    const barColor = hasFunn ? red : tomtlyGreen
    const headerBg = hasFunn ? bgRed : bgGreen

    drawRect(margin, y - headerH, contentW, headerH, headerBg)
    drawRect(margin, y - headerH, 4, headerH, barColor)  // colored left accent bar

    // Status icon indicator
    const iconText = hasFunn ? '!' : '\u2713'
    drawRect(margin + 10, y - headerH + 4, 16, 16, barColor)
    drawText(iconText, margin + 14, y - headerH + 7, { font: fontBold, size: 10, color: white })

    drawText(
      `${group.navn.toUpperCase()}`,
      margin + 32, y - 10,
      { font: fontBold, size: 10, color: hasFunn ? darkRed : darkGreen }
    )
    drawText(
      `${group.coverages.length} datasett${hasFunn ? ' – FUNN REGISTRERT' : ' – ingen registrert fare'}`,
      margin + 32, y - 20,
      { size: 8, color: hasFunn ? red : tomtlyGreen }
    )
    y -= headerH + 4

    // Table header row
    drawRect(margin, y - 12, contentW, 12, rgb(0.93, 0.93, 0.93))
    drawText('Datasett', margin + 8, y - 9, { font: fontBold, size: 7, color: gray })
    drawText('Status', margin + contentW * 0.58, y - 9, { font: fontBold, size: 7, color: gray })
    drawText('Oppdatert', margin + contentW * 0.83, y - 9, { font: fontBold, size: 7, color: gray })
    y -= 14

    for (let ci = 0; ci < group.coverages.length; ci++) {
      checkSpace(15)
      const c = group.coverages[ci]
      const status = c.coverageStatus || 'Ukjent'
      const isFunn = status.toLowerCase().includes('med funn')

      // Alternating row background
      if (ci % 2 === 0) {
        drawRect(margin, y - 12, contentW, 14, rgb(0.98, 0.98, 0.98))
      }

      // Truncate long names
      const maxNameW = contentW * 0.55
      let name = c.layerName
      while (font.widthOfTextAtSize(name, 8) > maxNameW && name.length > 10) {
        name = name.substring(0, name.length - 4) + '...'
      }

      const maxStatusW = contentW * 0.23
      let statusShort = status
      while (font.widthOfTextAtSize(statusShort, 8) > maxStatusW && statusShort.length > 10) {
        statusShort = statusShort.substring(0, statusShort.length - 4) + '...'
      }

      const updated = c.lastUpdated ? c.lastUpdated.substring(0, 10) : '–'

      drawText(name, margin + 8, y - 9, { size: 8, color: black })
      drawText(statusShort, margin + contentW * 0.58, y - 9, { size: 8, color: isFunn ? red : tomtlyGreen })
      drawText(updated, margin + contentW * 0.83, y - 9, { size: 7, color: lightGray })
      y -= 14
    }
    y -= 10
  }

  // ─── Øvrige datasett ────────────────────────────────────────────
  if (annet.length > 0) {
    checkSpace(40)
    drawRect(margin, y - 24, contentW, 24, bgLight)
    drawRect(margin, y - 24, 4, 24, lightGray)
    drawText(`ØVRIGE DATASETT (${annet.length})`, margin + 12, y - 10, { font: fontBold, size: 10, color: gray })
    drawText('Datasett som ikke tilhører hovedkategoriene', margin + 12, y - 20, { size: 7, color: lightGray })
    y -= 30

    for (let ci = 0; ci < Math.min(annet.length, 30); ci++) {
      checkSpace(14)
      const c = annet[ci]
      const isFunn = (c.coverageStatus || '').toLowerCase().includes('med funn')

      if (ci % 2 === 0) {
        drawRect(margin, y - 11, contentW, 13, rgb(0.98, 0.98, 0.98))
      }

      let name = c.layerName
      while (font.widthOfTextAtSize(name, 8) > contentW * 0.55 && name.length > 10) {
        name = name.substring(0, name.length - 4) + '...'
      }
      let status = c.coverageStatus || 'Ukjent'
      while (font.widthOfTextAtSize(status, 8) > contentW * 0.23 && status.length > 10) {
        status = status.substring(0, status.length - 4) + '...'
      }

      drawText(name, margin + 8, y - 8, { size: 7, color: black })
      drawText(status, margin + contentW * 0.58, y - 8, { size: 7, color: isFunn ? red : tomtlyGreen })
      y -= 13
    }
    if (annet.length > 30) {
      drawText(`... og ${annet.length - 30} flere datasett`, margin + 8, y - 8, { size: 7, color: lightGray, font: fontItalic })
      y -= 13
    }
    y -= 10
  }

  // ─── Konklusjon ─────────────────────────────────────────────────
  checkSpace(120)
  drawText('KONKLUSJON', margin, y, { font: fontBold, size: 13, color: black })
  y -= 5
  drawRect(margin, y - 1, 60, 3, tomtlyGreen)
  y -= 20

  // Build conclusion text
  const conclusionLines: string[] = []

  if (funnTotal === 0 && ikkeKartlagt === 0) {
    conclusionLines.push(
      `Analysen av ${coverages.length} datasett fra Det offentlige kartgrunnlaget viser at eiendommen` +
      (adresse ? ` (${adresse})` : '') +
      ` ikke har registrerte funn i noen av de kontrollerte risikokategoriene. Samtlige datasett er kartlagt og viser ingen kjente restriksjoner.`
    )
    conclusionLines.push(
      'Basert på tilgjengelige kartdata vurderes eiendommen som egnet for utbygging uten kjente arealrelaterte begrensninger.'
    )
  } else {
    conclusionLines.push(
      `Analysen av ${coverages.length} datasett fra Det offentlige kartgrunnlaget for eiendommen` +
      (adresse ? ` (${adresse})` : '') +
      ` viser følgende:`
    )

    if (funnTotal > 0) {
      const funnGroups = groups.filter(g => g.coverages.some(c => c.coverageStatus?.toLowerCase().includes('med funn')))
      const funnNames = funnGroups.map(g => g.navn.toLowerCase()).join(', ')
      conclusionLines.push(
        `Det er registrert funn i ${funnTotal} datasett. Kategorier med funn: ${funnNames}. Disse forholdene bør utredes nærmere som del av en ROS-analyse eller reguleringsplanarbeid.`
      )
    }

    if (ikkeKartlagt > 0) {
      conclusionLines.push(
        `${ikkeKartlagt} datasett mangler kartlegging for dette området. Det anbefales å kontakte kommunen for å avklare om det foreligger lokalkunnskap eller suppleringsbehov.`
      )
    }

    if (okTotal > 0) {
      conclusionLines.push(
        `${okTotal} datasett er kartlagt uten registrerte funn, noe som indikerer at disse forholdene ikke utgjør kjente begrensninger for eiendommen.`
      )
    }
  }

  conclusionLines.push(
    'Merk: Denne rapporten er basert på tilgjengelige nasjonale kartdata og erstatter ikke stedsspesifikke grunnundersøkelser, geotekniske vurderinger eller kommunale dispensasjoner.'
  )

  for (const para of conclusionLines) {
    const wrapped = wrapText(para, font, 9, contentW - 10)
    checkSpace(wrapped.length * 13 + 8)
    for (const line of wrapped) {
      drawText(line, margin + 5, y, { size: 9, color: rgb(0.2, 0.2, 0.2) })
      y -= 13
    }
    y -= 5
  }

  y -= 10

  // ─── Footer / disclaimer ────────────────────────────────────────
  checkSpace(50)
  drawLine(y)
  y -= 12
  drawText('Datakilde: Kartverket – DOK fullstendighetsdekning (kartverket-ogc-api.azurewebsites.net)', margin, y, { size: 7, color: lightGray })
  y -= 10
  drawText('Denne rapporten er automatisk generert og er veiledende. For juridisk bindende informasjon, kontakt kommunen.', margin, y, { size: 7, color: lightGray })
  y -= 10
  drawText('Tomtly.no – en tjeneste fra NOPS AS (org.nr 933 819 086) | hey@nops.no', margin, y, { size: 7, color: lightGray })

  // ─── Page numbers ───────────────────────────────────────────────
  const totalPages = pages.length
  for (let i = 0; i < totalPages; i++) {
    const p = pages[i]
    const pageNumText = `Side ${i + 1} av ${totalPages}`
    const textWidth = font.widthOfTextAtSize(pageNumText, 8)
    p.drawText(pageNumText, {
      x: pageW - margin - textWidth,
      y: 25,
      size: 8,
      font,
      color: lightGray,
    })
    // Also add a subtle footer line on every page
    p.drawLine({
      start: { x: margin, y: 38 },
      end: { x: pageW - margin, y: 38 },
      thickness: 0.3,
      color: lineGray,
    })
    // Tomtly branding on each page footer
    p.drawText('DOK-analyse | Tomtly.no', {
      x: margin,
      y: 25,
      size: 7,
      font: fontItalic,
      color: rgb(0.75, 0.75, 0.75),
    })
  }

  // 5. Returner PDF
  const pdfBytes = await pdf.save()

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="DOK-analyse-${gnr || ''}-${bnr || ''}.pdf"`,
    },
  })
}
