import React from 'react'
import {
  Document, Page, View, Text, Image, StyleSheet, Font,
} from '@react-pdf/renderer'
import type { SalgsoppgaveTomt } from '../salgsoppgave-data'

// Farger
const DARK = '#1a1a1a'
const GREEN = '#2d5a3d'
const GREEN_LIGHT = '#e8f0eb'
const GOLD = '#c4a35a'
const GREY = '#6b7280'
const LIGHT = '#f9fafb'
const WHITE = '#ffffff'
const BORDER = '#e5e7eb'

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: WHITE, color: DARK },

  // ─── Cover ───────────────────────────────────────────────────
  coverHero: { width: '100%', height: 340, objectFit: 'cover' },
  coverOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 340,
    backgroundColor: '#000000', opacity: 0.38,
  },
  coverHeader: {
    position: 'absolute', top: 24, left: 32, right: 32,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  coverBrand: { fontSize: 18, fontFamily: 'Helvetica-Bold', color: WHITE, letterSpacing: 1 },
  coverTagline: { fontSize: 8, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  coverMeta: { fontSize: 7, color: 'rgba(255,255,255,0.6)', textAlign: 'right' },
  coverBottom: { position: 'absolute', bottom: 24, left: 32, right: 32 },
  coverAddress: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: WHITE, marginBottom: 4 },
  coverSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 16 },
  coverPillRow: { flexDirection: 'row', gap: 8 },
  coverPill: {
    backgroundColor: GREEN, paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 4, marginRight: 6,
  },
  coverPillText: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: WHITE },

  // ─── Section header ──────────────────────────────────────────
  sectionHeader: {
    backgroundColor: GREEN, paddingHorizontal: 32, paddingVertical: 10,
    flexDirection: 'row', alignItems: 'center',
  },
  sectionHeaderText: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: WHITE },
  sectionHeaderNum: {
    fontSize: 9, color: GOLD, fontFamily: 'Helvetica-Bold',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, marginRight: 10,
  },

  // ─── Body ────────────────────────────────────────────────────
  body: { paddingHorizontal: 32, paddingVertical: 20 },
  mb4: { marginBottom: 4 },
  mb8: { marginBottom: 8 },
  mb16: { marginBottom: 16 },
  mb24: { marginBottom: 24 },

  // ─── Fakta-grid ──────────────────────────────────────────────
  faktaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  faktaBox: {
    width: '22%', backgroundColor: GREEN_LIGHT, borderRadius: 5,
    padding: 10, border: `1 solid ${BORDER}`,
  },
  faktaLabel: { fontSize: 7, color: GREEN, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginBottom: 3 },
  faktaVerdi: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: DARK },

  // ─── Fordeler ────────────────────────────────────────────────
  fordelerGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 20 },
  fordelerItem: {
    flexDirection: 'row', alignItems: 'flex-start',
    width: '48%',
  },
  fordelerBullet: { fontSize: 10, color: GREEN, fontFamily: 'Helvetica-Bold', marginRight: 5, marginTop: 1 },
  fordelerText: { fontSize: 9, color: DARK, flex: 1, lineHeight: 1.5 },

  // ─── Anbefaling ──────────────────────────────────────────────
  anbefalingBox: {
    backgroundColor: GREEN_LIGHT, borderLeft: `4 solid ${GREEN}`,
    padding: 14, borderRadius: 4, marginBottom: 20,
  },
  anbefalingText: { fontSize: 9.5, color: DARK, lineHeight: 1.6 },

  // ─── Husmodell-tabell ────────────────────────────────────────
  tableHeader: { flexDirection: 'row', backgroundColor: DARK, paddingVertical: 7, paddingHorizontal: 10 },
  tableHeaderCell: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: WHITE },
  tableRow: { flexDirection: 'row', paddingVertical: 7, paddingHorizontal: 10, borderBottom: `1 solid ${BORDER}` },
  tableRowAlt: { flexDirection: 'row', paddingVertical: 7, paddingHorizontal: 10, backgroundColor: LIGHT, borderBottom: `1 solid ${BORDER}` },
  tableCell: { fontSize: 9, color: DARK },
  colNavn: { width: '25%' },
  colLev: { width: '20%' },
  colBra: { width: '12%' },
  colBudsjett: { width: '22%' },
  colVerdi: { width: '21%' },

  // ─── Bildegrid ───────────────────────────────────────────────
  imageGrid: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  imageBox: { flex: 1, height: 160, backgroundColor: LIGHT, borderRadius: 4, overflow: 'hidden' },
  imageFull: { width: '100%', height: '100%', objectFit: 'cover' },

  // ─── Kontakt ─────────────────────────────────────────────────
  kontaktBox: {
    backgroundColor: GREEN, padding: 24, borderRadius: 6, marginBottom: 16,
  },
  kontaktNavn: { fontSize: 14, fontFamily: 'Helvetica-Bold', color: WHITE, marginBottom: 4 },
  kontaktTittel: { fontSize: 9, color: GOLD, marginBottom: 12 },
  kontaktRow: { flexDirection: 'row', gap: 24, marginBottom: 4 },
  kontaktLabel: { fontSize: 8, color: 'rgba(255,255,255,0.6)', marginBottom: 2 },
  kontaktVerdi: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: WHITE },
  omTomtly: { fontSize: 8.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginTop: 16, borderTop: '1 solid rgba(255,255,255,0.2)', paddingTop: 12 },

  // ─── Footer ──────────────────────────────────────────────────
  footer: {
    position: 'absolute', bottom: 14, left: 32, right: 32,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderTop: `1 solid ${BORDER}`, paddingTop: 8,
  },
  footerText: { fontSize: 7, color: GREY },

  // ─── Dokumenter ──────────────────────────────────────────────
  dokRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5, borderBottom: `1 solid ${BORDER}` },
  dokBullet: { fontSize: 8, color: GREEN, marginRight: 8 },
  dokText: { fontSize: 9, color: DARK },
  dokUrl: { fontSize: 7, color: GREY, marginLeft: 'auto' },
})

