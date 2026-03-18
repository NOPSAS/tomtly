// ============================================================
// TOMTLY – Tomtescore Algoritme
// ============================================================
// Score 0-100 basert på 6 dimensjoner med vekting.
// Designet for å gi kjøpere og utviklere et raskt bilde
// av tomtens utviklingspotensial.

import type { Tomt, Tomtescore } from '@/types'

interface ScoreInput {
  // Beliggenhet
  avstand_sentrum_km: number
  avstand_skole_km: number
  avstand_butikk_km: number
  avstand_kollektiv_km: number
  solforhold_timer: number // sol-timer midt på dagen, sommer

  // Regulering
  utnyttelsesgrad_bya: number
  maks_etasjer: number
  antall_hensynssoner: number
  reguleringsfleksibilitet: 1 | 2 | 3 | 4 | 5

  // Topografi
  helning_prosent: number
  grunnforhold: 'fjell' | 'morene' | 'leire' | 'kvikkleire'
  flomfare: boolean
  stormfare: boolean

  // Infrastruktur
  vei_tilgang: boolean
  vann_tilkobling: boolean
  avlop_tilkobling: boolean
  strom_tilkobling: boolean
  fiber_tilkobling: boolean

  // Marked
  pris_per_m2_omraade: number
  pristrend_12m_prosent: number
  etterspørsel: 1 | 2 | 3 | 4 | 5
  dager_paa_marked_snitt: number

  // Økonomi
  estimert_roi_prosent: number
  byggekostnad_per_m2: number
  risikofaktor_snitt: number // 1-5
}

const VEKTER = {
  beliggenhet: 0.25,
  regulering: 0.20,
  topografi: 0.15,
  infrastruktur: 0.10,
  marked: 0.15,
  okonomi: 0.15,
} as const

export function beregnTomtescore(input: ScoreInput): Tomtescore {
  const delscorer = {
    beliggenhet: beregnBeliggenhet(input),
    regulering: beregnRegulering(input),
    topografi: beregnTopografi(input),
    infrastruktur: beregnInfrastruktur(input),
    marked: beregnMarked(input),
    okonomi: beregnOkonomi(input),
  }

  const total = Math.round(
    delscorer.beliggenhet * VEKTER.beliggenhet +
    delscorer.regulering * VEKTER.regulering +
    delscorer.topografi * VEKTER.topografi +
    delscorer.infrastruktur * VEKTER.infrastruktur +
    delscorer.marked * VEKTER.marked +
    delscorer.okonomi * VEKTER.okonomi
  )

  return {
    total: Math.min(100, Math.max(0, total)),
    delscorer,
    beregnet_dato: new Date().toISOString(),
    forklaring: genererForklaring(delscorer, total),
  }
}

// ---- Delscore-funksjoner ----

function beregnBeliggenhet(i: ScoreInput): number {
  let score = 0

  // Avstand til sentrum (0-25p) – under 2km = full score
  score += Math.max(0, 25 - (i.avstand_sentrum_km * 5))

  // Avstand til skole (0-20p) – under 1km = full score
  score += Math.max(0, 20 - (i.avstand_skole_km * 10))

  // Avstand til butikk (0-20p)
  score += Math.max(0, 20 - (i.avstand_butikk_km * 15))

  // Avstand til kollektiv (0-15p)
  score += Math.max(0, 15 - (i.avstand_kollektiv_km * 10))

  // Solforhold (0-20p) – 8+ timer = full score
  score += Math.min(20, (i.solforhold_timer / 8) * 20)

  return Math.min(100, Math.max(0, Math.round(score)))
}

function beregnRegulering(i: ScoreInput): number {
  let score = 0

  // Utnyttelsesgrad (0-30p) – høyere = bedre for utvikling
  score += Math.min(30, i.utnyttelsesgrad_bya * 0.75)

  // Maks etasjer (0-20p)
  score += Math.min(20, i.maks_etasjer * 5)

  // Hensynssoner (0-20p) – færre = bedre
  score += Math.max(0, 20 - (i.antall_hensynssoner * 7))

  // Reguleringsfleksibilitet (0-30p)
  score += i.reguleringsfleksibilitet * 6

  return Math.min(100, Math.max(0, Math.round(score)))
}

