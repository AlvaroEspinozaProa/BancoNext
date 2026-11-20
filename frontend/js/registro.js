import { obtenerSupabase } from "./supabase.js";

document.getElementById("registroForm").addEventListener("submit", registrar);

async function registrar(event) {
    event.preventDefault();
    const formulario = event.currentTarget;
    const { nombre, email, password, confirmacion } = formulario.elements;
    const mensaje = document.getElementById("mensajeRegistro");
    const boton = formulario.querySelector('button[type="submit"]');
    mensaje.textContent = "";
    if (!nombre.value.trim()) {
        mensaje.textContent = "Ingresá tu nombre.";
        return;
    }
    if (password.value !== confirmacion.value) {
        mensaje.textContent = "Las contraseñas no coinciden. Revisalas e intentá de nuevo.";
        confirmacion.focus();
        return;
    }
    boton.disabled = true;
    try {
        const supabase = await obtenerSupabase();
        const { data, error } = await supabase.auth.signUp({
            email: email.value.trim(),
            password: password.value,
            options: { data: { nombre: nombre.value.trim() } }
        });
        if (error) throw error;
        if (data.session) {
            window.location.assign("pages/dashboard.html");
        } else {
            formulario.reset();
            mensaje.textContent = "Si tu correo puede registrarse, revisá tu bandeja para confirmar la cuenta. Si ya tenés cuenta, ingresá con tus datos.";
        }
    } catch (error) {
        if (error.name === "AuthRetryableFetchError" || /failed to fetch|networkerror|load failed/i.test(error.message || "")) {
            mensaje.textContent = "No se pudo conectar con Supabase. Revisá tu conexión a internet.";
        } else if (error.code === "email_address_invalid") {
            mensaje.textContent = "Supabase no acepta este correo. Usá una dirección válida con un dominio real, no uno de prueba como test.com.";
        } else if (["user_already_exists", "email_exists"].includes(error.code) || /already registered/i.test(error.message || "")) {
            mensaje.textContent = "Este correo ya está registrado. Ingresá con tu cuenta.";
        } else if (error.code === "weak_password") {
            mensaje.textContent = "La contraseña no cumple los requisitos de seguridad. Probá con una más larga o diferente.";
        } else if (error.code === "over_email_send_rate_limit" || error.code === "over_request_rate_limit" || error.status === 429) {
            mensaje.textContent = "Se hicieron demasiados intentos. Esperá unos minutos y volvé a intentar.";
        } else if (error.code === "email_address_not_authorized") {
            mensaje.textContent = "No se puede enviar el correo de confirmación. Consultá con quien administra DinBank.";
        } else {
            mensaje.textContent = "No se pudo crear la cuenta. Intentá de nuevo más tarde.";
            console.error("Error al registrar usuario:", error);
        }
    } finally {
        boton.disabled = false;
    }
}
