'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  MapPin,
  TrendingUp,
  Ruler,
  Home,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Municipality data
// ---------------------------------------------------------------------------

interface KommuneData {
  navn: string
  region: 'ostlandet' | 'storby'
  prisKlasse: 'hoy' | 'middels' | 'lav'
  naboer: string[]
}

const KOMMUNER: Record<string, KommuneData> = {
  // Østlandet
  oslo: { navn: 'Oslo', region: 'ostlandet', prisKlasse: 'hoy', naboer: ['barum', 'asker', 'lillestrøm', 'nordre-follo', 'nesodden', 'lorenskog'] },
  barum: { navn: 'Bærum', region: 'ostlandet', prisKlasse: 'hoy', naboer: ['oslo', 'asker', 'hole', 'ringerike', 'lier'] },
  asker: { navn: 'Asker', region: 'ostlandet', prisKlasse: 'hoy', naboer: ['oslo', 'barum', 'lier', 'drammen'] },
  lillestrom: { navn: 'Lillestrøm', region: 'ostlandet', prisKlasse: 'hoy', naboer: ['oslo', 'lorenskog', 'nes', 'gjerdrum', 'nittedal', 'rae'] },
  'nordre-follo': { navn: 'Nordre Follo', region: 'ostlandet', prisKlasse: 'hoy', naboer: ['oslo', 'nesodden', 'frogn', 'as', 'enebakk'] },
  nesodden: { navn: 'Nesodden', region: 'ostlandet', prisKlasse: 'middels', naboer: ['oslo', 'nordre-follo', 'frogn', 'as'] },
  frogn: { navn: 'Frogn', region: 'ostlandet', prisKlasse: 'middels', naboer: ['nordre-follo', 'nesodden', 'vestby', 'as'] },
  vestby: { navn: 'Vestby', region: 'ostlandet', prisKlasse: 'middels', naboer: ['frogn', 'as', 'moss', 'indre-ostfold'] },
  as: { navn: 'Ås', region: 'ostlandet', prisKlasse: 'middels', naboer: ['nordre-follo', 'nesodden', 'frogn', 'vestby', 'enebakk'] },
  enebakk: { navn: 'Enebakk', region: 'ostlandet', prisKlasse: 'middels', naboer: ['nordre-follo', 'as', 'indre-ostfold', 'rae'] },
  rae: { navn: 'Rælingen', region: 'ostlandet', prisKlasse: 'middels', naboer: ['lillestrom', 'lorenskog', 'enebakk'] },
  lorenskog: { navn: 'Lørenskog', region: 'ostlandet', prisKlasse: 'hoy', naboer: ['oslo', 'lillestrom', 'rae'] },
  nittedal: { navn: 'Nittedal', region: 'ostlandet', prisKlasse: 'middels', naboer: ['oslo', 'lillestrom', 'gjerdrum', 'nannestad'] },
  gjerdrum: { navn: 'Gjerdrum', region: 'ostlandet', prisKlasse: 'middels', naboer: ['lillestrom', 'nittedal', 'nannestad', 'ullensaker'] },
  nannestad: { navn: 'Nannestad', region: 'ostlandet', prisKlasse: 'lav', naboer: ['gjerdrum', 'ullensaker', 'eidsvoll', 'hurdal', 'nittedal'] },
  eidsvoll: { navn: 'Eidsvoll', region: 'ostlandet', prisKlasse: 'lav', naboer: ['nannestad', 'ullensaker', 'hurdal', 'nes'] },
  hurdal: { navn: 'Hurdal', region: 'ostlandet', prisKlasse: 'lav', naboer: ['nannestad', 'eidsvoll'] },
  ullensaker: { navn: 'Ullensaker', region: 'ostlandet', prisKlasse: 'middels', naboer: ['gjerdrum', 'nannestad', 'eidsvoll', 'nes'] },
  nes: { navn: 'Nes', region: 'ostlandet', prisKlasse: 'lav', naboer: ['lillestrom', 'ullensaker', 'eidsvoll', 'aurskog-holand'] },
  'aurskog-holand': { navn: 'Aurskog-Høland', region: 'ostlandet', prisKlasse: 'lav', naboer: ['nes', 'lillestrom', 'indre-ostfold'] },
  rakkestad: { navn: 'Rakkestad', region: 'ostlandet', prisKlasse: 'lav', naboer: ['indre-ostfold', 'sarpsborg', 'halden'] },
  sarpsborg: { navn: 'Sarpsborg', region: 'ostlandet', prisKlasse: 'middels', naboer: ['fredrikstad', 'halden', 'rakkestad', 'indre-ostfold'] },
  fredrikstad: { navn: 'Fredrikstad', region: 'ostlandet', prisKlasse: 'middels', naboer: ['sarpsborg', 'hvaler', 'rade', 'moss'] },
  halden: { navn: 'Halden', region: 'ostlandet', prisKlasse: 'lav', naboer: ['sarpsborg', 'rakkestad'] },
  moss: { navn: 'Moss', region: 'ostlandet', prisKlasse: 'middels', naboer: ['vestby', 'rade', 'fredrikstad'] },
  rygge: { navn: 'Rygge', region: 'ostlandet', prisKlasse: 'middels', naboer: ['moss', 'rade', 'fredrikstad'] },
  rade: { navn: 'Råde', region: 'ostlandet', prisKlasse: 'middels', naboer: ['moss', 'rygge', 'fredrikstad'] },
  hvaler: { navn: 'Hvaler', region: 'ostlandet', prisKlasse: 'middels', naboer: ['fredrikstad'] },
  'indre-ostfold': { navn: 'Indre Østfold', region: 'ostlandet', prisKlasse: 'lav', naboer: ['sarpsborg', 'rakkestad', 'vestby', 'enebakk', 'aurskog-holand'] },
  drammen: { navn: 'Drammen', region: 'ostlandet', prisKlasse: 'middels', naboer: ['asker', 'lier', 'ovre-eiker', 'nedre-eiker', 'modum'] },
  lier: { navn: 'Lier', region: 'ostlandet', prisKlasse: 'middels', naboer: ['asker', 'barum', 'drammen'] },
  'ovre-eiker': { navn: 'Øvre Eiker', region: 'ostlandet', prisKlasse: 'lav', naboer: ['drammen', 'nedre-eiker', 'kongsberg', 'modum'] },
  'nedre-eiker': { navn: 'Nedre Eiker', region: 'ostlandet', prisKlasse: 'lav', naboer: ['drammen', 'ovre-eiker', 'modum'] },
  kongsberg: { navn: 'Kongsberg', region: 'ostlandet', prisKlasse: 'lav', naboer: ['ovre-eiker', 'flesberg', 'notodden'] },
  ringerike: { navn: 'Ringerike', region: 'ostlandet', prisKlasse: 'lav', naboer: ['barum', 'hole', 'modum', 'sigdal'] },
  hole: { navn: 'Hole', region: 'ostlandet', prisKlasse: 'middels', naboer: ['barum', 'ringerike'] },
  modum: { navn: 'Modum', region: 'ostlandet', prisKlasse: 'lav', naboer: ['drammen', 'ringerike', 'sigdal', 'ovre-eiker', 'nedre-eiker'] },
  sigdal: { navn: 'Sigdal', region: 'ostlandet', prisKlasse: 'lav', naboer: ['modum', 'ringerike', 'flesberg', 'rollag'] },
  flesberg: { navn: 'Flesberg', region: 'ostlandet', prisKlasse: 'lav', naboer: ['kongsberg', 'sigdal', 'rollag'] },
  rollag: { navn: 'Rollag', region: 'ostlandet', prisKlasse: 'lav', naboer: ['flesberg', 'sigdal'] },
  toensberg: { navn: 'Tønsberg', region: 'ostlandet', prisKlasse: 'middels', naboer: ['sandefjord', 'horten', 'holmestrand', 'faerder', 're'] },
  sandefjord: { navn: 'Sandefjord', region: 'ostlandet', prisKlasse: 'middels', naboer: ['toensberg', 'larvik', 'faerder'] },
  larvik: { navn: 'Larvik', region: 'ostlandet', prisKlasse: 'lav', naboer: ['sandefjord', 'porsgrunn'] },
  porsgrunn: { navn: 'Porsgrunn', region: 'ostlandet', prisKlasse: 'lav', naboer: ['larvik', 'skien', 'bamble'] },
  skien: { navn: 'Skien', region: 'ostlandet', prisKlasse: 'lav', naboer: ['porsgrunn', 'bamble', 'notodden'] },
  bamble: { navn: 'Bamble', region: 'ostlandet', prisKlasse: 'lav', naboer: ['porsgrunn', 'skien', 'krageroe'] },
  krageroe: { navn: 'Kragerø', region: 'ostlandet', prisKlasse: 'lav', naboer: ['bamble'] },
  notodden: { navn: 'Notodden', region: 'ostlandet', prisKlasse: 'lav', naboer: ['skien', 'kongsberg'] },
  horten: { navn: 'Horten', region: 'ostlandet', prisKlasse: 'middels', naboer: ['toensberg', 'holmestrand'] },
  holmestrand: { navn: 'Holmestrand', region: 'ostlandet', prisKlasse: 'lav', naboer: ['toensberg', 'horten', 're', 'drammen'] },
  re: { navn: 'Re', region: 'ostlandet', prisKlasse: 'lav', naboer: ['toensberg', 'holmestrand', 'sandefjord'] },
  faerder: { navn: 'Færder', region: 'ostlandet', prisKlasse: 'middels', naboer: ['toensberg', 'sandefjord'] },

  // Største byer (resten av Norge)
  bergen: { navn: 'Bergen', region: 'storby', prisKlasse: 'hoy', naboer: ['stavanger', 'haugesund', 'aalesund'] },
  stavanger: { navn: 'Stavanger', region: 'storby', prisKlasse: 'hoy', naboer: ['sandnes', 'haugesund', 'bergen'] },
  sandnes: { navn: 'Sandnes', region: 'storby', prisKlasse: 'middels', naboer: ['stavanger', 'haugesund'] },
  kristiansand: { navn: 'Kristiansand', region: 'storby', prisKlasse: 'middels', naboer: ['stavanger', 'sandnes'] },
  tromsoe: { navn: 'Tromsø', region: 'storby', prisKlasse: 'middels', naboer: ['bodo'] },
  bodo: { navn: 'Bodø', region: 'storby', prisKlasse: 'middels', naboer: ['tromsoe'] },
  aalesund: { navn: 'Ålesund', region: 'storby', prisKlasse: 'middels', naboer: ['molde', 'bergen'] },
  haugesund: { navn: 'Haugesund', region: 'storby', prisKlasse: 'lav', naboer: ['stavanger', 'sandnes', 'bergen'] },
  molde: { navn: 'Molde', region: 'storby', prisKlasse: 'lav', naboer: ['aalesund'] },
  hamar: { navn: 'Hamar', region: 'storby', prisKlasse: 'middels', naboer: ['lillehammer', 'gjovik', 'elverum', 'kongsvinger'] },
  lillehammer: { navn: 'Lillehammer', region: 'storby', prisKlasse: 'middels', naboer: ['hamar', 'gjovik'] },
  gjovik: { navn: 'Gjøvik', region: 'storby', prisKlasse: 'lav', naboer: ['hamar', 'lillehammer'] },
  kongsvinger: { navn: 'Kongsvinger', region: 'storby', prisKlasse: 'lav', naboer: ['hamar', 'elverum'] },
  elverum: { navn: 'Elverum', region: 'storby', prisKlasse: 'lav', naboer: ['hamar', 'kongsvinger'] },
}

