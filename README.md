# DinBank

DinBank es una aplicación educativa que simula una banca: permite ingresar con una cuenta, hacer depósitos y transferencias ficticias, consultar movimientos y guardar metas y proyecciones de ahorro. **No utiliza dinero real.**

La interfaz es estática (HTML, CSS y JavaScript) y usa Supabase para autenticación y datos. Los cálculos de `backend_calculos/` son ejercicios independientes: GitHub Pages no ejecuta Python ni PHP.

## Probar en la computadora

Necesitás conexión a internet y Python 3. Desde una terminal en la carpeta del repositorio ejecutá:

```bash
python -m http.server 8000
```

Si en Windows `python` no funciona, probá `py -m http.server 8000`. Abrí **http://localhost:8000/frontend/** en el navegador y dejá la terminal abierta. No abras `index.html` con doble clic: la aplicación necesita servirse por HTTP para cargar sus módulos.

El archivo `frontend/js/supabase-config.js` ya contiene la URL y la clave publicable del proyecto configurado. Desde la pantalla de ingreso podés crear una cuenta con nombre, correo y contraseña. Supabase Auth administra las contraseñas y crea el perfil y la cuenta simulada. Para ingresar inmediatamente después del registro, desactivá **Confirm email** en el proveedor Email de Supabase Authentication; esto permite crear cuentas sin comprobar la titularidad del correo. Si está activado, habrá que confirmar el correo antes de ingresar y configurar la URL de redirección en Supabase.

Para usar otro proyecto, cambiá la URL y la clave publicable en ese archivo; podés tomar como referencia `frontend/js/supabase-config.example.js`. Estos valores son visibles en el navegador y en GitHub Pages. Usá únicamente una clave **publishable** o `anon`, nunca una clave `secret`, `service_role` ni contraseñas. La protección de los datos depende de las políticas RLS de Supabase. [Documentación de claves de Supabase](https://supabase.com/docs/guides/getting-started/api-keys).

## Publicar en GitHub Pages

1. Subí los cambios a la rama `main` del repositorio de GitHub.
2. En GitHub, abrí **Settings > Pages > Build and deployment** y elegí **GitHub Actions** como fuente.
3. En **Actions**, comprobá que termine correctamente el flujo **Publicar en GitHub Pages**. Se ejecuta con cada push a `main` y también se puede iniciar manualmente con **Run workflow**.
4. Abrí la dirección indicada en **Settings > Pages**. Para el repositorio actual debería ser `https://alvaroespinozaproa.github.io/BancoNext/`; GitHub muestra la URL definitiva.

El flujo publica solamente `frontend/`, por lo que `index.html` queda en la raíz del sitio. No hace falta instalar dependencias ni configurar secretos de GitHub para la clave publicable. Consultá [la guía de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) si la opción de Pages no aparece o el despliegue falla.

## Si no conecta

- Comprobá que abriste la dirección HTTP indicada y que tenés internet. La aplicación descarga la biblioteca de Supabase desde `cdn.jsdelivr.net`.
- Revisá en `frontend/js/supabase-config.js` que la URL y la clave publicable correspondan al proyecto activo. Si el proyecto fue pausado, reanudalo desde Supabase; si cambió la clave, actualizala y volvé a publicar.
- Verificá que el correo y la contraseña pertenezcan a un usuario de **Authentication > Users**, y que esté confirmado si corresponde.
- Abrí las herramientas de desarrollo del navegador (F12), pestañas **Console** y **Network**, para distinguir errores de red, clave, credenciales o permisos. Probá otra red si el dominio de Supabase o el CDN está bloqueado.
- Si el ingreso funciona pero faltan cuentas o aparecen errores de tablas o permisos, revisá que el esquema y las migraciones estén aplicados en ese proyecto. No vuelvas a ejecutar scripts en una base con datos sin revisarlos primero.

## Preparar otro proyecto Supabase

En un proyecto nuevo ejecutá desde SQL Editor, en este orden: `supabase/schema.sql`, `supabase/banca_simulada.sql` y `supabase/numeros_cuenta.sql`. Habilitá el registro por correo en Authentication y revisá la configuración de confirmación y redirecciones de Supabase. Las cuentas comienzan con saldo cero; los movimientos históricos de `dinbank_movimientos` permanecen separados y no se convierten en saldo. Consultá [la guía de Supabase](docs/SUPABASE_TUTORIAL.md).

## Pruebas

```bash
python -m unittest discover backend_calculos/tests
node frontend/tests/ahorro.test.cjs
node frontend/tests/login.test.cjs
node frontend/tests/registro.test.cjs
```

En un proyecto Supabase de prueba, `supabase/prueba_banca.sql` verifica cuentas y operaciones dentro de una transacción que termina en rollback. Las pruebas locales no sustituyen una prueba de ingreso y operaciones con usuarios reales de prueba.

## Estructura

- `frontend/`: sitio publicado y su configuración pública.
- `supabase/`: esquema, migraciones y prueba SQL.
- `backend_calculos/`: cálculos y pruebas en Python independientes de la web.
- `docs/`: documentación adicional.
- `legacy/`: código anterior, no publicado.
