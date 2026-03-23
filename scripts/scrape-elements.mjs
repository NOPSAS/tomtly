#!/usr/bin/env node

/**
 * Playwright-basert scraper for kommunale innsynsløsninger
 * Henter fradelingssaker fra 44+ norske kommuner
 * Støtter: Elements Publikum, ACOS Innsynpluss, Innsynsportal.no, Drammen innsyn2020
 *
 * Bruk: node scripts/scrape-elements.mjs
 * Krever: NEXT_PUBLIC_SUPABASE_URL og SUPABASE_SERVICE_ROLE_KEY i .env.local
 */

import { chromium } from 'playwright'
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// ─── Load env from .env.local ───────────────────────────────────────────────

function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), '.env.local')
    const content = readFileSync(envPath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIdx = trimmed.indexOf('=')
      if (eqIdx === -1) continue
      const key = trimmed.slice(0, eqIdx).trim()
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
      if (!process.env[key]) process.env[key] = val
    }
  } catch {}
}

loadEnv()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Mangler NEXT_PUBLIC_SUPABASE_URL eller SUPABASE_SERVICE_ROLE_KEY i .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Kommune-konfigurasjon ──────────────────────────────────────────────────

// type: 'elements' | 'acos' | 'innsynsportal' | 'drammen'
const KOMMUNER = [
  // ── Elements Publikum kommuner ──
  // Østlandet
  { navn: 'Oslo', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/921133642' },
  { navn: 'Nesodden', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/944383565_PROD-944383565' },
  { navn: 'Kongsberg', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/942402465_PROD-942402465' },
  { navn: 'Hamar', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/970540008_PROD-970540008' },
  { navn: 'Lillehammer', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/945578564_PROD-945578564' },
  { navn: 'Lier', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/857566122' },
  { navn: 'Øvre Eiker', type: 'elements', url: 'https://prod01.elementscloud.no/publikum/954597482_PROD-954597482' },
  { navn: 'Rælingen', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/952540556' },
  { navn: 'Enebakk', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/964949581' },
  // Østfold
  { navn: 'Halden', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/959159092' },
  { navn: 'Sarpsborg', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/938801363' },
  { navn: 'Fredrikstad', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/940039541' },
  { navn: 'Hvaler', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/964947082' },
  { navn: 'Rakkestad', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/945372281_PROD-945372281' },
  // Buskerud/Hallingdal
  { navn: 'Flå', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/964951462' },
  { navn: 'Nesbyen', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/964951640' },
  { navn: 'Gol', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/964952612' },
  { navn: 'Hemsedal', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/964952701' },
  { navn: 'Ål', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/864952992' },
  { navn: 'Hol', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/944889116' },
  { navn: 'Sigdal', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/964962766_PROD-964962766' },
  { navn: 'Krødsherad', type: 'elements', url: 'https://prod01.elementscloud.no/publikum/964962855' },
  { navn: 'Flesberg', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/940898862_PROD-940898862' },
  { navn: 'Rollag', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/964963282_PROD-964963282' },
  { navn: 'Nore og Uvdal', type: 'elements', url: 'https://prod01.elementscloud.no/publikum/964950946_PROD-964950946' },
  // Innlandet
  { navn: 'Løten', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/964950679_PROD-964950679' },
  { navn: 'Stange', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/970169717_PROD-970169717' },
  { navn: 'Trysil', type: 'elements', url: 'https://prod01.elementscloud.no/publikum/864948502_PROD-864948502' },
  { navn: 'Åmot', type: 'elements', url: 'https://prod01.elementscloud.no/publikum/940152496_PROD-940152496' },
  { navn: 'Stor-Elvdal', type: 'elements', url: 'https://prod01.elementscloud.no/publikum/964948887_PROD-964948887' },
  // Gudbrandsdalen
  { navn: 'Dovre', type: 'elements', url: 'https://prod01.elementscloud.no/publikum/939849831_PROD-939849831-DOVRE' },
  { navn: 'Lesja', type: 'elements', url: 'https://prod01.elementscloud.no/publikum/964949204_PROD-964949204-LESJA' },
  { navn: 'Sel', type: 'elements', url: 'https://prod01.elementscloud.no/publikum/939617671_PROD-939617671-SEL' },
  { navn: 'Øyer', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/961381185_PROD-961381185' },
  { navn: 'Gausdal', type: 'elements', url: 'https://prod02.elementscloud.no/publikum/961381274_PROD-961381274' },
  // Nordland
  { navn: 'Rana', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/872418032' },
  { navn: 'Vefsn', type: 'elements', url: 'https://prod01.elementscloud.no/Publikum/844824122' },

  // ── ACOS Innsynpluss (Bærum + andre) ──
  { navn: 'Bærum', type: 'acos', url: 'https://innsynpluss.onacos.no/baerum/Byggesak/Liste' },

  // ── Innsynsportal.no (Asker) ──
  { navn: 'Asker', type: 'innsynsportal', url: 'https://asker-bygg.innsynsportal.no/postjournal-v2/d3aab42c-a204-438d-8e99-5189ae2ff468' },

  // ── Drammen (custom innsyn2020) ──
  { navn: 'Drammen', type: 'drammen', url: 'https://innsyn2020.drammen.kommune.no/byggsak' },

  // ── Vestfold/Viken (ACOS-baserte kommunesider) ──
  { navn: 'Larvik', type: 'acos', url: 'https://innsynpluss.onacos.no/larvik/sok/?response=arkivsak_sok_tomdefault' },
  { navn: 'Tønsberg', type: 'acos', url: 'https://www.tonsberg.kommune.no/tjenester/innsyn/sok-i-postlister-saker-og-dokumenter/' },
  { navn: 'Sandefjord', type: 'acos', url: 'https://www.sandefjord.kommune.no/engasjer-deg/innsyn-og-apenhet/sok-etter-saker-og-dokumenter/' },
  { navn: 'Moss', type: 'acos', url: 'https://www.moss.kommune.no/alle-tjenester/innsyn/postliste-og-saksinnsyn/' },
]

const SEARCH_TERMS = [
  'fradeling',
  'opprettelse av grunneiendom',
  'deling av eiendom',
  'arealoverføring',
]

// ─── Generic page scraper ───────────────────────────────────────────────────

async function scrapePage(browser, kommune, searchTerm) {
  const results = []
  let page

  try {
    page = await browser.newPage()
    page.setDefaultTimeout(20000)

    // Navigate to the page
    await page.goto(kommune.url, { waitUntil: 'networkidle', timeout: 30000 })
    await page.waitForTimeout(3000)

    // Find and use the search field (works for all system types)
    const searchSelectors = [
      'input[type="search"]',
      'input[type="text"][name*="search" i]',
      'input[type="text"][name*="sok" i]',
      'input[type="text"][name*="query" i]',
      'input[placeholder*="øk" i]',
      'input[placeholder*="Søk" i]',
      'input[placeholder*="skriv" i]',
      '#searchInput',
      '.search-input input',
      'input[type="text"]',
    ]

    let searchInput = null
    for (const sel of searchSelectors) {
      try {
        searchInput = await page.$(sel)
        if (searchInput) break
      } catch {}
    }

    if (searchInput) {
      await searchInput.click()
      await searchInput.fill(searchTerm)
      await page.keyboard.press('Enter')
      await page.waitForTimeout(4000)
    } else {
      // Try clicking a search button/link first
      try {
        await page.click('a:has-text("Søk"), button:has-text("Søk")', { timeout: 3000 })
        await page.waitForTimeout(2000)
        // Try again after clicking
        for (const sel of searchSelectors) {
          searchInput = await page.$(sel)
          if (searchInput) {
            await searchInput.fill(searchTerm)
            await page.keyboard.press('Enter')
            await page.waitForTimeout(4000)
            break
          }
        }
      } catch {}
    }

    // Extract all text content and find fradeling-related entries
    const entries = await page.evaluate((term) => {
      const body = document.body.textContent || ''
      const items = []

      // Look for case-like patterns near our search terms
      const keywords = [term, 'fradeling', 'grunneiendom', 'arealoverf', 'deling']
      const lines = body.split('\n').map(l => l.trim()).filter(l => l.length > 10)

      for (const line of lines) {
        const lower = line.toLowerCase()
        if (keywords.some(kw => lower.includes(kw.toLowerCase()))) {
          if (line.length < 500) {
            items.push(line)
          }
        }
      }

      // Also try structured patterns
      const casePattern = /(\d{4}\/\d{3,6})[^\n]{0,200}(?:fradeling|deling|grunneiendom|arealoverf)/gi
      let m
      while ((m = casePattern.exec(body)) !== null) {
        items.push(m[0].substring(0, 300))
      }

      return [...new Set(items)].slice(0, 30)
    }, searchTerm)

    for (const entry of entries) {
      const lower = entry.toLowerCase()
      // Must contain at least one of our keywords
      if (!lower.includes('fradeling') && !lower.includes('deling') &&
          !lower.includes('grunneiendom') && !lower.includes('arealoverf')) {
        continue
      }

      const caseMatch = entry.match(/(\d{4}\/\d{3,6})/) || entry.match(/(BYGG-\d{2}\/\d{4,6})/)
      const addrMatch = entry.match(/([A-ZÆØÅ][a-zæøå]+(?:veien|gata|gate|vei|plass|vegen|stien|bakken|lia|åsen)\s*\d*[A-Za-z]?)/i)

      results.push({
        saksnummer: caseMatch?.[1] || `pw-${kommune.navn.toLowerCase().replace(/\s/g, '')}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        adresse: addrMatch?.[1] || entry.substring(0, 150).trim(),
        kommune: kommune.navn,
        kilde: `Playwright-${kommune.type}-${kommune.navn}`,
        detaljer: entry.substring(0, 300),
      })
    }

    if (results.length > 0) {
      console.log(`  ✓ ${kommune.navn} (${kommune.type}): ${results.length} treff for "${searchTerm}"`)
    }
  } catch (err) {
    console.log(`  ✗ ${kommune.navn}: ${err.message?.substring(0, 80)}`)
  } finally {
    if (page) await page.close().catch(() => {})
  }

  return results
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍 Kommune Innsyns-Scraper (Playwright)`)
  console.log(`   ${KOMMUNER.length} kommuner × ${SEARCH_TERMS.length} søkeord`)
  console.log(`   Systemer: Elements Publikum, ACOS Innsynpluss, Innsynsportal.no, Drammen\n`)

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const allResults = []
  let done = 0

  for (const kommune of KOMMUNER) {
    done++
    console.log(`[${done}/${KOMMUNER.length}] ${kommune.navn} (${kommune.type})...`)

    for (const term of SEARCH_TERMS) {
      const results = await scrapePage(browser, kommune, term)
      allResults.push(...results)
      await new Promise(r => setTimeout(r, 500))
    }

    await new Promise(r => setTimeout(r, 1000))
  }

  await browser.close()

  // Deduplicate
  const seen = new Set()
  const unique = allResults.filter(r => {
    if (seen.has(r.saksnummer)) return false
    seen.add(r.saksnummer)
    return true
  })

  console.log(`\n📊 Resultat: ${allResults.length} totalt, ${unique.length} unike\n`)

  // Save to Supabase
  let saved = 0
  let skipped = 0

  for (const r of unique) {
    const { data: existing } = await supabase
      .from('delesaker')
      .select('id')
      .eq('saksnummer', r.saksnummer)
      .single()

    if (existing) { skipped++; continue }

    const { error } = await supabase.from('delesaker').insert({
      saksnummer: r.saksnummer,
      adresse: r.adresse,
      kommune: r.kommune,
      dokumenttype: r.kilde,
      sak_status: 'ukjent',
      vaar_status: 'ny',
      dato: new Date().toISOString().split('T')[0],
      detaljer: r.detaljer,
    })

    if (!error) saved++
    else console.log(`  DB-feil: ${error.message}`)
  }

  console.log(`\n✅ Ferdig!`)
  console.log(`   Lagret: ${saved} nye delesaker`)
  console.log(`   Hoppet over: ${skipped} duplikater`)
  console.log(`   Kommuner: ${KOMMUNER.length}`)
  console.log(`   Systemer: Elements(${KOMMUNER.filter(k=>k.type==='elements').length}), ACOS(${KOMMUNER.filter(k=>k.type==='acos').length}), Innsynsportal(${KOMMUNER.filter(k=>k.type==='innsynsportal').length}), Drammen(${KOMMUNER.filter(k=>k.type==='drammen').length})`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
