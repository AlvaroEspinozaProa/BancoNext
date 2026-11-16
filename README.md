<div align="center">
  <img src="BancoNext-main/inspiracion/assets/dinbank-portada.png" alt="Dino, la mascota de DinBank, junto a una planta y monedas" width="100%">

  # DinBank 🦖

  **Una billetera virtual educativa para aprender a ahorrar.**

  [Empezar](#-empezar) · [Conectar Supabase](BancoNext-main/SUPABASE_TUTORIAL.md) · [Conocer el proyecto](#-el-proyecto)
</div>

---

## 🌱 El proyecto

DinBank es un proyecto escolar que explora cómo funciona una billetera virtual: iniciar sesión, plantear metas y calcular el crecimiento del ahorro, acompañado por Dino.

> **Una maqueta para aprender:** no utiliza dinero real. Las transferencias son registros simulados y el saldo de la pantalla es ilustrativo.

## ✨ Qué podés hacer

- **Ingresar** con una cuenta de Supabase Auth.
- **Guardar metas** y volver a consultarlas.
- **Proyectar ahorros** y conservar la última proyección.
- **Registrar transferencias simuladas** como movimientos de práctica.
- **Recorrer las maquetas** y explorar los cálculos en Python.

Las metas, proyecciones y transferencias simuladas se guardan por usuario cuando la base está configurada. El saldo y el chatbot siguen siendo elementos de demostración.

## 🚀 Empezar

La versión oficial del proyecto está en **[`BancoNext-main/`](BancoNext-main/)**. La URL y la clave publicable de Supabase ya están configuradas en el proyecto.

1. En Supabase, ejecutá [`supabase/schema.sql`](BancoNext-main/supabase/schema.sql) y creá un usuario. El [tutorial de conexión](BancoNext-main/SUPABASE_TUTORIAL.md) explica los pasos.
2. Desde una terminal, entrá a la carpeta oficial e iniciá un servidor local:

   ```powershell
   cd BancoNext-main
   python -m http.server 8000
   ```

3. Abrí [localhost:8000/frontend/](http://localhost:8000/frontend/) e ingresá con el usuario creado.

## 🧭 Estructura

```text
BancoNext-main/
├── frontend/          Aplicación web y conexión a Supabase
├── supabase/          Tablas y políticas de acceso
├── backend_calculos/  Cálculos educativos y pruebas en Python
├── inspiracion/       Maquetas y recursos visuales
├── bd/ y database/    Implementación anterior con PHP y MariaDB
└── SUPABASE_TUTORIAL.md
```

El repositorio conserva además una copia anterior en su raíz. Para trabajar en la versión vigente, usá los archivos dentro de `BancoNext-main/`.

## 🛠️ Tecnologías

HTML · CSS · JavaScript · Supabase Auth y PostgreSQL · Python

Para ejecutar las pruebas de los cálculos desde la raíz del repositorio:

```powershell
python -m unittest discover BancoNext-main/backend_calculos/tests
```

---

<div align="center">Hecho para aprender, paso a paso. 🌿</div>
