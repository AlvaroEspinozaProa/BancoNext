# Conectar DinBank con Supabase

1. En un proyecto nuevo, ejecutá en el SQL Editor `supabase/schema.sql` y luego `supabase/banca_simulada.sql`. En el proyecto existente de DinBank esta migración ya está aplicada.
2. En Authentication > Users creá o revisá los usuarios y confirmá sus correos según la configuración del proyecto.
3. Verificá en `frontend/js/supabase-config.js` la URL y la clave publicable del proyecto. Nunca agregues una clave secreta al frontend.
4. Desde la raíz del repositorio ejecutá `python -m http.server 8000` y abrí http://localhost:8000/frontend/.
5. Iniciá sesión con un usuario, depositá dinero ficticio y usá el número de cuenta de otro usuario para probar una transferencia simulada.

Las cuentas empiezan con saldo cero. El dinero es ficticio; los registros anteriores de transferencias no alteran los saldos nuevos. La prueba `supabase/prueba_banca.sql` termina con rollback y no conserva sus usuarios de prueba.
