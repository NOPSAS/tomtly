'use client'

import { useState } from 'react'
import {
  Building2,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  Shield,
  Users,
} from 'lucide-react'
import { SkreddersyddAvtale } from '@/components/SkreddersyddAvtale'

const STEG = [
  { nummer: 1, tittel: 'Firma', ikon: Building2 },
  { nummer: 2, tittel: 'Plan', ikon: CreditCard },
  { nummer: 3, tittel: 'Velkommen', ikon: CheckCircle2 },
]

export default function UtviklerOnboarding() {
  const [steg, setSteg] = useState(1)

  return (
    <div className="min-h-screen bg-brand-50">
      <div className="bg-white border-b border-brand-200">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="font-display text-2xl font-bold text-tomtly-dark mb-1">
            Tomtly for eiendomsutviklere
          </h1>
          <p className="text-sm text-brand-500">
            Finn tomter med potensial og få full analyse for raskere beslutninger.
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
        {steg === 2 && <Steg2Plan />}
        {steg === 3 && <Steg3Velkommen />}

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

          {steg < 3 ? (
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
              Opprett utviklerkonto
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
        Om utviklerselskapet
      </h2>

      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-brand-700 mb-1.5">
            Firmanavn
          </label>
          <input
            type="text"
            placeholder="F.eks. Veidekke Eiendom"
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
              Antall prosjekter per år
            </label>
            <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
              <option>1-5</option>
              <option>6-15</option>
              <option>16-50</option>
              <option>50+</option>
            </select>
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
      </div>
    </div>
  )
}

function Steg2Plan() {
  const [valgt, setValgt] = useState<'starter' | 'pro'>('pro')

  const planer = [
    {
      id: 'starter' as const,
      navn: 'Utvikler',
      pris: '10 000',
      periode: '/mnd',
      tomter: '2 tomter inkludert',
      husmodeller: '3 husmodeller per tomt',
      tillegg: '5 000 kr per ekstra tomt',
      features: [
        '2 tomter med full analyse',
        '3 husmodeller per tomt',
      ],
    },
    {
      id: 'pro' as const,
      navn: 'Utvikler Pro',
      pris: '20 000',
      periode: '/mnd',
      tomter: '5 tomter inkludert',
      husmodeller: '5 husmodeller per tomt',
      tillegg: '5 000 kr per ekstra tomt',
      popular: true,
      features: [
        '5 tomter med full analyse',
        '5 husmodeller per tomt',
      ],
    },
  ]

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
    'Utviklerdashboard',
  ]

  return (
    <div className="bg-white rounded-xl border border-brand-200 p-8">
      <h2 className="text-lg font-semibold text-tomtly-dark mb-2">
        Velg plan
      </h2>
      <p className="text-sm text-brand-500 mb-6">
        Alle planer inkluderer full tomteanalyse og mulighetsstudie.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {planer.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setValgt(plan.id)}
            className={`text-left p-6 rounded-xl border-2 transition-all relative ${
              valgt === plan.id
                ? 'border-tomtly-accent bg-forest-50'
                : 'border-brand-200 hover:border-brand-300'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-2.5 right-4 px-2 py-0.5 bg-tomtly-accent text-white text-xs rounded-full">
                Anbefalt
              </div>
            )}
            <p className="text-sm font-medium text-brand-500">{plan.navn}</p>
            <p className="text-2xl font-bold text-tomtly-dark mt-1">
              {plan.pris}
              <span className="text-sm font-normal text-brand-400"> kr{plan.periode}</span>
            </p>
            <p className="text-xs font-semibold text-forest-700 mt-2">{plan.tomter}</p>
            <p className="text-xs text-brand-600">{plan.husmodeller}</p>
            <p className="text-[10px] text-brand-400 mt-1">{plan.tillegg}</p>
          </button>
        ))}
      </div>

      <div className="bg-brand-50 rounded-xl p-5 border border-brand-200">
        <h4 className="text-sm font-semibold text-brand-700 mb-3">Inkludert i alle planer – per tomt</h4>
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
        Du er klar til å finne tomter med utviklingspotensial og få full analyse.
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
