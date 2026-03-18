import Link from 'next/link'
import { MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-tomtly-dark text-brand-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-tomtly-accent rounded-md flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Tomtly
              </span>
            </div>
            <p className="text-sm text-brand-400 leading-relaxed">
              Se potensialet i tomten. Tomtly analyserer og presenterer tomter
              som utviklingsprosjekter.
            </p>
            <p className="text-xs text-brand-500 mt-4">
              Tomtly er en del av NOPS-plattformen
            </p>
          </div>

          {/* Plattform */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Plattform</h4>
            <ul className="space-y-2.5">
              <li><Link href="/kart" className="text-sm hover:text-white transition-colors">Kart</Link></li>
              <li><Link href="/tomter" className="text-sm hover:text-white transition-colors">Alle tomter</Link></li>
              <li><Link href="/selger/onboarding" className="text-sm hover:text-white transition-colors">Legg ut tomt</Link></li>
            </ul>
          </div>

          {/* For deg */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">For deg</h4>
            <ul className="space-y-2.5">
              <li><Link href="/selger/onboarding" className="text-sm hover:text-white transition-colors">Tomteeiere</Link></li>
              <li><Link href="/megler/onboarding" className="text-sm hover:text-white transition-colors">Meglere</Link></li>
              <li><Link href="/utvikler" className="text-sm hover:text-white transition-colors">Utviklere</Link></li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Kontakt</h4>
            <ul className="space-y-2.5">
              <li className="text-sm">hey@nops.no</li>
              <li className="text-sm">NOPS AS</li>
              <li className="text-sm">Org.nr: 933 819 086</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-brand-500">
            &copy; {new Date().getFullYear()} Tomtly / NOPS. Alle rettigheter reservert.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-brand-500 hover:text-brand-300">
              Personvern
            </Link>
            <Link href="#" className="text-xs text-brand-500 hover:text-brand-300">
              Vilkår
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
