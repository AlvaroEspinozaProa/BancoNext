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

    if(formulario){
        formulario.addEventListener("submit", validarLogin);
    }

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

function validarLogin(event) {

    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contraseña = document.getElementById("password").value.trim();

    const usuarioCorrecto = "ana";
    const contraseñaCorrecta = "dino123";

    if (usuario === usuarioCorrecto && contraseña === contraseñaCorrecta) {

        // Guardamos el nombre que escribió el usuario
        localStorage.setItem("usuario", usuario);

        // Vamos al dashboard
        window.location.href = "dashboard.html";

    } else {

        alert("Usuario o contraseña incorrectos.");

    }

}