import { NextRequest, NextResponse } from 'next/server'

// Server-side proxy for Kartverket topografisk kart (WMTS tiles)
// Sammenstiller 3x3 tiles til ett komplett kartbilde med eiendom i sentrum

const TILE_BASE = 'https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator'

function latLonToTile(lat: number, lon: number, zoom: number) {
  const n = Math.pow(2, zoom)
  const x = Math.floor((lon + 180) / 360 * n)
  const latRad = lat * Math.PI / 180
  const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)
  return { x, y }
}

export async function POST(request: NextRequest) {
  let body: any = {}
  try { body = await request.json() } catch {}

  const { lat, lon, zoom = 17 } = body
  if (!lat || !lon) {
    return NextResponse.json({ error: 'lat og lon er påkrevd' }, { status: 400 })
  }

  const center = latLonToTile(lat, lon, zoom)

  // Fetch 3x3 grid of tiles around the center point
  const tileSize = 256
  const gridSize = 3
  const canvasWidth = tileSize * gridSize
  const canvasHeight = tileSize * gridSize

  // We can't use canvas server-side easily, so return tile URLs and coordinates
  // Frontend will composite them
  const tiles: { url: string; gridX: number; gridY: number }[] = []

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const tx = center.x + dx
      const ty = center.y + dy
      tiles.push({
        url: `${TILE_BASE}/${zoom}/${ty}/${tx}.png`,
        gridX: dx + 1,
        gridY: dy + 1,
      })
    }
  }

  // Calculate pixel position of the point within the 3x3 grid
  const n = Math.pow(2, zoom)
  const exactX = (lon + 180) / 360 * n
  const latRad = lat * Math.PI / 180
  const exactY = (1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n

  const pixelX = ((exactX - (center.x - 1)) * tileSize)
  const pixelY = ((exactY - (center.y - 1)) * tileSize)

  // Calculate meters per pixel at this zoom level
  const metersPerPixel = 156543.03392 * Math.cos(lat * Math.PI / 180) / Math.pow(2, zoom)

  return NextResponse.json({
    success: true,
    tiles,
    tileSize,
    gridSize,
    canvasWidth,
    canvasHeight,
    center: { x: center.x, y: center.y },
    pointPixel: { x: pixelX, y: pixelY },
    metersPerPixel,
    zoom,
  })
}
