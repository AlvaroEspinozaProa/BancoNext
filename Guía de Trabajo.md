# Guía de Trabajo

Estuve revisando el código que subieron al repositorio. Primero que nada: el diseño de la página (`dashboard.html`, `index.html` y todos los estilos) está buenísimo. Visualmente es un 10 y se nota el esfuerzo que le pusieron a la maquetación.

Sin embargo, vi por qué están renegando y no pueden avanzar:Están intentando que el simulador y el login funcionen usando solamente archivos de JavaScript (`login.js`, `ahorro.js`, etc.). Como JavaScript funciona del lado de la pantalla, no tiene forma de "recordar" a los usuarios o de guardar cuentas bancarias de forma segura.

Para destrabar el proyecto, vamos a dejar de lado esos archivos `.js` por un rato y vamos a conectar el sistema de verdad usando Python (el cerebro) y MySQL (la memoria), que es el objetivo de la materia.

Para avanzar rápido y no pisarse, divídanse en dos equipos:

### Equipo 1: La Base de Datos 

Necesitamos que el banco guarde datos reales y no se borren al actualizar la página. Abran XAMPP y phpMyAdmin:
1. Creen una base de datos que se llame `bd_banconext`.
2. Creen una tabla llamada `usuarios` con estas columnas: `id`, `nombre`, `email`, y `contraseña`.
3. Creen otra tabla llamada `simulaciones_ahorro` con estas columnas: `id`, `usuario_id`, `ingreso_mensual`, `gastos_fijos`, `gastos_hormiga`, y `ahorro_proyectado`.
4. Cárguenle dos o tres usuarios inventados a mano para tener con qué probar. Anoten bien los nombres que le pusieron a las columnas, porque el Equipo 2 los va a necesitar.

###Equipo 2: El Servidor en Python 

Vamos a levantar el servidor para que la página funcione de verdad.
1. Creen un archivo llamado `app.py` en la carpeta principal del proyecto.
2. Importen Flask y armen la ruta inicial (`@app.route('/')`) para que al entrar se vea el `index.html`. *(Acuérdense de que para usar Flask hay que guardar los HTML en una carpeta `templates` y los CSS/imágenes en una carpeta `static`)*.
3. **El Login:** Vayan al `index.html` y fíjense que la etiqueta del formulario diga `action="/login"` y `method="POST"`.
4. En su `app.py`, armen la ruta `/login` para atrapar esos datos. Por ahora, solo hagan que Python atrape el correo que pone el usuario y lo imprima en la consola negra. La validación con la base de datos la hacemos después; lo importante es que los datos viajen del HTML a Python.
