import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gamle Dalsveg 16 – Boligtomt i Maura, Nannestad',
  description: 'Fradelt boligtomt i Maura med 8 husmodeller fra 6,7–9,4 MNOK. Grunnmur inkludert hos alle leverandører. Komplett analyse.',
  openGraph: {
    title: 'Gamle Dalsveg 16 – Boligtomt i Maura, Nannestad',
    description: 'Fradelt boligtomt i Maura. 8 husmodeller fra Nordbohus og Norgeshus. Komplett kostnadsanalyse.',
    images: ['/tomter/gamle-dalsveg-16/luftig-fasade-1.jpg'],
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "RealEstateListing",
        "name": "Gamle Dalsveg 16 – Boligtomt i Maura",
        "description": "Fradelt boligtomt i etablert boligområde i Maura, Nannestad kommune.",
        "geo": { "@type": "GeoCoordinates", "latitude": 60.24963, "longitude": 11.02455 },
        "address": { "@type": "PostalAddress", "streetAddress": "Gamle Dalsveg 16", "postalCode": "2032", "addressLocality": "Maura", "addressCountry": "NO" }
      }) }} />
      {children}
    </>
  )
}
