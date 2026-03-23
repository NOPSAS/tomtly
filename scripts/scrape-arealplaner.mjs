#!/usr/bin/env node

/**
 * Arealplaner.no scraper
 * Henter alle planer, dokumenter, dispensasjoner og behandlinger
 * fra 286 aktive kommuner via arealplaner.no sitt API.
 *
 * Bruk:
 *   node scripts/scrape-arealplaner.mjs                    # Alle kommuner
 *   node scripts/scrape-arealplaner.mjs --kommune=4601     # Kun Bergen
 *   node scripts/scrape-arealplaner.mjs --kommune=3024     # Kun Bærum
 *   node scripts/scrape-arealplaner.mjs --oppdater         # Kun endrede planer
 *
 * Krever: NEXT_PUBLIC_SUPABASE_URL og SUPABASE_SERVICE_ROLE_KEY i .env.local
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

// ─── Load env ───────────────────────────────────────────────────────────────

function loadEnv() {
  try {
    const content = readFileSync(resolve(process.cwd(), '.env.local'), 'utf-8')
    for (const line of content.split('\n')) {
      const t = line.trim()
      if (!t || t.startsWith('#')) continue
      const eq = t.indexOf('=')
      if (eq === -1) continue
      const key = t.slice(0, eq).trim()
      const val = t.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  } catch {}
}
loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!supabaseUrl || !supabaseKey) {
  console.error('Mangler NEXT_PUBLIC_SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}
const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Arealplaner.no API ─────────────────────────────────────────────────────

const BASE = 'https://api.arealplaner.no/api'
const TOKEN = 'D7D7FFB4-1A4A-44EA-BD15-BCDB6CEF8CA5'
const headers = { 'X-WAAPI-TOKEN': TOKEN }

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

async function apiFetch(path) {
  const res = await fetch(`${BASE}${path}`, { headers })
  if (!res.ok) return null
  return res.json()
}

// ─── Steg 1: Hent kommuner ─────────────────────────────────────────────────

async function hentKommuner() {
  const data = await apiFetch('/kunder')
  if (!data) { console.error('Kunne ikke hente kommuner'); process.exit(1) }
  return data.filter(k => k.status === 0)
}

// ─── Steg 2: Hent alle planer per kommune ───────────────────────────────────

async function hentAllePlaner(kundeId) {
  const planer = []
  let side = 1
  while (true) {
    await sleep(200)
    const batch = await apiFetch(`/kunder/${kundeId}/arealplaner?side=${side}&antall=50`)
    if (!batch || batch.length === 0) break
    planer.push(...batch)
    side++
  }
  return planer
}

// ─── Steg 3-6: Dokumenter, behandlinger, dispensasjoner ─────────────────────

async function hentDokumenter(kundeId, planInternId) {
  return (await apiFetch(`/kunder/${kundeId}/arealplaner/${planInternId}/dokumenter`)) || []
}

async function hentBehandlinger(kundeId, planInternId) {
  return (await apiFetch(`/kunder/${kundeId}/arealplaner/${planInternId}/behandlinger`)) || []
}

async function hentDispensasjoner(kundeId, planInternId) {
  return (await apiFetch(`/kunder/${kundeId}/arealplaner/${planInternId}/dispensasjoner`)) || []
}

async function hentDokumentMedUrl(kundeId, dokId) {
  return await apiFetch(`/kunder/${kundeId}/dokumenter/${dokId}`)
}

// ─── Scrape en kommune ──────────────────────────────────────────────────────

async function scrapeKommune(kommune, oppdaterKun = false) {
  const kundeId = kommune.id
  const knr = kommune.kommunenummer || kommune.knr || ''
  const navn = kommune.navn || ''

  console.log(`\n📍 ${navn} (${knr}) – kundeId: ${kundeId}`)

  // Hent planer
  const planer = await hentAllePlaner(kundeId)
  console.log(`   ${planer.length} planer funnet`)

  // Lagre kommune
  await supabase.from('arealplaner_kommuner').upsert({
    kunde_id: kundeId,
    kommunenummer: knr,
    navn,
    antall_planer: planer.length,
    sist_scraped: new Date().toISOString(),
  }, { onConflict: 'kunde_id' })

  let planerLagret = 0
  let dokLagret = 0
  let dispLagret = 0

  for (const plan of planer) {
    await sleep(200)

    // Lagre plan
    const { error: planErr } = await supabase.from('arealplaner_planer').upsert({
      intern_id: plan.id,
      kommune_kunde_id: kundeId,
      kommunenummer: knr,
      plan_id: plan.planId || null,
      plan_navn: plan.planNavn || null,
      plan_type: plan.planType?.beskrivelse || plan.planType || null,
      plan_status: plan.planStatus?.beskrivelse || plan.planStatus || null,
      i_kraft: plan.iKraft || null,
      lovreferanse: plan.lovreferanse?.beskrivelse || plan.lovreferanse || null,
      forslagsstiller: plan.forslagsstiller?.beskrivelse || plan.forslagsstiller || null,
      sist_behandlet: plan.sistBehandlet || null,
      raw_json: plan,
    }, { onConflict: 'intern_id,kommune_kunde_id' })

    if (!planErr) planerLagret++

    // Hent dokumenter, behandlinger, dispensasjoner parallelt
    const [dokRes, dispRes] = await Promise.allSettled([
      hentDokumenter(kundeId, plan.id),
      hentDispensasjoner(kundeId, plan.id),
    ])

    const dokumenter = dokRes.status === 'fulfilled' ? dokRes.value : []
    const dispensasjoner = dispRes.status === 'fulfilled' ? dispRes.value : []

    // Lagre dokumenter
    for (const dok of dokumenter) {
      // For bestemmelser: hent direkteUrl
      let direkteUrl = null
      if (dok.dokumenttypeId === 5 || dok.dokumenttype === 'Bestemmelser' ||
          dok.dokumentnavn?.toLowerCase().includes('bestemmelse')) {
        await sleep(200)
        const meta = await hentDokumentMedUrl(kundeId, dok.id)
        if (meta?.direkteUrl) direkteUrl = meta.direkteUrl
      }

      const { error: dokErr } = await supabase.from('arealplaner_dokumenter').upsert({
        dok_id: dok.id,
        plan_intern_id: plan.id,
        kommune_kunde_id: kundeId,
        dokumentnavn: dok.dokumentnavn || null,
        dokumenttype: dok.dokumenttype || null,
        dokumenttype_id: dok.dokumenttypeId || null,
        direkte_url: direkteUrl || null,
        dokument_dato: dok.dokumentdato || null,
        tilgang: dok.tilgang || null,
      }, { onConflict: 'dok_id,kommune_kunde_id' })

      if (!dokErr) dokLagret++
    }

    // Lagre dispensasjoner
    for (const disp of dispensasjoner) {
      await supabase.from('arealplaner_dispensasjoner').upsert({
        disp_id: disp.id || Date.now(),
        plan_intern_id: plan.id,
        kommune_kunde_id: kundeId,
        raw_json: disp,
      }, { onConflict: 'disp_id,kommune_kunde_id' }).then(() => dispLagret++)
    }
  }

  console.log(`   ✅ Lagret: ${planerLagret} planer, ${dokLagret} dokumenter, ${dispLagret} dispensasjoner`)
  return { planer: planerLagret, dokumenter: dokLagret, dispensasjoner: dispLagret }
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2)
  const kommuneArg = args.find(a => a.startsWith('--kommune='))?.split('=')[1]
  const oppdater = args.includes('--oppdater')

  console.log('🗺️  Arealplaner.no Scraper')
  console.log('─'.repeat(50))

  const kommuner = await hentKommuner()
  console.log(`${kommuner.length} aktive kommuner funnet\n`)

  let targets = kommuner
  if (kommuneArg) {
    targets = kommuner.filter(k =>
      k.kommunenummer === kommuneArg ||
      k.navn?.toLowerCase().includes(kommuneArg.toLowerCase())
    )
    if (targets.length === 0) {
      console.error(`Fant ingen kommune matching "${kommuneArg}"`)
      process.exit(1)
    }
    console.log(`Filtrert til ${targets.length} kommune(r): ${targets.map(k => k.navn).join(', ')}`)
  }

  let totalPlaner = 0, totalDok = 0, totalDisp = 0
  let done = 0

  for (const kommune of targets) {
    done++
    console.log(`[${done}/${targets.length}]`)
    try {
      const result = await scrapeKommune(kommune, oppdater)
      totalPlaner += result.planer
      totalDok += result.dokumenter
      totalDisp += result.dispensasjoner
    } catch (err) {
      console.error(`   ❌ Feil for ${kommune.navn}: ${err.message}`)
    }
    await sleep(1000) // 1s mellom kommuner
  }

  console.log('\n' + '═'.repeat(50))
  console.log(`🎉 Scraping ferdig!`)
  console.log(`   Kommuner: ${done}`)
  console.log(`   Planer: ${totalPlaner}`)
  console.log(`   Dokumenter: ${totalDok}`)
  console.log(`   Dispensasjoner: ${totalDisp}`)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
