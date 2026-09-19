-- Thrift Trades: brands, colors, and richer shop filters
-- Run this once in the Supabase project's SQL editor (or via `supabase db push`).

create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists colors (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  -- Hex swatch shown in the shop filter sidebar, e.g. #000000.
  hex text not null default '#888888',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table products
  add column if not exists brand_id uuid references brands(id) on delete set null;
alter table products
  add column if not exists color_id uuid references colors(id) on delete set null;

create index if not exists products_brand_id_idx on products(brand_id);
create index if not exists products_color_id_idx on products(color_id);

alter table brands enable row level security;
alter table colors enable row level security;

drop policy if exists "Public read brands" on brands;
create policy "Public read brands" on brands
  for select using (true);
drop policy if exists "Authenticated write brands" on brands;
create policy "Authenticated write brands" on brands
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Public read colors" on colors;
create policy "Public read colors" on colors
  for select using (true);
drop policy if exists "Authenticated write colors" on colors;
create policy "Authenticated write colors" on colors
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Starter brands/colors so the filter sidebar isn't empty before the owner
-- adds their own from the admin panel.
insert into brands (name, slug, sort_order) values
  ('Nike', 'nike', 1),
  ('Adidas', 'adidas', 2),
  ('Puma', 'puma', 3),
  ('Under Armour', 'under-armour', 4),
  ('New Balance', 'new-balance', 5)
on conflict (slug) do nothing;

insert into colors (name, hex, sort_order) values
  ('Black', '#111111', 1),
  ('White', '#f5f5f5', 2),
  ('Grey', '#8a8a8a', 3),
  ('Red', '#c0392b', 4),
  ('Blue', '#2980b9', 5),
  ('Green', '#27ae60', 6)
on conflict (name) do nothing;
