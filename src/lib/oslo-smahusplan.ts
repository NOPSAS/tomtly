// Oslo småhusplan — midlertidig forbud og ny plan
// Gjelder alle eiendommer i Oslo regulert under småhusplanen (S-4220)

export const OSLO_SMAHUSPLAN = {
  status: 'Midlertidig forbud mot tiltak (MFT)',
  vedtattDato: '2023-06-14',
  gjelderTil: '2027-06-14', // Kan forlenges
  planId: 'S-4220',

  dokumenter: [
    {
      navn: 'Midlertidig forbud mot tiltak i småhusplanen',
      url: '/oslo-smahusplan/midlertidig-forbud.pdf',
      type: 'vedtak',
    },
    {
      navn: 'Forslag til ny småhusplan',
      url: '/oslo-smahusplan/forslag-smahusplanen.pdf',
      type: 'forslag',
    },
    {
      navn: 'Varsel om mulig forlengelse av MFT',
      url: '/oslo-smahusplan/varsel-forlengelse-mft.pdf',
      type: 'varsel',
    },
  ],

  sammendrag: `Oslo kommune vedtok 14. juni 2023 et midlertidig forbud mot tiltak (MFT) i småhusplanområdet (S-4220). Forbudet gjelder mens ny småhusplan utarbeides og er ment å hindre at det gjennomføres tiltak som kan vanskeliggjøre planarbeidet. Ny plan er på høring og forventes vedtatt i 2025-2026.`,

  unntak: [
    'Innvendig ombygging og vedlikehold som ikke endrer bærekonstruksjon',
    'Fasadeendringer som ikke endrer bygningens volum',
    'Tiltak i tråd med allerede gitt rammetillatelse (gyldig)',
    'Riving uten gjenoppbygging',
    'Midlertidige tiltak (maks 2 år)',
    'Tiltak som er i samsvar med BÅDE gjeldende og foreslått ny plan',
    'Mindre tiltak på bebygd eiendom (PBL § 20-5) der tiltaket ikke strider mot ny plan',
    'Søknader der kommunen vurderer at tiltaket ikke vil vanskeliggjøre planarbeidet',
  ],

  forbudOmfatter: [
    'Nybygg (eneboliger, tomannsboliger, rekkehus)',
    'Tilbygg og påbygg som endrer bygningens volum',
    'Fradeling av tomt til ny boligbebyggelse',
    'Terrenginngrep og oppfylling',
    'Bruksendring fra bolig til annet formål',
  ],

  nyPlanHoydepunkter: [
    'Strengere krav til grøntareal og naturmangfold — minst 60 % grøntareal per tomt',
    'Bevaring av trær med stammeomkrets > 90 cm',
    'Lavere utnyttelsesgrad: %-BYA reduseres fra 24 % til typisk 16-18 %',
    'Strengere krav til terrengtilpasning',
    'Krav om minimum 2 boenheter per tomt over 600 m²',
    'Skjerpede regler for parkering — maks 2 plasser per boenhet',
    'Nye regler for fradeling — større minsteareal',
    'Økt fokus på overvannshåndtering',
  ],

  viktigForKjopere: [
    'Sjekk om eiendommen ligger i småhusplanområdet (S-4220) før du planlegger tiltak',
    'Allerede gitte rammetillatelser er gyldige — men igangsettingstillatelse kan kreve ny vurdering',
    'Innvendig oppussing og vedlikehold kan gjøres uten dispensasjon',
    'For nybygg/tilbygg: Søk om dispensasjon hos PBE — blir vurdert enkeltvis',
    'Ny plan vil sannsynligvis gi lavere %-BYA enn i dag — kjøpere bør vurdere dette',
  ],
}
