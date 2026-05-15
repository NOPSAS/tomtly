import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brøttenga 23 – Boligtomt til salgs i Brårud, Nes | Tomtly',
  description: 'Boligtomt på 847 m² i etablert boligfelt i Brårud, Nes kommune. Pris 1 000 000 kr. 15 husmodeller analysert. Kommunalt VA, gangavstand til skole og barnehage. 25 min til Gardermoen.',
  keywords: ['boligtomt', 'tomt til salgs', 'Brårud', 'Nes', 'Brøttenga', 'Akershus', 'fradelt tomt', 'byggetomt', 'enebolig', 'Eidsvoll'],
  openGraph: {
    title: 'Brøttenga 23 – Boligtomt i Brårud, Nes | 1 000 000 kr',
    description: '847 m² boligtomt i etablert felt. 15 husmodeller analysert – fra 4,9 til 6,3 MNOK totalbudsjett. Kommunalt VA, gangavstand til skole. 25 min til Gardermoen.',
    images: [{ url: '/tomter/brottenga-23/hero.png', width: 1200, height: 800, alt: 'Brøttenga 23 – boligtomt i Brårud, Nes' }],
    type: 'website',
    locale: 'nb_NO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brøttenga 23 – Boligtomt i Brårud | 1 000 000 kr',
    description: '847 m² – 25 min til Gardermoen. 15 husmodeller analysert. Kommunalt VA.',
    images: ['/tomter/brottenga-23/hero.png'],
  },
  alternates: { canonical: 'https://tomtly.no/tomter/brottenga-23' },
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateListing',
        '@id': 'https://tomtly.no/tomter/brottenga-23',
        name: 'Brøttenga 23 – Boligtomt i Brårud, Nes',
        description: '847 m² boligtomt i etablert boligfelt i Brårud, Nes kommune. Kommunalt VA tilgjengelig. 15 husmodeller analysert.',
        url: 'https://tomtly.no/tomter/brottenga-23',
        offers: {
          '@type': 'Offer',
          price: 1000000,
          priceCurrency: 'NOK',
          availability: 'https://schema.org/InStock',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Brøttenga 23',
          postalCode: '2162',
          addressLocality: 'Brårud',
          addressRegion: 'Akershus',
          addressCountry: 'NO',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 60.21104,
          longitude: 11.33211,
        },
        lotSize: { '@type': 'QuantitativeValue', value: 847, unitCode: 'MTK', unitText: 'm²' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Tomtly', item: 'https://tomtly.no' },
          { '@type': 'ListItem', position: 2, name: 'Tomter', item: 'https://tomtly.no/tomter' },
          { '@type': 'ListItem', position: 3, name: 'Brøttenga 23', item: 'https://tomtly.no/tomter/brottenga-23' },
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
