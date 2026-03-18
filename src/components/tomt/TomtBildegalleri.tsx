'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, X, Maximize2 } from 'lucide-react'

export interface TomtBilde {
  id: string
  url: string
  alt: string
  kategori: 'drone' | 'tomt' | 'nabolag' | 'utsikt' | 'solforhold' | 'vei' | 'annet'
  bildetekst?: string
}

interface Props {
  bilder: TomtBilde[]
  adresse: string
}

const KATEGORI_LABEL: Record<string, string> = {
  drone: 'Dronefoto',
  tomt: 'Tomten',
  nabolag: 'Nabolaget',
  utsikt: 'Utsikt',
  solforhold: 'Solforhold',
  vei: 'Adkomst',
  annet: 'Bilde',
}

export function TomtBildegalleri({ bilder, adresse }: Props) {
  const [aktivtIdx, setAktivtIdx] = useState(0)
  const [fullskjerm, setFullskjerm] = useState(false)
  const [filterKategori, setFilterKategori] = useState<string | null>(null)

  const filtrert = filterKategori
    ? bilder.filter((b) => b.kategori === filterKategori)
    : bilder
  const aktivt = filtrert[aktivtIdx] || filtrert[0]

  const kategorier = [...new Set(bilder.map((b) => b.kategori))]

  const neste = () => setAktivtIdx((i) => (i + 1) % filtrert.length)
  const forrige = () => setAktivtIdx((i) => (i - 1 + filtrert.length) % filtrert.length)

  if (!aktivt) return null

  return (
    <div>
      <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-2">
        Bilder
      </h2>
      <p className="text-brand-600 mb-4">{bilder.length} bilder fra {adresse}</p>

      {/* Kategori-filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => { setFilterKategori(null); setAktivtIdx(0) }}
          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
            !filterKategori ? 'bg-tomtly-accent text-white' : 'bg-brand-100 text-brand-600 hover:bg-brand-200'
          }`}
        >
          Alle ({bilder.length})
        </button>
        {kategorier.map((kat) => {
          const antall = bilder.filter((b) => b.kategori === kat).length
          return (
            <button
              key={kat}
              onClick={() => { setFilterKategori(kat); setAktivtIdx(0) }}
              className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${
                filterKategori === kat ? 'bg-tomtly-accent text-white' : 'bg-brand-100 text-brand-600 hover:bg-brand-200'
              }`}
            >
              {KATEGORI_LABEL[kat] || kat} ({antall})
            </button>
          )
        })}
      </div>

      {/* Hovedbilde */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 group bg-brand-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={aktivt.url}
          alt={aktivt.alt}
          className="absolute inset-0 w-full h-full object-contain bg-brand-900/5"
        />

        {/* Navigasjon */}
        {filtrert.length > 1 && (
          <>
            <button
              onClick={forrige}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={neste}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Fullskjerm */}
        <button
          onClick={() => setFullskjerm(true)}
          className="absolute top-3 right-3 p-2 bg-black/40 backdrop-blur-sm rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/60"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Teller */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white">
          {aktivtIdx + 1} / {filtrert.length}
        </div>

        {/* Bildetekst */}
        {aktivt.bildetekst && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
            <p className="text-sm text-white">{aktivt.bildetekst}</p>
          </div>
        )}
      </div>

      {/* Thumbnail-stripe */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filtrert.map((bilde, idx) => (
          <button
            key={bilde.id}
            onClick={() => setAktivtIdx(idx)}
            className={`flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
              idx === aktivtIdx ? 'border-tomtly-accent' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bilde.url}
              alt={bilde.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Fullskjerm-overlay */}
      {fullskjerm && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button
            onClick={() => setFullskjerm(false)}
            className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={aktivt.url}
            alt={aktivt.alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          />

          {filtrert.length > 1 && (
            <>
              <button onClick={forrige} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={neste} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 rounded-full text-white hover:bg-white/20">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
            <p className="text-white/80 text-sm">
              {aktivtIdx + 1} / {filtrert.length}
            </p>
            {aktivt.bildetekst && (
              <p className="text-white/60 text-xs mt-1 max-w-lg">{aktivt.bildetekst}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
