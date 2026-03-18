import { TomtHero } from '@/components/tomt/TomtHero'
import { TomtScore } from '@/components/tomt/TomtScore'
import { TomtVisualisering } from '@/components/tomt/TomtVisualisering'
import { TomtMulighetsstudie } from '@/components/tomt/TomtMulighetsstudie'
import { TomtScenario } from '@/components/tomt/TomtScenario'
import { TomtByggekostnad } from '@/components/tomt/TomtByggekostnad'
import { TomtSalgsverdi } from '@/components/tomt/TomtSalgsverdi'
import { TomtRegulering } from '@/components/tomt/TomtRegulering'
import { TomtRisiko } from '@/components/tomt/TomtRisiko'
import { TomtKart } from '@/components/tomt/TomtKart'
import { TomtKontakt } from '@/components/tomt/TomtKontakt'
import { TomtGodkjenninger } from '@/components/tomt/TomtGodkjenninger'
import { TomtDispensasjoner } from '@/components/tomt/TomtDispensasjoner'
import { TomtTidslinje } from '@/components/tomt/TomtTidslinje'
import { TomtEntreprenorPrising } from '@/components/tomt/TomtEntreprenorPrising'
import { TomtFinansiering } from '@/components/tomt/TomtFinansiering'
import { TomtSjekkliste } from '@/components/tomt/TomtSjekkliste'
import { TomtHusvelger } from '@/components/tomt/TomtHusvelger'
import { TomtTegnebua } from '@/components/tomt/TomtTegnebua'
import { TomtBildegalleri } from '@/components/tomt/TomtBildegalleri'
import { TomtForEtter } from '@/components/tomt/TomtForEtter'
import { TomtDeling } from '@/components/tomt/TomtDeling'
import { TomtNabolag } from '@/components/tomt/TomtNabolag'

// ============================================================
// TOMTESIDE – Den viktigste siden i hele plattformen
// Inspirert av arkitektfaglig prosjektpresentasjon
// ============================================================

