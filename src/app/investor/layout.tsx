import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investorside – Tomtly',
  description: 'Tomtly er Norges første AI-drevne analyseplattform for tomter og eiendomsutvikling. Vi søker finansiering for å akselerere vekst.',
  robots: { index: false, follow: false },
}

export default function InvestorLayout({ children }: { children: React.ReactNode }) {
  return children
}
