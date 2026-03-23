import { NextResponse } from 'next/server'

// Elements Publikum scraper
// Playwright kan ikke kjøre på Vercel – dette endepunktet gir instruksjoner
// For full scraping: node scripts/scrape-elements.mjs

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Elements Publikum krever Playwright (nettleserautomatisering) og kan ikke kjøres på Vercel.',
    instruksjoner: 'Kjør lokalt: node scripts/scrape-elements.mjs',
    kommuner: 44,
    systemer: ['Elements Publikum (37)', 'ACOS Innsynpluss (4)', 'Innsynsportal.no (1)', 'Drammen innsyn2020 (1)', 'Moss (1)'],
  })
}

export async function POST() {
  return NextResponse.json({
    success: false,
    error: 'Elements Publikum krever Playwright (nettleserautomatisering) og kan ikke kjøres på Vercel.',
    instruksjoner: 'Kjør lokalt: node scripts/scrape-elements.mjs',
    kommuner: 44,
  })
}
