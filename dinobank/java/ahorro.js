/* ==========================================
   BANCO DINO
   SISTEMA DE AHORRO
========================================== */


document.addEventListener("DOMContentLoaded", iniciarAhorro);



/* ===========================
   INICIAR AHORRO
=========================== */


function iniciarAhorro(){


    const boton = document.querySelector(".btn-ahorro");



    if(boton){


        boton.addEventListener("click", calcularAhorro);


    }


}





/* ===========================
   CALCULAR AHORRO
=========================== */


function calcularAhorro(){



    let cantidad = prompt(
        "¿Cuánto dinero querés ahorrar por mes?"
    );



    if(!cantidad || isNaN(cantidad)){


        alert("Ingresá un número válido");


        return;


    }



    cantidad = Number(cantidad);



    let meses = 12;



    let interes = 0.05;



    let total = calcularInteres(
        cantidad,
        meses,
        interes
    );



    mostrarAhorro(total);



}





/* ===========================
   CALCULO CON INTERES
=========================== */


function calcularInteres(
    ahorroMensual,
    meses,
    interes
){


    let acumulado = ahorroMensual * meses;



    let ganancia = acumulado * interes;



    return acumulado + ganancia;


}





/* ===========================
   MOSTRAR RESULTADO
=========================== */


function mostrarAhorro(total){



    const resultado = document.getElementById("resultado");



    if(resultado){


        resultado.textContent =
        "$ " + total.toLocaleString("es-ES");


    }



    localStorage.setItem(
        "ahorroTotal",
        total
    );


}