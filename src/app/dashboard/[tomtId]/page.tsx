'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

// ─── Types ──────────────────────────────────────────────────────────────────

type InteressentStatus = 'ny' | 'kontaktet' | 'visning_avtalt' | 'bud_mottatt'

interface Interessent {
  id: number
  navn: string
  type: string
  dato: string
  status: InteressentStatus
  telefon: string
  epost: string
  notat: string
  foreslattSvar?: string
}

interface TomtCase {
  id: string
  adresse: string
  kommune: string
  kommunenr: string
  gnr: number
  bnr: number
  status: string
  statusLabel: string
  dagerPaaMarkedet: number
  pakke: string
  pris: number
  areal: number
  publisert: string
  tomtescore: number
  selger: { navn: string; epost: string; telefon: string }
  metrics: {
    visninger: { tall: number; endring: string; trend: string }
    interessenter: { tall: number; endring: string; trend: string }
    visningsforesporsler: { tall: number; endring: string; trend: string }
    tomtescore: { tall: string; endring: string; trend: string }
  }
  interessenter: Interessent[]
  aktiviteter: { id: number; type: string; icon: string; tid: string; tekst: string; harHandling: boolean }[]
  tomtDetaljer: {
    regulering: string
    utnyttelsesgrad: string
    maksHoyde: string
    vann: string
    avlop: string
    adkomst: string
    grunnforhold: string
    solforhold: string
    stoy: string
    prisantydning: string
    kommunaleAvgifter: string
    matrikkel: string
  }
  trafikk: { dag: string; visninger: number }[]
  trafikkkilder: { kilde: string; prosent: number; visninger: number }[]
  markedsforing: { kanal: string; status: string; detalj: string; ikon: string; farge: string }[]
  dokumenter: { navn: string; type: string; dato: string; ikon: string }[]
  fremdrift: { steg: string; status: 'done' | 'current' | 'future' }[]
  sammenlignbare: { adresse: string; areal: number; pris: number; dato: string }[]
  pakkeBeskrivelse: string
  pakkeFeatures: string[]
  pakkePris: string
  pakkeProvisjon: string
  tomtepresentasjonLink: string
  shareUrl: string
}

// ─── Case Data ──────────────────────────────────────────────────────────────

