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
        mensaje.textContent = "Las contraseñas no coinciden.";
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
            mensaje.textContent = "Revisá tu correo para confirmar la cuenta. Si ya tenés cuenta, ingresá con tus datos.";
        }
    } catch (error) {
        mensaje.textContent = error.name === "AuthRetryableFetchError" || /failed to fetch|networkerror|load failed/i.test(error.message || "")
            ? "No se pudo conectar con Supabase. Revisá tu conexión a internet."
            : error.code === "user_already_exists" || /already registered/i.test(error.message || "")
                ? "No se pudo crear la cuenta. Si ya tenés una, intentá ingresar."
                : error.message || "No se pudo crear la cuenta. Intentá de nuevo.";
    } finally {
        boton.disabled = false;
    }
}
