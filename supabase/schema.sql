create extension if not exists "pgcrypto";

create table if not exists scraped_sites (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

create table if not exists design_tokens (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references scraped_sites(id) on delete cascade,
  colors jsonb not null,
  typography jsonb not null,
  spacing jsonb not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists locked_tokens (
  id uuid primary key default gen_random_uuid(),
  token_key text not null,
  is_locked boolean not null default true,
  site_id uuid references scraped_sites(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists version_history (
  id uuid primary key default gen_random_uuid(),
  site_id uuid references scraped_sites(id) on delete cascade,
  previous_tokens jsonb not null,
  updated_tokens jsonb not null,
  timestamp timestamptz not null default now()
);
