import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prosjekt: Tomtly søker finansiering – Norges første AI-plattform for tomteanalyse',
  description: 'Tomtly automatiserer reguleringsanalyse for norske eiendommer. Vi søker innovasjonstilskudd for å akselerere B2B-markedet for meglere og banker.',
  openGraph: {
    title: 'Tomtly – Søker finansiering',
    description: 'Norges første AI-plattform for tomteanalyse søker 750 000 kr i innovasjonstilskudd.',
    url: 'https://tomtly.no/prosjekt',
  },
}

export default function ProsjektLayout({ children }: { children: React.ReactNode }) {
  return children
}