// Demo-data for prototyping
const DEMO_TOMT = {
  id: '1',
  adresse: 'Bjørnemyrveien 24',
  poststed: 'Oppegård',
  postnummer: '1413',
  kommune: 'Nordre Follo',
  fylke: 'Viken',
  gnr: 42,
  bnr: 156,
  areal_m2: 1240,
  senterpunkt: { lat: 59.79, lng: 10.81 },

  regulering: {
    arealformaal: 'Boligbebyggelse – frittliggende småhusbebyggelse',
    utnyttelsesgrad_bya: 25,
    maks_hoyde_m: 9,
    maks_etasjer: 2,
    byggegrense_m: 4,
    hensynssoner: [
      {
        type: 'Kulturmiljø',
        beskrivelse: 'Tilpasning til eksisterende bebyggelse',
        konsekvens: 'lav' as const,
      },
    ],
    bestemmelser: [
      'Maks BYA 25%',
      'Maks gesimshøyde 7m, mønehøyde 9m',
      'Saltak eller valmet tak',
      'Farge og materialvalg skal tilpasses omgivelsene',
      'Min. 2 biloppstillingsplasser per boenhet',
    ],
    plannavn: 'Reguleringsplan for Bjørnemyrveien',
    vedtaksdato: '2019-06-15',
  },

  mulighetsstudie: {
    oppsummering:
      'Tomten har svært godt potensial for utvikling av 2-3 boenheter. Flat tomt med god soleksponering og nærhet til kollektivtransport gjør dette til et attraktivt utviklingsprosjekt.',
    maks_bra_m2: 310,
    anbefalt_bra_m2: 280,
    maks_enheter: 3,
    anbefalt_enheter: 2,
    bygningstyper: ['Enebolig med utleiedel', 'Tomannsbolig'],
    fordeler: [
      'Flat, lettbygd tomt',
      'Sørvestvendt med gode solforhold',
      'Gangavstand til tog (8 min)',
      'Etablert boligområde med god infrastruktur',
      'Regulert for småhusbebyggelse',
    ],
    utfordringer: [
      'Hensynssone kulturmiljø – krever tilpasset arkitektur',
      'Begrenset BYA på 25%',
      'Parkering tar noe areal',
    ],
    arkitektens_vurdering:
      'Vi anbefaler tomannsbolig med integrerte garasjer. Dette utnytter reguleringsplanen optimalt og gir best balanse mellom byggekostnad og salgsverdi. Bygget bør utformes med saltak og naturlige materialer for å tilfredsstille hensynssonen.',
  },

  scenarioer: [
    {
      id: 's1',
      navn: 'Enebolig med utleiedel',
      beskrivelse:
        'Moderne enebolig på 180 m² med separat utleieleilighet på 60 m² i underetasje. Integrert garasje.',
      type: 'konservativ' as const,
      enheter: [
        { type: 'enebolig' as const, antall: 1, bra_m2: 180, soverom: 4, estimert_pris: 7200000 },
        { type: 'hybel' as const, antall: 1, bra_m2: 60, soverom: 1, estimert_pris: 2400000 },
      ],
      total_bra_m2: 240,
      utnyttelsesgrad: 19.4,
      estimert_byggekostnad: 8400000,
      estimert_salgsverdi: 9600000,
      estimert_fortjeneste: 1200000,
      roi_prosent: 14.3,
    },
    {
      id: 's2',
      navn: 'Tomannsbolig',
      beskrivelse:
        'To like boenheter på 140 m² hver over to etasjer. Felles uteareal med privat hage til hver enhet.',
      type: 'moderat' as const,
      enheter: [
        { type: 'tomannsbolig' as const, antall: 2, bra_m2: 140, soverom: 3, estimert_pris: 5800000 },
      ],
      total_bra_m2: 280,
      utnyttelsesgrad: 22.6,
      estimert_byggekostnad: 9200000,
      estimert_salgsverdi: 11600000,
      estimert_fortjeneste: 2400000,
      roi_prosent: 26.1,
    },
    {
      id: 's3',
      navn: '3 rekkehus',
      beskrivelse:
        'Tre kompakte rekkehus på 95 m² hver. Maks utnyttelse av tomten innenfor reguleringsplan.',
      type: 'ambisios' as const,
      enheter: [
        { type: 'rekkehus' as const, antall: 3, bra_m2: 95, soverom: 3, estimert_pris: 4500000 },
      ],
      total_bra_m2: 285,
      utnyttelsesgrad: 23,
      estimert_byggekostnad: 10500000,
      estimert_salgsverdi: 13500000,
      estimert_fortjeneste: 3000000,
      roi_prosent: 28.6,
    },
  ],

  byggekostnad: {
    grunnarbeid: 850000,
    infrastruktur: 620000,
    bygningskropp: 4200000,
    tekniske_anlegg: 1400000,
    innvendig: 1100000,
    utomhus: 450000,
    prosjektering: 580000,
    uforutsett_prosent: 10,
    total_eks_mva: 9200000,
    total_inkl_mva: 11500000,
    kostnad_per_m2: 32857,
  },

  salgsverdi: {
    sammenlignbare_salg: [
      { adresse: 'Bjørnemyrveien 18', salgsdato: '2025-09-15', pris: 5600000, bra_m2: 135, pris_per_m2: 41481, avstand_km: 0.1 },
      { adresse: 'Solbakken 4', salgsdato: '2025-11-02', pris: 6200000, bra_m2: 148, pris_per_m2: 41892, avstand_km: 0.4 },
      { adresse: 'Fururabben 12', salgsdato: '2025-12-10', pris: 5100000, bra_m2: 128, pris_per_m2: 39844, avstand_km: 0.6 },
    ],
    estimert_per_m2: 41000,
    estimert_total: 11600000,
    konfidensintervall: { lav: 10800000, hoy: 12400000 },
    markedsvurdering:
      'Området har hatt stabil prisvekst de siste 12 månedene (+4.2%). Etterspørselen etter nye boliger i Oppegård er høy, spesielt for familieboliger med 3+ soverom.',
  },

  risikoanalyse: {
    total_risiko: 'lav' as const,
    faktorer: [
      { kategori: 'Regulering', beskrivelse: 'Risiko for avslag på rammesøknad', sannsynlighet: 1 as const, konsekvens: 4 as const, risikoverdi: 4, tiltak: 'Prosjekter innenfor gjeldende reguleringsplan' },
      { kategori: 'Marked', beskrivelse: 'Prisfall i boligmarkedet', sannsynlighet: 2 as const, konsekvens: 3 as const, risikoverdi: 6, tiltak: 'Konservative verdivurderinger med 10% margin' },
      { kategori: 'Bygging', beskrivelse: 'Kostnadsoverskridelse', sannsynlighet: 3 as const, konsekvens: 2 as const, risikoverdi: 6, tiltak: '10% uforutsett-post inkludert' },
      { kategori: 'Grunnforhold', beskrivelse: 'Uventede grunnforhold', sannsynlighet: 1 as const, konsekvens: 3 as const, risikoverdi: 3, tiltak: 'Grunnundersøkelse anbefales før byggestart' },
      { kategori: 'Tid', beskrivelse: 'Forsinkelse i saksbehandling', sannsynlighet: 3 as const, konsekvens: 2 as const, risikoverdi: 6, tiltak: 'Tidlig dialog med kommunen' },
    ],
    anbefalinger: [
      'Start regulerings-dialog med kommunen tidlig',
      'Gjennomfør grunnundersøkelse',
      'Bruk fastpriskontrakt med entreprenør',
      'Forhåndssalg av minst én enhet reduserer risiko vesentlig',
    ],
  },

  tomtescore: {
    total: 82,
    delscorer: {
      beliggenhet: 85,
      regulering: 72,
      topografi: 90,
      infrastruktur: 95,
      marked: 78,
      okonomi: 74,
    },
    beregnet_dato: '2026-03-15',
    forklaring:
      'Tomten scorer 82 av 100. Sterke sider: Beliggenhet, Topografi, Infrastruktur. Utfordringer: ingen vesentlige. Dette er en tomt med svært godt utviklingspotensial.',
  },

  // ---- Godkjente tiltak i nærområdet ----
  godkjente_tiltak: [
    {
      id: 'g1',
      adresse: 'Bjørnemyrveien 18',
      avstand_m: 45,
      type: 'nybygg' as const,
      beskrivelse: 'Oppføring av tomannsbolig i 2 etasjer med integrert garasje. BYA 23%. Saltak med tegltakstein.',
      status: 'godkjent' as const,
      vedtaksdato: '2024-11-15',
      saksbehandlingstid_uker: 4,
      dispensasjoner: [],
      soknadstype: 'ett_trinn' as const,
      bra_m2: 260,
      enheter: 2,
    },
    {
      id: 'g2',
      adresse: 'Bjørnemyrveien 30',
      avstand_m: 80,
      type: 'riving_nybygg' as const,
      beskrivelse: 'Riving av eksisterende enebolig og oppføring av 3 rekkehus. Dispensasjon fra BYA (27% vs. 25%) og fra gesimshøyde (7.5m vs. 7m).',
      status: 'godkjent' as const,
      vedtaksdato: '2024-06-20',
      saksbehandlingstid_uker: 14,
      dispensasjoner: [
        'Dispensasjon fra maks BYA: 27% i stedet for 25%',
        'Dispensasjon fra gesimshøyde: 7.5m i stedet for 7m',
      ],
      soknadstype: 'rammetillatelse' as const,
      bra_m2: 285,
      enheter: 3,
    },
    {
      id: 'g3',
      adresse: 'Solbakken 2',
      avstand_m: 120,
      type: 'nybygg' as const,
      beskrivelse: 'Oppføring av enebolig med utleiedel i underetasje. Dispensasjon fra byggegrense mot nordøst.',
      status: 'godkjent' as const,
      vedtaksdato: '2025-02-10',
      saksbehandlingstid_uker: 10,
      dispensasjoner: [
        'Dispensasjon fra byggegrense: 3m i stedet for 4m mot nordøst',
      ],
      soknadstype: 'ett_trinn' as const,
      bra_m2: 220,
      enheter: 2,
    },
    {
      id: 'g4',
      adresse: 'Bjørnemyrveien 22',
      avstand_m: 30,
      type: 'tilbygg' as const,
      beskrivelse: 'Tilbygg til eksisterende enebolig. 45 m² i én etasje.',
      status: 'godkjent' as const,
      vedtaksdato: '2025-08-05',
      saksbehandlingstid_uker: 3,
      dispensasjoner: [],
      soknadstype: 'ett_trinn' as const,
      bra_m2: 45,
    },
    {
      id: 'g5',
      adresse: 'Granåsen 8',
      avstand_m: 200,
      type: 'deling' as const,
      beskrivelse: 'Fradeling av tomt for oppføring av ny enebolig. Søknad om dispensasjon fra krav om opparbeidelse av fortau langs Bjørnemyrveien.',
      status: 'avslått' as const,
      vedtaksdato: '2025-03-18',
      saksbehandlingstid_uker: 16,
      dispensasjoner: [],
      soknadstype: 'rammetillatelse' as const,
    },
    {
      id: 'g6',
      adresse: 'Fururabben 5',
      avstand_m: 180,
      type: 'nybygg' as const,
      beskrivelse: 'Oppføring av enebolig med garasje. Under behandling i kommunen.',
      status: 'under_behandling' as const,
      vedtaksdato: '2026-01-20',
      saksbehandlingstid_uker: 0,
      dispensasjoner: [],
      soknadstype: 'ett_trinn' as const,
      bra_m2: 180,
      enheter: 1,
    },
  ],

  // ---- Dispensasjoner og skjulte krav ----
  dispensasjoner: [
    {
      id: 'd1',
      kategori: 'vei' as const,
      tittel: 'Opparbeidelse av fortau langs Bjørnemyrveien',
      beskrivelse: 'Reguleringsplanen har rekkefølgekrav om opparbeidelse av fortau langs tomtens front (ca. 25 løpemeter). Dette er et skjult krav som utløses ved ny bebyggelse med mer enn én boenhet.',
      kilde: 'Reguleringsbestemmelsene § 3.2 – Rekkefølgekrav',
      konsekvens: 'kostnad' as const,
      estimert_kostnad: 450000,
      estimert_forsinkelse_uker: 4,
      dispensasjon_nødvendig: false,
      sannsynlighet_godkjenning: undefined,
      tiltak: 'Innhent tilbud fra graveentreprenør tidlig. Kan samordnes med grunnarbeider for å spare kostnad.',
      presedens: 'Nabotomt (Bjørnemyrveien 30) gjennomførte tilsvarende opparbeidelse i 2024',
    },
    {
      id: 'd2',
      kategori: 'va' as const,
      tittel: 'Tilkobling til kommunalt VA-nett',
      beskrivelse: 'Eksisterende VA-ledning ligger 15m fra tomtegrensen. Ved utbygging med mer enn 2 enheter kreves oppgradering av stikkledning og ny kum.',
      kilde: 'Kommunalteknisk norm for Nordre Follo',
      konsekvens: 'kostnad' as const,
      estimert_kostnad: 280000,
      estimert_forsinkelse_uker: 2,
      dispensasjon_nødvendig: false,
      tiltak: 'Søk om sanitærabonnement hos kommunen tidlig. Koordiner med evt. veiopparbeidelse.',
      presedens: 'Standard krav i området – alle nybygg har gjennomført dette',
    },
    {
      id: 'd3',
      kategori: 'utnyttelse' as const,
      tittel: 'BYA over 25% krever dispensasjon',
      beskrivelse: 'Det ambisiøse scenarioet (3 rekkehus) kan komme tett opp mot BYA-grensen. Hvis parkering løses med carport i stedet for garasje, vil BYA-kravet bli knapt.',
      kilde: 'Reguleringsplan § 2.1 – Utnyttelsesgrad',
      konsekvens: 'forsinkelse' as const,
      estimert_kostnad: 0,
      estimert_forsinkelse_uker: 9,
      dispensasjon_nødvendig: true,
      sannsynlighet_godkjenning: 75,
      tiltak: 'Prosjekter innenfor 25% BYA for å unngå dispensasjon. Alternativt: nabotomt fikk dispensasjon til 27%.',
      presedens: 'Bjørnemyrveien 30 fikk dispensasjon til 27% BYA i 2024',
    },
    {
      id: 'd4',
      kategori: 'kulturminne' as const,
      tittel: 'Hensynssone kulturmiljø – krav til utforming',
      beskrivelse: 'Tomten ligger i hensynssone for kulturmiljø. Nybygg skal tilpasses eksisterende bebyggelse i materialvalg, farge og takform. Ikke formelt dispensasjonskrav, men kommunen kan stille krav til utforming.',
      kilde: 'Reguleringsplan – Hensynssone H570',
      konsekvens: 'lav' as const,
      estimert_kostnad: 50000,
      estimert_forsinkelse_uker: 0,
      dispensasjon_nødvendig: false,
      tiltak: 'Bruk saltak, naturfarger og tradisjonelle materialer. Arkitekt bør dokumentere tilpasning i søknaden.',
      presedens: 'Alle godkjente prosjekter i området har saltak og jordfarger',
    },
    {
      id: 'd5',
      kategori: 'parkering' as const,
      tittel: 'Parkeringskrav: 2 plasser per boenhet',
      beskrivelse: 'Med 3 enheter kreves 6 biloppstillingsplasser. Dette tar vesentlig tomteareal og kan begrense utnyttelsen. Dispensasjon fra parkeringskravet er vanskelig å oppnå i dette området.',
      kilde: 'Reguleringsbestemmelsene § 4.1',
      konsekvens: 'forsinkelse' as const,
      estimert_kostnad: 0,
      estimert_forsinkelse_uker: 0,
      dispensasjon_nødvendig: false,
      sannsynlighet_godkjenning: undefined,
      tiltak: 'Integrer garasje/carport i bygningskroppen for å minimere arealbruk. Alternativt: reduser til 2 enheter.',
      presedens: 'Ingen dispensasjoner fra parkeringskrav er innvilget i området',
    },
  ],

  // ---- Tidslinje-config ----
  tidslinje_config: {
    soknadstype: 'ett_trinn' as const,
    har_dispensasjoner: false,
    antall_dispensasjoner: 0,
    forventet_naboklager: false,
    alle_entreprenorer_klare: true,
    krav_til_veiopparbeidelse: true,
    politisk_behandling: false,
  },

  // ---- Entreprenør & ferdighus ----
  entreprenor_behov: {
    geoteknisk: false,
    vanningenior: false,
    akustiker: false,
  },

  entreprenor_tilbud: [
    {
      id: 'e1',
      fag: 'Grunnarbeid',
      firma: 'Follo Graveservice AS',
      status: 'mottatt' as const,
      pris: 850000,
      kommentar: 'Inkluderer graving, sprengning av fjell (ca. 40m³), planering og komprimering. Forutsetter tilgang med gravemaskin fra Bjørnemyrveien.',
      gyldig_til: '2026-06-01',
      noedvendig: true,
    },
    {
      id: 'e2',
      fag: 'Rørlegger',
      firma: 'Nordre Follo Rør AS',
      status: 'mottatt' as const,
      pris: 620000,
      kommentar: 'Komplett VVS inkl. tilkobling kommunalt nett, sanitær, varme (vannbåren) og ventilasjon. Pris for tomannsbolig-scenario.',
      gyldig_til: '2026-06-01',
      noedvendig: true,
    },
    {
      id: 'e3',
      fag: 'Ferdighusleverandør',
      firma: 'Velges basert på prisklasse',
      status: 'venter' as const,
      noedvendig: true,
      aarsak: 'Velg prisklasse for å se husmodeller og priser fra våre samarbeidende leverandører.',
    },
    {
      id: 'e4',
      fag: 'Uavhengig kontroll',
      firma: 'ÅF Engineering AS',
      status: 'sendt' as const,
      noedvendig: true,
      aarsak: 'Påkrevd for tiltaksklasse 2 (tomannsbolig). Kontroll av geoteknikk, brannsikkerhet og konstruksjon.',
    },
  ],

  ferdighus: [
    // Standard
    {
      id: 'h1',
      leverandor: 'Nordbohus',
      modell: 'Kompakt 140',
      bra_m2: 140,
      soverom: 3,
      bad: 2,
      prisklasse: 'standard' as const,
      pris_fra: 2890000,
      beskrivelse: 'Kompakt tomannsbolig-halvdel med smart planløsning. Fleksibelt kjøkken/stue-løsning.',
      leveringstid_uker: 16,
      energiklasse: 'A',
    },
    {
      id: 'h2',
      leverandor: 'BoligPartner',
      modell: 'Duo 135',
      bra_m2: 135,
      soverom: 3,
      bad: 1,
      prisklasse: 'standard' as const,
      pris_fra: 2650000,
      beskrivelse: 'Enkel og effektiv bolig med åpen stue/kjøkken og 3 soverom på plan 2.',
      leveringstid_uker: 14,
      energiklasse: 'B',
    },
    // Mellom
    {
      id: 'h3',
      leverandor: 'Mesterhus',
      modell: 'Villa Duo 145',
      bra_m2: 145,
      soverom: 3,
      bad: 2,
      prisklasse: 'mellom' as const,
      pris_fra: 3450000,
      beskrivelse: 'Romslig tomannsbolig med oppgradert kjøkken (Sigdal), eikeparkett og moderne bad.',
      leveringstid_uker: 18,
      energiklasse: 'A',
    },
    {
      id: 'h4',
      leverandor: 'Nordbohus',
      modell: 'Harmoni 150',
      bra_m2: 150,
      soverom: 4,
      bad: 2,
      prisklasse: 'mellom' as const,
      pris_fra: 3680000,
      beskrivelse: 'Familievennlig med 4 soverom, walk-in-closet og ekstra bad i 2. etasje.',
      leveringstid_uker: 18,
      energiklasse: 'A',
    },
    // Premium
    {
      id: 'h5',
      leverandor: 'Mesterhus',
      modell: 'Exclusive 160',
      bra_m2: 160,
      soverom: 4,
      bad: 2,
      prisklasse: 'premium' as const,
      pris_fra: 4950000,
      beskrivelse: 'Arkitekttegnet med store glassflater, Bulthaup-kjøkken, smarthus-integrasjon og spa-bad.',
      leveringstid_uker: 22,
      energiklasse: 'A+',
    },
    {
      id: 'h6',
      leverandor: 'Hellvik Hus',
      modell: 'Signatur 155',
      bra_m2: 155,
      soverom: 4,
      bad: 2,
      prisklasse: 'premium' as const,
      pris_fra: 4680000,
      beskrivelse: 'Premium materialvalg, naturstein i inngangsparti, gulvvarme i alle rom, Grohe armaturer.',
      leveringstid_uker: 20,
      energiklasse: 'A+',
    },
  ],

  // ---- Bilder ----
  bilder: [
    { id: 'b1', url: '', alt: 'Dronefoto av Bjørnemyrveien 24', kategori: 'drone' as const, bildetekst: 'Oversiktsbilde fra drone som viser tomten og nærområdet. Tomten er markert med oransje.' },
    { id: 'b2', url: '', alt: 'Tomten sett fra veien', kategori: 'tomt' as const, bildetekst: 'Flat, greskledd tomt med noen bjørketrær. Adkomst fra Bjørnemyrveien.' },
    { id: 'b3', url: '', alt: 'Tomten sett fra baksiden', kategori: 'tomt' as const, bildetekst: 'Tomten sett fra sør. God soleksponering gjennom hele dagen.' },
    { id: 'b4', url: '', alt: 'Solforhold juni kl. 18', kategori: 'solforhold' as const, bildetekst: 'Kveldssol i juni. Tomten har sol til kl. 21 på sommerhalvåret.' },
    { id: 'b5', url: '', alt: 'Nabolaget mot nord', kategori: 'nabolag' as const, bildetekst: 'Etablert villabebyggelse med eneboliger fra 1970-2010-tallet.' },
    { id: 'b6', url: '', alt: 'Nabolaget mot sør', kategori: 'nabolag' as const, bildetekst: 'Nyere tomannsboliger og rekkehus i sørlig del av området.' },
    { id: 'b7', url: '', alt: 'Adkomst fra Bjørnemyrveien', kategori: 'vei' as const, bildetekst: 'God vei med fortau. Bredde ca. 6m. 30-sone.' },
    { id: 'b8', url: '', alt: 'Utsikt mot vest', kategori: 'utsikt' as const, bildetekst: 'Utsikt over Kolbotnvannet fra tomtens høyeste punkt.' },
  ],

  // ---- Nabolag ----
  nabolag: {
    beskrivelse: 'Etablert boligområde i Oppegård med god blanding av eneboliger og småhusbebyggelse. Rolig og familievennlig med kort vei til alle fasiliteter.',
    punkter: [
      { kategori: 'Kollektivtransport', navn: 'Oppegård stasjon (tog)', avstand_m: 650, gangminutter: 8 },
      { kategori: 'Kollektivtransport', navn: 'Bussholdeplass Bjørnemyrveien', avstand_m: 120, gangminutter: 2 },
      { kategori: 'Skole', navn: 'Greverud barneskole', avstand_m: 480, gangminutter: 6 },
      { kategori: 'Barnehage', navn: 'Trollskogen barnehage', avstand_m: 300, gangminutter: 4 },
      { kategori: 'Dagligvare', navn: 'Kiwi Oppegård', avstand_m: 550, gangminutter: 7 },
      { kategori: 'Dagligvare', navn: 'Rema 1000 Kolbotn', avstand_m: 1200, gangminutter: 15 },
      { kategori: 'Kjøpesenter', navn: 'Kolbotn Torg', avstand_m: 1500, gangminutter: 18 },
      { kategori: 'Park/friområde', navn: 'Greverudmarka', avstand_m: 200, gangminutter: 3 },
      { kategori: 'Badeplass', navn: 'Kolbotnvannet', avstand_m: 900, gangminutter: 11 },
      { kategori: 'Legesenter', navn: 'Oppegård legesenter', avstand_m: 700, gangminutter: 9 },
      { kategori: 'Treningssenter', navn: 'SATS Kolbotn', avstand_m: 1400, gangminutter: 17 },
    ],
  },

  // Husmodell-katalog for husvelgeren (utvidet med nye felter)
  husmodell_katalog: [
    {
      id: 'h1', leverandor: 'Nordbohus', modell: 'Kompakt 140', bra_m2: 140, soverom: 3, bad: 2, etasjer: 2,
      prisklasse: 'standard' as const, pris_fra: 2890000, leveringstid_uker: 16, energiklasse: 'A',
      beskrivelse: 'Kompakt tomannsbolig-halvdel med smart planløsning. Åpen kjøkken/stue, 3 soverom på plan 2.',
      egenskaper: ['Saltak', 'Integrert bod', 'Carport-mulighet', 'Balkong'],
      passer_tomt: true,
    },
    {
      id: 'h2', leverandor: 'BoligPartner', modell: 'Duo 135', bra_m2: 135, soverom: 3, bad: 1, etasjer: 2,
      prisklasse: 'standard' as const, pris_fra: 2650000, leveringstid_uker: 14, energiklasse: 'B',
      beskrivelse: 'Enkel og effektiv bolig med åpen løsning i 1. etasje og 3 soverom på plan 2.',
      egenskaper: ['Saltak', 'Kompakt fotavtrykk', 'Lav pris'],
      passer_tomt: true,
    },
    {
      id: 'h3', leverandor: 'Mesterhus', modell: 'Villa Duo 145', bra_m2: 145, soverom: 3, bad: 2, etasjer: 2,
      prisklasse: 'mellom' as const, pris_fra: 3450000, leveringstid_uker: 18, energiklasse: 'A',
      beskrivelse: 'Romslig tomannsbolig med oppgradert Sigdal-kjøkken, eikeparkett og moderne bad.',
      egenskaper: ['Sigdal kjøkken', 'Eikeparkett', 'Vannbåren varme', 'Balkong'],
      passer_tomt: true,
    },
    {
      id: 'h4', leverandor: 'Nordbohus', modell: 'Harmoni 150', bra_m2: 150, soverom: 4, bad: 2, etasjer: 2,
      prisklasse: 'mellom' as const, pris_fra: 3680000, leveringstid_uker: 18, energiklasse: 'A',
      beskrivelse: 'Familievennlig med 4 soverom, walk-in-closet og ekstra bad i 2. etasje.',
      egenskaper: ['4 soverom', 'Walk-in-closet', 'Dobbelt bad', 'Romslig entre'],
      passer_tomt: true,
    },
    {
      id: 'h5', leverandor: 'Mesterhus', modell: 'Exclusive 160', bra_m2: 160, soverom: 4, bad: 2, etasjer: 2,
      prisklasse: 'premium' as const, pris_fra: 4950000, leveringstid_uker: 22, energiklasse: 'A+',
      beskrivelse: 'Arkitekttegnet med store glassflater, Bulthaup-kjøkken, smarthus og spa-bad.',
      egenskaper: ['Bulthaup kjøkken', 'Smarthus', 'Spa-bad', 'Store glassflater', 'Terrasse'],
      passer_tomt: true,
    },
    {
      id: 'h6', leverandor: 'Hellvik Hus', modell: 'Signatur 155', bra_m2: 155, soverom: 4, bad: 2, etasjer: 2,
      prisklasse: 'premium' as const, pris_fra: 4680000, leveringstid_uker: 20, energiklasse: 'A+',
      beskrivelse: 'Premium materialvalg, naturstein, gulvvarme i alle rom, Grohe armaturer.',
      egenskaper: ['Naturstein', 'Gulvvarme', 'Grohe armaturer', 'Integrert garasje'],
      passer_tomt: true,
    },
    {
      id: 'h7', leverandor: 'Norgeshus', modell: 'Panorama 170', bra_m2: 170, soverom: 4, bad: 2, etasjer: 2,
      prisklasse: 'premium' as const, pris_fra: 5200000, leveringstid_uker: 20, energiklasse: 'A+',
      beskrivelse: 'Stort hus med panoramavinduer og åpen andre etasje. Krever BYA-dispensasjon på denne tomten.',
      egenskaper: ['Panoramavinduer', 'Dobbel garasje', 'Hjemmekontor', 'Vaskerom'],
      passer_tomt: false,
      grunn_ikke_passer: 'Fotavtrykket overskrider maks BYA 25%. Krever dispensasjon.',
    },
    {
      id: 'h8', leverandor: 'BoligPartner', modell: 'Urban 120', bra_m2: 120, soverom: 2, bad: 1, etasjer: 2,
      prisklasse: 'standard' as const, pris_fra: 2350000, leveringstid_uker: 12, energiklasse: 'A',
      beskrivelse: 'Kompakt og urban. Perfekt for par eller som utleiedel. Rask leveringstid.',
      egenskaper: ['Kompakt', 'Rask levering', 'Utleie-egnet', 'Flatt tak'],
      passer_tomt: true,
    },
  ],
}

