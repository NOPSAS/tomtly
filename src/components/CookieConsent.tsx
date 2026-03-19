'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('tomtly_cookie_consent')
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('tomtly_cookie_consent', 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-200 shadow-lg">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-brand-600 text-center sm:text-left">
          Vi bruker informasjonskapsler for å forbedre opplevelsen din.
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="/personvern"
            className="text-sm text-brand-500 hover:text-brand-700 underline whitespace-nowrap"
          >
            Les mer
          </Link>
          <button
            onClick={handleAccept}
            className="px-5 py-2 bg-tomtly-accent text-white text-sm font-medium rounded-lg hover:bg-forest-700 transition-colors whitespace-nowrap"
          >
            Godta
          </button>
        </div>
      </div>
    </div>
  )
}
