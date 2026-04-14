import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nedre Liavei 11 – Boligtomt i Holmestrand | Tomtly',
  description: '982 m² boligtomt på Gullhaug i Holmestrand. Fradelt parsell med 3 boligforslag fra kr 4 500 000.',
  openGraph: {
    title: 'Nedre Liavei 11 – Boligtomt i Holmestrand',
    description: '982 m² boligtomt på Gullhaug. Skrånende terreng, etablert boligområde, 3 husmodeller.',
    images: ['/tomter/nedre-liavei-11/vindy-fasade-syd.png'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": "Boligtomt: Nedre Liavei 11",
        "address": { "@type": "PostalAddress", "streetAddress": "Nedre Liavei 11", "addressLocality": "Holmestrand", "postalCode": "3089", "addressCountry": "NO" },
        "geo": { "@type": "GeoCoordinates", "latitude": 59.5043, "longitude": 10.2469 },
        "lotSize": { "@type": "QuantitativeValue", "value": 982, "unitCode": "MTK" }
      }) }} />
      {children}
    </>
  )
}
