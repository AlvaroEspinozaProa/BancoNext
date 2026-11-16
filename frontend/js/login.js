/* ==========================================
   BANCO DINO
   LOGIN
========================================== */



import { obtenerSupabase } from "./supabase.js";


document.addEventListener("DOMContentLoaded", iniciarLogin);


/* ===========================
   INICIAR LOGIN
=========================== */

function iniciarLogin(){

    const formulario = document.getElementById("loginForm");
    const checkboxMostrar = document.getElementById("mostrarPassword");
    const password = document.getElementById("password");

    if (!formulario || !checkboxMostrar || !password) {
        return;
    }

    formulario.addEventListener("submit", validarLogin);
    formulario.querySelector('button[type="submit"]').disabled = false;

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

    const email = document.getElementById("email").value.trim();
    const contrasena = document.getElementById("password").value;
    const botonIngresar = event.currentTarget.querySelector('button[type="submit"]');

    if (!email || !contrasena) {
        alert("Ingresá tu email y tu contraseña.");
        return;
    }

    botonIngresar.disabled = true;

    try {
        const supabase = await obtenerSupabase();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: contrasena
        });

        if (error) {
            throw error;
        }

        window.location.assign("pages/dashboard.html");
    } catch (error) {
        alert(error.message || "No se pudo conectar con el servidor.");
    } finally {
        botonIngresar.disabled = false;
    }

}
