'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ChevronRight, MapPin, ShoppingBag, GraduationCap, Bus, TreePine } from 'lucide-react'
import { formatNOK, formatM2 } from '@/lib/utils'
import { ALLE_TOMTER as TOMTER } from '@/lib/tomter-data'

export default function KartSide() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [mapLoaded, setMapLoaded] = useState(false)

  const filtered = search
    ? TOMTER.filter(t =>
        t.adresse.toLowerCase().includes(search.toLowerCase()) ||
        t.poststed.toLowerCase().includes(search.toLowerCase())
      )
    : TOMTER

  const selected = TOMTER.find(t => t.id === selectedId)

  useEffect(() => {
    // Load Leaflet from CDN
    if (typeof window === 'undefined') return

    const loadLeaflet = async () => {
      // Add CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const css = document.createElement('link')
        css.rel = 'stylesheet'
        css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(css)
      }

      // Add JS
      if (!(window as any).L) {
        await new Promise<void>((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
          script.onload = () => resolve()
          document.head.appendChild(script)
        })
      }

      const L = (window as any).L
      if (!mapRef.current || mapRef.current.querySelector('.leaflet-container')) return

      // Create map centered on Nesodden
      // Beregn senterpunkt fra alle tomter
      const avgLat = TOMTER.reduce((s, t) => s + t.lat, 0) / TOMTER.length
      const avgLng = TOMTER.reduce((s, t) => s + t.lng, 0) / TOMTER.length
      const map = L.map(mapRef.current).setView([avgLat, avgLng], TOMTER.length > 3 ? 10 : 12)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(map)

      // Custom green marker icon
      const greenIcon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background:#2d5a3d;width:32px;height:32px;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:12px;"></div>',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      })

      // Add markers for each tomt
      TOMTER.forEach(tomt => {
        const marker = L.marker([tomt.lat, tomt.lng], { icon: greenIcon }).addTo(map)

        const popupContent = `
          <div style="min-width:200px;font-family:system-ui,sans-serif;">
            <img src="${tomt.bilde}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:8px 8px 0 0;margin:-15px -15px 10px -15px;width:calc(100% + 30px);" />
            <strong style="font-size:14px;">${tomt.adresse}</strong><br/>
            <span style="color:#666;font-size:12px;">${tomt.poststed}, ${tomt.kommune}</span><br/>
            <span style="font-size:12px;">${tomt.areal_m2} m2 &middot; ${(tomt.pris / 1000000).toFixed(1)} MNOK</span><br/>
            <div style="margin-top:8px;">
              ${tomt.poi.map(p => `<span style="font-size:11px;color:#555;">&#128205; ${p.navn} &ndash; ${p.avstand}</span><br/>`).join('')}
            </div>
            <a href="/tomter/${tomt.id}" style="display:block;text-align:center;margin-top:10px;padding:8px;background:#2d5a3d;color:white;text-decoration:none;border-radius:6px;font-size:13px;font-weight:500;">Se tomten &rarr;</a>
          </div>
        `

        marker.bindPopup(popupContent, { maxWidth: 280 })
        marker.on('click', () => {
          // Highlight in sidebar
          const event = new CustomEvent('tomt-selected', { detail: tomt.id })
          window.dispatchEvent(event)
        })
      })

      setMapLoaded(true)
    }

    loadLeaflet()
  }, [])

  useEffect(() => {
    const handler = (e: CustomEvent) => setSelectedId(e.detail)
    window.addEventListener('tomt-selected' as any, handler)
    return () => window.removeEventListener('tomt-selected' as any, handler)
  }, [])

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r border-brand-200 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-brand-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
            <input
              type="text"
              placeholder="Sok kommune, sted..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <p className="text-xs text-brand-400 mt-2">{filtered.length} tomter</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.map((t) => (
            <div key={t.id} className={`border-b border-brand-100 ${selectedId === t.id ? 'bg-forest-50 border-l-2 border-l-tomtly-accent' : ''}`}>
              <button
                onClick={() => setSelectedId(selectedId === t.id ? null : t.id)}
                className="w-full text-left p-4 hover:bg-brand-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.bilde} alt="" className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-tomtly-dark truncate">{t.adresse}</h3>
                    <p className="text-xs text-brand-500">{t.poststed}, {t.kommune}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-brand-500">{formatM2(t.areal_m2)}</span>
                      <span className="text-xs font-semibold text-tomtly-dark">{formatNOK(t.pris)}</span>
                    </div>
                  </div>
                </div>
              </button>

              {selectedId === t.id && (
                <div className="px-4 pb-4 space-y-3">
                  {/* POI - Points of interest */}
                  <div className="bg-brand-50 rounded-lg p-3">
                    <p className="text-xs font-semibold text-brand-700 mb-2">I naerheten</p>
                    <div className="space-y-1.5">
                      {t.poi.map((p, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-brand-600">
                          {p.type === 'bus' && <Bus className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />}
                          {p.type === 'skole' && <GraduationCap className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />}
                          {p.type === 'butikk' && <ShoppingBag className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />}
                          {p.type === 'natur' && <TreePine className="w-3.5 h-3.5 text-forest-500 flex-shrink-0" />}
                          <span>{p.navn}</span>
                          <span className="text-brand-400 ml-auto">{p.avstand}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/tomter/${t.id}`}
                    className="flex items-center justify-center gap-1 w-full px-3 py-2.5 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 transition-colors"
                  >
                    Se tomten <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="absolute inset-0" />
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-100">
            <p className="text-brand-500">Laster kart...</p>
          </div>
        )}
      </div>
    </div>
  )
}
