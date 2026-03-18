import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/lib/auth-context'
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
  title: 'Tomtly – Se potensialet i tomten',
  description:
    'Tomtly viser hva som kan bygges på tomten. Faglig analyse fra arkitekt- og eiendomsteam med husmodeller, kostnadsoverslag og verdivurdering.',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Tomtly – Se potensialet i tomten',
    description:
      'Tomtly viser hva som kan bygges på tomten. Faglig analyse med husmodeller, kostnadsoverslag og verdivurdering.',
    type: 'website',
    locale: 'nb_NO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nb" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
