/* ==========================================
   BANCO DINO
   LOGIN
========================================== */



console.log("Login JS cargado correctamente");


document.addEventListener("DOMContentLoaded", iniciarLogin);


/* ===========================
   INICIAR LOGIN
=========================== */

function iniciarLogin(){

    const formulario = document.getElementById("loginForm");
    const checkboxMostrar = document.getElementById("mostrarPassword");
    const password = document.getElementById("password");

    // Este archivo también se carga en el dashboard, donde no existe el formulario.
    if (!formulario || !checkboxMostrar || !password) {
        return;
    }

    formulario.addEventListener("submit", validarLogin);

    checkboxMostrar.addEventListener("change", function(){

        if(checkboxMostrar.checked){
            password.type = "text";
        } else {
            password.type = "password";
        }

    });

}



/* ===========================
   VALIDAR LOGIN
=========================== */

async function validarLogin(event) {

    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("password").value;
    const botonIngresar = event.currentTarget.querySelector('button[type="submit"]');

    if (!usuario || !contrasena) {
        alert("Ingresá tu usuario o email y tu contraseña.");
        return;
    }

    botonIngresar.disabled = true;

    try {
        const respuesta = await fetch("../bd/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "same-origin",
            body: JSON.stringify({ usuario, contrasena })
        });
        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.error || "No se pudo iniciar sesión.");
        }

        // Solo se conserva el nombre para mostrarlo; la autenticación vive en PHP.
        localStorage.setItem("usuario", datos.usuario.nombre);
        window.location.assign("dashboard.html");
    } catch (error) {
        alert(error.message || "No se pudo conectar con el servidor.");
    } finally {
        botonIngresar.disabled = false;
    }

}
