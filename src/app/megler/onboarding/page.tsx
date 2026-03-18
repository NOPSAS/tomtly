'use client'

import { useState } from 'react'
import {
  Building2,
  Users,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Shield,
} from 'lucide-react'
import { SkreddersyddAvtale } from '@/components/SkreddersyddAvtale'

// ============================================================
// MEGLER ONBOARDING – 3-stegs wizard for eiendomsmeglere
// ============================================================

const STEG = [
  { nummer: 1, tittel: 'Firma', ikon: Building2 },
  { nummer: 2, tittel: 'Velkommen', ikon: CheckCircle2 },
]

export default function MeglerOnboarding() {
  const [steg, setSteg] = useState(1)

  return (
    <div className="min-h-screen bg-brand-50">
      {/* Header */}
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="font-display text-2xl font-bold text-tomtly-dark mb-1">
            Tomtly for meglere
          </h1>
          <p className="text-sm text-brand-500">
            Gratis for meglere. Legg til tomtene dine – vi lager mulighetsstudie. Du beholder provisjonen.
          </p>

          <div className="flex items-center gap-2 mt-6">
            {STEG.map((s, idx) => (
              <div key={s.nummer} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    steg === s.nummer
                      ? 'bg-tomtly-accent text-white'
                      : steg > s.nummer
                        ? 'bg-forest-100 text-forest-700'
                        : 'bg-brand-100 text-brand-400'
                  }`}
                >
                  <s.ikon className="w-4 h-4" />
                  <span className="hidden sm:inline">{s.tittel}</span>
                </div>
                {idx < STEG.length - 1 && (
                  <div className={`flex-1 h-0.5 ${steg > s.nummer ? 'bg-forest-300' : 'bg-brand-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {steg === 1 && <Steg1Firma />}
        {steg === 2 && <Steg3Velkommen />}

        <div className="flex justify-between mt-10">
          {steg > 1 ? (
            <button
              onClick={() => setSteg(steg - 1)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-600"
            >
              <ArrowLeft className="w-4 h-4" />
              Tilbake
            </button>
          ) : (
            <div />
          )}

          {steg < 2 ? (
            <button
              onClick={() => setSteg(steg + 1)}
              className="flex items-center gap-2 px-6 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Neste
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button className="flex items-center gap-2 px-6 py-2.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors">
              <CheckCircle2 className="w-4 h-4" />
              Opprett gratis meglerkonto
            </button>
          )}
        </div>

        <SkreddersyddAvtale />
      </div>
    </div>
  )
}

function Steg1Firma() {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8">
      <h2 className="text-lg font-semibold text-tomtly-dark mb-6">
        Om meglerforetaket
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Firmanavn
          </label>
          <input
            type="text"
            placeholder="F.eks. Krogsveen Oppegård"
            className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">
              Org.nr
            </label>
            <input
              type="text"
              placeholder="123 456 789"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">
              Meglerforetaksnr
            </label>
            <input
              type="text"
              placeholder="XX-XXXX"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Kontaktperson
          </label>
          <input
            type="text"
            className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post</label>
            <input
              type="email"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1.5">Telefon</label>
            <input
              type="tel"
              className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Antall meglere
          </label>
          <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
            <option>1-5</option>
            <option>6-15</option>
            <option>16-50</option>
            <option>50+</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function Steg2Plan() {
  const [valgt, setValgt] = useState<'abonnement' | 'per-tomt'>('abonnement')

  const inkludertAllePlaner = [
    'Tomtescore og reguleringsanalyse',
    'Mulighetsstudie og scenarioer',
    'Byggekostnad og salgsverdi',
    'Dispensasjons- og kravanalyse',
    'Godkjente tiltak i nærområdet',
    'Entreprenørprising',
    'Finansieringsberegner',
    'Tidslinje for byggesøknad',
    'Risikoanalyse',
    'Prosjektsjekkliste',
    'Fastpris tegning og søknad via Tegnebua',
    'Meglerdashboard',
  ]

  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8">
      <h2 className="text-lg font-semibold text-tomtly-dark mb-2">
        Velg plan
      </h2>
      <p className="text-sm text-brand-500 mb-6">
        Alle planer inkluderer full tomteanalyse og mulighetsstudie per tomt.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setValgt('abonnement')}
          className={`text-left p-6 rounded-xl border-2 transition-all relative ${
            valgt === 'abonnement'
              ? 'border-tomtly-accent bg-forest-50'
              : 'border-brand-200 hover:border-brand-300'
          }`}
        >
          <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
            Anbefalt
          </div>
          <p className="text-sm font-medium text-brand-500">Abonnement</p>
          <p className="text-2xl font-bold text-tomtly-dark mt-1">
            7 500
            <span className="text-sm font-normal text-brand-400"> kr/mnd</span>
          </p>
          <p className="text-xs text-brand-600 mt-2">Inkluderer alt per tomt</p>
          <p className="text-xs text-brand-600">Full tilgang til plattformen</p>
        </button>

        <button
          onClick={() => setValgt('per-tomt')}
          className={`text-left p-6 rounded-xl border-2 transition-all ${
            valgt === 'per-tomt'
              ? 'border-tomtly-accent bg-forest-50'
              : 'border-brand-200 hover:border-brand-300'
          }`}
        >
          <p className="text-sm font-medium text-brand-500">Per tomt</p>
          <p className="text-2xl font-bold text-tomtly-dark mt-1">
            5 000
            <span className="text-sm font-normal text-brand-400"> kr</span>
          </p>
          <p className="text-xs text-brand-600 mt-2">Rabattert engangspris per tomt</p>
          <p className="text-xs text-brand-600">Ingen abonnement nødvendig</p>
        </button>
      </div>

      <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
        <h4 className="text-sm font-semibold text-brand-700 mb-3">Inkludert per tomt</h4>
        <div className="grid grid-cols-2 gap-2">
          {inkludertAllePlaner.map((f) => (
            <div key={f} className="flex items-center gap-1.5 text-xs text-brand-600">
              <CheckCircle2 className="w-3.5 h-3.5 text-tomtly-accent flex-shrink-0" />
              {f}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 bg-brand-50 rounded-lg p-3 border border-brand-100">
        <p className="text-xs text-brand-500">
          <strong>Større behov?</strong> Kontakt oss for skreddersydd avtale med volumrabatt.
          Alle priser eks. mva.
        </p>
      </div>
    </div>
  )
}

function Steg3Velkommen() {
  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8 text-center">
      <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Building2 className="w-8 h-8 text-tomtly-accent" />
      </div>
      <h2 className="text-xl font-semibold text-tomtly-dark mb-2">
        Velkommen til Tomtly!
      </h2>
      <p className="text-brand-600 max-w-md mx-auto mb-8">
        Du er klar til å gi dine kunder Norges beste tomtepresentasjon.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-lg mx-auto">
        <div className="bg-brand-50 rounded-xl p-4 text-center">
          <BarChart3 className="w-6 h-6 text-tomtly-accent mx-auto mb-2" />
          <p className="text-xs text-brand-600">Dashboard</p>
        </div>
        <div className="bg-brand-50 rounded-xl p-4 text-center">
          <Users className="w-6 h-6 text-tomtly-accent mx-auto mb-2" />
          <p className="text-xs text-brand-600">Team-tilgang</p>
        </div>
        <div className="bg-brand-50 rounded-xl p-4 text-center">
          <Shield className="w-6 h-6 text-tomtly-accent mx-auto mb-2" />
          <p className="text-xs text-brand-600">Prioritert support</p>
        </div>
      </div>
    </div>
  )
}
