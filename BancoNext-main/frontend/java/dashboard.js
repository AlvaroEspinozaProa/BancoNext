document.addEventListener("DOMContentLoaded", cargarDashboard);

function cargarDashboard() {

    mostrarUsuario();

    mostrarSaldo();

}

function mostrarUsuario() {

    const nombreGuardado = localStorage.getItem("usuario");

    const nombreElemento = document.getElementById("nombreUsuario");

    console.log("Usuario guardado:", nombreGuardado);

    if (nombreElemento && nombreGuardado) {

        nombreElemento.textContent = nombreGuardado;

    }

}

function mostrarSaldo() {

    const saldoElemento = document.getElementById("saldoUsuario");

    if (saldoElemento) {

        let saldoInicial = 150000;

        saldoElemento.textContent =
            saldoInicial.toLocaleString("es-ES");

    }

}