const CASES: Record<string, TomtCase> = {
  'bjornemyrveien-20': {
    id: 'bjornemyrveien-20',
    adresse: 'Bjørnemyrveien 20, 1459 Nesodden',
    kommune: 'Nesodden (3212)',
    kommunenr: '3212',
    gnr: 1,
    bnr: 1011,
    status: 'aktiv',
    statusLabel: 'Aktiv',
    dagerPaaMarkedet: 8,
    pakke: 'Analyse + Markedsføring',
    pris: 2850000,
    areal: 812,
    publisert: '15.03.2026',
    tomtescore: 8.4,
    selger: { navn: 'Jakob Bjøndal', epost: 'jakobbjondal@outlook.com', telefon: '40603908' },
    metrics: {
      visninger: { tall: 312, endring: '+18 denne uken', trend: 'up' },
      interessenter: { tall: 11, endring: '+3 nye siste 7 dager', trend: 'up' },
      visningsforesporsler: { tall: 4, endring: '2 venter på svar', trend: 'neutral' },
      tomtescore: { tall: '8.4/10', endring: 'Over gjennomsnittet på Nesodden', trend: 'up' },
    },
    interessenter: [
      { id: 1, navn: 'Martin Olsen', type: 'Privatperson', dato: '2026-03-23', status: 'ny', telefon: '912 34 567', epost: 'martin.olsen@gmail.com', notat: 'Ønsker å bygge enebolig, familie med 2 barn.', foreslattSvar: 'Hei Martin! Takk for din interesse for tomten på Bjørnemyrveien 20. Vi har en detaljert tomterapport som viser regulering, grunnforhold og solforhold. Ønsker du å motta denne, eller vil du booke en visning? Vi har ledig lørdag 29. mars. Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 2, navn: 'Kari Nordby', type: 'Privatperson', dato: '2026-03-22', status: 'visning_avtalt', telefon: '934 56 789', epost: 'kari.nordby@outlook.com', notat: 'Visning avtalt lørdag 29. mars kl. 12:00.', foreslattSvar: 'Hei Kari! Flott at du kommer på visning lørdag 29. mars kl. 12:00. Vi har klargjort tomterapport og mulighetsstudie som du kan se gjennom i forkant. Trenger du veibeskrivelse? Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 3, navn: 'Erik Johansen', type: 'Utbygger', dato: '2026-03-20', status: 'kontaktet', telefon: '901 23 456', epost: 'erik@johansen-bygg.no', notat: 'Interessert i fradeling og utvikling av to enheter.', foreslattSvar: 'Hei Erik! Takk for henvendelsen. Tomten på Bjørnemyrveien 20 har 812 m² og er regulert til boligformål. Tomterapporten vår inkluderer vurdering av fradelingspotensial. Ønsker du en visning med gjennomgang av muligheter? Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 4, navn: 'OBOS Boligutvikling', type: 'Selskap', dato: '2026-03-16', status: 'kontaktet', telefon: '22 86 55 00', epost: 'tomter@obos.no', notat: 'Forespørsel om utviklingspotensial, ønsker mulighetsstudie.', foreslattSvar: 'Hei, takk for forespørselen fra OBOS. Vi har utarbeidet en fullstendig tomterapport med mulighetsstudie for Bjørnemyrveien 20. Tomten er på 812 m² med regulering til boligformål. Vi kan sende over rapporten og avtale et møte for gjennomgang. Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 5, navn: 'Familien Hansen', type: 'Privatperson', dato: '2026-03-18', status: 'bud_mottatt', telefon: '976 54 321', epost: 'hansen.fam@gmail.com', notat: 'Har gitt muntlig bud på 2 700 000 kr. Avventer skriftlig.', foreslattSvar: 'Hei! Takk for budet på Bjørnemyrveien 20. For å gå videre trenger vi et skriftlig bud via budskjema. Du finner dette i dokumentene på tomteprofilen. Har du spørsmål om prosessen? Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 6, navn: 'Lise Berger', type: 'Privatperson', dato: '2026-03-21', status: 'ny', telefon: '917 88 432', epost: 'lise.berger@hotmail.com', notat: 'Ønsker info om byggemuligheter og nærhet til skole.', foreslattSvar: 'Hei Lise! Takk for din interesse for tomten på Bjørnemyrveien 20. Tomterapporten vår dekker byggemuligheter, regulering og nærområdet inkludert skoler. Nærmeste barneskole er Bjørnemyr skole, ca. 800 m unna. Ønsker du å booke en visning? Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 7, navn: 'Bygghus Nord AS', type: 'Selskap', dato: '2026-03-19', status: 'kontaktet', telefon: '22 44 55 66', epost: 'post@bygghus-nord.no', notat: 'Ferdighusleverandør – ønsker å vurdere tomten for sine kunder.', foreslattSvar: 'Hei! Takk for henvendelsen fra Bygghus Nord. Tomten på Bjørnemyrveien 20 har gode byggeforhold og er regulert til småhusbebyggelse. Vi kan sende over tomterapporten med reguleringskart og grunnforhold. Vennlig hilsen, Tomtly Eiendomsekspert' },
    ],
    aktiviteter: [
      { id: 1, type: 'interessent', icon: '🔔', tid: '1 time siden', tekst: 'Ny interessent: Martin Olsen har registrert interesse for tomten.', harHandling: true },
      { id: 2, type: 'visning', icon: '👁️', tid: '3 timer siden', tekst: 'Tomten ble sett 24 ganger i dag – over gjennomsnittet for uka.', harHandling: false },
      { id: 3, type: 'interessent', icon: '🔔', tid: 'I går, 16:42', tekst: 'Kari Nordby ønsker visning lørdag 29. mars kl. 12:00.', harHandling: true },
      { id: 4, type: 'interessent', icon: '🔔', tid: 'I går, 14:10', tekst: 'Lise Berger har registrert interesse – ønsker info om byggemuligheter.', harHandling: true },
      { id: 5, type: 'kampanje', icon: '📣', tid: 'I går, 09:00', tekst: 'Ny annonsekampanje startet – målgruppe: barnefamilier på Nesodden og Follo.', harHandling: false },
      { id: 6, type: 'system', icon: '✅', tid: '2 dager siden', tekst: 'Tomterapport oppdatert med nye reguleringsbestemmelser fra Nesodden kommune.', harHandling: false },
      { id: 7, type: 'interessent', icon: '🔔', tid: '3 dager siden', tekst: 'Erik Johansen ba om mer informasjon om fradeling og infrastruktur.', harHandling: true },
      { id: 8, type: 'rapport', icon: '📈', tid: '4 dager siden', tekst: 'Ukentlig rapport klar: 96 visninger, 3 nye interessenter.', harHandling: false },
      { id: 9, type: 'interessent', icon: '🔔', tid: '5 dager siden', tekst: 'Bygghus Nord AS ønsker å vurdere tomten for sine ferdighusskunder.', harHandling: true },
      { id: 10, type: 'visning', icon: '👁️', tid: '5 dager siden', tekst: 'Visning gjennomført med familien Hansen – positiv tilbakemelding.', harHandling: false },
      { id: 11, type: 'interessent', icon: '🔔', tid: '6 dager siden', tekst: 'Familien Hansen ga muntlig bud på 2 700 000 kr.', harHandling: true },
      { id: 12, type: 'kampanje', icon: '📣', tid: '1 uke siden', tekst: 'E-postkampanje sendt til 342 registrerte tomtekjøpere på Nesodden.', harHandling: false },
      { id: 13, type: 'system', icon: '✅', tid: '1 uke siden', tekst: 'Tomten ble publisert på Tomtly.no med fullstendig profil.', harHandling: false },
      { id: 14, type: 'interessent', icon: '🔔', tid: '1 uke siden', tekst: 'OBOS Boligutvikling sendte forespørsel om tomtens utviklingspotensial.', harHandling: true },
      { id: 15, type: 'rapport', icon: '📈', tid: '8 dager siden', tekst: 'Tomtescore beregnet: 8.4/10 – god beliggenhet og regulering på Nesodden.', harHandling: false },
    ],
    tomtDetaljer: {
      regulering: 'Boligformål – frittliggende småhusbebyggelse',
      utnyttelsesgrad: '25% BYA',
      maksHoyde: '8,0 meter (mønehøyde)',
      vann: 'Offentlig tilknytning',
      avlop: 'Offentlig tilknytning',
      adkomst: 'Felles privat vei fra Bjørnemyrveien',
      grunnforhold: 'Fjell / morene – gode grunnforhold',
      solforhold: 'Gode solforhold, sør-vestvendt',
      stoy: 'Gul støysone (vei) – tiltak i byggesøknad',
      prisantydning: '2 850 000 kr',
      kommunaleAvgifter: '12 400 kr/år (estimat)',
      matrikkel: '3212-1/1011',
    },
    trafikk: [
      { dag: '10. mar', visninger: 14 },
      { dag: '11. mar', visninger: 18 },
      { dag: '12. mar', visninger: 26 },
      { dag: '13. mar', visninger: 21 },
      { dag: '14. mar', visninger: 10 },
      { dag: '15. mar', visninger: 32 },
      { dag: '16. mar', visninger: 28 },
      { dag: '17. mar', visninger: 22 },
      { dag: '18. mar', visninger: 29 },
      { dag: '19. mar', visninger: 35 },
      { dag: '20. mar', visninger: 31 },
      { dag: '21. mar', visninger: 19 },
      { dag: '22. mar', visninger: 24 },
      { dag: '23. mar', visninger: 15 },
    ],
    trafikkkilder: [
      { kilde: 'Tomtly.no – direkte', prosent: 36, visninger: 112 },
      { kilde: 'Google søk', prosent: 22, visninger: 69 },
      { kilde: 'Facebook-annonse', prosent: 20, visninger: 62 },
      { kilde: 'E-postkampanje', prosent: 14, visninger: 44 },
      { kilde: 'Annet / delt lenke', prosent: 8, visninger: 25 },
    ],
    markedsforing: [
      { kanal: 'Tomtly.no', status: 'Publisert', detalj: '312 visninger totalt', ikon: '🌐', farge: 'bg-forest-50 border-forest-200' },
      { kanal: 'Annonsering', status: 'Aktiv kampanje', detalj: '14 800 rekkevidde · 218 klikk', ikon: '📣', farge: 'bg-blue-50 border-blue-200' },
      { kanal: 'E-postliste', status: 'Sendt', detalj: 'Sendt til 342 registrerte kjøpere på Nesodden', ikon: '📧', farge: 'bg-purple-50 border-purple-200' },
    ],
    dokumenter: [
      { navn: 'Tomterapport', type: 'PDF', dato: '20. mars 2026', ikon: '📄' },
      { navn: 'Budskjema', type: 'PDF', dato: '16. mars 2026', ikon: '📝' },
      { navn: 'Akseptbrev', type: 'PDF', dato: '16. mars 2026', ikon: '✉️' },
      { navn: 'Visningsguide', type: 'PDF', dato: '15. mars 2026', ikon: '🗺️' },
      { navn: 'Sjekkliste for kjøper', type: 'PDF', dato: '15. mars 2026', ikon: '☑️' },
      { navn: 'Reguleringsbestemmelser', type: 'PDF', dato: '10. mars 2026', ikon: '📋' },
    ],
    fremdrift: [
      { steg: 'Tomt registrert', status: 'done' },
      { steg: 'Tomterapport ferdigstilt', status: 'done' },
      { steg: 'Publisert på Tomtly.no', status: 'done' },
      { steg: 'Annonsekampanje startet', status: 'done' },
      { steg: 'Motta visningsforespørsler', status: 'current' },
      { steg: 'Gjennomfør visninger', status: 'future' },
      { steg: 'Motta bud', status: 'future' },
      { steg: 'Aksepter bud', status: 'future' },
      { steg: 'Oppgjør via Propr', status: 'future' },
      { steg: 'Overlevering', status: 'future' },
    ],
    sammenlignbare: [
      { adresse: 'Bjørnemyrveien 14, Nesodden', areal: 780, pris: 2600000, dato: 'Jan 2026' },
      { adresse: 'Flaskebekk terrasse 3', areal: 920, pris: 3100000, dato: 'Des 2025' },
      { adresse: 'Storenga 8, Nesodden', areal: 650, pris: 2200000, dato: 'Nov 2025' },
      { adresse: 'Skogsveien 12, Nesodden', areal: 1050, pris: 3850000, dato: 'Okt 2025' },
      { adresse: 'Kirkeveien 22, Nesodden', areal: 740, pris: 2450000, dato: 'Sep 2025' },
    ],
    pakkeBeskrivelse: 'Fullstendig tomteanalyse og aktiv markedsføring via Tomtly. Inkluderer tomterapport, annonsering, interessenthåndtering og Eiendomsekspert-støtte.',
    pakkeFeatures: ['Tomterapport', 'Mulighetsstudie', 'Profesjonelle bilder', 'Annonsering', 'Eiendomsekspert-støtte', 'Oppgjør via Propr'],
    pakkePris: '4 990 kr',
    pakkeProvisjon: '+ 2,5 % ved salg',
    tomtepresentasjonLink: '/tomter/bjornemyrveien-20',
    shareUrl: 'tomtly.no/tomt/3212/1/1011',
  },

  'bjornemyrveien-22': {
    id: 'bjornemyrveien-22',
    adresse: 'Bjørnemyrveien 22, 1459 Nesodden',
    kommune: 'Nesodden (3212)',
    kommunenr: '3212',
    gnr: 1,
    bnr: 1012,
    status: 'aktiv',
    statusLabel: 'Aktiv',
    dagerPaaMarkedet: 8,
    pakke: 'Analyse + Markedsføring',
    pris: 2650000,
    areal: 756,
    publisert: '15.03.2026',
    tomtescore: 7.8,
    selger: { navn: 'Jakob Bjøndal', epost: 'jakobbjondal@outlook.com', telefon: '40603908' },
    metrics: {
      visninger: { tall: 287, endring: '+14 denne uken', trend: 'up' },
      interessenter: { tall: 9, endring: '+2 nye siste 7 dager', trend: 'up' },
      visningsforesporsler: { tall: 3, endring: '1 venter på svar', trend: 'neutral' },
      tomtescore: { tall: '7.8/10', endring: 'Over gjennomsnittet på Nesodden', trend: 'up' },
    },
    interessenter: [
      { id: 1, navn: 'Anders Vik', type: 'Privatperson', dato: '2026-03-22', status: 'ny', telefon: '922 11 334', epost: 'anders.vik@gmail.com', notat: 'Barnefamilie som ønsker å bygge på Nesodden.', foreslattSvar: 'Hei Anders! Takk for din interesse for tomten på Bjørnemyrveien 22. Vi har en detaljert tomterapport som dekker regulering, grunnforhold og byggemuligheter. Ønsker du å motta denne, eller booke en visning? Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 2, navn: 'Silje Tangen', type: 'Privatperson', dato: '2026-03-21', status: 'kontaktet', telefon: '948 77 221', epost: 'silje.tangen@outlook.com', notat: 'Spørsmål om solforhold og utsikt.', foreslattSvar: 'Hei Silje! Tomten på Bjørnemyrveien 22 har gode solforhold og delvis sjøutsikt. Tomterapporten vår inneholder detaljert solanalyse og terrengkart. Ønsker du å komme på visning? Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 3, navn: 'Rune Brekke', type: 'Utbygger', dato: '2026-03-19', status: 'kontaktet', telefon: '905 66 789', epost: 'rune@brekke-bygg.no', notat: 'Vurderer tomten sammen med nr. 20 for prosjekt.', foreslattSvar: 'Hei Rune! Takk for interessen for Bjørnemyrveien 22. Vi ser at du også vurderer nabotomten. Vi kan sende tomterapport for begge eiendommene og avtale et møte for å diskutere utviklingspotensial. Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 4, navn: 'Mona Kristiansen', type: 'Privatperson', dato: '2026-03-18', status: 'visning_avtalt', telefon: '913 44 556', epost: 'mona.k@gmail.com', notat: 'Visning avtalt søndag 30. mars kl. 13:00.', foreslattSvar: 'Hei Mona! Vi gleder oss til visningen søndag 30. mars kl. 13:00. Vi har klargjort tomterapport som du gjerne kan se gjennom på forhånd. Gi beskjed om du har spørsmål! Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 5, navn: 'Tor Helgesen', type: 'Privatperson', dato: '2026-03-17', status: 'ny', telefon: '976 22 111', epost: 'tor.helgesen@yahoo.no', notat: 'Ønsker å vite mer om kommunale avgifter og tilknytning.', foreslattSvar: 'Hei Tor! Takk for din interesse. Kommunale avgifter for Bjørnemyrveien 22 er estimert til ca. 11 800 kr/år. Tomten har offentlig vann og avløp. Alt dette er dekket i tomterapporten. Ønsker du visning? Vennlig hilsen, Tomtly Eiendomsekspert' },
    ],
    aktiviteter: [
      { id: 1, type: 'interessent', icon: '🔔', tid: '4 timer siden', tekst: 'Ny interessent: Anders Vik har registrert interesse for tomten.', harHandling: true },
      { id: 2, type: 'visning', icon: '👁️', tid: '6 timer siden', tekst: 'Tomten ble sett 19 ganger i dag.', harHandling: false },
      { id: 3, type: 'interessent', icon: '🔔', tid: 'I går, 11:20', tekst: 'Silje Tangen har spørsmål om solforhold.', harHandling: true },
      { id: 4, type: 'kampanje', icon: '📣', tid: 'I går, 09:00', tekst: 'Annonsekampanje oppdatert – ny målgruppe: unge par på Nesodden.', harHandling: false },
      { id: 5, type: 'interessent', icon: '🔔', tid: '2 dager siden', tekst: 'Rune Brekke (utbygger) vurderer samlet prosjekt med nabotomt.', harHandling: true },
      { id: 6, type: 'system', icon: '✅', tid: '3 dager siden', tekst: 'Tomterapport ferdigstilt for Bjørnemyrveien 22.', harHandling: false },
      { id: 7, type: 'interessent', icon: '🔔', tid: '4 dager siden', tekst: 'Mona Kristiansen ønsker visning søndag 30. mars.', harHandling: true },
      { id: 8, type: 'rapport', icon: '📈', tid: '5 dager siden', tekst: 'Ukentlig rapport: 82 visninger, 2 nye interessenter.', harHandling: false },
      { id: 9, type: 'interessent', icon: '🔔', tid: '6 dager siden', tekst: 'Tor Helgesen ønsker info om kommunale avgifter.', harHandling: true },
      { id: 10, type: 'kampanje', icon: '📣', tid: '1 uke siden', tekst: 'E-postkampanje sendt til 342 registrerte tomtekjøpere på Nesodden.', harHandling: false },
      { id: 11, type: 'system', icon: '✅', tid: '1 uke siden', tekst: 'Tomten ble publisert på Tomtly.no.', harHandling: false },
      { id: 12, type: 'rapport', icon: '📈', tid: '8 dager siden', tekst: 'Tomtescore beregnet: 7.8/10 – god beliggenhet på Nesodden.', harHandling: false },
    ],
    tomtDetaljer: {
      regulering: 'Boligformål – frittliggende småhusbebyggelse',
      utnyttelsesgrad: '25% BYA',
      maksHoyde: '8,0 meter (mønehøyde)',
      vann: 'Offentlig tilknytning',
      avlop: 'Offentlig tilknytning',
      adkomst: 'Felles privat vei fra Bjørnemyrveien',
      grunnforhold: 'Fjell / morene – gode grunnforhold',
      solforhold: 'Gode solforhold, vestvendt',
      stoy: 'Grønn støysone – ingen tiltak nødvendig',
      prisantydning: '2 650 000 kr',
      kommunaleAvgifter: '11 800 kr/år (estimat)',
      matrikkel: '3212-1/1012',
    },
    trafikk: [
      { dag: '10. mar', visninger: 11 },
      { dag: '11. mar', visninger: 16 },
      { dag: '12. mar', visninger: 20 },
      { dag: '13. mar', visninger: 17 },
      { dag: '14. mar', visninger: 9 },
      { dag: '15. mar', visninger: 28 },
      { dag: '16. mar', visninger: 25 },
      { dag: '17. mar', visninger: 20 },
      { dag: '18. mar', visninger: 27 },
      { dag: '19. mar', visninger: 32 },
      { dag: '20. mar', visninger: 28 },
      { dag: '21. mar', visninger: 17 },
      { dag: '22. mar', visninger: 22 },
      { dag: '23. mar', visninger: 13 },
    ],
    trafikkkilder: [
      { kilde: 'Tomtly.no – direkte', prosent: 35, visninger: 100 },
      { kilde: 'Google søk', prosent: 23, visninger: 66 },
      { kilde: 'Facebook-annonse', prosent: 21, visninger: 60 },
      { kilde: 'E-postkampanje', prosent: 13, visninger: 37 },
      { kilde: 'Annet / delt lenke', prosent: 8, visninger: 24 },
    ],
    markedsforing: [
      { kanal: 'Tomtly.no', status: 'Publisert', detalj: '287 visninger totalt', ikon: '🌐', farge: 'bg-forest-50 border-forest-200' },
      { kanal: 'Annonsering', status: 'Aktiv kampanje', detalj: '12 200 rekkevidde · 194 klikk', ikon: '📣', farge: 'bg-blue-50 border-blue-200' },
      { kanal: 'E-postliste', status: 'Sendt', detalj: 'Sendt til 342 registrerte kjøpere på Nesodden', ikon: '📧', farge: 'bg-purple-50 border-purple-200' },
    ],
    dokumenter: [
      { navn: 'Tomterapport', type: 'PDF', dato: '20. mars 2026', ikon: '📄' },
      { navn: 'Budskjema', type: 'PDF', dato: '16. mars 2026', ikon: '📝' },
      { navn: 'Visningsguide', type: 'PDF', dato: '15. mars 2026', ikon: '🗺️' },
      { navn: 'Sjekkliste for kjøper', type: 'PDF', dato: '15. mars 2026', ikon: '☑️' },
      { navn: 'Reguleringsbestemmelser', type: 'PDF', dato: '10. mars 2026', ikon: '📋' },
    ],
    fremdrift: [
      { steg: 'Tomt registrert', status: 'done' },
      { steg: 'Tomterapport ferdigstilt', status: 'done' },
      { steg: 'Publisert på Tomtly.no', status: 'done' },
      { steg: 'Annonsekampanje startet', status: 'done' },
      { steg: 'Motta visningsforespørsler', status: 'current' },
      { steg: 'Gjennomfør visninger', status: 'future' },
      { steg: 'Motta bud', status: 'future' },
      { steg: 'Aksepter bud', status: 'future' },
      { steg: 'Oppgjør via Propr', status: 'future' },
      { steg: 'Overlevering', status: 'future' },
    ],
    sammenlignbare: [
      { adresse: 'Bjørnemyrveien 14, Nesodden', areal: 780, pris: 2600000, dato: 'Jan 2026' },
      { adresse: 'Flaskebekk terrasse 3', areal: 920, pris: 3100000, dato: 'Des 2025' },
      { adresse: 'Storenga 8, Nesodden', areal: 650, pris: 2200000, dato: 'Nov 2025' },
      { adresse: 'Skogsveien 12, Nesodden', areal: 1050, pris: 3850000, dato: 'Okt 2025' },
      { adresse: 'Kirkeveien 22, Nesodden', areal: 740, pris: 2450000, dato: 'Sep 2025' },
    ],
    pakkeBeskrivelse: 'Fullstendig tomteanalyse og aktiv markedsføring via Tomtly. Inkluderer tomterapport, annonsering, interessenthåndtering og Eiendomsekspert-støtte.',
    pakkeFeatures: ['Tomterapport', 'Mulighetsstudie', 'Profesjonelle bilder', 'Annonsering', 'Eiendomsekspert-støtte', 'Oppgjør via Propr'],
    pakkePris: '4 990 kr',
    pakkeProvisjon: '+ 2,5 % ved salg',
    tomtepresentasjonLink: '/tomter/bjornemyrveien-22',
    shareUrl: 'tomtly.no/tomt/3212/1/1012',
  },

  'alvaern-67': {
    id: 'alvaern-67',
    adresse: 'Gamle Alværnvei 67, 1453 Nesodden',
    kommune: 'Nesodden (3212)',
    kommunenr: '3212',
    gnr: 0,
    bnr: 0,
    status: 'analyse_ferdig',
    statusLabel: 'Analyse ferdig',
    dagerPaaMarkedet: 5,
    pakke: 'Tomteanalyse',
    pris: 3200000,
    areal: 1240,
    publisert: '18.03.2026',
    tomtescore: 7.2,
    selger: { navn: 'Jakob Bjøndal', epost: 'jakobbjondal@outlook.com', telefon: '40603908' },
    metrics: {
      visninger: { tall: 0, endring: 'Ikke publisert ennå', trend: 'neutral' },
      interessenter: { tall: 0, endring: 'Ingen ennå', trend: 'neutral' },
      visningsforesporsler: { tall: 0, endring: 'Ingen ennå', trend: 'neutral' },
      tomtescore: { tall: '7.2/10', endring: 'Over gjennomsnittet på Nesodden', trend: 'up' },
    },
    interessenter: [],
    aktiviteter: [
      { id: 1, type: 'rapport', icon: '📈', tid: '2 dager siden', tekst: 'Tomtescore beregnet: 7.2/10 – godt potensial på Nesodden.', harHandling: false },
      { id: 2, type: 'system', icon: '✅', tid: '3 dager siden', tekst: 'Tomterapport ferdigstilt for Gamle Alværnvei 67.', harHandling: false },
      { id: 3, type: 'system', icon: '✅', tid: '5 dager siden', tekst: 'Tomt registrert i Tomtly – analyse startet.', harHandling: false },
    ],
    tomtDetaljer: {
      regulering: 'Boligformål – frittliggende småhusbebyggelse',
      utnyttelsesgrad: '20% BYA',
      maksHoyde: '8,0 meter (mønehøyde)',
      vann: 'Offentlig tilknytning tilgjengelig',
      avlop: 'Privat – krav om septiktank/bioreaktor',
      adkomst: 'Privat vei fra Gamle Alværnvei',
      grunnforhold: 'Leire / morene – geoteknisk vurdering anbefalt',
      solforhold: 'Gode solforhold, sørvendt skråning',
      stoy: 'Grønn støysone – stille beliggenhet',
      prisantydning: '3 200 000 kr',
      kommunaleAvgifter: '14 200 kr/år (estimat)',
      matrikkel: '3212 (ikke matrikkelført tomt)',
    },
    trafikk: [],
    trafikkkilder: [],
    markedsforing: [],
    dokumenter: [
      { navn: 'Tomterapport', type: 'PDF', dato: '20. mars 2026', ikon: '📄' },
      { navn: 'Reguleringsbestemmelser', type: 'PDF', dato: '18. mars 2026', ikon: '📋' },
    ],
    fremdrift: [
      { steg: 'Tomt registrert', status: 'done' },
      { steg: 'Tomterapport ferdigstilt', status: 'done' },
      { steg: 'Publisert på Tomtly.no', status: 'future' },
      { steg: 'Annonsekampanje startet', status: 'future' },
      { steg: 'Motta visningsforespørsler', status: 'future' },
      { steg: 'Gjennomfør visninger', status: 'future' },
      { steg: 'Motta bud', status: 'future' },
      { steg: 'Aksepter bud', status: 'future' },
      { steg: 'Oppgjør via Propr', status: 'future' },
      { steg: 'Overlevering', status: 'future' },
    ],
    sammenlignbare: [
      { adresse: 'Alværnlia 4, Nesodden', areal: 1100, pris: 3400000, dato: 'Feb 2026' },
      { adresse: 'Storenga 8, Nesodden', areal: 650, pris: 2200000, dato: 'Nov 2025' },
      { adresse: 'Hellvikveien 15, Nesodden', areal: 980, pris: 2900000, dato: 'Okt 2025' },
    ],
    pakkeBeskrivelse: 'Fullstendig tomteanalyse med rapport, reguleringssjekk og tomtescore. Oppgrader til Analyse + Markedsføring for aktiv annonsering.',
    pakkeFeatures: ['Tomterapport', 'Reguleringssjekk', 'Tomtescore', 'Grunnforhold', 'Solanalyse'],
    pakkePris: '2 490 kr',
    pakkeProvisjon: 'Ingen provisjon',
    tomtepresentasjonLink: '/tomter/alvaern-67',
    shareUrl: 'tomtly.no/tomt/3212',
  },

  // Default demo fallback
  'demo123': {
    id: 'demo123',
    adresse: 'Eksempelveien 1, 0000 Demoby',
    kommune: 'Demokommune (0000)',
    kommunenr: '0000',
    gnr: 1,
    bnr: 1,
    status: 'aktiv',
    statusLabel: 'Demo',
    dagerPaaMarkedet: 34,
    pakke: 'Tomtly Komplett',
    pris: 2850000,
    areal: 812,
    publisert: '01.01.2026',
    tomtescore: 8.2,
    selger: { navn: 'Demo Bruker', epost: 'demo@tomtly.no', telefon: '00000000' },
    metrics: {
      visninger: { tall: 247, endring: '+12 denne uken', trend: 'up' },
      interessenter: { tall: 8, endring: '+3 nye siste 7 dager', trend: 'up' },
      visningsforesporsler: { tall: 3, endring: '2 venter på svar', trend: 'neutral' },
      tomtescore: { tall: '8.2/10', endring: 'Over gjennomsnittet', trend: 'up' },
    },
    interessenter: [
      { id: 1, navn: 'Martin Olsen', type: 'Privatperson', dato: '2026-03-23', status: 'ny', telefon: '912 34 567', epost: 'martin.olsen@gmail.com', notat: 'Ønsker å bygge enebolig, familie med 2 barn.', foreslattSvar: 'Hei Martin! Takk for din interesse. Vi har en detaljert tomterapport klar. Ønsker du å booke en visning? Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 2, navn: 'Kari Nordby', type: 'Privatperson', dato: '2026-03-22', status: 'visning_avtalt', telefon: '934 56 789', epost: 'kari.nordby@outlook.com', notat: 'Visning avtalt lørdag 29. mars kl. 12:00.', foreslattSvar: 'Hei Kari! Flott at du kommer på visning. Vi har klargjort tomterapport og mulighetsstudie. Vennlig hilsen, Tomtly Eiendomsekspert' },
      { id: 3, navn: 'Erik Johansen', type: 'Utbygger', dato: '2026-03-20', status: 'kontaktet', telefon: '901 23 456', epost: 'erik@johansen-bygg.no', notat: 'Interessert i fradeling og utvikling av to enheter.', foreslattSvar: 'Hei Erik! Tomterapporten vår inkluderer vurdering av fradelingspotensial. Ønsker du en visning? Vennlig hilsen, Tomtly Eiendomsekspert' },
    ],
    aktiviteter: [
      { id: 1, type: 'interessent', icon: '🔔', tid: '2 timer siden', tekst: 'Ny interessent: Martin Olsen har registrert interesse.', harHandling: true },
      { id: 2, type: 'visning', icon: '👁️', tid: '5 timer siden', tekst: 'Tomten ble sett 18 ganger i dag.', harHandling: false },
      { id: 3, type: 'system', icon: '✅', tid: '2 dager siden', tekst: 'Tomterapport oppdatert.', harHandling: false },
    ],
    tomtDetaljer: {
      regulering: 'Boligformål – frittliggende småhusbebyggelse',
      utnyttelsesgrad: '25% BYA',
      maksHoyde: '8,0 meter (mønehøyde)',
      vann: 'Offentlig tilknytning',
      avlop: 'Offentlig tilknytning',
      adkomst: 'Kommunal vei',
      grunnforhold: 'Fjell / morene – gode grunnforhold',
      solforhold: 'Gode solforhold',
      stoy: 'Grønn støysone',
      prisantydning: '2 850 000 kr',
      kommunaleAvgifter: '12 400 kr/år (estimat)',
      matrikkel: '0000-1/1',
    },
    trafikk: [
      { dag: '10. mar', visninger: 12 },
      { dag: '11. mar', visninger: 15 },
      { dag: '12. mar', visninger: 22 },
      { dag: '13. mar', visninger: 18 },
      { dag: '14. mar', visninger: 8 },
      { dag: '15. mar', visninger: 6 },
      { dag: '16. mar', visninger: 14 },
      { dag: '17. mar', visninger: 19 },
      { dag: '18. mar', visninger: 25 },
      { dag: '19. mar', visninger: 31 },
      { dag: '20. mar', visninger: 28 },
      { dag: '21. mar', visninger: 16 },
      { dag: '22. mar', visninger: 21 },
      { dag: '23. mar', visninger: 12 },
    ],
    trafikkkilder: [
      { kilde: 'Tomtly.no – direkte', prosent: 38, visninger: 94 },
      { kilde: 'Google søk', prosent: 24, visninger: 59 },
      { kilde: 'Facebook-annonse', prosent: 18, visninger: 44 },
      { kilde: 'E-postkampanje', prosent: 12, visninger: 30 },
      { kilde: 'Annet / delt lenke', prosent: 8, visninger: 20 },
    ],
    markedsforing: [
      { kanal: 'Tomtly.no', status: 'Publisert', detalj: '247 visninger totalt', ikon: '🌐', farge: 'bg-forest-50 border-forest-200' },
      { kanal: 'Annonsering', status: 'Aktiv kampanje', detalj: '12 400 rekkevidde · 186 klikk', ikon: '📣', farge: 'bg-blue-50 border-blue-200' },
      { kanal: 'E-postliste', status: 'Sendt', detalj: 'Sendt til 342 registrerte kjøpere', ikon: '📧', farge: 'bg-purple-50 border-purple-200' },
    ],
    dokumenter: [
      { navn: 'Tomterapport', type: 'PDF', dato: '20. mars 2026', ikon: '📄' },
      { navn: 'Budskjema', type: 'PDF', dato: '16. mars 2026', ikon: '📝' },
      { navn: 'Reguleringsbestemmelser', type: 'PDF', dato: '10. mars 2026', ikon: '📋' },
    ],
    fremdrift: [
      { steg: 'Tomt registrert', status: 'done' },
      { steg: 'Tomterapport ferdigstilt', status: 'done' },
      { steg: 'Publisert på Tomtly.no', status: 'done' },
      { steg: 'Annonsekampanje startet', status: 'done' },
      { steg: 'Motta visningsforespørsler', status: 'current' },
      { steg: 'Gjennomfør visninger', status: 'future' },
      { steg: 'Motta bud', status: 'future' },
      { steg: 'Aksepter bud', status: 'future' },
      { steg: 'Oppgjør via Propr', status: 'future' },
      { steg: 'Overlevering', status: 'future' },
    ],
    sammenlignbare: [
      { adresse: 'Eksempelveien 5', areal: 780, pris: 2600000, dato: 'Jan 2026' },
      { adresse: 'Demogate 12', areal: 920, pris: 3100000, dato: 'Des 2025' },
    ],
    pakkeBeskrivelse: 'Komplett analyse, markedsføring og salg via autorisert Eiendomsekspert. Inkluderer tomterapport, annonsering og interessenthåndtering.',
    pakkeFeatures: ['Tomterapport', 'Mulighetsstudie', 'Profesjonelle bilder', 'Annonsering', 'Eiendomsekspert-støtte', 'Oppgjør via Propr'],
    pakkePris: '4 990 kr',
    pakkeProvisjon: '+ 2,5 % ved salg',
    tomtepresentasjonLink: '#',
    shareUrl: 'tomtly.no/tomt/demo',
  },
}

// ─── Shared Constants ───────────────────────────────────────────────────────

const STATUS_LABELS: Record<InteressentStatus, string> = {
  ny: 'Ny',
  kontaktet: 'Kontaktet',
  visning_avtalt: 'Visning avtalt',
  bud_mottatt: 'Bud mottatt',
}

const STATUS_COLORS: Record<InteressentStatus, string> = {
  ny: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  kontaktet: 'bg-blue-100 text-blue-800 border-blue-300',
  visning_avtalt: 'bg-green-100 text-green-800 border-green-300',
  bud_mottatt: 'bg-purple-100 text-purple-800 border-purple-300',
}

const TIPS = [
  {
    tittel: 'Svar raskt på forespørsler',
    tekst: 'Interessenter som får svar innen 2 timer har 3x høyere sannsynlighet for å booke visning. Du har 2 ubesvarte forespørsler.',
    prioritet: 'hoy' as const,
  },
  {
    tittel: 'Vurder å senke prisantydning',
    tekst: 'Tomter på Nesodden med lignende areal selges i snitt for 2 650 000 kr. En prisjustering kan øke interessen.',
    prioritet: 'medium' as const,
  },
  {
    tittel: 'Del tomten på sosiale medier',
    tekst: 'Tomter som deles aktivt på Facebook og Instagram får i snitt 40% flere visninger den første måneden.',
    prioritet: 'lav' as const,
  },
]

type NavSection = 'oversikt' | 'interessenter' | 'statistikk' | 'dokumenter' | 'innstillinger'

const NAV_ITEMS: { id: NavSection; label: string; ikon: string }[] = [
  { id: 'oversikt', label: 'Oversikt', ikon: '📊' },
  { id: 'interessenter', label: 'Interessenter', ikon: '👥' },
  { id: 'statistikk', label: 'Statistikk', ikon: '📈' },
  { id: 'dokumenter', label: 'Dokumenter', ikon: '📁' },
  { id: 'innstillinger', label: 'Innstillinger', ikon: '⚙️' },
]

// ─── Main Component ─────────────────────────────────────────────────────────

export default function SelgerDashboard() {
  const params = useParams()
  const tomtId = (params?.tomtId as string) || 'demo123'
  const data = CASES[tomtId] || CASES['demo123']

  const [activeNav, setActiveNav] = useState<NavSection>('oversikt')
  const [expandedInteressent, setExpandedInteressent] = useState<number | null>(null)
  const [interessentStatuser, setInteressentStatuser] = useState<Record<number, InteressentStatus>>(
    Object.fromEntries(data.interessenter.map((i) => [i.id, i.status]))
  )
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [shareKopiert, setShareKopiert] = useState(false)
  const [tomtlyHaandterer, setTomtlyHaandterer] = useState(false)
  const [kopierteForslag, setKopierteForslag] = useState<Record<number, boolean>>({})

  const harBud = Object.values(interessentStatuser).includes('bud_mottatt')

  const maxVisninger = data.trafikk.length > 0 ? Math.max(...data.trafikk.map((d) => d.visninger)) : 1
  const totalVisninger = data.trafikk.reduce((sum, d) => sum + d.visninger, 0)
  const gjennomsnitt = data.trafikk.length > 0 ? Math.round(totalVisninger / data.trafikk.length) : 0
  const besteDag = data.trafikk.length > 0 ? data.trafikk.reduce((best, d) => (d.visninger > best.visninger ? d : best)) : { dag: '-', visninger: 0 }

  function updateStatus(id: number, status: InteressentStatus) {
    setInteressentStatuser((prev) => ({ ...prev, [id]: status }))
  }

  function handleShare() {
    navigator.clipboard.writeText(`https://${data.shareUrl}`).then(() => {
      setShareKopiert(true)
      setTimeout(() => setShareKopiert(false), 2000)
    })
  }

  function handleKopierForslag(interessentId: number, tekst: string) {
    navigator.clipboard.writeText(tekst).then(() => {
      setKopierteForslag((prev) => ({ ...prev, [interessentId]: true }))
      setTimeout(() => setKopierteForslag((prev) => ({ ...prev, [interessentId]: false })), 2000)
    })
  }

  const QUICK_ACTIONS = [
    { label: shareKopiert ? 'Kopiert!' : 'Del tomteprofil', ikon: shareKopiert ? '✅' : '🔗', beskrivelse: shareKopiert ? `https://${data.shareUrl}` : 'Kopier lenke til tomtens profil på Tomtly.no', onClick: handleShare },
    { label: 'Inviter til visning', ikon: '📅', beskrivelse: 'Send visningsinvitasjon til interessenter', onClick: () => {} },
    { label: 'Last opp dokument', ikon: '📎', beskrivelse: 'Legg til nytt dokument i dokumentarkivet', onClick: () => {} },
    { label: 'Kontakt Eiendomsekspert', ikon: '🏠', beskrivelse: 'Send melding til din Eiendomsekspert hos Tomtly', onClick: () => {} },
  ]

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex min-h-screen">
      {/* ── Mobile sidebar toggle ──────────────────────────────────────────── */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-tomtly-dark text-white p-2 rounded-lg shadow-lg"
        aria-label="Åpne meny"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-tomtly-dark text-white flex flex-col
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold tracking-tight text-white">Tomtly</span>
          </Link>
          <p className="text-xs text-white/50 mt-1">Selger Dashboard</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id)
                setSidebarOpen(false)
              }}
              className={`
                w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors text-left
                ${activeNav === item.id
                  ? 'bg-white/10 text-white border-r-2 border-tomtly-gold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }
              `}
            >
              <span className="text-lg">{item.ikon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="p-6 border-t border-white/10">
          <p className="text-xs text-white/40 leading-relaxed">
            Trenger hjelp?
            <br />
            <a href="mailto:hey@nops.no" className="text-tomtly-gold hover:underline">
              hey@nops.no
            </a>
          </p>
        </div>
      </aside>

      {/* ── Mobile overlay ─────────────────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Main Content ───────────────────────────────────────────────────── */}
      <main className="flex-1 min-w-0">

        {/* ── Top Bar ────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-20 bg-white border-b border-brand-200 px-4 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-display font-bold text-tomtly-dark">
                {data.adresse}
              </h1>
              <p className="text-sm text-brand-500">{data.kommune} · {data.areal} m² · GNR {data.gnr} / BNR {data.bnr}</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                data.status === 'aktiv'
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-blue-100 text-blue-800 border-blue-300'
              }`}>
                {data.status === 'aktiv' && <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />}
                {data.statusLabel}
              </span>
              <span className="text-xs text-brand-500 bg-brand-100 px-3 py-1 rounded-full">
                Publisert {data.publisert}
              </span>
              <span className="text-xs text-tomtly-accent bg-forest-50 px-3 py-1 rounded-full font-medium border border-forest-200">
                {data.pakke}
              </span>
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-8 py-6 max-w-6xl">

          {/* ── Key Metrics ──────────────────────────────────────────────── */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Visninger', ...data.metrics.visninger },
              { label: 'Interessenter', ...data.metrics.interessenter },
              { label: 'Visningsforespørsler', ...data.metrics.visningsforesporsler },
              { label: 'Tomtescore', ...data.metrics.tomtescore },
            ].map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-xl border border-brand-200 p-5 hover:shadow-md transition-shadow"
              >
                <p className="text-xs font-medium text-brand-500 uppercase tracking-wide mb-1">
                  {m.label}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-tomtly-dark font-mono">
                  {m.tall}
                </p>
                <p className={`text-xs mt-1 ${m.trend === 'up' ? 'text-green-600' : 'text-brand-400'}`}>
                  {m.trend === 'up' && '↑ '}{m.endring}
                </p>
              </div>
            ))}
          </section>

          {/* ── Quick Actions ────────────────────────────────────────────── */}
          <section className="mb-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {QUICK_ACTIONS.map((a) => (
                <button
                  key={a.label}
                  onClick={a.onClick}
                  className="bg-white rounded-xl border border-brand-200 p-4 hover:shadow-md hover:border-forest-300 transition-all text-left group"
                >
                  <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform inline-block">
                    {a.ikon}
                  </span>
                  <p className="text-sm font-medium text-tomtly-dark mb-0.5">{a.label}</p>
                  <p className="text-xs text-brand-400 leading-relaxed">{a.beskrivelse}</p>
                </button>
              ))}
            </div>
          </section>

          {/* ── La Tomtly håndtere forespørsler ────────────────────────── */}
          <section className="mb-8">
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-tomtly-dark mb-0.5">La Tomtly håndtere forespørsler</p>
                  <p className="text-xs text-brand-400">
                    {tomtlyHaandterer
                      ? 'Tomtly Eiendomsekspert svarer på vegne av deg'
                      : 'Du håndterer forespørsler selv'}
                  </p>
                </div>
                <button
                  onClick={() => setTomtlyHaandterer(!tomtlyHaandterer)}
                  className={`
                    w-12 h-7 rounded-full flex items-center px-0.5 cursor-pointer transition-colors
                    ${tomtlyHaandterer ? 'bg-tomtly-accent' : 'bg-brand-200'}
                  `}
                >
                  <div
                    className={`
                      w-6 h-6 rounded-full bg-white shadow-sm transition-transform
                      ${tomtlyHaandterer ? 'translate-x-5' : 'translate-x-0'}
                    `}
                  />
                </button>
              </div>
              {tomtlyHaandterer && (
                <div className="mt-3 pt-3 border-t border-brand-100">
                  <p className="text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                    Tomtly Eiendomsekspert vil svare på alle nye forespørsler innen 2 timer. Du kan se alle svar i aktivitetsloggen.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ── Tips / Neste steg ─────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Anbefalinger
            </h2>
            <div className="space-y-3">
              {TIPS.map((tip, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl border p-4 flex items-start gap-4 ${
                    tip.prioritet === 'hoy'
                      ? 'bg-red-50 border-red-200'
                      : tip.prioritet === 'medium'
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-brand-50 border-brand-200'
                  }`}
                >
                  <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                    tip.prioritet === 'hoy'
                      ? 'bg-red-500'
                      : tip.prioritet === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-brand-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-tomtly-dark mb-0.5">{tip.tittel}</p>
                    <p className="text-xs text-brand-500 leading-relaxed">{tip.tekst}</p>
                  </div>
                  <button className="flex-shrink-0 text-xs font-medium text-tomtly-accent hover:underline mt-0.5">
                    Se mer
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Activity Feed ────────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Aktivitet
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 divide-y divide-brand-100">
              {data.aktiviteter.map((a) => (
                <div key={a.id} className="px-5 py-4 flex items-start gap-4 hover:bg-brand-50 transition-colors">
                  <span className="text-xl mt-0.5 flex-shrink-0">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-tomtly-dark leading-relaxed">{a.tekst}</p>
                    <p className="text-xs text-brand-400 mt-1">{a.tid}</p>
                  </div>
                  {a.harHandling && (
                    <button className="flex-shrink-0 text-xs font-medium text-tomtly-accent bg-forest-50 hover:bg-forest-100 border border-forest-200 px-3 py-1.5 rounded-lg transition-colors">
                      Svar
                    </button>
                  )}
                </div>
              ))}
              {data.aktiviteter.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-brand-400">Ingen aktivitet ennå. Aktivitet vises her etter publisering.</p>
                </div>
              )}
            </div>
          </section>

          {/* ── Interessenter Table ──────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Interessenter
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              {/* Table header */}
              <div className="hidden sm:grid sm:grid-cols-[1fr_120px_100px_140px_50px] gap-4 px-5 py-3 bg-brand-50 border-b border-brand-200 text-xs font-medium text-brand-500 uppercase tracking-wide">
                <span>Navn</span>
                <span>Type</span>
                <span>Dato</span>
                <span>Status</span>
                <span />
              </div>

              {/* Table rows */}
              {data.interessenter.map((i) => {
                const currentStatus = interessentStatuser[i.id] || i.status
                const isExpanded = expandedInteressent === i.id

                return (
                  <div key={i.id} className="border-b border-brand-100 last:border-0">
                    {/* Main row */}
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_100px_140px_50px] gap-2 sm:gap-4 px-5 py-4 items-center hover:bg-brand-50 transition-colors">
                      <div>
                        <p className="text-sm font-medium text-tomtly-dark">{i.navn}</p>
                        <p className="text-xs text-brand-400 sm:hidden">{i.type} · {i.dato}</p>
                      </div>
                      <span className="hidden sm:block text-sm text-brand-600">{i.type}</span>
                      <span className="hidden sm:block text-sm text-brand-500">{i.dato.slice(5)}</span>
                      <div>
                        <select
                          value={currentStatus}
                          onChange={(e) => updateStatus(i.id, e.target.value as InteressentStatus)}
                          className={`text-xs font-medium px-2.5 py-1 rounded-full border cursor-pointer appearance-none ${STATUS_COLORS[currentStatus]}`}
                        >
                          {(Object.keys(STATUS_LABELS) as InteressentStatus[]).map((s) => (
                            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={() => setExpandedInteressent(isExpanded ? null : i.id)}
                        className="text-brand-400 hover:text-tomtly-dark transition-colors text-sm"
                        aria-label="Vis detaljer"
                      >
                        {isExpanded ? '▲' : '▼'}
                      </button>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && (
                      <div className="px-5 pb-4 bg-brand-50 animate-fade-up">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-xs text-brand-400 mb-1">Telefon</p>
                            <p className="text-tomtly-dark font-mono">{i.telefon}</p>
                          </div>
                          <div>
                            <p className="text-xs text-brand-400 mb-1">E-post</p>
                            <p className="text-tomtly-dark">{i.epost}</p>
                          </div>
                          <div>
                            <p className="text-xs text-brand-400 mb-1">Notat</p>
                            <p className="text-brand-600">{i.notat}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <a
                            href={`tel:${i.telefon.replace(/\s/g, '')}`}
                            className="text-xs bg-tomtly-accent text-white px-3 py-1.5 rounded-lg hover:bg-forest-600 transition-colors"
                          >
                            Ring
                          </a>
                          <a
                            href={`mailto:${i.epost}`}
                            className="text-xs bg-white border border-brand-200 text-tomtly-dark px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                          >
                            Send e-post
                          </a>
                        </div>

                        {/* Foreslått svar / AI auto-reply */}
                        {i.foreslattSvar && (
                          <div className="mt-4 pt-4 border-t border-brand-200">
                            <p className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-2">Foreslått svar</p>
                            <div className="bg-white border border-brand-200 rounded-lg p-3">
                              <p className="text-xs text-brand-600 leading-relaxed">{i.foreslattSvar}</p>
                            </div>
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleKopierForslag(i.id, i.foreslattSvar || '')}
                                className="text-xs font-medium bg-white border border-brand-200 text-tomtly-dark px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors"
                              >
                                {kopierteForslag[i.id] ? 'Kopiert!' : 'Kopier svar'}
                              </button>
                              <button
                                onClick={() => setTomtlyHaandterer(true)}
                                className="text-xs font-medium bg-tomtly-accent text-white px-3 py-1.5 rounded-lg hover:bg-forest-600 transition-colors"
                              >
                                La Tomtly håndtere
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}

              {data.interessenter.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-brand-400">Ingen interessenter ennå. Interessenter vises her etter publisering og markedsføring.</p>
                </div>
              )}
            </div>
          </section>

          {/* ── Traffic Chart (CSS-based) ────────────────────────────────── */}
          {data.trafikk.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
                Trafikk siste 14 dager
              </h2>
              <div className="bg-white rounded-xl border border-brand-200 p-5">
                {/* Bar chart */}
                <div className="flex items-end gap-1 sm:gap-2 h-40 mb-4">
                  {data.trafikk.map((d, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-[10px] font-mono text-brand-400">{d.visninger}</span>
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-forest-500 to-forest-300 transition-all duration-300 hover:from-tomtly-accent hover:to-forest-400"
                        style={{ height: `${(d.visninger / maxVisninger) * 100}%` }}
                      />
                      <span className="text-[9px] text-brand-400 whitespace-nowrap hidden sm:block">
                        {d.dag.slice(0, 6)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-brand-100">
                  <div>
                    <p className="text-xs text-brand-400">Totalt</p>
                    <p className="text-lg font-bold font-mono text-tomtly-dark">{totalVisninger}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Gjennomsnitt/dag</p>
                    <p className="text-lg font-bold font-mono text-tomtly-dark">{gjennomsnitt}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Beste dag</p>
                    <p className="text-lg font-bold font-mono text-tomtly-dark">{besteDag.visninger} <span className="text-xs font-normal text-brand-400">({besteDag.dag})</span></p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Trend</p>
                    <p className="text-lg font-bold text-green-600">↑ Stigende</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── Traffic Sources ──────────────────────────────────────────── */}
          {data.trafikkkilder.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
                Trafikkilder
              </h2>
              <div className="bg-white rounded-xl border border-brand-200 p-5">
                <div className="space-y-3">
                  {data.trafikkkilder.map((s) => (
                    <div key={s.kilde}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-tomtly-dark">{s.kilde}</span>
                        <span className="text-sm font-mono text-brand-500">
                          {s.visninger} <span className="text-xs text-brand-400">({s.prosent}%)</span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-brand-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-forest-400 to-forest-600 transition-all duration-500"
                          style={{ width: `${s.prosent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-brand-100">
                  <p className="text-xs text-brand-400">
                    Totalt {data.metrics.visninger.tall} visninger fra {data.trafikkkilder.length} kilder.
                    Hovedkilden er direkte trafikk til Tomtly.no.
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ── Property Summary Card ────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Tomtedetaljer
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-100">
                {/* Column 1: Regulering */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
                    Regulering
                  </h3>
                  <div>
                    <p className="text-xs text-brand-400">Formål</p>
                    <p className="text-sm text-tomtly-dark">{data.tomtDetaljer.regulering}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Utnyttelsesgrad</p>
                    <p className="text-sm text-tomtly-dark font-mono">{data.tomtDetaljer.utnyttelsesgrad}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Maks byggehøyde</p>
                    <p className="text-sm text-tomtly-dark font-mono">{data.tomtDetaljer.maksHoyde}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Matrikkel</p>
                    <p className="text-sm text-tomtly-dark font-mono">{data.tomtDetaljer.matrikkel}</p>
                  </div>
                </div>

                {/* Column 2: Infrastruktur */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
                    Infrastruktur
                  </h3>
                  <div>
                    <p className="text-xs text-brand-400">Vann</p>
                    <p className="text-sm text-tomtly-dark">{data.tomtDetaljer.vann}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Avløp</p>
                    <p className="text-sm text-tomtly-dark">{data.tomtDetaljer.avlop}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Adkomst</p>
                    <p className="text-sm text-tomtly-dark">{data.tomtDetaljer.adkomst}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Grunnforhold</p>
                    <p className="text-sm text-tomtly-dark">{data.tomtDetaljer.grunnforhold}</p>
                  </div>
                </div>

                {/* Column 3: Økonomi & forhold */}
                <div className="p-5 space-y-3">
                  <h3 className="text-xs font-semibold text-brand-500 uppercase tracking-wide">
                    Økonomi & forhold
                  </h3>
                  <div>
                    <p className="text-xs text-brand-400">Prisantydning</p>
                    <p className="text-sm text-tomtly-dark font-bold font-mono">{data.tomtDetaljer.prisantydning}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Kommunale avgifter</p>
                    <p className="text-sm text-tomtly-dark font-mono">{data.tomtDetaljer.kommunaleAvgifter}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Solforhold</p>
                    <p className="text-sm text-tomtly-dark">{data.tomtDetaljer.solforhold}</p>
                  </div>
                  <div>
                    <p className="text-xs text-brand-400">Støy</p>
                    <p className="text-sm text-tomtly-dark">{data.tomtDetaljer.stoy}</p>
                  </div>
                </div>
              </div>

              {/* View public profile link */}
              <div className="border-t border-brand-100 px-5 py-3 bg-brand-50 flex items-center justify-between">
                <p className="text-xs text-brand-400">
                  Denne informasjonen vises til interessenter på tomteprofilen.
                </p>
                <Link
                  href={data.tomtepresentasjonLink}
                  className="text-xs font-medium text-tomtly-accent hover:underline flex items-center gap-1"
                >
                  Se tomtepresentasjon
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M3 9L9 3M9 3H4.5M9 3v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* ── Marketing Status ─────────────────────────────────────────── */}
          {data.markedsforing.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
                Markedsføring
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {data.markedsforing.map((m) => (
                  <div
                    key={m.kanal}
                    className={`rounded-xl border p-5 ${m.farge}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{m.ikon}</span>
                      <span className="text-sm font-semibold text-tomtly-dark">{m.kanal}</span>
                    </div>
                    <p className="text-xs font-medium text-green-700 mb-1">{m.status}</p>
                    <p className="text-xs text-brand-500">{m.detalj}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Documents ────────────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Dokumenter
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 divide-y divide-brand-100">
              {data.dokumenter.map((d) => (
                <div key={d.navn} className="flex items-center justify-between px-5 py-3.5 hover:bg-brand-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{d.ikon}</span>
                    <div>
                      <p className="text-sm font-medium text-tomtly-dark">{d.navn}</p>
                      <p className="text-xs text-brand-400">{d.type} · {d.dato}</p>
                    </div>
                  </div>
                  <button className="text-xs font-medium text-tomtly-accent bg-forest-50 hover:bg-forest-100 border border-forest-200 px-3 py-1.5 rounded-lg transition-colors">
                    Last ned
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* ── Progress Checklist ────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Fremdrift
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <div className="space-y-0">
                {data.fremdrift.map((s, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    {/* Vertical line + indicator */}
                    <div className="flex flex-col items-center">
                      {s.status === 'done' && (
                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M3 7l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                      {s.status === 'current' && (
                        <div className="w-7 h-7 rounded-full bg-tomtly-accent flex items-center justify-center flex-shrink-0 relative">
                          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                          <div className="absolute inset-0 rounded-full border-2 border-tomtly-accent animate-ping opacity-30" />
                        </div>
                      )}
                      {s.status === 'future' && (
                        <div className="w-7 h-7 rounded-full bg-brand-200 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-brand-400" />
                        </div>
                      )}
                      {/* Connector line */}
                      {idx < data.fremdrift.length - 1 && (
                        <div
                          className={`w-0.5 h-6 ${
                            s.status === 'done' ? 'bg-green-400' : s.status === 'current' ? 'bg-tomtly-accent/30' : 'bg-brand-200'
                          }`}
                        />
                      )}
                    </div>
                    {/* Label */}
                    <p
                      className={`text-sm pt-1 ${
                        s.status === 'done'
                          ? 'text-brand-500 line-through'
                          : s.status === 'current'
                            ? 'text-tomtly-dark font-semibold'
                            : 'text-brand-400'
                      }`}
                    >
                      {s.steg}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Oppgjør Section (visible when bud_mottatt) ───────────────── */}
          {harBud && (
            <section className="mb-8 animate-fade-up">
              <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
                Oppgjør
              </h2>
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl border border-purple-200 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <p className="text-sm text-brand-600 mb-1">
                      Du har mottatt bud. Når bud er akseptert kan du starte oppgjør digitalt via Propr.
                    </p>
                    <p className="text-xs text-brand-400">
                      Propr håndterer trygt oppgjør, tinglysning og overføring av eiendom.
                    </p>
                  </div>
                  <a
                    href="https://propr.no"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors flex-shrink-0"
                  >
                    Start oppgjør via Propr
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>
            </section>
          )}

          {/* ── Comparable Sales ────────────────────────────────────────── */}
          {data.sammenlignbare.length > 0 && (
            <section className="mb-8">
              <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
                Sammenlignbare salg i området
              </h2>
              <div className="bg-white rounded-xl border border-brand-200 overflow-hidden">
                <div className="hidden sm:grid sm:grid-cols-[1fr_100px_100px_120px_100px] gap-4 px-5 py-3 bg-brand-50 border-b border-brand-200 text-xs font-medium text-brand-500 uppercase tracking-wide">
                  <span>Adresse</span>
                  <span>Areal</span>
                  <span>Solgt for</span>
                  <span>Kr/m²</span>
                  <span>Dato</span>
                </div>
                {data.sammenlignbare.map((s, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-[1fr_100px_100px_120px_100px] gap-1 sm:gap-4 px-5 py-3 border-b border-brand-100 last:border-0 hover:bg-brand-50 transition-colors"
                  >
                    <p className="text-sm text-tomtly-dark font-medium">{s.adresse}</p>
                    <p className="text-sm text-brand-600 font-mono">{s.areal} m²</p>
                    <p className="text-sm text-tomtly-dark font-mono">{(s.pris / 1000000).toFixed(1)}M</p>
                    <p className="text-sm text-brand-500 font-mono">
                      {Math.round(s.pris / s.areal).toLocaleString('nb-NO')} kr
                    </p>
                    <p className="text-sm text-brand-400">{s.dato}</p>
                  </div>
                ))}
                <div className="px-5 py-3 bg-brand-50 border-t border-brand-200">
                  <p className="text-xs text-brand-400">
                    Gjennomsnittlig m²-pris på Nesodden: <span className="font-mono font-semibold text-tomtly-dark">3 310 kr/m²</span>.
                    Din tomt: <span className="font-mono font-semibold text-tomtly-dark">{Math.round(data.pris / data.areal).toLocaleString('nb-NO')} kr/m²</span> (prisantydning).
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ── Notification Preferences ──────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Varsler og kontaktpreferanser
            </h2>
            <div className="bg-white rounded-xl border border-brand-200 p-5">
              <div className="space-y-4">
                {[
                  { label: 'Nye interessenter', beskrivelse: 'Få varsel når noen registrerer interesse', aktiv: true },
                  { label: 'Visningsforespørsler', beskrivelse: 'Bli varslet om nye forespørsler om visning', aktiv: true },
                  { label: 'Ukentlig rapport', beskrivelse: 'Motta sammendrag med statistikk hver mandag', aktiv: true },
                  { label: 'Markedsføringsoppdateringer', beskrivelse: 'Statusendringer for annonsekampanjer', aktiv: false },
                  { label: 'Prisendringer i området', beskrivelse: 'Varsle når sammenlignbare tomter endrer pris', aktiv: false },
                ].map((v, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium text-tomtly-dark">{v.label}</p>
                      <p className="text-xs text-brand-400">{v.beskrivelse}</p>
                    </div>
                    <div
                      className={`
                        w-10 h-6 rounded-full flex items-center px-0.5 cursor-pointer transition-colors
                        ${v.aktiv ? 'bg-tomtly-accent' : 'bg-brand-200'}
                      `}
                    >
                      <div
                        className={`
                          w-5 h-5 rounded-full bg-white shadow-sm transition-transform
                          ${v.aktiv ? 'translate-x-4' : 'translate-x-0'}
                        `}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-brand-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-tomtly-dark">E-post for varsler</p>
                    <p className="text-xs text-brand-400 font-mono">{data.selger.epost}</p>
                  </div>
                  <button className="text-xs font-medium text-tomtly-accent hover:underline">
                    Endre
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── Your Package ──────────────────────────────────────────────── */}
          <section className="mb-8">
            <h2 className="text-lg font-display font-semibold text-tomtly-dark mb-4">
              Din pakke
            </h2>
            <div className="bg-gradient-to-br from-forest-50 to-white rounded-xl border border-forest-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🌲</span>
                    <h3 className="text-lg font-display font-bold text-tomtly-dark">
                      {data.pakke}
                    </h3>
                  </div>
                  <p className="text-sm text-brand-600 mb-3 max-w-md">
                    {data.pakkeBeskrivelse}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {data.pakkeFeatures.map((f) => (
                      <span
                        key={f}
                        className="text-xs bg-forest-100 text-forest-700 px-2.5 py-1 rounded-full border border-forest-200"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-brand-400">Fastpris</p>
                  <p className="text-2xl font-bold font-mono text-tomtly-dark">{data.pakkePris}</p>
                  <p className="text-xs text-brand-400 mt-0.5">{data.pakkeProvisjon}</p>
                </div>
              </div>
              {/* Insurance clause */}
              <div className="mt-4 pt-4 border-t border-forest-200">
                <p className="text-xs text-brand-500 leading-relaxed">
                  Ved oppsigelse av markedsføringspakken gjelder markedsføringsgebyret (2%) fortsatt dersom eiendommen selges innen 3 måneder etter oppsigelsesdato.
                </p>
              </div>
            </div>
          </section>

          {/* ── Footer spacer ────────────────────────────────────────────── */}
          <div className="pb-12" />
        </div>
      </main>
    </div>
  )
}
