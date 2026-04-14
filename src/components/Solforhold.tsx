'use client'

import { useState, useRef, useEffect } from 'react'
import { Sun } from 'lucide-react'

function getSunPath(lat: number, month: number) {
  const rad = Math.PI / 180
  const decl = [-23.0, -17.5, -8.0, 4.0, 15.0, 23.5, 23.5, 15.0, 4.0, -8.0, -17.5, -23.0]
  const d = decl[month]
  const points: { hour: number; altitude: number; azimuth: number }[] = []
  for (let h = 0; h <= 24; h += 0.5) {
    const ha = (h - 12) * 15
    const sinAlt = Math.sin(lat * rad) * Math.sin(d * rad) + Math.cos(lat * rad) * Math.cos(d * rad) * Math.cos(ha * rad)
    const alt = Math.asin(sinAlt) / rad
    if (alt <= 0) continue
    const cosAz = (Math.sin(d * rad) - Math.sin(lat * rad) * sinAlt) / (Math.cos(lat * rad) * Math.cos(Math.asin(sinAlt)))
    let az = Math.acos(Math.max(-1, Math.min(1, cosAz))) / rad
    if (ha > 0) az = 360 - az
    points.push({ hour: h, altitude: alt, azimuth: az })
  }
  return points
}

function formatTime(h: number) {
  return `${Math.floor(h).toString().padStart(2, '0')}:${Math.round((h % 1) * 60).toString().padStart(2, '0')}`
}

interface Props { lat: number; lon: number }

