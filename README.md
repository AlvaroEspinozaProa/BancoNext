![Dino, la mascota de DinBank](inspiracion/assets/dinbank-portada.png)

# DinBank

DinBank es un proyecto escolar que simula una billetera virtual. Permite iniciar sesión, guardar metas, calcular una proyección de ahorro y registrar transferencias simuladas.

Es una aplicación educativa: no mueve dinero real. El saldo mostrado es de ejemplo y no se calcula a partir de los movimientos.

## Puesta en marcha

La aplicación usa Supabase para iniciar sesión y guardar datos. La URL y la clave publicable del proyecto ya están configuradas.

1. Ejecutá [supabase/schema.sql](supabase/schema.sql) en el SQL Editor de Supabase y creá un usuario. Los pasos están en el [tutorial de conexión](SUPABASE_TUTORIAL.md).
2. Desde la carpeta raíz del proyecto, iniciá un servidor local:

   ```powershell
   python -m http.server 8000
   ```

3. Abrí [localhost:8000/frontend/](http://localhost:8000/frontend/) e ingresá con el usuario creado.

## Estructura

```text
frontend/          Aplicación web
supabase/          Esquema y permisos de la base de datos
backend_calculos/  Cálculos y pruebas en Python
inspiracion/       Maquetas y recursos gráficos
bd/                Implementación anterior en PHP
database/          Esquema anterior para MariaDB
```

El frontend está hecho con HTML, CSS y JavaScript. Supabase proporciona autenticación y almacenamiento en PostgreSQL. Las carpetas `bd/` y `database/` se conservan como referencia de la implementación anterior.

## Pruebas

Para ejecutar las pruebas de los cálculos:

```powershell
python -m unittest discover backend_calculos/tests
```
