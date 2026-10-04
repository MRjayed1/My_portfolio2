create extension if not exists "pgcrypto";

create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null default '',
  role text not null default '',
  affiliation text not null default '',
  bio text not null default '',
  profile_image_url text not null default '',
  email text not null default '',
  linkedin_url text not null default '',
  scholar_url text not null default '',
  github_url text not null default '',
  cv_url text not null default '',
  keywords text[] not null default '{}',
  tags text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists research_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  description text not null default '',
  status text not null default 'current' check (status in ('current','completed')),
  institution text not null default '',
  supervisor text not null default '',
  start_date text not null default '',
  end_date text not null default '',
  badge text,
  link_url text,
  link_label text,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists publications (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  authors text not null default '',
  venue text not null default '',
  year int not null default 2024,
  status text not null default 'published' check (status in ('accepted','published')),
  tags text[] not null default '{}',
  link_url text,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists teaching (
  id uuid primary key default gen_random_uuid(),
  emoji text not null default '📚',
  course text not null default '',
  institution text not null default '',
  term text not null default '',
  description text not null default '',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists talks (
  id uuid primary key default gen_random_uuid(),
  month text not null default '',
  year int not null default 2024,
  role text not null default '',
  title text not null default '',
  venue text not null default '',
  link_url text,
  link_label text,
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  date date not null default current_date,
  emoji text not null default '🎉',
  content text not null default '',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists newsletter_posts (
  id uuid primary key default gen_random_uuid(),
  series text not null default '',
  title text not null default '',
  summary text not null default '',
  status text not null default 'Published',
  link_url text not null default '',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists newsletter_meta (
  id uuid primary key default gen_random_uuid(),
  intro_text text not null default '',
  subscribe_url text not null default '',
  updated_at timestamptz not null default now()
);

create table if not exists contact_links (
  id uuid primary key default gen_random_uuid(),
  icon text not null default '✉',
  label text not null default '',
  value text not null default '',
  url text not null default '',
  sort_order int not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists site_meta (
  id uuid primary key default gen_random_uuid(),
  site_title text not null default '',
  og_description text not null default '',
  copyright_name text not null default '',
  contact_intro text not null default '',
  last_updated timestamptz not null default now()
);

create or replace function touch_site_meta_last_updated()
returns trigger language plpgsql as $$
begin
  update site_meta set last_updated = now() where true;
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array['profile','research_projects','publications','teaching','talks','news','newsletter_posts','newsletter_meta','contact_links'] loop
    execute format(
      'create trigger trg_%I_touch after insert or update or delete on %I for each statement execute function touch_site_meta_last_updated()',
      t, t
    );
  end loop;
end;
$$;

alter table profile enable row level security;
alter table research_projects enable row level security;
alter table publications enable row level security;
alter table teaching enable row level security;
alter table talks enable row level security;
alter table news enable row level security;
alter table newsletter_posts enable row level security;
alter table newsletter_meta enable row level security;
alter table contact_links enable row level security;
alter table site_meta enable row level security;

create policy "Public read profile" on profile for select using (true);
create policy "Public read research_projects" on research_projects for select using (true);
create policy "Public read publications" on publications for select using (true);
create policy "Public read teaching" on teaching for select using (true);
create policy "Public read talks" on talks for select using (true);
create policy "Public read news" on news for select using (true);
create policy "Public read newsletter_posts" on newsletter_posts for select using (true);
create policy "Public read newsletter_meta" on newsletter_meta for select using (true);
create policy "Public read contact_links" on contact_links for select using (true);
create policy "Public read site_meta" on site_meta for select using (true);