export function Solforhold({ lat, lon }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(5)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
  const path = getSunPath(lat, selectedMonth)
  const sunrise = path.length > 0 ? path[0].hour : 0
  const sunset = path.length > 0 ? path[path.length - 1].hour : 0
  const maxAlt = path.length > 0 ? Math.max(...path.map(p => p.altitude)) : 0
  const dayLength = sunset - sunrise

  // Draw map with sun path overlay
  useEffect(() => {
    if (!canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')!

    const zoom = 16
    const tileSize = 256
    canvas.width = tileSize * 3
    canvas.height = tileSize * 3
    const n = Math.pow(2, zoom)
    const centerTileX = Math.floor((lon + 180) / 360 * n)
    const latRad = lat * Math.PI / 180
    const centerTileY = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n)

    let loaded = 0
    const total = 9

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const img = new Image()
        img.crossOrigin = 'anonymous'
        const gx = dx + 1, gy = dy + 1
        img.onload = () => {
          ctx.drawImage(img, gx * tileSize, gy * tileSize, tileSize, tileSize)
          loaded++
          if (loaded === total) drawSunOverlay()
        }
        img.onerror = () => { loaded++; if (loaded === total) drawSunOverlay() }
        img.src = `https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/${zoom}/${centerTileY + dy}/${centerTileX + dx}.png`
      }
    }

    function drawSunOverlay() {
      const cx = canvas.width / 2
      const cy = canvas.height / 2

      // Semi-transparent overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw compass rose
      const radius = Math.min(canvas.width, canvas.height) / 2 - 30
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.15)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 4])
      ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.stroke()
      ctx.beginPath(); ctx.arc(cx, cy, radius * 0.66, 0, Math.PI * 2); ctx.stroke()
      ctx.beginPath(); ctx.arc(cx, cy, radius * 0.33, 0, Math.PI * 2); ctx.stroke()
      ctx.setLineDash([])

      // N/S/E/W labels
      ctx.font = 'bold 14px Inter, system-ui'
      ctx.fillStyle = '#1a1a1a'
      ctx.textAlign = 'center'
      ctx.fillText('N', cx, cy - radius - 8)
      ctx.fillText('S', cx, cy + radius + 16)
      ctx.fillText('Ø', cx + radius + 12, cy + 5)
      ctx.fillText('V', cx - radius - 12, cy + 5)

      // Draw sun paths for 3 seasons
      const seasons = [
        { month: 5, color: '#f59e0b', label: 'Sommer' },  // June
        { month: 2, color: '#22c55e', label: 'Vår/Høst' }, // March
        { month: 11, color: '#3b82f6', label: 'Vinter' },  // December
      ]

      seasons.forEach(season => {
        const spath = getSunPath(lat, season.month)
        if (spath.length < 2) return

        ctx.beginPath()
        ctx.strokeStyle = season.color
        ctx.lineWidth = season.month === selectedMonth ? 4 : 2
        ctx.globalAlpha = season.month === selectedMonth ? 1 : 0.5

        spath.forEach((p, i) => {
          // Convert azimuth to x,y (N=top, E=right, S=bottom, W=left)
          const azRad = (p.azimuth - 90) * Math.PI / 180 // Rotate so N=top
          const dist = radius * (1 - p.altitude / 90)
          const x = cx + Math.cos(azRad) * dist
          const y = cy + Math.sin(azRad) * dist
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.stroke()
        ctx.globalAlpha = 1

        // Hour markers for selected month
        if (season.month === selectedMonth) {
          spath.filter(p => p.hour === Math.floor(p.hour) && p.hour >= 6 && p.hour <= 21).forEach(p => {
            const azRad = (p.azimuth - 90) * Math.PI / 180
            const dist = radius * (1 - p.altitude / 90)
            const x = cx + Math.cos(azRad) * dist
            const y = cy + Math.sin(azRad) * dist

            ctx.beginPath()
            ctx.arc(x, y, 4, 0, Math.PI * 2)
            ctx.fillStyle = season.color
            ctx.fill()

            ctx.font = '10px Inter, system-ui'
            ctx.fillStyle = '#1a1a1a'
            ctx.textAlign = 'center'
            ctx.fillText(Math.floor(p.hour).toString(), x, y - 8)
          })
        }
      })

      // Center marker (property location)
      ctx.beginPath()
      ctx.arc(cx, cy, 6, 0, Math.PI * 2)
      ctx.fillStyle = '#e11d48'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()

      // Legend
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
      ctx.fillRect(10, canvas.height - 50, 190, 42)
      ctx.strokeStyle = '#e5e7eb'
      ctx.lineWidth = 1
      ctx.strokeRect(10, canvas.height - 50, 190, 42)

      seasons.forEach((s, i) => {
        ctx.beginPath()
        ctx.strokeStyle = s.color
        ctx.lineWidth = 2
        ctx.moveTo(20, canvas.height - 38 + i * 13)
        ctx.lineTo(40, canvas.height - 38 + i * 13)
        ctx.stroke()
        ctx.font = '10px Inter, system-ui'
        ctx.fillStyle = '#374151'
        ctx.textAlign = 'left'
        ctx.fillText(s.label, 45, canvas.height - 34 + i * 13)
      })

      setMapLoaded(true)
    }
  }, [lat, lon, selectedMonth])

  const seasonData = months.map((_, m) => {
    const p = getSunPath(lat, m)
    const sr = p.length > 0 ? p[0].hour : 0
    const ss = p.length > 0 ? p[p.length - 1].hour : 0
    return { month: months[m], hours: ss - sr, maxAlt: p.length > 0 ? Math.max(...p.map(x => x.altitude)) : 0 }
  })

  return (
    <div className="bg-white rounded-2xl border border-brand-100 p-6 shadow-sm">
      <h2 className="font-display text-lg font-bold text-tomtly-dark mb-1 flex items-center gap-2">
        <Sun className="w-5 h-5 text-amber-500" />
        Solforhold
      </h2>
      <p className="text-xs text-brand-400 mb-4">Solbane for breddegrad {lat.toFixed(2)}°N. Kart: Kartverket.</p>

      {/* Month selector */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {months.map((m, i) => (
          <button key={m} onClick={() => setSelectedMonth(i)}
            className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors shrink-0 ${selectedMonth === i ? 'bg-amber-500 text-white' : 'bg-brand-100 text-brand-500 hover:bg-brand-200'}`}
          >{m}</button>
        ))}
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {[
          { label: 'Soloppgang', value: formatTime(sunrise) },
          { label: 'Solnedgang', value: formatTime(sunset) },
          { label: 'Dagslys', value: `${Math.floor(dayLength)}t ${Math.round((dayLength % 1) * 60)}m` },
          { label: 'Maks høyde', value: `${maxAlt.toFixed(0)}°` },
        ].map(s => (
          <div key={s.label} className="bg-amber-50 rounded-lg p-2 text-center border border-amber-100">
            <p className="text-[9px] text-amber-600 uppercase">{s.label}</p>
            <p className="text-sm font-bold text-tomtly-dark">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Map with sun path */}
      <div className="relative rounded-lg overflow-hidden border border-brand-200 mb-4 max-w-sm mx-auto">
        <canvas ref={canvasRef} className="w-full" style={{ aspectRatio: '1' }} />
        {!mapLoaded && (
          <div className="absolute inset-0 bg-brand-50 flex items-center justify-center">
            <p className="text-xs text-brand-500">Laster solkart...</p>
          </div>
        )}
      </div>

      {/* Annual overview */}
      <h3 className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">Årsoversikt – dagslys og solhøyde</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-1.5">
        {seasonData.map((s, i) => (
          <button key={s.month} onClick={() => setSelectedMonth(i)}
            className={`text-center p-1.5 rounded text-[10px] transition-colors ${selectedMonth === i ? 'bg-amber-100 border border-amber-300' : 'bg-brand-50 hover:bg-brand-100'}`}
          >
            <p className="font-semibold text-brand-700">{s.month}</p>
            <p className="text-amber-700">{s.hours.toFixed(1)}t</p>
            <p className="text-brand-400">{s.maxAlt.toFixed(0)}°</p>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-brand-400 mt-2">
        Solbanen viser solen sin bevegelse over himmelen sett ovenfra. Sirkler = 30°, 60° over horisonten. Tar ikke hensyn til terreng eller bygninger.
      </p>
    </div>
  )
}
