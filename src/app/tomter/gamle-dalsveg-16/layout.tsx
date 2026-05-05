import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gamle Dalsveg 16 A – Boligtomt til salgs i Maura, Nannestad | Tomtly',
  description: 'Fradelt boligtomt på 564 m² i Maura, Nannestad kommune. Pris 2 300 000 kr. 34 husmodeller analysert – fra 6,2 til 10,8 MNOK totalbudsjett. Kommunalt VA (98 824 kr), geoteknisk rapport utarbeidet. 12 min til Jessheim, 30 min til Oslo.',
  keywords: ['boligtomt', 'tomt til salgs', 'Maura', 'Nannestad', 'Gamle Dalsveg', 'Jessheim', 'fradelt tomt', 'byggetomt', 'Romerike', 'enebolig'],
  openGraph: {
    title: 'Gamle Dalsveg 16 A – Boligtomt i Maura, Nannestad | 2 300 000 kr',
    description: '564 m² fradelt boligtomt 12 min fra Jessheim. 34 husmodeller med komplett kostnadsanalyse. Kommunalt VA, geoteknisk rapport og vedtak om fradeling foreligger.',
    images: [{ url: '/tomter/gamle-dalsveg-16/perla-norgeshus-visualisering.png', width: 1920, height: 1080, alt: 'Perla Norgeshus visualisert på Gamle Dalsveg 16 A, Maura' }],
    type: 'website',
    locale: 'nb_NO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gamle Dalsveg 16 A – Boligtomt i Maura | 2 300 000 kr',
    description: '564 m² – 12 min til Jessheim. 34 husmodeller analysert. Kommunalt VA og godkjent fradeling.',
    images: ['/tomter/gamle-dalsveg-16/perla-norgeshus-visualisering.png'],
  },
  alternates: { canonical: 'https://tomtly.no/tomter/gamle-dalsveg-16' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': 'https://tomtly.no/tomter/gamle-dalsveg-16',
        name: 'Gamle Dalsveg 16 A – Boligtomt i Maura, Nannestad',
        description: '564 m² fradelt boligtomt i etablert boligområde i Maura, Nannestad kommune. Vedtak om fradeling foreligger, kommunalt VA tilgjengelig, geoteknisk rapport utarbeidet. 34 husmodeller analysert.',
        url: 'https://tomtly.no/tomter/gamle-dalsveg-16',
        image: 'https://tomtly.no/tomter/gamle-dalsveg-16/perla-norgeshus-visualisering.png',
        offers: {
          '@type': 'Offer',
          price: 2300000,
          priceCurrency: 'NOK',
          availability: 'https://schema.org/InStock',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Gamle Dalsveg 16 A',
          postalCode: '2032',
          addressLocality: 'Maura',
          addressRegion: 'Akershus',
          addressCountry: 'NO',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 60.24963,
          longitude: 11.02455,
        },
        lotSize: { '@type': 'QuantitativeValue', value: 564, unitCode: 'MTK', unitText: 'm²' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Tomtly', item: 'https://tomtly.no' },
          { '@type': 'ListItem', position: 2, name: 'Tomter', item: 'https://tomtly.no/tomter' },
          { '@type': 'ListItem', position: 3, name: 'Gamle Dalsveg 16 A', item: 'https://tomtly.no/tomter/gamle-dalsveg-16' },
        ],
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  )
}
