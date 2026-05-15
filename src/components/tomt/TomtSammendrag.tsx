import { Phone, Mail, CheckCircle2, ArrowRight } from 'lucide-react'

interface Props {
  adresse: string
  kommune: string
  pris: number
  areal_m2: number
  antall_husmodeller: number
  laveste_budsjett: number
  hoyeste_budsjett: number
  anbefaling: string
  fordeler: string[]
}

export function TomtSammendrag({
  adresse, kommune, pris, areal_m2, antall_husmodeller,
  laveste_budsjett, hoyeste_budsjett, anbefaling, fordeler,
}: Props) {
  return (
    <section className="bg-gradient-to-br from-tomtly-accent to-forest-800 overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="max-w-3xl">
          <p className="text-green-300 text-xs font-bold uppercase tracking-widest mb-2">Tomtly-sammendrag</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
            {adresse} er klar for utbygging
          </h2>

          <p className="text-green-100 leading-relaxed mb-6">{anbefaling}</p>

          {/* Nøkkelpunkter */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
            {fordeler.map((f, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-300 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-green-50">{f}</p>
              </div>
            ))}
          </div>

          {/* Tallrad */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 py-6 border-t border-white/20">
            <div>
              <p className="text-green-300 text-[11px] uppercase tracking-wide">Tomtepris</p>
              <p className="text-xl font-bold">{(pris / 1000000).toFixed(1)} MNOK</p>
            </div>
            <div>
              <p className="text-green-300 text-[11px] uppercase tracking-wide">Tomteareal</p>
              <p className="text-xl font-bold">{areal_m2.toLocaleString('no')} m²</p>
            </div>
            <div>
              <p className="text-green-300 text-[11px] uppercase tracking-wide">Husmodeller</p>
              <p className="text-xl font-bold">{antall_husmodeller} stk</p>
            </div>
            <div>
              <p className="text-green-300 text-[11px] uppercase tracking-wide">Totalbudsjett fra</p>
              <p className="text-xl font-bold">{(laveste_budsjett / 1000000).toFixed(1)} MNOK</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+4790099124"
              className="flex items-center justify-center gap-2 bg-white text-tomtly-accent font-semibold rounded-xl px-6 py-3 hover:bg-green-50 transition-colors text-sm"
            >
              <Phone className="w-4 h-4" />
              Ring oss om {adresse}
            </a>
            <a
              href="mailto:hey@nops.no?subject=Interessert i {adresse}, {kommune}&body=Hei, jeg er interessert i å høre mer om {adresse} i {kommune}. Ta gjerne kontakt."
              className="flex items-center justify-center gap-2 border border-white/40 text-white font-semibold rounded-xl px-6 py-3 hover:bg-white/10 transition-colors text-sm"
            >
              <Mail className="w-4 h-4" />
              Send e-post
            </a>
            <a
              href="/selger/onboarding"
              className="flex items-center justify-center gap-2 text-green-300 font-semibold text-sm hover:text-white transition-colors ml-auto"
            >
              Se hva Tomtly koster <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
