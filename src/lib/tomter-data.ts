// Felles datakilde for alle tomter — brukes av /tomter, /kart, og andre sider.
// Legg til nye tomter HER, så dukker de opp overalt automatisk.

export interface TomtListing {
  id: string
  adresse: string
  poststed: string
  kommune: string
  areal_m2: number
  pris: number
  type: string
  bilde: string
  solgt?: boolean
  lat: number
  lng: number
  poi: { type: string; navn: string; avstand: string }[]
}

export const ALLE_TOMTER: TomtListing[] = [
  {
    id: 'alvaern-65', adresse: 'Gamle Alværnvei 65', poststed: 'Alværn',
    kommune: 'Nesodden', areal_m2: 1374, pris: 3200000, type: 'Eneboligtomt',
    bilde: '/tomter/alvaern-65/render-cam-02.jpg', solgt: true,
    lat: 59.8153, lng: 10.6193,
    poi: [
      { type: 'bus', navn: 'Buss til Tangen', avstand: '4 min gange' },
      { type: 'skole', navn: 'Alværn ungdomsskole', avstand: '10 min gange' },
      { type: 'butikk', navn: 'Dagligvare', avstand: '18 min gange' },
      { type: 'natur', navn: 'Skog og turområder', avstand: '1 min gange' },
    ],
  },
  {
    id: 'bjornemyrveien-20', adresse: 'Bjørnemyrveien 20', poststed: 'Bjørnemyr',
    kommune: 'Nesodden', areal_m2: 605, pris: 3000000, type: 'Eneboligtomt',
    bilde: '/tomter/bjornemyrveien-shared/render-parsell-b.jpg',
    lat: 59.8346, lng: 10.6419,
    poi: [
      { type: 'bus', navn: 'Bussholdeplass', avstand: '5 min gange' },
      { type: 'skole', navn: 'Bjørnemyr skole', avstand: '7 min gange' },
      { type: 'butikk', navn: 'Dagligvare', avstand: '6 min gange' },
      { type: 'natur', navn: 'Skog og turområder', avstand: '1 min gange' },
    ],
  },
  {
    id: 'bjornemyrveien-22', adresse: 'Bjørnemyrveien 22', poststed: 'Bjørnemyr',
    kommune: 'Nesodden', areal_m2: 613, pris: 3000000, type: 'Eneboligtomt',
    bilde: '/tomter/bjornemyrveien-shared/render-parsell-c.jpg',
    lat: 59.8347, lng: 10.6422,
    poi: [
      { type: 'bus', navn: 'Bussholdeplass', avstand: '5 min gange' },
      { type: 'skole', navn: 'Bjørnemyr skole', avstand: '7 min gange' },
      { type: 'butikk', navn: 'Dagligvare', avstand: '6 min gange' },
      { type: 'natur', navn: 'Skog og turområder', avstand: '1 min gange' },
    ],
  },
  {
    id: 'alvaern-67', adresse: 'Gamle Alværnvei 67', poststed: 'Alværn',
    kommune: 'Nesodden', areal_m2: 900, pris: 3200000, type: 'Eneboligtomt',
    bilde: '/tomter/alvaern-shared/alvaern-render-aerial-1-DvVXdDku.jpg',
    lat: 59.8155, lng: 10.6196,
    poi: [
      { type: 'bus', navn: 'Buss til Tangen', avstand: '4 min gange' },
      { type: 'skole', navn: 'Alværn ungdomsskole', avstand: '10 min gange' },
      { type: 'butikk', navn: 'Dagligvare', avstand: '18 min gange' },
      { type: 'natur', navn: 'Skog og turområder', avstand: '1 min gange' },
    ],
  },
  {
    id: 'nedre-liavei-11', adresse: 'Nedre Liavei 11', poststed: 'Holmestrand',
    kommune: 'Holmestrand', areal_m2: 982, pris: 1000000, type: 'Eneboligtomt',
    bilde: '/tomter/nedre-liavei-11/vindy-bilde.png',
    lat: 59.4895, lng: 10.3165,
    poi: [
      { type: 'bus', navn: 'Bussholdeplass', avstand: '8 min gange' },
      { type: 'skole', navn: 'Holmestrand skole', avstand: '12 min gange' },
      { type: 'butikk', navn: 'Dagligvare', avstand: '10 min gange' },
      { type: 'natur', navn: 'Skog og turområder', avstand: '2 min gange' },
    ],
  },
]
