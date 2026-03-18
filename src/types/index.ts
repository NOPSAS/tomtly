// ============================================================
// TOMTLY – Core Type Definitions
// ============================================================

export interface Tomt {
  id: string
  created_at: string
  updated_at: string
  status: TomtStatus
  slug: string

  // Grunndata
  adresse: string
  postnummer: string
  poststed: string
  kommune: string
  fylke: string
  gnr: number
  bnr: number
  fnr?: number
  snr?: number

  // Geometri
  areal_m2: number
  geometri: GeoJSON.Polygon
  senterpunkt: { lat: number; lng: number }

  // Eierskap
  eier_id: string
  megler_id?: string

  // Regulering
  regulering: Regulering

  // Analyse
  mulighetsstudie?: Mulighetsstudie
  utviklingsscenarioer: Utviklingsscenario[]
  byggekostnad?: Byggekostnad
  salgsverdi?: Salgsverdi
  risikoanalyse?: Risikoanalyse
  tomtescore?: Tomtescore

  // Media
  bilder: string[]
  visualiseringer: Visualisering[]
  dokumenter: Dokument[]
}

export type TomtStatus =
  | 'draft'
  | 'analyzing'
  | 'ready'
  | 'published'
  | 'sold'
  | 'archived'

// ---- Regulering ----

export interface Regulering {
  arealformaal: string
  utnyttelsesgrad_bya: number  // prosent
  utnyttelsesgrad_tu?: number
  maks_hoyde_m: number
  maks_etasjer: number
  byggegrense_m: number
  parkering_krav?: string
  hensynssoner: Hensynssone[]
  bestemmelser: string[]
  planid?: string
  plannavn?: string
  vedtaksdato?: string
}

export interface Hensynssone {
  type: string
  beskrivelse: string
  konsekvens: 'lav' | 'medium' | 'hoy'
}

// ---- Mulighetsstudie ----

export interface Mulighetsstudie {
  oppsummering: string
  maks_bra_m2: number
  anbefalt_bra_m2: number
  maks_enheter: number
  anbefalt_enheter: number
  bygningstyper: string[]
  fordeler: string[]
  utfordringer: string[]
  arkitektens_vurdering: string
}

// ---- Utviklingsscenario ----

export interface Utviklingsscenario {
  id: string
  navn: string
  beskrivelse: string
  type: 'konservativ' | 'moderat' | 'ambisios'
  enheter: Enhet[]
  total_bra_m2: number
  utnyttelsesgrad: number
  estimert_byggekostnad: number
  estimert_salgsverdi: number
  estimert_fortjeneste: number
  roi_prosent: number
  visualisering_url?: string
}

export interface Enhet {
  type: 'enebolig' | 'tomannsbolig' | 'rekkehus' | 'leilighet' | 'hybel'
  antall: number
  bra_m2: number
  soverom: number
  estimert_pris: number
}

// ---- Byggekostnad ----

export interface Byggekostnad {
  grunnarbeid: number
  infrastruktur: number
  bygningskropp: number
  tekniske_anlegg: number
  innvendig: number
  utomhus: number
  prosjektering: number
  uforutsett_prosent: number
  total_eks_mva: number
  total_inkl_mva: number
  kostnad_per_m2: number
}

// ---- Salgsverdi ----

export interface Salgsverdi {
  sammenlignbare_salg: SammenlignbartSalg[]
  estimert_per_m2: number
  estimert_total: number
  konfidensintervall: {
    lav: number
    hoy: number
  }
  markedsvurdering: string
}

export interface SammenlignbartSalg {
  adresse: string
  salgsdato: string
  pris: number
  bra_m2: number
  pris_per_m2: number
  avstand_km: number
}

// ---- Risikoanalyse ----

export interface Risikoanalyse {
  total_risiko: 'lav' | 'medium' | 'hoy'
  faktorer: Risikofaktor[]
  anbefalinger: string[]
}

export interface Risikofaktor {
  kategori: string
  beskrivelse: string
  sannsynlighet: 1 | 2 | 3 | 4 | 5
  konsekvens: 1 | 2 | 3 | 4 | 5
  risikoverdi: number
  tiltak: string
}

// ---- Tomtescore ----

export interface Tomtescore {
  total: number // 0-100
  delscorer: {
    beliggenhet: number
    regulering: number
    topografi: number
    infrastruktur: number
    marked: number
    okonomi: number
  }
  beregnet_dato: string
  forklaring: string
}

// ---- Media ----

export interface Visualisering {
  id: string
  type: 'situasjonsplan' | '3d_modell' | 'fasade' | 'snitt' | 'fugleperspektiv'
  url: string
  beskrivelse: string
  scenario_id?: string
}

export interface Dokument {
  id: string
  type: 'reguleringsplan' | 'grunnbok' | 'kart' | 'rapport' | 'annet'
  navn: string
  url: string
}

// ---- Brukere ----

export interface Bruker {
  id: string
  created_at: string
  email: string
  navn: string
  telefon?: string
  rolle: 'eier' | 'megler' | 'admin'
  firma?: string
  orgnr?: string
  profilbilde?: string
  onboarding_ferdig: boolean
}

export interface Megler extends Bruker {
  rolle: 'megler'
  meglerforetaknr: string
  antall_tomter: number
  abonnement: Abonnement
}

export interface Abonnement {
  type: 'fastpris' | 'provisjon'
  aktiv: boolean
  startdato: string
  tomter_inkludert?: number
  tomter_brukt?: number
}

// ---- Analyse ----

export interface AnalyseOppgave {
  id: string
  tomt_id: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  steg: AnalyseSteg[]
  startet: string
  ferdig?: string
  feilmelding?: string
}

export interface AnalyseSteg {
  navn: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  resultat?: unknown
  varighet_ms?: number
}

// ---- API Response ----

export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
}

// ---- Kart ----

export interface KartTomt {
  id: string
  slug: string
  adresse: string
  poststed: string
  senterpunkt: { lat: number; lng: number }
  areal_m2: number
  tomtescore: number
  status: TomtStatus
  pris?: number
  thumbnail?: string
}
