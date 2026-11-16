# DinBank: explicación del proyecto

DinBank es un proyecto escolar sobre una billetera virtual. Sirve para imaginar cómo podría funcionar una aplicación de banco simple.

No usa dinero real. Los usuarios, transferencias, montos y botones son ejemplos.

## Cómo ejecutar la aplicación

La aplicación activa está en `frontend/`. Para iniciar sesión necesita una
configuración de Supabase. Seguí [SUPABASE_TUTORIAL.md](SUPABASE_TUTORIAL.md)
y abrila desde un servidor HTTP local; no con doble clic.

## Cómo mirar la maqueta

Abrí `inspiracion/pages/login.html` con doble clic. Esa es la puerta de entrada.

Después podés recorrer estas pantallas:

- Inicio: muestra el saldo y un resumen.
- Transferir: muestra cómo se podría enviar dinero.
- Ahorrar: muestra una idea de ahorro mensual.
- Metas: muestra objetivos de ahorro.
- Movimientos: muestra ingresos y gastos.
- Configuración: muestra opciones de cuenta.

## Carpetas importantes

- `frontend/`: aplicación activa, con Supabase Auth y base PostgreSQL.
- `inspiracion/`: ejemplos visuales para mirar y sacar ideas.
- `backend_calculos/`: cuentas simples hechas en Python.
- `supabase/schema.sql`: estructura y permisos para ejecutar en Supabase.
- `bd/` y `database/`: implementación anterior con PHP/MariaDB, conservada solo
  como referencia; el frontend ya no la usa.
- La versión oficial del proyecto está en la raíz del repositorio.

## Qué está hecho y qué falta

Las pantallas de inspiración se pueden recorrer. El backend ya puede calcular saldo,
transferencias y ahorro. El login de `frontend/` usa Supabase Auth y el esquema
incluye perfiles, movimientos y simulaciones de ahorro con permisos por usuario.

Las metas, las proyecciones de ahorro y los registros de transferencias simuladas
se guardan en Supabase para el usuario que inició sesión. El saldo y el chatbot
siguen siendo simulaciones de interfaz; no representan operaciones bancarias
reales ni se calculan a partir de esos registros.

## Importante

No hace falta saber programar para mirar la maqueta. La idea es entender cómo se podría ordenar una billetera virtual y elegir ideas para seguir mejorando DinBank.
