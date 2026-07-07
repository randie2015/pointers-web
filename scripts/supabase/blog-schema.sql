-- Run this in Supabase Dashboard → SQL Editor

create table if not exists public.blog_posts (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  tag text not null default 'General',
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_updated_at_idx
  on public.blog_posts (status, updated_at desc);

alter table public.blog_posts enable row level security;

drop policy if exists "Public can read published posts" on public.blog_posts;

create policy "Public can read published posts"
  on public.blog_posts
  for select
  using (status = 'published');
