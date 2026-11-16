# Conectar DinBank con Supabase

La conexión al proyecto de Supabase ya está configurada en el repositorio. Solo falta preparar las tablas y un usuario en el proyecto de Supabase existente.

## 1. Crear las tablas

1. Ingresá al [panel de Supabase](https://supabase.com/dashboard) y abrí el proyecto de DinBank.
2. Abrí **SQL Editor** y creá una consulta nueva.
3. Copiá todo el contenido de [supabase/schema.sql](supabase/schema.sql), pegalo en el editor y presioná **Run**.

El archivo crea las tablas y sus permisos. Las tablas nuevas empiezan con `dinbank_` para conservar las tablas anteriores.

## 2. Crear un usuario

1. En Supabase, abrí **Authentication > Users > Add user**.
2. Creá un usuario con email y contraseña. Si se solicita, confirmá el email.

Usá esos datos para ingresar a DinBank.

## 3. Abrir DinBank

Desde una terminal ubicada en la carpeta raiz del proyecto, ejecutá:

```powershell
python -m http.server 8000
```

Abrí [http://localhost:8000/frontend/](http://localhost:8000/frontend/) e iniciá sesión. Podés guardar una meta para comprobar la conexión.
