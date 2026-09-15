-- Thrift Trades: shop-by-gender feature
-- Run this once in the Supabase project's SQL editor (or via `supabase db push`).

-- Every shoe can now be tagged Men / Women / Kids / Unisex, so the storefront
-- can offer a "shop by" entry point the same way sneakup.pk and other
-- competitors do.
alter table products
  add column if not exists gender text not null default 'unisex';

alter table products
  drop constraint if exists products_gender_check;
alter table products
  add constraint products_gender_check check (gender in ('men', 'women', 'kids', 'unisex'));

create index if not exists products_gender_idx on products(gender);

-- One editable banner image per gender, shown on the homepage "Shop by"
-- section and uploaded by the shop owner from the admin panel (same
-- Cloudinary upload widget used for product photos) — no code change needed
-- to swap these later.
create table if not exists gender_banners (
  gender text primary key check (gender in ('men', 'women', 'kids')),
  label text not null,
  image_url text,
  image_alt text,
  updated_at timestamptz not null default now()
);

alter table gender_banners enable row level security;

drop policy if exists "Public read gender_banners" on gender_banners;
create policy "Public read gender_banners" on gender_banners
  for select using (true);

drop policy if exists "Authenticated write gender_banners" on gender_banners;
create policy "Authenticated write gender_banners" on gender_banners
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into gender_banners (gender, label) values
  ('men', 'Men'),
  ('women', 'Women'),
  ('kids', 'Kids')
on conflict (gender) do nothing;
