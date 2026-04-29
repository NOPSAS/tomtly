'use client'

import { useState, useRef } from 'react'
import {
  Search, Loader2, Download, Camera,
  Home, CheckCircle2, AlertTriangle, Upload, Copy, Check, ExternalLink
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
]

export default function VisualiseringsVerktoy() {
  // FINN
  const [finnUrl, setFinnUrl] = useState('')
  const [finnBilder, setFinnBilder] = useState<string[]>([])
  const [finnInfo, setFinnInfo] = useState<any>(null)
  const [finnLoading, setFinnLoading] = useState(false)
  const [feil, setFeil] = useState<string | null>(null)

  // Opplasting
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Husmodell
  const [valgtHus, setValgtHus] = useState<HusModell | null>(null)

  // Landskap
  const [landskap, setLandskap] = useState('')

  // Prompt
  const [kopiert, setKopiert] = useState(false)

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

  // ─── Last ned bilde ───────────────────────────────────────────────

  async function lastNedBilde(url: string, idx: number) {
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `tomt-bilde-${idx + 1}.jpg`
      a.click()
      URL.revokeObjectURL(a.href)
    } catch {
      window.open(url, '_blank')
    }
  }

  // ─── Bygg Gemini-prompt ───────────────────────────────────────────

  function byggPrompt(): string {
    if (!valgtHus) return ''

    const lines = [
      `Plasser husmodellen "${valgtHus.navn}" fra ${valgtHus.leverandor} på denne tomten.`,
      '',
      `Huset:`,
      `- ${valgtHus.navn} (${valgtHus.leverandor})`,
      `- ${valgtHus.bra_m2} m² BRA, ${valgtHus.etasjer} etasje(r), ${valgtHus.soverom} soverom`,
      `- ${valgtHus.beskrivelse}`,
    ]

    if (valgtHus.ekstra) {
      Object.entries(valgtHus.ekstra).forEach(([k, v]) => {
        lines.push(`- ${k}: ${v}`)
      })
    }

    lines.push('')

    if (landskap) {
      lines.push(`Uteområder: ${landskap}`)
    } else {
      lines.push('Uteområder: Plen, grusvei/innkjørsel, naturlig norsk vegetasjon.')
    }

    lines.push('')
    lines.push('Viktig:')
    lines.push('- IKKE endre naboer, veier, gjerder eller annen eksisterende bebyggelse')
    lines.push('- Huset skal se realistisk ut og passe til terrenget')
    lines.push('- Norsk boligstil: trekledning (hvit, grå eller mørk), riktig takform')
    lines.push('- Fotorealistisk resultat, naturlig belysning')

    return lines.join('\n')
  }

  const prompt = valgtHus ? byggPrompt() : ''

  function kopierPrompt() {
    navigator.clipboard.writeText(prompt)
    setKopiert(true)
    setTimeout(() => setKopiert(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-tomtly-dark mb-1">Visualisering</h1>
        <p className="text-sm text-brand-600">Hent bilder fra FINN, velg husmodell, kopier prompt til Gemini.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ═══ Kolonne 1: FINN-bilder ═══ */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <h2 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2 text-sm">
              <Search className="w-4 h-4 text-tomtly-accent" />
              1. Hent bilder fra FINN
            </h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={finnUrl}
                onChange={(e) => setFinnUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && hentFinnBilder()}
                placeholder="https://www.finn.no/realestate/..."
                className="flex-1 px-3 py-2 text-sm border border-brand-200 rounded-lg focus:ring-2 focus:ring-tomtly-accent/20 focus:border-tomtly-accent"
              />
              <button
                onClick={hentFinnBilder}
                disabled={finnLoading || !finnUrl}
                className="px-4 py-2 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 disabled:opacity-50"
              >
                {finnLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Hent'}
              </button>
            </div>

            {feil && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-red-700">{feil}</p>
              </div>
            )}

            {finnInfo && (
              <div className="bg-brand-50 rounded-lg p-3 mb-3 text-xs text-brand-600">
                <p className="font-semibold text-tomtly-dark">{finnInfo.tittel}</p>
                {finnInfo.adresse && <p>{finnInfo.adresse}</p>}
                <p>{finnInfo.antall} bilder funnet</p>
              </div>
            )}

            {finnBilder.length > 0 && (
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {finnBilder.map((url, i) => (
                  <div key={i} className="relative group rounded-lg overflow-hidden border border-brand-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt={`Bilde ${i + 1}`} className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => lastNedBilde(url, i)}
                        className="flex items-center gap-1.5 px-3 py-2 bg-white text-tomtly-dark text-xs font-semibold rounded-lg shadow-lg"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Last ned
                      </button>
                    </div>
                    <span className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded">{i + 1}/{finnBilder.length}</span>
                  </div>
                ))}
              </div>
            )}

            {finnBilder.length === 0 && !finnLoading && (
              <div className="text-center py-6 text-brand-400">
                <Camera className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs">Lim inn en FINN-URL for å hente bilder</p>
              </div>
            )}
          </div>
        </div>

        {/* ═══ Kolonne 2: Husmodell + landskap ═══ */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <h2 className="font-semibold text-tomtly-dark mb-3 flex items-center gap-2 text-sm">
              <Home className="w-4 h-4 text-tomtly-accent" />
              2. Velg husmodell
            </h2>
            <div className="space-y-2 max-h-80 overflow-y-auto">
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
                      <p className="text-[10px] text-brand-500">{hus.leverandor} — {hus.bra_m2} m², {hus.etasjer} etg.</p>
                    </div>
                    {valgtHus?.id === hus.id && <CheckCircle2 className="w-4 h-4 text-tomtly-accent flex-shrink-0" />}
                  </div>
                  <p className="text-[10px] text-brand-500 mt-1 line-clamp-1">{hus.beskrivelse}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <h2 className="font-semibold text-tomtly-dark mb-3 text-sm">3. Beskriv uteområder (valgfritt)</h2>
            <textarea
              value={landskap}
              onChange={(e) => setLandskap(e.target.value)}
              placeholder="F.eks: Plen med grusvei, parkering foran, bjørketrær langs tomtegrensen, hekk mot nabo, bod på venstre side..."
              className="w-full px-3 py-2 text-sm border border-brand-200 rounded-lg resize-none h-24 focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
        </div>

        {/* ═══ Kolonne 3: Prompt ═══ */}
        <div className="space-y-5">
          <div className="bg-white rounded-xl border border-brand-200 p-5">
            <h2 className="font-semibold text-tomtly-dark mb-3 text-sm">4. Kopier prompt til Gemini</h2>

            {valgtHus ? (
              <>
                <div className="bg-brand-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
                  <pre className="text-xs text-brand-700 whitespace-pre-wrap font-sans leading-relaxed">{prompt}</pre>
                </div>

                <button
                  onClick={kopierPrompt}
                  className={`w-full py-3 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 ${
                    kopiert
                      ? 'bg-green-500 text-white'
                      : 'bg-tomtly-accent text-white hover:bg-forest-700'
                  }`}
                >
                  {kopiert ? <><Check className="w-4 h-4" /> Kopiert!</> : <><Copy className="w-4 h-4" /> Kopier prompt</>}
                </button>

                <div className="mt-3 flex flex-col gap-2">
                  <a
                    href="https://gemini.google.com/app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-lg text-sm hover:bg-blue-100 border border-blue-200"
                  >
                    Åpne Gemini <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://chatgpt.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-2.5 bg-brand-50 text-brand-600 font-medium rounded-lg text-sm hover:bg-brand-100 border border-brand-200"
                  >
                    Åpne ChatGPT <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-brand-400">
                <p className="text-sm">Velg en husmodell for å generere prompt</p>
              </div>
            )}
          </div>

          {/* Instruksjoner */}
          <div className="bg-amber-50 rounded-xl border border-amber-200 p-5">
            <h3 className="font-semibold text-amber-800 mb-2 text-sm">Slik bruker du det</h3>
            <ol className="space-y-1.5 text-xs text-amber-700">
              <li><strong>1.</strong> Hent bilder fra FINN (eller bruk egne)</li>
              <li><strong>2.</strong> Last ned det beste tomtebildet</li>
              <li><strong>3.</strong> Velg husmodell og beskriv uteområder</li>
              <li><strong>4.</strong> Kopier prompten</li>
              <li><strong>5.</strong> Åpne Gemini, last opp bildet, lim inn prompten</li>
              <li><strong>6.</strong> Last ned resultatet og bruk i tomtepresentasjonen</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
