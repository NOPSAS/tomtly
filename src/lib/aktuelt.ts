// Aktuelt — nyhetsartikler fra Tomtly
// Nye artikler legges til i toppen av ARTIKLER-arrayen

export interface Artikkel {
  slug: string
  tittel: string
  ingress: string
  forfatter: string
  publisert: string // ISO yyyy-mm-dd
  kategori: 'Samarbeid' | 'Produkt' | 'Marked' | 'Selskap' | 'Guide' | 'Tips'
  /** Markdown-lignende avsnitt. Hvert element er ett avsnitt. Kan inneholde **bold**. */
  innhold: string[]
  /** Valgfritt — kort sitat som vises i artikkelen */
  sitat?: { tekst: string; av: string }
}

export const ARTIKLER: Artikkel[] = [
  {
    slug: 'hvordan-selge-tomt-uten-megler',
    tittel: 'Slik selger du tomten selv — uten megler, uten stress',
    ingress: 'Du trenger ikke en megler for å selge tomt i Norge. Men du trenger å vise kjøperen hva de faktisk kjøper. Her er oppskriften.',
    forfatter: 'Jakob Bjøndal',
    publisert: '2026-04-14',
    kategori: 'Guide',
    innhold: [
      'La meg starte med en historie. Vi hadde en tomt på Nesodden som hadde ligget på FINN i syv måneder. Eieren hadde fine bilder av gress og trær, en grei prisantydning, og en kort tekst om at tomten var «regulert til bolig». Ingen beit på.',
      'Så tok vi over. Vi analyserte reguleringsplanen, fant ut nøyaktig hva som kunne bygges, plasserte tre forskjellige husmodeller på tomten med kart og tegninger, og lagde en komplett byggekostnadskalkyle. To måneder senere var tomten solgt — til en kjøper som startet byggeprosjekt basert på vår informasjon.',
      'Hva var forskjellen? **Kjøperen så ikke lenger en tomt. De så et hjem.**',
      'Her er det folk flest gjør feil når de selger tomt privat:',
      '**1. De viser gress, ikke muligheter.** En tomt er ikke et produkt før kjøperen kan se for seg hva som kan stå der. De fleste FINN-annonser for tomter viser et bilde av en skogflekk og skriver «fin beliggenhet». Det er som å selge en bil ved å vise et bilde av en parkeringsplass.',
      '**2. De kjenner ikke reguleringsplanen sin.** Vet du hva %-BYA er? Vet du om du kan bygge to etasjer eller bare én? Hva med gesimshøyde, mønehøyde og avstandskrav? Kjøpere som er seriøse stiller disse spørsmålene. Hvis du ikke har svarene, går de videre.',
      '**3. De undervurderer kraften i en kalkyle.** Ingenting gjør en kjøper tryggere enn å se et regnestykke: Tomt 2,5 MNOK + hus 3,5 MNOK + grunnarbeid 600 000 + kommunale gebyrer 150 000 = ferdig prosjekt ca. 6,8 MNOK. Nå vet kjøperen hva de går til, og de kan ta det rett til banken.',
      '**4. De tar for mye for tjenesten.** En megler tar gjerne 80 000-120 000 kr for å selge en tomt til 2-3 millioner. Og hva gjør de? Legger ut på FINN med et bilde av gress. Unnskyld, men det er sant.',
      'Vår modell er enkel: Vi gjør analysen, lager husmodellene, setter opp salgssiden, og markedsfører tomten. Du betaler 4 990 kr i oppstart, og 2 % av salgssummen først når tomten faktisk er solgt. Ingen salg = ingen ekstra kostnad.',
      'Det fineste med å selge tomt selv? Du beholder kontrollen. Du mottar bud direkte, du bestemmer selv, og du slipper å betale provisjon til noen som bare la ut en FINN-annonse.',
      'Det er 2026. Du trenger ikke en megler. Du trenger en god analyse og en plan kjøperen kan forstå.',
    ],
    sitat: {
      tekst: 'En tomt uten analyse er som en jobbsøknad uten CV. Du har kanskje mye å tilby, men ingen ser det.',
      av: 'Jakob Bjøndal, Tomtly',
    },
  },
  {
    slug: 'hva-er-bya-prosent',
    tittel: 'Hva i alle dager er %-BYA? (Forklart som om du var 12 år)',
    ingress: 'BYA, BRA, gesimshøyde, mønehøyde. Reguleringsplaner er fulle av forkortelser som får selv erfarne boligeiere til å klø seg i hodet. Her er den folkelige forklaringen.',
    forfatter: 'Jakob Bjøndal',
    publisert: '2026-04-13',
    kategori: 'Guide',
    innhold: [
      'Første gang jeg leste en reguleringsplan, trodde jeg det var en kryptisk beskjed fra en annen dimensjon. %-BYA 25, gesimshøyde 7m, mønehøyde 9m, MUA 30%. Jeg er arkitekt, og selv jeg måtte lese det tre ganger.',
      'Så la meg spare deg for hodepinen.',
      '**%-BYA = hvor mye av tomten du kan bygge på.** BYA står for «bebygd areal». Hvis tomten din er 1000 m² og %-BYA er 25%, kan du bygge på maks 250 m² av tomten. Det inkluderer huset, garasjen, boden og terrassen (hvis den er overbygget). Tenk på det som et fotavtrykk — hvis du ser rett ned på tomten fra en drone, hvor mye av bakken er dekket av bygg?',
      '**Gesimshøyde = hvor høy veggen er.** Mer presist: avstanden fra bakken opp til der taket begynner. Hvis gesimshøyden er 7 meter, kan ikke veggen din være høyere enn det. Dette hindrer folk i å bygge skyskrapere i villastrøk.',
      '**Mønehøyde = det høyeste punktet på taket.** Har du saltak (vanlig skråtak), er mønet den øverste kanten der de to takflatene møtes. 9 meter mønehøyde betyr at ingen del av huset kan stikke høyere enn 9 meter over bakken.',
      '**MUA = minste uteoppholdsareal.** Noen kommuner krever at en viss del av tomten skal være uteoppholdsareal. MUA 30% på en 1000 m²-tomt betyr at minst 300 m² skal være hage, plen eller terrasse — ikke parkering eller bygninger.',
      '**BRA = bruksareal.** Dette er det totale gulvarealet inne i huset, målt fra innsiden av ytterveggene. Et hus med BRA 150 m² har 150 m² gulvplass. BRA brukes når du sammenligner hus og boliger.',
      'Her er et ekte eksempel fra Nesodden: En tomt på 1374 m² med %-BYA 20%. Det gir 274 m² fotavtrykk. Vi valgte husmodellen Wide fra ABChus (BYA ~220 m²), som passet perfekt. Gesimshøyde 6m og mønehøyde 8,5m — godt innenfor grensene.',
      'Poenget er: **disse tallene bestemmer hva du kan bygge.** Og hvis du selger tomt uten å forklare dem til kjøperen, mister du alle som ikke orker å grave i reguleringsplanen selv. Det er de fleste.',
      'Hos Tomtly gjør vi denne jobben for deg. Vi leser reguleringsplanen, regner ut hva som er lov, og viser konkrete husmodeller som faktisk passer innenfor rammene. Kjøperen slipper å lure — de ser det med en gang.',
    ],
  },
  {
    slug: 'tomt-som-ikke-selger',
    tittel: '7 måneder på FINN uten bud? Slik snur du det.',
    ingress: 'Tomten din har ligget ute i månedsvis. Ingen ringer, ingen byr. Problemet er sjelden prisen — det er presentasjonen.',
    forfatter: 'Jakob Bjøndal',
    publisert: '2026-04-12',
    kategori: 'Tips',
    innhold: [
      'Jeg har en teori: De fleste tomter som ikke selger, har ikke et prisproblem. De har et fantasiproblem. Kjøperen klarer ikke å se for seg hva tomten skal bli.',
      'Tenk på det. Du scroller gjennom FINN og ser «Boligtomt 900 m², regulert til enebolig, fin utsikt». Og bildene viser... en skog. Kanskje noen busker. En sti. Det er som å prøve å selge en restaurant ved å vise bilde av en tom pizzaovn.',
      'Vi vet dette fordi vi har sett det om og om igjen. Her er de vanligste grunnene til at tomter ikke selger:',
      '**Grunn 1: Kjøperen vet ikke hva de kjøper.** «Regulert til bolig» betyr ingenting for folk flest. Hva slags bolig? Hvor stor? Hva koster det å bygge? Kan de ha garasje? Er det fjellgrunn eller leire? Uten svar på disse spørsmålene er tomten bare en grønn flekk.',
      '**Grunn 2: Kjøperen er redd for risikoen.** Å kjøpe tomt og bygge hus er det største økonomiske prosjektet de fleste gjør i livet. Usikkerheten er enorm. Hva om grunnen er dårlig? Hva om nabovarselet gir problemer? Hva om det koster 500 000 mer enn forventet i grunnarbeid? En tomteanalyse fjerner denne usikkerheten.',
      '**Grunn 3: Annonsen konkurrerer med ferdige boliger.** Folk som ser på FINN, ser også ferdige hus til salgs. Et ferdig hus med bilder av kjøkken, stue og hage vinner alltid over en tomt med bilde av gress — med mindre tomten viser et ferdig prosjekt.',
      'Løsningen? **Vis et ferdig prosjekt.** Vi har sett dette fungere gang på gang: Når kjøperen ser en husmodell plassert på tomten, med planløsning, fasadetegning og en kalkyle som viser totalkostnaden, skjer noe magisk. Plutselig er det ikke en tomt lenger. Det er et hjem.',
      'Vår erfaring: Tomter med en Tomtly-analyse selger i snitt raskere og til bedre pris enn tomter med bare en standard FINN-annonse. Grunnen er enkel — kjøperen tar en informert beslutning i stedet for et sjansespill.',
      'Har du en tomt (eller en bolig!) som sliter med å bli solgt? Kanskje er det tomtens potensial som er det egentlige salgsargumentet. Vi analyserer hva som kan bygges — også på tomter med eksisterende bygg der kjøperen kanskje vil rive og bygge nytt.',
    ],
    sitat: {
      tekst: 'Folk kjøper ikke tomter. De kjøper drømmen om huset de skal bygge. Jobben din er å vise dem den drømmen.',
      av: 'Jakob Bjøndal, Tomtly',
    },
  },
  {
    slug: 'fradeling-av-tomt-komplett-guide',
    tittel: 'Fradeling av tomt: En komplett guide (fra en som har gjort det selv)',
    ingress: 'Har du en stor tomt og lurer på om du kan dele den? Her er alt du trenger å vite — fra reguleringsplan til kommunale gebyrer.',
    forfatter: 'Jakob Bjøndal',
    publisert: '2026-04-11',
    kategori: 'Guide',
    innhold: [
      'Jeg bor selv på Nesodden med en tomt som opprinnelig var stor nok til å fradele. Så jeg har gått gjennom denne prosessen personlig. Det er ikke rakettforskning, men det er noen fallgruver du bør kjenne til.',
      '**Hva er fradeling?** Kort fortalt: Du deler en eiendom i to (eller flere) selvstendige tomter, med egne matrikkelenheter (gnr/bnr). Den nye tomten kan selges, bebygges eller beholdes separat.',
      '**Steg 1: Sjekk reguleringsplanen.** Ikke alle tomter kan fradeles. Reguleringsplanen for området ditt bestemmer minimum tomtestørrelse, byggegrenser og utnyttelsesgrad. Hvis planen sier minimum 700 m² per tomt og du har 1400 m², har du en god kandidat. Hvis planen sier minimum 1000 m², blir det trangere.',
      '**Steg 2: Sjekk kommuneplanen.** Noen kommuner har strengere regler i kommuneplanens arealdel enn i reguleringsplanen. For eksempel kan kommuneplanen kreve at fradelte tomter har tilfredsstillende adkomst, vann og avløp.',
      '**Steg 3: Nabovarsel.** Du må varsle naboene. Dette er lovpålagt og tar 14 dager. Naboer kan komme med merknader, men det betyr ikke at de kan stoppe fradelingen — kommunen vurderer merknadene og tar den endelige avgjørelsen.',
      '**Steg 4: Søknad til kommunen.** Du sender søknad om fradeling til kommunen. Gebyret varierer (typisk 15 000-30 000 kr), og behandlingstiden er 4-12 uker avhengig av kommunen.',
      '**Steg 5: Oppmåling.** Etter godkjenning sender kommunen en landmåler som setter ut grensemerker og registrerer den nye tomten i matrikkelen. Gebyret for oppmåling varierer (typisk 10 000-25 000 kr).',
      '**Hva koster det totalt?** Forvent 30 000-80 000 kr i kommunale gebyrer og oppmåling, pluss eventuelt arkitekt/rådgiver. Tidsbruk: 3-6 måneder fra søknad til ferdig fradelt tomt.',
      '**Hva er den fradelte tomten verdt?** Det avhenger av beliggenhet, størrelse og regulering. En fradelt boligtomt på Østlandet er typisk verdt 1-4 MNOK. Det betyr at du kan sitte på verdier du ikke visste du hadde.',
      'Hos Tomtly håndterer vi hele fradelingsprosessen — vurdering, reguleringssjekk, søknad, nabovarsel og oppmåling. Vi tar 5% av den nye tomtens verdi, og kun ved godkjent fradeling. Får du avslag, betaler du ingenting til oss — kun kommunale gebyrer.',
      'Mistenker du at tomten din kan deles? Start med en gratis vurdering på tomtly.no/fradeling.',
    ],
  },
  {
    slug: 'kvikkleire-alt-du-ma-vite',
    tittel: 'Kvikkleire: Bør du panikke? (Sannsynligvis ikke.)',
    ingress: 'Du har hørt skrekkhistoriene. Gjerdrum. Rissa. Men hva betyr det egentlig at tomten din ligger i en kvikkleiresone — og er det grunn til bekymring?',
    forfatter: 'Jakob Bjøndal',
    publisert: '2026-04-10',
    kategori: 'Guide',
    innhold: [
      'Etter Gjerdrum-skredet i 2020 ble «kvikkleire» et ord som fikk folk til å fryse. Og med god grunn — det var en forferdelig hendelse. Men som arkitekt og tomteutvikler må jeg si det rett ut: **de fleste tomter i kvikkleiresoner er helt trygge å bygge på.**',
      'La meg forklare.',
      '**Hva er kvikkleire?** Kvikkleire er leire som kan kollapse og bli flytende hvis den forstyrres for mye. Den finnes over store deler av Norge, spesielt i lavlandet under marin grense (områder som var havbunn etter istiden). Det betyr at millioner av nordmenn bor i kvikkleiresoner allerede.',
      '**Tre faregrader:** NVE kartlegger kvikkleire i tre nivåer: **Lav**, **middels** og **høy** faregrad. Lav faregrad betyr at det finnes kvikkleire i området, men risikoen for skred er svært liten. Høy faregrad betyr at det kreves grundige geotekniske undersøkelser.',
      '**Hva betyr det for din tomt?** Hvis tomten din ligger i en kvikkleiresone, betyr det **ikke** at du ikke kan bygge. Det betyr at du kanskje trenger en geoteknisk rapport (typisk 20 000-50 000 kr) som bekrefter at grunnen er stabil nok. De fleste tomter i lav-til-middels faregrad godkjennes uten problemer.',
      '**Når bør du være ekstra forsiktig?** Hvis tomten ligger nær en elv eller bekk i et område med høy faregrad. Hvis du planlegger store terrenginngrep (sprengning, graving, fylling). Eller hvis det har vært skredhendelser i nærheten tidligere.',
      'I Tomtlys tomteanalyse sjekker vi kvikkleire automatisk via DOK-data (Det offentlige kartgrunnlaget) og Norkart ROS-analyse. Du ser med en gang om tomten er i en kartlagt sone, og hvilken faregrad som gjelder. Ingen overraskelser.',
      'Et eksempel: En tomt vi nylig analyserte i Lillestrøm lå i en kvikkleiresone med «lav faregrad». Etter geoteknisk vurdering viste det seg at grunnen var stabil, og rammetillatelse ble innvilget uten problemer. Prisen for den geotekniske rapporten: 25 000 kr. Trygghet for kjøperen: uvurderlig.',
      'Konklusjonen? Kvikkleire er noe du skal være **bevisst** på, men ikke **redd** for. Sjekk kartet, bestill en geoteknisk rapport hvis nødvendig, og bygg med god samvittighet.',
    ],
  },
  {
    slug: 'hva-er-tomten-verdt',
    tittel: 'Hva er egentlig tomten din verdt? (Hint: Mer enn du tror.)',
    ingress: 'De fleste tomteeiere undervurderer verdien av sin egen tomt. Her er hvordan du finner ut hva den faktisk er verdt — og hvordan du øker verdien.',
    forfatter: 'Jakob Bjøndal',
    publisert: '2026-04-09',
    kategori: 'Tips',
    innhold: [
      'Jeg snakker med tomteeiere hver dag. Og noe jeg hører overraskende ofte er: «Tomten er vel ikke verdt så mye.» Før jeg i det hele tatt har sett på den.',
      'Sannheten er at tomteverdier i Norge har eksplodert de siste ti årene. En boligtomt i gangavstand til jernbanestasjonen i en Østlands-kommune kan fort være verdt 2-4 millioner. En tomt med fjordutsikt på Nesodden? 3-6 millioner. Selv en tomt i grisgrendte strøk med spredt boligbebyggelse kan være verdt 500 000-1 million hvis den er regulert til bolig.',
      '**Tre ting som bestemmer tomteverdien:**',
      '**1. Beliggenhet.** Avstand til sentrum, jernbane, skole, butikk. Utsikt, solforhold, støynivå. En tomt med sjøutsikt og 10 minutter til toget er gull. En tomt i skogen 45 minutter fra nærmeste tettsted er... mindre gull.',
      '**2. Regulering.** Hva er tomten regulert til? Enebolig, tomannsbolig, rekkehus, flermannsbolig? Utnyttelsesgraden (%-BYA) bestemmer hvor mye du kan bygge. Høyere utnyttelse = høyere verdi. En tomt regulert til tomannsbolig er verdt mer enn en regulert til enebolig, alt annet likt.',
      '**3. Tomtens egenskaper.** Størrelse, form, terreng, grunnforhold. En flat tomt er enklere (og billigere) å bygge på enn en bratt skråtomt. God grunn er billigere enn fjellgrunn som må sprenges.',
      '**Hvordan øker du verdien?** Det viktigste grepet er å **vise hva tomten kan bli**. En tomt som presenteres med husmodeller, plantegninger og en kalkyle er verdt mer enn den samme tomten presentert som «fin tomt, regulert til bolig». Vi har sett prisforskjeller på 10-20% bare ved å presentere tomten ordentlig.',
      'Et ekte eksempel: Tomten på Alværn 65 (Nesodden) ble lagt ut for 3,2 MNOK. Ingen beit i syv måneder. Etter at vi la ut analysen med Wide fra ABChus (207 m², pulttak, totalkostnad 7,9 MNOK for ferdig prosjekt), ble den solgt på to måneder. Kjøperen startet byggeprosjekt umiddelbart.',
      'Vil du vite hva tomten din er verdt? Start med en gratis verdivurdering på tomtly.no/verdivurdering. Vi ser på sammenlignbare salg, regulering og beliggenhet — og gir deg et estimat på 24 timer.',
    ],
    sitat: {
      tekst: 'En tomt er som en uferdig roman. Verdien ligger ikke i sidene som finnes, men i historien som kan skrives.',
      av: 'Jakob Bjøndal, Tomtly',
    },
  },
  {
    slug: 'selge-bolig-som-ikke-selger',
    tittel: 'Boligen selger ikke? Kanskje det er tomten du bør markedsføre.',
    ingress: 'Noen boliger selger ikke fordi kjøperne ikke vil ha huset — de vil ha tomten. Her er hvordan du snur det til din fordel.',
    forfatter: 'Jakob Bjøndal',
    publisert: '2026-04-08',
    kategori: 'Tips',
    innhold: [
      'Har du en eldre bolig eller hytte som bare ikke selger? Du har senket prisen, byttet megler, tatt nye bilder. Ingenting hjelper. Her er en tanke som kanskje ikke har slått deg: **Kanskje er det ikke huset kjøperne vil ha. Kanskje er det tomten.**',
      'Vi ser dette oftere enn du tror. En gammel hytte fra 60-tallet på en fantastisk sjøtomt. En sliten enebolig fra 70-tallet på en stor, flat tomt midt i et ettertraktet boligområde. Huset er ikke verdt noe, men tomten er verdt millioner.',
      'Problemet er at annonsen selger huset. Bilder av et utdatert kjøkken, et bad fra forrige århundre, og en stue med panel fra gulv til tak. Kjøperne ser et oppussingsprosjekt de ikke orker. De scroller videre.',
      '**Hva om du snudde det rundt?** I stedet for å selge en sliten bolig, selger du en fantastisk tomt — med potensial for et drømmehus. Vis hva som kan bygges. Plasser en moderne enebolig på tomten. Lag en kalkyle: «Riv eksisterende, bygg nytt: totalt 6,5 MNOK for ferdig drømmehus.»',
      'Plutselig er målgruppen en helt annen. Du selger ikke til folk som leter etter ferdige boliger. Du selger til folk som drømmer om å bygge sitt eget hjem — men som trenger en tomt å bygge på.',
      'Vi hadde akkurat en samtale med en selger som hadde eiendommen sin ute i flere måneder. Rammetillatelse var allerede gitt for en funkisbolig. Men annonsen viste bare den gamle hytten. Ingen så potensialet.',
      'Vår anbefaling: Behold gjerne annonsen for boligen, men legg til en seksjon som viser hva tomten kan bli. Vi lager analyse, husmodeller og kalkyle — og ofte er det akkurat dette som trigger kjøperen.',
      'Det koster 4 990 kr i oppstart, og 2 % av salgssummen kun ved salg. En ganske billig forsikring mot å sitte med en usolgd eiendom i månedsvis til.',
    ],
  },
  {
    slug: 'samarbeid-proff-oppgjor',
    tittel: 'Tomtly inngår samarbeid med Proff Oppgjør AS',
    ingress:
      'Vi er stolte av å kunngjøre at Tomtly har inngått samarbeid med Proff Oppgjør AS. Sammen gjør vi det enklere, tryggere og rimeligere å selge tomt i Norge.',
    forfatter: 'Jakob Bjøndal',
    publisert: '2026-04-10',
    kategori: 'Samarbeid',
    innhold: [
      'Etter en grundig prosess har vi i Tomtly valgt **Proff Oppgjør AS** som vår foretrukne oppgjørspartner. Det betyr at alle tomter som selges via Tomtly nå kan få håndtert kontraktsoppdrag, tinglysing og det juridiske oppgjøret av et profesjonelt og uavhengig oppgjørsselskap til en svært konkurransedyktig pris.',
      'For oss i Tomtly har det hele tiden vært et bærende prinsipp at tomteeier skal selge selv — med våre verktøy, vår analyse og vår faglige rådgivning i ryggen. Den siste brikken har vært en trygg og forutsigbar oppgjørsprosess. Den brikken er nå på plass.',
      'Konkret betyr dette at våre kunder får eiendomsoppgjør for **9 000 kr + mva**, pluss 545 kr for tinglysing av sikringsobligasjon. Det er flere tusen kroner billigere enn hva tradisjonell megler tar for samme tjeneste — og det er fastpris uavhengig av salgssum.',
      'Proff Oppgjør AS er et selvstendig oppgjørsselskap som har spesialisert seg på digitale eiendomsoppgjør. De håndterer hele prosessen fra kontrakt til overlevering, sikrer korrekt tinglysing, og passer på at penger og papirer flyter trygt mellom kjøper og selger.',
      'For meg personlig har det vært viktig å finne en partner som deler vår filosofi: tomteeier skal ha kontroll, prosessen skal være transparent, og pengene skal brukes på det som faktisk skaper verdi — ikke på unødige mellomledd. I Marie Nordhagen og teamet hos Proff Oppgjør AS har vi funnet akkurat det.',
      'Samarbeidet trer i kraft umiddelbart. Alle nye oppdrag fra og med i dag vil få Proff Oppgjør AS som standard oppgjørspartner. Eksisterende kunder kan selvfølgelig også benytte seg av tilbudet, og vi vil ta direkte kontakt med dem som har et aktivt oppdrag hos oss.',
      'Vi gleder oss enormt over å gå inn i denne nye fasen sammen med Proff Oppgjør AS, og vi tror dette kommer til å bety mye for hvor enkelt og trygt det blir å selge tomt i Norge fremover.',
    ],
    sitat: {
      tekst:
        'Med Proff Oppgjør AS på laget kan vi tilby tomteeiere en komplett løsning fra første analyse til ferdig oppgjør — uten å gå veien om tradisjonell megler.',
      av: 'Jakob Bjøndal, gründer av Tomtly',
    },
  },
]

export function getArtikkel(slug: string): Artikkel | undefined {
  return ARTIKLER.find((a) => a.slug === slug)
}

export function getAlleArtikler(): Artikkel[] {
  return [...ARTIKLER].sort((a, b) => b.publisert.localeCompare(a.publisert))
}

export function formatDato(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })
}
