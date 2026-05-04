import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Myllavegen 58 – Boligtomt til salgs i Grua, Lunner | Tomtly',
  description: 'Fradelt boligtomt på 1 000 m² i Grua, Lunner kommune. Pris 950 000 kr. 12 husmodeller analysert – fra 5,0 til 10,4 MNOK totalbudsjett. Kommunalt VA, avkjøringstillatelse og fradeling godkjent. Egnet for enebolig eller tomannsbolig (30% BYA).',
  keywords: ['boligtomt', 'tomt til salgs', 'Grua', 'Lunner', 'Myllavegen', 'fradelt tomt', 'byggetomt', 'skråtomt', 'tomannsbolig', 'enebolig'],
  openGraph: {
    title: 'Myllavegen 58 – Boligtomt i Grua, Lunner | 950 000 kr',
    description: '1 000 m² fradelt boligtomt med 30% BYA. 12 husmodeller med komplett kostnadsanalyse – fra 5 MNOK. Kommunalt VA og fradeling godkjent.',
    images: [{ url: '/tomter/myllavegen-58/hero.png', width: 1240, height: 1754, alt: 'Myllavegen 58 – Wide Skrå plassert på tomten, flyfoto' }],
    type: 'website',
    locale: 'nb_NO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Myllavegen 58 – Boligtomt i Grua | 950 000 kr',
    description: '1 000 m² med 30% BYA. 12 husmodeller analysert. Kommunalt VA og godkjent fradeling.',
    images: ['/tomter/myllavegen-58/hero.png'],
  },
  alternates: { canonical: 'https://tomtly.no/tomter/myllavegen-58' },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': 'https://tomtly.no/tomter/myllavegen-58',
        name: 'Myllavegen 58 – Boligtomt i Grua, Lunner',
        description: '1 000 m² fradelt boligtomt i etablert boligområde i Grua, Lunner kommune. Fradeling godkjent, kommunalt VA tilgjengelig, avkjøringstillatelse foreligger. 30% BYA tillatt.',
        url: 'https://tomtly.no/tomter/myllavegen-58',
        image: 'https://tomtly.no/tomter/myllavegen-58/hero.png',
        offers: {
          '@type': 'Offer',
          price: 950000,
          priceCurrency: 'NOK',
          availability: 'https://schema.org/InStock',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Myllavegen 58',
          postalCode: '2742',
          addressLocality: 'Grua',
          addressRegion: 'Innlandet',
          addressCountry: 'NO',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 60.25414,
          longitude: 10.64675,
        },
        lotSize: { '@type': 'QuantitativeValue', value: 1000, unitCode: 'MTK', unitText: 'm²' },
        floorSize: { '@type': 'QuantitativeValue', value: 300, unitCode: 'MTK', unitText: 'm² tillatt BYA' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Tomtly', item: 'https://tomtly.no' },
          { '@type': 'ListItem', position: 2, name: 'Tomter', item: 'https://tomtly.no/tomter' },
          { '@type': 'ListItem', position: 3, name: 'Myllavegen 58', item: 'https://tomtly.no/tomter/myllavegen-58' },
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
