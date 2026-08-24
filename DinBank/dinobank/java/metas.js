document.addEventListener("DOMContentLoaded", iniciarMetas);

function iniciarMetas() {

    const botonMetas = document.querySelector(".metas");
    const seccionAcciones = document.querySelector(".acciones");

    botonMetas.addEventListener("click", mostrarMetas);

    function mostrarMetas() {

        const panelExistente = document.getElementById("panelMetas");

        // Si el panel ya existe, lo mostramos u ocultamos
        if (panelExistente) {

            if (panelExistente.style.display === "none") {
                panelExistente.style.display = "block";
            } else {
                panelExistente.style.display = "none";
            }

            return;
        }

        // Crear el panel
        const panel = document.createElement("div");

        panel.id = "panelMetas";

        panel.innerHTML = `
            <h2>🎯 Mis metas de ahorro</h2>

            <input
                type="text"
                id="nuevaMeta"
                placeholder="Escribe una meta">

            <button id="agregarMeta">
                Agregar meta
            </button>

            <ul id="listaMetas"></ul>
        `;

        // Agregar el panel después de los botones
        seccionAcciones.after(panel);

        const inputMeta = document.getElementById("nuevaMeta");
        const botonAgregar = document.getElementById("agregarMeta");
        const listaMetas = document.getElementById("listaMetas");

        botonAgregar.addEventListener("click", agregarMeta);

        function agregarMeta() {

            const meta = inputMeta.value.trim();

            if (meta === "") {

                alert("Por favor, escribe una meta.");

                return;

            }

            const nuevaMeta = document.createElement("li");

            nuevaMeta.textContent = "🎯 " + meta;

            listaMetas.appendChild(nuevaMeta);

            inputMeta.value = "";

        }

    }

}