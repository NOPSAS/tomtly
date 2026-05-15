'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Loader2 } from 'lucide-react'

const TOMT_TILGANG: Record<string, string> = {
  'cato@dibb.no': 'gamle-dalsveg-16',
  'post@italmarin.no': 'myllavegen-58',
}

export default function DashboardRoot() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAdmin) { router.replace('/admin'); return }
    if (user) {
      const myTomtId = TOMT_TILGANG[user.email ?? '']
      router.replace(myTomtId ? `/dashboard/${myTomtId}` : '/min-side')
    }
  }, [user, isAdmin, router])

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center">
      <div className="flex items-center gap-2 text-brand-400 text-sm">
        <Loader2 className="w-4 h-4 animate-spin" />
        Laster dashboard…
      </div>
    </div>
  )
}
