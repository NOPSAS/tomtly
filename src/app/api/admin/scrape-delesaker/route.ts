import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Search for subdivision cases in municipal post lists via eInnsyn
const SEARCH_TERMS = [
  'fradeling',
  'delingssoknad',
  'arealoverfoering',
  'opprettelse av ny grunneiendom',
]
const EINNSYN_API = 'https://einnsyn.no/api/search'

async function searchEinnsyn(query: string) {
  try {
    const res = await fetch(
      `https://einnsyn.no/uttrekk/query?term=${encodeURIComponent(query)}&type=journalpost&limit=20`,
      {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Tomtly/1.0',
        },
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : data.results || data.data || []
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

  for (const term of SEARCH_TERMS) {
    await new Promise(r => setTimeout(r, 2000))
    const results = await searchEinnsyn(term)
    totalFound += results.length

    for (const result of results.slice(0, 10)) {
      const saksnummer =
        result.saksnummer ||
        result.journalpostId ||
        result.id ||
        `einnsyn-${Date.now()}`
      const { data: existing } = await supabase
        .from('delesaker')
        .select('id')
        .eq('saksnummer', String(saksnummer))
        .single()

      if (!existing) {
        await supabase.from('delesaker').insert({
          saksnummer: String(saksnummer),
          adresse: result.tittel || result.offentligTittel || null,
          kommune: result.administrativEnhet || null,
          soker_navn: result.avsender || null,
          dokumenttype: term,
          sak_status: 'ukjent',
          dato:
            result.dokumentDato ||
            result.journalDato ||
            new Date().toISOString().split('T')[0],
        })
        totalSaved++
      }
    }
  }

  return NextResponse.json({
    success: true,
    sokeord: SEARCH_TERMS.length,
    funnet: totalFound,
    lagret: totalSaved,
  })
}

export async function GET() {
  return handler()
}

export async function POST() {
  return handler()
}
