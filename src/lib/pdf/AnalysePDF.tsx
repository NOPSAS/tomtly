import React from 'react'
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'

// ─── Design tokens ──────────────────────────────────────────────────────────
const G = '#2d5a3d'   // tomtly-accent
const G2 = '#1e3d2a'  // darker green
const G3 = '#e8f0eb'  // light green
const DARK = '#1a1a1a'
const GREY = '#6b7280'
const LGREY = '#9ca3af'
const BORDER = '#e5e7eb'
const WHITE = '#ffffff'
const LIGHT = '#f9fafb'
const GOLD = '#c4a35a'
const POS_BG = '#052e16'
const POS_BD = '#166534'
const ADV_BG = '#431407'
const ADV_BD = '#92400e'
const KRI_BG = '#450a0a'
const KRI_BD = '#991b1b'

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: WHITE, color: DARK },

  // ─── Forside ──────────────────────────────────────────────────────────────
  coverBg: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: G2 },
  coverPattern: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    opacity: 0.06,
  },
  coverContent: { flex: 1, padding: 48, justifyContent: 'space-between' },
  coverTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  coverBrand: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: WHITE, letterSpacing: 2 },
  coverTagline: { fontSize: 8, color: 'rgba(255,255,255,0.55)', marginTop: 3 },
  coverDato: { fontSize: 8, color: 'rgba(255,255,255,0.45)', textAlign: 'right' },
  coverMid: { flex: 1, justifyContent: 'center', paddingVertical: 40 },
  coverBadge: {
    backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 5, alignSelf: 'flex-start', marginBottom: 20,
  },
  coverBadgeTxt: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: GOLD, letterSpacing: 1, textTransform: 'uppercase' },
  coverAdresse: { fontSize: 32, fontFamily: 'Helvetica-Bold', color: WHITE, marginBottom: 8, lineHeight: 1.2 },
  coverSted: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 28 },
  coverPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 0 },
  pill: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 4, paddingHorizontal: 12, paddingVertical: 6, marginRight: 8, marginBottom: 6 },
  pillTxt: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: WHITE },
  coverDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 24 },
  coverBot: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  coverAnsvarsfraskrivelse: { fontSize: 7, color: 'rgba(255,255,255,0.35)', flex: 1, lineHeight: 1.5 },
  coverContact: { textAlign: 'right' },
  coverContactTxt: { fontSize: 8, color: 'rgba(255,255,255,0.6)', marginBottom: 2 },
  coverContactVal: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: WHITE },

  // ─── Seksjons­hode ────────────────────────────────────────────────────────
  secWrap: { marginBottom: 0 },
  secBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: DARK, paddingHorizontal: 28, paddingVertical: 8 },
  secNum: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: GOLD, backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 3, marginRight: 8 },
  secTittel: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: WHITE },

  // ─── Body ─────────────────────────────────────────────────────────────────
  body: { paddingHorizontal: 28, paddingTop: 18, paddingBottom: 10 },
  ingress: { fontSize: 10, color: DARK, lineHeight: 1.7, marginBottom: 16, fontFamily: 'Helvetica' },

  // ─── Nøkkeltall-strip ─────────────────────────────────────────────────────
  nGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 16 },
  nBox: { width: '22.5%', backgroundColor: G3, borderRadius: 5, padding: 9, border: `1 solid ${BORDER}` },
  nLabel: { fontSize: 6.5, color: G, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', marginBottom: 3 },
  nVal: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: DARK },
  nSub: { fontSize: 6.5, color: GREY, marginTop: 2 },

  // ─── Funn-kort ────────────────────────────────────────────────────────────
  funnGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 16 },
  funnKort: { width: '47.5%', borderRadius: 8, padding: 11, marginBottom: 0 },
  funnPosKort: { backgroundColor: POS_BG, border: `1 solid ${POS_BD}` },
  funnAdvKort: { backgroundColor: ADV_BG, border: `1 solid ${ADV_BD}` },
  funnKriKort: { backgroundColor: KRI_BG, border: `1 solid ${KRI_BD}` },
  funnHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 6, marginBottom: 5 },
  funnIkon: { fontSize: 11, marginTop: 1 },
  funnTittel: { fontSize: 9, fontFamily: 'Helvetica-Bold', flex: 1, lineHeight: 1.4 },
  funnPosTittel: { color: '#86efac' },
  funnAdvTittel: { color: '#fde68a' },
  funnKriTittel: { color: '#fca5a5' },
  funnForklaring: { fontSize: 8, lineHeight: 1.55, marginLeft: 17 },
  funnPosForklaring: { color: '#bbf7d0' },
  funnAdvForklaring: { color: '#fed7aa' },
  funnKriForklaring: { color: '#fecaca' },

  // ─── DOK ──────────────────────────────────────────────────────────────────
  dokBoks: { borderRadius: 6, padding: 12, marginBottom: 14 },
  dokGrønn: { backgroundColor: '#052e16', border: `1 solid ${POS_BD}` },
  dokGul: { backgroundColor: ADV_BG, border: `1 solid ${ADV_BD}` },
  dokTittel: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', marginBottom: 5 },
  dokGrønnTittel: { color: '#86efac' },
  dokGulTittel: { color: '#fde68a' },
  dokTekst: { fontSize: 8, lineHeight: 1.55 },
  dokGrønnTekst: { color: '#bbf7d0' },
  dokGulTekst: { color: '#fed7aa' },
  dokListe: { marginTop: 5 },
  dokItem: { fontSize: 7.5, color: '#fed7aa', marginBottom: 2 },

  // ─── Kommuneplan ──────────────────────────────────────────────────────────
  kpBoks: { backgroundColor: LIGHT, border: `1 solid ${BORDER}`, borderRadius: 6, padding: 14, marginBottom: 14 },
  kpTittelRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  kpDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: G },
  kpTittel: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: G },
  kpTekst: { fontSize: 8.5, color: DARK, lineHeight: 1.65, marginBottom: 10 },
  kpNøkler: { flexDirection: 'row', flexWrap: 'wrap', gap: 5 },
  kpNøkkel: { backgroundColor: G3, border: `1 solid ${BORDER}`, borderRadius: 3, paddingHorizontal: 8, paddingVertical: 4 },
  kpNøkkelTxt: { fontSize: 7.5, color: DARK },
  kpUnderSeksjon: { marginTop: 10, paddingTop: 10, borderTop: `1 solid ${BORDER}` },
  kpUnderTittel: { fontSize: 7.5, fontFamily: 'Helvetica-Bold', color: G, textTransform: 'uppercase', marginBottom: 4 },
  kpUnderTekst: { fontSize: 8, color: GREY, lineHeight: 1.55 },

  // ─── Reguleringsbestemmelser ───────────────────────────────────────────────
  regBoks: { backgroundColor: '#0f172a', border: `1 solid #1e293b`, borderRadius: 6, padding: 12, marginBottom: 14 },
  regTittel: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6 },
  regSammendrag: { fontSize: 8.5, color: '#e2e8f0', lineHeight: 1.6, marginBottom: 10 },
  regGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 8 },
  regBoks2: { backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 4, paddingHorizontal: 9, paddingVertical: 6 },
  regLabel: { fontSize: 6.5, color: '#64748b' },
  regVal: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: WHITE },
  regBestLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: '#94a3b8', marginBottom: 4 },
  regBestItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 5, marginBottom: 3 },
  regBestBullet: { fontSize: 8, color: G, marginTop: 0.5 },
  regBestTxt: { fontSize: 7.5, color: '#cbd5e1', flex: 1, lineHeight: 1.45 },

  // ─── CTA ──────────────────────────────────────────────────────────────────
  ctaBoks: { backgroundColor: G, borderRadius: 8, padding: 16, marginTop: 10 },
  ctaTittel: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: WHITE, marginBottom: 4 },
  ctaTekst: { fontSize: 8.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 12 },
  ctaRow: { flexDirection: 'row', gap: 16 },
  ctaItem: {},
  ctaLabel: { fontSize: 7, color: 'rgba(255,255,255,0.55)', marginBottom: 1 },
  ctaVal: { fontSize: 9.5, fontFamily: 'Helvetica-Bold', color: WHITE },
  ctaPris: {
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 4,
    paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start', marginTop: 10,
  },
  ctaPrisTxt: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: WHITE },

  // ─── Footer ───────────────────────────────────────────────────────────────
  footer: {
    position: 'absolute', bottom: 14, left: 28, right: 28,
    flexDirection: 'row', justifyContent: 'space-between', borderTop: `1 solid ${BORDER}`, paddingTop: 7,
  },
  footerTxt: { fontSize: 6.5, color: LGREY },
})

