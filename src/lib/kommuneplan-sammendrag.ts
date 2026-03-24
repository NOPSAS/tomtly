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
      { label: 'MUA (uteopphold)', verdi: 'Min. 50 m² per boenhet' },
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
  '3201': {
    kommunenummer: '3201',
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
      { label: 'MUA (uteopphold)', verdi: 'Min. 25–50 m² per boenhet' },
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
  '3203': {
    kommunenummer: '3203',
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
      { label: 'MUA (uteopphold)', verdi: 'Min. 30–50 m² per boenhet' },
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
  '3207': {
    kommunenummer: '3207',
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
  '3301': {
    kommunenummer: '3301',
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

  '3216': {
    kommunenummer: '3216',
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
      { label: 'MUA (uteopphold)', verdi: 'Min. 50 m² per boenhet' },
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

  '3232': {
    kommunenummer: '3232',
    kommunenavn: 'Nittedal',
    planNavn: 'Kommuneplanens arealdel 2021–2032',
    planId: 'KPA2021',
    iKraft: '2021-09-13',
    sammendrag: 'Nittedal kommune legger opp til vekst rundt Rotnes/Hagan og Hakadal stasjon. Marka-grensen begrenser utbygging i nord og vest. Kommunen har etterspurte boligområder nær Oslo med god kollektivforbindelse via tog.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–8 m' },
      { label: 'Maks mønehøyde', verdi: '9 m' },
      { label: 'Maks etasjer', verdi: '2 (3 i sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
      { label: 'MUA (uteopphold)', verdi: 'Min. 50 m² per boenhet' },
    ],
    viktigeBestemmelser: [
      'Fortetting rundt Rotnes/Hagan og Hakadal stasjon prioriteres',
      'Markagrensen: Ingen utbygging i marka',
      'Krav om overvannshåndtering for alle nye tiltak',
      'LNF-områder: Spredt bebyggelse med strenge vilkår',
      'Støykrav langs E6 og jernbane',
      'Bevaring av kulturlandskap i Hakadal',
      'Fradeling kan tillates i etablerte boligområder med god infrastruktur',
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

  '3205': {
    kommunenummer: '3205',
    kommunenavn: 'Lillestrøm',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-12-11',
    sammendrag: 'Lillestrøm kommune satser på byutvikling rundt Lillestrøm, Strømmen og Kjeller. Høy tetthet nær stasjoner. Rælingen-delen har villaområder med moderate begrensninger.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–30%' },
      { label: 'Maks gesimshøyde', verdi: '8 m (villa), 15–22 m (sentrum)' },
      { label: 'Maks etasjer', verdi: '2 (villa), 4–8 (sentrum)' },
      { label: 'Parkering', verdi: '0,5–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Fortetting langs Hovedbanen og Kongsvingerbanen',
      'Kjeller flyplass-området: fremtidig byutviklingsområde',
      'Krav om klimagassregnskap for større prosjekter',
      'Støykrav langs E6 og jernbane',
    ],
  },

  '3230': {
    kommunenummer: '3230',
    kommunenavn: 'Gjerdrum',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Gjerdrum kommune har etter kvikkleireskredet i Ask fokus på grunnforhold og sikkerhet. Utvikling konsentreres i Ask sentrum. Strenge krav til geotekniske vurderinger.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–8 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Strenge krav til geoteknisk vurdering ved all bygging',
      'Kvikkleiresonekartlegging kreves',
      'Fortetting i Ask sentrum',
      'LNF: Kun landbruk og nødvendige tiltak',
    ],
  },

  '3209': {
    kommunenummer: '3209',
    kommunenavn: 'Ullensaker',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-25',
    sammendrag: 'Ullensaker (Jessheim) er en vekstkommune med sterk utvikling rundt Gardermoen. Jessheim sentrum fortettes. Kløfta har moderate utviklingsmuligheter. Landbruksarealer har sterkt vern.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8–12 m' },
      { label: 'Maks etasjer', verdi: '2–3 (bolig), 4–6 (sentrum)' },
      { label: 'Parkering', verdi: '1–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Sterk vekst rundt Jessheim stasjon',
      'Gardermoen-nærhet: Støysoner begrenser boligbygging',
      'Jordvern: Matjord skal ikke bygges ned',
      'Krav om detaljregulering for nye boligfelt',
    ],
  },

  '3905': {
    kommunenummer: '3905',
    kommunenavn: 'Tønsberg',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-14',
    sammendrag: 'Tønsberg fortetter i sentrum og langs Kanalen. Bevaring av middelalderbyen er sentralt. Nøtterøy og Tjøme (nå del av Færder) har egne planer. Sjønære områder har strenge byggeforbud.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Middelalderbyen: Strenge bevaringskrav',
      'Byggegrense mot sjø: 100 meter',
      'Kanalområdet: Høy utnyttelse med kvalitetskrav',
      'Kulturminner og kulturmiljøer har høy prioritet',
    ],
  },

  '3907': {
    kommunenummer: '3907',
    kommunenavn: 'Sandefjord',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-18',
    sammendrag: 'Sandefjord kommune (inkl. tidligere Andebu og Stokke) har utvikling langs kysten og rundt sentrum. Gode tomtemuligheter i Andebu og Stokke. Strandsonen er strengt vernet.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Stokke og Andebu: Gode muligheter for boligtomter',
      'Strandsonen: Byggeforbud i 100-metersbeltet',
      'Kulturminner fra vikingtiden skal bevares',
      'Krav om tilpasning til stedlig arkitektur',
    ],
  },

  '3909': {
    kommunenummer: '3909',
    kommunenavn: 'Larvik',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-12-12',
    sammendrag: 'Larvik kommune har utvikling i Larvik sentrum, Stavern og langs E18-korridoren. Bøkeskogen og kulturlandskap bevares. Gode muligheter for boligtomter i ytre områder.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–4 (sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Stavern festningsby: Strenge bevaringskrav',
      'Bøkeskogen: Friluftsområde med vern',
      'E18: Støysoner langs ny motorvei',
      'Jordvern i landbruksområdene',
    ],
  },

  '3901': {
    kommunenummer: '3901',
    kommunenavn: 'Horten',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-10-19',
    sammendrag: 'Horten kommune utvikler sentrum og Karljohansvern-området. Moderat vekst. Åsgårdstrand har streng bevaring. Gode tog-forbindelser til Oslo via Vestfoldbanen.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–8 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Karljohansvern: Utviklingsområde ved sjøen',
      'Åsgårdstrand: Strenge bevaringskrav (Munch)',
      'Vestfoldbanen: Stasjonsnær utvikling prioriteres',
      'Strandsonen: 100 meter byggeforbud',
    ],
  },

  '3103': {
    kommunenummer: '3103',
    kommunenavn: 'Moss',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-11-06',
    sammendrag: 'Moss kommune (inkl. Rygge) satser på utvikling rundt Moss stasjon og Sjøsiden. Ny jernbanetunnel gir muligheter. Jeløy har strenge begrensninger. Rygge har boligpotensial.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–6 (sentrum)' },
      { label: 'Parkering', verdi: '0,8–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Sjøsiden/stasjonsområdet: Ny byutvikling',
      'Jeløy: Strenge begrensninger, bevaring',
      'Rygge flystasjon-området: Mulig fremtidig utvikling',
      'Kvikkleire: Geotekniske krav i deler av kommunen',
    ],
  },

  '3107': {
    kommunenummer: '3107',
    kommunenavn: 'Fredrikstad',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-15',
    sammendrag: 'Fredrikstad fortetter i sentrum og langs Glomma. Gamlebyen er fredet. Kråkerøy og Onsøy har villaområder. Gode tomtemuligheter i utkanten av byen.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Gamlebyen: UNESCO-tentativ, strenge bevaringskrav',
      'Flom langs Glomma: Krav om flomsikring',
      'FMV-området: Byutviklingsprosjekt',
      'Hvaler-forbindelse: Turisme og fritidsboliger',
    ],
  },

  // ── Stor-Oslo og Viken ──

  '3022': {
    kommunenummer: '3022',
    kommunenavn: 'Frogn',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-20',
    sammendrag: 'Frogn (Drøbak) prioriterer utvikling i Drøbak sentrum og Seiersten. Bevaring av trehusbyen er sentralt. Sjønære områder har strenge byggeforbud.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7 m' },
      { label: 'Maks mønehøyde', verdi: '9 m' },
      { label: 'Maks etasjer', verdi: '2' },
    ],
    viktigeBestemmelser: [
      'Drøbak trehusby: Strenge bevaringskrav',
      'Byggegrense mot sjø: 100 meter',
      'Fradeling mulig i etablerte boligområder',
    ],
  },

  '3034': {
    kommunenummer: '3034',
    kommunenavn: 'Nes',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Nes (Årnes) er en landbrukskommune med vekst rundt Årnes sentrum. Sterkt jordvern. Nye boligfelt planlegges nær togstasjonen.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Parkering', verdi: '2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Jordvern på Romerike – fulldyrka jord beskyttes',
      'Fortetting ved Årnes stasjon',
      'LNF: Strenge regler for spredt bebyggelse',
    ],
  },

  '3036': {
    kommunenummer: '3036',
    kommunenavn: 'Nannestad',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-10-16',
    sammendrag: 'Nannestad vokser pga. nærhet til Gardermoen. Utvikling konsentreres i Nannestad sentrum og Maura. Støysoner fra flyplassen begrenser boligbygging i nord.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Gardermoen støysone begrenser boligbygging',
      'Fortetting i Nannestad sentrum og Maura',
      'Jordvern på Romerike',
    ],
  },

  '3028': {
    kommunenummer: '3028',
    kommunenavn: 'Enebakk',
    planNavn: 'Kommuneplanens arealdel 2019–2031',
    planId: 'KPA2019',
    iKraft: '2019-11-18',
    sammendrag: 'Enebakk er en landlig kommune nær Oslo med populære boligområder. Flateby og Ytre Enebakk har størst utvikling. Marka begrenser vekst.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–8 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Parkering', verdi: '2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Marka-grensen begrenser utbygging',
      'Flateby: Største utviklingsområde',
      'Krav om overvannshåndtering',
    ],
  },

  '3040': {
    kommunenummer: '3040',
    kommunenavn: 'Aurskog-Høland',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Aurskog-Høland har rimelige tomter og nærhet til Oslo via E18. Bjørkelangen er kommunesenteret. Populær for de som ønsker mer tomt for pengene.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Parkering', verdi: '2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Rimelige tomtepriser – attraktivt for førstegangskjøpere',
      'Bjørkelangen sentrum: Fortettingsområde',
      'Skog og friluft: Store friluftsområder bevares',
    ],
  },

  // ── Vestfold ──

  '3110': {
    kommunenummer: '3110',
    kommunenavn: 'Holmestrand',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-18',
    sammendrag: 'Holmestrand (inkl. Sande og Hof) utvikler sentrum ved fjorden. Vestfoldbanen gir god forbindelse. Sande har rimelige tomtemuligheter.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (4 i sentrum)' },
      { label: 'Parkering', verdi: '1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Holmestrand sentrum: Kystby-utvikling',
      'Sande: Rimelige tomter med tog-tilgang',
      'Strandsone: 100 meter byggeforbud',
    ],
  },

  // ── Buskerud ──

  '3305': {
    kommunenummer: '3305',
    kommunenavn: 'Ringerike',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-10-16',
    sammendrag: 'Ringerike (Hønefoss) forbereder seg på Ringeriksbanen. Stor utvikling planlegges. Hønefoss sentrum og Sundvollen er fokusområder.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (6 i sentrum)' },
      { label: 'Parkering', verdi: '1–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Ringeriksbanen: Store utviklingsarealer',
      'Flom langs Storelva og Begna',
      'Jordvern på Ringeriksletta',
    ],
  },

  '3310': {
    kommunenummer: '3310',
    kommunenavn: 'Hole',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Hole (Sundvollen/Vik) vil få stor utvikling med Ringeriksbanen. Stasjon på Sundvollen planlegges. Tyrifjorden gir attraktiv beliggenhet.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–8 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Parkering', verdi: '2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Ringeriksbanen: Stasjon på Sundvollen',
      'Tyrifjorden: Attraktiv beliggenhet ved vannet',
      'Krokskogen: Markagrense i vest',
    ],
  },

  // ── Vestland ──

  '4601': {
    kommunenummer: '4601',
    kommunenavn: 'Bergen',
    planNavn: 'Kommuneplanens arealdel 2018–2030',
    planId: 'KPA2018',
    iKraft: '2019-06-19',
    sammendrag: 'Bergen fortetter langs bybanen og i sentrum. Småhusområder i Fana, Åsane og Ytrebygda har moderate begrensninger. Byfjellene og strandsonen er vernet.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–30%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m (småhus)' },
      { label: 'Maks etasjer', verdi: '2 (småhus), 4–8 (fortetting)' },
      { label: 'Parkering', verdi: '0,5–1,5 plasser (avh. av bybane-nærhet)' },
      { label: 'MUA (uteopphold)', verdi: 'Min. 25–50 m² per boenhet' },
    ],
    viktigeBestemmelser: [
      'Fortetting langs bybane-traseen prioriteres',
      'Småhusplaner i Fana, Ytrebygda og Åsane',
      'Byfjellene: Ingen utbygging',
      'Strandsone: 100 meter byggeforbud',
      'Krav om bybane-nærhet for høy utnyttelse',
      'Klimatilpasning: Krav om overvannshåndtering',
    ],
  },

  // ── Rogaland ──

  '1103': {
    kommunenummer: '1103',
    kommunenavn: 'Stavanger',
    planNavn: 'Kommuneplanens arealdel 2023–2040',
    planId: 'KPA2023',
    iKraft: '2023-11-20',
    sammendrag: 'Stavanger fortetter i sentrum og langs bussvei-traseen. Hundvåg, Storhaug og Hillevåg er utviklingsområder. Jåttå og Forus har næringsutvikling.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25% (småhus)' },
      { label: 'Maks gesimshøyde', verdi: '8–9 m' },
      { label: 'Maks etasjer', verdi: '2 (småhus), 3–6 (fortetting)' },
      { label: 'Parkering', verdi: '0,5–1,2 plasser (avh. av kollektiv)' },
    ],
    viktigeBestemmelser: [
      'Bussvei-traseen: Fortetting prioriteres',
      'Trehusbyen: Strenge bevaringskrav i sentrum',
      'Jåttå/Forus: Næringsutvikling, ikke bolig',
      'Hundvåg og Storhaug: Transformasjonsområder',
    ],
  },

  '1108': {
    kommunenummer: '1108',
    kommunenavn: 'Sandnes',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Sandnes er Norges raskest voksende by. Store utbyggingsområder i Ganddal, Lura og Sandved. Jordvern på Jæren begrenser nye felt.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8–10 m' },
      { label: 'Maks etasjer', verdi: '2–3 (bolig), 4–8 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Jæren: Sterkt jordvern begrenser nye boligfelt',
      'Ganddal og Lura: Store utviklingsarealer',
      'Bybåndet Stavanger-Sandnes: Høy utnyttelse',
      'Krav om klimatilpasning',
    ],
  },

  // ── Trøndelag ──

  '5001': {
    kommunenummer: '5001',
    kommunenavn: 'Trondheim',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-12-15',
    sammendrag: 'Trondheim fortetter langs metrobussen og i Midtbyen. Byåsen, Tiller og Heimdal har villaområder. Bymarka er strengt vernet. Kvikkleire er utbredt.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25% (småhus)' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (småhus), 3–6 (fortetting)' },
      { label: 'Parkering', verdi: '0,5–1,5 plasser (avh. av metrobuss)' },
      { label: 'MUA (uteopphold)', verdi: 'Min. 30–50 m² per boenhet' },
    ],
    viktigeBestemmelser: [
      'Metrobuss: Fortetting langs traseen',
      'Bymarka: Ingen utbygging',
      'Kvikkleire: Omfattende krav til grunnundersøkelser',
      'Nidelva: Flomfare og byggerestriksjon',
      'Midtbyen: Høy utnyttelse med bevaringshensyn',
    ],
  },

  // ── Nord-Norge ──

  '5501': {
    kommunenummer: '5501',
    kommunenavn: 'Tromsø',
    planNavn: 'Kommuneplanens arealdel 2020–2032',
    planId: 'KPA2020',
    iKraft: '2020-09-23',
    sammendrag: 'Tromsø er Nord-Norges største by. Utvikling på Tromsøya og fastlandet (Kvaløysletta, Tromsdalen). Arktisk klima gir spesielle byggekrav.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Tromsøya: Fortetting i sentrum',
      'Kvaløysletta og Tromsdalen: Boligutvikling',
      'Skredfare: Krav om geoteknisk vurdering mange steder',
      'Arktisk klima: Spesielle krav til isolasjon og snølast',
    ],
  },
