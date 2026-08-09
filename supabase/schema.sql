-- Blue Lotus Experience — application form
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query).

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  full_name text not null,
  age_range text not null,
  email text not null,
  phone text not null,
  location text not null,

  season_of_life text not null,
  meaningful_note text,

  dietary_preferences text[] not null default '{}',
  dietary_other text,

  health_notes text,

  agreed_to_terms boolean not null default false
);

-- Row Level Security: the site only ever needs to INSERT new applications
-- from the browser using the public anon key. Nobody (including the anon
-- key) can read, update, or delete rows — you'll review applications from
-- the Supabase dashboard (or with the service role key) instead.
alter table public.applications enable row level security;

create policy "Public can submit applications"
  on public.applications
  for insert
  to anon
  with check (true);
