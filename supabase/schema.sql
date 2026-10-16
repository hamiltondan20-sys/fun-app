-- Account sync for The Fullest Life Travel (docs/account-sync.md).
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to run again: every statement replaces or skips what already exists.

-- One row per trip. The browser's copy is the working copy; this is the synced copy.
create table if not exists public.trips (
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  id text not null check (id ~ '^trp_[A-Za-z0-9_-]{1,80}$'),
  title text not null default '' check (char_length(title) <= 200),
  payload jsonb check (payload is null or octet_length(payload::text) <= 1000000),
  content_hash text check (content_hash is null or char_length(content_hash) <= 32),
  -- Deleted trips stay as empty markers so other devices learn about the deletion.
  deleted boolean not null default false,
  updated_at timestamptz not null default clock_timestamp(),
  primary key (user_id, id)
);

-- Every write gets a new, server-set time; devices use it to detect changes made elsewhere.
create or replace function public.trips_touch() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := clock_timestamp();
  if tg_op = 'UPDATE' then
    new.user_id := old.user_id;
  end if;
  return new;
end;
$$;

drop trigger if exists trips_touch on public.trips;
create trigger trips_touch before insert or update on public.trips
  for each row execute function public.trips_touch();

-- At most 200 trips (including deletion markers) per account.
create or replace function public.trips_limit() returns trigger
language plpgsql set search_path = '' as $$
begin
  if (select count(*) from public.trips where user_id = new.user_id) >= 200 then
    raise exception 'trip limit reached';
  end if;
  return new;
end;
$$;

drop trigger if exists trips_limit on public.trips;
create trigger trips_limit before insert on public.trips
  for each row execute function public.trips_limit();

-- Row-level security: a signed-in visitor can only see and change their own rows.
alter table public.trips enable row level security;

drop policy if exists "Read own trips" on public.trips;
create policy "Read own trips" on public.trips
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Add own trips" on public.trips;
create policy "Add own trips" on public.trips
  for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "Change own trips" on public.trips;
create policy "Change own trips" on public.trips
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- No delete policy: trips are removed by marking them deleted, or all at once with the account.
revoke all on table public.trips from anon, authenticated;
grant select, insert, update on table public.trips to authenticated;

-- "Delete my account": removes the sign-in and, through the cascade, every synced trip.
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
