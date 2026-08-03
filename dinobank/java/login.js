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

    if(formulario){

        formulario.addEventListener("submit", validarLogin);

    }

}



/* ===========================
   VALIDAR LOGIN
=========================== */

function validarLogin(event){

    event.preventDefault();


    const usuario = document.getElementById("usuario").value.trim();

    const contraseña = document.getElementById("password").value.trim();



    /* USUARIO DE PRUEBA */

    const usuarioCorrecto = "ana";

    const contraseñaCorrecta = "dino123";



    if(usuario === usuarioCorrecto && contraseña === contraseñaCorrecta){

        localStorage.setItem("usuario", usuario);

        window.location.href = "dashboard.html";

    }

    else{

        alert("Usuario o contraseña incorrectos.");

    }

}