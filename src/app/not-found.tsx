import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="font-display text-6xl font-bold text-tomtly-accent mb-4">404</h1>
        <h2 className="font-display text-2xl font-bold text-tomtly-dark mb-3">
          Siden ble ikke funnet
        </h2>
        <p className="text-brand-500 mb-8">
          Beklager, vi finner ikke siden du leter etter. Den kan ha blitt flyttet eller slettet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-tomtly-accent text-white font-medium rounded-lg hover:bg-forest-700 transition-colors"
          >
            Til forsiden
          </Link>
          <Link
            href="/tomter"
            className="inline-flex items-center justify-center px-6 py-3 border border-brand-200 text-brand-700 font-medium rounded-lg hover:bg-brand-50 transition-colors"
          >
            Se tomter
          </Link>
        </div>
      </div>
    </div>
  )
}
