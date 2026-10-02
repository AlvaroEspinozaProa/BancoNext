/* ==========================================
   BANCO DINO
   APP PRINCIPAL
========================================== */

document.addEventListener("DOMContentLoaded", iniciarAplicacion);


/* INICIAR LA APP */

async function iniciarAplicacion(){

    console.log("🦖 BancoDino iniciado correctamente.");

    const usuario = await obtenerSesion();

    if (!usuario) {
        window.location.replace("index.html");
        return;
    }

    // El servidor confirma qué usuario inició sesión antes de mostrar el dashboard.
    localStorage.setItem("usuario", usuario.nombre);

    cargarUsuario();

    mostrarFecha();

}

/* COMPROBAR LA SESIÓN DEL SERVIDOR */

async function obtenerSesion(){

    try {
        const respuesta = await fetch("../bd/sesion.php", {
            credentials: "same-origin"
        });

        if (!respuesta.ok) {
            return null;
        }

        const datos = await respuesta.json();
        return datos.usuario;
    } catch (error) {
        console.error("No se pudo comprobar la sesión:", error);
        return null;
    }

}


/* CARGAR USUARIO */

function cargarUsuario(){

    const nombre = localStorage.getItem("usuario");

    if(nombre){

        const usuario = document.getElementById("nombreUsuario");

        if(usuario){

            usuario.textContent = nombre;

        }

    }

}


/* MOSTRAR FECHA */

function mostrarFecha(){

    const fecha = new Date();

    console.log("Fecha:", fecha.toLocaleDateString());

}
