'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { X, Search, Layers, Copy, Check, ExternalLink, Loader2, MapPin, Mountain, Ruler, FileText, Shield, ChevronUp } from 'lucide-react'

// ============================================================
// KARTUTFORSKER – Intern testside
// Fullskjerm kart med WMS-lag, eiendomsklikk og info-panel
// ============================================================

const PLANSLURPEN_API_KEY = '213ca4ee-0a90-4215-b7cf-0f94042c7cf2'
const PLANSLURPEN_BASE = 'https://www.planslurpen.no/api'

const TOMTLY_TOMTER = [
  { slug: 'alvaern-65', lat: 59.816, lng: 10.620, adresse: 'Gamle Alværnvei 65', areal: '1 374 m²', status: 'solgt' as const, pris: '3 200 000 kr' },
  { slug: 'alvaern-67', lat: 59.8155, lng: 10.6196, adresse: 'Gamle Alværnvei 67', areal: '900 m²', status: 'aktiv' as const, pris: '3 200 000 kr' },
  { slug: 'bjornemyrveien-20', lat: 59.8346, lng: 10.6419, adresse: 'Bjørnemyrveien 20', areal: '605 m²', status: 'aktiv' as const, pris: '3 000 000 kr' },
  { slug: 'bjornemyrveien-22', lat: 59.8348, lng: 10.6423, adresse: 'Bjørnemyrveien 22', areal: '613 m²', status: 'aktiv' as const, pris: '3 000 000 kr' },
]

interface WMSLayer {
  id: string
  label: string
  layers: string
  defaultOn: boolean
}

const WMS_LAYERS: WMSLayer[] = [
  { id: 'bygninger', label: 'Bygninger og veier', layers: 'bygning,veg', defaultOn: true },
  { id: 'hoydekurver', label: 'Høydekurver', layers: 'hoydekurver_5m', defaultOn: false },
  { id: 'ar5', label: 'Arealressurser (AR5)', layers: 'ar5', defaultOn: false },
  { id: 'vann', label: 'Vann', layers: 'vann_omrade', defaultOn: false },
  { id: 'natur', label: 'Naturinfo', layers: 'naturinfo', defaultOn: false },
]

interface EiendomInfo {
  adresse: string
  knr: string
  gnr: number
  bnr: number
  lat: number
  lng: number
  tomteareal: number | null
  hoyde: number | null
  terrengtype: string | null
  planer: any[]
  dokTotalt: number
  dokFunn: number
  loading: boolean
}

