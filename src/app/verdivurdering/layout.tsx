import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verdivurdering av tomt — gratis estimat',
  description: 'Få et estimat på tomtens verdi basert på beliggenhet, regulering og sammenlignbare salg. Gratis og uforpliktende via Tomtly.',
  openGraph: {
    title: 'Verdivurdering av tomt — gratis estimat',
    description: 'Få et estimat på tomtens verdi basert på beliggenhet, regulering og sammenlignbare salg. Gratis og uforpliktende via Tomtly.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
