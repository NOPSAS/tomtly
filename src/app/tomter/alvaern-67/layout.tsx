import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gamle Alværnvei 67 – Eneboligtomt med fjordutsikt | Tomtly',
  description: '900 m² tomt på Alværn, Nesodden med fjordutsikt. 4 husmodeller fra 8,2 MNOK. Tomtescore 86/100.',
  openGraph: {
    title: 'Gamle Alværnvei 67 – Fjordutsikt på Nesodden',
    description: '900 m² tomt med panoramautsikt. 4 husmodeller, komplett analyse.',
    images: ['/tomter/alvaern-shared/alvaern-render-aerial-1-DvVXdDku.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
