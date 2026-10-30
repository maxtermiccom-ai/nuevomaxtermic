create extension if not exists "pgcrypto";

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  description text,
  client_name text,
  images text[] not null default '{}',
  created_at timestamptz not null default now()
);

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
