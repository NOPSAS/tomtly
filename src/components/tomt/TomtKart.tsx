'use client'

import { MapPin } from 'lucide-react'

interface Props {
  lat: number
  lng: number
  adresse?: string
  zoom?: number
}

export function TomtKart({ lat, lng, adresse, zoom = 17 }: Props) {
  // Beregn bbox basert på zoom-nivå
  // Zoom 17 ≈ ~150m synlig, zoom 16 ≈ ~300m, zoom 18 ≈ ~75m
  const padding = 0.0015 * Math.pow(2, 17 - zoom)
  const bbox = `${lng - padding},${lat - padding},${lng + padding},${lat + padding}`
  const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`
  const osmLinkUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=${zoom}/${lat}/${lng}`

  return (
    <div className="rounded-xl border border-brand-200 overflow-hidden">
      <div className="aspect-square relative bg-brand-100">
        <iframe
          src={osmUrl}
          className="w-full h-full border-0"
          loading="lazy"
          title={adresse ? `Kart – ${adresse}` : `Kart – ${lat.toFixed(5)}, ${lng.toFixed(5)}`}
          allowFullScreen
        />
      </div>
      <div className="p-3 bg-white border-t border-brand-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-tomtly-accent" />
          <p className="text-xs text-brand-600 font-medium">
            {adresse || `${lat.toFixed(5)}, ${lng.toFixed(5)}`}
          </p>
        </div>
        <a
          href={osmLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-tomtly-accent hover:underline font-medium"
        >
          Åpne stort kart
        </a>
      </div>
    </div>
  )
}
