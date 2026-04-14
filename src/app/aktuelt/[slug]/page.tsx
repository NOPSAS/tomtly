import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft, User, Quote } from 'lucide-react'
import { ARTIKLER, getArtikkel, formatDato } from '@/lib/aktuelt'

export function generateStaticParams() {
  return ARTIKLER.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const a = getArtikkel(slug)
  if (!a) return { title: 'Artikkel ikke funnet | Tomtly' }
  return {
    title: `${a.tittel} | Aktuelt | Tomtly`,
    description: a.ingress,
    openGraph: {
      title: a.tittel,
      description: a.ingress,
      type: 'article',
      publishedTime: a.publisert,
      authors: [a.forfatter],
    },
  }
}

/** Renderer **bold** markdown til <strong> */
function renderAvsnitt(tekst: string) {
  const deler = tekst.split(/(\*\*[^*]+\*\*)/g)
  return deler.map((del, i) => {
    if (del.startsWith('**') && del.endsWith('**')) {
      return <strong key={i}>{del.slice(2, -2)}</strong>
    }
    return <span key={i}>{del}</span>
  })
}

export default async function ArtikkelPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const artikkel = getArtikkel(slug)
  if (!artikkel) notFound()

  return (
    <main className="bg-tomtly-warm min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-brand-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link
            href="/aktuelt"
            className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-tomtly-accent mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake til Aktuelt
          </Link>

          <div className="flex items-center gap-3 mb-4 text-xs">
            <span className="inline-block px-2.5 py-1 bg-forest-50 text-tomtly-accent font-semibold rounded-full">
              {artikkel.kategori}
            </span>
            <span className="flex items-center gap-1 text-brand-500">
              <Calendar className="w-3.5 h-3.5" />
              {formatDato(artikkel.publisert)}
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-tomtly-dark leading-tight mb-6">
            {artikkel.tittel}
          </h1>

          <p className="text-lg lg:text-xl text-brand-600 leading-relaxed mb-6">
            {artikkel.ingress}
          </p>

          <div className="flex items-center gap-3 pt-6 border-t border-brand-100">
            <div className="w-10 h-10 rounded-full bg-tomtly-accent/10 flex items-center justify-center">
              <User className="w-5 h-5 text-tomtly-accent" />
            </div>
            <div>
              <p className="text-sm font-semibold text-tomtly-dark">{artikkel.forfatter}</p>
              <p className="text-xs text-brand-500">{formatDato(artikkel.publisert)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Innhold */}
      <article className="py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            {artikkel.innhold.map((avsnitt, i) => (
              <p
                key={i}
                className="text-base lg:text-lg text-brand-700 leading-relaxed mb-6"
              >
                {renderAvsnitt(avsnitt)}
              </p>
            ))}

            {artikkel.sitat && (
              <div className="my-12 bg-white rounded-2xl border-l-4 border-tomtly-accent p-6 lg:p-8 shadow-sm">
                <Quote className="w-8 h-8 text-tomtly-accent/30 mb-3" />
                <p className="font-display text-xl lg:text-2xl text-tomtly-dark italic leading-relaxed mb-4">
                  «{artikkel.sitat.tekst}»
                </p>
                <p className="text-sm font-semibold text-brand-600">— {artikkel.sitat.av}</p>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="mt-16 pt-12 border-t border-brand-200">
            <div className="bg-tomtly-dark rounded-2xl p-8 lg:p-10 text-center">
              <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3">
                Vil du selge tomten din med Tomtly?
              </h3>
              <p className="text-brand-300 mb-6 max-w-xl mx-auto">
                Vi gjør tomten din mer attraktiv, selges raskere og til en bedre pris.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/selger/onboarding"
                  className="px-6 py-3 bg-tomtly-accent text-white font-semibold rounded-lg hover:bg-forest-700 transition-colors"
                >
                  Legg ut tomt
                </Link>
                <Link
                  href="/aktuelt"
                  className="px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
                >
                  Flere artikler
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}
