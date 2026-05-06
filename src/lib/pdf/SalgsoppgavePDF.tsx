import React from 'react'
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer'
import type { SalgsoppgaveTomt, HusmodellPDF } from '../salgsoppgave-data'

const GREEN = '#2d5a3d'
const GREEN2 = '#3a7a52'
const GREEN_LIGHT = '#e8f0eb'
const DARK = '#1a1a1a'
const GREY = '#6b7280'
const LIGHT = '#f9fafb'
const WHITE = '#ffffff'
const BORDER = '#e5e7eb'
const GOLD = '#c4a35a'
const AMBER = '#fef3c7'
const AMBER_BORDER = '#d97706'

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: WHITE, color: DARK },

  // ─── Forside ──────────────────────────────────────────────────────
  heroImg: { width: '100%', height: 240, objectFit: 'cover' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, height: 240, backgroundColor: '#000', opacity: 0.35 },
  heroBar: { position: 'absolute', top: 20, left: 28, right: 28, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  heroBrand: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: WHITE, letterSpacing: 1.5 },
  heroTagline: { fontSize: 7.5, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  heroDato: { fontSize: 7.5, color: 'rgba(255,255,255,0.6)' },
  heroBottom: { position: 'absolute', bottom: 18, left: 28, right: 28 },
  heroAdresse: { fontSize: 26, fontFamily: 'Helvetica-Bold', color: WHITE, marginBottom: 4 },
  heroSted: { fontSize: 12, color: 'rgba(255,255,255,0.85)', marginBottom: 12 },
  heroPills: { flexDirection: 'row' },
  pill: { backgroundColor: GREEN, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4, marginRight: 6 },
  pillTxt: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: WHITE },

  // Bildestribe under hero
  imgStripe: { flexDirection: 'row', height: 110 },
  stripeImg: { flex: 1, objectFit: 'cover' },

  // Nøkkelfakta-boks på forsiden
  faktaStripe: { backgroundColor: GREEN, paddingHorizontal: 24, paddingVertical: 14, flexDirection: 'row', flexWrap: 'wrap', gap: 0 },
  faktaItem: { width: '25%', paddingHorizontal: 8, paddingVertical: 4 },
  faktaLabel: { fontSize: 6.5, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', marginBottom: 2 },
  faktaVerdi: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: WHITE },

  // Anbefalingsboks forside
  anbefalingStripe: { backgroundColor: LIGHT, borderLeft: `4 solid ${GOLD}`, marginHorizontal: 24, marginTop: 16, padding: 14, borderRadius: 4 },
  anbefalingTxt: { fontSize: 9.5, color: DARK, lineHeight: 1.6 },

  // ─── Seksjonshode ─────────────────────────────────────────────────
  secHead: { backgroundColor: DARK, paddingHorizontal: 28, paddingVertical: 9, flexDirection: 'row', alignItems: 'center' },
  secNum: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: GOLD, backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 3, marginRight: 10 },
  secTittel: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: WHITE },

  // ─── Body ──────────────────────────────────────────────────────────
  body: { paddingHorizontal: 28, paddingVertical: 18 },
  leder: { fontSize: 9.5, color: DARK, lineHeight: 1.65, marginBottom: 16 },
  overskrift: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: GREEN, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 },

  // Fakta-grid (side 2)
  faktaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 18 },
  faktaBoks: { width: '22.5%', backgroundColor: GREEN_LIGHT, borderRadius: 4, padding: 9, border: `1 solid ${BORDER}` },
  faktaBoksLabel: { fontSize: 6.5, color: GREEN, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginBottom: 3 },
  faktaBoksVerdi: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: DARK },

  // Fordeler
  fordelerGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 5, marginBottom: 18 },
  fordelerItem: { flexDirection: 'row', alignItems: 'flex-start', width: '48%' },
  fordelerBullet: { fontSize: 10, color: GREEN, fontFamily: 'Helvetica-Bold', marginRight: 5, marginTop: 1 },
  fordelerTxt: { fontSize: 8.5, color: DARK, flex: 1, lineHeight: 1.5 },

  // Regulering boks
  regBoks: { backgroundColor: GREEN_LIGHT, padding: 12, borderRadius: 4, marginBottom: 14 },
  regGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 },
  regItem: { marginRight: 12 },
  regLabel: { fontSize: 7, color: GREY },
  regVerdi: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: DARK },

  // ─── Visualiseringsgalleri ─────────────────────────────────────────
  galleriRad: { flexDirection: 'row', gap: 6, marginBottom: 6 },
  galleriItem: { flex: 1, position: 'relative' },
  galleriImg: { width: '100%', height: 110, objectFit: 'cover', borderRadius: 3 },
  galleriLabel: { fontSize: 6.5, color: WHITE, fontFamily: 'Helvetica-Bold', backgroundColor: 'rgba(0,0,0,0.55)', paddingHorizontal: 5, paddingVertical: 2, position: 'absolute', bottom: 0, left: 0, right: 0, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 },

  // ─── Husmodelltabell ────────────────────────────────────────────────
  thead: { flexDirection: 'row', backgroundColor: DARK, paddingVertical: 6, paddingHorizontal: 8 },
  theadCell: { fontSize: 6.5, fontFamily: 'Helvetica-Bold', color: WHITE },
  trow: { flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 8, borderBottom: `1 solid ${BORDER}` },
  trowAlt: { flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 8, backgroundColor: LIGHT, borderBottom: `1 solid ${BORDER}` },
  tcell: { fontSize: 7.5, color: DARK },
  cNavn: { width: '16%' },
  cLev: { width: '13%' },
  cBra: { width: '8%' },
  cBya: { width: '8%' },
  cBud: { width: '16%' },
  cVerdi: { width: '16%' },
  cSov: { width: '7%' },
  cBad: { width: '9%' },
  cHybel: { width: '7%' },

  // Märke: grunnmur ikke inkl.
  merkBoks: { backgroundColor: AMBER, border: `1 solid ${AMBER_BORDER}`, borderRadius: 3, padding: 8, marginTop: 8 },
  merkTxt: { fontSize: 7.5, color: '#92400e' },

  // ─── Kontakt ──────────────────────────────────────────────────────
  kontaktBoks: { backgroundColor: GREEN, padding: 22, borderRadius: 6, marginBottom: 14 },
  kontaktNavn: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: WHITE, marginBottom: 3 },
  kontaktTittel: { fontSize: 8.5, color: GOLD, marginBottom: 12 },
  kontaktRad: { flexDirection: 'row', gap: 28, marginBottom: 3 },
  kLabel: { fontSize: 7.5, color: 'rgba(255,255,255,0.55)', marginBottom: 2 },
  kVerdi: { fontSize: 10.5, fontFamily: 'Helvetica-Bold', color: WHITE },
  omTomtly: { fontSize: 8, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginTop: 14, borderTop: '1 solid rgba(255,255,255,0.2)', paddingTop: 10 },

  // Dokumenter
  dokRad: { flexDirection: 'row', alignItems: 'center', paddingVertical: 5, borderBottom: `1 solid ${BORDER}` },
  dokBullet: { fontSize: 8, color: GREEN, marginRight: 7, fontFamily: 'Helvetica-Bold' },
  dokTxt: { fontSize: 8.5, color: DARK },
  dokUrl: { fontSize: 6.5, color: GREY, marginLeft: 'auto' },

  // ─── Footer ──────────────────────────────────────────────────────
  footer: { position: 'absolute', bottom: 12, left: 28, right: 28, flexDirection: 'row', justifyContent: 'space-between', borderTop: `1 solid ${BORDER}`, paddingTop: 6 },
  footerTxt: { fontSize: 6.5, color: GREY },
})

