-- Pointers CMS · Setup completo para proyecto zbrmrkmzdflimcuyfhso
-- Pega y ejecuta todo en Supabase Dashboard → SQL Editor

-- 1. Tablas
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

create index if not exists posts_status_created_at_idx
  on public.posts (status, created_at desc);

create index if not exists posts_author_id_idx
  on public.posts (author_id);

create index if not exists posts_reviewed_by_idx
  on public.posts (reviewed_by);

-- 2. Admin principal
insert into public.cms_admins (identifier)
values ('randie2015')
on conflict (identifier) do nothing;

-- 3. RLS helpers
alter table public.posts enable row level security;
alter table public.cms_admins enable row level security;

create or replace function public.is_cms_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.cms_admins admin
    where admin.identifier = coalesce(auth.jwt() ->> 'sub', '')
       or admin.identifier = coalesce(auth.jwt() ->> 'email', '')
       or admin.identifier = coalesce(auth.jwt() ->> 'cms_username', '')
  );
$$;

create or replace function public.current_cms_author_id()
returns text
language sql
stable
as $$
  select coalesce(
    nullif(auth.jwt() ->> 'cms_username', ''),
    nullif(auth.jwt() ->> 'sub', ''),
    nullif(auth.jwt() ->> 'email', '')
  );
$$;

grant execute on function public.is_cms_admin() to anon, authenticated;
grant execute on function public.current_cms_author_id() to anon, authenticated;

-- 4. Políticas posts
drop policy if exists "Public read reviewed published posts" on public.posts;
create policy "Public read reviewed published posts"
  on public.posts for select to anon, authenticated
  using (status = 'published' and reviewed_by = true);

drop policy if exists "Authors read own posts" on public.posts;
create policy "Authors read own posts"
  on public.posts for select to authenticated
  using (author_id = public.current_cms_author_id());

drop policy if exists "Admins read all posts" on public.posts;
create policy "Admins read all posts"
  on public.posts for select to authenticated
  using (public.is_cms_admin());

drop policy if exists "Authors create own drafts" on public.posts;
create policy "Authors create own drafts"
  on public.posts for insert to authenticated
  with check (
    author_id = public.current_cms_author_id()
    and reviewed_by = false
    and status = 'draft'
  );

drop policy if exists "Admins create any post" on public.posts;
create policy "Admins create any post"
  on public.posts for insert to authenticated
  with check (public.is_cms_admin());

drop policy if exists "Authors update own unrevised drafts" on public.posts;
create policy "Authors update own unrevised drafts"
  on public.posts for update to authenticated
  using (
    author_id = public.current_cms_author_id()
    and reviewed_by = false
    and status = 'draft'
  )
  with check (
    author_id = public.current_cms_author_id()
    and reviewed_by = false
    and status = 'draft'
  );

drop policy if exists "Admins update any post" on public.posts;
create policy "Admins update any post"
  on public.posts for update to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

drop policy if exists "Authors delete own unrevised drafts" on public.posts;
create policy "Authors delete own unrevised drafts"
  on public.posts for delete to authenticated
  using (
    author_id = public.current_cms_author_id()
    and reviewed_by = false
    and status = 'draft'
  );

drop policy if exists "Admins delete any post" on public.posts;
create policy "Admins delete any post"
  on public.posts for delete to authenticated
  using (public.is_cms_admin());

drop policy if exists "Admins manage cms_admins" on public.cms_admins;
create policy "Admins manage cms_admins"
  on public.cms_admins for all to authenticated
  using (public.is_cms_admin())
  with check (public.is_cms_admin());

-- 5. Storage (crea bucket "blog-assets" como público en Dashboard → Storage antes o después)
drop policy if exists "Public read blog assets" on storage.objects;
create policy "Public read blog assets"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'blog-assets');

drop policy if exists "Authors upload own blog assets" on storage.objects;
create policy "Authors upload own blog assets"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'blog-assets'
    and (storage.foldername(name))[1] = 'covers'
    and (storage.foldername(name))[2] = public.current_cms_author_id()
  );

drop policy if exists "Admins upload blog assets" on storage.objects;
create policy "Admins upload blog assets"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'blog-assets' and public.is_cms_admin());
