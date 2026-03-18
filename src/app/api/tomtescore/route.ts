import { NextRequest, NextResponse } from 'next/server'
import { beregnTomtescore } from '@/lib/tomtescore'

// ============================================================
// TOMTESCORE API – Beregn score for en tomt
// ============================================================

export async function POST(request: NextRequest) {
  try {
    const input = await request.json()

    const score = beregnTomtescore(input)

    return NextResponse.json({ data: score })
  } catch {
    return NextResponse.json(
      { error: 'Ugyldig input for tomtescore-beregning' },
      { status: 400 }
    )
  }
}
