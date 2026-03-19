'use client'

import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'

export default function BetalingBekreftelse() {
  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl border border-brand-200 p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-8 h-8 text-tomtly-accent" />
        </div>
        <h1 className="font-display text-2xl font-bold text-tomtly-dark mb-3">
          Betaling mottatt!
        </h1>
        <p className="text-brand-600 mb-2">
          Takk for din bestilling. Vi starter arbeidet og tar kontakt innen 1 virkedag.
        </p>
        <p className="text-sm text-brand-500 mb-8">
          Du kan følge status på Min side.
        </p>
        <Link
          href="/min-side"
          className="inline-flex items-center gap-2 px-6 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
        >
          Gå til Min side
        </Link>
      </div>
    </div>
  )
}