// ---------------------------------------------------------------------------
// Hash function for consistent pseudo-random data
// ---------------------------------------------------------------------------

function hashSlug(slug: string): number {
  let hash = 0
  for (let i = 0; i < slug.length; i++) {
    const char = slug.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function genStats(slug: string, prisKlasse: 'hoy' | 'middels' | 'lav') {
  const h = hashSlug(slug)

  const prisRanges = {
    hoy:     { snittMin: 2000, snittMax: 5000, min: 1500, max: 7000 },
    middels: { snittMin: 1000, snittMax: 2500, min: 600,  max: 3500 },
    lav:     { snittMin: 500,  snittMax: 1500, min: 300,  max: 2200 },
  }

  const r = prisRanges[prisKlasse]
  const snittpris = r.snittMin + (h % (r.snittMax - r.snittMin))
  const antallTomter = 5 + (h % 46)
  const snittStorrelse = 400 + ((h >> 3) % 801)
  const pristrend = 5 + (h % 11)
  const prisMin = r.min + ((h >> 2) % ((snittpris - r.min) || 100))
  const prisMax = snittpris + ((h >> 4) % ((r.max - snittpris) || 100))

  return { snittpris, antallTomter, snittStorrelse, pristrend, prisMin, prisMax }
}

function formatKr(n: number): string {
  if (n >= 1000) {
    const mill = n / 1000
    return mill % 1 === 0 ? `${mill} MNOK` : `${mill.toFixed(1)} MNOK`
  }
  return `${n} 000 kr`
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function KommuneSlugPage() {
  const params = useParams()
  const slug = params?.slug as string

  const data = KOMMUNER[slug]
  if (!data) {
    notFound()
  }

  const { navn, naboer, prisKlasse } = data
  const stats = genStats(slug, prisKlasse)
  const naboKommuner = naboer.filter((n) => KOMMUNER[n]).slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="bg-tomtly-dark py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
              <MapPin className="w-3.5 h-3.5 text-green-400" />
              <span className="text-xs text-white/80 font-medium">
                {navn} kommune
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
              Tomter til salgs
              <br />
              <span className="text-green-400">i {navn}</span>
            </h1>

            <p className="text-lg text-brand-400 leading-relaxed mb-10 max-w-xl">
              Se ledige tomter, priser og muligheter i {navn} kommune
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/for-tomteeiere"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
              >
                Bestill tomtanalyse
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/hva-kan-jeg-bygge"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-600 text-brand-300 font-medium rounded-lg hover:bg-brand-900 transition-colors"
              >
                Sjekk hva du kan bygge
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistikk-kort */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <StatKort
              ikon={<BarChart3 className="w-5 h-5 text-tomtly-accent" />}
              tittel="Gjennomsnittspris tomt"
              verdi={formatKr(stats.snittpris)}
            />
            <StatKort
              ikon={<MapPin className="w-5 h-5 text-tomtly-accent" />}
              tittel="Antall ledige tomter"
              verdi={`${stats.antallTomter}`}
            />
            <StatKort
              ikon={<Ruler className="w-5 h-5 text-tomtly-accent" />}
              tittel="Snitt tomtestørrelse"
              verdi={`${stats.snittStorrelse} m²`}
            />
            <StatKort
              ikon={<TrendingUp className="w-5 h-5 text-tomtly-accent" />}
              tittel="Pristrend siste år"
              verdi={`+${stats.pristrend} %`}
            />
          </div>
        </div>
      </section>

      {/* Hva koster en tomt */}
      <section className="bg-tomtly-warm py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-8 text-center">
            Hva koster en tomt i {navn}?
          </h2>

          <div className="bg-white rounded-2xl border border-brand-200 p-8">
            <div className="mb-6">
              <div className="flex justify-between text-sm text-brand-600 mb-2">
                <span>{formatKr(stats.prisMin)}</span>
                <span>{formatKr(stats.prisMax)}</span>
              </div>
              <div className="w-full h-4 bg-brand-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #2d5a3d 0%, #c4a35a 100%)',
                    width: '100%',
                  }}
                />
              </div>
              <div className="flex justify-center mt-2">
                <span className="text-sm font-semibold text-tomtly-dark">
                  Snitt: {formatKr(stats.snittpris)}
                </span>
              </div>
            </div>

            <p className="text-sm text-brand-500 text-center">
              Prisene varierer avhengig av beliggenhet, regulering og størrelse
            </p>
          </div>
        </div>
      </section>

      {/* Hva kan du bygge */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-6 text-center">
            Hva kan du bygge i {navn}?
          </h2>

          <div className="bg-brand-50 rounded-2xl border border-brand-200 p-8">
            <ul className="space-y-3 mb-6">
              {[
                `De fleste boligtomter i ${navn} tillater eneboliger, tomannsboliger eller rekkehus`,
                'Utnyttelsesgrad og byggehøyde avhenger av reguleringsplanen for den enkelte tomt',
                'Kommuneplanen setter overordnede rammer for arealbruk i kommunen',
                'Det kan være spesielle krav til estetikk, materialvalg og takform i noen områder',
              ].map((tekst) => (
                <li key={tekst} className="flex items-start gap-3 text-brand-700">
                  <CheckCircle2 className="w-5 h-5 text-tomtly-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{tekst}</span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              <Link
                href="/hva-kan-jeg-bygge"
                className="inline-flex items-center gap-2 text-tomtly-accent font-medium hover:underline"
              >
                Sjekk din spesifikke tomt
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tomtly i [Kommune] */}
      <section className="bg-tomtly-warm py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-tomtly-dark mb-6">
            Tomtly i {navn}
          </h2>

          <p className="text-brand-600 leading-relaxed mb-4 max-w-xl mx-auto">
            Vi analyserer tomter i {navn} med mulighetsstudie, husmodeller og byggekalkyle.
            Komplett pakke som gjør tomten attraktiv for kjøpere.
          </p>

          <p className="text-lg font-semibold text-tomtly-dark mb-8">
            For 4 990 kr + 2 % suksesshonorar + mva ved salg
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/for-tomteeiere"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
            >
              Bestill tomtanalyse
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/hva-kan-jeg-bygge"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-brand-300 text-brand-700 font-medium rounded-lg hover:bg-white transition-colors"
            >
              Sjekk hva du kan bygge (gratis)
            </Link>
          </div>
        </div>
      </section>

      {/* Nærliggende kommuner */}
      {naboKommuner.length > 0 && (
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-8 text-center">
              Nærliggende kommuner
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {naboKommuner.map((naboSlug) => {
                const nabo = KOMMUNER[naboSlug]
                if (!nabo) return null
                const naboStats = genStats(naboSlug, nabo.prisKlasse)
                return (
                  <Link
                    key={naboSlug}
                    href={`/kommune/${naboSlug}`}
                    className="bg-brand-50 rounded-xl border border-brand-200 p-5 hover:border-tomtly-accent hover:shadow-sm transition-all group"
                  >
                    <h3 className="font-semibold text-tomtly-dark group-hover:text-tomtly-accent transition-colors mb-1">
                      {nabo.navn}
                    </h3>
                    <p className="text-xs text-brand-500">
                      Snitt {formatKr(naboStats.snittpris)} &middot; {naboStats.antallTomter} tomter
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer-seksjon */}
      <section className="bg-tomtly-dark py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-500 text-sm mb-4">
            Tomtly er en tjeneste fra NOPS AS
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/" className="text-brand-400 hover:text-white transition-colors">
              Forsiden
            </Link>
            <Link href="/for-tomteeiere" className="text-brand-400 hover:text-white transition-colors">
              For tomteeiere
            </Link>
            <Link href="/verdivurdering" className="text-brand-400 hover:text-white transition-colors">
              Verdivurdering
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

// ---------------------------------------------------------------------------
// Stat card component
// ---------------------------------------------------------------------------

function StatKort({ ikon, tittel, verdi }: { ikon: React.ReactNode; tittel: string; verdi: string }) {
  return (
    <div className="bg-brand-50 rounded-xl border border-brand-200 p-5">
      <div className="mb-3">{ikon}</div>
      <p className="text-xs text-brand-500 mb-1">{tittel}</p>
      <p className="text-xl font-bold text-tomtly-dark font-mono">{verdi}</p>
    </div>
  )
}
