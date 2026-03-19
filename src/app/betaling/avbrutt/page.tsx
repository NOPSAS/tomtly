'use client'

import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function BetalingAvbrutt() {
  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl border border-brand-200 p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="font-display text-2xl font-bold text-tomtly-dark mb-3">
          Betalingen ble avbrutt
        </h1>
        <p className="text-brand-600 mb-8">
          Du kan prøve igjen eller kontakte oss på{' '}
          <a href="mailto:hey@nops.no" className="text-tomtly-accent hover:underline">
            hey@nops.no
          </a>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/selger/onboarding"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Prøv igjen
          </Link>
          <a
            href="mailto:hey@nops.no"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-brand-200 text-brand-700 font-medium rounded-lg hover:bg-brand-50 transition-colors"
          >
            Kontakt oss
          </a>
        </div>
      </div>
    </div>
  )
}
