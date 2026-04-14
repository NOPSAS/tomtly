import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'For eiendomsmeglere — Tomtly tomteanalyse',
  description: 'Bestill profesjonell tomteanalyse for dine kunder. Husmodeller, kart, byggekalkyle og reguleringssjekk. 7 500 kr + mva per tomt.',
  openGraph: {
    title: 'For eiendomsmeglere — Tomtly tomteanalyse',
    description: 'Bestill profesjonell tomteanalyse for dine kunder. Husmodeller, kart, byggekalkyle og reguleringssjekk. 7 500 kr + mva per tomt.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
