import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { AnalysePDF } from '@/lib/pdf/AnalysePDF'
import type { AnalysePDFData } from '@/lib/pdf/AnalysePDF'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(request: NextRequest) {
  let data: AnalysePDFData
  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ugyldig JSON' }, { status: 400 })
  }

  if (!data.adresse) {
    return NextResponse.json({ error: 'adresse er påkrevd' }, { status: 400 })
  }

  try {
    const buffer = await renderToBuffer(
      React.createElement(AnalysePDF, { data }) as any
    )

    const filename = `Tomtly-Analyse-${data.adresse.replace(/[\s,]+/g, '-')}.pdf`

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err: any) {
    console.error('[analyse-pdf]', err)
    return NextResponse.json({ error: err?.message || 'PDF-generering feilet' }, { status: 500 })
  }
}
