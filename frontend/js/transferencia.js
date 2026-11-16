import { obtenerSupabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formDeposito").addEventListener("submit", (event) => operar(event, "dinbank_depositar"));
    document.getElementById("formTransferencia").addEventListener("submit", (event) => operar(event, "dinbank_transferir"));
    document.querySelector(".transferir").addEventListener("click", () => {
        const panel = document.getElementById("panelTransferencias");
        panel.hidden = !panel.hidden;
    });
});

async function operar(event, funcion) {
    event.preventDefault();
    const form = event.currentTarget;
    const monto = Number(form.elements.monto.value);
    const mensaje = form.querySelector("[aria-live]");
    if (!Number.isFinite(monto) || monto <= 0 || monto > 9999999999.99 || !/^\d+(\.\d{1,2})?$/.test(form.elements.monto.value)) {
        mensaje.textContent = "Ingresá un monto válido con hasta dos decimales.";
        return;
    }
    const boton = form.querySelector("button");
    boton.disabled = true;
    try {
        const supabase = await obtenerSupabase();
        const parametros = { p_monto: monto };
        if (funcion === "dinbank_transferir") parametros.p_destino = form.elements.destino.value.trim();
        const { error } = await supabase.rpc(funcion, parametros);
        if (error) throw error;
        form.reset();
        mensaje.textContent = "Operación simulada registrada.";
        document.dispatchEvent(new Event("cuenta-actualizada"));
    } catch (error) {
        mensaje.textContent = error.message || "No se pudo completar la operación.";
    } finally {
        boton.disabled = false;
    }
}
