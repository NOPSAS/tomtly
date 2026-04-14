// Aktuelt — nyhetsartikler fra Tomtly
// Nye artikler legges til i toppen av ARTIKLER-arrayen

export interface Artikkel {
  slug: string
  tittel: string
  ingress: string
  forfatter: string
  publisert: string // ISO yyyy-mm-dd
  kategori: 'Samarbeid' | 'Produkt' | 'Marked' | 'Selskap'
  /** Markdown-lignende avsnitt. Hvert element er ett avsnitt. Kan inneholde **bold**. */
  innhold: string[]
  /** Valgfritt — kort sitat som vises i artikkelen */
  sitat?: { tekst: string; av: string }
}

export const ARTIKLER: Artikkel[] = [
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