'3105': {    kommunenummer: '3105',    kommunenavn: 'Sarpsborg',    planNavn: 'Kommuneplanens arealdel 2023–2035',    planId: 'KPA2023',    iKraft: '2023-06-15',    sammendrag: 'Sarpsborg utvikler sentrum langs Glomma. Greåker og Tune har villaområder.',    nokkeltall: [      { label: 'Maks BYA bolig', verdi: '20–25%' },      { label: 'Maks gesimshøyde', verdi: '7–9 m' },    ],    viktigeBestemmelser: ['Sentrumsutvikling langs Glomma', 'Jordvern i landbruksområdene'],  },  '3101': {    kommunenummer: '3101',    kommunenavn: 'Halden',    planNavn: 'Kommuneplanens arealdel 2023–2035',    planId: 'KPA2023',    iKraft: '2023-06-15',    sammendrag: 'Halden utvikler sentrum ved Tista. Fredriksten festning er fredet. Rimelige tomter.',    nokkeltall: [      { label: 'Maks BYA bolig', verdi: '20–25%' },      { label: 'Maks gesimshøyde', verdi: '7–9 m' },    ],    viktigeBestemmelser: ['Fredriksten festning: Bevaringskrav', 'Rimelige tomtepriser'],  },

  // ── Akershus ──

  '3222': {
    kommunenummer: '3222',
    kommunenavn: 'Lørenskog',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-18',
    sammendrag: 'Lørenskog kommune satser på fortetting langs T-banen (Ahus-Lørenskog stasjon) og i Solheim/Skårer-området. Kommunen har høy boligetterspørsel pga. nærhet til Oslo. Marka-grensen begrenser utbygging i nord og øst.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '22–30%' },
      { label: 'Maks gesimshøyde', verdi: '8–12 m' },
      { label: 'Maks etasjer', verdi: '2 (småhus), 4–6 (sentrum)' },
      { label: 'Parkering', verdi: '0,5–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Fortetting langs T-bane og kollektivakser',
      'Marka-grensen: Ingen utbygging i Lørenskog-marka',
      'Ahus-området: Krav om støyvurdering',
      'Krav om overvannshåndtering for alle nye tiltak',
      'Universell utforming kreves i alle nye prosjekter',
    ],
  },

  '3237': {
    kommunenummer: '3237',
    kommunenavn: 'Eidsvoll',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-10-16',
    sammendrag: 'Eidsvoll kommune har utvikling rundt Eidsvoll sentrum, Råholt og Dal. God togforbindelse til Oslo via Gardermobanen. Sterkt jordvern på Øvre Romerike og bevaring av Eidsvollsbygningen-området.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3 (bolig), 4–5 (sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Fortetting rundt Eidsvoll stasjon og Råholt',
      'Jordvern: Fulldyrka jord på Romerike beskyttes',
      'Eidsvollsbygningen: Kulturminnebevaring i nærområdet',
      'Kvikkleire: Krav om geoteknisk vurdering',
      'Gardermobanen: Stasjonsnær utvikling prioriteres',
    ],
  },

  '3223': {
    kommunenummer: '3223',
    kommunenavn: 'Rælingen',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Rælingen kommune har boligvekst rundt Fjerdingby og Løvenstad. Populær pendlerkommune med nærhet til Lillestrøm og Oslo. Øyeren og marka begrenser utbyggingsarealer.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–4 (sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Fjerdingby: Hovedutviklingsområde med sentrumsplan',
      'Marka-grensen: Begrenser utbygging i øst',
      'Øyeren: Flomfare og strandsone-restriksjoner',
      'Krav om overvannshåndtering for alle nye tiltak',
    ],
  },

  // ── Telemark ──

  '3807': {
    kommunenummer: '3807',
    kommunenavn: 'Skien',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-18',
    sammendrag: 'Skien er Telemarks fylkeshovedstad og satser på sentrumsutvikling langs Bryggevannet og Porsgrunn-aksen. Fortetting i eksisterende tettsted prioriteres. Gulset og Kverndalen har utviklingspotensial.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–6 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Sentrumsutvikling: Høy utnyttelse rundt Bryggevannet',
      'Grenlandsbanen: Fremtidig tog til Vestfold/Oslo',
      'Kvikkleire: Geotekniske krav i deler av kommunen',
      'Kulturminner: Bevaring av Ibsens Skien',
      'Jordvern i landbruksområdene rundt Gjerpen',
    ],
  },

  '3806': {
    kommunenummer: '3806',
    kommunenavn: 'Porsgrunn',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-12-12',
    sammendrag: 'Porsgrunn utvikler sentrum langs Porsgrunnselva og har industrihistorisk identitet. Herøya og Brevik har transformasjonspotensial. God togforbindelse via Vestfoldbanen.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Herøya: Industriområde med transformasjonspotensial',
      'Brevik: Bevaring av kystbymiljø',
      'Porsgrunnselva: Flomfare og elvenære restriksjoner',
      'Vestfoldbanen: Stasjonsnær utvikling',
    ],
  },

  '3808': {
    kommunenummer: '3808',
    kommunenavn: 'Notodden',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-10-19',
    sammendrag: 'Notodden er en UNESCO-verdensarvby (Rjukan-Notodden industriarv). Utvikling konsentreres i sentrum og Heddal. Rimelige tomtepriser og gode muligheter for boligbygging.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'UNESCO-verdensarv: Strenge bevaringskrav i industriområdene',
      'Heddal: Boligutvikling med jordvern',
      'Rimelige tomter tiltrekker tilflyttere',
      'Krav om tilpasning til stedlig arkitektur',
    ],
  },

  '3813': {
    kommunenummer: '3813',
    kommunenavn: 'Bamble',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-11-15',
    sammendrag: 'Bamble kommune har utvikling i Langesund, Stathelle og Herre. Kystlinje med streng strandsoneforvaltning. Industri på Rafnes. Attraktive boligområder nær sjøen.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–8 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Strandsone: Strenge byggeforbud i 100-metersbeltet',
      'Langesund: Kystby-bevaring',
      'Rafnes industriområde: Egen sone',
      'Fritidsboliger: Strenge regler for bruksendring',
    ],
  },

  // ── Innlandet ──

  '3403': {
    kommunenummer: '3403',
    kommunenavn: 'Hamar',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-12-15',
    sammendrag: 'Hamar er Innlandets fylkeshovedstad og fortetter i sentrum og langs Mjøsa. Intercity-utbygging gir nye muligheter. Jordvern på Hedmarken er sentralt. Ridabu og Ingeberg har boligvekst.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Intercity-utbygging: Nye utviklingsarealer ved stasjonen',
      'Mjøsa: Strandsone og flomfare',
      'Jordvern: Sterkt vern av matjord på Hedmarken',
      'Domkirkeodden: Kulturminnebevaring',
      'Krav om klimatilpasning og overvannshåndtering',
    ],
  },

  '3405': {
    kommunenummer: '3405',
    kommunenavn: 'Lillehammer',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-10-19',
    sammendrag: 'Lillehammer er OL-by med sterk identitet. Sentrum og Strandtorget fortettes. Nordre Ål og Søre Ål har boligvekst. Bevaring av trehusbyen og nærhet til Mjøsa er viktig.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–4 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Trehusbyen: Strenge bevaringskrav i sentrum',
      'OL-anlegg: Bevaring og videreutvikling',
      'Mjøsa: Strandsone og flomfare',
      'Skredfare: Krav om vurdering i bratte områder',
    ],
  },

  '3407': {
    kommunenummer: '3407',
    kommunenavn: 'Gjøvik',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-11-15',
    sammendrag: 'Gjøvik kommune fortetter i sentrum og langs Mjøsa. NTNU Gjøvik gir studentby-dynamikk. Hunndalen og Biri har boligutvikling. Industritradisjon med O. Mustad & Søn.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Sentrumsutvikling: Fortetting langs Mjøsa',
      'NTNU-campus: Utviklingsområde',
      'Jordvern: Matjord på Toten beskyttes',
      'Krav om overvannshåndtering',
    ],
  },

  '3411': {
    kommunenummer: '3411',
    kommunenavn: 'Ringsaker',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Ringsaker er Innlandets mest folkerike kommune. Utvikling i Brumunddal og Moelv langs Mjøsa. Store landbruksarealer med sterkt jordvern. Sjusjøen er viktig hytteområde.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Brumunddal: Stasjonsnær utvikling prioriteres',
      'Jordvern: Sterkt vern av matjord',
      'Mjøsa: Strandsone og vannkvalitet',
      'Sjusjøen: Hytteområde med egne bestemmelser',
      'Intercity: Ny jernbane gir utviklingsmuligheter',
    ],
  },

  '3413': {
    kommunenummer: '3413',
    kommunenavn: 'Stange',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-12-12',
    sammendrag: 'Stange kommune ligger sør for Hamar langs Mjøsa. Utvikling i Stange sentrum og Ottestad. Populær pendlerkommune med togforbindelse. Sterkt jordvern på Hedmarken.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–8 m' },
      { label: 'Maks etasjer', verdi: '2' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Jordvern: Svært sterkt vern av matjord på Hedmarken',
      'Stange stasjon: Fortetting rundt knutepunkt',
      'Mjøsa: Strandsone og vannforvaltning',
      'LNF-områder: Strenge regler for spredt bebyggelse',
    ],
  },

  '3420': {
    kommunenummer: '3420',
    kommunenavn: 'Elverum',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-11-15',
    sammendrag: 'Elverum er Østerdalsbyenes senter med utvikling langs Glomma. Leiret er sentrum. Militærleiren Terningmoen gir arbeidsplasser. Store skogarealer og rimelige tomter.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Leiret sentrum: Fortetting og byutvikling',
      'Glomma: Flomfare og elvenære restriksjoner',
      'Rimelige tomter – attraktivt for tilflyttere',
      'Krav om overvannshåndtering',
    ],
  },

  // ── Agder ──

  '4204': {
    kommunenummer: '4204',
    kommunenavn: 'Kristiansand',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-18',
    sammendrag: 'Kristiansand er Sørlandets hovedstad og fortetter i Kvadraturen, Lund og langs E18/E39. Inkluderer tidligere Søgne og Songdalen. Sterk strandsoneforvaltning og bevaring av trehusbyen.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–6 (sentrum)' },
      { label: 'Parkering', verdi: '0,5–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Kvadraturen: Trehusby med strenge bevaringskrav',
      'Strandsone: 100 meter byggeforbud langs kysten',
      'Fortetting langs bussvei-traseen',
      'Søgne og Songdalen: Lokale sentra utvikles',
      'Krav om klimatilpasning og overvannshåndtering',
    ],
  },

  '4203': {
    kommunenummer: '4203',
    kommunenavn: 'Arendal',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Arendal fortetter i sentrum (Pollen) og langs kysten. Bevaring av Tyholmen trehusmiljø er sentralt. Arendal havn utvikles. Hisøy og Tromøy har populære boligområder.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Tyholmen: Fredet trehusmiljø',
      'Strandsone: Strenge byggeforbud langs kysten',
      'Havne-utvikling: Transformasjonsområde',
      'Krav om estetisk tilpasning til kystbykarakter',
    ],
  },

  '4202': {
    kommunenummer: '4202',
    kommunenavn: 'Grimstad',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-15',
    sammendrag: 'Grimstad er en attraktiv kystby med UiA-campus. Sentrum og Fevik har boligvekst. Streng strandsoneforvaltning. Populært sommersted med press på fritidsboliger.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–8 m' },
      { label: 'Maks etasjer', verdi: '2 (3 i sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Strandsone: Strenge byggeforbud i 100-metersbeltet',
      'UiA-campus: Utviklingsområde',
      'Kystby-bevaring: Tilpasning til stedlig karakter',
      'Fritidsboliger: Strenge regler for bruksendring',
    ],
  },

  // ── Vestland (Bergen-regionen) ──

  '4627': {
    kommunenummer: '4627',
    kommunenavn: 'Askøy',
    planNavn: 'Kommuneplanens arealdel 2022–2034',
    planId: 'KPA2022',
    iKraft: '2022-12-15',
    sammendrag: 'Askøy er Bergens største forstadskommune med vekst rundt Kleppestø og Ravnanger. Askøybroen gir kort vei til Bergen sentrum. Kuststrekninger og friområder bevares.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Kleppestø: Sentrumsutvikling og fortetting',
      'Strandsone: Strenge byggeforbud langs kysten',
      'Vannforsyning: Kapasitetskrav ved nye utbygginger',
      'Krav om overvannshåndtering',
    ],
  },

  '4626': {
    kommunenummer: '4626',
    kommunenavn: 'Øygarden',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Øygarden (inkl. tidligere Fjell og Sund) er en stor forstadskommune vest for Bergen. Straume er regionsenter. Sotrasambandet gir bedre forbindelse. Kystlandskap og oljebase preger kommunen.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8–10 m' },
      { label: 'Maks etasjer', verdi: '2–3 (bolig), 4–6 (Straume)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Straume: Regionsenter med høy utnyttelse',
      'Sotrasambandet: Ny bro gir utviklingspotensial',
      'Strandsone: Kystlandskap med byggeforbud',
      'Krav om klimatilpasning og overvannshåndtering',
    ],
  },

  '4624': {
    kommunenummer: '4624',
    kommunenavn: 'Bjørnafjorden',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-18',
    sammendrag: 'Bjørnafjorden (tidligere Os og Fusa) ligger sør for Bergen. Os sentrum er i sterk vekst. God forbindelse via E39. Fusa-delen har landlig preg med rimelige tomter.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3 (bolig), 4–5 (sentrum)' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Os sentrum: Fortetting og byutvikling',
      'E39: Utvikling langs hovedveien',
      'Fusa: Landlig med muligheter for spredt bebyggelse',
      'Krav om overvannshåndtering',
    ],
  },

  '4631': {
    kommunenummer: '4631',
    kommunenavn: 'Alver',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-15',
    sammendrag: 'Alver (tidligere Lindås, Meland og Radøy) er en stor kommune nord for Bergen. Knarvik er regionsenter. Frekhaug og Meland har boligvekst. Mongstad industriområde preger næringslivet.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Knarvik: Regionsenter med fortetting',
      'Frekhaug/Meland: Boligvekst nær Bergen',
      'Mongstad: Industriområde med egen sone',
      'Strandsone: Kystlandskap med byggeforbud',
    ],
  },

  // ── Rogaland (Jæren) ──

  '1124': {
    kommunenummer: '1124',
    kommunenavn: 'Sola',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-18',
    sammendrag: 'Sola kommune huser Stavanger lufthavn og har sterk vekst. Sola sentrum og Tananger fortettes. Jærstrendene er fredet. Jordvern på Jæren begrenser nye boligfelt.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8–10 m' },
      { label: 'Maks etasjer', verdi: '2–3 (bolig), 4–5 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Flyplassstøy: Begrenser boligbygging i store områder',
      'Jærstrendene: Fredet landskapsvernområde',
      'Jordvern: Sterkt vern av matjord på Jæren',
      'Bussvei-fortetting langs kollektivaksen',
    ],
  },

  '1127': {
    kommunenummer: '1127',
    kommunenavn: 'Randaberg',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Randaberg er Norges minste kommune i areal og grenser til Stavanger. Sentrum fortettes. Jordvern på Jæren og strandsone begrenser utbygging. Populær boligkommune med landlig preg.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Jordvern: Strenge begrensninger – lite tilgjengelig areal',
      'Sentrum: Fortetting i Randaberg sentrum',
      'Strandsone: Tungenes fyr og kystlandskap vernes',
      'Krav om klimatilpasning og overvannshåndtering',
    ],
  },

  '1121': {
    kommunenummer: '1121',
    kommunenavn: 'Time',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Time kommune har Bryne som regionsenter på Jæren. Sterk vekst med gode togforbindelser til Stavanger. Jordvern begrenser utbygging. Jærbanen gir god pendlermulighet.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25–30%' },
      { label: 'Maks gesimshøyde', verdi: '8–10 m' },
      { label: 'Maks etasjer', verdi: '2–3 (bolig), 4–6 (Bryne sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Bryne sentrum: Fortetting og byutvikling',
      'Jærbanen: Stasjonsnær utvikling prioriteres',
      'Jordvern: Svært sterkt vern av matjord på Jæren',
      'Krav om overvannshåndtering',
    ],
  },

  '1120': {
    kommunenummer: '1120',
    kommunenavn: 'Klepp',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-15',
    sammendrag: 'Klepp kommune ligger sentralt på Jæren med Kleppe som sentrum. Jærbanen gir pendlermulighet til Stavanger. Landbruk dominerer og jordvern er strengt. Bore strand er et populært friluftsområde.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '25%' },
      { label: 'Maks gesimshøyde', verdi: '8 m' },
      { label: 'Maks etasjer', verdi: '2–3' },
      { label: 'Parkering', verdi: '1,5–2 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Jordvern: Strengt vern av Jæren-matjord',
      'Kleppe sentrum: Fortetting',
      'Bore strand: Frilufts- og landskapsvernområde',
      'Jærbanen: Stasjonsnær utvikling',
    ],
  },

  // ── Møre og Romsdal ──

  '1507': {
    kommunenummer: '1507',
    kommunenavn: 'Ålesund',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-09-18',
    sammendrag: 'Ålesund er Sunnmøres regionhovedstad med jugendbyen som identitetsmerke. Fortetting i sentrum og Moa handelsområde. Inkluderer tidligere Skodje, Ørskog og Sandøy. Fjordlandskap og kystkultur preger arealpolitikken.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Jugendbyen: Strenge bevaringskrav i sentrum',
      'Strandsone: 100 meter byggeforbud langs kysten',
      'Moa: Handels- og næringsområde',
      'Skredfare: Krav om vurdering i bratte fjordområder',
      'Krav om klimatilpasning',
    ],
  },

  '1506': {
    kommunenummer: '1506',
    kommunenavn: 'Molde',
    planNavn: 'Kommuneplanens arealdel 2023–2035',
    planId: 'KPA2023',
    iKraft: '2023-06-19',
    sammendrag: 'Molde er Møre og Romsdals fylkeshovedstad. Rosenes by med panoramautsikt mot Romsdalsalpene. Fortetting i sentrum og Moldegård. Inkluderer tidligere Nesset og Midsund.',
    nokkeltall: [
      { label: 'Maks BYA bolig', verdi: '20–25%' },
      { label: 'Maks gesimshøyde', verdi: '7–9 m' },
      { label: 'Maks etasjer', verdi: '2 (bolig), 3–5 (sentrum)' },
      { label: 'Parkering', verdi: '1–1,5 plasser/boenhet' },
    ],
    viktigeBestemmelser: [
      'Sentrumsutvikling: Fortetting langs fjorden',
      'Skredfare: Krav om geoteknisk vurdering',
      'Strandsone: Strenge byggeforbud',
      'Nesset og Midsund: Spredt bebyggelse med strenge vilkår',
    ],
  },

}

export function getKommuneplanSammendrag(kommunenummer: string): KommuneplanSammendrag | null {
  return KOMMUNEPLAN_SAMMENDRAG[kommunenummer] || null
}
