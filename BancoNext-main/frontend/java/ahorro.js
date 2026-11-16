import { obtenerSupabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", iniciarAhorro);

async function iniciarAhorro() {
    const boton = document.querySelector(".ahorro");
    if (boton) boton.addEventListener("click", calcularAhorro);
    try {
        const supabase = await obtenerSupabase();
        const { data, error } = await supabase.from("dinbank_simulaciones_ahorros")
            .select("ahorro_proyectado").order("created_at", { ascending: false }).limit(1).maybeSingle();
        if (error) throw error;
        if (data) mostrarAhorro(Number(data.ahorro_proyectado));
    } catch (error) {
        console.error("No se pudo recuperar la última proyección:", error);
    }
}

async function calcularAhorro() {
    const cantidad = Number(prompt("¿Cuánto dinero querés ahorrar por mes?"));
    if (!Number.isFinite(cantidad) || cantidad <= 0) {
        alert("Ingresá un número válido.");
        return;
    }
    const total = cantidad * 12 * 1.05;
    try {
        const supabase = await obtenerSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Tu sesión terminó. Volvé a iniciar sesión.");
        const { error } = await supabase.from("dinbank_simulaciones_ahorros").insert({
            user_id: user.id, ingreso_mensual: cantidad, gastos_fijos: 0,
            gastos_hormiga: 0, ahorro_proyectado: total
        });
        if (error) throw error;
        mostrarAhorro(total);
    } catch (error) {
        alert(error.message || "No se pudo guardar la proyección.");
    }
}

function mostrarAhorro(total) {
    const resultado = document.getElementById("resultado");
    if (resultado) resultado.textContent = "$ " + total.toLocaleString("es-AR");
}
