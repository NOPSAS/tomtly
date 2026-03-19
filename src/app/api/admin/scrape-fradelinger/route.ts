import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const KOMMUNER = [
  { nummer: '3020', navn: 'Nordre Follo' },
  { nummer: '3024', navn: 'Baerum' },
  { nummer: '3203', navn: 'Asker' },
  { nummer: '3220', navn: 'Nesodden' },
  { nummer: '3222', navn: 'Frogn' },
]

async function searchMatrikkel(kommunenummer: string) {
  // Search GeoNorge for addresses in kommune
  try {
    const res = await fetch(
      `https://ws.geonorge.no/adresser/v1/sok?kommunenummer=${kommunenummer}&treffPerSide=50&side=0`,
      { headers: { 'Accept': 'application/json' } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return data.adresser || []
  } catch {
    return []
  }
}

async function handler() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  let total = 0
  for (const kommune of KOMMUNER) {
    await new Promise(r => setTimeout(r, 2000))
    const adresser = await searchMatrikkel(kommune.nummer)
    // Filter for potential subdivisions: look for large plots
    // In production this would check actual matrikkel data
    total += adresser.length
  }

  return NextResponse.json({
    success: true,
    kommuner_sjekket: KOMMUNER.length,
    adresser_funnet: total,
  })
}

export async function GET() {
  return handler()
}

export async function POST() {
  return handler()
}
