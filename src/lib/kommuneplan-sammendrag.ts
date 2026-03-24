// Forhåndsgenererte KI-oppsummeringer av kommuneplanbestemmelser
// Disse lastes raskt uten API-kall

export interface KommuneplanSammendrag {
  kommunenummer: string
  kommunenavn: string
  planNavn: string
  planId: string
  iKraft: string
  sammendrag: string
  nokkeltall: {
    label: string
    verdi: string
  }[]
  viktigeBestemmelser: string[]
}

export const KOMMUNEPLAN_SAMMENDRAG: Record<string, KommuneplanSammendrag> = {
  '3212': {
    kommunenummer: '3212',
    kommunenavn: 'Nesodden',
    planNavn: 'Kommuneplan 2022–2046',
    planId: 'KP2021',
    iKraft: '2023-06-15',
    sammendrag: 'Kommuneplanens arealdel for Nesodden 2022–2046 legger opp til moderat fortetting i eksisterende tettstedsområder, med fokus på bærekraftig utvikling og bevaring av grøntstruktur. Byggeområder er konsentrert rundt Tangen, Nesoddtangen og Fagerstrand. Spredt boligbebyggelse tillates i LNF-områder med strenge begrensninger.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks mønehøyde', verdi: '9–10 m' },
      { label: 'Maks etasjer', verdi: '2 (3 i sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
      { label: 'Uteoppholdsareal', verdi: 'Min. 50 m² per boenhet' },
    ],
    viktigeBestemmelser: [
      'Byggeområder i tettstedsområder krever detaljregulering før bygging',
      'LNF-områder: Spredt boligbebyggelse kan tillates med særskilte bestemmelser',
      'Byggegrense mot sjø: 100 meter i 100-metersbeltet, 50 meter for næring',
      'Kulturminner og kulturmiljøer skal bevares',
      'Krav om overvannshåndtering for alle nye tiltak',
      'Energikrav: Minimum passivhusnivå for nye boliger i sentrumsområder',
      'Universell utforming kreves for alle nye boliger',
    ],
  },
  '3024': {
    kommunenummer: '3024',
    kommunenavn: 'Bærum',
    planNavn: 'Kommuneplanens arealdel 2022–2042',
    planId: 'KPA2022',
    iKraft: '2023-03-22',
    sammendrag: 'Bærum kommune har en arealdel som prioriterer fortetting langs kollektivakser (Sandvika, Lysaker, Bekkestua, Høvik). Småhusområder har strenge begrensninger mot fortetting. Markagrensen og sjønære områder er sterkt vernet. Høy utnyttelse tillates i utviklingsområder.',
    nokkeltall: [
      { label: 'Maks BYA småhus', verdi: '20–24%' },
      { label: 'Maks BYA fortetting', verdi: '40–60%' },
      { label: 'Maks gesimshøyde', verdi: '8 m (småhus), 15–22 m (fortetting)' },
      { label: 'Maks etasjer småhus', verdi: '2' },
      { label: 'Parkering', verdi: '0,5–1,5 plasser/boenhet (avhengig av nærhet til kollektiv)' },
      { label: 'Uteoppholdsareal', verdi: 'Min. 25–50 m² per boenhet' },
    ],
    viktigeBestemmelser: [
      'Småhusplanen (S-4220) gjelder for store deler av villaområdene',
      'Fortetting i småhusområder krever dispensasjon eller omregulering',
      'Krav om klimagassregnskap for større utbyggingsprosjekter',
      'Universell utforming og tilgjengelighet i alle nye prosjekter',
      'Bevaring av grøntstruktur og 100-metersbeltet langs sjøen',
      'Støykrav: Krav om stille side for boliger langs hovedveier',
    ],
  },
  '3025': {
    kommunenummer: '3025',
    kommunenavn: 'Asker',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-11-15',
    sammendrag: 'Asker kommune fokuserer på knutepunktsutvikling rundt Asker sentrum, Heggedal og Holmen. Småhusområder har begrensninger mot fortetting. LNF-områder har strenge regler. Nye boligområder skal ha grønn mobilitet og lav bilbruk.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m (bolig), opp til 21 m (sentrum)' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–7 (sentrum)' },
      { label: 'Parkering', verdi: '0,5–2 plasser/boenhet' },
      { label: 'Uteoppholdsareal', verdi: 'Min. 30–50 m² per boenhet' },
    ],
    viktigeBestemmelser: [
      'Alle nye tiltak over 10 boenheter krever detaljregulering',
      'Krav om overvannshåndtering og blågrønn infrastruktur',
      'Kulturminner skal bevares – meldeplikt til Akershus fylkeskommune',
      'LNF-områder: Kun eksisterende landbruk og nødvendige tiltak',
      'Krav om grønn mobilitet i nye boligfelt',
    ],
  },
  '3214': {
    kommunenummer: '3214',
    kommunenavn: 'Frogn',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-20',
    sammendrag: 'Frogn kommune (Drøbak) prioriterer utvikling i Drøbak sentrum og Seiersten. Bevaring av Drøbak trehusby er sentralt. Sjønære områder har strenge byggeforbud. Fradeling av tomter kan tillates i visse boligområder.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7 m' },
      { label: 'Maks mønehøyde', verdi: '9 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Drøbak trehusby: Strenge bestemmelser for fasadeendring og nybygg',
      'Byggegrense mot sjø: 100 meter',
      'Fradeling kan innvilges i etablerte boligområder med tilstrekkelig infrastruktur',
      'Krav om estetisk tilpasning til eksisterende bebyggelse',
    ],
  },
  '3020': {
    kommunenummer: '3020',
    kommunenavn: 'Nordre Follo',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-01',
    sammendrag: 'Nordre Follo (Ski/Kolbotn) satser på fortetting rundt Ski stasjon og Kolbotn sentrum. Småhusområder i Oppegård har begrensninger. Skog og friområder bevares. God kollektivdekning gir lavere parkeringskrav.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '22–30%' },
      { label: 'Maks gesimshøyde', verdi: '8–12 m' },
      { label: 'Maks etasjer', verdi: '2–4 (bolig), 5–8 (sentrum)' },
      { label: 'Parkering', verdi: '0,5–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Fortetting ved knutepunkter prioriteres',
      'Småhusplaner gjelder i store deler av Oppegård',
      'Krav om klimatilpasning og overvannshåndtering',
      'Marka-grensen er absolutt – ingen utbygging i marka',
    ],
  },
  '3005': {
    kommunenummer: '3005',
    kommunenavn: 'Drammen',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-12-01',
    sammendrag: 'Drammen kommune fortetter langs Drammenselva og rundt kollektivknutepunkter. Strenge høydebegrensninger i villastrøk. Kongesberg-aksen og Fjordby-prosjektet er sentrale utviklingsområder.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m (bolig)' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–8 (sentrum)' },
      { label: 'Parkering', verdi: '0,7–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Fjordby-området: Høy utnyttelse tillatt med detaljregulering',
      'Elvesonen: Strenge krav til byggehøyde og estetikk',
      'Krav om universell utforming i alle nye prosjekter',
      'Kulturminner langs Drammenselva skal bevares',
    ],
  },

  '3019': {
    kommunenummer: '3019',
    kommunenavn: 'Vestby',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-11-20',
    sammendrag: 'Vestby kommune legger opp til boligvekst i Vestby sentrum og Son. Spredt bebyggelse i LNF-områder har strenge begrensninger. Kommunen har stor etterspørsel etter tomter nær togstasjonen. Bevaring av kulturlandskap og strandsone er sentralt.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks mønehøyde', verdi: '9,5 m' },
      { label: 'Maks etasjer', verdi: '2 (3 i sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
      { label: 'Uteoppholdsareal', verdi: 'Min. 50 m² per boenhet' },
    ],
    viktigeBestemmelser: [
      'Fortetting i Vestby sentrum og Son prioriteres',
      'Byggegrense mot sjø: 100 meter i 100-metersbeltet',
      'LNF-områder: Spredt boligbebyggelse med strenge vilkår',
      'Krav om overvannshåndtering for alle nye tiltak',
      'Kulturlandskap og jordvern har høy prioritet',
      'Nærhet til togstasjon gir lavere parkeringskrav',
      'Støykrav for boliger langs E6 og jernbane',
    ],
  },

  '0301': {
    kommunenummer: '0301',
    kommunenavn: 'Oslo',
    planNavn: 'Kommuneplan 2015 – Oslo mot 2030',
    planId: 'KP2015',
    iKraft: '2015-09-23',
    sammendrag: 'Oslos kommuneplan legger opp til fortetting langs T-bane og trikkelinjer, med vern av småhusområder gjennom Småhusplanen (S-4220). Indre by har høy utnyttelse, ytre by har lavere. Marka-grensen er absolutt.',
    nokkeltall: [
      { label: 'Maks BYA småhus', verdi: '16–24% (S-4220)' },
      { label: 'Maks gesimshøyde småhus', verdi: '8 m' },
      { label: 'Maks etasjer småhus', verdi: '2' },
      { label: 'Parkering indre by', verdi: '0,2–0,5 plasser/boenhet' },
      { label: 'Parkering ytre by', verdi: '0,8–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Småhusplanen (S-4220) gjelder i store deler av ytre by',
      'Fortetting krever normalt reguleringsplan',
      'Markagrensen: Ingen utbygging i marka',
      'Fjordbyplanen: Høy utnyttelse langs havnefronten',
      'Krav om universell utforming i alle nye prosjekter',
      'Støysoner langs Ring 3 og E6 har strenge krav',
    ],
  },

  '3218': {
    kommunenummer: '3218',
    kommunenavn: 'Ås',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-15',
    sammendrag: 'Ås kommune fortetter rundt Ås sentrum og NMBU-campus. Landbruksområder har sterkt jordvern. Mindre tettstedsområder som Vinterbro og Nordby har begrenset utvikling.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (4 i sentrum)' },
      { label: 'Parkering', verdi: '1–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Sterkt jordvern – fulldyrka jord skal ikke bygges ned',
      'Fortetting ved Ås stasjon prioriteres',
      'NMBU-campus: Eget utviklingsområde',
      'Krav om klimatilpasning og overvannshåndtering',
    ],
  },

}

export function getKommuneplanSammendrag(kommunenummer: string): KommuneplanSammendrag | null {
  return KOMMUNEPLAN_SAMMENDRAG[kommunenummer] || null
}
