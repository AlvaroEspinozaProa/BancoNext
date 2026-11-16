# Conectar DinBank con Supabase

1. En un proyecto nuevo, ejecutá en el SQL Editor `supabase/schema.sql`, luego `supabase/banca_simulada.sql` y finalmente `supabase/numeros_cuenta.sql`. En el proyecto existente de DinBank esta migración ya está aplicada.
2. Los usuarios pueden registrarse desde DinBank; Supabase crea automáticamente su perfil y cuenta. Si la confirmación por email está activa, deben confirmar su correo antes de ingresar.
3. Verificá en `frontend/js/supabase-config.js` la URL y la clave publicable del proyecto. Nunca agregues una clave secreta al frontend.
4. Desde la raíz del repositorio ejecutá `python -m http.server 8000` y abrí http://localhost:8000/frontend/.
5. Iniciá sesión con un usuario, depositá dinero ficticio y usá el número de cuenta de otro usuario para probar una transferencia simulada.

Las cuentas empiezan con saldo cero. El dinero es ficticio; los registros anteriores de transferencias no alteran los saldos nuevos. La prueba `supabase/prueba_banca.sql` termina con rollback y no conserva sus usuarios de prueba.

## Confirmación por correo

En Authentication > URL Configuration configurá como Site URL la dirección de la aplicación y agregá la dirección de `index.html` a Redirect URLs; por ejemplo, `http://127.0.0.1:8000/frontend/index.html` para pruebas locales. Para registrar personas fuera del equipo de Supabase hace falta configurar SMTP propio en el proyecto. El servicio predeterminado tiene límites de envío y solo admite miembros del equipo.
