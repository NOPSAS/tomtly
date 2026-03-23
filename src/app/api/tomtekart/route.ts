import { NextRequest, NextResponse } from 'next/server'

// Server-side proxy for FKB WMS (unngår CORS)
// EPSG:25833 WMS 1.3.0 bruker akseorden: northing,easting (Y,X)

const FKB_WMS = 'https://wms.geonorge.no/skwms1/wms.fkb'

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}

  const { type } = body

  if (type === 'fkb') {
    // bbox kommer inn som [minEast, minNorth, maxEast, maxNorth] (standard)
    // WMS 1.3.0 EPSG:25833 krever: minNorth,minEast,maxNorth,maxEast
    const bbox = body.bbox as number[]
    if (!bbox || bbox.length !== 4) {
      return NextResponse.json({ error: 'bbox må være [minEast, minNorth, maxEast, maxNorth]' }, { status: 400 })
    }

    const [minE, minN, maxE, maxN] = bbox
    const wmsBbox = `${minN},${minE},${maxN},${maxE}` // Flip to north,east for WMS 1.3.0

    const layers = body.layers || 'hoydekurver_1m,vann_omrade,veg,vegavgrensning,bygning,naturinfo'
    const url = `${FKB_WMS}?service=WMS&version=1.3.0&request=GetMap`
      + `&layers=${layers}&crs=EPSG:25833&bbox=${wmsBbox}`
      + `&width=1200&height=1200&format=image/png&styles=&transparent=false`

    try {
      const res = await fetch(url)
      if (!res.ok) return NextResponse.json({ error: `FKB HTTP ${res.status}` }, { status: 502 })
      const buffer = await res.arrayBuffer()
      const base64 = Buffer.from(buffer).toString('base64')
      return NextResponse.json({ success: true, image: `data:image/png;base64,${base64}`, bbox })
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 })
    }
  }

  return NextResponse.json({ error: 'Ugyldig type. Bruk "fkb".' }, { status: 400 })
}
