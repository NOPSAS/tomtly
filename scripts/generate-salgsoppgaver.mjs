// Genererer PDF-salgsoppgaver lokalt og lagrer til:
//  1. public/tomter/[slug]/salgsoppgave.pdf  (for nettstedet)
//  2. OneDrive/Tomtly/[Tomt-navn]/salgsoppgave.pdf
//
// Kjør: node scripts/generate-salgsoppgaver.mjs

import { renderToBuffer } from '@react-pdf/renderer'
import React from 'react'
import { createRequire } from 'module'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')

// OneDrive-rot for Tomtly-dokumenter
const ONEDRIVE = 'C:/Users/jakob/OneDrive - Konsepthus AS/TEGNEBUA - Dokumenter/Tomtly'

// Importer data og komponent via tsx/ts-node (krever tsx installert)
// Siden dette er et .mjs-skript, bruker vi en enkel tilnærming:
// Vi kjører API-et via fetch mot lokal dev-server eller produksjon.

const TOMTER = [
  { slug: 'myllavegen-58', mappeNavn: 'Myllavegen 58' },
  { slug: 'gamle-dalsveg-16', mappeNavn: 'Gamle Dalsveg 16' },
]

// Hent fra Vercel (produksjon) eller lokal dev-server
const BASE_URL = process.env.BASE_URL || 'https://tomtly.no'

async function genererPDF(slug, mappeNavn) {
  console.log(`\n📄 Genererer: ${slug}...`)

  const url = `${BASE_URL}/api/salgsoppgave/${slug}`
  console.log(`   Henter fra: ${url}`)

  const res = await fetch(url)
  if (!res.ok) {
    const txt = await res.text()
    console.error(`   ❌ Feil ${res.status}: ${txt.slice(0, 200)}`)
    return
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  console.log(`   ✓ PDF mottatt (${Math.round(buffer.length / 1024)} KB)`)

  // 1. Lagre til public/tomter/[slug]/
  const publicPath = join(projectRoot, 'public', 'tomter', slug, 'salgsoppgave.pdf')
  writeFileSync(publicPath, buffer)
  console.log(`   ✓ Lagret: public/tomter/${slug}/salgsoppgave.pdf`)

  // 2. Lagre til OneDrive
  const onedriveMappe = join(ONEDRIVE, mappeNavn)
  if (!existsSync(onedriveMappe)) {
    mkdirSync(onedriveMappe, { recursive: true })
  }
  const onedrivePath = join(onedriveMappe, 'salgsoppgave.pdf')
  writeFileSync(onedrivePath, buffer)
  console.log(`   ✓ Lagret: ${onedrivePath}`)
}

async function main() {
  console.log('🏠 Tomtly – PDF-salgsoppgave-generator')
  console.log(`   Base URL: ${BASE_URL}`)
  console.log(`   OneDrive: ${ONEDRIVE}\n`)

  for (const { slug, mappeNavn } of TOMTER) {
    await genererPDF(slug, mappeNavn)
  }

  console.log('\n✅ Alle salgsoppgaver generert!')
  console.log('   Husk å committe og deploye ny salgsoppgave.pdf til public/')
}

main().catch(err => {
  console.error('❌ Feil:', err.message)
  process.exit(1)
})
