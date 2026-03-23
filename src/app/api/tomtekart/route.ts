import { NextRequest, NextResponse } from 'next/server'

// Server-side proxy for FKB WMS og Høyde-API
// Unngår CORS-problemer fra frontend

const FKB_WMS = 'https://wms.geonorge.no/skwms1/wms.fkb'
const HOYDE_API = 'https://ws.geonorge.no/hoydedata/v1/datakilder'

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}

  const { type, bbox, opplosning = 5, punkter } = body

  // ─── FKB kartbilde ──────────────────────────────────────────
  if (type === 'fkb') {
    if (!bbox) return NextResponse.json({ error: 'bbox påkrevd' }, { status: 400 })

    const layers = body.layers || 'hoydekurver_1m,vann_omrade,ar5,veg,vegavgrensning,bygning,naturinfo'
    const url = `${FKB_WMS}?service=WMS&version=1.3.0&request=GetMap`
      + `&layers=${layers}&crs=EPSG:25833&bbox=${bbox}`
      + `&width=1200&height=1200&format=image/png&styles=&transparent=false`

    try {
      const res = await fetch(url)
      if (!res.ok) return NextResponse.json({ error: `FKB HTTP ${res.status}` }, { status: 502 })
      const buffer = await res.arrayBuffer()
      const base64 = Buffer.from(buffer).toString('base64')
      return NextResponse.json({ success: true, image: `data:image/png;base64,${base64}` })
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }

  // ─── Høydedata (DTM + DOM grid) ────────────────────────────
  if (type === 'terreng') {
    if (!bbox) return NextResponse.json({ error: 'bbox påkrevd' }, { status: 400 })

    const [minX, minY, maxX, maxY] = bbox as number[]
    const cols = Math.ceil((maxX - minX) / opplosning)
    const rows = Math.ceil((maxY - minY) / opplosning)

    // Bygg grid-punkter i EPSG:25833
    const allePunkter: number[][] = []
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        allePunkter.push([minX + c * opplosning, minY + r * opplosning])
      }
    }

    // Hent DTM og DOM i batches à 50
    async function hentHoyder(datakilde: string): Promise<{ z: number }[]> {
      const result: { z: number }[] = []
      for (let i = 0; i < allePunkter.length; i += 50) {
        const batch = allePunkter.slice(i, i + 50)
        const param = encodeURIComponent(JSON.stringify(batch))
        try {
          const res = await fetch(`${HOYDE_API}/${datakilde}/punkt?koordsys=25833&punkter=${param}`)
          if (res.ok) {
            const data = await res.json()
            result.push(...(data.punkter || []).map((p: any) => ({ z: p.z ?? 0 })))
          } else {
            // Fill with 0 for failed batches
            result.push(...batch.map(() => ({ z: 0 })))
          }
        } catch {
          result.push(...batch.map(() => ({ z: 0 })))
        }
        await new Promise(r => setTimeout(r, 50))
      }
      return result
    }

    const [dtm, dom] = await Promise.all([
      hentHoyder('dtm1'),
      hentHoyder('dom1'),
    ])

    return NextResponse.json({
      success: true,
      cols,
      rows,
      opplosning,
      bbox,
      dtm,
      dom,
      punkter: allePunkter.length,
    })
  }

  return NextResponse.json({ error: 'Ugyldig type. Bruk "fkb" eller "terreng".' }, { status: 400 })
}
