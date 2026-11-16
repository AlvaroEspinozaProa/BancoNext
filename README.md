![DinBank](inspiracion/assets/dinbank-portada.png)

# DinBank

DinBank es una aplicación web de finanzas personales que permite gestionar metas de ahorro, proyectar su crecimiento y registrar transferencias simuladas. El proyecto integra una interfaz web con autenticación y persistencia de datos mediante Supabase.

El alcance actual es demostrativo: no procesa dinero real y el saldo mostrado no se calcula a partir de los movimientos registrados.

## Funcionalidades

- Autenticación con correo electrónico y contraseña mediante Supabase Auth.
- Creación y consulta de metas de ahorro por usuario.
- Cálculo y almacenamiento de proyecciones de ahorro.
- Registro de transferencias simuladas.
- Persistencia de datos con políticas de acceso por usuario en PostgreSQL.

## Tecnologías

| Componente | Tecnología |
| --- | --- |
| Interfaz | HTML, CSS y JavaScript |
| Autenticación y datos | Supabase Auth y PostgreSQL |
| Cálculos | Python |

## Estructura del repositorio

```text
frontend/          Interfaz y cliente de Supabase
supabase/          Esquema PostgreSQL y políticas de acceso
backend_calculos/  Módulos de cálculo y pruebas
inspiracion/       Propuestas visuales y recursos gráficos
bd/                Implementación anterior en PHP
database/          Esquemas anteriores para MariaDB
```

Las carpetas `bd/` y `database/` conservan la implementación anterior y no intervienen en el flujo actual de autenticación.

## Desarrollo local

Requiere Python 3, un navegador moderno y un proyecto de Supabase con el esquema de [`supabase/schema.sql`](supabase/schema.sql) aplicado. La configuración existente se encuentra en `frontend/java/supabase-config.js`.

```bash
python -m http.server 8000
```

La aplicación queda disponible en `http://localhost:8000/frontend/`. La [guía de conexión](SUPABASE_TUTORIAL.md) contiene los pasos para preparar Supabase y crear un usuario.

## Pruebas

```bash
python -m unittest discover backend_calculos/tests
```

Estas pruebas cubren los módulos de cálculo en Python. La integración con Supabase requiere verificarla con un proyecto configurado y un usuario autenticado.
