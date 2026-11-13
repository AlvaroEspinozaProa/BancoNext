document.addEventListener("DOMContentLoaded", iniciarTransferencias);

function iniciarTransferencias() {

    const botonTransferir = document.querySelector(".transferir");
    const seccionAcciones = document.querySelector(".acciones");

    botonTransferir.addEventListener(
        "click",
        mostrarTransferencias
    );

    function mostrarTransferencias() {

        const panelExistente =
            document.getElementById("panelTransferencias");

        // Si ya existe, mostrar u ocultar
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

        panel.id = "panelTransferencias";

        panel.innerHTML = `

            <h2>💸 Realizar transferencia</h2>

            <input
                type="text"
                id="destinatario"
                placeholder="Nombre del destinatario">

            <input
                type="number"
                id="montoTransferencia"
                placeholder="Monto a transferir">

            <button id="confirmarTransferencia">
                Transferir
            </button>

            <p id="mensajeTransferencia"></p>

        `;

        // Agregar después de los botones
        seccionAcciones.after(panel);

        const inputDestinatario =
            document.getElementById("destinatario");

        const inputMonto =
            document.getElementById("montoTransferencia");

        const botonConfirmar =
            document.getElementById("confirmarTransferencia");

        const mensaje =
            document.getElementById("mensajeTransferencia");

        botonConfirmar.addEventListener(
            "click",
            realizarTransferencia
        );

        function realizarTransferencia() {

            const destinatario =
                inputDestinatario.value.trim();

            const monto =
                Number(inputMonto.value);

            if (destinatario === "") {

                mensaje.textContent =
                    "Ingresa el nombre del destinatario.";

                return;

            }

            if (
                inputMonto.value === "" ||
                monto <= 0
            ) {

                mensaje.textContent =
                    "Ingresa un monto válido.";

                return;

            }

            mensaje.textContent =
                "✅ Transferencia de $" +
                monto.toLocaleString("es-AR") +
                " realizada a " +
                destinatario + ".";

            inputDestinatario.value = "";
            inputMonto.value = "";

        }

    }

}