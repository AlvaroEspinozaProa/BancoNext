/* ==========================================
   BANCO DINO
   DASHBOARD
========================================== */


document.addEventListener("DOMContentLoaded", cargarDashboard);



/* ===========================
   CARGAR DASHBOARD
=========================== */


function cargarDashboard(){


    mostrarUsuario();


    mostrarSaldo();


}




/* ===========================
   MOSTRAR USUARIO
=========================== */


function mostrarUsuario(){


    const nombreGuardado = localStorage.getItem("usuario");


    const nombreElemento = document.getElementById("nombreUsuario");



    if(nombreElemento && nombreGuardado){


        nombreElemento.textContent = nombreGuardado;


    }



}





/* ===========================
   MOSTRAR SALDO
=========================== */


function mostrarSaldo(){


    const saldoElemento = document.getElementById("saldoUsuario");



    if(saldoElemento){


        let saldoInicial = 150000;


        saldoElemento.textContent = saldoInicial.toLocaleString("es-ES");



    }



}