function SecBar({ num, title }: { num: string; title: string }) {
  return (
    <View style={s.secBar}>
      <Text style={s.secNum}>{num}</Text>
      <Text style={s.secTittel}>{title}</Text>
    </View>
  )
}

function Footer({ adresse }: { adresse: string }) {
  return (
    <View style={s.footer} fixed>
      <Text style={s.footerTxt}>Tomtly – Tomteanalyse · {adresse}</Text>
      <Text style={s.footerTxt}>KI-generert analyse · tomtly.no</Text>
      <Text style={s.footerTxt} render={({ pageNumber, totalPages }) => `Side ${pageNumber} av ${totalPages}`} />
    </View>
  )
}

export interface AnalysePDFData {
  adresse: string
  kommunenavn: string
  kommunenummer: string
  dato: string
  areal_m2?: number
  bya_prosent?: number
  gesims_m?: number
  mone_m?: number
  maks_etasjer?: number
  gnr?: number
  bnr?: number
  ai_ingress?: string
  ai_funn?: { type: string; tittel: string; forklaring: string }[]
  dok_med_funn?: { tittel: string }[]
  dok_uten_funn_count?: number
  planer?: { plannavn: string; plantype: string; planstatus: string }[]
  kommuneplan?: {
    sammendrag?: string
    nokkeltall?: { label: string; verdi: string }[]
    tomtedeling?: string
    mua?: string
    parkering?: string
    unntakPlankrav?: string
    planNavn?: string
  }
  bestemmelseAnalyser?: {
    planNavn?: string
    sammendrag?: string
    bya_prosent?: number
    gesims_m?: number
    mone_m?: number
    maks_etasjer?: number
    parkering?: string
    mua?: string
    tomtedeling?: string
    viktige_bestemmelser?: string[]
  }[]
}

