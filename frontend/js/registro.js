import { obtenerSupabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("registroForm");
    const password = formulario.elements.password;
    const confirmar = formulario.elements.confirmarPassword;
    document.getElementById("mostrarPassword").addEventListener("change", (event) => {
        password.type = confirmar.type = event.target.checked ? "text" : "password";
    });
    formulario.addEventListener("submit", registrar);
    formulario.querySelector('button[type="submit"]').disabled = false;
});

async function registrar(event) {
    event.preventDefault();
    const formulario = event.currentTarget;
    const nombre = formulario.elements.nombre.value.trim();
    const email = formulario.elements.email.value.trim();
    const password = formulario.elements.password.value;
    const mensaje = document.getElementById("mensajeRegistro");
    if (!nombre || !email || password.length < 8) {
        mensaje.textContent = "Completá tu nombre, email y una contraseña de al menos 8 caracteres.";
        return;
    }
    if (password !== formulario.elements.confirmarPassword.value) {
        mensaje.textContent = "Las contraseñas no coinciden.";
        return;
    }
    const boton = formulario.querySelector('button[type="submit"]');
    boton.disabled = true;
    mensaje.textContent = "Creando cuenta…";
    try {
        const supabase = await obtenerSupabase();
        const { data, error } = await supabase.auth.signUp({
            email, password,
            options: { data: { nombre }, emailRedirectTo: new URL("index.html", window.location.href).href }
        });
        if (error) throw error;
        if (data.session) {
            window.location.assign("pages/dashboard.html");
            return;
        }
        formulario.reset();
        formulario.elements.password.type = formulario.elements.confirmarPassword.type = "password";
        mensaje.textContent = "Si el registro puede completarse, revisá tu correo y confirmá tu cuenta antes de ingresar.";
    } catch (error) {
        const errores = {
            email_address_not_authorized: "El servicio de correo todavía no permite enviar confirmaciones a esta dirección.",
            over_email_send_rate_limit: "Se alcanzó el límite de correos de confirmación. Intentá más tarde.",
            user_already_exists: "No se pudo completar el registro. Probá iniciar sesión."
        };
        mensaje.textContent = errores[error.code] || error.message || "No se pudo crear la cuenta. Intentá nuevamente.";
    } finally {
        boton.disabled = false;
    }
}
