import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gamle Alværnvei 67 – Eneboligtomt med fjordutsikt | Tomtly',
  description: '900 m² tomt på Alværn, Nesodden med fjordutsikt. 4 husmodeller fra 8,2 MNOK.',
  openGraph: {
    title: 'Gamle Alværnvei 67 – Fjordutsikt på Nesodden',
    description: '900 m² tomt med panoramautsikt. 4 husmodeller, komplett analyse.',
    images: ['/tomter/alvaern-shared/alvaern-render-aerial-1-DvVXdDku.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": "Tomt: Gamle Alværnvei 67",
        "address": { "@type": "PostalAddress", "streetAddress": "Gamle Alværnvei 67", "addressLocality": "Nesodden", "postalCode": "1459", "addressCountry": "NO" },
        "geo": { "@type": "GeoCoordinates", "latitude": 59.8155, "longitude": 10.6196 },
        "lotSize": { "@type": "QuantitativeValue", "value": 900, "unitCode": "MTK" }
      }) }} />
      {children}
    </>
  )
}
