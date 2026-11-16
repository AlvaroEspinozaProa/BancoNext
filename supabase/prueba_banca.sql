begin;
insert into auth.users (id, email, raw_user_meta_data) values
 ('f0000000-0000-0000-0000-000000000001','dinbank-test-one@example.invalid','{}'),
 ('f0000000-0000-0000-0000-000000000002','dinbank-test-two@example.invalid','{}');
set local role authenticated;
select set_config('request.jwt.claim.sub','f0000000-0000-0000-0000-000000000001',true);
do $$ begin
 if (select count(*) from public.dinbank_cuentas) <> 1 then raise exception 'RLS cuentas falló'; end if;
 if (select saldo from public.dinbank_cuentas) <> 0 then raise exception 'Saldo inicial incorrecto'; end if;
 perform public.dinbank_depositar(100);
 perform public.dinbank_transferir('f0000000-0000-0000-0000-000000000002',30);
 if (select saldo from public.dinbank_cuentas) <> 70 then raise exception 'Saldo emisor incorrecto'; end if;
 if (select count(*) from public.dinbank_operaciones) <> 2 then raise exception 'Historial emisor incorrecto'; end if;
 begin perform public.dinbank_transferir('f0000000-0000-0000-0000-000000000002',71); raise exception 'Permitió sobregiro'; exception when raise_exception then if sqlerrm <> 'Saldo insuficiente' then raise; end if; end;
 begin update public.dinbank_cuentas set saldo=999; raise exception 'Permitió modificar saldo directamente'; exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claim.sub','f0000000-0000-0000-0000-000000000002',true);
do $$ begin
 if (select saldo from public.dinbank_cuentas) <> 30 then raise exception 'Saldo receptor incorrecto'; end if;
 if (select count(*) from public.dinbank_operaciones) <> 1 then raise exception 'RLS historial falló'; end if;
end $$;
rollback;
