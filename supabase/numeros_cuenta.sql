-- Números de cuenta simples, conservando los identificadores y saldos existentes.
alter table public.dinbank_cuentas add column if not exists numero bigint generated always as identity;
create unique index if not exists dinbank_cuentas_numero_idx on public.dinbank_cuentas(numero);

create or replace function public.dinbank_transferir_numero(p_numero bigint, p_monto numeric)
returns void language plpgsql security definer set search_path = '' as $$
declare v_destino uuid;
begin
  if auth.uid() is null then raise exception 'Sesión requerida'; end if;
  select user_id into v_destino from public.dinbank_cuentas where numero = p_numero;
  if v_destino is null then raise exception 'Cuenta de destino inexistente'; end if;
  perform public.dinbank_transferir(v_destino, p_monto);
end $$;
revoke all on function public.dinbank_transferir_numero(bigint, numeric) from public, anon, authenticated;
grant execute on function public.dinbank_transferir_numero(bigint, numeric) to authenticated;
