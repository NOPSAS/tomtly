import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selg tomt selv — slik fungerer det',
  description: 'Slik selger du tomten selv med Tomtly. Komplett tomteanalyse, husmodeller, kart og byggekalkyle. Fra 4 990 kr. 2% suksesshonorar kun ved salg.',
  openGraph: {
    title: 'Selg tomt selv — slik fungerer det',
    description: 'Slik selger du tomten selv med Tomtly. Komplett tomteanalyse, husmodeller, kart og byggekalkyle. Fra 4 990 kr. 2% suksesshonorar kun ved salg.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
