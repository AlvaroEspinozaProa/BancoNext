import { obtenerSupabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", iniciarTransferencias);

function iniciarTransferencias() {
    const botonTransferir = document.querySelector(".transferir");
    const seccionAcciones = document.querySelector(".acciones");
    if (!botonTransferir || !seccionAcciones) return;

    botonTransferir.addEventListener("click", () => {
        const panelExistente = document.getElementById("panelTransferencias");
        if (panelExistente) {
            panelExistente.hidden = !panelExistente.hidden;
            return;
        }

        const panel = document.createElement("div");
        panel.id = "panelTransferencias";
        panel.innerHTML = `
            <h2>💸 Registrar transferencia simulada</h2>
            <input type="text" id="destinatario" placeholder="Nombre del destinatario">
            <input type="number" id="montoTransferencia" min="0.01" step="0.01" placeholder="Monto a registrar">
            <button id="confirmarTransferencia">Guardar simulación</button>
            <p id="mensajeTransferencia" aria-live="polite"></p>`;
        seccionAcciones.after(panel);

        panel.querySelector("#confirmarTransferencia").addEventListener("click", async () => {
            const destinatario = panel.querySelector("#destinatario").value.trim();
            const monto = Number(panel.querySelector("#montoTransferencia").value);
            const mensaje = panel.querySelector("#mensajeTransferencia");
            if (!destinatario || !Number.isFinite(monto) || monto <= 0) {
                mensaje.textContent = "Ingresá un destinatario y un monto válido.";
                return;
            }

            const boton = panel.querySelector("#confirmarTransferencia");
            boton.disabled = true;
            try {
                const supabase = await obtenerSupabase();
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error("Tu sesión terminó. Volvé a iniciar sesión.");
                const { error } = await supabase.from("dinbank_movimientos").insert({
                    user_id: user.id, monto, destinatario, motivo: "Transferencia simulada"
                });
                if (error) throw error;
                mensaje.textContent = "Simulación guardada.";
                panel.querySelector("#destinatario").value = "";
                panel.querySelector("#montoTransferencia").value = "";
            } catch (error) {
                mensaje.textContent = error.message || "No se pudo guardar la simulación.";
            } finally {
                boton.disabled = false;
            }
        });
    });
}
