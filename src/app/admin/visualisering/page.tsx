'use client'

import { useState, useRef } from 'react'
import {
  Image as ImageIcon, Search, Loader2, Download, Camera,
  Home, Palette, RotateCcw, Wand2, CheckCircle2, AlertTriangle,
  ChevronDown, ExternalLink, Upload
} from 'lucide-react'

// ─── Husbibliotek ───────────────────────────────────────────────────

interface HusModell {
  id: string
  navn: string
  leverandor: string
  bra_m2: number
  etasjer: number
  soverom: number
  beskrivelse: string
  ekstra?: Record<string, string>
  bilder?: { fasade?: string[] }
}

const HUSBIBLIOTEK: HusModell[] = [
  {
    id: 'wide', navn: 'Wide', leverandor: 'ABChus', bra_m2: 207.9, etasjer: 1, soverom: 4,
    beskrivelse: 'Stor enebolig med pulttak. Åpen planløsning, store vindusflater. Lav og bred profil.',
    ekstra: { BYA: '~220 m²', Takvinkel: 'Pulttak ~7°', Stil: 'Moderne funkis' },
  },
  {
    id: 'vindy', navn: 'Vindy', leverandor: 'ABChus', bra_m2: 107, etasjer: 2, soverom: 3,
    beskrivelse: 'Moderne, arealeffektivt hus på to plan. Finnes i variant for flat og skrå tomt.',
    ekstra: { BYA: '~65 m²', Takvinkel: 'Pulttak', Stil: 'Moderne kompakt' },
  },
  {
    id: 'skogly', navn: 'Skogly', leverandor: 'Hedalm-Anebyhus', bra_m2: 126.1, etasjer: 2, soverom: 4,
    beskrivelse: 'Kompakt bolig for skrånende tomter. Stor og åpen stue/kjøkkenløsning med balkong.',
    ekstra: { BYA: '80,5 m²', Takvinkel: 'Saltak', Stil: 'Moderne tradisjonell' },
  },
  {
    id: 'lasse', navn: 'Lasse', leverandor: 'Älvsbyhus', bra_m2: 96, etasjer: 1.5, soverom: 1,
    beskrivelse: '1,5-etasjes med åpen kjøkken/stue. Uinnredet loft for fremtidig utvidelse.',
    ekstra: { BYA: '79 m²', Takvinkel: '38° saltak', Stil: 'Klassisk norsk' },
  },
  {
    id: 'moholt', navn: 'Moholt', leverandor: 'ABChus', bra_m2: 160, etasjer: 2, soverom: 4,
    beskrivelse: 'Romslig enebolig med underetasje. Moderne design med store vindusflater.',
    ekstra: { BYA: '~100 m²', Takvinkel: 'Pulttak', Stil: 'Moderne med underetasje' },
  },
  {
    id: 'minde', navn: 'Minde', leverandor: 'ABChus', bra_m2: 155, etasjer: 2, soverom: 4,
    beskrivelse: 'Familievennlig bolig med saltak. Klassisk skandinavisk design.',
    ekstra: { BYA: '~90 m²', Takvinkel: 'Saltak 27°', Stil: 'Nordisk tradisjonell' },
  },
  {
    id: 'parsell', navn: 'Parsellhus', leverandor: 'ABChus', bra_m2: 120, etasjer: 2, soverom: 3,
    beskrivelse: 'Tomannsbolig/parsellhus. To separate enheter med speilvendt planløsning.',
    ekstra: { BYA: '~75 m² per enhet', Takvinkel: 'Pulttak', Stil: 'Moderne tomannsbolig' },
  },
  {
    id: 'egendefinert', navn: 'Egendefinert', leverandor: 'Fritekst', bra_m2: 0, etasjer: 0, soverom: 0,
    beskrivelse: 'Beskriv huset fritt — stil, størrelse, materialer og takform.',
  },
]

// ─── Komponenter ────────────────────────────────────────────────────

