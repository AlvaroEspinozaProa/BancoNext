import { obtenerSupabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", iniciarAhorro);

async function iniciarAhorro() {
    const boton = document.querySelector(".ahorro");
    const panel = document.getElementById("panelAhorro");
    if (boton && panel) {
        boton.addEventListener("click", () => { panel.hidden = !panel.hidden; });
        panel.addEventListener("submit", calcularAhorro);
    }
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

async function calcularAhorro(event) {
    event.preventDefault();
    const formulario = event.currentTarget;
    const cantidad = Number(formulario.elements.cantidad.value);
    const mensaje = document.getElementById("mensajeAhorro");
    if (!Number.isFinite(cantidad) || cantidad <= 0 || cantidad > 793650793.65 || !/^\d+(\.\d{1,2})?$/.test(formulario.elements.cantidad.value)) {
        mensaje.textContent = "Ingresá un monto válido con hasta dos decimales.";
        return;
    }
    const total = Math.round(cantidad * 12 * 1.05 * 100) / 100;
    const boton = formulario.querySelector("button");
    boton.disabled = true;
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
        mensaje.textContent = "Proyección guardada.";
    } catch (error) {
        mensaje.textContent = error.message || "No se pudo guardar la proyección.";
    } finally {
        boton.disabled = false;
    }
}

function mostrarAhorro(total) {
    const resultado = document.getElementById("resultado");
    if (resultado) resultado.textContent = "$ " + total.toLocaleString("es-AR");
}
