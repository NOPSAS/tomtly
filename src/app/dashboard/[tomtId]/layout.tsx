import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Selger Dashboard | Tomtly',
  description: 'Administrer din tomt, følg interessenter og se statistikk for ditt tomtesalg på Tomtly.',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-tomtly-light">
      {children}
    </div>
  )
}