export default function VisualiseringsVerktoy() {
  // FINN-bilder
  const [finnUrl, setFinnUrl] = useState('')
  const [finnBilder, setFinnBilder] = useState<string[]>([])
  const [finnInfo, setFinnInfo] = useState<any>(null)
  const [finnLoading, setFinnLoading] = useState(false)

  // Valgt bilde
  const [valgtBilde, setValgtBilde] = useState<string | null>(null)
  const [opplastetBilde, setOpplastetBilde] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Husmodell
  const [valgtHus, setValgtHus] = useState<HusModell | null>(null)
  const [egendefinertBeskrivelse, setEgendefinertBeskrivelse] = useState('')

  // Visualiseringsinnstillinger
  const [landskap, setLandskap] = useState('')
  const [vinkel, setVinkel] = useState('skrå')
  const [stil, setStil] = useState('fotorealistisk')
  const [ekstraInstruksjoner, setEkstraInstruksjoner] = useState('')

  // Resultat
  const [resultat, setResultat] = useState<string | null>(null)
  const [genererer, setGenererer] = useState(false)
  const [feil, setFeil] = useState<string | null>(null)
  const [prompt, setPrompt] = useState<string | null>(null)

  // ─── Hent FINN-bilder ─────────────────────────────────────────────

  async function hentFinnBilder() {
    if (!finnUrl) return
    setFinnLoading(true)
    setFeil(null)
    try {
      const res = await fetch('/api/finn-bilder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finnUrl }),
      })
      const data = await res.json()
      if (data.error) { setFeil(data.error); return }
      setFinnBilder(data.bilder || [])
      setFinnInfo(data)
    } catch (err: any) {
      setFeil(err.message)
    } finally {
      setFinnLoading(false)
    }
  }

  // ─── Fileopplasting ───────────────────────────────────────────────

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setOpplastetBilde(reader.result as string)
      setValgtBilde(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  // ─── Generer visualisering ────────────────────────────────────────

  async function genererVisualisering() {
    if (!valgtHus) { setFeil('Velg en husmodell'); return }
    setGenererer(true)
    setFeil(null)
    setResultat(null)

    const husData = valgtHus.id === 'egendefinert'
      ? { ...valgtHus, beskrivelse: egendefinertBeskrivelse || 'Moderne norsk enebolig' }
      : valgtHus

    try {
      const res = await fetch('/api/visualisering', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bildeUrl: valgtBilde,
          husmodell: husData,
          landskapBeskrivelse: landskap,
          vinkel,
          stil,
          ekstraInstruksjoner,
        }),
      })
      const data = await res.json()
      if (data.error) {
        setFeil(data.error)
      } else {
        setResultat(data.bildeUrl || data.bilde)
        setPrompt(data.prompt)
      }
    } catch (err: any) {
      setFeil(err.message)
    } finally {
      setGenererer(false)
    }
  }

  // ─── Aktivt bilde ─────────────────────────────────────────────────

  const aktivtBilde = valgtBilde || opplastetBilde

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-tomtly-dark mb-2 flex items-center gap-3">
          <Wand2 className="w-8 h-8 text-tomtly-accent" />
          Visualiseringsverktoy
        </h1>
        <p className="text-brand-600">Lag AI-visualiseringer av hus pa tomter for kunder.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ═══ Venstre kolonne: Bilder ═══ */}
        <div className="lg:col-span-1 space-y-6">
          {/* FINN-scraper */}
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <h2 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-tomtly-accent" />
              Hent bilder fra FINN
            </h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={finnUrl}
                onChange={(e) => setFinnUrl(e.target.value)}
                placeholder="https://www.finn.no/realestate/..."
                className="flex-1 px-3 py-2 text-sm border border-brand-200 rounded-lg focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
              />
              <button
                onClick={hentFinnBilder}
                disabled={finnLoading || !finnUrl}
                className="px-4 py-2 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 disabled:opacity-50 transition-colors"
              >
                {finnLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Hent'}
              </button>
            </div>
            {finnInfo && (
              <p className="text-xs text-brand-500 mb-2">
                {finnInfo.tittel} — {finnInfo.antall} bilder funnet
              </p>
            )}
            {finnBilder.length > 0 && (
              <div className="grid grid-cols-3 gap-1.5 max-h-60 overflow-y-auto">
                {finnBilder.map((url, i) => (
                  <button
                    key={i}
                    onClick={() => setValgtBilde(url)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-colors ${
                      valgtBilde === url ? 'border-tomtly-accent' : 'border-transparent hover:border-brand-300'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Bilde ${i + 1}`} className="w-full h-16 object-cover" />
                    {valgtBilde === url && (
                      <div className="absolute inset-0 bg-tomtly-accent/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Filopplasting */}
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <h2 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
              <Upload className="w-4 h-4 text-tomtly-accent" />
              Eller last opp bilde
            </h2>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-8 border-2 border-dashed border-brand-300 rounded-lg text-sm text-brand-500 hover:border-tomtly-accent hover:text-tomtly-accent transition-colors"
            >
              <Camera className="w-6 h-6 mx-auto mb-2" />
              Klikk for a velge bilde
            </button>
            {opplastetBilde && (
              <div className="mt-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={opplastetBilde} alt="Opplastet" className="w-full h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>

          {/* Valgt bilde preview */}
          {aktivtBilde && (
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <h2 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-tomtly-accent" />
                Valgt referansebilde
              </h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={aktivtBilde} alt="Valgt" className="w-full rounded-lg border border-brand-200" />
              <button
                onClick={() => { setValgtBilde(null); setOpplastetBilde(null) }}
                className="mt-2 text-xs text-brand-500 hover:text-red-600"
              >
                Fjern bilde
              </button>
            </div>
          )}
        </div>

        {/* ═══ Midtre kolonne: Innstillinger ═══ */}
        <div className="lg:col-span-1 space-y-6">
          {/* Husmodell */}
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <h2 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
              <Home className="w-4 h-4 text-tomtly-accent" />
              Velg husmodell
            </h2>
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {HUSBIBLIOTEK.map((hus) => (
                <button
                  key={hus.id}
                  onClick={() => setValgtHus(hus)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    valgtHus?.id === hus.id
                      ? 'border-tomtly-accent bg-forest-50'
                      : 'border-brand-200 hover:border-brand-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-tomtly-dark">{hus.navn}</p>
                      <p className="text-[10px] text-brand-500">{hus.leverandor}</p>
                    </div>
                    {hus.bra_m2 > 0 && (
                      <span className="text-[10px] bg-brand-100 px-2 py-0.5 rounded text-brand-600">
                        {hus.bra_m2} m²
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-brand-500 mt-1 line-clamp-2">{hus.beskrivelse}</p>
                </button>
              ))}
            </div>

            {valgtHus?.id === 'egendefinert' && (
              <textarea
                value={egendefinertBeskrivelse}
                onChange={(e) => setEgendefinertBeskrivelse(e.target.value)}
                placeholder="Beskriv huset: stil, storrelse, materialer, takform, antall etasjer..."
                className="w-full mt-3 px-3 py-2 text-sm border border-brand-200 rounded-lg resize-none h-24 focus:ring-2 focus:ring-tomtly-accent/20"
              />
            )}

            {valgtHus && valgtHus.id !== 'egendefinert' && (
              <div className="mt-3 bg-forest-50 rounded-lg p-3 text-xs">
                <p className="font-semibold text-tomtly-dark mb-1">{valgtHus.navn} — {valgtHus.leverandor}</p>
                <div className="grid grid-cols-2 gap-1 text-brand-600">
                  <span>BRA: {valgtHus.bra_m2} m²</span>
                  <span>Etasjer: {valgtHus.etasjer}</span>
                  <span>Soverom: {valgtHus.soverom}</span>
                  {valgtHus.ekstra?.Takvinkel && <span>Tak: {valgtHus.ekstra.Takvinkel}</span>}
                  {valgtHus.ekstra?.BYA && <span>BYA: {valgtHus.ekstra.BYA}</span>}
                  {valgtHus.ekstra?.Stil && <span>Stil: {valgtHus.ekstra.Stil}</span>}
                </div>
              </div>
            )}
          </div>

          {/* Landskap og uteomrader */}
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <h2 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2">
              <Palette className="w-4 h-4 text-tomtly-accent" />
              Uteomrader og landskap
            </h2>
            <textarea
              value={landskap}
              onChange={(e) => setLandskap(e.target.value)}
              placeholder="Beskriv uteomradene: Plen med grusvei, bod pa venstre side, parkering foran huset, bjorketrær langs tomtegrensen, hekk mot nabo..."
              className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg resize-none h-28 focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>

          {/* Vinkel og stil */}
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <h2 className="font-semibold text-tomtly-dark mb-3">Kameravinkel og stil</h2>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="text-xs text-brand-600 mb-1 block">Vinkel</label>
                <select
                  value={vinkel}
                  onChange={(e) => setVinkel(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg"
                >
                  <option value="front">Frontvisning</option>
                  <option value="skrå">Skravisning (3/4)</option>
                  <option value="fugleperspektiv">Fugleperspektiv</option>
                  <option value="bakfra">Bakfra (hage)</option>
                  <option value="side">Sidevisning</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-brand-600 mb-1 block">Stil</label>
                <select
                  value={stil}
                  onChange={(e) => setStil(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg"
                >
                  <option value="fotorealistisk">Fotorealistisk</option>
                  <option value="arkitektonisk">Arkitektonisk render</option>
                  <option value="skisse">Skisse/akvarell</option>
                </select>
              </div>
            </div>
            <textarea
              value={ekstraInstruksjoner}
              onChange={(e) => setEkstraInstruksjoner(e.target.value)}
              placeholder="Ekstra instruksjoner (valgfritt): F.eks. 'Vis huset med mork trekledning', 'Inkluder gjerde rundt tomten'..."
              className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg resize-none h-16 focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>

          {/* Generer-knapp */}
          <button
            onClick={genererVisualisering}
            disabled={genererer || !valgtHus}
            className="w-full py-4 bg-tomtly-accent text-white font-semibold rounded-xl hover:bg-forest-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 text-lg"
          >
            {genererer ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Genererer visualisering...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generer visualisering
              </>
            )}
          </button>
        </div>

        {/* ═══ Hoyre kolonne: Resultat ═══ */}
        <div className="lg:col-span-1 space-y-6">
          {feil && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Feil</p>
                <p className="text-xs text-red-600 mt-1">{feil}</p>
              </div>
            </div>
          )}

          {genererer && (
            <div className="bg-white rounded-xl border border-brand-200 p-8 text-center">
              <Loader2 className="w-10 h-10 text-tomtly-accent animate-spin mx-auto mb-4" />
              <p className="text-sm text-brand-600">Genererer AI-visualisering...</p>
              <p className="text-xs text-brand-400 mt-1">Dette tar vanligvis 15-30 sekunder</p>
            </div>
          )}

          {resultat && (
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-semibold text-tomtly-dark flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-tomtly-accent" />
                  Resultat
                </h2>
                <div className="flex gap-2">
                  <a
                    href={resultat}
                    download={`visualisering-${valgtHus?.navn || 'hus'}.png`}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-tomtly-accent text-white rounded-lg hover:bg-forest-700"
                  >
                    <Download className="w-3 h-3" />
                    Last ned
                  </a>
                  <button
                    onClick={genererVisualisering}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-brand-100 text-brand-700 rounded-lg hover:bg-brand-200"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Regenerer
                  </button>
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={resultat}
                alt="AI-generert visualisering"
                className="w-full rounded-lg border border-brand-200"
              />
            </div>
          )}

          {prompt && (
            <details className="bg-white rounded-xl border border-brand-200 p-5">
              <summary className="text-xs font-semibold text-brand-600 cursor-pointer flex items-center gap-1">
                <ChevronDown className="w-3 h-3" />
                Vis prompt (teknisk)
              </summary>
              <pre className="mt-3 text-[10px] text-brand-500 whitespace-pre-wrap bg-brand-50 rounded-lg p-3 max-h-60 overflow-y-auto">
                {prompt}
              </pre>
            </details>
          )}

          {/* Instruksjoner */}
          {!resultat && !genererer && (
            <div className="bg-brand-50 rounded-xl border border-brand-200 p-5">
              <h3 className="font-semibold text-tomtly-dark mb-3 text-sm">Slik bruker du verktøyet</h3>
              <ol className="space-y-2 text-xs text-brand-600">
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-tomtly-accent text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">1</span>
                  Lim inn FINN-URL eller last opp bilde av tomten
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-tomtly-accent text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">2</span>
                  Velg et bilde som viser tomten fra god vinkel
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-tomtly-accent text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">3</span>
                  Velg husmodell fra biblioteket (eller beskriv fritt)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-tomtly-accent text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">4</span>
                  Beskriv uteomradene (plen, parkering, hekk, trær)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-tomtly-accent text-white text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">5</span>
                  Klikk «Generer» — AI lager fotorealistisk bilde
                </li>
              </ol>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-[10px] text-amber-800">
                  <strong>NB:</strong> Krever OpenAI API-nokkel (OPENAI_API_KEY) i .env.local.
                  Bildegenerering bruker gpt-image-1 og koster ca. 4-8 kr per bilde.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
