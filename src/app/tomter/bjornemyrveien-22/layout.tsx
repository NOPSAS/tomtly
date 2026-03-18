import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bjørnemyrveien 22 – Skrånende eneboligtomt på Bjørnemyr | Tomtly',
  description: '613 m² skrånende tomt på Bjørnemyr, Nesodden. 4 husmodeller fra 7,9 MNOK. Godkjent fradeling.',
  openGraph: {
    title: 'Bjørnemyrveien 22 – Eneboligtomt på Bjørnemyr',
    description: '613 m² skrånende tomt. 4 husmodeller tilpasset skråtomt. Komplett kostnadsoverslag.',
    images: ['/tomter/bjornemyrveien-shared/render-parsell-c.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
