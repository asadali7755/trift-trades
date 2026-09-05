-- Thrift Trades: core schema
-- Run this once in the Supabase project's SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category_id uuid references categories(id) on delete set null,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  sizes text[] not null default '{}',
  condition text not null default 'Lightly Used - Imported' ,
  description text,
  images jsonb not null default '[]', -- [{ "url": "...", "alt": "..." }]
  video_url text,
  video_thumbnail_url text,
  is_featured boolean not null default false,
  is_in_stock boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_id_idx on products(category_id);
create index if not exists products_is_featured_idx on products(is_featured);
create index if not exists products_is_in_stock_idx on products(is_in_stock);

-- Keep updated_at fresh
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

-- Row Level Security: public can read, only authenticated (admin) can write
alter table categories enable row level security;
alter table products enable row level security;

drop policy if exists "Public read categories" on categories;
create policy "Public read categories" on categories
  for select using (true);

drop policy if exists "Public read products" on products;
create policy "Public read products" on products
  for select using (true);

drop policy if exists "Authenticated write categories" on categories;
create policy "Authenticated write categories" on categories
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

drop policy if exists "Authenticated write products" on products;
create policy "Authenticated write products" on products
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Starter categories (edit/add more from the admin panel later)
insert into categories (name, slug, sort_order) values
  ('Football Boots', 'football-boots', 1),
  ('Running Shoes', 'running-shoes', 2),
  ('Casual Sneakers', 'casual-sneakers', 3),
  ('Kids Shoes', 'kids-shoes', 4)
on conflict (slug) do nothing;
