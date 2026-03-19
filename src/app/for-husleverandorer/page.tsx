'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Home,
  CheckCircle2,
  ArrowRight,
  Eye,
  TrendingUp,
  Target,
  Zap,
  Send,
  FileText,
} from 'lucide-react'

export default function ForHusleverandørerPage() {
  return (
    <>
      <HeroSection />
      <Problemet />
      <Losningen />
      <HvaViGjor />
      <KomIGang />
      <NokkelArgument />
      <KontaktSkjema />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
            <Home className="w-3.5 h-3.5 text-green-400" />
            <span className="text-xs text-white/80 font-medium">
              For ferdighusleverandører
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Vis husene deres til folk
            <br />
            <span className="text-green-400">som faktisk har tomt</span>
          </h1>

          <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
            Tomtly plasserer husmodellene deres direkte i mulighetsstudier for reelle tomter. Kjøpere ser SITT hus på DENNE tomten.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Ta kontakt
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
          Dere bruker hundretusener på markedsføring for a na folk med tomt. De er nesten umulige a finne. Husannonser treffer tusenvis som bare drommesvever – men ikke de som faktisk har en tomt å bygge pa.
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
          Tomtly plasserer husmodellene deres direkte i mulighetsstudier for reelle tomter. Kjøpere ser husene deres på en konkret tomt, med ferdig byggekalkyle og reguleringsavklaring. Dette er ikke annonsering – dette er kvalifiserte leads.
        </p>
      </div>
    </section>
  )
}

function HvaViGjor() {
  const punkter = [
    {
      ikon: FileText,
      tittel: 'Vi tegner opp alle husene deres i 3D',
      beskrivelse: 'Send oss tegninger og huspriser. Vi modellerer husene slik at de kan plasseres på enhver tomt.',
    },
    {
      ikon: Target,
      tittel: 'Vi presenterer husene på ekte tomter',
      beskrivelse: 'Husmodellene vises i mulighetsstudier med komplett byggekalkyle, tilpasset tomtens regulering og forutsetninger.',
    },
    {
      ikon: Eye,
      tittel: 'Kjøpere ser SITT hus på DENNE tomten',
      beskrivelse: 'Ikke en generisk annonse. Kjøperen ser noyaktig hvordan huset deres ser ut på den tomten de vurderer.',
    },
    {
      ikon: Zap,
      tittel: 'Leadet er deres – vi tar ingenting',
      beskrivelse: 'Vi tar ingenting for kunder som blir salg. Nar en kjoper velger deres husmodell, mottar dere et kvalifisert lead med all tomteinfo.',
    },
  ]

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Hva vi gjor for dere
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {punkter.map((p) => (
            <div key={p.tittel} className="bg-brand-50 rounded-xl p-6 border border-brand-200">
              <div className="w-10 h-10 bg-forest-50 rounded-lg flex items-center justify-center mb-4">
                <p.ikon className="w-5 h-5 text-tomtly-accent" />
              </div>
              <h3 className="font-semibold text-tomtly-dark mb-2">{p.tittel}</h3>
              <p className="text-sm text-brand-600 leading-relaxed">{p.beskrivelse}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function KomIGang() {
  const steg = [
    {
      nummer: '01',
      tittel: 'Send oss husmodeller',
      beskrivelse: 'Send tegninger, plantegninger og priser for husmodellene dere vil ha på plattformen.',
    },
    {
      nummer: '02',
      tittel: 'Vi tegner dem opp i 3D',
      beskrivelse: 'Vi modellerer husene slik at de kan plasseres og visualiseres på enhver tomt.',
    },
    {
      nummer: '03',
      tittel: 'Husene vises på matchende tomter',
      beskrivelse: 'Husmodellene presenteres automatisk i mulighetsstudier for tomter der de passer – basert på regulering, storrelse og prisklasse.',
    },
    {
      nummer: '04',
      tittel: 'Dere mottar kvalifiserte leads',
      beskrivelse: 'Nar en kjoper velger deres husmodell, far dere et lead med komplett tomteinfo og kontaktdetaljer.',
    },
  ]

  return (
    <section id="hvordan" className="bg-tomtly-warm py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-4">
            Slik kommer dere i gang
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

function NokkelArgument() {
  return (
    <section className="bg-brand-50 py-20 lg:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl border-2 border-tomtly-accent p-10">
          <TrendingUp className="w-10 h-10 text-tomtly-accent mx-auto mb-6" />
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-4">
            En huskontrakt er verdt 3-5 MNOK
          </h2>
          <p className="text-brand-600 leading-relaxed">
            Vi leverer leads som allerede har sett huset deres på en konkret tomt med ferdig kalkyle. Disse er ikke drommere – de har tomt, de har sett prisen, og de er klare til å ta en beslutning.
          </p>
        </div>
      </div>
    </section>
  )
}

function KontaktSkjema() {
  const [sendt, setSendt] = useState(false)

  return (
    <section id="kontakt" className="bg-tomtly-dark py-20 lg:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-white mb-3">
            Bli med på Tomtly
          </h2>
          <p className="text-brand-400">
            Send oss en henvendelse, sa tar vi kontakt for a diskutere samarbeid.
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
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Antall husmodeller</label>
              <select className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20">
                <option>1-10</option>
                <option>11-30</option>
                <option>31-50</option>
                <option>50+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-700 mb-1.5">Melding (valgfritt)</label>
              <textarea
                rows={3}
                placeholder="Fortell litt om selskapet og husmodellene deres..."
                className="w-full px-3 py-2.5 border border-brand-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-tomtly-accent/20 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Send henvendelse
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
