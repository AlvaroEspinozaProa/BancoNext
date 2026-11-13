/* ==========================================
   BANCO DINO
   DINOSAURIO
========================================== */


document.addEventListener("DOMContentLoaded", iniciarDino);



/* ===========================
   INICIAR DINOSAURIO
=========================== */


function iniciarDino(){


    const dino = document.getElementById("dinosaurio");



    if(dino){


        activarMovimiento(dino);


    }



}



/* ===========================
   MOVIMIENTO DEL DINO
=========================== */


function activarMovimiento(dino){


    let posicion = 0;

    let direccion = 1;



    setInterval(()=>{


        posicion += direccion * 2;



        if(posicion > 20 || posicion < -20){


            direccion *= -1;


        }



        dino.style.transform = `translateX(${posicion}px)`;



    },100);



}







/* ===========================
   CRECER DINOSAURIO
=========================== */


function crecerDinosaurio(nivel){


    const dino = document.getElementById("dinosaurio");



    if(!dino) return;



    let tamaño = 1;



    if(nivel === 1){

        tamaño = 1;

    }


    else if(nivel === 3){

        tamaño = 1.1;

    }


    else if(nivel === 6){

        tamaño = 1.2;

    }


    else if(nivel === 9){

        tamaño = 1.35;

    }


    else if(nivel === 12){

        tamaño = 1.5;

    }



    dino.style.transform = `scale(${tamaño})`;



}