'use client'

import { useState } from 'react'
import { Sun } from 'lucide-react'

// Forenklet solposisjon-beregning basert på latitude
function getSunPath(lat: number, month: number) {
  const rad = Math.PI / 180
  // Approx declination for each month
  const decl = [
    -23.0, -17.5, -8.0, 4.0, 15.0, 23.5, // Jan-Jun
    23.5, 15.0, 4.0, -8.0, -17.5, -23.0,  // Jul-Dec
  ]
  const d = decl[month]

  const points: { hour: number; altitude: number; azimuth: number }[] = []
  for (let h = 0; h <= 24; h += 0.5) {
    const hourAngle = (h - 12) * 15
    const sinAlt = Math.sin(lat * rad) * Math.sin(d * rad) +
      Math.cos(lat * rad) * Math.cos(d * rad) * Math.cos(hourAngle * rad)
    const altitude = Math.asin(sinAlt) / rad
    if (altitude <= 0) continue

    const cosAz = (Math.sin(d * rad) - Math.sin(lat * rad) * sinAlt) /
      (Math.cos(lat * rad) * Math.cos(Math.asin(sinAlt)))
    let azimuth = Math.acos(Math.max(-1, Math.min(1, cosAz))) / rad
    if (hourAngle > 0) azimuth = 360 - azimuth

    points.push({ hour: h, altitude, azimuth })
  }
  return points
}

