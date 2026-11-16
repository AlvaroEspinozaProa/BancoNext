import { obtenerSupabase } from "./supabase.js";

document.addEventListener("DOMContentLoaded", iniciarMetas);

function iniciarMetas() {
    const botonMetas = document.querySelector(".metas");
    const seccionAcciones = document.querySelector(".acciones");
    if (!botonMetas || !seccionAcciones) return;

    botonMetas.addEventListener("click", async () => {
        const existente = document.getElementById("panelMetas");
        if (existente) {
            existente.hidden = !existente.hidden;
            return;
        }
        const panel = document.createElement("div");
        panel.id = "panelMetas";
        panel.innerHTML = `
            <h2>🎯 Mis metas de ahorro</h2>
            <input type="text" id="nuevaMeta" placeholder="Escribí una meta">
            <button id="agregarMeta">Guardar meta</button>
            <p id="mensajeMeta" aria-live="polite"></p>
            <ul id="listaMetas"></ul>`;
        seccionAcciones.after(panel);
        const lista = panel.querySelector("#listaMetas");
        const mensaje = panel.querySelector("#mensajeMeta");

        try {
            const supabase = await obtenerSupabase();
            const { data, error } = await supabase.from("dinbank_metas")
                .select("descripcion").order("created_at", { ascending: true });
            if (error) throw error;
            data.forEach(({ descripcion }) => agregarElemento(lista, descripcion));
        } catch (error) {
            mensaje.textContent = error.message || "No se pudieron cargar las metas.";
        }

        panel.querySelector("#agregarMeta").addEventListener("click", async () => {
            const input = panel.querySelector("#nuevaMeta");
            const descripcion = input.value.trim();
            if (!descripcion) {
                mensaje.textContent = "Escribí una meta.";
                return;
            }
            const boton = panel.querySelector("#agregarMeta");
            boton.disabled = true;
            try {
                const supabase = await obtenerSupabase();
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error("Tu sesión terminó. Volvé a iniciar sesión.");
                const { error } = await supabase.from("dinbank_metas").insert({ user_id: user.id, descripcion });
                if (error) throw error;
                agregarElemento(lista, descripcion);
                input.value = "";
                mensaje.textContent = "Meta guardada.";
            } catch (error) {
                mensaje.textContent = error.message || "No se pudo guardar la meta.";
            } finally {
                boton.disabled = false;
            }
        });
    });
}

function agregarElemento(lista, descripcion) {
    const elemento = document.createElement("li");
    elemento.textContent = "🎯 " + descripcion;
    lista.appendChild(elemento);
}
