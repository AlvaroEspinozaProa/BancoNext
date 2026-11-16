-- DinBank: ejecutar completo en Supabase SQL Editor.
-- Las contraseñas las administra Supabase Auth; no se guardan en estas tablas.

create table if not exists public.dinbank_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.dinbank_movimientos (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  monto numeric(12, 2) not null check (monto > 0),
  destinatario text not null check (char_length(trim(destinatario)) > 0),
  motivo text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.dinbank_simulaciones_ahorros (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  ingreso_mensual numeric(12, 2) not null check (ingreso_mensual >= 0),
  gastos_fijos numeric(12, 2) not null check (gastos_fijos >= 0),
  gastos_hormiga numeric(12, 2) not null check (gastos_hormiga >= 0),
  ahorro_proyectado numeric(12, 2) not null check (ahorro_proyectado >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.dinbank_metas (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  descripcion text not null check (char_length(trim(descripcion)) > 0),
  created_at timestamptz not null default now()
);

create or replace function public.dinbank_crear_perfil()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.dinbank_profiles (id, nombre)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nombre', split_part(new.email, '@', 1)));
  return new;
end;
$$;

drop trigger if exists dinbank_crear_perfil_al_registrarse on auth.users;
create trigger dinbank_crear_perfil_al_registrarse
  after insert on auth.users
  for each row execute procedure public.dinbank_crear_perfil();

alter table public.dinbank_profiles enable row level security;
alter table public.dinbank_movimientos enable row level security;
alter table public.dinbank_simulaciones_ahorros enable row level security;
alter table public.dinbank_metas enable row level security;

grant select, update on public.dinbank_profiles to authenticated;
grant select, insert, update, delete on public.dinbank_movimientos to authenticated;
grant select, insert, update, delete on public.dinbank_simulaciones_ahorros to authenticated;
grant select, insert, update, delete on public.dinbank_metas to authenticated;
grant usage, select on sequence public.dinbank_movimientos_id_seq, public.dinbank_simulaciones_ahorros_id_seq, public.dinbank_metas_id_seq to authenticated;

drop policy if exists "Usuarios leen su perfil" on public.dinbank_profiles;
create policy "Usuarios leen su perfil" on public.dinbank_profiles for select to authenticated
  using ((select auth.uid()) = id);
drop policy if exists "Usuarios actualizan su perfil" on public.dinbank_profiles;
create policy "Usuarios actualizan su perfil" on public.dinbank_profiles for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "Usuarios administran sus dinbank_movimientos" on public.dinbank_movimientos;
create policy "Usuarios administran sus dinbank_movimientos" on public.dinbank_movimientos for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists "Usuarios administran sus simulaciones" on public.dinbank_simulaciones_ahorros;
create policy "Usuarios administran sus simulaciones" on public.dinbank_simulaciones_ahorros for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "Usuarios administran sus dinbank_metas" on public.dinbank_metas;
create policy "Usuarios administran sus dinbank_metas" on public.dinbank_metas for all to authenticated
  using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
