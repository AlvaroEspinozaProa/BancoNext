![DinBank](legacy/inspiracion/assets/dinbank-portada.png)

# DinBank

DinBank es una simulación de banca para jugar roles. Usa usuarios reales de Supabase Auth, pero el dinero, los depósitos y las transferencias son ficticios y no tienen valor económico.

Cada usuario tiene una cuenta con saldo inicial cero. Puede hacer depósitos simulados y transferir a otra cuenta mediante su número de cuenta, visible en el panel. Los movimientos y saldos se guardan en Supabase; las operaciones y la comprobación de saldo se ejecutan en la base de datos. Metas y proyecciones de ahorro se guardan por separado y no afectan al saldo.

## Organización

- `frontend/`: aplicación activa; `js/` contiene JavaScript y `estilos/` las hojas de estilo.
- `supabase/`: esquema original, migración de la simulación y prueba SQL reversible.
- `backend_calculos/`: ejercicios de cálculo en Python; no intervienen en las operaciones de la aplicación web.
- `docs/`: guías de configuración y documentación técnica.
- `legacy/`: maquetas y versiones anteriores en PHP y MariaDB, conservadas como referencia; no forman parte de la aplicación activa.

## Puesta en marcha

1. En un proyecto Supabase nuevo ejecutá `supabase/schema.sql` y después `supabase/banca_simulada.sql` desde el editor SQL. Para el proyecto existente la migración de banca simulada ya fue aplicada.
2. Creá usuarios en **Authentication > Users**. Cada usuario debe ingresar con sus propias credenciales. No compartas contraseñas ni claves secretas.
3. Configurá `frontend/js/supabase-config.js` con la URL y la clave **publicable**. La clave publicable no sustituye las políticas de seguridad de la base de datos.
4. Ejecutá `python -m http.server 8000` desde la raíz y abrí <http://localhost:8000/frontend/>.
5. Depositá dinero simulado y transferilo al número de cuenta de otro usuario. El depósito es libre porque esta aplicación es un juego de roles.

El historial anterior de `dinbank_movimientos` se conserva separado y no se convierte en saldo: eran registros de simulación sin contrapartida.

## Pruebas

`python -m unittest discover backend_calculos/tests` comprueba los cálculos de Python. `supabase/prueba_banca.sql` prueba cuentas, aislamiento, transferencias y sobregiros dentro de una transacción que termina en rollback; ejecutalo en el editor SQL de un proyecto de prueba.
