'use client'

import { useState } from 'react'
import {
  Landmark,
  CheckCircle2,
  ArrowRight,
  FileText,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'

export default function ForBankerPage() {
  return (
    <>
      <HeroSection />
      <Problemet />
      <Losningen />
      <Partnerskapsmodell />
      <NokkelArgument />
      <CTASection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Landmark className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For banker
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Kvalifiserte byggelånskunder
            <br />
            <span className="text-green-400">med ferdig prosjektkalkyle</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Tomtly leverer byggelånskunder som har dokumentert tomt, profesjonell mulighetsstudie, detaljert byggekostnadskalkyle og valgt husmodell.
          </p>

          <a
            href="#kontakt"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Bli bankpartner – kontakt oss
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

function Problemet() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-6">
          Problemet
        </h2>
        <p className="text-lg text-brand-600 leading-relaxed">
          Kunder kommer med ufullstendig dokumentasjon, urealistiske budsjetter og uavklart regulering. Det forsinker prosessen, oker risikoen og krever mye manuelt arbeid fra bankens side.
        </p>
      </div>
    </section>
  )
}

function Losningen() {
  const punkter = [
    'Dokumentert tomt med matrikkeldata og reguleringsplan',
    'Profesjonell mulighetsstudie fra arkitektteam',
    'Detaljert byggekostnadskalkyle',
    'Valgt husmodell med spesifikasjoner og pris',
    'Verdivurdering av ferdig prosjekt',
  ]

  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-6">
            Losningen
          </h2>
          <p className="text-lg text-brand-600 leading-relaxed mb-8">
            Tomtly leverer byggelånskunder som allerede har alt på plass:
          </p>
        </div>

        <div className="bg-white rounded-xl border border-brand-200 p-8">
          <ul className="space-y-3">
            {punkter.map((p) => (
              <li key={p} className="flex items-start gap-3 text-brand-700">
                <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function Partnerskapsmodell() {
  const modeller = [
    {
      ikon: Zap,
      tittel: 'Kvalifiserte leads med komplett dokumentasjon',
      beskrivelse: 'Tomtly sender kvalifiserte byggelånskunder til banken med all dokumentasjon ferdig utfylt og verifisert.',
    },
    {
      ikon: Shield,
      tittel: 'Rask behandling for Tomtly-kunder',
      beskrivelse: 'Banken tilbyr rask og smidig behandling for kunder som kommer via Tomtly, med forutfylt dokumentasjon.',
    },
    {
      ikon: TrendingUp,
      tittel: 'Mulig: subsidier tomtanalysen',
      beskrivelse: 'Banken kan subsidiere tomtanalysen for kunder som tar byggelan. En liten investering for en kvalifisert lanskunde.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Partnerskapsmodell
          </h2>
          <p className="text-brand-600 max-w-lg mx-auto">
            Et partnerskap som gir verdi for bade banken og kundene.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {modeller.map((m) => (
            <div key={m.tittel} className="bg-brand-50 rounded-xl p-6 border border-brand-200">
              <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center mb-4">
                <m.ikon className="w-5 h-5 text-tomtly-accent" />
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">{m.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{m.beskrivelse}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function NokkelArgument() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-10">
          <TrendingUp className="w-10 h-10 text-tomtly-accent mx-auto mb-6" />
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-4">
            En byggelanskunde er verdt 50-100k kr i renteinntekter
          </h2>
          <p className="text-brand-600 leading-relaxed">
            Vi leverer dem med ferdig prosjektkalkyle, dokumentert tomt og valgt husmodell. Alt banken trenger for a ta en rask beslutning – klar til a behandle.
          </p>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  const [sendt, setSendt] = useState(false)

  return (
    <section id="kontakt" className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Bli bankpartner
          </h2>
          <p className="text-brand-400">
            Ta kontakt for a diskutere partnerskap og hvordan vi kan levere kvalifiserte byggelånskunder.
          </p>
        </div>

        {sendt ? (
          <div className="bg-forest-50 rounded-xl border border-forest-200 p-8 text-center">
            <CheckCircle2 className="w-10 h-10 text-tomtly-accent mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-tomtly-dark mb-2">Takk for henvendelsen!</h3>
            <p className="text-sm text-brand-600">Vi tar kontakt innen 1 virkedag.</p>
            <p className="text-xs text-brand-400 mt-2">hey@nops.no</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSendt(true) }}
            className="bg-white rounded-xl border border-brand-200 p-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Bank / Finansinstitusjon *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Kontaktperson *</label>
              <input
                type="text"
                required
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1.5">E-post *</label>
                <input
                  type="email"
                  required
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Melding (valgfritt)</label>
              <textarea
                rows={3}
                placeholder="Fortell oss om hva slags samarbeid dere ser for dere..."
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bli bankpartner – kontakt oss
            </button>
            <p className="text-xs text-brand-400 text-center">
              Vi tar kontakt innen 1 virkedag. hey@nops.no
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
