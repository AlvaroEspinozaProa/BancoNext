/* ==========================================
   BANCO DINO
   APP PRINCIPAL
========================================== */

document.addEventListener("DOMContentLoaded", iniciarAplicacion);


/* INICIAR LA APP */

function iniciarAplicacion(){

    console.log("🦖 BancoDino iniciado correctamente.");

    cargarUsuario();

    mostrarFecha();

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