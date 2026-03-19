'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Hammer,
  CheckCircle2,
  ArrowRight,
  FileText,
  Users,
  Shield,
  TrendingUp,
  Zap,
} from 'lucide-react'

export default function ForEntreprenørerPage() {
  return (
    <>
      <HeroSection />
      <Problemet />
      <Losningen />
      <HvordanDetFungerer />
      <HvaFaarDu />
      <Prising />
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
            <Hammer className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For entreprenorer
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Kvalifiserte byggeprosjekter
            <br />
            <span className="text-green-400">levert til døren</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Slutt a jakte oppdrag. Tomtly kobler dere med tomtekjopere som allerede har kjopt tomt, valgt husmodell og fatt regulering avklart.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bli samarbeidsentreprenor
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#hvordan"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
            >
              Slik fungerer det
            </a>
          </div>
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
          Dere jakter oppdrag, gir tilbud som ikke forer noe sted, og konkurrerer på pris. Mye tid gar med på prosjekter som aldri blir noe av – fordi kjoperen ikke har finansiering, regulering ikke er avklart, eller prosjektet ikke er gjennomtenkt.
        </p>
      </div>
    </section>
  )
}

function Losningen() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-6">
          Losningen
        </h2>
        <p className="text-lg text-brand-600 leading-relaxed">
          Tomtly kobler dere med tomtekjopere som allerede har kjopt tomt, valgt husmodell, fatt regulering avklart og har finansiering på plass. Dere far kvalifiserte prosjekter – ikke umodne henvendelser.
        </p>
      </div>
    </section>
  )
}

function HvordanDetFungerer() {
  const steg = [
    {
      nummer: '01',
      tittel: 'Kjoper trykker "Innhent tilbud"',
      beskrivelse: 'Nar en kjoper har valgt husmodell og tomt, kan de innhente tilbud fra kvalifiserte entreprenorer.',
    },
    {
      nummer: '02',
      tittel: 'Vi sender prosjektbeskrivelse',
      beskrivelse: 'Dere mottar en komplett prosjektbeskrivelse med tomteinfo, husmodell, regulering og byggekalkyle.',
    },
    {
      nummer: '03',
      tittel: 'Dere gir tilbud',
      beskrivelse: 'Maks 2-3 entreprenorer far hvert prosjekt. Ingen masseutsendelser – kun kvalifiserte foresporsler.',
    },
    {
      nummer: '04',
      tittel: 'Kjoper velger',
      beskrivelse: 'Kjoperen sammenligner tilbud og velger entreprenor. Dere far oppdraget basert på kvalitet, ikke bare pris.',
    },
  ]

  return (
    <section id="hvordan" className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik fungerer det
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steg.map((s) => (
            <div key={s.nummer}>
              <div className="text-5xl font-display font-bold text-brand-200 mb-4">
                {s.nummer}
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">{s.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{s.beskrivelse}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HvaFaarDu() {
  const fordeler = [
    {
      ikon: FileText,
      tittel: 'Kvalifiserte prosjekter',
      beskrivelse: 'Kjoperen har tomt, husmodell, regulering og finansiering på plass. Dette er reelle byggeprosjekter.',
    },
    {
      ikon: Users,
      tittel: 'Maks 2-3 tilbydere',
      beskrivelse: 'Vi sender prosjektet til maks 2-3 entreprenorer. Ingen masseutsendelser der dere drukner i konkurranse.',
    },
    {
      ikon: Shield,
      tittel: 'Finansiert kjoper',
      beskrivelse: 'Kjoperen har fatt finansiering avklart for de innhenter tilbud. Ingen overraskelser.',
    },
    {
      ikon: Zap,
      tittel: 'Komplett underlag',
      beskrivelse: 'Dere far tomteinfo, regulering, husmodell med tegninger, og detaljert byggekalkyle. Alt dere trenger for a gi presist tilbud.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hva dere far
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {fordeler.map((f) => (
            <div key={f.tittel} className="bg-brand-50 rounded-xl p-6 border border-brand-200">
              <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center mb-4">
                <f.ikon className="w-5 h-5 text-tomtly-accent" />
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">{f.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{f.beskrivelse}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Prising() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-6">
          Prising
        </h2>
        <div className="bg-white rounded-2xl border-2 border-brand-200 p-8">
          <div className="flex items-baseline justify-center gap-1 mb-2">
            <span className="text-4xl font-bold text-tomtly-accent">Gratis</span>
          </div>
          <p className="text-brand-600 mb-4">a delta</p>
          <p className="text-sm text-brand-500 leading-relaxed">
            Tomtly tar et paslag ved signert kontrakt mellom kjoper og entreprenor. Dere betaler ingenting for a motta foresporsler og gi tilbud.
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
            Bli samarbeidsentreprenor
          </h2>
          <p className="text-brand-400">
            Fyll ut skjemaet, sa tar vi kontakt for en uforpliktende prat.
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Firmanavn *</label>
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Dekningsomrade</label>
              <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
                <option>Hele Norge</option>
                <option>Ostlandet</option>
                <option>Vestlandet</option>
                <option>Midt-Norge</option>
                <option>Nord-Norge</option>
                <option>Sorlandet</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Melding (valgfritt)</label>
              <textarea
                rows={3}
                placeholder="Fortell litt om selskapet og hva slags prosjekter dere tar..."
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bli samarbeidsentreprenor
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