function Kartutforsker() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const eiendomLayerRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  const [leafletReady, setLeafletReady] = useState(false)
  const [søk, setSøk] = useState('')
  const [forslag, setForslag] = useState<any[]>([])
  const [showLagPanel, setShowLagPanel] = useState(false)
  const [aktiveLag, setAktiveLag] = useState<Record<string, boolean>>(
    Object.fromEntries(WMS_LAYERS.map(l => [l.id, l.defaultOn]))
  )
  const [eiendom, setEiendom] = useState<EiendomInfo | null>(null)
  const [showPanel, setShowPanel] = useState(false)
  const [kopiert, setKopiert] = useState(false)
  const [velkomst, setVelkomst] = useState(true)
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false)

  const wmsLayersRef = useRef<Record<string, any>>({})
  const søkeTimeoutRef = useRef<any>(null)
  const handleMapClickRef = useRef<(lat: number, lng: number) => void>(() => {})

  // Load Leaflet from CDN
  useEffect(() => {
    if (typeof window === 'undefined') return
    if ((window as any).L) { setLeafletReady(true); return }

    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
    document.head.appendChild(css)

    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = () => setLeafletReady(true)
    document.head.appendChild(script)
  }, [])

  // Initialize map
  useEffect(() => {
    if (!leafletReady || !mapContainerRef.current || mapRef.current) return
    const L = (window as any).L

    const urlLat = searchParams.get('lat')
    const urlLng = searchParams.get('lng')
    const urlZoom = searchParams.get('zoom')
    const startLat = urlLat ? parseFloat(urlLat) : 59.81
    const startLng = urlLng ? parseFloat(urlLng) : 10.62
    const startZoom = urlZoom ? parseInt(urlZoom) : 14

    const map = L.map(mapContainerRef.current, {
      center: [startLat, startLng],
      zoom: startZoom,
      zoomControl: false,
    })

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    // Base tiles - light Carto basemap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map)

    // Add WMS layers
    WMS_LAYERS.forEach(wl => {
      const layer = L.tileLayer.wms('https://wms.geonorge.no/skwms1/wms.fkb', {
        layers: wl.layers,
        format: 'image/png',
        transparent: true,
        version: '1.3.0',
        crs: L.CRS.EPSG3857,
        opacity: 0.7,
      })
      if (wl.defaultOn) layer.addTo(map)
      wmsLayersRef.current[wl.id] = layer
    })

    // Add Tomtly markers
    TOMTLY_TOMTER.forEach(tomt => {
      const isSolgt = tomt.status === 'solgt'
      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          width:${isSolgt ? '12px' : '14px'};height:${isSolgt ? '12px' : '14px'};
          background:${isSolgt ? '#ef4444' : '#2d5a3d'};
          border:2px solid white;border-radius:50%;
          box-shadow:0 2px 6px rgba(0,0,0,0.3);
          ${!isSolgt ? 'animation:pulse 2s infinite;' : ''}
        "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })

      const marker = L.marker([tomt.lat, tomt.lng], { icon }).addTo(map)
      marker.bindPopup(`
        <div style="font-family:Inter,system-ui;min-width:180px;">
          <strong style="font-size:13px;">${tomt.adresse}</strong><br>
          <span style="font-size:12px;color:#64748b;">${tomt.areal}</span><br>
          ${isSolgt ? '<span style="color:#ef4444;font-weight:700;font-size:11px;">SOLGT</span> – ' : ''}
          <span style="font-size:12px;font-weight:600;">${tomt.pris}</span><br>
          <a href="/tomter/${tomt.slug}" style="color:#2d5a3d;font-size:12px;font-weight:500;">Se tomten →</a>
        </div>
      `)
      markersRef.current.push(marker)
    })

    // Click handler – use ref to always call latest version
    map.on('click', (e: any) => {
      handleMapClickRef.current(e.latlng.lat, e.latlng.lng)
    })

    // URL update on moveend
    map.on('moveend', () => {
      const c = map.getCenter()
      const z = map.getZoom()
      const url = `/kartutforsker?lat=${c.lat.toFixed(4)}&lng=${c.lng.toFixed(4)}&zoom=${z}`
      window.history.replaceState(null, '', url)
    })

    mapRef.current = map

    // Auto-hide welcome
    setTimeout(() => setVelkomst(false), 4000)

    // Check URL for knr/gnr/bnr
    const knr = searchParams.get('knr')
    const gnr = searchParams.get('gnr')
    const bnr = searchParams.get('bnr')
    if (knr && gnr && bnr) {
      loadEiendomByMatrikkel(knr, parseInt(gnr), parseInt(bnr))
    }

    return () => { map.remove(); mapRef.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leafletReady])

  // Toggle WMS layers
  const toggleLag = useCallback((id: string) => {
    if (!mapRef.current) return
    const newState = !aktiveLag[id]
    setAktiveLag(prev => ({ ...prev, [id]: newState }))
    const layer = wmsLayersRef.current[id]
    if (!layer) return
    if (newState) {
      layer.addTo(mapRef.current)
    } else {
      mapRef.current.removeLayer(layer)
    }
  }, [aktiveLag])

  // Address search
  useEffect(() => {
    if (søk.length < 3) { setForslag([]); return }
    clearTimeout(søkeTimeoutRef.current)
    søkeTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://ws.geonorge.no/adresser/v1/sok?sok=${encodeURIComponent(søk)}&treffPerSide=5`, { signal: AbortSignal.timeout(5000) })
        const data = await res.json()
        setForslag((data.adresser || []).map((a: any) => ({
          tekst: `${a.adressetekst}, ${a.postnummer} ${a.poststed}`,
          lat: a.representasjonspunkt.lat,
          lon: a.representasjonspunkt.lon,
          knr: a.kommunenummer,
          gnr: a.gardsnummer,
          bnr: a.bruksnummer,
        })))
      } catch {}
    }, 300)
  }, [søk])

  function velgAdresse(f: any) {
    setSøk(f.tekst)
    setForslag([])
    if (mapRef.current) {
      mapRef.current.flyTo([f.lat, f.lon], 17, { duration: 1.5 })
    }
    setTimeout(() => handleMapClickRef.current(f.lat, f.lon), 1500)
  }

  async function loadEiendomByMatrikkel(knr: string, gnr: number, bnr: number) {
    try {
      const teigRes = await fetch(`https://ws.geonorge.no/eiendom/v1/geokoding?kommunenummer=${knr}&gardsnummer=${gnr}&bruksnummer=${bnr}&omrade=true&utkoordsys=4258`, { signal: AbortSignal.timeout(10000) })
      const teigData = await teigRes.json()
      const hovedteig = teigData.features?.find((f: any) => f.properties?.hovedområde === true) || teigData.features?.[0]
      if (hovedteig) {
        const coords = hovedteig.geometry.coordinates[0]
        const centerLat = coords.reduce((s: number, c: number[]) => s + c[1], 0) / coords.length
        const centerLng = coords.reduce((s: number, c: number[]) => s + c[0], 0) / coords.length
        if (mapRef.current) mapRef.current.flyTo([centerLat, centerLng], 17, { duration: 1.5 })
        tegnEiendomsgrense(teigData)
        const tomteareal = beregnPolygonAreal(coords)
        loadEiendomInfo(knr, gnr, bnr, `${knr}-${gnr}/${bnr}`, centerLat, centerLng, tomteareal, teigData)
      }
    } catch {}
  }

  async function handleMapClick(lat: number, lng: number) {
    console.log('[Kartutforsker] Klikk:', lat, lng)
    setVelkomst(false)
    try {
      const res = await fetch(`https://ws.geonorge.no/eiendom/v1/punkt?ost=${lng}&nord=${lat}&koordsys=4258&radius=50&treffPerSide=1`, { signal: AbortSignal.timeout(10000) })
      const data = await res.json()
      if (!data.features || data.features.length === 0) {
        setEiendom(null)
        setShowPanel(false)
        return
      }
      const feat = data.features[0]
      const knr = feat.properties.kommunenummer
      const gnr = feat.properties.gardsnummer
      const bnr = feat.properties.bruksnummer
      const adresse = feat.properties.adressetekst || `${knr}-${gnr}/${bnr}`

      // Update URL
      window.history.replaceState(null, '', `/kartutforsker?knr=${knr}&gnr=${gnr}&bnr=${bnr}`)

      // Show loading state
      setEiendom({ adresse, knr, gnr, bnr, lat, lng, tomteareal: null, hoyde: null, terrengtype: null, planer: [], dokTotalt: 0, dokFunn: 0, loading: true })
      setShowPanel(true)
      setMobileSheetOpen(true)

      // Get teig geometry
      const teigRes = await fetch(`https://ws.geonorge.no/eiendom/v1/geokoding?kommunenummer=${knr}&gardsnummer=${gnr}&bruksnummer=${bnr}&omrade=true&utkoordsys=4258`, { signal: AbortSignal.timeout(10000) })
      const teigData = await teigRes.json()
      tegnEiendomsgrense(teigData)
      const hovedteig = teigData.features?.find((f: any) => f.properties?.hovedområde === true) || teigData.features?.[0]
      const tomteareal = hovedteig ? beregnPolygonAreal(hovedteig.geometry.coordinates[0]) : null

      loadEiendomInfo(knr, gnr, bnr, adresse, lat, lng, tomteareal, teigData)
    } catch (err) {
      console.error('[Kartutforsker] handleMapClick feil:', err)
    }
  }

  async function loadEiendomInfo(knr: string, gnr: number, bnr: number, adresse: string, lat: number, lng: number, tomteareal: number | null, _teigData: any) {
    setEiendom({ adresse, knr, gnr, bnr, lat, lng, tomteareal: tomteareal ? Math.round(tomteareal) : null, hoyde: null, terrengtype: null, planer: [], dokTotalt: 0, dokFunn: 0, loading: true })
    setShowPanel(true)
    setMobileSheetOpen(true)

    const [planRes, dokRes, hoydeRes] = await Promise.allSettled([
      fetch(`${PLANSLURPEN_BASE}/planregister/${knr}/${gnr}/${bnr}`, {
        headers: { 'X-API-Key': PLANSLURPEN_API_KEY },
        signal: AbortSignal.timeout(10000),
      }).then(r => r.ok ? r.json() : null),
      fetch('https://kartverket-ogc-api.azurewebsites.net/processes/fullstendighetsdekning/execution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: { datasets: [], geometry: { type: 'Point', coordinates: [lng, lat] } } }),
        signal: AbortSignal.timeout(10000),
      }).then(r => r.json()),
      fetch(`https://ws.geonorge.no/hoydedata/v1/punkt?nord=${lat}&ost=${lng}&koordsys=4258`, { signal: AbortSignal.timeout(10000) }).then(r => r.json()),
    ])

    let planer: any[] = []
    if (planRes.status === 'fulfilled' && planRes.value?.plan) {
      planer = planRes.value.plan
    }

    let dokTotalt = 0, dokFunn = 0
    if (dokRes.status === 'fulfilled' && dokRes.value?.properties?.coverages) {
      const coverages = dokRes.value.properties.coverages
      dokTotalt = coverages.length
      dokFunn = coverages.filter((c: any) => (c.coverageStatus || '').toLowerCase().includes('med funn')).length
    }

    const hoyde = hoydeRes.status === 'fulfilled' ? hoydeRes.value?.punkter?.[0]?.z : null
    const terrengtype = hoydeRes.status === 'fulfilled' ? hoydeRes.value?.punkter?.[0]?.terreng : null

    setEiendom({
      adresse, knr, gnr, bnr, lat, lng,
      tomteareal: tomteareal ? Math.round(tomteareal) : null,
      hoyde: hoyde ? Math.round(hoyde) : null,
      terrengtype,
      planer,
      dokTotalt,
      dokFunn,
      loading: false,
    })
  }

  // Keep click handler ref always pointing to latest version
  handleMapClickRef.current = handleMapClick

  function tegnEiendomsgrense(teigData: any) {
    if (!mapRef.current) return
    const L = (window as any).L
    if (eiendomLayerRef.current) {
      mapRef.current.removeLayer(eiendomLayerRef.current)
    }
    const hovedteig = teigData.features?.find((f: any) => f.properties?.hovedområde === true) || teigData.features?.[0]
    if (!hovedteig) return

    const coords = hovedteig.geometry.coordinates[0].map((c: number[]) => [c[1], c[0]])
    const polygon = L.polygon(coords, {
      color: '#FF6432',
      weight: 3,
      fillColor: '#FF6432',
      fillOpacity: 0.15,
    }).addTo(mapRef.current)

    eiendomLayerRef.current = polygon
    mapRef.current.fitBounds(polygon.getBounds(), { padding: [80, 80] })
  }

  function kopiérKoordinater() {
    if (!eiendom) return
    navigator.clipboard.writeText(`${eiendom.lat.toFixed(6)}, ${eiendom.lng.toFixed(6)}`)
    setKopiert(true)
    setTimeout(() => setKopiert(false), 2000)
  }

  // Info panel content
  const InfoContent = () => {
    if (!eiendom) return null
    return (
      <div className="space-y-4">
        <div>
          <h3 className="font-display text-lg font-bold text-tomtly-dark">{eiendom.adresse}</h3>
          <p className="text-xs text-brand-500">Gnr. {eiendom.gnr} / Bnr. {eiendom.bnr} – {eiendom.knr}</p>
        </div>

        {eiendom.loading ? (
          <div className="flex items-center gap-3 py-8 justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-tomtly-accent" />
            <span className="text-sm text-brand-500">Henter data...</span>
          </div>
        ) : (
          <>
            {/* Key stats */}
            <div className="grid grid-cols-2 gap-2">
              {eiendom.tomteareal && (
                <div className="bg-brand-50 rounded-lg p-3 border border-brand-100">
                  <Ruler className="w-3.5 h-3.5 text-brand-400 mb-1" />
                  <p className="text-sm font-bold text-tomtly-dark">~{eiendom.tomteareal.toLocaleString('nb-NO')} m²</p>
                  <p className="text-[10px] text-brand-500">Tomteareal</p>
                </div>
              )}
              {eiendom.hoyde !== null && (
                <div className="bg-brand-50 rounded-lg p-3 border border-brand-100">
                  <Mountain className="w-3.5 h-3.5 text-brand-400 mb-1" />
                  <p className="text-sm font-bold text-tomtly-dark">{eiendom.hoyde} moh</p>
                  <p className="text-[10px] text-brand-500">Høyde</p>
                </div>
              )}
            </div>

            {eiendom.terrengtype && (
              <p className="text-xs text-brand-600"><span className="font-medium">Terreng:</span> {eiendom.terrengtype}</p>
            )}

            {/* Regulering */}
            <div>
              <h4 className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Regulering
              </h4>
              {eiendom.planer.length > 0 ? (
                <div className="space-y-2">
                  {eiendom.planer.slice(0, 5).map((plan: any, i: number) => (
                    <div key={i} className="bg-forest-50 rounded-lg p-3 border border-forest-100">
                      <p className="text-xs font-semibold text-tomtly-dark">{plan.plannavn || 'Ukjent plan'}</p>
                      <p className="text-[10px] text-brand-500">{plan.plantype?.kodebeskrivelse || plan.plantype?.beskrivelse || ''}</p>
                      <p className="text-[10px] text-brand-400">{plan.planstatus?.kodebeskrivelse || plan.planstatus?.beskrivelse || ''}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-brand-500 italic">Plandata ikke tilgjengelig for denne kommunen ennå.</p>
              )}
            </div>

            {/* DOK */}
            <div>
              <h4 className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" /> DOK-analyse
              </h4>
              {eiendom.dokTotalt > 0 ? (
                <div className="bg-brand-50 rounded-lg p-3 border border-brand-100">
                  <p className="text-xs text-brand-700">{eiendom.dokTotalt} datasett sjekket</p>
                  {eiendom.dokFunn === 0 ? (
                    <p className="text-xs text-green-700 font-medium mt-1">Ingen funn med fare</p>
                  ) : (
                    <p className="text-xs text-amber-700 font-medium mt-1">{eiendom.dokFunn} funn – se full analyse</p>
                  )}
                </div>
              ) : (
                <p className="text-xs text-brand-500 italic">Ingen DOK-data tilgjengelig.</p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-brand-200">
              <Link
                href={`/prototype?knr=${eiendom.knr}&gnr=${eiendom.gnr}&bnr=${eiendom.bnr}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 transition-colors"
              >
                <Search className="w-4 h-4" />
                Kjør full tomteanalyse
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={kopiérKoordinater}
                className="flex items-center justify-center gap-2 w-full py-2 border border-brand-200 text-brand-700 text-xs font-medium rounded-lg hover:bg-brand-50 transition-colors"
              >
                {kopiert ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {kopiert ? 'Kopiert!' : 'Kopiér koordinater'}
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {/* Topbar */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-tomtly-dark/90 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <Link href="/" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Tomtly" className="h-6 invert" />
          </Link>

          {/* Search */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
            <input
              type="text"
              value={søk}
              onChange={e => setSøk(e.target.value)}
              placeholder="Søk adresse..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-brand-500 focus:outline-none focus:ring-2 focus:ring-tomtly-accent/50 focus:bg-white/15"
            />
            {forslag.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-white rounded-lg shadow-xl border border-brand-200 overflow-hidden z-[1100]">
                {forslag.map((f, i) => (
                  <button key={i} onClick={() => velgAdresse(f)} className="w-full text-left px-4 py-3 text-sm text-tomtly-dark hover:bg-brand-50 transition-colors flex items-center gap-2 border-b border-brand-100 last:border-0">
                    <MapPin className="w-3.5 h-3.5 text-brand-400 shrink-0" />
                    {f.tekst}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Layer toggle button */}
          <button
            onClick={() => setShowLagPanel(!showLagPanel)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${showLagPanel ? 'bg-tomtly-accent text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Kartlag</span>
          </button>
        </div>
      </div>

      {/* Layer panel */}
      {showLagPanel && (
        <div className="absolute top-14 right-4 z-[1000] bg-white rounded-xl shadow-xl border border-brand-200 p-4 w-56">
          <h4 className="text-xs font-semibold text-brand-600 uppercase tracking-wide mb-3">Kartlag</h4>
          <div className="space-y-2">
            {WMS_LAYERS.map(wl => (
              <label key={wl.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aktiveLag[wl.id]}
                  onChange={() => toggleLag(wl.id)}
                  className="w-4 h-4 rounded border-brand-300 text-tomtly-accent focus:ring-tomtly-accent/30"
                />
                <span className="text-sm text-brand-700">{wl.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Welcome toast */}
      {velkomst && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[999] bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-brand-200 px-5 py-3 max-w-sm" onClick={() => setVelkomst(false)}>
          <p className="text-sm text-brand-700 text-center">
            Klikk på en eiendom for å se regulering og byggemuligheter. Søk etter adresse i søkefeltet.
          </p>
        </div>
      )}

      {/* Map container */}
      <div ref={mapContainerRef} className="absolute inset-0" />

      {/* Desktop info panel */}
      <div className={`hidden md:block absolute top-0 right-0 h-full w-[360px] bg-white shadow-xl border-l border-brand-200 z-[999] transition-transform duration-300 ${showPanel && eiendom ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-brand-100 px-4 py-3 flex items-center justify-between z-10">
            <span className="text-[10px] text-brand-400 uppercase tracking-wide font-semibold">Eiendomsinfo</span>
            <button onClick={() => { setShowPanel(false); setEiendom(null) }} className="p-1 hover:bg-brand-100 rounded-md transition-colors">
              <X className="w-4 h-4 text-brand-500" />
            </button>
          </div>
          <div className="p-5">
            <InfoContent />
          </div>
        </div>
      </div>

      {/* Mobile bottom sheet */}
      {eiendom && showPanel && (
        <div className={`md:hidden absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl border-t border-brand-200 z-[999] transition-transform duration-300 ${mobileSheetOpen ? 'max-h-[70vh]' : 'max-h-20'}`}>
          <button
            onClick={() => setMobileSheetOpen(!mobileSheetOpen)}
            className="w-full flex items-center justify-center pt-2 pb-1"
          >
            <div className="w-10 h-1 bg-brand-300 rounded-full" />
          </button>
          {!mobileSheetOpen ? (
            <button onClick={() => setMobileSheetOpen(true)} className="w-full px-4 pb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-tomtly-dark text-left">{eiendom.adresse}</p>
                <p className="text-[10px] text-brand-500">Trykk for detaljer</p>
              </div>
              <ChevronUp className="w-4 h-4 text-brand-400" />
            </button>
          ) : (
            <div className="overflow-y-auto max-h-[calc(70vh-40px)] px-4 pb-6">
              <div className="flex justify-end mb-2">
                <button onClick={() => { setShowPanel(false); setEiendom(null); setMobileSheetOpen(false) }} className="p-1 hover:bg-brand-100 rounded-md">
                  <X className="w-4 h-4 text-brand-500" />
                </button>
              </div>
              <InfoContent />
            </div>
          )}
        </div>
      )}

      {/* Pulse animation */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45,90,61,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(45,90,61,0); }
        }
        .leaflet-popup-content-wrapper { border-radius: 10px !important; }
        .leaflet-popup-content { margin: 10px 14px !important; }
      `}</style>
    </div>
  )
}

function beregnPolygonAreal(coords: number[][]): number {
  const refLat = coords[0][1]
  const refLon = coords[0][0]
  const toMeter = (lat: number, lon: number): [number, number] => {
    const dlat = (lat - refLat) * 111320
    const dlon = (lon - refLon) * 111320 * Math.cos(refLat * Math.PI / 180)
    return [dlon, dlat]
  }
  const meterCoords = coords.map(c => toMeter(c[1], c[0]))
  let area = 0
  for (let i = 0; i < meterCoords.length - 1; i++) {
    area += meterCoords[i][0] * meterCoords[i + 1][1]
    area -= meterCoords[i + 1][0] * meterCoords[i][1]
  }
  return Math.abs(area) / 2
}

// Wrap in Suspense for useSearchParams
import { Suspense } from 'react'
export default function KartutforskerPage() {
  return (
    <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-brand-50"><Loader2 className="w-6 h-6 animate-spin text-tomtly-accent" /></div>}>
      <Kartutforsker />
    </Suspense>
  )
}