function Pill({ label }: { label: string }) {
  return <View style={s.pill}><Text style={s.pillTxt}>{label}</Text></View>
}
function SecHead({ num, title }: { num: string; title: string }) {
  return <View style={s.secHead}><Text style={s.secNum}>{num}</Text><Text style={s.secTittel}>{title}</Text></View>
}
function Footer({ adresse, side }: { adresse: string; side: string }) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerTxt}>Tomtly · {adresse}</Text>
      <Text style={s.footerTxt}>hey@nops.no · 40 60 39 08 · tomtly.no</Text>
      <Text style={s.footerTxt}>Side {side}</Text>
    </View>
  )
}
function fmt(n: number) { return 'kr ' + n.toLocaleString('nb-NO') }
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export function SalgsoppgavePDF({ tomt }: { tomt: SalgsoppgaveTomt }) {
  const dato = new Date().toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })
  const vis3 = tomt.visualiseringer.slice(0, 3)
  const visRest = tomt.visualiseringer.slice(3)
  const alleVis = tomt.visualiseringer
  const visRader = chunk(alleVis, 3)
  const husRader = chunk(tomt.husmodeller, 15) // maks 15 per side

  return (
    <Document title={`Salgsoppgave – ${tomt.adresse}`} author="Tomtly (NOPS AS)" subject={`Boligtomt til salgs – ${tomt.adresse}, ${tomt.poststed}`}>

      {/* ══════════════════ SIDE 1: FORSIDE ══════════════════════════ */}
      <Page size="A4" style={s.page}>
        {/* Hero */}
        <Image src={tomt.heroImage} style={s.heroImg} />
        <View style={s.heroOverlay} />
        <View style={s.heroBar}>
          <View><Text style={s.heroBrand}>TOMTLY</Text><Text style={s.heroTagline}>Tomteanalyse og salg</Text></View>
          <Text style={s.heroDato}>{dato}</Text>
        </View>
        <View style={s.heroBottom}>
          <Text style={s.heroAdresse}>{tomt.adresse}</Text>
          <Text style={s.heroSted}>{tomt.poststed}, {tomt.kommune}</Text>
          <View style={s.heroPills}>
            <Pill label={`${tomt.areal_m2} m²`} />
            <Pill label={fmt(tomt.pris)} />
            <Pill label={`GNR ${tomt.gnr} / BNR ${tomt.bnr}`} />
          </View>
        </View>

        {/* Bildestribe – 3 visualiseringer under hero */}
        {vis3.length > 0 && (
          <View style={s.imgStripe}>
            {vis3.map((v, i) => <Image key={i} src={v.url} style={s.stripeImg} />)}
          </View>
        )}

        {/* Nøkkelfakta-stripe */}
        <View style={s.faktaStripe}>
          {tomt.nokkelFakta.slice(0, 8).map((f, i) => (
            <View key={i} style={s.faktaItem}>
              <Text style={s.faktaLabel}>{f.label}</Text>
              <Text style={s.faktaVerdi}>{f.verdi}</Text>
            </View>
          ))}
        </View>

        {/* Anbefaling */}
        <View style={s.anbefalingStripe}>
          <Text style={[s.overskrift, { marginBottom: 5 }]}>Tomtekonsulentens anbefaling</Text>
          <Text style={s.anbefalingTxt}>{tomt.anbefaling}</Text>
        </View>

        <Footer adresse={tomt.adresse} side="1" />
      </Page>

      {/* ══════════════════ SIDE 2: OM TOMTEN ════════════════════════ */}
      <Page size="A4" style={s.page}>
        <SecHead num="01" title="Om tomten" />
        <View style={s.body}>
          <Text style={s.leder}>{tomt.detaljertBeskrivelse}</Text>

          <Text style={s.overskrift}>Nøkkelfakta</Text>
          <View style={s.faktaGrid}>
            {tomt.nokkelFakta.map((f, i) => (
              <View key={i} style={s.faktaBoks}>
                <Text style={s.faktaBoksLabel}>{f.label}</Text>
                <Text style={s.faktaBoksVerdi}>{f.verdi}</Text>
              </View>
            ))}
          </View>

          <Text style={s.overskrift}>Fordeler og muligheter</Text>
          <View style={s.fordelerGrid}>
            {tomt.fordeler.map((f, i) => (
              <View key={i} style={s.fordelerItem}>
                <Text style={s.fordelerBullet}>✓</Text>
                <Text style={s.fordelerTxt}>{f}</Text>
              </View>
            ))}
          </View>

          <Text style={s.overskrift}>Reguleringsbestemmelser</Text>
          <View style={s.regBoks}>
            <Text style={{ fontSize: 8.5, color: DARK, lineHeight: 1.55 }}>{tomt.regulering.beskrivelse}</Text>
            <View style={s.regGrid}>
              {[
                { l: 'Plan', v: tomt.regulering.plannavn },
                { l: 'Maks BYA', v: `${tomt.regulering.bya_prosent}%` },
                { l: 'Maks gesimshøyde', v: `${tomt.regulering.maks_hoyde_m} m` },
                { l: 'Maks etasjer', v: `${tomt.regulering.maks_etasjer}` },
              ].map((r, i) => (
                <View key={i} style={s.regItem}>
                  <Text style={s.regLabel}>{r.l}</Text>
                  <Text style={s.regVerdi}>{r.v}</Text>
                </View>
              ))}
            </View>
          </View>

          <Text style={s.overskrift}>Beliggenhet og nabolag</Text>
          <Text style={{ fontSize: 9, color: DARK, lineHeight: 1.6 }}>{tomt.nabolag}</Text>
        </View>
        <Footer adresse={tomt.adresse} side="2" />
      </Page>

      {/* ══════════════════ SIDE 3+: VISUALISERINGER ════════════════ */}
      <Page size="A4" style={s.page}>
        <SecHead num="02" title={`Alle ${alleVis.length} husmodeller visualisert på tomten`} />
        <View style={[s.body, { paddingTop: 14 }]}>
          <Text style={{ fontSize: 8.5, color: GREY, marginBottom: 12, lineHeight: 1.5 }}>
            KI-genererte illustrasjoner som viser utvalgte husmodeller plassert på den faktiske tomten. Bildene er ment som illustrasjoner – endelig utseende avhenger av valgt husmodell og prosjektering.
          </Text>
          {visRader.map((rad, ri) => (
            <View key={ri} style={s.galleriRad}>
              {rad.map((v, vi) => (
                <View key={vi} style={s.galleriItem}>
                  <Image src={v.url} style={s.galleriImg} />
                  <Text style={s.galleriLabel}>{v.navn}</Text>
                </View>
              ))}
              {/* Fyll tomme plasser */}
              {rad.length < 3 && Array(3 - rad.length).fill(0).map((_, k) => <View key={k} style={s.galleriItem} />)}
            </View>
          ))}
        </View>
        <Footer adresse={tomt.adresse} side="3" />
      </Page>

      {/* ══════════════════ SIDE 4+: HUSMODELLER ════════════════════ */}
      {husRader.map((rader, pageIdx) => (
        <Page key={pageIdx} size="A4" style={s.page}>
          <SecHead num={`0${3 + pageIdx + 1}`} title={`Analyserte husmodeller${husRader.length > 1 ? ` (${pageIdx + 1}/${husRader.length})` : ''}`} />
          <View style={[s.body, { paddingTop: 12 }]}>
            {pageIdx === 0 && (
              <Text style={{ fontSize: 8.5, color: GREY, marginBottom: 10, lineHeight: 1.5 }}>
                Totalbudsjett inkl. tomt, dokumentavgift, grunnarbeider, frakt, kommunale gebyrer og tilkoblingsavgifter (alle estimater inkl. mva). Boligverdi beregnet ut fra estimert markedspris per m² BRA. * = Grunnmur ikke inkl. i husmodellpris.
              </Text>
            )}
            {/* Tabell */}
            <View style={s.thead}>
              <Text style={[s.theadCell, s.cNavn]}>Husmodell</Text>
              <Text style={[s.theadCell, s.cLev]}>Leverandør</Text>
              <Text style={[s.theadCell, s.cBra]}>BRA m²</Text>
              <Text style={[s.theadCell, s.cBya]}>BYA m²</Text>
              <Text style={[s.theadCell, s.cBud]}>Totalbudsjett</Text>
              <Text style={[s.theadCell, s.cVerdi]}>Est. boligverdi</Text>
              <Text style={[s.theadCell, s.cSov]}>Sov</Text>
              <Text style={[s.theadCell, s.cBad]}>Bad</Text>
              <Text style={[s.theadCell, s.cHybel]}>Hybel</Text>
            </View>
            {rader.map((m: HusmodellPDF, i: number) => {
              const profitt = m.verdi_total - m.total_budsjett
              const Row = i % 2 === 0 ? s.trow : s.trowAlt
              return (
                <View key={i} style={Row}>
                  <Text style={[s.tcell, s.cNavn, { fontFamily: 'Helvetica-Bold' }]}>{m.navn}{!m.grunnmur_inkludert ? ' *' : ''}</Text>
                  <Text style={[s.tcell, s.cLev]}>{m.leverandor}</Text>
                  <Text style={[s.tcell, s.cBra]}>{m.bra_m2}</Text>
                  <Text style={[s.tcell, s.cBya]}>{m.bya_m2}</Text>
                  <Text style={[s.tcell, s.cBud]}>{fmt(m.total_budsjett)}</Text>
                  <Text style={[s.tcell, s.cVerdi, { color: profitt > 0 ? GREEN2 : DARK }]}>{fmt(m.verdi_total)}</Text>
                  <Text style={[s.tcell, s.cSov]}>{m.soverom}</Text>
                  <Text style={[s.tcell, s.cBad]}>{m.bad}</Text>
                  <Text style={[s.tcell, s.cHybel]}>{m.hybel ? 'Ja' : '–'}</Text>
                </View>
              )
            })}
            {pageIdx === husRader.length - 1 && (
              <View style={s.merkBoks}>
                <Text style={s.merkTxt}>
                  * Grunnmur / fundamentering ikke inkludert i husmodellprisen. Legg til estimat kr 200 000–300 000 (betongplate/ringmur) eller kr 500 000–700 000 (kjellermur). Tomtly anbefaler å innhente tilbud fra lokalt grunnentreprenør.{'\n'}
                  Boligverdi beregnet på grunnlag av estimert salgspris for nye boliger i området. Priser pr. mai 2026. Alle beløp er estimater og kan avvike fra faktiske kostnader.
                </Text>
              </View>
            )}
          </View>
          <Footer adresse={tomt.adresse} side={`${3 + pageIdx + 1}`} />
        </Page>
      ))}

      {/* ══════════════════ SISTE SIDE: DOKUMENTER + KONTAKT ════════ */}
      <Page size="A4" style={s.page}>
        <SecHead num="05" title="Dokumenter og kontakt" />
        <View style={s.body}>
          <Text style={[s.overskrift, { marginBottom: 8 }]}>Tilgjengelig dokumentasjon</Text>
          <View style={{ marginBottom: 22 }}>
            {tomt.dokumenter.map((d, i) => (
              <View key={i} style={s.dokRad}>
                <Text style={s.dokBullet}>›</Text>
                <Text style={s.dokTxt}>{d.navn}</Text>
                <Text style={s.dokUrl}>{d.url}</Text>
              </View>
            ))}
          </View>

          <View style={s.kontaktBoks}>
            <Text style={s.kontaktNavn}>Jakob Bjøndal</Text>
            <Text style={s.kontaktTittel}>Tomtekonsulent · Tomtly (NOPS AS)</Text>
            <View style={s.kontaktRad}>
              <View><Text style={s.kLabel}>Telefon</Text><Text style={s.kVerdi}>40 60 39 08</Text></View>
              <View><Text style={s.kLabel}>E-post</Text><Text style={s.kVerdi}>hey@nops.no</Text></View>
              <View><Text style={s.kLabel}>Nettside</Text><Text style={s.kVerdi}>tomtly.no</Text></View>
            </View>
            <Text style={s.omTomtly}>
              Tomtly er en analyseplattform og markedsføringskanal for tomtesalg. Vi viser kjøpere hva som kan bygges på tomten ved hjelp av husmodeller fra alle de store husleverandørene, komplett kostnadsanalyse og digitale verktøy. Tomteeier selger selv – Tomtly bistår med analyse, markedsføring og salgsoppgjør via samarbeidspartner Proff Oppgjør AS.{'\n\n'}
              NOPS AS · Org.nr. 933 819 086 · Denne salgsoppgaven er utarbeidet av Tomtly som markedsføringskanal og informasjonsdokument. Alle priser er estimater. Interessenter oppfordres til å foreta egne undersøkelser og innhente tilbud.
            </Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 22, fontFamily: 'Helvetica-Bold', color: GREEN, letterSpacing: 2 }}>TOMTLY</Text>
          </View>
          <Text style={{ fontSize: 7.5, color: GREY, textAlign: 'center', marginTop: 4 }}>
            tomtly.no · hey@nops.no · 40 60 39 08
          </Text>
        </View>
        <Footer adresse={tomt.adresse} side="siste" />
      </Page>
    </Document>
  )
}
