-- Thrift Trades: admin-managed Condition options; remove Colors
-- Run this once in the Supabase project's SQL editor (or via `supabase db push`).

create table if not exists conditions (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table conditions enable row level security;

drop policy if exists "Public read conditions" on conditions;
create policy "Public read conditions" on conditions
  for select using (true);
drop policy if exists "Authenticated write conditions" on conditions;
create policy "Authenticated write conditions" on conditions
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

insert into conditions (name, sort_order) values
  ('Brand New', 1),
  ('Premium+', 2),
  ('Premium', 3),
  ('Excellent', 4),
  ('Very Good', 5)
on conflict (name) do nothing;

-- Colors turned out not to be wanted — drop the FK column first, then the table.
alter table products drop column if exists color_id;
drop table if exists colors;
