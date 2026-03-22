import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const KOMMUNER = [
  { nummer: '3020', navn: 'Nordre Follo' },
  { nummer: '3024', navn: 'Bærum' },
  { nummer: '3025', navn: 'Asker' },
  { nummer: '3212', navn: 'Nesodden' },
  { nummer: '3214', navn: 'Frogn' },
]

interface GeoNorgeAdresse {
  adressetekst: string
  kommunenavn: string
  kommunenummer: string
  gardsnummer?: number
  bruksnummer?: number
  representasjonspunkt?: { lat: number; lon: number }
}

async function searchMatrikkel(kommunenummer: string, side: number = 0) {
  try {
    const res = await fetch(
      `https://ws.geonorge.no/adresser/v1/sok?kommunenummer=${kommunenummer}&treffPerSide=200&side=${side}&filtrer=adressetekst,kommunenavn,kommunenummer,gardsnummer,bruksnummer,representasjonspunkt`,
      { headers: { Accept: 'application/json' } }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.adresser || []) as GeoNorgeAdresse[]
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

  let totalFound = 0
  let totalSaved = 0
  const resultPerKommune: { kommune: string; funnet: number; lagret: number }[] = []

  for (const kommune of KOMMUNER) {
    await new Promise(r => setTimeout(r, 1000))
    const adresser = await searchMatrikkel(kommune.nummer)
    totalFound += adresser.length
    let lagretKommune = 0

    for (const adr of adresser) {
      if (!adr.gardsnummer || !adr.bruksnummer) continue

      const matrikkelenhet = `${kommune.nummer}-${adr.gardsnummer}/${adr.bruksnummer}`

      // Check if already exists
      const { data: existing } = await supabase
        .from('kartverket_fradelinger')
        .select('id')
        .eq('matrikkelenhet', matrikkelenhet)
        .single()

      if (!existing) {
        const { error } = await supabase.from('kartverket_fradelinger').insert({
          matrikkelenhet,
          adresse: adr.adressetekst,
          kommune: adr.kommunenavn || kommune.navn,
          gardsnummer: adr.gardsnummer,
          bruksnummer: adr.bruksnummer,
          lat: adr.representasjonspunkt?.lat || null,
          lon: adr.representasjonspunkt?.lon || null,
          status: 'ny',
          notater: '',
          dato: new Date().toISOString().split('T')[0],
        })
        if (!error) {
          totalSaved++
          lagretKommune++
        }
      }
    }

    resultPerKommune.push({
      kommune: kommune.navn,
      funnet: adresser.length,
      lagret: lagretKommune,
    })
  }

  return NextResponse.json({
    success: true,
    kommuner_sjekket: KOMMUNER.length,
    adresser_funnet: totalFound,
    nye_lagret: totalSaved,
    per_kommune: resultPerKommune,
  })
}

export async function GET() {
  return handler()
}

export async function POST() {
  return handler()
}
