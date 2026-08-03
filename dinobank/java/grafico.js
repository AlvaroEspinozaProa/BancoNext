/* ==========================================
   BANCO DINO
   GRAFICO DE AHORRO
========================================== */


document.addEventListener("DOMContentLoaded", iniciarGrafico);



/* ===========================
   INICIAR GRAFICO
=========================== */


function iniciarGrafico(){


    const arboles = document.querySelectorAll(".mes img");



    arboles.forEach((arbol, indice)=>{


        arbol.addEventListener("click",()=>{


            seleccionarMes(indice + 1);



        });


    });


}





/* ===========================
   SELECCIONAR MES
=========================== */


function seleccionarMes(numero){



    let meses = [1,3,6,9,12];


    let mesSeleccionado = meses[numero-1];



    mostrarResultado(mesSeleccionado);



    cambiarArbol(numero);



    if(typeof crecerDinosaurio === "function"){


        crecerDinosaurio(mesSeleccionado);


    }



}





/* ===========================
   CAMBIAR ARBOL
=========================== */


function cambiarArbol(nivel){



    const arboles = document.querySelectorAll(".mes img");



    arboles.forEach((arbol)=>{


        arbol.style.opacity = "0.5";


    });



    if(arboles[nivel-1]){


        arboles[nivel-1].style.opacity = "1";


        arboles[nivel-1].classList.add("crecer");

    }



}





/* ===========================
   MOSTRAR PROYECCION
=========================== */


function mostrarResultado(meses){



    const resultado = document.getElementById("resultado");



    if(!resultado) return;



    let dineroBase = 150000;



    let crecimiento = 0;



    switch(meses){


        case 1:

            crecimiento = 5000;

            break;



        case 3:

            crecimiento = 15000;

            break;



        case 6:

            crecimiento = 35000;

            break;



        case 9:

            crecimiento = 60000;

            break;



        case 12:

            crecimiento = 90000;

            break;


    }



    let total = dineroBase + crecimiento;



    resultado.textContent = 
        "$ " + total.toLocaleString("es-ES");



}