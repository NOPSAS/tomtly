'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const SESSION_KEY = 'tomtly_sid'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let sid = sessionStorage.getItem(SESSION_KEY)
  if (!sid) {
    sid = crypto.randomUUID()
    sessionStorage.setItem(SESSION_KEY, sid)
  }
  return sid
}

function getDevice(w: number): string {
  if (w < 768) return 'mobil'
  if (w < 1024) return 'nettbrett'
  return 'desktop'
}

export function PageTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Skip admin pages and API routes
    if (pathname.startsWith('/admin') || pathname.startsWith('/api')) return

    const timeout = setTimeout(() => {
      try {
        const body = {
          path: pathname,
          referrer: document.referrer || null,
          session_id: getSessionId(),
          device: getDevice(window.innerWidth),
          screen_width: window.innerWidth,
        }

        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          keepalive: true,
        }).catch(() => {})
      } catch {}
    }, 300) // Slight delay to avoid tracking instant bounces

    return () => clearTimeout(timeout)
  }, [pathname])

  return null
}
