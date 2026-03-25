// Kommunale kartløsninger der man kan hente DOK-analyse, planrapport og mer
// Mange kommuner bruker Norkart kommunekart eller Geodata Geocortex

export interface KartInnsynKilde {
  kommune: string
  navn: string
  url: string
  sokeUrl: (gnr: number, bnr: number) => string
  harDokAnalyse: boolean
  harPlanrapport: boolean
}

// Kjente kommunale kartinnsyn
export const KART_INNSYN: Record<string, KartInnsynKilde[]> = {
  // Nesodden - Geocortex
  '3212': [{
    kommune: 'Nesodden',
    navn: 'Nesodden Kartinnsyn (Geocortex)',
    url: 'https://apps.geocortex.com/webviewer/?app=dde94e10d4de41bb9cef88511d07acd8',
    sokeUrl: (gnr, bnr) => `https://apps.geocortex.com/webviewer/?app=dde94e10d4de41bb9cef88511d07acd8`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Oslo - PBE kart
  '0301': [{
    kommune: 'Oslo',
    navn: 'Oslo PBE Kartinnsyn',
    url: 'https://od2.pbe.oslo.kommune.no/kart/',
    sokeUrl: (gnr, bnr) => `https://od2.pbe.oslo.kommune.no/kart/#/search?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: false,
    harPlanrapport: true,
  }, {
    kommune: 'Oslo',
    navn: 'Oslo Hva gjelder her',
    url: 'https://od2.pbe.oslo.kommune.no/hvagjelder/',
    sokeUrl: (gnr, bnr) => `https://od2.pbe.oslo.kommune.no/hvagjelder/`,
    harDokAnalyse: false,
    harPlanrapport: true,
  }],

  // Bærum - Norkart kommunekart
  '3201': [{
    kommune: 'Bærum',
    navn: 'Bærum Kommunekart',
    url: 'https://kommunekart.com/klient/baerum',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/baerum/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Asker - Norkart kommunekart
  '3203': [{
    kommune: 'Asker',
    navn: 'Asker Kommunekart',
    url: 'https://kommunekart.com/klient/asker',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/asker/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Nordre Follo - Norkart
  '3207': [{
    kommune: 'Nordre Follo',
    navn: 'Nordre Follo Kommunekart',
    url: 'https://kommunekart.com/klient/nordrefollo',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/nordrefollo/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Drammen
  '3301': [{
    kommune: 'Drammen',
    navn: 'Drammen Kommunekart',
    url: 'https://kommunekart.com/klient/drammen',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/drammen/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Fredrikstad
  '3107': [{
    kommune: 'Fredrikstad',
    navn: 'Fredrikstad Kommunekart',
    url: 'https://kommunekart.com/klient/fredrikstad',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/fredrikstad/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Kristiansand
  '4204': [{
    kommune: 'Kristiansand',
    navn: 'Kristiansand Kommunekart',
    url: 'https://kommunekart.com/klient/kristiansand',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/kristiansand/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Bergen
  '4601': [{
    kommune: 'Bergen',
    navn: 'Bergen Kommunekart',
    url: 'https://kommunekart.com/klient/bergen',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/bergen/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Stavanger
  '1103': [{
    kommune: 'Stavanger',
    navn: 'Stavanger Kommunekart',
    url: 'https://kommunekart.com/klient/stavanger',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/stavanger/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Trondheim
  '5001': [{
    kommune: 'Trondheim',
    navn: 'Trondheim Kommunekart',
    url: 'https://kommunekart.com/klient/trondheim',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/trondheim/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Tromsø
  '5501': [{
    kommune: 'Tromsø',
    navn: 'Tromsø Kommunekart',
    url: 'https://kommunekart.com/klient/tromso',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/tromso/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Lillestrøm
  '3205': [{
    kommune: 'Lillestrøm',
    navn: 'Lillestrøm Kommunekart',
    url: 'https://kommunekart.com/klient/lillestrom',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/lillestrom/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Moss
  '3103': [{
    kommune: 'Moss',
    navn: 'Moss Kommunekart',
    url: 'https://kommunekart.com/klient/moss',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/moss/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],

  // Sandnes
  '1108': [{
    kommune: 'Sandnes',
    navn: 'Sandnes Kommunekart',
    url: 'https://kommunekart.com/klient/sandnes',
    sokeUrl: (gnr, bnr) => `https://kommunekart.com/klient/sandnes/eiendom?gnr=${gnr}&bnr=${bnr}`,
    harDokAnalyse: true,
    harPlanrapport: true,
  }],
}

export function getKartInnsyn(kommunenummer: string): KartInnsynKilde[] {
  return KART_INNSYN[kommunenummer] || []
}
