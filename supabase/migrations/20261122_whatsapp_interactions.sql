create extension if not exists "pgcrypto";

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
