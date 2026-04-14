import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/lib/auth-context'
import CookieConsent from '@/components/CookieConsent'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://tomtly.no'),
  title: {
    default: 'Tomtly – Selg tomten raskere til bedre pris',
    template: '%s | Tomtly',
  },
  description:
    'Tomtly viser kjøpere hva de kan bygge på tomten. Tomteanalyse med husmodeller, kart og byggekostnadskalkyle. Fra 4 990 kr. Selg tomten enklere.',
  keywords: [
    'selge tomt', 'tomtesalg', 'tomteanalyse', 'hva kan jeg bygge',
    'husmodeller', 'byggekostnadskalkyle', 'reguleringsplan', 'kommuneplan',
    'tomt til salgs', 'selge eiendom privat', 'fradeling tomt',
    'tomteverdi', 'tomteutvikling', 'bygge hus', 'tomt Norge',
  ],
  authors: [{ name: 'NOPS AS', url: 'https://tomtly.no' }],
  creator: 'NOPS AS',
  publisher: 'NOPS AS',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Tomtly – Selg tomten raskere til bedre pris',
    description:
      'Vi viser kjøpere hva de kan bygge på tomten. Tomteanalyse med husmodeller, kart og byggekostnadskalkyle. Fra 4 990 kr.',
    type: 'website',
    locale: 'nb_NO',
    siteName: 'Tomtly',
    url: 'https://tomtly.no',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tomtly – Selg tomten raskere til bedre pris',
    description:
      'Tomteanalyse med husmodeller, kart og byggekostnadskalkyle. Fra 4 990 kr.',
  },
  alternates: {
    canonical: 'https://tomtly.no',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'kEL2DGDlsoXFrh671fn15qrLlnBfYRTOiDd_ZZbqcUw',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nb" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <head>
        {/* Organization + WebSite structured data for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://tomtly.no/#organization',
                  name: 'Tomtly',
                  alternateName: 'NOPS AS',
                  url: 'https://tomtly.no',
                  logo: 'https://tomtly.no/logo.svg',
                  description: 'Tomtly viser kjøpere hva de kan bygge på tomten. Tomteanalyse, husmodeller, kart og byggekostnadskalkyle.',
                  foundingDate: '2026',
                  email: 'hey@nops.no',
                  telephone: '+4740603908',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'NO',
                    addressLocality: 'Nesodden',
                  },
                  sameAs: [],
                  areaServed: {
                    '@type': 'Country',
                    name: 'Norway',
                  },
                  knowsAbout: [
                    'Tomtesalg', 'Tomteanalyse', 'Reguleringsplan', 'Kommuneplan',
                    'Husmodeller', 'Byggekostnadskalkyle', 'Fradeling', 'Eiendomsutvikling',
                  ],
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://tomtly.no/#website',
                  url: 'https://tomtly.no',
                  name: 'Tomtly',
                  description: 'Norges plattform for tomtesalg og tomteanalyse',
                  publisher: { '@id': 'https://tomtly.no/#organization' },
                  inLanguage: 'nb-NO',
                  potentialAction: {
                    '@type': 'SearchAction',
                    target: {
                      '@type': 'EntryPoint',
                      urlTemplate: 'https://tomtly.no/tomteanalyse',
                    },
                    'query-input': 'required name=search_term_string',
                  },
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': 'https://tomtly.no/#localbusiness',
                  name: 'Tomtly (NOPS AS)',
                  description: 'Tomteanalyse og salgsbistand for tomteeiere i hele Norge. Husmodeller, byggekalkyle og markedsføring fra 4 990 kr.',
                  url: 'https://tomtly.no',
                  email: 'hey@nops.no',
                  telephone: '+4740603908',
                  priceRange: 'Fra 4 990 kr',
                  address: {
                    '@type': 'PostalAddress',
                    addressCountry: 'NO',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 59.85,
                    longitude: 10.66,
                  },
                  areaServed: {
                    '@type': 'Country',
                    name: 'Norway',
                  },
                  serviceType: ['Tomteanalyse', 'Tomtesalg', 'Eiendomsrådgivning', 'Fradeling'],
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  )
}