export function AnalysePDF({ data }: { data: AnalysePDFData }) {
  const {
    adresse, kommunenavn, dato,
    areal_m2, bya_prosent, gesims_m, mone_m, maks_etasjer, gnr, bnr,
    ai_ingress, ai_funn = [],
    dok_med_funn = [], dok_uten_funn_count = 0,
    planer = [],
    kommuneplan,
    bestemmelseAnalyser = [],
  } = data

  const hasFunn = ai_funn.length > 0
  const dokTotal = dok_med_funn.length + dok_uten_funn_count
  const farligeDok = dok_med_funn.filter(d => /strandsone|kvikkleire|flom|skred|kulturmin|forurens/i.test(d.tittel))

  return (
    <Document
      title={`Tomteanalyse – ${adresse}`}
      author="Tomtly (NOPS AS)"
      subject={`Tomteanalyse for ${adresse}, ${kommunenavn}`}
    >
      {/* ══════════ SIDE 1: FORSIDE ══════════════════════════════════ */}
      <Page size="A4" style={[s.page, { padding: 0 }]}>
        <View style={s.coverBg} />
        <View style={s.coverContent}>
          {/* Topp */}
          <View style={s.coverTop}>
            <View>
              <Text style={s.coverBrand}>TOMTLY</Text>
              <Text style={s.coverTagline}>Tomteanalyse og salg</Text>
            </View>
            <Text style={s.coverDato}>{dato}</Text>
          </View>

          {/* Midtstykke */}
          <View style={s.coverMid}>
            <View style={s.coverBadge}>
              <Text style={s.coverBadgeTxt}>Tomteanalyse</Text>
            </View>
            <Text style={s.coverAdresse}>{adresse}</Text>
            <Text style={s.coverSted}>{kommunenavn}</Text>
            <View style={s.coverPills}>
              {areal_m2 ? <View style={s.pill}><Text style={s.pillTxt}>{areal_m2.toLocaleString('nb-NO')} m²</Text></View> : null}
              {bya_prosent ? <View style={s.pill}><Text style={s.pillTxt}>%-BYA {bya_prosent}%</Text></View> : null}
              {gnr && bnr ? <View style={s.pill}><Text style={s.pillTxt}>GNR {gnr} / BNR {bnr}</Text></View> : null}
              {planer.length > 0 && <View style={s.pill}><Text style={s.pillTxt}>{planer.length} reguleringsplan{planer.length !== 1 ? 'er' : ''}</Text></View>}
              {dokTotal > 0 && <View style={s.pill}><Text style={s.pillTxt}>{dokTotal} DOK-datasett</Text></View>}
            </View>

            <View style={s.coverDivider} />

            {ai_ingress ? (
              <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, maxWidth: 440 }}>
                {ai_ingress}
              </Text>
            ) : null}
          </View>

          {/* Bunn */}
          <View style={s.coverBot}>
            <Text style={s.coverAnsvarsfraskrivelse}>
              Denne analysen er KI-generert basert på offentlig tilgjengelig data fra Planslurpen, arealplaner.no, Kartverket DOK og kommunens planregistre. Analysen er veiledende og erstatter ikke profesjonell rådgivning. Oppdatert {dato}.
            </Text>
            <View style={s.coverContact}>
              <Text style={s.coverContactTxt}>Tomtly (NOPS AS)</Text>
              <Text style={s.coverContactVal}>hey@nops.no</Text>
              <Text style={s.coverContactVal}>40 60 39 08</Text>
              <Text style={[s.coverContactTxt, { marginTop: 2 }]}>tomtly.no</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* ══════════ SIDE 2: FUNN + DOK ══════════════════════════════ */}
      <Page size="A4" style={s.page}>
        <SecBar num="01" title="Viktige funn og risikovurdering" />
        <View style={s.body}>

          {/* Nøkkeltall */}
          {(areal_m2 || bya_prosent || gesims_m || mone_m || maks_etasjer) && (
            <>
              <View style={s.nGrid}>
                {areal_m2 ? (
                  <View style={s.nBox}>
                    <Text style={s.nLabel}>Tomtestørrelse</Text>
                    <Text style={s.nVal}>{areal_m2.toLocaleString('nb-NO')} m²</Text>
                    <Text style={s.nSub}>registrert areal</Text>
                  </View>
                ) : null}
                {bya_prosent ? (
                  <View style={s.nBox}>
                    <Text style={s.nLabel}>Maks BYA</Text>
                    <Text style={s.nVal}>{bya_prosent}%</Text>
                    {areal_m2 ? <Text style={s.nSub}>= {Math.round(areal_m2 * bya_prosent / 100)} m² tillatt</Text> : null}
                  </View>
                ) : null}
                {gesims_m ? (
                  <View style={s.nBox}>
                    <Text style={s.nLabel}>Gesimshøyde</Text>
                    <Text style={s.nVal}>{gesims_m} m</Text>
                    <Text style={s.nSub}>maks veggtopp</Text>
                  </View>
                ) : null}
                {mone_m ? (
                  <View style={s.nBox}>
                    <Text style={s.nLabel}>Mønehøyde</Text>
                    <Text style={s.nVal}>{mone_m} m</Text>
                    <Text style={s.nSub}>maks taktop</Text>
                  </View>
                ) : null}
                {maks_etasjer ? (
                  <View style={s.nBox}>
                    <Text style={s.nLabel}>Etasjer</Text>
                    <Text style={s.nVal}>{maks_etasjer}</Text>
                    <Text style={s.nSub}>maks tillatt</Text>
                  </View>
                ) : null}
              </View>
            </>
          )}

          {/* AI funn */}
          {hasFunn && (
            <View style={s.funnGrid}>
              {ai_funn.map((f, i) => {
                const isPos = f.type === 'positiv'
                const isKri = f.type === 'kritisk'
                return (
                  <View key={i} style={[s.funnKort, isPos ? s.funnPosKort : isKri ? s.funnKriKort : s.funnAdvKort]}>
                    <View style={s.funnHeader}>
                      <Text style={s.funnIkon}>{isPos ? '✓' : isKri ? '✕' : '△'}</Text>
                      <Text style={[s.funnTittel, isPos ? s.funnPosTittel : isKri ? s.funnKriTittel : s.funnAdvTittel]}>
                        {f.tittel}
                      </Text>
                    </View>
                    <Text style={[s.funnForklaring, isPos ? s.funnPosForklaring : isKri ? s.funnKriForklaring : s.funnAdvForklaring]}>
                      {f.forklaring}
                    </Text>
                  </View>
                )
              })}
            </View>
          )}

          {/* DOK */}
          {dokTotal > 0 && (
            dok_med_funn.length === 0 ? (
              <View style={[s.dokBoks, s.dokGrønn]}>
                <Text style={[s.dokTittel, s.dokGrønnTittel]}>✓ Naturfare og grunnforhold – ingen funn</Text>
                <Text style={[s.dokTekst, s.dokGrønnTekst]}>
                  {dokTotal} datasett er sjekket – flom, skred, kvikkleire, radon, kulturminner og mer. Ingen registrerte funn på denne eiendommen.
                </Text>
              </View>
            ) : (
              <View style={[s.dokBoks, s.dokGul]}>
                <Text style={[s.dokTittel, s.dokGulTittel]}>△ Naturfare og grunnforhold – {dok_med_funn.length} funn av {dokTotal} datasett</Text>
                <Text style={[s.dokTekst, s.dokGulTekst]}>
                  Følgende registrerte datasett har funn på eller nær eiendommen. Dette betyr ikke nødvendigvis at tomten ikke kan bebygges, men at det bør undersøkes nærmere før kjøp eller byggesøknad.
                </Text>
                {(farligeDok.length > 0 ? farligeDok : dok_med_funn).slice(0, 8).map((d, i) => (
                  <Text key={i} style={s.dokItem}>· {d.tittel}</Text>
                ))}
              </View>
            )
          )}
        </View>
        <Footer adresse={adresse} />
      </Page>

      {/* ══════════ SIDE 3: KOMMUNEPLAN + BESTEMMELSER ══════════════ */}
      {(kommuneplan?.sammendrag || bestemmelseAnalyser.length > 0) && (
        <Page size="A4" style={s.page}>
          <SecBar num="02" title="Planer og reguleringsbestemmelser" />
          <View style={s.body}>

            {/* Kommuneplan */}
            {kommuneplan?.sammendrag && (
              <View style={s.kpBoks}>
                <View style={s.kpTittelRow}>
                  <View style={s.kpDot} />
                  <Text style={s.kpTittel}>Kommuneplanens arealdel – {kommunenavn}{kommuneplan.planNavn ? ` (${kommuneplan.planNavn})` : ''}</Text>
                </View>
                <Text style={s.kpTekst}>{kommuneplan.sammendrag}</Text>
                {kommuneplan.nokkeltall && kommuneplan.nokkeltall.length > 0 && (
                  <View style={s.kpNøkler}>
                    {kommuneplan.nokkeltall.slice(0, 8).map((n, i) => (
                      <View key={i} style={s.kpNøkkel}>
                        <Text style={s.kpNøkkelTxt}><Text style={{ fontFamily: 'Helvetica-Bold' }}>{n.label}:</Text> {n.verdi}</Text>
                      </View>
                    ))}
                  </View>
                )}
                {kommuneplan.tomtedeling && (
                  <View style={s.kpUnderSeksjon}>
                    <Text style={s.kpUnderTittel}>Tomtedeling og fradeling</Text>
                    <Text style={s.kpUnderTekst}>{kommuneplan.tomtedeling}</Text>
                  </View>
                )}
                {kommuneplan.mua && (
                  <View style={s.kpUnderSeksjon}>
                    <Text style={s.kpUnderTittel}>Minste uteoppholdsareal (MUA)</Text>
                    <Text style={s.kpUnderTekst}>{kommuneplan.mua}</Text>
                  </View>
                )}
                {kommuneplan.parkering && (
                  <View style={s.kpUnderSeksjon}>
                    <Text style={s.kpUnderTittel}>Parkeringskrav</Text>
                    <Text style={s.kpUnderTekst}>{kommuneplan.parkering}</Text>
                  </View>
                )}
                {kommuneplan.unntakPlankrav && (
                  <View style={s.kpUnderSeksjon}>
                    <Text style={s.kpUnderTittel}>Unntak fra krav om reguleringsplan</Text>
                    <Text style={s.kpUnderTekst}>{kommuneplan.unntakPlankrav}</Text>
                  </View>
                )}
              </View>
            )}

            {/* Reguleringsbestemmelser */}
            {bestemmelseAnalyser.map((ba, i) => (
              <View key={i} style={s.regBoks}>
                <Text style={s.regTittel}>KI-tolkning – {ba.planNavn || 'Reguleringsbestemmelser'}</Text>
                {ba.sammendrag && <Text style={s.regSammendrag}>{ba.sammendrag}</Text>}
                <View style={s.regGrid}>
                  {ba.bya_prosent ? <View style={s.regBoks2}><Text style={s.regLabel}>Maks BYA</Text><Text style={s.regVal}>{ba.bya_prosent}%</Text></View> : null}
                  {ba.gesims_m ? <View style={s.regBoks2}><Text style={s.regLabel}>Gesimshøyde</Text><Text style={s.regVal}>{ba.gesims_m} m</Text></View> : null}
                  {ba.mone_m ? <View style={s.regBoks2}><Text style={s.regLabel}>Mønehøyde</Text><Text style={s.regVal}>{ba.mone_m} m</Text></View> : null}
                  {ba.maks_etasjer ? <View style={s.regBoks2}><Text style={s.regLabel}>Etasjer</Text><Text style={s.regVal}>{ba.maks_etasjer}</Text></View> : null}
                </View>
                {ba.viktige_bestemmelser && ba.viktige_bestemmelser.length > 0 && (
                  <>
                    <Text style={s.regBestLabel}>Viktige bestemmelser</Text>
                    {ba.viktige_bestemmelser.slice(0, 8).map((b, j) => (
                      <View key={j} style={s.regBestItem}>
                        <Text style={s.regBestBullet}>›</Text>
                        <Text style={s.regBestTxt}>{b}</Text>
                      </View>
                    ))}
                  </>
                )}
                {ba.tomtedeling && (
                  <View style={{ marginTop: 8, paddingTop: 8, borderTop: '1 solid rgba(255,255,255,0.1)' }}>
                    <Text style={[s.regBestLabel, { marginBottom: 3 }]}>Tomtedeling</Text>
                    <Text style={[s.regBestTxt, { color: '#94a3b8' }]}>{ba.tomtedeling}</Text>
                  </View>
                )}
              </View>
            ))}

            {/* CTA */}
            <View style={s.ctaBoks}>
              <Text style={s.ctaTittel}>Vil du gå videre med denne tomten?</Text>
              <Text style={s.ctaTekst}>
                Book et møte med Tomtly – vi går gjennom mulighetene på akkurat din tomt og lager en skisse på kart. Pris: kr 2 000 inkl. møte, skisse og mulighetsstudie.
              </Text>
              <View style={s.ctaRow}>
                <View style={s.ctaItem}>
                  <Text style={s.ctaLabel}>Telefon</Text>
                  <Text style={s.ctaVal}>40 60 39 08</Text>
                </View>
                <View style={s.ctaItem}>
                  <Text style={s.ctaLabel}>E-post</Text>
                  <Text style={s.ctaVal}>hey@nops.no</Text>
                </View>
                <View style={s.ctaItem}>
                  <Text style={s.ctaLabel}>Nettside</Text>
                  <Text style={s.ctaVal}>tomtly.no</Text>
                </View>
              </View>
              <View style={s.ctaPris}>
                <Text style={s.ctaPrisTxt}>Møte + skisse + mulighetsstudie – kr 2 000,–</Text>
              </View>
            </View>
          </View>
          <Footer adresse={adresse} />
        </Page>
      )}
    </Document>
  )
}