export default async function Tomteside({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  // I produksjon: hent fra Supabase basert på id
  const tomt = DEMO_TOMT

  return (
    <div className="bg-white">
      {/* Hero med kart og nøkkelinfo */}
      <TomtHero
        adresse={tomt.adresse}
        poststed={tomt.poststed}
        kommune={tomt.kommune}
        areal_m2={tomt.areal_m2}
        gnr={tomt.gnr}
        bnr={tomt.bnr}
        score={tomt.tomtescore.total}
      />

      {/* Sticky navigasjon for seksjoner */}
      <nav className="sticky top-16 z-40 bg-white border-b border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 overflow-x-auto scrollbar-hide py-3 text-sm">
            {[
              { href: '#oversikt', label: 'Oversikt' },
              { href: '#bilder', label: 'Bilder' },
              { href: '#husvelger', label: 'Velg hus' },
              { href: '#for-etter', label: 'Før/etter' },
              { href: '#tegnebua', label: 'Tegning' },
              { href: '#visualisering', label: 'Visualisering' },
              { href: '#mulighetsstudie', label: 'Mulighetsstudie' },
              { href: '#scenarioer', label: 'Scenarioer' },
              { href: '#okonomi', label: 'Økonomi' },
              { href: '#regulering', label: 'Regulering' },
              { href: '#godkjenninger', label: 'Nærområdet' },
              { href: '#dispensasjoner', label: 'Dispensasjoner' },
              { href: '#tidslinje', label: 'Tidslinje' },
              { href: '#prising', label: 'Prising' },
              { href: '#finansiering', label: 'Finansiering' },
              { href: '#nabolag', label: 'Nabolag' },
              { href: '#risiko', label: 'Risiko' },
              { href: '#sjekkliste', label: 'Sjekkliste' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap text-brand-500 hover:text-tomtly-accent transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Hovedinnhold – 2/3 */}
          <div className="lg:col-span-2 space-y-16">
            <section id="oversikt">
              <TomtScore tomtescore={tomt.tomtescore} />
            </section>

            <section id="bilder">
              <TomtBildegalleri
                bilder={tomt.bilder}
                adresse={tomt.adresse}
              />
            </section>

            <section id="husvelger">
              <TomtHusvelger
                husmodeller={tomt.husmodell_katalog}
                abonnement="standard"
                maks_valg={3}
              />
            </section>

            <section id="for-etter">
              <TomtForEtter scenarioNavn="Tomannsbolig" />
            </section>

            <section id="tegnebua">
              <TomtTegnebua
                valgte_husmodeller={1}
                estimert_pris_tegning={85000}
                estimert_pris_soknad={45000}
                estimert_tid_uker={4}
              />
            </section>

            <section id="visualisering">
              <TomtVisualisering />
            </section>

            <section id="mulighetsstudie">
              <TomtMulighetsstudie mulighetsstudie={tomt.mulighetsstudie} />
            </section>

            <section id="scenarioer">
              <TomtScenario scenarioer={tomt.scenarioer} />
            </section>

            <section id="okonomi">
              <TomtByggekostnad
                byggekostnad={tomt.byggekostnad}
              />
              <div className="mt-16">
                <TomtSalgsverdi salgsverdi={tomt.salgsverdi} />
              </div>
            </section>

            <section id="regulering">
              <TomtRegulering regulering={tomt.regulering} />
            </section>

            <section id="godkjenninger">
              <TomtGodkjenninger
                tiltak={tomt.godkjente_tiltak}
                radius_m={250}
              />
            </section>

            <section id="dispensasjoner">
              <TomtDispensasjoner
                dispensasjoner={tomt.dispensasjoner}
              />
            </section>

            <section id="tidslinje">
              <TomtTidslinje
                config={tomt.tidslinje_config}
              />
            </section>

            <section id="prising">
              <TomtEntreprenorPrising
                tilbud={tomt.entreprenor_tilbud}
                ferdighus={tomt.ferdighus}
                behov={tomt.entreprenor_behov}
              />
            </section>

            <section id="finansiering">
              <TomtFinansiering
                tomtepris={4500000}
                byggekostnad_inkl_mva={tomt.byggekostnad.total_inkl_mva}
                estimert_salgsverdi={tomt.salgsverdi.estimert_total}
              />
            </section>

            <section id="nabolag">
              <TomtNabolag
                punkter={tomt.nabolag.punkter}
                nabolag_beskrivelse={tomt.nabolag.beskrivelse}
              />
            </section>

            <section id="risiko">
              <TomtRisiko risikoanalyse={tomt.risikoanalyse} />
            </section>

            <section id="sjekkliste">
              <TomtSjekkliste />
            </section>
          </div>

          {/* Sidebar – 1/3 */}
          <div className="lg:col-span-1">
            <div className="sticky top-36 space-y-6">
              <TomtKart
                lat={tomt.senterpunkt.lat}
                lng={tomt.senterpunkt.lng}
              />
              <TomtKontakt />
              <TomtDeling adresse={tomt.adresse} tomteId={tomt.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
