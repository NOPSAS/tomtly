import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fradeling av tomt — vi håndterer alt',
  description: 'Tomtly håndterer hele fradelingsprosessen. Vurdering, reguleringssjekk, søknad og oppmåling. 0 kr fra Tomtly ved avslag.',
  openGraph: {
    title: 'Fradeling av tomt — vi håndterer alt',
    description: 'Tomtly håndterer hele fradelingsprosessen. Vurdering, reguleringssjekk, søknad og oppmåling. 0 kr fra Tomtly ved avslag.',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
