import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Myllavegen 58 – Boligtomt i Grua, Lunner',
  description: '1 000 m² fradelt boligtomt i Grua med 30% BYA. 12 husmodeller fra 3,6–9,2 MNOK. Enebolig eller tomannsbolig.',
  openGraph: {
    title: 'Myllavegen 58 – Boligtomt i Grua, Lunner',
    description: '1 000 m² tomt med 30% BYA. 12 husmodeller tilpasset skråtomt. Komplett analyse.',
    images: ['/tomter/myllavegen-58/hero.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": "Myllavegen 58 – Boligtomt i Grua",
        "description": "1 000 m² fradelt boligtomt i etablert boligområde i Grua, Lunner kommune. 30% BYA.",
        "geo": { "@type": "GeoCoordinates", "latitude": 60.3705, "longitude": 10.5675 },
        "lotSize": { "@type": "QuantitativeValue", "value": 1000, "unitCode": "MTK" }
      }) }} />
      {children}
    </>
  )
}
