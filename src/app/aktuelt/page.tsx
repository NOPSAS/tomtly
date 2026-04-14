import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ArrowRight, Newspaper } from 'lucide-react'
import { getAlleArtikler, formatDato } from '@/lib/aktuelt'

export const metadata: Metadata = {
  title: 'Aktuelt — nyheter fra Tomtly | Tomtly',
  description:
    'Nyheter, oppdateringer og hendelser fra Tomtly. Følg med på hva som skjer hos oss og i tomtemarkedet.',
  openGraph: {
    title: 'Aktuelt — nyheter fra Tomtly',
    description: 'Nyheter og hendelser fra Tomtly.',
  },
}

export default function AktueltPage() {
  const artikler = getAlleArtikler()

  return (
    <main className="bg-tomtly-warm min-h-screen">
      {/* Hero */}
      <section className="bg-white border-b border-brand-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="flex items-center gap-2 text-tomtly-accent mb-3">
            <Newspaper className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Aktuelt</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold text-tomtly-dark mb-4">
            Nyheter fra Tomtly
          </h1>
          <p className="text-lg text-brand-600 max-w-2xl">
            Følg med på hva som skjer hos oss — nye samarbeid, produktoppdateringer
            og innsikter fra det norske tomtemarkedet.
          </p>
        </div>
      </section>

      {/* Artikkel-liste */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {artikler.map((a) => (
              <Link
                key={a.slug}
                href={`/aktuelt/${a.slug}`}
                className="group block bg-white rounded-2xl border border-brand-200 p-6 lg:p-8 hover:border-tomtly-accent hover:shadow-lg transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-start md:gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3 text-xs">
                      <span className="inline-block px-2.5 py-1 bg-forest-50 text-tomtly-accent font-semibold rounded-full">
                        {a.kategori}
                      </span>
                      <span className="flex items-center gap-1 text-brand-500">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDato(a.publisert)}
                      </span>
                    </div>
                    <h2 className="font-display text-2xl lg:text-3xl font-bold text-tomtly-dark mb-3 group-hover:text-tomtly-accent transition-colors">
                      {a.tittel}
                    </h2>
                    <p className="text-brand-600 leading-relaxed mb-4">{a.ingress}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-brand-500">Av {a.forfatter}</span>
                      <span className="inline-flex items-center gap-1.5 text-tomtly-accent font-semibold">
                        Les artikkel
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {artikler.length === 0 && (
            <div className="text-center py-20">
              <p className="text-brand-500">Ingen artikler ennå.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
