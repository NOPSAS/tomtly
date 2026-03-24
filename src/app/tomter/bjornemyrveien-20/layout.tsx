import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bjørnemyrveien 20 – Flat eneboligtomt på Bjørnemyr | Tomtly',
  description: '605 m² flat tomt på Bjørnemyr, Nesodden. 4 husmodeller fra 7,9 MNOK. Godkjent fradeling, klar for bygging.',
  openGraph: {
    title: 'Bjørnemyrveien 20 – Eneboligtomt på Bjørnemyr',
    description: '605 m² flat tomt. 4 husmodeller, komplett kostnadsoverslag. Fra kjøp til nøkkel på under ett år.',
    images: ['/tomter/bjornemyrveien-shared/render-parsell-b.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": "Tomt: Bjørnemyrveien 20",
        "address": { "@type": "PostalAddress", "streetAddress": "Bjørnemyrveien 20", "addressLocality": "Nesodden", "postalCode": "1459", "addressCountry": "NO" },
        "geo": { "@type": "GeoCoordinates", "latitude": 59.8346, "longitude": 10.6419 },
        "lotSize": { "@type": "QuantitativeValue", "value": 605, "unitCode": "MTK" }
      }) }} />
      {children}
    </>
  )
}
