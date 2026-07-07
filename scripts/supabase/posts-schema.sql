-- Pointers CMS · Base schema for posts
-- Run in Supabase Dashboard → SQL Editor (step 1 of 2)

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null,
  image_url text,
  category text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  read_time int not null default 5,
  seo_description text,
  author_id text not null,
  reviewed_by boolean not null default false
);

create table if not exists public.cms_admins (
  id uuid primary key default gen_random_uuid(),
  identifier text not null unique,
  created_at timestamptz not null default now()
);

comment on table public.cms_admins is
  'CMS administrators. identifier must match author_id or Supabase auth user id/email.';

create index if not exists posts_status_created_at_idx
  on public.posts (status, created_at desc);

create index if not exists posts_author_id_idx
  on public.posts (author_id);

create index if not exists posts_reviewed_by_idx
  on public.posts (reviewed_by);

-- Replace with your real admin username(s)
insert into public.cms_admins (identifier)
values ('admin')
on conflict (identifier) do nothing;

-- Storage bucket: create manually in Dashboard → Storage
-- Name: blog-assets | Public bucket: enabled
