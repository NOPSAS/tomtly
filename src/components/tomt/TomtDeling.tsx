'use client'

import { useState } from 'react'
import { Share2, Download, Link2, Mail, Copy, Check, FileText, Printer } from 'lucide-react'

// ============================================================
// DELING OG NEDLASTING
// Del tomtesiden, last ned PDF-rapport, skriv ut.
// ============================================================

interface Props {
  adresse: string
  tomteId: string
}

export function TomtDeling({ adresse, tomteId }: Props) {
  const [kopiert, setKopiert] = useState(false)
  const [visDeling, setVisDeling] = useState(false)

  const url = typeof window !== 'undefined' ? window.location.href : ''

  const kopierLenke = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url)
      setKopiert(true)
      setTimeout(() => setKopiert(false), 2000)
    }
  }

  return (
    <div className="bg-white border border-brand-200 rounded-xl p-5">
      <h3 className="font-semibold text-tomtly-dark mb-3 text-sm">Del eller last ned</h3>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={kopierLenke}
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-xs font-medium text-brand-700 hover:bg-brand-100 transition-colors"
        >
          {kopiert ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-500" />
              Kopiert!
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              Kopier lenke
            </>
          )}
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: `Tomt: ${adresse}`, url })
            } else {
              setVisDeling(!visDeling)
            }
          }}
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-xs font-medium text-brand-700 hover:bg-brand-100 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          Del
        </button>

        <button className="flex items-center justify-center gap-2 px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-xs font-medium text-brand-700 hover:bg-brand-100 transition-colors">
          <FileText className="w-3.5 h-3.5" />
          Last ned PDF
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 px-3 py-2.5 bg-brand-50 border border-brand-200 rounded-lg text-xs font-medium text-brand-700 hover:bg-brand-100 transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          Skriv ut
        </button>
      </div>

      {visDeling && (
        <div className="mt-3 pt-3 border-t border-brand-100 space-y-2">
          <a
            href={`mailto:?subject=Se denne tomten: ${adresse}&body=Sjekk ut denne tomten på Tomtly: ${url}`}
            className="flex items-center gap-2 px-3 py-2 bg-brand-50 rounded-lg text-xs text-brand-600 hover:bg-brand-100"
          >
            <Mail className="w-3.5 h-3.5" />
            Send på e-post
          </a>
        </div>
      )}
    </div>
  )
}
