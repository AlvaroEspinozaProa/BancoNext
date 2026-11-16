import { obtenerSupabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", iniciarAplicacion);


/* INICIAR LA APP */

async function iniciarAplicacion(){

    console.log("🦖 BancoDino iniciado correctamente.");

    const usuario = await obtenerSesion();

    if (!usuario) {
        window.location.replace("index.html");
        return;
    }

    cargarUsuario(usuario);

    mostrarFecha();

}

async function obtenerSesion(){
    try {
        const supabase = await obtenerSupabase();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
            return null;
        }

        const { data: perfil, error: errorPerfil } = await supabase
            .from("dinbank_profiles")
            .select("nombre")
            .eq("id", user.id)
            .maybeSingle();

        if (errorPerfil) {
            console.error("No se pudo cargar el perfil:", errorPerfil);
        }

        return { nombre: perfil?.nombre || user.email };
    } catch (error) {
        console.error("No se pudo comprobar la sesión de Supabase:", error);
        return null;
    }

}


/* CARGAR USUARIO */

function cargarUsuario(usuario){
    const nombreElemento = document.getElementById("nombreUsuario");
    if (nombreElemento) {
        nombreElemento.textContent = usuario.nombre;
    }
}


/* MOSTRAR FECHA */

function mostrarFecha(){

    const fecha = new Date();

    console.log("Fecha:", fecha.toLocaleDateString());

}
