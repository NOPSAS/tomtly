import { NextRequest, NextResponse } from 'next/server'

interface KjoperProfil {
  id: string
  navn: string
  email: string
  telefon: string
  kommune: string[]
  budsjett_min: number
  budsjett_maks: number
  areal_min: number
  areal_maks: number
  preferanser: Record<string, any>
}

interface Tomt {
  id: string
  adresse: string
  kommune: string
  areal: number
  prisantydning: number
  status: string
  ekstra: Record<string, any>
}

interface Match {
  kjoper: KjoperProfil
  tomt: Tomt
  score: number
  grunner: string[]
}

function beregneMatch(kjoper: KjoperProfil, tomt: Tomt): Match | null {
  const grunner: string[] = []
  let score = 0

  // Kommune-match
  if (kjoper.kommune?.some(k => k.toLowerCase() === tomt.kommune?.toLowerCase())) {
    score += 40
    grunner.push(`Kommune: ${tomt.kommune}`)
  } else {
    return null // Kommune er obligatorisk match
  }

  // Budsjett-match
  if (tomt.prisantydning) {
    if (tomt.prisantydning >= (kjoper.budsjett_min || 0) && tomt.prisantydning <= (kjoper.budsjett_maks || Infinity)) {
      score += 30
      grunner.push(`Innenfor budsjett: ${(tomt.prisantydning / 1_000_000).toFixed(1)} MNOK`)
    } else if (tomt.prisantydning <= (kjoper.budsjett_maks || Infinity) * 1.1) {
      score += 15
      grunner.push('Litt over budsjett, men nær')
    } else {
      return null // For dyrt
    }
  }

  // Areal-match
  if (tomt.areal) {
    if (tomt.areal >= (kjoper.areal_min || 0) && tomt.areal <= (kjoper.areal_maks || Infinity)) {
      score += 20
      grunner.push(`Areal passer: ${tomt.areal} m\u00B2`)
    } else if (tomt.areal >= (kjoper.areal_min || 0) * 0.8) {
      score += 10
      grunner.push('Areal nær ønsket størrelse')
    }
  }

  // Bonus for fersk tomt
  score += 10
  grunner.push('Ny tomt på markedet')

  return { kjoper, tomt, score, grunner }
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Supabase ikke konfigurert' }, { status: 500 })
    }

    const headers = {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
    }

    // Fetch buyer profiles
    const kjopereRes = await fetch(`${supabaseUrl}/rest/v1/kjoper_profiler?select=*`, { headers })
    const kjopere: KjoperProfil[] = kjopereRes.ok ? await kjopereRes.json() : []

    // Fetch available plots
    const tomterRes = await fetch(`${supabaseUrl}/rest/v1/finn_tomter?status=eq.ny&select=*`, { headers })
    const tomter: Tomt[] = tomterRes.ok ? await tomterRes.json() : []

    // Run matching
    const matches: Match[] = []

    for (const kjoper of kjopere) {
      for (const tomt of tomter) {
        const match = beregneMatch(kjoper, tomt)
        if (match && match.score >= 40) {
          matches.push(match)
        }
      }
    }

    // Sort by relevance
    matches.sort((a, b) => b.score - a.score)

    return NextResponse.json({
      matches,
      stats: {
        antall_kjopere: kjopere.length,
        antall_tomter: tomter.length,
        antall_matches: matches.length,
      },
    })
  } catch (error: any) {
    console.error('Matching error:', error)
    return NextResponse.json({ error: 'Matching feilet' }, { status: 500 })
  }
}
