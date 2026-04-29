import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseKey)
  const now = new Date()

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
  const week = new Date(now.getTime() - 7 * 86400000).toISOString()
  const month = new Date(now.getTime() - 30 * 86400000).toISOString()

  // Counts
  const [totalRes, todayRes, weekRes, monthRes] = await Promise.all([
    supabase.from('page_views').select('id', { count: 'exact', head: true }),
    supabase.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', today),
    supabase.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', week),
    supabase.from('page_views').select('id', { count: 'exact', head: true }).gte('created_at', month),
  ])

  // Aggregations via RPC
  const [topPages, devices, referrers, daily, sessions] = await Promise.all([
    supabase.rpc('top_pages', { since: month }),
    supabase.rpc('device_breakdown', { since: month }),
    supabase.rpc('top_referrers', { since: month }),
    supabase.rpc('daily_views', { since: month }),
    supabase.rpc('unique_sessions', { since: month }),
  ])

  return NextResponse.json({
    totalt: totalRes.count || 0,
    iDag: todayRes.count || 0,
    siste7Dager: weekRes.count || 0,
    siste30Dager: monthRes.count || 0,
    toppSider: topPages.data || [],
    enheter: devices.data || [],
    toppReferrere: referrers.data || [],
    dagligVisninger: daily.data || [],
    unikkeSessjoner: sessions.data || [],
  })
}
