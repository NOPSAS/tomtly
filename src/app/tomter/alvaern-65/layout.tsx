import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gamle Alværnvei 65 – SOLGT via tomtly | Tomtly',
  description: '2 274 m² tomt på Alværn, Nesodden. Solgt for 3 200 000 kr via tomtly + Propr. Wide fra ABChus, BRA 207.9 m².',
  openGraph: {
    title: 'Gamle Alværnvei 65 – SOLGT via tomtly',
    description: 'Solgt for 3,2 MNOK. 2 274 m² tomt på Nesodden med Wide fra ABChus. Les kundehistorien.',
    images: ['/tomter/alvaern-65/hero.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": "Tomt: Gamle Alværnvei 65 (SOLGT)",
        "description": "2 274 m² eneboligtomt på Alværn, Nesodden. Solgt via tomtly + Propr.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Gamle Alværnvei 65",
          "addressLocality": "Nesodden",
          "postalCode": "1453",
          "addressCountry": "NO"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 59.8153,
          "longitude": 10.6192
        },
        "lotSize": {
          "@type": "QuantitativeValue",
          "value": 2274,
          "unitCode": "MTK"
        },
        "offers": {
          "@type": "Offer",
          "price": 3200000,
          "priceCurrency": "NOK",
          "availability": "https://schema.org/SoldOut"
        },
        "broker": {
          "@type": "Organization",
          "name": "tomtly (NOPS AS)",
          "url": "https://tomtly.no"
        }
      }) }} />
      {children}
    </>
  )
}
