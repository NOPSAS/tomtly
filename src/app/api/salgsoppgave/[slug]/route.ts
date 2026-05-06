import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { SalgsoppgavePDF } from '@/lib/pdf/SalgsoppgavePDF'
import { SALGSOPPGAVE_DATA } from '@/lib/salgsoppgave-data'

export const dynamic = 'force-dynamic'
export const maxDuration = 60

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const tomt = SALGSOPPGAVE_DATA[slug]
  if (!tomt) {
    return NextResponse.json({ error: 'Tomt ikke funnet' }, { status: 404 })
  }

  try {
    const buffer = await renderToBuffer(
      React.createElement(SalgsoppgavePDF, { tomt }) as any
    )

    const filename = `Tomtly-Salgsoppgave-${tomt.adresse.replace(/\s+/g, '-')}.pdf`

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (err: any) {
    console.error('[salgsoppgave]', err)
    return NextResponse.json({ error: err?.message || 'PDF-generering feilet' }, { status: 500 })
  }
}
