# Login PHP y conexión con la base de datos

## Qué se corrigió

Antes, el login se validaba únicamente en `frontend/java/login.js` con
credenciales escritas en JavaScript. Además, los archivos PHP de conexión y
consulta estaban invertidos: `conexion.php` se incluía a sí mismo.

Ahora el flujo es:

```text
Formulario web -> bd/login.php -> MySQL/MariaDB -> sesión PHP -> dashboard
```

## Archivos principales

- `bd/conexion.php`: crea la conexión MySQL con `utf8mb4`.
- `bd/autenticacion.php`: inicia sesiones seguras y entrega respuestas JSON.
- `bd/login.php`: recibe un `POST` JSON, verifica la contraseña con
  `password_verify` y crea la sesión.
- `bd/sesion.php`: informa si existe una sesión activa.
- `bd/usuarios.php`: devuelve únicamente el perfil del usuario de la sesión;
  ya no expone la lista completa de usuarios.
- `frontend/java/login.js`: envía el formulario a PHP; no conserva la
  contraseña en el navegador.
- `frontend/java/app.js`: comprueba la sesión antes de usar el dashboard.
- `database/esquema_inicial.sql`: crea la base `bd_bancodino`, la tabla de
  usuarios y un usuario de demostración con contraseña hasheada.

## Seguridad aplicada

- Las credenciales ya no están hardcodeadas en el frontend.
- La consulta de login usa sentencias preparadas.
- Las contraseñas se verifican con hash, no por comparación de texto plano.
- La cookie de sesión es `HttpOnly` y `SameSite=Lax`.
- El ID de sesión se regenera después de un login correcto.
- Los endpoints rechazan métodos HTTP no permitidos y JSON mal formado.

## Cómo probarlo localmente

1. Iniciar Apache y MariaDB desde XAMPP.
2. Configurar MariaDB en el puerto `3307`, o definir las variables de entorno
   `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME`.
3. Importar `database/esquema_inicial.sql` en phpMyAdmin.
4. Abrir el proyecto desde Apache; no abrir `frontend/index.html` con doble
   clic, porque PHP necesita un servidor web.
5. Entrar en `frontend/index.html` usando la cuenta de demostración:
   usuario `ana`, contraseña `dino123`.

## Validaciones realizadas

- Sintaxis de los archivos JavaScript modificados.
- Verificación local del hash de la cuenta de demostración, tanto con la clave
  correcta como con una incorrecta.
- Revisión del flujo de sesión y de consultas preparadas.

No se pudo ejecutar una prueba HTTP real en este equipo porque no había PHP ni
MariaDB disponibles en la terminal. Esa prueba queda pendiente al levantar
XAMPP con la base importada.
