import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gratis tomteanalyse — sjekk hva du kan bygge',
  description: 'Analyser tomten din gratis. Se reguleringsplan, kommuneplan, naturfare og grunnforhold. Prøv Tomtlys analyseverktøy uten kostnad.',
  openGraph: {
    title: 'Gratis tomteanalyse — sjekk hva du kan bygge',
    description: 'Analyser tomten din gratis. Se reguleringsplan, kommuneplan, naturfare og grunnforhold. Prøv Tomtlys analyseverktøy uten kostnad.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