function getSunrise(path: { hour: number }[]) {
  return path.length > 0 ? path[0].hour : 0
}
function getSunset(path: { hour: number }[]) {
  return path.length > 0 ? path[path.length - 1].hour : 0
}
function getMaxAlt(path: { altitude: number }[]) {
  return path.length > 0 ? Math.max(...path.map(p => p.altitude)) : 0
}
function formatTime(h: number) {
  const hours = Math.floor(h)
  const mins = Math.round((h - hours) * 60)
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

interface Props {
  lat: number
  lon: number
}

export function Solforhold({ lat }: Props) {
  const [selectedMonth, setSelectedMonth] = useState(5) // Juni default

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
  const path = getSunPath(lat, selectedMonth)
  const sunrise = getSunrise(path)
  const sunset = getSunset(path)
  const maxAlt = getMaxAlt(path)
  const dayLength = sunset - sunrise

  // SVG sun path diagram (polar-ish)
  const svgW = 400, svgH = 200
  const cx = svgW / 2, cy = svgH - 10

  // Map azimuth (0-360) to x, altitude (0-90) to y
  function toSvg(az: number, alt: number): [number, number] {
    const x = cx + ((az - 180) / 180) * (svgW / 2 - 20)
    const y = cy - (alt / 90) * (svgH - 30)
    return [x, y]
  }

  // Build path string
  const pathStr = path.map((p, i) => {
    const [x, y] = toSvg(p.azimuth, p.altitude)
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  // Season data for all months
  const seasonData = months.map((_, m) => {
    const p = getSunPath(lat, m)
    return {
      month: months[m],
      sunrise: getSunrise(p),
      sunset: getSunset(p),
      hours: getSunset(p) - getSunrise(p),
      maxAlt: getMaxAlt(p),
    }
  })

  return (
    <div className="bg-white rounded-2xl border border-brand-100 p-6 shadow-sm">
      <h2 className="font-display text-lg font-bold text-tomtly-dark mb-1 flex items-center gap-2">
        <Sun className="w-5 h-5 text-amber-500" />
        Solforhold
      </h2>
      <p className="text-xs text-brand-400 mb-4">Beregnet solbane for denne lokasjonen (breddegrad {lat.toFixed(2)}°N)</p>

      {/* Month selector */}
      <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
        {months.map((m, i) => (
          <button
            key={m}
            onClick={() => setSelectedMonth(i)}
            className={`px-2.5 py-1 text-[10px] font-medium rounded-md transition-colors shrink-0 ${
              selectedMonth === i ? 'bg-amber-500 text-white' : 'bg-brand-100 text-brand-500 hover:bg-brand-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-100">
          <p className="text-[10px] text-amber-600 uppercase">Soloppgang</p>
          <p className="text-sm font-bold text-tomtly-dark">{formatTime(sunrise)}</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-100">
          <p className="text-[10px] text-amber-600 uppercase">Solnedgang</p>
          <p className="text-sm font-bold text-tomtly-dark">{formatTime(sunset)}</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-100">
          <p className="text-[10px] text-amber-600 uppercase">Dagslys</p>
          <p className="text-sm font-bold text-tomtly-dark">{Math.floor(dayLength)}t {Math.round((dayLength % 1) * 60)}m</p>
        </div>
        <div className="bg-amber-50 rounded-lg p-3 text-center border border-amber-100">
          <p className="text-[10px] text-amber-600 uppercase">Maks høyde</p>
          <p className="text-sm font-bold text-tomtly-dark">{maxAlt.toFixed(0)}°</p>
        </div>
      </div>

      {/* Sun path diagram */}
      <div className="bg-gradient-to-b from-sky-100 to-sky-50 rounded-lg p-3 mb-4 border border-sky-200">
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ maxHeight: '180px' }}>
          {/* Horizon line */}
          <line x1="10" y1={cy} x2={svgW - 10} y2={cy} stroke="#94a3b8" strokeWidth="1" />

          {/* Compass labels */}
          <text x="15" y={cy + 12} fontSize="9" fill="#64748b">Ø</text>
          <text x={cx - 3} y={cy + 12} fontSize="9" fill="#64748b">S</text>
          <text x={svgW - 20} y={cy + 12} fontSize="9" fill="#64748b">V</text>

          {/* Altitude grid */}
          {[15, 30, 45, 60].map(alt => {
            const y = cy - (alt / 90) * (svgH - 30)
            return (
              <g key={alt}>
                <line x1="10" y1={y} x2={svgW - 10} y2={y} stroke="#cbd5e1" strokeWidth="0.5" strokeDasharray="3,3" />
                <text x={svgW - 8} y={y + 3} fontSize="7" fill="#94a3b8" textAnchor="end">{alt}°</text>
              </g>
            )
          })}

          {/* Sun path */}
          {pathStr && (
            <path d={pathStr} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Hour markers */}
          {path.filter(p => p.hour === Math.floor(p.hour) && p.hour >= 6 && p.hour <= 21).map(p => {
            const [x, y] = toSvg(p.azimuth, p.altitude)
            return (
              <g key={p.hour}>
                <circle cx={x} cy={y} r="3" fill="#f59e0b" />
                <text x={x} y={y - 6} fontSize="7" fill="#92400e" textAnchor="middle">{Math.floor(p.hour)}</text>
              </g>
            )
          })}

          {/* Sun icon at peak */}
          {path.length > 0 && (() => {
            const peak = path.reduce((a, b) => a.altitude > b.altitude ? a : b)
            const [px, py] = toSvg(peak.azimuth, peak.altitude)
            return <circle cx={px} cy={py} r="6" fill="#fbbf24" stroke="#f59e0b" strokeWidth="1.5" />
          })()}
        </svg>
      </div>

      {/* Annual overview */}
      <h3 className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2">Årsoversikt</h3>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
        {seasonData.map((s, i) => (
          <div key={s.month} className={`text-center p-1.5 rounded text-[10px] ${
            selectedMonth === i ? 'bg-amber-100 border border-amber-300' : 'bg-brand-50'
          }`}>
            <p className="font-semibold text-brand-700">{s.month}</p>
            <p className="text-amber-700">{s.hours.toFixed(1)}t</p>
            <p className="text-brand-400">{s.maxAlt.toFixed(0)}°</p>
          </div>
        ))}
      </div>
      <p className="text-[10px] text-brand-400 mt-2">
        Beregnet solbane. Tar ikke hensyn til terreng, bygninger eller vegetasjon. Faktiske solforhold kan avvike.
      </p>
    </div>
  )
}
