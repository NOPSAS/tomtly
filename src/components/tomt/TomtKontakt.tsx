'use client'

import { Phone, Mail, MessageCircle } from 'lucide-react'

export function TomtKontakt() {
  return (
    <div className="bg-white border border-brand-200 rounded-xl p-6">
      <h3 className="font-semibold text-tomtly-dark mb-4">Interessert?</h3>

      <div className="space-y-3 mb-6">
        <p className="text-sm text-brand-600">
          Ta kontakt for mer informasjon om denne tomten og mulighetene.
        </p>
      </div>

      <div className="space-y-3">
        <a href="tel:+4700000000" className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors">
          <Phone className="w-4 h-4" />
          Ring oss
        </a>
        <a href="mailto:hey@nops.no" className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-brand-200 text-brand-700 font-medium rounded-lg hover:bg-brand-50 transition-colors">
          <Mail className="w-4 h-4" />
          Send melding
        </a>
        <p className="text-xs text-brand-400 text-center mt-1">hey@nops.no</p>
      </div>

      {/* Prismodell */}
      <div className="mt-6 pt-6 border-t border-brand-200">
        <p className="text-xs text-brand-500 mb-2">Prismodell</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-brand-600">Fastpris</span>
            <span className="font-semibold text-tomtly-dark">20 000 kr</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-brand-600">Provisjon</span>
            <span className="font-semibold text-tomtly-dark">2% av salgssum</span>
          </div>
        </div>
      </div>
    </div>
  )
}
