# DinBank

DinBank es una aplicación educativa de banca simulada. Permite practicar la administración del dinero en un entorno sencillo, con cuentas y operaciones ficticias.

**[Abrir DinBank](https://alvaroespinozaproa.github.io/BancoNext/)**

> Este proyecto es una simulación: los saldos y las operaciones no tienen valor económico.

## Funcionalidades

- Registro e ingreso con correo y contraseña.
- Cuenta personal con número de cuenta y saldo simulado.
- Depósitos y transferencias entre cuentas de DinBank.
- Consulta de movimientos recientes.
- Metas personales y proyección de ahorro.

Las proyecciones y las metas no modifican el saldo. Las cuentas nuevas comienzan con saldo cero.

## Tecnologías

La aplicación utiliza HTML, CSS y JavaScript en el navegador. [Supabase](https://supabase.com/) administra los usuarios, la base de datos y las operaciones. El directorio `backend_calculos/` contiene ejercicios independientes en Python y no es necesario para ejecutar la aplicación web.

## Ejecutar localmente

Se necesita Python 3 y conexión a internet. Desde la raíz del repositorio:

```bash
python -m http.server 8000
```

En Windows, si `python` no está disponible, utilizá `py -m http.server 8000`. Abrí [localhost:8000/frontend/](http://localhost:8000/frontend/) y mantené la terminal abierta mientras uses la aplicación.

La configuración de conexión se encuentra en `frontend/js/supabase-config.js`. Para conectar otro proyecto, usá su URL y clave publicable; el archivo `supabase-config.example.js` muestra el formato esperado. Nunca incluyas claves secretas o `service_role` en el frontend.

Para preparar una base de datos nueva, seguí la [guía de Supabase](docs/SUPABASE_TUTORIAL.md). El registro y la confirmación de correo dependen de la configuración de Authentication del proyecto.

## Pruebas

Con Python 3 y Node.js instalados, ejecutá desde la raíz:

```bash
python -m unittest discover backend_calculos/tests
node frontend/tests/ahorro.test.cjs
node frontend/tests/login.test.cjs
node frontend/tests/registro.test.cjs
```

La prueba `supabase/prueba_banca.sql` verifica las operaciones de la base de datos dentro de una transacción que termina en rollback. Ejecutala únicamente en un proyecto de prueba.

## Estructura del proyecto

```text
frontend/          Aplicación web, estilos, recursos y pruebas
supabase/          Esquema, migraciones y prueba SQL
backend_calculos/  Ejercicios y pruebas de cálculos en Python
docs/              Documentación adicional
legacy/            Versiones anteriores y material de referencia
```
