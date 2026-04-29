import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export async function POST(req: NextRequest) {
  try {
    const { path, referrer, session_id, device, screen_width } = await req.json()
    if (!path) return NextResponse.json({ ok: false }, { status: 400 })

    const supabase = createClient(supabaseUrl, supabaseKey)
    await supabase.from('page_views').insert({
      path,
      referrer: referrer || null,
      session_id: session_id || null,
      device: device || 'desktop',
      screen_width: screen_width || null,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