function Pill({ label }: { label: string }) {
  return (
    <View style={styles.coverPill}>
      <Text style={styles.coverPillText}>{label}</Text>
    </View>
  )
}

function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderNum}>{num}</Text>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  )
}

function Footer({ adresse, side }: { adresse: string; side: string }) {
  return (
    <View style={styles.footer} fixed>
      <Text style={styles.footerText}>Tomtly – {adresse}</Text>
      <Text style={styles.footerText}>hey@nops.no · 40603908 · tomtly.no</Text>
      <Text style={styles.footerText}>Side {side}</Text>
    </View>
  )
}

function fmt(n: number) {
  return 'kr ' + n.toLocaleString('nb-NO')
}

export function SalgsoppgavePDF({ tomt }: { tomt: SalgsoppgaveTomt }) {
  const dato = new Date().toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Document
      title={`Salgsoppgave – ${tomt.adresse}`}
      author="Tomtly (NOPS AS)"
      subject={`Boligtomt til salgs – ${tomt.adresse}, ${tomt.poststed}`}
      keywords="tomt, boligtomt, salg, tomtly"
    >
      {/* ═══ SIDE 1: FORSIDE ════════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        {/* Hero-bilde med overlay */}
        <Image src={tomt.heroImage} style={styles.coverHero} />
        <View style={styles.coverOverlay} />

        {/* Header */}
        <View style={styles.coverHeader}>
          <View>
            <Text style={styles.coverBrand}>TOMTLY</Text>
            <Text style={styles.coverTagline}>Tomteanalyse og salg</Text>
          </View>
          <Text style={styles.coverMeta}>{dato}</Text>
        </View>

        {/* Tittel og fakta */}
        <View style={styles.coverBottom}>
          <Text style={styles.coverAddress}>{tomt.adresse}</Text>
          <Text style={styles.coverSub}>{tomt.poststed}, {tomt.kommune} · {tomt.areal_m2.toLocaleString('nb-NO')} m² · {fmt(tomt.pris)}</Text>
          <View style={styles.coverPillRow}>
            <Pill label={`${tomt.areal_m2} m²`} />
            <Pill label={fmt(tomt.pris)} />
            <Pill label={`GNR ${tomt.gnr} / BNR ${tomt.bnr}`} />
          </View>
        </View>

        <Footer adresse={tomt.adresse} side="1" />
      </Page>

      {/* ═══ SIDE 2: NØKKELFAKTA + ANBEFALING ══════════════════════ */}
      <Page size="A4" style={styles.page}>
        <SectionHeader num="01" title="Om tomten" />
        <View style={styles.body}>
          {/* Nøkkelfakta */}
          <Text style={[styles.faktaLabel, styles.mb8]}>Nøkkelfakta</Text>
          <View style={styles.faktaGrid}>
            {tomt.nokkelFakta.map((f, i) => (
              <View key={i} style={styles.faktaBox}>
                <Text style={styles.faktaLabel}>{f.label}</Text>
                <Text style={styles.faktaVerdi}>{f.verdi}</Text>
              </View>
            ))}
          </View>

          {/* Anbefaling */}
          <Text style={[styles.faktaLabel, styles.mb8]}>Tomtekonsulentens anbefaling</Text>
          <View style={styles.anbefalingBox}>
            <Text style={styles.anbefalingText}>{tomt.anbefaling}</Text>
          </View>

          {/* Fordeler */}
          <Text style={[styles.faktaLabel, styles.mb8]}>Hvorfor denne tomten?</Text>
          <View style={styles.fordelerGrid}>
            {tomt.fordeler.map((f, i) => (
              <View key={i} style={styles.fordelerItem}>
                <Text style={styles.fordelerBullet}>✓</Text>
                <Text style={styles.fordelerText}>{f}</Text>
              </View>
            ))}
          </View>

          {/* Nabolag */}
          <Text style={[styles.faktaLabel, styles.mb8]}>Beliggenhet og nabolag</Text>
          <Text style={{ fontSize: 9.5, color: DARK, lineHeight: 1.6 }}>{tomt.nabolag}</Text>
        </View>
        <Footer adresse={tomt.adresse} side="2" />
      </Page>

      {/* ═══ SIDE 3: VISUALISERINGER ════════════════════════════════ */}
      {tomt.visualiseringer.length > 0 && (
        <Page size="A4" style={styles.page}>
          <SectionHeader num="02" title="Husmodeller visualisert på tomten" />
          <View style={[styles.body, { paddingTop: 16 }]}>
            <Text style={{ fontSize: 9, color: GREY, marginBottom: 14, lineHeight: 1.5 }}>
              Bildene nedenfor er KI-genererte illustrasjoner som viser eksempler på hvordan utvalgte husmodeller kan se ut plassert på tomten. De er ment som illustrasjoner – endelig utseende avhenger av valgt husmodell og prosjektering.
            </Text>
            <View style={styles.imageGrid}>
              {tomt.visualiseringer.slice(0, 3).map((url, i) => (
                <View key={i} style={styles.imageBox}>
                  <Image src={url} style={styles.imageFull} />
                </View>
              ))}
            </View>
          </View>
          <Footer adresse={tomt.adresse} side="3" />
        </Page>
      )}

      {/* ═══ SIDE 4: HUSMODELLER ════════════════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <SectionHeader num="03" title={`Analyserte husmodeller (topp ${tomt.topHusmodeller.length})`} />
        <View style={[styles.body, { paddingTop: 14 }]}>
          <Text style={{ fontSize: 9, color: GREY, marginBottom: 14, lineHeight: 1.5 }}>
            Tomtly har analysert {tomt.slug === 'myllavegen-58' ? '12' : '34'} husmodeller fra ulike leverandører og beregnet fullstendig totalbudsjett inkl. tomt, dokumentavgift, grunnarbeider, kommunale gebyrer og mer. Tabellen under viser et utvalg.
          </Text>

          {/* Tabell */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colNavn]}>Husmodell</Text>
            <Text style={[styles.tableHeaderCell, styles.colLev]}>Leverandør</Text>
            <Text style={[styles.tableHeaderCell, styles.colBra]}>BRA m²</Text>
            <Text style={[styles.tableHeaderCell, styles.colBudsjett]}>Totalbudsjett</Text>
            <Text style={[styles.tableHeaderCell, styles.colVerdi]}>Est. boligverdi</Text>
          </View>
          {tomt.topHusmodeller.map((m, i) => (
            <View key={i} style={i % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
              <Text style={[styles.tableCell, styles.colNavn, { fontFamily: 'Helvetica-Bold' }]}>{m.navn}{!m.grunnmur_inkludert ? ' *' : ''}</Text>
              <Text style={[styles.tableCell, styles.colLev]}>{m.leverandor}</Text>
              <Text style={[styles.tableCell, styles.colBra]}>{m.bra_m2}</Text>
              <Text style={[styles.tableCell, styles.colBudsjett]}>{fmt(m.total_budsjett)}</Text>
              <Text style={[styles.tableCell, styles.colVerdi]}>{fmt(m.verdi_total)}</Text>
            </View>
          ))}
          <Text style={{ fontSize: 7.5, color: GREY, marginTop: 8 }}>
            * Grunnmur ikke inkludert i husmodellpris – legg til estimat kr 200 000–300 000.{'\n'}
            Totalbudsjett inkl. tomt, dokumentavgift, frakt, grunnarbeider, kommunale gebyrer og tilkoblingsavgifter. Alle priser inkl. mva. Kilde: Tomtly, mai 2026.
          </Text>

          {/* Regulering */}
          <View style={{ marginTop: 24, backgroundColor: GREEN_LIGHT, padding: 14, borderRadius: 5 }}>
            <Text style={[styles.faktaLabel, { marginBottom: 8 }]}>Reguleringsbestemmelser</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
              {[
                { l: 'Plan', v: tomt.regulering.plannavn },
                { l: 'Maks BYA', v: `${tomt.regulering.bya_prosent}%` },
                { l: 'Maks høyde', v: `${tomt.regulering.maks_hoyde_m} m` },
                { l: 'Maks etasjer', v: `${tomt.regulering.maks_etasjer}` },
              ].map((r, i) => (
                <View key={i} style={{ marginRight: 16 }}>
                  <Text style={{ fontSize: 7.5, color: GREY }}>{r.l}</Text>
                  <Text style={{ fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: DARK }}>{r.v}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <Footer adresse={tomt.adresse} side="4" />
      </Page>

      {/* ═══ SIDE 5: DOKUMENTER + KONTAKT ══════════════════════════ */}
      <Page size="A4" style={styles.page}>
        <SectionHeader num="04" title="Dokumenter og kontakt" />
        <View style={styles.body}>
          {/* Dokumenter */}
          <Text style={[styles.faktaLabel, styles.mb8]}>Tilgjengelig dokumentasjon</Text>
          <View style={{ marginBottom: 24 }}>
            {tomt.dokumenter.map((d, i) => (
              <View key={i} style={styles.dokRow}>
                <Text style={styles.dokBullet}>›</Text>
                <Text style={styles.dokText}>{d.navn}</Text>
                <Text style={styles.dokUrl}>{d.url}</Text>
              </View>
            ))}
          </View>

          {/* Kontakt */}
          <View style={styles.kontaktBox}>
            <Text style={styles.kontaktNavn}>Jakob Bjøndal</Text>
            <Text style={styles.kontaktTittel}>Tomtekonsulent · Tomtly (NOPS AS)</Text>
            <View style={styles.kontaktRow}>
              <View>
                <Text style={styles.kontaktLabel}>Telefon</Text>
                <Text style={styles.kontaktVerdi}>40 60 39 08</Text>
              </View>
              <View>
                <Text style={styles.kontaktLabel}>E-post</Text>
                <Text style={styles.kontaktVerdi}>hey@nops.no</Text>
              </View>
              <View>
                <Text style={styles.kontaktLabel}>Nettside</Text>
                <Text style={styles.kontaktVerdi}>tomtly.no</Text>
              </View>
            </View>
            <Text style={styles.omTomtly}>
              Tomtly er en analyseplattform og markedsføringskanal for tomtesalg. Vi viser kjøpere hva som kan bygges på tomten ved hjelp av husmodeller fra alle de store husleverandørene, komplett kostnadsanalyse og digitale verktøy. Tomteeier selger selv – Tomtly bistår med analyse, markedsføring og oppgjør via samarbeidspartner Proff Oppgjør AS.{'\n\n'}
              NOPS AS · Org.nr. 933 819 086 · Salgsoppgaven er utarbeidet av Tomtly som markedsføringskanal. Alle priser er estimater og kan avvike. Interessenter oppfordres til å foreta egne undersøkelser.
            </Text>
          </View>

          {/* Tomtly-logo-tekst */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
            <Text style={{ fontSize: 20, fontFamily: 'Helvetica-Bold', color: GREEN, letterSpacing: 2 }}>TOMTLY</Text>
          </View>
          <Text style={{ fontSize: 8, color: GREY, textAlign: 'center', marginTop: 4 }}>tomtly.no · hey@nops.no · 40 60 39 08</Text>
        </View>
        <Footer adresse={tomt.adresse} side="5" />
      </Page>
    </Document>
  )
}
