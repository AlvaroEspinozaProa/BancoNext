-- Simulación bancaria: saldos y movimientos independientes de los registros anteriores.
create table if not exists public.dinbank_cuentas (
  user_id uuid primary key references auth.users(id) on delete cascade,
  saldo numeric(12,2) not null default 0 check (saldo >= 0)
);
create table if not exists public.dinbank_operaciones (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  tipo text not null check (tipo in ('deposito', 'transferencia_enviada', 'transferencia_recibida')),
  monto numeric(12,2) not null check (monto > 0),
  contraparte uuid references auth.users(id),
  created_at timestamptz not null default now()
);
alter table public.dinbank_cuentas enable row level security;
alter table public.dinbank_operaciones enable row level security;
revoke all on public.dinbank_cuentas, public.dinbank_operaciones from anon, authenticated;
grant select on public.dinbank_cuentas, public.dinbank_operaciones to authenticated;
drop policy if exists "Leer cuenta propia" on public.dinbank_cuentas;
create policy "Leer cuenta propia" on public.dinbank_cuentas for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "Leer operaciones propias" on public.dinbank_operaciones;
create policy "Leer operaciones propias" on public.dinbank_operaciones for select to authenticated using ((select auth.uid()) = user_id);
insert into public.dinbank_cuentas (user_id) select id from auth.users on conflict do nothing;

create or replace function public.dinbank_crear_cuenta()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.dinbank_cuentas (user_id) values (new.id) on conflict do nothing;
  return new;
end $$;
drop trigger if exists dinbank_cuenta_al_registrarse on auth.users;
create trigger dinbank_cuenta_al_registrarse after insert on auth.users
for each row execute function public.dinbank_crear_cuenta();

create or replace function public.dinbank_depositar(p_monto numeric)
returns void language plpgsql security definer set search_path = '' as $$
declare v_usuario uuid := auth.uid();
begin
  if v_usuario is null then raise exception 'Sesión requerida'; end if;
  if p_monto is null or p_monto::text in ('NaN', 'Infinity', '-Infinity') or p_monto <= 0 or p_monto > 9999999999.99 or p_monto <> round(p_monto, 2) then
    raise exception 'Monto inválido';
  end if;
  update public.dinbank_cuentas set saldo = saldo + p_monto where user_id = v_usuario;
  if not found then raise exception 'Cuenta inexistente'; end if;
  insert into public.dinbank_operaciones (user_id, tipo, monto) values (v_usuario, 'deposito', p_monto);
end $$;

create or replace function public.dinbank_transferir(p_destino uuid, p_monto numeric)
returns void language plpgsql security definer set search_path = '' as $$
declare v_usuario uuid := auth.uid(); v_saldo numeric;
begin
  if v_usuario is null then raise exception 'Sesión requerida'; end if;
  if p_destino is null or p_destino = v_usuario then raise exception 'Destino inválido'; end if;
  if p_monto is null or p_monto::text in ('NaN', 'Infinity', '-Infinity') or p_monto <= 0 or p_monto > 9999999999.99 or p_monto <> round(p_monto, 2) then raise exception 'Monto inválido'; end if;
  perform 1 from public.dinbank_cuentas where user_id in (v_usuario, p_destino) order by user_id for update;
  if not exists (select 1 from public.dinbank_cuentas where user_id = p_destino) then raise exception 'Cuenta de destino inexistente'; end if;
  select saldo into v_saldo from public.dinbank_cuentas where user_id = v_usuario;
  if v_saldo is null then raise exception 'Cuenta inexistente'; end if;
  if v_saldo < p_monto then raise exception 'Saldo insuficiente'; end if;
  update public.dinbank_cuentas set saldo = saldo - p_monto where user_id = v_usuario;
  update public.dinbank_cuentas set saldo = saldo + p_monto where user_id = p_destino;
  insert into public.dinbank_operaciones (user_id, tipo, monto, contraparte) values
    (v_usuario, 'transferencia_enviada', p_monto, p_destino),
    (p_destino, 'transferencia_recibida', p_monto, v_usuario);
end $$;
revoke all on function public.dinbank_depositar(numeric), public.dinbank_transferir(uuid, numeric), public.dinbank_crear_cuenta() from public, anon, authenticated;
grant execute on function public.dinbank_depositar(numeric), public.dinbank_transferir(uuid, numeric) to authenticated;
