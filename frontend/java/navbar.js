/* ==========================================
   BANCO DINO
   NAVBAR
========================================== */


document.addEventListener("DOMContentLoaded", iniciarNavbar);



/* ===========================
   INICIAR NAVBAR
=========================== */


function iniciarNavbar(){


    const botones = document.querySelectorAll(".navbar button");



    botones.forEach((boton)=>{


        boton.addEventListener("click", function(){


            cambiarActivo(this);



        });


    });


}





/* ===========================
   CAMBIAR BOTÓN ACTIVO
=========================== */


function cambiarActivo(botonSeleccionado){



    const botones = document.querySelectorAll(".navbar button");



    botones.forEach((boton)=>{


        boton.classList.remove("active");


    });



    botonSeleccionado.classList.add("active");



}