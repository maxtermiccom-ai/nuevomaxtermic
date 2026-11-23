create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  description text,
  details text,
  location text,
  result_key text,
  featured boolean not null default false,
  client_name text,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.projects add column if not exists location text;

alter table public.projects enable row level security;

create policy "Public read access"
  on public.projects
  for select
  using (true);

create policy "Authenticated users can insert projects"
  on public.projects
  for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update projects"
  on public.projects
  for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can delete projects"
  on public.projects
  for delete
  using (auth.role() = 'authenticated');

create policy "Public project gallery read access"
  on storage.objects
  for select
  using (bucket_id = 'project-gallery');

create policy "Authenticated users can upload project images"
  on storage.objects
  for insert
  with check (bucket_id = 'project-gallery' and auth.role() = 'authenticated');

create policy "Authenticated users can update project images"
  on storage.objects
  for update
  using (bucket_id = 'project-gallery' and auth.role() = 'authenticated')
  with check (bucket_id = 'project-gallery' and auth.role() = 'authenticated');

create policy "Authenticated users can delete project images"
  on storage.objects
  for delete
  using (bucket_id = 'project-gallery' and auth.role() = 'authenticated');

create bucket if not exists project-gallery with public;

create table if not exists public.whatsapp_interactions (
  id uuid primary key default gen_random_uuid(),
  event_type text not null default 'click' check (event_type = 'click'),
  source text not null default 'floating_button',
  page_path text not null default '/',
  phone text,
  created_at timestamptz not null default now()
);

create index if not exists whatsapp_interactions_created_at_idx
  on public.whatsapp_interactions (created_at desc);

alter table public.whatsapp_interactions enable row level security;

drop policy if exists "Public can record WhatsApp clicks" on public.whatsapp_interactions;
drop policy if exists "Public can register WhatsApp contacts" on public.whatsapp_interactions;
drop policy if exists "Authenticated admins can read WhatsApp interactions" on public.whatsapp_interactions;
create policy "Public can record WhatsApp clicks"
  on public.whatsapp_interactions
  for insert
  to anon, authenticated
  with check (
    event_type = 'click'
    and phone is null
    and length(source) <= 80
    and length(page_path) <= 500
  );

grant insert on public.whatsapp_interactions to anon, authenticated;
grant select on public.whatsapp_interactions to authenticated;

create policy "Authenticated admins can read WhatsApp interactions"
  on public.whatsapp_interactions
  for select
  to authenticated
  using (true);