function beregnTopografi(i: ScoreInput): number {
  let score = 80 // Start høyt, trekk fra

  // Helning – flat er best for bygging
  if (i.helning_prosent > 30) score -= 40
  else if (i.helning_prosent > 20) score -= 25
  else if (i.helning_prosent > 10) score -= 10

  // Grunnforhold
  switch (i.grunnforhold) {
    case 'fjell': score += 10; break
    case 'morene': score += 5; break
    case 'leire': score -= 10; break
    case 'kvikkleire': score -= 30; break
  }

  // Naturfare
  if (i.flomfare) score -= 20
  if (i.stormfare) score -= 10

  return Math.min(100, Math.max(0, Math.round(score)))
}

function beregnInfrastruktur(i: ScoreInput): number {
  let score = 0
  if (i.vei_tilgang) score += 25
  if (i.vann_tilkobling) score += 25
  if (i.avlop_tilkobling) score += 25
  if (i.strom_tilkobling) score += 15
  if (i.fiber_tilkobling) score += 10
  return Math.min(100, score)
}

function beregnMarked(i: ScoreInput): number {
  let score = 0

  // Pristrend (0-30p) – positiv trend er bra
  score += Math.min(30, Math.max(0, i.pristrend_12m_prosent * 3))

  // Etterspørsel (0-40p)
  score += i.etterspørsel * 8

  // Dager på marked (0-30p) – færre dager = bedre marked
  if (i.dager_paa_marked_snitt < 30) score += 30
  else if (i.dager_paa_marked_snitt < 60) score += 20
  else if (i.dager_paa_marked_snitt < 120) score += 10

  return Math.min(100, Math.max(0, Math.round(score)))
}

function beregnOkonomi(i: ScoreInput): number {
  let score = 0

  // ROI (0-40p)
  if (i.estimert_roi_prosent > 30) score += 40
  else if (i.estimert_roi_prosent > 20) score += 30
  else if (i.estimert_roi_prosent > 10) score += 20
  else if (i.estimert_roi_prosent > 0) score += 10

  // Byggekostnad per m2 – lavere = bedre (0-30p)
  if (i.byggekostnad_per_m2 < 30000) score += 30
  else if (i.byggekostnad_per_m2 < 40000) score += 20
  else if (i.byggekostnad_per_m2 < 50000) score += 10

  // Risiko (0-30p) – lavere = bedre
  score += Math.max(0, 30 - (i.risikofaktor_snitt * 6))

  return Math.min(100, Math.max(0, Math.round(score)))
}

// ---- Forklaring ----

function genererForklaring(
  delscorer: Tomtescore['delscorer'],
  total: number
): string {
  const styrker: string[] = []
  const svakheter: string[] = []

  const labels: Record<string, string> = {
    beliggenhet: 'Beliggenhet',
    regulering: 'Regulering',
    topografi: 'Topografi',
    infrastruktur: 'Infrastruktur',
    marked: 'Marked',
    okonomi: 'Økonomi',
  }

  for (const [key, value] of Object.entries(delscorer)) {
    if (value >= 70) styrker.push(labels[key])
    if (value < 40) svakheter.push(labels[key])
  }

  let tekst = `Tomten scorer ${total} av 100. `

  if (styrker.length > 0) {
    tekst += `Sterke sider: ${styrker.join(', ')}. `
  }

  if (svakheter.length > 0) {
    tekst += `Utfordringer: ${svakheter.join(', ')}. `
  }

  if (total >= 80) {
    tekst += 'Dette er en tomt med svært godt utviklingspotensial.'
  } else if (total >= 60) {
    tekst += 'Tomten har godt potensial med noen forhold å avklare.'
  } else if (total >= 40) {
    tekst += 'Tomten har moderat potensial. Grundig analyse anbefales.'
  } else {
    tekst += 'Tomten har vesentlige utfordringer som bør utredes nøye.'
  }

  return tekst
}
