-- ============================================================
-- TOMTLY – Database Schema (Supabase/PostgreSQL)
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "postgis";

-- ============================================================
-- BRUKERE
-- ============================================================

create table public.brukere (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  auth_id uuid unique references auth.users(id) on delete cascade,
  email text unique not null,
  navn text not null,
  telefon text,
  rolle text not null check (rolle in ('eier', 'megler', 'admin')),
  firma text,
  orgnr text,
  profilbilde text,
  onboarding_ferdig boolean default false
);

-- Megler-spesifikk info
create table public.meglerforetak (
  id uuid primary key default uuid_generate_v4(),
  bruker_id uuid references public.brukere(id) on delete cascade,
  meglerforetaknr text not null,
  firmanavn text not null,
  orgnr text not null,
  antall_meglere int default 1,
  created_at timestamptz default now() not null
);

-- Abonnementer
create table public.abonnementer (
  id uuid primary key default uuid_generate_v4(),
  bruker_id uuid references public.brukere(id) on delete cascade,
  type text not null check (type in ('fastpris', 'provisjon', 'starter', 'pro', 'enterprise')),
  aktiv boolean default true,
  startdato date default current_date,
  sluttdato date,
  tomter_inkludert int,
  tomter_brukt int default 0,
  stripe_subscription_id text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- TOMTER
-- ============================================================

create table public.tomter (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  status text not null default 'draft' check (
    status in ('draft', 'analyzing', 'ready', 'published', 'sold', 'archived')
  ),
  slug text unique,

  -- Adresse
  adresse text not null,
  postnummer text,
  poststed text,
  kommune text,
  fylke text,

  -- Matrikkel
  gnr int,
  bnr int,
  fnr int,
  snr int,

  -- Areal og geometri
  areal_m2 numeric not null,
  geometri geometry(Polygon, 4326),
  senterpunkt geometry(Point, 4326),

  -- Eierskap
  eier_id uuid references public.brukere(id),
  megler_id uuid references public.brukere(id),

  -- Pris
  prisantydning numeric,
  salgspris numeric,

  -- Beskrivelse
  beskrivelse text
);

-- Spatial index for kartsøk
create index idx_tomter_senterpunkt on public.tomter using gist (senterpunkt);
create index idx_tomter_geometri on public.tomter using gist (geometri);
create index idx_tomter_status on public.tomter (status);
create index idx_tomter_kommune on public.tomter (kommune);
create index idx_tomter_eier on public.tomter (eier_id);
create index idx_tomter_megler on public.tomter (megler_id);

-- ============================================================
-- REGULERING
-- ============================================================

create table public.reguleringer (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid unique references public.tomter(id) on delete cascade,
  arealformaal text,
  utnyttelsesgrad_bya numeric,
  utnyttelsesgrad_tu numeric,
  maks_hoyde_m numeric,
  maks_etasjer int,
  byggegrense_m numeric,
  parkering_krav text,
  planid text,
  plannavn text,
  vedtaksdato date,
  bestemmelser jsonb default '[]'::jsonb,
  hensynssoner jsonb default '[]'::jsonb,
  created_at timestamptz default now() not null
);

-- ============================================================
-- MULIGHETSSTUDIE
-- ============================================================

create table public.mulighetsstudier (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid unique references public.tomter(id) on delete cascade,
  oppsummering text,
  maks_bra_m2 numeric,
  anbefalt_bra_m2 numeric,
  maks_enheter int,
  anbefalt_enheter int,
  bygningstyper jsonb default '[]'::jsonb,
  fordeler jsonb default '[]'::jsonb,
  utfordringer jsonb default '[]'::jsonb,
  arkitektens_vurdering text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- UTVIKLINGSSCENARIOER
-- ============================================================

create table public.utviklingsscenarioer (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid references public.tomter(id) on delete cascade,
  navn text not null,
  beskrivelse text,
  type text check (type in ('konservativ', 'moderat', 'ambisios')),
  enheter jsonb default '[]'::jsonb,
  total_bra_m2 numeric,
  utnyttelsesgrad numeric,
  estimert_byggekostnad numeric,
  estimert_salgsverdi numeric,
  estimert_fortjeneste numeric,
  roi_prosent numeric,
  visualisering_url text,
  created_at timestamptz default now() not null
);

create index idx_scenarioer_tomt on public.utviklingsscenarioer (tomt_id);

-- ============================================================
-- BYGGEKOSTNAD
-- ============================================================

create table public.byggekostnader (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid unique references public.tomter(id) on delete cascade,
  scenario_id uuid references public.utviklingsscenarioer(id),
  grunnarbeid numeric default 0,
  infrastruktur numeric default 0,
  bygningskropp numeric default 0,
  tekniske_anlegg numeric default 0,
  innvendig numeric default 0,
  utomhus numeric default 0,
  prosjektering numeric default 0,
  uforutsett_prosent numeric default 10,
  total_eks_mva numeric,
  total_inkl_mva numeric,
  kostnad_per_m2 numeric,
  created_at timestamptz default now() not null
);

-- ============================================================
-- SALGSVERDI
-- ============================================================

create table public.salgsverdier (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid unique references public.tomter(id) on delete cascade,
  estimert_per_m2 numeric,
  estimert_total numeric,
  konfidensintervall_lav numeric,
  konfidensintervall_hoy numeric,
  markedsvurdering text,
  created_at timestamptz default now() not null
);

create table public.sammenlignbare_salg (
  id uuid primary key default uuid_generate_v4(),
  salgsverdi_id uuid references public.salgsverdier(id) on delete cascade,
  adresse text,
  salgsdato date,
  pris numeric,
  bra_m2 numeric,
  pris_per_m2 numeric,
  avstand_km numeric
);

-- ============================================================
-- RISIKOANALYSE
-- ============================================================

create table public.risikoanalyser (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid unique references public.tomter(id) on delete cascade,
  total_risiko text check (total_risiko in ('lav', 'medium', 'hoy')),
  faktorer jsonb default '[]'::jsonb,
  anbefalinger jsonb default '[]'::jsonb,
  created_at timestamptz default now() not null
);

-- ============================================================
-- TOMTESCORE
-- ============================================================

create table public.tomtescorer (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid references public.tomter(id) on delete cascade,
  total int not null check (total between 0 and 100),
  beliggenhet int default 0,
  regulering int default 0,
  topografi int default 0,
  infrastruktur int default 0,
  marked int default 0,
  okonomi int default 0,
  forklaring text,
  beregnet_dato timestamptz default now() not null
);

create index idx_tomtescorer_tomt on public.tomtescorer (tomt_id);
create index idx_tomtescorer_total on public.tomtescorer (total desc);

-- ============================================================
-- MEDIA
-- ============================================================

create table public.visualiseringer (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid references public.tomter(id) on delete cascade,
  scenario_id uuid references public.utviklingsscenarioer(id),
  type text check (type in ('situasjonsplan', '3d_modell', 'fasade', 'snitt', 'fugleperspektiv')),
  url text not null,
  beskrivelse text,
  created_at timestamptz default now() not null
);

create table public.dokumenter (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid references public.tomter(id) on delete cascade,
  type text check (type in ('reguleringsplan', 'grunnbok', 'kart', 'rapport', 'annet')),
  navn text not null,
  url text not null,
  created_at timestamptz default now() not null
);

-- ============================================================
-- ANALYSEOPPGAVER (jobb-kø)
-- ============================================================

create table public.analyseoppgaver (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid references public.tomter(id) on delete cascade,
  status text default 'pending' check (
    status in ('pending', 'running', 'completed', 'failed')
  ),
  steg jsonb default '[]'::jsonb,
  startet timestamptz,
  ferdig timestamptz,
  feilmelding text,
  created_at timestamptz default now() not null
);

create index idx_analyser_status on public.analyseoppgaver (status);

-- ============================================================
-- HENVENDELSER
-- ============================================================

create table public.henvendelser (
  id uuid primary key default uuid_generate_v4(),
  tomt_id uuid references public.tomter(id) on delete cascade,
  navn text not null,
  email text not null,
  telefon text,
  melding text,
  lest boolean default false,
  created_at timestamptz default now() not null
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.brukere enable row level security;
alter table public.tomter enable row level security;
alter table public.reguleringer enable row level security;
alter table public.mulighetsstudier enable row level security;
alter table public.utviklingsscenarioer enable row level security;
alter table public.byggekostnader enable row level security;
alter table public.salgsverdier enable row level security;
alter table public.risikoanalyser enable row level security;
alter table public.tomtescorer enable row level security;
alter table public.visualiseringer enable row level security;
alter table public.dokumenter enable row level security;
alter table public.henvendelser enable row level security;

-- Offentlige tomter kan leses av alle
create policy "Publiserte tomter er offentlige"
  on public.tomter for select
  using (status = 'published');

-- Eiere kan se egne tomter
create policy "Eiere ser egne tomter"
  on public.tomter for select
  using (auth.uid() = eier_id);

-- Meglere kan se sine tomter
create policy "Meglere ser sine tomter"
  on public.tomter for select
  using (auth.uid() = megler_id);

-- Eiere kan opprette tomter
create policy "Eiere kan opprette tomter"
  on public.tomter for insert
  with check (auth.uid() = eier_id);

-- Eiere kan oppdatere egne tomter
create policy "Eiere kan oppdatere egne tomter"
  on public.tomter for update
  using (auth.uid() = eier_id);

-- Offentlig lesning av analyse-data for publiserte tomter
create policy "Offentlig analyse for publiserte tomter"
  on public.reguleringer for select
  using (
    exists (
      select 1 from public.tomter
      where tomter.id = reguleringer.tomt_id
      and tomter.status = 'published'
    )
  );

create policy "Offentlig mulighetsstudie for publiserte tomter"
  on public.mulighetsstudier for select
  using (
    exists (
      select 1 from public.tomter
      where tomter.id = mulighetsstudier.tomt_id
      and tomter.status = 'published'
    )
  );

create policy "Offentlige scenarioer for publiserte tomter"
  on public.utviklingsscenarioer for select
  using (
    exists (
      select 1 from public.tomter
      where tomter.id = utviklingsscenarioer.tomt_id
      and tomter.status = 'published'
    )
  );

create policy "Offentlig tomtescore for publiserte tomter"
  on public.tomtescorer for select
  using (
    exists (
      select 1 from public.tomter
      where tomter.id = tomtescorer.tomt_id
      and tomter.status = 'published'
    )
  );

-- ============================================================
-- VIEWS for enkel datahenting
-- ============================================================

create or replace view public.tomter_med_score as
select
  t.*,
  ts.total as tomtescore,
  ts.beliggenhet as score_beliggenhet,
  ts.regulering as score_regulering,
  ts.topografi as score_topografi,
  ts.infrastruktur as score_infrastruktur,
  ts.marked as score_marked,
  ts.okonomi as score_okonomi
from public.tomter t
left join lateral (
  select * from public.tomtescorer
  where tomt_id = t.id
  order by beregnet_dato desc
  limit 1
) ts on true;

-- ============================================================
-- FUNCTIONS
-- ============================================================

-- Funksjon for å hente tomter innenfor et kartområde
create or replace function public.tomter_i_omraade(
  min_lat double precision,
  min_lng double precision,
  max_lat double precision,
  max_lng double precision
)
returns setof public.tomter_med_score
language sql
stable
as $$
  select * from public.tomter_med_score
  where status = 'published'
  and st_within(
    senterpunkt,
    st_makeenvelope(min_lng, min_lat, max_lng, max_lat, 4326)
  );
$$;

-- Auto-oppdatering av updated_at
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_tomter_updated_at
  before update on public.tomter
  for each row execute function public.handle_updated_at();

create trigger set_brukere_updated_at
  before update on public.brukere
  for each row execute function public.handle_updated_at();
